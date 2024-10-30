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
    DefinitionProvider,
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

    // get location of efuns folder and pass to server as an argument
    const efunDir = context.asAbsolutePath("efuns");

    let debugOptions = {
        execArgv: ["--nolazy", "--enable-source-maps", "--inspect", "--max-old-space-size=4028"]        
    };

    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
    const serverOptions: ServerOptions = {
        run: {
            module: serverModule,
            transport: TransportKind.ipc,
            options: { execArgv: ["--enable-source-maps"] },
            args: [efunDir],
        },
        debug: {
            module: serverModule,
            transport: TransportKind.ipc,
            options: debugOptions,
            args: [efunDir],
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
            console.log("[Request] textDocument/semanticTokens/full");

            return client
                .sendRequest("encodedSemanticClassifications-full", {
                    arguments: { file: document.uri.toString(),
                        start: 0, 
                        length: document.getText().length
                     },
                }, token)
                .catch((e) => {
                    console.error("Error sending semantic tokens request", e);
                    return e;
                })
                .then((res) => {
                    return res as SemanticTokens
                });
        },
        onDidChangeSemanticTokens: null,
        provideDocumentSemanticTokensEdits: null,
    };

    const legend: SemanticTokensLegend = {
        tokenTypes: [
            "comment-block-preprocessor",
            SemanticTokenTypes.macro,
            SemanticTokenTypes.operator,
            SemanticTokenTypes.method,
            SemanticTokenTypes.parameter,
            "define",
            SemanticTokenTypes.string,
            SemanticTokenTypes.number,
            "lpc-type",
            SemanticTokenTypes.variable,
            SemanticTokenTypes.property,
            "lambda",
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

    // const p: DefinitionProvider = {
    //     // provideDefinition(document: TextDocument, position: any, token: CancellationToken) {
    //     //     return client.sendRequest("textDocument/definition", {
    //     //         textDocument: { uri: document.uri.toString() },
    //     //         position: position
    //     //     }).then((res) => res);
    //     // }
    //     provideDefinition(document, position, cancellationToken) {
    //         const token = document.getWordRangeAtPosition(position);
    //         const word = document.getText(token);
    //         return [];
    //     },
    // };

    // context.subscriptions.push(languages.registerDefinitionProvider(docSel, p));

    context.subscriptions.push(
        commands.registerCommand(
            "lpc.processAll",
            async (textEditor: TextEditor, _edit: TextEditorEdit) => {
                client?.diagnostics?.clear();
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

    client.onNotification("lpc/processing-start", (params) => {
        progress.startAnimation();
    });
    client.onNotification("lpc/processing-stop", (params) => {
        progress.stopAnimation();
    });
    client.onNotification("lpc/processing-complete", (params) => {
        progress.stopAnimation();
    });
    client.onNotification("lpc/processing", (params) => {
        window.showInformationMessage(params);
    });
    client.onNotification("lpc/info", (params) => {
        window.showWarningMessage(params);
    });
    client.onNotification("lpc/set-driver-type", (params: string) => {
        progress.driverType = params;
    });
}

export function deactivate(): Thenable<void> | undefined {
    console.log("Deactivating extension");
    if (!client) {
        return undefined;
    }
    return client.stop();
}
