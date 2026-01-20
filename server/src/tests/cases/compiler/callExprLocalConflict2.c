string format_message(m) {
    return m;
}

void handle_remove (string message) {        
    string format_message = format_message(message);
}

// this tests that the `format_message` function will get resolved even though
// there is a block-scoped variable named `format_message`

// @driver: fluffos
// @errors: 0
