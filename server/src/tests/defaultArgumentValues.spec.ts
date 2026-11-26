import * as lpc from "./_namespaces/lpc.js";
import { codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * A parameter with a default value can be left out of a call. LDMud writes it
 * `int b = 0` (since 3.6.4; doc/LPC/functions), FluffOS `int b: (: 0 :)`, and both
 * drivers lower the function's minimum argument count for each (LDMud num_opt_arg,
 * FluffOS grammar_rules.cc min_arg). Either may also be given on a prototype. The LDMud
 * expectations were compiled with LDMud 3.6.8.
 */

const LDMud = lpc.LanguageVariant.LDMud;
const FluffOS = lpc.LanguageVariant.FluffOS;

function codes(driver: lpc.LanguageVariant, source: string, typeChecking: lpc.TypeCheckingMode): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType: driver, diagnostics: true, typeChecking });
    return [...ls.getSyntacticDiagnostics(abs("test.c")), ...ls.getSemanticDiagnostics(abs("test.c"))].map(codeAndMessage);
}

describe.each([
    ["LDMud", LDMud, (name: string, value: string) => `int ${name} = ${value}`],
    ["FluffOS", FluffOS, (name: string, value: string) => `int ${name}: (: ${value} :)`],
] as const)("default argument values (%s)", (_name, driver, withDefault) => {
    describe.each(["strict", "driver"] as const)("%s mode", mode => {
        it("makes the parameter optional", () => {
            expect(codes(driver, `void g(int a, ${withDefault("b", "0")}) {}\nvoid f() { g(1); g(1, 2); }\n`, mode)).toEqual([]);
            expect(codes(driver, `void g(${withDefault("a", "1")}, ${withDefault("b", "2")}) {}\nvoid f() { g(); g(1); }\n`, mode)).toEqual([]);
        });

        it("still requires the parameters before it", () => {
            expect(codes(driver, `void g(int a, ${withDefault("b", "0")}) {}\nvoid f() { g(); }\n`, mode)).toEqual(["2554: Expected 1-2 arguments, but got 0."]);
        });

        // FluffOS's driver reports only too few arguments.
        it("still counts too many arguments", () => {
            const expected = driver === FluffOS && mode === "driver" ? [] : ["2554: Expected 1-2 arguments, but got 3."];
            expect(codes(driver, `void g(int a, ${withDefault("b", "0")}) {}\nvoid f() { g(1, 2, 3); }\n`, mode)).toEqual(expected);
        });

        it("can be given on a prototype", () => {
            expect(codes(driver, `void g(int a, ${withDefault("b", "0")});\nvoid f() { g(1); }\nvoid g(int a, int b) {}\n`, mode)).toEqual([]);
        });
    });
});

describe("default argument values (LDMud)", () => {
    // From LDMud's own test suite, t-language/tl-defaultvalues.c.
    it("can come before a varargs parameter", () => {
        const fun3 = `int fun3(int a, int b = 3*a, int c = 200, varargs int* d) { return a; }\n`;
        for (const mode of ["strict", "driver"] as const) {
            expect(codes(LDMud, `${fun3}void f() { fun3(1); fun3(1, 2); fun3(1, 2, 5); fun3(1, 2, 5, 6, 7); }\n`, mode)).toEqual([]);
            expect(codes(LDMud, `${fun3}void f() { fun3(); }\n`, mode).map(d => d.slice(0, 4))).toEqual(["2555"]);
        }
    });

    it("are type checked", () => {
        expect(codes(LDMud, `void g(int a, int b = "x") {}\n`, "strict")).toEqual(["2322: Type 'string' is not assignable to type 'int'."]);
    });

    it("make an efun's defaulted argument optional (efun.h: swap(object obj, int flags = 0))", () => {
        expect(codes(LDMud, `void f(object o) { swap(o); swap(o, 1); }\n`, "driver")).toEqual([]);
    });

    it("are optional in signature help", () => {
        const source = `void g(int a, int b = 0) {}\nvoid f() { g(1); }\n`;
        const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType: LDMud });
        const help = ls.getSignatureHelpItems(abs("test.c"), source.indexOf("g(1)") + 2, undefined);
        expect(help?.items[0].parameters.map(p => p.isOptional)).toEqual([false, true]);
    });
});
