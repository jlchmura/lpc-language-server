import { convertToRelativePath, countWhere, createCompilerDiagnostic, Diagnostic, DiagnosticAndArguments, DiagnosticCategory, Diagnostics, FileWatcher, filter, find, flattenDiagnosticMessageText, ForegroundColorEscapeSequences, formatColorAndReset, getLineAndCharacterOfPosition, getRelativePathFromDirectory, HasCurrentDirectory, isString, noop, pathIsAbsolute, Program, ReportFileInError, SourceFile } from "./_namespaces/lpc";

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
        // TODO
        // reasons.get(file.path)?.forEach(reason => write(`  ${fileIncludeReasonToDiagnostics(program, reason, relativeFileName).messageText}`));
        // explainIfFileIsRedirectAndImpliedFormat(file, relativeFileName)?.forEach(d => write(`  ${d.messageText}`));
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
