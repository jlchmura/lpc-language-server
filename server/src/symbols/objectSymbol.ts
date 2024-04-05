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
import { CallStack, StackFrame, StackValue } from "../backend/CallStack";
import { ArrowSymbol } from "./arrowSymbol";

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

    public relativeFileName: string;

    constructor(name: string, public filename?: string) {
        super(name);
    }

    eval(stack: CallStack) {
        // first evaluate the filename

        // TODO: use call stack here
        let filename = "";
        let evalResult: string | StackValue;
        for (const child of this.children) {
            if (isInstanceOfIEvaluatableSymbol(child)) {
                evalResult = child.eval(stack, filename);
            } else {
                throw "not evaluable";
            }
        }

        if (evalResult instanceof StackValue) {
            filename = evalResult.value;
        } else {
            filename = evalResult;
        }

        this.relativeFileName = filename;

        // try to load the source context and store the info in this symbol
        const backend = (this.symbolTable as ContextSymbolTable).owner.backend;
        this.filename = normalizeFilename(
            backend.filenameToAbsolutePath(filename)
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
            const ownerContext = (this.symbolTable as ContextSymbolTable).owner;
            const backend = ownerContext.backend;

            this.sourceContext = backend.loadLpc(this.filename);

            if (!!this.sourceContext) {
                this.isLoaded = true;
                // add a reference to the owner context so that diagnostics
                // will update when we make modificatinos to the source file
                ownerContext.addAsReferenceTo(this.sourceContext);
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
export class CallOtherSymbol extends ArrowSymbol {}
