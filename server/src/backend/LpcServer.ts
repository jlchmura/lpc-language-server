import { LpcFacade } from "./facade";
import {
    Connection,
    Diagnostic,
    DiagnosticSeverity,
    DidChangeConfigurationNotification,
    InitializeParams,
    InitializeResult,
    InitializedParams,
    Range,
    TextDocumentSyncKind,
    TextDocuments,
} from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import * as path from "path";
import { URI } from "vscode-uri";
import { LpcSymbolProvider } from "./SymbolProvider";

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
        this.connection.onDocumentSymbol((params) => {
            const doc = this.documents.get(params.textDocument.uri);
            const result = this.symbolProvider.getSymbols(doc);
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

                    this.facade.reparse(filename);
                    this.processDiagnostic(e.document);
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
                //hoverProvider: false,
                definitionProvider: false,
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

        return result;
    }

    /**
     * Processes diangostics for the given document and sends back to the language client.
     * @param document
     */
    private processDiagnostic(document: TextDocument) {
        const diagnostics: Diagnostic[] = [];
        const entries = this.facade.getDiagnostics(document.uri);

        for (const entry of entries) {
            const { start, end } = entry.range;
            const startRow = start.row === 0 ? 0 : start.row - 1;
            const endRow = end.row === 0 ? 0 : end.row - 1;

            const range = Range.create(
                startRow,
                start.column,
                endRow,
                end.column
            );
            const diagnostic = Diagnostic.create(
                range,
                entry.message,
                DiagnosticSeverity.Error
            );

            diagnostics.push(diagnostic);
        }

        this.connection.sendDiagnostics({ uri: document.uri, diagnostics });
    }
}
