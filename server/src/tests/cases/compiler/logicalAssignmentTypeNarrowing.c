// @driver: fluffos
// Test type narrowing with logical assignment operators

void test_type_narrowing() {
    mixed x;
    int y;

    // Type narrowing with ??=
    x ??= 42;
    // After this, x should be narrowed to int | undefined union

    // Type narrowing with ||=
    y ||= 10;
    // y is int, should remain int after assignment

    // Type narrowing in conditionals
    mixed value;
    if (value ??= "default") {
        // value is now narrowed to non-null
    }

    // Type narrowing with &&=
    string s = "test";
    if (s &&= "modified") {
        // s is still string, narrowed to truthy
    }
}

/**
 * Tests that logical assignment operators properly narrow types in control flow.
 * This ensures the type checker understands how these operators affect the type
 * of the left-hand side variable.
 */
