import * as fs from "node:fs";
import * as path from "node:path";
import { createTestLanguageService } from "./harness.js";
import * as lpc from "./_namespaces/lpc.js";

/**
 * Macros must appear in completions regardless of where they were defined.
 *
 * A `#include` is inlined as a *nested* statement list under the include directive, so
 * macros from headers are not top-level statements of the file. `getMacroSymbols` used
 * to scan only `file.statements`, which found same-file `#define`s but silently missed
 * every macro coming from an include.
 *
 * Includes are resolved through the real filesystem (the program's file handler uses
 * `sys.fileExists`), so this fixture writes actual files to a temp directory rather than
 * using the in-memory host.
 */
const dirName = ".tmp-macro-completions";
const dirAbs = lpc.normalizePath(path.join(process.cwd(), dirName));

const header = `#ifndef DEFS_H
#define DEFS_H
#define HDR_ALPHA 1
#define HDR_BETA "beta"
#endif
`;

const main = `#include "defs.h"

#define LOCAL_GAMMA 3

test() {
    int x = 0;
    return x;
}
`;

describe("macro completions", () => {
    beforeAll(() => {
        fs.mkdirSync(dirAbs, { recursive: true });
        fs.writeFileSync(path.join(dirAbs, "defs.h"), header);
        fs.writeFileSync(path.join(dirAbs, "main.c"), main);
    });
    afterAll(() => {
        fs.rmSync(dirAbs, { recursive: true, force: true });
    });

    function completionNames(): string[] {
        const rel = `${dirName}/main.c`;
        const { ls, abs } = createTestLanguageService({ [rel]: main });
        const position = main.indexOf("return x;");
        const completions = ls.getCompletionsAtPosition(abs(rel), position, /*options*/ undefined as any);
        return (completions?.entries ?? []).map(e => e.name);
    }

    it("includes a macro defined in the same file", () => {
        expect(completionNames()).toContain("LOCAL_GAMMA");
    });

    it("includes macros pulled in from an #include", () => {
        const names = completionNames();
        expect(names).toContain("HDR_ALPHA");
        expect(names).toContain("HDR_BETA");
    });

    it("does not duplicate macro entries", () => {
        const macroNames = completionNames().filter(n => n === "HDR_ALPHA" || n === "LOCAL_GAMMA");
        expect(macroNames.length).toEqual(2);
    });
});
