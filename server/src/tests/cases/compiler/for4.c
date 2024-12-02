// for with multiple initializers
test() {
    int i,j,k;
    for (i=0,j=i,k=2; i<10; i++) {
      j = i;
      k = i;
    }
}