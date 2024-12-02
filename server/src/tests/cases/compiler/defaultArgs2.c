// @driver: fluffos 
// @errors: 1
// id should error because of string->int assignment
int query_id() { return 0; }
int id (int id: (: "" :)) {
    return member_array(id, query_id()) > -1;
}