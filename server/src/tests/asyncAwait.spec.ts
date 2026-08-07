import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";

/**
 * FluffOS native coroutines (fluffos#1319): the `async` function modifier, the `await`
 * unary expression, the async-aware `acatch`, the declared `promise` type and the promise
 * efuns. All four keywords are FluffOS-only -- in LDMud they stay ordinary identifiers.
 */

function diagnosticsFor(source: string, driverType: lpc.LanguageVariant): lpc.Diagnostic[] {
    const root = process.cwd();
    const virtualFile = lpc.normalizeSlashes(path.join(root, "server/src/tests/cases/compiler/__asyncProbe.c"));
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
    return [...file.parseDiagnostics, ...program.getSemanticDiagnostics(file)];
}

function messages(source: string, driverType = lpc.LanguageVariant.FluffOS): string {
    return diagnosticsFor(source, driverType).map(d => lpc.flattenDiagnosticMessageText(d.messageText, "\n")).join("\n");
}

describe("FluffOS async/await (fluffos#1319)", () => {
    it("accepts an async function with await and acatch", () => {
        const source = `
promise fetch(string uid);
async int transfer(string from, int amount) {
    mixed acc = await fetch(from);
    mixed err = acatch(await fetch("dest"));
    if (err) return 0;
    return 1;
}
`;
        expect(messages(source)).toBe("");
    });

    it("types a call to an async function as promise, not the declared return type", () => {
        // The declared type is what `return` statements inside the body check against; the
        // caller always receives a promise.
        const source = `
async int work() { return 1; }
void test() {
    promise p = work();
    int bad = work();
}
`;
        const text = messages(source);
        expect(text).toContain("Type 'promise' is not assignable to type 'int'");
    });

    it("checks return statements against the declared type, not the promise", () => {
        const source = `async int work() { return "nope"; }`;
        expect(messages(source)).toContain("not assignable to type 'int'");
    });

    it("rejects await outside an async function body", () => {
        const source = `
promise fetch();
int plain() { return await fetch(); }
`;
        expect(messages(source)).toContain("'await' is only allowed directly inside an 'async' function body.");
    });

    it("rejects await inside a functional -- it runs in its own frame", () => {
        const source = `
promise fetch();
async int outer() { function f = (: await fetch() :); return 0; }
`;
        expect(messages(source)).toContain("'await' is only allowed directly inside an 'async' function body.");
    });

    it("rejects await under catch, which cannot be suspended", () => {
        const source = `
promise fetch();
async int outer() { mixed e = catch(await fetch()); return 0; }
`;
        expect(messages(source)).toContain("'await' is not allowed inside 'catch' or 'time_expression'. Use 'acatch'.");
    });

    it("allows await under acatch -- that is what acatch is for", () => {
        const source = `
promise fetch();
async int outer() { mixed e = acatch(await fetch()); return 0; }
`;
        expect(messages(source)).toBe("");
    });

    it("accepts the acatch block form", () => {
        const source = `
promise fetch();
async int outer() {
    mixed e = acatch { mixed v = await fetch(); write(v); };
    return 0;
}
`;
        expect(messages(source)).toBe("");
    });

    it("accepts promise as a global, parameter, return type and array element type", () => {
        const source = `
promise pending;
promise *queue;
promise fetch(promise seed);
void take(promise p, promise *ps) { mapping seen = ([ p : 1 ]); }
`;
        expect(messages(source)).toBe("");
    });

    it("rejects acatch outside an async function body", () => {
        expect(messages(`int plain() { return acatch(1); }`))
            .toContain("'acatch' is only allowed directly inside an 'async' function body.");
    });

    it("rejects the async modifier on a variable", () => {
        expect(messages(`async int counter;`))
            .toContain("The 'async' modifier can only be applied to function declarations.");
    });

    it("gives await unary-prefix precedence", () => {
        // `await a + b` is `(await a) + b`, so the addition sees a mixed operand rather
        // than awaiting the sum.
        const source = `
promise fetch();
async int outer() { int n = await fetch() + 1; return n; }
`;
        expect(messages(source)).toBe("");
    });

    it("resolves the promise efuns", () => {
        const source = `
async void test() {
    promise p = promise_create();
    promise_resolve(p);
    promise_resolve(p, 1);
    promise_reject(p, "boom");
    promise q = promise_then(p, (: 1 :));
    promise c = promise_catch(p, (: 1 :));
    int state = promise_status(p);
    mixed result = promise_result(p);
    mapping *pending = async_info();
    mixed value = await p;
}
`;
        expect(messages(source)).toBe("");
    });

    it("type-checks promise arguments to the promise efuns", () => {
        expect(messages(`void test() { promise_status(1); }`))
            .toContain("Argument of type 'int' is not assignable to parameter of type 'promise'");
    });

    it("keeps promise nominal against the other primitive types", () => {
        expect(messages(`void test(promise p) { string s = p; }`))
            .toContain("Type 'promise' is not assignable to type 'string'");
    });

    it("leaves async/await/acatch/promise as plain identifiers in LDMud", () => {
        // FluffOS-only keywords: an LDMud mudlib may still use these words as names.
        const source = `int test() { int async, await, acatch, promise; async = 1; return async; }`;
        expect(messages(source, lpc.LanguageVariant.LDMud)).toBe("");
    });
});
