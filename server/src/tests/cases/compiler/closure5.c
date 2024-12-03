// @driver: fluffos
// @errors: 1
// parse the evalute expressions in closures
// (*$(foo)) and $(foo)
private object *filter_by_id(object *obs, string arg) {
    return filter(obs, (: $(arg2) :)) ; // arg2 not found
} 