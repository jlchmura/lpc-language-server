import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";
import { createTestLanguageService } from "./harness.js";

/**
 * A doc type built from path macros (`{STD_LIVING | STD_ROOM}`) rendered in the hover
 * signature as `+ | +`. The node builder reuses the authored type node and folds an
 * expanded literal into one synthesized string, but `visitEachChild` is a no-op in this
 * port, so only a top-level literal was ever folded. Members of a union (or an array
 * element) kept their source spans -- the macro names -- and an implied `"/std/" "room"`
 * concatenation printed with `+`.
 */
const cwd = lpc.normalizePath(process.cwd());

const mudlib =
    `#define DIR_STD "/std/"\n` +
    `#define STD_ITEM DIR_STD "item"\n` +
    `#define STD_LIVING DIR_STD "living"\n` +
    `#define STD_ROOM DIR_STD "room"\n`;

function hover(params: string, decl: string, withObjects = true): string | undefined {
    const main = `${mudlib}\n/**\n${params}\n */\nvarargs void stamp(${decl}) {}\n`;
    const files: Record<string, string> = { "lib/main.c": main };
    if (withObjects) {
        for (const f of ["item", "living", "room"]) files[`lib/std/${f}.c`] = `void create() {}\n`;
    }
    const { ls, abs } = createTestLanguageService(files, {
        driverType: lpc.LanguageVariant.FluffOS,
        rootDir: lpc.normalizePath(path.join(cwd, "lib")),
    });
    const quickInfo = ls.getQuickInfoAtPosition(abs("lib/main.c"), main.indexOf("stamp("));
    return quickInfo?.displayParts?.map(p => p.text).join("").replace(/\s+/g, " ");
}

describe("macro-built doc types in a hover signature", () => {
    it("prints each union member's path, not the macro or a `+`", () => {
        expect(hover(" * @param {STD_ITEM} ob - item\n * @param {STD_LIVING | STD_ROOM} env - env", "object ob, object env"))
            .toBe(`function varargs void stamp("/std/item" ob, "/std/living" | "/std/room" env)`);
    });

    it("prints the paths when they don't resolve to objects", () => {
        expect(hover(" * @param {STD_LIVING | STD_ROOM} env - env", "object env", false))
            .toBe(`function varargs void stamp("/std/living" | "/std/room" env)`);
    });

    it("folds an implied concatenation written inline in a union", () => {
        expect(hover(` * @param {"/std/" "living" | "/std/room"} env - env`, "object env"))
            .toBe(`function varargs void stamp("/std/living" | "/std/room" env)`);
    });

    it("prints the path of an array element type", () => {
        expect(hover(" * @param {STD_ROOM*} rooms - rooms", "object *rooms"))
            .toBe(`function varargs void stamp("/std/room"* rooms)`);
    });
});
