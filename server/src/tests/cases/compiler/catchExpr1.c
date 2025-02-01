void testCatches() {
    object o = clone_object("object.c");
    if (err=catch(o->query_number())) {
        write("error");
    }
}

// @files: object.c