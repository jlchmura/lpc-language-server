// @driver: fluffos
// parse the evalute expressions in closures
// (*$(foo)) and $(foo)
private object *apply_custom_filter(object *obs, function f, object tp) {
    return filter(obs, (: (*$(f))($1, $(tp)) :)) ;
}
