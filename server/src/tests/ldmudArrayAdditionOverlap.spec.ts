import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * LDMud accepts `a += b` and `a + b` on arrays when their element types have one in common
 * (prolang.y types_add_assignment, get_sub_array_type), so driver mode does too. Strict mode
 * still asks every element of the right array to fit the left one.
 */
describe("adding arrays whose element types only overlap (LDMud)", () => {
    function diagnosticsFor(source: string, typeChecking: "strict" | "driver"): string[] {
        const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType: lpc.LanguageVariant.LDMud, diagnostics: true, typeChecking });
        return allDiagnostics(ls, abs("test.c")).map(codeAndMessage);
    }
    const source = `void f(object|string gi, int|string n) { object *items = ({}); items += ({ gi }); int *nums = ({}); nums += ({ n }); }`;

    it("is accepted in driver mode", () => {
        expect(diagnosticsFor(source, "driver")).toEqual([]);
    });

    it("is reported in strict mode", () => {
        expect(diagnosticsFor(source, "strict")).toEqual([
            "2365: Operator '+=' cannot be applied to types 'object*' and '(object | string)*'.",
            "2365: Operator '+=' cannot be applied to types 'int*' and '(string | int)*'.",
        ]);
    });

    it("is reported in driver mode when the element types have nothing in common", () => {
        expect(diagnosticsFor(`void f() { string *s = ({}); s += ({ 123 }); }`, "driver")).toEqual([
            "2365: Operator '+=' cannot be applied to types 'string*' and 'int*'.",
        ]);
    });
});
