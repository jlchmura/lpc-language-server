import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * In LDMud `#'+` (an operator closure) and `#'fn` (a function closure) are closures. Typed as
 * mixed, they matched the first efun overload that takes any argument -- map()'s
 * `string func` one -- and the call lost its result type: `int b = map("ab", #'+, 1)` was
 * not an error. A quoted symbol, `'fn`, is only a name and stays untyped.
 */
function diagnosticsFor(source: string, driverType = lpc.LanguageVariant.LDMud): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType, diagnostics: true });
    return allDiagnostics(ls, abs("test.c")).map(codeAndMessage);
}

describe("LDMud closure literals", () => {
    it("give map() and filter() their result types", () => {
        expect(diagnosticsFor(`string fn(int c) { return ""; }\nvoid f() {\n    int a = map("ab", #'+, 1);\n    int b = map(b"ab", #'+, 1);\n    int c = filter(({ 1 }), #'fn);\n    int d = map(([ 1: 2 ]), #'+);\n}\n`)).toEqual([
            "2322: Type 'string' is not assignable to type 'int'.",
            "2322: Type 'bytes' is not assignable to type 'int'.",
            "2322: Type 'mixed*' is not assignable to type 'int'.",
            "2322: Type 'mapping' is not assignable to type 'int'.",
        ]);
    });

    it("are closures", () => {
        expect(diagnosticsFor(`int g() { return 1; }\nvoid f() { closure a = #'+; closure b = #'g; closure c = #'::create; mixed *l = ({ #'+, 1, 2 }); }\n`)).toEqual([]);
        expect(diagnosticsFor(`int g() { return 1; }\nvoid f() { string a = #'+; int b = #'g; }\n`)).toEqual([
            "2322: Type 'function' is not assignable to type 'string'.",
            "2322: Type 'function' is not assignable to type 'int'.",
        ]);
    });

    it("still go where an efun takes a closure", () => {
        expect(diagnosticsFor(`int cmp(int a, int b) { return a > b; }\nint f() {\n    int *s = sort_array(({ 3, 1, 2 }), #'cmp);\n    return funcall(#'+, 1, 2) + sizeof(s) + apply(#'+, ({ 1, 2 }));\n}\n`)).toEqual([]);
    });

    it("leave a quoted symbol untyped", () => {
        expect(diagnosticsFor(`void f() { mixed s = 'foo; symbol t = 'bar; }\n`)).toEqual([]);
    });
});
