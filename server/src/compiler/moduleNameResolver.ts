import { CompilerOptions, DiagnosticMessage, formatMessage, ModuleResolutionHost, ResolutionMode, ResolvedModuleWithFailedLookupLocations, ResolvedProjectReference } from "./_namespaces/lpc.js";

export interface ModeAwareCache<T> {
    get(key: string, mode: ResolutionMode): T | undefined;
    set(key: string, mode: ResolutionMode, value: T): this;
    delete(key: string, mode: ResolutionMode): this;
    has(key: string, mode: ResolutionMode): boolean;
    forEach(cb: (elem: T, key: string, mode: ResolutionMode) => void): void;
    size(): number;
}

/** @internal */
export function isTraceEnabled(compilerOptions: CompilerOptions, host: ModuleResolutionHost): boolean {
    return !!compilerOptions.traceResolution && host.trace !== undefined;
}

/** @internal */
export function trace(host: ModuleResolutionHost, message: DiagnosticMessage, ...args: any[]): void {
    host.trace!(formatMessage(message, ...args));
}

export interface PackageJsonInfoCache {
    // /** @internal */ getPackageJsonInfo(packageJsonPath: string): PackageJsonInfoCacheEntry | undefined;
    // /** @internal */ setPackageJsonInfo(packageJsonPath: string, info: PackageJsonInfoCacheEntry): void;
    // /** @internal */ getInternalMap(): Map<Path, PackageJsonInfoCacheEntry> | undefined;
    // clear(): void;
    // /** @internal */ isReadonly?: boolean;
}

export interface NonRelativeNameResolutionCache<T> {
    getFromNonRelativeNameCache(nonRelativeName: string, mode: ResolutionMode, directoryName: string, redirectedReference: ResolvedProjectReference | undefined): T | undefined;
    getOrCreateCacheForNonRelativeName(nonRelativeName: string, mode: ResolutionMode, redirectedReference?: ResolvedProjectReference): PerNonRelativeNameCache<T>;
    clear(): void;
    /**
     *  Updates with the current compilerOptions the cache will operate with.
     *  This updates the redirects map as well if needed so module resolutions are cached if they can across the projects
     */
    update(options: CompilerOptions): void;
    /** @internal */ isReadonly?: boolean;
}

export interface PerNonRelativeNameCache<T> {
    get(directory: string): T | undefined;
    set(directory: string, result: T): void;
    /** @internal */ isReadonly?: boolean;
}

/**
 * Stored map from non-relative module name to a table: directory -> result of module lookup in this directory
 * We support only non-relative module names because resolution of relative module names is usually more deterministic and thus less expensive.
 */
export interface NonRelativeModuleNameResolutionCache extends NonRelativeNameResolutionCache<ResolvedModuleWithFailedLookupLocations>, PackageJsonInfoCache {
    /** @deprecated Use getOrCreateCacheForNonRelativeName */
    // getOrCreateCacheForModuleName(nonRelativeModuleName: string, mode: ResolutionMode, redirectedReference?: ResolvedProjectReference): PerModuleNameCache;
}


export interface ModuleResolutionCache extends PerDirectoryResolutionCache<ResolvedModuleWithFailedLookupLocations>, NonRelativeModuleNameResolutionCache, PackageJsonInfoCache {
    // getPackageJsonInfoCache(): PackageJsonInfoCache;
    /** @internal */ clearAllExceptPackageJsonInfoCache(): void;
    // /** @internal */ optionsToRedirectsKey: Map<CompilerOptions, RedirectsCacheKey>;
}


/**
 * Cached resolutions per containing directory.
 * This assumes that any module id will have the same resolution for sibling files located in the same folder.
 */
export interface PerDirectoryResolutionCache<T> {
    getFromDirectoryCache(name: string, mode: ResolutionMode, directoryName: string, redirectedReference: ResolvedProjectReference | undefined): T | undefined;
    getOrCreateCacheForDirectory(directoryName: string, redirectedReference?: ResolvedProjectReference): ModeAwareCache<T>;
    clear(): void;
    /**
     *  Updates with the current compilerOptions the cache will operate with.
     *  This updates the redirects map as well if needed so module resolutions are cached if they can across the projects
     */
    update(options: CompilerOptions): void;
    // /** @internal */ directoryToModuleNameMap: CacheWithRedirects<Path, ModeAwareCache<T>>;
    /** @internal */ isReadonly?: boolean;
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

/** @internal */
export type RedirectsCacheKey = string & { __compilerOptionsKey: any; };


export function createModuleResolutionCache(
    currentDirectory: string,
    getCanonicalFileName: (s: string) => string,
    options?: CompilerOptions,
    packageJsonInfoCache?: PackageJsonInfoCache,
): ModuleResolutionCache;
/** @internal */
export function createModuleResolutionCache(
    currentDirectory: string,
    getCanonicalFileName: (s: string) => string,
    options?: CompilerOptions,
    packageJsonInfoCache?: PackageJsonInfoCache,
    optionsToRedirectsKey?: Map<CompilerOptions, RedirectsCacheKey>, // eslint-disable-line @typescript-eslint/unified-signatures
): ModuleResolutionCache;
export function createModuleResolutionCache(
    currentDirectory: string,
    getCanonicalFileName: (s: string) => string,
    options?: CompilerOptions,
    packageJsonInfoCache?: PackageJsonInfoCache,
    optionsToRedirectsKey?: Map<CompilerOptions, RedirectsCacheKey>,
): ModuleResolutionCache {
    const result = createModuleOrTypeReferenceResolutionCache(
        currentDirectory,
        getCanonicalFileName,
        options,
        packageJsonInfoCache,
        getOriginalOrResolvedModuleFileName,
        optionsToRedirectsKey,
    ) as ModuleResolutionCache;
    result.getOrCreateCacheForModuleName = (nonRelativeName, mode, redirectedReference) => result.getOrCreateCacheForNonRelativeName(nonRelativeName, mode, redirectedReference);
    return result;
}

function createModuleOrTypeReferenceResolutionCache<T>(
    currentDirectory: string,
    getCanonicalFileName: (s: string) => string,
    options: CompilerOptions | undefined,
    packageJsonInfoCache: PackageJsonInfoCache | undefined,
    getResolvedFileName: (result: T) => string | undefined,
    optionsToRedirectsKey: Map<CompilerOptions, RedirectsCacheKey> | undefined,
): ModuleOrTypeReferenceResolutionCache<T> {
    optionsToRedirectsKey ??= new Map();
    const perDirectoryResolutionCache = createPerDirectoryResolutionCache<T>(
        currentDirectory,
        getCanonicalFileName,
        options,
        optionsToRedirectsKey,
    );
    const nonRelativeNameResolutionCache = createNonRelativeNameResolutionCache(
        currentDirectory,
        getCanonicalFileName,
        options,
        getResolvedFileName,
        optionsToRedirectsKey,
    );
    // packageJsonInfoCache ??= createPackageJsonInfoCache(currentDirectory, getCanonicalFileName);

    return {
        ...packageJsonInfoCache,
        ...perDirectoryResolutionCache,
        ...nonRelativeNameResolutionCache,
        clear,
        update,
        getPackageJsonInfoCache: () => packageJsonInfoCache,
        clearAllExceptPackageJsonInfoCache,
        optionsToRedirectsKey,
    };

    function clear() {
        clearAllExceptPackageJsonInfoCache();
        //packageJsonInfoCache!.clear();
    }

    function clearAllExceptPackageJsonInfoCache() {
        perDirectoryResolutionCache.clear();
        nonRelativeNameResolutionCache.clear();
    }

    function update(options: CompilerOptions) {
        perDirectoryResolutionCache.update(options);
        nonRelativeNameResolutionCache.update(options);
    }
}