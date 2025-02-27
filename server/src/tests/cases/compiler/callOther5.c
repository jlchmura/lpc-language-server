test() {    
    /** @type {"object.c"*} */
    object *o = ({});

    // call other on an array is legal in fluffos
    string fn = "query_number";
    o->(fn2)();
}

/*
 * fn2 should report as not able to resolve 
 */

// @driver: fluffos
// @files: object.c
// @errors: 1