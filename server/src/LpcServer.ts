import { LpcFacade } from "./facade";
import {
  Connection,
  DidChangeConfigurationNotification,
  InitializeParams,
  InitializeResult,
  InitializedParams,
  TextDocumentSyncKind,
} from "vscode-languageserver";
import * as path from "path";
import { URI } from "vscode-uri";

export class LpcServer {
  private importDir: string | undefined;
  private facade: LpcFacade;

  private changeTimers = new Map<string, ReturnType<typeof setTimeout>>(); // Keyed by file name.

  private hasConfigurationCapability = false;
  private hasWorkspaceFolderCapability = false;
  private hasDiagnosticRelatedInformationCapability = false;
  private foldingRangeLimit = Number.MAX_VALUE;

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
          connection.console.log("Workspace folder change event received.");
        });
      }
    });
  }

  public start() {
    this.connection.listen();
  }

  private onIntialize(params: InitializeParams) {
    console.log("onInitialize");
    console.dir(params.workspaceFolders);

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
          resolveProvider: false,
        },
        documentSymbolProvider: false,
        hoverProvider: false,
        definitionProvider: false,
        foldingRangeProvider: false, // change to true to enable server-based folding
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

    return result;
  }
}
