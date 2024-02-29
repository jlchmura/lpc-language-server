import { ParseTree, ParserRuleContext, RuleContext, Token } from "antlr4ng";
import { LPCParserListener } from "../parser3/LPCParserListener";
import {
    DiagnosticType,
    IDiagnosticEntry,
    ILexicalRange,
    SymbolGroupKind,
} from "../types";
import { ContextSymbolTable } from "./ContextSymbolTable";
import {
    CallOtherTargetContext,
    CloneObjectExpressionContext,
    FunctionDeclarationContext,
    IdentifierExpressionContext,
    MethodInvocationContext,
    PrimaryExpressionContext,
} from "../parser3/LPCParser";
import {
    ScopedSymbol,
    TypeKind,
    MethodSymbol as BaseMethodSymbol,
} from "antlr4-c3";
import {
    ITypedSymbol,
    IdentifierSymbol,
    MethodDeclarationSymbol,
    MethodSymbol,
    VariableSymbol,
    resolveOfTypeSync,
} from "./Symbol";
import { areSetsEqual, areTwoParameterArraysEqual } from "../utils";

export class SemanticListener extends LPCParserListener {
    private seenSymbols = new Map<string, Token>();

    public constructor(
        private diagnostics: IDiagnosticEntry[],
        private symbolTable: ContextSymbolTable
    ) {
        super();
    }

    exitIdentifierExpression = (ctx: IdentifierExpressionContext): void => {
        const id = ctx.Identifier();
        const symbol = id.getText();

        const ss = this.symbolTable.symbolWithContextSync(ctx);
        const scope = ss.getParentOfType(ScopedSymbol);
        const parentContext = this.symbolTable.findSymbolDefinition(ctx);
        const parentScope = parentContext?.getParentOfType(ScopedSymbol);

        this.checkSymbolExistence(
            true,
            SymbolGroupKind.Identifier,
            symbol,
            "Unknown symbol",
            id.symbol,
            parentScope
        );
        this.symbolTable.incrementSymbolRefCount(symbol);
    };

    exitCloneObjectExpression = (ctx: CloneObjectExpressionContext) => {
        const symbol = this.symbolTable.findSymbolDefinition(ctx);
        const i = 0;
    };

    exitCallOtherTarget = (ctx: CallOtherTargetContext) => {
        // find the object that the method is being called on
        const target = getSibling(ctx, -2); // -1 is the arrow
        const symbol = this.symbolTable.symbolWithContextSync(target);

        const symbolCont = this.symbolTable.symbolContainingContext(ctx);

        const i = 0;
    };

    exitFunctionDeclaration = (ctx: FunctionDeclarationContext) => {
        const symbol = this.symbolTable.symbolWithContextSync(
            ctx
        ) as MethodSymbol;
        if (!symbol) return;

        const functionDef = resolveOfTypeSync(
            symbol.parent,
            symbol.name,
            MethodDeclarationSymbol,
            false
        );

        const funStart = ctx.start;
        const funEnd = ctx.functionHeader().PAREN_CLOSE().symbol;

        if (!!functionDef) {
            // validate that everything matches
            if (
                !areSetsEqual(
                    symbol.functionModifiers,
                    functionDef.functionModifiers
                )
            ) {
                this.logDiagnostic(
                    "Function modifiers do not match",
                    funStart,
                    funEnd
                );
            }

            if (symbol.returnType?.name !== functionDef.returnType?.name) {
                this.logDiagnostic(
                    `Function return type (${
                        symbol.returnType?.name ?? "unspecified"
                    }) does not match its definition (${
                        functionDef.returnType?.name ?? "unspecified"
                    })`,
                    funStart,
                    funEnd
                );
            }

            if (
                !areTwoParameterArraysEqual(
                    symbol.getParametersSync(),
                    functionDef.getParametersSync()
                )
            ) {
                this.logDiagnostic(
                    `Function parameters do not match its definition`,
                    funStart,
                    funEnd
                );
            }
        }
    };

    exitMethodInvocation = (ctx: MethodInvocationContext) => {
        const parent = ctx.parent as PrimaryExpressionContext;

        // the tokens to use to generate the error range
        let rangeStart = parent.start;
        let rangeEnd = parent.stop;

        // find the context that this method is being invoked on
        const methodObj = getSibling(ctx, -1);
        const methodName = methodObj.getText();
        rangeStart = methodObj.start;

        // symbol table that will be used to look up definition
        let lookupTable: ContextSymbolTable = this.symbolTable;

        // if this is a call to another object, use that object's symbol table
        if (methodObj instanceof CallOtherTargetContext) {
            const sourceTypeContext = getSibling(ctx, -3); // -2 is the arrow
            // get the name of this variable
            let sourceSymbol = this.symbolTable.symbolWithContextSync(
                sourceTypeContext
            ) as unknown as ITypedSymbol;
            if (
                sourceSymbol instanceof IdentifierSymbol ||
                sourceSymbol instanceof VariableSymbol
            ) {
                sourceSymbol = this.symbolTable.lastAssignOrDecl(
                    sourceSymbol
                ) as unknown as ITypedSymbol;
                const i = 0;
            }
            if (sourceSymbol?.type?.kind == TypeKind.Class) {
                // call other source obj has a type, so use that to locate the method def
                const typeRefTable = this.symbolTable.getObjectTypeRef(
                    sourceSymbol.type.name
                );
                lookupTable = typeRefTable;
            }
        }

        // get the definition for that method
        const methodSymbol = this.symbolTable.resolveSync(
            methodName
        ) as MethodSymbol;
        const symbolInfo = lookupTable.getSymbolInfo(methodSymbol);

        // this will include efuns
        if (methodName && methodSymbol instanceof BaseMethodSymbol) {
            // check if the number of arguments is correct
            const callArgs = ctx.argumentList()?.argument() ?? [];
            const methodParams = methodSymbol?.getParametersSync() ?? [];

            if (callArgs.length < methodParams.length) {
                // find first arg that wasn't provided
                const notProvidedArg = methodParams[callArgs.length];
                const entry = this.logDiagnostic(
                    `Expected ${methodParams.length} arguments, but got ${callArgs.length}`,
                    rangeStart,
                    rangeEnd
                );

                // add info about the missing arg
                entry.related = {
                    type: DiagnosticType.Error,
                    message: `An argument for '${notProvidedArg.name}' was not provided`,
                    range: symbolInfo?.definition?.range ?? entry.range,
                    source: symbolInfo?.source,
                };
            } else if (callArgs.length > methodParams.length) {
                // create range based on any extra args
                const offenderStart = callArgs[methodParams.length].start;
                const offenderEnd = callArgs[callArgs.length - 1].stop;
                const entry = this.logDiagnostic(
                    `Expected ${methodParams.length} arguments, but got ${callArgs.length}`,
                    offenderStart,
                    offenderEnd
                );
            }
        } else {
            this.logDiagnostic(
                "Unknown function name",
                parent.start,
                parent.stop
            );
        }
    };

    private logDiagnostic(
        message: string,
        offendingTokenStart: Token,
        offendingTokenEnd: Token
    ) {
        offendingTokenEnd = offendingTokenEnd ?? offendingTokenStart;
        const entry: IDiagnosticEntry = {
            type: DiagnosticType.Error,
            message: message,
            range: this.rangeFromTokens(offendingTokenStart, offendingTokenEnd),
        };
        this.diagnostics.push(entry);
        return entry;
    }

    private rangeFromTokens(start: Token, end: Token): ILexicalRange {
        return {
            start: {
                column: start.column,
                row: start.line,
            },
            end: {
                column: end.column + end.stop - end.start + 1,
                row: end.line,
            },
        } as ILexicalRange;
    }

    //  /**
    //  * Check references to other lexer tokens.
    //  * @param ctx The terminal definition context.
    //  */
    //  public override exitTerminalDef = (ctx: TerminalDefContext): void => {
    //     const tokenRef = ctx.TOKEN_REF();
    //     if (tokenRef) {
    //         const symbol = tokenRef.getText();
    //         this.checkSymbolExistence(true, SymbolGroupKind.TokenRef, symbol, "Unknown token reference",
    //             tokenRef.symbol);
    //         this.symbolTable.incrementSymbolRefCount(symbol);
    //     }
    // };

    protected checkSymbolExistence(
        mustExist: boolean,
        kind: SymbolGroupKind,
        symbol: string,
        message: string,
        offendingToken: Token,
        context?: ScopedSymbol
    ): void {
        if (
            this.symbolTable.symbolExistsInGroup(
                symbol,
                kind,
                false,
                context
            ) !== mustExist
        ) {
            const entry: IDiagnosticEntry = {
                type: DiagnosticType.Error,
                message: message + " '" + symbol + "'",
                range: {
                    start: {
                        column: offendingToken.column,
                        row: offendingToken.line,
                    },
                    end: {
                        column:
                            offendingToken.column +
                            offendingToken.stop -
                            offendingToken.start +
                            1,
                        row: offendingToken.line,
                    },
                },
            };
            this.diagnostics.push(entry);
        }
    }
}

function getSibling(ctx: RuleContext, offset: number) {
    const parent = ctx.parent as RuleContext;
    const idx = parent.children.indexOf(ctx);
    const target =
        idx + offset >= 0 && idx + offset < parent.children.length
            ? parent.children[idx + offset]
            : undefined;
    return target as ParserRuleContext;
}
