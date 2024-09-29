import path from "path";
import { combinePaths, CommandLineOption, comparePaths, Comparison, CompilerOptions, Debug, Diagnostic, DiagnosticMessage, DiagnosticReporter, Diagnostics, directoryProbablyExists, directorySeparator, endsWith, Extension, forEachAncestorDirectory, formatMessage, getBaseFileName, GetCanonicalFileName, getCompilerOptionValue, getDirectoryPath, getPathComponents, getPathFromPathComponents, getRootLength, hasProperty, isArray, isDeclarationFileName, isExternalModuleNameRelative, isRootedDiskPath, MapLike, ModuleResolutionHost, ModuleResolutionKind, moduleResolutionOptionDeclarations, normalizePath, normalizeSlashes, PackageId, packageIdToString, Path, pathIsRelative, perfLogger, removeFileExtension, ResolutionMode, ResolvedModuleWithFailedLookupLocations, ResolvedProjectReference, startsWith, toPath } from "./_namespaces/lpc.js";

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

export type PerModuleNameCache = PerNonRelativeNameCache<ResolvedModuleWithFailedLookupLocations>;

/**
 * Stored map from non-relative module name to a table: directory -> result of module lookup in this directory
 * We support only non-relative module names because resolution of relative module names is usually more deterministic and thus less expensive.
 */
export interface NonRelativeModuleNameResolutionCache extends NonRelativeNameResolutionCache<ResolvedModuleWithFailedLookupLocations>, PackageJsonInfoCache {
    /** @deprecated Use getOrCreateCacheForNonRelativeName */
    getOrCreateCacheForModuleName(nonRelativeModuleName: string, mode: ResolutionMode, redirectedReference?: ResolvedProjectReference): PerModuleNameCache;
}


export interface ModuleResolutionCache extends PerDirectoryResolutionCache<ResolvedModuleWithFailedLookupLocations>, NonRelativeModuleNameResolutionCache, PackageJsonInfoCache {
    getPackageJsonInfoCache(): PackageJsonInfoCache;
    /** @internal */ clearAllExceptPackageJsonInfoCache(): void;
    /** @internal */ optionsToRedirectsKey: Map<CompilerOptions, RedirectsCacheKey>;
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
    /** @internal */ directoryToModuleNameMap: CacheWithRedirects<Path, ModeAwareCache<T>>;
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

function getOriginalOrResolvedModuleFileName(result: ResolvedModuleWithFailedLookupLocations) {
    return result.resolvedModule && (result.resolvedModule.originalPath || result.resolvedModule.resolvedFileName);
}

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

interface ModuleOrTypeReferenceResolutionCache<T> extends PerDirectoryResolutionCache<T>, NonRelativeNameResolutionCache<T>, PackageJsonInfoCache {
    getPackageJsonInfoCache(): PackageJsonInfoCache;
    clearAllExceptPackageJsonInfoCache(): void;
    optionsToRedirectsKey: Map<CompilerOptions, RedirectsCacheKey>;
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

/** @internal */
export interface CacheWithRedirects<K, V> {
    getMapOfCacheRedirects(redirectedReference: ResolvedProjectReference | undefined): Map<K, V> | undefined;
    getOrCreateMapOfCacheRedirects(redirectedReference: ResolvedProjectReference | undefined): Map<K, V>;
    update(newOptions: CompilerOptions): void;
    clear(): void;
    getOwnMap(): Map<K, V>;
}

/** @internal */
export function createCacheWithRedirects<K, V>(ownOptions: CompilerOptions | undefined, optionsToRedirectsKey: Map<CompilerOptions, RedirectsCacheKey>): CacheWithRedirects<K, V> {
    const redirectsMap = new Map<CompilerOptions, Map<K, V>>();
    const redirectsKeyToMap = new Map<RedirectsCacheKey, Map<K, V>>();
    let ownMap = new Map<K, V>();
    if (ownOptions) redirectsMap.set(ownOptions, ownMap);
    return {
        getMapOfCacheRedirects,
        getOrCreateMapOfCacheRedirects,
        update,
        clear,
        getOwnMap: () => ownMap,
    };

    function getMapOfCacheRedirects(redirectedReference: ResolvedProjectReference | undefined): Map<K, V> | undefined {
        return redirectedReference ?
            getOrCreateMap(redirectedReference.commandLine.options, /*create*/ false) :
            ownMap;
    }

    function getOrCreateMapOfCacheRedirects(redirectedReference: ResolvedProjectReference | undefined): Map<K, V> {
        return redirectedReference ?
            getOrCreateMap(redirectedReference.commandLine.options, /*create*/ true) :
            ownMap;
    }

    function update(newOptions: CompilerOptions) {
        if (ownOptions !== newOptions) {
            if (ownOptions) ownMap = getOrCreateMap(newOptions, /*create*/ true); // set new map for new options as ownMap
            else redirectsMap.set(newOptions, ownMap); // Use existing map if oldOptions = undefined
            ownOptions = newOptions;
        }
    }

    function getOrCreateMap(redirectOptions: CompilerOptions, create: true): Map<K, V>;
    function getOrCreateMap(redirectOptions: CompilerOptions, create: false): Map<K, V> | undefined;
    function getOrCreateMap(redirectOptions: CompilerOptions, create: boolean): Map<K, V> | undefined {
        let result = redirectsMap.get(redirectOptions);
        if (result) return result;
        const key = getRedirectsCacheKey(redirectOptions);
        result = redirectsKeyToMap.get(key);
        if (!result) {
            if (ownOptions) {
                const ownKey = getRedirectsCacheKey(ownOptions);
                if (ownKey === key) result = ownMap;
                else if (!redirectsKeyToMap.has(ownKey)) redirectsKeyToMap.set(ownKey, ownMap);
            }
            if (create) result ??= new Map();
            if (result) redirectsKeyToMap.set(key, result);
        }
        if (result) redirectsMap.set(redirectOptions, result);
        return result;
    }

    function clear() {
        const ownKey = ownOptions && optionsToRedirectsKey.get(ownOptions);
        ownMap.clear();
        redirectsMap.clear();
        optionsToRedirectsKey.clear();
        redirectsKeyToMap.clear();
        if (ownOptions) {
            if (ownKey) optionsToRedirectsKey.set(ownOptions, ownKey);
            redirectsMap.set(ownOptions, ownMap);
        }
    }

    function getRedirectsCacheKey(options: CompilerOptions) {
        let result = optionsToRedirectsKey.get(options);
        if (!result) {
            optionsToRedirectsKey.set(options, result = getKeyForCompilerOptions(options, moduleResolutionOptionDeclarations) as RedirectsCacheKey);
        }
        return result;
    }
}

function compilerOptionValueToString(value: unknown): string {
    if (value === null || typeof value !== "object") { // eslint-disable-line no-restricted-syntax
        return "" + value;
    }
    if (isArray(value)) {
        return `[${value.map(e => compilerOptionValueToString(e))?.join(",")}]`;
    }
    let str = "{";
    for (const key in value) {
        if (hasProperty(value, key)) {
            str += `${key}: ${compilerOptionValueToString((value as any)[key])}`;
        }
    }
    return str + "}";
}

/** @internal */
export function getKeyForCompilerOptions(options: CompilerOptions, affectingOptionDeclarations: readonly CommandLineOption[]) {
    return affectingOptionDeclarations.map(option => compilerOptionValueToString(getCompilerOptionValue(options, option))).join("|") + `|${options.configFilePath}`;
}

function createNonRelativeNameResolutionCache<T>(
    currentDirectory: string,
    getCanonicalFileName: (s: string) => string,
    options: CompilerOptions | undefined,
    getResolvedFileName: (result: T) => string | undefined,
    optionsToRedirectsKey: Map<CompilerOptions, RedirectsCacheKey>,
): NonRelativeNameResolutionCache<T> {
    const moduleNameToDirectoryMap = createCacheWithRedirects<ModeAwareCacheKey, PerNonRelativeNameCache<T>>(options, optionsToRedirectsKey);
    return {
        getFromNonRelativeNameCache,
        getOrCreateCacheForNonRelativeName,
        clear,
        update,
    };

    function clear() {
        moduleNameToDirectoryMap.clear();
    }

    function update(options: CompilerOptions) {
        moduleNameToDirectoryMap.update(options);
    }

    function getFromNonRelativeNameCache(nonRelativeModuleName: string, mode: ResolutionMode, directoryName: string, redirectedReference?: ResolvedProjectReference): T | undefined {
        // Debug.assert(!isExternalModuleNameRelative(nonRelativeModuleName));
        return moduleNameToDirectoryMap.getMapOfCacheRedirects(redirectedReference)?.get(createModeAwareCacheKey(nonRelativeModuleName, mode))?.get(directoryName);
    }

    function getOrCreateCacheForNonRelativeName(nonRelativeModuleName: string, mode: ResolutionMode, redirectedReference?: ResolvedProjectReference): PerNonRelativeNameCache<T> {
        // Debug.assert(!isExternalModuleNameRelative(nonRelativeModuleName));
        return getOrCreateCache(moduleNameToDirectoryMap, redirectedReference, createModeAwareCacheKey(nonRelativeModuleName, mode), createPerModuleNameCache);
    }

    function createPerModuleNameCache(): PerNonRelativeNameCache<T> {
        const directoryPathMap = new Map<Path, T>();

        return { get, set };

        function get(directory: string): T | undefined {
            return directoryPathMap.get(toPath(directory, currentDirectory, getCanonicalFileName));
        }

        /**
         * At first this function add entry directory -> module resolution result to the table.
         * Then it computes the set of parent folders for 'directory' that should have the same module resolution result
         * and for every parent folder in set it adds entry: parent -> module resolution. .
         * Lets say we first directory name: /a/b/c/d/e and resolution result is: /a/b/bar.ts.
         * Set of parent folders that should have the same result will be:
         * [
         *     /a/b/c/d, /a/b/c, /a/b
         * ]
         * this means that request for module resolution from file in any of these folder will be immediately found in cache.
         */
        function set(directory: string, result: T): void {
            const path = toPath(directory, currentDirectory, getCanonicalFileName);
            // if entry is already in cache do nothing
            if (directoryPathMap.has(path)) {
                return;
            }
            directoryPathMap.set(path, result);

            const resolvedFileName = getResolvedFileName(result);
            // find common prefix between directory and resolved file name
            // this common prefix should be the shortest path that has the same resolution
            // directory: /a/b/c/d/e
            // resolvedFileName: /a/b/foo.d.ts
            // commonPrefix: /a/b
            // for failed lookups cache the result for every directory up to root
            const commonPrefix = resolvedFileName && getCommonPrefix(path, resolvedFileName);
            let current = path;
            while (current !== commonPrefix) {
                const parent = getDirectoryPath(current);
                if (parent === current || directoryPathMap.has(parent)) {
                    break;
                }
                directoryPathMap.set(parent, result);
                current = parent;
            }
        }

        function getCommonPrefix(directory: Path, resolution: string) {
            const resolutionDirectory = toPath(getDirectoryPath(resolution), currentDirectory, getCanonicalFileName);

            // find first position where directory and resolution differs
            let i = 0;
            const limit = Math.min(directory.length, resolutionDirectory.length);
            while (i < limit && directory.charCodeAt(i) === resolutionDirectory.charCodeAt(i)) {
                i++;
            }
            if (i === directory.length && (resolutionDirectory.length === i || resolutionDirectory[i] === directorySeparator)) {
                return directory;
            }
            const rootLength = getRootLength(directory);
            if (i < rootLength) {
                return undefined;
            }
            const sep = directory.lastIndexOf(directorySeparator, i - 1);
            if (sep === -1) {
                return undefined;
            }
            return directory.substr(0, Math.max(sep, rootLength));
        }
    }
}

function createPerDirectoryResolutionCache<T>(
    currentDirectory: string,
    getCanonicalFileName: GetCanonicalFileName,
    options: CompilerOptions | undefined,
    optionsToRedirectsKey: Map<CompilerOptions, RedirectsCacheKey>,
): PerDirectoryResolutionCache<T> {
    const directoryToModuleNameMap = createCacheWithRedirects<Path, ModeAwareCache<T>>(options, optionsToRedirectsKey);
    return {
        getFromDirectoryCache,
        getOrCreateCacheForDirectory,
        clear,
        update,
        directoryToModuleNameMap,
    };

    function clear() {
        directoryToModuleNameMap.clear();
    }

    function update(options: CompilerOptions) {
        directoryToModuleNameMap.update(options);
    }

    function getOrCreateCacheForDirectory(directoryName: string, redirectedReference?: ResolvedProjectReference) {
        const path = toPath(directoryName, currentDirectory, getCanonicalFileName);
        return getOrCreateCache(directoryToModuleNameMap, redirectedReference, path, () => createModeAwareCache());
    }

    function getFromDirectoryCache(name: string, mode: ResolutionMode, directoryName: string, redirectedReference: ResolvedProjectReference | undefined) {
        const path = toPath(directoryName, currentDirectory, getCanonicalFileName);
        return directoryToModuleNameMap.getMapOfCacheRedirects(redirectedReference)?.get(path)?.get(name, mode);
    }
}

export function resolveModuleName(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost, cache?: ModuleResolutionCache, redirectedReference?: ResolvedProjectReference, resolutionMode?: ResolutionMode): ResolvedModuleWithFailedLookupLocations {
    const traceEnabled = isTraceEnabled(compilerOptions, host);
    if (redirectedReference) {
        compilerOptions = redirectedReference.commandLine.options;
    }
    if (traceEnabled) {
        trace(host, Diagnostics.Resolving_module_0_from_1, moduleName, containingFile);
        if (redirectedReference) {
            trace(host, Diagnostics.Using_compiler_options_of_project_reference_redirect_0, redirectedReference.sourceFile.fileName);
        }
    }
    const containingDirectory = getDirectoryPath(containingFile);
    let result = cache?.getFromDirectoryCache(moduleName, resolutionMode, containingDirectory, redirectedReference);

    if (result) {
        if (traceEnabled) {
            trace(host, Diagnostics.Resolution_for_module_0_was_found_in_cache_from_location_1, moduleName, containingDirectory);
        }
    }
    else {
        let moduleResolution = ModuleResolutionKind.Classic;//compilerOptions.moduleResolution;
        if (moduleResolution === undefined) {
            // moduleResolution = ModuleResolutionKind.Classic;// getEmitModuleResolutionKind(compilerOptions);
            // if (traceEnabled) {
            //     trace(host, Diagnostics.Module_resolution_kind_is_not_specified_using_0, ModuleResolutionKind[moduleResolution]);
            // }
        }
        else {
            if (traceEnabled) {
                trace(host, Diagnostics.Explicitly_specified_module_resolution_kind_Colon_0, ModuleResolutionKind[moduleResolution]);
            }
        }

        perfLogger?.logStartResolveModule(moduleName /* , containingFile, ModuleResolutionKind[moduleResolution]*/);
        switch (moduleResolution) {
            // case ModuleResolutionKind.Node16:
            //     result = node16ModuleNameResolver(moduleName, containingFile, compilerOptions, host, cache, redirectedReference, resolutionMode);
            //     break;
            // case ModuleResolutionKind.NodeNext:
            //     result = nodeNextModuleNameResolver(moduleName, containingFile, compilerOptions, host, cache, redirectedReference, resolutionMode);
            //     break;
            // case ModuleResolutionKind.Node10:
            //     result = nodeModuleNameResolver(moduleName, containingFile, compilerOptions, host, cache, redirectedReference, resolutionMode ? getConditions(compilerOptions, resolutionMode) : undefined);
            //     break;
            case ModuleResolutionKind.Classic:
                result = classicNameResolver(moduleName, containingFile, compilerOptions, host, cache, redirectedReference);
                break;
            // case ModuleResolutionKind.Bundler:
            //     result = bundlerModuleNameResolver(moduleName, containingFile, compilerOptions, host, cache, redirectedReference, resolutionMode ? getConditions(compilerOptions, resolutionMode) : undefined);
            //     break;
            default:
                return Debug.fail(`Unexpected moduleResolution: ${moduleResolution}`);
        }
        if (result && result.resolvedModule) perfLogger?.logInfoEvent(`Module "${moduleName}" resolved to "${result.resolvedModule.resolvedFileName}"`);
        perfLogger?.logStopResolveModule((result && result.resolvedModule) ? "" + result.resolvedModule.resolvedFileName : "null");

        if (cache && !cache.isReadonly) {
            cache.getOrCreateCacheForDirectory(containingDirectory, redirectedReference).set(moduleName, resolutionMode, result);
            if (!isExternalModuleNameRelative(moduleName)) {
                // put result in per-module name cache
                cache.getOrCreateCacheForNonRelativeName(moduleName, resolutionMode, redirectedReference).set(containingDirectory, result);
            }
        }
    }

    if (traceEnabled) {
        if (result.resolvedModule) {
            if (result.resolvedModule.packageId) {
                trace(host, Diagnostics.Module_name_0_was_successfully_resolved_to_1_with_Package_ID_2, moduleName, result.resolvedModule.resolvedFileName, packageIdToString(result.resolvedModule.packageId));
            }
            else {
                trace(host, Diagnostics.Module_name_0_was_successfully_resolved_to_1, moduleName, result.resolvedModule.resolvedFileName);
            }
        }
        else {
            trace(host, Diagnostics.Module_name_0_was_not_resolved, moduleName);
        }
    }

    return result;
}

/** @internal */
export enum NodeResolutionFeatures {
    None = 0,
    // resolving `#local` names in your own package.json
    Imports = 1 << 1,
    // resolving `your-own-name` from your own package.json
    SelfName = 1 << 2,
    // respecting the `.exports` member of packages' package.json files and its (conditional) mappings of export names
    Exports = 1 << 3,
    // allowing `*` in the LHS of an export to be followed by more content, eg `"./whatever/*.js"`
    // not supported in node 12 - https://github.com/nodejs/Release/issues/690
    ExportsPatternTrailers = 1 << 4,
    AllFeatures = Imports | SelfName | Exports | ExportsPatternTrailers,

    Node16Default = Imports | SelfName | Exports | ExportsPatternTrailers,

    NodeNextDefault = AllFeatures,

    BundlerDefault = Imports | SelfName | Exports | ExportsPatternTrailers,

    EsmMode = 1 << 5,
}

/** @internal */
export interface ModuleResolutionState {
    host: ModuleResolutionHost;
    compilerOptions: CompilerOptions;
    traceEnabled: boolean;
    failedLookupLocations: string[] | undefined;
    affectingLocations: string[] | undefined;
    resultFromCache?: ResolvedModuleWithFailedLookupLocations;
    packageJsonInfoCache: PackageJsonInfoCache | undefined;
    features: NodeResolutionFeatures;
    conditions: readonly string[];
    requestContainingDirectory: string | undefined;
    reportDiagnostic: DiagnosticReporter;
    isConfigLookup: boolean;
    candidateIsFromPackageJsonField: boolean;
    resolvedPackageDirectory: boolean;
}

/** @internal */
export const nodeModulesPathPart = "/node_modules/";
/** @internal */
export function pathContainsNodeModules(path: string): boolean {
    return path.includes(nodeModulesPathPart);
}

export function classicNameResolver(moduleName: string, containingFile: string, compilerOptions: CompilerOptions, host: ModuleResolutionHost, cache?: NonRelativeModuleNameResolutionCache, redirectedReference?: ResolvedProjectReference): ResolvedModuleWithFailedLookupLocations {
    const traceEnabled = isTraceEnabled(compilerOptions, host);
    const failedLookupLocations: string[] = [];
    const affectingLocations: string[] = [];
    const containingDirectory = getDirectoryPath(containingFile);
    const diagnostics: Diagnostic[] = [];
    const state: ModuleResolutionState = {
        compilerOptions,
        host,
        traceEnabled,
        failedLookupLocations,
        affectingLocations,
        packageJsonInfoCache: cache,
        features: NodeResolutionFeatures.None,
        conditions: [],
        requestContainingDirectory: containingDirectory,
        reportDiagnostic: diag => void diagnostics.push(diag),
        isConfigLookup: false,
        candidateIsFromPackageJsonField: false,
        resolvedPackageDirectory: false,
    };

    const resolved = tryResolve(Extensions.LPC | Extensions.Declaration);
    //  || tryResolve(Extensions.JavaScript | (compilerOptions.resolveJsonModule ? Extensions.Json : 0));
    
    // No originalPath because classic resolution doesn't resolve realPath
    return createResolvedModuleWithFailedLookupLocationsHandlingSymlink(
        moduleName,
        resolved && resolved.value,
        resolved?.value && pathContainsNodeModules(resolved.value.path),
        failedLookupLocations,
        affectingLocations,
        diagnostics,
        state,
        cache,
    );

    function tryResolve(extensions: Extensions): SearchResult<Resolved> {
        const resolvedUsingSettings = tryLoadModuleUsingOptionalResolutionSettings(extensions, moduleName, containingDirectory, loadModuleFromFileNoPackageId, state);
        if (resolvedUsingSettings) {
            return { value: resolvedUsingSettings };
        }

        // TODO: if path is rooted, need to re-map it to lib root here
        if (isRootedDiskPath(moduleName)) {
            const pathComps = getPathComponents(state.compilerOptions.configFilePath);
            const libPath = getPathFromPathComponents(pathComps.slice(0, pathComps.length - 1));
            const searchName = normalizePath(combinePaths(libPath, "." + moduleName));
            return toSearchResult(loadModuleFromFileNoPackageId(extensions, searchName, /*onlyRecordFailures*/ false, state));
        }

        if (!isExternalModuleNameRelative(moduleName)) {
            // Climb up parent directories looking for a module.
            const resolved = forEachAncestorDirectory(containingDirectory, directory => {
                const resolutionFromCache = tryFindNonRelativeModuleNameInCache(cache, moduleName, /*mode*/ undefined, directory, redirectedReference, state);
                if (resolutionFromCache) {
                    return resolutionFromCache;
                }
                const searchName = normalizePath(combinePaths(directory, moduleName));
                return toSearchResult(loadModuleFromFileNoPackageId(extensions, searchName, /*onlyRecordFailures*/ false, state));
            });
            if (resolved) return resolved;
            if (extensions & (Extensions.LPC | Extensions.Declaration)) {
                // If we didn't find the file normally, look it up in @types.
                let resolved = loadModuleFromNearestNodeModulesDirectoryTypesScope(moduleName, containingDirectory, state);
                if (extensions & Extensions.Declaration) resolved ??= resolveFromTypeRoot(moduleName, state);
                return resolved;
            }
        }
        else {
            const candidate = normalizePath(combinePaths(containingDirectory, moduleName));
            return toSearchResult(loadModuleFromFileNoPackageId(extensions, candidate, /*onlyRecordFailures*/ false, state));
        }
    }
}

function getOrCreateCache<K, V>(cacheWithRedirects: CacheWithRedirects<K, V>, redirectedReference: ResolvedProjectReference | undefined, key: K, create: () => V): V {
    const cache = cacheWithRedirects.getOrCreateMapOfCacheRedirects(redirectedReference);
    let result = cache.get(key);
    if (!result) {
        result = create();
        cache.set(key, result);
    }
    return result;
}

// dprint-ignore
/**
 * Kinds of file that we are currently looking for.
 */
const enum Extensions {
    LPC         = 1 << 0, // '.c', '.h', '.lpc'
    JavaScript  = 1 << 1, // '.js', '.jsx', '.mjs', '.cjs'
    Declaration = 1 << 2, // '.d.ts', etc.
    Json        = 1 << 3, // '.json'

    ImplementationFiles = LPC | JavaScript,
}

function formatExtensions(extensions: Extensions) {
    const result: string[] = [];
    if (extensions & Extensions.LPC) result.push("LPC");
    if (extensions & Extensions.JavaScript) result.push("JavaScript");
    if (extensions & Extensions.Declaration) result.push("Declaration");
    if (extensions & Extensions.Json) result.push("JSON");
    return result.join(", ");
}


/** Result of trying to resolve a module. */
interface Resolved {
    path: string;
    extension: string;
    packageId: PackageId | undefined;
    /**
     * When the resolved is not created from cache, the value is
     *  - string if it is symbolic link to the resolved `path`
     *  - undefined if `path` is not a symbolic link
     * When the resolved is created using value from cache of ResolvedModuleWithFailedLookupLocations, the value is:
     *  - string if it is symbolic link to the resolved `path`
     *  - true if `path` is not a symbolic link - this indicates that the `originalPath` calculation is already done and needs to be skipped
     * Note: This is a file name with preserved original casing, not a normalized `Path`.
     */
    originalPath?: string | true;
    resolvedUsingTsExtension: boolean | undefined;
}

function createResolvedModuleWithFailedLookupLocationsHandlingSymlink(
    moduleName: string,
    resolved: Resolved | undefined,
    isExternalLibraryImport: boolean | undefined,
    failedLookupLocations: string[],
    affectingLocations: string[],
    diagnostics: Diagnostic[],
    state: ModuleResolutionState,
    cache: ModuleResolutionCache | NonRelativeModuleNameResolutionCache | undefined,
    alternateResult?: string,
): ResolvedModuleWithFailedLookupLocations {
    // If this is from node_modules for non relative name, always respect preserveSymlinks
    if (
        !state.resultFromCache &&
        !state.compilerOptions.preserveSymlinks &&
        resolved &&
        isExternalLibraryImport &&
        !resolved.originalPath &&
        !isExternalModuleNameRelative(moduleName)
    ) {
        const { resolvedFileName, originalPath } = getOriginalAndResolvedFileName(resolved.path, state.host, state.traceEnabled);
        if (originalPath) resolved = { ...resolved, path: resolvedFileName, originalPath };
    }
    return createResolvedModuleWithFailedLookupLocations(
        resolved,
        isExternalLibraryImport,
        failedLookupLocations,
        affectingLocations,
        diagnostics,
        state.resultFromCache,
        cache,
        alternateResult,
    );
}

function createResolvedModuleWithFailedLookupLocations(
    resolved: Resolved | undefined,
    isExternalLibraryImport: boolean | undefined,
    failedLookupLocations: string[],
    affectingLocations: string[],
    diagnostics: Diagnostic[],
    resultFromCache: ResolvedModuleWithFailedLookupLocations | undefined,
    cache: ModuleResolutionCache | NonRelativeModuleNameResolutionCache | undefined,
    alternateResult?: string,
): ResolvedModuleWithFailedLookupLocations {
    if (resultFromCache) {
        if (!cache?.isReadonly) {
            resultFromCache.failedLookupLocations = updateResolutionField(resultFromCache.failedLookupLocations, failedLookupLocations);
            resultFromCache.affectingLocations = updateResolutionField(resultFromCache.affectingLocations, affectingLocations);
            resultFromCache.resolutionDiagnostics = updateResolutionField(resultFromCache.resolutionDiagnostics, diagnostics);
            return resultFromCache;
        }
        else {
            return {
                ...resultFromCache,
                failedLookupLocations: initializeResolutionFieldForReadonlyCache(resultFromCache.failedLookupLocations, failedLookupLocations),
                affectingLocations: initializeResolutionFieldForReadonlyCache(resultFromCache.affectingLocations, affectingLocations),
                resolutionDiagnostics: initializeResolutionFieldForReadonlyCache(resultFromCache.resolutionDiagnostics, diagnostics),
            };
        }
    }
    return {
        resolvedModule: resolved && {
            resolvedFileName: resolved.path,
            originalPath: resolved.originalPath === true ? undefined : resolved.originalPath,
            extension: resolved.extension,
            isExternalLibraryImport,
            packageId: resolved.packageId,
            resolvedUsingTsExtension: !!resolved.resolvedUsingTsExtension,
        },
        failedLookupLocations: initializeResolutionField(failedLookupLocations),
        affectingLocations: initializeResolutionField(affectingLocations),
        resolutionDiagnostics: initializeResolutionField(diagnostics),
        alternateResult,
    };
}
function initializeResolutionField<T>(value: T[]): T[] | undefined {
    return value.length ? value : undefined;
}
/** @internal */
export function updateResolutionField<T>(to: T[] | undefined, value: T[] | undefined) {
    if (!value?.length) return to;
    if (!to?.length) return value;
    to.push(...value);
    return to;
}

function initializeResolutionFieldForReadonlyCache<T>(fromCache: T[] | undefined, value: T[]): T[] | undefined {
    if (!fromCache?.length) return initializeResolutionField(value);
    if (!value.length) return fromCache.slice();
    return [...fromCache, ...value];
}

function realPath(path: string, host: ModuleResolutionHost, traceEnabled: boolean): string {
    if (!host.realpath) {
        return path;
    }

    const real = normalizePath(host.realpath(path));
    if (traceEnabled) {
        trace(host, Diagnostics.Resolving_real_path_for_0_result_1, path, real);
    }
    return real;
}

function arePathsEqual(path1: string, path2: string, host: ModuleResolutionHost): boolean {
    const useCaseSensitiveFileNames = typeof host.useCaseSensitiveFileNames === "function" ? host.useCaseSensitiveFileNames() : host.useCaseSensitiveFileNames;
    return comparePaths(path1, path2, !useCaseSensitiveFileNames) === Comparison.EqualTo;
}

function getOriginalAndResolvedFileName(fileName: string, host: ModuleResolutionHost, traceEnabled: boolean) {
    const resolvedFileName = realPath(fileName, host, traceEnabled);
    const pathsAreEqual = arePathsEqual(fileName, resolvedFileName, host);
    return {
        // If the fileName and realpath are differing only in casing prefer fileName so that we can issue correct errors for casing under forceConsistentCasingInFileNames
        resolvedFileName: pathsAreEqual ? fileName : resolvedFileName,
        originalPath: pathsAreEqual ? undefined : fileName,
    };
}


/**
 * Represents result of search. Normally when searching among several alternatives we treat value `undefined` as indicator
 * that search fails and we should try another option.
 * However this does not allow us to represent final result that should be used instead of further searching (i.e. a final result that was found in cache).
 * SearchResult is used to deal with this issue, its values represents following outcomes:
 * - undefined - not found, continue searching
 * - { value: undefined } - not found - stop searching
 * - { value: <some-value> } - found - stop searching
 */
type SearchResult<T> = { value: T | undefined; } | undefined;


/**
 * Wraps value to SearchResult.
 * @returns undefined if value is undefined or { value } otherwise
 */
function toSearchResult<T>(value: T | undefined): SearchResult<T> {
    return value !== undefined ? { value } : undefined;
}


/*
 * Every module resolution kind can has its specific understanding how to load module from a specific path on disk
 * I.e. for path '/a/b/c':
 * - Node loader will first to try to check if '/a/b/c' points to a file with some supported extension and if this fails
 * it will try to load module from directory: directory '/a/b/c' should exist and it should have either 'package.json' with
 * 'typings' entry or file 'index' with some supported extension
 * - Classic loader will only try to interpret '/a/b/c' as file.
 */
type ResolutionKindSpecificLoader = (extensions: Extensions, candidate: string, onlyRecordFailures: boolean, state: ModuleResolutionState) => Resolved | undefined;

/**
 * Any module resolution kind can be augmented with optional settings: 'baseUrl', 'paths' and 'rootDirs' - they are used to
 * mitigate differences between design time structure of the project and its runtime counterpart so the same import name
 * can be resolved successfully by TypeScript compiler and runtime module loader.
 * If these settings are set then loading procedure will try to use them to resolve module name and it can of failure it will
 * fallback to standard resolution routine.
 *
 * - baseUrl - this setting controls how non-relative module names are resolved. If this setting is specified then non-relative
 * names will be resolved relative to baseUrl: i.e. if baseUrl is '/a/b' then candidate location to resolve module name 'c/d' will
 * be '/a/b/c/d'
 * - paths - this setting can only be used when baseUrl is specified. allows to tune how non-relative module names
 * will be resolved based on the content of the module name.
 * Structure of 'paths' compiler options
 * 'paths': {
 *    pattern-1: [...substitutions],
 *    pattern-2: [...substitutions],
 *    ...
 *    pattern-n: [...substitutions]
 * }
 * Pattern here is a string that can contain zero or one '*' character. During module resolution module name will be matched against
 * all patterns in the list. Matching for patterns that don't contain '*' means that module name must be equal to pattern respecting the case.
 * If pattern contains '*' then to match pattern "<prefix>*<suffix>" module name must start with the <prefix> and end with <suffix>.
 * <MatchedStar> denotes part of the module name between <prefix> and <suffix>.
 * If module name can be matches with multiple patterns then pattern with the longest prefix will be picked.
 * After selecting pattern we'll use list of substitutions to get candidate locations of the module and the try to load module
 * from the candidate location.
 * Substitution is a string that can contain zero or one '*'. To get candidate location from substitution we'll pick every
 * substitution in the list and replace '*' with <MatchedStar> string. If candidate location is not rooted it
 * will be converted to absolute using baseUrl.
 * For example:
 * baseUrl: /a/b/c
 * "paths": {
 *     // match all module names
 *     "*": [
 *         "*",        // use matched name as is,
 *                     // <matched name> will be looked as /a/b/c/<matched name>
 *
 *         "folder1/*" // substitution will convert matched name to 'folder1/<matched name>',
 *                     // since it is not rooted then final candidate location will be /a/b/c/folder1/<matched name>
 *     ],
 *     // match module names that start with 'components/'
 *     "components/*": [ "/root/components/*" ] // substitution will convert /components/folder1/<matched name> to '/root/components/folder1/<matched name>',
 *                                              // it is rooted so it will be final candidate location
 * }
 *
 * 'rootDirs' allows the project to be spreaded across multiple locations and resolve modules with relative names as if
 * they were in the same location. For example lets say there are two files
 * '/local/src/content/file1.ts'
 * '/shared/components/contracts/src/content/protocols/file2.ts'
 * After bundling content of '/shared/components/contracts/src' will be merged with '/local/src' so
 * if file1 has the following import 'import {x} from "./protocols/file2"' it will be resolved successfully in runtime.
 * 'rootDirs' provides the way to tell compiler that in order to get the whole project it should behave as if content of all
 * root dirs were merged together.
 * I.e. for the example above 'rootDirs' will have two entries: [ '/local/src', '/shared/components/contracts/src' ].
 * Compiler will first convert './protocols/file2' into absolute path relative to the location of containing file:
 * '/local/src/content/protocols/file2' and try to load it - failure.
 * Then it will search 'rootDirs' looking for a longest matching prefix of this absolute path and if such prefix is found - absolute path will
 * be converted to a path relative to found rootDir entry './content/protocols/file2' (*). As a last step compiler will check all remaining
 * entries in 'rootDirs', use them to build absolute path out of (*) and try to resolve module from this location.
 */
function tryLoadModuleUsingOptionalResolutionSettings(extensions: Extensions, moduleName: string, containingDirectory: string, loader: ResolutionKindSpecificLoader, state: ModuleResolutionState): Resolved | undefined {
    // const resolved = tryLoadModuleUsingPathsIfEligible(extensions, moduleName, loader, state);
    // if (resolved) return resolved.value;

    // TODO: implement if needed
    // if (!isExternalModuleNameRelative(moduleName)) {
    //     return tryLoadModuleUsingBaseUrl(extensions, moduleName, loader, state);
    // }
    // else {
        return tryLoadModuleUsingRootDirs(extensions, moduleName, containingDirectory, loader, state);
    // }
}

function tryLoadModuleUsingRootDirs(extensions: Extensions, moduleName: string, containingDirectory: string, loader: ResolutionKindSpecificLoader, state: ModuleResolutionState): Resolved | undefined {
    if (!state.compilerOptions.rootDir) {
        return undefined;
    }

    if (state.traceEnabled) {
        trace(state.host, Diagnostics.rootDirs_option_is_set_using_it_to_resolve_relative_module_name_0, moduleName);
    }

    const candidate = normalizePath(combinePaths(containingDirectory, moduleName));

    let matchedRootDir: string | undefined;
    let matchedNormalizedPrefix: string | undefined;
    for (const rootDir of state.compilerOptions.rootDir) {
        // rootDirs are expected to be absolute
        // in case of tsconfig.json this will happen automatically - compiler will expand relative names
        // using location of tsconfig.json as base location
        let normalizedRoot = normalizePath(rootDir);
        if (!endsWith(normalizedRoot, directorySeparator)) {
            normalizedRoot += directorySeparator;
        }
        const isLongestMatchingPrefix = startsWith(candidate, normalizedRoot) &&
            (matchedNormalizedPrefix === undefined || matchedNormalizedPrefix.length < normalizedRoot.length);

        if (state.traceEnabled) {
            trace(state.host, Diagnostics.Checking_if_0_is_the_longest_matching_prefix_for_1_2, normalizedRoot, candidate, isLongestMatchingPrefix);
        }

        if (isLongestMatchingPrefix) {
            matchedNormalizedPrefix = normalizedRoot;
            matchedRootDir = rootDir;
        }
    }
    if (matchedNormalizedPrefix) {
        if (state.traceEnabled) {
            trace(state.host, Diagnostics.Longest_matching_prefix_for_0_is_1, candidate, matchedNormalizedPrefix);
        }
        const suffix = candidate.substr(matchedNormalizedPrefix.length);

        // first - try to load from a initial location
        if (state.traceEnabled) {
            trace(state.host, Diagnostics.Loading_0_from_the_root_dir_1_candidate_location_2, suffix, matchedNormalizedPrefix, candidate);
        }
        const resolvedFileName = loader(extensions, candidate, !directoryProbablyExists(containingDirectory, state.host), state);
        if (resolvedFileName) {
            return resolvedFileName;
        }

        if (state.traceEnabled) {
            trace(state.host, Diagnostics.Trying_other_entries_in_rootDirs);
        }
        // then try to resolve using remaining entries in rootDirs
        for (const rootDir of state.compilerOptions.rootDir) {
            if (rootDir === matchedRootDir) {
                // skip the initially matched entry
                continue;
            }
            const candidate = combinePaths(normalizePath(rootDir), suffix);
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.Loading_0_from_the_root_dir_1_candidate_location_2, suffix, rootDir, candidate);
            }
            const baseDirectory = getDirectoryPath(candidate);
            const resolvedFileName = loader(extensions, candidate, !directoryProbablyExists(baseDirectory, state.host), state);
            if (resolvedFileName) {
                return resolvedFileName;
            }
        }
        if (state.traceEnabled) {
            trace(state.host, Diagnostics.Module_resolution_using_rootDirs_has_failed);
        }
    }
    return undefined;
}

function tryFindNonRelativeModuleNameInCache(cache: NonRelativeModuleNameResolutionCache | undefined, moduleName: string, mode: ResolutionMode, containingDirectory: string, redirectedReference: ResolvedProjectReference | undefined, state: ModuleResolutionState): SearchResult<Resolved> {
    const result = cache && cache.getFromNonRelativeNameCache(moduleName, mode, containingDirectory, redirectedReference);
    if (result) {
        if (state.traceEnabled) {
            trace(state.host, Diagnostics.Resolution_for_module_0_was_found_in_cache_from_location_1, moduleName, containingDirectory);
        }
        state.resultFromCache = result;
        return {
            value: result.resolvedModule && {
                path: result.resolvedModule.resolvedFileName,
                originalPath: result.resolvedModule.originalPath || true,
                extension: result.resolvedModule.extension,
                packageId: result.resolvedModule.packageId,
                resolvedUsingTsExtension: result.resolvedModule.resolvedUsingTsExtension,
            },
        };
    }
}

/** Result of trying to resolve a module at a file. Needs to have 'packageId' added later. */
interface PathAndExtension {
    path: string;
    // (Use a different name than `extension` to make sure Resolved isn't assignable to PathAndExtension.)
    ext: string;
    resolvedUsingTsExtension: boolean | undefined;
}

/** @internal */
export interface PackageJsonInfo {
    packageDirectory: string;
    contents: PackageJsonInfoContents;
}


/** Just the fields that we use for module resolution.
 *
 * @internal
 */
export interface PackageJsonPathFields {
    typings?: string;
    types?: string;
    typesVersions?: MapLike<MapLike<string[]>>;
    main?: string;
    tsconfig?: string;
    type?: string;
    imports?: object;
    exports?: object;
    name?: string;
    dependencies?: MapLike<string>;
    peerDependencies?: MapLike<string>;
    optionalDependencies?: MapLike<string>;
}


/** @internal */
export interface VersionPaths {
    version: string;
    paths: MapLike<string[]>;
}


/** @internal */
export interface PackageJsonInfoContents {
    packageJsonContent: PackageJsonPathFields;
    /** false: versionPaths are not present. undefined: not yet resolved */
    versionPaths: VersionPaths | false | undefined;
    /** false: resolved to nothing. undefined: not yet resolved */
    resolvedEntrypoints: string[] | false | undefined;
    /** false: peerDependencies are not present. undefined: not yet resolved */
    peerDependencies: string | false | undefined;
}
interface PackageJson extends PackageJsonPathFields {
    name?: string;
    version?: string;
}

function withPackageId(packageInfo: PackageJsonInfo | undefined, r: PathAndExtension | undefined, state: ModuleResolutionState): Resolved | undefined {
    let packageId: PackageId | undefined;
    if (r && packageInfo) {
        const packageJsonContent = packageInfo.contents.packageJsonContent as PackageJson;
        if (typeof packageJsonContent.name === "string" && typeof packageJsonContent.version === "string") {
            packageId = {
                name: packageJsonContent.name,
                subModuleName: r.path.slice(packageInfo.packageDirectory.length + directorySeparator.length),
                version: packageJsonContent.version,
                peerDependencies: undefined// getPeerDependenciesOfPackageJsonInfo(packageInfo, state),
            };
        }
    }
    return r && { path: r.path, extension: r.ext, packageId, resolvedUsingTsExtension: r.resolvedUsingTsExtension };
}

function noPackageId(r: PathAndExtension | undefined): Resolved | undefined {
    return withPackageId(/*packageInfo*/ undefined, r, /*state*/ undefined!); // State will not be used so no need to pass
}

function loadModuleFromFileNoPackageId(extensions: Extensions, candidate: string, onlyRecordFailures: boolean, state: ModuleResolutionState): Resolved | undefined {
    return noPackageId(loadModuleFromFile(extensions, candidate, onlyRecordFailures, state));
}

/**
 * @param {boolean} onlyRecordFailures - if true then function won't try to actually load files but instead record all attempts as failures. This flag is necessary
 * in cases when we know upfront that all load attempts will fail (because containing folder does not exists) however we still need to record all failed lookup locations.
 */
function loadModuleFromFile(extensions: Extensions, candidate: string, onlyRecordFailures: boolean, state: ModuleResolutionState): PathAndExtension | undefined {
    // ./foo.js -> ./foo.ts
    const resolvedByReplacingExtension = loadModuleFromFileNoImplicitExtensions(extensions, candidate, onlyRecordFailures, state);
    if (resolvedByReplacingExtension) {
        return resolvedByReplacingExtension;
    }

    // ./foo -> ./foo.ts
    if (!(state.features & NodeResolutionFeatures.EsmMode)) {
        // First, try adding an extension. An import of "foo" could be matched by a file "foo.ts", or "foo.js" by "foo.js.ts"
        const resolvedByAddingExtension = tryAddingExtensions(candidate, extensions, "", onlyRecordFailures, state);
        if (resolvedByAddingExtension) {
            return resolvedByAddingExtension;
        }
    }
}

function loadModuleFromFileNoImplicitExtensions(extensions: Extensions, candidate: string, onlyRecordFailures: boolean, state: ModuleResolutionState): PathAndExtension | undefined {
    const filename = getBaseFileName(candidate);
    if (!filename.includes(".")) {
        return undefined; // extensionless import, no lookups performed, since we don't support extensionless files
    }
    let extensionless = removeFileExtension(candidate);
    if (extensionless === candidate) {
        // Once TS native extensions are handled, handle arbitrary extensions for declaration file mapping
        extensionless = candidate.substring(0, candidate.lastIndexOf("."));
    }

    const extension = candidate.substring(extensionless.length);
    if (state.traceEnabled) {
        trace(state.host, Diagnostics.File_name_0_has_a_1_extension_stripping_it, candidate, extension);
    }
    return tryAddingExtensions(extensionless, extensions, extension, onlyRecordFailures, state);
}

/** Try to return an existing file that adds one of the `extensions` to `candidate`. */
function tryAddingExtensions(candidate: string, extensions: Extensions, originalExtension: string, onlyRecordFailures: boolean, state: ModuleResolutionState): PathAndExtension | undefined {
    if (!onlyRecordFailures) {
        // check if containing folder exists - if it doesn't then just record failures for all supported extensions without disk probing
        const directory = getDirectoryPath(candidate);
        if (directory) {
            onlyRecordFailures = !directoryProbablyExists(directory, state.host);
        }
    }

    switch (originalExtension) {
        // case Extension.Mjs:
        // case Extension.Mts:
        // case Extension.Dmts:
        //     return extensions & Extensions.TypeScript && tryExtension(Extension.Mts, originalExtension === Extension.Mts || originalExtension === Extension.Dmts)
        //         || extensions & Extensions.Declaration && tryExtension(Extension.Dmts, originalExtension === Extension.Mts || originalExtension === Extension.Dmts)
        //         || extensions & Extensions.JavaScript && tryExtension(Extension.Mjs)
        //         || undefined;
        // case Extension.Cjs:
        // case Extension.Cts:
        // case Extension.Dcts:
        //     return extensions & Extensions.TypeScript && tryExtension(Extension.Cts, originalExtension === Extension.Cts || originalExtension === Extension.Dcts)
        //         || extensions & Extensions.Declaration && tryExtension(Extension.Dcts, originalExtension === Extension.Cts || originalExtension === Extension.Dcts)
        //         || extensions & Extensions.JavaScript && tryExtension(Extension.Cjs)
        //         || undefined;
        // case Extension.Json:
        //     return extensions & Extensions.Declaration && tryExtension(".d.json.ts")
        //         || extensions & Extensions.Json && tryExtension(Extension.Json)
        //         || undefined;
        // case Extension.Tsx:
        // case Extension.Jsx:
        //     // basically idendical to the ts/js case below, but prefers matching tsx and jsx files exactly before falling back to the ts or js file path
        //     // (historically, we disallow having both a a.ts and a.tsx file in the same compilation, since their outputs clash)
        //     // TODO: We should probably error if `"./a.tsx"` resolved to `"./a.ts"`, right?
        //     return extensions & Extensions.TypeScript && (tryExtension(Extension.Tsx, originalExtension === Extension.Tsx) || tryExtension(Extension.Ts, originalExtension === Extension.Tsx))
        //         || extensions & Extensions.Declaration && tryExtension(Extension.Dts, originalExtension === Extension.Tsx)
        //         || extensions & Extensions.JavaScript && (tryExtension(Extension.Jsx) || tryExtension(Extension.Js))
        //         || undefined;
        case Extension.C:
        case Extension.H:
        case Extension.Lpc:
        case "":
            return extensions & Extensions.LPC && (tryExtension(Extension.C, originalExtension === Extension.C || originalExtension === Extension.H))
                // || extensions & Extensions.Declaration && tryExtension(Extension.Dts, originalExtension === Extension.Ts || originalExtension === Extension.Dts)
                // || extensions & Extensions.JavaScript && (tryExtension(Extension.Js) || tryExtension(Extension.Jsx))
                || state.isConfigLookup && tryExtension(Extension.Json)
                || undefined;
        default:
            return extensions & Extensions.Declaration && !isDeclarationFileName(candidate + originalExtension) && tryExtension(`.d${originalExtension}.ts`)
                || undefined;
    }

    function tryExtension(ext: string, resolvedUsingTsExtension?: boolean): PathAndExtension | undefined {
        const path = tryFile(candidate + ext, onlyRecordFailures, state);
        return path === undefined ? undefined : { path, ext, resolvedUsingTsExtension: !state.candidateIsFromPackageJsonField && resolvedUsingTsExtension };
    }
}

/** Return the file if it exists. */
function tryFile(fileName: string, onlyRecordFailures: boolean, state: ModuleResolutionState): string | undefined {
    // if (!state.compilerOptions.moduleSuffixes?.length) {
        return tryFileLookup(fileName, onlyRecordFailures, state);
    // }

    // const ext = tryGetExtensionFromPath(fileName) ?? "";
    // const fileNameNoExtension = ext ? removeExtension(fileName, ext) : fileName;
    // return forEach(state.compilerOptions.moduleSuffixes, suffix => tryFileLookup(fileNameNoExtension + suffix + ext, onlyRecordFailures, state));
}

function tryFileLookup(fileName: string, onlyRecordFailures: boolean, state: ModuleResolutionState): string | undefined {
    if (!onlyRecordFailures) {
        if (state.host.fileExists(fileName)) {
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.File_0_exists_use_it_as_a_name_resolution_result, fileName);
            }
            return fileName;
        }
        else {
            if (state.traceEnabled) {
                trace(state.host, Diagnostics.File_0_does_not_exist, fileName);
            }
        }
    }
    state.failedLookupLocations?.push(fileName);
    return undefined;
}

function loadModuleFromNearestNodeModulesDirectoryTypesScope(moduleName: string, directory: string, state: ModuleResolutionState): SearchResult<Resolved> {
    // Extensions parameter here doesn't actually matter, because typesOnly ensures we're just doing @types lookup, which is always DtsOnly.
    return loadModuleFromNearestNodeModulesDirectoryWorker(Extensions.Declaration, moduleName, directory, state, /*typesScopeOnly*/ true, /*cache*/ undefined, /*redirectedReference*/ undefined);
}


function loadModuleFromNearestNodeModulesDirectoryWorker(extensions: Extensions, moduleName: string, directory: string, state: ModuleResolutionState, typesScopeOnly: boolean, cache: ModuleResolutionCache | undefined, redirectedReference: ResolvedProjectReference | undefined): SearchResult<Resolved> {
    const mode = undefined;// TODO  state.features === 0 ? undefined : state.features & NodeResolutionFeatures.EsmMode ? ModuleKind.ESNext : ModuleKind.CommonJS;
    // Do (up to) two passes through node_modules:
    //   1. For each ancestor node_modules directory, try to find:
    //      i.  TS/DTS files in the implementation package
    //      ii. DTS files in the @types package
    //   2. For each ancestor node_modules directory, try to find:
    //      i.  JS files in the implementation package
    const priorityExtensions = extensions & (Extensions.LPC | Extensions.Declaration);
    const secondaryExtensions = extensions & ~(Extensions.LPC | Extensions.Declaration);
    // (1)
    if (priorityExtensions) {
        traceIfEnabled(state, Diagnostics.Searching_all_ancestor_node_modules_directories_for_preferred_extensions_Colon_0, formatExtensions(priorityExtensions));
        const result = lookup(priorityExtensions);
        if (result) return result;
    }
    // (2)
    if (secondaryExtensions && !typesScopeOnly) {
        traceIfEnabled(state, Diagnostics.Searching_all_ancestor_node_modules_directories_for_fallback_extensions_Colon_0, formatExtensions(secondaryExtensions));
        return lookup(secondaryExtensions);
    }

    function lookup(extensions: Extensions) {
        return forEachAncestorDirectory(normalizeSlashes(directory), ancestorDirectory => {
            if (getBaseFileName(ancestorDirectory) !== "node_modules") {
                const resolutionFromCache = tryFindNonRelativeModuleNameInCache(cache, moduleName, mode, ancestorDirectory, redirectedReference, state);
                if (resolutionFromCache) {
                    return resolutionFromCache;
                }
                return toSearchResult(loadModuleFromImmediateNodeModulesDirectory(extensions, moduleName, ancestorDirectory, state, typesScopeOnly, cache, redirectedReference));
            }
        });
    }
}

function traceIfEnabled(state: ModuleResolutionState, diagnostic: DiagnosticMessage, ...args: string[]) {
    if (state.traceEnabled) {
        trace(state.host, diagnostic, ...args);
    }
}

function loadModuleFromImmediateNodeModulesDirectory(extensions: Extensions, moduleName: string, directory: string, state: ModuleResolutionState, typesScopeOnly: boolean, cache: ModuleResolutionCache | undefined, redirectedReference: ResolvedProjectReference | undefined): Resolved | undefined {
    return undefined;
    
    // TODO - implement if needed

    // const nodeModulesFolder = combinePaths(directory, "node_modules");
    // const nodeModulesFolderExists = directoryProbablyExists(nodeModulesFolder, state.host);
    // if (!nodeModulesFolderExists && state.traceEnabled) {
    //     trace(state.host, Diagnostics.Directory_0_does_not_exist_skipping_all_lookups_in_it, nodeModulesFolder);
    // }

    // if (!typesScopeOnly) {
    //     const packageResult = loadModuleFromSpecificNodeModulesDirectory(extensions, moduleName, nodeModulesFolder, nodeModulesFolderExists, state, cache, redirectedReference);
    //     if (packageResult) {
    //         return packageResult;
    //     }
    // }

    // if (extensions & Extensions.Declaration) {
    //     const nodeModulesAtTypes = combinePaths(nodeModulesFolder, "@types");
    //     let nodeModulesAtTypesExists = nodeModulesFolderExists;
    //     if (nodeModulesFolderExists && !directoryProbablyExists(nodeModulesAtTypes, state.host)) {
    //         if (state.traceEnabled) {
    //             trace(state.host, Diagnostics.Directory_0_does_not_exist_skipping_all_lookups_in_it, nodeModulesAtTypes);
    //         }
    //         nodeModulesAtTypesExists = false;
    //     }
    //     return loadModuleFromSpecificNodeModulesDirectory(Extensions.Declaration, mangleScopedPackageNameWithTrace(moduleName, state), nodeModulesAtTypes, nodeModulesAtTypesExists, state, cache, redirectedReference);
    // }
}

function resolveFromTypeRoot(moduleName: string, state: ModuleResolutionState) {
    return undefined;
    // if (!state.compilerOptions.typeRoots) return;
    // for (const typeRoot of state.compilerOptions.typeRoots) {
    //     const candidate = getCandidateFromTypeRoot(typeRoot, moduleName, state);
    //     const directoryExists = directoryProbablyExists(typeRoot, state.host);
    //     if (!directoryExists && state.traceEnabled) {
    //         trace(state.host, Diagnostics.Directory_0_does_not_exist_skipping_all_lookups_in_it, typeRoot);
    //     }
    //     const resolvedFromFile = loadModuleFromFile(Extensions.Declaration, candidate, !directoryExists, state);
    //     if (resolvedFromFile) {
    //         const packageDirectory = parseNodeModuleFromPath(resolvedFromFile.path);
    //         const packageInfo = packageDirectory ? getPackageJsonInfo(packageDirectory, /*onlyRecordFailures*/ false, state) : undefined;
    //         return toSearchResult(withPackageId(packageInfo, resolvedFromFile, state));
    //     }
    //     const resolved = loadNodeModuleFromDirectory(Extensions.Declaration, candidate, !directoryExists, state);
    //     if (resolved) return toSearchResult(resolved);
    // }
}