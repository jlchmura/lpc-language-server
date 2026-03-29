// Case 1: & in doc but no ref in signature - SHOULD error
/**
 * @param {int} &value - claims ref but isn't
 */
void test1(int value) {
    value++;
}

// Case 2: no & in doc but ref in signature - SHOULD error
/**
 * @param {int} value - missing & for ref param
 */
void test2(int ref value) {
    value++;
}

// Case 3: & in doc AND ref in signature - should NOT error
/**
 * @param {int} &value - correctly documented ref
 */
void test3(int ref value) {
    value++;
}

// Case 4: no & and no ref - should NOT error
/**
 * @param {int} value - normal param
 */
void test4(int value) {
    value++;
}

// @errors: 2
// @driver: fluffos
