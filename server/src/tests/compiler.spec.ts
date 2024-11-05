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
            // setup options & hosts
            const compilerOptions: lpc.CompilerOptions = {
                driverType: lpc.LanguageVariant.LDMud,
            };

            const compilerHost = lpc.createCompilerHost(compilerOptions);
            compilerHost.getDefaultLibFileName = () => lpc.combinePaths(root, lpc.getDefaultLibFileName(compilerOptions));

            const createProgramOptions: lpc.CreateProgramOptions = {
                host: compilerHost,
                rootNames: [testCaseFile],
                options: compilerOptions,                
                oldProgram: undefined,                
            };
                        
            // create program and get file we are trying to compile
            const program = lpc.createProgram(createProgramOptions);
            const file = program.getSourceFile(testCaseFile);

            // run semantic diags
            const semanticDiags = program.getSemanticDiagnostics(file);
            
            // combine and validate
            const diags = file.parseDiagnostics.concat(semanticDiags);
            it(`Correct errors for ${testCaseFile}`, () => {
                expect(diags.length).toBe(0);
            });
        });
    });
    
});