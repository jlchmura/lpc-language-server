import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService, codeAndMessage } from "./harness.js";

/**
 * Arguments passed to an LDMud `varargs <type> *args` parameter.
 *
 * The extra arguments are collected into the array, so each one is checked against the
 * element type. The checker looked the element type up with an indexed access, which
 * gives `unknown` for an LPC array, so any argument was accepted: `g("a")` for
 * `g(varargs int *b)`, and `min(1, "a")` once efun.h declared min's rest parameter as an
 * array.
 */
function errors(body: string): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": body }, {
        driverType: lpc.LanguageVariant.LDMud,
        diagnostics: true,
    });
    return ls.getSemanticDiagnostics(abs("test.c")).map(codeAndMessage);
}

describe("arguments to an LDMud varargs array parameter", () => {
    it("are checked against the element type", () => {
        expect(errors(`int g(int a, varargs int *b) { return a; }\nvoid f() { g(1, 2, "a"); }\n`)).toEqual([
            "2345: Argument of type 'string' is not assignable to parameter of type 'int'.",
        ]);
        expect(errors(`int g(varargs int *b) { return 1; }\nvoid f() { g("a"); }\n`)).toEqual([
            "2345: Argument of type 'string' is not assignable to parameter of type 'int'.",
        ]);
    });

    it("accept matching arguments, none at all, and anything for mixed", () => {
        expect(errors(`
            int g(int a, varargs int *b) { return a; }
            int h(varargs mixed *b) { return 1; }
            void f() { g(1); g(1, 2, 3); h(1, "a", ({ }), ([ ])); h(); }
        `)).toEqual([]);
    });

    it("reject max()/min() arguments of mixed kinds", () => {
        expect(errors(`void f() { min(1, "a"); }`)).toHaveLength(1);
        expect(errors(`void f() { max("a", "b", 1); }`)).toHaveLength(1);
    });
});
