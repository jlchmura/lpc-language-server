import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService, allDiagnostics, codeAndMessage } from "./harness.js";

/**
 * A doc comment on a node at position 0 (the start of the file, or after nothing but
 * directive lines) was attached to it twice: at position 0 the scanner reads the same
 * comments as trailing and as leading ones, and getJSDocCommentRanges concatenates both for
 * inherits, defines and variable declarations. A second copy of an `@var` tag redeclared the
 * first (TS2451 "Cannot redeclare block-scoped variable"), as in a test file that starts
 *
 *     #include <verb.h>
 *     /** @var {"/std/vendor_inventory"} testOb *\/
 *     inherit M_TEST;
 */
const files = (test: string) => ({
    "test.c": test,
    "module.c": "nosave object testOb;\n",
    "target.c": "int is_target() { return 1; }\n",
});

function load(source: string) {
    const { ls, abs } = createTestLanguageService(files(source), { driverType: lpc.LanguageVariant.FluffOS });
    const fileName = abs("test.c");
    const errors = allDiagnostics(ls, fileName).map(codeAndMessage);
    return { ls, fileName, errors, sourceFile: ls.getProgram()!.getSourceFile(fileName)! };
}

const tag = `/**\n * @var {"/target"} testOb\n */\n`;
const use = `int f() { return testOb->is_target(); }\n`;

describe("a doc comment at the start of a file", () => {
    it.each([
        ["after the inherit", `inherit "module";\n${tag}${use}`],
        ["before the inherit", `${tag}\ninherit "module";\n${use}`],
        ["after a directive, before the inherit", `#define UNUSED 1\n${tag}\ninherit "module";\n${use}`],
    ])("applies an @var tag once: %s", (_name, source) => {
        const { ls, fileName, errors } = load(source);
        expect(errors).toEqual([]);
        const info = ls.getQuickInfoAtPosition(fileName, source.lastIndexOf("testOb"));
        expect(lpc.displayPartsToString(info?.displayParts)).toMatch(/object "\/target" testOb$/);
    });

    it.each([
        ["an inherit", `/** inherited */\ninherit "module";\n`, lpc.SyntaxKind.InheritDeclaration],
        ["a define", `/** the answer */\n#define ANSWER 42\nint x = ANSWER;\n`, lpc.SyntaxKind.DefineDirective],
    ])("is attached once to %s", (_name, source, kind) => {
        const { sourceFile } = load(source);
        const counts: number[] = [];
        lpc.forEachChildRecursively(sourceFile, node => {
            if (node.kind === kind) counts.push((node as lpc.Node & { jsDoc?: unknown[] }).jsDoc?.length ?? 0);
            return undefined;
        });
        expect(counts).toEqual([1]);
    });
});
