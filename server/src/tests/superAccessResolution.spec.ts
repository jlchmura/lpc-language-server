import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";

/**
 * Regression for `::name` (super access) resolution.
 *
 * `::create()` calls the INHERITED parent's create(), so goto-definition and hover on it
 * must resolve to the parent file's declaration -- not this file's own create() override,
 * which is what a plain lexical scope walk would find first.
 */
function createLanguageService(files: Record<string, string>) {
    const cwd = lpc.normalizePath(process.cwd());
    const toAbs = (rel: string) => lpc.normalizePath(path.join(cwd, rel));

    const fileText = new Map<string, string>();
    for (const rel of Object.keys(files)) fileText.set(toAbs(rel), files[rel]);

    const scriptFiles = Array.from(fileText.keys());
    const scriptVersions = new Map<string, string>(scriptFiles.map(f => [f, "1"]));
    const useCaseSensitiveFileNames = lpc.sys.useCaseSensitiveFileNames;
    const getCanonicalFileName = lpc.createGetCanonicalFileName(useCaseSensitiveFileNames);
    const norm = (name: string | undefined) => (name ? lpc.normalizePath(name) : name);

    const options: lpc.CompilerOptions = {
        driverType: lpc.LanguageVariant.FluffOS,
        diagnostics: true,
    };

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
            const text = fileText.get(n) ?? lpc.sys.readFile(n);
            return text === undefined ? undefined : lpc.ScriptSnapshot.fromString(text);
        },
        getScriptVersion: (name) => (norm(name) ? scriptVersions.get(norm(name)!) ?? "0" : "0"),
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

    return { ls: lpc.createLanguageService(host, fileHandler), abs: toAbs };
}

const parent = `/** parent create */
void create () {
}
`;

const child = `inherit "npc";

/** child create */
void create () {
    ::create();
}
`;

const files = { "npc.c": parent, "snail.c": child };

describe("super access (::name) resolution", () => {
    it("goto-definition on ::create() jumps to the inherited parent, not the local override", () => {
        const { ls, abs } = createLanguageService(files);
        const childText = child;
        // position on the `create` inside `::create()`
        const pos = childText.indexOf("::create()") + 2;
        const defs = ls.getDefinitionAtPosition(abs("snail.c"), pos);

        expect(defs).toBeDefined();
        expect(defs!.length).toBeGreaterThan(0);
        // must resolve into the parent file, not the child
        expect(defs!.every(d => d.fileName.endsWith("npc.c"))).toBe(true);
        expect(defs!.some(d => d.fileName.endsWith("snail.c"))).toBe(false);
    });

    it("hover on ::create() shows the parent's lpcdoc, not the child's", () => {
        const { ls, abs } = createLanguageService(files);
        const pos = child.indexOf("::create()") + 2;
        const qi = ls.getQuickInfoAtPosition(abs("snail.c"), pos);

        expect(qi).toBeDefined();
        const doc = qi!.documentation?.map(d => d.text).join("") ?? "";
        expect(doc).toContain("parent create");
        expect(doc).not.toContain("child create");
    });

    it("a plain (non-super) create() call still resolves locally", () => {
        // Guard: the super fix must not divert ordinary member resolution to the parent.
        const localCaller = `inherit "npc";

/** child create */
void create () {
    create();
}
`;
        const { ls, abs } = createLanguageService({ "npc.c": parent, "snail.c": localCaller });
        // the second "create(" is the plain call inside the body
        const pos = localCaller.indexOf("create();") + 2;
        const defs = ls.getDefinitionAtPosition(abs("snail.c"), pos);

        expect(defs).toBeDefined();
        expect(defs!.some(d => d.fileName.endsWith("snail.c"))).toBe(true);
    });

    it("resolves ::create() up a multi-level inherit chain", () => {
        // base <- mid <- leaf; leaf's ::create() targets mid, and mid's ::create() targets base.
        const base = `/** base create */\nvoid create () {\n}\n`;
        const mid = `inherit "base";\n/** mid create */\nvoid create () {\n    ::create();\n}\n`;
        const leaf = `inherit "mid";\n/** leaf create */\nvoid create () {\n    ::create();\n}\n`;
        const { ls, abs } = createLanguageService({ "base.c": base, "mid.c": mid, "leaf.c": leaf });

        const leafDefs = ls.getDefinitionAtPosition(abs("leaf.c"), leaf.indexOf("::create()") + 2);
        expect(leafDefs!.every(d => d.fileName.endsWith("mid.c"))).toBe(true);

        const midDefs = ls.getDefinitionAtPosition(abs("mid.c"), mid.indexOf("::create()") + 2);
        expect(midDefs!.every(d => d.fileName.endsWith("base.c"))).toBe(true);
    });
});
