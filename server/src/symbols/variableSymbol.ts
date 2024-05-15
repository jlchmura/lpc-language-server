import {
    TypedSymbol,
    IType,
    BaseSymbol,
    ScopedSymbol,
    FundamentalType,
} from "antlr4-c3";
import {
    IKindSymbol,
    IEvaluatableSymbol,
    getSymbolsOfTypeSync,
    isInstanceOfIEvaluatableSymbol,
    IRenameableSymbol,
} from "./base";
import { ILexicalRange, LpcTypes, SymbolKind } from "../types";
import { ArgumentSymbol, IdentifierSymbol } from "./Symbol";
import { resolveOfTypeSync } from "../utils";
import { DefineSymbol } from "./defineSymbol";
import { VariableDeclaratorContext } from "../parser3/LPCParser";
import { CallStack, StackValue } from "../backend/CallStack";
import { Token } from "antlr4ng";
import { LpcBaseMethodSymbol } from "./methodSymbol";

export class VariableSymbol
    extends TypedSymbol
    implements IKindSymbol, IEvaluatableSymbol
{
    public value: any;

    constructor(name: string, type: IType, public nameToken?: Token) {
        super(name, type);
    }

    eval(stack: CallStack, scope?: any) {
        if (scope !== undefined) {
            if (scope instanceof StackValue) {
                this.value = scope.value;
                this.type = scope.type;
            } else {
                this.value = scope;
            }
        }

        stack.addLocal(this.name, new StackValue(this.value, this.type, this));

        return new StackValue(this.value, this.type, this);
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
    implements IEvaluatableSymbol, IRenameableSymbol
{
    nameRange: ILexicalRange;
    eval(stack: CallStack, scope?: any) {
        //const def = this.findDeclaration() as IEvaluatableSymbol;
        const def = stack.getValue(this.name)?.symbol as IEvaluatableSymbol;
        return def?.eval(stack, scope);
    }
    public findDeclaration() {
        let defSymbol: BaseSymbol = resolveOfTypeSync(
            this.parent,
            this.name,
            VariableSymbol
        );
        defSymbol ??= resolveOfTypeSync(this.parent, this.name, ArgumentSymbol);

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

    eval(stack: CallStack, scope?: any) {
        let evalResult: any = null;
        this.children.forEach((child) => {
            evalResult = (child as IEvaluatableSymbol).eval(stack, evalResult);
        });

        if (!this.variable.type) {
            if (typeof evalResult === "number") {
                this.variable.type = FundamentalType.integerType;
            } else if (typeof evalResult === "string") {
                this.variable.type = FundamentalType.stringType;
            }
        }

        this.variable.eval(stack, evalResult);
    }
}
