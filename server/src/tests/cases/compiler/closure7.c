test() {
    string *list;
    list = map(list, (: return $1[5..<2]+"h"; :));
}

/**
 * This tests for #206 https://github.com/jlchmura/lpc-language-server/issues/206
 * An inline closure can have a statement, ending with a semicolon
 */

// @driver: ldmud
