import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";

/**
 * `forEachProgramBatch` checks a large root set in memory-bounded batches, building an
 * independent program per chunk (root chunk + its lazily loaded dependency closure) and
 * releasing it before the next. These tests assert the behavior that makes it a safe
 * replacement for a single whole-project program (issue #282):
 *   - a file's dependencies (e.g. an inherited parent) are resolved within its own batch, and
 *   - the union of per-batch diagnostics equals a single full program's diagnostics.
 */
const options: lpc.CompilerOptions = { driverType: lpc.LanguageVariant.FluffOS, diagnostics: true };

function makeHost(files: Map<string, string>): lpc.CompilerHost {
    const cwd = lpc.normalizePath(process.cwd());
    const host = lpc.createCompilerHost(options);
    host.getDefaultLibFileName = () =>
        lpc.combinePaths(cwd, lpc.getDefaultLibFolder(options), lpc.getDefaultLibFileName(options));
    const norm = (n?: string) => (n ? lpc.normalizePath(n) : n);
    const origRead = host.readFile.bind(host);
    host.readFile = (n?: string) => {
        const k = norm(n);
        return k && files.has(k) ? files.get(k)! : (n ? origRead(n) : undefined);
    };
    host.fileExists = (n?: string) => {
        const k = norm(n);
        return !!k && (files.has(k) || lpc.sys.fileExists(n!));
    };
    return host;
}

function checkFile(program: lpc.Program, fileName: string): string[] {
    const sf = program.getSourceFile(fileName);
    return [...program.getSyntacticDiagnostics(sf), ...program.getSemanticDiagnostics(sf)]
        .map(d => `${lpc.normalizePath(d.file?.fileName ?? "")}: ${lpc.flattenDiagnosticMessageText(d.messageText, "\n")}`);
}

function singleProgramDiagnostics(files: Map<string, string>, roots: string[]): string[] {
    const program = lpc.createProgram({ host: makeHost(files), rootNames: roots, options, oldProgram: undefined });
    return roots.flatMap(r => checkFile(program, r)).sort();
}

function batchedDiagnostics(files: Map<string, string>, roots: string[], batchSize: number): { diags: string[]; batches: number } {
    const diags: string[] = [];
    let batches = 0;
    lpc.forEachProgramBatch(
        { rootNames: roots, options, batchSize, createHost: () => makeHost(files) },
        (program, batchRootNames) => {
            batches++;
            for (const f of batchRootNames) diags.push(...checkFile(program, f));
        },
    );
    return { diags: diags.sort(), batches };
}

describe("forEachProgramBatch", () => {
    const P = (n: string) => lpc.normalizePath(path.join(process.cwd(), n));
    const files = new Map<string, string>([
        [P("parent.c"), "int shared_global;\n"],
        [P("child.c"), 'inherit "parent";\nvoid use() { shared_global = 1; }\n'],
        [P("bad.c"), "void f() { undeclared_thing = 1; }\n"],
        [P("badret.c"), 'int f() { return "s"; }\n'],
    ]);
    const roots = [P("parent.c"), P("child.c"), P("bad.c"), P("badret.c")];

    it("splits roots into the expected number of batches", () => {
        expect(batchedDiagnostics(files, roots, 1).batches).toBe(4);
        expect(batchedDiagnostics(files, roots, 2).batches).toBe(2);
        expect(batchedDiagnostics(files, roots, 100).batches).toBe(1);
        expect(batchedDiagnostics(files, roots, 3).batches).toBe(2); // 3 + 1
    });

    it("produces the same diagnostics as a single whole-project program", () => {
        const baseline = singleProgramDiagnostics(files, roots);
        // Sanity: the baseline actually contains the seeded errors and nothing spurious.
        expect(baseline).toEqual([
            `${P("bad.c")}: Cannot find name 'undeclared_thing'.`,
            `${P("badret.c")}: Type 'string' is not assignable to type 'int'.`,
        ]);
        // Maximal batching (one file per program) must match exactly...
        expect(batchedDiagnostics(files, roots, 1).diags).toEqual(baseline);
        // ...as must a couple of other batch sizes.
        expect(batchedDiagnostics(files, roots, 2).diags).toEqual(baseline);
        expect(batchedDiagnostics(files, roots, 100).diags).toEqual(baseline);
    });

    it("resolves a file's dependencies inside its own batch (inherited global stays clean)", () => {
        // With one file per batch, child.c is checked alone; its `inherit \"parent\"` must pull
        // parent.c into the batch so `shared_global` resolves -- otherwise we'd see a
        // \"Cannot find name 'shared_global'\" diagnostic here.
        const { diags } = batchedDiagnostics(files, [P("child.c")], 1);
        expect(diags).toEqual([]);
    });
});
