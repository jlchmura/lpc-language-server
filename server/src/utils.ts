import { ParserRuleContext, Token } from "antlr4ng";
import { Position, Range } from "vscode-languageserver";
import { ILexicalRange } from "./types";
import {
    BaseSymbol,
    IScopedSymbol,
    TypedSymbol,
    SymbolConstructor,
} from "antlr4-c3";
import { ContextSymbolTable } from "./backend/ContextSymbolTable";

export function getSelectionRange(ctx: ParserRuleContext): Range {
    const start = ctx.start;
    const stop = ctx.stop;
    const rng = Range.create(
        Position.create(start.line - 1, start.column),
        Position.create(stop.line - 1, stop.column)
    );
    return rng;
}

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
            column: ctx.stop.column,
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
            arr1[i].name !== arr2[i].name ||
            arr1[i].type?.name !== arr2[i].type?.name
        ) {
            return false;
        }
    }
    return true;
}

export function resolveOfTypeSync<T extends BaseSymbol, Args extends unknown[]>(
    scope: IScopedSymbol,
    name: string,
    t: SymbolConstructor<T, Args>,
    localOnly: boolean = false
): T {
    for (const child of scope.children) {
        if (child.name === name && child instanceof t) {
            return child;
        }
    }

    if (!localOnly && !!scope.parent) {
        return resolveOfTypeSync(scope.parent, name, t, localOnly);
    }

    if (!localOnly) {
        const deps = (scope as ContextSymbolTable).getDependencies();
        for (const dependency of deps) {
            const result = resolveOfTypeSync(dependency, name, t, localOnly);
            if (!!result) {
                return result;
            }
        }
    }

    return undefined;
}

/**
 * remove quotes from the start & end of the string
 * @param str
 */
export function trimQuotes(str: string) {
    if (str.startsWith('"') && str.endsWith('"')) {
        return str.slice(1, -1);
    }
    return str;
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

export function normalizeFilename(filename: string) {
    if (!filename) return filename;

    // add a file extension if there isn't one
    if (!filename.endsWith(".c") && !filename.endsWith(".h")) {
        filename += ".c";
    }

    return filename;
}

export function rangeFromTokens(start: Token, end: Token): ILexicalRange {
    return {
        start: {
            column: start.column,
            row: start.line,
        },
        end: {
            column: end.column + end.stop - end.start + 1,
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
