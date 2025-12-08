// @driver: fluffos
// Test nullish coalescing operator (??)

void test_nullish_coalescing() {
    int x;
    int y = 42;
    string s;

    // Basic nullish coalescing
    int result1 = x ?? 10;  // x is undefined, should return 10
    int result2 = y ?? 10;  // y is defined, should return y (42)

    // Chained nullish coalescing
    int result3 = x ?? y ?? 100;

    // With different types
    string str_result = s ?? "default";

    // In expressions
    int calc = (x ?? 5) + (y ?? 0);
}

/**
 * Tests the nullish coalescing operator (??) which returns the right-hand side
 * only when the left-hand side is undefined/null, unlike || which also triggers
 * on falsy values like 0 or empty string.
 */
