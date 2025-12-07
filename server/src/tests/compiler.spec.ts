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
            const extraFiles = (testOptions["files"]?.split(",") ?? lpc.emptyArray).map(f => lpc.combinePaths(lpc.getDirectoryPath(testCaseFile), f.trim()));

            const compilerHost = lpc.createCompilerHost(compilerOptions);
            compilerHost.getDefaultLibFileName = () => lpc.combinePaths(root, lpc.getDefaultLibFolder(compilerOptions), lpc.getDefaultLibFileName(compilerOptions));

            const createProgramOptions: lpc.CreateProgramOptions = {
                host: compilerHost,
                rootNames: [testCaseFile, ...extraFiles],
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

    
     describe("Parser Node Positions", () => {
        it("should correctly set end position for mapping literal elements with macro key and value", () => {
            const source = `#define KEY 123
#define VALUE 456
void test() { mapping m = ([ KEY: VALUE ]); }`;
            
            const compilerOptions: lpc.CompilerOptions = {
                driverType: lpc.LanguageVariant.FluffOS,
                diagnostics: true
            };

            const compilerHost = lpc.createCompilerHost(compilerOptions);
            compilerHost.getDefaultLibFileName = () => lpc.combinePaths(root, lpc.getDefaultLibFolder(compilerOptions), lpc.getDefaultLibFileName(compilerOptions));

            const sourceFile = lpc.createSourceFile("test.c", source, lpc.ScriptTarget.Latest, /*setParentNodes*/ false);
            
            // Find the mapping literal expression by traversing the AST
            let mappingLiteral: lpc.MappingLiteralExpression | undefined;
            const visitNode = (node: lpc.Node): void => {
                if (node.kind === lpc.SyntaxKind.MappingLiteralExpression) {
                    mappingLiteral = node as lpc.MappingLiteralExpression;
                }
                lpc.forEachChild(node, visitNode);
            };
            visitNode(sourceFile);

            expect(mappingLiteral).toBeDefined();
            expect(mappingLiteral!.elements).toBeDefined();
            expect(mappingLiteral!.elements!.length).toBe(1);

            const mappingEntry = mappingLiteral!.elements![0] as lpc.MappingEntryExpression;
            expect(mappingEntry.kind).toBe(lpc.SyntaxKind.MappingEntryExpression);
            
            // The key and value are both macros, so they should expand to their values
            const elements = mappingEntry.elements;
            expect(elements).toBeDefined();
            expect(elements!.length).toBe(1);

            const valueExpr = elements![0];
            
            // The end position of the elements array should match the end of the last expression
            expect(elements!.end).toBe(valueExpr.end);
            
            // The end position of the mapping entry should match the end of its elements array
            expect(mappingEntry.end).toBe(elements!.end);
            
            // And thus should also match the last expression
            expect(mappingEntry.end).toBe(valueExpr.end);
        });

        it("should correctly set end position for union types with macro constituents", () => {
            const source = `#define TYPE1 int
#define TYPE2 string
void test() { TYPE1 | TYPE2 x; }`;
            
            const compilerOptions: lpc.CompilerOptions = {
                driverType: lpc.LanguageVariant.FluffOS,
                diagnostics: true
            };

            const compilerHost = lpc.createCompilerHost(compilerOptions);
            compilerHost.getDefaultLibFileName = () => lpc.combinePaths(root, lpc.getDefaultLibFolder(compilerOptions), lpc.getDefaultLibFileName(compilerOptions));

            const sourceFile = lpc.createSourceFile("test.c", source, lpc.ScriptTarget.Latest, /*setParentNodes*/ false);
            
            // Find the union type by traversing the AST
            let unionType: lpc.UnionTypeNode | undefined;
            const visitNode = (node: lpc.Node): void => {
                if (node.kind === lpc.SyntaxKind.UnionType) {
                    unionType = node as lpc.UnionTypeNode;
                }
                lpc.forEachChild(node, visitNode);
            };
            visitNode(sourceFile);

            expect(unionType).toBeDefined();
            expect(unionType!.types).toBeDefined();
            expect(unionType!.types.length).toBe(2);

            const firstType = unionType!.types[0];
            const lastType = unionType!.types[1];
            
            // The end position of the types array should match the end of the last type
            expect(unionType!.types.end).toBe(lastType.end);
            
            // The end position of the union type itself should match the end of the last type
            expect(unionType!.end).toBe(lastType.end);
            
            // And thus the union type end should match the types array end
            expect(unionType!.end).toBe(unionType!.types.end);
        });
    });
});
