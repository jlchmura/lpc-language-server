import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";

/**
 * Type checking of the `foreach` loop variables.
 *
 * `foreach (key, value in map)` — the comma expression assigns to both
 * operands, so each one must be checked against its *declared* type. Reading
 * the narrowed type instead makes a guard that pins the variable to a literal
 * (`if(!nullp(item)) return 0;` narrows `item` to `0`) reject the loop even
 * though foreach is about to overwrite it.
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

function messagesFor(source: string): string[] {
    const { ls, abs } = createLanguageService(
        { driverType: lpc.LanguageVariant.FluffOS, diagnostics: true },
        { "test.c": source },
    );
    return ls.getSemanticDiagnostics(abs("test.c"))
        .map(d => lpc.flattenDiagnosticMessageText(d.messageText, "\n"));
}

const NARROWED_KEY = `
mapping __items = ([]);
string get_item(string id) {
  mixed item, value;
  string result;

  if(!nullp(item))
    return 0;

  foreach(item, value in __items) {
    result = value;
  }
  return result;
}
`;

const NARROWED_VALUE = `
mapping __items = ([]);
string get_item(string id) {
  mixed item, value;
  string result;

  if(!nullp(value))
    return 0;

  foreach(item, value in __items) {
    result = value;
  }
  return result;
}
`;

const SINGLE_VAR = `
mapping __items = ([]);
void f() {
  mixed item;

  if(!nullp(item))
    return;

  foreach(item in __items) { }
}
`;

describe("foreach over a mapping uses the declared type of the loop variables", () => {
    it("accepts a key narrowed to a literal by a preceding guard", () => {
        expect(messagesFor(NARROWED_KEY)).toEqual([]);
    });

    it("accepts a value narrowed to a literal by a preceding guard", () => {
        expect(messagesFor(NARROWED_VALUE)).toEqual([]);
    });

    it("accepts a single narrowed loop variable", () => {
        expect(messagesFor(SINGLE_VAR)).toEqual([]);
    });

    it("still rejects a key whose declared type is incompatible", () => {
        const msgs = messagesFor(`
void f() {
  int key;
  mixed value;
  foreach(key, value in ([ "a": "b" ])) { }
}
`);
        expect(msgs.some(m => m.includes("is not compatible with type"))).toBe(true);
    });
});
