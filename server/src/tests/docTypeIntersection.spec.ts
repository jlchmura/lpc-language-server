import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService } from "./harness.js";

/**
 * An intersection doc type (`{int & mixed}`) printed as nothing in the hover signature:
 * `function void f( x)`. The node builder reuses the authored IntersectionType node, but the
 * printer had no case for that kind, so it emitted no text. Unions, arrays and the other doc
 * types printed fine. https://github.com/jlchmura/lpc-language-server/issues/419
 */
function hover(docTags: string, signature: string): string | undefined {
    const source = `#define STD_ROOM "/std/" "room"\n\n/**\n${docTags}\n */\n${signature} {}\n`;
    const { ls, fileName } = createTestLanguageService({ "test.c": source });
    const name = signature.match(/(\w+)\(/)![1];
    const quickInfo = ls.getQuickInfoAtPosition(fileName, source.indexOf(`${name}(`));
    return quickInfo?.displayParts?.map(p => p.text).join("").replace(/\s+/g, " ");
}

describe("intersection doc types in a hover signature", () => {
    it("prints a parameter's intersection type (#419)", () => {
        expect(hover(" * @param {int & mixed} x - doc", "void f(mixed x)"))
            .toBe("function void f(int & mixed x)");
    });

    it("prints it when the parameter has no declared type", () => {
        expect(hover(" * @param {int & string} x - doc", "void f(x)"))
            .toBe("function void f(int & string x)");
    });

    it("prints an intersection inside parentheses and inside a union", () => {
        expect(hover(" * @param {(int & string)} x - doc\n * @param {int | (int & string)} y - doc", "void f(mixed x, mixed y)"))
            .toBe("function void f((int & string) x, int | (int & string) y)");
    });

    it("folds a macro-built path inside an intersection", () => {
        expect(hover(" * @param {STD_ROOM & object} room - doc", "void f(object room)"))
            .toBe(`function void f("/std/room" & object room)`);
    });
});
