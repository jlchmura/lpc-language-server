test() {

    object "object.c" ob;
    ob->query_number();

}

// make sure LDMud named objects are parsed
// and imports resolved

// @driver: ldmud
// @files: object.c