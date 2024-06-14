import { ScopedSymbol, SymbolTable } from "antlr4-c3";
import {
    IEvaluatableSymbol,
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
    public objContext: SourceContext;
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
        if (this.filename == "efun") {
            this.objSymbolTable = SourceContext.efunSymbols;
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
            this.objSymbolTable = new ContextSymbolTable(
                `inherit-${this.filename}`,
                {}
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

            this.objSymbolTable.addDependencies(...depTables);
        }

        // evaluate children
        for (const symbol of this.children) {
            if (isInstanceOfIEvaluatableSymbol(symbol)) {
                symbol.eval(stack, scope);
            }
        }

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
