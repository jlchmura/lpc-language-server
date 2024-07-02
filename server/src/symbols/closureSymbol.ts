import { SymbolKind } from "../types";
import { IKindSymbol } from "./base";
import { MethodSymbol } from "./methodSymbol";

export class InlineClosureSymbol extends MethodSymbol implements IKindSymbol {
    public get kind() {
        return SymbolKind.InlineClosure;
    }
}
