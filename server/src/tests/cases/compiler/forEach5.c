// foreach over a mapping
mapping m = ([ "a": 1, "b": 2, "c": 3 ]);
void test() {
    foreach(string key, string val in m) {
    }
}

/**
 * This should produce a type error since the mapping keys are integers and `val` is a string
 */

// @errors: 1 
