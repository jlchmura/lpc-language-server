import { IType, TypedSymbol } from "antlr4-c3";
import { EvalScope, IEvaluatableSymbol, IKindSymbol } from "./base";
import { SymbolKind } from "../types";
import {
    ArrayStackValue,
    CallStack,
    NumericStackValue,
    StackValue,
} from "../backend/CallStack";
import { asStackValue } from "../backend/CallStackUtils";

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
        if (typeof this.value === "number") {
            return new NumericStackValue(this.value, this.type, this);
        } else if (Array.isArray(this.value) && this.value.length > 0) {
            // check if its an array
            return new ArrayStackValue(this.value, this.type, this);
        } else {
            return asStackValue(this.value, this.type, this);
        }
        //return this.value;
    }
}
