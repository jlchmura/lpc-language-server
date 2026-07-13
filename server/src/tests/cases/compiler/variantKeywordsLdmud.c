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

// `buffer` and `class` are just identifiers under LDMud -- usable as function names...
int buffer() { return 1; }
int class() { return 2; }

void f() {
    // ...and as variable names
    int b;
    int class;
    b = buffer();
    class = 3;
}

// @driver: ldmud
// @errors: 0
