// The following definitions provide the minimum compatible support for the Web Performance User Timings API
// between browsers and NodeJS:

import { isNodeLikeSystem } from "./_namespaces/lpc";

/** @internal */
export interface PerformanceHooks {
    shouldWriteNativeEvents: boolean;
    performance?: Performance;
    performanceTime?: PerformanceTime;
}

/** @internal */
export interface PerformanceTime {
    now(): number;
    timeOrigin: number;
}

/** @internal */
export interface Performance extends PerformanceTime {
    mark(name: string): void;
    measure(name: string, startMark?: string, endMark?: string): void;
    clearMeasures(name?: string): void;
    clearMarks(name?: string): void;
}

// Browser globals for the Web Performance User Timings API
declare const performance: Performance | undefined;


function tryGetPerformance() {
    if (isNodeLikeSystem()) {
        try {
            // By default, only write native events when generating a cpu profile or using the v8 profiler.
            const { performance } = require("perf_hooks") as typeof import("perf_hooks");
            return {
                shouldWriteNativeEvents: false,
                performance,
            };
        }
        catch {
            // ignore errors
        }
    }

    if (typeof performance === "object") {
        // For now we always write native performance events when running in the browser. We may
        // make this conditional in the future if we find that native web performance hooks
        // in the browser also slow down compilation.
        return {
            shouldWriteNativeEvents: true,
            performance,
        };
    }

    return undefined;
}

function tryGetPerformanceHooks(): PerformanceHooks | undefined {
    const p = tryGetPerformance();
    if (!p) return undefined;
    const { shouldWriteNativeEvents, performance } = p;

    const hooks: PerformanceHooks = {
        shouldWriteNativeEvents,
        performance: undefined,
        performanceTime: undefined,
    };

    if (typeof performance.timeOrigin === "number" && typeof performance.now === "function") {
        hooks.performanceTime = performance;
    }

    if (
        hooks.performanceTime &&
        typeof performance.mark === "function" &&
        typeof performance.measure === "function" &&
        typeof performance.clearMarks === "function" &&
        typeof performance.clearMeasures === "function"
    ) {
        hooks.performance = performance;
    }

    return hooks;
}

const nativePerformanceHooks = tryGetPerformanceHooks();
const nativePerformanceTime = nativePerformanceHooks?.performanceTime;

/** @internal */
export function tryGetNativePerformanceHooks() {
    return nativePerformanceHooks;
}

/**
 * Gets a timestamp with (at least) ms resolution
 *
 * @internal
 */
export const timestamp = !!nativePerformanceTime ? () => nativePerformanceTime.now() ?? Date.now() : Date.now;


