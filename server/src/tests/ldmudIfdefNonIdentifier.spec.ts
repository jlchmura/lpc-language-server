import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService, allDiagnostics } from "./harness.js";

/**
 * LDMud reads the rest of an `#ifdef`/`#ifndef` line as a macro name, whatever it looks like:
 * `#ifdef 3K` is accepted and is simply not defined. The scanner used to report TS1351
 * ("An identifier or keyword cannot immediately follow a numeric literal") for it.
 * `#if` evaluates an expression, so it stays strict.
 */
function diagnosticsFor(source: string): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, {
        driverType: lpc.LanguageVariant.LDMud,
        diagnostics: true,
    });
    return allDiagnostics(ls, abs("test.c"))
        .map(d => d.code + "");
}

describe("#ifdef with a name that isn't an identifier", () => {
    it("accepts #ifdef 3K as not defined", () => {
        expect(diagnosticsFor(`#ifdef 3K\nint x = "not compiled";\n#endif\nint y;\n`)).toEqual([]);
    });

    it("accepts #ifndef 3K as not defined", () => {
        expect(diagnosticsFor(`#ifndef 3K\nint y;\n#else\nint x = "not compiled";\n#endif\n`)).toEqual([]);
    });

    it("still reports 1351 in #if", () => {
        expect(diagnosticsFor(`#if 3K\nint y;\n#endif\n`)).toContain("1351");
    });
});
