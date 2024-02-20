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
import { CaretPosition, getSuggestions, getSuggestionsForParseTree } from "./completions";

import { getFoldingRanges } from "./folding";


import { SymbolTableVisitor } from "./symbolTableVisitor";
import { computeTokenPosition } from "./tokenposition";
import { LPCLexer } from "./parser3/LPCLexer";
import { CharStreams, CommonTokenStream } from "antlr4ng";
import { LPCParser } from "./parser3/LPCParser";

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
        definitionProvider: true,
        foldingRangeProvider: false, // change to true to enable server-based folding
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

    // Revalidate all open text documents
    documents.all().forEach(validateTextDocument);
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

  // The content of a text document has changed. This event is emitted
  // when the text document first opened or when its content has changed.
  documents.onDidChangeContent((change) => {
    validateTextDocument(change.document);
  });

  async function validateTextDocument(
    textDocument: TextDocument
  ): Promise<void> {
    // In this simple example we get the settings for every validate run.
    const settings = await getDocumentSettings(textDocument.uri);

    // The validator creates diagnostics for all uppercase words length 2 and more
    const text = textDocument.getText();

    try {
      const stream = CharStreams.fromString(text);
      const lexer = new LPCLexer(stream);
      const tStream = new CommonTokenStream(lexer);
      const parser = new LPCParser(tStream);
      const tree = parser.program();
        
    } catch (err) {
      let errMsg: string;
      if (typeof err == "string") errMsg = err;
      else {
        const errOb = err as Error;
        errMsg = errOb.message;
      }

      console.log("Error in document: " + err);
    }

    const diagnostics: Diagnostic[] = [];

    // Send the computed diagnostics to VSCode.
    connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
  }

  connection.onFoldingRanges((params, token) => {
    const doc = documents.get(params.textDocument.uri);
    if (doc) {
      return getFoldingRanges(doc, foldingRangeLimit);
    }
    return null;
  });

  connection.onDocumentSymbol((documentSymbolParams, token) => {
    const document = documents.get(documentSymbolParams.textDocument.uri);
    // if (document) {
    //   return getDocumentSymbols(document);
    // }
    return [];
  });

  // connection.onDefinition((definitionParams, token) => {
  //   const document = documents.get(definitionParams.textDocument.uri);
  //   if (document) {
  //     const ast = ParseLPC(document.getText());
  //     const nav = new LPCNavigation();
  //     const loc = nav.findDefinition(document, definitionParams.position, ast);
  //     if (loc) {
  //       return [loc];
  //     }
  //   }
  //   return [];
  // });

  connection.onDidChangeWatchedFiles((_change) => {
    // Monitored files have change in VSCode
    connection.console.log("We received an file change event");
  });

  // This handler provides the initial list of the completion items.  
  connection.onCompletion( (_textDocumentPosition: TextDocumentPositionParams): CompletionItem[] =>  {
      let uri = _textDocumentPosition.textDocument.uri;
      let document = documents.get(uri);
      if (!document) return [];
      
      let pos = _textDocumentPosition.position;
      let caretPos = { line: pos.line + 1, column: pos.character } as CaretPosition;

      console.log("Getting suggestions for: " + document.uri + " at " + caretPos.line + ":" + caretPos.column);
      
      let suggestions = getSuggestions(document.getText(), caretPos, computeTokenPosition);
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
