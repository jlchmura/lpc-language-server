inherit "priv_a";
inherit "priv_b";

int f() {
  return a_call();
}

string g() {
  return b_call();
}
