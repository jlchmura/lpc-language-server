import { arrayFrom, createGetCanonicalFileName, createMultiMap, Debug, Diagnostic, DirectoryStructureHost, DocumentRegistry, FileSystemEntries, FileWatcherEventKind, find, getNormalizedAbsolutePath, isRootedDiskPath, LanguageServiceMode, missingFileModifiedTime, MultiMap, normalizePath, Path, PollingInterval, ScriptKind, startsWith, toPath, WatchFactory, WatchType } from "./_namespaces/lpc";
import { ConfiguredProject, findLpcConfig, HostCancellationToken, isDynamicFileName, isProjectDeferredClose, Logger, NormalizedPath, normalizedPathToPath, Project, ScriptInfo, ServerHost, Session, ThrottledOperations, toNormalizedPath } from "./_namespaces/lpc.server";

/** @internal */
export const maxFileSize = 4 * 1024 * 1024;

export class ProjectService {
    /** @internal */
    readonly documentRegistry: DocumentRegistry;

    /**
     * Container of all known scripts
     *
     * @internal
     */
    readonly filenameToScriptInfo = new Map<Path, ScriptInfo>();

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
    /** @internal */
    readonly session: Session<unknown> | undefined;

    /**
     * Map to the real path of the infos
     *
     * @internal
     */
    readonly realpathToScriptInfos: MultiMap<Path, ScriptInfo> | undefined;
    
    /** @internal */
    readonly eventHandler?: ProjectServiceEventHandler;

    /**
     * Open files: with value being project root path, and key being Path of the file that is open
     */
    readonly openFiles: Map<Path, NormalizedPath | undefined> = new Map<Path, NormalizedPath | undefined>();
    
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
    
    /** @internal */
    readonly watchFactory: WatchFactory<WatchType, Project | NormalizedPath>;
    
    constructor(opts: ProjectServiceOptions) {
        this.host = opts.host;
        this.logger = opts.logger;
        this.cancellationToken = opts.cancellationToken;
        // this.useSingleInferredProject = opts.useSingleInferredProject;
        this.useInferredProjectPerProjectRoot = opts.useInferredProjectPerProjectRoot;
        // this.typingsInstaller = opts.typingsInstaller || nullTypingsInstaller;
        this.throttleWaitMilliseconds = opts.throttleWaitMilliseconds;
        this.eventHandler = opts.eventHandler;
        // this.suppressDiagnosticEvents = opts.suppressDiagnosticEvents;
        // this.globalPlugins = opts.globalPlugins || emptyArray;
        // this.pluginProbeLocations = opts.pluginProbeLocations || emptyArray;
        // this.allowLocalPluginLoads = !!opts.allowLocalPluginLoads;
        // this.typesMapLocation = (opts.typesMapLocation === undefined) ? combinePaths(getDirectoryPath(this.getExecutingFilePath()), "typesMap.json") : opts.typesMapLocation;
        this.session = opts.session;
        // this.jsDocParsingMode = opts.jsDocParsingMode;

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
   
    getScriptInfoForPath(fileName: Path) {
        const info = this.filenameToScriptInfo.get(fileName);
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
        Debug.fail("implement me");
        // this.pendingEnsureProjectForOpenFiles = true;
        // this.throttledOperations.schedule(ensureProjectForOpenFileSchedule, /*delay*/ 2500, () => {
        //     if (this.pendingProjectUpdates.size !== 0) {
        //         this.delayEnsureProjectForOpenFiles();
        //     }
        //     else {
        //         if (this.pendingEnsureProjectForOpenFiles) {
        //             this.ensureProjectForOpenFiles();

        //             // Send the event to notify that there were background project updates
        //             // send current list of open files
        //             this.sendProjectsUpdatedInBackgroundEvent();
        //         }
        //     }
        // });
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

    openClientFileWithNormalizedPath(fileName: NormalizedPath, fileContent?: string, scriptKind?: ScriptKind, hasMixedContent?: boolean, projectRootPath?: NormalizedPath): OpenConfiguredProjectResult {
        Debug.fail("implement me");
        const info = this.getOrCreateOpenScriptInfo(fileName, fileContent, scriptKind, hasMixedContent, projectRootPath);
        //const { retainProjects, ...result } = this.assignProjectToOpenedScriptInfo(info);
        // this.cleanupProjectsAndScriptInfos(
        //     retainProjects,
        //     new Set([info.path]),
        //     /*externalProjectsRetainingConfiguredProjects*/ undefined,
        // );
        // this.telemetryOnOpenFile(info);
        // this.printProjects();
        // return result;
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
}

export const LargeFileReferencedEvent = "largeFileReferenced";

export type ProjectServiceEventHandler = (event: ProjectServiceEvent) => void;

export interface LargeFileReferencedEvent {
    eventName: typeof LargeFileReferencedEvent;
    data: { file: string; fileSize: number; maxFileSize: number; };
}

export type ProjectServiceEvent =
    | LargeFileReferencedEvent;

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