import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";

/**
 * The byte-buffer intrinsic is one type with two driver-specific spellings:
 * `buffer` in FluffOS and `bytes` in LDMud. Diagnostics and hovers must render
 * it with the name that matches the active driver.
 *
 * https://github.com/jlchmura/lpc-language-server/issues/311
 */

function diagnosticsFor(source: string, driverType: lpc.LanguageVariant): lpc.Diagnostic[] {
    const root = process.cwd();
    const virtualFile = lpc.normalizeSlashes(path.join(root, "server/src/tests/cases/compiler/__bufferProbe.c"));
    const isVirtual = (fn: string) => !!fn && lpc.normalizeSlashes(fn) === virtualFile;

    const compilerOptions: lpc.CompilerOptions = { driverType, diagnostics: true };
    const host = lpc.createCompilerHost(compilerOptions);
    const origReadFile = host.readFile;
    const origFileExists = host.fileExists;
    host.readFile = (fn: string) => (isVirtual(fn) ? source : origReadFile.call(host, fn));
    host.fileExists = (fn: string) => (isVirtual(fn) ? true : origFileExists.call(host, fn));
    host.getDefaultLibFileName = () =>
        lpc.combinePaths(root, lpc.getDefaultLibFolder(compilerOptions), lpc.getDefaultLibFileName(compilerOptions));

    const program = lpc.createProgram({ host, rootNames: [virtualFile], options: compilerOptions, oldProgram: undefined });
    const file = program.getSourceFile(virtualFile)!;
    return [...file.parseDiagnostics, ...program.getSemanticDiagnostics(file)];
}

function messages(diags: lpc.Diagnostic[]): string {
    return diags.map(d => lpc.flattenDiagnosticMessageText(d.messageText, "\n")).join("\n");
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
