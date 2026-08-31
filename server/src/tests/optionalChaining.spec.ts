import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService } from "./harness.js";
import * as path from "path";

/**
 * Tests for two FluffOS access features:
 *   - Mapping dot-access:  `m.key`  as sugar for  `m["key"]`.
 *   - Optional chaining:   `m?.key` / `m?.[idx]`, mapping-only, short-circuiting
 *     to undefined instead of erroring when the base isn't a mapping.
 *
 * Covers scanning/parsing (AST shape + the OptionalChain node flag), type
 * inference through the checker, read-only enforcement of optional chains, and
 * rejection of the syntax under non-FluffOS drivers.
 */

function parse(source: string, variant = lpc.LanguageVariant.FluffOS): lpc.SourceFile {
    return lpc.createSourceFile("test.c", source, lpc.ScriptTarget.Latest, /*setParentNodes*/ true, lpc.ScriptKind.LPC, variant);
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

const isOptionalChain = (n: lpc.Node) => !!(n.flags & lpc.NodeFlags.OptionalChain);

describe("Mapping dot-access & optional chaining", () => {
    describe("scanning & parsing", () => {
        it("parses `m.key` as a plain (non-optional) property access", () => {
            const sf = parse("void f() { mapping m = ([]); mixed r = m.key; }");
            expect(sf.parseDiagnostics.length).toBe(0);
            const access = collect<lpc.PropertyAccessExpression>(sf, lpc.SyntaxKind.PropertyAccessExpression);
            expect(access.length).toBe(1);
            expect(isOptionalChain(access[0])).toBe(false);
            expect((access[0].name as lpc.Identifier).text).toBe("key");
        });

        it("parses `m?.key` as an optional property access", () => {
            const sf = parse("void f() { mapping m = ([]); mixed r = m?.key; }");
            expect(sf.parseDiagnostics.length).toBe(0);
            const access = collect<lpc.PropertyAccessExpression>(sf, lpc.SyntaxKind.PropertyAccessExpression);
            expect(access.length).toBe(1);
            expect(isOptionalChain(access[0])).toBe(true);
            expect((access[0].name as lpc.Identifier).text).toBe("key");
        });

        it("parses `m?.[idx]` as an optional element access", () => {
            const sf = parse('void f() { mapping m = ([]); mixed r = m?.["k"]; }');
            expect(sf.parseDiagnostics.length).toBe(0);
            const access = collect<lpc.ElementAccessExpression>(sf, lpc.SyntaxKind.ElementAccessExpression);
            expect(access.length).toBe(1);
            expect(isOptionalChain(access[0])).toBe(true);
        });

        it("parses a nested optional chain `m?.a?.b`", () => {
            const sf = parse("void f() { mapping m = ([]); mixed r = m?.a?.b; }");
            expect(sf.parseDiagnostics.length).toBe(0);
            const access = collect<lpc.PropertyAccessExpression>(sf, lpc.SyntaxKind.PropertyAccessExpression);
            expect(access.length).toBe(2);
            expect(access.every(isOptionalChain)).toBe(true);
        });

        it("does not steal from a ternary whose branch is a float (`c ? .5 : x`)", () => {
            const sf = parse("void f() { float r = 1 ? .5 : 2.0; }");
            expect(sf.parseDiagnostics.length).toBe(0);
            expect(collect(sf, lpc.SyntaxKind.ConditionalExpression).length).toBe(1);
            // No spurious optional-chain access nodes.
            expect(collect(sf, lpc.SyntaxKind.PropertyAccessExpression).length).toBe(0);
        });

        it("does not steal from the nullish operator `??`", () => {
            const sf = parse("void f() { mixed r = 0 ?? 1; }");
            expect(sf.parseDiagnostics.length).toBe(0);
            expect(collect(sf, lpc.SyntaxKind.PropertyAccessExpression).length).toBe(0);
        });

        it("rejects the dropped `.?[idx]` spelling as a syntax error", () => {
            const sf = parse('void f() { mapping m = ([]); mixed r = m.?["k"]; }');
            expect(sf.parseDiagnostics.length).toBeGreaterThan(0);
        });
    });

    describe("type inference", () => {
        const root = process.cwd();

        function checkSource(source: string, variant = lpc.LanguageVariant.FluffOS) {
            const virtualFile = lpc.normalizeSlashes(path.join(root, "server/src/tests/cases/compiler/__optionalChainingProbe.c"));
            const isVirtual = (fn: string) => !!fn && lpc.normalizeSlashes(fn) === virtualFile;
            const compilerOptions: lpc.CompilerOptions = { driverType: variant, diagnostics: true };
            const host = lpc.createCompilerHost(compilerOptions);
            const origReadFile = host.readFile;
            const origFileExists = host.fileExists;
            host.readFile = (fn: string) => (isVirtual(fn) ? source : origReadFile.call(host, fn));
            host.fileExists = (fn: string) => (isVirtual(fn) ? true : origFileExists.call(host, fn));
            host.getDefaultLibFileName = () =>
                lpc.combinePaths(root, lpc.getDefaultLibFolder(compilerOptions), lpc.getDefaultLibFileName(compilerOptions));

            const program = lpc.createProgram({ host, rootNames: [virtualFile], options: compilerOptions, oldProgram: undefined });
            const file = program.getSourceFile(virtualFile)!;
            return { program, file, checker: program.getTypeChecker() };
        }

        function typeOfLastAccess(source: string) {
            const { file, checker } = checkSource(source);
            let access: lpc.Node | undefined;
            const walk = (n: lpc.Node) => {
                if (n.kind === lpc.SyntaxKind.PropertyAccessExpression || n.kind === lpc.SyntaxKind.ElementAccessExpression) access = n;
                lpc.forEachChild(n, walk);
            };
            walk(file);
            return checker.writeType(checker.getTypeAtLocation(access!));
        }

        it("infers `mixed` for mapping dot-access", () => {
            expect(typeOfLastAccess("void f() { mapping m = ([]); mixed r = m.key; }")).toBe("mixed");
        });

        it("infers `mixed` for optional member and index access", () => {
            expect(typeOfLastAccess("void f() { mapping m = ([]); mixed r = m?.key; }")).toBe("mixed");
            expect(typeOfLastAccess('void f() { mapping m = ([]); mixed r = m?.["k"]; }')).toBe("mixed");
        });

        it("produces no diagnostics for dot-access and optional chains on mappings", () => {
            const source =
                "void f() {\n" +
                "  mapping m = ([ \"k\": ([ \"sub\": 1 ]) ]);\n" +
                "  mixed a = m.k;\n" +
                "  mixed b = m?.k;\n" +
                "  mixed c = m?.[\"k\"];\n" +
                "  mixed d = m?.k?.sub;\n" +
                "  mixed e = m.k?.missing?.deep;\n" +
                "}";
            const { program, file } = checkSource(source);
            const diags = [...file.parseDiagnostics, ...program.getSemanticDiagnostics(file)];
            expect(diags.length).toBe(0);
        });

        it("allows writing through mapping dot-access (`m.key = x`)", () => {
            const { program, file } = checkSource("void f() { mapping m = ([]); m.key = 3; }");
            const diags = [...file.parseDiagnostics, ...program.getSemanticDiagnostics(file)];
            expect(diags.length).toBe(0);
        });

        it("forbids writing through an optional chain (`m?.key = x`)", () => {
            const { program, file } = checkSource("void f() { mapping m = ([]); m?.key = 3; }");
            const diags = [...file.parseDiagnostics, ...program.getSemanticDiagnostics(file)];
            // The left-hand side of an assignment may not be an optional property access.
            expect(diags.length).toBeGreaterThan(0);
            expect(diags.some(d => typeof d.messageText === "string" && /optional/i.test(d.messageText))).toBe(true);
        });
    });

    describe("semantic classification", () => {
        /**
         * TokenType/TokenModifier are packed as `(type + 1) << 8 | modifiers`
         * (TokenEncodingConsts), matching what the client decodes in
         * `client/src/languageFeatures/semanticTokens.ts`.
         */
        const TOKEN_TYPE_PROPERTY = 9;

        /** Classification emitted for `name`, or undefined if the server emitted none. */
        function classify(source: string, name: string, driverType = lpc.LanguageVariant.FluffOS): number | undefined {
            const { ls, fileName } = createTestLanguageService({ "test.c": source }, { driverType });
            const { spans } = ls.getEncodedSemanticClassifications(fileName, lpc.createTextSpan(0, source.length));
            // Anchor on the accessor (`.`, `?.` or `->`): a bare indexOf would find a
            // short key inside an earlier word (the "a" of "mapping", say).
            const at = new RegExp(`[.>]\\s*${name}\\b`).exec(source);
            expect(at).not.toBeNull();
            const offset = at!.index + at![0].length - name.length;
            for (let i = 0; i < spans.length; i += 3) {
                if (spans[i] === offset && spans[i + 1] === name.length) {
                    return (spans[i + 2] >> 8) - 1;
                }
            }
            return undefined;
        }

        it("classifies a mapping dot-access key as a property", () => {
            expect(classify("void f() { mapping m = ([]); mixed r = m.key; }", "key")).toBe(TOKEN_TYPE_PROPERTY);
        });

        it("classifies an optional-chain key as a property", () => {
            expect(classify("void f() { mapping m = ([]); mixed r = m?.key; }", "key")).toBe(TOKEN_TYPE_PROPERTY);
        });

        it("classifies every key of a nested optional chain", () => {
            const src = "void f() { mapping m = ([]); mixed r = m?.a?.b; }";
            expect(classify(src, "a")).toBe(TOKEN_TYPE_PROPERTY);
            expect(classify(src, "b")).toBe(TOKEN_TYPE_PROPERTY);
        });

        it("classifies every key of a plain dot chain", () => {
            // Only the root types as a mapping -- `m.a` is mixed -- so this only works
            // by walking back to the root rather than testing the immediate base.
            const src = "void f() { mapping m = ([]); mixed r = m.a.b.c; }";
            expect(classify(src, "a")).toBe(TOKEN_TYPE_PROPERTY);
            expect(classify(src, "b")).toBe(TOKEN_TYPE_PROPERTY);
            expect(classify(src, "c")).toBe(TOKEN_TYPE_PROPERTY);
        });

        it("classifies chains that mix optional and plain links", () => {
            const a = "void f() { mapping m = ([]); mixed r = m?.a.b; }";
            expect(classify(a, "b")).toBe(TOKEN_TYPE_PROPERTY);
            const b = "void f() { mapping m = ([]); mixed r = m.a?.b; }";
            expect(classify(b, "b")).toBe(TOKEN_TYPE_PROPERTY);
        });

        it("does not treat an arrow link as a mapping key", () => {
            // `->` is object member access, and a chain may mix the two.
            expect(classify("void f() { mapping m = ([]); mixed r = m.a->func; }", "func")).toBeUndefined();
        });

        it("does not classify a mapping key under LDMud, where the syntax is an error", () => {
            expect(classify("void f() { mapping m = ([]); mixed r = m.key; }", "key", lpc.LanguageVariant.LDMud)).toBeUndefined();
        });

        it("leaves a non-mapping base alone", () => {
            expect(classify("void f() { int n = 1; mixed r = n.key; }", "key")).toBeUndefined();
        });
    });

    describe("non-FluffOS rejection", () => {
        it("flags `?.` as unsupported under LDMud", () => {
            const sf = parse("void f() { mapping m = ([]); mixed r = m?.key; }", lpc.LanguageVariant.LDMud);
            expect(sf.parseDiagnostics.some(d => typeof d.messageText === "string" && /not supported in LDMud/i.test(d.messageText))).toBe(true);
        });

        it("does not silently accept mapping dot-access under LDMud", () => {
            const root = process.cwd();
            const virtualFile = lpc.normalizeSlashes(path.join(root, "server/src/tests/cases/compiler/__ldmudProbe.c"));
            const isVirtual = (fn: string) => !!fn && lpc.normalizeSlashes(fn) === virtualFile;
            const compilerOptions: lpc.CompilerOptions = { driverType: lpc.LanguageVariant.LDMud, diagnostics: true };
            const host = lpc.createCompilerHost(compilerOptions);
            const origReadFile = host.readFile;
            const origFileExists = host.fileExists;
            const source = "void f() { mapping m = ([]); mixed r = m.key; }";
            host.readFile = (fn: string) => (isVirtual(fn) ? source : origReadFile.call(host, fn));
            host.fileExists = (fn: string) => (isVirtual(fn) ? true : origFileExists.call(host, fn));
            host.getDefaultLibFileName = () =>
                lpc.combinePaths(root, lpc.getDefaultLibFolder(compilerOptions), lpc.getDefaultLibFileName(compilerOptions));
            const program = lpc.createProgram({ host, rootNames: [virtualFile], options: compilerOptions, oldProgram: undefined });
            const file = program.getSourceFile(virtualFile)!;
            const diags = [...file.parseDiagnostics, ...program.getSemanticDiagnostics(file)];
            expect(diags.length).toBeGreaterThan(0);
        });
    });
});
