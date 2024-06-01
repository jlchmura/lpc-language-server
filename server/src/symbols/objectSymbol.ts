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
import { LpcFileHandler } from "../backend/FileHandler";

export class ObjectReferenceInfo {
    constructor(
        public filename?: string,
        public isLoaded?: boolean,
        public context?: SourceContext
    ) {}

    toString() {
        return `${this.filename}:${this.isLoaded}`;
    }
}

export class CloneObjectSymbol
    extends ScopedSymbol
    implements IEvaluatableSymbol
{
    public isLoaded = false;
    private sourceContext: SourceContext;

    public relativeFileName: string;
    public filename?: string;

    constructor(name: string, private fileHandler: LpcFileHandler) {
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
            const ctx = this.context as ParserRuleContext;

            if (!this.filename) {
                addDiagnostic(this, {
                    message: "Unable to resolve filename",
                    range: rangeFromTokens(ctx.start, ctx.stop),
                    type: DiagnosticSeverity.Information,
                });
            } else {
                this.sourceContext = this.fileHandler.loadReference(
                    this.filename,
                    this
                );

                if (!!this.sourceContext) {
                    this.isLoaded = true;
                } else {
                    addDiagnostic(this, {
                        message: "could not load source for: " + this.filename,
                        range: rangeFromTokens(ctx.start, ctx.stop),
                        type: DiagnosticSeverity.Warning,
                    });
                }
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
