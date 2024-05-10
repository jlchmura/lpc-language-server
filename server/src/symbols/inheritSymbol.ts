import { ScopedSymbol, SymbolTable } from "antlr4-c3";
import {
    IEvaluatableSymbol,
    LpcBaseSymbol,
    getSymbolsOfTypeSync,
    isInstanceOfIEvaluatableSymbol,
} from "./base";

import { SourceContext } from "../backend/SourceContext";
import { LpcTypes, SymbolKind } from "../types";
import { InheritStatementContext } from "../parser3/LPCParser";
import { CallStack, StackValue } from "../backend/CallStack";
import { ContextSymbolTable } from "../backend/ContextSymbolTable";
import { firstEntry, normalizeFilename, rangeFromTokens } from "../utils";
import { addDiagnostic } from "./Symbol";
import { ParserRuleContext } from "antlr4ng";
import { DiagnosticSeverity } from "vscode-languageserver";

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

    constructor(name: string, public filename: string) {
        super(name);
    }

    eval(stack: CallStack, scope?: any) {
        if (
            !this.filename ||
            this.filename.length == 0 ||
            this.filename.startsWith("*")
        ) {
            // if there is no filename, we have to find the inherit symbol that this accessor is attached to
            // and use the first one.  (this technically allows a glob pattern)
            // get the root symbol table

            // NTBLA this is incorrect. need to search all inherits for the first one that has this symbol
            // but exclude the current doc's symbol table

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
            const depTables = inheritSymbols.map((inheritSymbol) => {
                const ctx = this.loadObject(inheritSymbol.filename);
                const tbl = ctx.symbolTable as ContextSymbolTable;
                return tbl;
            });

            this.objSymbolTable.addDependencies(...depTables);
        } else if (this.filename == "efun") {
            this.objSymbolTable = SourceContext.efunSymbols;
        } else {
            this.objContext = this.loadObject(this.filename);
            this.objSymbolTable = this.objContext
                .symbolTable as ContextSymbolTable;
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
        // get access to the backend
        const ownerContext = (this.symbolTable as ContextSymbolTable).owner;
        const backend = ownerContext.backend;

        // load context for this arrow's object symbol
        const sourceContext = backend.loadLpc(
            normalizeFilename(backend.filenameToAbsolutePath(filename))
        );
        if (!sourceContext) {
            const ctx = this.context as ParserRuleContext;
            addDiagnostic(this, {
                message: "could not load source for: " + filename,
                range: rangeFromTokens(ctx.start, ctx.stop),
                type: DiagnosticSeverity.Warning,
            });
        }
        return sourceContext;
    }
}
