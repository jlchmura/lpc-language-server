import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService } from "./harness.js";

/**
 * LDMud syntax forms the parser rejected, found by running the server over a whole LDMud 3.6
 * mudlib and checking each report against the driver.
 */
function diagnosticsFor(files: Record<string, string>, main = "test.c", driverType = lpc.LanguageVariant.LDMud): string[] {
    const { ls, abs } = createTestLanguageService(files, {
        driverType,
        diagnostics: true,
    });
    return [...ls.getSyntacticDiagnostics(abs(main)), ...ls.getSemanticDiagnostics(abs(main))]
        .map(d => `${d.code}: ${lpc.flattenDiagnosticMessageText(d.messageText, " ")}`);
}

const one = (source: string) => diagnosticsFor({ "test.c": source });

describe("LDMud inline closure bodies", () => {
    it("accepts ';'-separated expressions", () => {
        expect(one(`int seen; void note(string s) { seen++; }
int f() { return funcall((: note("x"); 5 :)); }`)).toEqual([]);
    });

    it("accepts a trailing ';'", () => {
        expect(one(`void note(string s) {} void f() { funcall((: note("x"); :)); }`)).toEqual([]);
    });

    it("accepts statements after an expression", () => {
        expect(one(`void note(string s) {} mixed f() { return map(({ "a" }), (: note($1); return sizeof($1); :)); }`)).toEqual([]);
    });

    it("accepts a last statement ending at ':)'", () => {
        expect(one(`void note(string s) {} mixed f() { return map(({ "a" }), (: note($1); return sizeof($1) :)); }`)).toEqual([]);
    });

    it("accepts a body starting with a declaration", () => {
        expect(one(`mixed f() { return map(({ 1 }), (: int i = $1; return i + 1; :)); }`)).toEqual([]);
    });
});

describe("LDMud inherits", () => {
    it("resolves virtual inherit", () => {
        expect(diagnosticsFor({
            "test.c": `virtual inherit "base";\nint f() { return base_value(); }`,
            "base.c": `int base_value() { return 1; }`,
        })).toEqual([]);
    });

    it("resolves an inherit after a modifier", () => {
        expect(diagnosticsFor({
            "test.c": `private inherit "base";\nint f() { return base_value(); }`,
            "base.c": `int base_value() { return 1; }`,
        })).toEqual([]);
    });
});

describe("LDMud ranges and indexing", () => {
    it("accepts [>n]", () => {
        expect(one(`int f(int *a) { return a[>0]; }`)).toEqual([]);
    });

    it("accepts [>a..>b]", () => {
        expect(one(`int *f(int *a) { return a[>0..>1]; }`)).toEqual([]);
    });

    it("leaves [>n] a syntax error in FluffOS", () => {
        expect(diagnosticsFor({ "test.c": `int f(int *a) { return a[>0]; }` }, "test.c", lpc.LanguageVariant.FluffOS)).not.toEqual([]);
    });
});

describe("LDMud preprocessor names", () => {
    it("accepts #ifdef with a keyword", () => {
        expect(one(`#ifdef private\nint x = "not compiled";\n#endif\nint y;\n`)).toEqual([]);
    });

    it("accepts #ifdef 0 as not defined", () => {
        expect(one(`#ifdef 0\nint x = "not compiled";\n#endif\nint y;\n`)).toEqual([]);
    });

    it("accepts #undef with a keyword", () => {
        expect(one(`#undef private\nint y;\n`)).toEqual([]);
    });
});

describe("other LDMud expressions", () => {
    it("accepts any and unknown as names", () => {
        expect(one(`int f(int any) { mapping unknown = ([]); return any + sizeof(unknown); }`)).toEqual([]);
    });

    it("parses a && b += c as a && (b += c)", () => {
        expect(one(`int f(int a, int b) { a && b += 2; return b; }`)).toEqual([]);
    });

    it("accepts a bytes literal as an argument", () => {
        expect(one(`int f(bytes txt) { return strstr(txt, b"\\n"); }`)).toEqual([]);
    });
});
