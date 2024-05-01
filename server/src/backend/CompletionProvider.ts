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
    integer,
} from "vscode-languageserver";
import {
    completionDetails,
    completionSortKeys,
    generateSymbolDoc,
    translateCompletionKind,
} from "../symbols/Symbol";
import { EfunSymbols } from "./EfunsLDMud";

export class CompletionProvider {
    constructor(private backend: LpcFacade) {}

    public async provideCompletionItems(
        document: TextDocument,
        position: Position
    ): Promise<CompletionItem[]> {
        if (this.isPotentiallyValidDocCompletionPosition(document, position)) {
            // doc comment
            return [
                {
                    label: "/** */",
                    data: "doc-comment",
                    kind: CompletionItemKind.Text,
                    sortText: "00/**",
                    detail: "Doc Comment",
                },
            ];
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
        if (item.data == "doc-comment") {
            return {
                ...item,
                insertText: "\n * $1\n ",
                insertTextFormat: InsertTextFormat.Snippet,
            };
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
