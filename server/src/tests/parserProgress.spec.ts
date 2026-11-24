import * as lpc from "./_namespaces/lpc.js";
import { createTestProgram } from "./harness.js";

/**
 * `parseList` requires every element parse to consume at least one token. When one does
 * not -- `isListElement()` accepts a token the grammar has no production for -- the loop
 * spins forever, `finishNode` piles entries into `nodeFileMap` until the Map hits its
 * ~16.7M cap, and the RangeError surfaces from whatever unrelated frame happens to be on
 * the stack. The project then fails to build and every file silently loses diagnostics.
 *
 * Found in the wild: one `async` prototype in an included header took down a whole mudlib
 * project on a build without FluffOS coroutine support. The scanner still produces
 * AsyncKeyword there; nothing accepts it in declaration position.
 *
 * These tests assert TERMINATION, not any particular diagnostic -- a build that DOES have
 * a production for the token is equally correct, and should stay passing.
 */
function parse(source: string) {
    const { program, fileName: virtualFile } = createTestProgram({ "server/src/tests/cases/compiler/__progress.c": source }, { driverType: lpc.LanguageVariant.FluffOS });
    return program.getSourceFile(virtualFile)!;
}

describe("parser makes progress on every list element", () => {
    it("terminates on an async prototype at top level", () => {
        const sf = parse(`async void plain_async();\nvoid f() { }\n`);
        expect(sf).toBeDefined();
    }, 15000);

    it("terminates on a run of async prototypes", () => {
        // The shape that took down a real project: a header full of them.
        const lines = Array.from({ length: 40 }, (_, i) => `async void a${i}(int x);`).join("\n");
        const sf = parse(`${lines}\nvoid f() { }\n`);
        expect(sf).toBeDefined();
    }, 15000);

    it("terminates on async in a varargs prototype with rest args", () => {
        const sf = parse(`async varargs void each_async(mixed src, function fun, mixed extra...);\nvoid f() { }\n`);
        expect(sf).toBeDefined();
    }, 15000);
});
