import { TypedSymbol, IType, BaseSymbol, ScopedSymbol } from "antlr4-c3";
import {
    IKindSymbol,
    IEvaluatableSymbol,
    getSymbolsOfTypeSync,
    isInstanceOfIEvaluatableSymbol,
} from "./base";
import { SymbolKind } from "../types";
import { IdentifierSymbol } from "./Symbol";
import { resolveOfTypeSync } from "../utils";
import { DefineSymbol } from "./defineSymbol";
import { VariableDeclaratorContext } from "../parser3/LPCParser";

export class VariableSymbol
    extends TypedSymbol
    implements IKindSymbol, IEvaluatableSymbol
{
    public value: any = 0;

    constructor(name: string, type: IType) {
        super(name, type);
    }

    eval(scope?: any) {
        if (!!scope) this.value = scope;
        return this.value;
    }

    public get kind() {
        return SymbolKind.Variable;
    }
}

/**
 * Represents an identifier symbol that refers back to a variable declared
 * in this or a parent scope.
 */
export class VariableIdentifierSymbol
    extends IdentifierSymbol
    implements IEvaluatableSymbol
{
    eval(scope?: any) {
        const def = this.findDeclaration() as IEvaluatableSymbol;
        return def?.eval(scope);
    }
    public findDeclaration() {
        let defSymbol: BaseSymbol = resolveOfTypeSync(
            this.parent,
            this.name,
            VariableSymbol
        );
        defSymbol ??= resolveOfTypeSync(this.parent, this.name, DefineSymbol);
        return defSymbol;
    }
}

export class VariableInitializerSymbol
    extends ScopedSymbol
    implements IEvaluatableSymbol
{
    constructor(name: string, public variable: VariableSymbol) {
        super(name);
    }

    eval(scope?: any) {
        let evalResult: any = null;
        this.children.forEach((child) => {
            if (isInstanceOfIEvaluatableSymbol(child)) {
                evalResult = child.eval(evalResult);
            }
        });
        this.variable.eval(evalResult);
    }
}
