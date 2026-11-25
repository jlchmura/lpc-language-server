import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService, codeAndMessage } from "./harness.js";

/**
 * Arguments passed to a rest parameter: LDMud's `varargs <type> *args`, FluffOS's `<type> *args...`.
 *
 * The extra arguments are collected into the array, so each one is checked against the
 * element type. The checker looked the element type up with an indexed access, which
 * gives `unknown` for an LPC array, so any argument was accepted: `g("a")` for
 * `g(varargs int *b)`, and `min(1, "a")` once efun.h declared min's rest parameter as an
 * array.
 */
function errors(body: string, driverType = lpc.LanguageVariant.LDMud): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": body }, {
        driverType,
        diagnostics: true,
    });
    return ls.getSemanticDiagnostics(abs("test.c")).map(codeAndMessage);
}

describe("arguments to an LDMud varargs array parameter", () => {
    it("are checked against the element type", () => {
        expect(errors(`int g(int a, varargs int *b) { return a; }\nvoid f() { g(1, 2, "a"); }\n`)).toEqual([
            "2345: Argument of type 'string' is not assignable to parameter of type 'int'.",
        ]);
        expect(errors(`int g(varargs int *b) { return 1; }\nvoid f() { g("a"); }\n`)).toEqual([
            "2345: Argument of type 'string' is not assignable to parameter of type 'int'.",
        ]);
        // An array is one argument, an element of the collected array: it isn't spread.
        expect(errors(`void g(varargs string *b) {}\nvoid f(string *arr) { g(arr); }\n`)).toEqual([
            "2345: Argument of type 'string*' is not assignable to parameter of type 'string'.",
        ]);
    });

    it("accept matching arguments, none at all, a spread array, and anything for mixed", () => {
        expect(errors(`
            int g(int a, varargs int *b) { return a; }
            int h(varargs mixed *b) { return 1; }
            void f(int *arr) { g(1); g(1, 2, 3); g(1, arr...); h(1, "a", ({ }), ([ ])); h(); }
        `)).toEqual([]);
    });

    it("reject max()/min() arguments of mixed kinds", () => {
        expect(errors(`void f() { min(1, "a"); }`)).toHaveLength(1);
        expect(errors(`void f() { max("a", "b", 1); }`)).toHaveLength(1);
    });
});

// FluffOS's compiler only checks the fixed arguments (validate_function_call in compiler.cc), so
// the driver accepts `f(1, "a", 2)` below and stores 2 in a string array. The language server checks
// the extra arguments the same way as in LDMud.
describe("arguments to a FluffOS rest parameter", () => {
    const fluffos = (body: string) => errors(body, lpc.LanguageVariant.FluffOS);

    it("are checked against the element type", () => {
        expect(fluffos(`void f(int a, string *b...) {}\nvoid g() { f(1, "a", 2); }\n`)).toEqual([
            "2345: Argument of type 'int' is not assignable to parameter of type 'string'.",
        ]);
    });

    it("accept matching arguments, none at all, a spread array, and anything for mixed", () => {
        expect(fluffos(`
            void f(int a, string *b...) {}
            void h(mixed *b...) {}
            void g(string *arr) { f(1); f(1, "a", "b"); f(1, arr...); h(1, "a", ({ }), ([ ])); h(); }
        `)).toEqual([]);
    });
});

describe("a varargs parameter in FluffOS", () => {
    // grammar.y: a parameter is `arg_type` (a type, optionally `ref`); `varargs` is a function modifier only.
    it("is reported on the modifier, whatever its type", () => {
        const source = `void f(varargs int x) {}\nvoid g(varargs int *y) {}\nvarargs void h(int z) {}\n`;
        const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType: lpc.LanguageVariant.FluffOS, diagnostics: true });
        const diagnostics = [...ls.getSyntacticDiagnostics(abs("test.c")), ...ls.getSemanticDiagnostics(abs("test.c"))];
        expect(diagnostics.map(codeAndMessage)).toEqual([
            "1090: 'varargs' modifier cannot appear on a parameter.",
            "1090: 'varargs' modifier cannot appear on a parameter.",
        ]);
        expect(diagnostics.map(d => source.substr(d.start!, d.length!))).toEqual(["varargs", "varargs"]);
        expect(diagnostics.map(d => source.substring(0, d.start!).split("\n").length)).toEqual([1, 2]);
    });
});

describe("an LDMud varargs parameter declaration", () => {
    // prolang.y: "varargs parameter must be declared array or mixed".
    it("must allow an array", () => {
        const declarations = ["int n", "string|object n", "object n", "lwobject n", "mapping n", "closure n", "struct S n"];
        expect(errors(`struct S { int a; };\n` + declarations.map((d, i) => `void f${i}(varargs ${d}) {}\n`).join(""))).toEqual(
            declarations.map(() => "9060: A 'varargs' parameter must be declared as an array or 'mixed'."));
    });

    it("may be mixed, an array, or a union with an array in it", () => {
        expect(errors(`
            void a(varargs mixed b) {}
            void c(varargs int *d) {}
            void e(varargs mixed *f) {}
            void g(varargs int|string *h) {}
            void i(varargs int **j) {}
            void n(varargs object *o) {}
            void p(varargs int|object *q) {}
            varargs void k(int l, string m) {}
        `)).toEqual([]);
    });
});
