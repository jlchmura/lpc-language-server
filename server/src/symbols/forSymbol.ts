import { ScopedSymbol } from "antlr4-c3";
import { IEvaluatableSymbol, LpcBaseSymbol } from "./base";
import { CallStack, StackFrame } from "../backend/CallStack";
import { VariableSymbol } from "./variableSymbol";

export class IterationSymbol
    extends ScopedSymbol
    implements IEvaluatableSymbol
{
    getVariables() {
        return this.getNestedSymbolsOfTypeSync(VariableSymbol);
    }

    eval(stack: CallStack, scope: any) {
        stack.push(new StackFrame(this, undefined, new Map(), stack.peek()));

        this.children.forEach((child) => {
            (child as IEvaluatableSymbol).eval(stack, scope);
        });

        stack.pop();
    }
}

export class ForEachSymbol extends IterationSymbol {}
