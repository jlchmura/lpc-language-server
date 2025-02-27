test() {    
    /** @type {"object.c"*} */
    object *o = ({});

    // call other on an array is legal in fluffos
    string fn = "query_number";
    o->(fn)();
}

// @driver: fluffos
// @files: object.c
