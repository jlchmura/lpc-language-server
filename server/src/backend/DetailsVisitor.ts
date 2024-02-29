import { AbstractParseTreeVisitor, ParseTree, TerminalNode } from "antlr4ng";
import { LPCParserVisitor } from "../parser3/LPCParserVisitor";
import {
    ArrayType,
    BaseSymbol,
    FundamentalType,
    IType,
    ParameterSymbol,
    ReferenceKind,
    ScopedSymbol,
    SymbolTable,
    SymbolConstructor,
} from "antlr4-c3";
import { ContextSymbolTable } from "./ContextSymbolTable";
import { LpcFacade } from "./facade";
import {
    AssignmentExpressionContext,
    ConditionalExpressionContext,
    DefinePreprocessorDirectiveContext,
    ExpressionContext,
    FunctionDeclarationContext,
    FunctionHeaderDeclarationContext,
    IdentifierExpressionContext,
    IfStatementContext,
    IncludeDirectiveContext,
    InheritStatementContext,
    InlineClosureExpressionContext,
    ParameterListContext,
    PrimaryExpressionContext,
    PrimitiveTypeParameterExpressionContext,
    PrimitiveTypeVariableDeclarationContext,
    SelectionDirectiveContext,
} from "../parser3/LPCParser";

import {
    ExpressionSymbol,
    FunctionIdentifierSymbol,
    IdentifierSymbol,
    IfSymbol,
    IncludeSymbol,
    InheritSymbol,
    InlineClosureSymbol,
    MethodDeclarationSymbol,
    MethodParameterSymbol,
    MethodSymbol,
    OperatorSymbol,
    PreprocessorSymbol,
    SelectionSymbol,
} from "../symbols/Symbol";
import { FoldingRange } from "vscode-languageserver";
import { typeNameToIType } from "../types";
import { LPCLexer } from "../parser3/LPCLexer";
import {
    VariableIdentifierSymbol,
    VariableSymbol,
} from "../symbols/variableSymbol";
import { DefineSymbol } from "../symbols/defineSymbol";
import { AssignmentSymbol } from "../symbols/assignmentSymbol";

export class DetailsVisitor
    extends AbstractParseTreeVisitor<SymbolTable>
    implements LPCParserVisitor<SymbolTable>
{
    protected scope = this.symbolTable as ScopedSymbol;

    constructor(
        private backend: LpcFacade,
        private symbolTable: ContextSymbolTable,
        private imports: string[],
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
        const idx = defineStr.indexOf(" ");
        const label = defineStr.substring(0, idx);
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
        return this.withScope(
            ctx,
            ExpressionSymbol,
            ["#primary-expression#"],
            (s) => {
                return this.visitChildren(ctx);
            }
        );
    };

    visitIdentifierExpression = (ctx: IdentifierExpressionContext) => {
        const priExp = ctx.parent as PrimaryExpressionContext;
        const isVar = priExp.methodInvocation().length === 0; // if its not a method invocation, then its a variable reference
        const parentSymbol = this.scope;
        const name = ctx.Identifier().getText();
        const symbolType: SymbolConstructor<BaseSymbol, unknown[]> = isVar
            ? VariableIdentifierSymbol
            : FunctionIdentifierSymbol;

        this.addNewSymbol(symbolType, ctx, `${name}`);
        return undefined;
    };

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
            this.addNewSymbol(
                VariableSymbol,
                varDecl.Identifier(),
                varDecl._variableName?.text,
                varType
            );
        });

        // const assigns = ctx.assignmentExpression();
        // assigns.forEach((assign) => {
        //   const id = assign.Identifier();
        //   const exp = assign.expression();
        //   const sym = this.symbolTable.addNewSymbolOfType(
        //     VariableSymbol,
        //     this.scope,
        //     id.getText(),
        //     exp.getText(),
        //     varType
        //   );
        //   sym.context = ctx;
        // });

        return this.visitChildren(ctx);
    };

    visitIncludeDirective = (ctx: IncludeDirectiveContext) => {
        const filename = ctx.directiveIncludeFile().getText();

        this.imports.push(filename);
        this.addNewSymbol(IncludeSymbol, ctx, filename);

        return undefined;
    };

    visitInheritStatement = (ctx: InheritStatementContext) => {
        const filename = ctx._inheritTarget!.text;
        this.addNewSymbol(InheritSymbol, ctx, filename);
        this.imports.push(filename);

        return undefined;
    };

    visitInlineClosureExpression = (ctx: InlineClosureExpressionContext) => {
        let parent = ctx.parent;
        let name: string | undefined = undefined;
        while (!name && !!parent) {
            if (!!(parent as IdentifierExpressionContext)) {
                name =
                    (parent as IdentifierExpressionContext).getText &&
                    (parent as IdentifierExpressionContext).getText();
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
            s.foldingRange = FoldingRange.create(
                ctx.start.line - 1,
                ctx.stop.line - 2,
                ctx.start.column,
                ctx.stop.column
            );
            return this.visitChildren(ctx);
        });
    };

    visitParameterList = (ctx: ParameterListContext) => {
        const prms = ctx.parameter();
        prms.forEach((p) => {
            const name = (p as PrimitiveTypeParameterExpressionContext)
                ._paramName.text;
            this.addNewSymbol(MethodParameterSymbol, p, name);
        });
        return undefined;
    };

    visitAssignmentExpression = (ctx: AssignmentExpressionContext) => {
        const lhsCtx = ctx.conditionalExpressionBase();
        const rhsCtx = ctx.expression();
        const op = ctx.assignmentOperator().getText();

        return this.withScope(ctx, AssignmentSymbol, [op], (s) => {
            return this.visitChildren(ctx);
        });
    };

    visitExpression = (ctx: ExpressionContext) => {
        return this.withScope(ctx, ExpressionSymbol, ["#expression#"], (s) => {
            return this.visitChildren(ctx);
        });
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

    visitTerminal = (node: TerminalNode) => {
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

        return undefined;
    };

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
}
