import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService } from "./harness.js";

/**
 * In FluffOS a variable holding a closure is callable by bare name: `f(x)`.
 *
 * Two consumers resolve that callee identifier, and they disagree about meaning.
 * `getTypeOfDottedName` -- a speculative probe used by control-flow analysis -- asks for
 * `SymbolFlags.Function`; `resolveCallExpression` asks for `SymbolFlags.Value`. A local
 * variable is not a Function symbol, so the probe misses. `getResolvedSymbol` used to
 * both report `Cannot find name` and cache the miss on the node (the cache is not keyed
 * on the requested meaning), so whichever consumer arrived first won permanently.
 *
 * Ordering matters, which is why this reproduces only in specific shapes. A plain
 * statement call is checked before flow analysis ever looks at it, so it was clean. Put
 * the call inside a loop and narrow a variable *above* it, and narrowing walks the loop's
 * back edge -- through the call -- before the call itself is checked. That inverts the
 * order and lights up the false positive. (In an editor the same inversion came from the
 * whole-file re-parse in `updateSourceFile`, which is why it only appeared after an edit.)
 */

function diagnosticsFor(source: string, driverType = lpc.LanguageVariant.FluffOS): string[] {
    const { ls, abs } = createTestLanguageService({ "test.c": source }, { driverType, diagnostics: true });
    return ls.getSemanticDiagnostics(abs("test.c"))
        .map(d => lpc.flattenDiagnosticMessageText(d.messageText, "\n"));
}

// The loop forces flow analysis to reach `cb()` via the back edge before the call is checked.
const loopCall = `void probe() {
    function cb = (: 1 :);
    int i;
    for (i = 0; i < 3; i++) {
        int y = i;
        cb();
    }
}
`;

const statementCall = `void probe(string *files) {
    function f = (: write($1) :);
    f(files);
}
`;

describe("calling a closure-valued variable by bare name (FluffOS)", () => {
    it("does not report the variable as an unresolved name", () => {
        expect(diagnosticsFor(statementCall).filter(m => m.includes("Cannot find name"))).toEqual([]);
    });

    it("does not report it when flow analysis reaches the call first", () => {
        // Regression: the speculative Function-meaning lookup used to report here and cache
        // its miss, so resolveCallExpression's Value fallback read back unknownSymbol.
        expect(diagnosticsFor(loopCall).filter(m => m.includes("Cannot find name"))).toEqual([]);
    });

    it("still reports a genuinely undefined call target", () => {
        const msgs = diagnosticsFor(`void probe() {\n    no_such_thing();\n}\n`);
        expect(msgs.some(m => m.includes("Cannot find name 'no_such_thing'"))).toBe(true);
    });

    it("still reports an undefined name reached through a loop back edge", () => {
        // The same shape as `loopCall`, but with no declaration -- the suppressed probe must
        // not swallow the real diagnostic that the Value-meaning lookup goes on to report.
        const msgs = diagnosticsFor(`void probe() {\n    int i;\n    for (i = 0; i < 3; i++) {\n        int y = i;\n        nope();\n    }\n}\n`);
        expect(msgs.some(m => m.includes("Cannot find name 'nope'"))).toBe(true);
    });
});

describe("goto-definition on a closure-valued variable call (FluffOS)", () => {
    function definitionAt(source: string, marker: string) {
        const { ls, abs } = createTestLanguageService({ "test.c": source }, {
            driverType: lpc.LanguageVariant.FluffOS,
            diagnostics: true,
        });
        return ls.getDefinitionAtPosition(abs("test.c"), source.indexOf(marker)) ?? [];
    }

    it("resolves the call target to the variable declaration", () => {
        // getSymbolOfNameOrPropertyAccessExpression narrows a call callee to SymbolFlags.Function
        // for the services layer too. Without a Value fallback this returned nothing, so
        // goto-definition and hover were dead on every such call.
        const defs = definitionAt(statementCall, "f(files)");
        expect(defs.length).toBe(1);
        expect(defs[0].name).toBe("f");
        expect(defs[0].textSpan.start).toBe(statementCall.indexOf("function f = ") + "function ".length);
    });

    it("still prefers a function over a same-named local", () => {
        // resolveCallExpression prefers a Function of that name; the services layer must agree,
        // so the Value fallback has to stay a fallback rather than replacing the narrowed lookup.
        const source = `string format_message(string m) {\n    return m;\n}\n\nvoid handle(string message) {\n    string format_message = format_message(message);\n}\n`;
        const defs = definitionAt(source, "format_message(message)");
        expect(defs.length).toBe(1);
        expect(defs[0].textSpan.start).toBe(source.indexOf("format_message(string m)"));
    });
});
