inherit "priv_a";
inherit "priv_b";

public string same_name() { return "three"; }

int f() {
  return a_call();
}

string g() {
  return b_call();
}
