import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * `#line N` and `#echo text` are directives in both drivers (LDMud lex.c, FluffOS
 * lexer_rules_pp.cc). One renumbers the driver's messages and the other prints to its console,
 * so the server skips their line. They used to be read as code. A `#line` whose argument is not
 * a number still is, so that it is reported where it is compiled, as the drivers do.
 */
function diagnosticsFor(source: string, driverType: lpc.LanguageVariant): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType, diagnostics: true });
    return allDiagnostics(ls, abs("test.c")).map(codeAndMessage);
}

describe.each([lpc.LanguageVariant.LDMud, lpc.LanguageVariant.FluffOS])("#line and #echo (%s)", (driverType) => {
    it("are skipped", () => {
        expect(diagnosticsFor(`#line 10 /* this should not fail */\n#echo compiling it's "test"\n# line 20\nint run_test() { return 1; }\n`, driverType)).toEqual([]);
    });

    it("leave the next line's code alone", () => {
        const source = `#line 10\nstring run_test() { return 1; }\n`;
        const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType, diagnostics: true });
        const [diag] = allDiagnostics(ls, abs("test.c"));
        expect(codeAndMessage(diag)).toBe("2322: Type 'int' is not assignable to type 'string'.");
        expect(diag.start).toBe(source.indexOf("return"));
    });

    it("leave a malformed #line to be reported", () => {
        expect(diagnosticsFor(`#line 10 this should fail\nint x;\n`, driverType)).not.toEqual([]);
        expect(diagnosticsFor(`#if 0\n#line 10 this should fail\n#endif\nint x;\n`, driverType)).toEqual([]);
    });

    it("are skipped in an inactive branch", () => {
        expect(diagnosticsFor(`#if 0\n#line 5\n#echo no\n#endif\nint x;\n`, driverType)).toEqual([]);
    });
});
