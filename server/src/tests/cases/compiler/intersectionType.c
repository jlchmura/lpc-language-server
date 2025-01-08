
void test() {
    object o = new("object.c");
        
    object o2 = /** @type {"object.c" & "object2.c"} */(o);
    o2->query_number();  // only exists in object.c
    o2->query_name();    // only exists in object2.c
}

/**
 * This test validates intersection types.
 * If object & object2 are properly combined, then both call expressions on line 6 & 7
 * should be valid.
 */

// @driver: fluffos
// @files: object.c, object2.c