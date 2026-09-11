import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";
import { createTestLanguageService } from "./harness.js";

/**
 * A named object type (`object "/std/living/player"`) parses its path with the full
 * expression parser. `*` binds as a multiply operator there, so the LPC array marker in
 * `object "/std/living/player"*` was swallowed as the start of a multiplication: the type
 * came back as plain `object*` with the path discarded, and the parser left a bogus
 * "Expression expected" on the `}` that closes the doc type.
 *
 * That error is invisible in the file that owns the doc comment -- it only surfaces once
 * the file is `#include`d, rolled up onto the include directive -- which is why an entire
 * mudlib simul_efun reported errors that could not be found in the file itself.
 */
const cwd = lpc.normalizePath(process.cwd());

const player = `int is_player() { return 1; }\n`;
const defines =
    `#define DIR_STD_LIVING "/std/living/"\n` +
    `#define STD_PLAYER DIR_STD_LIVING "player"\n`;

function service(files: Record<string, string>) {
    return createTestLanguageService(files, {
        driverType: lpc.LanguageVariant.FluffOS,
        diagnostics: true,
        rootDir: lpc.normalizePath(path.join(cwd, "lib")),
    });
}

/** Diagnostics for `lib/main.c`, flattened together with any include roll-up detail. */
function diagnosticsOf(files: Record<string, string>): string[] {
    const { ls, abs } = service(files);
    const fileName = abs("lib/main.c");
    const out: string[] = [];
    for (const d of [...ls.getSyntacticDiagnostics(fileName), ...ls.getSemanticDiagnostics(fileName)]) {
        out.push(lpc.flattenDiagnosticMessageText(d.messageText, " "));
        for (const related of d.relatedInformation ?? []) {
            out.push(lpc.flattenDiagnosticMessageText(related.messageText, " "));
        }
    }
    return out;
}

/** Hover text for the function declared in `lib/main.c`. */
function returnTypeOf(main: string): string | undefined {
    const { ls, abs } = service({ "lib/std/living/player.c": player, "lib/main.c": main });
    const quickInfo = ls.getQuickInfoAtPosition(abs("lib/main.c"), main.indexOf("players()"));
    return quickInfo?.displayParts?.map(p => p.text).join("").replace(/\s+/g, " ");
}

const returnsDoc = (type: string) => `/**\n * @returns {${type}} the players\n */\nobject *players() { return ({}); }\n`;

describe("named object type with an array marker", () => {
    it("keeps the path when the marker follows a literal", () => {
        expect(returnTypeOf(returnsDoc(`object "/std/living/player"*`)))
            .toBe(`function object "/std/living/player"* players()`);
    });

    it("keeps the path when the marker is separated by a space", () => {
        expect(returnTypeOf(returnsDoc(`object "/std/living/player" *`)))
            .toBe(`function object "/std/living/player"* players()`);
    });

    it("reports no error when the path comes from a concatenating macro", () => {
        expect(diagnosticsOf({
            "lib/std/living/player.c": player,
            "lib/main.c": defines + returnsDoc(`object STD_PLAYER*`),
        })).toEqual([]);
    });

    it("reports no error on the include that pulls in the doc comment", () => {
        expect(diagnosticsOf({
            "lib/std/living/player.c": player,
            "lib/sefun/object.c": returnsDoc(`object STD_PLAYER*`),
            "lib/main.c": defines + `#include "/sefun/object.c"\n`,
        })).toEqual([]);
    });
});
