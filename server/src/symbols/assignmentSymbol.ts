import { ScopedSymbol } from "antlr4-c3";
import { ParserRuleContext } from "antlr4ng";
import { DiagnosticSeverity } from "vscode-languageserver";
import { CallStack, StackValue } from "../backend/CallStack";
import { rangeFromTokens } from "../utils";
import { addDiagnostic } from "./Symbol";
import { IEvaluatableSymbol } from "./base";

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
        const { lhs, rhs } = this;

        const rhsResult: StackValue = rhs?.eval(stack);
        let lhsResult: StackValue = undefined;

        if (this.operator === "=") {
            return lhs.eval(stack, rhsResult);
        } else {
            lhsResult = lhs?.eval(stack);
        }

        if (!lhsResult || !rhsResult || !lhsResult.execOp) {
            return undefined;
        }

        let newVal: StackValue = undefined;
        switch (this.operator) {
            case "=":
                return lhs.eval(stack, rhsResult);
            case "+=":
                newVal = lhsResult.execOp("+", rhsResult);
                break;
            case "-=":
                newVal = lhsResult.execOp("-", rhsResult);
                break;
            case "*=":
                newVal = lhsResult.execOp("*", rhsResult);
                break;
            case "/=":
                newVal = lhsResult.execOp("/", rhsResult);
                break;
            case "%=":
                newVal = lhsResult.execOp("%", rhsResult);
                break;
            case "|=":
                newVal = lhsResult.execOp("|", rhsResult);
                break;
            case "&=":
                newVal = lhsResult.execOp("&", rhsResult);
                break;
            case "||=":
                newVal = lhsResult.execOp("||", rhsResult);
                break;
            case "&&=":
                newVal = lhsResult.execOp("&&", rhsResult);
                break;
            case "<<=":
                newVal = lhsResult.execOp("<<", rhsResult);
                break;
            case ">>=":
                newVal = lhsResult.execOp(">>", rhsResult);
                break;
            case "^=":
                newVal = lhsResult.execOp("^", rhsResult);
                break;
            default:
                const ctx = this.context as ParserRuleContext;
                addDiagnostic(this, {
                    message: `Unknown operator in assignment expression [${this.operator}]`,
                    range: rangeFromTokens(ctx.start, ctx.stop),
                    type: DiagnosticSeverity.Error,
                });
        }

        if (!!newVal) {
            lhs.eval(stack, newVal);
        }
    }
}
