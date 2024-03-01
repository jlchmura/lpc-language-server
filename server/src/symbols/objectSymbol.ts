import { BaseSymbol, IType, ScopedSymbol } from "antlr4-c3";
import {
    IEvaluatableSymbol,
    getSymbolsOfTypeSync,
    isInstanceOfIEvaluatableSymbol,
} from "./base";
import { IdentifierSymbol } from "./Symbol";
import { firstEntry } from "../utils";
import { LiteralSymbol } from "./literalSymbol";
import { MethodInvocationSymbol } from "./methodSymbol";
import { ContextSymbolTable } from "../backend/ContextSymbolTable";
import { SourceContext } from "../backend/SourceContext";

export class ObjectReferenceInfo {
    filename: string;
    isLoaded: boolean;
    context: SourceContext;
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

    eval() {
        let filename = "";
        for (const child of this.children) {
            if (isInstanceOfIEvaluatableSymbol(child)) {
                filename = child.eval(filename);
            } else {
                throw "not evaluable";
            }
        }
        this.filename = filename;

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
            this.isLoaded = true;
        }
    }

    override resolveSync(name: string, localOnly?: boolean): BaseSymbol {
        // intercept the resolve and resolve only from this objects source context
        if (!this.isLoaded) {
            const backend = (this.symbolTable as ContextSymbolTable).owner
                .backend;
            this.sourceContext = backend.loadLpc(this.filename);
        }

        return this.sourceContext.resolveSymbol(name);
    }
}

export class CallOtherSymbol
    extends ScopedSymbol
    implements IEvaluatableSymbol
{
    constructor(name: string, public functionName?: string) {
        super(name);
    }

    eval(obj: any) {
        if (!(obj instanceof ObjectReferenceInfo)) {
            throw "expected object reference info";
        }

        // this will handle expressions & string literals
        if (!this.functionName) {
            for (const child of this.children) {
                if (isInstanceOfIEvaluatableSymbol(child)) {
                    this.functionName = child.eval();
                } else {
                    throw "not evaluable: " + child.name;
                }
            }
        }

        if (!this.functionName) {
            throw "could not determine function name for arrow: " + this.name;
        }

        // at this point we've figured out the function name and now need to find the actual function.
        const symTbl = (obj as ObjectReferenceInfo).context.symbolTable;
        const funSym = symTbl.resolveSync(
            this.functionName,
            false
        ) as IEvaluatableSymbol;
        if (!funSym) {
            throw "could not resolve function: " + this.functionName;
        }

        // the next sibling should be the method invocation
        const methodInvok = this.nextSibling as MethodInvocationSymbol;
        if (!(methodInvok instanceof MethodInvocationSymbol))
            throw "expected a method invocation";

        // evaluate the argumnents
        const argVals = methodInvok.getArguments().map((a) => {
            a.eval();
        });

        return funSym.eval(argVals);
    }
}
