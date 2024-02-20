
import { SymbolTable,ScopedSymbol,VariableSymbol,RoutineSymbol, MethodSymbol } from "antlr4-c3/index";

import { LPCVisitor } from "./parser3/LPCVisitor";
import { AbstractParseTreeVisitor, ParseTree } from "antlr4ng";
import { ExpressionContext, FunctionDeclarationContext, StatementContext, VariableDeclarationContext } from "./parser3/LPCParser";


export class SymbolTableVisitor extends AbstractParseTreeVisitor<SymbolTable> implements LPCVisitor<SymbolTable> {
    constructor(        
        protected readonly symbolTable = new SymbolTable("", {}),
        protected scope = symbolTable.addNewSymbolOfType(ScopedSymbol, undefined)) {
        super();
    }

    protected defaultResult(): SymbolTable {
        return this.symbolTable;
    }

    visitVariableDeclaration = (ctx: VariableDeclarationContext) => {
        this.symbolTable.addNewSymbolOfType(VariableSymbol, this.scope, ctx.Identifier()?.getText(), undefined);
        return this.visitChildren(ctx);
    };

    visitFunctionDeclaration = (ctx: FunctionDeclarationContext) => {                        
        const nm = ctx.Identifier().getText();
        return this.withScope(ctx, MethodSymbol, [ctx.Identifier().getText()], () => this.visitChildren(ctx));
    };

    protected withScope<T>(tree: ParseTree, type: new (...args: any[]) => ScopedSymbol, args: any[], action: () => T): T {
        const scope = this.symbolTable.addNewSymbolOfType(type, this.scope, ...args);
        scope.context = tree;
        this.scope = scope;
        try {
            return action();
        } finally {
            this.scope = scope.parent as ScopedSymbol;
        }
    }

}