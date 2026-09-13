import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService } from "./harness.js";

/**
 * `arr->func()` against an array of objects calls func on every element and hands back an
 * array of the returns. Both drivers do this. FluffOS, under call_other(): "If the first
 * argument is an array instead of an object, then the call will be done in all elements of
 * that array ..., and an array of returns will be returned." LDMud, under call_other(E):
 * "the function is called with the same arguments in all the given objects. The single
 * results are collected in an array and yield the final result" -- whose own example is
 * `string *s; s = (string *)users()->short();`. Non-optional there since LDMud 3.5.0.
 *
 * The checker resolved the member against the array's *element* type so the lookup would
 * succeed, but nothing put the array back afterwards, so the call typed as a single element's
 * return. That reads as a false negative on its own:
 *
 *     string name = livings()->query_name();     // accepted; it is a string*
 *
 * and turns into a spurious error once the result is passed on, because a generic parameter
 * infers from it:
 *
 *     sort_array(who->query_name(), 1)           // T inferred as `string`, so `arr` wanted
 *                                                // `string*` and the argument "did not match"
 *
 * A mixed return is left alone: `mixed` already accepts an array, and it is also what the
 * checker hands back for the shapes it does not model (an optional `?->` chain, say), which
 * should not be turned into `mixed*`.
 */
function diagnosticsFor(driver: lpc.LanguageVariant, source: string, extraFiles: Record<string, string> = {}): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source, ...extraFiles }, {
        driverType: driver,
        diagnostics: true,
    });
    return ls.getSemanticDiagnostics(abs("test.c"))
        .map(d => `${d.code}: ${lpc.flattenDiagnosticMessageText(d.messageText, " ")}`);
}

const body = {
    "body.c": `string query_name() { return "bob"; }\nint query_level() { return 1; }\nvoid quit() {}\nmixed query_stuff() { return 0; }\n`,
};

/** Runs `stmt` with `who` an array of body.c objects and `one` a single one. */
function call(driver: lpc.LanguageVariant, stmt: string): string[] {
    return diagnosticsFor(
        driver,
        `/** @type {"body.c"*} */ object *who;\n`
        + `/** @type {"body.c"} */ object one;\n`
        + `test() {\n  ${stmt}\n}\n`,
        body,
    );
}

describe.each([
    ["FluffOS", lpc.LanguageVariant.FluffOS],
    ["LDMud", lpc.LanguageVariant.LDMud],
] as const)("a call-other against an array of objects (%s)", (_name, driver) => {
    it("returns an array of the element returns", () => {
        expect(call(driver, `string *names = who->query_name();`)).toEqual([]);
        expect(call(driver, `int *levels = who->query_level();`)).toEqual([]);
    });

    it("reports assigning that array to a scalar", () => {
        expect(call(driver, `string name = who->query_name();`).join(" "))
            .toContain("2322: Type 'string*' is not assignable to type 'string'.");
    });

    it("leaves a call against a single object scalar", () => {
        expect(call(driver, `string name = one->query_name();`)).toEqual([]);
        expect(call(driver, `string *names = one->query_name();`).join(" "))
            .toContain("2322: Type 'string' is not assignable to type 'string*'.");
    });

    it("leaves a void return alone", () => {
        // The driver produces no `void*`, and the result is discarded anyway.
        expect(call(driver, `who->quit();`)).toEqual([]);
    });

    it("leaves a mixed return alone", () => {
        // mixed already accepts an array, and it doubles as the checker's "not modelled" type.
        expect(call(driver, `string stuff = who->query_stuff();`)).toEqual([]);
    });
});

describe("a generic efun parameter", () => {
    it("infers from the array a call-other produced, not from its element", () => {
        // The reported symptom. FluffOS's sort_array is `@template T` / `@param {T*} arr`, so
        // an element return made T a scalar and the argument then fit no overload. LDMud's
        // sort_array is not generic and has no `(arr, direction)` form, so it has nothing to
        // say here -- the behaviour under test is the argument's type, covered for both above.
        expect(call(lpc.LanguageVariant.FluffOS, `string *sorted = sort_array(who->query_name(), 1);`)).toEqual([]);
    });
});
