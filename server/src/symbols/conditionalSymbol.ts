import { ScopedSymbol } from "antlr4-c3";
import { IEvaluatableSymbol } from "./base";
import { SymbolKind } from "../types";

export class ConditionalSymbol
    extends ScopedSymbol
    implements IEvaluatableSymbol
{
    constructor(public operator: string) {
        super(operator);
    }

    eval(scope?: any) {
        const lhs = this.children[0] as IEvaluatableSymbol;
        const rhs = this.children[1] as IEvaluatableSymbol;
        switch (this.name) {
            case "==":
                return lhs.eval() == rhs.eval();
            case "!=":
                return lhs.eval() != rhs.eval();
            case "<":
                return lhs.eval() < rhs.eval();
            case ">":
                return lhs.eval() > rhs.eval();
            case "<=":
                return lhs.eval() <= rhs.eval();
            case ">=":
                return lhs.eval() >= rhs.eval();
            case "&&":
                return lhs.eval() && rhs.eval();
            case "||":
                return lhs.eval() || rhs.eval();
        }

        throw "operator not implemented " + this.name;
    }

    public get kind() {
        return SymbolKind.Operator;
    }
}
