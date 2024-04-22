import * as fs from "fs";
import {
    BailErrorStrategy,
    CharStream,
    CommonTokenStream,
    DefaultErrorStrategy,
    ErrorNode,
    IInterpreterData,
    ParseCancellationException,
    ParseTree,
    ParseTreeWalker,
    ParserRuleContext,
    PredictionMode,
    TerminalNode,
    Token,
    TokenStreamRewriter,
} from "antlr4ng";
import { LPCLexer } from "../parser3/LPCLexer";
import {
    FunctionDeclarationContext,
    LPCParser,
    PrimitiveTypeVariableDeclarationContext,
    ProgramContext,
    StructVariableDeclarationContext,
    VariableDeclaratorContext,
} from "../parser3/LPCParser";
import * as path from "path";
import {
    IContextDetails,
    IDiagnosticEntry,
    ISymbolInfo,
    IDefinition,
    SymbolKind,
    LpcTypes,
    DependencySearchType,
    SOURCEMAP_CHANNEL_NUM,
    MacroDefinition,
    IPosition,
} from "../types";
import { ContextErrorListener } from "./ContextErrorListener";
import { ContextLexerErrorListener } from "./ContextLexerErrorListener";
import { ContextSymbolTable } from "./ContextSymbolTable";
import { SemanticListener } from "./SemanticListener";
import {
    BaseSymbol,
    BlockSymbol,
    CodeCompletionCore,
    IType,
    MethodSymbol as BaseMethodSymbol,
    ParameterSymbol,
    ScopedSymbol,
    FundamentalType,
    VariableSymbol as VariableSymbolBase,
} from "antlr4-c3";
import { BackendUtils } from "./BackendUtils";
import { LpcFacade } from "./facade";

import { DetailsVisitor } from "./DetailsVisitor";
import { DiagnosticSeverity, FoldingRange } from "vscode-languageserver";
import {
    firstEntry,
    lexRangeFromContext as lexRangeFromContext,
    normalizeFilename,
    pushIfDefined,
    resolveOfTypeSync,
    testFilename,
    trimQuotes,
} from "../utils";
import {
    IFoldableSymbol,
    getSymbolsOfTypeSync,
    isInstanceOfIKindSymbol,
} from "../symbols/base";
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
import { EfunSymbols } from "./EfunsLDMud";
import { InheritSymbol, getParentOfType } from "../symbols/Symbol";
import { IncludeSymbol } from "../symbols/includeSymbol";
import { URI } from "vscode-uri";
import { ArrowSymbol, ArrowType } from "../symbols/arrowSymbol";
import { LPCPreprocessorLexer } from "../preprocessor/LPCPreprocessorLexer";
import {
    LPCPreprocessorParser,
    LpcDocumentContext,
} from "../preprocessor/LPCPreprocessorParser";
import { TestParser } from "./TestParser";
import { PreprocessorListener } from "./PreprocessorListener";
import { MacroProcessor } from "./Macros";

const mapAnnotationReg = /\[\[@(.+?)\]\]/;

/**
 * Source context for a single LPC file.
 */
export class SourceContext {
    public static globalSymbols = new ContextSymbolTable("Global Symbols", {
        allowDuplicateSymbols: false,
    });

    public static efunSymbols = EfunSymbols;

    public symbolTable: ContextSymbolTable;
    public sourceId: string;
    public info: IContextDetails = {
        unreferencedMethods: [],
        imports: [],
        objectImports: [],
    };

    /* @internal */
    public diagnostics: IDiagnosticEntry[] = [];

    // eslint-disable-next-line no-use-before-define
    private references: SourceContext[] = []; // Contexts referencing us.

    // Result related fields.
    private semanticAnalysisDone = false; // Includes determining reference counts.
    /**
     * Indicates that semantic analysis / validation needs to be run
     */
    public get needsValidation(): boolean {
        return !this.semanticAnalysisDone;
    }

    // grammar parsing stuff
    private preLexer: LPCPreprocessorLexer;
    private lexer: LPCLexer;
    public tokenStream: CommonTokenStream;
    public commentStream: CommonTokenStream;
    public preTokenStream: CommonTokenStream;
    private preParser: LPCPreprocessorParser;
    private parser: LPCParser;
    private errorListener: ContextErrorListener = new ContextErrorListener(
        this.diagnostics
    );
    private lexerErrorListener: ContextLexerErrorListener =
        new ContextLexerErrorListener(this.diagnostics);

    /** The root context from the last parse run. */
    private tree: ProgramContext | undefined;

    /**
     * Holds #define macros pulled out during the preprocessing phase. The map's key is the macro name with the `#` symbol removed.
     * The map value is the expanded text of the macro
     */
    private localMacroTable: Map<string, MacroDefinition> = new Map();
    /**
     * combined table that includes dependencies
     */
    private macroTable: Map<string, MacroDefinition> = new Map();

    /** source code from the IDE (unmodifier - i.e. macros have not been replaced) */
    private sourceText: string = "";
    /** source code after the preprocess has been run */
    private preprocessedText: string = "";

    /** flag that indicates if the text needs compiling, kind of like a dirty state */
    private needsCompile = false;
    /** each array entry corresponds to a line number in sourceText. Each array element is
     * a mapping that holds a column number in the sourceText line and the offset from that point in the line forward
     */
    private sourceMap: Map<number, number>[] = [];

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

        this.lexer = new LPCLexer(CharStream.fromString(""));
        this.preLexer = new LPCPreprocessorLexer(CharStream.fromString(""));

        // There won't be lexer errors actually. They are silently bubbled up and will cause parser errors.
        this.lexer.removeErrorListeners();
        this.lexer.addErrorListener(this.lexerErrorListener);
        this.preLexer.removeErrorListeners();

        this.tokenStream = new CommonTokenStream(this.lexer);
        this.preTokenStream = new CommonTokenStream(this.preLexer);

        this.commentStream = new CommonTokenStream(
            this.lexer,
            LPCLexer.COMMENT
        );

        this.parser = new TestParser(this.tokenStream);
        this.parser.buildParseTrees = true;

        this.preParser = new LPCPreprocessorParser(this.preTokenStream);
        this.preParser.buildParseTrees = true;

        this.parser.removeErrorListeners();
        this.parser.addErrorListener(this.errorListener);
        this.preParser.removeErrorListeners();
        this.preParser.addErrorListener(this.errorListener);
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

    private parseMacroTable() {
        this.localMacroTable.clear();

        // reset lexer & token stream
        this.preLexer.inputStream = CharStream.fromString(this.sourceText);
        this.preLexer.reset();
        this.preTokenStream.setTokenSource(this.preLexer);

        this.preParser.reset();
        this.preParser.errorHandler = new DefaultErrorStrategy();
        this.preParser.interpreter.predictionMode = PredictionMode.SLL;
        this.preParser.buildParseTrees = true;

        let tree: LpcDocumentContext;
        try {
            tree = this.preParser.lpcDocument();
        } catch (e) {
            return;
        }

        const rw = new TokenStreamRewriter(this.preTokenStream);

        const listener = new PreprocessorListener(
            this.localMacroTable,
            this.fileName,
            rw
        );

        ParseTreeWalker.DEFAULT.walk(listener, tree);

        const newtext = rw.getText();
        this.preprocessedText = newtext;

        // now combine macro tables from dependencies
        // get dependency macro tables and combine into one
        const deps = Array.from(this.symbolTable.getDependencies())
            .filter(
                (depTbl): depTbl is ContextSymbolTable =>
                    !!(depTbl as ContextSymbolTable).owner
            )
            .map((depTbl) => depTbl.owner);
        const depMacroTables = deps.map((depCtx) => depCtx.macroTable);
        this.macroTable = depMacroTables.reduce((acc, ctxTable) => {
            return new Map([...acc, ...ctxTable]);
        }, this.localMacroTable);
    }

    /**
     * Replace macros in the source text with their expanded text from the macro table.  In sourceText, the macros
     * will match the `key` of macroTable exactly (include case). They will not include a hash `#` symbol.
     * Every time a substitution is made, update the sourcemap with the offset so that tokens after the macro can be mapped back to the original
     */
    private processMacros(): string {
        // for each line in the source text
        this.sourceMap = [];
        const lines = this.preprocessedText.split(/\r?\n/);
        const macroProcessor = new MacroProcessor();

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            this.sourceMap[i] = new Map();

            if (line.trim().length == 0) continue;

            // for each macro in the macro table
            for (const [key, def] of this.macroTable) {
                const { args, value, regex, annotation } = def;
                // skip if there is no value
                if (!value) continue;

                let match: RegExpExecArray;
                while ((match = regex.exec(line))) {
                    const start = match.index;

                    if (!!args) {
                        // special handling for function-type

                        // store line back in array
                        lines[i] = line;

                        macroProcessor.processMacroFunction(lines, key, def, {
                            row: i,
                            column: start,
                        });

                        // restore current line var
                        line = lines[i];
                    } else {
                        const end = start + key.length;
                        // update the source map with the offset
                        this.sourceMap[i].set(start, annotation.length + 1); // +1 for the space
                        this.sourceMap[i].set(end, value.length - key.length);
                        // replace the macro with the expanded text
                        line =
                            line.substring(0, start) +
                            " " + // add a space to separate the annotation from the previous token
                            annotation +
                            value +
                            line.substring(end);
                    }
                }
            }

            // update the source text with the new line
            lines[i] = line;
        }

        return lines.join("\n");
    }

    public parse(): IContextDetails {
        console.debug(`Parsing ${this.fileName}`);

        this.parseMacroTable();

        // pre-process
        const sourceText = this.processMacros();

        console.debug("new source text:\n" + sourceText);

        // Rewind the input stream for a new parse run.
        this.lexer.inputStream = CharStream.fromString(sourceText);
        this.lexer.reset();

        this.tokenStream.setTokenSource(this.lexer);

        this.parser.reset();
        // use default instead of bailout here.
        // the method of using bailout and re-parsing using LL mode was causing problems
        // with code completion
        this.parser.errorHandler = new DefaultErrorStrategy();
        this.parser.interpreter.predictionMode = PredictionMode.SLL;

        this.tree = undefined;

        this.info.imports.length = 0;
        this.info.objectImports.length = 0;

        this.semanticAnalysisDone = false;
        this.diagnostics.length = 0;

        this.symbolTable.clear();

        this.symbolTable.addDependencies(SourceContext.globalSymbols);
        this.symbolTable.addDependencies(EfunSymbols);

        if (!this.fileName.endsWith("simul_efun.c")) {
            this.info.imports.push({
                filename: `"/obj/simul_efun.c"`,
                symbol: undefined,
            });
        }

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
            } else {
                throw e;
            }
        }

        this.symbolTable.tree = this.tree;

        const visitor = new DetailsVisitor(
            this.backend,
            this.symbolTable,
            this.info.imports,
            this.info.objectImports
        );
        this.tree.accept(visitor);

        //this.info.unreferencedRules = this.symbolTable.getUnreferencedSymbols();

        this.needsCompile = false;

        return this.info;
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
        while (pipeline.length > 0) {
            const current = pipeline.shift();
            if (!current) {
                continue;
            }

            if (current.references.indexOf(this) > -1) {
                return; // Already in the list.
            }

            pipeline.push(...current.references);
        }
        context.references.push(this);

        // if (
        //     this.fileName.endsWith("living.c") &&
        //     context.fileName.endsWith("player.c")
        // ) {
        //     const i = 0;
        // }

        if (addSymbolTable) {
            // console.debug(
            //     "Adding dependencies from",
            //     this.fileName,
            //     "to",
            //     context.fileName
            // );
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
        if (!this.semanticAnalysisDone && this.tree && !this.needsCompile) {
            this.semanticAnalysisDone = true;

            const semanticListener = new SemanticListener(
                this.diagnostics,
                this.symbolTable,
                this
            );
            ParseTreeWalker.DEFAULT.walk(semanticListener, this.tree);
        }
    }

    public getDiagnostics(): IDiagnosticEntry[] {
        this.runSemanticAnalysisIfNeeded();

        return this.diagnostics?.map((d) => {
            return d;
        });
    }

    public listTopLevelSymbols(includeDependencies: boolean): ISymbolInfo[] {
        const symbols =
            this.symbolTable.listTopLevelSymbols(includeDependencies);

        for (const [macro, def] of this.macroTable.entries()) {
            const { start, end, filename, value } = def;

            symbols.push({
                kind: SymbolKind.Define,
                name: macro,
                source: filename,
                definition: {
                    text: value,
                    range: { start, end },
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

            if (ctx instanceof FunctionDeclarationContext) {
                // function only needs the function header
                const funHeader = ctx.functionHeader();
                start = funHeader.start!.start;
                stop = funHeader.stop!.stop;
            } else if (ctx instanceof VariableDeclaratorContext) {
                // varialbes need a little reconstruction since a declarator can have multiple variables
                const name = ctx._variableName.text;
                let type: string, mods: string;
                if (
                    ctx.parent instanceof
                    PrimitiveTypeVariableDeclarationContext
                ) {
                    type = ctx.parent.primitiveTypeSpecifier()?.getText();
                    mods = ctx.parent
                        .variableModifier()
                        ?.map((m) => m.getText())
                        .join(" ");
                    if (!!ctx.STAR() && !!type) type += " *";
                } else if (
                    ctx.parent instanceof StructVariableDeclarationContext
                ) {
                    type = "struct";
                    mods = ctx.parent
                        .variableModifier()
                        ?.map((m) => m.getText())
                        .join(" ");
                }

                result.text = [mods, type, name]
                    .filter((s) => s.length > 0)
                    .join(" ");
            }

            result.range = lexRangeFromContext(ctx);

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

    /**
     * convert sourcText column/row to lexer column/row using the sourceMap
     * @param column
     * @param row
     * @returns
     */
    public sourceToTokenLocation(
        column: number,
        row: number
    ): { column: number; row: number } {
        // convert sourcText column/row to lexer column/row using the sourceMap
        const colMap = this.sourceMap[row - 1]!;
        let totalOffset = 0;
        for (const [sourceColumn, offset] of colMap) {
            if (sourceColumn <= column) {
                totalOffset += offset;
            } else {
                break;
            }
        }

        return { column: column + totalOffset, row };
    }

    public symbolAtPosition(
        column: number,
        row: number,
        limitToChildren: boolean
    ): ISymbolInfo[] | undefined {
        if (!this.tree) {
            return undefined;
        }

        const { column: lexerColumn } = this.sourceToTokenLocation(column, row);

        const terminal = BackendUtils.parseTreeFromPosition(
            this.tree,
            lexerColumn,
            row
        );
        if (!terminal || !(terminal instanceof TerminalNode)) {
            return undefined;
        }

        const tokenIndex = terminal.symbol.tokenIndex;
        const mapping = firstEntry(
            this.tokenStream.getHiddenTokensToLeft(
                tokenIndex,
                SOURCEMAP_CHANNEL_NUM
            )
        );
        if (!!mapping) {
            // mappingText is a string in the format of: [[@<source_row>,<source_col>,<source_symbol>]]
            // pull out the symbol from that string
            const mappingText = mapping.text;
            const mappingMatch = mappingText.match(mapAnnotationReg);
            if (mappingMatch) {
                const sourceSymbol = mappingMatch[1];
                const macroDef = this.macroTable.get(sourceSymbol);
                if (!!macroDef) {
                    const { start, end } = macroDef;
                    const columnEnd = column + sourceSymbol.length;
                    return [
                        {
                            symbol: undefined,
                            name: sourceSymbol,
                            kind: SymbolKind.Define,
                            source: macroDef.filename,
                            definition: {
                                range: {
                                    start: start,
                                    end: end,
                                },
                                text: sourceSymbol,
                            },
                        },
                    ];
                }
            }
        }

        // If limitToChildren is set we only want to show info for symbols in specific contexts.
        // These are contexts which are used as subrules in rule definitions.
        if (!limitToChildren) {
            return [this.getSymbolInfo(terminal.getText())];
        }

        let parent = terminal.parent as ParserRuleContext;
        let symbol: BaseSymbol;
        let name: string;
        let searchScope: ScopedSymbol;

        // we don't want literals, so move up the tree until we find a non-literal
        while (parent?.ruleIndex === LPCParser.RULE_literal) {
            parent = parent.parent as ParserRuleContext;
        }

        switch (parent.ruleIndex) {
            case LPCParser.RULE_directiveIncludeFilename:
            case LPCParser.RULE_directiveIncludeFileLocal:
            case LPCParser.RULE_directiveIncludeFileGlobal:
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
            case LPCParser.RULE_assignmentExpression:
            case LPCParser.RULE_primaryExpression:
            case LPCParser.RULE_primaryExpressionStart:
            case LPCParser.RULE_functionHeader:
            case LPCParser.RULE_callOtherTarget:
            case LPCParser.RULE_assignmentOperator:
            case LPCParser.RULE_expression:
            case LPCParser.RULE_statement: // it may be an incompletel function, which will show up as a statement
                symbol = this.symbolTable.symbolContainingContext(terminal);
                name = trimQuotes(terminal.getText());
                searchScope =
                    symbol instanceof ScopedSymbol
                        ? symbol
                        : symbol.getParentOfType(ScopedSymbol);

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
                } else if (symbol instanceof MethodSymbol) {
                    // look for the method implementation
                    const symbol = resolveOfTypeSync(
                        this.symbolTable,
                        name,
                        MethodDeclarationSymbol
                    );
                    return [this.getSymbolInfo(symbol)];
                } else if (symbol instanceof FunctionIdentifierSymbol) {
                    const symbolsToReturn: BaseSymbol[] = [];
                    let lookupSymbolTable = this.symbolTable;

                    if (symbol.parent instanceof ArrowSymbol) {
                        const callOtherSymbol = symbol.parent as ArrowSymbol;
                        // if the symbol object wasn't loaded, just return undefined
                        // that error will be caught and reported elsewhere
                        if (!callOtherSymbol.objContext) return undefined;

                        lookupSymbolTable =
                            callOtherSymbol.objContext.symbolTable;
                    }
                    // look for the method implementation
                    symbol = resolveOfTypeSync(
                        lookupSymbolTable,
                        name,
                        MethodDeclarationSymbol
                    );
                    pushIfDefined(symbolsToReturn, symbol);

                    // also add the method header
                    symbol = resolveOfTypeSync(
                        lookupSymbolTable,
                        name,
                        MethodSymbol
                    );
                    pushIfDefined(symbolsToReturn, symbol);

                    // it could also be an efun
                    symbol = resolveOfTypeSync(
                        SourceContext.efunSymbols, // efuns always come from here
                        name,
                        EfunSymbol
                    );
                    pushIfDefined(symbolsToReturn, symbol);

                    return symbolsToReturn.map((s) => this.getSymbolInfo(s));
                } else if (
                    symbol.symbolPath.some(
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

        // adjust column for source offsets
        const { column: lexerColumn } = this.sourceToTokenLocation(column, row);
        column = lexerColumn;

        for (index = 0; ; ++index) {
            token = this.tokenStream.get(index);
            //console.log(token.toString());
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
                case LPCParser.RULE_assignmentExpression:
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
                        // const info = this.getSymbolInfo(symbol);

                        // if (symbol instanceof MethodSymbol) {

                        //     result.push({
                        //         kind: SourceContext.getKindFromSymbol(symbol),
                        //         name: symbol.name,
                        //         source: this.fileName,
                        //         line: info.line,
                        //         definition: info.definition,
                        //         description: info.description,
                        //     });
                        // } else {
                        //     result.push({
                        //         kind: SourceContext.getKindFromSymbol(symbol),
                        //         name: symbol.name,
                        //         source: this.fileName,
                        //         definition: SourceContext.definitionForContext(
                        //             symbol.context,
                        //             true
                        //         ),
                        //         description: undefined,
                        //     });
                        // }
                    }
                });
            }
        });

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
        if (
            !this.diagnostics.some(
                (d) =>
                    d.message == diagnostic.message &&
                    d.range.start.row == diagnostic.range.start.row &&
                    d.range.start.column == diagnostic.range.start.column &&
                    d.range.end.row == diagnostic.range.end.row &&
                    d.range.end.column == diagnostic.range.end.column
            )
        ) {
            this.diagnostics.push(diagnostic);
        }
    }

    public resolveFilename(filename: string) {
        const contextInfo = this.backend.getContextEntry(this.fileName);
        const contextFullPath = contextInfo.filename;
        const contextFilename = contextFullPath.startsWith("file:")
            ? URI.parse(contextFullPath).fsPath
            : contextFullPath;
        const basePath = path.dirname(contextFilename);
        const fullImportDirs = this.importDir.map((dir) => {
            return path.isAbsolute(dir) ? dir : path.join(basePath, dir);
        });

        // figure out the search type
        let depName = filename;
        let fileType = DependencySearchType.Local;
        if (depName !== (filename = testFilename(filename, '"', '"'))) {
            fileType = DependencySearchType.Local;
        } else if (depName !== (filename = testFilename(filename, "<", ">"))) {
            fileType = DependencySearchType.Global;
        }

        const filenameNormed = normalizeFilename(filename);

        const searchPaths = [basePath, ...fullImportDirs];
        if (fileType === DependencySearchType.Global) {
            searchPaths.reverse();
        }

        if (filenameNormed.includes("/"))
            searchPaths.push(this.backend.workspaceDir);

        for (const p of searchPaths) {
            const depPath = path.join(p, filenameNormed);
            if (fs.existsSync(depPath)) {
                return {
                    filename: filenameNormed,
                    fullPath: depPath,
                    type: fileType,
                };
            }
        }

        return {
            filename: filename,
            fullPath: undefined,
            type: undefined,
        };
    }
}
