import { flattenDiagnosticMessageText } from "./_namespaces/lpc.js";
import { createTestLanguageService } from "./harness.js";

/**
 * A user function describes the shapes it accepts with `@overload` blocks on its definition.
 * The shapes were checked against calls but not presented as shapes: a prototype in front of
 * the definition hid them (directly above it, the definition was dropped as an overload
 * implementation; further away, the prototype's bare signature took the first page), and the
 * hover listed every shape's parameters under one header.
 */

const PROTOTYPE = `public varargs void tell(string msg, mixed args...);\n`;

const DEFINITION = `/**
 * Sends a message to the room.
 *
 * @public
 * @overload
 * @param {string} msg - The message
 * @param {string} [message_class] - The message class
 *
 * @overload
 * @param {string} msg - The message
 * @param {object | object*} exclude - The objects to leave out
 * @param {string} [message_class] - The message class
 */
public varargs void tell(string msg, mixed args...) { }
`;

const LAYOUTS: Record<string, string> = {
    "definition only": DEFINITION,
    "prototype directly above": `${PROTOTYPE}\n${DEFINITION}`,
    "prototype further up": `${PROTOTYPE}\nint g;\n${DEFINITION}`,
};

function service(source: string) {
    return createTestLanguageService({ "test.c": source });
}

function signatureHelp(source: string) {
    const { ls, fileName } = service(source);
    const help = ls.getSignatureHelpItems(fileName, source.lastIndexOf("tell(") + "tell(".length, undefined);
    return {
        pages: (help?.items ?? []).map(item => item.parameters.map(p => p.displayParts.map(d => d.text).join("")).join(", ")),
        selected: help?.selectedItemIndex,
    };
}

function hover(source: string) {
    const { ls, fileName } = service(source);
    const info = ls.getQuickInfoAtPosition(fileName, source.lastIndexOf("tell("));
    return {
        display: info?.displayParts?.map(p => p.text).join("") ?? "",
        doc: info?.documentation?.map(p => p.text).join("") ?? "",
        tags: (info?.tags ?? []).map(t => `${t.name}${t.text ? " " + t.text.map(p => p.text).join("") : ""}`),
    };
}

describe("@overload shapes on a user function", () => {
    for (const [layout, declarations] of Object.entries(LAYOUTS)) {
        describe(layout, () => {
            it("pages through the shapes in signature help, and only the shapes", () => {
                const { pages } = signatureHelp(`${declarations}\nvoid c() { tell(); }\n`);
                expect(pages).toEqual([
                    "string msg, string message_class",
                    "string msg, object | object* exclude, string message_class",
                ]);
            });

            it("selects the shape the arguments fit", () => {
                expect(signatureHelp(`${declarations}\nvoid c() { tell("x", this_object()); }\n`).selected).toBe(1);
            });

            it("hovers a call as the shape it matched, with that shape's params alone", () => {
                const { display, doc, tags } = hover(`${declarations}\nvoid c() { tell("x", this_object()); }\n`);
                expect(display).toBe("function public varargs void tell(string msg, object | object* exclude, string message_class) (+1 overload)");
                expect(doc).toBe("Sends a message to the room.");
                expect(tags).toEqual([
                    "public",
                    "param {string} msg - The message",
                    "param {object | object*} exclude - The objects to leave out",
                    "param {string} [message_class] - The message class",
                ]);
            });

            it("accepts a call that fits a shape with its optional parameter left out", () => {
                const source = `${declarations}\nvoid c() { object ob; tell("x", ob); tell("x"); }\n`;
                const { ls, fileName } = service(source);
                expect(ls.getSemanticDiagnostics(fileName).map(d => d.messageText)).toEqual([]);
            });

            it("hovers each declaration's name with the whole doc", () => {
                const source = `${declarations}\nvoid c() { }\n`;
                const { ls, fileName } = service(source);
                const names = [...source.matchAll(/tell\(/g)].map(m => m.index!);
                for (const at of names) {
                    const tags = (ls.getQuickInfoAtPosition(fileName, at)?.tags ?? []).map(t => t.name);
                    expect(tags).toEqual(["public", "overload", "param", "param", "overload", "param", "param", "param"]);
                }
            });

            it("gives a shape with no @returns the declared return type", () => {
                expect(hover(`${declarations}\nvoid c() { tell("x"); }\n`).display).toContain("void tell(string msg, string message_class)");
            });
        });
    }
});

describe("a call no @overload shape fits", () => {
    it("is reported as matching no overload, naming the shape that came closest", () => {
        const source = `${DEFINITION}\nvoid c() { int n; tell("x", n); }\n`;
        const { ls, fileName } = service(source);
        const messages = ls.getSemanticDiagnostics(fileName).map(d => flattenDiagnosticMessageText(d.messageText, "\n"));
        expect(messages).toHaveLength(1);
        expect(messages[0]).toMatch(/^No overload matches this call\.\n\s*Overload \d of 2, '\(string msg, .*\)', gave the following error\.\n\s*Argument of type 'int'/);
    });
});
