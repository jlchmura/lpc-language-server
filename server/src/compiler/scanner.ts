import { CharacterCodes } from "../backend/types";
import { arrayIsEqualTo, binarySearch, compareValues, Debug, DiagnosticMessage, Diagnostics, identity, JSDocParsingMode, KeywordSyntaxKind, LanguageVariant, LineAndCharacter, MapLike, positionIsSynthesized, ScriptTarget, SourceFileLike, SyntaxKind, TokenFlags } from "./_namespaces/lpc";

/** @internal */
export function skipTrivia(text: string, pos: number, stopAfterLineBreak?: boolean, stopAtComments?: boolean, inJSDoc?: boolean): number {
    if (positionIsSynthesized(pos)) {
        return pos;
    }

    let canConsumeStar = false;
    // Keep in sync with couldStartTrivia
    while (true) {
        const ch = text.charCodeAt(pos);
        switch (ch) {
            case CharacterCodes.carriageReturn:
                if (text.charCodeAt(pos + 1) === CharacterCodes.lineFeed) {
                    pos++;
                }
            // falls through
            case CharacterCodes.lineFeed:
                pos++;
                if (stopAfterLineBreak) {
                    return pos;
                }
                canConsumeStar = !!inJSDoc;
                continue;
            case CharacterCodes.tab:
            case CharacterCodes.verticalTab:
            case CharacterCodes.formFeed:
            case CharacterCodes.space:
                pos++;
                continue;
            case CharacterCodes.slash:
                if (stopAtComments) {
                    break;
                }
                if (text.charCodeAt(pos + 1) === CharacterCodes.slash) {
                    pos += 2;
                    while (pos < text.length) {
                        if (isLineBreak(text.charCodeAt(pos))) {
                            break;
                        }
                        pos++;
                    }
                    canConsumeStar = false;
                    continue;
                }
                if (text.charCodeAt(pos + 1) === CharacterCodes.asterisk) {
                    pos += 2;
                    while (pos < text.length) {
                        if (text.charCodeAt(pos) === CharacterCodes.asterisk && text.charCodeAt(pos + 1) === CharacterCodes.slash) {
                            pos += 2;
                            break;
                        }
                        pos++;
                    }
                    canConsumeStar = false;
                    continue;
                }
                break;

            case CharacterCodes.lessThan:
            case CharacterCodes.bar:
            case CharacterCodes.equals:
            case CharacterCodes.greaterThan:
                if (isConflictMarkerTrivia(text, pos)) {
                    pos = scanConflictMarkerTrivia(text, pos);
                    canConsumeStar = false;
                    continue;
                }
                break;

            case CharacterCodes.hash:
                if (pos === 0 && isShebangTrivia(text, pos)) {
                    pos = scanShebangTrivia(text, pos);
                    canConsumeStar = false;
                    continue;
                }
                break;

            case CharacterCodes.asterisk:
                if (canConsumeStar) {
                    pos++;
                    canConsumeStar = false;
                    continue;
                }
                break;

            default:
                if (ch > CharacterCodes.maxAsciiCharacter && (isWhiteSpaceLike(ch))) {
                    pos++;
                    continue;
                }
                break;
        }
        return pos;
    }
}

export function isLineBreak(ch: number): boolean {
    // ES5 7.3:
    // The ECMAScript line terminator characters are listed in Table 3.
    //     Table 3: Line Terminator Characters
    //     Code Unit Value     Name                    Formal Name
    //     \u000A              Line Feed               <LF>
    //     \u000D              Carriage Return         <CR>
    //     \u2028              Line separator          <LS>
    //     \u2029              Paragraph separator     <PS>
    // Only the characters in Table 3 are treated as line terminators. Other new line or line
    // breaking characters are treated as white space but not as line terminators.

    return ch === CharacterCodes.lineFeed ||
        ch === CharacterCodes.carriageReturn ||
        ch === CharacterCodes.lineSeparator ||
        ch === CharacterCodes.paragraphSeparator;
}

export function isWhiteSpaceLike(ch: number): boolean {
    return isWhiteSpaceSingleLine(ch) || isLineBreak(ch);
}

/** Does not include line breaks. For that, see isWhiteSpaceLike. */
export function isWhiteSpaceSingleLine(ch: number): boolean {
    // Note: nextLine is in the Zs space, and should be considered to be a whitespace.
    // It is explicitly not a line-break as it isn't in the exact set specified by EcmaScript.
    return ch === CharacterCodes.space ||
        ch === CharacterCodes.tab ||
        ch === CharacterCodes.verticalTab ||
        ch === CharacterCodes.formFeed ||
        ch === CharacterCodes.nonBreakingSpace ||
        ch === CharacterCodes.nextLine ||
        ch === CharacterCodes.ogham ||
        ch >= CharacterCodes.enQuad && ch <= CharacterCodes.zeroWidthSpace ||
        ch === CharacterCodes.narrowNoBreakSpace ||
        ch === CharacterCodes.mathematicalSpace ||
        ch === CharacterCodes.ideographicSpace ||
        ch === CharacterCodes.byteOrderMark;
}

// All conflict markers consist of the same character repeated seven times.  If it is
// a <<<<<<< or >>>>>>> marker then it is also followed by a space.
const mergeConflictMarkerLength = "<<<<<<<".length;

function isConflictMarkerTrivia(text: string, pos: number) {
    Debug.assert(pos >= 0);

    // Conflict markers must be at the start of a line.
    if (pos === 0 || isLineBreak(text.charCodeAt(pos - 1))) {
        const ch = text.charCodeAt(pos);

        if ((pos + mergeConflictMarkerLength) < text.length) {
            for (let i = 0; i < mergeConflictMarkerLength; i++) {
                if (text.charCodeAt(pos + i) !== ch) {
                    return false;
                }
            }

            return ch === CharacterCodes.equals ||
                text.charCodeAt(pos + mergeConflictMarkerLength) === CharacterCodes.space;
        }
    }

    return false;
}

function scanConflictMarkerTrivia(text: string, pos: number, error?: (diag: DiagnosticMessage, pos?: number, len?: number) => void) {
    if (error) {
        error(Diagnostics.Merge_conflict_marker_encountered, pos, mergeConflictMarkerLength);
    }

    const ch = text.charCodeAt(pos);
    const len = text.length;

    if (ch === CharacterCodes.lessThan || ch === CharacterCodes.greaterThan) {
        while (pos < len && !isLineBreak(text.charCodeAt(pos))) {
            pos++;
        }
    }
    else {
        Debug.assert(ch === CharacterCodes.bar || ch === CharacterCodes.equals);
        // Consume everything from the start of a ||||||| or ======= marker to the start
        // of the next ======= or >>>>>>> marker.
        while (pos < len) {
            const currentChar = text.charCodeAt(pos);
            if ((currentChar === CharacterCodes.equals || currentChar === CharacterCodes.greaterThan) && currentChar !== ch && isConflictMarkerTrivia(text, pos)) {
                break;
            }

            pos++;
        }
    }

    return pos;
}


const shebangTriviaRegex = /^#!.*/;

function isShebangTrivia(text: string, pos: number) {
    // Shebangs check must only be done at the start of the file
    Debug.assert(pos === 0);
    return shebangTriviaRegex.test(text);
}

function scanShebangTrivia(text: string, pos: number) {
    const shebang = shebangTriviaRegex.exec(text)![0];
    pos = pos + shebang.length;
    return pos;
}

/** @internal */
export function stringToToken(s: string): SyntaxKind | undefined {
    return textToToken.get(s);
}

/** @internal */
export const textToKeywordObj: MapLike<KeywordSyntaxKind> = {
    // abstract: SyntaxKind.AbstractKeyword,
    // accessor: SyntaxKind.AccessorKeyword,
    // any: SyntaxKind.AnyKeyword,
    // as: SyntaxKind.AsKeyword,
    // asserts: SyntaxKind.AssertsKeyword,
    // assert: SyntaxKind.AssertKeyword,
    // bigint: SyntaxKind.BigIntKeyword,
    // boolean: SyntaxKind.BooleanKeyword,
    break: SyntaxKind.BreakKeyword,
    // case: SyntaxKind.CaseKeyword,
    // catch: SyntaxKind.CatchKeyword,
    // class: SyntaxKind.ClassKeyword,
    continue: SyntaxKind.ContinueKeyword,            
    do: SyntaxKind.DoKeyword,
    else: SyntaxKind.ElseKeyword,    
    //export: SyntaxKind.ExportKeyword,    
    //false: SyntaxKind.FalseKeyword,    
    for: SyntaxKind.ForKeyword,
    float: SyntaxKind.FloatKeyword,
    //from: SyntaxKind.FromKeyword,
    function: SyntaxKind.FunctionKeyword,    
    if: SyntaxKind.IfKeyword,
    //implements: SyntaxKind.ImplementsKeyword,
    //import: SyntaxKind.ImportKeyword,
    in: SyntaxKind.InKeyword,  
    int: SyntaxKind.IntKeyword,      
    //is: SyntaxKind.IsKeyword,    
    new: SyntaxKind.NewKeyword,
    null: SyntaxKind.NullKeyword,    
    object: SyntaxKind.ObjectKeyword,    
    private: SyntaxKind.PrivateKeyword,
    protected: SyntaxKind.ProtectedKeyword,
    public: SyntaxKind.PublicKeyword,            
    return: SyntaxKind.ReturnKeyword,        
    static: SyntaxKind.StaticKeyword,
    string: SyntaxKind.StringKeyword,
    //super: SyntaxKind.SuperKeyword,
    switch: SyntaxKind.SwitchKeyword,        
    //throw: SyntaxKind.ThrowKeyword,    
    //try: SyntaxKind.TryKeyword,    
    unknown: SyntaxKind.UnknownKeyword,    
    void: SyntaxKind.VoidKeyword,
    while: SyntaxKind.WhileKeyword,    
    async: SyntaxKind.AsyncKeyword,        
};

const textToKeyword = new Map(Object.entries(textToKeywordObj));


const textToToken = new Map(Object.entries({
    ...textToKeywordObj,
    "{": SyntaxKind.OpenBraceToken,
    "}": SyntaxKind.CloseBraceToken,
    "(": SyntaxKind.OpenParenToken,
    ")": SyntaxKind.CloseParenToken,
    "[": SyntaxKind.OpenBracketToken,
    "]": SyntaxKind.CloseBracketToken,
    ".": SyntaxKind.DotToken,
    "...": SyntaxKind.DotDotDotToken,
    ";": SyntaxKind.SemicolonToken,
    ",": SyntaxKind.CommaToken,
    "<": SyntaxKind.LessThanToken,
    ">": SyntaxKind.GreaterThanToken,
    "<=": SyntaxKind.LessThanEqualsToken,
    ">=": SyntaxKind.GreaterThanEqualsToken,
    "==": SyntaxKind.EqualsEqualsToken,
    "!=": SyntaxKind.ExclamationEqualsToken,
    "===": SyntaxKind.EqualsEqualsEqualsToken,
    "!==": SyntaxKind.ExclamationEqualsEqualsToken,
    "=>": SyntaxKind.EqualsGreaterThanToken,
    "+": SyntaxKind.PlusToken,
    "-": SyntaxKind.MinusToken,
    "**": SyntaxKind.AsteriskAsteriskToken,
    "*": SyntaxKind.AsteriskToken,
    "/": SyntaxKind.SlashToken,
    "%": SyntaxKind.PercentToken,
    "++": SyntaxKind.PlusPlusToken,
    "--": SyntaxKind.MinusMinusToken,
    "<<": SyntaxKind.LessThanLessThanToken,
    "</": SyntaxKind.LessThanSlashToken,
    ">>": SyntaxKind.GreaterThanGreaterThanToken,
    ">>>": SyntaxKind.GreaterThanGreaterThanGreaterThanToken,
    "&": SyntaxKind.AmpersandToken,
    "|": SyntaxKind.BarToken,
    "^": SyntaxKind.CaretToken,
    "!": SyntaxKind.ExclamationToken,
    "~": SyntaxKind.TildeToken,
    "&&": SyntaxKind.AmpersandAmpersandToken,
    "||": SyntaxKind.BarBarToken,
    "?": SyntaxKind.QuestionToken,    
    "?.": SyntaxKind.QuestionDotToken,
    ":": SyntaxKind.ColonToken,
    "=": SyntaxKind.EqualsToken,
    "+=": SyntaxKind.PlusEqualsToken,
    "-=": SyntaxKind.MinusEqualsToken,
    "*=": SyntaxKind.AsteriskEqualsToken,
    "**=": SyntaxKind.AsteriskAsteriskEqualsToken,
    "/=": SyntaxKind.SlashEqualsToken,
    "%=": SyntaxKind.PercentEqualsToken,
    "<<=": SyntaxKind.LessThanLessThanEqualsToken,
    ">>=": SyntaxKind.GreaterThanGreaterThanEqualsToken,
    ">>>=": SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken,
    "&=": SyntaxKind.AmpersandEqualsToken,
    "|=": SyntaxKind.BarEqualsToken,
    "^=": SyntaxKind.CaretEqualsToken,
    "||=": SyntaxKind.BarBarEqualsToken,    
    "??=": SyntaxKind.QuestionQuestionEqualsToken,
    "@": SyntaxKind.AtToken,
    "#": SyntaxKind.HashToken,    
}));

export type ErrorCallback = (message: DiagnosticMessage, length: number, arg0?: any) => void;

export interface Scanner {
    // TODO

    // /** @deprecated use {@link getTokenFullStart} */
    getStartPos(): number;
    // getToken(): SyntaxKind;
    getTokenFullStart(): number;
    // getTokenStart(): number;
    getTokenEnd(): number;
    /** @deprecated use {@link getTokenEnd} */
    getTextPos(): number;
    // /** @deprecated use {@link getTokenStart} */
    // getTokenPos(): number;
    // getTokenText(): string;
    // getTokenValue(): string;
    // hasUnicodeEscape(): boolean;
    // hasExtendedUnicodeEscape(): boolean;
    // hasPrecedingLineBreak(): boolean;
    // /** @internal */
    // hasPrecedingJSDocComment(): boolean;
    // isIdentifier(): boolean;
    // isReservedWord(): boolean;
    // isUnterminated(): boolean;
    // /** @internal */
    // getNumericLiteralFlags(): TokenFlags;
    // /** @internal */
    // getCommentDirectives(): CommentDirective[] | undefined;
    // /** @internal */
    // getTokenFlags(): TokenFlags;
    // reScanGreaterToken(): SyntaxKind;
    // reScanSlashToken(): SyntaxKind;
    // /** @internal */
    // reScanSlashToken(reportErrors?: boolean): SyntaxKind; // eslint-disable-line @typescript-eslint/unified-signatures
    // reScanAsteriskEqualsToken(): SyntaxKind;
    // reScanTemplateToken(isTaggedTemplate: boolean): SyntaxKind;
    // /** @deprecated use {@link reScanTemplateToken}(false) */
    // reScanTemplateHeadOrNoSubstitutionTemplate(): SyntaxKind;
    // scanJsxIdentifier(): SyntaxKind;
    // scanJsxAttributeValue(): SyntaxKind;
    // reScanJsxAttributeValue(): SyntaxKind;
    // reScanJsxToken(allowMultilineJsxText?: boolean): JsxTokenSyntaxKind;
    // reScanLessThanToken(): SyntaxKind;
    // reScanHashToken(): SyntaxKind;
    // reScanQuestionToken(): SyntaxKind;
    // reScanInvalidIdentifier(): SyntaxKind;
    // scanJsxToken(): JsxTokenSyntaxKind;
    // scanJsDocToken(): JSDocSyntaxKind;
    // /** @internal */
    // scanJSDocCommentTextToken(inBackticks: boolean): JSDocSyntaxKind | SyntaxKind.JSDocCommentTextToken;
    // scan(): SyntaxKind;

    // getText(): string;
    // /** @internal */
    // clearCommentDirectives(): void;
    // // Sets the text for the scanner to scan.  An optional subrange starting point and length
    // // can be provided to have the scanner only scan a portion of the text.
    setText(text: string | undefined, start?: number, length?: number): void;
    // setOnError(onError: ErrorCallback | undefined): void;
    // setScriptTarget(scriptTarget: ScriptTarget): void;
    // setLanguageVariant(variant: LanguageVariant): void;
    // setScriptKind(scriptKind: ScriptKind): void;
    // setJSDocParsingMode(kind: JSDocParsingMode): void;
    // /** @deprecated use {@link resetTokenState} */
    // setTextPos(textPos: number): void;
    // resetTokenState(pos: number): void;
    // /** @internal */
    // setSkipJsDocLeadingAsterisks(skip: boolean): void;
    // // Invokes the provided callback then unconditionally restores the scanner to the state it
    // // was in immediately prior to invoking the callback.  The result of invoking the callback
    // // is returned from this function.
    // lookAhead<T>(callback: () => T): T;

    // // Invokes the callback with the scanner set to scan the specified range. When the callback
    // // returns, the scanner is restored to the state it was in before scanRange was called.
    // scanRange<T>(start: number, length: number, callback: () => T): T;

    // // Invokes the provided callback.  If the callback returns something falsy, then it restores
    // // the scanner to the state it was in immediately prior to invoking the callback.  If the
    // // callback returns something truthy, then the scanner state is not rolled back.  The result
    // // of invoking the callback is returned from this function.
    // tryScan<T>(callback: () => T): T;
}

// Creates a scanner over a (possibly unspecified) range of a piece of text.
export function createScanner(languageVersion: ScriptTarget, skipTrivia: boolean, languageVariant = LanguageVariant.LDMud, textInitial?: string, onError?: ErrorCallback, start?: number, length?: number): Scanner {
    // Why var? It avoids TDZ checks in the runtime which can be costly.
    // See: https://github.com/microsoft/TypeScript/issues/52924
    /* eslint-disable no-var */
    var text = textInitial!;

    // Current position (end position of text of current token)
    var pos: number;

    // end of text
    var end: number;

    // Start position of whitespace before current token
    var fullStartPos: number;

    
    // Start position of text of current token
    var tokenStart: number;

    var token: SyntaxKind;
    var tokenValue!: string;
    var tokenFlags: TokenFlags;

    //var commentDirectives: CommentDirective[] | undefined;
    var skipJsDocLeadingAsterisks = 0;
    
    var jsDocParsingMode = JSDocParsingMode.ParseAll;

    setText(text, start, length);
    
    var scanner: Scanner = {
        getTokenFullStart: () => fullStartPos,
        getStartPos: () => fullStartPos,
        getTokenEnd: () => pos,
        getTextPos: () => pos,
        setText
    };

    return scanner;

    function setText(newText: string | undefined, start: number | undefined, length: number | undefined) {
        text = newText || "";
        end = length === undefined ? text.length : start! + length;
        resetTokenState(start || 0);
    }

    function resetTokenState(position: number) {
        Debug.assert(position >= 0);
        pos = position;
        fullStartPos = position;
        tokenStart = position;
        token = SyntaxKind.Unknown;
        tokenValue = undefined!;
        tokenFlags = TokenFlags.None;
    }
    
}


/**
 * @internal
 * We assume the first line starts at position 0 and 'position' is non-negative.
 */
export function computeLineOfPosition(lineStarts: readonly number[], position: number, lowerBound?: number) {
    let lineNumber = binarySearch(lineStarts, position, identity, compareValues, lowerBound);
    if (lineNumber < 0) {
        // If the actual position was not found,
        // the binary search returns the 2's-complement of the next line start
        // e.g. if the line starts at [5, 10, 23, 80] and the position requested was 20
        // then the search will return -2.
        //
        // We want the index of the previous line start, so we subtract 1.
        // Review 2's-complement if this is confusing.
        lineNumber = ~lineNumber - 1;
        Debug.assert(lineNumber !== -1, "position cannot precede the beginning of the file");
    }
    return lineNumber;
}

/** @internal */
export function computeLineAndCharacterOfPosition(lineStarts: readonly number[], position: number): LineAndCharacter {
    const lineNumber = computeLineOfPosition(lineStarts, position);
    return {
        line: lineNumber,
        character: position - lineStarts[lineNumber],
    };
}


/** @internal */
export function computeLineStarts(text: string): number[] {
    const result: number[] = [];
    let pos = 0;
    let lineStart = 0;
    while (pos < text.length) {
        const ch = text.charCodeAt(pos);
        pos++;
        switch (ch) {
            case CharacterCodes.carriageReturn:
                if (text.charCodeAt(pos) === CharacterCodes.lineFeed) {
                    pos++;
                }
            // falls through
            case CharacterCodes.lineFeed:
                result.push(lineStart);
                lineStart = pos;
                break;
            default:
                if (ch > CharacterCodes.maxAsciiCharacter && isLineBreak(ch)) {
                    result.push(lineStart);
                    lineStart = pos;
                }
                break;
        }
    }
    result.push(lineStart);
    return result;
}

/** @internal */
export function getLineStarts(sourceFile: SourceFileLike): readonly number[] {
    return sourceFile.lineMap || (sourceFile.lineMap = computeLineStarts(sourceFile.text));
}

export function getLineAndCharacterOfPosition(sourceFile: SourceFileLike, position: number): LineAndCharacter {
    return computeLineAndCharacterOfPosition(getLineStarts(sourceFile), position);
}


/** @internal */
export function computePositionOfLineAndCharacter(lineStarts: readonly number[], line: number, character: number, debugText?: string, allowEdits?: true): number {
    if (line < 0 || line >= lineStarts.length) {
        if (allowEdits) {
            // Clamp line to nearest allowable value
            line = line < 0 ? 0 : line >= lineStarts.length ? lineStarts.length - 1 : line;
        }
        else {
            Debug.fail(`Bad line number. Line: ${line}, lineStarts.length: ${lineStarts.length} , line map is correct? ${debugText !== undefined ? arrayIsEqualTo(lineStarts, computeLineStarts(debugText)) : "unknown"}`);
        }
    }

    const res = lineStarts[line] + character;
    if (allowEdits) {
        // Clamp to nearest allowable values to allow the underlying to be edited without crashing (accuracy is lost, instead)
        // TODO: Somehow track edits between file as it was during the creation of sourcemap we have and the current file and
        // apply them to the computed position to improve accuracy
        return res > lineStarts[line + 1] ? lineStarts[line + 1] : typeof debugText === "string" && res > debugText.length ? debugText.length : res;
    }
    if (line < lineStarts.length - 1) {
        Debug.assert(res < lineStarts[line + 1]);
    }
    else if (debugText !== undefined) {
        Debug.assert(res <= debugText.length); // Allow single character overflow for trailing newline
    }
    return res;
}

