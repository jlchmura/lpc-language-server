private int hidden_fn() { return 1; }
protected int shared_fn() { return 2; }
public int open_fn() { return 3; }

private int hidden_var = 1;
int shared_var = 2;

int base_caller() {
  return hidden_fn() + hidden_var;
}
