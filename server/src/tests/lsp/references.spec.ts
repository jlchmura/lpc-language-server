import { LspTestHarness } from "./lspTestHarness.js";

describe("LSP Find References", () => {
    const referenceCases = [
        {
            name: "global variable",
            file: "server/src/tests/lsp/workspace/references-global.c",
            source: [
                "// test references",
                "int /*@def*/myGlobal;",
                "",
                "void useIt() {",
                "    /*@ref1*/myGlobal = 1;",
                "    int local = myGlobal;",
                "}",
            ].join("\n"),
            defMarker: "def",
            refMarkers: ["ref1"],
        },
        {
            name: "function",
            file: "server/src/tests/lsp/workspace/references-function.c",
            source: [
                "// test references",
                "void /*@def*/doThing(int arg) {",
                "    return;",
                "}",
                "",
                "void callIt() {",
                "    /*@ref1*/doThing(1);",
                "    doThing(2);",
                "}",
            ].join("\n"),
            defMarker: "def",
            refMarkers: ["ref1"],
        },
    ];

    async function runReferenceCase(testCase: typeof referenceCases[number]) {
        const harness = new LspTestHarness();
        try {
            await harness.initialize();
            const doc = await harness.openFile(testCase.file, testCase.source);
            await harness.waitForProjectInfo(doc, { timeoutMs: 10000 });
            await harness.waitForDiagnostics(doc, 10000);

            const position = harness.positionOf(doc, testCase.defMarker);
            const locations = await harness.references(doc.uri, position, true);

            expect(locations).toBeDefined();
            const refs = locations ?? [];
            for (const marker of testCase.refMarkers) {
                const expected = harness.positionOf(doc, marker);
                const hit = refs.some(ref =>
                    ref.uri === doc.uri &&
                    ref.range.start.line === expected.line &&
                    ref.range.start.character === expected.character
                );
                expect(hit).toBe(true);
            }
        } finally {
            await harness.dispose();
        }
    }

    for (const testCase of referenceCases) {
        it(`finds references for ${testCase.name}`, async () => {
            await runReferenceCase(testCase);
        }, 30000);
    }
});
