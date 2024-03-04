import * as path from "path";
import {
    Hover,
    MarkedString,
    MarkupContent,
    Position,
} from "vscode-languageserver";
import { LpcFacade } from "./facade";
import { symbolDescriptionFromEnum } from "../symbols/Symbol";
import { lexRangeToLspRange } from "../utils";
import { SymbolKind } from "../types";
import { MethodSymbol } from "../symbols/methodSymbol";
import { Block } from "comment-parser";

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

            const sourceLine = `Source: \`${path.basename(info.source)}\`${
                !!info.line ? ":" + info.line : ""
            }`;

            let commentDoc = "";

            // TODO: refactor this
            if (info.symbol && !!(info.symbol as any).doc) {
                const doc = (info.symbol as any).doc as Block;

                commentDoc = "\n***\n";
                commentDoc += doc.description;

                doc.tags
                    .filter((t) => t.tag == "param")
                    .forEach((tag) => {
                        commentDoc += "\n\n_@param:_ `";
                        if (tag.type) {
                            commentDoc += ` ${tag.type}`;
                        }
                        if (tag.name) {
                            commentDoc += ` ${tag.name}`;
                        }
                        commentDoc += "`";
                        if (tag.description) {
                            commentDoc += ` ${tag.description}`;
                        }
                    });

                const returnTag = doc.tags.find((t) => t.tag === "returns");
                if (!!returnTag) {
                    commentDoc += "\n\n_@returns:_";
                    if (returnTag.type) {
                        commentDoc += ` \`${returnTag.type}\``;
                    }
                    if (returnTag.description) {
                        commentDoc += ` - ${returnTag.description}`;
                    }
                }
            }

            const result: Hover = {
                range: lexRangeToLspRange(definition?.range),
                contents: {
                    kind: "markdown",
                    value:
                        [
                            "```lpc",
                            `${defPrefix}${definition?.text ?? ""}`,
                            "```",
                            "***",
                            sourceLine,
                        ].join("\n") + commentDoc,
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
