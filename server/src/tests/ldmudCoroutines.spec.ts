import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService } from "./harness.js";

/**
 * LDMud coroutines (3.6.5): the `async` modifier on functions and inline closures, the
 * `coroutine` type, the call-shaped `await(cr[, value])` and `yield([value[, cr]])`
 * instructions, `foreach` over a coroutine, and the coroutine efuns.
 *
 * The grammar is prolang.y's `coroutine_def`, `inline_func` (with `inline_opt_async`) and
 * `coroutine_call`. The accepted programs below are taken from the driver's own test suite
 * (test/t-coroutine), which the driver compiles and runs.
 */

function diagnostics(files: Record<string, string>): string[] {
    const { ls, fileName } = createTestLanguageService(files, { driverType: lpc.LanguageVariant.LDMud });
    return [...ls.getSyntacticDiagnostics(fileName), ...ls.getSemanticDiagnostics(fileName)]
        .map(d => lpc.flattenDiagnosticMessageText(d.messageText, "\n"));
}

const check = (source: string) => diagnostics({ "test.c": source });

describe("LDMud coroutines", () => {
    describe("accepts what the driver compiles", () => {
        it("async functions, await() and yield() (t-coroutine/sefun.c, ob.c)", () => {
            const source = `#pragma save_types, strong_types, rtt_checks

async void sleep1(int sec)
{
    call_out(#'call_coroutine, sec, this_coroutine());

    yield();
}

coroutine sleep2(int sec)
{
    coroutine result = async function void() { yield(); };

    call_out(#'call_coroutine, sec, result);

    return result;
}

async void sleeping_fun(closure cb)
{
    await(sleep1(0));

    int start = time();
    await(sleep1(2));

    int middle = time();
    await(sleep2(4));

    funcall(cb, middle - start == 2 && time() - middle == 4);
}
`;
            expect(check(source)).toEqual([]);
        });

        it("generators, references and nested yields (t-coroutine/master.c)", () => {
            const source = `#pragma save_types, strong_types, rtt_checks

async void range(int start, int stop, int step = 1)
{
    for (int i = start; i < stop; i+= step)
        yield(i);
}

coroutine reverse(mixed *args)
{
    return async function void()
    {
        for (int i = sizeof(args); i-- > 0;)
            yield(&(args[i]));
    };
}

async void data_cr(mixed arg, mixed val = ({ 'me }))
{
}

async mixed return_value(mixed arg)
{
    return arg;
}

int run()
{
    coroutine cr = async function int()
    {
        return 20 + yield(10+yield(100));
    };
    if (call_coroutine(cr, 2) != 100)
        return 0;

    coroutine me = async function void()
    {
        yield(this_coroutine());
    };
    if (call_coroutine(me) != me || !coroutinep(me))
        return 0;

    int sum;
    foreach (int num: range(10, 100, 5))
        sum += num;

    string* arr = ({ "1", "2", "3", });
    foreach (string s: &(reverse(arr)))
        s += "x";

    coroutine cr1 = async function void() { yield(1); };
    coroutine cr2 = async function void()
    {
        yield(0, cr1);
        await(cr1);
    };

    return call_coroutine(async function int()
    {
        int total;

        foreach (int num: range(10, 100, 5))
        {
            total += await(return_value(num));
            switch (yield(total))
            {
                case 1: total += yield(1); break;
                default: return total;
            }
        }

        return total;
    }) == 945;
}

coroutine* global_crs = ({
    reverse(({1,2,3})),
    async function int*() { return ({ 0, yield() }); },
});
`;
            expect(check(source)).toEqual([]);
        });

        it("only checks the coroutine operand's type statically, like the driver", () => {
            // t-coroutine's "await() with wrong type" cases fail at run time, not compile
            // time: a `mixed` operand may hold a coroutine, and so may a union with one in it.
            const source = `
void run(mixed cr, coroutine|int either)
{
    call_coroutine(async function void()
    {
        await(cr);
        yield(20, cr);
        await(either);
    });
}
`;
            expect(check(source)).toEqual([]);
        });

        it("takes `async` before any other modifier, and on a prototype", () => {
            const source = `
async static varargs void later(int n);
async private int counted() { return 1; }
async void later(int n) { yield(n); }
`;
            expect(check(source)).toEqual([]);
        });

        it("types a call_other to an async function as a coroutine", () => {
            const errors = diagnostics({
                "test.c": `coroutine run() { return "/ob"->sleeping_fun(0); }\n`,
                "ob.c": `async void sleeping_fun(closure cb) { yield(); }\n`,
            });
            expect(errors).toEqual([]);
        });

        it("defines __LPC_COROUTINES__", () => {
            expect(check(`int has_coroutines() { return __LPC_COROUTINES__; }\n`)).toEqual([]);
        });

        it("allows postfix operators on await() and yield(), which are calls in the grammar", () => {
            const source = `
async void run(coroutine cr)
{
    mixed first = await(cr)[0];
    int len = sizeof(yield());
}
`;
            expect(check(source)).toEqual([]);
        });
    });

    describe("types", () => {
        it("gives a call to an async function the type coroutine, not its declared type", () => {
            const source = `
async int work() { return 1; }
void run()
{
    coroutine ok = work();
    int bad = work();
}
`;
            expect(check(source)).toEqual(["Type 'coroutine' is not assignable to type 'int'."]);
        });

        it("still checks return statements against the declared return type", () => {
            const source = `
async int work() { return "one"; }
coroutine inline_work() { return async function int() { return "two"; }; }
`;
            expect(check(source)).toEqual([
                "Type 'string' is not assignable to type 'int'.",
                "Type 'string' is not assignable to type 'int'.",
            ]);
        });

        it("makes an async inline closure a coroutine and keeps coroutine nominal", () => {
            const source = `
void run()
{
    coroutine cr = async function void() {};
    closure cl = async function void() {};
    coroutine not_a_coroutine = function void() {};
    lwobject lw = cr;
    int i = cr;
}
`;
            // (`closure` prints as `function` in this checker.)
            expect(check(source)).toEqual([
                "Type 'coroutine' is not assignable to type 'function'.",
                "Type 'void function()' is not assignable to type 'coroutine'.",
                "Type 'coroutine' is not assignable to type 'lwobject'.",
                "Type 'coroutine' is not assignable to type 'int'.",
            ]);
        });

        it("binds the values a coroutine yields in foreach without a static type", () => {
            const source = `
async void words() { yield("a"); }
void run()
{
    string w;
    foreach (w: words()) { }
    foreach (int n: words()) { }
}
`;
            expect(check(source)).toEqual([]);
        });
    });

    describe("errors the driver reports", () => {
        it("rejects await() and yield() outside a coroutine", () => {
            // "await statement outside coroutine" / "yield statement outside coroutine". A
            // plain closure inside an async function is a frame of its own.
            const source = `
void plain(coroutine cr)
{
    await(cr);
    yield();
}

async void outer()
{
    closure c = function void() { yield(); };
    closure d = (: yield($1) :);
}
`;
            expect(check(source)).toEqual([
                "'await' is only allowed inside a coroutine (an 'async' function or inline closure).",
                "'yield' is only allowed inside a coroutine (an 'async' function or inline closure).",
                "'yield' is only allowed inside a coroutine (an 'async' function or inline closure).",
                "'yield' is only allowed inside a coroutine (an 'async' function or inline closure).",
            ]);
        });

        it("rejects an operand that can never be a coroutine", () => {
            // "Bad argument to await()" / "Bad argument 2 to yield()".
            const source = `
async void run()
{
    await(5);
    yield(1, "not a coroutine");
    yield("any value is fine here");
}
`;
            expect(check(source)).toEqual([
                "Argument of type 'int' is not assignable to parameter of type 'coroutine'.",
                "Argument of type 'string' is not assignable to parameter of type 'coroutine'.",
            ]);
        });

        it("rejects an argument count the grammar does not have", () => {
            const source = `
async void run(coroutine cr)
{
    await();
    await(cr, 1, 2);
    yield(1, cr, 2);
}
`;
            expect(check(source)).toEqual([
                "Expected 1-2 arguments, but got 0.",
                "Expected 1-2 arguments, but got 3.",
                "Expected 0-2 arguments, but got 3.",
            ]);
        });

        it("rejects async after another modifier, or on a variable", () => {
            const source = `
static async void late() {}
async int counter;
`;
            expect(check(source)).toEqual([
                "The 'async' modifier must come before all other modifiers.",
                "The 'async' modifier can only be applied to function declarations.",
            ]);
        });

        it("reserves async, await, yield and coroutine", () => {
            // All four are in lex.c's reswords[].
            for (const word of ["async", "await", "yield", "coroutine"]) {
                expect(check(`int test() { int ${word}; return 0; }\n`).length).toBeGreaterThan(0);
            }
        });
    });

    it("leaves yield and coroutine as identifiers in FluffOS", () => {
        const { ls, fileName } = createTestLanguageService({
            "test.c": `int test() { int yield, coroutine; yield = coroutine = 1; return yield; }\n`,
        });
        const errors = [...ls.getSyntacticDiagnostics(fileName), ...ls.getSemanticDiagnostics(fileName)];
        expect(errors.map(d => lpc.flattenDiagnosticMessageText(d.messageText, "\n"))).toEqual([]);
    });
});
