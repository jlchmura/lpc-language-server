import { IType, TypedSymbol } from "antlr4-c3";
import { EvalScope, IEvaluatableSymbol, IKindSymbol } from "./base";
import { SymbolKind } from "../types";

export class LiteralSymbol
    extends TypedSymbol
    implements IEvaluatableSymbol, IKindSymbol
{
    public get kind() {
        return SymbolKind.Literal;
    }

    constructor(name: string, type: IType, public value: any) {
        super(name, type);
    }

    eval(scope: EvalScope) {
        return this.value;
    }
}
