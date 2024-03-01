import { LpcFacade } from "./facade";
import {
    CompletionItem,
    CompletionList,
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
    MarkupContent,
    OptionalVersionedTextDocumentIdentifier,
    Position,
    Range,
    TextDocumentEdit,
    TextDocumentSyncKind,
    TextDocuments,
    TextEdit,
    WorkspaceEdit,
} from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import * as path from "path";
import { URI } from "vscode-uri";
import { LpcSymbolProvider } from "./SymbolProvider";
import { LpcDefinitionProvider } from "./DefinitionProvider";
import { IDiagnosticEntry, ILexicalRange } from "../types";
import { CodeLensProvider } from "./CodeLensProvider";
import {
    completionDetails,
    completionSortKeys,
    translateCompletionKind,
} from "../symbols/Symbol";
import { HoverProvider } from "./HoverProvider";
import { lexRangeToLspRange } from "../utils";
import { DiagnosticProvider } from "./DiagnosticProvider";

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
    private hoverProvider: HoverProvider;
    private diagnosticProvider: DiagnosticProvider;

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
        // this.registerCodelensProvider();
        // this.connection.onCodeLensResolve((params) => {
        //     const result = this.codeLenseProvider.resolveCodeLens(params);
        //     return result;
        // });

        // Completion Provider
        this.connection.onCompletion(async (params) => {
            const doc = this.documents.get(params.textDocument.uri);
            return this.provideCompletionItems(doc, params.position);
        });
        this.connection.onCompletionResolve((item) => {
            return item;
        });

        // Hover Provider
        this.connection.onHover((params) => {
            const doc = this.documents.get(params.textDocument.uri);
            const result = this.hoverProvider.getHover(
                doc.uri,
                params.position
            );
            return result;
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
            const position = params.position;
            const info = this.facade.symbolInfoAtPosition(
                doc.uri,
                position.character,
                position.line + 1,
                false
            );

            if (info) {
                const result: WorkspaceEdit = { changes: {} };
                const occurrences = this.facade.getSymbolOccurrences(
                    doc.uri,
                    info.name
                );
                for (const symbol of occurrences) {
                    if (symbol.definition) {
                        const range = Range.create(
                            symbol.definition.range.start.row - 1,
                            symbol.definition.range.start.column,
                            symbol.definition.range.end.row - 1,
                            symbol.definition.range.start.column +
                                info.name.length
                        );

                        result.changes[symbol.source] =
                            result.changes[symbol.source] ?? [];
                        result.changes[symbol.source].push(
                            TextEdit.replace(range, params.newName)
                        );
                    }
                }

                return result;
            } else {
                undefined;
            }
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
                completionProvider: {
                    resolveProvider: true,
                },
                renameProvider: true,
                documentSymbolProvider: true,
                // codeLensProvider: {
                //     resolveProvider: true,
                //     workDoneProgress: false,
                // },
                hoverProvider: true,
                definitionProvider: true,
                foldingRangeProvider: true, // change to true to enable server-based folding
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
        this.hoverProvider = new HoverProvider(this.facade);
        this.diagnosticProvider = new DiagnosticProvider(this.facade);

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

    private async provideCompletionItems(
        document: TextDocument,
        position: Position
    ): Promise<CompletionItem[]> {
        return this.facade
            .getCodeCompletionCandidates(
                document.uri,
                position.character,
                position.line + 1
            )
            .then((candidates) => {
                const completionList: CompletionItem[] = [];
                candidates.forEach((info) => {
                    const item = CompletionItem.create(info.name);
                    item.kind = translateCompletionKind(info.kind);
                    item.sortText =
                        (completionSortKeys.get(info.kind) ?? "99") + info.name;
                    item.detail =
                        info.description !== undefined
                            ? info.description
                            : completionDetails.get(info.kind);
                    // item.documentation = {
                    //     value: "```\n" + info.definition?.text + "\n```",
                    //     kind: "markdown",
                    // } as MarkupContent;
                    completionList.push(item);
                });
                return completionList;
            });
    }

    private processDiagnostic(document: TextDocument) {
        const results = this.diagnosticProvider.processDiagnostic(document);
        this.connection.sendDiagnostics({
            uri: document.uri,
            diagnostics: results,
            version: document.version,
        });
        return results;
    }
}
