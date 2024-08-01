import { toPath as lpc_toPath, createGetCanonicalFileName, FileWatcher, FileWatcherEventKind, Path, SortedArray, WatchFileKind, WatchOptions, ensureTrailingDirectorySeparator, binarySearch, compareStringsCaseSensitive, Debug, emptyArray, emptyFileSystemEntries, FileSystemEntries, getBaseFileName, getDirectoryPath, identity, insertSorted, map, normalizePath, SortedReadonlyArray, FileWatcherCallback, PollingInterval, DirectoryWatcherCallback, WatchDirectoryFlags, matchFiles } from "./_namespaces/lpc.js";

/** @internal */
export function getFallbackOptions(options: WatchOptions | undefined): WatchOptions {
    const fallbackPolling = options?.fallbackPolling;
    return {
        watchFile: fallbackPolling !== undefined ?
            fallbackPolling as unknown as WatchFileKind :
            WatchFileKind.PriorityPollingInterval,
    };
}

interface MutableFileSystemEntries {
    readonly files: string[];
    readonly directories: string[];
    sortedAndCanonicalizedFiles?: SortedArray<Canonicalized>;
    sortedAndCanonicalizedDirectories?: SortedArray<Canonicalized>;
}

interface SortedAndCanonicalizedMutableFileSystemEntries {
    readonly files: string[];
    readonly directories: string[];
    readonly sortedAndCanonicalizedFiles: SortedArray<Canonicalized>;
    readonly sortedAndCanonicalizedDirectories: SortedArray<Canonicalized>;
}


/** @internal */
export function closeFileWatcherOf<T extends { watcher: FileWatcher; }>(objWithWatcher: T) {
    objWithWatcher.watcher.close();
}

/**
 * Partial interface of the System thats needed to support the caching of directory structure
 *
 * @internal
 */
export interface DirectoryStructureHost {
    fileExists(path: string): boolean;
    readFile(path: string, encoding?: string): string | undefined;

    // TODO: GH#18217 Optional methods are frequently used as non-optional
    directoryExists?(path: string): boolean;
    getDirectories?(path: string): string[];
    readDirectory?(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[];
    realpath?(path: string): string;

    createDirectory?(path: string): void;
    writeFile?(path: string, data: string, writeByteOrderMark?: boolean): void;
}


/** @internal */
export interface CachedDirectoryStructureHost extends DirectoryStructureHost {
    useCaseSensitiveFileNames: boolean;

    getDirectories(path: string): string[];
    readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[];

    /** Returns the queried result for the file exists and directory exists if at all it was done */
    addOrDeleteFileOrDirectory(fileOrDirectory: string, fileOrDirectoryPath: Path): FileAndDirectoryExistence | undefined;
    addOrDeleteFile(fileName: string, filePath: Path, eventKind: FileWatcherEventKind): void;
    clearCache(): void;
}


/** @internal */
export interface FileAndDirectoryExistence {
    fileExists: boolean;
    directoryExists: boolean;
}


type Canonicalized = string & { __canonicalized: void; };



/** @internal */
export function createCachedDirectoryStructureHost(host: DirectoryStructureHost, currentDirectory: string, useCaseSensitiveFileNames: boolean): CachedDirectoryStructureHost | undefined {
    if (!host.getDirectories || !host.readDirectory) {
        return undefined;
    }

    const cachedReadDirectoryResult = new Map<string, MutableFileSystemEntries | false>();
    const getCanonicalFileName = createGetCanonicalFileName(useCaseSensitiveFileNames) as ((name: string) => Canonicalized);
    return {
        useCaseSensitiveFileNames,
        fileExists,
        readFile: (path, encoding) => host.readFile(path, encoding),
        directoryExists: host.directoryExists && directoryExists,
        getDirectories,
        readDirectory,
        createDirectory: host.createDirectory && createDirectory,
        writeFile: host.writeFile && writeFile,
        addOrDeleteFileOrDirectory,
        addOrDeleteFile,
        clearCache,
        realpath: host.realpath && realpath,
    };

    function toPath(fileName: string) {
        return lpc_toPath(fileName, currentDirectory, getCanonicalFileName);
    }

    function getCachedFileSystemEntries(rootDirPath: Path) {
        return cachedReadDirectoryResult.get(ensureTrailingDirectorySeparator(rootDirPath));
    }

    function getCachedFileSystemEntriesForBaseDir(path: Path): SortedAndCanonicalizedMutableFileSystemEntries | undefined | false {
        const entries = getCachedFileSystemEntries(getDirectoryPath(path));
        if (!entries) {
            return entries as (false | undefined);
        }

        // If we're looking for the base directory, we're definitely going to search the entries
        if (!entries.sortedAndCanonicalizedFiles) {
            entries.sortedAndCanonicalizedFiles = entries.files.map(getCanonicalFileName).sort() as SortedArray<Canonicalized>;
            entries.sortedAndCanonicalizedDirectories = entries.directories.map(getCanonicalFileName).sort() as SortedArray<Canonicalized>;
        }
        return entries as SortedAndCanonicalizedMutableFileSystemEntries;
    }

    function getBaseNameOfFileName(fileName: string) {
        return getBaseFileName(normalizePath(fileName));
    }

    function createCachedFileSystemEntries(rootDir: string, rootDirPath: Path) {
        if (!host.realpath || ensureTrailingDirectorySeparator(toPath(host.realpath(rootDir))) === rootDirPath) {
            const resultFromHost: MutableFileSystemEntries = {
                files: map(host.readDirectory!(rootDir, /*extensions*/ undefined, /*exclude*/ undefined, /*include*/ ["*.*"]), getBaseNameOfFileName) || [],
                directories: host.getDirectories!(rootDir) || [],
            };

            cachedReadDirectoryResult.set(ensureTrailingDirectorySeparator(rootDirPath), resultFromHost);
            return resultFromHost;
        }

        // If the directory is symlink do not cache the result
        if (host.directoryExists?.(rootDir)) {
            cachedReadDirectoryResult.set(rootDirPath, false);
            return false;
        }

        // Non existing directory
        return undefined;
    }

    /**
     * If the readDirectory result was already cached, it returns that
     * Otherwise gets result from host and caches it.
     * The host request is done under try catch block to avoid caching incorrect result
     */
    function tryReadDirectory(rootDir: string, rootDirPath: Path) {
        rootDirPath = ensureTrailingDirectorySeparator(rootDirPath);
        const cachedResult = getCachedFileSystemEntries(rootDirPath);
        if (cachedResult) {
            return cachedResult;
        }

        try {
            return createCachedFileSystemEntries(rootDir, rootDirPath);
        }
        catch (_e) {
            // If there is exception to read directories, dont cache the result and direct the calls to host
            Debug.assert(!cachedReadDirectoryResult.has(ensureTrailingDirectorySeparator(rootDirPath)));
            return undefined;
        }
    }

    function hasEntry(entries: SortedReadonlyArray<Canonicalized>, name: Canonicalized) {
        // Case-sensitive comparison since already canonicalized
        const index = binarySearch(entries, name, identity, compareStringsCaseSensitive);
        return index >= 0;
    }

    function writeFile(fileName: string, data: string, writeByteOrderMark?: boolean): void {
        const path = toPath(fileName);
        const result = getCachedFileSystemEntriesForBaseDir(path);
        if (result) {
            updateFilesOfFileSystemEntry(result, getBaseNameOfFileName(fileName), /*fileExists*/ true);
        }
        return host.writeFile!(fileName, data, writeByteOrderMark);
    }

    function fileExists(fileName: string): boolean {
        const path = toPath(fileName);
        const result = getCachedFileSystemEntriesForBaseDir(path);
        return result && hasEntry(result.sortedAndCanonicalizedFiles, getCanonicalFileName(getBaseNameOfFileName(fileName))) ||
            host.fileExists(fileName);
    }

    function directoryExists(dirPath: string): boolean {
        const path = toPath(dirPath);
        return cachedReadDirectoryResult.has(ensureTrailingDirectorySeparator(path)) || host.directoryExists!(dirPath);
    }

    function createDirectory(dirPath: string) {
        const path = toPath(dirPath);
        const result = getCachedFileSystemEntriesForBaseDir(path);
        if (result) {
            const baseName = getBaseNameOfFileName(dirPath);
            const canonicalizedBaseName = getCanonicalFileName(baseName);
            const canonicalizedDirectories = result.sortedAndCanonicalizedDirectories;
            // Case-sensitive comparison since already canonicalized
            if (insertSorted(canonicalizedDirectories, canonicalizedBaseName, compareStringsCaseSensitive)) {
                result.directories.push(baseName);
            }
        }
        host.createDirectory!(dirPath);
    }

    function getDirectories(rootDir: string): string[] {
        const rootDirPath = toPath(rootDir);
        const result = tryReadDirectory(rootDir, rootDirPath);
        if (result) {
            return result.directories.slice();
        }
        return host.getDirectories!(rootDir);
    }

    function readDirectory(rootDir: string, extensions?: readonly string[], excludes?: readonly string[], includes?: readonly string[], depth?: number): string[] {
        const rootDirPath = toPath(rootDir);
        const rootResult = tryReadDirectory(rootDir, rootDirPath);
        let rootSymLinkResult: FileSystemEntries | undefined;
        if (rootResult !== undefined) {
            return matchFiles(rootDir, extensions, excludes, includes, useCaseSensitiveFileNames, currentDirectory, depth, getFileSystemEntries, realpath);
        }
        return host.readDirectory!(rootDir, extensions, excludes, includes, depth);

        function getFileSystemEntries(dir: string): FileSystemEntries {
            const path = toPath(dir);
            if (path === rootDirPath) {
                return rootResult || getFileSystemEntriesFromHost(dir, path);
            }
            const result = tryReadDirectory(dir, path);
            return result !== undefined ?
                result || getFileSystemEntriesFromHost(dir, path) :
                emptyFileSystemEntries;
        }

        function getFileSystemEntriesFromHost(dir: string, path: Path): FileSystemEntries {
            if (rootSymLinkResult && path === rootDirPath) return rootSymLinkResult;
            const result: FileSystemEntries = {
                files: map(host.readDirectory!(dir, /*extensions*/ undefined, /*exclude*/ undefined, /*include*/ ["*.*"]), getBaseNameOfFileName) || emptyArray,
                directories: host.getDirectories!(dir) || emptyArray,
            };
            if (path === rootDirPath) rootSymLinkResult = result;
            return result;
        }
    }

    function realpath(s: string) {
        return host.realpath ? host.realpath(s) : s;
    }

    function addOrDeleteFileOrDirectory(fileOrDirectory: string, fileOrDirectoryPath: Path) {
        const existingResult = getCachedFileSystemEntries(fileOrDirectoryPath);
        if (existingResult !== undefined) {
            // Just clear the cache for now
            // For now just clear the cache, since this could mean that multiple level entries might need to be re-evaluated
            clearCache();
            return undefined;
        }

        const parentResult = getCachedFileSystemEntriesForBaseDir(fileOrDirectoryPath);
        if (!parentResult) {
            return undefined;
        }

        // This was earlier a file (hence not in cached directory contents)
        // or we never cached the directory containing it

        if (!host.directoryExists) {
            // Since host doesnt support directory exists, clear the cache as otherwise it might not be same
            clearCache();
            return undefined;
        }

        const baseName = getBaseNameOfFileName(fileOrDirectory);
        const fsQueryResult: FileAndDirectoryExistence = {
            fileExists: host.fileExists(fileOrDirectory),
            directoryExists: host.directoryExists(fileOrDirectory),
        };
        if (fsQueryResult.directoryExists || hasEntry(parentResult.sortedAndCanonicalizedDirectories, getCanonicalFileName(baseName))) {
            // Folder added or removed, clear the cache instead of updating the folder and its structure
            clearCache();
        }
        else {
            // No need to update the directory structure, just files
            updateFilesOfFileSystemEntry(parentResult, baseName, fsQueryResult.fileExists);
        }
        return fsQueryResult;
    }

    function addOrDeleteFile(fileName: string, filePath: Path, eventKind: FileWatcherEventKind) {
        if (eventKind === FileWatcherEventKind.Changed) {
            return;
        }

        const parentResult = getCachedFileSystemEntriesForBaseDir(filePath);
        if (parentResult) {
            updateFilesOfFileSystemEntry(parentResult, getBaseNameOfFileName(fileName), eventKind === FileWatcherEventKind.Created);
        }
    }

    function updateFilesOfFileSystemEntry(parentResult: SortedAndCanonicalizedMutableFileSystemEntries, baseName: string, fileExists: boolean): void {
        const canonicalizedFiles = parentResult.sortedAndCanonicalizedFiles;
        const canonicalizedBaseName = getCanonicalFileName(baseName);
        if (fileExists) {
            // Case-sensitive comparison since already canonicalized
            if (insertSorted(canonicalizedFiles, canonicalizedBaseName, compareStringsCaseSensitive)) {
                parentResult.files.push(baseName);
            }
        }
        else {
            // Case-sensitive comparison since already canonicalized
            const sortedIndex = binarySearch(canonicalizedFiles, canonicalizedBaseName, identity, compareStringsCaseSensitive);
            if (sortedIndex >= 0) {
                canonicalizedFiles.splice(sortedIndex, 1);
                const unsortedIndex = parentResult.files.findIndex(entry => getCanonicalFileName(entry) === canonicalizedBaseName);
                parentResult.files.splice(unsortedIndex, 1);
            }
        }
    }

    function clearCache() {
        cachedReadDirectoryResult.clear();
    }
}

/** @internal */
export interface WatchFactory<X, Y = undefined> {
    watchFile: (file: string, callback: FileWatcherCallback, pollingInterval: PollingInterval, options: WatchOptions | undefined, detailInfo1: X, detailInfo2?: Y) => FileWatcher;
    watchDirectory: (directory: string, callback: DirectoryWatcherCallback, flags: WatchDirectoryFlags, options: WatchOptions | undefined, detailInfo1: X, detailInfo2?: Y) => FileWatcher;
}


export enum ProgramUpdateLevel {
    /** Program is updated with same root file names and options */
    Update,
    /** Loads program after updating root file names from the disk */
    RootNamesAndUpdate,
    /**
     * Loads program completely, including:
     *  - re-reading contents of config file from disk
     *  - calculating root file names for the program
     *  - Updating the program
     */

    Full,
}