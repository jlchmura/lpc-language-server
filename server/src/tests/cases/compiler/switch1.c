testSwitch(int i) {
    switch(i) {
        case 1:
            return i;
        case 2:
        case 3:
        case 4:        
            return i+1;        
        default:
            return 3;
    }
}