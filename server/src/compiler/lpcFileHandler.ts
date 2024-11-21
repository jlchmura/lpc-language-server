import { combinePaths, CompilerHost, convertToRelativePath, forEach, getDirectoryPath, isRootedDiskPath, LoadImportResult, LpcFileHandler, LpcLoadImportResult, ModuleResolutionHost, normalizePath, pathIsAbsolute, pathIsRelative, pushIfUnique, resolvePath } from "./_namespaces/lpc.js";

export interface LpcFileHandlerHost {
    getCurrentDirectory?(): string;
    fileExists(fileName: string): boolean;
    // readFile function is used to read arbitrary text files on disk, i.e. when resolution procedure needs the content of 'package.json'
    // to determine location of bundled typings for node module
    readFile(fileName: string): string | undefined;
    getIncludeDirs(fileName: string): string[];
}

export function createLpcFileHandler(host: LpcFileHandlerHost): LpcFileHandler {
    return {
        loadInclude,
        loadIncludeFile
    };

    function loadInclude(sourceFilename: string, filename: string): LoadImportResult {
        const result = loadIncludeFile(sourceFilename, filename, false);
        return { uri: result.filename, source: result.source, error: result.error };
    }

    function loadIncludeFile(sourceFilename: string, includeFilename: string, localFirst: boolean, additionalSearchDirs?: string[]): LpcLoadImportResult {
        const sourcePath = normalizePath(sourceFilename);
        const sourceDir = getDirectoryPath(sourcePath);
        const includePath = normalizePath(includeFilename);
        let searchPath:string;
        
        if (pathIsRelative(includePath)) {
            // path is relative to source file
            searchPath = resolvePath(sourceDir, includePath);
        } else if (pathIsAbsolute(includePath)) {
            // absolute path includes are relative to the project root
            searchPath = resolvePath(host.getCurrentDirectory(), "." + includePath);
        } else {
            // everythign else has to be searched in include dirs
            const searchDirs = [                
                ...getIncludeDirs(sourceFilename),
                ...(additionalSearchDirs || []),
                "./"
            ];
            pushIfUnique(searchDirs, sourceDir);
            
            if (localFirst) searchDirs.reverse();
            
            searchPath = forEach(searchDirs, (dir) => {
                searchPath = resolvePath(dir, includePath);
                const exists = host.fileExists(searchPath);
                return exists ? searchPath : undefined;
            });
        }
        
        if (!searchPath) {
            return { filename: includePath, error: `Include file ${includeFilename} not found` };
        }

        const result = host.readFile(searchPath);
        return { filename: searchPath, source: result };
    }

    function getIncludeDirs(fileName: string) {        
        return host.getIncludeDirs(fileName);
        // const basePath = host.getCurrentDirectory();
        // const fullImportDirs = host.getIncludeDirs().map((dir) => {
        //     return resolvePath(basePath, "./" + dir);//pathIsAbsolute(dir) ? dir : resolvePath(basePath, dir);
        // });
        // return fullImportDirs;
    }
}