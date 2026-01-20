void handle_remove (string message) {    
    if (message) {
        message("system", message, this_object(), ({}));
    }
}


// this tests that the `message` efun will get resolved even though
// there is a local variable named `message`

// @driver: fluffos
// @errors: 0
