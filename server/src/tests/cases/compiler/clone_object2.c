test() {
    object o = clone_object("object.c");
    // this should fail because query_number returns an int
    string i = o->query_number();
}
// @errors: 1
// @files: object.c,std.c