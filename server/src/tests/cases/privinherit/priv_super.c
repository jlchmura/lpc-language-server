inherit "priv_base";

int call_hidden() {
  return priv_base::hidden_fn();
}
