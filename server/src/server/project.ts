import * as lpc from "./_namespaces/lpc.js";
import { addRange, append, arrayFrom, CachedDirectoryStructureHost, clearMap, closeFileWatcher, CompilerHost, CompilerOptions, createCacheableExportInfoMap, createLanguageService, createLpcFileHandler, createResolutionCache, Debug, Diagnostic, DirectoryStructureHost, DirectoryWatcherCallback, DocumentRegistry, explainFiles, ExportInfoMap, FileWatcher, FileWatcherCallback, FileWatcherEventKind, filter, flatMap, forEach, forEachKey, GetCanonicalFileName, getDefaultLibFileName, getDefaultLibFolder, getDirectoryPath, getNormalizedAbsolutePath, getOrUpdate, HasInvalidatedLibResolutions, HasInvalidatedResolutions, IScriptSnapshot, isExternalModuleNameRelative, JSDocParsingMode, LanguageService, LanguageServiceHost, LanguageServiceMode, maybeBind, ModuleResolutionCache, ModuleResolutionHost, noopFileWatcher, normalizePath, ParsedCommandLine, parsePackageName, Path, PerformanceEvent, PollingInterval, Program, ProgramUpdateLevel, ProjectReference, ResolutionCache, resolutionExtensionIsTSOrJson, ResolvedModuleWithFailedLookupLocations, ResolvedProjectReference, returnFalse, returnTrue, sortAndDeduplicate, SortedReadonlyArray, SourceFile, SourceMapper, StringLiteralLike, StructureIsReused, ThrottledCancellationToken, timestamp, toPath, tracing, tryGetLocalizedLibPath, TypeAcquisition, updateErrorForNoInputFiles, updateMissingFilePathsWatch, WatchDirectoryFlags, WatchOptions, WatchType } from "./_namespaces/lpc.js";
import { asNormalizedPath, emptyArray, Errors, HostCancellationToken, LogLevel, NormalizedPath, ProjectService, ScriptInfo, updateProjectIfDirty } from "./_namespaces/lpc.server.js";


/**
 * The project root can be script info - if root is present,
 * or it could be just normalized path if root wasn't present on the host(only for non inferred project)
 *
 * @internal
 */
export interface ProjectRootFile {
    fileName: NormalizedPath;
    info?: ScriptInfo;
}

export enum ProjectKind {
    Inferred,
    Configured,
    External,
    AutoImportProvider,
    Auxiliary,
}

export abstract class Project implements LanguageServiceHost, ModuleResolutionHost, lpc.LpcFileHandlerHost {
    private rootFilesMap = new Map<Path, ProjectRootFile>();
    private program: Program | undefined;
    private externalFiles: SortedReadonlyArray<string> | undefined;
    private missingFilesMap: Map<Path, FileWatcher> | undefined;
    //private generatedFilesMap: GeneratedFileWatcherMap | undefined;

    /**
     * This is map from files to unresolved imports in it
     * Maop does not contain entries for files that do not have unresolved imports
     * This helps in containing the set of files to invalidate
     *
     * @internal
     */
    cachedUnresolvedImportsPerFile = new Map<Path, readonly string[]>();
    /** @internal */
    lastCachedUnresolvedImportsList: SortedReadonlyArray<string> | undefined;
    private hasAddedorRemovedFiles = false;
    private hasAddedOrRemovedSymlinks = false;

    /** @internal */
    readonly projectName: string;

    /** @internal */
    lastFileExceededProgramSize: string | undefined;

    // wrapper over the real language service that will suppress all semantic operations
    protected languageService: LanguageService;

    public languageServiceEnabled: boolean;

    readonly trace?: (s: string) => void;
    readonly realpath?: (path: string) => string;

    
    /** @internal */
    hasInvalidatedResolutions?: HasInvalidatedResolutions | undefined;

    /** @internal */
    hasInvalidatedLibResolutions: HasInvalidatedLibResolutions | undefined;

    /** @internal */
    resolutionCache: ResolutionCache;

    //private builderState: BuilderState | undefined;
    /**
     * Set of files names that were updated since the last call to getChangesSinceVersion.
     */
    private updatedFileNames: Set<string> | undefined;
    /**
     * Set of files that was returned from the last call to getChangesSinceVersion.
     */
    private lastReportedFileNames: Map<string, boolean> | undefined;
    /**
     * Last version that was reported.
     */
    private lastReportedVersion = 0;
    /**
     * Current project's program version. (incremented everytime new program is created that is not complete reuse from the old one)
     * This property is changed in 'updateGraph' based on the set of files in program
     * @internal
     */
    projectProgramVersion = 0;
    /**
     * Current version of the project state. It is changed when:
     * - new root file was added/removed
     * - edit happen in some file that is currently included in the project.
     * This property is different from projectStructureVersion since in most cases edits don't affect set of files in the project
     * @internal
     */
    projectStateVersion = 0;

    protected projectErrors: Diagnostic[] | undefined;

    protected isInitialLoadPending: () => boolean = returnFalse;

    /** @internal */
    dirty = false;

    /** @internal */
    typingFiles: SortedReadonlyArray<string> = emptyArray;    

    /** @internal */
    originalConfiguredProjects: Set<NormalizedPath> | undefined;

    /** @internal */
    getResolvedProjectReferenceToRedirect(_fileName: string): ResolvedProjectReference | undefined {
        return undefined;
    }

    /** @internal */ useSourceOfProjectReferenceRedirect?(): boolean;
    /** @internal */ getParsedCommandLine?(fileName: string): ParsedCommandLine | undefined;

    private readonly cancellationToken: ThrottledCancellationToken;

    /** @internal */
    public directoryStructureHost: DirectoryStructureHost;
    
    /** @internal */
    readonly currentDirectory: string;

    private exportMapCache: ExportInfoMap | undefined;
    private changedFilesForExportMapCache: Set<Path> | undefined;
    
    /** @internal */
    protected typeAcquisition: TypeAcquisition | undefined;

    /** @internal */
    deferredClose?: boolean;

    /** @internal */
    configDiagDiagnosticsReported?: number;

    /** @internal */
    triggerFileForConfigFileDiag?: NormalizedPath;

    fileHandler: lpc.LpcFileHandler;    

    readonly jsDocParsingMode: JSDocParsingMode | undefined;
    
    constructor(
        projectName: string,
        readonly projectKind: ProjectKind,
        readonly projectService: ProjectService,
        private documentRegistry: DocumentRegistry,
        hasExplicitListOfFiles: boolean,
        lastFileExceededProgramSize: string | undefined,
        private compilerOptions: CompilerOptions,
        public compileOnSaveEnabled: boolean,
        protected watchOptions: WatchOptions | undefined,
        directoryStructureHost: DirectoryStructureHost,
        currentDirectory: string
    ) {
        this.projectName = projectName;
        this.currentDirectory = this.projectService.getNormalizedAbsolutePath(currentDirectory);
        this.directoryStructureHost = directoryStructureHost;
        this.getCanonicalFileName = this.projectService.toCanonicalFileName;
        this.jsDocParsingMode = this.projectService.jsDocParsingMode;

        this.cancellationToken = new ThrottledCancellationToken(this.projectService.cancellationToken, this.projectService.throttleWaitMilliseconds);

        const host = this.projectService.host;
        this.realpath = maybeBind(host, host.realpath);

        // Use the current directory as resolution root only if the project created using current directory string
        this.resolutionCache = createResolutionCache(
            this,
            this.currentDirectory,
            /*logChangesWhenResolvingModule*/ true,
        );
        
        const fileHandler = this.fileHandler = createLpcFileHandler({
            getCurrentDirectory: this.getCurrentDirectory,
            fileExists: this.fileExists,
            readFile: this.readFile,
            getIncludeDirs: (filename) => this.program.getIncludeDirs(filename),
            getCompilerOptions: () => this.compilerOptions,
        });                
        this.languageService = createLanguageService(this, fileHandler, this.documentRegistry, this.projectService.serverMode);
        if (lastFileExceededProgramSize) {
            this.disableLanguageService(lastFileExceededProgramSize);
        }
        this.markAsDirty();
        if (!isBackgroundProject(this)) {
            this.projectService.pendingEnsureProjectForOpenFiles = true;
        }
        this.projectService.onProjectCreation(this);
    }

    /** @internal */
    resolveModuleNameLiterals(moduleLiterals: readonly StringLiteralLike[], containingFile: string, redirectedReference: ResolvedProjectReference | undefined, options: CompilerOptions, containingSourceFile: SourceFile, reusedNames: readonly StringLiteralLike[] | undefined): readonly ResolvedModuleWithFailedLookupLocations[] {
        return this.resolutionCache.resolveModuleNameLiterals(moduleLiterals, containingFile, redirectedReference, options, containingSourceFile, reusedNames);
    }

    /** @internal */
    getModuleResolutionCache(): ModuleResolutionCache | undefined {
        return this.resolutionCache.getModuleResolutionCache();
    }
    
    disableLanguageService(lastFileExceededProgramSize?: string) {
        if (!this.languageServiceEnabled) {
            return;
        }
        Debug.assert(this.projectService.serverMode !== LanguageServiceMode.Syntactic);
        this.languageService.cleanupSemanticCache();
        this.languageServiceEnabled = false;
        this.cleanupProgram();
        this.lastFileExceededProgramSize = lastFileExceededProgramSize;
        // this.builderState = undefined;
        // if (this.autoImportProviderHost) {
        //     this.autoImportProviderHost.close();
        // }
        // this.autoImportProviderHost = undefined;
        // this.resolutionCache.closeTypeRootsWatch();
        // this.clearGeneratedFileWatch();
        this.projectService.verifyDocumentRegistry();
        this.projectService.onUpdateLanguageServiceStateForProject(this, /*languageServiceEnabled*/ false);
    }

    /** @internal */
    fileIsOpen(filePath: Path) {
        return this.projectService.openFiles.has(filePath);
    }

    /** @internal */
    getParseableFiles(): Set<lpc.Path> {
        return this.projectService.shouldParse;
    }

    /** @internal */
    scheduleInvalidateResolutionsOfFailedLookupLocations() {
        this.projectService.throttledOperations.schedule(`${this.getProjectName()}FailedLookupInvalidation`, /*delay*/ 1000, () => {
            if (this.resolutionCache.invalidateResolutionsOfFailedLookupLocations()) {
                this.projectService.delayUpdateProjectGraphAndEnsureProjectStructureForOpenFiles(this);
            }
        });
    }

    getIncludeDirs(): string[] {
        return this.compilerOptions?.libIncludeDirs || [];
    }

    /** @internal */
    onChangedAutomaticTypeDirectiveNames() {
        this.projectService.delayUpdateProjectGraphAndEnsureProjectStructureForOpenFiles(this);
    }

    /** @internal */
    public readonly getCanonicalFileName: GetCanonicalFileName;
    
    /**
     * Get all the project errors
     */
    getAllProjectErrors(): readonly Diagnostic[] {
        return this.projectErrors || emptyArray;
    }

    getConfigFilePath() {
        return asNormalizedPath(this.getProjectName());
    }
    
    // Method of LanguageServiceHost
    getCompilationSettings() {
        return this.compilerOptions;
    }

    // Method to support public API
    getCompilerOptions() {
        return this.getCompilationSettings();
    }

    getNewLine() {
        return "\n";
        //return this.projectService.host.newLine;
    }

    getProjectVersion() {
        return this.projectStateVersion.toString();
    }

    getScriptInfo(uncheckedFileName: string) {
        return this.projectService.getScriptInfo(uncheckedFileName);
    }
    
    getRootScriptInfos() {
        return arrayFrom(lpc.mapDefinedIterator(this.rootFilesMap.values(), value => value.info));
    }

    getProjectReferences(): readonly ProjectReference[] | undefined {
        return undefined;
    }

    getProjectName() {
        return this.projectName;
    }
    
    /** @internal */
    markAutoImportProviderAsDirty() {
        console.debug("todo - markAutoImportProviderAsDirty");
        // if (!this.autoImportProviderHost) this.autoImportProviderHost = undefined;
        // this.autoImportProviderHost?.markAsDirty();
    }

    /** @internal */
    watchTypeRootsDirectory(directory: string, cb: DirectoryWatcherCallback, flags: WatchDirectoryFlags) {
        return this.projectService.watchFactory.watchDirectory(
            directory,
            cb,
            flags,
            this.projectService.getWatchOptions(this),
            WatchType.TypeRoots,
            this,
        );
    }

    /** @internal */
    watchDirectoryOfFailedLookupLocation(directory: string, cb: DirectoryWatcherCallback, flags: WatchDirectoryFlags) {
        return this.projectService.watchFactory.watchDirectory(
            directory,
            cb,
            flags,
            this.projectService.getWatchOptions(this),
            WatchType.FailedLookupLocations,
            this,
        );
    }
    
    onAllFilesNeedReparse(fileNames: string[]): void {
        this.writeLog(`Reparse ${fileNames.length} files triggered for project: ${this.getProjectName()}`);
        fileNames.forEach(fileName => {
            this.getScriptInfo(fileName)?.incrementVersion();
        });        
    }

    getScriptFileNames() {
        if (!this.rootFilesMap.size) {
            return lpc.emptyArray;
        }

        let result: string[] | undefined;
        this.rootFilesMap.forEach(value => {
            if (this.languageServiceEnabled || (value.info && value.info.isScriptOpen())) {
                // if language service is disabled - process only files that are open
                (result || (result = [])).push(value.fileName);
            }
        });

        return addRange(result, this.typingFiles) || lpc.emptyArray;
    }

    isClosed() {
        return this.rootFilesMap === undefined;
    }

    hasRoots() {
        return !!this.rootFilesMap?.size;
    }

    /** @internal */
    getCurrentProgram(): Program | undefined {
        return this.program;
    }

    /** @internal */
    toPath(fileName: string) {
        return toPath(fileName, this.currentDirectory, this.projectService.toCanonicalFileName);
    }
    
    /** @internal */
    markAsDirty() {
        if (!this.dirty) {
            this.projectStateVersion++;
            this.dirty = true;
        }
    }

    setTypeAcquisition(newTypeAcquisition: TypeAcquisition | undefined): void {
        // TODO - implement this
        // if (newTypeAcquisition) {
        //     this.typeAcquisition = this.removeLocalTypingsFromTypeAcquisition(newTypeAcquisition);
        // }
    }

    /** @internal */
    onInvalidatedResolution() {
        this.projectService.delayUpdateProjectGraphAndEnsureProjectStructureForOpenFiles(this);
    }

    enableLanguageService() {
        if (this.languageServiceEnabled || this.projectService.serverMode === LanguageServiceMode.Syntactic) {
            return;
        }
        this.languageServiceEnabled = true;
        this.lastFileExceededProgramSize = undefined;
        this.projectService.onUpdateLanguageServiceStateForProject(this, /*languageServiceEnabled*/ true);
    }
    
    // add a root file to project
    addRoot(info: ScriptInfo, fileName?: NormalizedPath) {
        Debug.assert(!this.isRoot(info));
        this.rootFilesMap.set(info.path, { fileName: fileName || info.fileName, info });
        info.attachToProject(this);

        this.markAsDirty();
    }

    
    /** @internal */
    getCachedExportInfoMap() {
        return this.exportMapCache ||= createCacheableExportInfoMap(this);
    }

    /** @internal */
    clearCachedExportInfoMap() {
        this.exportMapCache?.clear();
    }
    
    /** @internal */
    clearSourceMapperCache() {
        //this.languageService.clearSourceMapperCache();
    }

    /** @internal */
    getPackageJsonAutoImportProvider(): Program | undefined {
        console.debug("todo - getPackageJsonAutoImportProvider");
        return undefined;
    }

    /** @internal */
    getGlobalTypingsCacheLocation() {
        console.debug("todo - getGlobalTypingsCacheLocation");
        return undefined;
        // return this.getGlobalCache();
    }

    getLanguageService(ensureSynchronized = true): LanguageService {
        if (ensureSynchronized) {
            updateProjectIfDirty(this);
        }
        return this.languageService;
    }

    /** @internal */
    getSourceMapper(): SourceMapper {
        return this.getLanguageService().getSourceMapper();
    }

    setCompilerOptions(compilerOptions: CompilerOptions) {
        if (compilerOptions) {
            // compilerOptions.allowNonTsExtensions = true;
            const oldOptions = this.compilerOptions;
            this.compilerOptions = compilerOptions;
            // this.setInternalCompilerOptionsForEmittingJsFiles();
            // this.noDtsResolutionProject?.setCompilerOptions(this.getCompilerOptionsForNoDtsResolutionProject());
            // TODO - implement this
            // if (changesAffectModuleResolution(oldOptions, compilerOptions)) {
            //     // reset cached unresolved imports if changes in compiler options affected module resolution
                this.cachedUnresolvedImportsPerFile.clear();
                this.lastCachedUnresolvedImportsList = undefined;
            //     this.resolutionCache.onChangesAffectModuleResolution();
            //     this.moduleSpecifierCache.clear();
            // }
            this.markAsDirty();
        }
    }

    /** @internal */
    setWatchOptions(watchOptions: WatchOptions | undefined) {
        this.watchOptions = watchOptions;
    }

    /** @internal */
    getWatchOptions(): WatchOptions | undefined {
        return this.watchOptions;
    }

    /** @internal */
    watchAffectingFileLocation(file: string, cb: FileWatcherCallback) {
        return this.projectService.watchFactory.watchFile(
            file,
            cb,
            PollingInterval.High,
            this.projectService.getWatchOptions(this),
            WatchType.AffectingFileLocation,
            this,
        );
    }

    hasConfigFile(configFilePath: NormalizedPath) {
        if (this.program && this.languageServiceEnabled) {
            const configFile = this.program.getCompilerOptions().configFile;
            if (configFile) {
                if (configFilePath === asNormalizedPath(configFile.fileName)) {
                    return true;
                }
                // if (configFile.extendedSourceFiles) {
                //     for (const f of configFile.extendedSourceFiles) {
                //         if (configFilePath === asNormalizedPath(f)) {
                //             return true;
                //         }
                //     }
                // }
            }
        }
        return false;
    }

    getRootFiles(): NormalizedPath[] {
        return this.rootFilesMap && arrayFrom(lpc.mapDefinedIterator(this.rootFilesMap.values(), value => value.info?.fileName));
    }

    getFileNames(excludeFilesFromExternalLibraries?: boolean, excludeConfigFiles?: boolean) {
        if (!this.program) {
            return [];
        }

        if (!this.languageServiceEnabled) {
            // if language service is disabled assume that all files in program are root files + default library
            let rootFiles = this.getRootFiles();
            if (this.compilerOptions) {
                // const defaultLibrary = getDefaultLibFilePath(this.compilerOptions);
                // if (defaultLibrary) {
                //     (rootFiles || (rootFiles = [])).push(asNormalizedPath(defaultLibrary));
                // }
            }
            return rootFiles;
        }
        const result: NormalizedPath[] = [];
        for (const f of this.program.getSourceFiles()) {
            // if (excludeFilesFromExternalLibraries && this.program.isSourceFileFromExternalLibrary(f)) {
            //     continue;
            // }
            result.push(asNormalizedPath(f.fileName));
        }
        if (!excludeConfigFiles) {
            const configFile = this.program.getCompilerOptions().configFile;
            if (configFile) {
                result.push(asNormalizedPath(configFile.fileName));
                // if (configFile.extendedSourceFiles) {
                //     for (const f of configFile.extendedSourceFiles) {
                //         result.push(asNormalizedPath(f));
                //     }
                // }
            }
        }
        return result;
    }

    private getOrCreateScriptInfoAndAttachToProject(fileName: string) {
        const scriptInfo = this.projectService.getOrCreateScriptInfoNotOpenedByClient(
            fileName,
            this.currentDirectory,
            this.directoryStructureHost,
            /*deferredDeleteOk*/ false,
        );
        if (scriptInfo) {
            const existingValue = this.rootFilesMap.get(scriptInfo.path);
            if (existingValue && existingValue.info !== scriptInfo) {
                // This was missing path earlier but now the file exists. Update the root
                existingValue.info = scriptInfo;
            }
            scriptInfo.attachToProject(this);
        }
        return scriptInfo;
    }

    getScriptKind(fileName: string) {
        const info = this.projectService.getScriptInfoForPath(this.toPath(fileName));
        return (info && info.scriptKind)!; // TODO: GH#18217
    }

    getScriptVersion(filename: string) {
        // Don't attach to the project if version is asked

        const info = this.projectService.getOrCreateScriptInfoNotOpenedByClient(
            filename,
            this.currentDirectory,
            this.directoryStructureHost,
            /*deferredDeleteOk*/ false,
        );
        return (info && info.getLatestVersion())!; // TODO: GH#18217
    }

    getScriptSnapshot(filename: string): IScriptSnapshot | undefined {
        const scriptInfo = this.getOrCreateScriptInfoAndAttachToProject(filename);
        if (scriptInfo) {
            return scriptInfo.getSnapshot();
        }
    }

    getCancellationToken(): HostCancellationToken {
        return this.cancellationToken;
    }

    getCurrentDirectory(): string {
        return this.currentDirectory;
    }

    getDefaultLibFileName() {
        const nodeModuleBinDir = getDirectoryPath(normalizePath(this.projectService.getExecutingFilePath()));
        // todo add localized stuff here
        return tryGetLocalizedLibPath(this.compilerOptions);
        // return combinePaths(nodeModuleBinDir, getDefaultLibFolder(this.compilerOptions), getDefaultLibFileName(this.compilerOptions));
    }

    useCaseSensitiveFileNames() {
        return this.projectService.host.useCaseSensitiveFileNames;
    }

    readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[] {
        return this.directoryStructureHost.readDirectory!(path, extensions, exclude, include, depth);
    }

    readFile(fileName: string): string | undefined {
        return this.projectService.host.readFile(fileName);
    }

    writeFile(fileName: string, content: string): void {
        return this.projectService.host.writeFile(fileName, content);
    }

    fileExists(file: string): boolean {
        // As an optimization, don't hit the disks for files we already know don't exist
        // (because we're watching for their creation).
        const path = this.toPath(file);
        return !this.isWatchedMissingFile(path) && this.directoryStructureHost.fileExists(file);
    }

    /**
     * Get the errors that dont have any file name associated
     */
    getGlobalProjectErrors(): readonly Diagnostic[] {
        return filter(this.projectErrors, diagnostic => !diagnostic.file) || emptyArray;
    }

    setProjectErrors(projectErrors: Diagnostic[] | undefined) {
        this.projectErrors = projectErrors;
    }

    private isWatchedMissingFile(path: Path) {
        return !!this.missingFilesMap && this.missingFilesMap.has(path);
    }

    /** @internal */
    invalidateResolutionsOfFailedLookupLocations() {
        if (
            this.clearInvalidateResolutionOfFailedLookupTimer() &&
            this.resolutionCache.invalidateResolutionsOfFailedLookupLocations()
        ) {
            this.markAsDirty();
            this.projectService.delayEnsureProjectForOpenFiles();
        }
    }

    /** @internal */
    clearInvalidateResolutionOfFailedLookupTimer() {
        return this.projectService.throttledOperations.cancel(`${this.getProjectName()}FailedLookupInvalidation`);
    }
 
    /** @internal */
    onFileAddedOrRemoved(isSymlink: boolean | undefined) {
        this.hasAddedorRemovedFiles = true;
        if (isSymlink) {
            this.hasAddedOrRemovedSymlinks = true;
        }
    }

    /** @internal */
    getCachedDirectoryStructureHost(): CachedDirectoryStructureHost {
        return undefined!; // TODO: GH#18217
    }

    /** @internal */
    getRootFilesMap() {
        return this.rootFilesMap;
    }

    isRoot(info: ScriptInfo) {
        return this.rootFilesMap?.get(info.path)?.info === info;
    }

    // remove a root file from project
    protected removeRoot(info: ScriptInfo): void {
        this.rootFilesMap.delete(info.path);
    }

    removeFile(info: ScriptInfo, fileExists: boolean, detachFromProject: boolean) {
        if (this.isRoot(info)) {
            this.removeRoot(info);
        }
        if (fileExists) {
            // If file is present, just remove the resolutions for the file
            this.resolutionCache.removeResolutionsOfFile(info.path);
        }
        else {
            this.resolutionCache.invalidateResolutionOfFile(info.path);
        }
        this.cachedUnresolvedImportsPerFile.delete(info.path);

        if (detachFromProject) {
            info.detachFromProject(this);
        }

        this.markAsDirty();
    }

    // add a root file that doesnt exist on host
    addMissingFileRoot(fileName: NormalizedPath) {
        const path = this.projectService.toPath(fileName);
        this.rootFilesMap.set(path, { fileName });
        this.markAsDirty();
    }
    
    /** @internal */
    updateFromProjectInProgress = false;

    /** @internal */
    updateFromProject() {
        updateProjectIfDirty(this);
    }
    
    getTypeAcquisition() {
        return this.typeAcquisition || {};
    }

    /**
     * Updates set of files that contribute to this project
     * @returns: true if set of files in the project stays the same and false - otherwise.
     */
    updateGraph(): boolean {        
        tracing?.push(tracing.Phase.Session, "updateGraph", { name: this.projectName, kind: ProjectKind[this.projectKind] });
        this.resolutionCache.startRecordingFilesWithChangedResolutions();

        const hasNewProgram = this.updateGraphWorker();
        const hasAddedorRemovedFiles = this.hasAddedorRemovedFiles;
        this.hasAddedorRemovedFiles = false;
        this.hasAddedOrRemovedSymlinks = false;

        const changedFiles: readonly Path[] = this.resolutionCache.finishRecordingFilesWithChangedResolutions() || emptyArray;

        for (const file of changedFiles) {
            // delete cached information for changed files
            this.cachedUnresolvedImportsPerFile.delete(file);
        }

        // update builder only if language service is enabled
        // otherwise tell it to drop its internal state
        if (this.languageServiceEnabled && this.projectService.serverMode === LanguageServiceMode.Semantic && !this.isOrphan()) {
            // 1. no changes in structure, no changes in unresolved imports - do nothing
            // 2. no changes in structure, unresolved imports were changed - collect unresolved imports for all files
            // (can reuse cached imports for files that were not changed)
            // 3. new files were added/removed, but compilation settings stays the same - collect unresolved imports for all new/modified files
            // (can reuse cached imports for files that were not changed)
            // 4. compilation settings were changed in the way that might affect module resolution - drop all caches and collect all data from the scratch
            if (hasNewProgram || changedFiles.length) {
                this.lastCachedUnresolvedImportsList = getUnresolvedImports(this.program!, this.cachedUnresolvedImportsPerFile);
            }

            //this.enqueueInstallTypingsForProject(hasAddedorRemovedFiles);
        }
        else {
            this.lastCachedUnresolvedImportsList = undefined;
        }

        const isFirstProgramLoad = this.projectProgramVersion === 0 && hasNewProgram;
        if (hasNewProgram) {
            this.projectProgramVersion++;
        }
        if (hasAddedorRemovedFiles) {
            this.markAutoImportProviderAsDirty();
        }
        if (isFirstProgramLoad) {
            // Preload auto import provider so it's not created during completions request
            // this.getPackageJsonAutoImportProvider();
        }
        tracing?.pop();
        return !hasNewProgram;
    }   

    close() {
        // this.projectService.typingsCache.onProjectClosed(this);
        // this.closeWatchingTypingLocations();
        // if we have a program - release all files that are enlisted in program but arent root
        // The releasing of the roots happens later
        // The project could have pending update remaining and hence the info could be in the files but not in program graph
        this.cleanupProgram();
        // Release external files
        forEach(this.externalFiles, externalFile => this.detachScriptInfoIfNotRoot(externalFile));
        // Always remove root files from the project
        this.rootFilesMap.forEach(root => root.info?.detachFromProject(this));
        this.projectService.pendingEnsureProjectForOpenFiles = true;

        this.rootFilesMap = undefined!;
        this.externalFiles = undefined;
        this.program = undefined;
        // this.builderState = undefined;
        this.resolutionCache.clear();
        this.resolutionCache = undefined!;
        this.cachedUnresolvedImportsPerFile = undefined!;
        // this.packageJsonWatches?.forEach(watcher => {
        //     watcher.projects.delete(this);
        //     watcher.close();
        // });
        // this.packageJsonWatches = undefined;
        // this.moduleSpecifierCache.clear();
        // this.moduleSpecifierCache = undefined!;
        this.directoryStructureHost = undefined!;
        this.exportMapCache = undefined;
        this.projectErrors = undefined;
        // this.plugins.length = 0;

        // Clean up file watchers waiting for missing files
        if (this.missingFilesMap) {
            clearMap(this.missingFilesMap, closeFileWatcher);
            this.missingFilesMap = undefined;
        }
        // this.clearGeneratedFileWatch();
        this.clearInvalidateResolutionOfFailedLookupTimer();
        // if (this.autoImportProviderHost) {
        //     this.autoImportProviderHost.close();
        // }
        // this.autoImportProviderHost = undefined;
        // if (this.noDtsResolutionProject) {
        //     this.noDtsResolutionProject.close();
        // }
        // this.noDtsResolutionProject = undefined;

        // signal language service to release source files acquired from document registry
        this.languageService.dispose();
        this.languageService = undefined!;
    }

    /** @internal */
    forEachResolvedProjectReference<T>(
        cb: (resolvedProjectReference: ResolvedProjectReference) => T | undefined,
    ): T | undefined {
        return this.getCurrentProgram()?.forEachResolvedProjectReference(cb);
    }

    
    
    private updateGraphWorker() {
        const oldProgram = this.languageService.getCurrentProgram();
        Debug.assert(oldProgram === this.program);
        Debug.assert(!this.isClosed(), "Called update graph worker of closed project");
        this.writeLog(`Starting updateGraphWorker: Project: ${this.getProjectName()}`);
        const start = timestamp();
        const { hasInvalidatedResolutions, hasInvalidatedLibResolutions } = this.resolutionCache.createHasInvalidatedResolutions(returnFalse, returnFalse);
        this.hasInvalidatedResolutions = hasInvalidatedResolutions;
        this.hasInvalidatedLibResolutions = hasInvalidatedLibResolutions;
        this.resolutionCache.startCachingPerDirectoryResolution();
        this.dirty = false;
        this.updateFromProjectInProgress = true;
        this.program = this.languageService.getProgram(); // TODO: GH#18217
        this.updateFromProjectInProgress = false;
        tracing?.push(tracing.Phase.Session, "finishCachingPerDirectoryResolution");
        this.resolutionCache.finishCachingPerDirectoryResolution(this.program, oldProgram);
        tracing?.pop();

        Debug.assert(oldProgram === undefined || this.program !== undefined);

        // bump up the version if
        // - oldProgram is not set - this is a first time updateGraph is called
        // - newProgram is different from the old program and structure of the old program was not reused.
        let hasNewProgram = false;
        if (this.program && (!oldProgram || (this.program !== oldProgram && this.program.structureIsReused !== StructureIsReused.Completely))) {
            hasNewProgram = true;
            if (oldProgram) {
                for (const f of oldProgram.getSourceFiles()) {
                    const newFile = this.program.getSourceFileByPath(f.resolvedPath);
                    if (!newFile || (f.resolvedPath === f.path && newFile.resolvedPath !== f.path)) {
                        // new program does not contain this file - detach it from the project
                        // - remove resolutions only if the new program doesnt contain source file by the path (not resolvedPath since path is used for resolution)
                        this.detachScriptInfoFromProject(f.fileName, !!this.program.getSourceFileByPath(f.path), /*syncDirWatcherRemove*/ true);
                    }
                }

                oldProgram.forEachResolvedProjectReference(resolvedProjectReference => {
                    if (!this.program!.getResolvedProjectReferenceByPath(resolvedProjectReference.sourceFile.path)) {
                        this.detachScriptInfoFromProject(resolvedProjectReference.sourceFile.fileName, /*noRemoveResolution*/ undefined, /*syncDirWatcherRemove*/ true);
                    }
                });
            }

            // Update roots
            this.rootFilesMap.forEach((value, path) => {
                const file = this.program!.getSourceFileByPath(path);
                const info = value.info;
                if (!file || value.info?.path === file.resolvedPath) return;
                value.info = this.projectService.getScriptInfo(file.fileName)!;
                Debug.assert(value.info.isAttached(this));
                info?.detachFromProject(this);
            });

            // Update the missing file paths watcher
            updateMissingFilePathsWatch(
                this.program,
                this.missingFilesMap || (this.missingFilesMap = new Map()),
                // Watch the missing files
                (missingFilePath, missingFileName) => this.addMissingFileWatcher(missingFilePath, missingFileName),
            );

            // if (this.generatedFilesMap) {
            //     const outPath = this.compilerOptions.outFile;
            //     if (isGeneratedFileWatcher(this.generatedFilesMap)) {
            //         // --out
            //         if (
            //             !outPath || !this.isValidGeneratedFileWatcher(
            //                 removeFileExtension(outPath) + Extension.Dts,
            //                 this.generatedFilesMap,
            //             )
            //         ) {
            //             this.clearGeneratedFileWatch();
            //         }
            //     }
            //     else {
            //         // MultiFile
            //         if (outPath) {
            //             this.clearGeneratedFileWatch();
            //         }
            //         else {
            //             this.generatedFilesMap.forEach((watcher, source) => {
            //                 const sourceFile = this.program!.getSourceFileByPath(source);
            //                 if (
            //                     !sourceFile ||
            //                     sourceFile.resolvedPath !== source ||
            //                     !this.isValidGeneratedFileWatcher(
            //                         getDeclarationEmitOutputFilePathWorker(sourceFile.fileName, this.compilerOptions, this.program!),
            //                         watcher,
            //                     )
            //                 ) {
            //                     closeFileWatcherOf(watcher);
            //                     (this.generatedFilesMap as Map<string, GeneratedFileWatcher>).delete(source);
            //                 }
            //             });
            //         }
            //     }
            // }

            // Watch the type locations that would be added to program as part of automatic type resolutions
            if (this.languageServiceEnabled && this.projectService.serverMode === LanguageServiceMode.Semantic) {
                //this.resolutionCache.updateTypeRootsWatch();
            }
        }

        this.projectService.verifyProgram(this);
        if (this.exportMapCache && !this.exportMapCache.isEmpty()) {
            this.exportMapCache.releaseSymbols();
            if (this.hasAddedorRemovedFiles || oldProgram && !this.program!.structureIsReused) {
                this.exportMapCache.clear();
            }
            else if (this.changedFilesForExportMapCache && oldProgram && this.program) {
                forEachKey(this.changedFilesForExportMapCache, fileName => {
                    const oldSourceFile = oldProgram.getSourceFileByPath(fileName);
                    const sourceFile = this.program!.getSourceFileByPath(fileName);
                    if (!oldSourceFile || !sourceFile) {
                        this.exportMapCache!.clear();
                        return true;
                    }
                    return this.exportMapCache!.onFileChanged(oldSourceFile, sourceFile, !!this.getTypeAcquisition().enable);
                });
            }
        }
        if (this.changedFilesForExportMapCache) {
            this.changedFilesForExportMapCache.clear();
        }

        // TODO enable symlinks support
        if (this.hasAddedOrRemovedSymlinks || this.program && !this.program.structureIsReused && this.getCompilerOptions()?.preserveSymlinks) {
            // With --preserveSymlinks, we may not determine that a file is a symlink, so we never set `hasAddedOrRemovedSymlinks`
            console.debug("todo - implement symlinks support");
            // this.symlinks = undefined;
            // this.moduleSpecifierCache.clear();
        }

        // TODO - external files support
        // const oldExternalFiles = this.externalFiles || emptyArray as SortedReadonlyArray<string>;
        // this.externalFiles = this.getExternalFiles();
        // enumerateInsertsAndDeletes<string, string>(
        //     this.externalFiles,
        //     oldExternalFiles,
        //     getStringComparer(!this.useCaseSensitiveFileNames()), // Ensure a ScriptInfo is created for new external files. This is performed indirectly
        //     // by the host for files in the program when the program is retrieved above but
        //     // the program doesn't contain external files so this must be done explicitly.
        //     inserted => {
        //         const scriptInfo = this.projectService.getOrCreateScriptInfoNotOpenedByClient(
        //             inserted,
        //             this.currentDirectory,
        //             this.directoryStructureHost,
        //             /*deferredDeleteOk*/ false,
        //         );
        //         scriptInfo?.attachToProject(this);
        //     },
        //     removed => this.detachScriptInfoFromProject(removed),
        // );
        const elapsed = timestamp() - start;
        this.sendPerformanceEvent("UpdateGraph", elapsed);
        this.writeLog(`Finishing updateGraphWorker: Project: ${this.getProjectName()} projectStateVersion: ${this.projectStateVersion} projectProgramVersion: ${this.projectProgramVersion} structureChanged: ${hasNewProgram}${this.program ? ` structureIsReused:: ${(lpc as any).StructureIsReused[this.program.structureIsReused]}` : ""} Elapsed: ${elapsed}ms`);
        if (this.projectService.logger.isTestLogger) {
            if (this.program !== oldProgram) {
                this.print(/*writeProjectFileNames*/ true, this.hasAddedorRemovedFiles, /*writeFileVersionAndText*/ true);
            }
            else {
                this.writeLog(`Same program as before`);
            }
        }
        else if (this.hasAddedorRemovedFiles) {
            this.print(/*writeProjectFileNames*/ true, /*writeFileExplaination*/ true, /*writeFileVersionAndText*/ false);
        }
        else if (this.program !== oldProgram) {
            this.writeLog(`Different program with same set of files`);
        }
        // Verify the document registry count
        this.projectService.verifyDocumentRegistry();
        return hasNewProgram;
    }

    /** @internal */
    sendPerformanceEvent(kind: PerformanceEvent["kind"], durationMs: number) {
        this.projectService.sendPerformanceEvent(kind, durationMs);
    }
    
    private addMissingFileWatcher(missingFilePath: Path, missingFileName: string): FileWatcher {
        if (isConfiguredProject(this)) {
            // If this file is referenced config file, we are already watching it, no need to watch again
            const configFileExistenceInfo = this.projectService.configFileExistenceInfoCache.get(missingFilePath as string as NormalizedPath);
            if (configFileExistenceInfo?.config?.projects.has(this.canonicalConfigFilePath)) return noopFileWatcher;
        }
        const fileWatcher = this.projectService.watchFactory.watchFile(
            getNormalizedAbsolutePath(missingFileName, this.currentDirectory),
            (fileName, eventKind) => {
                if (isConfiguredProject(this)) {
                    this.getCachedDirectoryStructureHost().addOrDeleteFile(fileName, missingFilePath, eventKind);
                }

                if (eventKind === FileWatcherEventKind.Created && this.missingFilesMap!.has(missingFilePath)) {
                    this.missingFilesMap!.delete(missingFilePath);
                    fileWatcher.close();

                    // When a missing file is created, we should update the graph.
                    this.projectService.delayUpdateProjectGraphAndEnsureProjectStructureForOpenFiles(this);
                }
            },
            PollingInterval.Medium,
            undefined, /*this.projectService.getWatchOptions(this),*/
            WatchType.MissingFile,
            this,
        );
        return fileWatcher;
    }     
    
    registerFileUpdate(fileName: string) {
        (this.updatedFileNames || (this.updatedFileNames = new Set<string>())).add(fileName);
    }

    /** @internal */
    markFileAsDirty(changedFile: Path) {
        this.markAsDirty();
        if (this.exportMapCache && !this.exportMapCache.isEmpty()) {
            (this.changedFilesForExportMapCache ||= new Set()).add(changedFile);
        }
    }

    /** @internal */
    isOrphan() {
        return false;
    }    

    containsScriptInfo(info: ScriptInfo): boolean {
        if (this.isRoot(info)) return true;
        if (!this.program) return false;
        const file = this.program.getSourceFileByPath(info.path);
        return !!file && file.resolvedPath === info.path;
    }

    /** @internal */
    isSourceOfProjectReferenceRedirect(fileName: string) {
        return false;// TODO return !!this.program && this.program.isSourceOfProjectReferenceRedirect(fileName);
    }

    /** @internal */
    writeLog(s: string) {
        this.projectService.logger.info(s);
    }

    filesToString(writeProjectFileNames: boolean) {
        return this.filesToStringWorker(writeProjectFileNames, /*writeFileExplaination*/ true, /*writeFileVersionAndText*/ false);
    }
    
    /** @internal */
    private filesToStringWorker(writeProjectFileNames: boolean, writeFileExplaination: boolean, writeFileVersionAndText: boolean) {
        if (this.isInitialLoadPending()) return "\tFiles (0) InitialLoadPending\n";
        if (!this.program) return "\tFiles (0) NoProgram\n";
        const sourceFiles = this.program.getSourceFiles();        
        let strBuilder = `\tFiles (${sourceFiles.length} / ${this.rootFilesMap.size})\n`;        
        if (writeProjectFileNames) {
            for (const file of sourceFiles) {
                strBuilder += `\t${file.fileName}${writeFileVersionAndText ? ` ${file.version} ${JSON.stringify(file.text)}` : ""}\n`;
            }
            if (writeFileExplaination) {
                strBuilder += "\n\n";
                explainFiles(this.program, s => strBuilder += `\t${s}\n`);
            }
        }
        return strBuilder;
    }


    /** @internal */
    print(writeProjectFileNames: boolean, writeFileExplaination: boolean, writeFileVersionAndText: boolean) {
        this.writeLog(`Project '${this.projectName}' (${ProjectKind[this.projectKind]})`);
        this.writeLog(this.filesToStringWorker(
            writeProjectFileNames && this.projectService.logger.hasLevel(LogLevel.verbose),
            writeFileExplaination && this.projectService.logger.hasLevel(LogLevel.verbose),
            writeFileVersionAndText && this.projectService.logger.hasLevel(LogLevel.verbose),
        ));
        this.writeLog("-----------------------------------------------");
        // if (this.autoImportProviderHost) {
        //     this.autoImportProviderHost.print(/*writeProjectFileNames*/ false, /*writeFileExplaination*/ false, /*writeFileVersionAndText*/ false);
        // }
        // this.noDtsResolutionProject?.print(/*writeProjectFileNames*/ false, /*writeFileExplaination*/ false, /*writeFileVersionAndText*/ false);
    }

    private detachScriptInfoIfNotRoot(uncheckedFilename: string) {
        const info = this.projectService.getScriptInfo(uncheckedFilename);
        // We might not find the script info in case its not associated with the project any more
        // and project graph was not updated (eg delayed update graph in case of files changed/deleted on the disk)
        if (info && !this.isRoot(info)) {
            info.detachFromProject(this);
        }
    }

    private detachScriptInfoFromProject(uncheckedFileName: string, noRemoveResolution?: boolean, syncDirWatcherRemove?: boolean) {
        const scriptInfoToDetach = this.projectService.getScriptInfo(uncheckedFileName);
        if (scriptInfoToDetach) {
            scriptInfoToDetach.detachFromProject(this);
            if (!noRemoveResolution) {
                this.resolutionCache.removeResolutionsOfFile(scriptInfoToDetach.path, syncDirWatcherRemove);
            }
        }
    }

    containsFile(filename: NormalizedPath, requireOpen?: boolean): boolean {
        const info = this.projectService.getScriptInfoForNormalizedPath(filename);
        if (info && (info.isScriptOpen() || !requireOpen)) {
            return this.containsScriptInfo(info);
        }
        return false;
    }
    
    getScriptInfoForNormalizedPath(fileName: NormalizedPath): ScriptInfo | undefined {
        const scriptInfo = this.projectService.getScriptInfoForPath(this.toPath(fileName));
        if (scriptInfo && !scriptInfo.isAttached(this)) {
            return Errors.ThrowProjectDoesNotContainDocument(fileName, this);
        }
        return scriptInfo;
    }
    
    /** @internal */
    cleanupProgram() {
        if (this.program) {
            // Root files are always attached to the project irrespective of program
            for (const f of this.program.getSourceFiles()) {
                this.detachScriptInfoIfNotRoot(f.fileName);
            }
            this.program.forEachResolvedProjectReference(ref => this.detachScriptInfoFromProject(ref.sourceFile.fileName));
            this.program = undefined;
        }
    }     
}


export class ConfiguredProject extends Project {
    /** @internal */
    pendingUpdateLevel: ProgramUpdateLevel;
    /** @internal */
    pendingUpdateReason: string | undefined;

    /** @internal */
    openFileWatchTriggered = new Map<string, ProgramUpdateLevel>();

    /** @internal */
    canConfigFileJsonReportNoInputFiles = false;

    /** @internal */
    override isInitialLoadPending: () => boolean = returnTrue;

    /** @internal */
    private compilerHost?: CompilerHost;

    private projectReferences: readonly ProjectReference[] | undefined;
    
    /**
     * Potential project references before the project is actually loaded (read config file)
     *
     * @internal
     */
    potentialProjectReferences: Set<NormalizedPath> | undefined;
    
    /** @internal */
    constructor(
        configFileName: NormalizedPath,
        readonly canonicalConfigFilePath: NormalizedPath,
        projectService: ProjectService,
        documentRegistry: DocumentRegistry,
        cachedDirectoryStructureHost: CachedDirectoryStructureHost,
        pendingUpdateReason: string,
    ) {
        super(configFileName, ProjectKind.Configured, projectService, documentRegistry, /*hasExplicitListOfFiles*/ false, /*lastFileExceededProgramSize*/ undefined, {}, /*compileOnSaveEnabled*/ false, /* watch options */ undefined, cachedDirectoryStructureHost, getDirectoryPath(configFileName));
        this.pendingUpdateLevel = ProgramUpdateLevel.Full;
        this.pendingUpdateReason = pendingUpdateReason;
    }   
    
    /** @internal */
    setCompilerHost(host: CompilerHost) {
        this.compilerHost = host;
    }

    override getProjectReferences(): readonly ProjectReference[] | undefined {
        return this.projectReferences;
    }    
    
    /**
     * Get all the project errors
     */
    override getAllProjectErrors(): readonly Diagnostic[] {
        return this.projectErrors || emptyArray;
    }

    /**
     * If the project has reload from disk pending, it reloads (and then updates graph as part of that) instead of just updating the graph
     * @returns: true if set of files in the project stays the same and false - otherwise.
     */
    override updateGraph(): boolean {
        if (this.deferredClose) return false;
        const isDirty = this.dirty;
        this.isInitialLoadPending = returnFalse;
        const updateLevel = this.pendingUpdateLevel;
        this.pendingUpdateLevel = ProgramUpdateLevel.Update;
        let result: boolean;
        switch (updateLevel) {
            case ProgramUpdateLevel.RootNamesAndUpdate:
                this.openFileWatchTriggered.clear();
                result = this.projectService.reloadFileNamesOfConfiguredProject(this);
                break;
            case ProgramUpdateLevel.Full:
                this.openFileWatchTriggered.clear();
                const reason = Debug.checkDefined(this.pendingUpdateReason);
                this.projectService.reloadConfiguredProject(this, reason);
                result = true;
                break;
            default:
                result = super.updateGraph();
        }
        this.compilerHost = undefined;
        // this.projectService.sendProjectLoadingFinishEvent(this);
        // this.projectService.sendProjectTelemetry(this);
        if (
            updateLevel === ProgramUpdateLevel.Full || ( // Already sent event through reload
                result && ( // Not new program
                    !isDirty ||
                    !this.triggerFileForConfigFileDiag ||
                    this.getCurrentProgram()!.structureIsReused === StructureIsReused.Completely
                )
            )
        ) {
            // Dont send the configFileDiag
            this.triggerFileForConfigFileDiag = undefined;
        }
        else if (!this.triggerFileForConfigFileDiag) {
            // If we arent tracking to send configFileDiag, send event if diagnostics presence has changed
            this.projectService.sendConfigFileDiagEvent(this, /*triggerFile*/ undefined, /*force*/ false);
        }
        return result;
    }    

    /** @internal */
    override getCachedDirectoryStructureHost() {
        return this.directoryStructureHost as CachedDirectoryStructureHost;
    }

    /** @internal */
    updateErrorOnNoInputFiles(fileNames: string[]) {        
        updateErrorForNoInputFiles(fileNames, this.getConfigFilePath(), this.getCompilerOptions().configFile!.configFileSpecs!, this.projectErrors!, this.canConfigFileJsonReportNoInputFiles);
    }

    updateReferences(refs: readonly ProjectReference[] | undefined) {
        this.projectReferences = refs;
        this.potentialProjectReferences = undefined;
    }

    /** @internal */
    setPotentialProjectReference(canonicalConfigPath: NormalizedPath) {
        Debug.assert(this.isInitialLoadPending());
        (this.potentialProjectReferences || (this.potentialProjectReferences = new Set())).add(canonicalConfigPath);
    }

    /** @internal */
    isSolution() {
        return this.getRootFilesMap().size === 0 &&
            !this.canConfigFileJsonReportNoInputFiles;
    }

    /** @internal */
    override isOrphan(): boolean {
        return !!this.deferredClose;
    }

    /** @internal */
    override markAsDirty() {
        if (this.deferredClose) return;
        super.markAsDirty();
    }

    /** @internal */
    private releaseParsedConfig(canonicalConfigFilePath: NormalizedPath) {
        this.projectService.stopWatchingWildCards(canonicalConfigFilePath, this);
        this.projectService.releaseParsedConfig(canonicalConfigFilePath, this);
    }
    
    override close() {
        this.projectService.configFileExistenceInfoCache.forEach((_configFileExistenceInfo, canonicalConfigFilePath) => this.releaseParsedConfig(canonicalConfigFilePath));
        this.projectErrors = undefined;
        this.openFileWatchTriggered.clear();
        this.compilerHost = undefined;
        super.close();
    }

    
    /**
     * Get the errors that dont have any file name associated
     */
    override getGlobalProjectErrors(): readonly Diagnostic[] {
        return filter(this.projectErrors, diagnostic => !diagnostic.file) || emptyArray;
    }

    override setProjectErrors(projectErrors: Diagnostic[]) {
        this.projectErrors = projectErrors;
    }
}

/** @internal */
export function isConfiguredProject(project: Project): project is ConfiguredProject {
    return project.projectKind === ProjectKind.Configured;
}


/** @internal */
export function isProjectDeferredClose(project: Project): project is ConfiguredProject {
    return isConfiguredProject(project) && !!project.deferredClose;
}

/** @internal */
export function isInferredProject(project: Project): project is InferredProject {
    return project.projectKind === ProjectKind.Inferred;    
}

/**@internal */
export function isBackgroundProject(project: Project): project is /*AutoImportProviderProject |*/ AuxiliaryProject {    
    if (project.projectKind === ProjectKind.AutoImportProvider) {
        Debug.fail("not implemented");
    }
    return project.projectKind === ProjectKind.Auxiliary;
}


/** @internal */
export class AuxiliaryProject extends Project {
    /** @internal */ rootFile: NormalizedPath | undefined;
    constructor(projectService: ProjectService, documentRegistry: DocumentRegistry, compilerOptions: CompilerOptions, currentDirectory: string) {
        super(
            projectService.newAuxiliaryProjectName(), 
            ProjectKind.Auxiliary, projectService, 
            documentRegistry, 
            /*hasExplicitListOfFiles*/ false, /*lastFileExceededProgramSize*/ undefined, 
            compilerOptions, /*compileOnSaveEnabled*/ false, /*watchOptions*/ undefined, projectService.host, currentDirectory);
    }

    override isOrphan(): boolean {
        return true;
    }

    override scheduleInvalidateResolutionsOfFailedLookupLocations(): void {
        // Invalidation will happen on-demand as part of updateGraph
        return;
    }
}


export class InferredProject extends Project {    
    /** @internal */
    constructor(
        projectService: ProjectService,
        documentRegistry: DocumentRegistry,
        compilerOptions: CompilerOptions,
        watchOptions: WatchOptions | undefined,
        projectRootPath: NormalizedPath | undefined,
        currentDirectory: string,
        typeAcquisition: TypeAcquisition | undefined,
    ) {
        super(
            projectService.newInferredProjectName(),
            ProjectKind.Inferred,
            projectService,
            documentRegistry,
            // TODO: GH#18217
            /*files*/ undefined!,
            /*lastFileExceededProgramSize*/ undefined,
            compilerOptions,
            /*compileOnSaveEnabled*/ false,
            watchOptions,
            projectService.host,
            currentDirectory,
        );
        // this.typeAcquisition = typeAcquisition;
        this.projectRootPath = projectRootPath && projectService.toCanonicalFileName(projectRootPath);
        if (!projectRootPath && !projectService.useSingleInferredProject) {
            this.canonicalCurrentDirectory = projectService.toCanonicalFileName(this.currentDirectory);
        }
        // this.enableGlobalPlugins(this.getCompilerOptions());
    }

    /** this is canonical project root path */
    readonly projectRootPath: string | undefined;

    /**
     * stored only if their is no projectRootPath and this isnt single inferred project
     *
     * @internal
     */
    readonly canonicalCurrentDirectory: string | undefined;    

    isProjectWithSingleRoot() {
        // - when useSingleInferredProject is not set and projectRootPath is not set,
        //   we can guarantee that this will be the only root
        // - other wise it has single root if it has single root script info
        return (!this.projectRootPath && !this.projectService.useSingleInferredProject) ||
            this.getRootScriptInfos().length === 1;
    }

    /** @internal */
    override isOrphan() {
        return !this.hasRoots();
    }

    override addRoot(info: ScriptInfo) {
        Debug.assert(info.isScriptOpen());
        this.projectService.startWatchingConfigFilesForInferredProjectRoot(info);
        super.addRoot(info);
    }

    override removeRoot(info: ScriptInfo) {
        this.projectService.stopWatchingConfigFilesForScriptInfo(info);
        super.removeRoot(info);        
    }

    override close() {
        forEach(this.getRootScriptInfos(), info => this.projectService.stopWatchingConfigFilesForScriptInfo(info));
        super.close();
    }
}

function getUnresolvedImports(program: Program, cachedUnresolvedImportsPerFile: Map<Path, readonly string[]>): SortedReadonlyArray<string> {
    const sourceFiles = program.getSourceFiles();
    tracing?.push(tracing.Phase.Session, "getUnresolvedImports", { count: sourceFiles.length });
    // const ambientModules = program.getTypeChecker().getAmbientModules().map(mod => stripQuotes(mod.getName()));
    const result = sortAndDeduplicate(flatMap(sourceFiles, sourceFile =>
        extractUnresolvedImportsFromSourceFile(
            program,
            sourceFile,            
            cachedUnresolvedImportsPerFile,
        )));
    // const result = emptyArray;
    tracing?.pop();
    return result;
}

function extractUnresolvedImportsFromSourceFile(
    program: Program,
    file: SourceFile,    
    cachedUnresolvedImportsPerFile: Map<Path, readonly string[]>,
): readonly string[] {
    return getOrUpdate(cachedUnresolvedImportsPerFile, file.path, () => {
        let unresolvedImports: string[] | undefined;
        program.forEachResolvedModule(({ resolvedModule }, name) => {
            // pick unresolved non-relative names
            if (
                (!resolvedModule || !resolutionExtensionIsTSOrJson(resolvedModule.extension)) &&
                !isExternalModuleNameRelative(name)
                // !ambientModules.some(m => m === name)
            ) {
                unresolvedImports = append(unresolvedImports, parsePackageName(name).packageName);
            }
        }, file);
        return unresolvedImports || emptyArray;
    });
}


/** @internal */
export function isExternalProject(project: Project){//}: project is ExternalProject {
    return project.projectKind === ProjectKind.External;
}
