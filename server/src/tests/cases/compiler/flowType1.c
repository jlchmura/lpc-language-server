object o;

test() {
    o = new("object.c");
    o->query_number();

    fn("", (: ({ 
        // query_number() should validate correctly here
        assert(o->query_number(), "something"),
    }) :) );
}

fn(string label, function f) {}
assert(mixed left, mixed right) {}

// @driver: fluffos
// @files: object.c