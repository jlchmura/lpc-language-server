import { TypedSymbol, IType, BaseSymbol } from "antlr4-c3";
import { IKindSymbol, IEvaluatableSymbol } from "./base";
import { SymbolKind } from "../types";
import { trimQuotes } from "../utils";
import { VariableSymbol } from "./variableSymbol";

export class DefineSymbol
    extends BaseSymbol
    implements IEvaluatableSymbol, IKindSymbol
{
    public get kind() {
        return SymbolKind.Define;
    }

    constructor(name: string, public value: any) {
        super(name);
    }

    eval(arg?: any) {
        // ignore incoming values, we're a constant

        if (!isNaN(parseFloat(this.value)) && isFinite(Number(this.value))) {
            if (this.value.includes(".")) {
                // float
                return +this.value;
            } else {
                // integer
                return +this.value;
            }
        } else if ((this.value as string).startsWith('"')) {
            // string
            return trimQuotes(this.value);
        } else {
            // another define?  - resolve the symbol
        }
    }
}

export class DefineVariableSymbol extends VariableSymbol {
    constructor(name: string, type: IType, public value: any) {
        super(name, type);
    }

    override get kind(): SymbolKind {
        return SymbolKind.Define;
    }
}
