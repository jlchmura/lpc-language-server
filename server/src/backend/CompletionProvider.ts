import { TextDocument } from "vscode-languageserver-textdocument";
import { LpcFacade } from "./facade";
import { CompletionItem, MarkupContent, Position } from "vscode-languageserver";
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
            })
            .catch((err) => {
                debugger;
                return undefined;
            });
    }

    public resolveCompletionItem(item: CompletionItem): CompletionItem {
        const sourceCtx = this.backend.getContext(item.data.source);
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
