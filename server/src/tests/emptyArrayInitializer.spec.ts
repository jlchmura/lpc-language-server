import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService } from "./harness.js";

/**
 * `string *items = ({});` used to lose its declared element type.
 *
 * An empty array initializer starts the variable off as an *evolving* array -- one that takes
 * its element type from whatever is assigned into it later. That is right for `mixed *x = ({})`,
 * where the element type is genuinely open, but `string *x = ({})` has already said what the
 * array holds. Evolving from there let the variable drift to `mixed*`, so `x += ({ 123 })`
 * silently type-checked.
 *
 * Only the compound-assignment path was affected: a plain `x = ({ 123 })` is checked against the
 * declared type and always reported. That is why this survived -- the obvious test passes.
 */
function build(source: string) {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, {
        driverType: lpc.LanguageVariant.FluffOS,
        diagnostics: true,
    });
    return { ls, file: abs("test.c") };
}

function diagnosticsFor(source: string): string[] {
    const { ls, file } = build(source);
    return ls.getSemanticDiagnostics(file).map(d => `${d.code}: ${lpc.flattenDiagnosticMessageText(d.messageText, " ")}`);
}

function hoverAt(source: string, marker: string): string | undefined {
    const { ls, file } = build(source);
    // The kind prefix emits its own padding; collapse it so these read as what the editor shows.
    return ls.getQuickInfoAtPosition(file, source.indexOf(marker))
        ?.displayParts?.map(p => p.text).join("").replace(/\s+/g, " ").trim();
}

describe("an array declared with an empty array initializer", () => {
    it("keeps its declared element type", () => {
        expect(hoverAt(`test() {\n    string *items = ({});\n    items;\n}\n`, "items;")).toBe("(local var) string* items");
    });

    it("reports appending the wrong element type", () => {
        expect(diagnosticsFor(`test() {\n    string *items = ({});\n    items += ({ 123 });\n}\n`))
            .toEqual(["2365: Operator '+=' cannot be applied to types 'string*' and 'int*'."]);
    });

    it("accepts appending the right element type", () => {
        expect(diagnosticsFor(`test() {\n    string *items = ({});\n    items += ({ "a" });\n}\n`)).toEqual([]);
    });

    it("applies to any declared element type, not just string", () => {
        expect(diagnosticsFor(`test() {\n    int *n = ({});\n    n += ({ "a" });\n}\n`))
            .toEqual(["2365: Operator '+=' cannot be applied to types 'int*' and 'string*'."]);
        expect(diagnosticsFor(`test() {\n    object *o = ({});\n    o += ({ 1 });\n}\n`))
            .toEqual(["2365: Operator '+=' cannot be applied to types 'object*' and 'int*'."]);
    });

    it("matches how the same declaration behaves without the empty initializer", () => {
        // These two always worked; they are here so the three forms cannot drift apart again.
        const expected = ["2365: Operator '+=' cannot be applied to types 'string*' and 'int*'."];
        expect(diagnosticsFor(`test() {\n    string *items;\n    items += ({ 123 });\n}\n`)).toEqual(expected);
        expect(diagnosticsFor(`test() {\n    string *items = ({ "a" });\n    items += ({ 123 });\n}\n`)).toEqual(expected);
    });

    it("still reports a direct assignment of the wrong array type", () => {
        expect(diagnosticsFor(`test() {\n    string *items = ({});\n    items = ({ 123 });\n}\n`).join(" "))
            .toContain("2322: Type 'int*' is not assignable to type 'string*'.");
    });

    it("iterates as the declared element type", () => {
        expect(hoverAt(`test() {\n    string *s = ({});\n    foreach(string x in s) { x; }\n}\n`, "x in s")).toBe("(local var) string x");
    });
});

describe("arrays whose element type is genuinely open still evolve", () => {
    it("leaves mixed* alone", () => {
        // `mixed` says nothing about the contents, so the evolving-array path still applies and
        // appending is not an error.
        expect(diagnosticsFor(`test() {\n    mixed *m = ({});\n    m += ({ 123 });\n}\n`)).toEqual([]);
    });

    it("still narrows an array variable to a more specific assigned type", () => {
        // lpc-language-server#190: the branch this fix sits inside exists so that assigning a
        // narrower array type to a declared array narrows the reference. Only the empty-literal
        // short circuit changed; this must keep working.
        const source = `test() {\n    object *w;\n    w = get_weaps();\n    w;\n}\nobject *get_weaps() { return ({ }); }\n`;
        expect(hoverAt(source, "w;\n}")).toBe("(local var) object* w");
    });
});
