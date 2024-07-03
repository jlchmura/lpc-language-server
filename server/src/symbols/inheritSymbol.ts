import { BaseSymbol, ScopedSymbol, SymbolTable } from "antlr4-c3";
import {
    IEvaluatableSymbol,
    IReferenceSymbol,
    LpcBaseSymbol,
    getSymbolsOfTypeSync,
    isInstanceOfIEvaluatableSymbol,
} from "./base";

import { SourceContext } from "../backend/SourceContext";
import { DiagnosticCodes, LpcTypes, SymbolKind } from "../types";
import { InheritStatementContext } from "../parser3/LPCParser";
import { CallStack, StackValue } from "../backend/CallStack";
import { ContextSymbolTable } from "../backend/ContextSymbolTable";
import { firstEntry, normalizeFilename, rangeFromTokens } from "../utils";
import { addDiagnostic } from "./Symbol";
import { ParserRuleContext } from "antlr4ng";
import { DiagnosticSeverity } from "vscode-languageserver";
import { LpcFileHandler } from "../backend/FileHandler";
import { getDriverInfo } from "../driver/Driver";
import {
    addDependenciesToStack,
    addPogramToStack,
} from "../backend/CallStackUtils";

export class InheritSymbol
    extends LpcBaseSymbol<InheritStatementContext>
    implements IEvaluatableSymbol
{
    public isLoaded = false;

    constructor(name: string, public filename: string) {
        super(name);
    }

    public get kind() {
        return SymbolKind.Inherit;
    }

    eval(stack: CallStack, scope?: any) {
        return scope;
    }
}

export class InheritSuperAccessorSymbol
    extends ScopedSymbol
    implements IEvaluatableSymbol
{
    public objSymbolTable: ContextSymbolTable;

    public get kind() {
        return SymbolKind.InheritSuperAccessor;
    }

    constructor(
        name: string,
        public filename: string,
        private fileHandler: LpcFileHandler
    ) {
        super(name);
    }

    eval(stack: CallStack, scope?: any) {
        const tablesToUse: ContextSymbolTable[] = [];
        if (this.filename == "efun") {
            const driver = getDriverInfo();
            tablesToUse.push(driver.efuns);
        } else {
            // if there is no filename, we have to find the inherit symbol that this accessor is attached to
            // and use the first one.  (this technically allows a glob pattern)
            // get the root symbol table

            const tbl = this.symbolTable;
            const inheritSymbols = getSymbolsOfTypeSync(
                tbl,
                InheritSymbol,
                false
            );

            // loop through inheritSymbols, load their contexts and add their symbol tables
            // as dependencies to this symbol table
            let inheritsToAdd =
                !this.filename || this.filename.startsWith("*")
                    ? inheritSymbols
                    : inheritSymbols.filter((i) =>
                          i.name.endsWith(this.filename)
                      );

            const depTables = inheritsToAdd
                .map((inheritSymbol) => {
                    const ctx = this.loadObject(inheritSymbol.filename);
                    const tbl = ctx?.symbolTable as ContextSymbolTable;
                    return tbl;
                })
                .filter((tbl) => !!tbl);

            tablesToUse.push(...depTables);
        }

        // create a new root frame for this object
        // this doesn't need to go on the stack, it's just a temporary frame
        const myStack = new CallStack(this);
        const rootFrame = myStack.root;

        // since we have a new root frame, we need to add the functions for the arrow's program
        // NTBLA: create the root frame in the source context so taht funs don't have to be re-added every time

        // after new root frame is on the stack, add the arrow's program to the stack
        const driver = getDriverInfo();
        addPogramToStack(driver.efuns, myStack);
        tablesToUse.forEach((tbl) => {
            addDependenciesToStack(this.fileHandler, tbl, myStack);
            addPogramToStack(tbl, myStack);
        });

        // evaluate children
        for (const symbol of this.children) {
            if (isInstanceOfIEvaluatableSymbol(symbol)) {
                symbol.eval(stack, rootFrame);
            }
        }

        this.objSymbolTable = new ContextSymbolTable(
            "inherit-" + this.name,
            {
                allowDuplicateSymbols: true,
            },
            (this.symbolTable as ContextSymbolTable).owner
        );
        tablesToUse.forEach((tbl) => {
            this.objSymbolTable.addDependencies(tbl);
        });

        return scope;
    }

    loadObject(filename: string) {
        // load context for this arrow's object symbol
        const sourceContext = this.fileHandler.loadReference(filename);
        if (!sourceContext) {
            const ctx = this.context as ParserRuleContext;
            addDiagnostic(this, {
                message: "could not load source for: " + filename,
                range: rangeFromTokens(ctx.start, ctx.stop),
                type: DiagnosticSeverity.Warning,
                code: DiagnosticCodes.ObjectNotFound,
            });
        }
        return sourceContext;
    }
}
