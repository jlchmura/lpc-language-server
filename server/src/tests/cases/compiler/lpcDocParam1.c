/**
 * 
 * @param {"object.c"} o 
 */
void test(object o) {
    o->query_number();
}

/**
 * 
 * @param {"object.c"*} o 
 */
void test2(object* o) {
    o->query_number();
}

/**
 * 
 * @param {"object.c" | string} o 
 */
void test3(mixed o) {
    if (!stringp(o)) {
        o->query_number();
    }
}

/**
 * 
 * @param {"object.c"* | string} o 
 */
void test4(mixed o) {
    if (!stringp(o)) {
        o->query_number();
    }    
}

// four forms of param type annotations, all of which 
// should correctly resolve o to object.c

// @files: object.c
// @driver: fluffos