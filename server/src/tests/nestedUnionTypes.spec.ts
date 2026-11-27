import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * A bracketed union may be one member of another union: in `< <int|string>* | float>*` the
 * elements are either an array of int|string or a float (LDMud's t-language/tl-unions.c).
 * The parser used to end the inner union at its `>*` and then expect the outer `>`.
 */
function diagnosticsFor(source: string): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType: lpc.LanguageVariant.LDMud, diagnostics: true });
    return allDiagnostics(ls, abs("test.c")).map(codeAndMessage);
}

describe("a bracketed union inside a union", () => {
    it("parses in a variable, a return type and a parameter", () => {
        expect(diagnosticsFor(`< <int|string>* | symbol>* g;\n< <int|string>*| symbol>* f(< <int|string>*| symbol>* val) { return val; }\nvoid h() { g = ({ ({ 1, 2, 3, "hey" }) }); g = f(g); }\n`)).toEqual([]);
    });

    it("has the union's type", () => {
        expect(diagnosticsFor(`< <int|string>* | float>* g;\nvoid h() { g = ({ ({ 1, "a" }), 2.5 }); string s = g; g = ({ "a" }); }\n`)).toEqual([
            "2322: Type '(float | (string | int)*)*' is not assignable to type 'string'.",
            "2322: Type 'string*' is not assignable to type '(float | (string | int)*)*'.   Type 'string' is not assignable to type 'float | (string | int)*'.",
        ]);
    });

    it("may come after another member", () => {
        expect(diagnosticsFor(`<float | <int|string>*>* g;\nvoid h() { g = ({ ({ 1, "a" }), 2.5 }); }\n`)).toEqual([]);
    });
});
