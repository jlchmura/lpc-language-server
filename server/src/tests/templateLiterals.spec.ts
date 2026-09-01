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

        it("reports invalid escapes in template head/middle/tail, consistent with strings", () => {
            // \8 is an invalid escape; it should be flagged wherever it appears in a template.
            expect(parse("string x = `bad \\8`;").parseDiagnostics.length).toBeGreaterThan(0); // no-substitution head
            expect(parse("string x = `bad \\8 ${y}`;").parseDiagnostics.length).toBeGreaterThan(0); // head before interp
            expect(parse("string x = `${y} bad \\8`;").parseDiagnostics.length).toBeGreaterThan(0); // tail
            // ...but valid template escapes remain clean.
            expect(parse("string x = `ok \\` \\$ ${y}`;").parseDiagnostics.length).toBe(0);
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

    describe("inside an inactive preprocessor region", () => {
        /**
         * A template in disabled code still has to be *scanned* as a template even though
         * every token is thrown away. In executable code the parser drives the continuation,
         * re-scanning the `}` that ends each substitution (parseTemplateSpan); the skip loop
         * that discards disabled tokens had nothing driving it. The `}` came back as a plain
         * close brace, so the closing backtick opened a fresh template head that ran to end
         * of file -- swallowing the `#endif` and cascading into unrelated-looking errors
         * (unmatched conditional, unterminated string, "invalid character" on each `\` in
         * the swallowed region, and bogus checker errors from the wrecked parse).
         *
         * A backtick with no interpolation was never affected: it scans as a single
         * NoSubstitutionTemplateLiteral, so there is no `}` to re-scan.
         */
        it("does not run past the #endif", () => {
            const sf = parse("void f() {\n  int x = 1;\n#if 0\n  y(`val ${x}`);\n#endif\n}");
            expect(sf.parseDiagnostics.length).toBe(0);
        });

        it("was already fine without interpolation, and still is", () => {
            expect(parse("void f() {\n#if 0\n  y(`val`);\n#endif\n}").parseDiagnostics.length).toBe(0);
            expect(parse('void f() {\n#if 0\n  y("val\\n");\n#endif\n}').parseDiagnostics.length).toBe(0);
        });

        it("handles several substitutions and nested templates", () => {
            expect(parse("void f() {\n#if 0\n  y(`a${x}b${x}c`);\n#endif\n}").parseDiagnostics.length).toBe(0);
            expect(parse("void f() {\n#if 0\n  y(`a${ `i${x}` }b`);\n#endif\n}").parseDiagnostics.length).toBe(0);
        });

        it("counts `({` so an array literal's brace is not read as the substitution's", () => {
            // `({` is a single token but closes with a plain `}` followed by `)`. Left
            // uncounted, that `}` matches the substitution's depth and ends the template early.
            expect(parse("void f() {\n#if 0\n  y(`a${ ({1,2})[0] }b`);\n#endif\n}").parseDiagnostics.length).toBe(0);
            expect(parse("void f() {\n#if 0\n  { y(`a${x}b`); }\n#endif\n}").parseDiagnostics.length).toBe(0);
        });

        it("leaves the region's own escapes alone", () => {
            expect(parse("void f() {\n#if 0\n  y(`a${x}\\n`);\n#endif\n}").parseDiagnostics.some(d => d.code === 1127)).toBe(false);
        });

        it("still sees the directives that follow", () => {
            expect(parse("void f() {\n#if 0\n  y(`a${x}`);\n#else\n  x = 2;\n#endif\n}").parseDiagnostics.length).toBe(0);
            expect(parse("void f() {\n#if 0\n  y(`a${x}`);\n#if 1\n  x = 1;\n#endif\n#endif\n}").parseDiagnostics.length).toBe(0);
        });

        it("reports a genuinely unterminated template the same way a plain string is", () => {
            // Unchanged behaviour: malformed literals in disabled code still report, and a
            // template now matches what an unterminated `"` there has always done.
            const tmpl = parse("void f() {\n#if 0\n  y(`a${x});\n#endif\n}").parseDiagnostics.map(d => d.code).sort();
            const str = parse('void f() {\n#if 0\n  y("abc);\n#endif\n}').parseDiagnostics.map(d => d.code).sort();
            expect(tmpl).toEqual(str);
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
