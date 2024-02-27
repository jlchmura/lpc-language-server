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
} from "antlr4ng";
import { LPCLexer } from "../parser3/LPCLexer";
import { LPCParser, ProgramContext } from "../parser3/LPCParser";
import * as path from "path";
import {
    IContextDetails,
    IDiagnosticEntry,
    DiagnosticType,
    ISymbolInfo,
    IDefinition,
    SymbolKind,
} from "../types";
import { ContextErrorListener } from "./ContextErrorListener";
import { ContextLexerErrorListener } from "./ContextLexerErrorListener";
import {
    ContextSymbolTable,
    DefineSymbol,
    IncludeSymbol,
    InheritSymbol,
    MethodSymbol,
    VariableSymbol,
} from "./ContextSymbolTable";
import { SemanticListener } from "./SemanticListener";
import { BaseSymbol } from "antlr4-c3";
import { DetailsListener } from "./DetailsListener";
import { BackendUtils } from "./BackendUtils";

/**
 * Source context for a single LPC file.
 */
export class SourceContext {
    private static globalSymbols = new ContextSymbolTable("Global Symbols", {
        allowDuplicateSymbols: false,
    });
    private static symbolToKindMap: Map<new () => BaseSymbol, SymbolKind> =
        new Map([
            [IncludeSymbol, SymbolKind.Include],
            [InheritSymbol, SymbolKind.Inherit],
            [MethodSymbol, SymbolKind.Method],
            [DefineSymbol, SymbolKind.Define],
            [VariableSymbol, SymbolKind.Variable],
        ]);

    public symbolTable: ContextSymbolTable;
    public sourceId: string;
    public info: IContextDetails = {
        unreferencedMethods: [],
        imports: [],
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

    public constructor(public fileName: string, private extensionDir: string) {
        this.sourceId = path.basename(fileName, path.extname(fileName));
        this.symbolTable = new ContextSymbolTable(
            this.sourceId,
            { allowDuplicateSymbols: true },
            this
        );

        // // Initialize static global symbol table, if not yet done.
        // const eof = SourceContext.globalSymbols.resolveSync("EOF");
        // if (!eof) {
        //     SourceContext.globalSymbols.addNewSymbolOfType(BuiltInChannelSymbol, undefined,
        //         "DEFAULT_TOKEN_CHANNEL");
        //     SourceContext.globalSymbols.addNewSymbolOfType(BuiltInChannelSymbol, undefined, "HIDDEN");
        //     SourceContext.globalSymbols.addNewSymbolOfType(BuiltInTokenSymbol, undefined, "EOF");
        //     SourceContext.globalSymbols.addNewSymbolOfType(BuiltInModeSymbol, undefined, "DEFAULT_MODE");
        // }

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

    public parse(): string[] {
        // Rewind the input stream for a new parse run.
        this.lexer.reset();
        this.tokenStream.setTokenSource(this.lexer);

        this.parser.reset();
        this.parser.errorHandler = new BailErrorStrategy();
        this.parser.interpreter.predictionMode = PredictionMode.SLL;

        this.tree = undefined;

        this.info.imports.length = 0;

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
        const listener = new DetailsListener(
            this.symbolTable,
            this.info.imports
        );
        ParseTreeWalker.DEFAULT.walk(listener, this.tree);

        //this.info.unreferencedRules = this.symbolTable.getUnreferencedSymbols();

        return this.info.imports;
    }

    /**
     * Add this context to the list of referencing contexts in the given context.
     *
     * @param context The context to add.
     */
    public addAsReferenceTo(context: SourceContext): void {
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

        this.symbolTable.addDependencies(context.symbolTable);
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
            this.symbolToKindMap.get(symbol.constructor as typeof BaseSymbol) ||
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
        if (!ctx) {
            return undefined;
        }

        const result: IDefinition = {
            text: "",
            range: {
                start: { column: 0, row: 0 },
                end: { column: 0, row: 0 },
            },
        };

        if (ctx instanceof ParserRuleContext) {
            let start = ctx.start!.start;
            let stop = ctx.stop!.stop;

            result.range.start.column = ctx.start!.column;
            result.range.start.row = ctx.start!.line;
            result.range.end.column = ctx.stop!.column;
            result.range.end.row = ctx.stop!.line;

            // For mode definitions we only need the init line, not all the lexer rules following it.
            // if (ctx.ruleIndex === LPCParser.RULE_functionDeclaration) {
            //     const funSpec = ctx as FunctionDeclarationContext;
            //     const endSym = funSpec.block().CURLY_OPEN().symbol;
            //     stop = endSym.stop;
            //     result.range.end.column = endSym.column;
            //     result.range.end.row = endSym.line;
            // }

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
        // if (parent.ruleIndex === LPCParser.RULE_primaryExpressionStart) {
        //     parent = (parent.parent as RuleContext);
        // }

        switch (parent.ruleIndex) {
            // case ANTLRv4Parser.RULE_ruleref:
            // case ANTLRv4Parser.RULE_terminalDef: {
            //     let symbol = this.symbolTable.symbolContainingContext(terminal);
            //     if (symbol) {
            //         // This is only the reference to a symbol. See if that symbol exists actually.
            //         symbol = this.resolveSymbol(symbol.name);
            //         if (symbol) {
            //             return this.getSymbolInfo(symbol);
            //         }
            //     }

            //     break;
            // }

            case LPCParser.RULE_primaryExpression:
            case LPCParser.RULE_primaryExpressionStart:
            case LPCParser.RULE_callOtherTarget:
                const s1 = this.symbolTable.symbolContainingContext(terminal);

                const symbol = this.symbolTable.findSymbolDefinition(terminal);

                if (symbol) {
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
}
