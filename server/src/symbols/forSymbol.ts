import { ScopedSymbol } from "antlr4-c3";
import { IEvaluatableSymbol, LpcBaseSymbol } from "./base";
import { CallStack } from "../backend/CallStack";
import { VariableSymbol } from "./variableSymbol";

export class IterationSymbol
    extends ScopedSymbol
    implements IEvaluatableSymbol
{
    getVariables() {
        return this.getNestedSymbolsOfTypeSync(VariableSymbol);
    }

    eval(stack: CallStack, scope: any) {
        this.children.forEach((child) => {
            (child as IEvaluatableSymbol).eval(stack, scope);
        });
    }
}

export class ForEachSymbol extends IterationSymbol {}
