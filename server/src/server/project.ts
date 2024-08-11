import * as lpc from "./_namespaces/lpc.js";
import { addRange, CachedDirectoryStructureHost, combinePaths, CompilerOptions, Debug, Diagnostic, DirectoryStructureHost, DocumentRegistry, ExportInfoMap, FileWatcher, getDefaultLibFileName, getDirectoryPath, HasInvalidatedLibResolutions, HasInvalidatedResolutions, IScriptSnapshot, LanguageService, LanguageServiceHost, ModuleResolutionHost, normalizePath, ParsedCommandLine, Path, Program, ProjectReference, ResolutionCache, ResolvedProjectReference, returnFalse, SortedReadonlyArray, ThrottledCancellationToken, toPath, tracing } from "./_namespaces/lpc";
import { emptyArray, HostCancellationToken, NormalizedPath, ProjectService, ScriptInfo, updateProjectIfDirty } from "./_namespaces/lpc.server";


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

export abstract class Project implements LanguageServiceHost, ModuleResolutionHost {
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
    deferredClose?: boolean;

    constructor(
        projectName: string,
        readonly projectKind: ProjectKind,
        readonly projectService: ProjectService,
        private documentRegistry: DocumentRegistry,
        private compilerOptions: CompilerOptions,
        directoryStructureHost: DirectoryStructureHost,
        currentDirectory: string
    ) {
        this.projectName = projectName;
        this.currentDirectory = this.projectService.getNormalizedAbsolutePath(currentDirectory);
        this.directoryStructureHost = directoryStructureHost;

        this.cancellationToken = new ThrottledCancellationToken(this.projectService.cancellationToken, this.projectService.throttleWaitMilliseconds);

    }
    
    // Method of LanguageServiceHost
    getCompilationSettings() {
        return {};//this.compilerOptions;
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

    getProjectReferences(): readonly ProjectReference[] | undefined {
        return undefined;
    }

    getProjectName() {
        return this.projectName;
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


    /** @internal */
    clearSourceMapperCache() {
        //this.languageService.clearSourceMapperCache();
    }

    getLanguageService(ensureSynchronized = true): LanguageService {
        if (ensureSynchronized) {
            updateProjectIfDirty(this);
        }
        return this.languageService;
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
        return combinePaths(nodeModuleBinDir, getDefaultLibFileName(this.compilerOptions));
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

    private isWatchedMissingFile(path: Path) {
        return !!this.missingFilesMap && this.missingFilesMap.has(path);
    }

    /** @internal */
    invalidateResolutionsOfFailedLookupLocations() {
        Debug.fail("implement me");
        // if (
        //     this.clearInvalidateResolutionOfFailedLookupTimer() &&
        //     this.resolutionCache.invalidateResolutionsOfFailedLookupLocations()
        // ) {
        //     this.markAsDirty();
        //     this.projectService.delayEnsureProjectForOpenFiles();
        // }
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
    
    /**
     * Updates set of files that contribute to this project
     * @returns: true if set of files in the project stays the same and false - otherwise.
     */
    updateGraph(): boolean {
        Debug.fail("implement me");
        // tracing?.push(tracing.Phase.Session, "updateGraph", { name: this.projectName, kind: ProjectKind[this.projectKind] });
        // this.resolutionCache.startRecordingFilesWithChangedResolutions();

        // const hasNewProgram = this.updateGraphWorker();
        // const hasAddedorRemovedFiles = this.hasAddedorRemovedFiles;
        // this.hasAddedorRemovedFiles = false;
        // this.hasAddedOrRemovedSymlinks = false;

        // const changedFiles: readonly Path[] = this.resolutionCache.finishRecordingFilesWithChangedResolutions() || emptyArray;

        // for (const file of changedFiles) {
        //     // delete cached information for changed files
        //     this.cachedUnresolvedImportsPerFile.delete(file);
        // }

        // // update builder only if language service is enabled
        // // otherwise tell it to drop its internal state
        // if (this.languageServiceEnabled && this.projectService.serverMode === LanguageServiceMode.Semantic && !this.isOrphan()) {
        //     // 1. no changes in structure, no changes in unresolved imports - do nothing
        //     // 2. no changes in structure, unresolved imports were changed - collect unresolved imports for all files
        //     // (can reuse cached imports for files that were not changed)
        //     // 3. new files were added/removed, but compilation settings stays the same - collect unresolved imports for all new/modified files
        //     // (can reuse cached imports for files that were not changed)
        //     // 4. compilation settings were changed in the way that might affect module resolution - drop all caches and collect all data from the scratch
        //     if (hasNewProgram || changedFiles.length) {
        //         this.lastCachedUnresolvedImportsList = getUnresolvedImports(this.program!, this.cachedUnresolvedImportsPerFile);
        //     }

        //     this.enqueueInstallTypingsForProject(hasAddedorRemovedFiles);
        // }
        // else {
        //     this.lastCachedUnresolvedImportsList = undefined;
        // }

        // const isFirstProgramLoad = this.projectProgramVersion === 0 && hasNewProgram;
        // if (hasNewProgram) {
        //     this.projectProgramVersion++;
        // }
        // if (hasAddedorRemovedFiles) {
        //     this.markAutoImportProviderAsDirty();
        // }
        // if (isFirstProgramLoad) {
        //     // Preload auto import provider so it's not created during completions request
        //     this.getPackageJsonAutoImportProvider();
        // }
        // tracing?.pop();
        // return !hasNewProgram;
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
}


export class ConfiguredProject extends Project {
    /** @internal */
    constructor(
        configFileName: NormalizedPath,
        readonly canonicalConfigFilePath: NormalizedPath,
        projectService: ProjectService,
        documentRegistry: DocumentRegistry,
        cachedDirectoryStructureHost: CachedDirectoryStructureHost,
        pendingUpdateReason: string,
    ) {
        super(configFileName, ProjectKind.Configured, projectService, documentRegistry, {}, cachedDirectoryStructureHost, getDirectoryPath(configFileName));
        // this.pendingUpdateLevel = ProgramUpdateLevel.Full;
        // this.pendingUpdateReason = pendingUpdateReason;
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
export function isInferredProject(project: Project): project is undefined {//InferredProject {
    return project.projectKind === ProjectKind.Inferred;
}

/**@internal */
export function isBackgroundProject(project: Project): project is Project {//} AutoImportProviderProject | AuxiliaryProject {
    console.warn("todo - isBackgroundProject");
    return project.projectKind === ProjectKind.AutoImportProvider || project.projectKind === ProjectKind.Auxiliary;
}
