import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * An LDMud inline closure's context variables are initialized in the enclosing function, when
 * the closure is created (doc/LPC/inline-closures). So in `: int result = result + 1` the
 * initializer reads the enclosing `result` (t-language/tl-contextvars.c), not the context
 * variable it declares.
 */
function service(source: string) {
    return createTestLanguageService({ "test.c": source }, { driverType: lpc.LanguageVariant.LDMud, diagnostics: true });
}

function diagnosticsFor(source: string): string[] {
    const { ls, abs } = service(source);
    return allDiagnostics(ls, abs("test.c")).map(codeAndMessage);
}

describe("an inline closure's context variable initializer", () => {
    it("reads an enclosing variable of the same name", () => {
        expect(diagnosticsFor(`int run_test() {
    int result = 10;
    return funcall(function int() {
        return funcall(function int() : int result = result + 1 { return result; });
    }) == 11;
}`)).toEqual([]);
    });

    it("resolves the name to the enclosing declaration", () => {
        const source = `int f() { int result = 10; return funcall(function int() : int result = result + 1 { return result; }); }`;
        const { ls, abs } = service(source);
        const use = source.indexOf("result + 1");
        const [def] = ls.getDefinitionAtPosition(abs("test.c"), use) ?? [];
        expect(def?.textSpan.start).toBe(source.indexOf("result = 10"));
    });

    it("does not see the closure's own parameters", () => {
        expect(diagnosticsFor(`int f() { return funcall(function int(int val) : int x = val { return x; }, 1); }`)).toEqual([
            "2304: Cannot find name 'val'.",
        ]);
    });

    it("still gives the body the context variable", () => {
        expect(diagnosticsFor(`int f() { int arg = 2; closure c = function int(int val) : int x = 2 * arg { return val * x; }; return funcall(c, 3); }`)).toEqual([]);
        expect(diagnosticsFor(`void f() { closure c = function int() : string s = "a" { return s; }; }`)).toEqual([
            "2322: Type 'string' is not assignable to type 'int'.",
        ]);
    });

    // t-mantis.c, 0000631-6 and 0000631-10: context variables are initialized in order
    it("sees the context variables declared before it", () => {
        expect(diagnosticsFor(`int f() {\n    int a = 1;\n    return funcall(function int () : int b = a + 1; int c = b + 1 { return c; });\n}`)).toEqual([]);
        expect(diagnosticsFor(`int f() { return funcall(function int () : int b = 1, c = b + 1 { return c; }); }`)).toEqual([]);
        expect(diagnosticsFor(`mixed f() { return funcall(function : mixed i = 1; mixed j = function { return i; } { return j; }); }`)).toEqual([]);
    });

    it("does not see the context variables declared after it", () => {
        expect(diagnosticsFor(`int f() { return funcall(function int () : int b = c; int c = 1 { return b; }); }`)).toEqual([
            "2304: Cannot find name 'c'.",
        ]);
    });

    it("resolves an earlier context variable to its declaration", () => {
        const source = `int f() { int b = 5; return funcall(function int () : int b = 1; int c = b + 1 { return c; }); }`;
        const { ls, abs } = service(source);
        const [def] = ls.getDefinitionAtPosition(abs("test.c"), source.indexOf("b + 1")) ?? [];
        expect(def?.textSpan.start).toBe(source.indexOf("b = 1"));
    });
});

describe("an inline closure's context variables in a macro", () => {
    it("are initialized in order", () => {
        expect(diagnosticsFor(`#define CL(a) funcall(function int () : int b = a + 1; int c = b + 1 { return c; })\nint f() { return CL(1); }\n`)).toEqual([]);
        expect(diagnosticsFor(`#define CL funcall(function int () : int b = c; int c = 1 { return b; })\nint f() { return CL; }\n`)).toEqual(["2304: Cannot find name 'c'."]);
    });
});
