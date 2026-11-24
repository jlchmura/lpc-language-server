import * as lpc from "./_namespaces/lpc.js";

/**
 * `Debug` is a TypeScript namespace with mutable exports (`export let isDebugging`), which
 * other modules assign (`sys.ts` sets `Debug.isDebugging = true` under a debugger). Code
 * inside the namespace must see those writes. Oxc, Vite 8's TypeScript transform, compiles
 * such exports into locals that never see outside writes, so the test setup sends this file
 * through esbuild instead (see vitest.config.mts); this guards that.
 */
describe("Debug namespace mutable exports", () => {
    afterEach(() => {
        lpc.Debug.isDebugging = false;
    });

    it("sees an outside write to isDebugging from inside the namespace", () => {
        lpc.Debug.isDebugging = true;
        const mapper = lpc.Debug.attachDebugPrototypeIfDebug({} as lpc.TypeMapper);
        expect(Object.getPrototypeOf(mapper)).not.toBe(Object.prototype);
    });

    it("leaves the mapper alone when not debugging", () => {
        const mapper = lpc.Debug.attachDebugPrototypeIfDebug({} as lpc.TypeMapper);
        expect(Object.getPrototypeOf(mapper)).toBe(Object.prototype);
    });
});
