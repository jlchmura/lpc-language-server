import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService, LIB_ROOT } from "./harness.js";

/**
 * What an `#include` reports about the file it pulls in (#448, #449). The include's code is
 * checked in the including file's context, so its diagnostics belong to that check alone: not
 * to the same file checked as a root, and not to some other file that includes it. LDMud 3.6.7
 * agrees on the cases from the issues: main.c in #448 loads, frag.c on its own does not, and an
 * include with only a missing-return warning loads with the warning.
 */

const LDMud = lpc.LanguageVariant.LDMud;

const name = (file: lpc.SourceFileBase | undefined) => file && lpc.getBaseFileName(file.fileName);
const short = (d: lpc.Diagnostic | lpc.DiagnosticRelatedInformation) => `${name(d.file)}:${d.code}`;

/** Each file's semantic diagnostics, checking the files in `order`, as `file:code [related]`. */
function check(files: Record<string, string>, order: string[], options: Partial<lpc.CompilerOptions> = {}): string[][] {
    const { ls, abs } = createTestLanguageService(files, { driverType: LDMud, diagnostics: true, rootDir: LIB_ROOT, ...options });
    return order.map(f => ls.getSemanticDiagnostics(abs(f)).map(d => short(d) + (d.relatedInformation?.length ? ` [${d.relatedInformation.map(short).join(", ")}]` : "")));
}

describe("an #include's diagnostics come from the including file's own check (#448)", () => {
    // frag.c uses a variable main.c declares: an error on its own, fine where it is included.
    const files = {
        "lib/main.c": `int counter;\n#include "/frag.c"\n`,
        "lib/frag.c": `int bump() { return ++counter; }\n`,
    };

    it("does not report the include when the file was checked first on its own", () => {
        expect(check(files, ["lib/frag.c", "lib/main.c"])).toEqual([["frag.c:2304"], []]);
        expect(check(files, ["lib/main.c", "lib/frag.c"])).toEqual([[], ["frag.c:2304"]]);
    });

    it("keeps an error that exists only in the includer's context out of the file's own list", () => {
        const ctx = {
            "lib/main.c": `string counter;\n#include "/frag.c"\n`,
            "lib/frag.c": `int bump() { return counter * 2; }\n`,
        };
        for (const order of [["lib/main.c", "lib/frag.c"], ["lib/frag.c", "lib/main.c"]]) {
            const [main, frag] = order[0] === "lib/main.c" ? check(ctx, order) : check(ctx, order).reverse();
            expect(main).toEqual(["main.c:9025 [frag.c:2322]"]);
            expect(frag).toEqual(["frag.c:2304"]);
        }
    });

    it("reports a header's error on every file that includes it", () => {
        const two = {
            "lib/a.c": `#include "/bad.h"\n`,
            "lib/b.c": `#include "/bad.h"\n`,
            "lib/bad.h": `int f() { return undefined_x; }\n`,
        };
        expect(check(two, ["lib/a.c", "lib/b.c"])).toEqual([["a.c:9025 [bad.h:2552]"], ["b.c:9025 [bad.h:2552]"]]);
    });

    it("reports an error in a nested include on the top-level #include", () => {
        const nested = {
            "lib/main.c": `#include "/outer.h"\n`,
            "lib/outer.h": `#include "/inner.h"\n`,
            "lib/inner.h": `int f() { return undefined_x; }\n`,
        };
        expect(check(nested, ["lib/main.c"])).toEqual([["main.c:9025 [inner.h:2552]"]]);
    });

    it("gives the same answer when asked twice", () => {
        const twice = { "lib/main.c": `#include "/bad.h"\n`, "lib/bad.h": `int f() { return undefined_x; }\n` };
        expect(check(twice, ["lib/main.c", "lib/main.c"])).toEqual([["main.c:9025 [bad.h:2552]"], ["main.c:9025 [bad.h:2552]"]]);
    });
});

describe("an #include with only warnings (#449)", () => {
    const files = { "lib/main.c": `#include "/w.c"\n`, "lib/w.c": `int nr() { }\n` };

    it("is a warning, not an error, and lists each warning once", () => {
        expect(check(files, ["lib/main.c", "lib/w.c"])).toEqual([["main.c:9080 [w.c:2355]"], ["w.c:2355"]]);
        expect(check(files, ["lib/w.c", "lib/main.c"])).toEqual([["w.c:2355"], ["main.c:9080 [w.c:2355]"]]);
    });

    it("is still an error when the include has an error as well", () => {
        const mixed = { "lib/main.c": `#include "/m.c"\n`, "lib/m.c": `int nr() { }\nint f() { return undefined_x; }\n` };
        const [main] = check(mixed, ["lib/main.c"]);
        expect(main).toHaveLength(1);
        expect(main[0]).toMatch(/^main\.c:9025 \[/);
        expect(main[0]).toContain("m.c:2355");
        expect(main[0]).toContain("m.c:2552");
    });

    it("reports nothing for a header without problems", () => {
        expect(check({ "lib/main.c": `#include "/ok.h"\n`, "lib/ok.h": `int f() { return 1; }\n` }, ["lib/main.c"])).toEqual([[]]);
    });
});
