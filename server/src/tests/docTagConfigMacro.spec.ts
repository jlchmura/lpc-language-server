import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";
import { createTestLanguageService } from "./harness.js";

/**
 * Doc tag types are surfaced exactly as authored -- `{mixed|undefined}` stays that way rather
 * than collapsing to what it resolves to, because the annotation is the useful thing. See
 * jsdocTagTypes.spec.ts, which pins that contract.
 *
 * Config-injected macros are the exception. `@returns {__LPC_CONFIG_LIBFILES_PLAYER*}` names a
 * path the project settings supply, so unlike a mudlib's own `STD_NPC` the name carries nothing
 * for a reader, and printing it contradicts the signature line above which already shows the
 * resolved type.
 *
 * The substitution is display-only: macros are deliberately not expanded when a doc type is
 * *parsed*, because a mudlib `#define undefined` would clobber the type keyword and swallow
 * every tag that followed (see jsdocMacroTypes.spec.ts).
 */
const cwd = lpc.normalizePath(process.cwd());

function tagsFor(files: Record<string, string>, marker: string, extraOptions?: Partial<lpc.CompilerOptions>): string {
    const { ls, abs } = createTestLanguageService(files, {
        driverType: lpc.LanguageVariant.FluffOS,
        diagnostics: true,
        rootDir: path.join(cwd, "lib"),
        ...extraOptions,
    } as Partial<lpc.CompilerOptions>);
    const source = files["lib/test.c"];
    const tags = ls.getQuickInfoAtPosition(abs("lib/test.c"), source.indexOf(marker))?.tags ?? [];
    return tags.map(t => `@${t.name} ${t.text?.map(x => x.text).join("")}`).join(" ");
}

describe("config-injected macros in doc tag types", () => {
    it("shows the resolved type rather than the macro name", () => {
        // The efun `users()` is declared `@returns {__LPC_CONFIG_LIBFILES_PLAYER*}`.
        const text = tagsFor(
            { "lib/std/user.c": `string query_name() { return "x"; }\n`, "lib/test.c": `void t() { users(); }\n` },
            "users()",
            { playerFile: "/std/user.c" },
        );
        expect(text).not.toContain("__LPC_CONFIG_LIBFILES_PLAYER");
        expect(text).toContain("An array of objects");
    });

    it("leaves an ordinary authored type alone", () => {
        const files = {
            "lib/test.c": `/**\n * plain\n * @param {mixed*} cb - the callback\n * @returns {string*} some strings\n */\nstring *plain(mixed *cb);\n\nvoid t() { plain(0); }\n`,
        };
        const text = tagsFor(files, "plain(0)");
        expect(text).toContain("{string*}");
        expect(text).toContain("{mixed*}");
    });
});
