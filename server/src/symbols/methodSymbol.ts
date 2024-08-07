import * as commentParser from "comment-parser";
import {
    IType,
    ScopedSymbol,
    MethodSymbol as BaseMethodSymbol,
    BaseSymbol,
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
    IReferenceSymbol,
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
import { ContextSymbolTable } from "../backend/ContextSymbolTable";
import {
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
import { MethodParameterSymbol } from "./variableSymbol";
import { ArrowSymbol } from "./arrowSymbol";

export const MAX_CALLDEPTH_SIZE = 25;

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

/**
 * Represents a code identifier that points to a function somehwere else, such as `foo()` or `o->bar()`.
 * On evaluation, it will attempt to look up the actual function definition and evaluate it.
 */
export class FunctionIdentifierSymbol
    extends ScopedSymbol
    implements
        IKindSymbol,
        IEvaluatableSymbol,
        IRenameableSymbol,
        IReferenceSymbol
{
    reference: BaseSymbol;
    setReference(symbol: BaseSymbol): BaseSymbol {
        return (this.reference = symbol);
    }
    getReference(): BaseSymbol {
        if (!this.reference) {
            // try to fill in the ref if it wasn't already identified
            let table: ContextSymbolTable;
            if (this.parent instanceof ArrowSymbol) {
                table = (this.parent as ArrowSymbol).objContext?.symbolTable;
            }
            table &&= this.symbolTable as ContextSymbolTable;

            this.reference = resolveOfTypeSync(
                table,
                this.name,
                LpcBaseMethodSymbol,
                false
            );
            if (isInstanceOfIReferenceableSymbol(this.reference)) {
                this.reference.addReference(this);
            }
        }
        return this.reference;
    }

    nameRange: ILexicalRange;
    public get kind() {
        return SymbolKind.Keyword;
    }

    eval(stack: CallStack, rootFrame?: StackFrame) {
        // the next symbol should be the method invocation
        // store the function name on the stack so that the method invocation
        // can access it
        stack.addLocal(
            FUNCTION_NAME_KEY,
            new StackValue(this.name, LpcTypes.stringType, this)
        );

        // try to find the def here and add a reference
        const stackFn = getFunctionFromFrame(
            rootFrame instanceof StackFrame
                ? rootFrame
                : stack.getCurrentRoot(),
            this.name
        );
        if (isInstanceOfIReferenceableSymbol(stackFn)) {
            stackFn.addReference(this);
            this.setReference(stackFn);
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
