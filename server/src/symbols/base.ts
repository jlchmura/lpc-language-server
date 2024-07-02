import { BaseSymbol, IScopedSymbol, SymbolConstructor } from "antlr4-c3";
import { ParseTree } from "antlr4ng";
import { ILexicalRange, SymbolKind } from "../types";
import { FoldingRange } from "vscode-languageserver";
import { CallStack } from "../backend/CallStack";
import { getSymbolsFromAllParentsSync } from "../backend/symbol-utils";
import { SourceContext } from "../backend/SourceContext";

export type EvalScope = any;

export function getSymbolsOfTypeSync<
    T extends BaseSymbol,
    Args extends unknown[]
>(scope: IScopedSymbol, t: SymbolConstructor<T, Args>, localOnly = true): T[] {
    return getSymbolsFromAllParentsSync(scope, t, localOnly, false);
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

export interface IEvaluatableSymbol<T = any> extends BaseSymbol {
    eval(stack: CallStack, scope?: T): any;
}
export function isInstanceOfIEvaluatableSymbol(
    symbol: BaseSymbol
): symbol is IEvaluatableSymbol {
    return (symbol as unknown as IEvaluatableSymbol).eval !== undefined;
}

export interface IReferenceableSymbol extends BaseSymbol {
    references: Set<BaseSymbol>;

    addReference(symbol: BaseSymbol): void;
}
export function isInstanceOfIReferenceableSymbol(
    symbol: BaseSymbol
): symbol is IReferenceableSymbol {
    return (
        (symbol as unknown as IReferenceableSymbol)?.addReference !== undefined
    );
}
export interface IReferenceSymbol extends BaseSymbol {
    /** Set the symbol that this one references */
    setReference(symbol: BaseSymbol): BaseSymbol;
    /** Get the symbol that this one references */
    getReference(): BaseSymbol;
}
export function isInstanceOfIReferenceSymbol(
    symbol: BaseSymbol
): symbol is IReferenceSymbol {
    return (symbol as unknown as IReferenceSymbol)?.getReference !== undefined;
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

export class ObjectReferenceInfo {
    constructor(
        public filename?: string,
        public isLoaded?: boolean,
        public context?: SourceContext
    ) {}

    toString() {
        return `${this.filename}:${this.isLoaded}`;
    }
}
