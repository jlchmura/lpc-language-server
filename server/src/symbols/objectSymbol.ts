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

export class CallOtherSymbol
    extends ScopedSymbol
    implements IEvaluatableSymbol
{
    public objectRef: ObjectReferenceInfo;

    constructor(name: string, public functionName?: string) {
        super(name);
    }

    eval(stack: CallStack, obj: any) {
        if (!(obj instanceof ObjectReferenceInfo)) {
            // TODO report this as a diagnostic?
            return undefined;
        }

        // store for later
        this.objectRef = obj;

        // this will handle expressions & string literals
        if (!this.functionName) {
            for (const child of this.children) {
                if (isInstanceOfIEvaluatableSymbol(child)) {
                    this.functionName = child.eval(stack);
                } else {
                    throw "not evaluable: " + child.name;
                }
            }
        }

        if (!this.functionName) {
            // TODO send via diagnostic?
            console.warn(
                "could not determine function name for arrow: " + this.name
            );
        }

        // at this point we've figured out the function name and now need to find the actual function.
        const symTbl = (obj as ObjectReferenceInfo).context?.symbolTable;
        const funSym = symTbl?.resolveSync(
            this.functionName,
            false
        ) as MethodSymbol;

        if (!funSym) {
            return null; // semantic analysis will log this diagnostic
        }

        // the next sibling should be the method invocation
        const methodInvok = this.children[0] as MethodInvocationSymbol;
        if (!(methodInvok instanceof MethodInvocationSymbol))
            throw "expected a method invocation";

        // evaluate the argumnents
        const argVals = methodInvok.getArguments().map((a) => {
            return a.eval(stack);
        });

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
