import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService } from "./harness.js";

/**
 * Operand types for `-`, `&`, `*` and `+` follow LDMud's operator type tables in prolang.y
 * (types_subtraction[], types_binary_and[], types_multiplication[], types_addition[]). An
 * operand matches an entry if any constituent of its union type does, and `mixed` matches
 * every entry.
 *
 * FluffOS is stricter. Its grammar.y takes only ints for `&` on non-arrays (binary_int_op),
 * only numbers or arrays for `-`, and only numbers or mappings for `*`, so mapping `-`/`&`
 * and string or array repetition are compile errors there and stay errors here.
 */

function check(body: string, driverType: lpc.LanguageVariant) {
    const source = `#pragma strong_types\nvoid f() {\n${body}\n}\n`;
    const { ls, fileName } = createTestLanguageService({ "test.c": source }, { driverType });
    return [...ls.getSyntacticDiagnostics(fileName), ...ls.getSemanticDiagnostics(fileName)]
        .map(d => lpc.flattenDiagnosticMessageText(d.messageText, " "));
}

const ldmud = (body: string) => check(body, lpc.LanguageVariant.LDMud);
const fluffos = (body: string) => check(body, lpc.LanguageVariant.FluffOS);

describe("LDMud operator operand types", () => {
    it.each([
        ["mapping - mapping", "mapping a, b; mapping r = a - b;"],
        ["mapping - array (removes keys)", "mapping a; string *keys; mapping r = a - keys;"],
        ["array - mapping (removes keys)", "string *a; mapping m; string *r = a - m;"],
        ["mapping & mapping", "mapping a, b; mapping r = a & b;"],
        ["mapping & array", "mapping a; string *keys; mapping r = a & keys;"],
        ["array & mapping", "string *a; mapping m; string *r = a & m;"],
        ["mapping -= array", "mapping a; string *keys; a -= keys;"],
        ["mapping &= mapping", "mapping a, b; a &= b;"],
        ["string - string", `string s; string r = s - "a";`],
        ["string & string", `string s; string r = s & "abc";`],
        ["string * int", "string s; string r = s * 3;"],
        ["int * string", "string s; string r = 3 * s;"],
        ["string *= int", "string s; s *= 3;"],
        ["bytes * int", "bytes b; bytes r = b * 2;"],
        ["array * int", "int *a; int *r = a * 3;"],
        ["int * array", "int *a; int *r = 3 * a;"],
    ])("accepts %s", (_, body) => {
        expect(ldmud(body)).toEqual([]);
    });

    it.each([
        ["(mapping|int) + mapping", "mapping|int a; mapping b; mapping r = a + b;"],
        ["(mapping|int) - mapping", "mapping|int a; mapping b; mapping r = a - b;"],
        ["(mapping|int) & mapping", "mapping|int a; mapping b; mapping r = a & b;"],
        ["mapping - (mapping|string*)", "mapping a; mapping|string *b; mapping r = a - b;"],
    ])("accepts a union operand when one of its types fits: %s", (_, body) => {
        expect(ldmud(body)).toEqual([]);
    });

    it.each([
        ["int* -= mixed", "int *a; mixed m; a -= m;"],
        ["mapping - mixed", "mapping a; mixed m; mapping r = a - m;"],
        ["mixed * int", "mixed m; string r = m * 2;"],
    ])("accepts a mixed operand: %s", (_, body) => {
        expect(ldmud(body)).toEqual([]);
    });

    it("types the result by the matching entry", () => {
        expect(ldmud("mapping a, b; int r = a - b;")).toEqual(["Type 'mapping' is not assignable to type 'int'."]);
        expect(ldmud("string s; int r = s * 2;")).toEqual(["Type 'string' is not assignable to type 'int'."]);
    });

    it("leaves number arithmetic as it was", () => {
        expect(ldmud("int a, b; float x; int r = a - b; float y = x * a; int z = a & b;")).toEqual([]);
    });

    it.each([
        ["mapping - int", "mapping a; mixed r = a - 1;", "Operator '-' cannot be applied to types 'mapping' and 'int'."],
        ["mapping * int", "mapping a; mixed r = a * 2;", "Operator '*' cannot be applied to types 'mapping' and 'int'."],
        ["string * string", "string s; mixed r = s * s;", "Operator '*' cannot be applied to types 'string' and 'string'."],
        ["string -= int", "string s; s -= 1;", "Operator '-=' cannot be applied to types 'string' and 'int'."],
        ["mapping & int", "mapping a; mixed r = a & 1;", "Operator '&' cannot be applied to types 'mapping' and 'int'."],
        ["object - int", "object o; mixed r = o - 1;", "Operator '-' cannot be applied to types 'object' and 'int'."],
    ])("rejects %s, which no table entry takes", (_, body, message) => {
        expect(ldmud(body)).toEqual([message]);
    });
});

describe("FluffOS operator operand types (grammar.y)", () => {
    it.each([
        ["mapping - mapping", "mapping a, b; mixed r = a - b;"],
        ["mapping & mapping", "mapping a, b; mixed r = a & b;"],
        ["string * int", "string s; mixed r = s * 3;"],
        ["string - string", `string s; mixed r = s - "a";`],
    ])("still rejects %s", (_, body) => {
        expect(fluffos(body).length).toBeGreaterThan(0);
    });

    it("names LPC types, not TypeScript's, in the operand error", () => {
        expect(fluffos("mapping a; mixed r = a - 1;")).toEqual([
            "The left-hand side of an arithmetic operation must be of type 'int', 'float', 'mixed' or an array.",
        ]);
    });

    it("still accepts mapping + mapping", () => {
        expect(fluffos("mapping a, b; mapping r = a + b;")).toEqual([]);
    });
});
