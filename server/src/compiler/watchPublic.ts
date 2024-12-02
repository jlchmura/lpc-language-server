import { BuilderProgram, CompilerHost, CompilerOptions, Diagnostic, JSDocParsingMode, Path, ProjectReference } from "./_namespaces/lpc.js";


/** Create the program with rootNames and options, if they are undefined, oldProgram and new configFile diagnostics create new program */
export type CreateProgram<T extends BuilderProgram> = (rootNames: readonly string[] | undefined, options: CompilerOptions | undefined, host?: CompilerHost, oldProgram?: T, configFileParsingDiagnostics?: readonly Diagnostic[], projectReferences?: readonly ProjectReference[] | undefined) => T;

export interface ProgramHost<T extends BuilderProgram> {
    /**
     * Used to create the program when need for program creation or recreation detected
     */
    createProgram: CreateProgram<T>;

    // Sub set of compiler host methods to read and generate new program
    useCaseSensitiveFileNames(): boolean;
    getNewLine(): string;
    getCurrentDirectory(): string;
    getDefaultLibFileName(options: CompilerOptions): string;
    getDefaultLibLocation?(): string;
    createHash?(data: string): string;

    /**
     * Use to check file presence for source files and
     * if resolveModuleNames is not provided (complier is in charge of module resolution) then module files as well
     */
    fileExists(path: string): boolean;
    /**
     * Use to read file text for source files and
     * if resolveModuleNames is not provided (complier is in charge of module resolution) then module files as well
     */
    readFile(path: string, encoding?: string): string | undefined;

    /** If provided, used for module resolution as well as to handle directory structure */
    directoryExists?(path: string): boolean;
    /** If provided, used in resolutions as well as handling directory structure */
    getDirectories?(path: string): string[];
    /** If provided, used to cache and handle directory structure modifications */
    readDirectory?(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[];

    /** Symbol links resolution */
    realpath?(path: string): string;
    /** If provided would be used to write log about compilation */
    trace?(s: string): void;
    /** If provided is used to get the environment variable */
    getEnvironmentVariable?(name: string): string | undefined;

    /**
     * @deprecated supply resolveModuleNameLiterals instead for resolution that can handle newer resolution modes like nodenext
     *
     * If provided, used to resolve the module names, otherwise typescript's default module resolution
     */
    // resolveModuleNames?(moduleNames: string[], containingFile: string, reusedNames: string[] | undefined, redirectedReference: ResolvedProjectReference | undefined, options: CompilerOptions, containingSourceFile?: SourceFile): (ResolvedModule | undefined)[];
    /**
     * @deprecated supply resolveTypeReferenceDirectiveReferences instead for resolution that can handle newer resolution modes like nodenext
     *
     * If provided, used to resolve type reference directives, otherwise typescript's default resolution
     */
    // resolveTypeReferenceDirectives?(typeReferenceDirectiveNames: string[] | readonly FileReference[], containingFile: string, redirectedReference: ResolvedProjectReference | undefined, options: CompilerOptions, containingFileMode?: ResolutionMode): (ResolvedTypeReferenceDirective | undefined)[];
    // resolveModuleNameLiterals?(
    //     moduleLiterals: readonly StringLiteralLike[],
    //     containingFile: string,
    //     redirectedReference: ResolvedProjectReference | undefined,
    //     options: CompilerOptions,
    //     containingSourceFile: SourceFile,
    //     reusedNames: readonly StringLiteralLike[] | undefined,
    // ): readonly ResolvedModuleWithFailedLookupLocations[];
    // resolveTypeReferenceDirectiveReferences?<T extends FileReference | string>(
    //     typeDirectiveReferences: readonly T[],
    //     containingFile: string,
    //     redirectedReference: ResolvedProjectReference | undefined,
    //     options: CompilerOptions,
    //     containingSourceFile: SourceFile | undefined,
    //     reusedNames: readonly T[] | undefined,
    // ): readonly ResolvedTypeReferenceDirectiveWithFailedLookupLocations[];
    // /** @internal */
    // resolveLibrary?(
    //     libraryName: string,
    //     resolveFrom: string,
    //     options: CompilerOptions,
    //     libFileName: string,
    // ): ResolvedModuleWithFailedLookupLocations;
    /**
     * If provided along with custom resolveLibrary, used to determine if we should redo library resolutions
     * @internal
     */
    hasInvalidatedLibResolutions?(libFileName: string): boolean;

    /** If provided along with custom resolveModuleNames or resolveTypeReferenceDirectives, used to determine if unchanged file path needs to re-resolve modules/type reference directives */
    hasInvalidatedResolutions?(filePath: Path): boolean;
    /**
     * Returns the module resolution cache used by a provided `resolveModuleNames` implementation so that any non-name module resolution operations (eg, package.json lookup) can reuse it
     */
    //getModuleResolutionCache?(): ModuleResolutionCache | undefined;

    jsDocParsingMode?: JSDocParsingMode;

    // Internal interface used to wire emit through same host

    // TODO: GH#18217 Optional methods are frequently asserted
    /** @internal */
    createDirectory?(path: string): void;
    /** @internal */
    writeFile?(path: string, data: string, writeByteOrderMark?: boolean): void;
    // For testing
    /** @internal */
    storeSignatureInfo?: boolean;
    /** @internal */
    now?(): Date;
}