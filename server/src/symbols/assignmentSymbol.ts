import { ScopedSymbol } from "antlr4-c3";
import { IEvaluatableSymbol } from "./base";
import { CallStack, StackValue } from "../backend/CallStack";
import { addDiagnostic } from "./Symbol";
import { DiagnosticSeverity } from "vscode-languageserver";
import { rangeFromTokens } from "../utils";
import { ParserRuleContext } from "antlr4ng";

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

        const lhResult = lh.eval(stack);
        const rhResult = this.rhs?.eval(stack);

        const lhVal =
            (lhResult instanceof StackValue ? lhResult.value : lhResult) ?? "";
        const rhVal =
            (rhResult instanceof StackValue ? rhResult.value : rhResult) ?? "";

        if (lhVal == "[object Object]") {
            const ii = 0;
        }

        let newVal: any = undefined;

        switch (this.operator) {
            case "=":
                return lh.eval(stack, rhResult);
            case "+=":
                newVal = lhVal + rhVal;
                break;
            case "-=":
                newVal = lhVal - rhVal;
                break;
            case "*=":
                newVal = lhVal * rhVal;
                break;
            case "/=":
                newVal = lhVal / rhVal;
                break;
            case "%=":
                newVal = lhVal % rhVal;
                break;
            case "|=":
                newVal = lhVal | rhVal;
                break;
            case "&=":
                newVal = lhVal & rhVal;
                break;
            case "||=":
                newVal = lhVal || rhVal;
                break;
            case "&&=":
                newVal = lhVal && rhVal;
                break;
            case "<<=":
                newVal = lhVal << rhVal;
                break;
            case ">>=":
                newVal = lhVal >> rhVal;
                break;
            case "^=":
                newVal = lhVal ^ rhVal;
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
            lh.eval(
                stack,
                new StackValue(newVal, lhResult?.type ?? rhResult?.type, this)
            );
        }
    }
}
