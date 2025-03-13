
void test() {
    fn()->query_either();
    fn2()->query_either();
    fn3()->query_either();
}

/**
 * @returns {object "objec" + "t.c" | object "object2.c"}
 */
object fn() { return 0; }

/**
 * @returns {object "objec" "t.c" | object "object2.c"}
 */
object fn2() { return 0; }

/**
 * @returns {object "object.c" | object "object2.c"}
 */
object fn3() { return 0; }

/**
 * this indirectly tests https://github.com/jlchmura/lpc-language-server/issues/251
 * 
 * The parser should not parse the bar token as part of the string literal binary expression
 * If parsed correctly, then the result of the function will be a proper union of named object types
 * and both of those will have the `query_either` method.
 * 
 */

// @files: object.c, object2.c
