import {
    CompilerHost,
    CompilerOptions,
    GetEffectiveTypeRootsHost,
    JSDocParsingMode,
    MinimalResolutionCacheHost,
    Node,
    Program,
    ProjectReference,
    ResolvedModule,
    ResolvedModuleWithFailedLookupLocations,
    ResolvedProjectReference,
    SourceFile,
    SourceFileLike,
    StringLiteral,
    Symbol,
    TextChangeRange,
    TextSpan,
} from "./_namespaces/lpc.js";

declare module "../compiler/types.js" {
    // Module transform: converted from interface augmentation
    export interface Node {
        getSourceFile(): SourceFile;
        getChildCount(sourceFile?: SourceFile): number;
        getChildAt(index: number, sourceFile?: SourceFile): Node;
        getChildren(sourceFile?: SourceFile): readonly Node[];
        /** @internal */
        getChildren(sourceFile?: SourceFileLike): readonly Node[]; // eslint-disable-line @typescript-eslint/unified-signatures
        getStart(
            sourceFile?: SourceFile,
            includeJsDocComment?: boolean
        ): number;
        /** @internal */
        getStart(
            sourceFile?: SourceFileLike,
            includeJsDocComment?: boolean
        ): number; // eslint-disable-line @typescript-eslint/unified-signatures
        getFullStart(): number;
        getEnd(): number;
        getWidth(sourceFile?: SourceFileLike): number;
        getFullWidth(): number;
        getLeadingTriviaWidth(sourceFile?: SourceFile): number;
        getFullText(sourceFile?: SourceFile): string;
        getText(sourceFile?: SourceFile): string;
        getFirstToken(sourceFile?: SourceFile): Node | undefined;
        /** @internal */
        getFirstToken(sourceFile?: SourceFileLike): Node | undefined; // eslint-disable-line @typescript-eslint/unified-signatures
        getLastToken(sourceFile?: SourceFile): Node | undefined;
        /** @internal */
        getLastToken(sourceFile?: SourceFileLike): Node | undefined; // eslint-disable-line @typescript-eslint/unified-signatures
        // See ts.forEachChild for documentation.
        forEachChild<T>(
            cbNode: (node: Node) => T | undefined,
            cbNodeArray?: (nodes: NodeArray<Node>) => T | undefined
        ): T | undefined;
    }
}

declare module "../compiler/types.js" {
    // Module transform: converted from interface augmentation
    export interface SourceFile {
        /** @internal */ version: string;
        /** @internal */ scriptSnapshot: IScriptSnapshot | undefined;
        /** @internal */ nameTable: Map<string, number> | undefined;

        /** @internal */ getNamedDeclarations(): Map<
            string,
            readonly Declaration[]
        >;

        getLineAndCharacterOfPosition(pos: number): LineAndCharacter;
        getLineEndOfPosition(pos: number): number;
        getLineStarts(): readonly number[];
        getPositionOfLineAndCharacter(line: number, character: number): number;
        //update(newText: string, textChangeRange: TextChangeRange): SourceFile;

        ///** @internal */ sourceMapper?: DocumentPositionMapper;
    }
}

declare module "../compiler/types.js" {
    // Module transform: converted from interface augmentation
    export interface SourceFileLike {
        getLineAndCharacterOfPosition(pos: number): LineAndCharacter;
    }
}

declare module "../compiler/types.js" {
    // Module transform: converted from interface augmentation
    export interface Identifier {
        readonly text: string;
    }
}

declare module "../compiler/types.js" {
    // Module transform: converted from interface augmentation
    export interface Symbol {
        // readonly name: string;
        getFlags(): SymbolFlags;
        // getEscapedName(): string;
        getName(): string;
        getDeclarations(): Declaration[] | undefined;
        getDocumentationComment(
            typeChecker: TypeChecker | undefined
        ): SymbolDisplayPart[];
        /** @internal */
        getContextualDocumentationComment(
            context: Node | undefined,
            checker: TypeChecker | undefined
        ): SymbolDisplayPart[];
        getJsDocTags(checker?: TypeChecker): JSDocTagInfo[];
        /** @internal */
        getContextualJsDocTags(
            context: Node | undefined,
            checker: TypeChecker | undefined
        ): JSDocTagInfo[];
    }
}

export interface SymbolDisplayPart {
    /**
     * Text of an item describing the symbol.
     */
    text: string;
    /**
     * The symbol's kind (such as 'className' or 'parameterName' or plain 'text').
     */
    kind: string;
}

export interface JSDocTagInfo {
    name: string;
    text?: SymbolDisplayPart[];
}

export interface DocumentSpan {
    textSpan: TextSpan;
    fileName: string;

    /**
     * If the span represents a location that was remapped (e.g. via a .d.ts.map file),
     * then the original filename and span will be specified here
     */
    originalTextSpan?: TextSpan;
    originalFileName?: string;

    /**
     * If DocumentSpan.textSpan is the span for name of the declaration,
     * then this is the span for relevant declaration
     */
    contextSpan?: TextSpan;
    originalContextSpan?: TextSpan;
}

export const enum ScriptElementKind {
    unknown = "",
    warning = "warning",

    /** predefined type (void) or keyword (class) */
    keyword = "keyword",

    /** top level script node */
    scriptElement = "script",

    /** module foo {} */
    moduleElement = "module",

    /** class X {} */
    classElement = "class",

    /** var x = class X {} */
    localClassElement = "local class",

    /** interface Y {} */
    interfaceElement = "interface",

    /** type T = ... */
    typeElement = "type",

    /** enum E */
    enumElement = "enum",
    enumMemberElement = "enum member",

    /**
     * Inside module and script only
     * const v = ..
     */
    variableElement = "var",

    /** Inside function */
    localVariableElement = "local var",

    /** using foo = ... */
    variableUsingElement = "using",

    /** await using foo = ... */
    variableAwaitUsingElement = "await using",

    /**
     * Inside module and script only
     * function f() { }
     */
    functionElement = "function",

    /** Inside function */
    localFunctionElement = "local function",

    /** class X { [public|private]* foo() {} } */
    memberFunctionElement = "method",

    /** class X { [public|private]* [get|set] foo:number; } */
    memberGetAccessorElement = "getter",
    memberSetAccessorElement = "setter",

    /**
     * class X { [public|private]* foo:number; }
     * interface Y { foo:number; }
     */
    memberVariableElement = "property",

    /** class X { [public|private]* accessor foo: number; } */
    memberAccessorVariableElement = "accessor",

    /**
     * class X { constructor() { } }
     * class X { static { } }
     */
    constructorImplementationElement = "constructor",

    /** interface Y { ():number; } */
    callSignatureElement = "call",

    /** interface Y { []:number; } */
    indexSignatureElement = "index",

    /** interface Y { new():Y; } */
    constructSignatureElement = "construct",

    /** function foo(*Y*: string) */
    parameterElement = "parameter",

    typeParameterElement = "type parameter",

    primitiveType = "primitive type",

    label = "label",

    alias = "alias",

    constElement = "const",

    letElement = "let",

    directory = "directory",

    externalModuleName = "external module name",

    /**
     * <JsxTagName attribute1 attribute2={0} />
     * @deprecated
     */
    jsxAttribute = "JSX attribute",

    /** String literal */
    string = "string",

    /** Jsdoc @link: in `{@link C link text}`, the before and after text "{@link " and "}" */
    link = "link",

    /** Jsdoc @link: in `{@link C link text}`, the entity name "C" */
    linkName = "link name",

    /** Jsdoc @link: in `{@link C link text}`, the link text "link text" */
    linkText = "link text",
}

export interface DefinitionInfo extends DocumentSpan {
    kind: ScriptElementKind;
    name: string;
    containerKind: ScriptElementKind;
    containerName: string;
    unverified?: boolean;
    /** @internal
     * Initially, this value is determined syntactically, but it is updated by the checker to cover
     * cases like declarations that are exported in subsequent statements.  As a result, the value
     * may be "incomplete" if this span has yet to be checked.
     */
    isLocal?: boolean;
    /** @internal */ isAmbient?: boolean;
    /** @internal */ failedAliasResolution?: boolean;
}

//
// Public services of a language service instance associated
// with a language service host instance
//
export interface LanguageService {
    /** @internal */
    getDefinitionAtPosition(
        fileName: string,
        position: number,
        searchOtherFilesOnly: false,
        stopAtAlias: boolean
    ): readonly DefinitionInfo[] | undefined;
    /** @internal */
    getDefinitionAtPosition(
        fileName: string,
        position: number,
        searchOtherFilesOnly: boolean,
        stopAtAlias: false
    ): readonly DefinitionInfo[] | undefined;
    getDefinitionAtPosition(
        fileName: string,
        position: number
    ): readonly DefinitionInfo[] | undefined;
}

export interface HostCancellationToken {
    isCancellationRequested(): boolean;
}

/**
 * Represents an immutable snapshot of a script at a specified time.Once acquired, the
 * snapshot is observably immutable. i.e. the same calls with the same parameters will return
 * the same values.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export interface IScriptSnapshot {
    /** Gets a portion of the script snapshot specified by [start, end). */
    getText(start: number, end: number): string;

    /** Gets the length of this script snapshot. */
    getLength(): number;

    /**
     * Gets the TextChangeRange that describe how the text changed between this text and
     * an older version.  This information is used by the incremental parser to determine
     * what sections of the script need to be re-parsed.  'undefined' can be returned if the
     * change range cannot be determined.  However, in that case, incremental parsing will
     * not happen and the entire document will be re - parsed.
     */
    getChangeRange(oldSnapshot: IScriptSnapshot): TextChangeRange | undefined;

    /** Releases all resources held by this script snapshot */
    dispose?(): void;
}

//
// Public interface of the host of a language service instance.
//
export interface LanguageServiceHost
    extends GetEffectiveTypeRootsHost,
        MinimalResolutionCacheHost {
    getCompilationSettings(): CompilerOptions;
    getNewLine?(): string;
    /** @internal */ updateFromProject?(): void;
    /** @internal */ updateFromProjectInProgress?: boolean;

    getProjectVersion?(): string;
    getScriptFileNames(): string[];
    //getScriptKind?(fileName: string): ScriptKind;
    getScriptVersion(fileName: string): string;
    getScriptSnapshot(fileName: string): IScriptSnapshot | undefined;
    getProjectReferences?(): readonly ProjectReference[] | undefined;
    getLocalizedDiagnosticMessages?(): any;
    getCancellationToken?(): HostCancellationToken;
    getCurrentDirectory(): string;
    getDefaultLibFileName(options: CompilerOptions): string;
    log?(s: string): void;
    trace?(s: string): void;
    error?(s: string): void;
    useCaseSensitiveFileNames?(): boolean;

    /*
     * LS host can optionally implement these methods to support completions for module specifiers.
     * Without these methods, only completions for ambient modules will be provided.
     */
    readDirectory?(
        path: string,
        extensions?: readonly string[],
        exclude?: readonly string[],
        include?: readonly string[],
        depth?: number
    ): string[];
    realpath?(path: string): string;
    /** @internal */ createHash?: ((data: string) => string) | undefined;

    /*
     * Unlike `realpath and `readDirectory`, `readFile` and `fileExists` are now _required_
     * to properly acquire and setup source files under module: node16+ modes.
     */
    readFile(path: string, encoding?: string): string | undefined;
    fileExists(path: string): boolean;

    /*
     * LS host can optionally implement these methods to support automatic updating when new type libraries are installed
     */
    getTypeRootsVersion?(): number;

    /*
     * LS host can optionally implement this method if it wants to be completely in charge of module name resolution.
     * if implementation is omitted then language service will use built-in module resolution logic and get answers to
     * host specific questions using 'getScriptSnapshot'.
     *
     * If this is implemented, `getResolvedModuleWithFailedLookupLocationsFromCache` should be too.
     */
    /** @deprecated supply resolveModuleNameLiterals instead for resolution that can handle newer resolution modes like nodenext */
    resolveModuleNames?(
        moduleNames: string[],
        containingFile: string,
        reusedNames: string[] | undefined,
        redirectedReference: ResolvedProjectReference | undefined,
        options: CompilerOptions,
        containingSourceFile?: SourceFile
    ): (ResolvedModule | undefined)[];
    // getResolvedModuleWithFailedLookupLocationsFromCache?(modulename: string, containingFile: string, resolutionMode?: ResolutionMode): ResolvedModuleWithFailedLookupLocations | undefined;
    /** @deprecated supply resolveTypeReferenceDirectiveReferences instead for resolution that can handle newer resolution modes like nodenext */
    // resolveTypeReferenceDirectives?(typeDirectiveNames: string[] | FileReference[], containingFile: string, redirectedReference: ResolvedProjectReference | undefined, options: CompilerOptions, containingFileMode?: ResolutionMode): (ResolvedTypeReferenceDirective | undefined)[];
    resolveModuleNameLiterals?(
        moduleLiterals: readonly StringLiteral[],
        containingFile: string,
        redirectedReference: ResolvedProjectReference | undefined,
        options: CompilerOptions,
        containingSourceFile: SourceFile,
        reusedNames: readonly StringLiteral[] | undefined
    ): readonly ResolvedModuleWithFailedLookupLocations[];
    // resolveTypeReferenceDirectiveReferences?<T extends FileReference | string>(
    //     typeDirectiveReferences: readonly T[],
    //     containingFile: string,
    //     redirectedReference: ResolvedProjectReference | undefined,
    //     options: CompilerOptions,
    //     containingSourceFile: SourceFile | undefined,
    //     reusedNames: readonly T[] | undefined,
    // ): readonly ResolvedTypeReferenceDirectiveWithFailedLookupLocations[];
    /** @internal */
    resolveLibrary?(
        libraryName: string,
        resolveFrom: string,
        options: CompilerOptions,
        libFileName: string
    ): ResolvedModuleWithFailedLookupLocations;
    /**
     * If provided along with custom resolveLibrary, used to determine if we should redo library resolutions
     * @internal
     */
    hasInvalidatedLibResolutions?:
        | ((libFileName: string) => boolean)
        | undefined;

    // /** @internal */ hasInvalidatedResolutions?: HasInvalidatedResolutions | undefined;
    // /** @internal */ hasChangedAutomaticTypeDirectiveNames?: HasChangedAutomaticTypeDirectiveNames;
    /** @internal */ getGlobalTypingsCacheLocation?(): string | undefined;
    // /** @internal */ getSymlinkCache?(files?: readonly SourceFile[]): SymlinkCache;
    /* Lets the Program from a AutoImportProviderProject use its host project's ModuleResolutionCache */
    // /** @internal */ getModuleResolutionCache?(): ModuleResolutionCache | undefined;

    /*
     * Required for full import and type reference completions.
     * These should be unprefixed names. E.g. `getDirectories("/foo/bar")` should return `["a", "b"]`, not `["/foo/bar/a", "/foo/bar/b"]`.
     */
    getDirectories?(directoryName: string): string[];

    /**
     * Gets a set of custom transformers to use during emit.
     */
    //getCustomTransformers?(): CustomTransformers | undefined;

    isKnownTypesPackageName?(name: string): boolean;
    //installPackage?(options: InstallPackageOptions): Promise<ApplyCodeActionCommandResult>;
    writeFile?(fileName: string, content: string): void;

    ///** @internal */ getDocumentPositionMapper?(generatedFileName: string, sourceFileName?: string): DocumentPositionMapper | undefined;
    /** @internal */ getSourceFileLike?(
        fileName: string
    ): SourceFileLike | undefined;
    // /** @internal */ getPackageJsonsVisibleToFile?(fileName: string, rootDir?: string): readonly ProjectPackageJsonInfo[];
    /** @internal */ getNearestAncestorDirectoryWithPackageJson?(
        fileName: string
    ): string | undefined;
    // /** @internal */ getPackageJsonsForAutoImport?(rootDir?: string): readonly ProjectPackageJsonInfo[];
    // /** @internal */ getCachedExportInfoMap?(): ExportInfoMap;
    // /** @internal */ getModuleSpecifierCache?(): ModuleSpecifierCache;
    /** @internal */ setCompilerHost?(host: CompilerHost): void;
    /** @internal */ useSourceOfProjectReferenceRedirect?(): boolean;
    /** @internal */ getPackageJsonAutoImportProvider?(): Program | undefined;
    // /** @internal */ sendPerformanceEvent?(kind: PerformanceEvent["kind"], durationMs: number): void;
    // getParsedCommandLine?(fileName: string): ParsedCommandLine | undefined;
    // /** @internal */ onReleaseParsedCommandLine?(configFileName: string, oldResolvedRef: ResolvedProjectReference | undefined, optionOptions: CompilerOptions): void;
    /** @internal */ onReleaseOldSourceFile?(
        oldSourceFile: SourceFile,
        oldOptions: CompilerOptions,
        hasSourceFileByPath: boolean,
        newSourceFileByResolvedPath: SourceFile | undefined
    ): void;
    ///** @internal */ getIncompleteCompletionsCache?(): IncompleteCompletionsCache;
    //** @internal */ runWithTemporaryFileUpdate?(rootFile: string, updatedText: string, cb: (updatedProgram: Program, originalProgram: Program | undefined, updatedPastedText: SourceFile) => void): void;
    jsDocParsingMode?: JSDocParsingMode | undefined;
}

/**
 * Represents an immutable snapshot of a script at a specified time.Once acquired, the
 * snapshot is observably immutable. i.e. the same calls with the same parameters will return
 * the same values.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export interface IScriptSnapshot {
    /** Gets a portion of the script snapshot specified by [start, end). */
    getText(start: number, end: number): string;

    /** Gets the length of this script snapshot. */
    getLength(): number;

    /**
     * Gets the TextChangeRange that describe how the text changed between this text and
     * an older version.  This information is used by the incremental parser to determine
     * what sections of the script need to be re-parsed.  'undefined' can be returned if the
     * change range cannot be determined.  However, in that case, incremental parsing will
     * not happen and the entire document will be re - parsed.
     */
    getChangeRange(oldSnapshot: IScriptSnapshot): TextChangeRange | undefined;

    /** Releases all resources held by this script snapshot */
    dispose?(): void;
}

export namespace ScriptSnapshot {
    class StringScriptSnapshot implements IScriptSnapshot {
        constructor(private text: string) {}

        public getText(start: number, end: number): string {
            return start === 0 && end === this.text.length
                ? this.text
                : this.text.substring(start, end);
        }

        public getLength(): number {
            return this.text.length;
        }

        public getChangeRange(): TextChangeRange | undefined {
            // Text-based snapshots do not support incremental parsing. Return undefined
            // to signal that to the caller.
            return undefined;
        }
    }

    export function fromString(text: string): IScriptSnapshot {
        return new StringScriptSnapshot(text);
    }
}
