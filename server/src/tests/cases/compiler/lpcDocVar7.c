inherit "lpcDocVarTagBase";

/**
 * @var {"object.c"} baseOb
 * @returns {int}
 */
test() {
    int i = baseOb->query_number();
    return i;
}

// this test should error because var tags are not allowed in the same block as other lpcdoc tags

// @errors: 1
// @files: lpcDocVarTagBase.c, object.c