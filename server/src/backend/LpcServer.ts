import * as path from "path";
import { performance } from "perf_hooks";
import {
    Connection,
    DidChangeConfigurationNotification,
    InitializeParams,
    InitializeResult,
    TextDocumentSyncKind,
    TextDocuments,
} from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { URI } from "vscode-uri";
import { LpcFacade } from "./facade";
import { LpcSymbolProvider } from "./SymbolProvider";
import { LpcDefinitionProvider } from "./DefinitionProvider";
import { CodeLensProvider } from "./CodeLensProvider";
import { HoverProvider } from "./HoverProvider";
import { DiagnosticProvider } from "./DiagnosticProvider";
import { CompletionProvider } from "./CompletionProvider";
import { SignatureHelpProvider } from "./SignatureHelpProvider";
import { RenameProvider } from "./RenameProvider";
import { HighlightProvider } from "./HighlightProvider";
import { LpcConfig, loadLpcConfig } from "./LpcConfig";

const CHANGE_DEBOUNCE_MS = 150;

export class LpcServer {
    private importDir: string[] | undefined;
    private facade: LpcFacade;

    /** timers used to debounce change events */
    private changeTimers = new Map<string, NodeJS.Timeout>(); // Keyed by file name.

    private hasConfigurationCapability = false;
    private hasWorkspaceFolderCapability = false;
    private hasDiagnosticRelatedInformationCapability = false;

    // providers
    private symbolProvider: LpcSymbolProvider;
    private definitionProvider: LpcDefinitionProvider;
    private codeLenseProvider: CodeLensProvider;
    private hoverProvider: HoverProvider;
    private diagnosticProvider: DiagnosticProvider;
    private completionProvider: CompletionProvider;
    private signatureHelpProvider: SignatureHelpProvider;
    private renameProvider: RenameProvider;
    private highlighProvider: HighlightProvider;

    /** document listener */
    private readonly documents: TextDocuments<TextDocument> = new TextDocuments(
        TextDocument
    );

    constructor(private connection: Connection) {
        this.connection.onExit(() => {
            console.warn("Connection closed.");
        });
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

        this.connection.onDidChangeWatchedFiles((params) => {
            const configFileChange = params.changes.find((c) =>
                c.uri.endsWith("lpc-config.json")
            );
            if (!!configFileChange) {
                const configUri = URI.parse(configFileChange.uri);
                loadLpcConfig(configUri.fsPath);
                console.debug("LPC Config reloaded");

                // re-send diagnostics for all open files
                setTimeout(() => {
                    this.documents.all().forEach((doc) => {
                        this.processDiagnostic(doc.uri, doc.version);
                    });
                }, 10);
            }
        });

        // Symbol Provider
        this.connection.onDocumentSymbol((params) => {
            const doc = this.documents.get(params.textDocument.uri);
            try {
                const result = this.symbolProvider.getSymbols(doc);
                return result;
            } catch (e) {
                console.error(e);
                return [];
            }
        });

        // Definition Provider
        this.connection.onDefinition((params) => {
            const doc = this.documents.get(params.textDocument.uri);
            try {
                const result = this.definitionProvider.getDefinition(
                    doc,
                    params.position
                );
                return result;
            } catch (e) {
                console.error(e);
                return null;
            }
        });

        // implementation provider
        this.connection.onImplementation((params) => {
            const doc = this.documents.get(params.textDocument.uri);
            const result = this.definitionProvider.getDefinition(
                doc,
                params.position,
                true
            );
            return result;
        });

        // Codelense Provider
        // this.registerCodelensProvider();
        // this.connection.onCodeLensResolve((params) => {
        //     const result = this.codeLenseProvider.resolveCodeLens(params);
        //     return result;
        // });

        // Completion Provider
        this.connection.onCompletion(async (params) => {
            performance.mark("completion-start");

            console.debug("OnCompletion", params.textDocument.uri);
            const doc = this.documents.get(params.textDocument.uri);

            // force doc to update so that code completion can use the latest token positions
            // this is needed for situations where code completion is triggered automatically
            // (like a call_other arrow `->`)
            this.flushChangeTimer(doc);

            const result = this.completionProvider.provideCompletionItems(
                doc,
                params.position
            );

            performance.mark("completion-end");
            performance.measure(
                "completion",
                "completion-start",
                "completion-end"
            );

            return result;
        });
        this.connection.onCompletionResolve((item) => {
            return this.completionProvider.resolveCompletionItem(item);
        });

        // Hover Provider
        this.connection.onHover((params) => {
            const doc = this.documents.get(params.textDocument.uri);
            try {
                const result = this.hoverProvider.getHover(
                    doc.uri,
                    params.position
                );
                return result;
            } catch (e) {
                console.error(e);
                return null;
            }
        });

        // Signature Help Provider
        this.connection.onSignatureHelp((params) => {
            const doc = this.documents.get(params.textDocument.uri);
            try {
                this.flushChangeTimer(doc);
                return this.signatureHelpProvider.getSignatureHelp(
                    doc,
                    params.position
                );
            } catch (e) {
                console.error(e);
                return null;
            }
        });

        // Folding Provider
        this.connection.onFoldingRanges((params) => {
            const doc = this.documents.get(params.textDocument.uri);
            const result = this.facade.getFoldingRanges(doc.uri);
            return result;
        });

        // Rename Provider
        this.connection.onRenameRequest((params) => {
            const doc = this.documents.get(params.textDocument.uri);
            const { position, newName } = params;
            return this.renameProvider.handleRenameRequest(
                doc,
                position,
                newName
            );
        });

        // send document open/close/changes to facade
        this.documents.onDidOpen((e) => {
            this.facade.loadLpc(e.document.uri, e.document.getText());

            this.processDiagnostic(e.document.uri, e.document.version);
        });
        this.documents.onDidClose((e) => {
            this.facade.releaseLpc(e.document.uri);
        });

        this.documents.onDidChangeContent((e) => {
            const filename = e.document.uri;
            try {
                // always update text, but debounce reparse and other updates
                this.facade.setText(e.document);

                const timer = this.changeTimers.get(filename);
                if (timer) {
                    clearTimeout(timer);
                }

                this.changeTimers.set(
                    filename,
                    setTimeout(() => {
                        this.processDocChange(e.document);
                    }, CHANGE_DEBOUNCE_MS)
                );
            } catch (e) {
                console.error("Error in doc change content:\n", e);
            }
        });

        this.connection.onDocumentHighlight((params) => {
            const result = this.highlighProvider.getHighlights(
                params.textDocument.uri,
                params.position
            );
            return result;
        });

        // semantic token request
        this.connection.onRequest(
            "textDocument/semanticTokens/full",
            (params) => {
                const doc = this.documents.get(params.textDocument.uri);
                try {
                    performance.mark("semantic-token-request-start");

                    this.flushChangeTimer(doc);
                    const result = this.facade.getSemanticTokens(doc?.uri);

                    performance.mark("semantic-token-request-end");
                    performance.measure(
                        "semantic-token-request",
                        "semantic-token-request-start",
                        "semantic-token-request-end"
                    );

                    return result;
                } catch (e) {
                    console.error(
                        "Error in semantic token request:\n",
                        params,
                        e
                    );
                    return undefined;
                }
            }
        );

        this.connection.onRequest("textDocument/processAll", (params) => {
            this.connection.sendNotification(
                "lpc/processing",
                "Processing all files..."
            );

            const p = new Promise((resolve) => {
                this.facade.parseAllFiles();
                resolve(true);
            }).then(() => {
                this.connection.sendNotification(
                    "lpc/processAll-complete",
                    "Done processing all files."
                );
            });

            return true;
        });
    }

    /**
     * Checks if a file has a pending doc change and if so, forces the reparse ahead of schedule.
     * @param filename
     */
    private flushChangeTimer(document: TextDocument) {
        if (!document) {
            console.warn("null doc passed to change timer flush");
            return;
        }

        const filename = document.uri;
        const timer = this.changeTimers.get(filename);
        if (timer) {
            clearTimeout(timer);
            this.processDocChange(document);
        }
    }

    private processDocChange(document: TextDocument) {
        const filename = document.uri;
        this.changeTimers.delete(filename);
        this.codeLenseProvider.resolveCodeLens;
        this.facade.reparse(filename);

        this.processDiagnostic(document.uri, document.version);

        //force refresh codelense
        //this.registerCodelensProvider();
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
                completionProvider: {
                    resolveProvider: true,
                    triggerCharacters: [">", "*"],
                },
                renameProvider: true,
                documentSymbolProvider: true,
                // codeLensProvider: {
                //     resolveProvider: true,
                //     workDoneProgress: false,
                // },
                hoverProvider: true,
                definitionProvider: true,
                implementationProvider: true,
                foldingRangeProvider: true, // change to true to enable server-based folding
                signatureHelpProvider: {
                    triggerCharacters: ["(", ","],
                },
                //documentHighlightProvider: true,
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

        this.importDir = [
            path.join(rootFolderPath, "sys"),
            path.join(rootFolderPath, "obj"),
            path.join(rootFolderPath, "room"),
        ];

        // load the config
        loadLpcConfig(path.join(rootFolderPath, "lpc-config.json"));

        this.facade = new LpcFacade(this.importDir, rootFolderPath);

        // hook up the run diagnostic event emitter
        this.facade.onRunDiagnostics = (filename) => {
            const uri = URI.file(filename).toString();
            const doc = this.documents.get(uri);
            if (!!doc) {
                //this.flushChangeTimer(doc);
                this.processDiagnostic(doc.uri, doc.version);
            } else {
                this.processDiagnostic(uri, 0);
            }
        };

        // init providers
        this.symbolProvider = new LpcSymbolProvider(this.facade);
        this.definitionProvider = new LpcDefinitionProvider(this.facade);
        this.codeLenseProvider = new CodeLensProvider(this.facade);
        this.hoverProvider = new HoverProvider(this.facade);
        this.diagnosticProvider = new DiagnosticProvider(this.facade);
        this.completionProvider = new CompletionProvider(this.facade);
        this.signatureHelpProvider = new SignatureHelpProvider(this.facade);
        this.renameProvider = new RenameProvider(this.facade);
        this.highlighProvider = new HighlightProvider(this.facade);

        return result;
    }

    // private clDisp: Disposable;
    // private registerCodelensProvider() {
    //     if (!!this.clDisp) {
    //         this.clDisp.dispose();
    //     }
    //     this.clDisp = this.connection.onCodeLens((params) => {
    //         const doc = this.documents.get(params.textDocument.uri);
    //         const result = this.codeLenseProvider.provideCodeLenses(doc);
    //         return result;
    //     });
    // }

    public processDiagnostic(uri: string, version: number) {
        const result = this.diagnosticProvider.processDiagnostic(uri, version);

        // send grouped results
        for (const diagResult of result) {
            // console.debug(
            //     `Sending ${
            //         diagResult.diagnostics?.length ?? 0
            //     } diagnostics for ${diagResult.uri}`
            // );

            const { uri, diagnostics, version } = diagResult;

            this.connection.sendDiagnostics({
                uri,
                diagnostics,
                version,
            });
        }
    }
}
