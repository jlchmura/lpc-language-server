import { getDeclarationDiagnostics as lpc_getDeclarationDiagnostics, forEachResolvedProjectReference as lpc_forEachResolvedProjectReference, combinePaths, compareValues, CompilerHost, CompilerOptions, containsPath, createDiagnosticCollection, createGetCanonicalFileName, createMultiMap, CreateProgramOptions, createSourceFile, Diagnostic, DiagnosticArguments, DiagnosticMessage, Diagnostics, DiagnosticWithLocation, FileIncludeKind, FileIncludeReason, FilePreprocessingDiagnostics, FilePreprocessingDiagnosticsKind, forEach, getBaseFileName, getDirectoryPath, getNewLineCharacter, getRootLength, hasExtension, isArray, maybeBind, memoize, normalizePath, ObjectLiteralExpression, PackageId, Path, performance, Program, ProgramHost, ProjectReference, PropertyAssignment, ReferencedFile, removePrefix, removeSuffix, ResolvedModuleWithFailedLookupLocations, ResolvedProjectReference, SourceFile, stableSort, StructureIsReused, sys, System, toPath as lpc_toPath, tracing, TypeChecker, getNormalizedAbsolutePathWithoutRoot, some, isRootedDiskPath, optionsHaveChanges, packageIdToString, toFileNameLowerCase, getNormalizedAbsolutePath, CreateSourceFileOptions, createTypeChecker, ScriptTarget, libs, FileReference, SortedReadonlyArray, concatenate, sortAndDeduplicateDiagnostics, emptyArray, LpcFileHandler, createLpcFileHandler, DiagnosticMessageChain, isString, CancellationToken, flatMap, filter, Debug, ScriptKind, flatten, OperationCanceledException, noop, getNormalizedPathComponents, GetCanonicalFileName, getPathFromPathComponents, WriteFileCallback, EmitHost, WriteFileCallbackData, getDefaultLibFileName, LibResolution, returnFalse, isTraceEnabled, trace, equateStringsCaseSensitive, equateStringsCaseInsensitive, NodeFlags, ResolvedModuleFull, Extension, ResolutionMode, ModeAwareCache, isExternalModule, StringLiteral, Identifier, isCloneObjectExpression, isStringLiteral, setParentRecursive, append, Node, SyntaxKind, forEachChild, ResolutionWithFailedLookupLocations, createModeAwareCache, ModuleKind, ResolvedTypeReferenceDirectiveWithFailedLookupLocations, ModuleResolutionCache, contains, createModuleResolutionCache, ModuleResolutionHost, ModeAwareCacheKey, createModeAwareCacheKey, resolveModuleName, isInheritDeclaration, LogLevel, PackageJsonInfoCache, StringLiteralLike, skipTrivia, getSourceFileOfNode, hasLPCFileExtension, getNormalizedModuleName, isIncludeDirective, first, createEvaluator, forEachChildRecursively, factory, LanguageVariant, ResolvedConfigFileName, resolveConfigFileProjectName,     createMasterApplyGetIncludePathVm, memoizeOne, getRelativePathFromFile, getRelativePathFromDirectory, map, resolvePath, diagnosticCategoryName, getLineAndCharacterOfPosition, convertToRelativePath, BuilderProgram, addRange, explainIfFileIsRedirectAndImpliedFormat, chainDiagnosticMessages, createFileDiagnosticFromMessageChain, createCompilerDiagnosticFromMessageChain, fileIncludeReasonToDiagnostics, createFileDiagnostic, getMatchedFileSpec, createDiagnosticForNodeInSourceFile, FilePreprocessingLibReferenceDiagnostic, getSpellingSuggestion, identity, HasInvalidatedLibResolutions, HasInvalidatedResolutions, ParsedCommandLine, arrayIsEqualTo, forEachEntry, projectReferenceIsEqualTo, compareDataObjects, HasChangedAutomaticTypeDirectiveNames, isJSDocTypeTag, hasJSDocNodes, isJSDoc, isJSDocNode, isJSDocTypeExpression, isLiteralTypeNode, getLiteralText, GetLiteralTextFlags, isStringLiteralLike, isJSDocParameterTag, isJSDocReturnTag, isTypePredicateNode, StringLiteralType, isPropertyAccessExpression, Mutable, ImportCandidateNode, isNewExpression, isTypeNode, getLibRootedFileName, isJSDocPropertyTag, PragmaPseudoMapEntry, setParent, setTextRangePosEnd, PragmaPseudoMap, TextRange, CommentRange, thisObjectPragmaToStringLiteral, emptyMap, getLpcConfigPropArrayElementValue, forEachLpcConfigPropArray, LpcConfigSourceFile, isArrayLiteralExpression, tryCast, isObjectLiteralExpression, forEachPropertyAssignment, getLpcConfigObjectLiteralExpression, getPropertyArrayElementValue, getNameOfScriptTarget, getEmitScriptTarget, setTextRange, isCallExpression, isIdentifier, changesAffectModuleResolution, sourceFileAffectingCompilerOptions, hasChangesInResolutions, moduleResolutionIsEqualTo, changesAffectingProgramStructure, isBinaryExpression, isArrayTypeNode, LiteralTypeNode, LiteralExpression, isJSDocVariableTag, changesAffectLibCompilation, getMatchedIncludeSpec, tryGetLocalizedLibPath, isInExternalFileContext, DiagnosticCategory, forEachAncestorDirectory, getPositionOfLineAndCharacter, SourceFileBase, getPathComponents, diagnosticPrefix, createDiagnosticForRange, CommentDirective, createCommentDirectivesMap, CommentDirectivesMap, getLineStarts, computeLineAndCharacterOfPosition, skipTypeChecking, isUnionTypeNode, firstOrUndefined, TypeNode, BinaryExpression, isIntersectionTypeNode, isJSDocTypedefTag, isTypeLiteralNode, isJSDocTypeLiteral, JSDocImportCandidateNode, isNamedObjectTypeNode, bindSourceFile, hostGetCanonicalFileName, ReadonlyPragmaContext, getStringLiteralsTextRecursively } from "./_namespaces/lpc.js";

interface FileReasonToChainCache {
    fileIncludeReasonDetails: DiagnosticMessageChain | undefined;
    redirectInfo: DiagnosticMessageChain[] | undefined;
    details?: DiagnosticMessageChain[];
}

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
    let fileReasonsToChain: Map<Path, FileReasonToChainCache> | undefined;
    let reasonToRelatedInfo: Map<FileIncludeReason, DiagnosticWithLocation | false> | undefined;
    const cachedBindAndCheckDiagnosticsForFile: DiagnosticCache<Diagnostic> = {};
    const cachedDeclarationDiagnosticsForFile: DiagnosticCache<DiagnosticWithLocation> = {};
    var masterIncludeApply: (fileName: string) => string[] | undefined = oldProgram?.masterIncludeApply;

    let fileProcessingDiagnostics: FilePreprocessingDiagnostics[] | undefined;
    let automaticTypeDirectiveNames: string[] | undefined;
    //let automaticTypeDirectiveResolutions: ModeAwareCache<ResolvedTypeReferenceDirectiveWithFailedLookupLocations>;

    let resolvedLibReferences: Map<string, LibResolution> | undefined;
    let resolvedLibProcessing: Map<string, LibResolution> | undefined;

    let resolvedModules: Map<Path, ModeAwareCache<ResolvedModuleWithFailedLookupLocations>> | undefined;
    let resolvedModulesProcessing: Map<Path, readonly ResolvedModuleWithFailedLookupLocations[]> | undefined;
    let resolvedTypeReferenceDirectiveNames: Map<Path, ModeAwareCache<ResolvedTypeReferenceDirectiveWithFailedLookupLocations>> | undefined;
    let resolvedTypeReferenceDirectiveNamesProcessing: Map<Path, readonly ResolvedTypeReferenceDirectiveWithFailedLookupLocations[]> | undefined;

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

    let configDefines: ReadonlyMap<string, string> | undefined;

    // Set of files that are currently marked as parsable 
    const parseableFiles = host.getParseableFiles();

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

    let moduleResolutionCache: ModuleResolutionCache | undefined;
    let actualResolveModuleNamesWorker: (
        moduleNames: readonly StringLiteral[],
        containingFile: string,
        redirectedReference: ResolvedProjectReference | undefined,
        options: CompilerOptions,
        containingSourceFile: SourceFile,
        reusedNames: readonly StringLiteral[] | undefined,
    ) => readonly ResolvedModuleWithFailedLookupLocations[];
    const hasInvalidatedResolutions = host.hasInvalidatedResolutions || returnFalse;
    
    if (host.resolveModuleNameLiterals) {
        actualResolveModuleNamesWorker = host.resolveModuleNameLiterals.bind(host);
        moduleResolutionCache = host.getModuleResolutionCache?.();
    } else {
        moduleResolutionCache = createModuleResolutionCache(currentDirectory, getCanonicalFileName, options);
        actualResolveModuleNamesWorker = (moduleNames, containingFile, redirectedReference, options, containingSourceFile) =>
            loadWithModeAwareCache(
                moduleNames,
                containingFile,
                redirectedReference,
                options,
                containingSourceFile,
                host,
                moduleResolutionCache,
                createModuleResolutionLoader,
            );            
    }

    const fileHandler = createLpcFileHandler({
        fileExists: fileName => sys.fileExists(fileName),
        readFile: fileName => getSourceFromSnapshotOrDisk(fileName),
        getCurrentDirectory: () => sys.getCurrentDirectory(),
        getIncludeDirs,
        getCompilerOptions: () => options,
    });

    
    // A parallel array to projectReferences storing the results of reading in the referenced tsconfig files
    let resolvedProjectReferences: readonly (ResolvedProjectReference | undefined)[] | undefined;
    let projectReferenceRedirects: Map<Path, ResolvedProjectReference | false> | undefined;
    let mapFromFileToProjectReferenceRedirects: Map<Path, Path> | undefined;
    //let mapFromToProjectReferenceRedirectSource: Map<Path, SourceOfProjectReferenceRedirect> | undefined;

    const { fileExists, directoryExists } = host;
    const readFile = host.readFile.bind(host) as typeof host.readFile;
    const shouldCreateNewSourceFile = shouldProgramCreateNewSourceFiles(oldProgram, options);
    
    if (oldProgram && host.onAllFilesNeedReparse && changesAffectLibCompilation(oldProgram.getCompilerOptions(), options)) {                
        // if the config of certain lib files changes, we need to force everything to be reparsed.        
        // this is more than just not reusing the structure of the old program
        const oldSourceFiles = oldProgram.getSourceFiles().filter(sf => !sf.isDefaultLib).map(sf => sf.fileName);
        host.onAllFilesNeedReparse(oldSourceFiles);        
    }

    const hasInvalidatedLibResolutions = host.hasInvalidatedLibResolutions || returnFalse;
    let actualResolveLibrary: (libraryName: string, resolveFrom: string, options: CompilerOptions, libFileName: string) => ResolvedModuleWithFailedLookupLocations;
    
    const useSourceOfProjectReferenceRedirect = !!host.useSourceOfProjectReferenceRedirect?.() &&
        !options.disableSourceOfProjectReferenceRedirect;

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

        // get initial defines based on config - these are needed by the lib files which get parsed next
        configDefines = getConfigDefines(options);

        // before loading any files, load the lib file to get driver defines
        // the lib file will be loaded in full later        
        if (rootNames.length && !skipDefaultLib) {            
            const defaultLibraryFileName = getDefaultLibraryFileName();
            if (!options.lib && defaultLibraryFileName) {
                const libSourceFile = getSourceFileWithoutReferences(defaultLibraryFileName, /*isDefaultLib*/ true, { kind: FileIncludeKind.LibFile });                            
                if (libSourceFile && libSourceFile.parsedMacros) {                
                    options.configDefines = options.configDefines || {};
                    // add macros from the default lib to the config table
                    // defines from config file always take priority 
                    const macros = libSourceFile.parsedMacros;
                    for (const [key, value] of macros) {
                        if (!options.configDefines[key]) {
                            options.configDefines[key] = value;
                        }                    
                    }
                }
            }
        }

        // rebuild defines including driver defines which were provided by the lib files
        configDefines = getConfigDefines(options);
                        
        // check if this program has a master file and if so
        // get an instance of it and compile the get_include_path apply function
        let masterFileIndex = -1;
        if (fileExists(options.masterFile) && options.driverType === LanguageVariant.FluffOS) {
            masterFileIndex = rootNames.indexOf(options.masterFile);
            tracing?.push(tracing.Phase.Program, "processMasterFile");

            // we need the master file before everything else is loaded, so this must be done 
            // outside of processRootFile. 
            const masterFile = getSourceFileWithoutReferences(options.masterFile, /*isDefaultLib*/ false, { kind: FileIncludeKind.MasterFile, index: masterFileIndex });            
            const masterApplyVm = createMasterApplyGetIncludePathVm(masterFile);
            masterIncludeApply = masterApplyVm ? memoizeOne(masterApplyVm) : undefined;
                        
            tracing?.pop();    
        }

        tracing?.push(tracing.Phase.Program, "processRootFiles", { count: rootNames.length });
        forEach(rootNames, (name, index) => {
            // only process the file if it is marked as parseable
            if (!parseableFiles || parseableFiles.has(toPath(name))) {
                processRootFile(name, /*isDefaultLib*/ false, /*ignoreNoDefaultLib*/ false, { kind: FileIncludeKind.RootFile, index })
            }
        });
        tracing?.pop();                
        
        if (options.sefunFile && fileExists(options.sefunFile)) {
            // sefun file always gets processed
            const sefunFileIndex = rootNames.indexOf(options.sefunFile);
            processRootFile(options.sefunFile, /*isDefaultLib*/ false, /*ignoreNoDefaultLib*/ false, { kind: FileIncludeKind.RootFile, index: sefunFileIndex });
        }                                
        
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
    if (oldProgram && host.onReleaseParsedCommandLine) {
        forEachProjectReference(
            oldProgram.getProjectReferences(),
            oldProgram.getResolvedProjectReferences(),
            (oldResolvedRef, parent, index) => {
                const oldReference = parent?.commandLine.projectReferences![index] || oldProgram!.getProjectReferences()![index];
                const oldRefPath = resolveProjectReferencePath(oldReference);
                if (!projectReferenceRedirects?.has(toPath(oldRefPath))) {
                    host.onReleaseParsedCommandLine!(oldRefPath, oldResolvedRef, oldProgram!.getCompilerOptions());
                }
            },
        );
    }

    // unconditionally set oldProgram to undefined to prevent it from being captured in closure
    oldProgram = undefined;
    //resolvedLibProcessing = undefined;
    resolvedModulesProcessing = undefined;
    //resolvedTypeReferenceDirectiveNamesProcessing = undefined;

    // make a copy of the parseable files set so we can track changes
    const currentParsableFiles = new Set(parseableFiles);
    const program: Program = {
        getRootFileNames: () => rootNames,
        getParseableFiles: () => currentParsableFiles,
        getDriverType: () => options.driverType,
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
        getSuggestionDiagnostics,
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
        getRelationCacheSizes: () => getTypeChecker().getRelationCacheSizes(),
        getFileProcessingDiagnostics: () => fileProcessingDiagnostics,
        // getAutomaticTypeDirectiveNames: () => automaticTypeDirectiveNames!,
        // getAutomaticTypeDirectiveResolutions: () => automaticTypeDirectiveResolutions,
        isSourceFileFromExternalLibrary,
        isSourceFileDefaultLibrary,
        // getModeForUsageLocation,
        // getModeForResolutionAtIndex,
        getSourceFileFromReference,
        // getLibFileFromReference,
        // sourceFileToPackageName,
        // redirectTargetsMap,
        // usesUriStyleNodeCoreModules,
        resolvedModules,
        // resolvedTypeReferenceDirectiveNames,
        resolvedLibReferences,
        getResolvedModule,
        getResolvedModuleFromModuleSpecifier,
        // getResolvedTypeReferenceDirective,
        getResolvedTypeReferenceDirectiveFromTypeReferenceDirective,
        forEachResolvedModule,
        // forEachResolvedTypeReferenceDirective,
        getCurrentPackagesMap: () => packageMap,
        // typesPackageExists,
        // packageBundlesTypes,
        // isEmittedFile,
        getConfigFileParsingDiagnostics,
        getProjectReferences,
        getResolvedProjectReferences,
        // getProjectReferenceRedirect,
        getResolvedProjectReferenceToRedirect,
        getResolvedProjectReferenceByPath,
        forEachResolvedProjectReference,
        isSourceOfProjectReferenceRedirect,
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
        getIncludeDirs,
        masterIncludeApply,
        getConfigDefines: () => configDefines,
    };

    //onProgramCreateComplete();

    //verifyCompilerOptions();
    performance.mark("afterProgram");
    performance.measure("Program", "beforeProgram", "afterProgram");
    tracing?.pop();

    return program;

    /**
     * Gets an array of include dirs that are searched for a given filename.  If the driver 
     * is running in FluffOS mode and has a master include apply, this function will evaluate
     * it and return the result.
     * @param fileName source file name
     * @returns array of disk rooted include directories
     */
    function getIncludeDirs(fileName: string) {                
        let globalIncludes: string[] = options?.libIncludeDirs ?? emptyArray;        
        if (masterIncludeApply) {
            // convert disk rooted paths to mudlib paths            
            const rootDir = options.rootDir ?? getDirectoryPath(options.configFilePath);
            const relativePath = getRelativePathFromDirectory(rootDir, fileName, host.getCanonicalFileName);            
                        
            const mudlibPath = normalizePath(relativePath);// path.sep == "/" ? relativePath : relativePath.replace(/\\/g, "/");

            // paths come back from master apply as rooted (to the lib). We need to conver them to disk rooted paths.
            const includesForFile = map(masterIncludeApply(mudlibPath), dir => dir != ":DEFAULT:" ? resolvePath(rootDir, "." + dir) : dir);
            if (includesForFile && includesForFile.length) {
                // substitute global include from options for DEFAULT indicator
                const defaultIdx = includesForFile.indexOf(":DEFAULT:");
                if (defaultIdx >= 0) {
                    globalIncludes = includesForFile.slice(0, defaultIdx).concat(globalIncludes, includesForFile.slice(defaultIdx + 1));
                } else {
                    globalIncludes = includesForFile;
                }
            }
        }        
        return globalIncludes;
    }

    /**
     * Gets the source text for a file. This will use script snapshot if it is available, or fall back to disk.
     * Did you really mean to call this?  You probably want `getSourceFile`
     * @param fileName 
     * @returns source text
     * @internal
     */
    function getSourceFromSnapshotOrDisk(fileName: string): string | undefined {                
        return host.getSourceTextFromSnapshot(fileName) ?? sys.readFile(fileName);                
    }

    function getSourceFile(fileName: string): SourceFile | undefined {        
        return getSourceFileByPath(toPath(fileName));
    }

    function isSourceFileFromExternalLibrary(file: SourceFile): boolean {
        return !!sourceFilesFoundSearchingNodeModules.get(file.path);
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
        return sourceFile.parseDiagnostics?.slice();
    }

    function forEachResolvedModule(
        callback: (resolution: ResolvedModuleWithFailedLookupLocations, moduleName: string, mode: ResolutionMode, filePath: Path) => void,
        file?: SourceFile,
    ) {
        forEachResolution(resolvedModules, callback, file);
    }

    function forEachResolution<T>(
        resolutionCache: Map<Path, ModeAwareCache<T>> | undefined,
        callback: (resolution: T, moduleName: string, mode: ResolutionMode, filePath: Path) => void,
        file: SourceFile | undefined,
    ) {
        if (file) resolutionCache?.get(file.path)?.forEach((resolution, name, mode) => callback(resolution, name, mode, file.path));
        else resolutionCache?.forEach((resolutions, filePath) => resolutions.forEach((resolution, name, mode) => callback(resolution, name, mode, filePath)));
    }

    /**
     * Get the referenced project if the file is input file from that reference project
     */
    function getResolvedProjectReferenceToRedirect(fileName: string) {
        if (mapFromFileToProjectReferenceRedirects === undefined) {
            mapFromFileToProjectReferenceRedirects = new Map();
            forEachResolvedProjectReference(referencedProject => {
                // not input file from the referenced project, ignore
                if (toPath(options.configFilePath!) !== referencedProject.sourceFile.path) {
                    referencedProject.commandLine.fileNames.forEach(f => mapFromFileToProjectReferenceRedirects!.set(toPath(f), referencedProject.sourceFile.path));
                }
            });
        }

        const referencedProjectPath = mapFromFileToProjectReferenceRedirects.get(toPath(fileName));
        return referencedProjectPath && getResolvedProjectReferenceByPath(referencedProjectPath);
    }
    
    function isSourceOfProjectReferenceRedirect(fileName: string) {
        return useSourceOfProjectReferenceRedirect && !!getResolvedProjectReferenceToRedirect(fileName);
    }

    function getBindAndCheckDiagnosticsForFile(sourceFile: SourceFile, cancellationToken: CancellationToken | undefined): readonly Diagnostic[] {
        return getAndCacheDiagnostics(sourceFile, cancellationToken, cachedBindAndCheckDiagnosticsForFile, getBindAndCheckDiagnosticsForFileNoCache);
    }

    /**
     * Wait - are you sure you wanted to call this?  You probably wanted processRootFile. 
     * This function is intended for loading the master file only.
     * @internal
     * @param fileName 
     * @param isDefaultLib 
     * @param reason 
     * @returns 
     */
    function getSourceFileWithoutReferences(fileName: string, isDefaultLib: boolean, reason: FileIncludeReason): SourceFile {
        const sourceFileOptions = getCreateSourceFileOptions(fileName, isDefaultLib, /*moduleResolutionCache*/ undefined, host, options, configDefines);
        sourceFileOptions.reportParsedDefines = true;
        const file = host.getSourceFile(
            fileName,
            sourceFileOptions,
            hostErrorMessage => addFilePreprocessingFileExplainingDiagnostic(/*file*/ undefined, reason, Diagnostics.Cannot_read_file_0_Colon_1, [fileName, hostErrorMessage]),
            shouldCreateNewSourceFile,
        );
        return file;
    }

    function getResolvedModuleFromModuleSpecifier(moduleSpecifier: StringLiteralLike, sourceFile?: SourceFile): ResolvedModuleWithFailedLookupLocations | undefined {
        sourceFile ??= getSourceFileOfNode(moduleSpecifier);
        Debug.assertIsDefined(sourceFile, "`moduleSpecifier` must have a `SourceFile` ancestor. Use `program.getResolvedModule` instead to provide the containing file and resolution mode.");
        return getResolvedModule(sourceFile, moduleSpecifier.text, getModeForUsageLocation(sourceFile, moduleSpecifier));
    }

    function getResolvedTypeReferenceDirective(file: SourceFile, typeDirectiveName: string, mode: ResolutionMode) {
        return resolvedTypeReferenceDirectiveNames?.get(file.path)?.get(typeDirectiveName, mode);
    }

    function getResolvedTypeReferenceDirectiveFromTypeReferenceDirective(typeRef: FileReference, sourceFile: SourceFile) {
        return getResolvedTypeReferenceDirective(sourceFile, typeRef.fileName, sourceFile.impliedNodeFormat);
    }
    
    function getResolvedProjectReferences() {
        return resolvedProjectReferences;
    }

    function getConfigFileParsingDiagnostics(): readonly Diagnostic[] {
        return configFileParsingDiagnostics || emptyArray;
    }

    function getProjectReferences() {
        return projectReferences;
    }

    function getResolvedModule(file: SourceFile, moduleName: string, mode: ResolutionMode) {        
        Debug.assertIsDefined(file);
        return moduleName ? resolvedModules?.get(file.path)?.get(getNormalizedModuleName(moduleName), mode) : undefined;        
    }

    function getProgramDiagnostics(sourceFile: SourceFile): readonly Diagnostic[] {
        if (skipTypeChecking(sourceFile, options, program)) {
            return emptyArray;
        }

        const programDiagnosticsInFile = updateAndGetProgramDiagnostics().getDiagnostics(sourceFile.fileName);
        if (!sourceFile.commentDirectives?.length) {
            return programDiagnosticsInFile;
        }

        return getDiagnosticsWithPrecedingDirectives(sourceFile, sourceFile.commentDirectives, programDiagnosticsInFile).diagnostics;        
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
        return runWithCancellationToken(() => {
            if (skipTypeChecking(sourceFile, options, program)) {
                return emptyArray;
            }

            const typeChecker = getTypeChecker();            
            
            // bind file if needed
            if (!sourceFile.bindDiagnostics) {
                bindSourceFile(sourceFile, program.getCompilerOptions());
            }

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
            return getMergedBindAndCheckDiagnostics(sourceFile, !isNotLpc, bindDiagnostics, checkDiagnostics, sourceFile.jsDocDiagnostics);
        });
    }

    function getMergedBindAndCheckDiagnostics(sourceFile: SourceFile, includeBindAndCheckDiagnostics: boolean, ...allDiagnostics: (readonly Diagnostic[] | undefined)[]) {
        const flatDiagnostics = flatten(allDiagnostics);
        if (!includeBindAndCheckDiagnostics || !sourceFile.commentDirectives?.length) {
            return flatDiagnostics;
        }

        const { diagnostics, directives } = getDiagnosticsWithPrecedingDirectives(sourceFile, sourceFile.commentDirectives, flatDiagnostics);

        for (const errorExpectation of directives.getUnusedExpectations()) {
            diagnostics.push(createDiagnosticForRange(sourceFile, errorExpectation.range, Diagnostics.Unused_lpc_expect_error_directive));
        }

        return diagnostics;        
    }

    /**
     * Creates a map of comment directives along with the diagnostics immediately preceded by one of them.
     * Comments that match to any of those diagnostics are marked as used.
     */
    function getDiagnosticsWithPrecedingDirectives(sourceFile: SourceFile, commentDirectives: CommentDirective[], flatDiagnostics: Diagnostic[]) {
        // Diagnostics are only reported if there is no comment directive preceding them
        // This will modify the directives map by marking "used" ones with a corresponding diagnostic
        const directives = createCommentDirectivesMap(sourceFile, commentDirectives);
        const diagnostics = flatDiagnostics.filter(diagnostic => markPrecedingCommentDirectiveLine(diagnostic, directives) === -1);

        return { diagnostics, directives };
    }

    /**
     * @returns The line index marked as preceding the diagnostic, or -1 if none was.
     */
    function markPrecedingCommentDirectiveLine(diagnostic: Diagnostic, directives: CommentDirectivesMap) {
        const { file, start } = diagnostic;
        if (!file) {
            return -1;
        }

        // Start out with the line just before the text
        const lineStarts = getLineStarts(file);
        let line = computeLineAndCharacterOfPosition(lineStarts, start!).line - 1; // TODO: GH#18217
        while (line >= 0) {
            // As soon as that line is known to have a comment directive, use that
            if (directives.markUsed(line)) {
                return line;
            }

            // Stop searching if the line is not empty and not a comment
            const lineText = file.text.slice(lineStarts[line], lineStarts[line + 1]).trim();
            if (lineText !== "" && !/^(\s*)\/\/(.*)$/.test(lineText)) {
                return -1;
            }

            line--;
        }

        return -1;
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

    function getSuggestionDiagnostics(sourceFile: SourceFile, cancellationToken: CancellationToken): readonly DiagnosticWithLocation[] {
        return runWithCancellationToken(() => {
            return getTypeChecker().getSuggestionDiagnostics(sourceFile, cancellationToken);
        });
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

    function getFileIncludeReasonToRelatedInformation(reason: FileIncludeReason) {
        let relatedInfo = reasonToRelatedInfo?.get(reason);
        if (relatedInfo === undefined) (reasonToRelatedInfo ??= new Map()).set(reason, relatedInfo = fileIncludeReasonToRelatedInformation(reason) ?? false);
        return relatedInfo || undefined;
    }

    function getCompilerOptionsObjectLiteralSyntax() {
        if (_compilerOptionsObjectLiteralSyntax === undefined) {
            const compilerOptionsProperty = getCompilerOptionsPropertySyntax();
            _compilerOptionsObjectLiteralSyntax = compilerOptionsProperty ? tryCast(compilerOptionsProperty.initializer, isObjectLiteralExpression) || false : false;
        }
        return _compilerOptionsObjectLiteralSyntax || undefined;
    }

    function getCompilerOptionsPropertySyntax() {
        if (_compilerOptionsPropertySyntax === undefined) {
            _compilerOptionsPropertySyntax = forEachPropertyAssignment(
                getLpcConfigObjectLiteralExpression(options.configFile),
                "compilerOptions",
                identity,
            ) || false;
        }
        return _compilerOptionsPropertySyntax || undefined;
    }

    function getOptionsSyntaxByArrayElementValue(name: string, value: string) {
        const compilerOptionsObjectLiteralSyntax = getCompilerOptionsObjectLiteralSyntax();
        return compilerOptionsObjectLiteralSyntax && getPropertyArrayElementValue(compilerOptionsObjectLiteralSyntax, name, value);
    }

    function forEachOptionsSyntaxByName<T>(name: string, callback: (prop: PropertyAssignment) => T | undefined): T | undefined {
        return forEachPropertyAssignment(getCompilerOptionsObjectLiteralSyntax(), name, callback);
    }

    function getOptionsSyntaxByValue(name: string, value: string) {
        return forEachOptionsSyntaxByName(name, property => isStringLiteral(property.initializer) && property.initializer.text === value ? property.initializer : undefined);
    }

    function fileIncludeReasonToRelatedInformation(reason: FileIncludeReason): DiagnosticWithLocation | undefined {
        if (isReferencedFile(reason)) {
            const referenceLocation = getReferencedFileLocation(program, reason);
            let message: DiagnosticMessage;
            switch (reason.kind) {
                case FileIncludeKind.Import:
                    message = Diagnostics.File_is_included_via_import_here;
                    break;
                case FileIncludeKind.ReferenceFile:
                    message = Diagnostics.File_is_included_via_reference_here;
                    break;
                case FileIncludeKind.TypeReferenceDirective:
                    message = Diagnostics.File_is_included_via_type_library_reference_here;
                    break;
                case FileIncludeKind.LibReferenceDirective:
                    message = Diagnostics.File_is_included_via_library_reference_here;
                    break;
                default:
                    Debug.assertNever(reason);
            }
            return isReferenceFileLocation(referenceLocation) ? createFileDiagnostic(
                referenceLocation.file,
                referenceLocation.pos,
                referenceLocation.end - referenceLocation.pos,
                message,
            ) : undefined;
        }

        if (!options.configFile) return undefined;
        let configFileNode: Node | undefined;
        let message: DiagnosticMessage;        
        switch (reason.kind) {
            case FileIncludeKind.RootFile:
                if (!options.configFile.configFileSpecs) return undefined;
                const fileName = getNormalizedAbsolutePath(rootNames[reason.index], currentDirectory);
                const matchedByFiles = getMatchedFileSpec(program, fileName);                
                if (matchedByFiles) {
                    configFileNode = getLpcConfigPropArrayElementValue(options.configFile, "files", matchedByFiles);
                    message = Diagnostics.File_is_matched_by_files_list_specified_here;
                    break;
                }
                const matchedByInclude = getMatchedIncludeSpec(program, fileName);
                // Could be additional files specified as roots
                if (!matchedByInclude || !isString(matchedByInclude)) return undefined;
                configFileNode = getLpcConfigPropArrayElementValue(options.configFile, "include", matchedByInclude);
                message = Diagnostics.File_is_matched_by_include_pattern_specified_here;
                break;
            case FileIncludeKind.SourceFromProjectReference:
            case FileIncludeKind.OutputFromProjectReference:
                const referencedResolvedRef = Debug.checkDefined(resolvedProjectReferences?.[reason.index]);
                const referenceInfo = forEachProjectReference(projectReferences, resolvedProjectReferences, (resolvedRef, parent, index) => resolvedRef === referencedResolvedRef ? { sourceFile: parent?.sourceFile || options.configFile!, index } : undefined);
                if (!referenceInfo) return undefined;
                const { sourceFile, index } = referenceInfo;
                const referencesSyntax = forEachLpcConfigPropArray(sourceFile as LpcConfigSourceFile, "references", property => isArrayLiteralExpression(property.initializer) ? property.initializer : undefined);
                return referencesSyntax && referencesSyntax.elements.length > index ?
                    createDiagnosticForNodeInSourceFile(
                        sourceFile,
                        referencesSyntax.elements[index],
                        reason.kind === FileIncludeKind.OutputFromProjectReference ?
                            Diagnostics.File_is_output_from_referenced_project_specified_here :
                            Diagnostics.File_is_source_from_referenced_project_specified_here,
                    ) :
                    undefined;
            case FileIncludeKind.AutomaticTypeDirectiveFile:
                if (!options.types) return undefined;
                configFileNode = getOptionsSyntaxByArrayElementValue("types", reason.typeReference);
                message = Diagnostics.File_is_entry_point_of_type_library_specified_here;
                break;
            case FileIncludeKind.LibFile:
                if (reason.index !== undefined) {
                    configFileNode = getOptionsSyntaxByArrayElementValue("lib", options.lib![reason.index]);
                    message = Diagnostics.File_is_library_specified_here;
                    break;
                }
                const target = getNameOfScriptTarget(getEmitScriptTarget(options));
                configFileNode = target ? getOptionsSyntaxByValue("target", target) : undefined;
                message = Diagnostics.File_is_default_library_for_target_specified_here;
                break;
            case FileIncludeKind.MasterFile:
                configFileNode = getOptionsSyntaxByValue("masterFile", options.masterFile);
                message = Diagnostics.File_is_master_file_specified_here;
                break;
            default:
                Debug.assertNever(reason);
        }
        return configFileNode && createDiagnosticForNodeInSourceFile(
            options.configFile,
            configFileNode,
            message,
        );
    }


    function createDiagnosticExplainingFile(file: SourceFile | undefined, fileProcessingReason: FileIncludeReason | undefined, diagnostic: DiagnosticMessage, args: DiagnosticArguments): Diagnostic {
        let seenReasons: Set<FileIncludeReason> | undefined;
        const reasons = file && fileReasons.get(file.path);
        let fileIncludeReasons: DiagnosticMessageChain[] | undefined;
        let relatedInfo: DiagnosticWithLocation[] | undefined;
        let locationReason = isReferencedFile(fileProcessingReason) ? fileProcessingReason : undefined;
        let fileIncludeReasonDetails: DiagnosticMessageChain | undefined;
        let redirectInfo: DiagnosticMessageChain[] | undefined;
        let cachedChain = file && fileReasonsToChain?.get(file.path);
        let chain: DiagnosticMessageChain | undefined;
        if (cachedChain) {
            if (cachedChain.fileIncludeReasonDetails) {
                seenReasons = new Set(reasons);
                reasons?.forEach(populateRelatedInfo);
            }
            else {
                reasons?.forEach(processReason);
            }
            redirectInfo = cachedChain.redirectInfo;
        }
        else {
            reasons?.forEach(processReason);
            redirectInfo = file && explainIfFileIsRedirectAndImpliedFormat(file);
        }

        if (fileProcessingReason) processReason(fileProcessingReason);
        const processedExtraReason = seenReasons?.size !== reasons?.length;

        // If we have location and there is only one reason file is in which is the location, dont add details for file include
        if (locationReason && seenReasons?.size === 1) seenReasons = undefined;

        if (seenReasons && cachedChain) {
            if (cachedChain.details && !processedExtraReason) {
                chain = chainDiagnosticMessages(cachedChain.details, diagnostic, ...args || emptyArray);
            }
            else if (cachedChain.fileIncludeReasonDetails) {
                if (!processedExtraReason) {
                    if (!cachedFileIncludeDetailsHasProcessedExtraReason()) {
                        fileIncludeReasonDetails = cachedChain.fileIncludeReasonDetails;
                    }
                    else {
                        fileIncludeReasons = cachedChain.fileIncludeReasonDetails.next!.slice(0, reasons!.length);
                    }
                }
                else {
                    if (!cachedFileIncludeDetailsHasProcessedExtraReason()) {
                        fileIncludeReasons = [...cachedChain.fileIncludeReasonDetails.next!, fileIncludeReasons![0]];
                    }
                    else {
                        fileIncludeReasons = append(cachedChain.fileIncludeReasonDetails.next!.slice(0, reasons!.length), fileIncludeReasons![0]);
                    }
                }
            }
        }

        if (!chain) {
            if (!fileIncludeReasonDetails) fileIncludeReasonDetails = seenReasons && chainDiagnosticMessages(fileIncludeReasons, Diagnostics.The_file_is_in_the_program_because_Colon);
            chain = chainDiagnosticMessages(
                redirectInfo ?
                    fileIncludeReasonDetails ? [fileIncludeReasonDetails, ...redirectInfo] : redirectInfo :
                    fileIncludeReasonDetails,
                diagnostic,
                ...args || emptyArray,
            );
        }

        // This is chain's next contains:
        //   - File is in program because:
        //      - Files reasons listed
        //      - extra reason if its not already processed - this happens in case sensitive file system where files differ in casing and we are giving reasons for two files so reason is not in file's reason
        //     fyi above whole secton is ommited if we have single reason and we are reporting at that reason's location
        //   - redirect and additional information about file
        // So cache result if we havent ommited file include reasons
        if (file) {
            if (cachedChain) {
                // Cache new fileIncludeDetails if we have update
                // Or if we had cached with more details than the reasons
                if (!cachedChain.fileIncludeReasonDetails || (!processedExtraReason && fileIncludeReasonDetails)) {
                    cachedChain.fileIncludeReasonDetails = fileIncludeReasonDetails;
                }
            }
            else {
                (fileReasonsToChain ??= new Map()).set(file.path, cachedChain = { fileIncludeReasonDetails, redirectInfo });
            }
            // If we didnt compute extra file include reason , cache the details to use directly
            if (!cachedChain.details && !processedExtraReason) cachedChain.details = chain.next;
        }

        const location = locationReason && getReferencedFileLocation(program, locationReason);
        return location && isReferenceFileLocation(location) ?
            createFileDiagnosticFromMessageChain(location.file, location.pos, location.end - location.pos, chain, relatedInfo) :
            createCompilerDiagnosticFromMessageChain(chain, relatedInfo);

        function processReason(reason: FileIncludeReason) {
            if (seenReasons?.has(reason)) return;
            (seenReasons ??= new Set()).add(reason);
            (fileIncludeReasons ??= []).push(fileIncludeReasonToDiagnostics(program, reason));
            populateRelatedInfo(reason);
        }

        function populateRelatedInfo(reason: FileIncludeReason) {
            if (!locationReason && isReferencedFile(reason)) {
                // Report error at first reference file or file currently in processing and dont report in related information
                locationReason = reason;
            }
            else if (locationReason !== reason) {
                relatedInfo = append(relatedInfo, getFileIncludeReasonToRelatedInformation(reason));
            }
        }

        function cachedFileIncludeDetailsHasProcessedExtraReason() {
            return cachedChain!.fileIncludeReasonDetails!.next?.length !== reasons?.length;
        }
    }

    function filePreprocessingLibreferenceDiagnostic({ reason }: FilePreprocessingLibReferenceDiagnostic) {
        const { file, pos, end } = getReferencedFileLocation(program, reason) as ReferenceFileLocation;
        const libReference = file.libReferenceDirectives[reason.index];
        const libName = getLibNameFromLibReference(libReference);
        const unqualifiedLibName = removeSuffix(removePrefix(libName, "lib."), ".d.ts");
        const suggestion = getSpellingSuggestion(unqualifiedLibName, libs, identity);
        return createFileDiagnostic(
            file,
            Debug.checkDefined(pos),
            Debug.checkDefined(end) - pos,
            suggestion ? Diagnostics.Cannot_find_lib_definition_for_0_Did_you_mean_1 : Diagnostics.Cannot_find_lib_definition_for_0,
            libName,
            suggestion!,
        );
    }
    
    function updateAndGetProgramDiagnostics() {        
        if (lazyProgramDiagnosticExplainingFile) {
            // Add file processingDiagnostics
            fileProcessingDiagnostics?.forEach(diagnostic => {
                switch (diagnostic.kind) {
                    case FilePreprocessingDiagnosticsKind.FilePreprocessingFileExplainingDiagnostic:
                        return programDiagnostics.add(
                            createDiagnosticExplainingFile(
                                diagnostic.file && getSourceFileByPath(diagnostic.file),
                                diagnostic.fileProcessingReason,
                                diagnostic.diagnostic,
                                diagnostic.args || emptyArray,
                            ),
                        );
                    case FilePreprocessingDiagnosticsKind.FilePreprocessingLibReferenceDiagnostic:
                        return programDiagnostics.add(filePreprocessingLibreferenceDiagnostic(diagnostic));
                    case FilePreprocessingDiagnosticsKind.ResolutionDiagnostics:
                        return diagnostic.diagnostics.forEach(d => programDiagnostics.add(d));
                    default:
                        Debug.assertNever(diagnostic);
                }
            });
            lazyProgramDiagnosticExplainingFile.forEach(({ file, diagnostic, args }) =>
                programDiagnostics.add(
                    createDiagnosticExplainingFile(file, /*fileProcessingReason*/ undefined, diagnostic, args),
                )
            );
            lazyProgramDiagnosticExplainingFile = undefined;
            fileReasonsToChain = undefined;
            reasonToRelatedInfo = undefined;
        }
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
                const fileNameToCompare = host.useCaseSensitiveFileNames() ? fileName : toFileNameLowerCase(fileName);
                const isRedirect = toPath(checkedName) !== toPath(fileNameToCompare);
                if (isRedirect) {
                    Debug.fail("implement me"); 
                    // fileName = getProjectReferenceRedirect(fileName) || fileName;
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
        const sourceFileOptions = getCreateSourceFileOptions(fileName, isDefaultLib, /*moduleResolutionCache*/ undefined, host, options, configDefines);
        const file = host.getSourceFile(
            fileName,
            sourceFileOptions,
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

            skipDefaultLib = skipDefaultLib || (file.hasNoDefaultLib && !ignoreNoDefaultLib);

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

    function getConfigDefines(options: CompilerOptions): ReadonlyMap<string,string> {        
        const result = new Map<string, string>();
        if (options.playerFile) result.set("__LPC_CONFIG_LIBFILES_PLAYER", `"${getLibRootedFileName(options.playerFile, options)}"`);
        if (options.masterFile) result.set("__LPC_CONFIG_LIBFILES_MASTER", `"${getLibRootedFileName(options.masterFile, options)}"`);
        if (options.sefunFile) result.set("__LPC_CONFIG_LIBFILES_SEFUN", `"${getLibRootedFileName(options.sefunFile, options)}"`);            

        for (const key in options.configDefines || emptyMap) {
            result.set(key, options.configDefines[key]);
        }

        result.set("__LANG_SVC__", "1");

        return result;
    }

    function getCreateSourceFileOptions(fileName: string, isDefaultLib: boolean, moduleResolutionCache: any | undefined, host: CompilerHost, options: CompilerOptions, configDefines: ReadonlyMap<string,string>): CreateSourceFileOptions {
        // TODO is this complete?        
        return {
            languageVersion: ScriptTarget.Latest,
            // don't pass global include if this is a lib dir, or the filename is one of the global includes
            globalIncludes: (isDefaultLib || options.resolvedGlobalIncludeFiles?.some(gi => gi == fileName) ? undefined : options.globalIncludeFiles) || emptyArray,
            fileHandler,
            configDefines,
        };
        
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

    function addResolutionDiagnostics(resolution: ResolvedModuleWithFailedLookupLocations | ResolvedTypeReferenceDirectiveWithFailedLookupLocations) {
        if (!resolution.resolutionDiagnostics?.length) return;
        (fileProcessingDiagnostics ??= []).push({
            kind: FilePreprocessingDiagnosticsKind.ResolutionDiagnostics,
            diagnostics: resolution.resolutionDiagnostics,
        });
    }
    
    function addResolutionDiagnosticsFromResolutionOrCache(containingFile: SourceFile, name: string, resolution: ResolvedModuleWithFailedLookupLocations, mode: ResolutionMode) {
        // diagnostics directly from the resolution
        if (host.resolveModuleNameLiterals || !host.resolveModuleNames) return addResolutionDiagnostics(resolution);
        if (!moduleResolutionCache /*|| isExternalModuleNameRelative(name)*/) return;
        const containingFileName = getNormalizedAbsolutePath(containingFile.originalFileName, currentDirectory);
        const containingDir = getDirectoryPath(containingFileName);
        const redirectedReference = undefined;// getRedirectReferenceForResolution(containingFile);
        // only nonrelative names hit the cache, and, at least as of right now, only nonrelative names can issue diagnostics
        // (Since diagnostics are only issued via import or export map lookup)
        // This may totally change if/when the issue of output paths not mapping to input files is fixed in a broader context
        // When it is, how we extract diagnostics from the module name resolver will have the be refined - the current cache
        // APIs wrapping the underlying resolver make it almost impossible to smuggle the diagnostics out in a generalized way
        const fromCache = moduleResolutionCache.getFromNonRelativeNameCache(name, mode, containingDir, redirectedReference);
        if (fromCache) addResolutionDiagnostics(fromCache);
    }

    function processImportedModules(file: SourceFile) {        
        collectExternalModuleReferences(file);
        if (file.imports.length > 0) {            
            // Because global augmentation doesn't have string literal name, we can check for global augmentation as such.
            const moduleNames = getModuleNames(file);
            const resolutions = resolvedModulesProcessing?.get(file.path) || resolveModuleNamesReusingOldState(moduleNames, file);
            if (resolutions.length !== moduleNames.length) {
                console.warn("Not all modules resolved", resolutions.length, moduleNames.length);
            }            
            const optionsForFile = /*getRedirectReferenceForResolution(file)?.commandLine.options ||*/ options;
            const resolutionsInFile = createModeAwareCache<ResolutionWithFailedLookupLocations>();
            (resolvedModules ??= new Map()).set(file.path, resolutionsInFile);
            for (let index = 0; index < moduleNames.length; index++) {
                if (!resolutions[index] || !moduleNames[index]?.text) continue;
                const resolution = resolutions[index].resolvedModule;
                const moduleName = getNormalizedModuleName(moduleNames[index].text);
                const mode: ResolutionMode = ModuleKind.LPC;// getModeForUsageLocationWorker(file, moduleNames[index], optionsForFile);
                resolutionsInFile.set(moduleName, mode, resolutions[index]);
                addResolutionDiagnosticsFromResolutionOrCache(file, moduleName, resolutions[index], mode);

                if (!resolution) {
                    continue;
                }

                const isFromNodeModulesSearch = resolution.isExternalLibraryImport;
                // If this is js file source of project reference, dont treat it as js file but as d.ts
                const isJsFile = false;// !resolutionExtensionIsTSOrJson(resolution.extension) && !getProjectReferenceRedirectProject(resolution.resolvedFileName);
                const isJsFileFromNodeModules = false;// isFromNodeModulesSearch && isJsFile && (!resolution.originalPath || pathContainsNodeModules(resolution.resolvedFileName));
                const resolvedFileName = resolution.resolvedFileName;

                if (isFromNodeModulesSearch) {
                    currentNodeModulesDepth++;
                }

                // add file to program only if:
                // - resolution was successful
                // - noResolve is falsy
                // - module name comes from the list of imports
                // - it's not a top level JavaScript module that exceeded the search max
                const elideImport = isJsFileFromNodeModules && currentNodeModulesDepth > maxNodeModuleJsDepth;
                // Don't add the file if it has a bad extension (e.g. 'tsx' if we don't have '--allowJs')
                // This may still end up being an untyped module -- the file won't be included but imports will be allowed.
                const shouldAddFile = resolvedFileName
                    && !getResolutionDiagnostic(optionsForFile, resolution, file)
                    && !optionsForFile.noResolve
                    && index < file.imports.length
                    && !elideImport;
                    //&& !(isJsFile && !getAllowJSCompilerOption(optionsForFile))
                    //&& (isInJSFile(file.imports[index]) || !(file.imports[index].flags & NodeFlags.JSDoc));

                if (elideImport) {
                    modulesWithElidedImports.set(file.path, true);
                }
                else if (shouldAddFile) {
                    // mark module as parseable, if parseable files are being used
                    parseableFiles?.add(toPath(resolvedFileName));
                    
                    findSourceFile(
                        resolvedFileName,
                        /*isDefaultLib*/ false,
                        /*ignoreNoDefaultLib*/ false,
                        { kind: FileIncludeKind.Import, file: file.path, index },
                        resolution.packageId,
                    );
                }

                if (isFromNodeModulesSearch) {
                    currentNodeModulesDepth--;
                }
            }
        }
    }

    function resolveModuleNamesReusingOldState(moduleNames: readonly StringLiteral[], file: SourceFile): readonly ResolvedModuleWithFailedLookupLocations[] {
        if (structureIsReused === StructureIsReused.Not && !file.ambientModuleNames?.length) {
            // If the old program state does not permit reusing resolutions and `file` does not contain locally defined ambient modules,
            // the best we can do is fallback to the default logic.
            return resolveModuleNamesWorker(moduleNames, file, /*reusedNames*/ undefined);
        }

        // At this point, we know at least one of the following hold:
        // - file has local declarations for ambient modules
        // - old program state is available
        // With this information, we can infer some module resolutions without performing resolution.

        /** An ordered list of module names for which we cannot recover the resolution. */
        let unknownModuleNames: StringLiteral[] | undefined;
        /**
         * The indexing of elements in this list matches that of `moduleNames`.
         *
         * Before combining results, result[i] is in one of the following states:
         * * undefined: needs to be recomputed,
         * * predictedToResolveToAmbientModuleMarker: known to be an ambient module.
         * Needs to be reset to undefined before returning,
         * * ResolvedModuleFull instance: can be reused.
         */
        let result: ResolvedModuleWithFailedLookupLocations[] | undefined;
        let reusedNames: StringLiteral[] | undefined;
        /** A transient placeholder used to mark predicted resolution in the result list. */
        const predictedToResolveToAmbientModuleMarker: ResolvedModuleWithFailedLookupLocations = emptyResolution;
        const oldSourceFile = oldProgram && oldProgram.getSourceFile(file.fileName);

        for (let i = 0; i < moduleNames.length; i++) {
            const moduleName = moduleNames[i];
            // If the source file is unchanged and doesnt have invalidated resolution, reuse the module resolutions
            if (file === oldSourceFile && !hasInvalidatedResolutions(file.path)) {
                const oldResolution = oldProgram?.getResolvedModule(file, moduleName.text, getModeForUsageLocation(file, moduleName));
                if (oldResolution?.resolvedModule) {
                    if (isTraceEnabled(options, host)) {
                        trace(
                            host,
                            oldResolution.resolvedModule.packageId ?
                                Diagnostics.Reusing_resolution_of_module_0_from_1_of_old_program_it_was_successfully_resolved_to_2_with_Package_ID_3 :
                                Diagnostics.Reusing_resolution_of_module_0_from_1_of_old_program_it_was_successfully_resolved_to_2,
                            moduleName.text,
                            getNormalizedAbsolutePath(file.originalFileName, currentDirectory),
                            oldResolution.resolvedModule.resolvedFileName,
                            oldResolution.resolvedModule.packageId && packageIdToString(oldResolution.resolvedModule.packageId),
                        );
                    }
                    (result ??= new Array(moduleNames.length))[i] = oldResolution;
                    (reusedNames ??= []).push(moduleName);
                    continue;
                }
            }
            // We know moduleName resolves to an ambient module provided that moduleName:
            // - is in the list of ambient modules locally declared in the current source file.
            // - resolved to an ambient module in the old program whose declaration is in an unmodified file
            //   (so the same module declaration will land in the new program)
            let resolvesToAmbientModuleInNonModifiedFile = false;
            if (contains(file.ambientModuleNames, moduleName.text)) {
                resolvesToAmbientModuleInNonModifiedFile = true;
                if (isTraceEnabled(options, host)) {
                    trace(host, Diagnostics.Module_0_was_resolved_as_locally_declared_ambient_module_in_file_1, moduleName.text, getNormalizedAbsolutePath(file.originalFileName, currentDirectory));
                }
            }
            else {
                resolvesToAmbientModuleInNonModifiedFile = moduleNameResolvesToAmbientModuleInNonModifiedFile(moduleName);
            }

            if (resolvesToAmbientModuleInNonModifiedFile) {
                (result || (result = new Array(moduleNames.length)))[i] = predictedToResolveToAmbientModuleMarker;
            }
            else {
                // Resolution failed in the old program, or resolved to an ambient module for which we can't reuse the result.
                (unknownModuleNames ??= []).push(moduleName);
            }
        }

        const resolutions = unknownModuleNames && unknownModuleNames.length
            ? resolveModuleNamesWorker(unknownModuleNames, file, reusedNames)
            : emptyArray;

        // Combine results of resolutions and predicted results
        if (!result) {
            // There were no unresolved/ambient resolutions.
            Debug.assert(resolutions.length === moduleNames.length);
            return resolutions;
        }

        let j = 0;
        for (let i = 0; i < result.length; i++) {
            if (!result[i]) {
                result[i] = resolutions[j];
                j++;
            }
        }
        Debug.assert(j === resolutions.length);

        return result;

        // If we change our policy of rechecking failed lookups on each program create,
        // we should adjust the value returned here.
        function moduleNameResolvesToAmbientModuleInNonModifiedFile(moduleName: StringLiteral): boolean {
            const resolutionToFile = oldProgram?.getResolvedModule(file, moduleName.text, getModeForUsageLocation(file, moduleName))?.resolvedModule;
            const resolvedFile = resolutionToFile && oldProgram!.getSourceFile(resolutionToFile.resolvedFileName);
            if (resolutionToFile && resolvedFile) {
                // In the old program, we resolved to an ambient module that was in the same
                //   place as we expected to find an actual module file.
                // We actually need to return 'false' here even though this seems like a 'true' case
                //   because the normal module resolution algorithm will find this anyway.
                return false;
            }

            // at least one of declarations should come from non-modified source file
            const unmodifiedFile = ambientModuleNameToUnmodifiedFileName.get(moduleName.text);

            if (!unmodifiedFile) {
                return false;
            }

            if (isTraceEnabled(options, host)) {
                trace(host, Diagnostics.Module_0_was_resolved_as_ambient_module_declared_in_1_since_this_file_was_not_modified, moduleName.text, unmodifiedFile);
            }
            return true;
        }
    }

    function resolveModuleNamesWorker(moduleNames: readonly StringLiteral[], containingFile: SourceFile, reusedNames: readonly StringLiteral[] | undefined): readonly ResolvedModuleWithFailedLookupLocations[] {
        if (!moduleNames.length) return emptyArray;
        const containingFileName = getNormalizedAbsolutePath(containingFile.originalFileName, currentDirectory);
        const redirectedReference = undefined;//getRedirectReferenceForResolution(containingFile);
        tracing?.push(tracing.Phase.Program, "resolveModuleNamesWorker", { containingFileName });
        performance.mark("beforeResolveModule");
        const result = actualResolveModuleNamesWorker(moduleNames, containingFileName, redirectedReference, options, containingFile, reusedNames);
        performance.mark("afterResolveModule");
        performance.measure("ResolveModule", "beforeResolveModule", "afterResolveModule");
        tracing?.pop();
        return result;
    }

    function getModeForUsageLocation(file: SourceFile, usage: StringLiteral): ResolutionMode {
        // const optionsForFile = getRedirectReferenceForResolution(file)?.commandLine.options || options;
        // return getModeForUsageLocationWorker(file, usage, optionsForFile);
        return ModuleKind.LPC;
    }

    function collectExternalModuleReferences(file: SourceFile): void {
        if (file.imports) {
            return;
        }

        const isExternalModuleFile = isExternalModule(file);

        // file.imports may not be undefined if there exists dynamic import
        const seenImports = new Set<string>();
        let imports: StringLiteral[] | undefined;
        let moduleAugmentations: (StringLiteral | Identifier)[] | undefined;
        let ambientModules: string[] | undefined;

        // // If we are importing helpers, we need to add a synthetic reference to resolve the
        // // helpers library. (A JavaScript file without `externalModuleIndicator` set might be
        // // a CommonJS module; `commonJsModuleIndicator` doesn't get set until the binder has
        // // run. We synthesize a helpers import for it just in case; it will never be used if
        // // the binder doesn't find and set a `commonJsModuleIndicator`.)
        // if ((!file.isDeclarationFile && (getIsolatedModules(options) || isExternalModule(file)))) {
        //     if (options.importHelpers) {
        //         // synthesize 'import "tslib"' declaration
        //         imports = [createSyntheticImport(externalHelpersModuleNameText, file)];
        //     }
        //     const jsxImport = getJSXRuntimeImport(getJSXImplicitImportBase(options, file), options);
        //     if (jsxImport) {
        //         // synthesize `import "base/jsx-runtime"` declaration
        //         (imports ||= []).push(createSyntheticImport(jsxImport, file));
        //     }
        // }

        const toPragmas = file.pragmas?.get("this-object") ?? file.pragmas?.get("this_object");
        if (toPragmas) {
            const stringLiteral = thisObjectPragmaToStringLiteral(file, toPragmas);
            if (stringLiteral && stringLiteral.text?.length) {
                imports = append(imports, stringLiteral);
            }
        }
        
        for (const node of file.importCandidates) {
            collectModuleReferences(file, node, /*inAmbientModule*/ false);
        }
 
        collectDynamicImportOrRequireOrJsDocImportCalls(file);        

        file.imports = imports || emptyArray;        
        
        //file.moduleAugmentations = moduleAugmentations || emptyArray;
        file.ambientModuleNames = ambientModules || emptyArray;

        return;        

        // this will do its best to dedupe the imports
        function pushIfNotSeen(moduleName: StringLiteral): void {
            if (!seenImports.has(moduleName.text)) {
                seenImports.add(moduleName.text);
                imports = append(imports, moduleName);
            }
        }
        
        function collectModuleReferences(file: SourceFile, node: Node, inAmbientModule: boolean): void {            
            if (isCloneObjectExpression(node) && node.arguments?.length >= 1 && isStringLiteral(node.arguments[0])) {
                setParentRecursive(node, /*incremental*/ false); // we need parent data on imports before the program is fully bound, so we ensure it's set here                
                pushIfNotSeen(node.arguments[0]);                
            } else if (isInheritDeclaration(node)) {
                if (isStringLiteral(node.inheritClause)) {
                    setParentRecursive(node, /*incremental*/ false); // we need parent data on imports before the program is fully bound, so we ensure it's set here
                    pushIfNotSeen(node.inheritClause);                    
                } else {
                    // do a quick traversal to join strings together
                    const parts = getStringLiteralsTextRecursively(node.inheritClause);                                                
                    const lit = factory.createStringLiteral(parts.join(""));
                    (lit as Mutable<Node>).flags &= ~NodeFlags.Synthesized;
                    setTextRange(lit, node.inheritClause); // copy the text range
                    pushIfNotSeen(lit);                    
                }
            } else if (isIncludeDirective(node)) {
                // imports have string nodes, but we want to use the resolved filename
                // so we'll create a fake string literal based on that
                if (node.fileName) {
                    const lit = factory.createStringLiteral(node.fileName);
                    setTextRangePosEnd(lit, node.content.pos, node.content.end);
                    (lit as Mutable<Node>).flags &= ~NodeFlags.Synthesized;
                    (lit as Mutable<Node>).parent = node; // it will need a parent so that it doesn't break the emitter
                    pushIfNotSeen(lit);
                }                
            } else if (isJsDocImportCandidate(node)) {  
                const typeExp = node.typeExpression;
                const jsDocType = typeExp ? isJSDocTypeLiteral(typeExp) ? typeExp : typeExp.type && isTypePredicateNode(typeExp.type) ? typeExp.type.type : typeExp.type : undefined;
                if (jsDocType) {                        
                    const docTypeLiterals = getStringLiteralsFromTypeNodes(jsDocType) || emptyArray;
                    forEach(docTypeLiterals, lit => {
                        if (isStringLiteral(lit)) {
                            pushIfNotSeen(lit);
                        } else if (isBinaryExpression(lit)) {
                            const parts = getStringLiteralsTextRecursively(lit);
                            if (parts.length) {                       
                                const lit = factory.createStringLiteral(parts.join(""));
                                (lit as Mutable<Node>).flags &= ~NodeFlags.Synthesized;
                                (lit as Mutable<Node>).parent = node; // it will need a parent so that it doesn't break the emitter
                                pushIfNotSeen(lit);                                
                            }   
                        }
                    });                                          
                }                                                
            } else if (isPropertyAccessExpression(node)) {                    
                const parts = getStringLiteralsTextRecursively(node.expression);
                
                if (parts.length) {                       
                    const lit = factory.createStringLiteral(parts.join(""));
                    (lit as Mutable<Node>).flags &= ~NodeFlags.Synthesized;
                    (lit as Mutable<Node>).parent = node; // it will need a parent so that it doesn't break the emitter
                    pushIfNotSeen(lit);
                }                    
            } else if (isNewExpression(node) && !node.expression && node.arguments?.length) {
                const newArg = first(node.arguments);
                const parts = getStringLiteralsTextRecursively(newArg);
                if (parts.length) {                       
                    const lit = factory.createStringLiteral(parts.join(""));
                    (lit as Mutable<Node>).flags &= ~NodeFlags.Synthesized;
                    (lit as Mutable<Node>).parent = node; // it will need a parent so that it doesn't break the emitter
                    pushIfNotSeen(lit);
                }
            } else if (isCallExpression(node) && isIdentifier(node.expression) && node.expression.text === "base_name") {
                // the base_name efun should add the file's own name to the imports
                const baseName = getLibRootedFileName(file.fileName, options);                                    
                const lit = factory.createStringLiteral(baseName);
                (lit as Mutable<Node>).flags &= ~NodeFlags.Synthesized;
                (lit as Mutable<Node>).parent = node; // it will need a parent so that it doesn't break the emitter
                pushIfNotSeen(lit);
            } else if (isNamedObjectTypeNode(node) && node.name) {
                const parts = getStringLiteralsTextRecursively(node.name);
                if (parts.length) {                       
                    const lit = factory.createStringLiteral(parts.join(""));
                    (lit as Mutable<Node>).flags &= ~NodeFlags.Synthesized;
                    (lit as Mutable<Node>).parent = node; // it will need a parent so that it doesn't break the emitter
                    pushIfNotSeen(lit);
                }
            }
        }
                    
        function getStringLiteralsFromTypeNodes(jsDocType: TypeNode): Array<StringLiteral|BinaryExpression> | undefined {
            if (isLiteralTypeNode(jsDocType) && isStringLiteral(jsDocType.literal)) {
                return [jsDocType.literal];
            } else if (isLiteralTypeNode(jsDocType) && isBinaryExpression(jsDocType.literal)) {
                return [jsDocType.literal]; 
            } else if ((isUnionTypeNode(jsDocType) || isIntersectionTypeNode(jsDocType)) && jsDocType.types.length) {
                return flatMap(jsDocType.types, getStringLiteralsFromTypeNodes) as Array<StringLiteral|BinaryExpression>;            
            } else if (isArrayTypeNode(jsDocType) && jsDocType.elementType) {
                return getStringLiteralsFromTypeNodes(jsDocType.elementType);
            }

            return undefined;
        }
        
        

        function collectDynamicImportOrRequireOrJsDocImportCalls(file: SourceFile) {
            // const r = /\@(?:param|type|return[s]?)/g;
            // while (r.exec(file.text) !== null) { // eslint-disable-line no-restricted-syntax
            //     const node = getNodeAtPosition(file, Math.max(0, r.lastIndex - 1));
            //     if (isJSDocNode(node)) {                    
            //         if ((isJSDocParameterTag(node) || isJSDocTypeTag(node) || isJSDocReturnTag(node)) && node.typeExpression) { 
            //             const typeExp = node.typeExpression;
            //             const jsDocType = typeExp.type && isTypePredicateNode(typeExp.type) ? typeExp.type.type : typeExp.type;
            //             if (jsDocType && isLiteralTypeNode(jsDocType) && isStringLiteralLike(jsDocType.literal)) {
            //                 imports = append(imports, jsDocType.literal);
            //             }                                                
            //         } 
            //     } 
            //     // else if (isJavaScriptFile && isJSDocImportTag(node)) {
            //     //     const moduleNameExpr = getExternalModuleName(node);
            //     //     if (moduleNameExpr && isStringLiteral(moduleNameExpr) && moduleNameExpr.text) {
            //     //         setParentRecursive(node, /*incremental*/ false);
            //     //         imports = append(imports, moduleNameExpr);
            //     //     }
            //     // }
            // }
        }

        function isSameFileNameOrjsDoc(node: Node): boolean {
            return !isInExternalFileContext(node) || isJSDocNode(node);
        }

        /** Returns a token if position is in [start-of-leading-trivia, end), includes JSDoc only in JS files */
        function getNodeAtPosition(sourceFile: SourceFile, position: number): Node {
            let current: Node = sourceFile;
            const getContainingChild = (child: Node) => {
                if (isSameFileNameOrjsDoc(child) && child.pos <= position && (position < child.end || (position === child.end && (child.kind === SyntaxKind.EndOfFileToken)))) {
                    return child;
                }
            };
            while (true) {
                const child = hasJSDocNodes(current) && forEach(current.jsDoc, getContainingChild) || forEachChild(current, getContainingChild);
                if (!child) {
                    return current;
                }
                current = child;
            }
        }
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

    function fileReferenceIsEqualTo(a: FileReference, b: FileReference): boolean {
        return a.fileName === b.fileName;
    }

    function moduleNameIsEqualTo(a: StringLiteralLike | Identifier, b: StringLiteralLike | Identifier): boolean {
        return a.kind === SyntaxKind.Identifier
            ? b.kind === SyntaxKind.Identifier && a.text === b.text
            : b.kind === SyntaxKind.StringLiteral && a.text === b.text;
    }

    function canReuseProjectReferences(): boolean {
        return !forEachProjectReference(
            oldProgram!.getProjectReferences(),
            oldProgram!.getResolvedProjectReferences(),
            (oldResolvedRef, parent, index) => {
                const newRef = (parent ? parent.commandLine.projectReferences : projectReferences)![index];
                const newResolvedRef = parseProjectReferenceConfigFile(newRef);
                if (oldResolvedRef) {
                    // Resolved project reference has gone missing or changed
                    return !newResolvedRef ||
                        newResolvedRef.sourceFile !== oldResolvedRef.sourceFile ||
                        !arrayIsEqualTo(oldResolvedRef.commandLine.fileNames, newResolvedRef.commandLine.fileNames);
                }
                else {
                    // A previously-unresolved reference may be resolved now
                    return newResolvedRef !== undefined;
                }
            },
            (oldProjectReferences, parent) => {
                // If array of references is changed, we cant resue old program
                const newReferences = parent ? getResolvedProjectReferenceByPath(parent.sourceFile.path)!.commandLine.projectReferences : projectReferences;
                return !arrayIsEqualTo(oldProjectReferences, newReferences, projectReferenceIsEqualTo);
            },
        );
    }
    
    function tryReuseStructureFromOldProgram(): StructureIsReused {
        if (!oldProgram) {
            return StructureIsReused.Not;
        }

        // check properties that can affect structure of the program or module resolution strategy
        // if any of these properties has changed - structure cannot be reused
        const oldOptions = oldProgram.getCompilerOptions();
        if (changesAffectModuleResolution(oldOptions, options)) {
            return StructureIsReused.Not;
        }

        // there is an old program, check if we can reuse its structure
        const oldRootNames = oldProgram.getRootFileNames();
        if (!arrayIsEqualTo(oldRootNames, rootNames)) {
            return StructureIsReused.Not;
        }

        // is the set of parsable files has changed, we cant reuse the structure
        const oldParsedNamed = oldProgram.getParseableFiles();
        if (parseableFiles.size != oldParsedNamed.size) {
            return StructureIsReused.Not;
        }

        // Check if any referenced project tsconfig files are different
        if (!canReuseProjectReferences()) {
            return StructureIsReused.Not;
        }
        if (projectReferences) {
            resolvedProjectReferences = projectReferences.map(parseProjectReferenceConfigFile);
        }

        // check if program source files has changed in the way that can affect structure of the program
        const newSourceFiles: SourceFile[] = [];
        const modifiedSourceFiles: SourceFile[] = [];
        structureIsReused = StructureIsReused.Completely;

        // If the missing file paths are now present, it can change the progam structure,
        // and hence cant reuse the structure.
        // This is same as how we dont reuse the structure if one of the file from old program is now missing
        if (forEachEntry(oldProgram.getMissingFilePaths(), missingFileName => host.fileExists(missingFileName))) {
            return StructureIsReused.Not;
        }

        const oldSourceFiles = oldProgram.getSourceFiles();
        const enum SeenPackageName {
            Exists,
            Modified,
        }
        const seenPackageNames = new Map<string, SeenPackageName>();
        
        for (const oldSourceFile of oldSourceFiles) {
            const sourceFileOptions = getCreateSourceFileOptions(oldSourceFile.fileName, false, moduleResolutionCache, host, options, oldProgram.getConfigDefines());            
            let newSourceFile = host.getSourceFileByPath
                ? host.getSourceFileByPath(oldSourceFile.fileName, oldSourceFile.resolvedPath, sourceFileOptions, /*onError*/ undefined, shouldCreateNewSourceFile)
                : host.getSourceFile(oldSourceFile.fileName, sourceFileOptions, /*onError*/ undefined, shouldCreateNewSourceFile); // TODO: GH#18217

            if (!newSourceFile) {
                return StructureIsReused.Not;
            }
            // newSourceFile.packageJsonLocations = sourceFileOptions.packageJsonLocations?.length ? sourceFileOptions.packageJsonLocations : undefined;
            // newSourceFile.packageJsonScope = sourceFileOptions.packageJsonScope;

            // Debug.assert(!newSourceFile.redirectInfo, "Host should not return a redirect source file from `getSourceFile`");

            let fileChanged: boolean;
            // if (oldSourceFile.redirectInfo) {
            //     // We got `newSourceFile` by path, so it is actually for the unredirected file.
            //     // This lets us know if the unredirected file has changed. If it has we should break the redirect.
            //     if (newSourceFile !== oldSourceFile.redirectInfo.unredirected) {
            //         // Underlying file has changed. Might not redirect anymore. Must rebuild program.
            //         return StructureIsReused.Not;
            //     }
            //     fileChanged = false;
            //     newSourceFile = oldSourceFile; // Use the redirect.
            // }
            // else if (oldProgram.redirectTargetsMap.has(oldSourceFile.path)) {
            //     // If a redirected-to source file changes, the redirect may be broken.
            //     if (newSourceFile !== oldSourceFile) {
            //         return StructureIsReused.Not;
            //     }
            //     fileChanged = false;
            // }
            // else {
                fileChanged = newSourceFile !== oldSourceFile;
            // }

            // Since the project references havent changed, its right to set originalFileName and resolvedPath here
            newSourceFile.path = oldSourceFile.path;
            newSourceFile.originalFileName = oldSourceFile.originalFileName;
            newSourceFile.resolvedPath = oldSourceFile.resolvedPath;
            newSourceFile.fileName = oldSourceFile.fileName;

            // const packageName = oldProgram.sourceFileToPackageName.get(oldSourceFile.path);
            // if (packageName !== undefined) {
            //     // If there are 2 different source files for the same package name and at least one of them changes,
            //     // they might become redirects. So we must rebuild the program.
            //     const prevKind = seenPackageNames.get(packageName);
            //     const newKind = fileChanged ? SeenPackageName.Modified : SeenPackageName.Exists;
            //     if ((prevKind !== undefined && newKind === SeenPackageName.Modified) || prevKind === SeenPackageName.Modified) {
            //         return StructureIsReused.Not;
            //     }
            //     seenPackageNames.set(packageName, newKind);
            // }

            if (fileChanged) {
                if (oldSourceFile.impliedNodeFormat !== newSourceFile.impliedNodeFormat) {
                    structureIsReused = StructureIsReused.SafeModules;
                }
                // The `newSourceFile` object was created for the new program.
                else if (!arrayIsEqualTo(oldSourceFile.libReferenceDirectives, newSourceFile.libReferenceDirectives, fileReferenceIsEqualTo)) {
                    // 'lib' references has changed. Matches behavior in changesAffectModuleResolution
                    structureIsReused = StructureIsReused.SafeModules;
                }
                else if (oldSourceFile.hasNoDefaultLib !== newSourceFile.hasNoDefaultLib) {
                    // value of no-default-lib has changed
                    // this will affect if default library is injected into the list of files
                    structureIsReused = StructureIsReused.SafeModules;
                }
                // check tripleslash references
                else if (!arrayIsEqualTo(oldSourceFile.referencedFiles, newSourceFile.referencedFiles, fileReferenceIsEqualTo)) {
                    // tripleslash references has changed
                    structureIsReused = StructureIsReused.SafeModules;
                }
                else {
                    // check imports and module augmentations
                    collectExternalModuleReferences(newSourceFile);
                    if (!arrayIsEqualTo(oldSourceFile.imports, newSourceFile.imports, moduleNameIsEqualTo)) {
                        // imports has changed
                        structureIsReused = StructureIsReused.SafeModules;
                    }
                    // else if (!arrayIsEqualTo(oldSourceFile.moduleAugmentations, newSourceFile.moduleAugmentations, moduleNameIsEqualTo)) {
                    //     // moduleAugmentations has changed
                    //     structureIsReused = StructureIsReused.SafeModules;
                    // }
                    // else if ((oldSourceFile.flags & NodeFlags.PermanentlySetIncrementalFlags) !== (newSourceFile.flags & NodeFlags.PermanentlySetIncrementalFlags)) {
                    //     // dynamicImport has changed
                    //     structureIsReused = StructureIsReused.SafeModules;
                    // }
                    else if (!arrayIsEqualTo(oldSourceFile.typeReferenceDirectives, newSourceFile.typeReferenceDirectives, fileReferenceIsEqualTo)) {
                        // 'types' references has changed
                        structureIsReused = StructureIsReused.SafeModules;
                    }
                }

                // tentatively approve the file
                modifiedSourceFiles.push(newSourceFile);
            }
            else if (hasInvalidatedResolutions(oldSourceFile.path)) {
                // 'module/types' references could have changed
                structureIsReused = StructureIsReused.SafeModules;

                // add file to the modified list so that we will resolve it later
                modifiedSourceFiles.push(newSourceFile);
            }
            else {
                for (const moduleName of oldSourceFile.ambientModuleNames) {
                    ambientModuleNameToUnmodifiedFileName.set(moduleName, oldSourceFile.fileName);
                }
            }

            // if file has passed all checks it should be safe to reuse it
            newSourceFiles.push(newSourceFile);
        }

        if (structureIsReused !== StructureIsReused.Completely) {
            return structureIsReused;
        }

        // try to verify results of module resolution
        for (const newSourceFile of modifiedSourceFiles) {
            const moduleNames = getModuleNames(newSourceFile);
            const resolutions = resolveModuleNamesReusingOldState(moduleNames, newSourceFile);
            (resolvedModulesProcessing ??= new Map()).set(newSourceFile.path, resolutions);
            // ensure that module resolution results are still correct
            const resolutionsChanged = hasChangesInResolutions(
                moduleNames,
                resolutions,
                name => oldProgram.getResolvedModule(newSourceFile, name.text, getModeForUsageLocation(newSourceFile, name)),
                moduleResolutionIsEqualTo,
            );
            if (resolutionsChanged) structureIsReused = StructureIsReused.SafeModules;
            const typesReferenceDirectives = newSourceFile.typeReferenceDirectives;
            const typeReferenceResolutions = undefined;// resolveTypeReferenceDirectiveNamesReusingOldState(typesReferenceDirectives, newSourceFile);
            (resolvedTypeReferenceDirectiveNamesProcessing ??= new Map()).set(newSourceFile.path, typeReferenceResolutions);
            // ensure that types resolutions are still correct
            // const typeReferenceResolutionsChanged = hasChangesInResolutions(
            //     typesReferenceDirectives,
            //     typeReferenceResolutions,
            //     name => oldProgram.getResolvedTypeReferenceDirective(newSourceFile, getTypeReferenceResolutionName(name), getModeForFileReference(name, newSourceFile.impliedNodeFormat)),
            //     typeDirectiveIsEqualTo,
            // );
            // if (typeReferenceResolutionsChanged) structureIsReused = StructureIsReused.SafeModules;
        }

        if (structureIsReused !== StructureIsReused.Completely) {
            return structureIsReused;
        }

        if (changesAffectingProgramStructure(oldOptions, options)) {
            return StructureIsReused.SafeModules;
        }

        if (
            oldProgram.resolvedLibReferences &&
            forEachEntry(oldProgram.resolvedLibReferences, (resolution, libFileName) => pathForLibFileWorker(libFileName).actual !== resolution.actual)
        ) {
            return StructureIsReused.SafeModules;
        }

        // if (host.hasChangedAutomaticTypeDirectiveNames) {
        //     if (host.hasChangedAutomaticTypeDirectiveNames()) return StructureIsReused.SafeModules;
        // }
        // else {
        //     automaticTypeDirectiveNames = getAutomaticTypeDirectiveNames(options, host);
        //     if (!arrayIsEqualTo(oldProgram.getAutomaticTypeDirectiveNames(), automaticTypeDirectiveNames)) return StructureIsReused.SafeModules;
        // }
        missingFileNames = oldProgram.getMissingFilePaths();

        // update fileName -> file mapping
        Debug.assert(newSourceFiles.length === oldProgram.getSourceFiles().length);
        for (const newSourceFile of newSourceFiles) {
            filesByName.set(newSourceFile.path, newSourceFile);
        }
        const oldFilesByNameMap = oldProgram.getFilesByNameMap();
        oldFilesByNameMap.forEach((oldFile, path) => {
            if (!oldFile) {
                filesByName.set(path, oldFile);
                return;
            }
            if (oldFile.path === path) {
                // Set the file as found during node modules search if it was found that way in old program,                
                if (oldProgram.isSourceFileFromExternalLibrary(oldFile)) {
                    sourceFilesFoundSearchingNodeModules.set(oldFile.path, true);
                }
                return;
            }
            filesByName.set(path, filesByName.get(oldFile.path));
        });

        files = newSourceFiles;
        fileReasons = oldProgram.getFileIncludeReasons();
        fileProcessingDiagnostics = oldProgram.getFileProcessingDiagnostics();
        // automaticTypeDirectiveNames = oldProgram.getAutomaticTypeDirectiveNames();
        // automaticTypeDirectiveResolutions = oldProgram.getAutomaticTypeDirectiveResolutions();

        // sourceFileToPackageName = oldProgram.sourceFileToPackageName;
        // redirectTargetsMap = oldProgram.redirectTargetsMap;
        // usesUriStyleNodeCoreModules = oldProgram.usesUriStyleNodeCoreModules;
        resolvedModules = oldProgram.resolvedModules;
        // resolvedTypeReferenceDirectiveNames = oldProgram.resolvedTypeReferenceDirectiveNames;
        resolvedLibReferences = oldProgram.resolvedLibReferences;
        packageMap = oldProgram.getCurrentPackagesMap();
        configDefines = oldProgram.getConfigDefines();

        return StructureIsReused.Completely;
    }

    function parseProjectReferenceConfigFile(ref: ProjectReference): ResolvedProjectReference | undefined {
        Debug.fail("implement me");
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
    const getCanonicalFileName = createGetCanonicalFileName(system.useCaseSensitiveFileNames);
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
        getSourceFile: createGetSourceFile(fileName => compilerHost.readFile(fileName), setParentNodes, options.driverType),
        getDefaultLibLocation,
        getDefaultLibFileName: options => tryGetLocalizedLibPath(options),
        getSourceTextFromSnapshot: fileName => system.readFile(fileName),
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
        onAllFilesNeedReparse: (fileNames: string[]) => noop,        
        getParseableFiles: () => undefined,
    };
    return compilerHost;
}


/** @internal */
export function createGetSourceFile(
    readFile: ProgramHost<any>["readFile"],        
    setParentNodes: boolean | undefined,    
    driverType: LanguageVariant
): CompilerHost["getSourceFile"] {
    return (fileName, languageVersionOrOptions, onError) => {
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
        
        return text !== undefined ? createSourceFile(fileName, text, languageVersionOrOptions, setParentNodes, ScriptKind.LPC, driverType) : undefined;
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
    const oldOptions = program.getCompilerOptions();
    return optionsHaveChanges(oldOptions, newOptions, sourceFileAffectingCompilerOptions) || 
        changesAffectLibCompilation(oldOptions, newOptions);
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

function getModuleNames({ imports }: SourceFile): StringLiteral[] {
    const res = imports.map(i => i);
    // for (const aug of moduleAugmentations) {
    //     if (aug.kind === SyntaxKind.StringLiteral) {
    //         res.push(aug);
    //     }
    //     // Do nothing if it's an Identifier; we don't need to do module resolution for `declare global`.
    // }
    return res;
}

const emptyResolution: ResolvedModuleWithFailedLookupLocations & ResolvedTypeReferenceDirectiveWithFailedLookupLocations = {
    resolvedModule: undefined,
    resolvedTypeReferenceDirective: undefined,
};

/** @internal */
export interface ResolutionNameAndModeGetter<Entry, SourceFile> {
    getName(entry: Entry): string;
    getMode(entry: Entry, file: SourceFile, compilerOptions: CompilerOptions): ResolutionMode;
}


/** @internal */
export interface ResolutionLoader<Entry, Resolution, SourceFile> {
    nameAndMode: ResolutionNameAndModeGetter<Entry, SourceFile>;
    resolve(name: string, mode: ResolutionMode): Resolution;
}


/** @internal */
export function loadWithModeAwareCache<Entry, SourceFile, ResolutionCache, Resolution>(
    entries: readonly Entry[],
    containingFile: string,
    redirectedReference: ResolvedProjectReference | undefined,
    options: CompilerOptions,
    containingSourceFile: SourceFile,
    host: ModuleResolutionHost,
    resolutionCache: ResolutionCache | undefined,
    createLoader: (
        containingFile: string,
        redirectedReference: ResolvedProjectReference | undefined,
        options: CompilerOptions,
        host: ModuleResolutionHost,
        resolutionCache: ResolutionCache | undefined,
    ) => ResolutionLoader<Entry, Resolution, SourceFile>,
): readonly Resolution[] {
    if (entries.length === 0) return emptyArray;
    const resolutions: Resolution[] = [];
    const cache = new Map<ModeAwareCacheKey, Resolution>();
    const loader = createLoader(containingFile, redirectedReference, options, host, resolutionCache);
    for (const entry of entries) {
        const name = loader.nameAndMode.getName(entry);
        const mode = loader.nameAndMode.getMode(entry, containingSourceFile, redirectedReference?.commandLine.options || options);
        const key = createModeAwareCacheKey(name, mode);
        let result = cache.get(key);
        if (!result) {
            cache.set(key, result = loader.resolve(name, mode));
        }
        resolutions.push(result);
    }
    return resolutions;
}

/**
 * Use `program.getModeForUsageLocation`, which retrieves the correct `compilerOptions`, instead of this function whenever possible.
 * Calculates the final resolution mode for a given module reference node. This is the resolution mode explicitly provided via import
 * attributes, if present, or the syntax the usage would have if emitted to JavaScript. In `--module node16` or `nodenext`, this may
 * depend on the file's `impliedNodeFormat`. In `--module preserve`, it depends only on the input syntax of the reference. In other
 * `module` modes, when overriding import attributes are not provided, this function returns `undefined`, as the result would have no
 * impact on module resolution, emit, or type checking.
 * @param file The file the import or import-like reference is contained within
 * @param usage The module reference string
 * @param compilerOptions The compiler options for the program that owns the file. If the file belongs to a referenced project, the compiler options
 * should be the options of the referenced project, not the referencing project.
 * @returns The final resolution mode of the import
 */
export function getModeForUsageLocation(file: { impliedNodeFormat?: ResolutionMode; }, usage: StringLiteral, compilerOptions: CompilerOptions) {
    //return getModeForUsageLocationWorker(file, usage, compilerOptions);
    return ModuleKind.LPC;
}

// function getModeForUsageLocationWorker(file: { impliedNodeFormat?: ResolutionMode; }, usage: StringLiteral, compilerOptions?: CompilerOptions) {
    // if (isImportDeclaration(usage.parent) || isExportDeclaration(usage.parent) || isJSDocImportTag(usage.parent)) {
    //     const isTypeOnly = isExclusivelyTypeOnlyImportOrExport(usage.parent);
    //     if (isTypeOnly) {
    //         const override = getResolutionModeOverride(usage.parent.attributes);
    //         if (override) {
    //             return override;
    //         }
    //     }
    // }
    // if (usage.parent.parent && isImportTypeNode(usage.parent.parent)) {
    //     const override = getResolutionModeOverride(usage.parent.parent.attributes);
    //     if (override) {
    //         return override;
    //     }
    // }
    // if (compilerOptions && getEmitModuleKind(compilerOptions) === ModuleKind.Preserve) {
    //     return (usage.parent.parent && isImportEqualsDeclaration(usage.parent.parent) || isRequireCall(usage.parent, /*requireStringLiteralArgument*/ false))
    //         ? ModuleKind.CommonJS
    //         : ModuleKind.ESNext;
    // }
    // if (file.impliedNodeFormat === undefined) return undefined;
    // if (file.impliedNodeFormat !== ModuleKind.ESNext) {
    //     // in cjs files, import call expressions are esm format, otherwise everything is cjs
    //     return isImportCall(walkUpParenthesizedExpressions(usage.parent)) ? ModuleKind.ESNext : ModuleKind.CommonJS;
    // }
    // in esm files, import=require statements are cjs format, otherwise everything is esm
    // imports are only parent'd up to their containing declaration/expression, so access farther parents with care
    // const exprParentParent = walkUpParenthesizedExpressions(usage.parent)?.parent;
    // return exprParentParent && isImportEqualsDeclaration(exprParentParent) ? ModuleKind.CommonJS : ModuleKind.ESNext;
// }

function getModuleResolutionName(literal: StringLiteral) {
    return literal.text;
}

/** @internal */
export const moduleResolutionNameAndModeGetter: ResolutionNameAndModeGetter<StringLiteral, SourceFile> = {
    getName: getModuleResolutionName,
    getMode: (entry, file, compilerOptions) => getModeForUsageLocation(file, entry, compilerOptions) as ModuleKind.LPC,
};


/** @internal */
export function createModuleResolutionLoader(
    containingFile: string,
    redirectedReference: ResolvedProjectReference | undefined,
    options: CompilerOptions,
    host: ModuleResolutionHost,
    cache: ModuleResolutionCache | undefined,
): ResolutionLoader<StringLiteral, ResolvedModuleWithFailedLookupLocations, SourceFile> {
    return {
        nameAndMode: moduleResolutionNameAndModeGetter,
        resolve: (moduleName, resolutionMode) =>
            resolveModuleName(
                moduleName,
                containingFile,
                options,
                host,
                cache,
                redirectedReference,
                resolutionMode,
            ),
    };
}


/**
 * A function for determining if a given file is esm or cjs format, assuming modern node module resolution rules, as configured by the
 * `options` parameter.
 *
 * @param fileName The file name to check the format of (it need not exist on disk)
 * @param [packageJsonInfoCache] A cache for package file lookups - it's best to have a cache when this function is called often
 * @param host The ModuleResolutionHost which can perform the filesystem lookups for package json data
 * @param options The compiler options to perform the analysis under - relevant options are `moduleResolution` and `traceResolution`
 * @returns `undefined` if the path has no relevant implied format, `ModuleKind.ESNext` for esm format, and `ModuleKind.CommonJS` for cjs format
 */
export function getImpliedNodeFormatForFile(fileName: string, packageJsonInfoCache: PackageJsonInfoCache | undefined, host: ModuleResolutionHost, options: CompilerOptions): ResolutionMode {
    return ModuleKind.LPC;
    // const result = getImpliedNodeFormatForFileWorker(fileName, packageJsonInfoCache, host, options);
    // return typeof result === "object" ? result.impliedNodeFormat : result;
}

/** @internal */
export interface ReferenceFileLocation {
    file: SourceFile;
    pos: number;
    end: number;
    packageId: PackageId | undefined;
}

/** @internal */
export interface SyntheticReferenceFileLocation {
    file: SourceFile;
    packageId: PackageId | undefined;
    text: string;
}

/** @internal */
export function getReferencedFileLocation(program: Program, ref: ReferencedFile): ReferenceFileLocation | SyntheticReferenceFileLocation {
    const file = Debug.checkDefined(program.getSourceFileByPath(ref.file));
    const { kind, index } = ref;
    let pos: number | undefined, end: number | undefined, packageId: PackageId | undefined;
    switch (kind) {
        case FileIncludeKind.Import:
            const importLiteral = getModuleNameStringLiteralAt(file, index);
            packageId = program.getResolvedModuleFromModuleSpecifier(importLiteral, file)?.resolvedModule?.packageId;
            if (importLiteral.pos === -1) return { file, packageId, text: importLiteral.text };
            pos = skipTrivia(file.text, importLiteral.pos);
            end = importLiteral.end;
            break;
        case FileIncludeKind.ReferenceFile:
            ({ pos, end } = file.referencedFiles[index]);
            break;
        case FileIncludeKind.TypeReferenceDirective:
            ({ pos, end } = file.typeReferenceDirectives[index]);
            packageId = program.getResolvedTypeReferenceDirectiveFromTypeReferenceDirective(file.typeReferenceDirectives[index], file)?.resolvedTypeReferenceDirective?.packageId;
            break;
        case FileIncludeKind.LibReferenceDirective:
            ({ pos, end } = file.libReferenceDirectives[index]);
            break;
        default:
            return Debug.assertNever(kind);
    }
    return { file, pos, end, packageId };
}

/**
 * Subset of a SourceFile used to calculate index-based resolutions
 * This includes some internal fields, so unless you have very good reason,
 * (and are willing to use some less stable internals) you should probably just pass a SourceFile.
 *
 * @internal
 */
export interface SourceFileImportsList {
    /** @internal */ imports: SourceFile["imports"];    
    impliedNodeFormat?: ResolutionMode;
}


/** @internal */
export function getModuleNameStringLiteralAt({ imports }: SourceFileImportsList, index: number): StringLiteralLike {
    if (index < imports.length) return imports[index];
    let augIndex = imports.length;   
    Debug.fail("should never ask for module name at index higher than possible module name");
}

/** @internal */
export function isReferenceFileLocation(location: ReferenceFileLocation | SyntheticReferenceFileLocation): location is ReferenceFileLocation {
    return (location as ReferenceFileLocation).pos !== undefined;
}

/**
 * Returns the target config filename of a project reference.
 * Note: The file might not exist.
 */
export function resolveProjectReferencePath(ref: ProjectReference): ResolvedConfigFileName {
    return resolveConfigFileProjectName(ref.path);
}

export interface FormatDiagnosticsHost {
    getCurrentDirectory(): string;
    getCanonicalFileName(fileName: string): string;
    getNewLine(): string;
}


export function formatDiagnostic(diagnostic: Diagnostic, host: FormatDiagnosticsHost): string {
    const errorMessage = `${diagnosticCategoryName(diagnostic)} LPC${diagnostic.code}: ${flattenDiagnosticMessageText(diagnostic.messageText, host.getNewLine())}${host.getNewLine()}`;

    if (diagnostic.file) {
        const { line, character } = getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start!); // TODO: GH#18217
        const fileName = diagnostic.file.fileName;
        const relativeFileName = convertToRelativePath(fileName, host.getCurrentDirectory(), fileName => host.getCanonicalFileName(fileName));
        return `${relativeFileName}(${line + 1},${character + 1}): ` + errorMessage;
    }

    return errorMessage;
}

/** @internal */
export enum ForegroundColorEscapeSequences {
    Grey = "\u001b[90m",
    Red = "\u001b[91m",
    Yellow = "\u001b[93m",
    Blue = "\u001b[94m",
    Cyan = "\u001b[96m",
    Green = "\u001b[92m",
}
const gutterStyleSequence = "\u001b[7m";
const gutterSeparator = " ";
const resetEscapeSequence = "\u001b[0m";
const ellipsis = "...";
const halfIndent = "  ";
const indent = "    ";
function getCategoryFormat(category: DiagnosticCategory): ForegroundColorEscapeSequences {
    switch (category) {
        case DiagnosticCategory.Error:
            return ForegroundColorEscapeSequences.Red;
        case DiagnosticCategory.Warning:
            return ForegroundColorEscapeSequences.Yellow;
        case DiagnosticCategory.Suggestion:
            return Debug.fail("Should never get an Info diagnostic on the command line.");
        case DiagnosticCategory.Message:
            return ForegroundColorEscapeSequences.Blue;
    }
}


/** @internal */
export function formatColorAndReset(text: string, formatStyle: string) {
    return formatStyle + text + resetEscapeSequence;
}

export function getPreEmitDiagnostics(program: Program, sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly Diagnostic[];
/** @internal */ export function getPreEmitDiagnostics(program: BuilderProgram, sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly Diagnostic[]; // eslint-disable-line @typescript-eslint/unified-signatures
export function getPreEmitDiagnostics(program: Program | BuilderProgram, sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly Diagnostic[] {
    let diagnostics: Diagnostic[] | undefined;
    diagnostics = addRange(diagnostics, program.getConfigFileParsingDiagnostics());
    diagnostics = addRange(diagnostics, program.getOptionsDiagnostics(cancellationToken));
    diagnostics = addRange(diagnostics, program.getSyntacticDiagnostics(sourceFile, cancellationToken));
    diagnostics = addRange(diagnostics, program.getGlobalDiagnostics(cancellationToken));
    diagnostics = addRange(diagnostics, program.getSemanticDiagnostics(sourceFile, cancellationToken));

    return sortAndDeduplicateDiagnostics(diagnostics || emptyArray);
}

function getLibNameFromLibReference(libReference: FileReference) {
    return toFileNameLowerCase(libReference.fileName);
}

/**
 * Determines if program structure is upto date or needs to be recreated
 *
 * @internal
 */
export function isProgramUptoDate(
    program: Program | undefined,
    rootFileNames: string[],
    newOptions: CompilerOptions,
    getSourceVersion: (path: Path, fileName: string) => string | undefined,
    fileExists: (fileName: string) => boolean,
    hasInvalidatedResolutions: HasInvalidatedResolutions,
    hasInvalidatedLibResolutions: HasInvalidatedLibResolutions,
    hasChangedAutomaticTypeDirectiveNames: HasChangedAutomaticTypeDirectiveNames | undefined,
    getParsedCommandLine: (fileName: string) => ParsedCommandLine | undefined,
    projectReferences: readonly ProjectReference[] | undefined,
    parseableFilePaths: ReadonlySet<Path>
): boolean {
    // If we haven't created a program yet or have changed automatic type directives, then it is not up-to-date
    if (!program || hasChangedAutomaticTypeDirectiveNames?.()) return false;

    // If root file names don't match
    if (!arrayIsEqualTo(program.getRootFileNames(), rootFileNames)) return false;
    
    // quick check to see if size of parseable files has changed
    if (parseableFilePaths?.size !== program.getParseableFiles()?.size) return false;
    // check if any parseable files do not have valid sourcefiles yet
    let needsToParseNewFiles = false;
    parseableFilePaths.forEach(path => {
        needsToParseNewFiles ||= !program.getSourceFileByPath(path);
    });
    if (needsToParseNewFiles) return false;

    let seenResolvedRefs: ResolvedProjectReference[] | undefined;

    // If project references don't match
    if (!arrayIsEqualTo(program.getProjectReferences(), projectReferences, projectReferenceUptoDate)) return false;
        
    // If any file is not up-to-date, then the whole program is not up-to-date
    if (program.getSourceFiles().some(sourceFileNotUptoDate)) return false;

    // If any of the missing file paths are now created
    const missingPaths = program.getMissingFilePaths();
    if (missingPaths && forEachEntry(missingPaths, fileExists)) return false;

    const currentOptions = program.getCompilerOptions();
    // If the compilation settings do no match, then the program is not up-to-date
    if (!compareDataObjects(currentOptions, newOptions)) return false;

    // If library resolution is invalidated, then the program is not up-to-date
    if (program.resolvedLibReferences && forEachEntry(program.resolvedLibReferences, (_value, libFileName) => hasInvalidatedLibResolutions(libFileName))) return false;

    // If everything matches but the text of config file is changed,
    // error locations can change for program options, so update the program
    if (currentOptions.configFile && newOptions.configFile) return currentOptions.configFile.text === newOptions.configFile.text;

    return true;

    function sourceFileNotUptoDate(sourceFile: SourceFile) {
        return !sourceFileVersionUptoDate(sourceFile) ||
            hasInvalidatedResolutions(sourceFile.path);
    }

    function sourceFileVersionUptoDate(sourceFile: SourceFile) {
        return sourceFile.version === getSourceVersion(sourceFile.resolvedPath, sourceFile.fileName);
    }

    function projectReferenceUptoDate(oldRef: ProjectReference, newRef: ProjectReference, index: number) {
        return projectReferenceIsEqualTo(oldRef, newRef) &&
            resolvedProjectReferenceUptoDate(program!.getResolvedProjectReferences()![index], oldRef);
    }

    function resolvedProjectReferenceUptoDate(oldResolvedRef: ResolvedProjectReference | undefined, oldRef: ProjectReference): boolean {
        if (oldResolvedRef) {
            // Assume true
            if (contains(seenResolvedRefs, oldResolvedRef)) return true;

            const refPath = resolveProjectReferencePath(oldRef);
            const newParsedCommandLine = getParsedCommandLine(refPath);

            // Check if config file exists
            if (!newParsedCommandLine) return false;

            // If change in source file
            if (oldResolvedRef.commandLine.options.configFile !== newParsedCommandLine.options.configFile) return false;

            // check file names
            if (!arrayIsEqualTo(oldResolvedRef.commandLine.fileNames, newParsedCommandLine.fileNames)) return false;

            // Add to seen before checking the referenced paths of this config file
            (seenResolvedRefs || (seenResolvedRefs = [])).push(oldResolvedRef);

            // If child project references are upto date, this project reference is uptodate
            return !forEach(oldResolvedRef.references, (childResolvedRef, index) => !resolvedProjectReferenceUptoDate(childResolvedRef, oldResolvedRef.commandLine.projectReferences![index]));
        }

        // In old program, not able to resolve project reference path,
        // so if config file doesnt exist, it is uptodate.
        const refPath = resolveProjectReferencePath(oldRef);
        return !getParsedCommandLine(refPath);
    }
}

export function findConfigFile(searchPath: string, fileExists: (fileName: string) => boolean, configName = "lpc-config.json"): string | undefined {    
    return forEachAncestorDirectory(searchPath, ancestor => {
        const fileName = combinePaths(ancestor, configName);
        console.log(`Checking for ${fileName}`);
        return fileExists(fileName) ? fileName : undefined;
    });
}


/** @internal */
export function formatLocation(file: SourceFileBase, start: number, host: FormatDiagnosticsHost, color = formatColorAndReset) {
    const { line: firstLine, character: firstLineChar } = getLineAndCharacterOfPosition(file, start); // TODO: GH#18217
    const relativeFileName = host ? convertToRelativePath(file.fileName, host.getCurrentDirectory(), fileName => host.getCanonicalFileName(fileName)) : file.fileName;

    let output = "";
    output += color(relativeFileName, ForegroundColorEscapeSequences.Cyan);
    output += ":";
    output += color(`${firstLine + 1}`, ForegroundColorEscapeSequences.Yellow);
    output += ":";
    output += color(`${firstLineChar + 1}`, ForegroundColorEscapeSequences.Yellow);
    return output;
}

export function formatDiagnosticsWithColorAndContext(diagnostics: readonly Diagnostic[], host: FormatDiagnosticsHost): string {
    let output = "";
    for (const diagnostic of diagnostics) {
        if (diagnostic.file) {
            const { file, start } = diagnostic;
            output += formatLocation(file, start!, host); // TODO: GH#18217
            output += " - ";
        }

        output += formatColorAndReset(diagnosticCategoryName(diagnostic), getCategoryFormat(diagnostic.category));
        output += formatColorAndReset(` ${diagnosticPrefix}${diagnostic.code}: `, ForegroundColorEscapeSequences.Grey);
        output += flattenDiagnosticMessageText(diagnostic.messageText, host.getNewLine());

        if (diagnostic.file && diagnostic.code !== Diagnostics.File_appears_to_be_binary.code) {
            output += host.getNewLine();
            output += formatCodeSpan(diagnostic.file, diagnostic.start!, diagnostic.length!, "", getCategoryFormat(diagnostic.category), host); // TODO: GH#18217
        }
        if (diagnostic.relatedInformation) {
            output += host.getNewLine();
            for (const { file, start, length, messageText } of diagnostic.relatedInformation) {
                if (file) {
                    output += host.getNewLine();
                    output += halfIndent + formatLocation(file, start!, host); // TODO: GH#18217
                    output += formatCodeSpan(file, start!, length!, indent, ForegroundColorEscapeSequences.Cyan, host); // TODO: GH#18217
                }
                output += host.getNewLine();
                output += indent + flattenDiagnosticMessageText(messageText, host.getNewLine());
            }
        }
        output += host.getNewLine();
    }
    return output;
}

function formatCodeSpan(file: SourceFileBase, start: number, length: number, indent: string, squiggleColor: ForegroundColorEscapeSequences, host: FormatDiagnosticsHost) {
    const { line: firstLine, character: firstLineChar } = getLineAndCharacterOfPosition(file, start);
    const { line: lastLine, character: lastLineChar } = getLineAndCharacterOfPosition(file, start + length);
    const lastLineInFile = getLineAndCharacterOfPosition(file, file.text.length).line;

    const hasMoreThanFiveLines = (lastLine - firstLine) >= 4;
    let gutterWidth = (lastLine + 1 + "").length;
    if (hasMoreThanFiveLines) {
        gutterWidth = Math.max(ellipsis.length, gutterWidth);
    }

    let context = "";
    for (let i = firstLine; i <= lastLine; i++) {
        context += host.getNewLine();
        // If the error spans over 5 lines, we'll only show the first 2 and last 2 lines,
        // so we'll skip ahead to the second-to-last line.
        if (hasMoreThanFiveLines && firstLine + 1 < i && i < lastLine - 1) {
            context += indent + formatColorAndReset(ellipsis.padStart(gutterWidth), gutterStyleSequence) + gutterSeparator + host.getNewLine();
            i = lastLine - 1;
        }

        const lineStart = getPositionOfLineAndCharacter(file, i, 0);
        const lineEnd = i < lastLineInFile ? getPositionOfLineAndCharacter(file, i + 1, 0) : file.text.length;
        let lineContent = file.text.slice(lineStart, lineEnd);
        lineContent = lineContent.trimEnd(); // trim from end
        lineContent = lineContent.replace(/\t/g, " "); // convert tabs to single spaces

        // Output the gutter and the actual contents of the line.
        context += indent + formatColorAndReset((i + 1 + "").padStart(gutterWidth), gutterStyleSequence) + gutterSeparator;
        context += lineContent + host.getNewLine();

        // Output the gutter and the error span for the line using tildes.
        context += indent + formatColorAndReset("".padStart(gutterWidth), gutterStyleSequence) + gutterSeparator;
        context += squiggleColor;
        if (i === firstLine) {
            // If we're on the last line, then limit it to the last character of the last line.
            // Otherwise, we'll just squiggle the rest of the line, giving 'slice' no end position.
            const lastCharForLine = i === lastLine ? lastLineChar : undefined;

            context += lineContent.slice(0, firstLineChar).replace(/\S/g, " ");
            context += lineContent.slice(firstLineChar, lastCharForLine).replace(/./g, "~");
        }
        else if (i === lastLine) {
            context += lineContent.slice(0, lastLineChar).replace(/./g, "~");
        }
        else {
            // Squiggle the entire line.
            context += lineContent.replace(/./g, "~");
        }
        context += resetEscapeSequence;
    }
    return context;
}

function isJsDocImportCandidate(node: Node): node is JSDocImportCandidateNode {
    switch (node.kind) {
        case SyntaxKind.JSDocParameterTag:
        case SyntaxKind.JSDocPropertyTag:
        case SyntaxKind.JSDocTypedefTag:
        case SyntaxKind.JSDocTypeTag:
        case SyntaxKind.JSDocVariableTag:
        case SyntaxKind.JSDocReturnTag:            
            return true;
        default:
            return false;
    }
}