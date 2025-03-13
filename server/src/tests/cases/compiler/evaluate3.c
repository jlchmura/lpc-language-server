test() {
    object *obs;
    function f;    
    return filter(obs,
        (: (*$(f))($1, $(tp2)) :)
    );
}

/**
 * this should fail because `tp2` is not defined
 */

// @driver: fluffos
// @errors: 1
