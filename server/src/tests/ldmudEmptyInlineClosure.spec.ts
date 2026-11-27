import * as lpc from "./_namespaces/lpc.js";
import { allDiagnostics, codeAndMessage, createTestLanguageService } from "./harness.js";

/**
 * `(::)` is LDMud's empty inline closure, like `(: :)`; it returns 0 (t-efuns.c's
 * `input_to((::), INPUT_IGNORE_BANG)`). Its `::` used to be read as a super access.
 */
function diagnosticsFor(source: string, driverType = lpc.LanguageVariant.LDMud): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType, diagnostics: true });
    return allDiagnostics(ls, abs("test.c")).map(codeAndMessage);
}

describe("an LDMud empty inline closure", () => {
    it("is a closure", () => {
        expect(diagnosticsFor(`void f() {\n    input_to((::), 1);\n    closure c = (::);\n    mixed r = funcall((::));\n    funcall(bind_lambda(#'input_to, this_object()), (::), 1);\n}\n`)).toEqual([]);
    });

    it("is checked like (: :)", () => {
        expect(diagnosticsFor(`void f() { string s = (::); int i = (::); }\n`)).toEqual(diagnosticsFor(`void f() { string s = (: :); int i = (: :); }\n`));
    });

    it("keeps (::fn) a super access", () => {
        expect(diagnosticsFor(`inherit "base";\nvoid f() { mixed x = (::create()); }\n`)).not.toContain("1003: Identifier expected.");
    });
});
