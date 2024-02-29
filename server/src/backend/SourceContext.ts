import {
    BailErrorStrategy,
    CharStreams,
    CommonTokenStream,
    DefaultErrorStrategy,
    IInterpreterData,
    ParseCancellationException,
    ParseTree,
    ParseTreeWalker,
    ParserRuleContext,
    PredictionMode,
    RuleContext,
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
} from "../parser3/LPCParser";
import * as path from "path";
import {
    IContextDetails,
    IDiagnosticEntry,
    DiagnosticType,
    ISymbolInfo,
    IDefinition,
    SymbolKind,
    LpcTypes,
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
} from "antlr4-c3";
import { DetailsListener } from "./DetailsListener";
import { BackendUtils } from "./BackendUtils";
import { LpcFacade } from "./facade";
import {
    DefineSymbol,
    EfunSymbol,
    MethodSymbol,
    IdentifierSymbol,
    IncludeSymbol,
    InheritSymbol,
    OperatorSymbol,
    VariableSymbol,
    IFoldableSymbol,
    InlineClosureSymbol,
    symbolToKindMap,
    VariableIdentifierSymbol,
    resolveOfTypeSync,
    FunctionIdentifierSymbol,
} from "./Symbol";
import { DetailsVisitor } from "./DetailsVisitor";
import { FoldingRange } from "vscode-languageserver";
import { lexRangeFromContext as lexRangeFromContext } from "../utils";

type EfunArgument = {
    name: string;
    type?: IType;
};

/**
 * Source context for a single LPC file.
 */
export class SourceContext {
    private static globalSymbols = new ContextSymbolTable("Global Symbols", {
        allowDuplicateSymbols: false,
    });

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

    // grammar parsing stuff
    private lexer: LPCLexer;
    private tokenStream: CommonTokenStream;
    private parser: LPCParser;
    private errorListener: ContextErrorListener = new ContextErrorListener(
        this.diagnostics
    );
    private lexerErrorListener: ContextLexerErrorListener =
        new ContextLexerErrorListener(this.diagnostics);

    // Grammar data.
    private grammarLexerData: IInterpreterData | undefined;
    private grammarLexerRuleMap = new Map<string, number>(); // A mapping from lexer rule names to their index.
    private grammarParserData: IInterpreterData | undefined;
    private grammarParserRuleMap = new Map<string, number>(); // A mapping from parser rule names to their index.

    private tree: ProgramContext | undefined; // The root context from the last parse run.

    public constructor(
        public backend: LpcFacade,
        public fileName: string,
        private extensionDir: string
    ) {
        this.sourceId = path.basename(fileName);
        this.symbolTable = new ContextSymbolTable(
            this.sourceId,
            { allowDuplicateSymbols: true },
            this
        );

        // Initialize static global symbol table, if not yet done.
        const sizeOfEfun = SourceContext.globalSymbols.resolveSync("sizeof");
        if (!sizeOfEfun) {
            // add built-in efuns here
            this.addEfun("abs", FundamentalType.integerType, { name: "number" });
            this.addEfun("clone_object", LpcTypes.objectType, { name: "name", type: FundamentalType.stringType });
            this.addEfun("map", LpcTypes.mixedArrayType, { name: "arg", type: LpcTypes.mixedArrayType }, { name: "func", type: FundamentalType.stringType });
            this.addEfun("sizeof", FundamentalType.integerType, { name: "val", type: LpcTypes.mixedType });
            this.addEfun("write", LpcTypes.voidType, { name: "msg", type: LpcTypes.mixedType })
        }

        this.lexer = new LPCLexer(CharStreams.fromString(""));

        // There won't be lexer errors actually. They are silently bubbled up and will cause parser errors.
        this.lexer.removeErrorListeners();
        this.lexer.addErrorListener(this.lexerErrorListener);

        this.tokenStream = new CommonTokenStream(this.lexer);

        this.parser = new LPCParser(this.tokenStream);
        this.parser.buildParseTrees = true;
        this.parser.removeErrorListeners();
        this.parser.addErrorListener(this.errorListener);
    }

    private addEfun(name: string, returnType: IType, ...args: EfunArgument[]) {
        const symb = SourceContext.globalSymbols.addNewSymbolOfType(
            EfunSymbol,
            undefined,
            name,
            returnType
        );
        args.forEach((arg) => {
            SourceContext.globalSymbols.addNewSymbolOfType(
                ParameterSymbol,
                symb,
                arg.name,
                arg.type
            );
        });
    }

    public get hasErrors(): boolean {
        for (const diagnostic of this.diagnostics) {
            if (diagnostic.type === DiagnosticType.Error) {
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
        this.lexer.inputStream = CharStreams.fromString(source);
    }

    public parse(): IContextDetails {
        // Rewind the input stream for a new parse run.
        this.lexer.reset();
        this.tokenStream.setTokenSource(this.lexer);

        this.parser.reset();
        this.parser.errorHandler = new BailErrorStrategy();
        this.parser.interpreter.predictionMode = PredictionMode.SLL;

        this.tree = undefined;

        this.info.imports.length = 0;
        this.info.objectImports.length = 0;

        this.grammarLexerData = undefined;
        this.grammarLexerRuleMap.clear();
        this.grammarParserData = undefined;
        this.grammarLexerRuleMap.clear();

        this.semanticAnalysisDone = false;
        this.diagnostics.length = 0;

        this.symbolTable.clear();
        this.symbolTable.addDependencies(SourceContext.globalSymbols);

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

        if (this.tree && this.tree.getChildCount() > 0) {
            try {
                // get into about the lpc program here, if needed
            } catch (e) {
                // ignored
            }
        }

        this.symbolTable.tree = this.tree;
        // const listener = new DetailsListener(
        //     this.backend,
        //     this.symbolTable,
        //     this.info.imports,
        //     this.info.objectImports
        // );
        // ParseTreeWalker.DEFAULT.walk(listener, this.tree);

        const visitor = new DetailsVisitor(
            this.backend,
            this.symbolTable,
            this.info.imports,
            this.info.objectImports
        );
        this.tree.accept(visitor);

        //this.info.unreferencedRules = this.symbolTable.getUnreferencedSymbols();

        return this.info;
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

    private runSemanticAnalysisIfNeeded() {
        if (!this.semanticAnalysisDone && this.tree) {
            this.semanticAnalysisDone = true;

            const semanticListener = new SemanticListener(
                this.diagnostics,
                this.symbolTable
            );
            ParseTreeWalker.DEFAULT.walk(semanticListener, this.tree);
        }
    }

    public getDiagnostics(): IDiagnosticEntry[] {
        this.runSemanticAnalysisIfNeeded();

        return this.diagnostics;
    }

    public listTopLevelSymbols(includeDependencies: boolean): ISymbolInfo[] {
        return this.symbolTable.listTopLevelSymbols(includeDependencies);
    }

    public static getKindFromSymbol(symbol: BaseSymbol): SymbolKind {
        return (
            symbolToKindMap.get(symbol.constructor as typeof BaseSymbol) ||
            SymbolKind.Unknown
        );
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
                let type:string,mods:string;
                if (ctx.parent instanceof PrimitiveTypeVariableDeclarationContext) {
                    type = ctx.parent.primitiveTypeSpecifier()?.getText();
                    mods = ctx.parent.variableModifier()?.map((m) => m.getText()).join(" ");
                    if (!!ctx.STAR() && !!type) type += " *";
                } else if (ctx.parent instanceof StructVariableDeclarationContext) {
                    type = "struct";
                    mods = ctx.parent.variableModifier()?.map((m) => m.getText()).join(" ");
                }
                
                result.text = [mods,type,name].filter((s) => s.length > 0).join(" ");                
            }
            
            result.range = lexRangeFromContext(ctx);            
            
            if (!result.text) {
            const inputStream = ctx.start?.tokenSource?.inputStream;
            if (inputStream) {
                try {
                    result.text = inputStream.getText(start, stop);
                } catch (e) {
                    // The method getText uses an unreliable JS String API which can throw on larger texts.
                    // In this case we cannot return the text of the given context.
                    // A context with such a large size is probably an error case anyway (unfinished multi line comment
                    // or unfinished action).
                }
            }}
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

    public symbolAtPosition(
        column: number,
        row: number,
        limitToChildren: boolean
    ): ISymbolInfo | undefined {
        if (!this.tree) {
            return undefined;
        }

        const terminal = BackendUtils.parseTreeFromPosition(
            this.tree,
            column,
            row
        );
        if (!terminal || !(terminal instanceof TerminalNode)) {
            return undefined;
        }

        // If limitToChildren is set we only want to show info for symbols in specific contexts.
        // These are contexts which are used as subrules in rule definitions.
        if (!limitToChildren) {
            return this.getSymbolInfo(terminal.getText());
        }

        let parent = terminal.parent as RuleContext;
        
        switch (parent.ruleIndex) {        
            case LPCParser.RULE_assignmentExpression:
            case LPCParser.RULE_primaryExpression:
            case LPCParser.RULE_primaryExpressionStart:
            case LPCParser.RULE_callOtherTarget:
                let symbol = this.symbolTable.symbolContainingContext(terminal);            
                const name = terminal.getText();    
                const searchScope=symbol.getParentOfType(ScopedSymbol);
                
                if (symbol instanceof VariableIdentifierSymbol) {
                    symbol = resolveOfTypeSync(searchScope, name, VariableSymbol);
                    symbol ??= resolveOfTypeSync(searchScope, name, DefineSymbol);                    
                } else if (symbol instanceof FunctionIdentifierSymbol) {
                    symbol = resolveOfTypeSync(this.symbolTable, name, MethodSymbol);
                    symbol ??= resolveOfTypeSync(this.symbolTable, name, EfunSymbol);
                } else {
                    symbol = searchScope.resolveSync(symbol.name, false);
                }

                if (!!symbol) {
                    return this.getSymbolInfo(symbol);
                }

                break;

            default: {
                break;
            }
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
        //core.showResult = false;
        core.ignoredTokens = new Set([
            LPCLexer.PAREN_CLOSE,
            LPCLexer.PAREN_OPEN,
            LPCLexer.StringLiteral,
            LPCLexer.IntegerConstant,
            LPCLexer.FloatingConstant,
            LPCLexer.WS,
            LPCLexer.LT,
            LPCLexer.GT,
            LPCLexer.SEMI,
            LPCLexer.CURLY_OPEN,
            LPCLexer.CURLY_CLOSE,
            Token.EOF,
        ]);

        core.preferredRules = new Set([
            LPCParser.RULE_primaryExpressionStart,
            LPCParser.RULE_variableDeclaration,
            LPCParser.RULE_statement,
            LPCParser.RULE_assignmentExpression,
            //LPCParser.RULE_functionDeclaration,
        ]);

        // Search the token index which covers our caret position.
        let index: number;
        this.tokenStream.fill();
        let token: Token;
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

        const candidates = core.collectCandidates(index);
        const result: ISymbolInfo[] = [];
        candidates.tokens.forEach((following: number[], type: number) => {
            switch (type) {
                case LPCLexer.ARROW: {
                    result.push({
                        kind: SymbolKind.Operator,
                        name: "->",
                        description: "Call other",
                        source: this.fileName,
                    });

                    break;
                }
                case LPCLexer.ARRAY_OPEN: {
                    result.push({
                        kind: SymbolKind.Operator,
                        name: "({ val })",
                        description: "Array initializer",
                        source: this.fileName,
                    });

                    break;
                }
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
                    const value =
                        this.parser?.vocabulary.getDisplayName(type) ?? "";
                    result.push({
                        kind: SymbolKind.Keyword,
                        name:
                            value[0] === "'"
                                ? value.substring(1, value.length - 1)
                                : value, // Remove quotes.
                        source: this.fileName,
                    });

                    break;
                }
            }
        });

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
                    // Lexer rules.
                    promises.push(
                        SourceContext.globalSymbols.getAllSymbols(EfunSymbol)
                        //this.symbolTable.getAllSymbols(EfunSymbol, true)
                    );
                    promises.push(
                        this.symbolTable.getAllSymbols(VariableSymbol)
                    );
                    promises.push(this.symbolTable.getAllSymbols(MethodSymbol));

                    break;
                case LPCParser.RULE_assignmentExpression:
                    promises.push(
                        this.symbolTable.getAllSymbols(VariableSymbol)
                    );
                    break;
                case LPCParser.RULE_functionDeclaration:
                    result.push({
                        kind: SymbolKind.Method,
                        name: "modifiers type functionName(parameters) { code }",
                        source: this.fileName,
                        definition: undefined,
                        description: undefined,
                    });

                    break;

                case LPCParser.RULE_variableDeclaration:
                    result.push({
                        kind: SymbolKind.Variable,
                        name: "modifiers type variableName = value",
                        source: this.fileName,
                    });

                    break;

                default:
                    break;
            }
        });

        const symbolLists = await Promise.all(promises);
        symbolLists.forEach((symbols) => {
            if (symbols) {
                symbols.forEach((symbol) => {
                    if (symbol.name !== "EOF") {
                        result.push({
                            kind: SourceContext.getKindFromSymbol(symbol),
                            name: symbol.name,
                            source: this.fileName,
                            definition: SourceContext.definitionForContext(
                                symbol.context,
                                true
                            ),
                            description: undefined,
                        });
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
}
