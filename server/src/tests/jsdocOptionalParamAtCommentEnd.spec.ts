import { flattenDiagnosticMessageText } from "./_namespaces/lpc.js";
import { createTestLanguageService } from "./harness.js";

/**
 * An optional `[name]` as the last thing in an @overload or @callback block (#418).
 *
 * Those tags parse each parameter speculatively. The `]` of a bracketed name was scanned
 * past with the ordinary scanner, which skipped the newline after it; when the name ended
 * the comment, that ran off the end of the comment's text, and the stream switch there
 * released the speculation, so the parser threw "Debug Failure. False expression.".
 */
function check(doc: string, calls: string) {
    const source = `${doc}\nvoid q(mixed a, mixed b) {}\nvoid t() { ${calls} }\n`;
    const { ls, fileName } = createTestLanguageService({ "a.c": source });
    const diagnostics = [...ls.getSyntacticDiagnostics(fileName), ...ls.getSemanticDiagnostics(fileName)]
        .map(d => flattenDiagnosticMessageText(d.messageText, " "));
    const help = ls.getSignatureHelpItems(fileName, source.lastIndexOf("q(") + 2, undefined);
    const shapes = (help?.items ?? []).map(item =>
        item.parameters.map(p => p.displayParts.map(d => d.text).join("")).join(", "));
    return { diagnostics, shapes };
}

describe("an optional @param at the end of the comment", () => {
    it.each([
        ["a typed [name]", ` * @param {string} [b]`],
        ["an untyped [name]", ` * @param [b]`],
        ["a [name] with a default", ` * @param {string} [b="x"]`],
    ])("parses %s ending an @overload block", (_label, last) => {
        const doc = `/**\n * @overload\n * @param {int} a\n${last}\n */`;
        const { diagnostics, shapes } = check(doc, `q(1); q(1, "x");`);
        expect(diagnostics).toEqual([]);
        expect(shapes).toHaveLength(1);
        expect(shapes[0]).toMatch(/^int a, \w* ?b$/);
    });

    it("parses it when the comment closes on the same line", () => {
        const { diagnostics, shapes } = check(`/**\n * @overload\n * @param {int} a\n * @param {string} [b] */`, `q(1);`);
        expect(diagnostics).toEqual([]);
        expect(shapes).toEqual(["int a, string b"]);
    });

    it("keeps the next @overload block when the first one ends with [name]", () => {
        const doc = `/**\n * @overload\n * @param {int} a\n * @param {string} [b]\n * @overload\n * @param {string} a - the a\n * @param {int} [b] - the b\n */`;
        const { diagnostics, shapes } = check(doc, `q(1); q("s", 2);`);
        expect(diagnostics).toEqual([]);
        expect(shapes).toEqual(["int a, string b", "string a, int b"]);
    });

    it("parses it ending a @callback block", () => {
        const source = `/**\n * @callback cb\n * @param {string} [b]\n */\nvoid q(mixed b) {}\n`;
        const { ls, fileName } = createTestLanguageService({ "a.c": source });
        expect(() => ls.getSemanticDiagnostics(fileName)).not.toThrow();
    });
});
