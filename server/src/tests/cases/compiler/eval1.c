test() {
    object mock = new ("object.c");    
    expect("foo", (: ({
        // @lpc-expect-error: foo should not exist
        assert_equal($(mock)->foo(), 1)
    }) :));
}

void expect(string lbl, function test) {}
void assert_equal(mixed a, mixed b) {}

/**
 * This test checks the the $(..) eval expression.
 * The checker should return the type of mock object, not any.
 * 
 * To test this, we try to call a function that doesn't exist
 * and expect and error.  This is done specifically because
 * if the checker was not working and returned any for $(mock)
 * an unresolvable property access would not throw an error.
 * 
 */

// @driver: fluffos
// @files: object.c