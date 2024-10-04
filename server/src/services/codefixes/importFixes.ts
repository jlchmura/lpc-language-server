import { Symbol, AnyImportOrRequire, Comparison, CompilerOptions, createMultiMap, emptyArray, every, flatMap, FutureSourceFile, FutureSymbolExportInfo, getSymbolId, hostGetCanonicalFileName, importFromModuleSpecifier, ImportKind, isFullSourceFile, isVariableDeclarationInitializedToRequire, LanguageServiceHost, MultiMap, Program, some, SourceFile, SymbolExportInfo, SymbolFlags, SymbolId, SyntaxKind, toPath, TypeChecker, UserPreferences } from "../_namespaces/lpc.js";


/**
 * Computes module specifiers for multiple import additions to a file.
 *
 * @internal
 */
export interface ImportSpecifierResolver {
    getModuleSpecifierForBestExportInfo(
        exportInfo: readonly SymbolExportInfo[],
        position: number,
        isValidTypeOnlyUseSite: boolean,
        fromCacheOnly?: boolean,
    ): { exportInfo?: SymbolExportInfo | FutureSymbolExportInfo; moduleSpecifier: string; computedWithoutCacheCount: number; } | undefined;
}

/** @internal */
export function createImportSpecifierResolver(importingFile: SourceFile, program: Program, host: LanguageServiceHost, preferences: UserPreferences): ImportSpecifierResolver {
    //const packageJsonImportFilter = createPackageJsonImportFilter(importingFile, preferences, host);
    const importMap = createExistingImportMap(program.getTypeChecker(), importingFile, program.getCompilerOptions());
    return { getModuleSpecifierForBestExportInfo };

    function getModuleSpecifierForBestExportInfo(
        exportInfo: readonly SymbolExportInfo[],
        position: number,
        isValidTypeOnlyUseSite: boolean,
        fromCacheOnly?: boolean,
    ): { exportInfo?: SymbolExportInfo | FutureSymbolExportInfo; moduleSpecifier: string; computedWithoutCacheCount: number; } | undefined {
        const { fixes, computedWithoutCacheCount } = getImportFixes(
            exportInfo,
            position,
            isValidTypeOnlyUseSite,
            /*useRequire*/ false,
            program,
            importingFile,
            host,
            preferences,
            importMap,
            fromCacheOnly,
        );
        const result = undefined;// getBestFix(fixes, importingFile, program, undefined, host, preferences);
        return result && { ...result, computedWithoutCacheCount };
    }
}

function createExistingImportMap(checker: TypeChecker, importingFile: SourceFile, compilerOptions: CompilerOptions) {
    let importMap: MultiMap<SymbolId, AnyImportOrRequire> | undefined;
    for (const moduleSpecifier of importingFile.imports) {
        const i = importFromModuleSpecifier(moduleSpecifier);
        if (isVariableDeclarationInitializedToRequire(i.parent)) {
            const moduleSymbol = checker.resolveExternalModuleName(moduleSpecifier);
            if (moduleSymbol) {
                (importMap ||= createMultiMap()).add(getSymbolId(moduleSymbol), i.parent);
            }
        }
        // else if (i.kind === SyntaxKind.ImportDeclaration || i.kind === SyntaxKind.ImportEqualsDeclaration || i.kind === SyntaxKind.JSDocImportTag) {
        //     const moduleSymbol = checker.getSymbolAtLocation(moduleSpecifier);
        //     if (moduleSymbol) {
        //         (importMap ||= createMultiMap()).add(getSymbolId(moduleSymbol), i);
        //     }
        // }
    }

    return {
        getImportsForExportInfo: ({ moduleSymbol, exportKind, targetFlags, symbol }: SymbolExportInfo | FutureSymbolExportInfo): readonly FixAddToExistingImportInfo[] => {
            const matchingDeclarations = importMap?.get(getSymbolId(moduleSymbol));
            if (!matchingDeclarations) return emptyArray;

            // Can't use an es6 import for a type in JS.
            // if (
            //     isSourceFileJS(importingFile)
            //     && !(targetFlags & SymbolFlags.Value)
            //     && !every(matchingDeclarations, isJSDocImportTag)
            // ) return emptyArray;

            const importKind = ImportKind.Default;// getImportKind(importingFile, exportKind, compilerOptions);
            return matchingDeclarations.map(declaration => ({ declaration, importKind, symbol, targetFlags }));
        },
    };
}

function getImportFixes(
    exportInfos: readonly SymbolExportInfo[] | readonly FutureSymbolExportInfo[],
    usagePosition: number | undefined,
    isValidTypeOnlyUseSite: boolean,
    useRequire: boolean,
    program: Program,
    sourceFile: SourceFile | FutureSourceFile,
    host: LanguageServiceHost,
    preferences: UserPreferences,
    importMap = isFullSourceFile(sourceFile) ? createExistingImportMap(program.getTypeChecker(), sourceFile, program.getCompilerOptions()) : undefined,
    fromCacheOnly?: boolean,
): { computedWithoutCacheCount: number; fixes: never[] ; } { //readonly ImportFixWithModuleSpecifier[]; } {
    return { computedWithoutCacheCount: 0, fixes: emptyArray };
    // const checker = program.getTypeChecker();
    // const existingImports = importMap ? flatMap(exportInfos, importMap.getImportsForExportInfo) : emptyArray;
    // const useNamespace = usagePosition !== undefined && tryUseExistingNamespaceImport(existingImports, usagePosition);
    // const addToExisting = tryAddToExistingImport(existingImports, isValidTypeOnlyUseSite, checker, program.getCompilerOptions());
    // if (addToExisting) {
    //     // Don't bother providing an action to add a new import if we can add to an existing one.
    //     return {
    //         computedWithoutCacheCount: 0,
    //         fixes: [...(useNamespace ? [useNamespace] : emptyArray), addToExisting],
    //     };
    // }

    // const { fixes, computedWithoutCacheCount = 0 } = getFixesForAddImport(
    //     exportInfos,
    //     existingImports,
    //     program,
    //     sourceFile,
    //     usagePosition,
    //     isValidTypeOnlyUseSite,
    //     useRequire,
    //     host,
    //     preferences,
    //     fromCacheOnly,
    // );
    // return {
    //     computedWithoutCacheCount,
    //     fixes: [...(useNamespace ? [useNamespace] : emptyArray), ...fixes],
    // };
}

// function getBestFix(fixes: readonly ImportFixWithModuleSpecifier[], sourceFile: SourceFile | FutureSourceFile, program: Program, packageJsonImportFilter: PackageJsonImportFilter, host: LanguageServiceHost, preferences: UserPreferences): ImportFixWithModuleSpecifier | undefined {
//     if (!some(fixes)) return;
//     // These will always be placed first if available, and are better than other kinds
//     if (fixes[0].kind === ImportFixKind.UseNamespace || fixes[0].kind === ImportFixKind.AddToExisting) {
//         return fixes[0];
//     }

//     return fixes.reduce((best, fix) =>
//         // Takes true branch of conditional if `fix` is better than `best`
//         compareModuleSpecifiers(
//                 fix,
//                 best,
//                 sourceFile,
//                 program,
//                 preferences,
//                 packageJsonImportFilter.allowsImportingSpecifier,
//                 fileName => toPath(fileName, host.getCurrentDirectory(), hostGetCanonicalFileName(host)),
//             ) === Comparison.LessThan ? fix : best
//     );
// }

/** Information needed to augment an existing import declaration. */
interface FixAddToExistingImportInfo {
    readonly declaration: AnyImportOrRequire;
    readonly importKind: ImportKind;
    readonly targetFlags: SymbolFlags;
    readonly symbol?: Symbol;
}

