import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";

/**
 * A parse error inside an `#include` cannot go in the including file's `parseDiagnostics`
 * -- its position indexes the INCLUDED file's text -- so attachFileToDiagnostics() drops
 * it. The checker surfaces it on the `#include` line instead
 * (Include_file_0_contains_one_or_more_errors, with the real errors as related info).
 *
 * Two things have to hold for that to be worth reading: the related info must point at
 * the file the error is really in, so it can be clicked; and a header that parses fine
 * must produce nothing at all.
 */
const CASES_DIR = "server/src/tests/cases/compiler";

function programFor(source: string) {
    const root = process.cwd();
    const virtualFile = lpc.normalizeSlashes(path.join(root, CASES_DIR, "__includeDiags.c"));
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
    return { program, sourceFile: program.getSourceFile(virtualFile)! };
}

function diagnosticsFor(source: string) {
    const { program, sourceFile } = programFor(source);
    return program.getSemanticDiagnostics(sourceFile);
}

function includeErrors(diags: readonly lpc.Diagnostic[]) {
    return diags.filter(d => d.code === lpc.Diagnostics.Include_file_0_contains_one_or_more_errors.code);
}

/**
 * Reduce a diagnostic to plain strings before asserting on it. A failed `expect` on a
 * Diagnostic itself cannot be reported: jest serializes the actual value to hand it back
 * to the runner, and `file` reaches a SourceFile whose nodes point at their parents.
 */
function summarize(diags: readonly lpc.Diagnostic[]) {
    return diags.map(d => lpc.flattenDiagnosticMessageText(d.messageText, " "));
}

function summarizeRelated(diags: readonly lpc.Diagnostic[]) {
    return diags.flatMap(d => d.relatedInformation ?? []).map(r => ({
        message: lpc.flattenDiagnosticMessageText(r.messageText, " "),
        file: r.file && lpc.getBaseFileName(r.file.fileName),
        // Positions index the file they belong to; anything past its end lands nowhere.
        inRange: !!r.file && r.start! + r.length! <= r.file.text.length,
    }));
}

describe("a parse error inside an #include is reported on the directive", () => {
    it("reports the include line and carries the real error as related info", () => {
        const diags = includeErrors(diagnosticsFor(`#include "badParseInclude.h"\nvoid f() { }\n`));
        expect(summarize(diags)).toEqual(["Include file 'badParseInclude.h' contains one or more errors."]);
        expect(summarizeRelated(diags).length).toBeGreaterThan(0);
    }, 15000);

    // The whole point of the related info is to take you to the error. Without a `file`
    // it renders as inert text: the message and a filename you cannot click.
    it("points the related info at the header, so it can be navigated to", () => {
        const related = summarizeRelated(includeErrors(diagnosticsFor(`#include "badParseInclude.h"\nvoid f() { }\n`)));

        expect(related.length).toBeGreaterThan(0);
        expect(related.map(r => r.file)).toEqual(related.map(() => "badParseInclude.h"));
        expect(related.map(r => r.inRange)).toEqual(related.map(() => true));
    }, 15000);

    // An error several includes deep is reported on the top-level directive the reader can
    // actually see, but it still belongs to the file it is in.
    it("attributes a nested include's error to the top-level directive, pointing at the real file", () => {
        const diags = includeErrors(diagnosticsFor(`#include "nestedBadInclude.h"\nvoid f() { }\n`));
        expect(summarize(diags)).toEqual(["Include file 'nestedBadInclude.h' contains one or more errors."]);

        const related = summarizeRelated(diags);
        expect(related.length).toBeGreaterThan(0);
        expect(related.map(r => r.file)).toContain("badParseInclude.h");
    }, 15000);

    it("stays quiet when the include parses cleanly", () => {
        expect(summarize(includeErrors(diagnosticsFor(`#include "includeFile.h"\nvoid f() { }\n`)))).toEqual([]);
    }, 15000);

    /**
     * Regression: a header that itself contains an `#include`. Reading it through an
     * `#include` left the parse on the newline that ended the nested directive -- a token
     * parseList() has no production for -- and the header was blamed for a "Declaration or
     * statement expected" its own standalone parse never produced. It squiggled every file
     * that pulled in a header as ordinary as `#ifndef` / nested `#include` / `#define`.
     */
    it("stays quiet when the include itself includes another header", () => {
        const diags = includeErrors(diagnosticsFor(`#include "nestedIncludeHost.h"\nvoid f() { }\n`));
        expect(summarize(diags).concat(summarizeRelated(diags).map(r => r.message))).toEqual([]);
    }, 15000);

    // Nothing about the nested include may cost the reader either header's contents.
    it("sees the macros from the header and from its nested include", () => {
        expect(summarize(diagnosticsFor(
            `#include "nestedIncludeHost.h"\nvoid f() { int x = NESTED_HOST_MACRO; int y = FOO; }\n`,
        ))).toEqual([]);
    }, 15000);
});
