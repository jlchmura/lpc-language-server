import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService } from "./harness.js";

/**
 * `#name` in the body of an object-like macro.
 *
 * An object-like macro has no parameters, so its `argsIn` is undefined and
 * parseStringizedIdentifier crashed reading `argsIn[name]` ("Cannot read properties of
 * undefined") as soon as the macro was used. It now reports the missing parameter, as it
 * already did for a function-like macro.
 */
const source = `#define HASHED #abc
int f() { return HASHED; }
`;

describe.each([
    ["FluffOS", lpc.LanguageVariant.FluffOS],
    ["LDMud", lpc.LanguageVariant.LDMud],
] as const)("#name in an object-like macro (%s)", (_name, driver) => {
    it("reports the missing macro parameter instead of crashing", () => {
        const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType: driver, diagnostics: true });
        const messages = ls.getSyntacticDiagnostics(abs("test.c"))
            .map(d => lpc.flattenDiagnosticMessageText(d.messageText, "\n"));
        expect(messages.some(m => m.includes("abc"))).toBe(true);
        expect(() => ls.getSemanticDiagnostics(abs("test.c"))).not.toThrow();
    });
});
