import { TypedSymbol, IType, ScopedSymbol } from "antlr4-c3";
import { IKindSymbol, IEvaluatableSymbol } from "./base";
import { SymbolKind } from "../types";
import { AssignmentExpressionContext } from "../parser3/LPCParser";
import { VariableIdentifierSymbol, VariableSymbol } from "./variableSymbol";
import { CallStack } from "../backend/CallStack";

export class AssignmentSymbol
    extends ScopedSymbol
    implements IEvaluatableSymbol
{
    public get lhs() {
        return this.children[0] as IEvaluatableSymbol;
        // const lhsCtx = (
        //     this.context as AssignmentExpressionContext
        // ).conditionalExpressionBase();
        // return this.symbolTable.symbolWithContextSync(
        //     lhsCtx
        // ) as IEvaluatableSymbol;
    }

    public get rhs() {
        return this.children[1] as IEvaluatableSymbol;
        // const rhsCtx = (
        //     this.context as AssignmentExpressionContext
        // ).expression();
        // return this.symbolTable.symbolWithContextSync(
        //     rhsCtx
        // ) as IEvaluatableSymbol;
    }

    constructor(name: string, public operator: string) {
        super(name);
    }

    eval(stack: CallStack, scope?: any) {
        const lh = this.lhs;
        const rhResult = this.rhs.eval(stack, scope);

        switch (this.operator) {
            case "=":
                return lh.eval(stack, rhResult);
            case "+=":
                return lh.eval(stack, lh.eval(stack) + rhResult);
            case "-=":
                return lh.eval(stack, lh.eval(stack) - rhResult);
            case "*=":
                return lh.eval(stack, lh.eval(stack) * rhResult);
            case "/=":
                return lh.eval(stack, lh.eval(stack) / rhResult);
            case "%=":
                return lh.eval(stack, lh.eval(stack) % rhResult);
            default:
                throw "operator not supported";
        }
    }
}
