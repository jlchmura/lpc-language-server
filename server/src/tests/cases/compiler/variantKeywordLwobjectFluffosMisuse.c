// Mirror of variantKeywordsLdmud.c: `lwobject` is NOT a type under FluffOS, which
// has no lightweight objects, so using it as a parameter type is rejected -- it
// scans as an identifier, so `lwobject o` reads as two adjacent identifiers.
// Guards that the demotion actually happens.

void f(lwobject o) {
}

// @driver: fluffos
// @errors: 1
