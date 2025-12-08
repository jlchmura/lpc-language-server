// @driver: ldmud
// Test that nullish coalescing operators (?? and ??=) are not supported in LDMud

void test_nullish_operators_not_supported() {
    int x;
    int y = 42;
    string s;

    // ?? operator should report error in LDMud
    int result1 = x ?? 10;

    // ??= operator should report error in LDMud
    x ??= 20;

    // Chained ?? should report multiple errors
    int result3 = x ?? y ?? 100;

    // ||= operator SHOULD work in LDMud (no error expected)
    x ||= 30;
}

// @errors: 4
