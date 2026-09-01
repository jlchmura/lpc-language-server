import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService } from "./harness.js";

/**
 * An array variable kept whatever array type was assigned into it, even when that type was
 * *wider* than its own declaration:
 *
 *     int *result = sort_array(items, 1);   // sort_array returned mixed*
 *     result;                               // reported as mixed*
 *
 * Narrowing is supposed to make a type more specific -- that branch exists so that assigning a
 * narrower array type to a declared array narrows the reference (lpc-language-server#190). A
 * `mixed*` passes the assignability check because `mixed` is `any`, so it was adopted too, and
 * the variable widened past its own declaration from that point on.
 *
 * Scalars never had this problem: `int r = some_mixed()` stays `int`.
 *
 * That was first patched by guarding the one shape it was found in -- an assigned `mixed*`. The
 * same hole then turned up for a bare `mixed`, which is not an array type and so walked past the
 * guard:
 *
 *     string *candidates = reduce(path, fn, ({}));   // a simul_efun returning `mixed`
 *     filter(candidates, (: ... :));                 // resolved on `mixed`, picking filter's
 *                                                    // `string|mapping` overload over `mixed*`
 *
 * The cause was the branch's entry condition rather than either shape reaching it. #190 needs
 * exactly one thing: a *generic* `object*` narrowing to the file-typed object array assigned into
 * it, so `w->method()` resolves against the real file. The condition was written as "any array
 * whose element is not already file-typed", which swept in `string*` and `int*` -- declarations
 * that already state what they hold, gain nothing from adopting an assigned type, and can only be
 * widened by it. Restricting the condition to a generic `object` element retires both guards'
 * reason for existing: every other array now falls through to the ordinary path, where the
 * declared type wins and assignment only narrows within it, which is why scalars were always
 * immune.
 */
function build(source: string, extraFiles: Record<string, string> = {}) {
    const { ls, abs } = createTestLanguageService({ "test.c": source, ...extraFiles }, {
        driverType: lpc.LanguageVariant.FluffOS,
        diagnostics: true,
    });
    return { ls, file: abs("test.c") };
}

function hoverAt(source: string, marker: string): string | undefined {
    const { ls, file } = build(source);
    return ls.getQuickInfoAtPosition(file, source.indexOf(marker))
        ?.displayParts?.map(p => p.text).join("").replace(/\s+/g, " ").trim();
}

function diagnosticsFor(source: string, extraFiles?: Record<string, string>): string[] {
    const { ls, file } = build(source, extraFiles);
    return ls.getSemanticDiagnostics(file).map(d => `${d.code}: ${lpc.flattenDiagnosticMessageText(d.messageText, " ")}`);
}

describe("an array variable assigned a wider array type", () => {
    it("keeps its declared type rather than widening to mixed*", () => {
        const source = `mixed *g() { return ({}); }\ntest() {\n  int *r = g();\n  r;\n}\n`;
        expect(hoverAt(source, "r;\n}")).toBe("(local var) int* r");
    });

    it("behaves the same as the scalar case, which was always correct", () => {
        const source = `mixed g() { return 1; }\ntest() {\n  int r = g();\n  r;\n}\n`;
        expect(hoverAt(source, "r;\n}")).toBe("(local var) int r");
    });

    it("still narrows to a more specific assigned array type", () => {
        // lpc-language-server#190 -- the reason this branch exists. Only widening changed.
        const source = `test() {\n  object *w;\n  w = get_weaps();\n  w;\n}\nobject *get_weaps() { return ({ }); }\n`;
        expect(hoverAt(source, "w;\n}")).toBe("(local var) object* w");
    });

    it("keeps its declared type when the assigned type is a bare mixed", () => {
        // `mixed*` was guarded first; `mixed` is not an array type and walked past that guard.
        const source = `mixed g() { return ({}); }\ntest() {\n  string *r = g();\n  r;\n}\n`;
        expect(hoverAt(source, "r;\n}")).toBe("(local var) string* r");
    });

    it("resolves a later call on the declared type, not on mixed", () => {
        // The reported symptom: `filter` has a `string|mapping` overload declared before its
        // `mixed*` one, so a source widened to `mixed` matched the wrong one and the result came
        // back `string|mapping`.
        const source = `mixed g() { return ({}); }\ntest() {\n  string *c = g();\n  string *r = filter(c, (: 1 :));\n}\n`;
        expect(diagnosticsFor(source)).toEqual([]);
    });

    it("keeps checking the declared element type after such an assignment", () => {
        // Widening did not just misreport the hover -- it retired every later check on the
        // variable. This append was silently accepted.
        const source = `mixed g() { return ({}); }\ntest() {\n  string *c = g();\n  c += ({ 123 });\n}\n`;
        expect(diagnosticsFor(source).join(" "))
            .toContain("2365: Operator '+=' cannot be applied to types 'string*' and 'int*'.");
    });

    it("narrows a generic object array to the file type assigned into it", () => {
        // #190's actual case, and the only one the branch is now entered for: the element type
        // has to reach the specific file for `->query_number()` to resolve. Asserted through
        // diagnostics rather than hover, whose text carries an absolute path.
        const source = `test() {\n  object *w;\n  w = get_weaps();\n  w->query_number();\n}\n`
            + `/**\n * @returns {"object.c"*}\n */\nobject *get_weaps() { return ({ }); }\n`;
        const files = { "object.c": `int query_number() { return 1; }\n` };
        expect(diagnosticsFor(source, files)).toEqual([]);
        expect(diagnosticsFor(source.replace("query_number()", "not_a_method()"), files).join(" "))
            .toContain("2339: Property 'not_a_method' does not exist");
    });
});

describe("sort_array and shuffle preserve their argument's element type", () => {
    // Their LPCDoc used `@template {ALL_ARRAY_TYPES} T` with `@param {T}`, which does not infer.
    // `@template T` with `@param {T*}` -- the form `filter` already used -- does. sort_array also
    // has three overloads, and the annotation sat only on the first, so the `(arr, direction)`
    // form callers reach most often was not generic at all.
    it("reports assigning a sorted string array to an int array", () => {
        for (const call of [`sort_array(items, 1)`, `sort_array(items, (: 1 :))`, `shuffle(items)`]) {
            const source = `test() {\n  string *items = ({ "abc" });\n  int *r = ${call};\n}\n`;
            expect(diagnosticsFor(source).join(" ")).toContain("2322: Type 'string*' is not assignable to type 'int*'.");
        }
    });

    it("accepts the result at the element type it went in as", () => {
        for (const call of [`sort_array(items, 1)`, `shuffle(items)`]) {
            expect(diagnosticsFor(`test() {\n  string *items = ({ "abc" });\n  string *r = ${call};\n}\n`)).toEqual([]);
        }
        expect(diagnosticsFor(`test() {\n  int *items = ({ 1 });\n  int *r = sort_array(items, 1);\n}\n`)).toEqual([]);
    });
});

describe("map_array takes its element type from the callback's return type", () => {
    // The `function f` overload had no @template at all, so it always returned `mixed*`. It now
    // uses the same @callback pattern `map()`'s array overload already used.
    it("reports a callback returning int assigned to a string array", () => {
        expect(diagnosticsFor(`test() {\n  string *items = ({ "abc" });\n  string *lens = map_array(items, (: strlen($1) :));\n}\n`).join(" "))
            .toContain("2322: Type 'int*' is not assignable to type 'string*'.");
    });

    it("accepts the array type the callback actually produces", () => {
        expect(diagnosticsFor(`test() {\n  string *items = ({ "abc" });\n  int *lens = map_array(items, (: strlen($1) :));\n}\n`)).toEqual([]);
        expect(diagnosticsFor(`test() {\n  string *items = ({ "abc" });\n  string *up = map_array(items, (: upper_case($1) :));\n}\n`)).toEqual([]);
    });

    it("contextually types the closure's $1 as the array's element type", () => {
        const source = `test() {\n  string *items = ({ "abc" });\n  int *lens = map_array(items, (: $1 :));\n}\n`;
        expect(hoverAt(source, "$1 :)")).toBe("string");
    });

    it("leaves the ob->fun() overload as mixed*", () => {
        // The function is named by a string, so its return type is not knowable.
        expect(diagnosticsFor(`test() {\n  string *items = ({ "abc" });\n  int *r = map_array(items, "cmp", this_object());\n}\n`)).toEqual([]);
    });

    it("matches map(), which was already annotated this way", () => {
        expect(diagnosticsFor(`test() {\n  string *items = ({ "abc" });\n  string *lens = map(items, (: strlen($1) :));\n}\n`).join(" "))
            .toContain("2322: Type 'int*' is not assignable to type 'string*'.");
    });
});

describe("filter_array keeps the input element type", () => {
    // Filtering selects rather than transforms, so unlike map_array the result element type is
    // the input's -- the callback's return value is only the keep-or-discard test. This mirrors
    // how `filter` in general.h was already annotated.
    it("reports a filtered string array assigned to an int array", () => {
        expect(diagnosticsFor(`test() {\n  string *items = ({ "abc" });\n  int *r = filter_array(items, (: strlen($1) > 2 :));\n}\n`).join(" "))
            .toContain("2322: Type 'string*' is not assignable to type 'int*'.");
    });

    it("accepts the result at the element type it went in as", () => {
        expect(diagnosticsFor(`test() {\n  string *items = ({ "abc" });\n  string *r = filter_array(items, (: strlen($1) > 2 :));\n}\n`)).toEqual([]);
        expect(diagnosticsFor(`test() {\n  int *n = ({ 1 });\n  int *r = filter_array(n, (: $1 > 0 :));\n}\n`)).toEqual([]);
    });

    it("contextually types the closure's $1 as the array's element type", () => {
        expect(hoverAt(`test() {\n  string *items = ({ "abc" });\n  string *r = filter_array(items, (: $1 :));\n}\n`, "$1 :)")).toBe("string");
    });

    it("leaves the ob->fun() overload as mixed*", () => {
        expect(diagnosticsFor(`test() {\n  string *items = ({ "abc" });\n  int *r = filter_array(items, "f", this_object());\n}\n`)).toEqual([]);
    });
});

describe("unique_array partitions into an array of arrays of the input element type", () => {
    // Its callback tag referenced `uniqueArrayCallback<T,Y>` while only `T` was declared. `Y`
    // is never used in the result -- unique_array groups by whatever the callback returns, and
    // that value's type does not reach the return type -- so the callback is now single-
    // parameter rather than declaring a type argument nothing consumes.
    it("returns the input element type nested one level deeper", () => {
        expect(diagnosticsFor(`test() {\n  string *s = ({ "a" });\n  string **g = unique_array(s, (: $1 :));\n}\n`)).toEqual([]);
    });

    it("reports a wrong element type", () => {
        expect(diagnosticsFor(`test() {\n  string *s = ({ "a" });\n  int **g = unique_array(s, (: $1 :));\n}\n`).join(" "))
            .toContain("2322:");
    });

    it("reports a result that is not nested", () => {
        expect(diagnosticsFor(`test() {\n  string *s = ({ "a" });\n  string *g = unique_array(s, (: $1 :));\n}\n`).join(" "))
            .toContain("2322:");
    });

    it("contextually types the closure's $1 as the array's element type", () => {
        expect(hoverAt(`test() {\n  string *s = ({ "a" });\n  string **g = unique_array(s, (: $1 :));\n}\n`, "$1 :)")).toBe("string");
    });

    it("types the ob->separator() form too", () => {
        expect(diagnosticsFor(`test() {\n  object *o = ({});\n  object **g = unique_array(o, "sep", 0);\n}\n`)).toEqual([]);
        expect(diagnosticsFor(`test() {\n  object *o = ({});\n  int **g = unique_array(o, "sep", 0);\n}\n`).join(" "))
            .toContain("2322:");
    });
});
