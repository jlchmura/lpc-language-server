// @files: object.c,std.c
test() {
    object o = clone_object("object.c");
    int i = o->query_number();
}