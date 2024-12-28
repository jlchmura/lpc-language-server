import { combinePaths, CompilerOptions, EmitHost, FileSystemEntries, find, forEach, getSourceFilePathInNewDirWorker, removeFileExtension, sys } from "./_namespaces/lpc";
import { Logger, LogLevel, NormalizedPath, ServerHost, toNormalizedPath } from "./_namespaces/lpc.server";

/** @internal */
export class ThrottledOperations {
    private readonly pendingTimeouts = new Map<string, any>();
    private readonly logger?: Logger | undefined;
    constructor(private readonly host: ServerHost, logger: Logger) {
        this.logger = logger.hasLevel(LogLevel.verbose) ? logger : undefined;
    }

    /**
     * Wait `number` milliseconds and then invoke `cb`.  If, while waiting, schedule
     * is called again with the same `operationId`, cancel this operation in favor
     * of the new one.  (Note that the amount of time the canceled operation had been
     * waiting does not affect the amount of time that the new operation waits.)
     */
    public schedule(operationId: string, delay: number, cb: () => void) {
        const pendingTimeout = this.pendingTimeouts.get(operationId);
        if (pendingTimeout) {
            // another operation was already scheduled for this id - cancel it
            this.host.clearTimeout(pendingTimeout);
        }
        // schedule new operation, pass arguments
        this.pendingTimeouts.set(operationId, this.host.setTimeout(ThrottledOperations.run, delay, operationId, this, cb));
        if (this.logger) {
            this.logger.info(`Scheduled: ${operationId}${pendingTimeout ? ", Cancelled earlier one" : ""}`);
        }
    }

    public cancel(operationId: string) {
        const pendingTimeout = this.pendingTimeouts.get(operationId);
        if (!pendingTimeout) return false;
        this.host.clearTimeout(pendingTimeout);
        return this.pendingTimeouts.delete(operationId);
    }

    private static run(operationId: string, self: ThrottledOperations, cb: () => void) {
        self.pendingTimeouts.delete(operationId);
        if (self.logger) {
            self.logger.info(`Running: ${operationId}`);
        }
        cb();
    }
}


/** @internal */
export class GcTimer {
    private timerId: any;
    constructor(private readonly host: ServerHost, private readonly delay: number, private readonly logger: Logger) {
    }

    public scheduleCollect() {
        if (!this.host.gc || this.timerId !== undefined) {
            // no global.gc or collection was already scheduled - skip this request
            return;
        }
        this.timerId = this.host.setTimeout(GcTimer.run, this.delay, this);
    }

    private static run(self: GcTimer) {
        self.timerId = undefined;

        const log = self.logger.hasLevel(LogLevel.requestTime);
        const before = log && self.host.getMemoryUsage!(); // TODO: GH#18217

        self.host.gc!(); // TODO: GH#18217
        if (log) {
            const after = self.host.getMemoryUsage!(); // TODO: GH#18217
            self.logger.perftrc(`GC::before ${before}, after ${after}`);
        }
    }
}

/** 
 * Searches for a file named "lpc-config.json" in the given directory and its ancestors.
 * @internal 
 * @returns undefined if lpc-config is not found
 */
export function findLpcConfig(projectRootPath: string, getFileSystemEntries: (path: string) => FileSystemEntries): NormalizedPath | undefined {
    let config: string|undefined = undefined;
    
    function visitDirectory(path: string, depth: number | undefined, ) {
        const { files, directories } = getFileSystemEntries(path);
        config ??= find(files, f => f === "lpc-config.json");
        if (!config) {
            forEach(directories, (directory) => {
                visitDirectory(combinePaths(path, directory), depth === undefined ? undefined : depth + 1);
                return !!config;
            });
        } else {
            config = combinePaths(path, config);
        }
    }

    visitDirectory(projectRootPath, 0);

    return config ? toNormalizedPath(config) : undefined;
}

/** 
 * @internal 
 * @remarks was in jsTypings
 */
export function nowString() {
    // E.g. "12:34:56.789"
    const d = new Date();
    return `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}:${d.getSeconds().toString().padStart(2, "0")}.${d.getMilliseconds().toString().padStart(3, "0")}`;
}

const indentStr = "\n    ";

/** @internal */
export function indent(str: string): string {
    return indentStr + str.replace(/\n/g, indentStr);
}

/**
 * Put stringified JSON on the next line, indented.
 *
 * @internal
 */
export function stringifyIndented(json: {}): string {
    return indent(JSON.stringify(json, undefined, 2));
}
