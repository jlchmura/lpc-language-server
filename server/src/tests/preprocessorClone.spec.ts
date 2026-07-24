import * as lpc from "./_namespaces/lpc.js";

/**
 * Deep-clone of parsed subtrees underpins the #include header-parse cache: each file
 * that includes a header reuses an independent copy of a pristine, unbound parse.
 * These tests pin the two properties the cache relies on -- the clone is structurally
 * identical to the original, and it is fully independent (no shared node identities,
 * parents re-established, mutation-isolated).
 */
describe("cloneParsedNodes", () => {
    const source = `
int global_counter = 0;

#define SQUARE(x) ((x) * (x))

int compute(int a, int b) {
    int result = SQUARE(a) + b;
    if (result > 10) {
        for (int i = 0; i < result; i++) {
            result -= i;
        }
    } else {
        result = ({ 1, 2, 3 });
    }
    return result;
}

string greet(string name) {
    return "hello, " + name;
}
`;

    function parse(): lpc.SourceFile {
        return lpc.createSourceFile("clone-test.c", source, lpc.ScriptTarget.LPC, /*setParentNodes*/ true, lpc.ScriptKind.LPC);
    }

    /** Pre-order flatten of a subtree via forEachChild. */
    function flatten(node: lpc.Node): lpc.Node[] {
        const out: lpc.Node[] = [];
        const visit = (n: lpc.Node) => {
            out.push(n);
            lpc.forEachChild(n, visit);
        };
        visit(node);
        return out;
    }

    it("produces a structurally identical tree", () => {
        const sf = parse();
        const clones = lpc.cloneParsedNodes(sf.statements as readonly lpc.Node[]);

        expect(clones.length).toEqual(sf.statements.length);

        for (let i = 0; i < clones.length; i++) {
            const origNodes = flatten(sf.statements[i]);
            const cloneNodes = flatten(clones[i]);
            expect(cloneNodes.length).toEqual(origNodes.length);
            for (let j = 0; j < origNodes.length; j++) {
                expect(cloneNodes[j].kind).toEqual(origNodes[j].kind);
                expect(cloneNodes[j].pos).toEqual(origNodes[j].pos);
                expect(cloneNodes[j].end).toEqual(origNodes[j].end);
            }
        }
    });

    it("shares no node identities with the original", () => {
        const sf = parse();
        const origAll = new Set<lpc.Node>();
        sf.statements.forEach(s => flatten(s).forEach(n => origAll.add(n)));

        const clones = lpc.cloneParsedNodes(sf.statements as readonly lpc.Node[]);
        for (const c of clones) {
            for (const n of flatten(c)) {
                expect(origAll.has(n)).toBe(false);
            }
        }
    });

    it("re-establishes parent pointers within the clone", () => {
        const sf = parse();
        const clones = lpc.cloneParsedNodes(sf.statements as readonly lpc.Node[]);

        for (const root of clones) {
            const all = new Set<lpc.Node>(flatten(root));
            for (const n of all) {
                lpc.forEachChild(n, child => {
                    // every child's parent is the cloned parent, and lives in the clone
                    expect(child.parent).toBe(n);
                    expect(all.has(child.parent)).toBe(true);
                });
            }
        }
    });

    it("is mutation-isolated from the original", () => {
        const sf = parse();
        const clones = lpc.cloneParsedNodes(sf.statements as readonly lpc.Node[]);

        // mutate a clone; the original must be untouched
        const cloneNode = clones[0] as any;
        const beforePos = sf.statements[0].pos;
        cloneNode.pos = -999;
        expect(sf.statements[0].pos).toEqual(beforePos);
        expect(sf.statements[0].pos).not.toEqual(-999);
    });

    it("preserves prototype methods (getStart works on clones)", () => {
        const sf = parse();
        const clones = lpc.cloneParsedNodes(sf.statements as readonly lpc.Node[]);
        // getStart requires a live source file; positions are shared, so a clone's
        // getStart against the original SourceFile must match the original's.
        for (let i = 0; i < clones.length; i++) {
            expect(clones[i].getStart(sf)).toEqual(sf.statements[i].getStart(sf));
        }
    });
});
