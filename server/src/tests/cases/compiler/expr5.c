// unit test for https://github.com/jlchmura/lpc-language-server/issues/104
test(string mode) {
    string pathPrivs;

    // if expression parsing is incorrect, then the following will
    // be parsed as !(pathPrivs && mode == "read")
    // which will cause the mode=="write" test to report an 
    // unintentional comparison error.
    if (!pathPrivs && mode == "read") {            
        return;
    }
    
    if (mode=="write") {
        return;
    }
} 