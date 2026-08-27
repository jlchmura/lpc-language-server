// Mirror of variantKeywordsLdmud.c: `bytes` is NOT a type under FluffOS (which
// spells the byte buffer `buffer`), so using it as a parameter type is rejected --
// it scans as an identifier, so `bytes b` reads as two adjacent identifiers.
// Guards that the demotion actually happens.

void f(bytes b) {
}

// @driver: fluffos
// @errors: 1
