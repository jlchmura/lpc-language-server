import { FileWatcher, WatchFileKind, WatchOptions } from "./_namespaces/lpc.js";

/** @internal */
export function getFallbackOptions(options: WatchOptions | undefined): WatchOptions {
    const fallbackPolling = options?.fallbackPolling;
    return {
        watchFile: fallbackPolling !== undefined ?
            fallbackPolling as unknown as WatchFileKind :
            WatchFileKind.PriorityPollingInterval,
    };
}

/** @internal */
export function closeFileWatcherOf<T extends { watcher: FileWatcher; }>(objWithWatcher: T) {
    objWithWatcher.watcher.close();
}
