/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import * as jsonc from "jsonc-parser";
import * as vscode from "vscode";
import * as path from "path";
import {
    workspace,
    ExtensionContext,
    commands,
    TextEditor,
    TextEditorEdit,
    window,    
    DocumentFilter,
} from "vscode";
import * as fileSchemes from './fileSchemes';
import {        
    LanguageClient,
    LanguageClientOptions,    
    ServerOptions,
    TransportKind,
    WorkspaceFolder,
} from "vscode-languageclient/node";
import { ProgressIndicator } from "./ProgressIndicator";
import { DocumentSelector } from "./documentSelector";
import { LanguageDescription, isLpcConfigFileName, standardLanguageDescriptions } from "./configuration/languageDescription";
import { NodeServiceConfigurationProvider } from "./configuration/configuration.node";

let clientInitialized = false;
let client: LanguageClient;
let syntaxClient: LanguageClient;
const progress = new ProgressIndicator();
const _disposables: vscode.Disposable[] = [];
let _isDisposed = false;

export async function activate(context: ExtensionContext) {
    const serviceConfigurationProvider = new NodeServiceConfigurationProvider();
    const configuration = serviceConfigurationProvider.loadFromWorkspace();

    // The server is implemented in node
    const serverModule = context.asAbsolutePath(
        path.join("out", "server", "src", "server.js")
    );

    const maxServerMemory = configuration.maxLpcServerMemory;

    // get location of efuns folder and pass to server as an argument
    const efunDir = context.asAbsolutePath("efuns");

    const possibleConfigFiles = await vscode.workspace.findFiles("**/lpc-config.json");
    let defaultDriverType: "ldmud" | "fluffos" = "ldmud";

    if (possibleConfigFiles.length > 0) {
        try {
            const configBuffer = await vscode.workspace.fs.readFile(possibleConfigFiles[0]);
            // convert uint8 array to string
            const configString = Buffer.from(configBuffer).toString();                                   
            const config = jsonc.parse(configString);         

            defaultDriverType = config?.driver?.type ?? "ldmud";            
        } catch {}
    }

    let debugOptions = {        
        execArgv: [
            // "--prof",
            // "--log-deopt",
            // "--log-ic",
            // "--log-maps",
            // "--log-maps-details",
            // "--log-internal-timer-events",
            // "--log-code",
            // "--log-source-code",
            // "--detailed-line-info",
            // "--logfile=../lpc-language-server/v8.log",
            "--nolazy", "--enable-source-maps", "--inspect", "--max-old-space-size=" + maxServerMemory],
    };

    const serverArgs = [
        efunDir, 
        "--driverType", defaultDriverType, 
        "--serverMode", "semantic",
        "--locale", configuration.locale ?? vscode.env.language,
    ];
    const syntaxServerArgs = [efunDir, "--driverType", defaultDriverType, "--serverMode", "syntactic"];

    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
    const serverOptions: ServerOptions = {
        run: {
            module: serverModule,
            transport: TransportKind.ipc,
            options: { execArgv: ["--enable-source-maps", "--max-old-space-size=" + maxServerMemory] },
            args: serverArgs,
        },
        debug: {
            module: serverModule,
            transport: TransportKind.ipc,
            options: debugOptions,
            args: serverArgs,
        },
    };

    const syntaxServerOptions: ServerOptions = { run: {...serverOptions.run}, debug: {...serverOptions.debug} };
    syntaxServerOptions.run.args = syntaxServerArgs;
    syntaxServerOptions.debug.args = syntaxServerArgs;

    const docSel = [
        // lpc files
        { scheme: "file", language: "lpc" },        
    ];

    // Options to control the language client
    const clientOptions: LanguageClientOptions = {
        // Register the server for plain text documents
        documentSelector: docSel,
        markdown: {
            isTrusted: true,
        },        
        synchronize: {
            // Notify the server about file changes to lpc config files contained in the workspace
            fileEvents: workspace.createFileSystemWatcher("**/lpc-config.json"),            
        },
        diagnosticCollectionName: "lpc",
        
    };    

    // Create the language client and start the client.
    client = new LanguageClient(
        "lpc",
        "LPC Language Server",
        {
            options: {
                env: [ "NODE_ENV=production" ],                
            },
            run: serverOptions.run,
            debug: serverOptions.debug            
            // debug: {
            //     ...serverOptions.debug,
            //     options: {
            //         ...serverOptions.debug.options,
            //         env: [ "NODE_ENV=production" ],
            //         execArgv: [
            //             ...serverOptions.debug.options.execArgv,
            //             "--prof",
            //         ],
            //     }
            // }
        },
        clientOptions
    );

    // Start the client. This will also launch the server
    client.start();

    syntaxClient = new LanguageClient("lpc", "LPC Syntax Server", syntaxServerOptions, clientOptions);
    syntaxClient.start();
                  
    client.onNotification("lpc/initialized", () => {
        clientInitialized=true;
        // don't initialize providers until the server says its ready
        registerProviders();    
    })

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
        
    function _register<T extends vscode.Disposable>(value: T): T {
		if (_isDisposed) {
			value.dispose();
		} else {
			_disposables.push(value);
		}
		return value;
	}

    async function registerProviders(): Promise<void> {
        const language = standardLanguageDescriptions.at(0);
        const selector = createDocumentSelector(language);
        
        await Promise.all([
            import("./languageFeatures/semanticTokens").then(provider => _register(provider.register(selector, client))),
            import("./languageFeatures/jsDocCompletions").then(provider => _register(provider.register(selector, language, syntaxClient))),
            import("./task/taskProvider").then(provider => _register(provider.register(context, client))),
        ]);
    }
    
    window.onDidChangeActiveTextEditor(async (editor) => {
        await getLpcConfigForActiveFile();
    });

    async function getLpcConfigForActiveFile(): Promise<any[]> {
        const editor = vscode.window.activeTextEditor;    
        if (!editor) return;
        
        if (isLpcConfigFileName(editor.document.fileName)) {
            const uri = editor.document.uri;
            return [{
                uri,
                fsPath: uri.fsPath,
                posixPath: uri.path,
                WorkspaceFolder: vscode.workspace.getWorkspaceFolder(uri)
            }];
        }

        const file = getActiveLpcFile();
        if (!file) {
            progress.hide();
            return [];
        }
        const { document} = editor;        
        if (document?.languageId !== "lpc") {
            progress.hide(); 
        }

        // get projectInfo from server
        const info: any = await client.sendRequest("projectInfo", { 
            command: "projectInfo",
            arguments: {
                needFileNameList: false,
                file: document.uri.toString()
            }            
        });

        progress.setDriverType(info?.driverType || "");            
        progress.show();           

        if (!info) return [];
        const { configFileName } = info;
		if (configFileName && !isImplicitProjectConfigFile(configFileName)) {
			const normalizedConfigPath = path.normalize(configFileName);
			const uri = vscode.Uri.file(normalizedConfigPath);
			const folder = vscode.workspace.getWorkspaceFolder(uri);
			return [{
				uri,
				fsPath: normalizedConfigPath,
				posixPath: uri.path,
				workspaceFolder: folder
			}];
		}

        return [];
    }
    
    function getActiveLpcFile(): string | undefined {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			if (document && (document.languageId === 'lpc')) {
				return toTsFilePath(document.uri);
			}
		}
		return undefined;
	}
}

export const emptyAuthority = 'ts-nul-authority';
export const inMemoryResourcePrefix = '^';
function isWeb() { return false; }
function toTsFilePath(resource: vscode.Uri): string | undefined {
    if (fileSchemes.disabledSchemes.has(resource.scheme)) {
        return undefined;
    }

    if (resource.scheme === fileSchemes.file && !isWeb()) {
        return resource.fsPath;
    }

    return (isProjectWideIntellisenseOnWebEnabled() ? '' : inMemoryResourcePrefix)
        + '/' + resource.scheme
        + '/' + (resource.authority || emptyAuthority)
        + (resource.path.startsWith('/') ? resource.path : '/' + resource.path)
        + (resource.fragment ? '#' + resource.fragment : '');
}

function isProjectWideIntellisenseOnWebEnabled() {
    // TODO - implement this
    return false;    
}

export function deactivate(): Thenable<void> | undefined {
    console.log("Deactivating extension");
    if (!client) {
        return undefined;
    }
    return client.stop();
}

function createDocumentSelector(langDesc: LanguageDescription): DocumentSelector {
    const semantic: DocumentFilter[] = [];
    const syntax: DocumentFilter[] = [];    
    for (const language of langDesc.languageIds) {
        syntax.push({ language });
        for (const scheme of fileSchemes.getSemanticSupportedSchemes()) {
            semantic.push({ language, scheme });
        }
    }

    return { semantic, syntax };
}

export function isImplicitProjectConfigFile(configFileName: string) {
	return configFileName.startsWith('/dev/null/');
}
