import * as lpc from "./_namespaces/lpc.js";
import { codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * A struct (LDMud) or class (FluffOS) member list declares several members with one type,
 * and, as in a variable declaration, a `*` belongs to the one name after it (#458). The
 * LDMud expectations were compiled with LDMud 3.6.7.
 */

function diagnostics(source: string, driverType = lpc.LanguageVariant.LDMud): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType, diagnostics: true });
    return [...ls.getSyntacticDiagnostics(abs("test.c")), ...ls.getSemanticDiagnostics(abs("test.c"))].map(codeAndMessage);
}

const codes = (source: string, driverType?: lpc.LanguageVariant) =>
    diagnostics(source, driverType).map(d => Number(d.slice(0, d.indexOf(":"))));

describe("struct member lists", () => {
    it("parses a `*` on a later member and reads both members", () => {
        expect(codes(`struct Foo { int one, *two; };\nint f(struct Foo v) { return v->one; }\nint *g(struct Foo v) { return v->two; }\n`)).toEqual([]);
    });

    it("accepts a struct literal for it", () => {
        expect(codes(`struct Foo { int one, *two; };\nmixed f() { return (<Foo> 1, ({ 2 })); }\n`)).toEqual([]);
    });

    it("gives the `*` only to the member it is written on", () => {
        // int one, *two: two is int*, one is int
        expect(codes(`struct Foo { int one, *two; };\nint f(struct Foo v) { return v->two; }\n`)).toEqual([2322]);
        // int *one, two: one is int*, two is int
        expect(codes(`struct Foo { int *one, two; };\nint f(struct Foo v) { return v->two; }\nint *g(struct Foo v) { return v->one; }\n`)).toEqual([]);
        expect(codes(`struct Foo { int *one, two; };\nint *f(struct Foo v) { return v->two; }\n`)).toEqual([2322]);
    });

    it("handles three members with the `*` in the middle", () => {
        expect(codes(`struct Foo { string a, *b, c; };\nvoid f(struct Foo v) {\n  string s = v->a;\n  string *t = v->b;\n  string u = v->c;\n}\n`)).toEqual([]);
    });

    it("reports a `*` with no name after it, without crashing on a later member access", () => {
        expect(codes(`struct Foo { int one, *; };\nint f(struct Foo v) { return v->one; }\n`)).toEqual([1003]);
    });

    it("does not crash on a member access when a member has a `*` but no type", () => {
        // `*two;` leaves an array type with no element type behind; reading a member
        // through it crashed getPropertyOfType.
        const source = `struct Foo { int one; *two; };\nint f(struct Foo v) { return v->two->x; }\n`;
        expect(() => codes(source)).not.toThrow();
        expect(codes(source)).toContain(1131);
    });

    it("works for a FluffOS class too", () => {
        const FluffOS = lpc.LanguageVariant.FluffOS;
        expect(codes(`class Foo { int one, *two; }\nint *f(class Foo v) { return v->two; }\nint g(class Foo v) { return v.one; }\n`, FluffOS)).toEqual([]);
    });
});
