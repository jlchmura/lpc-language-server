import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";

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
    const root = process.cwd();
    const isVirtual = (fn: string) => !!fn && lpc.normalizeSlashes(fn) === VIRTUAL;
    const options: lpc.CompilerOptions = { driverType: lpc.LanguageVariant.FluffOS, diagnostics: true, ...extraOptions };
    const host = lpc.createCompilerHost(options);
    const origReadFile = host.readFile;
    const origFileExists = host.fileExists;
    if (source !== undefined) {
        host.readFile = (fn: string) => (isVirtual(fn) ? source : origReadFile.call(host, fn));
        host.fileExists = (fn: string) => (isVirtual(fn) ? true : origFileExists.call(host, fn));
    }
    host.getDefaultLibFileName = () =>
        lpc.combinePaths(root, lpc.getDefaultLibFolder(options), lpc.getDefaultLibFileName(options));

    const program = lpc.createProgram({ host, rootNames: [rootName], options });
    return program
        .getSemanticDiagnostics(program.getSourceFile(rootName)!)
        .map(d => lpc.flattenDiagnosticMessageText(d.messageText, " "));
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
