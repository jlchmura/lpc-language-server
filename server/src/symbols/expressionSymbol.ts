import { ScopedSymbol } from "antlr4-c3";
import { IEvaluatableSymbol, isInstanceOfIEvaluatableSymbol } from "./base";
import { CallStack, StackValue } from "../backend/CallStack";
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

        const scopeVal = scope.value;
        const childVal = childScope.value;
        if (!!scopeVal && !!childVal) {
            return new StackValue(
                scopeVal[childVal],
                LpcTypes.mixedArrayType,
                this
            );
        }

        return scope;
    }
}
