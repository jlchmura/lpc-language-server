import * as lpc from "./_namespaces/lpc.js";
import * as lpcNode from "../lpcserver/nodeServer.js";
import * as path from "path";

describe("Compiler", () => {

    const root = process.cwd();
    const basePath = path.join(root, "/server/src/tests/cases/compiler");
    let testFiles: string[] | undefined;

    function enumerateFiles(folder: string, regex?: RegExp, options?: { recursive: boolean; }): string[] {
        return lpc.map(lpc.listFiles(folder, regex, { recursive: (options ? options.recursive : false) }), lpc.normalizeSlashes);
    }

    it(`Should be in a node-like system`, () => {
        expect(lpc.isNodeLikeSystem()).toBeTruthy();
    });

    beforeAll(() => {
        
    });

    testFiles = enumerateFiles(basePath, /\.c$/);
    console.info(`Got ${testFiles.length} test files in ${basePath}`);

    testFiles.forEach(testCaseFile => {
        describe(testCaseFile, () => {                        
            // const testCase = lpc.sys.readFile(testCaseFile);
                        
            const serverHost = lpc.sys as lpc.server.ServerHost;
            const cancelToken = lpc.server.nullCancellationToken;
            const logger = new lpcNode.Logger(undefined, false, lpc.server.LogLevel.normal);
            const session = new lpc.server.Session({ 
                host: serverHost, 
                cancellationToken: cancelToken,
                byteLength: Buffer.byteLength,
                useSingleInferredProject: false,
                useInferredProjectPerProjectRoot: false,
                logger,
                canUseEvents: true,
                hrtime: process.hrtime,
                projectRootFolder: basePath,
            });

            session.updateOpen({
                openFiles: [{ file: testCaseFile }],
            });

            const diags = session.getSemanticDiagnosticsSync({file: testCaseFile });

            it(`Correct errors for ${testCaseFile}`, () => {
                expect(diags.length).toBe(0);
            });
        });
    });
    
});