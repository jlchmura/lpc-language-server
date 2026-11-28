import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * LDMud takes a `varargs` parameter that is a union of arrays as an array of the union of their
 * elements (prolang.y get_flattened_type), so `varargs int*|object* args` accepts each extra
 * argument as an int or an object -- the form of LDMud's own query_mud_port() replacement.
 */
describe.each(["strict", "driver"] as const)("a varargs parameter that is a union of arrays (%s mode)", typeChecking => {
    function diagnosticsFor(source: string): string[] {
        const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType: lpc.LanguageVariant.LDMud, diagnostics: true, typeChecking });
        return allDiagnostics(ls, abs("test.c")).map(codeAndMessage);
    }

    it("accepts each extra argument as any of the element types", () => {
        expect(diagnosticsFor(`int f(varargs int*|object* args) { return sizeof(args); }
void g() { f(); f(1); f(this_object()); f(1, this_object(), 2); }`)).toEqual([]);
    });

    it("rejects an argument of none of them", () => {
        expect(diagnosticsFor(`int f(varargs int*|object* args) { return sizeof(args); }\nvoid g() { f("x"); }`)).toEqual([
            "2345: Argument of type 'string' is not assignable to parameter of type 'object | int'.",
        ]);
    });
});
