import { ScopedSymbol } from "antlr4-c3";
import { IEvaluatableSymbol } from "./base";
import { SymbolKind } from "../types";
import { CallStack } from "../backend/CallStack";
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

        const lhsValue = lhs?.eval(stack)?.value;
        const rhsValue = rhs?.eval(stack)?.value;

        switch (this.name) {
            case ",":
                return asStackValue(rhsValue, rhsValue?.type, this);
            case "+":
                return asStackValue(lhsValue + rhsValue, lhsValue?.type, this);
            case "-":
                return asStackValue(lhsValue - rhsValue, lhsValue?.type, this);
            case "*":
                return asStackValue(lhsValue * rhsValue, lhsValue?.type, this);
            case "/":
                return asStackValue(lhsValue / rhsValue, lhsValue?.type, this);
            case "%":
                return asStackValue(lhsValue % rhsValue, lhsValue?.type, this);
            case "^":
                return asStackValue(lhsValue ^ rhsValue, lhsValue?.type, this);
            case "&":
            case "|":
            case "~":
                return asStackValue(lhsValue | rhsValue, lhsValue?.type, this);
            case "<<":
            case ">>":
            case "--":
            case "++":
                return asStackValue(lhsValue, lhsValue?.type, this);
            case "!":
                return asStackValue(!rhsValue, rhsValue?.type, this);
        }

        throw `OperatorSymbol: Unknown symbol [${this.name}]`;
    }

    public get kind() {
        return SymbolKind.Operator;
    }
}
