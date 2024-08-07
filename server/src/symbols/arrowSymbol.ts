import {
    IEvaluatableSymbol,
    ObjectReferenceInfo,
    isInstanceOfIReferenceSymbol,
    isInstanceOfIReferenceableSymbol,
} from "./base";
import { ArrayStackValue, CallStack, StackValue } from "../backend/CallStack";
import { SourceContext } from "../backend/SourceContext";
import { ParserRuleContext } from "antlr4ng";
import { ContextSymbolTable } from "../backend/ContextSymbolTable";
import { rangeFromTokens } from "../utils";
import { DiagnosticSeverity } from "vscode-languageserver";
import { addDiagnostic } from "./Symbol";
import { ScopedSymbol } from "antlr4-c3";
import { LpcFileHandler } from "../backend/FileHandler";
import {
    addDependenciesToStack,
    addPogramToStack,
} from "../backend/CallStackUtils";
import { DiagnosticCodes, FUNCTION_NAME_KEY } from "../types";
import { getDriverInfo } from "../driver/Driver";
import { MethodInvocationSymbol } from "./methodInvocationSymbol";

export enum ArrowType {
    CallOther,
    StructMember,
    Unknown,
}

/**
 * An arrow symbol can be a Call Other (i.e. `obj->fn()`) or a struct member access (`foo->member`).
 * The specific type may be determined if by syntax (if there are parens, indicated a method invocation),
 * but otherwise can't be determined until eval-time based on the resulting type of the source object.
 */
export class ArrowSymbol extends ScopedSymbol implements IEvaluatableSymbol {
    public ArrowType: ArrowType = ArrowType.CallOther;

    /** the object that call_other will be invoked on */
    public source: IEvaluatableSymbol;

    /** the target method/member that will be invoked/access on `source` */
    public target: IEvaluatableSymbol;

    /** the method invocation symbol, which contains arguments for a call other  */
    public methodInvocation: MethodInvocationSymbol;

    public functionName?: string;

    /** information about the object (not the symbol) that call_other is being invoked on */
    public objectRef: ObjectReferenceInfo;
    public objContext: SourceContext;

    public hasEvaluated: boolean = false;

    constructor(name: string, private fileHandler: LpcFileHandler) {
        super(name);
        this.ArrowType = ArrowType.Unknown;
    }

    eval(stack: CallStack, scope?: any) {
        const srcValue = this.source.eval(stack) as StackValue;
        this.hasEvaluated = true;
        // only evaluate as a struct if the source object is
        // specifically known to be a struct
        if (
            this.ArrowType == ArrowType.StructMember ||
            srcValue?.type?.name == "struct"
        ) {
            this.ArrowType = ArrowType.StructMember;
            return this.evalStruct(stack, scope, srcValue);
        } else {
            this.ArrowType = ArrowType.CallOther;
            return this.evalCallOther(stack, scope, srcValue);
        }
    }

    private evalStruct(stack: CallStack, scope: any, srcValue: StackValue) {
        if (!this.target) {
            const ctx = this.context as ParserRuleContext;
            addDiagnostic(this, {
                message: `Missing struct access member name `,
                range: rangeFromTokens(ctx.start, ctx.stop),
                type: DiagnosticSeverity.Error,
            });
        } else if (this.methodInvocation) {
            const ctx = this.target.context as ParserRuleContext;
            addDiagnostic(this, {
                message: `Cannot call methods on struct members`,
                range: rangeFromTokens(ctx.start, ctx.stop),
                type: DiagnosticSeverity.Error,
                code: DiagnosticCodes.StructMembmerAsFunction,
            });
        }

        this.target?.eval(stack);

        return scope;
    }

    private evalCallOther(stack: CallStack, scope: any, srcValue: StackValue) {
        // run some diagnostics
        if (!this.target) {
            const ctx = this.context as ParserRuleContext;
            (this.symbolTable as ContextSymbolTable).owner.addDiagnostic({
                message: `Missing method name`,
                range: rangeFromTokens(ctx.start, ctx.stop),
                type: DiagnosticSeverity.Error,
            });
        } else if (!this.methodInvocation) {
            const ctx = this.target.context as ParserRuleContext;
            addDiagnostic(this, {
                message: `Missing ()`,
                range: rangeFromTokens(ctx.start, ctx.stop),
                type: DiagnosticSeverity.Error,
            });
        }

        // even if diagnostics failed, continue evaluating because
        // we may have an objContext that we want to return

        // function name could be an expression, so evaluate that
        const targetResult = this.target?.eval(stack);
        if (!this.functionName || this.functionName == "#fn") {
            this.functionName = targetResult;
        }

        // if (!this.functionName) {
        //     // TODO send via diagnostic?
        //     console.warn(
        //         "could not determine function name for arrow: " + this.name
        //     );
        // }

        const obj = srcValue?.value;
        if (typeof obj === "string") {
            // try to load the object
            this.objContext = this.loadObject(obj);
        } else if (obj instanceof ObjectReferenceInfo) {
            this.objectRef = obj;
            this.objContext = obj.context;
        } else if (srcValue instanceof ArrayStackValue) {
            // call other can will invoke a function on each element in an array
            // grab the first element and use that as the object reference
            if (obj.at(0)?.value instanceof ObjectReferenceInfo) {
                this.objectRef = obj.at(0).value as ObjectReferenceInfo;
                this.objContext = this.objectRef.context;
            }
        }

        if (!this.objContext) {
            const ctx = (this.target?.context ??
                this.context) as ParserRuleContext;
            addDiagnostic(this, {
                message: `Unable to validate function [${
                    this.functionName ?? ""
                }]`,
                range: rangeFromTokens(ctx.start, ctx.stop),
                type: DiagnosticSeverity.Information,
                code: DiagnosticCodes.CallOtherTargetUnknown,
                source: DiagnosticCodes.CallOtherTargetUnknown,
            });
            return undefined;
        }

        // at this point we've figured out the function name and now need
        // to find the actual function symbol which will be in the source
        // object's symbol table
        const symTbl = this.objContext?.symbolTable; // (obj as ObjectReferenceInfo).context?.symbolTable;
        const funSym =
            symTbl?.getFunction(this.functionName) ??
            symTbl?.getFunctionHeader(this.functionName);

        if (!funSym) {
            const ctx = (this.target ?? this).context as ParserRuleContext;

            const diagCode = !!this.objContext
                ? DiagnosticCodes.CallOtherLfunNotFound
                : DiagnosticCodes.CallOtherTargetUnknown;

            addDiagnostic(this, {
                message: `Function '${
                    this.functionName ?? ""
                }' may be undefined`,
                range: rangeFromTokens(ctx.start, ctx.stop),
                code: diagCode,
                type: DiagnosticSeverity.Error,
            });
        } else if (isInstanceOfIReferenceableSymbol(funSym)) {
            // store reference information
            funSym.addReference(this.target ?? this);
            if (isInstanceOfIReferenceSymbol(this.target)) {
                this.target.setReference(funSym);
            }
        }

        // the method invocation symbol will have the call arguments
        const methodInvok = this.methodInvocation;
        // if (!(methodInvok instanceof MethodInvocationSymbol)) {
        //     console.warn(
        //         "expected a method invocation",
        //         this.name,
        //         this.symbolTable.name,
        //         (this.context as ParserRuleContext).start.line
        //     );
        // }

        // evaluate the argumnents
        const argVals = methodInvok?.getArguments()?.map((a) => a.eval(stack));

        if (!symTbl || !methodInvok) {
            // clear the temp function pointer
            stack.clearValue(FUNCTION_NAME_KEY);
            return undefined;
        }

        // create a new root frame for this object
        // this doesn't need to go on the stack, it's just a temporary frame
        const arrowStack = new CallStack(symTbl);
        const rootFrame = arrowStack.root;

        // since we have a new root frame, we need to add the functions for the arrow's program
        // NTBLA: create the root frame in the source context so taht funs don't have to be re-added every time

        // after new root frame is on the stack, add the arrow's program to the stack
        const driver = getDriverInfo();
        addPogramToStack(driver.efuns, arrowStack);
        addDependenciesToStack(this.fileHandler, symTbl, arrowStack);
        addPogramToStack(symTbl, arrowStack);

        //const result = funSym.eval(stack, argVals);
        if (!!funSym) {
            this.target?.eval(stack, rootFrame); // eval target again to put fn name on stack
            const result = methodInvok?.eval(stack, rootFrame);
            return result;
        }
    }

    loadObject(filename: string) {
        // load context for this arrow's object symbol
        const sourceContext = this.fileHandler.loadReference(filename, this);

        if (!sourceContext) {
            const ctx = this.context as ParserRuleContext;
            addDiagnostic(this, {
                message: "could not load source for: " + filename,
                range: rangeFromTokens(ctx.start, ctx.stop),
                type: DiagnosticSeverity.Warning,
                code: DiagnosticCodes.ObjectNotFound,
            });
        }
        return sourceContext;
    }
}
