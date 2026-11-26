import * as lpc from "./_namespaces/lpc.js";
import { codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * LDMud lpctypes (3.6.7, doc/LPC/lpctypes): the `lpctype` type, `[<type>]` literals,
 * `decltype(<expr>)`, the `|`, `&` and `in` operators on them, and the efuns that take or
 * give one. Every expectation was compiled with LDMud 3.6.8 under `#pragma strict_types`.
 */

const LDMud = lpc.LanguageVariant.LDMud;
const FluffOS = lpc.LanguageVariant.FluffOS;

function diagnostics(source: string, typeChecking: lpc.TypeCheckingMode = "strict", driverType = LDMud): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType, diagnostics: true, typeChecking });
    return [...ls.getSyntacticDiagnostics(abs("test.c")), ...ls.getSemanticDiagnostics(abs("test.c"))].map(codeAndMessage);
}

function hover(source: string, marker: string): string {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType: LDMud });
    return lpc.displayPartsToString(ls.getQuickInfoAtPosition(abs("test.c"), source.indexOf(marker))?.displayParts);
}

describe.each(["strict", "driver"] as const)("LDMud lpctypes (%s mode)", mode => {
    const ok = (source: string) => expect(diagnostics(source, mode)).toEqual([]);

    it("declares lpctype variables, parameters and results", () => {
        ok(`lpctype t;\nlpctype f(lpctype a) { return a; }\nvoid g(mixed m) { lpctype x = 0; x = (lpctype)m; }\n`);
    });

    it("takes any type in brackets", () => {
        ok(`struct s { int a; };\nvoid f() {\n  lpctype t = [int];\n  t = [int|string*]; t = [struct s]; t = [mapping]; t = [lpctype]; t = [mixed*]; t = [<symbol*|string>*];\n}\n`);
    });

    it("parses a literal right after an opening parenthesis, which is not a mapping", () => {
        ok(`int f() { return typeof([int]) + intp([int]); }\nmixed g() { return ([int]); }\n`);
        ok(`mixed f() { return ([int] in [int|float]) + ([int] == [int]); }\n`);
        ok(`mixed f(int int_x) { return ([ "a": [int] ]) + ([ ]) + ([ int_x: 2 ]) + ([:2]); }\n`);
    });

    it("gives decltype() the lpctype of its operand, which is checked", () => {
        ok(`void f() { int v; lpctype t = decltype(v); t = decltype(v + 1); }\n`);
        expect(diagnostics(`void f() { lpctype t = decltype(nope); }\n`, mode)).toEqual(["2304: Cannot find name 'nope'."]);
    });

    it("unions and intersects types with | and &, and compares them", () => {
        ok(`void f() { lpctype t = [int]; t = t | [float]; t &= [int]; t |= [string]; t = [int] & [int|float]; }\n`);
        ok(`int f(lpctype a) { return a == [int] || a != [string] || [int] in [int|float]; }\n`);
    });

    it("rejects what the driver rejects", () => {
        expect(diagnostics(`void f() { lpctype t = 1; }\n`, mode)).toEqual(["2322: Type 'int' is not assignable to type 'lpctype'."]);
        expect(diagnostics(`void f() { object o = [int]; }\n`, mode)).toEqual(["2322: Type 'lpctype' is not assignable to type 'object'."]);
        expect(diagnostics(`void f() { lpctype t = [int] | 1; }\n`, mode)).toEqual(["2365: Operator '|' cannot be applied to types 'lpctype' and 'int'."]);
        expect(diagnostics(`void f() { lpctype t = [int] & 1; }\n`, mode)).toEqual(["2365: Operator '&' cannot be applied to types 'lpctype' and 'int'."]);
        expect(diagnostics(`mixed f() { return [int] + [int]; }\n`, mode)).toEqual(["2365: Operator '+' cannot be applied to types 'lpctype' and 'lpctype'."]);
        expect(diagnostics(`int f(lpctype t) { return 1 in t; }\n`, mode)).toEqual(["2365: Operator 'in' cannot be applied to types 'int' and 'lpctype'."]);
        expect(diagnostics(`void f() { lpctype t = [struct nope]; }\n`, mode)).toEqual(["2304: Cannot find name 'nope'."]);
    });

    it("has the lpctype efuns", () => {
        ok(`int f(mixed v) { return check_type(v, [int|float]); }\n`);
        ok(`mixed f() { return to_type(({ "10" }), [int*]) + to_type(1, [string], (<to_type_options> keep_zero: 1)); }\n`);
        ok(`lpctype f() { return to_lpctype("int*"); }\nlpctype *g(lpctype t) { return to_array(t); }\n`);
        ok(`mixed *f(object o) { return variable_list(o) + variable_list(o, 0x20) + variable_list("/obj/x", 1); }\n`);
        ok(`closure f() { return compile_string(({}), "1", (<compile_string_options> compile_expression: 1)); }\n`);
    });

    it("narrows with lpctypep()", () => {
        ok(`void f(mixed v) { if (lpctypep(v)) { lpctype t = v; } }\n`);
    });
});

describe("LDMud `in` (types_in[])", () => {
    it("takes any member of an array, any key of a mapping, and ints or strings in a string", () => {
        expect(diagnostics(`int f(object o, object *a, int *x, int **xs, lpctype *ts, mapping m, string s, bytes b, mixed v) {\n  return o in a || x in xs || [int] in ts || [int] in m || 97 in s || "a" in s || 1 in b || v in m;\n}\n`)).toEqual([]);
    });

    it("rejects an operand pair the driver has no entry for", () => {
        expect(diagnostics(`int f(object o, string s) { return o in s; }\n`)).toEqual(["2365: Operator 'in' cannot be applied to types 'object' and 'string'."]);
        expect(diagnostics(`int f(string *a) { return 1 in a; }\n`)).toEqual(["2365: Operator 'in' cannot be applied to types 'int' and 'string*'."]);
    });
});

describe("lpctypes elsewhere", () => {
    it("shows lpctype by name in hovers", () => {
        expect(hover(`void f() { lpctype t/*T*/ = [int]; }\n`, "t/*T*/")).toBe("(local var)  lpctype t");
        expect(hover(`lpctype g/*G*/() { return [int]; }\n`, "g/*G*/")).toBe("function lpctype g()");
    });

    it("defines __LPC_LPCTYPES__", () => {
        expect(diagnostics(`#ifndef __LPC_LPCTYPES__\n#error no lpctypes\n#endif\nint x;\n`)).toEqual([]);
    });

    it("leaves lpctype and decltype as names in FluffOS, which has no lpctype literal", () => {
        expect(diagnostics(`void f() { int lpctype = 1; int decltype = 2; }\n`, "strict", FluffOS)).toEqual([]);
        expect(diagnostics(`void f() { mixed t = [int]; }\n`, "strict", FluffOS)).not.toEqual([]);
    });
});
