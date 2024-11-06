// @driver: ldmud
// switch with ranges
testSwitch(int i) {
    int j;
    switch(i) {
        case 1:
            return i;
        case 2:
        case 3..4:        
            j++;
            break;        
        // they can also have parens
        case (20+1) .. 30:
            j+=3;
            break;
        default:
            return 3;
    }
}