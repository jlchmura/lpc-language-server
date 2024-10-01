import { Connection, Hover, InitializeResult, MarkedString, MarkupContent, MarkupKind, TextDocumentPositionParams, TextDocuments, TextDocumentSyncKind } from "vscode-languageserver";
import * as lpc from "../lpc/lpc.js";
import * as protocol from "../server/_namespaces/lpc.server.protocol.js";
import { Logger } from "./nodeServer";
import { TextDocument } from "vscode-languageserver-textdocument";
import { URI } from "vscode-uri";
import { loadLpcConfig } from "../backend/LpcConfig.js";

const logger = new Logger("server.log", true, lpc.server.LogLevel.verbose);

export function start(connection: Connection, platform: string) {
    logger.info(`Starting TS Server`);
    //logger.info(`Version: ${lpc.version}`);
    // logger.info(`Arguments: ${args.join(" ")}`);
    logger.info(`Platform: ${platform} NodeVersion: ${process.version} CaseSensitive: ${lpc.sys.useCaseSensitiveFileNames}`);
    //logger.info(`ServerMode: ${serverMode} hasUnknownServerMode: ${unknownServerMode}`);

    lpc.setStackTraceLimit();

    if (lpc.Debug.isDebugging) {        
        lpc.Debug.enableDebugInfo();
    }

    if (lpc.sys.tryEnableSourceMapsForHost && /^development$/i.test(lpc.sys.getEnvironmentVariable("NODE_ENV"))) {
        lpc.sys.tryEnableSourceMapsForHost();
    }

    // Overwrites the current console messages to instead write to
    // the log. This is so that language service plugins which use
    // console.log don't break the message passing between tsserver
    // and the client
    // console.log = (...args) => logger.msg(args.length === 1 ? args[0] : args.join(", "), lpc.server.Msg.Info);
    // console.warn = (...args) => logger.msg(args.length === 1 ? args[0] : args.join(", "), lpc.server.Msg.Err);
    // console.error = (...args) => logger.msg(args.length === 1 ? args[0] : args.join(", "), lpc.server.Msg.Err);

    const canonicalFilename = lpc.createGetCanonicalFileName(lpc.sys.useCaseSensitiveFileNames);
    const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

    function fromUri(uri: string): string {
        return URI.parse(uri).fsPath;
    }

    connection.onInitialize((params) => {                
        const capabilities = params.capabilities;
        const rootFolder = lpc.normalizePath(fromUri(params.workspaceFolders[0].uri));
        const projectFileName = lpc.normalizePath(lpc.combinePaths(rootFolder, "lpc-config.json"));

        const config = loadLpcConfig(projectFileName);

        const session = new lpc.server.Session({
            host: lpc.sys as lpc.server.ServerHost,
            cancellationToken: lpc.server.nullCancellationToken,
            byteLength: Buffer.byteLength,
            useSingleInferredProject: false,
            useInferredProjectPerProjectRoot: false,
            logger,
            canUseEvents: true,
            hrtime: process.hrtime,
            projectRootFolder: (rootFolder),            
        });                              

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
                //     resolveProvider: true,
                //     triggerCharacters: [">", "*"],
                // },
                // renameProvider: false,
                // documentSymbolProvider: true,
                // codeLensProvider: {
                //     resolveProvider: true,
                //     workDoneProgress: false,
                // },
                hoverProvider: true,
                // definitionProvider: true,
                // implementationProvider: true,
                // foldingRangeProvider: true, // change to true to enable server-based folding
                // signatureHelpProvider: {
                //     triggerCharacters: ["(", ","],
                // },
                // referencesProvider: true,
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

        documents.onDidOpen(e => {
            const filename = lpc.normalizePath(fromUri(e.document.uri));
            session.updateOpen({
                openFiles: [{file: filename, projectFileName }],
            });
        });
        
        connection.onHover(requestParams => {
            logger.info("Hover request");
                                    
            const args: lpc.server.protocol.FileLocationRequestArgs = {
                file: lpc.convertToRelativePath(fromUri(requestParams.textDocument.uri), rootFolder, f=>canonicalFilename(f)),                
                projectFileName,
                ...lspPosToLpcPos(requestParams),
            };

            const result = session.getQuickInfoWorker(args, false) as lpc.QuickInfo;
            
            const displayParts: string[] = result.displayParts?.map(pt=>pt.text);
            // // if document is a string then just add that, otherwise loop through the display parts
            // if (typeof result.documentation === "string") {
            //     displayParts.push(result.documentation);
            // } else {
            //     result.documentation.forEach(part => {                    
            //         displayParts.push(part.text);
            //     });
            // }
            
            return {
                contents: {
                    kind: MarkupKind.Markdown,
                    value: displayParts.join("\n"),
                }
            } satisfies Hover;
        });

        // find the lpc-config.json file
        // const rootFolderPath = findLpcRoot(folders);

        // // load the config
        // loadLpcConfig(path.join(rootFolderPath, "lpc-config.json"));        
        

        return result;        
    });
    
    connection.onInitialized(() => {
        connection.workspace.onDidChangeWorkspaceFolders((args) => {
            logger.info("Workspace folders changed");
        });
    });    
    
    documents.listen(connection);
    connection.listen();
}

//lpc.setStackTraceLimit();
//start(require("os").platform());

function lspPosToLpcPos(args: Pick<TextDocumentPositionParams, "position">): Pick<protocol.FileLocationRequestArgs, "line" | "offset"> {
    const {position} = args;    
    return { line: position.line + 1, offset: position.character + 1};
}