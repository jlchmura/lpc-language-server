import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * LDMud's `#pragma no_bytes_type` makes `string` mean `<string|bytes>` until `#pragma
 * bytes_type` (doc/LPC/pragma, t-language/tl-pragma_no_bytes_type.c). A function declared in
 * between takes and returns bytes as well as strings.
 */
function diagnosticsFor(source: string, typeChecking: lpc.TypeCheckingMode, driverType = lpc.LanguageVariant.LDMud): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType, diagnostics: true, typeChecking });
    return allDiagnostics(ls, abs("test.c")).map(codeAndMessage);
}

const source = `bytes get_bytes() { return to_bytes("ABC", "ascii"); }
#define bytes string
#pragma no_bytes_type
string duplicate(string val) { return val + val; }
#pragma bytes_type
#undef bytes
int run_test() {
    bytes val1 = get_bytes();
    bytes val2 = duplicate(val1);
    int i = duplicate("a");
    string s = get_bytes();
    return sizeof(val2) == 6;
}
`;

describe("LDMud #pragma no_bytes_type", () => {
    it("makes string mean string|bytes", () => {
        expect(diagnosticsFor(source, "driver")).toEqual([
            "2322: Type 'string | bytes' is not assignable to type 'int'.   Type 'string' is not assignable to type 'int'.",
            "2322: Type 'bytes' is not assignable to type 'string'.",
        ]);
    });

    it("still reports the union where strict mode checks members", () => {
        expect(diagnosticsFor(source, "strict")).toContain(
            "2322: Type 'string | bytes' is not assignable to type 'bytes'.   Type 'string' is not assignable to type 'bytes'.",
        );
    });

    it("is not a FluffOS pragma", () => {
        expect(diagnosticsFor(`#pragma no_bytes_type\nstring f(string s) { return s; }\nvoid g() { int i = f("a"); }\n`, "strict", lpc.LanguageVariant.FluffOS)).toEqual([
            "2322: Type 'string' is not assignable to type 'int'.",
        ]);
    });
});
