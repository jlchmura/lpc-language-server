int moo() {
    string err;
  
    err = catch {
      return 1;
    };
  
    return 2;
}

/**
 * This tests https://github.com/jlchmura/lpc-language-server/issues/242
 * current flow node should not be set to unreachable when a return has 
 * a catch ancestor.
 * 
 * In other words, `return 2` should not be marked as unreachable.
 */

// @driver: fluffos
