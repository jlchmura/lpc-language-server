import {
    BaseSymbol,
    IType,
    ScopedSymbol,
    TypedSymbol,
    VariableSymbol as VariableSymbolBase,
} from "antlr4-c3";
import { LpcTypes } from "../types";
import { LpcBaseMethodSymbol, MethodSymbol } from "../symbols/methodSymbol";
import { ParserRuleContext } from "antlr4ng";
import { ContextSymbolTable } from "./ContextSymbolTable";
import { asStackValue } from "./CallStackUtils";

export class StackValue<T = any> {
    constructor(
        public value: T,
        public type: IType,
        public symbol: BaseSymbol
    ) {}

    execConditional(operator: string, rhs: StackValue): StackValue {
        const rhsVal = rhs?.value;
        const lhsVal = this.value as any;
        switch (operator) {
            case "==":
                return asStackValue(
                    lhsVal == rhsVal,
                    LpcTypes.intType,
                    this.symbol
                );
            case "!=":
                return asStackValue(
                    lhsVal != rhsVal,
                    LpcTypes.intType,
                    this.symbol
                );
            case "<":
                return asStackValue(
                    lhsVal < rhsVal,
                    LpcTypes.intType,
                    this.symbol
                );
            case ">":
                return asStackValue(
                    lhsVal > rhsVal,
                    LpcTypes.intType,
                    this.symbol
                );
            case "<=":
                return asStackValue(
                    lhsVal <= rhsVal,
                    LpcTypes.intType,
                    this.symbol
                );
            case ">=":
                return asStackValue(
                    lhsVal >= rhsVal,
                    LpcTypes.intType,
                    this.symbol
                );
            case "|":
                return asStackValue(
                    lhsVal | rhsVal,
                    LpcTypes.intType,
                    this.symbol
                );
            case "&":
                return asStackValue(
                    lhsVal & rhsVal,
                    LpcTypes.intType,
                    this.symbol
                );
            case "&&":
                return asStackValue(
                    lhsVal && rhsVal,
                    LpcTypes.intType,
                    this.symbol
                );
            case "||":
                return asStackValue(
                    lhsVal || rhsVal,
                    LpcTypes.intType,
                    this.symbol
                );
            case "^":
                return asStackValue(
                    lhsVal ^ rhsVal,
                    LpcTypes.intType,
                    this.symbol
                );
            case "in":
                return asStackValue(1, LpcTypes.intType, this.symbol);
            case "?":
                return asStackValue(
                    lhsVal ? rhsVal : undefined,
                    this.type,
                    this.symbol
                );
            default:
                console.warn("Unsupported operator [" + operator + "]", this);
        }

        return this;
    }

    execOp(operator: string, rhs: StackValue): StackValue {
        const rhsVal = rhs?.value;
        switch (operator) {
            case "+":
                return asStackValue(
                    this.value + rhsVal,
                    this.type,
                    this.symbol
                );
            case "!":
                return asStackValue(!rhsVal, this.type, this.symbol);
            case ",":
                return asStackValue(rhsVal, rhs?.type, this.symbol);
            // default:
            //     console.warn("Unsupported operator [" + operator + "]", this);
        }

        return this;
    }

    bracket(index: number): StackValue {
        switch (typeof this.value) {
            case "string":
                return new StackValue(
                    this.value[index],
                    LpcTypes.stringType,
                    this.symbol
                );
            default:
                return asStackValue(
                    this.value,
                    LpcTypes.unknownType,
                    this.symbol
                );
        }
    }
}

export class NumericStackValue extends StackValue<number> {
    override execOp(
        operator: string,
        rhs: NumericStackValue
    ): NumericStackValue {
        const rhsVal = rhs?.value;
        switch (operator) {
            case "+":
                return new NumericStackValue(
                    this.value + rhsVal,
                    this.type,
                    this.symbol
                );
            case "-":
                return new NumericStackValue(
                    this.value - rhsVal,
                    this.type,
                    this.symbol
                );
            case "*":
                return new NumericStackValue(
                    this.value * rhsVal,
                    this.type,
                    this.symbol
                );
            case "/":
                return new NumericStackValue(
                    this.value / rhsVal,
                    this.type,
                    this.symbol
                );
            case "%":
                return new NumericStackValue(
                    this.value % rhsVal,
                    this.type,
                    this.symbol
                );
            case "^":
                return new NumericStackValue(
                    this.value ^ rhsVal,
                    this.type,
                    this.symbol
                );
            case "&":
            case "|":
            case "~":
                return new NumericStackValue(
                    this.value | rhsVal,
                    this.type,
                    this.symbol
                );
            case "<<":
                return new NumericStackValue(
                    this.value << 1,
                    this.type,
                    this.symbol
                );
            case ">>":
                return new NumericStackValue(
                    this.value >> 1,
                    this.type,
                    this.symbol
                );
            case "--":
                return new NumericStackValue(
                    this.value--,
                    this.type,
                    this.symbol
                );
            case "++":
                return new NumericStackValue(
                    this.value++,
                    this.type,
                    this.symbol
                );
            default:
                return super.execOp(operator, rhs);
        }
    }
}

export class ArrayStackValue<T = any> extends StackValue<StackValue<T>[]> {
    constructor(values: StackValue<T>[], type: IType, symbol: BaseSymbol) {
        super(values, type, symbol);
    }

    override execOp(
        operator: string,
        rhs: ArrayStackValue<T>
    ): ArrayStackValue<T> {
        const rhsVal = rhs?.value ?? [];
        switch (operator) {
            case "+":
                return new ArrayStackValue(
                    this.value.concat(rhsVal),
                    this.type,
                    this.symbol
                );
            case "-":
                const rhSet = new Set(rhsVal.map((v) => v.value));
                return new ArrayStackValue(
                    this.value.filter((v) => !rhSet.has(v.value)),
                    this.type,
                    this.symbol
                );
            default:
                return super.execOp(operator, rhs);
        }
    }

    bracket(index: number): StackValue {
        return this.value[index];
    }
}

let lastExecId = 1;
export class CallStack {
    private readonly stack: StackFrame[] = [];
    private rootFrame: StackFrame;

    public executionId: number;
    public diagnosticMode: boolean = true;

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

    private getRootForFrame(frame: StackFrame) {
        return walkStackToProgram(frame, (f) =>
            f instanceof RootFrame ? f : undefined
        );
    }

    public push(frame: StackFrame) {
        // if the frame did not have a program assigned, then assign the root frame
        if (!frame.parent) frame.parent = this.rootFrame;
        else {
            const root = this.getRootForFrame(frame);
            if (!!root) {
                this.rootFrame = root;
            }
        }
        this.stack.push(frame);
    }

    public pop() {
        const poppedFrame = this.stack.pop();
        const root = this.getRootForFrame(this.peek());
        if (!!root) {
            this.rootFrame = root;
        }
        return poppedFrame;
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
        // if (name == "call_other" && !(value.symbol instanceof EfunSymbol)) {
        //     const i = 0;
        // }
        return this.peek().addValue(name, value);
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
                    asStackValue(
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
            this.peek().returnValue = asStackValue(value, type, sym);
        }
    }

    public clearValue(name: string) {
        const result = this.peek().clearValue(name);
        return result;
    }

    /**
     * Get a value from the stack
     * @param name Name of the value to get
     * @param symbol Symbol requesting the value
     * @returns
     */
    public getValue<T>(name: string, symbol: BaseSymbol): StackValue {
        const result = this.peek().getValue<T>(name, symbol);
        return result;
    }

    public isCallerInStack(symbol: BaseSymbol): boolean {
        for (let i = this.stack.length - 2; i >= 0; i--) {
            if (this.stack[i].symbol.name === symbol.name) {
                return true;
            }
        }

        return false;
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
        return value;
    }

    /**
     * Get a value from the stack
     * @param name the name of the value to get
     * @param symbol the symbol that is requesting the value
     */
    public getValue<T>(name: string, symbol: BaseSymbol): StackValue {
        let val: StackValue;
        if (this.lookupCache.has(name)) {
            val = this.lookupCache.get(name);
            return val;
        }

        const result = walkStackToProgram(this, (frame) => {
            if (frame.locals.has(name)) {
                return frame.locals.get(name) as StackValue<T>;
            }
        });

        this.lookupCache.set(name, result);

        // if (!result) {
        //     const ctx = symbol.context as ParserRuleContext;
        //     const owner = symbol.symbolTable.name;
        //     const str = `Variable ${name} not found in stack; ${owner} at ${ctx.start.line}:${ctx.start.column}`;
        //     console.warn(str);
        // }
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
    frame.locals.set(name, asStackValue(value, value.returnType, value));
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
    const local = walkStackToProgram(frame, (f) => {
        return f.locals?.get(name);
    });

    if (local?.symbol instanceof LpcBaseMethodSymbol) {
        return local.symbol;
    } else {
        // TODO: send to diag?
        //console.warn("Function " + name + " not found in stack");
    }
}
