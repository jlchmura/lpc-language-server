/** @internal */
export type EqualityComparer<T> = (a: T, b: T) => boolean;

export interface SortedArray<T> extends Array<T> {
    " __sortedArrayBrand": any;
}

export interface SortedReadonlyArray<T> extends ReadonlyArray<T> {
    " __sortedArrayBrand": any;
}

/** @internal */
export type Comparer<T> = (a: T, b: T) => Comparison;

/** @internal */
export const enum Comparison {
    LessThan = -1,
    EqualTo = 0,
    GreaterThan = 1,
}

