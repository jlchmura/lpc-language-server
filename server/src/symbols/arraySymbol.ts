import { ScopedSymbol } from "antlr4-c3";
import { IEvaluatableSymbol, isInstanceOfIEvaluatableSymbol } from "./base";
import { ArrayStackValue, CallStack, StackValue } from "../backend/CallStack";
import { LpcTypes } from "../types";
import { asStackValue } from "../backend/CallStackUtils";

export class ArraySymbol extends ScopedSymbol implements IEvaluatableSymbol {
    private elements: StackValue[] = [];

    eval(stack: CallStack) {
        let i = 0;
        for (const child of this.children) {
            if (isInstanceOfIEvaluatableSymbol(child)) {
                this.elements[i] = child.eval(stack);
            } else {
                throw "not evaluable";
            }
            i++;
        }

        return new ArrayStackValue(
            this.elements,
            LpcTypes.mixedArrayType,
            this
        );
    }
}
