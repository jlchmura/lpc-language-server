inherit "lpcDocVarTagBase";

/**
 * @var {"object.c"} baseOb
 */
test() {
    int i = baseOb->query_number();
}

// @files: lpcDocVarTagBase.c, object.c