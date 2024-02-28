import {
  Connection,
  TextDocuments,
  InitializeParams,
  InitializeResult,
  RequestType,
  DocumentRangeFormattingRequest,
  Disposable,
  ServerCapabilities,
  ConfigurationRequest,
  ConfigurationParams,
  DidChangeWorkspaceFoldersNotification,
  DocumentColorRequest,
  ColorPresentationRequest,
  TextDocumentSyncKind,
  NotificationType,
  RequestType0,
  DocumentFormattingRequest,
  FormattingOptions,
  TextEdit,
  CompletionItem,
  CompletionItemKind,
  Diagnostic,
  DidChangeConfigurationNotification,
  TextDocumentPositionParams,
} from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";







export function startServer(connection: Connection) {
  // Create a simple text document manager.
  const documents: TextDocuments<TextDocument> = new TextDocuments(
    TextDocument
  );

  let hasConfigurationCapability = false;
  let hasWorkspaceFolderCapability = false;
  let hasDiagnosticRelatedInformationCapability = false;
  let foldingRangeLimit = Number.MAX_VALUE;

  connection.onInitialize((params: InitializeParams) => {
    const capabilities = params.capabilities;    
    const folders = params.workspaceFolders;

    const rootFolder = folders && folders.length > 0 ? folders[0].uri : "";

    console.dir(folders);
    // Does the client support the `workspace/configuration` request?
    // If not, we fall back using global settings.
    hasConfigurationCapability = !!(
      capabilities.workspace && !!capabilities.workspace.configuration
    );
    hasWorkspaceFolderCapability = !!(
      capabilities.workspace && !!capabilities.workspace.workspaceFolders
    );
    hasDiagnosticRelatedInformationCapability = !!(
      capabilities.textDocument &&
      capabilities.textDocument.publishDiagnostics &&
      capabilities.textDocument.publishDiagnostics.relatedInformation
    );

    const result: InitializeResult = {
      capabilities: {
        textDocumentSync: TextDocumentSyncKind.Incremental,
        // Tell the client that this server supports code completion.
        
        documentSymbolProvider: true,
        hoverProvider:false,
        definitionProvider: true,
        foldingRangeProvider: true, // change to true to enable server-based folding
      },
    };
    if (hasWorkspaceFolderCapability) {
      result.capabilities.workspace = {
        workspaceFolders: {
          supported: true,
        },
      };
    }
    return result;
  });

  connection.onInitialized(() => {
    if (hasConfigurationCapability) {
      // Register for all configuration changes.
      connection.client.register(
        DidChangeConfigurationNotification.type,
        undefined
      );
    }
    if (hasWorkspaceFolderCapability) {
      connection.workspace.onDidChangeWorkspaceFolders((_event) => {
        connection.console.log("Workspace folder change event received.");
      });
    }
  });

  // The example settings
  interface LPCSettings {
    maxNumberOfProblems: number;
  }

  // The global settings, used when the `workspace/configuration` request is not supported by the client.
  // Please note that this is not the case when using this server with the client provided in this example
  // but could happen with other clients.
  const defaultSettings: LPCSettings = { maxNumberOfProblems: 1000 };
  let globalSettings: LPCSettings = defaultSettings;

  // Cache the settings of all open documents
  const documentSettings: Map<string, Thenable<LPCSettings>> = new Map();

  connection.onDidChangeConfiguration((change) => {
    if (hasConfigurationCapability) {
      // Reset all cached document settings
      documentSettings.clear();
    } else {
      globalSettings = <LPCSettings>(
        (change.settings.lpcLanguageServer || defaultSettings)
      );
    }    
  });  

  function getDocumentSettings(resource: string): Thenable<LPCSettings> {
    if (!hasConfigurationCapability) {
      return Promise.resolve(globalSettings);
    }
    let result = documentSettings.get(resource);
    if (!result) {
      result = connection.workspace.getConfiguration({
        scopeUri: resource,
        section: "lpcLanguageServer",
      });
      documentSettings.set(resource, result);
    }
    return result;
  }

  // Only keep settings for open documents
  documents.onDidClose((e) => {
    documentSettings.delete(e.document.uri);
  });


  connection.onDidChangeWatchedFiles((_change) => {
    // Monitored files have change in VSCode
    connection.console.log("We received an file change event");
  });

  
  // Make the text document manager listen on the connection
  // for open, change and close text document events
  documents.listen(connection);

  // Listen on the connection
  connection.listen();
}
