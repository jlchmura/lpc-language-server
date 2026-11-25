import * as lpc from "./_namespaces/lpc.js";
import { createTestProgram } from "./harness.js";

/**
 * LPC has no tuple type syntax, but the checker builds tuple types internally when
 * modeling spread/rest call arguments. Calling a function whose `varargs` parameter is
 * not an array with several positional arguments produces a spread tuple (e.g.
 * `[int, string]`) that is checked against the parameter type. The declaration is itself an
 * error (a varargs parameter must allow an array), but calls to it are still checked, and
 * that is where the tuple shows up. Rendering that tuple for a diagnostic used to
 * fail in the type-node builder -- the tuple case set `encounteredError` and returned
 * undefined, so the type printed as `<never>` (and `typeToString` logged a warning).
 *
 * The builder now renders a tuple as an array of its element-type union, so the type is
 * shown correctly in the message.
 */
function diagnosticMessages(source: string, driverType = lpc.LanguageVariant.LDMud): string[] {
    const { program, sourceFile } = createTestProgram({ "tuple.c": source }, { driverType });
    const file = sourceFile();
    return [...file.parseDiagnostics, ...program.getSemanticDiagnostics(file)].map(d =>
        lpc.flattenDiagnosticMessageText(d.messageText, "\n"));
}

describe("tuple type rendering in the node builder", () => {
    it("renders a spread-argument tuple as an array of its element union, not `<never>`", () => {
        // The [int, string] spread tuple for `g(1, "a")` appears in the mismatch message.
        // Before the fix it rendered as `<never>`.
        const messages = diagnosticMessages(`void g(varargs int n) {}\nvoid f() { g(1, "a"); }\n`);
        const argError = messages.find(m => /Argument of type .* is not assignable/.test(m));
        expect(argError).toBeDefined();
        expect(argError).toContain("(string | int)*");
        expect(argError).not.toContain("<never>");
        expect(messages).toContain("A 'varargs' parameter must be declared as an array or 'mixed'.");
    });
});
