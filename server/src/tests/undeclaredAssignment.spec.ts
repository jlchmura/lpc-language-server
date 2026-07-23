import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService } from "./harness.js";

/**
 * Assigning to an undeclared variable.
 *
 * LDMud makes types optional, so `foo = 1` with no prior declaration is legal:
 * the first assignment implicitly declares the variable. FluffOS forbids this and
 * reports the target as an unresolved name. LDMud projects can opt into the same
 * strictness with the `allowUndeclaredAssignmentsInLd: false` compiler option.
 */
function createLanguageService(options: lpc.CompilerOptions, fileText: Record<string, string>) {
    return createTestLanguageService(fileText, options);
}

const source = `void f() {\n    foo = 1;\n}\n`;

function messagesFor(options: lpc.CompilerOptions): string[] {
    const { ls, abs } = createLanguageService(options, { "test.c": source });
    return ls.getSemanticDiagnostics(abs("test.c"))
        .map(d => lpc.flattenDiagnosticMessageText(d.messageText, "\n"));
}

describe("assignment to an undeclared variable", () => {
    it("is allowed under LDMud by default (implicit declaration)", () => {
        const msgs = messagesFor({ driverType: lpc.LanguageVariant.LDMud, diagnostics: true });
        expect(msgs.filter(m => m.includes("Cannot find name"))).toEqual([]);
    });

    it("is an unresolved name under LDMud when allowUndeclaredAssignmentsInLd is false", () => {
        const msgs = messagesFor({
            driverType: lpc.LanguageVariant.LDMud,
            diagnostics: true,
            allowUndeclaredAssignmentsInLd: false,
        });
        expect(msgs.some(m => m.includes("Cannot find name 'foo'"))).toBe(true);
    });

    it("is an unresolved name under FluffOS regardless of the option", () => {
        const msgs = messagesFor({
            driverType: lpc.LanguageVariant.FluffOS,
            diagnostics: true,
            allowUndeclaredAssignmentsInLd: true,
        });
        expect(msgs.some(m => m.includes("Cannot find name 'foo'"))).toBe(true);
    });
});
