import {
    IType,
    ParameterSymbol,
    MethodSymbol as BaseMethodSymbol,
} from "antlr4-c3";
import { IEvaluatableSymbol, IKindSymbol, getSymbolsOfTypeSync } from "./base";
import { SymbolKind } from "../types";

export class EfunSymbol
    extends BaseMethodSymbol
    implements IKindSymbol, IEvaluatableSymbol
{
    public constructor(
        name: string,
        public returnType?: IType,
        public functionModifiers: Set<string> = new Set()
    ) {
        super(name);
    }
    public get kind() {
        return SymbolKind.Efun;
    }

    public getParametersSync() {
        return getSymbolsOfTypeSync(this, EfunParamSymbol);
    }

    eval(scope?: any) {
        return scope;
    }

    public allowsMultiArgs() {
        const prms = this.getParametersSync();
        if (prms.length === 0) return false;
        return (prms[prms.length - 1] as EfunParamSymbol).allowMulti;
    }
}

export class EfunParamSymbol extends ParameterSymbol {
    constructor(name: string, type: IType, public allowMulti?: boolean) {
        super(name, type);
    }
}
