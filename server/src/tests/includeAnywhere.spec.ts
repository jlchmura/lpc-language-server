import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, codeAndMessage, createTestLanguageService, hoverText, LIB_ROOT } from "./harness.js";

/**
 * Both drivers preprocess as C does: an `#include` may start any line, and the text of the file
 * takes the place of that line (#487). So an include is a stream of tokens. It may sit in the
 * middle of an expression, hold part of a statement, or end in the middle of one.
 */

const name = (file: lpc.SourceFileBase | undefined) => file && lpc.getBaseFileName(file.fileName);
const short = (d: lpc.Diagnostic | lpc.DiagnosticRelatedInformation) => `${name(d.file)}:${d.code}`;

function service(files: Record<string, string>, driverType: lpc.LanguageVariant) {
    return createTestLanguageService(files, { driverType, diagnostics: true, rootDir: LIB_ROOT });
}

function diagnosticsFor(files: Record<string, string>, driverType: lpc.LanguageVariant, file = "lib/test.c"): string[] {
    const { ls, abs } = service(files, driverType);
    return allDiagnostics(ls, abs(file)).map(codeAndMessage);
}

function sourceFileOf(files: Record<string, string>, driverType: lpc.LanguageVariant): lpc.SourceFile {
    const { ls, abs } = service(files, driverType);
    return ls.getProgram()!.getSourceFile(abs("lib/test.c"))!;
}

const statementKinds = (statements: readonly lpc.Statement[] | undefined) => statements?.map(s => s.kind);

describe.each([
    ["LDMud", lpc.LanguageVariant.LDMud],
    ["FluffOS", lpc.LanguageVariant.FluffOS],
] as const)("an #include in the middle of an expression (%s)", (_, driverType) => {
    it("is read between the elements of an array literal", () => {
        expect(diagnosticsFor({
            "lib/test.c": `mixed *rooms = ({\n#include "/data/room_list.h"\n});\nint n = sizeof(rooms);\n`,
            "lib/data/room_list.h": `"/room/church",\n"/room/pub",\n`,
        }, driverType)).toEqual([]);
    });

    it("is read between the entries of a mapping literal", () => {
        expect(diagnosticsFor({
            "lib/test.c": `mapping prices = ([\n    "bread": 5,\n#include "/data/more_prices.h"\n]);\n`,
            "lib/data/more_prices.h": `"ale": 3,\n"wine": 9\n`,
        }, driverType)).toEqual([]);
    });

    it("is read among the arguments of a call, and after an operator", () => {
        expect(diagnosticsFor({
            "lib/test.c": `int add(int a, int b, int c) { return a + b + c; }\nint f() {\n    return add(1,\n#include "/data/args.h"\n    ) +\n#include "/data/one.h"\n    ;\n}\n`,
            "lib/data/args.h": `2, 3\n`,
            "lib/data/one.h": `1`,
        }, driverType)).toEqual([]);
    });

    it("gives the elements to the literal, typed as if they were written there", () => {
        const source = `string *names = ({ "a",\n#include "/data/names.h"\n});\nvoid f() { names; }\n`;
        const { ls, abs } = service({ "lib/test.c": source, "lib/data/names.h": `"b", "c"\n` }, driverType);
        const file = ls.getProgram()!.getSourceFile(abs("lib/test.c"))!;
        const literal = (file.statements[0] as lpc.VariableStatement).declarationList.declarations[0].initializer as lpc.ArrayLiteralExpression;
        expect(literal.elements.map(e => (e as lpc.StringLiteral).text)).toEqual(["a", "b", "c"]);
        expect(hoverText(ls, abs("lib/test.c"), source.lastIndexOf("names"), { collapse: true })).toContain("string* names");
    });

    it("sees the macros the included text defines, and the ones defined before it", () => {
        expect(diagnosticsFor({
            "lib/test.c": `#define BASE 10\nint *a = ({\n#include "/data/values.h"\n    STEP,\n});\n`,
            "lib/data/values.h": `#define STEP 2\nBASE, BASE + STEP,\n`,
        }, driverType)).toEqual([]);
    });

    it("keeps the directive out of the statements, as an include of the file", () => {
        const file = sourceFileOf({
            "lib/test.c": `int *a = ({\n#include "/data/values.h"\n});\n#include "/decl.h"\n`,
            "lib/data/values.h": `1, 2,\n`,
            "lib/decl.h": `int b;\n`,
        }, driverType);
        expect(statementKinds(file.statements)).toEqual([lpc.SyntaxKind.VariableStatement, lpc.SyntaxKind.IncludeDirective]);
        expect(file.includes!.map(i => [lpc.getBaseFileName(i.fileName), !!i.isFloating])).toEqual([["values.h", true], ["decl.h", false]]);
    });

    it("maps a node of the included text to the include file", () => {
        const file = sourceFileOf({
            "lib/test.c": `int *a = ({ 0,\n#include "/data/values.h"\n    3 });\n`,
            "lib/data/values.h": `1, 2,\n`,
        }, driverType);
        const literal = (file.statements[0] as lpc.VariableStatement).declarationList.declarations[0].initializer as lpc.ArrayLiteralExpression;
        expect(literal.elements.map(e => name(lpc.getSourceFileOrIncludeOfNode(e)))).toEqual(["test.c", "values.h", "values.h", "test.c"]);
        expect(literal.elements.map(e => lpc.getTextOfNode(e))).toEqual(["0", "1", "2", "3"]);
        expect(name(lpc.getSourceFileOrIncludeOfNode(literal))).toBe("test.c");
    });

    it("reports an error in the included text on the #include line, with the place in the file", () => {
        const { ls, abs } = service({
            "lib/test.c": `int *a = ({\n#include "/data/values.h"\n});\n`,
            "lib/data/values.h": `1, no_such_name,\n`,
        }, driverType);
        const diagnostics = ls.getSemanticDiagnostics(abs("lib/test.c"));
        expect(diagnostics.map(d => short(d) + ` [${d.relatedInformation?.map(short).join(", ")}]`)).toEqual(["test.c:9025 [values.h:2304]"]);
        expect(diagnostics[0].start).toBe(`int *a = ({\n`.length);
        expect(diagnostics[0].relatedInformation![0].start).toBe(`1, `.length);
    });

    it("reports a file that is not found", () => {
        expect(diagnosticsFor({ "lib/test.c": `int *a = ({ 1,\n#include "/data/missing.h"\n});\n` }, driverType))
            .toEqual(["9018: Cannot find include file '/data/missing.h'."]);
    });

    it("goes to the file from the path on the #include line", () => {
        const source = `int *a = ({\n#include "/data/values.h"\n});\n`;
        const { ls, abs } = service({ "lib/test.c": source, "lib/data/values.h": `1, 2,\n` }, driverType);
        const definitions = ls.getDefinitionAtPosition(abs("lib/test.c"), source.indexOf("values.h"));
        expect(definitions?.map(d => lpc.getBaseFileName(d.fileName))).toEqual(["values.h"]);
    });

    it("leaves hover and go to definition around the include on the right nodes", () => {
        const source = `int before = 1;\nint *a = ({ before,\n#include "/data/values.h"\n    before });\n`;
        const { ls, abs } = service({ "lib/test.c": source, "lib/data/values.h": `1111111111111111, 2222222222222222, 3333333333333333, 4444444444444444,\n` }, driverType);
        for (const position of [source.indexOf("before,"), source.lastIndexOf("before")]) {
            expect(hoverText(ls, abs("lib/test.c"), position, { collapse: true })).toContain("int before");
            expect(ls.getDefinitionAtPosition(abs("lib/test.c"), position)?.map(d => d.textSpan.start)).toEqual([source.indexOf("before")]);
        }
    });
});

describe.each([
    ["LDMud", lpc.LanguageVariant.LDMud],
    ["FluffOS", lpc.LanguageVariant.FluffOS],
] as const)("an #include at the start of a statement (%s)", (_, driverType) => {
    it("holds the statements of its file", () => {
        const file = sourceFileOf({
            "lib/test.c": `#include "/a.h"\nint z;\n`,
            "lib/a.h": `#include "/b.h"\nint a;\n`,
            "lib/b.h": `#define B 1\nint b;\n`,
        }, driverType);
        expect(statementKinds(file.statements)).toEqual([lpc.SyntaxKind.IncludeDirective, lpc.SyntaxKind.VariableStatement]);
        const a = file.statements[0] as lpc.IncludeDirective;
        expect(statementKinds(a.statements)).toEqual([lpc.SyntaxKind.IncludeDirective, lpc.SyntaxKind.VariableStatement]);
        expect(statementKinds((a.statements[0] as lpc.IncludeDirective).statements)).toEqual([lpc.SyntaxKind.DefineDirective, lpc.SyntaxKind.VariableStatement]);
        expect(a.endOfFileToken.kind).toBe(lpc.SyntaxKind.EndOfFileToken);
        expect(file.nodeOrigins).toBeUndefined();
    });

    it("is read as statements of a function body", () => {
        const files = {
            "lib/test.c": `int f() {\n    int total;\n#include "/body.h"\n    return total;\n}\n`,
            "lib/body.h": `total = 1;\ntotal += 2;\n`,
        };
        expect(diagnosticsFor(files, driverType)).toEqual([]);
        const body = (sourceFileOf(files, driverType).statements[0] as lpc.FunctionDeclaration).body!;
        expect(statementKinds(body.statements)).toEqual([lpc.SyntaxKind.VariableStatement, lpc.SyntaxKind.IncludeDirective, lpc.SyntaxKind.ReturnStatement]);
        expect(statementKinds((body.statements[1] as lpc.IncludeDirective).statements)).toEqual([lpc.SyntaxKind.ExpressionStatement, lpc.SyntaxKind.ExpressionStatement]);
    });

    it("may hold the start of a statement that the including file ends", () => {
        const files = {
            "lib/test.c": `#include "/head.h"\n    return n + 1;\n}\nint z = f(1);\n`,
            "lib/head.h": `int f(int n) {\n`,
        };
        expect(diagnosticsFor(files, driverType)).toEqual([]);
        const file = sourceFileOf(files, driverType);
        expect(statementKinds(file.statements)).toEqual([lpc.SyntaxKind.IncludeDirective, lpc.SyntaxKind.VariableStatement]);
        const fn = (file.statements[0] as lpc.IncludeDirective).statements[0] as lpc.FunctionDeclaration;
        expect(name(lpc.getSourceFileOrIncludeOfNode(fn.name!))).toBe("head.h");
        expect(name(lpc.getSourceFileOrIncludeOfNode(fn.body!.statements[0]))).toBe("test.c");
    });

    it("may be the body of a function whose header is in the including file", () => {
        expect(diagnosticsFor({
            "lib/test.c": `int f(int n)\n#include "/body.c"\nint z = f(1);\n`,
            "lib/body.c": `{\n    return n + 1;\n}\n`,
        }, driverType)).toEqual([]);
    });

    it("is read when a directive without a line break ends its file", () => {
        expect(diagnosticsFor({
            "lib/test.c": `#include "/a.h"\n#include "/b.h"\nint z = A + B;\n`,
            "lib/a.h": `#define A 1`,
            "lib/b.h": `#define B 2`,
        }, driverType)).toEqual([]);
    });

    it("is read when its first token is a macro", () => {
        const files = {
            "lib/test.c": `#define private public\n#include "/a.h"\n#undef private\nint z;\n`,
            "lib/a.h": `private int a;\n`,
        };
        expect(diagnosticsFor(files, driverType)).toEqual([]);
        expect(statementKinds(sourceFileOf(files, driverType).statements)).toEqual([lpc.SyntaxKind.DefineDirective, lpc.SyntaxKind.IncludeDirective, lpc.SyntaxKind.UndefDirective, lpc.SyntaxKind.VariableStatement]);
    });

    it("may stand between modifiers and their declaration", () => {
        const files = {
            "lib/test.c": `private\n\nint door,\n    lock;\n\npublic\n\n#include "/defs.h"\n\n#define HOOK 1\n\ncontrol(arg)\n{\n    return HOOK + BASE + door + lock;\n}\n`,
            "lib/defs.h": `#define BASE 2\n`,
        };
        expect(diagnosticsFor(files, driverType)).toEqual([]);
        const file = sourceFileOf(files, driverType);
        expect(statementKinds(file.statements)).toEqual([lpc.SyntaxKind.VariableStatement, lpc.SyntaxKind.IncludeDirective, lpc.SyntaxKind.DefineDirective, lpc.SyntaxKind.FunctionDeclaration]);
        const control = file.statements[3] as lpc.FunctionDeclaration;
        expect(control.modifiers?.map(m => m.kind)).toEqual([lpc.SyntaxKind.PublicKeyword]);
        expect(control.pos).toBe(files["lib/test.c"].indexOf("public") - 2);
    });

    it("gives modifiers before it to the first declaration of its file", () => {
        const files = {
            "lib/test.c": `nomask\n#include "/decl.h"\nint z = f();\n`,
            "lib/decl.h": `int f() { return 1; }\n`,
        };
        expect(diagnosticsFor(files, driverType)).toEqual([]);
        const f = (sourceFileOf(files, driverType).statements[0] as lpc.IncludeDirective).statements[0] as lpc.FunctionDeclaration;
        expect(f.modifiers?.map(m => m.kind)).toEqual([lpc.SyntaxKind.NoMaskKeyword]);
        expect(name(lpc.getSourceFileOrIncludeOfNode(f.modifiers![0]))).toBe("test.c");
        expect(name(lpc.getSourceFileOrIncludeOfNode(f.name!))).toBe("decl.h");
    });

    it("is read when stray text follows the file name", () => {
        expect(diagnosticsFor({
            "lib/test.c": `#include "/a.h";\nint z = A;\n`,
            "lib/a.h": `#define A 1\n`,
        }, driverType)).toEqual(["9008: Expected newline after directive."]);
    });

    it("ends an #if that its file left open", () => {
        expect(diagnosticsFor({
            "lib/test.c": `#include "/open.h"\nint z;\nint w = z;\n`,
            "lib/open.h": `#if 0\nint x;\n`,
        }, driverType)).toEqual([]);
    });

    it("is not read again while it is being read", () => {
        expect(diagnosticsFor({
            "lib/test.c": `#include "/a.h"\nint z = a + b;\n`,
            "lib/a.h": `#include "/b.h"\nint a;\n`,
            "lib/b.h": `#include "/a.h"\nint b;\n`,
        }, driverType)).toEqual([]);
    });
});

describe.each([
    ["LDMud", lpc.LanguageVariant.LDMud],
    ["FluffOS", lpc.LanguageVariant.FluffOS],
] as const)("the preprocessor between tokens (%s)", (_, driverType) => {
    it("takes a conditional in the middle of a declaration once", () => {
        expect(diagnosticsFor({ "lib/test.c": `#define A 1\nint\n#ifdef A\nx\n#else\ny\n#endif\n;\nint z = x;\n` }, driverType)).toEqual([]);
    });

    it("skips an inactive region by lines: nothing in it is a token", () => {
        expect(diagnosticsFor({
            "lib/test.c": `#if 0\nit's "not a string\n/* nor a comment\n#else\nint x;\n#endif\nint y = x;\n`,
        }, driverType)).toEqual([]);
    });

    it("keeps the text of a #define as it is written", () => {
        const source = `#define A   1 + /* one */ 2   // sum\n#define B "a // b"\n#define C(x) (x) \\\n    + 1\n#define EMPTY\nint a = A;\nstring b = B;\nint c = C(2) EMPTY;\n`;
        const { ls, abs } = service({ "lib/test.c": source }, driverType);
        expect(allDiagnostics(ls, abs("lib/test.c")).map(codeAndMessage).filter(d => !d.startsWith("2322"))).toEqual([]);
        const file = ls.getProgram()!.getSourceFile(abs("lib/test.c"))!;
        const bodies = file.statements.filter(lpc.isDefineDirective).map(d => source.substring(d.range.pos, d.range.end));
        expect(bodies).toEqual([`1 + /* one */ 2`, `"a // b"`, `(x) \\\n    + 1`, ``]);
    });
});
