// A type predicate must narrow to the type it asserts, even when the variable already has a
// more general named object type.
//
// `getNarrowedTypeWorker` picked between the current type `t` and the asserted candidate `c` by
// testing `isTypeStrictSubtypeOf(t, c)` first. That is only discriminating where the subtype
// relation is: for LPC named object types it is not, because an object with fewer members
// satisfies one with more just as readily. So `t` matched, the candidate was discarded, and the
// guard narrowed to nothing:
//
//     object v = vendors[0];        // typed as the living, from query_living_contents()
//     if (vendorp(v)) {
//         v->handle_list(str, po);  // Property 'handle_list' does not exist on 'living'
//     }
//
// The candidate is now tried first, which is what the comment on that code always said should
// happen for a predicate. `instanceof`-style checks are unaffected.

/**
 * @returns {ob is "narrowNamedObjectPredicate.vendor.c"} 1 if the object is a vendor
 */
int vendorp(mixed ob) {
    return 0;
}

void test() {
    /** @type {"narrowNamedObjectPredicate.living.c"} */
    object living = load_object("narrowNamedObjectPredicate.living.c");

    // without the guard the vendor-only member is not available
    if (vendorp(living)) {
        living->handle_list("shirts");
    }

    // a plain object narrows the same way
    object anything = load_object("narrowNamedObjectPredicate.vendor.c");
    if (vendorp(anything)) {
        anything->handle_list("shirts");
    }
}

// @driver: fluffos
// @files: narrowNamedObjectPredicate.living.c,narrowNamedObjectPredicate.vendor.c
// @errors: 0
