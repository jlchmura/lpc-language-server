import { BaseSymbol, IType, ScopedSymbol } from "antlr4-c3";
import {
    IEvaluatableSymbol,
    getSymbolsOfTypeSync,
    isInstanceOfIEvaluatableSymbol,
} from "./base";
import { addDiagnostic } from "./Symbol";
import { normalizeFilename, rangeFromTokens } from "../utils";
import { MethodInvocationSymbol, MethodSymbol } from "./methodSymbol";
import { ContextSymbolTable } from "../backend/ContextSymbolTable";
import { SourceContext } from "../backend/SourceContext";

import { ParserRuleContext } from "antlr4ng";
import { DiagnosticSeverity } from "vscode-languageserver";
import { CallStack, StackFrame } from "../backend/CallStack";

export class ObjectReferenceInfo {
    constructor(
        public filename?: string,
        public isLoaded?: boolean,
        public context?: SourceContext
    ) {}
}

export class CloneObjectSymbol
    extends ScopedSymbol
    implements IEvaluatableSymbol
{
    public isLoaded = false;
    private sourceContext: SourceContext;

    constructor(name: string, public filename?: string) {
        super(name);
    }

    eval(stack: CallStack) {
        // first evaluate the filename

        // TODO: use call stack here
        let filename = "";
        for (const child of this.children) {
            if (isInstanceOfIEvaluatableSymbol(child)) {
                filename = child.eval(stack, filename);
            } else {
                throw "not evaluable";
            }
        }

        // try to load the source context and store the info in this symbol
        const backend = (this.symbolTable as ContextSymbolTable).owner.backend;
        this.filename = backend.filenameToAbsolutePath(
            normalizeFilename(filename)
        );
        this.loadSource();

        const info = new ObjectReferenceInfo();
        info.filename = filename;
        info.isLoaded = this.isLoaded;
        info.context = this.sourceContext;
        return info;
    }

    private loadSource() {
        if (!this.isLoaded) {
            const backend = (this.symbolTable as ContextSymbolTable).owner
                .backend;
            this.sourceContext = backend.loadLpc(this.filename);
            if (!!this.sourceContext) {
                this.isLoaded = true;
            } else {
                const ctx = this.context as ParserRuleContext;
                addDiagnostic(this, {
                    message: "could not load source for: " + this.filename,
                    range: rangeFromTokens(ctx.start, ctx.stop),
                    type: DiagnosticSeverity.Warning,
                });
            }
        }
    }

    /**
     * intercept the resolve and resolve only from this objects source context
     * @param name
     * @param localOnly
     * @returns
     */
    override resolveSync(name: string, localOnly?: boolean): BaseSymbol {
        this.loadSource(); // load if needed
        return this.sourceContext.resolveSymbol(name);
    }
}

/**
 * Represents a call_other expression in the code, i.e. `ob->method(args)`
 */
export class CallOtherSymbol
    extends ScopedSymbol
    implements IEvaluatableSymbol
{
    /** the object that call_other will be invoked on */
    public sourceObject: IEvaluatableSymbol;
    /** the target method that will be invoked on `sourceObject` */
    public target: IEvaluatableSymbol;
    /** the method invocation symbol, which contains arguments */
    public methodInvocation: MethodInvocationSymbol;

    /** information about the object (not the symbol) that call_other is being invoked on */
    public objectRef: ObjectReferenceInfo;

    constructor(name: string, public functionName?: string) {
        super(name);
    }

    eval(stack: CallStack, val: any) {
        // first evaluate the source object. that will give us the
        // object reference info that we need to resolve the function name
        const obj = this.sourceObject?.eval(stack);
        if (!(obj instanceof ObjectReferenceInfo)) {
            // TODO report this as a diagnostic?
            console.debug("expected object reference info", obj);
            return undefined;
        }

        // store for later use in semantic analysis
        this.objectRef = obj;

        // function name could be an expression, so evaluate that
        if (!this.functionName || this.functionName == "#fn") {
            this.functionName = this.target?.eval(stack);
        }

        if (!this.functionName) {
            // TODO send via diagnostic?
            console.warn(
                "could not determine function name for arrow: " + this.name
            );
        }

        // at this point we've figured out the function name and now need
        // to find the actual function symbol which will be in the source
        // object's symbol table
        const symTbl = (obj as ObjectReferenceInfo).context?.symbolTable;
        const funSym = symTbl?.getFunction(this.functionName);

        if (!funSym) {
            return null; // semantic analysis will log this diagnostic
        }

        // the method invocation symbol will have the call arguments
        const methodInvok = this.methodInvocation;
        if (!(methodInvok instanceof MethodInvocationSymbol))
            console.warn("expected a method invocation", this.name);

        // evaluate the argumnents
        const argVals = methodInvok.getArguments().map((a) => a.eval(stack));

        // create a new root frame for this object
        // this doesn't need to go on the stack, it's just a temporary frame
        const rootFrame = new StackFrame(
            symTbl,
            new Map<string, any>(),
            new Map<string, any>()
        );
        const stackFrame = new StackFrame(
            funSym,
            new Map<string, any>(),
            new Map<string, any>(),
            rootFrame
        );
        stack.push(stackFrame);

        const result = funSym.eval(stack, argVals);

        stack.pop();
        return result;
    }
}
