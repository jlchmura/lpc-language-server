import { ScopedSymbol } from "antlr4-c3";
import { IEvaluatableSymbol } from "./base";
import { SymbolKind } from "../types";
import { CallStack } from "../backend/CallStack";

export class OperatorSymbol extends ScopedSymbol implements IEvaluatableSymbol {
    constructor(
        public operator: string,
        public lhs: IEvaluatableSymbol,
        public rhs: IEvaluatableSymbol
    ) {
        super(operator);
    }

    eval(stack: CallStack, scope?: any) {
        const lhs = this.children[0] as IEvaluatableSymbol;
        const rhs = this.children[1] as IEvaluatableSymbol;

        const lhsValue = lhs?.eval(stack)?.value;
        const rhsValue = rhs?.eval(stack)?.value;

        switch (this.name) {
            case ",":
                return rhsValue;
            case "+":
                return lhsValue + rhsValue;
            case "-":
                return lhsValue - rhsValue;
            case "*":
                return lhsValue * rhsValue;
            case "/":
                return lhsValue / rhsValue;
            case "%":
                return lhsValue % rhsValue;
            case "^":
                return lhsValue ^ rhsValue;
            case "&":
            case "|":
            case "~":
                return lhsValue | rhsValue;
            case "<<":
            case ">>":
            case "--":
            case "++":
                return lhsValue;
            case "!":
                return !rhsValue;
        }

        throw `OperatorSymbol: Unknown symbol [${this.name}]`;
    }

    public get kind() {
        return SymbolKind.Operator;
    }
}
