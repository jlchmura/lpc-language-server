import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * An LDMud struct literal, `(<S> 1, 2)` or `(<S> a: 1, b: 2)`, checked as the driver does
 * (prolang.y, create_struct_literal): a member the struct lacks, a member given twice and too
 * many values are always errors; a value's type is compared with its member's where the driver
 * type checks (a function with a declared return type). LDMud 3.6.7 agrees with each case.
 */
function diagnosticsFor(source: string, typeChecking: lpc.TypeCheckingMode = "strict"): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType: lpc.LanguageVariant.LDMud, diagnostics: true, typeChecking });
    return allDiagnostics(ls, abs("test.c")).map(codeAndMessage);
}

describe("an LDMud struct literal's named members", () => {
    it("belong to the literal, not to the enclosing function", () => {
        expect(diagnosticsFor(`struct S { int a; string b; };\nvoid f() { struct S s = (<S> a: 1); int a = 2; a++; }\n`)).toEqual([]);
    });

    it("check each value against its member", () => {
        expect(diagnosticsFor(`struct S { int a; };\nvoid f() { struct S s = (<S> a: "x"); }\n`)).toEqual(["2322: Type 'string' is not assignable to type 'int'."]);
    });

    it("report a member the struct lacks", () => {
        expect(diagnosticsFor(`struct S { int a; };\nvoid f() { struct S s = (<S> nope: 1); }\n`)).toEqual(["2339: Property 'nope' does not exist on type 'S'."]);
    });

    it("report a member given twice", () => {
        expect(diagnosticsFor(`struct S { int a; };\nvoid f() { struct S s = (<S> a: 1, a: 2); }\n`)).toEqual(["9082: Member 'a' of struct 'S' is initialized more than once."]);
    });

    it("check the names in a value", () => {
        expect(diagnosticsFor(`struct S { int a; };\nvoid f() { struct S s = (<S> a: nope_var); }\n`)).toEqual(["2304: Cannot find name 'nope_var'."]);
    });
});

describe("an LDMud struct literal's positional values", () => {
    it("check each value against the member in its place", () => {
        expect(diagnosticsFor(`struct S { int a; string b; };\nvoid f() { struct S s = (<S> 1, "x"); struct S t = (<S> "x"); }\n`)).toEqual(["2322: Type 'string' is not assignable to type 'int'."]);
    });

    it("report more values than members", () => {
        expect(diagnosticsFor(`struct S { int a; };\nvoid f() { struct S s = (<S> 1, 2); }\n`)).toEqual(["9083: Too many values for struct 'S': it has 1 members."]);
    });

    it("check the names in a value", () => {
        expect(diagnosticsFor(`struct S { int a; };\nvoid f() { struct S s = (<S> nope_var); }\n`)).toEqual(["2304: Cannot find name 'nope_var'."]);
    });

    it("accepts empty arrays and mappings for typed members", () => {
        expect(diagnosticsFor(`struct S { mixed *a; mapping m; };\nvoid f() { struct S s = (<S> ({}), ([])); struct S t = (<S> a: ({ 1 }), m: ([ "x": 1 ])); }\n`)).toEqual([]);
    });
});

describe("an LDMud struct that inherits another", () => {
    const structs = `struct A { int a; };\nstruct B (A) { string b; };\n`;

    it("has the base struct's members", () => {
        expect(diagnosticsFor(`${structs}int f(struct B s) { return s.a + sizeof(s.b); }\n`)).toEqual([]);
    });

    it("fills the base struct's members first", () => {
        expect(diagnosticsFor(`${structs}int f() { struct B s = (<B> 1, "x"); struct B t = (<B> a: 1, b: "y"); return s.a + t.a; }\n`)).toEqual([]);
        expect(diagnosticsFor(`${structs}void f() { struct B s = (<B> "x", 1); }\n`)).toEqual([
            "2322: Type 'string' is not assignable to type 'int'.",
            "2322: Type 'int' is not assignable to type 'string'.",
        ]);
    });
});

describe("LDMud struct literals in driver mode", () => {
    it("compare types only in a function with a return type", () => {
        expect(diagnosticsFor(`struct S { int a; };\nf() { struct S s = (<S> "x"); struct S t = (<S> a: "y"); }\n`, "driver")).toEqual([]);
        expect(diagnosticsFor(`struct S { int a; };\nvoid f() { struct S s = (<S> "x"); }\n`, "driver")).toEqual(["2322: Type 'string' is not assignable to type 'int'."]);
    });

    it("always report too many values and an unknown member", () => {
        expect(diagnosticsFor(`struct S { int a; };\nf() { struct S s = (<S> 1, 2); struct S t = (<S> nope: 1); }\n`, "driver")).toEqual([
            "9083: Too many values for struct 'S': it has 1 members.",
            "2339: Property 'nope' does not exist on type 'S'.",
        ]);
    });
});

describe("a literal of a struct whose base is unknown", () => {
    it("is not checked against the members it may have", () => {
        expect(diagnosticsFor(`struct MyStruct (SomeStruct) { int number; };\nstruct MyStruct v = (<MyStruct> "Test2", 12);\nstruct MyStruct w = (<MyStruct> text: "Test1", number: 11);\n`)).toEqual([
            "2552: Cannot find name 'SomeStruct'. Did you mean 'MyStruct'?",
        ]);
    });
});
