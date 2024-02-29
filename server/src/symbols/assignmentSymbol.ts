import { TypedSymbol, IType, ScopedSymbol } from "antlr4-c3";
import { IKindSymbol, IEvaluatableSymbol } from "./base";
import { SymbolKind } from "../types";
import { AssignmentExpressionContext } from "../parser3/LPCParser";
import { VariableIdentifierSymbol, VariableSymbol } from "./variableSymbol";

export class AssignmentSymbol
    extends ScopedSymbol
    implements IEvaluatableSymbol
{
    public get lhs() {
        const lhsCtx = (
            this.context as AssignmentExpressionContext
        ).conditionalExpressionBase();
        return this.symbolTable.symbolWithContextSync(
            lhsCtx
        ) as IEvaluatableSymbol;
    }

    public get rhs() {
        const rhsCtx = (
            this.context as AssignmentExpressionContext
        ).expression();
        return this.symbolTable.symbolWithContextSync(
            rhsCtx
        ) as IEvaluatableSymbol;
    }

    constructor(name: string, public operator: string) {
        super(name);
    }

    eval(scope?: any) {
        const lh = this.lhs;
        const rhResult = this.rhs.eval(scope);

        // lh should really only be one of these two
        if (
            lh instanceof VariableSymbol ||
            lh instanceof VariableIdentifierSymbol
        ) {
            switch (this.operator) {
                case "=":
                    return lh.eval(rhResult);
                case "+=":
                    return lh.eval(lh.eval() + rhResult);
                case "-=":
                    return lh.eval(lh.eval() - rhResult);
                default:
                    throw "operator not supported";
            }
        } else {
            console.warn("Assignment to non-variable", lh);
        }
    }
}
