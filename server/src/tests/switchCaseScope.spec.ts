import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService, codeAndMessage } from "./harness.js";

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
 *
 * Each driver also rejects what the other allows, so the parser reports both: LDMud allows
 * nothing before the first label, and FluffOS allows only declarations there and none after
 * a label (outside a nested block).
 */

function service(driverType: lpc.LanguageVariant, source: string) {
    return createTestLanguageService({ "test.c": source }, { driverType, diagnostics: true });
}

function syntaxErrors(driverType: lpc.LanguageVariant, source: string): string[] {
    const { ls, abs } = service(driverType, source);
    return ls.getSyntacticDiagnostics(abs("test.c")).map(d => `${d.code} "${source.slice(d.start, d.start! + d.length!)}": ${lpc.flattenDiagnosticMessageText(d.messageText, " ")}`);
}

function diagnostics(driverType: lpc.LanguageVariant, source: string): string[] {
    const { ls, abs } = service(driverType, source);
    return ls.getSemanticDiagnostics(abs("test.c")).map(codeAndMessage);
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

    it("reports a declaration under a label once, as the syntax error, not also as a redeclaration", () => {
        const message = "FluffOS requires a switch's local variables to be declared before the first 'case', or inside a block.";
        expect(syntaxErrors(FLUFF, REDECLARED)).toEqual([
            `9059 "string temp = "A";": ${message}`,
            `9059 "string temp = "B";": ${message}`,
            `9059 "string temp = "C";": ${message}`,
        ]);
        expect(diagnostics(FLUFF, REDECLARED)).toEqual([]);

        const shadowsPreBlock = `int f(int v) {\n    switch (v) {\n        int y;\n        case 1: int y = 1; return y;\n    }\n    return 0;\n}\n`;
        expect(syntaxErrors(FLUFF, shadowsPreBlock)).toEqual([`9059 "int y = 1;": ${message}`]);
        expect(diagnostics(FLUFF, shadowsPreBlock)).toEqual([]);
    });

    it("still reports a redeclaration before the first case", () => {
        const source = `int f(int v) {\n    switch (v) {\n        int y;\n        int y;\n        case 1: return y;\n    }\n    return 0;\n}\n`;
        expect(diagnostics(FLUFF, source)).toEqual(["2451: Cannot redeclare block-scoped variable 'y'."]);
    });
});

/** A switch whose body starts with `pre` and has `body` under its only label. */
const switchWith = (pre: string, body: string) =>
    `int f(int v) {\n    switch (v) {\n        ${pre}\n        case 1: ${body}\n    }\n    return 0;\n}\n`;

describe("what each driver allows in a switch body", () => {
    const LD = lpc.LanguageVariant.LDMud;
    const FLUFF = lpc.LanguageVariant.FluffOS;

    it("LDMud: rejects anything before the first label", () => {
        expect(syntaxErrors(LD, switchWith("int y;", "return 1;"))).toEqual([`1130 "int y;": 'case' or 'default' expected.`]);
        expect(syntaxErrors(LD, switchWith("v++;", "return 1;"))).toEqual([`1130 "v++": 'case' or 'default' expected.`]);
    });

    it("LDMud: allows a declaration under a label", () => {
        expect(syntaxErrors(LD, switchWith("", "int x = 1; return x;"))).toEqual([]);
    });

    it("FluffOS: allows declarations before the first case, initializers included", () => {
        expect(syntaxErrors(FLUFF, switchWith("int y = 2, z;", "return y + z;"))).toEqual([]);
    });

    it("FluffOS: rejects any other statement before the first case", () => {
        expect(syntaxErrors(FLUFF, switchWith("int y; v++;", "return y;"))).toEqual([
            `9058 "v++": FluffOS only allows local variable declarations before the first 'case'.`,
        ]);
    });

    it("FluffOS: rejects a declaration under a case or default label", () => {
        const source = `int f(int v) {\n    switch (v) {\n        case 1: int x = 1; return x;\n        default: string s; return 0;\n    }\n    return 0;\n}\n`;
        const message = "FluffOS requires a switch's local variables to be declared before the first 'case', or inside a block.";
        expect(syntaxErrors(FLUFF, source)).toEqual([`9059 "int x = 1;": ${message}`, `9059 "string s;": ${message}`]);
    });

    it("FluffOS: allows a declaration in a block under a label", () => {
        expect(syntaxErrors(FLUFF, switchWith("", "{ int x = 1; return x; }"))).toEqual([]);
    });
});
