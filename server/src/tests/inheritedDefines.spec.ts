import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * A macro belongs to the file that defines it and the files that file includes; neither driver
 * carries one across `inherit` (#479). LDMud 3.6.8 rejects a use of an inherited program's
 * macro with "Variable OTHER_DEF not declared". The checker already reported the use, but
 * completions offered the macro, because name lookup found it in the inherited program's
 * members table, which holds its defines as well as its variables.
 */
describe.each([
    ["FluffOS", lpc.LanguageVariant.FluffOS],
    ["LDMud", lpc.LanguageVariant.LDMud],
] as const)("a #define in an inherited program (%s)", (_, driverType) => {
    const files = {
        "other.c": `#define OTHER_DEF 1\nint counter;\nvoid reset_all() {}\n`,
    };

    function service(source: string) {
        return createTestLanguageService({ "test.c": source, ...files }, { driverType, diagnostics: true });
    }

    function completionsIn(source: string): string[] {
        const { ls, abs } = service(source);
        const entries = ls.getCompletionsAtPosition(abs("test.c"), source.indexOf("/*|*/"), {})?.entries ?? [];
        return entries.map(e => e.name).filter(name => /^(OTHER_|MY_|counter$|reset_all$)/.test(name)).sort();
    }

    it("is not offered as a completion in the inheriting program", () => {
        expect(completionsIn(`inherit "/other";\nvoid caller() { /*|*/ }\n`)).toEqual(["counter", "reset_all"]);
    });

    it("is not a name the inheriting program can use", () => {
        const source = `inherit "/other";\nint caller() { return OTHER_DEF; }\n`;
        const { ls, abs } = service(source);
        expect(allDiagnostics(ls, abs("test.c")).map(codeAndMessage)).toEqual(["2304: Cannot find name 'OTHER_DEF'."]);
        expect(ls.getDefinitionAtPosition(abs("test.c"), source.indexOf("OTHER_DEF")) ?? []).toEqual([]);
    });

    it("is still offered, and used, in the file that defines it", () => {
        expect(completionsIn(`#define MY_DEF 3\ninherit "/other";\nvoid caller() { /*|*/ }\n`)).toEqual(["MY_DEF", "counter", "reset_all"]);
        const { ls, abs } = service(`#define MY_DEF 3\ninherit "/other";\nint caller() { return MY_DEF; }\n`);
        expect(allDiagnostics(ls, abs("test.c")).map(codeAndMessage)).toEqual([]);
    });
});
