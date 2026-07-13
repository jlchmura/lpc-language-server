// Mirror of variantKeywordsFluffos.c: `buffer` is NOT a type under LDMud, so using
// it as a parameter type is rejected (it scans as an identifier, so `buffer b`
// reads as two adjacent identifiers). Guards that the demotion actually happens.

void f(buffer b) {
}

// @driver: ldmud
// @errors: 1
