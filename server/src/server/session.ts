import { arrayFrom, arrayReverseIterator, cast, CodeAction, CompletionEntry, CompletionEntryData, CompletionEntryDetails, CompletionInfo, concatenate, createQueue, createSet, createTextSpan, Debug, DefinitionInfo, Diagnostic, diagnosticCategoryName, DiagnosticRelatedInformation, displayPartsToString, DocumentPosition, DocumentSpan, documentSpansEqual, emptyArray, FileTextChanges, filter, find, first, firstIterator, firstOrUndefined, flatMap, flattenDiagnosticMessageText, forEach, FormatCodeSettings, getDocumentSpansEqualityComparer, getLineAndCharacterOfPosition, getMappedContextSpan, getMappedDocumentSpan, getMappedLocation, getSnapshotText, getTouchingPropertyName, identity, isArray, isDeclarationFileName, isSourceFile, isString, JSDocLinkDisplayPart, JSDocTagInfo, LanguageServiceMode, LanguageVariant, LineAndCharacter, LpcConfigSourceFile, map, mapDefined, mapDefinedIterator, mapIterator, memoize, MultiMap, NavigationTree, normalizePath, OperationCanceledException, Path, perfLogger, PossibleProgramFileInfo, QuickInfo, ReferencedSymbol, ReferencedSymbolDefinitionInfo, ReferencedSymbolEntry, RenameInfo, RenameInfoFailure, RenameLocation, ScriptKind, SignatureHelpItem, SignatureHelpItems, singleIterator, startsWith, SymbolDisplayPart, TextChange, TextSpan, textSpanEnd, toFileNameLowerCase, toPath, tracing, UserPreferences, WithMetadata } from "./_namespaces/lpc";
import { ChangeFileArguments, ConfiguredProject, convertScriptKindName, convertUserPreferences, Errors, GcTimer, indent, isConfiguredProject, Logger, LogLevel, Msg, NormalizedPath, normalizedPathToPath, OpenFileArguments, Project, ProjectKind, ProjectService, ProjectServiceEventHandler, ProjectServiceOptions, ScriptInfo, ServerHost, stringifyIndented, toNormalizedPath, updateProjectIfDirty } from "./_namespaces/lpc.server";
import * as protocol from "./protocol.js";

export interface HostCancellationToken {
    isCancellationRequested(): boolean;
}

interface StackTraceError extends Error {
    stack?: string;
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

export type Event = <T extends object>(body: T, eventName: string) => void;

export interface EventSender {
    event: Event;
}

type Projects = readonly Project[] | {
    readonly projects: readonly Project[];
    readonly symLinkedProjects: MultiMap<Path, Project>;
};

export class Session<TMessage = string> implements EventSender { 
    private readonly gcTimer: GcTimer;
    
    private changeSeq = 0;
    private performanceData: protocol.PerformanceData | undefined;

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
    
    protected projectService: ProjectService;    

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
        
        // const configFile = this.projectService.findAndOpenLpcConfig(opts.projectRootFolder);
        // this.getProject(configFile);
        //this.projectService.setPerformanceEventHandler(this.performanceEventHandler.bind(this));
        this.gcTimer = new GcTimer(this.host, /*delay*/ 7000, this.logger);        
        
        // Make sure to setup handlers to throw error for not allowed commands on syntax server
        switch (this.projectService.serverMode) {
            case LanguageServiceMode.Semantic:
                break;
            case LanguageServiceMode.PartialSemantic:                
                invalidPartialSemanticModeCommands.forEach(commandName =>
                    this.handlers.set(commandName, request => {
                        throw new Error(`Request: ${request.command} not allowed in LanguageServiceMode.PartialSemantic`);
                    })
                );
                break;
            case LanguageServiceMode.Syntactic:
                invalidSyntacticModeCommands.forEach(commandName =>
                    this.handlers.set(commandName, request => {
                        throw new Error(`Request: ${request.command} not allowed in LanguageServiceMode.Syntactic`);
                    })
                );
                break;
            default:
                Debug.assertNever(this.projectService.serverMode);
        }
    }

    exit() {/*overridden*/}
    
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
        if (err.message) {
            msg += ":\n" + indent(err.message);
            if ((err as StackTraceError).stack) {
                msg += "\n" + indent((err as StackTraceError).stack!);
            }
        }

        if (this.logger.hasLevel(LogLevel.verbose)) {
            if (fileRequest) {
                try {
                    const { file, project } = this.getFileAndProject(fileRequest);
                    const scriptInfo = project.getScriptInfoForNormalizedPath(file);
                    if (scriptInfo) {
                        const text = getSnapshotText(scriptInfo.getSnapshot());
                        msg += `\n\nFile text of ${fileRequest.file}:${indent(text)}\n`;
                    }
                }
                catch {} // eslint-disable-line no-empty
            }

            if (err.ProgramFiles) {
                msg += `\n\nProgram files: ${JSON.stringify(err.ProgramFiles)}\n`;
                msg += `\n\nProjects::\n`;
                let counter = 0;
                const addProjectInfo = (project: Project) => {
                    msg += `\nProject '${project.projectName}' (${ProjectKind[project.projectKind]}) ${counter}\n`;
                    msg += project.filesToString(/*writeProjectFileNames*/ true);
                    msg += "\n-----------------------------------------------\n";
                    counter++;
                };
                // this.projectService.externalProjects.forEach(addProjectInfo);
                this.projectService.configuredProjects.forEach(addProjectInfo);
                this.projectService.inferredProjects.forEach(addProjectInfo);
            }
        }

        this.logger.msg(msg, Msg.Err);
    }

    private getFileAndProject(args: protocol.FileRequestArgs): FileAndProject {
        return this.getFileAndProjectWorker(args.file, args.projectFileName);
    }

    private getFileAndLanguageServiceForSyntacticOperation(args: protocol.FileRequestArgs) {
        const { file, project } = this.getFileAndProject(args);
        return {
            file,
            languageService: project.getLanguageService(/*ensureSynchronized*/ false),
        };
    }

    private getProject(projectFileName: string | undefined): Project | undefined {
        return projectFileName === undefined ? undefined : this.projectService.findProject(projectFileName);
    }
    
    private getFileAndProjectWorker(uncheckedFileName: string, projectFileName: string | undefined): { file: NormalizedPath; project: Project; } {
        const file = toNormalizedPath(uncheckedFileName);
        const project = this.getProject(projectFileName) || this.projectService.ensureDefaultProjectForFile(file);
        return { file, project };
    }

    private getProjectInfo(args: protocol.ProjectInfoRequestArgs): protocol.ProjectInfo {
        return this.getProjectInfoWorker(args.file, args.projectFileName, args.needFileNameList, /*excludeConfigFiles*/ false);
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
            part.kind !== "linkName" ? part : {
                ...part,
                target: this.toFileSpan((part as JSDocLinkDisplayPart).target.fileName, (part as JSDocLinkDisplayPart).target.textSpan, project),
            }
        );
    }
        
    private updateOpenWorker(args: protocol.UpdateOpenRequestArgs) {
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

    private closeClientFile(fileName: string) {
        if (!fileName) {
            return;
        }
        const file = normalizePath(fileName);
        this.projectService.closeClientFile(file);
    }


    private change(args: protocol.ChangeRequestArgs) {
        const scriptInfo = this.projectService.getScriptInfo(args.file)!;
        Debug.assert(!!scriptInfo);
        // Because we are going to apply edits, its better to switch to svc now instead of computing line map
        scriptInfo.textStorage.switchToScriptVersionCache();
        const start = scriptInfo.lineOffsetToPosition(args.line, args.offset);
        const end = scriptInfo.lineOffsetToPosition(args.endLine, args.endOffset);

        scriptInfo.registerFileUpdate()

        if (start >= 0) {
            this.changeSeq++;
            this.projectService.applyChangesToFile(
                scriptInfo,
                singleIterator({
                    span: { start, length: end - start },
                    newText: args.insertString!, // TODO: GH#18217
                }),
            );
            
            // if this is an .h file, iterate over all the resolutions of this file
            // and increment their script info version. this should cause them
            // to get re-parsed when the new program is created.
            // TODO - there's probably a more efficient way to do this vs just testing for .h files.
            if (scriptInfo.fileName.endsWith(".h")) {
                const openFiles = this.projectService.openFiles;
                let count = 0;
                scriptInfo.containingProjects.forEach(project => {                                        
                    const resolutions = project.resolutionCache.resolvedFileToResolution.get(scriptInfo.path);                    
                    resolutions?.forEach(r => {
                        let incrementAllFiles = r.files?.size < 50;
                        r.files.forEach(p => { 
                            if (incrementAllFiles || openFiles.has(p)) {
                                this.projectService.getScriptInfoForPath(p)?.incrementVersion();                                
                                count++;
                            }
                        });                        
                    });                                        
                });                                
                // this.logger.msg(`Queued ${count} resolutions for reparse due to change in ${scriptInfo.fileName}`);
            }
        }
    }
    
    private getDiagnostics(next: NextStep, delay: number, fileNames: string[]): void {
        if (this.suppressDiagnosticEvents) {
            return;
        }

        if (fileNames.length > 0) {
            // mark files as needing parsing
            fileNames.map(fileName => {
                this.projectService.markFileForParsing(fileName);        
            });
            this.updateErrorCheck(next, fileNames, delay);
        }
    }

    private toPendingErrorCheck(uncheckedFileName: string): PendingErrorCheck | undefined {
        const fileName = toNormalizedPath(uncheckedFileName);
        const project = this.projectService.tryGetDefaultProjectForFile(fileName);
        return project && { fileName, project };
    }
        
    public setCompilerOptionsForInferredProjects(args: protocol.SetCompilerOptionsForInferredProjectsArgs): void {
        this.projectService.setCompilerOptionsForInferredProjects(args.options, args.projectRootPath);
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
            const diagnostics = [];
                        
            // Ensure the project is up to date before checking if this file is present in the project.
            updateProjectIfDirty(project);

            if (!project.containsFile(fileName, requireOpen)) {
                return;
            }
        

            const syntaxDiag = this.syntacticCheck(fileName, project);
            diagnostics.push(...syntaxDiag);
            
            if (this.changeSeq !== seq) {
                this.sendAllDiagnostics(diagnostics, fileName, project);
                return;
            }

            // Don't provide semantic diagnostics unless we're in full semantic mode.            
            if (project.projectService.serverMode !== LanguageServiceMode.Semantic) {
                this.sendAllDiagnostics(diagnostics, fileName, project);
                goNext();
                return;
            }
            next.immediate("semanticCheck", () => {
                // always run no matter what
                const semanticDiags = this.semanticCheck(fileName, project);
                // but only send if diagnostics are explicitly turned on
                if (project.getCompilerOptions()?.diagnostics) {
                    diagnostics.push(...semanticDiags);                    
                }

                if (this.changeSeq !== seq) {
                    this.sendAllDiagnostics(diagnostics, fileName, project);
                    return;
                }

                if (this.getPreferences(fileName).disableSuggestions) {
                    this.sendAllDiagnostics(diagnostics, fileName, project);
                    goNext();
                    return;
                }
                next.immediate("suggestionCheck", () => {
                    if (project.getCompilerOptions()?.diagnostics) {
                        diagnostics.push(...this.suggestionCheck(fileName, project));
                    }

                    next.immediate("sendAllDiags", ()=> {
                        this.sendAllDiagnostics(diagnostics, fileName, project);
                        goNext();
                    });                    
                });
            });
        };

        if (checkList.length > index && this.changeSeq === seq) {
            next.delay("checkOne", ms, checkOne);
        }
    }

    private sendAllDiagnostics(diagnostics: readonly Diagnostic[], fileName: NormalizedPath, project: Project): void {
        this.sendDiagnosticsEvent(fileName, project, diagnostics, "allDiag");
    }

    private semanticCheck(file: NormalizedPath, project: Project) {
        tracing?.push(tracing.Phase.Session, "semanticCheck", { file, configFilePath: (project as ConfiguredProject).canonicalConfigFilePath }); // undefined is fine if the cast fails
        // const diags = isDeclarationFileInJSOnlyNonConfiguredProject(project, file)
        //     ? emptyArray
        //     : project.getLanguageService().getSemanticDiagnostics(file).filter(d => !!d.file);        
        const diags = project.getLanguageService().getSemanticDiagnostics(file).filter(d => !!d.file);        
        this.sendDiagnosticsEvent(file, project, diags, "semanticDiag");
        tracing?.pop();
        return diags;
    }

    private syntacticCheck(file: NormalizedPath, project: Project) {
        tracing?.push(tracing.Phase.Session, "syntacticCheck", { file, configFilePath: (project as ConfiguredProject).canonicalConfigFilePath }); // undefined is fine if the cast fails
        const diagnostics = project.getLanguageService().getSyntacticDiagnostics(file);
        this.sendDiagnosticsEvent(file, project, diagnostics, "syntaxDiag");
        tracing?.pop();
        return diagnostics
    }

    private suggestionCheck(file: NormalizedPath, project: Project) {
        tracing?.push(tracing.Phase.Session, "suggestionCheck", { file, configFilePath: (project as ConfiguredProject).canonicalConfigFilePath }); // undefined is fine if the cast fails
        const diagnostics = project.getLanguageService().getSuggestionDiagnostics(file);
        this.sendDiagnosticsEvent(file, project, diagnostics, "suggestionDiag");
        tracing?.pop();
        return diagnostics;
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

    private getFormatOptions(file: NormalizedPath): FormatCodeSettings {
        return this.projectService.getFormatCodeOptions(file);
    }

    private getDocCommentTemplate(args: protocol.FileLocationRequestArgs) {
        const { file, languageService } = this.getFileAndLanguageServiceForSyntacticOperation(args);
        const position = this.getPositionInFile(args, file);
        return languageService.getDocCommentTemplateAtPosition(file, position, this.getPreferences(file), this.getFormatOptions(file));
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

    private getEncodedSemanticClassifications(args: protocol.EncodedSemanticClassificationsRequestArgs) {
        const { file, project } = this.getFileAndProject(args);
        if (!project.getCurrentProgram()) return;        
        // const format = args.format === "2020" ? SemanticClassificationFormat.TwentyTwenty : SemanticClassificationFormat.Original;
        if (this.projectService.markFileForParsing(file)) {
            project.markAsDirty();
        }
        return project.getLanguageService().getEncodedSemanticClassifications(file, args);
    } 

    private getSignatureHelpItems(args: protocol.SignatureHelpRequestArgs, simplifiedResult: boolean): protocol.SignatureHelpItems | SignatureHelpItems | undefined {
        const { file, project } = this.getFileAndProject(args);
        const scriptInfo = this.projectService.getScriptInfoForNormalizedPath(file)!;
        const position = this.getPosition(args, scriptInfo);
        const helpItems = project.getLanguageService().getSignatureHelpItems(file, position, args);
        const useDisplayParts = true;//!!this.getPreferences(file).displayPartsForJSDoc;
        if (helpItems && simplifiedResult) {
            const span = helpItems.applicableSpan;
            return {
                ...helpItems,
                applicableSpan: {
                    start: scriptInfo.positionToLineOffset(span.start),
                    end: scriptInfo.positionToLineOffset(span.start + span.length),
                },
                items: this.mapSignatureHelpItems(helpItems.items, project, useDisplayParts),
            };
        }
        else if (useDisplayParts || !helpItems) {
            return helpItems;
        }
        else {
            return {
                ...helpItems,
                items: helpItems.items.map(item => ({ ...item, tags: this.mapJSDocTagInfo(item.tags, project, /*richResponse*/ false) as JSDocTagInfo[] })),
            };
        }
    }

    private mapSignatureHelpItems(items: SignatureHelpItem[], project: Project, richResponse: boolean): protocol.SignatureHelpItem[] {
        return items.map(item => ({
            ...item,
            documentation: this.mapDisplayParts(item.documentation, project),
            parameters: item.parameters.map(p => ({ ...p, documentation: this.mapDisplayParts(p.documentation, project) })),
            tags: this.mapJSDocTagInfo(item.tags, project, richResponse),
        }));
    }
    
    private getQuickInfoWorker(args: protocol.FileLocationRequestArgs, simplifiedResult: boolean): protocol.QuickInfoResponseBody | QuickInfo | undefined {
        const { file, project } = this.getFileAndProject(args);
        const scriptInfo = this.projectService.getScriptInfoForNormalizedPath(file)!;        
        const quickInfo = project.getLanguageService().getQuickInfoAtPosition(file, this.getPosition(args, scriptInfo));
        if (!quickInfo) {
            return undefined;
        }                
        const useDisplayParts = true;//!!this.getPreferences(file).displayPartsForJSDoc;
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
        
        const options = project.getCompilerOptions();
        const driverType = options?.driverType == LanguageVariant.FluffOS ? "FluffOS" : "LDMud";

        const projectInfo = {
            configFileName: project.getProjectName(),
            languageServiceDisabled: !project.languageServiceEnabled,
            fileNames: needFileNameList ? project.getFileNames(/*excludeFilesFromExternalLibraries*/ false, excludeConfigFiles) : undefined,
            driverType
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

    private getPositionInFile(args: protocol.Location & { position?: number; }, file: NormalizedPath): number {
        const scriptInfo = this.projectService.getScriptInfoForNormalizedPath(file)!;
        return this.getPosition(args, scriptInfo);
    }

    private mapDefinitionInfoLocations(definitions: readonly DefinitionInfo[], project: Project): readonly DefinitionInfo[] {
        return definitions.map((info): DefinitionInfo => {
            const newDocumentSpan = getMappedDocumentSpanForProject(info, project);
            return !newDocumentSpan ? info : {
                ...newDocumentSpan,
                containerKind: info.containerKind,
                containerName: info.containerName,
                kind: info.kind,
                name: info.name,
                failedAliasResolution: info.failedAliasResolution,
                ...info.unverified && { unverified: info.unverified },
            };
        });
    }

    private toFileSpan(fileName: string, textSpan: TextSpan, project: Project): protocol.FileSpan {
        const ls = project.getLanguageService();
        const start = ls.toLineColumnOffset!(fileName, textSpan.start); // TODO: GH#18217
        const end = ls.toLineColumnOffset!(fileName, textSpanEnd(textSpan));

        return {
            file: fileName,
            start: { line: start.line + 1, offset: start.character + 1 },
            end: { line: end.line + 1, offset: end.character + 1 },
        };
    }

    private toFileSpanWithContext(fileName: string, textSpan: TextSpan, contextSpan: TextSpan | undefined, project: Project): protocol.FileSpanWithContext {
        const fileSpan = this.toFileSpan(fileName, textSpan, project);
        const context = contextSpan && this.toFileSpan(fileName, contextSpan, project);
        return context ?
            { ...fileSpan, contextStart: context.start, contextEnd: context.end } :
            fileSpan;
    }
    
    private mapDefinitionInfo(definitions: readonly DefinitionInfo[], project: Project): readonly protocol.DefinitionInfo[] {
        return definitions.map(def => ({ ...this.toFileSpanWithContext(def.fileName, def.textSpan, def.contextSpan, project), ...def.unverified && { unverified: def.unverified } }));
    }

    private getDefinition(args: protocol.FileLocationRequestArgs, simplifiedResult: boolean): readonly protocol.FileSpanWithContext[] | readonly DefinitionInfo[] {
        const { file, project } = this.getFileAndProject(args);
        const position = this.getPositionInFile(args, file);
        const definitions = this.mapDefinitionInfoLocations(project.getLanguageService().getDefinitionAtPosition(file, position) || emptyArray, project);
        return simplifiedResult ? this.mapDefinitionInfo(definitions, project) : definitions.map(Session.mapToOriginalLocation);
    }
    
    private toLocationNavigationTree(tree: NavigationTree, scriptInfo: ScriptInfo): protocol.NavigationTree {
        return {
            text: tree.text,
            kind: tree.kind,
            kindModifiers: tree.kindModifiers,
            spans: tree.spans.map(span => toProtocolTextSpan(span, scriptInfo)),
            nameSpan: tree.nameSpan && toProtocolTextSpan(tree.nameSpan, scriptInfo),
            childItems: map(tree.childItems, item => this.toLocationNavigationTree(item, scriptInfo)),
        };
    }
    
    private getNavigationTree(args: protocol.FileRequestArgs, simplifiedResult: boolean): protocol.NavigationTree | NavigationTree | undefined {
        const { file, languageService } = this.getFileAndLanguageServiceForSyntacticOperation(args);
        const tree = languageService.getNavigationTree(file);
        return !tree
            ? undefined
            : simplifiedResult
            ? this.toLocationNavigationTree(tree, this.projectService.getScriptInfoForNormalizedPath(file)!)
            : tree;
    }

    /*
     * When we map a .d.ts location to .ts, Visual Studio gets confused because there's no associated Roslyn Document in
     * the same project which corresponds to the file. VS Code has no problem with this, and luckily we have two protocols.
     * This retains the existing behavior for the "simplified" (VS Code) protocol but stores the .d.ts location in a
     * set of additional fields, and does the reverse for VS (store the .d.ts location where
     * it used to be and stores the .ts location in the additional fields).
     */
    private static mapToOriginalLocation<T extends DocumentSpan>(def: T): T {
        if (def.originalFileName) {
            Debug.assert(def.originalTextSpan !== undefined, "originalTextSpan should be present if originalFileName is");
            return {
                ...def as any,
                fileName: def.originalFileName,
                textSpan: def.originalTextSpan,
                targetFileName: def.fileName,
                targetTextSpan: def.textSpan,
                contextSpan: def.originalContextSpan,
                targetContextSpan: def.contextSpan,
            };
        }
        return def;
    }

    public getRenameLocations(args: protocol.RenameRequestArgs, simplifiedResult: boolean): protocol.RenameResponseBody | readonly RenameLocation[] {
        const file = toNormalizedPath(args.file);
        const position = this.getPositionInFile(args, file);
        const projects = this.getProjects(args);
        const defaultProject = this.getDefaultProject(args);
        const preferences = this.getPreferences(file);
        const renameInfo: protocol.RenameInfo = this.mapRenameInfo(
            defaultProject.getLanguageService().getRenameInfo(file, position, preferences),
            Debug.checkDefined(this.projectService.getScriptInfo(file)),
        );

        if (!renameInfo.canRename) return simplifiedResult ? { info: renameInfo, locs: [] } : [];

        const locations = getRenameLocationsWorker(
            projects,
            defaultProject,
            { fileName: args.file, pos: position },
            !!args.findInStrings,
            !!args.findInComments,
            preferences,
            this.host.useCaseSensitiveFileNames,
        );
        if (!simplifiedResult) return locations;
        return { info: renameInfo, locs: this.toSpanGroups(locations) };
    }
    
    private mapRenameInfo(info: RenameInfo, scriptInfo: ScriptInfo): protocol.RenameInfo {
        if (info.canRename) {
            const { canRename, fileToRename, displayName, fullDisplayName, kind, kindModifiers, triggerSpan } = info;
            return identity<protocol.RenameInfoSuccess>(
                { canRename, fileToRename, displayName, fullDisplayName, kind, kindModifiers, triggerSpan: toProtocolTextSpan(triggerSpan, scriptInfo) },
            );
        }
        else {
            return info as RenameInfoFailure;
        }
    }

    private toSpanGroups(locations: readonly RenameLocation[]): readonly protocol.SpanGroup[] {
        const map = new Map<string, protocol.SpanGroup>();
        for (const { fileName, textSpan, contextSpan, originalContextSpan: _2, originalTextSpan: _, originalFileName: _1, ...prefixSuffixText } of locations) {
            let group = map.get(fileName);
            if (!group) map.set(fileName, group = { file: fileName, locs: [] });
            const scriptInfo = Debug.checkDefined(this.projectService.getScriptInfo(fileName));
            group.locs.push({ ...toProtocolTextSpanWithContext(textSpan, contextSpan, scriptInfo), ...prefixSuffixText });
        }
        return arrayFrom(map.values());
    }

    private getProjects(args: protocol.FileRequestArgs, getScriptInfoEnsuringProjectsUptoDate?: boolean, ignoreNoProjectError?: boolean): Projects {
        let projects: readonly Project[] | undefined;
        let symLinkedProjects: MultiMap<Path, Project> | undefined;
        if (args.projectFileName) {
            const project = this.getProject(args.projectFileName);
            if (project) {
                projects = [project];
            }
        }
        else {
            const scriptInfo = getScriptInfoEnsuringProjectsUptoDate ?
                this.projectService.getScriptInfoEnsuringProjectsUptoDate(args.file) :
                this.projectService.getScriptInfo(args.file);
            if (!scriptInfo) {
                if (ignoreNoProjectError) return emptyArray;
                this.projectService.logErrorForScriptInfoNotFound(args.file);
                return Errors.ThrowNoProject();
            }
            else if (!getScriptInfoEnsuringProjectsUptoDate) {
                // Ensure there are containing projects are present
                this.projectService.ensureDefaultProjectForFile(scriptInfo);
            }
            projects = scriptInfo.containingProjects;
            symLinkedProjects = this.projectService.getSymlinkedProjects(scriptInfo);
        }
        // filter handles case when 'projects' is undefined
        projects = filter(projects, p => p.languageServiceEnabled && !p.isOrphan());
        if (!ignoreNoProjectError && (!projects || !projects.length) && !symLinkedProjects) {
            this.projectService.logErrorForScriptInfoNotFound(args.file ?? args.projectFileName);
            return Errors.ThrowNoProject();
        }
        return symLinkedProjects ? { projects: projects!, symLinkedProjects } : projects!; // TODO: GH#18217
    }
    
    private getDefaultProject(args: protocol.FileRequestArgs) {
        if (args.projectFileName) {
            const project = this.getProject(args.projectFileName);
            if (project) {
                return project;
            }
            if (!args.file) {
                return Errors.ThrowNoProject();
            }
        }
        const info = this.projectService.getScriptInfo(args.file)!;
        return info.getDefaultProject();
    }

    private getReferences(args: protocol.FileLocationRequestArgs, simplifiedResult: boolean): protocol.ReferencesResponseBody | readonly ReferencedSymbol[] {
        const file = toNormalizedPath(args.file);
        const projects = this.getProjects(args);
        const position = this.getPositionInFile(args, file);
        const references = getReferencesWorker(
            projects,
            this.getDefaultProject(args),
            { fileName: args.file, pos: position },
            this.host.useCaseSensitiveFileNames,
            this.logger,
        );

        if (!simplifiedResult) return references;

        const preferences = this.getPreferences(file);
        const defaultProject = this.getDefaultProject(args);
        const scriptInfo = defaultProject.getScriptInfoForNormalizedPath(file)!;
        const nameInfo = defaultProject.getLanguageService().getQuickInfoAtPosition(file, position);
        const symbolDisplayString = nameInfo ? displayPartsToString(nameInfo.displayParts) : "";
        const nameSpan = nameInfo && nameInfo.textSpan;
        const symbolStartOffset = nameSpan ? scriptInfo.positionToLineOffset(nameSpan.start).offset : 0;
        const symbolName = nameSpan ? scriptInfo.getSnapshot().getText(nameSpan.start, textSpanEnd(nameSpan)) : "";
        const refs: readonly protocol.ReferencesResponseItem[] = flatMap(references, referencedSymbol => {
            return referencedSymbol.references.map(entry => referenceEntryToReferencesResponseItem(this.projectService, entry, preferences));
        });
        return { refs, symbolName, symbolStartOffset, symbolDisplayString };
    }

    private getPreferences(file: NormalizedPath): UserPreferences {
        return this.projectService.getPreferences(file);
    }

    private getCompletions(args: protocol.CompletionsRequestArgs, kind: protocol.CommandTypes.CompletionInfo | protocol.CommandTypes.Completions | protocol.CommandTypes.CompletionsFull): WithMetadata<readonly protocol.CompletionEntry[]> | protocol.CompletionInfo | CompletionInfo | undefined {
        const { file, project } = this.getFileAndProject(args);
        const scriptInfo = this.projectService.getScriptInfoForNormalizedPath(file)!;
        const position = this.getPosition(args, scriptInfo);

        const completions = project.getLanguageService().getCompletionsAtPosition(
            file,
            position,
            {
                ...convertUserPreferences(this.getPreferences(file)),
                triggerCharacter: args.triggerCharacter,
                triggerKind: args.triggerKind,
                includeExternalModuleExports: args.includeExternalModuleExports,
                includeInsertTextCompletions: args.includeInsertTextCompletions,
            },
            project.projectService.getFormatCodeOptions(file),
        );
        if (completions === undefined) return undefined;

        if (kind === protocol.CommandTypes.CompletionsFull) return completions;

        const prefix = args.prefix || "";
        const entries = mapDefined<CompletionEntry, protocol.CompletionEntry>(completions.entries, entry => {
            if (completions.isMemberCompletion || (entry.name && startsWith(entry.name.toLowerCase(), prefix.toLowerCase()))) {
                const {
                    name,
                    kind,
                    kindModifiers,
                    sortText,
                    insertText,
                    filterText,
                    replacementSpan,
                    hasAction,
                    source,
                    sourceDisplay,
                    labelDetails,
                    isSnippet,
                    isRecommended,
                    isPackageJsonImport,
                    isImportStatementCompletion,
                    data,
                } = entry;
                const convertedSpan = replacementSpan ? toProtocolTextSpan(replacementSpan, scriptInfo) : undefined;
                // Use `hasAction || undefined` to avoid serializing `false`.
                return {
                    name,
                    kind,
                    kindModifiers,
                    sortText,
                    insertText,
                    filterText,
                    replacementSpan: convertedSpan,
                    isSnippet,
                    hasAction: hasAction || undefined,
                    source,
                    sourceDisplay,
                    labelDetails,
                    isRecommended,
                    isPackageJsonImport,
                    isImportStatementCompletion,
                    data,
                };
            }
        });

        if (kind === protocol.CommandTypes.Completions) {
            if (completions.metadata) (entries as WithMetadata<readonly protocol.CompletionEntry[]>).metadata = completions.metadata;
            return entries;
        }

        const res: protocol.CompletionInfo = {
            ...completions,
            optionalReplacementSpan: completions.optionalReplacementSpan && toProtocolTextSpan(completions.optionalReplacementSpan, scriptInfo),
            entries,
        };
        return res;
    }

    public getCompletionEntryDetails(args: protocol.CompletionDetailsRequestArgs, fullResult: boolean): readonly protocol.CompletionEntryDetails[] | readonly CompletionEntryDetails[] {
        const { file, project } = this.getFileAndProject(args);
        const scriptInfo = this.projectService.getScriptInfoForNormalizedPath(file)!;
        const position = this.getPosition(args, scriptInfo);
        const formattingOptions = project.projectService.getFormatCodeOptions(file);
        const useDisplayParts = true;// !!this.getPreferences(file).displayPartsForJSDoc;

        const result = mapDefined(args.entryNames, entryName => {
            const { name, source, data } = typeof entryName === "string" ? { name: entryName, source: undefined, data: undefined } : entryName;
            return project.getLanguageService().getCompletionEntryDetails(file, position, name, formattingOptions, source, this.getPreferences(file), data ? cast(data, isCompletionEntryData) : undefined);
        });
        return fullResult
            ? (useDisplayParts ? result : result.map(details => ({ ...details, tags: this.mapJSDocTagInfo(details.tags, project, /*richResponse*/ false) as JSDocTagInfo[] })))
            : result.map(details => ({
                ...details,
                codeActions: map(details.codeActions, action => this.mapCodeAction(action)),
                documentation: this.mapDisplayParts(details.documentation, project),
                tags: this.mapJSDocTagInfo(details.tags, project, useDisplayParts),
            }));
    }

    private mapCodeAction({ description, changes, commands }: CodeAction): protocol.CodeAction {
        return { description, changes: this.mapTextChangesToCodeEdits(changes), commands };
    }

    private mapTextChangesToCodeEdits(textChanges: readonly FileTextChanges[]): protocol.FileCodeEdits[] {
        return textChanges.map(change => this.mapTextChangeToCodeEdit(change));
    }

    private mapTextChangeToCodeEdit(textChanges: FileTextChanges): protocol.FileCodeEdits {
        const scriptInfo = this.projectService.getScriptInfoOrConfig(textChanges.fileName);
        if (!!textChanges.isNewFile === !!scriptInfo) {
            if (!scriptInfo) { // and !isNewFile
                this.projectService.logErrorForScriptInfoNotFound(textChanges.fileName);
            }
            Debug.fail("Expected isNewFile for (only) new files. " + JSON.stringify({ isNewFile: !!textChanges.isNewFile, hasScriptInfo: !!scriptInfo }));
        }
        return scriptInfo
            ? { fileName: textChanges.fileName, textChanges: textChanges.textChanges.map(textChange => convertTextChangeToCodeEdit(textChange, scriptInfo)) }
            : convertNewFileTextChangeToCodeEdit(textChanges);
    }

    private convertTextChangeToCodeEdit(change: TextChange, scriptInfo: ScriptInfo): protocol.CodeEdit {
        return {
            start: scriptInfo.positionToLineOffset(change.span.start),
            end: scriptInfo.positionToLineOffset(change.span.start + change.span.length),
            newText: change.newText ? change.newText : "",
        };
    }

    private requiredResponse(response: {} | undefined): HandlerResponse {
        return { response, responseRequired: true };
    }

    private notRequired(): HandlerResponse {
        return { responseRequired: false };
    }
    
    private handlers = new Map(Object.entries<(request: any) => HandlerResponse>({ // TODO(jakebailey): correctly type the handlers
        [protocol.CommandTypes.Change]: (request: protocol.ChangeRequest) => {
            this.change(request.arguments);
            return this.notRequired();
        },
        [protocol.CommandTypes.Close]: (request: protocol.Request) => {
            const closeArgs = request.arguments as protocol.FileRequestArgs;
            this.closeClientFile(closeArgs.file);
            return this.notRequired();
        },
        [protocol.CommandTypes.Open]: (request: protocol.OpenRequest) => {
            this.openClientFile(
                toNormalizedPath(request.arguments.file),
                request.arguments.fileContent,
                convertScriptKindName(request.arguments.scriptKindName!), // TODO: GH#18217
                request.arguments.projectRootPath ? toNormalizedPath(request.arguments.projectRootPath) : undefined,
            );
            return this.notRequired();
        },
        [protocol.CommandTypes.UpdateOpen]: (request: protocol.UpdateOpenRequest) => {
            const response = this.updateOpenWorker(request.arguments);
            return this.requiredResponse(/*response*/ response);            
        }, 
        [protocol.CommandTypes.Geterr]: (request: protocol.GeterrRequest) => {
            this.errorCheck.startNew(next => this.getDiagnostics(next, request.arguments.delay, request.arguments.files));
            return this.notRequired();
        },
        [protocol.CommandTypes.CompletionInfo]: (request: protocol.CompletionsRequest) => {
            return this.requiredResponse(this.getCompletions(request.arguments, protocol.CommandTypes.CompletionInfo));
        },
        [protocol.CommandTypes.CompletionDetails]: (request: protocol.CompletionDetailsRequest) => {
            return this.requiredResponse(this.getCompletionEntryDetails(request.arguments, /*fullResult*/ false));
        },
        [protocol.CommandTypes.Definition]: (request: protocol.DefinitionRequest) => {
            return this.requiredResponse(this.getDefinition(request.arguments, /*simplifiedResult*/ true));
        },
        [protocol.CommandTypes.SignatureHelp]: (request: protocol.SignatureHelpRequest) => {
            return this.requiredResponse(this.getSignatureHelpItems(request.arguments, /*simplifiedResult*/ true));
        },
        [protocol.CommandTypes.Quickinfo]: (request: protocol.QuickInfoRequest) => {
            return this.requiredResponse(this.getQuickInfoWorker(request.arguments, /*simplifiedResult*/ true));
        },
        [protocol.CommandTypes.EncodedSemanticClassificationsFull]: (request: protocol.EncodedSemanticClassificationsRequest) => {
            return this.requiredResponse(this.getEncodedSemanticClassifications(request.arguments));
        },
        [protocol.CommandTypes.ProjectInfo]: (request: protocol.ProjectInfoRequest) => {
            return this.requiredResponse(this.getProjectInfo(request.arguments));
        },
        [protocol.CommandTypes.DocCommentTemplate]: (request: protocol.DocCommentTemplateRequest) => {
            return this.requiredResponse(this.getDocCommentTemplate(request.arguments));
        },
        [protocol.CommandTypes.References]: (request: protocol.FileLocationRequest) => {
            return this.requiredResponse(this.getReferences(request.arguments, /*simplifiedResult*/ true));
        },
        [protocol.CommandTypes.NavTree]: (request: protocol.FileRequest) => {
            return this.requiredResponse(this.getNavigationTree(request.arguments, /*simplifiedResult*/ true));
        },
    }));

    public executeCommand(request: protocol.Request): HandlerResponse {
        const handler = this.handlers.get(request.command);
        if (handler) {
            const response = this.executeWithRequestId(request.seq, () => handler(request));
            // this.projectService.enableRequestedPlugins();
            return response;
        }
        else {
            this.logger.msg(`Unrecognized JSON command:${stringifyIndented(request)}`, Msg.Err);
            // this.doOutput(/*info*/ undefined, protocol.CommandTypes.Unknown, request.seq, /*success*/ false, `Unrecognized JSON command: ${request.command}`);
            return { responseRequired: false };
        }
    }

    protected toStringMessage(message: TMessage): string {
        return message as any as string;
    }

    public onMessage(request: protocol.Request) {
        this.gcTimer.scheduleCollect();
        this.performanceData = undefined;

        let start: [number, number] | undefined;
        if (this.logger.hasLevel(LogLevel.requestTime)) {
            start = this.hrtime();
            if (this.logger.hasLevel(LogLevel.verbose)) {
                this.logger.info(`request:${stringifyIndented(request)}`);
            }
        }

        let relevantFile: protocol.FileRequestArgs | undefined;
        try {
            relevantFile = request.arguments && (request as protocol.FileRequest).arguments.file ? (request as protocol.FileRequest).arguments : undefined;

            tracing?.instant(tracing.Phase.Session, "request", { seq: request.seq, command: request.command });
            perfLogger?.logStartCommand("" + request.command, JSON.stringify(request).substring(0, 100));

            tracing?.push(tracing.Phase.Session, "executeCommand", { seq: request.seq, command: request.command }, /*separateBeginAndEnd*/ true);
            const { response, responseRequired } = this.executeCommand(request);
            tracing?.pop();

            if (this.logger.hasLevel(LogLevel.requestTime)) {
                const elapsedTime = hrTimeToMilliseconds(this.hrtime(start)).toFixed(4);
                if (responseRequired) {
                    this.logger.perftrc(`${request.seq}::${request.command}: elapsed time (in milliseconds) ${elapsedTime}`);
                }
                else {
                    this.logger.perftrc(`${request.seq}::${request.command}: async elapsed time (in milliseconds) ${elapsedTime}`);
                }
            }

            // Note: Log before writing the response, else the editor can complete its activity before the server does
            perfLogger?.logStopCommand("" + request.command, "Success");
            tracing?.instant(tracing.Phase.Session, "response", { seq: request.seq, command: request.command, success: !!response });
            if (response) {
                return response;//this.doOutput(response, request.command, request.seq, /*success*/ true);
            }
            else if (responseRequired) {
                return undefined;
                // this.doOutput(/*info*/ undefined, request.command, request.seq, /*success*/ false, "No content available.");
            }
        }
        catch (err) {
            // Cancellation or an error may have left incomplete events on the tracing stack.
            tracing?.popAll();

            if (err instanceof OperationCanceledException) {
                // Handle cancellation exceptions
                perfLogger?.logStopCommand("" + (request && request.command), "Canceled: " + err);
                tracing?.instant(tracing.Phase.Session, "commandCanceled", { seq: request?.seq, command: request?.command });
                return undefined;//this.doOutput({ canceled: true }, request!.command, request!.seq, /*success*/ true);
                // return;
            }

            this.logErrorWorker(err, JSON.stringify(request), relevantFile);
            perfLogger?.logStopCommand("" + (request && request.command), "Error: " + err);
            tracing?.instant(tracing.Phase.Session, "commandError", { seq: request?.seq, command: request?.command, message: (err as Error).message });

            return undefined;//
            // this.doOutput(
            //     /*info*/ undefined,
            //     request ? request.command : protocol.CommandTypes.Unknown,
            //     request ? request.seq : 0,
            //     /*success*/ false,
            //     "Error processing request. " + (err as StackTraceError).message + "\n" + (err as StackTraceError).stack,
            // );
        }
    }
}

export interface HandlerResponse {
    response?: {};
    responseRequired?: boolean;
}


function convertTextChangeToCodeEdit(change: TextChange, scriptInfo: ScriptInfoOrConfig): protocol.CodeEdit {
    return { start: positionToLineOffset(scriptInfo, change.span.start), end: positionToLineOffset(scriptInfo, textSpanEnd(change.span)), newText: change.newText };
}

function positionToLineOffset(info: ScriptInfoOrConfig, position: number): protocol.Location {
    return isConfigFile(info) ? locationFromLineAndCharacter(info.getLineAndCharacterOfPosition(position)) : info.positionToLineOffset(position);
}

function locationFromLineAndCharacter(lc: LineAndCharacter): protocol.Location {
    return { line: lc.line + 1, offset: lc.character + 1 };
}

function convertNewFileTextChangeToCodeEdit(textChanges: FileTextChanges): protocol.FileCodeEdits {
    Debug.assert(textChanges.textChanges.length === 1);
    const change = first(textChanges.textChanges);
    Debug.assert(change.span.start === 0 && change.span.length === 0);
    return { fileName: textChanges.fileName, textChanges: [{ start: { line: 0, offset: 0 }, end: { line: 0, offset: 0 }, newText: change.newText }] };
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

function getProjectKey(project: Project) {
    return isConfiguredProject(project) ? project.canonicalConfigFilePath : project.getProjectName();
}

function documentSpanLocation({ fileName, textSpan }: DocumentSpan): DocumentPosition {
    return { fileName, pos: textSpan.start };
}


function getMappedLocationForProject(location: DocumentPosition, project: Project): DocumentPosition | undefined {
    return getMappedLocation(location, project.getSourceMapper(), p => project.projectService.fileExists(p as NormalizedPath));
}

function getMappedDocumentSpanForProject(documentSpan: DocumentSpan, project: Project): DocumentSpan | undefined {
    return getMappedDocumentSpan(documentSpan, project.getSourceMapper(), p => project.projectService.fileExists(p as NormalizedPath));
}

function getMappedContextSpanForProject(documentSpan: DocumentSpan, project: Project): TextSpan | undefined {
    return getMappedContextSpan(documentSpan, project.getSourceMapper(), p => project.projectService.fileExists(p as NormalizedPath));
}

function toProtocolTextSpan(textSpan: TextSpan, scriptInfo: ScriptInfo): protocol.TextSpan {
    return {
        start: scriptInfo.positionToLineOffset(textSpan.start),
        end: scriptInfo.positionToLineOffset(textSpanEnd(textSpan)),
    };
}

interface ProjectAndLocation {
    readonly project: Project;
    readonly location: DocumentPosition;
}

function forEachProjectInProjects(projects: Projects, path: string | undefined, cb: (project: Project, path: string | undefined) => void): void {
    for (const project of isArray(projects) ? projects : projects.projects) {
        cb(project, path);
    }
    if (!isArray(projects) && projects.symLinkedProjects) {
        projects.symLinkedProjects.forEach((symlinkedProjects, symlinkedPath) => {
            for (const project of symlinkedProjects) {
                cb(project, symlinkedPath);
            }
        });
    }
}

function getDefinitionLocation(defaultProject: Project, initialLocation: DocumentPosition, isForRename: boolean): DocumentPosition | undefined {
    const infos = defaultProject.getLanguageService().getDefinitionAtPosition(initialLocation.fileName, initialLocation.pos, /*searchOtherFilesOnly*/ false, /*stopAtAlias*/ isForRename);
    const info = infos && firstOrUndefined(infos);
    // Note that the value of `isLocal` may depend on whether or not the checker has run on the containing file
    // (implying that FAR cascading behavior may depend on request order)
    return info && !info.isLocal ? { fileName: info.fileName, pos: info.textSpan.start } : undefined;
}

function isLocationProjectReferenceRedirect(project: Project, location: DocumentPosition | undefined) {
    if (!location) return false;
    const program = project.getLanguageService().getProgram();
    if (!program) return false;
    const sourceFile = program.getSourceFile(location.fileName);

    // It is possible that location is attached to project but
    // the program actually includes its redirect instead.
    // This happens when rootFile in project is one of the file from referenced project
    // Thus root is attached but program doesnt have the actual .ts file but .d.ts
    // If this is not the file we were actually looking, return rest of the toDo
    return !!sourceFile &&
        sourceFile.resolvedPath !== sourceFile.path &&
        sourceFile.resolvedPath !== project.toPath(location.fileName);
}

/**
 * @param projects Projects initially known to contain {@link initialLocation}
 * @param defaultProject The default project containing {@link initialLocation}
 * @param initialLocation Where the search operation was triggered
 * @param getResultsForPosition This is where you plug in `findReferences`, `renameLocation`, etc
 * @param forPositionInResult Given an item returned by {@link getResultsForPosition} enumerate the positions referred to by that result
 * @returns In the common case where there's only one project, returns an array of results from {@link getResultsForPosition}.
 * If multiple projects were searched - even if they didn't return results - the result will be a map from project to per-project results.
 */
function getPerProjectReferences<TResult>(
    projects: Projects,
    defaultProject: Project,
    initialLocation: DocumentPosition,
    isForRename: boolean,
    getResultsForPosition: (project: Project, location: DocumentPosition) => readonly TResult[] | undefined,
    forPositionInResult: (result: TResult, cb: (location: DocumentPosition) => void) => void,
): readonly TResult[] | Map<Project, readonly TResult[]> {
    // If `getResultsForPosition` returns results for a project, they go in here
    const resultsMap = new Map<Project, readonly TResult[]>();

    const queue = createQueue<ProjectAndLocation>();

    // In order to get accurate isDefinition values for `defaultProject`,
    // we need to ensure that it is searched from `initialLocation`.
    // The easiest way to do this is to search it first.
    queue.enqueue({ project: defaultProject, location: initialLocation });

    // This will queue `defaultProject` a second time, but it will be dropped
    // as a dup when it is dequeued.
    forEachProjectInProjects(projects, initialLocation.fileName, (project, path) => {
        const location = { fileName: path!, pos: initialLocation.pos };
        queue.enqueue({ project, location });
    });

    const projectService = defaultProject.projectService;
    const cancellationToken = defaultProject.getCancellationToken();

    const defaultDefinition = getDefinitionLocation(defaultProject, initialLocation, isForRename);

    // Don't call these unless !!defaultDefinition
    const getGeneratedDefinition = memoize(() =>
        defaultProject.isSourceOfProjectReferenceRedirect(defaultDefinition!.fileName) ?
            defaultDefinition :
            defaultProject.getLanguageService().getSourceMapper().tryGetGeneratedPosition(defaultDefinition!)
    );
    const getSourceDefinition = memoize(() =>
        defaultProject.isSourceOfProjectReferenceRedirect(defaultDefinition!.fileName) ?
            defaultDefinition :
            defaultProject.getLanguageService().getSourceMapper().tryGetSourcePosition(defaultDefinition!)
    );

    // The keys of resultsMap allow us to check which projects have already been searched, but we also
    // maintain a set of strings because that's what `loadAncestorProjectTree` wants.
    const searchedProjectKeys = new Set<string>();

    onCancellation:
    while (!queue.isEmpty()) {
        while (!queue.isEmpty()) {
            if (cancellationToken.isCancellationRequested()) break onCancellation;

            const { project, location } = queue.dequeue();

            if (resultsMap.has(project)) continue;
            if (isLocationProjectReferenceRedirect(project, location)) continue;

            // The project could be dirty and could no longer contain the location's file after it's updated,
            // so we need to update the project and check if it still contains the file.
            updateProjectIfDirty(project);
            if (!project.containsFile(toNormalizedPath(location.fileName))) {
                continue;
            }
            searchUnparsedProjectFiles(project, location);
            const projectResults = searchPosition(project, location);            
            resultsMap.set(project, projectResults ?? emptyArray);
            searchedProjectKeys.add(getProjectKey(project));
        }

        // At this point, we know about all projects passed in as arguments and any projects in which
        // `getResultsForPosition` has returned results.  We expand that set to include any projects
        // downstream from any of these and then queue new initial-position searches for any new project
        // containing `initialLocation`.
        if (defaultDefinition) {
            // This seems to mean "load all projects downstream from any member of `seenProjects`".
            projectService.loadAncestorProjectTree(searchedProjectKeys);
            projectService.forEachEnabledProject(project => {
                if (cancellationToken.isCancellationRequested()) return; // There's no mechanism for skipping the remaining projects
                if (resultsMap.has(project)) return; // Can loop forever without this (enqueue here, dequeue above, repeat)
                const location = mapDefinitionInProject(defaultDefinition, project, getGeneratedDefinition, getSourceDefinition);
                if (location) {
                    queue.enqueue({ project, location });
                }
            });
        }
    }

    // In the common case where there's only one project, return a simpler result to make
    // it easier for the caller to skip post-processing.
    if (resultsMap.size === 1) {
        return firstIterator(resultsMap.values());
    }

    return resultsMap;
    
    /**
     * search unparsed project files (via readfile) for instances of the symbol
     * and mark them for parsing
     * @param project 
     * @param location 
     * @returns 
     */
    function searchUnparsedProjectFiles(project: Project, location: DocumentPosition): void {
        // get the sourcefile for this location & the node at current position
        const program = project.getLanguageService().getCurrentProgram();
        const sourceFile = program.getSourceFile(location.fileName);        
        const node = sourceFile && getTouchingPropertyName(sourceFile, location.pos);
        const symbol = program.getTypeChecker().getSymbolAtLocation(node);

        // check the declaration - if it is in the same sourcefile and its parent is not the sourcefile
        // the all refs are within this file and we don't need to do a global search
        const declaration = firstOrUndefined(symbol?.declarations);
        if (declaration?.getSourceFile() === sourceFile && !isSourceFile(declaration.parent)) return;
                
        // loop through root files - for any that are not parseable,
        // load the contents from disk and look for the string "name"
        const name = symbol.getName();
        const parseableFiles = project.getParseableFiles();
        const rootFiles = project.getRootFiles();
        forEach(rootFiles, rootFile => {
            const rootFilePath = project.toPath(rootFile);
            if (!parseableFiles.has(rootFilePath)) {
                const text = project.readFile(rootFile);
                if (text && text.indexOf(name) !== -1) {
                    // mark it for parsing, which will get picked up when sync worker is called
                    projectService.markFileForParsing(rootFile);
                    project.markAsDirty();
                    //return { fileName: rootFilePath, pos: text.indexOf(name) };
                }
            }
        });
    }

    function searchPosition(project: Project, location: DocumentPosition): readonly TResult[] | undefined {
        const projectResults =  getResultsForPosition(project, location);
        if (!projectResults) return undefined;

        for (const result of projectResults) {
            forPositionInResult(result, position => {
                // This may trigger a search for a tsconfig, but there are several layers of caching that make it inexpensive
                const originalLocation = projectService.getOriginalLocationEnsuringConfiguredProject(project, position);
                if (!originalLocation) return;

                const originalScriptInfo = projectService.getScriptInfo(originalLocation.fileName)!;

                for (const project of originalScriptInfo.containingProjects) {
                    if (!project.isOrphan() && !resultsMap.has(project)) { // Optimization: don't enqueue if will be discarded
                        queue.enqueue({ project, location: originalLocation });
                    }
                }

                const symlinkedProjectsMap = projectService.getSymlinkedProjects(originalScriptInfo);
                if (symlinkedProjectsMap) {
                    symlinkedProjectsMap.forEach((symlinkedProjects, symlinkedPath) => {
                        for (const symlinkedProject of symlinkedProjects) {
                            if (!symlinkedProject.isOrphan() && !resultsMap.has(symlinkedProject)) { // Optimization: don't enqueue if will be discarded
                                queue.enqueue({ project: symlinkedProject, location: { fileName: symlinkedPath as string, pos: originalLocation.pos } });
                            }
                        }
                    });
                }
            });
        }

        return projectResults;
    }
}

function getReferencesWorker(
    projects: Projects,
    defaultProject: Project,
    initialLocation: DocumentPosition,
    useCaseSensitiveFileNames: boolean,
    logger: Logger,
): readonly ReferencedSymbol[] {
    const perProjectResults = getPerProjectReferences(
        projects,
        defaultProject,
        initialLocation,
        /*isForRename*/ false,
        (project, position) => {
            logger.info(`Finding references to ${position.fileName} position ${position.pos} in project ${project.getProjectName()}`);
            return project.getLanguageService().findReferences(position.fileName, position.pos);
        },
        (referencedSymbol, cb) => {
            cb(documentSpanLocation(referencedSymbol.definition));
            for (const ref of referencedSymbol.references) {
                cb(documentSpanLocation(ref));
            }
        },
    );

    // No re-mapping or isDefinition updatses are required if there's exactly one project
    if (isArray(perProjectResults)) {
        return perProjectResults;
    }

    // `isDefinition` is only (definitely) correct in `defaultProject` because we might
    // have started the other project searches from related symbols.  Propagate the
    // correct results to all other projects.

    const defaultProjectResults = perProjectResults.get(defaultProject);
    if (defaultProjectResults?.[0]?.references[0]?.isDefinition === undefined) {
        // Clear all isDefinition properties
        perProjectResults.forEach(projectResults => {
            for (const referencedSymbol of projectResults) {
                for (const ref of referencedSymbol.references) {
                    delete ref.isDefinition;
                }
            }
        });
    }
    else {
        // Correct isDefinition properties from projects other than defaultProject
        const knownSymbolSpans = createDocumentSpanSet(useCaseSensitiveFileNames);
        for (const referencedSymbol of defaultProjectResults) {
            for (const ref of referencedSymbol.references) {
                if (ref.isDefinition) {
                    knownSymbolSpans.add(ref);
                    // One is enough - updateIsDefinitionOfReferencedSymbols will fill out the set based on symbols
                    break;
                }
            }
        }

        const updatedProjects = new Set<Project>();
        while (true) {
            let progress = false;
            perProjectResults.forEach((referencedSymbols, project) => {
                if (updatedProjects.has(project)) return;
                const updated = project.getLanguageService().updateIsDefinitionOfReferencedSymbols(referencedSymbols, knownSymbolSpans);
                if (updated) {
                    updatedProjects.add(project);
                    progress = true;
                }
            });
            if (!progress) break;
        }

        perProjectResults.forEach((referencedSymbols, project) => {
            if (updatedProjects.has(project)) return;
            for (const referencedSymbol of referencedSymbols) {
                for (const ref of referencedSymbol.references) {
                    ref.isDefinition = false;
                }
            }
        });
    }

    // We need to de-duplicate and aggregate the results by choosing an authoritative version
    // of each definition and merging references from all the projects where they appear.

    const results: ReferencedSymbol[] = [];
    const seenRefs = createDocumentSpanSet(useCaseSensitiveFileNames); // It doesn't make sense to have a reference in two definition lists, so we de-dup globally

    // TODO: We might end up with a more logical allocation of refs to defs if we pre-sorted the defs by descending ref-count.
    // Otherwise, it just ends up attached to the first corresponding def we happen to process.  The others may or may not be
    // dropped later when we check for defs with ref-count 0.
    perProjectResults.forEach((projectResults, project) => {
        for (const referencedSymbol of projectResults) {
            const mappedDefinitionFile = getMappedLocationForProject(documentSpanLocation(referencedSymbol.definition), project);
            const definition: ReferencedSymbolDefinitionInfo = mappedDefinitionFile === undefined ?
                referencedSymbol.definition :
                {
                    ...referencedSymbol.definition,
                    textSpan: createTextSpan(mappedDefinitionFile.pos, referencedSymbol.definition.textSpan.length), // Why would the length be the same in the original?
                    fileName: mappedDefinitionFile.fileName,
                    contextSpan: getMappedContextSpanForProject(referencedSymbol.definition, project),
                };

            let symbolToAddTo = find(results, o => documentSpansEqual(o.definition, definition, useCaseSensitiveFileNames));
            if (!symbolToAddTo) {
                symbolToAddTo = { definition, references: [] };
                results.push(symbolToAddTo);
            }

            for (const ref of referencedSymbol.references) {
                if (!seenRefs.has(ref) && !getMappedLocationForProject(documentSpanLocation(ref), project)) {
                    seenRefs.add(ref);
                    symbolToAddTo.references.push(ref);
                }
            }
        }
    });

    return results.filter(o => o.references.length !== 0);
}

function toProtocolTextSpanWithContext(span: TextSpan, contextSpan: TextSpan | undefined, scriptInfo: ScriptInfo): protocol.TextSpanWithContext {
    const textSpan = toProtocolTextSpan(span, scriptInfo);
    const contextTextSpan = contextSpan && toProtocolTextSpan(contextSpan, scriptInfo);
    return contextTextSpan ?
        { ...textSpan, contextStart: contextTextSpan.start, contextEnd: contextTextSpan.end } :
        textSpan;
}

function getLineText(scriptInfo: ScriptInfo, span: protocol.TextSpanWithContext) {
    const lineSpan = scriptInfo.lineToTextSpan(span.start.line - 1);
    return scriptInfo.getSnapshot().getText(lineSpan.start, textSpanEnd(lineSpan)).replace(/\r|\n/g, "");
}

function referenceEntryToReferencesResponseItem(projectService: ProjectService, { fileName, textSpan, contextSpan, isWriteAccess, isDefinition }: ReferencedSymbolEntry, { disableLineTextInReferences }: UserPreferences): protocol.ReferencesResponseItem {
    const scriptInfo = Debug.checkDefined(projectService.getScriptInfo(fileName));
    const span = toProtocolTextSpanWithContext(textSpan, contextSpan, scriptInfo);
    const lineText = disableLineTextInReferences ? undefined : getLineText(scriptInfo, span);
    return {
        file: fileName,
        ...span,
        lineText,
        isWriteAccess,
        isDefinition,
    };
}

function mapDefinitionInProject(
    definition: DocumentPosition,
    project: Project,
    getGeneratedDefinition: () => DocumentPosition | undefined,
    getSourceDefinition: () => DocumentPosition | undefined,
): DocumentPosition | undefined {
    // If the definition is actually from the project, definition is correct as is
    if (
        project.containsFile(toNormalizedPath(definition.fileName)) &&
        !isLocationProjectReferenceRedirect(project, definition)
    ) {
        return definition;
    }
    const generatedDefinition = getGeneratedDefinition();
    if (generatedDefinition && project.containsFile(toNormalizedPath(generatedDefinition.fileName))) return generatedDefinition;
    const sourceDefinition = getSourceDefinition();
    return sourceDefinition && project.containsFile(toNormalizedPath(sourceDefinition.fileName)) ? sourceDefinition : undefined;
}

function createDocumentSpanSet(useCaseSensitiveFileNames: boolean): Set<DocumentSpan> {
    return createSet(({ textSpan }) => textSpan.start + 100003 * textSpan.length, getDocumentSpansEqualityComparer(useCaseSensitiveFileNames));
}

function getRenameLocationsWorker(
    projects: Projects,
    defaultProject: Project,
    initialLocation: DocumentPosition,
    findInStrings: boolean,
    findInComments: boolean,
    preferences: UserPreferences,
    useCaseSensitiveFileNames: boolean,
): readonly RenameLocation[] {
    const perProjectResults = getPerProjectReferences(
        projects,
        defaultProject,
        initialLocation,
        /*isForRename*/ true,
        (project, position) => project.getLanguageService().findRenameLocations(position.fileName, position.pos, findInStrings, findInComments, preferences),
        (renameLocation, cb) => cb(documentSpanLocation(renameLocation)),
    );

    // No filtering or dedup'ing is required if there's exactly one project
    if (isArray(perProjectResults)) {
        return perProjectResults;
    }

    const results: RenameLocation[] = [];
    const seen = createDocumentSpanSet(useCaseSensitiveFileNames);

    perProjectResults.forEach((projectResults, project) => {
        for (const result of projectResults) {
            // If there's a mapped location, it'll appear in the results for another project
            if (!seen.has(result) && !getMappedLocationForProject(documentSpanLocation(result), project)) {
                results.push(result);
                seen.add(result);
            }
        }
    });

    return results;
}

function isCompletionEntryData(data: any): data is CompletionEntryData {
    return data === undefined || data && typeof data === "object"
            && typeof data.exportName === "string"
            && (data.fileName === undefined || typeof data.fileName === "string")
            && (data.ambientModuleName === undefined || typeof data.ambientModuleName === "string"
                    && (data.isPackageJsonImport === undefined || typeof data.isPackageJsonImport === "boolean"));
}

/** @internal */
export type ScriptInfoOrConfig = ScriptInfo | LpcConfigSourceFile;
/** @internal */
export function isConfigFile(config: ScriptInfoOrConfig): config is LpcConfigSourceFile {
    return (config as LpcConfigSourceFile).kind !== undefined;
}

function hrTimeToMilliseconds(time: [number, number]): number {
    const seconds = time[0];
    const nanoseconds = time[1];
    return ((1e9 * seconds) + nanoseconds) / 1000000.0;
}

const invalidPartialSemanticModeCommands: readonly protocol.CommandTypes[] = [
    protocol.CommandTypes.OpenExternalProject,
    protocol.CommandTypes.OpenExternalProjects,
    protocol.CommandTypes.CloseExternalProject,
    protocol.CommandTypes.SynchronizeProjectList,
    protocol.CommandTypes.EmitOutput,
    protocol.CommandTypes.CompileOnSaveAffectedFileList,
    protocol.CommandTypes.CompileOnSaveEmitFile,
    protocol.CommandTypes.CompilerOptionsDiagnosticsFull,
    protocol.CommandTypes.EncodedSemanticClassificationsFull,
    protocol.CommandTypes.SemanticDiagnosticsSync,
    protocol.CommandTypes.SuggestionDiagnosticsSync,
    protocol.CommandTypes.GeterrForProject,
    protocol.CommandTypes.Reload,
    protocol.CommandTypes.ReloadProjects,
    protocol.CommandTypes.GetCodeFixes,
    protocol.CommandTypes.GetCodeFixesFull,
    protocol.CommandTypes.GetCombinedCodeFix,
    protocol.CommandTypes.GetCombinedCodeFixFull,
    protocol.CommandTypes.ApplyCodeActionCommand,
    protocol.CommandTypes.GetSupportedCodeFixes,
    protocol.CommandTypes.GetApplicableRefactors,
    protocol.CommandTypes.GetMoveToRefactoringFileSuggestions,
    protocol.CommandTypes.GetEditsForRefactor,
    protocol.CommandTypes.GetEditsForRefactorFull,
    protocol.CommandTypes.OrganizeImports,
    protocol.CommandTypes.OrganizeImportsFull,
    protocol.CommandTypes.GetEditsForFileRename,
    protocol.CommandTypes.GetEditsForFileRenameFull,
    protocol.CommandTypes.PrepareCallHierarchy,
    protocol.CommandTypes.ProvideCallHierarchyIncomingCalls,
    protocol.CommandTypes.ProvideCallHierarchyOutgoingCalls,
    protocol.CommandTypes.GetPasteEdits,
];

const invalidSyntacticModeCommands: readonly protocol.CommandTypes[] = [
    ...invalidPartialSemanticModeCommands,
    protocol.CommandTypes.Definition,
    protocol.CommandTypes.DefinitionFull,
    protocol.CommandTypes.DefinitionAndBoundSpan,
    protocol.CommandTypes.DefinitionAndBoundSpanFull,
    protocol.CommandTypes.TypeDefinition,
    protocol.CommandTypes.Implementation,
    protocol.CommandTypes.ImplementationFull,
    protocol.CommandTypes.References,
    protocol.CommandTypes.ReferencesFull,
    protocol.CommandTypes.Rename,
    protocol.CommandTypes.RenameLocationsFull,
    protocol.CommandTypes.RenameInfoFull,
    protocol.CommandTypes.Quickinfo,
    protocol.CommandTypes.QuickinfoFull,
    protocol.CommandTypes.CompletionInfo,
    protocol.CommandTypes.Completions,
    protocol.CommandTypes.CompletionsFull,
    protocol.CommandTypes.CompletionDetails,
    protocol.CommandTypes.CompletionDetailsFull,
    protocol.CommandTypes.SignatureHelp,
    protocol.CommandTypes.SignatureHelpFull,
    protocol.CommandTypes.Navto,
    protocol.CommandTypes.NavtoFull,
    protocol.CommandTypes.DocumentHighlights,
    protocol.CommandTypes.DocumentHighlightsFull,
];