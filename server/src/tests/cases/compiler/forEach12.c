/**
 * @type {([ string: ([ string: int ]) ])}
 */
private nosave mapping DIRECTIONS = ([
  "north" : (["dz": 0, "dy": -1, "dx": 0]),
]);

void f() {
  mapping *directions = ({});
  foreach(string dir, mapping info in DIRECTIONS) {
    directions += ({ ([ "dir": dir ]) + info });
  }
}

/**
 * The explicit `mapping` annotation on the destructured value variable must be
 * respected inside the loop body, so `info` is a mapping (not `mixed*`) and the
 * `+` operator applies cleanly.
 *
 * https://github.com/jlchmura/lpc-language-server/issues/318
 */

// @driver: fluffos
// @errors: 0
