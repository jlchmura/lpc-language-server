import * as lpc from "./_namespaces/lpc.js";
import { messageLines, createTestProgram } from "./harness.js";

/**
 * The byte-buffer intrinsic is one type with two driver-specific spellings:
 * `buffer` in FluffOS and `bytes` in LDMud. Diagnostics and hovers must render
 * it with the name that matches the active driver.
 *
 * https://github.com/jlchmura/lpc-language-server/issues/311
 */

function diagnosticsFor(source: string, driverType: lpc.LanguageVariant): lpc.Diagnostic[] {
    const { program, sourceFile } = createTestProgram({ "server/src/tests/cases/compiler/__bufferProbe.c": source }, { driverType });
    const file = sourceFile();
    return [...file.parseDiagnostics, ...program.getSemanticDiagnostics(file)];
}

function messages(diags: lpc.Diagnostic[]): string {
    return diags.map(messageLines).join("\n");
}

describe("buffer/bytes type naming (#311)", () => {
    // Assigning `string | buffer` to a `buffer` is a genuine error (the `string`
    // constituent isn't assignable), so the diagnostic exercises how the type is named.
    const source = "string | buffer read_thing(string src);\nvoid test() { buffer b = read_thing(\"x\"); }";

    it("names the type `buffer` under FluffOS", () => {
        const text = messages(diagnosticsFor(source, lpc.LanguageVariant.FluffOS));
        expect(text).toContain("buffer");
        expect(text).not.toContain("bytes");
    });

    it("names the type `bytes` under LDMud", () => {
        // `bytes` is the LDMud spelling of the same intrinsic.
        const ldSource = "string | bytes read_thing(string src);\nvoid test() { bytes b = read_thing(\"x\"); }";
        const text = messages(diagnosticsFor(ldSource, lpc.LanguageVariant.LDMud));
        expect(text).toContain("bytes");
        expect(text).not.toContain("buffer");
    });
});
