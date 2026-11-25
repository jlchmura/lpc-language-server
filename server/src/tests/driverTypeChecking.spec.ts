import * as lpc from "./_namespaces/lpc.js";
import { codeAndMessage, createTestLanguageService, hoverText, LIB_ROOT } from "./harness.js";

/**
 * `typeChecking: "driver"` reports only the type errors the driver's own compiler would.
 * The rules come from the drivers' sources: LDMud 3.6.8 src/prolang.y and lex.c, FluffOS
 * src/compiler/internal (grammar_rules*.cc, exprs.cc, compiler.cc, lexer_utils.cc).
 *
 * The facts both drivers share:
 *  - A function body is type checked only when the function declares a return type
 *    (`exact_types`). The pragma does not decide that; it makes a return type mandatory,
 *    and under LDMud's `strict_types` a call_other result must be cast before use.
 *  - There is no narrowing: a variable has its declared type everywhere.
 *  - A call_other never looks at its target, and its result is mixed.
 *
 * Many cases come from issue #415, where each was compiled on LDMud 3.6.8.
 */

const LDMud = lpc.LanguageVariant.LDMud;
const FluffOS = lpc.LanguageVariant.FluffOS;

interface Options {
    files?: Record<string, string>;
    mode?: lpc.TypeCheckingMode;
    defaultPragmas?: string[];
}

function diagnostics(driver: lpc.LanguageVariant, source: string, { files = {}, mode = "driver", defaultPragmas }: Options = {}): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source, ...files }, {
        driverType: driver,
        diagnostics: true,
        typeChecking: mode,
        defaultPragmas,
    });
    return [...ls.getSyntacticDiagnostics(abs("test.c")), ...ls.getSemanticDiagnostics(abs("test.c"))].map(codeAndMessage);
}

/** Just the diagnostic codes, for cases where the message adds nothing. */
function codes(driver: lpc.LanguageVariant, source: string, options?: Options): number[] {
    return diagnostics(driver, source, options).map(d => Number(d.slice(0, d.indexOf(":"))));
}

const target = {
    "target.c": `int foo() { return 1; }\nstring name() { return "x"; }\nint do_command(string verb, int flag) { return 1; }\n`,
};

const MUST_CAST = "9061: A call_other result must be cast before it is used, because of '#pragma strict_types'.";

describe("lpc-config", () => {
    function parse(json: string): lpc.CompilerOptions {
        const configFile = lpc.parseJsonText("/proj/lpc-config.json", json) as lpc.LpcConfigSourceFile;
        return lpc.parseLpcSourceFileConfigFileContent(configFile, lpc.sys, "/proj", /*existingOptions*/ undefined, "/proj/lpc-config.json").options;
    }

    it("defaults to strict type checking with no default pragmas", () => {
        const options = parse(`{}`);
        expect(options.typeChecking).toBe("strict");
        expect(options.defaultPragmas).toEqual([]);
    });

    it("reads typeChecking and defaultPragmas", () => {
        const options = parse(`{ "typeChecking": "driver", "defaultPragmas": ["strict_types", " save_types ", 5, ""] }`);
        expect(options.typeChecking).toBe("driver");
        expect(options.defaultPragmas).toEqual(["strict_types", "save_types"]);
    });

    it("treats an unknown typeChecking value as strict", () => {
        expect(parse(`{ "typeChecking": "loose" }`).typeChecking).toBe("strict");
    });
});

describe.each([
    ["FluffOS", FluffOS],
    ["LDMud", LDMud],
] as const)("driver type checking (%s)", (_name, driver) => {
    const isLD = driver === LDMud;

    describe("strict mode is unchanged", () => {
        it("still reports a call to a function a bare object is not known to have", () => {
            expect(codes(driver, `void test(object o) {\n  o->foo();\n}\n`, { mode: "strict" })).toEqual([2339]);
        });
        it("still narrows, and still rejects a void in a condition", () => {
            expect(codes(driver, `string f() {\n  mixed b;\n  b = 1;\n  return b;\n}\n`, { mode: "strict" })).toEqual([2322]);
            expect(codes(driver, `void noop() {}\nint f() { return !noop(); }\n`, { mode: "strict" })).toEqual([1345]);
        });
        it("ignores pragmas when deciding what to report", () => {
            expect(codes(driver, `#pragma strict_types\nfoo() {}\n`, { mode: "strict" })).toEqual([]);
        });
    });

    describe("call_other", () => {
        it("accepts any function name on an object, an object array or a string (#415)", () => {
            const source = `int a(object o) { return o->query_foo(); }\n`
                + `mixed e(object *obs) { return obs->query_x(); }\n`
                + `int g(string path) { return path->query_baz(); }\n`
                + `void h() { "/target"->nope(); this_object()->local(); }\n`;
            expect(diagnostics(driver, source, { files: target })).toEqual([]);
        });

        if (isLD) {
            it("accepts an object|lwobject receiver (#415)", () => {
                expect(diagnostics(driver, `int a(object|lwobject o) { return o->query_foo(); }\n`)).toEqual([]);
            });
        }

        it("does not check the arguments", () => {
            expect(diagnostics(driver, `void test(object o) {\n  o->foo(1, 2, 3);\n  "/target"->do_command();\n}\n`, { files: target })).toEqual([]);
        });

        it("gives a mixed result whatever the target declares (#415)", () => {
            const source = `string test(string verb) {\n  string s = "/target"->foo();\n  return "/target"->do_command(verb, 0);\n}\n`;
            expect(diagnostics(driver, source, { files: target })).toEqual([]);
            expect(codes(driver, source, { files: target, mode: "strict" })).toEqual([2322, 2322]);
        });

        it("still resolves the target's function for hover", () => {
            const source = `void test() {\n  "/target"->name();\n}\n`;
            const { ls, abs } = createTestLanguageService({ "test.c": source, ...target }, { driverType: driver, diagnostics: true, typeChecking: "driver" });
            expect(hoverText(ls, abs("test.c"), source.indexOf("name"), { collapse: true })).toBe("function string name()");
        });

        it(isLD ? "rejects a receiver that cannot be an object" : "accepts any receiver", () => {
            expect(codes(driver, `void test() {\n  int i;\n  i->foo();\n}\n`)).toEqual(isLD ? [2339] : []);
        });
    });

    describe("#pragma strict_types and call_other results", () => {
        const strict = (body: string) => `#pragma strict_types\n${body}`;

        it(isLD ? "requires a cast where the result is used" : "requires no cast", () => {
            const expected = isLD ? [MUST_CAST] : [];
            expect(diagnostics(driver, strict(`void test(object o) {\n  string s = o->name();\n}\n`))).toEqual(expected);
            expect(diagnostics(driver, strict(`void test(object o) {\n  if (o->h()) return;\n}\n`))).toEqual(expected);
            expect(diagnostics(driver, strict(`void g(string s) {}\nvoid test(object o) {\n  g(o->h());\n}\n`))).toEqual(expected);
            expect(diagnostics(driver, strict(`void test(object o) {\n  o->a()->b();\n}\n`))).toEqual(expected);
        });

        it("accepts a cast, a discarded result, and an argument to another call_other", () => {
            const source = strict(`void test(object o) {\n  string s = (string)o->name();\n  o->name();\n  o->g(o->h());\n  for (o->a(); 0; o->b()) ;\n}\n`);
            expect(diagnostics(driver, source)).toEqual([]);
        });

        it("needs no cast under strong_types", () => {
            expect(diagnostics(driver, `#pragma strong_types\nvoid test(object o) {\n  string s = o->name();\n}\n`)).toEqual([]);
        });
    });

    describe("pragmas that require a return type", () => {
        it("reports an untyped function under strict_types", () => {
            const expected = ["9062: '#pragma strict_types' requires a return type for function 'foo'."];
            // FluffOS exempts create(), which it types void.
            if (isLD) expected.push("9062: '#pragma strict_types' requires a return type for function 'create'.");
            expect(diagnostics(driver, `#pragma strict_types\nfoo() {}\ncreate() {}\nint bar() { return 1; }\n`)).toEqual(expected);
        });

        it(isLD ? "reports one under strong_types" : "has no strong_types", () => {
            expect(diagnostics(driver, `#pragma strong_types\nfoo() {}\n`)).toEqual(
                isLD ? ["9062: '#pragma strong_types' requires a return type for function 'foo'."] : []);
        });

        it("applies a pragma from its line on, and until it is turned off", () => {
            const off = isLD ? "weak_types" : "no_strict_types";
            const source = `a() {}\n#pragma strict_types\nb() {}\n#pragma ${off}\nc() {}\n`;
            expect(codes(driver, source)).toEqual([9062]);
            expect(diagnostics(driver, source)[0]).toContain("'b'");
        });

        it("keeps a pragma from an included header in force", () => {
            const { ls, abs } = createTestLanguageService({
                "lib/main.c": `#include "/inc/pragmas.h"\nfoo() {}\n`,
                "lib/inc/pragmas.h": `#pragma strict_types\n`,
            }, { driverType: driver, diagnostics: true, typeChecking: "driver", rootDir: LIB_ROOT });
            const main = abs("lib/main.c");
            expect([...ls.getSyntacticDiagnostics(main), ...ls.getSemanticDiagnostics(main)].map(d => d.code)).toEqual([9062]);
        });

        it("starts every file with defaultPragmas, which the file can still turn off", () => {
            expect(codes(driver, `foo() {}\n`, { defaultPragmas: ["strict_types"] })).toEqual([9062]);
            const off = isLD ? "weak_types" : "no_strict_types";
            expect(codes(driver, `#pragma ${off}\nfoo() {}\n`, { defaultPragmas: ["strict_types"] })).toEqual([]);
        });

        it(isLD ? "takes a comma-separated list" : "ignores a line with more than one pragma", () => {
            expect(codes(driver, `#pragma strict_types, save_types\nfoo() {}\n`)).toEqual(isLD ? [9062] : []);
        });
    });

    describe("functions without a declared return type", () => {
        it(isLD ? "still checks a plain assignment" : "do not check an assignment", () => {
            expect(codes(driver, `foo() {\n  string s;\n  s = 1;\n}\n`)).toEqual(isLD ? [2322] : []);
        });

        it(isLD ? "do not check a local's initialiser" : "still check a local's initialiser", () => {
            expect(codes(driver, `foo() {\n  string s = 1;\n}\n`)).toEqual(isLD ? [] : [2322]);
        });

        it("do not check operators or returns", () => {
            expect(codes(driver, `foo() {\n  string s;\n  int i = s - 1;\n  s++;\n  return s * s;\n}\n`)).toEqual([]);
        });

        it(isLD ? "still reject == between unrelated types" : "do not check ==", () => {
            expect(codes(driver, `foo() {\n  string s;\n  int i;\n  return s == i;\n}\n`)).toEqual(isLD ? [2367] : []);
        });

        it("return mixed to their callers", () => {
            expect(codes(driver, `h() { return "x"; }\nvoid f() {\n  int i;\n  i = h();\n}\n`)).toEqual([]);
            expect(codes(driver, `h() { return "x"; }\nvoid f() {\n  int i;\n  i = h();\n}\n`, { mode: "strict" })).toEqual([2322]);
        });

        it(isLD ? "still reject a cast between unrelated types" : "do not check casts", () => {
            expect(codes(driver, `foo(int i) {\n  string *a = (string*)i;\n}\n`)).toEqual(isLD ? [2352] : []);
        });

        it("still check a global's initialiser", () => {
            expect(codes(driver, `string g = 1;\n`)).toEqual([2322]);
        });
    });

    describe("a call to a function nothing defines (#446)", () => {
        // Where exact_types is off both drivers compile the call to an undefined stub, and
        // it fails only if it runs. LDMud 3.6.7 loads `a() { return never_defined(); }`.
        it("is not reported in a function without a return type", () => {
            expect(codes(driver, `a() { return never_defined(); }\n`)).toEqual([]);
            expect(codes(driver, `a() { never_defined(1, "x"); }\n`)).toEqual([]);
        });

        it("is reported in a function with a return type", () => {
            expect(codes(driver, `int a() { return never_defined(); }\n`)).toEqual([2304]);
            expect(codes(driver, `void a() { never_defined(); }\n`)).toEqual([2304]);
        });

        it("is still reported outside driver mode", () => {
            expect(codes(driver, `a() { return never_defined(); }\n`, { mode: "strict" })).toEqual([2304]);
        });

        it("is reported in a `function` closure, which is always typed", () => {
            expect(codes(driver, `a() { function f = function() { return never_defined(); }; return f; }\n`)).toEqual([2304]);
        });

        it(isLD ? "is reported in a `(: :)` closure" : "follows the enclosing function in a `(: :)` closure", () => {
            expect(codes(driver, `a() { function f = (: never_defined() :); return f; }\n`)).toEqual(isLD ? [2304] : []);
            expect(codes(driver, `mixed a() { function f = (: never_defined() :); return f; }\n`)).toEqual([2304]);
        });

        it("is still reported in a global initialiser, which runs when the object loads", () => {
            expect(codes(driver, `mixed x = never_defined();\n`)).toEqual([2304]);
            expect(codes(driver, `f() { }\nmixed x = never_defined();\n`)).toEqual([2304]);
        });

        it("still reports an undefined variable passed to it", () => {
            expect(codes(driver, `a() { return never_defined(nope); }\n`)).toEqual([2304]);
        });

        it(isLD ? "is a warning under #pragma pedantic, until #pragma sloppy" : "ignores #pragma pedantic", () => {
            const pedantic = diagnostics(driver, `#pragma pedantic\na() { return never_defined(); }\n#pragma sloppy\nb() { return also_undefined(); }\n`);
            expect(pedantic).toEqual(isLD ? ["9078: Undefined function 'never_defined'."] : []);
            expect(codes(driver, `a() { return never_defined(); }\n`, { defaultPragmas: ["pedantic"] })).toEqual(isLD ? [9078] : []);
        });
    });

    describe("code at file scope", () => {
        // Neither driver resets `exact_types` for a global initialiser, so it is checked
        // under what the function compiled just before it left behind.
        const operator = `string s;\nint i = s - 1;\n`;

        it("is checked after a typed function", () => {
            expect(codes(driver, `void a() { }\n${operator}`)).toEqual([2365]);
        });

        it("is not checked after an untyped function, or with no function before it", () => {
            expect(codes(driver, `void a() { }\nx() { }\n${operator}`)).toEqual([]);
            expect(codes(driver, operator)).toEqual([]);
        });

        it("goes by the inherited program's last function when there is none of its own", () => {
            const source = `inherit "/base";\n${operator}`;
            expect(codes(driver, source, { files: { "base.c": `int g() { return 1; }\n` } })).toEqual([2365]);
            expect(codes(driver, source, { files: { "base.c": `int g() { return 1; }\nh() { }\n` } })).toEqual([]);
        });

        it("checks a call's arguments after a typed function", () => {
            expect(codes(driver, `int f(int i) { return i; }\nint x = f("s");\n`)).toEqual([2345]);
            expect(codes(driver, `int f(int i) { return i; }\nx() { }\nint y = f("s");\n`)).toEqual([]);
        });

        it("checks an efun's argument types after a typed function", () => {
            expect(codes(driver, `void a() { }\nint x = random("x");\n`)).toEqual([2345]);
            expect(codes(driver, `x() { }\nint y = random("x");\n`)).toEqual([]);
        });

        it(isLD ? "always rejects == between unrelated types" : "checks == only after a typed function", () => {
            const equality = `string s;\nint i;\nint b = s == i;\n`;
            expect(codes(driver, `void a() { }\n${equality}`)).toEqual([2367]);
            expect(codes(driver, `x() { }\n${equality}`)).toEqual(isLD ? [2367] : []);
        });
    });

    describe("assignability in a typed function", () => {
        it("accepts a value whose type overlaps the target", () => {
            expect(codes(driver, `int f(int|string v) {\n  int r = v;\n  return r;\n}\n`)).toEqual([]);
            expect(codes(driver, `void f(int c) {\n  string s = c ? "a" : 1;\n}\n`)).toEqual([]);
        });

        it("rejects one with nothing in common", () => {
            expect(codes(driver, `void f() {\n  string s = 1;\n}\n`)).toEqual([2322]);
            expect(codes(driver, `string f() { return 1; }\n`)).toEqual([2322]);
            expect(codes(driver, `void f() {\n  int *a;\n  string *s;\n  a = s;\n}\n`)).toEqual([2322]);
        });

        it("uses declared types, not narrowed ones (#415)", () => {
            expect(codes(driver, `string f(int x) {\n  mixed b;\n  b = x ? "y" : 0;\n  b = 1;\n  return b;\n}\n`)).toEqual([]);
            expect(codes(driver, `string f(mixed v) {\n  if (intp(v)) return v;\n  return "";\n}\n`)).toEqual([]);
        });

        it(isLD ? "checks every element of an all-literal array" : "never checks an array literal's elements", () => {
            expect(codes(driver, `void f() {\n  int *a = ({ "x" });\n}\n`)).toEqual(isLD ? [2322] : []);
        });

        it(isLD ? "rejects a void value returned as int" : "accepts a void value returned as int", () => {
            expect(codes(driver, `void v() {}\nint f() {\n  return v();\n}\n`)).toEqual(isLD ? [2322] : []);
        });
    });

    it("accepts a void call tested for truth (#415)", () => {
        expect(codes(driver, `void noop() {}\nint f() {\n  return noop() || 1;\n}\nint g() { return !noop(); }\n`)).toEqual([]);
    });

    describe("function arguments", () => {
        it(isLD ? "checks both counts between typed functions" : "checks only too few arguments between typed functions", () => {
            expect(codes(driver, `void g(int x) {}\nvoid f() {\n  g();\n  g(1, 2);\n}\n`)).toEqual(isLD ? [2554, 2554] : [2554]);
            expect(codes(driver, `void g(int x) {}\nvoid f() {\n  g("s");\n}\n`)).toEqual([2345]);
        });

        it("checks nothing from an untyped caller, to an untyped callee, or to a varargs function", () => {
            expect(codes(driver, `void g(int x) {}\nf() {\n  g();\n  g("s", 2);\n}\n`)).toEqual([]);
            expect(codes(driver, `g(x) {}\nvoid f() {\n  g();\n  g(1, 2);\n}\n`)).toEqual([]);
            expect(codes(driver, `varargs void g(int x) {}\nvoid f() {\n  g();\n}\n`)).toEqual([]);
        });

        it("checks a function only prototyped here, but not one first declared without a type", () => {
            expect(codes(driver, `void g(int x);\nvoid f() {\n  g();\n}\n`)).toEqual([2554]);
            expect(codes(driver, `g(x);\nvoid f() {\n  g();\n}\n`)).toEqual([]);
        });

        const base = { "base.c": `int g(int x) { return x; }\n` };
        const savedBase = { "base.c": `#pragma save_types\nint g(int x) { return x; }\n` };
        const inheritCall = `inherit "/base";\nvoid f() {\n  g();\n  g(1, 2);\n}\n`;

        it(isLD ? "checks an inherited function only if its program saved types" : "checks an inherited function, since save_types is on by default", () => {
            expect(codes(driver, inheritCall, { files: base })).toEqual(isLD ? [] : [2554]);
            expect(codes(driver, inheritCall, { files: savedBase })).toEqual(isLD ? [2554, 2554] : [2554]);
            expect(codes(driver, inheritCall, { files: { "base.c": `#pragma no_save_types\nint g(int x) { return x; }\n` } })).toEqual([]);
        });

        it(isLD ? "checks ::f() like an inherited function" : "never checks ::f()", () => {
            const source = `inherit "/base";\nint g(int x) { return ::g(); }\n`;
            expect(codes(driver, source, { files: base })).toEqual([]);
            expect(codes(driver, source, { files: savedBase })).toEqual(isLD ? [2554] : []);
        });

        it(isLD ? "rejects too many arguments to a simul-efun anywhere" : "never checks a simul-efun call", () => {
            const files = { "obj/sefun.c": `int sf(int x) { return x; }\n` };
            const calls = `{\n  sf();\n  sf(1, 2);\n  sf("x");\n}\n`;
            expect(codes(driver, `f() ${calls}`, { files })).toEqual(isLD ? [2554] : []);
            expect(codes(driver, `void f() ${calls}`, { files })).toEqual(isLD ? [2554] : []);
        });

        it("counts an efun's arguments everywhere, but checks their types only in a typed function", () => {
            expect(codes(driver, `foo() {\n  random();\n}\n`)).toEqual([2554]);
            expect(codes(driver, `foo() {\n  random("x");\n}\n`)).toEqual([]);
            expect(codes(driver, `void foo() {\n  random("x");\n}\n`)).toEqual([2345]);
        });
    });
});
