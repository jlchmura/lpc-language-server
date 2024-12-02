import * as lpc from "./_namespaces/lpc.js";
import * as lpcNode from "../lpcserver/nodeServer.js";
import * as path from "path";

/**
 * Common utilities
 */

const testPathPrefixRegExp = /(?:(file:\/{3})|\/)\.(ts|lib|src)\//g;
function removeTestPathPrefixes(text: string, retainTrailingDirectorySeparator?: boolean): string {
    return text !== undefined ? text.replace(testPathPrefixRegExp, (_, scheme) => scheme || (retainTrailingDirectorySeparator ? "/" : "")) : undefined!; // TODO: GH#18217
}

// Regex for parsing options in the format "@Alpha: Value of any sort"
const optionRegex = /^[/]{2}\s*@(\w+)\s*:\s*([^\r\n]*)/gm; // multiple matches on multiple lines

interface CompilerSettings {
    [name: string]: string;
}
function extractCompilerSettings(content: string): CompilerSettings {
    const opts: CompilerSettings = {};

    let match: RegExpExecArray | null; // eslint-disable-line no-restricted-syntax
    while ((match = optionRegex.exec(content)) !== null) { // eslint-disable-line no-restricted-syntax
        opts[match[1]] = match[2].trim();
    }

    return opts;
}


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

    const singleTestFile = "";//"typeInference3.c";    

    testFiles.filter(f => singleTestFile.length==0 || f.endsWith(singleTestFile)).forEach(testCaseFile => {
        const testCaseName = "compiler/" + lpc.getBaseFileName(testCaseFile);
        describe(testCaseName, () => {                  
            const fileContent = lpc.sys.readFile(testCaseFile);
            const testOptions = extractCompilerSettings(fileContent);            

            // setup options & hosts
            const compilerOptions: lpc.CompilerOptions = {
                driverType: lpc.driverTypeToLanguageVariant(testOptions["driver"]),
                diagnostics: true
            };

            const expectedErrorCount = +(testOptions["errors"] ?? "0");

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


            let diagsText: string;
            let diags: lpc.DiagnosticWithLocation[] = [];

            it(`Properly compiles ${testCaseName}`, () => {
                expect(file).toBeDefined();
                        
                // run semantic diags
                const semanticDiags = program.getSemanticDiagnostics(file);
                
                // combine and validate
                diags = file.parseDiagnostics.concat(semanticDiags);
                diagsText = removeTestPathPrefixes(lpc.getErrorSummaryText(diags.length, lpc.getFilesInErrorForSummary(diags), "\n", compilerHost));               
            });

            it(`Reports correct number of errors for ${testCaseName}`, () => {
                expect(diags.length).toEqual(expectedErrorCount);
            });
            
            it(`Reports correct errors for ${testCaseName}`, () => {
                expect(diagsText).toMatchSnapshot(`diags-${testCaseName}`);
            });                        
        });
    });
    
});