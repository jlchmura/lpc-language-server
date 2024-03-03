import { IType, TypedSymbol } from "antlr4-c3";
import { EvalScope, IEvaluatableSymbol, IKindSymbol } from "./base";
import { SymbolKind } from "../types";
import { CallStack } from "../backend/CallStack";

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

    eval(stack: CallStack, scope: EvalScope) {
        return this.value;
    }
}
