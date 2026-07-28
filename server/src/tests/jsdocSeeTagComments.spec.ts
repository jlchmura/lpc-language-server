import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService } from "./harness.js";

function getTag(quickInfo: lpc.QuickInfo | undefined, name: string): string | undefined {
    const tag = quickInfo?.tags?.find(t => t.name === name);
    return tag?.text?.map(p => p.text).join("");
}

function getTags(quickInfo: lpc.QuickInfo | undefined, name: string): (string | undefined)[] {
    return (quickInfo?.tags ?? [])
        .filter(t => t.name === name)
        .map(t => t.text?.map(p => p.text).join(""));
}

// A tag body parsed with the regular (trivia-skipping) scanner — e.g. a @see
// name reference — consumes the newline after it, so the next doc line's
// margin `*` used to be recorded as the tag's comment text: hovers rendered
// "@see — other_func *".
describe("JSDoc tag comments vs margin asterisks", () => {
    it("@see followed by more tag lines has no stray asterisk", () => {
        const source = `/**
 * Does a thing.
 *
 * @see other_func
 * @see third_func
 * @example
 * do_thing();
 */
void do_thing() {
}
`;
        const { ls, fileName } = createTestLanguageService({ "test.c": source });
        const pos = source.indexOf("void do_thing") + "void ".length;
        const quickInfo = ls.getQuickInfoAtPosition(fileName, pos);

        expect(getTags(quickInfo, "see")).toEqual(["other_func", "third_func"]);
        expect(getTag(quickInfo, "example")).toBe("do_thing();");
    });

    it("@see continuation line keeps its text without the margin asterisk", () => {
        const source = `/**
 * @see other_func
 * for details
 */
void do_thing() {
}
`;
        const { ls, fileName } = createTestLanguageService({ "test.c": source });
        const pos = source.indexOf("do_thing()");
        const quickInfo = ls.getQuickInfoAtPosition(fileName, pos);

        expect(getTag(quickInfo, "see")).toContain("for details");
        expect(getTag(quickInfo, "see")).not.toContain("*");
    });

    it("description-less @param followed by another line has no stray asterisk", () => {
        const source = `/**
 * @param {int} x
 * @see other_func
 */
void do_thing(int x) {
}
`;
        const { ls, fileName } = createTestLanguageService({ "test.c": source });
        const pos = source.indexOf("do_thing(int");
        const quickInfo = ls.getQuickInfoAtPosition(fileName, pos);

        expect(getTag(quickInfo, "param")).not.toContain("*");
        expect(getTag(quickInfo, "see")).toBe("other_func");
    });

    it("a genuine mid-line asterisk in a tag comment is preserved", () => {
        const source = `/**
 * @returns {int} the product a * b
 */
int mul(int a, int b) {
    return a * b;
}
`;
        const { ls, fileName } = createTestLanguageService({ "test.c": source });
        const pos = source.indexOf("mul(int");
        const quickInfo = ls.getQuickInfoAtPosition(fileName, pos);

        expect(getTag(quickInfo, "returns")).toBe("the product a * b");
    });
});
