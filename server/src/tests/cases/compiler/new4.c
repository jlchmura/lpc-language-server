// @driver: fluffos

// struct declaration and instantiation using new keyword
// with named property assignment
class Foo {
    int bar;
    int baz;
}

test() {
    class Foo foo;    
    foo = new(class Foo, bar: 1, baz: 2);        
}