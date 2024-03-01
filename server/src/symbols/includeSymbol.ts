import { IncludeDirectiveContext } from "../parser3/LPCParser";
import { SymbolKind } from "../types";
import { IEvaluatableSymbol, LpcBaseSymbol } from "./base";

export class IncludeSymbol
    extends LpcBaseSymbol<IncludeDirectiveContext>
    implements IEvaluatableSymbol
{
    public isLoaded = false;

    public get kind() {
        return SymbolKind.Include;
    }

    eval(scope?: any) {
        return scope;
    }
}
