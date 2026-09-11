import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";
import { createTestLanguageService } from "./harness.js";

/**
 * A mapping type nested in the VALUE position of a doc mapping type did not parse:
 * `([ string: ([ string: int ]) ])` reported "'])' expected" at the inner `([`.
 *
 * The key is parsed by parseType() directly, but the values go through
 * parseDelimitedList(TypeArguments, ...), which only admits an element isStartOfType()
 * recognises -- and `([` was not one. The list came back empty and the outer mapping complained,
 * while the same nesting in the key position parsed fine.
 *
 * A doc comment's own parse errors are not reported in the file that owns it, so the error is
 * observed where it does surface: the roll-up on an `#include` of that file.
 */
const cwd = lpc.normalizePath(process.cwd());

function errorsThroughInclude(docType: string): string[] {
    const { ls, abs } = createTestLanguageService({
        "lib/inc/a.c": `/**\n * @type {${docType}}\n */\nmapping m;\n`,
        "lib/main.c": `#include "/inc/a.c"\n`,
    }, {
        driverType: lpc.LanguageVariant.FluffOS,
        diagnostics: true,
        rootDir: lpc.normalizePath(path.join(cwd, "lib")),
    });
    const fileName = abs("lib/main.c");
    return [...ls.getSyntacticDiagnostics(fileName), ...ls.getSemanticDiagnostics(fileName)].flatMap(d => [
        lpc.flattenDiagnosticMessageText(d.messageText, " "),
        ...(d.relatedInformation ?? []).map(r => "  " + lpc.flattenDiagnosticMessageText(r.messageText, " ")),
    ]);
}

describe("mapping type nested in a doc mapping type", () => {
    it("parses in the value position", () => {
        expect(errorsThroughInclude(`([ string: ([ string: int ]) ])`)).toEqual([]);
    });

    it("parses in the value position without spaces before the close", () => {
        expect(errorsThroughInclude(`([ string: ([ string: int ])])`)).toEqual([]);
    });

    it("parses as a later value type", () => {
        expect(errorsThroughInclude(`([ string: int, ([ string: int ]) ])`)).toEqual([]);
    });

    it("parses as an array-of-mapping value", () => {
        expect(errorsThroughInclude(`([ string: ([ string: int ])* ])`)).toEqual([]);
    });

    it("still parses in the key position", () => {
        expect(errorsThroughInclude(`([ ([ string: int ]): int ])`)).toEqual([]);
    });
});
