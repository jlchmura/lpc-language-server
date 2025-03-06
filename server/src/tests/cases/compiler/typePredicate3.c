test() {
    object o;
    if (fn(o)) {        
        int id = o->query_number();
    }
}

/**
 * 
 * @param o 
 * @returns {o is "object.c"}
 */
fn(object o) {
    return 1;
}

// this tests for https://github.com/jlchmura/lpc-language-server/issues/238
// @files: object.c