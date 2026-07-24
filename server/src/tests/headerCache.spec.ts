import * as lpc from "./_namespaces/lpc.js";

/**
 * Validates the #include header-parse cache: a cache HIT must reproduce exactly what a
 * fresh parse of the header would produce (statements + macro effects), while giving
 * the includer independent node identities.
 */
describe("header parse cache", () => {
    const headerSource = [
        "#ifndef H_H",
        "#define H_H",
        "#define HP_MAX 100",
        "int get_hp();",
        "int compute(int a) { return a > HP_MAX ? HP_MAX : a; }",
        "#endif",
        "",
    ].join("\n");

    function makeFileHandler(cache?: Map<string, unknown>): lpc.LpcFileHandler {
        return {
            loadIncludeFile: () => ({ filename: "/h.h", source: headerSource }),
            loadInclude: () => ({ uri: "/h.h", source: headerSource, error: undefined }),
            headerParseCache: cache,
        } as unknown as lpc.LpcFileHandler;
    }

    function parse(fileName: string, text: string, cache?: Map<string, unknown>): lpc.SourceFile {
        const options: lpc.CreateSourceFileOptions = {
            languageVersion: lpc.ScriptTarget.LPC,
            globalIncludes: [],
            configDefines: new Map<string, string>(),
            fileHandler: makeFileHandler(cache),
        } as lpc.CreateSourceFileOptions;
        return lpc.createSourceFile(fileName, text, options, /*setParentNodes*/ true, lpc.ScriptKind.LPC);
    }

    function includeOf(sf: lpc.SourceFile): lpc.IncludeDirective {
        const inc = sf.statements.find(s => s.kind === lpc.SyntaxKind.IncludeDirective) as lpc.IncludeDirective | undefined;
        if (!inc) throw new Error("no include directive found");
        return inc;
    }

    function flatten(node: lpc.Node): lpc.Node[] {
        const out: lpc.Node[] = [];
        const visit = (n: lpc.Node) => { out.push(n); lpc.forEachChild(n, visit); };
        visit(node);
        return out;
    }

    const includer = `#include "h.h"\nint use() { return get_hp() + HP_MAX; }\n`;

    it("populates the cache on first include", () => {
        const cache = new Map<string, unknown>();
        parse("a.c", includer, cache);
        expect(cache.has("/h.h")).toBe(true);
    });

    it("a cache hit reproduces a fresh parse structurally", () => {
        const cache = new Map<string, unknown>();
        parse("seed.c", includer, cache);          // populates cache
        const hit = includeOf(parse("b.c", includer, cache));   // cache hit
        const fresh = includeOf(parse("b.c", includer, new Map())); // fresh parse

        const hitNodes = flatten(hit);
        const freshNodes = flatten(fresh);
        expect(hitNodes.length).toEqual(freshNodes.length);
        for (let i = 0; i < hitNodes.length; i++) {
            expect(hitNodes[i].kind).toEqual(freshNodes[i].kind);
            expect(hitNodes[i].pos).toEqual(freshNodes[i].pos);
            expect(hitNodes[i].end).toEqual(freshNodes[i].end);
        }
    });

    it("gives the includer independent node identities on a hit", () => {
        const cache = new Map<string, unknown>();
        const seed = includeOf(parse("seed.c", includer, cache));
        const hit = includeOf(parse("b.c", includer, cache));

        const seedNodes = new Set<lpc.Node>(flatten(seed));
        for (const n of flatten(hit)) {
            expect(seedNodes.has(n)).toBe(false);
        }
        // parents within the hit clone chain back up to its own include directive
        expect(hit.statements.length).toBeGreaterThan(0);
        for (const s of hit.statements) {
            expect(s.parent).toBe(hit);
        }
    });

    it("replays the header's macro definitions (HP_MAX expands after a hit)", () => {
        // With replay working, `HP_MAX` in the includer expands to 100 identically
        // whether the header was freshly parsed or reused. Compare the `use()` body.
        const cache = new Map<string, unknown>();
        parse("seed.c", includer, cache);
        const hitFile = parse("b.c", includer, cache);
        const freshFile = parse("b.c", includer, new Map());

        // the statement after the include is `int use() {...}` in both
        const hitUse = hitFile.statements.find(s => s.kind === lpc.SyntaxKind.FunctionDeclaration)!;
        const freshUse = freshFile.statements.find(s => s.kind === lpc.SyntaxKind.FunctionDeclaration)!;
        const hitNodes = flatten(hitUse);
        const freshNodes = flatten(freshUse);
        expect(hitNodes.length).toEqual(freshNodes.length);
        for (let i = 0; i < hitNodes.length; i++) {
            expect(hitNodes[i].kind).toEqual(freshNodes[i].kind);
        }
        // no parse errors introduced by the reuse
        expect(hitFile.parseDiagnostics.length).toEqual(freshFile.parseDiagnostics.length);
    });

    it("does NOT reuse when a dependency macro differs (guard already defined)", () => {
        const cache = new Map<string, unknown>();
        parse("seed.c", includer, cache);
        // Pre-define the include guard so the header body is skipped: fingerprint must
        // differ, forcing a fresh parse rather than a bogus reuse of the full body.
        const guarded = `#define H_H\n#include "h.h"\nint x = 1;\n`;
        const gInc = includeOf(parse("g.c", guarded, cache));
        // header body is guarded out -> no statements
        expect(gInc.statements.length).toEqual(0);
    });
});
