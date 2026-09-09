// @driver: fluffos
// @errors: 1
// Statements inside a time_expression block need a real terminating semicolon.
// FluffOS rejects the first form with "syntax error, unexpected '}'".

int foo() {
    return 1;
}

int missingSemicolon() {
    return time_expression { foo() };
}

int withSemicolon() {
    return time_expression { foo(); };
}

int multipleStatements() {
    return time_expression {
        foo();
        foo();
    };
}
