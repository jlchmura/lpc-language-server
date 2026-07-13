// Under FluffOS the same inline function expression is valid and produces no
// diagnostics (parse or grammar). Counterpart to anonymousFunctionLdmud.c.
// https://github.com/jlchmura/lpc-language-server/pull/331
void f() {
    function g = function(int a, int b) { return a + b; };
}

// @driver: fluffos
// @errors: 0
