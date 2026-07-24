import * as lpc from "./_namespaces/lpc.js";

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
