test() {
    string *msgs = ({ "foo", "bar", "baz" });
    string *body = ({ });
    
    // $1 should get infered as string based on the
    // type of the msgs array
    body += map(msgs, (: fn("tell", $1) :));        
}

fn(string type, string msg) {
    return type + msg;
}

// Tests LambdaInference of $1 parameter
// @driver: fluffos
