import {
    Diagnostic,
    DiagnosticRelatedInformation,
    DiagnosticSeverity,
    Location,
} from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { lexRangeToLspRange } from "../utils";
import { LpcFacade } from "./facade";
import { IDiagnosticEntry } from "../types";

export class DiagnosticProvider {
    // static entries: IDiagnosticEntry[]=[];

    constructor(private facade: LpcFacade) {}

    // public static addDiagnosticEntry(entry: IDiagnosticEntry) {
    //     this.entries.push(entry);
    // }

    // public static clearDiagnosticEntries() {
    //     this.entries = [];
    // }

    /**
     * Processes diangostics for the given document and sends back to the language client.
     * @param document
     */
    public processDiagnostic(document: TextDocument) {
        const diagnostics: Diagnostic[] = [];
        const entries = this.facade.getDiagnostics(document.uri);

        if (!entries) return [];

        for (const entry of entries) {
            const range = lexRangeToLspRange(entry.range);
            const diagnostic = Diagnostic.create(
                range,
                entry.message,
                entry.type
            );

            const { related } = entry;
            if (!!related) {
                diagnostic.relatedInformation = [
                    DiagnosticRelatedInformation.create(
                        Location.create(
                            related.source ?? document.uri,
                            lexRangeToLspRange(related.range)
                        ),
                        related.message
                    ),
                ];
            }

            diagnostics.push(diagnostic);
        }

        return diagnostics;
    }
}
