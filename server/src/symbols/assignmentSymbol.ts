import { TypedSymbol, IType, ScopedSymbol } from "antlr4-c3";
import { IKindSymbol, IEvaluatableSymbol } from "./base";
import { SymbolKind } from "../types";
import { AssignmentExpressionContext } from "../parser3/LPCParser";
import { VariableIdentifierSymbol, VariableSymbol } from "./variableSymbol";
import { CallStack } from "../backend/CallStack";
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
            case "|=":
                return lh.eval(stack, lh.eval(stack) | rhResult);
            case "&=":
                return lh.eval(stack, lh.eval(stack) & rhResult);
            case "||=":
                return lh.eval(stack, lh.eval(stack) || rhResult);
            case "&&=":
                return lh.eval(stack, lh.eval(stack) && rhResult);
            default:
                const ctx = this.context as ParserRuleContext;
                addDiagnostic(this, {
                    message: `Unknown operator in assignment expression [${this.operator}]`,
                    range: rangeFromTokens(ctx.start, ctx.stop),
                    type: DiagnosticSeverity.Error,
                });
        }
    }
}
