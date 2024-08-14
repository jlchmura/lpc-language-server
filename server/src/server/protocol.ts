import {  ScriptElementKind, SymbolDisplayPart } from "./_namespaces/lpc";

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
