// copy of these for now -- but figure out how to sync w/ server project 



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

export const enum EndOfLineState {
    None,
    InMultiLineCommentTrivia,
    InSingleQuoteStringLiteral,
    InDoubleQuoteStringLiteral,
    InTemplateHeadOrNoSubstitutionTemplate,
    InTemplateMiddleOrTail,
    InTemplateSubstitutionPosition,
}

export interface EncodedSemanticClassificationsResponse {
    spans: number[];
    endOfLineState: EndOfLineState;
}

/**
 * Request whose sole parameter is a file name.
 */
export interface FileRequest {
    arguments: FileRequestArgs;
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
 * Location in source code expressed as (one-based) line and (one-based) column offset.
 */
export interface Location {
    line: number;
    offset: number;
}



/**
 * Request whose sole parameter is a file name.
 */
export interface FileRequest  {
    arguments: FileRequestArgs;
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
