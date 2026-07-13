// Driver-specific type keywords, FluffOS side (see PR #331 discussion):
//   - `buffer` is a real type
//   - `status` / `symbol` are NOT keywords here, so they are ordinary identifiers
// The scanner decides this per driver, so the AST is uniform and no parser gate
// is needed.

buffer make_buffer() {
    buffer b;
    return b;
}

void takes_buffer(buffer b) {
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
