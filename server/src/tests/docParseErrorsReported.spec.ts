import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";
import { createTestLanguageService } from "./harness.js";

/**
 * A parse error inside a doc comment was dropped from the file that owns the comment.
 *
 * The doc parser runs inside `scanner.scanRange()`, which blanked the scanner's file name for
 * the length of the scan, so every diagnostic raised there was stamped `""`. The owning file's
 * list goes through `attachFileToDiagnostics()`, which keeps only diagnostics whose file name
 * matches their source file -- and `""` matches nothing. The same error still reached an
 * includer's roll-up, because that path keys on which `#include` was being parsed, not on file
 * name. So an include reported an error its own file never showed, and a file nothing includes
 * showed its doc errors nowhere, while the unparsed type silently took effect.
 */
const cwd = lpc.normalizePath(process.cwd());

const badDoc = `/**\n * @returns {({ string, string })} pair\n */\nstring *f() { return ({}); }\n`;

interface Reported { message: string; line: number; related: { message: string; file: string | undefined }[] }

function diagnosticsOf(files: Record<string, string>, target: string): Reported[] {
    const { ls, abs } = createTestLanguageService(files, {
        driverType: lpc.LanguageVariant.FluffOS,
        diagnostics: true,
        rootDir: lpc.normalizePath(path.join(cwd, "lib")),
    });
    const fileName = abs(target);
    return [...ls.getSyntacticDiagnostics(fileName), ...ls.getSemanticDiagnostics(fileName)].map(d => ({
        message: lpc.flattenDiagnosticMessageText(d.messageText, " "),
        line: d.file && d.start !== undefined ? lpc.getLineAndCharacterOfPosition(d.file, d.start).line + 1 : -1,
        related: (d.relatedInformation ?? []).map(r => ({
            message: lpc.flattenDiagnosticMessageText(r.messageText, " "),
            file: r.file ? path.basename(r.file.fileName) : undefined,
        })),
    }));
}

describe("parse errors inside a doc comment", () => {
    it("are reported in the file that owns the comment", () => {
        expect(diagnosticsOf({ "lib/a.c": badDoc }, "lib/a.c"))
            .toEqual([{ message: "Type expected.", line: 2, related: [] }]);
    });

    it("are reported on an included file when it is checked directly", () => {
        const files = { "lib/inc/a.c": badDoc, "lib/main.c": `#include "/inc/a.c"\n` };
        expect(diagnosticsOf(files, "lib/inc/a.c"))
            .toEqual([{ message: "Type expected.", line: 2, related: [] }]);
    });

    it("still roll up onto the #include that pulls the file in, pointing at the included file", () => {
        // Before the fix the detail carried no file -- the roll-up only attaches one when the
        // diagnostic's file name matches the include's -- so it could not be navigated to.
        const files = { "lib/inc/a.c": badDoc, "lib/main.c": `#include "/inc/a.c"\n` };
        expect(diagnosticsOf(files, "lib/main.c")).toEqual([{
            message: "Include file '/inc/a.c' contains one or more errors.",
            line: 1,
            related: [{ message: "Type expected.", file: "a.c" }],
        }]);
    });
});
