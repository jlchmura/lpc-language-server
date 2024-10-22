import { ILpcConfig } from "../config-types.js";
import { CompilerHost, convertToRelativePath, forEach, getDirectoryPath, isRootedDiskPath, LoadImportResult, LpcFileHandler, LpcLoadImportResult, ModuleResolutionHost, normalizePath, pathIsAbsolute, pathIsRelative, pushIfUnique, resolvePath } from "./_namespaces/lpc.js";

export function createLpcFileHandler(getHost: () => ModuleResolutionHost, getConfig: ()=>ILpcConfig): LpcFileHandler {
    return {
        loadInclude,
        loadIncludeFile
    };

    function loadInclude(sourceFilename: string, filename: string): LoadImportResult {
        const result = loadIncludeFile(sourceFilename, filename, false);
        return { uri: result.filename, source: result.source, error: result.error };
    }

    function loadIncludeFile(sourceFilename: string, includeFilename: string, localFirst: boolean, additionalSearchDirs?: string[]): LpcLoadImportResult {
        const host = getHost();
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
                ...getIncludeDirs(),
                ...(additionalSearchDirs || []),
                "./"
            ];
            pushIfUnique(searchDirs, sourceDir);
            
            if (localFirst) searchDirs.reverse();
            
            searchPath = forEach(searchDirs, (dir) => {
                searchPath = resolvePath(dir, includePath);
                return host.fileExists(searchPath) ? searchPath : undefined;
            });
        }
        
        if (!searchPath) {
            return { filename: includePath, error: `Include file ${includeFilename} not found` };
        }

        const result = host.readFile(searchPath);
        return { filename: searchPath, source: result };
    }

    function getIncludeDirs() {
        const config = getConfig();
        const basePath = getHost().getCurrentDirectory();
        const fullImportDirs = config.include.map((dir) => {            
            return resolvePath(basePath, "./" + dir);//pathIsAbsolute(dir) ? dir : resolvePath(basePath, dir);            
        });
        return fullImportDirs;
    }
}