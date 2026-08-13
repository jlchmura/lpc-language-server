// @driver: ldmud
// An open-ended range still slices.
//
// The parser only built a RangeExpression when the *right* operand was present, so `arr[2..]`
// and LDMud's `arr[<40..]` lost their range node and the start operand was left behind as a
// plain index. Once indexing became typed that surfaced as a slice being reported as a single
// element -- `__History = __History[<40..]` claiming string was not assignable to string*.

test() {
    string *history = ({ "a", "b" });

    // open end, counting from the start and from the end
    history = history[1..];
    history = history[<40..];

    // open start, for symmetry
    history = history[..1];

    // and a plain index is still an element
    string one = history[0];
    string last = history[<1];
}
