import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService, allDiagnostics, codeAndMessage } from "./harness.js";

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
    return allDiagnostics(ls, abs("test.c")).map(codeAndMessage);
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

    it("finds a context variable from its declaration (hover, references)", () => {
        const source = `int f() {\n    closure c = function int (int a) : int ctx = 1; string s = "" { return ctx + a + sizeof(s); };\n    return 0;\n}\n`;
        const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType: lpc.LanguageVariant.LDMud });
        const declaration = source.indexOf("ctx"), use = source.indexOf("ctx", declaration + 1);
        expect(lpc.displayPartsToString(ls.getQuickInfoAtPosition(abs("test.c"), declaration)?.displayParts)).toBe("(local var)  int ctx");
        expect(lpc.displayPartsToString(ls.getQuickInfoAtPosition(abs("test.c"), source.indexOf("s ="))?.displayParts)).toBe("(local var)  string s");
        const references = ls.findReferences(abs("test.c"), declaration)?.flatMap(r => r.references.map(x => x.textSpan.start));
        expect(references).toEqual([declaration, use]);
    });
});
