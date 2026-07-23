import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";

/**
 * Shared test harness for building a `LanguageService` over an in-memory file set.
 *
 * Every LS-driven spec used to hand-roll ~50 lines of identical `LanguageServiceHost`
 * boilerplate; this consolidates it. Files are keyed by workspace-relative path and
 * resolved against `process.cwd()`. Any path not in `files` falls through to the real
 * filesystem, so the driver's default efun library loads normally.
 */

export interface TestLanguageService {
    ls: lpc.LanguageService;
    /** Absolute, normalized path for a workspace-relative file name. */
    abs: (rel: string) => string;
    /** Absolute path of the first entry in `files` -- convenient for single-file specs. */
    fileName: string;
}

/** Absolute, normalized path for a workspace-relative file name (matches the harness). */
export function testFilePath(rel: string): string {
    return lpc.normalizePath(path.join(lpc.normalizePath(process.cwd()), rel));
}

const DEFAULT_OPTIONS: lpc.CompilerOptions = {
    driverType: lpc.LanguageVariant.FluffOS,
    diagnostics: true,
};

export function createTestLanguageService(
    files: Record<string, string>,
    options?: Partial<lpc.CompilerOptions>,
): TestLanguageService {
    const cwd = lpc.normalizePath(process.cwd());
    const abs = (rel: string) => lpc.normalizePath(path.join(cwd, rel));
    const norm = (name: string | undefined) => (name ? lpc.normalizePath(name) : name);

    const fileText = new Map<string, string>();
    for (const rel of Object.keys(files)) fileText.set(abs(rel), files[rel]);

    const scriptFiles = Array.from(fileText.keys());
    const useCaseSensitiveFileNames = lpc.sys.useCaseSensitiveFileNames;
    const getCanonicalFileName = lpc.createGetCanonicalFileName(useCaseSensitiveFileNames);

    const compilerOptions: lpc.CompilerOptions = { ...DEFAULT_OPTIONS, ...options };

    const host: lpc.LanguageServiceHost = {
        getCompilationSettings: () => compilerOptions,
        getCurrentDirectory: () => cwd,
        getDefaultLibFileName: (opts) =>
            lpc.combinePaths(cwd, lpc.getDefaultLibFolder(opts), lpc.getDefaultLibFileName(opts)),
        getIncludeDirs: () => [],
        getParseableFiles: () => new Set(scriptFiles.map((f) => lpc.toPath(f, cwd, getCanonicalFileName))),
        getScriptFileNames: () => scriptFiles,
        getScriptSnapshot: (name) => {
            const n = norm(name);
            if (!n) return undefined;
            const text = fileText.get(n) ?? lpc.sys.readFile(n);
            return text === undefined ? undefined : lpc.ScriptSnapshot.fromString(text);
        },
        getScriptVersion: () => "1",
        isKnownTypesPackageName: () => false,
        useCaseSensitiveFileNames: () => useCaseSensitiveFileNames,
        fileExists: (name) => { const n = norm(name); return !!n && (fileText.has(n) || lpc.sys.fileExists(n)); },
        readFile: (name) => { const n = norm(name); return n ? fileText.get(n) ?? lpc.sys.readFile(n) : undefined; },
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

    return {
        ls: lpc.createLanguageService(host, fileHandler),
        abs,
        fileName: scriptFiles[0],
    };
}
