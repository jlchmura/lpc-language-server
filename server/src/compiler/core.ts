import { Comparer, Comparison, Debug, EqualityComparer, MapLike, Queue, SortedArray, SortedReadonlyArray, TextSpan } from "./_namespaces/lpc";

/** @internal */
export function memoize<T>(callback: () => T): () => T {
    let value: T;
    return () => {
        if (callback) {
            value = callback();
            callback = undefined!;
        }
        return value;
    };
}

/**
 * A version of `memoize` that supports a single primitive argument
 *
 * @internal
 */
export function memoizeOne<A extends string | number | boolean | undefined, T>(callback: (arg: A) => T): (arg: A) => T {
    const map = new Map<string, T>();
    return (arg: A) => {
        const key = `${typeof arg}:${arg}`;
        let value = map.get(key);
        if (value === undefined && !map.has(key)) {
            value = callback(arg);
            map.set(key, value);
        }
        return value!;
    };
}


/**
 * Returns its argument.
 *
 * @internal
 */
export function identity<T>(x: T) {
    return x;
}


/**
 * Appends a range of value to an array, returning the array.
 *
 * @param to The array to which `value` is to be appended. If `to` is `undefined`, a new array
 * is created if `value` was appended.
 * @param from The values to append to the array. If `from` is `undefined`, nothing is
 * appended. If an element of `from` is `undefined`, that element is not appended.
 * @param start The offset in `from` at which to start copying values.
 * @param end The offset in `from` at which to stop copying values (non-inclusive).
 *
 * @internal
 */
export function addRange<T>(to: T[], from: readonly T[] | undefined, start?: number, end?: number): T[];
/** @internal */
export function addRange<T>(to: T[] | undefined, from: readonly T[] | undefined, start?: number, end?: number): T[] | undefined;
/** @internal */
export function addRange<T>(to: T[] | undefined, from: readonly T[] | undefined, start?: number, end?: number): T[] | undefined {
    if (from === undefined || from.length === 0) return to;
    if (to === undefined) return from.slice(start, end);
    start = start === undefined ? 0 : toOffset(from, start);
    end = end === undefined ? from.length : toOffset(from, end);
    for (let i = start; i < end && i < from.length; i++) {
        if (from[i] !== undefined) {
            to.push(from[i]);
        }
    }
    return to;
}

/**
 * Gets the actual offset into an array for a relative offset. Negative offsets indicate a
 * position offset from the end of the array.
 */
function toOffset(array: readonly any[], offset: number) {
    return offset < 0 ? array.length + offset : offset;
}

/** @internal */
export const emptyArray: never[] = [] as never[];
/** @internal */
export const emptyMap: ReadonlyMap<never, never> = new Map<never, never>();

/** @internal */
export function length(array: readonly any[] | undefined): number {
    return array !== undefined ? array.length : 0;
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

/** @internal */
export const enum AssertionLevel {
    None = 0,
    Normal = 1,
    Aggressive = 2,
    VeryAggressive = 3,
}

function compareComparableValues(a: string | undefined, b: string | undefined): Comparison;
function compareComparableValues(a: number | undefined, b: number | undefined): Comparison;
function compareComparableValues(a: string | number | undefined, b: string | number | undefined) {
    return a === b ? Comparison.EqualTo :
        a === undefined ? Comparison.LessThan :
        b === undefined ? Comparison.GreaterThan :
        a < b ? Comparison.LessThan :
        Comparison.GreaterThan;
}

/**
 * Compare two numeric values for their order relative to each other.
 * To compare strings, use any of the `compareStrings` functions.
 *
 * @internal
 */
export function compareValues(a: number | undefined, b: number | undefined): Comparison {
    return compareComparableValues(a, b);
}


function stableSortIndices<T>(array: readonly T[], indices: number[], comparer: Comparer<T>) {
    // sort indices by value then position
    indices.sort((x, y) => comparer(array[x], array[y]) || compareValues(x, y));
}

/**
 * Safer version of `Function` which should not be called.
 * Every function should be assignable to this, but this should not be assignable to every function.
 *
 * @internal
 */
export type AnyFunction = (...args: never[]) => void;

/**
 * Stable sort of an array. Elements equal to each other maintain their relative position in the array.
 *
 * @internal
 */
export function stableSort<T>(array: readonly T[], comparer: Comparer<T>): SortedReadonlyArray<T> {
    const indices = indicesOf(array);
    stableSortIndices(array, indices, comparer);
    return indices.map(i => array[i]) as SortedArray<T> as SortedReadonlyArray<T>;
}

function selectIndex(_: unknown, i: number) {
    return i;
}

/** @internal */
export function indicesOf(array: readonly unknown[]): number[] {
    return array.map(selectIndex);
}

/**
 * Returns the last element of an array if non-empty, `undefined` otherwise.
 *
 * @internal
 */
export function lastOrUndefined<T>(array: readonly T[] | undefined): T | undefined {
    return array === undefined || array.length === 0 ? undefined : array[array.length - 1];
}

/** @internal */
export function some<T>(array: readonly T[] | undefined): array is readonly T[];
/** @internal */
export function some<T>(array: readonly T[] | undefined, predicate: (value: T) => boolean): boolean;
/** @internal */
export function some<T>(array: readonly T[] | undefined, predicate?: (value: T) => boolean): boolean {
    if (array !== undefined) {
        if (predicate !== undefined) {
            for (let i = 0; i < array.length; i++) {
                if (predicate(array[i])) {
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

/** @internal */
export function maxBy<T>(arr: readonly T[], init: number, mapper: (x: T) => number): number {
    for (let i = 0; i < arr.length; i++) {
        init = Math.max(init, mapper(arr[i]));
    }
    return init;
}

/** @internal */
export function zipWith<T, U, V>(arrayA: readonly T[], arrayB: readonly U[], callback: (a: T, b: U, index: number) => V): V[] {
    const result: V[] = [];
    Debug.assertEqual(arrayA.length, arrayB.length);
    for (let i = 0; i < arrayA.length; i++) {
        result.push(callback(arrayA[i], arrayB[i], i));
    }
    return result;
}

/** @internal */
export function map<T, U>(array: readonly T[], f: (x: T, i: number) => U): U[];
/** @internal */
export function map<T, U>(array: readonly T[] | undefined, f: (x: T, i: number) => U): U[] | undefined;
/** @internal */
export function map<T, U>(array: readonly T[] | undefined, f: (x: T, i: number) => U): U[] | undefined {
    let result: U[] | undefined;
    if (array !== undefined) {
        result = [];
        for (let i = 0; i < array.length; i++) {
            result.push(f(array[i], i));
        }
    }
    return result;
}

/** @internal */
export function isNodeLikeSystem(): boolean {
    // This is defined here rather than in sys.ts to prevent a cycle from its
    // use in performanceCore.ts.
    return typeof process !== "undefined"
        && !!process.nextTick
        && !(process as any).browser
        && typeof require !== "undefined";
}

/**
 * Does nothing.
 *
 * @internal
 */
export function noop(_?: unknown): void {}

/** @internal */
export function endsWith(str: string, suffix: string, ignoreCase?: boolean): boolean {
    const expectedPos = str.length - suffix.length;
    return expectedPos >= 0 && (
        ignoreCase
            ? equateStringsCaseInsensitive(str.slice(expectedPos), suffix)
            : str.indexOf(suffix, expectedPos) === expectedPos
    );
}

/**
 * Compare the equality of two strings using a case-sensitive ordinal comparison.
 *
 * Case-sensitive comparisons compare both strings one code-point at a time using the integer
 * value of each code-point after applying `toUpperCase` to each string. We always map both
 * strings to their upper-case form as some unicode characters do not properly round-trip to
 * lowercase (such as `ẞ` (German sharp capital s)).
 *
 * @internal
 */
export function equateStringsCaseInsensitive(a: string, b: string) {
    return a === b
        || a !== undefined
            && b !== undefined
            && a.toUpperCase() === b.toUpperCase();
}

/** @internal */
export function getStringComparer(ignoreCase?: boolean) {
    return ignoreCase ? compareStringsCaseInsensitive : compareStringsCaseSensitive;
}


/**
 * `compareStringsCaseInsensitive` transforms letters to uppercase for unicode reasons,
 * while eslint's `sort-imports` rule transforms letters to lowercase. Which one you choose
 * affects the relative order of letters and ASCII characters 91-96, of which `_` is a
 * valid character in an identifier. So if we used `compareStringsCaseInsensitive` for
 * import sorting, TypeScript and eslint would disagree about the correct case-insensitive
 * sort order for `__String` and `Foo`. Since eslint's whole job is to create consistency
 * by enforcing nitpicky details like this, it makes way more sense for us to just adopt
 * their convention so users can have auto-imports without making eslint angry.
 *
 * @internal
 */
export function compareStringsCaseInsensitiveEslintCompatible(a: string, b: string) {
    if (a === b) return Comparison.EqualTo;
    if (a === undefined) return Comparison.LessThan;
    if (b === undefined) return Comparison.GreaterThan;
    a = a.toLowerCase();
    b = b.toLowerCase();
    return a < b ? Comparison.LessThan : a > b ? Comparison.GreaterThan : Comparison.EqualTo;
}

/**
 * Compare two strings using a case-sensitive ordinal comparison.
 *
 * Ordinal comparisons are based on the difference between the unicode code points of both
 * strings. Characters with multiple unicode representations are considered unequal. Ordinal
 * comparisons provide predictable ordering, but place "a" after "B".
 *
 * Case-sensitive comparisons compare both strings one code-point at a time using the integer
 * value of each code-point.
 *
 * @internal
 */
export function compareStringsCaseSensitive(a: string | undefined, b: string | undefined): Comparison {
    return compareComparableValues(a, b);
}


/**
 * Compare two strings using a case-insensitive ordinal comparison.
 *
 * Ordinal comparisons are based on the difference between the unicode code points of both
 * strings. Characters with multiple unicode representations are considered unequal. Ordinal
 * comparisons provide predictable ordering, but place "a" after "B".
 *
 * Case-insensitive comparisons compare both strings one code-point at a time using the integer
 * value of each code-point after applying `toUpperCase` to each string. We always map both
 * strings to their upper-case form as some unicode characters do not properly round-trip to
 * lowercase (such as `ẞ` (German sharp capital s)).
 *
 * @internal
 */
export function compareStringsCaseInsensitive(a: string, b: string) {
    if (a === b) return Comparison.EqualTo;
    if (a === undefined) return Comparison.LessThan;
    if (b === undefined) return Comparison.GreaterThan;
    a = a.toUpperCase();
    b = b.toUpperCase();
    return a < b ? Comparison.LessThan : a > b ? Comparison.GreaterThan : Comparison.EqualTo;
}


/**
 * Compare the equality of two strings using a case-sensitive ordinal comparison.
 *
 * Case-sensitive comparisons compare both strings one code-point at a time using the
 * integer value of each code-point.
 *
 * @internal
 */
export function equateStringsCaseSensitive(a: string, b: string) {
    return equateValues(a, b);
}


/** @internal */
export function equateValues<T>(a: T, b: T) {
    return a === b;
}

/** @internal */
export type GetCanonicalFileName = (fileName: string) => string;
/** @internal */
export function createGetCanonicalFileName(useCaseSensitiveFileNames: boolean): GetCanonicalFileName {
    return useCaseSensitiveFileNames ? identity : toFileNameLowerCase;
}


/**
 * Returns lower case string
 */
function toLowerCase(x: string) {
    return x.toLowerCase();
}

// We convert the file names to lower case as key for file name on case insensitive file system
// While doing so we need to handle special characters (eg \u0130) to ensure that we dont convert
// it to lower case, fileName with its lowercase form can exist along side it.
// Handle special characters and make those case sensitive instead
//
// |-#--|-Unicode--|-Char code-|-Desc-------------------------------------------------------------------|
// | 1. | i        | 105       | Ascii i                                                                |
// | 2. | I        | 73        | Ascii I                                                                |
// |-------- Special characters ------------------------------------------------------------------------|
// | 3. | \u0130   | 304       | Upper case I with dot above                                            |
// | 4. | i,\u0307 | 105,775   | i, followed by 775: Lower case of (3rd item)                           |
// | 5. | I,\u0307 | 73,775    | I, followed by 775: Upper case of (4th item), lower case is (4th item) |
// | 6. | \u0131   | 305       | Lower case i without dot, upper case is I (2nd item)                   |
// | 7. | \u00DF   | 223       | Lower case sharp s                                                     |
//
// Because item 3 is special where in its lowercase character has its own
// upper case form we cant convert its case.
// Rest special characters are either already in lower case format or
// they have corresponding upper case character so they dont need special handling
//
// But to avoid having to do string building for most common cases, also ignore
// a-z, 0-9, \u0131, \u00DF, \, /, ., : and space
const fileNameLowerCaseRegExp = /[^\u0130\u0131\u00DFa-z0-9\\/:\-_. ]+/g;

const fileNameLowerCaseCache = new Map<string, string>();

/**
 * Case insensitive file systems have descripencies in how they handle some characters (eg. turkish Upper case I with dot on top - \u0130)
 * This function is used in places where we want to make file name as a key on these systems
 * It is possible on mac to be able to refer to file name with I with dot on top as a fileName with its lower case form
 * But on windows we cannot. Windows can have fileName with I with dot on top next to its lower case and they can not each be referred with the lowercase forms
 * Technically we would want this function to be platform sepcific as well but
 * our api has till now only taken caseSensitive as the only input and just for some characters we dont want to update API and ensure all customers use those api
 * We could use upper case and we would still need to deal with the descripencies but
 * we want to continue using lower case since in most cases filenames are lowercasewe and wont need any case changes and avoid having to store another string for the key
 * So for this function purpose, we go ahead and assume character I with dot on top it as case sensitive since its very unlikely to use lower case form of that special character
 *
 * @internal
 */
export function toFileNameLowerCase(x: string) {    
    let result = fileNameLowerCaseCache.get(x);
    if (result === undefined) {
        result = fileNameLowerCaseRegExp.test(x) ? x.replace(fileNameLowerCaseRegExp, toLowerCase) : x;
        fileNameLowerCaseCache.set(x, result);
    }
    return result;
}

/** @internal */
export function startsWith(str: string, prefix: string, ignoreCase?: boolean): boolean {
    return ignoreCase
        ? equateStringsCaseInsensitive(str.slice(0, prefix.length), prefix)
        : str.lastIndexOf(prefix, 0) === 0;
}


/**
 * Iterates through 'array' by index and performs the callback on each element of array until the callback
 * returns a truthy value, then returns that value.
 * If no such value is found, the callback is applied to each element of array and undefined is returned.
 *
 * @internal
 */
export function forEach<T, U>(array: readonly T[] | undefined, callback: (element: T, index: number) => U | undefined): U | undefined {
    if (array !== undefined) {
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
export function contains<T>(array: readonly T[] | undefined, value: T, equalityComparer: EqualityComparer<T> = equateValues): boolean {
    if (array !== undefined) {
        for (let i = 0; i < array.length; i++) {
            if (equalityComparer(array[i], value)) {
                return true;
            }
        }
    }
    return false;
}


/**
 * Unlike `pushIfUnique`, this can take `undefined` as an input, and returns a new array.
 *
 * @internal
 */
export function appendIfUnique<T>(array: T[] | undefined, toAdd: T, equalityComparer?: EqualityComparer<T>): T[] {
    if (array !== undefined) {
        pushIfUnique(array, toAdd, equalityComparer);
        return array;
    }
    else {
        return [toAdd];
    }
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

/** @internal */
export interface MultiMap<K, V> extends Map<K, V[]> {
    /**
     * Adds the value to an array of values associated with the key, and returns the array.
     * Creates the array if it does not already exist.
     */
    add(key: K, value: V): V[];
    /**
     * Removes a value from an array of values associated with the key.
     * Does not preserve the order of those values.
     * Does nothing if `key` is not in `map`, or `value` is not in `map[key]`.
     */
    remove(key: K, value: V): void;
}

/** @internal */
export function reduceLeft<T, U>(array: readonly T[] | undefined, f: (memo: U, value: T, i: number) => U, initial: U, start?: number, count?: number): U;
/** @internal */
export function reduceLeft<T>(array: readonly T[], f: (memo: T, value: T, i: number) => T): T | undefined;
/** @internal */
export function reduceLeft<T>(array: readonly T[] | undefined, f: (memo: T, value: T, i: number) => T, initial?: T, start?: number, count?: number): T | undefined {
    if (array && array.length > 0) {
        const size = array.length;
        if (size > 0) {
            let pos = start === undefined || start < 0 ? 0 : start;
            const end = count === undefined || pos + count > size - 1 ? size - 1 : pos + count;
            let result: T;
            if (arguments.length <= 2) {
                result = array[pos];
                pos++;
            }
            else {
                result = initial!;
            }
            while (pos <= end) {
                result = f(result, array[pos], pos);
                pos++;
            }
            return result;
        }
    }
    return initial;
}


/**
 * Performs a binary search, finding the index at which `value` occurs in `array`.
 * If no such index is found, returns the 2's-complement of first index at which
 * `array[index]` exceeds `value`.
 * @param array A sorted array whose first element must be no larger than number
 * @param value The value to be searched for in the array.
 * @param keySelector A callback used to select the search key from `value` and each element of
 * `array`.
 * @param keyComparer A callback used to compare two keys in a sorted array.
 * @param offset An offset into `array` at which to start the search.
 *
 * @internal
 */
export function binarySearch<T, U>(array: readonly T[], value: T, keySelector: (v: T) => U, keyComparer: Comparer<U>, offset?: number): number {
    return binarySearchKey(array, keySelector(value), keySelector, keyComparer, offset);
}


/**
 * Performs a binary search, finding the index at which an object with `key` occurs in `array`.
 * If no such index is found, returns the 2's-complement of first index at which
 * `array[index]` exceeds `key`.
 * @param array A sorted array whose first element must be no larger than number
 * @param key The key to be searched for in the array.
 * @param keySelector A callback used to select the search key from each element of `array`.
 * @param keyComparer A callback used to compare two keys in a sorted array.
 * @param offset An offset into `array` at which to start the search.
 *
 * @internal
 */
export function binarySearchKey<T, U>(array: readonly T[], key: U, keySelector: (v: T, i: number) => U, keyComparer: Comparer<U>, offset?: number): number {
    if (!some(array)) {
        return -1;
    }

    let low = offset ?? 0;
    let high = array.length - 1;
    while (low <= high) {
        const middle = low + ((high - low) >> 1);
        const midKey = keySelector(array[middle], middle);
        switch (keyComparer(midKey, key)) {
            case Comparison.LessThan:
                low = middle + 1;
                break;
            case Comparison.EqualTo:
                return middle;
            case Comparison.GreaterThan:
                high = middle - 1;
                break;
        }
    }

    return ~low;
}

/** @internal */
export function insertSorted<T>(
    array: SortedArray<T>,
    insert: T,
    compare: Comparer<T>,
    equalityComparer?: EqualityComparer<T>,
    allowDuplicates?: boolean,
): boolean {
    if (array.length === 0) {
        array.push(insert);
        return true;
    }

    const insertIndex = binarySearch(array, insert, identity, compare);
    if (insertIndex < 0) {
        if (equalityComparer && !allowDuplicates) {
            const idx = ~insertIndex;
            if (idx > 0 && equalityComparer(insert, array[idx - 1])) {
                return false;
            }
            if (idx < array.length && equalityComparer(insert, array[idx])) {
                array.splice(idx, 1, insert);
                return true;
            }
        }
        array.splice(~insertIndex, 0, insert);
        return true;
    }

    if (allowDuplicates) {
        array.splice(insertIndex, 0, insert);
        return true;
    }

    return false;
}

/**
 * Tests whether a value is an array.
 *
 * @internal
 */
export function isArray(value: any): value is readonly unknown[] {
    // See: https://github.com/microsoft/TypeScript/issues/17002
    return Array.isArray(value);
}

/** @internal */
export function flatMapToMutable<T, U>(array: readonly T[] | undefined, mapfn: (x: T, i: number) => U | readonly U[] | undefined): U[] {
    const result: U[] = [];
    if (array !== undefined) {
        for (let i = 0; i < array.length; i++) {
            const v = mapfn(array[i], i);
            if (v) {
                if (isArray(v)) {
                    addRange(result, v);
                }
                else {
                    result.push(v);
                }
            }
        }
    }
    return result;
}

/** @internal */
export function concatenate<T>(array1: T[], array2: T[]): T[];
/** @internal */
export function concatenate<T>(array1: readonly T[], array2: readonly T[]): readonly T[];
/** @internal */
export function concatenate<T>(array1: T[], array2: T[] | undefined): T[]; // eslint-disable-line @typescript-eslint/unified-signatures
/** @internal */
export function concatenate<T>(array1: T[] | undefined, array2: T[]): T[]; // eslint-disable-line @typescript-eslint/unified-signatures
/** @internal */
export function concatenate<T>(array1: readonly T[], array2: readonly T[] | undefined): readonly T[]; // eslint-disable-line @typescript-eslint/unified-signatures
/** @internal */
export function concatenate<T>(array1: readonly T[] | undefined, array2: readonly T[]): readonly T[]; // eslint-disable-line @typescript-eslint/unified-signatures
/** @internal */
export function concatenate<T>(array1: T[] | undefined, array2: T[] | undefined): T[] | undefined;
/** @internal */
export function concatenate<T>(array1: readonly T[] | undefined, array2: readonly T[] | undefined): readonly T[] | undefined;
/** @internal */
export function concatenate<T>(array1: readonly T[] | undefined, array2: readonly T[] | undefined): readonly T[] | undefined {
    if (array2 === undefined || array2.length === 0) return array1;
    if (array1 === undefined || array1.length === 0) return array2;
    return [...array1, ...array2];
}

/** @internal */
export function clear(array: unknown[]): void {
    array.length = 0;
}


/**
 * Works like Array.prototype.find, returning `undefined` if no element satisfying the predicate is found.
 *
 * @internal
 */
export function find<T, U extends T>(array: readonly T[] | undefined, predicate: (element: T, index: number) => element is U, startIndex?: number): U | undefined;
/** @internal */
export function find<T>(array: readonly T[] | undefined, predicate: (element: T, index: number) => boolean, startIndex?: number): T | undefined;
/** @internal */
export function find<T>(array: readonly T[] | undefined, predicate: (element: T, index: number) => boolean, startIndex?: number): T | undefined {
    if (array === undefined) return undefined;
    for (let i = startIndex ?? 0; i < array.length; i++) {
        const value = array[i];
        if (predicate(value, i)) {
            return value;
        }
    }
    return undefined;
}


/**
 * Do nothing and return undefined
 *
 * @internal
 */
export function returnUndefined(): undefined {
    return undefined;
}

/**
 * Do nothing and return false
 *
 * @internal
 */
export function returnFalse(): false {
    return false;
}

/**
 * Do nothing and return true
 *
 * @internal
 */
export function returnTrue(): true {
    return true;
}

/**
 * Tests whether a value is string
 *
 * @internal
 */
export function isString(text: unknown): text is string {
    return typeof text === "string";
}
/** @internal */
export function isNumber(x: unknown): x is number {
    return typeof x === "number";
}

/** @internal */
export function findLast<T, U extends T>(array: readonly T[] | undefined, predicate: (element: T, index: number) => element is U, startIndex?: number): U | undefined;
/** @internal */
export function findLast<T>(array: readonly T[] | undefined, predicate: (element: T, index: number) => boolean, startIndex?: number): T | undefined;
/** @internal */
export function findLast<T>(array: readonly T[] | undefined, predicate: (element: T, index: number) => boolean, startIndex?: number): T | undefined {
    if (array === undefined) return undefined;
    for (let i = startIndex ?? array.length - 1; i >= 0; i--) {
        const value = array[i];
        if (predicate(value, i)) {
            return value;
        }
    }
    return undefined;
}

/** @internal */
export function mapDefined<T, U>(array: readonly T[] | undefined, mapFn: (x: T, i: number) => U | undefined): U[] {
    const result: U[] = [];
    if (array !== undefined) {
        for (let i = 0; i < array.length; i++) {
            const mapped = mapFn(array[i], i);
            if (mapped !== undefined) {
                result.push(mapped);
            }
        }
    }
    return result;
}

/**
 * Shims `Array.from`.
 *
 * @internal
 */
export function arrayFrom<T, U>(iterator: Iterable<T>, map: (t: T) => U): U[];
/** @internal */
export function arrayFrom<T>(iterator: Iterable<T>): T[];
/** @internal */
export function arrayFrom<T, U>(iterator: Iterable<T>, map?: (t: T) => U): (T | U)[] {
    const result: (T | U)[] = [];
    for (const value of iterator) {
        result.push(map ? map(value) : value);
    }
    return result;
}


/**
 * Given a name and a list of names that are *not* equal to the name, return a spelling suggestion if there is one that is close enough.
 * Names less than length 3 only check for case-insensitive equality.
 *
 * find the candidate with the smallest Levenshtein distance,
 *    except for candidates:
 *      * With no name
 *      * Whose length differs from the target name by more than 0.34 of the length of the name.
 *      * Whose levenshtein distance is more than 0.4 of the length of the name
 *        (0.4 allows 1 substitution/transposition for every 5 characters,
 *         and 1 insertion/deletion at 3 characters)
 *
 * @internal
 */
export function getSpellingSuggestion<T>(name: string, candidates: Iterable<T>, getName: (candidate: T) => string | undefined): T | undefined {
    const maximumLengthDifference = Math.max(2, Math.floor(name.length * 0.34));
    let bestDistance = Math.floor(name.length * 0.4) + 1; // If the best result is worse than this, don't bother.
    let bestCandidate: T | undefined;
    for (const candidate of candidates) {
        const candidateName = getName(candidate);
        if (candidateName !== undefined && Math.abs(candidateName.length - name.length) <= maximumLengthDifference) {
            if (candidateName === name) {
                continue;
            }
            // Only consider candidates less than 3 characters long when they differ by case.
            // Otherwise, don't bother, since a user would usually notice differences of a 2-character name.
            if (candidateName.length < 3 && candidateName.toLowerCase() !== name.toLowerCase()) {
                continue;
            }

            const distance = levenshteinWithMax(name, candidateName, bestDistance - 0.1);
            if (distance === undefined) {
                continue;
            }

            Debug.assert(distance < bestDistance); // Else `levenshteinWithMax` should return undefined
            bestDistance = distance;
            bestCandidate = candidate;
        }
    }
    return bestCandidate;
}


function levenshteinWithMax(s1: string, s2: string, max: number): number | undefined {
    let previous = new Array(s2.length + 1);
    let current = new Array(s2.length + 1);
    /** Represents any value > max. We don't care about the particular value. */
    const big = max + 0.01;

    for (let i = 0; i <= s2.length; i++) {
        previous[i] = i;
    }

    for (let i = 1; i <= s1.length; i++) {
        const c1 = s1.charCodeAt(i - 1);
        const minJ = Math.ceil(i > max ? i - max : 1);
        const maxJ = Math.floor(s2.length > max + i ? max + i : s2.length);
        current[0] = i;
        /** Smallest value of the matrix in the ith column. */
        let colMin = i;
        for (let j = 1; j < minJ; j++) {
            current[j] = big;
        }
        for (let j = minJ; j <= maxJ; j++) {
            // case difference should be significantly cheaper than other differences
            const substitutionDistance = s1[i - 1].toLowerCase() === s2[j - 1].toLowerCase()
                ? (previous[j - 1] + 0.1)
                : (previous[j - 1] + 2);
            const dist = c1 === s2.charCodeAt(j - 1)
                ? previous[j - 1]
                : Math.min(/*delete*/ previous[j] + 1, /*insert*/ current[j - 1] + 1, /*substitute*/ substitutionDistance);
            current[j] = dist;
            colMin = Math.min(colMin, dist);
        }
        for (let j = maxJ + 1; j <= s2.length; j++) {
            current[j] = big;
        }
        if (colMin > max) {
            // Give up -- everything in this column is > max and it can't get better in future columns.
            return undefined;
        }

        const temp = previous;
        previous = current;
        current = temp;
    }

    const res = previous[s2.length];
    return res > max ? undefined : res;
}



/**
 * Iterates through `array` by index and performs the callback on each element of array until the callback
 * returns a falsey value, then returns false.
 * If no such value is found, the callback is applied to each element of array and `true` is returned.
 *
 * @internal
 */
export function every<T, U extends T>(array: readonly T[], callback: (element: T, index: number) => element is U): array is readonly U[];
/** @internal */
export function every<T, U extends T>(array: readonly T[] | undefined, callback: (element: T, index: number) => element is U): array is readonly U[] | undefined;
/** @internal */
export function every<T>(array: readonly T[] | undefined, callback: (element: T, index: number) => boolean): boolean;
export function every<T>(array: readonly T[] | undefined, callback: (element: T, index: number) => boolean): boolean {
    if (array !== undefined) {
        for (let i = 0; i < array.length; i++) {
            if (!callback(array[i], i)) {
                return false;
            }
        }
    }

    return true;
}


/**
 * Maps an array. If the mapped value is an array, it is spread into the result.
 *
 * @param array The array to map.
 * @param mapfn The callback used to map the result into one or more values.
 *
 * @internal
 */
export function flatMap<T, U>(array: readonly T[] | undefined, mapfn: (x: T, i: number) => U | readonly U[] | undefined): readonly U[] {
    let result: U[] | undefined;
    if (array !== undefined) {
        for (let i = 0; i < array.length; i++) {
            const v = mapfn(array[i], i);
            if (v) {
                if (isArray(v)) {
                    result = addRange(result, v);
                }
                else {
                    result = append(result, v);
                }
            }
        }
    }
    return result ?? emptyArray;
}


/**
 * Appends a value to an array, returning the array.
 *
 * @param to The array to which `value` is to be appended. If `to` is `undefined`, a new array
 * is created if `value` was appended.
 * @param value The value to append to the array. If `value` is `undefined`, nothing is
 * appended.
 *
 * @internal
 */
export function append<TArray extends any[] | undefined, TValue extends NonNullable<TArray>[number] | undefined>(to: TArray, value: TValue): [undefined, undefined] extends [TArray, TValue] ? TArray : NonNullable<TArray>[number][];
/** @internal */
export function append<T>(to: T[], value: T | undefined): T[];
/** @internal */
export function append<T>(to: T[] | undefined, value: T): T[];
/** @internal */
export function append<T>(to: T[] | undefined, value: T | undefined): T[] | undefined;
/** @internal */
export function append<T>(to: T[], value: T | undefined): void;
/** @internal */
export function append<T>(to: T[] | undefined, value: T | undefined): T[] | undefined {
    if (value === undefined) return to as T[];
    if (to === undefined) return [value];
    to.push(value);
    return to;
}

/** @internal */
export function tryCast<TOut extends TIn, TIn = any>(value: TIn | undefined, test: (value: TIn) => value is TOut): TOut | undefined {
    return value !== undefined && test(value) ? value : undefined;
}

/** @internal */
export function first<T>(array: readonly T[]): T {
    Debug.assert(array.length !== 0);
    return array[0];
}

/** @internal */
export function cast<TOut extends TIn, TIn = any>(value: TIn | undefined, test: (value: TIn) => value is TOut): TOut {
    if (value !== undefined && test(value)) return value;

    return Debug.fail(`Invalid cast. The supplied value ${value} did not pass the test '${Debug.getFunctionName(test)}'.`);
}


/**
 * Maps from T to T and avoids allocation if all elements map to themselves
 *
 * @internal */
export function sameMap<T, U = T>(array: T[], f: (x: T, i: number) => U): U[];
/** @internal */
export function sameMap<T, U = T>(array: readonly T[], f: (x: T, i: number) => U): readonly U[];
/** @internal */
export function sameMap<T, U = T>(array: T[] | undefined, f: (x: T, i: number) => U): U[] | undefined;
/** @internal */
export function sameMap<T, U = T>(array: readonly T[] | undefined, f: (x: T, i: number) => U): readonly U[] | undefined;
/** @internal */
export function sameMap<T, U = T>(array: readonly T[] | undefined, f: (x: T, i: number) => U): readonly U[] | undefined {
    if (array !== undefined) {
        for (let i = 0; i < array.length; i++) {
            const item = array[i];
            const mapped = f(item, i);
            if (item as unknown !== mapped) {
                const result: U[] = array.slice(0, i) as unknown[] as U[];
                result.push(mapped);
                for (i++; i < array.length; i++) {
                    result.push(f(array[i], i));
                }
                return result;
            }
        }
    }
    return array as unknown[] as U[];
}

/**
 * Returns the first element of an array if non-empty, `undefined` otherwise.
 *
 * @internal
 */
export function firstOrUndefined<T>(array: readonly T[] | undefined): T | undefined {
    return array === undefined || array.length === 0 ? undefined : array[0];
}


/** @internal */
export function arrayIsEqualTo<T>(array1: readonly T[] | undefined, array2: readonly T[] | undefined, equalityComparer: (a: T, b: T, index: number) => boolean = equateValues): boolean {
    if (array1 === undefined || array2 === undefined) {
        return array1 === array2;
    }

    if (array1.length !== array2.length) {
        return false;
    }

    for (let i = 0; i < array1.length; i++) {
        if (!equalityComparer(array1[i], array2[i], i)) {
            return false;
        }
    }

    return true;
}


/** @internal */
export function createMultiMap<K, V>(): MultiMap<K, V> {
    const map = new Map<K, V[]>() as MultiMap<K, V>;
    map.add = multiMapAdd;
    map.remove = multiMapRemove;
    return map;
}
function multiMapAdd<K, V>(this: MultiMap<K, V>, key: K, value: V) {
    let values = this.get(key);
    if (values !== undefined) {
        values.push(value);
    }
    else {
        this.set(key, values = [value]);
    }
    return values;
}
function multiMapRemove<K, V>(this: MultiMap<K, V>, key: K, value: V) {
    const values = this.get(key);
    if (values !== undefined) {
        unorderedRemoveItem(values, value);
        if (!values.length) {
            this.delete(key);
        }
    }
}


/**
 * Remove the *first* occurrence of `item` from the array.
 *
 * @internal
 */
export function unorderedRemoveItem<T>(array: T[], item: T) {
    return unorderedRemoveFirstItemWhere(array, element => element === item);
}

/** Remove the *first* element satisfying `predicate`. */
function unorderedRemoveFirstItemWhere<T>(array: T[], predicate: (element: T) => boolean) {
    for (let i = 0; i < array.length; i++) {
        if (predicate(array[i])) {
            unorderedRemoveItemAt(array, i);
            return true;
        }
    }
    return false;
}


function unorderedRemoveItemAt<T>(array: T[], index: number): void {
    // Fill in the "hole" left at `index`.
    array[index] = array[array.length - 1];
    array.pop();
}


/** @internal */
export function singleElementArray<T>(t: T | undefined): T[] | undefined {
    return t === undefined ? undefined : [t];
}

/** @internal */
export function maybeBind<T, A extends any[], R>(obj: T, fn: ((this: T, ...args: A) => R) | undefined): ((...args: A) => R) | undefined {
    return fn?.bind(obj);
}


/**
 * Remove an item from an array, moving everything to its right one space left.
 *
 * @internal
 */
export function orderedRemoveItem<T>(array: T[], item: T): boolean {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === item) {
            orderedRemoveItemAt(array, i);
            return true;
        }
    }
    return false;
}

/**
 * Remove an item by index from an array, moving everything to its right one space left.
 *
 * @internal
 */
export function orderedRemoveItemAt<T>(array: T[], index: number): void {
    // This seems to be faster than either `array.splice(i, 1)` or `array.copyWithin(i, i+ 1)`.
    for (let i = index; i < array.length - 1; i++) {
        array[i] = array[i + 1];
    }
    array.pop();
}

/** @internal */
export function enumerateInsertsAndDeletes<T, U>(newItems: readonly T[], oldItems: readonly U[], comparer: (a: T, b: U) => Comparison, inserted: (newItem: T) => void, deleted: (oldItem: U) => void, unchanged?: (oldItem: U, newItem: T) => void) {
    unchanged ??= noop;
    let newIndex = 0;
    let oldIndex = 0;
    const newLen = newItems.length;
    const oldLen = oldItems.length;
    let hasChanges = false;
    while (newIndex < newLen && oldIndex < oldLen) {
        const newItem = newItems[newIndex];
        const oldItem = oldItems[oldIndex];
        const compareResult = comparer(newItem, oldItem);
        if (compareResult === Comparison.LessThan) {
            inserted(newItem);
            newIndex++;
            hasChanges = true;
        }
        else if (compareResult === Comparison.GreaterThan) {
            deleted(oldItem);
            oldIndex++;
            hasChanges = true;
        }
        else {
            unchanged(oldItem, newItem);
            newIndex++;
            oldIndex++;
        }
    }
    while (newIndex < newLen) {
        inserted(newItems[newIndex++]);
        hasChanges = true;
    }
    while (oldIndex < oldLen) {
        deleted(oldItems[oldIndex++]);
        hasChanges = true;
    }
    return hasChanges;
}


/**
 * Gets the owned, enumerable property keys of a map-like.
 *
 * @internal
 */
export function getOwnKeys<T>(map: MapLike<T>): string[] {
    const keys: string[] = [];
    for (const key in map) {
        if (hasOwnProperty.call(map, key)) {
            keys.push(key);
        }
    }

    return keys;
}

/** @internal */
export function removeSuffix(str: string, suffix: string): string {
    return endsWith(str, suffix) ? str.slice(0, str.length - suffix.length) : str;
}

/** @internal */
export function removePrefix(str: string, prefix: string): string {
    return startsWith(str, prefix) ? str.substr(prefix.length) : str;
}

/** @internal */
export function getOrUpdate<K, V>(map: Map<K, V>, key: K, callback: () => V) {
    if (map.has(key)) {
        return map.get(key)!;
    }
    const value = callback();
    map.set(key, value);
    return value;
}


/** @internal */
export function firstDefinedIterator<T, U>(iter: Iterable<T>, callback: (element: T) => U | undefined): U | undefined {
    for (const value of iter) {
        const result = callback(value);
        if (result !== undefined) {
            return result;
        }
    }
    return undefined;
}


/**
 * Filters an array by a predicate function. Returns the same array instance if the predicate is
 * true for all elements, otherwise returns a new array instance containing the filtered subset.
 *
 * @internal
 */
export function filter<T, U extends T>(array: T[], f: (x: T) => x is U): U[];
/** @internal */
export function filter<T>(array: T[], f: (x: T) => boolean): T[];
/** @internal */
export function filter<T, U extends T>(array: readonly T[], f: (x: T) => x is U): readonly U[];
/** @internal */
export function filter<T>(array: readonly T[], f: (x: T) => boolean): readonly T[];
/** @internal */
export function filter<T, U extends T>(array: T[] | undefined, f: (x: T) => x is U): U[] | undefined;
/** @internal */
export function filter<T>(array: T[] | undefined, f: (x: T) => boolean): T[] | undefined;
/** @internal */
export function filter<T, U extends T>(array: readonly T[] | undefined, f: (x: T) => x is U): readonly U[] | undefined;
/** @internal */
export function filter<T>(array: readonly T[] | undefined, f: (x: T) => boolean): readonly T[] | undefined;
/** @internal */
export function filter<T>(array: readonly T[] | undefined, f: (x: T) => boolean): readonly T[] | undefined {
    if (array !== undefined) {
        const len = array.length;
        let i = 0;
        while (i < len && f(array[i])) i++;
        if (i < len) {
            const result = array.slice(0, i);
            i++;
            while (i < len) {
                const item = array[i];
                if (f(item)) {
                    result.push(item);
                }
                i++;
            }
            return result;
        }
    }
    return array;
}


/** @internal */
export function and<T>(f: (arg: T) => boolean, g: (arg: T) => boolean) {
    return (arg: T) => f(arg) && g(arg);
}

/** @internal */
export function or<P, R1 extends P, R2 extends P>(f1: (p1: P) => p1 is R1, f2: (p2: P) => p2 is R2): (p: P) => p is R1 | R2;
/** @internal */
export function or<P, R1 extends P, R2 extends P, R3 extends P>(f1: (p1: P) => p1 is R1, f2: (p2: P) => p2 is R2, f3: (p3: P) => p3 is R3): (p: P) => p is R1 | R2 | R3;
/** @internal */
export function or<T extends unknown[], U>(...fs: ((...args: T) => U)[]): (...args: T) => U;
/** @internal */
export function or<T extends unknown[], U>(...fs: ((...args: T) => U)[]): (...args: T) => U {
    return (...args) => {
        let lastResult: U;
        for (const f of fs) {
            lastResult = f(...args);
            if (lastResult) {
                return lastResult;
            }
        }
        return lastResult!;
    };
}

/** @internal */
export function not<T extends unknown[]>(fn: (...args: T) => boolean): (...args: T) => boolean {
    return (...args) => !fn(...args);
}

/** @internal */
export function last<T>(array: readonly T[]): T {
    Debug.assert(array.length !== 0);
    return array[array.length - 1];
}

/**
 * Like `forEach`, but suitable for use with numbers and strings (which may be falsy).
 *
 * @internal
 */
export function firstDefined<T, U>(array: readonly T[] | undefined, callback: (element: T, index: number) => U | undefined): U | undefined {
    if (array === undefined) {
        return undefined;
    }

    for (let i = 0; i < array.length; i++) {
        const result = callback(array[i], i);
        if (result !== undefined) {
            return result;
        }
    }
    return undefined;
}


/**
 * Returns the only element of an array if it contains only one element, `undefined` otherwise.
 *
 * @internal
 */
export function singleOrUndefined<T>(array: readonly T[] | undefined): T | undefined {
    return array !== undefined && array.length === 1
        ? array[0]
        : undefined;
}

/** @internal */
export function countWhere<T>(array: readonly T[] | undefined, predicate: (x: T, i: number) => boolean): number {
    let count = 0;
    if (array !== undefined) {
        for (let i = 0; i < array.length; i++) {
            const v = array[i];
            if (predicate(v, i)) {
                count++;
            }
        }
    }
    return count;
}


/**
 * Throws an error because a function is not implemented.
 *
 * @internal
 */
export function notImplemented(): never {
    throw new Error("Not implemented");
}

/**
 * Works like Array.prototype.findIndex, returning `-1` if no element satisfying the predicate is found.
 *
 * @internal
 */
export function findIndex<T>(array: readonly T[] | undefined, predicate: (element: T, index: number) => boolean, startIndex?: number): number {
    if (array === undefined) return -1;
    for (let i = startIndex ?? 0; i < array.length; i++) {
        if (predicate(array[i], i)) {
            return i;
        }
    }
    return -1;
}

/** @internal */
export function rangeEquals<T>(array1: readonly T[], array2: readonly T[], pos: number, end: number) {
    while (pos < end) {
        if (array1[pos] !== array2[pos]) {
            return false;
        }
        pos++;
    }
    return true;
}


/**
 * Flattens an array containing a mix of array or non-array elements.
 *
 * @param array The array to flatten.
 *
 * @internal
 */
export function flatten<T>(array: T[][] | readonly (T | readonly T[] | undefined)[]): T[] {
    const result = [];
    for (let i = 0; i < array.length; i++) {
        const v = array[i];
        if (v) {
            if (isArray(v)) {
                addRange(result, v);
            }
            else {
                result.push(v);
            }
        }
    }
    return result;
}

/** @internal */
export function indexOfAnyCharCode(text: string, charCodes: readonly number[], start?: number): number {
    for (let i = start ?? 0; i < text.length; i++) {
        if (contains(charCodes, text.charCodeAt(i))) {
            return i;
        }
    }
    return -1;
}


/**
 * Returns a new sorted array.
 *
 * @internal
 */
export function sort<T>(array: readonly T[], comparer?: Comparer<T>): SortedReadonlyArray<T> {
    return (array.length === 0 ? array : array.slice().sort(comparer)) as SortedReadonlyArray<T>;
}

/** @internal */
export function* mapIterator<T, U>(iter: Iterable<T>, mapFn: (x: T) => U) {
    for (const x of iter) {
        yield mapFn(x);
    }
}

/** @internal */
export function* mapDefinedIterator<T, U>(iter: Iterable<T>, mapFn: (x: T) => U | undefined) {
    for (const x of iter) {
        const value = mapFn(x);
        if (value !== undefined) {
            yield value;
        }
    }
}

/** @internal */
export function* arrayReverseIterator<T>(array: readonly T[]) {
    for (let i = array.length - 1; i >= 0; i--) {
        yield array[i];
    }
}

/** @internal */
export function tryAddToSet<T>(set: Set<T>, value: T) {
    if (!set.has(value)) {
        set.add(value);
        return true;
    }
    return false;
}

/**
 * Deduplicates an array that has already been sorted.
 */
function deduplicateSorted<T>(array: SortedReadonlyArray<T>, comparer: EqualityComparer<T> | Comparer<T>): SortedReadonlyArray<T> {
    if (array.length === 0) return emptyArray as any as SortedReadonlyArray<T>;

    let last = array[0];
    const deduplicated: T[] = [last];
    for (let i = 1; i < array.length; i++) {
        const next = array[i];
        switch (comparer(next, last)) {
            // equality comparison
            case true:

            // relational comparison
            // falls through
            case Comparison.EqualTo:
                continue;

            case Comparison.LessThan:
                // If `array` is sorted, `next` should **never** be less than `last`.
                return Debug.fail("Array is unsorted.");
        }

        deduplicated.push(last = next);
    }

    return deduplicated as any as SortedReadonlyArray<T>;
}


/** @internal */
export function sortAndDeduplicate(array: readonly string[]): SortedReadonlyArray<string>;
/** @internal */
export function sortAndDeduplicate<T>(array: readonly T[], comparer: Comparer<T>, equalityComparer?: EqualityComparer<T>): SortedReadonlyArray<T>;
/** @internal */
export function sortAndDeduplicate<T>(array: readonly T[], comparer?: Comparer<T>, equalityComparer?: EqualityComparer<T>): SortedReadonlyArray<T> {
    return deduplicateSorted(sort(array, comparer), equalityComparer || comparer || compareStringsCaseSensitive as any as Comparer<T>);
}

/**
 * Performs a shallow equality comparison of the contents of two map-likes.
 *
 * @param left A map-like whose properties should be compared.
 * @param right A map-like whose properties should be compared.
 *
 * @internal
 */
export function equalOwnProperties<T>(left: MapLike<T> | undefined, right: MapLike<T> | undefined, equalityComparer: EqualityComparer<T> = equateValues) {
    if (left === right) return true;
    if (!left || !right) return false;
    for (const key in left) {
        if (hasOwnProperty.call(left, key)) {
            if (!hasOwnProperty.call(right, key)) return false;
            if (!equalityComparer(left[key], right[key])) return false;
        }
    }

    for (const key in right) {
        if (hasOwnProperty.call(right, key)) {
            if (!hasOwnProperty.call(left, key)) return false;
        }
    }

    return true;
}

/**
 * Represents a "prefix*suffix" pattern.
 *
 * @internal
 */
export interface Pattern {
    prefix: string;
    suffix: string;
}


/**
 * Creates a string comparer for use with string collation in the UI.
 */
const createUIStringComparer = (() => {
    return createIntlCollatorStringComparer;

    function compareWithCallback(a: string | undefined, b: string | undefined, comparer: (a: string, b: string) => number) {
        if (a === b) return Comparison.EqualTo;
        if (a === undefined) return Comparison.LessThan;
        if (b === undefined) return Comparison.GreaterThan;
        const value = comparer(a, b);
        return value < 0 ? Comparison.LessThan : value > 0 ? Comparison.GreaterThan : Comparison.EqualTo;
    }

    function createIntlCollatorStringComparer(locale: string | undefined): Comparer<string> {
        // Intl.Collator.prototype.compare is bound to the collator. See NOTE in
        // http://www.ecma-international.org/ecma-402/2.0/#sec-Intl.Collator.prototype.compare
        const comparer = new Intl.Collator(locale, { usage: "sort", sensitivity: "variant", numeric: true }).compare;
        return (a, b) => compareWithCallback(a, b, comparer);
    }
})();

let uiComparerCaseSensitive: Comparer<string> | undefined;
let uiLocale: string | undefined;

/** @internal */
export function getUILocale() {
    return uiLocale;
}

/** @internal */
export function setUILocale(value: string | undefined) {
    if (uiLocale !== value) {
        uiLocale = value;
        uiComparerCaseSensitive = undefined;
    }
}

/**
 * Compare two strings in a using the case-sensitive sort behavior of the UI locale.
 *
 * Ordering is not predictable between different host locales, but is best for displaying
 * ordered data for UI presentation. Characters with multiple unicode representations may
 * be considered equal.
 *
 * Case-sensitive comparisons compare strings that differ in base characters, or
 * accents/diacritic marks, or case as unequal.
 *
 * @internal
 */
export function compareStringsCaseSensitiveUI(a: string, b: string) {
    const comparer = uiComparerCaseSensitive || (uiComparerCaseSensitive = createUIStringComparer(uiLocale));
    return comparer(a, b);
}

/** @internal */
export function assertType<T>(_: T): void {}

/** @internal */
export function filterMutate<T>(array: T[], f: (x: T, i: number, array: T[]) => boolean): void {
    let outIndex = 0;
    for (let i = 0; i < array.length; i++) {
        if (f(array[i], i, array)) {
            array[outIndex] = array[i];
            outIndex++;
        }
    }
    array.length = outIndex;
}

/** @internal */
export function createQueue<T>(items?: readonly T[]): Queue<T> {
    const elements: (T | undefined)[] = items?.slice() || [];
    let headIndex = 0;

    function isEmpty() {
        return headIndex === elements.length;
    }

    function enqueue(...items: T[]) {
        elements.push(...items);
    }

    function dequeue(): T {
        if (isEmpty()) {
            throw new Error("Queue is empty");
        }

        const result = elements[headIndex] as T;
        elements[headIndex] = undefined; // Don't keep referencing dequeued item
        headIndex++;

        // If more than half of the queue is empty, copy the remaining elements to the
        // front and shrink the array (unless we'd be saving fewer than 100 slots)
        if (headIndex > 100 && headIndex > (elements.length >> 1)) {
            const newLength = elements.length - headIndex;
            elements.copyWithin(/*target*/ 0, /*start*/ headIndex);

            elements.length = newLength;
            headIndex = 0;
        }

        return result;
    }

    return {
        enqueue,
        dequeue,
        isEmpty,
    };
}

/** @internal */
export function mapDefinedEntries<K1, V1, K2, V2>(map: ReadonlyMap<K1, V1>, f: (key: K1, value: V1) => readonly [K2, V2] | undefined): Map<K2, V2>;
/** @internal */
export function mapDefinedEntries<K1, V1, K2, V2>(map: ReadonlyMap<K1, V1> | undefined, f: (key: K1, value: V1) => readonly [K2 | undefined, V2 | undefined] | undefined): Map<K2, V2> | undefined;
/** @internal */
export function mapDefinedEntries<K1, V1, K2, V2>(map: ReadonlyMap<K1, V1> | undefined, f: (key: K1, value: V1) => readonly [K2 | undefined, V2 | undefined] | undefined): Map<K2, V2> | undefined {
    if (!map) {
        return undefined;
    }

    const result = new Map<K2, V2>();
    map.forEach((value, key) => {
        const entry = f(key, value);
        if (entry !== undefined) {
            const [newKey, newValue] = entry;
            if (newKey !== undefined && newValue !== undefined) {
                result.set(newKey, newValue);
            }
        }
    });

    return result;
}

/** @internal */
export function firstIterator<T>(iter: Iterable<T>): T {
    for (const value of iter) {
        return value;
    }
    Debug.fail("iterator is empty");
}


/**
 * Creates a Set with custom equality and hash code functionality.  This is useful when you
 * want to use something looser than object identity - e.g. "has the same span".
 *
 * If `equals(a, b)`, it must be the case that `getHashCode(a) === getHashCode(b)`.
 * The converse is not required.
 *
 * To facilitate a perf optimization (lazy allocation of bucket arrays), `TElement` is
 * assumed not to be an array type.
 *
 * @internal
 */
export function createSet<TElement, THash = number>(getHashCode: (element: TElement) => THash, equals: EqualityComparer<TElement>): Set<TElement> {
    const multiMap = new Map<THash, TElement | TElement[]>();
    let size = 0;

    function* getElementIterator(): IterableIterator<TElement> {
        for (const value of multiMap.values()) {
            if (isArray(value)) {
                yield* value;
            }
            else {
                yield value;
            }
        }
    }

    const set: Set<TElement> = {
        has(element: TElement): boolean {
            const hash = getHashCode(element);
            if (!multiMap.has(hash)) return false;
            const candidates = multiMap.get(hash)!;
            if (!isArray(candidates)) return equals(candidates, element);

            for (const candidate of candidates) {
                if (equals(candidate, element)) {
                    return true;
                }
            }
            return false;
        },
        add(element: TElement): Set<TElement> {
            const hash = getHashCode(element);
            if (multiMap.has(hash)) {
                const values = multiMap.get(hash)!;
                if (isArray(values)) {
                    if (!contains(values, element, equals)) {
                        values.push(element);
                        size++;
                    }
                }
                else {
                    const value = values;
                    if (!equals(value, element)) {
                        multiMap.set(hash, [value, element]);
                        size++;
                    }
                }
            }
            else {
                multiMap.set(hash, element);
                size++;
            }

            return this;
        },
        delete(element: TElement): boolean {
            const hash = getHashCode(element);
            if (!multiMap.has(hash)) return false;
            const candidates = multiMap.get(hash)!;
            if (isArray(candidates)) {
                for (let i = 0; i < candidates.length; i++) {
                    if (equals(candidates[i], element)) {
                        if (candidates.length === 1) {
                            multiMap.delete(hash);
                        }
                        else if (candidates.length === 2) {
                            multiMap.set(hash, candidates[1 - i]);
                        }
                        else {
                            unorderedRemoveItemAt(candidates, i);
                        }
                        size--;
                        return true;
                    }
                }
            }
            else {
                const candidate = candidates;
                if (equals(candidate, element)) {
                    multiMap.delete(hash);
                    size--;
                    return true;
                }
            }

            return false;
        },
        clear(): void {
            multiMap.clear();
            size = 0;
        },
        get size() {
            return size;
        },
        forEach(action: (value: TElement, key: TElement, set: Set<TElement>) => void): void {
            for (const elements of arrayFrom(multiMap.values())) {
                if (isArray(elements)) {
                    for (const element of elements) {
                        action(element, element, set);
                    }
                }
                else {
                    const element = elements;
                    action(element, element, set);
                }
            }
        },
        keys(): IterableIterator<TElement> {
            return getElementIterator();
        },
        values(): IterableIterator<TElement> {
            return getElementIterator();
        },
        *entries(): IterableIterator<[TElement, TElement]> {
            for (const value of getElementIterator()) {
                yield [value, value];
            }
        },
        [Symbol.iterator]: () => {
            return getElementIterator();
        },
        [Symbol.toStringTag]: multiMap[Symbol.toStringTag],
    };

    return set;
}

/** @internal */
export function tryRemoveSuffix(str: string, suffix: string): string | undefined {
    return endsWith(str, suffix) ? str.slice(0, str.length - suffix.length) : undefined;
}

/** @internal */
export function arraysEqual<T>(a: readonly T[], b: readonly T[], equalityComparer: EqualityComparer<T> = equateValues): boolean {
    return a.length === b.length && a.every((x, i) => equalityComparer(x, b[i]));
}


/**
 * Creates a new array with `element` interspersed in between each element of `input`
 * if there is more than 1 value in `input`. Otherwise, returns the existing array.
 *
 * @internal
 */
export function intersperse<T>(input: T[], element: T): T[] {
    if (input.length <= 1) {
        return input;
    }
    const result: T[] = [];
    for (let i = 0, n = input.length; i < n; i++) {
        if (i) result.push(element);
        result.push(input[i]);
    }
    return result;
}

/** @internal */
export function findLastIndex<T>(array: readonly T[] | undefined, predicate: (element: T, index: number) => boolean, startIndex?: number): number {
    if (array === undefined) return -1;
    for (let i = startIndex ?? array.length - 1; i >= 0; i--) {
        if (predicate(array[i], i)) {
            return i;
        }
    }
    return -1;
}

/** @internal */
export function arrayToMultiMap<K, V>(values: readonly V[], makeKey: (value: V) => K): MultiMap<K, V>;
/** @internal */
export function arrayToMultiMap<K, V, U>(values: readonly V[], makeKey: (value: V) => K, makeValue: (value: V) => U): MultiMap<K, U>;
/** @internal */
export function arrayToMultiMap<K, V, U>(values: readonly V[], makeKey: (value: V) => K, makeValue: (value: V) => V | U = identity): MultiMap<K, V | U> {
    const result = createMultiMap<K, V | U>();
    for (const value of values) {
        result.add(makeKey(value), makeValue(value));
    }
    return result;
}

/** @internal */
export function group<T, K>(values: readonly T[], getGroupId: (value: T) => K): readonly (readonly T[])[];
/** @internal */
export function group<T, K, R>(values: readonly T[], getGroupId: (value: T) => K, resultSelector: (values: readonly T[]) => R): R[];
/** @internal */
export function group<T>(values: readonly T[], getGroupId: (value: T) => string): readonly (readonly T[])[];
/** @internal */
export function group<T, R>(values: readonly T[], getGroupId: (value: T) => string, resultSelector: (values: readonly T[]) => R): R[];
/** @internal */
export function group<T, K>(values: readonly T[], getGroupId: (value: T) => K, resultSelector: (values: readonly T[]) => readonly T[] = identity): readonly (readonly T[])[] {
    return arrayFrom(arrayToMultiMap(values, getGroupId).values(), resultSelector);
}


/**
 * Compare two TextSpans, first by `start`, then by `length`.
 *
 * @internal
 */
export function compareTextSpans(a: Partial<TextSpan> | undefined, b: Partial<TextSpan> | undefined): Comparison {
    return compareValues(a?.start, b?.start) || compareValues(a?.length, b?.length);
}

export function createSortedArray<T>(): SortedArray<T> {
    return [] as any as SortedArray<T>; // TODO: GH#19873
}


/**
 * Creates a map from the elements of an array.
 *
 * @param array the array of input elements.
 * @param makeKey a function that produces a key for a given element.
 *
 * This function makes no effort to avoid collisions; if any two elements produce
 * the same key with the given 'makeKey' function, then the element with the higher
 * index in the array will be the one associated with the produced key.
 *
 * @internal
 */
export function arrayToMap<K, V>(array: readonly V[], makeKey: (value: V) => K | undefined): Map<K, V>;
/** @internal */
export function arrayToMap<K, V1, V2>(array: readonly V1[], makeKey: (value: V1) => K | undefined, makeValue: (value: V1) => V2): Map<K, V2>;
/** @internal */
export function arrayToMap<T>(array: readonly T[], makeKey: (value: T) => string | undefined): Map<string, T>;
/** @internal */
export function arrayToMap<T, U>(array: readonly T[], makeKey: (value: T) => string | undefined, makeValue: (value: T) => U): Map<string, U>;
/** @internal */
export function arrayToMap<K, V1, V2>(array: readonly V1[], makeKey: (value: V1) => K | undefined, makeValue: (value: V1) => V1 | V2 = identity): Map<K, V1 | V2> {
    const result = new Map<K, V1 | V2>();
    for (const value of array) {
        const key = makeKey(value);
        if (key !== undefined) result.set(key, makeValue(value));
    }
    return result;
}

/** @internal */
export function assign<T extends object>(t: T, ...args: (T | undefined)[]) {
    for (const arg of args) {
        if (arg === undefined) continue;
        for (const p in arg) {
            if (hasProperty(arg, p)) {
                t[p] = arg[p];
            }
        }
    }
    return t;
}

/** @internal */
export function toArray<T>(value: T | T[]): T[];
/** @internal */
export function toArray<T>(value: T | readonly T[]): readonly T[];
/** @internal */
export function toArray<T>(value: T | T[]): T[] {
    return isArray(value) ? value : [value];
}


/**
 * Creates a new object by adding the own properties of `second`, then the own properties of `first`.
 *
 * NOTE: This means that if a property exists in both `first` and `second`, the property in `first` will be chosen.
 *
 * @internal
 */
export function extend<T1, T2>(first: T1, second: T2): T1 & T2 {
    const result: T1 & T2 = {} as any;
    for (const id in second) {
        if (hasOwnProperty.call(second, id)) {
            (result as any)[id] = (second as any)[id];
        }
    }

    for (const id in first) {
        if (hasOwnProperty.call(first, id)) {
            (result as any)[id] = (first as any)[id];
        }
    }

    return result;
}

/** @internal */
export function* singleIterator<T>(value: T) {
    yield value;
}

/** @internal */
export function firstOrUndefinedIterator<T>(iter: Iterable<T> | undefined): T | undefined {
    if (iter) {
        for (const value of iter) {
            return value;
        }
    }
    return undefined;
}

/** @internal */
export function arrayOf<T>(count: number, f: (index: number) => T): T[] {
    const result = new Array(count);
    for (let i = 0; i < count; i++) {
        result[i] = f(i);
    }
    return result;
}

/** @internal */
export function cartesianProduct<T>(arrays: readonly T[][]) {
    const result: T[][] = [];
    cartesianProductWorker(arrays, result, /*outer*/ undefined, 0);
    return result;
}

function cartesianProductWorker<T>(arrays: readonly (readonly T[])[], result: (readonly T[])[], outer: readonly T[] | undefined, index: number) {
    for (const element of arrays[index]) {
        let inner: T[];
        if (outer) {
            inner = outer.slice();
            inner.push(element);
        }
        else {
            inner = [element];
        }
        if (index === arrays.length - 1) {
            result.push(inner);
        }
        else {
            cartesianProductWorker(arrays, result, inner, index + 1);
        }
    }
}

/** @internal */
export function replaceElement<T>(array: readonly T[], index: number, value: T): T[] {
    const result = array.slice(0);
    result[index] = value;
    return result;
}

/**
 * Calls the callback with (start, afterEnd) index pairs for each range where 'pred' is true.
 *
 * @internal
 */
export function getRangesWhere<T>(arr: readonly T[], pred: (t: T) => boolean, cb: (start: number, afterEnd: number) => void): void {
    let start: number | undefined;
    for (let i = 0; i < arr.length; i++) {
        if (pred(arr[i])) {
            start = start === undefined ? i : start;
        }
        else {
            if (start !== undefined) {
                cb(start, i);
                start = undefined;
            }
        }
    }
    if (start !== undefined) cb(start, arr.length);
}

/** @internal */
export function reduceLeftIterator<T, U>(iterator: Iterable<T> | undefined, f: (memo: U, value: T, i: number) => U, initial: U): U {
    let result = initial;
    if (iterator) {
        let pos = 0;
        for (const value of iterator) {
            result = f(result, value, pos);
            pos++;
        }
    }
    return result;
}