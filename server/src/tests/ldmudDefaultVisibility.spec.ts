import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * LDMud's `default` visibility (doc/LPC/modifiers, prolang.y default_visibility) applies to the
 * functions, variables and structs declared after it that have no visibility of their own,
 * until the next `default`. A kind the statement doesn't name goes back to public. It used to be
 * parsed and ignored.
 */
function diagnosticsFor(base: string, source: string): string[] {
    const { ls, abs } = createTestLanguageService({ "base.c": base, "test.c": `inherit "/base";\n${source}` }, { driverType: lpc.LanguageVariant.LDMud, diagnostics: true });
    return allDiagnostics(ls, abs("test.c")).map(codeAndMessage);
}

describe("LDMud default visibility", () => {
    it("makes the functions after it private, unless they say otherwise", () => {
        expect(diagnosticsFor(
            `default private functions;\nint hidden() { return 1; }\npublic int shown() { return 2; }\nint var1;\ndefault public;\nint later() { return 3; }\n`,
            `int f() { return hidden() + shown() + later() + var1; }\n`,
        )).toEqual(["2304: Cannot find name 'hidden'."]);
    });

    it("applies to every kind when it names none", () => {
        expect(diagnosticsFor(`default private;\nint var1;\nint fn() { return 1; }\nvisible int var2;\n`, `int f() { return var1 + fn() + var2; }\n`)).toEqual([
            "2304: Cannot find name 'var1'.",
            "2304: Cannot find name 'fn'.",
        ]);
    });

    it("gives each kind its own list", () => {
        expect(diagnosticsFor(`default private variables public functions;\nint var1;\nint fn() { return 1; }\n`, `int f() { return var1 + fn(); }\n`)).toEqual([
            "2304: Cannot find name 'var1'.",
        ]);
    });

    it("leaves the program's own use of its members and locals alone", () => {
        const { ls, abs } = createTestLanguageService({ "base.c": `default private;\nint var1;\nint fn() { int local = var1; return local; }\nint g() { return fn(); }\n` }, { driverType: lpc.LanguageVariant.LDMud, diagnostics: true });
        expect(allDiagnostics(ls, abs("base.c")).map(codeAndMessage)).toEqual([]);
    });
});
