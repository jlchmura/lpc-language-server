// Mirror of variantKeywordsLdmud.c: `status` is NOT a type under FluffOS, so using
// it as a parameter type is rejected (it scans as an identifier, so `status s`
// reads as two adjacent identifiers). Guards that the demotion actually happens.

void f(status s) {
}

// @driver: fluffos
// @errors: 1
