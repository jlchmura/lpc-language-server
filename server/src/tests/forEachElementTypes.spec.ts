import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * A foreach over a string visits its characters, which are ints, in both drivers; so does one
 * over LDMud bytes. LDMud also counts through an int (`foreach (i : 6)` is 0..5) and visits a
 * struct's member values, which have no one type (doc/LPC/foreach). These used to be typed the
 * TypeScript way, which reported the loop when its variable was declared before it
 * (t-lvalues.c, t-0000152). Checked against LDMud 3.6.7.
 */
function diagnosticsFor(source: string, driverType = lpc.LanguageVariant.LDMud, typeChecking: lpc.TypeCheckingMode = "driver"): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType, diagnostics: true, typeChecking });
    return allDiagnostics(ls, abs("test.c")).map(codeAndMessage);
}

describe.each<lpc.TypeCheckingMode>(["driver", "strict"])("foreach element types (%s)", (typeChecking) => {
    it("count through an int, visit a string's characters and a struct's members (LDMud)", () => {
        expect(diagnosticsFor(`struct T { int a, b; };\nint f() {\n    int sum, a;\n    foreach (a : 10) sum += a;\n    foreach (a : "Hi") sum += a;\n    foreach (a : b"ab") sum += a;\n    foreach (a : (<T> 1, 2)) sum += a;\n    foreach (int c : "Hi") sum += c;\n    return sum;\n}\n`, lpc.LanguageVariant.LDMud, typeChecking)).toEqual([]);
    });

    it("reports a variable that can't hold the element (LDMud)", () => {
        // LDMud: "Wrong variable type to foreach: got string, expected int"
        expect(diagnosticsFor(`void f() { string s; foreach (s : "Hello") ; foreach (s : 10) ; }\n`, lpc.LanguageVariant.LDMud, typeChecking)).toEqual([
            "2322: Type 'int' is not assignable to type 'string'.",
            "2322: Type 'int' is not assignable to type 'string'.",
        ]);
    });

    it("visit a string's characters (FluffOS)", () => {
        expect(diagnosticsFor(`int f() { int sum, c; foreach (c in "Hi") sum += c; return sum; }\n`, lpc.LanguageVariant.FluffOS, typeChecking)).toEqual([]);
    });

    it("does not count through an int in FluffOS", () => {
        expect(diagnosticsFor(`void f() { int a; foreach (a in 10) ; }\n`, lpc.LanguageVariant.FluffOS, typeChecking)).toEqual([
            "2495: Type '10' is not an array type or a string type.",
        ]);
    });
});
