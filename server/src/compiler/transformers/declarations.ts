import { contains, DiagnosticWithLocation, EmitHost, EmitResolver, emptyArray, factory, filter, getSourceFilesToEmit, isSourceFileNotJson, SourceFile, transformNodes } from "../_namespaces/lpc.js";

/** @internal */
export function getDeclarationDiagnostics(host: EmitHost, resolver: EmitResolver, file: SourceFile | undefined): DiagnosticWithLocation[] | undefined {
    const compilerOptions = host.getCompilerOptions();
    const files = filter(getSourceFilesToEmit(host, file), isSourceFileNotJson);
    const result = transformNodes(
        resolver,
        host,
        factory,
        compilerOptions,
        file ? contains(files, file) ? [file] : emptyArray : files,
        [], //TODO [transformDeclarations],
        /*allowDtsFiles*/ false,
    );
    return result.diagnostics;
}