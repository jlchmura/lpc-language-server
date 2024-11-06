// super accessor
string query_name() {
    string n = "obj"::query_name();
    return ::query_name();
}