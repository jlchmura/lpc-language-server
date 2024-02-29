import {
    BaseSymbol,
    FundamentalType,
    IType,
    ParameterSymbol,
    SymbolConstructor,
} from "antlr4-c3";
import { LPCParserListener } from "../parser3/LPCParserListener";
import {
    BlockSymbol,
    IdentifierSymbol,
    IncludeSymbol,
    InheritSymbol,
    ObjectSymbol,
    ObjectType,
    OperatorSymbol,
} from "../symbols/Symbol";
import {
    ArrayExpressionContext,
    BlockContext,
    CloneObjectExpressionContext,
    ExpressionContext,
    FunctionDeclarationContext,
    IdentifierExpressionContext,
    IncludeDefineContext,
    IncludeDirectiveContext,
    InheritStatementContext,
    LiteralContext,
    LiteralExpressionContext,
    MappingEmptyInitializerContext,
    MappingValueInitializerContext,
    PrimaryExpressionContext,
    PrimitiveTypeParameterExpressionContext,
    VariableDeclaratorContext,
} from "../parser3/LPCParser";
import { ParseTree, TerminalNode } from "antlr4ng";
import { LPCLexer } from "../parser3/LPCLexer";
import { LpcFacade } from "./facade";
import { ContextSymbolTable } from "./ContextSymbolTable";
import { VariableSymbol } from "../symbols/variableSymbol";
import { AssignmentSymbol } from "../symbols/assignmentSymbol";
import { MethodSymbol } from "../symbols/methodSymbol";
import { LiteralSymbol } from "../symbols/literalSymbol";

export class DetailsListener extends LPCParserListener {
    private symbolStack: BaseSymbol[] = [];

    public constructor(
        private backend: LpcFacade,
        private symbolTable: ContextSymbolTable,
        private imports: string[],
        private objectImports: string[]
    ) {
        super();
    }

    public get methodName(): string {
        return this.symbolStack.length === 0 ? "" : this.symbolStack[0].name;
    }

    enterFunctionDeclaration = (ctx: FunctionDeclarationContext): void => {
        const symb = this.pushNewSymbol(
            MethodSymbol,
            ctx,
            ctx.functionHeader()._functionName.text
        );

        // store this method in the symbol table lookup
        this.symbolTable.addFunction(symb as MethodSymbol);

        const prms = ctx.functionHeader()?.parameterList()?.parameter();
        if (!!prms) {
            prms.forEach((p) => {
                const name = (p as PrimitiveTypeParameterExpressionContext)
                    ._paramName.text;
                this.addNewSymbol(ParameterSymbol, p, name);
            });
        }
    };
    exitFunctionDeclaration = (ctx: FunctionDeclarationContext): void => {
        this.popSymbol();
    };

    enterVariableDeclarator = (ctx: VariableDeclaratorContext) => {
        const varName = ctx._variableName;
        if (!varName) return;

        const s = this.addNewSymbol(VariableSymbol, ctx, varName.text);
        if (!!ctx.ASSIGN()) {
            const initCtx = ctx.variableInitializer();
            const exp =
                initCtx.expression() ||
                initCtx.arrayExpression() ||
                initCtx.mappingExpression();
            const sym = this.addNewSymbol(
                AssignmentSymbol,
                initCtx,
                varName.text,
                ctx
            );
        }
    };

    exitVariableDeclarator = (ctx: VariableDeclaratorContext) => {
        if (!!ctx.ASSIGN()) {
            const assignCtx = ctx.variableInitializer();
            const assignSym = this.symbolTable.symbolWithContextSync(
                assignCtx
            ) as AssignmentSymbol;

            const lhCtx = ctx;
            const lhSym = this.symbolTable.symbolWithContextSync(
                lhCtx
            ) as VariableSymbol;

            const rhCtx =
                assignCtx.expression() ||
                assignCtx.arrayExpression() ||
                assignCtx.mappingExpression();
            const rhSym = this.symbolTable.symbolWithContextSync(rhCtx);

            // assignSym.lhs = lhSym;
            // assignSym.rhs = rhSym;

            const i = 0;
        }
    };

    enterBlock = (ctx: BlockContext) => {
        this.pushNewSymbol(BlockSymbol, ctx, "#block#");
    };
    exitBlock = (ctx: BlockContext) => {
        this.popSymbol();
    };

    enterExpression = (ctx: ExpressionContext) => {
        this.pushNewSymbol(BlockSymbol, ctx, "#expression#");
    };
    exitExpression = (ctx: ExpressionContext) => {
        this.popSymbol();
    };
    exitArrayExpression = (ctx: ArrayExpressionContext) => {
        this.addNewSymbol(BlockSymbol, ctx);
    };
    exitMappingValueInitializer = (ctx: MappingValueInitializerContext) => {
        this.addNewSymbol(BlockSymbol, ctx);
    };
    exitMappingEmptyInitializer = (ctx: MappingEmptyInitializerContext) => {
        this.addNewSymbol(BlockSymbol, ctx);
    };

    enterLiteral = (ctx: LiteralContext) => {
        let type: IType;
        if (!!ctx.IntegerConstant()) {
            type = FundamentalType.integerType;
        } else if (!!ctx.StringLiteral()) {
            type = FundamentalType.stringType;
        } else if (!!ctx.FloatingConstant()) {
            type = FundamentalType.floatType;
        }
        this.addNewSymbol(LiteralSymbol, ctx, "", ctx.getText(), type);
    };

    /**
     * literal inside an expression
     * @param ctx
     */
    enterLiteralExpression = (ctx: LiteralExpressionContext) => {
        const lCtx = ctx.literal();
        let type: IType;
        if (!!lCtx.IntegerConstant()) {
            type = FundamentalType.integerType;
        } else if (!!lCtx.StringLiteral()) {
            type = FundamentalType.stringType;
        } else if (!!lCtx.FloatingConstant()) {
            type = FundamentalType.floatType;
        }
        this.addNewSymbol(LiteralSymbol, lCtx, "", lCtx.getText(), type);
    };

    enterIncludeDefine?: (ctx: IncludeDefineContext) => void;

    // exitAssignmentExpression = (ctx: AssignmentExpressionContext) => {
    //     this.popSymbol();
    // }

    // enterVariableDeclarator= (ctx: VariableDeclaratorContext) => {

    //     if (!!ctx.ASSIGN()) {
    //         const initCtx = ctx.variableInitializer();
    //         const sym = this.pushNewSymbol(AssignmentSymbol, initCtx, ctx._variableName.text);
    //     }
    //     debugger;
    // };

    // exitVariableDeclarator= (ctx: VariableDeclaratorContext) => {
    //     if (!!ctx.ASSIGN()) {
    //         this.popSymbol();
    //     }
    // };

    enterCloneObjectExpression = (ctx: CloneObjectExpressionContext) => {
        const exp = ctx.parent as PrimaryExpressionContext;
        // TODO evaluate filename if not a string
        const firstArg = ctx._ob;
        const filename = firstArg.getText();
        // create the symbol
        const symbol = this.pushNewSymbol(
            ObjectSymbol,
            ctx,
            `clone_object("${filename}")`,
            filename,
            new ObjectType(filename)
        ) as ObjectSymbol;

        this.objectImports.push(filename);

        const i = 0;
    };
    exitCloneObjectExpression = (ctx: CloneObjectExpressionContext) => {
        this.popSymbol();
    };

    // enterCallOtherTarget = (ctx: CallOtherTargetContext) => {
    //     const priStart = ctx.parent as PrimaryExpressionContext;
    //     const id = ctx.Identifier();
    //     const methodArgs = priStart.methodInvocation();
    //     this.pushNewSymbol(FunctionCallSymbol, ctx, id.getText());
    // };
    // exitCallOtherTarget = (ctx: CallOtherTargetContext) => {
    //     this.popSymbol();
    // };

    // enterMethodInvocation = (ctx: MethodInvocationContext) => {
    //     const methodTarget = this.currentSymbol() as FunctionCallSymbol;

    //     const argList = ctx.argumentList()?.argument();
    //     // argList.forEach((a) => {
    //     //     const exp = a.expression();

    //     //     const argSym = this.symbolTable.addNewSymbolOfType(
    //     //         ArgumentSymbol,
    //     //         methodTarget,
    //     //         a.getText()
    //     //     );
    //     // });
    // };

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

    enterIdentifierExpression = (ctx: IdentifierExpressionContext) => {
        this.addNewSymbol(IdentifierSymbol, ctx, ctx.getText());
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
            // case LPCLexer.Identifier:
            //     this.addNewSymbol(IdentifierSymbol, node, node.getText());
            //     break;
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
