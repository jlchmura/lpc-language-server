int main(int a) {    
    return 1;
}

int test(int main) {
    // `main` should correctly resolve to the function, not the `main` parameter
    return main(1);        
}

int test2() {
    int main = 0;

    // `main` should correctly resolve to the function, not the `main` variable
    return main(1);    
}
