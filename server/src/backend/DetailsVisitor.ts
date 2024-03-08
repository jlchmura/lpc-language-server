import * as commentParser from "comment-parser";
import {
    AbstractParseTreeVisitor,
    ParseTree,
    ParserRuleContext,
    TerminalNode,
} from "antlr4ng";
import { LPCParserVisitor } from "../parser3/LPCParserVisitor";
import {
    ArrayType,
    BaseSymbol,
    FundamentalType,
    IType,
    ReferenceKind,
    ScopedSymbol,
    SymbolTable,
    SymbolConstructor,
} from "antlr4-c3";
import { ContextSymbolTable } from "./ContextSymbolTable";
import { LpcFacade } from "./facade";
import {
    AdditiveExpressionContext,
    AndExpressionContext,
    AssignmentExpressionContext,
    CallOtherTargetContext,
    CloneObjectExpressionContext,
    ConditionalAndExpressionContext,
    ConditionalExpressionContext,
    ConditionalOrExpressionContext,
    DefinePreprocessorDirectiveContext,
    EqualityExpressionContext,
    ExclusiveOrExpressionContext,
    ExpressionContext,
    FunctionDeclarationContext,
    FunctionHeaderDeclarationContext,
    IdentifierExpressionContext,
    IfStatementContext,
    IncludeDirectiveContext,
    InclusiveOrExpressionContext,
    InheritStatementContext,
    InlineClosureExpressionContext,
    LiteralContext,
    MethodInvocationContext,
    MultiplicativeExpressionContext,
    ParameterListContext,
    PrimaryExpressionContext,
    PrimitiveTypeParameterExpressionContext,
    PrimitiveTypeVariableDeclarationContext,
    RelationalExpresionContext,
    ReturnStatementContext,
    SelectionDirectiveContext,
} from "../parser3/LPCParser";
import {
    IdentifierSymbol,
    InheritSymbol,
    PreprocessorSymbol,
} from "../symbols/Symbol";
import { FoldingRange } from "vscode-languageserver";
import { ContextImportInfo, typeNameToIType } from "../types";
import { LPCLexer } from "../parser3/LPCLexer";
import {
    VariableIdentifierSymbol,
    VariableInitializerSymbol,
    VariableSymbol,
} from "../symbols/variableSymbol";
import { DefineSymbol } from "../symbols/defineSymbol";
import { AssignmentSymbol } from "../symbols/assignmentSymbol";
import { InlineClosureSymbol } from "../symbols/closureSymbol";
import {
    FunctionIdentifierSymbol,
    MethodDeclarationSymbol,
    MethodInvocationSymbol,
    MethodParameterSymbol,
    MethodSymbol,
    ReturnSymbol,
} from "../symbols/methodSymbol";
import { ExpressionSymbol } from "../symbols/expressionSymbol";
import {
    firstEntry,
    lastEntry,
    lexRangeFromContext,
    lexRangeFromToken,
    normalizeFilename,
    trimQuotes,
} from "../utils";
import { LiteralSymbol } from "../symbols/literalSymbol";
import { OperatorSymbol } from "../symbols/operatorSymbol";
import { ConditionalSymbol } from "../symbols/conditionalSymbol";
import { CallOtherSymbol, CloneObjectSymbol } from "../symbols/objectSymbol";
import { IncludeSymbol } from "../symbols/includeSymbol";
import { IfSymbol, SelectionSymbol } from "../symbols/selectionSymbol";
import { IEvaluatableSymbol, IRenameableSymbol } from "../symbols/base";

const COMMENT_CHANNEL_NUM = 2;

export class DetailsVisitor
    extends AbstractParseTreeVisitor<ScopedSymbol>
    implements LPCParserVisitor<ScopedSymbol>
{
    protected scope = this.symbolTable as ScopedSymbol;

    constructor(
        private backend: LpcFacade,
        private symbolTable: ContextSymbolTable,
        private imports: ContextImportInfo[],
        private objectImports: string[]
    ) {
        super();
    }

    visitDefinePreprocessorDirective = (
        ctx: DefinePreprocessorDirectiveContext
    ) => {
        const tokenIdx = ctx.start.tokenIndex;
        const defineStr = ctx.END_DEFINE()?.getText()?.trim();

        // trim everything after the first space
        let idx = defineStr.indexOf(" ");
        if (idx < 0) idx = defineStr.indexOf("\t");
        const label = idx > 0 ? defineStr.substring(0, idx) : defineStr;
        const value = defineStr.substring(idx + 1);

        //this.scope.context = ctx; // store the context for later
        const sym = this.symbolTable.addNewSymbolOfType(
            DefineSymbol,
            this.scope,
            label,
            value
        );
        sym.context = ctx;
        return this.visitChildren(ctx);
    };

    visitSelectionDirective = (ctx: SelectionDirectiveContext) => {
        const tokenIdx = ctx.start.tokenIndex;
        const label =
            ctx.selectionDirectiveTypeSingle()?.getText() ||
            ctx.selectionDirectiveTypeWithArg()?.getText();
        const name = label + "_" + tokenIdx;

        if (!!name) {
            return this.withScope(ctx, PreprocessorSymbol, [name, label], () =>
                this.visitChildren(ctx)
            );
        } else {
            return this.visitChildren(ctx);
        }
    };

    visitPrimaryExpression = (ctx: PrimaryExpressionContext) => {
        // TODO: special handling for bracket expressions here?

        if (ctx.ARROW().length > 0) {
            // if there is an arrow, then this is a call_other expression
            return this.withScope(
                ctx,
                CallOtherSymbol,
                ["#call-other#"],
                (callOther) => {
                    // first find the arrow because there can be multiple expressions before it
                    const arrowIdx = ctx.children.findIndex(
                        (c) => c.getText() === "->"
                    );

                    // everything up to the arrow goes into an expression
                    const exprCtx = ctx.children.slice(0, arrowIdx);

                    if (exprCtx.length > 1) {
                        // parse children into an expression
                        this.withScope(
                            ctx,
                            ExpressionSymbol,
                            ["#primary-expression#"],
                            (s) => {
                                exprCtx.forEach((c) => this.visit(c));
                            }
                        );
                    } else if (exprCtx.length === 1) {
                        // if there's only one child, then just visit it
                        // and the first child becomes the source Object
                        this.visit(exprCtx[0]);
                    } else {
                        // this shoudn't happen
                        throw new Error("Invalid call_other expression");
                    }

                    // we should end up with one child, which is the source object
                    callOther.sourceObject =
                        callOther.lastChild as IEvaluatableSymbol;

                    // after the arrow we should have a call other target and a method invocation
                    // but those may be missing if the user is typing and the code is incomplete
                    const callOtherTargetCtx = ctx._target;
                    const methodInvocationCtx = ctx._invocation;

                    if (!!callOtherTargetCtx) {
                        this.visit(callOtherTargetCtx);
                        callOther.target =
                            callOther.lastChild as IEvaluatableSymbol;
                        callOther.functionName = callOther.target?.name;
                    }
                    if (!!methodInvocationCtx) {
                        this.visitMethodInvocation(methodInvocationCtx);
                        callOther.methodInvocation =
                            callOther.lastChild as MethodInvocationSymbol;
                    }

                    return callOther;
                }
            );
        } else {
            // standard expression
            return this.withScope(
                ctx,
                ExpressionSymbol,
                ["#primary-expression#"],
                (s) => {
                    return this.visitChildren(ctx);
                }
            );
        }
    };

    visitCallOtherTarget = (ctx: CallOtherTargetContext) => {
        // the call other target can be an identifier, a string literal, or an expression
        if (ctx.Identifier()) {
            const fid = this.addNewSymbol(
                FunctionIdentifierSymbol,
                ctx,
                ctx.Identifier().getText()
            );
            fid.nameRange = lexRangeFromToken(ctx.Identifier().symbol);
        } else if (ctx.expression()) {
            return this.visitExpression(ctx.expression());
        } else {
            // probably a string literal, which has its own visitor
            return this.visitChildren(ctx);
        }
    };

    visitMethodInvocation = (ctx: MethodInvocationContext) => {
        return this.withScope(
            ctx,
            MethodInvocationSymbol,
            ["#method-invocation#"],
            (s) => {
                return this.visitChildren(ctx);
            }
        );
    };

    visitIdentifierExpression = (ctx: IdentifierExpressionContext) => {
        const priExp = ctx.parent as unknown as PrimaryExpressionContext;
        const isVar = priExp.methodInvocation().length === 0; // if its not a method invocation, then its a variable reference
        const parentSymbol = this.scope;
        const name = ctx.Identifier().getText();

        let symbolType: SymbolConstructor<BaseSymbol, unknown[]>;

        if (priExp.ARROW()?.length > 0) {
            // if there's an arrow then its a variable
            symbolType = VariableIdentifierSymbol;
        } else if (priExp.methodInvocation().length > 0) {
            // method invocation means its a function
            symbolType = FunctionIdentifierSymbol;
        } else {
            // otherwise its a variable
            symbolType = VariableIdentifierSymbol;
        }

        const newSym = this.addNewSymbol(symbolType, ctx, `${name}`);
        (newSym as IRenameableSymbol).nameRange = lexRangeFromToken(
            ctx.Identifier().getSymbol()
        );
        return undefined;
    };

    /**
     * this handles clone_object and load_object
     * @param ctx
     * @returns
     */
    visitCloneObjectExpression = (ctx: CloneObjectExpressionContext) => {
        let name = "#clone-object#";
        if (ctx.LoadObject()) name = "#load-object#";

        return this.withScope(ctx, CloneObjectSymbol, [name], (s) => {
            return this.visitChildren(ctx);
        });
    };

    // visitCallOtherTarget = (ctx: CallOtherTargetContext) => {
    //     //     return this.visitChildren(ctx);
    //     // };
    //     const nm = ctx.Identifier();
    //     return this.withScope(
    //         ctx,
    //         CallOtherSymbol,
    //         ["#call-other-target#", nm?.getText()],
    //         (s) => {
    //             return this.visitChildren(ctx);
    //         }
    //     );
    // };

    visitPrimitiveTypeVariableDeclaration = (
        ctx: PrimitiveTypeVariableDeclarationContext
    ) => {
        // ctx will either be scalar or array, it doesn't matter right now

        let tt = ctx.primitiveTypeSpecifier()?.getText();
        let varType: IType;
        if (tt) {
            const isArray = tt.endsWith("*");
            if (isArray) {
                tt = tt.substring(0, tt.length - 1);
            }
            switch (tt) {
                case "int":
                    varType = FundamentalType.integerType;
                    break;
                case "string":
                    varType = FundamentalType.stringType;
                    break;
                case "float":
                    varType = FundamentalType.floatType;
                    break;
            }

            if (isArray) {
                varType = new ArrayType(
                    tt + "*",
                    ReferenceKind.Pointer,
                    varType
                );
            }
        }

        const varDecls = ctx.variableDeclarator();
        varDecls.forEach((varDecl) => {
            const nm = varDecl._variableName?.text;
            const varSym = this.addNewSymbol(
                VariableSymbol,
                varDecl.Identifier(),
                nm,
                varType
            );

            const initCtx = varDecl.variableInitializer();
            if (!!initCtx) {
                return this.withScope(
                    initCtx,
                    VariableInitializerSymbol,
                    ["#initializer#" + nm, varSym],
                    (s) => {
                        return this.visitChildren(initCtx);
                    }
                );
            }
        });

        return undefined;
    };

    visitIncludeDirective = (ctx: IncludeDirectiveContext) => {
        let filename = ctx.directiveIncludeFile().getText();

        const symbol = this.addNewSymbol(IncludeSymbol, ctx, filename);
        this.imports.push({ filename, symbol });

        return undefined;
    };

    visitInheritStatement = (ctx: InheritStatementContext) => {
        let filename = ctx._inheritTarget!.text;

        const symbol = this.addNewSymbol(InheritSymbol, ctx, filename);
        this.imports.push({ filename, symbol });

        return undefined;
    };

    visitInlineClosureExpression = (ctx: InlineClosureExpressionContext) => {
        let parent = ctx.parent;
        let name: string | undefined = undefined;
        while (!name && !!parent) {
            const parentIdCtx =
                parent as unknown as IdentifierExpressionContext;
            if (!!parentIdCtx) {
                name = parentIdCtx.getText && parentIdCtx.getText();
            }

            if (!name) {
                parent = parent.parent;
            }
        }

        return this.withScope(
            ctx,
            InlineClosureSymbol,
            ["(: :) Inline closure"],
            (s) => {
                s.foldingRange = FoldingRange.create(
                    ctx.start.line - 1,
                    ctx.stop.line - 2,
                    ctx.start.column,
                    ctx.stop.column
                );
                return this.visitChildren(ctx);
            }
        );
    };

    visitIfStatement = (ctx: IfStatementContext) => {
        const tokenIdx = ctx.start.tokenIndex;
        const name = "if_" + tokenIdx;

        const ifSymTbl = this.withScope(ctx, IfSymbol, [name], () => {
            const ifSym = this.scope as IfSymbol;

            let i = 0;
            const ifExpCtx = ctx.ifExpression();
            this.withScope(ifExpCtx, SelectionSymbol, ["if", "if"], (s) => {
                ifSym.if = s;
                s.foldingRange = FoldingRange.create(
                    ifExpCtx.start.line - 1,
                    ifExpCtx.stop.line - 2,
                    ifExpCtx.start.column,
                    ifExpCtx.stop.column
                );
                return this.visitChildren(ifExpCtx);
            });

            const ifElseCtx = ctx.elseIfExpression() ?? [];
            ifSym.elseIf = [];
            ifElseCtx.forEach((e) => {
                this.withScope(
                    e,
                    SelectionSymbol,
                    ["else if", "else if"],
                    (s) => {
                        ifSym.elseIf.push(s);
                        s.foldingRange = FoldingRange.create(
                            e.start.line - 1,
                            e.stop.line - 2,
                            e.start.column,
                            e.stop.column
                        );
                        return this.visitChildren(e);
                    }
                );
            });

            const elseCtx = ctx.elseExpression();
            if (!!elseCtx) {
                this.withScope(
                    elseCtx,
                    SelectionSymbol,
                    ["else", "else"],
                    (s) => {
                        ifSym.else = s;
                        s.foldingRange = FoldingRange.create(
                            elseCtx.start.line - 1,
                            elseCtx.stop.line - 2,
                            elseCtx.start.column,
                            elseCtx.stop.column
                        );
                        return this.visitChildren(elseCtx);
                    }
                );
            }

            return this.visitChildren(ctx);
        });

        return ifSymTbl;
    };

    visitFunctionHeaderDeclaration = (
        ctx: FunctionHeaderDeclarationContext
    ) => {
        const header = ctx.functionHeader();
        const nm = header._functionName.text;
        const retType = typeNameToIType.get(header.typeSpecifier()?.getText());
        const mods = new Set(
            header.functionModifier()?.map((m) => m.getText()) ?? []
        );

        return this.withScope(
            ctx,
            MethodDeclarationSymbol,
            [nm, retType, mods],
            (s) => {
                s.nameRange = lexRangeFromToken(header._functionName);
                s.doc = this.getPrefixComments(ctx);
                s.foldingRange = FoldingRange.create(
                    ctx.start.line - 1,
                    ctx.stop.line - 2,
                    ctx.start.column,
                    ctx.stop.column
                );
                return this.visitChildren(ctx);
            }
        );
    };

    visitFunctionDeclaration = (ctx: FunctionDeclarationContext) => {
        const header = ctx.functionHeader();
        const nm = header._functionName.text;
        const retType = typeNameToIType.get(header.typeSpecifier()?.getText());
        const mods = new Set(
            header.functionModifier()?.map((m) => m.getText()) ?? []
        );

        return this.withScope(ctx, MethodSymbol, [nm, retType, mods], (s) => {
            s.nameRange = lexRangeFromToken(header._functionName);
            s.doc = this.getPrefixComments(ctx);
            s.foldingRange = FoldingRange.create(
                ctx.start.line - 1,
                ctx.stop.line - 2,
                ctx.start.column,
                ctx.stop.column
            );
            this.symbolTable.addFunction(s);
            return this.visitChildren(ctx);
        });
    };

    visitReturnStatement = (ctx: ReturnStatementContext) => {
        return this.withScope(ctx, ReturnSymbol, ["#return#"], (s) => {
            return this.visitChildren(ctx);
        });
    };

    visitParameterList = (ctx: ParameterListContext) => {
        const prms = ctx.parameter();
        prms.forEach((p) => {
            const pExp = p as PrimitiveTypeParameterExpressionContext;
            const name = pExp._paramName.text;
            const typeName = pExp._paramType?.getText();
            const type = typeNameToIType.get(typeName);

            this.addNewSymbol(MethodParameterSymbol, p, name, null, type);
        });
        return undefined;
    };

    visitAssignmentExpression = (ctx: AssignmentExpressionContext) => {
        const lhsCtx = ctx.conditionalExpressionBase();
        const rhsCtx = ctx.expression();
        const op = ctx.assignmentOperator().getText();

        return this.withScope(
            ctx,
            AssignmentSymbol,
            ["#assignment#", op],
            (s) => {
                return this.visitChildren(ctx);
            }
        );
    };

    visitExpression = (ctx: ExpressionContext) => {
        //if (ctx.children?.length > 1) {
        return this.withScope(ctx, ExpressionSymbol, ["#expression#"], (s) => {
            return this.visitChildren(ctx);
        });
        // } else {
        //     return this.visitChildren(ctx);
        // }
    };

    visitConditionalExpression = (ctx: ConditionalExpressionContext) => {
        return this.withScope(
            ctx,
            ExpressionSymbol,
            ["#conditional-expression#"],
            (s) => {
                return this.visitChildren(ctx);
            }
        );
    };

    visitAdditiveExpression = (ctx: AdditiveExpressionContext) => {
        const operator = ctx._op.text;
        return this.withScope(ctx, OperatorSymbol, [operator], (s) => {
            return this.visitChildren(ctx);
        });
    };

    visitMultiplicativeExpression = (ctx: MultiplicativeExpressionContext) => {
        const operator = ctx._op.text;
        return this.withScope(ctx, OperatorSymbol, [operator], (s) => {
            return this.visitChildren(ctx);
        });
    };

    parseConditionalSymbol(ctx: ParserRuleContext, operator: string) {
        return this.withScope(ctx, ConditionalSymbol, [operator], (s) => {
            return this.visitChildren(ctx);
        });
    }

    visitEqualityExpression = (ctx: EqualityExpressionContext) =>
        this.parseConditionalSymbol(ctx, ctx._op.text);
    visitRelationalExpresion = (ctx: RelationalExpresionContext) =>
        this.parseConditionalSymbol(ctx, ctx._op.text);
    visitAndExpression = (ctx: AndExpressionContext) =>
        this.parseConditionalSymbol(ctx, ctx._op.text);
    visitExclusiveOrExpression = (ctx: ExclusiveOrExpressionContext) =>
        this.parseConditionalSymbol(ctx, ctx._op.text);
    visitInclusiveOrExpression = (ctx: InclusiveOrExpressionContext) =>
        this.parseConditionalSymbol(ctx, ctx._op.text);
    visitConditionalAndExpression = (ctx: ConditionalAndExpressionContext) =>
        this.parseConditionalSymbol(ctx, ctx._op.text);
    visitConditionalOrExpression = (ctx: ConditionalOrExpressionContext) =>
        this.parseConditionalSymbol(ctx, ctx._op.text);

    // TODO: ternary expression

    // prettier-ignore
    visitLiteral = (ctx: LiteralContext) => {
        if (!!ctx.IntegerConstant()) {
            this.addNewSymbol(LiteralSymbol, ctx, "int", FundamentalType.integerType, +ctx.IntegerConstant().getText());
        } else if (!!ctx.FloatingConstant()) {
            this.addNewSymbol(LiteralSymbol, ctx, "float", FundamentalType.floatType, +ctx.FloatingConstant().getText());
        } else if (!!ctx.StringLiteral()) {
            this.addNewSymbol(LiteralSymbol, ctx, "string", FundamentalType.stringType, trimQuotes(ctx.StringLiteral().getText()));
        }
        
        return undefined;
    };

    //  visitTerminal = (node: TerminalNode) => {
    //      switch (node.symbol.type) {
    // //         case LPCLexer.PLUS:
    // //         case LPCLexer.MINUS:
    // //         case LPCLexer.STAR:
    // //         case LPCLexer.DIV:
    // //         case LPCLexer.MOD:
    // //         case LPCLexer.SHL:
    // //         case LPCLexer.SHR:
    // //         case LPCLexer.AND:
    // //         case LPCLexer.OR:
    // //         case LPCLexer.XOR:
    // //         case LPCLexer.NOT:
    // //         case LPCLexer.INC:
    // //         case LPCLexer.DEC:
    // //             this.addNewSymbol(OperatorSymbol, node, node.getText());
    // //             break;
    //         case LPCLexer.Identifier:
    //             this.addNewSymbol(IdentifierSymbol, node, node.getText());
    //             break;
    //         default:
    //             // Ignore the rest.
    //             break;

    //      }

    //     return undefined;
    // };

    protected withScope<T, S extends ScopedSymbol>(
        tree: ParseTree,
        type: new (...args: any[]) => S,
        args: any[],
        action: (symbol: S) => T
    ): T {
        const scope = this.symbolTable.addNewSymbolOfType(
            type,
            this.scope,
            ...args
        );
        scope.context = tree;
        this.scope = scope;
        try {
            return action(scope);
        } finally {
            this.scope = scope.parent as ScopedSymbol;
        }
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
            this.scope,
            ...args
        );
        symbol.context = context;

        return symbol;
    }

    /**
     * get code comments to the left a context
     * @param ctx
     * @returns
     */
    private getPrefixComments(ctx: ParserRuleContext) {
        const source = this.symbolTable.owner!;
        const tokenIdx = ctx.start.tokenIndex;
        const comments = source.tokenStream.getHiddenTokensToLeft(
            tokenIdx,
            COMMENT_CHANNEL_NUM
        );
        if (comments?.length > 0) {
            const commentText = lastEntry(comments)?.text ?? "";
            return firstEntry(commentParser.parse(commentText));
        }

        return undefined;
    }
}
