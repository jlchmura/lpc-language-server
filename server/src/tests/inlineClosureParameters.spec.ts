import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService } from "./harness.js";

/**
 * An LPC inline closure has no parameter list -- the driver binds `$1`..`$9` positionally to
 * whatever the caller passed. That is unlike the TypeScript arrow functions this checker is
 * built on, where parameters are declarations the binder already knows about.
 *
 * The closure's `Signature` therefore used to have zero parameters, and `$N` was typed by a
 * pair of bespoke lookups that reached past the signature for a *contextual* one. This gives
 * the closure real parameter symbols synthesized from the highest `$N` its body references, so
 * arity is honest and `$N` reads its type off the signature like a declared parameter would.
 */
function build(source: string) {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, {
        driverType: lpc.LanguageVariant.FluffOS,
        diagnostics: true,
    });
    const file = abs("test.c");
    const program = ls.getProgram()!;
    const sf = program.getSourceFile(file)!;
    program.getSemanticDiagnostics(sf);

    const closures: lpc.InlineClosureExpression[] = [];
    const walk = (n: lpc.Node) => {
        if (lpc.isInlineClosureExpression(n)) closures.push(n);
        lpc.forEachChild(n, walk);
    };
    walk(sf);

    return { ls, file, sf, program, closures, checker: program.getTypeChecker() };
}

/** Parameter names of the Nth inline closure in source order. */
function parametersOf(source: string, closureIndex = 0): string[] {
    const { closures, checker } = build(source);
    const signature = (checker as unknown as {
        getSignatureFromDeclaration(d: lpc.SignatureDeclaration): lpc.Signature;
    }).getSignatureFromDeclaration(closures[closureIndex] as unknown as lpc.SignatureDeclaration);
    return signature.parameters.map(p => p.name as string);
}

function typeAt(source: string, marker: string): string | undefined {
    const { ls, file } = build(source);
    return ls.getQuickInfoAtPosition(file, source.indexOf(marker))?.displayParts?.map(p => p.text).join("");
}

describe("inline closure implicit parameters", () => {
    it("derives arity from the highest $N the body references", () => {
        expect(parametersOf(`void f() { function c = (: $1 + $2 :); }`)).toEqual(["$1", "$2"]);
    });

    it("gives a closure that references none an arity of zero", () => {
        expect(parametersOf(`void f() { function c = (: 42 :); }`)).toEqual([]);
    });

    it("fills in skipped positions so $2 alone still yields two parameters", () => {
        // `$2` with no `$1` is legal -- the driver binds by position regardless.
        expect(parametersOf(`void f() { function c = (: $2 :); }`)).toEqual(["$1", "$2"]);
    });

    it("counts $N through a nested block body", () => {
        expect(parametersOf(`void f() { function c = (: { return $3; } :); }`)).toEqual(["$1", "$2", "$3"]);
    });

    it("stops at a nested closure, which rebinds $1..$9", () => {
        // The outer closure references no `$N` of its own; the inner one owns the `$1`.
        const source = `void f() { function c = (: filter(({1,2}), (: $1 > 0 :)) :); }`;
        expect(parametersOf(source, 0)).toEqual([]);
        expect(parametersOf(source, 1)).toEqual(["$1"]);
    });
});

describe("inline closure implicit parameter types", () => {
    it("takes the type from the contextual signature when there is one", () => {
        // `filter`'s callback parameter is the array's element type, so `$1` is an int here
        // rather than the mixed the driver would otherwise hand over.
        expect(typeAt(`void f() { int *r = filter(({1,2}), (: $1 > 0 :)); }`, "$1 > 0")).toBe("int");
    });

    it("falls back to mixed with no contextual signature", () => {
        expect(typeAt(`void f() { function c = (: $1 + $2 :); }`, "$1 + $2")).toBe("mixed");
    });

    it("types a $N passed to a variadic efun parameter as mixed", () => {
        // call_out_walltime's third parameter is `mixed arg ...`, so nothing narrower is known.
        const source = `void f() { function c = (: call_out_walltime("probe", 5.0, $1) :); }`;
        expect(typeAt(source, "$1)")).toBe("mixed");
    });

    it("does not leak an outer contextual type into a nested closure", () => {
        const source = `void f() { function c = (: filter(({1,2}), (: $1 > 0 :)) :); }`;
        expect(typeAt(source, "$1 > 0")).toBe("int");
    });
});

describe("inferring an inline closure parameter type from its usage", () => {
    it("takes the type from the parameter position it is passed to", () => {
        // strlen(string str) -- so $1 is a string, not the mixed the driver would default to.
        expect(typeAt(`void f() { function c = (: strlen($1) :); }`, "$1)")).toBe("string");
    });

    it("reads the right position for each parameter", () => {
        expect(typeAt(`void f() { function c = (: explode($1, $2) :); }`, "$2)")).toBe("string");
    });

    it("skips a use that only tells us mixed, so a specific use elsewhere still wins", () => {
        // sizeof(mixed var) contributes nothing; strlen(string str) settles it.
        expect(typeAt(`void f() { function c = (: strlen($1) + sizeof($1) :); }`, "$1) +")).toBe("string");
    });

    it("falls back to mixed when two uses disagree", () => {
        // strlen wants string, to_int wants float|string|buffer. Picking either would produce a
        // narrow type the driver never promised, and spurious errors at the call site.
        expect(typeAt(`void f() { function c = (: strlen($1) + to_int($1) :); }`, "$1) +")).toBe("mixed");
    });

    it("keeps mixed for a variadic parameter position", () => {
        // call_out_walltime's third parameter is `mixed arg ...` -- nothing narrower is known.
        expect(typeAt(`void f() { function c = (: call_out_walltime("p", 5.0, $1) :); }`, "$1)")).toBe("mixed");
    });

    it("infers nothing from callee position", () => {
        expect(typeAt(`void f() { function c = (: $1() :); }`, "$1()")).toBe("mixed");
    });

    it("lets a contextual signature outrank a usage-derived type", () => {
        // `map` says the parameter is an int; the `strlen` use inside would say string. The
        // caller's contract wins -- it is the one the driver actually honours.
        const source = `void f() { mixed *r = map(({1,2}), (: strlen($1) :)); }`;
        expect(typeAt(source, "$1)")).toBe("int");
    });

    it("terminates on a closure that passes $N to itself", () => {
        // Resolving the callee can lead back to the parameter being resolved; the re-entrant
        // request reports mixed instead of recurring.
        expect(typeAt(`void f() { function c = (: c($1) :); }`, "$1)")).toBe("mixed");
    });
});
