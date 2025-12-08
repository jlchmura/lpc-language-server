// @driver: fluffos
// Test logical assignment operators (||=, &&=, ??=)

void test_logical_assignment() {
    int x = 0;
    int y = 5;
    int z;
    string s = "hello";
    string empty = "";

    // Logical OR assignment (||=)
    x ||= 10;  // x is falsy (0), should assign 10
    y ||= 10;  // y is truthy (5), should not change

    // Logical AND assignment (&&=)
    int a = 1;
    int b = 0;
    a &&= 20;  // a is truthy, should assign 20
    b &&= 20;  // b is falsy, should not change

    // Nullish coalescing assignment (??=)
    z ??= 30;  // z is undefined, should assign 30
    y ??= 30;  // y is defined, should not change

    // With strings
    empty ||= "default";  // empty string is falsy, should assign
    s ||= "default";      // s is truthy, should not change

    // Chained assignments
    int m, n, p;
    m ??= n ??= p ??= 100;
}

/**
 * Tests logical assignment operators:
 * - ||= assigns only when left side is falsy
 * - &&= assigns only when left side is truthy
 * - ??= assigns only when left side is undefined/null
 * All operators short-circuit and only evaluate right side when needed.
 */
