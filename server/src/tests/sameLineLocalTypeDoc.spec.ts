import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService } from "./harness.js";

/**
 * A doc comment types a local when it sits right before the declaration. Inherited from
 * TypeScript, a statement only collected doc comments that began on a new line, so the same
 * annotation written after the block's `{` on the declaration's own line was dropped and the
 * local stayed a bare `object`.
 *
 * A variable statement now also takes a doc comment that ends on the line the statement
 * starts. A comment trailing the previous statement, with the declaration on a later line,
 * still belongs to that previous line and is not picked up.
 */
function diagnosticsFor(source: string): string[] {
    const { ls, abs } = createTestLanguageService({
        "test.c": source,
        "a.c": `int is_a() { return 1; }\n`,
    }, {
        driverType: lpc.LanguageVariant.FluffOS,
        diagnostics: true,
    });
    return ls.getSemanticDiagnostics(abs("test.c"))
        .map(d => lpc.flattenDiagnosticMessageText(d.messageText, " "));
}

const typed = (prop: string) => expect.stringMatching(new RegExp(`^Property '${prop}' does not exist on type 'object ".*/a"'\\.$`));

describe("a doc comment on the same line as a local's declaration", () => {
    it("types the local after the block's opening brace", () => {
        expect(diagnosticsFor(`void f(object x) { /** @type {"a.c"} */ object tp = x; tp->is_a(); tp->nope(); }\n`))
            .toEqual([typed("nope")]);
    });

    it("types the local after a previous statement on the same line", () => {
        expect(diagnosticsFor(`void f(object x) {\n  int i = 1; /** @type {"a.c"} */ object tp = x; tp->nope();\n}\n`))
            .toEqual([typed("nope")]);
    });

    it("still types the local from its own line", () => {
        expect(diagnosticsFor(`void f(object x) {\n  /** @type {"a.c"} */\n  object tp = x;\n  tp->nope();\n}\n`))
            .toEqual([typed("nope")]);
    });

    it("does not take a comment trailing the previous line", () => {
        expect(diagnosticsFor(`void f(object x) {\n  int i = 1; /** @type {"a.c"} */\n  object tp = x;\n  tp->nope();\n}\n`))
            .toEqual(["Property 'nope' does not exist on type 'object'."]);
    });
});
