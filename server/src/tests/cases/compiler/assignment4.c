// assign binary expression to a variable
test() {

    string foo = "foo";
    string bar = "bar";
    object o;

    // @lpc-expect-error: the result of the binary expression is a string
    int result = o && foo && bar;
}

/**
 * This checks that the result of a binary expression is not implicitly converted to an int.
 * The expression `o && foo && bar` evaluates to a string, and assigning it to
 * an int variable should raise an error.
 */
