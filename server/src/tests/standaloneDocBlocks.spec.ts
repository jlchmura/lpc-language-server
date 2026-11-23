import { createTestLanguageService } from "./harness.js";
import { tagsToMarkdown } from "../lpcserver/textRendering.js";
import { URI } from "vscode-uri";

/**
 * A `@file` header or a `@typedef` block describes the file or a type, not the
 * declaration that happens to come next. Attaching one to a prototype hid the
 * definition's doc: hover showed the header (or nothing) and the signature kept
 * the prototype's untyped parameters instead of the definition's narrowed ones.
 */

function hover(source: string, needle: string) {
    const { ls, fileName } = createTestLanguageService({ "test.c": source });
    const info = ls.getQuickInfoAtPosition(fileName, source.lastIndexOf(needle));
    return {
        display: info?.displayParts?.map(p => p.text).join("") ?? "",
        doc: info?.documentation?.map(p => p.text).join("") ?? "",
        tags: (info?.tags ?? []).map(t => t.name),
    };
}

const HEADER = `/**
 * @file /std/modules/commands.c
 * The header.
 *
 * @history
 * 2023-07-22 - Gesslar - Created
 */
`;

const TYPEDEF = `/**
 * A command action.
 *
 * @typedef {string | function} CommandAction
 */
`;

const DEFINITION = `/**
 * Registers a verb.
 *
 * @param {string | string*} command - The verb.
 * @param {CommandAction} action - What to do.
 */
public void add_command(mixed command, mixed action) { }

void caller() { add_command("x", "y"); }
`;

const PROTOTYPE = `public void add_command(mixed command, mixed action);
public void remove_command(mixed command);
`;

// As in the mudlib, a global sits between the prototypes and the definition. With only
// trivia between them the definition is folded into the prototype as an overload
// implementation, which is a separate matter.
const GLOBAL = `private nosave mapping commands = ([]);\n`;

describe("standalone doc blocks", () => {
    it("does not give a @file header to the first prototype", () => {
        const { display, doc, tags } = hover(`${HEADER}\n${PROTOTYPE}\n${TYPEDEF}\n${GLOBAL}\n${DEFINITION}`, "add_command(");
        expect(doc).toBe("Registers a verb.");
        expect(tags).not.toContain("file");
        expect(display).toContain("add_command(string | string* command, CommandAction action)");
    });

    it("does not give a @typedef block to the first prototype", () => {
        const { display, doc } = hover(`${HEADER}\n${TYPEDEF}\n${PROTOTYPE}\n${GLOBAL}\n${DEFINITION}`, "add_command(");
        expect(doc).toBe("Registers a verb.");
        expect(display).toContain("add_command(string | string* command, CommandAction action)");
    });

    it("still binds the @typedef when it sits above a declaration", () => {
        const { display } = hover(`${TYPEDEF}\n${PROTOTYPE}\n${GLOBAL}\n${DEFINITION}`, "add_command(");
        expect(display).toContain("CommandAction action");
    });

});

describe("one doc for a prototype and its definition", () => {
    const UNDOCUMENTED_DEFINITION = `public void add_command(mixed command, mixed action) { }

void caller() { add_command("x", "y"); }
`;

    it("takes the definition's doc and types when both are documented", () => {
        const source = `/** Proto doc. */\n${PROTOTYPE}\n${TYPEDEF}\n${GLOBAL}\n${DEFINITION}`;
        const { display, doc } = hover(source, "add_command(");
        expect(doc).toBe("Registers a verb.");
        expect(display).toContain("add_command(string | string* command, CommandAction action)");
    });

    it("falls back to the prototype's doc when the definition has none", () => {
        const source = `/** Proto doc. */\n${PROTOTYPE}\n${GLOBAL}\n${UNDOCUMENTED_DEFINITION}`;
        expect(hover(source, "add_command(").doc).toBe("Proto doc.");
    });

    it("offers one signature in signature help, not two overloads", () => {
        const source = `/** Proto doc. */\n${PROTOTYPE}\n${TYPEDEF}\n${GLOBAL}\n${DEFINITION}`;
        const { ls, fileName } = createTestLanguageService({ "test.c": source });
        const help = ls.getSignatureHelpItems(fileName, source.lastIndexOf("add_command(") + "add_command(".length, undefined);
        const docs = (help?.items ?? []).map(item => item.documentation.map(p => p.text).join(""));
        expect(docs).toEqual(["Registers a verb."]);
    });
});

describe("@history rendering", () => {
    it("keeps each entry on its own line", () => {
        const source = `/**
 * Does a thing.
 *
 * @history
 * 2023-07-22 - Gesslar - Created
 * 2026-11-16 - Gesslar - Docs and style pass
 */
void f() { }
`;
        const { ls, fileName } = createTestLanguageService({ "test.c": source });
        const info = ls.getQuickInfoAtPosition(fileName, source.indexOf("f("));
        const tags = (info?.tags ?? []).map(t => ({ name: t.name, text: t.text?.map(p => p.text).join("") }));
        const markdown = tagsToMarkdown(tags, { toResource: p => URI.file(p) });
        expect(markdown).toContain("2023-07-22 - Gesslar - Created  \n2026-11-16 - Gesslar - Docs and style pass");
    });
});
