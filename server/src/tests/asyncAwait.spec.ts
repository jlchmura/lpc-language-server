import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";

/**
 * FluffOS native coroutines (fluffos#1319): the `async` function modifier, the `await`
 * unary expression, the async-aware `acatch`, the declared `promise` type and the promise
 * efuns.
 *
 * `acatch` and `promise` are FluffOS-only. `async` and `await` are not -- LDMud reserves
 * both -- but LDMud spells its coroutines differently enough that this scanner leaves them
 * as identifiers there for now; see isKeywordInVariant() for why, and the two LDMud cases
 * at the bottom of this file for what that does and does not assert.
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

    it("reports a promise of void once, without a cascading return-value error", () => {
        // Documenting an async function the way JS/TS does -- `@returns {promise<void>}`
        // on an `async void` -- is the natural mistake, since FluffOS annotations carry
        // the *fulfilled* type and `promise<void>` has no legal spelling at all. The tag
        // overrides the declared `void`, so a usable `promise<void>` type would also draw
        // "A function whose declared type is not 'void' must return a value" -- the louder
        // of the two, and the one that says nothing about the real mistake.
        const source = `/** @returns {promise<void>} Never fulfils. */\nasync void probe() { throw("no"); }`;
        const text = messages(source);
        expect(text).toContain("Illegal to declare a promise of type void.");
        expect(text).not.toContain("must return a value");
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

    // The driver relocates a `foreach`'s loop-variable lvalue across a suspension when it
    // addresses a slot inside the frame, and refuses when it does not (fluffos@77cad60e,
    // coroutine_await_pending). Both sides of that boundary are held here.

    it("accepts await inside a foreach over a local loop variable", () => {
        const source = `
promise fetch();
async int outer() {
    int *a = ({ 1, 2 });
    foreach (int v in a) { mixed r = await fetch(); }
    return 0;
}
`;
        expect(messages(source)).toBe("");
    });

    it("accepts await inside a foreach over a local declared outside the loop", () => {
        // Still a frame slot, so still relocatable -- only the object's variable block is
        // a second relocation base.
        const source = `
promise fetch();
async int outer() {
    int v;
    int *a = ({ 1, 2 });
    foreach (v in a) { mixed r = await fetch(); }
    return 0;
}
`;
        expect(messages(source)).toBe("");
    });

    it("rejects await inside a foreach over a global loop variable", () => {
        const source = `
promise fetch();
nosave int cursor;
async int outer() {
    foreach (cursor in ({ 1, 2 })) { mixed r = await fetch(); }
    return 0;
}
`;
        expect(messages(source))
            .toContain("'await' cannot suspend inside a 'foreach' over the global variable 'cursor'");
    });

    it("rejects await inside a foreach whose mapping value is a global", () => {
        // Either name of the two-variable mapping form is enough to refuse the loop.
        const source = `
promise fetch();
nosave mixed val;
async int outer() {
    mapping m = ([ ]);
    mixed k;
    foreach (k, val in m) { mixed r = await fetch(); }
    return 0;
}
`;
        expect(messages(source))
            .toContain("'await' cannot suspend inside a 'foreach' over the global variable 'val'");
    });

    it.each([["ref", "int ref n"], ["&", "int & n"]])(
        "rejects await inside a foreach over a by-reference loop variable (%s)",
        (_label, loopVar) => {
            const source = `
promise fetch();
async int outer() {
    int *a = ({ 1, 2 });
    foreach (${loopVar} in a) { n = await fetch(); }
    return 0;
}
`;
            expect(messages(source))
                .toContain("'await' cannot suspend inside a 'foreach' over a by-reference loop variable");
        },
    );

    it("rejects every await in a function that takes a by-reference parameter", () => {
        // The caller pushes the T_REF and it becomes the parameter slot, so it sits in the
        // frame for the body's whole life -- no await anywhere in it can park.
        const source = `
promise fetch();
async int outer(int ref x) {
    mixed r = await fetch();
    return 0;
}
`;
        expect(messages(source))
            .toContain("'await' cannot suspend in a function with the by-reference parameter 'x'");
    });

    it("rejects await after a by-reference argument in the same call", () => {
        const source = `
promise fetch();
void sink(int ref a, mixed b);
async int outer() {
    int y;
    sink(ref y, await fetch());
    return 0;
}
`;
        expect(messages(source))
            .toContain("a by-reference argument earlier in this call is already on the stack");
    });

    it("accepts await BEFORE a by-reference argument in the same call", () => {
        // Arguments evaluate left to right, so the ref is not on the stack yet when the
        // await parks. Confirmed against the driver, which accepts exactly this.
        const source = `
promise fetch();
void sink(mixed b, int ref a);
async int outer() {
    int y;
    sink(await fetch(), ref y);
    return 0;
}
`;
        expect(messages(source)).toBe("");
    });

    it("accepts an indexed assignment whose right-hand side awaits", () => {
        // Reads like a pinned lvalue, but the driver evaluates the right-hand side before
        // pinning the target, so both of these park and resume cleanly.
        const source = `
promise fetch();
async int outer() {
    string s = "abc";
    int *arr = ({ 1, 2, 3 });
    s[1] = await fetch();
    arr[1] += await fetch();
    return 0;
}
`;
        expect(messages(source)).toBe("");
    });

    it("finds an outer refused foreach from inside an inner one that parks fine", () => {
        const source = `
promise fetch();
nosave int cursor;
async int outer() {
    int *a = ({ 1, 2 });
    foreach (cursor in a) {
        foreach (int v in a) { mixed r = await fetch(); }
    }
    return 0;
}
`;
        expect(messages(source))
            .toContain("'await' cannot suspend inside a 'foreach' over the global variable 'cursor'");
    });

    it("does not report a frame-shape error for an await that never parks", () => {
        // `await 1` passes the value straight through, so it never reaches the driver's
        // relocation scan; the pass-through warning is the only thing to say about it.
        const source = `
nosave int cursor;
async int outer() {
    foreach (cursor in ({ 1, 2 })) { mixed r = await 1; }
    return 0;
}
`;
        const out = messages(source);
        expect(out).toContain("'await' has no effect here");
        expect(out).not.toContain("cannot suspend");
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

    // In LPC one type node heads the whole statement, so it hangs off the VariableStatement
    // rather than each declarator. Nothing visited it, so these were accepted while the
    // parameter form -- whose type IS on the declaration -- was correctly refused.
    it("rejects promise<void> as a local variable", () => {
        expect(messages(`void f() { promise<void> p; }`))
            .toContain("Illegal to declare a promise of type void.");
    });

    it("rejects promise<void> as an object variable", () => {
        expect(messages(`promise<void> p;`))
            .toContain("Illegal to declare a promise of type void.");
    });

    it("reports a shared type node once, not once per declarator", () => {
        const out = messages(`promise<void> a, b;`);
        expect(out.split("Illegal to declare a promise of type void.").length - 1).toBe(1);
    });

    it("rejects a nested promise payload in a variable declaration", () => {
        expect(messages(`void f() { promise<promise<int>> p; }`))
            .toContain("A promise payload type may not itself be a promise.");
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

    it("narrows a union through promisep", () => {
        // The union probe matters: `mixed` is assignable to everything, so a
        // `mixed` parameter would pass whether or not the guard narrowed.
        expect(messages(`void test(promise | int m) { if (promisep(m)) { promise p = m; } }`)).toBe("");
        expect(messages(`void test(promise | int m) { promise p = m; }`))
            .toContain("Type 'int | promise<mixed>' is not assignable to type 'promise<mixed>'");
    });

    it("resolves the promise combinators, unwrapping each payload", () => {
        const source = `
async void test(promise a, promise b) {
    mixed *every = await promise_all(({ a, b }));
    mixed first = await promise_any(({ a, b }));
    mixed winner = await promise_race(({ a, b }));
    mapping *outcomes = await promise_all_settled(({ a, b }));
}
`;
        expect(messages(source)).toBe("");
    });

    it("reports the combinator payloads when they are misused", () => {
        expect(messages(`async void test(promise a) { int bad = await promise_all(({ a })); }`))
            .toContain("Type 'mixed*' is not assignable to type 'int'");
        expect(messages(`async void test(promise a) { int bad = await promise_all_settled(({ a })); }`))
            .toContain("Type 'mapping*' is not assignable to type 'int'");
    });

    it("takes mixed *, not promise *, so map() output and plain values pass straight in", () => {
        // A non-promise element counts as already fulfilled with itself, which is
        // the whole reason the driver spells the parameter `mixed *`.
        const source = `
promise fetch(string name);
async void test(string *names, promise p) {
    mixed *rows = await promise_all(map(names, (: fetch($1) :)));
    mixed winner = await promise_race(({ p, 42 }));
}
`;
        expect(messages(source)).toBe("");
    });

    it("rejects a literal empty array to promise_race", () => {
        // The driver refuses this outright: a promise that can never settle would park
        // an awaiting frame for the life of the driver.
        expect(messages(`async void test() { await promise_race(({ })); }`))
            .toContain("'promise_race' requires at least one promise");
        expect(messages(`async void test(promise p) { await promise_race(({ p })); }`)).toBe("");
    });

    it("warns that a literal empty array to promise_any can only ever reject", () => {
        // Legal, unlike promise_race, but futile -- so a warning rather than an error.
        expect(messages(`async void test() { await promise_any(({ })); }`))
            .toContain("'promise_any' of an empty array always rejects");
        expect(diagnosticsFor(`async void test() { await promise_any(({ })); }`, lpc.LanguageVariant.FluffOS)
            .map(d => d.category)).toContain(lpc.DiagnosticCategory.Warning);
        expect(messages(`async void test(promise p) { await promise_any(({ p })); }`)).toBe("");
    });

    it("leaves an empty array alone for the combinators that define one", () => {
        // promise_all and promise_all_settled both fulfill immediately with an empty
        // array, so there is nothing to report.
        expect(messages(`async void test() { await promise_all(({ })); }`)).toBe("");
        expect(messages(`async void test() { await promise_all_settled(({ })); }`)).toBe("");
    });

    it("leaves promise_race alone when it is a mudlib function, not the efun", () => {
        // The check resolves through the signature, so shadowing the efun with a
        // local definition takes the diagnostic with it.
        const source = `
mixed promise_race(mixed *promises) { return 0; }
void test() { mixed winner = promise_race(({ })); }
`;
        expect(messages(source)).toBe("");
    });

    it("only sees the literal spelling -- an empty array through a variable is a runtime matter", () => {
        const source = `
async void test() {
    mixed *none = ({ });
    await promise_race(none);
}
`;
        expect(messages(source)).toBe("");
    });

    it("resolves promise_cancel, which answers whether anything was armed", () => {
        expect(messages(`void test(promise p) { int armed = promise_cancel(p); }`)).toBe("");
        expect(messages(`void test(promise p) { string bad = promise_cancel(p); }`))
            .toContain("Type 'int' is not assignable to type 'string'");
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

    it("leaves acatch and promise as plain identifiers in LDMud, which has neither", () => {
        // These two really are FluffOS-only, so an LDMud mudlib may use them as names.
        const source = `int test() { int acatch, promise; acatch = 1; return acatch; }`;
        expect(messages(source, lpc.LanguageVariant.LDMud)).toBe("");
    });

    it("leaves async and await as identifiers in LDMud, pending its coroutine grammar", () => {
        // NOT because LDMud allows them as names -- it does not. LDMud reserves both in
        // lex.c's reswords[]. This pins current behaviour, which is a gap in the scanner:
        // LDMud's coroutines are `coroutine` VALUES with a call-shaped `await(cr, opt)`
        // and `yield(...)`, sharing only the spelling with FluffOS's promise-based unary
        // `await p`. Tokenizing them here without that grammar would mis-parse real LDMud
        // code, so they are left alone until the grammar lands. When it does, this case
        // should start reporting -- it is the tripwire, not the specification.
        const source = `int test() { int async, await; async = 1; return async; }`;
        expect(messages(source, lpc.LanguageVariant.LDMud)).toBe("");
    });
});
