// assign binary expression to a variable
test() {
    string foo = "foo";
    string bar = "bar";
    object o;
        
    int result = !!(o && foo && bar);
}

/**
 * This is a valid way of using a binary expression in an assignment.
 * The expression `o && foo && bar` evaluates to a string, and the `!!` operator
 * converts it to an int, which is then assigned to the `result` variable
 * without raising an error. 
 */
