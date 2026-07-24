import * as lpc from "./_namespaces/lpc.js";

/**
 * Validates the #include header-parse cache: a cache HIT must reproduce exactly what a
 * fresh parse of the header would produce (statements + macro effects), while giving
 * the includer independent node identities.
 */
describe("header parse cache", () => {
    // These tests validate cache *correctness* (reuse == fresh parse), independent of
    // the macro-density perf gate that decides *whether* a header is worth caching.
    beforeAll(() => lpc.setHeaderCacheCostGateForTests(false));
    afterAll(() => lpc.setHeaderCacheCostGateForTests(true));

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

    it("self-invalidates when the header text changes across builds", () => {
        // A persistent cache is shared across program builds; a changed header must not
        // be served from a stale entry. Simulate by sharing one cache while the header
        // source changes between parses.
        const cache = new Map<string, unknown>();
        let currentHeader = "int alpha();\n";
        const handler = {
            loadIncludeFile: () => ({ filename: "/v.h", source: currentHeader }),
            loadInclude: () => ({ uri: "/v.h", source: currentHeader, error: undefined }),
            headerParseCache: cache,
        } as unknown as lpc.LpcFileHandler;
        const opts = {
            languageVersion: lpc.ScriptTarget.LPC,
            globalIncludes: [],
            configDefines: new Map<string, string>(),
            fileHandler: handler,
        } as lpc.CreateSourceFileOptions;

        const src = `#include "v.h"\nint main() {}\n`;
        const first = lpc.createSourceFile("a.c", src, opts, true, lpc.ScriptKind.LPC);
        const firstInc = first.statements.find(s => s.kind === lpc.SyntaxKind.IncludeDirective) as lpc.IncludeDirective;

        // change the header, re-parse against the SAME cache
        currentHeader = "int beta(); int gamma();\n";
        const second = lpc.createSourceFile("b.c", src, opts, true, lpc.ScriptKind.LPC);
        const secondInc = second.statements.find(s => s.kind === lpc.SyntaxKind.IncludeDirective) as lpc.IncludeDirective;

        // must reflect the NEW header (2 declarations), not the stale 1
        expect(firstInc.statements.length).toEqual(1);
        expect(secondInc.statements.length).toEqual(2);
    });

    describe("nested includes", () => {
        const headers: Record<string, string> = {
            "/foo.h": `#include "bar.h"\n#define FOO_TAG 1\nint foo_fn();\n`,
            "/bar.h": `#define BAR_TAG 2\nint bar_fn();\n`,
        };
        function multiHandler(cache?: Map<string, unknown>): lpc.LpcFileHandler {
            const resolve = (name: string) => "/" + name.replace(/.*\//, "");
            return {
                loadIncludeFile: (_src: string, name: string) => ({ filename: resolve(name), source: headers[resolve(name)] }),
                loadInclude: (_src: string, name: string) => ({ uri: resolve(name), source: headers[resolve(name)], error: undefined }),
                headerParseCache: cache,
            } as unknown as lpc.LpcFileHandler;
        }
        function parseC(fileName: string, text: string, cache?: Map<string, unknown>): lpc.SourceFile {
            const options = {
                languageVersion: lpc.ScriptTarget.LPC,
                globalIncludes: [],
                configDefines: new Map<string, string>(),
                fileHandler: multiHandler(cache),
            } as lpc.CreateSourceFileOptions;
            return lpc.createSourceFile(fileName, text, options, true, lpc.ScriptKind.LPC);
        }
        const src = `#include "foo.h"\nint use() { return foo_fn() + bar_fn(); }\n`;

        it("caches a header with a nested include and reuses it structurally", () => {
            const cache = new Map<string, unknown>();
            parseC("seed.c", src, cache);              // foo.h + bar.h parsed & cached
            expect(cache.has("/foo.h")).toBe(true);
            expect(cache.has("/bar.h")).toBe(true);

            const hit = includeOf(parseC("b.c", src, cache));
            const fresh = includeOf(parseC("b.c", src, new Map()));
            const hitNodes = flatten(hit);
            const freshNodes = flatten(fresh);
            expect(hitNodes.length).toEqual(freshNodes.length);
            for (let i = 0; i < hitNodes.length; i++) {
                expect(hitNodes[i].kind).toEqual(freshNodes[i].kind);
                expect(hitNodes[i].pos).toEqual(freshNodes[i].pos);
            }
            // the nested bar.h include is present inside the reused foo.h
            const nested = flatten(hit).filter(n => n.kind === lpc.SyntaxKind.IncludeDirective);
            expect(nested.length).toBeGreaterThanOrEqual(1);
        });

        it("re-contributes cross-file import candidates on a nested-include hit", () => {
            const cache = new Map<string, unknown>();
            parseC("seed.c", src, cache);
            const hitFile = parseC("b.c", src, cache);
            const freshFile = parseC("b.c", src, new Map());
            // same set of import candidates whether reused or freshly parsed
            expect(hitFile.importCandidates.length).toEqual(freshFile.importCandidates.length);
        });

        it("folds a cache-hit nested header's deps into the outer fingerprint (noteReads)", () => {
            // Order matters: cache bar.h FIRST (direct include), so when foo.h is first
            // parsed its nested bar.h is a HIT -- noteReads must still record bar.h's
            // dependencies into foo.h's fingerprint. We then verify foo.h reuse is sound.
            const cache = new Map<string, unknown>();
            parseC("barfirst.c", `#include "bar.h"\nint x = BAR_TAG;\n`, cache); // caches bar.h
            expect(cache.has("/bar.h")).toBe(true);
            parseC("foofirst.c", src, cache);   // foo.h parsed, bar.h HIT during it
            expect(cache.has("/foo.h")).toBe(true);

            const hit = includeOf(parseC("b.c", src, cache));
            const fresh = includeOf(parseC("b.c", src, new Map()));
            expect(flatten(hit).length).toEqual(flatten(fresh).length);
        });
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

    it("restores macro-origin links (nodeMacroMap) on a hit", () => {
        // The header expands a macro; the expanded nodes carry a macro-origin link used
        // for hover. A reused parse must restore those links, matching a fresh parse.
        const hdr = `#define TWICE(x) ((x) + (x))\nint calc() { return TWICE(5); }\n`;
        const handler = {
            loadIncludeFile: () => ({ filename: "/m.h", source: hdr }),
            loadInclude: () => ({ uri: "/m.h", source: hdr, error: undefined }),
            headerParseCache: new Map<string, unknown>(),
        } as unknown as lpc.LpcFileHandler;
        const opts = (fh: lpc.LpcFileHandler) => ({
            languageVersion: lpc.ScriptTarget.LPC,
            globalIncludes: [],
            configDefines: new Map<string, string>(),
            fileHandler: fh,
        } as lpc.CreateSourceFileOptions);
        const doParse = (name: string, fh: lpc.LpcFileHandler) =>
            lpc.createSourceFile(name, `#include "m.h"\n`, opts(fh), true, lpc.ScriptKind.LPC);

        doParse("seed.c", handler);                 // populate
        const hitFile = doParse("b.c", handler);    // hit
        const freshFile = doParse("b.c", { ...handler, headerParseCache: new Map() } as lpc.LpcFileHandler);

        const macroLinks = (sf: lpc.SourceFile) =>
            flatten(includeOf(sf)).filter(n => sf.nodeMacroMap?.get(n) === "TWICE").length;

        const hitLinks = macroLinks(hitFile);
        expect(hitLinks).toBeGreaterThan(0);                 // links present on the clone
        expect(hitLinks).toEqual(macroLinks(freshFile));     // and match a fresh parse
    });

    it("stays correct when the cache evicts an entry (LRU-bounded)", () => {
        // Two distinct headers with a cap-1 cache: including the second evicts the
        // first, so re-including the first is a miss that must still parse correctly.
        const hdrs: Record<string, string> = {
            "/p.h": `#define P 1\nint p_fn();\n`,
            "/q.h": `#define Q 2\nint q_fn();\n`,
        };
        const resolve = (n: string) => "/" + n.replace(/.*\//, "");
        const handler = {
            loadIncludeFile: (_s: string, n: string) => ({ filename: resolve(n), source: hdrs[resolve(n)] }),
            loadInclude: (_s: string, n: string) => ({ uri: resolve(n), source: hdrs[resolve(n)], error: undefined }),
            headerParseCache: new lpc.LRUCache<string, unknown>(1),
        } as unknown as lpc.LpcFileHandler;
        const optsFor = (fh: lpc.LpcFileHandler) => ({
            languageVersion: lpc.ScriptTarget.LPC,
            globalIncludes: [],
            configDefines: new Map<string, string>(),
            fileHandler: fh,
        } as lpc.CreateSourceFileOptions);
        const parseP = (name: string, fh: lpc.LpcFileHandler) =>
            includeOf(lpc.createSourceFile(name, `#include "p.h"\nint u(){ return p_fn(); }\n`, optsFor(fh), true, lpc.ScriptKind.LPC));

        parseP("a.c", handler);                                   // caches p.h
        // include q.h to evict p.h (cap 1)
        lpc.createSourceFile("b.c", `#include "q.h"\n`, optsFor(handler), true, lpc.ScriptKind.LPC);
        expect((handler.headerParseCache as Map<string, unknown>).has("/p.h")).toBe(false); // evicted

        const afterEvict = parseP("c.c", handler);               // miss -> re-parse
        const fresh = parseP("fresh.c", { ...handler, headerParseCache: new Map() } as lpc.LpcFileHandler);
        expect(flatten(afterEvict).length).toEqual(flatten(fresh).length);
    });
});

describe("header cache cost gate", () => {
    // Gate ENABLED here (the default): only macro-heavy headers -- where cloning beats
    // re-parsing -- are cached. Cheap-to-parse headers are left uncached to avoid the
    // clone being slower than a re-parse.
    function parseWith(header: string): Map<string, unknown> {
        const cache = new Map<string, unknown>();
        const fh = {
            loadIncludeFile: () => ({ filename: "/x.h", source: header }),
            loadInclude: () => ({ uri: "/x.h", source: header, error: undefined }),
            headerParseCache: cache,
        } as unknown as lpc.LpcFileHandler;
        const opts = {
            languageVersion: lpc.ScriptTarget.LPC,
            globalIncludes: [],
            configDefines: new Map<string, string>(),
            fileHandler: fh,
        } as lpc.CreateSourceFileOptions;
        lpc.createSourceFile("a.c", `#include "x.h"\nint main() {}\n`, opts, true, lpc.ScriptKind.LPC);
        return cache;
    }

    it("does NOT cache a cheap pure-declaration header", () => {
        let hdr = "#ifndef X\n#define X\n";
        for (let i = 0; i < 50; i++) hdr += `int fn_${i}(int a);\n`;
        hdr += "#endif\n";
        expect(parseWith(hdr).has("/x.h")).toBe(false);
    });

    it("caches a macro-heavy header (cloning beats re-parsing)", () => {
        let hdr = "#ifndef X\n#define X\n#define SQ(v) ((v)*(v))\n";
        for (let i = 0; i < 50; i++) hdr += `int g_${i} = SQ(${i}) + SQ(${i}) + SQ(${i});\n`;
        hdr += "#endif\n";
        expect(parseWith(hdr).has("/x.h")).toBe(true);
    });
});

describe("LRUCache", () => {
    it("evicts the least-recently-used entry past the cap", () => {
        const m = new lpc.LRUCache<string, number>(2);
        m.set("a", 1);
        m.set("b", 2);
        m.set("c", 3); // evicts "a" (oldest)
        expect(m.has("a")).toBe(false);
        expect(m.get("b")).toBe(2);
        expect(m.get("c")).toBe(3);
        expect(m.size).toBe(2);
    });

    it("a get() marks an entry most-recently-used", () => {
        const m = new lpc.LRUCache<string, number>(2);
        m.set("a", 1);
        m.set("b", 2);
        expect(m.get("a")).toBe(1); // "a" is now most-recent
        m.set("c", 3);              // evicts "b", not "a"
        expect(m.has("a")).toBe(true);
        expect(m.has("b")).toBe(false);
        expect(m.has("c")).toBe(true);
    });

    it("re-setting an existing key refreshes its recency without growing size", () => {
        const m = new lpc.LRUCache<string, number>(2);
        m.set("a", 1);
        m.set("b", 2);
        m.set("a", 10); // refresh "a"
        m.set("c", 3);  // evicts "b"
        expect(m.size).toBe(2);
        expect(m.get("a")).toBe(10);
        expect(m.has("b")).toBe(false);
    });
});
