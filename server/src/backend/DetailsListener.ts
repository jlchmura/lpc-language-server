import { BaseSymbol, SymbolConstructor } from "antlr4-c3";
import { LPCParserListener } from "../parser3/LPCParserListener";
import {
    ContextSymbolTable,
    IncludeSymbol,
    InheritSymbol,
    MethodSymbol,
    OperatorSymbol,
    VariableSymbol,
} from "./ContextSymbolTable";
import {
    FunctionDeclarationContext,
    IncludeDirectiveContext,
    InheritStatementContext,
    PrimitiveTypeVariableDeclarationContext,
} from "../parser3/LPCParser";
import { ParseTree, TerminalNode } from "antlr4ng";
import { LPCLexer } from "../parser3/LPCLexer";

export class DetailsListener extends LPCParserListener {
    private symbolStack: BaseSymbol[] = [];

    public constructor(
        private symbolTable: ContextSymbolTable,
        private imports: string[]
    ) {
        super();
    }

    public get methodName(): string {
        return this.symbolStack.length === 0 ? "" : this.symbolStack[0].name;
    }

    enterFunctionDeclaration = (ctx: FunctionDeclarationContext): void => {
        this.pushNewSymbol(
            MethodSymbol,
            ctx,
            ctx.functionHeader()._functionName.text
        );
    };
    exitFunctionDeclaration = (ctx: FunctionDeclarationContext): void => {
        this.popSymbol();
    };

    exitPrimitiveTypeVariableDeclaration = (
        ctx: PrimitiveTypeVariableDeclarationContext
    ) => {
        let decs = ctx.variableDeclarator();

        decs.forEach((d) => {
            const s = this.addNewSymbol(
                VariableSymbol,
                ctx,
                d._variableName.text
            );
        });
    };

    exitIncludeDirective = (ctx: IncludeDirectiveContext) => {
        const filename = ctx.directiveIncludeFile().getText();
        this.addNewSymbol(IncludeSymbol, ctx, filename);
        this.imports.push(filename);
    };

    exitInheritStatement = (ctx: InheritStatementContext) => {
        const filename = ctx._inheritTarget!.text;
        this.addNewSymbol(InheritSymbol, ctx, filename);
        this.imports.push(filename);
    };

    public override visitTerminal = (node: TerminalNode): void => {
        // Ignore individual terminals under certain circumstances.
        // if (this.currentSymbol() instanceof LexerCommandSymbol) {
        //     return;
        // }

        switch (node.symbol.type) {
            case LPCLexer.PLUS:
            case LPCLexer.MINUS:
            case LPCLexer.STAR:
            case LPCLexer.DIV:
            case LPCLexer.MOD:
            case LPCLexer.SHL:
            case LPCLexer.SHR:
            case LPCLexer.AND:
            case LPCLexer.OR:
            case LPCLexer.XOR:
            case LPCLexer.NOT:
            case LPCLexer.INC:
            case LPCLexer.DEC:
                this.addNewSymbol(OperatorSymbol, node, node.getText());
                break;
            default: {
                // Ignore the rest.
                break;
            }
        }
    };

    private currentSymbol<T extends BaseSymbol>(): T | undefined {
        if (this.symbolStack.length === 0) {
            return undefined;
        }

        return this.symbolStack[this.symbolStack.length - 1] as T;
    }

    /**
     * Adds a new symbol to the current symbol TOS.
     *
     * @param type The type of the symbol to add.
     * @param context The symbol's parse tree, to allow locating it.
     * @param args The actual arguments for the new symbol.
     *
     * @returns The new symbol.
     */
    private addNewSymbol<T extends BaseSymbol>(
        type: new (...args: any[]) => T,
        context: ParseTree,
        ...args: any[]
    ): T {
        const symbol = this.symbolTable.addNewSymbolOfType(
            type,
            this.currentSymbol(),
            ...args
        );
        symbol.context = context;

        return symbol;
    }

    /**
     * Creates a new symbol and starts a new scope with it on the symbol stack.
     *
     * @param type The type of the symbol to add.
     * @param context The symbol's parse tree, to allow locating it.
     * @param args The actual arguments for the new symbol.
     *
     * @returns The new scoped symbol.
     */
    private pushNewSymbol<T extends BaseSymbol, Args extends unknown[]>(
        type: SymbolConstructor<T, Args>,
        context: ParseTree,
        ...args: Args
    ): BaseSymbol {
        const symbol = this.symbolTable.addNewSymbolOfType<T, Args>(
            type,
            this.currentSymbol(),
            ...args
        );
        symbol.context = context;
        this.symbolStack.push(symbol);

        return symbol;
    }

    private popSymbol(): BaseSymbol | undefined {
        return this.symbolStack.pop();
    }
}
