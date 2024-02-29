import { ParserRuleContext } from "antlr4ng";
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

    if (!localOnly) {
        if (scope.parent) {
            return resolveOfTypeSync(scope.parent, name, t, localOnly);
        }
    }

    if (!localOnly) {
        for (const dependency of (
            scope as ContextSymbolTable
        ).getDependencies()) {
            const result = resolveOfTypeSync(dependency, name, t, localOnly);
            if (!!result) {
                return result;
            }
        }
    }

    return undefined;
}
