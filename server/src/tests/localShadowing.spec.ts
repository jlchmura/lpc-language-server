import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";

/**
 * FluffOS refuses to redeclare a local name that an ENCLOSING scope of the same function
 * already declares. Every expectation here was run against build/src/driver first --
 * the boundaries are not where you would guess, and several "obvious" cases are legal.
 *
 * LDMud is looser (prolang.y redeclare_local(): "If this happens on a deeper level, it is
 * legal"), so the check is FluffOS-only and the LDMud cases assert silence.
 */
function messages(source: string, driverType = lpc.LanguageVariant.FluffOS): string[] {
    const root = process.cwd();
    const virtualFile = lpc.normalizeSlashes(path.join(root, "server/src/tests/cases/compiler/__shadow.c"));
    const isVirtual = (fn: string) => !!fn && lpc.normalizeSlashes(fn) === virtualFile;

    const compilerOptions: lpc.CompilerOptions = { driverType, diagnostics: true };
    const host = lpc.createCompilerHost(compilerOptions);
    const origReadFile = host.readFile;
    const origFileExists = host.fileExists;
    host.readFile = (fn: string) => (isVirtual(fn) ? source : origReadFile.call(host, fn));
    host.fileExists = (fn: string) => (isVirtual(fn) ? true : origFileExists.call(host, fn));
    host.getDefaultLibFileName = () =>
        lpc.combinePaths(root, lpc.getDefaultLibFolder(compilerOptions), lpc.getDefaultLibFileName(compilerOptions));

    const program = lpc.createProgram({ host, rootNames: [virtualFile], options: compilerOptions, oldProgram: undefined });
    const file = program.getSourceFile(virtualFile)!;
    return program.getSemanticDiagnostics(file).map(d => lpc.flattenDiagnosticMessageText(d.messageText, " "));
}

const redeclares = (src: string) => messages(src).some(m => m.includes("Illegal to redeclare local name"));

describe("FluffOS refuses shadowing an enclosing local", () => {
    it("rejects a nested block shadowing a function-body local", () => {
        expect(redeclares(`void f() { int a = 1; { int a = 2; a++; } a++; }`)).toBe(true);
    });

    it("rejects shadowing at deeper nesting, not just one level in", () => {
        expect(redeclares(`void f() { { int a = 1; { int a = 2; a++; } a++; } }`)).toBe(true);
    });

    it("rejects a local shadowing a parameter, however deep", () => {
        expect(redeclares(`void f(int p) { { { int p = 2; p++; } } }`)).toBe(true);
    });

    it("rejects a foreach header shadowing an enclosing local", () => {
        expect(redeclares(`void f() { int *arr = ({ 1 }); int c = 1; foreach(int c in arr) { } c++; }`)).toBe(true);
    });

    it("rejects a for header shadowing an enclosing local", () => {
        expect(redeclares(`void f() { int d = 1; for(int d = 0; d < 1; d++) { } d++; }`)).toBe(true);
    });
});

describe("FluffOS allows the shapes the driver allows", () => {
    it("accepts sibling blocks reusing a name -- neither encloses the other", () => {
        expect(redeclares(`void f() { { int b = 1; b++; } { int b = 2; b++; } }`)).toBe(false);
    });

    it("accepts a local shadowing an object variable", () => {
        expect(redeclares(`nosave int counter;\nvoid f() { int counter = 1; counter++; }`)).toBe(false);
    });

    it("accepts a local in a block shadowing an object variable", () => {
        expect(redeclares(`nosave int counter;\nvoid f() { { int counter = 1; counter++; } }`)).toBe(false);
    });

    it("accepts two functions each using the same local name", () => {
        expect(redeclares(`void a() { int x = 1; x++; }\nvoid f() { int x = 2; x++; }`)).toBe(false);
    });

    it("accepts a new name in an inner block", () => {
        expect(redeclares(`void f() { int e = 1; { int e2 = 2; e2++; } e++; }`)).toBe(false);
    });
});

describe("LDMud is left alone", () => {
    it("does not report the nested-block case in LDMud", () => {
        expect(messages(`void f() { int a = 1; { int a = 2; a++; } a++; }`, lpc.LanguageVariant.LDMud)
            .some(m => m.includes("Illegal to redeclare local name"))).toBe(false);
    });
});
