import { ScopedSymbol } from "antlr4-c3";
import {
    IKindSymbol,
    IEvaluatableSymbol,
    isInstanceOfIEvaluatableSymbol,
    getSymbolsOfTypeSync,
} from "./base";
import { DiagnosticCodes, FUNCTION_NAME_KEY, SymbolKind } from "../types";
import { DiagnosticSeverity } from "vscode-languageserver";
import { ExpressionSymbol } from "./expressionSymbol";
import { rangeFromTokens } from "../utils";
import {
    CallStack,
    RootFrame,
    getFunctionFromFrame,
} from "../backend/CallStack";
import { ParserRuleContext, Token } from "antlr4ng";
import { addDiagnostic } from "./Symbol";
import { InheritSuperAccessorSymbol } from "./inheritSymbol";
import { resolveOfTypeSync } from "../backend/symbol-utils";
import { LpcBaseMethodSymbol, MethodSymbol } from "./methodSymbol";

export class MethodInvocationSymbol
    extends ScopedSymbol
    implements IEvaluatableSymbol, IKindSymbol
{
    public methodName: string;
    public methodSymbol: MethodSymbol;

    public getArguments() {
        return getSymbolsOfTypeSync(this, ExpressionSymbol);
    }

    public get kind() {
        return SymbolKind.MethodInvocation;
    }

    constructor(name: string) {
        super(name);
    }

    eval(stack: CallStack, callScope?: RootFrame) {
        // if a callScope was passed, that stack frame is used for fn lookup
        const fnLookupFrame = callScope ?? stack.getCurrentRoot();

        // find the function that this invocation points to
        const funcIdValue = stack.getValue<string>(FUNCTION_NAME_KEY, this);
        stack.clearValue(FUNCTION_NAME_KEY);
        const methodName = (this.methodName = funcIdValue?.value);

        let methodSymbol: MethodSymbol;

        const superAcc = this.getParentOfType(InheritSuperAccessorSymbol);
        if (!!superAcc) {
            // this is a special case where we need to get the method from the super accessor's symbol table
            // try actual method first, then definitions & efuns

            // NTBLA: This is actualy incorrectly - each inherit should add a frame to the stack so that we
            // can just walk up the stack and look for the inherited method.

            methodSymbol = resolveOfTypeSync(
                superAcc.objSymbolTable,
                methodName,
                MethodSymbol,
                false
            );
            methodSymbol ??= resolveOfTypeSync(
                superAcc.objSymbolTable,
                methodName,
                LpcBaseMethodSymbol,
                false
            );
            this.methodSymbol = methodSymbol;
        } else {
            // just get method out of stack
            methodSymbol = this.methodSymbol = getFunctionFromFrame(
                fnLookupFrame,
                methodName
            );
        }

        if (!funcIdValue) {
            const ctx = this.context as ParserRuleContext;
            addDiagnostic(this, {
                message: `Function could not be validated`,
                range: rangeFromTokens(ctx.start, ctx.stop),
                type: DiagnosticSeverity.Hint,
                code: DiagnosticCodes.FunctionUnknown,
            });
        } else if (!methodSymbol) {
            const ctx = (funcIdValue?.symbol ?? this)
                .context as ParserRuleContext;
            // if (methodName == "call_other") {
            //     const ii = 0;
            // }
            addDiagnostic(this, {
                message: `Cannot find function named '${methodName ?? ""}'.`,
                range: rangeFromTokens(ctx.start, ctx.stop),
                type: DiagnosticSeverity.Warning,
                code: DiagnosticCodes.FunctionNotFound,
            });
        }

        const prms = this.getArguments().filter((c) =>
            isInstanceOfIEvaluatableSymbol(c)
        ) as IEvaluatableSymbol[];
        // for (const child of this.children) {
        //     if (isInstanceOfIEvaluatableSymbol(child)) {
        //         scope = child.eval(stack, scope);
        //     } else {
        //         console.warn("not evaluable: " + child.name);
        //     }
        // }

        return methodSymbol?.eval(stack, prms, callScope);
    }

    /**
     * get the method symbol that this invocation points to.
     */
    public getMethodSymbol() {
        // find the context that this method is being invoked on
        return this.methodSymbol;
    }
}
