import * as commentParser from "comment-parser";
import {
    AbstractParseTreeVisitor,
    CommonTokenStream,
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
} from "antlr4-c3";
import {
    FunctionHeaderDeclarationContext,
    ParameterContext,
    PrimitiveTypeSpecifierContext,
    UnionableTypeSpecifierContext,
    ValidIdentifiersContext,
} from "../parser3/LPCParser";
import { LpcTypes, StructType } from "../types";
import { COMMENT_CHANNEL } from "../parser3/LPCPreprocessingLexer";
import { firstEntry, lastEntry } from "../utils";
import { MethodParameterSymbol } from "../symbols/variableSymbol";
import { EfunSymbol } from "../symbols/efunSymbol";

type GenericConstructorParameters<T> = ConstructorParameters<
    new (...args: any[]) => T
>;

export class EfunVisitor
    extends AbstractParseTreeVisitor<ScopedSymbol>
    implements LPCParserVisitor<ScopedSymbol>
{
    protected scope = this.symbolTable as ScopedSymbol;
    private docCache = new Map<string, commentParser.Block>();

    constructor(
        private symbolTable: SymbolTable,
        private tokenStream: CommonTokenStream
    ) {
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
                efunSymbol.doc = this.getPrefixComments(ctx);

                if (!!efunSymbol.doc) {
                    this.docCache.set(name, efunSymbol.doc);
                } else {
                    // if doc is missing, try to find it in the doc cache
                    // the first overload of this symbol probably has the doc
                    efunSymbol.doc = this.docCache.get(name);
                }

                return this.visitChildren(ctx);
            }
        );
    };

    visitParameter = (ctx: ParameterContext) => {
        // if any parameter has a void type then the whole function becomes varargs
        if (ctx._paramType?.getText().indexOf("void") > -1) {
            (this.scope as EfunSymbol).functionModifiers.add("varargs");
        }

        if (this.scope.name == "new") {
            const ii = 0;
        }
        const name = this.getValidIdentifier(ctx._paramName)?.getText();
        const type =
            this.parseTypeSpecifier(ctx._paramType) ?? LpcTypes.unknownType;
        const isVarArgs = !!ctx.TRIPPLEDOT() || !!ctx.VARARGS();

        this.addNewSymbol(
            MethodParameterSymbol,
            ctx,
            name ?? "",
            type,
            ctx._paramName,
            isVarArgs
        );

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
                case "mixed":
                    varType = LpcTypes.mixedType;
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

    /**
     * get code comments to the left a context
     * @param ctx
     * @returns
     */
    private getPrefixComments(ctx: ParserRuleContext) {
        const tokenIdx = ctx.start.tokenIndex;
        const comments = this.tokenStream.getHiddenTokensToLeft(
            tokenIdx,
            COMMENT_CHANNEL
        );
        if (comments?.length > 0) {
            const commentText = lastEntry(comments)?.text ?? "";
            const blocks = commentParser.parse(commentText, {
                spacing: "preserve",
            });
            return firstEntry(blocks);
        }

        return undefined;
    }

    getValidIdentifier(ctx: ValidIdentifiersContext) {
        const search = ctx?.children ?? [];
        while (search.length > 0) {
            const c = search.shift();
            if (c instanceof TerminalNode) {
                return c;
            }
            if (c instanceof ParserRuleContext) {
                search.unshift(...c.children);
            }
        }

        return undefined;
    }
}
