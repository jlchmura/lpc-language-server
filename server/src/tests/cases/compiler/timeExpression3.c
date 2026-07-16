// @driver: fluffos
// @errors: 1
// The result is the elapsed microsecond count, never the type of the body.
void testResultType() {
    // fine: body is a string, but time_expression still yields int
    int elapsed = time_expression("hello");

    // error: int is not assignable to object
    object o = time_expression("hello");
}
