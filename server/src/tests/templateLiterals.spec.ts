import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";

/**
 * Tests for FluffOS template literals: backtick-delimited strings with `${expr}`
 * interpolation that evaluate to `string`, e.g. `` `Hello ${name}!` ``.
 *
 * Covers scanning, parsing (AST shape), adjacency concatenation, escapes, and
 * type inference through the checker.
 */

function parse(source: string): lpc.SourceFile {
    return lpc.createSourceFile(
        "test.c",
        source,
        lpc.ScriptTarget.Latest,
        /*setParentNodes*/ true,
        lpc.ScriptKind.LPC,
        lpc.LanguageVariant.FluffOS,
    );
}

function collect<T extends lpc.Node>(root: lpc.Node, kind: lpc.SyntaxKind): T[] {
    const out: T[] = [];
    const walk = (n: lpc.Node): void => {
        if (n.kind === kind) out.push(n as T);
        lpc.forEachChild(n, walk);
    };
    walk(root);
    return out;
}

describe("Template literals", () => {
    describe("scanning & parsing", () => {
        it("parses a backtick string with no interpolation without errors", () => {
            const sf = parse("string x = `hello world`;");
            expect(sf.parseDiagnostics.length).toBe(0);
            // A no-substitution template collapses to a plain StringLiteral node.
            expect(collect(sf, lpc.SyntaxKind.TemplateExpression).length).toBe(0);
        });

        it("does NOT flag a backtick as an invalid character (no red squiggle)", () => {
            const sf = parse("string x = `a${1}b`;");
            // 1127 === Diagnostics.Invalid_character
            expect(sf.parseDiagnostics.some(d => d.code === 1127)).toBe(false);
            expect(sf.parseDiagnostics.length).toBe(0);
        });

        it("builds a TemplateExpression with head, span expression, and tail literal", () => {
            const sf = parse("string x = `a${count}b`;");
            const tmpls = collect<lpc.TemplateExpression>(sf, lpc.SyntaxKind.TemplateExpression);
            expect(tmpls.length).toBe(1);
            const t = tmpls[0];
            expect(t.head.text).toBe("a");
            expect(t.templateSpans.length).toBe(1);
            expect(t.templateSpans[0].expression.kind).toBe(lpc.SyntaxKind.Identifier);
            expect((t.templateSpans[0].expression as lpc.Identifier).text).toBe("count");
            expect(t.templateSpans[0].literal.text).toBe("b");
        });

        it("supports multiple interpolations", () => {
            const sf = parse('string x = `${a} and ${b}!`;');
            const t = collect<lpc.TemplateExpression>(sf, lpc.SyntaxKind.TemplateExpression)[0];
            expect(t.head.text).toBe("");
            expect(t.templateSpans.length).toBe(2);
            expect(t.templateSpans[0].literal.text).toBe(" and ");
            expect(t.templateSpans[1].literal.text).toBe("!");
        });

        it("treats literal braces around an interpolation as text", () => {
            // `{{${colour}}}` -> head "{{", one span whose tail literal is "}}"
            const sf = parse("string x = `{{${colour}}}`;");
            expect(sf.parseDiagnostics.length).toBe(0);
            const t = collect<lpc.TemplateExpression>(sf, lpc.SyntaxKind.TemplateExpression)[0];
            expect(t.head.text).toBe("{{");
            expect(t.templateSpans.length).toBe(1);
            expect(t.templateSpans[0].literal.text).toBe("}}");
        });

        it("parses interpolated call expressions", () => {
            const sf = parse('string x = `${get_object_colour("loaded")}*`;');
            expect(sf.parseDiagnostics.length).toBe(0);
            const t = collect<lpc.TemplateExpression>(sf, lpc.SyntaxKind.TemplateExpression)[0];
            expect(t.templateSpans[0].expression.kind).toBe(lpc.SyntaxKind.CallExpression);
            expect(t.templateSpans[0].literal.text).toBe("*");
        });

        it("treats a backtick as an invalid character for non-FluffOS drivers", () => {
            // Template literals are FluffOS-only; LDMud should flag the backtick.
            const sf = lpc.createSourceFile(
                "test.c",
                "string x = `a${1}b`;",
                lpc.ScriptTarget.Latest,
                /*setParentNodes*/ true,
                lpc.ScriptKind.LPC,
                lpc.LanguageVariant.LDMud,
            );
            // 1127 === Diagnostics.Invalid_character
            expect(sf.parseDiagnostics.some(d => d.code === 1127)).toBe(true);
            expect(collect(sf, lpc.SyntaxKind.TemplateExpression).length).toBe(0);
        });

        it("honors escaped backtick and escaped dollar (no interpolation)", () => {
            const sf = parse("string x = `esc \\` and \\${name}`;");
            expect(sf.parseDiagnostics.length).toBe(0);
            // \${ suppresses interpolation, so this is a no-substitution template (StringLiteral).
            expect(collect(sf, lpc.SyntaxKind.TemplateExpression).length).toBe(0);
            const strings = collect<lpc.StringLiteral>(sf, lpc.SyntaxKind.StringLiteral);
            const value = strings.map(s => s.text).find(v => v.includes("esc"));
            expect(value).toBe("esc ` and ${name}");
        });
    });

    describe("adjacency concatenation (FluffOS allows, JavaScript does not)", () => {
        function assertConcatenates(source: string) {
            const sf = parse(source);
            expect(sf.parseDiagnostics.length).toBe(0);
            // Adjacent literals fold into a binary '+' concatenation.
            expect(collect(sf, lpc.SyntaxKind.BinaryExpression).length).toBeGreaterThan(0);
        }

        it("template adjacent to template", () => assertConcatenates("string x = `foo` `bar`;"));
        it("string adjacent to template", () => assertConcatenates('string x = "hi " `${name}!`;'));
        it("template adjacent to string", () => assertConcatenates('string x = `${name}: ` "done";'));
        it("interpolated template adjacent to interpolated template", () =>
            assertConcatenates("string x = `${a}` `${b}`;"));
    });

    describe("type inference", () => {
        const root = process.cwd();

        function checkSource(source: string) {
            // Use the compiler's canonical (forward-slash) path form so the in-memory
            // file resolves on Windows too, where path.join would produce backslashes.
            const virtualFile = lpc.normalizeSlashes(path.join(root, "server/src/tests/cases/compiler/__templateLiteralProbe.c"));
            const isVirtual = (fn: string) => !!fn && lpc.normalizeSlashes(fn) === virtualFile;
            const compilerOptions: lpc.CompilerOptions = {
                driverType: lpc.LanguageVariant.FluffOS,
                diagnostics: true,
            };
            const host = lpc.createCompilerHost(compilerOptions);
            const origReadFile = host.readFile;
            const origFileExists = host.fileExists;
            host.readFile = (fn: string) => (isVirtual(fn) ? source : origReadFile.call(host, fn));
            host.fileExists = (fn: string) => (isVirtual(fn) ? true : origFileExists.call(host, fn));
            host.getDefaultLibFileName = () =>
                lpc.combinePaths(root, lpc.getDefaultLibFolder(compilerOptions), lpc.getDefaultLibFileName(compilerOptions));

            const program = lpc.createProgram({
                host,
                rootNames: [virtualFile],
                options: compilerOptions,
                oldProgram: undefined,
            });
            const file = program.getSourceFile(virtualFile)!;
            const checker = program.getTypeChecker();
            return { program, file, checker };
        }

        it("infers `string` for a template expression", () => {
            const { file, checker } = checkSource("void f() { string s = `a${1}b`; }");
            const t = collect<lpc.TemplateExpression>(file, lpc.SyntaxKind.TemplateExpression)[0];
            expect(t).toBeDefined();
            expect(checker.writeType(checker.getTypeAtLocation(t))).toBe("string");
        });

        it("infers `string` return type for a function whose body returns a template", () => {
            const source = "private string get_object_colour(string kind) { return `{{${kind}}}`; }";
            const { file, checker } = checkSource(source);
            const fn = collect<lpc.FunctionDeclaration>(file, lpc.SyntaxKind.FunctionDeclaration)
                .find(f => f.name?.text === "get_object_colour")!;
            expect(fn).toBeDefined();
            const sig = checker.getSignatureFromDeclaration(fn)!;
            expect(checker.writeType(checker.getReturnTypeOfSignature(sig))).toBe("string");
        });

        it("produces no diagnostics for templates in string contexts", () => {
            const source =
                "private string wrap(string k) { return `[${k}]`; }\n" +
                "void f() { string a = `x${1}y` `z`; string b = wrap(`${a}`); }";
            const { program, file } = checkSource(source);
            const diags = [...file.parseDiagnostics, ...program.getSemanticDiagnostics(file)];
            expect(diags.length).toBe(0);
        });
    });
});
