// The companion to efunSuperReturnType.c: a file that *does* inherit must resolve `efun::`
// the same way. The fix skips the base-type requirement for the efun prefix, so this guards
// that it did not become a special case that only works when there is no base type.

inherit "efunSuperReturnTypeInherit.base.c";

test() {
    // explode() returns string*, so this is a real mismatch and must be reported
    int *bad = efun::explode("a", ",");

    // the inherited member still resolves through ordinary super access
    string n = ::base_name();
}

// @driver: fluffos
// @files: efunSuperReturnTypeInherit.base.c
// @errors: 1
