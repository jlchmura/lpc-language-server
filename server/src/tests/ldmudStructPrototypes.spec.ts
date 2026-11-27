import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * LDMud's struct prototype, `struct F;`, declares a struct that is defined later (prolang.y,
 * struct_decl). It may repeat and may follow the definition; only a second definition is an
 * error ("Duplicate definition of struct F"). LDMud 3.6.7 agrees with each case.
 */
function diagnosticsFor(source: string): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType: lpc.LanguageVariant.LDMud, diagnostics: true });
    return allDiagnostics(ls, abs("test.c")).map(codeAndMessage);
}

describe("an LDMud struct prototype", () => {
    it("is not a duplicate of the definition after it", () => {
        expect(diagnosticsFor(`struct F;\nstruct F { int f; };\nint g(struct F x) { return x.f; }\n`)).toEqual([]);
        expect(diagnosticsFor(`private struct F;\nprivate struct F { int f; };\n`)).toEqual([]);
    });

    it("may repeat, and may follow the definition", () => {
        expect(diagnosticsFor(`struct F;\nstruct F;\nstruct F { int f; };\n`)).toEqual([]);
        expect(diagnosticsFor(`struct F { int f; };\nstruct F;\nint g(struct F x) { return x.f; }\n`)).toEqual([]);
    });

    it("takes its members from the definition", () => {
        expect(diagnosticsFor(`struct F;\nstruct F { int f; };\nstring g(struct F x) { return x.f; }\n`)).toEqual(["2322: Type 'int' is not assignable to type 'string'."]);
    });

    it("still reports a second definition", () => {
        expect(diagnosticsFor(`struct F { int f; };\nstruct F { int g; };\n`)).toEqual(["2300: Duplicate identifier 'F'."]);
    });

    // LDMud 3.6.7: "No such member 'f' for struct 'struct F'"
    it("has no members before the definition", () => {
        expect(diagnosticsFor(`struct F;\nint g(struct F x) { return x.f; }\nstruct F { int f; };\nint h(struct F x) { return x.f; }\n`)).toEqual([
            "9084: Struct 'F' has no member 'f' here: it is only defined later in this program.",
        ]);
    });

    // `->` is looked up when it runs, so LDMud compiles it ahead of the definition
    it("lets -> read a member before the definition", () => {
        expect(diagnosticsFor(`struct F;\nint g(struct F x) { return x->f; }\nstruct F { int f; };\n`)).toEqual([]);
    });

    it("has its members in a closure compiled after the definition", () => {
        expect(diagnosticsFor(`struct F { int f; };\nclosure g() { return function int(struct F x) { return x.f; }; }\n`)).toEqual([]);
    });
});

describe("a struct from an inherited program", () => {
    it("has its members wherever this program reads them", () => {
        const { ls, abs } = createTestLanguageService(
            { "test.c": `inherit "/base";\nint g(struct F x) { return x.f; }\n`, "base.c": `struct F { int f; };\n` },
            { driverType: lpc.LanguageVariant.LDMud, diagnostics: true },
        );
        expect(allDiagnostics(ls, abs("test.c")).map(codeAndMessage)).toEqual([]);
    });
});

