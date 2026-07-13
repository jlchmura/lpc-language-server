import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";

function makeLanguageService(files: Map<string, string>) {
    const options: lpc.CompilerOptions = {
        driverType: lpc.LanguageVariant.FluffOS,
        diagnostics: true,
    };

    const scriptFiles = [...files.keys()];
    const scriptVersions = new Map<string, string>(scriptFiles.map((f) => [f, "1"]));

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
            const text = files.get(normalizedName) ?? lpc.sys.readFile(normalizedName);
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
            return !!normalizedName && (files.has(normalizedName) || lpc.sys.fileExists(normalizedName));
        },
        readFile: (name) => {
            const normalizedName = normalizeHostFileName(name);
            return normalizedName ? files.get(normalizedName) ?? lpc.sys.readFile(normalizedName) : undefined;
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

    // force check every file so LPC inherits are resolved
    const program = ls.getProgram()!;
    for (const f of scriptFiles) {
        program.getTypeChecker().getDiagnostics(program.getSourceFile(f));
    }

    return ls;
}

function renameCountsByFile(ls: lpc.LanguageService, fileName: string, pos: number) {
    const locations = ls.findRenameLocations(fileName, pos, false, false) ?? [];
    const byFile = new Map<string, number>();
    for (const loc of locations) {
        byFile.set(loc.fileName, (byFile.get(loc.fileName) ?? 0) + 1);
    }
    return byFile;
}

describe("LanguageService rename global var scope", () => {
    it("does not rename same-named globals in unrelated files", () => {
        const fileA = lpc.normalizePath(path.join(process.cwd(), "a.c"));
        const fileB = lpc.normalizePath(path.join(process.cwd(), "b.c"));
        const sourceA = `int foo;

test() {
    foo = 1;
    return foo;
}
`;
        const sourceB = `int foo;

other() {
    foo = 2;
    return foo;
}
`;
        const ls = makeLanguageService(new Map([[fileA, sourceA], [fileB, sourceB]]));

        const declPos = sourceA.indexOf("foo");
        const byFile = renameCountsByFile(ls, fileA, declPos);

        expect(byFile.get(fileB) ?? 0).toBe(0);
        expect(byFile.get(fileA)).toBe(3); // decl + 2 uses
    });

    it("renames inherited global var references in child files", () => {
        const parent = lpc.normalizePath(path.join(process.cwd(), "parent.c"));
        const child = lpc.normalizePath(path.join(process.cwd(), "child.c"));
        const sourceParent = `int foo;

test() {
    foo = 1;
    return foo;
}
`;
        const sourceChild = `inherit "parent";

child_fn() {
    foo = 2;
    return foo;
}
`;
        const ls = makeLanguageService(new Map([[parent, sourceParent], [child, sourceChild]]));

        const declPos = sourceParent.indexOf("foo");
        const byFile = renameCountsByFile(ls, parent, declPos);

        expect(byFile.get(parent)).toBe(3); // decl + 2 uses in parent
        expect(byFile.get(child)).toBe(2); // 2 uses in child
    });
});
