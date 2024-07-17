#!/usr/bin/env node
import * as fs from "fs";
import * as path from "path";
import {
    BailErrorStrategy,
    CharStream,
    CommonTokenStream,
    DefaultErrorStrategy,
    ParseCancellationException,
    ParseTreeWalker,
    PredictionMode,
} from "antlr4ng";
import { LPCLexer } from "./parser3/LPCLexer";
import { LPCParser } from "./parser3/LPCParser";
import { TextDocument } from "vscode-languageserver-textdocument";
import { LPCTokenFactor } from "./parser3/LPCTokenFactory";
import { LPCPreprocessingLexer } from "./parser3/LPCPreprocessingLexer";
import { LPCToken } from "./parser3/LPCToken";
import { IFileHandler } from "./backend/types";
import { ConsoleErrorListener } from "./ConsoleErrorListener";
import { LpcFacade } from "./backend/facade";
import { SemanticListener } from "./backend/SemanticListener";
import { MethodSymbol } from "./symbols/methodSymbol";
import { CallStack } from "./backend/CallStack";
import { addPogramToStack } from "./backend/CallStackUtils";
import { IEvaluatableSymbol } from "./symbols/base";
import { LiteralSymbol } from "./symbols/literalSymbol";
import { LpcTypes } from "./types";
import { getDriverInfo } from "./driver/Driver";
import { loadLpcConfig, LpcConfig } from "./backend/LpcConfig";
import * as p2 from "./compiler/_namespaces/lpc";
import {
    CompilerOptions,
    getTouchingPropertyName,
    Path,
    TypeCheckerHost,
    Symbol,
} from "./compiler/_namespaces/lpc";
import { ILpcConfig } from "./config-types";
import {
    createLanguageService,
    ScriptSnapshot,
} from "./services/_namespaces/lpc";

class MockFileHandler implements IFileHandler {
    constructor() {}

    public loadInclude(
        refFilename: string,
        filename: string
    ): { uri: string; source: string } {
        filename = filename.slice(1, -1);
        if (fs.existsSync(filename)) {
            const source = fs.readFileSync(filename, "utf-8");
            return { uri: filename, source };
        } else {
            return { uri: filename, source: "" };
        }
    }
}

p2.performance.enable();
p2.Debug.enableDebugInfo();

//import { LpcFacade } from "./backend/facade";
const workDir = path.resolve(process.cwd()); //, "../fluff-test");
const filename = path.join(workDir, process.argv[3]);
const fileOnly = path.basename(filename);
const sourceText = fs.readFileSync(filename, "utf-8");
const configFile = path.join(workDir, "lpc-config.json");
const config = loadLpcConfig(configFile);

const files: { [index: string]: string } = {
    [fileOnly]: sourceText,
};

const host = createHost(filename, sourceText, config);
const svc = doCreateLanguageService();

const srcFile = host.getSourceFile(filename);
const checker = p2.createTypeChecker(host); // binder is called by checker
const diags = checker.getDiagnostics(srcFile);

const node = getTouchingPropertyName(srcFile, 96);
svc.getDefinitionAtPosition(filename, 96, false, false);
console.debug("node count:", srcFile.nodeCount);

// const facade = new LpcFacade(workDir, undefined);
// const ctx = facade.loadLpc(filename);

// const semanticListener = new SemanticListener(
//     ctx.diagnostics,
//     ctx.symbolTable,
//     ctx
// );
// ParseTreeWalker.DEFAULT.walk(semanticListener, ctx.getParseTree());

// const driver = getDriverInfo();
// const stack = new CallStack(ctx.symbolTable);
// stack.diagnosticMode = false;
// addPogramToStack(driver.efuns, stack);
// addPogramToStack(ctx.symbolTable, stack);

// const applyFn = ctx.symbolTable.resolveSync("get_include_path") as MethodSymbol;
// const callArgs: IEvaluatableSymbol[] = [
//     new LiteralSymbol("string", LpcTypes.stringType, "/domain/test/room.c"),
// ];

// const fnResult = applyFn.eval(stack, callArgs, stack.root);

// const ii = 0;
// console.log("done");

// // const codeStream = new ReadableString(code);
// // const unbuf = new UnbufferedCharStream(codeStream, 256);
// // for (let i = 0; i < 10; i++) {
// //     console.log(`${i}: ${String.fromCharCode(unbuf.LA(0))}`);
// //     unbuf.consume();
// // }

// const doc = TextDocument.create("uri", "lpc", 0, code);
// const stream = CharStream.fromString(code);
// const includes = [];
// const lexer = new LPCPreprocessingLexer(stream, filename, includes);
// lexer.driverType = "fluffos";
// lexer.fileHandler = new MockFileHandler();
// lexer.tokenFactory = new LPCTokenFactor(filename);

// const tStream = new CommonTokenStream(lexer, 0);
// const parser = new LPCParser(tStream);
// parser.driverType = lexer.driverType;
// parser.errorHandler = new DefaultErrorStrategy();
// parser.interpreter.predictionMode = PredictionMode.SLL;
// parser.removeErrorListeners();
// parser.addErrorListener(new ConsoleErrorListener());
// parser.setTokenFactory(lexer.tokenFactory);
// parser.buildParseTrees = true;

// tStream.fill();
// const finalTokens = tStream.getTokens();
// finalTokens.forEach((t) => {
//     console.log((t as LPCToken).toString());
// });

// const newSource = finalTokens
//     .filter((t) => t.channel == 0 || t.type == LPCLexer.WS)
//     .map((t) => t.text)
//     .join("");

// //lexer.reset();
// // lexer.inputStream = CharStream.fromString(code);
// // tStream.setTokenSource(lexer);
// // parser.reset();

// tStream.reset();
// tStream.fill();

// //parser.interpreter.predictionMode = PredictionMode.SLL;
// try {
//     const tree = parser.program();
//     console.log("tree", tree.children);
// } catch (e) {
//     if (!(e instanceof ParseCancellationException)) {
//         throw e;
//     }
//     console.warn("Parse error");
// }
// //const filename = process.argv[2];
// //const dir = path.dirname(filename);

// // const backend = new LpcFacade(dir);
// // //main file
// // const ctxFile = backend.loadLpc(filename, code);

// // const tree = ctxFile.symbolTable;

// // const m = tree.getAllSymbolsSync(MethodSymbol, false);
// // const v = tree.getAllNestedSymbolsSync("subFn");

// // // trigger semantic analysis
// // backend.getDiagnostics(filename);

// // const tbl = backend.getContext(filename).symbolTable;

// // const varI = tbl.resolveSync("i") as VariableSymbol;
// // const varS = m[0].resolveSync("s") as VariableSymbol;
// // const finalValue = varI?.value;
// // const finalTValue = varS?.value;

// // console.log("i", finalValue);
// // console.log("t", finalTValue);

// const i = 0;
function doCreateLanguageService() {
    return createLanguageService({
        getCompilationSettings() {
            return {};
        },
        getScriptFileNames() {
            return [
                "foo.ts",
                "variables.ts",
                "vue.d.ts",
                "vue-class-component.d.ts",
            ];
        },
        getScriptVersion(_fileName) {
            return "";
        },
        getScriptSnapshot(fileName) {
            if (fileName === ".ts") {
                return ScriptSnapshot.fromString("");
            }
            return ScriptSnapshot.fromString(files[fileName] || "");
        },
        getCurrentDirectory: () => ".",
        getDefaultLibFileName(options) {
            return undefined;
            //return lpc.getDefaultLibFilePath(options);
        },
        fileExists: (name) => !!files[name],
        readFile: (name) => files[name],
    });
}

function createHost(
    filename: string,
    sourceText: string,
    config: ILpcConfig
): TypeCheckerHost {
    const srcFile = p2.LpcParser.parseSourceFile(filename, sourceText, config);
    const files: p2.SourceFile[] = [srcFile];
    const redirectTargetsMap: ReadonlyMap<Path, string[]> = new Map<
        Path,
        string[]
    >();

    const host: TypeCheckerHost = {
        getCompilerOptions: () => ({} as CompilerOptions),
        getSourceFiles: () => files,
        getSourceFile,
        // getProjectReferenceRedirect: () => undefined,
        // isSourceOfProjectReferenceRedirect: () => false,
        // getRedirectReferenceForResolutionFromSourceOfProject: () => undefined,
        // getResolvedModule: () => undefined,
        // typesPackageExists: () => false,
        // packageBundlesTypes: () => false,
        // redirectTargetsMap,

        // fileExists: function (path: string): boolean {
        //     throw new Error("Function not implemented.");
        // },
        getCurrentDirectory: function (): string {
            throw new Error("Function not implemented.");
        },
        getFileIncludeReasons: function (): p2.MultiMap<
            Path,
            p2.FileIncludeReason
        > {
            throw new Error("Function not implemented.");
        },
        // getCommonSourceDirectory: function (): string {
        //     throw new Error("Function not implemented.");
        // },
    };

    return host;

    function getSourceFile(fileName: string) {
        return files[0];
    }
}
