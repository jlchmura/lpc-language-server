import { config } from "process";
import { ILpcConfig } from "../config-types";
import { arrayFrom, combinePaths, CommandLineOption, CompilerOptions, CompilerOptionsValue, ConfigFileSpecs, containsPath, createCompilerDiagnostic, createGetCanonicalFileName, Debug, Diagnostic, DiagnosticArguments, DiagnosticMessage, Diagnostics, directorySeparator, emptyArray, endsWith, ensureTrailingDirectorySeparator, every, Extension, FileExtensionInfo, fileExtensionIs, filter, flatten, getBaseFileName, getDirectoryPath, getNormalizedAbsolutePath, getRegexFromPattern, getRegularExpressionForWildcard, hasExtension, hasProperty, isArray, isImplicitGlob, isRootedDiskPath, isString, LanguageVariant, length, LpcConfigSourceFile, MapLike, normalizePath, normalizeSlashes, ParseConfigHost, ParsedCommandLine, Path, ProjectReference, removeTrailingDirectorySeparator, startsWith, toFileNameLowerCase, tracing, TypeAcquisition, WatchDirectoryFlags, WatchOptions } from "./_namespaces/lpc";
import { trimStart } from "../utils";

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

/** @internal */
export const moduleResolutionOptionDeclarations: readonly CommandLineOption[] = ["false"];//optionDeclarations.filter(option => !!option.affectsModuleResolution);

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
    configFileSpecs: ConfigFileSpecs,
    basePath: string,
    options: CompilerOptions,
    host: ParseConfigHost,
    extraFileExtensions: readonly FileExtensionInfo[] = emptyArray,
): string[] {
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
    const { validatedFilesSpec, validatedIncludeSpecs: unusedIncludeSpecs, validatedExcludeSpecs } = configFileSpecs;
    const validatedIncludeSpecs = ["./"];
    // Rather than re-query this for each file and filespec, we query the supported extensions
    // once and store it on the expansion context.
    // const supportedExtensions = getSupportedExtensions(options, extraFileExtensions);
    // const supportedExtensionsWithJsonIfResolveJsonModule = getSupportedExtensionsWithJsonIfResolveJsonModule(options, supportedExtensions);

    // Literal files are always included verbatim. An "include" or "exclude" specification cannot
    // remove a literal file.    
    if (validatedFilesSpec) {
        for (const fileName of validatedFilesSpec) {
            const file = getNormalizedAbsolutePath(fileName, basePath);
            literalFileMap.set(keyMapper(file), file);
        }
    }

    

    // const { files } = configFileSpecs;
    // if (files) {
    //     const literalFiles = flatten([files.simul_efun, files.master, files.global_include, files.player, files.init_files || []]).filter(f => !!f);
    //     for (const fileName in literalFiles) {
    //         const file = getNormalizedAbsolutePath(fileName, basePath);
    //         literalFileMap.set(keyMapper(file), file);
    //     }
    // }

    const extensions = [".c", ".h", ".lpc"];

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

/** @internal */
export function tryReadFile(fileName: string, readFile: (path: string) => string | undefined): string | Diagnostic {
    let text: string | undefined;
    try {
        text = readFile(fileName);
    }
    catch (e) {
        return createCompilerDiagnostic(Diagnostics.Cannot_read_file_0_Colon_1, fileName, e.message);
    }
    return text === undefined ? createCompilerDiagnostic(Diagnostics.Cannot_read_file_0, fileName) : text;
}


/**
 * Parse the contents of a config file (tsconfig.json).
 * @param jsonNode The contents of the config file to parse
 * @param host Instance of ParseConfigHost used to enumerate files in folder.
 * @param basePath A root directory to resolve relative path entries in the config
 *    file to. e.g. outDir
 */
export function parseLpcSourceFileConfigFileContent(sourceFile: LpcConfigSourceFile, host: ParseConfigHost, basePath: string, existingOptions?: CompilerOptions, configFileName?: string, resolutionStack?: Path[], extraFileExtensions?: readonly FileExtensionInfo[], /*extendedConfigCache?: Map<string, ExtendedConfigCacheEntry>, */existingWatchOptions?: WatchOptions): ParsedCommandLine {
    tracing?.push(tracing.Phase.Parse, "parseJsonSourceFileConfigFileContent", { path: sourceFile.fileName });
    const result = parseLpcConfigFileContentWorker(/*json*/ undefined, sourceFile, host, basePath, existingOptions, existingWatchOptions, configFileName, resolutionStack, extraFileExtensions/*, extendedConfigCache*/);
    tracing?.pop();
    return result;
}

function directoryOfCombinedPath(fileName: string, basePath: string) {
    // Use the `getNormalizedAbsolutePath` function to avoid canonicalizing the path, as it must remain noncanonical
    // until consistent casing errors are reported
    return getDirectoryPath(getNormalizedAbsolutePath(fileName, basePath));
}

function getDefaultTypeAcquisition(configFileName?: string): TypeAcquisition {
    return { enable: !!configFileName && getBaseFileName(configFileName) === "jsconfig.json", include: [], exclude: [] };
}


/**
 * Parse the contents of a config file from json or json source file (tsconfig.json).
 * @param json The contents of the config file to parse
 * @param sourceFile sourceFile corresponding to the Json
 * @param host Instance of ParseConfigHost used to enumerate files in folder.
 * @param basePath A root directory to resolve relative path entries in the config
 *    file to. e.g. outDir
 * @param resolutionStack Only present for backwards-compatibility. Should be empty.
 */
function parseLpcConfigFileContentWorker(
    json: any,
    sourceFile: LpcConfigSourceFile | undefined,
    host: ParseConfigHost,
    basePath: string,
    existingOptions: CompilerOptions = {},
    existingWatchOptions: WatchOptions | undefined,
    configFileName?: string,
    resolutionStack: Path[] = [],
    extraFileExtensions: readonly FileExtensionInfo[] = [],
    //extendedConfigCache?: Map<string, ExtendedConfigCacheEntry>,
): ParsedCommandLine {
    Debug.assert((json === undefined && sourceFile !== undefined) || (json !== undefined && sourceFile === undefined));
    const errors: Diagnostic[] = [];

    const parsedConfig = sourceFile;
    //const parsedConfig = parseConfig(json, sourceFile, host, basePath, configFileName, resolutionStack, errors, extendedConfigCache);
    const { raw } = parsedConfig;
    // const options = handleOptionConfigDirTemplateSubstitution(
    //     extend(existingOptions, parsedConfig.options || {}),
    //     configDirTemplateSubstitutionOptions,
    //     basePath,
    // ) as CompilerOptions;
    // const watchOptions = handleWatchOptionsConfigDirTemplateSubstitution(
    //     existingWatchOptions && parsedConfig.watchOptions ?
    //         extend(existingWatchOptions, parsedConfig.watchOptions) :
    //         parsedConfig.watchOptions || existingWatchOptions,
    //     basePath,
    // );
    const options = existingOptions;
    const watchOptions = existingWatchOptions;
    options.configFilePath = configFileName && normalizeSlashes(configFileName);
    const basePathForFileNames = normalizePath(configFileName ? directoryOfCombinedPath(configFileName, basePath) : basePath);
    const configFileSpecs = getConfigFileSpecs();
    if (sourceFile) sourceFile.configFileSpecs = configFileSpecs;
    //setConfigFileInOptions(options, sourceFile);
    options.config = raw;
    options.configFile = parsedConfig;
    switch (raw?.driver?.type) {
        case "fluffos":
            options.driverType = LanguageVariant.FluffOS;
            break;
        case "ldmud":
        default:
            options.driverType = LanguageVariant.LDMud;
            break
    }
    
    const sefunFilePath = trimStart(options.sefunFile ?? raw?.files?.simul_efun ?? "/obj/sefun.c", "/");
    options.sefunFile = normalizePath(combinePaths(basePathForFileNames, sefunFilePath));
    
    return {
        options,
        watchOptions,
        fileNames: getFileNames(basePathForFileNames),
        projectReferences: getProjectReferences(basePathForFileNames),
        typeAcquisition: /*parsedConfig.typeAcquisition ||*/ getDefaultTypeAcquisition(),
        raw: parsedConfig,
        errors,        
        // Wildcard directories (provided as part of a wildcard path) are stored in a
        // file map that marks whether it was a regular wildcard match (with a `*` or `?` token),
        // or a recursive directory. This information is used by filesystem watchers to monitor for
        // new entries in these paths.
        wildcardDirectories: getWildcardDirectories(configFileSpecs, basePathForFileNames, host.useCaseSensitiveFileNames),
        compileOnSave: false,/*!!raw.compileOnSave,*/
    };

    function getConfigFileSpecs(): ConfigFileSpecs {
        const referencesOfRaw = getPropFromRaw<ProjectReference>("references", element => typeof element === "object", "object");
        const filesSpecs = toPropValue(getSpecsFromRaw("files"));
        if (filesSpecs) {
            const hasZeroOrNoReferences = referencesOfRaw === "no-prop" || isArray(referencesOfRaw) && referencesOfRaw.length === 0;
            const hasExtends = hasProperty(raw, "extends");
            if (filesSpecs.length === 0 && hasZeroOrNoReferences && !hasExtends) {
                if (sourceFile) {
                    const fileName = configFileName || "lpc-config.json";
                    const diagnosticMessage = Diagnostics.The_files_list_in_config_file_0_is_empty;
                    console.warn("implement diagnostic - The_files_list_in_config_file_0_is_empty");
                    // const nodeValue = forEachTsConfigPropArray(sourceFile, "files", property => property.initializer);
                    // const error = createDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, nodeValue, diagnosticMessage, fileName);
                    // errors.push(error);
                }
                else {
                    createCompilerDiagnosticOnlyIfJson(Diagnostics.The_files_list_in_config_file_0_is_empty, configFileName || "tsconfig.json");
                }
            }
        }

        let includeSpecs = toPropValue(getSpecsFromRaw("include"));

        const excludeOfRaw = getSpecsFromRaw("exclude");
        let isDefaultIncludeSpec = false;
        let excludeSpecs = toPropValue(excludeOfRaw);
        // if (excludeOfRaw === "no-prop") {
        //     const outDir = options.outDir;
        //     const declarationDir = options.declarationDir;

        //     if (outDir || declarationDir) {
        //         excludeSpecs = filter([outDir, declarationDir], d => !!d) as string[];
        //     }
        // }

        if (filesSpecs === undefined && includeSpecs === undefined) {
            includeSpecs = [defaultIncludeSpec];
            isDefaultIncludeSpec = true;
        }
        let validatedIncludeSpecsBeforeSubstitution: readonly string[] | undefined, validatedExcludeSpecsBeforeSubstitution: readonly string[] | undefined;
        let validatedIncludeSpecs: readonly string[] | undefined, validatedExcludeSpecs: readonly string[] | undefined;

        // The exclude spec list is converted into a regular expression, which allows us to quickly
        // test whether a file or directory should be excluded before recursively traversing the
        // file system.

        if (includeSpecs) {
            validatedIncludeSpecsBeforeSubstitution = validateSpecs(includeSpecs, errors, /*disallowTrailingRecursion*/ true, sourceFile, "include");
            validatedIncludeSpecs = getSubstitutedStringArrayWithConfigDirTemplate(
                validatedIncludeSpecsBeforeSubstitution,
                basePathForFileNames,
            ) || validatedIncludeSpecsBeforeSubstitution;
        }

        if (excludeSpecs) {
            validatedExcludeSpecsBeforeSubstitution = validateSpecs(excludeSpecs, errors, /*disallowTrailingRecursion*/ false, sourceFile, "exclude");
            validatedExcludeSpecs = getSubstitutedStringArrayWithConfigDirTemplate(
                validatedExcludeSpecsBeforeSubstitution,
                basePathForFileNames,
            ) || validatedExcludeSpecsBeforeSubstitution;
        }

        const validatedFilesSpecBeforeSubstitution = filter(filesSpecs, isString);
        const validatedFilesSpec = getSubstitutedStringArrayWithConfigDirTemplate(
            validatedFilesSpecBeforeSubstitution,
            basePathForFileNames,
        ) || validatedFilesSpecBeforeSubstitution;

        return {
            filesSpecs,
            includeSpecs,
            excludeSpecs,
            validatedFilesSpec,
            validatedIncludeSpecs,
            validatedExcludeSpecs,
            validatedFilesSpecBeforeSubstitution,
            validatedIncludeSpecsBeforeSubstitution,
            validatedExcludeSpecsBeforeSubstitution,
            pathPatterns: undefined, // Initialized on first use
            isDefaultIncludeSpec,
        };
    }

    function getFileNames(basePath: string): string[] {
        const fileNames = getFileNamesFromConfigSpecs(configFileSpecs, basePath, options, host, extraFileExtensions);
        // if (shouldReportNoInputFiles(fileNames, canJsonReportNoInputFiles(raw), resolutionStack)) {
        //     errors.push(getErrorForNoInputFiles(configFileSpecs, configFileName));
        // }
        return fileNames;
    }

    function getProjectReferences(basePath: string): readonly ProjectReference[] | undefined {
        let projectReferences: ProjectReference[] | undefined;
        const referencesOfRaw = getPropFromRaw<ProjectReference>("references", element => typeof element === "object", "object");
        // if (isArray(referencesOfRaw)) {
        //     for (const ref of referencesOfRaw) {
        //         if (typeof ref.path !== "string") {
        //             createCompilerDiagnosticOnlyIfJson(Diagnostics.Compiler_option_0_requires_a_value_of_type_1, "reference.path", "string");
        //         }
        //         else {
        //             (projectReferences || (projectReferences = [])).push({
        //                 path: getNormalizedAbsolutePath(ref.path, basePath),
        //                 originalPath: ref.path,
        //                 prepend: ref.prepend,
        //                 circular: ref.circular,
        //             });
        //         }
        //     }
        // }
        return projectReferences;
    }

    type PropOfRaw<T> = readonly T[] | "not-array" | "no-prop";
    function toPropValue<T>(specResult: PropOfRaw<T>) {
        return isArray(specResult) ? specResult : undefined;
    }

    function getSpecsFromRaw(prop: "files" | "include" | "exclude"): PropOfRaw<string> {
        return getPropFromRaw(prop, isString, "string");
    }

    function getPropFromRaw<T>(prop: "files" | "include" | "exclude" | "references", validateElement: (value: unknown) => boolean, elementTypeName: string): PropOfRaw<T> {
        if (hasProperty(raw, prop) && !isNullOrUndefined(raw[prop])) {
            if (isArray(raw[prop])) {
                const result = raw[prop] as T[];
                if (!sourceFile && !every(result, validateElement)) {
                    errors.push(createCompilerDiagnostic(Diagnostics.Compiler_option_0_requires_a_value_of_type_1, prop, elementTypeName));
                }
                return result;
            }
            else {
                createCompilerDiagnosticOnlyIfJson(Diagnostics.Compiler_option_0_requires_a_value_of_type_1, prop, "Array");
                return "not-array";
            }
        }
        return "no-prop";
    }

    function createCompilerDiagnosticOnlyIfJson(message: DiagnosticMessage, ...args: DiagnosticArguments) {
        if (!sourceFile) {
            errors.push(createCompilerDiagnostic(message, ...args));
        }
    }
}

/**
 * Gets directories in a set of include patterns that should be watched for changes.
 */
function getWildcardDirectories({ validatedIncludeSpecs: include, validatedExcludeSpecs: exclude }: ConfigFileSpecs, basePath: string, useCaseSensitiveFileNames: boolean): MapLike<WatchDirectoryFlags> {
    // We watch a directory recursively if it contains a wildcard anywhere in a directory segment
    // of the pattern:
    //
    //  /a/b/**/d   - Watch /a/b recursively to catch changes to any d in any subfolder recursively
    //  /a/b/*/d    - Watch /a/b recursively to catch any d in any immediate subfolder, even if a new subfolder is added
    //  /a/b        - Watch /a/b recursively to catch changes to anything in any recursive subfoler
    //
    // We watch a directory without recursion if it contains a wildcard in the file segment of
    // the pattern:
    //
    //  /a/b/*      - Watch /a/b directly to catch any new file
    //  /a/b/a?z    - Watch /a/b directly to catch any new file matching a?z
    const rawExcludeRegex = getRegularExpressionForWildcard(exclude, basePath, "exclude");
    const excludeRegex = rawExcludeRegex && new RegExp(rawExcludeRegex, useCaseSensitiveFileNames ? "" : "i");
    const wildcardDirectories: MapLike<WatchDirectoryFlags> = {};
    const wildCardKeyToPath = new Map<CanonicalKey, string>();
    if (include !== undefined) {
        const recursiveKeys: CanonicalKey[] = [];
        for (const file of include) {
            const spec = normalizePath(combinePaths(basePath, file));
            if (excludeRegex && excludeRegex.test(spec)) {
                continue;
            }

            const match = getWildcardDirectoryFromSpec(spec, useCaseSensitiveFileNames);
            if (match) {
                const { key, path, flags } = match;
                const existingPath = wildCardKeyToPath.get(key);
                const existingFlags = existingPath !== undefined ? wildcardDirectories[existingPath] : undefined;
                if (existingFlags === undefined || existingFlags < flags) {
                    wildcardDirectories[existingPath !== undefined ? existingPath : path] = flags;
                    if (existingPath === undefined) wildCardKeyToPath.set(key, path);
                    if (flags === WatchDirectoryFlags.Recursive) {
                        recursiveKeys.push(key);
                    }
                }
            }
        }

        // Remove any subpaths under an existing recursively watched directory.
        for (const path in wildcardDirectories) {
            if (hasProperty(wildcardDirectories, path)) {
                for (const recursiveKey of recursiveKeys) {
                    const key = toCanonicalKey(path, useCaseSensitiveFileNames);
                    if (key !== recursiveKey && containsPath(recursiveKey, key, basePath, !useCaseSensitiveFileNames)) {
                        delete wildcardDirectories[path];
                    }
                }
            }
        }
    }

    return wildcardDirectories;
}

/** @internal */
export const defaultIncludeSpec = "**/*";

function validateSpecs(specs: readonly string[], errors: Diagnostic[], disallowTrailingRecursion: boolean, sourceFile: LpcConfigSourceFile | undefined, specKey: string): readonly string[] {
    return specs.filter(spec => {
        if (!isString(spec)) return false;
        const diag = specToDiagnostic(spec, disallowTrailingRecursion);
        if (diag !== undefined) {
            console.warn("implement diagnostic - ", diag);
            //errors.push(createDiagnostic(...diag));
        }
        return diag === undefined;
    });

    // function createDiagnostic(message: DiagnosticMessage, spec: string): Diagnostic {
    //     const element = getTsConfigPropArrayElementValue(jsonSourceFile, specKey, spec);
    //     return createDiagnosticForNodeInSourceFileOrCompilerDiagnostic(jsonSourceFile, element, message, spec);
    // }
}

function getSubstitutedStringArrayWithConfigDirTemplate(list: readonly string[] | undefined, basePath: string) {
    if (!list) return list;
    let result: string[] | undefined;
    list.forEach((element, index) => {
        if (!startsWithConfigDirTemplate(element)) return;
        (result ??= list.slice())[index] = getSubstitutedPathWithConfigDirTemplate(element, basePath);
    });
    return result;
}

function isNullOrUndefined(x: any): x is null | undefined { // eslint-disable-line no-restricted-syntax
    return x === undefined || x === null; // eslint-disable-line no-restricted-syntax
}

type CanonicalKey = string & { __canonicalKey: never; };
function toCanonicalKey(path: string, useCaseSensitiveFileNames: boolean): CanonicalKey {
    return (useCaseSensitiveFileNames ? path : toFileNameLowerCase(path)) as CanonicalKey;
}

function getWildcardDirectoryFromSpec(spec: string, useCaseSensitiveFileNames: boolean): { key: CanonicalKey; path: string; flags: WatchDirectoryFlags; } | undefined {
    const match = wildcardDirectoryPattern.exec(spec);
    if (match) {
        // We check this with a few `indexOf` calls because 3 `indexOf`/`lastIndexOf` calls is
        // less algorithmically complex (roughly O(3n) worst-case) than the regex we used to use,
        // \/[^/]*?[*?][^/]*\/ which was polynominal in v8, since arbitrary sequences of wildcard
        // characters could match any of the central patterns, resulting in bad backtracking.
        const questionWildcardIndex = spec.indexOf("?");
        const starWildcardIndex = spec.indexOf("*");
        const lastDirectorySeperatorIndex = spec.lastIndexOf(directorySeparator);
        return {
            key: toCanonicalKey(match[0], useCaseSensitiveFileNames),
            path: match[0],
            flags: (questionWildcardIndex !== -1 && questionWildcardIndex < lastDirectorySeperatorIndex)
                    || (starWildcardIndex !== -1 && starWildcardIndex < lastDirectorySeperatorIndex)
                ? WatchDirectoryFlags.Recursive : WatchDirectoryFlags.None,
        };
    }
    if (isImplicitGlob(spec.substring(spec.lastIndexOf(directorySeparator) + 1))) {
        const path = removeTrailingDirectorySeparator(spec);
        return {
            key: toCanonicalKey(path, useCaseSensitiveFileNames),
            path,
            flags: WatchDirectoryFlags.Recursive,
        };
    }
    return undefined;
}

function specToDiagnostic(spec: CompilerOptionsValue, disallowTrailingRecursion?: boolean): [DiagnosticMessage, string] | undefined {
    Debug.assert(typeof spec === "string");
    if (disallowTrailingRecursion && invalidTrailingRecursionPattern.test(spec)) {
        return [Diagnostics.File_specification_cannot_end_in_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0, spec];
    }
    else if (invalidDotDotAfterRecursiveWildcard(spec)) {
        return [Diagnostics.File_specification_cannot_contain_a_parent_directory_that_appears_after_a_recursive_directory_wildcard_Asterisk_Asterisk_Colon_0, spec];
    }
}

const configDirTemplate = `\${configDir}`;
function startsWithConfigDirTemplate(value: any): value is string {
    return isString(value) && startsWith(value, configDirTemplate, /*ignoreCase*/ true);
}

function getSubstitutedPathWithConfigDirTemplate(value: string, basePath: string) {
    return getNormalizedAbsolutePath(value.replace(configDirTemplate, "./"), basePath);
}


/**
 * Matches the portion of a wildcard path that does not contain wildcards.
 * Matches \a of \a\*, or \a\b\c of \a\b\c\?\d.
 *
 * NOTE: used \ in place of / above to avoid issues with multiline comments.
 *
 * Breakdown:
 *  ^                   # matches the beginning of the string
 *  [^*?]*              # matches any number of non-wildcard characters
 *  (?=\/[^/]*[*?])     # lookahead that matches a directory separator followed by
 *                      # a path component that contains at least one wildcard character (* or ?).
 */
const wildcardDirectoryPattern = /^[^*?]*(?=\/[^/]*[*?])/;


/**
 * Tests for a path that ends in a recursive directory wildcard.
 * Matches **, \**, **\, and \**\, but not a**b.
 *
 * NOTE: used \ in place of / above to avoid issues with multiline comments.
 *
 * Breakdown:
 *  (^|\/)      # matches either the beginning of the string or a directory separator.
 *  \*\*        # matches the recursive directory wildcard "**".
 *  \/?$        # matches an optional trailing directory separator at the end of the string.
 */
const invalidTrailingRecursionPattern = /(^|\/)\*\*\/?$/;

function invalidDotDotAfterRecursiveWildcard(s: string) {
    // We used to use the regex /(^|\/)\*\*\/(.*\/)?\.\.($|\/)/ to check for this case, but
    // in v8, that has polynomial performance because the recursive wildcard match - **/ -
    // can be matched in many arbitrary positions when multiple are present, resulting
    // in bad backtracking (and we don't care which is matched - just that some /.. segment
    // comes after some **/ segment).
    const wildcardIndex = startsWith(s, "**/") ? 0 : s.indexOf("/**/");
    if (wildcardIndex === -1) {
        return false;
    }
    const lastDotIndex = endsWith(s, "/..") ? s.length : s.lastIndexOf("/../");
    return lastDotIndex > wildcardIndex;
}

function matchesExcludeWorker(
    pathToCheck: string,
    excludeSpecs: readonly string[] | undefined,
    useCaseSensitiveFileNames: boolean,
    currentDirectory: string,
    basePath?: string,
) {
    const excludePattern = getRegularExpressionForWildcard(excludeSpecs, combinePaths(normalizePath(currentDirectory), basePath), "exclude");
    const excludeRegex = excludePattern && getRegexFromPattern(excludePattern, useCaseSensitiveFileNames);
    if (!excludeRegex) return false;
    if (excludeRegex.test(pathToCheck)) return true;
    return !hasExtension(pathToCheck) && excludeRegex.test(ensureTrailingDirectorySeparator(pathToCheck));
}

/** @internal */
export function isExcludedFile(
    pathToCheck: string,
    spec: ConfigFileSpecs,
    basePath: string,
    useCaseSensitiveFileNames: boolean,
    currentDirectory: string,
): boolean {
    const { validatedFilesSpec, validatedIncludeSpecs, validatedExcludeSpecs } = spec;
    if (!length(validatedIncludeSpecs) || !length(validatedExcludeSpecs)) return false;

    basePath = normalizePath(basePath);

    const keyMapper = createGetCanonicalFileName(useCaseSensitiveFileNames);
    if (validatedFilesSpec) {
        for (const fileName of validatedFilesSpec) {
            if (keyMapper(getNormalizedAbsolutePath(fileName, basePath)) === pathToCheck) return false;
        }
    }

    return matchesExcludeWorker(pathToCheck, validatedExcludeSpecs, useCaseSensitiveFileNames, currentDirectory, basePath);
}

/** @internal */
export function matchesExclude(
    pathToCheck: string,
    excludeSpecs: readonly string[] | undefined,
    useCaseSensitiveFileNames: boolean,
    currentDirectory: string,
) {
    return matchesExcludeWorker(
        pathToCheck,
        filter(excludeSpecs, spec => !invalidDotDotAfterRecursiveWildcard(spec)),
        useCaseSensitiveFileNames,
        currentDirectory,
    );
}

export type DiagnosticReporter = (diagnostic: Diagnostic) => void;