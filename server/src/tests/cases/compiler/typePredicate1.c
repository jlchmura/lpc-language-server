// @errors: 1

test() {
    mixed o;
    if (fn(o)) {
        // this should fail because o is a string
        int s = o;
    } else {
        
    }
}

/**
 * 
 * @param o 
 * @returns {o is string}
 */
fn(mixed o) {
    return 1;
}