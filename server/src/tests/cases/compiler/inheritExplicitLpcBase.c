// The .c sibling of inheritExplicitLpcBase.lpc. An explicit `.lpc` inherit
// must NOT bind to this file. Deliberately omits is_lpc_version().
string which_file() {
    return "inheritExplicitLpcBase.c";
}
