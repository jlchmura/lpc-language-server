import * as lpc from "./_namespaces/lpc.js";

/**
 * A project check collects suggestion diagnostics, so both textual formatters have to survive
 * one. Two things were in the way, and only the second showed up when stdout was a pipe:
 *
 * - `DiagnosticCategory.Suggestion` stringifies to "suggestion", which a problem matcher has no
 *   name for and would quietly resolve to its default severity. It reports as `info`.
 * - `getCategoryFormat` answered a Suggestion with `Debug.fail("Should never get an Info
 *   diagnostic on the command line.")`. Only the colour formatter reaches it, and only when
 *   stdout is a TTY -- so piping the CLI was fine and running it as a task in a terminal exited
 *   1 with a crash. Hence the colour case here, which is the one that actually regressed.
 */
const host: lpc.FormatDiagnosticsHost = {
    getCurrentDirectory: () => "/",
    getCanonicalFileName: f => f,
    getNewLine: () => "\n",
};

function diag(category: lpc.DiagnosticCategory): lpc.Diagnostic {
    return {
        file: undefined,
        start: undefined,
        length: undefined,
        code: 6133,
        category,
        messageText: "'x' is declared but its value is never read.",
    };
}

describe("diagnostic severity in textual output", () => {
    it.each([
        ["Error", "error", lpc.DiagnosticCategory.Error],
        ["Warning", "warning", lpc.DiagnosticCategory.Warning],
        ["Suggestion", "info", lpc.DiagnosticCategory.Suggestion],
        ["Message", "info", lpc.DiagnosticCategory.Message],
    ])("writes %s as '%s' in plain output", (_name, word, category) => {
        expect(lpc.formatDiagnostic(diag(category), host)).toContain(`${word} LPC6133:`);
    });

    it.each([
        ["Error", lpc.DiagnosticCategory.Error],
        ["Warning", lpc.DiagnosticCategory.Warning],
        ["Suggestion", lpc.DiagnosticCategory.Suggestion],
        ["Message", lpc.DiagnosticCategory.Message],
    ])("formats a %s in colour output without failing", (_name, category) => {
        // The regression: this threw for Suggestion, taking the whole CLI run down.
        expect(() => lpc.formatDiagnosticsWithColorAndContext([diag(category)], host)).not.toThrow();
    });

    it("carries the info word through colour output too", () => {
        expect(lpc.formatDiagnosticsWithColorAndContext([diag(lpc.DiagnosticCategory.Suggestion)], host))
            .toContain("info");
    });
});
