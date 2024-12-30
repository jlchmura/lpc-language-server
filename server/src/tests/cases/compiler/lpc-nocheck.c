// @lpc-nocheck

test() {
    int i = "123";
    string j = 123;
    ThisFunDoesNotExist();
}

/**
 * This file has multiple type errors, but they should be ignored 
 * because of the lpc-nocheck directive
 */

// @errors: 0
