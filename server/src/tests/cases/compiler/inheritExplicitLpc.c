// An explicit `.lpc` inherit must resolve to the .lpc file even when a sibling
// .c file of the same name exists (inheritExplicitLpcBase.c).
inherit "inheritExplicitLpcBase.lpc";

test() {
    // is_lpc_version() is defined only in the .lpc version; if resolution
    // wrongly binds to inheritExplicitLpcBase.c this call is unresolved.
    int v = is_lpc_version();
}
