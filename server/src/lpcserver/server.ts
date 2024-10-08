import { Connection, Diagnostic, DiagnosticSeverity, Hover, InitializeResult, Location, MarkedString, MarkupContent, MarkupKind, TextDocumentPositionParams, TextDocuments, TextDocumentSyncKind } from "vscode-languageserver";
import * as vscode from "vscode-languageserver";
import * as lpc from "../lpc/lpc.js";
import { Debug } from "../lpc/lpc.js";
import * as protocol from "../server/_namespaces/lpc.server.protocol.js";
import { Logger } from "./nodeServer";
import { Position, TextDocument } from "vscode-languageserver-textdocument";
import { URI } from "vscode-uri";
import { loadLpcConfig } from "../backend/LpcConfig.js";
import EventEmitter from "events";
import { convertNavTree } from "./utils.js";
import * as typeConverters from './typeConverters';
import { KindModifiers } from "./protocol.const.js";

const logger = new Logger("server.log", true, lpc.server.LogLevel.verbose);

const serverCapabilities: vscode.ServerCapabilities = {
    textDocumentSync: TextDocumentSyncKind.Incremental,                
    // Tell the client that this server supports code completion.
    completionProvider: {
        resolveProvider: false,
        triggerCharacters: lpc.CompletionTriggerCharacterArray,
    },
    renameProvider: true,
    documentSymbolProvider: true,
    // codeLensProvider: {
    //     resolveProvider: true,
    //     workDoneProgress: false,
    // },
    hoverProvider: true,
    definitionProvider: true,
    // implementationProvider: true,
    // foldingRangeProvider: true, // change to true to enable server-based folding
    // signatureHelpProvider: {
    //     triggerCharacters: ["(", ","],
    // },
    referencesProvider: true,
    //documentHighlightProvider: true,
};

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

    override exit() {
        this.logger.info("Exiting...");
        this.getDiagnosticsForProject
        // tracing?.stopTracing();
        process.exit(0);
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
                    case "allDiag":
                    // case "suggestionDiag":                
                    // case "syntaxDiag":
                    // case "semanticDiag":
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
                                    severity: vscode.DiagnosticSeverity.Error,
                                    code: d.code,
                                } satisfies vscode.Diagnostic;
                            });

                            if (doc && lsDiags) {
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

        const initResult: InitializeResult = {
            capabilities: serverCapabilities,
        };

        if (this.hasWorkspaceFolderCapability) {
            initResult.capabilities.workspace = {
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
            
            session.getDiagnosticsForFiles({files: [filename], delay: 0});
        });
               
        documents.onDidClose(e => {
            const filename = lpc.normalizePath(fromUri(e.document.uri));                        
            session.updateOpen({
                closedFiles: [filename],
            });
        })

        connection.onDidChangeTextDocument((e: vscode.DidChangeTextDocumentParams) => {
            const filename = lpc.normalizePath(fromUri(e.textDocument.uri));
            const lspChanges = e.contentChanges;
            
            // convert LSP text change to LPC CodeEdits
            const changes: protocol.CodeEdit[] = [];
            for (const lspChange of lspChanges) {
                if (vscode.TextDocumentContentChangeEvent.isIncremental(lspChange)) {
                    changes.push({start: lspPosToLpcPos(lspChange.range.start), end: lspPosToLpcPos(lspChange.range.end), newText: lspChange.text});
                } else {
                    changes.push({start: {line: 1, offset: 1}, end: {line: 1, offset: 1}, newText: lspChange.text});
                }
            }

            session.updateOpen({
                changedFiles: [{fileName: filename, textChanges: changes }],
            });

            session.getDiagnosticsForFiles({files: [filename], delay: 100});
        });

        connection.onShutdown(e=>{
            session.exit();
        });

        connection.onDocumentSymbol(requestParams => {
            const uri = URI.parse(requestParams.textDocument.uri);
            const args: lpc.server.protocol.FileRequestArgs = {
                file: fromUri(requestParams.textDocument.uri),
                projectFileName,
            };

            try {
            const result = session.getNavigationTree(args, true) as protocol.NavigationTree;
            
            const navResults: vscode.DocumentSymbol[] = [];
            if (result?.childItems) {
                for (const item of result.childItems) {
                    convertNavTree(uri, navResults, item);
                }
            }

            return navResults;
            } catch(e) {                
                console.error(e);
            }
        });

        connection.onReferences(requestParams => {
            const args: lpc.server.protocol.FileLocationRequestArgs = {
                file: lpc.convertToRelativePath(fromUri(requestParams.textDocument.uri), rootFolder, f=>canonicalFilename(f)),
                projectFileName,
                ...posParamToLpcPos(requestParams),
            };

            const body = session.getReferences(args, true) as protocol.ReferencesResponseBody;    
            const result: vscode.Location[] = [];
            const uri = URI.parse(requestParams.textDocument.uri);

            for (const ref of body?.refs) {
                // if (!options.includeDeclaration && ref.isDefinition) {
                //     continue;
                // }                
                const location = typeConverters.Location.fromTextSpan(URI.parse(ref.file), ref);
                result.push(location);
            }

            return result;
        });

        connection.onPrepareRename(requestParams => {
            const args: lpc.server.protocol.FileLocationRequestArgs = {
                file: lpc.convertToRelativePath(fromUri(requestParams.textDocument.uri), rootFolder, f=>canonicalFilename(f)),
                projectFileName,
                ...posParamToLpcPos(requestParams),
            };

            const result = session.getRenameLocations(args, true) as protocol.RenameResponseBody;            
            if (!result) {
                return undefined;
            }

            const renameInfo = result.info;
            if (!renameInfo.canRename) {
                return undefined;
            } 
            return typeConverters.Range.fromTextSpan(renameInfo.triggerSpan);             
        });

        connection.onRenameRequest(requestParams => {
            const args: lpc.server.protocol.RenameRequestArgs = {
                file: lpc.convertToRelativePath(fromUri(requestParams.textDocument.uri), rootFolder, f=>canonicalFilename(f)),
                projectFileName,
                ...posParamToLpcPos(requestParams),
                findInStrings: false,
                findInComments: false,
            };

            const result = session.getRenameLocations(args, true) as protocol.RenameResponseBody;
            if (!result) {
                return undefined;
            }
            
            const renameInfo = result.info;
            if (!renameInfo.canRename) {
                return undefined;
            }

            if (renameInfo.fileToRename) {
                Debug.fail("todo - file rename");
            }

            return typeConverters.WorkspaceEdit.fromRenames(result.locs, requestParams.newName);
        });

        connection.onHover(requestParams => {
            const args: lpc.server.protocol.FileLocationRequestArgs = {
                file: lpc.convertToRelativePath(fromUri(requestParams.textDocument.uri), rootFolder, f=>canonicalFilename(f)),                
                projectFileName,
                ...posParamToLpcPos(requestParams),
            };

            const result = session.getQuickInfoWorker(args, false) as lpc.QuickInfo;
            
            const displayParts: string[] = result?.displayParts?.map(pt=>pt.text) ?? [];
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
                    value: displayParts.join(" "),
                }
            } satisfies Hover;
        });

        connection.onDefinition(requestParams => {
            const results = session.getDefinition({
                file: lpc.convertToRelativePath(fromUri(requestParams.textDocument.uri), rootFolder, f=>canonicalFilename(f)),
                projectFileName,
                ...posParamToLpcPos(requestParams),            
            }, true);
            
            const result = results.at(0) as any;             
            if (!result) {
                return [];
            }
            const def = vscode.LocationLink.create(
                result.file,
                {
                    start: locationToLspPosition(result.start),
                    end: locationToLspPosition(result.end),
                },
                {
                    start: locationToLspPosition(result.start),
                    end: locationToLspPosition(result.end),
                },
            )    
            return [def];
        });

        connection.onCompletion(requestParams => {
            const args: lpc.server.protocol.CompletionsRequestArgs = {
                file: lpc.convertToRelativePath(fromUri(requestParams.textDocument.uri), rootFolder, f=>canonicalFilename(f)),
                projectFileName,
                ...posParamToLpcPos(requestParams),
                prefix: requestParams.context.triggerCharacter,
            };

            const result = session.getCompletions(args, protocol.CommandTypes.CompletionInfo) as protocol.CompletionInfo;
            if (!result) {
                return [];
            }

            const items: vscode.CompletionItem[] = [];  
            for (const entry of result.entries) {                
                const kindModifiers = typeConverters.CompletionKind.parseKindModifier(entry.kindModifiers);

                const item: vscode.CompletionItem = {
                    label: entry.name || (entry.insertText ?? ''),
                    kind: typeConverters.CompletionKind.fromKind(entry.kind),                    
                    detail: typeConverters.CompletionKind.getDetails(entry),                                        
                    sortText: entry.sortText,
                    insertText: entry.insertText,
                    insertTextFormat: entry.isSnippet ? vscode.InsertTextFormat.Snippet : vscode.InsertTextFormat.PlainText,
                };
                
                if (kindModifiers.has(KindModifiers.deprecated)) {
                    item.tags = [vscode.CompletionItemTag.Deprecated];
                }

                items.push(item);
            }

            return items;
        });

        // find the lpc-config.json file
        // const rootFolderPath = findLpcRoot(folders);

        // // load the config
        // loadLpcConfig(path.join(rootFolderPath, "lpc-config.json"));        
        
        return initResult;
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

function posParamToLpcPos(args: Pick<TextDocumentPositionParams, "position">): protocol.Location {
    const {position} = args;    
    return { line: position.line + 1, offset: position.character + 1};
}

function lspPosToLpcPos(position: vscode.Position): protocol.Location {        
    return { line: position.line + 1, offset: position.character + 1};
}


function locationToLspPosition(loc: protocol.Location): Position {
    return {        
        line: loc.line - 1,
        character: loc.offset - 1,
    };    
}
