import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, createTestLanguageService, LIB_ROOT } from "./harness.js";

/**
 * An error on a node from a macro expansion goes on the macro's use. It used to go on the first
 * node outside any macro: for `CFG->fn();`, where each node up to the statement starts at the
 * macro, that was the whole enclosing block.
 */
function spans(source: string, driverType: lpc.LanguageVariant, configDefines?: Record<string, string>): string[] {
    const { ls, abs } = createTestLanguageService({ "a.c": source }, { driverType, diagnostics: true, configDefines });
    return ls.getSemanticDiagnostics(abs("a.c")).map(d => `${d.code} ${source.slice(d.start!, d.start! + d.length!)}`);
}

describe.each([
    ["LDMud", lpc.LanguageVariant.LDMud],
    ["FluffOS", lpc.LanguageVariant.FluffOS],
] as const)("an error in a macro expansion (%s)", (_, driverType) => {
    it("is on a config define's use", () => {
        expect(spans(`void f()\n{\n    CFG->check_test();\n}\n`, driverType, { CFG: `"/nope/other"` })).toContain("2307 CFG");
    });

    it("is on a #define's use", () => {
        expect(spans(`#define DEF "/nope/def"\nvoid f()\n{\n    DEF->check_test();\n}\n`, driverType)).toContain("2307 DEF");
    });

    it("is on a function-like macro's use", () => {
        expect(spans(`#define OB(x) "/nope/" x\nvoid f()\n{\n    OB("y")->check_test();\n}\n`, driverType).filter(s => s.startsWith("2307"))).toEqual([`2307 OB("y")`]);
    });

    it("leaves an error outside the macro where it was", () => {
        expect(spans(`#define DEF "/nope/def"\nvoid f()\n{\n    int i = DEF;\n}\n`, driverType)).toEqual(["2322 i"]);
    });

    it("is on the use of a macro an include defines, in the including file", () => {
        const source = `#include "/defs.h"\nvoid f()\n{\n    DEF->check_test();\n    BAD;\n}\n`;
        const { ls, abs } = createTestLanguageService(
            { "lib/a.c": source, "lib/defs.h": `#define DEF "/nope/def"\n#define BAD nope_var + 1\n` },
            { driverType, diagnostics: true, rootDir: LIB_ROOT },
        );
        const found = allDiagnostics(ls, abs("lib/a.c")).map(d => `${d.code} ${d.file?.fileName.split("/").pop()} ${source.slice(d.start!, d.start! + d.length!)}`);
        expect(found).toContain("2307 a.c DEF");
        expect(found).toContain("2304 a.c BAD");
    });
});
