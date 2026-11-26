import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";
import { message, createTestProgram, createTestLanguageService, allDiagnostics, codeAndMessage } from "./harness.js";

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
    return createTestProgram({}, { driverType }, [rootName]).program;
}

/** Diagnostics for `fileName` inside the program rooted at `rootName`. */
function diagnosticsIn(rootName: string, fileName: string, driverType = lpc.LanguageVariant.FluffOS): string[] {
    const program = programFor(fixture(rootName), driverType);
    const sourceFile = program.getSourceFile(fixture(fileName))!;
    return program.getSemanticDiagnostics(sourceFile).map(message);
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

/**
 * A program that redefines an inherited function as `private` (#440). Both drivers copy the
 * inherited function table entry by entry, with the redefinition in place of the function it
 * overrides, and keep the private one's name: an inheriting program can no longer reach the
 * public function underneath, nor an efun of that name. FluffOS reports "Illegal to call
 * inherited private function" (compiler.cc copy_new_function, validate_function_call); LDMud
 * 3.6.8 reports "Undefined function" for every case below that is rejected.
 */
describe.each([
    ["FluffOS", lpc.LanguageVariant.FluffOS],
    ["LDMud", lpc.LanguageVariant.LDMud],
] as const)("an inherited function redefined as private (%s)", (_, driverType) => {
    const files = {
        "base.c": `void from_base() {}\n`,
        "mid.c": `inherit "/base";\nprivate void from_base() {}\nvoid g() { from_base(); }\n`,
        "other.c": `void from_base() {}\n`,
        "pefun.c": `private int strlen(string s) { return 0; }\n`,
        "below.c": `inherit "/mid";\n`,
    };

    function diagnostics(source: string, typeChecking: lpc.TypeCheckingMode = "strict"): string[] {
        const { ls, abs } = createTestLanguageService({ "test.c": source, ...files }, { driverType, diagnostics: true, typeChecking });
        return allDiagnostics(ls, abs("test.c")).map(codeAndMessage);
    }

    it("hides the function it overrides from the programs that inherit it", () => {
        expect(diagnostics(`inherit "/mid";\nvoid caller() { from_base(); }\n`)).toEqual(["2304: Cannot find name 'from_base'."]);
        expect(diagnostics(`inherit "/mid";\nvoid caller() { from_base(); }\n`, "driver")).toEqual(["2304: Cannot find name 'from_base'."]);
    });

    it("hides it from a call that names the program, and further down the chain", () => {
        expect(diagnostics(`inherit "/mid";\nvoid caller() { mid::from_base(); ::from_base(); }\n`)).toEqual([
            "2304: Cannot find name 'from_base'.",
            "2304: Cannot find name 'from_base'.",
        ]);
        expect(diagnostics(`inherit "/below";\nvoid caller() { below::from_base(); from_base(); }\n`)).toEqual([
            "2304: Cannot find name 'from_base'.",
            "2304: Cannot find name 'from_base'.",
        ]);
    });

    // call_other cannot call a private function either, so the program's object type has no
    // such function. Driver mode never checks a call_other's function name. (Named object
    // types are LDMud's.)
    it.runIf(driverType === lpc.LanguageVariant.LDMud)("leaves the function out of the program's object type", () => {
        const source = `void caller(object "/mid" o, object "/base" b) { o->from_base(); b->from_base(); }\n`;
        expect(diagnostics(source)).toEqual([`2339: Property 'from_base' does not exist on type 'object "/mid"'.`]);
        expect(diagnostics(source, "driver")).toEqual([]);
    });

    it("hides an efun of the same name", () => {
        expect(diagnostics(`inherit "/pefun";\nint caller() { return strlen("a"); }\n`)).toEqual(["2304: Cannot find name 'strlen'."]);
    });

    it("still lets another inherit provide the function, in either order", () => {
        expect(diagnostics(`inherit "/mid";\ninherit "/other";\nvoid caller() { from_base(); }\n`)).toEqual([]);
        expect(diagnostics(`inherit "/other";\ninherit "/mid";\nvoid caller() { from_base(); }\n`)).toEqual([]);
    });

    it("still lets the inheriting program define the function itself", () => {
        expect(diagnostics(`inherit "/mid";\nvoid from_base() {}\nvoid caller() { from_base(); }\n`)).toEqual([]);
    });

    // Completions listed every inherited program's members, private ones included, so an
    // inheriting program was offered names it cannot call, and the redefined name twice.
    function completionsIn(source: string, more: Record<string, string> = {}): string[] {
        const { ls, abs } = createTestLanguageService({ "test.c": source, ...files, ...more }, { driverType });
        const entries = ls.getCompletionsAtPosition(abs("test.c"), source.indexOf("/*|*/"), {})?.entries ?? [];
        return entries.map(e => e.name).filter(name => /^(from_|mid_)/.test(name)).sort();
    }

    it("is not offered as a completion to the programs that inherit it", () => {
        const mid = `inherit "/base";\nprivate void from_base() {}\nprivate void mid_private() {}\nvoid from_mid() {}\n`;
        expect(completionsIn(`inherit "/mid";\nvoid caller() { /*|*/ }\n`, { "mid.c": mid })).toEqual(["from_mid"]);
    });

    it("is offered once when another inherit provides the function", () => {
        expect(completionsIn(`inherit "/mid";\ninherit "/other";\nvoid caller() { /*|*/ }\n`)).toEqual(["from_base"]);
    });

    it("is offered in the program that declares it", () => {
        const source = `inherit "/base";\nprivate void from_base() {}\nprivate void mid_private() {}\nvoid g() { /*|*/ }\n`;
        expect(completionsIn(source)).toEqual(["from_base", "mid_private"]);
    });

    it("is still called by the program that declares it", () => {
        const { ls, abs } = createTestLanguageService(files, { driverType, diagnostics: true });
        expect(allDiagnostics(ls, abs("mid.c")).map(codeAndMessage)).toEqual([]);
    });
});
