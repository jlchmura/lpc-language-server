inherit "fwd_base";

int later_fn(int x);

int earlier_fn(int x) { return x; }

mixed table() {
  return ({ #'later_fn, #'from_base, #'earlier_fn, #'sizeof });
}

int later_fn(int x) { return x; }
