import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, codeAndMessage, createTestLanguageService, hoverText } from "./harness.js";

/**
 * LDMud's `visible` modifier (lex.c L_VISIBLE): public, but unlike `public` an inheriting
 * program may still make it private. FluffOS has no such keyword, so `visible` is a name there.
 */
function service(files: Record<string, string>, driverType = lpc.LanguageVariant.LDMud) {
    return createTestLanguageService(files, { driverType, diagnostics: true });
}

function diagnosticsFor(files: Record<string, string>, driverType = lpc.LanguageVariant.LDMud): string[] {
    const { ls, abs } = service(files, driverType);
    return Object.keys(files).flatMap(f => allDiagnostics(ls, abs(f)).map(d => `${f} ${codeAndMessage(d)}`));
}

describe("LDMud visible modifier", () => {
    it("parses on a variable and a function", () => {
        expect(diagnosticsFor({ "a.c": `visible mixed var;\nvisible mixed fun() { return var; }\nvisible nomask int g() { return 1; }\n` })).toEqual([]);
    });

    it("parses as an inherit modifier and a default visibility", () => {
        expect(diagnosticsFor({
            "a.c": `int f() { return 1; }\n`,
            "b.c": `visible inherit "a";\ndefault visible functions;\nint g() { return f(); }\n`,
        })).toEqual([]);
    });

    it("leaves a visible function callable by an inheriting program", () => {
        expect(diagnosticsFor({
            "a.c": `visible int f() { return 1; }\n`,
            "b.c": `inherit "a";\nint g() { return f() + a::f(); }\n`,
        })).toEqual([]);
    });

    it("shows the modifier on hover", () => {
        const source = `visible int fun() { return 1; }\n`;
        const { ls, abs } = service({ "a.c": source });
        expect(hoverText(ls, abs("a.c"), source.indexOf("fun"))).toContain("visible");
    });
});

describe("FluffOS has no visible modifier", () => {
    it("reads visible as a name", () => {
        expect(diagnosticsFor({ "a.c": `int visible;\nint f() { return visible; }\n` }, lpc.LanguageVariant.FluffOS)).toEqual([]);
    });
});
