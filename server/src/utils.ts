import { ParseTree, ParserRuleContext, Token } from "antlr4ng";
import {
    Position,
    Range,
    SemanticTokens,
    SemanticTokensBuilder,
} from "vscode-languageserver";
import { ILexicalRange } from "./types";
import {
    BaseSymbol,
    IScopedSymbol,
    TypedSymbol,
    SymbolConstructor,
    ScopedSymbol,
    SymbolTable,
} from "antlr4-c3";
import { ContextSymbolTable } from "./backend/ContextSymbolTable";
import { URI } from "vscode-uri";

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

export function resolveOfTypeSync<T extends BaseSymbol, Args extends unknown[]>(
    scope: IScopedSymbol,
    name: string,
    t: SymbolConstructor<T, Args>,
    localOnly: boolean = false,
    cnt: number = 0
): T {
    // if (cnt > 100) {
    //     const i = 0;
    // }
    for (const child of scope.children) {
        if (child.name === name && child instanceof t) {
            return child;
        }
    }

    if (!localOnly && !!scope.parent) {
        return resolveOfTypeSync(scope.parent, name, t, localOnly, cnt + 1);
    }

    if (!localOnly) {
        const deps = (scope as ContextSymbolTable).getDependencies();
        for (const dependency of deps) {
            const result = resolveOfTypeSync(
                dependency,
                name,
                t,
                localOnly,
                cnt + 1
            );
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

/**
 * @param t The type of the objects to return.
 * @param localOnly If true only child symbols are returned, otherwise also symbols from the parent of this symbol
 *                  (recursively).
 *
 * @returns A promise resolving to all symbols of the the given type, accessible from this scope (if localOnly is
 *          false), within the owning symbol table.
 */
export async function getSymbolsFromAllParents<
    T extends BaseSymbol,
    Args extends unknown[]
>(
    symbol: ScopedSymbol,
    t: SymbolConstructor<T, Args>,
    localOnly = false,
    excludeGlobals = false
): Promise<T[]> {
    const result: T[] = [];

    // Special handling for namespaces, which act like grouping symbols in this scope,
    // so we show them as available in this scope.
    for (const child of symbol.children) {
        if (child instanceof t) {
            result.push(child);
        }
    }

    if (!localOnly) {
        if (symbol.parent) {
            if (excludeGlobals && symbol.parent instanceof ContextSymbolTable) {
                const tbl = symbol.parent as ContextSymbolTable;
                if (!tbl.owner || tbl.name.endsWith("simul_efun.c")) {
                    // do not include anything from this parent
                    return result;
                }
            }

            const childSymbols = await getSymbolsFromAllParents(
                symbol.parent as ScopedSymbol,
                t,
                false
            );
            result.push(...childSymbols);
        }
    }

    return result;
}

export function symbolWithContextSync(
    symbolTable: ContextSymbolTable,
    context: ParseTree,
    localOnly = true
): BaseSymbol | undefined {
    /**
     * Local function to find a symbol recursively.
     *
     * @param symbol The symbol to search through.
     *
     * @returns The symbol with the given context, if found.
     */
    const findRecursive = (symbol: BaseSymbol): BaseSymbol | undefined => {
        if (symbol.context === context) {
            return symbol;
        }

        if (symbol instanceof ScopedSymbol) {
            for (const child of symbol.children) {
                const result = findRecursive(child);
                if (result) {
                    return result;
                }
            }
        }

        return undefined;
    };

    let symbols: BaseSymbol[];
    // try {
    symbols = symbolTable.getAllSymbolsSync(BaseSymbol, true);
    for (const symbol of symbols) {
        const result = findRecursive(symbol);
        if (result) {
            return result;
        }
    }
    // } catch (e) {
    //     const i = 0;
    // }

    if (!localOnly) {
        for (const dependency of symbolTable.getDependencies()) {
            symbols = dependency.getAllSymbolsSync(BaseSymbol);
            for (const symbol of symbols) {
                const result = findRecursive(symbol);
                if (result) {
                    return result;
                }
            }
        }
    }

    return undefined;
}
