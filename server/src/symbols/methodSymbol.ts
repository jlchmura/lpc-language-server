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
import { SourceContext } from "../backend/SourceContext";
import { ObjectReferenceInfo } from "./objectSymbol";
import { ContextSymbolTable } from "../backend/ContextSymbolTable";
import { CallStack, StackFrame, StackValue } from "../backend/CallStack";

export const MAX_CALLDEPTH_SIZE = 10;

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
    private callDepth = 0;
    constructor(
        name: string,
        returnType?: IType,
        public functionModifiers?: Set<string>
    ) {
        super(name, returnType);
    }

    /** this is a quick hack to prevent runaway recrussions during evaluation.
     * TODO: add a real call stack to the evaluation engine
     *
     */
    resetCallDepth() {
        this.callDepth = 0;
    }

    eval(stack: CallStack, params: IEvaluatableSymbol[] = []) {
        // TODO: make function arguments available

        // paramScope.forEach((value, key) => {
        //     this.scope.set(key, value as VariableSymbol);
        // });

        // add a new stack frame
        const args = new Map<string, StackValue>();
        const locals = new Map<string, StackValue>();
        stack.push(new StackFrame(this, args, locals, stack.root));

        let result: any = 0;

        // don't eval past this many recurssions, just to be safe.
        if (stack.length > MAX_CALLDEPTH_SIZE) {
            const stackTrace = stack.getStackTrace();
            console.debug("Max call stack exceeded: " + this.name, stackTrace);
            return undefined;
        }

        for (const child of this.children) {
            if (isInstanceOfIEvaluatableSymbol(child)) {
                child.eval(stack);
            } else {
                console.warn("Non eval symbol detected in method body", child);
            }
        }

        return stack.peek().returnValue;
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

    eval(stack: CallStack, scope?: any) {
        for (const child of this.children) {
            if (isInstanceOfIEvaluatableSymbol(child)) {
                scope = child.eval(stack, scope);
            } else {
                console.warn("not evaluable: " + child.name);
            }
        }
        return scope;
    }
}

/**
 * Represents a code identifier that points to a function somehwere else, such as `foo()` or `o->bar()`.
 * On evaluation, it will attempt to look up the actual function definition and evaluate it.
 */
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
            SourceContext.efunSymbols,
            this.name,
            EfunSymbol
        );

        return defSymbol;
    }

    eval(stack: CallStack, scope?: any) {
        const def = stack.getFunction(this.name);
        return def?.eval(stack, scope);
    }
}

export class ReturnSymbol extends ScopedSymbol implements IEvaluatableSymbol {
    eval(stack: CallStack, scope?: any) {
        for (const child of this.children) {
            // even though a typical compiler would stop execution here
            // we don't need to do that since we are evaluting the entire
            // program.
            if (isInstanceOfIEvaluatableSymbol(child)) {
                // eval the return expression
                const result = child.eval(stack, scope);
                // store in current stack frame and return
                stack.setReturnValue(result, this);
                return result;
            } else {
                throw "not evaluable: " + child.name;
            }
        }
        return undefined;
    }
}

export class EfunSymbol
    extends MethodSymbol
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
        return getSymbolsOfTypeSync(
            this,
            EfunParamSymbol
        ) as MethodParameterSymbol[];
    }

    eval(stack: CallStack, scope?: any) {
        const ownerProgram = (stack.root.symbol as ContextSymbolTable).owner;
        switch (this.name) {
            case "this_object":
                return new ObjectReferenceInfo(
                    ownerProgram.fileName,
                    true,
                    ownerProgram
                );
            // TODO: this is just a quick hack to get the player object
            // need a better way to check if references are already loaded.
            case "this_player":
                const playerCtx = ownerProgram.backend.addDependency(
                    ownerProgram.fileName,
                    { filename: "obj/player", symbol: this }
                );
                return new ObjectReferenceInfo(
                    "obj/player",
                    !!playerCtx,
                    playerCtx
                );
        }

        return scope;
    }

    public allowsMultiArgs() {
        const prms = this.getParametersSync();
        if (prms.length === 0) return false;
        return (prms[prms.length - 1] as EfunParamSymbol).allowMulti;
    }
}

export class EfunParamSymbol extends MethodParameterSymbol {
    constructor(name: string, type: IType, public allowMulti?: boolean) {
        super(name, type);
    }
}
