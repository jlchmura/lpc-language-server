import { Connection, Hover, InitializeResult, MarkupKind, TextDocumentPositionParams, TextDocuments, TextDocumentSyncKind, WorkspaceFolder } from "vscode-languageserver";
import * as vscode from "vscode-languageserver";
import * as lpc from "../lpc/lpc.js";
import * as protocol from "../server/_namespaces/lpc.server.protocol.js";
import { Logger } from "./nodeServer";
import { Position, TextDocument } from "vscode-languageserver-textdocument";
import { URI } from "vscode-uri";
import EventEmitter from "events";
import { convertNavTree, getFileResourceConverter } from "./utils.js";
import * as typeConverters from './typeConverters';
import { KindModifiers } from "./protocol.const.js";
import { CompletionEntryDetails, Range, SignatureHelp } from "./typeConverters";
import { getHeapStatistics } from "v8";
import { addMarkdownDocumentation, documentationToMarkdown, IFilePathToResourceConverter } from "./textRendering.js";
import { MarkdownString } from "./MarkdownString.js";

// generate a unique 5 digit it
// const randomId = Math.floor(Math.random() * 90000) + 10000;
// const logFilename = `lpc-server-${randomId}.log`;
const logger = new Logger(undefined, true, lpc.server.LogLevel.normal);
// const origLog = console.log;
// console.log = (...args) => { logger.info(args.length === 1 ? args[0] : args.join(", ")); origLog(...args); };
// const origErr = console.error;
// console.error = (...args) => { logger.err(args.length === 1 ? args[0] : args.join(", ")); origErr(...args); };
// const origInfo = console.info;
// console.info = (...args) => { logger.info(args.length === 1 ? args[0] : args.join(", ")); origInfo(...args); };
// const origDebug = console.debug;
// console.debug = (...args) => { logger.info(args.length === 1 ? args[0] : args.join(", ")); origDebug(...args); };

const DIAG_DELAY = 0;

// see https://github.com/microsoft/vscode/blob/2e93ebce771522202158ee335d2c36d10ce086ea/extensions/typescript-language-features/src/tsServer/server.ts#L495 
// for details on which operations should be routed to semantic and which to syntax
const serverCapabilities: vscode.ServerCapabilities = {
    textDocumentSync: TextDocumentSyncKind.Incremental,    
    completionProvider: {
        resolveProvider: true,        
        triggerCharacters: lpc.CompletionTriggerCharacterArray,        
    },
    renameProvider: true,
    // documentSymbolProvider: false, // this happens in syntax mode
    // codeLensProvider: {
    //     resolveProvider: true,
    //     workDoneProgress: false,
    // },
    hoverProvider: true,
    definitionProvider: true,
    // implementationProvider: true,
    // foldingRangeProvider: true, // change to true to enable server-based folding
    signatureHelpProvider: {
        triggerCharacters: ["(", ","],
    },
    referencesProvider: true,
    //documentHighlightProvider: true,
};

const syntaxServerCapabilities: vscode.ServerCapabilities = {
    textDocumentSync: TextDocumentSyncKind.Incremental,                        
    documentSymbolProvider: true    
};

class LspSession extends lpc.server.Session {

    public onOutput = new EventEmitter();

    protected override writeMessage(msg: lpc.server.protocol.Message): void {
        const verboseLogging = logger.hasLevel(lpc.server.LogLevel.verbose);
        if (verboseLogging) {
            const json = JSON.stringify(msg);
            logger.info(`${msg.type}:${lpc.server.indent(json)}`);
        }

        this.onOutput.emit("message", msg);        
    }

    override exit() {
        this.logger.info("Exiting...");                
        // tracing?.stopTracing();
        process.exit(0);
    }
}

function findArgument(arg: string): string | undefined {
    return lpc.findArgument(arg, lpc.sys.args); 
}

function parseLocale(): string | undefined {
    const locale = findArgument("--locale");
    return locale;
}


function parseServerMode(): lpc.LanguageServiceMode | undefined {
    const mode = findArgument("--serverMode");
    if (!mode) return undefined;

    switch (mode.toLowerCase()) {
        case "semantic":
            return lpc.LanguageServiceMode.Semantic;
        case "partialsemantic":
            return lpc.LanguageServiceMode.PartialSemantic;
        case "syntactic":
            return lpc.LanguageServiceMode.Syntactic;
        default:
            return lpc.LanguageServiceMode.Semantic;
    }
}

export function start(connection: Connection, platform: string, args: string[]) {    
    const serverMode = parseServerMode() ?? lpc.LanguageServiceMode.Semantic;
    const logPrefix = serverMode === lpc.LanguageServiceMode.Syntactic ? "Syntactic: " : "";
    logger.info(`${logPrefix}Starting LPC Server`);
    // logger.info(`${logPrefix}Version: ${lpc.version}`); // removing for now because I keep forgetting to update this const
    logger.info(`${logPrefix}Arguments: ${args.join(" ")}`);
    logger.info(`${logPrefix}Platform: ${platform} NodeVersion: ${process.version} CaseSensitive: ${lpc.sys.useCaseSensitiveFileNames}`);
    logger.info(`${logPrefix}ServerMode: ${serverMode}`)
    logger.info(`${logPrefix}PID: ${process.pid}`);
    
    const locale = parseLocale();    
    logger.info(`${logPrefix}Locale: ${parseLocale()}`);    
    if (locale) lpc.validateLocaleAndSetLanguage(locale, lpc.sys);
    
    try {
        logger.info(`${logPrefix}Heap Limit: ${Math.round(getHeapStatistics().heap_size_limit / 1024 / 1024)} MB`);    
    } catch {}

    if (serverMode === lpc.LanguageServiceMode.Syntactic) {
        logger.info("No further log entries will be generated for syntactic server");
        logger.close();
    }
    
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
    let sequence = 0;

    let cancellationToken: lpc.server.ServerCancellationToken;
    try {
        const factory = require("../cancellationToken/cancellationToken.js")
        cancellationToken = factory(lpc.sys.args);
    } catch (e) {
        cancellationToken = lpc.server.nullCancellationToken;
    }
    
    
    function fromUri(uri: string): string {        
        return uri.startsWith("file://") ? URI.parse(uri).fsPath : uri;
    }

    connection.onInitialize((params) => {                
        const capabilities = params.capabilities;
        const rootFolder = params.workspaceFolders ? lpc.normalizePath(fromUri(params.workspaceFolders[0].uri)) : "";
        // const projectFileName = lpc.normalizePath(lpc.combinePaths(rootFolder, "lpc-config.json"));

        // const config = loadLpcConfig(projectFileName);

        const host = lpc.sys as lpc.server.ServerHost;
        host.setTimeout = setTimeout;
        host.clearTimeout = clearTimeout;
        host.setImmediate = setImmediate;
        host.clearImmediate = clearImmediate;       
        
        const session = new LspSession({
            host: lpc.sys as lpc.server.ServerHost,
            cancellationToken,
            byteLength: Buffer.byteLength,
            useSingleInferredProject: true,
            useInferredProjectPerProjectRoot: false,
            logger,
            canUseEvents: true,
            hrtime: process.hrtime,
            projectRootFolder: (rootFolder),            
            serverMode
        });                              
        
        const inferredOptions: protocol.InferredProjectCompilerOptions = {};        
        const driverTypeArg = findArgument("--driverType");
        inferredOptions.driverType = driverTypeArg === "fluffos" ? lpc.LanguageVariant.FluffOS : lpc.LanguageVariant.LDMud;        

        session.setCompilerOptionsForInferredProjects({options:inferredOptions});

        session.onOutput.on("message", (msg: lpc.server.protocol.Message) => {
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
                            const lsDiags = diagnostics.map(d => typeConverters.Diagnostic.fromDiagnostic(d));

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
            capabilities: serverMode===lpc.LanguageServiceMode.Semantic ? serverCapabilities : syntaxServerCapabilities,
        };

        if (this.hasWorkspaceFolderCapability) {
            initResult.capabilities.workspace = {
                workspaceFolders: {
                    supported: true,
                },
            };
        }

        documents.onDidOpen(e => {                        
            const filename = fromUri(e.document.uri);            
            const projectRootPath = getWorkspaceRootForResource(URI.parse(e.document.uri))?.fsPath;

            executeRequest<protocol.OpenRequest>(protocol.CommandTypes.Open, {
                file: filename, 
                fileContent: e.document.getText(), 
                scriptKindName: "LPC", 
                projectRootPath
            });

            // executeRequest<protocol.UpdateOpenRequest>(protocol.CommandTypes.UpdateOpen, {openFiles: [{file:filename}]});
            if (serverMode !== lpc.LanguageServiceMode.Syntactic) {
                executeRequest<protocol.GeterrRequest>(protocol.CommandTypes.Geterr, {delay: 0, files: [filename]});
            }
        });
               
        documents.onDidClose(e => {
            const filename = fromUri(e.document.uri);
            executeRequest<protocol.Request>(protocol.CommandTypes.Close, {file: filename});            
        });

        connection.onDidChangeWatchedFiles(e => {            
            if (e.changes.length > 0 && serverMode !== lpc.LanguageServiceMode.Syntactic) {                    
                const allDocs = documents.all().map(d => fromUri(d.uri));
                const docSet = new Set(allDocs);                
                const getErrDocs = Array.from(docSet);
                // add a slight delay to let the config update
                // delay longer than ensure project delay in editorService
                executeRequest<protocol.GeterrRequest>(protocol.CommandTypes.Geterr, {delay: 2550, files: getErrDocs});
            }
        });
                
        connection.onDidChangeTextDocument((e: vscode.DidChangeTextDocumentParams) => {
            try {                
                const filename = fromUri(e.textDocument.uri);
                const lspChanges = e.contentChanges;
        
                // convert LSP text change to LPC CodeEdits
                const changes: protocol.CodeEdit[] = [];
                let change: protocol.CodeEdit;                
                for (const lspChange of lspChanges) {
                    let line = 0;
                    let offset = 0;
                    let endLine = 0;
                    let endOffset = 0;
                    
                    if (vscode.TextDocumentContentChangeEvent.isIncremental(lspChange)) {                    
                        // change = {start: lspPosToLpcPos(lspChange.range.start), end: lspPosToLpcPos(lspChange.range.end), newText: lspChange.text};
                        line = lspChange.range.start.line + 1;
                        offset = lspChange.range.start.character + 1;
                        endLine = lspChange.range.end.line + 1;
                        endOffset = lspChange.range.end.character + 1;
                    } else {
                        // change = {start: {line: 1, offset: 1}, end: {line: 1, offset: 1}, newText: lspChange.text};
                        line = 1;
                        offset = 1;
                        // const endPos = document.positionAt(document.getText().length);
                        endLine = 1;
                        endOffset = 1;
                    }
                    changes.push(change);
                    executeRequest<protocol.ChangeRequest>(protocol.CommandTypes.Change, { 
                        file: filename,
                        line,
                        offset,
                        endLine,
                        endOffset,
                        insertString: lspChange.text,
                    });
                }
                
                if (serverMode !== lpc.LanguageServiceMode.Syntactic) {                    
                    const allDocs = documents.all().map(d => fromUri(d.uri));
                    const docSet = new Set(allDocs);
                    docSet.add(filename);
                    const getErrDocs = Array.from(docSet);
                    executeRequest<protocol.GeterrRequest>(protocol.CommandTypes.Geterr, {delay: DIAG_DELAY, files: getErrDocs});
                }
            } catch(ex) {
                console.error(ex);
                debugger;
            }
        });        

        connection.onShutdown(e=>{
            session.exit();
        });

        connection.onDocumentSymbol(requestParams => {
            const uri = URI.parse(requestParams.textDocument.uri);
            const args: lpc.server.protocol.FileRequestArgs = {
                file: fromUri(requestParams.textDocument.uri)                
            };

            const result = executeRequest<protocol.FileRequest, protocol.NavigationTree>(protocol.CommandTypes.NavTree, args);
            const navResults: vscode.DocumentSymbol[] = [];

            try {                        
                if (result?.childItems) {
                    for (const item of result.childItems) {
                        convertNavTree(uri, navResults, item);
                    }
                }            
            } catch(e) {                
                console.error(e);              
            }

            return navResults;
        });

        connection.onReferences(requestParams => {
            const args: lpc.server.protocol.FileLocationRequestArgs = {
                file: fromUri(requestParams.textDocument.uri),
                ...posParamToLpcPos(requestParams),
            };

            const body = executeRequest<protocol.FileLocationRequest, protocol.ReferencesResponseBody>(protocol.CommandTypes.References, args);
            const result: vscode.Location[] = [];
            
            try {                
                for (const ref of body?.refs ?? lpc.emptyArray) {
                    // if (!options.includeDeclaration && ref.isDefinition) {
                    //     continue;
                    // }                
                    const location = typeConverters.Location.fromTextSpan(URI.file(ref.file), ref);
                    result.push(location);
                }                
            } catch(e) {                
                console.error(e);
                debugger;
            }

            return result;
        });

        connection.onPrepareRename(requestParams => {
            const args: lpc.server.protocol.FileLocationRequestArgs = {
                file: fromUri(requestParams.textDocument.uri),
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
                file: fromUri(requestParams.textDocument.uri),
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
                lpc.Debug.fail("todo - file rename");
            }            

            return typeConverters.WorkspaceEdit.fromRenames(result.locs, requestParams.newName);
        });
        
        connection.onRequest("compilerOptionsForInferredProjects", (requestParams: protocol.SetCompilerOptionsForInferredProjectsArgs) => {
            session.setCompilerOptionsForInferredProjects(requestParams);
        });

        connection.onRequest("projectInfo", (requestParams: protocol.ProjectInfoRequest) => {
            const args: lpc.server.protocol.ProjectInfoRequestArgs = {
                ... requestParams.arguments,
                file: fromUri(requestParams.arguments.file),
            };

            const result = executeRequest<protocol.ProjectInfoRequest, protocol.ProjectInfo>(protocol.CommandTypes.ProjectInfo, args);
            return result;            
        });

        connection.onRequest("docCommentTemplate", (requestParams: protocol.DocCommentTemplateRequest) => {
            const args: lpc.server.protocol.FileLocationRequestArgs = {
                ... requestParams.arguments,
                file: fromUri(requestParams.arguments.file)
            };

            const result = executeRequest<protocol.DocCommentTemplateRequest, lpc.TextInsertion>(protocol.CommandTypes.DocCommentTemplate, args);
            return result;            
        });

        connection.onRequest("encodedSemanticClassifications-full", (requestParams:protocol.EncodedSemanticClassificationsRequest) => {            
            const args: lpc.server.protocol.EncodedSemanticClassificationsRequestArgs = {
                ... requestParams.arguments,
                file: fromUri(requestParams.arguments.file),
            };
                
            const result = executeRequest<protocol.EncodedSemanticClassificationsRequest, lpc.Classifications>(protocol.CommandTypes.EncodedSemanticClassificationsFull, args);
            return result;            
        });

        connection.onHover(requestParams => {
            const args: lpc.server.protocol.FileLocationRequestArgs = {
                file: (fromUri(requestParams.textDocument.uri)),// lpc.convertToRelativePath(fromUri(requestParams.textDocument.uri), rootFolder, f=>canonicalFilename(f)),
                ...posParamToLpcPos(requestParams),
            };
            
            const result = executeRequest<protocol.QuickInfoRequest, lpc.server.protocol.QuickInfoResponseBody>(protocol.CommandTypes.Quickinfo, args);
            if (!result) return undefined;

            try {     
                const contents = new MarkdownString();
                const { displayString, documentation, tags } = result;
                if (displayString) {
                    contents.appendCodeblock('lpc', displayString);
                }
                addMarkdownDocumentation(contents, documentation, tags, getFileResourceConverter());
                return {
                    contents: contents.toMarkupContent(),
                    range: Range.fromTextSpan(result),
                };                
            }
            catch(e) {                
                console.error(e);
                debugger;
            }
        });

        connection.onSignatureHelp(requestParams => {
            const args: lpc.server.protocol.FileLocationRequestArgs = {
                file: (fromUri(requestParams.textDocument.uri)),// lpc.convertToRelativePath(fromUri(requestParams.textDocument.uri), rootFolder, f=>canonicalFilename(f)),
                ...posParamToLpcPos(requestParams),
            };

            const result = executeRequest<protocol.SignatureHelpRequest, protocol.SignatureHelpItems>(protocol.CommandTypes.SignatureHelp, args);
            if (!result) {
                return undefined;
            }

            try {                                
                const uri = URI.file(args.file);
                const signatureHelp: vscode.SignatureHelp = {
                    signatures: result.items.map(i => SignatureHelp.convertSignature(i, uri)),
                    activeParameter: getActiveParameter(result),
                    activeSignature: result.selectedItemIndex  
                };
                return signatureHelp;
                
                function getActiveParameter(info: protocol.SignatureHelpItems): number {
                    const activeSignature = info.items[info.selectedItemIndex];
                    if (activeSignature?.isVariadic) {
                        return Math.min(info.argumentIndex, activeSignature.parameters.length - 1);
                    }
                    return info.argumentIndex;
                }

                
            } catch (e) {
                console.error(e);
                debugger;
            }
        });

        connection.onDefinition(requestParams => {
            const results = executeRequest<protocol.DefinitionRequest, protocol.DefinitionInfo[]>(
                protocol.CommandTypes.Definition, 
                {
                    file: fromUri(requestParams.textDocument.uri),
                    ...posParamToLpcPos(requestParams),            
                }
            );
            
            try {
                const result = results?.at(0) as any;             
                if (!result || !result.file) {
                    return [];
                }
                const def = vscode.LocationLink.create(
                    URI.file(result.file).toString(),
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
            } catch(e) {
                console.error('onDefinition error', e);                
            }
        });

        connection.onCompletion(requestParams => {
            const args: lpc.server.protocol.CompletionsRequestArgs = {
                file: fromUri(requestParams.textDocument.uri),
                ...posParamToLpcPos(requestParams),
                prefix: requestParams.context.triggerCharacter,
            };

            try {
                const result = executeRequest<protocol.CompletionsRequest, protocol.CompletionInfo>(protocol.CommandTypes.CompletionInfo, args);
                
                if (!result) {
                    return [];
                }

                const items: vscode.CompletionItem[] = [];  
                for (const entry of result.entries) {                                    
                    if (entry.kindModifiers === undefined) {
                        console.warn("todo - kind Modifiers shouldnt be undefined")
                        continue; 
                    }

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

                    item.data = {
                        uri: requestParams.textDocument.uri,
                        entryName: entry.name,
                        position: requestParams.position,
                    } satisfies CompletionData;

                    items.push(item);
                }

                return items;
            } catch(e) {
                console.error(e);
                debugger;
            }
        });

        connection.onCompletionResolve(item => {
            try {
                const data = item.data as CompletionData;
                const pos = posParamToLpcPos(data);
                
                const args = {                
                    entryNames: [data.entryName],
                    file: fromUri(data.uri),    
                    line: pos.line,
                    offset: pos.offset,
                } as protocol.CompletionDetailsRequestArgs;
                
                const details = executeRequest<protocol.CompletionDetailsRequest, protocol.CompletionEntryDetails[]>(protocol.CommandTypes.CompletionDetails, args);                
                const entry = lpc.firstOrUndefined(details);                
                return entry ? CompletionEntryDetails.convert(entry, URI.parse(item.data.uri)) : undefined;
            } catch(e) {
                console.error(e);
                debugger;
            }
        });
        
        return initResult;

        function executeRequest<T extends protocol.Request, R = any>(command: protocol.CommandTypes, args: T["arguments"]) {            
            return session.onMessage({seq: sequence++, type: "request", command, arguments: args} as T) as R;
        }       
            
        function getWorkspaceRootForResource(resource: URI): URI | undefined {            
            if (resource.fsPath.startsWith(rootFolder)) {
                return URI.file(rootFolder);
            }                
            return undefined;
        }

    });
    
    connection.onInitialized(() => {        
        connection.workspace.onDidChangeWorkspaceFolders((args) => {
            logger.info("Workspace folders changed");
        });
        connection.sendNotification("lpc/initialized");
    });    
    
    documents.listen(connection);
    connection.listen();
        
}

let cmdKey: keyof typeof protocol.CommandTypes;

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

interface CompletionData {
    uri: string;
    entryName: string;
    position: vscode.Position;
}
