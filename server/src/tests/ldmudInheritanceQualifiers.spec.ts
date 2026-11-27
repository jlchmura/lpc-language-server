import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * LDMud's inheritance qualifiers, `functions`, `variables` and `structs`, set the visibility of
 * what an inherit brings in (`private functions inherit "x";`) and the default visibility of
 * a program (`default private functions;`). They are plain identifiers the grammar reads in
 * those places (prolang.y, inheritance_qualifier, default_visibility); FluffOS has neither.
 */
function diagnosticsFor(files: Record<string, string>, driverType = lpc.LanguageVariant.LDMud): string[] {
    const { ls, abs } = createTestLanguageService(files, { driverType, diagnostics: true });
    return Object.keys(files).flatMap(f => allDiagnostics(ls, abs(f)).map(d => `${f} ${codeAndMessage(d)}`));
}

const base = { "a.c": "struct T { int z; };\nvoid create() {}\nint afn() { return 1; }\nint avar;\n" };

describe("LDMud inheritance qualifiers", () => {
    it("accepts functions, variables and structs on an inherit", () => {
        expect(diagnosticsFor({ ...base, "b.c": `private functions inherit "a";\n` })).toEqual([]);
        expect(diagnosticsFor({ ...base, "b.c": `private variables inherit "a";\n` })).toEqual([]);
        expect(diagnosticsFor({ ...base, "b.c": `private structs inherit "a";\n` })).toEqual([]);
        expect(diagnosticsFor({ ...base, "b.c": `protected functions private variables public structs virtual inherit "a";\n` })).toEqual([]);
    });

    it("still resolves what the inherit brings in", () => {
        expect(diagnosticsFor({ ...base, "b.c": `private variables inherit "a";\nint f() { struct T t = (<T> 1); return afn() + avar + t.z; }\n` })).toEqual([]);
    });

    it("accepts a default visibility", () => {
        expect(diagnosticsFor({ "b.c": `default private functions;\ndefault public variables;\ndefault private structs;\ndefault protected functions private variables;\nint x;\nvoid g() {}\n` })).toEqual([]);
    });

    it("keeps `default:` a switch label", () => {
        expect(diagnosticsFor({ "b.c": `int f(int x) {\n    switch (x) {\n    case 1: return 1;\n    default: return 0;\n    }\n}\n` })).toEqual([]);
    });

    it("lets the qualifiers be names elsewhere", () => {
        expect(diagnosticsFor({ "b.c": `int variables;\nstruct S { int functions; int structs; };\nint f(struct S s) { int structs = s.structs; variables++; return s.functions + structs; }\n` })).toEqual([]);
    });
});

describe("FluffOS has no inheritance qualifiers", () => {
    it("reads them as names", () => {
        expect(diagnosticsFor({ "b.c": `int functions, variables, structs;\nvoid f() { functions = variables + structs; }\n` }, lpc.LanguageVariant.FluffOS)).toEqual([]);
    });
});
