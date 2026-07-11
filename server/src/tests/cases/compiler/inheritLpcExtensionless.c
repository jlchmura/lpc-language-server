// verify that an extensionless inherit resolves to a .lpc file on disk
inherit "inheritLpcBase";

test() {
    // symbol defined in the inherited .lpc file
    int id = isLpcBase();
    string name = query_lpc_name();
}
