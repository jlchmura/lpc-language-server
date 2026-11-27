import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * An LDMud struct that inherits another, `struct B (A) { ... };`, has the base struct's
 * members ahead of its own (prolang.y, define_struct). LDMud 3.6.7 loads each case.
 */
function diagnosticsFor(source: string): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType: lpc.LanguageVariant.LDMud, diagnostics: true });
    return allDiagnostics(ls, abs("test.c")).map(codeAndMessage);
}

const structs = `struct A { int a; };\nstruct B (A) { string b; };\n`;

describe("an LDMud struct that inherits another", () => {
    it("has the base struct's members", () => {
        expect(diagnosticsFor(`${structs}int f(struct B s) { s.a = 1; return s.a + sizeof(s.b); }\n`)).toEqual([]);
    });

    it("types the base struct's members", () => {
        expect(diagnosticsFor(`${structs}string f(struct B s) { return s.a; }\n`)).toEqual(["2322: Type 'int' is not assignable to type 'string'."]);
    });

    it("has the members of every base", () => {
        expect(diagnosticsFor(`${structs}struct C (B) { float c; };\nfloat f(struct C s) { return s.a + s.c; }\nstring g(struct C s) { return s.b; }\n`)).toEqual([]);
    });

    it("still reports a member none of them has", () => {
        expect(diagnosticsFor(`${structs}int f(struct B s) { return s.nope; }\n`)).toEqual(["2339: Property 'nope' does not exist on type 'B'."]);
    });
});
