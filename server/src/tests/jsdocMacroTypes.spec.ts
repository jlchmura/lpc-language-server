import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService } from "./harness.js";

function getDisplayString(quickInfo: lpc.QuickInfo | undefined): string {
    return quickInfo?.displayParts?.map(p => p.text).join("") ?? "";
}

function getTag(quickInfo: lpc.QuickInfo | undefined, name: string): string | undefined {
    const tag = quickInfo?.tags?.find(t => t.name === name);
    return tag?.text?.map(p => p.text).join("");
}

describe("JSDoc types vs preprocessor macros", () => {
    // A macro whose name collides with an LPCDoc type keyword (e.g. a mudlib's
    // `#define undefined ([])[0]`) must not be expanded inside a doc type
    // expression: the keyword wins there. Before the fix, the expansion derailed
    // the type parse and the tag comment was sliced out of the macro body ("0]"),
    // swallowing every tag that followed.
    it("keyword in a doc type is not clobbered by a same-named macro", () => {
        const source = `#define undefined ([])[0]

/**
 * Executes a previously assembled callback.
 *
 * @param {mixed*} cb - Callback array
 * @returns {mixed|undefined} Result from callback execution
 * @see valid_function
 */
mixed call_back(mixed *cb) {
    return cb[0];
}
`;
        const { ls, fileName } = createTestLanguageService({ "test.c": source });
        const pos = source.indexOf("call_back(mixed");
        const quickInfo = ls.getQuickInfoAtPosition(fileName, pos);

        expect(getTag(quickInfo, "returns")).toBe("Result from callback execution");
        // the derailed parse used to consume the rest of the comment too
        expect(getTag(quickInfo, "see")).toContain("valid_function");
    });

    it("keyword macro collision is inert in leading type position too", () => {
        // The first token after `{` is scanned while the brace is consumed;
        // make sure the JSDoc context already applies there.
        const source = `#define undefined ([])[0]

/**
 * @returns {undefined|string} Something or nothing
 */
string maybe() {
    return 0;
}
`;
        const { ls, fileName } = createTestLanguageService({ "test.c": source });
        const pos = source.indexOf("maybe()");
        const quickInfo = ls.getQuickInfoAtPosition(fileName, pos);

        expect(getTag(quickInfo, "returns")).toBe("Something or nothing");
    });

    it("macros in code still expand when a doc comment is attached", () => {
        const source = `#define undefined ([])[0]

/**
 * @returns {mixed|undefined} Something or nothing
 */
mixed maybe() {
    return undefined;
}
`;
        const { ls, fileName } = createTestLanguageService({ "test.c": source });
        const pos = source.indexOf("maybe()");
        const quickInfo = ls.getQuickInfoAtPosition(fileName, pos);

        // doc tag survives...
        expect(getTag(quickInfo, "returns")).toBe("Something or nothing");
        // ...and the body still parses: `undefined` expanded to `([])[0]`, so the
        // return expression is an element access, not a bare unresolved name
        const syntactic = ls.getSyntacticDiagnostics(fileName);
        expect(syntactic).toHaveLength(0);
    });

    // Plain-identifier macros in doc types are load-bearing: `{STD_BODY}` must
    // keep expanding to its string value so it parses as a named object type.
    it("identifier macro in a doc type still expands to a named object type", () => {
        const source = `#define STD_BODY "/std/body"

void test(/** @type {STD_BODY} */ object tp) {
    tp;
}
`;
        const { ls, fileName } = createTestLanguageService({
            "test.c": source,
            "std/body.c": "void query_name() {}\n",
        });
        const pos = source.indexOf("tp;");
        const display = getDisplayString(ls.getQuickInfoAtPosition(fileName, pos));

        expect(display).toContain('"/std/body"');
    });
});
