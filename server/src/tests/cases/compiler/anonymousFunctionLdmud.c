// Inline `function(...) { ... }` expressions are a FluffOS construct. Under LDMud
// the parser still produces a well-formed node (no syntactic cascade) and the
// checker reports a single grammar error -- consumed here by @lpc-expect-error.
// https://github.com/jlchmura/lpc-language-server/pull/331
void f() {
    // @lpc-expect-error: anonymous function expressions are FluffOS-only
    function g = function(int a, int b) { return a + b; };
}

// @driver: ldmud
// @errors: 0
