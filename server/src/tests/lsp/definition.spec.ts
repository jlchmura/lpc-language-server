import { LspTestHarness } from "./lspTestHarness.js";

describe("LSP Go To Definition", () => {
    const definitionCases = [
        {
            name: "function call",
            file: "server/src/tests/lsp/workspace/definition-function.c",
            source: [
                "// test definition",
                "void /*@def*/doThing(int arg) {",
                "    return;",
                "}",
                "",
                "void callIt() {",
                "    /*@ref*/doThing(1);",
                "}",
            ].join("\n"),
            refMarker: "ref",
            defMarker: "def",
        },
        {
            name: "global variable",
            file: "server/src/tests/lsp/workspace/definition-global.c",
            source: [
                "// test definition",
                "int /*@def*/myGlobal;",
                "",
                "void useIt() {",
                "    /*@ref*/myGlobal = 1;",
                "}",
            ].join("\n"),
            refMarker: "ref",
            defMarker: "def",
        },
    ];

    async function runDefinitionCase(testCase: typeof definitionCases[number]) {
        const harness = new LspTestHarness({ writeFile: true, useTempWorkspace: true });
        try {
            await harness.initialize();
            const doc = await harness.openFile(testCase.file, testCase.source);
            await harness.waitForProjectInfo(doc, { timeoutMs: 10000 });
            await harness.waitForDiagnostics(doc, 10000);

            const reference = harness.positionOf(doc, testCase.refMarker);
            const expected = harness.positionOf(doc, testCase.defMarker);
            const locations = await harness.definition(doc.uri, reference);

            expect(locations).toBeDefined();
            expect(locations!.length).toBeGreaterThan(0);

            const first = locations![0];
            if ("targetUri" in first) {
                expect(first.targetUri).toBe(doc.uri);
                expect(first.targetRange.start.line).toBe(expected.line);
                expect(first.targetRange.start.character).toBe(expected.character);
            } else {
                expect(first.uri).toBe(doc.uri);
                expect(first.range.start.line).toBe(expected.line);
                expect(first.range.start.character).toBe(expected.character);
            }
        } finally {
            await harness.dispose();
        }
    }

    for (const testCase of definitionCases) {
        it(`resolves definition for ${testCase.name}`, async () => {
            await runDefinitionCase(testCase);
        }, 30000);
    }
});
