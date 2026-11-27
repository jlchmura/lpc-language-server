import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * A macro argument may be an operator. One that starts with `*` (`M(*=, ...)`, as in LDMud's
 * t-lvalues.c `MAKE_OP_TEST(*=, ...)`) used to be scanned with the call's `(` as FluffOS's
 * `(*`, so the call lost its arguments.
 */
function diagnosticsFor(source: string, driverType: lpc.LanguageVariant): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType, diagnostics: true });
    return allDiagnostics(ls, abs("test.c")).map(codeAndMessage);
}

describe.each([lpc.LanguageVariant.LDMud, lpc.LanguageVariant.FluffOS])("an operator as a macro argument (%s)", (driverType) => {
    it("is substituted, also one starting with *", () => {
        expect(diagnosticsFor(`#define OP(OP_NAME, A, B) A OP_NAME B\nint f() { int x = 2; OP(*=, x, 3); OP(+=, x, 3); OP(=, x, 3); return OP(*, x, 3); }\n`, driverType)).toEqual([]);
    });

    it("is checked where it lands", () => {
        expect(diagnosticsFor(`#define OP(OP_NAME, A, B) A OP_NAME B\nvoid f() { float m = 1.5; OP(*=, m, "a"); }\n`, driverType)).toEqual([
            "2365: Operator '*=' cannot be applied to types 'float' and 'string'.",
        ]);
    });
});
