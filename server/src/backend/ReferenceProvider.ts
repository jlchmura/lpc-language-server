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
    getSymbolsOfTypeSync,
    isInstanceOfIReferenceSymbol,
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

        const results: Location[] = [];
        const seen: Set<BaseSymbol> = new Set();

        const sym = this.backend.symbolContainingPosition(doc.uri, position);

        if (!sym) {
            return [];
        }

        // collect possible references - they will be scanned later to confirm

        // get a list of files that possibly contain this symbol
        const candidateFiles =
            this.backend.identifierCache.get(sym.name) ?? new Set<string>();

        // add the symbol and its reference to the list
        const refsToScan: BaseSymbol[] = [sym];
        if (isInstanceOfIReferenceSymbol(sym))
            refsToScan.push(sym.getReference());

        // check this files inludes to see if the symbol is defined in another file
        const symFile = getFilenameForSymbol(sym);

        const files = [
            symFile, // the current file
            ...(this.backend.includeRefs.get(symFile) ?? []), // any included files
            ...(this.backend.fileRefs.get(symFile) ?? []), // any files that reference this one
            ...(candidateFiles ?? []),
        ];

        // now scan the files
        const seenFiles = new Set<string>();
        for (const file of files) {
            if (seenFiles.has(file)) continue;
            seenFiles.add(file);

            // load files and evaluate them so that any arrow symbols will be resolved
            const refCtx = this.backend.loadLpc(file);
            refCtx.evaluateProgram();

            // look for name matches and make sure their references are filled in.
            const { symbolTable } = refCtx;
            const candidates = await symbolTable.getAllSymbolsByName(sym.name);
            candidates.forEach((c) => {
                if (!!c && isInstanceOfIReferenceSymbol(c)) {
                    // make sure the reference is filled in
                    c.getReference();
                }
            });

            // find the "definition" symbol and add any its file
            const refSym = await refCtx.symbolTable.resolve(sym.name, true);
            if (
                isInstanceOfIReferenceableSymbol(refSym) &&
                getFilenameForSymbol(refSym) === file
            ) {
                refsToScan.push(refSym);
                if (isInstanceOfIReferenceSymbol(refSym)) {
                    refsToScan.push(refSym.getReference());
                }
            }

            files.push(...(this.backend.fileRefs.get(file) ?? []));
        }

        while (refsToScan.length > 0) {
            const ref = refsToScan.pop();
            if (!ref || seen.has(ref)) continue;
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

            results.push({
                uri: filename,
                range: range,
            });
        }

        // release candidate files
        for (const candidateFile of candidateFiles) {
            this.backend.releaseLpc(candidateFile);
        }

        return results;
    }
}
