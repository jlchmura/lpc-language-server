// @driver: fluffos
// Test combining new operators together

void test_mixed_operators() {
    int x, y, z;
    string s1, s2;

    // Combining ?? with ||=
    x = y ?? 10;
    x ||= 20;

    // Combining all three assignment operators
    int a, b, c;
    a ??= 1;
    b ||= 2;
    c &&= 3;

    // Nullish coalescing in expressions with other operators
    int result = (x ?? 0) + (y ?? 0);

    // Complex expression with C99 declarations
    int temp = x ?? y ?? 100;
    string message = s1 ?? s2 ?? "default";

    // Logical assignment in conditional
    if (z ??= 5) {
        int local = z * 2;  // C99-style declaration in if block
    }

    // Chaining different operators
    mixed value;
    value ??= "initial";
    value ||= "fallback";
}

/**
 * Tests that all new FluffOS operators work correctly together:
 * - Nullish coalescing (??)
 * - Logical assignments (||=, &&=, ??=)
 * - C99-style declarations
 * This ensures proper operator precedence and interaction.
 */
