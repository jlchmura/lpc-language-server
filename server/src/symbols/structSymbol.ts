import { ScopedSymbol } from "antlr4-c3";
import { IEvaluatableSymbol } from "./base";
import { CallStack, StackValue } from "../backend/CallStack";
import { ContextSymbolTable } from "../backend/ContextSymbolTable";
import { ParserRuleContext } from "antlr4ng";
import { DiagnosticSeverity } from "vscode-languageserver";
import { rangeFromTokens } from "../utils";

export class StructMemberAccessSymbol
    extends ScopedSymbol
    implements IEvaluatableSymbol
{
    /** the variable holding a struct that the member will be access fromed */
    public sourceVariable: IEvaluatableSymbol;

    /** the member that will be access on `sourceVariable` */
    public member: IEvaluatableSymbol;

    eval(stack: CallStack, scope?: any) {
        const src = this.sourceVariable.eval(stack) as StackValue;

        // if the source is not a struct, and a member was provided
        // then report this as an error
        if (src?.type?.name !== "struct" && this.member) {
            const ctx = this.member.context as ParserRuleContext;
            (this.symbolTable as ContextSymbolTable).owner.addDiagnostic({
                message: `Cannot access member on non-struct type`,
                range: rangeFromTokens(ctx.start, ctx.stop),
                type: DiagnosticSeverity.Error,
            });
        } else if (src?.type?.name == "struct" && !this.member) {
            const ctx = this.context as ParserRuleContext;
            (this.symbolTable as ContextSymbolTable).owner.addDiagnostic({
                message: `Missing struct access member name `,
                range: rangeFromTokens(ctx.start, ctx.stop),
                type: DiagnosticSeverity.Error,
            });
        }

        return scope;
    }
}
