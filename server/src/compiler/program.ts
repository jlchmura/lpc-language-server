import { writeFile } from "fs";
import { ILpcConfig } from "../config-types.js";
import { getDeclarationDiagnostics as lpc_getDeclarationDiagnostics, forEachResolvedProjectReference as lpc_forEachResolvedProjectReference, combinePaths, compareValues, CompilerHost, CompilerOptions, containsPath, createDiagnosticCollection, createGetCanonicalFileName, createMultiMap, CreateProgramOptions, createSourceFile, Diagnostic, DiagnosticArguments, DiagnosticMessage, Diagnostics, DiagnosticWithLocation, FileIncludeKind, FileIncludeReason, FilePreprocessingDiagnostics, FilePreprocessingDiagnosticsKind, forEach, getBaseFileName, getDirectoryPath, getNewLineCharacter, getRootLength, hasExtension, isArray, maybeBind, memoize, normalizePath, ObjectLiteralExpression, PackageId, Path, performance, Program, ProgramHost, ProjectReference, PropertyAssignment, ReferencedFile, removePrefix, removeSuffix, ResolvedModuleWithFailedLookupLocations, ResolvedProjectReference, SourceFile, stableSort, StructureIsReused, sys, System, toPath as lpc_toPath, tracing, TypeChecker, getNormalizedAbsolutePathWithoutRoot, some, isRootedDiskPath, optionsHaveChanges, packageIdToString, toFileNameLowerCase, getNormalizedAbsolutePath, CreateSourceFileOptions, createTypeChecker, ScriptTarget, libs, FileReference, SortedReadonlyArray, concatenate, sortAndDeduplicateDiagnostics, emptyArray, LpcFileHandler, createLpcFileHandler, DiagnosticMessageChain, isString, CancellationToken, flatMap, filter, Debug, ScriptKind, flatten, OperationCanceledException, noop, getNormalizedPathComponents, GetCanonicalFileName, getPathFromPathComponents, WriteFileCallback, EmitHost, WriteFileCallbackData, getDefaultLibFileName, LibResolution, returnFalse, isTraceEnabled, trace, equateStringsCaseSensitive, equateStringsCaseInsensitive, NodeFlags, ResolvedModuleFull, Extension, ResolutionMode, ModeAwareCache } from "./_namespaces/lpc.js";

/**
 * Create a new 'Program' instance. A Program is an immutable collection of 'SourceFile's and a 'CompilerOptions'
 * that represent a compilation unit.
 *
 * Creating a program proceeds from a set of root files, expanding the set of inputs by following imports and
 * triple-slash-reference-path directives transitively. '@types' and triple-slash-reference-types are also pulled in.
 *
 * @param createProgramOptions - The options for creating a program.
 * @returns A 'Program' object.
 */
export function createProgram(createProgramOptions: CreateProgramOptions): Program;
/**
 * Create a new 'Program' instance. A Program is an immutable collection of 'SourceFile's and a 'CompilerOptions'
 * that represent a compilation unit.
 *
 * Creating a program proceeds from a set of root files, expanding the set of inputs by following imports and
 * triple-slash-reference-path directives transitively. '@types' and triple-slash-reference-types are also pulled in.
 *
 * @param rootNames - A set of root files.
 * @param options - The compiler options which should be used.
 * @param host - The host interacts with the underlying file system.
 * @param oldProgram - Reuses an old program structure.
 * @param configFileParsingDiagnostics - error during config file parsing
 * @returns A 'Program' object.
 */
export function createProgram(rootNames: readonly string[], options: CompilerOptions, host?: CompilerHost, oldProgram?: Program, configFileParsingDiagnostics?: readonly Diagnostic[]): Program;
export function createProgram(rootNamesOrOptions: readonly string[] | CreateProgramOptions, _options?: CompilerOptions, _host?: CompilerHost, _oldProgram?: Program, _configFileParsingDiagnostics?: readonly Diagnostic[]): Program {
    const createProgramOptions = isArray(rootNamesOrOptions) ? createCreateProgramOptions(rootNamesOrOptions, _options!, _host, _oldProgram, _configFileParsingDiagnostics) : rootNamesOrOptions; // TODO: GH#18217
    const { rootNames, options, configFileParsingDiagnostics, projectReferences, typeScriptVersion } = createProgramOptions;
    let { oldProgram } = createProgramOptions;
    
    // const host = createProgramOptions.host || createCompilerHost(options);
    // const readFile = host.readFile.bind(host) as typeof host.readFile;

    let processingDefaultLibFiles: SourceFile[] | undefined;
    let processingOtherFiles: SourceFile[] | undefined;
    let files: SourceFile[];
    //let symlinks: SymlinkCache | undefined;
    let commonSourceDirectory: string;
    let typeChecker: TypeChecker;
    let classifiableNames: Set<string>;
    const ambientModuleNameToUnmodifiedFileName = new Map<string, string>();
    let fileReasons = createMultiMap<Path, FileIncludeReason>();
    let filesWithReferencesProcessed: Set<Path> | undefined;
    //let fileReasonsToChain: Map<Path, FileReasonToChainCache> | undefined;
    let reasonToRelatedInfo: Map<FileIncludeReason, DiagnosticWithLocation | false> | undefined;
    const cachedBindAndCheckDiagnosticsForFile: DiagnosticCache<Diagnostic> = {};
    const cachedDeclarationDiagnosticsForFile: DiagnosticCache<DiagnosticWithLocation> = {};

    let fileProcessingDiagnostics: FilePreprocessingDiagnostics[] | undefined;
    let automaticTypeDirectiveNames: string[] | undefined;
    //let automaticTypeDirectiveResolutions: ModeAwareCache<ResolvedTypeReferenceDirectiveWithFailedLookupLocations>;

    let resolvedLibReferences: Map<string, LibResolution> | undefined;
    let resolvedLibProcessing: Map<string, LibResolution> | undefined;

    let resolvedModules: Map<Path, ModeAwareCache<ResolvedModuleWithFailedLookupLocations>> | undefined;
    let resolvedModulesProcessing: Map<Path, readonly ResolvedModuleWithFailedLookupLocations[]> | undefined;
    // let resolvedTypeReferenceDirectiveNames: Map<Path, ModeAwareCache<ResolvedTypeReferenceDirectiveWithFailedLookupLocations>> | undefined;
    // let resolvedTypeReferenceDirectiveNamesProcessing: Map<Path, readonly ResolvedTypeReferenceDirectiveWithFailedLookupLocations[]> | undefined;

    let packageMap: Map<string, boolean> | undefined;

    // The below settings are to track if a .js file should be add to the program if loaded via searching under node_modules.
    // This works as imported modules are discovered recursively in a depth first manner, specifically:
    // - For each root file, findSourceFile is called.
    // - This calls processImportedModules for each module imported in the source file.
    // - This calls resolveModuleNames, and then calls findSourceFile for each resolved module.
    // As all these operations happen - and are nested - within the createProgram call, they close over the below variables.
    // The current resolution depth is tracked by incrementing/decrementing as the depth first search progresses.
    const maxNodeModuleJsDepth = typeof options.maxNodeModuleJsDepth === "number" ? options.maxNodeModuleJsDepth : 0;
    let currentNodeModulesDepth = 0;

    // If a module has some of its imports skipped due to being at the depth limit under node_modules, then track
    // this, as it may be imported at a shallower depth later, and then it will need its skipped imports processed.
    const modulesWithElidedImports = new Map<string, boolean>();

    // Track source files that are source files found by searching under node_modules, as these shouldn't be compiled.
    const sourceFilesFoundSearchingNodeModules = new Map<string, boolean>();

    //tracing?.push(tracing.Phase.Program, "createProgram", { configFilePath: options.configFilePath, rootDir: options.rootDir }, /*separateBeginAndEnd*/ true);
    performance.mark("beforeProgram");

    const host = createProgramOptions.host || createCompilerHost(options);
    //const configParsingHost = parseConfigHostFromCompilerHostLike(host);

    //let skipDefaultLib = options.noLib;
    // const getDefaultLibraryFileName = memoize(() => host.getDefaultLibFileName(options));
    const defaultLibraryPath = "TODO";//host.getDefaultLibLocation ? host.getDefaultLibLocation() : getDirectoryPath(getDefaultLibraryFileName());
    /**
     * Diagnostics for the program
     * Only add diagnostics directly if it always would be done irrespective of program structure reuse.
     * Otherwise fileProcessingDiagnostics is correct locations so that the diagnostics can be reported in all structure use scenarios
     */
    const programDiagnostics = createDiagnosticCollection();
    let lazyProgramDiagnosticExplainingFile: LazyProgramDiagnosticExplainingFile[] | undefined = [];
    const currentDirectory = host.getCurrentDirectory();
    // const supportedExtensions = getSupportedExtensions(options);
    // const supportedExtensionsWithJsonIfResolveJsonModule = getSupportedExtensionsWithJsonIfResolveJsonModule(options, supportedExtensions);

    // Map storing if there is emit blocking diagnostics for given input
    const hasEmitBlockingDiagnostics = new Map<string, boolean>();
    let _compilerOptionsObjectLiteralSyntax: ObjectLiteralExpression | false | undefined;
    let _compilerOptionsPropertySyntax: PropertyAssignment | false | undefined;
    
    let skipDefaultLib = options.noLib;
    const getDefaultLibraryFileName = memoize(() => host.getDefaultLibFileName(options));

    /**
     * map with
     * - SourceFile if present
     * - false if sourceFile missing for source of project reference redirect
     * - undefined otherwise
     */
    const filesByName = new Map<Path, SourceFile | false | undefined>();
    let missingFileNames = new Map<Path, string>();
    // stores 'filename -> file association' ignoring case
    // used to track cases when two file names differ only in casing
    const filesByNameIgnoreCase = host.useCaseSensitiveFileNames() ? new Map<string, SourceFile>() : undefined;    
    // Key is a file name. Value is the (non-empty, or undefined) list of files that redirect to it.
    let redirectTargetsMap = createMultiMap<Path, string>();

    // A parallel array to projectReferences storing the results of reading in the referenced tsconfig files
    let resolvedProjectReferences: readonly (ResolvedProjectReference | undefined)[] | undefined;
    let projectReferenceRedirects: Map<Path, ResolvedProjectReference | false> | undefined;
    let mapFromFileToProjectReferenceRedirects: Map<Path, Path> | undefined;
    //let mapFromToProjectReferenceRedirectSource: Map<Path, SourceOfProjectReferenceRedirect> | undefined;

    const { fileExists, directoryExists } = host;
    const readFile = host.readFile.bind(host) as typeof host.readFile;
    const shouldCreateNewSourceFile = shouldProgramCreateNewSourceFiles(oldProgram, options);
    
    const hasInvalidatedLibResolutions = host.hasInvalidatedLibResolutions || returnFalse;
    let actualResolveLibrary: (libraryName: string, resolveFrom: string, options: CompilerOptions, libFileName: string) => ResolvedModuleWithFailedLookupLocations;
    
    // We set `structuralIsReused` to `undefined` because `tryReuseStructureFromOldProgram` calls `tryReuseStructureFromOldProgram` which checks
    // `structuralIsReused`, which would be a TDZ violation if it was not set in advance to `undefined`.
    let structureIsReused: StructureIsReused;
    tracing?.push(tracing.Phase.Program, "tryReuseStructureFromOldProgram", {});
    structureIsReused = tryReuseStructureFromOldProgram();
    tracing?.pop();

    if (structureIsReused !== StructureIsReused.Completely) {
        processingDefaultLibFiles = [];
        processingOtherFiles = [];

        if (projectReferences) {
            if (!resolvedProjectReferences) {
                resolvedProjectReferences = projectReferences.map(parseProjectReferenceConfigFile);
            }
            if (rootNames.length) {
                // TODO
                // resolvedProjectReferences?.forEach((parsedRef, index) => {
                //     if (!parsedRef) return;
                //     const out = parsedRef.commandLine.options.outFile;
                //     if (useSourceOfProjectReferenceRedirect) {
                //         if (out || getEmitModuleKind(parsedRef.commandLine.options) === ModuleKind.None) {
                //             for (const fileName of parsedRef.commandLine.fileNames) {
                //                 processProjectReferenceFile(fileName, { kind: FileIncludeKind.SourceFromProjectReference, index });
                //             }
                //         }
                //     }
                //     else {
                //         if (out) {
                //             processProjectReferenceFile(changeExtension(out, ".d.ts"), { kind: FileIncludeKind.OutputFromProjectReference, index });
                //         }
                //         else if (getEmitModuleKind(parsedRef.commandLine.options) === ModuleKind.None) {
                //             const getCommonSourceDirectory = memoize(() => getCommonSourceDirectoryOfConfig(parsedRef.commandLine, !host.useCaseSensitiveFileNames()));
                //             for (const fileName of parsedRef.commandLine.fileNames) {
                //                 if (!isDeclarationFileName(fileName) && !fileExtensionIs(fileName, Extension.Json)) {
                //                     processProjectReferenceFile(getOutputDeclarationFileName(fileName, parsedRef.commandLine, !host.useCaseSensitiveFileNames(), getCommonSourceDirectory), { kind: FileIncludeKind.OutputFromProjectReference, index });
                //                 }
                //             }
                //         }
                //     }
                // });
            }
        }

        tracing?.push(tracing.Phase.Program, "processRootFiles", { count: rootNames.length });
        forEach(rootNames, (name, index) => processRootFile(name, /*isDefaultLib*/ false, /*ignoreNoDefaultLib*/ false, { kind: FileIncludeKind.RootFile, index }));
        tracing?.pop();
        
        // Do not process the default library if:
        //  - The '--noLib' flag is used.
        //  - A 'no-default-lib' reference comment is encountered in
        //      processing the root files.
        if (rootNames.length && !skipDefaultLib) {
            // If '--lib' is not specified, include default library file according to '--target'
            // otherwise, using options specified in '--lib' instead of '--target' default library file
            const defaultLibraryFileName = getDefaultLibraryFileName();
            if (!options.lib && defaultLibraryFileName) {
                processRootFile(defaultLibraryFileName, /*isDefaultLib*/ true, /*ignoreNoDefaultLib*/ false, { kind: FileIncludeKind.LibFile });
            }
            else {
                forEach(options.lib, (libFileName, index) => {
                    processRootFile(pathForLibFile(libFileName), /*isDefaultLib*/ true, /*ignoreNoDefaultLib*/ false, { kind: FileIncludeKind.LibFile, index });
                });
            }
        }
        
        files = stableSort(processingDefaultLibFiles, compareDefaultLibFiles).concat(processingOtherFiles);
        processingDefaultLibFiles = undefined;
        processingOtherFiles = undefined;
        filesWithReferencesProcessed = undefined;
    }

    // Release any files we have acquired in the old program but are
    // not part of the new program.
    if (oldProgram && host.onReleaseOldSourceFile) {
        const oldSourceFiles = oldProgram.getSourceFiles();
        for (const oldSourceFile of oldSourceFiles) {
            const newFile = getSourceFileByPath(oldSourceFile.resolvedPath);
            if (
                shouldCreateNewSourceFile || !newFile || //newFile.impliedNodeFormat !== oldSourceFile.impliedNodeFormat ||
                // old file wasn't redirect but new file is
                (oldSourceFile.resolvedPath === oldSourceFile.path && newFile.resolvedPath !== oldSourceFile.path)
            ) {
                host.onReleaseOldSourceFile(oldSourceFile, oldProgram.getCompilerOptions(), !!getSourceFileByPath(oldSourceFile.path), newFile);
            }
        }
        if (!host.getParsedCommandLine) {
            oldProgram.forEachResolvedProjectReference(resolvedProjectReference => {
                if (!getResolvedProjectReferenceByPath(resolvedProjectReference.sourceFile.path)) {
                    host.onReleaseOldSourceFile!(resolvedProjectReference.sourceFile, oldProgram!.getCompilerOptions(), /*hasSourceFileByPath*/ false, /*newSourceFileByResolvedPath*/ undefined);
                }
            });
        }
    }

    // Release commandlines that new program does not use
    // if (oldProgram && host.onReleaseParsedCommandLine) {
    //     forEachProjectReference(
    //         oldProgram.getProjectReferences(),
    //         oldProgram.getResolvedProjectReferences(),
    //         (oldResolvedRef, parent, index) => {
    //             const oldReference = parent?.commandLine.projectReferences![index] || oldProgram!.getProjectReferences()![index];
    //             const oldRefPath = resolveProjectReferencePath(oldReference);
    //             if (!projectReferenceRedirects?.has(toPath(oldRefPath))) {
    //                 host.onReleaseParsedCommandLine!(oldRefPath, oldResolvedRef, oldProgram!.getCompilerOptions());
    //             }
    //         },
    //     );
    // }

    // unconditionally set oldProgram to undefined to prevent it from being captured in closure
    oldProgram = undefined;
    //resolvedLibProcessing = undefined;
    resolvedModulesProcessing = undefined;
    //resolvedTypeReferenceDirectiveNamesProcessing = undefined;

    const program: Program = {
        getRootFileNames: () => rootNames,
        getSourceFile,
        getSourceFileByPath,
        getSourceFiles: () => files,
        getMissingFilePaths: () => missingFileNames,
        getModuleResolutionCache: () => undefined,
        getFilesByNameMap: () => filesByName,
        getCompilerOptions: () => options,
        getSyntacticDiagnostics,
        getOptionsDiagnostics,
        getGlobalDiagnostics,
        getSemanticDiagnostics,
        // getCachedSemanticDiagnostics,
        // getSuggestionDiagnostics,
        getDeclarationDiagnostics,
        // getBindAndCheckDiagnostics,
        // getProgramDiagnostics,
        getTypeChecker,
        // getClassifiableNames,
        getCommonSourceDirectory: ()=>currentDirectory,
        // emit,
        getCurrentDirectory: () => currentDirectory,
        getNodeCount: () => getTypeChecker().getNodeCount(),
        getIdentifierCount: () => getTypeChecker().getIdentifierCount(),
        getSymbolCount: () => getTypeChecker().getSymbolCount(),
        getTypeCount: () => getTypeChecker().getTypeCount(),
        getInstantiationCount: () => getTypeChecker().getInstantiationCount(),
        //getRelationCacheSizes: () => getTypeChecker().getRelationCacheSizes(),
        getFileProcessingDiagnostics: () => fileProcessingDiagnostics,
        // getAutomaticTypeDirectiveNames: () => automaticTypeDirectiveNames!,
        // getAutomaticTypeDirectiveResolutions: () => automaticTypeDirectiveResolutions,
        // isSourceFileFromExternalLibrary,
        isSourceFileDefaultLibrary,
        // getModeForUsageLocation,
        // getModeForResolutionAtIndex,
        getSourceFileFromReference,
        // getLibFileFromReference,
        // sourceFileToPackageName,
        // redirectTargetsMap,
        // usesUriStyleNodeCoreModules,
        // resolvedModules,
        // resolvedTypeReferenceDirectiveNames,
        resolvedLibReferences,
        getResolvedModule,
        // getResolvedModuleFromModuleSpecifier,
        // getResolvedTypeReferenceDirective,
        // getResolvedTypeReferenceDirectiveFromTypeReferenceDirective,
        // forEachResolvedModule,
        // forEachResolvedTypeReferenceDirective,
        // getCurrentPackagesMap: () => packageMap,
        // typesPackageExists,
        // packageBundlesTypes,
        // isEmittedFile,
        // getConfigFileParsingDiagnostics,
        // getProjectReferences,
        // getResolvedProjectReferences,
        // getProjectReferenceRedirect,
        // getResolvedProjectReferenceToRedirect,
        getResolvedProjectReferenceByPath,
        forEachResolvedProjectReference,
        // isSourceOfProjectReferenceRedirect,
        // getRedirectReferenceForResolutionFromSourceOfProject,
        // emitBuildInfo,
        fileExists,
        readFile,
        directoryExists,
        // getSymlinkCache,
        realpath: host.realpath?.bind(host),
        useCaseSensitiveFileNames: () => host.useCaseSensitiveFileNames(),
        getCanonicalFileName,
        getFileIncludeReasons: () => fileReasons,
        structureIsReused,
        // writeFile,
    };

    //onProgramCreateComplete();

    //verifyCompilerOptions();
    performance.mark("afterProgram");
    performance.measure("Program", "beforeProgram", "afterProgram");
    tracing?.pop();

    return program;

    function getSourceFile(fileName: string): SourceFile | undefined {
        return getSourceFileByPath(toPath(fileName));
    }

    function isSourceFileDefaultLibrary(file: SourceFile): boolean {
        if (!file.isDeclarationFile) {
            return false;
        }

        if (file.hasNoDefaultLib) {
            return true;
        }

        if (!options.noLib) {
            return false;
        }

        // If '--lib' is not specified, include default library file according to '--target'
        // otherwise, using options specified in '--lib' instead of '--target' default library file
        const equalityComparer = host.useCaseSensitiveFileNames() ? equateStringsCaseSensitive : equateStringsCaseInsensitive;
        if (!options.lib) {
            return equalityComparer(file.fileName, getDefaultLibraryFileName());
        }
        else {
            return some(options.lib, libFileName => equalityComparer(file.fileName, resolvedLibReferences!.get(libFileName)!.actual));
        }
    }
    
    function getTypeChecker() {
        return typeChecker || (typeChecker = createTypeChecker(program));
    }

    function getSyntacticDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly DiagnosticWithLocation[] {
        return getDiagnosticsHelper(sourceFile, getSyntacticDiagnosticsForFile, cancellationToken);
    }

    function getSemanticDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly Diagnostic[] {
        return getDiagnosticsHelper(sourceFile, getSemanticDiagnosticsForFile, cancellationToken);
    }

    function getSemanticDiagnosticsForFile(sourceFile: SourceFile, cancellationToken: CancellationToken | undefined): readonly Diagnostic[] {
        return concatenate(
            filterSemanticDiagnostics(getBindAndCheckDiagnosticsForFile(sourceFile, cancellationToken), options),
            getProgramDiagnostics(sourceFile),
        );
    }
    
    function getSyntacticDiagnosticsForFile(sourceFile: SourceFile): readonly DiagnosticWithLocation[] {
        // For JavaScript files, we report semantic errors for using TypeScript-only
        // constructs from within a JavaScript file as syntactic errors.
        // if (isSourceFileJS(sourceFile)) {
        //     if (!sourceFile.additionalSyntacticDiagnostics) {
        //         sourceFile.additionalSyntacticDiagnostics = getJSSyntacticDiagnosticsForFile(sourceFile);
        //     }
        //     return concatenate(sourceFile.additionalSyntacticDiagnostics, sourceFile.parseDiagnostics);
        // }
        return sourceFile.parseDiagnostics;
    }

    function getBindAndCheckDiagnosticsForFile(sourceFile: SourceFile, cancellationToken: CancellationToken | undefined): readonly Diagnostic[] {
        return getAndCacheDiagnostics(sourceFile, cancellationToken, cachedBindAndCheckDiagnosticsForFile, getBindAndCheckDiagnosticsForFileNoCache);
    }

    function getResolvedModule(file: SourceFile, moduleName: string, mode: ResolutionMode) {
        return resolvedModules?.get(file.path)?.get(moduleName, mode);
    }

    function getProgramDiagnostics(sourceFile: SourceFile): readonly Diagnostic[] {
        // if (skipTypeChecking(sourceFile, options, program)) {
        //     return emptyArray;
        // }

        const programDiagnosticsInFile = updateAndGetProgramDiagnostics().getDiagnostics(sourceFile.fileName);
        // if (!sourceFile.commentDirectives?.length) {
        //     return programDiagnosticsInFile;
        // }

        // TODO 
        //return getDiagnosticsWithPrecedingDirectives(sourceFile, sourceFile.commentDirectives, programDiagnosticsInFile).diagnostics;
        return programDiagnosticsInFile;
    }

    function pathForLibFile(libFileName: string): string {
        const existing = resolvedLibReferences?.get(libFileName);
        if (existing) return existing.actual;
        const result = pathForLibFileWorker(libFileName);
        (resolvedLibReferences ??= new Map()).set(libFileName, result);
        return result.actual;
    }

    function pathForLibFileWorker(libFileName: string): LibResolution {
        const existing = resolvedLibProcessing?.get(libFileName);
        if (existing) return existing;

        if (structureIsReused !== StructureIsReused.Not && oldProgram && !hasInvalidatedLibResolutions(libFileName)) {
            const oldResolution = oldProgram.resolvedLibReferences?.get(libFileName);
            if (oldResolution) {
                if (oldResolution.resolution && isTraceEnabled(options, host)) {
                    const libraryName = getLibraryNameFromLibFileName(libFileName);
                    const resolveFrom = getInferredLibraryNameResolveFrom(options, currentDirectory, libFileName);
                    trace(
                        host,
                        oldResolution.resolution.resolvedModule ?
                            oldResolution.resolution.resolvedModule.packageId ?
                                Diagnostics.Reusing_resolution_of_module_0_from_1_of_old_program_it_was_successfully_resolved_to_2_with_Package_ID_3 :
                                Diagnostics.Reusing_resolution_of_module_0_from_1_of_old_program_it_was_successfully_resolved_to_2 :
                            Diagnostics.Reusing_resolution_of_module_0_from_1_of_old_program_it_was_not_resolved,
                        libraryName,
                        getNormalizedAbsolutePath(resolveFrom, currentDirectory),
                        oldResolution.resolution.resolvedModule?.resolvedFileName,
                        oldResolution.resolution.resolvedModule?.packageId && packageIdToString(oldResolution.resolution.resolvedModule.packageId),
                    );
                }
                (resolvedLibProcessing ??= new Map()).set(libFileName, oldResolution);
                return oldResolution;
            }
        }

        const libraryName = getLibraryNameFromLibFileName(libFileName);
        const resolveFrom = getInferredLibraryNameResolveFrom(options, currentDirectory, libFileName);
        tracing?.push(tracing.Phase.Program, "resolveLibrary", { resolveFrom });
        performance.mark("beforeResolveLibrary");
        const resolution = actualResolveLibrary(libraryName, resolveFrom, options, libFileName);
        performance.mark("afterResolveLibrary");
        performance.measure("ResolveLibrary", "beforeResolveLibrary", "afterResolveLibrary");
        tracing?.pop();
        const result: LibResolution = {
            resolution,
            actual: resolution.resolvedModule ?
                resolution.resolvedModule.resolvedFileName :
                combinePaths(defaultLibraryPath, libFileName),
        };
        (resolvedLibProcessing ??= new Map()).set(libFileName, result);
        return result;
    }

    function getBindAndCheckDiagnosticsForFileNoCache(sourceFile: SourceFile, cancellationToken: CancellationToken | undefined): readonly Diagnostic[] {
        //return runWithCancellationToken(() => {
            // if (skipTypeChecking(sourceFile, options, program)) {
            //     return emptyArray;
            // }

            const typeChecker = getTypeChecker();

            Debug.assert(!!sourceFile.bindDiagnostics);

            const isNotLpc = sourceFile.scriptKind !== ScriptKind.LPC;
            
            // By default, only type-check .ts, .tsx, Deferred, plain JS, checked JS and External
            // - plain JS: .js files with no // ts-check and checkJs: undefined
            // - check JS: .js files with either // ts-check or checkJs: true
            // - external: files that are added by plugins
            let bindDiagnostics = sourceFile.bindDiagnostics;
            let checkDiagnostics = typeChecker.getDiagnostics(sourceFile, cancellationToken);
            // if (isPlainJs) {
            //     bindDiagnostics = filter(bindDiagnostics, d => plainJSErrors.has(d.code));
            //     checkDiagnostics = filter(checkDiagnostics, d => plainJSErrors.has(d.code));
            // }
            // skip ts-expect-error errors in plain JS files, and skip JSDoc errors except in checked JS
            return getMergedBindAndCheckDiagnostics(sourceFile, !isNotLpc, bindDiagnostics, checkDiagnostics, /*isCheckJs ? sourceFile.jsDocDiagnostics :*/ undefined);
        //});
    }

    function getMergedBindAndCheckDiagnostics(sourceFile: SourceFile, includeBindAndCheckDiagnostics: boolean, ...allDiagnostics: (readonly Diagnostic[] | undefined)[]) {
        const flatDiagnostics = flatten(allDiagnostics);
        if (!includeBindAndCheckDiagnostics /*|| !sourceFile.commentDirectives?.length*/) {
            return flatDiagnostics;
        }

        // const { diagnostics, directives } = getDiagnosticsWithPrecedingDirectives(sourceFile, sourceFile.commentDirectives, flatDiagnostics);

        // for (const errorExpectation of directives.getUnusedExpectations()) {
        //     diagnostics.push(createDiagnosticForRange(sourceFile, errorExpectation.range, Diagnostics.Unused_ts_expect_error_directive));
        // }

        // return diagnostics;
        return flatDiagnostics;
    }

    function getAndCacheDiagnostics<T extends SourceFile | undefined, U extends Diagnostic>(
        sourceFile: T,
        cancellationToken: CancellationToken | undefined,
        cache: DiagnosticCache<U>,
        getDiagnostics: (sourceFile: T, cancellationToken: CancellationToken | undefined) => readonly U[],
    ): readonly U[] {
        const cachedResult = sourceFile
            ? cache.perFile?.get(sourceFile.path)
            : cache.allDiagnostics;

        if (cachedResult) {
            return cachedResult;
        }
        const result = getDiagnostics(sourceFile, cancellationToken);
        if (sourceFile) {
            (cache.perFile || (cache.perFile = new Map())).set(sourceFile.path, result);
        }
        else {
            cache.allDiagnostics = result;
        }
        return result;
    }

    function runWithCancellationToken<T>(func: () => T): T {
        try {
            return func();
        }
        catch (e) {
            if (e instanceof OperationCanceledException) {
                // We were canceled while performing the operation.  Because our type checker
                // might be a bad state, we need to throw it away.
                typeChecker = undefined!;
            }

            throw e;
        }
    }


    function getDiagnosticsHelper<T extends Diagnostic>(
        sourceFile: SourceFile | undefined,
        getDiagnostics: (sourceFile: SourceFile, cancellationToken: CancellationToken | undefined) => readonly T[],
        cancellationToken: CancellationToken | undefined,
    ): readonly T[] {
        if (sourceFile) {
            return sortAndDeduplicateDiagnostics(getDiagnostics(sourceFile, cancellationToken));
        }
        return sortAndDeduplicateDiagnostics(flatMap(program.getSourceFiles(), sourceFile => {
            if (cancellationToken) {
                cancellationToken.throwIfCancellationRequested();
            }
            return getDiagnostics(sourceFile, cancellationToken);
        }));
    }

    
    function getResolvedProjectReferenceByPath(projectReferencePath: Path): ResolvedProjectReference | undefined {
        if (!projectReferenceRedirects) {
            return undefined;
        }

        return projectReferenceRedirects.get(projectReferencePath) || undefined;
    }

    function forEachResolvedProjectReference<T>(
        cb: (resolvedProjectReference: ResolvedProjectReference) => T | undefined,
    ): T | undefined {
        return lpc_forEachResolvedProjectReference(resolvedProjectReferences, cb);
    }

    function updateAndGetProgramDiagnostics() {
        console.debug("todo - implement me - updateAndGetProgramDiagnostics");
        // if (lazyProgramDiagnosticExplainingFile) {
        //     // Add file processingDiagnostics
        //     fileProcessingDiagnostics?.forEach(diagnostic => {
        //         switch (diagnostic.kind) {
        //             case FilePreprocessingDiagnosticsKind.FilePreprocessingFileExplainingDiagnostic:
        //                 return programDiagnostics.add(
        //                     createDiagnosticExplainingFile(
        //                         diagnostic.file && getSourceFileByPath(diagnostic.file),
        //                         diagnostic.fileProcessingReason,
        //                         diagnostic.diagnostic,
        //                         diagnostic.args || emptyArray,
        //                     ),
        //                 );
        //             case FilePreprocessingDiagnosticsKind.FilePreprocessingLibReferenceDiagnostic:
        //                 return programDiagnostics.add(filePreprocessingLibreferenceDiagnostic(diagnostic));
        //             case FilePreprocessingDiagnosticsKind.ResolutionDiagnostics:
        //                 return diagnostic.diagnostics.forEach(d => programDiagnostics.add(d));
        //             default:
        //                 Debug.assertNever(diagnostic);
        //         }
        //     });
        //     lazyProgramDiagnosticExplainingFile.forEach(({ file, diagnostic, args }) =>
        //         programDiagnostics.add(
        //             createDiagnosticExplainingFile(file, /*fileProcessingReason*/ undefined, diagnostic, args),
        //         )
        //     );
        //     lazyProgramDiagnosticExplainingFile = undefined;
        //     fileReasonsToChain = undefined;
        //     reasonToRelatedInfo = undefined;
        // }
        return programDiagnostics;
    }

    function getOptionsDiagnosticsOfConfigFile() {
        if (!options.configFile) return emptyArray;
        let diagnostics = updateAndGetProgramDiagnostics().getDiagnostics(options.configFile.fileName);
        forEachResolvedProjectReference(resolvedRef => {
            diagnostics = concatenate(diagnostics, updateAndGetProgramDiagnostics().getDiagnostics(resolvedRef.sourceFile.fileName));
        });
        return diagnostics;
    }
    
    function getOptionsDiagnostics(): SortedReadonlyArray<Diagnostic> {
        return sortAndDeduplicateDiagnostics(concatenate(
            updateAndGetProgramDiagnostics().getGlobalDiagnostics(),
            getOptionsDiagnosticsOfConfigFile(),
        ));
    }

    function getGlobalDiagnostics(): SortedReadonlyArray<Diagnostic> {
        return rootNames.length ? sortAndDeduplicateDiagnostics(getTypeChecker().getGlobalDiagnostics().slice()) : emptyArray as any as SortedReadonlyArray<Diagnostic>;
    }
    
    /** This should have similar behavior to 'processSourceFile' without diagnostics or mutation. */
    function getSourceFileFromReference(referencingFile: SourceFile, ref: FileReference): SourceFile | undefined {
        return getSourceFileFromReferenceWorker(resolveTripleslashReference(ref.fileName, referencingFile.fileName), getSourceFile);
    }

    function getDefaultLibFilePriority(a: SourceFile) {
        if (containsPath(defaultLibraryPath, a.fileName, /*ignoreCase*/ false)) {
            const basename = getBaseFileName(a.fileName);
            if (basename === "lib.d.ts" || basename === "lib.es6.d.ts") return 0;
            const name = removeSuffix(removePrefix(basename, "lib."), ".d.ts");
            const index = libs.indexOf(name);
            if (index !== -1) return index + 1;
        }
        return libs.length + 2;
    }
    
    function compareDefaultLibFiles(a: SourceFile, b: SourceFile) {
        return compareValues(getDefaultLibFilePriority(a), getDefaultLibFilePriority(b));
    }
    
    function processRootFile(fileName: string, isDefaultLib: boolean, ignoreNoDefaultLib: boolean, reason: FileIncludeReason) {
        processSourceFile(normalizePath(fileName), isDefaultLib, ignoreNoDefaultLib, /*packageId*/ undefined, reason);
    }

    // Get source file from normalized fileName
    function findSourceFile(fileName: string, isDefaultLib: boolean, ignoreNoDefaultLib: boolean, reason: FileIncludeReason, packageId: PackageId | undefined): SourceFile | undefined {
        tracing?.push(tracing.Phase.Program, "findSourceFile", {
            fileName,
            isDefaultLib: isDefaultLib || undefined,
            fileIncludeKind: (FileIncludeKind as any)[reason.kind],
        });
        const result = findSourceFileWorker(fileName, isDefaultLib, ignoreNoDefaultLib, reason, packageId);
        tracing?.pop();
        return result;
    }

    /** This has side effects through `findSourceFile`. */
    function processSourceFile(fileName: string, isDefaultLib: boolean, ignoreNoDefaultLib: boolean, packageId: PackageId | undefined, reason: FileIncludeReason): void {
        getSourceFileFromReferenceWorker(
            fileName,
            fileName => findSourceFile(fileName, isDefaultLib, ignoreNoDefaultLib, reason, packageId), // TODO: GH#18217
            (diagnostic, ...args) => addFilePreprocessingFileExplainingDiagnostic(/*file*/ undefined, reason, diagnostic, args),
            reason,
        );
    }

    function addFilePreprocessingFileExplainingDiagnostic(file: SourceFile | undefined, fileProcessingReason: FileIncludeReason, diagnostic: DiagnosticMessage, args: DiagnosticArguments) {
        (fileProcessingDiagnostics ||= []).push({
            kind: FilePreprocessingDiagnosticsKind.FilePreprocessingFileExplainingDiagnostic,
            file: file && file.path,
            fileProcessingReason,
            diagnostic,
            args,
        });
    }

    function getCanonicalFileName(fileName: string): string {
        return host.getCanonicalFileName(fileName);
    }

    function toPath(fileName: string): Path {
        return lpc_toPath(fileName, currentDirectory, getCanonicalFileName);
    }
    
    function addFileIncludeReason(file: SourceFile | undefined, reason: FileIncludeReason, checkExisting: boolean) {
        if (file && (!checkExisting || !isReferencedFile(reason) || !filesWithReferencesProcessed?.has(reason.file))) {
            fileReasons.add(file.path, reason);
            return true;
        }
        return false;
    }

    function findSourceFileWorker(fileName: string, isDefaultLib: boolean, ignoreNoDefaultLib: boolean, reason: FileIncludeReason, packageId: PackageId | undefined): SourceFile | undefined {
        const path = toPath(fileName);
        // if (useSourceOfProjectReferenceRedirect) {
        //     let source = getSourceOfProjectReferenceRedirect(path);
        //     // If preserveSymlinks is true, module resolution wont jump the symlink
        //     // but the resolved real path may be the .d.ts from project reference
        //     // Note:: Currently we try the real path only if the
        //     // file is from node_modules to avoid having to run real path on all file paths
        //     if (
        //         !source &&
        //         host.realpath &&
        //         options.preserveSymlinks &&
        //         isDeclarationFileName(fileName) &&
        //         fileName.includes(nodeModulesPathPart)
        //     ) {
        //         const realPath = toPath(host.realpath(fileName));
        //         if (realPath !== path) source = getSourceOfProjectReferenceRedirect(realPath);
        //     }
        //     if (source) {
        //         const file = isString(source) ?
        //             findSourceFile(source, isDefaultLib, ignoreNoDefaultLib, reason, packageId) :
        //             undefined;
        //         if (file) addFileToFilesByName(file, path, fileName, /*redirectedPath*/ undefined);
        //         return file;
        //     }
        // }
        const originalFileName = fileName;
        if (filesByName.has(path)) {
            const file = filesByName.get(path);
            const addedReason = addFileIncludeReason(file || undefined, reason, /*checkExisting*/ true);
            // try to check if we've already seen this file but with a different casing in path
            // NOTE: this only makes sense for case-insensitive file systems, and only on files which are not redirected
            if (file && addedReason && !(options.forceConsistentCasingInFileNames === false)) {
                const checkedName = file.fileName;
                const isRedirect = toPath(checkedName) !== toPath(fileName);
                if (isRedirect) {
                    throw "implement me";
                    //fileName = getProjectReferenceRedirect(fileName) || fileName;
                }
                // Check if it differs only in drive letters its ok to ignore that error:
                const checkedAbsolutePath = getNormalizedAbsolutePathWithoutRoot(checkedName, currentDirectory);
                const inputAbsolutePath = getNormalizedAbsolutePathWithoutRoot(fileName, currentDirectory);
                if (checkedAbsolutePath !== inputAbsolutePath) {
                    reportFileNamesDifferOnlyInCasingError(fileName, file, reason);
                }
            }

            // If the file was previously found via a node_modules search, but is now being processed as a root file,
            // then everything it sucks in may also be marked incorrectly, and needs to be checked again.
            if (file && sourceFilesFoundSearchingNodeModules.get(file.path) && currentNodeModulesDepth === 0) {
                sourceFilesFoundSearchingNodeModules.set(file.path, false);
                if (!options.noResolve) {
                    processReferencedFiles(file, isDefaultLib);                    
                }
                if (!options.noLib) {
                    processLibReferenceDirectives(file);
                }

                modulesWithElidedImports.set(file.path, false);
                processImportedModules(file);
            }
            // See if we need to reprocess the imports due to prior skipped imports
            else if (file && modulesWithElidedImports.get(file.path)) {
                if (currentNodeModulesDepth < maxNodeModuleJsDepth) {
                    modulesWithElidedImports.set(file.path, false);
                    processImportedModules(file);
                }
            }

            return file || undefined;
        }

        let redirectedPath: Path | undefined;
        // if (!useSourceOfProjectReferenceRedirect) {
        //     const redirectProject = getProjectReferenceRedirectProject(fileName);
        //     if (redirectProject) {
        //         if (redirectProject.commandLine.options.outFile) {
        //             // Shouldnt create many to 1 mapping file in --out scenario
        //             return undefined;
        //         }
        //         const redirect = getProjectReferenceOutputName(redirectProject, fileName);
        //         fileName = redirect;
        //         // Once we start redirecting to a file, we can potentially come back to it
        //         // via a back-reference from another file in the .d.ts folder. If that happens we'll
        //         // end up trying to add it to the program *again* because we were tracking it via its
        //         // original (un-redirected) name. So we have to map both the original path and the redirected path
        //         // to the source file we're about to find/create
        //         redirectedPath = toPath(redirect);
        //     }
        // }

        // We haven't looked for this file, do so now and cache result
        const sourceFileOptions = getCreateSourceFileOptions(fileName, /*moduleResolutionCache*/ undefined, host, options);
        const file = host.getSourceFile(
            fileName,
            //sourceFileOptions,
            hostErrorMessage => addFilePreprocessingFileExplainingDiagnostic(/*file*/ undefined, reason, Diagnostics.Cannot_read_file_0_Colon_1, [fileName, hostErrorMessage]),
            shouldCreateNewSourceFile,
        );

        // if (packageId) {
        //     const packageIdKey = packageIdToString(packageId);
        //     const fileFromPackageId = packageIdToSourceFile.get(packageIdKey);
        //     if (fileFromPackageId) {
        //         // Some other SourceFile already exists with this package name and version.
        //         // Instead of creating a duplicate, just redirect to the existing one.
        //         const dupFile = createRedirectedSourceFile(fileFromPackageId, file!, fileName, path, toPath(fileName), originalFileName, sourceFileOptions);
        //         redirectTargetsMap.add(fileFromPackageId.path, fileName);
        //         addFileToFilesByName(dupFile, path, fileName, redirectedPath);
        //         addFileIncludeReason(dupFile, reason, /*checkExisting*/ false);
        //         sourceFileToPackageName.set(path, packageIdToPackageName(packageId));
        //         processingOtherFiles!.push(dupFile);
        //         return dupFile;
        //     }
        //     else if (file) {
        //         // This is the first source file to have this packageId.
        //         packageIdToSourceFile.set(packageIdKey, file);
        //         sourceFileToPackageName.set(path, packageIdToPackageName(packageId));
        //     }
        // }
        addFileToFilesByName(file, path, fileName, redirectedPath);

        if (file) {
            sourceFilesFoundSearchingNodeModules.set(path, currentNodeModulesDepth > 0);
            file.fileName = fileName; // Ensure that source file has same name as what we were looking for
            file.path = path;
            file.resolvedPath = toPath(fileName);
            file.originalFileName = originalFileName;
            // file.packageJsonLocations = sourceFileOptions.packageJsonLocations?.length ? sourceFileOptions.packageJsonLocations : undefined;
            // file.packageJsonScope = sourceFileOptions.packageJsonScope;
            addFileIncludeReason(file, reason, /*checkExisting*/ false);

            if (host.useCaseSensitiveFileNames()) {
                const pathLowerCase = toFileNameLowerCase(path);
                // for case-sensitive file systems check if we've already seen some file with similar filename ignoring case
                const existingFile = filesByNameIgnoreCase!.get(pathLowerCase);
                if (existingFile) {
                    reportFileNamesDifferOnlyInCasingError(fileName, existingFile, reason);
                }
                else {
                    filesByNameIgnoreCase!.set(pathLowerCase, file);
                }
            }

            //skipDefaultLib = skipDefaultLib || (file.hasNoDefaultLib && !ignoreNoDefaultLib);

            if (!options.noResolve) {
                processReferencedFiles(file, isDefaultLib);
                //processTypeReferenceDirectives(file);
            }
            if (!options.noLib) {
                processLibReferenceDirectives(file);
            }

            // always process imported modules to record module name resolutions
            processImportedModules(file);

            if (isDefaultLib) {
                file.isDefaultLib = true;
                processingDefaultLibFiles!.push(file);
            }
            else {
                processingOtherFiles!.push(file);
            }
            (filesWithReferencesProcessed ??= new Set()).add(file.path);
        }
        return file;
    }

    function reportFileNamesDifferOnlyInCasingError(fileName: string, existingFile: SourceFile, reason: FileIncludeReason): void {
        const hasExistingReasonToReportErrorOn = !isReferencedFile(reason) && some(fileReasons.get(existingFile.path), isReferencedFile);
        if (hasExistingReasonToReportErrorOn) {
            addFilePreprocessingFileExplainingDiagnostic(existingFile, reason, Diagnostics.Already_included_file_name_0_differs_from_file_name_1_only_in_casing, [existingFile.fileName, fileName]);
        }
        else {
            addFilePreprocessingFileExplainingDiagnostic(existingFile, reason, Diagnostics.File_name_0_differs_from_already_included_file_name_1_only_in_casing, [fileName, existingFile.fileName]);
        }
    }
    
    function getSourceFileByPath(path: Path): SourceFile | undefined {
        return filesByName.get(path) || undefined;
    }

    function getCreateSourceFileOptions(fileName: string, moduleResolutionCache: any | undefined, host: CompilerHost, options: CompilerOptions): CreateSourceFileOptions {
        // TODO implement me
        return {languageVersion: ScriptTarget.Latest};
        
        // It's a _little odd_ that we can't set `impliedNodeFormat` until the program step - but it's the first and only time we have a resolution cache
        // and a freshly made source file node on hand at the same time, and we need both to set the field. Persisting the resolution cache all the way
        // to the check and emit steps would be bad - so we much prefer detecting and storing the format information on the source file node upfront.
        //const result = getImpliedNodeFormatForFileWorker(getNormalizedAbsolutePath(fileName, currentDirectory), moduleResolutionCache?.getPackageJsonInfoCache(), host, options);
        //const languageVersion = getEmitScriptTarget(options);
        // const setExternalModuleIndicator = getSetExternalModuleIndicator(options);
        // return typeof result === "object" ?
        //     { ...result, languageVersion, setExternalModuleIndicator, jsDocParsingMode: host.jsDocParsingMode } :
        //     { languageVersion, impliedNodeFormat: result, setExternalModuleIndicator, jsDocParsingMode: host.jsDocParsingMode };
    }

    function getDeclarationDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly DiagnosticWithLocation[] {
        const options = program.getCompilerOptions();
        // collect diagnostics from the program only once if either no source file was specified or out/outFile is set (bundled emit)
        // if (!sourceFile || options.outFile) {
        //     return getDeclarationDiagnosticsWorker(sourceFile, cancellationToken);
        // }
        // else {
            return getDiagnosticsHelper(sourceFile, getDeclarationDiagnosticsForFile, cancellationToken);
        // }
    }

    function getDeclarationDiagnosticsForFile(sourceFile: SourceFile, cancellationToken: CancellationToken | undefined): readonly DiagnosticWithLocation[] {
        return sourceFile.isDeclarationFile ? [] : getDeclarationDiagnosticsWorker(sourceFile, cancellationToken);
    }

    function getDeclarationDiagnosticsWorker(sourceFile: SourceFile | undefined, cancellationToken: CancellationToken | undefined): readonly DiagnosticWithLocation[] {
        return getAndCacheDiagnostics(sourceFile, cancellationToken, cachedDeclarationDiagnosticsForFile, getDeclarationDiagnosticsForFileNoCache);
    }

    function getDeclarationDiagnosticsForFileNoCache(sourceFile: SourceFile | undefined, cancellationToken: CancellationToken | undefined): readonly DiagnosticWithLocation[] {
        return runWithCancellationToken(() => {
            const resolver = getTypeChecker().getEmitResolver(sourceFile, cancellationToken);
            // Don't actually write any files since we're just getting diagnostics.
            return lpc_getDeclarationDiagnostics(getEmitHost(noop), resolver, sourceFile) || emptyArray;
        });
    }

    function writeFile(
        fileName: string,
        text: string,
        writeByteOrderMark: boolean,
        onError?: (message: string) => void,
        sourceFiles?: readonly SourceFile[],
        data?: WriteFileCallbackData,
    ) {
        host.writeFile(fileName, text, writeByteOrderMark, onError, sourceFiles, data);
    }

    function isEmitBlocked(emitFileName: string): boolean {
        return hasEmitBlockingDiagnostics.has(toPath(emitFileName));
    }
    
    function getEmitHost(writeFileCallback?: WriteFileCallback): EmitHost {
        return {
            getCanonicalFileName,
            getCommonSourceDirectory: program.getCommonSourceDirectory,
            getCompilerOptions: program.getCompilerOptions,
            getCurrentDirectory: () => currentDirectory,
            getSourceFile: program.getSourceFile,
            getSourceFileByPath: program.getSourceFileByPath,
            getSourceFiles: program.getSourceFiles,
            isSourceFileFromExternalLibrary: ()=>false, // TODO
            // getResolvedProjectReferenceToRedirect,
            // getProjectReferenceRedirect,
            // isSourceOfProjectReferenceRedirect,
            // getSymlinkCache,
            writeFile: writeFileCallback || writeFile,
            isEmitBlocked,
            readFile: f => host.readFile(f),
            fileExists: f => {
                // Use local caches
                const path = toPath(f);
                if (getSourceFileByPath(path)) return true;
                if (missingFileNames.has(path)) return false;
                // Before falling back to the host
                return host.fileExists(f);
            },
            realpath: maybeBind(host, host.realpath),
            useCaseSensitiveFileNames: () => host.useCaseSensitiveFileNames(),
            getBuildInfo: () => program.getBuildInfo?.(),
            getSourceFileFromReference: (file, ref) => program.getSourceFileFromReference(file, ref),
            redirectTargetsMap,
            getFileIncludeReasons: program.getFileIncludeReasons,
            createHash: maybeBind(host, host.createHash),
            getModuleResolutionCache: () => program.getModuleResolutionCache(),
            trace: maybeBind(host, host.trace),
        };
    }


    function addFileToFilesByName(file: SourceFile | undefined, path: Path, fileName: string, redirectedPath: Path | undefined) {
        if (redirectedPath) {
            updateFilesByNameMap(fileName, redirectedPath, file);
            updateFilesByNameMap(fileName, path, file || false);
        }
        else {
            updateFilesByNameMap(fileName, path, file);
        }
    }

    function updateFilesByNameMap(fileName: string, path: Path, file: SourceFile | false | undefined) {
        filesByName.set(path, file);
        if (file !== undefined) missingFileNames.delete(path);
        else missingFileNames.set(path, fileName);
    }

    function processImportedModules(file: SourceFile) {
        console.debug("implement me - processImportedModules");
        // collectExternalModuleReferences(file);
        // if (file.imports.length || file.moduleAugmentations.length) {
        //     // Because global augmentation doesn't have string literal name, we can check for global augmentation as such.
        //     const moduleNames = getModuleNames(file);
        //     const resolutions = resolvedModulesProcessing?.get(file.path) ||
        //         resolveModuleNamesReusingOldState(moduleNames, file);
        //     Debug.assert(resolutions.length === moduleNames.length);
        //     const optionsForFile = getRedirectReferenceForResolution(file)?.commandLine.options || options;
        //     const resolutionsInFile = createModeAwareCache<ResolutionWithFailedLookupLocations>();
        //     (resolvedModules ??= new Map()).set(file.path, resolutionsInFile);
        //     for (let index = 0; index < moduleNames.length; index++) {
        //         const resolution = resolutions[index].resolvedModule;
        //         const moduleName = moduleNames[index].text;
        //         const mode = getModeForUsageLocationWorker(file, moduleNames[index], optionsForFile);
        //         resolutionsInFile.set(moduleName, mode, resolutions[index]);
        //         addResolutionDiagnosticsFromResolutionOrCache(file, moduleName, resolutions[index], mode);

        //         if (!resolution) {
        //             continue;
        //         }

        //         const isFromNodeModulesSearch = resolution.isExternalLibraryImport;
        //         // If this is js file source of project reference, dont treat it as js file but as d.ts
        //         const isJsFile = !resolutionExtensionIsTSOrJson(resolution.extension) && !getProjectReferenceRedirectProject(resolution.resolvedFileName);
        //         const isJsFileFromNodeModules = isFromNodeModulesSearch && isJsFile && (!resolution.originalPath || pathContainsNodeModules(resolution.resolvedFileName));
        //         const resolvedFileName = resolution.resolvedFileName;

        //         if (isFromNodeModulesSearch) {
        //             currentNodeModulesDepth++;
        //         }

        //         // add file to program only if:
        //         // - resolution was successful
        //         // - noResolve is falsy
        //         // - module name comes from the list of imports
        //         // - it's not a top level JavaScript module that exceeded the search max
        //         const elideImport = isJsFileFromNodeModules && currentNodeModulesDepth > maxNodeModuleJsDepth;
        //         // Don't add the file if it has a bad extension (e.g. 'tsx' if we don't have '--allowJs')
        //         // This may still end up being an untyped module -- the file won't be included but imports will be allowed.
        //         const shouldAddFile = resolvedFileName
        //             && !getResolutionDiagnostic(optionsForFile, resolution, file)
        //             && !optionsForFile.noResolve
        //             && index < file.imports.length
        //             && !elideImport
        //             && !(isJsFile && !getAllowJSCompilerOption(optionsForFile))
        //             && (isInJSFile(file.imports[index]) || !(file.imports[index].flags & NodeFlags.JSDoc));

        //         if (elideImport) {
        //             modulesWithElidedImports.set(file.path, true);
        //         }
        //         else if (shouldAddFile) {
        //             findSourceFile(
        //                 resolvedFileName,
        //                 /*isDefaultLib*/ false,
        //                 /*ignoreNoDefaultLib*/ false,
        //                 { kind: FileIncludeKind.Import, file: file.path, index },
        //                 resolution.packageId,
        //             );
        //         }

        //         if (isFromNodeModulesSearch) {
        //             currentNodeModulesDepth--;
        //         }
        //     }
        // }
    }

    
    function processLibReferenceDirectives(file: SourceFile) {
        //console.debug("implement me - processLibReferenceDirectives");
        // forEach(file.libReferenceDirectives, (libReference, index) => {
        //     const libFileName = getLibFileNameFromLibReference(libReference);
        //     if (libFileName) {
        //         // we ignore any 'no-default-lib' reference set on this file.
        //         processRootFile(pathForLibFile(libFileName), /*isDefaultLib*/ true, /*ignoreNoDefaultLib*/ true, { kind: FileIncludeKind.LibReferenceDirective, file: file.path, index });
        //     }
        //     else {
        //         (fileProcessingDiagnostics ||= []).push({
        //             kind: FilePreprocessingDiagnosticsKind.FilePreprocessingLibReferenceDiagnostic,
        //             reason: { kind: FileIncludeKind.LibReferenceDirective, file: file.path, index },
        //         });
        //     }
        // });
    }


    function processReferencedFiles(file: SourceFile, isDefaultLib: boolean) {
        forEach(file.referencedFiles, (ref, index) => {
            processSourceFile(
                resolveTripleslashReference(ref.fileName, file.fileName),
                isDefaultLib,
                /*ignoreNoDefaultLib*/ false,
                /*packageId*/ undefined,
                { kind: FileIncludeKind.ReferenceFile, file: file.path, index },
            );
        });
    }
    
    function getSourceFileFromReferenceWorker(
        fileName: string,
        getSourceFile: (fileName: string) => SourceFile | undefined,
        fail?: (diagnostic: DiagnosticMessage, ...argument: string[]) => void,
        reason?: FileIncludeReason,
    ): SourceFile | undefined {
        if (hasExtension(fileName)) {
            const canonicalFileName = host.getCanonicalFileName(fileName);
            const sourceFile = getSourceFile(fileName);
            if (fail) {
                if (!sourceFile) {                    
                    fail(Diagnostics.File_0_not_found, fileName);                    
                }
                else if (isReferencedFile(reason) && canonicalFileName === host.getCanonicalFileName(getSourceFileByPath(reason.file)!.fileName)) {
                    fail(Diagnostics.A_file_cannot_have_a_reference_to_itself);
                }
            }
            return sourceFile;
        }
        else {
            throw "implement this";
            // const sourceFileNoExtension = getSourceFile(fileName);
            // if (sourceFileNoExtension) return sourceFileNoExtension;

            // if (fail) {
            //     fail(Diagnostics.File_0_not_found, fileName);
            //     return undefined;
            // }

            // // Only try adding extensions from the first supported group (which should be .ts/.tsx/.d.ts)
            // const sourceFileWithAddedExtension = forEach(supportedExtensions[0], extension => getSourceFile(fileName + extension));
            // if (fail && !sourceFileWithAddedExtension) fail(Diagnostics.Could_not_resolve_the_path_0_with_the_extensions_Colon_1, fileName, "'" + flatten(supportedExtensions).join("', '") + "'");
            // return sourceFileWithAddedExtension;
        }
    }


    function tryReuseStructureFromOldProgram(): StructureIsReused {
        // TODO
        return StructureIsReused.Not;
    }

    function parseProjectReferenceConfigFile(ref: ProjectReference): ResolvedProjectReference | undefined {
        throw "implement me";
    }
}

function createCreateProgramOptions(rootNames: readonly string[], options: CompilerOptions, host?: CompilerHost, oldProgram?: Program, configFileParsingDiagnostics?: readonly Diagnostic[], typeScriptVersion?: string): CreateProgramOptions {
    return {
        rootNames,
        options,
        host,
        oldProgram,
        configFileParsingDiagnostics,
        typeScriptVersion,
    };
}

export function createCompilerHost(options: CompilerOptions, setParentNodes?: boolean): CompilerHost {
    return createCompilerHostWorker(options, setParentNodes);
}

/** @internal */
export function createCompilerHostWorker(
    options: CompilerOptions,
    setParentNodes?: boolean,
    system: System = sys,
): CompilerHost {
    // const existingDirectories = new Map<string, boolean>();
    const getCanonicalFileName = createGetCanonicalFileName(true);//system.useCaseSensitiveFileNames);
    // function directoryExists(directoryPath: string): boolean {
    //     if (existingDirectories.has(directoryPath)) {
    //         return true;
    //     }
    //     if ((compilerHost.directoryExists || system.directoryExists)(directoryPath)) {
    //         existingDirectories.set(directoryPath, true);
    //         return true;
    //     }
    //     return false;
    // }

    function getDefaultLibLocation(): string {
        return getDirectoryPath(normalizePath(system.getExecutingFilePath()));
    }
    
    const newLine = getNewLineCharacter(options);
    const realpath = system.realpath && ((path: string) => system.realpath!(path));
    const compilerHost: CompilerHost = {
        getSourceFile: createGetSourceFile(fileName => compilerHost.readFile(fileName), options.config, setParentNodes, createLpcFileHandler(()=>compilerHost, ()=>options.config)),
        getDefaultLibLocation,
        getDefaultLibFileName: options => combinePaths(getDefaultLibLocation(), getDefaultLibFileName(options)),
        writeFile: createWriteFileMeasuringIO(
            (path, data, writeByteOrderMark) => system.writeFile(path, data, writeByteOrderMark),
            path => (compilerHost.createDirectory || system.createDirectory)(path),
            path => true//directoryExists(path),
        ),
        getCurrentDirectory: memoize(() => system.getCurrentDirectory()),
        useCaseSensitiveFileNames: () => system.useCaseSensitiveFileNames,
        getCanonicalFileName,
        getNewLine: () => newLine,
        fileExists: fileName => system.fileExists(fileName),
        readFile: fileName => system.readFile(fileName),
        trace: (s: string) => system.write(s + newLine),
        directoryExists: directoryName => system.directoryExists(directoryName),
        getEnvironmentVariable: name => system.getEnvironmentVariable ? system.getEnvironmentVariable(name) : "",
        getDirectories: (path: string) => system.getDirectories(path),
        realpath,
        readDirectory: (path, extensions, include, exclude, depth) => system.readDirectory(path, extensions, include, exclude, depth),
        createDirectory: d => system.createDirectory(d),
        createHash: maybeBind(system, system.createHash),
    };
    return compilerHost;
}


/** @internal */
export function createGetSourceFile(
    readFile: ProgramHost<any>["readFile"],
    config: ILpcConfig,
    setParentNodes: boolean | undefined,
    fileHandler: LpcFileHandler
): CompilerHost["getSourceFile"] {
    return (fileName, onError) => {
        let text: string | undefined;
        try {
            performance.mark("beforeIORead");
            text = readFile(fileName);
            performance.mark("afterIORead");
            performance.measure("I/O Read", "beforeIORead", "afterIORead");
        }
        catch (e) {
            if (onError) {
                onError(e.message);
            }
            text = "";
        }
        return text !== undefined ? createSourceFile(fileName, text, config, fileHandler, ScriptTarget.LPC, setParentNodes) : undefined;
    };
}

/** @internal */
export function createWriteFileMeasuringIO(
    actualWriteFile: (path: string, data: string, writeByteOrderMark: boolean) => void,
    createDirectory: (path: string) => void,
    directoryExists: (path: string) => boolean,
): CompilerHost["writeFile"] {
    return (fileName, data, writeByteOrderMark, onError) => {
        try {
            performance.mark("beforeIOWrite");

            // NOTE: If patchWriteFileEnsuringDirectory has been called,
            // the system.writeFile will do its own directory creation and
            // the ensureDirectoriesExist call will always be redundant.
            writeFileEnsuringDirectories(
                fileName,
                data,
                writeByteOrderMark,
                actualWriteFile,
                createDirectory,
                directoryExists,
            );

            performance.mark("afterIOWrite");
            performance.measure("I/O Write", "beforeIOWrite", "afterIOWrite");
        }
        catch (e) {
            if (onError) {
                onError(e.message);
            }
        }
    };
}

/** @internal */
export function writeFileEnsuringDirectories(
    path: string,
    data: string,
    writeByteOrderMark: boolean,
    writeFile: (path: string, data: string, writeByteOrderMark: boolean) => void,
    createDirectory: (path: string) => void,
    directoryExists: (path: string) => boolean,
): void {
    // PERF: Checking for directory existence is expensive.  Instead, assume the directory exists
    // and fall back to creating it if the file write fails.
    try {
        writeFile(path, data, writeByteOrderMark);
    }
    catch {
        ensureDirectoriesExist(getDirectoryPath(normalizePath(path)), createDirectory, directoryExists);
        writeFile(path, data, writeByteOrderMark);
    }
}

function ensureDirectoriesExist(
    directoryPath: string,
    createDirectory: (path: string) => void,
    directoryExists: (path: string) => boolean,
): void {
    if (directoryPath.length > getRootLength(directoryPath) && !directoryExists(directoryPath)) {
        const parentDirectory = getDirectoryPath(directoryPath);
        ensureDirectoriesExist(parentDirectory, createDirectory, directoryExists);
        createDirectory(directoryPath);
    }
}

interface LazyProgramDiagnosticExplainingFile {
    file: SourceFile;
    diagnostic: DiagnosticMessage;
    args: DiagnosticArguments;
}


/** @internal */
export function isReferencedFile(reason: FileIncludeReason | undefined): reason is ReferencedFile {
    switch (reason?.kind) {
        case FileIncludeKind.Import:
        case FileIncludeKind.ReferenceFile:
        case FileIncludeKind.TypeReferenceDirective:
        case FileIncludeKind.LibReferenceDirective:
            return true;
        default:
            return false;
    }
}

export function resolveTripleslashReference(moduleName: string, containingFile: string): string {
    const basePath = getDirectoryPath(containingFile);
    const referencedFileName = isRootedDiskPath(moduleName) ? moduleName : combinePaths(basePath, moduleName);
    return normalizePath(referencedFileName);
}

/**
 * Determine if source file needs to be re-created even if its text hasn't changed
 */
function shouldProgramCreateNewSourceFiles(program: Program | undefined, newOptions: CompilerOptions): boolean {
    if (!program) return false;
    // If any compiler options change, we can't reuse old source file even if version match
    // The change in options like these could result in change in syntax tree or `sourceFile.bindDiagnostics`.
    return optionsHaveChanges(program.getCompilerOptions(), newOptions);//, sourceFileAffectingCompilerOptions);
}

/** @internal */
export function forEachResolvedProjectReference<T>(
    resolvedProjectReferences: readonly (ResolvedProjectReference | undefined)[] | undefined,
    cb: (resolvedProjectReference: ResolvedProjectReference, parent: ResolvedProjectReference | undefined) => T | undefined,
): T | undefined {
    return forEachProjectReference(/*projectReferences*/ undefined, resolvedProjectReferences, (resolvedRef, parent) => resolvedRef && cb(resolvedRef, parent));
}


function forEachProjectReference<T>(
    projectReferences: readonly ProjectReference[] | undefined,
    resolvedProjectReferences: readonly (ResolvedProjectReference | undefined)[] | undefined,
    cbResolvedRef: (resolvedRef: ResolvedProjectReference | undefined, parent: ResolvedProjectReference | undefined, index: number) => T | undefined,
    cbRef?: (projectReferences: readonly ProjectReference[] | undefined, parent: ResolvedProjectReference | undefined) => T | undefined,
): T | undefined {
    let seenResolvedRefs: Set<Path> | undefined;

    return worker(projectReferences, resolvedProjectReferences, /*parent*/ undefined);

    function worker(
        projectReferences: readonly ProjectReference[] | undefined,
        resolvedProjectReferences: readonly (ResolvedProjectReference | undefined)[] | undefined,
        parent: ResolvedProjectReference | undefined,
    ): T | undefined {
        // Visit project references first
        if (cbRef) {
            const result = cbRef(projectReferences, parent);
            if (result) return result;
        }

        return forEach(resolvedProjectReferences, (resolvedRef, index) => {
            if (resolvedRef && seenResolvedRefs?.has(resolvedRef.sourceFile.path)) {
                // ignore recursives
                return undefined;
            }

            const result = cbResolvedRef(resolvedRef, parent, index);
            if (result || !resolvedRef) return result;

            (seenResolvedRefs ||= new Set()).add(resolvedRef.sourceFile.path);
            return worker(resolvedRef.commandLine.projectReferences, resolvedRef.references, resolvedRef);
        });
    }
}


export function flattenDiagnosticMessageText(diag: string | DiagnosticMessageChain | undefined, newLine: string, indent = 0): string {
    if (isString(diag)) {
        return diag;
    }
    else if (diag === undefined) {
        return "";
    }
    let result = "";
    if (indent) {
        result += newLine;

        for (let i = 0; i < indent; i++) {
            result += "  ";
        }
    }
    result += diag.messageText;
    indent++;
    if (diag.next) {
        for (const kid of diag.next) {
            result += flattenDiagnosticMessageText(kid, newLine, indent);
        }
    }
    return result;
}

/** @internal */
export function filterSemanticDiagnostics(diagnostic: readonly Diagnostic[], option: CompilerOptions): readonly Diagnostic[] {
    return filter(diagnostic, d => !d.skippedOn || !option[d.skippedOn]);
}

interface DiagnosticCache<T extends Diagnostic> {
    perFile?: Map<Path, readonly T[]>;
    allDiagnostics?: readonly T[];
}

/** @internal */
export function computeCommonSourceDirectoryOfFilenames(fileNames: readonly string[], currentDirectory: string, getCanonicalFileName: GetCanonicalFileName): string {
    let commonPathComponents: string[] | undefined;
    const failed = forEach(fileNames, sourceFile => {
        // Each file contributes into common source file path
        const sourcePathComponents = getNormalizedPathComponents(sourceFile, currentDirectory);
        sourcePathComponents.pop(); // The base file name is not part of the common directory path

        if (!commonPathComponents) {
            // first file
            commonPathComponents = sourcePathComponents;
            return;
        }

        const n = Math.min(commonPathComponents.length, sourcePathComponents.length);
        for (let i = 0; i < n; i++) {
            if (getCanonicalFileName(commonPathComponents[i]) !== getCanonicalFileName(sourcePathComponents[i])) {
                if (i === 0) {
                    // Failed to find any common path component
                    return true;
                }

                // New common path found that is 0 -> i-1
                commonPathComponents.length = i;
                break;
            }
        }

        // If the sourcePathComponents was shorter than the commonPathComponents, truncate to the sourcePathComponents
        if (sourcePathComponents.length < commonPathComponents.length) {
            commonPathComponents.length = sourcePathComponents.length;
        }
    });

    // A common path can not be found when paths span multiple drives on windows, for example
    if (failed) {
        return "";
    }

    if (!commonPathComponents) { // Can happen when all input files are .d.ts files
        return currentDirectory;
    }

    return getPathFromPathComponents(commonPathComponents);
}

/** @internal */
export function getLibraryNameFromLibFileName(libFileName: string) {
    // Support resolving to lib.dom.d.ts -> @typescript/lib-dom, and
    //                      lib.dom.iterable.d.ts -> @typescript/lib-dom/iterable
    //                      lib.es2015.symbol.wellknown.d.ts -> @typescript/lib-es2015/symbol-wellknown    
    // const components = libFileName.split("-");
    // let path = components[1];
    // let i = 2;
    // while (components[i]) {
    //     path += (i === 2 ? "/" : "-") + components[i];
    //     i++;
    // }
    const path = libFileName.endsWith("ldmud.h") ? "ldmud/" : "fluffos/";
    return "efuns/" + path + libFileName;
}

/** @internal */
export function getInferredLibraryNameResolveFrom(options: CompilerOptions, currentDirectory: string, libFileName: string) {
    const containingDirectory = options.configFilePath ? getDirectoryPath(options.configFilePath) : currentDirectory;
    return combinePaths(containingDirectory, `__lib_node_modules_lookup_${libFileName}__.ts`);
}


/**
 * Returns a DiagnosticMessage if we won't include a resolved module due to its extension.
 * The DiagnosticMessage's parameters are the imported module name, and the filename it resolved to.
 * This returns a diagnostic even if the module will be an untyped module.
 *
 * @internal
 */
export function getResolutionDiagnostic(options: CompilerOptions, { extension }: ResolvedModuleFull, { isDeclarationFile }: { isDeclarationFile: SourceFile["isDeclarationFile"]; }): DiagnosticMessage | undefined {
    switch (extension) {
        case Extension.Lpc:
        case Extension.C:
        case Extension.H:        
            // These are always allowed.
            return undefined;
        // case Extension.Tsx:
        //     return needJsx();
        // case Extension.Jsx:
        //     return needJsx() || needAllowJs();
        // case Extension.Js:
        // case Extension.Mjs:
        // case Extension.Cjs:
        //     return needAllowJs();
        // case Extension.Json:
        //     return needResolveJsonModule();
        default:
            return needAllowArbitraryExtensions();
    }

    // function needJsx() {
    //     return options.jsx ? undefined : Diagnostics.Module_0_was_resolved_to_1_but_jsx_is_not_set;
    // }
    // function needAllowJs() {
    //     return getAllowJSCompilerOption(options) || !getStrictOptionValue(options, "noImplicitAny") ? undefined : Diagnostics.Could_not_find_a_declaration_file_for_module_0_1_implicitly_has_an_any_type;
    // }
    // function needResolveJsonModule() {
    //     return getResolveJsonModule(options) ? undefined : Diagnostics.Module_0_was_resolved_to_1_but_resolveJsonModule_is_not_used;
    // }
    function needAllowArbitraryExtensions() {
        // But don't report the allowArbitraryExtensions error from declaration files (no reason to report it, since the import doesn't have a runtime component)
        return isDeclarationFile || options.allowArbitraryExtensions ? undefined : Diagnostics.Module_0_was_resolved_to_1_but_allowArbitraryExtensions_is_not_set;
    }
}
