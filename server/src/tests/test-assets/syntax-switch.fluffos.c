
/* fluffos allows open ended ranges in case statements */
void func() {
    int n ;

    switch(n) {
        case ..5:
            write("n is less than or equal to 5\n") ;
            break;
        case 6:
            write("n is 6\n") ;
            break;
        case 7.. :
            write("n is greater than or equal to 7\n") ;
            break;
    }
}
