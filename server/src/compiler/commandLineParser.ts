import { AlternateModeDiagnostics, append, arrayFrom, ArrayLiteralExpression, arrayToMap, assign, cast, combinePaths, CommandLineOption, CommandLineOptionOfCustomType, CommandLineOptionOfListType, CompilerOptions, CompilerOptionsValue, ConfigFileSpecs, containsPath, createCompilerDiagnostic, createDiagnosticForNodeInSourceFile, createGetCanonicalFileName, Debug, Diagnostic, DiagnosticArguments, DiagnosticMessage, Diagnostics, DidYouMeanOptionsDiagnostics, directorySeparator, driverTypeToLanguageVariant, emptyArray, endsWith, ensureTrailingDirectorySeparator, every, Expression, extend, Extension, FileExtensionInfo, fileExtensionIs, filter, filterMutate, find, firstOrUndefined, flatten, forEach, forEachLpcConfigPropArray, getBaseFileName, getDirectoryPath, getNormalizedAbsolutePath, getOwnKeys, getRegexFromPattern, getRegularExpressionForWildcard, getSpellingSuggestion, getTextOfPropertyName, hasExtension, hasProperty, isArray, isArrayLiteralExpression, isComputedNonLiteralName, isImplicitGlob, isObjectLiteralExpression, isRootedDiskPath, isString, isStringDoubleQuoted, isStringLiteral, JsonSourceFile, length, LpcConfigOnlyOption, LpcConfigSourceFile, map, MapLike, Node, NodeArray, normalizePath, normalizeSlashes, NumericLiteral, ObjectLiteralExpression, OptionsNameMap, ParseConfigHost, ParsedCommandLine, ParsedLpcConfig, parseJsonText, Path, PrefixUnaryExpression, ProjectReference, PropertyAssignment, PropertyName, removeTrailingDirectorySeparator, startsWith, StringLiteral, SyntaxKind, toFileNameLowerCase, toPath, tracing, TypeAcquisition, WatchDirectoryFlags, WatchOptions } from "./_namespaces/lpc";
import { trimStart } from "../utils";

export const libEntries: [string, string][] = [
    ["ldmud", "ldmud.efun.c"],
];

interface ExtendsResult {
    options: CompilerOptions;
    watchOptions?: WatchOptions;
    include?: string[];
    exclude?: string[];
    files?: string[];
    compileOnSave?: boolean;
    extendedSourceFiles?: Set<string>;
}


/**
 * An array of supported "lib" reference file names used to determine the order for inclusion
 * when referenced, as well as for spelling suggestions. This ensures the correct ordering for
 * overload resolution when a type declared in one lib is extended by another.
 *
 * @internal
 */
export const libs = libEntries.map(entry => entry[0]);

/** @internal */
export const compileOnSaveCommandLineOption: CommandLineOption = {
    name: "compileOnSave",
    type: "boolean",
    defaultValueDescription: false,
};
const extendsOptionDeclaration: CommandLineOptionOfListType = {
    name: "extends",
    type: "listOrElement",
    element: {
        name: "extends",
        type: "string",
    },
    category: Diagnostics.File_Management,
    disallowNullOrUndefined: true,
};

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
    const { validatedFilesSpec, validatedIncludeSpecs, validatedExcludeSpecs } = configFileSpecs;
    // const validatedIncludeSpecs = ["./"];
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
    extendedConfigCache?: Map<string, ExtendedConfigCacheEntry>,
): ParsedCommandLine {
    Debug.assert((json === undefined && sourceFile !== undefined) || (json !== undefined && sourceFile === undefined));
    const errors: Diagnostic[] = [];
    
    const parsedConfig = parseConfig(json, sourceFile, host, basePath, configFileName, resolutionStack, errors, extendedConfigCache);
    const { raw } = parsedConfig;
    const options = handleOptionConfigDirTemplateSubstitution(
        extend(existingOptions, parsedConfig.options || {}),
        configDirTemplateSubstitutionOptions,
        basePath,
    ) as CompilerOptions;
    // const watchOptions = handleWatchOptionsConfigDirTemplateSubstitution(
    //     existingWatchOptions && parsedConfig.watchOptions ?
    //         extend(existingWatchOptions, parsedConfig.watchOptions) :
    //         parsedConfig.watchOptions || existingWatchOptions,
    //     basePath,
    // );
    // const options = existingOptions;
    const watchOptions = existingWatchOptions;
    options.configFilePath = configFileName && normalizeSlashes(configFileName);
    const basePathForFileNames = normalizePath(configFileName ? directoryOfCombinedPath(configFileName, basePath) : basePath);
    const configFileSpecs = getConfigFileSpecs();
    if (sourceFile) sourceFile.configFileSpecs = configFileSpecs;
    setConfigFileInOptions(options, sourceFile);    
    
    const firstInclude = raw?.include && isArray(raw.include) ? firstOrUndefined(raw.include) as string : undefined;
    let libRootPath = normalizePath(combinePaths(basePathForFileNames, firstInclude ?? "./"));
    options.rootDir = libRootPath;
    options.rootDirs = [libRootPath];

    options.driverType = driverTypeToLanguageVariant(raw?.driver?.type);    

    if (raw?.libInclude && isArray(raw.libInclude)) {
        options.libIncludeDirs = map(raw.libInclude as string[], dir => normalizePath(combinePaths(libRootPath, trimStart(dir,"/"))));
    }

    if (raw?.libFiles?.global_include) {
        options.globalIncludeFiles = [raw?.libFiles?.global_include];        
        // try to resolve each file
        options.resolvedGlobalIncludeFiles = options.globalIncludeFiles.map(file => {
            const resolved = forEach(options.libIncludeDirs, libDir => {
                const filePath = normalizePath(combinePaths(libDir, file));
                if (host.fileExists(filePath)) {
                    return filePath;
                }   
            });
            return resolved;
        });
    }

    options.diagnostics = raw?.diagnostics === "on" || raw?.diagnostics === true;
    
    const sefunFilePath = trimStart(options.sefunFile ?? raw?.libFiles?.simul_efun ?? "/obj/sefun.c", "/");
    options.sefunFile = normalizePath(combinePaths(libRootPath, sefunFilePath));

    const masterFile = trimStart(options.masterFile ?? raw?.libFiles?.master ?? "/obj/master.c", "/");
    options.masterFile = normalizePath(combinePaths(libRootPath, masterFile));

    const playerFile = trimStart(options.playerFile ?? raw?.libFiles?.player ?? "/obj/player.c", "/");
    options.playerFile = normalizePath(combinePaths(libRootPath, playerFile));
    
    options.configDefines ??= {};
    const rawDefines = raw?.defines ?? emptyArray;        
    forEach(rawDefines, define => {        
        const key = firstOrUndefined(Object.keys(define || {}));
        if (key) {
            const val = define[key];
            options.configDefines[key] = define[key];            
        }
    });
    
    // use first include dir as root dir as a default
    // options.rootDir ??= isArray(raw.include) ? firstOrUndefined(raw.include) : undefined;

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
                    const nodeValue = forEachLpcConfigPropArray(sourceFile, "files", property => property.initializer);
                    const error = createDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, nodeValue, diagnosticMessage, fileName);
                    errors.push(error);
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
        if (excludeOfRaw === "no-prop") {
            const outDir = options.outDir;
            const declarationDir = options.declarationDir;

            if (outDir || declarationDir) {
                excludeSpecs = filter([outDir, declarationDir], d => !!d) as string[];
            }
        }

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
            isDefaultIncludeSpec            
        };
    }

    function getFileNames(basePath: string): string[] {
        const fileNames = getFileNamesFromConfigSpecs(configFileSpecs, basePath, options, host, extraFileExtensions);
        if (shouldReportNoInputFiles(fileNames, canJsonReportNoInputFiles(raw), resolutionStack)) {
            errors.push(getErrorForNoInputFiles(configFileSpecs, configFileName));
        }
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

    function getSpecsFromRaw(prop: "files" | "include" | "exclude" | "diagnostics"): PropOfRaw<string> {
        return getPropFromRaw(prop, isString, "string");
    }

    function getPropFromRaw<T>(prop: "files" | "include" | "exclude" | "references" | "diagnostics", validateElement: (value: unknown) => boolean, elementTypeName: string): PropOfRaw<T> {
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

/** @internal */
export interface OptionsBase {
    [option: string]: CompilerOptionsValue | LpcConfigSourceFile | undefined;
}

function handleOptionConfigDirTemplateSubstitution(
    options: OptionsBase | undefined,
    optionDeclarations: readonly CommandLineOption[],
    basePath: string,
) {
    if (!options) return options;
    let result: OptionsBase | undefined;
    for (const option of optionDeclarations) {
        if (options[option.name] !== undefined) {
            const value = options[option.name];
            switch (option.type) {
                case "string":
                    Debug.assert(option.isFilePath);
                    if (startsWithConfigDirTemplate(value)) {
                        setOptionValue(option, getSubstitutedPathWithConfigDirTemplate(value, basePath));
                    }
                    break;
                case "list":
                    Debug.assert(option.element.isFilePath);
                    const listResult = getSubstitutedStringArrayWithConfigDirTemplate(value as string[], basePath);
                    if (listResult) setOptionValue(option, listResult);
                    break;
                case "object":
                    Debug.assert(option.name === "paths");
                    const objectResult = getSubstitutedMapLikeOfStringArrayWithConfigDirTemplate(value as MapLike<string[]>, basePath);
                    if (objectResult) setOptionValue(option, objectResult);
                    break;
                default:
                    Debug.fail("option type not supported");
            }
        }
    }
    return result || options;

    function setOptionValue(option: CommandLineOption, value: CompilerOptionsValue) {
        (result ??= assign({}, options))[option.name] = value;
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

function getSubstitutedMapLikeOfStringArrayWithConfigDirTemplate(mapLike: MapLike<string[]>, basePath: string) {
    let result: MapLike<string[]> | undefined;
    const ownKeys = getOwnKeys(mapLike);
    ownKeys.forEach(key => {
        if (!isArray(mapLike[key])) return;
        const subStitution = getSubstitutedStringArrayWithConfigDirTemplate(mapLike[key], basePath);
        if (!subStitution) return;
        (result ??= assign({}, mapLike))[key] = subStitution;
    });
    return result;
}

function getSubstitutedStringArrayWithConfigDirTemplate(list: readonly string[] | undefined, basePath: string) {
    if (!list) return list as string[];
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

export interface ExtendedConfigCacheEntry {
    extendedResult: LpcConfigSourceFile;
    extendedConfig: ParsedLpcConfig | undefined;
}

/**
 * Convert the json syntax tree into the json value
 */
export function convertToObject(sourceFile: JsonSourceFile, errors: Diagnostic[]): any {
    return convertToJson(sourceFile, sourceFile.statements[0]?.expression, errors, /*returnValue*/ true, /*jsonConversionNotifier*/ undefined);
}

/** @internal */
export interface JsonConversionNotifier {
    rootOptions: LpcConfigOnlyOption;
    onPropertySet(
        keyText: string,
        value: any,
        propertyAssignment: PropertyAssignment,
        parentOption: LpcConfigOnlyOption | undefined,
        option: CommandLineOption | undefined,
    ): void;
}

/**
 * Convert the json syntax tree into the json value and report errors
 * This returns the json value (apart from checking errors) only if returnValue provided is true.
 * Otherwise it just checks the errors and returns undefined
 *
 * @internal
 */
export function convertToJson(
    sourceFile: JsonSourceFile,
    rootExpression: Expression | undefined,
    errors: Diagnostic[],
    returnValue: boolean,
    jsonConversionNotifier: JsonConversionNotifier | undefined,
): any {
    if (!rootExpression) {
        return returnValue ? {} : undefined;
    }

    return convertPropertyValueToJson(rootExpression, jsonConversionNotifier?.rootOptions);

    function convertObjectLiteralExpressionToJson(
        node: ObjectLiteralExpression,
        objectOption: LpcConfigOnlyOption | undefined,
    ): any {
        const result: any = returnValue ? {} : undefined;
        for (const element of node.properties) {
            if (element.kind !== SyntaxKind.PropertyAssignment) {
                errors.push(createDiagnosticForNodeInSourceFile(sourceFile, element, Diagnostics.Property_assignment_expected));
                continue;
            }

            // if (element.questionToken) {
            //     errors.push(createDiagnosticForNodeInSourceFile(sourceFile, element.questionToken, Diagnostics.The_0_modifier_can_only_be_used_in_TypeScript_files, "?"));
            // }
            if (!isDoubleQuotedString(element.name)) {
                errors.push(createDiagnosticForNodeInSourceFile(sourceFile, element.name, Diagnostics.String_literal_with_double_quotes_expected));
            }

            const textOfKey = isComputedNonLiteralName(element.name) ? undefined : getTextOfPropertyName(element.name);
            const keyText = textOfKey && (textOfKey);
            const option = keyText ? objectOption?.elementOptions?.get(keyText) : undefined;
            const value = convertPropertyValueToJson(element.initializer, option);
            if (typeof keyText !== "undefined") {
                if (returnValue) {
                    result[keyText] = value;
                }

                // Notify key value set, if user asked for it
                jsonConversionNotifier?.onPropertySet(keyText, value, element, objectOption, option);
            }
        }
        return result;
    }

    function convertArrayLiteralExpressionToJson(
        elements: NodeArray<Expression>,
        elementOption: CommandLineOption | undefined,
    ) {
        if (!returnValue) {
            elements.forEach(element => convertPropertyValueToJson(element, elementOption));
            return undefined;
        }

        // Filter out invalid values
        return filter(elements.map(element => convertPropertyValueToJson(element, elementOption)), v => v !== undefined);
    }

    function convertPropertyValueToJson(valueExpression: Expression, option: CommandLineOption | undefined): any {
        switch (valueExpression.kind) {
            case SyntaxKind.TrueKeyword:
                return true;

            case SyntaxKind.FalseKeyword:
                return false;

            case SyntaxKind.NullKeyword:
                return null; // eslint-disable-line no-restricted-syntax

            case SyntaxKind.StringLiteral:
                if (!isDoubleQuotedString(valueExpression)) {
                    errors.push(createDiagnosticForNodeInSourceFile(sourceFile, valueExpression, Diagnostics.String_literal_with_double_quotes_expected));
                }
                return (valueExpression as StringLiteral).text;

            case SyntaxKind.NumericLiteral:
                return Number((valueExpression as NumericLiteral).text);

            case SyntaxKind.PrefixUnaryExpression:
                if ((valueExpression as PrefixUnaryExpression).operator !== SyntaxKind.MinusToken || (valueExpression as PrefixUnaryExpression).operand.kind !== SyntaxKind.NumericLiteral) {
                    break; // not valid JSON syntax
                }
                return -Number(((valueExpression as PrefixUnaryExpression).operand as NumericLiteral).text);

            case SyntaxKind.ObjectLiteralExpression:
                const objectLiteralExpression = valueExpression as ObjectLiteralExpression;

                // Currently having element option declaration in the tsconfig with type "object"
                // determines if it needs onSetValidOptionKeyValueInParent callback or not
                // At moment there are only "compilerOptions", "typeAcquisition" and "typingOptions"
                // that satisfies it and need it to modify options set in them (for normalizing file paths)
                // vs what we set in the json
                // If need arises, we can modify this interface and callbacks as needed
                return convertObjectLiteralExpressionToJson(objectLiteralExpression, option as LpcConfigOnlyOption);

            case SyntaxKind.ArrayLiteralExpression:                
                return convertArrayLiteralExpressionToJson(
                    (valueExpression as ArrayLiteralExpression).elements,
                    option && (option as CommandLineOptionOfListType).element,
                );
        }

        // Not in expected format
        if (option) {
            errors.push(createDiagnosticForNodeInSourceFile(sourceFile, valueExpression, Diagnostics.Compiler_option_0_requires_a_value_of_type_1, option.name, getCompilerOptionValueTypeString(option)));
        }
        else {
            errors.push(createDiagnosticForNodeInSourceFile(sourceFile, valueExpression, Diagnostics.Property_value_can_only_be_string_literal_numeric_literal_true_false_null_object_literal_or_array_literal));
        }

        return undefined;
    }

    function isDoubleQuotedString(node: Node): boolean {
        return isStringLiteral(node) && isStringDoubleQuoted(node, sourceFile);
    }
}

function getCompilerOptionValueTypeString(option: CommandLineOption): string {
    return (option.type === "listOrElement") ?
        `${getCompilerOptionValueTypeString(option.element)} or Array` :
        option.type === "list" ?
        "Array" :
        isString(option.type) ? option.type : "string";
}

let buildOptionsNameMapCache: OptionsNameMap;
function getBuildOptionsNameMap(): OptionsNameMap {    
    return buildOptionsNameMapCache || (buildOptionsNameMapCache = createOptionNameMap(buildOpts));
}


/** @internal */
export interface ParseCommandLineWorkerDiagnostics extends DidYouMeanOptionsDiagnostics {
    getOptionsNameMap: () => OptionsNameMap;
    optionTypeMismatchDiagnostic: DiagnosticMessage;
}

const compilerOptionsAlternateMode: AlternateModeDiagnostics = {
    diagnostic: Diagnostics.Compiler_option_0_may_only_be_used_with_build,
    getOptionsNameMap: getBuildOptionsNameMap,
};

/** @internal */
export function createOptionNameMap(optionDeclarations: readonly CommandLineOption[]): OptionsNameMap {
    const optionsNameMap = new Map<string, CommandLineOption>();
    const shortOptionNames = new Map<string, string>();
    forEach(optionDeclarations, option => {
        optionsNameMap.set(option.name.toLowerCase(), option);
        if (option.shortName) {
            shortOptionNames.set(option.shortName, option.name);
        }
    });

    return { optionsNameMap, shortOptionNames };
}



function getDefaultCompilerOptions(configFileName?: string) {
    const options: CompilerOptions = configFileName && getBaseFileName(configFileName) === "jsconfig.json"
        ? { maxNodeModuleJsDepth: 2 }
        : {};
    return options;
}

function commandLineOptionsToMap(options: readonly CommandLineOption[]) {
    return arrayToMap(options, getOptionName);
}

function getOptionName(option: CommandLineOption) {
    return option.name;
}

/** @internal */
export const commonOptionsWithBuild: CommandLineOption[] = [
    {
        name: "help",
        shortName: "h",
        type: "boolean",
        showInSimplifiedHelpView: true,
        isCommandLineOnly: true,
        category: Diagnostics.Command_line_Options,
        description: Diagnostics.Print_this_message,
        defaultValueDescription: false,
    },
    {
        name: "help",
        shortName: "?",
        type: "boolean",
        isCommandLineOnly: true,
        category: Diagnostics.Command_line_Options,
        defaultValueDescription: false,
    },
    {
        name: "watch",
        shortName: "w",
        type: "boolean",
        showInSimplifiedHelpView: true,
        isCommandLineOnly: true,
        category: Diagnostics.Command_line_Options,
        description: Diagnostics.Watch_input_files,
        defaultValueDescription: false,
    },
    {
        name: "preserveWatchOutput",
        type: "boolean",
        showInSimplifiedHelpView: false,
        category: Diagnostics.Output_Formatting,
        description: Diagnostics.Disable_wiping_the_console_in_watch_mode,
        defaultValueDescription: false,
    },
    {
        name: "listFiles",
        type: "boolean",
        category: Diagnostics.Compiler_Diagnostics,
        description: Diagnostics.Print_all_of_the_files_read_during_the_compilation,
        defaultValueDescription: false,
    },
    {
        name: "explainFiles",
        type: "boolean",
        category: Diagnostics.Compiler_Diagnostics,
        description: Diagnostics.Print_files_read_during_the_compilation_including_why_it_was_included,
        defaultValueDescription: false,
    },
    {
        name: "listEmittedFiles",
        type: "boolean",
        category: Diagnostics.Compiler_Diagnostics,
        description: Diagnostics.Print_the_names_of_emitted_files_after_a_compilation,
        defaultValueDescription: false,
    },
    {
        name: "pretty",
        type: "boolean",
        showInSimplifiedHelpView: true,
        category: Diagnostics.Output_Formatting,
        description: Diagnostics.Enable_color_and_formatting_in_TypeScript_s_output_to_make_compiler_errors_easier_to_read,
        defaultValueDescription: true,
    },
    {
        name: "traceResolution",
        type: "boolean",
        category: Diagnostics.Compiler_Diagnostics,
        description: Diagnostics.Log_paths_used_during_the_moduleResolution_process,
        defaultValueDescription: false,
    },
    {
        name: "diagnostics",
        type: "boolean",
        category: Diagnostics.Compiler_Diagnostics,
        description: Diagnostics.Output_compiler_performance_information_after_building,
        defaultValueDescription: false,
    },
    {
        name: "extendedDiagnostics",
        type: "boolean",
        category: Diagnostics.Compiler_Diagnostics,
        description: Diagnostics.Output_more_detailed_compiler_performance_information_after_building,
        defaultValueDescription: false,
    },
    {
        name: "generateCpuProfile",
        type: "string",
        isFilePath: true,
        paramType: Diagnostics.FILE_OR_DIRECTORY,
        category: Diagnostics.Compiler_Diagnostics,
        description: Diagnostics.Emit_a_v8_CPU_profile_of_the_compiler_run_for_debugging,
        defaultValueDescription: "profile.cpuprofile",
    },
    {
        name: "generateTrace",
        type: "string",
        isFilePath: true,
        isCommandLineOnly: true,
        paramType: Diagnostics.DIRECTORY,
        category: Diagnostics.Compiler_Diagnostics,
        description: Diagnostics.Generates_an_event_trace_and_a_list_of_types,
    },
    {
        name: "incremental",
        shortName: "i",
        type: "boolean",
        category: Diagnostics.Projects,
        description: Diagnostics.Save_tsbuildinfo_files_to_allow_for_incremental_compilation_of_projects,
        transpileOptionValue: undefined,
        defaultValueDescription: Diagnostics.false_unless_composite_is_set,
    },
    // {
    //     name: "declaration",
    //     shortName: "d",
    //     type: "boolean",
    //     // Not setting affectsEmit because we calculate this flag might not affect full emit
    //     affectsBuildInfo: true,
    //     showInSimplifiedHelpView: true,
    //     category: Diagnostics.Emit,
    //     transpileOptionValue: undefined,
    //     description: Diagnostics.Generate_d_ts_files_from_TypeScript_and_JavaScript_files_in_your_project,
    //     defaultValueDescription: Diagnostics.false_unless_composite_is_set,
    // },
    // {
    //     name: "declarationMap",
    //     type: "boolean",
    //     // Not setting affectsEmit because we calculate this flag might not affect full emit
    //     affectsBuildInfo: true,
    //     showInSimplifiedHelpView: true,
    //     category: Diagnostics.Emit,
    //     defaultValueDescription: false,
    //     description: Diagnostics.Create_sourcemaps_for_d_ts_files,
    // },
    // {
    //     name: "emitDeclarationOnly",
    //     type: "boolean",
    //     // Not setting affectsEmit because we calculate this flag might not affect full emit
    //     affectsBuildInfo: true,
    //     showInSimplifiedHelpView: true,
    //     category: Diagnostics.Emit,
    //     description: Diagnostics.Only_output_d_ts_files_and_not_JavaScript_files,
    //     transpileOptionValue: undefined,
    //     defaultValueDescription: false,
    // },
    {
        name: "sourceMap",
        type: "boolean",
        // Not setting affectsEmit because we calculate this flag might not affect full emit
        affectsBuildInfo: true,
        showInSimplifiedHelpView: true,
        category: Diagnostics.Emit,
        defaultValueDescription: false,
        description: Diagnostics.Create_source_map_files_for_emitted_JavaScript_files,
    },
    // {
    //     name: "inlineSourceMap",
    //     type: "boolean",
    //     // Not setting affectsEmit because we calculate this flag might not affect full emit
    //     affectsBuildInfo: true,
    //     category: Diagnostics.Emit,
    //     description: Diagnostics.Include_sourcemap_files_inside_the_emitted_JavaScript,
    //     defaultValueDescription: false,
    // },
    {
        name: "assumeChangesOnlyAffectDirectDependencies",
        type: "boolean",
        affectsSemanticDiagnostics: true,
        affectsEmit: true,
        affectsBuildInfo: true,
        category: Diagnostics.Watch_and_Build_Modes,
        description: Diagnostics.Have_recompiles_in_projects_that_use_incremental_and_watch_mode_assume_that_changes_within_a_file_will_only_affect_files_directly_depending_on_it,
        defaultValueDescription: false,
    },
    {
        name: "locale",
        type: "string",
        category: Diagnostics.Command_line_Options,
        isCommandLineOnly: true,
        description: Diagnostics.Set_the_language_of_the_messaging_from_TypeScript_This_does_not_affect_emit,
        defaultValueDescription: Diagnostics.Platform_specific,
    },    
];

const commandOptionsWithoutBuild: CommandLineOption[] = [
    {
        name: "rootDir",
        type: "string",
        affectsEmit: true,
        affectsBuildInfo: true,
        affectsDeclarationPath: true,
        isFilePath: true,
        paramType: Diagnostics.LOCATION,
        category: Diagnostics.Command_line_Options,
        description: Diagnostics.Specify_the_root_folder_within_your_source_files,
        defaultValueDescription: Diagnostics.Computed_from_the_list_of_input_files,
    },
    {
        name: "strictObjectTypes",
        type: "boolean",
        affectsSemanticDiagnostics: true,
        affectsBuildInfo: true,
        strictFlag: true,
        category: Diagnostics.Type_Checking,
        description: Diagnostics.When_comparing_types_check_that_the_objectStructure_is_compatible_with_the_target_type,
        defaultValueDescription: Diagnostics.false_unless_strict_is_set,
    },
    {
        name: "noLib",
        type: "boolean",
        category: Diagnostics.Language_and_Environment,
        affectsProgramStructure: true,
        description: Diagnostics.Disable_including_any_library_files_including_the_default_efun_h,
        // We are not returning a sourceFile for lib file when asked by the program,
        // so pass --noLib to avoid reporting a file not found error.
        transpileOptionValue: true,
        defaultValueDescription: false,
    },
];

/** @internal */
export const optionDeclarations: CommandLineOption[] = [
    ...commonOptionsWithBuild,    
    ...commandOptionsWithoutBuild,
];

// Watch related options
/** @internal */
export const optionsForWatch: CommandLineOption[] = [];

// Build related options
/** @internal */
export const optionsForBuild: CommandLineOption[] = [
    {
        name: "verbose",
        shortName: "v",
        category: Diagnostics.Command_line_Options,
        description: Diagnostics.Enable_verbose_logging,
        type: "boolean",
        defaultValueDescription: false,
    },
];

/** @internal */
export const buildOpts: CommandLineOption[] = [
    ...commonOptionsWithBuild,
    ...optionsForBuild,
];


/** @internal */
export const moduleResolutionOptionDeclarations: readonly CommandLineOption[] = optionDeclarations.filter(option => !!option.affectsModuleResolution);

let commandLineCompilerOptionsMapCache: Map<string, CommandLineOption>;
function getCommandLineCompilerOptionsMap() {
    return commandLineCompilerOptionsMapCache || (commandLineCompilerOptionsMapCache = commandLineOptionsToMap(optionDeclarations));
}
let commandLineWatchOptionsMapCache: Map<string, CommandLineOption>;
function getCommandLineWatchOptionsMap() {
    console.debug("todo - getCommandLineWatchOptionsMap");
    // return commandLineWatchOptionsMapCache || (commandLineWatchOptionsMapCache = commandLineOptionsToMap(optionsForWatch));
}
let commandLineTypeAcquisitionMapCache: Map<string, CommandLineOption>;
function getCommandLineTypeAcquisitionMap() {
    console.debug("todo - getCommandLineTypeAcquisitionMap");
    // return commandLineTypeAcquisitionMapCache || (commandLineTypeAcquisitionMapCache = commandLineOptionsToMap(typeAcquisitionDeclarations));
}

/** @internal */
export const sourceFileAffectingCompilerOptions: readonly CommandLineOption[] = optionDeclarations.filter(option => !!option.affectsSourceFile || !!option.affectsBindDiagnostics);

function convertOptionsFromJson(optionsNameMap: Map<string, CommandLineOption>, jsonOptions: any, basePath: string, defaultOptions: undefined, diagnostics: DidYouMeanOptionsDiagnostics, errors: Diagnostic[]): WatchOptions | undefined;
function convertOptionsFromJson(optionsNameMap: Map<string, CommandLineOption>, jsonOptions: any, basePath: string, defaultOptions: CompilerOptions | TypeAcquisition, diagnostics: DidYouMeanOptionsDiagnostics, errors: Diagnostic[]): CompilerOptions | TypeAcquisition;
function convertOptionsFromJson(optionsNameMap: Map<string, CommandLineOption>, jsonOptions: any, basePath: string, defaultOptions: CompilerOptions | TypeAcquisition | WatchOptions | undefined, diagnostics: DidYouMeanOptionsDiagnostics, errors: Diagnostic[]) {
    if (!jsonOptions) {
        return;
    }

    for (const id in jsonOptions) {
        const opt = optionsNameMap.get(id);
        if (opt) {
            (defaultOptions || (defaultOptions = {}))[opt.name] = convertJsonOption(opt, jsonOptions[id], basePath, errors);
        }
        else {
            errors.push(createUnknownOptionError(id, diagnostics));
        }
    }
    return defaultOptions;
}

function parseOwnConfigOfJson(
    json: any,
    host: ParseConfigHost,
    basePath: string,
    configFileName: string | undefined,
    errors: Diagnostic[],
): ParsedLpcConfig {
    if (hasProperty(json, "excludes")) {
        errors.push(createCompilerDiagnostic(Diagnostics.Unknown_option_excludes_Did_you_mean_exclude));
    }

    const options = convertCompilerOptionsFromJsonWorker(json.compilerOptions, basePath, errors, configFileName);
    const typeAcquisition = convertTypeAcquisitionFromJsonWorker(json.typeAcquisition, basePath, errors, configFileName);
    const watchOptions = convertWatchOptionsFromJsonWorker(json.watchOptions, basePath, errors);
    json.compileOnSave = convertCompileOnSaveOptionFromJson(json, basePath, errors);
    const extendedConfigPath = json.extends || json.extends === "" ?
        getExtendsConfigPathOrArray(json.extends, host, basePath, configFileName, errors) :
        undefined;
    return { raw: json, options, watchOptions, typeAcquisition, extendedConfigPath };
}

function getExtendsConfigPath(
    extendedConfig: string,
    host: ParseConfigHost,
    basePath: string,
    errors: Diagnostic[],
    valueExpression: Expression | undefined,
    sourceFile: LpcConfigSourceFile | undefined,
) {
    extendedConfig = normalizeSlashes(extendedConfig);
    if (isRootedDiskPath(extendedConfig) || startsWith(extendedConfig, "./") || startsWith(extendedConfig, "../")) {
        let extendedConfigPath = getNormalizedAbsolutePath(extendedConfig, basePath);
        if (!host.fileExists(extendedConfigPath) && !endsWith(extendedConfigPath, Extension.Json)) {
            extendedConfigPath = `${extendedConfigPath}.json`;
            if (!host.fileExists(extendedConfigPath)) {
                errors.push(createDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, valueExpression, Diagnostics.File_0_not_found, extendedConfig));
                return undefined;
            }
        }
        return extendedConfigPath;
    }
    // TODO
    // If the path isn't a rooted or relative path, resolve like a module
    // const resolved = nodeNextJsonConfigResolver(extendedConfig, combinePaths(basePath, "tsconfig.json"), host);
    // if (resolved.resolvedModule) {
    //     return resolved.resolvedModule.resolvedFileName;
    // }
    if (extendedConfig === "") {
        errors.push(createDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, valueExpression, Diagnostics.Compiler_option_0_cannot_be_given_an_empty_string, "extends"));
    }
    else {
        errors.push(createDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, valueExpression, Diagnostics.File_0_not_found, extendedConfig));
    }
    return undefined;
}

function getExtendsConfigPathOrArray(
    value: CompilerOptionsValue,
    host: ParseConfigHost,
    basePath: string,
    configFileName: string | undefined,
    errors: Diagnostic[],
    propertyAssignment?: PropertyAssignment,
    valueExpression?: Expression,
    sourceFile?: JsonSourceFile,
) {
    let extendedConfigPath: string | string[] | undefined;
    const newBase = configFileName ? directoryOfCombinedPath(configFileName, basePath) : basePath;
    if (isString(value)) {
        extendedConfigPath = getExtendsConfigPath(
            value,
            host,
            newBase,
            errors,
            valueExpression,
            sourceFile,
        );
    }
    else if (isArray(value)) {
        extendedConfigPath = [];
        for (let index = 0; index < (value as unknown[]).length; index++) {
            const fileName = (value as unknown[])[index];
            if (isString(fileName)) {
                extendedConfigPath = append(
                    extendedConfigPath,
                    getExtendsConfigPath(
                        fileName,
                        host,
                        newBase,
                        errors,
                        (valueExpression as ArrayLiteralExpression | undefined)?.elements[index],
                        sourceFile,
                    ),
                );
            }
            else {
                convertJsonOption(extendsOptionDeclaration.element, value, basePath, errors, propertyAssignment, (valueExpression as ArrayLiteralExpression | undefined)?.elements[index], sourceFile);
            }
        }
    }
    else {
        convertJsonOption(extendsOptionDeclaration, value, basePath, errors, propertyAssignment, valueExpression, sourceFile);
    }
    return extendedConfigPath;
}

function convertCompileOnSaveOptionFromJson(jsonOption: any, basePath: string, errors: Diagnostic[]): boolean {
    if (!hasProperty(jsonOption, compileOnSaveCommandLineOption.name)) {
        return false;
    }
    const result = convertJsonOption(compileOnSaveCommandLineOption, jsonOption.compileOnSave, basePath, errors);
    return typeof result === "boolean" && result;
}

function convertTypeAcquisitionFromJsonWorker(jsonOptions: any, basePath: string, errors: Diagnostic[], configFileName?: string): TypeAcquisition {
    console.debug("todo - convertTypeAcquisitionFromJsonWorker");
    return undefined;
    // const options = getDefaultTypeAcquisition(configFileName);
    // convertOptionsFromJson(getCommandLineTypeAcquisitionMap(), jsonOptions, basePath, options, typeAcquisitionDidYouMeanDiagnostics, errors);
    // return options;
}

function convertWatchOptionsFromJsonWorker(jsonOptions: any, basePath: string, errors: Diagnostic[]): WatchOptions | undefined {
    console.debug("todo - convertWatchOptionsFromJsonWorker");
    return undefined;
    // return convertOptionsFromJson(getCommandLineWatchOptionsMap(), jsonOptions, basePath, /*defaultOptions*/ undefined, watchOptionsDidYouMeanDiagnostics, errors);
}

/**
 * This *just* extracts options/include/exclude/files out of a config file.
 * It does *not* resolve the included files.
 */
function parseConfig(
    json: any,
    sourceFile: LpcConfigSourceFile | undefined,
    host: ParseConfigHost,
    basePath: string,
    configFileName: string | undefined,
    resolutionStack: string[],
    errors: Diagnostic[],
    extendedConfigCache?: Map<string, ExtendedConfigCacheEntry>,
): ParsedLpcConfig {
    basePath = normalizeSlashes(basePath);
    const resolvedPath = getNormalizedAbsolutePath(configFileName || "", basePath);

    if (resolutionStack.includes(resolvedPath)) {
        errors.push(createCompilerDiagnostic(Diagnostics.Circularity_detected_while_resolving_configuration_Colon_0, [...resolutionStack, resolvedPath].join(" -> ")));
        return { raw: json || convertToObject(sourceFile!, errors) };
    }

    const ownConfig = json ?
        parseOwnConfigOfJson(json, host, basePath, configFileName, errors) :
        parseOwnConfigOfJsonSourceFile(sourceFile!, host, basePath, configFileName, errors);

    if (ownConfig.options?.paths) {
        // If we end up needing to resolve relative paths from 'paths' relative to
        // the config file location, we'll need to know where that config file was.
        // Since 'paths' can be inherited from an extended config in another directory,
        // we wouldn't know which directory to use unless we store it here.
        ownConfig.options.pathsBasePath = basePath;
    }
    if (ownConfig.extendedConfigPath) {
        // copy the resolution stack so it is never reused between branches in potential diamond-problem scenarios.
        resolutionStack = resolutionStack.concat([resolvedPath]);
        const result: ExtendsResult = { options: {} };
        if (isString(ownConfig.extendedConfigPath)) {
            applyExtendedConfig(result, ownConfig.extendedConfigPath);
        }
        else {
            ownConfig.extendedConfigPath.forEach(extendedConfigPath => applyExtendedConfig(result, extendedConfigPath));
        }
        if (result.include) ownConfig.raw.include = result.include;
        if (result.exclude) ownConfig.raw.exclude = result.exclude;
        if (result.files) ownConfig.raw.files = result.files;

        if (ownConfig.raw.compileOnSave === undefined && result.compileOnSave) ownConfig.raw.compileOnSave = result.compileOnSave;
        if (sourceFile && result.extendedSourceFiles) sourceFile.extendedSourceFiles = arrayFrom(result.extendedSourceFiles.keys());

        ownConfig.options = assign(result.options, ownConfig.options);
        ownConfig.watchOptions = ownConfig.watchOptions && result.watchOptions ?
            assign(result.watchOptions, ownConfig.watchOptions) :
            ownConfig.watchOptions || result.watchOptions;
    }
    return ownConfig;

    function applyExtendedConfig(result: ExtendsResult, extendedConfigPath: string) {
        console.debug("todo - applyExtendedConfig");
        // const extendedConfig = getExtendedConfig(sourceFile, extendedConfigPath, host, resolutionStack, errors, extendedConfigCache, result);
        // if (extendedConfig && isSuccessfulParsedTsconfig(extendedConfig)) {
        //     const extendsRaw = extendedConfig.raw;
        //     let relativeDifference: string | undefined;
        //     const setPropertyInResultIfNotUndefined = (propertyName: "include" | "exclude" | "files") => {
        //         if (ownConfig.raw[propertyName]) return; // No need to calculate if already set in own config
        //         if (extendsRaw[propertyName]) {
        //             result[propertyName] = map(extendsRaw[propertyName], (path: string) =>
        //                 startsWithConfigDirTemplate(path) || isRootedDiskPath(path) ?
        //                     path :
        //                     combinePaths(
        //                         relativeDifference ||= convertToRelativePath(getDirectoryPath(extendedConfigPath), basePath, createGetCanonicalFileName(host.useCaseSensitiveFileNames)),
        //                         path,
        //                     ));
        //         }
        //     };
        //     setPropertyInResultIfNotUndefined("include");
        //     setPropertyInResultIfNotUndefined("exclude");
        //     setPropertyInResultIfNotUndefined("files");
        //     if (extendsRaw.compileOnSave !== undefined) {
        //         result.compileOnSave = extendsRaw.compileOnSave;
        //     }
        //     assign(result.options, extendedConfig.options);
        //     result.watchOptions = result.watchOptions && extendedConfig.watchOptions ?
        //         assign({}, result.watchOptions, extendedConfig.watchOptions) :
        //         result.watchOptions || extendedConfig.watchOptions;
        //     // TODO extend type typeAcquisition
        // }
    }
}


let optionsNameMapCache: OptionsNameMap;

/** @internal */
export function getOptionsNameMap(): OptionsNameMap {
    return optionsNameMapCache ||= createOptionNameMap(optionDeclarations);
}


/** @internal */
export const compilerOptionsDidYouMeanDiagnostics: ParseCommandLineWorkerDiagnostics = {
    alternateMode: compilerOptionsAlternateMode,
    getOptionsNameMap,
    optionDeclarations,
    unknownOptionDiagnostic: Diagnostics.Unknown_compiler_option_0,
    unknownDidYouMeanDiagnostic: Diagnostics.Unknown_compiler_option_0_Did_you_mean_1,
    optionTypeMismatchDiagnostic: Diagnostics.Compiler_option_0_expects_an_argument,
};

function convertCompilerOptionsFromJsonWorker(jsonOptions: any, basePath: string, errors: Diagnostic[], configFileName?: string): CompilerOptions {
    const options = getDefaultCompilerOptions(configFileName);
    convertOptionsFromJson(getCommandLineCompilerOptionsMap(), jsonOptions, basePath, options, compilerOptionsDidYouMeanDiagnostics, errors);
    if (configFileName) {
        options.configFilePath = normalizeSlashes(configFileName);
    }
    return options;
}

function createDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile: LpcConfigSourceFile | undefined, node: Node | undefined, message: DiagnosticMessage, ...args: DiagnosticArguments) {
    return sourceFile && node ?
        createDiagnosticForNodeInSourceFile(sourceFile, node, message, ...args) :
        createCompilerDiagnostic(message, ...args);
}

function isCompilerOptionsValue(option: CommandLineOption | undefined, value: any): value is CompilerOptionsValue {
    if (option) {
        if (isNullOrUndefined(value)) return !option.disallowNullOrUndefined; // All options are undefinable/nullable
        if (option.type === "list") {
            return isArray(value);
        }
        if (option.type === "listOrElement") {
            return isArray(value) || isCompilerOptionsValue(option.element, value);
        }
        const expectedType = isString(option.type) ? option.type : "string";
        return typeof value === expectedType;
    }
    return false;
}

function convertJsonOptionOfListType(
    option: CommandLineOptionOfListType,
    values: readonly any[],
    basePath: string,
    errors: Diagnostic[],
    propertyAssignment: PropertyAssignment | undefined,
    valueExpression: ArrayLiteralExpression | undefined,
    sourceFile: LpcConfigSourceFile | undefined,
): any[] {
    return filter(map(values, (v, index) => convertJsonOption(option.element, v, basePath, errors, propertyAssignment, valueExpression?.elements[index], sourceFile)), v => option.listPreserveFalsyValues ? true : !!v);
}

function convertJsonOptionOfCustomType(
    opt: CommandLineOptionOfCustomType,
    value: string,
    errors: Diagnostic[],
    valueExpression?: Expression,
    sourceFile?: LpcConfigSourceFile,
) {
    if (isNullOrUndefined(value)) return undefined;
    const key = value.toLowerCase();
    const val = opt.type.get(key);
    if (val !== undefined) {
        return validateJsonOptionValue(opt, val, errors, valueExpression, sourceFile);
    }
    else {
        errors.push(createDiagnosticForInvalidCustomType(opt, (message, ...args) => createDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, valueExpression, message, ...args)));
    }
}

function createDiagnosticForInvalidCustomType(opt: CommandLineOptionOfCustomType, createDiagnostic: (message: DiagnosticMessage, ...args: DiagnosticArguments) => Diagnostic): Diagnostic {
    const namesOfType = arrayFrom(opt.type.keys());
    const stringNames = (opt.deprecatedKeys ? namesOfType.filter(k => !opt.deprecatedKeys!.has(k)) : namesOfType).map(key => `'${key}'`).join(", ");
    return createDiagnostic(Diagnostics.Argument_for_0_option_must_be_Colon_1, `--${opt.name}`, stringNames);
}


/** @internal */
export function convertJsonOption(
    opt: CommandLineOption,
    value: any,
    basePath: string,
    errors: Diagnostic[],
    propertyAssignment?: PropertyAssignment,
    valueExpression?: Expression,
    sourceFile?: LpcConfigSourceFile,
): CompilerOptionsValue {
    if (opt.isCommandLineOnly) {
        errors.push(createDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, propertyAssignment?.name, Diagnostics.Option_0_can_only_be_specified_on_command_line, opt.name));
        return undefined;
    }
    if (isCompilerOptionsValue(opt, value)) {
        const optType = opt.type;
        if ((optType === "list") && isArray(value)) {
            return convertJsonOptionOfListType(opt, value, basePath, errors, propertyAssignment, valueExpression as ArrayLiteralExpression | undefined, sourceFile);
        }
        else if (optType === "listOrElement") {
            return isArray(value) ?
                convertJsonOptionOfListType(opt, value, basePath, errors, propertyAssignment, valueExpression as ArrayLiteralExpression | undefined, sourceFile) :
                convertJsonOption(opt.element, value, basePath, errors, propertyAssignment, valueExpression, sourceFile);
        }
        else if (!isString(opt.type)) {
            return convertJsonOptionOfCustomType(opt as CommandLineOptionOfCustomType, value as string, errors, valueExpression, sourceFile);
        }
        const validatedValue = validateJsonOptionValue(opt, value, errors, valueExpression, sourceFile);
        return isNullOrUndefined(validatedValue) ? validatedValue : normalizeNonListOptionValue(opt, basePath, validatedValue);
    }
    else {
        errors.push(createDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, valueExpression, Diagnostics.Compiler_option_0_requires_a_value_of_type_1, opt.name, getCompilerOptionValueTypeString(opt)));
    }
}


function normalizeNonListOptionValue(option: CommandLineOption, basePath: string, value: any): CompilerOptionsValue {
    if (option.isFilePath) {
        value = normalizeSlashes(value);
        value = !startsWithConfigDirTemplate(value) ? getNormalizedAbsolutePath(value, basePath) : value;
        if (value === "") {
            value = ".";
        }
    }
    return value;
}


function validateJsonOptionValue<T extends CompilerOptionsValue>(
    opt: CommandLineOption,
    value: T,
    errors: Diagnostic[],
    valueExpression?: Expression,
    sourceFile?: LpcConfigSourceFile,
): T | undefined {
    if (isNullOrUndefined(value)) return undefined;
    const d = opt.extraValidation?.(value);
    if (!d) return value;
    errors.push(createDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, valueExpression, ...d));
    return undefined;
}

/** @internal */
export function setConfigFileInOptions(options: CompilerOptions, configFile: LpcConfigSourceFile | undefined) {
    if (configFile) {
        Object.defineProperty(options, "configFile", { enumerable: false, writable: false, value: configFile });
    }
}

function createUnknownOptionError(
    unknownOption: string,
    diagnostics: DidYouMeanOptionsDiagnostics,
    unknownOptionErrorText?: string,
    node?: PropertyName,
    sourceFile?: LpcConfigSourceFile,
) {
    if (diagnostics.alternateMode?.getOptionsNameMap().optionsNameMap.has(unknownOption.toLowerCase())) {
        return createDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, node, diagnostics.alternateMode.diagnostic, unknownOption);
    }

    const possibleOption = getSpellingSuggestion(unknownOption, diagnostics.optionDeclarations, getOptionName);
    return possibleOption ?
        createDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, node, diagnostics.unknownDidYouMeanDiagnostic, unknownOptionErrorText || unknownOption, possibleOption.name) :
        createDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, node, diagnostics.unknownOptionDiagnostic, unknownOptionErrorText || unknownOption);
}

const compilerOptionsDeclaration: LpcConfigOnlyOption = {
    name: "compilerOptions",
    type: "object",
    elementOptions: getCommandLineCompilerOptionsMap(),
    extraKeyDiagnostics: compilerOptionsDidYouMeanDiagnostics,
};

let _lpcconfigRootOptions: LpcConfigOnlyOption;
function getLpcConfigRootOptionsMap() {
    if (_lpcconfigRootOptions === undefined) {
        _lpcconfigRootOptions = {
            name: undefined!, // should never be needed since this is root
            type: "object",
            elementOptions: commandLineOptionsToMap([
                compilerOptionsDeclaration,
                // TODO 
                // watchOptionsDeclaration,
                // typeAcquisitionDeclaration,
                extendsOptionDeclaration,
                {
                    name: "references",
                    type: "list",
                    element: {
                        name: "references",
                        type: "object",
                    },
                    category: Diagnostics.Projects,
                },
                {
                    name: "files",
                    type: "list",
                    element: {
                        name: "files",
                        type: "string",
                    },
                    category: Diagnostics.File_Management,
                },
                {
                    name: "include",
                    type: "list",
                    element: {
                        name: "include",
                        type: "string",
                    },
                    category: Diagnostics.File_Management,
                    defaultValueDescription: Diagnostics.if_files_is_specified_otherwise_Asterisk_Asterisk_Slash_Asterisk,
                },
                {
                    name: "exclude",
                    type: "list",
                    element: {
                        name: "exclude",
                        type: "string",
                    },
                    category: Diagnostics.File_Management,
                    defaultValueDescription: Diagnostics.node_modules_bower_components_jspm_packages_plus_the_value_of_outDir_if_one_is_specified,
                },
                compileOnSaveCommandLineOption,
            ]),
        };
    }
    return _lpcconfigRootOptions;
}

function parseOwnConfigOfJsonSourceFile(
    sourceFile: LpcConfigSourceFile,
    host: ParseConfigHost,
    basePath: string,
    configFileName: string | undefined,
    errors: Diagnostic[],
): ParsedLpcConfig {
    const options = getDefaultCompilerOptions(configFileName);
    let typeAcquisition: TypeAcquisition | undefined;
    let watchOptions: WatchOptions | undefined;
    let extendedConfigPath: string | string[] | undefined;
    let rootCompilerOptions: PropertyName[] | undefined;

    const rootOptions = getLpcConfigRootOptionsMap();
    const json = convertConfigFileToObject(
        sourceFile,
        errors,
        { rootOptions, onPropertySet },
    );

    if (!typeAcquisition) {
        typeAcquisition = getDefaultTypeAcquisition(configFileName);
    }

    if (rootCompilerOptions && json && json.compilerOptions === undefined) {
        errors.push(createDiagnosticForNodeInSourceFile(sourceFile, rootCompilerOptions[0], Diagnostics._0_should_be_set_inside_the_compilerOptions_object_of_the_config_json_file, getTextOfPropertyName(rootCompilerOptions[0]) as string));
    }

    return { raw: json, options, watchOptions, typeAcquisition, extendedConfigPath };

    function onPropertySet(
        keyText: string,
        value: any,
        propertyAssignment: PropertyAssignment,
        parentOption: LpcConfigOnlyOption | undefined,
        option: CommandLineOption | undefined,
    ) {
        // Ensure value is verified except for extends which is handled in its own way for error reporting
        if (option && option !== extendsOptionDeclaration) value = convertJsonOption(option, value, basePath, errors, propertyAssignment, propertyAssignment.initializer, sourceFile);
        if (parentOption?.name) {
            if (option) {
                let currentOption;
                if (parentOption === compilerOptionsDeclaration) currentOption = options;
                // TODO
                // else if (parentOption === watchOptionsDeclaration) currentOption = watchOptions ??= {};
                // else if (parentOption === typeAcquisitionDeclaration) currentOption = typeAcquisition ??= getDefaultTypeAcquisition(configFileName);
                else Debug.fail("Unknown option");
                currentOption[option.name] = value;
            }
            else if (keyText && parentOption?.extraKeyDiagnostics) {
                if (parentOption.elementOptions) {
                    errors.push(createUnknownOptionError(
                        keyText,
                        parentOption.extraKeyDiagnostics,
                        /*unknownOptionErrorText*/ undefined,
                        propertyAssignment.name,
                        sourceFile,
                    ));
                }
                else {
                    errors.push(createDiagnosticForNodeInSourceFile(sourceFile, propertyAssignment.name, parentOption.extraKeyDiagnostics.unknownOptionDiagnostic, keyText));
                }
            }
        }
        else if (parentOption === rootOptions) {
            if (option === extendsOptionDeclaration) {
                extendedConfigPath = getExtendsConfigPathOrArray(value, host, basePath, configFileName, errors, propertyAssignment, propertyAssignment.initializer, sourceFile);
            }
            else if (!option) {
                if (keyText === "excludes") {
                    errors.push(createDiagnosticForNodeInSourceFile(sourceFile, propertyAssignment.name, Diagnostics.Unknown_option_excludes_Did_you_mean_exclude));
                }                
                if (find(commandOptionsWithoutBuild, opt => opt.name === keyText)) {
                    rootCompilerOptions = append(rootCompilerOptions, propertyAssignment.name);
                }
            }
        }
    }
}

function convertConfigFileToObject(
    sourceFile: JsonSourceFile,
    errors: Diagnostic[],
    jsonConversionNotifier: JsonConversionNotifier | undefined,
): any {
    const rootExpression: Expression | undefined = sourceFile.statements[0]?.expression;
    if (rootExpression && rootExpression.kind !== SyntaxKind.ObjectLiteralExpression) {
        errors.push(createDiagnosticForNodeInSourceFile(
            sourceFile,
            rootExpression,
            Diagnostics.The_root_value_of_a_0_file_must_be_an_object,
            getBaseFileName(sourceFile.fileName) === "jsconfig.json" ? "jsconfig.json" : "tsconfig.json",
        ));
        // Last-ditch error recovery. Somewhat useful because the JSON parser will recover from some parse errors by
        // synthesizing a top-level array literal expression. There's a reasonable chance the first element of that
        // array is a well-formed configuration object, made into an array element by stray characters.
        if (isArrayLiteralExpression(rootExpression)) {
            const firstObject = find(rootExpression.elements, isObjectLiteralExpression);
            if (firstObject) {
                return convertToJson(sourceFile, firstObject, errors, /*returnValue*/ true, jsonConversionNotifier);
            }
        }
        return {};
    }
    return convertToJson(sourceFile, rootExpression, errors, /*returnValue*/ true, jsonConversionNotifier);
}

function shouldReportNoInputFiles(fileNames: string[], canJsonReportNoInutFiles: boolean, resolutionStack?: Path[]) {
    return fileNames.length === 0 && canJsonReportNoInutFiles && (!resolutionStack || resolutionStack.length === 0);
}

/** @internal */
export function canJsonReportNoInputFiles(raw: any) {
    return !hasProperty(raw, "files") && !hasProperty(raw, "references");
}

function getErrorForNoInputFiles({ includeSpecs, excludeSpecs }: ConfigFileSpecs, configFileName: string | undefined) {
    return createCompilerDiagnostic(
        Diagnostics.No_inputs_were_found_in_config_file_0_Specified_include_paths_were_1_and_exclude_paths_were_2,
        configFileName || "lpc-config.json",
        JSON.stringify(includeSpecs || []),
        JSON.stringify(excludeSpecs || []),
    );
}

/**
 * Parse the contents of a config file (tsconfig.json).
 * @param jsonNode The contents of the config file to parse
 * @param host Instance of ParseConfigHost used to enumerate files in folder.
 * @param basePath A root directory to resolve relative path entries in the config
 *    file to. e.g. outDir
 */
export function parseJsonSourceFileConfigFileContent(sourceFile: LpcConfigSourceFile, host: ParseConfigHost, basePath: string, existingOptions?: CompilerOptions, configFileName?: string, resolutionStack?: Path[], extraFileExtensions?: readonly FileExtensionInfo[], extendedConfigCache?: Map<string, ExtendedConfigCacheEntry>, existingWatchOptions?: WatchOptions): ParsedCommandLine {
    tracing?.push(tracing.Phase.Parse, "parseJsonSourceFileConfigFileContent", { path: sourceFile.fileName });
    const result = parseJsonConfigFileContentWorker(/*json*/ undefined, sourceFile, host, basePath, existingOptions, existingWatchOptions, configFileName, resolutionStack, extraFileExtensions, extendedConfigCache);
    tracing?.pop();
    return result;
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
function parseJsonConfigFileContentWorker(
    json: any,
    sourceFile: LpcConfigSourceFile | undefined,
    host: ParseConfigHost,
    basePath: string,
    existingOptions: CompilerOptions = {},
    existingWatchOptions: WatchOptions | undefined,
    configFileName?: string,
    resolutionStack: Path[] = [],
    extraFileExtensions: readonly FileExtensionInfo[] = [],
    extendedConfigCache?: Map<string, ExtendedConfigCacheEntry>,
): ParsedCommandLine {
    Debug.assert((json === undefined && sourceFile !== undefined) || (json !== undefined && sourceFile === undefined));
    const errors: Diagnostic[] = [];

    const parsedConfig = parseConfig(json, sourceFile, host, basePath, configFileName, resolutionStack, errors, extendedConfigCache);
    const { raw } = parsedConfig;
    const options = existingOptions;
    // options = handleOptionConfigDirTemplateSubstitution(
    //     extend(existingOptions, parsedConfig.options || {}),
    //     configDirTemplateSubstitutionOptions,
    //     basePath,
    // ) as CompilerOptions;
    const watchOptions = existingWatchOptions;
    // const watchOptions = handleWatchOptionsConfigDirTemplateSubstitution(
    //     existingWatchOptions && parsedConfig.watchOptions ?
    //         extend(existingWatchOptions, parsedConfig.watchOptions) :
    //         parsedConfig.watchOptions || existingWatchOptions,
    //     basePath,
    // );
    options.configFilePath = configFileName && normalizeSlashes(configFileName);
    const basePathForFileNames = normalizePath(configFileName ? directoryOfCombinedPath(configFileName, basePath) : basePath);
    const configFileSpecs = getConfigFileSpecs();
    if (sourceFile) sourceFile.configFileSpecs = configFileSpecs;
    setConfigFileInOptions(options, sourceFile);

    return {
        options,
        watchOptions,
        fileNames: getFileNames(basePathForFileNames),
        projectReferences: getProjectReferences(basePathForFileNames),
        typeAcquisition: parsedConfig.typeAcquisition || getDefaultTypeAcquisition(),
        raw,
        errors,
        // Wildcard directories (provided as part of a wildcard path) are stored in a
        // file map that marks whether it was a regular wildcard match (with a `*` or `?` token),
        // or a recursive directory. This information is used by filesystem watchers to monitor for
        // new entries in these paths.
        wildcardDirectories: getWildcardDirectories(configFileSpecs, basePathForFileNames, host.useCaseSensitiveFileNames),
        compileOnSave: !!raw.compileOnSave,
    };

    function getConfigFileSpecs(): ConfigFileSpecs {
        const referencesOfRaw = getPropFromRaw<ProjectReference>("references", element => typeof element === "object", "object");
        const filesSpecs = toPropValue(getSpecsFromRaw("files"));
        if (filesSpecs) {
            const hasZeroOrNoReferences = referencesOfRaw === "no-prop" || isArray(referencesOfRaw) && referencesOfRaw.length === 0;
            const hasExtends = hasProperty(raw, "extends");
            if (filesSpecs.length === 0 && hasZeroOrNoReferences && !hasExtends) {
                if (sourceFile) {
                    const fileName = configFileName || "tsconfig.json";
                    const diagnosticMessage = Diagnostics.The_files_list_in_config_file_0_is_empty;
                    const nodeValue = forEachLpcConfigPropArray(sourceFile, "files", property => property.initializer);
                    const error = createDiagnosticForNodeInSourceFileOrCompilerDiagnostic(sourceFile, nodeValue, diagnosticMessage, fileName);
                    errors.push(error);
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
        if (excludeOfRaw === "no-prop") {
            const outDir = options.outDir;
            const declarationDir = options.declarationDir;

            if (outDir || declarationDir) {
                excludeSpecs = filter([outDir, declarationDir], d => !!d) as string[];
            }
        }

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
        if (shouldReportNoInputFiles(fileNames, canJsonReportNoInputFiles(raw), resolutionStack)) {
            errors.push(getErrorForNoInputFiles(configFileSpecs, configFileName));
        }
        return fileNames;
    }

    function getProjectReferences(basePath: string): readonly ProjectReference[] | undefined {
        let projectReferences: ProjectReference[] | undefined;
        const referencesOfRaw = getPropFromRaw<ProjectReference>("references", element => typeof element === "object", "object");
        if (isArray(referencesOfRaw)) {
            for (const ref of referencesOfRaw) {
                if (typeof ref.path !== "string") {
                    createCompilerDiagnosticOnlyIfJson(Diagnostics.Compiler_option_0_requires_a_value_of_type_1, "reference.path", "string");
                }
                else {
                    (projectReferences || (projectReferences = [])).push({
                        path: getNormalizedAbsolutePath(ref.path, basePath),
                        originalPath: ref.path,
                        prepend: ref.prepend,
                        circular: ref.circular,
                    });
                }
            }
        }
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
 * Reports config file diagnostics
 */
export interface ConfigFileDiagnosticsReporter {
    /**
     * Reports unrecoverable error when parsing config file
     */
    onUnRecoverableConfigFileDiagnostic: DiagnosticReporter;
}

/**
 * Interface extending ParseConfigHost to support ParseConfigFile that reads config file and reports errors
 */
export interface ParseConfigFileHost extends ParseConfigHost, ConfigFileDiagnosticsReporter {
    getCurrentDirectory(): string;
}

/** @internal */
export const configDirTemplateSubstitutionOptions: readonly CommandLineOption[] = optionDeclarations.filter(
    option => option.allowConfigDirTemplateSubstitution || (!option.isCommandLineOnly && option.isFilePath),
);

/** @internal */
export const optionsAffectingProgramStructure: readonly CommandLineOption[] = optionDeclarations.filter(option => !!option.affectsProgramStructure);

/** @internal */
export const typeAcquisitionDeclarations: CommandLineOption[] = [
    {
        name: "enable",
        type: "boolean",
        defaultValueDescription: false,
    },
    {
        name: "include",
        type: "list",
        element: {
            name: "include",
            type: "string",
        },
    },
    {
        name: "exclude",
        type: "list",
        element: {
            name: "exclude",
            type: "string",
        },
    },
    {
        name: "disableFilenameBasedTypeAcquisition",
        type: "boolean",
        defaultValueDescription: false,
    },
];

function isErrorNoInputFiles(error: Diagnostic) {
    return error.code === Diagnostics.No_inputs_were_found_in_config_file_0_Specified_include_paths_were_1_and_exclude_paths_were_2.code;
}

/** @internal */
export function updateErrorForNoInputFiles(fileNames: string[], configFileName: string, configFileSpecs: ConfigFileSpecs, configParseDiagnostics: Diagnostic[], canJsonReportNoInutFiles: boolean) {
    const existingErrors = configParseDiagnostics.length;
    if (shouldReportNoInputFiles(fileNames, canJsonReportNoInutFiles)) {
        configParseDiagnostics.push(getErrorForNoInputFiles(configFileSpecs, configFileName));
    }
    else {
        filterMutate(configParseDiagnostics, error => !isErrorNoInputFiles(error));
    }
    return existingErrors !== configParseDiagnostics.length;
}

/** @internal */
export function getDiagnosticText(message: DiagnosticMessage, ...args: any[]): string {
    return cast(createCompilerDiagnostic(message, ...args).messageText, isString);
}

/**
 * Reads the config file, reports errors if any and exits if the config file cannot be found
 */
export function getParsedCommandLineOfConfigFile(
    configFileName: string,
    optionsToExtend: CompilerOptions | undefined,
    host: ParseConfigFileHost,
    extendedConfigCache?: Map<string, ExtendedConfigCacheEntry>,
    watchOptionsToExtend?: WatchOptions,
    extraFileExtensions?: readonly FileExtensionInfo[],
): ParsedCommandLine | undefined {
    const configFileText = tryReadFile(configFileName, fileName => host.readFile(fileName));
    if (!isString(configFileText)) {
        host.onUnRecoverableConfigFileDiagnostic(configFileText);
        return undefined;
    }

    const result = parseJsonText(configFileName, configFileText);
    const cwd = host.getCurrentDirectory();
    result.path = toPath(configFileName, cwd, createGetCanonicalFileName(host.useCaseSensitiveFileNames));
    result.resolvedPath = result.path;
    result.originalFileName = result.fileName;
    return parseJsonSourceFileConfigFileContent(
        result,
        host,
        getNormalizedAbsolutePath(getDirectoryPath(configFileName), cwd),
        optionsToExtend,
        getNormalizedAbsolutePath(configFileName, cwd),
        /*resolutionStack*/ undefined,
        extraFileExtensions,
        extendedConfigCache,
        watchOptionsToExtend,
    );
}
