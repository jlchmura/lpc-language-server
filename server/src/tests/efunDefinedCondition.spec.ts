import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * `#if __EFUN_DEFINED__(name)` (LDMud, lex.c efun_defined) and `#if efun_defined(name)`
 * (FluffOS) are 1 when the driver has the efun, so a mudlib can supply a simul-efun only where
 * the driver lacks one (LP 2.4.5's `#if !__EFUN_DEFINED__(present)`). The server used to take
 * them as 0, which made every such efun look missing.
 */
function diagnosticsFor(source: string, driverType: lpc.LanguageVariant): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType, diagnostics: true });
    return allDiagnostics(ls, abs("test.c")).map(codeAndMessage);
}

describe.each([
    [lpc.LanguageVariant.LDMud, "__EFUN_DEFINED__"],
    [lpc.LanguageVariant.FluffOS, "efun_defined"],
])("%s's %s in #if", (driverType, operator) => {
    it("is 1 for an efun", () => {
        expect(diagnosticsFor(`#if ${operator}(present)\nint a;\n#else\nint a = "no efun";\n#endif\n`, driverType)).toEqual([]);
        expect(diagnosticsFor(`#if !${operator}(present) || 0\nint a = "no efun";\n#endif\n`, driverType)).toEqual([]);
    });

    it("is 0 for a name that is no efun", () => {
        expect(diagnosticsFor(`#if ${operator}(no_such_efun)\nint a = "efun";\n#endif\n#if !${operator}(no_such_efun) && 1\nint b = "missing";\n#endif\n`, driverType)).toEqual([
            "2322: Type 'string' is not assignable to type 'int'.",
        ]);
    });
});

describe("collectEfunNames", () => {
    it("reads the declarations, not the comments, and skips LDMud's obsolete.h", () => {
        const files: Record<string, string> = {
            "/lib/efuns.h": `/** The efun foo(x) is documented here. */\n#include "a.h"\n#include "obsolete.h"\n// bar(1);\nint transfer(object item, object dest);\n`,
            "/lib/a.h": `varargs <int|string>* multi(int a,\n    int b);\nstring * last_instructions(int length, void|int verbose);\n`,
            "/lib/obsolete.h": `void old_efun();\n`,
        };
        const names = lpc.collectEfunNames("/lib/efuns.h", f => files[f]);
        expect([...names].sort()).toEqual(["last_instructions", "multi", "transfer"]);
    });
});
