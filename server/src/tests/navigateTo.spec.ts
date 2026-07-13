import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";

/**
 * Workspace-symbol ("navigate to") search. Two layers are covered:
 *  - the fuzzy pattern matcher (exact / prefix / substring / camelCase), and
 *  - `LanguageService.getNavigateToItems`, which walks the named declarations of the files
 *    currently in the program and returns the fuzzy matches.
 *
 * The lazy prescan that pulls unparsed files into the program lives in the server session
 * and is exercised through the full server; here the program is built directly, so every
 * test file's declarations are already present.
 */

function createLanguageService(source: string) {
    const fileName = lpc.normalizePath(path.join(process.cwd(), "navto.c"));

    const options: lpc.CompilerOptions = {
        driverType: lpc.LanguageVariant.FluffOS,
        diagnostics: true,
    };

    const scriptFiles = [fileName];
    const fileText = new Map<string, string>([[fileName, source]]);
    const scriptVersions = new Map<string, string>([[fileName, "1"]]);

    const currentDirectory = lpc.normalizePath(process.cwd());
    const useCaseSensitiveFileNames = lpc.sys.useCaseSensitiveFileNames;
    const getCanonicalFileName = lpc.createGetCanonicalFileName(useCaseSensitiveFileNames);
    const normalizeHostFileName = (name: string | undefined) => (name ? lpc.normalizePath(name) : name);

    const host: lpc.LanguageServiceHost = {
        getCompilationSettings: () => options,
        getCurrentDirectory: () => currentDirectory,
        getDefaultLibFileName: (opts) =>
            lpc.combinePaths(currentDirectory, lpc.getDefaultLibFolder(opts), lpc.getDefaultLibFileName(opts)),
        getIncludeDirs: () => [],
        getParseableFiles: () => new Set(scriptFiles.map((f) => lpc.toPath(f, currentDirectory, getCanonicalFileName))),
        getScriptFileNames: () => scriptFiles,
        getScriptSnapshot: (name) => {
            const normalizedName = normalizeHostFileName(name);
            if (!normalizedName) return undefined;
            const text = fileText.get(normalizedName) ?? lpc.sys.readFile(normalizedName);
            return text === undefined ? undefined : lpc.ScriptSnapshot.fromString(text);
        },
        getScriptVersion: (name) => {
            const normalizedName = normalizeHostFileName(name);
            return normalizedName ? scriptVersions.get(normalizedName) ?? "0" : "0";
        },
        isKnownTypesPackageName: () => false,
        useCaseSensitiveFileNames: () => useCaseSensitiveFileNames,
        fileExists: (name) => {
            const normalizedName = normalizeHostFileName(name);
            return !!normalizedName && (fileText.has(normalizedName) || lpc.sys.fileExists(normalizedName));
        },
        readFile: (name) => {
            const normalizedName = normalizeHostFileName(name);
            return normalizedName ? fileText.get(normalizedName) ?? lpc.sys.readFile(normalizedName) : undefined;
        },
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

    const ls = lpc.createLanguageService(host, fileHandler);
    return { ls, fileName };
}

// Distinctive names so matches can't collide with declarations in the driver's built-in libs.
const SOURCE = `
int wibble_gadget_counter;
void wibble_gadget_reset() {}
string wibbleGadgetLabel() { return ""; }
void unrelated_helper() {}
`;

function itemsFor(query: string): lpc.NavigateToItem[] {
    const { ls } = createLanguageService(SOURCE);
    return ls.getNavigateToItems(query).filter(i => /wibble|unrelated/i.test(i.name));
}

describe("navigate to (workspace symbols)", () => {
    describe("pattern matcher", () => {
        function kind(pattern: string, candidate: string) {
            return lpc.createPatternMatcher(pattern)?.getMatch(candidate)?.kind;
        }

        it("classifies exact / prefix / substring / camelCase", () => {
            expect(kind("query_player", "query_player")).toBe(lpc.PatternMatchKind.exact);
            expect(kind("query", "query_player")).toBe(lpc.PatternMatchKind.prefix);
            expect(kind("player", "query_player")).toBe(lpc.PatternMatchKind.substring);
            // camelCase: pattern chunks align to word boundaries of the candidate
            expect(kind("qp", "query_player")).toBe(lpc.PatternMatchKind.camelCase);
            expect(kind("queryPlayer", "query_player")).toBe(lpc.PatternMatchKind.camelCase);
            expect(kind("qplay", "query_player")).toBe(lpc.PatternMatchKind.camelCase);
        });

        it("returns undefined for non-matches and empty patterns", () => {
            expect(kind("xyzzy", "query_player")).toBeUndefined();
            // "yp": 'y' is mid-word (inside "query"), not a word boundary, and "yp" is not a
            // substring -- so it matches neither as substring nor camelCase.
            expect(kind("yp", "query_player")).toBeUndefined();
            expect(lpc.createPatternMatcher("   ")).toBeUndefined();
        });

        it("exposes the first word segment for the lazy prescan", () => {
            expect(lpc.createPatternMatcher("queryPlayer")!.firstSegment).toBe("query");
            expect(lpc.createPatternMatcher("query_player")!.firstSegment).toBe("query");
            expect(lpc.createPatternMatcher("Reset")!.firstSegment).toBe("reset");
        });

        it("breaks identifiers into word spans", () => {
            const words = (id: string) => lpc.breakIntoWordSpans(id).map(s => id.substr(s.start, s.length));
            expect(words("query_player")).toEqual(["query", "player"]);
            expect(words("wibbleGadgetLabel")).toEqual(["wibble", "Gadget", "Label"]);
            expect(words("utf8Encode")).toEqual(["utf", "8", "Encode"]);
        });
    });

    describe("getNavigateToItems", () => {
        it("finds a declaration by exact name and reports its kind", () => {
            const items = itemsFor("wibble_gadget_counter");
            const counter = items.find(i => i.name === "wibble_gadget_counter");
            expect(counter).toBeDefined();
            // A mutable global binds as a `let` element (see getNodeKind / isVarConst).
            expect(counter!.kind).toBe(lpc.ScriptElementKind.letElement);
            expect(counter!.matchKind).toBe("exact");
        });

        it("matches every declaration sharing a substring", () => {
            const names = itemsFor("gadget").map(i => i.name).sort();
            expect(names).toEqual(["wibbleGadgetLabel", "wibble_gadget_counter", "wibble_gadget_reset"]);
        });

        it("fuzzily matches word-boundary initials (camelCase search)", () => {
            const names = itemsFor("wgr").map(i => i.name);
            expect(names).toContain("wibble_gadget_reset");
            expect(names).not.toContain("unrelated_helper");
        });

        it("distinguishes function declarations from variables", () => {
            const reset = itemsFor("wibble_gadget_reset").find(i => i.name === "wibble_gadget_reset");
            expect(reset).toBeDefined();
            expect(reset!.kind).toBe(lpc.ScriptElementKind.functionElement);
        });

        it("returns nothing for a query that matches no symbol", () => {
            expect(itemsFor("zzz_no_such_symbol")).toHaveLength(0);
        });
    });
});
