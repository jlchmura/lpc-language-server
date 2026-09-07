import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";

/**
 * `parseList` requires every element parse to consume at least one token. When one does
 * not -- `isListElement()` accepts a token the grammar has no production for -- the loop
 * spins forever, `finishNode` piles entries into `nodeFileMap` until the Map hits its
 * ~16.7M cap, and the RangeError surfaces from whatever unrelated frame happens to be on
 * the stack. The project then fails to build and every file silently loses diagnostics.
 *
 * Found in the wild: one `async` prototype in an included header took down a whole mudlib
 * project on a build without FluffOS coroutine support. The scanner still produces
 * AsyncKeyword there; nothing accepts it in declaration position.
 *
 * These tests assert TERMINATION, not any particular diagnostic -- a build that DOES have
 * a production for the token is equally correct, and should stay passing.
 */
let lastProgram: lpc.Program | undefined;

function parse(source: string) {
    const root = process.cwd();
    const virtualFile = lpc.normalizeSlashes(path.join(root, "server/src/tests/cases/compiler/__progress.c"));
    const isVirtual = (fn: string) => !!fn && lpc.normalizeSlashes(fn) === virtualFile;

    const compilerOptions: lpc.CompilerOptions = { driverType: lpc.LanguageVariant.FluffOS, diagnostics: true };
    const host = lpc.createCompilerHost(compilerOptions);
    const origReadFile = host.readFile;
    const origFileExists = host.fileExists;
    host.readFile = (fn: string) => (isVirtual(fn) ? source : origReadFile.call(host, fn));
    host.fileExists = (fn: string) => (isVirtual(fn) ? true : origFileExists.call(host, fn));
    host.getDefaultLibFileName = () =>
        lpc.combinePaths(root, lpc.getDefaultLibFolder(compilerOptions), lpc.getDefaultLibFileName(compilerOptions));

    const program = lpc.createProgram({ host, rootNames: [virtualFile], options: compilerOptions, oldProgram: undefined });
    lastProgram = program;
    return program.getSourceFile(virtualFile)!;
}

/**
 * A parse error inside an `#include` cannot go in the including file's `parseDiagnostics`
 * -- its position indexes the INCLUDED file's text -- so attachFileToDiagnostics() drops
 * it. The checker already surfaces an include's SEMANTIC errors on the `#include` line
 * (Include_file_0_contains_one_or_more_errors, with the real errors as related info);
 * parse errors were missing from that, so a header that failed to PARSE was silent -- and
 * a header that fails to parse takes all of its declarations with it.
 */
describe("a parse error inside an #include is reported on the directive", () => {
    it("reports the include line and carries the real error as related info", () => {
        const sf = parse(`#include "badAsyncInclude.h"\nvoid f() { }\n`);
        const program = lastProgram!;
        const diags = program.getSemanticDiagnostics(sf);
        const msgs = diags.map(d => lpc.flattenDiagnosticMessageText(d.messageText, " "));
        expect(msgs.some(m => m.includes("contains one or more errors"))).toBe(true);

        const related = diags.flatMap(d => d.relatedInformation ?? [])
            .map(r => lpc.flattenDiagnosticMessageText(r.messageText, " "));
        expect(related.length).toBeGreaterThan(0);
    }, 15000);

    it("stays quiet when the include parses cleanly", () => {
        const sf = parse(`#include "includeFile.h"\nvoid f() { }\n`);
        const diags = lastProgram!.getSemanticDiagnostics(sf);
        const msgs = diags.map(d => lpc.flattenDiagnosticMessageText(d.messageText, " "));
        expect(msgs.some(m => m.includes("contains one or more errors"))).toBe(false);
    }, 15000);
});

describe("parser makes progress on every list element", () => {
    it("terminates on an async prototype at top level", () => {
        const sf = parse(`async void plain_async();\nvoid f() { }\n`);
        expect(sf).toBeDefined();
    }, 15000);

    it("terminates on a run of async prototypes", () => {
        // The shape that took down a real project: a header full of them.
        const lines = Array.from({ length: 40 }, (_, i) => `async void a${i}(int x);`).join("\n");
        const sf = parse(`${lines}\nvoid f() { }\n`);
        expect(sf).toBeDefined();
    }, 15000);

    it("terminates on async in a varargs prototype with rest args", () => {
        const sf = parse(`async varargs void each_async(mixed src, function fun, mixed extra...);\nvoid f() { }\n`);
        expect(sf).toBeDefined();
    }, 15000);
});
