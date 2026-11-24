import * as lpc from "./_namespaces/lpc.js";
import { message, createTestProgram } from "./harness.js";

/**
 * LPCDoc is canonical: `@param {T}` overrides the syntactic parameter type. `nullp` is
 * declared `int nullp(mixed arg)`, but carried a `@template T` with `@param {T} arg`, so
 * `(: !nullp($1) && clamped($1, 0, 255) :)` typed `$1` as the bare, unconstrained type
 * parameter `T` -- and every LATER use of `$1` in that closure was then checked against it.
 * It surfaced as "No overload matches this call" listing two identical signatures, plus a
 * stray "This type parameter might need an `extends float` constraint" against the efun
 * header.
 *
 * The doubled signature is a red herring: it is a prototype and its definition, and merging
 * only exposes the leak, because two identical signatures make the closure's other use get
 * skipped, leaving `T` uncontested.
 *
 * Two layers, both needed. `nullp`'s template was vestigial -- T appeared only in the param,
 * never in `@returns {arg is 0}` -- so it is gone. The checker guard is still required
 * because `copy` is the same shape and its template IS load-bearing (`@returns {T}`), so it
 * cannot be deleted.
 */
function check(source: string): string[] {
    const { program, fileName: virtualFile } = createTestProgram({ "server/src/tests/cases/compiler/__tpleak.c": source }, { driverType: lpc.LanguageVariant.FluffOS });
    return program
        .getSemanticDiagnostics(program.getSourceFile(virtualFile)!).map(message);
}

describe("a type variable does not leak into an inline closure's $N", () => {
    it("accepts a later use of $1 after nullp($1)", () => {
        expect(check(
            `int clamped(float val, float min, float max);\n` +
            `int every(mixed *arr, mixed criteria);\n` +
            `int clamped(float val, float min, float max) { return 1; }\n` +
            `void f() {\n` +
            `  int *rgb = ({ 1, 2, 3 });\n` +
            `  every(rgb, (: !nullp($1) && clamped($1, 0, 255) :));\n` +
            `}\n`,
        )).toEqual([]);
    });

    it("accepts a later use of $1 after copy($1), whose template is load-bearing", () => {
        expect(check(
            // `clamped` needs both a prototype and a definition: two signatures make the
            // OTHER use of `$1` get skipped, which is what leaves the type variable
            // uncontested. With a single signature the two uses merely disagree and `$1`
            // falls back to `mixed` on its own, exercising nothing.
            `int clamped(float val, float min, float max);\n` +
            `int every(mixed *arr, mixed criteria);\n` +
            `int clamped(float val, float min, float max) { return 1; }\n` +
            `void f() {\n` +
            `  int *rgb = ({ 1, 2, 3 });\n` +
            `  every(rgb, (: copy($1) && clamped($1, 0, 255) :));\n` +
            `}\n`,
        )).toEqual([]);
    });
});

describe("the efun headers carry no vestigial type parameter", () => {
    /**
     * A single-signature efun whose parameter type is a bare type variable is the shape that
     * leaks. `copy` is the only legitimate one -- its template is load-bearing -- so it is
     * the whole expected set. A new entry here means a header gained a `@template` that is
     * inferred and discarded, the way `nullp`'s was.
     */
    it("has copy as the only single-signature efun with a type-variable parameter", () => {
        const { program, fileName: virtualFile } = createTestProgram({ "server/src/tests/cases/compiler/__tpscan.c": "void a() { }\n" }, { driverType: lpc.LanguageVariant.FluffOS });
        const checker = program.getTypeChecker();
        const leaking = new Set<string>();

        for (const file of program.getSourceFiles()) {
            if (!(file as any).isDefaultLib) continue;
            (file as any).locals?.forEach((symbol: lpc.Symbol, name: string) => {
                if (!(symbol.flags & lpc.SymbolFlags.Function)) return;
                const signatures = checker.getSignaturesOfType(checker.getTypeOfSymbol(symbol), lpc.SignatureKind.Call);
                if (signatures.length !== 1) return;
                for (const parameter of signatures[0].parameters ?? []) {
                    const type = checker.getTypeOfSymbolAtLocation(parameter, file);
                    if (type && type.flags & lpc.TypeFlags.TypeParameter) leaking.add(name);
                }
            });
        }

        expect([...leaking].sort()).toEqual(["copy"]);
    });
});
