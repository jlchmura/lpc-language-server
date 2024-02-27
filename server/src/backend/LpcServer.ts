import { LpcFacade } from "./facade";
import {
    Connection,
    Diagnostic,
    DiagnosticRelatedInformation,
    DiagnosticSeverity,
    DidChangeConfigurationNotification,
    Disposable,
    InitializeParams,
    InitializeResult,
    InitializedParams,
    Location,
    Range,
    TextDocumentSyncKind,
    TextDocuments,
} from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import * as path from "path";
import { URI } from "vscode-uri";
import { LpcSymbolProvider } from "./SymbolProvider";
import { LpcDefinitionProvider } from "./DefinitionProvider";
import { IDiagnosticEntry, ILexicalRange } from "../types";
import { CodeLensProvider } from "./CodeLensProvider";

const CHANGE_DEBOUNCE_MS = 300;

export class LpcServer {
    private importDir: string | undefined;
    private facade: LpcFacade;

    /** timers used to debounce change events */
    private changeTimers = new Map<string, ReturnType<typeof setTimeout>>(); // Keyed by file name.

    private hasConfigurationCapability = false;
    private hasWorkspaceFolderCapability = false;
    private hasDiagnosticRelatedInformationCapability = false;
    private foldingRangeLimit = Number.MAX_VALUE;

    // providers
    private symbolProvider: LpcSymbolProvider;
    private definitionProvider: LpcDefinitionProvider;
    private codeLenseProvider: CodeLensProvider;

    /** document listener */
    private readonly documents: TextDocuments<TextDocument> = new TextDocuments(
        TextDocument
    );

    constructor(private connection: Connection) {
        this.connection.onInitialize((params) => {
            return this.onIntialize(params);
        });
        this.connection.onInitialized(() => {
            if (this.hasConfigurationCapability) {
                // Register for all configuration changes.
                connection.client.register(
                    DidChangeConfigurationNotification.type,
                    undefined
                );
            }
            if (this.hasWorkspaceFolderCapability) {
                connection.workspace.onDidChangeWorkspaceFolders((_event) => {
                    connection.console.log(
                        "Workspace folder change event received."
                    );
                });
            }
        });

        // Symbol Provider
        this.connection.onDocumentSymbol((params) => {
            const doc = this.documents.get(params.textDocument.uri);
            const result = this.symbolProvider.getSymbols(doc);
            return result;
        });

        // Definition Provider
        this.connection.onDefinition((params) => {
            const doc = this.documents.get(params.textDocument.uri);
            const result = this.definitionProvider.getDefinition(
                doc,
                params.position
            );
            return result;
        });

        // Codelense Provider
        this.registerCodelensProvider();
        this.connection.onCodeLensResolve((params) => {
            const result = this.codeLenseProvider.resolveCodeLens(params);
            return result;
        });

        // send document open/close/changes to facade
        this.documents.onDidOpen((e) => {
            this.facade.loadLpc(e.document.uri, e.document.getText());
            this.processDiagnostic(e.document);
        });
        this.documents.onDidClose((e) => {
            this.facade.releaseLpc(e.document.uri);
        });

        this.documents.onDidChangeContent((e) => {
            const filename = e.document.uri;

            // always update text, but debounce reparse and other updates
            this.facade.setText(e.document.uri, e.document.getText());

            const timer = this.changeTimers.get(filename);
            if (timer) {
                clearTimeout(timer);
            }

            this.changeTimers.set(
                filename,
                setTimeout(() => {
                    this.changeTimers.delete(filename);
                    this.codeLenseProvider.resolveCodeLens;
                    this.facade.reparse(filename);
                    this.processDiagnostic(e.document);

                    //force refresh codelense
                    //this.registerCodelensProvider();
                }, CHANGE_DEBOUNCE_MS)
            );
        });
    }

    public start() {
        this.documents.listen(this.connection);
        this.connection.listen();
    }

    private onIntialize(params: InitializeParams) {
        const capabilities = params.capabilities;

        // Does the client support the `workspace/configuration` request?
        // If not, we fall back using global settings.
        this.hasConfigurationCapability = !!(
            capabilities.workspace && !!capabilities.workspace.configuration
        );
        this.hasWorkspaceFolderCapability = !!(
            capabilities.workspace && !!capabilities.workspace.workspaceFolders
        );
        this.hasDiagnosticRelatedInformationCapability = !!(
            capabilities.textDocument &&
            capabilities.textDocument.publishDiagnostics &&
            capabilities.textDocument.publishDiagnostics.relatedInformation
        );

        const result: InitializeResult = {
            capabilities: {
                textDocumentSync: TextDocumentSyncKind.Incremental,
                // Tell the client that this server supports code completion.
                // completionProvider: {
                //   resolveProvider: false,
                // },
                documentSymbolProvider: true,
                codeLensProvider: {
                    resolveProvider: true,
                    workDoneProgress: false,
                },
                //hoverProvider: false,
                definitionProvider: true,
                //foldingRangeProvider: false, // change to true to enable server-based folding
            },
        };
        if (this.hasWorkspaceFolderCapability) {
            result.capabilities.workspace = {
                workspaceFolders: {
                    supported: true,
                },
            };
        }

        const folders = params.workspaceFolders;
        const rootFolder = folders && folders.length > 0 ? folders[0].uri : "";
        const rootFolderUri = URI.parse(rootFolder);
        const rootFolderPath = rootFolderUri.fsPath;

        this.importDir = path.join(rootFolderPath, "lib");
        this.facade = new LpcFacade(this.importDir, rootFolderPath);

        // init providers
        this.symbolProvider = new LpcSymbolProvider(this.facade);
        this.definitionProvider = new LpcDefinitionProvider(this.facade);
        this.codeLenseProvider = new CodeLensProvider(this.facade);

        return result;
    }

    private lexRangeToDiagnosticRange(range: ILexicalRange) {
        const { start, end } = range;
        const startRow = start.row === 0 ? 0 : start.row - 1;
        const endRow = end.row === 0 ? 0 : end.row - 1;

        return Range.create(startRow, start.column, endRow, end.column);
    }

    /**
     * Processes diangostics for the given document and sends back to the language client.
     * @param document
     */
    private processDiagnostic(document: TextDocument) {
        const diagnostics: Diagnostic[] = [];
        const entries = this.facade.getDiagnostics(document.uri);

        for (const entry of entries) {
            const range = this.lexRangeToDiagnosticRange(entry.range);
            const diagnostic = Diagnostic.create(
                range,
                entry.message,
                DiagnosticSeverity.Error
            );

            const { related } = entry;
            if (!!related) {
                diagnostic.relatedInformation = [
                    DiagnosticRelatedInformation.create(
                        Location.create(
                            related.source ?? document.uri,
                            this.lexRangeToDiagnosticRange(related.range)
                        ),
                        related.message
                    ),
                ];
            }

            diagnostics.push(diagnostic);
        }

        this.connection.sendDiagnostics({ uri: document.uri, diagnostics });
    }

    private clDisp: Disposable;
    private registerCodelensProvider() {
        if (!!this.clDisp) {
            this.clDisp.dispose();
        }
        this.clDisp = this.connection.onCodeLens((params) => {
            const doc = this.documents.get(params.textDocument.uri);
            const result = this.codeLenseProvider.provideCodeLenses(doc);
            return result;
        });
    }
}
