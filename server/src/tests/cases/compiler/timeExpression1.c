// @driver: fluffos
// time_expression uses the same body grammar as catch: `(expr)` or `{ block }`.
int testTimeExpression() {
    int elapsed = time_expression(foo());
    int blockElapsed;

    blockElapsed = time_expression {
        int i;
        for (i = 0; i < 10; i++) {
            foo();
        }
    };

    // the result is the elapsed microsecond count, not the body's value
    return elapsed + blockElapsed;
}

int foo() {
    return 1;
}
