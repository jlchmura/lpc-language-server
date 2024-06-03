import { Position, TextDocument } from "vscode-languageserver-textdocument";
import { LpcFacade } from "./facade";
import { Location } from "vscode-languageserver";
import {
    firstEntry,
    lexRangeFromContext,
    lexRangeToLspRange,
    rangeFromTokens,
} from "../utils";
import {
    IReferenceableSymbol,
    isInstanceOfIReferenceableSymbol,
} from "../symbols/base";
import { ContextSymbolTable } from "./ContextSymbolTable";
import { ParserRuleContext } from "antlr4ng";
import { LPCToken } from "../parser3/LPCToken";
import { BaseSymbol } from "antlr4-c3";

export class ReferenceProvider {
    constructor(private backend: LpcFacade) {}

    public async handleReferenceRequest(
        doc: TextDocument,
        position: Position
    ): Promise<Location[]> {
        const p = new Promise<Location[]>((resolve, reject) => {
            const results: Location[] = [];

            const symbolInfo = this.backend.symbolInfoAtPosition(
                doc.uri,
                position.character,
                position.line + 1,
                false
            );

            const sym = firstEntry(symbolInfo)?.symbol;
            if (!sym) {
                return [];
            } else if (!isInstanceOfIReferenceableSymbol(sym)) {
                return [];
            }

            const seen: Set<BaseSymbol> = new Set();
            const refsToScan: BaseSymbol[] = [...sym.references];

            while (refsToScan.length > 0) {
                const ref = refsToScan.pop();
                if (seen.has(ref)) continue;
                seen.add(ref);

                if (isInstanceOfIReferenceableSymbol(ref)) {
                    refsToScan.push(...ref.references);
                }

                const parseInfo = ref.context as ParserRuleContext;
                const token = parseInfo.start as LPCToken;
                const filename = token.filename;
                const range = lexRangeToLspRange(
                    lexRangeFromContext(parseInfo)
                );

                results.push({
                    uri: filename,
                    range: range,
                });
            }

            resolve(results);
        });
        return p;
    }
}
