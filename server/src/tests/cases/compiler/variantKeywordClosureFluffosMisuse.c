// Mirror of variantKeywordsLdmud.c: `closure` is NOT a type under FluffOS, which
// has no closures at all -- its `(: :)` is a functional, and the driver refuses a
// local variable inside one. Using `closure` as a parameter type is rejected: it
// scans as an identifier, so `closure c` reads as two adjacent identifiers.
// Guards that the demotion actually happens.

void f(closure c) {
}

// @driver: fluffos
// @errors: 1
