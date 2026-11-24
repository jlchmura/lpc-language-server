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

/**
 * Fill in the lib root and lib files the way a real `lpc-config.json` does (see
 * commandLineParser.ts). A real config always has a `rootDir`, and the player, master and
 * simul-efun files default to `/obj/player.c`, `/obj/master.c` and `/obj/sefun.c` under it.
 * The efun headers depend on this: `@returns {ob is __LPC_CONFIG_LIBFILES_PLAYER}` names the
 * player file through a macro that only exists when `playerFile` is set, and the macro's value
 * is the file's path relative to `rootDir`. Without both, a spec tested a configuration no
 * real project has.
 *
 * A lib file may be given relative to the lib root (`"/std/user.c"`, as in a config's
 * `libFiles`) or as a full path under it.
 */
function withLibFiles(options: lpc.CompilerOptions, cwd: string): lpc.CompilerOptions {
    const rootDir = lpc.normalizePath(options.rootDir ?? cwd);
    const libFile = (file: string | undefined, fallback: string) => {
        const name = lpc.normalizePath(file ?? fallback);
        return name.startsWith(rootDir + "/") ? name : lpc.normalizePath(lpc.combinePaths(rootDir, lpc.trimStart(name, "/")));
    };
    return {
        ...options,
        rootDir,
        playerFile: libFile(options.playerFile, "/obj/player.c"),
        masterFile: libFile(options.masterFile, "/obj/master.c"),
        sefunFile: libFile(options.sefunFile, "/obj/sefun.c"),
    };
}

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

    const compilerOptions = withLibFiles({ ...DEFAULT_OPTIONS, ...options }, cwd);

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

/** Both drivers, as `[name, variant]` rows for `describe.each` / `it.each`. */
export const DRIVERS = [
    ["FluffOS", lpc.LanguageVariant.FluffOS],
    ["LDMud", lpc.LanguageVariant.LDMud],
] as const;

/** The lib root many specs use as `rootDir`, so files under `lib/` resolve as `/std/...`. */
export const LIB_ROOT = testFilePath("lib");

// Diagnostic formatters. Each takes only the diagnostic, so it can be passed straight to `.map`.

/** The message, with a chained message flattened onto one line. */
export function message(d: lpc.Diagnostic | lpc.DiagnosticRelatedInformation): string {
    return lpc.flattenDiagnosticMessageText(d.messageText, " ");
}

/** The message, with each link of a chained message on its own line. */
export function messageLines(d: lpc.Diagnostic | lpc.DiagnosticRelatedInformation): string {
    return lpc.flattenDiagnosticMessageText(d.messageText, "\n");
}

/** `code: message`, the message flattened onto one line. */
export function codeAndMessage(d: lpc.Diagnostic): string {
    return `${d.code}: ${message(d)}`;
}

/** The syntactic diagnostics of a file, then its semantic ones. */
export function allDiagnostics(ls: lpc.LanguageService, fileName: string): lpc.Diagnostic[] {
    return [...ls.getSyntacticDiagnostics(fileName), ...ls.getSemanticDiagnostics(fileName)];
}

/**
 * The hover's display text at `position`, or undefined when there is no hover. With `collapse`,
 * runs of whitespace (the padding after a `(local var)` kind prefix, line breaks in a long type)
 * become one space and the ends are trimmed.
 */
export function hoverText(ls: lpc.LanguageService, fileName: string, position: number, options?: { collapse?: boolean }): string | undefined {
    const parts = ls.getQuickInfoAtPosition(fileName, position)?.displayParts;
    if (!parts) return undefined;
    const text = lpc.displayPartsToString(parts);
    return options?.collapse ? text.replace(/\s+/g, " ").trim() : text;
}

/** The text of the first `@name` tag on a hover, or undefined when it has none. */
export function tagText(quickInfo: lpc.QuickInfo | undefined, name: string): string | undefined {
    return quickInfo?.tags?.find(t => t.name === name)?.text?.map(p => p.text).join("");
}

/**
 * Type-check every file in the set. A child looks into an inherited file's symbols, and those
 * are only bound once that file has been checked, so a spec that inherits and asks about the
 * child should call this first.
 */
export function checkAllFiles(svc: TestLanguageService, files: Record<string, string>): TestLanguageService {
    const program = svc.ls.getProgram()!;
    for (const rel of Object.keys(files)) {
        program.getTypeChecker().getDiagnostics(program.getSourceFile(svc.abs(rel)));
    }
    return svc;
}
