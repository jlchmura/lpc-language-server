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

// `buffer`, `class`, `new` and `ref` are just identifiers under LDMud -- usable as
// function names (LDMud constructs objects with clone_object() and marks by-reference
// parameters with `&`, not a `ref` keyword)...
int buffer() { return 1; }
int class() { return 2; }
int new() { return 3; }
int ref() { return 5; }

void f() {
    // ...and as variable names
    int b;
    int class;
    int new;
    int ref;
    b = buffer();
    class = new();
    new = 4;
    ref = 6;
}

// LDMud passes by reference with `&`, both at the parameter and the call site
void modifies(int &n) {
    n = 42;
}

void call_it() {
    int a;
    modifies(&a);
}

// @driver: ldmud
// @errors: 0
