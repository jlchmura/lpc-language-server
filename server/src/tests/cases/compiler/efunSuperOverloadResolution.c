// An `efun::` call that lost its return type took the surrounding call down with it.
//
// filter() overloads on array vs string|mapping. With `efun::all_inventory()` evaluating to
// `mixed`, the array overload never matched and resolution fell through to the string|mapping
// form, reporting that `string | mapping` was not assignable to an object array -- which read
// as a bug in filter's signature rather than in the efun:: call feeding it.

object *interactive_contents() {
    return filter(efun::all_inventory(), (: $1 :));
}

// @driver: fluffos
// @errors: 0
