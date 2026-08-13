// An array literal whose elements are all the same literal must not fix the variable's element
// type at that literal.
//
// The union of `0 | 0 | 0` collapses to `0`, and nothing widens it the way a lone literal would
// be, so `int *c = ({ 0, 0, 0 })` narrowed c to `0*`. Arrays are mutable, so that is never the
// useful answer -- it rejected every later write:
//
//     c[2] = random(r);   // Type 'int' is not assignable to type '0'
//
// Note `({ 1, 2 })` was always fine: distinct literals form a union that widens on its own.
// Only the all-identical case reached this.

void test() {
    int *c = ({ 0, 0, 0, });
    c[0] = 64 + random(192);
    c[2] = random(255);

    string *names = ({ "a", "a" });
    names[0] = "b";

    mixed m = ({ 0, 0 });
    m[0] = 7;

    // distinct literals, which already widened
    int *d = ({ 1, 2 });
    d[0] = 9;

    // widening the element must not lose the element type itself
    string wrong = c[0];
}

// @driver: fluffos
// @errors: 1
