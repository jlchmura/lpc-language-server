import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * A local variable is in scope only once its initializer is compiled: LDMud and FluffOS both add
 * it afterwards (FluffOS grammar.y new_local_def, rule_new_local_def_with_init). So in
 * `int x = x - 1;` the initializer reads the outer x (t-language/tl-0000861.c).
 */
function service(source: string, driverType: lpc.LanguageVariant) {
    return createTestLanguageService({ "test.c": source }, { driverType, diagnostics: true });
}

function diagnosticsFor(source: string, driverType: lpc.LanguageVariant): string[] {
    const { ls, abs } = service(source, driverType);
    return allDiagnostics(ls, abs("test.c")).map(codeAndMessage);
}

describe.each([
    ["LDMud", lpc.LanguageVariant.LDMud],
    ["FluffOS", lpc.LanguageVariant.FluffOS],
] as const)("a local's own initializer (%s)", (_, driverType) => {
    it("reads the global of the same name", () => {
        expect(diagnosticsFor(`int x = 42;\nint f() {\n    int x = x - 1;\n    return x;\n}\n`, driverType)).toEqual([]);
    });

    it("reads an outer local of the same name", () => {
        // FluffOS forbids the redeclaration itself; the initializer is not an error
        expect(diagnosticsFor(`int f() {\n    int x = 1;\n    if (x) {\n        int x = x + 1;\n        return x;\n    }\n    return x;\n}\n`, driverType)).toEqual(
            driverType === lpc.LanguageVariant.FluffOS ? ["9052: Illegal to redeclare local name 'x'."] : [],
        );
    });

    it("resolves to the outer declaration", () => {
        const source = `int x = 42;\nint f() {\n    int x = x - 1;\n    return x;\n}\n`;
        const { ls, abs } = service(source, driverType);
        const [def] = ls.getDefinitionAtPosition(abs("test.c"), source.indexOf("x - 1")) ?? [];
        expect(def?.textSpan.start).toBe(source.indexOf("x = 42"));
    });

    it("sees an earlier local in the same declaration", () => {
        expect(diagnosticsFor(`int f() {\n    int a = 1, b = a + 1;\n    return b;\n}\n`, driverType)).toEqual([]);
    });

    it("still reports a name that has no outer declaration", () => {
        expect(diagnosticsFor(`int f() {\n    int y = y + 1;\n    return y;\n}\n`, driverType)).toEqual(["2304: Cannot find name 'y'."]);
    });
});

// t-lvalues.c MAKE_RANGE_TEST: every node from one macro use spans that use, so the scope rule
// must go by the tree, not by position.
describe("a local declared in a macro", () => {
    it("is in scope after its declaration", () => {
        const source = `#define TEST(R) int f() {\\\n    mixed arr = ({ 0, 1, 2 });\\\n    mixed result = arr[R] = ({ 10 });\\\n    return sizeof(arr) + sizeof(result);\\\n}\nTEST(1..2)\n`;
        expect(diagnosticsFor(source, lpc.LanguageVariant.LDMud)).toEqual([]);
        expect(diagnosticsFor(source, lpc.LanguageVariant.FluffOS)).toEqual([]);
    });

    it("still reads the outer variable in its own initializer", () => {
        expect(diagnosticsFor(`int x = 42;\n#define F int f() { int x = x - 1; return x; }\nF\n`, lpc.LanguageVariant.LDMud)).toEqual([]);
    });
});
