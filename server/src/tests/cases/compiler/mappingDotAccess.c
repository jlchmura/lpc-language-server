// FluffOS mapping dot-access: `m.key` is sugar for `m["key"]`. Valid on
// mappings only, resolves to the mapping's value type (mixed here), and -
// unlike optional chaining - is a writable lvalue.

mapping data = ([
    "name": "Sup",
    "nested": ([ "deep": 1 ]),
]);

void test() {
    mixed a = data.name;              // dot-access
    mixed b = data["name"];           // equivalent bracket form
    mixed c = data.nested.deep;       // chained dot-access
    mixed d = data.nested["deep"];    // dot then bracket
    mixed e = data["nested"].deep;    // bracket then dot

    data.name = "changed";            // dot-access is a valid lvalue
    data.nested.deep = 2;
}

// @driver: fluffos
// @errors: 0
