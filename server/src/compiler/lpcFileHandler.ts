import { combinePaths, CompilerHost, CompilerOptions, convertToRelativePath, forEach, getDirectoryPath, isRootedDiskPath, LoadImportResult, LpcFileHandler, LpcLoadImportResult, ModuleResolutionHost, normalizePath, pathIsAbsolute, pathIsRelative, pushIfUnique, resolvePath } from "./_namespaces/lpc.js";

export interface LpcFileHandlerHost {
    getCurrentDirectory?(): string;
    fileExists(fileName: string): boolean;
    // readFile function is used to read arbitrary text files on disk, i.e. when resolution procedure needs the content of 'package.json'
    // to determine location of bundled typings for node module
    readFile(fileName: string): string | undefined;
    getIncludeDirs(fileName: string): string[];
    getCompilerOptions(): CompilerOptions;
    /** The driver's efun header (efuns.ldmud.h, efuns.fluffos.h), when it is known. */
    getEfunHeaderFileName?(): string | undefined;
}

export function createLpcFileHandler(host: LpcFileHandlerHost): LpcFileHandler {
    let efunNames: ReadonlySet<string> | undefined;
    return {
        loadInclude,
        loadIncludeFile,
        isEfunDefined: host.getEfunHeaderFileName ? isEfunDefined : undefined,
    };

    function isEfunDefined(name: string): boolean {
        if (!efunNames) {
            const headerFileName = host.getEfunHeaderFileName?.();
            efunNames = headerFileName ? collectEfunNames(headerFileName, fileName => host.readFile(fileName)) : new Set();
        }
        return efunNames.has(name);
    }

    function loadInclude(sourceFilename: string, filename: string): LoadImportResult {
        const result = loadIncludeFile(sourceFilename, filename, false);
        return { uri: result.filename, source: result.source, error: result.error };
    }

    function loadIncludeFile(sourceFilename: string, includeFilename: string, localFirst: boolean, additionalSearchDirs?: string[]): LpcLoadImportResult {
        const sourcePath = normalizePath(sourceFilename);
        const sourceDir = getDirectoryPath(sourcePath);
        const includePath = normalizePath(includeFilename);
        const rootDir = host.getCompilerOptions().rootDir || host.getCurrentDirectory();

        let searchPath:string;
        let attemptedPaths: string[];

        if (pathIsRelative(includePath)) {
            // path is relative to source file
            searchPath = resolvePath(sourceDir, includePath);
        } else if (pathIsAbsolute(includePath)) {
            // absolute path includes are relative to the project root
            searchPath = resolvePath(rootDir, "." + includePath);
        } else {
            // everythign else has to be searched in include dirs
            const searchDirs = [                
                ...getIncludeDirs(sourceFilename),
                ...(additionalSearchDirs || []),
                rootDir
            ];            
            pushIfUnique(searchDirs, sourceDir);
            
            if (localFirst) searchDirs.reverse();
            
            attemptedPaths = searchDirs;
            searchPath = forEach(searchDirs, (dir) => {
                searchPath = resolvePath(dir, includePath);
                const exists = host.fileExists(searchPath);
                return exists ? searchPath : undefined;
            });
        }
        
        if (!searchPath) {
            // console.debug(`Include Not Found [${sourceFilename}] -> [${includeFilename}]`, attemptedPaths);
            return { filename: includePath, error: `Include file ${includeFilename} not found` };
        }

        const result = host.readFile(searchPath);
        // console.debug(`Include Loaded [${sourceFilename}] -> [${includeFilename}]`);
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
/**
 * The names of the efuns declared in a driver's efun header and the headers it includes.
 * LDMud's `obsolete.h` holds efuns the driver has dropped, so it is left out. The headers are
 * declarations only, `type name(params);`, once their comments are taken out.
 */
export function collectEfunNames(headerFileName: string, readFile: (fileName: string) => string | undefined): ReadonlySet<string> {
    const names = new Set<string>();
    const seen = new Set<string>();
    const visit = (fileName: string) => {
        if (seen.has(fileName)) return;
        seen.add(fileName);
        const text = readFile(fileName);
        if (!text) return;
        for (const [, include] of text.matchAll(/^[ \t]*#[ \t]*include[ \t]+"([^"]+)"/gm)) {
            if (include !== "obsolete.h") visit(combinePaths(getDirectoryPath(fileName), include));
        }
        const code = text.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, "");
        for (const [, name] of code.matchAll(/^[^;{}()=#\n]*?\b([A-Za-z_]\w*)[ \t]*\([^;{}]*\)[ \t]*;/gm)) {
            names.add(name);
        }
    };
    visit(normalizePath(headerFileName));
    return names;
}
