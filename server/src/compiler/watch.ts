import { chainDiagnosticMessages, convertToRelativePath, countWhere, createCompilerDiagnostic, createGetCanonicalFileName, Debug, Diagnostic, DiagnosticAndArguments, DiagnosticCategory, diagnosticCategoryName, DiagnosticMessage, DiagnosticMessageChain, DiagnosticReporter, Diagnostics, endsWith, Extension, fileExtensionIs, FileIncludeKind, FileIncludeReason, FileWatcher, filter, find, findIndex, flattenDiagnosticMessageText, ForegroundColorEscapeSequences, formatColorAndReset, formatDiagnostic, FormatDiagnosticsHost, formatDiagnosticsWithColorAndContext, getDirectoryPath, getEmitScriptTarget, getLineAndCharacterOfPosition, getNameOfScriptTarget, getNormalizedAbsolutePath, getPatternFromSpec, getReferencedFileLocation, getRegexFromPattern, getRelativePathFromDirectory, HasCurrentDirectory, isExternalOrCommonJsModule, isReferencedFile, isReferenceFileLocation, isString, noop, packageIdToString, pathIsAbsolute, Program, ReportFileInError, SourceFile, sys, System } from "./_namespaces/lpc";

/** @internal */
export interface WatchTypeRegistry {
    ConfigFile: "Config file";
    ExtendedConfigFile: "Extended config file";
    SourceFile: "Source file";
    MissingFile: "Missing file";
    WildcardDirectory: "Wild card directory";
    FailedLookupLocations: "Failed Lookup Locations";
    AffectingFileLocation: "File location affecting resolution";
    TypeRoots: "Type roots";
    ConfigFileOfReferencedProject: "Config file of referened project";
    ExtendedConfigOfReferencedProject: "Extended config file of referenced project";
    WildcardDirectoryOfReferencedProject: "Wild card directory of referenced project";
    PackageJson: "package.json file";

    // Additional tsserver specific watch information
    ClosedScriptInfo: "Closed Script info";
    ConfigFileForInferredRoot: "Config file for the inferred project root";
    NodeModules: "node_modules for closed script infos and package.jsons affecting module specifier cache";
    MissingSourceMapFile: "Missing source map file";
    NoopConfigFileForInferredRoot: "Noop Config file for the inferred project root";
    MissingGeneratedFile: "Missing generated file";
    NodeModulesForModuleSpecifierCache: "node_modules for module specifier cache invalidation";
    TypingInstallerLocationFile: "File location for typing installer";
    TypingInstallerLocationDirectory: "Directory location for typing installer";
}

/** @internal */
export type WatchType = WatchTypeRegistry[keyof WatchTypeRegistry];
/** @internal */
export const WatchType: WatchTypeRegistry = {
    ConfigFile: "Config file",
    ExtendedConfigFile: "Extended config file",
    SourceFile: "Source file",
    MissingFile: "Missing file",
    WildcardDirectory: "Wild card directory",
    FailedLookupLocations: "Failed Lookup Locations",
    AffectingFileLocation: "File location affecting resolution",
    TypeRoots: "Type roots",
    ConfigFileOfReferencedProject: "Config file of referened project",
    ExtendedConfigOfReferencedProject: "Extended config file of referenced project",
    WildcardDirectoryOfReferencedProject: "Wild card directory of referenced project",
    PackageJson: "package.json file",
    ClosedScriptInfo: "Closed Script info",
    ConfigFileForInferredRoot: "Config file for the inferred project root",
    NodeModules: "node_modules for closed script infos and package.jsons affecting module specifier cache",
    MissingSourceMapFile: "Missing source map file",
    NoopConfigFileForInferredRoot: "Noop Config file for the inferred project root",
    MissingGeneratedFile: "Missing generated file",
    NodeModulesForModuleSpecifierCache: "node_modules for module specifier cache invalidation",
    TypingInstallerLocationFile: "File location for typing installer",
    TypingInstallerLocationDirectory: "Directory location for typing installer",
};

function toFileName(file: SourceFile | string, fileNameConvertor?: (fileName: string) => string) {
    const fileName = isString(file) ? file : file.fileName;
    return fileNameConvertor ? fileNameConvertor(fileName) : fileName;
}


/** @internal */
export function explainFiles(program: Program, write: (s: string) => void) {
    const reasons = program.getFileIncludeReasons();
    const relativeFileName = (fileName: string) => convertToRelativePath(fileName, program.getCurrentDirectory(), program.getCanonicalFileName);
    for (const file of program.getSourceFiles()) {
        write(`${toFileName(file, relativeFileName)}`);        
        reasons.get(file.path)?.forEach(reason => write(`  ${fileIncludeReasonToDiagnostics(program, reason, relativeFileName).messageText}`));
        explainIfFileIsRedirectAndImpliedFormat(file, relativeFileName)?.forEach(d => write(`  ${d.messageText}`));
    }
}

/** @internal */
export const noopFileWatcher: FileWatcher = { close: noop };
/** @internal */
export const returnNoopFileWatcher = () => noopFileWatcher;

function prettyPathForFileError(error: ReportFileInError, cwd: string) {
    const line = formatColorAndReset(":" + error.line, ForegroundColorEscapeSequences.Grey);
    if (pathIsAbsolute(error.fileName) && pathIsAbsolute(cwd)) {
        return getRelativePathFromDirectory(cwd, error.fileName, /*ignoreCase*/ false) + line;
    }

    return error.fileName + line;
}

/** @internal */
export function getFilesInErrorForSummary(diagnostics: readonly Diagnostic[]): (ReportFileInError | undefined)[] {
    const filesInError = filter(diagnostics, diagnostic => diagnostic.category === DiagnosticCategory.Error)
        .map(
            errorDiagnostic => {
                if (errorDiagnostic.file === undefined) return;
                return `${errorDiagnostic.file.fileName}`;
            },
        );
    return filesInError.map(fileName => {
        if (fileName === undefined) {
            return undefined;
        }

        const diagnosticForFileName = find(diagnostics, diagnostic => diagnostic.file !== undefined && diagnostic.file.fileName === fileName);

        if (diagnosticForFileName !== undefined) {
            const { line } = getLineAndCharacterOfPosition(diagnosticForFileName.file!, diagnosticForFileName.start!);
            return {
                fileName,
                line: line + 1,
            };
        }
    });
}


/** @internal */
export function getErrorSummaryText(
    errorCount: number,
    filesInError: readonly (ReportFileInError | undefined)[],
    newLine: string,
    host: HasCurrentDirectory,
) {
    if (errorCount === 0) return "";
    const nonNilFiles = filesInError.filter(fileInError => fileInError !== undefined);
    const distinctFileNamesWithLines = nonNilFiles.map(fileInError => `${fileInError!.fileName}:${fileInError!.line}`)
        .filter((value, index, self) => self.indexOf(value) === index);

    const firstFileReference = nonNilFiles[0] && prettyPathForFileError(nonNilFiles[0], host.getCurrentDirectory());

    let messageAndArgs: DiagnosticAndArguments;
    if (errorCount === 1) {
        messageAndArgs = filesInError[0] !== undefined ? [Diagnostics.Found_1_error_in_0, firstFileReference!] : [Diagnostics.Found_1_error];
    }
    else {
        messageAndArgs = distinctFileNamesWithLines.length === 0 ? [Diagnostics.Found_0_errors, errorCount] :
            distinctFileNamesWithLines.length === 1 ? [Diagnostics.Found_0_errors_in_the_same_file_starting_at_Colon_1, errorCount, firstFileReference!] :
            [Diagnostics.Found_0_errors_in_1_files, errorCount, distinctFileNamesWithLines.length];
    }

    const d = createCompilerDiagnostic(...messageAndArgs);
    const suffix = distinctFileNamesWithLines.length > 1 ? createTabularErrorsDisplay(nonNilFiles, host) : "";
    return `${newLine}${flattenDiagnosticMessageText(d.messageText, newLine)}${newLine}${newLine}${suffix}`;
}


function createTabularErrorsDisplay(filesInError: (ReportFileInError | undefined)[], host: HasCurrentDirectory) {
    const distinctFiles = filesInError.filter((value, index, self) => index === self.findIndex(file => file?.fileName === value?.fileName));
    if (distinctFiles.length === 0) return "";

    const numberLength = (num: number) => Math.log(num) * Math.LOG10E + 1;
    const fileToErrorCount = distinctFiles.map(file => ([file, countWhere(filesInError, fileInError => fileInError!.fileName === file!.fileName)] as const));
    const maxErrors = fileToErrorCount.reduce((acc, value) => Math.max(acc, value[1] || 0), 0);

    const headerRow = Diagnostics.Errors_Files.message;
    const leftColumnHeadingLength = headerRow.split(" ")[0].length;
    const leftPaddingGoal = Math.max(leftColumnHeadingLength, numberLength(maxErrors));
    const headerPadding = Math.max(numberLength(maxErrors) - leftColumnHeadingLength, 0);

    let tabularData = "";
    tabularData += " ".repeat(headerPadding) + headerRow + "\n";
    fileToErrorCount.forEach(row => {
        const [file, errorCount] = row;
        const errorCountDigitsLength = Math.log(errorCount) * Math.LOG10E + 1 | 0;
        const leftPadding = errorCountDigitsLength < leftPaddingGoal ?
            " ".repeat(leftPaddingGoal - errorCountDigitsLength)
            : "";

        const fileRef = prettyPathForFileError(file!, host.getCurrentDirectory());
        tabularData += `${leftPadding}${errorCount}  ${fileRef}\n`;
    });

    return tabularData;
}

/** @internal */
export function explainIfFileIsRedirectAndImpliedFormat(
    file: SourceFile,
    fileNameConvertor?: (fileName: string) => string,
): DiagnosticMessageChain[] | undefined {
    let result: DiagnosticMessageChain[] | undefined;
    if (file.path !== file.resolvedPath) {
        (result ??= []).push(chainDiagnosticMessages(
            /*details*/ undefined,
            Diagnostics.File_is_output_of_project_reference_source_0,
            toFileName(file.originalFileName, fileNameConvertor),
        ));
    }
    // if (file.redirectInfo) {
    //     (result ??= []).push(chainDiagnosticMessages(
    //         /*details*/ undefined,
    //         Diagnostics.File_redirects_to_file_0,
    //         toFileName(file.redirectInfo.redirectTarget, fileNameConvertor),
    //     ));
    // }
    if (isExternalOrCommonJsModule(file)) {
        switch (file.impliedNodeFormat) {
           
        }
    }
    return result;
}

/** @internal */
export function getMatchedFileSpec(program: Program, fileName: string) {
    const configFile = program.getCompilerOptions().configFile;
    if (!configFile?.configFileSpecs?.validatedFilesSpec) return undefined;

    const filePath = program.getCanonicalFileName(fileName);
    const basePath = getDirectoryPath(getNormalizedAbsolutePath(configFile.fileName, program.getCurrentDirectory()));
    const index = findIndex(configFile.configFileSpecs.validatedFilesSpec, fileSpec => program.getCanonicalFileName(getNormalizedAbsolutePath(fileSpec, basePath)) === filePath);
    return index !== -1 ? configFile.configFileSpecs.validatedFilesSpecBeforeSubstitution![index] : undefined;
}

/** @internal */
export function getMatchedIncludeSpec(program: Program, fileName: string) {
    const configFile = program.getCompilerOptions().configFile;
    if (!configFile?.configFileSpecs?.validatedIncludeSpecs) return undefined;

    // Return true if its default include spec
    if (configFile.configFileSpecs.isDefaultIncludeSpec) return true;

    const isJsonFile = fileExtensionIs(fileName, Extension.Json);
    const basePath = getDirectoryPath(getNormalizedAbsolutePath(configFile.fileName, program.getCurrentDirectory()));
    const useCaseSensitiveFileNames = program.useCaseSensitiveFileNames();
    const index = findIndex(configFile?.configFileSpecs?.validatedIncludeSpecs, includeSpec => {
        if (isJsonFile && !endsWith(includeSpec, Extension.Json)) return false;
        const pattern = getPatternFromSpec(includeSpec, basePath, "files");
        return !!pattern && getRegexFromPattern(`(${pattern})$`, useCaseSensitiveFileNames).test(fileName);
    });
    return index !== -1 ? configFile.configFileSpecs.validatedIncludeSpecsBeforeSubstitution![index] : undefined;
}


/** @internal */
export function fileIncludeReasonToDiagnostics(program: Program, reason: FileIncludeReason, fileNameConvertor?: (fileName: string) => string): DiagnosticMessageChain {
    const options = program.getCompilerOptions();
    if (isReferencedFile(reason)) {
        const referenceLocation = getReferencedFileLocation(program, reason);
        const referenceText = isReferenceFileLocation(referenceLocation) ? referenceLocation.file.text.substring(referenceLocation.pos, referenceLocation.end) : `"${referenceLocation.text}"`;
        let message: DiagnosticMessage;
        Debug.assert(isReferenceFileLocation(referenceLocation) || reason.kind === FileIncludeKind.Import, "Only synthetic references are imports");
        switch (reason.kind) {
            case FileIncludeKind.Import:
                if (isReferenceFileLocation(referenceLocation)) {
                    message = Diagnostics.Imported_via_0_from_file_1;
                }
    //             else if (referenceLocation.text === externalHelpersModuleNameText) {
    //                 message = referenceLocation.packageId ?
    //                     Diagnostics.Imported_via_0_from_file_1_with_packageId_2_to_import_importHelpers_as_specified_in_compilerOptions :
    //                     Diagnostics.Imported_via_0_from_file_1_to_import_importHelpers_as_specified_in_compilerOptions;
    //             }
                else {
                    message = Diagnostics.Imported_via_0_from_file_1_to_import_jsx_and_jsxs_factory_functions;
                }
                break;
            case FileIncludeKind.ReferenceFile:
                Debug.assert(!referenceLocation.packageId);
                message = Diagnostics.Referenced_via_0_from_file_1;
                break;
            case FileIncludeKind.TypeReferenceDirective:
    //             message = referenceLocation.packageId ?
    //                 Diagnostics.Type_library_referenced_via_0_from_file_1_with_packageId_2 :
    //                 Diagnostics.Type_library_referenced_via_0_from_file_1;
    //             break;
            case FileIncludeKind.LibReferenceDirective:
                Debug.assert(!referenceLocation.packageId);
                message = Diagnostics.Library_referenced_via_0_from_file_1;
                break;
            default:
                Debug.assertNever(reason);
        }
        return chainDiagnosticMessages(
            /*details*/ undefined,
            message,
            referenceText,
            toFileName(referenceLocation.file, fileNameConvertor),
            (referenceLocation.packageId && packageIdToString(referenceLocation.packageId))!,
        );
    }
    switch (reason.kind) {
        case FileIncludeKind.RootFile:
            if (!options.configFile?.configFileSpecs) return chainDiagnosticMessages(/*details*/ undefined, Diagnostics.Root_file_specified_for_compilation);
            const fileName = getNormalizedAbsolutePath(program.getRootFileNames()[reason.index], program.getCurrentDirectory());
            const matchedByFiles = getMatchedFileSpec(program, fileName);
            if (matchedByFiles) return chainDiagnosticMessages(/*details*/ undefined, Diagnostics.Part_of_files_list_in_lpcconfig_json);
            const matchedByInclude = getMatchedIncludeSpec(program, fileName);
            return isString(matchedByInclude) ?
                chainDiagnosticMessages(
                    /*details*/ undefined,
                    Diagnostics.Matched_by_include_pattern_0_in_1,
                    matchedByInclude,
                    toFileName(options.configFile, fileNameConvertor),
                ) :
                // Could be additional files specified as roots or matched by default include
                chainDiagnosticMessages(
                    /*details*/ undefined,
                    matchedByInclude ?
                        Diagnostics.Matched_by_default_include_pattern_Asterisk_Asterisk_Slash_Asterisk :
                        Diagnostics.Root_file_specified_for_compilation,
                );
        case FileIncludeKind.SourceFromProjectReference:
        case FileIncludeKind.OutputFromProjectReference:
            const isOutput = reason.kind === FileIncludeKind.OutputFromProjectReference;
            const referencedResolvedRef = Debug.checkDefined(program.getResolvedProjectReferences()?.[reason.index]);
            return chainDiagnosticMessages(
                /*details*/ undefined,
                options.outFile ?
                    isOutput ?
                        Diagnostics.Output_from_referenced_project_0_included_because_1_specified :
                        Diagnostics.Source_from_referenced_project_0_included_because_1_specified :
                    isOutput ?
                    Diagnostics.Output_from_referenced_project_0_included_because_module_is_specified_as_none :
                    Diagnostics.Source_from_referenced_project_0_included_because_module_is_specified_as_none,
                toFileName(referencedResolvedRef.sourceFile.fileName, fileNameConvertor),
                options.outFile ? "--outFile" : "--out",
            );
        // case FileIncludeKind.AutomaticTypeDirectiveFile: {
        //     const messageAndArgs: DiagnosticAndArguments = /*options.types ?
        //         reason.packageId ?
        //             [Diagnostics.Entry_point_of_type_library_0_specified_in_compilerOptions_with_packageId_1, reason.typeReference, packageIdToString(reason.packageId)] :
        //             [Diagnostics.Entry_point_of_type_library_0_specified_in_compilerOptions, reason.typeReference] :*/
        //         reason.packageId ?
        //         [Diagnostics.Entry_point_for_implicit_type_library_0_with_packageId_1, reason.typeReference, packageIdToString(reason.packageId)] :
        //         [Diagnostics.Entry_point_for_implicit_type_library_0, reason.typeReference];

        //     return chainDiagnosticMessages(/*details*/ undefined, ...messageAndArgs);
        // }        
        case FileIncludeKind.LibFile: {
            if (reason.index !== undefined) return chainDiagnosticMessages(/*details*/ undefined, Diagnostics.Library_0_specified_in_compilerOptions, options.lib![reason.index]);
            const target = getNameOfScriptTarget(getEmitScriptTarget(options));
            const messageAndArgs: DiagnosticAndArguments = target ? [Diagnostics.Default_library_for_target_0, target] : [Diagnostics.Default_library];
            return chainDiagnosticMessages(/*details*/ undefined, ...messageAndArgs);
        }
        default:
            Debug.fail("Unknown include kind");
            // Debug.assertNever(reason);
    }
}

const sysFormatDiagnosticsHost: FormatDiagnosticsHost | undefined = sys ? {
    getCurrentDirectory: () => sys.getCurrentDirectory(),
    getNewLine: () => sys.newLine,
    getCanonicalFileName: createGetCanonicalFileName(sys.useCaseSensitiveFileNames),
} : undefined;


/**
 * Create a function that reports error by writing to the system and handles the formatting of the diagnostic
 *
 * @internal
 */
export function createDiagnosticReporter(system: System, pretty?: boolean): DiagnosticReporter {
    const host: FormatDiagnosticsHost = system === sys && sysFormatDiagnosticsHost ? sysFormatDiagnosticsHost : {
        getCurrentDirectory: () => system.getCurrentDirectory(),
        getNewLine: () => system.newLine,
        getCanonicalFileName: createGetCanonicalFileName(system.useCaseSensitiveFileNames),
    };
    if (!pretty) {
        return diagnostic => system.write(formatDiagnostic(diagnostic, host));
    }

    const diagnostics: Diagnostic[] = new Array(1);
    return diagnostic => {
        diagnostics[0] = diagnostic;
        system.write(formatDiagnosticsWithColorAndContext(diagnostics, host) + host.getNewLine());
        diagnostics[0] = undefined!; // TODO: GH#18217
    };
}
