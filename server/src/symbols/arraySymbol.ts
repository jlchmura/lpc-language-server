import { ScopedSymbol } from "antlr4-c3";
import { IEvaluatableSymbol, isInstanceOfIEvaluatableSymbol } from "./base";
import { CallStack, StackValue } from "../backend/CallStack";
import { LpcTypes } from "../types";

export class ArraySymbol extends ScopedSymbol implements IEvaluatableSymbol {
    private elements: StackValue[] = [];

    eval(stack: CallStack, scope?: any) {
        let i = 0;
        for (const child of this.children) {
            if (isInstanceOfIEvaluatableSymbol(child)) {
                this.elements[i] = child.eval(stack);
            } else {
                throw "not evaluable";
            }
            i++;
        }

        return new StackValue(this.elements, LpcTypes.mixedArrayType, this);
    }
}
