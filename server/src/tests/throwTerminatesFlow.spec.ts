import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService } from "./harness.js";

/**
 * `throw()` aborts execution, so code after it is unreachable and a function whose
 * body only throws needs no return statement.
 *
 * The binder previously treated only `error()` (FluffOS) / `raise_error()` (LDMud) as
 * non-returning, on the stated grounds that "Fluff has throw too, but it doesn't
 * terminate execution". That matches neither driver: FluffOS declares `void throw(mixed)`
 * in core.spec and routes it through the same `[[noreturn]] throw_error()` as `error()`,
 * and LDMud documents its own `throw` as "Abort execution".
 *
 * Not async-specific -- but it is felt most there, since throw_error() documents a value
 * thrown inside an async body as becoming the rejection reason / acatch() result, making
 * "await, then throw" the driver's own idiom for rejecting. Those cases belong with the
 * async work; `async` is not a keyword here.
 */

function messages(source: string, driverType = lpc.LanguageVariant.FluffOS): string {
    const { ls, fileName } = createTestLanguageService({ "test.c": source }, { driverType });
    const program = ls.getProgram()!;
    const file = program.getSourceFile(fileName)!;
    return [...file.parseDiagnostics, ...program.getSemanticDiagnostics(file)]
        .map(d => lpc.flattenDiagnosticMessageText(d.messageText, " "))
        .join(" | ");
}

const MISSING_RETURN = "must return a value";

describe("throw() terminates control flow", () => {
    describe("FluffOS", () => {
        it("does not require a return when the body only throws", () => {
            expect(messages(`private int f() { throw("no"); }`)).toBe("");
        });

        it("treats throw() the same as error(), which already terminated", () => {
            expect(messages(`private int f() { error("no"); }`)).toBe("");
        });

        it("still reports a genuinely missing return", () => {
            expect(messages(`private int f() { }`)).toContain(MISSING_RETURN);
        });

        it("still reports a missing return when only one branch throws", () => {
            // A non-constant condition: the fall-through is reachable and returns nothing.
            expect(messages(`private int f(int x) { if(x) throw("no"); }`)).toContain(MISSING_RETURN);
        });

        it("accepts a branch that throws beside one that returns", () => {
            expect(messages(`private int f(int x) { if(x) throw("no"); return 1; }`)).toBe("");
        });
    });

    describe("LDMud", () => {
        const LD = lpc.LanguageVariant.LDMud;

        it("does not require a return when the body only throws", () => {
            // LDMud's own efun declaration is `void throw(mixed arg)` -- "Abort execution".
            expect(messages(`private int f() { throw("no"); }`, LD)).toBe("");
        });

        it("treats raise_error() as terminating, as before", () => {
            expect(messages(`private int f() { raise_error("no"); }`, LD)).toBe("");
        });

        it("still reports a genuinely missing return", () => {
            expect(messages(`private int f() { }`, LD)).toContain(MISSING_RETURN);
        });
    });

    it("does not treat an unrelated call named like a terminator as terminating", () => {
        // Only a bare identifier call counts; a member call named `throw` is someone
        // else's function and says nothing about this function's control flow.
        expect(messages(`private int f() { object o; o->throw("no"); }`)).toContain(MISSING_RETURN);
    });
});
