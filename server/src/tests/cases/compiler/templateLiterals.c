// @driver: fluffos
// Template literals: backtick strings with ${expr} interpolation (FluffOS).

private string wrap(string kind) {
    // interpolation with an expression, nested literal braces, and a string default
    return `{{${kind}}}`;
}

void do_tests() {
    string name = "Alice";
    int count = 3;

    // no interpolation
    string a = `hello world`;

    // single + multiple interpolations
    string b = `Hello, ${name}!`;
    string c = `${name} has ${count} items`;

    // expression inside interpolation
    string d = `total: ${count + count}`;

    // escaped backtick and escaped dollar (no interpolation)
    string e = `escaped \` and \${name}`;

    // adjacency (FluffOS concatenates adjacent literals; JS does not)
    string f = `foo` `bar`;
    string g = "hi " `${name}!`;
    string h = `${name}: ` "done";

    // call a string-returning function whose body is a template
    string i = wrap("dir");
}
