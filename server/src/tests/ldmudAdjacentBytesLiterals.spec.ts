import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, codeAndMessage, createTestLanguageService } from "./harness.js";

/** LDMud's lexer joins adjacent bytes literals into one, as it does strings (t-0000432). */
function diagnosticsFor(source: string): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType: lpc.LanguageVariant.LDMud, diagnostics: true });
    return allDiagnostics(ls, abs("test.c")).map(codeAndMessage);
}

describe("adjacent LDMud bytes literals", () => {
    it("are one bytes value", () => {
        expect(diagnosticsFor(`int f() {\n    bytes b = b"\\x00\\x01" b"\\x02";\n    return b"\\x00\\x01" b"\\x02\\x03" == to_bytes(({ 0, 1, 2, 3 }));\n}\n`)).toEqual([]);
        expect(diagnosticsFor(`void f() { string s = b"a" b"b" b"c"; }\n`)).toEqual([
            "2322: Type 'bytes' is not assignable to type 'string'.",
        ]);
    });

    it("leave adjacent strings alone", () => {
        expect(diagnosticsFor(`void f() { string s = "a" "b"; bytes b = "a" "b"; }\n`)).toEqual([
            "2322: Type 'string' is not assignable to type 'bytes'.",
        ]);
    });
});
