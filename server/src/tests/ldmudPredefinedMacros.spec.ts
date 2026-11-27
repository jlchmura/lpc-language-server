import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * Macros LDMud defines in every program (lex.c, init_lexer): __MASTER_OBJECT__ is the master's
 * name, __FUNCTION__ the name of the function being compiled, __VERSION__ the driver version.
 * Comparing one with a string it can't equal puts its expansion in the error message.
 */
function diagnosticsFor(source: string, options?: Partial<lpc.CompilerOptions>, driverType = lpc.LanguageVariant.LDMud, files: Record<string, string> = {}): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source, ...files }, { driverType, diagnostics: true, ...options });
    return allDiagnostics(ls, abs("test.c")).map(codeAndMessage);
}

const noOverlap = (value: string) => `2367: This comparison appears to be unintentional because the types '"${value}"' and '"x"' have no overlap.`;

describe("LDMud predefined macros", () => {
    it("defines __MASTER_OBJECT__ from libFiles.master, without the .c", () => {
        expect(diagnosticsFor(`int m = __MASTER_OBJECT__ == "x";`)).toEqual([noOverlap("/obj/master")]);
        expect(diagnosticsFor(`int m = __MASTER_OBJECT__ == "x";`, { masterFile: "/secure/master.c" })).toEqual([noOverlap("/secure/master")]);
    });

    it("lets a call_other go to __MASTER_OBJECT__", () => {
        const master = { "obj/master.c": "int check_test() { return 1; }" };
        expect(diagnosticsFor(`int f() { string s = __MASTER_OBJECT__ ".gc.log"; return __MASTER_OBJECT__->check_test(); }`, undefined, undefined, master)).toEqual([]);
        expect(diagnosticsFor(`void f() { __MASTER_OBJECT__->no_such_fn(); }`, undefined, undefined, master)).toEqual([
            `2339: Property 'no_such_fn' does not exist on type 'object "/obj/master"'.`,
        ]);
    });

    it("lets a config define override __MASTER_OBJECT__", () => {
        expect(diagnosticsFor(`int m = __MASTER_OBJECT__ == "x";`, { configDefines: { __MASTER_OBJECT__: `"/sys/master"` } })).toEqual([noOverlap("/sys/master")]);
    });

    it("expands __FUNCTION__ to the enclosing function's name, also inside a closure", () => {
        const source = `int test() {
    int a = __FUNCTION__ == "test";
    int b = funcall(function() { return __FUNCTION__ == "test"; });
    int c = funcall((: __FUNCTION__ == "test" :));
    return a && b && c;
}
int other() { return __FUNCTION__ == "x"; }`;
        expect(diagnosticsFor(source)).toEqual([noOverlap("other")]);
    });

    it("does not define __FUNCTION__ outside a function", () => {
        expect(diagnosticsFor(`string s = __FUNCTION__;`)).toEqual([`2304: Cannot find name '__FUNCTION__'.`]);
    });

    it("keeps a program's own #define __FUNCTION__", () => {
        expect(diagnosticsFor(`#define __FUNCTION__ 42\nint f() { return __FUNCTION__; }`)).toEqual([]);
    });

    it("defines __VERSION__ as a string", () => {
        expect(diagnosticsFor(`string version() { return __VERSION__; }`)).toEqual([]);
    });
});

describe("FluffOS has no __MASTER_OBJECT__ or __FUNCTION__", () => {
    it("reports both as unknown names", () => {
        expect(diagnosticsFor(`void f() { string m = __MASTER_OBJECT__; string n = __FUNCTION__; }`, undefined, lpc.LanguageVariant.FluffOS)).toEqual([
            "2304: Cannot find name '__MASTER_OBJECT__'.",
            "2304: Cannot find name '__FUNCTION__'.",
        ]);
    });
});
