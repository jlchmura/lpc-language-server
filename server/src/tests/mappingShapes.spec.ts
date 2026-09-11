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

    it("takes several type-keyed entries", () => {
        const src = `/**\n * @type {([ string: int, int: string ])}\n */\nmapping m;\nvoid f() { mixed v = m["a"]; v; }\n`;
        expect(diagnosticsOf(src)).toEqual([]);
        expect(hoverOf(src, "v; }")).toBe("(local var) string | int v");
    });

    it("leaves LDMud's semicolon-separated value columns alone", () => {
        const src = `/**\n * @type {([ string: int; float ])}\n */\nmapping m;\nvoid f() { mixed v = m["a"]; v; }\n`;
        expect(diagnosticsOf(src)).toEqual([]);
        expect(hoverOf(src, "v; }")).toBe("(local var) mixed v");
    });
});
