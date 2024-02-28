import { AbstractParseTreeVisitor, ParseTree } from "antlr4ng";
import { LPCParserVisitor } from "../parser3/LPCParserVisitor";
import {
    ArrayType,
    FundamentalType,
    IType,
    MethodSymbol,
    ReferenceKind,
    ScopedSymbol,
    SymbolTable,
    VariableSymbol,
} from "antlr4-c3";
import { ContextSymbolTable } from "./ContextSymbolTable";
import { LpcFacade } from "./facade";
import {
    DefinePreprocessorDirectiveContext,
    FunctionDeclarationContext,
    IdentifierExpressionContext,
    IfStatementContext,
    InlineClosureExpressionContext,
    PrimitiveTypeVariableDeclarationContext,
    SelectionDirectiveContext,
} from "../parser3/LPCParser";

import {
    DefineSymbol,
    IfSymbol,
    PreprocessorSymbol,
    SelectionSymbol,
} from "./Symbol";

export class DetailsVisitor
    extends AbstractParseTreeVisitor<SymbolTable>
    implements LPCParserVisitor<SymbolTable>
{
    protected scope = this.symbolTable.addNewSymbolOfType(
        ScopedSymbol,
        undefined
    );

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
        const defineStr = ctx.END_DEFINE()?.getText();

        // trim everything after the first space
        const idx = defineStr.indexOf(" ");
        const label = defineStr.substring(0, idx) + "_" + tokenIdx;

        //this.scope.context = ctx; // store the context for later
        const sym = this.symbolTable.addNewSymbolOfType(
            DefineSymbol,
            this.scope,
            label
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

    visitPrimitiveTypeVariableDeclaration = (
        ctx: PrimitiveTypeVariableDeclarationContext
    ) => {
        // ctx will either be scalar or array, it doesn't matter right now

        let tt = ctx.primitiveTypeSpecifier().getText();
        let varType: IType;
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
            varType = new ArrayType(tt + "*", ReferenceKind.Pointer, varType);
        }

        const varDecls = ctx.variableDeclarator();
        varDecls.forEach((varDecl) => {
            const sym = this.symbolTable.addNewSymbolOfType(
                VariableSymbol,
                this.scope,
                varDecl.Identifier().getText(),
                undefined,
                varType
            );
            sym.context = ctx;
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
            MethodSymbol,
            [name + " Inline Closure "],
            () => this.visitChildren(ctx)
        );
    };

    visitIfStatement = (ctx: IfStatementContext) => {
        const tokenIdx = ctx.start.tokenIndex;
        const name = "if_" + tokenIdx;

        const ifSym = this.withScope(ctx, IfSymbol, [name], () => {
            const scope = this.scope as IfSymbol;

            let i = 0;
            const ifExpCtx = ctx.ifExpression();
            const ifExp = this.symbolTable.addNewSymbolOfType(
                SelectionSymbol,
                this.scope,
                `if_${tokenIdx}_${i++}`,
                "if"
            );
            ifExp.context = ifExpCtx;
            scope.if = ifExp;

            const ifElseCtx = ctx.elseIfExpression() ?? [];
            scope.elseIf = [];
            ifElseCtx.forEach((e) => {
                const elseIfExp = this.symbolTable.addNewSymbolOfType(
                    SelectionSymbol,
                    this.scope,
                    `elseif_${tokenIdx}_${i++}`,
                    "else if"
                );
                elseIfExp.context = e;
                scope.elseIf.push(elseIfExp);
            });

            const elseCtx = ctx.elseExpression();
            if (!!elseCtx) {
                const elseExp = this.symbolTable.addNewSymbolOfType(
                    SelectionSymbol,
                    this.scope,
                    `else_${tokenIdx}_${i++}`,
                    "else"
                );
                elseExp.context = elseCtx;
                scope.else = elseExp;
            }

            return this.visitChildren(ctx);
        });

        return ifSym;
    };

    visitFunctionDeclaration = (ctx: FunctionDeclarationContext) => {
        const header = ctx.functionHeader();
        const id = header.Identifier();
        const nm = id.getText();

        return this.withScope(ctx, MethodSymbol, [nm], () =>
            this.visitChildren(ctx)
        );
    };

    protected withScope<T>(
        tree: ParseTree,
        type: new (...args: any[]) => ScopedSymbol,
        args: any[],
        action: () => T
    ): T {
        const scope = this.symbolTable.addNewSymbolOfType(
            type,
            this.scope,
            ...args
        );
        scope.context = tree;
        this.scope = scope;
        try {
            return action();
        } finally {
            this.scope = scope.parent as ScopedSymbol;
        }
    }
}
