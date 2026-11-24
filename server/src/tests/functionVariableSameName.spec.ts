import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService, codeAndMessage, DRIVERS, checkAllFiles } from "./harness.js";

/**
 * A global variable and a function may share a name (#415, item 4):
 *
 *     int hostile;
 *     varargs int hostile(int flag) { hostile = flag; return hostile; }
 *
 * Both drivers keep functions and variables in separate name spaces. FluffOS gives each
 * identifier separate `global_num` and `function_num` slots (lexer.h `defined_name_t`), and
 * `define_variable` only checks the first while a function definition only checks the second
 * (compiler.cc). LDMud does the same with `u.global.variable` and `u.global.function` (lex.h).
 * A bare name is the variable, and a call is the function.
 *
 * The binder used to put both in one symbol table under TypeScript's rule that they share the
 * value space. Declaring the variable first reported TS2451 on the function. Declaring the
 * function first quietly merged the two, and a private or protected function became
 * uncallable (TS2349 "not callable"). Across an inherit, a bare name found the function
 * before the inherited variable.
 */

function service(driverType: lpc.LanguageVariant, files: Record<string, string>) {
    return checkAllFiles(createTestLanguageService(files, { driverType, diagnostics: true }), files);
}

function diagnostics(driverType: lpc.LanguageVariant, files: Record<string, string>): string[] {
    const { ls, abs } = service(driverType, files);
    return ls.getSemanticDiagnostics(abs("test.c")).map(codeAndMessage);
}

/** Uses `hostile` both ways. The variable is a string and the function returns int, so the last two lines are wrong. */
const USES = `
void use() {
    string s = hostile;
    int i = hostile(1);
    int bad_var = hostile;
    string bad_call = hostile(1);
}
`;

/** Exactly the two mismatches in USES, which show the bare name typed as the variable and the call as the function. */
const USE_ERRORS = [
    "2322: Type 'string' is not assignable to type 'int'.",
    "2322: Type 'int' is not assignable to type 'string'.",
];

const VAR = `string hostile;\n`;
const FUNC = (modifier = "") => `${modifier}int hostile(int flag) { return flag; }\n`;

describe.each(DRIVERS)("a global variable and a function with the same name (%s)", (_name, driverType) => {
    it.each([
        ["variable first", VAR + FUNC()],
        ["function first", FUNC() + VAR],
        ["private function, variable first", VAR + FUNC("private ")],
        ["private function, function first", FUNC("private ") + VAR],
        ["protected function", VAR + FUNC("protected ")],
        ["static variable and function", `static ${VAR}` + FUNC("static ")],
        ["varargs function", VAR + FUNC("varargs ")],
    ])("is not a redeclaration, and each use finds its own kind: %s", (_case, declarations) => {
        expect(diagnostics(driverType, { "test.c": declarations + USES })).toEqual(USE_ERRORS);
    });

    it("lets a prototype come between the variable and the definition", () => {
        const source = VAR + `int hostile(int flag);\n` + USES + FUNC();
        expect(diagnostics(driverType, { "test.c": source })).toEqual(USE_ERRORS);
    });

    it("reads and writes the variable from inside the function of the same name", () => {
        const source = `int hostile;\nvarargs int hostile(int flag) { hostile = flag; return hostile; }\n`;
        expect(diagnostics(driverType, { "test.c": source })).toEqual([]);
    });

    it("still reports two variables, or two function bodies, with the same name", () => {
        expect(diagnostics(driverType, { "test.c": VAR + VAR })).toEqual([
            "2451: Cannot redeclare block-scoped variable 'hostile'.",
        ]);
        expect(diagnostics(driverType, { "test.c": VAR + FUNC() + FUNC() })).toEqual([
            "2393: Duplicate function implementation.",
            "2393: Duplicate function implementation.",
        ]);
    });

    it.each([
        ["both in the inherited file", { "base.c": VAR + FUNC(), "test.c": `inherit "base";\n` + USES }],
        ["inherited variable, own function", { "base.c": VAR, "test.c": `inherit "base";\n` + FUNC() + USES }],
        ["inherited function, own variable", { "base.c": FUNC(), "test.c": `inherit "base";\n` + VAR + USES }],
    ])("keeps the two apart across an inherit: %s", (_case, files) => {
        expect(diagnostics(driverType, files)).toEqual(USE_ERRORS);
    });

    describe("language service", () => {
        const source = VAR + FUNC() + USES;
        const variableDecl = source.indexOf("hostile");
        const functionDecl = source.indexOf("hostile", variableDecl + 1);
        const bareUse = source.indexOf("s = hostile") + "s = ".length;
        const callUse = source.indexOf("i = hostile(") + "i = ".length;

        it("goes to the variable from a bare name and to the function from a call", () => {
            const { ls, abs } = service(driverType, { "test.c": source });
            const definition = (pos: number) => ls.getDefinitionAtPosition(abs("test.c"), pos)?.map(d => d.textSpan.start);
            expect(definition(bareUse)).toEqual([variableDecl]);
            expect(definition(callUse)).toEqual([functionDecl]);
        });

        it("hovers a bare name as the variable and a call as the function", () => {
            const { ls, abs } = service(driverType, { "test.c": source });
            const hover = (pos: number) => lpc.displayPartsToString(ls.getQuickInfoAtPosition(abs("test.c"), pos)?.displayParts);
            expect(hover(bareUse)).toContain("string hostile");
            expect(hover(callUse)).toContain("int hostile(int flag)");
        });

        it("finds the variable's references without the calls, and the other way round", () => {
            const { ls, abs } = service(driverType, { "test.c": source });
            const references = (pos: number) => ls.findReferences(abs("test.c"), pos)
                ?.flatMap(r => r.references.map(x => x.textSpan.start))
                .sort((a, b) => a - b);
            const starts = (needle: string) => {
                const found: number[] = [];
                for (let i = source.indexOf(needle); i >= 0; i = source.indexOf(needle, i + 1)) {
                    found.push(i + needle.indexOf("hostile"));
                }
                return found;
            };
            expect(references(variableDecl)).toEqual([variableDecl, ...starts("= hostile;")]);
            expect(references(functionDecl)).toEqual([functionDecl, ...starts("hostile(1)")]);
        });
    });
});

describe("FluffOS function pointer to a shared name", () => {
    // rule_functional_ref (grammar_rules_exprs.cc) checks local variables, then global
    // variables, then functions, so `(: hostile :)` is a functional over the variable.
    it("refers to the variable", () => {
        const source = VAR + FUNC() + `void use() { function f = (: hostile :); }\n`;
        const { ls, abs } = service(lpc.LanguageVariant.FluffOS, { "test.c": source });
        const pointer = source.indexOf("(: hostile") + "(: ".length;
        expect(ls.getDefinitionAtPosition(abs("test.c"), pointer)?.map(d => d.textSpan.start)).toEqual([source.indexOf("hostile")]);
        expect(ls.getSemanticDiagnostics(abs("test.c"))).toEqual([]);
    });
});
