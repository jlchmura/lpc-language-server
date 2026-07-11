/**
 * @param {int} &value - A reference parameter using ampersand notation
 */
void increment(int ref value) {
    value++;
}

/**
 * @param {mixed*} &arr - A reference array parameter
 * @param {mixed} value - A regular parameter
 */
void push_val(mixed ref *arr, mixed value) {
    arr += ({ value });
}

// @errors: 0
// @driver: fluffos
