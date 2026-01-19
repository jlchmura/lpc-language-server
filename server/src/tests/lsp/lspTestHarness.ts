import type {
    CompletionItem,
    CompletionList,
    CompletionParams,
    DefinitionParams,
    DidChangeTextDocumentParams,
    DidCloseTextDocumentParams,
    DidOpenTextDocumentParams,
    DidSaveTextDocumentParams,
    DocumentSymbol,
    DocumentSymbolParams,
    Hover,
    HoverParams,
    InitializeParams,
    InitializeResult,
    InitializedParams,
    Location,
    LocationLink,
    PrepareRenameParams,
    PublishDiagnosticsParams,
    ReferenceParams,
    RenameParams,
    SignatureHelp,
    SignatureHelpParams,
    TextDocumentContentChangeEvent,
    TextEdit,
    WillSaveTextDocumentParams,
    WorkspaceEdit,
    WorkspaceFoldersChangeEvent,
} from "vscode-languageserver";
import type { Connection } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { URI } from "vscode-uri";
import * as fs from "fs";
import * as path from "path";
import * as lpc from "../../lpc/lpc.js";
import { start as startLspServer } from "../../lpcserver/server.js";

type Handler<TParams, TResult = void> = (params: TParams) => TResult | Promise<TResult>;

interface NotificationEntry {
    method: string;
    params: unknown;
}

class TestConnection {
    private initializeHandler?: Handler<InitializeParams, InitializeResult>;
    private initializedHandlers: Handler<InitializedParams, void>[] = [];
    private shutdownHandler?: Handler<void, void>;

    private didOpenHandlers: Handler<DidOpenTextDocumentParams, void>[] = [];
    private didChangeHandlers: Handler<DidChangeTextDocumentParams, void>[] = [];
    private didCloseHandlers: Handler<DidCloseTextDocumentParams, void>[] = [];
    private didSaveHandlers: Handler<DidSaveTextDocumentParams, void>[] = [];
    private willSaveHandlers: Handler<WillSaveTextDocumentParams, void>[] = [];
    private willSaveWaitHandlers: Handler<WillSaveTextDocumentParams, TextEdit[] | null | undefined>[] = [];
    private didChangeWatchedHandlers: Handler<{ changes: { uri: string; type: number; }[] }, void>[] = [];

    private hoverHandler?: Handler<HoverParams, Hover | null | undefined>;
    private signatureHelpHandler?: Handler<SignatureHelpParams, SignatureHelp | null | undefined>;
    private definitionHandler?: Handler<DefinitionParams, Location[] | LocationLink[] | null | undefined>;
    private completionHandler?: Handler<CompletionParams, CompletionItem[] | CompletionList | null | undefined>;
    private completionResolveHandler?: Handler<CompletionItem, CompletionItem | null | undefined>;
    private referencesHandler?: Handler<ReferenceParams, Location[] | null | undefined>;
    private documentSymbolHandler?: Handler<DocumentSymbolParams, DocumentSymbol[] | null | undefined>;
    private prepareRenameHandler?: Handler<PrepareRenameParams, { range: any; placeholder: string; } | null | undefined>;
    private renameHandler?: Handler<RenameParams, WorkspaceEdit | null | undefined>;

    private requestHandlers = new Map<string, Handler<any, any>>();
    private diagnosticsWaiters = new Map<string, { resolve: (diagnostics: PublishDiagnosticsParams["diagnostics"]) => void; reject: (error: Error) => void; timer: ReturnType<typeof setTimeout>; }[]>();

    public readonly diagnostics = new Map<string, PublishDiagnosticsParams["diagnostics"]>();
    public readonly notifications: NotificationEntry[] = [];
    public readonly workspaceFolderHandlers: Handler<WorkspaceFoldersChangeEvent, void>[] = [];

    public readonly workspace = {
        onDidChangeWorkspaceFolders: (handler: Handler<WorkspaceFoldersChangeEvent, void>) => {
            this.workspaceFolderHandlers.push(handler);
        },
    };

    onInitialize(handler: Handler<InitializeParams, InitializeResult>) {
        this.initializeHandler = handler;
    }
    onInitialized(handler: Handler<InitializedParams, void>) {
        this.initializedHandlers.push(handler);
    }
    onShutdown(handler: Handler<void, void>) {
        this.shutdownHandler = handler;
    }
    onDidOpenTextDocument(handler: Handler<DidOpenTextDocumentParams, void>) {
        this.didOpenHandlers.push(handler);
    }
    onDidChangeTextDocument(handler: Handler<DidChangeTextDocumentParams, void>) {
        this.didChangeHandlers.push(handler);
    }
    onDidCloseTextDocument(handler: Handler<DidCloseTextDocumentParams, void>) {
        this.didCloseHandlers.push(handler);
    }
    onDidSaveTextDocument(handler: Handler<DidSaveTextDocumentParams, void>) {
        this.didSaveHandlers.push(handler);
    }
    onWillSaveTextDocument(handler: Handler<WillSaveTextDocumentParams, void>) {
        this.willSaveHandlers.push(handler);
    }
    onWillSaveTextDocumentWaitUntil(handler: Handler<WillSaveTextDocumentParams, TextEdit[] | null | undefined>) {
        this.willSaveWaitHandlers.push(handler);
    }
    onDidChangeWatchedFiles(handler: Handler<{ changes: { uri: string; type: number; }[] }, void>) {
        this.didChangeWatchedHandlers.push(handler);
    }

    onHover(handler: Handler<HoverParams, Hover | null | undefined>) {
        this.hoverHandler = handler;
    }
    onSignatureHelp(handler: Handler<SignatureHelpParams, SignatureHelp | null | undefined>) {
        this.signatureHelpHandler = handler;
    }
    onDefinition(handler: Handler<DefinitionParams, Location[] | LocationLink[] | null | undefined>) {
        this.definitionHandler = handler;
    }
    onCompletion(handler: Handler<CompletionParams, CompletionItem[] | CompletionList | null | undefined>) {
        this.completionHandler = handler;
    }
    onCompletionResolve(handler: Handler<CompletionItem, CompletionItem | null | undefined>) {
        this.completionResolveHandler = handler;
    }
    onReferences(handler: Handler<ReferenceParams, Location[] | null | undefined>) {
        this.referencesHandler = handler;
    }
    onDocumentSymbol(handler: Handler<DocumentSymbolParams, DocumentSymbol[] | null | undefined>) {
        this.documentSymbolHandler = handler;
    }
    onPrepareRename(handler: Handler<PrepareRenameParams, { range: any; placeholder: string; } | null | undefined>) {
        this.prepareRenameHandler = handler;
    }
    onRenameRequest(handler: Handler<RenameParams, WorkspaceEdit | null | undefined>) {
        this.renameHandler = handler;
    }
    onRequest(method: string, handler: Handler<any, any>) {
        this.requestHandlers.set(method, handler);
    }

    sendDiagnostics(params: PublishDiagnosticsParams) {
        this.diagnostics.set(params.uri, params.diagnostics);
        const waiters = this.diagnosticsWaiters.get(params.uri);
        if (waiters) {
            this.diagnosticsWaiters.delete(params.uri);
            for (const waiter of waiters) {
                clearTimeout(waiter.timer);
                waiter.resolve(params.diagnostics);
            }
        }
    }
    sendNotification(method: string, params?: unknown) {
        this.notifications.push({ method, params });
    }
    listen() {}

    async initialize(params: InitializeParams): Promise<InitializeResult> {
        if (!this.initializeHandler) {
            throw new Error("onInitialize handler not registered");
        }
        return Promise.resolve(this.initializeHandler(params));
    }
    async initialized(params: InitializedParams): Promise<void> {
        await this.invokeAll(this.initializedHandlers, params);
    }
    async shutdown(): Promise<void> {
        if (this.shutdownHandler) {
            await this.shutdownHandler(undefined);
        }
    }
    async notifyDidOpenTextDocument(params: DidOpenTextDocumentParams): Promise<void> {
        await this.invokeAll(this.didOpenHandlers, params);
    }
    async notifyDidChangeTextDocument(params: DidChangeTextDocumentParams): Promise<void> {
        // Run in reverse so TextDocuments updates happen before server handlers.
        await this.invokeAllReverse(this.didChangeHandlers, params);
    }
    async notifyDidCloseTextDocument(params: DidCloseTextDocumentParams): Promise<void> {
        await this.invokeAll(this.didCloseHandlers, params);
    }
    async notifyDidSaveTextDocument(params: DidSaveTextDocumentParams): Promise<void> {
        await this.invokeAll(this.didSaveHandlers, params);
    }
    async notifyWillSaveTextDocument(params: WillSaveTextDocumentParams): Promise<void> {
        await this.invokeAll(this.willSaveHandlers, params);
    }
    async notifyWillSaveWaitUntil(params: WillSaveTextDocumentParams): Promise<void> {
        await this.invokeAll(this.willSaveWaitHandlers, params);
    }
    async notifyDidChangeWatchedFiles(params: { changes: { uri: string; type: number; }[] }): Promise<void> {
        await this.invokeAll(this.didChangeWatchedHandlers, params);
    }

    async requestHover(params: HoverParams): Promise<Hover | null | undefined> {
        return this.invokeHandler(this.hoverHandler, params);
    }
    async requestSignatureHelp(params: SignatureHelpParams): Promise<SignatureHelp | null | undefined> {
        return this.invokeHandler(this.signatureHelpHandler, params);
    }
    async requestDefinition(params: DefinitionParams): Promise<Location[] | LocationLink[] | null | undefined> {
        return this.invokeHandler(this.definitionHandler, params);
    }
    async requestCompletion(params: CompletionParams): Promise<CompletionItem[] | CompletionList | null | undefined> {
        return this.invokeHandler(this.completionHandler, params);
    }
    async requestCompletionResolve(item: CompletionItem): Promise<CompletionItem | null | undefined> {
        return this.invokeHandler(this.completionResolveHandler, item);
    }
    async requestReferences(params: ReferenceParams): Promise<Location[] | null | undefined> {
        return this.invokeHandler(this.referencesHandler, params);
    }
    async requestDocumentSymbol(params: DocumentSymbolParams): Promise<DocumentSymbol[] | null | undefined> {
        return this.invokeHandler(this.documentSymbolHandler, params);
    }
    async requestPrepareRename(params: PrepareRenameParams): Promise<{ range: any; placeholder: string; } | null | undefined> {
        return this.invokeHandler(this.prepareRenameHandler, params);
    }
    async requestRename(params: RenameParams): Promise<WorkspaceEdit | null | undefined> {
        return this.invokeHandler(this.renameHandler, params);
    }
    async request(method: string, params: any): Promise<any> {
        const handler = this.requestHandlers.get(method);
        if (!handler) {
            throw new Error(`request handler not registered: ${method}`);
        }
        return Promise.resolve(handler(params));
    }

    waitForDiagnostics(uri: string, timeoutMs = 3000): Promise<PublishDiagnosticsParams["diagnostics"]> {
        // Always wait for new diagnostics, don't return existing ones
        // This ensures we wait for semantic diagnostics to complete
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                const waiters = this.diagnosticsWaiters.get(uri);
                if (waiters) {
                    this.diagnosticsWaiters.set(uri, waiters.filter(waiter => waiter.resolve !== resolve));
                    if (this.diagnosticsWaiters.get(uri)?.length === 0) {
                        this.diagnosticsWaiters.delete(uri);
                    }
                }
                reject(new Error(`Timed out waiting for diagnostics: ${uri}`));
            }, timeoutMs);
            const entry = { resolve, reject, timer };
            const waiters = this.diagnosticsWaiters.get(uri);
            if (waiters) {
                waiters.push(entry);
            } else {
                this.diagnosticsWaiters.set(uri, [entry]);
            }
        });
    }

    private async invokeAll<TParams, TResult>(handlers: Handler<TParams, TResult>[], params: TParams): Promise<void> {
        for (const handler of handlers) {
            await handler(params);
        }
    }
    private async invokeAllReverse<TParams, TResult>(handlers: Handler<TParams, TResult>[], params: TParams): Promise<void> {
        for (let i = handlers.length - 1; i >= 0; i--) {
            await handlers[i](params);
        }
    }
    private async invokeHandler<TParams, TResult>(handler: Handler<TParams, TResult> | undefined, params: TParams): Promise<TResult> {
        if (!handler) {
            throw new Error("handler not registered");
        }
        return Promise.resolve(handler(params));
    }
}

export interface OpenedDocument {
    uri: string;
    path: string;
    text: string;
    document: TextDocument;
    version: number;
    positions: Record<string, { line: number; character: number; }>;
}

export interface LspTestHarnessOptions {
    rootPath?: string;
    platform?: string;
    serverArgs?: string[];
    writeFile?: boolean;
    executingFilePath?: string;
    captureSessionMessages?: boolean;
}

export class LspTestHarness {
    private static sessionMessageListeners = new Set<(request: { command: string; }, response: unknown) => void>();
    private static sessionPatched = false;
    private static originalOnMessage?: typeof lpc.server.Session.prototype.onMessage;
    private static originalProcessExit?: typeof process.exit;

    private readonly connection = new TestConnection();
    private readonly rootPath: string;
    private readonly writeFile: boolean;
    private initialized = false;
    private readonly documents = new Map<string, OpenedDocument>();
    private restoreExecutingFilePath?: () => void;
    private removeSessionListener?: () => void;
    private readonly sessionMessages: { command: string; request: unknown; response: unknown }[] = [];
    private restoreProcessExit?: () => void;

    constructor(options: LspTestHarnessOptions = {}) {
        this.rootPath = options.rootPath ?? process.cwd();
        this.writeFile = options.writeFile ?? false;

        // Prevent process.exit from killing the test process
        if (!LspTestHarness.originalProcessExit) {
            LspTestHarness.originalProcessExit = process.exit;
            process.exit = ((code?: number) => {
                throw new Error(`process.exit called with "${code}"`);
            }) as typeof process.exit;
        }
        this.restoreProcessExit = () => {
            if (LspTestHarness.originalProcessExit) {
                process.exit = LspTestHarness.originalProcessExit;
                LspTestHarness.originalProcessExit = undefined;
            }
        };

        const originalArgs = lpc.sys.args;
        const startArgs = options.serverArgs ?? originalArgs;
        const originalGetExecutingFilePath = lpc.sys.getExecutingFilePath;
        const executingFilePath = options.executingFilePath ?? path.join(this.rootPath, "__fake__.js");
        lpc.sys.getExecutingFilePath = () => executingFilePath;
        this.restoreExecutingFilePath = () => {
            lpc.sys.getExecutingFilePath = originalGetExecutingFilePath;
        };
        if (options.captureSessionMessages) {
            this.enableSessionMessageCapture();
        }
        if (options.serverArgs) {
            lpc.sys.args = options.serverArgs;
        }
        try {
            startLspServer.call({}, this.connection as unknown as Connection, options.platform ?? process.platform, startArgs);
        } finally {
            if (options.serverArgs) {
                lpc.sys.args = originalArgs;
            }
        }
    }

    async dispose() {
        try {
            if (this.initialized) {
                await this.connection.shutdown();
            }
        } catch (error) {
            // Ignore shutdown errors (e.g., from mocked process.exit)
        } finally {
            this.removeSessionListener?.();
            this.removeSessionListener = undefined;
            this.restoreExecutingFilePath?.();
            this.restoreExecutingFilePath = undefined;
            this.restoreProcessExit?.();
            this.restoreProcessExit = undefined;
            this.initialized = false;
        }
    }

    async initialize(params: Partial<InitializeParams> = {}): Promise<InitializeResult> {
        const rootUri = URI.file(this.rootPath).toString();
        const workspaceFolders = params.workspaceFolders ?? [{ name: path.basename(this.rootPath), uri: rootUri }];
        const initParams: InitializeParams = {
            processId: process.pid,
            rootPath: this.rootPath,
            rootUri,
            capabilities: {
                workspace: {
                    configuration: true,
                    workspaceFolders: true,
                },
                textDocument: {
                    publishDiagnostics: {
                        relatedInformation: true,
                    },
                },
            },
            ...params,
            workspaceFolders,
        };

        const result = await this.connection.initialize(initParams);
        await this.connection.initialized({} as InitializedParams);
        this.initialized = true;
        return result;
    }

    async openFile(filePath: string, textWithMarkers: string, options: { languageId?: string; version?: number; writeFile?: boolean; } = {}): Promise<OpenedDocument> {
        this.ensureInitialized();

        const { filePath: resolvedPath, uri } = this.resolveFile(filePath);
        const languageId = options.languageId ?? "lpc";
        const version = options.version ?? 1;
        const { text, offsets } = extractMarkers(textWithMarkers);

        if (options.writeFile ?? this.writeFile) {
            fs.mkdirSync(path.dirname(resolvedPath), { recursive: true });
            fs.writeFileSync(resolvedPath, text, "utf8");
        }

        const document = TextDocument.create(uri, languageId, version, text);
        const positions: Record<string, { line: number; character: number; }> = {};
        offsets.forEach((offset, name) => {
            const pos = document.positionAt(offset);
            positions[name] = { line: pos.line, character: pos.character };
        });

        const opened: OpenedDocument = {
            uri,
            path: resolvedPath,
            text,
            document,
            version,
            positions,
        };
        this.documents.set(uri, opened);

        await this.connection.notifyDidOpenTextDocument({
            textDocument: {
                uri,
                languageId,
                version,
                text,
            },
        });

        return opened;
    }

    async changeFile(uriOrPath: string, changes: TextDocumentContentChangeEvent[], version?: number): Promise<OpenedDocument> {
        this.ensureInitialized();

        const { uri } = this.resolveUri(uriOrPath);
        const existing = this.documents.get(uri);
        if (!existing) {
            throw new Error(`document not opened: ${uri}`);
        }

        const nextVersion = version ?? existing.version + 1;
        const updated = TextDocument.update(existing.document, changes, nextVersion);
        const newState: OpenedDocument = {
            ...existing,
            version: nextVersion,
            text: updated.getText(),
            document: updated,
        };
        this.documents.set(uri, newState);

        await this.connection.notifyDidChangeTextDocument({
            textDocument: {
                uri,
                version: nextVersion,
            },
            contentChanges: changes,
        });

        return newState;
    }

    async replaceFileText(uriOrPath: string, newText: string, version?: number): Promise<OpenedDocument> {
        return this.changeFile(uriOrPath, [{ text: newText }], version);
    }

    async closeFile(uriOrPath: string): Promise<void> {
        this.ensureInitialized();

        const { uri } = this.resolveUri(uriOrPath);
        const existing = this.documents.get(uri);
        if (!existing) {
            throw new Error(`document not opened: ${uri}`);
        }
        this.documents.delete(uri);
        await this.connection.notifyDidCloseTextDocument({ textDocument: { uri } });
    }

    getDocument(uriOrPath: string): OpenedDocument | undefined {
        const { uri } = this.resolveUri(uriOrPath);
        return this.documents.get(uri);
    }

    getDiagnostics(uriOrPath: string): PublishDiagnosticsParams["diagnostics"] {
        const { uri } = this.resolveUri(uriOrPath);
        return this.connection.diagnostics.get(uri) ?? [];
    }

    async waitForDiagnostics(target: OpenedDocument | string, timeoutMs?: number): Promise<PublishDiagnosticsParams["diagnostics"]> {
        this.ensureInitialized();
        const uri = typeof target === "string" ? this.resolveUri(target).uri : target.uri;
        return this.connection.waitForDiagnostics(uri, timeoutMs);
    }

    async waitForProjectInfo(
        target: OpenedDocument | string,
        options: { timeoutMs?: number; pollMs?: number; } = {},
    ): Promise<any> {
        this.ensureInitialized();
        const timeoutMs = options.timeoutMs ?? 3000;
        const pollMs = options.pollMs ?? 50;
        const uri = typeof target === "string" ? this.resolveUri(target).uri : target.uri;
        const expectedPath = typeof target === "string"
            ? (target.startsWith("file://") ? URI.parse(target).fsPath : this.resolveFile(target).filePath)
            : target.path;
        const normalizedExpected = path.normalize(expectedPath);
        const deadline = Date.now() + timeoutMs;
        let lastResult: any;

        while (Date.now() < deadline) {
            lastResult = await this.request("projectInfo", {
                arguments: {
                    file: uri,
                    needFileNameList: true,
                    excludeConfigFiles: true,
                },
            });
            const fileNames = lastResult?.fileNames as string[] | undefined;
            if (fileNames?.some(name => path.normalize(name) === normalizedExpected)) {
                return lastResult;
            }
            await new Promise(resolve => setTimeout(resolve, pollMs));
        }

        const reason = lastResult?.languageServiceDisabled ? "language service disabled" : "file not in project";
        throw new Error(`Timed out waiting for project info (${reason}): ${normalizedExpected}`);
    }

    getNotifications(): NotificationEntry[] {
        return [...this.connection.notifications];
    }

    getSessionMessages(command?: string): { command: string; request: unknown; response: unknown }[] {
        if (!command) {
            return [...this.sessionMessages];
        }
        return this.sessionMessages.filter(message => message.command === command);
    }

    positionOf(document: OpenedDocument, marker = "cursor") {
        const pos = document.positions[marker];
        if (!pos) {
            throw new Error(`marker not found: ${marker}`);
        }
        return pos;
    }

    async request(method: string, params: any): Promise<any> {
        this.ensureInitialized();
        return this.connection.request(method, params);
    }

    async hover(uriOrPath: string, position: { line: number; character: number; }): Promise<Hover | null | undefined> {
        this.ensureInitialized();
        const { uri } = this.resolveUri(uriOrPath);
        return this.connection.requestHover({
            textDocument: { uri },
            position,
        } satisfies HoverParams);
    }

    async hoverAt(document: OpenedDocument, marker = "cursor"): Promise<Hover | null | undefined> {
        return this.hover(document.uri, this.positionOf(document, marker));
    }

    async waitForHoverAt(
        document: OpenedDocument,
        marker = "cursor",
        options: { timeoutMs?: number; pollMs?: number; } = {},
    ): Promise<Hover> {
        this.ensureInitialized();
        if (!this.removeSessionListener) {
            this.enableSessionMessageCapture();
        }
        const timeoutMs = options.timeoutMs ?? 3000;
        const pollMs = options.pollMs ?? 50;
        const deadline = Date.now() + timeoutMs;
        const position = this.positionOf(document, marker);
        let lastResult: Hover | null | undefined;
        let attempts = 0;

        while (Date.now() < deadline) {
            lastResult = await this.hover(document.uri, position);
            attempts++;
            if (lastResult) {
                return lastResult;
            }
            // Shorter poll interval after we've confirmed diagnostics
            await new Promise(resolve => setTimeout(resolve, pollMs));
        }

        const projectInfo = await this.request("projectInfo", {
            arguments: {
                file: document.uri,
                needFileNameList: true,
                excludeConfigFiles: true,
            },
        });
        const fileNames = projectInfo?.fileNames as string[] | undefined;
        const normalizedPath = path.normalize(document.path);
        const inProject = !!fileNames?.some(name => path.normalize(name) === normalizedPath);
        const quickinfoMessages = this.getSessionMessages("quickinfo");
        const lastQuickInfo = quickinfoMessages.slice(-1)[0];
        const lastResponse = lastQuickInfo?.response as { displayString?: string } | undefined;
        const lastRequestArgs = (lastQuickInfo?.request as { arguments?: { file?: string; line?: number; offset?: number } })?.arguments;
        const lastRequestInfo = lastRequestArgs
            ? `${lastRequestArgs.file ?? "unknown"}:${lastRequestArgs.line ?? "?"}:${lastRequestArgs.offset ?? "?"}`
            : "none";
        const geterrMessages = this.getSessionMessages("geterr");
        const details = [
            `project=${projectInfo?.configFileName ?? "unknown"}`,
            `languageServiceDisabled=${projectInfo?.languageServiceDisabled ?? "unknown"}`,
            `inProject=${inProject}`,
            `fileCount=${fileNames?.length ?? "unknown"}`,
            `lastQuickinfo=${lastResponse?.displayString ?? "undefined"}`,
            `quickinfoCount=${quickinfoMessages.length}`,
            `lastQuickinfoRequest=${lastRequestInfo}`,
            `geterrCount=${geterrMessages.length}`,
        ].join(", ");
        throw new Error(`Timed out waiting for hover at ${document.path}:${position.line + 1}:${position.character + 1} (${details})`);
    }

    async signatureHelp(uriOrPath: string, position: { line: number; character: number; }): Promise<SignatureHelp | null | undefined> {
        this.ensureInitialized();
        const { uri } = this.resolveUri(uriOrPath);
        return this.connection.requestSignatureHelp({
            textDocument: { uri },
            position,
        } satisfies SignatureHelpParams);
    }

    async definition(uriOrPath: string, position: { line: number; character: number; }): Promise<Location[] | LocationLink[] | null | undefined> {
        this.ensureInitialized();
        const { uri } = this.resolveUri(uriOrPath);
        return this.connection.requestDefinition({
            textDocument: { uri },
            position,
        } satisfies DefinitionParams);
    }

    async completion(uriOrPath: string, position: { line: number; character: number; }): Promise<CompletionItem[] | CompletionList | null | undefined> {
        this.ensureInitialized();
        const { uri } = this.resolveUri(uriOrPath);
        return this.connection.requestCompletion({
            textDocument: { uri },
            position,
            context: { triggerKind: 1 },
        } satisfies CompletionParams);
    }

    async completionResolve(item: CompletionItem): Promise<CompletionItem | null | undefined> {
        this.ensureInitialized();
        return this.connection.requestCompletionResolve(item);
    }

    async references(uriOrPath: string, position: { line: number; character: number; }, includeDeclaration = true): Promise<Location[] | null | undefined> {
        this.ensureInitialized();
        const { uri } = this.resolveUri(uriOrPath);
        return this.connection.requestReferences({
            textDocument: { uri },
            position,
            context: { includeDeclaration },
        } satisfies ReferenceParams);
    }

    async documentSymbols(uriOrPath: string): Promise<DocumentSymbol[] | null | undefined> {
        this.ensureInitialized();
        const { uri } = this.resolveUri(uriOrPath);
        return this.connection.requestDocumentSymbol({
            textDocument: { uri },
        } satisfies DocumentSymbolParams);
    }

    async prepareRename(uriOrPath: string, position: { line: number; character: number; }): Promise<{ range: any; placeholder: string; } | null | undefined> {
        this.ensureInitialized();
        const { uri } = this.resolveUri(uriOrPath);
        return this.connection.requestPrepareRename({
            textDocument: { uri },
            position,
        } satisfies PrepareRenameParams);
    }

    async rename(uriOrPath: string, position: { line: number; character: number; }, newName: string): Promise<WorkspaceEdit | null | undefined> {
        this.ensureInitialized();
        const { uri } = this.resolveUri(uriOrPath);
        return this.connection.requestRename({
            textDocument: { uri },
            position,
            newName,
        } satisfies RenameParams);
    }

    private resolveUri(uriOrPath: string): { uri: string; } {
        if (uriOrPath.startsWith("file://")) {
            return { uri: uriOrPath };
        }
        const filePath = path.isAbsolute(uriOrPath) ? uriOrPath : path.join(this.rootPath, uriOrPath);
        return { uri: URI.file(filePath).toString() };
    }

    private resolveFile(filePath: string): { filePath: string; uri: string; } {
        const normalized = path.isAbsolute(filePath) ? filePath : path.join(this.rootPath, filePath);
        return { filePath: normalized, uri: URI.file(normalized).toString() };
    }

    private ensureInitialized() {
        if (!this.initialized) {
            throw new Error("LSP harness not initialized. Call initialize() first.");
        }
    }

    private enableSessionMessageCapture() {
        if (!LspTestHarness.sessionPatched) {
            const proto = lpc.server.Session.prototype;
            LspTestHarness.originalOnMessage = proto.onMessage;
            proto.onMessage = function (request) {
                const response = LspTestHarness.originalOnMessage!.call(this, request);
                for (const listener of LspTestHarness.sessionMessageListeners) {
                    listener(request as { command: string }, response);
                }
                return response;
            };
            LspTestHarness.sessionPatched = true;
        }

        const listener = (request: { command: string }, response: unknown) => {
            this.sessionMessages.push({ command: request.command, request, response });
        };
        LspTestHarness.sessionMessageListeners.add(listener);
        this.removeSessionListener = () => {
            LspTestHarness.sessionMessageListeners.delete(listener);
        };
    }
}

// Marker syntax: /*@*/ for default cursor, or /*@name*/ for named positions.
function extractMarkers(text: string): { text: string; offsets: Map<string, number>; } {
    const regex = /\/\*@([A-Za-z0-9_-]*)\*\//g;
    const offsets = new Map<string, number>();
    let cleaned = "";
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
        cleaned += text.slice(lastIndex, match.index);
        const name = match[1] || "cursor";
        if (offsets.has(name)) {
            throw new Error(`duplicate marker: ${name}`);
        }
        offsets.set(name, cleaned.length);
        lastIndex = match.index + match[0].length;
    }

    cleaned += text.slice(lastIndex);
    return { text: cleaned, offsets };
}
