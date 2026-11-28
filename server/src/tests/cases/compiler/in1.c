string test() {
    string in;
    in = "abc";
    return in;
}

/*
 * `in` is not a reserved word in LD. The driver warns once that using it as a name
 * is deprecated (prolang.y check_identifier, under the default `warn_deprecated`).
 */

// @driver: ldmud
// @errors: 1