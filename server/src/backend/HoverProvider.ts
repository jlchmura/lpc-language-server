import * as path from "path";
import {
    Hover,
    MarkedString,
    MarkupContent,
    Position,
} from "vscode-languageserver";
import { LpcFacade } from "./facade";
import {
    generateSymbolDoc,
    symbolDescriptionFromEnum,
} from "../symbols/Symbol";
import { firstEntry, lexRangeToLspRange } from "../utils";
import { SymbolKind } from "../types";
import { LpcBaseMethodSymbol, MethodSymbol } from "../symbols/methodSymbol";
import { DefineSymbol } from "../symbols/defineSymbol";

export class HoverProvider {
    constructor(private backend: LpcFacade) {}

    public getHover(filename: string, position: Position): Hover {
        const symbolInfo = this.backend.symbolInfoAtPosition(
            filename,
            position.character,
            position.line + 1,
            true
        );

        // use the first symbol with a doc comment - in the case of methods, the method
        // or header may have the comment
        let info = symbolInfo?.find(
            (s) => !!(s?.symbol as LpcBaseMethodSymbol)?.doc
        );
        if (!info) {
            info = firstEntry(symbolInfo);
        }

        if (!info) {
            return undefined;
        } else {
            const description = symbolDescriptionFromEnum(info.kind);
            const { definition } = info;

            let defPrefix = `(${description?.toLowerCase()}) `;
            if (description.length === 0 || info.kind == SymbolKind.Variable) {
                defPrefix = "";
            }

            const lineNum = info.line ?? info.definition?.range?.start.row;
            const sourceFilename =
                typeof info.source === "string"
                    ? path.basename(info.source)
                    : info.source;
            const sourceLine = `${sourceFilename}${
                !!lineNum ? ":" + lineNum : ""
            }`;

            let commentDoc = "";

            commentDoc = generateSymbolDoc(info.symbol);

            if (
                !commentDoc &&
                info.symbol instanceof DefineSymbol &&
                info.token
            ) {
                // special handling for macros.. show what they expand to.
                const macroToken = info.token!;
                commentDoc =
                    "\nExpands to:\n```lpc\n" +
                    macroToken.generatedCode +
                    "\n```";
            }

            const result: Hover = {
                range: lexRangeToLspRange(definition?.range),
                contents: {
                    kind: "markdown",
                    value: [
                        "```lpc",
                        `${defPrefix}${definition?.text ?? ""}`,
                        sourceLine,
                        "```",
                        "***",
                        //sourceLine,
                        commentDoc,
                    ].join("\n"),
                } as MarkupContent,
            };

            return result;
        }
    }
}
