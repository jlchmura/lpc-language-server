// `efun::foo()` must keep its return type in a file that inherits nothing.
//
// checkSuperExpression bails with errorType when the containing file has no base type --
// right for `::name` and `Parent::name`, which resolve against the inheritance chain, but
// `efun::name` names an efun directly and has nothing to do with inheritance. The bail-out
// ran before the fallback that handles it, so every `efun::` call in such a file evaluated
// to `mixed`. Simul-efun overrides, which use the form most, typically inherit nothing.
//
// super2.c already covers that the form is *allowed* here; this covers that it is typed.

test() {
    // explode() returns string*, so this is a real mismatch and must be reported
    int *bad = efun::explode("a", ",");

    // ... and the matching assignment must not be
    string *good = efun::explode("a", ",");
}

// @driver: fluffos
// @errors: 1
