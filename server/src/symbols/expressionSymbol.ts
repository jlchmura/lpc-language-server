import { ScopedSymbol } from "antlr4-c3";
import { IEvaluatableSymbol, isInstanceOfIEvaluatableSymbol } from "./base";
import { CallStack } from "../backend/CallStack";

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
