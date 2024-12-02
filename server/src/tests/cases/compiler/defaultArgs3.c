// @driver: fluffos 
int query_id() { return 0; }
int id (string id: (: "" :)) {
    return member_array(id, query_id()) > -1;
}