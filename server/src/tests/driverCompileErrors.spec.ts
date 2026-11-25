import * as lpc from "./_namespaces/lpc.js";
import { codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * Compile errors both drivers raise whatever the type checking mode (#459). The rules come
 * from LDMud's prolang.y and closure.c and FluffOS's grammar.y and compiler.cc; every
 * LDMud expectation was compiled with LDMud 3.6.7.
 */

const LDMud = lpc.LanguageVariant.LDMud;
const FluffOS = lpc.LanguageVariant.FluffOS;

function diagnostics(driver: lpc.LanguageVariant, source: string, files: Record<string, string> = {}, typeChecking: lpc.TypeCheckingMode = "strict"): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source, ...files }, { driverType: driver, diagnostics: true, typeChecking });
    return [...ls.getSyntacticDiagnostics(abs("test.c")), ...ls.getSemanticDiagnostics(abs("test.c"))].map(codeAndMessage);
}

function codes(driver: lpc.LanguageVariant, source: string, files?: Record<string, string>): number[] {
    return diagnostics(driver, source, files).map(d => Number(d.slice(0, d.indexOf(":"))));
}

const sw = (type: string, labels: string) => `void f(${type} x) {\n  switch (x) {\n${labels}  }\n}\n`;

describe.each([
    ["LDMud", LDMud],
    ["FluffOS", FluffOS],
] as const)("driver compile errors (%s)", (_name, driver) => {
    const isLD = driver === LDMud;

    describe("case labels", () => {
        it(isLD ? "rejects a repeated label" : "accepts a repeated label in a switch with no range", () => {
            expect(codes(driver, sw("int", `    case 1: break;\n    case 1: break;\n`))).toEqual(isLD ? [9065] : []);
            expect(codes(driver, sw("string", `    case "a": break;\n    case "a": break;\n`))).toEqual(isLD ? [9065] : []);
        });

        it(isLD ? "compares labels by value" : "compares nothing without a range", () => {
            expect(codes(driver, sw("int", `    case 'a': break;\n    case 97: break;\n`))).toEqual(isLD ? [9065] : []);
            expect(codes(driver, sw("int", `    case 0x61: break;\n    case 97: break;\n`))).toEqual(isLD ? [9065] : []);
        });

        it("rejects a label that overlaps a range", () => {
            expect(codes(driver, sw("int", `    case 1..5: break;\n    case 3: break;\n`))).toEqual([9065]);
            expect(codes(driver, sw("int", `    case 1..5: break;\n    case 5..9: break;\n`))).toEqual([9065]);
            expect(codes(driver, sw("int", `    case 1: break;\n    case 0..1: break;\n`))).toEqual([9065]);
        });

        it("accepts ranges and labels that do not overlap", () => {
            expect(codes(driver, sw("int", `    case 1..5: break;\n    case 6: break;\n    case 7..9: break;\n`))).toEqual([]);
        });

        it("points the duplicate at the earlier case", () => {
            const { ls, abs } = createTestLanguageService({ "test.c": sw("int", `    case 1..5: break;\n    case 3: break;\n`) }, { driverType: driver });
            const [diagnostic] = ls.getSemanticDiagnostics(abs("test.c"));
            expect(diagnostic.relatedInformation?.map(r => lpc.flattenDiagnosticMessageText(r.messageText, " "))).toEqual(["The earlier case is here."]);
        });

        it("rejects string labels mixed with non-zero numbers, but not with 0", () => {
            expect(codes(driver, sw("mixed", `    case "a": break;\n    case 1: break;\n`))).toEqual([9067]);
            expect(codes(driver, sw("mixed", `    case 1: break;\n    case "a": break;\n`))).toEqual([9067]);
            expect(codes(driver, sw("mixed", `    case 0: break;\n    case "a": break;\n`))).toEqual([]);
            expect(codes(driver, sw("mixed", `    case "a": break;\n    case 0: break;\n`))).toEqual([]);
        });

        it("rejects a string as a range bound", () => {
            expect(codes(driver, sw("string", `    case "a".."b": break;\n`))).toEqual([9068]);
        });
    });

    describe("nomask", () => {
        const files = { "base.c": `nomask int nm() { return 0; }\nint plain() { return 0; }\n` };

        it("rejects redefining an inherited nomask function", () => {
            expect(codes(driver, `inherit "/base";\nint nm() { return 1; }\n`, files)).toEqual([9069]);
        });

        it(isLD ? "rejects a prototype of it too" : "accepts a prototype of it", () => {
            expect(codes(driver, `inherit "/base";\nint nm();\n`, files)).toEqual(isLD ? [9069] : []);
        });

        it("accepts redefining an ordinary inherited function, or a nomask prototype", () => {
            expect(codes(driver, `inherit "/base";\nint plain() { return 1; }\n`, files)).toEqual([]);
            expect(codes(driver, `inherit "/base";\nint nm() { return 1; }\n`, { "base.c": `nomask int nm();\n` })).toEqual([]);
        });
    });

    describe("a return with no value", () => {
        const expected = isLD ? [9070] : [9071];

        it(isLD ? "is an error in a function declared with a value type" : "is a warning in a function declared with a value type", () => {
            expect(codes(driver, `int f() { return; }\n`)).toEqual(expected);
            expect(codes(driver, `mixed *f() { return; }\n`)).toEqual(expected);
        });

        it("names the declared type", () => {
            expect(diagnostics(driver, `int f() { return; }\n`)).toEqual([isLD
                ? "9070: Must return a value for a function declared 'int'."
                : "9071: Non-void functions must return a value."]);
        });

        it("is fine in a void, mixed or untyped function", () => {
            expect(codes(driver, `void f() { return; }\nmixed g() { return; }\nh() { return; }\n`)).toEqual([]);
        });

        it("is reported in driver mode too", () => {
            expect(diagnostics(driver, `int f() { return; }\n`, {}, "driver").map(d => Number(d.slice(0, 4)))).toEqual(expected);
        });
    });

    describe("void", () => {
        it("rejects a global or a local of type void", () => {
            expect(diagnostics(driver, `void v;\n`)).toEqual(["9072: Illegal to declare variable 'v' of type 'void'."]);
            expect(codes(driver, `void a, b;\n`)).toEqual([9072, 9072]);
            expect(codes(driver, `void f() {\n  void v;\n}\n`)).toEqual([9072]);
        });

        it("rejects a named void parameter, but accepts f(void)", () => {
            expect(diagnostics(driver, `int f(void x) { return 1; }\n`)).toEqual(["9073: Illegal to declare parameter 'x' of type 'void'."]);
            expect(codes(driver, `int f(void) { return 1; }\n`)).toEqual([]);
        });
    });

    describe("catch modifiers", () => {
        const all = `void f() {\n  int i;\n  catch(i = 1; nolog);\n  catch(i = 1; publish);\n  catch(i = 1; reserve 10);\n  catch(i = 1; limit 10);\n}\n`;

        if (isLD) {
            it("accepts nolog, publish, reserve <expr> and limit <expr>", () => {
                expect(codes(driver, all)).toEqual([]);
            });

            it("rejects any other modifier", () => {
                expect(diagnostics(driver, `void f() {\n  int i;\n  catch(i = 1; i);\n}\n`)).toEqual([
                    "9074: Illegal modifier 'i' in catch(): expected 'nolog', 'publish', 'reserve <expr>' or 'limit <expr>'.",
                ]);
            });

            it("needs an expression after reserve and limit, and none after nolog and publish", () => {
                expect(codes(driver, `void f() {\n  int i;\n  catch(i = 1; nolog 5);\n  catch(i = 1; reserve);\n}\n`)).toEqual([9075, 9076]);
            });
        }
        else {
            it("rejects every modifier -- FluffOS has none", () => {
                expect(codes(driver, `void f() {\n  int i;\n  catch(i = 1; nolog);\n}\n`)).toEqual([9077]);
            });
        }
    });
});
