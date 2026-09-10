import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService } from "./harness.js";

/**
 * Collects the string-literal parts of every `->` receiver in the file, in source
 * order. A macro that expands to adjacent string literals must contribute the same
 * parts on every use.
 */
function receiverParts(sf: lpc.SourceFile): string[][] {
    const out: string[][] = [];
    function walk(node: lpc.Node) {
        if (node.kind === lpc.SyntaxKind.PropertyAccessExpression) {
            const parts: string[] = [];
            (function collect(n: lpc.Node) {
                if (n.kind === lpc.SyntaxKind.StringLiteral) {
                    parts.push((n as lpc.StringLiteral).text);
                    return;
                }
                lpc.forEachChild(n, collect);
            })((node as lpc.PropertyAccessExpression).expression);
            out.push(parts);
        }
        lpc.forEachChild(node, walk);
    }
    walk(sf);
    return out;
}

describe("repeated expansion of a multi-token macro", () => {
    // parseList guards against a list element that consumes nothing by comparing the
    // scanner offset before and after. A macro body is scanned as its own stream with
    // its own offsets, so a statement whose last token expands a macro leaves the
    // scanner inside that body -- at the same offset the statement started at, whenever
    // the previous statement began with the same macro. That looked like "no progress",
    // and the recovery step ate the macro's first token: every other use of a mudlib
    // object-path macro lost its leading directory.
    it("keeps every token of an implied string concat on each use", () => {
        const source = `#define A  "aa" "bb" "cc" "dd"

void go() {
  A->p1(1);
  A->p2(1);
  A->p3(1);
  A->p4(1);
}
`;
        const { ls, fileName } = createTestLanguageService({ "test.c": source });
        const sf = ls.getProgram()!.getSourceFile(fileName)!;

        expect(receiverParts(sf)).toEqual([
            ["aa", "bb", "cc", "dd"],
            ["aa", "bb", "cc", "dd"],
            ["aa", "bb", "cc", "dd"],
            ["aa", "bb", "cc", "dd"],
        ]);
    });

    it("resolves a nested object-path macro the same way every time", () => {
        const daemon = `void pre_walk() {}
void post_walk() {}
`;
        const caller = `#define DIR_ADM      "/adm/"
#define DIR_DAEMONS  DIR_ADM "daemons/"
#define MOVE_D       DIR_DAEMONS "movement"

void go() {
  MOVE_D->pre_walk();
  MOVE_D->post_walk();
}
`;
        const { ls, fileName } = createTestLanguageService({
            "test.c": caller,
            "adm/daemons/movement.c": daemon,
        });
        const sf = ls.getProgram()!.getSourceFile(fileName)!;

        expect(receiverParts(sf)).toEqual([
            ["/adm/", "daemons/", "movement"],
            ["/adm/", "daemons/", "movement"],
        ]);

        // and the object path the checker actually resolves is the whole path on both
        // uses -- the truncated one used to reach the checker as `daemons/movement`.
        // (The test host has no lib root, so neither use resolves; what matters is that
        // they fail the same way rather than one of them losing `/adm/`.)
        const notFound = ls.getSemanticDiagnostics(fileName)
            .map((d) => lpc.flattenDiagnosticMessageText(d.messageText, "\n"))
            .filter((m) => m.startsWith("Cannot find object"));
        expect(notFound.length).toBeGreaterThan(0);
        for (const message of notFound) {
            expect(message).toBe("Cannot find object '/adm/daemons/movement'.");
        }
    });
});
