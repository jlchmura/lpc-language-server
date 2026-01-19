import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";

describe("LanguageService", () => {
    it("includes EvaluateExpression arguments in findReferences/findRenameLocations", () => {
        const fileName = lpc.normalizePath(path.join(process.cwd(), "test.c"));
        const source = `test(object who) {
    fn(who);

    function points;
    (*points)(who);
}

fn(object o) {}
`;

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

        const declPos = source.indexOf("who");
        const evalArgPos = source.lastIndexOf("who");

        const program = ls.getProgram();
        expect(program).toBeDefined();
        const sourceFile = program!.getSourceFile(fileName);
        expect(sourceFile).toBeDefined();
        const touching = lpc.getTouchingPropertyName(sourceFile!, evalArgPos);
        expect(touching.kind).toBe(lpc.SyntaxKind.Identifier);
        let astIdentifierAtEvalArgPos: lpc.Identifier | undefined;
        const visit = (node: lpc.Node): void => {
            if (node.kind === lpc.SyntaxKind.Identifier && node.pos === evalArgPos) {
                astIdentifierAtEvalArgPos = node as lpc.Identifier;
            }
            lpc.forEachChild(node, visit);
        };
        visit(sourceFile!);
        expect(astIdentifierAtEvalArgPos).toBeDefined();
        expect(astIdentifierAtEvalArgPos).toBe(touching);
        const touchingSymbol = program!.getTypeChecker().getSymbolAtLocation(touching);
        expect(touchingSymbol?.name).toBe("who");

        const renameLocations = ls.findRenameLocations(fileName, declPos, /*findInStrings*/ false, /*findInComments*/ false);
        expect(renameLocations?.some((l) => l.textSpan.start === evalArgPos)).toBe(true);

        const referenced = ls.findReferences(fileName, declPos);
        const allReferenceSpans = referenced?.flatMap((s) => s.references.map((r) => r.textSpan.start)) ?? [];
        expect(allReferenceSpans.includes(evalArgPos)).toBe(true);
    });
});
