import { Position, TextDocument } from "vscode-languageserver-textdocument";
import { LpcFacade } from "./facade";
import { Location } from "vscode-languageserver";
import {
    firstEntry,
    getFilenameForSymbol,
    lexRangeFromContext,
    lexRangeToLspRange,
    rangeFromTokens,
} from "../utils";
import {
    IReferenceableSymbol,
    isInstanceOfIReferenceableSymbol,
} from "../symbols/base";
import { ContextSymbolTable } from "./ContextSymbolTable";
import { ParserRuleContext } from "antlr4ng";
import { LPCToken } from "../parser3/LPCToken";
import { BaseSymbol } from "antlr4-c3";
import { URI } from "vscode-uri";
import {
    FunctionHeaderContext,
    FunctionHeaderDeclarationContext,
} from "../parser3/LPCParser";
import { LpcBaseMethodSymbol } from "../symbols/methodSymbol";

export class ReferenceProvider {
    constructor(private backend: LpcFacade) {}

    public async handleReferenceRequest(
        doc: TextDocument,
        position: Position
    ): Promise<Location[]> {
        const docFilename = URI.parse(doc.uri).fsPath;
        // NTBLA: decide if we should automatically parse all or not
        //await this.backend.parseAllIfNeeded();

        const results: Location[] = [];
        const seen: Set<BaseSymbol> = new Set();

        const symbolInfo = this.backend.symbolInfoAtPosition(
            doc.uri,
            position.character,
            position.line + 1,
            true
        );

        const sym = firstEntry(symbolInfo)?.symbol;
        if (!sym) {
            return [];
        } else if (!isInstanceOfIReferenceableSymbol(sym)) {
            return [];
        }

        const refsToScan: BaseSymbol[] = [sym];

        // check this files inludes to see if the symbol is defined in another file
        const symFile = getFilenameForSymbol(sym);
        if (this.backend.includeRefs.has(symFile)) {
            const files = [symFile, ...this.backend.includeRefs.get(symFile)];
            for (const file of files) {
                const refCtx = this.backend.loadLpc(file);
                const refSym = await refCtx.symbolTable.resolve(sym.name, true);
                if (
                    isInstanceOfIReferenceableSymbol(refSym) &&
                    getFilenameForSymbol(refSym) === file
                ) {
                    refsToScan.push(refSym);
                }
            }
        }

        while (refsToScan.length > 0) {
            const ref = refsToScan.pop();
            if (seen.has(ref)) continue;
            seen.add(ref);

            if (isInstanceOfIReferenceableSymbol(ref)) {
                refsToScan.push(...ref.references);
            }

            let parseInfo = ref.context as ParserRuleContext;
            if (ref instanceof LpcBaseMethodSymbol) {
                // use the name context instead
                const header = parseInfo.children.find(
                    (c) => c instanceof FunctionHeaderContext
                ) as FunctionHeaderContext;
                if (header?._functionName) {
                    parseInfo = header._functionName;
                }
            }
            const token = parseInfo.start as LPCToken;
            const filename = token.filename;
            const range = lexRangeToLspRange(lexRangeFromContext(parseInfo));

            // if (range.end.line > range.start.line) {
            //     range.end.line = range.start.line;
            //     range.end.character = 999;
            // }
            results.push({
                uri: filename,
                range: range,
            });
        }

        return results;
    }
}
