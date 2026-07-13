import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";

/**
 * LPC has no tuple type syntax, but the checker builds tuple types internally when
 * modeling spread/rest call arguments. Calling an overloaded efun such as `min` with
 * several positional arguments produces a spread tuple (e.g. `[int, string]`) that is
 * checked against the efun's overloads. Rendering that tuple for a diagnostic used to
 * fail in the type-node builder -- the tuple case set `encounteredError` and returned
 * undefined, so the type printed as `<never>` (and `typeToString` logged a warning).
 *
 * The builder now renders a tuple as an array of its element-type union, so the type is
 * shown correctly in the message.
 */
function diagnosticMessages(source: string, driverType = lpc.LanguageVariant.LDMud): string[] {
    const cwd = lpc.normalizePath(process.cwd());
    const fileName = lpc.normalizePath(path.join(cwd, "tuple.c"));
    const options: lpc.CompilerOptions = { driverType, diagnostics: true };
    const host = lpc.createCompilerHost(options);
    host.getDefaultLibFileName = () =>
        lpc.combinePaths(cwd, lpc.getDefaultLibFolder(options), lpc.getDefaultLibFileName(options));
    const origRead = host.readFile.bind(host);
    host.readFile = (n?: string) => (n && lpc.normalizePath(n) === fileName ? source : (n ? origRead(n) : undefined));
    host.fileExists = (n?: string) => (n ? (lpc.normalizePath(n) === fileName ? true : lpc.sys.fileExists(n)) : false);
    const program = lpc.createProgram({ host, rootNames: [fileName], options, oldProgram: undefined });
    const file = program.getSourceFile(fileName)!;
    return [...file.parseDiagnostics, ...program.getSemanticDiagnostics(file)].map(d =>
        lpc.flattenDiagnosticMessageText(d.messageText, "\n"));
}

describe("tuple type rendering in the node builder", () => {
    it("renders a spread-argument tuple as an array of its element union, not `<never>`", () => {
        // `min(1, "a")` has no matching overload; the [int, string] spread tuple appears in
        // the mismatch message. Before the fix it rendered as `<never>`.
        const messages = diagnosticMessages(`void f() { mixed x = min(1, "a"); }\n`);
        const argError = messages.find(m => /Argument of type .* is not assignable/.test(m));
        expect(argError).toBeDefined();
        expect(argError).toContain("(string | int)*");
        expect(argError).not.toContain("<never>");
    });
});
