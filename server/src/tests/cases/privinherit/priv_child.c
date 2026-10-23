inherit "priv_base";

int call_hidden() {
  return hidden_fn();
}

int read_hidden() {
  return hidden_var;
}
