import { ScopedSymbol } from "antlr4-c3";
import { CallStack, StackValue } from "./CallStack";
import { LpcBaseMethodSymbol } from "../symbols/methodSymbol";
import { VariableSymbol } from "../symbols/variableSymbol";
import { isInstanceOfIEvaluatableSymbol } from "../symbols/base";
import { ContextSymbolTable } from "./ContextSymbolTable";
import { LpcFileHandler } from "./FileHandler";
import { LpcTypes } from "../types";

export function addPogramToStack(progSymbol: ScopedSymbol, stack: CallStack) {
    for (const child of progSymbol.children) {
        // put each child on the stack.  Evaluate variables as go.
        // we'll come back and evaluate methods later.
        if (child instanceof LpcBaseMethodSymbol) {
            stack.addFunction(child.name, child);
        }
        // else if (
        //     child instanceof LpcBaseMethodSymbol &&
        //     !stack.doesFunctionExist(child.name)
        // ) {
        //     // add the method to the stack, but only if an actual method definition doesn't already exist
        //     stack.addFunction(child.name, child);
        // }
        else {
            if (child instanceof VariableSymbol) {
                stack.addLocal(
                    child.name,
                    new StackValue(undefined, LpcTypes.unknownType, child)
                );
                //const result = child.eval(stack);
            } else if (isInstanceOfIEvaluatableSymbol(child)) {
                //const result = child.eval(stack);
            } else {
                console.debug("node not evaluable: " + child.name);
            }
        }
    }
}

export function addDependenciesToStack(
    fileHandler: LpcFileHandler,
    program: ContextSymbolTable,
    stack: CallStack
) {
    const processed = new Set<string>();
    const imports = fileHandler.getDependencies(program.owner.fileName) ?? [];

    while (imports.length > 0) {
        const importCtx = imports.shift();
        const importFilename = importCtx.fileName;
        if (!!importCtx && !processed.has(importFilename)) {
            processed.add(importFilename);

            const importTbl = importCtx.symbolTable;
            addPogramToStack(importTbl, stack);

            imports.push(
                ...(fileHandler.getDependencies(importFilename) ?? [])
            );
        }
    }
}
