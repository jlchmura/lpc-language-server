// Driver-specific type keywords, FluffOS side (see PR #331 discussion):
//   - `buffer` and `class` are real types (LDMud uses `struct` for structures)
//   - `status` / `symbol` are NOT keywords here, so they are ordinary identifiers
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

void f() {
    // status / symbol are just identifiers under FluffOS
    int status;
    int symbol;
    status = 1;
    symbol = 2;
}

// @driver: fluffos
// @errors: 0
