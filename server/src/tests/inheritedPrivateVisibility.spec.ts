import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";

/**
 * `private` is the one modifier an inheriting program cannot see through. FluffOS documents
 * it as "visible only in this program file" (docs/lpc/constructs/modifiers.md); LDMud is
 * blunter -- "Not even inheriting objects can call these functions", and the same sentence
 * again for variables (doc/LPC/modifiers). `protected` is the modifier that stops at
 * `call_other` but still reaches inheritors, and it must keep doing so.
 *
 * The child's own view of its inherits is the whole story here, so every expectation below
 * is the set of names an inheriting file can resolve, not what the driver dispatches to at
 * runtime. The two coincide: a name the child cannot see is an undefined function.
 */
const FIXTURES = lpc.normalizeSlashes(path.join(process.cwd(), "server/src/tests/cases/privinherit"));

const fixture = (name: string) => lpc.normalizeSlashes(path.join(FIXTURES, name));

function programFor(rootName: string, driverType: lpc.LanguageVariant) {
    const options: lpc.CompilerOptions = { driverType, diagnostics: true };
    const host = lpc.createCompilerHost(options);
    host.getDefaultLibFileName = () =>
        lpc.combinePaths(process.cwd(), lpc.getDefaultLibFolder(options), lpc.getDefaultLibFileName(options));
    return lpc.createProgram({ host, rootNames: [rootName], options });
}

/** Diagnostics for `fileName` inside the program rooted at `rootName`. */
function diagnosticsIn(rootName: string, fileName: string, driverType = lpc.LanguageVariant.FluffOS): string[] {
    const program = programFor(fixture(rootName), driverType);
    const sourceFile = program.getSourceFile(fixture(fileName))!;
    return program.getSemanticDiagnostics(sourceFile).map(d => lpc.flattenDiagnosticMessageText(d.messageText, " "));
}

const diagnostics = (name: string, driverType?: lpc.LanguageVariant) => diagnosticsIn(name, name, driverType);

describe("a private name in an inherited program", () => {
    it("is not a function the child can call", () => {
        expect(diagnostics("priv_child.c")).toContain("Cannot find name 'hidden_fn'.");
    });

    it("is not a variable the child can read", () => {
        expect(diagnostics("priv_child.c")).toContain("Cannot find name 'hidden_var'.");
    });

    it("is hidden from LDMud's inheritors too -- the rule is the same in both drivers", () => {
        expect(diagnostics("priv_child.c", lpc.LanguageVariant.LDMud)).toEqual([
            "Cannot find name 'hidden_fn'.",
            "Cannot find name 'hidden_var'.",
        ]);
    });

    it("stays hidden further down the inherit chain", () => {
        expect(diagnostics("priv_grandchild.c")).toEqual(["Cannot find name 'hidden_fn'."]);
    });

    it("is not reachable by naming the program it was declared in", () => {
        expect(diagnostics("priv_super.c")).toEqual(["Cannot find name 'hidden_fn'."]);
    });

    it("is still visible to the file that declares it", () => {
        expect(diagnostics("priv_base.c")).toEqual([]);
    });
});

describe("what an inheriting program can still see", () => {
    it("resolves protected and public functions, and file-scope variables", () => {
        expect(diagnostics("priv_child_visible.c")).toEqual([]);
    });

    it("resolves them for LDMud as well", () => {
        expect(diagnostics("priv_child_visible.c", lpc.LanguageVariant.LDMud)).toEqual([]);
    });
});

/**
 * Two inherits that each declare a private function of the same name. fluffos#1403 fixed the
 * driver here -- `handle_functions()` used to alias the earlier inherit's slot to the later
 * one, so `a`'s call ran `b`'s function. Name resolution never had that bug, and these pin it.
 */
describe("two inherits declaring the same private name", () => {
    it("binds each inherit's call to its own declaration", () => {
        expect(diagnosticsIn("priv_both.c", "priv_a.c")).toEqual([]);
        expect(diagnosticsIn("priv_both.c", "priv_b.c")).toEqual([]);
        expect(diagnosticsIn("priv_both.c", "priv_both.c")).toEqual([]);
    });

    it("does not let a public function in the child take those calls over", () => {
        expect(diagnosticsIn("priv_both_override.c", "priv_a.c")).toEqual([]);
        expect(diagnosticsIn("priv_both_override.c", "priv_b.c")).toEqual([]);
        expect(diagnosticsIn("priv_both_override.c", "priv_both_override.c")).toEqual([]);
    });
});
