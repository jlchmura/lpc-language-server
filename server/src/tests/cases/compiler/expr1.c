// various expressios
int fn() { return 1; }
testExpr() {
    int i = fn() + 1 * fn() ? 3 / 1 : 4 % 2;
    i++;
    i += (fn() * 2) + 1;
    i >>= 2;
    i <<= 2;
    i &= 2;
    i |= 2;
    i ^= 2;
    i--;
    i = i > 2 ? fn() : -i;
    return i;
}