import { ScopedSymbol } from "antlr4-c3";
import { IEvaluatableSymbol, isInstanceOfIEvaluatableSymbol } from "./base";
import { ArrayStackValue, CallStack, StackValue } from "../backend/CallStack";
import { LpcTypes } from "../types";

export class ExpressionSymbol
    extends ScopedSymbol
    implements IEvaluatableSymbol
{
    eval(stack: CallStack, scope?: any) {
        for (const child of this.children) {
            if (isInstanceOfIEvaluatableSymbol(child)) {
                scope = child.eval(stack, scope);
            } else {
                throw "not evaluable";
            }
        }
        return scope;
    }
}

export class BracketExpressionSymbol
    extends ScopedSymbol
    implements IEvaluatableSymbol<StackValue>
{
    eval(stack: CallStack, scope?: StackValue) {
        let childScope: any = undefined;
        for (const child of this.children) {
            if (isInstanceOfIEvaluatableSymbol(child)) {
                childScope = child.eval(stack, childScope);
            } else {
                throw "not evaluable";
            }
        }

        const indexVal = childScope?.value;
        if (indexVal != undefined && !!scope && !!scope.bracket) {
            return scope?.bracket(indexVal);
        }

        return scope;
    }
}
