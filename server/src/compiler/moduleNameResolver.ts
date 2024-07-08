import { ResolutionMode } from "./types";

export interface ModeAwareCache<T> {
    get(key: string, mode: ResolutionMode): T | undefined;
    set(key: string, mode: ResolutionMode, value: T): this;
    delete(key: string, mode: ResolutionMode): this;
    has(key: string, mode: ResolutionMode): boolean;
    forEach(cb: (elem: T, key: string, mode: ResolutionMode) => void): void;
    size(): number;
}

/** @internal */
export type ModeAwareCacheKey = string & { __modeAwareCacheKey: any; };
/** @internal */
export function createModeAwareCacheKey(specifier: string, mode: ResolutionMode) {
    return (mode === undefined ? specifier : `${mode}|${specifier}`) as ModeAwareCacheKey;
}
/** @internal */
export function createModeAwareCache<T>(): ModeAwareCache<T> {
    const underlying = new Map<ModeAwareCacheKey, T>();
    const memoizedReverseKeys = new Map<ModeAwareCacheKey, [specifier: string, mode: ResolutionMode]>();

    const cache: ModeAwareCache<T> = {
        get(specifier, mode) {
            return underlying.get(getUnderlyingCacheKey(specifier, mode));
        },
        set(specifier, mode, value) {
            underlying.set(getUnderlyingCacheKey(specifier, mode), value);
            return cache;
        },
        delete(specifier, mode) {
            underlying.delete(getUnderlyingCacheKey(specifier, mode));
            return cache;
        },
        has(specifier, mode) {
            return underlying.has(getUnderlyingCacheKey(specifier, mode));
        },
        forEach(cb) {
            return underlying.forEach((elem, key) => {
                const [specifier, mode] = memoizedReverseKeys.get(key)!;
                return cb(elem, specifier, mode);
            });
        },
        size() {
            return underlying.size;
        },
    };
    return cache;

    function getUnderlyingCacheKey(specifier: string, mode: ResolutionMode) {
        const result = createModeAwareCacheKey(specifier, mode);
        memoizedReverseKeys.set(result, [specifier, mode]);
        return result;
    }
}