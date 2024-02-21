
import { SymbolTable,ScopedSymbol,VariableSymbol,RoutineSymbol, MethodSymbol, TypedSymbol, IType, TypeKind, FundamentalType, ArrayType, ReferenceKind, BaseSymbol } from "antlr4-c3/index";

import { LPCVisitor } from "./parser3/LPCVisitor";
import { AbstractParseTreeVisitor, ParseTree, TerminalNode } from "antlr4ng";
import { ArrayDeclarationContext, DefinePreprocessorDirectiveContext, DirectiveTypeDefineContext, ExpressionContext, FunctionDeclarationContext, LPCParser, ScalarDeclarationContext, StatementContext, VariableDeclarationContext } from "./parser3/LPCParser";


export class SymbolTableVisitor extends AbstractParseTreeVisitor<SymbolTable> implements LPCVisitor<SymbolTable> {

    public functionNodes = new Map<string, TerminalNode>();

    constructor(        
        protected readonly symbolTable = new SymbolTable("", {}),
        protected scope = symbolTable.addNewSymbolOfType(ScopedSymbol, undefined)) {
        super();
    }

    protected defaultResult(): SymbolTable {
        return this.symbolTable;
    }

    visitDefinePreprocessorDirective = (ctx: DefinePreprocessorDirectiveContext) => {     
        this.scope.context = ctx; // store the context for later
        this.symbolTable.addNewSymbolOfType(DefineSymbol, this.scope, ctx.Identifier()?.getText());
        return this.visitChildren(ctx);
    };
    
    visitVariableDeclaration = (ctx: VariableDeclarationContext) => {
        // ctx will either be scalar or array, it doesn't matter right now
        const scalar = (ctx as unknown as ScalarDeclarationContext);
        const tt = scalar.typeSpecifier()?.getText();
        let varType: IType;
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
        
        if (ctx instanceof ArrayDeclarationContext) {
            varType = new ArrayType("*"+tt, ReferenceKind.Pointer, varType);
        }
        
        this.symbolTable.addNewSymbolOfType(VariableSymbol, this.scope, scalar.Identifier()?.getText(), undefined, varType);
        return this.visitChildren(ctx);
    };

    visitFunctionDeclaration = (ctx: FunctionDeclarationContext) => {                        
        const id = ctx.Identifier();
        const nm = id.getText();        
        
        this.functionNodes.set(nm, id);
        
        return this.withScope(ctx, MethodSymbol, [nm], () => this.visitChildren(ctx));
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

export  class DefineSymbol extends BaseSymbol {
    constructor(name: string) {
        super(name);
    }
}