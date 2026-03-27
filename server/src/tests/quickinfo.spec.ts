import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";

function createLanguageService(source: string) {
    const fileName = lpc.normalizePath(path.join(process.cwd(), "test.c"));

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

function getDisplayString(quickInfo: lpc.QuickInfo): string {
    return quickInfo.displayParts?.map(p => p.text).join("") ?? "";
}

describe("QuickInfo", () => {
    it("shows return type on function declaration", () => {
        const source = `void moo() {
}
`;
        const { ls, fileName } = createLanguageService(source);
        const pos = source.indexOf("moo");
        const quickInfo = ls.getQuickInfoAtPosition(fileName, pos);

        expect(quickInfo).toBeDefined();
        const display = getDisplayString(quickInfo!);
        expect(display).toContain("void");
        expect(display).toContain("moo");
    });

    it("shows return type on function call", () => {
        const source = `void moo() {
}

void hoo() {
    moo();
}
`;
        const { ls, fileName } = createLanguageService(source);
        const callPos = source.indexOf("moo();");
        const quickInfo = ls.getQuickInfoAtPosition(fileName, callPos);

        expect(quickInfo).toBeDefined();
        const display = getDisplayString(quickInfo!);
        expect(display).toContain("void");
        expect(display).toContain("moo");
    });

    it("shows return type on declaration matches return type on call", () => {
        const source = `int add(int a, int b) {
    return a + b;
}

void test() {
    add(1, 2);
}
`;
        const { ls, fileName } = createLanguageService(source);

        const declPos = source.indexOf("add");
        const callPos = source.indexOf("add(1, 2)");

        const declInfo = ls.getQuickInfoAtPosition(fileName, declPos);
        const callInfo = ls.getQuickInfoAtPosition(fileName, callPos);

        expect(declInfo).toBeDefined();
        expect(callInfo).toBeDefined();

        const declDisplay = getDisplayString(declInfo!);
        const callDisplay = getDisplayString(callInfo!);

        // Both should show the return type
        expect(declDisplay).toContain("int");
        expect(callDisplay).toContain("int");
    });
});
