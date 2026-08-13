// `(: foo :)` is a function pointer to foo, so the closure carries foo's signature.
//
// The checker derived only the *return type* of the referenced function, so `(: vendorp :)`
// came out as `int function()` -- no parameters, and no type predicate. That made the pointer
// form unusable as a callback contract: nothing could check its arity, and a guard handed to an
// efun lost the very thing that made it a guard.
//
// The `(: vendorp($1) :)` form is unaffected; it keeps its synthesized `$N` parameters.

/**
 * @returns {ob is "inlineClosureFunctionPointer.vendor.c"} 1 if the object is a vendor
 */
int vendorp(mixed ob) {
    return 0;
}

int takes_two(string a, int b) {
    return 0;
}

void test() {
    // the pointer form borrows the target's parameter list ...
    function guard = (: vendorp :);
    guard(load_object("inlineClosureFunctionPointer.vendor.c"));

    function two = (: takes_two :);
    two("a", 1);

    // ... and the predicate survives, so calling through the pointer still narrows
    object thing = load_object("inlineClosureFunctionPointer.vendor.c");
    if (guard(thing)) {
        thing->handle_list("shirts");
    }

    // the ordinary inline form is unchanged
    function inline_form = (: vendorp($1) :);
    inline_form(thing);
}

// @driver: fluffos
// @files: inlineClosureFunctionPointer.living.c,inlineClosureFunctionPointer.vendor.c
// @errors: 0
