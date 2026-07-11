// Case 1: JSDoc array type on scalar param - SHOULD error
/**
 * @param {string*} arr - The array
 * @return {mixed} - The last element
 */
mixed test1(string arr) {}

// Case 2: JSDoc scalar type on array param - SHOULD error but currently doesn't
/**
 * @param {string} arr - The array
 * @return {mixed} - The last element
 */
mixed test2(string *arr) {}

// Case 3: Matching types - should NOT error
/**
 * @param {string*} arr - The array
 */
void test3(string *arr) {}

// Case 4: Matching scalar - should NOT error
/**
 * @param {string} name - The name
 */
void test4(string name) {}

// @errors: 2
// @driver: fluffos
