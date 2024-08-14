import {
    BaseSymbol,
    ISymbolTableOptions,
    ParameterSymbol,
    ScopedSymbol,
    SymbolConstructor,
    SymbolTable,
} from "antlr4-c3";
import { ParseTree, ParserRuleContext, TerminalNode, Token } from "antlr4ng";
import { FoldingRange } from "vscode-languageserver";
import { LPCToken } from "../parser3/LPCToken";
import { DefineSymbol } from "../symbols/defineSymbol";
import { IncludeSymbol } from "../symbols/includeSymbol";
import { InheritSymbol } from "../symbols/inheritSymbol";
import { MethodDeclarationSymbol, MethodSymbol } from "../symbols/methodSymbol";
import {
    VariableSymbol,
    MethodParameterSymbol,
} from "../symbols/variableSymbol";
import { ISymbolInfo, SymbolKind } from "../types";
import { SourceContext } from "./SourceContext";
import {
    functionParametersToString,
    resolveOfTypeSync,
    symbolWithContextSync,
    walkParents,
} from "./symbol-utils";
import { InlineClosureSymbol } from "../symbols/closureSymbol";
import { EfunSymbol } from "../symbols/efunSymbol";
import { lexRangeFromContext } from "../utils";

export type SymbolTableCache = Map<string, SymbolTable>;

type HighlightSymbolResult = {
    symbol: BaseSymbol;
    token: Token;
};

export class ContextSymbolTable extends SymbolTable {
    private symbolCache: Map<string, BaseSymbol> = new Map();

    public tree: ParserRuleContext; // Set by the owning source context after each parse run.

    public foldingRanges: Set<FoldingRange> = new Set<FoldingRange>();

    public constructor(
        name: string,
        options: ISymbolTableOptions,
        public owner?: SourceContext
    ) {
        super(name, options);
    }

    public override clear(): void {
        // Before clearing the dependencies make sure the owners are updated.
        // if (this.owner) {
        //     for (const dep of this.dependencies) {
        //         if (dep instanceof ContextSymbolTable && dep.owner) {
        //             this.owner.removeDependency(dep.owner);
        //         }
        //     }
        // }

        this.symbolCache?.clear();

        super.clear();
    }

    public getDependencies() {
        return this.dependencies;
    }

    public getFunction(name: string): MethodSymbol | undefined {
        // only resolve of type MethodSymbol, because we don't want the
        // function headers here.
        return resolveOfTypeSync(this, name, MethodSymbol, false);
    }

    public getFunctionHeader(name: string): MethodSymbol | undefined {
        return resolveOfTypeSync(this, name, MethodDeclarationSymbol, false);
    }

    public symbolExists(
        name: string,
        kind: SymbolKind,
        localOnly: boolean,
        context: ScopedSymbol = this
    ): boolean {
        const result =
            this.getSymbolOfType(name, kind, localOnly, context) !== undefined;
        return result;
    }

    /**
     * @param name The name of the symbol to resolve.
     * @param localOnly If true only child symbols are returned, otherwise also symbols from the parent of this symbol
     *
     * @returns the first symbol with a given name, in the order of appearance in this scope
     *          or any of the parent scopes (conditionally).
     */
    override resolveSync(name, localOnly = false) {
        if (this.symbolCache.has(name)) {
            return this.symbolCache.get(name);
        }

        return walkParents(this, localOnly, false, (symbol) => {
            if (symbol.name == name) {
                this.symbolCache.set(name, symbol);
                return symbol;
            }
        });
    }

    private getSymbolOfType(
        name: string,
        kind: SymbolKind,
        localOnly: boolean,
        context: ScopedSymbol = this
    ): BaseSymbol | undefined {
        switch (kind) {
            case SymbolKind.Include:
                return resolveOfTypeSync(
                    context,
                    name,
                    IncludeSymbol,
                    localOnly
                );
            case SymbolKind.Define:
                return resolveOfTypeSync(
                    context,
                    name,
                    DefineSymbol,
                    localOnly
                );
            case SymbolKind.Method:
                return resolveOfTypeSync(
                    context,
                    name,
                    MethodSymbol,
                    localOnly
                );
            case SymbolKind.Variable:
                return (
                    resolveOfTypeSync(
                        context,
                        name,
                        VariableSymbol,
                        localOnly
                    ) ?? resolveOfTypeSync(context, name, ParameterSymbol)
                );
            default:
        }

        return undefined;
    }

    public getSymbolInfo(symbol: string | BaseSymbol): ISymbolInfo | undefined {
        if (!(symbol instanceof BaseSymbol)) {
            const temp = this.resolveSync(symbol);
            if (!temp) {
                return undefined;
            }
            symbol = temp;
        }

        symbol = symbol as BaseSymbol;
        let kind = SourceContext.getKindFromSymbol(symbol);
        const name = symbol.name;

        // Special handling for certain symbols.
        switch (kind) {
            case SymbolKind.MethodDeclaration:
            case SymbolKind.Method:
            case SymbolKind.Efun:
                // reconstruct the definition for efuns
                const funSymbol = symbol as MethodSymbol;

                // assemble def text prefix
                const txtArr: string[] = [];
                txtArr.push(...funSymbol.functionModifiers);
                txtArr.push(funSymbol.returnType?.name ?? "");
                txtArr.push(funSymbol.name);
                const txt = txtArr.filter((t) => t.trim().length > 0).join(" ");

                const source =
                    kind == SymbolKind.Efun
                        ? "Driver efun"
                        : (symbol.root as ContextSymbolTable).owner.fileName;
                const range =
                    kind == SymbolKind.Efun
                        ? {
                              start: { column: 0, row: 1 },
                              end: { column: 0, row: 1 },
                          }
                        : lexRangeFromContext(
                              symbol.context as ParserRuleContext
                          );

                return {
                    kind,
                    name,
                    source,
                    definition: {
                        text: `${txt}(${functionParametersToString(
                            funSymbol.getParametersSync()
                        )})`,
                        range,
                    },
                    symbol: funSymbol,
                    description: undefined,
                    children: [],
                };
            case SymbolKind.Variable:
                break;
            case SymbolKind.Include:
                // Get the source id from a dependent module.
                this.dependencies.forEach((table: ContextSymbolTable) => {
                    if (table.owner && table.name.includes(name)) {
                        return {
                            // TODO: implement a best match search.
                            kind,
                            name,
                            source: table.owner.fileName,
                            definition: table.owner.definitionForContext(
                                table.tree,
                                true
                            ),
                        };
                    }
                });

                break;

            case SymbolKind.Terminal:
                // These are references to a depending something.
                this.dependencies.forEach((table: ContextSymbolTable) => {
                    const actualSymbol = table.resolveSync(name);
                    if (actualSymbol) {
                        symbol = actualSymbol;
                        kind = SourceContext.getKindFromSymbol(actualSymbol);
                    }
                });

                break;

            default:
                break;
        }

        const symbolTable = symbol.symbolTable as ContextSymbolTable;
        return {
            kind,
            name,
            symbol,
            source:
                symbol.context && symbolTable && symbolTable.owner
                    ? symbolTable.owner.fileName
                    : "Driver efun",
            line: (symbol.context as ParserRuleContext)?.start?.line,
            definition: symbolTable.owner.definitionForContext(
                symbol.context,
                true
            ),
            description: undefined,
            children: [],
        } as ISymbolInfo;
    }

    private async symbolsOfType<T extends BaseSymbol, Args extends unknown[]>(
        t: SymbolConstructor<T, Args>,
        localOnly = false,
        context: ScopedSymbol = this
    ): Promise<ISymbolInfo[]> {
        const result: ISymbolInfo[] = [];

        const symbols = await context.getAllSymbols(t, localOnly);
        const filtered = new Set(symbols); // Filter for duplicates.

        for (const symbol of filtered) {
            const root = symbol.root as ContextSymbolTable;
            const parserContext = symbol.context as ParserRuleContext;
            const token = parserContext?.start as LPCToken;
            const filename = token?.filename ?? "";

            let children: ISymbolInfo[] = [];

            if (symbol instanceof ScopedSymbol) {
                const searchScopes: ScopedSymbol[] = [symbol];
                while (searchScopes.length > 0) {
                    const scope = searchScopes.shift();
                    children.push(
                        ...(await this.symbolsOfType(
                            VariableSymbol,
                            localOnly,
                            scope
                        )),
                        ...(await this.symbolsOfType(
                            InlineClosureSymbol,
                            localOnly,
                            scope
                        ))
                    );

                    searchScopes.push(
                        ...(scope.children.filter(
                            (c) => c instanceof ScopedSymbol
                        ) as ScopedSymbol[])
                    );
                }
            }

            const definition = (
                symbol.symbolTable as ContextSymbolTable
            ).owner.definitionForContext(symbol.context, true);

            result.push({
                kind: SourceContext.getKindFromSymbol(symbol),
                name: symbol.name,
                source: root.owner
                    ? `${filename}:${definition?.range.start}`
                    : "Driver efun",
                definition: definition,
                description: undefined,
                filename: filename,
                children: children,
            });
        }

        return result;
    }

    // public listChildSymbolsOfType<T extends BaseSymbol, Args extends unknown[]>(
    //     s: ScopedSymbol,
    //     t: SymbolConstructor<T, Args>
    // ): ISymbolInfo[] {
    //     return this.symbolsOfType(t, true, s);
    // }

    public async listTopLevelSymbols(
        localOnly: boolean
    ): Promise<ISymbolInfo[]> {
        const result: ISymbolInfo[] = [];

        let symbols = await this.symbolsOfType(IncludeSymbol, localOnly);
        result.push(...symbols);
        symbols = await this.symbolsOfType(EfunSymbol, localOnly);
        result.push(...symbols);
        symbols = await this.symbolsOfType(MethodSymbol, localOnly);
        result.push(...symbols);
        symbols = await this.symbolsOfType(VariableSymbol, localOnly);
        result.push(...symbols);
        symbols = await this.symbolsOfType(InheritSymbol, localOnly);
        result.push(...symbols);
        symbols = await this.symbolsOfType(DefineSymbol, localOnly);
        result.push(...symbols);

        // NTBLA: add structs

        return result;
    }

    /**
     * Look up a symbol using a generated document position (one-based)
     * @returns Symbol or undefined if one could not be found
     */
    public symbolContainingPosition(
        line: number,
        column: number
    ): BaseSymbol | undefined {
        const stack: ScopedSymbol[] = [this];
        let currentSymbol: ScopedSymbol | undefined;

        while ((currentSymbol = stack.pop())) {
            for (const symbol of currentSymbol.children) {
                const startToken = (symbol.context as ParserRuleContext)
                    ?.start as LPCToken;
                const filename = startToken?.filename;
                if (
                    !symbol.context ||
                    symbol.context instanceof TerminalNode ||
                    filename != this.owner?.fileName
                ) {
                    continue;
                }

                const context = symbol.context as ParserRuleContext;
                const start = context.start;
                const stop = context.stop;
                const stopCol = stop.column + (stop.text?.length ?? 0);

                // start & stop must be defined, and line & col must contain the position
                if (!start || !stop) continue;
                else if (start.line > line) break;
                else if (
                    (start.line < line ||
                        (start.line == line && start.column <= column)) &&
                    (stop.line > line ||
                        (stop.line == line && stopCol >= column))
                ) {
                    if (symbol instanceof ScopedSymbol) {
                        stack.push(symbol);
                    } else {
                        return symbol;
                    }
                }
            }

            if (stack.length == 0) {
                return currentSymbol;
            }
        }

        return undefined;
    }
    /**
     * Does a depth-first search in the table for a symbol which contains the given context.
     * The search is based on the token indices which the context covers and goes down as much as possible to find
     * the closes covering symbol.
     *
     * @param context The context to search for.
     *
     * @returns The symbol covering the given context or undefined if nothing was found.
     */
    public symbolContainingContext(context: ParseTree): BaseSymbol | undefined {
        const findRecursive = (
            parent: ScopedSymbol
        ): BaseSymbol | undefined => {
            if (!context) return undefined;

            for (const symbol of parent.children) {
                if (!symbol.context) {
                    continue;
                }

                if (
                    context.getSourceInterval() &&
                    symbol.context
                        .getSourceInterval()
                        ?.properlyContains(context.getSourceInterval())
                ) {
                    let child;
                    if (symbol instanceof ScopedSymbol) {
                        child = findRecursive(symbol);
                    }

                    if (child) {
                        return child;
                    } else {
                        return symbol;
                    }
                }
            }
        };

        return findRecursive(this);
    }

    /**
     * Find the Symbol that defines the symbol referenced by the given context.
     * @param context
     * @returns
     */
    public findSymbolDefinition(
        context: ParseTree,
        localOnly = false
    ): BaseSymbol | undefined {
        if (context instanceof TerminalNode) context = context.parent;
        const sym = symbolWithContextSync(this, context)?.getParentOfType(
            ScopedSymbol
        );
        return sym?.resolveSync(context.getText(), localOnly);
    }

    public getSymbolsToHighlight(symbolName: string) {
        const results: HighlightSymbolResult[] = [];
        const symbols = this.getAllNestedSymbolsSync(symbolName);
        for (const symbol of symbols) {
            if (symbol instanceof VariableSymbol) {
                results.push({
                    symbol,
                    token: symbol.nameToken,
                });
            } else if (symbol instanceof MethodParameterSymbol) {
                results.push({
                    symbol,
                    token: symbol.nameToken,
                });
            } else {
                results.push({
                    symbol,
                    token: (symbol.context as ParserRuleContext).start,
                });
            }
        }
        return results;
    }

    public getSymbolOccurrences(
        symbolName: string,
        localOnly: boolean
    ): ISymbolInfo[] {
        const result: ISymbolInfo[] = [];

        const symbols = this.getAllSymbolsSync(BaseSymbol, localOnly);
        for (const symbol of symbols) {
            const owner = (symbol.root as ContextSymbolTable).owner;

            if (owner) {
                if (symbol.context && symbol.name === symbolName) {
                    let context = symbol.context;
                    if (symbol instanceof MethodSymbol) {
                        context = (symbol.context as ParserRuleContext)
                            .children![0];
                    } else if (symbol instanceof VariableSymbol) {
                        context = (symbol.context as ParserRuleContext)
                            .children![0];
                    }

                    result.push({
                        kind: SourceContext.getKindFromSymbol(symbol),
                        name: symbolName,
                        symbol: symbol,
                        source: owner.fileName,
                        definition: owner.definitionForContext(context, true),
                        description: undefined,
                    });
                }

                if (symbol instanceof ScopedSymbol) {
                    const references =
                        symbol.getAllNestedSymbolsSync(symbolName);
                    for (const reference of references) {
                        result.push({
                            kind: SourceContext.getKindFromSymbol(reference),
                            name: symbolName,
                            source: owner.fileName,
                            symbol: reference,
                            definition: (
                                symbol.symbolTable as ContextSymbolTable
                            ).owner.definitionForContext(
                                reference.context,
                                true
                            ),
                            description: undefined,
                        });
                    }
                }
            }
        }

        return result;
    }

    /**
     * Gets all symbols from this table (at any level) that match the given name.
     * @param name
     * @returns
     */
    public getAllSymbolsByNameSync(name: string): BaseSymbol[] {
        const stack: BaseSymbol[] = [this];
        const results: BaseSymbol[] = [];
        while (stack.length > 0) {
            const s = stack.pop();

            if (s.name === name) {
                results.push(s);
            }

            if (s instanceof ScopedSymbol) {
                stack.push(...s.children);
            }
        }

        return results;
    }

    /**
     * Gets all symbols from this table (at any level) that match the given name.
     * @param name
     * @returns
     */
    public getAllSymbolsByName(name: string): Promise<BaseSymbol[]> {
        return new Promise<BaseSymbol[]>((res, rej) => {
            const results = this.getAllSymbolsByNameSync(name);
            res(results);
        });
    }

    /**
     * TODO: add optional position dependency (only symbols defined before a given caret pos are viable).
     *
     * @param t The type of the objects to return.
     * @param localOnly If true only child symbols are returned, otherwise also symbols from the parent of this symbol
     *                  (recursively).
     *
     * @returns A promise resolving to all symbols of the the given type, accessible from this scope (if localOnly is
     *          false), within the owning symbol table.
     */
    override async getAllSymbols<T extends BaseSymbol>(
        t,
        localOnly = false
    ): Promise<T[]> {
        const tbl = this;
        const p = new Promise<T[]>((res, rej) => {
            const result = [];
            walkParents(tbl, localOnly, false, (symbol) => {
                if (!!symbol && symbol instanceof t) {
                    result.push(symbol);
                }

                // always return undefined so we keep walking
                return undefined;
            });

            res(result);
        });
        return p;
    }
}
