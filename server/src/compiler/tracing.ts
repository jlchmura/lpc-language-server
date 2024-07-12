
/** @internal */
export let tracing: typeof tracingEnabled | undefined;

export namespace tracingEnabled {
    type Mode = "project" | "build" | "server";
    let mode:Mode;
}