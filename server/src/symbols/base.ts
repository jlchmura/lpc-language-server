import { BaseSymbol, ScopedSymbol, SymbolConstructor } from "antlr4-c3";
import { ParseTree } from "antlr4ng";
import { SymbolKind } from "../types";
import { FoldingRange } from "vscode-languageserver";
import { CallStack } from "../backend/CallStack";

export type EvalScope = any;

export function getSymbolsOfTypeSync<
    T extends BaseSymbol,
    Args extends unknown[]
>(symbol: ScopedSymbol, t: SymbolConstructor<T, Args>): T[] {
    return symbol.children.filter((s) => s instanceof t) as T[];
}

export interface IFoldableSymbol extends BaseSymbol {
    foldingRange: FoldingRange;
}
export interface IHasValue extends BaseSymbol {
    setValue(value: any);
    getValue(value: any);
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
