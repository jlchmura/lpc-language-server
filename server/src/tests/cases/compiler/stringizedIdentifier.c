// @driver: fluffos
// LDMud has no # stringify operator.
#define DEB(x) printf(#x ": %O\n", x)
test() {
  DEB("foo");
}
