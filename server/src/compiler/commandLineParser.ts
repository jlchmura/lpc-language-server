import { config } from "process";
import { ILpcConfig } from "../config-types";
import { arrayFrom, CompilerOptions, createGetCanonicalFileName, emptyArray, Extension, FileExtensionInfo, fileExtensionIs, flatten, getNormalizedAbsolutePath, normalizePath, ParseConfigHost } from "./_namespaces/lpc";

export const libEntries: [string, string][] = [
    ["ldmud", "ldmud.efun.c"],
];

/**
 * An array of supported "lib" reference file names used to determine the order for inclusion
 * when referenced, as well as for spelling suggestions. This ensures the correct ordering for
 * overload resolution when a type declared in one lib is extended by another.
 *
 * @internal
 */
export const libs = libEntries.map(entry => entry[0]);


/**
 * Gets the file names from the provided config file specs that contain, files, include, exclude and
 * other properties needed to resolve the file names
 * @param configFileSpecs The config file specs extracted with file names to include, wildcards to include/exclude and other details
 * @param basePath The base path for any relative file specifications.
 * @param options Compiler options.
 * @param host The host used to resolve files and directories.
 * @param extraFileExtensions optionaly file extra file extension information from host
 *
 * @internal
 */
export function getFileNamesFromConfigSpecs(
    configFileSpecs: ILpcConfig,
    basePath: string,
    options: CompilerOptions,
    host: ParseConfigHost,
    extraFileExtensions: readonly FileExtensionInfo[] = emptyArray,
): string[] {

    // This is used to load all files for a project!


    basePath = normalizePath(basePath);

    const keyMapper = createGetCanonicalFileName(host.useCaseSensitiveFileNames);

    // Literal file names (provided via the "files" array in tsconfig.json) are stored in a
    // file map with a possibly case insensitive key. We use this map later when when including
    // wildcard paths.
    const literalFileMap = new Map<string, string>();

    // Wildcard paths (provided via the "includes" array in tsconfig.json) are stored in a
    // file map with a possibly case insensitive key. We use this map to store paths matched
    // via wildcard, and to handle extension priority.
    const wildcardFileMap = new Map<string, string>();

    // Wildcard paths of json files (provided via the "includes" array in tsconfig.json) are stored in a
    // file map with a possibly case insensitive key. We use this map to store paths matched
    // via wildcard of *.json kind
    const wildCardJsonFileMap = new Map<string, string>();
    //const { validatedFilesSpec, validatedIncludeSpecs, validatedExcludeSpecs } = configFileSpecs;

    // Rather than re-query this for each file and filespec, we query the supported extensions
    // once and store it on the expansion context.
    // const supportedExtensions = getSupportedExtensions(options, extraFileExtensions);
    // const supportedExtensionsWithJsonIfResolveJsonModule = getSupportedExtensionsWithJsonIfResolveJsonModule(options, supportedExtensions);

    // Literal files are always included verbatim. An "include" or "exclude" specification cannot
    // remove a literal file.
    // if (validatedFilesSpec) {
    //     for (const fileName of validatedFilesSpec) {
    //         const file = getNormalizedAbsolutePath(fileName, basePath);
    //         literalFileMap.set(keyMapper(file), file);
    //     }
    // }

    const { files } = configFileSpecs;
    if (files) {
        const literalFiles = flatten([files.simul_efun, files.master, files.global_include, files.player, files.init_files || []]).filter(f => !!f);
        for (const fileName in literalFiles) {
            const file = getNormalizedAbsolutePath(fileName, basePath);
            literalFileMap.set(keyMapper(file), file);
        }
    }

    const extensions = [".c", ".h", ".lpc"];

    const validatedIncludeSpecs = ["/"];
    const validatedExcludeSpecs = configFileSpecs.exclude || [];
    if (validatedIncludeSpecs && validatedIncludeSpecs.length > 0) {
        for (const file of host.readDirectory(basePath, flatten(extensions), validatedExcludeSpecs, validatedIncludeSpecs, /*depth*/ undefined)) {
            // if (fileExtensionIs(file, Extension.Json)) {
            //     // Valid only if *.json specified
            //     if (!jsonOnlyIncludeRegexes) {
            //         const includes = validatedIncludeSpecs.filter(s => endsWith(s, Extension.Json));
            //         const includeFilePatterns = map(getRegularExpressionsForWildcards(includes, basePath, "files"), pattern => `^${pattern}$`);
            //         jsonOnlyIncludeRegexes = includeFilePatterns ? includeFilePatterns.map(pattern => getRegexFromPattern(pattern, host.useCaseSensitiveFileNames)) : emptyArray;
            //     }
            //     const includeIndex = findIndex(jsonOnlyIncludeRegexes, re => re.test(file));
            //     if (includeIndex !== -1) {
            //         const key = keyMapper(file);
            //         if (!literalFileMap.has(key) && !wildCardJsonFileMap.has(key)) {
            //             wildCardJsonFileMap.set(key, file);
            //         }
            //     }
            //     continue;
            // }
            // If we have already included a literal or wildcard path with a
            // higher priority extension, we should skip this file.
            //
            // This handles cases where we may encounter both <file>.ts and
            // <file>.d.ts (or <file>.js if "allowJs" is enabled) in the same
            // directory when they are compilation outputs.
            // if (hasFileWithHigherPriorityExtension(file, literalFileMap, wildcardFileMap, supportedExtensions, keyMapper)) {
            //     continue;
            // }

            // We may have included a wildcard path with a lower priority
            // extension due to the user-defined order of entries in the
            // "include" array. If there is a lower priority extension in the
            // same directory, we should remove it.
            //removeWildcardFilesWithLowerPriorityExtension(file, wildcardFileMap, supportedExtensions, keyMapper);

            const key = keyMapper(file);
            if (!literalFileMap.has(key) && !wildcardFileMap.has(key)) {
                wildcardFileMap.set(key, file);
            }
        }
    }

    const literalFiles = arrayFrom(literalFileMap.values());
    const wildcardFiles = arrayFrom(wildcardFileMap.values());

    return literalFiles.concat(wildcardFiles, arrayFrom(wildCardJsonFileMap.values()));
}

