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
import {
  CaretPosition,
  getSuggestions,
  getSuggestionsForParseTree,
} from "./completions";

import { getFoldingRanges } from "./folding";

import { SymbolTableVisitor } from "./symbolTableVisitor";
import { computeTokenPosition } from "./tokenposition";
import { LPCLexer } from "./parser3/LPCLexer";
import { CharStreams, CommonTokenStream } from "antlr4ng";


import { getDefinitions } from "./definition";
import { doHover } from "./hover";
import { LPCParser, ProgramContext } from "./parser3/LPCParser";


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
        completionProvider: {
          resolveProvider: true,
        },
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
  
  connection.onFoldingRanges((params, token) => {
    const doc = documents.get(params.textDocument.uri);
    if (doc) {
      return getFoldingRanges(doc.getText(), foldingRangeLimit);
    }
    return null;
  });
  
  connection.onHover((hoverParams, token) => {
    const document = documents.get(hoverParams.textDocument.uri);
    if (document) {
      return doHover(document, hoverParams.position);
    } else {
      return null;
    }
  });

  connection.onDefinition((definitionParams, token) => {
    const document = documents.get(definitionParams.textDocument.uri);

    if (document) {
      const pos = definitionParams.position;
      let caretPos = {
        line: pos.line + 1,
        column: pos.character,
      } as CaretPosition;
      const defs = getDefinitions(document, document.getText(), caretPos);
      return defs;
    }
    return [];
  });

  connection.onDidChangeWatchedFiles((_change) => {
    // Monitored files have change in VSCode
    connection.console.log("We received an file change event");
  });

  // This handler provides the initial list of the completion items.
  connection.onCompletion(
    (_textDocumentPosition: TextDocumentPositionParams): CompletionItem[] => {
      let uri = _textDocumentPosition.textDocument.uri;
      let document = documents.get(uri);
      if (!document) return [];

      let pos = _textDocumentPosition.position;
      let caretPos = {
        line: pos.line + 1,
        column: pos.character,
      } as CaretPosition;

      console.log(
        "Getting suggestions for: " +
          document.uri +
          " at " +
          caretPos.line +
          ":" +
          caretPos.column
      );

      let suggestions = getSuggestions(
        document.getText(),
        caretPos,
        computeTokenPosition
      );
      return suggestions;
    }
  );

  // This handler resolves additional information for the item selected in
  // the completion list.
  connection.onCompletionResolve((item: CompletionItem): CompletionItem => {
    return item;
  });

  // Make the text document manager listen on the connection
  // for open, change and close text document events
  documents.listen(connection);

  // Listen on the connection
  connection.listen();
}
