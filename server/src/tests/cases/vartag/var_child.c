inherit "var_base";

/**
 * @var {"var_object.c"} thing
 */

void child_use() {
    int i = thing->query_number();
    thing->nope_child();
}
