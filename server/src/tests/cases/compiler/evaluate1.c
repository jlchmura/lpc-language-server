test() {
    object *obs;
    function f;
    object tp;
    return filter(obs,
        (: (*$(f))($1, $(tp)) :)
    );
}

// @driver: fluffos
