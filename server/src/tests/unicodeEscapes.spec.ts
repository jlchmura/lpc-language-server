import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * `\U` takes a code point in 8 hex digits in both drivers (LDMud lex.c, FluffOS lexer.l), and a
 * character literal is one code point, even one outside the BMP (t-0000432/master.c,
 * "Character literals 2": `'\U0001f609' == 0x1f609`). A comparison of two string literals with
 * no overlap is an error in strict mode, so `==` between them shows whether they are equal.
 */
function diagnosticsFor(source: string, driverType: lpc.LanguageVariant): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType, diagnostics: true });
    return allDiagnostics(ls, abs("test.c")).map(codeAndMessage);
}

describe.each([
    ["LDMud", lpc.LanguageVariant.LDMud],
    ["FluffOS", lpc.LanguageVariant.FluffOS],
] as const)("unicode escapes (%s)", (_, driverType) => {
    it("reads \\U in a character literal as one code point", () => {
        expect(diagnosticsFor(`int f() { return '\\U0001f609' == 0x1f609 && '\\u2694' == 0x2694 && '😉' == 128521; }\n`, driverType)).toEqual([]);
    });

    it("gives the character literal its code point", () => {
        expect(diagnosticsFor(`int f() { return '\\U0001f609' == 0x1f60a; }\n`, driverType)).toEqual([
            "2367: This comparison appears to be unintentional because the types '128521' and '128522' have no overlap.",
        ]);
    });

    it("reads \\U in a string", () => {
        expect(diagnosticsFor(`int f() { return "\\U0001f609" == "😉" && "a\\U00000041" == "aA"; }\n`, driverType)).toEqual([]);
    });

    it("still reports a character literal of two characters", () => {
        expect(diagnosticsFor(`int f() { return 'ab'; }\n`, driverType)).toEqual(["9015: Character literal must be one character."]);
    });

    it("reports \\U with too few hex digits", () => {
        expect(diagnosticsFor(`string s = "\\U12";\n`, driverType)).toEqual(["1125: Hexadecimal digit expected."]);
    });
});
