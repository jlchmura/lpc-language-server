import {
    BaseSymbol,
    IType,
    MemberVisibility,
    ScopedSymbol,
    TypedSymbol,
    VariableSymbol,
} from "antlr4-c3";
import { getSymbolsOfTypeSync } from "../symbols/base";
import { DefineSymbol } from "../symbols/defineSymbol";
import { LpcTypes } from "../types";
import { MethodSymbol } from "../symbols/methodSymbol";

export class StackValue {
    constructor(
        public value: any,
        public type: IType,
        public symbol: BaseSymbol
    ) {}
}

class StackBase {
    public returnValue: StackValue;

    constructor(
        public readonly symbol: ScopedSymbol,
        protected locals: Map<string, StackValue>
    ) {}
}

export class CallStack extends StackBase {
    private readonly stack: StackFrame[] = [];
    private readonly rootFrame: StackFrame;

    public get root() {
        return this.rootFrame;
    }

    constructor(symbol: ScopedSymbol) {
        super(symbol, new Map<string, StackValue>());

        this.rootFrame = new StackFrame(
            symbol,
            new Map<string, StackValue>(),
            new Map<string, StackValue>()
        );
        this.push(this.rootFrame);
    }

    public push(frame: StackFrame) {
        this.stack.push(frame);
    }

    public pop() {
        return this.stack.pop();
    }

    public peek() {
        return this.stack[this.stack.length - 1];
    }

    public get length() {
        return this.stack.length;
    }

    /** add a function to the call stack */
    public addFunction(name: string, value: MethodSymbol) {
        this.stack[0].locals.set(
            name,
            new StackValue(value, value.returnType, value)
        );
    }

    /** get a function */
    public getFunction(name: string): MethodSymbol {
        // functions always exist in the root
        const local = this.stack[0].locals.get(name);
        if (local.symbol instanceof MethodSymbol) {
            return local.symbol;
        } else {
            throw "Function " + name + " not found in stack";
        }
    }

    public addLocal(name: string, value: StackValue) {
        this.peek().locals.set(name, value);
    }

    /**
     * stores a value in the stack.
     * @param name
     * @param value
     * @returns
     */
    public storeValue(name: string, value: any) {
        for (let i = this.stack.length - 1; i >= 0; i--) {
            const frame = this.stack[i];
            if (frame.locals.has(name)) {
                frame.locals.set(
                    name,
                    new StackValue(
                        value,
                        frame.locals.get(name).type,
                        frame.locals.get(name).symbol
                    )
                );
                return;
            }
        }

        throw "Variable " + name + " not found in stack";
    }

    public setReturnValue(value: any, sym: BaseSymbol) {
        let type = LpcTypes.mixedType;
        if (sym instanceof TypedSymbol) {
            type = sym.type;
        }
        this.returnValue = new StackValue(value, type, sym);
    }

    public getValue(name: string): any {
        for (let i = this.stack.length - 1; i >= 0; i--) {
            const frame = this.stack[i];
            if (frame.locals.has(name)) {
                return frame.locals.get(name).value;
            }
        }

        throw "Variable " + name + " not found in stack";
    }
}

/**
 * Represents a stack frame in the call stack for the LPC program
 */
export class StackFrame extends StackBase {
    public returnValue: any;

    constructor(
        symbol: ScopedSymbol,
        args: Map<string, StackValue>,
        public locals: Map<string, StackValue>
    ) {
        super(symbol, locals);
    }
}
