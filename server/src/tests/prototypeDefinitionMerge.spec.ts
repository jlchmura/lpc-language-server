import * as lpc from "./_namespaces/lpc.js";
import * as path from "path";

/**
 * A prototype and its definition are one function, and which symbol table the pair lands
 * in follows the DEFINITION's access level -- not whichever declaration the binder reaches
 * first.
 *
 * FluffOS assigns the definition's flags over any prototype's wholesale
 * (define_new_function: `newfunc->flags = flags`), so `void f(); private void f() {}` is a
 * private function and the prototype's access level is simply discarded. Binding each
 * declaration by its own modifiers used to put a hidden definition in `members` and a
 * visible prototype in `locals`/`exports`, splitting one function into two symbols. The
 * call site then saw only one half: goto-def landed on the wrong declaration, the lpcdoc on
 * the prototype was lost, and argument checking ran against a signature the driver never
 * pairs with that call.
 *
 * The idiom this protects is the common one -- prototype in a header, definition in the .c
 * with `private`/`protected` added -- so the header fixtures live on disk under
 * cases/protomerge/ to exercise the include path rather than a synthetic single file.
 */
const VIRTUAL = lpc.normalizeSlashes(path.join(process.cwd(), "server/src/tests/cases/compiler/__protomerge.c"));

function build(source: string) {
    const root = process.cwd();
    const isVirtual = (fn: string) => !!fn && lpc.normalizeSlashes(fn) === VIRTUAL;
    const options: lpc.CompilerOptions = { driverType: lpc.LanguageVariant.FluffOS, diagnostics: true };
    const host = lpc.createCompilerHost(options);
    const origReadFile = host.readFile;
    const origFileExists = host.fileExists;
    host.readFile = (fn: string) => (isVirtual(fn) ? source : origReadFile.call(host, fn));
    host.fileExists = (fn: string) => (isVirtual(fn) ? true : origFileExists.call(host, fn));
    host.getDefaultLibFileName = () =>
        lpc.combinePaths(root, lpc.getDefaultLibFolder(options), lpc.getDefaultLibFileName(options));

    const program = lpc.createProgram({ host, rootNames: [VIRTUAL], options });
    return { program, sf: program.getSourceFile(VIRTUAL)! };
}

/** Number of declarations on the symbol the call in `source` resolves to. */
function declarationsAtCall(source: string): number {
    const { program, sf } = build(source);
    const node = lpc.getTouchingPropertyName(sf, source.indexOf("f(); }"));
    return program.getTypeChecker().getSymbolAtLocation(node)?.declarations?.length ?? 0;
}

/** Whether `f` is externally visible (`exports`) or hidden (`members`). */
function placementOf(source: string): "exports" | "members" | "neither" {
    const { program, sf } = build(source);
    program.getTypeChecker();
    const symbol = (sf as any).symbol;
    return symbol?.exports?.has("f") ? "exports" : symbol?.members?.has("f") ? "members" : "neither";
}

const MODIFIERS = ["", "public ", "private ", "protected ", "nomask ", "static "];

describe("a prototype and its definition are one symbol", () => {
    it("merges across every combination of access modifiers", () => {
        const split: string[] = [];
        for (const proto of MODIFIERS) {
            for (const def of MODIFIERS) {
                const source = `${proto}void f();\nvoid a() { f(); }\n${def}void f() { }\n`;
                if (declarationsAtCall(source) !== 2) {
                    split.push(`prototype "${proto.trim() || "none"}" + definition "${def.trim() || "none"}"`);
                }
            }
        }
        expect(split).toEqual([]);
    });

    it("merges a late prototype that follows the definition", () => {
        expect(declarationsAtCall(`void a() { f(); }\nprivate void f() { }\nvoid f();\n`)).toBe(2);
    });

    it("merges a header prototype with a private definition", () => {
        const dir = lpc.normalizeSlashes(path.join(process.cwd(), "server/src/tests/cases/protomerge"));
        const implPath = lpc.normalizeSlashes(path.join(dir, "proto_impl.c"));
        const options: lpc.CompilerOptions = { driverType: lpc.LanguageVariant.FluffOS, diagnostics: true };
        const host = lpc.createCompilerHost(options);
        host.getDefaultLibFileName = () =>
            lpc.combinePaths(process.cwd(), lpc.getDefaultLibFolder(options), lpc.getDefaultLibFileName(options));
        const program = lpc.createProgram({ host, rootNames: [implPath], options });
        const sf = program.getSourceFile(implPath)!;
        const text = lpc.sys.readFile(implPath)!;
        const node = lpc.getTouchingPropertyName(sf, text.indexOf("from_header();"));
        const declarations = program.getTypeChecker().getSymbolAtLocation(node)?.declarations ?? [];

        expect(declarations.length).toBe(2);
        expect(declarations.some(d => (lpc.getSourceFileOrIncludeOfNode(d) as any).fileName.endsWith("proto_head.h"))).toBe(true);
        expect(declarations.some(d => (lpc.getSourceFileOrIncludeOfNode(d) as any).fileName.endsWith("proto_impl.c"))).toBe(true);
    });
});

describe("the definition's access level decides visibility", () => {
    it("hides the pair when the definition is private", () => {
        expect(placementOf(`void f();\nprivate void f() { }\n`)).toBe("members");
    });

    it("hides the pair when the definition is protected", () => {
        expect(placementOf(`void f();\nprotected void f() { }\n`)).toBe("members");
    });

    it("exports the pair when the definition is unqualified, even after a private prototype", () => {
        expect(placementOf(`private void f();\nvoid f() { }\n`)).toBe("exports");
    });

    it("leaves a lone declaration where its own modifiers put it", () => {
        expect(placementOf(`private void f() { }\n`)).toBe("members");
        expect(placementOf(`void f() { }\n`)).toBe("exports");
    });
});
