import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";
import { createTestLanguageService } from "./harness.js";

/**
 * A mapping type's entries are separated by commas: `([ "name": string, "hp": int ])` is two
 * keys, not one key with two value columns. A value that may be one of several types is a union
 * (`([ string: int | float ])`), which is what the spec uses; LDMud's multi-value columns follow
 * the literal syntax and are separated by `;`.
 *
 * A shape is OPEN: it says what the keys it lists hold, not that no others exist. So a listed key
 * gives its own type and an unlisted one is `mixed`.
 *
 * In key position a string literal is a KEY (`"name"`), except when it looks like a path, which
 * keeps meaning the object at that path -- `([ STD_BODY: float ])`, a mapping keyed by an object,
 * is how this is already written in the wild. Such a path has to reach the dependency graph from
 * inside the mapping type, or it resolves to nothing.
 */
const cwd = lpc.normalizePath(process.cwd());

function service(src: string) {
    return createTestLanguageService(
        { "lib/std/user.c": "int is_user() { return 1; }\n", "lib/main.c": src },
        { driverType: lpc.LanguageVariant.FluffOS, diagnostics: true, rootDir: lpc.normalizePath(path.join(cwd, "lib")) });
}

function hoverOf(src: string, marker: string): string | undefined {
    const { ls, abs } = service(src);
    return ls.getQuickInfoAtPosition(abs("lib/main.c"), src.indexOf(marker))
        ?.displayParts?.map(p => p.text).join("").replace(/\s+/g, " ");
}

function diagnosticsOf(src: string): string[] {
    const { ls, abs } = service(src);
    const f = abs("lib/main.c");
    return [...ls.getSyntacticDiagnostics(f), ...ls.getSemanticDiagnostics(f)]
        .map(d => lpc.flattenDiagnosticMessageText(d.messageText, " "));
}

const shape = (body: string) => `/**\n * @type {([ "name": string, "hp": int ])}\n */\nmapping m;\n` + body;

describe("a mapping shape", () => {
    it("gives a listed key its own type", () => {
        expect(hoverOf(shape(`void f() { mixed v = m["name"]; v; }\n`), "v; }")).toBe("(local var) string v");
        expect(hoverOf(shape(`void f() { mixed v = m["hp"]; v; }\n`), "v; }")).toBe("(local var) int v");
    });

    it("gives an unlisted key mixed, because a shape is open", () => {
        expect(hoverOf(shape(`void f() { mixed v = m["nope"]; v; }\n`), "v; }")).toBe("(local var) mixed v");
    });

    it("resolves a listed key through FluffOS dot access", () => {
        expect(hoverOf(shape(`void f() { mixed v = m.name; v; }\n`), "v; }")).toBe("(local var) string v");
    });

    it("gives a computed key the union of the listed values", () => {
        expect(hoverOf(shape(`void f() { string k = "name"; mixed v = m[k]; v; }\n`), "v; }"))
            .toBe("(local var) string | int v");
    });

    it("hovers as the shape it was written as", () => {
        expect(hoverOf(shape(`void f() { m; }\n`), "m; }")).toBe(`var ([ "name": string, "hp": int ]) m`);
    });

    it("keys by an int literal", () => {
        const src = `/**\n * @type {([ 5: string ])}\n */\nmapping m;\nvoid f() { mixed v = m[5]; v; }\n`;
        expect(hoverOf(src, "v; }")).toBe("(local var) string v");
    });

    it("keys by an object when the literal is a path", () => {
        const src = `/**\n * @type {([ "/std/user.c": float ])}\n */\nmapping m;\nvoid f() { m; }\n`;
        expect(diagnosticsOf(src)).toEqual([]);
    });

    it("keys by an object written as a macro, as the wild does", () => {
        const src = `#define STD_USER "/std/user.c"\n/**\n * @type {([ STD_USER: float ])}\n */\nmapping m;\nvoid f() { m; }\n`;
        expect(diagnosticsOf(src)).toEqual([]);
    });

    it("resolves a path to an object however deep it sits in the type", () => {
        const decl = (t: string) => `#define STD_USER "/std/user.c"\n\n/**\n * @type {${t}}\n */\nmapping m;\nvoid f() { m; }\n`;
        const cases: [string, string][] = [
            [`([ string: STD_USER ])`, `([ string: object "/std/user" ])`],
            [`([ string: STD_USER* ])`, `([ string: object "/std/user"* ])`],
            [`([ string: int | STD_USER ])`, `([ string: int | object "/std/user" ])`],
            [`([ string: STD_USER | STD_USER* ])`, `([ string: object "/std/user" | object "/std/user"* ])`],
            [`([ string: ([ STD_USER: int ]) ])`, `([ string: ([ object "/std/user": int ]) ])`],
            [`([ STD_USER*: int ])`, `([ object "/std/user"*: int ])`],
            [`([ string: (int | STD_USER)* ])`, `([ string: (int | object "/std/user")* ])`],
        ];
        for (const [written, shown] of cases) {
            expect(hoverOf(decl(written), "m; }")).toBe(`var ${shown} m`);
        }
    });

    it("takes several type-keyed entries", () => {
        const src = `/**\n * @type {([ string: int, int: string ])}\n */\nmapping m;\nvoid f() { mixed v = m["a"]; v; }\n`;
        expect(diagnosticsOf(src)).toEqual([]);
        expect(hoverOf(src, "v; }")).toBe("(local var) string | int v");
    });

    it("gives an unlisted int key mixed", () => {
        const src = `/**\n * @type {([ 5: string ])}\n */\nmapping m;\nvoid f() { mixed v = m[6]; v; m; }\n`;
        expect(hoverOf(src, "v; m")).toBe("(local var) mixed v");
        expect(hoverOf(src, "m; }")).toBe("var ([ 5: string ]) m");
    });

    it("accepts a literal, a string-keyed value and an argument", () => {
        const src = shape(`/**\n * @type {([ string: int ])}\n */\nmapping si;\n`
            + `void g(mixed x) {}\n`
            + `/**\n * @param {([ "hp": int ])} x - x.\n */\nvoid h(mapping x) { g(x); }\n`
            + `void f() {\n`
            + `    /** @type {([ "hp": int ])} */\n    mapping a = ([ "hp": 100 ]);\n`
            + `    /** @type {([ "hp": int ])} */\n    mapping b = si;\n`
            + `    h(([ "hp": 1 ]));\n    m = ([ "name": "x", "hp": 1 ]);\n    g(a); g(b);\n}\n`);
        expect(diagnosticsOf(src)).toEqual([]);
    });

    it("accepts an int-keyed literal", () => {
        const src = `/**\n * @type {([ 5: string ])}\n */\nmapping m = ([ 5: "x" ]);\nvoid f() { m; }\n`;
        expect(diagnosticsOf(src)).toEqual([]);
    });

    it("still rejects a mismatched key or value", () => {
        const src = `/**\n * @type {([ "hp": int ])}\n */\nmapping m;\nvoid f() { m = ([ "hp": "x" ]); m = ([ 1: 2 ]); }\n`;
        expect(diagnosticsOf(src)).toEqual([
            "Type '([ string: string ])' is not assignable to type '([ \"hp\": int ])'.   Type 'string' is not assignable to type 'int'.",
            "Type '([ int: int ])' is not assignable to type '([ \"hp\": int ])'.   Type 'int' is not assignable to type 'string'.",
        ]);
    });

    it("keeps two shapes over the same types apart", () => {
        const src = `/**\n * @type {([ "a": int ])}\n */\nmapping x;\n/**\n * @type {([ "b": int ])}\n */\nmapping y;\n`
            + `/**\n * @type {([ string: int ])}\n */\nmapping z;\nvoid f() { x; y; z; }\n`;
        expect(hoverOf(src, "x; y")).toBe(`var ([ "a": int ]) x`);
        expect(hoverOf(src, "y; z")).toBe(`var ([ "b": int ]) y`);
        expect(hoverOf(src, "z; }")).toBe("var ([ string: int ]) z");
    });

    it("leaves LDMud's semicolon-separated value columns alone", () => {
        const src = `/**\n * @type {([ string: int; float ])}\n */\nmapping m;\nvoid f() { mixed v = m["a"]; v; }\n`;
        expect(diagnosticsOf(src)).toEqual([]);
        expect(hoverOf(src, "v; }")).toBe("(local var) mixed v");
    });
});
