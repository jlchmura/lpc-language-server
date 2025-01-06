test() {
    /** @type {"object.c"*} */
    object* arr = ({});    
    object ob;
    foreach(ob in arr) {
        ob->query_number();
    }
}

// @files object.c