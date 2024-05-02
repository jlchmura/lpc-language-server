import { ScopedSymbol } from "antlr4-c3";
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
            const tbl = this.symbolTable;
            const inheritSymbol = firstEntry(
                getSymbolsOfTypeSync(tbl, InheritSymbol)
            );
            if (!!inheritSymbol?.filename) {
                this.objContext = this.loadObject(inheritSymbol.filename);
                this.objSymbolTable = this.objContext
                    .symbolTable as ContextSymbolTable;
            } else {
                // ntbla add diags
            }
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
