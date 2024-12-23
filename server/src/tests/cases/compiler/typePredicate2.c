test() {
    mixed o;
    if (fn(o)) {        
        int id = o->query_number();
    }
}

/**
 * 
 * @param o 
 * @returns {o is "object.c"}
 */
fn(mixed o) {
    return 1;
}

// @files: object.c