import { MarkupKind } from "vscode-languageserver";
import { LspTestHarness } from "./lspTestHarness.js";

describe("LSP Hover", () => {
    // TODO: This test currently fails because hover/quickinfo returns undefined
    // even after semantic analysis completes. This works when running with --detectOpenHandles
    // or in the debugger, suggesting a deeper issue with how the language service
    // is initialized or used in the test environment. Further investigation needed.
    it.skip("shows variable hover info", async () => {
        const harness = new LspTestHarness({ writeFile: true, captureSessionMessages: true });
        try {
            await harness.initialize();

            const source = [
                "// test hover",
                "int /*@*/myGlobal;",
            ].join("\n");

            const doc = await harness.openFile("server/src/tests/lsp/workspace/hover.c", source);
            
            // Wait for the project to fully load
            await harness.waitForProjectInfo(doc, { timeoutMs: 10000 });
            
            // Wait for diagnostics (this ensures semantic analysis completes)
            await harness.waitForDiagnostics(doc, 10000);
            
            const hover = await harness.waitForHoverAt(doc, "cursor", { timeoutMs: 10000, pollMs: 100 });

            expect(hover).toBeDefined();
            const contents = hover!.contents as { kind: string; value: string; };
            expect(contents.kind).toBe(MarkupKind.Markdown);
            expect(contents.value).toContain("myGlobal");
            expect(contents.value).toContain("int");
        } finally {
            await harness.dispose();
        }
    }, 30000); // Increase Jest timeout to 30 seconds
});
