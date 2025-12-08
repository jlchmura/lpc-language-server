// @driver: fluffos
// Test C99-style variable declarations anywhere in blocks

void test_c99_declarations() {
    int x = 1;

    // Do some work
    x = x + 1;

    // Declare variable in middle of block (C99-style)
    int y = x * 2;

    // More code
    if (y > 0) {
        // Declaration inside if block
        string message = "positive";
        printf("%s\n", message);
    }

    // Another declaration after if
    int z = y + x;

    // Declaration in loop
    for (int i = 0; i < 10; i++) {
        int squared = i * i;
        // Use squared
    }

    // Declaration after loop
    string result = "done";
}

/**
 * Tests C99-style variable declarations that can appear anywhere within
 * function blocks, not just at the beginning. This allows more natural
 * code organization with variables declared closer to where they're used.
 */
