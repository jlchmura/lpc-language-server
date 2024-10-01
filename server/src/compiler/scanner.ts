import { CharacterCodes } from "../backend/types";
import { append, arrayIsEqualTo, binarySearch, CommentDirective, CommentDirectiveType, compareValues, Debug, DiagnosticMessage, Diagnostics, identity, JSDocParsingMode, KeywordSyntaxKind, LanguageVariant, LineAndCharacter, MapLike, positionIsSynthesized, PunctuationOrKeywordSyntaxKind, ScriptTarget, SourceFileLike, SyntaxKind, TokenFlags } from "./_namespaces/lpc";

/**
 * Test for whether a single line comment with leading whitespace trimmed's text contains a directive.
 */
const commentDirectiveRegExSingleLine = /^\/\/\/?\s*@(ts-expect-error|ts-ignore)/;

/**
 * Test for whether a multi-line comment with leading whitespace trimmed's last line contains a directive.
 */
const commentDirectiveRegExMultiLine = /^(?:\/|\*)*\s*@(ts-expect-error|ts-ignore)/;

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
    "any": SyntaxKind.AnyKeyword 
}));

export type ErrorCallback = (message: DiagnosticMessage, length: number, arg0?: any) => void;

export interface Scanner {
    // TODO

    // /** @deprecated use {@link getTokenFullStart} */
    getStartPos(): number;
    // getToken(): SyntaxKind;
    getTokenFullStart(): number;
    getTokenStart(): number;
    getTokenEnd(): number;
    /** @deprecated use {@link getTokenEnd} */
    getTextPos(): number;
    // /** @deprecated use {@link getTokenStart} */
    // getTokenPos(): number;
    getTokenText(): string;
    getTokenValue(): string;
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
    scan(): SyntaxKind;

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

    var commentDirectives: CommentDirective[] | undefined;
    var skipJsDocLeadingAsterisks = 0;
    var asteriskSeen = false;

    var jsDocParsingMode = JSDocParsingMode.ParseAll;

    setText(text, start, length);
    
    var scanner: Scanner = {
        getTokenFullStart: () => fullStartPos,
        getStartPos: () => fullStartPos,
        getTokenEnd: () => pos,
        getTextPos: () => pos,
        getTokenStart: () => tokenStart,        
        getTokenText: () => text.substring(tokenStart, pos),
        getTokenValue: () => tokenValue,
        setText,
        scan,
    };

    return scanner;

    /**
     * Returns the code point for the character at the given position within `text`. This
     * should only be used when pos is guaranteed to be within the bounds of `text` as this
     * function does not perform bounds checks.
     */
    function codePointUnchecked(pos: number) {
        return codePointAt(text, pos);
    }

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
    
    function scanBinaryOrOctalDigits(base: 2 | 8): string {
        let value = "";
        // For counting number of digits; Valid binaryIntegerLiteral must have at least one binary digit following B or b.
        // Similarly valid octalIntegerLiteral must have at least one octal digit following o or O.
        let separatorAllowed = false;
        let isPreviousTokenSeparator = false;
        while (true) {
            const ch = charCodeUnchecked(pos);
            // Numeric separators are allowed anywhere within a numeric literal, except not at the beginning, or following another separator
            if (ch === CharacterCodes._) {
                tokenFlags |= TokenFlags.ContainsSeparator;
                if (separatorAllowed) {
                    separatorAllowed = false;
                    isPreviousTokenSeparator = true;
                }
                else if (isPreviousTokenSeparator) {
                    error(Diagnostics.Multiple_consecutive_numeric_separators_are_not_permitted, pos, 1);
                }
                else {
                    error(Diagnostics.Numeric_separators_are_not_allowed_here, pos, 1);
                }
                pos++;
                continue;
            }
            separatorAllowed = true;
            if (!isDigit(ch) || ch - CharacterCodes._0 >= base) {
                break;
            }
            value += text[pos];
            pos++;
            isPreviousTokenSeparator = false;
        }
        if (charCodeUnchecked(pos - 1) === CharacterCodes._) {
            // Literal ends with underscore - not allowed
            error(Diagnostics.Numeric_separators_are_not_allowed_here, pos - 1, 1);
        }
        return value;
    }
    
    function scan(): SyntaxKind {
        fullStartPos = pos;
        tokenFlags = TokenFlags.None;
        asteriskSeen = false;
        while (true) {
            tokenStart = pos;
            if (pos >= end) {
                return token = SyntaxKind.EndOfFileToken;
            }

            const ch = codePointUnchecked(pos);
            if (pos === 0) {
                // Special handling for shebang
                if (ch === CharacterCodes.hash && isShebangTrivia(text, pos)) {
                    pos = scanShebangTrivia(text, pos);
                    if (skipTrivia) {
                        continue;
                    }
                    else {
                        return token = SyntaxKind.ShebangTrivia;
                    }
                }
            }

            switch (ch) {
                case CharacterCodes.lineFeed:
                case CharacterCodes.carriageReturn:
                    tokenFlags |= TokenFlags.PrecedingLineBreak;
                    if (skipTrivia) {
                        pos++;
                        continue;
                    }
                    else {
                        if (ch === CharacterCodes.carriageReturn && pos + 1 < end && charCodeUnchecked(pos + 1) === CharacterCodes.lineFeed) {
                            // consume both CR and LF
                            pos += 2;
                        }
                        else {
                            pos++;
                        }
                        return token = SyntaxKind.NewLineTrivia;
                    }
                case CharacterCodes.tab:
                case CharacterCodes.verticalTab:
                case CharacterCodes.formFeed:
                case CharacterCodes.space:
                case CharacterCodes.nonBreakingSpace:
                case CharacterCodes.ogham:
                case CharacterCodes.enQuad:
                case CharacterCodes.emQuad:
                case CharacterCodes.enSpace:
                case CharacterCodes.emSpace:
                case CharacterCodes.threePerEmSpace:
                case CharacterCodes.fourPerEmSpace:
                case CharacterCodes.sixPerEmSpace:
                case CharacterCodes.figureSpace:
                case CharacterCodes.punctuationSpace:
                case CharacterCodes.thinSpace:
                case CharacterCodes.hairSpace:
                case CharacterCodes.zeroWidthSpace:
                case CharacterCodes.narrowNoBreakSpace:
                case CharacterCodes.mathematicalSpace:
                case CharacterCodes.ideographicSpace:
                case CharacterCodes.byteOrderMark:
                    if (skipTrivia) {
                        pos++;
                        continue;
                    }
                    else {
                        while (pos < end && isWhiteSpaceSingleLine(charCodeUnchecked(pos))) {
                            pos++;
                        }
                        return token = SyntaxKind.WhitespaceTrivia;
                    }
                case CharacterCodes.exclamation:
                    if (charCodeUnchecked(pos + 1) === CharacterCodes.equals) {
                        if (charCodeUnchecked(pos + 2) === CharacterCodes.equals) {
                            return pos += 3, token = SyntaxKind.ExclamationEqualsEqualsToken;
                        }
                        return pos += 2, token = SyntaxKind.ExclamationEqualsToken;
                    }
                    pos++;
                    return token = SyntaxKind.ExclamationToken;
                case CharacterCodes.doubleQuote:
                case CharacterCodes.singleQuote:
                    tokenValue = scanString();
                    return token = SyntaxKind.StringLiteral;
                // case CharacterCodes.backtick:
                //     return token = scanTemplateAndSetTokenValue(/*shouldEmitInvalidEscapeError*/ false);
                case CharacterCodes.percent:
                    if (charCodeUnchecked(pos + 1) === CharacterCodes.equals) {
                        return pos += 2, token = SyntaxKind.PercentEqualsToken;
                    }
                    pos++;
                    return token = SyntaxKind.PercentToken;
                case CharacterCodes.ampersand:
                    // if (charCodeUnchecked(pos + 1) === CharacterCodes.ampersand) {
                    //     if (charCodeUnchecked(pos + 2) === CharacterCodes.equals) {
                    //         return pos += 3, token = SyntaxKind.AmpersandAmpersandEqualsToken;
                    //     }
                    //     return pos += 2, token = SyntaxKind.AmpersandAmpersandToken;
                    // }
                    // if (charCodeUnchecked(pos + 1) === CharacterCodes.equals) {
                    //     return pos += 2, token = SyntaxKind.AmpersandEqualsToken;
                    // }
                    pos++;
                    return token = SyntaxKind.AmpersandToken;
                case CharacterCodes.openParen:
                    pos++;
                    return token = SyntaxKind.OpenParenToken;
                case CharacterCodes.closeParen:
                    pos++;
                    return token = SyntaxKind.CloseParenToken;
                case CharacterCodes.asterisk:
                    if (charCodeUnchecked(pos + 1) === CharacterCodes.equals) {
                        return pos += 2, token = SyntaxKind.AsteriskEqualsToken;
                    }
                    if (charCodeUnchecked(pos + 1) === CharacterCodes.asterisk) {
                        if (charCodeUnchecked(pos + 2) === CharacterCodes.equals) {
                            return pos += 3, token = SyntaxKind.AsteriskAsteriskEqualsToken;
                        }
                        return pos += 2, token = SyntaxKind.AsteriskAsteriskToken;
                    }
                    pos++;
                    if (skipJsDocLeadingAsterisks && !asteriskSeen && (tokenFlags & TokenFlags.PrecedingLineBreak)) {
                        // decoration at the start of a JSDoc comment line
                        asteriskSeen = true;
                        continue;
                    }
                    return token = SyntaxKind.AsteriskToken;
                case CharacterCodes.plus:
                    if (charCodeUnchecked(pos + 1) === CharacterCodes.plus) {
                        return pos += 2, token = SyntaxKind.PlusPlusToken;
                    }
                    if (charCodeUnchecked(pos + 1) === CharacterCodes.equals) {
                        return pos += 2, token = SyntaxKind.PlusEqualsToken;
                    }
                    pos++;
                    return token = SyntaxKind.PlusToken;
                case CharacterCodes.comma:
                    pos++;
                    return token = SyntaxKind.CommaToken;
                case CharacterCodes.minus:
                    if (charCodeUnchecked(pos + 1) === CharacterCodes.minus) {
                        return pos += 2, token = SyntaxKind.MinusMinusToken;
                    }
                    if (charCodeUnchecked(pos + 1) === CharacterCodes.equals) {
                        return pos += 2, token = SyntaxKind.MinusEqualsToken;
                    }
                    pos++;
                    return token = SyntaxKind.MinusToken;
                case CharacterCodes.dot:
                    if (isDigit(charCodeUnchecked(pos + 1))) {
                        scanNumber();
                        return token = SyntaxKind.NumericLiteral;
                    }
                    if (charCodeUnchecked(pos + 1) === CharacterCodes.dot && charCodeUnchecked(pos + 2) === CharacterCodes.dot) {
                        return pos += 3, token = SyntaxKind.DotDotDotToken;
                    }
                    pos++;
                    return token = SyntaxKind.DotToken;
                case CharacterCodes.slash:
                    // Single-line comment
                    if (charCodeUnchecked(pos + 1) === CharacterCodes.slash) {
                        pos += 2;

                        while (pos < end) {
                            if (isLineBreak(charCodeUnchecked(pos))) {
                                break;
                            }
                            pos++;
                        }

                        commentDirectives = appendIfCommentDirective(
                            commentDirectives,
                            text.slice(tokenStart, pos),
                            commentDirectiveRegExSingleLine,
                            tokenStart,
                        );

                        if (skipTrivia) {
                            continue;
                        }
                        else {
                            return token = SyntaxKind.SingleLineCommentTrivia;
                        }
                    }
                    // Multi-line comment
                    if (charCodeUnchecked(pos + 1) === CharacterCodes.asterisk) {
                        pos += 2;
                        const isJSDoc = charCodeUnchecked(pos) === CharacterCodes.asterisk && charCodeUnchecked(pos + 1) !== CharacterCodes.slash;

                        let commentClosed = false;
                        let lastLineStart = tokenStart;
                        while (pos < end) {
                            const ch = charCodeUnchecked(pos);

                            if (ch === CharacterCodes.asterisk && charCodeUnchecked(pos + 1) === CharacterCodes.slash) {
                                pos += 2;
                                commentClosed = true;
                                break;
                            }

                            pos++;

                            if (isLineBreak(ch)) {
                                lastLineStart = pos;
                                tokenFlags |= TokenFlags.PrecedingLineBreak;
                            }
                        }

                        if (isJSDoc && shouldParseJSDoc()) {
                            tokenFlags |= TokenFlags.PrecedingJSDocComment;
                        }

                        commentDirectives = appendIfCommentDirective(commentDirectives, text.slice(lastLineStart, pos), commentDirectiveRegExMultiLine, lastLineStart);

                        if (!commentClosed) {
                            error(Diagnostics.Asterisk_Slash_expected);
                        }

                        if (skipTrivia) {
                            continue;
                        }
                        else {
                            if (!commentClosed) {
                                tokenFlags |= TokenFlags.Unterminated;
                            }
                            return token = SyntaxKind.MultiLineCommentTrivia;
                        }
                    }

                    if (charCodeUnchecked(pos + 1) === CharacterCodes.equals) {
                        return pos += 2, token = SyntaxKind.SlashEqualsToken;
                    }

                    pos++;
                    return token = SyntaxKind.SlashToken;

                case CharacterCodes._0:
                    if (pos + 2 < end && (charCodeUnchecked(pos + 1) === CharacterCodes.X || charCodeUnchecked(pos + 1) === CharacterCodes.x)) {
                        pos += 2;
                        tokenValue = scanMinimumNumberOfHexDigits(1, /*canHaveSeparators*/ true);
                        if (!tokenValue) {
                            error(Diagnostics.Hexadecimal_digit_expected);
                            tokenValue = "0";
                        }
                        tokenValue = "0x" + tokenValue;
                        tokenFlags |= TokenFlags.HexSpecifier;
                        return token = checkBigIntSuffix();
                    }
                    else if (pos + 2 < end && (charCodeUnchecked(pos + 1) === CharacterCodes.B || charCodeUnchecked(pos + 1) === CharacterCodes.b)) {
                        pos += 2;
                        tokenValue = scanBinaryOrOctalDigits(/* base */ 2);
                        if (!tokenValue) {
                            error(Diagnostics.Binary_digit_expected);
                            tokenValue = "0";
                        }
                        tokenValue = "0b" + tokenValue;
                        tokenFlags |= TokenFlags.BinarySpecifier;
                        return token = checkBigIntSuffix();
                    }
                    else if (pos + 2 < end && (charCodeUnchecked(pos + 1) === CharacterCodes.O || charCodeUnchecked(pos + 1) === CharacterCodes.o)) {
                        pos += 2;
                        tokenValue = scanBinaryOrOctalDigits(/* base */ 8);
                        if (!tokenValue) {
                            error(Diagnostics.Octal_digit_expected);
                            tokenValue = "0";
                        }
                        tokenValue = "0o" + tokenValue;
                        tokenFlags |= TokenFlags.OctalSpecifier;
                        return token = checkBigIntSuffix();
                    }
                // falls through
                case CharacterCodes._1:
                case CharacterCodes._2:
                case CharacterCodes._3:
                case CharacterCodes._4:
                case CharacterCodes._5:
                case CharacterCodes._6:
                case CharacterCodes._7:
                case CharacterCodes._8:
                case CharacterCodes._9:
                    return token = scanNumber();
                case CharacterCodes.colon:
                    pos++;
                    return token = SyntaxKind.ColonToken;
                case CharacterCodes.semicolon:
                    pos++;
                    return token = SyntaxKind.SemicolonToken;
                case CharacterCodes.lessThan:
                    if (isConflictMarkerTrivia(text, pos)) {
                        pos = scanConflictMarkerTrivia(text, pos, error);
                        if (skipTrivia) {
                            continue;
                        }
                        else {
                            return token = SyntaxKind.ConflictMarkerTrivia;
                        }
                    }

                    if (charCodeUnchecked(pos + 1) === CharacterCodes.lessThan) {
                        if (charCodeUnchecked(pos + 2) === CharacterCodes.equals) {
                            return pos += 3, token = SyntaxKind.LessThanLessThanEqualsToken;
                        }
                        return pos += 2, token = SyntaxKind.LessThanLessThanToken;
                    }
                    if (charCodeUnchecked(pos + 1) === CharacterCodes.equals) {
                        return pos += 2, token = SyntaxKind.LessThanEqualsToken;
                    }
                    // if (
                    //     languageVariant === LanguageVariant.JSX &&
                    //     charCodeUnchecked(pos + 1) === CharacterCodes.slash &&
                    //     charCodeUnchecked(pos + 2) !== CharacterCodes.asterisk
                    // ) {
                    //     return pos += 2, token = SyntaxKind.LessThanSlashToken;
                    // }
                    pos++;
                    return token = SyntaxKind.LessThanToken;
                case CharacterCodes.equals:
                    if (isConflictMarkerTrivia(text, pos)) {
                        pos = scanConflictMarkerTrivia(text, pos, error);
                        if (skipTrivia) {
                            continue;
                        }
                        else {
                            return token = SyntaxKind.ConflictMarkerTrivia;
                        }
                    }

                    if (charCodeUnchecked(pos + 1) === CharacterCodes.equals) {
                        if (charCodeUnchecked(pos + 2) === CharacterCodes.equals) {
                            return pos += 3, token = SyntaxKind.EqualsEqualsEqualsToken;
                        }
                        return pos += 2, token = SyntaxKind.EqualsEqualsToken;
                    }
                    if (charCodeUnchecked(pos + 1) === CharacterCodes.greaterThan) {
                        return pos += 2, token = SyntaxKind.EqualsGreaterThanToken;
                    }
                    pos++;
                    return token = SyntaxKind.EqualsToken;
                case CharacterCodes.greaterThan:
                    if (isConflictMarkerTrivia(text, pos)) {
                        pos = scanConflictMarkerTrivia(text, pos, error);
                        if (skipTrivia) {
                            continue;
                        }
                        else {
                            return token = SyntaxKind.ConflictMarkerTrivia;
                        }
                    }

                    pos++;
                    return token = SyntaxKind.GreaterThanToken;
                case CharacterCodes.question:
                    if (charCodeUnchecked(pos + 1) === CharacterCodes.dot && !isDigit(charCodeUnchecked(pos + 2))) {
                        return pos += 2, token = SyntaxKind.QuestionDotToken;
                    }
                    if (charCodeUnchecked(pos + 1) === CharacterCodes.question) {
                        if (charCodeUnchecked(pos + 2) === CharacterCodes.equals) {
                            return pos += 3, token = SyntaxKind.QuestionQuestionEqualsToken;
                        }
                        return pos += 2, token = SyntaxKind.QuestionQuestionToken;
                    }
                    pos++;
                    return token = SyntaxKind.QuestionToken;
                case CharacterCodes.openBracket:
                    pos++;
                    return token = SyntaxKind.OpenBracketToken;
                case CharacterCodes.closeBracket:
                    pos++;
                    return token = SyntaxKind.CloseBracketToken;
                case CharacterCodes.caret:
                    if (charCodeUnchecked(pos + 1) === CharacterCodes.equals) {
                        return pos += 2, token = SyntaxKind.CaretEqualsToken;
                    }
                    pos++;
                    return token = SyntaxKind.CaretToken;
                case CharacterCodes.openBrace:
                    pos++;
                    return token = SyntaxKind.OpenBraceToken;
                case CharacterCodes.bar:
                    if (isConflictMarkerTrivia(text, pos)) {
                        pos = scanConflictMarkerTrivia(text, pos, error);
                        if (skipTrivia) {
                            continue;
                        }
                        else {
                            return token = SyntaxKind.ConflictMarkerTrivia;
                        }
                    }

                    if (charCodeUnchecked(pos + 1) === CharacterCodes.bar) {
                        if (charCodeUnchecked(pos + 2) === CharacterCodes.equals) {
                            return pos += 3, token = SyntaxKind.BarBarEqualsToken;
                        }
                        return pos += 2, token = SyntaxKind.BarBarToken;
                    }
                    if (charCodeUnchecked(pos + 1) === CharacterCodes.equals) {
                        return pos += 2, token = SyntaxKind.BarEqualsToken;
                    }
                    pos++;
                    return token = SyntaxKind.BarToken;
                case CharacterCodes.closeBrace:
                    pos++;
                    return token = SyntaxKind.CloseBraceToken;
                case CharacterCodes.tilde:
                    pos++;
                    return token = SyntaxKind.TildeToken;
                case CharacterCodes.at:
                    pos++;
                    return token = SyntaxKind.AtToken;
                case CharacterCodes.backslash:
                    const extendedCookedChar = peekExtendedUnicodeEscape();
                    if (extendedCookedChar >= 0 && isIdentifierStart(extendedCookedChar, languageVersion)) {
                        tokenValue = scanExtendedUnicodeEscape(/*shouldEmitInvalidEscapeError*/ true) + scanIdentifierParts();
                        return token = getIdentifierToken();
                    }

                    const cookedChar = peekUnicodeEscape();
                    if (cookedChar >= 0 && isIdentifierStart(cookedChar, languageVersion)) {
                        pos += 6;
                        tokenFlags |= TokenFlags.UnicodeEscape;
                        tokenValue = String.fromCharCode(cookedChar) + scanIdentifierParts();
                        return token = getIdentifierToken();
                    }

                    error(Diagnostics.Invalid_character);
                    pos++;
                    return token = SyntaxKind.Unknown;
                case CharacterCodes.hash:
                    if (pos !== 0 && text[pos + 1] === "!") {
                        error(Diagnostics.can_only_be_used_at_the_start_of_a_file, pos, 2);
                        pos++;
                        return token = SyntaxKind.Unknown;
                    }

                    const charAfterHash = codePointUnchecked(pos + 1);
                    if (charAfterHash === CharacterCodes.backslash) {
                        pos++;
                        const extendedCookedChar = peekExtendedUnicodeEscape();
                        // if (extendedCookedChar >= 0 && isIdentifierStart(extendedCookedChar, languageVersion)) {
                        //     tokenValue = "#" + scanExtendedUnicodeEscape(/*shouldEmitInvalidEscapeError*/ true) + scanIdentifierParts();
                        //     return token = SyntaxKind.PrivateIdentifier;
                        // }

                        const cookedChar = peekUnicodeEscape();
                        // if (cookedChar >= 0 && isIdentifierStart(cookedChar, languageVersion)) {
                        //     pos += 6;
                        //     tokenFlags |= TokenFlags.UnicodeEscape;
                        //     tokenValue = "#" + String.fromCharCode(cookedChar) + scanIdentifierParts();
                        //     return token = SyntaxKind.PrivateIdentifier;
                        // }
                        pos--;
                    }

                    if (isIdentifierStart(charAfterHash, languageVersion)) {
                        pos++;
                        // We're relying on scanIdentifier's behavior and adjusting the token kind after the fact.
                        // Notably absent from this block is the fact that calling a function named "scanIdentifier",
                        // but identifiers don't include '#', and that function doesn't deal with it at all.
                        // This works because 'scanIdentifier' tries to reuse source characters and builds up substrings;
                        // however, it starts at the 'tokenPos' which includes the '#', and will "accidentally" prepend the '#' for us.
                        scanIdentifier(charAfterHash, languageVersion);
                    }
                    else {
                        tokenValue = "#";
                        error(Diagnostics.Invalid_character, pos++, charSize(ch));
                    }
                    error(Diagnostics.Invalid_character, pos++, charSize(ch));
                    // return token = SyntaxKind.PrivateIdentifier;
                case CharacterCodes.replacementCharacter:
                    error(Diagnostics.File_appears_to_be_binary, 0, 0);
                    pos = end;
                    return token = SyntaxKind.NonTextFileMarkerTrivia;
                default:
                    const identifierKind = scanIdentifier(ch, languageVersion);
                    if (identifierKind) {
                        return token = identifierKind;
                    }
                    else if (isWhiteSpaceSingleLine(ch)) {
                        pos += charSize(ch);
                        continue;
                    }
                    else if (isLineBreak(ch)) {
                        tokenFlags |= TokenFlags.PrecedingLineBreak;
                        pos += charSize(ch);
                        continue;
                    }
                    const size = charSize(ch);
                    error(Diagnostics.Invalid_character, pos, size);
                    pos += size;
                    return token = SyntaxKind.Unknown;
            }
        }
    }

    /**
     * Returns the char code for the character at the given position within `text`. This
     * should only be used when pos is guaranteed to be within the bounds of `text` as this
     * function does not perform bounds checks.
     */
    function charCodeUnchecked(pos: number) {
        return text.charCodeAt(pos);
    }

    function getDirectiveFromComment(text: string, commentDirectiveRegEx: RegExp) {
        const match = commentDirectiveRegEx.exec(text);
        if (!match) {
            return undefined;
        }

        switch (match[1]) {
            case "ts-expect-error":
                return CommentDirectiveType.ExpectError;

            case "ts-ignore":
                return CommentDirectiveType.Ignore;
        }

        return undefined;
    }

    /**
     * Returns the char code for the character at the given position within `text`. If
     * `pos` is outside the bounds set for `text`, `CharacterCodes.EOF` is returned instead.
     */
    function charCodeChecked(pos: number) {
        return pos >= 0 && pos < end ? charCodeUnchecked(pos) : CharacterCodes.EOF;
    }
    
    function error(message: DiagnosticMessage): void;
    function error(message: DiagnosticMessage, errPos: number, length: number, arg0?: any): void;
    function error(message: DiagnosticMessage, errPos: number = pos, length?: number, arg0?: any): void {
        if (onError) {
            const oldPos = pos;
            pos = errPos;
            onError(message, length || 0, arg0);
            pos = oldPos;
        }
    }
    
    function shouldParseJSDoc() {
        return true;
        // switch (jsDocParsingMode) {
        //     case JSDocParsingMode.ParseAll:
        //         return true;
        //     case JSDocParsingMode.ParseNone:
        //         return false;
        // }

        // if (scriptKind !== ScriptKind.TS && scriptKind !== ScriptKind.TSX) {
        //     // If outside of TS, we need JSDoc to get any type info.
        //     return true;
        // }

        // if (jsDocParsingMode === JSDocParsingMode.ParseForTypeInfo) {
        //     // If we're in TS, but we don't need to produce reliable errors,
        //     // we don't need to parse to find @see or @link.
        //     return false;
        // }

        // return jsDocSeeOrLink.test(text.slice(fullStartPos, pos));
    }

    function appendIfCommentDirective(
        commentDirectives: CommentDirective[] | undefined,
        text: string,
        commentDirectiveRegEx: RegExp,
        lineStart: number,
    ) {
        const type = getDirectiveFromComment(text.trimStart(), commentDirectiveRegEx);
        if (type === undefined) {
            return commentDirectives;
        }

        return append(
            commentDirectives,
            {
                range: { pos: lineStart, end: pos },
                type,
            },
        );
    }
    
    function scanIdentifierParts(): string {
        let result = "";
        let start = pos;
        while (pos < end) {
            let ch = codePointUnchecked(pos);
            if (isIdentifierPart(ch, languageVersion)) {
                pos += charSize(ch);
            }
            else if (ch === CharacterCodes.backslash) {
                ch = peekExtendedUnicodeEscape();
                if (ch >= 0 && isIdentifierPart(ch, languageVersion)) {
                    result += scanExtendedUnicodeEscape(/*shouldEmitInvalidEscapeError*/ true);
                    start = pos;
                    continue;
                }
                ch = peekUnicodeEscape();
                if (!(ch >= 0 && isIdentifierPart(ch, languageVersion))) {
                    break;
                }
                tokenFlags |= TokenFlags.UnicodeEscape;
                result += text.substring(start, pos);
                result += utf16EncodeAsString(ch);
                // Valid Unicode escape is always six characters
                pos += 6;
                start = pos;
            }
            else {
                break;
            }
        }
        result += text.substring(start, pos);
        return result;
    }

    function scanIdentifier(startCharacter: number, languageVersion: ScriptTarget) {
        let ch = startCharacter;
        if (isIdentifierStart(ch, languageVersion)) {
            pos += charSize(ch);
            while (pos < end && isIdentifierPart(ch = codePointUnchecked(pos), languageVersion)) pos += charSize(ch);
            tokenValue = text.substring(tokenStart, pos);
            if (ch === CharacterCodes.backslash) {
                tokenValue += scanIdentifierParts();
            }
            return getIdentifierToken();
        }
    }

    /**
     * Scans the given number of hexadecimal digits in the text,
     * returning -1 if the given number is unavailable.
     */
    function scanExactNumberOfHexDigits(count: number, canHaveSeparators: boolean): number {
        const valueString = scanHexDigits(/*minCount*/ count, /*scanAsManyAsPossible*/ false, canHaveSeparators);
        return valueString ? parseInt(valueString, 16) : -1;
    }
    
    /**
     * Scans as many hexadecimal digits as are available in the text,
     * returning "" if the given number of digits was unavailable.
     */
    function scanMinimumNumberOfHexDigits(count: number, canHaveSeparators: boolean): string {
        return scanHexDigits(/*minCount*/ count, /*scanAsManyAsPossible*/ true, canHaveSeparators);
    }

    function scanHexDigits(minCount: number, scanAsManyAsPossible: boolean, canHaveSeparators: boolean): string {
        let valueChars: number[] = [];
        let allowSeparator = false;
        let isPreviousTokenSeparator = false;
        while (valueChars.length < minCount || scanAsManyAsPossible) {
            let ch = charCodeUnchecked(pos);
            if (canHaveSeparators && ch === CharacterCodes._) {
                tokenFlags |= TokenFlags.ContainsSeparator;
                if (allowSeparator) {
                    allowSeparator = false;
                    isPreviousTokenSeparator = true;
                }
                else if (isPreviousTokenSeparator) {
                    error(Diagnostics.Multiple_consecutive_numeric_separators_are_not_permitted, pos, 1);
                }
                else {
                    error(Diagnostics.Numeric_separators_are_not_allowed_here, pos, 1);
                }
                pos++;
                continue;
            }
            allowSeparator = canHaveSeparators;
            if (ch >= CharacterCodes.A && ch <= CharacterCodes.F) {
                ch += CharacterCodes.a - CharacterCodes.A; // standardize hex literals to lowercase
            }
            else if (
                !((ch >= CharacterCodes._0 && ch <= CharacterCodes._9) ||
                    (ch >= CharacterCodes.a && ch <= CharacterCodes.f))
            ) {
                break;
            }
            valueChars.push(ch);
            pos++;
            isPreviousTokenSeparator = false;
        }
        if (valueChars.length < minCount) {
            valueChars = [];
        }
        if (charCodeUnchecked(pos - 1) === CharacterCodes._) {
            error(Diagnostics.Numeric_separators_are_not_allowed_here, pos - 1, 1);
        }
        return String.fromCharCode(...valueChars);
    }

    function scanString(jsxAttributeString = false): string {
        const quote = charCodeUnchecked(pos);
        pos++;
        let result = "";
        let start = pos;
        while (true) {
            if (pos >= end) {
                result += text.substring(start, pos);
                tokenFlags |= TokenFlags.Unterminated;
                error(Diagnostics.Unterminated_string_literal);
                break;
            }
            const ch = charCodeUnchecked(pos);
            if (ch === quote) {
                result += text.substring(start, pos);
                pos++;
                break;
            }
            if (ch === CharacterCodes.backslash && !jsxAttributeString) {
                result += text.substring(start, pos);
                result += scanEscapeSequence(EscapeSequenceScanningFlags.String | EscapeSequenceScanningFlags.ReportErrors);
                start = pos;
                continue;
            }

            if ((ch === CharacterCodes.lineFeed || ch === CharacterCodes.carriageReturn) && !jsxAttributeString) {
                result += text.substring(start, pos);
                tokenFlags |= TokenFlags.Unterminated;
                error(Diagnostics.Unterminated_string_literal);
                break;
            }
            pos++;
        }
        return result;
    }

    // Current character is known to be a backslash. Check for Unicode escape of the form '\uXXXX'
    // and return code point value if valid Unicode escape is found. Otherwise return -1.
    function peekUnicodeEscape(): number {
        if (pos + 5 < end && charCodeUnchecked(pos + 1) === CharacterCodes.u) {
            const start = pos;
            pos += 2;
            const value = scanExactNumberOfHexDigits(4, /*canHaveSeparators*/ false);
            pos = start;
            return value;
        }
        return -1;
    }

    function peekExtendedUnicodeEscape(): number {
        if (codePointUnchecked(pos + 1) === CharacterCodes.u && codePointUnchecked(pos + 2) === CharacterCodes.openBrace) {
            const start = pos;
            pos += 3;
            const escapedValueString = scanMinimumNumberOfHexDigits(1, /*canHaveSeparators*/ false);
            const escapedValue = escapedValueString ? parseInt(escapedValueString, 16) : -1;
            pos = start;
            return escapedValue;
        }
        return -1;
    }

    function scanExtendedUnicodeEscape(shouldEmitInvalidEscapeError: boolean): string {
        const start = pos;
        pos += 3;
        const escapedStart = pos;
        const escapedValueString = scanMinimumNumberOfHexDigits(1, /*canHaveSeparators*/ false);
        const escapedValue = escapedValueString ? parseInt(escapedValueString, 16) : -1;
        let isInvalidExtendedEscape = false;

        // Validate the value of the digit
        if (escapedValue < 0) {
            if (shouldEmitInvalidEscapeError) {
                error(Diagnostics.Hexadecimal_digit_expected);
            }
            isInvalidExtendedEscape = true;
        }
        else if (escapedValue > 0x10FFFF) {
            if (shouldEmitInvalidEscapeError) {
                error(Diagnostics.An_extended_Unicode_escape_value_must_be_between_0x0_and_0x10FFFF_inclusive, escapedStart, pos - escapedStart);
            }
            isInvalidExtendedEscape = true;
        }

        if (pos >= end) {
            if (shouldEmitInvalidEscapeError) {
                error(Diagnostics.Unexpected_end_of_text);
            }
            isInvalidExtendedEscape = true;
        }
        else if (charCodeUnchecked(pos) === CharacterCodes.closeBrace) {
            // Only swallow the following character up if it's a '}'.
            pos++;
        }
        else {
            if (shouldEmitInvalidEscapeError) {
                error(Diagnostics.Unterminated_Unicode_escape_sequence);
            }
            isInvalidExtendedEscape = true;
        }

        if (isInvalidExtendedEscape) {
            tokenFlags |= TokenFlags.ContainsInvalidEscape;
            return text.substring(start, pos);
        }

        tokenFlags |= TokenFlags.ExtendedUnicodeEscape;
        return utf16EncodeAsString(escapedValue);
    }

    function getIdentifierToken(): SyntaxKind.Identifier | KeywordSyntaxKind {
        // Reserved words are between 2 and 12 characters long and start with a lowercase letter
        const len = tokenValue.length;
        if (len >= 2 && len <= 12) {
            const ch = tokenValue.charCodeAt(0);
            if (ch >= CharacterCodes.a && ch <= CharacterCodes.z) {
                const keyword = textToKeyword.get(tokenValue);
                if (keyword !== undefined) {
                    return token = keyword;
                }
            }
        }
        return token = SyntaxKind.Identifier;
    }

    // Extract from Section A.1
    // EscapeSequence ::=
    //     | CharacterEscapeSequence
    //     | 0 (?![0-9])
    //     | LegacyOctalEscapeSequence
    //     | NonOctalDecimalEscapeSequence
    //     | HexEscapeSequence
    //     | UnicodeEscapeSequence
    // LegacyOctalEscapeSequence ::=
    //     | '0' (?=[89])
    //     | [1-7] (?![0-7])
    //     | [0-3] [0-7] [0-7]?
    //     | [4-7] [0-7]
    // NonOctalDecimalEscapeSequence ::= [89]
    function scanEscapeSequence(flags: EscapeSequenceScanningFlags): string {
        const start = pos;
        pos++;
        if (pos >= end) {
            error(Diagnostics.Unexpected_end_of_text);
            return "";
        }
        const ch = charCodeUnchecked(pos);
        pos++;
        switch (ch) {
            case CharacterCodes._0:
                // Although '0' preceding any digit is treated as LegacyOctalEscapeSequence,
                // '\08' should separately be interpreted as '\0' + '8'.
                if (pos >= end || !isDigit(charCodeUnchecked(pos))) {
                    return "\0";
                }
            // '\01', '\011'
            // falls through
            case CharacterCodes._1:
            case CharacterCodes._2:
            case CharacterCodes._3:
                // '\1', '\17', '\177'
                if (pos < end && isOctalDigit(charCodeUnchecked(pos))) {
                    pos++;
                }
            // '\17', '\177'
            // falls through
            case CharacterCodes._4:
            case CharacterCodes._5:
            case CharacterCodes._6:
            case CharacterCodes._7:
                // '\4', '\47' but not '\477'
                if (pos < end && isOctalDigit(charCodeUnchecked(pos))) {
                    pos++;
                }
                // '\47'
                tokenFlags |= TokenFlags.ContainsInvalidEscape;
                if (flags & EscapeSequenceScanningFlags.ReportInvalidEscapeErrors) {
                    const code = parseInt(text.substring(start + 1, pos), 8);
                    if (flags & EscapeSequenceScanningFlags.RegularExpression && !(flags & EscapeSequenceScanningFlags.AtomEscape) && ch !== CharacterCodes._0) {
                        error(Diagnostics.Octal_escape_sequences_and_backreferences_are_not_allowed_in_a_character_class_If_this_was_intended_as_an_escape_sequence_use_the_syntax_0_instead, start, pos - start, "\\x" + code.toString(16).padStart(2, "0"));
                    }
                    else {
                        error(Diagnostics.Octal_escape_sequences_are_not_allowed_Use_the_syntax_0, start, pos - start, "\\x" + code.toString(16).padStart(2, "0"));
                    }
                    return String.fromCharCode(code);
                }
                return text.substring(start, pos);
            case CharacterCodes._8:
            case CharacterCodes._9:
                // the invalid '\8' and '\9'
                tokenFlags |= TokenFlags.ContainsInvalidEscape;
                if (flags & EscapeSequenceScanningFlags.ReportInvalidEscapeErrors) {
                    if (flags & EscapeSequenceScanningFlags.RegularExpression && !(flags & EscapeSequenceScanningFlags.AtomEscape)) {
                        error(Diagnostics.Decimal_escape_sequences_and_backreferences_are_not_allowed_in_a_character_class, start, pos - start);
                    }
                    else {
                        error(Diagnostics.Escape_sequence_0_is_not_allowed, start, pos - start, text.substring(start, pos));
                    }
                    return String.fromCharCode(ch);
                }
                return text.substring(start, pos);
            case CharacterCodes.b:
                return "\b";
            case CharacterCodes.t:
                return "\t";
            case CharacterCodes.n:
                return "\n";
            case CharacterCodes.v:
                return "\v";
            case CharacterCodes.f:
                return "\f";
            case CharacterCodes.r:
                return "\r";
            case CharacterCodes.singleQuote:
                return "'";
            case CharacterCodes.doubleQuote:
                return '"';
            case CharacterCodes.u:
                if (
                    flags & EscapeSequenceScanningFlags.ScanExtendedUnicodeEscape &&
                    pos < end && charCodeUnchecked(pos) === CharacterCodes.openBrace
                ) {
                    // '\u{DDDDDD}'
                    pos -= 2;
                    return scanExtendedUnicodeEscape(!!(flags & EscapeSequenceScanningFlags.ReportInvalidEscapeErrors));
                }
                // '\uDDDD'
                for (; pos < start + 6; pos++) {
                    if (!(pos < end && isHexDigit(charCodeUnchecked(pos)))) {
                        tokenFlags |= TokenFlags.ContainsInvalidEscape;
                        if (flags & EscapeSequenceScanningFlags.ReportInvalidEscapeErrors) {
                            error(Diagnostics.Hexadecimal_digit_expected);
                        }
                        return text.substring(start, pos);
                    }
                }
                tokenFlags |= TokenFlags.UnicodeEscape;
                const escapedValue = parseInt(text.substring(start + 2, pos), 16);
                const escapedValueString = String.fromCharCode(escapedValue);
                if (
                    flags & EscapeSequenceScanningFlags.AnyUnicodeMode && escapedValue >= 0xD800 && escapedValue <= 0xDBFF &&
                    pos + 6 < end && text.substring(pos, pos + 2) === "\\u" && charCodeUnchecked(pos + 2) !== CharacterCodes.openBrace
                ) {
                    // For regular expressions in any Unicode mode, \u HexLeadSurrogate \u HexTrailSurrogate is treated as a single character
                    // for the purpose of determining whether a character class range is out of order
                    // https://tc39.es/ecma262/#prod-RegExpUnicodeEscapeSequence
                    const nextStart = pos;
                    let nextPos = pos + 2;
                    for (; nextPos < nextStart + 6; nextPos++) {
                        if (!isHexDigit(charCodeUnchecked(pos))) {
                            // leave the error to the next call
                            return escapedValueString;
                        }
                    }
                    const nextEscapedValue = parseInt(text.substring(nextStart + 2, nextPos), 16);
                    if (nextEscapedValue >= 0xDC00 && nextEscapedValue <= 0xDFFF) {
                        pos = nextPos;
                        return escapedValueString + String.fromCharCode(nextEscapedValue);
                    }
                }
                return escapedValueString;

            case CharacterCodes.x:
                // '\xDD'
                for (; pos < start + 4; pos++) {
                    if (!(pos < end && isHexDigit(charCodeUnchecked(pos)))) {
                        tokenFlags |= TokenFlags.ContainsInvalidEscape;
                        if (flags & EscapeSequenceScanningFlags.ReportInvalidEscapeErrors) {
                            error(Diagnostics.Hexadecimal_digit_expected);
                        }
                        return text.substring(start, pos);
                    }
                }
                tokenFlags |= TokenFlags.HexEscape;
                return String.fromCharCode(parseInt(text.substring(start + 2, pos), 16));

            // when encountering a LineContinuation (i.e. a backslash and a line terminator sequence),
            // the line terminator is interpreted to be "the empty code unit sequence".
            case CharacterCodes.carriageReturn:
                if (pos < end && charCodeUnchecked(pos) === CharacterCodes.lineFeed) {
                    pos++;
                }
            // falls through
            case CharacterCodes.lineFeed:
            case CharacterCodes.lineSeparator:
            case CharacterCodes.paragraphSeparator:
                return "";
            default:
                if (
                    flags & EscapeSequenceScanningFlags.AnyUnicodeMode
                    || flags & EscapeSequenceScanningFlags.RegularExpression
                        && !(flags & EscapeSequenceScanningFlags.AnnexB)
                        && isIdentifierPart(ch, languageVersion)
                ) {
                    error(Diagnostics.This_character_cannot_be_escaped_in_a_regular_expression, pos - 2, 2);
                }
                return String.fromCharCode(ch);
        }
    }

    function scanNumberFragment(): string {
        let start = pos;
        let allowSeparator = false;
        let isPreviousTokenSeparator = false;
        let result = "";
        while (true) {
            const ch = charCodeUnchecked(pos);
            if (ch === CharacterCodes._) {
                tokenFlags |= TokenFlags.ContainsSeparator;
                if (allowSeparator) {
                    allowSeparator = false;
                    isPreviousTokenSeparator = true;
                    result += text.substring(start, pos);
                }
                else {
                    tokenFlags |= TokenFlags.ContainsInvalidSeparator;
                    if (isPreviousTokenSeparator) {
                        error(Diagnostics.Multiple_consecutive_numeric_separators_are_not_permitted, pos, 1);
                    }
                    else {
                        error(Diagnostics.Numeric_separators_are_not_allowed_here, pos, 1);
                    }
                }
                pos++;
                start = pos;
                continue;
            }
            if (isDigit(ch)) {
                allowSeparator = true;
                isPreviousTokenSeparator = false;
                pos++;
                continue;
            }
            break;
        }
        if (charCodeUnchecked(pos - 1) === CharacterCodes._) {
            tokenFlags |= TokenFlags.ContainsInvalidSeparator;
            error(Diagnostics.Numeric_separators_are_not_allowed_here, pos - 1, 1);
        }
        return result + text.substring(start, pos);
    }

    function scanDigits(): boolean {
        const start = pos;
        let isOctal = true;
        while (isDigit(charCodeChecked(pos))) {
            if (!isOctalDigit(charCodeUnchecked(pos))) {
                isOctal = false;
            }
            pos++;
        }
        tokenValue = text.substring(start, pos);
        return isOctal;
    }

    // Extract from Section 12.9.3
    // NumericLiteral ::=
    //     | DecimalLiteral
    //     | DecimalBigIntegerLiteral
    //     | NonDecimalIntegerLiteral 'n'?
    //     | LegacyOctalIntegerLiteral
    // DecimalBigIntegerLiteral ::=
    //     | '0n'
    //     | [1-9] DecimalDigits? 'n'
    //     | [1-9] '_' DecimalDigits 'n'
    // DecimalLiteral ::=
    //     | DecimalIntegerLiteral '.' DecimalDigits? ExponentPart?
    //     | '.' DecimalDigits ExponentPart?
    //     | DecimalIntegerLiteral ExponentPart?
    // DecimalIntegerLiteral ::=
    //     | '0'
    //     | [1-9] '_'? DecimalDigits
    //     | NonOctalDecimalIntegerLiteral
    // LegacyOctalIntegerLiteral ::= '0' [0-7]+
    // NonOctalDecimalIntegerLiteral ::= '0' [0-7]* [89] [0-9]*
    function scanNumber(): SyntaxKind {
        let start = pos;
        let mainFragment: string;
        if (charCodeUnchecked(pos) === CharacterCodes._0) {
            pos++;
            if (charCodeUnchecked(pos) === CharacterCodes._) {
                tokenFlags |= TokenFlags.ContainsSeparator | TokenFlags.ContainsInvalidSeparator;
                error(Diagnostics.Numeric_separators_are_not_allowed_here, pos, 1);
                // treat it as a normal number literal
                pos--;
                mainFragment = scanNumberFragment();
            }
            // Separators are not allowed in the below cases
            else if (!scanDigits()) {
                // NonOctalDecimalIntegerLiteral, emit error later
                // Separators in decimal and exponent parts are still allowed according to the spec
                tokenFlags |= TokenFlags.ContainsLeadingZero;
                mainFragment = "" + +tokenValue;
            }
            else if (!tokenValue) {
                // a single zero
                mainFragment = "0";
            }
            else {
                // LegacyOctalIntegerLiteral
                tokenValue = "" + parseInt(tokenValue, 8);
                tokenFlags |= TokenFlags.Octal;
                const withMinus = token === SyntaxKind.MinusToken;
                const literal = (withMinus ? "-" : "") + "0o" + (+tokenValue).toString(8);
                if (withMinus) start--;
                error(Diagnostics.Octal_literals_are_not_allowed_Use_the_syntax_0, start, pos - start, literal);
                return SyntaxKind.NumericLiteral;
            }
        }
        else {
            mainFragment = scanNumberFragment();
        }
        let decimalFragment: string | undefined;
        let scientificFragment: string | undefined;
        if (charCodeUnchecked(pos) === CharacterCodes.dot) {
            pos++;
            decimalFragment = scanNumberFragment();
        }
        let end = pos;
        if (charCodeUnchecked(pos) === CharacterCodes.E || charCodeUnchecked(pos) === CharacterCodes.e) {
            pos++;
            tokenFlags |= TokenFlags.Scientific;
            if (charCodeUnchecked(pos) === CharacterCodes.plus || charCodeUnchecked(pos) === CharacterCodes.minus) pos++;
            const preNumericPart = pos;
            const finalFragment = scanNumberFragment();
            if (!finalFragment) {
                error(Diagnostics.Digit_expected);
            }
            else {
                scientificFragment = text.substring(end, preNumericPart) + finalFragment;
                end = pos;
            }
        }
        let result: string;
        if (tokenFlags & TokenFlags.ContainsSeparator) {
            result = mainFragment;
            if (decimalFragment) {
                result += "." + decimalFragment;
            }
            if (scientificFragment) {
                result += scientificFragment;
            }
        }
        else {
            result = text.substring(start, end); // No need to use all the fragments; no _ removal needed
        }

        if (tokenFlags & TokenFlags.ContainsLeadingZero) {
            error(Diagnostics.Decimals_with_leading_zeros_are_not_allowed, start, end - start);
            // if a literal has a leading zero, it must not be bigint
            tokenValue = "" + +result;
            return SyntaxKind.NumericLiteral;
        }

        if (decimalFragment !== undefined || tokenFlags & TokenFlags.Scientific) {
            checkForIdentifierStartAfterNumericLiteral(start, decimalFragment === undefined && !!(tokenFlags & TokenFlags.Scientific));
            // if value is not an integer, it can be safely coerced to a number
            tokenValue = "" + +result;
            return SyntaxKind.NumericLiteral;
        }
        else {
            tokenValue = result;
            const type = checkBigIntSuffix(); // if value is an integer, check whether it is a bigint
            checkForIdentifierStartAfterNumericLiteral(start);
            return type;
        }
    }

    function checkBigIntSuffix(): SyntaxKind {
        return SyntaxKind.NumericLiteral;
    }

    function checkForIdentifierStartAfterNumericLiteral(numericStart: number, isScientific?: boolean) {
        if (!isIdentifierStart(codePointUnchecked(pos), languageVersion)) {
            return;
        }

        const identifierStart = pos;
        const { length } = scanIdentifierParts();

        if (length === 1 && text[identifierStart] === "n") {
            if (isScientific) {
                error(Diagnostics.A_bigint_literal_cannot_use_exponential_notation, numericStart, identifierStart - numericStart + 1);
            }
            else {
                error(Diagnostics.A_bigint_literal_must_be_an_integer, numericStart, identifierStart - numericStart + 1);
            }
        }
        else {
            error(Diagnostics.An_identifier_or_keyword_cannot_immediately_follow_a_numeric_literal, identifierStart, length);
            pos = identifierStart;
        }
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

function codePointAt(s: string, i: number): number {
    // TODO(jakebailey): this is wrong and should have ?? 0; but all users are okay with it
    return s.codePointAt(i)!;
}

function isASCIILetter(ch: number): boolean {
    return ch >= CharacterCodes.A && ch <= CharacterCodes.Z || ch >= CharacterCodes.a && ch <= CharacterCodes.z;
}

function lookupInUnicodeMap(code: number, map: readonly number[]): boolean {
    // Bail out quickly if it couldn't possibly be in the map.
    if (code < map[0]) {
        return false;
    }

    // Perform binary search in one of the Unicode range maps
    let lo = 0;
    let hi: number = map.length;
    let mid: number;

    while (lo + 1 < hi) {
        mid = lo + (hi - lo) / 2;
        // mid has to be even to catch a range's beginning
        mid -= mid % 2;
        if (map[mid] <= code && code <= map[mid + 1]) {
            return true;
        }

        if (code < map[mid]) {
            hi = mid;
        }
        else {
            lo = mid + 2;
        }
    }

    return false;
}


/** @internal */
export function isUnicodeIdentifierStart(code: number, languageVersion: ScriptTarget | undefined) {
    return false;
    // return languageVersion! >= ScriptTarget.LPC ?
    //     lookupInUnicodeMap(code, unicodeESNextIdentifierStart) :
    //     lookupInUnicodeMap(code, unicodeES5IdentifierStart);
}
function isUnicodeIdentifierPart(code: number, languageVersion: ScriptTarget | undefined) {
    return false;
    // return languageVersion! >= ScriptTarget.ES2015 ?
    //     lookupInUnicodeMap(code, unicodeESNextIdentifierPart) :
    //     lookupInUnicodeMap(code, unicodeES5IdentifierPart);
}



export function isIdentifierStart(ch: number, languageVersion: ScriptTarget | undefined): boolean {
    return isASCIILetter(ch) || ch === CharacterCodes.$ || ch === CharacterCodes._ ||
        ch > CharacterCodes.maxAsciiCharacter && isUnicodeIdentifierStart(ch, languageVersion);
}

function charSize(ch: number) {
    if (ch >= 0x10000) {
        return 2;
    }
    if (ch === CharacterCodes.EOF) {
        return 0;
    }
    return 1;
}


function isDigit(ch: number): boolean {
    return ch >= CharacterCodes._0 && ch <= CharacterCodes._9;
}

function isHexDigit(ch: number): boolean {
    return isDigit(ch) || ch >= CharacterCodes.A && ch <= CharacterCodes.F || ch >= CharacterCodes.a && ch <= CharacterCodes.f;
}

function isWordCharacter(ch: number): boolean {
    return isASCIILetter(ch) || isDigit(ch) || ch === CharacterCodes._;
}

export function isIdentifierPart(ch: number, languageVersion: ScriptTarget | undefined, identifierVariant?: LanguageVariant): boolean {
    return isWordCharacter(ch) || ch === CharacterCodes.$ ||
        // "-" and ":" are valid in JSX Identifiers
        (ch > CharacterCodes.maxAsciiCharacter && isUnicodeIdentifierPart(ch, languageVersion));
}

/** @internal */
export function isIdentifierText(name: string, languageVersion: ScriptTarget | undefined, identifierVariant?: LanguageVariant): boolean {
    let ch = codePointAt(name, 0);
    if (!isIdentifierStart(ch, languageVersion)) {
        return false;
    }

    for (let i = charSize(ch); i < name.length; i += charSize(ch)) {
        if (!isIdentifierPart(ch = codePointAt(name, i), languageVersion, identifierVariant)) {
            return false;
        }
    }

    return true;
}

function makeReverseMap<T>(source: Map<T, number>): T[] {
    const result: T[] = [];
    source.forEach((value, name) => {
        result[value] = name;
    });
    return result;
}


const tokenStrings = makeReverseMap(textToToken);

/** @internal */
export function tokenToString(t: PunctuationOrKeywordSyntaxKind): string;
export function tokenToString(t: SyntaxKind): string | undefined;
export function tokenToString(t: SyntaxKind): string | undefined {
    return tokenStrings[t];
}

/** Optionally, get the shebang */
export function getShebang(text: string): string | undefined {
    const match = shebangTriviaRegex.exec(text);
    if (match) {
        return match[0];
    }
}


/** @internal */
export function getLinesBetweenPositions(sourceFile: SourceFileLike, pos1: number, pos2: number) {
    if (pos1 === pos2) return 0;
    const lineStarts = getLineStarts(sourceFile);
    const lower = Math.min(pos1, pos2);
    const isNegative = lower === pos2;
    const upper = isNegative ? pos1 : pos2;
    const lowerLine = computeLineOfPosition(lineStarts, lower);
    const upperLine = computeLineOfPosition(lineStarts, upper, lowerLine);
    return isNegative ? lowerLine - upperLine : upperLine - lowerLine;
}

const enum EscapeSequenceScanningFlags {
    String = 1 << 0,
    ReportErrors = 1 << 1,

    RegularExpression = 1 << 2,
    AnnexB = 1 << 3,
    AnyUnicodeMode = 1 << 4,
    AtomEscape = 1 << 5,

    ReportInvalidEscapeErrors = RegularExpression | ReportErrors,
    ScanExtendedUnicodeEscape = String | AnyUnicodeMode,
}


// Derived from the 10.1.1 UTF16Encoding of the ES6 Spec.
function utf16EncodeAsStringFallback(codePoint: number) {
    Debug.assert(0x0 <= codePoint && codePoint <= 0x10FFFF);

    if (codePoint <= 65535) {
        return String.fromCharCode(codePoint);
    }

    const codeUnit1 = Math.floor((codePoint - 65536) / 1024) + 0xD800;
    const codeUnit2 = ((codePoint - 65536) % 1024) + 0xDC00;

    return String.fromCharCode(codeUnit1, codeUnit2);
}

const utf16EncodeAsStringWorker: (codePoint: number) => string = (String as any).fromCodePoint ? codePoint => (String as any).fromCodePoint(codePoint) : utf16EncodeAsStringFallback;

/** @internal */
export function utf16EncodeAsString(codePoint: number) {
    return utf16EncodeAsStringWorker(codePoint);
}

/** @internal */
export function isOctalDigit(ch: number): boolean {
    return ch >= CharacterCodes._0 && ch <= CharacterCodes._7;
}
