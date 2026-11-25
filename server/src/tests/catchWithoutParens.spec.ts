import * as lpc from "./_namespaces/lpc.js";
import { codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * `catch` must be followed by `(`, or by a block in FluffOS (LDMud prolang.y and FluffOS
 * grammar.y, the `catch` rule). Without either, it used to leave a node with no expression
 * and no block, and checking it crashed (#457).
 */

function diagnostics(source: string, driverType: lpc.LanguageVariant): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType, diagnostics: true });
    return [...ls.getSyntacticDiagnostics(abs("test.c")), ...ls.getSemanticDiagnostics(abs("test.c"))].map(codeAndMessage);
}

describe.each([
    ["LDMud", lpc.LanguageVariant.LDMud],
    ["FluffOS", lpc.LanguageVariant.FluffOS],
] as const)("catch without parentheses (%s)", (_name, driver) => {
    const missingParen = ["1005: '(' expected."];

    it.each([
        ["a statement", `void f() { catch; }\n`],
        ["an initialiser", `void f() { mixed e = catch; }\n`],
        ["the end of the file", `void f() { catch`],
        ["a word on its own line", `catch\n`],
    ])("reports a missing '(' in %s instead of crashing", (_where, source) => {
        expect(diagnostics(source, driver)).toEqual(missingParen);
    });

    it("reports a missing '(' before a name", () => {
        expect(diagnostics(`void f() { catch x; }\n`, driver)).toContain(missingParen[0]);
    });

    it("still accepts catch(expr) and the block form", () => {
        expect(diagnostics(`void f() { catch(1); mixed e = catch(1); }\n`, driver)).toEqual([]);
        expect(diagnostics(`void f() { catch { int i; }; }\n`, driver)).toEqual([]);
    });
});
