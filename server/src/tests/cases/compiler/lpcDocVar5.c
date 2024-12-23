inherit "lpcDocVarTagBase";

object notOb;

/**
 * @var {"object.c"} notOb
 */
test() {
    
}

// this test should error because `notOb` does not exist in the inherited file

// @errors: 1
// @files: lpcDocVarTagBase.c, object.c