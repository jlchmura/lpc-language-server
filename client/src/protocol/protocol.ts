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