import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * LDMud names a member with a string as well as an identifier (prolang.y's call_other_name and
 * struct_member_name): `ob->"fn"()` calls fn, and `s."b"` / `s->"b"` are member b. The string
 * may hold characters an identifier can't, as in t-0000432's `ob->"ρ..."()`. FluffOS
 * takes only an identifier.
 */
function service(files: Record<string, string>, driverType = lpc.LanguageVariant.LDMud) {
    return createTestLanguageService(files, { driverType, diagnostics: true });
}

function diagnosticsFor(source: string, driverType = lpc.LanguageVariant.LDMud): string[] {
    const { ls, abs } = service({ "test.c": source }, driverType);
    return allDiagnostics(ls, abs("test.c")).map(codeAndMessage);
}

describe("an LDMud member named by a string", () => {
    it("reads and writes a struct member", () => {
        expect(diagnosticsFor(`struct S { int a, b; };\nint f() {\n    struct S s = (<S> 1, 2);\n    int x = s."b";\n    s."b" = 55;\n    return x + s->"a";\n}\n`)).toEqual([]);
        expect(diagnosticsFor(`struct S { int a, b; };\nvoid f() { struct S s = (<S> 1, 2); string x = s."b"; int y = s."c"; }\n`)).toEqual([
            "2322: Type 'int' is not assignable to type 'string'.",
            "2339: Property 'c' does not exist on type 'S'.",
        ]);
    });

    it("calls a function in another object", () => {
        const { ls, abs } = service({
            "test.c": `void f() { int n = "/other"->"count"(); string s = "/other"->"count"(); }\n`,
            "other.c": `int count() { return 1; }\n`,
        });
        expect(allDiagnostics(ls, abs("test.c")).map(codeAndMessage)).toEqual([
            "2322: Type 'int' is not assignable to type 'string'.",
        ]);
    });

    it("resolves to the member's declaration", () => {
        const source = `struct S { int a, b; };\nint f(struct S s) { return s."b"; }\n`;
        const { ls, abs } = service({ "test.c": source });
        const [def] = ls.getDefinitionAtPosition(abs("test.c"), source.indexOf(`"b"`) + 1) ?? [];
        expect(def?.textSpan.start).toBe(source.indexOf("b;"));
    });

    it("may hold characters an identifier can't", () => {
        expect(diagnosticsFor(`void f(mixed ob) { ob->"\\u03c1\\u03c9"(); ob->"a b"(1); }\n`)).toEqual([]);
    });

    it("is not FluffOS syntax", () => {
        expect(diagnosticsFor(`void f(object ob) { ob->"fn"(); }\n`, lpc.LanguageVariant.FluffOS)).toContain("1003: Identifier expected.");
    });
});
