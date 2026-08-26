import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";

/**
 * The `*p()` guard efuns narrow a union in the branch they guard, but only when
 * their stub carries a `@returns {arg is T}` type predicate. Several stubs were
 * missing one, so `if (mapp(m))` left `m` at its declared union and every use
 * inside the branch reported a spurious assignability error.
 *
 * Not every `*p()` is a type test: `clonep` and `referencep` (LDMud) ask about
 * an object's origin and how an argument was passed, and `classp` (FluffOS)
 * tests T_CLASS with no single type to narrow to. Those deliberately carry no
 * predicate.
 */

function messages(source: string, driverType: lpc.LanguageVariant): string {
    const root = process.cwd();
    const virtualFile = lpc.normalizeSlashes(path.join(root, "server/src/tests/cases/compiler/__predicateProbe.c"));
    const isVirtual = (fn: string) => !!fn && lpc.normalizeSlashes(fn) === virtualFile;

    const compilerOptions: lpc.CompilerOptions = { driverType, diagnostics: true };
    const host = lpc.createCompilerHost(compilerOptions);
    const origReadFile = host.readFile;
    const origFileExists = host.fileExists;
    host.readFile = (fn: string) => (isVirtual(fn) ? source : origReadFile.call(host, fn));
    host.fileExists = (fn: string) => (isVirtual(fn) ? true : origFileExists.call(host, fn));
    host.getDefaultLibFileName = () =>
        lpc.combinePaths(root, lpc.getDefaultLibFolder(compilerOptions), lpc.getDefaultLibFileName(compilerOptions));

    const program = lpc.createProgram({ host, rootNames: [virtualFile], options: compilerOptions, oldProgram: undefined });
    const file = program.getSourceFile(virtualFile)!;
    return [...file.parseDiagnostics, ...program.getSemanticDiagnostics(file)]
        .map(d => lpc.flattenDiagnosticMessageText(d.messageText, "\n")).join("\n");
}

/**
 * A union parameter is the only shape that detects this: `mixed` is assignable
 * to anything, so a `mixed` probe passes whether or not narrowing happened.
 */
function guards(guard: string, type: string, other: string, driverType: lpc.LanguageVariant): string {
    return messages(`void test(${type} | ${other} m) { if (${guard}(m)) { ${type} narrowed = m; } }`, driverType);
}

describe("*p() guard narrowing", () => {
    describe("FluffOS", () => {
        const fluffos = lpc.LanguageVariant.FluffOS;

        it.each([
            ["stringp", "string", "int"],
            ["objectp", "object", "int"],
            ["pointerp", "mixed *", "int"],
            ["arrayp", "mixed *", "int"],
            ["functionp", "function", "int"],
            ["mapp", "mapping", "int"],
            ["intp", "int", "string"],
            ["bufferp", "buffer", "int"],
            ["floatp", "float", "string"],
        ])("%s narrows to %s", (guard, type, other) => {
            expect(guards(guard, type, other, fluffos)).toBe("");
        });

        it("narrows in the else branch too", () => {
            expect(messages(`void test(mapping | int m) { if (mapp(m)) { mapping x = m; } else { int n = m; } }`, fluffos)).toBe("");
        });

        it("nullp and undefinedp are the same efun and narrow alike", () => {
            // core.spec:144 declares `int nullp undefinedp(mixed);` -- one efun, two names.
            expect(messages(`void test(string m) { if (nullp(m)) { int n = m; } }`, fluffos)).toBe("");
            expect(messages(`void test(string m) { if (undefinedp(m)) { int n = m; } }`, fluffos)).toBe("");
        });

        it("does not narrow on classp, which is not a single-type test", () => {
            // classp() tests T_CLASS. There is no one type to narrow to, so it
            // deliberately carries no predicate -- the error must survive.
            expect(messages(`void test(mapping | int m) { if (classp(m)) { mapping x = m; } }`, fluffos))
                .toContain("is not assignable to type 'mapping'");
        });

        it("still reports the error when the guard does not cover the use", () => {
            // The narrowing must be real, not a blanket suppression: an `intp` guard
            // says nothing about the string constituent.
            expect(messages(`void test(mapping | int m) { if (intp(m)) { mapping x = m; } }`, fluffos))
                .toContain("is not assignable to type 'mapping'");
        });
    });

    describe("LDMud", () => {
        const ldmud = lpc.LanguageVariant.LDMud;

        it.each([
            ["stringp", "string", "int"],
            ["objectp", "object", "int"],
            ["pointerp", "mixed *", "int"],
            ["mappingp", "mapping", "int"],
            ["intp", "int", "string"],
            ["floatp", "float", "string"],
            // `symbolp` carries its predicate, but this row cannot currently fail.
            // `symbol` has no case in getTypeFromTypeNodeWorker(), so it falls to
            // the default branch ("Implement me - getTypeFromTypeNodeWorker
            // SymbolKeyword") and resolves to errorType, which is assignable in
            // both directions -- there is no error for narrowing to remove. Kept
            // so the row starts working once `symbol` is given a real type.
            ["symbolp", "symbol", "int"],
            ["lwobjectp", "lwobject", "int"],
            ["closurep", "closure", "int"],
            ["bytesp", "bytes", "int"],
        ])("%s narrows to %s", (guard, type, other) => {
            expect(guards(guard, type, other, ldmud)).toBe("");
        });

        it.each([
            // Neither asks about type: clonep() distinguishes a clone from its
            // blueprint, referencep() reports how an argument was passed. Both
            // deliberately carry no predicate, so the error must survive.
            ["clonep"],
            ["referencep"],
        ])("%s does not narrow", guard => {
            expect(messages(`void test(mapping | int m) { if (${guard}(m)) { mapping x = m; } }`, ldmud))
                .toContain("is not assignable to type 'mapping'");
        });
    });
});
