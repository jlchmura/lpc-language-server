import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService } from "./harness.js";

/**
 * Type checking of the `foreach` loop variables.
 *
 * Two things have to hold:
 *
 * 1. `foreach (key, value in map)` — the comma expression assigns to both
 *    operands, so each one must be checked against its *declared* type. Reading
 *    the narrowed type instead makes a guard that pins the variable to a literal
 *    (`if(!nullp(item)) return 0;` narrows `item` to `0`) reject the loop even
 *    though foreach is about to overwrite it.
 * 2. `foreach (item in arr)` — the loop variable binds an *element* of the
 *    array, so it must be checked against the array's element type, not the
 *    array's index type.
 */
function createLanguageService(options: lpc.CompilerOptions, fileText: Record<string, string>) {
    return createTestLanguageService(fileText, options);
}

function messagesFor(source: string): string[] {
    const { ls, abs } = createLanguageService(
        { driverType: lpc.LanguageVariant.FluffOS, diagnostics: true },
        { "test.c": source },
    );
    return ls.getSemanticDiagnostics(abs("test.c"))
        .map(d => lpc.flattenDiagnosticMessageText(d.messageText, "\n"));
}

const NARROWED_KEY = `
mapping __items = ([]);
string get_item(string id) {
  mixed item, value;
  string result;

  if(!nullp(item))
    return 0;

  foreach(item, value in __items) {
    result = value;
  }
  return result;
}
`;

const NARROWED_VALUE = `
mapping __items = ([]);
string get_item(string id) {
  mixed item, value;
  string result;

  if(!nullp(value))
    return 0;

  foreach(item, value in __items) {
    result = value;
  }
  return result;
}
`;

const SINGLE_VAR = `
mapping __items = ([]);
void f() {
  mixed item;

  if(!nullp(item))
    return;

  foreach(item in __items) { }
}
`;

describe("foreach checks its loop variables against their declared and element types", () => {
    it("accepts a key narrowed to a literal by a preceding guard", () => {
        expect(messagesFor(NARROWED_KEY)).toEqual([]);
    });

    it("accepts a value narrowed to a literal by a preceding guard", () => {
        expect(messagesFor(NARROWED_VALUE)).toEqual([]);
    });

    it("accepts a single narrowed loop variable", () => {
        expect(messagesFor(SINGLE_VAR)).toEqual([]);
    });

    it("accepts a mapping loop variable over a mapping array", () => {
        expect(messagesFor(`
void f() {
  mapping m;
  mapping *ma = ({ ([]) });
  foreach(m in ma) { }
}
`)).toEqual([]);
    });

    it("accepts an int loop variable over an int array", () => {
        expect(messagesFor(`
void f() {
  int i;
  int *ia = ({ 1 });
  foreach(i in ia) { }
}
`)).toEqual([]);
    });

    it("accepts a mapping loop variable over values() of a mapping", () => {
        expect(messagesFor(`
mapping __items = ([]);
void f() {
  mapping element;
  mapping *elements = values(__items);
  foreach(element in elements) { }
}
`)).toEqual([]);
    });

    it("still rejects a loop variable incompatible with the array element type", () => {
        const msgs = messagesFor(`
void f() {
  int i;
  mapping *ma = ({ ([]) });
  foreach(i in ma) { }
}
`);
        expect(msgs.some(m => m.includes("is not compatible with type"))).toBe(true);
    });

    it("still rejects a key whose declared type is incompatible", () => {
        const msgs = messagesFor(`
void f() {
  int key;
  mixed value;
  foreach(key, value in ([ "a": "b" ])) { }
}
`);
        expect(msgs.some(m => m.includes("is not compatible with type"))).toBe(true);
    });
});
