import * as path from "path";
import { LpcFacade } from "../backend/facade";
import { resolveTestFilePath } from "./test-utils";
import { VariableSymbol } from "../symbols/variableSymbol";

const baseDir = path.join(process.cwd(), "server/src/tests/test-assets/");

describe("facade", () => {
    let facade: LpcFacade;

    beforeEach(() => {
        facade = new LpcFacade(baseDir, undefined);
    });

    it("Should instantiate a new facade", () => {
        expect(facade).toBeDefined();
    });

    describe("Loading", () => {
        it("should load a file", () => {
            const ctx = facade.loadLpc(resolveTestFilePath("ldmud.c"));
            expect(ctx).toBeDefined();
        });

        it("shoudl return undefined if file does not exist", () => {
            const ctx = facade.loadLpc(resolveTestFilePath("does-not-exist.c"));
            expect(ctx).toBeUndefined();
        });

        it("should get a cached context entry", () => {
            const fn = resolveTestFilePath("ldmud.c");
            const ctx = facade.loadLpc(fn);
            const ctx2 = facade.getContext(fn);
            expect(ctx2).toEqual(ctx);
        });
    });

    it("should reparse", () => {
        const fn = resolveTestFilePath("ldmud.c");
        const ctx = facade.loadLpc(fn);
        const ctx2 = facade.reparse(fn);
    });

    it("should get top level symbols", async () => {
        const fn = resolveTestFilePath("ldmud.c");
        const ctx = facade.loadLpc(fn);
        const symbols = await facade.listTopLevelSymbols(fn, false);
        expect(symbols).toBeDefined();
    });

    it("should return a symbol for a position", () => {
        const fn = resolveTestFilePath("ldmud.c");
        const ctx = facade.loadLpc(fn);
        const symbol = facade.symbolContainingPosition(fn, {
            line: 63,
            character: 10,
        });
        expect(symbol).toBeDefined();
        expect(symbol).toBeInstanceOf(VariableSymbol);
        expect(symbol.name).toBe("map2");
    });

    it("should return a context entry", () => {
        const fn = resolveTestFilePath("ldmud.c");
        const ctx = facade.loadLpc(fn);
        const ctx2 = facade.getContextEntry(fn);
        expect(ctx2).toBeDefined();
        expect(ctx2.filename).toEqual(fn);
    });

    it("should indicate if a context is not loaded", () => {
        const fn = resolveTestFilePath("ldmud.c");

        expect(facade.isContextLoaded(fn)).toBeFalsy();

        const ctx = facade.loadLpc(fn);
        expect(facade.isContextLoaded(fn)).toBeTruthy();
    });

    it("should return diagnostics", async () => {
        const fn = resolveTestFilePath("ldmud.c");
        const ctx = facade.loadLpc(fn);
        const diags = await facade.getDiagnostics(fn);
        expect(diags).toBeDefined();
    });

    it("should report parser errors as diagnostics", async () => {
        const fn = resolveTestFilePath("parser-error.c");
        const ctx = facade.loadLpc(fn);
        const diags = await facade.getDiagnostics(fn);
        expect(diags?.length).toBeGreaterThan(0);
    });

    it("should identify inherited files", () => {
        const fn = resolveTestFilePath("ldmud.c");
        const ctx = facade.loadLpc(fn);
        const entry = facade.getContextEntry(fn);

        expect(entry.dependencies.length).toBeGreaterThan(0);
        const fnInh = resolveTestFilePath("obj.c");
        const ctxInh = facade.getContextEntry(fnInh);
        expect(ctxInh).toBeDefined();
        expect(ctxInh.refCount).toBeGreaterThanOrEqual(1);
    });
});
