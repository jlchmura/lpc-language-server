import * as path from "path";
import {
    Hover,
    MarkedString,
    MarkupContent,
    Position,
} from "vscode-languageserver";
import { LpcFacade } from "./facade";
import { symbolDescriptionFromEnum } from "./Symbol";
import { lexRangeToLspRange } from "../utils";
import { SymbolKind } from "../types";

export class HoverProvider {
    constructor(private backend: LpcFacade) {}

    public getHover(filename: string, position: Position): Hover {
        const info = this.backend.symbolInfoAtPosition(
            filename,
            position.character,
            position.line + 1,
            true
        );
        if (!info) {
            return undefined;
        } else {
            const description = symbolDescriptionFromEnum(info.kind);
            const { definition } = info;

            let defPrefix = `(${description?.toLowerCase()}) `;
            if (description.length === 0 || info.kind == SymbolKind.Variable) {
                defPrefix = "";
            }

            const filename = path.basename(info.source);

            const result: Hover = {
                range: lexRangeToLspRange(definition?.range),
                contents: {
                    kind: "markdown",
                    value: [
                        "```lpc",
                        `${defPrefix}${definition?.text ?? ""}`,
                        "```",
                        "***",
                        `Source: \`${path.basename(info.source)}\``
                    ].join("\n"),
                } as MarkupContent,
            };

            return result;
        }
    }
}
