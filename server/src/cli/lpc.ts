import * as lpc from "../lpc/lpc.js";

// This file actually uses arguments passed on commandline and executes it

// enable deprecation logging
lpc.Debug.loggingHost = {
    log(_level, s) {
        lpc.sys.write(`${s || ""}${lpc.sys.newLine}`);
    },
};

if (lpc.Debug.isDebugging) {
    lpc.Debug.enableDebugInfo();
}

if (lpc.sys.tryEnableSourceMapsForHost && /^development$/i.test(lpc.sys.getEnvironmentVariable("NODE_ENV"))) {
    lpc.sys.tryEnableSourceMapsForHost();
}

if (lpc.sys.setBlocking) {
    lpc.sys.setBlocking();
}

lpc.sys.write(`Version ${lpc.version}\n`);
lpc.sys.write(`Searching for config file... ${lpc.sys.getCurrentDirectory()}\n`);

const toCanonicalFileName = lpc.createGetCanonicalFileName(lpc.sys.useCaseSensitiveFileNames);
const projectFolderArg = lpc.server.findArgument("--project");
const projectFolder = lpc.isDiskPathRoot(projectFolderArg) ? projectFolderArg : lpc.normalizePath(lpc.combinePaths(lpc.sys.getCurrentDirectory(), projectFolderArg));
const configFileName = lpc.findConfigFile(projectFolder || lpc.sys.getCurrentDirectory(), lpc.sys.fileExists);
const canonicalConfigFilePath = (toCanonicalFileName(configFileName)) as lpc.server.NormalizedPath;

if (!configFileName) {
    lpc.sys.write("No config file found.\n");
    process.exit(1);    
}

lpc.sys.write(`Using config file: ${canonicalConfigFilePath}\n`);
const configFile = lpc.parseJsonText(configFileName, lpc.sys.readFile(configFileName));
const parsedConfig = lpc.parseLpcSourceFileConfigFileContent(configFile, lpc.sys, lpc.getDirectoryPath(configFileName), /*existingOptions*/ undefined, configFileName);
// const parsedConfig = lpc.getParsedCommandLineOfConfigFile(configFileName, {}, {
//     ...lpc.sys,
//     getCurrentDirectory: () => lpc.sys.getCurrentDirectory(),
//     onUnRecoverableConfigFileDiagnostic: (d)=>{console.error(d);},
// });

const compilerOptions = parsedConfig.options;
const compilerHost = lpc.createCompilerHost(compilerOptions);
const execPath = lpc.getDirectoryPath(process.argv[1]);
compilerHost.getDefaultLibFileName = () => lpc.combinePaths(execPath, "../", lpc.getDefaultLibFolder(compilerOptions), lpc.getDefaultLibFileName(compilerOptions));

lpc.sys.write(`Driver type: ${lpc.DriverTypeMap[compilerOptions.driverType]}\n`);
lpc.sys.write(`Found ${parsedConfig.fileNames.length} files.\n`);
lpc.sys.write(`Efun Definitions: ${lpc.normalizePath(compilerHost.getDefaultLibFileName(compilerOptions))}\n`);

const createProgramOptions: lpc.CreateProgramOptions = {
    host: compilerHost,
    rootNames: parsedConfig.fileNames,
    options: compilerOptions,                
    oldProgram: undefined,                
};

// our console output is still verbose, so mask console output
console.log = lpc.noop;
console.debug = lpc.noop;
console.info = lpc.noop;
console.warn = lpc.noop;

function defaultIsPretty(sys: lpc.System) {
    return !!sys.writeOutputIsTTY && sys.writeOutputIsTTY() && !sys.getEnvironmentVariable("NO_COLOR");
}

function shouldBePretty(sys: lpc.System, options: lpc.CompilerOptions | lpc.BuildOptions) {
    if (!options || typeof options.pretty === "undefined") {
        return defaultIsPretty(sys);
    }
    return options.pretty;
}

function updateReportDiagnostic(
    sys: lpc.System,
    existing: lpc.DiagnosticReporter,
    options: lpc.CompilerOptions | lpc.BuildOptions,
): lpc.DiagnosticReporter {
    return shouldBePretty(sys, options) ?
        lpc.createDiagnosticReporter(sys, /*pretty*/ true) :
        existing;
}

const reportDiagnostic = updateReportDiagnostic(
    lpc.sys,
    lpc.createDiagnosticReporter(lpc.sys),
    compilerOptions
);

// create program and get file we are trying to compile
const program = lpc.createProgram(createProgramOptions);

const diags: lpc.DiagnosticWithLocation[] = [];
const rootFiles = program.getRootFileNames();

rootFiles.forEach(f => {
    const sourceFile = program.getSourceFile(f);    
    const parseDiags = program.getSyntacticDiagnostics(sourceFile);
    diags.push(...parseDiags);
    
    if (compilerOptions.diagnostics) {
        const semanticDiags = program.getSemanticDiagnostics(sourceFile);
        diags.push(...semanticDiags);
    }        
});

lpc.sortAndDeduplicateDiagnostics(diags).forEach(d => {
    reportDiagnostic(d);
});

if (diags.length) {
    lpc.sys.write("\n");
    const diagTxt = lpc.getErrorSummaryText(diags.length, lpc.getFilesInErrorForSummary(diags), "\n", compilerHost);
    lpc.sys.write(diagTxt);    
} else if (rootFiles.length) {
    lpc.sys.write(lpc.formatColorAndReset("\n✓ ", lpc.ForegroundColorEscapeSequences.Green));

    const messages = [
        "Your code is so fresh and so clean, clean.",
        "May the source be with you.",
        "Time to grab a coffee.",
        "It's a feature, not a bug!",
        "You are a coding wizard.",
        "Your code is all that and a bag of chips.",
        "You must be the Fresh Prince of Code-Air.",
        "Party on, dudes."
    ];
    const message = messages[Math.floor(Math.random() * messages.length)];

    lpc.sys.write(lpc.formatColorAndReset(`No errors found. ${message}\n\n`, lpc.ForegroundColorEscapeSequences.Grey));
}