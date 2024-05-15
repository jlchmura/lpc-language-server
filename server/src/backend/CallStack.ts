import {
    BaseSymbol,
    IType,
    MemberVisibility,
    ScopedSymbol,
    TypedSymbol,
    VariableSymbol as VariableSymbolBase,
} from "antlr4-c3";
import { LpcTypes } from "../types";
import { LpcBaseMethodSymbol, MethodSymbol } from "../symbols/methodSymbol";
import { ParserRuleContext } from "antlr4ng";
import { ContextSymbolTable } from "./ContextSymbolTable";

export class StackValue<T = any> {
    constructor(
        public value: T,
        public type: IType,
        public symbol: BaseSymbol
    ) {}
}

let lastExecId = 1;
export class CallStack {
    private readonly stack: StackFrame[] = [];
    private readonly rootFrame: StackFrame;

    public executionId: number;

    public get root() {
        return this.rootFrame;
    }

    constructor(public readonly symbol: ScopedSymbol) {
        //super(symbol, new Map<string, StackValue>());
        this.executionId = lastExecId++;
        this.rootFrame = new RootFrame(
            symbol,
            new Map<string, StackValue>(),
            new Map<string, StackValue>()
        );

        // push directly so a parent doesn't get assigned
        this.stack.push(this.rootFrame);
    }

    public push(frame: StackFrame) {
        // if the frame did not have a program assigned, then assign the root frame
        if (!frame.parent) frame.parent = this.rootFrame;
        this.stack.push(frame);
    }

    public pop() {
        return this.stack.pop();
    }

    public peek(offset: number = 1) {
        return this.stack[this.stack.length - offset];
    }

    public get length() {
        return this.stack.length;
    }

    public getStackTrace() {
        const stack = [...this.stack].reverse();
        const lines = stack.map((frame) => {
            const symbol = frame.symbol;
            const name = symbol.name;
            const filename = (symbol.symbolTable as ContextSymbolTable).owner
                ?.fileName;
            const token = (symbol.context as ParserRuleContext)?.start;
            return `${name} at ${filename}:${token?.line}:${token?.column}`;
        });
        return lines;
    }

    /** add a function to the call stack */
    public addFunction(name: string, value: MethodSymbol) {
        addFunctionToFrame(this.getCurrentRoot(), name, value);
    }

    public getCurrentRoot() {
        let frame = this.peek();

        while (!!frame) {
            if (!frame.parent) return frame as RootFrame;
            frame = frame.parent;
        }

        throw "No root frame found in stack";
    }

    public doesFunctionExist(name: string): boolean {
        const rootFrame = this.getCurrentRoot();
        return (
            rootFrame.locals.has(name) &&
            rootFrame.locals.get(name).value instanceof LpcBaseMethodSymbol
        );
    }

    /** get a function */
    public getFunction(name: string): MethodSymbol {
        return getFunctionFromFrame(this.getCurrentRoot(), name);
    }

    public addLocal(name: string, value: StackValue) {
        this.peek().addValue(name, value);
    }

    /**
     * stores a value in the stack.
     * @param name
     * @param value
     * @returns
     */
    public storeValue(name: string, value: any) {
        const result = this.walkStackToProgram((frame) => {
            if (frame.locals.has(name)) {
                frame.locals.set(
                    name,
                    new StackValue(
                        value,
                        frame.locals.get(name).type,
                        frame.locals.get(name).symbol
                    )
                );
                return true;
            }
        });

        if (!result) {
            throw "Variable " + name + " not found in stack";
        }
    }

    protected walkStackToProgram<T>(
        action: (frame: StackFrame) => T | undefined
    ) {
        return walkStackToProgram(this.peek(), action);
    }

    public setReturnValue(value: any, sym: BaseSymbol) {
        if (value instanceof StackValue) {
            this.peek().returnValue = value;
        } else {
            let type = LpcTypes.mixedType;
            if (sym instanceof TypedSymbol) {
                type = sym.type;
            }
            this.peek().returnValue = new StackValue(value, type, sym);
        }
    }

    public clearValue(name: string) {
        const result = this.peek().clearValue(name);
        return result;
    }

    public getValue<T>(name: string): StackValue {
        const result = this.peek().getValue<T>(name);
        return result;
    }

    public isCallerInStack(symbol: BaseSymbol): boolean {
        return (
            walkStackToProgram(this.peek(2), (frame) => {
                return frame.symbol.name === symbol.name;
            }) || false
        );
    }
}

/**
 * Represents a stack frame in the call stack for the LPC program
 */
export class StackFrame {
    public returnValue: StackValue;

    private lookupCache: Map<string, StackValue> = new Map();

    constructor(
        public symbol: ScopedSymbol,
        public args: Map<string, StackValue>,
        public locals: Map<string, StackValue>,
        public parent: StackFrame = null
    ) {
        //super(symbol, locals);
    }

    public addValue(name: string, value: StackValue) {
        this.lookupCache.delete(name);
        this.locals.set(name, value);
    }

    public getValue<T>(name: string): StackValue {
        if (this.lookupCache.has(name)) {
            return this.lookupCache.get(name);
        }

        const result = walkStackToProgram(this, (frame) => {
            if (frame.locals.has(name)) {
                return frame.locals.get(name) as StackValue<T>;
            }
        });

        this.lookupCache.set(name, result);

        if (!result) {
            console.warn("Variable " + name + " not found in stack");
        }
        return result;
    }

    public clearValue(name: string) {
        this.lookupCache.delete(name);

        const result = walkStackToProgram(this, (frame) => {
            if (frame.locals.has(name)) {
                frame.locals.delete(name);
                return true;
            }
        });

        return false;
    }
}

export class RootFrame extends StackFrame {}

export function addFunctionToFrame(
    frame: RootFrame,
    name: string,
    value: MethodSymbol
) {
    frame.locals.set(name, new StackValue(value, value.returnType, value));
}

export function walkStackToProgram<T>(
    frame: StackFrame,
    action: (frame: StackFrame) => T | undefined
) {
    let f = frame;
    while (!!f) {
        const result = action(f);
        if (result) return result;
        f = f.parent;
    }
    return undefined;
}

export function getFunctionFromFrame(
    frame: RootFrame,
    name: string
): MethodSymbol {
    const local = frame.locals.get(name);
    if (local?.symbol instanceof LpcBaseMethodSymbol) {
        return local.symbol;
    } else {
        // TODO: send to diag?
        console.warn("Function " + name + " not found in stack");
    }
}
