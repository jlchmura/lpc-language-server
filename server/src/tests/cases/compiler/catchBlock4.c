test() {
    object o = clone_object("object.c");
    catch(o->query_number(); publish);
}

// catch statements can have modifiers in LD

// @files: object.c
// @driver: ldmud
