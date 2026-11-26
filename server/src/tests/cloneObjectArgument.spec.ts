import * as lpc from "./_namespaces/lpc.js";
import { codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * What `clone_object()` takes as its first argument (#452). LDMud clones from a name or
 * from a template object (func_spec `object clone_object(string|object, ...)`), and the
 * clone is another object of the template's program. FluffOS takes only a name (core.spec
 * `object clone_object(string, ...)`, efuns_main.cc f__new reads a string). Each driver
 * checks the type only where it checks an efun's argument types, in a typed function.
 * Every LDMud case was compiled with LDMud 3.6.7.
 */

const LDMud = lpc.LanguageVariant.LDMud;
const FluffOS = lpc.LanguageVariant.FluffOS;

function diagnostics(driver: lpc.LanguageVariant, source: string, mode: lpc.TypeCheckingMode = "strict"): string[] {
    const { ls, abs } = createTestLanguageService({ "h2.c": source }, { driverType: driver, diagnostics: true, typeChecking: mode });
    const file = abs("h2.c");
    return [...ls.getSyntacticDiagnostics(file), ...ls.getSemanticDiagnostics(file)].map(codeAndMessage);
}

const codes = (driver: lpc.LanguageVariant, source: string, mode?: lpc.TypeCheckingMode) =>
    diagnostics(driver, source, mode).map(d => Number(d.slice(0, d.indexOf(":"))));

describe.each(["strict", "driver"] as const)("clone_object in LDMud (%s mode)", mode => {
    it("accepts a template object as well as a name (the case in #452)", () => {
        expect(codes(LDMud, `object f() { return clone_object(this_object()); }\n`, mode)).toEqual([]);
        expect(codes(LDMud, `object f(object o) { return clone_object(o); }\n`, mode)).toEqual([]);
        expect(codes(LDMud, `object f(string|object x) { return clone_object(x); }\n`, mode)).toEqual([]);
        expect(codes(LDMud, `object f() { return clone_object(this_object(), 1, 2); }\n`, mode)).toEqual([]);
        expect(codes(LDMud, `object f() { return clone_object("/h2"); }\n`, mode)).toEqual([]);
    });

    it("gives a clone of a template the template's type", () => {
        expect(diagnostics(LDMud, `void f() { int i = clone_object(this_object()); }\n`, mode))
            .toEqual([`2322: Type 'object "/h2"' is not assignable to type 'int'.`]);
        expect(codes(LDMud, `void f(object o) { int i = clone_object(o); }\n`, mode)).toEqual([2322]);
    });

    it("rejects anything else in a typed function", () => {
        expect(diagnostics(LDMud, `object f() { return clone_object(1); }\n`, mode))
            .toEqual(["7037: Clone object's specifier must be of type 'string' or 'object', but here has type 'int'."]);
        expect(codes(LDMud, `object f(mapping m) { return clone_object(m); }\n`, mode)).toEqual([7037]);
    });
});

describe("clone_object's argument in driver mode", () => {
    it("is not checked in an untyped function, in either driver", () => {
        expect(codes(LDMud, `f() { return clone_object(1); }\n`, "driver")).toEqual([]);
        expect(codes(FluffOS, `f() { return clone_object(this_object()); }\n`, "driver")).toEqual([]);
        expect(codes(LDMud, `f() { return clone_object(1); }\n`)).toEqual([7037]);
    });
});

describe("clone_object in FluffOS", () => {
    it("takes only a name", () => {
        expect(diagnostics(FluffOS, `object f() { return clone_object(this_object()); }\n`))
            .toEqual([`7036: Clone object's specifier must be of type 'string', but here has type 'object "/h2"'.`]);
        expect(codes(FluffOS, `object f() { return clone_object(this_object()); }\n`, "driver")).toEqual([7036]);
        expect(codes(FluffOS, `object f() { return clone_object("/h2"); }\n`)).toEqual([]);
    });
});

describe("a clone_object argument that is not a string", () => {
    it("is not looked up as an object path", () => {
        for (const driver of [LDMud, FluffOS]) {
            expect(codes(driver, `object f() { return clone_object(1); }\n`)).not.toContain(2307);
        }
    });
});
