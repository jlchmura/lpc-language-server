
object *arr = ({});
test() {
    object o;
    arr = arr + ({ o });
    arr -= ({ 0 });
    arr = arr - ({ 0 });
    arr = arr - ({ o });
    arr = arr | ({ o });
    arr = arr & ({ o });
    arr |= ({ o });
    arr &= ({ o });
    arr = arr | arr;
    arr = arr & arr;
    arr |= arr;
    arr &= arr;
}