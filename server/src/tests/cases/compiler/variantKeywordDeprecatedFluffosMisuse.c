// Mirror of variantKeywordsLdmud.c: `deprecated` is a type modifier only under
// LDMud (L_DEPRECATED -> TYPE_MOD_DEPRECATED). Under FluffOS it scans as an
// identifier, so this reads as an expression statement followed by a declaration
// rather than a modified function. Guards that the demotion actually happens.

deprecated int foo() { return 1; }

// @driver: fluffos
// @errors: 2
