// @driver: fluffos
test2() {
    x = 1234567890123456;
    x =0x462d53c8abac0;
    x = 0xCAFEBABE;
    x = 1234_5678_9012_3456;
    x = 0xCAFE_BABE;
    x = 0xCA_FE_BA_BE;  
    x = 3_14_15.9_2_6;
    int bin_literal1 = 0b1010;
    int bin_literal2 = 0B1101;
    int bin_literal3 = 0b01010101;
    // Test arithmetic operations with binary literals
    int sum_bin_literals = 0b101 + 0B110;
    int mul_bin_literals = 0b1010 * 0b1101;
    // Test comparison with binary literals
    int comp_bin_literals = 0b100 < 0B1100;
}