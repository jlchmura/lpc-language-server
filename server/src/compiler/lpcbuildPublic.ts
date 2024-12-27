import { toPath as lpc_toPath, BuilderProgram, CompilerHost, CompilerOptions, CompilerOptionsValue, Diagnostic, DiagnosticReporter, Diagnostics, ExitStatus, ExtendedConfigCacheEntry, ModuleResolutionCache, ParseConfigFileHost, ParsedCommandLine, Path, Program, ProgramHost, ResolvedConfigFileName, System, WatchFactory, WatchOptions, WatchType, createCompilerDiagnostic, getParsedCommandLineOfConfigFile, noop, performance, resolveConfigFileProjectName, resolvePath, CreateProgram, sys, Debug } from "./_namespaces/lpc";

export type ReportEmitErrorSummary = (errorCount: number, filesInError: (ReportFileInError | undefined)[]) => void;

export interface ReportFileInError {
    fileName: string;
    line: number;
}

export interface BuildOptions {
    dry?: boolean;
    force?: boolean;
    verbose?: boolean;

    /** @internal */ clean?: boolean;
    /** @internal */ watch?: boolean;
    /** @internal */ help?: boolean;

    /** @internal */ preserveWatchOutput?: boolean;
    /** @internal */ listEmittedFiles?: boolean;
    /** @internal */ listFiles?: boolean;
    /** @internal */ explainFiles?: boolean;
    /** @internal */ pretty?: boolean;
    incremental?: boolean;
    assumeChangesOnlyAffectDirectDependencies?: boolean;
    declaration?: boolean;
    declarationMap?: boolean;
    emitDeclarationOnly?: boolean;
    sourceMap?: boolean;
    inlineSourceMap?: boolean;

    traceResolution?: boolean;
    /** @internal */ diagnostics?: boolean;
    /** @internal */ extendedDiagnostics?: boolean;
    /** @internal */ locale?: string;
    /** @internal */ generateCpuProfile?: string;
    /** @internal */ generateTrace?: string;

    [option: string]: CompilerOptionsValue | undefined;
}

export interface SolutionBuilderHost<T extends BuilderProgram> extends ProgramHost<T> {
    getParsedCommandLine?(fileName: string): ParsedCommandLine | undefined;
    reportDiagnostic: DiagnosticReporter; // Technically we want to move it out and allow steps of actions on Solution, but for now just merge stuff in build host here
}

type ConfigFileCacheEntry = ParsedCommandLine | Diagnostic;

interface SolutionBuilderState<T extends BuilderProgram> extends WatchFactory<WatchType, ResolvedConfigFileName> {
    readonly parseConfigFileHost: ParseConfigFileHost;
    readonly write: ((s: string) => void) | undefined;
    readonly host: SolutionBuilderHost<T>;
    // State of solution
    readonly options: BuildOptions;
    readonly configFileCache: Map<ResolvedConfigFilePath, ConfigFileCacheEntry>;
    readonly baseCompilerOptions: CompilerOptions;
    readonly rootNames: readonly string[];
    readonly baseWatchOptions: WatchOptions | undefined;
    readonly compilerHost: CompilerHost; //& ReadBuildProgramHost;
    readonly moduleResolutionCache: ModuleResolutionCache | undefined;
    readonly extendedConfigCache: Map<string, ExtendedConfigCacheEntry>;
    readonly resolvedConfigFilePaths: Map<string, ResolvedConfigFilePath>;

    readonly projectErrorsReported: Map<ResolvedConfigFilePath, true>;
    readonly diagnostics: Map<ResolvedConfigFilePath, readonly Diagnostic[]>;

    readFileWithCache: (f: string) => string | undefined;
    projectCompilerOptions: CompilerOptions;
}

/** @internal */
export type ResolvedConfigFilePath = ResolvedConfigFileName & Path;

function parseConfigFile<T extends BuilderProgram>(state: SolutionBuilderState<T>, configFileName: ResolvedConfigFileName, configFilePath: ResolvedConfigFilePath): ParsedCommandLine | undefined {
    // const { configFileCache } = state;
    // const value = configFileCache.get(configFilePath);
    // if (value) {
    //     return isParsedCommandLine(value) ? value : undefined;
    // }

    performance.mark("SolutionBuilder::beforeConfigFileParsing");
    let diagnostic: Diagnostic | undefined;
    const { parseConfigFileHost, baseCompilerOptions, baseWatchOptions, extendedConfigCache, host } = state;
    let parsed: ParsedCommandLine | undefined;
    if (host.getParsedCommandLine) {
        parsed = host.getParsedCommandLine(configFileName);
        if (!parsed) diagnostic = createCompilerDiagnostic(Diagnostics.File_0_not_found, configFileName);
    }
    else {
        parseConfigFileHost.onUnRecoverableConfigFileDiagnostic = d => diagnostic = d;
        parsed = getParsedCommandLineOfConfigFile(configFileName, baseCompilerOptions, parseConfigFileHost, extendedConfigCache, baseWatchOptions);
        parseConfigFileHost.onUnRecoverableConfigFileDiagnostic = noop;
    }
    // configFileCache.set(configFilePath, parsed || diagnostic!);
    performance.mark("SolutionBuilder::afterConfigFileParsing");
    performance.measure("SolutionBuilder::Config file parsing", "SolutionBuilder::beforeConfigFileParsing", "SolutionBuilder::afterConfigFileParsing");
    return parsed;
}

function toPath<T extends BuilderProgram>(state: SolutionBuilderState<T>, fileName: string) {
    return lpc_toPath(fileName, state.compilerHost.getCurrentDirectory(), state.compilerHost.getCanonicalFileName);
}

function toResolvedConfigFilePath<T extends BuilderProgram>(state: SolutionBuilderState<T>, fileName: ResolvedConfigFileName): ResolvedConfigFilePath {
    const { resolvedConfigFilePaths } = state;
    const path = resolvedConfigFilePaths.get(fileName);
    if (path !== undefined) return path;

    const resolvedPath = toPath(state, fileName) as ResolvedConfigFilePath;
    resolvedConfigFilePaths.set(fileName, resolvedPath);
    return resolvedPath;
}

function resolveProjectName<T extends BuilderProgram>(state: SolutionBuilderState<T>, name: string): ResolvedConfigFileName {
    return resolveConfigFileProjectName(resolvePath(state.compilerHost.getCurrentDirectory(), name));
}

function reportErrors<T extends BuilderProgram>({ host }: SolutionBuilderState<T>, errors: readonly Diagnostic[]) {
    errors.forEach(err => host.reportDiagnostic(err));
}

function reportAndStoreErrors<T extends BuilderProgram>(state: SolutionBuilderState<T>, proj: ResolvedConfigFilePath, errors: readonly Diagnostic[]) {
    reportErrors(state, errors);
    state.projectErrorsReported.set(proj, true);
    if (errors.length) {
        state.diagnostics.set(proj, errors);
    }
}

function reportParseConfigFileDiagnostic<T extends BuilderProgram>(state: SolutionBuilderState<T>, proj: ResolvedConfigFilePath) {
    reportAndStoreErrors(state, proj, [state.configFileCache.get(proj) as Diagnostic]);
}

interface ProjectCreateInfo {    
    project: ResolvedConfigFileName;
    projectPath: ResolvedConfigFilePath;
    projectIndex: number;
    config: ParsedCommandLine;
}

function getProjectCreateInfo<T extends BuilderProgram>(state: SolutionBuilderState<T>, projects: string[]) {
    const nextProject = projects.at(0);
    const project = nextProject && resolveProjectName(state, nextProject);
    const projectPath = toResolvedConfigFilePath(state, project);

    const config = parseConfigFile(state, project, projectPath);
    if (!config) {
        reportParseConfigFileDiagnostic(state, projectPath);
        // projectPendingBuild.delete(projectPath);
        // continue;
        return;
    }

    return {        
        project,
        projectPath,
        projectIndex: 0,
        config,
    };
}

export function createSolutionBuilderHost<T extends BuilderProgram= BuilderProgram>(system = sys, createProgram?: CreateProgram<T>, reportDiagnostic?: DiagnosticReporter, reportSolutionBuilderStatus?: DiagnosticReporter, reportErrorSummary?: ReportEmitErrorSummary) {
    Debug.fail("todo");
    // const host = createSolutionBuilderHostBase(system, createProgram, reportDiagnostic, reportSolutionBuilderStatus) as SolutionBuilderHost<T>;
    // host.reportErrorSummary = reportErrorSummary;
    // return host;
}
