import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * LDMud's wildcarded super call, `"*"::fn()`, calls fn in every inherited program whose name
 * matches the pattern and returns the results in an array (prolang.y, insert_inherited).
 * Matching nothing is not an error: the call returns `({})` (t-language/tl-wildcard-call.c,
 * tl-wildcard-empty-call.c). LDMud 3.6.7 returns these values. Its compiler types the call as the
 * first matching function's return type, not as the array it returns; the server uses the array.
 */
const files = {
    "std/a.c": "int calc(int x) { return x + 1; }\nint only_a() { return 1; }\n",
    "std/b.c": "int calc(int x) { return x + 2; }\n",
    "other.c": "string calc(int x) { return \"\"; }\n",
};

function diagnosticsFor(source: string, typeChecking: lpc.TypeCheckingMode = "strict"): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source, ...files }, { driverType: lpc.LanguageVariant.LDMud, diagnostics: true, typeChecking });
    return allDiagnostics(ls, abs("test.c")).map(codeAndMessage);
}

const inherits = `inherit "/std/a";\ninherit "/std/b";\n`;

describe.each(["strict", "driver"] as const)("LDMud wildcarded super calls (%s mode)", mode => {
    it("returns an array of the results", () => {
        expect(diagnosticsFor(`${inherits}int *f() { return "*"::calc(1); }\nint g() { return sizeof("*"::calc(0)); }\n`, mode)).toEqual([]);
    });

    it("is not an error when no inherited function matches", () => {
        expect(diagnosticsFor(`${inherits}int f() { return sizeof("*"::funX(10)) == 0 && sizeof("*"::funX()) == 0; }\n`, mode)).toEqual([]);
        expect(diagnosticsFor(`${inherits}mixed *f() { return "zzz*"::calc(1); }\n`, mode)).toEqual([]);
    });

    it("matches the pattern against the program names", () => {
        expect(diagnosticsFor(`${inherits}int *f() { return "std/*"::calc(1) + "std/?"::calc(2) + "*a"::only_a(); }\n`, mode)).toEqual([]);
    });

    it("still checks the arguments", () => {
        expect(diagnosticsFor(`${inherits}mixed f() { return "*"::calc(nope); }\n`, mode)).toEqual(["2304: Cannot find name 'nope'."]);
    });
});

describe("LDMud super calls that are not wildcarded", () => {
    it("still reports a function no inherit has", () => {
        expect(diagnosticsFor(`${inherits}int f() { return ::funX(); }\n`)).toEqual(["2304: Cannot find name 'funX'."]);
    });

    it("types an element of the result array", () => {
        expect(diagnosticsFor(`${inherits}string f() { return "*"::calc(1)[0]; }\n`)).toEqual(["2322: Type 'int' is not assignable to type 'string'."]);
    });
});
