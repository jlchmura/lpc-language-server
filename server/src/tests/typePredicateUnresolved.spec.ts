import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService } from "./harness.js";

/**
 * A type predicate whose type doesn't resolve must leave its argument alone.
 *
 * The LDMud efun `query_once_interactive()` is declared `@returns {ob is
 * __LPC_CONFIG_LIBFILES_PLAYER}`. A project's player file defaults to `/obj/player.c`, and a
 * mudlib that keeps it elsewhere (and hasn't set `libFiles.player`) has no such object. The
 * predicate's object path then fell back to its string literal type, so the true branch typed
 * `ob` as the string `"/obj/player.c"`. A predicate naming an unknown type was worse: every
 * type is assignable to the error type, so the false branch narrowed `ob` to nothing.
 */
const PLAYER = { "obj/player.c": `int is_player() { return 1; }\n` };

function typesOf(source: string, files: Record<string, string>, markers: string[], driverType = lpc.LanguageVariant.LDMud) {
    const { ls, abs } = createTestLanguageService({ "test.c": source, ...files }, { driverType, diagnostics: true });
    const fileName = abs("test.c");
    return markers.map(m => lpc.displayPartsToString(ls.getQuickInfoAtPosition(fileName, source.indexOf(m))?.displayParts));
}

const efunCall = `void t(object o) {\n    if (query_once_interactive(o)) {\n        o/*T*/;\n        return;\n    }\n    o/*F*/;\n}\n`;

describe("a type predicate whose type doesn't resolve", () => {
    it("still narrows to the player object when the player file exists", () => {
        // The harness sets up the lib root and default player file the way a real config does.
        expect(typesOf(efunCall, PLAYER, ["o/*T*/", "o/*F*/"])).toEqual([
            `(parameter)  object "/obj/player" o`,
            `(parameter)  object o`,
        ]);
    });

    it("leaves the argument as object when the configured player file is missing", () => {
        expect(typesOf(efunCall, {}, ["o/*T*/", "o/*F*/"])).toEqual([
            `(parameter)  object o`,
            `(parameter)  object o`,
        ]);
    });

    it("leaves the argument as object when a doc predicate names a missing object", () => {
        const source = `/** @returns {o is "/std/missing.c"} */\nint fn(object o) { return 1; }\n` +
            `void t(object o) {\n    if (fn(o)) {\n        o/*T*/;\n        return;\n    }\n    o/*F*/;\n}\n`;
        expect(typesOf(source, {}, ["o/*T*/", "o/*F*/"], lpc.LanguageVariant.FluffOS)).toEqual([
            `(parameter)  object o`,
            `(parameter)  object o`,
        ]);
    });

    it("doesn't narrow the false branch to nothing when the predicate names an unknown type", () => {
        const source = `/** @returns {o is NO_SUCH_TYPE} */\nint fn(object o) { return 1; }\n` +
            `void t(object o) {\n    if (fn(o)) {\n        o/*T*/;\n        return;\n    }\n    o/*F*/;\n}\n`;
        expect(typesOf(source, {}, ["o/*T*/", "o/*F*/"], lpc.LanguageVariant.FluffOS)).toEqual([
            `(parameter)  object o`,
            `(parameter)  object o`,
        ]);
    });
});
