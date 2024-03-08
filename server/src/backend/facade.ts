import * as fs from "fs";
import * as path from "path";
import { SourceContext } from "./SourceContext";

import { ContextImportInfo, IDiagnosticEntry, ISymbolInfo } from "../types";

import { URI } from "vscode-uri";
import { FoldingRange } from "vscode-languageserver";
import { normalizeFilename } from "../utils";
import { IncludeSymbol } from "../symbols/includeSymbol";
import { ContextSymbolTable } from "./ContextSymbolTable";

export interface IContextEntry {
    context: SourceContext;
    refCount: number;
    /**
     * List of filenames that this context depends on.
     */
    dependencies: string[];
    filename: string;
}

enum DependencySearchType {
    Local,
    Global,
}

/**
 * tests if a filename is surrounded by chars @c and if so
 * removes them
 * @param filename
 * @param c
 * @returns
 */
function testFilename(filename: string, c: string, cEnd: string): string {
    if (filename.startsWith(c) && filename.endsWith(cEnd)) {
        return filename.slice(1, filename.length - 1);
    } else {
        return filename;
    }
}

/**
 * this stores the context of the LPC runtime which contains
 * source context, dependencies, and code for each LPC file.
 */
export class LpcFacade {
    public static SefunSymbols: ContextSymbolTable;

    /**
     * Mapping file names to SourceContext instances.
     */
    private sourceContexts: Map<string, IContextEntry> = new Map<
        string,
        IContextEntry
    >();

    public onRunDiagnostics: (filename: string) => void;

    public constructor(
        private importDir: string,
        private workspaceDir: string
    ) {
        console.log("LpcFacade created", importDir, workspaceDir);

        const sefunCtx = this.loadLpc(path.join(importDir, "simul_efun.h"));
        if (!!sefunCtx) LpcFacade.SefunSymbols = sefunCtx.symbolTable;
    }

    public filenameToAbsolutePath(filename: string): string {
        if (!filename) return filename;

        if (filename.startsWith(this.workspaceDir)) {
            return filename;
        } else if (!filename.startsWith("/") && filename.includes("/")) {
            filename = "./" + filename;
        } else if (filename.startsWith("/")) {
            filename = "." + filename;
        }

        const newPath = path.join(this.workspaceDir, filename);
        console.log(`filenameToAbsolutePath '${filename}' -> '${newPath}'`);
        return newPath;
    }

    public loadLpc(fileName: string, source?: string): SourceContext {
        fileName = normalizeFilename(fileName);
        let contextEntry = this.getContextEntry(fileName);
        if (!contextEntry) {
            if (!source) {
                try {
                    if (path.isAbsolute(fileName)) {
                        source = fs.readFileSync(fileName, "utf8");
                    } else {
                        fs.statSync(path.join(this.workspaceDir, fileName));
                        source = fs.readFileSync(fileName, "utf8");
                    }
                } catch (e) {
                    return undefined;
                }
            }

            const context = new SourceContext(
                this,
                fileName,
                this.workspaceDir,
                this.importDir
            );
            contextEntry = {
                context,
                refCount: 0,
                dependencies: [],
                filename: fileName,
            };
            this.sourceContexts.set(fileName, contextEntry);

            // Do an initial parse run and load all dependencies of this context
            // and pass their references to this context.
            context.setText(source);
            this.parseLpc(contextEntry);
        }
        contextEntry.refCount++;

        return contextEntry.context;
    }

    public getDependencies(fileName: string): string[] {
        const contextEntry = this.getContextEntry(fileName);
        if (contextEntry) {
            return contextEntry.dependencies;
        }

        return [];
    }

    public releaseLpc(fileName: string): void {
        this.internalReleaseLpc(fileName);
    }

    private internalReleaseLpc(
        fileName: string,
        referencing?: IContextEntry
    ): void {
        const contextEntry = this.getContextEntry(fileName);
        if (contextEntry) {
            if (referencing) {
                // If a referencing context is given remove this one from the reference's dependencies list,
                // which in turn will remove the referencing context from the dependency's referencing list.
                referencing.context.removeDependency(contextEntry.context);
            }

            contextEntry.refCount--;
            if (contextEntry.refCount === 0) {
                this.sourceContexts.delete(fileName);

                // Release also all dependencies.
                for (const dep of contextEntry.dependencies) {
                    this.internalReleaseLpc(dep, contextEntry);
                }
            }
        }
    }

    public addDependency(filename: string, dep: ContextImportInfo) {
        const contextEntry = this.getContextEntry(filename);
        if (contextEntry) {
            const depContext = this.loadDependency(contextEntry, dep.filename);
            if (depContext) {
                if (!!dep.symbol) {
                    (dep.symbol as IncludeSymbol).isLoaded = true;
                }
                contextEntry.context.addAsReferenceTo(depContext);
            }
            return depContext;
        }
    }

    private parseLpc(contextEntry: IContextEntry) {
        const context = contextEntry.context;
        const oldDependencies = contextEntry.dependencies;
        const oldReferences = [...context.getReferences()];

        contextEntry.dependencies = [];
        const info = context.parse();

        // load file-level dependencies (imports & inherits)
        const newDependencies = info.imports;
        for (const dep of newDependencies) {
            this.addDependency(contextEntry.filename, dep);
        }

        // re-parse any documents that depend on this one
        for (const ref of oldReferences) {
            const refCtx = this.getContextEntry(ref.fileName);
            this.parseLpc(refCtx);

            // send a notification to the server to re-send diags for this doc
            if (!!this.onRunDiagnostics) this.onRunDiagnostics(ref.fileName);
        }

        // load sefun file, if there is one.
        // const depSefun = this.loadDependency(contextEntry, "sys/simul_efun.h");
        // if (!!depSefun) contextEntry.context.addAsReferenceTo(depSefun);

        // Release all old dependencies. This will only unload grammars which have
        // not been ref-counted by the above dependency loading (or which are not used by other
        // grammars).
        for (const dep of oldDependencies) {
            this.releaseLpc(dep);
        }
    }

    /**
     * Call this to refresh the internal input stream as a preparation to a reparse call
     * or for code completion.
     * Does nothing if no grammar has been loaded for that file name.
     *
     * @param fileName The grammar file name.
     * @param source The grammar code.
     */
    public setText(fileName: string, source: string): void {
        const contextEntry = this.getContextEntry(fileName);
        if (contextEntry) {
            contextEntry.context.setText(source);
        }
    }

    /**
     * Load a dependency for a given context entry.
     * @param contextEntry The context entry into which the dependency will be loaded
     * @param depName The dependency filename
     * @returns Context entry of the loaded dependency or undefined if the dependency could not be loaded.
     */
    private loadDependency(
        contextEntry: IContextEntry,
        depName: string
    ): SourceContext | undefined {
        // The given import dir is used to locate the dependency (either relative to the base path or via an
        // absolute path).
        // If we cannot find the grammar file that way we try the base folder.
        const contextFilename = contextEntry.filename.startsWith("file:")
            ? URI.parse(contextEntry.filename).fsPath
            : contextEntry.filename;
        const basePath = path.dirname(contextFilename);
        const fullPath = path.isAbsolute(this.importDir)
            ? this.importDir
            : path.join(basePath, this.importDir);
        try {
            let filename = depName;
            // figure out the search type
            let depType = DependencySearchType.Local;
            if (depName !== (filename = testFilename(filename, '"', '"'))) {
                depType = DependencySearchType.Local;
            } else if (
                depName !== (filename = testFilename(filename, "<", ">"))
            ) {
                depType = DependencySearchType.Global;
            }

            filename = normalizeFilename(filename);

            const searchPaths = [basePath, fullPath];
            if (depType === DependencySearchType.Global) {
                searchPaths.reverse();
            }

            if (filename.includes("/")) searchPaths.push(this.workspaceDir);

            for (const p of searchPaths) {
                const depPath = path.join(p, filename);
                try {
                    fs.accessSync(depPath, fs.constants.R_OK);
                    contextEntry.dependencies.push(depPath);
                    const depContextEntry = this.loadLpc(depPath);
                    return depContextEntry;
                } catch (e) {
                    // ignore
                    const i = 0;
                }
            }
        } catch (e) {
            // ignore
        }

        // Ignore the dependency if we cannot find the source file for it.
        return undefined;
    }

    public isContextLoaded(fileName: string): boolean {
        return !!this.getContextEntry(fileName);
    }

    public getContextEntry(fileName: string): IContextEntry {
        return this.sourceContexts.get(normalizeFilename(fileName));
    }

    public getContext(
        fileName: string,
        source?: string | undefined
    ): SourceContext {
        const contextEntry = this.getContextEntry(fileName);
        if (!contextEntry && !!source) {
            return this.loadLpc(fileName, source);
        }

        return contextEntry?.context;
    }

    public getDiagnostics(fileName: string): IDiagnosticEntry[] {
        const context = this.getContext(fileName);

        return context?.getDiagnostics();
    }

    /**
     * Triggers a parse run for the given file name. This grammar must have been loaded before.
     *
     * @param fileName The grammar file name.
     */
    public reparse(fileName: string): void {
        const contextEntry = this.getContextEntry(fileName);
        if (contextEntry) {
            this.parseLpc(contextEntry);
        }
    }

    /**
     * Returns a list of top level symbols from a file (and optionally its dependencies).
     *
     * @param fileName The grammar file name.
     * @param fullList If true, includes symbols from all dependencies as well.
     * @returns A list of symbol info entries.
     */
    public listTopLevelSymbols(
        fileName: string,
        fullList: boolean
    ): ISymbolInfo[] {
        const context = this.getContext(fileName);

        return context?.listTopLevelSymbols(!fullList);
    }

    public symbolInfoAtPosition(
        fileName: string,
        column: number,
        row: number,
        limitToChildren = true
    ): ISymbolInfo | undefined {
        const context = this.getContext(fileName);

        return context?.symbolAtPosition(column, row, limitToChildren);
    }

    /**
     * Determines source file and position of all occurrences of the given symbol. The search includes
     * also all referencing and referenced contexts.
     *
     * @param fileName The grammar file name.
     * @param symbolName The name of the symbol to check.
     * @returns A list of symbol info entries, each describing one occurrence.
     */
    public getSymbolOccurrences(
        fileName: string,
        symbolName: string
    ): ISymbolInfo[] {
        const context = this.getContext(fileName);
        const result = context.symbolTable.getSymbolOccurrences(
            symbolName,
            false
        );

        return result.sort((lhs: ISymbolInfo, rhs: ISymbolInfo) => {
            return lhs.kind - rhs.kind;
        });
    }

    /**
     * Count how many times a symbol has been referenced. The given file must contain the definition of this symbol.
     *
     * @param fileName The grammar file name.
     * @param symbol The symbol for which to determine the reference count.
     * @returns The reference count.
     */
    public countReferences(fileName: string, symbol: string): number {
        const context = this.getContext(fileName);

        return context.getReferenceCount(symbol);
    }

    public async getCodeCompletionCandidates(
        fileName: string,
        column: number,
        row: number
    ): Promise<ISymbolInfo[]> {
        const context = this.getContext(fileName);

        return context.getCodeCompletionCandidates(column, row);
    }

    public getFoldingRanges(fileName: string): FoldingRange[] {
        const context = this.getContext(fileName);

        return context?.getFoldingRanges();
    }
}
