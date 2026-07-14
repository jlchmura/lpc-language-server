// A space between '&' and the parameter name binds the same as the glued form,
// mirroring the FluffOS signature spelling `int & value`. Both should validate
// against a pass-by-reference parameter without error.

/**
 * @param {int} & value - spaced reference parameter
 */
void increment(int ref value) {
    value++;
}

/**
 * @param {mixed*} & arr - spaced reference array parameter
 * @param {mixed} value - a regular parameter
 */
void push_val(mixed ref *arr, mixed value) {
    arr += ({ value });
}

// @errors: 0
// @driver: fluffos
