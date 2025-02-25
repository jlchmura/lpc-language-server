import { arrayFrom, AssertionLevel, CachedDirectoryStructureHost, canWatchDirectoryOrFile, clearMap, clearSharedExtendedConfigFileWatcher, closeFileWatcherOf, combinePaths, CommandLineOption, CompilerOptions, contains, containsPath, convertJsonOption, createCachedDirectoryStructureHost, createDocumentRegistryInternal, createGetCanonicalFileName, createMultiMap, Debug, Diagnostic, DirectoryStructureHost, DirectoryWatcherCallback, DocumentPosition, DocumentRegistry, DocumentRegistryBucketKeyWithMode, emptyOptions, FileExtensionInfo, fileExtensionIs, FileSystemEntries, FileWatcher, FileWatcherCallback, FileWatcherEventKind, find, forEach, forEachEntry, forEachKey, forEachResolvedProjectReference, getAnyExtensionFromPath, getBaseFileName, getDefaultFormatCodeSettings, getDirectoryPath, getFileNamesFromConfigSpecs, getNormalizedAbsolutePath, getPathComponents, getWatchFactory, identity, IndentStyle, isArray, isIgnoredFileFromWildCardWatching, isJsonEqual, isNodeModulesDirectory, isRootedDiskPath, isString, JSDocParsingMode, LanguageServiceMode, length, LpcConfigSourceFile, mapDefinedEntries, mapDefinedIterator, missingFileModifiedTime, MultiMap, noop, normalizePath, normalizeSlashes, optionDeclarations, optionsForWatch, orderedRemoveItem, ParsedCommandLine, parseJsonText, parseLpcSourceFileConfigFileContent, Path, PerformanceEvent, PollingInterval, ProgramUpdateLevel, ProjectReference, ReadonlyCollection, ResolvedProjectReference, resolveProjectReferencePath, returnFalse, returnNoopFileWatcher, ScriptKind, SharedExtendedConfigFileWatcher, some, SourceFile, startsWith, TextChange, toPath, tracing, tryAddToSet, tryReadFile, TypeAcquisition, typeAcquisitionDeclarations, unorderedRemoveItem, updateWatchingWildcardDirectories, UserPreferences, WatchDirectoryFlags, WatchFactory, WatchFactoryHost, WatchLogLevel, WatchOptions, WatchType, WildcardDirectoryWatcher } from "./_namespaces/lpc.js";
import { asNormalizedPath, ConfiguredProject, Errors, findLpcConfig, HostCancellationToken, InferredProject, isConfiguredProject, isDynamicFileName, isExternalProject, isInferredProject, isProjectDeferredClose, Logger, LogLevel, makeAuxiliaryProjectName, Msg, NormalizedPath, normalizedPathToPath, Project, ProjectKind, ScriptInfo, ScriptInfoOrConfig, ServerHost, Session, ThrottledOperations, toNormalizedPath } from "./_namespaces/lpc.server.js";
import * as protocol from "./protocol.js";

export const maxProgramSizeForNonTsFiles = 20 * 1024 * 1024;
/** @internal */
export const maxFileSize = 4 * 1024 * 1024;

export const ProjectsUpdatedInBackgroundEvent = "projectsUpdatedInBackground";
export const ProjectLoadingStartEvent = "projectLoadingStart";
export const ProjectLoadingFinishEvent = "projectLoadingFinish";
export const LargeFileReferencedEvent = "largeFileReferenced";
export const ConfigFileDiagEvent = "configFileDiag";
export const ProjectLanguageServiceStateEvent = "projectLanguageServiceState";
export const ProjectInfoTelemetryEvent = "projectInfo";
export const OpenFileInfoTelemetryEvent = "openFileInfo";
export const CreateFileWatcherEvent: protocol.CreateFileWatcherEventName = "createFileWatcher";
export const CreateDirectoryWatcherEvent: protocol.CreateDirectoryWatcherEventName = "createDirectoryWatcher";
export const CloseFileWatcherEvent: protocol.CloseFileWatcherEventName = "closeFileWatcher";
const ensureProjectForOpenFileSchedule = "*ensureProjectForOpenFiles*";

const noopConfigFileWatcher: FileWatcher = { close: noop };

export interface ProjectsUpdatedInBackgroundEvent {
    eventName: typeof ProjectsUpdatedInBackgroundEvent;
    data: { openFiles: string[]; };
}

export class ProjectService {
    /** @internal */
    readonly documentRegistry: DocumentRegistry;

    /**
     * Container of all known scripts
     *
     * @internal
     */
    readonly filenameToScriptInfo = new Map<Path, ScriptInfo>();

    /**
     * All the open script info that needs recalculation of the default project,
     * this also caches config file info before config file change was detected to use it in case projects are not updated yet
     */
    private pendingOpenFileProjectUpdates?: Map<Path, ConfigFileName>;
    /** @internal */
    pendingEnsureProjectForOpenFiles = false;

    readonly currentDirectory: NormalizedPath;
    readonly toCanonicalFileName: (f: string) => string;

    private pendingProjectUpdates = new Map<string, Project>();
    /** @internal */ readonly throttledOperations: ThrottledOperations;
    
    public readonly host: ServerHost;
    public readonly logger: Logger;
    public readonly cancellationToken: HostCancellationToken;
    public readonly useInferredProjectPerProjectRoot: boolean;
    private readonly globalCacheLocationDirectoryPath: Path | undefined;    

    public readonly serverMode: LanguageServiceMode;
    public readonly throttleWaitMilliseconds?: number;
    private readonly hostConfiguration: any;//todo HostConfiguration;
    private readonly suppressDiagnosticEvents?: boolean;
    public readonly useSingleInferredProject: boolean;

    /** @internal */
    private readonly sharedExtendedConfigFileWatchers = new Map<Path, SharedExtendedConfigFileWatcher<NormalizedPath>>();

    /**
     * Project size for configured or external projects
     */
    private readonly projectToSizeMap = new Map<string, number>();

    /** @internal */
    readonly session: Session<unknown> | undefined;

    private performanceEventHandler?: PerformanceEventHandler;

    /**
     * projects specified by a lpc-config.json file
     */
    readonly configuredProjects: Map<string, ConfiguredProject> = new Map<string, ConfiguredProject>();
    /**
     * projects built from openFileRoots
     */
    readonly inferredProjects: InferredProject[] = [];
    
    /**
     * This is a map of config file paths existence that doesnt need query to disk
     * - The entry can be present because there is inferred project that needs to watch addition of config file to directory
     *   In this case the exists could be true/false based on config file is present or not
     * - Or it is present if we have configured project open with config file at that location
     *   In this case the exists property is always true
     *
     * @internal
     */
    readonly configFileExistenceInfoCache = new Map<NormalizedPath, ConfigFileExistenceInfo>();

    /**
     * Map to the real path of the infos
     *
     * @internal
     */
    readonly realpathToScriptInfos: MultiMap<Path, ScriptInfo> | undefined;
    
    /** @internal */
    readonly eventHandler?: ProjectServiceEventHandler;

    /** @internal */
    readonly newInferredProjectName = createProjectNameFactoryWithCounter(makeInferredProjectName);
    /** @internal */
    readonly newAuxiliaryProjectName = createProjectNameFactoryWithCounter(makeAuxiliaryProjectName);

    /**
     * Open files: with value being project root path, and key being Path of the file that is open
     */
    readonly openFiles: Map<Path, NormalizedPath | undefined> = new Map<Path, NormalizedPath | undefined>();

    /**
     * Files that have been opened or referenced by an open file and therefore
     * should be parsed as part of the program.
     */
    readonly shouldParse: Set<Path> = new Set<Path>();

    /** Config files looked up and cached config files for open script info */
    private readonly configFileForOpenFiles = new Map<Path, ConfigFileName>();
    /** Set of open script infos that are root of inferred project */
    private rootOfInferredProjects = new Set<ScriptInfo>();
    
    /**
     * Contains all the deleted script info's version information so that
     * it does not reset when creating script info again
     * (and could have potentially collided with version where contents mismatch)
     */
    private readonly filenameToScriptInfoVersion = new Map<Path, number>();

    /**
     * Map of open files that are opened without complete path but have projectRoot as current directory
     */
    private readonly openFilesWithNonRootedDiskPath = new Map<string, ScriptInfo>();

    private compilerOptionsForInferredProjects: CompilerOptions | undefined;
    private compilerOptionsForInferredProjectsPerProjectRoot = new Map<string, CompilerOptions>();
    private watchOptionsForInferredProjects: WatchOptionsAndErrors | undefined;
    private watchOptionsForInferredProjectsPerProjectRoot = new Map<string, WatchOptionsAndErrors | false>();
    private typeAcquisitionForInferredProjects: TypeAcquisition | undefined;
    private typeAcquisitionForInferredProjectsPerProjectRoot = new Map<string, TypeAcquisition | undefined>();
        
    /** @internal */
    readonly watchFactory: WatchFactory<WatchType, Project | NormalizedPath>;

    /** @internal */ onProjectCreation: (project: Project) => void = noop;
    readonly jsDocParsingMode: JSDocParsingMode | undefined;

    /** @internal */ verifyProgram: (project: Project) => void = noop;
    /** @internal */ verifyDocumentRegistry = noop;
    
    constructor(opts: ProjectServiceOptions) {
        this.host = opts.host;
        this.logger = opts.logger;
        this.cancellationToken = opts.cancellationToken;
        this.useSingleInferredProject = opts.useSingleInferredProject;
        this.useInferredProjectPerProjectRoot = opts.useInferredProjectPerProjectRoot;
        // this.typingsInstaller = opts.typingsInstaller || nullTypingsInstaller;
        this.throttleWaitMilliseconds = opts.throttleWaitMilliseconds;
        this.eventHandler = opts.eventHandler;
        this.suppressDiagnosticEvents = opts.suppressDiagnosticEvents;
        // this.globalPlugins = opts.globalPlugins || emptyArray;
        // this.pluginProbeLocations = opts.pluginProbeLocations || emptyArray;
        // this.allowLocalPluginLoads = !!opts.allowLocalPluginLoads;
        // this.typesMapLocation = (opts.typesMapLocation === undefined) ? combinePaths(getDirectoryPath(this.getExecutingFilePath()), "typesMap.json") : opts.typesMapLocation;
        this.session = opts.session;
                
        this.jsDocParsingMode = opts.jsDocParsingMode;

        if (opts.serverMode !== undefined) {
            this.serverMode = opts.serverMode;
        }
        else {
            this.serverMode = LanguageServiceMode.Semantic;
        }

        if (this.host.realpath) {
            this.realpathToScriptInfos = createMultiMap();
        }
        
        this.currentDirectory = toNormalizedPath(opts.projectRootFolder || this.host.getCurrentDirectory());
        this.toCanonicalFileName = createGetCanonicalFileName(this.host.useCaseSensitiveFileNames);

        this.throttledOperations = new ThrottledOperations(this.host, this.logger);
        
        this.hostConfiguration = {
            formatCodeOptions: getDefaultFormatCodeSettings(this.host.newLine),
            preferences: emptyOptions,
            hostInfo: "Unknown host",
            extraFileExtensions: [],
        };

        this.documentRegistry = createDocumentRegistryInternal(this.host.useCaseSensitiveFileNames, this.currentDirectory, this.jsDocParsingMode, this);

        const watchLogLevel = this.logger.hasLevel(LogLevel.verbose) ? WatchLogLevel.Verbose :
            this.logger.loggingEnabled() ? WatchLogLevel.TriggerOnly : WatchLogLevel.None;
            
        this.watchFactory = this.serverMode !== LanguageServiceMode.Semantic ?
            {
                watchFile: returnNoopFileWatcher,
                watchDirectory: returnNoopFileWatcher,
            } :
            getWatchFactory(
                createWatchFactoryHostUsingWatchEvents(this, opts.canUseWatchEvents) || this.host,
                watchLogLevel,
                console.log,
                getDetailWatchInfo,
            );
    }
    
    /** @internal */
    getExecutingFilePath() {
        return this.getNormalizedAbsolutePath(this.host.getExecutingFilePath());
    }

    /** @internal */
    getNormalizedAbsolutePath(fileName: string) {
        return getNormalizedAbsolutePath(fileName, this.host.getCurrentDirectory());
    }

    /** @internal */
    setDocument(key: DocumentRegistryBucketKeyWithMode, path: Path, sourceFile: SourceFile) {
        const info = Debug.checkDefined(this.getScriptInfoForPath(path));
        info.cacheSourceFile = { key, sourceFile };
    }
    
    /** @internal */
    getDocument(key: DocumentRegistryBucketKeyWithMode, path: Path): SourceFile | undefined {
        const info = this.getScriptInfoForPath(path);
        return info && info.cacheSourceFile && info.cacheSourceFile.key === key ? info.cacheSourceFile.sourceFile : undefined;
    }

    /** @internal */
    sendLargeFileReferencedEvent(file: string, fileSize: number) {
        if (!this.eventHandler) {
            return;
        }

        const event: LargeFileReferencedEvent = {
            eventName: LargeFileReferencedEvent,
            data: { file, fileSize, maxFileSize },
        };
        this.eventHandler(event);
    }

    private getOrCreateScriptInfoNotOpenedByClientForNormalizedPath(
        fileName: NormalizedPath,
        currentDirectory: string,
        scriptKind: ScriptKind | undefined,
        hasMixedContent: boolean | undefined,
        hostToQueryFileExistsOn: DirectoryStructureHost | undefined,
        deferredDeleteOk: boolean,
    ) {
        if (isRootedDiskPath(fileName) || isDynamicFileName(fileName)) {
            return this.getOrCreateScriptInfoWorker(
                fileName,
                currentDirectory,
                /*openedByClient*/ false,
                /*fileContent*/ undefined,
                scriptKind,
                !!hasMixedContent,
                hostToQueryFileExistsOn,
                deferredDeleteOk,
            );
        }

        // This is non rooted path with different current directory than project service current directory
        // Only paths recognized are open relative file paths
        const info = this.openFilesWithNonRootedDiskPath.get(this.toCanonicalFileName(fileName));
        if (info) {
            return info;
        }

        // This means triple slash references wont be resolved in dynamic and unsaved files
        // which is intentional since we dont know what it means to be relative to non disk files
        return undefined;
    }

    /** @internal */
    fileExists(fileName: NormalizedPath): boolean {
        return !!this.getScriptInfoForNormalizedPath(fileName) || this.host.fileExists(fileName);
    }
    
    getScriptInfoEnsuringProjectsUptoDate(uncheckedFileName: string) {
        this.ensureProjectStructuresUptoDate();
        return this.getScriptInfo(uncheckedFileName);
    }

    /**
     * Returns the projects that contain script info through SymLink
     * Note that this does not return projects in info.containingProjects
     *
     * @internal
     */
    getSymlinkedProjects(info: ScriptInfo): MultiMap<Path, Project> | undefined {
        let projects: MultiMap<Path, Project> | undefined;
        if (this.realpathToScriptInfos) {
            const realpath = info.getRealpathIfDifferent();
            if (realpath) {
                forEach(this.realpathToScriptInfos.get(realpath), combineProjects);
            }
            forEach(this.realpathToScriptInfos.get(info.path), combineProjects);
        }

        return projects;

        function combineProjects(toAddInfo: ScriptInfo) {
            if (toAddInfo !== info) {
                for (const project of toAddInfo.containingProjects) {
                    // Add the projects only if they can use symLink targets and not already in the list
                    if (
                        project.languageServiceEnabled &&
                        !project.isOrphan() &&
                        !project.getCompilerOptions().preserveSymlinks &&
                        !info.isAttached(project)
                    ) {
                        if (!projects) {
                            projects = createMultiMap();
                            projects.add(toAddInfo.path, project);
                        }
                        else if (!forEachEntry(projects, (projs, path) => path === toAddInfo.path ? false : contains(projs, project))) {
                            projects.add(toAddInfo.path, project);
                        }
                    }
                }
            }
        }
    }

    getPreferences(file: NormalizedPath): UserPreferences {
        const info = this.getScriptInfoForNormalizedPath(file);
        return { ...this.hostConfiguration.preferences, ...info && info.getPreferences() };
    }

    /** @internal */
    loadAncestorProjectTree(forProjects?: ReadonlyCollection<string>) {
        forProjects = forProjects || mapDefinedEntries(
            this.configuredProjects,
            (key, project) => !project.isInitialLoadPending() ? [key, true] : undefined,
        );

        const seenProjects = new Set<NormalizedPath>();
        // Work on array copy as we could add more projects as part of callback
        for (const project of arrayFrom(this.configuredProjects.values())) {
            // If this project has potential project reference for any of the project we are loading ancestor tree for
            // load this project first
            if (forEachPotentialProjectReference(project, potentialRefPath => forProjects.has(potentialRefPath))) {
                updateProjectIfDirty(project);
            }
            this.ensureProjectChildren(project, forProjects, seenProjects);
        }
    }

    private ensureProjectChildren(project: ConfiguredProject, forProjects: ReadonlyCollection<string>, seenProjects: Set<NormalizedPath>) {
        if (!tryAddToSet(seenProjects, project.canonicalConfigFilePath)) return;

        // If this project disables child load ignore it
        // if (project.getCompilerOptions().disableReferencedProjectLoad) return;

        const children = project.getCurrentProgram()?.getResolvedProjectReferences();
        if (!children) return;

        for (const child of children) {
            if (!child) continue;
            const referencedProject = forEachResolvedProjectReference(child.references, ref => forProjects.has(ref.sourceFile.path) ? ref : undefined);
            if (!referencedProject) continue;

            // Load this project,
            const configFileName = toNormalizedPath(child.sourceFile.fileName);
            const childProject = this.findConfiguredProjectByProjectName(configFileName) ??
                this.createConfiguredProject(
                    configFileName,
                    `Creating project referenced by : ${project.projectName} as it references project ${referencedProject.sourceFile.fileName}`,
                );
            updateProjectIfDirty(childProject);

            // Ensure children for this project
            this.ensureProjectChildren(childProject, forProjects, seenProjects);
        }
    }

    /** @internal */
    forEachProject(cb: (project: Project) => void) {
        // this.externalProjects.forEach(cb);
        this.configuredProjects.forEach(cb);
        this.inferredProjects.forEach(cb);
    }

    /** @internal */
    forEachEnabledProject(cb: (project: Project) => void) {
        this.forEachProject(project => {
            if (!project.isOrphan() && project.languageServiceEnabled) {
                cb(project);
            }
        });
    }

    /** @internal */
    getOriginalLocationEnsuringConfiguredProject(project: Project, location: DocumentPosition): DocumentPosition | undefined {
        const isSourceOfProjectReferenceRedirect = project.isSourceOfProjectReferenceRedirect(location.fileName);
        const originalLocation = isSourceOfProjectReferenceRedirect ?
            location :
            project.getSourceMapper().tryGetSourcePosition(location);
        if (!originalLocation) return undefined;

        const { fileName } = originalLocation;
        const scriptInfo = this.getScriptInfo(fileName);
        
        if (!scriptInfo && !this.host.fileExists(fileName)) return undefined;

        const originalFileInfo: OriginalFileInfo = { fileName: toNormalizedPath(fileName), path: this.toPath(fileName) };
        const configFileName = this.getConfigFileNameForFile(originalFileInfo, /*findFromCacheOnly*/ false);
        if (!configFileName) return undefined;

        let configuredProject: ConfiguredProject | undefined = this.findConfiguredProjectByProjectName(configFileName);
        if (!configuredProject) {
            if (project.getCompilerOptions().disableReferencedProjectLoad) {
                // If location was a project reference redirect, then `location` and `originalLocation` are the same.
                if (isSourceOfProjectReferenceRedirect) {
                    return location;
                }

                // Otherwise, if we found `originalLocation` via a source map instead, then we check whether it's in
                // an open project.  If it is, we should search the containing project(s), even though the "default"
                // configured project isn't open.  However, if it's not in an open project, we need to stick with
                // `location` (i.e. the .d.ts file) because otherwise we'll miss the references in that file.
                return scriptInfo?.containingProjects.length
                    ? originalLocation
                    : location;
            }

            configuredProject = this.createConfiguredProject(configFileName, `Creating project for original file: ${originalFileInfo.fileName}${location !== originalLocation ? " for location: " + location.fileName : ""}`);
        }
        updateProjectIfDirty(configuredProject);

        const projectContainsOriginalInfo = (project: ConfiguredProject) => {
            const info = this.getScriptInfo(fileName);
            return info &&
                project.containsScriptInfo(info) &&
                !project.isSourceOfProjectReferenceRedirect(info.path);
        };

        if (configuredProject.isSolution() || !projectContainsOriginalInfo(configuredProject)) {
            // Find the project that is referenced from this solution that contains the script info directly
            configuredProject = forEachResolvedProjectReferenceProject(
                configuredProject,
                fileName,
                child => projectContainsOriginalInfo(child) ? child : undefined,
                ConfiguredProjectLoadKind.Create,
                `Creating project referenced in solution ${configuredProject.projectName} to find possible configured project for original file: ${originalFileInfo.fileName}${location !== originalLocation ? " for location: " + location.fileName : ""}`,
            );
            if (!configuredProject) return undefined;
            if (configuredProject === project) return originalLocation;
        }

        // Keep this configured project as referenced from project
        addOriginalConfiguredProject(configuredProject);

        const originalScriptInfo = this.getScriptInfo(fileName);
        if (!originalScriptInfo || !originalScriptInfo.containingProjects.length) return undefined;

        // Add configured projects as referenced
        originalScriptInfo.containingProjects.forEach(project => {
            if (isConfiguredProject(project)) {
                addOriginalConfiguredProject(project);
            }
        });
        return originalLocation;

        function addOriginalConfiguredProject(originalProject: ConfiguredProject) {
            (project.originalConfiguredProjects ??= new Set()).add(originalProject.canonicalConfigFilePath);
        }
    }
    
    private getOrCreateScriptInfoWorker(
        fileName: NormalizedPath,
        currentDirectory: string,
        openedByClient: boolean,
        fileContent: string | undefined,
        scriptKind: ScriptKind | undefined,
        hasMixedContent: boolean,
        hostToQueryFileExistsOn: { fileExists(path: string): boolean; } | undefined,
        deferredDeleteOk: boolean,
    ) {
        Debug.assert(fileContent === undefined || openedByClient, "ScriptInfo needs to be opened by client to be able to set its user defined content");
        const path = normalizedPathToPath(fileName, currentDirectory, this.toCanonicalFileName);
        let info = this.filenameToScriptInfo.get(path);
        if (!info) {
            const isDynamic = isDynamicFileName(fileName);
            Debug.assert(isRootedDiskPath(fileName) || isDynamic || openedByClient, "", () => `${JSON.stringify({ fileName, currentDirectory, hostCurrentDirectory: this.currentDirectory, openKeys: arrayFrom(this.openFilesWithNonRootedDiskPath.keys()) })}\nScript info with non-dynamic relative file name can only be open script info or in context of host currentDirectory`);
            Debug.assert(!isRootedDiskPath(fileName) || this.currentDirectory === currentDirectory || !this.openFilesWithNonRootedDiskPath.has(this.toCanonicalFileName(fileName)), "", () => `${JSON.stringify({ fileName, currentDirectory, hostCurrentDirectory: this.currentDirectory, openKeys: arrayFrom(this.openFilesWithNonRootedDiskPath.keys()) })}\nOpen script files with non rooted disk path opened with current directory context cannot have same canonical names`);
            Debug.assert(!isDynamic || this.currentDirectory === currentDirectory || this.useInferredProjectPerProjectRoot, "", () => `${JSON.stringify({ fileName, currentDirectory, hostCurrentDirectory: this.currentDirectory, openKeys: arrayFrom(this.openFilesWithNonRootedDiskPath.keys()) })}\nDynamic files must always be opened with service's current directory or service should support inferred project per projectRootPath.`);
            // If the file is not opened by client and the file doesnot exist on the disk, return
            if (!openedByClient && !isDynamic && !(hostToQueryFileExistsOn || this.host).fileExists(fileName)) {
                return;
            }
            info = new ScriptInfo(this.host, fileName, scriptKind!, hasMixedContent, path, this.filenameToScriptInfoVersion.get(path));
            this.filenameToScriptInfo.set(info.path, info);
            this.filenameToScriptInfoVersion.delete(info.path);
            if (!openedByClient) {
                this.watchClosedScriptInfo(info);
            }
            else if (!isRootedDiskPath(fileName) && (!isDynamic || this.currentDirectory !== currentDirectory)) {
                // File that is opened by user but isn't rooted disk path
                this.openFilesWithNonRootedDiskPath.set(this.toCanonicalFileName(fileName), info);
            }
        }
        else if (info.deferredDelete) {
            Debug.assert(!info.isDynamic);
            // If the file is not opened by client and the file doesnot exist on the disk, return
            if (!openedByClient && !(hostToQueryFileExistsOn || this.host).fileExists(fileName)) {
                return deferredDeleteOk ? info : undefined;
            }
            info.deferredDelete = undefined;
        }
        if (openedByClient) {
            // Opening closed script info
            // either it was created just now, or was part of projects but was closed
            this.stopWatchingScriptInfo(info);
            info.open(fileContent);
            if (hasMixedContent) {
                info.registerFileUpdate();
            }
        }
        return info;
    }

    /** @internal */
    markFileForParsing(fileName: string): boolean {        
        const filePath = this.toPath(fileName);

        if (this.shouldParse.has(filePath)) {
            return false;
        }

        this.shouldParse.add(filePath);
        this.tryGetDefaultProjectForFile(toNormalizedPath(fileName))?.markFileAsDirty(filePath);
        return true;
    }
    
    /** @internal */
    stopWatchingWildCards(canonicalConfigFilePath: NormalizedPath, forProject: ConfiguredProject) {
        const configFileExistenceInfo = this.configFileExistenceInfoCache.get(canonicalConfigFilePath)!;
        if (
            !configFileExistenceInfo.config ||
            !configFileExistenceInfo.config.projects.get(forProject.canonicalConfigFilePath)
        ) {
            return;
        }

        configFileExistenceInfo.config.projects.set(forProject.canonicalConfigFilePath, false);
        // If any of the project is still watching wild cards dont close the watcher
        if (forEachEntry(configFileExistenceInfo.config.projects, identity)) return;

        if (configFileExistenceInfo.config.watchedDirectories) {
            clearMap(configFileExistenceInfo.config.watchedDirectories, closeFileWatcherOf);
            configFileExistenceInfo.config.watchedDirectories = undefined;
        }
        configFileExistenceInfo.config.watchedDirectoriesStale = undefined;
    }

    /** @internal */
    releaseParsedConfig(canonicalConfigFilePath: NormalizedPath, forProject: ConfiguredProject) {
        const configFileExistenceInfo = this.configFileExistenceInfoCache.get(canonicalConfigFilePath)!;
        if (!configFileExistenceInfo.config?.projects.delete(forProject.canonicalConfigFilePath)) return;
        // If there are still projects watching this config file existence and config, there is nothing to do
        if (configFileExistenceInfo.config?.projects.size) return;

        configFileExistenceInfo.config = undefined;
        clearSharedExtendedConfigFileWatcher(canonicalConfigFilePath, this.sharedExtendedConfigFileWatchers);
        Debug.checkDefined(configFileExistenceInfo.watcher);
        if (configFileExistenceInfo.openFilesImpactedByConfigFile?.size) {
            // If there are open files that are impacted by this config file existence
            // but none of them are root of inferred project, the config file watcher will be
            // created when any of the script infos are added as root of inferred project
            if (configFileExistenceInfo.inferredProjectRoots) {
                // If we cannot watch config file existence without configured project, close the configured file watcher
                if (!canWatchDirectoryOrFile(getPathComponents(getDirectoryPath(canonicalConfigFilePath) as Path))) {
                    configFileExistenceInfo.watcher!.close();
                    configFileExistenceInfo.watcher = noopConfigFileWatcher;
                }
            }
            else {
                // Close existing watcher
                configFileExistenceInfo.watcher!.close();
                configFileExistenceInfo.watcher = undefined;
            }
        }
        else {
            // There is not a single file open thats tracking the status of this config file. Remove from cache
            configFileExistenceInfo.watcher!.close();
            this.configFileExistenceInfoCache.delete(canonicalConfigFilePath);
        }
    }
    
    private stopWatchingScriptInfo(info: ScriptInfo) {
        if (info.fileWatcher) {
            info.fileWatcher.close();
            info.fileWatcher = undefined;
        }
    }

    private watchClosedScriptInfo(info: ScriptInfo) {
        Debug.assert(!info.fileWatcher);
        // do not watch files with mixed content - server doesn't know how to interpret it
        // do not watch files in the global cache location
        if (
            !info.isDynamicOrHasMixedContent() &&
            (!this.globalCacheLocationDirectoryPath ||
                !startsWith(info.path, this.globalCacheLocationDirectoryPath))
        ) {
            const indexOfNodeModules = info.fileName.indexOf("/node_modules/");
            if (!this.host.getModifiedTime || indexOfNodeModules === -1) {
                info.fileWatcher = this.watchFactory.watchFile(
                    info.fileName,
                    (_fileName, eventKind) => this.onSourceFileChanged(info, eventKind),
                    PollingInterval.Medium,
                    this.hostConfiguration.watchOptions,
                    WatchType.ClosedScriptInfo,
                );
            }
            else {
                Debug.fail("not supported");
                // info.mTime = this.getModifiedTime(info);
                // info.fileWatcher = this.watchClosedScriptInfoInNodeModules(info.fileName.substring(0, indexOfNodeModules));
            }
        }
    }

    private delayUpdateProjectGraph(project: Project) {
        if (isProjectDeferredClose(project)) return;
        project.markAsDirty();
        //if (isBackgroundProject(project)) return;
        const projectName = project.getProjectName();
        this.pendingProjectUpdates.set(projectName, project);
        this.throttledOperations.schedule(projectName, /*delay*/ 250, () => {
            if (this.pendingProjectUpdates.delete(projectName)) {
                updateProjectIfDirty(project);
            }
        });
    }
   
    /** @internal */
    getWatchOptions(project: Project) {
        return this.getWatchOptionsFromProjectWatchOptions(project.getWatchOptions(), project.getCurrentDirectory());
    }

    /** @internal */
    private getWatchOptionsFromProjectWatchOptions(projectOptions: WatchOptions | undefined, basePath: string) {
        const hostWatchOptions = this.hostConfiguration.watchOptions;/*!this.hostConfiguration.beforeSubstitution ? this.hostConfiguration.watchOptions :
            handleWatchOptionsConfigDirTemplateSubstitution(
                this.hostConfiguration.beforeSubstitution,
                basePath,
            );*/
        return projectOptions && hostWatchOptions ?
            { ...hostWatchOptions, ...projectOptions } :
            projectOptions || hostWatchOptions;
    }

    
    getScriptInfoForPath(fileName: Path) {
        const path = normalizedPathToPath(toNormalizedPath(fileName), undefined, this.toCanonicalFileName);
        const info = this.filenameToScriptInfo.get(path);
        return !info || !info.deferredDelete ? info : undefined;
    }

    toPath(fileName: string) {
        return toPath(fileName, this.currentDirectory, this.toCanonicalFileName);
    }
    
    /** @internal */
    getOrCreateScriptInfoNotOpenedByClient(
        uncheckedFileName: string,
        currentDirectory: string,
        hostToQueryFileExistsOn: DirectoryStructureHost,
        deferredDeleteOk: boolean,
    ) {
        return this.getOrCreateScriptInfoNotOpenedByClientForNormalizedPath(
            toNormalizedPath(uncheckedFileName),
            currentDirectory,
            /*scriptKind*/ undefined,
            /*hasMixedContent*/ undefined,
            hostToQueryFileExistsOn,
            deferredDeleteOk,
        );
    }
    
    /** @internal */
    delayEnsureProjectForOpenFiles() {
        if (!this.openFiles.size) return;     
        this.pendingEnsureProjectForOpenFiles = true;
        this.throttledOperations.schedule(ensureProjectForOpenFileSchedule, /*delay*/ 2500, () => {
            if (this.pendingProjectUpdates.size !== 0) {
                this.delayEnsureProjectForOpenFiles();
            }
            else {
                if (this.pendingEnsureProjectForOpenFiles) {
                    this.ensureProjectForOpenFiles();

                    // Send the event to notify that there were background project updates
                    // send current list of open files
                    this.sendProjectsUpdatedInBackgroundEvent();
                }
            }
        });
    }

    /** @internal */
    sendProjectsUpdatedInBackgroundEvent() {
        if (!this.eventHandler) {
            return;
        }

        const event: ProjectsUpdatedInBackgroundEvent = {
            eventName: ProjectsUpdatedInBackgroundEvent,
            data: {
                openFiles: arrayFrom(this.openFiles.keys(), path => this.getScriptInfoForPath(path)!.fileName),
            },
        };
        this.eventHandler(event);
    }

    private delayUpdateProjectGraphs(projects: readonly Project[], clearSourceMapperCache: boolean) {
        if (projects.length) {
            for (const project of projects) {
                // Even if program doesnt change, clear the source mapper cache
                if (clearSourceMapperCache) project.clearSourceMapperCache();
                this.delayUpdateProjectGraph(project);
            }
            this.delayEnsureProjectForOpenFiles();
        }
    }

    private deleteScriptInfo(info: ScriptInfo) {
        Debug.assert(!info.isScriptOpen());
        this.filenameToScriptInfo.delete(info.path);
        this.filenameToScriptInfoVersion.set(info.path, info.textStorage.version);
        this.stopWatchingScriptInfo(info);
        const realpath = info.getRealpathIfDifferent();
        if (realpath) {
            this.realpathToScriptInfos!.remove(realpath, info); // TODO: GH#18217
        }
        info.closeSourceMapFileWatcher();
    }

    private handleDeletedFile(info: ScriptInfo, deferredDelete: boolean) {
        Debug.assert(!info.isScriptOpen());
        this.delayUpdateProjectGraphs(info.containingProjects, /*clearSourceMapperCache*/ false);
        this.handleSourceMapProjects(info);
        info.detachAllProjects();
        if (deferredDelete) {
            info.delayReloadNonMixedContentFile();
            info.deferredDelete = true;
        }
        else {
            this.deleteScriptInfo(info);
        }
    }

    private getModifiedTime(info: ScriptInfo) {
        return (this.host.getModifiedTime!(info.fileName) || missingFileModifiedTime).getTime();
    }

    private onSourceFileChanged(info: ScriptInfo, eventKind: FileWatcherEventKind) {
        Debug.assert(!info.isScriptOpen());
        if (eventKind === FileWatcherEventKind.Deleted) {
            this.handleDeletedFile(info, /*deferredDelete*/ true);
        }
        else {
            if (info.deferredDelete) info.deferredDelete = undefined;
            // file has been changed which might affect the set of referenced files in projects that include
            // this file and set of inferred projects
            info.delayReloadNonMixedContentFile();
            this.delayUpdateProjectGraphs(info.containingProjects, /*clearSourceMapperCache*/ false);
            this.handleSourceMapProjects(info);
        }
    }

    private handleSourceMapProjects(info: ScriptInfo) {
        console.warn("todo - implement me - handleSourceMapProjects");
    }
    
    findAndOpenLpcConfig(projectRootPath: string): NormalizedPath | undefined {
        const configPath = findLpcConfig(projectRootPath, this.host.getAccessibleFileSystemEntries);
        return configPath;
    }

    /** @internal */
    getScriptInfoOrConfig(uncheckedFileName: string): ScriptInfoOrConfig | undefined {
        const path = toNormalizedPath(uncheckedFileName);
        const info = this.getScriptInfoForNormalizedPath(path);
        if (info) return info;
        const configProject = this.configuredProjects.get(this.toPath(uncheckedFileName));
        return configProject && configProject.getCompilerOptions().configFile;
    }

    private cleanupConfiguredProjects(
        toRetainConfiguredProjects?: Set<ConfiguredProject>,
        externalProjectsRetainingConfiguredProjects?: Set<string>,
        openFilesWithRetainedConfiguredProject?: Set<Path>,
    ) {
        // Remove all orphan projects        
        this.getOrphanConfiguredProjects(
            toRetainConfiguredProjects,
            openFilesWithRetainedConfiguredProject,
            externalProjectsRetainingConfiguredProjects,
        ).forEach(project => this.removeProject(project));
    }
    
    private removeProject(project: Project) {
        this.logger.info("`remove Project::");
        project.print(/*writeProjectFileNames*/ true, /*writeFileExplaination*/ true, /*writeFileVersionAndText*/ false);

        project.close();
        if (Debug.shouldAssert(AssertionLevel.Normal)) {
            this.filenameToScriptInfo.forEach(info =>
                Debug.assert(
                    !info.isAttached(project),
                    "Found script Info still attached to project",
                    () =>
                        `${project.projectName}: ScriptInfos still attached: ${
                            JSON.stringify(
                                arrayFrom(
                                    mapDefinedIterator(
                                        this.filenameToScriptInfo.values(),
                                        info =>
                                            info.isAttached(project) ?
                                                {
                                                    fileName: info.fileName,
                                                    projects: info.containingProjects.map(p => p.projectName),
                                                    hasMixedContent: info.hasMixedContent,
                                                } : undefined,
                                    ),
                                ),
                                /*replacer*/ undefined,
                                " ",
                            )
                        }`,
                )
            );
        }
        // Remove the project from pending project updates
        this.pendingProjectUpdates.delete(project.getProjectName());

        switch (project.projectKind) {
            case ProjectKind.External:
                console.debug("todo - implement me - removeProject - ProjectKind.External");
                // unorderedRemoveItem(this.externalProjects, project as ExternalProject);
                // this.projectToSizeMap.delete(project.getProjectName());
                break;
            case ProjectKind.Configured:
                this.configuredProjects.delete((project as ConfiguredProject).canonicalConfigFilePath);
                this.projectToSizeMap.delete((project as ConfiguredProject).canonicalConfigFilePath);
                break;
            case ProjectKind.Inferred:
                unorderedRemoveItem(this.inferredProjects, project as InferredProject);
                break;
        }
    }
    
    /** @internal */
    getOrphanConfiguredProjects(
        toRetainConfiguredProjects: Set<ConfiguredProject> | undefined,
        openFilesWithRetainedConfiguredProject: Set<Path> | undefined,
        externalProjectsRetainingConfiguredProjects: Set<string> | undefined,
    ) {
        const toRemoveConfiguredProjects = new Set(this.configuredProjects.values());
        const markOriginalProjectsAsUsed = (project: Project) => {
            if (project.originalConfiguredProjects && (isConfiguredProject(project) || !project.isOrphan())) {
                project.originalConfiguredProjects.forEach(
                    (_value, configuredProjectPath) => {
                        const project = this.getConfiguredProjectByCanonicalConfigFilePath(configuredProjectPath);
                        return project && retainConfiguredProject(project);
                    },
                );
            }
        };
        toRetainConfiguredProjects?.forEach(retainConfiguredProject);

        // Do not remove configured projects that are used as original projects of other
        this.inferredProjects.forEach(markOriginalProjectsAsUsed);
        // this.externalProjects.forEach(markOriginalProjectsAsUsed);
        // Retain all configured projects referenced by external projects
        // this.externalProjectToConfiguredProjectMap.forEach((projects, externalProjectName) => {
        //     if (!externalProjectsRetainingConfiguredProjects?.has(externalProjectName)) {
        //         projects.forEach(retainConfiguredProject);
        //     }
        // });
        this.openFiles.forEach((_projectRootPath, path) => {
            if (openFilesWithRetainedConfiguredProject?.has(path)) return;
            const info = this.getScriptInfoForPath(path)!;
            // Part of external project
            if (find(info.containingProjects, isExternalProject)) return;
            // We want to retain the projects for open file if they are pending updates so deferredClosed projects are ok
            const result = this.tryFindDefaultConfiguredProjectAndLoadAncestorsForOpenScriptInfo(
                info,
                ConfiguredProjectLoadKind.Find,
            );
            if (result?.defaultProject) {
                result?.seenProjects.forEach(retainConfiguredProject);
            }
        });

        // Retain all the configured projects that have pending updates
        // or the ones that is referencing retained project (or to be retained)
        this.configuredProjects.forEach(project => {
            if (toRemoveConfiguredProjects.has(project)) {
                if (isPendingUpdate(project) || forEachReferencedProject(project, isRetained)) {
                    retainConfiguredProject(project);
                }
            }
        });

        return toRemoveConfiguredProjects;

        function isRetained(project: ConfiguredProject) {
            return !toRemoveConfiguredProjects.has(project) || isPendingUpdate(project);
        }

        function isPendingUpdate(project: ConfiguredProject) {
            return (
                project.deferredClose ||
                project.projectService.hasPendingProjectUpdate(project)
            ) &&
                !!project.projectService.configFileExistenceInfoCache.get(project.canonicalConfigFilePath)?.openFilesImpactedByConfigFile?.size;
        }

        function retainConfiguredProject(project: ConfiguredProject) {
            if (!toRemoveConfiguredProjects.delete(project)) return;
            // Keep original projects used
            markOriginalProjectsAsUsed(project);
            // Keep all the references alive
            forEachReferencedProject(project, retainConfiguredProject);
        }
    }

    /** @internal */
    hasPendingProjectUpdate(project: Project) {
        return this.pendingProjectUpdates.has(project.getProjectName());
    }
    
    private cleanupProjectsAndScriptInfos(
        toRetainConfiguredProjects: Set<ConfiguredProject> | undefined,
        openFilesWithRetainedConfiguredProject: Set<Path> | undefined,
        externalProjectsRetainingConfiguredProjects: Set<string> | undefined,
    ) {
        // This was postponed from closeOpenFile to after opening next file,
        // so that we can reuse the project if we need to right away
        // Remove all the non marked projects
        this.cleanupConfiguredProjects(
            toRetainConfiguredProjects,
            externalProjectsRetainingConfiguredProjects,
            openFilesWithRetainedConfiguredProject,
        );

        // Remove orphan inferred projects now that we have reused projects
        // We need to create a duplicate because we cant guarantee order after removal
        // for (const inferredProject of this.inferredProjects.slice()) {
        //     if (inferredProject.isOrphan()) {
        //         this.removeProject(inferredProject);
        //     }
        // }

        // // Delete the orphan files here because there might be orphan script infos (which are not part of project)
        // // when some file/s were closed which resulted in project removal.
        // // It was then postponed to cleanup these script infos so that they can be reused if
        // // the file from that old project is reopened because of opening file from here.
        // this.removeOrphanScriptInfos();
    }

    private printProjects() {
        if (!this.logger.hasLevel(LogLevel.normal)) {
            return;
        }

        this.logger.startGroup();

        // this.externalProjects.forEach(printProjectWithoutFileNames);
        this.configuredProjects.forEach(printProjectWithoutFileNames);
        this.inferredProjects.forEach(printProjectWithoutFileNames);

        this.logger.info("Open files: ");
        this.openFiles.forEach((projectRootPath, path) => {
            const info = this.getScriptInfoForPath(path)!;
            this.logger.info(`\tFileName: ${info.fileName} ProjectRootPath: ${projectRootPath}`);
            this.logger.info(`\t\tProjects: ${info.containingProjects.map(p => p.getProjectName())}`);
        });

        this.logger.endGroup();
    }


    openClientFileWithNormalizedPath(fileName: NormalizedPath, fileContent?: string, scriptKind?: ScriptKind, hasMixedContent?: boolean, projectRootPath?: NormalizedPath): OpenConfiguredProjectResult {        
        const info = this.getOrCreateOpenScriptInfo(fileName, fileContent, scriptKind, hasMixedContent, projectRootPath);
        const { retainProjects, ...result } = this.assignProjectToOpenedScriptInfo(info);
        this.cleanupProjectsAndScriptInfos(
            retainProjects,
            new Set([info.path]),
            /*externalProjectsRetainingConfiguredProjects*/ undefined,
        );
        //this.telemetryOnOpenFile(info);
        this.printProjects();
        return result;
    }

    /** @internal */
    sendPerformanceEvent(kind: PerformanceEvent["kind"], durationMs: number) {
        if (this.performanceEventHandler) {
            this.performanceEventHandler({ kind, durationMs });
        }
    }
    
    /**
     * Finds the default configured project for given info
     * For any tsconfig found, it looks into that project, if not then all its references,
     * The search happens for all tsconfigs till projectRootPath
     */
    private tryFindDefaultConfiguredProjectForOpenScriptInfo(
        info: ScriptInfo,
        kind: ConfiguredProjectLoadKind,
        /** Used with ConfiguredProjectLoadKind.Find  to get deferredClosed projects as well */
        allowDeferredClosed?: boolean,
        /** Used with ConfiguredProjectLoadKind.Reload to check if this project was already reloaded */
        reloadedProjects?: Set<ConfiguredProject>,
    ): DefaultConfiguredProjectResult | undefined {
        const configFileName = this.getConfigFileNameForFile(info, kind === ConfiguredProjectLoadKind.Find);
        // If no config file name, no result
        if (!configFileName) return;

        const result = this.findCreateOrReloadConfiguredProject(
            configFileName,
            kind,
            fileOpenReason(info),
            allowDeferredClosed,
            info.fileName,
            reloadedProjects,
        );
        // If the project for the configFileName does not exist, no result
        if (!result) return;

        const seenProjects = new Set<ConfiguredProject>();
        const sentConfigDiag = new Set<ConfiguredProject>(result.sentConfigFileDiag ? [result.project] : undefined);
        let defaultProject: ConfiguredProject | undefined;
        let possiblyDefault: ConfiguredProject | undefined;
        // See if this is the project or is it one of the references or find ancestor projects
        tryFindDefaultConfiguredProject(result.project);
        return {
            defaultProject: defaultProject ?? possiblyDefault,
            sentConfigDiag,
            seenProjects,
        };

        function tryFindDefaultConfiguredProject(project: ConfiguredProject): ConfiguredProject | undefined {
            return isDefaultProject(project) ?
                defaultProject :
                tryFindDefaultConfiguredProjectFromReferences(project);
        }

        function isDefaultProject(project: ConfiguredProject): ConfiguredProject | undefined {
            // Skip already looked up projects
            if (!tryAddToSet(seenProjects, project)) return;
            // If script info belongs to this project, use this as default config project
            const projectWithInfo = project.containsScriptInfo(info);
            if (projectWithInfo && !project.isSourceOfProjectReferenceRedirect(info.path)) return defaultProject = project;
            // If this project uses the script info, if default project is not found, use this project as possible default
            possiblyDefault ??= projectWithInfo ? project : undefined;
        }

        function tryFindDefaultConfiguredProjectFromReferences(project: ConfiguredProject) {
            // If this configured project doesnt contain script info but
            // if this is solution with project references, try those project references
            return undefined;
            // return forEachResolvedProjectReferenceProject(
            //     project,
            //     info.path,
            //     (child, sentConfigFileDiag) => {
            //         if (sentConfigFileDiag) sentConfigDiag.add(child);
            //         return isDefaultProject(child);
            //     },
            //     kind,
            //     `Creating project referenced in solution ${project.projectName} to find possible configured project for ${info.fileName} to open`,
            //     allowDeferredClosed,
            //     info.fileName,
            //     reloadedProjects,
            // );
        }
    }

    /** @internal */
    private clearSemanticCache(project: Project) {
        project.originalConfiguredProjects = undefined;
        project.resolutionCache.clear();
        project.getLanguageService(/*ensureSynchronized*/ false).cleanupSemanticCache();
        project.cleanupProgram();
        project.markAsDirty();
    }

    

    /** @internal */
    reloadConfiguredProjectClearingSemanticCache(
        project: ConfiguredProject,
        reason: string,
        reloadedProjects: Set<ConfiguredProject>,
    ) {
        if (!tryAddToSet(reloadedProjects, project)) return false;
        this.clearSemanticCache(project);
        this.reloadConfiguredProject(project, reloadReason(reason));
        return true;
    }

    
    /**
     * Read the config file of the project again by clearing the cache and update the project graph
     *
     * @internal
     */
    reloadConfiguredProject(project: ConfiguredProject, reason: string) {
        project.isInitialLoadPending = returnFalse;
        project.pendingUpdateReason = undefined;
        project.pendingUpdateLevel = ProgramUpdateLevel.Update;

        // At this point, there is no reason to not have configFile in the host
        const host = project.getCachedDirectoryStructureHost();

        // Clear the cache since we are reloading the project from disk
        host.clearCache();

        // Load project from the disk
        this.loadConfiguredProject(project, reason);
        updateWithTriggerFile(project, project.triggerFileForConfigFileDiag ?? project.getConfigFilePath(), /*isReload*/ true);
    }
    
    /**
     * Read the config file of the project, and update the project root file names.
     *
     * @internal
     */
    private loadConfiguredProject(project: ConfiguredProject, reason: string) {
        tracing?.push(tracing.Phase.Session, "loadConfiguredProject", { configFilePath: project.canonicalConfigFilePath });       
        //this.sendProjectLoadingStartEvent(project, reason);

        // R ad updated contents from disk
        const configFilename = asNormalizedPath(normalizePath(project.getConfigFilePath()));
        const configFileExistenceInfo = this.ensureParsedConfigUptoDate(
            configFilename,
            project.canonicalConfigFilePath,
            this.configFileExistenceInfoCache.get(project.canonicalConfigFilePath)!,
            project,
        );
        const parsedCommandLine = configFileExistenceInfo.config!.parsedCommandLine!;
        Debug.assert(!!parsedCommandLine.fileNames);
        const compilerOptions = parsedCommandLine.options;

        // Update the project
        // if (!project.projectOptions) {
        //     project.projectOptions = {
        //         configHasExtendsProperty: parsedCommandLine.raw.extends !== undefined,
        //         configHasFilesProperty: parsedCommandLine.raw.files !== undefined,
        //         configHasIncludeProperty: parsedCommandLine.raw.include !== undefined,
        //         configHasExcludeProperty: parsedCommandLine.raw.exclude !== undefined,
        //     };
        // }
        // project.canConfigFileJsonReportNoInputFiles = canJsonReportNoInputFiles(parsedCommandLine.raw);
        project.setProjectErrors(parsedCommandLine.options.configFile!.parseDiagnostics);
        project.updateReferences(parsedCommandLine.projectReferences);
        // const lastFileExceededProgramSize = this.getFilenameForExceededTotalSizeLimitForNonTsFiles(project.canonicalConfigFilePath, compilerOptions, parsedCommandLine.fileNames, fileNamePropertyReader);
        // if (lastFileExceededProgramSize) {
        //     project.disableLanguageService(lastFileExceededProgramSize);
        //     this.configFileExistenceInfoCache.forEach((_configFileExistenceInfo, canonicalConfigFilePath) => this.stopWatchingWildCards(canonicalConfigFilePath, project));
        // }
        // else {
            project.setCompilerOptions(compilerOptions);
            project.setWatchOptions(parsedCommandLine.watchOptions);
            project.enableLanguageService();
            this.watchWildcards(configFilename, configFileExistenceInfo, project);
        // }
        // project.enablePluginsWithOptions(compilerOptions);
        const filesToAdd = parsedCommandLine.fileNames;//.concat(project.getExternalFiles(ProgramUpdateLevel.Full));
        this.updateRootAndOptionsOfNonInferredProject(project, filesToAdd, fileNamePropertyReader, compilerOptions, parsedCommandLine.typeAcquisition!, parsedCommandLine.compileOnSave, parsedCommandLine.watchOptions);
        tracing?.pop();
    }

    private updateRootAndOptionsOfNonInferredProject<T>(project: /*ExternalProject |*/ ConfiguredProject, newUncheckedFiles: T[], propertyReader: FilePropertyReader<T>, newOptions: CompilerOptions, newTypeAcquisition: TypeAcquisition, compileOnSave: boolean | undefined, watchOptions: WatchOptions | undefined) {
        project.setCompilerOptions(newOptions);
        project.setWatchOptions(watchOptions);
        // VS only set the CompileOnSaveEnabled option in the request if the option was changed recently
        // therefore if it is undefined, it should not be updated.
        if (compileOnSave !== undefined) {
            project.compileOnSaveEnabled = compileOnSave;
        }
        this.addFilesToNonInferredProject(project, newUncheckedFiles, propertyReader, newTypeAcquisition);
    }

    private addFilesToNonInferredProject<T>(project: ConfiguredProject/* | ExternalProject*/, files: T[], propertyReader: FilePropertyReader<T>, typeAcquisition: TypeAcquisition): void {
        this.updateNonInferredProjectFiles(project, files, propertyReader);
        project.setTypeAcquisition(typeAcquisition);
        project.markAsDirty();
    }

    

    /** @internal */
    watchWildcards(configFileName: NormalizedPath, { exists, config }: ConfigFileExistenceInfo, forProject: ConfiguredProject) {
        config!.projects.set(forProject.canonicalConfigFilePath, true);
        if (exists) {
            if (config!.watchedDirectories && !config!.watchedDirectoriesStale) return;
            config!.watchedDirectoriesStale = false;
            updateWatchingWildcardDirectories(
                config!.watchedDirectories ||= new Map(),
                config!.parsedCommandLine!.wildcardDirectories,
                // Create new directory watcher
                (directory, flags) => this.watchWildcardDirectory(directory, flags, configFileName, config!),
            );
        }
        else {
            config!.watchedDirectoriesStale = false;
            if (!config!.watchedDirectories) return;
            clearMap(config!.watchedDirectories, closeFileWatcherOf);
            config!.watchedDirectories = undefined;
        }
    }
    
    /** @internal */
    tryGetDefaultProjectForFile(fileNameOrScriptInfo: NormalizedPath | ScriptInfo): Project | undefined {
        const scriptInfo = isString(fileNameOrScriptInfo) ? this.getScriptInfoForNormalizedPath(fileNameOrScriptInfo) : fileNameOrScriptInfo;
        return scriptInfo && !scriptInfo.isOrphan() ? scriptInfo.getDefaultProject() : undefined;
    }
    
    /**
     * This is to watch whenever files are added or removed to the wildcard directories
     *
     * @internal
     */
    private watchWildcardDirectory(directory: string, flags: WatchDirectoryFlags, configFileName: NormalizedPath, config: ParsedConfig) {
        let watcher: FileWatcher | undefined = this.watchFactory.watchDirectory(
            directory,
            fileOrDirectory => {
                const fileOrDirectoryPath = this.toPath(fileOrDirectory);
                const fsResult = config.cachedDirectoryStructureHost.addOrDeleteFileOrDirectory(fileOrDirectory, fileOrDirectoryPath);
                if (
                    getBaseFileName(fileOrDirectoryPath) === "package.json" /*&& !isInsideNodeModules(fileOrDirectoryPath) */&&
                    (fsResult && fsResult.fileExists || !fsResult && this.host.fileExists(fileOrDirectory))
                ) {
                    const file = this.getNormalizedAbsolutePath(fileOrDirectory);
                    this.logger.info(`Config: ${configFileName} Detected new package.json: ${file}`);
                    // this.packageJsonCache.addOrUpdate(file, fileOrDirectoryPath);
                    // this.watchPackageJsonFile(file, fileOrDirectoryPath, result);
                }

                const configuredProjectForConfig = this.findConfiguredProjectByProjectName(configFileName);
                if (
                    isIgnoredFileFromWildCardWatching({
                        watchedDirPath: this.toPath(directory),
                        fileOrDirectory,
                        fileOrDirectoryPath,
                        configFileName,
                        extraFileExtensions: this.hostConfiguration.extraFileExtensions,
                        currentDirectory: this.currentDirectory,
                        options: config.parsedCommandLine!.options,
                        program: configuredProjectForConfig?.getCurrentProgram() || config.parsedCommandLine!.fileNames,
                        useCaseSensitiveFileNames: this.host.useCaseSensitiveFileNames,
                        writeLog: s => this.logger.info(s),
                        toPath: s => this.toPath(s),
                        getScriptKind: configuredProjectForConfig ? (fileName => configuredProjectForConfig.getScriptKind(fileName)) : undefined,
                    })
                ) return;

                // Reload is pending, do the reload
                if (config.updateLevel !== ProgramUpdateLevel.Full) config.updateLevel = ProgramUpdateLevel.RootNamesAndUpdate;
                config.projects.forEach((watchWildcardDirectories, projectCanonicalPath) => {
                    if (!watchWildcardDirectories) return;
                    const project = this.getConfiguredProjectByCanonicalConfigFilePath(projectCanonicalPath);
                    if (!project) return;

                    // if (
                    //     configuredProjectForConfig !== project &&
                    //     this.getHostPreferences().includeCompletionsForModuleExports
                    // ) {
                    //     const path = this.toPath(configFileName);
                    //     if (find(project.getCurrentProgram()?.getResolvedProjectReferences(), ref => ref?.sourceFile.path === path)) {
                    //         project.markAutoImportProviderAsDirty();
                    //     }
                    // }

                    // Load root file names for configured project with the config file name
                    // But only schedule update if project references this config file
                    const updateLevel = configuredProjectForConfig === project ? ProgramUpdateLevel.RootNamesAndUpdate : ProgramUpdateLevel.Update;
                    if (project.pendingUpdateLevel > updateLevel) return;

                    // don't trigger callback on open, existing files
                    if (this.openFiles.has(fileOrDirectoryPath)) {
                        const info = Debug.checkDefined(this.getScriptInfoForPath(fileOrDirectoryPath));
                        if (info.isAttached(project)) {
                            const loadLevelToSet = Math.max(updateLevel, project.openFileWatchTriggered.get(fileOrDirectoryPath) || ProgramUpdateLevel.Update) as ProgramUpdateLevel;
                            project.openFileWatchTriggered.set(fileOrDirectoryPath, loadLevelToSet);
                        }
                        else {
                            project.pendingUpdateLevel = updateLevel;
                            this.delayUpdateProjectGraphAndEnsureProjectStructureForOpenFiles(project);
                        }
                    }
                    else {
                        project.pendingUpdateLevel = updateLevel;
                        this.delayUpdateProjectGraphAndEnsureProjectStructureForOpenFiles(project);
                    }
                });
            },
            flags,
            this.getWatchOptionsFromProjectWatchOptions(config.parsedCommandLine!.watchOptions, getDirectoryPath(configFileName)),
            WatchType.WildcardDirectory,
            configFileName,
        );

        const result: WildcardWatcher = {
            packageJsonWatches: undefined,
            close() {
                if (watcher) {
                    watcher.close();
                    watcher = undefined;
                    result.packageJsonWatches?.forEach(watcher => {
                        watcher.projects.delete(result);
                        watcher.close();
                    });
                    result.packageJsonWatches = undefined;
                }
            },
        };
        return result;
    }
    
    /** @internal */
    onUpdateLanguageServiceStateForProject(project: Project, languageServiceEnabled: boolean) {
        if (!this.eventHandler) {
            return;
        }
        const event: ProjectLanguageServiceStateEvent = {
            eventName: ProjectLanguageServiceStateEvent,
            data: { project, languageServiceEnabled },
        };
        this.eventHandler(event);
    }


    /**
     * Reload the file names from config file specs and update the project graph
     *
     * @internal
     */
    reloadFileNamesOfConfiguredProject(project: ConfiguredProject) {
        const fileNames = this.reloadFileNamesOfParsedConfig(project.getConfigFilePath(), this.configFileExistenceInfoCache.get(project.canonicalConfigFilePath)!.config!);
        project.updateErrorOnNoInputFiles(fileNames);
        //this.updateNonInferredProjectFiles(project, fileNames.concat(project.getExternalFiles(ProgramUpdateLevel.RootNamesAndUpdate)), fileNamePropertyReader);
        this.updateNonInferredProjectFiles(project, fileNames, fileNamePropertyReader);
        project.markAsDirty();
        return project.updateGraph();
    }    

    /** @internal */
    ensureParsedConfigUptoDate(configFilename: NormalizedPath, canonicalConfigFilePath: NormalizedPath, configFileExistenceInfo: ConfigFileExistenceInfo, forProject: ConfiguredProject): ConfigFileExistenceInfo {
        if (configFileExistenceInfo.config) {
            if (!configFileExistenceInfo.config.updateLevel) return configFileExistenceInfo;
            if (configFileExistenceInfo.config.updateLevel === ProgramUpdateLevel.RootNamesAndUpdate) {
                this.reloadFileNamesOfParsedConfig(configFilename, configFileExistenceInfo.config);
                return configFileExistenceInfo;
            }
        }

        // Parse the config file and ensure its cached
        const cachedDirectoryStructureHost = configFileExistenceInfo.config?.cachedDirectoryStructureHost ||
            createCachedDirectoryStructureHost(this.host, this.host.getCurrentDirectory(), this.host.useCaseSensitiveFileNames)!;

        // Read updated contents from disk
        const configFileContent = tryReadFile(configFilename, fileName => this.host.readFile(fileName));
        const configFile = parseJsonText(configFilename, isString(configFileContent) ? configFileContent : "") as LpcConfigSourceFile;
        const configFileErrors = configFile.parseDiagnostics as Diagnostic[];
        if (!isString(configFileContent)) configFileErrors.push(configFileContent);
        const configDir = getDirectoryPath(configFilename);
        const parsedCommandLine = parseLpcSourceFileConfigFileContent(
            configFile,
            cachedDirectoryStructureHost,
            configDir,
            /*existingOptions*/ undefined,
            configFilename,
            /*resolutionStack*/ undefined,
            this.hostConfiguration?.extraFileExtensions,
            // this.extendedConfigCache,
        );

        if (parsedCommandLine.errors.length) {
            configFileErrors.push(...parsedCommandLine.errors);
        }

        this.logger.info(`Config: ${configFilename} : ${
            JSON.stringify(
                {
                    rootNames: parsedCommandLine.fileNames?.length,
                    options: parsedCommandLine.options,
                    watchOptions: parsedCommandLine.watchOptions,
                    projectReferences: parsedCommandLine.projectReferences,
                },
                /*replacer*/ undefined,
                " ",
            )
        }`);

        const oldCommandLine = configFileExistenceInfo.config?.parsedCommandLine;
        if (!configFileExistenceInfo.config) {
            configFileExistenceInfo.config = { parsedCommandLine, cachedDirectoryStructureHost, projects: new Map() };
        }
        else {
            configFileExistenceInfo.config.parsedCommandLine = parsedCommandLine;
            configFileExistenceInfo.config.watchedDirectoriesStale = true;
            configFileExistenceInfo.config.updateLevel = undefined;
        }

        // If watch options different than older options when setting for the first time, update the config file watcher
        if (
            !oldCommandLine && !isJsonEqual(
                // Old options
                this.getWatchOptionsFromProjectWatchOptions(/*projectOptions*/ undefined, configDir),
                // New options
                this.getWatchOptionsFromProjectWatchOptions(parsedCommandLine.watchOptions, configDir),
            )
        ) {
            // Reset the config file watcher
            configFileExistenceInfo.watcher?.close();
            configFileExistenceInfo.watcher = undefined;
        }

        // Ensure there is watcher for this config file
        this.createConfigFileWatcherForParsedConfig(configFilename, canonicalConfigFilePath, forProject);
        // Watch extended config files
        // upda
          5
        return configFileExistenceInfo;
    }
    
    private updateNonInferredProjectFiles<T>(project: Project, files: readonly T[], propertyReader: FilePropertyReader<T>) {
        const projectRootFilesMap = project.getRootFilesMap();
        const newRootScriptInfoMap = new Map<string, true>();

        for (const f of files) {
            const newRootFile = propertyReader.getFileName(f);
            const fileName = toNormalizedPath(newRootFile);
            const isDynamic = isDynamicFileName(fileName);
            let path: Path;
            // Use the project's fileExists so that it can use caching instead of reaching to disk for the query
            if (!isDynamic && !project.fileExists(newRootFile)) {
                path = normalizedPathToPath(fileName, this.currentDirectory, this.toCanonicalFileName);
                const existingValue = projectRootFilesMap.get(path);
                if (existingValue) {
                    if (existingValue.info?.path === path) {
                        project.removeFile(existingValue.info, /*fileExists*/ false, /*detachFromProject*/ true);
                        existingValue.info = undefined;
                    }
                    existingValue.fileName = fileName;
                }
                else {
                    projectRootFilesMap.set(path, { fileName });
                }
            }
            else {
                const scriptKind = propertyReader.getScriptKind(f, this.hostConfiguration.extraFileExtensions);
                const hasMixedContent = propertyReader.hasMixedContent(f, this.hostConfiguration.extraFileExtensions);
                const scriptInfo = Debug.checkDefined(this.getOrCreateScriptInfoNotOpenedByClientForNormalizedPath(
                    fileName,
                    project.currentDirectory,
                    scriptKind,
                    hasMixedContent,
                    project.directoryStructureHost,
                    /*deferredDeleteOk*/ false,
                ));
                path = scriptInfo.path;
                const existingValue = projectRootFilesMap.get(path);
                // If this script info is not already a root add it
                if (!existingValue || existingValue.info !== scriptInfo) {
                    project.addRoot(scriptInfo, fileName);
                    if (scriptInfo.isScriptOpen()) {
                        // if file is already root in some inferred project
                        // - remove the file from that project and delete the project if necessary
                        this.removeRootOfInferredProjectIfNowPartOfOtherProject(scriptInfo);
                    }
                }
                else {
                    // Already root update the fileName
                    existingValue.fileName = fileName;
                }
            }
            newRootScriptInfoMap.set(path, true);
        }

        // project's root file map size is always going to be same or larger than new roots map
        // as we have already all the new files to the project
        if (projectRootFilesMap.size > newRootScriptInfoMap.size) {
            projectRootFilesMap.forEach((value, path) => {
                if (!newRootScriptInfoMap.has(path)) {
                    if (value.info) {
                        project.removeFile(value.info, project.fileExists(value.info.fileName), /*detachFromProject*/ true);
                    }
                    else {
                        projectRootFilesMap.delete(path);
                    }
                }
            });
        }
    }

    /**
     * Remove the root of inferred project if script info is part of another project
     */
    private removeRootOfInferredProjectIfNowPartOfOtherProject(info: ScriptInfo) {
        // If the script info is root of inferred project, it could only be first containing project
        // since info is added as root to the inferred project only when there are no other projects containing it
        // So when it is root of the inferred project and after project structure updates its now part
        // of multiple project it needs to be removed from that inferred project because:
        // - references in inferred project supersede the root part
        // - root / reference in non - inferred project beats root in inferred project

        // eg. say this is structure /a/b/a.ts /a/b/c.ts where c.ts references a.ts
        // When a.ts is opened, since there is no configured project/external project a.ts can be part of
        // a.ts is added as root to inferred project.
        // Now at time of opening c.ts, c.ts is also not aprt of any existing project,
        // so it will be added to inferred project as a root. (for sake of this example assume single inferred project is false)
        // So at this poing a.ts is part of first inferred project and second inferred project (of which c.ts is root)
        // And hence it needs to be removed from the first inferred project.
        Debug.assert(info.containingProjects.length > 0);
        const firstProject = info.containingProjects[0];

        if (
            !firstProject.isOrphan() &&
            isInferredProject(firstProject) &&
            firstProject.isRoot(info) &&
            forEach(info.containingProjects, p => p !== firstProject && !p.isOrphan())
        ) {
            firstProject.removeFile(info, /*fileExists*/ true, /*detachFromProject*/ true);
        }
    }

    
    /** @internal */
    private reloadFileNamesOfParsedConfig(configFileName: NormalizedPath, config: ParsedConfig) {
        if (config.updateLevel === undefined) return config.parsedCommandLine!.fileNames;
        Debug.assert(config.updateLevel === ProgramUpdateLevel.RootNamesAndUpdate);
        const configFileSpecs = config.parsedCommandLine!.options.configFile!.configFileSpecs!;
        const fileNames = getFileNamesFromConfigSpecs(
            configFileSpecs,
            getDirectoryPath(configFileName),
            config.parsedCommandLine!.options,
            config.cachedDirectoryStructureHost,
            this.hostConfiguration.extraFileExtensions,
        );
        config.parsedCommandLine = { ...config.parsedCommandLine!, fileNames };
        return fileNames;
    }

    /**
     * Depending on kind
     * - Find the configuedProject and return it - if allowDeferredClosed is set it will find the deferredClosed project as well
     * - Create - if the project doesnt exist, it creates one as well. If not delayLoad, the project is updated (with triggerFile if passed)
     * - Reload - if the project doesnt exist, it creates one. If not delayLoad, the project is reloaded clearing semantic cache
     *  @internal
     */
    findCreateOrReloadConfiguredProject(
        configFileName: NormalizedPath,
        kind: ConfiguredProjectLoadKind,
        /** Used with ConfiguredProjectLoadKind.Create or ConfiguredProjectLoadKind.Reload for new projects or reload updates */
        reason?: string,
        /** Used with ConfiguredProjectLoadKind.Find to get deferredClosed projects as well */
        allowDeferredClosed?: boolean,
        /** Used with ConfiguredProjectLoadKind.Create to send configFileDiag */
        triggerFile?: NormalizedPath,
        /** Used with ConfiguredProjectLoadKind.Reload to check if this project was already reloaded */
        reloadedProjects?: Set<ConfiguredProject>,
        /** Used with ConfiguredProjectLoadKind.Create to specify only create project without updating */
        delayLoad?: boolean,
        /** Used with ConfiguredProjectLoadKind.Reload to specify delay reload, and also a set of configured projects already marked for delay load */
        delayReloadedConfiguredProjects?: Set<ConfiguredProject>,
    ): FindCreateOrLoadConfiguredProjectResult | undefined {
        let project = this.findConfiguredProjectByProjectName(configFileName, allowDeferredClosed);
        let sentConfigFileDiag = false;
        switch (kind) {
            case ConfiguredProjectLoadKind.Find:
                if (!project) return;
                break;
            case ConfiguredProjectLoadKind.Create:
                project ??= this.createConfiguredProject(configFileName, reason!);
                // Ensure project is updated
                sentConfigFileDiag = !delayLoad && updateConfiguredProject(project, triggerFile);
                break;
            case ConfiguredProjectLoadKind.Reload:
                project ??= this.createConfiguredProject(configFileName, reloadReason(reason!));
                // Reload immediately if not delayed
                sentConfigFileDiag = !delayReloadedConfiguredProjects &&
                    this.reloadConfiguredProjectClearingSemanticCache(project, reason!, reloadedProjects!);
                if (
                    delayReloadedConfiguredProjects &&
                    !delayReloadedConfiguredProjects.has(project) &&
                    !reloadedProjects!.has(project)
                ) {
                    // Add to delayed reload
                    project.pendingUpdateLevel = ProgramUpdateLevel.Full;
                    project.pendingUpdateReason = reloadReason(reason!);
                    delayReloadedConfiguredProjects.add(project);
                }
                break;
            default:
                Debug.assertNever(kind);
        }
        return { project, sentConfigFileDiag };
    }


    /**
     * Finds the default configured project, if found, it creates the solution projects (does not load them right away)
     * with Find: finds the projects even if the project is deferredClosed
     */
    private tryFindDefaultConfiguredProjectAndLoadAncestorsForOpenScriptInfo(
        info: ScriptInfo,
        kind: ConfiguredProjectLoadKind.Find | ConfiguredProjectLoadKind.Create,
    ): DefaultConfiguredProjectResult | undefined;
    private tryFindDefaultConfiguredProjectAndLoadAncestorsForOpenScriptInfo(
        info: ScriptInfo,
        kind: ConfiguredProjectLoadKind.Reload,
        reloadedProjects: Set<ConfiguredProject>,
        delayReloadedConfiguredProjects: Set<ConfiguredProject>,
    ): DefaultConfiguredProjectResult | undefined;
    private tryFindDefaultConfiguredProjectAndLoadAncestorsForOpenScriptInfo(
        info: ScriptInfo,
        kind: ConfiguredProjectLoadKind,
        reloadedProjects?: Set<ConfiguredProject>,
        delayReloadedConfiguredProjects?: Set<ConfiguredProject>,
    ): DefaultConfiguredProjectResult | undefined {
        const allowDeferredClosed = kind === ConfiguredProjectLoadKind.Find;
        // Find default project
        const result = this.tryFindDefaultConfiguredProjectForOpenScriptInfo(
            info,
            kind,
            allowDeferredClosed,
            reloadedProjects,
        );
        if (!result) return;
        const { defaultProject, seenProjects } = result;
        if (defaultProject) {
            // Create ancestor tree for findAllRefs (dont load them right away)
            // forEachAncestorProject(
            //     info,
            //     defaultProject,
            //     ancestor => {
            //         seenProjects.add(ancestor);
            //     },
            //     kind,
            //     `Creating project possibly referencing default composite project ${defaultProject.getProjectName()} of open file ${info.fileName}`,
            //     allowDeferredClosed,
            //     reloadedProjects,
            //     delayReloadedConfiguredProjects,
            // );
        }
        return result;
    }


    private assignProjectToOpenedScriptInfo(info: ScriptInfo): AssignProjectResult {
        let configFileName: NormalizedPath | undefined;
        let configFileErrors: readonly Diagnostic[] | undefined;
        const project = undefined;// this.findExternalProjectContainingOpenScriptInfo(info);
        let retainProjects: Set<ConfiguredProject> | undefined;
        let sentConfigDiag: Set<ConfiguredProject> | undefined;
        if (!project && this.serverMode === LanguageServiceMode.Semantic) { // Checking semantic mode is an optimization
            const result = this.tryFindDefaultConfiguredProjectAndLoadAncestorsForOpenScriptInfo(
                info,
                ConfiguredProjectLoadKind.Create,
            );
            if (result) {
                retainProjects = result.seenProjects;
                sentConfigDiag = result.sentConfigDiag;
                if (result.defaultProject) {
                    configFileName = result.defaultProject.getConfigFilePath();
                    configFileErrors = result.defaultProject.getAllProjectErrors();
                }
            }
        }

        // Project we have at this point is going to be updated since its either found through
        // - external project search, which updates the project before checking if info is present in it
        // - configured project - either created or updated to ensure we know correct status of info

        // At this point we need to ensure that containing projects of the info are uptodate
        // This will ensure that later question of info.isOrphan() will return correct answer
        // and we correctly create inferred project for the info
        info.containingProjects.forEach(updateProjectIfDirty);

        // At this point if file is part of any any configured or external project, then it would be present in the containing projects
        // So if it still doesnt have any containing projects, it needs to be part of inferred project
        if (info.isOrphan()) {
            // Even though this info did not belong to any of the configured projects, send the config file diag
            retainProjects?.forEach(project => {
                if (!sentConfigDiag!.has(project)) this.sendConfigFileDiagEvent(project, info.fileName, /*force*/ true);
            });
            Debug.assert(this.openFiles.has(info.path));            
            this.assignOrphanScriptInfoToInferredProject(info, this.openFiles.get(info.path));
        }
        Debug.assert(!info.isOrphan());
        return { configFileName, configFileErrors, retainProjects };
    }

    /** @internal */
    assignOrphanScriptInfoToInferredProject(info: ScriptInfo, projectRootPath: NormalizedPath | undefined) {
        Debug.assert(info.isOrphan());
        const project = this.getOrCreateInferredProjectForProjectRootPathIfEnabled(info, projectRootPath) ||
            this.getOrCreateSingleInferredProjectIfEnabled() ||
            this.getOrCreateSingleInferredWithoutProjectRoot(
                info.isDynamic ?
                    projectRootPath || this.currentDirectory :
                    getDirectoryPath(
                        isRootedDiskPath(info.fileName) ?
                            info.fileName :
                            getNormalizedAbsolutePath(
                                info.fileName,
                                projectRootPath ?
                                    this.getNormalizedAbsolutePath(projectRootPath) :
                                    this.currentDirectory,
                            ),
                    ),
            );

        project.addRoot(info);
        if (info.containingProjects[0] !== project) {
            // Ensure this is first project, we could be in this scenario because info could be part of orphan project
            orderedRemoveItem(info.containingProjects, project);
            info.containingProjects.unshift(project);
        }
        project.updateGraph();

        if (!this.useSingleInferredProject && !project.projectRootPath) {
            // Note that we need to create a copy of the array since the list of project can change
            for (const inferredProject of this.inferredProjects) {
                if (inferredProject === project || inferredProject.isOrphan()) {
                    continue;
                }

                // Remove the inferred project if the root of it is now part of newly created inferred project
                // e.g through references
                // Which means if any root of inferred project is part of more than 1 project can be removed
                // This logic is same as iterating over all open files and calling
                // this.removeRootOfInferredProjectIfNowPartOfOtherProject(f);
                // Since this is also called from refreshInferredProject and closeOpen file
                // to update inferred projects of the open file, this iteration might be faster
                // instead of scanning all open files
                const roots = inferredProject.getRootScriptInfos();
                Debug.assert(roots.length === 1 || !!inferredProject.projectRootPath);
                if (roots.length === 1 && forEach(roots[0].containingProjects, p => p !== roots[0].containingProjects[0] && !p.isOrphan())) {
                    inferredProject.removeFile(roots[0], /*fileExists*/ true, /*detachFromProject*/ true);
                }
            }
        }

        return project;
    }

    private getOrCreateInferredProjectForProjectRootPathIfEnabled(info: ScriptInfo, projectRootPath: NormalizedPath | undefined): InferredProject | undefined {
        if (
            !this.useInferredProjectPerProjectRoot ||
            // Its a dynamic info opened without project root
            (info.isDynamic && projectRootPath === undefined)
        ) {
            return undefined;
        }

        if (projectRootPath) {
            const canonicalProjectRootPath = this.toCanonicalFileName(projectRootPath);
            // if we have an explicit project root path, find (or create) the matching inferred project.
            for (const project of this.inferredProjects) {
                if (project.projectRootPath === canonicalProjectRootPath) {
                    return project;
                }
            }
            return this.createInferredProject(projectRootPath, /*isSingleInferredProject*/ false, projectRootPath);
        }

        // we don't have an explicit root path, so we should try to find an inferred project
        // that more closely contains the file.
        let bestMatch: InferredProject | undefined;
        for (const project of this.inferredProjects) {
            // ignore single inferred projects (handled elsewhere)
            if (!project.projectRootPath) continue;
            // ignore inferred projects that don't contain the root's path
            if (!containsPath(project.projectRootPath, info.path, this.host.getCurrentDirectory(), !this.host.useCaseSensitiveFileNames)) continue;
            // ignore inferred projects that are higher up in the project root.
            // TODO(rbuckton): Should we add the file as a root to these as well?
            if (bestMatch && bestMatch.projectRootPath!.length > project.projectRootPath.length) continue;
            bestMatch = project;
        }

        return bestMatch;
    }

    private getOrCreateSingleInferredProjectIfEnabled(): InferredProject | undefined {
        if (!this.useSingleInferredProject) {
            return undefined;
        }

        // If `useInferredProjectPerProjectRoot` is not enabled, then there will only be one
        // inferred project for all files. If `useInferredProjectPerProjectRoot` is enabled
        // then we want to put all files that are not opened with a `projectRootPath` into
        // the same inferred project.
        //
        // To avoid the cost of searching through the array and to optimize for the case where
        // `useInferredProjectPerProjectRoot` is not enabled, we will always put the inferred
        // project for non-rooted files at the front of the array.
        if (this.inferredProjects.length > 0 && this.inferredProjects[0].projectRootPath === undefined) {
            return this.inferredProjects[0];
        }

        // Single inferred project does not have a project root and hence no current directory
        return this.createInferredProject("", /*isSingleInferredProject*/ true);
    }

    private getOrCreateSingleInferredWithoutProjectRoot(currentDirectory: string): InferredProject {
        Debug.assert(!this.useSingleInferredProject);
        const expectedCurrentDirectory = this.toCanonicalFileName(this.getNormalizedAbsolutePath(currentDirectory));
        // Reuse the project with same current directory but no roots
        for (const inferredProject of this.inferredProjects) {
            if (
                !inferredProject.projectRootPath &&
                inferredProject.isOrphan() &&
                inferredProject.canonicalCurrentDirectory === expectedCurrentDirectory
            ) {
                return inferredProject;
            }
        }

        return this.createInferredProject(currentDirectory);
    }

    setCompilerOptionsForInferredProjects(projectCompilerOptions: protocol.InferredProjectCompilerOptions, projectRootPath?: string): void {
        Debug.assert(projectRootPath === undefined || this.useInferredProjectPerProjectRoot, "Setting compiler options per project root path is only supported when useInferredProjectPerProjectRoot is enabled");

        const compilerOptions = convertCompilerOptions(projectCompilerOptions);
        const watchOptions = convertWatchOptions(projectCompilerOptions, projectRootPath);
        const typeAcquisition = convertTypeAcquisition(projectCompilerOptions);

        // always set 'allowNonTsExtensions' for inferred projects since user cannot configure it from the outside
        // previously we did not expose a way for user to change these settings and this option was enabled by default
        compilerOptions.allowNonTsExtensions = true;
        const canonicalProjectRootPath = projectRootPath && this.toCanonicalFileName(projectRootPath);
        if (canonicalProjectRootPath) {
            this.compilerOptionsForInferredProjectsPerProjectRoot.set(canonicalProjectRootPath, compilerOptions);
            this.watchOptionsForInferredProjectsPerProjectRoot.set(canonicalProjectRootPath, watchOptions || false);
            this.typeAcquisitionForInferredProjectsPerProjectRoot.set(canonicalProjectRootPath, typeAcquisition);
        }
        else {
            this.compilerOptionsForInferredProjects = compilerOptions;
            this.watchOptionsForInferredProjects = watchOptions;
            this.typeAcquisitionForInferredProjects = typeAcquisition;
        }

        for (const project of this.inferredProjects) {
            // Only update compiler options in the following cases:
            // - Inferred projects without a projectRootPath, if the new options do not apply to
            //   a workspace root
            // - Inferred projects with a projectRootPath, if the new options do not apply to a
            //   workspace root and there is no more specific set of options for that project's
            //   root path
            // - Inferred projects with a projectRootPath, if the new options apply to that
            //   project root path.
            if (
                canonicalProjectRootPath ?
                    project.projectRootPath === canonicalProjectRootPath :
                    !project.projectRootPath || !this.compilerOptionsForInferredProjectsPerProjectRoot.has(project.projectRootPath)
            ) {
                project.setCompilerOptions(compilerOptions);
                project.setTypeAcquisition(typeAcquisition);
                project.setWatchOptions(watchOptions?.watchOptions);
                project.setProjectErrors(watchOptions?.errors);
                project.compileOnSaveEnabled = compilerOptions.compileOnSave!;
                project.markAsDirty();
                this.delayUpdateProjectGraph(project);
            }
        }

        this.delayEnsureProjectForOpenFiles();
    }

    private createInferredProject(currentDirectory: string, isSingleInferredProject?: boolean, projectRootPath?: NormalizedPath): InferredProject {        
        const compilerOptions = projectRootPath && this.compilerOptionsForInferredProjectsPerProjectRoot.get(projectRootPath) || this.compilerOptionsForInferredProjects!; // TODO: GH#18217
        let watchOptionsAndErrors: WatchOptionsAndErrors | false | undefined;
        let typeAcquisition: TypeAcquisition | undefined;
        if (projectRootPath) {
            watchOptionsAndErrors = this.watchOptionsForInferredProjectsPerProjectRoot.get(projectRootPath);
            typeAcquisition = this.typeAcquisitionForInferredProjectsPerProjectRoot.get(projectRootPath);
        }
        if (watchOptionsAndErrors === undefined) {
            watchOptionsAndErrors = this.watchOptionsForInferredProjects;
        }
        if (typeAcquisition === undefined) {
            typeAcquisition = this.typeAcquisitionForInferredProjects;
        }
        watchOptionsAndErrors = watchOptionsAndErrors || undefined;
        const project = new InferredProject(this, this.documentRegistry, compilerOptions, watchOptionsAndErrors?.watchOptions, projectRootPath, currentDirectory, typeAcquisition);
        project.setProjectErrors(watchOptionsAndErrors?.errors);
        if (isSingleInferredProject) {
            this.inferredProjects.unshift(project);
        }
        else {
            this.inferredProjects.push(project);
        }
        return project;
    }
    
    private getOrCreateOpenScriptInfo(
        fileName: NormalizedPath,
        fileContent: string | undefined,
        scriptKind: ScriptKind | undefined,
        hasMixedContent: boolean | undefined,
        projectRootPath: NormalizedPath | undefined,
    ) {
        const info = this.getOrCreateScriptInfoWorker(
            fileName,
            projectRootPath ? this.getNormalizedAbsolutePath(projectRootPath) : this.currentDirectory,
            /*openedByClient*/ true,
            fileContent,
            scriptKind,
            !!hasMixedContent,
            /*hostToQueryFileExistsOn*/ undefined,
            /*deferredDeleteOk*/ true,
        )!;
        this.openFiles.set(info.path, projectRootPath);
        return info;
    }

    /** @internal */
    sendConfigFileDiagEvent(project: ConfiguredProject, triggerFile: NormalizedPath | undefined, force: boolean) {
        if (!this.eventHandler || this.suppressDiagnosticEvents) return false;
        const diagnostics = project.getLanguageService().getCompilerOptionsDiagnostics();
        diagnostics.push(...project.getAllProjectErrors());

        if (!force && diagnostics.length === (project.configDiagDiagnosticsReported ?? 0)) return false;
        project.configDiagDiagnosticsReported = diagnostics.length;
        this.eventHandler(
            {
                eventName: ConfigFileDiagEvent,
                data: { configFileName: project.getConfigFilePath(), diagnostics, triggerFile: triggerFile ?? project.getConfigFilePath() },
            } satisfies ConfigFileDiagEvent,
        );
        return true;
    }

    /** @internal */
    findConfiguredProjectByProjectName(configFileName: NormalizedPath, allowDeferredClosed?: boolean): ConfiguredProject | undefined {
        // make sure that casing of config file name is consistent
        const canonicalConfigFilePath = this.toCanonicalFileName(configFileName) as NormalizedPath;
        const result = this.getConfiguredProjectByCanonicalConfigFilePath(canonicalConfigFilePath);
        return allowDeferredClosed ? result : !result?.deferredClose ? result : undefined;
    }

    private getConfiguredProjectByCanonicalConfigFilePath(canonicalConfigFilePath: string): ConfiguredProject | undefined {
        return this.configuredProjects.get(canonicalConfigFilePath);
    }

    findProject(projectName: string): Project | undefined {
        if (projectName === undefined) {
            return undefined;
        }        
        // if (isInferredProjectName(projectName)) {
        //     return findProjectByName(projectName, this.inferredProjects);
        // }
        //return this.findExternalProjectByProjectName(projectName) || 
        return this.findConfiguredProjectByProjectName(toNormalizedPath(projectName));
    }

    /**
     * This gets the script info for the normalized path. If the path is not rooted disk path then the open script info with project root context is preferred
     */
    getScriptInfoForNormalizedPath(fileName: NormalizedPath) {
        return !isRootedDiskPath(fileName) && this.openFilesWithNonRootedDiskPath.get(this.toCanonicalFileName(fileName)) ||
            this.getScriptInfoForPath(normalizedPathToPath(fileName, this.currentDirectory, this.toCanonicalFileName));
    }

    private configFileExists(configFileName: NormalizedPath, canonicalConfigFilePath: NormalizedPath, info: OpenScriptInfoOrClosedOrConfigFileInfo) {
        const configFileExistenceInfo = this.configFileExistenceInfoCache.get(canonicalConfigFilePath);

        let openFilesImpactedByConfigFile: Set<Path> | undefined;
        if (this.openFiles.has(info.path) && !isAncestorConfigFileInfo(info)) {
            // By default the info would get impacted by presence of config file since its in the detection path
            // Only adding the info as a root to inferred project will need the existence to be watched by file watcher
            if (configFileExistenceInfo) (configFileExistenceInfo.openFilesImpactedByConfigFile ??= new Set()).add(info.path);
            else (openFilesImpactedByConfigFile = new Set()).add(info.path);
        }

        if (configFileExistenceInfo) return configFileExistenceInfo.exists;

        // Theoretically we should be adding watch for the directory here itself.
        // In practice there will be very few scenarios where the config file gets added
        // somewhere inside the another config file directory.
        // And technically we could handle that case in configFile's directory watcher in some cases
        // But given that its a rare scenario it seems like too much overhead. (we werent watching those directories earlier either)

        // So what we are now watching is: configFile if the configured project corresponding to it is open
        // Or the whole chain of config files for the roots of the inferred projects

        // Cache the host value of file exists and add the info to map of open files impacted by this config file
        const exists = this.host.fileExists(configFileName);
        this.configFileExistenceInfoCache.set(canonicalConfigFilePath, { exists, openFilesImpactedByConfigFile });
        return exists;
    }

    /**
     * This function tries to search for a tsconfig.json for the given file.
     * This is different from the method the compiler uses because
     * the compiler can assume it will always start searching in the
     * current directory (the directory in which tsc was invoked).
     * The server must start searching from the directory containing
     * the newly opened file.
     * If script info is passed in, it is asserted to be open script info
     * otherwise just file name
     * when findFromCacheOnly is true only looked up in cache instead of hitting disk to figure things out
     * @internal
     */
    getConfigFileNameForFile(info: OpenScriptInfoOrClosedOrConfigFileInfo, findFromCacheOnly: boolean) {
        // If we are using already cached values, look for values from pending update as well
        const fromCache = this.getConfigFileNameForFileFromCache(info, findFromCacheOnly);
        if (fromCache !== undefined) return fromCache || undefined;
        if (findFromCacheOnly) return undefined;
        const configFileName = this.forEachConfigFileLocation(info, (canonicalConfigFilePath, configFileName) => this.configFileExists(configFileName, canonicalConfigFilePath, info));
        this.logger.info(`getConfigFileNameForFile:: File: ${info.fileName} ProjectRootPath: ${this.openFiles.get(info.path)}:: Result: ${configFileName}`);
        this.setConfigFileNameForFileInCache(info, configFileName);
        return configFileName;
    }

    getScriptInfo(uncheckedFileName: string) {
        return this.getScriptInfoForNormalizedPath(toNormalizedPath(uncheckedFileName));
    }

    /**
     * If there is default project calculation pending for this file,
     * then it completes that calculation so that correct default project is used for the project
     */
    private tryGetDefaultProjectForEnsuringConfiguredProjectForFile(fileNameOrScriptInfo: NormalizedPath | ScriptInfo): Project | undefined {
        const scriptInfo = isString(fileNameOrScriptInfo) ? this.getScriptInfoForNormalizedPath(fileNameOrScriptInfo) : fileNameOrScriptInfo;
        if (!scriptInfo) return undefined;
        if (this.pendingOpenFileProjectUpdates?.delete(scriptInfo.path)) {
            this.tryFindDefaultConfiguredProjectAndLoadAncestorsForOpenScriptInfo(
                scriptInfo,
                ConfiguredProjectLoadKind.Create,
            );
            if (scriptInfo.isOrphan()) {
                this.assignOrphanScriptInfoToInferredProject(scriptInfo, this.openFiles.get(scriptInfo.path));
            }
        }

        return this.tryGetDefaultProjectForFile(scriptInfo);
    }

    /**
     * Ensures the project structures are upto date
     * This means,
     * - we go through all the projects and update them if they are dirty
     * - if updates reflect some change in structure or there was pending request to ensure projects for open files
     *   ensure that each open script info has project
     */
    private ensureProjectStructuresUptoDate() {
        let hasChanges = this.pendingEnsureProjectForOpenFiles;
        this.pendingProjectUpdates.clear();
        const updateGraph = (project: Project) => {
            hasChanges = updateProjectIfDirty(project) || hasChanges;
        };

        //this.externalProjects.forEach(updateGraph);
        this.configuredProjects.forEach(updateGraph);
        this.inferredProjects.forEach(updateGraph);
        if (hasChanges) {
            this.ensureProjectForOpenFiles();
        }
    }

    /**
     * This function is to update the project structure for every inferred project.
     * It is called on the premise that all the configured projects are
     * up to date.
     * This will go through open files and assign them to inferred project if open file is not part of any other project
     * After that all the inferred project graphs are updated
     */
    private ensureProjectForOpenFiles() {
        this.logger.info("Before ensureProjectForOpenFiles:");
        this.printProjects();

        // Ensure that default projects for pending openFile updates are created
        const pendingOpenFileProjectUpdates = this.pendingOpenFileProjectUpdates;
        this.pendingOpenFileProjectUpdates = undefined;
        pendingOpenFileProjectUpdates?.forEach((_config, path) =>
            this.tryFindDefaultConfiguredProjectAndLoadAncestorsForOpenScriptInfo(
                this.getScriptInfoForPath(path)!,
                ConfiguredProjectLoadKind.Create,
            )
        );

        // Assigned the orphan scriptInfos to inferred project
        // Remove the infos from inferred project that no longer need to be part of it
        this.openFiles.forEach((projectRootPath, path) => {
            const info = this.getScriptInfoForPath(path)!;
            // collect all orphaned script infos from open files
            if (info.isOrphan()) {
                this.assignOrphanScriptInfoToInferredProject(info, projectRootPath);
            }
            else {
                // Or remove the root of inferred project if is referenced in more than one projects
                this.removeRootOfInferredProjectIfNowPartOfOtherProject(info);
            }
        });
        this.pendingEnsureProjectForOpenFiles = false;
        this.inferredProjects.forEach(updateProjectIfDirty);

        this.logger.info("After ensureProjectForOpenFiles:");
        this.printProjects();
    }


    private doEnsureDefaultProjectForFile(fileNameOrScriptInfo: NormalizedPath | ScriptInfo): Project {
        this.ensureProjectStructuresUptoDate();
        const scriptInfo = isString(fileNameOrScriptInfo) ? this.getScriptInfoForNormalizedPath(fileNameOrScriptInfo) : fileNameOrScriptInfo;
        return scriptInfo ?
            scriptInfo.getDefaultProject() :
            (this.logErrorForScriptInfoNotFound(isString(fileNameOrScriptInfo) ? fileNameOrScriptInfo : fileNameOrScriptInfo.fileName), Errors.ThrowNoProject());
    }
    
    /** @internal */
    logErrorForScriptInfoNotFound(fileName: string): void {
        const names = arrayFrom(
            mapDefinedIterator(
                this.filenameToScriptInfo.entries(),
                entry => entry[1].deferredDelete ? undefined : entry,
            ),
            ([path, scriptInfo]) => ({ path, fileName: scriptInfo.fileName }),
        );
        this.logger.msg(`Could not find file ${JSON.stringify(fileName)}.\nAll files are: ${JSON.stringify(names)}`, Msg.Err);
    }
    
    /** @internal */
    ensureDefaultProjectForFile(fileNameOrScriptInfo: NormalizedPath | ScriptInfo): Project {
        return this.tryGetDefaultProjectForEnsuringConfiguredProjectForFile(fileNameOrScriptInfo) || this.doEnsureDefaultProjectForFile(fileNameOrScriptInfo);
    }

    
   
    
    /**
     * This function tries to search for a tsconfig.json for the given file.
     * This is different from the method the compiler uses because
     * the compiler can assume it will always start searching in the
     * current directory (the directory in which tsc was invoked).
     * The server must start searching from the directory containing
     * the newly opened file.
     */
    private forEachConfigFileLocation(info: OpenScriptInfoOrClosedOrConfigFileInfo, action: (canonicalConfigFilePath: NormalizedPath, configFileName: NormalizedPath) => boolean | void) {
        if (this.serverMode !== LanguageServiceMode.Semantic) {
            return undefined;
        }

        Debug.assert(!isOpenScriptInfo(info) || this.openFiles.has(info.path));
        const projectRootPath = this.openFiles.get(info.path);
        const scriptInfo = Debug.checkDefined(this.getScriptInfo(info.path));
        if (scriptInfo.isDynamic) return undefined;

        let searchPath = asNormalizedPath(getDirectoryPath(info.fileName));
        const isSearchPathInProjectRoot = () => containsPath(projectRootPath!, searchPath, this.currentDirectory, !this.host.useCaseSensitiveFileNames);

        // If projectRootPath doesn't contain info.path, then do normal search for config file
        const anySearchPathOk = !projectRootPath || !isSearchPathInProjectRoot();
        // For ancestor of config file always ignore its own directory since its going to result in itself
        let searchInDirectory = !isAncestorConfigFileInfo(info);
        do {
            if (searchInDirectory) {
                const canonicalSearchPath = normalizedPathToPath(searchPath, this.currentDirectory, this.toCanonicalFileName);
                const tsconfigFileName = asNormalizedPath(combinePaths(searchPath, "lpc-config.json"));
                let result = action(combinePaths(canonicalSearchPath, "lpc-config.json") as NormalizedPath, tsconfigFileName);
                if (result) return tsconfigFileName;

                // If we started within node_modules, don't look outside node_modules.
                // Otherwise, we might pick up a very large project and pull in the world,
                // causing an editor delay.
                if (isNodeModulesDirectory(canonicalSearchPath)) {
                    break;
                }
            }

            const parentPath = asNormalizedPath(getDirectoryPath(searchPath));
            if (parentPath === searchPath) break;
            searchPath = parentPath;
            searchInDirectory = true;
        }
        while (anySearchPathOk || isSearchPathInProjectRoot());

        return undefined;
    }

    /** Caches the configFilename for script info or ancestor of open script info */
    private setConfigFileNameForFileInCache(
        info: OpenScriptInfoOrClosedOrConfigFileInfo,
        configFileName: NormalizedPath | undefined,
    ) {
        if (!this.openFiles.has(info.path)) return; // Dont cache for closed script infos
        if (isAncestorConfigFileInfo(info)) return; // Dont cache for ancestors
        this.configFileForOpenFiles.set(info.path, configFileName || false);
    }

    /** Get cached configFileName for scriptInfo or ancestor of open script info */
    private getConfigFileNameForFileFromCache(
        info: OpenScriptInfoOrClosedOrConfigFileInfo,
        lookInPendingFilesForValue: boolean,
    ): ConfigFileName | undefined {
        if (lookInPendingFilesForValue) {
            const result = getConfigFileNameFromCache(info, this.pendingOpenFileProjectUpdates);
            if (result !== undefined) return result;
        }
        return getConfigFileNameFromCache(info, this.configFileForOpenFiles);
    }

    getFormatCodeOptions(file: NormalizedPath) {
        const info = this.getScriptInfoForNormalizedPath(file);
        return info && info.getFormatCodeSettings() || this.hostConfiguration.formatCodeOptions;
    }
    
    /** @internal */
    createConfiguredProject(configFileName: NormalizedPath, reason: string) {
        tracing?.instant(tracing.Phase.Session, "createConfiguredProject", { configFilePath: configFileName });
        this.logger.info(`Creating configuration project ${configFileName}`);
        const canonicalConfigFilePath = (this.toCanonicalFileName(configFileName)) as NormalizedPath;
        let configFileExistenceInfo = this.configFileExistenceInfoCache.get(canonicalConfigFilePath);
        // We could be in this scenario if project is the configured project tracked by external project
        // Since that route doesnt check if the config file is present or not
        if (!configFileExistenceInfo) {
            this.configFileExistenceInfoCache.set(canonicalConfigFilePath, configFileExistenceInfo = { exists: true });
        }
        else {
            configFileExistenceInfo.exists = true;
        }
        if (!configFileExistenceInfo.config) {
            configFileExistenceInfo.config = {
                cachedDirectoryStructureHost: createCachedDirectoryStructureHost(this.host, this.host.getCurrentDirectory(), this.host.useCaseSensitiveFileNames)!,
                projects: new Map(),
                updateLevel: ProgramUpdateLevel.Full,
            };
        }

        const project = new ConfiguredProject(
            configFileName,
            canonicalConfigFilePath,
            this,
            this.documentRegistry,
            configFileExistenceInfo.config.cachedDirectoryStructureHost,
            reason,
        );
        Debug.assert(!this.configuredProjects.has(canonicalConfigFilePath));
        this.configuredProjects.set(canonicalConfigFilePath, project);
        this.createConfigFileWatcherForParsedConfig(configFileName, canonicalConfigFilePath, project);
        return project;
    }

    private createConfigFileWatcherForParsedConfig(configFileName: NormalizedPath, canonicalConfigFilePath: NormalizedPath, forProject: ConfiguredProject) {        
        const configFileExistenceInfo = this.configFileExistenceInfoCache.get(canonicalConfigFilePath)!;
        // When watching config file for parsed config, remove the noopFileWatcher that can be created for open files impacted by config file and watch for real
        if (!configFileExistenceInfo.watcher || configFileExistenceInfo.watcher === noopConfigFileWatcher) {
            configFileExistenceInfo.watcher = this.watchFactory.watchFile(
                configFileName,
                (_fileName, eventKind) => this.onConfigFileChanged(configFileName, canonicalConfigFilePath, eventKind),
                PollingInterval.High,
                this.getWatchOptionsFromProjectWatchOptions(configFileExistenceInfo?.config?.parsedCommandLine?.watchOptions, getDirectoryPath(configFileName)),
                WatchType.ConfigFile,
                forProject,
            );
        }
        // Watching config file for project, update the map
        const projects = configFileExistenceInfo.config!.projects;
        projects.set(forProject.canonicalConfigFilePath, projects.get(forProject.canonicalConfigFilePath) || false);
    }

    /** @internal */
    private onConfigFileChanged(configFileName: NormalizedPath, canonicalConfigFilePath: NormalizedPath, eventKind: FileWatcherEventKind) {
        const configFileExistenceInfo = this.configFileExistenceInfoCache.get(canonicalConfigFilePath)!;
        const project = this.getConfiguredProjectByCanonicalConfigFilePath(canonicalConfigFilePath);
        const wasDefferedClose = project?.deferredClose;
        if (eventKind === FileWatcherEventKind.Deleted) {
            // Update the cached status
            // We arent updating or removing the cached config file presence info as that will be taken care of by
            // releaseParsedConfig when the project is closed or doesnt need this config any more (depending on tracking open files)
            configFileExistenceInfo.exists = false;

            // Deferred remove the configured project for this config file
            if (project) project.deferredClose = true;
        }
        else {
            // Update the cached status
            configFileExistenceInfo.exists = true;
            if (wasDefferedClose) {
                project.deferredClose = undefined;
                project.markAsDirty();
            }
        }

        // Update projects watching config
        this.delayUpdateProjectsFromParsedConfigOnConfigFileChange(
            canonicalConfigFilePath,
            "Change in config file detected",
        );

        const updatedProjects = new Set<ConfiguredProject>(project ? [project] : undefined);
        this.openFiles.forEach((_projectRootPath, path) => {
            const configFileForOpenFile = this.configFileForOpenFiles.get(path);

            // If this open script info does not depend on this config file, skip
            if (!configFileExistenceInfo.openFilesImpactedByConfigFile?.has(path)) return;
            // Invalidate default config file name for open file
            this.configFileForOpenFiles.delete(path);
            const info = this.getScriptInfoForPath(path)!;

            // Find new default config file name for this open file
            const newConfigFileNameForInfo = this.getConfigFileNameForFile(info, /*findFromCacheOnly*/ false);
            if (!newConfigFileNameForInfo) return;

            // Create new project for this open file with delay load
            const projectForInfo = this.findConfiguredProjectByProjectName(newConfigFileNameForInfo) ??
                this.createConfiguredProject(
                    newConfigFileNameForInfo,
                    `Change in config file ${configFileName} detected, ${fileOpenReason(info)}`,
                );

            // Cache the existing config file info for this open file if not already done so
            if (!this.pendingOpenFileProjectUpdates?.has(path)) {
                (this.pendingOpenFileProjectUpdates ??= new Map()).set(path, configFileForOpenFile);
            }

            // If this was not already updated, and its new project, schedule for update
            // Existing projects dont need to update if they were not using the changed config in any way
            if (tryAddToSet(updatedProjects, projectForInfo) && projectForInfo.isInitialLoadPending()) {
                this.delayUpdateProjectGraph(projectForInfo);
            }
        });

        // Ensure that all the open files have project
        this.delayEnsureProjectForOpenFiles();
    }

    /** @internal */
    private delayUpdateProjectsFromParsedConfigOnConfigFileChange(canonicalConfigFilePath: NormalizedPath, loadReason: string) {
        const configFileExistenceInfo = this.configFileExistenceInfoCache.get(canonicalConfigFilePath);
        if (!configFileExistenceInfo?.config) return false;
        let scheduledAnyProjectUpdate = false;
        // Update projects watching cached config
        configFileExistenceInfo.config.updateLevel = ProgramUpdateLevel.Full;

        configFileExistenceInfo.config.projects.forEach((_watchWildcardDirectories, projectCanonicalPath) => {
            const project = this.getConfiguredProjectByCanonicalConfigFilePath(projectCanonicalPath);
            if (!project) return;

            scheduledAnyProjectUpdate = true;
            if (projectCanonicalPath === canonicalConfigFilePath) {
                // Skip refresh if project is not yet loaded
                if (project.isInitialLoadPending()) return;
                project.pendingUpdateLevel = ProgramUpdateLevel.Full;
                project.pendingUpdateReason = loadReason;
                this.delayUpdateProjectGraph(project);
                project.markAutoImportProviderAsDirty();
            }
            else {
                // Change in referenced project config file
                const path = this.toPath(canonicalConfigFilePath);
                project.resolutionCache.removeResolutionsFromProjectReferenceRedirects(path);
                this.delayUpdateProjectGraph(project);
                if (
                    this.getHostPreferences().includeCompletionsForModuleExports &&
                    find(project.getCurrentProgram()?.getResolvedProjectReferences(), ref => ref?.sourceFile.path === path)
                ) {
                    project.markAutoImportProviderAsDirty();
                }
            }
        });
        return scheduledAnyProjectUpdate;
    }

    getHostPreferences(): UserPreferences {
        return this.hostConfiguration.preferences;
    }

    /**
     * Close file whose contents is managed by the client
     * @param filename is absolute pathname
     */
    closeClientFile(uncheckedFileName: string): void;
    /** @internal */
    closeClientFile(uncheckedFileName: string, skipAssignOrphanScriptInfosToInferredProject: true): boolean;
    closeClientFile(uncheckedFileName: string, skipAssignOrphanScriptInfosToInferredProject?: true) {
        const info = this.getScriptInfoForNormalizedPath(toNormalizedPath(uncheckedFileName));
        const result = info ? this.closeOpenFile(info, skipAssignOrphanScriptInfosToInferredProject) : false;
        if (!skipAssignOrphanScriptInfosToInferredProject) {
            this.printProjects();
        }
        return result;
    }
    
    /**
     * This is called on file close or when its removed from inferred project as root,
     * so that we handle the watches and inferred project root data
     * @internal
     */
    stopWatchingConfigFilesForScriptInfo(info: ScriptInfo) {
        if (this.serverMode !== LanguageServiceMode.Semantic) return;
        const isRootOfInferredProject = this.rootOfInferredProjects.delete(info);
        const isOpen = info.isScriptOpen();
        // Nothing to stop watching if this is open script info and not root of inferred project
        if (isOpen && !isRootOfInferredProject) return;
        this.forEachConfigFileLocation(info, canonicalConfigFilePath => {
            const configFileExistenceInfo = this.configFileExistenceInfoCache.get(canonicalConfigFilePath);
            if (!configFileExistenceInfo) return;

            if (isOpen) {
                // If this file doesnt get impacted by this config file, skip
                if (!configFileExistenceInfo?.openFilesImpactedByConfigFile?.has(info.path)) return;
            }
            else {
                // Delete the info from map, since this file is no more open
                if (!configFileExistenceInfo.openFilesImpactedByConfigFile?.delete(info.path)) return;
            }

            // If the script info was not root of inferred project,
            // there wont be config file watch open because of this script info
            if (isRootOfInferredProject) {
                // But if it is a root, it could be the last script info that is root of inferred project
                // and hence we would need to close the config file watcher
                configFileExistenceInfo.inferredProjectRoots!--;

                // Close the config file watcher if there are no more open files that are root of inferred project
                // or if there are no projects that need to watch this config file existence info
                if (
                    configFileExistenceInfo.watcher &&
                    !configFileExistenceInfo.config &&
                    !configFileExistenceInfo.inferredProjectRoots
                ) {
                    configFileExistenceInfo.watcher.close();
                    configFileExistenceInfo.watcher = undefined;
                }
            }

            // If there are no open files that are impacted by configFileExistenceInfo after closing this script info
            // and there is are no projects that need the config file existence or parsed config,
            // remove the cached existence info
            if (
                !configFileExistenceInfo.openFilesImpactedByConfigFile?.size &&
                !configFileExistenceInfo.config
            ) {
                Debug.assert(!configFileExistenceInfo.watcher);
                this.configFileExistenceInfoCache.delete(canonicalConfigFilePath);
            }
        });
    }

    /**
     * This is called by inferred project whenever script info is added as a root
     *
     * @internal
     */
    startWatchingConfigFilesForInferredProjectRoot(info: ScriptInfo) {
        if (this.serverMode !== LanguageServiceMode.Semantic) return;
        Debug.assert(info.isScriptOpen());
        // Set this file as the root of inferred project
        this.rootOfInferredProjects.add(info);
        this.forEachConfigFileLocation(info, (canonicalConfigFilePath, configFileName) => {
            let configFileExistenceInfo = this.configFileExistenceInfoCache.get(canonicalConfigFilePath);
            if (!configFileExistenceInfo) {
                // Create the cache
                configFileExistenceInfo = { exists: this.host.fileExists(configFileName), inferredProjectRoots: 1 };
                this.configFileExistenceInfoCache.set(canonicalConfigFilePath, configFileExistenceInfo);
            }
            else {
                configFileExistenceInfo.inferredProjectRoots = (configFileExistenceInfo.inferredProjectRoots ?? 0) + 1;
            }

            // It might not have been marked as impacting by presence of this script info if
            // this is in ancestor folder of config that was not looked up yet
            (configFileExistenceInfo.openFilesImpactedByConfigFile ??= new Set()).add(info.path);

            // If there is no configured project for this config file, add the file watcher
            configFileExistenceInfo.watcher ||= canWatchDirectoryOrFile(getPathComponents(getDirectoryPath(canonicalConfigFilePath) as Path)) ?
                this.watchFactory.watchFile(
                    configFileName,
                    (_filename, eventKind) => this.onConfigFileChanged(configFileName, canonicalConfigFilePath, eventKind),
                    PollingInterval.High,
                    this.hostConfiguration.watchOptions,
                    WatchType.ConfigFileForInferredRoot,
                ) :
                noopConfigFileWatcher;
        });
    }
    
    /**
     * Remove this file from the set of open, non-configured files.
     * @param info The file that has been closed or newly configured
     */
    private closeOpenFile(info: ScriptInfo, skipAssignOrphanScriptInfosToInferredProject?: true) {
        // Closing file should trigger re-reading the file content from disk. This is
        // because the user may chose to discard the buffer content before saving
        // to the disk, and the server's version of the file can be out of sync.
        const fileExists = info.isDynamic ? false : this.host.fileExists(info.fileName);
        info.close(fileExists);
        this.stopWatchingConfigFilesForScriptInfo(info);

        const canonicalFileName = this.toCanonicalFileName(info.fileName);
        if (this.openFilesWithNonRootedDiskPath.get(canonicalFileName) === info) {
            this.openFilesWithNonRootedDiskPath.delete(canonicalFileName);
        }

        // collect all projects that should be removed
        let ensureProjectsForOpenFiles = false;
        for (const p of info.containingProjects) {
            if (isConfiguredProject(p)) {
                if (info.hasMixedContent) {
                    info.registerFileUpdate();
                }
                // Do not remove the project so that we can reuse this project
                // if it would need to be re-created with next file open

                // If project had open file affecting
                // Reload the root Files from config if its not already scheduled
                const updateLevel = p.openFileWatchTriggered.get(info.path);
                if (updateLevel !== undefined) {
                    p.openFileWatchTriggered.delete(info.path);
                    if (p.pendingUpdateLevel < updateLevel) {
                        p.pendingUpdateLevel = updateLevel;
                        p.markFileAsDirty(info.path);
                    }
                }
            }
            else if (isInferredProject(p) && p.isRoot(info)) {
                // If this was the last open root file of inferred project
                if (p.isProjectWithSingleRoot()) {
                    ensureProjectsForOpenFiles = true;
                }

                p.removeFile(info, fileExists, /*detachFromProject*/ true);
                // Do not remove the project even if this was last root of the inferred project
                // so that we can reuse this project, if it would need to be re-created with next file open
            }

            if (!p.languageServiceEnabled) {
                // if project language service is disabled then we create a program only for open files.
                // this means that project should be marked as dirty to force rebuilding of the program
                // on the next request
                p.markAsDirty();
            }
        }

        this.openFiles.delete(info.path);
        this.configFileForOpenFiles.delete(info.path);
        this.pendingOpenFileProjectUpdates?.delete(info.path);
        Debug.assert(!this.rootOfInferredProjects.has(info));

        if (!skipAssignOrphanScriptInfosToInferredProject && ensureProjectsForOpenFiles) {
            this.assignOrphanScriptInfosToInferredProject();
        }

        // Cleanup script infos that arent part of any project (eg. those could be closed script infos not referenced by any project)
        // is postponed to next file open so that if file from same project is opened,
        // we wont end up creating same script infos

        // If the current info is being just closed - add the watcher file to track changes
        // But if file was deleted, handle that part
        if (fileExists) {
            this.watchClosedScriptInfo(info);
        }
        else {
            this.handleDeletedFile(info, /*deferredDelete*/ false);
        }
        return ensureProjectsForOpenFiles;
    }

    /** @internal */
    applyChangesInOpenFiles(openFiles: Iterable<OpenFileArguments> | undefined, changedFiles?: Iterable<ChangeFileArguments>, closedFiles?: string[]): void {
        let openScriptInfos: ScriptInfo[] | undefined;
        let assignOrphanScriptInfosToInferredProject = false;
        if (openFiles) {
            for (const file of openFiles) {
                // Create script infos so we have the new content for all the open files before we do any updates to projects
                const info = this.getOrCreateOpenScriptInfo(
                    toNormalizedPath(file.fileName),
                    file.content,
                    ScriptKind.LPC,
                    file.hasMixedContent,
                    file.projectRootPath ? toNormalizedPath(file.projectRootPath) : undefined,
                );
                (openScriptInfos || (openScriptInfos = [])).push(info);
            }
        }

        if (changedFiles) {
            for (const file of changedFiles) {
                const scriptInfo = this.getScriptInfo(file.fileName)!;
                Debug.assert(!!scriptInfo);
                // Make edits to script infos and marks containing project as dirty                
                this.applyChangesToFile(scriptInfo, file.changes);
            }
        }

        if (closedFiles) {
            for (const file of closedFiles) {
                // Close files, but dont assign projects to orphan open script infos, that part comes later
                // Debug.fail("implement me");
                assignOrphanScriptInfosToInferredProject = this.closeClientFile(file, /*skipAssignOrphanScriptInfosToInferredProject*/ true) || assignOrphanScriptInfosToInferredProject;
            }
        }

        // All the script infos now exist, so ok to go update projects for open files
        let retainProjects: Set<ConfiguredProject> | undefined;
        openScriptInfos?.forEach(info => this.assignProjectToOpenedScriptInfo(info).retainProjects?.forEach(p => (retainProjects ??= new Set()).add(p)));

        // While closing files there could be open files that needed assigning new inferred projects, do it now
        if (assignOrphanScriptInfosToInferredProject) {
            this.assignOrphanScriptInfosToInferredProject();
        }

        if (openScriptInfos) {
            // Cleanup projects
            this.cleanupProjectsAndScriptInfos(
                retainProjects,
                new Set(openScriptInfos.map(info => info.path)),
                /*externalProjectsRetainingConfiguredProjects*/ undefined,
            );
            // Telemetry
            // openScriptInfos.forEach(info => this.telemetryOnOpenFile(info));
            this.printProjects();
        }
        else if (length(closedFiles)) {
            this.printProjects();
        }
    }

    /** @internal */
    applyChangesToFile(scriptInfo: ScriptInfo, changes: Iterable<TextChange>) {        
        for (const change of changes) {            
            scriptInfo.editContent(change.span.start, change.span.start + change.span.length, change.newText);
        }
    }

    private assignOrphanScriptInfosToInferredProject() {
        // collect orphaned files and assign them to inferred project just like we treat open of a file
        this.openFiles.forEach((projectRootPath, path) => {
            const info = this.getScriptInfoForPath(path)!;
            // collect all orphaned script infos from open files
            if (info.isOrphan()) {
                console.debug("todo - implement me - assignOrphanScriptInfosToInferredProject");
                // this.assignOrphanScriptInfoToInferredProject(info, projectRootPath);
            }
        });
    }

     /** @internal */
     delayUpdateProjectGraphAndEnsureProjectStructureForOpenFiles(project: Project) {
        this.delayUpdateProjectGraph(project);
        this.delayEnsureProjectForOpenFiles();
    }   
}


export type ProjectServiceEventHandler = (event: ProjectServiceEvent) => void;

export interface LargeFileReferencedEvent {
    eventName: typeof LargeFileReferencedEvent;
    data: { file: string; fileSize: number; maxFileSize: number; };
}

export type ProjectServiceEvent =
    | LargeFileReferencedEvent
    | ProjectsUpdatedInBackgroundEvent
    // | ProjectLoadingStartEvent
    // | ProjectLoadingFinishEvent
    | ConfigFileDiagEvent
    | ProjectLanguageServiceStateEvent
    // | ProjectInfoTelemetryEvent
    // | OpenFileInfoTelemetryEvent
    | CreateFileWatcherEvent
    | CreateDirectoryWatcherEvent
    | CloseFileWatcherEvent;
    ;


export interface ProjectServiceOptions {
    host: ServerHost;
    logger: Logger;
    cancellationToken: HostCancellationToken;
    useSingleInferredProject: boolean;
    useInferredProjectPerProjectRoot: boolean;    
    eventHandler?: ProjectServiceEventHandler;
    canUseWatchEvents?: boolean;
    suppressDiagnosticEvents?: boolean;
    throttleWaitMilliseconds?: number;
    globalPlugins?: readonly string[];
    pluginProbeLocations?: readonly string[];
    allowLocalPluginLoads?: boolean;
    typesMapLocation?: string;
    serverMode?: LanguageServiceMode;
    session: Session<unknown> | undefined;
    projectRootFolder?: string;    
    /** @internal */ incrementalVerifier?: (service: ProjectService) => void;    
    jsDocParsingMode?: JSDocParsingMode;
}

/**
 * returns true if project updated with new program
 * @internal
 */
export function updateProjectIfDirty(project: Project) {
    project.invalidateResolutionsOfFailedLookupLocations();
    return project.dirty && !project.updateGraph();
}

export interface OpenConfiguredProjectResult {
    configFileName?: NormalizedPath;
    configFileErrors?: readonly Diagnostic[];
}

interface AssignProjectResult extends OpenConfiguredProjectResult {
    retainProjects: Set<ConfiguredProject> | undefined;
}


/** @internal */
export enum ConfiguredProjectLoadKind {
    Find,
    Create,
    Reload,
}

/** @internal */
export interface DefaultConfiguredProjectResult {
    defaultProject: ConfiguredProject | undefined;
    sentConfigDiag: Set<ConfiguredProject>;
    seenProjects: Set<ConfiguredProject>;
}


/** @internal */
export interface ConfigFileExistenceInfo {
    /**
     * Cached value of existence of config file
     * It is true if there is configured project open for this file.
     * It can be either true or false if this is the config file that is being watched by inferred project
     *   to decide when to update the structure so that it knows about updating the project for its files
     *   (config file may include the inferred project files after the change and hence may be wont need to be in inferred project)
     */
    exists: boolean;
    /**
     * Tracks how many open files are impacted by this config file that are root of inferred project
     */
    inferredProjectRoots?: number;
    /**
     * openFilesImpactedByConfigFiles is a map of open files that would be impacted by this config file
     *   because these are the paths being looked up for their default configured project location
     */
    openFilesImpactedByConfigFile?: Set<Path>;
    /**
     * The file watcher watching the config file because there is open script info that is root of
     * inferred project and will be impacted by change in the status of the config file
     * or
     * Configured project for this config file is open
     * or
     * Configured project references this config file
     */
    watcher?: FileWatcher;
    /**
     * Cached parsed command line and other related information like watched directories etc
     */
    config?: any;
}

function findProjectByName<T extends Project>(projectName: string, projects: T[]): T | undefined {
    for (const proj of projects) {
        if (proj.getProjectName() === projectName) {
            return proj;
        }
    }
}

export interface OpenFileArguments {
    fileName: string;
    content?: string;
    scriptKind?: ScriptKind;
    hasMixedContent?: boolean;
    projectRootPath?: string;
}

/** @internal */
export interface ChangeFileArguments {
    fileName: string;
    changes: Iterable<TextChange>;
}


/** @internal */
export interface OriginalFileInfo {
    fileName: NormalizedPath;
    path: Path;
}
/** @internal */
export interface AncestorConfigFileInfo {
    /** config file name */
    fileName: NormalizedPath;
    /** path of open file so we can look at correct root */
    path: Path;
    configFileInfo: true;
}
/** @internal */
export type OpenScriptInfoOrClosedFileInfo = ScriptInfo | OriginalFileInfo;
/** @internal */
export type OpenScriptInfoOrClosedOrConfigFileInfo = OpenScriptInfoOrClosedFileInfo | AncestorConfigFileInfo;

/**
 * string if file name,
 * false if no config file name
 * @internal
 */
export type ConfigFileName = NormalizedPath | false;

function isAncestorConfigFileInfo(infoOrFileNameOrConfig: OpenScriptInfoOrClosedOrConfigFileInfo): infoOrFileNameOrConfig is AncestorConfigFileInfo {
    return !!(infoOrFileNameOrConfig as AncestorConfigFileInfo).configFileInfo;
}

/** Gets cached value of config file name based on open script info or ancestor script info */
function getConfigFileNameFromCache(info: OpenScriptInfoOrClosedOrConfigFileInfo, cache: Map<Path, ConfigFileName> | undefined): ConfigFileName | undefined {
    if (!cache || isAncestorConfigFileInfo(info)) return undefined;
    return cache.get(info.path);
}

function isOpenScriptInfo(infoOrFileNameOrConfig: OpenScriptInfoOrClosedOrConfigFileInfo): infoOrFileNameOrConfig is ScriptInfo {
    return !!(infoOrFileNameOrConfig as ScriptInfo).containingProjects;
}

export interface ConfigFileDiagEvent {
    eventName: typeof ConfigFileDiagEvent;
    data: { triggerFile: string; configFileName: string; diagnostics: readonly Diagnostic[]; };
}

function fileOpenReason(info: ScriptInfo) {
    return `Creating possible configured project for ${info.fileName} to open`;
}

function printProjectWithoutFileNames(project: Project) {
    project.print(/*writeProjectFileNames*/ false, /*writeFileExplaination*/ false, /*writeFileVersionAndText*/ false);
}

/** @internal */
export interface FindCreateOrLoadConfiguredProjectResult {
    project: ConfiguredProject;
    sentConfigFileDiag: boolean;
}


/** Updates the program for triggerFile and returns true if sent configFileDiagEvent */
function updateWithTriggerFile(project: ConfiguredProject, triggerFile: NormalizedPath, isReload: boolean): boolean {
    if (!isReload) {
        project.invalidateResolutionsOfFailedLookupLocations();
        if (!project.dirty) return false;
    }
    project.triggerFileForConfigFileDiag = triggerFile;
    const updateLevel = project.pendingUpdateLevel;
    project.updateGraph();
    // On full update the event is sent by recursive updateWithTrigger through reloadConfiguredProject
    if (!project.triggerFileForConfigFileDiag && !isReload) return updateLevel === ProgramUpdateLevel.Full;
    const sent = project.projectService.sendConfigFileDiagEvent(project, triggerFile, isReload);
    project.triggerFileForConfigFileDiag = undefined;
    return sent;
}


/** Updates with triggerFile if persent otherwise updateProjectIfDirty, returns true if sent configFileDiagEvent */
function updateConfiguredProject(project: ConfiguredProject, triggerFile: NormalizedPath | undefined) {
    if (triggerFile) {
        if (updateWithTriggerFile(project, triggerFile, /*isReload*/ false)) return true;
    }
    else {
        updateProjectIfDirty(project);
    }
    return false;
}

function reloadReason(reason: string) {
    return `User requested reload projects: ${reason}`;
}

/** @internal */
export interface ParsedConfig {
    cachedDirectoryStructureHost: CachedDirectoryStructureHost;
    /**
     * The map contains
     *   - true if project is watching config file as well as wild cards
     *   - false if just config file is watched
     */
    projects: Map<NormalizedPath, boolean>;
    parsedCommandLine?: ParsedCommandLine;
    watchedDirectories?: Map<string, WildcardDirectoryWatcher>;
    /**
     * true if watchedDirectories need to be updated as per parsedCommandLine's updated watched directories
     */
    watchedDirectoriesStale?: boolean;
    updateLevel?: ProgramUpdateLevel.RootNamesAndUpdate | ProgramUpdateLevel.Full;
}

interface FilePropertyReader<T> {
    getFileName(f: T): string;
    getScriptKind(f: T, extraFileExtensions?: FileExtensionInfo[]): ScriptKind;
    hasMixedContent(f: T, extraFileExtensions: FileExtensionInfo[] | undefined): boolean;
}


const fileNamePropertyReader: FilePropertyReader<string> = {
    getFileName: x => x,
    getScriptKind: (fileName, extraFileExtensions) => {
        let result: ScriptKind | undefined;
        if (extraFileExtensions) {
            const fileExtension = getAnyExtensionFromPath(fileName);
            if (fileExtension) {
                some(extraFileExtensions, info => {
                    if (info.extension === fileExtension) {
                        result = info.scriptKind;
                        return true;
                    }
                    return false;
                });
            }
        }
        return result!; // TODO: GH#18217
    },
    hasMixedContent: (fileName, extraFileExtensions) => some(extraFileExtensions, ext => ext.isMixedContent && fileExtensionIs(fileName, ext.extension)),
};

/** @internal */
export type PerformanceEventHandler = (event: PerformanceEvent) => void;

export interface ProjectLanguageServiceStateEvent {
    eventName: typeof ProjectLanguageServiceStateEvent;
    data: { project: Project; languageServiceEnabled: boolean; };
}

/** @internal */
export interface PackageJsonWatcher extends FileWatcher {
    projects: Set<Project | WildcardWatcher>;
}

/** @internal */
export interface WildcardWatcher extends FileWatcher {
    packageJsonWatches: Set<PackageJsonWatcher> | undefined;
}

interface HostWatcherMap<T> {
    idToCallbacks: Map<number, Set<T>>;
    pathToId: Map<Path, number>;
}

function getHostWatcherMap<T>(): HostWatcherMap<T> {
    return { idToCallbacks: new Map(), pathToId: new Map() };
}

function createWatchFactoryHostUsingWatchEvents(service: ProjectService, canUseWatchEvents: boolean | undefined): WatchFactoryHost | undefined {
    if (!canUseWatchEvents || !service.eventHandler || !service.session) return undefined;
    const watchedFiles = getHostWatcherMap<FileWatcherCallback>();
    const watchedDirectories = getHostWatcherMap<DirectoryWatcherCallback>();
    const watchedDirectoriesRecursive = getHostWatcherMap<DirectoryWatcherCallback>();
    let ids = 1;
    
    console.debug("todo - tie watch chnage to service events");
    // service.session.addProtocolHandler(protocol.CommandTypes.WatchChange, req => {
    //     onWatchChange((req as protocol.WatchChangeRequest).arguments);
    //     return { responseRequired: false };
    // });
    return {
        watchFile,
        watchDirectory,
        getCurrentDirectory: () => service.host.getCurrentDirectory(),
        useCaseSensitiveFileNames: service.host.useCaseSensitiveFileNames,
    };
    function watchFile(path: string, callback: FileWatcherCallback): FileWatcher {
        return getOrCreateFileWatcher(
            watchedFiles,
            path,
            callback,
            id => ({ eventName: CreateFileWatcherEvent, data: { id, path } }),
        );
    }
    function watchDirectory(path: string, callback: DirectoryWatcherCallback, recursive?: boolean): FileWatcher {
        return getOrCreateFileWatcher(
            recursive ? watchedDirectoriesRecursive : watchedDirectories,
            path,
            callback,
            id => ({
                eventName: CreateDirectoryWatcherEvent,
                data: {
                    id,
                    path,
                    recursive: !!recursive,
                    // Special case node_modules as we watch it for changes to closed script infos as well
                    ignoreUpdate: !path.endsWith("/node_modules") ? true : undefined,
                },
            }),
        );
    }
    function getOrCreateFileWatcher<T>(
        { pathToId, idToCallbacks }: HostWatcherMap<T>,
        path: string,
        callback: T,
        event: (id: number) => CreateFileWatcherEvent | CreateDirectoryWatcherEvent,
    ) {
        const key = service.toPath(path);
        let id = pathToId.get(key);
        if (!id) pathToId.set(key, id = ids++);
        let callbacks = idToCallbacks.get(id);
        if (!callbacks) {
            idToCallbacks.set(id, callbacks = new Set());
            // Add watcher
            service.eventHandler!(event(id));
        }
        callbacks.add(callback);
        return {
            close() {
                const callbacks = idToCallbacks.get(id);
                if (!callbacks?.delete(callback)) return;
                if (callbacks.size) return;
                idToCallbacks.delete(id);
                pathToId.delete(key);
                service.eventHandler!({ eventName: CloseFileWatcherEvent, data: { id } });
            },
        };
    }
    function onWatchChange(args: protocol.WatchChangeRequestArgs | readonly protocol.WatchChangeRequestArgs[]) {
        if (isArray(args)) args.forEach(onWatchChangeRequestArgs);
        else onWatchChangeRequestArgs(args);
    }

    function onWatchChangeRequestArgs({ id, created, deleted, updated }: protocol.WatchChangeRequestArgs) {
        onWatchEventType(id, created, FileWatcherEventKind.Created);
        onWatchEventType(id, deleted, FileWatcherEventKind.Deleted);
        onWatchEventType(id, updated, FileWatcherEventKind.Changed);
    }

    function onWatchEventType(id: number, paths: readonly string[] | undefined, eventKind: FileWatcherEventKind) {
        if (!paths?.length) return;
        forEachCallback(watchedFiles, id, paths, (callback, eventPath) => callback(eventPath, eventKind));
        forEachCallback(watchedDirectories, id, paths, (callback, eventPath) => callback(eventPath));
        forEachCallback(watchedDirectoriesRecursive, id, paths, (callback, eventPath) => callback(eventPath));
    }

    function forEachCallback<T>(
        hostWatcherMap: HostWatcherMap<T>,
        id: number,
        eventPaths: readonly string[],
        cb: (callback: T, eventPath: string) => void,
    ) {
        hostWatcherMap.idToCallbacks.get(id)?.forEach(callback => {
            eventPaths.forEach(eventPath => cb(callback, normalizeSlashes(eventPath)));
        });
    }
}

export interface CreateFileWatcherEvent {
    readonly eventName: protocol.CreateFileWatcherEventName;
    readonly data: protocol.CreateFileWatcherEventBody;
}

export interface CreateDirectoryWatcherEvent {
    readonly eventName: protocol.CreateDirectoryWatcherEventName;
    readonly data: protocol.CreateDirectoryWatcherEventBody;
}

export interface CloseFileWatcherEvent {
    readonly eventName: protocol.CloseFileWatcherEventName;
    readonly data: protocol.CloseFileWatcherEventBody;
}

function getDetailWatchInfo(watchType: WatchType, project: Project | NormalizedPath | undefined) {
    return `${isString(project) ? `Config: ${project} ` : project ? `Project: ${project.getProjectName()} ` : ""}WatchType: ${watchType}`;
}

function forEachPotentialProjectReference<T>(
    project: ConfiguredProject,
    cb: (potentialProjectReference: NormalizedPath) => T | undefined,
): T | undefined {
    return project.potentialProjectReferences &&
        forEachKey(project.potentialProjectReferences, cb);
}

/**
 * Goes through project's resolved project references and finds, creates or reloads project per kind
 * If project for this resolved reference exists its used immediately otherwise,
 * follows all references in order, deciding if references of the visited project can be loaded or not
 * @internal
 */
export function forEachResolvedProjectReferenceProject<T>(
    project: ConfiguredProject,
    fileName: string | undefined,
    cb: (child: ConfiguredProject, sentConfigFileDiag: boolean) => T | undefined,
    kind: ConfiguredProjectLoadKind,
    reason: string,
    /** Used with ConfiguredProjectLoadKind.Find to get deferredClosed projects as well */
    allowDeferredClosed?: boolean,
    /** Used with ConfiguredProjectLoadKind.Create to send configFileDiag */
    triggerFile?: NormalizedPath,
    /** Used with ConfiguredProjectLoadKind.Reload to check if this project was already reloaded */
    reloadedProjects?: Set<ConfiguredProject>,
): T | undefined {
    const resolvedRefs = project.getCurrentProgram()?.getResolvedProjectReferences();
    if (!resolvedRefs) return undefined;
    const possibleDefaultRef = fileName ? project.getResolvedProjectReferenceToRedirect(fileName) : undefined;
    if (possibleDefaultRef) {
        // Try to find the name of the file directly through resolved project references
        const configFileName = toNormalizedPath(possibleDefaultRef.sourceFile.fileName);
        // We are not using findCreateOrLoadConfiguredProject with kind thats passed in since
        // we want to determine if we can really create a new project if it doesnt exist
        // based on following references and determining based on disableReferencedProjectLoad
        const child = project.projectService.findConfiguredProjectByProjectName(
            configFileName,
            allowDeferredClosed,
        );
        if (child) {
            const result = callbackWithProjectFoundUsingFind(child);
            if (result) return result;
        }
        else if (kind !== ConfiguredProjectLoadKind.Find) {
            // Try to see if this project can be loaded and load only that one instead of loading all the projects
            const result = forEachResolvedProjectReferenceProjectWorker(
                resolvedRefs,
                project.getCompilerOptions(),
                (ref, loadKind) => possibleDefaultRef === ref ? callback(ref, loadKind) : undefined,
                kind,
                project.projectService,
            );
            if (result) return result;
        }
    }

    return forEachResolvedProjectReferenceProjectWorker(
        resolvedRefs,
        project.getCompilerOptions(),
        (ref, loadKind) => possibleDefaultRef !== ref ? callback(ref, loadKind) : undefined,
        kind,
        project.projectService,
    );

    function callback(ref: ResolvedProjectReference, loadKind: ConfiguredProjectLoadKind) {
        const result = project.projectService.findCreateOrReloadConfiguredProject(
            toNormalizedPath(ref.sourceFile.fileName),
            loadKind,
            reason,
            allowDeferredClosed,
            triggerFile,
            reloadedProjects,
        );
        return result && (
            loadKind === kind ?
                cb(result.project, result.sentConfigFileDiag) :
                callbackWithProjectFoundUsingFind(result.project)
        );
    }

    function callbackWithProjectFoundUsingFind(child: ConfiguredProject) {
        let sentConfigFileDiag = false;
        // This project was found using "Find" instead of the actually specified kind of "Create" or "Reload",
        // We need to update or reload this existing project before calling callback
        switch (kind) {
            case ConfiguredProjectLoadKind.Create:
                sentConfigFileDiag = updateConfiguredProject(child, triggerFile);
                break;
            case ConfiguredProjectLoadKind.Reload:
                sentConfigFileDiag = child.projectService.reloadConfiguredProjectClearingSemanticCache(child, reason, reloadedProjects!);
                break;
            case ConfiguredProjectLoadKind.Find:
                break;
            default:
                Debug.assertNever(kind);
        }
        const result = cb(child, sentConfigFileDiag);
        if (result) return result;
    }
}

function forEachResolvedProjectReferenceProjectWorker<T>(
    resolvedProjectReferences: readonly (ResolvedProjectReference | undefined)[],
    parentOptions: CompilerOptions,
    cb: (resolvedRef: ResolvedProjectReference, loadKind: ConfiguredProjectLoadKind) => T | undefined,
    kind: ConfiguredProjectLoadKind,
    projectService: ProjectService,
    seenResolvedRefs?: Map<string, ConfiguredProjectLoadKind>,
): T | undefined {
    const loadKind = parentOptions.disableReferencedProjectLoad ? ConfiguredProjectLoadKind.Find : kind;
    return forEach(resolvedProjectReferences, ref => {
        if (!ref) return undefined;

        const configFileName = toNormalizedPath(ref.sourceFile.fileName);
        const canonicalPath = projectService.toCanonicalFileName(configFileName);
        const seenValue = seenResolvedRefs?.get(canonicalPath);
        if (seenValue !== undefined && seenValue >= loadKind) {
            return undefined;
        }
        const result = cb(ref, loadKind);
        if (result) {
            return result;
        }

        (seenResolvedRefs || (seenResolvedRefs = new Map())).set(canonicalPath, loadKind);
        return ref.references && forEachResolvedProjectReferenceProjectWorker(ref.references, ref.commandLine.options, cb, loadKind, projectService, seenResolvedRefs);
    });
}

/** @internal */
export function convertUserPreferences(preferences: UserPreferences): UserPreferences {
    const { lazyConfiguredProjectsFromExternalProject: _, ...userPreferences } = preferences;
    return userPreferences;
}

function createProjectNameFactoryWithCounter(nameFactory: (counter: number) => string) {
    let nextId = 1;
    return () => nameFactory(nextId++);
}
export function makeInferredProjectName(counter: number): string {
    return `/dev/null/inferredProject${counter}*`;
}

function forEachReferencedProject<T>(
    project: ConfiguredProject,
    cb: (refProj: ConfiguredProject) => T | undefined,
): T | undefined {
    return forEachAnyProjectReferenceKind(
        project,
        resolvedRef => callbackRefProject(project, cb, resolvedRef.sourceFile.path),
        projectRef => callbackRefProject(project, cb, project.toPath(resolveProjectReferencePath(projectRef))),
        potentialProjectRef => callbackRefProject(project, cb, potentialProjectRef),
    );
}

function forEachAnyProjectReferenceKind<T>(
    project: ConfiguredProject,
    cb: (resolvedProjectReference: ResolvedProjectReference) => T | undefined,
    cbProjectRef: (projectReference: ProjectReference) => T | undefined,
    cbPotentialProjectRef: (potentialProjectReference: NormalizedPath) => T | undefined,
): T | undefined {
    return project.getCurrentProgram() ?
        project.forEachResolvedProjectReference(cb) :
        project.isInitialLoadPending() ?
        forEachPotentialProjectReference(project, cbPotentialProjectRef) :
        forEach(project.getProjectReferences(), cbProjectRef);
}

function callbackRefProject<T, P extends string>(
    project: ConfiguredProject,
    cb: (refProj: ConfiguredProject) => T | undefined,
    refPath: P | undefined,
) {
    const refProject = refPath && project.projectService.configuredProjects.get(refPath);
    return refProject && cb(refProject);
}

export interface WatchOptionsAndErrors {
    watchOptions: WatchOptions;
    errors: Diagnostic[] | undefined;
}

export function convertScriptKindName(scriptKindName: protocol.ScriptKindName) {
    switch (scriptKindName) {
        case "LPC":
            return ScriptKind.LPC;        
        default:
            return ScriptKind.Unknown;
    }
}

function prepareConvertersForEnumLikeCompilerOptions(commandLineOptions: CommandLineOption[]): Map<string, Map<string, number>> {
    const map = new Map<string, Map<string, number>>();
    for (const option of commandLineOptions) {
        if (typeof option.type === "object") {
            const optionMap = option.type as Map<string, number>;
            // verify that map contains only numbers
            optionMap.forEach(value => {
                Debug.assert(typeof value === "number");
            });
            map.set(option.name, optionMap);
        }
    }
    return map;
}


const compilerOptionConverters = prepareConvertersForEnumLikeCompilerOptions(optionDeclarations);
const watchOptionsConverters = prepareConvertersForEnumLikeCompilerOptions(optionsForWatch);
const indentStyle = new Map(Object.entries({
    none: IndentStyle.None,
    block: IndentStyle.Block,
    smart: IndentStyle.Smart,
}));


export function convertCompilerOptions(protocolOptions: protocol.ExternalProjectCompilerOptions): CompilerOptions & protocol.CompileOnSaveMixin {
    compilerOptionConverters.forEach((mappedValues, id) => {
        const propertyValue = protocolOptions[id];
        if (isString(propertyValue)) {
            protocolOptions[id] = mappedValues.get(propertyValue.toLowerCase());
        }
    });
    return protocolOptions as any;
}

export function convertWatchOptions(protocolOptions: protocol.ExternalProjectCompilerOptions, currentDirectory?: string): WatchOptionsAndErrors | undefined {
    let watchOptions: WatchOptions | undefined;
    let errors: Diagnostic[] | undefined;
    optionsForWatch.forEach(option => {
        const propertyValue = protocolOptions[option.name];
        if (propertyValue === undefined) return;
        const mappedValues = watchOptionsConverters.get(option.name);
        (watchOptions || (watchOptions = {}))[option.name] = mappedValues ?
            isString(propertyValue) ? mappedValues.get(propertyValue.toLowerCase()) : propertyValue :
            convertJsonOption(option, propertyValue, currentDirectory || "", errors || (errors = []));
    });
    return watchOptions && { watchOptions, errors };
}

export function convertTypeAcquisition(protocolOptions: protocol.InferredProjectCompilerOptions): TypeAcquisition | undefined {
    let result: TypeAcquisition | undefined;
    typeAcquisitionDeclarations.forEach(option => {
        const propertyValue = protocolOptions[option.name];
        if (propertyValue === undefined) return;
        (result || (result = {}))[option.name] = propertyValue;
    });
    return result;
}
