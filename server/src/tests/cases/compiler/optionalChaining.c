// FluffOS optional chaining: `m?.key` (optional member) and `m?.[idx]`
// (optional index). Mapping-only; when the base isn't a mapping the driver
// short-circuits to undefined instead of erroring, so these never fault.

mapping data = ([ "key": ([ "sub": 1 ]) ]);

void test() {
    mapping m;                          // uninitialized -> undefined base

    mixed a = m?.key;                   // optional member on undefined base
    mixed b = m?.["key"];               // optional index on undefined base

    mixed c = data?.key?.sub;           // optional member chain
    mixed d = data?.["key"]?.sub;       // optional index then optional member
    mixed e = data.key?.missing?.deep;  // dot-access mixed with optional chain
}

// @driver: fluffos
// @errors: 0
