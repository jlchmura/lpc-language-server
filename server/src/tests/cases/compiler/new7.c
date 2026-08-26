// FluffOS maps both spellings to the same token: lexer_utils.cc's reswords[] has
// {"class", L_CLASS, 0} and {"struct", L_CLASS, 0}, both under #defines that are
// unconditional in options_internal.h. So `new(struct Foo)` is the same grammar
// production as `new(class Foo)` -- `L_NEW '(' L_CLASS ...` -- and the two
// spellings interchange freely.

struct Foo {
    int bar;
}

test() {
    struct Foo a;
    a = new(struct Foo);
    a.bar = 1;

    // declared with one spelling, constructed with the other
    class Foo b = new(class Foo);
    b.bar = 2;

    // named arguments work either way
    struct Foo c = new(struct Foo, bar: 3);
    c.bar = 4;
}

// @driver: fluffos
// @errors: 0
