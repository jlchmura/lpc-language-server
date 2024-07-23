import { Path } from "./_namespaces/lpc";

/**
 * This is the cache of module/typedirectives resolution that can be retained across program
 *
 * @internal
 */
export interface ResolutionCache {
    rootDirForResolution: string;
    invalidateResolutionOfFile(filePath: Path): void;
    removeResolutionsOfFile(filePath: Path): void;
}