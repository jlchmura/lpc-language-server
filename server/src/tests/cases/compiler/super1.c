// @errors: 2
// super accessor
// this will fail because this object does not inherit
string query_name() {
    string n = "obj"::query_name();
    return ::query_name();
}