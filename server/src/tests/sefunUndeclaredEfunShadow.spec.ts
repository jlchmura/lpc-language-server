import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService, testFilePath } from "./harness.js";

/**
 * End-to-end regression for the "phantom simul_efun shadows a real efun" bug.
 *
 * A simul_efun object #includes an implementation file (mirroring the real lib's
 * string.lpc) that uses an inline `function(...)` expression and later calls the
 * `error()` efun. When the parser mis-handled the inline function, the enclosing
 * function collapsed and the trailing `error("...")` call was mis-parsed as a
 * top-level function declaration. That fabricated declaration became a member of
 * the simul_efun object and overrode the real `void error(string)` efun in the
 * global scope, so every `error("...")` call across the lib was then checked
 * against the fabricated declaration's argument literal:
 *
 *     Argument of type '"..."' is not assignable to parameter of type
 *     '"Gobbledygook in string.\n"'.
 */
function createLanguageService(files: Record<string, string>, sefunRelPath: string) {
    return createTestLanguageService(files, { sefunFile: testFilePath(sefunRelPath) });
}

// Condensed from the mudlib's from_string(): an inline function early in the
// body, then a fall-through error() call with a distinctive literal.
const stringImpl =
    `varargs mixed from_string(string str, int flag) {\n` +
    `    if(!str || str == "")\n` +
    `        return 0;\n` +
    `    str = implode(map(explode(str, "\\n"), function(string line) {\n` +
    `        return trim(line);\n` +
    `    }), "\\n");\n` +
    `    error("Gobbledygook in string.\\n");\n` +
    `}\n`;

// The simul_efun object pulls in its implementation via #include, like the real
// /adm/obj/simul_efun.lpc.
const sefunObject = `#include "string_impl.c"\n`;

// An ordinary lib file that also calls the error() efun with its own literal.
const consumer =
    `void act() {\n` +
    `    error("Bad argument 1 to local_target().\\n");\n` +
    `}\n`;

const files = {
    "string_impl.c": stringImpl,
    "simul_efun.c": sefunObject,
    "consumer.c": consumer,
};

describe("simul_efun with an inline function does not shadow the error() efun", () => {
    it("produces no 'not assignable' diagnostics for error() calls", () => {
        const { ls, abs } = createLanguageService(files, "simul_efun.c");
        const diags = [
            ...ls.getSemanticDiagnostics(abs("consumer.c")),
            ...ls.getSemanticDiagnostics(abs("string_impl.c")),
        ].map(d => lpc.flattenDiagnosticMessageText(d.messageText, "\n"));

        expect(diags.filter(m => m.includes("is not assignable"))).toEqual([]);
    });

    it("resolves error() to the driver efun void error(string)", () => {
        const { ls, abs } = createLanguageService(files, "simul_efun.c");
        const qi = ls.getQuickInfoAtPosition(abs("consumer.c"), consumer.indexOf("error("));
        const display = qi?.displayParts?.map(p => p.text).join("") ?? "";

        expect(display).toContain("void");
        expect(display).toContain("error");
        expect(display).toContain("string");
        // Not the phantom fabricated from a call argument.
        expect(display).not.toContain("mixed");
        expect(display).not.toContain("Gobbledygook");
    });
});
