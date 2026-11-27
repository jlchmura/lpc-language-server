import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * LDMud 3.6 references: `&name`, `&(lvalue)` and `&(function_call)` are expressions of their
 * own (prolang.y, `lvalue_reference` under `expr0`), not only call arguments. The forms are
 * the ones in the driver's tests (t-lvalues.c, t-lambda.c, t-swap, t-lwobject).
 */
function diagnosticsFor(source: string, driverType = lpc.LanguageVariant.LDMud, typeChecking: lpc.TypeCheckingMode = "strict"): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType, diagnostics: true, typeChecking });
    return allDiagnostics(ls, abs("test.c")).map(codeAndMessage);
}

describe.each(["strict", "driver"] as const)("LDMud references as expressions (%s mode)", mode => {
    it("parses a reference to a variable, an lvalue and a call", () => {
        expect(diagnosticsFor(`int x; int y; mapping m = ([ "a": 1; 2 ]);
mixed f() {
    mixed r = &x;
    int z = &y;
    mixed *arr = ({ 1, 2, 3 });
    mixed q = &(arr[0..1]);
    mixed q2 = &(m["a", 0..1]);
    mixed q3 = &(funcall(#'f));
    string str = "Some String";
    return 'S' in &(str[5..7]) && r && z && q && q2 && q3;
}
mixed g() { return &x; }
`, undefined, mode)).toEqual([]);
    });

    it("parses a reference as a closure context variable's initializer", () => {
        expect(diagnosticsFor(`int f() { int finished; closure c = function int() : int a = &finished { return a; }; return funcall(c); }`, undefined, mode)).toEqual([]);
    });

    it("parses an assignment through a reference", () => {
        expect(diagnosticsFor(`int global_var; void f() { &global_var = 1234; }`, undefined, mode)).toEqual([]);
    });

    it("parses a reference in a mapping literal", () => {
        expect(diagnosticsFor(`int x; mapping f() { return ([ "k": &x ]); }`, undefined, mode)).toEqual([]);
    });

    it("leaves binary `&` alone", () => {
        expect(diagnosticsFor(`int f(int a, int b) { int w = 1 & 2; return a & b & w; }`, undefined, mode)).toEqual([]);
    });
});

describe("LDMud references: types", () => {
    it("gives a reference its variable's type", () => {
        expect(diagnosticsFor(`int y; void f() { string s = &y; }`)).toEqual(["2322: Type 'int' is not assignable to type 'string'."]);
    });

    it("checks the variable a reference names", () => {
        expect(diagnosticsFor(`void f() { mixed r = &nope; }`)).toEqual(["2304: Cannot find name 'nope'."]);
    });
});

describe("FluffOS references", () => {
    it("still allows `&` on a call argument", () => {
        expect(diagnosticsFor(`void g(int ref a) { a = 1; } void f() { int x; g(&x); g(ref x); }`, lpc.LanguageVariant.FluffOS)).toEqual([]);
    });

    it("has no reference expression outside a call argument", () => {
        expect(diagnosticsFor(`int x; void f() { mixed r = &x; }`, lpc.LanguageVariant.FluffOS)).toContain("1001: Expression expected.");
    });
});
