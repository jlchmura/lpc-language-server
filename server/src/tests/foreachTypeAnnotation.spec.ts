import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService } from "./harness.js";

/**
 * Two fixes that have to land together: annotating a foreach loop variable did nothing, and
 * making it work immediately reached a crash that was already there.
 *
 * 1. `getTypeForVariableLikeDeclaration` derived a foreach variable's type from the iterated
 *    expression and returned before ever consulting the declaration's own annotation, so
 *    `foreach(/** @type {"/a"} * / object ob in stuff())` left `ob` a bare `object` and every
 *    `ob->method()` failed to resolve. The same annotation on a plain declaration worked, which
 *    is what made it look like an annotation problem rather than a foreach one.
 *
 * 2. A synthetic union property with MORE THAN TWO constituents records its constituents
 *    instead of combining them, and the consumer for that (`getTypeOfSymbolWithDeferredType`)
 *    was never ported -- `getTypeOfSymbol` hit a `Debug.fail` instead. So a property access on a
 *    union of three or more object types crashed the whole check. Two constituents never did:
 *    that path computes eagerly. Reachable today through a plain declaration, which is why it
 *    is fixed on its own terms; fixing (1) is what made a real mudlib file reach it.
 */
function diagnosticsFor(source: string, extraFiles: Record<string, string> = {}): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source, ...extraFiles }, {
        driverType: lpc.LanguageVariant.FluffOS,
        diagnostics: true,
    });
    return ls.getSemanticDiagnostics(abs("test.c"))
        .map(d => `${d.code}: ${lpc.flattenDiagnosticMessageText(d.messageText, " ")}`);
}

const files = {
    "a.c": `int is_a() { return 1; }\nstring shared() { return "a"; }\n`,
    "b.c": `int is_b() { return 1; }\nstring shared() { return "b"; }\n`,
    "c.c": `int is_c() { return 1; }\nstring shared() { return "c"; }\n`,
};

/** `stmt` runs in a function body; `stuff()` is an untyped `object*`. */
function check(stmt: string): string[] {
    return diagnosticsFor(`object *stuff();\ntest() {\n  ${stmt}\n}\n`, files);
}

describe("a @type annotation on a foreach loop variable", () => {
    it("is applied to the loop variable", () => {
        expect(check(`foreach(/** @type {"a.c"} */ object ob in stuff())\n    ob->is_a();`)).toEqual([]);
    });

    it("still type-checks against the annotated type", () => {
        // Applying the annotation must not mean trusting it blindly.
        expect(check(`foreach(/** @type {"a.c"} */ object ob in stuff())\n    ob->nope();`).join(" "))
            .toContain("2339: Property 'nope' does not exist on type 'object");
    });

    it("leaves an unannotated loop variable narrowing from the array", () => {
        // The declarator's own `object` keyword must still lose to the element type -- that is
        // what narrows a loop variable at all, and the fix must not cost it.
        const source = `object *stuff();\ntest() {\n`
            + `  /** @type {"a.c"*} */ object *arr = stuff();\n`
            + `  foreach(object ob in arr)\n    ob->is_a();\n}\n`;
        expect(diagnosticsFor(source, files)).toEqual([]);

        expect(diagnosticsFor(source.replace("ob->is_a()", "ob->nope()"), files).join(" "))
            .toContain("2339: Property 'nope' does not exist on type 'object");
    });

    it("carries a union annotation through, still checking every constituent", () => {
        expect(check(`foreach(/** @type {"a.c" | "b.c"} */ object ob in stuff())\n    ob->is_a();`).join(" "))
            .toContain("2339: Property 'is_a' does not exist on type");
    });
});

describe("a property access on a union of more than two object types", () => {
    it("resolves instead of crashing the check", () => {
        // Three constituents defer; the deferral had no consumer and hit a Debug.fail.
        expect(check(`/** @type {"a.c" | "b.c" | "c.c"} */ object ob = stuff()[0];\n  ob->shared();`))
            .toEqual([]);
    });

    it("resolves the same way through a foreach annotation", () => {
        expect(check(`foreach(/** @type {"a.c" | "b.c" | "c.c"} */ object ob in stuff())\n    ob->shared();`))
            .toEqual([]);
    });

    it("still reports a property missing from one constituent", () => {
        expect(check(`/** @type {"a.c" | "b.c" | "c.c"} */ object ob = stuff()[0];\n  ob->is_a();`).join(" "))
            .toContain("2339: Property 'is_a' does not exist on type");
    });

    it("behaves the same at two constituents, which always computed eagerly", () => {
        expect(check(`/** @type {"a.c" | "b.c"} */ object ob = stuff()[0];\n  ob->shared();`)).toEqual([]);
    });
});
