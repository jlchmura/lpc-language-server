// @driver: fluffos
// `time_expression` is a reserved word (for the block/paren construct) but is also a
// driver efun declared in efuns/fluffos/internals.h as `int time_expression( mixed expr )`.
// That declaration must parse -- the keyword is allowed as a function-declaration name --
// so the efun gets a symbol, completion, and lpcdoc. The construct still parses normally.
int time_expression( mixed expr );

int useConstruct() {
    return time_expression {
        foo();
    };
}

int foo() {
    return 1;
}
