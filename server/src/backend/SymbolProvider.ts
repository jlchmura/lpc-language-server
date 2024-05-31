import { TextDocument } from "vscode-languageserver-textdocument";
import { LpcFacade } from "./facade";
import { DocumentSymbol, Range } from "vscode-languageserver";
import { ISymbolInfo } from "../types";
import {
    symbolDescriptionFromEnum,
    translateSymbolKind,
} from "../symbols/Symbol";

export class LpcSymbolProvider {
    constructor(private backend: LpcFacade) {}

    public async getSymbols(document: TextDocument): Promise<DocumentSymbol[]> {
        const p = new Promise<DocumentSymbol[]>(async (resolve, reject) => {
            try {
                const symbols = await this.backend.listTopLevelSymbols(
                    document.uri,
                    false
                );
                const symbolsList: DocumentSymbol[] = [];

                if (!symbols) return [];

                for (const symbol of symbols) {
                    if (!symbol || !symbol.definition || !symbol.name) {
                        continue;
                    }

                    const info = this.createDocumentSymbol(symbol);
                    symbolsList.push(info);
                }

                resolve(symbolsList);
            } catch (e) {
                console.warn("Symbol provider error", e);
                resolve([]);
            }
        });
        return p;
    }

    private createDocumentSymbol(symbol: ISymbolInfo): DocumentSymbol {
        if (!symbol?.definition || !symbol?.name) {
            return undefined;
        }

        const startRow = Math.max(0, symbol.definition.range.start.row - 1);
        const endRow = Math.max(0, symbol.definition.range.end.row - 1);
        const range = Range.create(
            startRow,
            symbol.definition.range.start.column,
            endRow,
            symbol.definition.range.end.column
        );

        let description = symbolDescriptionFromEnum(symbol.kind);
        const kind = translateSymbolKind(symbol.kind);
        let children: DocumentSymbol[] = (
            symbol.children?.map((child) => this.createDocumentSymbol(child)) ??
            []
        ).filter((child) => !!child?.name);

        const docSym = DocumentSymbol.create(
            symbol.name,
            description,
            kind,
            range,
            range,
            children
        );
        return docSym;
    }
}
