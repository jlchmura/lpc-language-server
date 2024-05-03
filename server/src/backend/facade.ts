import * as fs from "fs";
import * as path from "path";
import { SourceContext } from "./SourceContext";

import {
    ContextImportInfo,
    DependencySearchType,
    IDiagnosticEntry,
    ISymbolInfo,
} from "../types";
import { FoldingRange, Position, SemanticTokens } from "vscode-languageserver";
import { normalizeFilename } from "../utils";
import { IncludeSymbol } from "../symbols/includeSymbol";
import { TextDocument } from "vscode-languageserver-textdocument";
import { SourceMap } from "./SourceMap";
import { BaseSymbol } from "antlr4-c3";
import { PerformanceObserver, performance } from "perf_hooks";

/** ms delay before reparsing a depenency */
const DEP_FILE_REPARSE_TIME = 250;

export interface IContextEntry {
    context: SourceContext;
    refCount: number;
    /**
     * List of filenames that this context depends on.
     */
    dependencies: string[];
    filename: string;
}

/**
 * this stores the context of the LPC runtime which contains
 * source context, dependencies, and code for each LPC file.
 */
export class LpcFacade {
    /**
     * Mapping file names to SourceContext instances.
     */
    private sourceContexts: Map<string, IContextEntry> = new Map<
        string,
        IContextEntry
    >();

    private depChain: Set<string>;

    public onRunDiagnostics: (filename: string) => void;

    public constructor(
        public importDir: string[],
        public workspaceDir: string
    ) {
        console.log("LpcFacade created", importDir, workspaceDir);

        const obs = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                console.log(
                    `[Perf] ${entry.name} took ${entry.duration} ms`,
                    entry.detail
                );
            });

            performance.clearMarks();
            performance.clearMeasures();
        });
        obs.observe({ entryTypes: ["measure"], buffered: true });
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

    private addDependency(filename: string, dep: ContextImportInfo) {
        try {
            const contextEntry = this.getContextEntry(filename);
            if (contextEntry) {
                const depContext = this.loadDependency(
                    contextEntry,
                    dep.filename
                );
                if (depContext) {
                    // increment ref counter for the dependency
                    const depContextEntry = this.getContextEntry(
                        depContext.fileName
                    );
                    depContextEntry.refCount++;

                    if (!!dep.symbol) {
                        (dep.symbol as IncludeSymbol).isLoaded = true;
                    }
                    contextEntry.context.addAsReferenceTo(depContext);
                }
                return depContext;
            }
        } catch (e) {
            console.log(
                `Error adding dependency ${dep.filename} to ${filename}: ${e}`
            );
        }
    }

    private parseLpc(contextEntry: IContextEntry) {
        performance.mark("parse-lpc-start");

        const context = contextEntry.context;
        const isDepChainRoot = !this.depChain;
        if (isDepChainRoot) {
            this.depChain = new Set<string>([context.fileName]);
        } else {
            this.depChain.add(context.fileName);
        }

        try {
            const oldDependencies = contextEntry.dependencies;
            const oldReferences = [...context.getReferences()];

            contextEntry.dependencies = [];
            const info = context.parse();

            // load file-level dependencies (imports & inherits)
            const newDependencies = info.imports;

            for (const dep of newDependencies) {
                this.addDependency(contextEntry.filename, dep);
            }

            // queue dependencies to reparse & run their diags
            // NTBLA: improve
            setTimeout(() => {
                for (const ref of oldReferences) {
                    const refCtx = this.getContextEntry(ref.fileName);
                    this.parseLpc(refCtx);

                    // send a notification to the server to re-send diags for this doc
                    if (!!this.onRunDiagnostics)
                        this.onRunDiagnostics(ref.fileName);
                }
            }, DEP_FILE_REPARSE_TIME);

            // Release all old dependencies. This will only unload grammars which have
            // not been ref-counted by the above dependency loading (or which are not used by other
            // grammars).
            for (const dep of oldDependencies) {
                this.releaseLpc(dep);
            }
        } catch (e) {
            console.error(`Error parsing ${contextEntry.filename}: ${e}`, e);
        }

        if (isDepChainRoot) {
            this.depChain = undefined;
        }

        performance.mark("parse-lpc-end");
        performance.measure(
            "parse-lpc: " + contextEntry.filename,
            "parse-lpc-start",
            "parse-lpc-end"
        );
    }

    /**
     * Call this to refresh the internal input stream as a preparation to a reparse call
     * or for code completion.
     *
     * @param fileName The grammar file name.
     * @param source The grammar code.
     */
    public setText(doc: TextDocument): void {
        const contextEntry = this.getContextEntry(doc.uri);
        if (contextEntry) {
            contextEntry.context.setText(doc.getText());
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
        const depInfo = contextEntry.context.resolveFilename(depName);
        if (!!depInfo?.fullPath) {
            const depPath = depInfo.fullPath;

            if (this.depChain.has(depPath)) {
                console.info("Skipping cyclic dependency", depPath);
                return undefined;
            }

            try {
                fs.accessSync(depPath, fs.constants.R_OK);
                contextEntry.dependencies.push(depPath);
                const depContextEntry = this.loadLpc(depPath);

                return depContextEntry;
            } catch (e) {
                console.log(`Error loading dependency ${depPath}: ${e}`);
            }
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

        if (!!context && context.needsValidation) {
            //try {
            return context.getDiagnostics();
            // } catch (e) {
            //     console.log(`Error getting diagnostics for ${fileName}: ${e}`);
            // }
        }

        return undefined;
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

    public symbolContainingPosition(
        fileName: string,
        pos: Position
    ): BaseSymbol | undefined {
        const context = this.getContext(fileName);
        return context?.symbolContainingPosition(pos);
    }

    public symbolInfoAtPosition(
        fileName: string,
        column: number,
        row: number,
        limitToChildren = true
    ): ISymbolInfo[] | undefined {
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
        const result = context.getSymbolOccurrences(symbolName, false);

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

    public getSemanticTokens(fileName: string): SemanticTokens {
        const context = this.getContext(fileName);

        return context?.getSemanticTokens();
    }

    public getSourcemap(fileName: string): SourceMap {
        const context = this.getContext(fileName);

        return context?.sourceMap;
    }

    public getHighlights(fileName: string, symbolName: string) {
        const context = this.getContext(fileName);
        return context?.getHighlights(symbolName);
    }
}
