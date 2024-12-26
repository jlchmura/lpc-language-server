import * as lpc from "../lpc/lpc.js";
import { ConfiguredProject } from "../server/project.js";

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
const projectFolder = lpc.server.findArgument("--project");
const configFileName = lpc.findConfigFile(projectFolder || lpc.sys.getCurrentDirectory(), lpc.sys.fileExists);
const canonicalConfigFilePath = (toCanonicalFileName(configFileName)) as lpc.server.NormalizedPath;

lpc.sys.write(`Using config file: ${canonicalConfigFilePath}\n`);


const parsedConfig = lpc.getParsedCommandLineOfConfigFile(configFileName, {}, {
    ...lpc.sys,
    getCurrentDirectory: () => lpc.sys.getCurrentDirectory(),
    onUnRecoverableConfigFileDiagnostic: (d)=>{console.error(d);},
});

const compilerOptions = parsedConfig.options;
const compilerHost = lpc.createCompilerHost(compilerOptions);
compilerHost.getDefaultLibFileName = () => lpc.combinePaths(projectFolder, lpc.getDefaultLibFolder(compilerOptions), lpc.getDefaultLibFileName(compilerOptions));

lpc.sys.write(`Found ${parsedConfig.fileNames.length} files.\n`);

const createProgramOptions: lpc.CreateProgramOptions = {
    host: compilerHost,
    rootNames: parsedConfig.fileNames,
    options: compilerOptions,                
    oldProgram: undefined,                
};
            
// create program and get file we are trying to compile
const program = lpc.createProgram(createProgramOptions);
program.getRootFileNames().forEach(f => {
    const sourceFile = program.getSourceFile(f);
    const parseDiags = sourceFile.parseDiagnostics;
    const semanticDiags = program.getSemanticDiagnostics(sourceFile);    
    const diags = parseDiags.concat(semanticDiags);
    lpc.sys.write(`Root file: ${f} (${diags.length})\n`);
});


