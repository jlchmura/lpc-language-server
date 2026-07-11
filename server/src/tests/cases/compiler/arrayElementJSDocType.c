// An array declarator (`object *`) with a JSDoc @type that only narrows the
// element type must remain an array, so `+=` of an array literal is legal.
// https://github.com/jlchmura/lpc-language-server/issues/317

/** @type {"object.c"} */
private nosave object *mobs = ({});

void test() {
    /** @type {"object.c"} */
    object mob = load_object("object.c");

    mobs += ({ mob });
    mobs->query_number();
}

// @driver: fluffos
// @files: object.c
// @errors: 0
