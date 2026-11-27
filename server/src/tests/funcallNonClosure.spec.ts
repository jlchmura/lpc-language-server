import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * LDMud's funcall() and apply() return a non-closure first argument unchanged (func_spec:
 * `mixed& funcall(mixed|closure, ...)`), so a mudlib can treat a value and a closure that
 * computes it alike. The driver's tests call funcall(10) and funcall("10").
 */
describe.each(["strict", "driver"] as const)("funcall() and apply() on a non-closure (%s mode)", typeChecking => {
    function diagnosticsFor(source: string): string[] {
        const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType: lpc.LanguageVariant.LDMud, diagnostics: true, typeChecking });
        return allDiagnostics(ls, abs("test.c")).map(codeAndMessage);
    }

    it("accepts any value as the first argument", () => {
        expect(diagnosticsFor(`void f() {
    int i = funcall(10);
    string s = funcall("10");
    mixed m = funcall(({ "2" }), 1, 2);
    int j = apply(10, ({ 1, 2 }));
    mixed k = apply("x");
}`)).toEqual([]);
    });

    it("still calls a closure", () => {
        expect(diagnosticsFor(`int f() { closure c = function int(int x) { return x; }; return funcall(c, 1) + apply(c, ({ 2 })); }`)).toEqual([]);
    });
});
