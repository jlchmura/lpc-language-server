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

    it("types a call to an async function as a promise of its declared return type", () => {
        // The declared type is what `return` statements inside the body check against; the
        // caller always receives a promise carrying that type.
        const source = `
async int work() { return 1; }
void test() {
    promise<int> p = work();
    int bad = work();
}
`;
        expect(messages(source)).toContain("Type 'promise<int>' is not assignable to type 'int'");
    });

    it("rejects a call to an async function assigned to the wrong payload type", () => {
        const source = `
async int work() { return 1; }
void test() { promise<string> p = work(); }
`;
        expect(messages(source)).toContain("Type 'promise<int>' is not assignable to type 'promise<string>'");
    });

    it("unwraps the payload type through await", () => {
        const source = `
async int work() { return 1; }
async void test() { int n = await work(); }
`;
        expect(messages(source)).toBe("");
    });

    it("reports the payload type when an await result is misused", () => {
        const source = `
async int work() { return 1; }
async void test() { string s = await work(); }
`;
        expect(messages(source)).toContain("Type 'int' is not assignable to type 'string'");
    });

    it("passes a non-promise through await unchanged", () => {
        // The type survives; only the (warned-about) no-op await is remarked on.
        expect(messages(`async void test() { int n = await 42; }`))
            .toBe("'await' has no effect here: 'int' is not a promise, so the value passes through unchanged.");
    });

    it("treats bare promise as promise<mixed>, accepting any payload", () => {
        const source = `
async int work() { return 1; }
void test() { promise p = work(); }
`;
        expect(messages(source)).toBe("");
    });

    it("distinguishes an array of promises from a promise of an array", () => {
        // `*` binds where it is written: awaiting a promise of an array unwraps it, while an
        // array of promises is not itself a promise and passes straight through.
        expect(messages(`async void test(promise<int *> pa) { int *unwrapped = await pa; }`)).toBe("");

        const arrayOfPromises = `async void test(promise<int> *ps) { promise<int> *still = await ps; }`;
        expect(messages(arrayOfPromises)).toContain("'promise<int>*' is not a promise");
    });

    it("warns that await does nothing on a value that can never be a promise", () => {
        // Legal -- the driver passes non-promises through -- but almost always a mistake.
        // The classic call_out returns an int handle, so this suspends nothing.
        expect(messages(`async void test() { await call_out("fn", 10); }`))
            .toContain("'await' has no effect here: 'int' is not a promise, so the value passes through unchanged.");
    });

    it("does not warn when await is given something that may be a promise", () => {
        // The promise forms are fine, and `mixed` may hold a promise at runtime.
        const source = `
async int work();
async void test(mixed anything, promise<int> p, promise<int> | int either) {
    await call_out(10);
    await async_read("/log/access");
    await work();
    await anything;
    await p;
    await either;
}
`;
        expect(messages(source)).toBe("");
    });

    it("warns when the callback form of an async efun is awaited", () => {
        // Passing a callback keeps the classic form, which returns nothing to await.
        expect(messages(`async void test() { await async_read("/x", (: 1 :)); }`))
            .toContain("'await' has no effect here: 'void' is not a promise");
    });

    it("flattens rather than nests when an async function declares a promise return", () => {
        // The runtime adopts a promise resolved with a promise, so the call yields exactly one.
        const source = `
async promise<int> work();
void test() { promise<int> p = work(); }
`;
        expect(messages(source)).toBe("");
    });

    it("rejects a promise payload that is itself a promise", () => {
        expect(messages(`void test(promise<promise<int>> p) {}`))
            .toContain("A promise payload type may not itself be a promise.");
    });

    it("rejects a promise of void", () => {
        expect(messages(`void test(promise<void> p) {}`))
            .toContain("Illegal to declare a promise of type void.");
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
promise<int> *queue;
promise<string> fetch(promise seed);
void take(promise p, promise<int> *ps) { mapping seen = ([ p : 1 ]); }
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

    it("resolves promisep, whose argument is deliberately mixed", () => {
        // The *p() test for T_PROMISE takes `mixed`: the question is only
        // interesting for a value whose type is not known statically.
        const source = `
void test(mixed m, promise p) {
    int a = promisep(m);
    int b = promisep(p);
    int c = promisep(0);
}
`;
        expect(messages(source)).toBe("");
    });

    it("resolves async_yield, the cooperative preemption point", () => {
        const source = `
async void reindex(mixed *rows) {
    int i;
    foreach (mixed row in rows) {
        if (++i % 500 == 0) {
            await async_yield();
        }
    }
}
`;
        expect(messages(source)).toBe("");
    });

    it("resolves both forms of async_info", () => {
        const source = `void test() { mapping *frames = async_info(); mapping stats = async_info(1); }`;
        expect(messages(source)).toBe("");
    });

    it("no longer knows await_callout, which the driver replaced with call_out(delay)", () => {
        expect(messages(`void test() { mixed p = await_callout(1); }`))
            .toContain("Cannot find name 'await_callout'");
    });

    it("accepts both the classic and promise forms of call_out", () => {
        const source = `
async void test() {
    int handle = call_out("cb", 2, 1);
    promise timer = call_out(0.5);
    await call_out(1);
    await call_out_walltime(1);
}
`;
        expect(messages(source)).toBe("");
    });

    it("accepts the async package efuns with the callback omitted", () => {
        // Dropping the trailing callback switches each to its promise form.
        const source = `
async void test() {
    string body = await async_read("/log/access");
    mixed files = await async_getdir("/log/");
    await async_write("/log/access", "entry", 0);
}
`;
        expect(messages(source)).toBe("");
    });

    it("still accepts the async package efuns with a callback", () => {
        const source = `
void test() {
    async_read("/log/access", (: 1 :));
    async_getdir("/log/", (: 1 :));
    async_write("/log/access", "entry", 0, (: 1 :));
}
`;
        expect(messages(source)).toBe("");
    });

    it("type-checks promise arguments to the promise efuns", () => {
        expect(messages(`void test() { promise_status(1); }`))
            .toContain("Argument of type 'int' is not assignable to parameter of type 'promise<mixed>'");
    });

    it("keeps promise nominal against the other primitive types", () => {
        expect(messages(`void test(promise p) { string s = p; }`))
            .toContain("Type 'promise<mixed>' is not assignable to type 'string'");
    });

    it("spells out the payload when rendering a promise type", () => {
        // Rendering starts from the type, which cannot know whether the source said
        // `promise` or `promise<mixed>` -- they are the same type -- so both print the
        // payload, and `promise<int>` never looks inconsistent beside them.
        expect(messages(`void test(promise bare) { int n = bare; }`))
            .toContain("Type 'promise<mixed>' is not assignable to type 'int'");
        expect(messages(`void test(promise<int> typed) { string s = typed; }`))
            .toContain("Type 'promise<int>' is not assignable to type 'string'");
    });

    it("does not offer promise<T> to LDMud, which has no promises", () => {
        // `promise` is not a keyword there, so this is a chain of comparisons on locals --
        // exactly what it would have meant before any of this landed.
        const source = `int test() { int promise, a, b; promise = 1; return promise < a > b; }`;
        expect(messages(source, lpc.LanguageVariant.LDMud)).toBe("");
    });

    it("leaves async/await/acatch/promise as plain identifiers in LDMud", () => {
        // FluffOS-only keywords: an LDMud mudlib may still use these words as names.
        const source = `int test() { int async, await, acatch, promise; async = 1; return async; }`;
        expect(messages(source, lpc.LanguageVariant.LDMud)).toBe("");
    });
});
