import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";

/**
 * `@var` retypes an inherited variable for the file that carries the tag, and for that file
 * only. The variable itself belongs to the inherited program, so its declared type is shared
 * by everything that inherits it: the base, the tagged child, and any sibling. The tag's type
 * has to be applied where the child reads the variable, not folded into the shared declared
 * type, or which one wins depends on which file the checker happened to reach first.
 */
const FIXTURES = lpc.normalizeSlashes(path.join(process.cwd(), "server/src/tests/cases/vartag"));

const fixture = (name: string) => lpc.normalizeSlashes(path.join(FIXTURES, name));

function programFor(rootNames: string[]) {
    const options: lpc.CompilerOptions = { driverType: lpc.LanguageVariant.FluffOS, diagnostics: true };
    const host = lpc.createCompilerHost(options);
    host.getDefaultLibFileName = () =>
        lpc.combinePaths(process.cwd(), lpc.getDefaultLibFolder(options), lpc.getDefaultLibFileName(options));
    return lpc.createProgram({ host, rootNames: rootNames.map(fixture), options });
}

/** Checks `order` in sequence with one checker, returning each file's diagnostics. */
function checkInOrder(order: string[]): Record<string, string[]> {
    const program = programFor(order);
    const result: Record<string, string[]> = {};
    for (const name of order) {
        const sourceFile = program.getSourceFile(fixture(name))!;
        result[name] = program.getSemanticDiagnostics(sourceFile).map(d => lpc.flattenDiagnosticMessageText(d.messageText, " "));
    }
    return result;
}

const childTyped = `Property 'nope_child' does not exist on type 'object "${fixture("var_object.c").replace(/\.c$/, "")}"'.`;

describe("an @var tag", () => {
    it("types the inherited variable in the tagged file", () => {
        expect(checkInOrder(["var_child.c"])["var_child.c"]).toEqual([childTyped]);
    });

    it("still applies when the base file was checked first", () => {
        expect(checkInOrder(["var_base.c", "var_child.c"])["var_child.c"]).toEqual([childTyped]);
    });

    it("does not leak into the base file when the child was checked first", () => {
        expect(checkInOrder(["var_child.c", "var_base.c"])["var_base.c"]).toEqual([
            "Property 'nope_base' does not exist on type 'object'.",
        ]);
    });

    it("does not leak into a sibling that inherits the same variable", () => {
        expect(checkInOrder(["var_child.c", "var_sibling.c"])["var_sibling.c"]).toEqual([
            "Property 'nope_sibling' does not exist on type 'object'.",
        ]);
    });
});
