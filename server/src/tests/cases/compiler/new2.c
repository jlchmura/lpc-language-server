// @driver: fluffos

// struct declaration and instantiation using new keyword
class Foo {
    int bar;
}

test() {
    class Foo foo;
    foo = new(class Foo);
    foo.bar = 1;
}