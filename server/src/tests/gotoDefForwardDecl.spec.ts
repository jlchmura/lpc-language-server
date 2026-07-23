import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";

/**
 * Goto-definition for a function that has a forward declaration (a prototype in a header)
 * and an implementation with a body. Fixtures live on disk under cases/gotodef/ so the
 * `#include` actually inlines -- the header's prototype and the body then merge into a
 * single symbol (declarations = [prototype, body]):
 *
 *   fwd_head.h:  foo_def(int i);           // prototype (lpcdoc lives here)
 *   fwd_impl.c:  #include "fwd_head.h"
 *                foo_def(int i) { ... }     // implementation
 *                ... foo_def(5) ...          // call
 *
 * The merged symbol lists the prototype first, so without help goto-def would land on the
 * header. Expected behavior:
 *   - from a call: the implementation body (not the prototype);
 *   - from a declaration name: both, implementation first (so the editor can jump between
 *     the header prototype and the body).
 *
 * This uses a compiler program (which inlines includes) and the same
 * GoToDefinition.getDefinitionAtPosition the language service calls.
 */
const dir = lpc.normalizeSlashes(path.join(process.cwd(), "server/src/tests/cases/gotodef"));
const implPath = lpc.normalizeSlashes(path.join(dir, "fwd_impl.c"));
const headPath = lpc.normalizeSlashes(path.join(dir, "fwd_head.h"));

function build() {
    const root = process.cwd();
    const options: lpc.CompilerOptions = { driverType: lpc.LanguageVariant.FluffOS, diagnostics: true };
    const host = lpc.createCompilerHost(options);
    host.getDefaultLibFileName = () => lpc.combinePaths(root, lpc.getDefaultLibFolder(options), lpc.getDefaultLibFileName(options));
    const program = lpc.createProgram({ host, rootNames: [implPath, headPath], options });
    return { program, sf: program.getSourceFile(implPath)!, text: lpc.sys.readFile(implPath)! };
}

function defsAt(program: lpc.Program, sf: lpc.SourceFile, pos: number) {
    return lpc.GoToDefinition.getDefinitionAtPosition(program, sf, pos) ?? [];
}

describe("goto-definition with a header prototype + implementation", () => {
    it("merges the prototype and implementation into one symbol", () => {
        const { program, sf, text } = build();
        const checker = program.getTypeChecker();
        const node = lpc.getTouchingPropertyName(sf, text.indexOf("foo_def(int i) {"));
        const sym = checker.getSymbolAtLocation(node);
        expect(sym?.declarations?.length).toBe(2);
    });

    it("from a call, lands on the implementation body, not the header prototype", () => {
        const { program, sf, text } = build();
        const defs = defsAt(program, sf, text.indexOf("foo_def(5)"));

        expect(defs.length).toBeGreaterThan(0);
        expect(defs[0].fileName.endsWith("fwd_impl.c")).toBe(true);
        expect(defs.some(d => d.fileName.endsWith("fwd_head.h"))).toBe(false);
    });

    it("from the implementation name, offers the header prototype too (implementation first)", () => {
        const { program, sf, text } = build();
        const defs = defsAt(program, sf, text.indexOf("foo_def(int i) {"));

        expect(defs[0].fileName.endsWith("fwd_impl.c")).toBe(true);
        expect(defs.some(d => d.fileName.endsWith("fwd_head.h"))).toBe(true);
    });
});
