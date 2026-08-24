import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService } from "./harness.js";

/**
 * Hover built its display from the type alone, so a declaration's modifiers -- the half
 * that says who may call it and how -- never appeared. `private int f()` and `int f()`
 * hovered identically.
 */

function hover(source: string, needle: string): string {
    const { ls, fileName } = createTestLanguageService({ "test.c": source });
    const quickInfo = ls.getQuickInfoAtPosition(fileName, source.indexOf(needle));
    return quickInfo?.displayParts?.map(p => p.text).join("") ?? "";
}

describe("modifiers in hover", () => {
    it("shows a function's modifier", () => {
        expect(hover(`private int f();`, "f(")).toBe("function private int f()");
    });

    it("leaves an unmodified function alone", () => {
        expect(hover(`int f();`, "f(")).toBe("function int f()");
    });

    it("keeps several modifiers in the order they were written", () => {
        // Source order, not a canonical one: the declaration is echoed, not rebuilt.
        expect(hover(`private nomask int f();`, "f(")).toBe("function private nomask int f()");
        expect(hover(`nomask private int f();`, "f(")).toBe("function nomask private int f()");
    });

    it("shows modifiers at a call site, not just the declaration", () => {
        expect(hover(`private int f();\nvoid h() { f(); }`, "f();")).toBe("function private int f()");
    });

    it("shows them on a function with a body", () => {
        expect(hover(`protected string g() { return "x"; }`, "g(")).toBe("function protected string g()");
    });

    it("shows a global variable's modifiers, which live on the enclosing statement", () => {
        // `nosave int counter;` carries its modifiers on the VariableStatement, so reading
        // them off the VariableDeclaration alone finds nothing.
        expect(hover(`nosave int counter;`, "counter")).toContain("nosave");
        expect(hover(`private mapping data;`, "data")).toContain("private");
    });

    it("adds nothing for locals and parameters, which take no modifiers", () => {
        expect(hover(`void f() { int x = 1; }`, "x =")).toBe("(local var)  int x");
        expect(hover(`void f(string s) {}`, "s)")).toBe("(parameter)  string s");
    });

    it("covers every modifier the parser accepts", () => {
        for (const modifier of ["private", "protected", "public", "static", "nomask", "nosave", "varargs"]) {
            expect(hover(`${modifier} int f();`, "f(")).toBe(`function ${modifier} int f()`);
        }
    });
});
