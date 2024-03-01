import { ScopedSymbol } from "antlr4-c3";
import { IEvaluatableSymbol, IFoldableSymbol } from "./base";
import { FoldingRange } from "vscode-languageserver";

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

    eval(scope?: any) {
        this.children.forEach((e) => {
            const evaluable = e as IEvaluatableSymbol;
            evaluable.eval();
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

    eval(scope?: any) {
        // evaluate all alternatives
        this.if?.eval();
        this.elseIf?.forEach((e) => e.eval());
        this.else?.eval();
    }
}
