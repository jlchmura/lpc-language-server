import { BuildOptions, BuilderProgram, CompilerOptions, CreateProgramOptions, Debug, Diagnostic, DiagnosticReporter, DiagnosticWithLocation, Diagnostics, DriverTypeMap, ExitStatus, ForegroundColorEscapeSequences, ParsedCommandLine, Program, System, WatchOptions, combinePaths, createCompilerHost, createDiagnosticReporter, createGetCanonicalFileName, createProgram, findArgument, findConfigFile, formatColorAndReset, getBaseFileName, getDefaultLibFileName, getDefaultLibFolder, getDiagnosticText, getDirectoryPath, getErrorSummaryText, getFilesInErrorForSummary, isDiskPathRoot, noop, normalizePath, parseJsonText, parseLpcSourceFileConfigFileContent, sortAndDeduplicateDiagnostics, version } from "./_namespaces/lpc";


export enum ExecuteCommandMsgType {
    None = 0,
    Success,
    Failure,
}
export type ExecuteCommandLineCallbacks = (program: Program | BuilderProgram | ParsedCommandLine) => void;
export type ExecuteCommandMsgCallback = (msg: string, msgType?: ExecuteCommandMsgType) => void;

/**
 * Executes a CLI build.
 * @param system 
 * @param commandLineArgs 
 */
export function executeCommandLine(
    system: System,
    commandLineArgs: readonly string[],
    msgCallback?: ExecuteCommandMsgCallback,
): void {
    system.write(`Version ${version}\n`);
    system.write(`Searching for config file... ${system.getCurrentDirectory()}\n`);

    const toCanonicalFileName = createGetCanonicalFileName(system.useCaseSensitiveFileNames);
    const projectFolderArg = findArgument("--project", commandLineArgs);
    const projectFolder = isDiskPathRoot(projectFolderArg) ? getBaseFileName(projectFolderArg) : normalizePath(combinePaths(system.getCurrentDirectory(), projectFolderArg));
    const configFileName = findConfigFile(projectFolder || system.getCurrentDirectory(), system.fileExists);
    const canonicalConfigFilePath = (toCanonicalFileName(configFileName));

    if (!configFileName) {
        system.write("No config file found.\n");
        process.exit(1);    
    }

    system.write(`Using config file: ${canonicalConfigFilePath}\n`);
    const configFile = parseJsonText(configFileName, system.readFile(configFileName));
    const parsedConfig = parseLpcSourceFileConfigFileContent(configFile, system, getDirectoryPath(configFileName), /*existingOptions*/ undefined, configFileName);
    // const parsedConfig = getParsedCommandLineOfConfigFile(configFileName, {}, {
    //     ...system,
    //     getCurrentDirectory: () => system.getCurrentDirectory(),
    //     onUnRecoverableConfigFileDiagnostic: (d)=>{console.error(d);},
    // });

    const compilerOptions = parsedConfig.options;
    const compilerHost = createCompilerHost(compilerOptions);
    const execPath = getDirectoryPath(process.argv[1]);
    compilerHost.getDefaultLibFileName = () => combinePaths(execPath, "../", getDefaultLibFolder(compilerOptions), getDefaultLibFileName(compilerOptions));

    system.write(`Driver type: ${DriverTypeMap[compilerOptions.driverType]}\n`);
    system.write(`Found ${parsedConfig.fileNames.length} files.\n`);
    system.write(`Efun Definitions: ${normalizePath(compilerHost.getDefaultLibFileName(compilerOptions))}\n`);

    const createProgramOptions: CreateProgramOptions = {
        host: compilerHost,
        rootNames: parsedConfig.fileNames,
        options: compilerOptions,                
        oldProgram: undefined,                
    };

    function defaultIsPretty(sys: System) {
        return !!sys.writeOutputIsTTY && sys.writeOutputIsTTY() && !sys.getEnvironmentVariable("NO_COLOR");
    }

    function shouldBePretty(sys: System, options: CompilerOptions | BuildOptions) {
        if (!options || typeof options.pretty === "undefined") {
            return defaultIsPretty(sys);
        }
        return options.pretty;
    }

    function updateReportDiagnostic(
        sys: System,
        existing: DiagnosticReporter,
        options: CompilerOptions | BuildOptions,
    ): DiagnosticReporter {
        return shouldBePretty(sys, options) ?
            createDiagnosticReporter(sys, /*pretty*/ true) :
            existing;
    }

    const reportDiagnostic = updateReportDiagnostic(
        system,
        createDiagnosticReporter(system),
        compilerOptions
    );

    // create program and get file we are trying to compile
    const program = createProgram(createProgramOptions);

    const diags: DiagnosticWithLocation[] = [];
    const rootFiles = program.getRootFileNames();

    rootFiles.forEach(f => {
        try {
            const sourceFile = program.getSourceFile(f);    
            const parseDiags = program.getSyntacticDiagnostics(sourceFile);
            diags.push(...parseDiags);
            
            if (compilerOptions.diagnostics) {
                const semanticDiags = program.getSemanticDiagnostics(sourceFile);
                diags.push(...semanticDiags);
            }        
        } catch (e) {
            system.write(`Error processing file: ${f}\n`);            
            throw e;        
        }
    });

    sortAndDeduplicateDiagnostics(diags).forEach(d => {
        reportDiagnostic(d);
    });

    if (diags.length) {
        system.write("\n");
        if (msgCallback) {            
            const diagTxt = getErrorSummaryText(diags.length, getFilesInErrorForSummary(diags), "\n", compilerHost);
            msgCallback(diagTxt, ExecuteCommandMsgType.Failure);
        }        
    } else if (rootFiles.length) {
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

        if (msgCallback) {
            msgCallback(formatColorAndReset("\n✓ ", ForegroundColorEscapeSequences.Green) + formatColorAndReset(`No errors found. ${message}\n\n`, ForegroundColorEscapeSequences.Grey), ExecuteCommandMsgType.Success);
        }        
    }    
}

function performBuild(
    sys: System,
    cb: ExecuteCommandLineCallbacks,
    buildOptions: BuildOptions,
    watchOptions: WatchOptions | undefined,
    projects: string[],
    errors: Diagnostic[],
) {
    // Update to pretty if host supports it
    const reportDiagnostic = updateReportDiagnostic(
        sys,
        createDiagnosticReporter(sys),
        buildOptions,
    );

    if (projects.length === 0) {
        printVersion(sys);
        // printBuildHelp(sys, buildOpts);
        return sys.exit(ExitStatus.Success);
    }

    // const buildHost = createSolutionBuilderHost(
    //     sys,
    //     /*createProgram*/ undefined,
    //     reportDiagnostic,
    //     createBuilderStatusReporter(sys, shouldBePretty(sys, buildOptions)),
    //     createReportErrorSummary(sys, buildOptions),
    // );

    // updateSolutionBuilderHost(sys, cb, buildHost, solutionPerformance);
    // const builder = createSolutionBuilder(buildHost, projects, buildOptions);
    Debug.fail("todo");
}

function printVersion(sys: System) {
    sys.write(getDiagnosticText(Diagnostics.Version_0, version) + sys.newLine);
}

function updateReportDiagnostic(
    sys: System,
    existing: DiagnosticReporter,
    options: CompilerOptions | BuildOptions,
): DiagnosticReporter {
    return shouldBePretty(sys, options) ?
        createDiagnosticReporter(sys, /*pretty*/ true) :
        existing;
}

function shouldBePretty(sys: System, options: CompilerOptions | BuildOptions) {
    if (!options || typeof options.pretty === "undefined") {
        return defaultIsPretty(sys);
    }
    return options.pretty;
}

function defaultIsPretty(sys: System) {
    return !!sys.writeOutputIsTTY && sys.writeOutputIsTTY() && !sys.getEnvironmentVariable("NO_COLOR");
}

