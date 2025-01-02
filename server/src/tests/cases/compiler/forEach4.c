// foreach over a mapping
void test() {
    foreach(string key, string val in ([ "a": 1, "b": 2, "c": 3 ])) {
    }
}

/**
 * This should produce a type error since the mapping keys are integers and `val` is a string
 */

// @errors: 1 
