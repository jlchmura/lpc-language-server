import { LanguageServiceMode, QuickInfo, ScriptKind } from "./_namespaces/lpc";
import { GcTimer, Logger, NormalizedPath, ProjectService, ProjectServiceEventHandler, ProjectServiceOptions, ServerHost, toNormalizedPath } from "./_namespaces/lpc.server";
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
            session: this       
        };
        this.projectService = new ProjectService(settings);
        //this.projectService.setPerformanceEventHandler(this.performanceEventHandler.bind(this));
        this.gcTimer = new GcTimer(this.host, /*delay*/ 7000, this.logger);
    }

    /**
     * @param fileName is the name of the file to be opened
     * @param fileContent is a version of the file content that is known to be more up to date than the one on disk
     */
    private openClientFile(fileName: NormalizedPath, fileContent?: string, scriptKind?: ScriptKind, projectRootPath?: NormalizedPath) {
        this.projectService.openClientFileWithNormalizedPath(fileName, fileContent, scriptKind, /*hasMixedContent*/ false, projectRootPath);
    }

    public openFile(request: any) {
        this.openClientFile(
            toNormalizedPath(request.arguments.file),
            request.arguments.fileContent,
            ScriptKind.LPC,
            //convertScriptKindName(request.arguments.scriptKindName!), // TODO: GH#18217
            request.arguments.projectRootPath ? toNormalizedPath(request.arguments.projectRootPath) : undefined,
        );
        return request;
        //return this.notRequired(request);
    }

    private getQuickInfoWorker(args: protocol.FileLocationRequestArgs, simplifiedResult: boolean): protocol.QuickInfoResponseBody | QuickInfo | undefined {
        return undefined;
        //const { file, project } = this.getFileAndProject(args);
        //const scriptInfo = this.projectService.getScriptInfoForNormalizedPath(file)!;
        // const quickInfo = project.getLanguageService().getQuickInfoAtPosition(file, this.getPosition(args, scriptInfo));
        // if (!quickInfo) {
        //     return undefined;
        // }

        // const useDisplayParts = !!this.getPreferences(file).displayPartsForJSDoc;
        // if (simplifiedResult) {
        //     const displayString = displayPartsToString(quickInfo.displayParts);
        //     return {
        //         kind: quickInfo.kind,
        //         kindModifiers: quickInfo.kindModifiers,
        //         start: scriptInfo.positionToLineOffset(quickInfo.textSpan.start),
        //         end: scriptInfo.positionToLineOffset(textSpanEnd(quickInfo.textSpan)),
        //         displayString,
        //         documentation: useDisplayParts ? this.mapDisplayParts(quickInfo.documentation, project) : displayPartsToString(quickInfo.documentation),
        //         tags: this.mapJSDocTagInfo(quickInfo.tags, project, useDisplayParts),
        //     };
        // }
        // else {
        //     return useDisplayParts ? quickInfo : {
        //         ...quickInfo,
        //         tags: this.mapJSDocTagInfo(quickInfo.tags, project, /*richResponse*/ false) as JSDocTagInfo[],
        //     };
        // }
    }

}