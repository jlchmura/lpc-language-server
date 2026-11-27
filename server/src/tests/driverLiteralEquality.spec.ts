import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * A driver compares the types of `==` / `!=` operands, `string` with `string`, not their
 * literal values, so comparing two different literals compiles (t-0000669/unpriv.c, where a
 * macro compares its string argument with others). Strict mode still reports it.
 */
function diagnosticsFor(source: string, driverType: lpc.LanguageVariant, typeChecking: lpc.TypeCheckingMode): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType, diagnostics: true, typeChecking });
    return allDiagnostics(ls, abs("test.c")).map(codeAndMessage);
}

const literals = `#define CHECK(result) if (result == "lfun") n++; else if (result != "inh") n--;\nint f() {\n    int n;\n    CHECK("inh");\n    CHECK("efun");\n    return n + ("a" == "b") + (1 == 2);\n}\n`;
const narrowed = `int f() {\n    string res = "sefun";\n    return res == "lfun";\n}\n`;

describe.each([
    ["LDMud", lpc.LanguageVariant.LDMud],
    ["FluffOS", lpc.LanguageVariant.FluffOS],
] as const)("comparing literals (%s)", (_, driverType) => {
    it("is not an error in driver mode", () => {
        expect(diagnosticsFor(literals, driverType, "driver")).toEqual([]);
        expect(diagnosticsFor(narrowed, driverType, "driver")).toEqual([]);
    });

    it("still reports types with nothing in common in driver mode", () => {
        expect(diagnosticsFor(`int f(string s) { return s == 1; }\n`, driverType, "driver").map(d => d.slice(0, 5))).toEqual(["2367:"]);
    });

    it("is still reported in strict mode", () => {
        expect(diagnosticsFor(`int f() { return "a" == "b"; }\n`, driverType, "strict")).toEqual([
            `2367: This comparison appears to be unintentional because the types '"a"' and '"b"' have no overlap.`,
        ]);
    });

    it("keeps 0 comparable with any type in driver mode", () => {
        expect(diagnosticsFor(`int f(string s, object o, int *a) { return s == 0 || o != 0 || a == 0 || 0 == s; }\n`, driverType, "driver")).toEqual([]);
    });
});
