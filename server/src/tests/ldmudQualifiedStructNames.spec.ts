import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * LDMud qualifies a struct name (prolang.y struct_name, t-sefun/tl-override-struct.c): `::S` is
 * the program's own struct and `sefun::S` the simul-efun object's, even where the program
 * defines an S of its own. The qualifier is allowed wherever a struct name is, in a type and in
 * a struct literal. Any qualifier other than `efun` and `sefun` is an error.
 */
const SEFUN = `struct SomeStruct { string text; };\n`;

function service(source: string) {
    return createTestLanguageService(
        { "test.c": source, "obj/sefun.c": SEFUN },
        { driverType: lpc.LanguageVariant.LDMud, diagnostics: true },
    );
}

function diagnosticsFor(source: string): string[] {
    const { ls, abs } = service(source);
    return allDiagnostics(ls, abs("test.c")).map(codeAndMessage);
}

describe("an LDMud qualified struct name", () => {
    const own = `struct SomeStruct { closure c1, c2; };\n`;

    it("names the program's own struct with ::", () => {
        expect(diagnosticsFor(`${own}int f(struct ::SomeStruct x) {\n    struct ::SomeStruct m = (<::SomeStruct> #'this_object, #'previous_object);\n    return funcall(m.c1) == funcall(x->c2);\n}\n`)).toEqual([]);
        expect(diagnosticsFor(`${own}void f() { struct ::SomeStruct m = (<::SomeStruct> #'this_object); string s = m.c1; }\n`)).toEqual([
            "2322: Type 'function' is not assignable to type 'string'.",
        ]);
    });

    it("names the simul-efun object's struct with sefun::", () => {
        expect(diagnosticsFor(`${own}int f(struct sefun::SomeStruct x, string str) {\n    struct sefun::SomeStruct sefun = (<sefun::SomeStruct> "Test");\n    return sefun.text == str && x.text == str;\n}\n`)).toEqual([]);
        expect(diagnosticsFor(`${own}void f() { struct sefun::SomeStruct s = (<sefun::SomeStruct> "Test"); closure c = s.text; }\n`)).toEqual([
            "2322: Type 'string' is not assignable to type 'function'.",
        ]);
    });

    it("resolves sefun:: to the simul-efun object's declaration", () => {
        const source = `${own}void f(struct sefun::SomeStruct x) { }\n`;
        const { ls, abs } = service(source);
        const [def] = ls.getDefinitionAtPosition(abs("test.c"), source.indexOf("SomeStruct x")) ?? [];
        expect(def?.fileName).toBe(abs("obj/sefun.c"));
    });

    it("reports a struct the simul-efun object doesn't define", () => {
        expect(diagnosticsFor(`struct Mine { int a; };\nstruct sefun::Mine x;\n`)).toEqual([
            "2304: Cannot find name 'Mine'.",
        ]);
    });

    it("never names the program's own struct with sefun::, also without a simul-efun file", () => {
        const { ls, abs } = createTestLanguageService({ "test.c": `struct MyStruct { };\nstruct sefun::MyStruct myval;\n` }, { driverType: lpc.LanguageVariant.LDMud, diagnostics: true });
        expect(allDiagnostics(ls, abs("test.c")).map(codeAndMessage)).toEqual(["2304: Cannot find name 'MyStruct'."]);
    });

    it("rejects any other qualifier", () => {
        expect(diagnosticsFor(`struct S { int a; };\nstruct foo::S x;\n`)).toEqual([
            "9085: Illegal struct name qualifier 'foo'.",
        ]);
    });
});
