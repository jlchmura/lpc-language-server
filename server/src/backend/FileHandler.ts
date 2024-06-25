import * as fs from "fs";
import { BaseSymbol } from "antlr4-c3";
import { SourceContext } from "./SourceContext";
import { LpcFacade } from "./facade";
import { IFileHandler, LoadImportResult } from "./types";

export class LpcFileHandler implements IFileHandler {
    /** additional search dirs that can be used for this file */
    public searchDirs: string[] = [];

    constructor(
        private backend: LpcFacade,
        private sourceContext: SourceContext
    ) {}

    public loadReference(filename: string, symbol?: BaseSymbol): SourceContext {
        const fromFilename = this.sourceContext.fileName;
        const toFilename = this.backend.filenameToAbsolutePath(filename);
        const refs = this.sourceContext.info.objectReferences;

        if (symbol) {
            const refSymbols = refs[fromFilename]
                ? refs[fromFilename]
                : (refs[fromFilename] = []);
            refSymbols.push(symbol);
        }

        return this.backend.addReference(fromFilename, toFilename);
    }

    public loadImport(
        sourceFilename: string,
        filename: string
    ): LoadImportResult {
        const importInfo = this.backend.resolveFilename(
            filename,
            sourceFilename,
            this.searchDirs
        );
        try {
            const source = !!importInfo.fullPath
                ? fs.readFileSync(importInfo.fullPath, "utf-8")
                : "";

            return { uri: importInfo.fullPath, source };
        } catch (e) {
            return { uri: importInfo.fullPath, source: undefined };
        }
    }

    public getDependencies(filename: string) {
        // get a list of dependencies for a given file
        const depFiles = this.backend.getDependencies(filename);
        return depFiles.map((f) => this.backend.getContext(f));
    }

    public doesReferenceFile(filename: string): boolean {
        const refFilename = this.backend.filenameToAbsolutePath(filename);
        const refs = this.sourceContext.info.objectReferences;
        return !!refs[refFilename];
    }

    public doesImportFile(filename: string): boolean {
        const refFilename = this.sourceContext.resolveFilename(filename);
        const deps = this.backend.getDependencies(this.sourceContext.fileName);
        return !!deps.find((f) => f === refFilename.fullPath);
    }
}
