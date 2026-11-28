import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * LDMud compiles a cast to int, float, string, object or int* as a conversion (prolang.y,
 * `cast expr0`: F_TO_INT, F_TO_FLOAT, F_TO_STRING, F_TO_OBJECT, F_TO_ARRAY), so it accepts a
 * value of any type: `(string)ob` is the object's name. FluffOS converts nothing; it rejects a
 * cast between two different known types in typed code ("Cannot cast", grammar.y).
 */
const source = `void f(object ob, int i, string s, mapping m, float fl) {
    string a = (string)ob;
    string b = (string)i;
    int c = (int)s;
    object d = (object)s;
    float e = (float)s;
    int *g = (int*)s;
}`;

describe.each(["strict", "driver"] as const)("casts (%s mode)", typeChecking => {
    function diagnosticsFor(driverType: lpc.LanguageVariant, text: string): string[] {
        const { ls, abs } = createTestLanguageService({ "test.c": text }, { driverType, diagnostics: true, typeChecking });
        return allDiagnostics(ls, abs("test.c")).map(codeAndMessage);
    }

    it("LDMud converts to int, float, string, object and int*", () => {
        expect(diagnosticsFor(lpc.LanguageVariant.LDMud, source)).toEqual([]);
    });

    it("LDMud still checks a declarative cast", () => {
        expect(diagnosticsFor(lpc.LanguageVariant.LDMud, `void f(int i) { mapping m = (mapping)i; }`)).toEqual([
            "2352: Conversion of type 'int' to type 'mapping' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.",
        ]);
    });

    it("FluffOS rejects a cast between different types", () => {
        expect(diagnosticsFor(lpc.LanguageVariant.FluffOS, `void f(object ob) { string a = (string)ob; }`)).toEqual([
            "2352: Conversion of type 'object' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.",
        ]);
    });
});
