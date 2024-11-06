// @driver: fluffos

// struct declaration and instantiation using new keyword
// with shorthand property assignment
class Foo {
    int bar;
}

test() {
    class Foo foo;    
    foo = new(class Foo, 1);        
}