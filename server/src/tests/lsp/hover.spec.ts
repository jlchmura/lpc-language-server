import { MarkupKind } from "vscode-languageserver";
import { LspTestHarness } from "./lspTestHarness.js";

describe("LSP Hover", () => {
    const hoverCases = [
        {
            name: "global variable",
            file: "server/src/tests/lsp/workspace/hover-global.c",
            source: [
                "// test hover",
                "int /*@*/myGlobal;",
            ].join("\n"),
            marker: "cursor",
            expected: ["myGlobal", "int"],
        },
        {
            name: "local variable",
            file: "server/src/tests/lsp/workspace/hover-local.c",
            source: [
                "// test hover",
                "void testLocal() {",
                "    int /*@*/localValue = 1;",
                "}",
            ].join("\n"),
            marker: "cursor",
            expected: ["localValue", "int"],
        },
        {
            name: "function declaration",
            file: "server/src/tests/lsp/workspace/hover-function.c",
            source: [
                "// test hover",
                "void /*@*/doThing(int arg) {",
                "    return;",
                "}",
                "",
                "void callIt() {",
                "    doThing(1);",
                "}",
            ].join("\n"),
            marker: "cursor",
            expected: ["doThing", "function"],
        },
        {
            name: "function parameter",
            file: "server/src/tests/lsp/workspace/hover-parameter.c",
            source: [
                "// test hover",
                "void takesParam(int param) {",
                "    int value = /*@*/param;",
                "}",
            ].join("\n"),
            marker: "cursor",
            expected: ["param", "int"],
        },
    ];

    async function runHoverCase(testCase: typeof hoverCases[number]) {
        const harness = new LspTestHarness();
        try {
            await harness.initialize();
            const doc = await harness.openFile(testCase.file, testCase.source);
            await harness.waitForProjectInfo(doc, { timeoutMs: 10000 });
            await harness.waitForDiagnostics(doc, 10000);
            const hover = await harness.waitForHoverAt(doc, testCase.marker, { timeoutMs: 10000, pollMs: 100 });

            expect(hover).toBeDefined();
            const contents = hover!.contents as { kind: string; value: string; };
            expect(contents.kind).toBe(MarkupKind.Markdown);
            for (const token of testCase.expected) {
                expect(contents.value).toContain(token);
            }
        } finally {
            await harness.dispose();
        }
    }

    for (const testCase of hoverCases) {
        it(`shows hover for ${testCase.name}`, async () => {
            await runHoverCase(testCase);
        }, 30000);
    }
});
