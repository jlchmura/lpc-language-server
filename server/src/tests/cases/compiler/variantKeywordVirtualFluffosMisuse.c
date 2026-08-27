// Mirror of variantKeywordsLdmud.c: `virtual` is a type modifier only under LDMud
// (L_VIRTUAL -> TYPE_MOD_VIRTUAL). Under FluffOS it scans as an identifier, so
// this reads as an expression statement followed by a declaration rather than a
// modified function. Guards that the demotion actually happens.

virtual int foo() { return 1; }

// @driver: fluffos
// @errors: 2
