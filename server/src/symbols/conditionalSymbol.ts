import { ScopedSymbol } from "antlr4-c3";
import { IEvaluatableSymbol } from "./base";
import { LpcTypes, SymbolKind } from "../types";
import { CallStack, StackValue } from "../backend/CallStack";
import { asStackValue } from "../backend/CallStackUtils";

export class ConditionalSymbol
    extends ScopedSymbol
    implements IEvaluatableSymbol
{
    constructor(public operator: string) {
        super(operator);
    }

    eval(stack: CallStack, scope?: any) {
        const lhs = this.children[0] as IEvaluatableSymbol;
        const rhs = this.children[1] as IEvaluatableSymbol;

        if (!lhs || !rhs) return undefined;

        const lhResult = lhs.eval(stack) as StackValue;
        const rhResult = rhs.eval(stack) as StackValue;

        if (!lhResult) {
            return undefined;
        }

        return lhResult.execConditional(this.name, rhResult);
    }

    public get kind() {
        return SymbolKind.Operator;
    }
}
