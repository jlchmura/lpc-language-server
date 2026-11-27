import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * LDMud's map() and filter() take bytes as well (func_spec: `mapping|mixed *|string|bytes`) and
 * return bytes for them (t-0000432/master.c, "map with bytes", "filter with bytes").
 */
function diagnosticsFor(source: string, typeChecking: lpc.TypeCheckingMode = "strict"): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType: lpc.LanguageVariant.LDMud, diagnostics: true, typeChecking });
    return allDiagnostics(ls, abs("test.c")).map(codeAndMessage);
}

describe.each(["strict", "driver"] as const)("map() and filter() on bytes (%s mode)", mode => {
    it("return bytes", () => {
        expect(diagnosticsFor(`int f() {
    bytes str = map(b"LDMud", #'+, 128);
    bytes kept = filter(b"-> abc <-", function int(int ch) { return ch > 96; });
    bytes through = map(b"ab", ([ 'a': 'b' ]));
    return sizeof(str) + sizeof(kept) + sizeof(through);
}
`, mode)).toEqual([]);
    });

    it("pass each byte as an int", () => {
        expect(diagnosticsFor(`bytes f() { return map(b"ab", function int(int ch) { return ch + 1; }); }\n`, mode)).toEqual([]);
    });
});

describe("map() and filter() on bytes", () => {
    it("type their result as bytes", () => {
        expect(diagnosticsFor(`void f() { int a = map(b"ab", "fn"); }\n`)).toEqual(["2322: Type 'bytes' is not assignable to type 'int'."]);
        expect(diagnosticsFor(`void f() { mixed *a = filter(b"ab", "fn"); }\n`)).toEqual(["2322: Type 'bytes' is not assignable to type 'mixed*'."]);
    });
});
