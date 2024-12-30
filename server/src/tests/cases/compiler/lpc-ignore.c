test() {
    // @lpc-ignore
    int i = "123";
    
    string j = 123;
}

/**
 * This file has 2 type errors, but the first should be ignored
 * because of the lpc-ignore directive
 */

// @errors: 1