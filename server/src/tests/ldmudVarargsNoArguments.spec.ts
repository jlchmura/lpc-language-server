import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService, messageLines } from "./harness.js";

/**
 * An LDMud `varargs <type> args` parameter called with no arguments at all.
 *
 * LDMud collects the extra arguments into the array, so `count_args()` passes an empty
 * array. getSpreadArgumentType read `args[argCount - 1]`, i.e. `args[-1]`, when there were
 * no arguments, and the checker crashed with "Cannot read properties of undefined
 * (reading 'kind')". Found on a simul-efun (`query_mud_port()` in a real mudlib).
 */
const source = `int count_args(varargs int*|object* args) { return sizeof(args); }
int check() { return count_args() == 0 && count_args(1, 2) == 2; }
`;

function messages(): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, {
        driverType: lpc.LanguageVariant.LDMud,
        diagnostics: true,
    });
    return ls.getSemanticDiagnostics(abs("test.c")).map(messageLines);
}

describe("an LDMud varargs parameter called with no arguments", () => {
    it("checks without crashing and reports nothing", () => {
        expect(messages()).toEqual([]);
    });
});
