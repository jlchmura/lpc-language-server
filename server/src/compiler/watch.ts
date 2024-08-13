import { convertToRelativePath, FileWatcher, isString, noop, Program, SourceFile } from "./_namespaces/lpc";

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