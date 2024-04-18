import {
    BaseSymbol,
    IScopedSymbol,
    ScopedSymbol,
    SymbolConstructor,
} from "antlr4-c3";
import { ParseTree } from "antlr4ng";
import { ILexicalRange, SymbolKind } from "../types";
import { FoldingRange, Range, TextEdit } from "vscode-languageserver";
import { CallStack } from "../backend/CallStack";
import { ContextSymbolTable } from "../backend/ContextSymbolTable";

export type EvalScope = any;

export function getSymbolsOfTypeSync<
    T extends BaseSymbol,
    Args extends unknown[]
>(scope: IScopedSymbol, t: SymbolConstructor<T, Args>, localOnly = true): T[] {
    const symbols: T[] = [];
    for (const child of scope.children) {
        if (child instanceof t) {
            symbols.push(child);
        }
    }

    if (!localOnly && !!scope.parent) {
        symbols.push(...getSymbolsOfTypeSync(scope.parent, t, localOnly));
    }

    if (!localOnly && scope instanceof ContextSymbolTable) {
        const deps = (scope as ContextSymbolTable).getDependencies();
        for (const dependency of deps) {
            symbols.push(...getSymbolsOfTypeSync(dependency, t, localOnly));
        }
    }

    return symbols;
}

export interface IFoldableSymbol extends BaseSymbol {
    foldingRange: FoldingRange;
}
export interface IHasValue extends BaseSymbol {
    setValue(value: any);
    getValue(value: any);
}

export interface IRenameableSymbol extends BaseSymbol {
    nameRange: ILexicalRange;
}
export function isInstanceOfIRenameableSymbol(
    symbol: BaseSymbol
): symbol is IRenameableSymbol {
    return (symbol as unknown as IRenameableSymbol)?.nameRange !== undefined;
}

export interface IEvaluatableSymbol extends BaseSymbol {
    eval(stack: CallStack, scope?: any): any;
}
export function isInstanceOfIEvaluatableSymbol(
    symbol: BaseSymbol
): symbol is IEvaluatableSymbol {
    return (symbol as unknown as IEvaluatableSymbol).eval !== undefined;
}

export interface IKindSymbol extends BaseSymbol {
    kind: SymbolKind;
}
export function isInstanceOfIKindSymbol(
    symbol: BaseSymbol
): symbol is IKindSymbol {
    return (symbol as unknown as IKindSymbol).kind !== undefined;
}

export class LpcBaseSymbol<C extends ParseTree = ParseTree>
    extends BaseSymbol
    implements IKindSymbol
{
    public get kind() {
        return SymbolKind.Unknown;
    }
    override context: C;
}
