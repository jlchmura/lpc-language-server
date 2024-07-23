import { QuickInfo } from "./_namespaces/lpc";
import { GcTimer, Logger, ServerHost } from "./_namespaces/lpc.server";
import * as protocol from "./protocol.js";

export interface HostCancellationToken {
    isCancellationRequested(): boolean;
}

export interface ServerCancellationToken extends HostCancellationToken {
    setRequest(requestId: number): void;
    resetRequest(requestId: number): void;
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