// Driver-specific type keywords, LDMud side (see PR #331 discussion):
//   - `status` / `symbol` are real types
//   - `buffer` is NOT a keyword here, so it is an ordinary identifier
// The scanner decides this per driver, so the AST is uniform and no parser gate
// is needed.

status query_status() {
    status s;
    return s;
}

symbol make_symbol() {
    symbol y;
    return y;
}

// `buffer`, `class` and `new` are just identifiers under LDMud -- usable as function
// names (LDMud constructs objects with clone_object(), not a `new` operator)...
int buffer() { return 1; }
int class() { return 2; }
int new() { return 3; }

void f() {
    // ...and as variable names
    int b;
    int class;
    int new;
    b = buffer();
    class = new();
    new = 4;
}

// @driver: ldmud
// @errors: 0
