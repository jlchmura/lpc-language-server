import * as commentParser from "comment-parser";
import {
    IType,
    ScopedSymbol,
    MethodSymbol as BaseMethodSymbol,
    ParameterSymbol,
    BaseSymbol,
    TypeKind,
} from "antlr4-c3";
import {
    IKindSymbol,
    IEvaluatableSymbol,
    IFoldableSymbol,
    isInstanceOfIEvaluatableSymbol,
    getSymbolsOfTypeSync,
    IRenameableSymbol,
    IReferenceableSymbol,
    isInstanceOfIReferenceableSymbol,
} from "./base";
import {
    DiagnosticCodes,
    FUNCTION_NAME_KEY,
    ILexicalRange,
    LpcTypes,
    SymbolKind,
} from "../types";
import { DiagnosticSeverity, FoldingRange } from "vscode-languageserver";
import { ExpressionSymbol } from "./expressionSymbol";
import { lexRangeFromContext, rangeFromTokens } from "../utils";

import { ObjectReferenceInfo } from "./objectSymbol";
import { ContextSymbolTable } from "../backend/ContextSymbolTable";
import {
    ArrayStackValue,
    CallStack,
    RootFrame,
    StackFrame,
    StackValue,
    getFunctionFromFrame,
} from "../backend/CallStack";
import { ParserRuleContext, Token } from "antlr4ng";
import { addDiagnostic } from "./Symbol";
import { InheritSuperAccessorSymbol } from "./inheritSymbol";
import { resolveOfTypeSync } from "../backend/symbol-utils";
import { asStackValue } from "../backend/CallStackUtils";
import { ensureLpcConfig } from "../backend/LpcConfig";

export const MAX_CALLDEPTH_SIZE = 25;

export class MethodParameterSymbol
    extends ParameterSymbol
    implements IKindSymbol, IEvaluatableSymbol
{
    constructor(
        name: string,
        type: IType,
        public nameToken?: Token,
        public varArgs = false
    ) {
        super(name, undefined, type);
    }

    eval(stack: CallStack) {
        return stack.getValue(this.name, this);
    }

    public get kind() {
        return SymbolKind.Variable;
    }
}

export class LpcBaseMethodSymbol
    extends BaseMethodSymbol
    implements
        IFoldableSymbol,
        IKindSymbol,
        IEvaluatableSymbol,
        IRenameableSymbol,
        IReferenceableSymbol
{
    doc: commentParser.Block;

    public references: Set<BaseSymbol> = new Set<BaseSymbol>();

    constructor(
        name: string,
        returnType?: IType,
        public functionModifiers?: Set<string>
    ) {
        super(name, returnType);
    }
    nameRange: ILexicalRange;

    eval(
        stack: CallStack,
        args: IEvaluatableSymbol[] = [],
        callScope?: RootFrame
    ) {
        args = args ?? [];

        // add a new stack frame
        const locals = new Map<string, StackValue>();

        // args eval on the main stack
        const params = this.getParametersSync();

        if (!!params?.forEach) {
            params?.forEach((p, idx) => {
                const argSym = args.length > idx ? args[idx] : undefined;
                //if (!!argSym && !isInstanceOfIEvaluatableSymbol(argSym)) debugger;
                const argVal = argSym?.eval(stack, callScope) as StackValue;
                const paramVal = argVal ?? asStackValue(0, p.type, p);
                locals.set(p.name, paramVal);

                if (
                    !!argVal?.type?.name &&
                    p.type?.name != argVal.type?.name &&
                    p.type != LpcTypes.unknownType
                ) {
                    addDiagnostic(argSym, {
                        message: `Argument of type '${argVal.type?.name}' is not assignable to parameter of type '${p.type?.name}'.`,
                        source: "argumentTypeMismatch",
                        range: lexRangeFromContext(
                            argSym.context as ParserRuleContext
                        ),
                        code: "argumentTypeMismatch",
                        type: DiagnosticSeverity.Warning,
                    });
                }
            });
        }

        // the function's root frame is the callScope (if it was passed)
        stack.push(
            new StackFrame(this, undefined, locals, callScope ?? stack.peek())
        );

        let result: any = 0;

        // don't eval past this many recurssions, just to be safe.
        if (stack.length > MAX_CALLDEPTH_SIZE || stack.isCallerInStack(this)) {
            const stackTrace = stack.getStackTrace();
            //console.debug("Max call stack exceeded: " + this.name, stackTrace);
            stack.pop();
            return undefined;
        }

        for (const child of this.children) {
            if (isInstanceOfIEvaluatableSymbol(child)) {
                child.eval(stack);
            } else {
                console.warn("Non eval symbol detected in method body", child);
            }
        }

        if (!(this instanceof MethodDeclarationSymbol)) {
            // try to find declaration and add a ref
            const decl = resolveOfTypeSync(
                this.symbolTable,
                this.name,
                MethodDeclarationSymbol
            );
            if (isInstanceOfIReferenceableSymbol(decl)) {
                decl.addReference(this);
            }
        }

        return stack.pop().returnValue;
    }

    public get kind() {
        return SymbolKind.Method;
    }

    public getParametersSync() {
        return getSymbolsOfTypeSync(this, MethodParameterSymbol);
    }

    public addReference(symbol: BaseSymbol): void {
        this.references.add(symbol);
    }

    foldingRange: FoldingRange;
}

export class MethodSymbol extends LpcBaseMethodSymbol {}

export class MethodDeclarationSymbol
    extends LpcBaseMethodSymbol
    implements IKindSymbol, IRenameableSymbol
{
    nameRange: ILexicalRange;

    public get kind() {
        return SymbolKind.MethodDeclaration;
    }
}

export class MethodInvocationSymbol
    extends ScopedSymbol
    implements IEvaluatableSymbol, IKindSymbol
{
    public methodName: string;
    public methodSymbol: MethodSymbol;

    public getArguments() {
        return getSymbolsOfTypeSync(this, ExpressionSymbol);
    }

    public get kind() {
        return SymbolKind.MethodInvocation;
    }

    constructor(name: string) {
        super(name);
    }

    eval(stack: CallStack, callScope?: RootFrame) {
        // if a callScope was passed, that stack frame is used for fn lookup
        const fnLookupFrame = callScope ?? stack.getCurrentRoot();

        // find the function that this invocation points to
        const funcIdValue = stack.getValue<string>(FUNCTION_NAME_KEY, this);
        stack.clearValue(FUNCTION_NAME_KEY);
        const methodName = (this.methodName = funcIdValue?.value);

        let methodSymbol: MethodSymbol;

        const superAcc = this.getParentOfType(InheritSuperAccessorSymbol);
        if (!!superAcc) {
            // this is a special case where we need to get the method from the super accessor's symbol table
            // try actual method first, then definitions & efuns

            // NTBLA: This is actualy incorrectly - each inherit should add a frame to the stack so that we
            // can just walk up the stack and look for the inherited method.

            methodSymbol = resolveOfTypeSync(
                superAcc.objSymbolTable,
                methodName,
                MethodSymbol,
                false
            );
            methodSymbol ??= resolveOfTypeSync(
                superAcc.objSymbolTable,
                methodName,
                LpcBaseMethodSymbol,
                false
            );
            this.methodSymbol = methodSymbol;
        } else {
            // just get method out of stack
            methodSymbol = this.methodSymbol = getFunctionFromFrame(
                fnLookupFrame,
                methodName
            );
        }

        if (!funcIdValue) {
            const ctx = this.context as ParserRuleContext;
            addDiagnostic(this, {
                message: `Function could not be validated`,
                range: rangeFromTokens(ctx.start, ctx.stop),
                type: DiagnosticSeverity.Hint,
                code: DiagnosticCodes.FunctionUnknown,
            });
        } else if (!methodSymbol) {
            const ctx = (funcIdValue?.symbol ?? this)
                .context as ParserRuleContext;
            // if (methodName == "call_other") {
            //     const ii = 0;
            // }
            addDiagnostic(this, {
                message: `Cannot find function named '${methodName ?? ""}'.`,
                range: rangeFromTokens(ctx.start, ctx.stop),
                type: DiagnosticSeverity.Warning,
                code: DiagnosticCodes.FunctionNotFound,
            });
        }

        const prms = this.getArguments().filter((c) =>
            isInstanceOfIEvaluatableSymbol(c)
        ) as IEvaluatableSymbol[];
        // for (const child of this.children) {
        //     if (isInstanceOfIEvaluatableSymbol(child)) {
        //         scope = child.eval(stack, scope);
        //     } else {
        //         console.warn("not evaluable: " + child.name);
        //     }
        // }

        return methodSymbol?.eval(stack, prms, callScope);
    }

    /**
     * get the method symbol that this invocation points to.
     */
    public getMethodSymbol() {
        // find the context that this method is being invoked on
        return this.methodSymbol;
    }
}

/**
 * Represents a code identifier that points to a function somehwere else, such as `foo()` or `o->bar()`.
 * On evaluation, it will attempt to look up the actual function definition and evaluate it.
 */
export class FunctionIdentifierSymbol
    extends ScopedSymbol
    implements IKindSymbol, IEvaluatableSymbol, IRenameableSymbol
{
    nameRange: ILexicalRange;
    public get kind() {
        return SymbolKind.Keyword;
    }

    eval(stack: CallStack, scope?: any) {
        // the next symbol should be the method invocation
        // store the function name on the stack so that the method invocation
        // can access it
        stack.addLocal(
            FUNCTION_NAME_KEY,
            new StackValue(this.name, LpcTypes.stringType, this)
        );

        // try to find the def here and add a reference
        const stackFn = stack.getFunction(this.name);
        if (isInstanceOfIReferenceableSymbol(stackFn)) {
            stackFn.addReference(this);
        }
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
            MethodParameterSymbol
        ) as MethodParameterSymbol[];
    }

    eval(
        stack: CallStack,
        args: IEvaluatableSymbol[] = [],
        callScope?: RootFrame
    ) {
        const ownerProgram = (stack.root.symbol as ContextSymbolTable).owner;
        const { fileHandler } = ownerProgram;

        const argEval = args?.map((a) => {
            return a?.eval(stack, callScope) as StackValue;
        });

        const config = ensureLpcConfig();

        // handle special efuns cases
        switch (this.name) {
            // NTBLA: put current object on the stack and return that instead of loading a new
            // instance of the object
            case "first_inventory":
            case "next_inventory":
                return new StackValue(undefined, LpcTypes.objectType, this);
            case "this_object":
                return new StackValue(
                    new ObjectReferenceInfo(
                        ownerProgram.fileName,
                        true,
                        ownerProgram
                    ),
                    LpcTypes.objectType,
                    this
                );
            // TODO: this is just a quick hack to get the player object
            // need a better way to check if references are already loaded.
            case "this_interactive":
            case "this_user":
            case "this_player":
                const playerCtx = fileHandler.loadReference(
                    config.files.player,
                    this
                );

                return new StackValue(
                    new ObjectReferenceInfo(
                        playerCtx?.fileName,
                        true,
                        playerCtx
                    ),
                    LpcTypes.objectType,
                    this
                );
            case "users":
                const playerUsersCtx = fileHandler.loadReference(
                    config.files.player,
                    this
                );

                const playerObj = new ObjectReferenceInfo(
                    playerUsersCtx?.fileName,
                    true,
                    playerUsersCtx
                );
                return asStackValue(
                    [playerObj],
                    LpcTypes.objectArrayType,
                    this
                );
                break;
            case "explode":
                const str = argEval[0];
                const delim = argEval[1];
                const strVal = str?.value ?? 0;
                const delimVal = delim?.value;

                if (
                    str?.type?.name != "string" ||
                    delim?.type?.name != "string"
                ) {
                    return undefined;
                }
                if (strVal == 0 || delimVal == 0 || typeof strVal != "string") {
                    return undefined;
                }

                return new ArrayStackValue<string>(
                    (strVal as string)
                        ?.split(delimVal)
                        .map((s) => asStackValue(s, LpcTypes.stringType, this)),
                    LpcTypes.stringArrayType,
                    this
                );
            case "new":
            case "clone_object":
                return cloneObjectImpl(stack, argEval, callScope, this);
        }

        return undefined;
    }

    public allowsMultiArgs() {
        const prms = this.getParametersSync();
        if (prms.length === 0) return false;
        return prms[prms.length - 1].varArgs;
    }
}

/** @deprecated */
export class EfunParamSymbol extends MethodParameterSymbol {
    constructor(name: string, type: IType, public allowMulti?: boolean) {
        super(name, type);
    }
}

export class InlineClosureSymbol extends MethodSymbol implements IKindSymbol {
    public get kind() {
        return SymbolKind.InlineClosure;
    }
}

function cloneObjectImpl(
    stack: CallStack,
    argVals: StackValue[],
    callScope: RootFrame,
    symbol: EfunSymbol
) {
    const ownerProgram = (stack.root.symbol as ContextSymbolTable).owner;
    const { fileHandler } = ownerProgram;

    // what type is the first arg?
    const firstArg = argVals.at(0);
    if (!firstArg) {
        return undefined;
    }

    if (firstArg.type.kind == TypeKind.String) {
        const filename = firstArg.value;
        const ctx = fileHandler.loadReference(filename, symbol);
        if (!ctx) {
            return undefined;
        }

        const info = new ObjectReferenceInfo();
        info.filename = filename;
        info.isLoaded = true;
        info.context = ctx;
        return asStackValue(info);
    }
}
