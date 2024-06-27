class Foo {
    int a;
    string cool_var;
}
class Bar {
    string cool_var;
}

void main() {
    // parsing the fluffos _new class_ style syntax    
    mixed m = new(class Bar, cool_var: "old data");
    printf("Class cast test:\n");
    printf("cool_var = %s\n", ((class Bar)m)->cool_var);
    evaluate((: ((class Bar)$1)->cool_var = $2 :), m, "new data");
    printf("cool_var = %s\n", ((class Bar)m)->cool_var);
}