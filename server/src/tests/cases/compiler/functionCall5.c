string fn() { return ""; }

// return statement with a comma expression
int main() {
    return fn(), 1;
}

int foo = main();
