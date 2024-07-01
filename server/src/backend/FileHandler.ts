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
        private sourceContext: SourceContext,
        /** list of files that are loaded via `#include` directives */
        private includes: string[]
    ) {}

    /**
     * Adds a reference to another file. This may be an `inherit` or it may be
     * the loading of another object such as `load_object` or `clone_object`.
     * This method is NOT to be used for `#include` files.
     * @param filename The filename to load
     * @param symbol The symbol that is referencing the file
     */
    public loadReference(filename: string, symbol?: BaseSymbol): SourceContext {
        const fromFilename = this.sourceContext.fileName;
        const toFilename = this.backend.filenameToAbsolutePath(filename);

        return this.backend.addReference(fromFilename, toFilename);
    }

    /**
     * Loads an INCLUDE file
     * @param sourceFilename The filename that is loading the include
     * @param filename The filename of the include file
     * @returns
     */
    public loadInclude(
        sourceFilename: string,
        filename: string
    ): LoadImportResult {
        const importInfo = this.backend.resolveFilename(
            filename,
            sourceFilename,
            this.searchDirs
        );

        this.includes.push(importInfo.fullPath);

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

    public doesIncludeFile(filename: string): boolean {
        const refFilename = this.sourceContext.resolveFilename(filename);
        const deps = this.backend.getDependencies(this.sourceContext.fileName);
        return !!deps.find((f) => f === refFilename.fullPath);
    }
}
