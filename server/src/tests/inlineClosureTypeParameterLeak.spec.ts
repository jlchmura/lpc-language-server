import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";

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
    const root = process.cwd();
    const virtualFile = lpc.normalizeSlashes(path.join(root, "server/src/tests/cases/compiler/__tpleak.c"));
    const isVirtual = (fn: string) => !!fn && lpc.normalizeSlashes(fn) === virtualFile;
    const options: lpc.CompilerOptions = { driverType: lpc.LanguageVariant.FluffOS, diagnostics: true };
    const host = lpc.createCompilerHost(options);
    const origReadFile = host.readFile;
    const origFileExists = host.fileExists;
    host.readFile = (fn: string) => (isVirtual(fn) ? source : origReadFile.call(host, fn));
    host.fileExists = (fn: string) => (isVirtual(fn) ? true : origFileExists.call(host, fn));
    host.getDefaultLibFileName = () =>
        lpc.combinePaths(root, lpc.getDefaultLibFolder(options), lpc.getDefaultLibFileName(options));

    const program = lpc.createProgram({ host, rootNames: [virtualFile], options });
    return program
        .getSemanticDiagnostics(program.getSourceFile(virtualFile)!)
        .map(d => lpc.flattenDiagnosticMessageText(d.messageText, " "));
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
        const root = process.cwd();
        const virtualFile = lpc.normalizeSlashes(path.join(root, "server/src/tests/cases/compiler/__tpscan.c"));
        const isVirtual = (fn: string) => !!fn && lpc.normalizeSlashes(fn) === virtualFile;
        const options: lpc.CompilerOptions = { driverType: lpc.LanguageVariant.FluffOS, diagnostics: true };
        const host = lpc.createCompilerHost(options);
        const origReadFile = host.readFile;
        const origFileExists = host.fileExists;
        host.readFile = (fn: string) => (isVirtual(fn) ? "void a() { }\n" : origReadFile.call(host, fn));
        host.fileExists = (fn: string) => (isVirtual(fn) ? true : origFileExists.call(host, fn));
        host.getDefaultLibFileName = () =>
            lpc.combinePaths(root, lpc.getDefaultLibFolder(options), lpc.getDefaultLibFileName(options));

        const program = lpc.createProgram({ host, rootNames: [virtualFile], options });
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
