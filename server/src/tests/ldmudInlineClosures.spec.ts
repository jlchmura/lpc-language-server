import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService } from "./harness.js";

/**
 * LDMud inline closures (doc/LPC/inline-closures):
 *
 *     function [<type>] [(<arguments>)] [: <context>] { <code> }
 *
 * The return type, the parameter list and the context are all optional. The context is a list
 * of variable declaration groups separated by `;` and ended by the body's `{`; its variables
 * are visible in the body with their declared types.
 */
function diagnosticsFor(source: string, driverType = lpc.LanguageVariant.LDMud): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, {
        driverType,
        diagnostics: true,
    });
    return [...ls.getSyntacticDiagnostics(abs("test.c")), ...ls.getSemanticDiagnostics(abs("test.c"))]
        .map(d => `${d.code}: ${lpc.flattenDiagnosticMessageText(d.messageText, " ")}`);
}

describe("LDMud inline closures", () => {
    it("accepts a typed closure with parameters", () => {
        expect(diagnosticsFor(`closure f(int arg) { return function int (int val) { return val * arg; }; }`)).toEqual([]);
    });

    it("accepts a closure without type or parameters", () => {
        expect(diagnosticsFor(`mixed *f() { return sort_array(({3, 1, 2}), function { return $1 > $2; }); }`)).toEqual([]);
    });

    it("accepts a context variable", () => {
        expect(diagnosticsFor(`closure f(int arg) { return function int (int val) : int x = 2 * arg { return val * x; }; }`)).toEqual([]);
    });

    it("accepts several context groups", () => {
        expect(diagnosticsFor(`closure f(int arg) {
    return function int (int val) : int y, x = 2 * arg; int z { z = y + 1; return val * x + z; };
}`)).toEqual([]);
    });

    it("accepts an empty context", () => {
        expect(diagnosticsFor(`closure f(mapping m) { return function string (object o, int n) : { return m["name"]; }; }`)).toEqual([]);
    });

    it("accepts a context without parameters", () => {
        expect(diagnosticsFor(`closure f(int base) { return function : int b = base { return b + $1; }; }`)).toEqual([]);
    });

    it("type-checks context variables in the body", () => {
        expect(diagnosticsFor(`#pragma strict_types\nclosure f(int arg) { return function int (int val) : string s = "x" { return s; }; }`))
            .toEqual([expect.stringMatching(/^2322: Type 'string' is not assignable to type 'int'/)]);
    });
});
