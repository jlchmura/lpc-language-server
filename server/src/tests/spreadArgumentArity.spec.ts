import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * An array spread, `f(args...)`, supplies however many arguments the array holds, none
 * included, so it may go to a parameter that is not a rest parameter (t-efuns.c
 * `this_object(({})...)`, t-lvalues.c `sscanf("5 6", "%d %d", args...)`).
 */
function diagnosticsFor(source: string, driverType: lpc.LanguageVariant, typeChecking: lpc.TypeCheckingMode): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType, diagnostics: true, typeChecking });
    return allDiagnostics(ls, abs("test.c")).map(codeAndMessage);
}

describe.each([
    ["LDMud", lpc.LanguageVariant.LDMud],
    ["FluffOS", lpc.LanguageVariant.FluffOS],
] as const)("a spread argument (%s)", (_, driverType) => {
    describe.each(["strict", "driver"] as const)("%s mode", typeChecking => {
        it("may go to a function with fixed parameters", () => {
            expect(diagnosticsFor(`int two(int a, int b) { return a + b; }\nint none() { return 0; }\nint f() {\n    int *args = ({ 1, 2 });\n    return two(args...) + two(1, args...) + none(({})...);\n}\n`, driverType, typeChecking)).toEqual([]);
        });

        it("still reports more fixed arguments than parameters, except in LDMud's driver mode", () => {
            // LDMud 3.6.7 compiles one(1, 2, args...) and drops the extra arguments when it runs
            const ldDriver = driverType === lpc.LanguageVariant.LDMud && typeChecking === "driver";
            expect(diagnosticsFor(`int one(int a) { return a; }\nint f() {\n    int *args = ({ 1 });\n    return one(1, 2, args...);\n}\n`, driverType, typeChecking)).toEqual(
                ldDriver ? [] : ["2554: Expected 1 arguments, but got 2."],
            );
        });
    });
});

describe("a spread argument to an LDMud efun", () => {
    it("may go to this_object() and sscanf()", () => {
        expect(diagnosticsFor(`int f() {\n    mixed *args = ({ 0, 0 });\n    object o = this_object(({})...);\n    return sscanf("5 6", "%d %d", args...);\n}\n`, lpc.LanguageVariant.LDMud, "driver")).toEqual([]);
    });
});
