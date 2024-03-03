import { ScopedSymbol } from "antlr4-c3";
import { IEvaluatableSymbol, IFoldableSymbol } from "./base";
import { FoldingRange } from "vscode-languageserver";
import { CallStack } from "../backend/CallStack";

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
        // TODO: this should add a new frame?
        this.children.forEach((e) => {
            const evaluable = e as IEvaluatableSymbol;
            evaluable.eval(stack);
        });
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
        this.if?.eval(stack);
        this.elseIf?.forEach((e) => e.eval(stack));
        this.else?.eval(stack);
    }
}
