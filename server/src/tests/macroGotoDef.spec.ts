import { createTestLanguageService } from "./harness.js";

/**
 * Goto-definition on a *macro use* must jump to its `#define`.
 *
 * A macro invocation is replaced by its expansion during parsing, so there is no
 * `ARR` identifier node left in the tree -- the expanded nodes carry the invocation's
 * text range and a `MacroContext` flag, with the originating macro name recorded in
 * `sourceFile.nodeMacroMap`. Hover already resolves through that; goto-definition has
 * to do the same rather than relying on a plain symbol lookup.
 */
const src = `#define ARR ({ 1, 2, 3 })
#define ARRS ({ "1", "2", "3" })

test() {
    int *a = ARR;
    return a;
}
`;

const files = { "macro_pos.c": src };

describe("macro goto-definition", () => {
    // position of the `ARR` use on the `int *a = ARR;` line
    const usePos = src.indexOf("= ARR;") + 2;
    // start of the `#define ARR` line
    const defPos = src.indexOf("#define ARR");

    it("jumps to the #define for a macro use", () => {
        const { ls, abs } = createTestLanguageService(files);
        const defs = ls.getDefinitionAtPosition(abs("macro_pos.c"), usePos);

        expect(defs).toBeDefined();
        expect(defs!.length).toBeGreaterThan(0);
        expect(defs![0].fileName).toEqual(abs("macro_pos.c"));
        // the target must be the `#define ARR` line, not the other macro and not the use
        const start = defs![0].textSpan.start;
        expect(start).toBeGreaterThanOrEqual(defPos);
        expect(start).toBeLessThan(src.indexOf("#define ARRS"));
    });

    it("resolves the right macro when several are defined", () => {
        const withArrs = `${src}test2() { return ARRS; }\n`;
        const { ls, abs } = createTestLanguageService({ "macro_pos.c": withArrs });
        const pos = withArrs.indexOf("return ARRS;") + "return ".length;
        const defs = ls.getDefinitionAtPosition(abs("macro_pos.c"), pos);

        expect(defs).toBeDefined();
        expect(defs!.length).toBeGreaterThan(0);
        expect(defs![0].textSpan.start).toBeGreaterThanOrEqual(withArrs.indexOf("#define ARRS"));
    });

    it("does not return a bogus definition for an ordinary string literal", () => {
        // The StringLiteral case used to fall through into the IncludeDirective case,
        // yielding a definition built from an undefined filename (name: undefined,
        // span 0+0) for any string not inside an `#include`.
        const s = `test() {\n    string x = "hello";\n    return x;\n}\n`;
        const { ls, abs } = createTestLanguageService({ "s.c": s });
        const pos = s.indexOf(`"hello"`) + 2;
        const defs = ls.getDefinitionAtPosition(abs("s.c"), pos) ?? [];
        expect(defs.some(d => d.textSpan.start === 0 && d.textSpan.length === 0)).toBe(false);
        expect(defs.some(d => d.name === undefined)).toBe(false);
    });

    it("still resolves an #include path string to the header file", () => {
        const header = `int helper();\n`;
        const main = `#include "other.h"\n\ntest() { return helper(); }\n`;
        const { ls, abs } = createTestLanguageService({ "other.h": header, "main.c": main });
        const pos = main.indexOf(`"other.h"`) + 2;
        const defs = ls.getDefinitionAtPosition(abs("main.c"), pos) ?? [];
        expect(defs.length).toBeGreaterThan(0);
        expect(defs.some(d => d.fileName.endsWith("other.h"))).toBe(true);
    });

    it("goto-definition ON the #define resolves to the macro itself", () => {
        // VS Code only offers "show references" when goto-definition lands you where you
        // already are, so the definition site must resolve rather than return nothing.
        const { ls, abs } = createTestLanguageService(files);
        const defs = ls.getDefinitionAtPosition(abs("macro_pos.c"), defPos + "#define ".length) ?? [];
        expect(defs.length).toBeGreaterThan(0);
        expect(defs[0].name).toEqual("ARR");
        expect(defs[0].textSpan.start).toEqual(src.indexOf("ARR"));
    });

    it("find-all-references finds the #define and its uses, from either end", () => {
        const { ls, abs } = createTestLanguageService(files);
        const file = abs("macro_pos.c");
        const defNamePos = defPos + "#define ".length;
        const expected = [src.indexOf("ARR"), src.indexOf("= ARR;") + 2].sort((a, b) => a - b);

        for (const [label, pos] of [["from the #define", defNamePos], ["from a use", usePos]] as [string, number][]) {
            const refs = ls.findReferences(file, pos) ?? [];
            const starts = refs.flatMap(r => r.references.map(x => x.textSpan.start)).sort((a, b) => a - b);
            expect({ label, starts }).toEqual({ label, starts: expected });
            // spans cover exactly the `ARR` token
            expect(refs.flatMap(r => r.references).every(x => x.textSpan.length === 3)).toBe(true);
        }
    });

    it("hover on the macro use still works (control)", () => {
        const { ls, abs } = createTestLanguageService(files);
        const qi = ls.getQuickInfoAtPosition(abs("macro_pos.c"), usePos);
        expect(qi).toBeDefined();
    });
});
