import { arrayReverseIterator, concatenate, Debug, Diagnostic, diagnosticCategoryName, DiagnosticRelatedInformation, displayPartsToString, emptyArray, filter, flattenDiagnosticMessageText, getLineAndCharacterOfPosition, isDeclarationFileName, isString, JSDocTagInfo, LanguageServiceMode, LineAndCharacter, map, mapDefinedIterator, mapIterator, normalizePath, OperationCanceledException, PossibleProgramFileInfo, QuickInfo, ScriptKind, SymbolDisplayPart, textSpanEnd, toFileNameLowerCase, tracing } from "./_namespaces/lpc";
import { ChangeFileArguments, ConfiguredProject, GcTimer, Logger, LogLevel, NormalizedPath, OpenFileArguments, Project, ProjectService, ProjectServiceEventHandler, ProjectServiceOptions, ScriptInfo, ServerHost, stringifyIndented, toNormalizedPath, updateProjectIfDirty } from "./_namespaces/lpc.server";
import * as protocol from "./protocol.js";

export interface HostCancellationToken {
    isCancellationRequested(): boolean;
}

export interface ServerCancellationToken extends HostCancellationToken {
    setRequest(requestId: number): void;
    resetRequest(requestId: number): void;
}

export const nullCancellationToken: ServerCancellationToken = {
    isCancellationRequested: () => false,
    setRequest: () => void 0,
    resetRequest: () => void 0,
};


export interface SessionOptions {
    host: ServerHost;
    cancellationToken: ServerCancellationToken;
    useSingleInferredProject: boolean;
    useInferredProjectPerProjectRoot: boolean;
    byteLength: (buf: string, encoding?: BufferEncoding) => number;
    hrtime: (start?: [number, number]) => [number, number];
    logger: Logger;
    /**
     * If falsy, all events are suppressed.
     */
    canUseEvents: boolean;
    canUseWatchEvents?: boolean;
    eventHandler?: ProjectServiceEventHandler;
    /** Has no effect if eventHandler is also specified. */
    suppressDiagnosticEvents?: boolean;
    serverMode?: LanguageServiceMode;
    throttleWaitMilliseconds?: number;
    noGetErrOnBackgroundUpdate?: boolean;

    globalPlugins?: readonly string[];
    pluginProbeLocations?: readonly string[];
    allowLocalPluginLoads?: boolean;
    typesMapLocation?: string;
    projectRootFolder?: string;    
    ///** @internal */ incrementalVerifier?: (service: ProjectService) => void;
}

export class Session<T> { 
    private readonly gcTimer: GcTimer;
    // protected projectService: ProjectService;
    private changeSeq = 0;

    // private performanceData: PerformanceData | undefined;

    private currentRequestId!: number;
    private errorCheck: MultistepOperation;

    protected host: ServerHost;
    private readonly cancellationToken: ServerCancellationToken;
    
    protected byteLength: (buf: string, encoding?: BufferEncoding) => number;
    private hrtime: (start?: [number, number]) => [number, number];
    protected logger: Logger;

    protected canUseEvents: boolean;
    private suppressDiagnosticEvents?: boolean;
    //private eventHandler: ProjectServiceEventHandler | undefined;
    private readonly noGetErrOnBackgroundUpdate?: boolean;

    // Minimum number of lines for attempting to use region diagnostics for a file.
    /** @internal */
    protected regionDiagLineCountThreshold = 500;
    
    private projectService: ProjectService;

    constructor(opts: SessionOptions) {
        this.host = opts.host;
        this.cancellationToken = opts.cancellationToken;        
        this.byteLength = opts.byteLength;
        this.hrtime = opts.hrtime;
        this.logger = opts.logger;
        this.canUseEvents = opts.canUseEvents;
        this.suppressDiagnosticEvents = opts.suppressDiagnosticEvents;
        this.noGetErrOnBackgroundUpdate = opts.noGetErrOnBackgroundUpdate;

        const { throttleWaitMilliseconds } = opts;

        const multistepOperationHost: MultistepOperationHost = {
            executeWithRequestId: (requestId, action) => this.executeWithRequestId(requestId, action),
            getCurrentRequestId: () => this.currentRequestId,
            getServerHost: () => this.host,
            logError: (err, cmd) => this.logError(err, cmd),
            sendRequestCompletedEvent: requestId => this.sendRequestCompletedEvent(requestId),
            isCancellationRequested: () => this.cancellationToken.isCancellationRequested(),
        };
        this.errorCheck = new MultistepOperation(multistepOperationHost);

        const settings: ProjectServiceOptions = {
            host: this.host,
            logger: this.logger,
            cancellationToken: this.cancellationToken,
            useSingleInferredProject: opts.useSingleInferredProject,
            useInferredProjectPerProjectRoot: opts.useInferredProjectPerProjectRoot,
            globalPlugins: opts.globalPlugins,
            pluginProbeLocations: opts.pluginProbeLocations,
            allowLocalPluginLoads: opts.allowLocalPluginLoads,
            typesMapLocation: opts.typesMapLocation,
            throttleWaitMilliseconds,
            serverMode: opts.serverMode,     
            session: this,
            projectRootFolder: opts.projectRootFolder
        };        
        this.projectService = new ProjectService(settings);
        
        const configFile = this.projectService.findAndOpenLpcConfig(opts.projectRootFolder);
        this.getProject(configFile);
        //this.projectService.setPerformanceEventHandler(this.performanceEventHandler.bind(this));
        this.gcTimer = new GcTimer(this.host, /*delay*/ 7000, this.logger);
    }

    public send(msg: protocol.Message) {
        if (msg.type === "event" && !this.canUseEvents) {
            if (this.logger.hasLevel(LogLevel.verbose)) {
                this.logger.info(`Session does not support events: ignored event: ${stringifyIndented(msg)}`);
            }
            return;
        }
        this.writeMessage(msg);
    }

    protected writeMessage(msg: protocol.Message) {
        const msgText = formatMessage(msg, this.logger, this.byteLength, this.host.newLine);
        //perfLogger?.logEvent(`Response message size: ${msgText.length}`);
        this.host.write(msgText);
    }
    
    public event<T extends object>(body: T, eventName: string): void {
        this.send(toEvent(eventName, body));
    }

    private sendRequestCompletedEvent(requestId: number): void {
        this.event<protocol.RequestCompletedEventBody>({ request_seq: requestId }, "requestCompleted");
    }

    private setCurrentRequest(requestId: number): void {
        Debug.assert(this.currentRequestId === undefined);
        this.currentRequestId = requestId;
        this.cancellationToken.setRequest(requestId);
    }

    private resetCurrentRequest(requestId: number): void {
        Debug.assert(this.currentRequestId === requestId);
        this.currentRequestId = undefined!; // TODO: GH#18217
        this.cancellationToken.resetRequest(requestId);
    }

    public executeWithRequestId<T>(requestId: number, f: () => T) {
        try {
            this.setCurrentRequest(requestId);
            return f();
        }
        finally {
            this.resetCurrentRequest(requestId);
        }
    }

    public logError(err: Error, cmd: string): void {
        this.logErrorWorker(err, cmd);
    }

    private logErrorWorker(err: Error & PossibleProgramFileInfo, cmd: string, fileRequest?: protocol.FileRequestArgs): void {
        let msg = "Exception on executing command " + cmd;
        console.error(msg, err);
        // if (err.message) {
        //     msg += ":\n" + indent(err.message);
        //     if ((err as StackTraceError).stack) {
        //         msg += "\n" + indent((err as StackTraceError).stack!);
        //     }
        // }

        // if (this.logger.hasLevel(LogLevel.verbose)) {
        //     if (fileRequest) {
        //         try {
        //             const { file, project } = this.getFileAndProject(fileRequest);
        //             const scriptInfo = project.getScriptInfoForNormalizedPath(file);
        //             if (scriptInfo) {
        //                 const text = getSnapshotText(scriptInfo.getSnapshot());
        //                 msg += `\n\nFile text of ${fileRequest.file}:${indent(text)}\n`;
        //             }
        //         }
        //         catch {} // eslint-disable-line no-empty
        //     }

        //     if (err.ProgramFiles) {
        //         msg += `\n\nProgram files: ${JSON.stringify(err.ProgramFiles)}\n`;
        //         msg += `\n\nProjects::\n`;
        //         let counter = 0;
        //         const addProjectInfo = (project: Project) => {
        //             msg += `\nProject '${project.projectName}' (${ProjectKind[project.projectKind]}) ${counter}\n`;
        //             msg += project.filesToString(/*writeProjectFileNames*/ true);
        //             msg += "\n-----------------------------------------------\n";
        //             counter++;
        //         };
        //         this.projectService.externalProjects.forEach(addProjectInfo);
        //         this.projectService.configuredProjects.forEach(addProjectInfo);
        //         this.projectService.inferredProjects.forEach(addProjectInfo);
        //     }
        // }

        // this.logger.msg(msg, Msg.Err);
    }

    private getFileAndProject(args: protocol.FileRequestArgs): FileAndProject {
        return this.getFileAndProjectWorker(args.file, args.projectFileName);
    }

    private getProject(projectFileName: string | undefined): Project | undefined {
        return projectFileName === undefined ? undefined : this.projectService.findProject(projectFileName);
    }
    
    private getFileAndProjectWorker(uncheckedFileName: string, projectFileName: string | undefined): { file: NormalizedPath; project: Project; } {
        const file = toNormalizedPath(uncheckedFileName);
        const project = this.getProject(projectFileName) || this.projectService.ensureDefaultProjectForFile(file);
        return { file, project };
    }

    /**
     * @param fileName is the name of the file to be opened
     * @param fileContent is a version of the file content that is known to be more up to date than the one on disk
     */
    private openClientFile(fileName: NormalizedPath, fileContent?: string, scriptKind?: ScriptKind, projectRootPath?: NormalizedPath) {
        this.projectService.openClientFileWithNormalizedPath(fileName, fileContent, scriptKind, /*hasMixedContent*/ false, projectRootPath);
    }

    public openFile(args: protocol.OpenRequestArgs) {
        this.openClientFile(
            toNormalizedPath(args.file),
            args.fileContent,
            ScriptKind.LPC,
            args.projectRootPath ? toNormalizedPath(args.projectRootPath) : undefined,
        );
        return args;
        //return this.notRequired(request);
    }

    

    private getPosition(args: protocol.Location & { position?: number; }, scriptInfo: ScriptInfo): number {
        return args.position !== undefined ? args.position : scriptInfo.lineOffsetToPosition(args.line, args.offset);
    }
    
    private mapDisplayParts(parts: SymbolDisplayPart[] | undefined, project: Project): SymbolDisplayPart[] {
        if (!parts) {
            return [];
        }
        return parts.map(part =>
            part
            // part.kind !== "linkName" ? part : {
            //     ...part,
            //     target: this.toFileSpan((part as JSDocLinkDisplayPart).target.fileName, (part as JSDocLinkDisplayPart).target.textSpan, project),
            // }
        );
    }
    
    public updateOpen(args: protocol.UpdateOpenRequestArgs) {
        this.changeSeq++;

        const openFiles: Iterable<OpenFileArguments> = args.openFiles && mapIterator(args.openFiles, file => ({
            fileName: file.file,
            content: file.fileContent,
            projectRootPath: file.projectRootPath,
        }));

        const changedFiles: Iterable<ChangeFileArguments> = args.changedFiles && mapIterator(args.changedFiles, file => ({
            fileName: file.fileName,
            changes: mapDefinedIterator(arrayReverseIterator(file.textChanges), change => {
                const scriptInfo = Debug.checkDefined(this.projectService.getScriptInfo(file.fileName));
                const start = scriptInfo.lineOffsetToPosition(change.start.line, change.start.offset);
                const end = scriptInfo.lineOffsetToPosition(change.end.line, change.end.offset);
                return start >= 0 ? { span: { start, length: end - start }, newText: change.newText } : undefined;
            }),
        }));     
        
        this.projectService.applyChangesInOpenFiles(openFiles, changedFiles, args.closedFiles);

        return true;
    }

    private getDiagnostics(next: NextStep, delay: number, fileNames: string[]): void {
        if (this.suppressDiagnosticEvents) {
            return;
        }

        if (fileNames.length > 0) {
            this.updateErrorCheck(next, fileNames, delay);
        }
    }

    private toPendingErrorCheck(uncheckedFileName: string): PendingErrorCheck | undefined {
        const fileName = toNormalizedPath(uncheckedFileName);
        const project = this.projectService.tryGetDefaultProjectForFile(fileName);
        return project && { fileName, project };
    }
    
    /** It is the caller's responsibility to verify that `!this.suppressDiagnosticEvents`. */
    private updateErrorCheck(next: NextStep, checkList: readonly string[] | readonly PendingErrorCheck[], ms: number, requireOpen = true) {
        Debug.assert(!this.suppressDiagnosticEvents); // Caller's responsibility

        const seq = this.changeSeq;
        const followMs = Math.min(ms, 200);

        let index = 0;
        const goNext = () => {
            index++;
            if (checkList.length > index) {
                next.delay("checkOne", followMs, checkOne);
            }
        };
        const checkOne = () => {
            if (this.changeSeq !== seq) {
                return;
            }

            let item: string | PendingErrorCheck | undefined = checkList[index];
            if (isString(item)) {
                // Find out project for the file name
                item = this.toPendingErrorCheck(item);
                if (!item) {
                    // Ignore file if there is no project for the file
                    goNext();
                    return;
                }
            }

            const { fileName, project } = item;

            // Ensure the project is up to date before checking if this file is present in the project.
            updateProjectIfDirty(project);
            if (!project.containsFile(fileName, requireOpen)) {
                return;
            }

            this.syntacticCheck(fileName, project);
            if (this.changeSeq !== seq) {
                return;
            }

            // Don't provide semantic diagnostics unless we're in full semantic mode.
            if (project.projectService.serverMode !== LanguageServiceMode.Semantic) {
                goNext();
                return;
            }
            next.immediate("semanticCheck", () => {
                this.semanticCheck(fileName, project);
                if (this.changeSeq !== seq) {
                    return;
                }

                // if (this.getPreferences(fileName).disableSuggestions) {
                //     goNext();
                //     return;
                // }
                next.immediate("suggestionCheck", () => {
                    this.suggestionCheck(fileName, project);
                    goNext();
                });
            });
        };

        if (checkList.length > index && this.changeSeq === seq) {
            next.delay("checkOne", ms, checkOne);
        }
    }

    private semanticCheck(file: NormalizedPath, project: Project) {
        tracing?.push(tracing.Phase.Session, "semanticCheck", { file, configFilePath: (project as ConfiguredProject).canonicalConfigFilePath }); // undefined is fine if the cast fails
        // const diags = isDeclarationFileInJSOnlyNonConfiguredProject(project, file)
        //     ? emptyArray
        //     : project.getLanguageService().getSemanticDiagnostics(file).filter(d => !!d.file);
        const diags = emptyArray;
        this.sendDiagnosticsEvent(file, project, diags, "semanticDiag");
        tracing?.pop();
    }

    private syntacticCheck(file: NormalizedPath, project: Project) {
        tracing?.push(tracing.Phase.Session, "syntacticCheck", { file, configFilePath: (project as ConfiguredProject).canonicalConfigFilePath }); // undefined is fine if the cast fails
        this.sendDiagnosticsEvent(file, project, project.getLanguageService().getSyntacticDiagnostics(file), "syntaxDiag");
        tracing?.pop();
    }

    private suggestionCheck(file: NormalizedPath, project: Project) {
        tracing?.push(tracing.Phase.Session, "suggestionCheck", { file, configFilePath: (project as ConfiguredProject).canonicalConfigFilePath }); // undefined is fine if the cast fails
        this.sendDiagnosticsEvent(file, project, project.getLanguageService().getSuggestionDiagnostics(file), "suggestionDiag");
        tracing?.pop();
    }

    private getConfigFileAndProject(args: protocol.FileRequestArgs): { configFile: NormalizedPath | undefined; project: Project | undefined; } {
        const project = this.getProject(args.projectFileName);
        const file = toNormalizedPath(args.file);

        return {
            configFile: project && project.hasConfigFile(file) ? file : undefined,
            project,
        };
    }

    private getConfigFileDiagnostics(configFile: NormalizedPath, project: Project, includeLinePosition: boolean) {
        const projectErrors = project.getAllProjectErrors();
        const optionsErrors = project.getLanguageService().getCompilerOptionsDiagnostics();
        const diagnosticsForConfigFile = filter(
            concatenate(projectErrors, optionsErrors),
            diagnostic => !!diagnostic.file && diagnostic.file.fileName === configFile,
        );
        return includeLinePosition ?
            this.convertToDiagnosticsWithLinePositionFromDiagnosticFile(diagnosticsForConfigFile) :
            map(
                diagnosticsForConfigFile,
                diagnostic => formatDiagnosticToProtocol(diagnostic, /*includeFileName*/ false),
            );
    }

    private convertToDiagnosticsWithLinePositionFromDiagnosticFile(diagnostics: readonly Diagnostic[]): protocol.DiagnosticWithLinePosition[] {
        return diagnostics.map<protocol.DiagnosticWithLinePosition>(d => ({
            message: flattenDiagnosticMessageText(d.messageText, this.host.newLine),
            start: d.start!, // TODO: GH#18217
            length: d.length!, // TODO: GH#18217
            category: diagnosticCategoryName(d),
            code: d.code,
            source: d.source,
            startLocation: (d.file && convertToLocation(getLineAndCharacterOfPosition(d.file, d.start!)))!, // TODO: GH#18217
            endLocation: (d.file && convertToLocation(getLineAndCharacterOfPosition(d.file, d.start! + d.length!)))!, // TODO: GH#18217
            reportsUnnecessary: d.reportsUnnecessary,
            reportsDeprecated: d.reportsDeprecated,
            relatedInformation: map(d.relatedInformation, formatRelatedInformation),
        }));
    }

    public getSemanticDiagnosticsSync(args: protocol.SemanticDiagnosticsSyncRequestArgs) {
        const { configFile, project } = this.getConfigFileAndProject(args);
        if (configFile) {
            return this.getConfigFileDiagnostics(configFile, project!, !!args.includeLinePosition); // TODO: GH#18217
        }
        return this.getDiagnosticsWorker(args, /*isSemantic*/ true, (project, file) => project.getLanguageService().getSemanticDiagnostics(file).filter(d => !!d.file), !!args.includeLinePosition);
    }

    private getDiagnosticsWorker(
        args: protocol.FileRequestArgs,
        isSemantic: boolean,
        selector: (project: Project, file: string) => readonly Diagnostic[],
        includeLinePosition: boolean,
    ): readonly protocol.DiagnosticWithLinePosition[] | readonly protocol.Diagnostic[] {
        const { project, file } = this.getFileAndProject(args);
        // if (isSemantic && isDeclarationFileInJSOnlyNonConfiguredProject(project, file)) {
        //     return emptyArray;
        // }
        const scriptInfo = project.getScriptInfoForNormalizedPath(file);
        const diagnostics = selector(project, file);
        return includeLinePosition
            ? this.convertToDiagnosticsWithLinePosition(diagnostics, scriptInfo)
            : diagnostics.map(d => formatDiag(file, project, d));
    }

    private convertToDiagnosticsWithLinePosition(diagnostics: readonly Diagnostic[], scriptInfo: ScriptInfo | undefined): protocol.DiagnosticWithLinePosition[] {
        return diagnostics.map(d =>
            ({
                message: flattenDiagnosticMessageText(d.messageText, this.host.newLine),
                start: d.start,
                length: d.length,
                category: diagnosticCategoryName(d),
                code: d.code,
                source: d.source,
                startLocation: scriptInfo && scriptInfo.positionToLineOffset(d.start!), // TODO: GH#18217
                endLocation: scriptInfo && scriptInfo.positionToLineOffset(d.start! + d.length!),
                reportsUnnecessary: d.reportsUnnecessary,
                reportsDeprecated: d.reportsDeprecated,
                relatedInformation: map(d.relatedInformation, formatRelatedInformation),
            }) as protocol.DiagnosticWithLinePosition
        );
    }

    private sendDiagnosticsEvent(file: NormalizedPath, project: Project, diagnostics: readonly Diagnostic[], kind: protocol.DiagnosticEventKind): void {
        try {
            this.event<protocol.DiagnosticEventBody>({ file, diagnostics: diagnostics.map(diag => formatDiag(file, project, diag)) }, kind);
        }
        catch (err) {
            this.logError(err, kind);
        }
    }
    
    public getDiagnosticsForFiles(args: protocol.DiagnosticRequestArgs) {
        this.errorCheck.startNew(next => this.getDiagnostics(next, args.delay, args.files));
    }

    public getDiagnosticsForProject(args: protocol.DiagnosticForProjectRequestArgs) {
        this.errorCheck.startNew(next => this.getDiagnosticsForProjectWorker(next, args.delay, args.file));
    }

    public getQuickInfoWorker(args: protocol.FileLocationRequestArgs, simplifiedResult: boolean): protocol.QuickInfoResponseBody | QuickInfo | undefined {
        const { file, project } = this.getFileAndProject(args);
        const scriptInfo = this.projectService.getScriptInfoForNormalizedPath(file)!;
        const quickInfo = project.getLanguageService().getQuickInfoAtPosition(file, this.getPosition(args, scriptInfo));
        if (!quickInfo) {
            return undefined;
        }

        const useDisplayParts = false;//!!this.getPreferences(file).displayPartsForJSDoc;
        if (simplifiedResult) {
            const displayString = displayPartsToString(quickInfo.displayParts);
            return {
                kind: quickInfo.kind,
                kindModifiers: quickInfo.kindModifiers,
                start: scriptInfo.positionToLineOffset(quickInfo.textSpan.start),
                end: scriptInfo.positionToLineOffset(textSpanEnd(quickInfo.textSpan)),
                displayString,
                documentation: useDisplayParts ? this.mapDisplayParts(quickInfo.documentation, project) : displayPartsToString(quickInfo.documentation),
                tags: this.mapJSDocTagInfo(quickInfo.tags, project, useDisplayParts),
            };
        }
        else {
            return useDisplayParts ? quickInfo : {
                ...quickInfo,
                tags: this.mapJSDocTagInfo(quickInfo.tags, project, /*richResponse*/ false) as JSDocTagInfo[],
            };
        }
    }

    private getProjectInfoWorker(uncheckedFileName: string, projectFileName: string | undefined, needFileNameList: boolean, excludeConfigFiles: boolean) {
        const { project } = this.getFileAndProjectWorker(uncheckedFileName, projectFileName);
        updateProjectIfDirty(project);
        const projectInfo = {
            configFileName: project.getProjectName(),
            languageServiceDisabled: !project.languageServiceEnabled,
            fileNames: needFileNameList ? project.getFileNames(/*excludeFilesFromExternalLibraries*/ false, excludeConfigFiles) : undefined,
        };
        return projectInfo;
    }


    private getDiagnosticsForProjectWorker(next: NextStep, delay: number, fileName: string): void {
        if (this.suppressDiagnosticEvents) {
            return;
        }

        const { fileNames, languageServiceDisabled } = this.getProjectInfoWorker(fileName, /*projectFileName*/ undefined, /*needFileNameList*/ true, /*excludeConfigFiles*/ true);
        if (languageServiceDisabled) {
            return;
        }

        // No need to analyze lib.d.ts
        const fileNamesInProject = fileNames!.filter(value => !value.includes("lib.d.ts")); // TODO: GH#18217
        if (fileNamesInProject.length === 0) {
            return;
        }

        // Sort the file name list to make the recently touched files come first
        const highPriorityFiles: NormalizedPath[] = [];
        const mediumPriorityFiles: NormalizedPath[] = [];
        const lowPriorityFiles: NormalizedPath[] = [];
        const veryLowPriorityFiles: NormalizedPath[] = [];
        const normalizedFileName = toNormalizedPath(fileName);
        const project = this.projectService.ensureDefaultProjectForFile(normalizedFileName);
        for (const fileNameInProject of fileNamesInProject) {
            if (this.getCanonicalFileName(fileNameInProject) === this.getCanonicalFileName(fileName)) {
                highPriorityFiles.push(fileNameInProject);
            }
            else {
                const info = this.projectService.getScriptInfo(fileNameInProject)!; // TODO: GH#18217
                if (!info.isScriptOpen()) {
                    if (isDeclarationFileName(fileNameInProject)) {
                        veryLowPriorityFiles.push(fileNameInProject);
                    }
                    else {
                        lowPriorityFiles.push(fileNameInProject);
                    }
                }
                else {
                    mediumPriorityFiles.push(fileNameInProject);
                }
            }
        }

        const sortedFiles = [...highPriorityFiles, ...mediumPriorityFiles, ...lowPriorityFiles, ...veryLowPriorityFiles];
        const checkList = sortedFiles.map(fileName => ({ fileName, project }));
        // Project level error analysis runs on background files too, therefore
        // doesn't require the file to be opened
        this.updateErrorCheck(next, checkList, delay, /*requireOpen*/ false);
    }

    getCanonicalFileName(fileName: string) {
        const name = this.host.useCaseSensitiveFileNames ? fileName : toFileNameLowerCase(fileName);
        return normalizePath(name);
    }

    private mapJSDocTagInfo(tags: JSDocTagInfo[] | undefined, project: Project, richResponse: boolean): protocol.JSDocTagInfo[] {
        return tags ? tags.map(tag => ({
            ...tag,
            text: richResponse ? this.mapDisplayParts(tag.text, project) : tag.text?.map(part => part.text).join(""),
        })) : [];
    }
    
}

interface FileAndProject {
    readonly file: NormalizedPath;
    readonly project: Project;
}

/**
 * Allows to schedule next step in multistep operation
 */
interface NextStep {
    immediate(actionType: string, action: () => void): void;
    delay(actionType: string, ms: number, action: () => void): void;
}

/**
 * External capabilities used by multistep operation
 */
interface MultistepOperationHost {
    getCurrentRequestId(): number;
    sendRequestCompletedEvent(requestId: number): void;
    getServerHost(): ServerHost;
    isCancellationRequested(): boolean;
    executeWithRequestId(requestId: number, action: () => void): void;
    logError(error: Error, message: string): void;
}

/**
 * Represents operation that can schedule its next step to be executed later.
 * Scheduling is done via instance of NextStep. If on current step subsequent step was not scheduled - operation is assumed to be completed.
 */
class MultistepOperation implements NextStep {
    private requestId: number | undefined;
    private timerHandle: any;
    private immediateId: number | undefined;

    constructor(private readonly operationHost: MultistepOperationHost) {}

    public startNew(action: (next: NextStep) => void) {
        this.complete();
        this.requestId = this.operationHost.getCurrentRequestId();
        this.executeAction(action);
    }

    private complete() {
        if (this.requestId !== undefined) {
            this.operationHost.sendRequestCompletedEvent(this.requestId);
            this.requestId = undefined;
        }
        this.setTimerHandle(undefined);
        this.setImmediateId(undefined);
    }

    public immediate(actionType: string, action: () => void) {
        const requestId = this.requestId!;
        Debug.assert(requestId === this.operationHost.getCurrentRequestId(), "immediate: incorrect request id");
        this.setImmediateId(
            this.operationHost.getServerHost().setImmediate(() => {
                this.immediateId = undefined;
                this.operationHost.executeWithRequestId(requestId, () => this.executeAction(action));
            }, actionType),
        );
    }

    public delay(actionType: string, ms: number, action: () => void) {
        const requestId = this.requestId!;
        Debug.assert(requestId === this.operationHost.getCurrentRequestId(), "delay: incorrect request id");
        this.setTimerHandle(
            this.operationHost.getServerHost().setTimeout(
                () => {
                    this.timerHandle = undefined;
                    this.operationHost.executeWithRequestId(requestId, () => this.executeAction(action));
                },
                ms,
                actionType,
            ),
        );
    }

    private executeAction(action: (next: NextStep) => void) {
        let stop = false;
        try {
            if (this.operationHost.isCancellationRequested()) {
                stop = true;
                tracing?.instant(tracing.Phase.Session, "stepCanceled", { seq: this.requestId, early: true });
            }
            else {
                tracing?.push(tracing.Phase.Session, "stepAction", { seq: this.requestId });
                action(this);
                tracing?.pop();
            }
        }
        catch (e) {
            // Cancellation or an error may have left incomplete events on the tracing stack.
            tracing?.popAll();

            stop = true;
            // ignore cancellation request
            if (e instanceof OperationCanceledException) {
                tracing?.instant(tracing.Phase.Session, "stepCanceled", { seq: this.requestId });
            }
            else {
                tracing?.instant(tracing.Phase.Session, "stepError", { seq: this.requestId, message: (e as Error).message });
                this.operationHost.logError(e, `delayed processing of request ${this.requestId}`);
            }
        }
        if (stop || !this.hasPendingWork()) {
            this.complete();
        }
    }

    private setTimerHandle(timerHandle: any) {
        if (this.timerHandle !== undefined) {
            this.operationHost.getServerHost().clearTimeout(this.timerHandle);
        }
        this.timerHandle = timerHandle;
    }

    private setImmediateId(immediateId: number | undefined) {
        if (this.immediateId !== undefined) {
            this.operationHost.getServerHost().clearImmediate(this.immediateId);
        }
        this.immediateId = immediateId;
    }

    private hasPendingWork() {
        return !!this.timerHandle || !!this.immediateId;
    }
}

/** @internal */
export function toEvent(eventName: string, body: object): protocol.Event {
    return {
        seq: 0,
        type: "event",
        event: eventName,
        body,
    };
}


export function formatMessage<T extends protocol.Message>(msg: T, logger: Logger, byteLength: (s: string, encoding: BufferEncoding) => number, newLine: string): string {
    const verboseLogging = logger.hasLevel(LogLevel.verbose);

    const json = JSON.stringify(msg);
    if (verboseLogging) {
        logger.info(`${msg.type}:${stringifyIndented(msg)}`);
    }

    const len = byteLength(json, "utf8");
    return `Content-Length: ${1 + len}\r\n\r\n${json}${newLine}`;
}

export interface PendingErrorCheck {
    fileName: NormalizedPath;
    project: Project;
}

function formatDiag(fileName: NormalizedPath, project: Project, diag: Diagnostic): protocol.Diagnostic {
    const scriptInfo = project.getScriptInfoForNormalizedPath(fileName)!; // TODO: GH#18217
    return {
        start: scriptInfo.positionToLineOffset(diag.start!),
        end: scriptInfo.positionToLineOffset(diag.start! + diag.length!), // TODO: GH#18217
        text: flattenDiagnosticMessageText(diag.messageText, "\n"),
        code: diag.code,
        category: diagnosticCategoryName(diag),
        reportsUnnecessary: diag.reportsUnnecessary,
        reportsDeprecated: diag.reportsDeprecated,
        source: diag.source,
        relatedInformation: map(diag.relatedInformation, formatRelatedInformation),
    };
}

function formatRelatedInformation(info: DiagnosticRelatedInformation): protocol.DiagnosticRelatedInformation {
    if (!info.file) {
        return {
            message: flattenDiagnosticMessageText(info.messageText, "\n"),
            category: diagnosticCategoryName(info),
            code: info.code,
        };
    }
    return {
        span: {
            start: convertToLocation(getLineAndCharacterOfPosition(info.file, info.start!)),
            end: convertToLocation(getLineAndCharacterOfPosition(info.file, info.start! + info.length!)), // TODO: GH#18217
            file: info.file.fileName,
        },
        message: flattenDiagnosticMessageText(info.messageText, "\n"),
        category: diagnosticCategoryName(info),
        code: info.code,
    };
}


function convertToLocation(lineAndCharacter: LineAndCharacter): protocol.Location {
    return { line: lineAndCharacter.line + 1, offset: lineAndCharacter.character + 1 };
}

/** @internal */
export function formatDiagnosticToProtocol(diag: Diagnostic, includeFileName: true): protocol.DiagnosticWithFileName;
/** @internal */
export function formatDiagnosticToProtocol(diag: Diagnostic, includeFileName: false): protocol.Diagnostic;
/** @internal */
export function formatDiagnosticToProtocol(diag: Diagnostic, includeFileName: boolean): protocol.Diagnostic | protocol.DiagnosticWithFileName {
    const start = (diag.file && convertToLocation(getLineAndCharacterOfPosition(diag.file, diag.start!)))!; // TODO: GH#18217
    const end = (diag.file && convertToLocation(getLineAndCharacterOfPosition(diag.file, diag.start! + diag.length!)))!; // TODO: GH#18217
    const text = flattenDiagnosticMessageText(diag.messageText, "\n");
    const { code, source } = diag;
    const category = diagnosticCategoryName(diag);
    const common = {
        start,
        end,
        text,
        code,
        category,
        reportsUnnecessary: diag.reportsUnnecessary,
        reportsDeprecated: diag.reportsDeprecated,
        source,
        relatedInformation: map(diag.relatedInformation, formatRelatedInformation),
    };
    return includeFileName
        ? { ...common, fileName: diag.file && diag.file.fileName }
        : common;
}