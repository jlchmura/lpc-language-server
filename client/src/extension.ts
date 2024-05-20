/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as path from "path";
import {
    workspace,
    ExtensionContext,
    languages,
    SemanticTokensLegend,
    DocumentSemanticTokensProvider,
    TextDocument,
    CancellationToken,
    ProviderResult,
    SemanticTokens,
    commands,
    TextEditor,
    TextEditorEdit,
    window,
} from "vscode";

import {
    DocumentSelector,
    LanguageClient,
    LanguageClientOptions,
    SemanticTokenModifiers,
    SemanticTokenTypes,
    SemanticTokensParams,
    ServerOptions,
    TransportKind,
} from "vscode-languageclient/node";
import { ProgressIndicator } from "./ProgressIndicator";

let client: LanguageClient;
const progress = new ProgressIndicator();

export function activate(context: ExtensionContext) {
    // The server is implemented in node
    const serverModule = context.asAbsolutePath(
        path.join("out", "server", "src", "server.js")
    );

    let debugOptions = { execArgv: ["--nolazy"] };

    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
    const serverOptions: ServerOptions = {
        run: { module: serverModule, transport: TransportKind.ipc },
        debug: {
            module: serverModule,
            transport: TransportKind.ipc,
            options: debugOptions,
        },
    };

    const docSel = [{ scheme: "file", language: "lpc" }];

    // Options to control the language client
    const clientOptions: LanguageClientOptions = {
        // Register the server for plain text documents
        documentSelector: docSel,
        synchronize: {
            // Notify the server about file changes to lpc config files contained in the workspace
            fileEvents: workspace.createFileSystemWatcher("**/lpc-config.json"),
        },
        diagnosticCollectionName: "LPC",
    };

    // Create the language client and start the client.
    client = new LanguageClient(
        "lpc",
        "LPC Language Server",
        serverOptions,
        clientOptions
    );

    // Start the client. This will also launch the server
    client.start();

    const provider: DocumentSemanticTokensProvider = {
        provideDocumentSemanticTokens: function (
            document: TextDocument,
            token: CancellationToken
        ): Promise<SemanticTokens> {
            //console.log("[Request] textDocument/semanticTokens/full");

            return client
                .sendRequest("textDocument/semanticTokens/full", {
                    textDocument: { uri: document.uri.toString() },
                })
                .catch((e) => {
                    console.error("Error sending semantic tokens request", e);
                    return e;
                })
                .then((res) => res as SemanticTokens);
        },
        onDidChangeSemanticTokens: null,
        provideDocumentSemanticTokensEdits: null,
    };

    const legend: SemanticTokensLegend = {
        tokenTypes: [
            "comment.block.preprocessor",
            SemanticTokenTypes.macro,
            SemanticTokenTypes.operator,
            SemanticTokenTypes.method,
            SemanticTokenTypes.parameter,
            "define",
            SemanticTokenTypes.string,
            SemanticTokenTypes.number,
            SemanticTokenTypes.type,
            SemanticTokenTypes.variable,
            SemanticTokenTypes.keyword,
            SemanticTokenTypes.modifier,
        ],
        tokenModifiers: [
            "",
            SemanticTokenModifiers.documentation,
            SemanticTokenModifiers.declaration,
            SemanticTokenModifiers.definition,
            SemanticTokenModifiers.static,
            SemanticTokenModifiers.defaultLibrary,
            "local",
        ],
    };

    context.subscriptions.push(
        languages.registerDocumentSemanticTokensProvider(
            docSel,
            provider,
            legend
        )
    );

    context.subscriptions.push(
        commands.registerCommand(
            "lpc.processAll",
            async (textEditor: TextEditor, _edit: TextEditorEdit) => {
                progress.startAnimation();
                return await client
                    .sendRequest("textDocument/processAll", {})
                    .catch((e) => {
                        console.error("Error sending process all request", e);
                        progress.stopAnimation();
                        return e;
                    });
            }
        )
    );

    client.onNotification("lpc/processAll-complete", (params) => {
        progress.stopAnimation();
    });

    client.onNotification("lpc/processing", (params) => {
        window.showInformationMessage(params);
    });
}

export function deactivate(): Thenable<void> | undefined {
    console.log("Deactivating extension");
    if (!client) {
        return undefined;
    }
    return client.stop();
}
