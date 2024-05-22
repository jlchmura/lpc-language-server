import { DiagnosticSeverity } from "vscode-languageserver";
import { CallStack } from "../backend/CallStack";
import { ContextSymbolTable } from "../backend/ContextSymbolTable";

import { SymbolKind } from "../types";
import { rangeFromTokens } from "../utils";
import { addDiagnostic } from "./Symbol";
import { IEvaluatableSymbol, LpcBaseSymbol } from "./base";
import { ParserRuleContext } from "antlr4ng";
import { IncludePreprocessorDirectiveContext } from "../parser3/LPCParser";

export class IncludeSymbol
    extends LpcBaseSymbol<IncludePreprocessorDirectiveContext>
    implements IEvaluatableSymbol
{
    public isLoaded = false;

    public get kind() {
        return SymbolKind.Include;
    }

    private _filename: string;
    private _fullpath: string;

    /** the normalized filename for this include */
    public get filename() {
        if (!this._filename) {
            this.resolveFilename();
        }
        return this._filename;
    }

    /**
     * the full path to the file for this include
     */
    public get fullPath() {
        if (!this._fullpath) {
            this.resolveFilename();
        }
        return this._fullpath;
    }

    private resolveFilename() {
        const fileInfo = (
            this.symbolTable as ContextSymbolTable
        ).owner.resolveFilename(this.name);
        this._filename = fileInfo.filename;
        this._fullpath = fileInfo?.fullPath || fileInfo.filename;
    }

    eval(stack: CallStack, scope?: any) {
        if (!this.isLoaded) {
            const ctx = this.context as ParserRuleContext;
            addDiagnostic(this, {
                message: "Could not load include file '" + this.name + "'",
                type: DiagnosticSeverity.Warning,
                range: rangeFromTokens(ctx.start, ctx.stop),
            });
        }

        return scope;
    }
}
