import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";

/**
 * FluffOS anonymous function expressions put their parameter list directly
 * after the `function` keyword, with no return type:
 *
 *     function(string line) { return trim(line); }
 *
 * Regression: parseFunctionExpression() used to unconditionally parse a return
 * type after `function`, so it tried to read the `(` parameter list as a type.
 * That derailed parsing of the whole enclosing function and cascaded into bogus
 * "'(' expected" / "Declaration or statement expected" diagnostics.
 */
function syntacticDiags(source: string): string[] {
    const cwd = lpc.normalizePath(process.cwd());
    const fileName = lpc.normalizePath(path.join(cwd, "anon.c"));
    const options: lpc.CompilerOptions = { driverType: lpc.LanguageVariant.FluffOS, diagnostics: true };
    const host = lpc.createCompilerHost(options);
    host.getDefaultLibFileName = () =>
        lpc.combinePaths(cwd, lpc.getDefaultLibFolder(options), lpc.getDefaultLibFileName(options));
    const origRead = host.readFile.bind(host);
    host.readFile = (n?: string) => (n && lpc.normalizePath(n) === fileName ? source : (n ? origRead(n) : undefined));
    host.fileExists = (n?: string) => (n ? (lpc.normalizePath(n) === fileName ? true : lpc.sys.fileExists(n)) : false);
    const program = lpc.createProgram({ host, rootNames: [fileName], options, oldProgram: undefined });
    const file = program.getSourceFile(fileName)!;
    return program.getSyntacticDiagnostics(file).map(d => lpc.flattenDiagnosticMessageText(d.messageText, "\n"));
}

describe("anonymous function expressions (FluffOS)", () => {
    it("parses `function(params) { body }` passed as a call argument", () => {
        const source =
            `mixed f(string str) {\n` +
            `    str = implode(map(explode(str, "\\n"), function(string line) {\n` +
            `        return trim(line);\n` +
            `    }), "\\n");\n` +
            `    return str;\n` +
            `}\n`;
        expect(syntacticDiags(source)).toEqual([]);
    });

    it("parses `function(params) { body }` assigned to a variable", () => {
        const source =
            `void f() {\n` +
            `    function g = function(int a, int b) { return a + b; };\n` +
            `}\n`;
        expect(syntacticDiags(source)).toEqual([]);
    });

    it("parses a no-parameter anonymous function", () => {
        const source =
            `void f() {\n` +
            `    function g = function() { return 1; };\n` +
            `}\n`;
        expect(syntacticDiags(source)).toEqual([]);
    });

    it("still parses a named/typed function expression with a return type", () => {
        // The non-anonymous form (`function <type> <name>(params) { ... }`) must
        // keep working; the fix only skips the return type when `(` follows.
        const source =
            `void f() {\n` +
            `    function g = function int add(int a, int b) { return a + b; };\n` +
            `}\n`;
        expect(syntacticDiags(source)).toEqual([]);
    });

    it("does not let a trailing statement leak to top level after an inline function", () => {
        // This mirrors the shape of from_string() in the mudlib: an inline
        // function early in the body, and a fall-through statement at the end.
        // If the inline function derails parsing, the final statement is
        // mis-parsed as a top-level declaration.
        const source =
            `mixed from_string(string str) {\n` +
            `    str = implode(map(explode(str, "\\n"), function(string line) {\n` +
            `        return trim(line);\n` +
            `    }), "\\n");\n` +
            `    error("Gobbledygook in string.\\n");\n` +
            `}\n`;
        expect(syntacticDiags(source)).toEqual([]);
    });
});
