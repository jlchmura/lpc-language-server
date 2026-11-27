import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * LDMud lets the value index of a multi-value mapping element carry a `>` bound, as an array
 * index can: `m["b", >-3]` (t-lvalues.c). Only the first index could have one before.
 */
function diagnosticsFor(source: string): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType: lpc.LanguageVariant.LDMud, diagnostics: true });
    return allDiagnostics(ls, abs("test.c")).map(codeAndMessage);
}

describe("an LDMud multi-value mapping index", () => {
    it("takes a > bound on its value index, also as an lvalue", () => {
        expect(diagnosticsFor(`int f() {\n    mapping m = ([ "a": 'a';'a';'a';'a', "b": 'b';'b';'b';'b' ]);\n    int result = m["b", >-3] = 'B';\n    return result + m["a", 1] + m["a", >1];\n}\n`)).toEqual([]);
    });

    it("still checks each index", () => {
        expect(diagnosticsFor(`void f(mapping m) { m["a", >-1] = 1; m["a", >no_such] = 2; }\n`)).toEqual([
            "2304: Cannot find name 'no_such'.",
        ]);
    });
});
