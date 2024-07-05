/** @internal */
export const emptyArray: never[] = [] as never[];

/**
 * Type of objects whose values are all of the same type.
 * The `in` and `for-in` operators can *not* be safely used,
 * since `Object.prototype` may be modified by outside code.
 */
export interface MapLike<T> {
    [index: string]: T;
}

const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Indicates whether a map-like contains an own property with the specified key.
 *
 * @param map A map-like.
 * @param key A property key.
 *
 * @internal
 */
export function hasProperty(map: MapLike<any>, key: string): boolean {
    return hasOwnProperty.call(map, key);
}
