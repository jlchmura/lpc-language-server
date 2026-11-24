// Inline `function ... { ... }` expressions are not FluffOS-only: LDMud has them as
// inline closures, `function [<type>] (<args>) { }` (doc/LPC/inline-closures), with the
// return type defaulting to mixed (prolang.y inline_opt_type). They are also the basis of
// LDMud's inline coroutines, `async function <type>() { }`.
// https://github.com/jlchmura/lpc-language-server/pull/331
void f() {
    closure g = function(int a, int b) { return a + b; };
    closure h = function int (int a, int b) { return a + b; };
}

// @driver: ldmud
// @errors: 0
