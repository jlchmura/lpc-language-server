import * as fs from "fs";
import * as path from "path";
import { SourceContext } from "./SourceContext";
import { ContextImportInfo, IDiagnosticEntry, ISymbolInfo } from "../types";
import { FoldingRange, Position, SemanticTokens } from "vscode-languageserver";
import { normalizeFilename } from "../utils";
import { IncludeSymbol } from "../symbols/includeSymbol";
import { TextDocument } from "vscode-languageserver-textdocument";
import { SourceMap } from "./SourceMap";
import { BaseSymbol } from "antlr4-c3";
import { PerformanceObserver, performance } from "perf_hooks";
import { randomInt } from "crypto";
import { LpcConfig } from "./LpcConfig";

/** ms delay before reparsing a depenency */
const DEP_FILE_REPARSE_TIME = 250;

export type IContextEntry = {
    context: SourceContext;
    refCount: number;
    /**
     * List of filenames that this context depends on.
     */
    dependencies: string[];
    references: string[];
    filename: string;
    id: number;
};

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
        const depChain = new Set<string>();
        const context = this.loadLpcInternal(fileName, source, depChain);

        console.debug("[LOAD] " + fileName, depChain);

        return context;
    }
    public loadLpcInternal(
        fileName: string,
        source: string = undefined,
        depChain: Set<string>
    ): SourceContext {
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

            context.onLoadImports = (imports) => {
                this.loadImports(fileName, imports, depChain);
            };

            contextEntry = {
                context,
                refCount: 0,
                dependencies: [],
                references: [],
                filename: fileName,
                id: randomInt(1000000),
            };
            this.sourceContexts.set(fileName, contextEntry);

            // Do an initial parse run and load all dependencies of this context
            // and pass their references to this context.
            context.setText(source);
            this.parseLpc(contextEntry, depChain);
        }
        contextEntry.refCount++;

        return contextEntry.context;
    }

    /**
     * load imports and add them as dependencies to fileName
     * @param fileName file file we are loading imports for
     * @param imports array of import filenames to load
     */
    private loadImports(
        fileName: string,
        imports: string[],
        depChain: Set<string>
    ) {
        const contextEntry = this.getContextEntry(fileName);
        if (contextEntry) {
            for (const imp of imports) {
                // const importFilename =
                //     contextEntry.context.resolveFilename(imp);
                this.addDependency(
                    fileName,
                    {
                        filename: imp,
                    } as ContextImportInfo,
                    depChain
                );
            }
        }
    }

    public getDependencies(fileName: string): string[] {
        const contextEntry = this.getContextEntry(fileName);
        if (contextEntry) {
            return [...contextEntry.dependencies];
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

                for (const ref of contextEntry.references) {
                    this.internalReleaseLpc(ref);
                }
            }
        }
    }

    /**
     * Add a reference from `filename` to `refFilename`, which happens
     * when a ref is loaded by load_object or this_player()
     * @param filename current filename
     * @param refFilename filename of the reference (i.e. the load object)
     */
    public addReference(filename: string, refFilename: string) {
        try {
            const contextEntry = this.getContextEntry(filename);
            if (contextEntry) {
                contextEntry.references.push(refFilename);

                const depCtx = this.loadLpcInternal(
                    refFilename,
                    undefined,
                    new Set<string>()
                );
                const depContextEntry = this.getContextEntry(refFilename);
                if (depContextEntry) {
                    depContextEntry.refCount++;
                }

                return depCtx;
            }
        } catch (e) {
            console.log(
                `Error adding reference ${refFilename} to ${filename}: ${e}`
            );
        }
    }

    /**
     * Add a dependency to this file
     * @param filename filename that we're adding a depdency TO
     * @param dep the dependency to add
     * @returns
     */
    private addDependency(
        filename: string,
        dep: ContextImportInfo,
        depChain: Set<string>
    ) {
        try {
            const contextEntry = this.getContextEntry(filename);
            if (contextEntry) {
                const depContext = this.loadDependency(
                    contextEntry,
                    dep.filename,
                    depChain
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

    private parseLpc(
        contextEntry: IContextEntry,
        depChain: Set<string>,
        reparseRefs: boolean = false
    ) {
        performance.mark("parse-lpc-start");

        const context = contextEntry.context;

        if (context.fileName.endsWith("monster.c")) {
            const ii = 0;
        }
        depChain.add(context.fileName);

        try {
            const oldDependencies = [...contextEntry.dependencies];
            const oldReferences = [...context.getReferences()];

            contextEntry.dependencies = [];

            const info = context.parse();

            // load file-level dependencies (imports & inherits)
            const newDependencies = [...info.imports];

            for (const dep of newDependencies) {
                this.addDependency(contextEntry.filename, dep, depChain);
            }

            // queue dependencies to reparse & run their diags
            // NTBLA: improve
            if (reparseRefs) {
                setTimeout(() => {
                    for (const ref of oldReferences) {
                        const refCtx = this.getContextEntry(ref.fileName);
                        this.parseLpc(refCtx, new Set());

                        // send a notification to the server to re-send diags for this doc
                        if (!!this.onRunDiagnostics)
                            this.onRunDiagnostics(ref.fileName);
                    }
                }, DEP_FILE_REPARSE_TIME);
            }

            // Release all old dependencies. This will only unload grammars which have
            // not been ref-counted by the above dependency loading (or which are not used by other
            // grammars).
            for (const dep of oldDependencies) {
                this.releaseLpc(dep);
            }
        } catch (e) {
            console.error(`Error parsing ${contextEntry.filename}: ${e}`, e);
        }

        depChain.delete(context.fileName);

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
        depName: string,
        depChain: Set<string>
    ): SourceContext | undefined {
        const depInfo = contextEntry.context.resolveFilename(depName);
        if (!!depInfo?.fullPath) {
            const depPath = depInfo.fullPath;

            if (depChain.has(depPath)) {
                console.info("Skipping cyclic dependency", depPath);
                return undefined;
            }

            try {
                fs.accessSync(depPath, fs.constants.R_OK);
                contextEntry.dependencies.push(depPath);
                const depContextEntry = this.loadLpcInternal(
                    depPath,
                    undefined,
                    depChain
                );

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
            return this.loadLpcInternal(fileName, source, new Set<string>());
        }

        return contextEntry?.context;
    }

    public getDiagnostics(fileName: string): IDiagnosticEntry[] {
        const context = this.getContext(fileName);

        if (!!context) {
            return context.getDiagnostics();
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
            this.parseLpc(contextEntry, new Set(), true);
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

    /**
     * Look up a symbol using a document positio (zero-based).
     * @param fileName Document file name
     * @param pos Document position
     * @returns Symbol or undefined if one could not be found
     */
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

    public parseAllFiles() {
        const dirsToProcess = [this.workspaceDir];

        performance.mark("parse-all-start");
        while (dirsToProcess.length > 0) {
            const dir = dirsToProcess.pop();
            const files = fs.readdirSync(dir, { withFileTypes: true });
            files.forEach((file) => {
                if (file.isDirectory())
                    dirsToProcess.push(path.join(dir, file.name));
                else if (file.name.endsWith(".c") || file.name.endsWith(".h")) {
                    try {
                        const filename = path.join(dir, file.name);
                        const txt = fs.readFileSync(filename, "utf8");
                        this.loadLpc(filename, txt);
                        this.onRunDiagnostics(filename);
                        this.releaseLpc(filename);
                    } catch (e) {
                        console.error(`Error parsing ${file.name}: ${e}`);
                    }
                }
            });
        }

        performance.mark("parse-all-end");
        performance.measure("parse-all", "parse-all-start", "parse-all-end");
    }
}
