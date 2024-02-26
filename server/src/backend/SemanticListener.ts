import { Token } from "antlr4ng";
import { LPCParserListener } from "../parser3/LPCParserListener";
import { DiagnosticType, IDiagnosticEntry, SymbolGroupKind } from "../types";
import { ContextSymbolTable } from "./ContextSymbolTable";
import {
    IdentifierExpressionContext,
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
            this.symbolTable.symbolExistsInGroup(symbol, kind, false, context) !==
            mustExist
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
