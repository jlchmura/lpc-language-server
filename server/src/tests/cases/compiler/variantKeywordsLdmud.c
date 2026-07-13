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

// `buffer` is just an identifier under LDMud -- usable as a function name...
int buffer() { return 1; }

void f() {
    // ...and as a variable name
    int b;
    b = buffer();
}

// @driver: ldmud
// @errors: 0
