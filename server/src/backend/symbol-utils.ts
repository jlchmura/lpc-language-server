import * as path from "path";
import {
    BaseSymbol,
    IScopedSymbol,
    ScopedSymbol,
    SymbolConstructor,
} from "antlr4-c3";
import { ensureLpcConfig } from "./LpcConfig";
import { ContextSymbolTable } from "./ContextSymbolTable";
import { ParseTree } from "antlr4ng";

export function walkParents<T extends BaseSymbol>(
    symbol: IScopedSymbol,
    localOnly: boolean = false,
    excludeGlobals: boolean = false,
    action: (symbol: T) => T | undefined
) {
    const seen = new Set<IScopedSymbol>(); // try track and prevent loops
    const searchSymbols: IScopedSymbol[] = [symbol];
    const config = ensureLpcConfig();
    const simulEfunFilename = path.basename(config.files.simul_efun);

    while (searchSymbols.length > 0) {
        const ss = searchSymbols.shift();
        seen.add(ss);

        for (const child of ss.children) {
            const result = action(child as T); // Update the type of the parameter
            if (!!result) return result;
        }

        if (!localOnly && ss.parent && !seen.has(ss.parent)) {
            searchSymbols.push(ss.parent);
        }

        if (!localOnly && ss instanceof ContextSymbolTable) {
            const tbl = ss;
            const deps = tbl.getDependencies() as Set<ContextSymbolTable>;
            for (const dep of deps) {
                if (
                    !seen.has(dep) &&
                    (!excludeGlobals ||
                        (dep.owner && !dep.name.endsWith(simulEfunFilename)))
                ) {
                    searchSymbols.push(dep);
                }
            }
        }
    }
}

export function resolveOfTypeSync<T extends BaseSymbol, Args extends unknown[]>(
    scope: IScopedSymbol,
    name: string,
    t: SymbolConstructor<T, Args>,
    localOnly: boolean = false
): T {
    if (!scope) return undefined;

    return walkParents(scope, localOnly, false, (s) => {
        if (s instanceof t && s.name === name) {
            return s;
        }
        return undefined;
    });
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
    symbol: IScopedSymbol,
    t: SymbolConstructor<T, Args>,
    localOnly = false,
    excludeGlobals = false
): Promise<T[]> {
    const p = new Promise<T[]>((resolve, reject) => {
        const result: T[] = getSymbolsFromAllParentsSync(
            symbol,
            t,
            localOnly,
            excludeGlobals
        );
        resolve(result);
    });

    return p;
}

/**
 * @param t The type of the objects to return.
 * @param localOnly If true only child symbols are returned, otherwise also symbols from the parent of this symbol
 *                  (recursively).
 *
 * @returns A promise resolving to all symbols of the the given type, accessible from this scope (if localOnly is
 *          false), within the owning symbol table.
 */
export function getSymbolsFromAllParentsSync<
    T extends BaseSymbol,
    Args extends unknown[]
>(
    symbol: IScopedSymbol,
    t: SymbolConstructor<T, Args>,
    localOnly = false,
    excludeGlobals = false
): T[] {
    const result: T[] = [];
    walkParents(symbol, localOnly, excludeGlobals, (s) => {
        if (s instanceof t) {
            result.push(s);
        }

        // always return undefined to continue the search
        return undefined;
    });
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

export function getImmediateParentOfType<
    T extends BaseSymbol,
    Args extends unknown[]
>(symbol: BaseSymbol, t: SymbolConstructor<T, Args>): T {
    if (symbol.parent instanceof t) {
        return symbol.parent;
    }
    return undefined;
}
