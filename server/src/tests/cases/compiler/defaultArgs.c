// @driver: fluffos 
string query_id() { return 0; }
int id (mixed id: (: "" :)) {
    return member_array(id, query_id()) > -1;
}