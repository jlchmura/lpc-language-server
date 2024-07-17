export const libEntries: [string, string][] = [
    ["ldmud", "ldmud.efun.c"],
];

/**
 * An array of supported "lib" reference file names used to determine the order for inclusion
 * when referenced, as well as for spelling suggestions. This ensures the correct ordering for
 * overload resolution when a type declared in one lib is extended by another.
 *
 * @internal
 */
export const libs = libEntries.map(entry => entry[0]);
