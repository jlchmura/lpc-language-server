import { AbstractParseTreeVisitor, ParseTree } from "antlr4ng";
import { LPCParserVisitor } from "../parser3/LPCParserVisitor";
import {
    ArrayType,
    BaseSymbol,
    FundamentalType,
    IType,
    ReferenceKind,
    ScopedSymbol,
    SymbolTable,
} from "antlr4-c3";
import {
    FunctionHeaderDeclarationContext,
    ParameterContext,
    PrimitiveTypeSpecifierContext,
    UnionableTypeSpecifierContext,
} from "../parser3/LPCParser";
import { EfunSymbol, MethodParameterSymbol } from "../symbols/methodSymbol";
import { LpcTypes, StructType } from "../types";

type GenericConstructorParameters<T> = ConstructorParameters<
    new (...args: any[]) => T
>;

export class EfunVisitor
    extends AbstractParseTreeVisitor<ScopedSymbol>
    implements LPCParserVisitor<ScopedSymbol>
{
    protected scope = this.symbolTable as ScopedSymbol;

    constructor(private symbolTable: SymbolTable) {
        super();
    }

    visitFunctionHeaderDeclaration = (
        ctx: FunctionHeaderDeclarationContext
    ) => {
        const headerCtx = ctx.functionHeader();
        const nameCtx = headerCtx._functionName;
        const returnTypeCtx =
            this.parseTypeSpecifier(
                headerCtx.typeSpecifier()?.unionableTypeSpecifier()
            ) ?? LpcTypes.unknownType;
        const modsCtx = headerCtx.functionModifier();

        const name = nameCtx.getText();
        const mods: Set<string> = new Set();
        modsCtx?.forEach((mod) => mods.add(mod.getText()));

        return this.withScope(
            ctx,
            EfunSymbol,
            [name, returnTypeCtx, mods],
            (efunSymbol) => {
                return this.visitChildren(ctx);
            }
        );
    };

    visitParameter = (ctx: ParameterContext) => {
        // if any parameter has a void type then the whole function becomes varargs
        if (ctx._paramType?.getText().indexOf("void") > -1) {
            (this.scope as EfunSymbol).functionModifiers.add("varargs");
        }

        const name = ctx._paramName?.getText();
        const type =
            this.parseTypeSpecifier(ctx._paramType) ?? LpcTypes.unknownType;
        const isVarArgs = !!ctx.TRIPPLEDOT() || !!ctx.VARARGS();

        this.addNewSymbol(MethodParameterSymbol, ctx, [
            name,
            type,
            ctx._paramName,
            isVarArgs,
        ]);

        return undefined;
    };

    protected withScope<T, S extends ScopedSymbol>(
        tree: ParseTree,
        type: new (...args: GenericConstructorParameters<T>) => S,
        args: GenericConstructorParameters<T>,
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

    parseTypeSpecifier(ctx: UnionableTypeSpecifierContext) {
        const u = ctx;
        if (u?.structTypeSpecifier()) {
            const spec = u.structTypeSpecifier();
            return new StructType(spec.Identifier().getText());
        } else {
            return this.parsePrimitiveType(u?.primitiveTypeSpecifier());
        }
    }

    parsePrimitiveType(ctx: PrimitiveTypeSpecifierContext) {
        let tt = ctx?.getText();
        let varType: IType;
        if (tt) {
            const isArray = tt.endsWith("*");
            if (isArray) {
                tt = tt.substring(0, tt.length - 1);
            }
            switch (tt) {
                case "int":
                    varType = LpcTypes.intType;
                    break;
                case "string":
                    varType = LpcTypes.stringType;
                    break;
                case "object":
                    varType = LpcTypes.objectType;
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

        return varType;
    }
}
