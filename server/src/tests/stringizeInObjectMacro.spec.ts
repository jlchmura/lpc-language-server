import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService, messageLines } from "./harness.js";

/**
 * `#name` in the body of an object-like macro.
 *
 * An object-like macro has no parameters, so its `argsIn` is undefined and
 * parseStringizedIdentifier crashed reading `argsIn[name]` ("Cannot read properties of
 * undefined") as soon as the macro was used. FluffOS now reports the missing parameter, as it
 * already did for a function-like macro. LDMud has no `#` operator, so there `#` is an invalid
 * character, reported at the macro use.
 */
const source = `#define HASHED #abc
int f() { return HASHED; }
`;

describe.each([
    ["FluffOS", lpc.LanguageVariant.FluffOS, "abc"],
    ["LDMud", lpc.LanguageVariant.LDMud, "Invalid character"],
] as const)("#name in an object-like macro (%s)", (_name, driver, expected) => {
    it("reports an error instead of crashing", () => {
        const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType: driver, diagnostics: true });
        const messages = ls.getSyntacticDiagnostics(abs("test.c")).map(messageLines);
        expect(messages.some(m => m.includes(expected))).toBe(true);
        expect(() => ls.getSemanticDiagnostics(abs("test.c"))).not.toThrow();
    });
});
