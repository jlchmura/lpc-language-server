// @driver: ldmud
// @errors: 1
// LDMud's switch body must start with a label (prolang.y: '{' switch_block '}', and every
// switch_block begins with switch_label), so the declaration before `case 1` is an error.
testSwitch(int i) {
    switch(i) {
        // code block before cases
        int j;
        case 1:
            return 1;
    }
}
