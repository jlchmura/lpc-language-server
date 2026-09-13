import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";
import { createTestLanguageService } from "./harness.js";

/**
 * `@typedef {mapping} Person` + `@property` names a mapping's shape, the way `{Object}` does in
 * JS. Two things were missing. The parser only collected child `@property` tags when the type
 * expression was `object`-ish, so a `{mapping}` typedef parsed its properties and threw them
 * away; and `parseTypedefTag` REPLACES the type expression with the collected literal, so the
 * checker could not tell afterwards which keyword had been written -- hence the flag on the node,
 * beside the `isArrayType` that exists for the same reason.
 *
 * A named shape must BE a mapping, not an anonymous object. As an object its property reads
 * happened to work while `foreach` and computed keys silently gave `mixed`, so the two spellings
 * would have diverged exactly where it is hardest to notice.
 *
 * Hover shows the NAME at a use site and the shape at the declaration, as JS does. Qualifying a
 * symbol by its containing FILE (`"/main".Person`) named nothing anyone could write, and applied
 * to classes as much as typedefs.
 */
const cwd = lpc.normalizePath(process.cwd());

const PERSON = `/**\n * @typedef {mapping} Person\n * @property {string} name\n * @property {int} hp\n */\n`;

function hoverOf(src: string, marker: string): string | undefined {
    const { ls, abs } = createTestLanguageService({ "lib/main.c": src }, {
        driverType: lpc.LanguageVariant.FluffOS,
        diagnostics: true,
        rootDir: lpc.normalizePath(path.join(cwd, "lib")),
    });
    return ls.getQuickInfoAtPosition(abs("lib/main.c"), src.indexOf(marker))
        ?.displayParts?.map(p => p.text).join("").replace(/\s+/g, " ");
}

const declared = (body: string) => PERSON + `/**\n * @type {Person}\n */\nmapping p;\n` + body;

describe("a named mapping shape", () => {
    it("gives a listed key its own type", () => {
        expect(hoverOf(declared(`void f() { mixed v = p["name"]; v; }\n`), "v; }")).toBe("(local var) string v");
    });

    it("resolves a listed key through dot access", () => {
        expect(hoverOf(declared(`void f() { mixed v = p.hp; v; }\n`), "v; }")).toBe("(local var) int v");
    });

    it("gives an unlisted key mixed", () => {
        expect(hoverOf(declared(`void f() { mixed v = p["nope"]; v; }\n`), "v; }")).toBe("(local var) mixed v");
    });

    it("reaches a foreach value variable, as an inline shape does", () => {
        expect(hoverOf(declared(`void f() { foreach(string k, mixed v in p) { v; } }\n`), "v; } }"))
            .toBe("(local var) int v");
    });

    it("gives a computed key the union, as an inline shape does", () => {
        expect(hoverOf(declared(`void f() { string k = "name"; mixed v = p[k]; v; }\n`), "v; }"))
            .toBe("(local var) string | int v");
    });

    it("works as a parameter type", () => {
        const src = PERSON + `/**\n * @param {Person} who\n */\nvoid f(mapping who) { mixed v = who["name"]; v; }\n`;
        expect(hoverOf(src, "v; }")).toBe("(local var) string v");
    });

    it("hovers as its name at a use site", () => {
        expect(hoverOf(declared(`void f() { p; }\n`), "p; }")).toBe("var Person p");
    });

    it("hovers as its shape at the declaration", () => {
        expect(hoverOf(PERSON + `void f() {}\n`, "Person")).toBe(`struct Person ([ "name": string, "hp": int ])`);
    });

    it("does not qualify a class by its file either", () => {
        const src = `class Thing { string name; }\nvoid f() { class Thing c; c; }\n`;
        expect(hoverOf(src, "c; }")).toBe("(local var) Thing c");
    });
});
