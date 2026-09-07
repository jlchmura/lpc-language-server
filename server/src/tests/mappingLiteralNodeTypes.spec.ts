import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";

/**
 * Every node inside a mapping literal used to report `mixed` -- values, keys, even a
 * string-literal key. Cause: `isExpressionNode()` did not list the mapping kinds, and
 * `isInExpressionContext()`'s default arm asks `isExpressionNode(parent)`. So a key or
 * value whose parent is a MappingEntryExpression was not an expression node, and
 * `getTypeOfNode()` skipped its `getRegularTypeOfExpression()` branch.
 *
 * Checking was never affected -- errors inside a mapping literal are reported exactly as
 * they are outside one -- which is why this only ever surfaced in hover. Both halves are
 * pinned below.
 */
function typeAt(source: string, name: string, parentKind: lpc.SyntaxKind): string {
    const root = process.cwd();
    const vf = lpc.normalizeSlashes(path.join(root, "server/src/tests/cases/compiler/__mapnode.c"));
    const isV = (f: string) => !!f && lpc.normalizeSlashes(f) === vf;
    const opts: lpc.CompilerOptions = { driverType: lpc.LanguageVariant.FluffOS, diagnostics: true };
    const host = lpc.createCompilerHost(opts);
    const orf = host.readFile, ofe = host.fileExists;
    host.readFile = (f: string) => (isV(f) ? source : orf.call(host, f));
    host.fileExists = (f: string) => (isV(f) ? true : ofe.call(host, f));
    host.getDefaultLibFileName = () =>
        lpc.combinePaths(root, lpc.getDefaultLibFolder(opts), lpc.getDefaultLibFileName(opts));

    const program = lpc.createProgram({ host, rootNames: [vf], options: opts, oldProgram: undefined });
    const sf = program.getSourceFile(vf)!;
    const checker = program.getTypeChecker() as any;
    let found = "";
    (function walk(n: lpc.Node) {
        if (n.kind === lpc.SyntaxKind.Identifier && (n as lpc.Identifier).text === name && n.parent.kind === parentKind) {
            found = checker.writeType(checker.getTypeAtLocation(n), undefined, undefined);
        }
        lpc.forEachChild(n, walk);
    })(sf);
    return found;
}

function diagnostics(source: string): string[] {
    const root = process.cwd();
    const vf = lpc.normalizeSlashes(path.join(root, "server/src/tests/cases/compiler/__mapnode.c"));
    const isV = (f: string) => !!f && lpc.normalizeSlashes(f) === vf;
    const opts: lpc.CompilerOptions = { driverType: lpc.LanguageVariant.FluffOS, diagnostics: true };
    const host = lpc.createCompilerHost(opts);
    const orf = host.readFile, ofe = host.fileExists;
    host.readFile = (f: string) => (isV(f) ? source : orf.call(host, f));
    host.fileExists = (f: string) => (isV(f) ? true : ofe.call(host, f));
    host.getDefaultLibFileName = () =>
        lpc.combinePaths(root, lpc.getDefaultLibFolder(opts), lpc.getDefaultLibFileName(opts));
    const program = lpc.createProgram({ host, rootNames: [vf], options: opts, oldProgram: undefined });
    const sf = program.getSourceFile(vf)!;
    return program.getSemanticDiagnostics(sf).map(d => lpc.flattenDiagnosticMessageText(d.messageText, " "));
}

describe("nodes inside a mapping literal report their own type", () => {
    it("a value keeps its declared type", () => {
        expect(typeAt(`void f(string p) { mapping m = ([ "k" : p ]); }`, "p", lpc.SyntaxKind.MappingEntryExpression))
            .toBe("string");
    });

    it("a key keeps its declared type", () => {
        expect(typeAt(`void f(string p) { mapping m = ([ p : 1 ]); }`, "p", lpc.SyntaxKind.MappingEntryExpression))
            .toBe("string");
    });

    it("a narrowed value keeps the narrowed type", () => {
        expect(typeAt(`void f(mixed p) { if(stringp(p)) { mapping m = ([ "k" : p ]); } }`, "p", lpc.SyntaxKind.MappingEntryExpression))
            .toBe("string");
    });

    it("still works one level deeper, inside an array in a mapping", () => {
        expect(typeAt(`void f(string p) { mapping m = ([ "k" : ({ p }) ]); }`, "p", lpc.SyntaxKind.ArrayLiteralExpression))
            .toBe("string");
    });
});

describe("checking inside a mapping literal is unchanged", () => {
    it("reports a bad argument inside a mapping exactly as outside one", () => {
        const inside = diagnostics(`int takes_int(int n);\nvoid f() { mapping m = ([ "k" : takes_int("nope") ]); }`);
        const outside = diagnostics(`int takes_int(int n);\nvoid f() { takes_int("nope"); }`);
        expect(inside).toEqual(outside);
        expect(inside.some(m => m.includes("not assignable to parameter of type 'int'"))).toBe(true);
    });

    it("reports an unknown name inside a mapping", () => {
        expect(diagnostics(`void f() { mapping m = ([ "k" : no_such_fn() ]); }`)
            .some(m => m.includes("Cannot find name 'no_such_fn'"))).toBe(true);
    });
});
