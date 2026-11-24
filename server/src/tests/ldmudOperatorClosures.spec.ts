import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService, allDiagnostics, messageLines } from "./harness.js";

/**
 * LDMud operator closures, `#'<operator>`, and quoted arrays, `'({ ... })`.
 *
 * The operators are the ones lex.c's symbol_operator() recognizes. It reads the longest
 * operator directly after `#'`, so `#'[..<]` is one closure, and `#'[` followed by `,` is the
 * index operator followed by a comma. A quoted array is lex.c's L_QUOTED_AGGREGATE: one or
 * more quotes directly before `({`.
 */

// All 75, in the order of symbol_operator()'s comment.
const operators = [
    "+=", "++", "+", "-=", "--", "-", "*=", "*", "/=", "/", "%=", "%", ",", "^=", "^",
    "||", "||=", "|=", "|", "&&", "&&=", "&=", "&", "~", "<=", "<<=", "<<", "<", ">=", ">>=",
    ">>>=", ">>>", ">>", ">", "==", "=", "!=", "!", "?!", "?",
    "[..]", "[..<]", "[<..]", "[<..<]", "[..>]", "[>..]", "[<..>]", "[>..<]", "[>..>]",
    "[..", "[<..", "[>..",
    "[,]", "[,<]", "[,>]", "[,..]", "[,..<]", "[,<..]", "[,<..<]", "[,..>]", "[,>..]",
    "[,<..>]", "[,>..<]", "[,>..>]", "[,..", "[,<..", "[,>..",
    "[", "[<", "[>", "({", "([", ".", "->", "(<",
];

function load(source: string, driverType = lpc.LanguageVariant.LDMud) {
    const { ls, fileName } = createTestLanguageService({ "test.c": source }, { driverType });
    const errors = allDiagnostics(ls, fileName).map(messageLines);
    return { ls, fileName, errors, sourceFile: ls.getProgram()!.getSourceFile(fileName)! };
}

const check = (source: string) => load(source).errors;

/** The source text of each operator closure's operator, in order. */
function closureOperators(source: string): string[] {
    const { sourceFile } = load(source);
    const found: string[] = [];
    lpc.forEachChildRecursively(sourceFile, node => {
        if (node.kind === lpc.SyntaxKind.LambdaOperatorExpression) {
            const op = (node as lpc.LambdaOperatorExpression).operator;
            found.push(source.slice(op.pos, op.end));
        }
        return undefined;
    });
    return found;
}

describe("LDMud operator closures", () => {
    it("knows all 75 operators", () => {
        expect(operators.length).toBe(75);
        expect(new Set(operators).size).toBe(75);
    });

    it.each(operators)("reads #'%s as one closure", op => {
        // As an argument, an array element, and a value followed by `)` and by `;`.
        const source = `void f() {
    closure c = #'${op};
    mixed m = ({ #'${op}, 1 });
    funcall(#'${op});
    funcall(#'${op}, 1);
}
`;
        expect(check(source)).toEqual([]);
        expect(closureOperators(source)).toEqual([op, op, op, op]);
    });

    it("takes the longest operator, and stops where symbol_operator() does", () => {
        // `#'[` then `, 'a`: a comma not followed by `]`, `<]`, `>]` or a range is not part of it.
        const source = `mixed f() {
    return ({ #'!=, ({ #'[, 'a, "NAME" }), "NONAME" })
        + ({ #'-, #'->, #'>>>=, #'>>=, #'[<, #'[<.., #'[..>] });
}
`;
        expect(check(source)).toEqual([]);
        expect(closureOperators(source)).toEqual(["!=", "[", "-", "->", ">>>=", ">>=", "[<", "[<..", "[..>]"]);
    });

    it("keeps keyword closures and inherited function closures", () => {
        const source = `void foo() {}
mixed f() {
    return ({ #'if, #'while, #'do, #'foreach, #'switch, #'return, #'catch, #'default,
              #'break, #'continue, #'::foo, #'efun::write });
}
`;
        expect(check(source)).toEqual([]);
    });

    it("needs the operator directly after #'", () => {
        expect(check(`void f() { funcall(#' +); }\n`)).toEqual(["Missing function name after #'."]);
        expect(check(`void f() { funcall(#'); }\n`)).toEqual(["Missing function name after #'."]);
    });
});

describe("LDMud quoted arrays", () => {
    it("parses '({ }) with one or more quotes, nested and in lambda()", () => {
        const source = `closure f() {
    mixed a = '({ #'+, 1, 2 });
    mixed b = ''({ });
    mixed c = '({ #'?, '({ #'==, 'x, 1 }), "one", "other" });
    return lambda(({ 'x }), ({ #'sizeof, '({ 'x, ''y }) }));
}
`;
        expect(check(source)).toEqual([]);
    });

    it("records the number of quotes", () => {
        const source = `mixed a = '({ 1 });\nmixed b = '''({ 2 });\n`;
        const { sourceFile } = load(source);
        const quotes: number[] = [];
        lpc.forEachChildRecursively(sourceFile, node => {
            if (node.kind === lpc.SyntaxKind.QuotedArrayExpression) quotes.push((node as lpc.QuotedArrayExpression).quotes);
            return undefined;
        });
        expect(quotes).toEqual([1, 3]);
    });

    it("checks the elements like any expression", () => {
        const source = `void f() {
    int used;
    mixed a = '({ #'+, used, missing });
}
`;
        expect(check(source)).toEqual(["Cannot find name 'missing'."]);
    });

    it("leaves character literals and single-quoted symbols alone", () => {
        const source = `mixed f() { return ({ '(', '{', ''', 'sym, ''sym }); }\n`;
        expect(check(source)).toEqual([]);
    });
});
