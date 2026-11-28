import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, createTestLanguageService } from "./harness.js";

/**
 * `in` as a name (#225).
 * - FluffOS reserves it (lexer_utils.cc reswords[]).
 * - LDMud built with `--enable-keyword-in` reserves it too; `driver.keywordIn` says so.
 * - Otherwise LDMud reads it as a name, and under `#pragma warn_deprecated` (on by default)
 *   warns once per program, at the first one (prolang.y check_identifier).
 * The `in` of `foreach (x in arr)` is the keyword, and is never reported.
 */
const usesInAsName = `int in;\nint f(int in) { return in; }\n`;
const IN_DEPRECATED = 9088;
const IN_RESERVED = 9089;

function diagnosticsFor(source: string, options: Partial<lpc.CompilerOptions>) {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, { diagnostics: true, ...options });
    return allDiagnostics(ls, abs("test.c")).map(d => ({
        code: d.code,
        category: lpc.DiagnosticCategory[d.category],
        text: source.substring(d.start!, d.start! + d.length!),
        line: source.substring(0, d.start!).split("\n").length,
    }));
}

describe.each(["strict", "driver"] as const)("`in` as a name (%s mode)", typeChecking => {
    const ldmud = { driverType: lpc.LanguageVariant.LDMud, typeChecking };
    const fluffos = { driverType: lpc.LanguageVariant.FluffOS, typeChecking };

    it("LDMud warns once, at the first one", () => {
        expect(diagnosticsFor(usesInAsName, ldmud)).toEqual([
            { code: IN_DEPRECATED, category: "Warning", text: "in", line: 1 },
        ]);
    });

    it("LDMud does not warn under #pragma no_warn_deprecated", () => {
        expect(diagnosticsFor(`#pragma no_warn_deprecated\n${usesInAsName}`, ldmud)).toEqual([]);
    });

    it("LDMud warns at the first one after #pragma warn_deprecated turns the warning back on", () => {
        const source = `#pragma no_warn_deprecated\nint in;\n#pragma warn_deprecated\nint f(int in) { return in; }\n`;
        expect(diagnosticsFor(source, ldmud)).toEqual([
            { code: IN_DEPRECATED, category: "Warning", text: "in", line: 4 },
        ]);
    });

    it("LDMud built with --enable-keyword-in rejects every one", () => {
        expect(diagnosticsFor(usesInAsName, { ...ldmud, driverKeywordIn: true })).toEqual([
            { code: IN_RESERVED, category: "Error", text: "in", line: 1 },
            { code: IN_RESERVED, category: "Error", text: "in", line: 2 },
            { code: IN_RESERVED, category: "Error", text: "in", line: 2 },
        ]);
    });

    it("FluffOS rejects every one", () => {
        expect(diagnosticsFor(usesInAsName, fluffos)).toEqual([
            { code: IN_RESERVED, category: "Error", text: "in", line: 1 },
            { code: IN_RESERVED, category: "Error", text: "in", line: 2 },
            { code: IN_RESERVED, category: "Error", text: "in", line: 2 },
        ]);
    });

    // The parser reads the type of a cast in a lookahead before it parses the cast for real.
    it("reports a struct name in a cast once (LDMud with keywordIn)", () => {
        const source = `struct in { int a; };\nvoid f(mixed x) { mixed y = (struct in)x; }\n`;
        expect(diagnosticsFor(source, { ...ldmud, driverKeywordIn: true })).toEqual([
            { code: IN_RESERVED, category: "Error", text: "in", line: 1 },
            { code: IN_RESERVED, category: "Error", text: "in", line: 2 },
        ]);
    });

    it("reports a class name in a cast once (FluffOS)", () => {
        const source = `class in { int a; }\nvoid f(mixed x) { mixed y = (class in)x; }\n`;
        expect(diagnosticsFor(source, fluffos)).toEqual([
            { code: IN_RESERVED, category: "Error", text: "in", line: 1 },
            { code: IN_RESERVED, category: "Error", text: "in", line: 2 },
        ]);
    });

    it.each([
        ["LDMud", ldmud],
        ["LDMud with keywordIn", { ...ldmud, driverKeywordIn: true }],
        ["FluffOS", fluffos],
    ])("leaves the foreach keyword alone (%s)", (_name, options) => {
        expect(diagnosticsFor(`void f(int *a) { foreach (int x in a) { } }\n`, options)).toEqual([]);
    });
});

describe("driver.keywordIn in lpc-config.json", () => {
    function parse(json: string): lpc.CompilerOptions {
        const configFile = lpc.parseJsonText("/proj/lpc-config.json", json) as lpc.LpcConfigSourceFile;
        return lpc.parseLpcSourceFileConfigFileContent(configFile, lpc.sys, "/proj", /*existingOptions*/ undefined, "/proj/lpc-config.json").options;
    }

    it("is read into the compiler options", () => {
        expect(parse(`{ "driver": { "type": "ldmud", "keywordIn": true } }`).driverKeywordIn).toBe(true);
    });

    it("is off by default", () => {
        expect(parse(`{ "driver": { "type": "ldmud" } }`).driverKeywordIn).toBe(false);
    });
});
