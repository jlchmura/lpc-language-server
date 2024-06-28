import * as path from "path";
import { LpcFacade } from "../backend/facade";
import { SourceContext } from "../backend/SourceContext";
import { resolveTestFilePath } from "./test-utils";

const baseDir = path.join(process.cwd(), "server/src/tests/test-assets/");

describe("SourceContext", () => {
    let facade: LpcFacade;
    let ctx: SourceContext;

    beforeEach(() => {
        facade = new LpcFacade(baseDir, undefined);
    });

    describe("general", () => {
        beforeEach(() => {
            ctx = facade.loadLpc(resolveTestFilePath("ldmud.c"));
        });

        it("Should get a source context", () => {
            expect(ctx).toBeDefined();
        });

        it("should mark if diagnostics are done", async () => {
            expect(ctx.needsValidation).toBe(true);
            await ctx.getDiagnostics();
            expect(ctx.needsValidation).toBe(false);
        });

        it("should indicate if there are errors", async () => {
            const ctx2 = facade.loadLpc(resolveTestFilePath("parser-error.c"));
            await ctx2.getDiagnostics();
            expect(ctx2.hasErrors).toBe(true);

            const ctx3 = facade.loadLpc(resolveTestFilePath("obj.c"));
            await ctx3.getDiagnostics();
            expect(ctx3.hasErrors).toBe(false);
        });

        describe("symbol at position", () => {
            it("should return a symbol at a position", () => {
                const sym = ctx.symbolAtPosition(12, 34, true);
                expect(sym?.length).toBeGreaterThan(0);
            });

            it("should find macros", () => {
                const symMacro = ctx.symbolAtPosition(15, 97, false);
                expect(symMacro?.length).toBeGreaterThan(0);
            });

            it("should find inherits", () => {
                const sym = ctx.symbolAtPosition(11, 31, true);
                expect(sym?.length).toBeGreaterThan(0);
            });

            it("should find includes", () => {
                const sym = ctx.symbolAtPosition(13, 5, true);
                expect(sym?.length).toBeGreaterThan(0);
            });

            it("should find funcion definitions", () => {
                const sym = ctx.symbolAtPosition(6, 142, true);
                expect(sym?.length).toBeGreaterThan(0);
            });
        });
    });

    describe("code completion", () => {
        it("should provide code completion results", async () => {
            const result = await ctx.getCodeCompletionCandidates(20, 116);
            expect(result?.length).toBeDefined();
        });
    });
});
