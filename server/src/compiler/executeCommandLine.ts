import { BuildOptions, BuilderProgram, CompilerOptions, Debug, Diagnostic, DiagnosticReporter, Diagnostics, ExitStatus, ParsedCommandLine, Program, System, WatchOptions, createDiagnosticReporter, getDiagnosticText, version } from "./_namespaces/lpc";


/** @internal */
export type ExecuteCommandLineCallbacks = (program: Program | BuilderProgram | ParsedCommandLine) => void;
/** @internal */
export function executeCommandLine(
    system: System,
    cb: ExecuteCommandLineCallbacks,
    commandLineArgs: readonly string[],
): void {
        
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
