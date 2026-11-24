import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService, hoverText, message } from "./harness.js";

/**
 * Resolving a mapping type's declared members stored an empty member table on the shared
 * `mapping` type itself. Whichever came first won: once something reached it through a
 * `mapping<K, V>` reference -- `([])[0]` does, and Oxidus spells `null` that way -- the bare
 * `mapping` had no members, every array was assignable to it, and `if (mapp(v)) return;`
 * narrowed a `mixed*` to `never`. A `foreach` over that `never` then hit a report with no
 * message and threw, taking the whole check down.
 */

const NARROWING = `void f(mixed value) {
  if(!pointerp(value)) return;
  if(mapp(value)) return;
  value/*X*/;
}
`;

function typeAfterFullCheck(source: string) {
    const { ls, fileName } = createTestLanguageService({ "test.c": source });
    // Check the whole file first, as the CLI and the editor's diagnostics do: the order is
    // what decided which resolution of `mapping` stuck.
    ls.getSemanticDiagnostics(fileName);
    return hoverText(ls, fileName, source.indexOf("value/*X*/"));
}

describe("the mapping type's members don't depend on check order", () => {
    it("narrows an array past a mapp() guard", () => {
        expect(typeAfterFullCheck(NARROWING)).toBe("(parameter)  mixed* value");
    });

    it("narrows the same after ([])[0] was checked first", () => {
        expect(typeAfterFullCheck(`string p = ([])[0];\n${NARROWING}`)).toBe("(parameter)  mixed* value");
    });
});

describe("a foreach over never", () => {
    it("is not reported and does not throw", () => {
        const source = `void f(mixed v) {\n  if(!intp(v)) return;\n  if(intp(v)) return;\n  foreach(mixed x in v) { x; }\n}\n`;
        const { ls, fileName } = createTestLanguageService({ "test.c": source });
        const messages = ls.getSemanticDiagnostics(fileName).map(message);
        expect(messages).toEqual([]);
    });
});
