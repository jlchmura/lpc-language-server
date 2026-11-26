import * as lpc from "./_namespaces/lpc.js";
import { codeAndMessage, createTestLanguageService, hoverText } from "./harness.js";

/**
 * LDMud `lwobject "/path"` (prolang.y single_basic_non_void_type, doc/LPC/types): a
 * lightweight object whose program inherits `/path`. The driver relates two object types only
 * when they are the same kind of object and at most one of them names a program (types.c
 * internal_get_common_type, TCLASS_OBJECT), so an lwobject never goes where an object does.
 * Every expectation was compiled with LDMud 3.6.8 under `#pragma strict_types`.
 */

const LDMud = lpc.LanguageVariant.LDMud;
const files = {
    "a.c": `int fa() { return 1; }\n`,
    "b.c": `inherit "/a";\nint fb() { return 2; }\n`,
    "lw.c": `#pragma lightweight\nint fl() { return 3; }\n`,
};

function diagnostics(source: string, typeChecking: lpc.TypeCheckingMode = "strict"): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source, ...files }, { driverType: LDMud, diagnostics: true, typeChecking });
    return [...ls.getSyntacticDiagnostics(abs("test.c")), ...ls.getSemanticDiagnostics(abs("test.c"))].map(codeAndMessage);
}

const notAssignable = (source: string, target: string) => `2322: Type '${source}' is not assignable to type '${target}'.`;

describe.each(["strict", "driver"] as const)("LDMud lwobject \"/path\" (%s mode)", mode => {
    const ok = (source: string) => expect(diagnostics(source, mode)).toEqual([]);
    const rejects = (source: string, message: string) => expect(diagnostics(source, mode)).toEqual([message]);

    it("declares variables, parameters, results, arrays and casts", () => {
        ok(`lwobject "/lw" g;\nlwobject "/lw" f(lwobject "/lw" x) { return x; }\n`);
        ok(`void f(lwobject "/lw"* xs, mixed m) { lwobject *ys = xs; lwobject "/lw" x = (lwobject "/lw")m; x = 0; }\n`);
    });

    it("goes to and from a plain lwobject", () => {
        ok(`void f(lwobject "/lw" x) { lwobject y = x; x = y; x = new_lwobject("/lw"); }\n`);
    });

    it("names a program however the path is spelled", () => {
        ok(`void f(lwobject "lw" x, lwobject "/lw.c" y, lwobject "//lw" z) { x = y; y = z; z = x; }\n`);
    });

    it("calls the program's functions", () => {
        ok(`void f(lwobject "/lw" x) { x->fl(); x.fl(); }\n`);
    });

    it("is not an object, not even of the same program", () => {
        rejects(`void f(lwobject "/lw" x, object "/lw" y) { y = x; }\n`, notAssignable(`lwobject "/lw"`, `object "/lw"`));
        rejects(`void f(lwobject "/lw" x, object "/lw" y) { x = y; }\n`, notAssignable(`object "/lw"`, `lwobject "/lw"`));
        rejects(`void f(object "/a" x) { lwobject "/a" y = x; }\n`, notAssignable(`object "/a"`, `lwobject "/a"`));
        rejects(`void f(lwobject "/lw" x) { object y = x; }\n`, notAssignable(`lwobject "/lw"`, `object`));
    });

    it("is not the lwobject of another program, not even one it inherits", () => {
        rejects(`void f(lwobject "/lw" x, lwobject "/a" y) { x = y; }\n`, notAssignable(`lwobject "/a"`, `lwobject "/lw"`));
        rejects(`void f(lwobject "/a" x, lwobject "/b" y) { x = y; }\n`, notAssignable(`lwobject "/b"`, `lwobject "/a"`));
    });

    it("is not any other type", () => {
        rejects(`void f(lwobject "/lw" x, mapping m) { x = m; }\n`, notAssignable(`mapping`, `lwobject "/lw"`));
        rejects(`void f(lwobject "/lw" x) { int i = x; }\n`, notAssignable(`lwobject "/lw"`, `int`));
    });

    it("reports a program it cannot find, and is then a plain lwobject", () => {
        rejects(`void f(lwobject "/nope" x) { lwobject y = x; x = y; }\n`, "2307: Cannot find object '/nope'.");
    });
});

describe.each(["strict", "driver"] as const)("LDMud lwobjects in efuns and this_object() (%s mode)", mode => {
    const ok = (source: string) => expect(diagnostics(source, mode)).toEqual([]);

    // func_spec: call_other(object|lwobject|string|object *|lwobject *|string *, string, ...),
    // and call_direct the same.
    it("calls into an lwobject with call_other() and call_direct()", () => {
        ok(`void f(lwobject "/lw" x, lwobject y) { call_other(x, "fl"); call_direct(x, "fl"); call_other(({ x }), "fl"); call_other(y, "fl"); call_direct(({ y }), "fl"); }\n`);
        ok(`void f() { call_other("/lw", "fl"); call_direct(({ "/lw" }), "fl"); }\n`);
    });

    // Plain `lwobject` stays loose about objects: previous_object() and this_object() give
    // `object|lwobject`, and mudlibs use that as an `object` everywhere.
    it("leaves plain lwobject loose about objects", () => {
        ok(`void f(object|lwobject o) { object x = previous_object(); lwobject y = 0; mixed z = y; o = y; }\n`);
    });

    // The driver types this_object() as `object|lwobject`; a lightweight program runs as
    // lwobjects, and as its blueprint, a regular object.
    it("gives this_object() the program's lwobject too in a lightweight program", () => {
        ok(`#pragma lightweight\nint fs() { return 1; }\nvoid f() { lwobject x = this_object(); this_object()->fs(); }\n`);
    });
});

describe("LDMud this_object() in a lightweight program", () => {
    const typeOfThisObject = (pragmas: string) => diagnostics(`${pragmas}void f() { int me = this_object(); }\n`, "driver");

    it("is the program as an object and as an lwobject", () => {
        expect(typeOfThisObject(`#pragma strong_types, lightweight\n`)).toEqual([`${notAssignable(`object "/test" | lwobject "/test"`, `int`)}   Type 'object "/test"' is not assignable to type 'int'.`]);
        expect(typeOfThisObject(`#pragma lightweight\n#pragma no_lightweight\n`)).toEqual([notAssignable(`object "/test"`, `int`)]);
        expect(typeOfThisObject(``)).toEqual([notAssignable(`object "/test"`, `int`)]);
    });

    it("goes where either one goes in driver mode, which only asks that the types overlap", () => {
        const source = `#pragma lightweight\nobject f() { lwobject "/test" lw = this_object(); destruct(this_object()); return this_object(); }\n`;
        expect(diagnostics(source, "driver")).toEqual([]);
        expect(diagnostics(source, "strict")).toEqual([
            `2322: Type 'object "/test" | lwobject "/test"' is not assignable to type 'lwobject "/test"'.   Type 'object "/test"' is not assignable to type 'lwobject "/test"'.`,
            `2345: Argument of type 'object "/test" | lwobject "/test"' is not assignable to parameter of type 'object'.   Type 'lwobject "/test"' is not assignable to type 'object'.`,
            `2322: Type 'object "/test" | lwobject "/test"' is not assignable to type 'object'.   Type 'lwobject "/test"' is not assignable to type 'object'.`,
        ]);
    });
});

describe("LDMud lwobject \"/path\" elsewhere", () => {
    // The driver only asks that the two types share a value; a union of two programs'
    // lwobjects shares one with either. Strict mode wants every member to fit, as it does for
    // any union. Both once threw: the union's members had signatures with no declaration, and
    // a program that inherits lists itself among its own base types.
    it("relates a union of two programs' lwobjects as the driver does", () => {
        const source = `void f(lwobject "/a"|lwobject "/b" x, lwobject "/a" y) { y = x; }\n`;
        expect(diagnostics(source, "driver")).toEqual([]);
        expect(diagnostics(source, "strict")).toEqual([
            `2322: Type 'lwobject "/a" | lwobject "/b"' is not assignable to type 'lwobject "/a"'.   Type 'lwobject "/b"' is not assignable to type 'lwobject "/a"'.`,
        ]);
    });

    it("reports a function the program does not have in strict mode", () => {
        expect(diagnostics(`void f(lwobject "/lw" x) { x->nope(); }\n`)).toEqual([`2339: Property 'nope' does not exist on type 'lwobject "/lw"'.`]);
        expect(diagnostics(`void f(lwobject "/lw" x) { x->nope(); }\n`, "driver")).toEqual([]);
    });

    it("shows as lwobject \"/path\" in hovers, and completes the program's functions", () => {
        const source = `void f(lwobject "/lw" x/*X*/) { x->; }\n`;
        const { ls, abs } = createTestLanguageService({ "test.c": source, ...files }, { driverType: LDMud });
        expect(hoverText(ls, abs("test.c"), source.indexOf("x/*X*/"))).toBe(`(parameter)  lwobject "/lw" x`);
        const entries = ls.getCompletionsAtPosition(abs("test.c"), source.indexOf("x->") + 3, {})?.entries ?? [];
        expect(entries.map(e => e.name)).toContain("fl");
    });

    it("goes to the program from its path", () => {
        const source = `void f(lwobject "/lw" x) { }\n`;
        const { ls, abs } = createTestLanguageService({ "test.c": source, ...files }, { driverType: LDMud });
        const definitions = ls.getDefinitionAtPosition(abs("test.c"), source.indexOf("/lw") + 1) ?? [];
        expect(definitions.map(d => d.fileName)).toContain(abs("lw.c"));
    });
});
