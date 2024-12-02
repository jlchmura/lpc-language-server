import {
    FormattingContext,
    FormattingRequestKind,
    Rule,
    RuleAction,
    RuleFlags,
    RulesMap,
    
} from "../_namespaces/lpc.formatting.js";
import { CommentRange, concatenate, find, findAncestor, findPrecedingToken, FormatCodeSettings, FormattingHost, getLeadingCommentRangesOfNode, getTokenAtPosition, getTrailingCommentRanges, isJSDoc, LanguageVariant, Node, rangeContainsPositionExclusive, SourceFile, SourceFileLike, SyntaxKind, TextChange, TextRange } from "../_namespaces/lpc";

/**
 * @internal
 */
export function getRangeOfEnclosingComment(
    sourceFile: SourceFile,
    position: number,
    precedingToken?: Node | null, // eslint-disable-line no-restricted-syntax
    tokenAtPosition = getTokenAtPosition(sourceFile, position),
): CommentRange | undefined {
    const jsdoc = findAncestor(tokenAtPosition, isJSDoc);
    if (jsdoc) tokenAtPosition = jsdoc.parent;
    const tokenStart = tokenAtPosition.getStart(sourceFile);
    if (tokenStart <= position && position < tokenAtPosition.getEnd()) {
        return undefined;
    }

    // eslint-disable-next-line no-restricted-syntax
    precedingToken = precedingToken === null ? undefined : precedingToken === undefined ? findPrecedingToken(position, sourceFile) : precedingToken;

    // Between two consecutive tokens, all comments are either trailing on the former
    // or leading on the latter (and none are in both lists).
    const trailingRangesOfPreviousToken = precedingToken && getTrailingCommentRanges(sourceFile.text, precedingToken.end);
    const leadingCommentRangesOfNextToken = getLeadingCommentRangesOfNode(tokenAtPosition, sourceFile);
    const commentRanges = concatenate(trailingRangesOfPreviousToken, leadingCommentRangesOfNextToken);
    return commentRanges && find(commentRanges, range =>
        rangeContainsPositionExclusive(range, position) ||
        // The end marker of a single-line comment does not include the newline character.
        // With caret at `^`, in the following case, we are inside a comment (^ denotes the cursor position):
        //
        //    // asdf   ^\n
        //
        // But for closed multi-line comments, we don't want to be inside the comment in the following case:
        //
        //    /* asdf */^
        //
        // However, unterminated multi-line comments *do* contain their end.
        //
        // Internally, we represent the end of the comment at the newline and closing '/', respectively.
        //
        position === range.end && (range.kind === SyntaxKind.SingleLineCommentTrivia || position === sourceFile.getFullWidth()));
}

/** @internal */
export interface TextRangeWithKind<T extends SyntaxKind = SyntaxKind> extends TextRange {
    kind: T;
}

/** @internal */
export interface FormatContext {
    readonly options: FormatCodeSettings;
    readonly getRules: RulesMap;
    readonly host: FormattingHost;
}

/** @internal */
export function formatDocument(sourceFile: SourceFile, formatContext: FormatContext): TextChange[] {
    const span = {
        pos: 0,
        end: sourceFile.text.length,
    };
    
    return [{span: {start: 0, length: sourceFile.text.length}, newText: sourceFile.text}];
}

/** @internal */
export function formatNodeGivenIndentation(node: Node, sourceFileLike: SourceFileLike, languageVariant: LanguageVariant, initialIndentation: number, delta: number, formatContext: FormatContext): TextChange[] {
    const range = { pos: node.pos, end: node.end };
    return [{span: {start: range.pos, length: range.end - range.pos}, newText: sourceFileLike.text.slice(range.pos, range.end)}];
}