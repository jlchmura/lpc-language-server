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
});
