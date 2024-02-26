import { LpcFacade } from "./facade";
import {
  Connection,
  DidChangeConfigurationNotification,
  InitializeResult,
  TextDocumentSyncKind,
} from "vscode-languageserver";

export class LpcServer {
  private readonly importDir: string | undefined;
  private readonly facade: LpcFacade;

  private changeTimers = new Map<string, ReturnType<typeof setTimeout>>(); // Keyed by file name.

  private hasConfigurationCapability = false;
  private hasWorkspaceFolderCapability = false;
  private hasDiagnosticRelatedInformationCapability = false;
  private foldingRangeLimit = Number.MAX_VALUE;

  constructor(connection: Connection) {
    connection.onInitialize((params) => {
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
      return result;
    });

    connection.onInitialized(() => {
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

    // this.importDir = connection.workspace.getConfiguration("lpc.generation").get<string>("importDir");
    // this.lpcContext = new LpcContext(this.importDir, "./");
  }
}
