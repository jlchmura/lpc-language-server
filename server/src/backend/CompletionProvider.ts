import { TextDocument } from "vscode-languageserver-textdocument";
import { LpcFacade } from "./facade";
import {
    CompletionItem,
    CompletionItemKind,
    InsertTextFormat,
    InsertTextMode,
    MarkupContent,
    Position,
    Range,
    TextEdit,
    integer,
} from "vscode-languageserver";
import {
    completionDetails,
    completionSortKeys,
    generateSymbolDoc,
    translateCompletionKind,
} from "../symbols/Symbol";
import { EfunSymbols } from "./EfunsLDMud";
import { firstEntry } from "../utils";
import { LpcBaseMethodSymbol, MethodSymbol } from "../symbols/methodSymbol";
import { LpcTypes } from "../types";

export class CompletionProvider {
    constructor(private backend: LpcFacade) {}

    public async provideCompletionItems(
        document: TextDocument,
        position: Position
    ): Promise<CompletionItem[]> {
        if (this.isPotentiallyValidDocCompletionPosition(document, position)) {
            // doc comment

            // find the next symbol
            let paramText: string = "";
            const symbolInfo = firstEntry(
                this.backend.symbolInfoAtPosition(
                    document.uri,
                    position.character - 2,
                    position.line + 2,
                    true
                )
            );
            if (!!symbolInfo) {
                const symbol = symbolInfo.symbol;

                // find the range of the comment
                const lineNum = position.line;
                const line = document.getText(
                    Range.create(lineNum, 0, lineNum, integer.MAX_VALUE)
                );
                const prefix = line
                    .slice(0, position.character)
                    .match(/\/\**\s*$/);
                const suffix = line
                    .slice(position.character)
                    .match(/^\s*\**\//);

                const start = {
                    ...position,
                    character:
                        position.character + (prefix ? -prefix[0].length : 0),
                };
                const end = {
                    ...start,
                    character:
                        position.character + (suffix ? suffix[0].length : 0),
                };
                const range = Range.create(start, end);

                if (symbol instanceof MethodSymbol) {
                    // if this is a method, add the params and return type to the snippet
                    let paramIdx = 1;
                    const paramSymbols = symbol.getParametersSync();
                    paramSymbols.forEach((param) => {
                        const typeString = !!param.type
                            ? ` \{${param.type.name}\}`
                            : "";
                        paramText += `\n * @param${typeString} ${param.name} \$${paramIdx}`;
                        paramIdx++;
                    });

                    // return type
                    const returnType = symbol.returnType;
                    if (!!returnType && returnType != LpcTypes.voidType) {
                        const typeString = ` {${returnType.name}} \$${paramIdx}`;
                        paramText += `\n * @return${typeString}`;
                    }
                }

                // construct the replacement
                return [
                    {
                        label: "/** */",
                        data: {
                            position: position,
                            uri: document.uri,
                        },
                        kind: CompletionItemKind.Text,
                        sortText: "00/**",
                        detail: "Doc Comment",
                        // use a textedit to replace the range with the snippet
                        textEdit: TextEdit.replace(
                            range,
                            `/**\n * \$0${paramText}\n */`
                        ),
                        insertTextFormat: InsertTextFormat.Snippet,
                    },
                ];
            }

            return [];
        } else {
            return this.backend
                .getCodeCompletionCandidates(
                    document.uri,
                    position.character,
                    position.line + 1
                )
                .then((candidates) => {
                    const completionList: CompletionItem[] = [];
                    candidates.forEach((c) => {
                        const item = CompletionItem.create(c.name);
                        item.data = {
                            source: c.source,
                        };
                        item.kind = translateCompletionKind(c.kind);
                        item.sortText =
                            (completionSortKeys.get(c.kind) ?? "99") + c.name;

                        completionList.push(item);
                    });
                    return completionList;
                });
        }
    }

    public resolveCompletionItem(item: CompletionItem): CompletionItem {
        const sourceCtx = this.backend.getContext(item.data.source);
        if (item.label == "/** */") {
            return item;
        } else {
            const info =
                sourceCtx?.getSymbolInfo(item.label) ??
                EfunSymbols.getSymbolInfo(item.label);
            if (!!info) {
                item.detail =
                    info.description !== undefined
                        ? info.description
                        : completionDetails.get(info.kind);

                item.documentation = {
                    value: generateSymbolDoc(info.symbol),
                    kind: "markdown",
                } as MarkupContent;
            }
            return item;
        }
    }

    private isPotentiallyValidDocCompletionPosition(
        document: TextDocument,
        position: Position
    ): boolean {
        // Only show the JSdoc completion when the everything before the cursor is whitespace
        // or could be the opening of a comment
        const lineNum = position.line;
        const line = document.getText(
            Range.create(lineNum, 0, lineNum, integer.MAX_VALUE)
        );
        const prefix = line.slice(0, position.character);
        if (!/^\s*$|\/\*\*\s*$|^\s*\/\*\*+\s*$/.test(prefix)) {
            return false;
        }

        // And everything after is possibly a closing comment or more whitespace
        const suffix = line.slice(position.character);
        return /^\s*(\*+\/)?\s*$/.test(suffix);
    }
}
