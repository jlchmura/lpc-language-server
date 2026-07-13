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

    it("infers nested-mapping value type in foreach, not mixed*", () => {
        // https://github.com/jlchmura/lpc-language-server/issues/319
        const source = `mapping DIRECTIONS = ([
  "north" : (["dz": 0, "dy": -1, "dx": 0]),
]);

void f() {
  foreach(string k, mapping info in DIRECTIONS) {
    info;
  }
}
`;
        const { ls, fileName } = createLanguageService(source);
        const pos = source.indexOf("info;");
        const display = getDisplayString(ls.getQuickInfoAtPosition(fileName, pos)!);
        expect(display).toContain("mapping");
        expect(display).not.toContain("mixed*");

        // key variable should still infer as string
        const kDisplay = getDisplayString(ls.getQuickInfoAtPosition(fileName, source.indexOf("k,"))!);
        expect(kDisplay).toContain("string");
    });

    it("resolves a bare variable interpolated in a template literal", () => {
        // A `${expr}` interpolation's expression is a real expression: hover must resolve
        // its symbol/type instead of falling back to `mixed`. Two distinct failure modes:
        //  - hovering the FIRST char of the identifier collided with the template head's end
        //    (head is a StringLiteral whose end abuts the interpolation start);
        //  - the interpolated identifier was not recognized as being in expression context.
        const source = `void f() {
    int count = 5;
    string a = \`x\${count}y\`;
}
`;
        const { ls, fileName } = createLanguageService(source);
        const startOfIdent = source.indexOf("${count}") + 2; // first char of `count`
        const midIdent = startOfIdent + 2;                   // inside `count`

        for (const pos of [startOfIdent, midIdent]) {
            const display = getDisplayString(ls.getQuickInfoAtPosition(fileName, pos)!);
            expect(display).toContain("int");
            expect(display).toContain("count");
            expect(display).not.toContain("mixed");
        }
    });

    it("resolves a parenthesized interpolated variable too (regression guard)", () => {
        const source = `void f() {
    int count = 5;
    string a = \`x\${(count)}y\`;
}
`;
        const { ls, fileName } = createLanguageService(source);
        const pos = source.indexOf("(count)") + 1;
        const display = getDisplayString(ls.getQuickInfoAtPosition(fileName, pos)!);
        expect(display).toContain("int");
        expect(display).toContain("count");
    });

    it("respects an explicit value-variable annotation in a mapping foreach", () => {
        // https://github.com/jlchmura/lpc-language-server/issues/318
        // The mapping's inferred value type is a mapping, but the user explicitly
        // annotates the destructured value as `mixed`. That annotation must win.
        const source = `mapping DIRECTIONS = ([
  "north" : (["dz": 0, "dy": -1, "dx": 0]),
]);

void f() {
  foreach(string k, mixed info in DIRECTIONS) {
  }
}
`;
        const { ls, fileName } = createLanguageService(source);
        const declPos = source.indexOf("info in");
        const display = getDisplayString(ls.getQuickInfoAtPosition(fileName, declPos)!);
        expect(display).toContain("mixed");
        expect(display).not.toContain("mapping");
    });
});
