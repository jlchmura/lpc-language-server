import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * `|` and `^` on arrays are a union and a symmetric difference in both drivers. With an array on
 * one side and `mixed` on the other the result is that array, not a number: LDMud's
 * tl-rttc-assign.c does `int *i; i |= funcall(({ 20 }));`.
 */
function diagnosticsFor(source: string, driverType: lpc.LanguageVariant, typeChecking: lpc.TypeCheckingMode): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType, diagnostics: true, typeChecking });
    return allDiagnostics(ls, abs("test.c")).map(codeAndMessage);
}

describe.each([
    [lpc.LanguageVariant.LDMud, "driver"],
    [lpc.LanguageVariant.LDMud, "strict"],
    [lpc.LanguageVariant.FluffOS, "strict"],
] as const)("| and ^ with an array and mixed (%s, %s)", (driverType, typeChecking) => {
    it("give the array", () => {
        expect(diagnosticsFor(`void f(mixed m) { int *i = ({ 1 }); i |= m; i ^= m; i = i | m; i = m ^ i; }\n`, driverType, typeChecking)).toEqual([]);
        expect(diagnosticsFor(`void f(mixed m, int *i) { string s = i | m; }\n`, driverType, typeChecking)).toEqual([
            "2322: Type 'int*' is not assignable to type 'string'.",
        ]);
    });

    it("leave a number with mixed a number", () => {
        expect(diagnosticsFor(`void f(mixed m, int j) { j |= m; j = j ^ m; }\n`, driverType, typeChecking)).toEqual([]);
    });
});
