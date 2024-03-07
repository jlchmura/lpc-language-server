import {
    SymbolTable,
    BaseSymbol,
    ISymbolTableOptions,
    ScopedSymbol,
    MethodSymbol as BaseMethodSymbol,
    SymbolConstructor,
} from "antlr4-c3";
import { ParseTree, ParserRuleContext, TerminalNode } from "antlr4ng";
import { SourceContext } from "./SourceContext";
import { ISymbolInfo, SymbolGroupKind, SymbolKind } from "../types";
import { InheritSymbol } from "../symbols/Symbol";
import { FoldingRange } from "vscode-languageserver";
import { DefineSymbol } from "../symbols/defineSymbol";
import { VariableSymbol } from "../symbols/variableSymbol";
import { EvalScope } from "../symbols/base";
import { AssignmentSymbol } from "../symbols/assignmentSymbol";
import { EfunSymbol, MethodSymbol } from "../symbols/methodSymbol";
import { InlineClosureSymbol } from "../symbols/closureSymbol";
import { IncludeSymbol } from "../symbols/includeSymbol";

export class ContextSymbolTable extends SymbolTable {
    public tree: ParserRuleContext; // Set by the owning source context after each parse run.

    private symbolReferences = new Map<string, number>();
    private functions = new Map<string, MethodSymbol>();

    public foldingRanges: Set<FoldingRange> = new Set<FoldingRange>();

    public scope: EvalScope = new Map<string, any>();

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

        this.functions.clear();
        super.clear();
    }

    public getDependencies() {
        return this.dependencies;
    }

    public addFunction(method: MethodSymbol): void {
        this.functions.set(method.name, method);
    }

    public getFunction(name: string): MethodSymbol | undefined {
        return this.functions.get(name);
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
            case SymbolKind.Efun:
                // reconstruct the definition for efuns
                const efun = symbol as EfunSymbol;
                return {
                    kind,
                    name,
                    source: "Driver efun",
                    definition: {
                        text: `${efun.returnType?.name ?? ""} ${
                            efun.name
                        }(${efun
                            .getParametersSync()
                            .map((p) => p.name)
                            .join(", ")
                            .trim()})`,
                        range: {
                            start: { column: 0, row: 0 },
                            end: { column: 0, row: 0 },
                        },
                    },
                    description: undefined,
                    children: [],
                };
                break;
            case SymbolKind.Variable:
                break;
            case SymbolKind.Include:
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
            definition: SourceContext.definitionForContext(
                symbol.context,
                true
            ),
            description: undefined,
            children: [],
        } as ISymbolInfo;
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
                    ...this.symbolsOfType(VariableSymbol, localOnly, symbol),
                    ...this.symbolsOfType(
                        InlineClosureSymbol,
                        localOnly,
                        symbol
                    )
                );
            }

            const definition = SourceContext.definitionForContext(
                symbol.context,
                true
            );

            result.push({
                kind: SourceContext.getKindFromSymbol(symbol),
                name: symbol.name,
                source: root.owner
                    ? `${root.owner.fileName}:${definition.range.start}`
                    : "Driver efun",
                definition: definition,
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
        symbols = this.symbolsOfType(EfunSymbol, localOnly);
        result.push(...symbols);
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
        const sym =
            this.symbolWithContextSync(context)?.getParentOfType(ScopedSymbol);
        return sym?.resolveSync(context.getText(), localOnly);
    }

    public getReferenceCount(symbolName: string): number {
        const reference = this.symbolReferences.get(symbolName);
        if (reference) {
            return reference;
        } else {
            return 0;
        }
    }

    public lastAssignOrDecl(i: BaseSymbol): AssignmentSymbol | VariableSymbol {
        const nm = i.name;
        let symbol = i;
        let sib = i.previousSibling;
        while (sib) {
            if (sib instanceof AssignmentSymbol && sib.name == i.name) {
                return sib;
            } else if (sib instanceof VariableSymbol && sib.name == i.name) {
                return sib;
            }
            sib = sib.previousSibling;
        }
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
                        source: owner.fileName,
                        definition: SourceContext.definitionForContext(
                            context,
                            true
                        ),
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
                            definition: SourceContext.definitionForContext(
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
}
