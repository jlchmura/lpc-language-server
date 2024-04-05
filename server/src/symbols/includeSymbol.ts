import { CallStack } from "../backend/CallStack";
import { ContextSymbolTable } from "../backend/ContextSymbolTable";
import { SourceContext } from "../backend/SourceContext";
import { IncludeDirectiveContext } from "../parser3/LPCParser";
import { SymbolKind } from "../types";
import { normalizeFilename, testFilename } from "../utils";
import { IEvaluatableSymbol, LpcBaseSymbol } from "./base";

export class IncludeSymbol
    extends LpcBaseSymbol<IncludeDirectiveContext>
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
        return scope;
    }
}
