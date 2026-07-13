import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";

/**
 * FluffOS `input_to` has a polymorphic second argument. The driver
 * (`f_input_to` in efuns_main.cc) treats the second argument as the `flag`
 * bitmask ONLY when it is an int; any non-int second argument is instead the
 * first carry-over argument forwarded to the callback. So passing an object
 * there is legal, not a type error.
 *
 *   input_to("confirm_recursive_delete", caller);   // caller -> callback arg
 *
 * Regression: the efun header used to type the second parameter as `int flag`,
 * which rejected the object with "Argument of type 'object ...' is not
 * assignable to parameter of type 'int'".
 */

function diagnosticsFor(source: string, driverType: lpc.LanguageVariant): lpc.Diagnostic[] {
    const root = process.cwd();
    const virtualFile = lpc.normalizeSlashes(path.join(root, "server/src/tests/cases/compiler/__inputToProbe.c"));
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

describe("FluffOS input_to polymorphic second argument", () => {
    it("accepts a non-int (object) second argument as a forwarded callback arg", () => {
        const source =
            "void confirm_recursive_delete(string input, object caller) {}\n" +
            "void test(object caller) {\n" +
            "    input_to(\"confirm_recursive_delete\", caller);\n" +
            "}\n";
        const text = messages(diagnosticsFor(source, lpc.LanguageVariant.FluffOS));
        expect(text).not.toContain("not assignable to parameter");
    });

    it("still accepts an int in the flag position", () => {
        const source =
            "void collect_password(string input) {}\n" +
            "void test() {\n" +
            "    input_to(\"collect_password\", 1);\n" +
            "}\n";
        const text = messages(diagnosticsFor(source, lpc.LanguageVariant.FluffOS));
        expect(text).not.toContain("not assignable to parameter");
    });

    it("still accepts the fun-only form", () => {
        const source =
            "void collect_line(string input) {}\n" +
            "void test() {\n" +
            "    input_to(\"collect_line\");\n" +
            "}\n";
        const text = messages(diagnosticsFor(source, lpc.LanguageVariant.FluffOS));
        expect(text).not.toContain("not assignable to parameter");
    });
});
