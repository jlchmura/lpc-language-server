import { createTestLanguageService } from "./harness.js";

/**
 * `clone_object(X)` must contribute its target to the program's dependency graph even
 * when the argument is not a single string literal.
 *
 * Real code commonly builds the path by concatenation, usually via macros:
 *
 *     #define STD_BASE "obj/"
 *     #define STD_NPC  STD_BASE "npc.c"
 *     clone_object(STD_NPC);
 *
 * which expands to two adjacent literals (`"obj/" "npc.c"`). Every other import-candidate
 * form (inherit, new, property access, JSDoc) joins those parts with
 * getStringLiteralsTextRecursively; clone_object used to require a plain StringLiteral
 * and silently dropped anything else, so the target never entered the dep tree and the
 * checker reported "Cannot find object 'obj/npc.c'".
 */
function importsOf(files: Record<string, string>, mainRel: string): string[] {
    const { ls, abs } = createTestLanguageService(files);
    const program = (ls as any).getProgram();
    const sf: any = program.getSourceFile(abs(mainRel));
    return ((sf?.imports ?? []) as { text: string; }[]).map(i => i.text);
}

describe("clone_object import collection", () => {
    const npc = `int id() { return 1; }\n`;

    it("collects a plain string literal target (control)", () => {
        const main = `test() {\n    object o = clone_object("obj/npc.c");\n    return o;\n}\n`;
        expect(importsOf({ "obj/npc.c": npc, "main.c": main }, "main.c")).toContain("obj/npc.c");
    });

    it("collects a single-literal macro target (control)", () => {
        const main = `#define STD_NPC "obj/npc.c"\n\ntest() {\n    object o = clone_object(STD_NPC);\n    return o;\n}\n`;
        expect(importsOf({ "obj/npc.c": npc, "main.c": main }, "main.c")).toContain("obj/npc.c");
    });

    it("collects a concatenated (macro-built) target", () => {
        const main = `#define STD_BASE "obj/"\n#define STD_NPC STD_BASE "npc.c"\n\ntest() {\n    object o = clone_object(STD_NPC);\n    return o;\n}\n`;
        expect(importsOf({ "obj/npc.c": npc, "main.c": main }, "main.c")).toContain("obj/npc.c");
    });

    it("collects a directly concatenated literal target", () => {
        const main = `test() {\n    object o = clone_object("obj/" "npc.c");\n    return o;\n}\n`;
        expect(importsOf({ "obj/npc.c": npc, "main.c": main }, "main.c")).toContain("obj/npc.c");
    });
});
