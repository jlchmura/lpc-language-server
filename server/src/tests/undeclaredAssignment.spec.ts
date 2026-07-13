import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";

/**
 * Assigning to an undeclared variable.
 *
 * LDMud makes types optional, so `foo = 1` with no prior declaration is legal:
 * the first assignment implicitly declares the variable. FluffOS forbids this and
 * reports the target as an unresolved name. LDMud projects can opt into the same
 * strictness with the `allowUndeclaredAssignmentsInLd: false` compiler option.
 */
function createLanguageService(options: lpc.CompilerOptions, fileText: Record<string, string>) {
    const cwd = lpc.normalizePath(process.cwd());
    const toAbs = (rel: string) => lpc.normalizePath(path.join(cwd, rel));

    const files = new Map<string, string>();
    for (const rel of Object.keys(fileText)) files.set(toAbs(rel), fileText[rel]);

    const scriptFiles = Array.from(files.keys());
    const useCaseSensitiveFileNames = lpc.sys.useCaseSensitiveFileNames;
    const getCanonicalFileName = lpc.createGetCanonicalFileName(useCaseSensitiveFileNames);
    const norm = (name: string | undefined) => (name ? lpc.normalizePath(name) : name);

    const host: lpc.LanguageServiceHost = {
        getCompilationSettings: () => options,
        getCurrentDirectory: () => cwd,
        getDefaultLibFileName: (opts) =>
            lpc.combinePaths(cwd, lpc.getDefaultLibFolder(opts), lpc.getDefaultLibFileName(opts)),
        getIncludeDirs: () => [],
        getParseableFiles: () => new Set(scriptFiles.map((f) => lpc.toPath(f, cwd, getCanonicalFileName))),
        getScriptFileNames: () => scriptFiles,
        getScriptSnapshot: (name) => {
            const n = norm(name);
            if (!n) return undefined;
            const text = files.get(n) ?? lpc.sys.readFile(n);
            return text === undefined ? undefined : lpc.ScriptSnapshot.fromString(text);
        },
        getScriptVersion: () => "1",
        isKnownTypesPackageName: () => false,
        useCaseSensitiveFileNames: () => useCaseSensitiveFileNames,
        fileExists: (name) => { const n = norm(name); return !!n && (files.has(n) || lpc.sys.fileExists(n)); },
        readFile: (name) => { const n = norm(name); return n ? files.get(n) ?? lpc.sys.readFile(n) : undefined; },
        onAllFilesNeedReparse: () => undefined,
        onReleaseOldSourceFile: () => undefined,
        onReleaseParsedCommandLine: () => undefined,
    };

    const fileHandler = lpc.createLpcFileHandler({
        fileExists: (name) => host.fileExists(name),
        readFile: (name) => host.readFile(name),
        getIncludeDirs: () => host.getIncludeDirs(),
        getCompilerOptions: () => host.getCompilationSettings(),
        getCurrentDirectory: () => host.getCurrentDirectory(),
    });

    return { ls: lpc.createLanguageService(host, fileHandler), abs: toAbs };
}

const source = `void f() {\n    foo = 1;\n}\n`;

function messagesFor(options: lpc.CompilerOptions): string[] {
    const { ls, abs } = createLanguageService(options, { "test.c": source });
    return ls.getSemanticDiagnostics(abs("test.c"))
        .map(d => lpc.flattenDiagnosticMessageText(d.messageText, "\n"));
}

describe("assignment to an undeclared variable", () => {
    it("is allowed under LDMud by default (implicit declaration)", () => {
        const msgs = messagesFor({ driverType: lpc.LanguageVariant.LDMud, diagnostics: true });
        expect(msgs.filter(m => m.includes("Cannot find name"))).toEqual([]);
    });

    it("is an unresolved name under LDMud when allowUndeclaredAssignmentsInLd is false", () => {
        const msgs = messagesFor({
            driverType: lpc.LanguageVariant.LDMud,
            diagnostics: true,
            allowUndeclaredAssignmentsInLd: false,
        });
        expect(msgs.some(m => m.includes("Cannot find name 'foo'"))).toBe(true);
    });

    it("is an unresolved name under FluffOS regardless of the option", () => {
        const msgs = messagesFor({
            driverType: lpc.LanguageVariant.FluffOS,
            diagnostics: true,
            allowUndeclaredAssignmentsInLd: true,
        });
        expect(msgs.some(m => m.includes("Cannot find name 'foo'"))).toBe(true);
    });
});
