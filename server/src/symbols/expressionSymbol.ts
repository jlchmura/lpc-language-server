import { ScopedSymbol } from "antlr4-c3";
import { IEvaluatableSymbol, isInstanceOfIEvaluatableSymbol } from "./base";

export class ExpressionSymbol
    extends ScopedSymbol
    implements IEvaluatableSymbol
{
    eval(scope?: any) {
        for (const child of this.children) {
            if (isInstanceOfIEvaluatableSymbol(child)) {
                scope = child.eval(scope);
            } else {
                throw "not evaluable";
            }
        }
        return scope;
    }
}
