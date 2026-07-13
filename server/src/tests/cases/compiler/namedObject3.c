test() {

    object "object.c" ob;

}

// Named object types are an LDMud source construct. In FluffOS source they now parse
// (keeping the AST uniform) and are flagged by a checker grammar-check. `object.c` exists,
// so the ONLY diagnostic is the dialect grammar error -- if that check regressed, the type
// would resolve cleanly and this would drop to 0 errors.

// @driver: fluffos
// @files: object.c
// @errors: 1
