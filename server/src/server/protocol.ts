import { CompilerOptions, CompletionsTriggerCharacter, CompletionTriggerKind, RenameInfoFailure, ScriptElementKind, SignatureHelpTriggerReason, SymbolDisplayPart, TypeAcquisition, WatchOptions } from "./_namespaces/lpc";
import * as lpc from "./_namespaces/lpc";

type ChangePropertyTypes<T, Substitutions extends { [K in keyof T]?: any; }> = {
    [K in keyof T]: K extends keyof Substitutions ? Substitutions[K] : T[K];
};


// Declaration module describing the TypeScript Server protocol

export const enum CommandTypes {
    LinkedEditingRange = "linkedEditingRange",
    Brace = "brace",
    /** @internal */
    BraceFull = "brace-full",
    BraceCompletion = "braceCompletion",
    GetSpanOfEnclosingComment = "getSpanOfEnclosingComment",
    Change = "change",
    Close = "close",
    /** @deprecated Prefer CompletionInfo -- see comment on CompletionsResponse */
    Completions = "completions",
    CompletionInfo = "completionInfo",
    /** @internal */
    CompletionsFull = "completions-full",
    CompletionDetails = "completionEntryDetails",
    /** @internal */
    CompletionDetailsFull = "completionEntryDetails-full",
    CompileOnSaveAffectedFileList = "compileOnSaveAffectedFileList",
    CompileOnSaveEmitFile = "compileOnSaveEmitFile",
    Configure = "configure",
    Definition = "definition",
    /** @internal */
    DefinitionFull = "definition-full",
    DefinitionAndBoundSpan = "definitionAndBoundSpan",
    /** @internal */
    DefinitionAndBoundSpanFull = "definitionAndBoundSpan-full",
    Implementation = "implementation",
    /** @internal */
    ImplementationFull = "implementation-full",
    /** @internal */
    EmitOutput = "emit-output",
    Exit = "exit",
    FileReferences = "fileReferences",
    /** @internal */
    FileReferencesFull = "fileReferences-full",
    Format = "format",
    Formatonkey = "formatonkey",
    /** @internal */
    FormatFull = "format-full",
    /** @internal */
    FormatonkeyFull = "formatonkey-full",
    /** @internal */
    FormatRangeFull = "formatRange-full",
    Geterr = "geterr",
    GeterrForProject = "geterrForProject",
    SemanticDiagnosticsSync = "semanticDiagnosticsSync",
    SyntacticDiagnosticsSync = "syntacticDiagnosticsSync",
    SuggestionDiagnosticsSync = "suggestionDiagnosticsSync",
    NavBar = "navbar",
    /** @internal */
    NavBarFull = "navbar-full",
    Navto = "navto",
    /** @internal */
    NavtoFull = "navto-full",
    NavTree = "navtree",
    NavTreeFull = "navtree-full",
    DocumentHighlights = "documentHighlights",
    /** @internal */
    DocumentHighlightsFull = "documentHighlights-full",
    Open = "open",
    Quickinfo = "quickinfo",
    /** @internal */
    QuickinfoFull = "quickinfo-full",
    References = "references",
    /** @internal */
    ReferencesFull = "references-full",
    Reload = "reload",
    Rename = "rename",
    /** @internal */
    RenameInfoFull = "rename-full",
    /** @internal */
    RenameLocationsFull = "renameLocations-full",
    Saveto = "saveto",
    SignatureHelp = "signatureHelp",
    /** @internal */
    SignatureHelpFull = "signatureHelp-full",
    FindSourceDefinition = "findSourceDefinition",
    Status = "status",
    TypeDefinition = "typeDefinition",
    ProjectInfo = "projectInfo",
    ReloadProjects = "reloadProjects",
    Unknown = "unknown",
    OpenExternalProject = "openExternalProject",
    OpenExternalProjects = "openExternalProjects",
    CloseExternalProject = "closeExternalProject",
    /** @internal */
    SynchronizeProjectList = "synchronizeProjectList",
    /** @internal */
    ApplyChangedToOpenFiles = "applyChangedToOpenFiles",
    UpdateOpen = "updateOpen",
    /** @internal */
    EncodedSyntacticClassificationsFull = "encodedSyntacticClassifications-full",
    /** @internal */
    EncodedSemanticClassificationsFull = "encodedSemanticClassifications-full",
    /** @internal */
    Cleanup = "cleanup",
    GetOutliningSpans = "getOutliningSpans",
    /** @internal */
    GetOutliningSpansFull = "outliningSpans", // Full command name is different for backward compatibility purposes
    TodoComments = "todoComments",
    Indentation = "indentation",
    DocCommentTemplate = "docCommentTemplate",
    /** @internal */
    CompilerOptionsDiagnosticsFull = "compilerOptionsDiagnostics-full",
    /** @internal */
    NameOrDottedNameSpan = "nameOrDottedNameSpan",
    /** @internal */
    BreakpointStatement = "breakpointStatement",
    CompilerOptionsForInferredProjects = "compilerOptionsForInferredProjects",
    GetCodeFixes = "getCodeFixes",
    /** @internal */
    GetCodeFixesFull = "getCodeFixes-full",
    GetCombinedCodeFix = "getCombinedCodeFix",
    /** @internal */
    GetCombinedCodeFixFull = "getCombinedCodeFix-full",
    ApplyCodeActionCommand = "applyCodeActionCommand",
    GetSupportedCodeFixes = "getSupportedCodeFixes",

    GetApplicableRefactors = "getApplicableRefactors",
    GetEditsForRefactor = "getEditsForRefactor",
    GetMoveToRefactoringFileSuggestions = "getMoveToRefactoringFileSuggestions",
    GetPasteEdits = "getPasteEdits",
    /** @internal */
    GetEditsForRefactorFull = "getEditsForRefactor-full",

    OrganizeImports = "organizeImports",
    /** @internal */
    OrganizeImportsFull = "organizeImports-full",
    GetEditsForFileRename = "getEditsForFileRename",
    /** @internal */
    GetEditsForFileRenameFull = "getEditsForFileRename-full",
    ConfigurePlugin = "configurePlugin",
    SelectionRange = "selectionRange",
    /** @internal */
    SelectionRangeFull = "selectionRange-full",
    ToggleLineComment = "toggleLineComment",
    /** @internal */
    ToggleLineCommentFull = "toggleLineComment-full",
    ToggleMultilineComment = "toggleMultilineComment",
    /** @internal */
    ToggleMultilineCommentFull = "toggleMultilineComment-full",
    CommentSelection = "commentSelection",
    /** @internal */
    CommentSelectionFull = "commentSelection-full",
    UncommentSelection = "uncommentSelection",
    /** @internal */
    UncommentSelectionFull = "uncommentSelection-full",
    PrepareCallHierarchy = "prepareCallHierarchy",
    ProvideCallHierarchyIncomingCalls = "provideCallHierarchyIncomingCalls",
    ProvideCallHierarchyOutgoingCalls = "provideCallHierarchyOutgoingCalls",
    ProvideInlayHints = "provideInlayHints",
    WatchChange = "watchChange",
    MapCode = "mapCode",
}

/**
 * A Server message
 */
export interface Message {
    /**
     * Sequence number of the message
     */
    seq: number;

    /**
     * One of "request", "response", or "event"
     */
    type: "request" | "response" | "event";
}


/**
 * Client-initiated request message
 */
export interface Request extends Message {
    type: "request";

    /**
     * The command to execute
     */
    command: string;

    /**
     * Object containing arguments for the command
     */
    arguments?: any;
}


/**
 * Server-initiated event message
 */
export interface Event extends Message {
    type: "event";

    /**
     * Name of event
     */
    event: string;

    /**
     * Event-specific information
     */
    body?: any;
}

/**
 * Response by server to client request message.
 */
export interface Response extends Message {
    type: "response";

    /**
     * Sequence number of the request message.
     */
    request_seq: number;

    /**
     * Outcome of the request.
     */
    success: boolean;

    /**
     * The command requested.
     */
    command: string;

    /**
     * If success === false, this should always be provided.
     * Otherwise, may (or may not) contain a success message.
     */
    message?: string;

    /**
     * Contains message body if success === true.
     */
    body?: any;

    /**
     * Contains extra information that plugin can include to be passed on
     */
    metadata?: unknown;

    /**
     * Exposes information about the performance of this request-response pair.
     */
    performanceData?: PerformanceData;
}


export interface PerformanceData {
    /**
     * Time spent updating the program graph, in milliseconds.
     */
    updateGraphDurationMs?: number;
    /**
     * The time spent creating or updating the auto-import program, in milliseconds.
     */
    createAutoImportProviderProgramDurationMs?: number;
}


/**
 * Arguments for FileRequest messages.
 */
export interface FileRequestArgs {
    /**
     * The file for the request (absolute pathname required).
     */
    file: string;

    /*
     * Optional name of project that contains file
     */
    projectFileName?: string;
}

/**
 * Argument for RenameRequest request.
 */
export interface RenameRequestArgs extends FileLocationRequestArgs {
    /**
     * Should text at specified location be found/changed in comments?
     */
    findInComments?: boolean;
    /**
     * Should text at specified location be found/changed in strings?
     */
    findInStrings?: boolean;
}


/**
 * Arguments for GeterrForProject request.
 */
export interface DiagnosticForProjectRequestArgs {
    /**
     * the file requesting project error list
     */
    file: string;

    /**
     * Delay in milliseconds to wait before starting to compute
     * errors for the files in the file list
     */
    delay: number;
}


export interface DiagnosticRequestArgs {
    /**
     * List of file names for which to compute compiler errors.
     * The files will be checked in list order.
     */
    files: string[];

    /**
     * Delay in milliseconds to wait before starting to compute
     * errors for the files in the file list
     */
    delay: number;
}

/**
 * Instances of this interface specify a location in a source file:
 * (file, line, character offset), where line and character offset are 1-based.
 */
export interface FileLocationRequestArgs extends FileRequestArgs {
    /**
     * The line number for the request (1-based).
     */
    line: number;

    /**
     * The character offset (on the line) for the request (1-based).
     */
    offset: number;

    /**
     * Position (can be specified instead of line/offset pair)
     *
     * @internal
     */
    position?: number;
}

/**
 * Location in source code expressed as (one-based) line and (one-based) column offset.
 */
export interface Location {
    line: number;
    offset: number;
}

/**
 * Body of QuickInfoResponse.
 */
export interface QuickInfoResponseBody {
    /**
     * The symbol's kind (such as 'className' or 'parameterName' or plain 'text').
     */
    kind: ScriptElementKind;

    /**
     * Optional modifiers for the kind (such as 'public').
     */
    kindModifiers: string;

    /**
     * Starting file location of symbol.
     */
    start: Location;

    /**
     * One past last character of symbol.
     */
    end: Location;

    /**
     * Type and kind of symbol.
     */
    displayString: string;

    /**
     * Documentation associated with symbol.
     * Display parts when UserPreferences.displayPartsForJSDoc is true, flattened to string otherwise.
     */
    documentation: string | SymbolDisplayPart[];

    /**
     * JSDoc tags associated with symbol.
     */
    tags: JSDocTagInfo[];
}


/**
 *  Information found in an "open" request.
 */
export interface OpenRequestArgs extends FileRequestArgs {
    /**
     * Used when a version of the file content is known to be more up to date than the one on disk.
     * Then the known content will be used upon opening instead of the disk copy
     */
    fileContent?: string;
    /**
     * Used to limit the searching for project config file. If given the searching will stop at this
     * root path; otherwise it will go all the way up to the dist root path.
     */
    projectRootPath?: string;
    /**
     * Used to specify the script kind of the file explicitly. It could be one of the following:
     *      "LPC"
     */
    scriptKindName?: ScriptKindName;
}

export interface JSDocTagInfo {
    /** Name of the JSDoc tag */
    name: string;
    /**
     * Comment text after the JSDoc tag -- the text after the tag name until the next tag or end of comment
     * Display parts when UserPreferences.displayPartsForJSDoc is true, flattened to string otherwise.
     */
    text?: string | SymbolDisplayPart[];
}

/**
 * Arguments to UpdateOpenRequest
 */
export interface UpdateOpenRequestArgs {
    /**
     * List of newly open files
     */
    openFiles?: OpenRequestArgs[];
    /**
     * List of open files files that were changes
     */
    changedFiles?: FileCodeEdits[];
    /**
     * List of files that were closed
     */
    closedFiles?: string[];
}

export interface CodeAction {
    /** Description of the code action to display in the UI of the editor */
    description: string;
    /** Text changes to apply to each file as part of the code action */
    changes: FileCodeEdits[];
    /** A command is an opaque object that should be passed to `ApplyCodeActionCommandRequestArgs` without modification.  */
    commands?: {}[];
}


export interface FileCodeEdits {
    fileName: string;
    textChanges: CodeEdit[];
}


/**
 * Object found in response messages defining an editing
 * instruction for a span of text in source code.  The effect of
 * this instruction is to replace the text starting at start and
 * ending one character before end with newText. For an insertion,
 * the text span is empty.  For a deletion, newText is empty.
 */
export interface CodeEdit {
    /**
     * First character of the text span to edit.
     */
    start: Location;

    /**
     * One character past last character of the text span to edit.
     */
    end: Location;

    /**
     * Replace the span defined above with this string (may be
     * the empty string).
     */
    newText: string;
}

export type CreateFileWatcherEventName = "createFileWatcher";
export interface CreateFileWatcherEventBody {
    readonly id: number;
    readonly path: string;
}


export type CreateDirectoryWatcherEventName = "createDirectoryWatcher";
export interface CreateDirectoryWatcherEvent extends Event {
    readonly event: CreateDirectoryWatcherEventName;
    readonly body: CreateDirectoryWatcherEventBody;
}

export interface CreateDirectoryWatcherEventBody {
    readonly id: number;
    readonly path: string;
    readonly recursive: boolean;
    readonly ignoreUpdate?: boolean;
}

export type CloseFileWatcherEventName = "closeFileWatcher";
export interface CloseFileWatcherEvent extends Event {
    readonly event: CloseFileWatcherEventName;
    readonly body: CloseFileWatcherEventBody;
}

export interface CloseFileWatcherEventBody {
    readonly id: number;
}

export interface WatchChangeRequestArgs {
    id: number;
    created?: string[];
    deleted?: string[];
    updated?: string[];
}

export interface RequestCompletedEventBody {
    request_seq: number;
}

export interface DiagnosticEventBody {
    /**
     * The file for which diagnostic information is reported.
     */
    file: string;

    /**
     * An array of diagnostic information items.
     */
    diagnostics: Diagnostic[];
}

/**
 * Item of diagnostic information found in a DiagnosticEvent message.
 */
export interface Diagnostic {
    /**
     * Starting file location at which text applies.
     */
    start: Location;

    /**
     * The last file location at which the text applies.
     */
    end: Location;

    /**
     * Text of diagnostic message.
     */
    text: string;

    /**
     * The category of the diagnostic message, e.g. "error", "warning", or "suggestion".
     */
    category: string;

    reportsUnnecessary?: {};

    reportsDeprecated?: {};

    /**
     * Any related spans the diagnostic may have, such as other locations relevant to an error, such as declarartion sites
     */
    relatedInformation?: DiagnosticRelatedInformation[];

    /**
     * The error code of the diagnostic message.
     */
    code?: number;

    /**
     * The name of the plugin reporting the message.
     */
    source?: string;
}

/**
 * Represents additional spans returned with a diagnostic which are relevant to it
 */
export interface DiagnosticRelatedInformation {
    /**
     * The category of the related information message, e.g. "error", "warning", or "suggestion".
     */
    category: string;
    /**
     * The code used ot identify the related information
     */
    code: number;
    /**
     * Text of related or additional information.
     */
    message: string;
    /**
     * Associated location
     */
    span?: FileSpan;
}

/**
 * Object found in response messages defining a span of text in source code.
 */
export interface TextSpan {
    /**
     * First character of the definition.
     */
    start: Location;

    /**
     * One character past last character of the definition.
     */
    end: Location;
}


/**
 * Object found in response messages defining a span of text in a specific source file.
 */
export interface FileSpan extends TextSpan {
    /**
     * File containing text span.
     */
    file: string;
}

export type DiagnosticEventKind = "semanticDiag" | "syntaxDiag" | "suggestionDiag" | "allDiag";

export interface SemanticDiagnosticsSyncRequestArgs extends FileRequestArgs {
    includeLinePosition?: boolean;
}


/**
 * Represents diagnostic info that includes location of diagnostic in two forms
 * - start position and length of the error span
 * - startLocation and endLocation - a pair of Location objects that store start/end line and offset of the error span.
 */
export interface DiagnosticWithLinePosition {
    message: string;
    start: number;
    length: number;
    startLocation: Location;
    endLocation: Location;
    category: string;
    code: number;
    /** May store more in future. For now, this will simply be `true` to indicate when a diagnostic is an unused-identifier diagnostic. */
    reportsUnnecessary?: {};
    reportsDeprecated?: {};
    relatedInformation?: DiagnosticRelatedInformation[];
}

export interface DiagnosticWithFileName extends Diagnostic {
    /**
     * Name of the file the diagnostic is in
     */
    fileName: string;
}

export interface TextSpanWithContext extends TextSpan {
    contextStart?: Location;
    contextEnd?: Location;
}

export interface FileSpanWithContext extends FileSpan, TextSpanWithContext {
}

export interface DefinitionInfo extends FileSpanWithContext {
    /**
     * When true, the file may or may not exist.
     */
    unverified?: boolean;
}

/** protocol.NavigationTree is identical to ts.NavigationTree, except using protocol.TextSpan instead of ts.TextSpan */
export interface NavigationTree {
    text: string;
    kind: ScriptElementKind;
    kindModifiers: string;
    spans: TextSpan[];
    nameSpan: TextSpan | undefined;
    childItems?: NavigationTree[];
}

export interface FileRangeRequestArgs extends FileRequestArgs {
    /**
     * The line number for the request (1-based).
     */
    startLine: number;

    /**
     * The character offset (on the line) for the request (1-based).
     */
    startOffset: number;

    /**
     * Position (can be specified instead of line/offset pair)
     *
     * @internal
     */
    startPosition?: number;

    /**
     * The line number for the request (1-based).
     */
    endLine: number;

    /**
     * The character offset (on the line) for the request (1-based).
     */
    endOffset: number;

    /**
     * Position (can be specified instead of line/offset pair)
     *
     * @internal
     */
    endPosition?: number;
}

export const enum IndentStyle {
    None = "None",
    Block = "Block",
    Smart = "Smart",
}

export type FormatCodeSettings = ChangePropertyTypes<lpc.FormatCodeSettings, { indentStyle: IndentStyle | lpc.IndentStyle; }>;

/**
 * Arguments for format messages.
 */
export interface FormatRequestArgs extends FileLocationRequestArgs {
    /**
     * Last line of range for which to format text in file.
     */
    endLine: number;

    /**
     * Character offset on last line of range for which to format text in file.
     */
    endOffset: number;

    /**
     * End position of the range for which to format text in file.
     *
     * @internal
     */
    endPosition?: number;
    /**
     * Format options to be used.
     */
    options?: FormatCodeSettings;
}

export interface ReferencesResponseItem extends FileSpanWithContext {
    /**
     * Text of line containing the reference. Including this
     * with the response avoids latency of editor loading files
     * to show text of reference line (the server already has loaded the referencing files).
     *
     * If {@link UserPreferences.disableLineTextInReferences} is enabled, the property won't be filled
     */
    lineText?: string;

    /**
     * True if reference is a write location, false otherwise.
     */
    isWriteAccess: boolean;

    /**
     * Present only if the search was triggered from a declaration.
     * True indicates that the references refers to the same symbol
     * (i.e. has the same meaning) as the declaration that began the
     * search.
     */
    isDefinition?: boolean;
}

/**
 * The body of a "references" response message.
 */
export interface ReferencesResponseBody {
    /**
     * The file locations referencing the symbol.
     */
    refs: readonly ReferencesResponseItem[];

    /**
     * The name of the symbol.
     */
    symbolName: string;

    /**
     * The start character offset of the symbol (on the line provided by the references request).
     */
    symbolStartOffset: number;

    /**
     * The full display name of the symbol.
     */
    symbolDisplayString: string;
}

/**
 * Response to "references" request.
 */
export interface ReferencesResponse extends Response {
    body?: ReferencesResponseBody;
}

export interface RenameResponseBody {
    /**
     * Information about the item to be renamed.
     */
    info: RenameInfo;

    /**
     * An array of span groups (one per file) that refer to the item to be renamed.
     */
    locs: readonly SpanGroup[];
}

/**
 * Information about the item to be renamed.
 */
export type RenameInfo = RenameInfoSuccess | RenameInfoFailure;

export type RenameInfoSuccess = ChangePropertyTypes<lpc.RenameInfoSuccess, { triggerSpan: TextSpan; }>;


/**
 *  A group of text spans, all in 'file'.
 */
export interface SpanGroup {
    /** The file to which the spans apply */
    file: string;
    /** The text spans in this group */
    locs: RenameTextSpan[];
}

export interface RenameTextSpan extends TextSpanWithContext {
    readonly prefixText?: string;
    readonly suffixText?: string;
}


/**
 * Completions request; value of command field is "completions".
 * Given a file location (file, line, col) and a prefix (which may
 * be the empty string), return the possible completions that
 * begin with prefix.
 */
export interface CompletionsRequest extends FileLocationRequest {
    command: CommandTypes.Completions | CommandTypes.CompletionInfo;
    arguments: CompletionsRequestArgs;
}


/**
 * Completion entry details request; value of command field is
 * "completionEntryDetails".  Given a file location (file, line,
 * col) and an array of completion entry names return more
 * detailed information for each completion entry.
 */
export interface CompletionDetailsRequest extends FileLocationRequest {
    command: CommandTypes.CompletionDetails;
    arguments: CompletionDetailsRequestArgs;
}



/**
 * Arguments for completions messages.
 */
export interface CompletionsRequestArgs extends FileLocationRequestArgs {
    /**
     * Optional prefix to apply to possible completions.
     */
    prefix?: string;
    /**
     * Character that was responsible for triggering completion.
     * Should be `undefined` if a user manually requested completion.
     */
    triggerCharacter?: CompletionsTriggerCharacter;
    triggerKind?: CompletionTriggerKind;
    /**
     * @deprecated Use UserPreferences.includeCompletionsForModuleExports
     */
    includeExternalModuleExports?: boolean;
    /**
     * @deprecated Use UserPreferences.includeCompletionsWithInsertText
     */
    includeInsertTextCompletions?: boolean;
}

export type CompletionEntry = ChangePropertyTypes<Omit<lpc.CompletionEntry, "symbol">, {
    replacementSpan: TextSpan;
    data: unknown;
}>;

export type CompletionInfo = ChangePropertyTypes<lpc.CompletionInfo, {
    entries: readonly CompletionEntry[];
    optionalReplacementSpan: TextSpan;
}>;


/**
 * Arguments for completion details request.
 */
export interface CompletionDetailsRequestArgs extends FileLocationRequestArgs {
    /**
     * Names of one or more entries for which to obtain details.
     */
    entryNames: (string | CompletionEntryIdentifier)[];
}

export interface CompletionEntryIdentifier {
    name: string;
    source?: string;
    data?: unknown;
}

/**
 * Additional completion entry details, available on demand
 */
export type CompletionEntryDetails = ChangePropertyTypes<lpc.CompletionEntryDetails, {
    tags: JSDocTagInfo[];
    codeActions: CodeAction[];
}>;


/**
 * Arguments for EncodedSemanticClassificationsRequest request.
 */
export interface EncodedSemanticClassificationsRequestArgs extends FileRequestArgs {
    /**
     * Start position of the span.
     */
    start: number;
    /**
     * Length of the span.
     */
    length: number;    
}

/**
 * Request whose sole parameter is a file name.
 */
export interface FileRequest extends Request {
    arguments: FileRequestArgs;
}

/**
 * A request to get encoded semantic classifications for a span in the file
 */
export interface EncodedSemanticClassificationsRequest extends FileRequest {
    arguments: EncodedSemanticClassificationsRequestArgs;
}

/**
 * Arguments of a signature help request.
 */
export interface SignatureHelpRequestArgs extends FileLocationRequestArgs {
    /**
     * Reason why signature help was invoked.
     * See each individual possible
     */
    triggerReason?: SignatureHelpTriggerReason;
}

/**
 * Represents a single signature to show in signature help.
 */
export type SignatureHelpItem = ChangePropertyTypes<lpc.SignatureHelpItem, { tags: JSDocTagInfo[]; }>;

/**
 * Signature help items found in the response of a signature help request.
 */
export interface SignatureHelpItems {
    /**
     * The signature help items.
     */
    items: SignatureHelpItem[];

    /**
     * The span for which signature help should appear on a signature
     */
    applicableSpan: TextSpan;

    /**
     * The item selected in the set of available help items.
     */
    selectedItemIndex: number;

    /**
     * The argument selected in the set of parameters.
     */
    argumentIndex: number;

    /**
     * The argument count
     */
    argumentCount: number;
}

export interface CompileOnSaveMixin {
    /**
     * If compile on save is enabled for the project
     */
    compileOnSave?: boolean;
}

/**
 * For external projects, some of the project settings are sent together with
 * compiler settings.
 */
export type ExternalProjectCompilerOptions = CompilerOptions & CompileOnSaveMixin & WatchOptions;

/**
 * External projects have a typeAcquisition option so they need to be added separately to compiler options for inferred projects.
 */
export type InferredProjectCompilerOptions = ExternalProjectCompilerOptions & TypeAcquisition;

/**
 * Argument for SetCompilerOptionsForInferredProjectsRequest request.
 */
export interface SetCompilerOptionsForInferredProjectsArgs {
    /**
     * Compiler options to be used with inferred projects.
     */
    options: InferredProjectCompilerOptions;

    /**
     * Specifies the project root path used to scope compiler options.
     * It is an error to provide this property if the server has not been started with
     * `useInferredProjectPerProjectRoot` enabled.
     */
    projectRootPath?: string;
}

/**
 * Arguments for ProjectInfoRequest request.
 */
export interface ProjectInfoRequestArgs extends FileRequestArgs {
    /**
     * Indicate if the file name list of the project is needed
     */
    needFileNameList: boolean;
}

/**
 * A request to get the project information of the current file.
 */
export interface ProjectInfoRequest extends FileRequest {
    command: CommandTypes.ProjectInfo;
    arguments: ProjectInfoRequestArgs;
}

/**
 * A request whose arguments specify a file location (file, line, col).
 */
export interface FileLocationRequest extends FileRequest {
    arguments: FileLocationRequestArgs;
}

/**
 * Requests a JS Doc comment template for a given position
 */
export interface DocCommentTemplateRequest extends FileLocationRequest {
    command: CommandTypes.DocCommentTemplate;
}

/**
 * Response message body for "projectInfo" request
 */
export interface ProjectInfo {
    /**
     * For configured project, this is the normalized path of the 'tsconfig.json' file
     * For inferred project, this is undefined
     */
    configFileName: string;
    /**
     * The list of normalized file name in the project, including 'lib.d.ts'
     */
    fileNames?: string[];
    /**
     * Indicates if the project has a active language service instance
     */
    languageServiceDisabled?: boolean;
    /**
     * The project's driver type
     */
    driverType?: string;
}

type commandSpec = typeof CommandTypes;
export type CommandTypeMap = { [K in keyof commandSpec]: Request };

/**
 * Request to synchronize list of open files with the client
 */
export interface UpdateOpenRequest extends Request {
    command: CommandTypes.UpdateOpen;
    arguments: UpdateOpenRequestArgs;
}

/**
 * Arguments for geterr messages.
 */
export interface GeterrRequestArgs {
    /**
     * List of file names for which to compute compiler errors.
     * The files will be checked in list order.
     */
    files: string[];

    /**
     * Delay in milliseconds to wait before starting to compute
     * errors for the files in the file list
     */
    delay: number;
}

/**
 * Geterr request; value of command field is "geterr". Wait for
 * delay milliseconds and then, if during the wait no change or
 * reload messages have arrived for the first file in the files
 * list, get the syntactic errors for the file, field requests,
 * and then get the semantic errors for the file.  Repeat with a
 * smaller delay for each subsequent file on the files list.  Best
 * practice for an editor is to send a file list containing each
 * file that is currently visible, in most-recently-used order.
 */
export interface GeterrRequest extends Request {
    command: CommandTypes.Geterr;
    arguments: GeterrRequestArgs;
}


/**
 * Go to definition request; value of command field is
 * "definition". Return response giving the file locations that
 * define the symbol found in file at location line, col.
 */
export interface DefinitionRequest extends FileLocationRequest {
    command: CommandTypes.Definition;
}


/**
 * Signature help request; value of command field is "signatureHelp".
 * Given a file location (file, line, col), return the signature
 * help.
 */
export interface SignatureHelpRequest extends FileLocationRequest {
    command: CommandTypes.SignatureHelp;
    arguments: SignatureHelpRequestArgs;
}


/**
 * Quickinfo request; value of command field is
 * "quickinfo". Return response giving a quick type and
 * documentation string for the symbol found in file at location
 * line, col.
 */
export interface QuickInfoRequest extends FileLocationRequest {
    command: CommandTypes.Quickinfo;
    arguments: FileLocationRequestArgs;
}

/**
 * Arguments for change request message.
 */
export interface ChangeRequestArgs extends FormatRequestArgs {
    /**
     * Optional string to insert at location (file, line, offset).
     */
    insertString?: string;
}

/**
 * Change request message; value of command field is "change".
 * Update the server's view of the file named by argument 'file'.
 * Server does not currently send a response to a change request.
 */
export interface ChangeRequest extends FileLocationRequest {
    command: CommandTypes.Change;
    arguments: ChangeRequestArgs;
}

export type ScriptKindName = "LPC";

/**
 * Open request; value of command field is "open". Notify the
 * server that the client has file open.  The server will not
 * monitor the filesystem for changes in this file and will assume
 * that the client is updating the server (using the change and/or
 * reload messages) when the file changes. Server does not currently
 * send a response to an open request.
 */
export interface OpenRequest extends Request {
    command: CommandTypes.Open;
    arguments: OpenRequestArgs;
}

/** A part of a symbol description that links from a jsdoc @link tag to a declaration */
export interface JSDocLinkDisplayPart extends SymbolDisplayPart {
    /** The location of the declaration that the @link tag links to. */
    target: FileSpan;
}