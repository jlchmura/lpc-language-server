struct container_entry { 
    string name;  
    object ob;
};

test() {
    struct container_entry container = (<container_entry> "root", player);
    struct container_entry *container_stack = ({ });
}

// @driver: ldmud
