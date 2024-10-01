import { Connection, Diagnostic, DiagnosticSeverity, Hover, InitializeResult, Location, MarkedString, MarkupContent, MarkupKind, TextDocumentPositionParams, TextDocuments, TextDocumentSyncKind } from "vscode-languageserver";
import * as ls from "vscode-languageserver";
import * as lpc from "../lpc/lpc.js";
import * as protocol from "../server/_namespaces/lpc.server.protocol.js";
import { Logger } from "./nodeServer";
import { Position, TextDocument } from "vscode-languageserver-textdocument";
import { URI } from "vscode-uri";
import { loadLpcConfig } from "../backend/LpcConfig.js";
import EventEmitter from "events";

const logger = new Logger("server.log", true, lpc.server.LogLevel.verbose);


class LspSession extends lpc.server.Session {

    public onMessage = new EventEmitter();

    protected override writeMessage(msg: lpc.server.protocol.Message): void {
        const verboseLogging = logger.hasLevel(lpc.server.LogLevel.verbose);
        if (verboseLogging) {
            const json = JSON.stringify(msg);
            logger.info(`${msg.type}:${lpc.server.indent(json)}`);
        }

        this.onMessage.emit("message", msg);
        //process.send!(msg);
    }
}

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

        const host = lpc.sys as lpc.server.ServerHost;
        host.setImmediate = setImmediate;
        const session = new LspSession({
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

        session.onMessage.on("message", (msg: lpc.server.protocol.Message) => {
            if (msg.type === "event") {
                const e = msg as lpc.server.protocol.Event;
                switch (e.event) {
                    case "semanticDiag":
                        if (e.body) {
                            const { file, diagnostics } = e.body as lpc.server.protocol.DiagnosticEventBody;
                            const uri = URI.file(file).toString();
                            const doc = documents.get(uri);
                            
                            // convert typescript server diagnostics to language server diagnostics
                            const lsDiags = diagnostics.map(d => {                                
                                const start = locationToLspPosition(d.start);
                                const end = locationToLspPosition(d.end);
                                return {
                                    range: {
                                        start,
                                        end,
                                    },
                                    message: d.text,
                                    severity: ls.DiagnosticSeverity.Error,
                                    code: d.code,
                                } satisfies ls.Diagnostic;
                            });

                            if (doc) {
                                connection.sendDiagnostics({ uri, diagnostics: lsDiags });
                            }
                        }
                        break;
                }
            }            
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

        function docOpenChange(e: TextDocument) {
            const filename = lpc.normalizePath(fromUri(e.uri));
            session.updateOpen({
                openFiles: [{file: filename, projectFileName }],
            });
            
            session.getDiagnosticsForFiles({files: [filename], delay: 0});
        }

        documents.onDidOpen(e => {            
            docOpenChange(e.document);
        });

        documents.onDidChangeContent(e => {
            docOpenChange(e.document);
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

function locationToLspPosition(loc: protocol.Location): Position {
    return {        
        line: loc.line - 1,
        character: loc.offset - 1,
    };    
}