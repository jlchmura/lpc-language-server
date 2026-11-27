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
});
