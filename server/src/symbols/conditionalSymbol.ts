import { ScopedSymbol } from "antlr4-c3";
import { IEvaluatableSymbol } from "./base";
import { SymbolKind } from "../types";
import { CallStack } from "../backend/CallStack";

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

        const lhResult = lhs.eval(stack);
        const rhResult = rhs.eval(stack);

        switch (this.name) {
            case "==":
                return lhResult == rhResult;
            case "!=":
                return lhResult != rhResult;
            case "<":
                return lhResult < rhResult;
            case ">":
                return lhResult > rhResult;
            case "<=":
                return lhResult <= rhResult;
            case ">=":
                return lhResult >= rhResult;
            case "|":
                return lhResult | rhResult;
            case "&":
                return lhResult & rhResult;
            case "&&":
                return lhResult && rhResult;
            case "||":
                return lhResult || rhResult;
        }

        throw "operator not implemented " + this.name;
    }

    public get kind() {
        return SymbolKind.Operator;
    }
}
