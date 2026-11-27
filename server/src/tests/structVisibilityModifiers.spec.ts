import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * LDMud gives a struct a visibility, `private struct s { ... };` (t-language/ti-private-struct.c),
 * and rejects only `static` and `varargs` on one (prolang.y, define_struct: "Can't declare a
 * struct as static"). FluffOS's class_header takes a type_modifier_list and ignores it.
 */
function diagnosticsFor(source: string, driverType = lpc.LanguageVariant.LDMud): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType, diagnostics: true });
    return allDiagnostics(ls, abs("test.c")).map(codeAndMessage);
}

describe("modifiers on an LDMud struct", () => {
    it("accepts a visibility", () => {
        expect(diagnosticsFor(`private struct P\n{\n    int x;\n};\nprotected struct Q { int y; };\npublic struct R { int z; };\nvisible struct V { int w; };\nnomask struct N { int n; };\n`)).toEqual([]);
    });

    it("still uses a private struct in its own program", () => {
        expect(diagnosticsFor(`private struct s { int member; };\npublic struct s sv = (<s> 42);\nint f() { return sv.member; }\n`)).toEqual([]);
    });

    it("rejects static and varargs", () => {
        expect(diagnosticsFor(`static struct P { int x; };\n`)).toEqual(["1184: Modifiers cannot appear here."]);
        expect(diagnosticsFor(`varargs struct Q { int y; };\n`)).toEqual(["1184: Modifiers cannot appear here."]);
    });
});

describe("modifiers on a FluffOS class", () => {
    it("accepts them", () => {
        expect(diagnosticsFor(`private class P { int x; }\n`, lpc.LanguageVariant.FluffOS)).toEqual([]);
    });
});
