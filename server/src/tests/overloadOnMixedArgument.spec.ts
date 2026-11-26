import * as lpc from "./_namespaces/lpc.js";
import { codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * An efun call whose argument could be of several types (#454). `map()` and `filter()`
 * have a form for each container, and a `mixed` argument fits all of them, so the call
 * cannot be given any one form's result. Both drivers type these efuns `mixed` (LDMud
 * func_spec `mixed map(mixed *|mapping|struct|string|bytes, ...)`, FluffOS core.spec
 * `mixed map(string | mapping | mixed *, ...)`). Every LDMud case loads in LDMud 3.6.7.
 */

const LDMud = lpc.LanguageVariant.LDMud;
const FluffOS = lpc.LanguageVariant.FluffOS;

function diagnostics(driver: lpc.LanguageVariant, source: string, mode: lpc.TypeCheckingMode): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType: driver, diagnostics: true, typeChecking: mode });
    const file = abs("test.c");
    return [...ls.getSyntacticDiagnostics(file), ...ls.getSemanticDiagnostics(file)].map(codeAndMessage);
}

describe.each([
    ["LDMud", LDMud],
    ["FluffOS", FluffOS],
] as const)("an efun overload chosen by a mixed argument (%s)", (_name, driver) => {
    const isLD = driver === LDMud;
    const values = isLD ? "m_values" : "values";
    const mappingp = isLD ? "mappingp" : "mapp";

    describe.each(["strict", "driver"] as const)("in %s mode", mode => {
        const errors = (source: string) => diagnostics(driver, source, mode);

        it("is mixed when the argument fits forms with different results", () => {
            expect(errors(`mixed *g(mixed m) { return ${values}(map(m, (: $2 :))); }\n`)).toEqual([]);
            expect(errors(`mapping f(mixed m) { return map(m, (: $2 :)); }\n`)).toEqual([]);
            expect(errors(`string f(mixed m) { return map(m, (: $1 :)); }\n`)).toEqual([]);
            expect(errors(`mapping f(mixed m) { return filter(m, (: 1 :)); }\n`)).toEqual([]);
            expect(errors(`string f(mixed m) { return filter(m, (: 1 :)); }\n`)).toEqual([]);
        });

        it("still follows a mappingp() test (the case in #454)", () => {
            expect(errors(`mapping f(mixed m) { if (${mappingp}(m)) return map(m, (: $2 :)); return 0; }\n`)).toEqual([]);
        });

        it("keeps the form's result when the argument's type picks one", () => {
            const codes = (source: string) => errors(source).map(d => Number(d.slice(0, d.indexOf(":"))));
            expect(codes(`int *f(int *a) { return map(a, (: $1 :)); }\n`)).toEqual([]);
            expect(codes(`mapping f(mapping m) { return map(m, (: $2 :)); }\n`)).toEqual([]);
            expect(codes(`mapping f(int *a) { return map(a, (: $1 :)); }\n`)).toEqual([2322]);
            expect(codes(`int *f(mapping m) { return map(m, (: $2 :)); }\n`)).toEqual([2322]);
        });
    });

    it("is mixed in driver mode for a union the driver accepts in more than one form", () => {
        expect(diagnostics(driver, `mapping f(mapping|int *m) { return map(m, (: $1 :)); }\n`, "driver")).toEqual([]);
    });
});

/**
 * Where the driver does not check a call's argument types -- an untyped caller, an efun
 * taking `...` in FluffOS, a FluffOS simul-efun -- the overload is still chosen by the
 * arguments' types, and the arguments are still checked; only a mismatch between an
 * argument and its parameter goes unreported.
 */
describe("a call whose argument types the driver does not check (driver mode)", () => {
    const errors = (driver: lpc.LanguageVariant, source: string, files: Record<string, string> = {}) => {
        const { ls, abs } = createTestLanguageService({ "test.c": source, ...files }, { driverType: driver, diagnostics: true, typeChecking: "driver" });
        return ls.getSemanticDiagnostics(abs("test.c")).map(codeAndMessage);
    };

    it("takes the overload the arguments fit (FluffOS map() takes `...`, so its types are never checked)", () => {
        // The case from nightmare-residuum's help.c: the mapping form, listed first, was taken.
        expect(errors(FluffOS, `void f(string *parts) { parts[0..<2] = map(parts[0..<2], (: $1 + ">" :)); }\n`)).toEqual([]);
        expect(errors(FluffOS, `int *f(int *a) { return filter(a, (: 1 :)); }\n`)).toEqual([]);
        expect(errors(LDMud, `f(string *a) { string *b; b = map(a, (: $1 :)); }\n`)).toEqual([]);
    });

    it("still reports nothing when no overload fits", () => {
        expect(errors(LDMud, `f() { random("x"); }\n`)).toEqual([]);
        expect(errors(FluffOS, `void f() { sf("x"); }\n`, { "obj/sefun.c": "int sf(int x) { return x; }\n" })).toEqual([]);
    });

    it("checks the arguments themselves", () => {
        expect(errors(LDMud, `f() { random(qqq_unknown); }\n`)).toEqual(["2304: Cannot find name 'qqq_unknown'."]);
        expect(errors(FluffOS, `void f() { sprintf("%d", qqq_unknown); }\n`)).toEqual(["2304: Cannot find name 'qqq_unknown'."]);
        expect(errors(FluffOS, `void f() { sf(qqq_unknown); }\n`, { "obj/sefun.c": "int sf(int x) { return x; }\n" })).toEqual(["2304: Cannot find name 'qqq_unknown'."]);
    });
});
