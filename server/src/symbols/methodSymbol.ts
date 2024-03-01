import {
    TypedSymbol,
    IType,
    ScopedSymbol,
    MethodSymbol as BaseMethodSymbol,
    ParameterSymbol,
} from "antlr4-c3";
import {
    IKindSymbol,
    IEvaluatableSymbol,
    IFoldableSymbol,
    isInstanceOfIEvaluatableSymbol,
    getSymbolsOfTypeSync,
} from "./base";
import { SymbolKind } from "../types";
import { VariableSymbol } from "./variableSymbol";
import { FoldingRange } from "vscode-languageserver";
import { ExpressionSymbol } from "./expressionSymbol";
import { resolveOfTypeSync } from "../utils";
import { EfunSymbol } from "./Symbol";
import { deflateSync } from "zlib";
import { SourceContext } from "../backend/SourceContext";
import { LpcFacade } from "../backend/facade";

export class MethodParameterSymbol
    extends ParameterSymbol
    implements IKindSymbol, IEvaluatableSymbol
{
    eval() {
        return this.value;
    }

    public get kind() {
        return SymbolKind.Variable;
    }
}

export class MethodSymbol
    extends BaseMethodSymbol
    implements IFoldableSymbol, IKindSymbol, IEvaluatableSymbol
{
    constructor(
        name: string,
        returnType?: IType,
        public functionModifiers?: Set<string>
    ) {
        super(name, returnType);
    }

    eval(paramScope?: Map<string, IEvaluatableSymbol>) {
        // start with program scope

        // paramScope.forEach((value, key) => {
        //     this.scope.set(key, value as VariableSymbol);
        // });
        let result: any = 0;
        for (const child of this.children) {
            if (child instanceof ReturnSymbol) {
                result = child.eval();
            } else if (isInstanceOfIEvaluatableSymbol(child)) {
                child.eval();
            } else {
                console.warn("Non eval symbol detected in method body", child);
            }
        }
        return result;
    }

    public get kind() {
        return SymbolKind.Method;
    }

    public getParametersSync() {
        return getSymbolsOfTypeSync(this, MethodParameterSymbol);
    }

    foldingRange: FoldingRange;
}
export class MethodDeclarationSymbol
    extends MethodSymbol
    implements IKindSymbol
{
    public get kind() {
        return SymbolKind.MethodDeclaration;
    }
}

export class MethodInvocationSymbol
    extends ScopedSymbol
    implements IEvaluatableSymbol
{
    public getArguments() {
        return getSymbolsOfTypeSync(this, ExpressionSymbol);
    }

    constructor(name: string) {
        super(name);
    }

    eval(scope?: any) {
        for (const child of this.children) {
            if (isInstanceOfIEvaluatableSymbol(child)) {
                scope = child.eval(scope);
            } else {
                throw "not evaluable: " + child.name;
            }
        }
        return scope;
    }
}

export class FunctionIdentifierSymbol
    extends ScopedSymbol
    implements IKindSymbol, IEvaluatableSymbol
{
    public get kind() {
        return SymbolKind.Keyword;
    }

    public findDeclaration() {
        let defSymbol: IEvaluatableSymbol = resolveOfTypeSync(
            this.parent,
            this.name,
            MethodSymbol
        );
        defSymbol ??= resolveOfTypeSync(
            SourceContext.globalSymbols,
            this.name,
            EfunSymbol
        );
        return defSymbol;
    }

    eval(scope?: any) {
        const def = this.findDeclaration() as IEvaluatableSymbol;
        if (this.name != def.name) {
            return def?.eval(scope);
        }
    }
}

export class ReturnSymbol extends ScopedSymbol implements IEvaluatableSymbol {
    eval(scope?: any) {
        for (const child of this.children) {
            if (isInstanceOfIEvaluatableSymbol(child)) {
                return child.eval(scope);
            } else {
                throw "not evaluable: " + child.name;
            }
        }
        return undefined;
    }
}
