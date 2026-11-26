import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService, allDiagnostics, codeAndMessage, DRIVERS } from "./harness.js";

/**
 * LDMud syntax forms the parser rejected, found by running the server over a whole LDMud 3.6
 * mudlib and checking each report against the driver. "expressions in both drivers" covers the ones
 * FluffOS's grammar accepts the same way, so those run for both.
 */
function diagnosticsFor(files: Record<string, string>, main = "test.c", driverType = lpc.LanguageVariant.LDMud): string[] {
    const { ls, abs } = createTestLanguageService(files, {
        driverType,
        diagnostics: true,
    });
    return allDiagnostics(ls, abs(main)).map(codeAndMessage);
}

const one = (source: string) => diagnosticsFor({ "test.c": source });

describe("LDMud inline closure bodies", () => {
    it("accepts ';'-separated expressions", () => {
        expect(one(`int seen; void note(string s) { seen++; }
int f() { return funcall((: note("x"); 5 :)); }`)).toEqual([]);
    });

    it("accepts a trailing ';'", () => {
        expect(one(`void note(string s) {} void f() { funcall((: note("x"); :)); }`)).toEqual([]);
    });

    it("accepts statements after an expression", () => {
        expect(one(`void note(string s) {} mixed f() { return map(({ "a" }), (: note($1); return sizeof($1); :)); }`)).toEqual([]);
    });

    // The body is prolang.y's `statements inline_comma_expr`: a statement keeps its ';' even
    // right before the ':)'. LDMud 3.6.7 rejects all three with a syntax error.
    it("requires a statement's ';' before ':)'", () => {
        expect(one(`void note(string s) {} mixed f() { return map(({ "a" }), (: note($1); return sizeof($1) :)); }`)).toEqual(["1005: ';' expected."]);
        expect(one(`mixed f() { return map(({ 1 }), (: int i = $1 :)); }`)).toEqual(["1005: ';' expected."]);
        expect(one(`mixed f() { return map(({ 1 }), (: int i = $1; return i :)); }`)).toEqual(["1005: ';' expected."]);
    });

    describe("a last expression with no ';' is the closure's value (#451)", () => {
        it.each([
            ["after a declaration", `(: int i = $1; i :)`],
            ["after statements", `(: int i = $1; i++; i :)`],
            ["after a loop", `(: int i = $1; while (i < 3) { i++; } i++ :)`],
            ["after an if", `(: if ($1) return 1; 2 :)`],
            ["after a switch", `(: int i = $1; switch (i) { case 1: i++; } i :)`],
            ["after a block", `(: { $1++; } $1 :)`],
            ["that is a conditional", `(: int i = $1; i ? i : 0 :)`],
        ])("accepts one %s", (_, closure) => {
            expect(one(`mixed f() { return map(({ 1, 2 }), ${closure}); }`)).toEqual([]);
        });

        it("types the closure by that value, as a return would", () => {
            const call = (closure: string) => one(`void p(string s) { function f = ${closure}; string y = f(s); }`);
            expect(call(`(: int i = $1; i :)`)).toEqual(["2322: Type 'int' is not assignable to type 'string'."]);
            expect(call(`(: int i = $1; return i; :)`)).toEqual(["2322: Type 'int' is not assignable to type 'string'."]);
            expect(call(`(: int i = $1; i++; "s" :)`)).toEqual([]);
        });

        it("is only allowed as the body's own last statement", () => {
            // `if (x) y` is a statement missing its ';', not a value: LDMud rejects it.
            expect(one(`mixed f() { return map(({ 1 }), (: if ($1) 1 :)); }`)).toEqual(["1005: ';' expected."]);
        });

        it("parses as a return of the expression", () => {
            const source = `void f() { closure c = (: int i = $1; i + 1 :); }`;
            const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType: lpc.LanguageVariant.LDMud });
            const sourceFile = ls.getProgram()!.getSourceFile(abs("test.c"))!;
            const returns: string[] = [];
            lpc.forEachChildRecursively(sourceFile, node => {
                if (node.kind === lpc.SyntaxKind.ReturnStatement) returns.push(source.slice(node.pos, node.end).trim());
                return undefined;
            });
            expect(returns).toEqual(["i + 1"]);
        });
    });

    it("accepts a body starting with a declaration", () => {
        expect(one(`mixed f() { return map(({ 1 }), (: int i = $1; return i + 1; :)); }`)).toEqual([]);
    });

    it("gives each expression before a statement its own range", () => {
        const source = `void note(string s) {} int f() { closure c = (: note("a"), note("b"); return 1; :); return 0; }`;
        const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType: lpc.LanguageVariant.LDMud });
        const sourceFile = ls.getProgram()!.getSourceFile(abs("test.c"))!;
        const statements: string[] = [];
        lpc.forEachChildRecursively(sourceFile, node => {
            if (lpc.isExpressionStatement(node)) statements.push(source.slice(node.pos, node.end).trim());
            return undefined;
        });
        expect(statements).toEqual([`note("a")`, `note("b")`]);
    });
});

describe("LDMud inherits", () => {
    it("resolves virtual inherit", () => {
        expect(diagnosticsFor({
            "test.c": `virtual inherit "base";\nint f() { return base_value(); }`,
            "base.c": `int base_value() { return 1; }`,
        })).toEqual([]);
    });

    it("resolves an inherit after a modifier", () => {
        expect(diagnosticsFor({
            "test.c": `private inherit "base";\nint f() { return base_value(); }`,
            "base.c": `int base_value() { return 1; }`,
        })).toEqual([]);
    });

    it("accepts virtual with other inheritance modifiers, in either order", () => {
        for (const modifiers of ["private virtual", "virtual private"]) {
            expect(diagnosticsFor({
                "test.c": `${modifiers} inherit "base";\nint f() { return base_value(); }`,
                "base.c": `int base_value() { return 1; }`,
            })).toEqual([]);
        }
    });

    it.each([
        "virtual int x;",
        "virtual void g() {}",
        "private virtual int y;",
        "void f() { virtual int z = 1; }",
    ])("rejects virtual anywhere but an inherit: %s", source => {
        expect(one(source)).toEqual(["9057: The 'virtual' modifier can only be used with 'inherit'."]);
    });
});

describe("LDMud ranges and indexing", () => {
    it("accepts [>n]", () => {
        expect(one(`int f(int *a) { return a[>0]; }`)).toEqual([]);
    });

    it("accepts [>a..>b]", () => {
        expect(one(`int *f(int *a) { return a[>0..>1]; }`)).toEqual([]);
    });

    it("leaves [>n] a syntax error in FluffOS", () => {
        expect(diagnosticsFor({ "test.c": `int f(int *a) { return a[>0]; }` }, "test.c", lpc.LanguageVariant.FluffOS)).not.toEqual([]);
    });
});

describe("LDMud preprocessor names", () => {
    it("accepts #ifdef with a keyword", () => {
        expect(one(`#ifdef private\nint x = "not compiled";\n#endif\nint y;\n`)).toEqual([]);
    });

    it("accepts #ifdef 0 as not defined", () => {
        expect(one(`#ifdef 0\nint x = "not compiled";\n#endif\nint y;\n`)).toEqual([]);
    });

    it("accepts #undef with a keyword", () => {
        expect(one(`#undef private\nint y;\n`)).toEqual([]);
    });
});

/** The expression statement in `void f() { int a, b, c; <statement> }`, with each binary expression parenthesized. */
function grouping(statement: string, driverType: lpc.LanguageVariant): string {
    const source = `void f() { int a, b, c; ${statement} }`;
    const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType });
    const sourceFile = ls.getProgram()!.getSourceFile(abs("test.c"))!;
    const render = (node: lpc.Expression): string =>
        lpc.isBinaryExpression(node) ? `(${render(node.left)} ${lpc.tokenToString(node.operatorToken.kind)} ${render(node.right)})` :
        lpc.isPrefixUnaryExpression(node) ? `${lpc.tokenToString(node.operator)}${render(node.operand)}` :
        lpc.isParenthesizedExpression(node) ? render(node.expression) :
        source.slice(lpc.skipTrivia(source, node.pos), node.end);
    let found: string | undefined;
    lpc.forEachChildRecursively(sourceFile, node => {
        if (found === undefined && lpc.isExpressionStatement(node)) found = render(node.expression);
        return undefined;
    });
    return found!;
}

describe.each(DRIVERS)("expressions in both drivers (%s)", (_name, driverType) => {
    it("accepts any and unknown as names (neither driver reserves them)", () => {
        expect(diagnosticsFor({ "test.c": `int f(int any) { mapping unknown = ([]); return any + sizeof(unknown); }` }, "test.c", driverType)).toEqual([]);
    });

    it("keeps any and unknown as doc comment types", () => {
        const source = `/**\n * @param {any} x\n * @param {unknown} y\n * @param {int|any} any\n * @returns {any}\n */\nmixed f(mixed x, mixed y, mixed any) { return x; }\nvoid g() { f(1, 2, 3); }\n`;
        expect(diagnosticsFor({ "test.c": source }, "test.c", driverType)).toEqual([]);
        const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType });
        const info = ls.getQuickInfoAtPosition(abs("test.c"), source.indexOf("f(1"));
        expect(lpc.displayPartsToString(info?.displayParts)).toBe("function mixed f(any x, unknown y, int | any any)");
    });

    it.each([
        ["a && b += 2;", "(a && (b += 2))"],
        ["a || b = 1;", "(a || (b = 1))"],
        ["a || b = 1 || c;", "(a || (b = (1 || c)))"],
        ["c = a + b = 1;", "(c = (a + (b = 1)))"],
        ["c = a == b = 1;", "(c = (a == (b = 1)))"],
        ["c = a * b + c = 2 * a;", "(c = ((a * b) + (c = (2 * a))))"],
        ["a && b >>= 1;", "(a && (b >>= 1))"],
        // the operand of a unary operator too
        ["!a = b || c;", "!(a = (b || c))"],
        ["c = -a += 1;", "(c = -(a += 1))"],
        ["c = ~a = b & c;", "(c = ~(a = (b & c)))"],
    ])("takes an assignment as the right operand: %s", (statement, expected) => {
        expect(grouping(statement, driverType)).toBe(expected);
        expect(diagnosticsFor({ "test.c": `void f() { int a, b, c; ${statement} }` }, "test.c", driverType)).toEqual([]);
    });
});

describe("other LDMud expressions", () => {
    it("accepts a bytes literal as an argument", () => {
        expect(one(`int f(bytes txt) { return strstr(txt, b"\\n"); }`)).toEqual([]);
    });
});

describe("LDMud types", () => {
    it("reads '**' after a bracketed union as an array of arrays", () => {
        expect(one(`<int|string>** pairs() { return ({ ({ 1, "a" }) }); }
mixed *groups(object *obs) { return unique_array(obs, "query_short", 0); }
int f() { <int|string>** p = pairs(); return sizeof(p[0]); }`)).toEqual([]);
    });
});
