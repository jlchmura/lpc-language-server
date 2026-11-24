import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService, allDiagnostics, message } from "./harness.js";

/**
 * Operand types for `-`, `&`, `*` and `+`, and their assignment forms, follow each driver's
 * own compiler.
 *
 * LDMud: the operator type tables in prolang.y (types_subtraction[], types_binary_and[],
 * types_multiplication[], types_addition[] and the *_assignment[] tables), read the way
 * check_binary_op_types() reads them: an operand matches an entry if any constituent of its
 * union type does, and `mixed` matches every entry.
 *
 * FluffOS: grammar.y's `expr0` rules and trees.cc's binary_int_op() for the binary operators.
 * An assignment `a op= b` only checks compatible_types(b, a) (compiler.cc), plus
 * `string += int|float|object`.
 *
 * Each row is [expected, description, function body].
 */

type Row = ["ok" | "error", string, string];

function errors(body: string, driverType: lpc.LanguageVariant) {
    const source = `#pragma strong_types\nvoid f() {\n${body}\n}\n`;
    const { ls, fileName } = createTestLanguageService({ "test.c": source }, { driverType });
    return allDiagnostics(ls, fileName).map(message);
}

function checkRows(driverType: lpc.LanguageVariant, rows: Row[]) {
    it.each(rows)("%s: %s", (expected, _, body) => {
        const found = errors(body, driverType);
        if (expected === "ok") expect(found).toEqual([]);
        else expect(found.length).toBeGreaterThan(0);
    });
}

describe("LDMud operand types (prolang.y)", () => {
    describe("-", () => checkRows(lpc.LanguageVariant.LDMud, [
        ["ok", "mapping - mapping", "mapping a, b; mapping r = a - b;"],
        ["ok", "mapping - array (removes keys)", "mapping a; string *keys; mapping r = a - keys;"],
        ["ok", "array - mapping (removes keys)", "string *a; mapping m; string *r = a - m;"],
        ["ok", "string - string", `string s; string r = s - "a";`],
        ["ok", "arrays with a common element type", "int *a, *b; int *r = a - b;"],
        ["ok", "an array and mixed*", "string *a; mixed *b; string *r = a - b;"],
        ["ok", "a union with a mapping in it", "mapping|int a; mapping b; mapping r = a - b;"],
        ["ok", "a mixed operand", "mapping a; mixed m; mapping r = a - m;"],
        ["ok", "numbers", "int a, b; int r = a - b; mixed m; int s = m - 1;"],
        ["ok", "an array literal with a common element type", `string *a; a -= ({ "f", 123 });`],
        ["error", "arrays with no common element type", "string *a; int *b; mixed r = a - b;"],
        ["error", "arrays with no common element type, in -=", "string *a; int *b; a -= b;"],
        ["error", "an array literal with no common element type", "string *a; a -= ({ 123 });"],
        ["error", "mapping - int", "mapping a; mixed r = a - 1;"],
        ["error", "object - int", "object o; mixed r = o - 1;"],
    ]));

    describe("&", () => checkRows(lpc.LanguageVariant.LDMud, [
        ["ok", "mapping & mapping", "mapping a, b; mapping r = a & b;"],
        ["ok", "mapping & array", "mapping a; string *keys; mapping r = a & keys;"],
        ["ok", "array & mapping", "string *a; mapping m; string *r = a & m;"],
        ["ok", "string & string", `string s; string r = s & "abc";`],
        ["ok", "arrays with a common element type", "int *a, *b; int *r = a & b;"],
        ["ok", "a union with a mapping in it", "mapping|int a; mapping b; mapping r = a & b;"],
        ["error", "arrays with no common element type", "string *a; int *b; mixed r = a & b;"],
        ["error", "mapping & int", "mapping a; mixed r = a & 1;"],
    ]));

    describe("*", () => checkRows(lpc.LanguageVariant.LDMud, [
        ["ok", "string * int", "string s; string r = s * 3;"],
        ["ok", "int * string", "string s; string r = 3 * s;"],
        ["ok", "bytes * int", "bytes b; bytes r = b * 2;"],
        ["ok", "array * int, typed as the array", "int *a; int *r = a * 3;"],
        ["ok", "int * array", "int *a; int *r = 3 * a;"],
        ["ok", "a mixed operand, which may be a string", "mixed m; string r = m * 2;"],
        ["error", "mapping * int", "mapping a; mixed r = a * 2;"],
        ["error", "string * string", "string s; mixed r = s * s;"],
    ]));

    describe("+", () => checkRows(lpc.LanguageVariant.LDMud, [
        ["ok", "string + int", `string r = "x" + 1;`],
        ["ok", "int + string", `string r = 1 + "x";`],
        ["ok", "string + mixed", `mixed m; string r = "x" + m;`],
        ["ok", "mixed + int", "mixed m; int r = m + 1;"],
        ["ok", "arrays of different element types", "string *a; int *b; mixed *r = a + b;"],
        ["ok", "mapping + mapping", "mapping a, b; mapping r = a + b;"],
        ["ok", "a union with a mapping in it", "mapping|int a; mapping b; mapping r = a + b;"],
        ["error", "string + mapping", `mapping b; mixed r = "x" + b;`],
        ["error", "string + object", `object o; mixed r = "x" + o;`],
        ["error", "mapping + int", "mapping a; mixed r = a + 1;"],
    ]));

    describe("assignment forms (the *_assignment[] tables)", () => checkRows(lpc.LanguageVariant.LDMud, [
        ["ok", "mapping -= array", "mapping a; string *keys; a -= keys;"],
        ["ok", "mapping &= mapping", "mapping a, b; a &= b;"],
        ["ok", "int* -= mixed", "int *a; mixed m; a -= m;"],
        ["ok", "string *= int", "string s; s *= 3;"],
        ["ok", "string += int", "string s; s += 1;"],
        ["ok", "mapping += mapping", "mapping a, b; a += b;"],
        ["ok", "string* += string*", "string *a, *b; a += b;"],
        ["ok", "int -= int", "int x, a, b; x -= 1; x -= a - b;"],
        ["ok", "float -= int, float *= float", "float x; x -= 1; x *= 2.5;"],
        ["ok", "mixed -= int", "mixed x; x -= 3;"],
        ["error", "int -= float", "int x; x -= 1.5;"],
        ["error", "int *= float", "int x; x *= 2.5;"],
        ["error", "int += float", "int x; x += 2.5;"],
        ["error", "int *= string", `int x; x *= "ab";`],
        ["error", "string -= int", "string s; s -= 1;"],
        // This checker's element check, which is stricter than the driver here.
        ["error", "string* += an array with an int in it", `string *a; a += ({ "f", 123 });`],
    ]));

    it("types the result by the matching entry", () => {
        expect(errors("mapping a, b; int r = a - b;", lpc.LanguageVariant.LDMud)).toEqual(["Type 'mapping' is not assignable to type 'int'."]);
        expect(errors("string s; int r = s * 2;", lpc.LanguageVariant.LDMud)).toEqual(["Type 'string' is not assignable to type 'int'."]);
    });

    it("names the operand types in the error, without literals", () => {
        expect(errors("mapping a; mixed r = a - 1;", lpc.LanguageVariant.LDMud)).toEqual(["Operator '-' cannot be applied to types 'mapping' and 'int'."]);
        expect(errors("int x; x -= 1.5;", lpc.LanguageVariant.LDMud)).toEqual(["Operator '-=' cannot be applied to types 'int' and 'float'."]);
        expect(errors(`mapping b; mixed r = "x" + b;`, lpc.LanguageVariant.LDMud)).toEqual(["Operator '+' cannot be applied to types 'string' and 'mapping'."]);
    });
});

describe("FluffOS operand types (grammar.y)", () => {
    describe("-", () => checkRows(lpc.LanguageVariant.FluffOS, [
        ["ok", "arrays", "int *a, *b; int *r = a - b;"],
        ["ok", "arrays of different element types", "string *a; int *b; mixed r = a - b;"],
        ["ok", "an array and mixed", "int *a; mixed m; int *r = a - m; int *s = m - a;"],
        ["ok", "numbers", "float a; float r = a - 1; mixed m; int s = m - 1;"],
        ["error", "mapping - mapping", "mapping a, b; mixed r = a - b;"],
        ["error", "mapping - array", "mapping a; string *keys; mixed r = a - keys;"],
        ["error", "string - string", `string s; mixed r = s - "a";`],
        ["error", "array - int", "int *a; mixed r = a - 1;"],
        ["error", "int - array", "int *a; mixed r = 1 - a;"],
        ["error", "object - int", "object o; mixed r = o - 1;"],
        ["error", "mixed - string", `mixed m; mixed r = m - "a";`],
    ]));

    describe("&", () => checkRows(lpc.LanguageVariant.FluffOS, [
        ["ok", "int & int", "int a, b; int r = a & b;"],
        ["ok", "arrays", "int *a, *b; int *r = a & b;"],
        ["ok", "arrays of different element types", "string *a; int *b; mixed r = a & b;"],
        ["ok", "an array and mixed", "int *a; mixed m; mixed r = a & m;"],
        ["error", "mapping & mapping", "mapping a, b; mixed r = a & b;"],
        ["error", "array & int", "int *a; mixed r = a & 1;"],
        ["error", "float & int", "float f; mixed r = f & 1;"],
        ["error", "object & int", "object o; mixed r = o & 1;"],
        ["error", "mixed & string", `mixed m; mixed r = m & "a";`],
    ]));

    describe("*", () => checkRows(lpc.LanguageVariant.FluffOS, [
        ["ok", "numbers", "int a, b; int r = a * b; float x; float y = x * a;"],
        ["ok", "mapping * mapping (composition)", "mapping a, b; mapping r = a * b;"],
        ["ok", "a mapping and mixed", "mixed m; mapping b; mapping r = m * b; mapping s = b * m;"],
        ["error", "array * int", "int *a; mixed r = a * 3;"],
        ["error", "int * array", "int *a; mixed r = 3 * a;"],
        ["error", "array * array", "int *a; mixed r = a * a;"],
        ["error", "mixed * array", "mixed m; int *a; mixed r = m * a;"],
        ["error", "string * int", "string s; mixed r = s * 3;"],
        ["error", "mapping * int", "mapping a; mixed r = a * 2;"],
    ]));

    describe("+", () => checkRows(lpc.LanguageVariant.FluffOS, [
        ["ok", "string + int, float or object", `object o; float f; string r = "x" + 1 + f + o;`],
        ["ok", "int, float or object + string", `object o; float f; string r = 1 + "x"; string s = f + "x"; string t = o + "x";`],
        ["ok", "arrays of different element types", "string *a; int *b; mixed r = a + b;"],
        ["ok", "mapping + mapping", "mapping a, b; mapping r = a + b;"],
        ["ok", "mixed + mapping", "mixed m; mapping b; mapping r = m + b;"],
        ["ok", "object + object (grammar.y takes any two operands of one type)", "object a, b; mixed r = a + b;"],
        ["error", "mixed + function", "mixed m; function f; mixed r = m + f;"],
        ["error", "string + mapping", `mapping b; mixed r = "x" + b;`],
        ["error", "mapping + array", "mapping a; int *b; mixed r = a + b;"],
        ["error", "object + int", "object o; mixed r = o + 1;"],
    ]));

    describe("assignment forms (compatible_types())", () => checkRows(lpc.LanguageVariant.FluffOS, [
        ["ok", "int* -= mixed", "int *a; mixed m; a -= m;"],
        ["ok", "mapping -= mapping", "mapping a, b; a -= b;"],
        ["ok", "string -= string", `string s; s -= "a";`],
        ["ok", "string += int, object", "string s; object o; s += 1; s += o;"],
        ["ok", "numbers", "int a; a -= 2; a &= 2; float b; b *= 2;"],
        ["ok", "mapping += mapping", "mapping a, b; a += b;"],
        ["error", "int* *= int", "int *a; a *= 2;"],
        ["error", "mapping -= array", "mapping a; string *keys; a -= keys;"],
        ["error", "string *= int", "string s; s *= 2;"],
        ["ok", "any array literal, which FluffOS types as mixed*", `string *a; a -= ({ 123 }); a -= ({ "f", 123 });`],
        ["error", "string* -= int*", "string *a; int *b; a -= b;"],
        ["error", "int* += int", "int *a; a += 1;"],
    ]));

    it("names the operand types in the error", () => {
        expect(errors("mapping a; mixed r = a - 1;", lpc.LanguageVariant.FluffOS)).toEqual(["Operator '-' cannot be applied to types 'mapping' and 'int'."]);
        expect(errors("int *a; mixed r = a * 3;", lpc.LanguageVariant.FluffOS)).toEqual(["Operator '*' cannot be applied to types 'int*' and 'int'."]);
    });

    it("words the general operand error in LPC types", () => {
        expect(errors("int a; mixed r = a << 1.5;", lpc.LanguageVariant.FluffOS)).toEqual([]);
        expect(errors(`string s; mixed r = s << 1;`, lpc.LanguageVariant.FluffOS)).toEqual([
            "The left-hand side of an arithmetic operation must be of type 'int', 'float', 'mixed' or an array.",
        ]);
    });
});
