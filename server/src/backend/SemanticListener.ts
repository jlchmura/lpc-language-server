import { Token } from "antlr4ng";
import { LPCParserListener } from "../parser3/LPCParserListener";
import {
    DiagnosticType,
    IDiagnosticEntry,
    ILexicalRange,
    SymbolGroupKind,
} from "../types";
import { ContextSymbolTable, MethodSymbol } from "./ContextSymbolTable";
import {
    IdentifierExpressionContext,
    MethodInvocationContext,
    PrimaryExpressionContext,
} from "../parser3/LPCParser";
import { ScopedSymbol } from "antlr4-c3";

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

    exitMethodInvocation = (ctx: MethodInvocationContext) => {
        const parent = ctx.parent as PrimaryExpressionContext;
        const methodName = parent._pe?.getText();
        const methodSymbol = this.symbolTable.findSymbolDefinition(
            parent._pe
        ) as MethodSymbol;
        const symbolInfo = this.symbolTable.getSymbolInfo(methodSymbol);

        if (methodName && methodSymbol) {    
            // check if the number of arguments is correct
            const callArgs = ctx.argumentList()?.argument() ?? [];
            const methodParams = methodSymbol.getParameters() ?? [];

            if (callArgs.length < methodParams.length) {
                // find first arg that wasn't provided
                const notProvidedArg = methodParams[callArgs.length];
                const entry = this.logDiagnostic(
                    `Expected ${methodParams.length} arguments, but got ${callArgs.length}`,
                    parent.start,
                    parent.stop
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
