import { Location, LocationLink, Position, Range } from "vscode-languageserver";
import { LpcFacade } from "./facade";
import { TextDocument } from "vscode-languageserver-textdocument";
import { URI } from "vscode-uri";
import { SymbolKind } from "../types";
import { lexRangeToLspRange } from "../utils";
import { ParserRuleContext } from "antlr4ng";
import { LPCToken } from "../parser3/LPCToken";
import { IncludeSymbol } from "../symbols/includeSymbol";

export class LpcDefinitionProvider {
    constructor(private backend: LpcFacade) {}

    public getDefinition(
        document: TextDocument,
        position: Position,
        implementationOnly = false
    ): LocationLink[] {
        const infoList = this.backend.symbolInfoAtPosition(
            document.uri,
            position.character,
            position.line + 1,
            true
        );
        //console.debug("DefinitionProvider.getDefinition", infoList);
        if (!infoList || infoList.length == 0) return null;

        const results = infoList.map((info) => {
            // VS code shows the text for the range given here on holding ctrl/cmd, which is rather
            // useless given that we show this info already in the hover provider. So, in order
            // to limit the amount of text we only pass on the smallest range which is possible.
            // Yet we need the correct start position to not break the goto-definition feature.
            if (
                !!info &&
                info.definition &&
                info.kind != SymbolKind.Efun &&
                (!implementationOnly ||
                    info.kind == SymbolKind.Method ||
                    info.kind == SymbolKind.Variable)
            ) {
                // if (info.definition.range.start.row - 1 < 0) {
                //     const i = 0;
                // }
                const { range } = info.definition;
                const lspRange = lexRangeToLspRange(range);

                // get the filename from the token
                const sContext = info.symbol.context as ParserRuleContext;
                const token = sContext.start as LPCToken;
                const filename =
                    info.symbol instanceof IncludeSymbol
                        ? this.backend.resolveFilename(
                              info.symbol.filename,
                              document.uri
                          ).fullPath
                        : token.filename;

                return LocationLink.create(filename, lspRange, lspRange);
            } else {
                // Empty for built-in entities.
                return null;
            }
        });

        return results.filter((r) => !!r);
    }
}
