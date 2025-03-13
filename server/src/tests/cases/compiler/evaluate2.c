test() {
    object *obs;
    object tp;
    return filter(obs,
        (: (*$(f2))($1, $(tp)) :)
    );
}

/**
 * this should fail because f2 is not defined
 */

// @driver: fluffos
// @errors: 1
