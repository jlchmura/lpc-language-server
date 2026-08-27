// Driver-specific type keywords, FluffOS side (see PR #331 discussion):
//   - `buffer` and `class` are real types (LDMud uses `struct` for structures)
//   - `bytes` / `closure` / `deprecated` / `lwobject` / `status` / `symbol` / `virtual`
//     are NOT keywords here, so they are ordinary identifiers
// The scanner decides this per driver, so the AST is uniform and no parser gate
// is needed.

buffer make_buffer() {
    buffer b;
    return b;
}

void takes_buffer(buffer b) {
}

class coord { int x; int y; }

void takes_class(class coord c) {
    c.x = 1;
}

// `new` is the FluffOS object/struct construction operator
class coord make_coord() {
    return new(class coord);
}

// `ref` marks a by-reference parameter in FluffOS (LDMud uses `&`)
void modifies(int ref n) {
    n = 42;
}

// by-reference arguments at a call site accept both `ref` and `&` in FluffOS
void call_it() {
    int a;
    modifies(ref a);
    modifies(&a);
}

// LDMud's type names (`bytes`, `closure`, `lwobject`) and modifiers (`deprecated`,
// `virtual`) have no counterpart in FluffOS, so the words are free to be function
// names here
int bytes() { return 7; }
int closure() { return 8; }
int deprecated() { return 9; }
int lwobject() { return 10; }
int virtual() { return 11; }

void f() {
    // ...and variable names -- all just identifiers under FluffOS
    int bytes;
    int closure;
    int deprecated;
    int lwobject;
    int status;
    int symbol;
    int virtual;
    bytes = 3;
    closure = 4;
    deprecated = 5;
    lwobject = 6;
    status = 1;
    symbol = 2;
    virtual = 7;
}

// @driver: fluffos
// @errors: 0
