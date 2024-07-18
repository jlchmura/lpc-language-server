import { BaseSymbol } from "antlr4-c3";
import { randomInt } from "crypto";
import * as events from "events";
import * as fs from "fs";
import { glob } from "glob";
import * as path from "path";
import { PerformanceObserver, performance } from "perf_hooks";
import {
    CancellationToken,
    CancellationTokenSource,
    FoldingRange,
    Position,
    SemanticTokens,
    TextDocuments,
} from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { URI } from "vscode-uri";
import { IncludeSymbol } from "../symbols/includeSymbol";
import {
    ContextImportInfo,
    DependencySearchType,
    IDiagnosticEntry,
    ISymbolInfo,
    MultiMap,
    createMultiMap,
} from "../types";
import {
    areWeTestingWithJest,
    normalizeFilename,
    testFilename,
} from "../utils";
import { ensureLpcConfig } from "./LpcConfig";
import { SourceContext } from "./SourceContext";
import { ResolvedFilename } from "./types";
import { MasterFileContext } from "../driver/MasterFile";
import { DriverVersion } from "../driver/DriverVersion";

/** ms delay before reparsing a depenency */
const DEP_FILE_REPARSE_TIME = 300;
/** ms delay before reparsing the next dep in the queue */
const DEP_FILE_REPARSE_WORKTIME = 10;

/** ms delay between when a full parse is cancelled and when it is restarted */
const TIME_BETWEEN_REPARSE = 1000;

export type IContextEntry = {
    context: SourceContext;
    refCount: number;
    /**
     * List of filenames that this context depends on.
     */
    dependencies: string[];
    references: Set<string>;
    filename: string;
    id: number;
    disposed: boolean;
};

/**
 * this stores the context of the LPC runtime which contains
 * source context, dependencies, and code for each LPC file.
 */
export class LpcFacade {
    /** directors that are scanned for imports */
    private importDir: string[];

    /**
     * Mapping file names to SourceContext instances.
     */
    private sourceContexts: Map<string, IContextEntry> = new Map<
        string,
        IContextEntry
    >();

    public onProcessingEvent: events.EventEmitter = new events.EventEmitter();
    public onRunDiagnostics: (
        filename: string,
        force: boolean
    ) => Promise<void>;

    private depReparseQueue = new Set<string>();
    private depReparseTimer: NodeJS.Timeout;
    private depReparseCancel: CancellationTokenSource | undefined =
        new CancellationTokenSource();

    /**
     * set of files that have been scanned.  Once a file has been scanned, either because
     * it was opened in the editor & parsed, or parseAll hit it,
     * the parseAll operation does not need to scan it again.
     */
    private scannedFiles = new Set<string>();
    private parseAllCount = 0;
    private parseAllCancel = new CancellationTokenSource();
    public parseAllComplete = false;
    private parseAllFileQueue: string[] = [];

    /**
     * Stores information about which files are references via an include.
     * The key is the include filename, the set contains a list of files that reference it
     */
    public includeRefs = createMultiMap<string, string>();

    /**
     * Stores info about which files reference a given file.
     * For a given key, the value is a list of filenames that reference it.
     */
    public fileRefs = createMultiMap<string, string>();

    /**
     * Stores a mapping of *possible* identifiers to the files that contain them.
     * This map is built during facade startup
     */
    public identifierCache: MultiMap<string, string>;

    /** the lib's compiled master.c file */
    private masterFile: MasterFileContext;

    public constructor(
        public workspaceDir: string,
        private workspaceDocs: TextDocuments<TextDocument>
    ) {
        const config = ensureLpcConfig();
        this.importDir = config.include.map((dir) => {
            if (dir.startsWith("/")) dir = dir.slice(1);
            return path.join(workspaceDir, dir);
        });

        if (!areWeTestingWithJest()) {
            console.log("LpcFacade created", this.importDir, workspaceDir);

            const obs = new PerformanceObserver((list) => {
                list?.getEntries()?.forEach((entry) => {
                    console.log(
                        `${entry.duration?.toFixed(4).padStart(9, " ")}ms | ${
                            entry?.name
                        }`
                    );
                    performance.clearMeasures(entry.name);
                });
            });
            obs.observe({ entryTypes: ["measure"], buffered: true });
        }

        this.initMaster();

        setTimeout(async () => {
            await this.queueInitFilesForParse();
            await this.doParseAll();
        }, 1000);
    }

    /** parses the master file */
    private initMaster() {
        const config = ensureLpcConfig();
        const masterFileInfo = this.resolveFilename(
            config.files.master,
            this.workspaceDir
        );

        this.masterFile = new MasterFileContext(
            this.workspaceDir,
            this.loadLpc(masterFileInfo.fullPath)
        );
    }

    public filenameToAbsolutePath(filename: string): string {
        if (!filename) return filename;
        else if (typeof filename !== "string") {
            // NTBLA: track this down and handle it
            // console.warn(
            //     "filenameToAbsolutePath: filename is not a string",
            //     filename
            // );
            return "";
        }
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

    /**
     * Resolves a local filename to its absolute path
     * @param filename The filename to resolve
     * @param referenceFilename The filename of the source doc that loading the file
     * @returns
     */
    public resolveFilename(
        filename: string,
        referenceFilename: string,
        searchDirs?: string[]
    ): ResolvedFilename {
        const normedRefFilename = referenceFilename.startsWith("file:")
            ? URI.parse(referenceFilename).fsPath
            : referenceFilename;
        const basePath = path.dirname(normedRefFilename);

        const fullImportDirs = this.importDir.map((dir) => {
            return path.isAbsolute(dir) ? dir : path.join(basePath, dir);
        });

        // figure out the search type
        let depName = (filename = filename.trim());
        let fileType = DependencySearchType.Local;
        if (depName !== (filename = testFilename(filename, '"', '"'))) {
            fileType = DependencySearchType.Local;
        } else if (depName !== (filename = testFilename(filename, "<", ">"))) {
            fileType = DependencySearchType.Global;
        }

        const filenameNormed = normalizeFilename(filename);

        const searchPaths = [
            basePath,
            ...fullImportDirs,
            ...(searchDirs ?? []),
        ];
        if (fileType === DependencySearchType.Global) {
            searchPaths.reverse();
        }

        if (filenameNormed.includes("/")) searchPaths.push(this.workspaceDir);

        const filesToCheck = searchPaths
            .map((p) => path.join(p, filenameNormed))
            .concat(
                ...searchPaths.map((p) => {
                    // remove extension from filename as a fallback
                    const parsedFn = path.parse(filenameNormed);
                    parsedFn.ext = "";
                    parsedFn.base = parsedFn.name;
                    return path.join(p, path.format(parsedFn));
                })
            );

        for (const depPath of filesToCheck) {
            if (fs.existsSync(depPath)) {
                const relPath = "/" + path.relative(this.workspaceDir, depPath);
                return {
                    filename: relPath,
                    fullPath: depPath,
                    type: fileType,
                };
            }
        }

        return {
            filename: filename,
            fullPath: undefined,
            type: undefined,
        };
    }

    public loadLpc(fileName: string, source?: string): SourceContext {
        this.parseAllCancel.cancel();
        this.parseAllCancel.dispose();
        this.parseAllCancel = new CancellationTokenSource();

        const depChain = new Set<string>();
        const context = this.loadLpcInternal(fileName, source, depChain, true);

        return context;
    }

    /**
     * Loads an LPC file into the context.
     * @param fileName filename to load
     * @param source source code to load (will be loaded from filesystem if not provided)
     * @param depChain dependency chain for this load sequence
     * @param restoreSoftRelease When true, will restore a soft-released file.
     * @returns SourceContext for the specified file
     */
    private loadLpcInternal(
        fileName: string,
        source: string = undefined,
        depChain: Set<string>,
        restoreSoftRelease = false
    ): SourceContext {
        fileName = normalizeFilename(fileName);

        this.scannedFiles.add(fileName);

        let contextEntry = this.getContextEntry(fileName);

        // are we going to need source?
        if (
            (!contextEntry ||
                (contextEntry.context.softReleased && restoreSoftRelease)) &&
            !source
        ) {
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

        if (!contextEntry) {
            // create new context
            const context = new SourceContext(
                this,
                fileName,
                (file) => this.getDriverPredefinedMacros(file),
                this.importDir,
                this.masterFile
            );

            // store the entry
            contextEntry = {
                context,
                refCount: 0,
                dependencies: [],
                references: new Set(),
                filename: fileName,
                id: randomInt(1000000),
                disposed: false,
            };

            this.sourceContexts.set(fileName, contextEntry);

            // Do an initial parse run and load all dependencies of this context
            // and pass their references to this context.
            context.setText(source);
            this.parseLpc(contextEntry, depChain);
        } else if (contextEntry.context.softReleased && restoreSoftRelease) {
            // set the text, which will trigger a reparse later
            contextEntry.context.setText(source);
        }

        contextEntry.refCount++;

        return contextEntry.context;
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
                this.sourceContexts.delete(normalizeFilename(fileName));

                // Release also all dependencies.
                for (const dep of contextEntry.dependencies) {
                    this.internalReleaseLpc(dep, contextEntry);
                }

                for (const ref of contextEntry.references) {
                    this.internalReleaseLpc(ref);
                }

                contextEntry.context.cleanup();
                contextEntry.disposed = true;
            } else if (
                !!this.workspaceDocs &&
                !this.workspaceDocs.get(
                    URI.file(contextEntry.filename).toString()
                )
            ) {
                // if the file is not open, soft release it
                contextEntry.context.softRelease();
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
                const isNewRef = !contextEntry.references.has(refFilename);
                contextEntry.references.add(refFilename);

                const depCtx = this.loadLpcInternal(
                    refFilename,
                    undefined,
                    new Set<string>()
                );
                const depContextEntry = this.getContextEntry(refFilename);
                if (depContextEntry && isNewRef) {
                    // only increment ref counter if this is a new reference
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
    public addDependency(
        filename: string,
        depFilename: string,
        symbol?: BaseSymbol,
        depChain: Set<string> = new Set()
    ) {
        try {
            const contextEntry = this.getContextEntry(filename);
            if (contextEntry) {
                const depContext = this.loadDependency(
                    contextEntry,
                    depFilename,
                    depChain
                );
                if (depContext) {
                    // increment ref counter for the dependency
                    const depContextEntry = this.getContextEntry(
                        depContext.fileName
                    );
                    depContextEntry.refCount++;

                    if (!!symbol) {
                        (symbol as IncludeSymbol).isLoaded = true;
                    }
                    contextEntry.context.addAsReferenceTo(depContext);

                    const depFile = depContext.fileName;
                    this.fileRefs.add(depFile, filename);
                }

                return depContext;
            }
        } catch (e) {
            console.log(
                `Error adding dependency ${depFilename} to ${filename}: ${e}`
            );
        }
    }

    /** parses an lpc file and updates references */
    private parseLpc(
        contextEntry: IContextEntry,
        depChain: Set<string>,
        reparseRefs: boolean = false
    ) {
        performance.mark("parse-lpc-start");

        const context = contextEntry.context;
        depChain.add(context.fileName);

        try {
            const oldDependencies = [...contextEntry.dependencies];
            const oldReferences = [
                ...context.getReferences().map((ref) => ref.fileName),
            ];
            const oldIncludes = [...context.info.includes];

            contextEntry.dependencies = [];

            // parse
            const info = context.parse(depChain);

            // info.imports doesn't need to be handled here
            // they are already loaded by the fileHandler in the details visitor

            const newIncludes = [...info.includes];
            const newReferences = [
                ...context.getReferences().map((ref) => ref.fileName),
            ];

            // update file references
            for (const ref of oldReferences.concat(oldDependencies)) {
                this.fileRefs.remove(ref, context.fileName);
            }
            for (const ref of newReferences) {
                this.fileRefs.add(ref, context.fileName);
            }

            // queue dependencies to reparse & run their diags
            if (reparseRefs) {
                // cancel a queued parse
                if (this.depReparseTimer) {
                    clearTimeout(this.depReparseTimer);
                }

                // cancel existing parse
                if (this.depReparseCancel) {
                    this.depReparseCancel.cancel();
                    this.depReparseCancel.dispose();
                }

                this.depReparseCancel = new CancellationTokenSource();

                // queue up new deps
                this.queueRefsForReparse(contextEntry.filename);

                // start delayed reparse timer
                this.depReparseTimer = setTimeout(() => {
                    this.reparseDependencyQueue();
                }, DEP_FILE_REPARSE_TIME);
            }

            // release old dependencies & references
            // if any of their ref counts becomes 0, they will be cleaned up
            for (const dep of oldDependencies.concat(oldReferences)) {
                this.releaseLpc(dep);
            }

            // update include file references
            for (const include of oldIncludes) {
                this.includeRefs.remove(include, context.fileName);
            }
            for (const include of newIncludes) {
                this.includeRefs.add(include, context.fileName);
            }
        } catch (e) {
            console.error(`Error parsing ${contextEntry.filename}: ${e}`, e);
        }

        depChain.delete(context.fileName);

        performance.mark("parse-lpc-end");
        // performance.measure(
        //     "parse-lpc: " + contextEntry.filename,
        //     "parse-lpc-start",
        //     "parse-lpc-end"
        // );
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

            // get first entry of depChain
            const firstDep = depChain.values().next().value;

            if (firstDep === depPath) {
                console.info(
                    `Skipping cyclic dependency from ${contextEntry.filename} -> ${depPath}`,
                    depChain
                );
                return undefined;
            }

            if (contextEntry.dependencies.includes(depPath)) {
                // already loaded
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

    public getContextEntry(fileName: string): IContextEntry {
        const ce = this.sourceContexts.get(normalizeFilename(fileName));
        return ce?.disposed === false ? ce : undefined;
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

    public async getDiagnostics(
        fileName: string,
        force = false
    ): Promise<IDiagnosticEntry[]> {
        const context = this.getContext(fileName);

        if (!!context) {
            return await context.getDiagnostics(force);
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
    public async listTopLevelSymbols(
        fileName: string,
        fullList: boolean
    ): Promise<ISymbolInfo[]> {
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
        const context = this.loadLpc(fileName);
        const ce = this.getContextEntry(fileName);
        if (context.needsCompile) this.parseLpc(ce, new Set(), false);

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

    public getHighlights(fileName: string, symbolName: string) {
        const context = this.getContext(fileName);
        return context?.getHighlights(symbolName);
    }

    /**
     * Add this file's refs, and all of their refs (recursively) to the reparse queue.
     * @param fileName
     */
    public queueRefsForReparse(fileName: string) {
        const ctx = this.getContextEntry(fileName);
        const refs = ctx?.context?.getReferences();
        while (refs.length > 0) {
            const ref = refs.pop();
            if (
                !this.depReparseQueue.has(ref.fileName) &&
                ref.fileName !== fileName
            ) {
                const refCtx = this.getContextEntry(ref.fileName);
                if (!refCtx) continue;

                // only the first-level refs need to be re-parsed in this situation
                //refs.push(...refCtx?.context?.getReferences());

                this.depReparseQueue.add(ref.fileName);
            }
        }
    }

    public reparseDependencyQueue() {
        // if (!this.depReparseCancel) {
        //     this.depReparseCancel = new CancellationTokenSource();
        // }

        const token = this.depReparseCancel.token;
        //const seen = new Set<string>();

        while (
            this.depReparseQueue.size > 0 &&
            !token.isCancellationRequested
        ) {
            const depsItr = this.depReparseQueue.values();
            const depEntry = depsItr?.next();

            if (depEntry.done) break;
            else if (!depEntry.value) continue;

            const dep = depEntry.value;
            this.depReparseQueue.delete(dep);

            // so that we only process each dep once per reparse
            // if (seen.has(dep)) continue;
            // seen.add(dep);

            const ctx = this.getContextEntry(dep);
            if (!ctx) continue;

            console.debug(`Reparse ${dep} (${ctx?.id})`);

            if (ctx) {
                //this.parseLpc(ctx, new Set(), false);
            }

            // send a notification to the server to re-send diags for this doc
            if (!!this.onRunDiagnostics) this.onRunDiagnostics(dep, true);

            break; // only process one at a time
        }

        if (this.depReparseQueue.size == 0 || token.isCancellationRequested) {
            // do nothing
        } else {
            this.depReparseTimer = setTimeout(() => {
                this.reparseDependencyQueue();
            }, DEP_FILE_REPARSE_WORKTIME);
        }
    }

    public async parseAllIfNeeded() {
        if (!this.parseAllComplete) {
            await this.parseAllFiles();
        }
    }

    private async queueInitFilesForParse() {
        const config = ensureLpcConfig();
        const excludeFiles = await getExcludes(this.workspaceDir);
        // add master file
        // const masterFileInfo = this.resolveFilename(
        //     config.files.master,
        //     this.workspaceDir
        // );
        // if (!excludeFiles.has(masterFileInfo.fullPath)) {
        //     if (fs.existsSync(masterFileInfo.fullPath)) {
        //         this.parseAllFileQueue.push(masterFileInfo.fullPath);
        //     }
        // }
        // add files from init_files
        config.files.init_files.forEach((initFile) => {
            const fileInfo = this.resolveFilename(initFile, this.workspaceDir);
            if (!fileInfo.fullPath) return;

            const initFileSource = fs.readFileSync(fileInfo.fullPath, "utf8");
            const lines = initFileSource.split("\n");
            for (const line of lines) {
                const l = line.trim();
                if (l.length == 0 || l.startsWith("#")) continue;
                const lineFileInfo = this.resolveFilename(l, fileInfo.fullPath);
                if (
                    lineFileInfo.fullPath &&
                    fs.existsSync(lineFileInfo.fullPath) &&
                    !excludeFiles.has(lineFileInfo.fullPath)
                ) {
                    this.parseAllFileQueue.push(lineFileInfo.fullPath);
                }
            }
        });
    }

    private async doParseAll() {
        const token = this.parseAllCancel.token;
        const { parseAllFileQueue } = this;

        token.onCancellationRequested(() => {
            // requeue after some time
            if (this.parseAllFileQueue.length > 0) {
                setTimeout(() => {
                    this.doParseAll();
                }, TIME_BETWEEN_REPARSE);
            }
        });

        this.onProcessingEvent.emit("start", parseAllFileQueue);

        while (parseAllFileQueue.length > 0 && !token.isCancellationRequested) {
            const filename = parseAllFileQueue.shift();

            if (this.scannedFiles.has(filename)) {
                continue;
            }
            this.parseAllCount++;

            const p = new Promise((resolve, reject) => {
                fs.readFile(
                    filename,
                    { encoding: "utf8" },
                    async (err, txt) => {
                        try {
                            const ctx = this.loadLpcInternal(
                                filename,
                                txt,
                                new Set()
                            );

                            if (!!this.onRunDiagnostics) {
                                await this.onRunDiagnostics(filename, false);
                            }

                            this.releaseLpc(filename);
                            resolve(txt);
                        } catch (e) {
                            console.error(
                                `Error parsing ${filename}: ${e}`,
                                (e as Error).stack
                            );
                            resolve(undefined);
                        }
                    }
                );
            });

            p.finally(() => {
                this.scannedFiles.add(filename);
            });
            await p;
        }

        if (token.isCancellationRequested) {
            console.debug("Parse all cancelled");
        }

        this.onProcessingEvent.emit(
            "stop",
            parseAllFileQueue,
            this.parseAllCount
        );
    }

    public async parseAllFiles() {
        const timeStart = performance.now();

        this.parseAllComplete = false;
        this.queueInitFilesForParse();
        const token = this.parseAllCancel.token;

        const dirsToProcess = [this.workspaceDir];
        const { parseAllFileQueue } = this;
        const excludeFiles = await getExcludes(this.workspaceDir);

        // now process everything else
        while (dirsToProcess.length > 0 && !token.isCancellationRequested) {
            const dir = dirsToProcess.pop();
            const files = fs.readdirSync(dir, { withFileTypes: true });

            for (const file of files) {
                if (token.isCancellationRequested) break;

                const filename = path.join(dir, file.name);
                if (file.isDirectory()) {
                    if (excludeFiles.has(filename)) {
                        console.debug(
                            `Skipping dir ${filename} due to exclusion`
                        );
                    } else {
                        dirsToProcess.push(filename);
                    }
                } else if (file.name.endsWith(".c")) {
                    if (excludeFiles.has(filename)) {
                        console.debug(`Skipping ${filename} due to exclusion`);
                        continue;
                    }

                    parseAllFileQueue.push(filename);
                }
            }
        }

        await this.doParseAll();

        this.parseAllComplete = true;
        const timeEnd = performance.now();
        console.log(
            `Parsed all files in ${timeEnd - timeStart} ms`,
            this.sourceContexts.size
        );
    }

    public getDriverPredefinedMacros(filename: string): Map<string, string> {
        const config = ensureLpcConfig();

        // add macros from config
        const configDefines = new Map(config.defines ?? []);
        const ver = DriverVersion.from(config.driver.version);
        configDefines.set("__VERSION__", `"${config.driver.version}"`);
        configDefines.set("__VERSION_MAJOR__", ver.major.toString());
        configDefines.set("__VERSION_MINOR__", ver.minor.toString());
        configDefines.set("__VERSION_MICRO__", ver.micro.toString());
        configDefines.set("__VERSION_PATCH__", "0");
        configDefines.set("__RESET_TIME__", "1");

        // get the dir of this file relative to project root
        const relativeDir = path.relative(this.workspaceDir, filename);
        const fileDir = path.dirname(relativeDir);
        configDefines.set("__DIR__", `"/${fileDir}/"`);
        configDefines.set("__FILE__", `"${relativeDir}"`);

        const globalInclude = config.files.global_include;
        if (globalInclude?.length > 0) {
            // resolve the global filename

            const globalFilename = this.resolveFilename(
                globalInclude,
                filename
            );
            if (
                filename !== globalFilename.fullPath &&
                !filename.endsWith(".h")
            ) {
                configDefines.set("__GLOBAL_INCLUDE__", `"${globalInclude}"`);
            }
        }

        return configDefines;
    }

    public getMasterFile() {
        return this.masterFile;
    }
}

async function getExcludes(workspaceDir: string): Promise<Set<string>> {
    const config = ensureLpcConfig();

    const globExcludes =
        config.exclude?.length > 0
            ? await glob.glob(config.exclude, {
                  cwd: workspaceDir,
                  root: workspaceDir,
                  matchBase: true,
              })
            : [];

    const excludeFiles = new Set(
        globExcludes.map((f) =>
            f.toLowerCase().startsWith(workspaceDir.toLowerCase())
                ? f
                : path.join(workspaceDir, f)
        )
    );

    return excludeFiles;
}

/**
 * Get a a list of all LPC files in this project, minus any excludes
 * @param workspaceDir
 * @param token
 * @returns
 */
export async function getProjectFiles(
    workspaceDir: string,
    token: CancellationToken = CancellationToken.None
): Promise<readonly string[]> {
    const stack: string[] = [];
    const dirsToProcess = [workspaceDir];
    const excludeFiles = await getExcludes(workspaceDir);

    // now process everything else
    while (dirsToProcess.length > 0 && !token?.isCancellationRequested) {
        const dir = dirsToProcess.pop();
        const promise = new Promise<void>((resolve, reject) => {
            fs.readdir(dir, { withFileTypes: true }, (err, files) => {
                for (const file of files) {
                    if (token.isCancellationRequested) break;

                    const filename = path.join(dir, file.name);
                    if (file.isDirectory()) {
                        if (excludeFiles.has(filename)) {
                            // skip
                        } else {
                            dirsToProcess.push(filename);
                        }
                    } else if (file.name.endsWith(".c")) {
                        if (excludeFiles.has(filename)) {
                            continue;
                        }

                        stack.push(filename);
                    }
                }

                resolve();
            });
        });

        await promise;
    }

    return stack;
}
