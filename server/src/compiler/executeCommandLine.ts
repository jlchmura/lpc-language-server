import { BuildOptions, BuilderProgram, CompilerOptions, CreateProgramOptions, Debug, Diagnostic, DiagnosticReporter, DiagnosticWithLocation, Diagnostics, DriverTypeMap, ExitStatus, Extension, ForegroundColorEscapeSequences, ParsedCommandLine, Program, SourceFile, System, WatchOptions, combinePaths, createCompilerHost, createDiagnosticReporter, createGetCanonicalFileName, createProgram, fileExtensionIs, fileExtensionIsOneOf, findArgument, findConfigFile, forEach, formatColorAndReset, getBaseFileName, getDefaultLibFileName, getDefaultLibFolder, getDiagnosticText, getDirectoryPath, getErrorSummaryText, getFilesInErrorForSummary, getLineStarts, isDiskPathRoot, noop, normalizePath, parseJsonText, parseLpcSourceFileConfigFileContent, performance, reduceLeftIterator, sortAndDeduplicateDiagnostics, startsWith, supportedTSExtensionsFlat, sys, version } from "./_namespaces/lpc";


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
    const performanceEnabled = findArgument("--perf", commandLineArgs) !== undefined;

    if (!configFileName) {
        system.write("No config file found.\n");
        process.exit(1);    
    }

    let solutionPerformance: SolutionPerformance | undefined;
    if (performanceEnabled) {
        solutionPerformance = enableSolutionPerformance(system, {});
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
    
    if (performanceEnabled) {
        reportStatistics(sys, program, solutionPerformance);        
        reportSolutionBuilderTimes(solutionPerformance);
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

function enableSolutionPerformance(system: System, options: BuildOptions) {
    if (system === sys) {
        performance.enable();
        return createSolutionPerfomrance();
    }
}

interface Statistic {
    name: string;
    value: number;
    type: StatisticType;
}

/** @internal */
export enum StatisticType {
    time,
    count,
    memory,
}

interface SolutionPerformance {
    addAggregateStatistic(s: Statistic): void;
    forEachAggregateStatistics(cb: (s: Statistic) => void): void;
    clear(): void;
}


function createSolutionPerfomrance(): SolutionPerformance {
    let statistics: Map<string, Statistic> | undefined;
    return {
        addAggregateStatistic,
        forEachAggregateStatistics: forEachAggreateStatistics,
        clear,
    };

    function addAggregateStatistic(s: Statistic) {
        const existing = statistics?.get(s.name);
        if (existing) {
            if (existing.type === StatisticType.memory) existing.value = Math.max(existing.value, s.value);
            else existing.value += s.value;
        }
        else {
            (statistics ??= new Map()).set(s.name, s);
        }
    }

    function forEachAggreateStatistics(cb: (s: Statistic) => void) {
        statistics?.forEach(cb);
    }

    function clear() {
        statistics = undefined;
    }
}

function isSolutionMarkOrMeasure(name: string) {
    return startsWith(name, "SolutionBuilder::");
}


function reportSolutionBuilderTimes(
    solutionPerformance: SolutionPerformance | undefined,
) {
    if (!solutionPerformance) return;

    // if (!performance.isEnabled()) {
    //     sys.write(Diagnostics.Performance_timings_for_diagnostics_or_extendedDiagnostics_are_not_available_in_this_session_A_native_implementation_of_the_Web_Performance_API_could_not_be_found.message + "\n");
    //     return;
    // }

    const statistics: Statistic[] = [];
    // statistics.push(
    //     { name: "Projects in scope", value: getBuildOrderFromAnyBuildOrder(builder.getBuildOrder()).length, type: StatisticType.count },
    // );
    reportSolutionBuilderCountStatistic("SolutionBuilder::Projects built");
    reportSolutionBuilderCountStatistic("SolutionBuilder::Timestamps only updates");
    reportSolutionBuilderCountStatistic("SolutionBuilder::Bundles updated");
    solutionPerformance.forEachAggregateStatistics(s => {
        s.name = `Aggregate ${s.name}`;
        statistics.push(s);
    });
    performance.forEachMeasure((name, duration) => {
        if (isSolutionMarkOrMeasure(name)) statistics.push({ name: `${getNameFromSolutionBuilderMarkOrMeasure(name)} time`, value: duration, type: StatisticType.time });
    });
    performance.disable();
    performance.enable();
    solutionPerformance.clear();

    reportAllStatistics(sys, statistics);

    function reportSolutionBuilderCountStatistic(name: string) {
        const value = performance.getCount(name);
        if (value) {
            statistics.push({ name: getNameFromSolutionBuilderMarkOrMeasure(name), value, type: StatisticType.count });
        }
    }

    function getNameFromSolutionBuilderMarkOrMeasure(name: string) {
        return name.replace("SolutionBuilder::", "");
    }
}

function reportAllStatistics(sys: System, statistics: Statistic[]) {
    let nameSize = 0;
    let valueSize = 0;
    for (const s of statistics) {
        if (s.name.length > nameSize) {
            nameSize = s.name.length;
        }

        const value = statisticValue(s);
        if (value.length > valueSize) {
            valueSize = value.length;
        }
    }

    for (const s of statistics) {
        sys.write(`${s.name}:`.padEnd(nameSize + 2) + statisticValue(s).toString().padStart(valueSize) + sys.newLine);
    }
}


function statisticValue(s: Statistic) {
    switch (s.type) {
        case StatisticType.count:
            return "" + s.value;
        case StatisticType.time:
            return (s.value / 1000).toFixed(2) + "s";
        case StatisticType.memory:
            return Math.round(s.value / 1000) + "K";
        default:
            Debug.assertNever(s.type);
    }
}

function canReportDiagnostics(system: System, compilerOptions: CompilerOptions) {
    return system === sys && true;// (compilerOptions.diagnostics || compilerOptions.extendedDiagnostics);
}

function getCountsMap() {
    const counts = new Map<string, number>();
    counts.set("Library", 0);
    counts.set("Definitions", 0);
    counts.set("LPC", 0);
    // counts.set("JavaScript", 0);
    counts.set("JSON", 0);
    counts.set("Other", 0);
    return counts;
}

function getCountKey(program: Program, file: SourceFile) {
    if (program.isSourceFileDefaultLibrary(file)) {
        return "Library";
    }
    else if (file.isDeclarationFile) {
        return "Definitions";
    }

    const path = file.path;
    if (fileExtensionIsOneOf(path, supportedTSExtensionsFlat)) {
        return "LPC";
    }
    // else if (fileExtensionIsOneOf(path, supportedJSExtensionsFlat)) {
    //     return "JavaScript";
    // }
    else if (fileExtensionIs(path, Extension.Json)) {
        return "JSON";
    }
    else {
        return "Other";
    }
}

function countLines(program: Program): Map<string, number> {
    const counts = getCountsMap();
    forEach(program.getSourceFiles(), file => {
        const key = getCountKey(program, file);
        const lineCount = getLineStarts(file).length;
        counts.set(key, counts.get(key)! + lineCount);
    });
    return counts;
}

function reportStatistics(sys: System, program: Program, solutionPerformance: SolutionPerformance | undefined) {
    const compilerOptions = program.getCompilerOptions();

    // if (canTrace(sys, compilerOptions)) {
    //     tracing?.stopTracing();
    // }

    let statistics: Statistic[];
    if (canReportDiagnostics(sys, compilerOptions)) {
        statistics = [];
        const memoryUsed = sys.getMemoryUsage ? sys.getMemoryUsage() : -1;
        reportCountStatistic("Files", program.getSourceFiles().length);

        const lineCounts = countLines(program);
        if (compilerOptions.extendedDiagnostics) {
            for (const [key, value] of lineCounts.entries()) {
                reportCountStatistic("Lines of " + key, value);
            }
        }
        else {
            reportCountStatistic("Lines", reduceLeftIterator(lineCounts.values(), (sum, count) => sum + count, 0));
        }

        reportCountStatistic("Identifiers", program.getIdentifierCount());
        reportCountStatistic("Symbols", program.getSymbolCount());
        reportCountStatistic("Types", program.getTypeCount());
        reportCountStatistic("Instantiations", program.getInstantiationCount());
        if (memoryUsed >= 0) {
            reportStatisticalValue({ name: "Memory used", value: memoryUsed, type: StatisticType.memory }, /*aggregate*/ true);
        }

        const isPerformanceEnabled = performance.isEnabled();
        const programTime = isPerformanceEnabled ? performance.getDuration("Program") : 0;
        const bindTime = isPerformanceEnabled ? performance.getDuration("Bind") : 0;
        const checkTime = isPerformanceEnabled ? performance.getDuration("Check") : 0;
        const emitTime = isPerformanceEnabled ? performance.getDuration("Emit") : 0;
        if (compilerOptions.extendedDiagnostics) {
            const caches = program.getRelationCacheSizes();
            reportCountStatistic("Assignability cache size", caches.assignable);
            reportCountStatistic("Identity cache size", caches.identity);
            reportCountStatistic("Subtype cache size", caches.subtype);
            reportCountStatistic("Strict subtype cache size", caches.strictSubtype);
            if (isPerformanceEnabled) {
                performance.forEachMeasure((name, duration) => {
                    if (!isSolutionMarkOrMeasure(name)) reportTimeStatistic(`${name} time`, duration, /*aggregate*/ true);
                });
            }
        }
        else if (isPerformanceEnabled) {
            // Individual component times.
            // Note: To match the behavior of previous versions of the compiler, the reported parse time includes
            // I/O read time and processing time for triple-slash references and module imports, and the reported
            // emit time includes I/O write time. We preserve this behavior so we can accurately compare times.
            reportTimeStatistic("I/O read", performance.getDuration("I/O Read"), /*aggregate*/ true);
            reportTimeStatistic("I/O write", performance.getDuration("I/O Write"), /*aggregate*/ true);
            reportTimeStatistic("Parse time", programTime, /*aggregate*/ true);
            reportTimeStatistic("Bind time", bindTime, /*aggregate*/ true);
            reportTimeStatistic("Check time", checkTime, /*aggregate*/ true);
            reportTimeStatistic("Emit time", emitTime, /*aggregate*/ true);
        }
        if (isPerformanceEnabled) {
            reportTimeStatistic("Total time", programTime + bindTime + checkTime + emitTime, /*aggregate*/ false);
        }
        reportAllStatistics(sys, statistics);
        if (!isPerformanceEnabled) {
            sys.write(Diagnostics.Performance_timings_for_diagnostics_or_extendedDiagnostics_are_not_available_in_this_session_A_native_implementation_of_the_Web_Performance_API_could_not_be_found.message + "\n");
        }
        else {
            if (solutionPerformance) {
                // Clear selected marks and measures
                performance.forEachMeasure(name => {
                    if (!isSolutionMarkOrMeasure(name)) performance.clearMeasures(name);
                });
                performance.forEachMark(name => {
                    if (!isSolutionMarkOrMeasure(name)) performance.clearMarks(name);
                });
            }
            else {
                performance.disable();
            }
        }
    }

    function reportStatisticalValue(s: Statistic, aggregate: boolean) {
        statistics.push(s);
        if (aggregate) solutionPerformance?.addAggregateStatistic(s);
    }

    function reportCountStatistic(name: string, count: number) {
        reportStatisticalValue({ name, value: count, type: StatisticType.count }, /*aggregate*/ true);
    }

    function reportTimeStatistic(name: string, time: number, aggregate: boolean) {
        reportStatisticalValue({ name, value: time, type: StatisticType.time }, aggregate);
    }
}