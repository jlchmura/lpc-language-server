import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService } from "./harness.js";

/**
 * In LDMud each `case` or `default` label starts a scope of its own (#415, item 5). The
 * grammar is `switch_statements: switch_label statements_block`, and `statements_block`
 * calls enter_block_scope() before its statements and leave_block_scope() after
 * (prolang.y). So this compiles, with three separate `temp`s:
 *
 *     case "a": string temp = "A"; return temp;
 *     case "b": string temp = "B"; return temp;
 *
 * and a variable declared under one label is not visible under the next, even when control
 * falls through into it.
 *
 * FluffOS is different. Its `switch_block` interleaves labels with `statement`, which does
 * not include a local declaration, so a declaration may only come before the first `case`
 * (`stmt_switch: switch_header '{' local_declarations case switch_block '}'`, grammar.y),
 * where every case shares it. FluffOS keeps the switch's single scope here.
 */

function service(driverType: lpc.LanguageVariant, source: string) {
    return createTestLanguageService({ "test.c": source }, { driverType, diagnostics: true });
}

function diagnostics(driverType: lpc.LanguageVariant, source: string): string[] {
    const { ls, abs } = service(driverType, source);
    return ls.getSemanticDiagnostics(abs("test.c")).map(d => `${d.code}: ${lpc.flattenDiagnosticMessageText(d.messageText, " ")}`);
}

const REDECLARED = `string f(string v) {
    switch (v) {
        case "a": string temp = "A"; return temp;
        case "b": string temp = "B"; return temp;
        default: string temp = "C"; return temp;
    }
    return 0;
}
`;

describe("LDMud: each case is its own scope", () => {
    const LD = lpc.LanguageVariant.LDMud;

    it("lets every case and the default declare the same name", () => {
        expect(diagnostics(LD, REDECLARED)).toEqual([]);
    });

    it("keeps a case's variable out of the next case, even on fall-through", () => {
        const source = `int f(int v) {\n    switch (v) {\n        case 1: int x = 1;\n        case 2: return x;\n    }\n    return 0;\n}\n`;
        expect(diagnostics(LD, source)).toEqual(["2304: Cannot find name 'x'."]);
    });

    it("gives stacked labels one scope, the block after the last of them", () => {
        const source = `int f(int v) {\n    switch (v) {\n        case 1:\n        case 2: int x = 1; return x;\n    }\n    return 0;\n}\n`;
        expect(diagnostics(LD, source)).toEqual([]);
    });

    it("keeps a case's variable out of the code after the switch", () => {
        const source = `int f(int v) {\n    switch (v) {\n        case 1: int x = 1; break;\n    }\n    return x;\n}\n`;
        expect(diagnostics(LD, source)).toEqual(["2304: Cannot find name 'x'."]);
    });

    it("still reports the same name declared twice under one label", () => {
        const source = `int f(int v) {\n    switch (v) {\n        case 1: int x = 1; int x = 2; return x;\n    }\n    return 0;\n}\n`;
        expect(diagnostics(LD, source)).toEqual(["2451: Cannot redeclare block-scoped variable 'x'."]);
    });

    it("finds references and definitions within the one case", () => {
        const { ls, abs } = service(LD, REDECLARED);
        const file = abs("test.c");
        const declB = REDECLARED.indexOf(`temp = "B"`);
        const useB = REDECLARED.indexOf("return temp", declB) + "return ".length;
        const references = ls.findReferences(file, declB)
            ?.flatMap(r => r.references.map(x => x.textSpan.start))
            .sort((a, b) => a - b);
        expect(references).toEqual([declB, useB]);
        expect(ls.getDefinitionAtPosition(file, useB)?.map(d => d.textSpan.start)).toEqual([declB]);
    });
});

describe("FluffOS: the switch keeps one scope", () => {
    const FLUFF = lpc.LanguageVariant.FluffOS;

    it("shares a declaration before the first case with every case", () => {
        const source = `int f(int v) {\n    switch (v) {\n        int y;\n        case 1: y = 1; return y;\n        case 2: return y;\n    }\n    return 0;\n}\n`;
        expect(diagnostics(FLUFF, source)).toEqual([]);
    });

    it("still reports the same name declared under two labels", () => {
        expect(diagnostics(FLUFF, REDECLARED)).toEqual([
            "2451: Cannot redeclare block-scoped variable 'temp'.",
            "2451: Cannot redeclare block-scoped variable 'temp'.",
        ]);
    });
});
