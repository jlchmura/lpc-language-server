import {
    Diagnostic,
    DiagnosticRelatedInformation,
    Location,
} from "vscode-languageserver";
import { lexRangeToLspRange } from "../utils";
import { LpcFacade } from "./facade";
import { IDiagnosticEntry } from "../types";
import { URI } from "vscode-uri";
import { ensureLpcConfig, getDiagnosticLevelFromConfig } from "./LpcConfig";

type DocDiagnostics = {
    uri: string;
    version?: number;
    diagnostics: Diagnostic[];
};

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
    public processDiagnostic(
        uri: string,
        version: number,
        force = false
    ): DocDiagnostics[] {
        const entries = this.facade
            .getDiagnostics(uri, force)
            .filter((d) => !d.filename || d.filename === uri);
        const results: DocDiagnostics[] = [];

        // if diag for the doc is undefined, that means diags failed
        // so send a blank array - we don't want to clear out any existing diags
        // for this doc
        if (!entries) {
            return [];
        }

        results.push({
            version: version,
            uri: uri,
            diagnostics: this.convertDiagnosticEntries(uri, entries),
        });

        // recursively send diagnostics for dependencies
        // if any dependencies need validation, reprocess them as well
        const deps = this.facade.getDependencies(uri) ?? [];
        const visited = new Set<string>();

        while (deps.length > 0) {
            const dep = deps.shift(); // get first element in array
            const depCtx = this.facade.getContext(dep);

            if (!depCtx || visited.has(depCtx.fileName)) continue;
            visited.add(depCtx.fileName);

            // add more deps
            const moreDeps = this.facade.getDependencies(dep);
            if (moreDeps?.length > 0) {
                deps.push(...moreDeps);
            }

            const depDiagEntries = this.facade.getDiagnostics(dep);
            const depUri = URI.file(dep).toString();
            if (!!depDiagEntries) {
                results.push({
                    uri: depUri,
                    diagnostics: this.convertDiagnosticEntries(
                        depUri,
                        depDiagEntries
                    ),
                });
            }
        }

        return results;
    }

    private convertDiagnosticEntries(
        uri: string,
        entries: IDiagnosticEntry[]
    ): Diagnostic[] {
        const config = ensureLpcConfig();
        const diags: Diagnostic[] = [];
        for (const entry of entries) {
            const { code } = entry;
            const range = lexRangeToLspRange(entry.range);

            const severity = getDiagnosticLevelFromConfig(
                config,
                code,
                entry.type
            );
            if (severity === undefined) {
                // if severity is undefined then we don't want to show this diagnostic
                continue;
            }

            const diagnostic = Diagnostic.create(
                range,
                entry.message,
                severity,
                undefined,
                entry.source
            );

            const { related } = entry;
            if (!!related) {
                diagnostic.relatedInformation = [
                    DiagnosticRelatedInformation.create(
                        Location.create(uri, lexRangeToLspRange(related.range)),
                        related.message
                    ),
                ];
            }

            diags.push(diagnostic);
        }
        return diags;
    }
}
