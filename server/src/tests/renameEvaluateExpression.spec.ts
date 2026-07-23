import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService } from "./harness.js";

describe("LanguageService", () => {
    it("includes EvaluateExpression arguments in findReferences/findRenameLocations", () => {
        const source = `test(object who) {
    fn(who);

    function points;
    (*points)(who);
}

fn(object o) {}
`;

        const { ls, fileName } = createTestLanguageService({ "test.c": source });

        const declPos = source.indexOf("who");
        const evalArgPos = source.lastIndexOf("who");

        const program = ls.getProgram();
        expect(program).toBeDefined();
        const sourceFile = program!.getSourceFile(fileName);
        expect(sourceFile).toBeDefined();
        const touching = lpc.getTouchingPropertyName(sourceFile!, evalArgPos);
        expect(touching.kind).toBe(lpc.SyntaxKind.Identifier);
        let astIdentifierAtEvalArgPos: lpc.Identifier | undefined;
        const visit = (node: lpc.Node): void => {
            if (node.kind === lpc.SyntaxKind.Identifier && node.pos === evalArgPos) {
                astIdentifierAtEvalArgPos = node as lpc.Identifier;
            }
            lpc.forEachChild(node, visit);
        };
        visit(sourceFile!);
        expect(astIdentifierAtEvalArgPos).toBeDefined();
        expect(astIdentifierAtEvalArgPos).toBe(touching);
        const touchingSymbol = program!.getTypeChecker().getSymbolAtLocation(touching);
        expect(touchingSymbol?.name).toBe("who");

        const renameLocations = ls.findRenameLocations(fileName, declPos, /*findInStrings*/ false, /*findInComments*/ false);
        expect(renameLocations?.some((l) => l.textSpan.start === evalArgPos)).toBe(true);

        const referenced = ls.findReferences(fileName, declPos);
        const allReferenceSpans = referenced?.flatMap((s) => s.references.map((r) => r.textSpan.start)) ?? [];
        expect(allReferenceSpans.includes(evalArgPos)).toBe(true);
    });
});
