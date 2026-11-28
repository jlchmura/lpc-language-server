import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * `__FILE__` and `__DIR__` name the file from the mudlib root, as the drivers do: "/obj/a.c"
 * and "/obj/" (LDMud lex.c get_current_file/get_current_dir, FluffOS lex.cc start_new_file).
 * They expanded to the file's path on disk, so `#include __DIR__"b.c"` -- a common way for a
 * simul-efun object to pull in its parts -- could not be found, and nothing in the included
 * file was defined.
 */
const drivers = [
    ["LDMud", lpc.LanguageVariant.LDMud],
    ["FluffOS", lpc.LanguageVariant.FluffOS],
] as const;

describe.each(drivers)("__FILE__ and __DIR__ (%s)", (_name, driverType) => {
    function diagnosticsFor(files: Record<string, string>, file = "obj/a.c", options: Partial<lpc.CompilerOptions> = {}): string[] {
        const { ls, abs } = createTestLanguageService(files, { driverType, diagnostics: true, ...options });
        return allDiagnostics(ls, abs(file)).map(codeAndMessage);
    }

    it("name the file from the mudlib root", () => {
        expect(diagnosticsFor({ "obj/a.c": `int f() { return __FILE__ == "x" || __DIR__ == "x"; }` })).toEqual([
            `2367: This comparison appears to be unintentional because the types '"/obj/a.c"' and '"x"' have no overlap.`,
            `2367: This comparison appears to be unintentional because the types '"/obj/"' and '"x"' have no overlap.`,
        ]);
    });

    it("let an #include name a file next to this one", () => {
        expect(diagnosticsFor({
            "obj/a.c": `#include __DIR__"b.c"\nvoid g() { f(); }`,
            "obj/b.c": `void f() {}`,
        })).toEqual([]);
    });

    it("define a simul-efun through an #include __DIR__ in the simul-efun object", () => {
        expect(diagnosticsFor({
            "obj/sefun.c": `#include __DIR__"sefun/ip.c"\n`,
            "obj/sefun/ip.c": `public string lookup_ip(string|object ob) { return ""; }\n`,
            "test.c": `void f() { string s = lookup_ip("1.2.3.4"); }`,
        }, "test.c")).toEqual([]);
    });
});

describe("__FILE__ and __DIR__ in LDMud's compat mode", () => {
    it("have no leading slash", () => {
        const { ls, abs } = createTestLanguageService(
            { "obj/a.c": `int f() { return __FILE__ == "x" || __DIR__ == "x"; }` },
            { driverType: lpc.LanguageVariant.LDMud, diagnostics: true, driverCompatMode: true },
        );
        expect(allDiagnostics(ls, abs("obj/a.c")).map(codeAndMessage)).toEqual([
            `2367: This comparison appears to be unintentional because the types '"obj/a.c"' and '"x"' have no overlap.`,
            `2367: This comparison appears to be unintentional because the types '"obj/"' and '"x"' have no overlap.`,
        ]);
    });
});
