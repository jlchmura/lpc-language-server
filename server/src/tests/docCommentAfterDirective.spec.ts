import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";
import { createTestLanguageService } from "./harness.js";

/**
 * A doc comment on the line right after a preprocessor directive was ignored: its types were
 * missing from the hover and from checking. A directive's token takes in its own newline, so the
 * next declaration starts at the beginning of the following line, and the leading-comment scan
 * skipped every comment before the first line break as a trailing comment of the previous token.
 * Only position 0 was exempt, which is why a blank line in between worked around it.
 * https://github.com/jlchmura/lpc-language-server/issues/424
 */
const doc = `/**\n * @param {int} x - doc\n */\nvoid f(mixed x) {}\nvoid g() { f("s"); }\n`;

const cwd = lpc.normalizePath(process.cwd());

function check(prefix: string, driverType = lpc.LanguageVariant.FluffOS) {
    const source = prefix + doc;
    const { ls, abs } = createTestLanguageService({ "lib/main.c": source, "lib/inc/defs.h": "#define Q 1\n" }, {
        driverType,
        rootDir: lpc.normalizePath(path.join(cwd, "lib")),
    });
    const fileName = abs("lib/main.c");
    const quickInfo = ls.getQuickInfoAtPosition(fileName, source.indexOf("f("));
    return {
        hover: quickInfo?.displayParts?.map(p => p.text).join(""),
        errors: ls.getSemanticDiagnostics(fileName).map(d => lpc.flattenDiagnosticMessageText(d.messageText, "\n")),
    };
}

const applied = {
    hover: "function void f(int x)",
    errors: ["Argument of type 'string' is not assignable to parameter of type 'int'."],
};

describe("a doc comment directly after a preprocessor directive", () => {
    const directives: [string, string][] = [
        ["#define with a value", "#define A 1\n"],
        ["#define without a value", "#define A\n"],
        ["a function-like #define", "#define F(x) x\n"],
        ["a continued #define", "#define A 1 \\\n  + 2\n"],
        ["a #define with a trailing comment", "#define A 1 // note\n"],
        ["a #define ending in CRLF", "#define A 1\r\n"],
        ["#undef", "#undef A\n"],
        ["#pragma", "#pragma strict_types\n"],
        ["#if / #endif", "#if 1\n#endif\n"],
        ["#include", `#include "/inc/defs.h"\n`],
    ];
    for (const [name, prefix] of directives) {
        it(`applies after ${name}`, () => {
            expect(check(prefix)).toEqual(applied);
            expect(check(prefix, lpc.LanguageVariant.LDMud)).toEqual(applied);
        });
    }

    it("still applies with a blank line in between", () => {
        expect(check("#define A 1\n\n")).toEqual(applied);
    });

    it("still ignores a doc comment that trails code on the previous line", () => {
        const source = `int z; /** @param {int} x - not f's */\nvoid f(mixed x) {}\n`;
        const { ls, fileName } = createTestLanguageService({ "test.c": source });
        const quickInfo = ls.getQuickInfoAtPosition(fileName, source.indexOf("f("));
        expect(quickInfo?.displayParts?.map(p => p.text).join("")).toBe("function void f(mixed x)");
    });
});
