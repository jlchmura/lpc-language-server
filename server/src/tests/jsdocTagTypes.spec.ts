import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService } from "./harness.js";
import { tagsToMarkdown, IFilePathToResourceConverter } from "../lpcserver/textRendering.js";
import { URI } from "vscode-uri";

function getTag(quickInfo: lpc.QuickInfo | undefined, name: string): string | undefined {
    const tag = quickInfo?.tags?.find(t => t.name === name);
    return tag?.text?.map(p => p.text).join("");
}

const converter: IFilePathToResourceConverter = { toResource: filepath => URI.file(filepath) };

/** Flatten LS tags the way the session does for hover (richResponse: false). */
function toProtocolTags(quickInfo: lpc.QuickInfo | undefined) {
    return (quickInfo?.tags ?? []).map(t => ({
        name: t.name,
        text: t.text?.map(p => p.text).join(""),
    }));
}

// Authored LPCDoc types were dropped from hovers: `@returns {mixed|undefined}`
// rendered as just `@returns — comment`, and `@param {mixed*} cb` as
// `@param cb — comment`. The type now travels with the tag text and the
// markdown renderer surfaces it as a code span.
describe("LPCDoc types surfaced in hover tags", () => {
    const source = `/**
 * Executes a callback.
 *
 * @param {mixed*} cb - Callback array
 * @param {...mixed} new_arg - Additional arguments to prepend
 * @returns {mixed|undefined} Result from callback execution
 * @throws {string} If the callback is malformed
 */
varargs mixed call_back(mixed *cb, mixed new_arg...) {
    return cb[0];
}
`;

    function hover() {
        const { ls, fileName } = createTestLanguageService({ "test.c": source });
        const pos = source.indexOf("call_back(mixed");
        return ls.getQuickInfoAtPosition(fileName, pos);
    }

    it("tag text carries the authored type", () => {
        const quickInfo = hover();
        expect(getTag(quickInfo, "returns")).toBe("{mixed|undefined} Result from callback execution");
        expect(getTag(quickInfo, "throws")).toBe("{string} If the callback is malformed");

        const params = (quickInfo?.tags ?? [])
            .filter(t => t.name === "param")
            .map(t => t.text?.map(p => p.text).join(""));
        expect(params).toEqual([
            "{mixed*} cb - Callback array",
            "{...mixed} new_arg - Additional arguments to prepend",
        ]);
    });

    it("markdown rendering shows the type as a code span", () => {
        const markdown = tagsToMarkdown(toProtocolTags(hover()) as any, converter);
        expect(markdown).toContain("*@param* `{mixed*}` `cb` — Callback array");
        expect(markdown).toContain("*@param* `{...mixed}` `new_arg` — Additional arguments to prepend");
        expect(markdown).toContain("*@returns* `{mixed|undefined}` — Result from callback execution");
        expect(markdown).toContain("*@throws* `{string}` — If the callback is malformed");
    });

    it("overload blocks surface their params and returns", () => {
        // The parser folds @param/@returns following an @overload into that
        // overload's JSDocSignature; they used to vanish from hovers entirely,
        // leaving two bare `@overload` lines.
        const source = `/**
 * Creates a callback structure.
 *
 * @overload
 * @param {object} ob - Target object.
 * @param {string} method - Method name.
 * @param {...mixed} [arg] - Extra arguments.
 *
 * @overload
 * @param {function} f - Function pointer.
 *
 * @returns {mixed*} Assembled callback array.
 * @see call_back
 */
mixed *assemble(mixed arg...) {
    return ({ });
}
`;
        const { ls, fileName } = createTestLanguageService({ "test.c": source });
        const pos = source.indexOf("*assemble(mixed") + 1;
        const quickInfo = ls.getQuickInfoAtPosition(fileName, pos);

        const tags = (quickInfo?.tags ?? []).map(t => ({ name: t.name, text: t.text?.map(p => p.text).join("") }));
        expect(tags).toEqual([
            { name: "overload", text: undefined },
            { name: "param", text: "{object} ob - Target object." },
            { name: "param", text: "{string} method - Method name." },
            { name: "param", text: "{...mixed} [arg] - Extra arguments." },
            { name: "overload", text: undefined },
            { name: "param", text: "{function} f - Function pointer." },
            { name: "returns", text: "{mixed*} Assembled callback array." },
            { name: "see", text: "call_back" },
        ]);

        const markdown = tagsToMarkdown(tags as any, converter);
        expect(markdown).toContain("*@param* `{...mixed}` `[arg]` — Extra arguments.");
        expect(markdown).toContain("*@returns* `{mixed*}` — Assembled callback array.");
    });

    it("typeless tags render as before", () => {
        const bare = `/**
 * @param cb - Callback array
 * @returns Result of the call
 */
mixed call_it(mixed cb) {
    return 0;
}
`;
        const { ls, fileName } = createTestLanguageService({ "test.c": bare });
        const pos = bare.indexOf("call_it(mixed");
        const quickInfo = ls.getQuickInfoAtPosition(fileName, pos);
        const markdown = tagsToMarkdown(toProtocolTags(quickInfo) as any, converter);

        expect(markdown).toContain("*@param* `cb` — Callback array");
        expect(markdown).toContain("*@returns* — Result of the call");
    });
});
