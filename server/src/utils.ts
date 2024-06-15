import { ParserRuleContext, Token } from "antlr4ng";
import { DiagnosticSeverity, Position, Range } from "vscode-languageserver";
import { IDiagnosticEntry, ILexicalRange } from "./types";
import { BaseSymbol, TypedSymbol, SymbolConstructor } from "antlr4-c3";
import { URI } from "vscode-uri";
import { trimQuotes } from "./parser3/parser-utils";
import { LPCToken } from "./parser3/LPCToken";

export function getSelectionRange(ctx: ParserRuleContext): Range {
    const start = ctx.start;
    const stop = ctx.stop;
    const rng = Range.create(
        Position.create(start.line - 1, start.column),
        Position.create(stop.line - 1, stop.column)
    );
    return rng;
}

export { trimQuotes };

/**
 * convert a lexer range to a language server range
 * @param range
 * @returns
 */
export function lexRangeToLspRange(range: ILexicalRange) {
    if (!range) {
        return undefined;
    }

    const { start, end } = range;
    const startRow = start.row === 0 ? 0 : start.row - 1;
    const endRow = end.row === 0 ? 0 : end.row - 1;

    return Range.create(startRow, start.column, endRow, end.column);
}

export function lexRangeFromContext(ctx: ParserRuleContext): ILexicalRange {
    return {
        start: {
            row: ctx.start.line,
            column: ctx.start.column,
        },
        end: {
            row: ctx.stop.line,
            column: ctx.stop.column + (ctx.stop.text?.length ?? 1),
        },
    };
}

export function lexRangeFromToken(t: Token): ILexicalRange {
    return {
        start: {
            row: t.line,
            column: t.column,
        },
        end: {
            row: t.line,
            column: t.column + t.stop - t.start + 1,
        },
    };
}

/**
 * Checks if the two sets are equal in size and content.
 * @param set1
 * @param set2
 * @returns
 */
export function areSetsEqual<T>(set1: Set<T>, set2: Set<T>): boolean {
    if (set1.size !== set2.size) {
        return false;
    }
    for (let item of set1) {
        if (!set2.has(item)) {
            return false;
        }
    }
    return true;
}

export function areTwoParameterArraysEqual<T extends TypedSymbol>(
    arr1: T[],
    arr2: T[]
): boolean {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (
            // NTBLA: only check name is strict mode is one
            // arr1[i].name !== arr2[i].name ||
            arr1[i].type?.name !== arr2[i].type?.name
        ) {
            return false;
        }
    }
    return true;
}

/**
 * returns the first entry of an array or undefined if the array is empty
 * @param arr
 * @returns
 */
export function firstEntry<T>(arr: T[]): T | undefined {
    if (arr?.length > 0) {
        return arr[0];
    }
    return undefined;
}
/**
 * returns the last entry of an array or undefined if the array is empty.
 * @param arr Array
 * @returns
 */
export function lastEntry<T>(arr: T[]): T | undefined {
    if (arr?.length > 0) {
        return arr[arr.length - 1];
    }
    return undefined;
}

/**
 * get the sibling of the given context
 * @param ctx
 * @param offset
 * @returns
 */
export function getSibling(ctx: ParserRuleContext, offset: number) {
    const parent = ctx.parent as ParserRuleContext;
    const idx = parent.children.indexOf(ctx);
    const target =
        idx + offset >= 0 && idx + offset < parent.children.length
            ? parent.children[idx + offset]
            : undefined;
    return target as ParserRuleContext;
}

/**
 * Add a file extension to a filename if it doesn't have one
 * @param filename filename to normalize
 * @returns
 */
export function normalizeFileExtension(filename: string) {
    if (!filename) return filename;

    if (!filename.endsWith(".c") && !filename.endsWith(".h")) {
        filename += ".c";
    }

    return filename;
}

export function normalizeFilename(filename: string) {
    if (!filename) return filename;

    filename = normalizeFileExtension(filename);

    if (filename.startsWith("file:")) {
        const uri = URI.parse(filename);
        const fsPath = uri.fsPath;
        return fsPath;
    } else {
        return filename;
    }
}

export function rangeFromTokens(start: Token, end: Token): ILexicalRange {
    return {
        start: {
            column: Math.max(0, start.column),
            row: start.line,
        },
        end: {
            column: Math.max(0, end.column),
            row: end.line,
        },
    } as ILexicalRange;
}

export function trimStart(original: string, toRemove: string): string {
    if (original?.startsWith(toRemove)) {
        return original.slice(toRemove.length);
    }
    return original;
}

export function pushIfDefined<T>(arr: T[], item: T) {
    if (!!item) {
        arr.push(item);
    }
}

/**
 * tests if a filename is surrounded by chars @c and if so
 * removes them
 * @param filename
 * @param c
 * @returns
 */
export function testFilename(
    filename: string,
    c: string,
    cEnd: string
): string {
    if (filename.startsWith(c) && filename.endsWith(cEnd)) {
        return filename.slice(1, filename.length - 1);
    } else {
        return filename;
    }
}

/** escape a string for use in regex */
export function escapeRegExp(str: string) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

/**
 * Returns the first symbol that matches type t.  The first match can be the symbol itself
 * @param symbol
 * @param t
 * @returns
 */
export function getSelfOrParentOfType<
    T extends BaseSymbol,
    Args extends unknown[]
>(symbol: BaseSymbol, t: SymbolConstructor<T, Args>) {
    return symbol instanceof t ? symbol : symbol.getParentOfType(t);
}

export function getFilenameForContext(ctx: ParserRuleContext) {
    return (ctx.start as LPCToken).filename;
}

export function getFilenameForSymbol(symbol: BaseSymbol) {
    return getFilenameForContext(symbol.context as ParserRuleContext);
}

export function logDiagnosticForTokens(
    diagnostics: IDiagnosticEntry[],
    message: string,
    offendingTokenStart: Token,
    offendingTokenEnd: Token,
    type: DiagnosticSeverity = DiagnosticSeverity.Error,
    source?: string
) {
    let start = offendingTokenStart as LPCToken;
    let end = offendingTokenEnd as LPCToken;

    if (start.relatedToken) start = start.relatedToken as LPCToken;
    if (end.relatedToken) end = end.relatedToken as LPCToken;

    end = end ?? start;

    const entry: IDiagnosticEntry = {
        filename: start.filename,
        type: type,
        message: message,
        range: rangeFromTokens(start, end),
        source: source,
        code: source,
    };
    diagnostics.push(entry);
    return entry;
}

export function areWeTestingWithJest() {
    return process.env.JEST_WORKER_ID !== undefined;
}

export function isWS(charCode: number) {
    return (
        charCode === 32 || charCode === 9 || charCode === 13 || charCode === 10
    );
}

export function parseMacroNameFromDefineString(s: string) {
    let defVal = s?.replace(/\\\n/g, "\n").trim() ?? "";

    // scroll through the characters of the string defVal
    // until we find either whitespace or an open paren
    // the chars up to that point are macroName.
    let i = 0;
    for (
        i = 0;
        i < defVal.length &&
        !isWS(defVal.charCodeAt(i)) &&
        defVal.charAt(i) != "(";
        i++
    ) {}

    const macroName = defVal.substring(0, i);
    return {
        name: macroName,
        index: i,
        remainingText: defVal.substring(i).trim(),
    };
}
