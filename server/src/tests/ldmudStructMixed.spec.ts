import * as lpc from "./_namespaces/lpc.js";
import { codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * LDMud `struct mixed` (doc/LPC/structs, prolang.y `L_STRUCT L_MIXED` -> lpctype_any_struct):
 * a value that holds a struct of any type. The driver lets it go where any struct goes and
 * looks its members up at run time. Every expectation was compiled with LDMud 3.6.8 under
 * `#pragma strict_types`.
 */

const LDMud = lpc.LanguageVariant.LDMud;
const structs = `struct s { int member; };\nstruct t { string name; };\n`;

function diagnostics(source: string, typeChecking: lpc.TypeCheckingMode = "strict", files: Record<string, string> = {}, driverType = LDMud): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source, ...files }, { driverType, diagnostics: true, typeChecking });
    return [...ls.getSyntacticDiagnostics(abs("test.c")), ...ls.getSemanticDiagnostics(abs("test.c"))].map(codeAndMessage);
}

describe.each(["strict", "driver"] as const)("LDMud struct mixed (%s mode)", mode => {
    const ok = (body: string) => expect(diagnostics(structs + body, mode)).toEqual([]);
    const rejects = (body: string, message: string) => expect(diagnostics(structs + body, mode)).toEqual([message]);

    it("holds a struct of any type, and looks its members up at run time", () => {
        ok(`int f() { struct mixed x = (<s> 42); return x.member == 42 && x->whatever == 0; }\n`);
        ok(`void f(struct mixed x) { x.member = 1; x->name = "a"; }\n`);
        ok(`struct mixed fun() { return (<s> 42); }\nint f() { return fun().member; }\n`);
    });

    it("takes any struct, and goes where any struct goes", () => {
        ok(`void g(struct mixed a) {}\nvoid f() { g((<s>)); g((<t>)); }\n`);
        ok(`void f(struct mixed x) { struct s y = x; }\n`);
        ok(`void f() { struct mixed *a = ({ (<s>), (<t>) }); }\n`);
        ok(`int f(struct mixed x, struct s y) { return x == y; }\n`);
        ok(`void f(struct mixed x) { struct mixed z = 0; mixed m = x; m = (struct mixed)m; }\n`);
    });

    it("is not any other type", () => {
        rejects(`void f() { struct mixed x = 1; }\n`, "2322: Type 'int' is not assignable to type 'struct mixed'.");
        rejects(`void f(object o) { struct mixed x = o; }\n`, "2322: Type 'object' is not assignable to type 'struct mixed'.");
        rejects(`void f(struct mixed x) { int i = x; }\n`, "2322: Type 'struct mixed' is not assignable to type 'int'.");
        rejects(`void f(struct mixed x) { object o = x; }\n`, "2322: Type 'struct mixed' is not assignable to type 'object'.");
    });

    it("can be an lpctype literal", () => {
        ok(`void f() { lpctype t = [struct mixed]; t = [struct mixed*]; }\n`);
    });

    it("is what structp() narrows to", () => {
        ok(`void f(mixed v) { if (structp(v)) { struct mixed q = v; } }\n`);
    });
});

describe("LDMud struct mixed elsewhere", () => {
    // LDMud's own t-language/tl-struct-mixed.c and tl-struct-mixed-fun.c.
    it("works with a struct from an inherited program", () => {
        const files = { "ti-struct.c": `struct s { int member; };\n` };
        expect(diagnostics(`inherit "/ti-struct";\nint run_test() {\n  struct mixed x = (<s> 42);\n  return x.member == 42 && x->whatever == 0;\n}\n`, "strict", files)).toEqual([]);
        expect(diagnostics(`#pragma save_types\ninherit "/ti-struct";\nstruct mixed fun() { return (<s> 42); }\nint run_test() { return fun().member == 42; }\n`, "strict", files)).toEqual([]);
    });

    it("shows as struct mixed in hovers", () => {
        const source = `${structs}void f(mixed v) { struct mixed x/*X*/ = (<s>); }\n`;
        const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType: LDMud });
        expect(lpc.displayPartsToString(ls.getQuickInfoAtPosition(abs("test.c"), source.indexOf("x/*X*/"))?.displayParts)).toBe("(local var)  struct mixed x");
    });

    it("is LDMud only", () => {
        expect(diagnostics(`void f() { struct mixed x; }\n`, "strict", {}, lpc.LanguageVariant.FluffOS)).not.toEqual([]);
    });
});
