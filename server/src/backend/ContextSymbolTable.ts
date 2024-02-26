import {
  SymbolTable,
  BaseSymbol,
  ISymbolTableOptions,
  ScopedSymbol,
  TypedSymbol,
} from "antlr4-c3";
import { ParserRuleContext } from "antlr4ng";
import { SourceContext } from "./SourceContext";
import { SymbolGroupKind, SymbolKind } from "../types";

export class ImportSymbol extends BaseSymbol {}
export class MethodSymbol extends ScopedSymbol {}
export class DefineSymbol extends BaseSymbol {}
export class VariableSymbol extends TypedSymbol {}

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
    localOnly: boolean
  ): boolean {
    return this.getSymbolOfType(name, kind, localOnly) !== undefined;
  }

  private getSymbolOfType(
    name: string,
    kind: SymbolKind,
    localOnly: boolean
  ): BaseSymbol | undefined {
    switch (kind) {
      case SymbolKind.Import:
        return this.resolveSync(name, localOnly) as ImportSymbol;
      case SymbolKind.Define:
        return this.resolveSync(name, localOnly) as DefineSymbol;
      case SymbolKind.Method:
        return this.resolveSync(name, localOnly) as MethodSymbol;
      case SymbolKind.Variable:
        return this.resolveSync(name, localOnly) as VariableSymbol;
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
    localOnly: boolean
  ): boolean {
    // Group of lookups.
    switch (kind) {
      case SymbolGroupKind.Identifier: {
        if (this.symbolExists(symbol, SymbolKind.Variable, localOnly)) {
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
}
