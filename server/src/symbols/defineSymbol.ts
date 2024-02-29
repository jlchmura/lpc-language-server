import { TypedSymbol, IType, BaseSymbol } from "antlr4-c3";
import { IKindSymbol, IEvaluatableSymbol } from "./base";
import { SymbolKind } from "../types";

export class DefineSymbol
    extends BaseSymbol
    implements IEvaluatableSymbol, IKindSymbol
{
    public get kind() {
        return SymbolKind.Define;
    }

    constructor(name: string, public value: any) {
        super(name);
    }

    eval(arg?: any) {
        // ignore incoming values, we're a constant
        return this.value;
    }
}
