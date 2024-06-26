import { ScopedSymbol } from "antlr4-c3";
import { IEvaluatableSymbol } from "./base";
import { SymbolKind } from "../types";
import { CallStack, StackValue } from "../backend/CallStack";
import { asStackValue } from "../backend/CallStackUtils";

export class OperatorSymbol extends ScopedSymbol implements IEvaluatableSymbol {
    constructor(
        public operator: string,
        public lhs: IEvaluatableSymbol,
        public rhs: IEvaluatableSymbol
    ) {
        super(operator);
    }

    eval(stack: CallStack, scope?: any) {
        const lhs = this.lhs;
        const rhs = this.rhs;

        const lhsResult = lhs?.eval(stack);
        const rhsResult = rhs?.eval(stack);
        if (lhsResult instanceof StackValue) {
            return lhsResult.execOp(this.name, rhsResult);
        }

        return undefined;
    }

    public get kind() {
        return SymbolKind.Operator;
    }
}
