import {  ScriptElementKind, SymbolDisplayPart } from "./_namespaces/lpc";
import * as lpc from "./_namespaces/lpc";

type ChangePropertyTypes<T, Substitutions extends { [K in keyof T]?: any; }> = {
    [K in keyof T]: K extends keyof Substitutions ? Substitutions[K] : T[K];
};

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

export type DiagnosticEventKind = "semanticDiag" | "syntaxDiag" | "suggestionDiag";

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

export interface UserPreferences {
    readonly disableSuggestions?: boolean;
    readonly quotePreference?: "auto" | "double" | "single";
    /**
     * If enabled, TypeScript will search through all external modules' exports and add them to the completions list.
     * This affects lone identifier completions but not completions on the right hand side of `obj.`.
     */
    readonly includeCompletionsForModuleExports?: boolean;
    /**
     * Enables auto-import-style completions on partially-typed import statements. E.g., allows
     * `import write|` to be completed to `import { writeFile } from "fs"`.
     */
    readonly includeCompletionsForImportStatements?: boolean;
    /**
     * Allows completions to be formatted with snippet text, indicated by `CompletionItem["isSnippet"]`.
     */
    readonly includeCompletionsWithSnippetText?: boolean;
    /**
     * Unless this option is `false`, or `includeCompletionsWithInsertText` is not enabled,
     * member completion lists triggered with `.` will include entries on potentially-null and potentially-undefined
     * values, with insertion text to replace preceding `.` tokens with `?.`.
     */
    readonly includeAutomaticOptionalChainCompletions?: boolean;
    /**
     * If enabled, the completion list will include completions with invalid identifier names.
     * For those entries, The `insertText` and `replacementSpan` properties will be set to change from `.x` property access to `["x"]`.
     */
    readonly includeCompletionsWithInsertText?: boolean;
    /**
     * If enabled, completions for class members (e.g. methods and properties) will include
     * a whole declaration for the member.
     * E.g., `class A { f| }` could be completed to `class A { foo(): number {} }`, instead of
     * `class A { foo }`.
     */
    readonly includeCompletionsWithClassMemberSnippets?: boolean;
    /**
     * If enabled, object literal methods will have a method declaration completion entry in addition
     * to the regular completion entry containing just the method name.
     * E.g., `const objectLiteral: T = { f| }` could be completed to `const objectLiteral: T = { foo(): void {} }`,
     * in addition to `const objectLiteral: T = { foo }`.
     */
    readonly includeCompletionsWithObjectLiteralMethodSnippets?: boolean;
    /**
     * Indicates whether {@link CompletionEntry.labelDetails completion entry label details} are supported.
     * If not, contents of `labelDetails` may be included in the {@link CompletionEntry.name} property.
     */
    readonly useLabelDetailsInCompletionEntries?: boolean;
    readonly allowIncompleteCompletions?: boolean;
    readonly importModuleSpecifierPreference?: "shortest" | "project-relative" | "relative" | "non-relative";
    /** Determines whether we import `foo/index.ts` as "foo", "foo/index", or "foo/index.js" */
    readonly importModuleSpecifierEnding?: "auto" | "minimal" | "index" | "js";
    readonly allowTextChangesInNewFiles?: boolean;
    readonly providePrefixAndSuffixTextForRename?: boolean;
    readonly includePackageJsonAutoImports?: "auto" | "on" | "off";
    readonly provideRefactorNotApplicableReason?: boolean;
    readonly jsxAttributeCompletionStyle?: "auto" | "braces" | "none";
    readonly includeInlayParameterNameHints?: "none" | "literals" | "all";
    readonly includeInlayParameterNameHintsWhenArgumentMatchesName?: boolean;
    readonly includeInlayFunctionParameterTypeHints?: boolean;
    readonly includeInlayVariableTypeHints?: boolean;
    readonly includeInlayVariableTypeHintsWhenTypeMatchesName?: boolean;
    readonly includeInlayPropertyDeclarationTypeHints?: boolean;
    readonly includeInlayFunctionLikeReturnTypeHints?: boolean;
    readonly includeInlayEnumMemberValueHints?: boolean;
    readonly interactiveInlayHints?: boolean;
    readonly allowRenameOfImportPath?: boolean;
    readonly autoImportFileExcludePatterns?: string[];
    readonly preferTypeOnlyAutoImports?: boolean;
    /**
     * Indicates whether imports should be organized in a case-insensitive manner.
     */
    readonly organizeImportsIgnoreCase?: "auto" | boolean;
    /**
     * Indicates whether imports should be organized via an "ordinal" (binary) comparison using the numeric value
     * of their code points, or via "unicode" collation (via the
     * [Unicode Collation Algorithm](https://unicode.org/reports/tr10/#Scope)) using rules associated with the locale
     * specified in {@link organizeImportsCollationLocale}.
     *
     * Default: `"ordinal"`.
     */
    readonly organizeImportsCollation?: "ordinal" | "unicode";
    /**
     * Indicates the locale to use for "unicode" collation. If not specified, the locale `"en"` is used as an invariant
     * for the sake of consistent sorting. Use `"auto"` to use the detected UI locale.
     *
     * This preference is ignored if {@link organizeImportsCollation} is not `"unicode"`.
     *
     * Default: `"en"`
     */
    readonly organizeImportsLocale?: string;
    /**
     * Indicates whether numeric collation should be used for digit sequences in strings. When `true`, will collate
     * strings such that `a1z < a2z < a100z`. When `false`, will collate strings such that `a1z < a100z < a2z`.
     *
     * This preference is ignored if {@link organizeImportsCollation} is not `"unicode"`.
     *
     * Default: `false`
     */
    readonly organizeImportsNumericCollation?: boolean;
    /**
     * Indicates whether accents and other diacritic marks are considered unequal for the purpose of collation. When
     * `true`, characters with accents and other diacritics will be collated in the order defined by the locale specified
     * in {@link organizeImportsCollationLocale}.
     *
     * This preference is ignored if {@link organizeImportsCollation} is not `"unicode"`.
     *
     * Default: `true`
     */
    readonly organizeImportsAccentCollation?: boolean;
    /**
     * Indicates whether upper case or lower case should sort first. When `false`, the default order for the locale
     * specified in {@link organizeImportsCollationLocale} is used.
     *
     * This preference is ignored if {@link organizeImportsCollation} is not `"unicode"`. This preference is also
     * ignored if we are using case-insensitive sorting, which occurs when {@link organizeImportsIgnoreCase} is `true`,
     * or if {@link organizeImportsIgnoreCase} is `"auto"` and the auto-detected case sensitivity is determined to be
     * case-insensitive.
     *
     * Default: `false`
     */
    readonly organizeImportsCaseFirst?: "upper" | "lower" | false;
    /**
     * Indicates where named type-only imports should sort. "inline" sorts named imports without regard to if the import is
     * type-only.
     *
     * Default: `last`
     */
    readonly organizeImportsTypeOrder?: OrganizeImportsTypeOrder;
    /**
     * Indicates whether to exclude standard library and node_modules file symbols from navTo results.
     */
    readonly excludeLibrarySymbolsInNavTo?: boolean;
    readonly lazyConfiguredProjectsFromExternalProject?: boolean;
    readonly displayPartsForJSDoc?: boolean;
    readonly generateReturnInDocTemplate?: boolean;
    readonly disableLineTextInReferences?: boolean;
}

export type OrganizeImportsTypeOrder = "last" | "inline" | "first";