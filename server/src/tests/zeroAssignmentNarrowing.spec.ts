import * as lpc from "./_namespaces/lpc.js";
import { codeAndMessage, createTestLanguageService, DRIVERS, hoverText } from "./harness.js";

/**
 * Assigning to a variable declared `mixed`, `object` or `mapping` narrows it to what was
 * assigned (getTypeAtFlowAssignment treats those declared types like auto). The assigned type
 * was widened first, which turns the literal `0` into `int`. But `0` is a member of every LPC
 * type -- it is the null of a string, object, mapping or array as well as an int -- and the
 * checker accepts it wherever any type is expected. So widening it to `int` was wrong in
 * every mode (#415, item 6):
 *
 *     string f(int x) { mixed b; b = x ? "y" : 0; return b; }   // 'string | int' not assignable
 *     object ob; ob = 0;                                       // ob became `mixed*`
 *
 * `0` now drops out of the assigned type: `x ? "y" : 0` narrows to `string`, and assigning
 * `0` alone leaves the declared type. Narrowing `mixed` to a non-zero value is unchanged:
 * `mixed b = 5; return b;` in a string function is still reported.
 */

/** Diagnostics for `source`, and the hover text at the last occurrence of `marker` (offset into it by `offset`). */
function check(driverType: lpc.LanguageVariant, source: string, marker: string, offset = 0) {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType, diagnostics: true });
    const file = abs("test.c");
    const diagnostics = ls.getSemanticDiagnostics(file).map(codeAndMessage);
    const hover = hoverText(ls, file, source.lastIndexOf(marker) + offset) ?? "";
    return { diagnostics, hover };
}

describe.each(DRIVERS)("assigning 0 to a narrowed variable (%s)", (_name, driverType) => {
    it("narrows `x ? \"y\" : 0` to string, so it can be returned from a string function", () => {
        const assigned = check(driverType, `string f(int x) { mixed b; b = x ? "y" : 0; return b; }\n`, "return b", 7);
        expect(assigned).toEqual({ diagnostics: [], hover: "(local var)  string b" });

        const initialized = check(driverType, `string f(int x) { mixed b = x ? "y" : 0; return b; }\n`, "return b", 7);
        expect(initialized).toEqual({ diagnostics: [], hover: "(local var)  string b" });
    });

    it("leaves the declared type when only 0 is assigned", () => {
        expect(check(driverType, `string f() { mixed b; b = 0; return b; }\n`, "return b", 7))
            .toEqual({ diagnostics: [], hover: "(local var)  mixed b" });
        expect(check(driverType, `string f(mixed b) { b = 0; return b; }\n`, "return b", 7))
            .toEqual({ diagnostics: [], hover: "(parameter)  mixed b" });
    });

    it("still narrows mixed to a non-zero value", () => {
        const { diagnostics, hover } = check(driverType, `string f(int x) { mixed b = x ? 5 : 0; return b; }\n`, "return b", 7);
        expect(diagnostics).toEqual(["2322: Type 'int' is not assignable to type 'string'."]);
        expect(hover).toBe("(local var)  int b");
    });

    it("keeps an object or mapping variable its declared type", () => {
        expect(check(driverType, `void f() { object ob; ob = 0; return; }\n`, "ob = 0").hover).toBe("(local var)  object ob");
        expect(check(driverType, `void f(int x) { object ob; ob = x ? this_object() : 0; ob; }\n`, "ob;").hover)
            .toBe(`(local var)  object "/test" ob`);
        expect(check(driverType, `void f() { mapping m; m = 0; m["a"] = 1; }\n`, `m["a"]`)).toEqual({
            diagnostics: [],
            hover: "(local var)  mapping m",
        });
    });

    it("does not leave `| int` behind when a variable starts at 0", () => {
        const source = `void f(int x) { mixed b = 0; if (x) b = this_object(); b->query_name(); }\n`;
        expect(check(driverType, source, "b->")).toEqual({ diagnostics: [], hover: "(local var)  mixed b" });
    });
});
