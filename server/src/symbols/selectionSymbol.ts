import { ScopedSymbol } from "antlr4-c3";
import { IEvaluatableSymbol, IFoldableSymbol } from "./base";
import { FoldingRange } from "vscode-languageserver";
import { CallStack, StackValue } from "../backend/CallStack";

/** if, switch, etc */
export class SelectionSymbol
    extends ScopedSymbol
    implements IFoldableSymbol, IEvaluatableSymbol
{
    constructor(
        name: string,
        public label: string,
        public foldingRange: FoldingRange
    ) {
        super(name);
    }

    eval(stack: CallStack, scope?: any) {
        if (this.children.length > 0) {
            const conditional = this.children[0] as IEvaluatableSymbol;
            const condResult = conditional.eval(stack) as StackValue;
            if (!!condResult?.value || stack.diagnosticMode) {
                if (this.children.length > 1) {
                    const block = this.children[1] as IEvaluatableSymbol;
                    block.eval(stack);
                    return true;
                }
            }
        }

        if (this.children.length > 2) {
            console.warn("unexpected children in selection symbol", this);
        }

        return false;
    }
}

export class IfSymbol extends ScopedSymbol implements IEvaluatableSymbol {
    public if: SelectionSymbol;
    public elseIf: SelectionSymbol[];
    public else: SelectionSymbol;

    constructor(name: string) {
        super(name);
    }

    eval(stack: CallStack, scope?: any) {
        // evaluate all alternatives
        const branches = [this.if, ...(this.elseIf ?? []), this.else];
        for (const branch of branches) {
            if (!!branch) {
                if (branch.eval(stack) && !stack.diagnosticMode) return;
            }
        }
    }
}
