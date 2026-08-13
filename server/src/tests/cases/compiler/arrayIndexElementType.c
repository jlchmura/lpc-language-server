// Indexing an array yields its element type, and a range yields the array itself.
//
// LPC's indexable types are compiler builtins rather than library declarations. TypeScript
// resolves `a[0]` through the `[n: number]: T` index signature on `Array<T>` in lib.d.ts, but
// `__LS__Array` is declared as a bare `object` with no members, so the structural
// indexed-access path had nothing to resolve against and every `arr[0]` came back `mixed`.
//
// Nothing downstream of an index was checked as a result. The visible symptom was a generic
// efun losing its type parameter: `element_of(names[0])` could not infer T from a `mixed`
// argument, so it reported `unknown` wherever no contextual type happened to pin it down.

void test() {
    string *names = ({ "alex", "amos" });
    string **groups = ({ ({ "alex" }), ({ "amos" }) });
    int *counts = ({ 1, 2 });
    string word = "hello";

    // element access yields the element type
    string one = names[0];
    string *group = groups[0];
    string nested = groups[0][0];
    int count = counts[0];

    // a string is a sequence of characters, and a character is an int
    int letter = word[0];

    // a range slices, so it keeps the type it indexed
    string *some = names[0..1];
    string part = word[0..1];

    // ... including when one end is left open. A `..` with a missing side used to be dropped
    // by the parser, leaving the operand behind as a plain index, so `history[<40..]` was
    // typed as a single element instead of the slice it is.
    string *tail = names[1..];
    string *head = names[..1];
    string wordTail = word[1..];

    // a computed index is no different
    int idx = 0;
    string computed = names[idx];

    // and the element type is enforced
    int wrong = names[0];
}

// @driver: fluffos
// @errors: 1
