mixed test(function *funcs, mixed result) {
    foreach(function f in funcs) {
        f(result);
    }
    return result;
}

/**
 * This tests FluffOS function pointer call syntax (f(args)).
 */

// @driver: fluffos
