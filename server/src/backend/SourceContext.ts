import {
    BaseSymbol,
    CodeCompletionCore,
    ParameterSymbol,
    ScopedSymbol,
} from "antlr4-c3";
import {
    CharStream,
    CommonTokenStream,
    DefaultErrorStrategy,
    Interval,
    ParseCancellationException,
    ParseTree,
    ParseTreeWalker,
    ParserRuleContext,
    PredictionMode,
    TerminalNode,
    Token,
} from "antlr4ng";
import * as path from "path";
import { performance } from "perf_hooks";
import {
    DiagnosticSeverity,
    DocumentHighlight,
    DocumentHighlightKind,
    FoldingRange,
    Position,
    SemanticTokens,
} from "vscode-languageserver";
import { URI } from "vscode-uri";
import { getDriverInfo } from "../driver/Driver";
import { DriverVersion } from "../driver/DriverVersion";
import { FeatureValidationResult, IDriver } from "../driver/types";
import { LPCLexer } from "../parser3/LPCLexer";
import {
    FunctionDeclarationContext,
    LPCParser,
    ProgramContext,
    VariableDeclarationContext,
    VariableDeclaratorContext,
    VariableDeclaratorExpressionContext,
} from "../parser3/LPCParser";
import {
    DIRECTIVE_CHANNEL,
    DISABLED_CHANNEL,
    LPCPreprocessingLexer,
} from "../parser3/LPCPreprocessingLexer";
import { LPCToken } from "../parser3/LPCToken";
import { LPCTokenFactor } from "../parser3/LPCTokenFactory";
import { getParentContextOfType } from "../symbols/Symbol";
import {
    IEvaluatableSymbol,
    IFoldableSymbol,
    isInstanceOfIKindSymbol,
} from "../symbols/base";
import {
    VariableIdentifierSymbol,
    VariableSymbol,
} from "../symbols/variableSymbol";
import { ArrowSymbol, ArrowType } from "../symbols/arrowSymbol";
import { DefineSymbol } from "../symbols/defineSymbol";
import { IncludeSymbol } from "../symbols/includeSymbol";
import {
    InheritSuperAccessorSymbol,
    InheritSymbol,
} from "../symbols/inheritSymbol";

import {
    FunctionIdentifierSymbol,
    LpcBaseMethodSymbol,
    MethodDeclarationSymbol,
    MethodSymbol,
} from "../symbols/methodSymbol";
import {
    IContextDetails,
    IDefinition,
    IDiagnosticEntry,
    ISymbolInfo,
    MacroDefinition,
    SemanticTokenTypes,
    SymbolKind,
} from "../types";
import {
    getSelectionRange,
    lexRangeFromContext,
    logDiagnosticForTokens,
    normalizeFilename,
    pushIfDefined,
    rangeFromTokens,
    trimQuotes,
} from "../utils";
import { BackendUtils } from "./BackendUtils";
import { ContextErrorListener } from "./ContextErrorListener";
import { ContextLexerErrorListener } from "./ContextLexerErrorListener";
import { ContextSymbolTable } from "./ContextSymbolTable";
import { DetailsVisitor } from "./DetailsVisitor";
import { LpcFileHandler } from "./FileHandler";
import { ensureLpcConfig } from "./LpcConfig";
import { SemanticListener } from "./SemanticListener";
import { SemanticTokenCollection } from "./SemanticTokenCollection";
import { LpcFacade } from "./facade";
import { getImmediateParentOfType, resolveOfTypeSync } from "./symbol-utils";
import { CallStack, StackValue } from "./CallStack";
import { addPogramToStack } from "./CallStackUtils";
import { LiteralSymbol } from "../symbols/literalSymbol";
import { ResolvedFilename } from "./types";
import { EfunSymbol } from "../symbols/efunSymbol";
import { MasterFileContext } from "../driver/MasterFile";
import { MethodInvocationSymbol } from "../symbols/methodInvocationSymbol";
import { Interface } from "readline";

/**
 * Source context for a single LPC file.
 */
export class SourceContext {
    /** symbol table for this sourc efile */
    public symbolTable: ContextSymbolTable;

    /** stores info about imports and includes */
    public info: IContextDetails = {
        unreferencedMethods: [],
        imports: [],
        includes: [],
    };

    /** file handler for this source file */
    public fileHandler: LpcFileHandler = new LpcFileHandler(
        this.backend,
        this,
        this.info.includes,
        new Set<string>()
    );

    /* @internal */
    public diagnostics: IDiagnosticEntry[] = [];

    /**  Contexts referencing us  */
    private references: SourceContext[] = [];

    // Result related fields.
    private semanticAnalysisDone = false; // Includes determining reference counts.
    private parseSuccessful = true;
    /**
     * Indicates that semantic analysis / validation needs to be run
     */
    public get needsValidation(): boolean {
        return !this.semanticAnalysisDone;
    }

    // grammar parsing stuff
    private lexer: LPCPreprocessingLexer;
    public tokenStream: CommonTokenStream;
    private directiveStream: CommonTokenStream;
    private parser: LPCParser;
    private errorListener: ContextErrorListener = new ContextErrorListener(
        this.diagnostics
    );
    private lexerErrorListener: ContextLexerErrorListener =
        new ContextLexerErrorListener(this.diagnostics);

    /** The root context from the last parse run. */
    private tree: ProgramContext | undefined;
    public getParseTree(): ProgramContext | undefined {
        return this.tree;
    }

    /**
     * combined table that includes dependencies
     */
    private macroTable: Map<string, MacroDefinition> = new Map();

    /** source code from the IDE (unmodifier - i.e. macros have not been replaced) */
    private sourceText: string = "";

    /** flag that indicates if the text needs compiling, kind of like a dirty state */
    public needsCompile = true;

    private highlights: DocumentHighlight[] = [];
    private cachedSemanticTokens: SemanticTokens;
    private semanticTokens: SemanticTokenCollection;

    private allTokens: LPCToken[] = [];
    private symbolNameCache: Map<string, LPCToken[]> = new Map();

    /** flag that indicates if this file has been soft released */
    public softReleased = false;
    /** flag that indicates if this context has been disposed */
    public disposed = false;

    public constructor(
        public backend: LpcFacade,
        public fileName: string,
        private getDriverMacros: (filename: string) => Map<string, string>,
        private importDir: string[],
        private masterFile: MasterFileContext
    ) {
        this.symbolTable = new ContextSymbolTable(
            path.basename(fileName),
            { allowDuplicateSymbols: true },
            this
        );

        this.lexer = new LPCPreprocessingLexer(
            CharStream.fromString(""),
            this.fileName
        );
        this.lexer.tokenFactory = new LPCTokenFactor(this.fileName);
        this.lexer.fileHandler = this.fileHandler;

        // There won't be lexer errors actually. They are silently bubbled up and will cause parser errors.
        this.lexer.removeErrorListeners();
        this.lexer.addErrorListener(this.lexerErrorListener);

        this.tokenStream = new CommonTokenStream(this.lexer);
        this.directiveStream = new CommonTokenStream(
            this.lexer,
            DIRECTIVE_CHANNEL
        );

        const config = ensureLpcConfig();

        this.parser = new LPCParser(this.tokenStream);
        this.parser.driverType = config.driver.type;
        this.parser.setTokenFactory(this.lexer.tokenFactory);
        this.parser.buildParseTrees = true;
        this.parser.removeErrorListeners();
        this.parser.addErrorListener(this.errorListener);

        try {
            this.onCompile();
        } catch (e) {
            console.warn("Could not run applies for " + this.fileName, e);
        }
    }

    /** runs various driver apply's on compile */
    private onCompile() {
        const searchDirs = this.masterFile?.getIncludePath(this.fileName) ?? [];
        this.fileHandler.searchDirs.push(...searchDirs);
    }

    public get hasErrors(): boolean {
        for (const diagnostic of this.diagnostics) {
            if (diagnostic.type === DiagnosticSeverity.Error) {
                return true;
            }
        }

        return false;
    }

    /**
     * Should be called on every change to keep the input stream up to date, particularly for code completion.
     * This call doesn't do any expensive processing (parse() does).
     *
     * @param source The new content of the editor.
     */
    public setText(source: string): void {
        this.sourceText = source;
        this.needsCompile = true;
    }

    private buildTokenCache(tokens: LPCToken[]) {
        this.symbolNameCache?.clear();

        this.allTokens = tokens.filter(
            (t) => t.channel != DISABLED_CHANNEL && t.filename == this.fileName
        );
        this.allTokens.sort((a, b) => {
            if (a.line === b.line) {
                return a.column - b.column;
            }
            return a.line - b.line;
        });

        for (const token of tokens) {
            switch (token.type) {
                case LPCLexer.Identifier:
                    const name = token.text;
                    if (!this.symbolNameCache.has(name)) {
                        this.symbolNameCache.set(name, []);
                    }
                    this.symbolNameCache.get(name)?.push(token);
                    break;
            }
        }
    }

    private validateTokenSupported(
        token: LPCToken,
        feature: string,
        failMsg: string
    ): boolean {
        const config = ensureLpcConfig();
        const driver = getDriverInfo();
        const { type, version } = config.driver;

        let msgSuffix: string;
        switch (
            driver.checkFeatureCompatibility(feature, config.driver.version)
        ) {
            case FeatureValidationResult.NotSupported:
                msgSuffix = `by driver type ${type}`;
                break;
            case FeatureValidationResult.VersionNotSufficient:
                msgSuffix = `by ${type} driver version ${version}`;
                break;
            default:
                return true;
        }

        logDiagnosticForTokens(
            this.diagnostics,
            `${failMsg} ${msgSuffix}`,
            token,
            token,
            DiagnosticSeverity.Error
        );

        return false;
    }

    public parse(depChain?: Set<string>): IContextDetails {
        if (this.disposed) {
            // This context has been disposed.
            return;
        }

        this.fileHandler = new LpcFileHandler(
            this.backend,
            this,
            this.info.includes,
            depChain
        );

        this.macroTable.clear();

        const config = ensureLpcConfig();
        const driver = getDriverInfo();

        // add macros from config
        const configDefines = this.getDriverMacros(this.fileName);

        this.parseSuccessful = true;
        this.info.imports.length = 0;
        this.info.includes.length = 0;
        this.semanticAnalysisDone = false;
        this.diagnostics.length = 0;

        this.symbolTable.clear();
        this.symbolTable.addDependencies(driver.efuns);

        this.highlights = [];
        this.cachedSemanticTokens = undefined;
        this.semanticTokens = new SemanticTokenCollection();

        // Rewind the input stream for a new parse run.
        this.lexer.inputStream = CharStream.fromString(this.sourceText ?? "");
        this.lexer.driverType = config.driver.type;

        //this.tokenStream.setTokenSource(this.lexer);

        this.lexer.reset();
        this.lexer.addMacros(configDefines);
        this.tokenStream.setTokenSource(this.lexer);
        this.parser.reset();

        // use default instead of bailout here.
        // the method of using bailout and re-parsing using LL mode was causing problems
        // with code completion
        this.parser.driverType = config.driver.type;
        this.parser.errorHandler = new DefaultErrorStrategy();
        this.parser.interpreter.predictionMode = PredictionMode.SLL;

        this.tree = undefined;

        // get just the filename of the simul_efun
        const simulEfunFilename = path.basename(config.files.simul_efun);
        const sefunResolvedFilename = this.resolveFilename(
            config.files.simul_efun
        )?.fullPath;
        if (
            !this.fileName.endsWith(simulEfunFilename) &&
            !depChain.has(sefunResolvedFilename)
        ) {
            this.info.imports.push({
                filename: `"${config.files.simul_efun}"`,
                symbol: undefined,
            });

            // add sefuns as a dependency to the symbol table, but don't use
            // the fileHandler, as we don't want to add a reference to the sefun
            const sefun = this.backend.loadLpc(sefunResolvedFilename);
            if (sefun) {
                this.symbolTable.addDependencies(sefun.symbolTable);
            }
            // this.fileHandler.loadReference(
            //     config.files.simul_efun,
            //     undefined,
            //     depChain
            // );
        }

        this.tokenStream.reset();
        this.tokenStream.fill();
        const allTokens = this.tokenStream.getTokens() as LPCToken[];

        // const newSource = allTokens
        //     .filter((t) => t.channel == 0 || t.channel == 1)
        //     .map((t) => t.text)
        //     .join("");

        this.tokenStream.reset();
        this.tokenStream.fill();

        try {
            this.tree = this.parser.program();
        } catch (e) {
            if (e instanceof ParseCancellationException) {
                this.lexer.reset();
                this.tokenStream.setTokenSource(this.lexer);
                this.parser.reset();
                this.parser.errorHandler = new DefaultErrorStrategy();
                this.parser.interpreter.predictionMode = PredictionMode.LL;
                this.tree = this.parser.program();
                console.debug(`Bailed out to LL mode for ${this.fileName}`);
            } else {
                throw e;
            }
        }

        this.symbolTable.tree = this.tree;
        this.parseSuccessful = this.diagnostics.length == 0;

        this.buildTokenCache([
            ...allTokens,
            ...(this.directiveStream.getTokens() as LPCToken[]),
        ]);
        this.processTokens(allTokens);

        // get the macrotable from the lexer's preprocessor
        this.macroTable = this.lexer.getMacros();

        const visitor = new DetailsVisitor(
            this.symbolTable,
            this.info.imports,
            this.semanticTokens,
            this.fileHandler,
            this.fileName,
            configDefines
        );
        try {
            this.tree.accept(visitor);
        } catch (e) {
            console.error("Error in details visitor", e);
        }

        //this.info.unreferencedRules = this.symbolTable.getUnreferencedSymbols();

        this.needsCompile = false;
        this.cachedSemanticTokens = this.semanticTokens.build();

        // everything has been reparsed, so this file is no longer
        // in a soft released state
        this.softReleased = false;

        return this.info;
    }

    private processTokens(tokens: LPCToken[]) {
        tokens.forEach((token) => {
            if (token.filename == this.fileName) {
                if (token.channel == DISABLED_CHANNEL) {
                    this.semanticTokens.add(
                        token.line,
                        token.column,
                        token.text.length,
                        SemanticTokenTypes.Comment
                    );
                }
            }
        });
    }

    /**
     * Get a list of files that reference this one
     */
    public getReferences() {
        return this.references;
    }

    /**
     * Add this context to the list of referencing contexts in the given context.
     *
     * @param context The context to add.
     */
    public addAsReferenceTo(
        context: SourceContext,
        addSymbolTable = true
    ): void {
        // Check for mutual inclusion. References are organized like a mesh.
        const pipeline: SourceContext[] = [context];
        const seenRefs: Set<SourceContext> = new Set();

        if (addSymbolTable) {
            this.symbolTable.addDependencies(context.symbolTable);
        }

        while (pipeline.length > 0) {
            const current = pipeline.shift();
            if (!current) {
                continue;
            }

            if (current == this) {
                return; // Already in the list.
            }

            if (!seenRefs.has(current)) {
                seenRefs.add(current);
                pipeline.push(...current.references);
            }
        }

        context.references.push(this);

        // if (
        //     this.fileName.endsWith("living.c") &&
        //     context.fileName.endsWith("player.c")
        // ) {
        //     const i = 0;
        // }
    }

    /**
     * Remove the given context from our list of dependencies.
     *
     * @param context The context to remove.
     */
    public removeDependency(context: SourceContext): void {
        const index = context.references.indexOf(this);
        if (index > -1) {
            context.references.splice(index, 1);
        }

        //this.symbolTable?.removeDependency(context.symbolTable);
    }

    public getDependencies(): SourceContext[] {
        const dependencies: SourceContext[] = [];
        const pipeline: SourceContext[] = [...this.references];
        while (pipeline.length > 0) {
            const current = pipeline.shift();
            if (!current) {
                continue;
            }

            dependencies.push(current);
            pipeline.push(...current.references);
        }

        return dependencies;
    }

    private runSemanticAnalysisIfNeeded() {
        // don't run analysis if the code state is dirty. needs a compile first
        if (
            !this.semanticAnalysisDone &&
            this.tree &&
            //!this.needsCompile &&
            this.symbolTable
        ) {
            this.semanticAnalysisDone = true;

            const semanticListener = new SemanticListener(
                this.diagnostics,
                this.symbolTable,
                this
            );
            ParseTreeWalker.DEFAULT.walk(semanticListener, this.tree);
        }
    }

    public evaluateProgram() {
        if (this.needsCompile) {
            this.parse();
        }
        this.runSemanticAnalysisIfNeeded();
    }

    public async getDiagnostics(force = false): Promise<IDiagnosticEntry[]> {
        const p = new Promise<IDiagnosticEntry[]>((resolve, reject) => {
            try {
                if (this.disposed) resolve([]);
                if (force) this.semanticAnalysisDone = false;

                this.runSemanticAnalysisIfNeeded();

                const diags = this.diagnostics.map((d) => {
                    return {
                        ...d,
                        filename: !!d?.filename
                            ? URI.file(d.filename).toString()
                            : "",
                    };
                });
                resolve(diags);
            } catch (e) {
                console.error("Error getting diagnostics", e);
                resolve([]);
            }
        });
        return p;
    }

    public async listTopLevelSymbols(
        includeDependencies: boolean
    ): Promise<ISymbolInfo[]> {
        const symbols = (
            await this.symbolTable.listTopLevelSymbols(includeDependencies)
        ).filter((s) => s.filename == this.fileName);

        for (const [macro, def] of this.macroTable.entries()) {
            const { filename, value } = def;

            // only list macros from this file
            if (filename !== this.fileName) continue;

            symbols.push({
                kind: SymbolKind.Define,
                name: macro,
                source: filename,
                definition: {
                    text: value,
                    range: rangeFromTokens(def.token, def.token),
                },
            });
        }

        return symbols;
    }

    public static getKindFromSymbol(symbol: BaseSymbol): SymbolKind {
        if (isInstanceOfIKindSymbol(symbol)) {
            return symbol.kind;
        }
        return SymbolKind.Unknown;
    }

    /**
     * @param ctx The context to get info for.
     * @param keepQuotes A flag indicating if quotes should be kept if there are any around the context's text.
     *
     * @returns The definition info for the given rule context.
     */
    public definitionForContext(
        ctx: ParseTree | undefined,
        keepQuotes: boolean
    ): IDefinition | undefined {
        if (!ctx) return undefined;

        const result: IDefinition = {
            text: "",
            range: {
                start: { column: 0, row: 0 },
                end: { column: 0, row: 0 },
            },
        };

        if (ctx instanceof TerminalNode) {
            ctx = ctx.parent;
        }

        if (ctx instanceof ParserRuleContext) {
            let start = ctx.start!.start;
            let stop = ctx.stop!.stop;
            let rangeCtx = ctx; // ctx to use for symbol range
            const filename = (ctx.start! as LPCToken).filename;

            if (ctx instanceof VariableDeclaratorContext) {
                // variables need a little reconstruction since a declarator can have multiple variables
                const name = ctx._variableName.getText();
                let type: string, mods: string;
                const parentDeclCtx = getParentContextOfType(
                    ctx,
                    VariableDeclarationContext
                );
                const declExpCtx = getParentContextOfType(
                    ctx,
                    VariableDeclaratorExpressionContext
                );
                rangeCtx = declExpCtx ?? parentDeclCtx ?? ctx; // for variables, use the entire declaration for its range
                if (parentDeclCtx instanceof VariableDeclarationContext) {
                    // NTBLA: handle unions

                    type = parentDeclCtx
                        .unionableTypeSpecifier()
                        ?.primitiveTypeSpecifier()
                        ?.getText();
                    mods = parentDeclCtx
                        .variableModifier()
                        ?.map((m) => m.getText())
                        .join(" ");

                    if (
                        !!parentDeclCtx.unionableTypeSpecifier()?.STAR() &&
                        !!type
                    )
                        type += " *";
                }
                // else if (parentDeclCtx instanceof StructDeclarationContext) {
                //     type = "struct";
                //     mods = parentDeclCtx
                //         .variableModifier()
                //         ?.map((m) => m.getText())
                //         .join(" ");
                // }

                result.text = [mods, type, name]
                    .filter((s) => s?.length > 0)
                    .join(" ");
            }

            result.range = lexRangeFromContext(rangeCtx);

            if (!result.text) {
                result.text = ctx.getText();
            }
        } else if (ctx instanceof TerminalNode) {
            result.text = ctx.getText();

            result.range.start.column = ctx.symbol.column;
            result.range.start.row = ctx.symbol.line;
            result.range.end.column = ctx.symbol.column + result.text.length;
            result.range.end.row = ctx.symbol.line;
        }

        if (keepQuotes || result.text.length < 2) {
            return result;
        }

        const quoteChar = result.text[0];
        if (
            (quoteChar === '"' || quoteChar === "`" || quoteChar === "'") &&
            quoteChar === result.text[result.text.length - 1]
        ) {
            result.text = result.text.substring(1, result.text.length - 1);
        }

        return result;
    }

    public getSymbolInfo(symbol: string | BaseSymbol): ISymbolInfo | undefined {
        return this.symbolTable.getSymbolInfo(symbol);
    }

    public resolveSymbol(symbolName: string): BaseSymbol | undefined {
        return this.symbolTable.resolveSync(symbolName, false);
    }

    public symbolContainingPosition(
        position: Position
    ): BaseSymbol | undefined {
        return this.symbolTable.symbolContainingPosition(
            position.line + 1,
            position.character
        );
    }

    private findTokenAtPosition(column: number, line: number) {
        const arr = this.allTokens;
        let first = 0;
        let count = arr.length;

        // use binary search to find the token in allTokens that contains the position
        while (count > 0) {
            const step = count >> 1;
            const it = first + step;
            const token = arr[it];
            if (
                token.line < line ||
                (token.line === line && token.column < column)
            ) {
                first = it + 1;
                count -= step + 1;
            } else {
                count = step;
            }
        }

        const m = arr[first];
        if (
            !first &&
            m &&
            (line < m.line || (line === m.line && column < m.column))
        ) {
            return undefined;
        } else if (!m) {
            return undefined;
        } else {
            // NTBLA: why do we need this?
            if (
                first > 0 &&
                (arr[first].column > column ||
                    arr[first].text?.trim().length == 0)
            )
                return arr[first - 1];
            return m;
        }
    }

    public symbolAtPosition(
        column: number,
        row: number,
        limitToChildren: boolean
    ): ISymbolInfo[] | undefined {
        if (!this.tree || !(this.allTokens?.length > 0)) {
            return undefined;
        }

        const token = this.findTokenAtPosition(column, row);
        const terminal = BackendUtils.parseTreeFromTokenIndex(
            this.tree,
            token.tokenIndex
        ) as TerminalNode;

        const macroDef = this.macroTable.get(token?.text);

        if (!!macroDef) {
            const macroToken = macroDef?.token as LPCToken;
            const { column, line } = macroToken ?? { column: 0, line: 0 };

            const symbol = this.symbolTable.resolveSync(macroDef.name, false);

            return [
                {
                    symbol: symbol,
                    name: macroDef.name,
                    kind: SymbolKind.Define,
                    source: macroDef.filename ?? "",
                    filename: macroDef.filename ?? "",
                    token: token,
                    definition: {
                        range: {
                            start: { column: column, row: line },
                            end: {
                                column: column + macroDef.name.length,
                                row: line,
                            },
                        },
                        text: macroDef.name,
                    },
                },
            ];
        }

        if (!terminal || !(terminal instanceof TerminalNode)) {
            return undefined;
        }

        // If limitToChildren is set we only want to show info for symbols in specific contexts.
        // These are contexts which are used as subrules in rule definitions.
        if (!limitToChildren) {
            return [this.getSymbolInfo(terminal.getText())];
        }

        let parent = terminal?.parent as ParserRuleContext;
        let symbol: BaseSymbol;
        let name: string;
        let searchScope: ScopedSymbol;

        // we don't want literals, so move up the tree until we find a non-literal
        while (parent?.ruleIndex === LPCParser.RULE_literal) {
            parent = parent.parent as ParserRuleContext;
        }

        switch (parent.ruleIndex) {
            case LPCParser.RULE_lambdaExpression:
                let lambdaName = terminal.getText();
                // remove prefix
                if (lambdaName.startsWith("#'"))
                    lambdaName = lambdaName.slice(2);
                else if (lambdaName.startsWith("'"))
                    lambdaName = lambdaName.slice(1);

                symbol = this.symbolTable.resolveSync(lambdaName, false);

                break;
            case LPCParser.RULE_directiveTypeInclude:
            case LPCParser.RULE_includePreprocessorDirective:
            case LPCParser.RULE_directiveIncludeFile:
                const includeSymbol = this.symbolTable.symbolContainingContext(
                    terminal
                ) as IncludeSymbol;
                const filename = includeSymbol.name;
                if (!filename) return undefined;
                return [
                    {
                        symbol: includeSymbol,
                        name: filename,
                        kind: SymbolKind.Inherit,
                        filename: includeSymbol.fullPath,
                        source: this.fileName,
                        definition: {
                            range: {
                                start: { column: 0, row: 1 },
                                end: { column: 0, row: 1 },
                            },
                            text: `#include ${filename}`,
                        },
                    },
                ];
            case LPCParser.RULE_inherit:
            case LPCParser.RULE_inheritStatement:
            case LPCParser.RULE_inheritFile:
                const inheritSymbol = this.symbolTable.symbolContainingContext(
                    terminal
                ) as InheritSymbol;

                if (!inheritSymbol.name) return;
                return [
                    {
                        symbol: inheritSymbol,
                        name: inheritSymbol.name,
                        kind: SymbolKind.Inherit,
                        filename: this.backend.filenameToAbsolutePath(
                            normalizeFilename(trimQuotes(inheritSymbol.name))
                        ),
                        source: this.fileName,
                        definition: {
                            range: {
                                start: { column: 0, row: 1 },
                                end: { column: 0, row: 1 },
                            },
                            text: `Inherit ${inheritSymbol.name}`,
                        },
                    },
                ];
            case LPCParser.RULE_functionModifier:
            case LPCParser.RULE_variableModifier:
            case LPCParser.RULE_primitiveTypeSpecifier:
            case LPCParser.RULE_conditionalExpression:
            case LPCParser.RULE_primaryExpression:
            case LPCParser.RULE_primaryExpressionStart:
            case LPCParser.RULE_functionHeader:
            case LPCParser.RULE_callOtherTarget:
            case LPCParser.RULE_assignmentOperator:
            case LPCParser.RULE_validIdentifiers:
            case LPCParser.RULE_variableDeclaratorExpression:
            case LPCParser.RULE_expression:
            case LPCParser.RULE_statement: // it may be an incompletel function, which will show up as a statement
                symbol = this.symbolTable.symbolContainingContext(terminal);
                name = trimQuotes(terminal.getText());
                searchScope =
                    symbol instanceof ScopedSymbol
                        ? symbol
                        : symbol?.getParentOfType(ScopedSymbol);

                if (symbol instanceof VariableIdentifierSymbol) {
                    symbol = resolveOfTypeSync(
                        searchScope,
                        name,
                        VariableSymbol
                    );
                    symbol ??= resolveOfTypeSync(
                        searchScope,
                        name,
                        DefineSymbol
                    );
                    symbol ??= resolveOfTypeSync(
                        searchScope,
                        name,
                        ParameterSymbol
                    );
                } else if (symbol instanceof MethodSymbol) {
                    // look for the method implementation
                    symbol = resolveOfTypeSync(
                        this.symbolTable,
                        name,
                        MethodDeclarationSymbol
                    );
                    const si = this.getSymbolInfo(symbol);
                    return [si];
                } else if (symbol instanceof FunctionIdentifierSymbol) {
                    const symbolsToReturn: BaseSymbol[] = [];
                    let lookupSymbolTable = this.symbolTable;

                    // the invocation will cache the function symbol.. try to find that first
                    if (
                        !!(symbol.nextSibling as MethodInvocationSymbol)
                            ?.methodSymbol
                    ) {
                        const methodInvoc =
                            symbol.nextSibling as MethodInvocationSymbol;
                        symbol = methodInvoc.methodSymbol;
                        lookupSymbolTable =
                            symbol.symbolTable as ContextSymbolTable;
                    } else {
                        // if the symbol wasn't cached, try to look it up in other ways
                        let parentSymbol: BaseSymbol;
                        if (
                            (parentSymbol = getImmediateParentOfType(
                                symbol,
                                ArrowSymbol
                            ))
                        ) {
                            const callOtherSymbol = parentSymbol as ArrowSymbol;
                            // if the symbol object wasn't loaded, just return undefined
                            // that error will be caught and reported elsewhere
                            if (!callOtherSymbol.objContext) return undefined;

                            lookupSymbolTable =
                                callOtherSymbol.objContext.symbolTable;
                        } else if (
                            (parentSymbol = getImmediateParentOfType(
                                symbol,
                                InheritSuperAccessorSymbol
                            ))
                        ) {
                            const inheritSymbol =
                                parentSymbol as InheritSuperAccessorSymbol;
                            lookupSymbolTable = inheritSymbol.objSymbolTable;
                        }
                        // look for the method implementation
                        symbol = resolveOfTypeSync(
                            lookupSymbolTable,
                            name,
                            LpcBaseMethodSymbol
                        );
                    }

                    pushIfDefined(symbolsToReturn, symbol);

                    // also add the method header
                    symbol = resolveOfTypeSync(
                        lookupSymbolTable,
                        name,
                        MethodDeclarationSymbol
                    );
                    pushIfDefined(symbolsToReturn, symbol);

                    // it could also be an efun
                    if (symbolsToReturn.length == 0) {
                        const driver = getDriverInfo();
                        symbol = resolveOfTypeSync(
                            driver.efuns, // efuns always come from here
                            name,
                            EfunSymbol
                        );
                        pushIfDefined(symbolsToReturn, symbol);
                    }

                    return symbolsToReturn.map((s) => this.getSymbolInfo(s));
                    // } else if (
                    //     symbol?.symbolPath.some(
                    //         (p) => p instanceof EfunSymbol && p.name=="new" || p.name=="clone_object"
                    //     )
                    // ) {
                    //     // this is a special situation where we want to nav directly to the file
                    //     const objSymbol = symbol.symbolPath.find(
                    //         (p) => p instanceof EfunSymbol
                    //     ) as EfunSymbol;
                    //     return [
                    //         {
                    //             symbol: objSymbol,
                    //             name: objSymbol.relativeFileName,
                    //             kind: SymbolKind.Include,
                    //             source: objSymbol.filename,
                    //             definition: {
                    //                 range: {
                    //                     start: { column: 0, row: 1 },
                    //                     end: { column: 0, row: 1 },
                    //                 },
                    //                 text: `#include ${objSymbol.relativeFileName}`,
                    //             },
                    //         },
                    //     ];
                } else {
                    symbol = searchScope?.resolveSync(name, false);
                }

                break;
            case LPCParser.RULE_methodInvocation:
            case LPCParser.RULE_argumentList:
                symbol = this.symbolTable.symbolContainingContext(terminal);
                break;
            case LPCParser.RULE_literal:
                const ii = 0;
                break;
            default: {
                break;
            }
        }

        if (!!symbol) {
            return [this.getSymbolInfo(symbol)];
        }

        return undefined;
    }

    public async getCodeCompletionCandidates(
        column: number,
        row: number
    ): Promise<ISymbolInfo[]> {
        if (!this.parser) {
            return [];
        }

        performance.mark("get-completion-candidates-start");

        const core = new CodeCompletionCore(this.parser);

        core.ignoredTokens = new Set([
            LPCLexer.PAREN_CLOSE,
            LPCLexer.PAREN_OPEN,
            LPCLexer.WS,
            //LPCLexer.LT,
            //LPCLexer.GT,
            LPCLexer.SEMI,
            LPCLexer.CURLY_OPEN,
            LPCLexer.CURLY_CLOSE,
            LPCLexer.COMMA,
            LPCLexer.COLON,
            Token.EOF,
            // LPCLexer.ARROW,
        ]);

        core.preferredRules = new Set([
            //LPCParser.RULE_callOtherExpression,
            LPCParser.RULE_callOtherTarget,
            LPCParser.RULE_primaryExpressionStart,
            LPCParser.RULE_variableDeclaration,
            LPCParser.RULE_literal,
            LPCParser.RULE_primaryExpression,
        ]);

        // Search the token index which covers our caret position.
        this.tokenStream.fill();
        let index: number;
        let token: Token;

        for (index = 0; ; ++index) {
            token = this.tokenStream.get(index);

            if (token.type === Token.EOF || token.line > row) {
                break;
            }
            if (token.line < row) {
                continue;
            }
            const length = token.text ? token.text.length : 0;
            if (token.column + length >= column) {
                break;
            }
        }

        //console.debug("autocomplete token found", token.text, column);

        const candidates = core.collectCandidates(index);

        performance.mark("get-completion-candidates-collected");
        performance.measure(
            "collected-candidates",
            "get-completion-candidates-start",
            "get-completion-candidates-collected"
        );

        const result: ISymbolInfo[] = [];
        candidates.tokens.forEach((following: number[], type: number) => {
            switch (type) {
                case LPCLexer.Identifier:
                    break;
                case LPCLexer.ARROW: {
                    result.push({
                        kind: SymbolKind.Operator,
                        name: "->",
                        description: "Call other",
                        source: this.fileName,
                    });

                    break;
                }
                // case LPCLexer.ARRAY_OPEN: {
                //     result.push({
                //         kind: SymbolKind.Operator,
                //         name: "({ val })",
                //         description: "Array initializer",
                //         source: this.fileName,
                //     });

                //     break;
                // }
                case LPCLexer.ASSIGN: {
                    result.push({
                        kind: SymbolKind.Operator,
                        name: "=",
                        description: "Variable assignment",
                        source: this.fileName,
                    });

                    break;
                }

                case LPCLexer.ADD_ASSIGN: {
                    result.push({
                        kind: SymbolKind.Operator,
                        name: "+=",
                        description: "Variable increment",
                        source: this.fileName,
                    });

                    break;
                }

                default: {
                    // const value =
                    //     this.parser?.vocabulary.getDisplayName(type) ?? "";
                    // result.push({
                    //     kind: SymbolKind.Keyword,
                    //     name:
                    //         value[0] === "'"
                    //             ? value.substring(1, value.length - 1)
                    //             : value, // Remove quotes.
                    //     source: this.fileName,
                    // });

                    break;
                }
            }
        });

        // TODO: lfun completion base don the obj context
        //let symbolTable = this.symbolTable;
        let context = BackendUtils.parseTreeFromPosition(
            this.tree,
            column,
            row
        );
        const promises: Array<Promise<BaseSymbol[] | undefined>> = [];
        candidates.rules.forEach((candidateRule, key) => {
            switch (key) {
                case LPCParser.RULE_block:
                    result.push({
                        kind: SymbolKind.Block,
                        name: "{ code }",
                        source: this.fileName,
                        definition: undefined,
                        description: undefined,
                    });
                    break;

                case LPCParser.RULE_statement:
                case LPCParser.RULE_primaryExpressionStart:
                case LPCParser.RULE_primaryExpression:
                case LPCParser.RULE_literal:
                    let s = this.symbolTable.symbolContainingContext(context);
                    if (s.parent instanceof ArrowSymbol) s = s.parent;
                    if (s instanceof ArrowSymbol) {
                        if (
                            s.ArrowType == ArrowType.CallOther &&
                            !!s.objContext
                        ) {
                            // call other
                            promises.push(
                                s.objContext.symbolTable
                                    .getAllSymbols(MethodSymbol, false)
                                    .then((symbols) => {
                                        // filter out efuns
                                        return symbols.filter(
                                            (s) => !(s instanceof EfunSymbol)
                                        );
                                    })
                            );
                        } else if (s.ArrowType == ArrowType.StructMember) {
                            // may be a struct
                        }
                    } else {
                        // Lexer rules.
                        promises.push(
                            this.symbolTable.getAllSymbols(VariableSymbol)
                        );
                        promises.push(
                            this.symbolTable.getAllSymbols(MethodSymbol)
                        );
                        // needed especially for seefun file
                        promises.push(
                            this.symbolTable.getAllSymbols(
                                MethodDeclarationSymbol,
                                false
                            )
                        );
                        result.push({
                            kind: SymbolKind.Operator,
                            name: "->",
                            description: "Call other",
                            source: this.fileName,
                        });
                    }
                    break;
                case LPCParser.RULE_conditionalExpression:
                    promises.push(
                        this.symbolTable.getAllSymbols(VariableSymbol)
                    );
                    break;
                case LPCParser.RULE_functionDeclaration:
                    // result.push({
                    //     kind: SymbolKind.Method,
                    //     name: "modifiers type functionName(parameters) { code }",
                    //     source: this.fileName,
                    //     definition: undefined,
                    //     description: undefined,
                    // });

                    break;

                case LPCParser.RULE_variableDeclaration:
                    // result.push({
                    //     kind: SymbolKind.Variable,
                    //     name: "modifiers type variableName = value",
                    //     source: this.fileName,
                    // });
                    // promises.push(
                    //     this.symbolTable.getAllSymbols(VariableSymbol, false)
                    // );

                    break;

                default:
                    break;
            }
        });

        const symbolLists = await Promise.all(promises);
        const names = new Set<string>();
        symbolLists.forEach((symbols) => {
            if (symbols) {
                symbols.forEach((symbol) => {
                    if (symbol.name !== "EOF") {
                        if (!names.has(symbol.name)) {
                            names.add(symbol.name);

                            result.push({
                                kind: SourceContext.getKindFromSymbol(symbol),
                                name: symbol.name,
                                source: (
                                    symbol.symbolTable as ContextSymbolTable
                                )?.owner?.fileName,
                            });
                        }
                    }
                });
            }
        });

        performance.mark("get-completion-candidates-end");
        performance.measure(
            "assembled-candidates",
            "get-completion-candidates-collected",
            "get-completion-candidates-end"
        );

        performance.measure(
            "get-completion-candidates",
            "get-completion-candidates-start",
            "get-completion-candidates-end"
        );

        return result;
    }

    public getFoldingRanges(): FoldingRange[] {
        const s = this.symbolTable.getAllNestedSymbolsSync();
        return s
            .filter((s) => (s as unknown as IFoldableSymbol).foldingRange)
            .map((s) => (s as unknown as IFoldableSymbol).foldingRange);
    }

    public addDiagnostic(diagnostic: IDiagnosticEntry): void {
        // check if this diagnostic already exists
        // NTBLA make this more efficient
        const { message, range } = diagnostic;
        let diagCtx: SourceContext | undefined = this;

        if (diagnostic.filename != this.fileName) {
            diagCtx = this.backend.getContext(diagnostic.filename) ?? this;
        }

        if (
            (!diagnostic || diagnostic.filename == this.fileName) &&
            !diagCtx.diagnostics.some(
                (d) =>
                    d.message == message &&
                    d.range.start.row == range.start.row &&
                    d.range.start.column == range.start.column &&
                    d.range.end.row == range.end.row &&
                    d.range.end.column == range.end.column
            )
        ) {
            diagCtx.diagnostics.push(diagnostic);
        }
    }

    public resolveFilename(filename: string): ResolvedFilename {
        return this.backend.resolveFilename(filename, this.fileName);
    }

    public getSymbolOccurrences(
        symbolName: string,
        localOnly: boolean
    ): ISymbolInfo[] {
        const result = this.symbolTable.getSymbolOccurrences(
            symbolName,
            localOnly
        );

        // apply sourcemapping to results
        return result;
    }

    public getHighlights(symbolName: string): DocumentHighlight[] {
        const results = this.symbolTable.getSymbolsToHighlight(symbolName);

        return results.map((r) => {
            return {
                range: getSelectionRange(r.symbol.context as ParserRuleContext),
                kind: DocumentHighlightKind.Text,
            };
        }) as DocumentHighlight[];
    }

    public getSemanticTokens() {
        return this.cachedSemanticTokens;
    }

    /** releases objects that aren't needed if the file isn't open in the editor */
    public softRelease() {
        this.softReleased = true;
        this.sourceText = undefined;
        this.allTokens.length = 0;
        this.lexer.inputStream = CharStream.fromString("");
        //this.lexer.reset();
        this.tokenStream.setTokenSource(undefined); // this will clear the buffered tokens
        this.semanticTokens.clear();
        this.cachedSemanticTokens = undefined;
        this.highlights.length = 0;
        this.symbolNameCache?.clear();
    }

    /**
     * Releases all resources associated with this context.
     */
    public cleanup() {
        this.disposed = true;
        this.softRelease();
        this.symbolTable?.clear();
        this.symbolTable = undefined;
        this.lexer = undefined;
        this.parser = undefined;
        this.tokenStream = undefined;
        this.tree = undefined;
        this.diagnostics.length = 0;
        this.semanticAnalysisDone = false;
        this.macroTable?.clear();
    }
}
