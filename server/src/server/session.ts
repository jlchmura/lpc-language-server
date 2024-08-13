import { arrayReverseIterator, Debug, displayPartsToString, isRootedDiskPath, JSDocTagInfo, LanguageServiceMode, mapDefinedIterator, mapIterator, QuickInfo, ScriptKind, SymbolDisplayPart, textSpanEnd } from "./_namespaces/lpc";
import { ChangeFileArguments, GcTimer, Logger, NormalizedPath, OpenFileArguments, Project, ProjectService, ProjectServiceEventHandler, ProjectServiceOptions, ScriptInfo, ServerHost, toNormalizedPath } from "./_namespaces/lpc.server";
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
    // private errorCheck: MultistepOperation;

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
        //this.projectService.setPerformanceEventHandler(this.performanceEventHandler.bind(this));
        this.gcTimer = new GcTimer(this.host, /*delay*/ 7000, this.logger);
    }
    
    private getFileAndProject(args: protocol.FileRequestArgs): FileAndProject {
        return this.getFileAndProjectWorker(args.file, args.projectFileName);
    }

    private getProject(projectFileName: string | undefined): Project | undefined {
        return projectFileName === undefined ? undefined : this.projectService.findProject(projectFileName);
    }
    
    private getFileAndProjectWorker(uncheckedFileName: string, projectFileName: string | undefined): { file: NormalizedPath; project: Project; } {
        const file = toNormalizedPath(uncheckedFileName);
        const project = this.getProject(projectFileName);
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
