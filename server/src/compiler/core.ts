import {
    Comparer,
    Comparison,
    EqualityComparer,
    SortedArray,
    SortedReadonlyArray,
} from "./corePublic";

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

/**
 * Safer version of `Function` which should not be called.
 * Every function should be assignable to this, but this should not be assignable to every function.
 *
 * @internal
 */
export type AnyFunction = (...args: never[]) => void;

/** @internal */
export const enum AssertionLevel {
    None = 0,
    Normal = 1,
    Aggressive = 2,
    VeryAggressive = 3,
}

/** @internal */
export function equateValues<T>(a: T, b: T) {
    return a === b;
}

/** @internal */
export function contains<T>(
    array: readonly T[] | undefined,
    value: T,
    equalityComparer: EqualityComparer<T> = equateValues
): boolean {
    if (array) {
        for (const v of array) {
            if (equalityComparer(v, value)) {
                return true;
            }
        }
    }
    return false;
}

/**
 * Does nothing.
 *
 * @internal
 */
export function noop(_?: unknown): void {}

function selectIndex(_: unknown, i: number) {
    return i;
}

/** @internal */
export function indicesOf(array: readonly unknown[]): number[] {
    return array.map(selectIndex);
}

function compareComparableValues(
    a: string | undefined,
    b: string | undefined
): Comparison;
function compareComparableValues(
    a: number | undefined,
    b: number | undefined
): Comparison;
function compareComparableValues(
    a: string | number | undefined,
    b: string | number | undefined
) {
    return a === b
        ? Comparison.EqualTo
        : a === undefined
        ? Comparison.LessThan
        : b === undefined
        ? Comparison.GreaterThan
        : a < b
        ? Comparison.LessThan
        : Comparison.GreaterThan;
}

/**
 * Compare two numeric values for their order relative to each other.
 * To compare strings, use any of the `compareStrings` functions.
 *
 * @internal
 */
export function compareValues(
    a: number | undefined,
    b: number | undefined
): Comparison {
    return compareComparableValues(a, b);
}

function stableSortIndices<T>(
    array: readonly T[],
    indices: number[],
    comparer: Comparer<T>
) {
    // sort indices by value then position
    indices.sort((x, y) => comparer(array[x], array[y]) || compareValues(x, y));
}

/**
 * Stable sort of an array. Elements equal to each other maintain their relative position in the array.
 *
 * @internal
 */
export function stableSort<T>(
    array: readonly T[],
    comparer: Comparer<T>
): SortedReadonlyArray<T> {
    const indices = indicesOf(array);
    stableSortIndices(array, indices, comparer);
    return indices.map(
        (i) => array[i]
    ) as SortedArray<T> as SortedReadonlyArray<T>;
}

/**
 * Calls the callback with (start, afterEnd) index pairs for each range where 'pred' is true.
 *
 * @internal
 */
export function getRangesWhere<T>(
    arr: readonly T[],
    pred: (t: T) => boolean,
    cb: (start: number, afterEnd: number) => void
): void {
    let start: number | undefined;
    for (let i = 0; i < arr.length; i++) {
        if (pred(arr[i])) {
            start = start === undefined ? i : start;
        } else {
            if (start !== undefined) {
                cb(start, i);
                start = undefined;
            }
        }
    }
    if (start !== undefined) cb(start, arr.length);
}

/**
 * Iterates through 'array' by index and performs the callback on each element of array until the callback
 * returns a truthy value, then returns that value.
 * If no such value is found, the callback is applied to each element of array and undefined is returned.
 *
 * @internal
 */
export function forEach<T, U>(
    array: readonly T[] | undefined,
    callback: (element: T, index: number) => U | undefined
): U | undefined {
    if (array) {
        for (let i = 0; i < array.length; i++) {
            const result = callback(array[i], i);
            if (result) {
                return result;
            }
        }
    }
    return undefined;
}


/** @internal */
export function length(array: readonly any[] | undefined): number {
    return array ? array.length : 0;
}

/** @internal */
export function some<T>(array: readonly T[] | undefined): array is readonly T[];
/** @internal */
export function some<T>(array: readonly T[] | undefined, predicate: (value: T) => boolean): boolean;
/** @internal */
export function some<T>(array: readonly T[] | undefined, predicate?: (value: T) => boolean): boolean {
    if (array) {
        if (predicate) {
            for (const v of array) {
                if (predicate(v)) {
                    return true;
                }
            }
        }
        else {
            return array.length > 0;
        }
    }
    return false;
}

/**
 * @return Whether the value was added.
 *
 * @internal
 */
export function pushIfUnique<T>(array: T[], toAdd: T, equalityComparer?: EqualityComparer<T>): boolean {
    if (contains(array, toAdd, equalityComparer)) {
        return false;
    }
    else {
        array.push(toAdd);
        return true;
    }
}

/**
 * Unlike `pushIfUnique`, this can take `undefined` as an input, and returns a new array.
 *
 * @internal
 */
export function appendIfUnique<T>(array: T[] | undefined, toAdd: T, equalityComparer?: EqualityComparer<T>): T[] {
    if (array) {
        pushIfUnique(array, toAdd, equalityComparer);
        return array;
    }
    else {
        return [toAdd];
    }
}
