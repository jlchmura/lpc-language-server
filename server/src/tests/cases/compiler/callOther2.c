test() {
    object o = clone_object("object.c");
    int i = o->query_number();
}

// @files: object.c
