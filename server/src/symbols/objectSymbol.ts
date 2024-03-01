import { IType, ScopedSymbol } from "antlr4-c3";
import {
    IEvaluatableSymbol,
    getSymbolsOfTypeSync,
    isInstanceOfIEvaluatableSymbol,
} from "./base";
import { IdentifierSymbol } from "./Symbol";
import { firstEntry } from "../utils";
import { LiteralSymbol } from "./literalSymbol";
import { MethodInvocationSymbol } from "./methodSymbol";

export type ObjectReferenceInfo = {
    filename: string;
    isLoaded: boolean;
};

export class CloneObjectSymbol
    extends ScopedSymbol
    implements IEvaluatableSymbol
{
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
        filename = "obj:" + filename;
        this.filename = filename;
        return { filename, isLoaded: false } as ObjectReferenceInfo;
    }
}

export class CallOtherSymbol
    extends ScopedSymbol
    implements IEvaluatableSymbol
{
    constructor(name: string, public functionName?: string) {
        super(name);
    }

    eval() {
        const idSym = firstEntry(getSymbolsOfTypeSync(this, IdentifierSymbol));
        this.functionName = idSym?.name;

        //    if (!this.functionName) {
        //        const strSym = firstEntry(getSymbolsOfTypeSync(this, LiteralSymbol));
        //        this.functionName = strSym?.value;
        //    }

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
        const funSym = this.resolveSync(
            this.functionName,
            false
        ) as IEvaluatableSymbol;
        if (!funSym) {
            throw "could not resolve function: " + this.functionName;
        }

        // the sibling +1 should be the method invocation
        const methodInvok = this.nextSibling as MethodInvocationSymbol;
        if (!(methodInvok instanceof MethodInvocationSymbol))
            throw "expected a method invocation";

        // evaluate the argumnents
        const argVals = methodInvok.getArguments().map((a) => {
            a.eval();
        });

        funSym.eval(argVals);

        // also need to get params from method invok symbol
        return this.functionName;
    }
}
