import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";
import { message, createTestProgram } from "./harness.js";

/**
 * The driver compiles in one pass, top to bottom, so a call can only bind a name it has
 * already seen. Inside a function that declares a return type -- what sets `exact_types` in
 * FluffOS (grammar_rules.cc) and LDMud (prolang.y) alike -- a call to a name this program
 * does not declare until later is "Undefined function" and the object fails to load.
 *
 * Every expectation here was run against build/src/lpcc first. The boundaries are not all
 * obvious: an untyped caller is silent (the driver makes a forward stub), a call at file
 * scope is silent (it compiles into the untyped `__INIT`), and an inline closure follows
 * the function it is written in rather than having a rule of its own.
 */
const FIXTURES = lpc.normalizeSlashes(path.join(process.cwd(), "server/src/tests/cases/fwdcall"));
const VIRTUAL = lpc.normalizeSlashes(path.join(process.cwd(), "server/src/tests/cases/compiler/__fwdcall.c"));

function diagnosticsFor(rootName: string, source?: string, extraOptions?: Partial<lpc.CompilerOptions>): string[] {
    const files = source === undefined ? {} : { [VIRTUAL]: source };
    const { program } = createTestProgram(files, { driverType: lpc.LanguageVariant.FluffOS, ...extraOptions }, [rootName]);
    return program
        .getSemanticDiagnostics(program.getSourceFile(rootName)!).map(message);
}

/** Diagnostics for an inline source, driver selectable. */
function check(source: string, driverType = lpc.LanguageVariant.FluffOS): string[] {
    return diagnosticsFor(VIRTUAL, source, { driverType });
}

const undefinedFunctions = (source: string, driverType?: lpc.LanguageVariant) =>
    check(source, driverType).filter(m => m.startsWith("Undefined function"));

const fixture = (name: string, extraOptions?: Partial<lpc.CompilerOptions>) =>
    diagnosticsFor(lpc.normalizeSlashes(path.join(FIXTURES, name)), /*source*/ undefined, extraOptions)
        .filter(m => m.startsWith("Undefined function"));

describe("a call the driver could not bind yet", () => {
    it("reports a forward call from a typed function", () => {
        expect(undefinedFunctions(`void a() { b(); }\nvoid b() { }\n`)).toHaveLength(1);
    });

    it("reports it for LDMud too -- the rule is the same in both drivers", () => {
        expect(undefinedFunctions(`void a() { b(); }\nvoid b() { }\n`, lpc.LanguageVariant.LDMud)).toHaveLength(1);
    });

    it("reports a forward call inside an inline closure in a typed function", () => {
        expect(undefinedFunctions(`void a() { function f = (: b() :); }\nvoid b() { }\n`)).toHaveLength(1);
    });

    it("reports it however the definition is qualified", () => {
        expect(undefinedFunctions(`public void a() { b(); }\nprivate void b() { }\n`)).toHaveLength(1);
    });

    it("still reports a forward call to this program's own function when it inherits", () => {
        // A program that inherits lists its own type among its base types; that must not
        // count as the name being inherited. The call to from_base() stays accepted.
        for (const driverType of [lpc.LanguageVariant.FluffOS, lpc.LanguageVariant.LDMud]) {
            const diagnostics = fixture("fwd_derived_own_later.c", { driverType });
            expect(diagnostics).toHaveLength(1);
            expect(diagnostics[0]).toContain("'own_later'");
        }
    });

    it("reports a call that precedes the #include declaring it", () => {
        expect(fixture("fwd_include_after.c")).toHaveLength(1);
    });
});

describe("the shapes the driver accepts", () => {
    it("accepts a call that follows the definition", () => {
        expect(undefinedFunctions(`void b() { }\nvoid a() { b(); }\n`)).toEqual([]);
    });

    it("accepts a call preceded by a prototype", () => {
        expect(undefinedFunctions(`void b();\nvoid a() { b(); }\nvoid b() { }\n`)).toEqual([]);
    });

    it("accepts a forward call from an untyped function -- the driver makes a stub", () => {
        expect(undefinedFunctions(`a() { b(); }\nvoid b() { }\n`)).toEqual([]);
    });

    it("accepts a forward call in a closure inside an untyped function", () => {
        expect(undefinedFunctions(`a() { function f = (: b() :); return f; }\nvoid b() { }\n`)).toEqual([]);
    });

    it("accepts a forward call at file scope -- that compiles into the untyped __INIT", () => {
        expect(undefinedFunctions(`int x = b();\nint b() { return 1; }\n`)).toEqual([]);
    });

    it("accepts a call to an efun this program redefines later", () => {
        expect(undefinedFunctions(`void a() { typeof(1); }\nstring typeof(mixed v) { return "x"; }\n`)).toEqual([]);
    });

    it("accepts a call that follows the #include declaring it", () => {
        expect(fixture("fwd_include_before.c")).toEqual([]);
    });

    it("accepts a call to a name an inherited program declares", () => {
        expect(fixture("fwd_derived.c")).toEqual([]);
    });
});

describe("inside the simul_efun object, siblings are ordinary program-local functions", () => {
    // The simul_efun file is an include factory: every sibling is part of one translation
    // unit, and the driver only rebuilds its simul_efun table after this program compiles
    // (get_simul_efuns runs from set_simul_efun). A sibling call with no prototype binds to
    // the PREVIOUS generation's simul_efun on a reload and is a hard error on a cold boot,
    // so it is checked like any other program-local call.
    //
    // A diagnostic raised inside an `#include` is reported against the directive, so what
    // surfaces here is the roll-up rather than the message itself.
    const sefunOptions = (name: string) => ({
        sefunFile: lpc.normalizeSlashes(path.join(FIXTURES, name)),
    });

    it("reports a call to a sibling declared in a later include", () => {
        const diagnostics = diagnosticsFor(
            lpc.normalizeSlashes(path.join(FIXTURES, "sefun_obj.c")),
            /*source*/ undefined,
            sefunOptions("sefun_obj.c"),
        );
        expect(diagnostics).toEqual(["Include file 'sefun_a.c' contains one or more errors."]);
    });

    it("still accepts a call to an efun a sibling overrides", () => {
        const diagnostics = diagnosticsFor(
            lpc.normalizeSlashes(path.join(FIXTURES, "sefun_efun_obj.c")),
            /*source*/ undefined,
            sefunOptions("sefun_efun_obj.c"),
        );
        expect(diagnostics).toEqual([]);
    });
});

describe("an LDMud closure of a function the driver has not seen yet", () => {
    // LDMud binds `#'fn` when it compiles it, and there is no forward stub for a closure:
    // LDMud 3.6.8 rejects `#'later_fn` before later_fn with "Undefined function: later_fn"
    // in a typed function, an untyped one and a file-scope initialiser alike.
    const closures = (source: string) => undefinedFunctions(source, lpc.LanguageVariant.LDMud);
    const ldmudFixture = (name: string) => fixture(name, { driverType: lpc.LanguageVariant.LDMud });

    it("reports a closure taken before the function is declared", () => {
        const diagnostics = ldmudFixture("fwd_lambda_later.c");
        expect(diagnostics).toHaveLength(1);
        expect(diagnostics[0]).toContain("'later_fn'");
    });

    it("reports it in an untyped function too", () => {
        expect(closures(`a() { return #'b; }\nvoid b() { }\n`)).toHaveLength(1);
    });

    it("reports it at file scope too -- unlike a call, it is not deferred to __INIT", () => {
        expect(closures(`mixed m = #'b;\nvoid b() { }\n`)).toHaveLength(1);
    });

    it("accepts a file-scope closure after a prototype", () => {
        expect(closures(`void b();\nmixed m = #'b;\nvoid b() { }\n`)).toEqual([]);
    });

    it("accepts a prototype, an earlier definition, an inherited function and an efun", () => {
        expect(ldmudFixture("fwd_lambda_visible.c")).toEqual([]);
    });

    it("accepts a quoted symbol -- it is only a name, not a closure", () => {
        expect(closures(`mixed a() { return 'b; }\nvoid b() { }\n`)).toEqual([]);
    });

    it("accepts a closure of an inherited function by its qualified name", () => {
        expect(ldmudFixture("fwd_lambda_super.c")).toEqual([]);
    });

    it("says it is a closure, not a call", () => {
        expect(closures(`mixed a() { return #'b; }\nvoid b() { }\n`))
            .toEqual([expect.stringContaining("Add a prototype above this closure")]);
    });

    // An earlier call `b()` leaves a forward stub for `b`, typed caller or not (prolang.y,
    // define_new_function with NAME_UNDEFINED), and lex.c's closure() then finds it.
    it("accepts a closure after an untyped call has made a stub", () => {
        expect(closures(`x() { b(); }\nmixed f() { return #'b; }\nvoid b() { }\n`)).toEqual([]);
    });

    it("reports only the call when the earlier call is in a typed function", () => {
        expect(closures(`void x() { b(); }\nmixed f() { return #'b; }\nvoid b() { }\n`))
            .toEqual([expect.stringContaining("Add a prototype above this call")]);
    });

    it("reports a closure passed to the call that would make the stub", () => {
        // The arguments are compiled before the call makes its stub.
        expect(closures(`x() { return b(#'b); }\nvoid b(mixed c) { }\n`)).toHaveLength(1);
    });

    it("reports a closure after a stub when a local of that name is in the way", () => {
        expect(closures(`mixed f() { int b; b = 1; return #'b; }\nvoid b() { }\n`)).toHaveLength(1);
        expect(closures(`x() { b(); }\nmixed f() { int b; return #'b; }\nvoid b() { }\n`)).toEqual([]);
    });

    // lex.c's closure() falls back to a global variable: `#'b` is then a variable closure.
    it("accepts a closure of a global variable declared earlier", () => {
        expect(closures(`mixed b;\nmixed f() { return #'b; }\nvoid b() { }\n`)).toEqual([]);
    });

    it("reports a closure before a global variable of that name", () => {
        expect(closures(`mixed f() { return #'b; }\nmixed b;\nvoid b() { }\n`)).toHaveLength(1);
    });

    it("tells a closure from a quoted symbol inside a macro", () => {
        expect(closures(`#define CL(f) #'f\nmixed f() { return CL(b); }\nvoid b() { }\n`)).toHaveLength(1);
        expect(closures(`#define Q(f) ({ 'f, 1 })\nmixed f() { return Q(b); }\nvoid b() { }\n`)).toEqual([]);
    });
});
