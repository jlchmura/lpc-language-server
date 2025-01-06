test() {
    /** @type {"object.c"*} */
    object* arr = ({});        
    foreach(object ob in arr) {
        ob->query_number();
    }
}

// @files object.c