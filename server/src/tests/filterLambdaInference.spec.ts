import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";

describe("Compiler", () => {
    it("infers `$1` type from filter() source element type", () => {
        const fileName = path.join(process.cwd(), "test.c");
        const source = `test() {
    int *arr = ({ 1, 2, 3 });
    mixed *result = filter(arr, (: $1 > 0 :));
}
`;

        const options: lpc.CompilerOptions = {
            driverType: lpc.LanguageVariant.FluffOS,
            diagnostics: true,
        };

        const scriptFiles = [fileName];
        const fileText = new Map<string, string>([[fileName, source]]);
        const scriptVersions = new Map<string, string>([[fileName, "1"]]);

        const currentDirectory = process.cwd();
        const useCaseSensitiveFileNames = true;
        const getCanonicalFileName = lpc.createGetCanonicalFileName(useCaseSensitiveFileNames);

        const host: lpc.LanguageServiceHost = {
            getCompilationSettings: () => options,
            getCurrentDirectory: () => currentDirectory,
            getDefaultLibFileName: (opts) =>
                lpc.combinePaths(
                    currentDirectory,
                    lpc.getDefaultLibFolder(opts),
                    lpc.getDefaultLibFileName(opts)
                ),
            getIncludeDirs: () => [],
            getParseableFiles: () =>
                new Set(scriptFiles.map((f) => lpc.toPath(f, currentDirectory, getCanonicalFileName))),
            getScriptFileNames: () => scriptFiles,
            getScriptSnapshot: (name) => {
                const text = fileText.get(name) ?? lpc.sys.readFile(name);
                return text === undefined ? undefined : lpc.ScriptSnapshot.fromString(text);
            },
            getScriptVersion: (name) => scriptVersions.get(name) ?? "0",
            isKnownTypesPackageName: () => false,
            useCaseSensitiveFileNames: () => useCaseSensitiveFileNames,
            fileExists: (name) => fileText.has(name) || lpc.sys.fileExists(name),
            readFile: (name) => fileText.get(name) ?? lpc.sys.readFile(name),
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
        const program = ls.getProgram();
        expect(program).toBeDefined();
        const sourceFile = program!.getSourceFile(fileName);
        expect(sourceFile).toBeDefined();

        const checker = program!.getTypeChecker() as any;

        let lambdaNode: lpc.Node | undefined;
        const visit = (node: lpc.Node): void => {
            if (
                node.kind === lpc.SyntaxKind.Identifier &&
                (node as any).text === "$1"
            ) {
                lambdaNode = node;
            }
            if (
                node.kind === lpc.SyntaxKind.LambdaIdentifierExpression &&
                (node as any).name?.kind === lpc.SyntaxKind.Identifier &&
                (node as any).name.text === "1"
            ) {
                lambdaNode = node;
            }
            lpc.forEachChild(node, visit);
        };
        visit(sourceFile!);

        expect(lambdaNode).toBeDefined();
        const lambdaType: any = checker.getTypeAtLocation(lambdaNode!);
        const typeName =
            lambdaType?.intrinsicName ??
            lambdaType?.aliasSymbol?.name ??
            lambdaType?.symbol?.name;
        expect(typeName).toBe("int");
    });

    it("reports a type error for invalid `$1` comparisons in filter() callback", () => {
        const fileName = path.join(process.cwd(), "test.c");
        const source = `test() {
    int *arr = ({ 1, 2, 3 });
    mixed *result = filter(arr, (: $1 == "foo" :));
}
`;

        const options: lpc.CompilerOptions = {
            driverType: lpc.LanguageVariant.FluffOS,
            diagnostics: true,
        };

        const scriptFiles = [fileName];
        const fileText = new Map<string, string>([[fileName, source]]);
        const scriptVersions = new Map<string, string>([[fileName, "1"]]);

        const currentDirectory = process.cwd();
        const useCaseSensitiveFileNames = true;
        const getCanonicalFileName = lpc.createGetCanonicalFileName(useCaseSensitiveFileNames);

        const host: lpc.LanguageServiceHost = {
            getCompilationSettings: () => options,
            getCurrentDirectory: () => currentDirectory,
            getDefaultLibFileName: (opts) =>
                lpc.combinePaths(
                    currentDirectory,
                    lpc.getDefaultLibFolder(opts),
                    lpc.getDefaultLibFileName(opts)
                ),
            getIncludeDirs: () => [],
            getParseableFiles: () =>
                new Set(scriptFiles.map((f) => lpc.toPath(f, currentDirectory, getCanonicalFileName))),
            getScriptFileNames: () => scriptFiles,
            getScriptSnapshot: (name) => {
                const text = fileText.get(name) ?? lpc.sys.readFile(name);
                return text === undefined ? undefined : lpc.ScriptSnapshot.fromString(text);
            },
            getScriptVersion: (name) => scriptVersions.get(name) ?? "0",
            isKnownTypesPackageName: () => false,
            useCaseSensitiveFileNames: () => useCaseSensitiveFileNames,
            fileExists: (name) => fileText.has(name) || lpc.sys.fileExists(name),
            readFile: (name) => fileText.get(name) ?? lpc.sys.readFile(name),
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
        const program = ls.getProgram();
        expect(program).toBeDefined();
        const sourceFile = program!.getSourceFile(fileName);
        expect(sourceFile).toBeDefined();

        const checker = program!.getTypeChecker() as any;
        let inlineClosure: any;
        const findInlineClosure = (node: lpc.Node): void => {
            if (node.kind === lpc.SyntaxKind.InlineClosureExpression) {
                inlineClosure = node as any;
            }
            lpc.forEachChild(node, findInlineClosure);
        };
        findInlineClosure(sourceFile!);

        expect(inlineClosure).toBeDefined();
        let eqBinary: any;
        const findEqBinary = (node: lpc.Node): void => {
            if (node.kind === lpc.SyntaxKind.BinaryExpression) {
                const operatorKind = (node as any).operatorToken?.kind;
                if (operatorKind === lpc.SyntaxKind.EqualsEqualsToken) {
                    eqBinary = node as any;
                }
            }
            lpc.forEachChild(node, findEqBinary);
        };
        findEqBinary(inlineClosure);
        expect(eqBinary).toBeDefined();
        const leftType: any = checker.getTypeAtLocation(eqBinary.left);
        const rightType: any = checker.getTypeAtLocation(eqBinary.right);
        const leftTypeName =
            leftType?.intrinsicName ?? leftType?.aliasSymbol?.name ?? leftType?.symbol?.name;
        expect(leftTypeName).toBe("int");
        expect((rightType.flags & (lpc.TypeFlags.String | lpc.TypeFlags.StringLiteral)) !== 0).toBe(true);

        let lambdaNode: lpc.Node | undefined;
        const visit = (node: lpc.Node): void => {
            if (node.kind === lpc.SyntaxKind.Identifier && (node as any).text === "$1") {
                lambdaNode = node;
            }
            lpc.forEachChild(node, visit);
        };
        visit(inlineClosure);
        expect(lambdaNode).toBeDefined();
        const lambdaType: any = checker.getTypeAtLocation(lambdaNode!);
        const typeName =
            lambdaType?.intrinsicName ??
            lambdaType?.aliasSymbol?.name ??
            lambdaType?.symbol?.name;
        expect(typeName).toBe("int");

        const semantic = program!.getSemanticDiagnostics(sourceFile!);
        expect(semantic.length).toBeGreaterThan(0);
    });

    it("reports a type error for incompatible equality comparisons", () => {
        const fileName = path.join(process.cwd(), "test.c");
        const source = `test() {
    int x = 1;
    int y = x == "foo";
}
`;

        const options: lpc.CompilerOptions = {
            driverType: lpc.LanguageVariant.FluffOS,
            diagnostics: true,
        };

        const scriptFiles = [fileName];
        const fileText = new Map<string, string>([[fileName, source]]);
        const scriptVersions = new Map<string, string>([[fileName, "1"]]);

        const currentDirectory = process.cwd();
        const useCaseSensitiveFileNames = true;
        const getCanonicalFileName = lpc.createGetCanonicalFileName(useCaseSensitiveFileNames);

        const host: lpc.LanguageServiceHost = {
            getCompilationSettings: () => options,
            getCurrentDirectory: () => currentDirectory,
            getDefaultLibFileName: (opts) =>
                lpc.combinePaths(
                    currentDirectory,
                    lpc.getDefaultLibFolder(opts),
                    lpc.getDefaultLibFileName(opts)
                ),
            getIncludeDirs: () => [],
            getParseableFiles: () =>
                new Set(scriptFiles.map((f) => lpc.toPath(f, currentDirectory, getCanonicalFileName))),
            getScriptFileNames: () => scriptFiles,
            getScriptSnapshot: (name) => {
                const text = fileText.get(name) ?? lpc.sys.readFile(name);
                return text === undefined ? undefined : lpc.ScriptSnapshot.fromString(text);
            },
            getScriptVersion: (name) => scriptVersions.get(name) ?? "0",
            isKnownTypesPackageName: () => false,
            useCaseSensitiveFileNames: () => useCaseSensitiveFileNames,
            fileExists: (name) => fileText.has(name) || lpc.sys.fileExists(name),
            readFile: (name) => fileText.get(name) ?? lpc.sys.readFile(name),
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
        const program = ls.getProgram();
        expect(program).toBeDefined();
        const sourceFile = program!.getSourceFile(fileName);
        expect(sourceFile).toBeDefined();

        const semantic = program!.getSemanticDiagnostics(sourceFile!);
        expect(semantic.length).toBeGreaterThan(0);
    });

    it("reports a type error for incompatible equality comparisons in expression position", () => {
        const fileName = path.join(process.cwd(), "test.c");
        const source = `test() {
    int x = 1;
    x == "foo";
}
`;

        const options: lpc.CompilerOptions = {
            driverType: lpc.LanguageVariant.FluffOS,
            diagnostics: true,
        };

        const scriptFiles = [fileName];
        const fileText = new Map<string, string>([[fileName, source]]);
        const scriptVersions = new Map<string, string>([[fileName, "1"]]);

        const currentDirectory = process.cwd();
        const useCaseSensitiveFileNames = true;
        const getCanonicalFileName = lpc.createGetCanonicalFileName(useCaseSensitiveFileNames);

        const host: lpc.LanguageServiceHost = {
            getCompilationSettings: () => options,
            getCurrentDirectory: () => currentDirectory,
            getDefaultLibFileName: (opts) =>
                lpc.combinePaths(
                    currentDirectory,
                    lpc.getDefaultLibFolder(opts),
                    lpc.getDefaultLibFileName(opts)
                ),
            getIncludeDirs: () => [],
            getParseableFiles: () =>
                new Set(scriptFiles.map((f) => lpc.toPath(f, currentDirectory, getCanonicalFileName))),
            getScriptFileNames: () => scriptFiles,
            getScriptSnapshot: (name) => {
                const text = fileText.get(name) ?? lpc.sys.readFile(name);
                return text === undefined ? undefined : lpc.ScriptSnapshot.fromString(text);
            },
            getScriptVersion: (name) => scriptVersions.get(name) ?? "0",
            isKnownTypesPackageName: () => false,
            useCaseSensitiveFileNames: () => useCaseSensitiveFileNames,
            fileExists: (name) => fileText.has(name) || lpc.sys.fileExists(name),
            readFile: (name) => fileText.get(name) ?? lpc.sys.readFile(name),
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
        const program = ls.getProgram();
        expect(program).toBeDefined();
        const sourceFile = program!.getSourceFile(fileName);
        expect(sourceFile).toBeDefined();

        const semantic = program!.getSemanticDiagnostics(sourceFile!);
        expect(semantic.length).toBeGreaterThan(0);
    });
});
