import { createTestLanguageService } from "./harness.js";

/**
 * Goto-definition for a function that has a forward declaration (a prototype in a header)
 * and an implementation with a body:
 *
 *   test_head.h:  foo_def(int i);           // prototype (lpcdoc lives here)
 *   test_impl.c:  #include "test_head.h"
 *                 foo_def(int i) { ... }     // implementation
 *                 ... foo_def(5) ...          // call
 *
 * goto-definition from a call must land on the implementation body, not the header
 * prototype. (The resolved signature points at the prototype -- the first candidate -- so
 * the call path has to redirect to the declaration that actually has a body.)
 */
const header = `
/** a header */
foo_def(int i);
`;

const impl = `
#include "test_head.h"

foo_def(int i) {
    return i;
}

test() {
    int i = foo_def(5);
    return i;
}
`;

function setup() {
    return createTestLanguageService({ "test_head.h": header, "test_impl.c": impl });
}

describe("goto-definition with a header prototype + implementation", () => {
    it("from a call, lands on the implementation body, not the header prototype", () => {
        const { ls, abs } = setup();
        const pos = impl.indexOf("foo_def(5)");
        const defs = ls.getDefinitionAtPosition(abs("test_impl.c"), pos);

        expect(defs).toBeDefined();
        expect(defs!.length).toBeGreaterThan(0);
        // the first (navigated-to) definition must be the implementation, not the prototype
        expect(defs![0].fileName.endsWith("test_impl.c")).toBe(true);
        expect(defs!.some(d => d.fileName.endsWith("test_head.h"))).toBe(false);
    });
});
