import { Identifier, ModuleExportName, SourceFile, StringLiteral } from "./_namespaces/lpc";

/** @internal */
export interface ImportsResult {
    /** For every import of the symbol, the location and local symbol for the import. */
    importSearches: readonly [ModuleExportName, Symbol][];
    /** For rename imports/exports `{ foo as bar }`, `foo` is not a local, so it may be added as a reference immediately without further searching. */
    singleReferences: readonly (Identifier | StringLiteral)[];
    /** List of source files that may (or may not) use the symbol via a namespace. (For UMD modules this is every file.) */
    indirectUsers: readonly SourceFile[];
}
/** @internal */
export type ImportTracker = (exportSymbol: Symbol, exportInfo: ExportInfo, isForRename: boolean) => ImportsResult;


/**
 * Info about an exported symbol to perform recursive search on.
 *
 * @internal
 */
export interface ExportInfo {
    exportingModuleSymbol: Symbol;
    exportKind: ExportKind;
}

/** @internal */
export const enum ExportKind {
    Named,
    Default,
    ExportEquals,
}

/** @internal */
export const enum ImportExport {
    Import,
    Export,
}