import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";
import { createTestLanguageService } from "./harness.js";

/**
 * `([ key: value ])` parsed, but the checker had no case for it: the node fell to the
 * "Implement me" default and resolved to `errorType`, so every annotation was accepted and
 * did nothing. A declared `mapping` also beat the doc type, since `shouldJsDocTypeOverrideTypeNode`
 * only admitted `object`/`mixed`/`function`/`closure` -- and a `mapping` keyword says nothing
 * about keys or values, so a mapping doc type refines it exactly as `@type {"/std/room.c"}`
 * refines a declared `object`.
 *
 * Reads resolve through `getIndexedAccessTypeOrUndefined`, which both `m[k]` and FluffOS's
 * `m.key` reach. Only ANNOTATED mappings carry a value type: a literal's is inferred from
 * whatever it was built with (`([])` has none at all), so checking writes against it would
 * reject perfectly good code on a dynamic mapping.
 */
const cwd = lpc.normalizePath(process.cwd());

function hoverOf(src: string, marker: string): string | undefined {
    const { ls, abs } = createTestLanguageService({ "lib/main.c": src }, {
        driverType: lpc.LanguageVariant.FluffOS,
        diagnostics: true,
        rootDir: lpc.normalizePath(path.join(cwd, "lib")),
    });
    return ls.getQuickInfoAtPosition(abs("lib/main.c"), src.indexOf(marker))
        ?.displayParts?.map(p => p.text).join("").replace(/\s+/g, " ");
}

const declared = (type: string) => `/**\n * @type {${type}}\n */\nmapping m;\n`;

describe("a mapping type's value", () => {
    it("types a keyed read", () => {
        expect(hoverOf(declared("([ string: int ])") + `void f() { mixed v = m["a"]; v; }\n`, "v; }"))
            .toBe("(local var) int v");
    });

    it("types FluffOS dot access the same way", () => {
        expect(hoverOf(declared("([ string: int ])") + `void f() { mixed v = m.a; v; }\n`, "v; }"))
            .toBe("(local var) int v");
    });

    it("carries an array value type", () => {
        expect(hoverOf(declared("([ string: string* ])") + `void f() { mixed v = m["a"]; v; }\n`, "v; }"))
            .toBe("(local var) string* v");
    });

    it("carries a union value type", () => {
        expect(hoverOf(declared("([ string: int | string ])") + `void f() { mixed v = m["a"]; v; }\n`, "v; }"))
            .toBe("(local var) string | int v");
    });

    it("reaches a foreach value variable", () => {
        expect(hoverOf(declared("([ string: int ])") + `void f() { foreach(string k, int v in m) { v; } }\n`, "v; } }"))
            .toBe("(local var) int v");
    });

    it("hovers as its shape rather than a bare mapping", () => {
        expect(hoverOf(declared("([ string: int ])") + `void f() { m; }\n`, "m; }"))
            .toBe("var ([ string: int ]) m");
    });

    it("overrides the declared mapping on a return type", () => {
        expect(hoverOf(`/**\n * @returns {([ string: int ])} m\n */\nmapping g() { return ([]); }\n`, "g()"))
            .toBe("function ([ string: int ]) g()");
    });

    it("leaves a literal-inferred mapping alone", () => {
        // Its value type is a guess from the initial contents, so `m["b"] = "x"` must stay legal.
        expect(hoverOf(`void f() { mapping m = ([ "a": 1 ]); mixed v = m["a"]; v; }\n`, "v; }"))
            .toBe("(local var) mixed v");
    });

    it("leaves a bare mapping alone", () => {
        expect(hoverOf(`void f() { mapping m = ([]); mixed v = m["a"]; v; }\n`, "v; }"))
            .toBe("(local var) mixed v");
    });

    it("leaves LDMud's multi-value form alone", () => {
        // `([ K: V1, V2 ])` is several value columns, which this type cannot express; flattening
        // it to a union would state something the author did not write.
        expect(hoverOf(declared("([ string: int, float ])") + `void f() { mixed v = m["a"]; v; }\n`, "v; }"))
            .toBe("(local var) mixed v");
    });
});
