import {
    SymbolTable,
    BaseSymbol,
    ISymbolTableOptions,
    ScopedSymbol,
    MethodSymbol as BaseMethodSymbol,
    TypedSymbol,
    SymbolConstructor,
    RoutineSymbol,
    ParameterSymbol,
    IType,
} from "antlr4-c3";
import { ParseTree, ParserRuleContext } from "antlr4ng";
import { SourceContext } from "./SourceContext";
import { ISymbolInfo, SymbolGroupKind, SymbolKind } from "../types";
import { FunctionDeclarationContext } from "../parser3/LPCParser";

export class IncludeSymbol extends BaseSymbol {}
export class InheritSymbol extends BaseSymbol {}
export class MethodSymbol extends ScopedSymbol {

    getParameters() {
        return this.getAllSymbolsSync(ParameterSymbol, true);        
    }

}
export class DefineSymbol extends BaseSymbol {}
export class VariableSymbol extends TypedSymbol {}
export class OperatorSymbol extends BaseSymbol {}
export class EfunSymbol extends MethodSymbol {
    public constructor(name: string, 
        public returnType?: IType) {
        super(name);
    }
}

export class ContextSymbolTable extends SymbolTable {
    public tree: ParserRuleContext; // Set by the owning source context after each parse run.

    private symbolReferences = new Map<string, number>();

    // Caches with reverse lookup for indexed symbols.
    private namedActions: BaseSymbol[] = [];
    private parserActions: BaseSymbol[] = [];
    private lexerActions: BaseSymbol[] = [];
    private parserPredicates: BaseSymbol[] = [];
    private lexerPredicates: BaseSymbol[] = [];

    public constructor(
        name: string,
        options: ISymbolTableOptions,
        public owner?: SourceContext
    ) {
        super(name, options);
    }

    public override clear(): void {
        // Before clearing the dependencies make sure the owners are updated.
        if (this.owner) {
            for (const dep of this.dependencies) {
                if (dep instanceof ContextSymbolTable && dep.owner) {
                    this.owner.removeDependency(dep.owner);
                }
            }
        }

        this.symbolReferences.clear();
        this.namedActions = [];
        this.parserActions = [];
        this.lexerActions = [];
        this.parserPredicates = [];
        this.lexerPredicates = [];

        super.clear();
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

    private getSymbolOfType(
        name: string,
        kind: SymbolKind,
        localOnly: boolean,
        context: ScopedSymbol = this
    ): BaseSymbol | undefined {
        switch (kind) {
            case SymbolKind.Include:
                return context.resolveSync(name, localOnly) as IncludeSymbol;
            case SymbolKind.Define:
                return context.resolveSync(name, localOnly) as DefineSymbol;
            case SymbolKind.Method:
                return context.resolveSync(name, localOnly) as MethodSymbol;
            case SymbolKind.Variable:
                return context.resolveSync(name, localOnly) as VariableSymbol;
            default:
        }

        return undefined;
    }

    public incrementSymbolRefCount(symbolName: string): void {
        const reference = this.symbolReferences.get(symbolName);
        if (reference) {
            this.symbolReferences.set(symbolName, reference + 1);
        } else {
            this.symbolReferences.set(symbolName, 1);
        }
    }

    public symbolExistsInGroup(
        symbol: string,
        kind: SymbolGroupKind,
        localOnly: boolean,
        context: ScopedSymbol = this
    ): boolean {
        // Group of lookups.
        switch (kind) {
            case SymbolGroupKind.Identifier: {
                if (
                    this.symbolExists(
                        symbol,
                        SymbolKind.Variable,
                        localOnly,
                        context
                    )
                ) {
                    return true;
                }
                if (
                    this.symbolExists(
                        symbol,
                        SymbolKind.Method,
                        localOnly,
                        context
                    )
                ) {
                    return true;
                }

                break;
            }
            // case SymbolGroupKind.TokenRef: {
            //     if (this.symbolExists(symbol, SymbolKind.BuiltInLexerToken, localOnly)) {
            //         return true;
            //     }
            //     if (this.symbolExists(symbol, SymbolKind.VirtualLexerToken, localOnly)) {
            //         return true;
            //     }
            //     if (this.symbolExists(symbol, SymbolKind.FragmentLexerToken, localOnly)) {
            //         return true;
            //     }
            //     if (this.symbolExists(symbol, SymbolKind.LexerRule, localOnly)) {
            //         return true;
            //     }
            //     break;
            // }

            // case SymbolGroupKind.RuleRef: {
            //     if (this.symbolExists(symbol, SymbolKind.ParserRule, localOnly)) {
            //         return true;
            //     }
            //     break;
            // }

            default: {
                break;
            }
        }

        return false;
    }

    public getSymbolInfo(symbol: string | BaseSymbol): ISymbolInfo | undefined {
        if (!(symbol instanceof BaseSymbol)) {
            const temp = this.resolveSync(symbol);
            if (!temp) {
                return undefined;
            }
            symbol = temp;
        }

        let kind = SourceContext.getKindFromSymbol(symbol);
        const name = symbol.name;

        // Special handling for certain symbols.
        switch (kind) {
            //case SymbolKind.TokenVocab:
            case SymbolKind.Include: {
                // Get the source id from a dependent module.
                this.dependencies.forEach((table: ContextSymbolTable) => {
                    if (table.owner && table.owner.sourceId.includes(name)) {
                        return {
                            // TODO: implement a best match search.
                            kind,
                            name,
                            source: table.owner.fileName,
                            definition: SourceContext.definitionForContext(
                                table.tree,
                                true
                            ),
                        };
                    }
                });

                break;
            }

            case SymbolKind.Terminal: {
                // These are references to a depending grammar.
                this.dependencies.forEach((table: ContextSymbolTable) => {
                    const actualSymbol = table.resolveSync(name);
                    if (actualSymbol) {
                        symbol = actualSymbol;
                        kind = SourceContext.getKindFromSymbol(actualSymbol);
                    }
                });

                break;
            }

            default: {
                break;
            }
        }

        const symbolTable = symbol.symbolTable as ContextSymbolTable;

        return {
            kind,
            name,
            source:
                symbol.context && symbolTable && symbolTable.owner
                    ? symbolTable.owner.fileName
                    : "LDMud Built-In",
            definition: SourceContext.definitionForContext(
                symbol.context,
                true
            ),
            description: undefined,
            children: [],
        };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private symbolsOfType<T extends BaseSymbol, Args extends unknown[]>(
        t: SymbolConstructor<T, Args>,
        localOnly = false,
        context: ScopedSymbol = this
    ): ISymbolInfo[] {
        const result: ISymbolInfo[] = [];

        const symbols = context.getAllSymbolsSync(t, localOnly);
        const filtered = new Set(symbols); // Filter for duplicates.

        for (const symbol of filtered) {
            const root = symbol.root as ContextSymbolTable;

            let children: ISymbolInfo[] = [];
            if (symbol instanceof ScopedSymbol) {
                children.push(
                    ...this.symbolsOfType(VariableSymbol, localOnly, symbol)
                );
            }

            result.push({
                kind: SourceContext.getKindFromSymbol(symbol),
                name: symbol.name,
                source: root.owner ? root.owner.fileName : "LDMud Built-In",
                definition: SourceContext.definitionForContext(
                    symbol.context,
                    true
                ),
                description: undefined,
                children: children,
            });
        }

        return result;
    }

    public listChildSymbolsOfType<T extends BaseSymbol, Args extends unknown[]>(
        s: ScopedSymbol,
        t: SymbolConstructor<T, Args>
    ): ISymbolInfo[] {
        return this.symbolsOfType(t, true, s);
    }

    public listTopLevelSymbols(localOnly: boolean): ISymbolInfo[] {
        const result: ISymbolInfo[] = [];

        const options = this.resolveSync("options", true);
        if (options) {
            const tokenVocab = options.resolveSync("tokenVocab", true);
            if (tokenVocab) {
                const value = this.getSymbolInfo(tokenVocab);
                if (value) {
                    result.push(value);
                }
            }
        }

        let symbols = this.symbolsOfType(IncludeSymbol, localOnly);
        result.push(...symbols);
        // symbols = this.symbolsOfType(BuiltInTokenSymbol, localOnly);
        // result.push(...symbols);
        symbols = this.symbolsOfType(MethodSymbol, localOnly);
        result.push(...symbols);
        symbols = this.symbolsOfType(VariableSymbol, localOnly);
        result.push(...symbols);
        symbols = this.symbolsOfType(InheritSymbol, localOnly);
        result.push(...symbols);
        symbols = this.symbolsOfType(DefineSymbol, localOnly);
        result.push(...symbols);

        return result;
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
            for (const symbol of parent.children) {
                if (!symbol.context) {
                    continue;
                }

                if (
                    symbol.context
                        .getSourceInterval()
                        .properlyContains(context.getSourceInterval())
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

    public findSymbolDefinition(context: ParseTree): BaseSymbol | undefined {
        let ctx = context;
        let foundSymbol: BaseSymbol | undefined = undefined;

        while (!!ctx && !foundSymbol) {
            let symbol = this.symbolContainingContext(context);

            const table = symbol.symbolTable;
            const search = [
                ...table.getNestedSymbolsOfTypeSync(VariableSymbol),
                ...table.getNestedSymbolsOfTypeSync(MethodSymbol),
                ...table.getNestedSymbolsOfTypeSync(DefineSymbol),
            ];

            foundSymbol = search.find((s) => s.name === context.getText());

            ctx = ctx.parent;
        }

        if (!foundSymbol) {
            // still haven't found?
            const search = [
                ...this.getAllSymbolsSync(VariableSymbol, false),
                ...this.getAllSymbolsSync(MethodSymbol, false),
                ...this.getAllSymbolsSync(DefineSymbol, false),
            ];

            foundSymbol = search.find((s) => s.name === context.getText());
        }

        return foundSymbol;
    }

    public getReferenceCount(symbolName: string): number {
        const reference = this.symbolReferences.get(symbolName);
        if (reference) {
            return reference;
        } else {
            return 0;
        }
    }
}
