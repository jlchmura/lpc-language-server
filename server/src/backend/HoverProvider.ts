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
import { MethodSymbol } from "../symbols/methodSymbol";
import { Block } from "comment-parser";

export class HoverProvider {
    constructor(private backend: LpcFacade) {}

    public getHover(filename: string, position: Position): Hover {
        const info = firstEntry(
            this.backend.symbolInfoAtPosition(
                filename,
                position.character,
                position.line + 1,
                true
            )
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

            const sourceLine = `${path.basename(info.source)}${
                !!info.line ? ":" + info.line : ""
            }`;

            let commentDoc = "";

            commentDoc = generateSymbolDoc(info.symbol);
            doTest("a");
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

/**
 * test fn
 * @param {string} a - a string
 * @returns {void} something
 */
function doTest(a) {}
