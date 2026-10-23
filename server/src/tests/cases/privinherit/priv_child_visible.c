inherit "priv_base";

int call_visible() {
  return shared_fn() + open_fn() + shared_var + base_caller();
}
