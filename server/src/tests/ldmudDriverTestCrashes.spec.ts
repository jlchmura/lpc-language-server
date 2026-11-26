import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * Crashes found by running the server over LDMud's own test suite (`test/` in the driver
 * source). Each aborted the whole CLI run with a Debug assertion or a TypeError. The snippets
 * are reduced from the driver's tests; LDMud 3.6.7 loads every one of them unless noted.
 */

function diagnosticsFor(source: string, typeChecking: lpc.TypeCheckingMode = "strict"): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType: lpc.LanguageVariant.LDMud, diagnostics: true, typeChecking });
    return allDiagnostics(ls, abs("test.c")).map(codeAndMessage);
}

const codes = (source: string, typeChecking?: lpc.TypeCheckingMode) => diagnosticsFor(source, typeChecking).map(d => Number(d.slice(0, d.indexOf(":"))));

describe.each(["strict", "driver"] as const)("LDMud driver-test crashes (%s mode)", mode => {
    // t-mantis.c. `(void)` is an empty parameter list; the binder allowed a parameter without
    // a name only on a function declaration, and asserted on a closure's.
    it("accepts `function ... (void)` on a closure", () => {
        expect(diagnosticsFor(`void f() { closure c = function void (void) { }; }`, mode)).toEqual([]);
        expect(diagnosticsFor(`int f() { closure c = function int (void) { return 1; }; return funcall(c); }`, mode)).toEqual([]);
        expect(diagnosticsFor(`void f() { closure c = (: limited(function void (void) { }, 1, 2) :); }`, mode)).toEqual([]);
    });

    // t-efuns.c. A closure that begins an array literal was taken for a `({ type })` cast, since
    // `function` is a type name; the lookahead never checked that a `})` followed. Its recovery
    // built a `()` type with nothing inside, which the checker asserted on.
    it("parses a `function` closure as the first element of an array", () => {
        expect(diagnosticsFor(`mixed *a = ({ function int() { return 1; } });`, mode)).toEqual([]);
        expect(diagnosticsFor(`mixed *a = ({ function int() : int x = 1234 { return x; }, 2 });`, mode)).toEqual([]);
        expect(diagnosticsFor(`mixed *a = ({ function int () : int x = 1; string s = "a" { return x; } });`, mode)).toEqual([]);
    });

    it("still parses a `({ type })` cast", () => {
        expect(diagnosticsFor(`int f(mixed x) { return ({ int }) x; }`, mode)).toEqual([]);
    });

    // t-mantis.c, test 0000537-2: a foreach can mix a variable it already has with one it
    // declares. The declaration is then a comma operand, not in a declaration list, and the
    // checker read `.declarations` off the comma expression.
    it("accepts a foreach that mixes an existing variable with a declared one", () => {
        expect(diagnosticsFor(`void f() { string key; mapping m = ([ "": 1 ]); foreach (key, int val : &m) { val++; } }`, mode)).toEqual([]);
        expect(diagnosticsFor(`void f() { int val; mapping m = ([ "a": 1 ]); foreach (string key, val : m) { } }`, mode)).toEqual([]);
    });
});

describe("LDMud driver-test crashes: types and errors still reported", () => {
    it("types a declared loop variable in the mixed foreach form", () => {
        expect(codes(`void f() { string key; mapping m = ([ "a": 1 ]); foreach (key, int val : m) { string s = val; } }`)).toEqual([2322]);
    });

    it("still rejects a loop target that is not a variable", () => {
        expect(codes(`void f() { mapping m = ([ "a": 1 ]); foreach (1, int val : m) { } }`)).toContain(2487);
    });

    // t-efuns.c: `[struct mixed]`, an lpctype literal, which the server does not parse yet. Two of
    // them on a line left two declarations whose name the parser had to make up; both went into
    // the file's table under "", and the second asserted in declareSymbol. They are syntax
    // errors here, but must not crash.
    it("reports an lpctype literal it cannot parse instead of crashing", () => {
        expect(() => diagnosticsFor(`mixed x = f([struct mixed]) == [struct mixed];`)).not.toThrow();
        expect(codes(`mixed x = f([struct mixed]) == [struct mixed];`)).toContain(1359);
        expect(() => diagnosticsFor(`({ "x", 0, (: to_lpctype(to_string([struct mixed])) == [struct mixed] :) }),`)).not.toThrow();
    });
});
