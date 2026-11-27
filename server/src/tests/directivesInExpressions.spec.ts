import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * Both drivers preprocess as C does, so a `#define` or `#undef` may start any line, also in the
 * middle of an expression or a list (t-0000432/master.c defines a macro between two elements
 * of an array literal). LDMud 3.6.7 loads each case.
 */
function diagnosticsFor(source: string, driverType: lpc.LanguageVariant): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType, diagnostics: true });
    return allDiagnostics(ls, abs("test.c")).map(codeAndMessage);
}

describe.each([
    ["LDMud", lpc.LanguageVariant.LDMud],
    ["FluffOS", lpc.LanguageVariant.FluffOS],
] as const)("a #define in an expression (%s)", (_, driverType) => {
    it("is read between the elements of an array literal", () => {
        expect(diagnosticsFor(`int *a = ({\n    1,\n#define X 2\n    X,\n});\n`, driverType)).toEqual([]);
    });

    it("is read between the entries of a mapping literal", () => {
        expect(diagnosticsFor(`mapping m = ([\n    "a": 1,\n#define K "b"\n    K: 2,\n]);\n`, driverType)).toEqual([]);
    });

    it("is read between the operands of an operator, and among call arguments", () => {
        expect(diagnosticsFor(`int g(int a, int b) { return a + b; }\nint f() {\n    return 1 +\n#define Z 2\n        Z + g(1,\n#define W 3\n        W);\n}\n`, driverType)).toEqual([]);
    });

    it("is read after the last element", () => {
        expect(diagnosticsFor(`int *a = ({\n    1\n#define Y 2\n});\nint b = Y;\n`, driverType)).toEqual([]);
    });

    it("lets an #undef end a macro", () => {
        expect(diagnosticsFor(`#define Y 1\nint *a = ({\n    Y,\n#undef Y\n    3,\n});\nint b = Y;\n`, driverType)).toEqual(["2304: Cannot find name 'Y'."]);
    });
});
