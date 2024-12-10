
object *arr = ({});
test() {
    object o;
    arr = arr + ({ o });
    arr -= ({ 0 });
    arr = arr - ({ 0 });
    arr = arr - ({ o });
}