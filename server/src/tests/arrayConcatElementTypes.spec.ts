import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService } from "./harness.js";

/**
 * Appending to an array checked the element types with `areTypesComparable`, which succeeds when
 * merely *some* union constituent matches. So a mixed literal slipped through:
 *
 *     string *items;
 *     items += ({ "f", 123, 567 });   // right element type is `string | int`
 *
 * The `string` half satisfied comparability and no error was reported, while the homogeneous
 * `items += ({ 123 })` was caught -- `int` alone is not comparable to `string`.
 *
 * The result keeps the left array's element type, so every element arriving from the right has
 * to fit it. That is assignability, and it is directional.
 *
 * Subtraction follows the driver instead (see operatorOperandTypes.spec.ts). FluffOS takes any
 * array literal on the right of `-=`, since it types every literal as `mixed*`, but two array
 * variables need the same type.
 */
function diagnosticsFor(source: string): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, {
        driverType: lpc.LanguageVariant.FluffOS,
        diagnostics: true,
    });
    return ls.getSemanticDiagnostics(abs("test.c"))
        .map(d => `${d.code}: ${lpc.flattenDiagnosticMessageText(d.messageText, " ")}`);
}

describe("appending an array with a union element type", () => {
    it("reports a literal that mixes a valid element type with an invalid one", () => {
        expect(diagnosticsFor(`test() { string *a; a += ({ "f", 123, 567 }); }`))
            .toEqual(["2365: Operator '+=' cannot be applied to types 'string*' and '(string | int)*'."]);
    });

    it("reports it the same way after an empty array initializer", () => {
        // The two fixes meet here: the declaration keeps its `string*` type, and the append is
        // then checked against it.
        expect(diagnosticsFor(`test() { string *a = ({}); a += ({ "f", 123, 567 }); }`))
            .toEqual(["2365: Operator '+=' cannot be applied to types 'string*' and '(string | int)*'."]);
    });

    it("still accepts a literal whose elements all fit", () => {
        expect(diagnosticsFor(`test() { string *a; a += ({ "f", "g" }); }`)).toEqual([]);
    });

    it("still reports a homogeneous literal of the wrong type", () => {
        expect(diagnosticsFor(`test() { string *a; a += ({ 1, 2 }); }`))
            .toEqual(["2365: Operator '+=' cannot be applied to types 'string*' and 'int*'."]);
    });
});

describe("appending where one side says nothing about its contents", () => {
    it("accepts anything appended to a mixed array", () => {
        expect(diagnosticsFor(`test() { mixed *a; a += ({ "f", 123 }); }`)).toEqual([]);
    });

    it("accepts a mixed array appended to a typed one", () => {
        // `mixed` is permissive in both directions here, as it is everywhere else.
        expect(diagnosticsFor(`test() { string *a; mixed *b; a += b; }`)).toEqual([]);
        expect(diagnosticsFor(`test() { mixed *a; string *b; a += b; }`)).toEqual([]);
    });
});

describe("array subtraction follows FluffOS", () => {
    it("takes any array literal, which FluffOS types as mixed*", () => {
        expect(diagnosticsFor(`test() { string *a; a -= ({ "f", 123 }); }`)).toEqual([]);
        expect(diagnosticsFor(`test() { string *a; a -= ({ 123 }); }`)).toEqual([]);
    });

    it("takes two arrays of different types in `-`, but not in `-=`", () => {
        expect(diagnosticsFor(`test() { string *a; int *b; mixed *r = a - b; }`)).toEqual([]);
        expect(diagnosticsFor(`test() { string *a; int *b; a -= b; }`)).toEqual([
            "2365: Operator '-=' cannot be applied to types 'string*' and 'int*'.",
        ]);
    });
});
