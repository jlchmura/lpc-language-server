import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * Only an object value goes where an `object` is expected. Both drivers check a typed call's
 * arguments against the callee's parameter types: LDMud's check_function_call_types uses
 * has_common_type (or, for a literal, lpctype_contains), and FluffOS's validate_function_call
 * uses compatible_types, whose table admits only `object` and `mixed` for an object (#173).
 * `0` and `mixed` are still accepted.
 */
const drivers = [
    ["LDMud", lpc.LanguageVariant.LDMud],
    ["FluffOS", lpc.LanguageVariant.FluffOS],
] as const;

describe.each(drivers)("an object parameter or variable (%s)", (_name, driverType) => {
    describe.each(["strict", "driver"] as const)("%s mode", typeChecking => {
        function diagnosticsFor(source: string, files: Record<string, string> = {}): string[] {
            const { ls, abs } = createTestLanguageService({ "test.c": source, ...files }, { driverType, diagnostics: true, typeChecking });
            return allDiagnostics(ls, abs("test.c")).map(codeAndMessage);
        }

        it.each([
            ["a string variable", `string s = "x"; foo(s);`, "string"],
            ["a string literal", `foo("x");`, "string"],
            ["an int", `foo(5);`, "5"],
            ["an array", `foo(({ 1 }));`, "int*"],
            ["a mapping", `foo(([ "a": 1 ]));`, "([ string: int ])"],
            ["a closure", `foo((: 1 :));`, "function()"],
        ])("rejects %s as an argument", (_label, call, typeText) => {
            const diags = diagnosticsFor(`void foo(object o) {}\nvoid test() { ${call} }`);
            expect(diags).toHaveLength(1);
            expect(diags[0]).toMatch(/^2345: Argument of type '.*' is not assignable to parameter of type 'object'\.$/);
            expect(diags[0]).toContain(typeText);
        });

        it("rejects a string assigned to an object variable", () => {
            expect(diagnosticsFor(`void test(string s) { object o; o = s; }`)).toEqual([
                "2322: Type 'string' is not assignable to type 'object'.",
            ]);
        });

        it("rejects a string returned from an object function", () => {
            expect(diagnosticsFor(`object test(string s) { return s; }`)).toEqual([
                "2322: Type 'string' is not assignable to type 'object'.",
            ]);
        });

        it("accepts object values, 0 and mixed", () => {
            expect(diagnosticsFor(`void foo(object o) {}
void test(mixed m, object *arr) {
    object o = 0;
    foo(this_object());
    foo(0);
    foo(m);
    foo(arr[0]);
    foo(o);
    o = m;
}`)).toEqual([]);
        });

        it("accepts a program's object type", () => {
            expect(diagnosticsFor(`void foo(object o) {}
void test() {
    object x = clone_object("/other");
    foo(clone_object("/other"));
    foo(x);
}`, { "other.c": "void hello() {}" })).toEqual([]);
        });

        it("rejects a union with a non-object member, except where the driver only asks for overlap", () => {
            // LDMud's has_common_type accepts `object|string` for an `object`; FluffOS has no
            // union types to declare one with. Driver mode follows the overlap rule.
            expect(diagnosticsFor(`void foo(object o) {}\nvoid test(object|string y) { foo(y); }`)).toHaveLength(typeChecking === "strict" ? 1 : 0);
        });
    });
});

describe("an object parameter in untyped code", () => {
    // The example from #173. Neither driver checks it: LDMud checks arguments only in a
    // function with a declared return type, and FluffOS keeps argument types only for a
    // function compiled with one.
    const source = `foo(object o) {\n}\n\ntest() {\n  string s;\n  foo(s);\n}\n`;

    it.each(drivers)("is not checked in driver mode (%s)", (_name, driverType) => {
        const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType, diagnostics: true, typeChecking: "driver" });
        expect(allDiagnostics(ls, abs("test.c")).map(codeAndMessage)).toEqual([]);
    });

    it.each(drivers)("is reported in strict mode (%s)", (_name, driverType) => {
        const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType, diagnostics: true, typeChecking: "strict" });
        expect(allDiagnostics(ls, abs("test.c")).map(codeAndMessage)).toEqual([
            "2345: Argument of type 'string' is not assignable to parameter of type 'object'.",
        ]);
    });
});

describe("after an assignment that doesn't fit", () => {
    it.each(drivers)("the variable keeps its declared type (%s)", (_name, driverType) => {
        // The assignment is the error. `ob` used to become `mixed*` after it, which then
        // failed every later use of `ob` as an object.
        const { ls, abs } = createTestLanguageService({
            "test.c": `void take(object ob) {}\nvoid f(<int|string|object>* items) { object ob; ob = items[0]; take(ob); }`,
        }, { driverType, diagnostics: true });
        expect(allDiagnostics(ls, abs("test.c")).map(codeAndMessage)).toEqual([
            "2322: Type 'object | string | int' is not assignable to type 'object'.   Type 'string' is not assignable to type 'object'.",
        ]);
    });
});

describe("a foreach over a mapping into variables declared before it", () => {
    it.each(drivers)("binds the key with the mapping's key type (%s)", (_name, driverType) => {
        // A plain `mapping` has `mixed` keys; the check compared the key variable with `string`.
        const { ls, abs } = createTestLanguageService({
            "test.c": `mapping enemies;\nvoid f() { object enemy; int htime; foreach (enemy, htime : enemies) { } int n; foreach (n, htime : enemies) { } }`,
        }, { driverType, diagnostics: true });
        expect(allDiagnostics(ls, abs("test.c")).map(codeAndMessage)).toEqual([]);
    });
});
