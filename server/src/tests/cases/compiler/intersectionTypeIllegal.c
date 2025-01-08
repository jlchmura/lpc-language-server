
void test() {
    string & object foo;    
}

/**
 * This should produce two parser errors because intersection types
 * are only allowed inside LPCDoc
 */

// @driver: fluffos
// @errors: 2