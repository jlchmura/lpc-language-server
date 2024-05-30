import * as fs from "fs";
import * as path from "path";
import {
    CharStream,
    CommonTokenStream,
    DefaultErrorStrategy,
    ParseCancellationException,
    ParseTree,
    ParseTreeWalker,
    ParserRuleContext,
    PredictionMode,
    TerminalNode,
    Token,
} from "antlr4ng";
import { LPCLexer } from "../parser3/LPCLexer";
import {
    FunctionDeclarationContext,
    LPCParser,
    PrimitiveTypeVariableDeclarationContext,
    ProgramContext,
    StructVariableDeclarationContext,
    VariableDeclarationContext,
    VariableDeclaratorContext,
    VariableDeclaratorExpressionContext,
} from "../parser3/LPCParser";
import {
    IContextDetails,
    IDiagnosticEntry,
    ISymbolInfo,
    IDefinition,
    SymbolKind,
    MacroDefinition,
    SemanticTokenTypes,
    SemanticTokenModifiers,
} from "../types";
import { ContextErrorListener } from "./ContextErrorListener";
import { ContextLexerErrorListener } from "./ContextLexerErrorListener";
import { ContextSymbolTable } from "./ContextSymbolTable";
import { SemanticListener } from "./SemanticListener";
import {
    BaseSymbol,
    CodeCompletionCore,
    ParameterSymbol,
    ScopedSymbol,
} from "antlr4-c3";
import { BackendUtils } from "./BackendUtils";
import { LpcFacade } from "./facade";
import { DetailsVisitor } from "./DetailsVisitor";
import {
    DiagnosticSeverity,
    DocumentHighlight,
    DocumentHighlightKind,
    FoldingRange,
    Position,
    SemanticTokens,
} from "vscode-languageserver";
import {
    getSelectionRange,
    lexRangeFromContext as lexRangeFromContext,
    normalizeFilename,
    pushIfDefined,
    rangeFromTokens,
    resolveOfTypeSync,
    trimQuotes,
} from "../utils";
import { EfunSymbols } from "../driver/EfunsLDMud";
import { IFoldableSymbol, isInstanceOfIKindSymbol } from "../symbols/base";
import { DefineSymbol } from "../symbols/defineSymbol";
import {
    VariableIdentifierSymbol,
    VariableSymbol,
} from "../symbols/variableSymbol";
import {
    EfunSymbol,
    FunctionIdentifierSymbol,
    MethodDeclarationSymbol,
    MethodInvocationSymbol,
    MethodSymbol,
} from "../symbols/methodSymbol";
import { CloneObjectSymbol } from "../symbols/objectSymbol";
import { IncludeSymbol } from "../symbols/includeSymbol";
import { ArrowSymbol, ArrowType } from "../symbols/arrowSymbol";

import { SemanticTokenCollection } from "./SemanticTokenCollection";

import {
    InheritSuperAccessorSymbol,
    InheritSymbol,
} from "../symbols/inheritSymbol";
import { performance } from "perf_hooks";
import { LpcFileHandler } from "./FileHandler";
import { ensureLpcConfig } from "./LpcConfig";
import { getParentContextOfType } from "../symbols/Symbol";
import { DriverVersion } from "../driver/DriverVersion";
import {
    DIRECTIVE_CHANNEL,
    DISABLED_CHANNEL,
    LPCPreprocessingLexer,
} from "../parser3/LPCPreprocessingLexer";
import { LPCTokenFactor } from "../parser3/LPCTokenFactory";
import { LPCToken } from "../parser3/LPCToken";
import { URI } from "vscode-uri";

const mapAnnotationReg = /\[\[@(.+?)\]\]/;

/**
 * Source context for a single LPC file.
 */
export class SourceContext {
    public static efunSymbols = EfunSymbols;
    public static globalSymbols = new ContextSymbolTable("Global Symbols", {
        allowDuplicateSymbols: false,
    });

    public fileHandler = new LpcFileHandler(this.backend, this, EfunSymbols);
    public symbolTable: ContextSymbolTable;
    public sourceId: string;
    public info: IContextDetails = {
        unreferencedMethods: [],
        imports: [],
        objectReferences: {},
    };

    public onLoadImports: (imports: string[]) => void = () => {};

    /* @internal */
    public diagnostics: IDiagnosticEntry[] = [];

    private references: SourceContext[] = []; // Contexts referencing us.

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
    private commentStream: CommonTokenStream;
    private directiveStream: CommonTokenStream;

    private parser: LPCParser;
    private errorListener: ContextErrorListener = new ContextErrorListener(
        this.diagnostics
    );
    private lexerErrorListener: ContextLexerErrorListener =
        new ContextLexerErrorListener(this.diagnostics);

    /** The root context from the last parse run. */
    private tree: ProgramContext | undefined;

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

    public constructor(
        public backend: LpcFacade,
        public fileName: string,
        private extensionDir: string,
        private importDir: string[]
    ) {
        this.sourceId = path.basename(fileName);
        this.symbolTable = new ContextSymbolTable(
            this.sourceId,
            { allowDuplicateSymbols: true },
            this
        );

        // Initialize static global symbol table, if not yet done.
        // const sizeOfEfun = SourceContext.globalSymbols.resolveSync("sizeof");
        // if (!sizeOfEfun) {
        //     // add built-in symbols here
        // }

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
        this.commentStream = new CommonTokenStream(
            this.lexer,
            LPCLexer.COMMENT
        );
        this.directiveStream = new CommonTokenStream(
            this.lexer,
            DIRECTIVE_CHANNEL
        );

        this.parser = new LPCParser(this.tokenStream);
        this.parser.setTokenFactory(this.lexer.tokenFactory);
        this.parser.buildParseTrees = true;

        this.parser.removeErrorListeners();
        this.parser.addErrorListener(this.errorListener);
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
        this.symbolNameCache.clear();

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
            if (token.type === LPCLexer.Identifier) {
                const name = token.text;
                if (!this.symbolNameCache.has(name)) {
                    this.symbolNameCache.set(name, []);
                }
                this.symbolNameCache.get(name)?.push(token);
            }
        }
    }

    public parse(): IContextDetails {
        if (this.fileName.endsWith("simul_efun.c")) {
            const ii = 0;
        }

        this.macroTable.clear();

        const config = ensureLpcConfig();

        // add macros from config
        const configDefines = new Map(config.defines ?? []);
        const ver = DriverVersion.from(config.driver.version);
        configDefines.set("__VERSION__", `"${config.driver.version}"`);
        configDefines.set("__VERSION_MAJOR__", ver.major.toString());
        configDefines.set("__VERSION_MINOR__", ver.minor.toString());
        configDefines.set("__VERSION_MICRO__", ver.micro.toString());
        configDefines.set("__VERSION_PATCH__", "0");

        // get the dir of this file relative to project root
        const relativeDir = path.relative(
            this.backend.workspaceDir,
            this.fileName
        );
        const fileDir = path.dirname(relativeDir);
        configDefines.set("__DIR__", `"/${fileDir}/"`);

        this.parseSuccessful = true;
        this.info.imports.length = 0;
        this.semanticAnalysisDone = false;
        this.diagnostics.length = 0;

        this.symbolTable.clear();
        this.symbolTable.addDependencies(SourceContext.globalSymbols);
        this.symbolTable.addDependencies(EfunSymbols);

        this.highlights = [];
        this.cachedSemanticTokens = undefined;
        this.semanticTokens = new SemanticTokenCollection();

        // Rewind the input stream for a new parse run.
        this.lexer.inputStream = CharStream.fromString(this.sourceText);
        this.lexer.reset();

        this.lexer.addMacros(configDefines);
        this.tokenStream.setTokenSource(this.lexer);

        this.parser.reset();

        // use default instead of bailout here.
        // the method of using bailout and re-parsing using LL mode was causing problems
        // with code completion
        this.parser.errorHandler = new DefaultErrorStrategy();
        this.parser.interpreter.predictionMode = PredictionMode.SLL;

        this.tree = undefined;

        // get just the filename of the simul_efun
        const simulEfunFilename = path.basename(config.files.simul_efun);
        if (!this.fileName.endsWith(simulEfunFilename)) {
            this.info.imports.push({
                filename: `"${config.files.simul_efun}"`,
                symbol: undefined,
            });
        }

        this.tokenStream.reset();
        this.tokenStream.fill();
        const allTokens = this.tokenStream.getTokens() as LPCToken[];

        this.buildTokenCache([
            ...allTokens,
            ...(this.directiveStream.getTokens() as LPCToken[]),
        ]);
        this.processTokens(allTokens);

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

        // get the macrotable from the lexer's preprocessor
        this.macroTable = this.lexer.getMacros();

        const visitor = new DetailsVisitor(
            this.backend,
            this.symbolTable,
            this.info.imports,
            this.semanticTokens,
            this.fileHandler,
            this.fileName
        );
        try {
            this.tree.accept(visitor);
        } catch (e) {
            console.error("Error in details visitor", e);
        }

        //this.info.unreferencedRules = this.symbolTable.getUnreferencedSymbols();

        this.needsCompile = false;
        this.cachedSemanticTokens = this.semanticTokens.build();

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

        if (addSymbolTable) {
            this.symbolTable.addDependencies(context.symbolTable);
        }
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

        this.symbolTable.removeDependency(context.symbolTable);
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
            this.parseSuccessful &&
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

    public getDiagnostics(force = false): IDiagnosticEntry[] {
        if (force) this.semanticAnalysisDone = false;
        this.runSemanticAnalysisIfNeeded();

        return this.diagnostics.map((d) => {
            d.filename = URI.parse(d.filename).toString();
            return d;
        });
    }

    public listTopLevelSymbols(includeDependencies: boolean): ISymbolInfo[] {
        const symbols = this.symbolTable
            .listTopLevelSymbols(includeDependencies)
            .filter((s) => s.filename == this.fileName);

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
    public static definitionForContext(
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

            if (ctx instanceof FunctionDeclarationContext) {
                // function only needs the function header
                const funHeader = ctx.functionHeader();
                start = funHeader.start!.start;
                stop = funHeader.stop!.stop;
            } else if (ctx instanceof VariableDeclaratorContext) {
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
                if (
                    parentDeclCtx instanceof
                    PrimitiveTypeVariableDeclarationContext
                ) {
                    // NTBLA: handle unions

                    type = parentDeclCtx
                        .unionableTypeSpecifier()
                        ?.primitiveTypeSpecifier()
                        ?.getText();
                    mods = parentDeclCtx
                        .variableModifier()
                        ?.map((m) => m.getText())
                        .join(" ");
                    if (!!ctx.STAR() && !!type) type += " *";
                } else if (
                    parentDeclCtx instanceof StructVariableDeclarationContext
                ) {
                    type = "struct";
                    mods = parentDeclCtx
                        .variableModifier()
                        ?.map((m) => m.getText())
                        .join(" ");
                }

                result.text = [mods, type, name]
                    .filter((s) => s?.length > 0)
                    .join(" ");
            }

            result.range = lexRangeFromContext(rangeCtx);

            if (!result.text) {
                const inputStream = ctx.start?.tokenSource?.inputStream;
                if (inputStream) {
                    try {
                        result.text = inputStream.getTextFromRange(start, stop);
                    } catch (e) {
                        // The method getText uses an unreliable JS String API which can throw on larger texts.
                        // In this case we cannot return the text of the given context.
                        // A context with such a large size is probably an error case anyway (unfinished multi line comment
                        // or unfinished action).
                    }
                }
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
            position.line,
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
            if (first > 0 && arr[first].column > column) return arr[first - 1];
            return m;
        }
    }

    public symbolAtPosition(
        column: number,
        row: number,
        limitToChildren: boolean
    ): ISymbolInfo[] | undefined {
        if (!this.tree) {
            return undefined;
        }

        const token = this.findTokenAtPosition(column, row);
        const terminal = BackendUtils.parseTreeFromTokenIndex(
            this.tree,
            token.tokenIndex
        ) as TerminalNode;
        // const terminal = BackendUtils.parseTreeFromPosition(
        //     this.tree,
        //     column,
        //     row,
        //     this.fileName
        // ) as TerminalNode;

        const macroDef = this.macroTable.get(token?.text);

        if (!!macroDef) {
            const macroToken = macroDef.token as LPCToken;
            const { column, line } = macroToken;

            const symbol = this.symbolTable.resolveSync(macroDef.name, false);

            return [
                {
                    symbol: symbol,
                    name: macroDef.name,
                    kind: SymbolKind.Define,
                    source: macroDef.filename,
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
            case LPCParser.RULE_directiveTypeInclude:
            case LPCParser.RULE_directiveGlobalFile:
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
                        source: includeSymbol.fullPath,
                        definition: {
                            range: {
                                start: { column: 0, row: 1 },
                                end: { column: 0, row: 1 },
                            },
                            text: `#include ${filename}`,
                        },
                    },
                ];
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
                        source: this.backend.filenameToAbsolutePath(
                            normalizeFilename(trimQuotes(inheritSymbol.name))
                        ),
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
            case LPCParser.RULE_assignmentOrConditionalExpression:
            case LPCParser.RULE_primaryExpression:
            case LPCParser.RULE_primaryExpressionStart:
            case LPCParser.RULE_functionHeader:
            case LPCParser.RULE_callOtherTarget:
            case LPCParser.RULE_assignmentOperator:
            case LPCParser.RULE_validIdentifiers:
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
                            (parentSymbol = symbol.getParentOfType(ArrowSymbol))
                        ) {
                            const callOtherSymbol = parentSymbol as ArrowSymbol;
                            // if the symbol object wasn't loaded, just return undefined
                            // that error will be caught and reported elsewhere
                            if (!callOtherSymbol.objContext) return undefined;

                            lookupSymbolTable =
                                callOtherSymbol.objContext.symbolTable;
                        } else if (
                            (parentSymbol = symbol.parent.getParentOfType(
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
                            MethodDeclarationSymbol
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
                    symbol = resolveOfTypeSync(
                        EfunSymbols, // efuns always come from here
                        name,
                        EfunSymbol
                    );
                    pushIfDefined(symbolsToReturn, symbol);

                    return symbolsToReturn.map((s) => this.getSymbolInfo(s));
                } else if (
                    symbol?.symbolPath.some(
                        (p) => p instanceof CloneObjectSymbol
                    )
                ) {
                    // this is a special situation where we want to nav directly to the file
                    const objSymbol = symbol.symbolPath.find(
                        (p) => p instanceof CloneObjectSymbol
                    ) as CloneObjectSymbol;
                    return [
                        {
                            symbol: objSymbol,
                            name: objSymbol.relativeFileName,
                            kind: SymbolKind.Include,
                            source: objSymbol.filename,
                            definition: {
                                range: {
                                    start: { column: 0, row: 1 },
                                    end: { column: 0, row: 1 },
                                },
                                text: `#include ${objSymbol.relativeFileName}`,
                            },
                        },
                    ];
                } else {
                    symbol = searchScope.resolveSync(name, false);
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

    public getReferenceCount(symbol: string): number {
        this.runSemanticAnalysisIfNeeded();

        let result = this.symbolTable.getReferenceCount(symbol);

        for (const reference of this.references) {
            result += reference.getReferenceCount(symbol);
        }

        return result;
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

        console.debug("autocomplete token found", token.text, column);

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
                            SourceContext.globalSymbols.getAllSymbols(
                                EfunSymbol
                            )
                        );
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
                case LPCParser.RULE_assignmentOrConditionalExpression:
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

    public resolveFilename(filename: string) {
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
}
