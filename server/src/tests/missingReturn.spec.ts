import * as lpc from "./_namespaces/lpc.js";
import { codeAndMessage, createTestLanguageService, LIB_ROOT } from "./harness.js";

/**
 * A typed function that can run off its end (#447). LDMud warns "Missing 'return <value>'
 * statement" unless `#pragma no_warn_missing_return` is in force when it reaches the end of
 * the function (prolang.y def_function_check_return); FluffOS has no such warning. Whether
 * the end is reachable is LDMud's own `may_finish`, which is simpler than the checker's
 * control flow. Every LDMud expectation was compiled with LDMud 3.6.7.
 */

const LDMud = lpc.LanguageVariant.LDMud;
const FluffOS = lpc.LanguageVariant.FluffOS;

interface Options {
    driver?: lpc.LanguageVariant;
    mode?: lpc.TypeCheckingMode;
    defaultPragmas?: string[];
}

function diagnostics(source: string, { driver = LDMud, mode = "driver", defaultPragmas }: Options = {}): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType: driver, diagnostics: true, typeChecking: mode, defaultPragmas });
    return [...ls.getSyntacticDiagnostics(abs("test.c")), ...ls.getSemanticDiagnostics(abs("test.c"))].map(codeAndMessage);
}

const codes = (source: string, options?: Options) => diagnostics(source, options).map(d => Number(d.slice(0, d.indexOf(":"))));

/** Whether LDMud driver mode warns about a missing return in `source`. */
const warns = (source: string, options?: Options) => codes(source, options).includes(9079);

describe("missing return in LDMud driver mode", () => {
    it("warns for a typed function with no return", () => {
        expect(diagnostics(`int a() { }\n`)).toEqual(["9079: Missing 'return <value>' statement."]);
        expect(warns(`mixed a() { }\n`)).toBe(true);
        expect(warns(`status a() { }\n`)).toBe(true);
    });

    it("warns when only some paths return (the reverse case in #447)", () => {
        expect(warns(`int a(int x) { if (x) return 1; }\n`)).toBe(true);
        expect(warns(`int a(int x) { if (x) return 1; else if (!x) return 2; }\n`)).toBe(true);
        expect(warns(`int a(int x) { while (x) { return 1; } }\n`)).toBe(true);
        expect(warns(`int a(int *x) { foreach (int i : x) return i; }\n`)).toBe(true);
        expect(warns(`int a() { catch(raise_error("x")); }\n`)).toBe(true);
    });

    it("does not warn when every path returns", () => {
        expect(warns(`int a(int x) { if (x) return 1; else return 2; }\n`)).toBe(false);
        expect(warns(`int a() { { return 1; } }\n`)).toBe(false);
        expect(warns(`int a() { return 1; a(); }\n`)).toBe(false);
        expect(warns(`int a() { do { return 1; } while (0); }\n`)).toBe(false);
    });

    it("does not warn for void, untyped functions or prototypes", () => {
        expect(warns(`void a() { }\n`)).toBe(false);
        expect(warns(`a() { }\n`)).toBe(false);
        expect(warns(`int a();\n`)).toBe(false);
    });

    it("takes an endless loop to finish, as the driver does", () => {
        expect(warns(`int a() { while (1) { } }\n`)).toBe(true);
        expect(warns(`int a() { for (;;) { } }\n`)).toBe(true);
    });

    it("knows raise_error and throw do not return, but only as the statement's last instruction", () => {
        expect(warns(`int a() { raise_error("x"); }\n`)).toBe(false);
        expect(warns(`int a() { throw("x"); }\n`)).toBe(false);
        expect(warns(`int a() { (raise_error("x")); }\n`)).toBe(false);
        expect(warns(`int a() { 0, raise_error("x"); }\n`)).toBe(false);
        expect(warns(`int a() { efun::raise_error("x"); }\n`)).toBe(false);
        expect(warns(`int a() { ::raise_error("x"); }\n`)).toBe(true);
        expect(warns(`int a(int x) { if (x) raise_error("a"); else return 1; }\n`)).toBe(false);
        expect(warns(`int a(int x) { x ? raise_error("a") : raise_error("b"); }\n`)).toBe(true);
    });

    it("follows the driver through a switch", () => {
        expect(warns(`int a(int x) { switch (x) { case 1: return 1; default: return 2; } }\n`)).toBe(false);
        expect(warns(`int a(int x) { switch (x) { case 1: return 1; } }\n`)).toBe(true);
        expect(warns(`int a(int x) { switch (x) { default: return 1; case 2: x++; } }\n`)).toBe(true);
        expect(warns(`int a(int x) { switch (x) { case 1: break; default: return 1; } }\n`)).toBe(true);
    });

    it("follows the driver through a do-while", () => {
        expect(warns(`int a() { do { continue; } while (0); }\n`)).toBe(true);
        expect(warns(`int a() { do { break; } while (1); }\n`)).toBe(true);
        expect(warns(`int a(int x) { do { if (x) continue; return 1; } while (0); }\n`)).toBe(true);
    });

    it("checks a `function` closure, typed or not", () => {
        expect(warns(`void b() { closure c = function int () { }; }\n`)).toBe(true);
        expect(warns(`void b() { closure c = function () { }; }\n`)).toBe(true);
        expect(warns(`void b() { closure c = function void () { }; }\n`)).toBe(false);
        expect(warns(`void b() { closure c = function int () { return 1; }; }\n`)).toBe(false);
    });
});

describe("#pragma no_warn_missing_return (#447)", () => {
    it("turns the warning off", () => {
        expect(warns(`#pragma no_warn_missing_return\nint a() { }\n`)).toBe(false);
        expect(warns(`#pragma no_warn_missing_return\nint a(int x) { if (x) return 1; }\n`)).toBe(false);
    });

    it("can come from an include or from defaultPragmas", () => {
        const { ls, abs } = createTestLanguageService({
            "lib/main.c": `#include "/inc/nw.h"\nint a() { }\n`,
            "lib/inc/nw.h": `#pragma no_warn_missing_return\n`,
        }, { driverType: LDMud, diagnostics: true, typeChecking: "driver", rootDir: LIB_ROOT });
        const main = abs("lib/main.c");
        expect([...ls.getSyntacticDiagnostics(main), ...ls.getSemanticDiagnostics(main)].map(d => d.code)).toEqual([]);
        expect(warns(`int a() { }\n`, { defaultPragmas: ["no_warn_missing_return"] })).toBe(false);
    });

    it("is read at the end of the function", () => {
        expect(warns(`int a() { }\n#pragma no_warn_missing_return\n`)).toBe(true);
        expect(warns(`int a() {\n#pragma no_warn_missing_return\n}\n`)).toBe(false);
        // ...and a pragma inside one function holds for the next.
        expect(warns(`int a() {\n#pragma no_warn_missing_return\n  return 1;\n}\nint b() { }\n`)).toBe(false);
    });

    it("is undone by #pragma warn_missing_return", () => {
        expect(diagnostics(`#pragma no_warn_missing_return\nint a() { }\n#pragma warn_missing_return\nint b() { }\n`).length).toBe(1);
    });

    it("also silences the strict-mode warning", () => {
        expect(codes(`int a() { }\n`, { mode: "strict" })).toEqual([2355]);
        expect(codes(`#pragma no_warn_missing_return\nint a() { }\n`, { mode: "strict" })).toEqual([]);
    });
});

describe("missing return in FluffOS", () => {
    it("is not reported in driver mode -- the driver has no such warning", () => {
        expect(codes(`int a() { }\n`, { driver: FluffOS })).toEqual([]);
        expect(codes(`int a(int x) { if (x) return 1; }\n`, { driver: FluffOS })).toEqual([]);
    });

    it("is unchanged in strict mode, and ignores the LDMud pragma", () => {
        expect(codes(`int a() { }\n`, { driver: FluffOS, mode: "strict" })).toEqual([2355]);
        expect(codes(`#pragma no_warn_missing_return\nint a() { }\n`, { driver: FluffOS, mode: "strict" })).toEqual([2355]);
    });
});
