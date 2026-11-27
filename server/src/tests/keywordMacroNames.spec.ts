import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * To the preprocessor a keyword is a name like any other, so `#define bytes string` defines a
 * macro and later uses of `bytes` expand to `string` until it is undefined (LDMud's
 * t-language/tl-pragma_no_bytes_type.c). It used to take only a non-reserved keyword.
 */
function diagnosticsFor(source: string, driverType: lpc.LanguageVariant): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType, diagnostics: true });
    return allDiagnostics(ls, abs("test.c")).map(codeAndMessage);
}

describe("a macro named after a keyword", () => {
    it("is defined, expanded and undefined (LDMud)", () => {
        expect(diagnosticsFor(`#define bytes string\nbytes f() { return "a"; }\n#undef bytes\nbytes g() { return "a"; }\n`, lpc.LanguageVariant.LDMud)).toEqual([
            "2322: Type 'string' is not assignable to type 'bytes'.",
        ]);
    });

    it.each([lpc.LanguageVariant.LDMud, lpc.LanguageVariant.FluffOS])("is a name in #ifdef (%s)", (driverType) => {
        expect(diagnosticsFor(`#define status int\nstatus h() { return "x"; }\n#ifdef status\nint ok;\n#else\nint ok = "no";\n#endif\n`, driverType)).toEqual([
            "2322: Type 'string' is not assignable to type 'int'.",
        ]);
    });
});
