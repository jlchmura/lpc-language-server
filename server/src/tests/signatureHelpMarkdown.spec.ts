import { URI } from "vscode-uri";
import { createTestLanguageService } from "./harness.js";
import { SignatureHelp } from "../lpcserver/typeConverters.js";

/**
 * Signature help sent its documentation as a plain string, which the editor shows verbatim:
 * `*@public*` and backticks came through literally and the comment's line breaks were kept.
 * A parameter's doc also kept the `-` that separates an @param's name from its text.
 */

const source = `/**
 * Sends a message to the room, with message class
 * \`tell_room\` unless another is given.
 *
 * @public
 * @param {string} msg - The message
 */
void tell(string msg) { }
void c() { tell(); }
`;

function converted() {
    const { ls, fileName } = createTestLanguageService({ "test.c": source });
    const help = ls.getSignatureHelpItems(fileName, source.lastIndexOf("tell(") + "tell(".length, undefined)!;
    // The session's protocol form flattens display parts to text the same way for tags.
    const item = help.items[0];
    const protocolItem = {
        ...item,
        tags: item.tags.map(t => ({ name: t.name, text: t.text?.map(p => p.text).join("") })),
    };
    return SignatureHelp.convertSignature(protocolItem as any, URI.file("/"));
}

describe("signature help documentation", () => {
    it("is sent as markdown", () => {
        const { documentation } = converted();
        expect(documentation).toEqual({ kind: "markdown", value: expect.stringContaining("`tell_room`") });
        expect((documentation as { value: string }).value).toContain("*@public*");
    });

    it("sends a parameter's doc as markdown without the @param separator", () => {
        expect(converted().parameters[0].documentation).toEqual({ kind: "markdown", value: "The message" });
    });
});
