import { Debug, timestamp } from "./_namespaces/lpc";
import * as performance from "./_namespaces/lpc.performance";

/** @internal */
export let tracing: typeof tracingEnabled | undefined;

export namespace tracingEnabled {
    type Mode = "project" | "build" | "server";
    let mode:Mode;

    let fs: typeof import("fs");
    let traceCount = 0;
    let traceFd = 0;

    export const enum Phase {
        Parse = "parse",
        Program = "program",
        Bind = "bind",
        Check = "check", // Before we get into checking types (e.g. checkSourceFile)
        CheckTypes = "checkTypes",
        Emit = "emit",
        Session = "session",
    }

    const eventStack: { phase: Phase; name: string; args?: Args; time: number; separateBeginAndEnd: boolean; }[] = [];

    // The actual constraint is that JSON.stringify be able to serialize it without throwing.
    interface Args {
        [key: string]: string | number | boolean | null | undefined | Args | readonly (string | number | boolean | null | undefined | Args)[]; // eslint-disable-line no-restricted-syntax
    }
    
    /**
     * @param separateBeginAndEnd - used for special cases where we need the trace point even if the event
     * never terminates (typically for reducing a scenario too big to trace to one that can be completed).
     * In the future we might implement an exit handler to dump unfinished events which would deprecate
     * these operations.
     */
    export function push(phase: Phase, name: string, args?: Args, separateBeginAndEnd = false) {}

    export function pop(results?: Args) {
        Debug.assert(eventStack.length > 0);
        writeStackEvent(eventStack.length - 1, 1000 * timestamp(), results);
        eventStack.length--;
    }

    // sample every 10ms
    const sampleInterval = 1000 * 10;
    function writeStackEvent(index: number, endTime: number, results?: Args) {
        const { phase, name, args, time, separateBeginAndEnd } = eventStack[index];
        if (separateBeginAndEnd) {
            Debug.assert(!results, "`results` are not supported for events with `separateBeginAndEnd`");
            writeEvent("E", phase, name, args, /*extras*/ undefined, endTime);
        }
        // test if [time,endTime) straddles a sampling point
        else if (sampleInterval - (time % sampleInterval) <= endTime - time) {
            writeEvent("X", phase, name, { ...args, results }, `"dur":${endTime - time}`, time);
        }
    }

    function writeEvent(eventType: string, phase: Phase, name: string, args: Args | undefined, extras?: string, time: number = 1000 * timestamp()) {
        // In server mode, there's no easy way to dump type information, so we drop events that would require it.
        if (mode === "server" && phase === Phase.CheckTypes) return;

        performance.mark("beginTracing");
        fs.writeSync(traceFd, `,\n{"pid":1,"tid":1,"ph":"${eventType}","cat":"${phase}","ts":${time},"name":"${name}"`);
        if (extras) fs.writeSync(traceFd, `,${extras}`);
        if (args) fs.writeSync(traceFd, `,"args":${JSON.stringify(args)}`);
        fs.writeSync(traceFd, `}`);
        performance.mark("endTracing");
        performance.measure("Tracing", "beginTracing", "endTracing");
    }
}