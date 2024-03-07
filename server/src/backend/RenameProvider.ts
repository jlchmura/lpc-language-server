import { TextDocument } from "vscode-languageserver-textdocument";
import { LpcFacade } from "./facade";
import { Position, TextEdit, WorkspaceEdit } from "vscode-languageserver";
import {
    IRenameableSymbol,
    isInstanceOfIRenameableSymbol,
} from "../symbols/base";
import { lexRangeToLspRange } from "../utils";

export class RenameProvider {
    constructor(private backend: LpcFacade) {}

    public handleRenameRequest(
        doc: TextDocument,
        position: Position,
        newName: string
    ): WorkspaceEdit {
        const info = this.backend.symbolInfoAtPosition(
            doc.uri,
            position.character,
            position.line + 1,
            false
        );

        if (info) {
            const result: WorkspaceEdit = { changes: {} };
            const occurrences = this.backend.getSymbolOccurrences(
                doc.uri,
                info.name
            );

            occurrences.forEach((o) => {
                if (!isInstanceOfIRenameableSymbol(o.symbol)) {
                    throw "encountered symbol that is not renameable.";
                }

                const symbol = o.symbol as IRenameableSymbol;
                if (symbol.nameRange) {
                    const range = lexRangeToLspRange(symbol.nameRange);

                    result.changes[o.source] = result.changes[o.source] ?? [];
                    result.changes[o.source].push(
                        TextEdit.replace(range, newName)
                    );
                }
            });

            return result;
        } else {
            undefined;
        }
    }
}
