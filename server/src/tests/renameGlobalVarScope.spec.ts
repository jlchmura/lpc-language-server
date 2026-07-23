import * as lpc from "./_namespaces/lpc.js";
import { createTestLanguageService } from "./harness.js";

function makeLanguageService(files: Record<string, string>) {
    const svc = createTestLanguageService(files);
    // force check every file so LPC inherits are resolved
    const program = svc.ls.getProgram()!;
    for (const rel of Object.keys(files)) {
        program.getTypeChecker().getDiagnostics(program.getSourceFile(svc.abs(rel)));
    }
    return svc;
}

function renameCountsByFile(ls: lpc.LanguageService, fileName: string, pos: number) {
    const locations = ls.findRenameLocations(fileName, pos, false, false) ?? [];
    const byFile = new Map<string, number>();
    for (const loc of locations) {
        byFile.set(loc.fileName, (byFile.get(loc.fileName) ?? 0) + 1);
    }
    return byFile;
}

describe("LanguageService rename global var scope", () => {
    it("does not rename same-named globals in unrelated files", () => {
        const sourceA = `int foo;

test() {
    foo = 1;
    return foo;
}
`;
        const sourceB = `int foo;

other() {
    foo = 2;
    return foo;
}
`;
        const { ls, abs } = makeLanguageService({ "a.c": sourceA, "b.c": sourceB });
        const fileA = abs("a.c");
        const fileB = abs("b.c");

        const declPos = sourceA.indexOf("foo");
        const byFile = renameCountsByFile(ls, fileA, declPos);

        expect(byFile.get(fileB) ?? 0).toBe(0);
        expect(byFile.get(fileA)).toBe(3); // decl + 2 uses
    });

    it("renames inherited global var references in child files", () => {
        const sourceParent = `int foo;

test() {
    foo = 1;
    return foo;
}
`;
        const sourceChild = `inherit "parent";

child_fn() {
    foo = 2;
    return foo;
}
`;
        const { ls, abs } = makeLanguageService({ "parent.c": sourceParent, "child.c": sourceChild });
        const parent = abs("parent.c");
        const child = abs("child.c");

        const declPos = sourceParent.indexOf("foo");
        const byFile = renameCountsByFile(ls, parent, declPos);

        expect(byFile.get(parent)).toBe(3); // decl + 2 uses in parent
        expect(byFile.get(child)).toBe(2); // 2 uses in child
    });
});
