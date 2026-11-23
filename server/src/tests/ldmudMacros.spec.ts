import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService } from "./harness.js";

/**
 * LDMud preprocessor behaviour, each case checked against the LDMud 3.6.8 driver:
 * - function-like macro parameters are substituted inside string and character literals of the body;
 * - there is no `#` stringify or `##` paste operator: '#' is an illegal character where such a macro is used;
 * - an empty macro body expands to nothing;
 * - a zero-parameter macro `f()` is function-like and consumes its `()`.
 */
function diagnosticsFor(source: string): { code: number; text: string; at: string; line: number }[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, {
        driverType: lpc.LanguageVariant.LDMud,
        diagnostics: true,
    });
    return [...ls.getSyntacticDiagnostics(abs("test.c")), ...ls.getSemanticDiagnostics(abs("test.c"))]
        .map(d => ({
            code: d.code,
            text: lpc.flattenDiagnosticMessageText(d.messageText, " "),
            at: source.substring(d.start ?? 0, (d.start ?? 0) + (d.length ?? 0)),
            line: source.substring(0, d.start ?? 0).split("\n").length - 1,
        }));
}

describe("LDMud macro parameters inside literals", () => {
    it("substitutes whole words in string and char literals of a function-like macro", () => {
        expect(diagnosticsFor("// whole words only; argument text and object-like macros are left alone\n#define LABEL(name) \"name\"\n#define KEYS(name, v) ([ \"xname name9 9name\": v, v: 1, LABEL(name): 2, \"name.x\": 3 ])\n#define CHR(c) 'c'\n#define name 5\n#define PLAIN \"name\"\n\nstring foo;\n\nmapping test() { return KEYS(foo, \"name\"); }\n\nint check() {\n    mapping m = test();\n    return m[\"xname name9 9name\"] == \"name\" && m[\"name\"] == 1 && m[\"foo\"] == 2 && m[\"foo.x\"] == 3\n        && CHR(z) == 'z' && PLAIN == \"name\";\n}\n")).toEqual([]);
    });

    it("reports a literal broken by substitution on the macro use line", () => {
        // QM("x") reads ([ ""x"":"x" ]) in the driver, which fails to compile.
        const source = "#define QM(name) ([ \"name\":name ])\n\nmapping test() {\n    return QM(\"x\");\n}\n";
        const diags = diagnosticsFor(source);
        expect(diags.find(d => d.code === 1005)?.at).toBe("QM");
        expect(diags.every(d => d.line === 3)).toBe(true);
    });
});

describe("LDMud has no # or ## operator", () => {
    it("reports nothing for unused macros and accepts #' closures in macro bodies", () => {
        expect(diagnosticsFor("// LDMud 3.6.8 has no # stringify or ## paste operator, but a macro body is text:\n// '#' is an illegal character only where such a macro is used (lpc-feedback b3e86df06bd2).\n#define STR(x) #x\n#define PASTE(a,b) a##b\n#define HASHED #abc\n#define CL(f) #'f\n#define SUM(a) funcall(#'+, a, 1)\n#define HS(x) \"#x\"\n\nint g() { return 1; }\n\nint check() {\n    closure c;\n    c = CL(g);\n    return funcall(c) == 1 && SUM(2) == 3 && HS(1) == \"#1\";\n}\n")).toEqual([]);
    });

    it("reports '#' as an invalid character at the macro use", () => {
        const diags = diagnosticsFor("#define QM(name) ([ #name : name ])\nint x;\n\nmapping test() {\n    return QM(x);\n}\n");
        expect(diags.map(d => d.code)).toContain(1127);
        expect(diags.filter(d => d.code === 1127).every(d => d.at.startsWith("QM"))).toBe(true);
    });
});

describe("LDMud macro bodies and parameter lists", () => {
    it("expands an empty macro body to nothing", () => {
        expect(diagnosticsFor("#if 0\n#define debug(x) if (find_player(\"x\")) tell_object(find_player(\"x\"),x)\n#else\n#define debug(x)\n#endif\n#define EMPTY\n\nint check()\n{\n\tEMPTY int a = 1;\n\tdebug(\"hello\");\n\tdebug(sprintf(\"%d\", a));\n\treturn a EMPTY;\n}\n")).toEqual([]);
    });

    it("keeps a zero-parameter macro function-like", () => {
        expect(diagnosticsFor("#define LOG(x,y) log_value(x, \\\n\ty)\n#define check_security() \\\n\tif( gate != 1 ) { \\\n\t\tLOG(\"a\", \"b\"); \\\n\t\treturn( 1 ); \\\n\t}\n#define BUMP() { logged += 10; }\n#define TWO() 2\nint gate, logged;\nvoid log_value(string a, string b) { logged++; }\nint f()\n{\n\tcheck_security();\n\treturn TWO();\n}\nint check() { gate = 1; if(f() != 2) return 0; gate = 0; if(f() != 1 || logged != 1) return 0; BUMP(); return logged == 11; }\n")).toEqual([]);
    });
});
