import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService } from "./harness.js";

/**
 * Calling a closure-valued variable by bare name -- `f(x)` -- used to be entirely unchecked.
 * `function` resolves to the opaque `__LS__Closure` type, which carries no call signatures, so
 * the call fell through to `resolveUntypedCall` and any argument list was accepted.
 *
 * A `function` variable now narrows on assignment to the type of the closure assigned to it,
 * the same way `mixed` and `object` already act like `auto` here. The driver has no closure
 * subtyping -- every closure is just `function` -- so the declared type tells a reference
 * nothing, while the assigned closure tells it everything.
 *
 * Argument count is checked in one direction only. Too few is reported: the driver reads an
 * unsupplied `$N` as 0 rather than faulting, but a closure reading `$1` from a call that passes
 * nothing is a mistake, and a declared parameter list is already treated that way. Too many is
 * not: the driver ignores what the body never reads, and a closure's arity is inferred from its
 * `$N` usage rather than declared, so the maximum is our deduction rather than the author's
 * stated contract.
 */
function diagnosticsFor(source: string): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, {
        driverType: lpc.LanguageVariant.FluffOS,
        diagnostics: true,
    });
    return ls.getSemanticDiagnostics(abs("test.c"))
        .map(d => `${d.code}: ${lpc.flattenDiagnosticMessageText(d.messageText, " ")}`);
}

function hoverAt(source: string, marker: string): string | undefined {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, {
        driverType: lpc.LanguageVariant.FluffOS,
        diagnostics: true,
    });
    return ls.getQuickInfoAtPosition(abs("test.c"), source.indexOf(marker))
        ?.displayParts?.map(p => p.text).join("");
}

describe("argument count for a call to a closure-valued variable", () => {
    it("accepts a call that matches the closure's arity", () => {
        expect(diagnosticsFor(`void p(string s) { function f = (: strlen($1) :); f(s); }`)).toEqual([]);
    });

    it("reports too few arguments", () => {
        expect(diagnosticsFor(`void p(string s) { function f = (: strlen($1) :); f(); }`))
            .toEqual(["2554: Expected 1 arguments, but got 0."]);
    });

    it("accepts more arguments than the body reads", () => {
        // The driver ignores what the body never reads. A closure's arity is inferred from its
        // highest `$N`, not declared, so holding a call to that maximum would reject the
        // ordinary pattern of a dispatcher invoking stored callbacks with a fixed argument
        // count while each one reads only what it needs.
        expect(diagnosticsFor(`void p(string s) { function f = (: strlen($1) :); f(s, 1, 2); }`)).toEqual([]);
        expect(diagnosticsFor(`void p(string s) { function f = (: 42 :); f(s, 1); }`)).toEqual([]);
    });

    it("does not type-check the arguments the body cannot read", () => {
        expect(diagnosticsFor(`void p(string s) { function f = (: strlen($1) :); f(s, ({1,2})); }`)).toEqual([]);
    });

    it("still type-checks the arguments the body does read", () => {
        expect(diagnosticsFor(`void p(string *x) { function f = (: strlen($1) :); f(x, 1); }`))
            .toEqual(["2345: Argument of type 'string*' is not assignable to parameter of type 'string'."]);
    });

    it("leaves declared functions and efuns strict about extra arguments", () => {
        // The leniency is specific to an inferred arity, not a general relaxation.
        expect(diagnosticsFor(`int g(string a) { return 1; } void p() { g("a", 1); }`))
            .toEqual(["2554: Expected 1 arguments, but got 2."]);
        expect(diagnosticsFor(`void p() { strlen("a", 1); }`))
            .toEqual(["2554: Expected 1 arguments, but got 2."]);
    });

    it("accepts an empty call to a closure that reads no $N", () => {
        expect(diagnosticsFor(`void p() { function f = (: 42 :); f(); }`)).toEqual([]);
    });

    it("follows a reassignment to the new closure's arity", () => {
        // The declared type stays `function`; each reference narrows to whatever was last
        // assigned, so a two-parameter closure does not have to satisfy the first one's shape.
        const source = `void p(string s) { function f = (: strlen($1) :); f = (: explode($1, $2) :); f(s, s); }`;
        expect(diagnosticsFor(source)).toEqual([]);
    });

    it("reports arity against the reassigned closure, not the original", () => {
        const source = `void p(string s) { function f = (: strlen($1) :); f = (: explode($1, $2) :); f(s); }`;
        expect(diagnosticsFor(source)).toEqual(["2554: Expected 2 arguments, but got 1."]);
    });

    it("treats a mixed parameter as optional, exactly as a declared one is", () => {
        // `mixed` accepts void, so a trailing mixed parameter does not make an argument
        // required. This is not a closure rule -- `int g(mixed a, mixed b)` called as `g(1)`
        // is accepted the same way -- so closures are not held to a stricter standard.
        expect(diagnosticsFor(`void p() { function f = (: $1 + $2 :); f(1); }`)).toEqual([]);
        expect(diagnosticsFor(`int g(mixed a, mixed b) { return 1; } void p() { g(1); }`)).toEqual([]);
    });
});

describe("argument types for a call to a closure-valued variable", () => {
    it("checks the argument against the inferred parameter type", () => {
        expect(diagnosticsFor(`void p(string *x) { function f = (: strlen($1) :); f(x); }`))
            .toEqual(["2345: Argument of type 'string*' is not assignable to parameter of type 'string'."]);
    });

    it("accepts anything where the parameter stayed mixed", () => {
        const source = `void p(string *x) { function f = (: call_out_walltime("p", 5.0, $1) :); f(x); }`;
        expect(diagnosticsFor(source)).toEqual([]);
    });
});

describe("a narrowed closure variable is still a function", () => {
    it("can be passed to a parameter declared as function", () => {
        // Narrowing must not cost assignability outward -- a closure type is still a `function`.
        expect(diagnosticsFor(`void g(function cb) {} void p() { function f = (: strlen($1) :); g(f); }`)).toEqual([]);
    });

    it("renders its signature rather than the bare keyword", () => {
        // A closure-valued variable reads as the function it holds, in the same shape an efun
        // gets (`function mixed evaluate(mixed f...)`): kind, return type, name, parameters.
        const hover = hoverAt(`void p(string s) { function f = (: strlen($1) :); f(s); }`, "f(s)");
        expect(hover).toBe("(local var) int f(string $1)");
    });

    it("names the type LPC-style where the type itself is written out", () => {
        // Error text spells the type rather than a declaration, and LPC has no arrow syntax --
        // so it reads return-type-first with `function` standing in for the name.
        const diagnostics = diagnosticsFor(`void g(int n) {} void p() { function f = (: strlen($1) :); g(f); }`);
        expect(diagnostics.join(" ")).toContain("int function(string $1)");
    });

    it("does not leak the binder's internal name for an anonymous type", () => {
        // The closure's symbol is `__function` -- TypeScript's InternalSymbolName for an
        // unnamed function expression. Rendering an anonymous type as a *named object* type
        // used to print that marker as though it were an object path.
        const hover = hoverAt(`void p(string s) { function f = (: strlen($1) :); f(s); }`, "f(s)");
        expect(hover).not.toContain("__function");
        expect(hover).not.toContain("__LS__");
    });
});
