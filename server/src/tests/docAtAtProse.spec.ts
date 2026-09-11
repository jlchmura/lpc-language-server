import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";
import { createTestLanguageService } from "./harness.js";

/**
 * `@@` in a doc comment's prose was read as a tag. A comment describing process_string syntax --
 * "a string starting with @@ to call a function" -- reported "Identifier expected" twice: the doc
 * scanner returned an AtToken for every `@`, and a tag is `@` followed by its name, so `@@` opened
 * a tag with no name, then another. Now an `@` that cannot begin a name is comment text.
 *
 * A doc comment's own parse errors are not reported in the file that owns it, so errors are
 * observed through the roll-up on an `#include` of that file.
 */
const cwd = lpc.normalizePath(process.cwd());

function service(docLines: string[], declaration: string) {
    const doc = `/**\n${docLines.map(l => ` * ${l}`).join("\n")}\n */\n${declaration}\n`;
    const result = createTestLanguageService({ "lib/inc/a.c": doc, "lib/main.c": `#include "/inc/a.c"\n` }, {
        driverType: lpc.LanguageVariant.FluffOS,
        diagnostics: true,
        rootDir: lpc.normalizePath(path.join(cwd, "lib")),
    });
    return { ...result, doc };
}

function errorsThroughInclude(docLines: string[]): string[] {
    const { ls, abs } = service(docLines, "void f(string id) {}");
    const fileName = abs("lib/main.c");
    return [...ls.getSyntacticDiagnostics(fileName), ...ls.getSemanticDiagnostics(fileName)].flatMap(d => [
        lpc.flattenDiagnosticMessageText(d.messageText, " "),
        ...(d.relatedInformation ?? []).map(r => "  " + lpc.flattenDiagnosticMessageText(r.messageText, " ")),
    ]);
}

describe("`@@` in doc comment prose", () => {
    it("is text mid-line", () => {
        expect(errorsThroughInclude(["- A string starting with @@ to call a function in this object"])).toEqual([]);
    });

    it("is text at the start of a line", () => {
        expect(errorsThroughInclude(["@@ is how it is called"])).toEqual([]);
    });

    it("is text inside a tag's own comment", () => {
        expect(errorsThroughInclude(["@param {string} id - either an item id, or", "@@ followed by a function name"])).toEqual([]);
    });

    it("does not stop a later tag from applying", () => {
        const { ls, abs, doc } = service(["Prose with @@ in it.", "@returns {string*} names"], "mixed f() { return ({}); }");
        const hover = ls.getQuickInfoAtPosition(abs("lib/inc/a.c"), doc.indexOf("f()"))?.displayParts?.map(p => p.text).join("");
        expect(hover).toBe("function string* f()");
    });
});
