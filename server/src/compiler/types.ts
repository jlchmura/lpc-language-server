import { BaseNodeFactory, CreateSourceFileOptions, EmitHelperFactory, GetCanonicalFileName, MapLike, ModeAwareCache, ModuleResolutionCache, MultiMap, Mutable, NodeFactoryFlags, PackageJsonInfo, Pattern, ThisContainer } from "./_namespaces/lpc.js";

// Note: 'brands' in our syntax nodes serve to give us a small amount of nominal typing.
// Consider 'Expression'.  Without the brand, 'Expression' is actually no different
// (structurally) than 'Node'.  Because of this you can pass any Node to a function that
// takes an Expression without any error.  By using the 'brands' we ensure that the type
// checker actually thinks you have something of the right type.  Note: the brands are
// never actually given values.  At runtime they have zero cost.

export type NodeId = number;
export type SymbolId = number;

// branded string type used to store absolute, normalized and canonicalized paths
// arbitrary file name can be converted to Path via toPath function
export type Path = string & { __pathBrand: any; };

/** SymbolTable based on ES6 Map interface. */
export type SymbolTable = Map<string, Symbol>;


export interface TextRange {
    pos: number;
    end: number;    
}

export interface ReadonlyTextRange {
    readonly pos: number;
    readonly end: number;    
}

export interface MacroIncludedFileRange {
    posInOrigin?: number;
    endInOrigin?: number;
    originFilename?: string;
}


/** Base Node */
export interface Node extends ReadonlyTextRange {
    readonly kind: SyntaxKind;
    readonly flags: NodeFlags;
    /** @internal */ modifierFlagsCache: ModifierFlags;
    /** @internal */ readonly transformFlags: TransformFlags; // Flags for transforms
    /** @internal */ id?: NodeId; // Unique id (used to look up NodeLinks)
    readonly parent: Node; // Parent node (initialized by binding)
    /** @internal */ original?: Node; // The original node if this is an updated node.
    /** @internal */ emitNode?: EmitNode; // Associated EmitNode (initialized by transforms)    
    // NOTE: `symbol` and `localSymbol` have been moved to `Declaration`
    //       `locals` and `nextContainer` have been moved to `LocalsContainer`
    //       `flowNode` has been moved to `FlowContainer`
    //       see: https://github.com/microsoft/TypeScript/pull/51682
}

// NOTE: Any new properties should be accounted for in `mergeEmitNode` in factory/nodeFactory.ts
// dprint-ignore
export interface EmitNode {
    flags: EmitFlags;                        // Flags that customize emit
    internalFlags: InternalEmitFlags;        // Internal flags that customize emit
    annotatedNodes?: Node[];                 // Tracks Parse-tree nodes with EmitNodes for eventual cleanup.
    leadingComments?: SynthesizedComment[];  // Synthesized leading comments
    trailingComments?: SynthesizedComment[]; // Synthesized trailing comments
    commentRange?: TextRange;                // The text range to use when emitting leading or trailing comments
    // sourceMapRange?: SourceMapRange;         // The text range to use when emitting leading or trailing source mappings
    // tokenSourceMapRanges?: (SourceMapRange | undefined)[]; // The text range to use when emitting source mappings for tokens
    constantValue?: string | number;         // The constant value of an expression
    externalHelpersModuleName?: Identifier;  // The local name for an imported helpers module
    externalHelpers?: boolean;
    helpers?: EmitHelper[];                  // Emit helpers for the node
    startsOnNewLine?: boolean;               // If the node should begin on a new line
    snippetElement?: SnippetElement;         // Snippet element of the node
    typeNode?: TypeNode;                     // VariableDeclaration type
    classThis?: Identifier;                  // Identifier that points to a captured static `this` for a class which may be updated after decorators are applied
    assignedName?: Expression;               // Expression used as the assigned name of a class or function
    identifierTypeArguments?: NodeArray<TypeNode | TypeParameterDeclaration>; // Only defined on synthesized identifiers. Though not syntactically valid, used in emitting diagnostics, quickinfo, and signature help.
    autoGenerate: AutoGenerateInfo | undefined; // Used for auto-generated identifiers and private identifiers.
    // generatedImportReference?: ImportSpecifier; // Reference to the generated import specifier this identifier refers to
}




export interface TypeChecker {    
    getTypeOfSymbol(symbol: Symbol): Type;
    createSymbol(flags: SymbolFlags, name: string, checkFlags?: CheckFlags): TransientSymbol;
    getDeclaredTypeOfSymbol(symbol: Symbol): Type;
    /** @internal */ getNodeCount(): number;
    /** @internal */ getIdentifierCount(): number;
    /** @internal */ getSymbolCount(): number;
    /** @internal */ getTypeCount(): number;
    /** @internal */ getInstantiationCount(): number;
    
    getStringType(): Type;

    signatureToString(signature: Signature, enclosingDeclaration?: Node, flags?: TypeFormatFlags, kind?: SignatureKind): string;
    symbolToString(symbol: Symbol, enclosingDeclaration?: Node, meaning?: SymbolFlags, flags?: SymbolFormatFlags): string;
    getSignatureFromDeclaration(declaration: SignatureDeclaration): Signature | undefined;

    // Should not be called directly.  Should only be accessed through the Program instance.
    /** @internal */ getDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken, nodesToCheck?: Node[]): Diagnostic[];
    /** @internal */ getGlobalDiagnostics(): Diagnostic[];
    /** @internal */ getEmitResolver(sourceFile?: SourceFile, cancellationToken?: CancellationToken, forceDts?: boolean): EmitResolver;
    
    /** Follow all aliases to get the original symbol. */
    getAliasedSymbol(symbol: Symbol): Symbol;
    getSymbolAtLocation(node: Node): Symbol | undefined;
    
    /** @internal */
    runWithCurrentFile<T>(node: Node, callback: () => T);

    getTypeOfSymbolAtLocation(symbol: Symbol, node: Node): Type;
    getRootSymbols(symbol: Symbol): readonly Symbol[];
    
    evaluate(expr: Expression, location?: Declaration): EvaluatorResult<string | number>;

    /**
     * True if this type is assignable to `ReadonlyArray<any>`.
     */
    isArrayLikeType(type: Type): boolean;
    /**
     * True if `contextualType` should not be considered for completions because
     * e.g. it specifies `kind: "a"` and obj has `kind: "b"`.
     *
     * @internal
     */
    isTypeInvalidDueToUnionDiscriminant(contextualType: Type, obj: ObjectLiteralExpression): boolean;
    /** @internal */ typeHasCallOrConstructSignatures(type: Type): boolean;

    /** Note that the resulting nodes cannot be checked. */
    typeToTypeNode(type: Type, enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined): TypeNode | undefined;
    /** @internal */ typeToTypeNode(type: Type, enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined, tracker?: SymbolTracker): TypeNode | undefined; // eslint-disable-line @typescript-eslint/unified-signatures
    getReturnTypeOfSignature(signature: Signature): Type;
    
    /**
     * For a union, will include a property if it's defined in *any* of the member types.
     * So for `{ a } | { b }`, this will include both `a` and `b`.
     * Does not include properties of primitive types.
     *
     * @internal
     */
    getAllPossiblePropertiesOfTypes(type: readonly Type[]): Symbol[];

    /**
     * An external module with an 'export =' declaration resolves to the target of the 'export =' declaration,
     * and an external module with no 'export =' declaration resolves to the module itself.
     *
     * @internal
     */
    resolveExternalModuleSymbol(symbol: Symbol): Symbol;
    resolveName(name: string, location: Node | undefined, meaning: SymbolFlags, excludeGlobals: boolean): Symbol | undefined;
    resolveBaseTypesOfClass(type: InterfaceType): Type[];
    isArgumentsSymbol(symbol: Symbol): boolean;
    

    /** @internal */
    getTypeOfPropertyAccessExpr(node: PropertyAccessExpression): Type;

    /** @internal */ isDeclarationVisible(node: Declaration /*| AnyImportSyntax*/): boolean;
    /**
     * returns unknownSignature in the case of an error.
     * returns undefined if the node is not valid.
     * @param argumentCount Apparent number of arguments, passed in case of a possibly incomplete call. This should come from an ArgumentListInfo. See `signatureHelp.ts`.
     */
    getResolvedSignature(node: CallLikeExpression, candidatesOutArray?: Signature[], argumentCount?: number): Signature | undefined;
    /** @internal */ getResolvedSignatureForSignatureHelp(node: CallLikeExpression, candidatesOutArray?: Signature[], argumentCount?: number): Signature | undefined;

    /**
     * The function returns the value (local variable) symbol of an identifier in the short-hand property assignment.
     * This is necessary as an identifier in short-hand property assignment can contains two meaning: property name and property value.
     */
    getShorthandAssignmentValueSymbol(location: Node | undefined): Symbol | undefined;

    /** @internal */ getContextualTypeForArgumentAtIndex(call: CallLikeExpression, argIndex: number): Type | undefined;
    
    /**
     * @param node A location where we might consider accessing `this`. Not necessarily a ThisExpression.
     *
     * @internal
     */
    tryGetThisTypeAt(node: Node, includeGlobalThis?: boolean, container?: ThisContainer): Type | undefined;

    /** @internal */ getCandidateSignaturesForStringLiteralCompletions(call: CallLikeExpression, editingArgument: Node): Signature[];
    
    isUnknownSymbol(symbol: Symbol): boolean;
    isUndefinedSymbol(symbol: Symbol): boolean;
    getMergedSymbol(symbol: Symbol): Symbol;
    getTypeAtLocation(node: Node): Type;
    /** @internal */ getContextualType(node: Expression, contextFlags?: ContextFlags): Type | undefined; // eslint-disable-line @typescript-eslint/unified-signatures
    /** @internal */ getContextualTypeForObjectLiteralElement(element: ObjectLiteralElementLike): Type | undefined;
    /** @internal */ resolveExternalModuleName(moduleSpecifier: Expression): Symbol | undefined;    
    getSymbolsInScope(location: Node, meaning: SymbolFlags): Symbol[];
    
    /**
     * Depending on the operation performed, it may be appropriate to throw away the checker
     * if the cancellation token is triggered. Typically, if it is used for error checking
     * and the operation is cancelled, then it should be discarded, otherwise it is safe to keep.
     */
    runWithCancellationToken<T>(token: CancellationToken, cb: (checker: TypeChecker) => T): T;
    /**@internal */
    runWithCancellationToken<T>(token: CancellationToken | undefined, cb: (checker: TypeChecker) => T): T; // eslint-disable-line @typescript-eslint/unified-signatures
    /** Note that the resulting nodes cannot be checked. */
    symbolToTypeParameterDeclarations(symbol: Symbol, enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined): NodeArray<TypeParameterDeclaration> | undefined;

    /** @internal */ writeType(type: Type, enclosingDeclaration?: Node, flags?: TypeFormatFlags, writer?: EmitTextWriter): string;
    /** @internal */ writeSymbol(symbol: Symbol, enclosingDeclaration?: Node, meaning?: SymbolFlags, flags?: SymbolFormatFlags, writer?: EmitTextWriter): string;
    /** @internal */ writeSignature(signature: Signature, enclosingDeclaration?: Node, flags?: TypeFormatFlags, kind?: SignatureKind, writer?: EmitTextWriter): string;
    
    /** @internal */ isNullableType(type: Type): boolean;
    getNullableType(type: Type, flags: TypeFlags): Type;
    getNonNullableType(type: Type): Type;
    getSignaturesOfType(type: Type, kind: SignatureKind): readonly Signature[];
    /** @internal */ getNonOptionalType(type: Type): Type;
    getIndexTypeOfType(type: Type, kind: IndexKind): Type | undefined;
    getBaseConstraintOfType(type: Type): Type | undefined;
    getDefaultFromTypeParameter(type: Type): Type | undefined;
    getPropertyOfType(type: Type, propertyName: string): Symbol | undefined;
    getTypeFromTypeNode(node: TypeNode): Type;
    getFullyQualifiedName(symbol: Symbol): string;

    getWidenedType(type: Type): Type;
    /** @internal */ getUnionType(types: Type[], subtypeReduction?: UnionReduction): Type;
    getAugmentedPropertiesOfType(type: Type): Symbol[];
    getPropertiesOfType(type: Type): Symbol[];
    /** @internal */ getRelationCacheSizes(): { assignable: number; identity: number; subtype: number; strictSubtype: number; };
    /**
     * Note that this will return undefined in the following case:
     *     // a.ts
     *     export namespace N { export class C { } }
     *     // b.ts
     *     <<enclosingDeclaration>>
     * Where `C` is the symbol we're looking for.
     * This should be called in a loop climbing parents of the symbol, so we'll get `N`.
     *
     * @internal
     */
    getAccessibleSymbolChain(symbol: Symbol, enclosingDeclaration: Node | undefined, meaning: SymbolFlags, useOnlyExternalAliasing: boolean): Symbol[] | undefined;
    /**
     * Exclude accesses to private properties.
     *
     * @internal
     */
    isValidPropertyAccessForCompletions(node: PropertyAccessExpression | /*ImportTypeNode |*/ QualifiedName, type: Type, property: Symbol): boolean;
    getExportsOfModule(moduleSymbol: Symbol): Symbol[];
    /** @internal */ getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(symbol: Symbol): readonly TypeParameter[] | undefined;
    getTypePredicateOfSignature(signature: Signature): TypePredicate | undefined;
    /** @internal */ writeTypePredicate(predicate: TypePredicate, enclosingDeclaration?: Node, flags?: TypeFormatFlags, writer?: EmitTextWriter): string;
    /** Note that the resulting nodes cannot be checked. */
    typeParameterToDeclaration(parameter: TypeParameter, enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined): TypeParameterDeclaration | undefined;
    /** Note that the resulting nodes cannot be checked. */
    symbolToParameterDeclaration(symbol: Symbol, enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined): ParameterDeclaration | undefined;
    /** @internal */ getExpandedParameters(sig: Signature): readonly (readonly Symbol[])[];
    /** @internal */ hasEffectiveRestParameter(sig: Signature): boolean;
    isOptionalParameter(node: ParameterDeclaration): boolean;

    /**
     * Does *not* get *all* suggestion diagnostics, just the ones that were convenient to report in the checker.
     * Others are added in computeSuggestionDiagnostics.
     *
     * @internal
     */
    getSuggestionDiagnostics(file: SourceFile, cancellationToken?: CancellationToken): readonly DiagnosticWithLocation[];
}

export type CompilerOptionsValue = string | number | boolean | (string | number)[] | string[] | MapLike<string> | MapLike<string[]> | ProjectReference[] | null | undefined; // eslint-disable-line no-restricted-syntax

export interface TypeAcquisition {
    enable?: boolean;
    include?: string[];
    exclude?: string[];
    disableFilenameBasedTypeAcquisition?: boolean;
    [option: string]: CompilerOptionsValue | undefined;
}


export interface ProjectReference {
    /** A normalized path on disk */
    path: string;
    /** The path as the user originally wrote it */
    originalPath?: string;
    /** @deprecated */
    prepend?: boolean;
    /** True if it is intended that this reference form a circularity */
    circular?: boolean;
}

// dprint-ignore
/** @internal */
export interface CommandLineOptionBase {
    name: string;
    type: "string" | "number" | "boolean" | "object" | "list" | "listOrElement" | Map<string, number | string>;    // a value of a primitive type, or an object literal mapping named values to actual values
    isFilePath?: boolean;                                   // True if option value is a path or fileName
    shortName?: string;                                     // A short mnemonic for convenience - for instance, 'h' can be used in place of 'help'
    description?: DiagnosticMessage;                        // The message describing what the command line switch does.
    defaultValueDescription?: string | number | boolean | DiagnosticMessage | undefined;   // The message describing what the dafault value is. string type is prepared for fixed chosen like "false" which do not need I18n.
    paramType?: DiagnosticMessage;                          // The name to be used for a non-boolean option's parameter
    isTSConfigOnly?: boolean;                               // True if option can only be specified via tsconfig.json file
    isCommandLineOnly?: boolean;
    showInSimplifiedHelpView?: boolean;
    category?: DiagnosticMessage;
    strictFlag?: true;                                      // true if the option is one of the flag under strict
    allowJsFlag?: true;
    affectsSourceFile?: true;                               // true if we should recreate SourceFiles after this option changes
    affectsModuleResolution?: true;                         // currently same effect as `affectsSourceFile`
    affectsBindDiagnostics?: true;                          // true if this affects binding (currently same effect as `affectsSourceFile`)
    affectsSemanticDiagnostics?: true;                      // true if option affects semantic diagnostics
    affectsEmit?: true;                                     // true if the options affects emit
    affectsProgramStructure?: true;                         // true if program should be reconstructed from root files if option changes and does not affect module resolution as affectsModuleResolution indirectly means program needs to reconstructed
    affectsDeclarationPath?: true;                          // true if the options affects declaration file path computed
    affectsBuildInfo?: true;                                // true if this options should be emitted in buildInfo
    transpileOptionValue?: boolean | undefined;             // If set this means that the option should be set to this value when transpiling
    extraValidation?: (value: CompilerOptionsValue) => [DiagnosticMessage, ...string[]] | undefined; // Additional validation to be performed for the value to be valid
    disallowNullOrUndefined?: true;                         // If set option does not allow setting null
    allowConfigDirTemplateSubstitution?: true;              // If set option allows substitution of `${configDir}` in the value
}

/** @internal */
export interface OptionsNameMap {
    optionsNameMap: Map<string, CommandLineOption>;
    shortOptionNames: Map<string, string>;
}

/** @internal */
export interface AlternateModeDiagnostics {
    diagnostic: DiagnosticMessage;
    getOptionsNameMap: () => OptionsNameMap;
}

/** @internal */
export interface DidYouMeanOptionsDiagnostics {
    alternateMode?: AlternateModeDiagnostics;
    optionDeclarations: CommandLineOption[];
    unknownOptionDiagnostic: DiagnosticMessage;
    unknownDidYouMeanDiagnostic: DiagnosticMessage;
}

/** @internal */
export interface LpcConfigOnlyOption extends CommandLineOptionBase {
    type: "object";
    elementOptions?: Map<string, CommandLineOption>;
    extraKeyDiagnostics?: DidYouMeanOptionsDiagnostics;
}


/** @internal */
export interface CommandLineOptionOfStringType extends CommandLineOptionBase {
    type: "string";
    defaultValueDescription?: string | undefined | DiagnosticMessage;
}

/** @internal */
export interface CommandLineOptionOfNumberType extends CommandLineOptionBase {
    type: "number";
    defaultValueDescription: number | undefined | DiagnosticMessage;
}

/** @internal */
export interface CommandLineOptionOfBooleanType extends CommandLineOptionBase {
    type: "boolean";
    defaultValueDescription: boolean | undefined | DiagnosticMessage;
}

/** @internal */
export interface CommandLineOptionOfCustomType extends CommandLineOptionBase {
    type: Map<string, number | string>; // an object literal mapping named values to actual values
    defaultValueDescription: number | string | undefined | DiagnosticMessage;
    deprecatedKeys?: Set<string>;
}

/** @internal */
export interface CommandLineOptionOfListType extends CommandLineOptionBase {
    type: "list" | "listOrElement";
    element: CommandLineOptionOfCustomType | CommandLineOptionOfStringType | CommandLineOptionOfNumberType | CommandLineOptionOfBooleanType | LpcConfigOnlyOption;
    listPreserveFalsyValues?: boolean;
}


/** @internal */
export type CommandLineOption = CommandLineOptionOfCustomType | CommandLineOptionOfStringType | CommandLineOptionOfNumberType | CommandLineOptionOfBooleanType | LpcConfigOnlyOption | CommandLineOptionOfListType;

/** Either a parsed command line or a parsed tsconfig.json */
export interface ParsedCommandLine {
    options: CompilerOptions;
    typeAcquisition?: TypeAcquisition;
    fileNames: string[];
    projectReferences?: readonly ProjectReference[];
    watchOptions?: WatchOptions;
    raw?: any;
    errors: Diagnostic[];
    wildcardDirectories?: MapLike<WatchDirectoryFlags>;
    compileOnSave?: boolean;
}

/** @internal */
export type RedirectTargetsMap = ReadonlyMap<Path, readonly string[]>;

export interface ResolvedProjectReference {
    commandLine: ParsedCommandLine;
    sourceFile: SourceFile;
    references?: readonly (ResolvedProjectReference | undefined)[];
}

/** @internal */
export enum FileIncludeKind {
    RootFile,
    MasterFile,
    SourceFromProjectReference,
    OutputFromProjectReference,
    Import,
    ReferenceFile,
    TypeReferenceDirective,
    LibFile,
    LibReferenceDirective,
    AutomaticTypeDirectiveFile,
}

/** @internal */
export interface RootFile {
    kind: FileIncludeKind.RootFile;
    index: number;
}

/** @internal */
export interface MasterFile {
    kind: FileIncludeKind.MasterFile;
    index: number;    
}

/** @internal */
export interface LibFile {
    kind: FileIncludeKind.LibFile;
    index?: number;
}

/** @internal */
export type ProjectReferenceFileKind =
    | FileIncludeKind.SourceFromProjectReference
    | FileIncludeKind.OutputFromProjectReference;

/** @internal */
export interface ProjectReferenceFile {
    kind: ProjectReferenceFileKind;
    index: number;
}

/** @internal */
export type ReferencedFileKind =
    | FileIncludeKind.Import
    | FileIncludeKind.ReferenceFile
    | FileIncludeKind.TypeReferenceDirective
    | FileIncludeKind.LibReferenceDirective;

/** @internal */
export interface ReferencedFile {
    kind: ReferencedFileKind;
    file: Path;
    index: number;
}

/** @internal */
export interface AutomaticTypeDirectiveFile {
    kind: FileIncludeKind.AutomaticTypeDirectiveFile;
    typeReference: string;
    packageId: string | undefined;
}

/** @internal */
export type FileIncludeReason =
    | RootFile
    | MasterFile
    | LibFile
    | ProjectReferenceFile
    | ReferencedFile
    | AutomaticTypeDirectiveFile;

/** @internal */
export interface ResolvedModuleSpecifierInfo {
    kind: "node_modules" | "paths" | "redirect" | "relative" | "ambient" | undefined;
    modulePaths: readonly ModulePath[] | undefined;
    moduleSpecifiers: readonly string[] | undefined;
    isBlockedByPackageJsonDependencies: boolean | undefined;
}

type ModuleSpecifierOptions = any;

    /** @internal */
export interface ModuleSpecifierCache {
    get(fromFileName: Path, toFileName: Path, preferences: UserPreferences, options: ModuleSpecifierOptions): Readonly<ResolvedModuleSpecifierInfo> | undefined;
    set(fromFileName: Path, toFileName: Path, preferences: UserPreferences, options: ModuleSpecifierOptions, kind: ResolvedModuleSpecifierInfo["kind"], modulePaths: readonly ModulePath[], moduleSpecifiers: readonly string[]): void;
    setBlockedByPackageJsonDependencies(fromFileName: Path, toFileName: Path, preferences: UserPreferences, options: ModuleSpecifierOptions, isBlockedByPackageJsonDependencies: boolean): void;
    setModulePaths(fromFileName: Path, toFileName: Path, preferences: UserPreferences, options: ModuleSpecifierOptions, modulePaths: readonly ModulePath[]): void;
    clear(): void;
    count(): number;
}

/** @internal */
export interface ModuleSpecifierResolutionHost {
    useCaseSensitiveFileNames?(): boolean;
    fileExists(path: string): boolean;
    getCurrentDirectory(): string;
    directoryExists?(path: string): boolean;
    readFile?(path: string): string | undefined;
    realpath?(path: string): string;
    //getSymlinkCache?(): SymlinkCache;
    // getModuleSpecifierCache?(): ModuleSpecifierCache;    
    // getGlobalTypingsCacheLocation?(): string | undefined;
    // getNearestAncestorDirectoryWithPackageJson?(fileName: string, rootDir?: string): string | undefined;

    // readonly redirectTargetsMap: RedirectTargetsMap;
    // getProjectReferenceRedirect(fileName: string): string | undefined;
    // isSourceOfProjectReferenceRedirect(fileName: string): boolean;
    getFileIncludeReasons(): MultiMap<Path, FileIncludeReason>;
    getCommonSourceDirectory(): string;

    getModuleResolutionCache?(): any;//TODO ModuleResolutionCache | undefined;
    trace?(s: string): void;
}

/** @internal */
export interface ModulePath {
    path: string;
    isInNodeModules: boolean;
    isRedirect: boolean;
}

/**
 * Represents the result of module resolution.
 * Module resolution will pick up tsx/jsx/js files even if '--jsx' and '--allowJs' are turned off.
 * The Program will then filter results based on these flags.
 *
 * Prefer to return a `ResolvedModuleFull` so that the file type does not have to be inferred.
 */
export interface ResolvedModule {
    /** Path of the file the module was resolved to. */
    resolvedFileName: string;
    /** True if `resolvedFileName` comes from `node_modules`. */
    isExternalLibraryImport?: boolean;
    /**
     * True if the original module reference used a .ts extension to refer directly to a .ts file,
     * which should produce an error during checking if emit is enabled.
     */
    resolvedUsingTsExtension?: boolean;
}

/**
 * ResolvedModule with an explicitly provided `extension` property.
 * Prefer this over `ResolvedModule`.
 * If changing this, remember to change `moduleResolutionIsEqualTo`.
 */
export interface ResolvedModuleFull extends ResolvedModule {
    /**
     * @internal
     * This is a file name with preserved original casing, not a normalized `Path`.
     */
    readonly originalPath?: string;
    /**
     * Extension of resolvedFileName. This must match what's at the end of resolvedFileName.
     * This is optional for backwards-compatibility, but will be added if not provided.
     */
    extension: string;
    packageId?: PackageId;
}

export interface ResolvedTypeReferenceDirective {
    // True if the type declaration file was found in a primary lookup location
    primary: boolean;
    // The location of the .d.ts file we located, or undefined if resolution failed
    resolvedFileName: string | undefined;
    /**
     * @internal
     * The location of the symlink to the .d.ts file we found, if `resolvedFileName` was the realpath.
     * This is a file name with preserved original casing, not a normalized `Path`.
     */
    originalPath?: string;
    packageId?: PackageId;
    /** True if `resolvedFileName` comes from `node_modules`. */
    isExternalLibraryImport?: boolean;
}

export interface ResolvedTypeReferenceDirectiveWithFailedLookupLocations {
    readonly resolvedTypeReferenceDirective: ResolvedTypeReferenceDirective | undefined;
    /** @internal */ failedLookupLocations?: string[];
    /** @internal */ affectingLocations?: string[];
    /** @internal */ resolutionDiagnostics?: Diagnostic[];
}

export interface ResolvedModuleWithFailedLookupLocations {
    readonly resolvedModule: ResolvedModuleFull | undefined;
    /** @internal */
    failedLookupLocations?: string[];
    /** @internal */
    affectingLocations?: string[];
    /** @internal */
    resolutionDiagnostics?: Diagnostic[];
    /**
     * @internal
     * Used to issue a better diagnostic when an unresolvable module may
     * have been resolvable under different module resolution settings.
     */
    alternateResult?: string;
}

/** @internal */
export interface    TypeCheckerHost extends ModuleSpecifierResolutionHost {
    getCompilerOptions(): CompilerOptions;
    getDriverType(): LanguageVariant;
    getSourceFiles(): readonly SourceFile[];
    getSourceFile(fileName: string): SourceFile | undefined;
    // getProjectReferenceRedirect(fileName: string): string | undefined;
    isSourceOfProjectReferenceRedirect(fileName: string): boolean;
    // getRedirectReferenceForResolutionFromSourceOfProject(filePath: Path): ResolvedProjectReference | undefined;    

    getResolvedModule(f: SourceFile, moduleName: string, mode: ResolutionMode): ResolvedModuleWithFailedLookupLocations | undefined;

    // readonly redirectTargetsMap: RedirectTargetsMap;

    // typesPackageExists(packageName: string): boolean;
    // packageBundlesTypes(packageName: string): boolean;
}


export const enum SignatureKind {
    Call,
    Construct,
}

export type DestructuringPattern = BindingPattern | ObjectLiteralExpression | ArrayLiteralExpression;

// Properties common to all types
export interface Type {
    flags: TypeFlags; // Flags
    /** @internal */ id: TypeId; // Unique ID
    /** @internal */ checker: any; // TypeChecker
    symbol: Symbol; // Symbol associated with type (if any)    
    pattern?: DestructuringPattern;  // Destructuring pattern represented by type (if any)
    aliasSymbol?: Symbol; // Alias associated with type
    aliasTypeArguments?: readonly Type[]; // Alias type arguments (if any)
    /** @internal */
    permissiveInstantiation?: Type; // Instantiation with type parameters mapped to wildcard type
    /** @internal */
    restrictiveInstantiation?: Type; // Instantiation with type parameters mapped to unconstrained form
    /** @internal */
    immediateBaseConstraint?: Type; // Immediate base constraint cache
    /** @internal */
    widened?: Type; // Cached widened form of the type
}

/** @internal */
export type TypeId = number;

export const enum SyntaxKind {
    Unknown, // fIrst token
    EndOfFileToken,
    SingleLineCommentTrivia,
    MultiLineCommentTrivia,
    NewLineTrivia,
    WhitespaceTrivia,
    ConflictMarkerTrivia,
    MacroIdentifierTrivia,
    // We detect and preserve #! on the first line
    ShebangTrivia,
    NonTextFileMarkerTrivia,

    // Literals
    NumericLiteral,
    IntLiteral,
    CharLiteral,
    FloatLiteral,
    BytesLiteral,
    StringArrayLiteral,
    StringLiteral,                

    // Punctuation
    OpenBraceToken, 
    BacktickToken,
    CloseBraceToken,
    OpenParenToken,
    CloseParenToken,
    OpenBracketToken,
    CloseBracketToken,
    DotToken,
    DotDotDotToken,
    SemicolonToken,
    CommaToken,
    QuestionDotToken,
    LessThanToken,
    LessThanSlashToken,
    LessThanDotDotToken,
    GreaterThanToken,
    LessThanEqualsToken,
    GreaterThanEqualsToken,
    EqualsEqualsToken,
    ExclamationEqualsToken,
    EqualsEqualsEqualsToken,
    ExclamationEqualsEqualsToken,
    EqualsGreaterThanToken,
    MinusGreaterThanToken,
    PlusToken,
    MinusToken,
    AsteriskToken,
    AsteriskAsteriskToken,
    SlashToken,
    PercentToken,
    PlusPlusToken,
    MinusMinusToken,
    LessThanLessThanToken,
    GreaterThanGreaterThanToken,
    GreaterThanGreaterThanGreaterThanToken,
    AmpersandToken,
    BarToken,
    CaretToken,
    ExclamationToken,
    DoubleExclamationToken,
    TildeToken,
    AmpersandAmpersandToken,
    BarBarToken,
    QuestionToken,
    ColonToken,
    AtToken,
    AtAtToken,
    QuestionQuestionToken,
    HashToken,
    OpenParenColonToken,    // for inline closures
    ColonCloseParenToken,
    OpenParenBracketToken,  // for mapping literal
    OpenParenBraceToken,    // for array literal
    OpenParenAsteriskToken, // (*fn) shortcut for evaluate()
    ColonColonToken,
    LambdaToken,    
    DotDotToken,

    // Assignments
    EqualsToken, // first assignment
    PlusEqualsToken,
    MinusEqualsToken,
    AsteriskEqualsToken,
    AsteriskAsteriskEqualsToken,
    SlashEqualsToken,
    PercentEqualsToken,
    LessThanLessThanEqualsToken,
    GreaterThanGreaterThanEqualsToken,
    GreaterThanGreaterThanGreaterThanEqualsToken,
    AmpersandEqualsToken,
    BarEqualsToken,
    BarBarEqualsToken,    
    QuestionQuestionEqualsToken,
    CaretEqualsToken, // last assignment


    // Identifiers
    Identifier,    
    StringizedIdentifier, // used in macros

    /**
     * Only the special JSDoc comment text scanner produces JSDocCommentTextTokes. One of these tokens spans all text after a tag comment's start and before the next @
     * @internal
     */
    JSDocCommentTextToken,
    
    // Keywords
    IntKeyword, // FIrst Keyword, FirstReserved Word
    FloatKeyword,    
    StringKeyword,
    LwObjectKeyword,        
    UndefinedKeyword,
    AnyKeyword,    
    ClosureKeyword,
    StructKeyword,
    CatchKeyword,    
    MixedKeyword,
    UnknownKeyword,        
    MappingKeyword,
    VoidKeyword,
    BreakKeyword,
    BytesKeyword,    
    DoKeyword,
    ElseKeyword,
    ForKeyword,
    ForEachKeyword,    
    CaseKeyword,
    DefaultKeyword,
    IfKeyword,
    
    ReturnKeyword,    
    SwitchKeyword,
    WhileKeyword,
    AsyncKeyword,
    InheritKeyword,
    ContinueKeyword,

    // Modifier Keywords
    PrivateKeyword,
    ProtectedKeyword,    
    PublicKeyword,
    StaticKeyword,
    VisibleKeyword,
    NoSaveKeyword,
    NoShadowKeyword,
    IntrinsicKeyword,
    NoMaskKeyword,
    VarArgsKeyword,
    DeprecatedKeyword,  // LastReservedWord

    // non-reserved keywords go below this line
    ClassKeyword,
    StatusKeyword,
    FalseKeyword,       // JSON-only
    TrueKeyword,        // JSON-only
    NullKeyword,        // JSON-only    
    NeverKeyword,       // typenode only
    FunctionKeyword,    // can be used as a param name
    SymbolKeyword,      // not reserved in fluffos
    ObjectKeyword,      // can occur in a super expr i.e.  object::fn()
    RefKeyword,         // fluff only
    BufferKeyword,      // fluff only
    IsKeyword,          // use for type predicates only
    FunctionsKeyword,   // inherit modifier
    VirtualKeyword,     // inherit modifier
    InKeyword,          // not a reserved word in LD (maybe fluff?)
    NewKeyword,         // LastKeyword and LastToken - everything after this will be processed by the binder

    // Parse Tree Nodes

    // Names
    QualifiedName, // First Node
    ComputedPropertyName, 
    
    // Signature Elements
    TypeParameter,   
    Parameter,
    IndexSignature,
    CallSignature,

    // TypeMember
    PropertyDeclaration,
    PropertySignature,
    MethodDeclaration,
    InterfaceDeclaration,
    MethodSignature,


    // Types
    UnionType, // First Type Node
    FunctionType,
    IntersectionType,
    RestType,
    ArrayType,
    TupleType,
    TypeLiteral,
    TypeQuery,
    ParenthesizedType,
    TypeReference,
    TypePredicate,
    NamedObjectType,
    ConditionalType,  // Last TYpe Node
    
    // Elements
    FunctionDeclaration,
    ClassDeclaration,
    ExportSpecifier,
    ExportDeclaration,
    MissingDeclaration,
    
    // Property Assignments
    PropertyAssignment,
    ShorthandPropertyAssignment,

    // Top Level
    SourceFile,
    Bundle,
    
    // Directives
    IncludeDirective,
    DefineDirective,
    UndefDirective,
    IfDirective,
    IfDefDirective,    
    IfNDefDirective,
    ElseDirective,
    ElseIfDirective,
    EndIfDirective,
    PragmaDirective,    

    // JSDoc nodes
    JSDocTypeExpression, // First JSDoc Node
    JSDocNameReference,
    JSDocMemberName, // C#p
    JSDocAllType, // The * type
    JSDocUnknownType, // The ? type
    JSDocNullableType,
    JSDocNonNullableType,
    JSDocOptionalType,
    JSDocFunctionType,
    JSDocVariadicType,    
    JSDocNamepathType, // https://jsdoc.app/about-namepaths.html
    JSDoc,
    /** @deprecated Use SyntaxKind.JSDoc */
    JSDocComment = JSDoc,
    JSDocText,
    JSDocTypeLiteral,
    JSDocSignature,
    JSDocLink,
    JSDocLinkCode,
    JSDocLinkPlain,
    JSDocTag,
    JSDocAugmentsTag,
    JSDocImplementsTag,
    JSDocAuthorTag,
    JSDocDeprecatedTag,
    JSDocClassTag,
    JSDocPublicTag,
    JSDocPrivateTag,
    JSDocProtectedTag,
    JSDocReadonlyTag,
    JSDocOverrideTag,
    JSDocCallbackTag,
    JSDocOverloadTag,
    JSDocEnumTag,
    JSDocParameterTag,
    JSDocReturnTag,
    JSDocThisTag,
    JSDocTypeTag,
    JSDocTemplateTag,
    JSDocTypedefTag,
    JSDocSeeTag,
    JSDocPropertyTag,
    JSDocVariableTag,
    JSDocThrowsTag,
    JSDocSatisfiesTag,
    JSDocImportTag, // Last JSDoc Node

    // Synthesized List
    SyntaxList,

    // Transformation Nodes
    NotEmittedStatement,
    PartiallyEmittedExpression,
    CommaListExpression,

    // Declarations
    Block,
    VariableDeclaration,
    VariableDeclarationList,
    TypeAliasDeclaration,
    CaseBlock,
    StructDeclaration,// WAS: ClassDeclaration,

    // Statements
    VariableStatement, // FirstStatement
    ForStatement,
    ForEachStatement,
    DoWhileStatement,
    WhileStatement,
    //ForInStatement,
    ExpressionStatement,
    ReturnStatement,
    LabeledStatement,
    BreakStatement,
    ContinueStatement,
    InheritDeclaration,
    IfStatement,
    EmptyStatement,
    CatchStatement,
    
    SwitchStatement, // LastStatement

    LiteralType,
    StructType,
    InferType,
    ThisType,
    IndexedAccessType,
    NamedTupleMember,
    TypeOperator,
    MappedType,

    // Binding Pattern
    ArrayBindingPattern,
    BindingElement,

    // Expressions
    ConditionalExpression,
    CatchExpression,
    BinaryExpression,
    FunctionExpression,
    ArrowFunction,
    CallExpression,
    CloneObjectExpression,
    ClassExpression,    
    SyntheticExpression,
    NewExpression,
    NewStructExpression,
    EvaluateExpression,
    TypeAssertionExpression,
    ExpressionWithTypeArguments,
    ElementAccessExpression,
    RangeExpression,
    InlineClosureExpression,
    LambdaIdentifierExpression,
    LambdaOperatorExpression,
    PropertyAccessExpression,
    SuperAccessExpression,
    PostfixUnaryExpression,
    ParenthesizedExpression,
    ArrayLiteralExpression,
    MappingLiteralExpression,
    MappingEntryExpression,
    ObjectLiteralExpression,
    SpreadElement,
    ByRefElement,
    CastExpression,
    OmittedExpression,
    PrefixUnaryExpression,
    
    // Clauses    
    CaseClause,
    HeritageClause,
    DefaultClause,    

    // Enum value count
    Count,
    
    // Markers
    FirstReservedWord = IntKeyword,
    LastReservedWord = DeprecatedKeyword,
    FirstKeyword = IntKeyword,
    LastKeyword = NewKeyword,
    FirstToken = Unknown,
    LastToken = LastKeyword,
    FirstStatement = VariableStatement,
    LastStatement = SwitchStatement ,
    FirstAssignment = EqualsToken,
    LastAssignment = CaretEqualsToken,
    SuperKeyword = ColonColonToken,
    FirstTypeNode = UnionType,
    LastTypeNode = ConditionalType,
    FirstNode = QualifiedName,
    FirstFutureReservedWord = IntKeyword,
    LastFutureReservedWord = LastKeyword,
    FirstJSDocNode = JSDocTypeExpression,
    LastJSDocNode = JSDocImportTag,
    FirstLiteralToken = IntLiteral,
    LastLiteralToken = StringLiteral,
    FirstJSDocTagNode = JSDocTypeExpression,
    LastJSDocTagNode = JSDocImportTag,
    FirstTriviaToken = SingleLineCommentTrivia,
    LastTriviaToken = ShebangTrivia,
    FirstBinaryOperator = LessThanToken,
    LastBinaryOperator = CaretEqualsToken,
    FirstPunctuation = OpenBraceToken,
    LastPunctuation = DotDotToken,
    /** @internal */ FirstContextualKeyword = IntKeyword,
    /** @internal */ LastContextualKeyword = ContinueKeyword,
}

// dprint-ignore
export const enum TypeFlags {
    Any             = 1 << 0,
    Unknown         = 1 << 1,
    String          = 1 << 2,
    Number          = 1 << 3,
    Boolean         = 1 << 4,
    Enum            = 1 << 5,   // Numeric computed enum member value
    Float           = 1 << 6,
    StringLiteral   = 1 << 7,
    IntLiteral      = 1 << 8,
    BooleanLiteral  = 1 << 9,
    EnumLiteral     = 1 << 10,  // Always combined with StringLiteral, NumberLiteral, or Union
    FloatLiteral    = 1 << 11,
    Bytes           = 1 << 12,  
    BytesLiteral    = 1 << 13,  // unique symbol
    Void            = 1 << 14,
    Undefined       = 1 << 15,
    Null            = 1 << 16,
    Never           = 1 << 17,  // Never type
    TypeParameter   = 1 << 18,  // Type parameter
    Object          = 1 << 19,  // Object type
    Union           = 1 << 20,  // Union (T | U)
    Intersection    = 1 << 21,  // Intersection (T & U)
    Index           = 1 << 22,  // keyof T
    IndexedAccess   = 1 << 23,  // T[K]
    Conditional     = 1 << 24,  // T extends U ? X : Y
    Substitution    = 1 << 25,  // Type parameter substitution
    NonPrimitive    = 1 << 26,  // intrinsic object type
    TemplateLiteral = 1 << 27,  // Template literal type
    StringMapping   = 1 << 28,  // Uppercase/Lowercase type
    /** @internal */
    Reserved1       = 1 << 29,  // Used by union/intersection type construction
    /** @internal */
    Reserved2       = 1 << 30,  // Used by union/intersection type construction
    LpcDocVariable  = 1 << 31,  // Used by types assigned from jsdoc @var tags

    /** @internal */
    AnyOrUnknown = Any | Unknown,
    /** @internal */
    Nullable = Undefined | Null,
    Literal = StringLiteral | IntLiteral | FloatLiteral | BooleanLiteral,
    Unit = Enum | Literal | Nullable,
    Freshable = Enum | Literal,
    StringOrNumberLiteral = StringLiteral | IntLiteral,
    /** @internal */
    StringOrNumberLiteralOrUnique = StringLiteral | IntLiteral,
    /** @internal */
    DefinitelyFalsy = StringLiteral | IntLiteral | FloatLiteral | BooleanLiteral | Void | Undefined | Null,
    PossiblyFalsy = DefinitelyFalsy | String | Number | Float | Bytes | Boolean,
    /** @internal */
    Intrinsic = Any | Unknown | String | Number | Float | Boolean | Bytes | BooleanLiteral | Void | Undefined | Null | Never | NonPrimitive,
    StringLike = String | StringLiteral | TemplateLiteral | StringMapping,
    NumberLike = Number | IntLiteral | FloatLiteral | Enum,
    BooleanLike = Boolean | BooleanLiteral,
    EnumLike = Enum | EnumLiteral,
    VoidLike = Void | Undefined,
    BytesLike = Bytes | BytesLiteral,
    /** @internal */
    Primitive = StringLike | NumberLike |  BooleanLike | EnumLike | VoidLike | BytesLike | Null,
    /** @internal */
    DefinitelyNonNullable = StringLike | NumberLike | BytesLike | BooleanLike | EnumLike | Object | NonPrimitive,
    /** @internal */
    DisjointDomains = NonPrimitive | StringLike | NumberLike | BytesLike | BooleanLike | VoidLike | Null,
    UnionOrIntersection = Union | Intersection,
    StructuredType = Object | Union | Intersection,
    TypeVariable = TypeParameter | IndexedAccess,
    InstantiableNonPrimitive = TypeVariable | Conditional | Substitution,
    InstantiablePrimitive = Index | TemplateLiteral | StringMapping,
    Instantiable = InstantiableNonPrimitive | InstantiablePrimitive,
    StructuredOrInstantiable = StructuredType | Instantiable,
    /** @internal */
    ObjectFlagsType = Any | Nullable | Never | Object | Union | Intersection,
    /** @internal */
    Simplifiable = IndexedAccess | Conditional,
    /** @internal */
    Singleton = Any | Unknown | String | Number | Boolean | Float | Bytes | Void | Undefined | Null | Never | NonPrimitive,
    // 'Narrowable' types are types where narrowing actually narrows.
    // This *should* be every type other than null, undefined, void, and never
    Narrowable = Any | Unknown | StructuredOrInstantiable | StringLike | NumberLike | BooleanLike | BytesLike | NonPrimitive,
    // The following flags are aggregated during union and intersection type construction
    /** @internal */
    IncludesMask = Any | Unknown | Primitive | Never | Object | Union | Intersection | NonPrimitive | TemplateLiteral | StringMapping,
    // The following flags are used for different purposes during union and intersection type construction
    /** @internal */
    IncludesMissingType = TypeParameter,
    /** @internal */
    IncludesNonWideningType = Index,
    /** @internal */
    IncludesWildcard = IndexedAccess,
    /** @internal */
    IncludesEmptyObject = Conditional,
    /** @internal */
    IncludesInstantiable = Substitution,
    /** @internal */
    IncludesConstrainedTypeVariable = Reserved1,
    /** @internal */
    IncludesError = Reserved2,
    /** @internal */
    NotPrimitiveUnion = Any | Unknown | Void | Never | Object | Intersection | IncludesInstantiable,
}

// Ensure the shared flags between this and `NodeBuilderFlags` stay in alignment
// dprint-ignore
export const enum TypeFormatFlags {
    None                                    = 0,
    NoTruncation                            = 1 << 0,  // Don't truncate typeToString result
    WriteArrayAsGenericType                 = 1 << 1,  // Write Array<T> instead T[]
    GenerateNamesForShadowedTypeParams      = 1 << 2,   // When a type parameter T is shadowing another T, generate a name for it so it can still be referenced
    UseStructuralFallback                   = 1 << 3,   // When an alias cannot be named by its symbol, rather than report an error, fallback to a structural printout if possible
    // hole because there's a hole in node builder flags
    WriteTypeArgumentsOfSignature           = 1 << 5,  // Write the type arguments instead of type parameters of the signature
    UseFullyQualifiedType                   = 1 << 6,  // Write out the fully qualified type name (eg. Module.Type, instead of Type)
    // hole because `UseOnlyExternalAliasing` is here in node builder flags, but functions which take old flags use `SymbolFormatFlags` instead
    SuppressAnyReturnType                   = 1 << 8,  // If the return type is any-like, don't offer a return type.
    // hole because `WriteTypeParametersInQualifiedName` is here in node builder flags, but functions which take old flags use `SymbolFormatFlags` for this instead
    MultilineObjectLiterals                 = 1 << 10, // Always print object literals across multiple lines (only used to map into node builder flags)
    WriteClassExpressionAsTypeLiteral       = 1 << 11, // Write a type literal instead of (Anonymous class)
    UseTypeOfFunction                       = 1 << 12, // Write typeof instead of function type literal
    OmitParameterModifiers                  = 1 << 13, // Omit modifiers on parameters

    UseAliasDefinedOutsideCurrentScope      = 1 << 14, // For a `type T = ... ` defined in a different file, write `T` instead of its value, even though `T` can't be accessed in the current scope.
    UseSingleQuotesForStringLiteralType     = 1 << 28, // Use single quotes for string literal type
    NoTypeReduction                         = 1 << 29, // Don't call getReducedType
    OmitThisParameter                       = 1 << 25,

    // Error Handling
    AllowUniqueESSymbolType                 = 1 << 20, // This is bit 20 to align with the same bit in `NodeBuilderFlags`

    // TypeFormatFlags exclusive
    AddUndefined                            = 1 << 17, // Add undefined to types of initialized, non-optional parameters
    WriteArrowStyleSignature                = 1 << 18, // Write arrow style signature

    // State
    InArrayType                             = 1 << 19, // Writing an array element type
    InElementType                           = 1 << 21, // Writing an array or union element type
    InFirstTypeArgument                     = 1 << 22, // Writing first type argument of the instantiated type
    InTypeAlias                             = 1 << 23, // Writing type in type alias declaration

    NodeBuilderFlagsMask = NoTruncation | WriteArrayAsGenericType | GenerateNamesForShadowedTypeParams | UseStructuralFallback | WriteTypeArgumentsOfSignature |
        UseFullyQualifiedType | SuppressAnyReturnType | MultilineObjectLiterals | WriteClassExpressionAsTypeLiteral |
        UseTypeOfFunction | OmitParameterModifiers | UseAliasDefinedOutsideCurrentScope | AllowUniqueESSymbolType | InTypeAlias |
        UseSingleQuotesForStringLiteralType | NoTypeReduction | OmitThisParameter,
}

export const enum NodeFlags {
    None               = 0,
    Variable           = 1 << 0,  // Variable declaration       
    ExternalFile       = 1 << 2,  // Included from an external file     
    Synthesized        = 1 << 4,  // Node was synthesized during transformation        
    IncludeContext     = 1 << 5,  // Node was parsed from an include file
    MacroContext       = 1 << 6,  // Node was parsed as a result of a macro expansion
    ExportContext      = 1 << 7,  // Export context (initialized by binding)
    HasImplicitReturn  = 1 << 9,  // If function implicitly returns on one of codepaths (initialized by binding)
    HasExplicitReturn  = 1 << 10,  // If function has explicit reachable return on one of codepaths (initialized by binding)
    HasAsyncFunctions  = 1 << 12, // If the file has async (i.e. LD coroutine) functions (initialized by binding)    
    DisallowInContext  = 1 << 13, // If node was parsed in a context where 'in-expressions' are not allowed
    YieldContext       = 1 << 14, // If node was parsed in the 'yield' context created when parsing a generator
    DisallowTypes      = 1 << 15, // If node was parsed in a context where types are not allowed
    AwaitContext       = 1 << 16, // If node was parsed in the 'await' context created when parsing an async function
    DisallowCommaContext = 1 << 17, // If node was parsed in a context where comma expr are not allow
    ThisNodeHasError   = 1 << 18, // If the parser encountered an error when parsing the code that created this node
    DisallowConditionalTypesContext     = 1 << 19, 
    ThisNodeOrAnySubNodesHasError = 1 << 20, // If this node or any of its children had an error
    HasAggregatedChildData = 1 << 21, // If we've computed data from children and cached it in this node
    OptionalChain       = 1 << 22, // not used
    
    JSDoc                                          = 1 << 24, // If node was parsed inside jsdoc
    /** @internal */ Ambient                       = 1 << 25, // If node was inside an ambient context -- a declaration file, or inside something with the `declare` modifier.
    /** @internal */ TypeCached                    = 1 << 28, // If a type was cached for node at any point
    /** @internal */ Deprecated                    = 1 << 29, // If has '@deprecated' JSDoc tag

    ReachabilityCheckFlags = HasImplicitReturn | HasExplicitReturn,
    ReachabilityAndEmitFlags = ReachabilityCheckFlags,

    // Parsing context flags
    ContextFlags = DisallowInContext | DisallowCommaContext | YieldContext | DisallowTypes | AwaitContext | DisallowConditionalTypesContext | MacroContext | IncludeContext | Ambient,

    // parse set flags
    BlockScoped = Variable,

    // The following flags repurpose other NodeFlags as different meanings for Identifier nodes
    /** @internal */ IdentifierHasExtendedUnicodeEscape = 1 << 8, // Indicates whether the identifier contains an extended unicode escape sequence
    /** @internal */ IdentifierIsInJSDocNamespace = HasAsyncFunctions, // Indicates whether the identifier is part of a JSDoc namespace

    IncludeOrMacro = IncludeContext | MacroContext // Indicates the node is in an include or macro context
}

export const enum EmitFlags {
    None = 0,
    SingleLine = 1 << 0,                    // The contents of this node should be emitted on a single line.
    MultiLine = 1 << 1,
    AdviseOnEmitNode = 1 << 2,              // The printer should invoke the onEmitNode callback when printing this node.
    NoSubstitution = 1 << 3,                // Disables further substitution of an expression.
    CapturesThis = 1 << 4,                  // The function captures a lexical `this`
    NoLeadingSourceMap = 1 << 5,            // Do not emit a leading source map location for this node.
    NoTrailingSourceMap = 1 << 6,           // Do not emit a trailing source map location for this node.
    NoSourceMap = NoLeadingSourceMap | NoTrailingSourceMap, // Do not emit a source map location for this node.
    NoNestedSourceMaps = 1 << 7,            // Do not emit source map locations for children of this node.
    NoTokenLeadingSourceMaps = 1 << 8,      // Do not emit leading source map location for token nodes.
    NoTokenTrailingSourceMaps = 1 << 9,     // Do not emit trailing source map location for token nodes.
    NoTokenSourceMaps = NoTokenLeadingSourceMaps | NoTokenTrailingSourceMaps, // Do not emit source map locations for tokens of this node.
    NoLeadingComments = 1 << 10,            // Do not emit leading comments for this node.
    NoTrailingComments = 1 << 11,           // Do not emit trailing comments for this node.
    NoComments = NoLeadingComments | NoTrailingComments, // Do not emit comments for this node.
    NoNestedComments = 1 << 12,
    HelperName = 1 << 13,                   // The Identifier refers to an *unscoped* emit helper (one that is emitted at the top of the file)
    ExportName = 1 << 14,                   // Ensure an export prefix is added for an identifier that points to an exported declaration with a local name (see SymbolFlags.ExportHasLocal).
    LocalName = 1 << 15,                    // Ensure an export prefix is not added for an identifier that points to an exported declaration.
    InternalName = 1 << 16,                 // The name is internal to an ES5 class body function.
    Indented = 1 << 17,                     // Adds an explicit extra indentation level for class and function bodies when printing (used to match old emitter).
    NoIndentation = 1 << 18,                // Do not indent the node.
    AsyncFunctionBody = 1 << 19,
    ReuseTempVariableScope = 1 << 20,       // Reuse the existing temp variable scope during emit.
    CustomPrologue = 1 << 21,               // Treat the statement as if it were a prologue directive (NOTE: Prologue directives are *not* transformed).
    NoHoisting = 1 << 22,                   // Do not hoist this declaration in --module system
    Iterator = 1 << 23,                     // The expression to a `yield*` should be treated as an Iterator when down-leveling, not an Iterable.
    NoAsciiEscaping = 1 << 24,              // When synthesizing nodes that lack an original node or textSourceNode, we want to write the text on the node with ASCII escaping substitutions.
}

export const enum ModifierFlags {
    None =               0,

    // Syntactic/JSDoc modifiers
    Public =             1 << 0,  // Property/Method
    Private =            1 << 1,  // Property/Method
    Protected =          1 << 2,  // Property/Method    

    // Syntactic-only modifiers
    NoMask =             1 << 5,  // 
    NoShadow =           1 << 6,  // 
    NoSave =             1 << 7,  // 
    Static =             1 << 8,  // Property/Method
    VarArgs =            1 << 9,
    Visible =            1 << 10,
    Export =             1 << 11, // Declarations    
    
    Ambient =            1 << 12,
    Readonly =           1 << 13,
    In =                 1 << 14, // Contravariance modifier
    Out =                1 << 15, // Covariance modifier

    Deprecated =         1 << 16, // Deprecated tag.

    // Cache-only JSDoc-modifiers. Should match order of Syntactic/JSDoc modifiers, above.
    /** @internal */ JSDocPublic = 1 << 23, // if this value changes, `selectEffectiveModifierFlags` must change accordingly
    /** @internal */ JSDocPrivate = 1 << 24,
    /** @internal */ JSDocProtected = 1 << 25,
    /** @internal */ JSDocReadonly = 1 << 26,
    /** @internal */ JSDocOverride = 1 << 27,

    /** @internal */ SyntacticOrJSDocModifiers = Public | Private | Protected,
    /** @internal */ SyntacticOnlyModifiers = Static | NoMask | NoSave | NoShadow | VarArgs | Visible,
    /** @internal */ SyntacticModifiers = SyntacticOrJSDocModifiers | SyntacticOnlyModifiers,
    /** @internal */ JSDocCacheOnlyModifiers = JSDocPublic | JSDocPrivate | JSDocProtected | JSDocReadonly | JSDocOverride,
    /** @internal */ JSDocOnlyModifiers = Deprecated,
    /** @internal */ NonCacheOnlyModifiers = SyntacticOrJSDocModifiers | SyntacticOnlyModifiers | JSDocOnlyModifiers,

    HasComputedJSDocModifiers = 1 << 28, // Indicates the computed modifier flags include modifiers from JSDoc.
    HasComputedFlags =   1 << 29, // Modifier flags have been computed

    AccessibilityModifier = Public | Private | Protected,
    // Accessibility modifiers and 'readonly' can be attached to a parameter in a constructor to make it a property.
    ParameterPropertyModifier = AccessibilityModifier | NoMask | NoSave,
    NonPublicAccessibilityModifier = Private | Protected,

    All = Public | Private | Protected | NoMask | NoShadow | NoSave | Static | VarArgs | Visible | Deprecated,    
    Modifier = All// & ~Decorator,
}

// dprint-ignore
export const enum ElementFlags {
    Required    = 1 << 0,  // T
    Optional    = 1 << 1,  // T?
    Rest        = 1 << 2,  // ...T[]
    Variadic    = 1 << 3,  // ...T
    Fixed       = Required | Optional,
    Variable    = Rest | Variadic,
    NonRequired = Optional | Rest | Variadic,
    NonRest     = Required | Optional | Variadic,
}

/** @internal */
export const enum AssignmentDeclarationKind {
    None,
    /// exports.name = expr
    /// module.exports.name = expr
    ExportsProperty,
    /// module.exports = expr
    ModuleExports,
    /// className.prototype.name = expr
    PrototypeProperty,
    /// this.name = expr
    ThisProperty,
    // F.name = expr
    Property,
    // F.prototype = { ... }
    Prototype,
    // Object.defineProperty(x, 'name', { value: any, writable?: boolean (false by default) });
    // Object.defineProperty(x, 'name', { get: Function, set: Function });
    // Object.defineProperty(x, 'name', { get: Function });
    // Object.defineProperty(x, 'name', { set: Function });
    ObjectDefinePropertyValue,
    // Object.defineProperty(exports || module.exports, 'name', ...);
    ObjectDefinePropertyExports,
    // Object.defineProperty(Foo.prototype, 'name', ...);
    ObjectDefinePrototypeProperty,
}

/** @internal */
export type OuterExpression =
    | ParenthesizedExpression
    // | TypeAssertion
    // | SatisfiesExpression
    // | AsExpression
    // | NonNullExpression
    | PartiallyEmittedExpression;

/** @internal */
export type WrappedExpression<T extends Expression> =
    | OuterExpression & { readonly expression: WrappedExpression<T>; }
    | T;

/** @internal */
export const enum TransformFlags {
    None = 0,
    ContainsRestOrSpread,
    ContainsFluffOS,
    ContainsLDMud,
    ContainsHoistedDeclarationOrCompletion,
    ContainsUpdateExpressionForIdentifier
}

export type KeywordTypeSyntaxKind =
    | SyntaxKind.AnyKeyword
    | SyntaxKind.IntKeyword
    | SyntaxKind.FloatKeyword
    | SyntaxKind.IntrinsicKeyword
    | SyntaxKind.BytesKeyword
    | SyntaxKind.MappingKeyword
    | SyntaxKind.StatusKeyword
    | SyntaxKind.LwObjectKeyword
    | SyntaxKind.ClosureKeyword
    | SyntaxKind.SymbolKeyword
    | SyntaxKind.FunctionKeyword
    | SyntaxKind.BufferKeyword    
    | SyntaxKind.MixedKeyword
    | SyntaxKind.ObjectKeyword
    | SyntaxKind.StringKeyword       
    // | SyntaxKind.SymbolKeyword
    | SyntaxKind.UndefinedKeyword
    | SyntaxKind.UnknownKeyword
    | SyntaxKind.NeverKeyword
    | SyntaxKind.VoidKeyword;    

export type TokenSyntaxKind =
    | SyntaxKind.Unknown
    | SyntaxKind.EndOfFileToken
    | TriviaSyntaxKind
    | LiteralSyntaxKind
    // | PseudoLiteralSyntaxKind
    | PunctuationSyntaxKind
    | SyntaxKind.Identifier
    | KeywordSyntaxKind;

export type TypeNodeSyntaxKind =
    | KeywordTypeSyntaxKind
    | SyntaxKind.TupleType
    | SyntaxKind.InferType
    | SyntaxKind.UnionType
    | SyntaxKind.NamedTupleMember
    | SyntaxKind.IndexedAccessType
    | SyntaxKind.StructType
    | SyntaxKind.ArrayType
    | SyntaxKind.LiteralType
    | SyntaxKind.ThisType
    | SyntaxKind.TypePredicate
    | SyntaxKind.MappedType
    | SyntaxKind.TypeLiteral
    | SyntaxKind.ParenthesizedType
    | SyntaxKind.TypeReference
    | SyntaxKind.ExpressionWithTypeArguments
    | SyntaxKind.FunctionType
    | SyntaxKind.ConditionalType
    | SyntaxKind.IntersectionType
    | SyntaxKind.NamedObjectType
    | SyntaxKind.JSDocTypeExpression
    | SyntaxKind.JSDocAllType
    | SyntaxKind.JSDocUnknownType
    | SyntaxKind.JSDocNonNullableType
    | SyntaxKind.JSDocNullableType
    | SyntaxKind.JSDocOptionalType
    | SyntaxKind.JSDocFunctionType
    | SyntaxKind.JSDocVariadicType
    | SyntaxKind.JSDocNamepathType
    | SyntaxKind.JSDocSignature
    | SyntaxKind.JSDocTypeLiteral;

export type PropertyName = Identifier | StringLiteral | IntLiteral | ComputedPropertyName | ParenthesizedExpression;
export type MemberName = Identifier;// | Expression;

export type DeclarationName =
    | PropertyName
    | StringLiteral
    | Expression
    | ElementAccessExpression
    | BindingPattern
    | EntityNameExpression;
    ;

export interface Symbol {
    flags: SymbolFlags;                     // Symbol flags
    name: string;                           // Name of symbol
    declarations?: Declaration[];           // Declarations associated with this symbol
    valueDeclaration?: Declaration;         // First value declaration of the symbol
    members?: SymbolTable;                  // Class, interface or object literal instance members
    exports?: SymbolTable;                  // Module exports
    inherits?: Map<string,Type>;            // Inherited members 
    globalExports?: SymbolTable;            // Conditional global UMD exports
    /** @internal */ id: SymbolId;          // Unique id (used to look up SymbolLinks)
    /** @internal */ mergeId: number;       // Merge id (used to look up merged symbol)
    /** @internal */ parent?: Symbol;       // Parent symbol
    /** @internal */ exportSymbol?: Symbol; // Exported symbol associated with this symbol
    /** @internal */ constEnumOnlyModule: boolean | undefined; // True if module contains only const enums or other modules with only const enums
    /** @internal */ isReferenced?: SymbolFlags; // True if the symbol is referenced elsewhere. Keeps track of the meaning of a reference in case a symbol is both a type parameter and parameter.
    /** @internal */ lastAssignmentPos?: number; // Source position of last node that assigns value to symbol
    /** @internal */ isReplaceableByMethod?: boolean; // Can this Javascript class property be replaced by a method symbol?
    /** @internal */ assignmentDeclarationMembers?: Map<number, Declaration>; // detected late-bound assignment declarations associated with the symbol
}

/** @internal */
export interface NodeConverters {
    convertToFunctionBlock(node: ConciseBody, multiLine?: boolean): Block;
    convertToFunctionExpression(node: FunctionDeclaration): FunctionExpression;
    // convertToClassExpression(node: ClassDeclaration): ClassExpression;
    // convertToArrayAssignmentElement(element: ArrayBindingOrAssignmentElement): Expression;
    // convertToObjectAssignmentElement(element: ObjectBindingOrAssignmentElement): ObjectLiteralElementLike;
    // convertToAssignmentPattern(node: BindingOrAssignmentPattern): AssignmentPattern;
    // convertToObjectAssignmentPattern(node: ObjectBindingOrAssignmentPattern): ObjectLiteralExpression;
    // convertToArrayAssignmentPattern(node: ArrayBindingOrAssignmentPattern): ArrayLiteralExpression;
    // convertToAssignmentElementTarget(node: BindingOrAssignmentElementTarget): Expression;
}

export interface TrueLiteral extends PrimaryExpression {
    readonly kind: SyntaxKind.TrueKeyword;
}

export interface FalseLiteral extends PrimaryExpression {
    readonly kind: SyntaxKind.FalseKeyword;
}

export interface NodeFactory {
    /** @internal */ readonly parenthesizer: ParenthesizerRules;
    /** @internal */ readonly converters: NodeConverters;
    /** @internal */ readonly baseFactory: BaseNodeFactory;
    /** @internal */ readonly flags: NodeFactoryFlags;

    createSourceFile(statements: readonly Statement[], endOfFileToken: EndOfFileToken, flags: NodeFlags): SourceFile;
    createNodeArray<T extends Node>(elements?: readonly T[], hasTrailingComma?: boolean): NodeArray<T>;
    createIntLiteral(value: string|number, numericLiteralFlags?: TokenFlags): IntLiteral;
    createFloatLiteral(value: string|number, numericLiteralFlags?: TokenFlags): FloatLiteral;
    createStringLiteral(text: string): StringLiteral;
    /** @internal */ createStringLiteral(text: string, isSingleQuote?: boolean, hasExtendedUnicodeEscape?: boolean): StringLiteral; // eslint-disable-line @typescript-eslint/unified-signatures
    createBytesLiteral(text: string): BytesLiteral    
    /** @internal */ createBytesLiteral(text: string, hasExtendedUnicodeEscape?: boolean): BytesLiteral    
    createStringLiteralFromNode(sourceNode: PropertyNameLiteral, isSingleQuote?: boolean): StringLiteral;
    
    createTrue(): TrueLiteral;
    createFalse(): FalseLiteral;

    createToken(token: SyntaxKind.EndOfFileToken): EndOfFileToken;
    createToken(token: SyntaxKind.Unknown): Token<SyntaxKind.Unknown>;    
    /** @internal */ createToken<TKind extends SyntaxKind>(token: TKind): Token<TKind>;

    createIdentifier(text: string): Identifier;
    /** @internal */ createIdentifier(text: string, originalKeywordKind?: SyntaxKind, hasExtendedUnicodeEscape?: boolean): Identifier; // eslint-disable-line @typescript-eslint/unified-signatures
    createLiteralLikeNode(kind: LiteralToken["kind"], text: string): LiteralToken;
    
    // element
    createEmptyStatement(): EmptyStatement;

    //
    // Modifiers
    //

    createModifier<T extends ModifierSyntaxKind>(kind: T): ModifierToken<T>;
    createModifiersFromModifierFlags(flags: ModifierFlags): Modifier[] | undefined;

    // Names
    createQualifiedName(left: EntityName, right: string | Identifier): QualifiedName;
    createComputedPropertyName(expression: Expression): ComputedPropertyName;
    updateComputedPropertyName(node: ComputedPropertyName, expression: Expression): ComputedPropertyName;

    // type elements
    createIndexSignature(modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): IndexSignatureDeclaration;
    /** @internal */ createIndexSignature(modifiers: readonly Modifier[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined): IndexSignatureDeclaration; // eslint-disable-line @typescript-eslint/unified-signatures
    createTypeParameterDeclaration(modifiers: readonly Modifier[] | undefined, name: string | Identifier, constraint?: TypeNode, defaultType?: TypeNode): TypeParameterDeclaration;
    updateTypeParameterDeclaration(node: TypeParameterDeclaration, modifiers: readonly Modifier[] | undefined, name: Identifier, constraint: TypeNode | undefined, defaultType: TypeNode | undefined): TypeParameterDeclaration;
    createMethodSignature(modifiers: readonly Modifier[] | undefined, name: string | PropertyName, questionToken: QuestionToken | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined): MethodSignature;
    createCallSignature(typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined): CallSignatureDeclaration;
    createFunctionTypeNode(typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): FunctionTypeNode;

    // binding patterns
    createBindingElement(dotDotDotToken: DotDotDotToken | undefined, propertyName: string | PropertyName | undefined, name: string | BindingName, initializer?: Expression): BindingElement;
    updateBindingElement(node: BindingElement, dotDotDotToken: DotDotDotToken | undefined, propertyName: PropertyName | undefined, name: BindingName, initializer: Expression | undefined): BindingElement;

    // directives
    createIncludeDirective(content: StringLiteral[], localFirst: boolean): IncludeDirective;
    createPragmaDirective(expression: NodeArray<Identifier>): PragmaDirective;
    createDefineDirective(name: string | Identifier | TypeNode, args: NodeArray<ParameterDeclaration>, range: TextRange): DefineDirective;
    createUndefDirective(name: string | Identifier): UndefDirective;

    // types
    createTypePredicateNode(assertsModifier: undefined, parameterName: Identifier | ThisTypeNode | string, type: TypeNode | undefined): TypePredicateNode;
    updateTypePredicateNode(node: TypePredicateNode, assertsModifier: undefined, parameterName: Identifier | ThisTypeNode, type: TypeNode | undefined): TypePredicateNode;
    createKeywordTypeNode<TKind extends KeywordTypeSyntaxKind>(kind: TKind): KeywordTypeNode<TKind>;
    createTypeReferenceNode(typeName: string | EntityName, typeArguments?: readonly TypeNode[]): TypeReferenceNode;
    updateTypeReferenceNode(node: TypeReferenceNode, typeName: EntityName, typeArguments: NodeArray<TypeNode> | undefined): TypeReferenceNode;
    createUnionTypeNode(types: readonly TypeNode[]): UnionTypeNode;
    createIntersectionTypeNode(types: readonly TypeNode[]): IntersectionTypeNode;
    createArrayTypeNode(elementType: TypeNode): ArrayTypeNode;
    createNamedObjectTypeNode(name: StringLiteral | BinaryExpression | ParenthesizedExpression, objectKeyword: TypeNode): NamedObjectTypeNode;
    createParenthesizedType(type: TypeNode): ParenthesizedTypeNode;
    createLiteralTypeNode(literal: LiteralTypeNode["literal"]): LiteralTypeNode;
    createTypeLiteralNode(members: readonly TypeElement[] | undefined): TypeLiteralNode;
    createStructTypeNode(name: Identifier, keyword: StructKeywordSyntaxKind): StructTypeNode;
    createPropertySignature(modifiers: readonly Modifier[] | undefined, name: PropertyName | string, type: TypeNode | undefined): PropertySignature;
    createStructDeclarationNode(
        modifiers: readonly Modifier[] | undefined,
        name: Identifier, 
        heritageName: Identifier | undefined,
        type: TypeNode
    ): StructDeclaration;

    // Statements
    createBlock(statements: readonly Statement[], multiLine?: boolean): Block;
    createVariableStatement(modifiers: readonly Modifier[] | undefined, type: TypeNode | undefined, declarationList: VariableDeclarationList | readonly VariableDeclaration[]): VariableStatement;
    createVariableDeclarationList(declarations: readonly VariableDeclaration[], flags?: NodeFlags): VariableDeclarationList;
    createVariableDeclaration(name: string | BindingName, refToken?: RefToken, type?: TypeNode | undefined, initializer?: Expression | undefined): VariableDeclaration;    
    createFunctionDeclaration(modifiers: readonly Modifier[] | undefined, name: string | Identifier | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): FunctionDeclaration;
    createExpressionStatement(expression: Expression): ExpressionStatement;
    createReturnStatement(expression?: Expression): ReturnStatement;
    createBreakStatement(label?: string | Identifier): BreakStatement;
    createContinueStatement(label?: string | Identifier): ContinueStatement;
    createInheritDeclaration(importClause: InheritClauseNodeType, modifiers: readonly Modifier[] | undefined): InheritDeclaration;    
    createIfStatement(expression: Expression, thenStatement: Statement, elseStatement?: Statement): IfStatement;
    createSwitchStatement(expression: Expression, preBlock: NodeArray<Statement>, caseBlock: CaseBlock): SwitchStatement;
    createCaseBlock(clauses: readonly CaseOrDefaultClause[]): CaseBlock;
    createDefaultClause(statements: readonly Statement[]): DefaultClause;
    createCaseClause(expression: Expression, statements: readonly Statement[]): CaseClause;
    createForStatement(initializer: ForInitializer | undefined, condition: Expression | undefined, incrementor: Expression | undefined, statement: Statement): ForStatement
    createForEachStatement(initializer: ForInitializer | undefined, range: Expression | undefined, statement: Statement): ForEachStatement;
    createDoWhileStatement(statement: Statement, expression: Expression): DoWhileStatement;
    createWhileStatement(statement: Statement, expression: Expression): WhileStatement;
    createParameterDeclaration(modifiers: readonly Modifier[] | undefined, dotDotDotToken: DotDotDotToken | undefined, name: string | BindingName, ampToken?: AmpersandToken | RefToken, type?: TypeNode, initializer?: Expression): ParameterDeclaration;
    /** @internal */ createMissingDeclaration(): MissingDeclaration;
    createCatchStatement(expression: Expression | undefined, block: Block, modifier?: Identifier, modifierExpression?: Expression): CatchStatement;

    // Expressions
    createExpressionWithTypeArguments(expression: Expression, typeArguments: readonly TypeNode[] | undefined): ExpressionWithTypeArguments;
    createCatchExpression(expression: Expression, modifier?: Identifier, modifierExpression?: Expression, block?: Block): CatchExpression;
    createEvaluateExpression(expression: Expression, argumentsArray: readonly Expression[] | undefined): EvaluateExpression;
    createNewExpression(expression: Expression|TypeNode|undefined, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly NewExpressionArgument[] | undefined): NewExpression;
    createSpreadElement(expression: Expression): SpreadElement;
    createByRefElement(ampToken: AmpersandToken | RefToken, expr: Expression): ByRefElement;
    createFunctionExpression(modifiers: readonly Modifier[] | undefined, name: string | Identifier | undefined, parameters: readonly ParameterDeclaration[] | undefined, type: TypeNode | undefined, body: Block): FunctionExpression;
    createOmittedExpression(): OmittedExpression;
    createParenthesizedExpression(expression: Expression): ParenthesizedExpression;
    createConditionalExpression(condition: Expression, questionToken: QuestionToken | undefined, whenTrue: Expression, colonToken: ColonToken | undefined, whenFalse: Expression): ConditionalExpression;
    createBinaryExpression(left: Expression, operator: BinaryOperator | BinaryOperatorToken, right: Expression): BinaryExpression;
    createCallExpression(expression: Expression, argumentsArray: readonly Expression[] | undefined): CallExpression;
    createInlineClosure(body: ConciseBody | NodeArray<Expression>): InlineClosureExpression;
    createSuperAccessExpression(name: MemberName, namespace?: string | StringLiteral | Identifier): SuperAccessExpression;
    createPropertyAccessExpression(expression: Expression, name: string | Identifier | Expression, propertyAccessToken?: PropertyAccessToken): PropertyAccessExpression;
    createPrefixUnaryExpression(operator: PrefixUnaryOperator, operand: Expression): PrefixUnaryExpression;
    createPostfixUnaryExpression(operand: Expression, operator: PostfixUnaryOperator): PostfixUnaryExpression;
    createElementAccessExpression(expression: Expression, index: number | Expression): ElementAccessExpression;
    createArrayLiteralExpression(elements?: readonly Expression[], multiLine?: boolean, trailingComma?: boolean);
    createObjectLiteralExpression(properties?: readonly ObjectLiteralElementLike[], multiLine?: boolean): ObjectLiteralExpression;
    createMappingLiteralExpression(initializer?: Expression, elements?: readonly Expression[], multiLine?: boolean, trailingComma?: boolean): MappingLiteralExpression;
    createMappingEntryExpression(name: Expression, elements: readonly Expression[]): MappingEntryExpression
    convertToAssignmentExpression(node: Mutable<VariableDeclaration>): BinaryExpression;
    createLambdaOperatorExpression(op: LambdaOperatorToken): LambdaOperatorExpression;
    createLambdaIdentifierExpression(name: Expression): LambdaIdentifierExpression;
    createCastExpression(expression: Expression, type: TypeNode): Expression;
    createCloneObjectExpression(expression: Expression, argumentsArray: readonly Expression[] | undefined): CloneObjectExpression;
    createTypeAssertion(type: TypeNode, expression: Expression): TypeAssertion;
    createNewStructExpression(type: StructTypeNode, argumentsArray: readonly (Expression|ObjectLiteralElementLike)[] | undefined): NewStructExpression;
    createRangeExpression(left: Expression, right: Expression): RangeExpression;
    
    // JSDoc
    createJSDocText(text: string): JSDocText;
    createJSDocComment(comment?: string | NodeArray<JSDocComment> | undefined, tags?: readonly JSDocTag[] | undefined): JSDoc;
    createJSDocParameterTag(tagName: Identifier | undefined, name: EntityName, defaultExpression: Expression | undefined, isBracketed: boolean, typeExpression?: JSDocTypeExpression, isNameFirst?: boolean, comment?: string | NodeArray<JSDocComment>): JSDocParameterTag;
    createJSDocReturnTag(tagName: Identifier | undefined, typeExpression?: JSDocTypeExpression, comment?: string | NodeArray<JSDocComment>): JSDocReturnTag;
    createJSDocOptionalType(type: TypeNode): JSDocOptionalType;
    createJSDocTypeTag(tagName: Identifier | undefined, typeExpression: JSDocTypeExpression, comment?: string | NodeArray<JSDocComment>): JSDocTypeTag;
    createJSDocTypeExpression(type: TypeNode): JSDocTypeExpression;
    createJSDocNameReference(name: EntityName | JSDocMemberName): JSDocNameReference;
    createJSDocLink(name: EntityName | JSDocMemberName | undefined, text: string): JSDocLink;
    createJSDocLinkCode(name: EntityName | JSDocMemberName | undefined, text: string): JSDocLinkCode;
    createJSDocLinkPlain(name: EntityName | JSDocMemberName | undefined, text: string): JSDocLinkPlain;

    createJSDocClassTag(tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>): JSDocClassTag;
    createJSDocPublicTag(tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>): JSDocPublicTag;
    createJSDocPrivateTag(tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>): JSDocPrivateTag;
    createJSDocProtectedTag(tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>): JSDocProtectedTag;
    createJSDocDeprecatedTag(tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>): JSDocDeprecatedTag;
    createJSDocOverrideTag(tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>): JSDocOverrideTag;
    createJSDocUnknownTag(tagName: Identifier, comment?: string | NodeArray<JSDocComment>): JSDocUnknownTag;
    createJSDocPropertyTag(tagName: Identifier | undefined, name: EntityName, isBracketed: boolean, typeExpression?: JSDocTypeExpression, isNameFirst?: boolean, comment?: string | NodeArray<JSDocComment>): JSDocPropertyTag;
    createJSDocVariableTag(tagName: Identifier | undefined, name: EntityName, isBracketed: boolean, typeExpression?: JSDocTypeExpression, isNameFirst?: boolean, comment?: string | NodeArray<JSDocComment>): JSDocVariableTag;
    createJSDocTypeLiteral(propertyTags?: readonly JSDocPropertyLikeTag[], isArrayType?: boolean): JSDocTypeLiteral;
    createJSDocSeeTag(tagName: Identifier | undefined, name: JSDocNameReference | undefined, comment?: string | NodeArray<JSDocComment>): JSDocSeeTag;
    createJSDocAuthorTag(tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>): JSDocAuthorTag;
    createJSDocThrowsTag(tagName: Identifier, typeExpression: JSDocTypeExpression | undefined, comment?: string | NodeArray<JSDocComment>): JSDocThrowsTag;
    createJSDocImplementsTag(tagName: Identifier | undefined, className: JSDocImplementsTag["class"], comment?: string | NodeArray<JSDocComment>): JSDocImplementsTag;
    createJSDocTypedefTag(tagName: Identifier | undefined, typeExpression?: JSDocTypeExpression | JSDocTypeLiteral, fullName?: Identifier, comment?: string | NodeArray<JSDocComment>): JSDocTypedefTag;
    createJSDocAugmentsTag(tagName: Identifier | undefined, className: JSDocAugmentsTag["class"], comment?: string | NodeArray<JSDocComment>): JSDocAugmentsTag;
    createJSDocSatisfiesTag(tagName: Identifier | undefined, typeExpression: JSDocTypeExpression, comment?: string | NodeArray<JSDocComment>): JSDocSatisfiesTag;
    createJSDocThisTag(tagName: Identifier | undefined, typeExpression: JSDocTypeExpression, comment?: string | NodeArray<JSDocComment>): JSDocThisTag;
    createJSDocVariadicType(type: TypeNode): JSDocVariadicType;
    createJSDocSignature(typeParameters: readonly JSDocTemplateTag[] | undefined, parameters: readonly JSDocParameterTag[], type?: JSDocReturnTag): JSDocSignature;
    createJSDocCallbackTag(tagName: Identifier | undefined, typeExpression: JSDocSignature, fullName?: Identifier, comment?: string | NodeArray<JSDocComment>): JSDocCallbackTag;
    createJSDocOverloadTag(tagName: Identifier | undefined, typeExpression: JSDocSignature, comment?: string | NodeArray<JSDocComment>): JSDocOverloadTag
    createJSDocTemplateTag(tagName: Identifier | undefined, constraint: JSDocTypeExpression | undefined, typeParameters: readonly TypeParameterDeclaration[], comment?: string | NodeArray<JSDocComment>): JSDocTemplateTag;


    // Properties Assignment
    createPropertyAssignment(name: string | PropertyName, initializer: Expression): PropertyAssignment;

    /**
     * Creates a shallow, memberwise clone of a node.
     * - The result will have its `original` pointer set to `node`.
     * - The result will have its `pos` and `end` set to `-1`.
     * - *DO NOT USE THIS* if a more appropriate function is available.
     *
     * @internal
     */
    cloneNode<T extends Node | undefined>(node: T): T;

    //
    // Synthetic Nodes
    //
    /** @internal */ createSyntheticExpression(type: Type, isSpread?: boolean, tupleNameSource?: ParameterDeclaration | NamedTupleMember): SyntheticExpression;
    /** @internal */ createSyntaxList(children: readonly Node[]): SyntaxList;

    /**
     * Gets the name of a declaration for use in declarations.
     *
     * @param node The declaration.
     * @param allowComments A value indicating whether comments may be emitted for the name.
     * @param allowSourceMaps A value indicating whether source maps may be emitted for the name.
     *
     * @internal
     */
    getDeclarationName(node: Declaration | undefined, allowComments?: boolean, allowSourceMaps?: boolean): Identifier;
}

export interface CompilerOptions {
    skipLibCheck?: boolean;
    skipDefaultLibCheck?: boolean;
    allowArbitraryExtensions?: boolean;
    traceResolution?: boolean;
    allowUnreachableCode?: boolean;
    noUncheckedIndexedAccess?: boolean;
    noFallthroughCasesInSwitch?: boolean;
    noCheck?: boolean;
    noUnusedLocals?: boolean;
    noUnusedParameters?: boolean;
    noImplicitReturns?: boolean;
    strictObjectTypes?: boolean;
    newLine?: NewLineKind;    
    configFile?: LpcConfigSourceFile; 
    sefunFile?: string;
    masterFile?: string;
    playerFile?: string;
    configDefines?: MapLike<string>;
    forceConsistentCasingInFileNames?: boolean;
    noResolve?: boolean;
    noLib?: boolean;
    maxNodeModuleJsDepth?: number;
    getCompilationSettings?: any;
    configFilePath?: string;
    driverType?: LanguageVariant;
    rootDir?: string;
    rootDirs?: string[];
    outDir?: string;
    declarationDir?: string;
    outFile?: string;
    paths?: MapLike<string[]>;
    /**
     * The directory of the config file that specified 'paths'. Used to resolve relative paths when 'baseUrl' is absent.
     *
     * @internal
     */
    pathsBasePath?: string;
    lib?: string[];
    preserveSymlinks?: boolean;   
    disableSourceOfProjectReferenceRedirect?: boolean;
    disableReferencedProjectLoad?: boolean;
    module?: ModuleKind;
    target?: ScriptTarget;
    exactOptionalPropertyTypes?: boolean;
    diagnostics?: boolean;
    libIncludeDirs?: string[];
    globalIncludeFiles?: string[];    
    resolvedGlobalIncludeFiles?: string[];

    [option: string]: CompilerOptionsValue | LpcConfigSourceFile | undefined;
}


export const enum OuterExpressionKinds {
    Parentheses = 1 << 0,
    /** @deprecated not supported in lpc */
    TypeAssertions = 1 << 1,    
    /** @deprecated not supported in lpc */
    NonNullAssertions = 1 << 2,
    PartiallyEmittedExpressions = 1 << 3,

    Assertions = TypeAssertions | NonNullAssertions,
    All = Parentheses | Assertions | PartiallyEmittedExpressions,

    ExcludeJSDocTypeAssertion = 1 << 4,
}

/** DIAGNOSTICS */
export interface DiagnosticMessage {
    key: string;
    category: DiagnosticCategory;
    code: number;
    message: string;
    reportsUnnecessary?: {};
    reportsDeprecated?: {};
    /** @internal */
    elidedInCompatabilityPyramid?: boolean;
}

export enum DiagnosticCategory {
    Warning,
    Error,
    Suggestion,
    Message,
}
/** @internal */
export function diagnosticCategoryName(d: { category: DiagnosticCategory; }, lowerCase = true): string {
    const name = DiagnosticCategory[d.category];
    return lowerCase ? name.toLowerCase() : name;
}

/** @internal */
export type DiagnosticArguments = (string | number)[];

/** @internal */
export type DiagnosticAndArguments = [message: DiagnosticMessage, ...args: DiagnosticArguments];

/** @internal */
export interface DiagnosticCollection {
    // Adds a diagnostic to this diagnostic collection.
    add(diagnostic: Diagnostic): void;

    // Returns the first existing diagnostic that is equivalent to the given one (sans related information)
    lookup(diagnostic: Diagnostic): Diagnostic | undefined;

    // Gets all the diagnostics that aren't associated with a file.
    getGlobalDiagnostics(): Diagnostic[];

    // If fileName is provided, gets all the diagnostics associated with that file name.
    // Otherwise, returns all the diagnostics (global and file associated) in this collection.
    getDiagnostics(): Diagnostic[];
    getDiagnostics(fileName: string): DiagnosticWithLocation[];
}

export interface DiagnosticRelatedInformation {
    category: DiagnosticCategory;
    code: number;
    file: SourceFileBase | undefined;
    start: number | undefined;
    length: number | undefined;
    messageText: string | DiagnosticMessageChain;
}

export interface DiagnosticWithLocation extends Diagnostic {
    file: SourceFileBase;
    start: number;
    length: number;
}

/** @internal */
export interface RepopulateModuleNotFoundDiagnosticChain {
    moduleReference: string;    
    packageName: string | undefined;
}


/** @internal */
export type RepopulateDiagnosticChainInfo = RepopulateModuleNotFoundDiagnosticChain;

/**
 * A linked list of formatted diagnostic messages to be used as part of a multiline message.
 * It is built from the bottom up, leaving the head to be the "main" diagnostic.
 * While it seems that DiagnosticMessageChain is structurally similar to DiagnosticMessage,
 * the difference is that messages are all preformatted in DMC.
 */
export interface DiagnosticMessageChain {
    messageText: string;
    category: DiagnosticCategory;
    code: number;
    next?: DiagnosticMessageChain[];
    /** @internal */
    repopulateInfo?: () => RepopulateDiagnosticChainInfo;
    /** @internal */
    canonicalHead?: CanonicalDiagnostic;
}

/** @internal */
export interface DiagnosticWithDetachedLocation extends Diagnostic {
    file: undefined;
    fileName: string;
    start: number;
    length: number;
}


export interface Diagnostic extends DiagnosticRelatedInformation {
    /** May store more in future. For now, this will simply be `true` to indicate when a diagnostic is an unused-identifier diagnostic. */
    reportsUnnecessary?: {};

    reportsDeprecated?: {};
    source?: string;
    relatedInformation?: DiagnosticRelatedInformation[];
    /** @internal */ skippedOn?: keyof CompilerOptions;
    /**
     * @internal
     * Used for deduplication and comparison.
     * Whenever it is possible for two diagnostics that report the same problem to be produced with
     * different messages (e.g. "Cannot find name 'foo'" vs "Cannot find name 'foo'. Did you mean 'bar'?"),
     * this property can be set to a canonical message,
     * so that those two diagnostics are appropriately considered to be the same.
     */
    canonicalHead?: CanonicalDiagnostic;
}

/** @internal */
export interface CanonicalDiagnostic {
    code: number;
    messageText: string;
}


/**
 * Declarations that can contain other declarations. Corresponds with `ContainerFlags.IsContainer` in binder.ts.
 *
 * @internal
 */
export type IsContainer =
    InlineClosureExpression
    | StructDeclaration
    | ClassExpression
    | ClassDeclaration
    // | EnumDeclaration
    | ObjectLiteralExpression
    | TypeLiteralNode
    | JSDocTypeLiteral
    // | JsxAttributes
    // | InterfaceDeclaration
    // | ModuleDeclaration
    | TypeAliasDeclaration
    | MappedTypeNode
    | IndexSignatureDeclaration
    | SourceFile
    // | GetAccessorDeclaration
    // | SetAccessorDeclaration
    | MethodDeclaration
    // | ConstructorDeclaration
    | FunctionDeclaration
    | MethodSignature
    | CallSignatureDeclaration
    | JSDocSignature
    | JSDocFunctionType
    | FunctionTypeNode
    // | ConstructSignatureDeclaration
    // | ConstructorTypeNode
    // | ClassStaticBlockDeclaration
    | FunctionExpression
    | InlineClosureExpression
    | ArrowFunction;

/**
 * Nodes that introduce a new block scope. Corresponds with `ContainerFlags.IsBlockScopedContainer` in binder.ts.
 *
 * @internal
 */
export type IsBlockScopedContainer =
    | IsContainer
    | CatchStatement
    | ForStatement
    //| ForInStatement
    | ForEachStatement
    | WhileStatement
    | DoWhileStatement
    | CaseBlock
    | Block;

export type FunctionLikeDeclaration =
    | FunctionDeclaration
    | InlineClosureExpression
    | MethodDeclaration    
    | FunctionExpression
    | ArrowFunction
    ;

/**
 * Corresponds with `ContainerFlags` in binder.ts.
 *
 * @internal
 */
export type HasContainerFlags =
    | IsContainer
    | IsBlockScopedContainer
    // | IsControlFlowContainer
    // | IsFunctionLike
    // | IsFunctionExpression
    | HasLocals
    // | IsInterface
    // | IsObjectLiteralOrClassExpressionMethodOrAccessor;
    ;

/** NODES */
export type HasJSDoc = 
    | IncludeDirective
    | CatchStatement
    | FunctionExpression
    | SuperAccessExpression
    | DefineDirective
    | UndefDirective
    | Block 
    | StructDeclaration
    | PropertySignature
    | MethodSignature
    | InlineClosureExpression
    | InheritDeclaration
    | SwitchStatement
    | CaseClause
    | BreakStatement
    | ContinueStatement
    | IfStatement
    | ParenthesizedExpression
    | ExpressionStatement
    | EmptyStatement
    | EndOfFileToken
    | DoWhileStatement
    | ForStatement
    | ForEachStatement
    | FunctionDeclaration
    | ArrowFunction
    | ReturnStatement
    | ParameterDeclaration
    | VariableStatement     
    | VariableDeclaration
    | WhileStatement
    | PropertyAssignment
    | ElementAccessExpression
    | ShorthandPropertyAssignment;

export type HasType =
    | SignatureDeclaration
    | VariableStatement
    | VariableDeclaration
    | ParameterDeclaration
    | PropertySignature
    | PropertyDeclaration    
    | ParenthesizedTypeNode    
    | MappedTypeNode
    | AssertionExpression
    | TypeAliasDeclaration
    | JSDocTypeExpression    
    // | JSDocNonNullableType
    // | JSDocNullableType
    // | JSDocOptionalType
    | JSDocVariadicType
    ;

export type HasExpressionInitializer =
    | VariableDeclaration
    | ParameterDeclaration
    | BindingElement
    | PropertyDeclaration
    | PropertyAssignment
    ;

export type HasInitializer =
    | HasExpressionInitializer
    | ForStatement
    | ForEachStatement    
    // | JsxAttribute;
    ;


/**
 * Nodes that can have local symbols. Corresponds with `ContainerFlags.HasLocals`. Constituents should extend
 * {@link LocalsContainer}.
 *
 * @internal
 */
export type HasLocals =
    | ArrowFunction
    | Block
    | CallSignatureDeclaration
    | CaseBlock
    | CatchStatement        
    | ConditionalTypeNode    
    | ForStatement
    | ForEachStatement    
    | FunctionDeclaration
    | FunctionExpression
    | FunctionTypeNode    
    | IndexSignatureDeclaration
    | InlineClosureExpression
    | JSDocCallbackTag   
    | JSDocFunctionType
    | JSDocSignature
    | JSDocTypedefTag
    | MappedTypeNode
    | MethodDeclaration
    | MethodSignature
    // | ModuleDeclaration    
    | SourceFile
    | TypeAliasDeclaration
    ;

// NOTE: Changing the following list requires changes to:
// - `canHaveModifiers` in factory/utilitiesPublic.ts
// - `updateModifiers` in factory/nodeFactory.ts
export type HasModifiers =
    | TypeParameterDeclaration
    | ParameterDeclaration
    | StructDeclaration
    | FunctionLikeDeclaration
    // | ConstructorTypeNode
    | PropertySignature
    | PropertyDeclaration
    | MethodSignature
    | MethodDeclaration
    // | ConstructorDeclaration
    // | GetAccessorDeclaration
    // | SetAccessorDeclaration
    | IndexSignatureDeclaration
    | FunctionExpression
    | ArrowFunction
    | ClassExpression
    | VariableStatement
    | FunctionDeclaration
    | ClassDeclaration
    // | InterfaceDeclaration
    | TypeAliasDeclaration
    // | EnumDeclaration
    // | ModuleDeclaration
    // | ImportEqualsDeclaration
    // | ImportDeclaration
    // | ExportAssignment
    // | ExportDeclaration
    ;

// NOTE: Changing the following list requires changes to:
// - `canHaveIllegalModifiers` in factory/utilities.ts
/** @internal */
export type HasIllegalModifiers =
    // | ClassStaticBlockDeclaration
    | PropertyAssignment
    | ShorthandPropertyAssignment
    | MissingDeclaration;
    // | NamespaceExportDeclaration;

/** @internal */
export type HasFlowNode =
    | Identifier
    | ElementAccessExpression
    // | ThisExpression
    // | SuperExpression
    // | QualifiedName
    // | MetaProperty    
    // | BindingElement
    // | ArrowFunction
    // | MethodDeclaration
    // | GetAccessorDeclaration
    // | SetAccessorDeclaration
    | PropertyAccessExpression
    | FunctionExpression
    | VariableStatement
    | ExpressionStatement
    | IfStatement
    | DoWhileStatement
    | WhileStatement
    | ForStatement
    //| ForInStatement
    | ForEachStatement    
    | ContinueStatement
    | BreakStatement
    | ReturnStatement
    | SwitchStatement
    // | WithStatement
    // | LabeledStatement
    // | ThrowStatement
    // | TryStatement
    // | DebuggerStatement;
    ;

// Ideally, `ForEachChildNodes` and `VisitEachChildNodes` would not differ.
// However, `forEachChild` currently processes JSDoc comment syntax and missing declarations more thoroughly.
// On the other hand, `visitEachChild` actually processes `Identifier`s (which really *shouldn't* have children,
// but are constructed as if they could for faked-up `QualifiedName`s in the language service.)

/** @internal */
export type ForEachChildNodes =
    | HasChildren
    | MissingDeclaration
    | JSDocTypeExpression    
    | JSDoc
    | JSDocSeeTag
    | JSDocNameReference
    | JSDocMemberName
    | JSDocParameterTag
    | JSDocPropertyTag
    | JSDocVariableTag
    | JSDocAuthorTag
    | JSDocImplementsTag
    | JSDocAugmentsTag
    | JSDocTemplateTag
    | JSDocTypedefTag
    | JSDocCallbackTag
    | JSDocReturnTag
    | JSDocTypeTag
    | JSDocThisTag    
    | JSDocSignature
    | JSDocTypeLiteral
    | JSDocLink
    | JSDocLinkCode
    | JSDocLinkPlain
    | JSDocUnknownTag
    | JSDocClassTag
    | JSDocPublicTag
    | JSDocPrivateTag
    | JSDocProtectedTag
    // | JSDocReadonlyTag
    | JSDocVariadicType
    | JSDocDeprecatedTag
    | JSDocThrowsTag
    | JSDocOverrideTag
    | JSDocSatisfiesTag
    | JSDocOverloadTag;    

/** @internal */
export type HasChildren =
    | InheritDeclaration
    | InferTypeNode
    | IncludeDirective
    | IntersectionTypeNode
    | ParameterDeclaration        
    | ByRefElement
    | EvaluateExpression
    | CatchExpression
    | SpreadElement
    | DefineDirective
    | SuperAccessExpression
    | ParenthesizedExpression
    | ElementAccessExpression
    | RangeExpression
    | PropertyAssignment
    | QualifiedName
    | ComputedPropertyName
    | NewStructExpression
    | StructTypeNode
    | TypeLiteralNode
    | TypeParameterDeclaration
    | StructDeclaration
    | LambdaIdentifierExpression
    | LambdaOperatorExpression    
    | PropertySignature
    | PropertyDeclaration
    | MethodSignature
    | MethodDeclaration    
    | CallSignatureDeclaration    
    | IndexSignatureDeclaration
    | TypePredicateNode
    | TypeReferenceNode
    | FunctionTypeNode    
    // | TypeQueryNode
    | TypeLiteralNode
    // | TupleTypeNode
    // | OptionalTypeNode
    // | RestTypeNode
    | ArrayTypeNode    
    | UnionTypeNode
    | TypeAssertion
    | NamedObjectTypeNode
    // | IntersectionTypeNode
    // | ConditionalTypeNode
    // | InferTypeNode    
    | NamedTupleMember
    | ParenthesizedTypeNode
    // | TypeOperatorNode
    | IndexedAccessTypeNode
    | MappedTypeNode
    | LiteralTypeNode    
    // | ObjectBindingPattern
    | ArrayBindingPattern
    | BindingElement
    | ArrayLiteralExpression
    | MappingLiteralExpression
    | MappingEntryExpression
    | ObjectLiteralExpression
    | PropertyAccessExpression
    | CallExpression
    | NewExpression
    | CloneObjectExpression
    | ElementAccessExpression        
    | TypeAssertion
    | ParenthesizedExpression
    | FunctionExpression
    | InlineClosureExpression
    // | DeleteExpression
    // | TypeOfExpression
    // | VoidExpression
    // | AwaitExpression
    | PrefixUnaryExpression
    | PostfixUnaryExpression
    | BinaryExpression
    | ConditionalExpression    
    // | YieldExpression
    | SpreadElement
    | ClassExpression
    | ExpressionWithTypeArguments
    | CastExpression
    // | NonNullExpression
    // | SatisfiesExpression    
    | Block
    | VariableStatement
    | ExpressionStatement
    | IfStatement
    | DoWhileStatement
    | WhileStatement
    | ForStatement    
    | ForEachStatement    
    | ContinueStatement
    | BreakStatement
    | ReturnStatement
    | SwitchStatement    
    | LabeledStatement
    // | ThrowStatement    
    | VariableDeclaration
    | VariableDeclarationList
    | FunctionDeclaration
    | ClassDeclaration    
    | TypeAliasDeclaration    
    | CaseBlock    
    // | AssertClause
    // | AssertEntry    
    | CaseClause
    | DefaultClause
    | HeritageClause
    | CatchStatement
    | PropertyAssignment
    | ShorthandPropertyAssignment
    // | SpreadAssignment    
    | SourceFile
    | PartiallyEmittedExpression
    | CommaListExpression;
    ;

export interface NodeArray<T extends Node> extends ReadonlyArray<T>, ReadonlyTextRange {
    readonly hasTrailingComma: boolean;
    /** @internal */ transformFlags: TransformFlags; // Flags for transforms, possibly undefined    
    readonly isComplete?: boolean;
}

/** @internal */
export interface MutableNodeArray<T extends Node> extends Array<T>, TextRange {
    hasTrailingComma: boolean;
    /** @internal */ transformFlags: TransformFlags; // Flags for transforms, possibly undefined
    isComplete?: boolean;
}

// TODO(rbuckton): Constraint 'TKind' to 'TokenSyntaxKind'
export interface Token<TKind extends SyntaxKind> extends Node {
    readonly kind: TKind;
}

export type EndOfFileToken = Token<SyntaxKind.EndOfFileToken> & JSDocContainer;

export type DirectiveSyntaxKind =     
    | SyntaxKind.IncludeDirective
    | SyntaxKind.DefineDirective
    | SyntaxKind.UndefDirective
    | SyntaxKind.IfDirective
    | SyntaxKind.IfDefDirective
    | SyntaxKind.IfNDefDirective
    | SyntaxKind.ElseDirective
    | SyntaxKind.ElseIfDirective
    | SyntaxKind.EndIfDirective
    | SyntaxKind.PragmaDirective;
    
export type StructKeywordSyntaxKind = 
    | SyntaxKind.StructKeyword
    | SyntaxKind.ClassKeyword;

export type KeywordSyntaxKind =
    | SyntaxKind.AnyKeyword    
    | SyntaxKind.TrueKeyword
    | SyntaxKind.FalseKeyword
    | SyntaxKind.FunctionsKeyword
    | SyntaxKind.VirtualKeyword
    | SyntaxKind.IsKeyword
    | SyntaxKind.RefKeyword
    | SyntaxKind.StatusKeyword
    | SyntaxKind.BytesKeyword
    | SyntaxKind.LwObjectKeyword
    | SyntaxKind.CatchKeyword
    | SyntaxKind.ClosureKeyword
    | SyntaxKind.SymbolKeyword
    | SyntaxKind.BufferKeyword
    | SyntaxKind.ClassKeyword   
    | SyntaxKind.CaseKeyword
    | SyntaxKind.ClosureKeyword
    | SyntaxKind.DefaultKeyword
    | SyntaxKind.UndefinedKeyword
    | SyntaxKind.BreakKeyword
    | SyntaxKind.VoidKeyword
    | SyntaxKind.ContinueKeyword
    | SyntaxKind.DoKeyword
    | SyntaxKind.ElseKeyword
    | SyntaxKind.ForKeyword
    | SyntaxKind.ForEachKeyword
    | SyntaxKind.FunctionKeyword
    | SyntaxKind.IfKeyword
    | SyntaxKind.InKeyword
    | SyntaxKind.InheritKeyword
    | SyntaxKind.NewKeyword
    | SyntaxKind.NullKeyword
    | SyntaxKind.NeverKeyword
    | SyntaxKind.ReturnKeyword
    | SyntaxKind.SwitchKeyword
    | SyntaxKind.WhileKeyword
    | SyntaxKind.AsyncKeyword
    | SyntaxKind.IntrinsicKeyword
    | SyntaxKind.PrivateKeyword
    | SyntaxKind.ProtectedKeyword
    | SyntaxKind.PublicKeyword
    | SyntaxKind.StaticKeyword
    | SyntaxKind.VisibleKeyword
    | SyntaxKind.NoSaveKeyword
    | SyntaxKind.NoShadowKeyword
    | SyntaxKind.NoMaskKeyword
    | SyntaxKind.VarArgsKeyword
    | SyntaxKind.DeprecatedKeyword
    | SyntaxKind.IntKeyword
    | SyntaxKind.ObjectKeyword
    | SyntaxKind.StringKeyword
    | SyntaxKind.FloatKeyword
    | SyntaxKind.MixedKeyword
    | SyntaxKind.MappingKeyword
    | SyntaxKind.StructKeyword
    | SyntaxKind.UnknownKeyword
    ;

export type ModifierSyntaxKind =
    | SyntaxKind.PrivateKeyword
    | SyntaxKind.ProtectedKeyword
    | SyntaxKind.PublicKeyword
    | SyntaxKind.StaticKeyword
    | SyntaxKind.VisibleKeyword
    | SyntaxKind.NoSaveKeyword
    | SyntaxKind.NoShadowKeyword
    | SyntaxKind.NoMaskKeyword
    | SyntaxKind.VarArgsKeyword
    | SyntaxKind.DeprecatedKeyword;

export interface KeywordToken<TKind extends KeywordSyntaxKind> extends Token<TKind> {}
export interface KeywordTypeNode<TKind extends KeywordTypeSyntaxKind = KeywordTypeSyntaxKind> extends KeywordToken<TKind>, TypeNode {
    readonly kind: TKind;
}

export type CaseKeyword = KeywordToken<SyntaxKind.CaseKeyword>;
export type RefToken = KeywordToken<SyntaxKind.RefKeyword>;

export interface ModifierToken<TKind extends ModifierSyntaxKind> extends KeywordToken<TKind> {}
export type PrivateKeyword = ModifierToken<SyntaxKind.PrivateKeyword>;
export type ProtectedKeyword = ModifierToken<SyntaxKind.ProtectedKeyword>;
export type PublicKeyword = ModifierToken<SyntaxKind.PublicKeyword>;
export type StaticKeyword = ModifierToken<SyntaxKind.StaticKeyword>;
export type VisibleKeyword = ModifierToken<SyntaxKind.VisibleKeyword>;
export type NoSaveKeyword = ModifierToken<SyntaxKind.NoSaveKeyword>;
export type NoShadowKeyword = ModifierToken<SyntaxKind.NoShadowKeyword>;
export type NoMaskKeyword = ModifierToken<SyntaxKind.NoMaskKeyword>;
export type VarArgsKeyword = ModifierToken<SyntaxKind.VarArgsKeyword>;
export type DeprecatedKeyword = ModifierToken<SyntaxKind.DeprecatedKeyword>;

export type Modifier =
    | PrivateKeyword
    | ProtectedKeyword
    | PublicKeyword
    | StaticKeyword
    | VisibleKeyword
    | NoSaveKeyword
    | NoShadowKeyword
    | NoMaskKeyword
    | VarArgsKeyword
    | DeprecatedKeyword;

/** 
 * @deprecated for easy portion of typescript code - use Modifier
 */
export type ModifierLike = Modifier;// | Decorator;

export type PunctuationSyntaxKind =
    | SyntaxKind.OpenParenBracketToken
    | SyntaxKind.OpenParenAsteriskToken
    | SyntaxKind.LambdaToken
    | SyntaxKind.OpenParenBraceToken
    | SyntaxKind.OpenBraceToken    
    | SyntaxKind.CloseBraceToken
    | SyntaxKind.OpenParenToken
    | SyntaxKind.CloseParenToken
    | SyntaxKind.OpenParenColonToken
    | SyntaxKind.ColonCloseParenToken
    | SyntaxKind.OpenBracketToken
    | SyntaxKind.CloseBracketToken
    | SyntaxKind.DotToken
    | SyntaxKind.DotDotDotToken
    | SyntaxKind.SemicolonToken
    | SyntaxKind.CommaToken
    | SyntaxKind.QuestionDotToken
    | SyntaxKind.LessThanToken
    | SyntaxKind.LessThanSlashToken
    | SyntaxKind.GreaterThanToken
    | SyntaxKind.LessThanEqualsToken
    | SyntaxKind.GreaterThanEqualsToken
    | SyntaxKind.EqualsEqualsToken
    | SyntaxKind.ExclamationEqualsToken
    | SyntaxKind.EqualsEqualsEqualsToken
    | SyntaxKind.ExclamationEqualsEqualsToken
    | SyntaxKind.EqualsGreaterThanToken
    | SyntaxKind.MinusGreaterThanToken
    | SyntaxKind.PlusToken
    | SyntaxKind.MinusToken
    | SyntaxKind.AsteriskToken
    | SyntaxKind.AsteriskAsteriskToken
    | SyntaxKind.SlashToken
    | SyntaxKind.PercentToken
    | SyntaxKind.PlusPlusToken
    | SyntaxKind.MinusMinusToken
    | SyntaxKind.LessThanLessThanToken
    | SyntaxKind.GreaterThanGreaterThanToken
    | SyntaxKind.GreaterThanGreaterThanGreaterThanToken
    | SyntaxKind.AmpersandToken
    | SyntaxKind.BarToken
    | SyntaxKind.CaretToken
    | SyntaxKind.ExclamationToken
    | SyntaxKind.DoubleExclamationToken
    | SyntaxKind.TildeToken
    | SyntaxKind.AmpersandAmpersandToken    
    | SyntaxKind.BarBarToken
    | SyntaxKind.BarBarEqualsToken
    | SyntaxKind.QuestionToken
    | SyntaxKind.ColonToken
    | SyntaxKind.AtToken
    | SyntaxKind.AtAtToken
    | SyntaxKind.EqualsToken
    | SyntaxKind.PlusEqualsToken
    | SyntaxKind.MinusEqualsToken
    | SyntaxKind.AsteriskEqualsToken
    | SyntaxKind.AsteriskAsteriskEqualsToken
    | SyntaxKind.SlashEqualsToken
    | SyntaxKind.PercentEqualsToken
    | SyntaxKind.LessThanLessThanEqualsToken
    | SyntaxKind.GreaterThanGreaterThanEqualsToken
    | SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken
    | SyntaxKind.AmpersandEqualsToken
    | SyntaxKind.BarEqualsToken
    | SyntaxKind.ColonToken
    | SyntaxKind.CaretEqualsToken;

/** @internal */
export type PunctuationOrKeywordSyntaxKind = PunctuationSyntaxKind | KeywordSyntaxKind | DirectiveSyntaxKind | SyntaxKind.NewLineTrivia;

export type ExponentiationOperator = SyntaxKind.AsteriskAsteriskToken;

export type MultiplicativeOperator =
    | SyntaxKind.AsteriskToken
    | SyntaxKind.SlashToken
    | SyntaxKind.PercentToken;

export type MultiplicativeOperatorOrHigher =
    | ExponentiationOperator
    | MultiplicativeOperator;

export type AdditiveOperator = SyntaxKind.PlusToken | SyntaxKind.MinusToken;

export type AdditiveOperatorOrHigher =
    | MultiplicativeOperatorOrHigher
    | AdditiveOperator;

export type ShiftOperator =
    | SyntaxKind.LessThanLessThanToken
    | SyntaxKind.GreaterThanGreaterThanToken
    | SyntaxKind.GreaterThanGreaterThanGreaterThanToken;

export type ShiftOperatorOrHigher = AdditiveOperatorOrHigher | ShiftOperator;

export type RelationalOperator =
    | SyntaxKind.LessThanToken
    | SyntaxKind.LessThanEqualsToken
    | SyntaxKind.GreaterThanToken
    | SyntaxKind.GreaterThanEqualsToken
    | SyntaxKind.InKeyword;

export type RelationalOperatorOrHigher = ShiftOperatorOrHigher | RelationalOperator;
export type EqualityOperator =
    | SyntaxKind.EqualsEqualsToken
    | SyntaxKind.EqualsEqualsEqualsToken
    | SyntaxKind.ExclamationEqualsEqualsToken
    | SyntaxKind.ExclamationEqualsToken;

export type EqualityOperatorOrHigher = RelationalOperatorOrHigher | EqualityOperator;
export type BitwiseOperator = SyntaxKind.AmpersandToken | SyntaxKind.BarToken | SyntaxKind.CaretToken;
export type BitwiseOperatorOrHigher = EqualityOperatorOrHigher | BitwiseOperator;
export type LogicalOperator = SyntaxKind.AmpersandAmpersandToken | SyntaxKind.BarBarToken;
export type LogicalOperatorOrHigher = BitwiseOperatorOrHigher | LogicalOperator;

export type CompoundAssignmentOperator =
    | SyntaxKind.PlusEqualsToken
    | SyntaxKind.MinusEqualsToken
    | SyntaxKind.AsteriskAsteriskEqualsToken
    | SyntaxKind.AsteriskEqualsToken
    | SyntaxKind.SlashEqualsToken
    | SyntaxKind.PercentEqualsToken
    | SyntaxKind.AmpersandEqualsToken
    | SyntaxKind.BarEqualsToken
    | SyntaxKind.CaretEqualsToken
    | SyntaxKind.LessThanLessThanEqualsToken
    | SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken
    | SyntaxKind.GreaterThanGreaterThanEqualsToken
    | SyntaxKind.BarBarEqualsToken
    ;

export type AssignmentOperator = | SyntaxKind.EqualsToken | CompoundAssignmentOperator;

export type AssignmentOperatorOrHigher = | LogicalOperatorOrHigher | AssignmentOperator;
export type BinaryOperator = AssignmentOperatorOrHigher | SyntaxKind.CommaToken;
export type BinaryOperatorToken = Token<BinaryOperator>;

export type LogicalOrCoalescingAssignmentOperator = SyntaxKind.BarBarEqualsToken;

export type LambdaOperatorToken = Token<PunctuationSyntaxKind>;

// Punctuation
export interface PunctuationToken<TKind extends PunctuationSyntaxKind> extends Token<TKind> {}
export type DotToken = PunctuationToken<SyntaxKind.DotToken>;
export type AmpersandToken = PunctuationToken<SyntaxKind.AmpersandToken>;
export type DotDotDotToken = PunctuationToken<SyntaxKind.DotDotDotToken>;

export type QuestionToken = PunctuationToken<SyntaxKind.QuestionToken>;
export type ExclamationToken = PunctuationToken<SyntaxKind.ExclamationToken>;
export type DoubleExclamationToken = PunctuationToken<SyntaxKind.DoubleExclamationToken>;
export type ColonToken = PunctuationToken<SyntaxKind.ColonToken>;
export type EqualsToken = PunctuationToken<SyntaxKind.EqualsToken>;
export type BarBarEqualsToken = PunctuationToken<SyntaxKind.BarBarEqualsToken>;
export type AsteriskToken = PunctuationToken<SyntaxKind.AsteriskToken>;
export type EqualsGreaterThanToken = PunctuationToken<SyntaxKind.EqualsGreaterThanToken>;
export type MinusGreaterThanToken = PunctuationToken<SyntaxKind.MinusGreaterThanToken>;
export type PlusToken = PunctuationToken<SyntaxKind.PlusToken>;
export type MinusToken = PunctuationToken<SyntaxKind.MinusToken>;

export type PropertyAccessToken = DotToken | MinusGreaterThanToken;

export type JSDocImportCandidateNode = 
    | JSDocParameterTag
    | JSDocTypeTag
    | JSDocTypedefTag
    | JSDocVariableTag
    | JSDocPropertyTag
    | JSDocReturnTag
    ;

export type JSDocSyntaxKind =
    | SyntaxKind.EndOfFileToken
    | SyntaxKind.WhitespaceTrivia
    | SyntaxKind.AtToken
    | SyntaxKind.NewLineTrivia
    | SyntaxKind.AsteriskToken
    | SyntaxKind.OpenBraceToken
    | SyntaxKind.CloseBraceToken
    | SyntaxKind.LessThanToken
    | SyntaxKind.GreaterThanToken
    | SyntaxKind.OpenBracketToken
    | SyntaxKind.CloseBracketToken
    | SyntaxKind.OpenParenToken
    | SyntaxKind.CloseParenToken
    | SyntaxKind.EqualsToken
    | SyntaxKind.CommaToken
    | SyntaxKind.DotToken
    | SyntaxKind.Identifier    
    | SyntaxKind.BacktickToken
    | SyntaxKind.HashToken
    | SyntaxKind.Unknown
    | KeywordSyntaxKind;

export interface ConditionalExpression extends Expression {
    readonly kind: SyntaxKind.ConditionalExpression;
    readonly condition: Expression;
    readonly questionToken: QuestionToken;
    readonly whenTrue: Expression;
    readonly colonToken: ColonToken;
    readonly whenFalse: Expression;
}

/** @internal */
export type FlowNode = 
    | FlowUnreachable
    | FlowStart
    | FlowLabel
    | FlowAssignment
    | FlowCondition
    | FlowSwitchClause
    | FlowArrayMutation
    | FlowCall;

    
// FlowStart represents the start of a control flow. For a function expression or arrow
// function, the node property references the function (which in turn has a flowNode
// property for the containing control flow).
/** @internal */
export interface FlowStart extends FlowNodeBase {
    node: FunctionExpression | ArrowFunction | InlineClosureExpression | MethodDeclaration | FunctionDeclaration | undefined;
    antecedent: undefined;
}

/** @internal */
export interface FlowUnreachable extends FlowNodeBase {
    node: undefined;
    antecedent: undefined;
}

/** @internal */
export interface FlowCall extends FlowNodeBase {
    node: CallExpression;
    antecedent: FlowNode;
}


// FlowAssignment represents a node that assigns a value to a narrowable reference,
// i.e. an identifier or a dotted name that starts with an identifier or 'this'.
/** @internal */
export interface FlowAssignment extends FlowNodeBase {
    node: Expression | VariableDeclaration | BindingElement;
    antecedent: FlowNode;
}

// FlowCondition represents a condition that is known to be true or false at the
// node's location in the control flow.
/** @internal */
export interface FlowCondition extends FlowNodeBase {
    node: Expression;
    antecedent: FlowNode;
}




export interface FlowContainer extends Node {
    _flowContainerBrand: any;
    /** @internal */ flowNode?: FlowNode; // Associated FlowNode (initialized by binding)
}

// NOTE: Ensure this is up-to-date with src/debug/debug.ts
// dprint-ignore
/** @internal */
export const enum FlowFlags {
    Unreachable    = 1 << 0,  // Unreachable code
    Start          = 1 << 1,  // Start of flow graph
    BranchLabel    = 1 << 2,  // Non-looping junction
    LoopLabel      = 1 << 3,  // Looping junction
    Assignment     = 1 << 4,  // Assignment
    TrueCondition  = 1 << 5,  // Condition known to be true
    FalseCondition = 1 << 6,  // Condition known to be false
    SwitchClause   = 1 << 7,  // Switch statement clause
    ArrayMutation  = 1 << 8,  // Potential array mutation
    Call           = 1 << 9,  // Potential assertion call
    ReduceLabel    = 1 << 10, // Temporarily reduce antecedents of label
    Referenced     = 1 << 11, // Referenced as antecedent once
    Shared         = 1 << 12, // Referenced as antecedent more than once

    Label = BranchLabel | LoopLabel,
    Condition = TrueCondition | FalseCondition,
}

/** @internal */
export interface FlowNodeBase {
    flags: FlowFlags;
    id: number; // Node id used by flow type cache in checker
    node: unknown; // Node or other data
    antecedent: FlowNode | FlowNode[] | undefined;
}


// FlowLabel represents a junction with multiple possible preceding control flows.
/** @internal */
export interface FlowLabel extends FlowNodeBase {
    node: undefined;
    antecedent: FlowNode[] | undefined;
}

/** @internal */
export interface FlowSwitchClause extends FlowNodeBase {
    node: FlowSwitchClauseData;
    antecedent: FlowNode;
}

/** @internal */
export interface FlowSwitchClauseData {
    switchStatement: SwitchStatement;
    clauseStart: number; // Start index of case/default clause range
    clauseEnd: number; // End index of case/default clause range
}

// FlowArrayMutation represents a node potentially mutates an array, i.e. an
// operation of the form 'x.push(value)', 'x.unshift(value)' or 'x[n] = value'.
/** @internal */
export interface FlowArrayMutation extends FlowNodeBase {
    node: CallExpression | BinaryExpression;
    antecedent: FlowNode;
}

/** @internal */
export interface FlowReduceLabel extends FlowNodeBase {
    node: FlowReduceLabelData;
    antecedent: FlowNode;
}

/** @internal */
export interface FlowReduceLabelData {
    target: FlowLabel;
    antecedents: FlowNode[];
}

export type FlowType = Type | IncompleteType;

// Incomplete types occur during control flow analysis of loops. An IncompleteType
// is distinguished from a regular type by a flags value of zero. Incomplete type
// objects are internal to the getFlowTypeOfReference function and never escape it.
// dprint-ignore
export interface IncompleteType {
    flags: TypeFlags | 0;  // No flags set
    type: Type;            // The type marked incomplete
}

// dprint-ignore
/** @internal */
export const enum CharacterCodes {
    EOF = -1,
    nullCharacter = 0,
    maxAsciiCharacter = 0x7F,

    lineFeed = 0x0A,              // \n
    carriageReturn = 0x0D,        // \r
    lineSeparator = 0x2028,
    paragraphSeparator = 0x2029,
    nextLine = 0x0085,

    // Unicode 3.0 space characters
    space = 0x0020,   // " "
    nonBreakingSpace = 0x00A0,   //
    enQuad = 0x2000,
    emQuad = 0x2001,
    enSpace = 0x2002,
    emSpace = 0x2003,
    threePerEmSpace = 0x2004,
    fourPerEmSpace = 0x2005,
    sixPerEmSpace = 0x2006,
    figureSpace = 0x2007,
    punctuationSpace = 0x2008,
    thinSpace = 0x2009,
    hairSpace = 0x200A,
    zeroWidthSpace = 0x200B,
    narrowNoBreakSpace = 0x202F,
    ideographicSpace = 0x3000,
    mathematicalSpace = 0x205F,
    ogham = 0x1680,

    // Unicode replacement character produced when a byte sequence is invalid
    replacementCharacter = 0xFFFD,

    _ = 0x5F,
    $ = 0x24,

    _0 = 0x30,
    _1 = 0x31,
    _2 = 0x32,
    _3 = 0x33,
    _4 = 0x34,
    _5 = 0x35,
    _6 = 0x36,
    _7 = 0x37,
    _8 = 0x38,
    _9 = 0x39,

    a = 0x61,
    b = 0x62,
    c = 0x63,
    d = 0x64,
    e = 0x65,
    f = 0x66,
    g = 0x67,
    h = 0x68,
    i = 0x69,
    j = 0x6A,
    k = 0x6B,
    l = 0x6C,
    m = 0x6D,
    n = 0x6E,
    o = 0x6F,
    p = 0x70,
    q = 0x71,
    r = 0x72,
    s = 0x73,
    t = 0x74,
    u = 0x75,
    v = 0x76,
    w = 0x77,
    x = 0x78,
    y = 0x79,
    z = 0x7A,

    A = 0x41,
    B = 0x42,
    C = 0x43,
    D = 0x44,
    E = 0x45,
    F = 0x46,
    G = 0x47,
    H = 0x48,
    I = 0x49,
    J = 0x4A,
    K = 0x4B,
    L = 0x4C,
    M = 0x4D,
    N = 0x4E,
    O = 0x4F,
    P = 0x50,
    Q = 0x51,
    R = 0x52,
    S = 0x53,
    T = 0x54,
    U = 0x55,
    V = 0x56,
    W = 0x57,
    X = 0x58,
    Y = 0x59,
    Z = 0x5a,

    ampersand = 0x26,             // &
    asterisk = 0x2A,              // *
    at = 0x40,                    // @
    backslash = 0x5C,             // \
    backtick = 0x60,              // `
    bar = 0x7C,                   // |
    caret = 0x5E,                 // ^
    closeBrace = 0x7D,            // }
    closeBracket = 0x5D,          // ]
    closeParen = 0x29,            // )
    colon = 0x3A,                 // :
    comma = 0x2C,                 // ,
    dot = 0x2E,                   // .
    doubleQuote = 0x22,           // "
    equals = 0x3D,                // =
    exclamation = 0x21,           // !
    greaterThan = 0x3E,           // >
    hash = 0x23,                  // #
    lessThan = 0x3C,              // <
    minus = 0x2D,                 // -
    openBrace = 0x7B,             // {
    openBracket = 0x5B,           // [
    openParen = 0x28,             // (
    percent = 0x25,               // %
    plus = 0x2B,                  // +
    question = 0x3F,              // ?
    semicolon = 0x3B,             // ;
    singleQuote = 0x27,           // '
    slash = 0x2F,                 // /
    tilde = 0x7E,                 // ~

    backspace = 0x08,             // \b
    formFeed = 0x0C,              // \f
    byteOrderMark = 0xFEFF,
    tab = 0x09,                   // \t
    verticalTab = 0x0B,           // \v
}


export interface LineAndCharacter {
    /** 0-based. */
    line: number;
    /*
     * 0-based. This value denotes the character position in line and is different from the 'column' because of tab characters.
     */
    character: number;
}

/**
 * Subset of properties from SourceFile that are used in multiple utility functions
 */
export interface SourceFileLike {
    readonly text: string;
    readonly fileName: string;
    
    /** @internal */ inactiveCodeRanges?: readonly TextRange[];
    /** @internal */ lineMap?: readonly number[];
    /** @internal */ getPositionOfLineAndCharacter?(line: number, character: number, allowEdits?: true): number;            
}

export type SourceFileBaseSyntaxKind = SyntaxKind.SourceFile | SyntaxKind.IncludeDirective;

export interface SourceFileBase {
    readonly kind: SourceFileBaseSyntaxKind;
    readonly text: string;
    readonly fileName: string;

    /** @internal */ path: Path;
    /** @internal */ inactiveCodeRanges?: readonly TextRange[];
    /** @internal */ lineMap?: readonly number[];
    /** @internal */ getPositionOfLineAndCharacter?(line: number, character: number, allowEdits?: true): number;            

    // File-level diagnostics reported by the parser (includes diagnostics about /// references
    // as well as code diagnostics).
    /** @internal */ parseDiagnostics: DiagnosticWithLocation[];    

    languageVersion: ScriptTarget;
    languageVariant: LanguageVariant;
}

export interface HasHeritageContainer {
    _hasHeritageBrand: any;
    heritageClauses?: NodeArray<InheritDeclaration>;
}

/** @internal */
export interface PragmaContext extends ReadonlyPragmaContext {
    pragmas?: PragmaMap;
    referencedFiles: FileReference[];
    typeReferenceDirectives: FileReference[];
    libReferenceDirectives: FileReference[];    
}


// Source files are declarations when they are external modules.
export interface SourceFile extends Declaration, LocalsContainer, HasHeritageContainer, SourceFileBase {
    readonly kind: SyntaxKind.SourceFile;
    readonly statements: NodeArray<Statement>;
    readonly endOfFileToken: Token<SyntaxKind.EndOfFileToken>;

    fileName: string;
    /** @internal */ path: Path;
    text: string;
    /** Resolved path can be different from path property,
     * when file is included through project reference is mapped to its output instead of source
     * in that case resolvedPath = path to output file
     * path = input file's path
     *
     * @internal
     */
    resolvedPath: Path;
    /** Original file name that can be different from fileName,
     * when file is included through project reference is mapped to its output instead of source
     * in that case originalFileName = name of input file
     * fileName = output file's name
     *
     * @internal
     */
    originalFileName: string;

    /**
     * If two source files are for the same version of the same package, one will redirect to the other.
     * (See `createRedirectSourceFile` in program.ts.)
     * The redirect will have this set. The redirected-to source file will be in `redirectTargetsMap`.
     *
     * @internal
     */
    //redirectInfo?: RedirectInfo;
    
    /** @internal */ scriptKind: ScriptKind;
    
    referencedFiles: readonly FileReference[];    
    libReferenceDirectives: readonly FileReference[];
    isDeclarationFile: boolean;
    isDefaultLib: boolean;

    // this map is used by transpiler to supply alternative names for dependencies (i.e. in case of bundling)
    /** @internal */
    renamedDependencies?: ReadonlyMap<string, string>;
  
    /**
     * The first "most obvious" node that makes a file an external module.
     * This is intended to be the first top-level import/export,
     * but could be arbitrarily nested (e.g. `import.meta`).
     *
     * @internal
     */
    externalModuleIndicator?: Node | true;
    /**
     * The callback used to set the external module indicator - this is saved to
     * be later reused during incremental reparsing, which otherwise lacks the information
     * to set this field
     *
     * @internal
     */
    setExternalModuleIndicator?: (file: SourceFile) => void;
    // The first node that causes this file to be a CommonJS module
    

    /** @internal */ identifiers: ReadonlyMap<string, string>; // Map from a string to an interned string
    /** @internal */ nodeCount: number;
    /** @internal */ identifierCount: number;
    /** @internal */ symbolCount: number;

    // File-level diagnostics reported by the parser (includes diagnostics about /// references
    // as well as code diagnostics).
    /** @internal */ parseDiagnostics: DiagnosticWithLocation[];    

    // // File-level diagnostics reported by the binder.
    /** @internal */ bindDiagnostics: DiagnosticWithLocation[];
    /** @internal */ bindSuggestionDiagnostics?: DiagnosticWithLocation[];

    // File-level JSDoc diagnostics reported by the JSDoc parser
    /** @internal */ jsDocDiagnostics?: DiagnosticWithLocation[];

    // // Stores additional file-level diagnostics reported by the program
    // /** @internal */ additionalSyntacticDiagnostics?: readonly DiagnosticWithLocation[];

    // Stores a line map for the file.
    // This field should never be used directly to obtain line map, use getLineMap function instead.
    /** @internal */ lineMap: readonly number[];
    /** @internal */ classifiableNames?: ReadonlySet<string>;
    // Comments containing @lpc-* directives, in order.
    /** @internal */ commentDirectives?: CommentDirective[];
    /** @internal */ imports: readonly StringLiteral[];    
    /** @internal */ importCandidates?: readonly ImportCandidateNode[];
    /** @internal */ ambientModuleNames: readonly string[];    
    /** @internal */ version: string;
    /** @internal */ pragmas: ReadonlyPragmaMap;    

    /** @internal */ endFlowNode?: FlowNode;

    /** @internal */ jsDocParsingMode?: JSDocParsingMode;

    languageVersion: ScriptTarget;
    languageVariant: LanguageVariant;

    /**
     * When `module` is `Node16` or `NodeNext`, this field controls whether the
     * source file in question is an ESNext-output-format file, or a CommonJS-output-format
     * module. This is derived by the module resolver as it looks up the file, since
     * it is derived from either the file extension of the module, or the containing
     * `package.json` context, and affects both checking and emit.
     *
     * It is _public_ so that (pre)transformers can set this field,
     * since it switches the builtin `node` module transform. Generally speaking, if unset,
     * the field is treated as though it is `ModuleKind.CommonJS`.
     *
     * Note that this field is only set by the module resolution process when
     * `moduleResolution` is `Node16` or `NodeNext`, which is implied by the `module` setting
     * of `Node16` or `NodeNext`, respectively, but may be overriden (eg, by a `moduleResolution`
     * of `node`). If so, this field will be unset and source files will be considered to be
     * CommonJS-output-format by the node module transformer and type checker, regardless of extension or context.
     */
    impliedNodeFormat?: ResolutionMode;

    /**
     * Array of text ranges that are inactive due to directives
     */
    inactiveCodeRanges?: readonly TextRange[];

    /** Macros that were parsed in this source file (and any includes) */
    parsedMacros?: ReadonlyMap<string, string>;

    /** When a node is parsed as a result of a macro expansion, a link from the node 
     * to the original macro definition is stored here. */     
    nodeMacroMap?: ReadonlyMap<Node, string>;
}

export interface JsonSourceFile extends SourceFile {
    readonly statements: NodeArray<JsonObjectExpressionStatement>;
}


export type JsonObjectExpression =
    | ObjectLiteralExpression
    | ArrayLiteralExpression
    | JsonMinusNumericLiteral
    | NumericLiteral
    | StringLiteral
    | BooleanLiteral
    | NullLiteral;

export interface JsonMinusNumericLiteral extends PrefixUnaryExpression {
    readonly kind: SyntaxKind.PrefixUnaryExpression;
    readonly operator: SyntaxKind.MinusToken;
    readonly operand: NumericLiteral;
}

/**
 * JSON-only
 */
export interface NumericLiteral extends LiteralExpression, Declaration {
    readonly kind: SyntaxKind.NumericLiteral;
    /** @internal */
    readonly numericLiteralFlags: TokenFlags;
}

/**
 * JSON only
 */
export interface NullLiteral extends PrimaryExpression {
    readonly kind: SyntaxKind.NullKeyword;
}


    
export interface JsonObjectExpressionStatement extends ExpressionStatement {
    readonly expression: JsonObjectExpression;
}

export interface CheckLpcDirective extends TextRange {
    enabled: boolean;
}


/** @internal */
export interface ReadonlyPragmaContext {
    languageVersion: ScriptTarget;
    pragmas?: ReadonlyPragmaMap;
    checkLpcDirective: CheckLpcDirective;    
    referencedFiles: readonly FileReference[];
    typeReferenceDirectives: readonly FileReference[];
    libReferenceDirectives: readonly FileReference[];
    //amdDependencies: readonly AmdDependency[];
    hasNoDefaultLib?: boolean;
    moduleName?: string;
}


export type CommentKind = SyntaxKind.SingleLineCommentTrivia | SyntaxKind.MultiLineCommentTrivia;

export interface CommentRange extends TextRange {
    hasTrailingNewLine?: boolean;
    kind: CommentKind;
}


/** @internal */
export interface SourceFile extends ReadonlyPragmaContext {}

export interface FileReference extends TextRange {
    fileName: string;    
    preserve?: boolean;
}

// The text property of a LiteralExpression stores the interpreted value of the literal in text form. For a StringLiteral,
// or any literal of a template, this means quotes have been removed and escapes have been converted to actual characters.
// For a NumericLiteral, the stored value is the toString() representation of the number. For example 1, 1.00, and 1e0 are all stored as just "1".
export interface LiteralLikeNode extends Node {
    text: string;
    isUnterminated?: boolean;
    hasExtendedUnicodeEscape?: boolean;
}

export type ImportCandidateNode = 
    CloneObjectExpression |
    PropertyAccessExpression | 
    NewExpression | 
    InheritDeclaration | 
    IncludeDirective |
    CallExpression |
    NamedObjectTypeNode |
    JSDocParameterTag |
    JSDocTypeTag | 
    JSDocTypedefTag |
    JSDocPropertyTag |
    JSDocVariableTag |
    JSDocReturnTag
    ;

export const enum TokenFlags {
    None = 0,
    /** @internal */
    PrecedingLineBreak = 1 << 0,
    /** @internal */
    PrecedingJSDocComment = 1 << 1,
    /** @internal */
    Unterminated = 1 << 2,
    /** @internal */
    ExtendedUnicodeEscape = 1 << 3,     // e.g. `\u{10ffff}`
    Scientific = 1 << 4,                // e.g. `10e2`
    Octal = 1 << 5,                     // e.g. `0777`
    HexSpecifier = 1 << 6,              // e.g. `0x00000000`
    BinarySpecifier = 1 << 7,           // e.g. `0b0110010000000000`
    OctalSpecifier = 1 << 8,            // e.g. `0o777`
    /** @internal */
    ContainsSeparator = 1 << 9,         // e.g. `0b1100_0101`
    /** @internal */
    UnicodeEscape = 1 << 10,            // e.g. `\u00a0`
    /** @internal */
    ContainsInvalidEscape = 1 << 11,    // e.g. `\uhello`
    /** @internal */
    HexEscape = 1 << 12,                // e.g. `\xa0`
    /** @internal */
    ContainsLeadingZero = 1 << 13,      // e.g. `0888`
    /** @internal */
    ContainsInvalidSeparator = 1 << 14, // e.g. `0_1`
    /** @internal */
    Char = 1 << 15,                     // e.g. `'c'` which LPC treats as an integer
    /** @internal */
    BinaryOrOctalSpecifier = BinarySpecifier | OctalSpecifier,
    /** @internal */
    WithSpecifier = HexSpecifier | BinaryOrOctalSpecifier,
    /** @internal */
    StringLiteralFlags = HexEscape | UnicodeEscape | ExtendedUnicodeEscape | ContainsInvalidEscape,
    /** @internal */
    NumericLiteralFlags = Scientific | Octal | Char | ContainsLeadingZero | WithSpecifier | ContainsSeparator | ContainsInvalidSeparator,
    /** @internal */
    TemplateLiteralLikeFlags = HexEscape | UnicodeEscape | ExtendedUnicodeEscape | ContainsInvalidEscape,
    /** @internal */
    IsInvalid = Octal | ContainsLeadingZero | ContainsInvalidSeparator | ContainsInvalidEscape,
}

export const enum SymbolFlags {
    None                    = 0,
    FunctionScopedVariable  = 1 << 0,   // Variable (var) or parameter
    BlockScopedVariable     = 1 << 1,   // A block-scoped variable (let or const)
    Property                = 1 << 2,   // Property or enum member
    EnumMember              = 1 << 3,   // Enum member
    Function                = 1 << 4,   // Function
    Class                   = 1 << 5,   // Class
    Interface               = 1 << 6,   // Interface
    ConstEnum               = 1 << 7,   // Const enum
    RegularEnum             = 1 << 8,   // Enum
    ValueModule             = 1 << 9,   // Instantiated module
    NamespaceModule         = 1 << 10,  // Uninstantiated module
    TypeLiteral             = 1 << 11,  // Type Literal or mapped type
    ObjectLiteral           = 1 << 12,  // Object Literal
    Method                  = 1 << 13,  // Method
    Constructor             = 1 << 14,  // Constructor
    GetAccessor             = 1 << 15,  // Get accessor
    SetAccessor             = 1 << 16,  // Set accessor
    Signature               = 1 << 17,  // Call, construct, or index signature
    TypeParameter           = 1 << 18,  // Type parameter
    TypeAlias               = 1 << 19,  // Type alias
    ExportValue             = 1 << 20,  // Exported value marker (see comment in declareModuleMember in binder)
    Alias                   = 1 << 21,  // An alias for another symbol (see comment in isAliasSymbolDeclaration in checker)
    Prototype               = 1 << 22,  // Prototype property (no source representation)
    FakeGlobal              = 1 << 23,  // A fake symbol created for global type purposes
    Optional                = 1 << 24,  // Optional property
    Transient               = 1 << 25,  // Transient symbol (created during type check)
    Assignment              = 1 << 26,  // Assignment treated as declaration (eg `this.prop = 1`)
    ModuleExports           = 1 << 27,  // Symbol for CommonJS `module` of `module.exports`
    Define                  = 1 << 28,  // Define macro
    All = -1,

    Enum = RegularEnum | ConstEnum,
    Variable = FunctionScopedVariable | BlockScopedVariable,
    Value = Variable | Property | EnumMember | ObjectLiteral | Function | Class | Enum | ValueModule | Method | GetAccessor | SetAccessor,
    ValueOrDefine = Value | Define,
    Type = Class | Interface | Enum | EnumMember | TypeLiteral | TypeParameter | TypeAlias,
    Namespace = ValueModule | NamespaceModule | Enum,
    Module = ValueModule | NamespaceModule,
    Accessor = GetAccessor | SetAccessor,

    // Variables can be redeclared, but can not redeclare a block-scoped declaration with the
    // same name, or any other value that is not a variable, e.g. ValueModule or Class
    FunctionScopedVariableExcludes = Value & ~FunctionScopedVariable,

    // Block-scoped declarations are not allowed to be re-declared
    // they can not merge with anything in the value space
    BlockScopedVariableExcludes = Value | Define,

    ParameterExcludes = Value,
    PropertyExcludes = None,
    EnumMemberExcludes = Value | Type,
    FunctionExcludes = Value & ~(Function | ValueModule | Class),
    DefineExcludes = Value & ~(Define | ValueModule),
    ClassExcludes = (Value | Type) & ~(ValueModule | Interface | Function), // class-interface mergability done in checker.ts
    InterfaceExcludes = Type & ~(Interface | Class),
    RegularEnumExcludes = (Value | Type) & ~(RegularEnum | ValueModule), // regular enums merge only with regular enums and modules
    ConstEnumExcludes = (Value | Type) & ~ConstEnum, // const enums merge only with const enums
    ValueModuleExcludes = Value & ~(Function | Class | RegularEnum | ValueModule),
    NamespaceModuleExcludes = 0,
    MethodExcludes = Value & ~Method,
    GetAccessorExcludes = Value & ~SetAccessor,
    SetAccessorExcludes = Value & ~GetAccessor,
    AccessorExcludes = Value & ~Accessor,
    TypeParameterExcludes = Type & ~TypeParameter,
    TypeAliasExcludes = Type,
    AliasExcludes = Alias,

    ModuleMember = Variable | Function | Class | Interface | Enum | Module | TypeAlias | Alias,

    ExportHasLocal = Function | Class | Enum | ValueModule,

    BlockScoped = BlockScopedVariable | Class | Enum,

    PropertyOrAccessor = Property | Accessor,

    ClassMember = Method | Accessor | Property,

    /** @internal */
    ExportSupportsDefaultModifier = Class | Function | Interface,

    /** @internal */
    ExportDoesNotSupportDefaultModifier = ~ExportSupportsDefaultModifier,

    /** @internal */
    // The set of things we consider semantically classifiable.  Used to speed up the LS during
    // classification.
    Classifiable = Class | Enum | TypeAlias | Interface | TypeParameter | Module | Alias,

    /** @internal */
    LateBindingContainer = Class | Interface | TypeLiteral | ObjectLiteral | Function,
}

// The text property of a LiteralExpression stores the interpreted value of the literal in text form. For a StringLiteral,
// or any literal of a template, this means quotes have been removed and escapes have been converted to actual characters.
// For a NumericLiteral, the stored value is the toString() representation of the number. For example 1, 1.00, and 1e0 are all stored as just "1".
export interface LiteralExpression extends LiteralLikeNode, PrimaryExpression {
    _literalExpressionBrand: any;
}

export interface IntLiteral extends LiteralExpression, Declaration {
    readonly kind: SyntaxKind.IntLiteral;
    /** @internal */
    readonly numericLiteralFlags: TokenFlags;
}

export interface FloatLiteral extends LiteralExpression, Declaration {
    readonly kind: SyntaxKind.FloatLiteral;
    /** @internal */
    readonly numericLiteralFlags: TokenFlags;
}

export type PropertyNameLiteral = Identifier | StringLiteral | IntLiteral ;

export interface StringLiteral extends LiteralExpression, Declaration {
    readonly kind: SyntaxKind.StringLiteral;
    /** @internal */ readonly textSourceNode?: Identifier | StringLiteral | IntLiteral | FloatLiteral;// | JsxNamespacedName; // Allows a StringLiteral to get its text from another node (used by transforms).
    /**
     * Note: this is only set when synthesizing a node, not during parsing.
     *
     * @internal
     */
    readonly singleQuote?: boolean;
}

export interface BytesLiteral extends LiteralExpression, Declaration {
    readonly kind: SyntaxKind.BytesLiteral;
    /** @internal */ readonly textSourceNode?: Identifier | StringLiteral | IntLiteral | FloatLiteral;// | JsxNamespacedName; // Allows a StringLiteral to get its text from another node (used by transforms).
}

export type TriviaSyntaxKind =
    | SyntaxKind.SingleLineCommentTrivia
    | SyntaxKind.MultiLineCommentTrivia
    | SyntaxKind.NewLineTrivia
    | SyntaxKind.WhitespaceTrivia
    | SyntaxKind.ShebangTrivia
    | SyntaxKind.ConflictMarkerTrivia;

export type StringLiteralLike = StringLiteral;

export type LiteralToken = IntLiteral | FloatLiteral | StringLiteral | BytesLiteral;
export type LiteralSyntaxKind =
    | SyntaxKind.IntLiteral
    | SyntaxKind.FloatLiteral
    | SyntaxKind.BytesLiteral
    | SyntaxKind.StringLiteral;

    
export interface TypeNode extends Node {
    _typeNodeBrand: any;
}

/** @internal */
export interface TypeNode extends Node {
    readonly kind: TypeNodeSyntaxKind;
}

export interface UnionTypeNode extends TypeNode {
    readonly kind: SyntaxKind.UnionType;
    readonly types: NodeArray<TypeNode>;
}

export interface IntersectionTypeNode extends TypeNode {
    readonly kind: SyntaxKind.IntersectionType;
    readonly types: NodeArray<TypeNode>;
}

export interface ArrayTypeNode extends TypeNode {
    readonly kind: SyntaxKind.ArrayType;
    readonly elementType: TypeNode;
}

export interface NamedObjectTypeNode extends TypeNode {
    readonly kind: SyntaxKind.NamedObjectType;
    readonly objectKeyword: TypeNode;
    readonly name: StringLiteral | BinaryExpression | ParenthesizedExpression;
}

export interface JSDocContainer extends Node {
    _LpcjsDocContainerBrand: any;
    /** @internal */ jsDoc?: JSDocArray; // JSDoc that directly precedes this node
}

export interface JSDocType extends TypeNode {
    _jsDocTypeBrand: any;
}

/** @internal */
export interface JSDocArray extends Array<JSDoc> {
    jsDocCache?: readonly JSDocTag[]; // Cache for getJSDocTags
}

export type EntityName = Identifier | QualifiedName;

export interface JSDocPropertyLikeTag extends JSDocTag, Declaration {
    readonly parent: JSDoc;
    readonly name: EntityName;
    readonly defaultExpression: Expression | undefined;
    readonly typeExpression?: JSDocTypeExpression;
    /** Whether the property name came before the type -- non-standard for JSDoc, but Typescript-like */
    readonly isNameFirst: boolean;
    readonly isBracketed: boolean;
}

// represents a top level: { type } expression in a JSDoc comment.
export interface JSDocTypeExpression extends TypeNode {
    readonly kind: SyntaxKind.JSDocTypeExpression;
    readonly type: TypeNode;
}

export interface JSDocTypeLiteral extends JSDocType, Declaration {
    readonly kind: SyntaxKind.JSDocTypeLiteral;
    readonly jsDocPropertyTags?: readonly JSDocPropertyLikeTag[];
    /** If true, then this type literal represents an *array* of its type. */
    readonly isArrayType: boolean;
}

export interface JSDocTag extends Node {
    readonly parent: JSDoc | JSDocTypeLiteral;
    readonly tagName: Identifier;
    readonly comment?: string | NodeArray<JSDocComment>;
}

export interface JSDoc extends Node {
    readonly kind: SyntaxKind.JSDoc;
    readonly parent: HasJSDoc;
    readonly tags?: NodeArray<JSDocTag>;
    readonly comment?: string | NodeArray<JSDocComment>;
}

export interface JSDocTypedefTag extends JSDocTag, NamedDeclaration, LocalsContainer {
    readonly kind: SyntaxKind.JSDocTypedefTag;
    readonly parent: JSDoc;
    readonly fullName?: Identifier;
    readonly name?: Identifier;
    readonly typeExpression?: JSDocTypeExpression | JSDocTypeLiteral;
}


export interface JSDocMemberName extends Node {
    readonly kind: SyntaxKind.JSDocMemberName;
    readonly left: EntityName | JSDocMemberName;
    readonly right: Identifier;
}


export interface JSDocText extends Node {
    readonly kind: SyntaxKind.JSDocText;
    text: string;
}

export type JSDocComment = JSDocText | JSDocLink | JSDocLinkCode | JSDocLinkPlain;

export interface Expression extends Node {
    _expressionBrand: any;
}

export interface OmittedExpression extends Expression {
    readonly kind: SyntaxKind.OmittedExpression;
}

export interface CastExpression extends Expression {
    readonly kind: SyntaxKind.CastExpression;
    readonly expression: Expression;
    readonly type: TypeNode;
}

// Represents an expression that is elided as part of a transformation to emit comments on a
// not-emitted node. The 'expression' property of a PartiallyEmittedExpression should be emitted.
export interface PartiallyEmittedExpression extends LeftHandSideExpression {
    readonly kind: SyntaxKind.PartiallyEmittedExpression;
    readonly expression: Expression;
}

export interface TypeAssertion extends UnaryExpression {
    readonly kind: SyntaxKind.TypeAssertionExpression;
    readonly type: TypeNode;
    readonly expression: UnaryExpression;
}


export interface UnaryExpression extends Expression {
    _unaryExpressionBrand: any;
}


export interface UpdateExpression extends UnaryExpression {
    _updateExpressionBrand: any;
}

export interface LeftHandSideExpression extends UpdateExpression {
    _leftHandSideExpressionBrand: any;
}
export interface MemberExpression extends LeftHandSideExpression {
    _memberExpressionBrand: any;
}

export interface PrimaryExpression extends MemberExpression {
    _primaryExpressionBrand: any;
}

export interface Declaration extends Node {
    _declarationBrand: any;
    symbol: Symbol; // symbol declared by node (init by binding)
    /** @internal */ localSymbol?: Symbol; // Local symbol declared by node (initialized by binding only for exported nodes)
}

export interface Identifier extends PrimaryExpression, Declaration, JSDocContainer, FlowContainer {
    readonly kind: SyntaxKind.Identifier;
    readonly text: string;
}

export interface LocalsContainer extends Node {
    _localsContainerBrand: any;
    /** @internal */ locals?: SymbolTable; // Locals associated with node (initialized by binding)
    /** @internal */ nextContainer?: HasLocals; // Next container in declaration order (initialized by binding)
}

export interface Statement extends Node, JSDocContainer {
    _statementBrand: any;
}

export interface Block extends Statement, LocalsContainer {
    readonly kind: SyntaxKind.Block;
    readonly statements: NodeArray<Statement>;
    /** @internal */ multiLine?: boolean;
}

export interface CatchStatement extends Statement, LocalsContainer {
    readonly kind: SyntaxKind.CatchStatement;
    readonly parent: Block;
    readonly expression?: Expression;
    readonly block: Block;
    readonly modifier?: Identifier;
    readonly modifierExpression?: Expression;
}

export interface CatchExpression extends PrimaryExpression {
    readonly kind: SyntaxKind.CatchExpression;
    readonly expression?: Expression;
    readonly modifier?: Identifier;
    readonly modifierExpression?: Expression;
    readonly block?: Block;    
}

export interface NamedDeclaration extends Declaration {
    readonly name?: DeclarationName;
}

export type BindingName = Identifier | BindingPattern;
export interface VariableDeclaration extends NamedDeclaration, JSDocContainer, PrimaryExpression {
    readonly kind: SyntaxKind.VariableDeclaration;
    readonly parent: VariableDeclarationList;
    readonly refToken?: RefToken;
    readonly name: BindingName;                    // Declared variable name    
    readonly type?: TypeNode;                      // Optional type annotation
    readonly equalsToken?: Token<SyntaxKind.EqualsToken>; // Optional initializer token
    readonly initializer?: Expression;             // Optional initializer
}

export interface VariableDeclarationList extends Node {
    readonly kind: SyntaxKind.VariableDeclarationList;
    readonly parent: VariableStatement | ForStatement | ForEachStatement;
    readonly declarations: NodeArray<VariableDeclaration>;
    
}

export interface IterationStatement extends Statement {
    readonly statement: Statement;
}

export type ForInitializer = VariableDeclarationList | Expression;

// export interface ForInStatement extends IterationStatement, LocalsContainer, FlowContainer {
//     readonly kind: SyntaxKind.ForInStatement;
//     readonly initializer: ForInitializer;
//     readonly expression: Expression;
// }

export interface ForStatement extends IterationStatement, LocalsContainer, FlowContainer {
    readonly kind: SyntaxKind.ForStatement;
    readonly initializer?: ForInitializer;
    readonly condition?: Expression;
    readonly incrementor?: Expression;
}

export interface VariableStatement extends Statement, FlowContainer {
    readonly kind: SyntaxKind.VariableStatement;
    readonly modifiers?: NodeArray<Modifier>;
    readonly declarationList: VariableDeclarationList;
    readonly type?: TypeNode;                      // Optional type annotation
}


export interface BinaryExpression extends Expression, Declaration, JSDocContainer {
    readonly kind: SyntaxKind.BinaryExpression;
    readonly left: Expression;
    readonly operatorToken: BinaryOperatorToken;
    readonly right: Expression;
}

export interface ImpliedStringConcatExpression extends BinaryExpression {    
}

export type FunctionBody = Block;
export type ConciseBody = FunctionBody | Expression ;

export interface ParameterDeclaration extends NamedDeclaration, JSDocContainer {
    readonly kind: SyntaxKind.Parameter;
    readonly parent: SignatureDeclaration;
    readonly modifiers?: NodeArray<Modifier>;
    readonly dotDotDotToken?: DotDotDotToken;    // Present on rest parameter
    readonly name: BindingName;                  // Declared parameter name.
    readonly ampToken?: AmpersandToken | RefToken;          // Present on "by ref" parameters
    readonly type?: TypeNode;                    // Optional type annotation
    readonly initializer?: Expression;           // Optional initializer    
}

export interface SignatureDeclarationBase extends NamedDeclaration, JSDocContainer {
    readonly kind: SignatureDeclaration["kind"];
    readonly name?: PropertyName;    
    readonly typeParameters?: NodeArray<TypeParameterDeclaration> | undefined;
    readonly parameters: NodeArray<ParameterDeclaration>;
    readonly type?: TypeNode | undefined;
    /** @internal */ typeArguments?: NodeArray<TypeNode>; // Used for quick info, replaces typeParameters for instantiated signatures
}


/**
 * Several node kinds share function-like features such as a signature,
 * a name, and a body. These nodes should extend FunctionLikeDeclarationBase.
 * Examples:
 * - FunctionDeclaration
 * - MethodDeclaration
 * - AccessorDeclaration
 */
export interface FunctionLikeDeclarationBase extends SignatureDeclarationBase {
    _functionLikeDeclarationBrand: any;

    readonly asteriskToken?: AsteriskToken | undefined;
    readonly questionToken?: QuestionToken | undefined;
    readonly exclamationToken?: ExclamationToken | undefined;
    readonly body?: Block | Expression | undefined;
    /** @internal */ endFlowNode?: FlowNode;
    /** @internal */ returnFlowNode?: FlowNode;
}

export interface FunctionExpression extends PrimaryExpression, FunctionLikeDeclarationBase, JSDocContainer, LocalsContainer, FlowContainer {
    readonly kind: SyntaxKind.FunctionExpression;
    readonly modifiers?: NodeArray<Modifier>;
    readonly name?: Identifier;
    readonly body: FunctionBody; // Required, whereas the member inherited from FunctionDeclaration is optional
}

export type SignatureDeclaration =
    | CallSignatureDeclaration
    // | ConstructSignatureDeclaration
    | MethodSignature
    | IndexSignatureDeclaration
    | FunctionTypeNode
    // | ConstructorTypeNode
    | JSDocFunctionType    
    | FunctionDeclaration
    | MethodDeclaration
    // | ConstructorDeclaration
    // | AccessorDeclaration
    | InlineClosureExpression
    | FunctionExpression
    | ArrowFunction
    ;

export interface CallSignatureDeclaration extends SignatureDeclarationBase, TypeElement, LocalsContainer {
        readonly kind: SyntaxKind.CallSignature;
}
    
export type DeclarationWithTypeParameterChildren =
    | SignatureDeclaration
    | ClassLikeDeclaration
    | StructDeclaration
    | InterfaceDeclaration
    | TypeAliasDeclaration
    | JSDocTemplateTag;
    ;

    

export interface TypeParameterDeclaration extends NamedDeclaration, JSDocContainer {
    readonly kind: SyntaxKind.TypeParameter;
    readonly parent: DeclarationWithTypeParameterChildren | InferTypeNode;
    readonly modifiers?: NodeArray<Modifier>;
    readonly name: Identifier;
    /** Note: Consider calling `getEffectiveConstraintOfTypeParameter` */
    readonly constraint?: TypeNode;
    readonly default?: TypeNode;

    // For error recovery purposes (see `isGrammarError` in utilities.ts).
    expression?: Expression;
}

export interface DeclarationStatement extends NamedDeclaration, Statement {
    readonly name?: Identifier | StringLiteral | IntLiteral;
}

export interface FunctionDeclaration extends FunctionLikeDeclarationBase, DeclarationStatement, LocalsContainer, FlowContainer {
    readonly kind: SyntaxKind.FunctionDeclaration;
    readonly modifiers?: NodeArray<Modifier>;
    readonly name?: Identifier;
    readonly body?: FunctionBody;
}

export interface CallExpression extends LeftHandSideExpression, Declaration {
    readonly kind: SyntaxKind.CallExpression;
    readonly expression: LeftHandSideExpression;    
    readonly typeArguments?: NodeArray<TypeNode>;
    readonly arguments: NodeArray<Expression>;
}

export interface CloneObjectExpression extends PrimaryExpression, Declaration, LeftHandSideExpression {
    readonly kind: SyntaxKind.CloneObjectExpression;
    readonly expression: LeftHandSideExpression;
    readonly arguments?: NodeArray<Expression>;    
}

export interface MappingLiteralExpression extends PrimaryExpression {
    readonly kind: SyntaxKind.MappingLiteralExpression;
    readonly elements: NodeArray<MappingEntryExpression | OmittedExpression>;
    readonly initializer?: Expression;
    /** @internal */
    multiLine?: boolean;
}

export interface MappingEntryExpression extends PrimaryExpression {
    readonly kind: SyntaxKind.MappingEntryExpression;
    readonly name: Expression;
    readonly elements: NodeArray<Expression>;
}

export interface InlineClosureExpression extends PrimaryExpression, FunctionLikeDeclarationBase, JSDocContainer, LocalsContainer, FlowContainer {
    readonly kind: SyntaxKind.InlineClosureExpression;
    readonly modifiers?: NodeArray<Modifier>;
    readonly body: ConciseBody;
    readonly name: never;
    readonly arguments?: NodeArray<Expression>;
}

export type LambdaKind = 
    SyntaxKind.LambdaIdentifierExpression 
    | SyntaxKind.LambdaOperatorExpression;
export interface LambdaExpression extends PrimaryExpression {
    readonly kind: LambdaKind;
}

export interface LambdaIdentifierExpression extends LambdaExpression {
    readonly kind: SyntaxKind.LambdaIdentifierExpression;
    readonly name: Expression;
}

export interface LambdaOperatorExpression extends LambdaExpression {
    readonly kind: SyntaxKind.LambdaOperatorExpression;
    readonly operator: LambdaOperatorToken;
}

export interface ExpressionStatement extends Statement, FlowContainer {
    readonly kind: SyntaxKind.ExpressionStatement;
    readonly expression: Expression;
}

export interface ReturnStatement extends Statement, FlowContainer {
    readonly kind: SyntaxKind.ReturnStatement;
    readonly expression?: Expression;
}


export interface BreakStatement extends Statement, FlowContainer {
    readonly kind: SyntaxKind.BreakStatement;
    readonly label?: Identifier;
}

export interface ContinueStatement extends Statement, FlowContainer {
    readonly kind: SyntaxKind.ContinueStatement;
    readonly label?: Identifier;
}

export type BreakOrContinueStatement =
    | BreakStatement
    | ContinueStatement;

export interface InheritDeclaration extends Statement {
    readonly kind: SyntaxKind.InheritDeclaration;
    readonly parent: SourceFile;
    readonly modifiers?: NodeArray<Modifier>;
    readonly inheritClause: InheritClauseNodeType;
}

export type InheritClauseNodeType = StringLiteral | Expression;


/**
 * This is a special type of binary expression where both sides are definitely string literals
 */
export interface StringConcatExpression extends BinaryExpression {
    readonly left: StringLiteral;
    readonly operatorToken: PlusToken;
    readonly right: StringLiteral;
}

export interface IfStatement extends Statement, FlowContainer {
    readonly kind: SyntaxKind.IfStatement;
    readonly expression: Expression;
    readonly thenStatement: Statement;
    readonly elseStatement?: Statement;
}

export interface EmptyStatement extends Statement {
    readonly kind: SyntaxKind.EmptyStatement;
}

export interface SwitchStatement extends Statement, FlowContainer {
    readonly kind: SyntaxKind.SwitchStatement;
    readonly expression: Expression;
    readonly preBlock?: NodeArray<Statement>; // LPC can have a code block before the case statemnets
    readonly caseBlock: CaseBlock;
    possiblyExhaustive?: boolean; // initialized by binding
}


export interface CaseBlock extends Node, LocalsContainer {
    readonly kind: SyntaxKind.CaseBlock;
    readonly parent: SwitchStatement;
    readonly clauses: NodeArray<CaseOrDefaultClause>;
}

export interface CaseClause extends Node, JSDocContainer {
    readonly kind: SyntaxKind.CaseClause;
    readonly parent: CaseBlock;
    readonly expression: Expression;
    readonly statements: NodeArray<Statement>;
    /** @internal */ fallthroughFlowNode?: FlowNode;
}

export interface DefaultClause extends Node {
    readonly kind: SyntaxKind.DefaultClause;
    readonly parent: CaseBlock;
    readonly statements: NodeArray<Statement>;
    /** @internal */ fallthroughFlowNode?: FlowNode;
}

export type CaseOrDefaultClause =
    | CaseClause
    | DefaultClause;

export interface PropertyAccessExpression extends MemberExpression, NamedDeclaration, JSDocContainer, FlowContainer {
    readonly kind: SyntaxKind.PropertyAccessExpression;
    readonly expression: LeftHandSideExpression;        
    readonly name: MemberName | ParenthesizedExpression;
    readonly propertyAccessToken: PropertyAccessToken
}

export interface SuperAccessExpression extends MemberExpression, NamedDeclaration, JSDocContainer, FlowContainer {
    readonly kind: SyntaxKind.SuperAccessExpression;
    readonly namespace: Identifier | StringLiteral;
    readonly name: MemberName;
    // readonly propertyAccessToken: PropertyAccessToken
}

export interface SuperCall extends CallExpression {
    readonly expression: SuperAccessExpression;
}

/** @internal */
export type LiteralLikeElementAccessExpression = ElementAccessExpression & Declaration & {
    readonly argumentExpression: StringLiteral | IntLiteral;
};


/** Brand for a PropertyAccessExpression which, like a QualifiedName, consists of a sequence of identifiers separated by dots. */
export interface PropertyAccessEntityNameExpression extends PropertyAccessExpression {
    _propertyAccessExpressionLikeQualifiedNameBrand?: any;
    readonly expression: EntityNameExpression;
    readonly name: Identifier;
}

export type EntityNameExpression = Identifier | PropertyAccessEntityNameExpression;
export type EntityNameOrEntityNameExpression = EntityName | EntityNameExpression;

export interface ForStatement extends IterationStatement, LocalsContainer, FlowContainer {
    readonly kind: SyntaxKind.ForStatement;
    readonly initializer?: ForInitializer;
    readonly condition?: Expression;
    readonly incrementor?: Expression;
}

export interface ForEachStatement extends IterationStatement, LocalsContainer, FlowContainer {
    readonly kind: SyntaxKind.ForEachStatement;
    readonly initializer: ForInitializer;
    readonly expression: Expression;    
}

export interface DoOrWhileStatementBase extends IterationStatement, LocalsContainer, FlowContainer {
    readonly expression: Expression;
} 

export interface DoWhileStatement extends DoOrWhileStatementBase {
    readonly kind: SyntaxKind.DoWhileStatement;    
}

export interface WhileStatement extends DoOrWhileStatementBase {
    readonly kind: SyntaxKind.WhileStatement;    
}

export type PostfixUnaryOperator =
    | SyntaxKind.PlusPlusToken
    | SyntaxKind.MinusMinusToken;
    
export interface PostfixUnaryExpression extends UpdateExpression {
    readonly kind: SyntaxKind.PostfixUnaryExpression;
    readonly operand: LeftHandSideExpression;
    readonly operator: PostfixUnaryOperator;
}

export interface FreshableType extends Type {
    freshType: FreshableType; // Fresh version of type
    regularType: FreshableType; // Regular version of type
}

/** @internal */
export interface FreshableIntrinsicType extends FreshableType, IntrinsicType {
}

// String literal types (TypeFlags.StringLiteral)
// Int literal types (TypeFlags.IntLiteral)
// Float literal types (TypeFlags.FloatLiteral)
export interface LiteralType extends FreshableType {
    value: string | number; // Value of literal
}


// Types included in TypeFlags.ObjectFlagsType have an objectFlags property. Some ObjectFlags
// are specific to certain types and reuse the same bit position. Those ObjectFlags require a check
// for a certain TypeFlags value to determine their meaning.
// dprint-ignore
export const enum ObjectFlags {
    None             = 0,
    Class            = 1 << 0,  // Class
    Interface        = 1 << 1,  // Interface
    Reference        = 1 << 2,  // Generic type reference
    Tuple            = 1 << 3,  // Synthesized generic tuple type
    Anonymous        = 1 << 4,  // Anonymous
    Mapped           = 1 << 5,  // Mapped
    Instantiated     = 1 << 6,  // Instantiated anonymous or mapped type
    ObjectLiteral    = 1 << 7,  // Originates in an object literal
    EvolvingArray    = 1 << 8,  // Evolving array type
    ObjectLiteralPatternWithComputedProperties = 1 << 9,  // Object literal pattern with computed properties
    ReverseMapped    = 1 << 10, // Object contains a property from a reverse-mapped type
    MappingLiteral   = 1 << 11, // Originates in a mapping literal
    JSLiteral        = 1 << 12, // Object type declared in JS - disables errors on read/write of nonexisting members
    FreshLiteral     = 1 << 13, // Fresh object literal
    ArrayLiteral     = 1 << 14, // Originates in an array literal
    /** @internal */
    PrimitiveUnion   = 1 << 15, // Union of only primitive types
    /** @internal */
    ContainsWideningType = 1 << 16, // Type is or contains undefined or null widening type
    /** @internal */
    ContainsObjectOrArrayLiteral = 1 << 17, // Type is or contains object literal type
    /** @internal */
    NonInferrableType = 1 << 18, // Type is or contains anyFunctionType or silentNeverType
    /** @internal */
    CouldContainTypeVariablesComputed = 1 << 19, // CouldContainTypeVariables flag has been computed
    /** @internal */
    CouldContainTypeVariables = 1 << 20, // Type could contain a type variable

    ClassOrInterface = Class | Interface,
    /** @internal */
    RequiresWidening = ContainsWideningType | ContainsObjectOrArrayLiteral,
    /** @internal */
    PropagatingFlags = ContainsWideningType | ContainsObjectOrArrayLiteral | NonInferrableType,
    /** @internal */
    InstantiatedMapped = Mapped | Instantiated,
    // Object flags that uniquely identify the kind of ObjectType
    /** @internal */
    ObjectTypeKindMask = ClassOrInterface | Reference | Tuple | Anonymous | Mapped | ReverseMapped | EvolvingArray,

    // Flags that require TypeFlags.Object
    ContainsSpread   = 1 << 21,  // Object literal contains spread operation
    ObjectRestType   = 1 << 22,  // Originates in object rest declaration
    InstantiationExpressionType = 1 << 23,  // Originates in instantiation expression
    SingleSignatureType = 1 << 27,  // A single signature type extracted from a potentially broader type
    /** @internal */
    IsClassInstanceClone = 1 << 24, // Type is a clone of a class instance type
    // Flags that require TypeFlags.Object and ObjectFlags.Reference
    /** @internal */
    IdenticalBaseTypeCalculated = 1 << 25, // has had `getSingleBaseForNonAugmentingSubtype` invoked on it already
    /** @internal */
    IdenticalBaseTypeExists = 1 << 26, // has a defined cachedEquivalentBaseType member

    // Flags that require TypeFlags.UnionOrIntersection or TypeFlags.Substitution
    /** @internal */
    IsGenericTypeComputed = 1 << 21, // IsGenericObjectType flag has been computed
    /** @internal */
    IsGenericObjectType = 1 << 22, // Union or intersection contains generic object type
    /** @internal */
    IsGenericIndexType = 1 << 23, // Union or intersection contains generic index type
    /** @internal */
    IsGenericType = IsGenericObjectType | IsGenericIndexType,

    // Flags that require TypeFlags.Union
    /** @internal */
    ContainsIntersections = 1 << 24, // Union contains intersections
    /** @internal */
    IsUnknownLikeUnionComputed = 1 << 25, // IsUnknownLikeUnion flag has been computed
    /** @internal */
    IsUnknownLikeUnion = 1 << 26, // Union of null, undefined, and empty object type
    /** @internal */

    // Flags that require TypeFlags.Intersection
    /** @internal */
    IsNeverIntersectionComputed = 1 << 24, // IsNeverLike flag has been computed
    /** @internal */
    IsNeverIntersection = 1 << 25, // Intersection reduces to never
    /** @internal */
    IsConstrainedTypeVariable = 1 << 26, // T & C, where T's constraint and C are primitives, object, or {}
}


// dprint-ignore
/** @internal */
export const enum SignatureFlags {
    None = 0,

    // Propagating flags
    HasRestParameter = 1 << 0,          // Indicates last parameter is rest parameter
    HasLiteralTypes = 1 << 1,           // Indicates signature is specialized
    Abstract = 1 << 2,                  // Indicates signature comes from an abstract class, abstract construct signature, or abstract constructor type
    IsVarArgs = 1 << 3,                 // Indicates signature is a varargs signature
    HasJsDoc = 1 << 4,                  // Indicates signature's declaration has JSDoc comments

    // Non-propagating flags
    IsInnerCallChain = 1 << 6,          // Indicates signature comes from a CallChain nested in an outer OptionalChain
    IsOuterCallChain = 1 << 7,          // Indicates signature comes from a CallChain that is the outermost chain of an optional expression
    IsUntypedSignatureInJSFile = 1 << 8, // Indicates signature is from a js file and has no types
    IsNonInferrable = 1 << 9,           // Indicates signature comes from a non-inferrable type
    IsSignatureCandidateForOverloadFailure = 1 << 10,


    // We do not propagate `IsInnerCallChain` or `IsOuterCallChain` to instantiated signatures, as that would result in us
    // attempting to add `| undefined` on each recursive call to `getReturnTypeOfSignature` when
    // instantiating the return type.
    PropagatingFlags = HasRestParameter | HasLiteralTypes | Abstract | IsVarArgs | IsUntypedSignatureInJSFile | IsSignatureCandidateForOverloadFailure,

    CallChainFlags = IsInnerCallChain | IsOuterCallChain,
}

export interface JSDocParameterTag extends JSDocPropertyLikeTag {
    readonly kind: SyntaxKind.JSDocParameterTag;
}

export interface JSDocSignature extends JSDocType, Declaration, JSDocContainer, LocalsContainer {
    readonly kind: SyntaxKind.JSDocSignature;
    // TODO
    //readonly typeParameters?: readonly JSDocTemplateTag[];
    readonly parameters: readonly JSDocParameterTag[];
    readonly type: JSDocReturnTag | undefined;
}

export interface JSDocReturnTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocReturnTag;
    readonly typeExpression?: JSDocTypeExpression;
}


/** @internal */
export const enum IndexFlags {
    None = 0,
    StringsOnly = 1 << 0,
    NoIndexSignatures = 1 << 1,
    NoReducibleCheck = 1 << 2,
}

// keyof T types (TypeFlags.Index)
export interface IndexType extends InstantiableType {
    type: InstantiableType | UnionType;
    /** @internal */
    indexFlags: IndexFlags;
}

export interface InstantiableType extends Type {
    /** @internal */
    resolvedBaseConstraint?: Type;
    /** @internal */
    resolvedIndexType?: IndexType;
    /** @internal */
    resolvedStringIndexType?: IndexType;
}

/** @internal */
export const enum TypeMapKind {
    Simple,
    Array,
    Deferred,
    Function,
    Composite,
    Merged,
}

/** @internal */
export type TypeMapper =
    | { kind: TypeMapKind.Simple; source: Type; target: Type; }
    | { kind: TypeMapKind.Array; sources: readonly Type[]; targets: readonly Type[] | undefined; }
    | { kind: TypeMapKind.Deferred; sources: readonly Type[]; targets: (() => Type)[]; }
    | { kind: TypeMapKind.Function; func: (t: Type) => Type; debugInfo?: () => string; }
    | { kind: TypeMapKind.Composite | TypeMapKind.Merged; mapper1: TypeMapper; mapper2: TypeMapper; };


// Type parameters (TypeFlags.TypeParameter)
// dprint-ignore
export interface TypeParameter extends InstantiableType {
    /**
     * Retrieve using getConstraintFromTypeParameter
     *
     * @internal
     */
    constraint?: Type;        // Constraint
    /** @internal */
    default?: Type;
    /** @internal */
    target?: TypeParameter;  // Instantiation target
    /** @internal */
    mapper?: TypeMapper;     // Instantiation mapper
    /** @internal */
    isThisType?: boolean;
    /** @internal */
    resolvedDefaultType?: Type;
}

// dprint-ignore
export interface Signature {
    /** @internal */ flags: SignatureFlags;
    /** @internal */ checker?: TypeChecker;
    declaration?: SignatureDeclaration | JSDocSignature; // Originating declaration
    typeParameters?: readonly TypeParameter[];   // Type parameters (undefined if non-generic)
    parameters: readonly Symbol[];               // Parameters
    thisParameter?: Symbol;             // symbol of this-type parameter
    /** @internal */
    // See comment in `instantiateSignature` for why these are set lazily.
    resolvedReturnType?: Type;          // Lazily set by `getReturnTypeOfSignature`.
    /** @internal */
    // Lazily set by `getTypePredicateOfSignature`.
    // `undefined` indicates a type predicate that has not yet been computed.
    // Uses a special `noTypePredicate` sentinel value to indicate that there is no type predicate. This looks like a TypePredicate at runtime to avoid polymorphism.
    resolvedTypePredicate?: TypePredicate;
    /** @internal */
    minArgumentCount: number;           // Number of non-optional parameters
    /** @internal */
    resolvedMinArgumentCount?: number;  // Number of non-optional parameters (excluding trailing `void`)
    /** @internal */
    target?: Signature;                 // Instantiation target
    /** @internal */
    mapper?: TypeMapper;                // Instantiation mapper
    /** @internal */
    compositeSignatures?: Signature[];  // Underlying signatures of a union/intersection signature
    /** @internal */
    compositeKind?: TypeFlags;          // TypeFlags.Union if the underlying signatures are from union members, otherwise TypeFlags.Intersection
    /** @internal */
    erasedSignatureCache?: Signature;   // Erased version of signature (deferred)
    /** @internal */
    canonicalSignatureCache?: Signature; // Canonical version of signature (deferred)
    /** @internal */
    baseSignatureCache?: Signature;      // Base version of signature (deferred)
    /** @internal */
    optionalCallSignatureCache?: { inner?: Signature, outer?: Signature }; // Optional chained call version of signature (deferred)
    /** @internal */
    isolatedSignatureType?: ObjectType; // A manufactured type that just contains the signature for purposes of signature comparison
    /** @internal */
    instantiations?: Map<string, Signature>;    // Generic signature instantiation cache
    /** @internal */
    implementationSignatureCache?: Signature;  // Copy of the signature with fresh type parameters to use in checking the body of a potentially self-referential generic function (deferred)
}

export interface UnionOrIntersectionType extends Type {
    types: Type[]; // Constituent types
    /** @internal */
    objectFlags: ObjectFlags;
    /** @internal */
    propertyCache?: SymbolTable; // Cache of resolved properties
    /** @internal */
    propertyCacheWithoutObjectFunctionPropertyAugment?: SymbolTable; // Cache of resolved properties that does not augment function or object type properties
    /** @internal */
    resolvedProperties: Symbol[];
    /** @internal */
    resolvedIndexType: IndexType;
    /** @internal */
    resolvedStringIndexType: IndexType;
    /** @internal */
    resolvedBaseConstraint: Type;
}

export interface UnionType extends UnionOrIntersectionType {
    /** @internal */
    resolvedReducedType?: Type;
    /** @internal */
    regularType?: UnionType;
    /** @internal */
    origin?: Type; // Denormalized union, intersection, or index type in which union originates
    /** @internal */
    keyPropertyName?: string; // Property with unique unit type that exists in every object/intersection in union type
    /** @internal */
    constituentMap?: Map<TypeId, Type>; // Constituents keyed by unit type discriminants
    /** @internal */
    arrayFallbackSignatures?: readonly Signature[]; // Special remapped signature list for unions of arrays
}

/** @internal */
export type ObjectFlagsType = ObjectType | UnionType;

// Object types (TypeFlags.ObjectType)
// dprint-ignore
export interface ObjectType extends Type {
    objectFlags: ObjectFlags;
    /** @internal */ members?: SymbolTable;             // Properties by name
    /** @internal */ properties?: Symbol[];             // Properties
    /** @internal */ callSignatures?: readonly Signature[];      // Call signatures of type
    /** @internal */ constructSignatures?: readonly Signature[]; // Construct signatures of type
    /** @internal */ indexInfos?: readonly IndexInfo[];  // Index signatures - 
    /** @internal */ objectTypeWithoutAbstractConstructSignatures?: ObjectType;
}

export interface StructDeclaration extends DeclarationStatement, JSDocContainer, LocalsContainer {
    readonly kind: SyntaxKind.StructDeclaration;
    readonly name: Identifier;
    readonly typeParameters: NodeArray<TypeParameterDeclaration>;
    readonly modifiers?: NodeArray<Modifier>;
    readonly heritageName?: Identifier;
    readonly type: TypeNode;    
}

/** @internal */
export type MatchingKeys<TRecord, TMatch, K extends keyof TRecord = keyof TRecord> = K extends (TRecord[K] extends TMatch ? K : never) ? K : never;

export const enum InternalSymbolName {
    EfunSuperPrefix = "efun",
    EfunNamespace = "efun::",
    Call = "__call", // Call signatures
    Constructor = "__constructor", // Constructor implementations
    New = "__new", // Constructor signatures
    Index = "__index", // Index signatures
    ExportStar = "__export", // Module export * declarations
    Global = "__global", // Global self-reference
    Missing = "__missing", // Indicates missing symbol
    Type = "__type", // Anonymous type literal symbol
    Object = "__object", // Anonymous object literal declaration    
    Class = "__class", // Unnamed class expression
    Function = "__function", // Unnamed function expression
    Computed = "__computed", // Computed property name declaration with dynamic name
    Resolving = "__resolving__", // Indicator symbol used to mark partially resolved type aliases
    ExportEquals = "export=", // Export assignment symbol
    Default = "default", // Default export symbol (technically not wholly internal, but included here for usability)
    This = "this",
    InstantiationExpression = "__instantiationExpression", // Instantiation expressions
    ImportAttributes = "__importAttributes",
    VarDocTags = "__varDocTags",
}

export type PrefixUnaryOperator =
    | SyntaxKind.PlusPlusToken
    | SyntaxKind.MinusMinusToken
    | SyntaxKind.PlusToken
    | SyntaxKind.MinusToken
    | SyntaxKind.TildeToken
    | SyntaxKind.ExclamationToken
    | SyntaxKind.LessThanToken
    | SyntaxKind.DoubleExclamationToken;

export interface PrefixUnaryExpression extends UpdateExpression {
    readonly kind: SyntaxKind.PrefixUnaryExpression;
    readonly operator: PrefixUnaryOperator;
    readonly operand: UnaryExpression;
}

export type AssignmentOperatorToken = Token<AssignmentOperator>;

export interface AssignmentExpression<TOperator extends AssignmentOperatorToken> extends BinaryExpression {
    readonly left: LeftHandSideExpression;
    readonly operatorToken: TOperator;
}

export interface ParenthesizedExpression extends PrimaryExpression, JSDocContainer {
    readonly kind: SyntaxKind.ParenthesizedExpression;
    readonly expression: Expression;
}

/** @internal */
export interface JSDocTypeAssertion extends ParenthesizedExpression {
    readonly _jsDocTypeAssertionBrand: never;
}

export type AssertionExpression =
    | TypeAssertion
    | CastExpression;
    


export interface ArrayLiteralExpression extends PrimaryExpression {
    readonly kind: SyntaxKind.ArrayLiteralExpression;
    readonly elements: NodeArray<Expression>;
    /** @internal */
    multiLine?: boolean;
}


export interface SpreadElement extends Expression {
    readonly kind: SyntaxKind.SpreadElement;
    readonly parent: ArrayLiteralExpression | CallExpression | NewExpression;
    readonly expression: Expression;
}

export interface ByRefElement extends Expression {
    readonly kind: SyntaxKind.ByRefElement;
    readonly parent: CallExpression | NewExpression;
    readonly expression: Expression;
    readonly refToken: RefToken | AmpersandToken;
}


export interface ObjectLiteralElement extends NamedDeclaration {
    _objectLiteralBrand: any;
    readonly name?: PropertyName;
}

export interface PropertyAssignment extends ObjectLiteralElement, JSDocContainer {
    readonly kind: SyntaxKind.PropertyAssignment;
    readonly parent: ObjectLiteralExpression;
    readonly name: PropertyName;
    readonly initializer: Expression;

    // The following properties are used only to report grammar errors (see `isGrammarError` in utilities.ts)
    /** @internal */ readonly modifiers?: NodeArray<Modifier> | undefined; // property assignment cannot have decorators or modifiers    
}


export interface ShorthandPropertyAssignment extends ObjectLiteralElement, JSDocContainer {
    readonly kind: SyntaxKind.ShorthandPropertyAssignment;
    readonly parent: ObjectLiteralExpression;
    readonly name: Identifier;
    // used when ObjectLiteralExpression is used in ObjectAssignmentPattern
    // it is a grammar error to appear in actual object initializer (see `isGrammarError` in utilities.ts):
    readonly equalsToken?: EqualsToken;
    readonly objectAssignmentInitializer?: Expression;

    // The following properties are used only to report grammar errors (see `isGrammarError` in utilities.ts)
    /** @internal */ readonly modifiers?: NodeArray<Modifier> | undefined; // shorthand property assignment cannot have decorators or modifiers    
}

/** Unlike ObjectLiteralElement, excludes JSXAttribute and JSXSpreadAttribute. */
export type ObjectLiteralElementLike =
    | PropertyAssignment
    | ShorthandPropertyAssignment
    // | SpreadAssignment
    | MethodDeclaration
    // | AccessorDeclaration;
    ;

/**
 * This interface is a base interface for ObjectLiteralExpression and JSXAttributes to extend from. JSXAttributes is similar to
 * ObjectLiteralExpression in that it contains array of properties; however, JSXAttributes' properties can only be
 * JSXAttribute or JSXSpreadAttribute. ObjectLiteralExpression, on the other hand, can only have properties of type
 * ObjectLiteralElement (e.g. PropertyAssignment, ShorthandPropertyAssignment etc.)
 */
export interface ObjectLiteralExpressionBase<T extends ObjectLiteralElement> extends PrimaryExpression, Declaration {
    readonly properties: NodeArray<T>;
}


// An ObjectLiteralExpression is the declaration node for an anonymous symbol.
export interface ObjectLiteralExpression extends ObjectLiteralExpressionBase<ObjectLiteralElementLike>, JSDocContainer {
    readonly kind: SyntaxKind.ObjectLiteralExpression;
    /** @internal */
    multiLine?: boolean;
}

export type AccessExpression = PropertyAccessExpression | ElementAccessExpression;

export interface ElementAccessChain extends ElementAccessExpression {
    _optionalChainBrand: any;
}

export interface ElementAccessExpression extends MemberExpression, Declaration, JSDocContainer, FlowContainer {
    readonly kind: SyntaxKind.ElementAccessExpression;
    readonly expression: LeftHandSideExpression;    
    readonly argumentExpression: Expression;
}

export interface RangeExpression extends MemberExpression, Declaration, JSDocContainer, FlowContainer {
    readonly kind: SyntaxKind.RangeExpression;
    readonly left: Expression;
    readonly right: Expression    
}

export interface CallChain extends CallExpression {
    _optionalChainBrand: any;
}

export class OperationCanceledException {}

export interface CancellationToken {
    isCancellationRequested(): boolean;

    /** @throws OperationCanceledException if isCancellationRequested is true */
    throwIfCancellationRequested(): void;
}

// This was previously deprecated in our public API, but is still used internally
/** @internal */
export interface SymbolWriter {
    writeKeyword(text: string): void;
    writeOperator(text: string): void;
    writePunctuation(text: string): void;
    writeSpace(text: string): void;
    writeStringLiteral(text: string): void;
    writeParameter(text: string): void;
    writeProperty(text: string): void;
    writeSymbol(text: string, symbol: Symbol): void;
    writeLine(force?: boolean): void;
    increaseIndent(): void;
    decreaseIndent(): void;
    clear(): void;
}

/** @internal */
export interface EmitTextWriter extends SymbolWriter {
    write(s: string): void;
    writeTrailingSemicolon(text: string): void;
    writeComment(text: string): void;
    getText(): string;
    rawWrite(s: string): void;
    writeLiteral(s: string): void;
    getTextPos(): number;
    getLine(): number;
    getColumn(): number;
    getIndent(): number;
    isAtStartOfLine(): boolean;
    hasTrailingComment(): boolean;
    hasTrailingWhitespace(): boolean;
    nonEscapingWrite?(text: string): void;
}

export interface NewStructExpression extends PrimaryExpression, Declaration {
    readonly kind: SyntaxKind.NewStructExpression
    readonly type: StructTypeNode;
    readonly arguments: NodeArray<Expression | ObjectLiteralElementLike>;
}

export interface EvaluateExpression extends PrimaryExpression {
    readonly kind: SyntaxKind.EvaluateExpression;
    readonly expression: Expression;
    readonly arguments: NodeArray<Expression>;
}

export interface NewExpression extends PrimaryExpression, Declaration {
    readonly kind: SyntaxKind.NewExpression;
    readonly expression?: LeftHandSideExpression | TypeNode | undefined;
    readonly typeArguments?: NodeArray<TypeNode>;
    readonly arguments?: NodeArray<Expression>;
}

export type NewExpressionArgument = Expression | ObjectLiteralElement;

export type CallLikeExpression =
    | CallExpression    
    | NewExpression
    | CloneObjectExpression
    | InlineClosureExpression
    //| TaggedTemplateExpression
    ;

/** @internal */
export interface SymbolLinks {
    _symbolLinksBrand: any;
    immediateTarget?: Symbol;                   // Immediate target of an alias. May be another alias. Do not access directly, use `checker.getImmediateAliasedSymbol` instead.
    aliasTarget?: Symbol,                       // Resolved (non-alias) target of an alias
    target?: Symbol;                            // Original version of an instantiated symbol
    type?: Type;                                // Type of value symbol
    localVarType?: Map<string, Type>;           // File-specific overrides of var types (using @var LPCDoc tag)
    writeType?: Type;                           // Type of value symbol in write contexts
    nameType?: Type;                            // Type associated with a late-bound symbol
    uniqueESSymbolType?: Type;                  // UniqueESSymbol type for a symbol
    declaredType?: Type;                        // Type of class, interface, enum, type alias, or type parameter
    typeParameters?: TypeParameter[];           // Type parameters of type alias (undefined if non-generic)
    instantiations?: Map<string, Type>;         // Instantiations of generic type alias (undefined if non-generic)
    inferredClassSymbol?: Map<SymbolId, TransientSymbol>; // Symbol of an inferred ES5 constructor function
    mapper?: TypeMapper;                        // Type mapper for instantiation alias
    referenced?: boolean;                       // True if alias symbol has been referenced as a value that can be emitted
    containingType?: UnionOrIntersectionType;   // Containing union or intersection type for synthetic property
    leftSpread?: Symbol;                        // Left source for synthetic spread property
    rightSpread?: Symbol;                       // Right source for synthetic spread property
    syntheticOrigin?: Symbol;                   // For a property on a mapped or spread type, points back to the original property
    isDiscriminantProperty?: boolean;           // True if discriminant synthetic property
    resolvedExports?: SymbolTable;              // Resolved exports of module or combined early- and late-bound static members of a class.
    resolvedMembers?: SymbolTable;              // Combined early- and late-bound members of a symbol
    exportsChecked?: boolean;                   // True if exports of external module have been checked
    typeParametersChecked?: boolean;            // True if type parameters of merged class and interface declarations have been checked.
    isDeclarationWithCollidingName?: boolean;   // True if symbol is block scoped redeclaration
    //bindingElement?: BindingElement;            // Binding element associated with property symbol
    //originatingImport?: ImportDeclaration | ImportCall; // Import declaration which produced the symbol, present if the symbol is marked as uncallable but had call signatures in `resolveESModuleSymbol`
    lateSymbol?: Symbol;                        // Late-bound symbol for a computed property
    //specifierCache?: Map<ModeAwareCacheKey, string>; // For symbols corresponding to external modules, a cache of incoming path -> module specifier name mappings
    extendedContainers?: Symbol[];              // Containers (other than the parent) which this symbol is aliased in
    extendedContainersByFile?: Map<NodeId, Symbol[]>; // Containers (other than the parent) which this symbol is aliased in
    variances?: VarianceFlags[];                // Alias symbol type argument variance cache
    deferralConstituents?: Type[];              // Calculated list of constituents for a deferred type
    deferralWriteConstituents?: Type[];         // Constituents of a deferred `writeType`
    deferralParent?: Type;                      // Source union/intersection of a deferred type
    cjsExportMerged?: Symbol;                   // Version of the symbol with all non export= exports merged with the export= target
    // typeOnlyDeclaration?: TypeOnlyAliasDeclaration | false; // First resolved alias declaration that makes the symbol only usable in type constructs
    // typeOnlyExportStarMap?: Map<__String, ExportDeclaration & { readonly isTypeOnly: true, readonly moduleSpecifier: Expression }>; // Set on a module symbol when some of its exports were resolved through a 'export type * from "mod"' declaration
    // typeOnlyExportStarName?: __String;          // Set to the name of the symbol re-exported by an 'export type *' declaration, when different from the symbol name
    isConstructorDeclaredProperty?: boolean;    // Property declared through 'this.x = ...' assignment in constructor
    tupleLabelDeclaration?: NamedTupleMember | ParameterDeclaration; // Declaration associated with the tuple's label
    accessibleChainCache?: Map<string, Symbol[] | undefined>;
    filteredIndexSymbolCache?: Map<string, Symbol> //Symbol with applicable declarations
    //requestedExternalEmitHelpers?: ExternalEmitHelpers; // External emit helpers already checked for this symbol.
}


/** @internal */
export const enum VarianceFlags {
    Invariant     =      0,  // Neither covariant nor contravariant
    Covariant     = 1 << 0,  // Covariant
    Contravariant = 1 << 1,  // Contravariant
    Bivariant     = Covariant | Contravariant,  // Both covariant and contravariant
    Independent   = 1 << 2,  // Unwitnessed type parameter
    VarianceMask  = Invariant | Covariant | Contravariant | Independent, // Mask containing all measured variances without the unmeasurable flag
    Unmeasurable  = 1 << 3,  // Variance result is unusable - relationship relies on structural comparisons which are not reflected in generic relationships
    Unreliable    = 1 << 4,  // Variance result is unreliable - checking may produce false negatives, but not false positives
    AllowsStructuralFallback = Unmeasurable | Unreliable,
}

// dprint-ignore
/** @internal */
export const enum CheckFlags {
    None              = 0,
    Instantiated      = 1 << 0,         // Instantiated symbol
    SyntheticProperty = 1 << 1,         // Property in union or intersection type
    SyntheticMethod   = 1 << 2,         // Method in union or intersection type
    Readonly          = 1 << 3,         // Readonly transient symbol
    ReadPartial       = 1 << 4,         // Synthetic property present in some but not all constituents
    WritePartial      = 1 << 5,         // Synthetic property present in some but only satisfied by an index signature in others
    HasNonUniformType = 1 << 6,         // Synthetic property with non-uniform type in constituents
    HasLiteralType    = 1 << 7,         // Synthetic property with at least one literal type in constituents
    ContainsPublic    = 1 << 8,         // Synthetic property with public constituent(s)
    ContainsProtected = 1 << 9,         // Synthetic property with protected constituent(s)
    ContainsPrivate   = 1 << 10,        // Synthetic property with private constituent(s)
    ContainsStatic    = 1 << 11,        // Synthetic property with static constituent(s)
    Late              = 1 << 12,        // Late-bound symbol for a computed property with a dynamic name
    ReverseMapped     = 1 << 13,        // Property of reverse-inferred homomorphic mapped type
    OptionalParameter = 1 << 14,        // Optional parameter
    RestParameter     = 1 << 15,        // Rest parameter
    DeferredType      = 1 << 16,        // Calculation of the type of this symbol is deferred due to processing costs, should be fetched with `getTypeOfSymbolWithDeferredType`
    HasNeverType      = 1 << 17,        // Synthetic property with at least one never type in constituents
    Mapped            = 1 << 18,        // Property of mapped type
    StripOptional     = 1 << 19,        // Strip optionality in mapped property
    Unresolved        = 1 << 20,        // Unresolved type alias symbol
    Synthetic = SyntheticProperty | SyntheticMethod,
    Discriminant = HasNonUniformType | HasLiteralType,
    Partial = ReadPartial | WritePartial,
}

/** @internal */
export interface TransientSymbolLinks extends SymbolLinks {
    checkFlags: CheckFlags;
}

/** @internal */
export interface TransientSymbol extends Symbol {
    links: TransientSymbolLinks;
}

// Intrinsic types (TypeFlags.Intrinsic)
export interface IntrinsicType extends Type {
    intrinsicName: string; // Name of intrinsic type
    debugIntrinsicName: string | undefined;
    objectFlags: ObjectFlags;
}

export type StructuredType = ObjectType | UnionType;

// Resolved object, union, or intersection type
// dprint-ignore
export interface ResolvedType extends ObjectType, UnionOrIntersectionType {
    members: SymbolTable;             // Properties by name
    properties: Symbol[];             // Properties
    callSignatures: readonly Signature[];      // Call signatures of type
    constructSignatures: readonly Signature[]; // Construct signatures of type
    indexInfos: readonly IndexInfo[];  // Index signatures
}

export interface IndexInfo {
    keyType: Type;
    type: Type;
    isReadonly: boolean;
    declaration?: IndexSignatureDeclaration;
}

export interface ClassElement extends NamedDeclaration {
    _classElementBrand: any;
    readonly name?: PropertyName;
}

export interface TypeElement extends NamedDeclaration {
    _typeElementBrand: any;
    readonly name?: PropertyName; 
}

// A TypeLiteral is the declaration node for an anonymous symbol.
export interface TypeLiteralNode extends TypeNode, Declaration {
    readonly kind: SyntaxKind.TypeLiteral;
    readonly members: NodeArray<TypeElement>;
}


export type ObjectTypeDeclaration =    TypeLiteralNode;

export interface IndexSignatureDeclaration extends SignatureDeclarationBase, ClassElement, TypeElement, LocalsContainer {
    readonly kind: SyntaxKind.IndexSignature;
    readonly parent: ObjectTypeDeclaration;
    readonly modifiers?: NodeArray<Modifier>;
    readonly type: TypeNode;
}

/** @internal */
export const enum NodeCheckFlags {
    None                                     = 0,
    TypeChecked                              = 1 << 0,   // Node has been type checked
    LexicalThis                              = 1 << 1,   // Lexical 'this' reference
    CaptureThis                              = 1 << 2,   // Lexical 'this' used in body
    CaptureNewTarget                         = 1 << 3,   // Lexical 'new.target' used in body
    SuperInstance                            = 1 << 4,   // Instance 'super' reference
    SuperStatic                              = 1 << 5,   // Static 'super' reference
    ContextChecked                           = 1 << 6,   // Contextual types have been assigned
    MethodWithSuperPropertyAccessInAsync     = 1 << 7,   // A method that contains a SuperProperty access in an async context.
    MethodWithSuperPropertyAssignmentInAsync = 1 << 8,   // A method that contains a SuperProperty assignment in an async context.
    CaptureArguments                         = 1 << 9,   // Lexical 'arguments' used in body
    EnumValuesComputed                       = 1 << 10,  // Values for enum members have been computed, and any errors have been reported for them.
    LexicalModuleMergesWithClass             = 1 << 11,  // Instantiated lexical module declaration is merged with a previous class declaration.
    LoopWithCapturedBlockScopedBinding       = 1 << 12,  // Loop that contains block scoped variable captured in closure
    ContainsCapturedBlockScopeBinding        = 1 << 13,  // Part of a loop that contains block scoped variable captured in closure
    CapturedBlockScopedBinding               = 1 << 14,  // Block-scoped binding that is captured in some function
    BlockScopedBindingInLoop                 = 1 << 15,  // Block-scoped binding with declaration nested inside iteration statement
    NeedsLoopOutParameter                    = 1 << 16,  // Block scoped binding whose value should be explicitly copied outside of the converted loop
    AssignmentsMarked                        = 1 << 17,  // Parameter assignments have been marked
    ContainsConstructorReference             = 1 << 18,  // Class or class element that contains a binding that references the class constructor.
    ConstructorReference                     = 1 << 29,  // Binding to a class constructor inside of the class's body.
    ContainsClassWithPrivateIdentifiers      = 1 << 20,  // Marked on all block-scoped containers containing a class with private identifiers.
    ContainsSuperPropertyInStaticInitializer = 1 << 21,  // Marked on all block-scoped containers containing a static initializer with 'super.x' or 'super[x]'.
    InCheckIdentifier                        = 1 << 22,
    PartiallyTypeChecked                     = 1 << 23,  // Node has been partially type checked

    /** These flags are LazyNodeCheckFlags and can be calculated lazily by `hasNodeCheckFlag` */
    LazyFlags = SuperInstance
        | SuperStatic
        | MethodWithSuperPropertyAccessInAsync
        | MethodWithSuperPropertyAssignmentInAsync
        | ContainsSuperPropertyInStaticInitializer
        | CaptureArguments
        | ContainsCapturedBlockScopeBinding
        | NeedsLoopOutParameter
        | ContainsConstructorReference
        | ConstructorReference
        | CapturedBlockScopedBinding
        | BlockScopedBindingInLoop
        | LoopWithCapturedBlockScopedBinding,
}

export interface EvaluatorResult<T extends string | number | undefined = string | number | undefined> {
    value: T;
    isSyntacticallyString: boolean;
    resolvedOtherFiles: boolean;
    hasExternalReferences: boolean;
}


/** @internal */
export type TrackedSymbol = [symbol: Symbol, enclosingDeclaration: Node | undefined, meaning: SymbolFlags];
/** @internal */
export interface SerializedTypeEntry {
    node: TypeNode;
    truncating?: boolean;
    addedLength: number;
    trackedSymbols: readonly TrackedSymbol[] | undefined;
}

/** @internal */
export interface NodeLinks {
    flags: NodeCheckFlags;              // Set of flags specific to Node
    calculatedFlags: NodeCheckFlags;    // Set of flags which have definitely been calculated already
    resolvedType?: Type;                // Cached type of type node
    resolvedSignature?: Signature;      // Cached signature of signature node or call expression
    resolvedSymbol?: Symbol;            // Cached name resolution result
    resolvedIndexInfo?: IndexInfo;      // Cached indexing info resolution result    
    effectsSignature?: Signature;       // Signature with possible control flow effects
    enumMemberValue?: EvaluatorResult;  // Constant value of enum member
    isVisible?: boolean;                // Is this node visible
    containsArgumentsReference?: boolean; // Whether a function-like declaration contains an 'arguments' reference
    hasReportedStatementInAmbientContext?: boolean; // Cache boolean if we report statements in ambient context
    resolvedJsxElementAttributesType?: Type; // resolved element attributes type of a JSX openinglike element
    resolvedJsxElementAllAttributesType?: Type; // resolved all element attributes type of a JSX openinglike element
    resolvedJSDocType?: Type;           // Resolved type of a JSDoc type reference
    switchTypes?: Type[];               // Cached array of switch case expression types
    jsxNamespace?: Symbol | false;      // Resolved jsx namespace symbol for this node
    jsxImplicitImportContainer?: Symbol | false; // Resolved module symbol the implicit jsx import of this file should refer to
    contextFreeType?: Type;             // Cached context-free type used by the first pass of inference; used when a function's return is partially contextually sensitive
    deferredNodes?: Set<Node>;          // Set of nodes whose checking has been deferred
    capturedBlockScopeBindings?: Symbol[]; // Block-scoped bindings captured beneath this part of an IterationStatement
    outerTypeParameters?: TypeParameter[]; // Outer type parameters of anonymous object type
    isExhaustive?: boolean | 0;         // Is node an exhaustive switch statement (0 indicates in-process resolution)
    skipDirectInference?: true;         // Flag set by the API `getContextualType` call on a node when `Completions` is passed to force the checker to skip making inferences to a node's type
    declarationRequiresScopeChange?: boolean; // Set by `useOuterVariableScopeInParameter` in checker when downlevel emit would change the name resolution scope inside of a parameter.
    serializedTypes?: Map<string, SerializedTypeEntry>; // Collection of types serialized at this location
    decoratorSignature?: Signature;     // Signature for decorator as if invoked by the runtime.
    spreadIndices?: { first: number | undefined, last: number | undefined }; // Indices of first and last spread elements in array literal
    parameterInitializerContainsUndefined?: boolean; // True if this is a parameter declaration whose type annotation contains "undefined".
    fakeScopeForSignatureDeclaration?: "params" | "typeParams"; // If present, this is a fake scope injected into an enclosing declaration chain.
    assertionExpressionType?: Type;     // Cached type of the expression of a type assertion
    potentialThisCollisions?: Node[];
    potentialNewTargetCollisions?: Node[];
    potentialWeakMapSetCollisions?: Node[];
    potentialReflectCollisions?: Node[];
    //potentialUnusedRenamedBindingElementsInTypes?: BindingElement[];
    externalHelpersModule?: Symbol;     // Resolved symbol for the external helpers module
}

export interface JSDocTemplateTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocTemplateTag;
    readonly constraint: JSDocTypeExpression | undefined;
    readonly typeParameters: NodeArray<TypeParameterDeclaration>;
}

export interface JSDocThisTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocThisTag;
    readonly typeExpression: JSDocTypeExpression;
}

export interface JSDocVariadicType extends JSDocType {
    readonly kind: SyntaxKind.JSDocVariadicType;
    readonly type: TypeNode;
}

export interface JSDocDeprecatedTag extends JSDocTag {
    kind: SyntaxKind.JSDocDeprecatedTag;
}

export interface PropertyDeclaration extends ClassElement, JSDocContainer {
    readonly kind: SyntaxKind.PropertyDeclaration;
    readonly parent: StructDeclaration;
    readonly modifiers?: NodeArray<Modifier>;
    readonly name: PropertyName;    
    readonly type?: TypeNode;
    readonly initializer?: Expression;           // Optional initializer
}

export interface BindingElement extends NamedDeclaration, FlowContainer {
    readonly kind: SyntaxKind.BindingElement;
    readonly parent: BindingPattern;
    readonly propertyName?: PropertyName;        // Binding property name (in object binding pattern)
    readonly dotDotDotToken?: DotDotDotToken;    // Present on rest element (in object binding pattern)
    readonly name: BindingName;                  // Declared binding element name
    readonly initializer?: Expression;           // Optional initializer
}

/** @internal */
export type BindingElementGrandparent = BindingElement["parent"]["parent"];

export type BooleanLiteral = TrueLiteral | FalseLiteral;

export interface LiteralTypeNode extends TypeNode {
    readonly kind: SyntaxKind.LiteralType;
    readonly literal: LiteralExpression | PrefixUnaryExpression | BooleanLiteral | ImpliedStringConcatExpression;
}

export interface StructTypeNode extends TypeNode {
    readonly kind: SyntaxKind.StructType;
    readonly keyword: StructKeywordSyntaxKind;
    readonly typeName: EntityName;
}

export const enum SymbolFormatFlags {
    None                                    = 0,

    // Write symbols's type argument if it is instantiated symbol
    // eg. class C<T> { p: T }   <-- Show p as C<T>.p here
    //     var a: C<number>;
    //     var p = a.p; <--- Here p is property of C<number> so show it as C<number>.p instead of just C.p
    WriteTypeParametersOrArguments          = 1 << 0,

    // Use only external alias information to get the symbol name in the given context
    // eg.  module m { export class c { } } import x = m.c;
    // When this flag is specified m.c will be used to refer to the class instead of alias symbol x
    UseOnlyExternalAliasing                 = 1 << 1,

    // Build symbol name using any nodes needed, instead of just components of an entity name
    AllowAnyNodeKind                        = 1 << 2,

    // Prefer aliases which are not directly visible
    UseAliasDefinedOutsideCurrentScope      = 1 << 3,

    // { [E.A]: 1 }
    /** @internal */ WriteComputedProps      = 1 << 4,

    // Skip building an accessible symbol chain
    /** @internal */ DoNotIncludeSymbolChain = 1 << 5,
}

/** @internal */
export interface VariableDeclarationInitializedTo<T extends Expression> extends VariableDeclaration {
    readonly initializer: T;
}

/** @internal */
export const enum UnionReduction {
    None = 0,
    Literal,
    Subtype,
}

/** @internal */
export const enum RelationComparisonResult {
    None                = 0,
    Succeeded           = 1 << 0, // Should be truthy
    Failed              = 1 << 1,
    Reported            = 1 << 2,

    ReportsUnmeasurable = 1 << 3,
    ReportsUnreliable   = 1 << 4,    
    ReportsMask         = ReportsUnmeasurable | ReportsUnreliable,

    ComplexityOverflow  = 1 << 5,
    StackDepthOverflow  = 1 << 6,
    Overflow            = ComplexityOverflow | StackDepthOverflow,
}

/** @internal */
export type LazyNodeCheckFlags =
    | NodeCheckFlags.SuperInstance
    | NodeCheckFlags.SuperStatic
    | NodeCheckFlags.MethodWithSuperPropertyAccessInAsync
    | NodeCheckFlags.MethodWithSuperPropertyAssignmentInAsync
    | NodeCheckFlags.ContainsSuperPropertyInStaticInitializer
    | NodeCheckFlags.CaptureArguments
    | NodeCheckFlags.ContainsCapturedBlockScopeBinding
    | NodeCheckFlags.NeedsLoopOutParameter
    | NodeCheckFlags.ContainsConstructorReference
    | NodeCheckFlags.ConstructorReference
    | NodeCheckFlags.CapturedBlockScopedBinding
    | NodeCheckFlags.BlockScopedBindingInLoop
    | NodeCheckFlags.LoopWithCapturedBlockScopedBinding;

    
export interface ArrayBindingPattern extends Node {
    readonly kind: SyntaxKind.ArrayBindingPattern;
    readonly parent: VariableDeclaration | ParameterDeclaration | BindingElement;
    readonly elements: NodeArray<ArrayBindingElement>;
}

export type BindingPattern = ArrayBindingPattern;// | ObjectBindingPattern;

export type ArrayBindingElement = BindingElement | OmittedExpression;

export interface IndexedAccessTypeNode extends TypeNode {
    readonly kind: SyntaxKind.IndexedAccessType;
    readonly objectType: TypeNode;
    readonly indexType: TypeNode;
}

export const enum Extension {
    C = ".c",
    Lpc = ".lpc",
    H = ".h"    ,
    Json = ".json"

}

// SyntaxKind.SyntaxList
export interface SyntaxList extends Node {
    kind: SyntaxKind.SyntaxList;

    // Unlike other nodes which may or may not have their child nodes calculated,
    // the entire purpose of a SyntaxList is to hold child nodes.
    // Instead of using the WeakMap machinery in `nodeChildren.ts`,
    // we just store the children directly on the SyntaxList.
    /** @internal */ _children: readonly Node[];
}

export const enum LanguageVariant {
    LDMud = 0,
    FluffOS,
    Standard
}

export const DriverTypeMap = [
    "LDMud",
    "FluffOS",
    "Standard"
]

export const enum JSDocParsingMode {
    /**
     * Always parse JSDoc comments and include them in the AST.
     *
     * This is the default if no mode is provided.
     */
    ParseAll,
    /**
     * Never parse JSDoc comments, mo matter the file type.
     */
    ParseNone,
    /**
     * Parse only JSDoc comments which are needed to provide correct type errors.
     *
     * This will always parse JSDoc in non-TS files, but only parse JSDoc comments
     * containing `@see` and `@link` in TS files.
     */
    ParseForTypeErrors,
    /**
     * Parse only JSDoc comments which are needed to provide correct type info.
     *
     * This will always parse JSDoc in non-TS files, but never in TS files.
     *
     * Note: Do not use this mode if you require accurate type errors; use {@link ParseForTypeErrors} instead.
     */
    ParseForTypeInfo,
}


export interface TextSpan {
    start: number;
    length: number;
}

export interface TextChangeRange {
    span: TextSpan;
    newLength: number;
}

export const enum IndexKind {
    String,
    Number,
}

export interface StringLiteralType extends LiteralType {
    value: string;
}

export interface BytesLiteralType extends LiteralType {
    value: string;
}

export interface IntLiteralType extends LiteralType {
    __intLiteralBrand:any;
    value: number;
}

export interface FloatLiteralType extends LiteralType {
    __floaLiteralBrand:any;
    value: number;
}

export type TypeVariable = TypeParameter;

// Object type or intersection of object types
export type BaseType = ObjectType | TypeVariable; // Also `any` and `object`

export interface ScriptReferenceHost {
    getCompilerOptions(): CompilerOptions;
    getSourceFile(fileName: string): SourceFile | undefined;
    getSourceFileByPath(path: Path): SourceFile | undefined;
    getCurrentDirectory(): string;
}

/** @internal */
export interface LibResolution<T extends ResolvedModuleWithFailedLookupLocations = ResolvedModuleWithFailedLookupLocations> {
    resolution: T;
    actual: string;
}

export interface Program extends ScriptReferenceHost {
    getCurrentDirectory(): string;
    /**
     * Get a list of root file names that were passed to a 'createProgram'
     */
    getRootFileNames(): readonly string[];

    /**
     * Get a list of files in the program
     */
    getSourceFiles(): readonly SourceFile[];

    /**
     * Get a list of files that are parsable
     */
    getParseableFiles(): ReadonlySet<Path> | undefined;

    /**
     * Gets a type checker that can be used to semantically analyze source files in the program.
     */
    getTypeChecker(): TypeChecker;
    
    /**
     * Get a list of file names that were passed to 'createProgram' or referenced in a
     * program source file but could not be located.
     *
     * @internal
     */
    getMissingFilePaths(): Map<Path, string>;
    /** @internal */
    getModuleResolutionCache(): /*ModuleResolutionCache | */undefined;
    /** @internal */
    getFilesByNameMap(): Map<Path, SourceFile | false | undefined>;

    /** @internal */
    resolvedModules: Map<Path, ModeAwareCache<ResolvedModuleWithFailedLookupLocations>> | undefined;
    // /** @internal */
    // resolvedTypeReferenceDirectiveNames: Map<Path, ModeAwareCache<ResolvedTypeReferenceDirectiveWithFailedLookupLocations>> | undefined;
    /** @internal */
    getResolvedModule(f: SourceFile, moduleName: string, mode: ResolutionMode): ResolvedModuleWithFailedLookupLocations | undefined;
    /** @internal */
    getResolvedModuleFromModuleSpecifier(moduleSpecifier: StringLiteralLike, sourceFile?: SourceFile): ResolvedModuleWithFailedLookupLocations | undefined;
    // /** @internal */
    // getResolvedTypeReferenceDirective(f: SourceFile, typeDirectiveName: string, mode: ResolutionMode): ResolvedTypeReferenceDirectiveWithFailedLookupLocations | undefined;
    /** @internal */
    getResolvedTypeReferenceDirectiveFromTypeReferenceDirective(typedRef: FileReference, sourceFile: SourceFile): ResolvedTypeReferenceDirectiveWithFailedLookupLocations | undefined;
    /** @internal */
    forEachResolvedModule(
        callback: (resolution: ResolvedModuleWithFailedLookupLocations, moduleName: string, mode: ResolutionMode, filePath: Path) => void,
        file?: SourceFile,
    ): void;    
    
    // /** @internal */
    // forEachResolvedTypeReferenceDirective(
    //     callback: (resolution: ResolvedTypeReferenceDirectiveWithFailedLookupLocations, moduleName: string, mode: ResolutionMode, filePath: Path) => void,
    //     file?: SourceFile,
    // ): void;

    // /**
    //  * Emits the JavaScript and declaration files.  If targetSourceFile is not specified, then
    //  * the JavaScript and declaration files will be produced for all the files in this program.
    //  * If targetSourceFile is specified, then only the JavaScript and declaration for that
    //  * specific file will be generated.
    //  *
    //  * If writeFile is not specified then the writeFile callback from the compiler host will be
    //  * used for writing the JavaScript and declaration files.  Otherwise, the writeFile parameter
    //  * will be invoked when writing the JavaScript and declaration files.
    //  */
    // emit(targetSourceFile?: SourceFile, writeFile?: WriteFileCallback, cancellationToken?: CancellationToken, emitOnlyDtsFiles?: boolean, customTransformers?: CustomTransformers): EmitResult;
    // /** @internal */
    // emit(targetSourceFile?: SourceFile, writeFile?: WriteFileCallback, cancellationToken?: CancellationToken, emitOnly?: boolean | EmitOnly, customTransformers?: CustomTransformers, forceDtsEmit?: boolean, skipBuildInfo?: boolean): EmitResult;

    getOptionsDiagnostics(cancellationToken?: CancellationToken): readonly Diagnostic[];
    getGlobalDiagnostics(cancellationToken?: CancellationToken): readonly Diagnostic[];
    getSyntacticDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly DiagnosticWithLocation[];
    /** The first time this is called, it will return global diagnostics (no location). */
    getSemanticDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly Diagnostic[];    

    getDeclarationDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly DiagnosticWithLocation[];
    getConfigFileParsingDiagnostics(): readonly Diagnostic[];
    /** @internal */ getSuggestionDiagnostics(sourceFile: SourceFile, cancellationToken?: CancellationToken): readonly DiagnosticWithLocation[];

    // /** @internal */ getBindAndCheckDiagnostics(sourceFile: SourceFile, cancellationToken?: CancellationToken): readonly Diagnostic[];
    // /** @internal */ getProgramDiagnostics(sourceFile: SourceFile, cancellationToken?: CancellationToken): readonly Diagnostic[];    
    getConfigDefines(): ReadonlyMap<string, string>;

    // /** @internal */ getCommonSourceDirectory(): string;

    // /** @internal */ getCachedSemanticDiagnostics(sourceFile: SourceFile): readonly Diagnostic[] | undefined;

    // /** @internal */ getClassifiableNames(): Set<__String>;

    getNodeCount(): number;
    getIdentifierCount(): number;
    getSymbolCount(): number;
    getTypeCount(): number;
    getInstantiationCount(): number;
    getRelationCacheSizes(): { assignable: number; identity: number; subtype: number; strictSubtype: number; };    

    /** @internal */ getFileProcessingDiagnostics(): FilePreprocessingDiagnostics[] | undefined;
    // /** @internal */ getAutomaticTypeDirectiveNames(): string[];
    // /** @internal */ getAutomaticTypeDirectiveResolutions(): ModeAwareCache<ResolvedTypeReferenceDirectiveWithFailedLookupLocations>;
    isSourceFileFromExternalLibrary(file: SourceFile): boolean;
    isSourceFileDefaultLibrary(file: SourceFile): boolean;
    // /**
    //  * Calculates the final resolution mode for a given module reference node. This is the resolution mode explicitly provided via import
    //  * attributes, if present, or the syntax the usage would have if emitted to JavaScript. In `--module node16` or `nodenext`, this may
    //  * depend on the file's `impliedNodeFormat`. In `--module preserve`, it depends only on the input syntax of the reference. In other
    //  * `module` modes, when overriding import attributes are not provided, this function returns `undefined`, as the result would have no
    //  * impact on module resolution, emit, or type checking.
    //  */
    // getModeForUsageLocation(file: SourceFile, usage: StringLiteralLike): ResolutionMode;
    // /**
    //  * Calculates the final resolution mode for an import at some index within a file's `imports` list. This is the resolution mode
    //  * explicitly provided via import attributes, if present, or the syntax the usage would have if emitted to JavaScript. In
    //  * `--module node16` or `nodenext`, this may depend on the file's `impliedNodeFormat`. In `--module preserve`, it depends only on the
    //  * input syntax of the reference. In other `module` modes, when overriding import attributes are not provided, this function returns
    //  * `undefined`, as the result would have no impact on module resolution, emit, or type checking.
    //  */
    // getModeForResolutionAtIndex(file: SourceFile, index: number): ResolutionMode;

    // // For testing purposes only.
    // // This is set on created program to let us know how the program was created using old program
    /** @internal */ readonly structureIsReused: StructureIsReused;

    /** @internal */ getSourceFileFromReference(referencingFile: SourceFile, ref: FileReference): SourceFile | undefined;
    // /** @internal */ getLibFileFromReference(ref: FileReference): SourceFile | undefined;

    // /**
    //  * Given a source file, get the name of the package it was imported from.
    //  *
    //  * @internal
    //  */
    // sourceFileToPackageName: Map<Path, string>;
    // /**
    //  * Set of all source files that some other source file redirects to.
    //  *
    //  * @internal
    //  */
    // redirectTargetsMap: MultiMap<Path, string>;
    // /**
    //  * Whether any (non-external, non-declaration) source files use `node:`-prefixed module specifiers.
    //  *
    //  * @internal
    //  */
    // readonly usesUriStyleNodeCoreModules: boolean;
    /**
     * Map from libFileName to actual resolved location of the lib
     * @internal
     */
    resolvedLibReferences: Map<string, LibResolution> | undefined;
    /** @internal */ getCurrentPackagesMap(): Map<string, boolean> | undefined;
    // /**
    //  * Is the file emitted file
    //  *
    //  * @internal
    //  */
    // isEmittedFile(file: string): boolean;
    // /** @internal */ getFileIncludeReasons(): MultiMap<Path, FileIncludeReason>;
    // /** @internal */ useCaseSensitiveFileNames(): boolean;
    /** @internal */ getCanonicalFileName: GetCanonicalFileName;

    getProjectReferences(): readonly ProjectReference[] | undefined;
    getResolvedProjectReferences(): readonly (ResolvedProjectReference | undefined)[] | undefined;
    // /** @internal */ getProjectReferenceRedirect(fileName: string): string | undefined;
    /**
     * @internal
     * Get the referenced project if the file is input file from that reference project
     */
    getResolvedProjectReferenceToRedirect(fileName: string): ResolvedProjectReference | undefined;
    /** @internal */ forEachResolvedProjectReference<T>(cb: (resolvedProjectReference: ResolvedProjectReference) => T | undefined): T | undefined;
    /** @internal */ getResolvedProjectReferenceByPath(projectReferencePath: Path): ResolvedProjectReference | undefined;
    // /** @internal */ getRedirectReferenceForResolutionFromSourceOfProject(filePath: Path): ResolvedProjectReference | undefined;
    /** @internal */ isSourceOfProjectReferenceRedirect(fileName: string): boolean;
    /** @internal */ getBuildInfo?(): BuildInfo;
    // /** @internal */ emitBuildInfo(writeFile?: WriteFileCallback, cancellationToken?: CancellationToken): EmitResult;
    // /**
    //  * This implementation handles file exists to be true if file is source of project reference redirect when program is created using useSourceOfProjectReferenceRedirect
    //  *
    //  * @internal
    //  */
    // fileExists(fileName: string): boolean;
    // /**
    //  * Call compilerHost.writeFile on host program was created with
    //  *
    //  * @internal
    //  */
    // writeFile: WriteFileCallback;

    /**
     * Gets an array of include directories to search for the specified source filename.
     * @param fileName      
     */
    getIncludeDirs(fileName: string): string[];
    /** @internal */
    masterIncludeApply: (fileName: string) => string[] | undefined;
}

/** @internal */
export interface Program extends TypeCheckerHost, ModuleSpecifierResolutionHost {
}

export interface ModuleResolutionHost {
    // TODO: GH#18217 Optional methods frequently used as non-optional

    fileExists(fileName: string): boolean;
    // readFile function is used to read arbitrary text files on disk, i.e. when resolution procedure needs the content of 'package.json'
    // to determine location of bundled typings for node module
    readFile(fileName: string): string | undefined;
    trace?(s: string): void;
    directoryExists?(directoryName: string): boolean;
    /**
     * Resolve a symbolic link.
     * @see https://nodejs.org/api/fs.html#fs_fs_realpathsync_path_options
     */
    realpath?(path: string): string;
    getCurrentDirectory?(): string;
    getDirectories?(path: string): string[];
    useCaseSensitiveFileNames?: boolean | (() => boolean) | undefined;
}

export interface WriteFileCallbackData {
    /** @internal */ sourceMapUrlPos?: number;
    /** @internal */ buildInfo?: BuildInfo;
    /** @internal */ diagnostics?: readonly DiagnosticWithLocation[];
    /** @internal */ differsOnlyInMap?: true;
    /** @internal */ skippedDtsWrite?: true;
}

export type WriteFileCallback = (
    fileName: string,
    text: string,
    writeByteOrderMark: boolean,
    onError?: (message: string) => void,
    sourceFiles?: readonly SourceFile[],
    data?: WriteFileCallbackData,
) => void;

export interface CompilerHost extends ModuleResolutionHost {
    getSourceFile(fileName: string, languageVersionOrOptions: ScriptTarget | CreateSourceFileOptions, onError?: (message: string) => void, shouldCreateNewSourceFile?: boolean): SourceFile | undefined;
    getSourceFileByPath?(fileName: string, path: Path, languageVersionOrOptions: ScriptTarget | CreateSourceFileOptions, onError?: (message: string) => void, shouldCreateNewSourceFile?: boolean): SourceFile | undefined;
    getSourceTextFromSnapshot(fileName: string): string | undefined;
    getCancellationToken?(): CancellationToken;
    getDefaultLibFileName(options: CompilerOptions): string;
    getDefaultLibLocation?(): string;
    writeFile: WriteFileCallback;
    getCurrentDirectory(): string;
    getCanonicalFileName(fileName: string): string;
    useCaseSensitiveFileNames(): boolean;
    getNewLine(): string;
    readDirectory?(rootDir: string, extensions: readonly string[], excludes: readonly string[] | undefined, includes: readonly string[], depth?: number): string[];

    /*
     * CompilerHost must either implement resolveModuleNames (in case if it wants to be completely in charge of
     * module name resolution) or provide implementation for methods from ModuleResolutionHost (in this case compiler
     * will apply built-in module resolution logic and use members of ModuleResolutionHost to ask host specific questions).
     * If resolveModuleNames is implemented then implementation for members from ModuleResolutionHost can be just
     * 'throw new Error("NotImplemented")'
     */
    /** @deprecated supply resolveModuleNameLiterals instead for resolution that can handle newer resolution modes like nodenext */
    resolveModuleNames?(moduleNames: string[], containingFile: string, reusedNames: string[] | undefined, redirectedReference: ResolvedProjectReference | undefined, options: CompilerOptions, containingSourceFile?: SourceFile): (ResolvedModule | undefined)[];
    /**
     * Returns the module resolution cache used by a provided `resolveModuleNames` implementation so that any non-name module resolution operations (eg, package.json lookup) can reuse it
     */
    getModuleResolutionCache?(): ModuleResolutionCache | undefined;
    
    /**
     * 
     * @param moduleLiterals 
     * @param containingFile 
     * @param redirectedReference 
     * @param options 
     * @param containingSourceFile 
     * @param reusedNames 
     */
    resolveModuleNameLiterals?(
        moduleLiterals: readonly StringLiteral[],
        containingFile: string,
        redirectedReference: ResolvedProjectReference | undefined,
        options: CompilerOptions,
        containingSourceFile: SourceFile,
        reusedNames: readonly StringLiteral[] | undefined,
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
        libFileName: string,
    ): ResolvedModuleWithFailedLookupLocations;
    /**
     * If provided along with custom resolveLibrary, used to determine if we should redo library resolutions
     * @internal
     */
    hasInvalidatedLibResolutions?(libFileName: string): boolean;
    getEnvironmentVariable?(name: string): string | undefined;
    /** @internal */ onReleaseOldSourceFile?(oldSourceFile: SourceFile, oldOptions: CompilerOptions, hasSourceFileByPath: boolean, newSourceFileByResolvedPath: SourceFile | undefined): void;
    /** @internal */ onReleaseParsedCommandLine?(configFileName: string, oldResolvedRef: ResolvedProjectReference | undefined, optionOptions: CompilerOptions): void;    
    /** @internal */ onAllFilesNeedReparse?(fileNames: string[]): void;
    /** If provided along with custom resolveModuleNames or resolveTypeReferenceDirectives, used to determine if unchanged file path needs to re-resolve modules/type reference directives */
    hasInvalidatedResolutions?(filePath: Path): boolean;
    ///** @internal */ hasChangedAutomaticTypeDirectiveNames?: HasChangedAutomaticTypeDirectiveNames;
    createHash?(data: string): string;
    getParsedCommandLine?(fileName: string): ParsedCommandLine | undefined;
    /** @internal */ useSourceOfProjectReferenceRedirect?(): boolean;

    // TODO: later handle this in better way in builder host instead once the api for tsbuild finalizes and doesn't use compilerHost as base
    /** @internal */ createDirectory?(directory: string): void;
    ///** @internal */ getSymlinkCache?(): SymlinkCache;

    // For testing:
    /** @internal */ storeSignatureInfo?: boolean;
    /** @internal */ getBuildInfo?(fileName: string, configFilePath: string | undefined): BuildInfo | undefined;

    jsDocParsingMode?: JSDocParsingMode;    
    /** @internal */ getParseableFiles(): Set<Path>;
}

/** @internal */
export interface BuildInfo {
    version: string;
}


export interface CreateProgramOptions {
    rootNames: readonly string[];
    options: CompilerOptions;
    projectReferences?: readonly ProjectReference[];
    host?: CompilerHost;
    oldProgram?: Program;
    configFileParsingDiagnostics?: readonly Diagnostic[];
    /** @internal */
    typeScriptVersion?: string;
}

export interface GetEffectiveTypeRootsHost {
    getCurrentDirectory?(): string;
}

/**
 * Used by services to specify the minimum host area required to set up source files under any compilation settings
 */
export interface MinimalResolutionCacheHost extends ModuleResolutionHost {
    getCompilationSettings(): CompilerOptions;
    getCompilerHost?(): CompilerHost | undefined;
}

export const enum NewLineKind {
    CarriageReturnLineFeed = 0,
    LineFeed = 1,
}

export interface PrinterOptions {
    removeComments?: boolean;
    newLine?: NewLineKind;
    omitTrailingSemicolon?: boolean;
    noEmitHelpers?: boolean;    
    /** @internal */ module?: CompilerOptions["module"];
    /** @internal */ target?: CompilerOptions["target"];
    /** @internal */ sourceMap?: boolean;
    /** @internal */ inlineSourceMap?: boolean;
    /** @internal */ inlineSources?: boolean;
    /** @internal*/ omitBraceSourceMapPositions?: boolean;
    /** @internal */ extendedDiagnostics?: boolean;
    /** @internal */ onlyPrintJsDocStyle?: boolean;
    /** @internal */ neverAsciiEscape?: boolean;
    /** @internal */ stripInternal?: boolean;
    /** @internal */ preserveSourceNewlines?: boolean;
    /** @internal */ terminateUnterminatedLiterals?: boolean;
}

/** @internal */
export interface RawSourceMap {
    version: 3;
    file: string;
    sourceRoot?: string | null; // eslint-disable-line no-restricted-syntax
    sources: string[];
    sourcesContent?: (string | null)[] | null; // eslint-disable-line no-restricted-syntax
    mappings: string;
    names?: string[] | null; // eslint-disable-line no-restricted-syntax
}


/** @internal */
export interface SourceMapEmitResult {
    inputSourceFileNames: readonly string[]; // Input source file (which one can use on program to get the file), 1:1 mapping with the sourceMap.sources list
    sourceMap: RawSourceMap;
}


export interface EmitResult {
    emitSkipped: boolean;
    /** Contains declaration emit diagnostics */
    diagnostics: readonly Diagnostic[];
    emittedFiles?: string[]; // Array of files the compiler wrote to disk
    /** @internal */ sourceMaps?: SourceMapEmitResult[]; // Array of sourceMapData if compiler emitted sourcemaps
}

export enum WatchFileKind {
    FixedPollingInterval,
    PriorityPollingInterval,
    DynamicPriorityPolling,
    FixedChunkSizePolling,
    UseFsEvents,
    UseFsEventsOnParentDirectory,
}

export enum WatchDirectoryKind {
    UseFsEvents,
    FixedPollingInterval,
    DynamicPriorityPolling,
    FixedChunkSizePolling,
}

export enum PollingWatchKind {
    FixedInterval,
    PriorityInterval,
    DynamicPriority,
    FixedChunkSize,
}

export interface WatchOptions {
    watchFile?: WatchFileKind;
    watchDirectory?: WatchDirectoryKind;
    fallbackPolling?: PollingWatchKind;
    synchronousWatchDirectory?: boolean;
    excludeDirectories?: string[];
    excludeFiles?: string[];

    [option: string]: CompilerOptionsValue | undefined;
}

export const enum WatchDirectoryFlags {
    None = 0,
    Recursive = 1 << 0,
}


/** @internal */
export type ModuleImportResult<T = {}> =
    | { module: T; modulePath?: string; error: undefined; }
    | { module: undefined; modulePath?: undefined; error: { stack?: string; message?: string; }; };

/** @internal */
export const enum StructureIsReused {
    Not,
    SafeModules,
    Completely,
}

/**
 * Unique identifier with a package name and version.
 * If changing this, remember to change `packageIdIsEqual`.
 */
export interface PackageId {
    /**
     * Name of the package.
     * Should not include `@types`.
     * If accessing a non-index file, this should include its name e.g. "foo/bar".
     */
    name: string;
    /**
     * Name of a submodule within this package.
     * May be "".
     */
    subModuleName: string;
    /** Version of the package, e.g. "1.2.3" */
    version: string;
    /** @internal*/ peerDependencies?: string;
}

/** @internal */
export const enum FilePreprocessingDiagnosticsKind {
    FilePreprocessingLibReferenceDiagnostic,
    FilePreprocessingFileExplainingDiagnostic,
    ResolutionDiagnostics,
}


/** @internal */
export interface FilePreprocessingLibReferenceDiagnostic {
    kind: FilePreprocessingDiagnosticsKind.FilePreprocessingLibReferenceDiagnostic;
    reason: ReferencedFile & { kind: FileIncludeKind.LibReferenceDirective; };
}

/** @internal */
export interface FilePreprocessingFileExplainingDiagnostic {
    kind: FilePreprocessingDiagnosticsKind.FilePreprocessingFileExplainingDiagnostic;
    file: Path | undefined;
    fileProcessingReason: FileIncludeReason;
    diagnostic: DiagnosticMessage;
    args: DiagnosticArguments;
}

/** @internal */
export interface ResolutionDiagnostics {
    kind: FilePreprocessingDiagnosticsKind.ResolutionDiagnostics;
    diagnostics: readonly Diagnostic[];
}


/** @internal */
export type FilePreprocessingDiagnostics = FilePreprocessingLibReferenceDiagnostic | FilePreprocessingFileExplainingDiagnostic | ResolutionDiagnostics;

export const enum ScriptKind {
    Unknown = 0,
    LPC = 1,    
    External = 5,
    JSON = 6,
    /**
     * Used on extensions that doesn't define the ScriptKind but the content defines it.
     * Deferred extensions are going to be included in all project contexts.
     */
    Deferred = 7,
}

export const enum ScriptTarget {
    LPC = 1,    
    JavaScript = 2,
    JSON = 3,
    Latest = LPC,
}

export enum ModuleKind {
    None = 0,
    LPC = 1,
}

export enum ModuleResolutionKind {
    Classic = 1,
}

export type ResolutionMode = ModuleKind.LPC | undefined;


// NOTE: If modifying this enum, must modify `TypeFormatFlags` too!
// dprint-ignore
// @ts-ignore

export const enum NodeBuilderFlags {
    None                                    = 0,
    // Options
    NoTruncation                            = 1 << 0,   // Don't truncate result
    WriteArrayAsGenericType                 = 1 << 1,   // Write Array<T> instead T[]
    GenerateNamesForShadowedTypeParams      = 1 << 2,   // When a type parameter T is shadowing another T, generate a name for it so it can still be referenced
    UseStructuralFallback                   = 1 << 3,   // When an alias cannot be named by its symbol, rather than report an error, fallback to a structural printout if possible
    ForbidIndexedAccessSymbolReferences     = 1 << 4,   // Forbid references like `I["a"]["b"]` - print `typeof I.a<x>.b<y>` instead
    WriteTypeArgumentsOfSignature           = 1 << 5,   // Write the type arguments instead of type parameters of the signature
    UseFullyQualifiedType                   = 1 << 6,   // Write out the fully qualified type name (eg. Module.Type, instead of Type)
    UseOnlyExternalAliasing                 = 1 << 7,   // Only use external aliases for a symbol
    SuppressAnyReturnType                   = 1 << 8,   // If the return type is any-like and can be elided, don't offer a return type.
    WriteTypeParametersInQualifiedName      = 1 << 9,
    MultilineObjectLiterals                 = 1 << 10,  // Always write object literals across multiple lines
    WriteClassExpressionAsTypeLiteral       = 1 << 11,  // Write class {} as { new(): {} } - used for mixin declaration emit
    UseTypeOfFunction                       = 1 << 12,  // Build using typeof instead of function type literal
    OmitParameterModifiers                  = 1 << 13,  // Omit modifiers on parameters
    UseAliasDefinedOutsideCurrentScope      = 1 << 14,  // Allow non-visible aliases
    UseSingleQuotesForStringLiteralType     = 1 << 28,  // Use single quotes for string literal type
    NoTypeReduction                         = 1 << 29,  // Don't call getReducedType
    OmitThisParameter                       = 1 << 25,

    // Error handling
    AllowThisInObjectLiteral                = 1 << 15,
    AllowQualifiedNameInPlaceOfIdentifier   = 1 << 16,
    AllowAnonymousIdentifier                = 1 << 17,
    AllowEmptyUnionOrIntersection           = 1 << 18,
    AllowEmptyTuple                         = 1 << 19,
    AllowUniqueESSymbolType                 = 1 << 20,
    AllowEmptyIndexInfoType                 = 1 << 21,
    /** @internal */ WriteComputedProps     = 1 << 30, // { [E.A]: 1 }
    /** @internal */ NoSyntacticPrinter     = 1 << 31,
    // Errors (cont.)
    AllowNodeModulesRelativePaths           = 1 << 26,
    /** @internal */ DoNotIncludeSymbolChain = 1 << 27,    // Skip looking up and printing an accessible symbol chain            
    /** @internal */ AllowUnresolvedNames   = 1 << 32, 
    
    IgnoreErrors = AllowThisInObjectLiteral | AllowQualifiedNameInPlaceOfIdentifier | AllowAnonymousIdentifier | AllowEmptyUnionOrIntersection | AllowEmptyTuple | AllowEmptyIndexInfoType | AllowNodeModulesRelativePaths,

    // State
    InObjectTypeLiteral                     = 1 << 22,
    InTypeAlias                             = 1 << 23,    // Writing type in type alias declaration
    InInitialEntityName                     = 1 << 24,    // Set when writing the LHS of an entity name or entity name expression
}

/**
 * Ternary values are defined such that
 * x & y picks the lesser in the order False < Unknown < Maybe < True, and
 * x | y picks the greater in the order False < Unknown < Maybe < True.
 * Generally, Ternary.Maybe is used as the result of a relation that depends on itself, and
 * Ternary.Unknown is used as the result of a variance check that depends on itself. We make
 * a distinction because we don't want to cache circular variance check results.
 *
 * @internal
 */
export const enum Ternary {
    False = 0,
    Unknown = 1,
    Maybe = 3,
    True = -1,
}

export interface ComputedPropertyName extends Node {
    readonly kind: SyntaxKind.ComputedPropertyName;
    readonly parent: Declaration;
    readonly expression: Expression;
}

export type ModuleExportName = Identifier | StringLiteral;

export interface QualifiedName extends Node, FlowContainer {
    readonly kind: SyntaxKind.QualifiedName;
    readonly left: EntityName;
    readonly right: Identifier;
}


// Note: this used to be deprecated in our public API, but is still used internally
/** @internal */
export interface SymbolTracker {
    // Called when the symbol writer encounters a symbol to write.  Currently only used by the
    // declaration emitter to help determine if it should patch up the final declaration file
    // with import statements it previously saw (but chose not to emit).
    trackSymbol?(symbol: Symbol, enclosingDeclaration: Node | undefined, meaning: SymbolFlags): boolean;
    reportInaccessibleThisError?(): void;
    reportPrivateInBaseOfClassExpression?(propertyName: string): void;
    reportInaccessibleUniqueSymbolError?(): void;
    reportCyclicStructureError?(): void;
    reportLikelyUnsafeImportRequiredError?(specifier: string): void;
    reportTruncationError?(): void;
    moduleResolverHost?: ModuleSpecifierResolutionHost & { getCommonSourceDirectory(): string; };
    reportNonlocalAugmentation?(containingFile: SourceFile, parentSymbol: Symbol, augmentingSymbol: Symbol): void;
    reportNonSerializableProperty?(propertyName: string): void;
    reportInferenceFallback?(node: Node): void;
}

export interface MappedTypeNode extends TypeNode, Declaration, LocalsContainer {
    readonly kind: SyntaxKind.MappedType;
    readonly readonlyToken?: PlusToken | MinusToken;
    readonly typeParameter: TypeParameterDeclaration;
    readonly nameType?: TypeNode;
    //readonly questionToken?: QuestionToken | PlusToken | MinusToken;
    readonly type?: TypeNode;
    /** Used only to produce grammar errors */
    readonly members?: NodeArray<TypeElement>;
}

/** @internal */
export interface MappedType extends AnonymousType {
    declaration: MappedTypeNode;
    typeParameter?: TypeParameter;
    constraintType?: Type;
    nameType?: Type;
    templateType?: Type;
    modifiersType?: Type;
    resolvedApparentType?: Type;
    containsError?: boolean;
}

/** @internal */
export interface ReverseMappedSymbolLinks extends TransientSymbolLinks {
    propertyType: Type;
    mappedType: MappedType;
    constraintType: IndexType;
}

/** @internal */
export interface ReverseMappedSymbol extends TransientSymbol {
    links: ReverseMappedSymbolLinks;
}

/** @internal */
// An instantiated anonymous type has a target and a mapper
export interface AnonymousType extends ObjectType {
    target?: AnonymousType; // Instantiation target
    mapper?: TypeMapper; // Instantiation mapper
    instantiations?: Map<string, Type>; // Instantiations of generic type alias (undefined if non-generic)
}


/** @internal */
export const enum InternalEmitFlags {
    None = 0,
    TypeScriptClassWrapper = 1 << 0, // The node is an IIFE class wrapper created by the ts transform.
    NeverApplyImportHelper = 1 << 1, // Indicates the node should never be wrapped with an import star helper (because, for example, it imports tslib itself)
    IgnoreSourceNewlines = 1 << 2,   // Overrides `printerOptions.preserveSourceNewlines` to print this node (and all descendants) with default whitespace.
    Immutable = 1 << 3,              // Indicates a node is a singleton intended to be reused in multiple locations. Any attempt to make further changes to the node will result in an error.
    IndirectCall = 1 << 4,           // Emit CallExpression as an indirect call: `(0, f)()`
    TransformPrivateStaticElements = 1 << 5, // Indicates static private elements in a file or class should be transformed regardless of --target (used by esDecorators transform)
}

/** @internal */
export interface WideningContext {
    parent?: WideningContext;       // Parent context
    propertyName?: string;        // Name of property in parent
    siblings?: Type[];              // Types of siblings
    resolvedProperties?: Symbol[];  // Properties occurring in sibling object literals
}

export const enum EmitHint {
    SourceFile,              // Emitting a SourceFile
    Expression,              // Emitting an Expression
    IdentifierName,          // Emitting an IdentifierName
    MappedTypeParameter,     // Emitting a TypeParameterDeclaration inside of a MappedTypeNode
    Unspecified,             // Emitting an otherwise unspecified node
    EmbeddedStatement,       // Emitting an embedded statement
    JsxAttributeValue,       // Emitting a JSX attribute value
    ImportTypeNodeAttributes,// Emitting attributes as part of an ImportTypeNode
}

export const enum ListFormat {
    None = 0,

    // Line separators
    SingleLine = 0,                 // Prints the list on a single line (default).
    MultiLine = 1 << 0,             // Prints the list on multiple lines.
    PreserveLines = 1 << 1,         // Prints the list using line preservation if possible.
    LinesMask = SingleLine | MultiLine | PreserveLines,

    // Delimiters
    NotDelimited = 0,               // There is no delimiter between list items (default).
    BarDelimited = 1 << 2,          // Each list item is space-and-bar (" |") delimited.
    AmpersandDelimited = 1 << 3,    // Each list item is space-and-ampersand (" &") delimited.
    CommaDelimited = 1 << 4,        // Each list item is comma (",") delimited.
    AsteriskDelimited = 1 << 5,     // Each list item is asterisk ("\n *") delimited, used with JSDoc.
    DelimitersMask = BarDelimited | AmpersandDelimited | CommaDelimited | AsteriskDelimited,

    AllowTrailingComma = 1 << 6,    // Write a trailing comma (",") if present.

    // Whitespace
    Indented = 1 << 7,              // The list should be indented.
    SpaceBetweenBraces = 1 << 8,    // Inserts a space after the opening brace and before the closing brace.
    SpaceBetweenSiblings = 1 << 9,  // Inserts a space between each sibling node.

    // Brackets/Braces
    Braces = 1 << 10,                // The list is surrounded by "{" and "}".
    Parenthesis = 1 << 11,          // The list is surrounded by "(" and ")".
    AngleBrackets = 1 << 12,        // The list is surrounded by "<" and ">".
    SquareBrackets = 1 << 13,       // The list is surrounded by "[" and "]".
    ArrayBrackets = 1 << 22,        // The list is surrounded by "({" and "})".
    BracketsMask = Braces | Parenthesis | AngleBrackets | SquareBrackets | ArrayBrackets,

    OptionalIfUndefined = 1 << 14,  // Do not emit brackets if the list is undefined.
    OptionalIfEmpty = 1 << 15,      // Do not emit brackets if the list is empty.
    Optional = OptionalIfUndefined | OptionalIfEmpty,

    // Other
    PreferNewLine = 1 << 16,        // Prefer adding a LineTerminator between synthesized nodes.
    NoTrailingNewLine = 1 << 17,    // Do not emit a trailing NewLine for a MultiLine list.
    NoInterveningComments = 1 << 18, // Do not emit comments between each node
    NoSpaceIfEmpty = 1 << 19,       // If the literal is empty, do not add spaces between braces.
    SingleElement = 1 << 20,
    SpaceAfterList = 1 << 21,       // Add space after list

    // Precomputed Formats
    Modifiers = SingleLine | SpaceBetweenSiblings | NoInterveningComments | SpaceAfterList,
    HeritageClauses = SingleLine | SpaceBetweenSiblings,
    SingleLineTypeLiteralMembers = SingleLine | SpaceBetweenBraces | SpaceBetweenSiblings,
    MultiLineTypeLiteralMembers = MultiLine | Indented | OptionalIfEmpty,

    SingleLineTupleTypeElements = CommaDelimited | SpaceBetweenSiblings | SingleLine,
    MultiLineTupleTypeElements = CommaDelimited | Indented | SpaceBetweenSiblings | MultiLine,
    UnionTypeConstituents = BarDelimited | SpaceBetweenSiblings | SingleLine,
    IntersectionTypeConstituents = AmpersandDelimited | SpaceBetweenSiblings | SingleLine,
    ObjectBindingPatternElements = SingleLine | AllowTrailingComma | SpaceBetweenBraces | CommaDelimited | SpaceBetweenSiblings | NoSpaceIfEmpty,
    ArrayBindingPatternElements = SingleLine | AllowTrailingComma | CommaDelimited | SpaceBetweenSiblings | NoSpaceIfEmpty,
    ObjectLiteralExpressionProperties = PreserveLines | CommaDelimited | SpaceBetweenSiblings | SpaceBetweenBraces | Indented | Braces | NoSpaceIfEmpty,
    ImportAttributes = PreserveLines | CommaDelimited | SpaceBetweenSiblings | SpaceBetweenBraces | Indented | Braces | NoSpaceIfEmpty,
    /** @deprecated */ ImportClauseEntries = ImportAttributes,
    ArrayLiteralExpressionElements = PreserveLines | CommaDelimited | SpaceBetweenSiblings | AllowTrailingComma | Indented | ArrayBrackets,
    JsArrayLiteralExpressionElements = PreserveLines | CommaDelimited | SpaceBetweenSiblings | AllowTrailingComma | Indented | SquareBrackets,
    CommaListElements = CommaDelimited | SpaceBetweenSiblings | SingleLine,
    CallExpressionArguments = CommaDelimited | SpaceBetweenSiblings | SingleLine | Parenthesis,
    NewExpressionArguments = CommaDelimited | SpaceBetweenSiblings | SingleLine | Parenthesis | OptionalIfUndefined,
    TemplateExpressionSpans = SingleLine | NoInterveningComments,
    SingleLineBlockStatements = SpaceBetweenBraces | SpaceBetweenSiblings | SingleLine,
    MultiLineBlockStatements = Indented | MultiLine,
    VariableDeclarationList = CommaDelimited | SpaceBetweenSiblings | SingleLine,
    SingleLineFunctionBodyStatements = SingleLine | SpaceBetweenSiblings | SpaceBetweenBraces,
    MultiLineFunctionBodyStatements = MultiLine,
    ClassHeritageClauses = SingleLine,
    ClassMembers = Indented | MultiLine,
    InterfaceMembers = Indented | MultiLine,
    EnumMembers = CommaDelimited | Indented | MultiLine,
    CaseBlockClauses = Indented | MultiLine,
    NamedImportsOrExportsElements = CommaDelimited | SpaceBetweenSiblings | AllowTrailingComma | SingleLine | SpaceBetweenBraces | NoSpaceIfEmpty,
    JsxElementOrFragmentChildren = SingleLine | NoInterveningComments,
    JsxElementAttributes = SingleLine | SpaceBetweenSiblings | NoInterveningComments,
    CaseOrDefaultClauseStatements = Indented | MultiLine | NoTrailingNewLine | OptionalIfEmpty,
    HeritageClauseTypes = CommaDelimited | SpaceBetweenSiblings | SingleLine,
    SourceFileStatements = MultiLine | NoTrailingNewLine,
    Decorators = MultiLine | Optional | SpaceAfterList,
    TypeArguments = CommaDelimited | SpaceBetweenSiblings | SingleLine | AngleBrackets | Optional,
    TypeParameters = CommaDelimited | SpaceBetweenSiblings | SingleLine | AngleBrackets | Optional,
    Parameters = CommaDelimited | SpaceBetweenSiblings | SingleLine | Parenthesis,
    IndexSignatureParameters = CommaDelimited | SpaceBetweenSiblings | SingleLine | Indented | SquareBrackets,
    JSDocComment = MultiLine | AsteriskDelimited,
}

export interface Bundle extends Node {
    readonly kind: SyntaxKind.Bundle;
    readonly sourceFiles: readonly SourceFile[];
    /** @internal */ syntheticFileReferences?: readonly FileReference[];
    /** @internal */ syntheticTypeReferences?: readonly FileReference[];
    /** @internal */ syntheticLibReferences?: readonly FileReference[];
    /** @internal */ hasNoDefaultLib?: boolean;
}

export interface Printer {
    /**
     * Print a node and its subtree as-is, without any emit transformations.
     * @param hint A value indicating the purpose of a node. This is primarily used to
     * distinguish between an `Identifier` used in an expression position, versus an
     * `Identifier` used as an `IdentifierName` as part of a declaration. For most nodes you
     * should just pass `Unspecified`.
     * @param node The node to print. The node and its subtree are printed as-is, without any
     * emit transformations.
     * @param sourceFile A source file that provides context for the node. The source text of
     * the file is used to emit the original source content for literals and identifiers, while
     * the identifiers of the source file are used when generating unique names to avoid
     * collisions.
     */
    printNode(hint: EmitHint, node: Node, sourceFile: SourceFile): string;
    /**
     * Prints a list of nodes using the given format flags
     */
    printList<T extends Node>(format: ListFormat, list: NodeArray<T>, sourceFile: SourceFile): string;
    /**
     * Prints a source file as-is, without any emit transformations.
     */
    printFile(sourceFile: SourceFile): string;
    /**
     * Prints a bundle of source files as-is, without any emit transformations.
     */
    printBundle(bundle: Bundle): string;
    /** @internal */ writeNode(hint: EmitHint, node: Node, sourceFile: SourceFileBase | undefined, writer: EmitTextWriter): void;
    /** @internal */ writeList<T extends Node>(format: ListFormat, list: NodeArray<T> | undefined, sourceFile: SourceFile | undefined, writer: EmitTextWriter): void;
    /** @internal */ writeFile(sourceFile: SourceFile, writer: EmitTextWriter, sourceMapGenerator: SourceMapGenerator | undefined): void;
    /** @internal */ writeBundle(bundle: Bundle, writer: EmitTextWriter, sourceMapGenerator: SourceMapGenerator | undefined): void;
}


/**
 * Generates a source map.
 *
 * @internal
 */
export interface SourceMapGenerator {
    getSources(): readonly string[];
    /**
     * Adds a source to the source map.
     */
    addSource(fileName: string): number;
    /**
     * Set the content for a source.
     */
    setSourceContent(sourceIndex: number, content: string | null): void; // eslint-disable-line no-restricted-syntax
    /**
     * Adds a name.
     */
    addName(name: string): number;
    /**
     * Adds a mapping without source information.
     */
    addMapping(generatedLine: number, generatedCharacter: number): void;
    /**
     * Adds a mapping with source information.
     */
    addMapping(generatedLine: number, generatedCharacter: number, sourceIndex: number, sourceLine: number, sourceCharacter: number, nameIndex?: number): void;
    /**
     * Appends a source map.
     */
    appendSourceMap(generatedLine: number, generatedCharacter: number, sourceMap: RawSourceMap, sourceMapPath: string, start?: LineAndCharacter, end?: LineAndCharacter): void;
    /**
     * Gets the source map as a `RawSourceMap` object.
     */
    toJSON(): RawSourceMap;
    /**
     * Gets the string representation of the source map.
     */
    toString(): string;
}

export interface PrintHandlers {
    /**
     * A hook used by the Printer when generating unique names to avoid collisions with
     * globally defined names that exist outside of the current source file.
     */
    hasGlobalName?(name: string): boolean;
    /**
     * A hook used by the Printer to provide notifications prior to emitting a node. A
     * compatible implementation **must** invoke `emitCallback` with the provided `hint` and
     * `node` values.
     * @param hint A hint indicating the intended purpose of the node.
     * @param node The node to emit.
     * @param emitCallback A callback that, when invoked, will emit the node.
     * @example
     * ```ts
     * var printer = createPrinter(printerOptions, {
     *   onEmitNode(hint, node, emitCallback) {
     *     // set up or track state prior to emitting the node...
     *     emitCallback(hint, node);
     *     // restore state after emitting the node...
     *   }
     * });
     * ```
     */
    onEmitNode?(hint: EmitHint, node: Node, emitCallback: (hint: EmitHint, node: Node) => void): void;

    /**
     * A hook used to check if an emit notification is required for a node.
     * @param node The node to emit.
     */
    isEmitNotificationEnabled?(node: Node): boolean;
    /**
     * A hook used by the Printer to perform just-in-time substitution of a node. This is
     * primarily used by node transformations that need to substitute one node for another,
     * such as replacing `myExportedVar` with `exports.myExportedVar`.
     * @param hint A hint indicating the intended purpose of the node.
     * @param node The node to emit.
     * @example
     * ```ts
     * var printer = createPrinter(printerOptions, {
     *   substituteNode(hint, node) {
     *     // perform substitution if necessary...
     *     return node;
     *   }
     * });
     * ```
     */
    substituteNode?(hint: EmitHint, node: Node): Node;
    /** @internal */ onEmitSourceMapOfNode?: (hint: EmitHint, node: Node, emitCallback: (hint: EmitHint, node: Node) => void) => void;
    /** @internal */ onEmitSourceMapOfToken?: (node: Node | undefined, token: SyntaxKind, writer: (s: string) => void, pos: number, emitCallback: (token: SyntaxKind, writer: (s: string) => void, pos: number) => number) => number;
    /** @internal */ onEmitSourceMapOfPosition?: (pos: number) => void;
    /** @internal */ onSetSourceFile?: (node: SourceFile) => void;
    /** @internal */ onBeforeEmitNode?: (node: Node | undefined) => void;
    /** @internal */ onAfterEmitNode?: (node: Node | undefined) => void;
    /** @internal */ onBeforeEmitNodeArray?: (nodes: NodeArray<any> | undefined) => void;
    /** @internal */ onAfterEmitNodeArray?: (nodes: NodeArray<any> | undefined) => void;
    /** @internal */ onBeforeEmitToken?: (node: Node) => void;
    /** @internal */ onAfterEmitToken?: (node: Node) => void;
}

export interface SourceMapSource {
    fileName: string;
    text: string;
    /** @internal */ lineMap: readonly number[];
    skipTrivia?: (pos: number) => number;


    /** @internal */ path?: Path;
    /** @internal */ languageVersion?: ScriptTarget;
    /** @internal */ languageVariant?: LanguageVariant;
}

/** @internal */
export interface ParenthesizerRules {
    getParenthesizeLeftSideOfBinaryForOperator(binaryOperator: SyntaxKind): (leftSide: Expression) => Expression;
    getParenthesizeRightSideOfBinaryForOperator(binaryOperator: SyntaxKind): (rightSide: Expression) => Expression;
    parenthesizeLeftSideOfBinary(binaryOperator: SyntaxKind, leftSide: Expression): Expression;
    parenthesizeRightSideOfBinary(binaryOperator: SyntaxKind, leftSide: Expression | undefined, rightSide: Expression): Expression;
    parenthesizeExpressionOfComputedPropertyName(expression: Expression): Expression;
    parenthesizeConditionOfConditionalExpression(condition: Expression): Expression;
    parenthesizeBranchOfConditionalExpression(branch: Expression): Expression;
    parenthesizeExpressionOfExportDefault(expression: Expression): Expression;
    parenthesizeExpressionOfNew(expression: Expression): LeftHandSideExpression;
    parenthesizeLeftSideOfAccess(expression: Expression, optionalChain?: boolean): LeftHandSideExpression;
    parenthesizeOperandOfPostfixUnary(operand: Expression): LeftHandSideExpression;
    parenthesizeOperandOfPrefixUnary(operand: Expression): UnaryExpression;
    parenthesizeExpressionsOfCommaDelimitedList(elements: readonly Expression[]): NodeArray<Expression>;
    parenthesizeExpressionForDisallowedComma(expression: Expression): Expression;
    parenthesizeExpressionOfExpressionStatement(expression: Expression): Expression;
    parenthesizeConciseBodyOfArrowFunction(body: Expression): Expression;
    parenthesizeConciseBodyOfArrowFunction(body: ConciseBody): ConciseBody;
    parenthesizeCheckTypeOfConditionalType(type: TypeNode): TypeNode;
    parenthesizeExtendsTypeOfConditionalType(type: TypeNode): TypeNode;
    parenthesizeOperandOfTypeOperator(type: TypeNode): TypeNode;
    parenthesizeOperandOfReadonlyTypeOperator(type: TypeNode): TypeNode;
    parenthesizeNonArrayTypeOfPostfixType(type: TypeNode): TypeNode;
    // parenthesizeElementTypesOfTupleType(types: readonly (TypeNode | NamedTupleMember)[]): NodeArray<TypeNode>;
    // parenthesizeElementTypeOfTupleType(type: TypeNode | NamedTupleMember): TypeNode | NamedTupleMember;
    parenthesizeTypeOfOptionalType(type: TypeNode): TypeNode;
    parenthesizeConstituentTypeOfUnionType(type: TypeNode): TypeNode;
    parenthesizeConstituentTypesOfUnionType(constituents: readonly TypeNode[]): NodeArray<TypeNode>;
    parenthesizeConstituentTypeOfIntersectionType(type: TypeNode): TypeNode;
    parenthesizeConstituentTypesOfIntersectionType(constituents: readonly TypeNode[]): NodeArray<TypeNode>;
    parenthesizeLeadingTypeArgument(typeNode: TypeNode): TypeNode;
    parenthesizeTypeArguments(typeParameters: readonly TypeNode[] | undefined): NodeArray<TypeNode> | undefined;
}

/**
 * A list of comma-separated expressions. This node is only created by transformations.
 */
export interface CommaListExpression extends Expression {
    readonly kind: SyntaxKind.CommaListExpression;
    readonly elements: NodeArray<Expression>;
}

export interface ParenthesizedTypeNode extends TypeNode {
    readonly kind: SyntaxKind.ParenthesizedType;
    readonly type: TypeNode;
}

export type VariableLikeDeclaration =
    | VariableDeclaration
    | ParameterDeclaration
    | BindingElement
    | PropertyDeclaration
    | PropertyAssignment    
    | ShorthandPropertyAssignment    
    | JSDocPropertyTag    
    | JSDocParameterTag;
    

/** @internal */
export type AliasDeclarationNode =
    //| ImportEqualsDeclaration
    | VariableDeclarationInitializedTo<
        //| RequireOrImportCall
        | AccessExpression
    >
    // | ImportClause
    // | NamespaceImport
    // | ImportSpecifier
    // | ExportSpecifier
    // | NamespaceExport
    | BindingElementOfBareOrAccessedRequire;
    ;

/** @internal */
export type BindingElementOfBareOrAccessedRequire = BindingElement & { parent: { parent: VariableDeclarationInitializedTo</*RequireOrImportCall | */ AccessExpression>; }; };

/** Class and interface types (ObjectFlags.Class and ObjectFlags.Interface). */
// dprint-ignore
export interface InterfaceType extends ObjectType {
    typeParameters: TypeParameter[] | undefined;      // Type parameters (undefined if non-generic)
    outerTypeParameters: TypeParameter[] | undefined; // Outer type parameters (undefined if none)
    localTypeParameters: TypeParameter[] | undefined; // Local type parameters (undefined if none)
    thisType: TypeParameter | undefined;              // The "this" type (undefined if none)
    /** @internal */
    resolvedBaseConstructorType?: Type;               // Resolved base constructor type of class
    /** @internal */
    resolvedBaseTypes: BaseType[];                    // Resolved base types
    /** @internal */
    baseTypesResolved?: boolean;
}

export interface HeritageClause extends Node {
    readonly kind: SyntaxKind.HeritageClause;
    readonly parent: StructDeclaration | ClassLikeDeclaration;
    // readonly token?: SyntaxKind.ExtendsKeyword | SyntaxKind.ImplementsKeyword;
    readonly types: NodeArray<Expression>;
}

// Generic class and interface types
export interface GenericType extends InterfaceType, TypeReference {
    /** @internal */
    instantiations: Map<string, TypeReference>; // Generic instantiation cache
    /** @internal */
    variances?: VarianceFlags[]; // Variance of each type parameter
}


/**
 * Type references (ObjectFlags.Reference). When a class or interface has type parameters or
 * a "this" type, references to the class or interface are made using type references. The
 * typeArguments property specifies the types to substitute for the type parameters of the
 * class or interface and optionally includes an extra element that specifies the type to
 * substitute for "this" in the resulting instantiation. When no extra argument is present,
 * the type reference itself is substituted for "this". The typeArguments property is undefined
 * if the class or interface has no type parameters and the reference isn't specifying an
 * explicit "this" argument.
 */
export interface TypeReference extends ObjectType {
    target: GenericType; // Type reference target
    node?: TypeReferenceNode | ArrayTypeNode | TupleTypeNode;
    /** @internal */
    mapper?: TypeMapper;
    /** @internal */
    resolvedTypeArguments?: readonly Type[]; // Resolved type reference type arguments
    /** @internal */
    literalType?: TypeReference; // Clone of type with ObjectFlags.ArrayLiteral set
    /** @internal */
    cachedEquivalentBaseType?: Type; // Only set on references to class or interfaces with a single base type and no augmentations
}

export type TypeReferenceType = TypeReferenceNode | StructTypeNode | ExpressionWithTypeArguments;

export interface FunctionOrConstructorTypeNodeBase extends TypeNode, SignatureDeclarationBase {
    readonly kind: SyntaxKind.FunctionType;
    readonly type: TypeNode;
}


export interface FunctionTypeNode extends FunctionOrConstructorTypeNodeBase, LocalsContainer {
    readonly kind: SyntaxKind.FunctionType;

    // A function type cannot have modifiers
    /** @internal */ readonly modifiers?: undefined;
}

export interface NodeWithTypeArguments extends TypeNode {
    readonly typeArguments?: NodeArray<TypeNode>;
}


export interface TypeReferenceNode extends NodeWithTypeArguments {
    readonly kind: SyntaxKind.TypeReference;
    readonly typeName: EntityName;
}

// dprint-ignore
/** @internal */
export const enum ContextFlags {
    None           = 0,
    Signature      = 1 << 0, // Obtaining contextual signature
    NoConstraints  = 1 << 1, // Don't obtain type variable constraints
    Completions    = 1 << 2, // Ignore inference to current node and parent nodes out to the containing call for completions
    SkipBindingPatterns = 1 << 3, // Ignore contextual types applied by binding patterns
}

export const enum InferencePriority {
    None                         = 0,
    NakedTypeVariable            = 1 << 0,  // Naked type variable in union or intersection type
    SpeculativeTuple             = 1 << 1,  // Speculative tuple inference
    SubstituteSource             = 1 << 2,  // Source of inference originated within a substitution type's substitute
    HomomorphicMappedType        = 1 << 3,  // Reverse inference for homomorphic mapped type
    PartialHomomorphicMappedType = 1 << 4,  // Partial reverse inference for homomorphic mapped type
    MappedTypeConstraint         = 1 << 5,  // Reverse inference for mapped type
    ContravariantConditional     = 1 << 6,  // Conditional type in contravariant position
    ReturnType                   = 1 << 7,  // Inference made from return type of generic function
    LiteralKeyof                 = 1 << 8,  // Inference made from a string literal to a keyof T
    NoConstraints                = 1 << 9,  // Don't infer from constraints of instantiable types
    AlwaysStrict                 = 1 << 10, // Always use strict rules for contravariant inferences
    MaxValue                     = 1 << 11, // Seed for inference priority tracking

    PriorityImpliesCombination = ReturnType | MappedTypeConstraint | LiteralKeyof, // These priorities imply that the resulting type should be a combination of all candidates
    Circularity = -1,  // Inference circularity (value less than all other priorities)
}

export interface InferTypeNode extends TypeNode {
    readonly kind: SyntaxKind.InferType;
    readonly typeParameter: TypeParameterDeclaration;
}

/** @internal */
export interface InferenceInfo {
    typeParameter: TypeParameter;            // Type parameter for which inferences are being made
    candidates: Type[] | undefined;          // Candidates in covariant positions (or undefined)
    contraCandidates: Type[] | undefined;    // Candidates in contravariant positions (or undefined)
    inferredType?: Type;                     // Cache for resolved inferred type
    priority?: InferencePriority;            // Priority of current inference set
    topLevel: boolean;                       // True if all inferences are to top level occurrences
    isFixed: boolean;                        // True if inferences are fixed
    impliedArity?: number;
}

/** @internal */
export type TypeComparer = (s: Type, t: Type, reportErrors?: boolean) => Ternary;

/** @internal */
export const enum InferenceFlags {
    None            =      0,  // No special inference behaviors
    NoDefault       = 1 << 0,  // Infer silentNeverType for no inferences (otherwise anyType or unknownType)
    AnyDefault      = 1 << 1,  // Infer anyType (in JS files) for no inferences (otherwise unknownType)
    SkippedGenericFunction = 1 << 2, // A generic function was skipped during inference
}

/** @internal */
export interface IntraExpressionInferenceSite {
    node: Expression /*| MethodDeclaration*/;
    type: Type;
}

/** @internal */
export interface InferenceContext {
    inferences: InferenceInfo[];                  // Inferences made for each type parameter
    signature?: Signature;                        // Generic signature for which inferences are made (if any)
    flags: InferenceFlags;                        // Inference flags
    compareTypes: TypeComparer;                   // Type comparer function
    mapper: TypeMapper;                           // Mapper that fixes inferences
    nonFixingMapper: TypeMapper;                  // Mapper that doesn't fix inferences
    returnMapper?: TypeMapper;                    // Type mapper for inferences from return types (if any)
    inferredTypeParameters?: readonly TypeParameter[]; // Inferred type parameters for function result
    intraExpressionInferenceSites?: IntraExpressionInferenceSite[];
}

/** @internal */
export interface ReverseMappedType extends ObjectType {
    source: Type;
    mappedType: MappedType;
    constraintType: IndexType;
}

export interface DeferredTypeReference extends TypeReference {
    /** @internal */
    node: TypeReferenceNode | ArrayTypeNode | TupleTypeNode;
    /** @internal */
    mapper?: TypeMapper;
    /** @internal */
    instantiations?: Map<string, Type>; // Instantiations of generic type alias (undefined if non-generic)
}

/** @internal */
export interface InstantiationExpressionType extends AnonymousType {
    node: NodeWithTypeArguments;
}

/** @internal */
// A SingleSignatureType may have bespoke outer type parameters to handle free type variable inferences
export interface SingleSignatureType extends AnonymousType {
    outerTypeParameters?: TypeParameter[];
}

/** @internal */
export type BindableObjectDefinePropertyCall = CallExpression & {
    readonly arguments: readonly [StringLiteral | IntLiteral, ObjectLiteralExpression] & Readonly<TextRange>;
};

/** @internal */
export type BindableStaticNameExpression =
    | EntityNameExpression;
    //| BindableStaticElementAccessExpression;

/** @internal */
export type BindableElementAccessExpression = ElementAccessExpression & {
    readonly expression: BindableStaticNameExpression;
};

/** @internal */
export type BindableStaticElementAccessExpression = LiteralLikeElementAccessExpression & {
    readonly expression: BindableStaticNameExpression;
};

/** @internal */
export type BindableStaticAccessExpression =
    | PropertyAccessEntityNameExpression
    | BindableStaticElementAccessExpression;


/** @internal */
// Object literals are initially marked fresh. Freshness disappears following an assignment,
// before a type assertion, or when an object literal's type is widened. The regular
// version of a fresh type is identical except for the TypeFlags.FreshObjectLiteral flag.
export interface FreshObjectLiteralType extends ResolvedType {
    regularType: ResolvedType; // Regular version of fresh type
}


// Type parameter substitution (TypeFlags.Substitution)
// Substitution types are created for type parameters or indexed access types that occur in the
// true branch of a conditional type. For example, in 'T extends string ? Foo<T> : Bar<T>', the
// reference to T in Foo<T> is resolved as a substitution type that substitutes 'string & T' for T.
// Thus, if Foo has a 'string' constraint on its type parameter, T will satisfy it.
// Substitution type are also created for NoInfer<T> types. Those are represented as substitution
// types where the constraint is type 'unknown' (which is never generated for the case above).
export interface SubstitutionType extends InstantiableType {
    objectFlags: ObjectFlags;
    baseType: Type; // Target type
    constraint: Type; // Constraint that target type is known to satisfy
}

export interface StringMappingType extends InstantiableType {
    symbol: Symbol;
    type: Type;
}

export interface SynthesizedComment extends CommentRange {
    text: string;
    pos: -1;
    end: -1;
    hasLeadingNewline?: boolean;
}

/** @internal */
export const enum SymbolAccessibility {
    Accessible,
    NotAccessible,
    CannotBeNamed,
    NotResolved,
}


/** @internal */
export type LateVisibilityPaintedStatement =
    //| AnyImportOrJsDocImport
    | VariableStatement
    //| ClassDeclaration
    | FunctionDeclaration
    // | ModuleDeclaration
    // | TypeAliasDeclaration
    // | InterfaceDeclaration
    // | EnumDeclaration;
    ;


/** @internal */
export interface SymbolVisibilityResult {
    accessibility: SymbolAccessibility;
    aliasesToMakeVisible?: LateVisibilityPaintedStatement[]; // aliases that need to have this symbol visible
    errorSymbolName?: string; // Optional symbol name that results in error
    errorNode?: Node; // optional node that results in error
}


/** @internal */
export interface SymbolAccessibilityResult extends SymbolVisibilityResult {
    errorModuleName?: string; // If the symbol is not visible from module, module's name
}

export type VisitResult<T extends Node | undefined> = T | readonly Node[];

/**
 * A function that accepts and possibly transforms a node.
 */
export type Visitor<TIn extends Node = Node, TOut extends Node | undefined = TIn | undefined> = (node: TIn) => VisitResult<TOut>;

/** @internal */
export const enum LexicalEnvironmentFlags {
    None = 0,
    InParameters = 1 << 0, // currently visiting a parameter list
    VariablesHoistedInParameters = 1 << 1, // a temp variable was hoisted while visiting a parameter list
}


export interface CoreTransformationContext {
    readonly factory: NodeFactory;

    /** Gets the compiler options supplied to the transformer. */
    getCompilerOptions(): CompilerOptions;

    /** Starts a new lexical environment. */
    startLexicalEnvironment(): void;

    /** @internal */ setLexicalEnvironmentFlags(flags: LexicalEnvironmentFlags, value: boolean): void;
    /** @internal */ getLexicalEnvironmentFlags(): LexicalEnvironmentFlags;

    /** Suspends the current lexical environment, usually after visiting a parameter list. */
    suspendLexicalEnvironment(): void;

    /** Resumes a suspended lexical environment, usually before visiting a function body. */
    resumeLexicalEnvironment(): void;

    /** Ends a lexical environment, returning any declarations. */
    endLexicalEnvironment(): Statement[] | undefined;

    /** Hoists a function declaration to the containing scope. */
    hoistFunctionDeclaration(node: FunctionDeclaration): void;

    /** Hoists a variable declaration to the containing scope. */
    hoistVariableDeclaration(node: Identifier): void;

    /** @internal */ startBlockScope(): void;

    /** @internal */ endBlockScope(): Statement[] | undefined;

    /** @internal */ addBlockScopedVariable(node: Identifier): void;

    /**
     * Adds an initialization statement to the top of the lexical environment.
     *
     * @internal
     */
    addInitializationStatement(node: Statement): void;
}

/** @internal */
export interface EmitResolver {
    hasGlobalName(name: string): boolean;
    getReferencedExportContainer(node: Identifier, prefixLocals?: boolean): SourceFile |/* ModuleDeclaration | EnumDeclaration |*/ undefined;
    // getReferencedImportDeclaration(node: Identifier): Declaration | undefined;
    // getReferencedDeclarationWithCollidingName(node: Identifier): Declaration | undefined;
    // isDeclarationWithCollidingName(node: Declaration): boolean;
    // isValueAliasDeclaration(node: Node): boolean;
    // isReferencedAliasDeclaration(node: Node, checkChildren?: boolean): boolean;
    // isTopLevelValueImportEqualsWithEntityName(node: ImportEqualsDeclaration): boolean;
    // hasNodeCheckFlag(node: Node, flags: LazyNodeCheckFlags): boolean;
    // isDeclarationVisible(node: Declaration | AnyImportSyntax): boolean;
    // isLateBound(node: Declaration): node is LateBoundDeclaration;
    // collectLinkedAliases(node: ModuleExportName, setVisibility?: boolean): Node[] | undefined;
    // markLinkedReferences(node: Node): void;
    // isImplementationOfOverload(node: SignatureDeclaration): boolean | undefined;
    // requiresAddingImplicitUndefined(node: ParameterDeclaration): boolean;
    // isExpandoFunctionDeclaration(node: FunctionDeclaration | VariableDeclaration): boolean;
    // getPropertiesOfContainerFunction(node: Declaration): Symbol[];
    // createTypeOfDeclaration(declaration: AccessorDeclaration | VariableLikeDeclaration | PropertyAccessExpression | ElementAccessExpression | BinaryExpression, enclosingDeclaration: Node, flags: NodeBuilderFlags, tracker: SymbolTracker): TypeNode | undefined;
    // createReturnTypeOfSignatureDeclaration(signatureDeclaration: SignatureDeclaration, enclosingDeclaration: Node, flags: NodeBuilderFlags, tracker: SymbolTracker): TypeNode | undefined;
    // createTypeOfExpression(expr: Expression, enclosingDeclaration: Node, flags: NodeBuilderFlags, tracker: SymbolTracker): TypeNode | undefined;
    // createLiteralConstValue(node: VariableDeclaration | PropertyDeclaration | PropertySignature | ParameterDeclaration, tracker: SymbolTracker): Expression;
    // isSymbolAccessible(symbol: Symbol, enclosingDeclaration: Node | undefined, meaning: SymbolFlags | undefined, shouldComputeAliasToMarkVisible: boolean): SymbolAccessibilityResult;
    // isEntityNameVisible(entityName: EntityNameOrEntityNameExpression, enclosingDeclaration: Node): SymbolVisibilityResult;
    // // Returns the constant value this property access resolves to, or 'undefined' for a non-constant
    // getConstantValue(node: EnumMember | PropertyAccessExpression | ElementAccessExpression): string | number | undefined;
    // getEnumMemberValue(node: EnumMember): EvaluatorResult | undefined;
    // getReferencedValueDeclaration(reference: Identifier): Declaration | undefined;
    // getReferencedValueDeclarations(reference: Identifier): Declaration[] | undefined;
    // getTypeReferenceSerializationKind(typeName: EntityName, location?: Node): TypeReferenceSerializationKind;
    // isOptionalParameter(node: ParameterDeclaration): boolean;
    // isArgumentsLocalBinding(node: Identifier): boolean;
    // getExternalModuleFileFromDeclaration(declaration: ImportEqualsDeclaration | ImportDeclaration | ExportDeclaration | ModuleDeclaration | ImportTypeNode | ImportCall): SourceFile | undefined;
    // isLiteralConstDeclaration(node: VariableDeclaration | PropertyDeclaration | PropertySignature | ParameterDeclaration): boolean;
    // getJsxFactoryEntity(location?: Node): EntityName | undefined;
    // getJsxFragmentFactoryEntity(location?: Node): EntityName | undefined;
    // isBindingCapturedByNode(node: Node, decl: VariableDeclaration | BindingElement): boolean;
    // getDeclarationStatementsForSourceFile(node: SourceFile, flags: NodeBuilderFlags, tracker: SymbolTracker): Statement[] | undefined;
    // isImportRequiredByAugmentation(decl: ImportDeclaration): boolean;
    // isDefinitelyReferenceToGlobalSymbolObject(node: Node): boolean;
}

/** @internal */
export interface SourceFileMayBeEmittedHost {
    getCompilerOptions(): CompilerOptions;
    isSourceFileFromExternalLibrary(file: SourceFile): boolean;
    //getResolvedProjectReferenceToRedirect(fileName: string): ResolvedProjectReference | undefined;
    //isSourceOfProjectReferenceRedirect(fileName: string): boolean;
    getCurrentDirectory(): string;
    getCanonicalFileName: GetCanonicalFileName;
    useCaseSensitiveFileNames(): boolean;
}

/** @internal */
export interface EmitHost extends ScriptReferenceHost, ModuleSpecifierResolutionHost, SourceFileMayBeEmittedHost {
    getSourceFiles(): readonly SourceFile[];
    useCaseSensitiveFileNames(): boolean;
    getCurrentDirectory(): string;

    getCommonSourceDirectory(): string;
    getCanonicalFileName(fileName: string): string;

    isEmitBlocked(emitFileName: string): boolean;
    //shouldTransformImportCall(sourceFile: SourceFile): boolean;
    //getEmitModuleFormatOfFile(sourceFile: SourceFile): ModuleKind;

    writeFile: WriteFileCallback;
    getBuildInfo(): BuildInfo | undefined;
    getSourceFileFromReference: Program["getSourceFileFromReference"];
    readonly redirectTargetsMap: RedirectTargetsMap;
    createHash?(data: string): string;
}

export type EmitHelperUniqueNameCallback = (name: string) => string;

// dprint-ignore
export interface EmitHelperBase {
    readonly name: string;                                          // A unique name for this helper.
    readonly scoped: boolean;                                       // Indicates whether the helper MUST be emitted in the current scope.
    readonly text: string | ((node: EmitHelperUniqueNameCallback) => string);  // ES3-compatible raw script text, or a function yielding such a string
    readonly priority?: number;                                     // Helpers with a higher priority are emitted earlier than other helpers on the node.
    readonly dependencies?: EmitHelper[]
}
export interface ScopedEmitHelper extends EmitHelperBase {
    readonly scoped: true;
}

// dprint-ignore
export interface UnscopedEmitHelper extends EmitHelperBase {
    readonly scoped: false;                                         // Indicates whether the helper MUST be emitted in the current scope.
    /** @internal */
    readonly importName?: string;                                   // The name of the helper to use when importing via `--importHelpers`.
    readonly text: string;                                          // ES3-compatible raw script text, or a function yielding such a string
}


export type EmitHelper = ScopedEmitHelper | UnscopedEmitHelper;


export interface TransformationContext extends CoreTransformationContext {
    /** @internal */ getEmitResolver(): EmitResolver;
    /** @internal */ getEmitHost(): EmitHost;
    ///** @internal */ getEmitHelperFactory(): EmitHelperFactory;

    /** Records a request for a non-scoped emit helper in the current context. */
    requestEmitHelper(helper: EmitHelper): void;

    /** Gets and resets the requested non-scoped emit helpers. */
    readEmitHelpers(): EmitHelper[] | undefined;

    /** Enables expression substitutions in the pretty printer for the provided SyntaxKind. */
    enableSubstitution(kind: SyntaxKind): void;

    /** Determines whether expression substitutions are enabled for the provided node. */
    isSubstitutionEnabled(node: Node): boolean;

    /**
     * Hook used by transformers to substitute expressions just before they
     * are emitted by the pretty printer.
     *
     * NOTE: Transformation hooks should only be modified during `Transformer` initialization,
     * before returning the `NodeTransformer` callback.
     */
    onSubstituteNode: (hint: EmitHint, node: Node) => Node;

    /**
     * Enables before/after emit notifications in the pretty printer for the provided
     * SyntaxKind.
     */
    enableEmitNotification(kind: SyntaxKind): void;

    /**
     * Determines whether before/after emit notifications should be raised in the pretty
     * printer when it emits a node.
     */
    isEmitNotificationEnabled(node: Node): boolean;

    /**
     * Hook used to allow transformers to capture state before or after
     * the printer emits a node.
     *
     * NOTE: Transformation hooks should only be modified during `Transformer` initialization,
     * before returning the `NodeTransformer` callback.
     */
    onEmitNode: (hint: EmitHint, node: Node, emitCallback: (hint: EmitHint, node: Node) => void) => void;

    /** @internal */ addDiagnostic(diag: DiagnosticWithLocation): void;
}


/**
 * A function that walks a node array using the given visitor, returning an array whose contents satisfy the test.
 *
 * - If the input node array is undefined, the output is undefined.
 * - If the visitor can return undefined, the node it visits in the array will be reused.
 * - If the output node array is not undefined, then its contents will satisfy the test.
 * - In order to obtain a return type that is more specific than `NodeArray<Node>`, a test
 *   function _must_ be provided, and that function must be a type predicate.
 *
 * For the canonical implementation of this type, @see {visitNodes}.
 */
export interface NodesVisitor {
    <TIn extends Node, TInArray extends NodeArray<TIn> | undefined, TOut extends Node>(
        nodes: TInArray,
        visitor: Visitor<TIn, Node | undefined>,
        test: (node: Node) => node is TOut,
        start?: number,
        count?: number,
    ): NodeArray<TOut> | (TInArray & undefined);
    <TIn extends Node, TInArray extends NodeArray<TIn> | undefined>(
        nodes: TInArray,
        visitor: Visitor<TIn, Node | undefined>,
        test?: (node: Node) => boolean,
        start?: number,
        count?: number,
    ): NodeArray<Node> | (TInArray & undefined);
}

export const enum GeneratedIdentifierFlags {
    // Kinds
    None = 0,                           // Not automatically generated.
    /** @internal */ Auto = 1,             // Automatically generated identifier.
    /** @internal */ Loop = 2,             // Automatically generated identifier with a preference for '_i'.
    /** @internal */ Unique = 3,           // Unique name based on the 'text' property.
    /** @internal */ Node = 4,             // Unique name based on the node in the 'original' property.
    /** @internal */ KindMask = 7,         // Mask to extract the kind of identifier from its flags.

    // Flags
    ReservedInNestedScopes = 1 << 3,    // Reserve the generated name in nested scopes
    Optimistic = 1 << 4,                // First instance won't use '_#' if there's no conflict
    FileLevel = 1 << 5,                 // Use only the file identifiers list and not generated names to search for conflicts
    AllowNameSubstitution = 1 << 6, // Used by `module.ts` to indicate generated nodes which can have substitutions performed upon them (as they were generated by an earlier transform phase)
}

/** @internal */
export interface GeneratedNamePart {
    /** an additional prefix to insert before the text sourced from `node` */
    prefix?: string;
    node: Identifier ;
    /** an additional suffix to insert after the text sourced from `node` */
    suffix?: string;
}


/** @internal */
export interface AutoGenerateInfo {
    flags: GeneratedIdentifierFlags;            // Specifies whether to auto-generate the text for an identifier.
    readonly id: number;                        // Ensures unique generated identifiers get unique names, but clones get the same name.
    readonly prefix?: string | GeneratedNamePart;
    readonly suffix?: string;
}

/** @internal */
export interface GeneratedIdentifier extends Identifier {
    readonly emitNode: EmitNode & { autoGenerate: AutoGenerateInfo; };
}

export interface EvolvingArrayType extends ObjectType {
    elementType: Type; // Element expressions of evolving array type
    finalArrayType?: Type; // Final array type of evolving array type
}

export interface InterfaceTypeWithDeclaredMembers extends InterfaceType {
    declaredProperties: Symbol[];                   // Declared members
    declaredCallSignatures: Signature[];            // Declared call signatures
    declaredConstructSignatures: Signature[];       // Declared construct signatures
    declaredIndexInfos: IndexInfo[];                // Declared index signatures
}

/** @internal */
export const enum IntersectionFlags {
    None = 0,
    NoSupertypeReduction = 1 << 0,
    NoConstraintReduction = 1 << 1,
}

export interface IntersectionType extends UnionOrIntersectionType {
    /** @internal */
    resolvedApparentType: Type;
    /** @internal */
    uniqueLiteralFilledInstantiation?: Type; // Instantiation with type parameters mapped to never type
}

/** @internal */
export type HasInvalidatedResolutions = (sourceFile: Path) => boolean;
/** @internal */
export type HasInvalidatedLibResolutions = (libFileName: string) => boolean;

/**
 * Maps positions between source and generated files.
 *
 * @internal
 */
export interface DocumentPositionMapper {
    getSourcePosition(input: DocumentPosition): DocumentPosition;
    getGeneratedPosition(input: DocumentPosition): DocumentPosition;
}

/** @internal */
export interface DocumentPosition {
    fileName: string;
    pos: number;
}

export interface ParseConfigHost extends ModuleResolutionHost {
    useCaseSensitiveFileNames: boolean;

    readDirectory(rootDir: string, extensions: readonly string[], excludes: readonly string[] | undefined, includes: readonly string[], depth?: number): readonly string[];

    /**
     * Gets a value indicating whether the specified path exists and is a file.
     * @param path The path to test.
     */
    fileExists(path: string): boolean;

    readFile(path: string): string | undefined;
    trace?(s: string): void;
}

export interface FileExtensionInfo {
    extension: string;
    isMixedContent: boolean;
    scriptKind?: ScriptKind;
}


/** @internal */
export interface ConfigFileSpecs {
    filesSpecs: readonly string[] | undefined;
    /**
     * Present to report errors (user specified specs), validatedIncludeSpecs are used for file name matching
     */
    includeSpecs: readonly string[] | undefined;
    /**
     * Present to report errors (user specified specs), validatedExcludeSpecs are used for file name matching
     */
    excludeSpecs: readonly string[] | undefined;
    validatedFilesSpec: readonly string[] | undefined;
    validatedIncludeSpecs: readonly string[] | undefined;
    validatedExcludeSpecs: readonly string[] | undefined;
    validatedFilesSpecBeforeSubstitution: readonly string[] | undefined;
    validatedIncludeSpecsBeforeSubstitution: readonly string[] | undefined;
    validatedExcludeSpecsBeforeSubstitution: readonly string[] | undefined;
    pathPatterns: readonly (string | Pattern)[] | undefined;
    isDefaultIncludeSpec: boolean;    
}

export type LpcLoadImportResult = {
    filename: string;
    source?: string;
    error?: string;
}
export interface LpcFileHandler extends IFileHandler  {
    loadIncludeFile(sourceFilename: string, filename: string, localFirst: boolean, additionalSearchDirs?: string[]): LpcLoadImportResult    
    loadInclude(sourceFilename: string, filename: string): LoadImportResult;
}

export interface TransformationResult<T extends Node> {
    /** Gets the transformed source files. */
    transformed: T[];

    /** Gets diagnostics for the transformation. */
    diagnostics?: DiagnosticWithLocation[];

    /**
     * Gets a substitute for a node, if one is available; otherwise, returns the original node.
     *
     * @param hint A hint as to the intended usage of the node.
     * @param node The node to substitute.
     */
    substituteNode(hint: EmitHint, node: Node): Node;

    /**
     * Emits a node with possible notification.
     *
     * @param hint A hint as to the intended usage of the node.
     * @param node The node to emit.
     * @param emitCallback A callback used to emit the node.
     */
    emitNodeWithNotification(hint: EmitHint, node: Node, emitCallback: (hint: EmitHint, node: Node) => void): void;

    /**
     * Indicates if a given node needs an emit notification
     *
     * @param node The node to emit.
     */
    isEmitNotificationEnabled?(node: Node): boolean;

    /**
     * Clean up EmitNode entries on any parse-tree nodes.
     */
    dispose(): void;
}

/**
 * A function that is used to initialize and return a `Transformer` callback, which in turn
 * will be used to transform one or more nodes.
 */
export type TransformerFactory<T extends Node> = (context: TransformationContext) => Transformer<T>;

/**
 * A function that transforms a node.
 */
export type Transformer<T extends Node> = (node: T) => T;

export interface PropertyAccessChain extends PropertyAccessExpression {
    _optionalChainBrand: any;
    readonly name: MemberName;
}

export type OptionalChain =
    | PropertyAccessChain
    | ElementAccessChain
    | CallChain;
    //| NonNullChain;


export interface ExportDeclaration extends DeclarationStatement, JSDocContainer {
    readonly kind: SyntaxKind.ExportDeclaration;
    readonly parent: SourceFile ;
    readonly modifiers?: NodeArray<Modifier>;
    readonly isTypeOnly: boolean;
    // /** Will not be assigned in the case of `export * from "foo";` */
    // readonly exportClause?: NamedExportBindings;
    /** If this is not a StringLiteral it will be a grammar error. */
    readonly moduleSpecifier?: Expression;
    // /** @deprecated */ readonly assertClause?: AssertClause;
    readonly attributes?: ImportAttributes;
}
    
export interface CommentDirective {
    range: TextRange;
    type: CommentDirectiveType;
}

/** @internal */
export const enum CommentDirectiveType {
    ExpectError,
    Ignore,
}

/** @internal */
export interface DocumentPositionMapperHost {
    getSourceFileLike(fileName: string): SourceFileLike | undefined;
    getCanonicalFileName(path: string): string;
    log(text: string): void;
}

/** @internal */
export interface Queue<T> {
    enqueue(...items: T[]): void;
    dequeue(): T;
    isEmpty(): boolean;
}

export interface LabeledStatement extends Statement, FlowContainer {
    readonly kind: SyntaxKind.LabeledStatement;
    readonly label: Identifier;
    readonly statement: Statement;
}

// dprint-ignore
export interface PropertySignature extends TypeElement, JSDocContainer {
    readonly kind: SyntaxKind.PropertySignature;
    readonly parent: TypeLiteralNode;// | InterfaceDeclaration;
    readonly modifiers?: NodeArray<Modifier>;
    readonly name: PropertyName;                 // Declared property name
    //readonly questionToken?: QuestionToken;      // Present on optional property
    readonly type?: TypeNode;                    // Optional type annotation

    // The following properties are used only to report grammar errors (see `isGrammarError` in utilities.ts)
    /** @internal */ readonly initializer?: Expression | undefined; // A property signature cannot have an initializer
}

/** @internal */
export type SuperContainer =
    | PropertyDeclaration
    | PropertySignature;
    // | MethodDeclaration
    // | MethodSignature
    // | ConstructorDeclaration
    // | GetAccessorDeclaration
    // | SetAccessorDeclaration
    // | ClassStaticBlockDeclaration;


/** @internal */
export type SuperContainerOrFunctions =
    | SuperContainer
    | FunctionDeclaration
    | FunctionExpression;
    // | ArrowFunction;


/**
 * A function that walks a node using the given visitor, lifting node arrays into single nodes,
 * returning an node which satisfies the test.
 *
 * - If the input node is undefined, then the output is undefined.
 * - If the visitor returns undefined, then the output is undefined.
 * - If the output node is not undefined, then it will satisfy the test function.
 * - In order to obtain a return type that is more specific than `Node`, a test
 *   function _must_ be provided, and that function must be a type predicate.
 *
 * For the canonical implementation of this type, @see {visitNode}.
 */
export interface NodeVisitor {
    <TIn extends Node | undefined, TVisited extends Node | undefined, TOut extends Node>(
        node: TIn,
        visitor: Visitor<NonNullable<TIn>, TVisited>,
        test: (node: Node) => node is TOut,
        lift?: (node: readonly Node[]) => Node,
    ): TOut | (TIn & undefined) | (TVisited & undefined);
    <TIn extends Node | undefined, TVisited extends Node | undefined>(
        node: TIn,
        visitor: Visitor<NonNullable<TIn>, TVisited>,
        test?: (node: Node) => boolean,
        lift?: (node: readonly Node[]) => Node,
    ): Node | (TIn & undefined) | (TVisited & undefined);
}


export interface UserPreferences {
    readonly disableSuggestions?: boolean;
    readonly quotePreference?: "auto" | "double" | "single";
    /**
     * If enabled, TypeScript will search through all external modules' exports and add them to the completions list.
     * This affects lone identifier completions but not completions on the right hand side of `obj.`.
     */
    readonly includeCompletionsForModuleExports?: boolean;
    /**
     * Enables auto-import-style completions on partially-typed import statements. E.g., allows
     * `import write|` to be completed to `import { writeFile } from "fs"`.
     */
    readonly includeCompletionsForImportStatements?: boolean;
    /**
     * Allows completions to be formatted with snippet text, indicated by `CompletionItem["isSnippet"]`.
     */
    readonly includeCompletionsWithSnippetText?: boolean;
    /**
     * Unless this option is `false`, or `includeCompletionsWithInsertText` is not enabled,
     * member completion lists triggered with `.` will include entries on potentially-null and potentially-undefined
     * values, with insertion text to replace preceding `.` tokens with `?.`.
     */
    readonly includeAutomaticOptionalChainCompletions?: boolean;
    /**
     * If enabled, the completion list will include completions with invalid identifier names.
     * For those entries, The `insertText` and `replacementSpan` properties will be set to change from `.x` property access to `["x"]`.
     */
    readonly includeCompletionsWithInsertText?: boolean;
    /**
     * If enabled, completions for class members (e.g. methods and properties) will include
     * a whole declaration for the member.
     * E.g., `class A { f| }` could be completed to `class A { foo(): number {} }`, instead of
     * `class A { foo }`.
     */
    readonly includeCompletionsWithClassMemberSnippets?: boolean;
    /**
     * If enabled, object literal methods will have a method declaration completion entry in addition
     * to the regular completion entry containing just the method name.
     * E.g., `const objectLiteral: T = { f| }` could be completed to `const objectLiteral: T = { foo(): void {} }`,
     * in addition to `const objectLiteral: T = { foo }`.
     */
    readonly includeCompletionsWithObjectLiteralMethodSnippets?: boolean;
    /**
     * Indicates whether {@link CompletionEntry.labelDetails completion entry label details} are supported.
     * If not, contents of `labelDetails` may be included in the {@link CompletionEntry.name} property.
     */
    readonly useLabelDetailsInCompletionEntries?: boolean;
    readonly allowIncompleteCompletions?: boolean;
    readonly importModuleSpecifierPreference?: "shortest" | "project-relative" | "relative" | "non-relative";
    /** Determines whether we import `foo/index.ts` as "foo", "foo/index", or "foo/index.js" */
    readonly importModuleSpecifierEnding?: "auto" | "minimal" | "index" | "js";
    readonly allowTextChangesInNewFiles?: boolean;
    readonly providePrefixAndSuffixTextForRename?: boolean;
    readonly includePackageJsonAutoImports?: "auto" | "on" | "off";
    readonly provideRefactorNotApplicableReason?: boolean;
    readonly jsxAttributeCompletionStyle?: "auto" | "braces" | "none";
    readonly includeInlayParameterNameHints?: "none" | "literals" | "all";
    readonly includeInlayParameterNameHintsWhenArgumentMatchesName?: boolean;
    readonly includeInlayFunctionParameterTypeHints?: boolean;
    readonly includeInlayVariableTypeHints?: boolean;
    readonly includeInlayVariableTypeHintsWhenTypeMatchesName?: boolean;
    readonly includeInlayPropertyDeclarationTypeHints?: boolean;
    readonly includeInlayFunctionLikeReturnTypeHints?: boolean;
    readonly includeInlayEnumMemberValueHints?: boolean;
    readonly interactiveInlayHints?: boolean;
    readonly allowRenameOfImportPath?: boolean;
    readonly autoImportFileExcludePatterns?: string[];
    readonly preferTypeOnlyAutoImports?: boolean;
    /**
     * Indicates whether imports should be organized in a case-insensitive manner.
     */
    readonly organizeImportsIgnoreCase?: "auto" | boolean;
    /**
     * Indicates whether imports should be organized via an "ordinal" (binary) comparison using the numeric value
     * of their code points, or via "unicode" collation (via the
     * [Unicode Collation Algorithm](https://unicode.org/reports/tr10/#Scope)) using rules associated with the locale
     * specified in {@link organizeImportsCollationLocale}.
     *
     * Default: `"ordinal"`.
     */
    readonly organizeImportsCollation?: "ordinal" | "unicode";
    /**
     * Indicates the locale to use for "unicode" collation. If not specified, the locale `"en"` is used as an invariant
     * for the sake of consistent sorting. Use `"auto"` to use the detected UI locale.
     *
     * This preference is ignored if {@link organizeImportsCollation} is not `"unicode"`.
     *
     * Default: `"en"`
     */
    readonly organizeImportsLocale?: string;
    /**
     * Indicates whether numeric collation should be used for digit sequences in strings. When `true`, will collate
     * strings such that `a1z < a2z < a100z`. When `false`, will collate strings such that `a1z < a100z < a2z`.
     *
     * This preference is ignored if {@link organizeImportsCollation} is not `"unicode"`.
     *
     * Default: `false`
     */
    readonly organizeImportsNumericCollation?: boolean;
    /**
     * Indicates whether accents and other diacritic marks are considered unequal for the purpose of collation. When
     * `true`, characters with accents and other diacritics will be collated in the order defined by the locale specified
     * in {@link organizeImportsCollationLocale}.
     *
     * This preference is ignored if {@link organizeImportsCollation} is not `"unicode"`.
     *
     * Default: `true`
     */
    readonly organizeImportsAccentCollation?: boolean;
    /**
     * Indicates whether upper case or lower case should sort first. When `false`, the default order for the locale
     * specified in {@link organizeImportsCollationLocale} is used.
     *
     * This preference is ignored if {@link organizeImportsCollation} is not `"unicode"`. This preference is also
     * ignored if we are using case-insensitive sorting, which occurs when {@link organizeImportsIgnoreCase} is `true`,
     * or if {@link organizeImportsIgnoreCase} is `"auto"` and the auto-detected case sensitivity is determined to be
     * case-insensitive.
     *
     * Default: `false`
     */
    readonly organizeImportsCaseFirst?: "upper" | "lower" | false;
    /**
     * Indicates where named type-only imports should sort. "inline" sorts named imports without regard to if the import is
     * type-only.
     *
     * Default: `last`
     */
    readonly organizeImportsTypeOrder?: OrganizeImportsTypeOrder;
    /**
     * Indicates whether to exclude standard library and node_modules file symbols from navTo results.
     */
    readonly excludeLibrarySymbolsInNavTo?: boolean;
    readonly lazyConfiguredProjectsFromExternalProject?: boolean;
    readonly displayPartsForJSDoc?: boolean;
    readonly generateReturnInDocTemplate?: boolean;
    readonly disableLineTextInReferences?: boolean;
}


export type OrganizeImportsTypeOrder = "last" | "inline" | "first";

/** @internal */
export interface FutureSourceFile {
    readonly path: Path;
    readonly fileName: string;
    readonly impliedNodeFormat?: ResolutionMode;
    readonly packageJsonScope?: PackageJsonInfo;
    readonly externalModuleIndicator?: true | undefined;
    readonly commonJsModuleIndicator?: true | undefined;
    readonly statements: readonly never[];
    readonly imports: readonly never[];
}


/** @internal */
export type AnyValidImportOrReExport = InheritDeclaration | CloneObjectExpression;
    // | (ImportDeclaration | ExportDeclaration | JSDocImportTag) & { moduleSpecifier: StringLiteral; }
    // | ImportEqualsDeclaration & { moduleReference: ExternalModuleReference & { expression: StringLiteral; }; }
    // | RequireOrImportCall
    // | ValidImportTypeNode;

/** @internal */
export type AnyImportSyntax = InheritDeclaration;

/** @internal */
export type AnyImportOrJsDocImport = AnyImportSyntax ;//| JSDocImportTag;

/** @internal */
export type AnyImportOrRequire = AnyImportOrJsDocImport | VariableDeclarationInitializedTo<CloneObjectExpression>;

export interface JSDocLink extends Node {
    readonly kind: SyntaxKind.JSDocLink;
    readonly name?: EntityName | JSDocMemberName;
    text: string;
}

export interface JSDocLinkCode extends Node {
    readonly kind: SyntaxKind.JSDocLinkCode;
    readonly name?: EntityName | JSDocMemberName;
    text: string;
}

export interface JSDocLinkPlain extends Node {
    readonly kind: SyntaxKind.JSDocLinkPlain;
    readonly name?: EntityName | JSDocMemberName;
    text: string;
}

export interface JSDocOverloadTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocOverloadTag;
    readonly parent: JSDoc;
    readonly typeExpression: JSDocSignature;
}

/**
 * Note that `@extends` is a synonym of `@augments`.
 * Both tags are represented by this interface.
 */
export interface JSDocAugmentsTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocAugmentsTag;
    readonly class: Expression & { readonly expression: Identifier | PropertyAccessEntityNameExpression; };
}

export interface JSDocImplementsTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocImplementsTag;
    readonly class: Expression & { readonly expression: Identifier | PropertyAccessEntityNameExpression; };
}


export interface JSDocCallbackTag extends JSDocTag, NamedDeclaration, LocalsContainer {
    readonly kind: SyntaxKind.JSDocCallbackTag;
    readonly parent: JSDoc;
    readonly fullName?: Identifier;
    readonly name?: Identifier;
    readonly typeExpression: JSDocSignature;
}

export interface JSDocPropertyTag extends JSDocPropertyLikeTag {
    readonly kind: SyntaxKind.JSDocPropertyTag;
}

export interface JSDocVariableTag extends JSDocPropertyLikeTag {
    readonly kind: SyntaxKind.JSDocVariableTag;
}

export interface JSDocSatisfiesTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocSatisfiesTag;
    readonly typeExpression: JSDocTypeExpression;
}

export interface JSDocNameReference extends Node {
    readonly kind: SyntaxKind.JSDocNameReference;
    readonly name: EntityName | JSDocMemberName;
}

export interface JSDocSeeTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocSeeTag;
    readonly name?: JSDocNameReference;
}

export interface JSDocAuthorTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocAuthorTag;
}

export interface JSDocThrowsTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocThrowsTag;
    readonly typeExpression?: JSDocTypeExpression;
}

export interface JSDocTypeTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocTypeTag;
    readonly typeExpression: JSDocTypeExpression;
}

// Note that a MethodDeclaration is considered both a ClassElement and an ObjectLiteralElement.
// Both the grammars for ClassDeclaration and ObjectLiteralExpression allow for MethodDeclarations
// as child elements, and so a MethodDeclaration satisfies both interfaces.  This avoids the
// alternative where we would need separate kinds/types for ClassMethodDeclaration and
// ObjectLiteralMethodDeclaration, which would look identical.
//
// Because of this, it may be necessary to determine what sort of MethodDeclaration you have
// at later stages of the compiler pipeline.  In that case, you can either check the parent kind
// of the method, or use helpers like isObjectLiteralMethodDeclaration
export interface MethodDeclaration extends FunctionLikeDeclarationBase, ClassElement, ObjectLiteralElement, JSDocContainer, LocalsContainer, FlowContainer {
    readonly kind: SyntaxKind.MethodDeclaration;
    readonly parent: /*ClassLikeDeclaration |*/ ObjectLiteralExpression;
    readonly modifiers?: NodeArray<Modifier> | undefined;
    readonly name: PropertyName;
    readonly body?: FunctionBody | undefined;

    // The following properties are used only to report grammar errors (see `isGrammarError` in utilities.ts)
    /** @internal */ readonly exclamationToken?: ExclamationToken | undefined; // A method cannot have an exclamation token
}

export interface MethodSignature extends SignatureDeclarationBase, TypeElement, LocalsContainer {
    readonly kind: SyntaxKind.MethodSignature;
    readonly parent: TypeLiteralNode | InterfaceDeclaration;
    readonly modifiers?: NodeArray<Modifier>;
    readonly name: PropertyName;
}

export interface ArrowFunction extends Expression, FunctionLikeDeclarationBase, JSDocContainer, LocalsContainer, FlowContainer {
    readonly kind: SyntaxKind.ArrowFunction;
    readonly modifiers?: NodeArray<Modifier>;
    readonly equalsGreaterThanToken: EqualsGreaterThanToken;
    readonly body: ConciseBody;
    readonly name: never;
}

export interface ClassExpression extends ClassLikeDeclarationBase, PrimaryExpression {
    readonly kind: SyntaxKind.ClassExpression;
    readonly modifiers?: NodeArray<Modifier>;
}

/** @internal */
export interface PrologueDirective extends ExpressionStatement {
    readonly expression: StringLiteral;
}

export interface PreprocessorDirective extends Statement {
    kind: DirectiveSyntaxKind;
    // readonly expression: StringLiteral;
}

export interface PragmaDirective extends PreprocessorDirective {
    kind: SyntaxKind.PragmaDirective;
    expression: NodeArray<Identifier>;
}

export interface IncludeDirective extends PreprocessorDirective, SourceFileBase {
    kind: SyntaxKind.IncludeDirective;
    content: NodeArray<StringLiteral>;
    readonly fileName: string;
    readonly localFirst: boolean;
    readonly statements: NodeArray<Statement>;
    readonly endOfFileToken: Token<SyntaxKind.EndOfFileToken>;

    // some sourcefile-like properties
    readonly text: string;
    inactiveCodeRanges?: readonly TextRange[];
}


export interface DefineDirective extends PreprocessorDirective, Declaration {
    kind: SyntaxKind.DefineDirective;
    
    name: Identifier;    
    arguments?: NodeArray<ParameterDeclaration>;
    range: TextRange;
}

export interface MacroParameter extends ReadonlyTextRange, MacroIncludedFileRange {
    disabled?: boolean;
    /** get the sourcetext that contains the arg value range */
    text: string;
}

export interface PositionState {
    pos: number;
    tokenStart: number;
    fileName: string;
    macro: Macro;    
    include: IncludeDirective;
    stateId: number;    
}


export interface Macro extends MacroIncludedFileRange {
    directive: DefineDirective;
    name: string;
    isBuiltIn: boolean;
    includeDirPos?: number;
    includeDirEnd?: number;
    includeFilename?: string;    
    disabled?: boolean;
    /** get the sourcetext that contains the macro definition range */
    getText(): string;
    range: TextRange;    
    arguments?: NodeArray<ParameterDeclaration>;
    argsIn?: MapLike<MacroParameter>;    
    pos?: PositionState
    end?: number;    
}

export interface UndefDirective extends PreprocessorDirective {
    kind: SyntaxKind.UndefDirective;
    name: Identifier;    
}


export interface ClassLikeDeclarationBase extends NamedDeclaration, JSDocContainer {
    readonly kind: SyntaxKind.ClassDeclaration | SyntaxKind.ClassExpression;
    readonly name?: Identifier;
    readonly typeParameters?: NodeArray<TypeParameterDeclaration>;
    //readonly heritageClauses?: NodeArray<HeritageClause>;
    readonly members: NodeArray<ClassElement>;
}

export interface ClassDeclaration extends ClassLikeDeclarationBase, DeclarationStatement {
    readonly kind: SyntaxKind.ClassDeclaration;
    readonly modifiers?: NodeArray<Modifier>;
    /** May be undefined in `export default class { ... }`. */
    readonly name?: Identifier;
}

export type ClassLikeDeclaration =
    | ClassDeclaration            
    | ClassExpression;

/** @internal */
export type SnippetElement = TabStop | Placeholder;


/** @internal */
export interface TabStop {
    kind: SnippetKind.TabStop;
    order: number;
}

/** @internal */
export interface Placeholder {
    kind: SnippetKind.Placeholder;
    order: number;
}

// Reference: https://code.visualstudio.com/docs/editor/userdefinedsnippets#_snippet-syntax
// dprint-ignore
/** @internal */
export const enum SnippetKind {
    TabStop,                                // `$1`, `$2`
    Placeholder,                            // `${1:foo}`
    Choice,                                 // `${1|one,two,three|}`
    Variable,                               // `$name`, `${name:default}`
}

export interface MissingDeclaration extends DeclarationStatement, PrimaryExpression {
    readonly kind: SyntaxKind.MissingDeclaration;
    readonly name?: Identifier;

    // The following properties are used only to report grammar errors
    /** @internal */ readonly modifiers?: NodeArray<Modifier> | undefined;
    /** @internal */ readonly type?: TypeNode | undefined;
}

/** @internal */
export const enum AccessFlags {
    None = 0,
    IncludeUndefined = 1 << 0,
    NoIndexSignatures = 1 << 1,
    Writing = 1 << 2,
    CacheSymbol = 1 << 3,
    NoTupleBoundsCheck = 1 << 4,
    ExpressionPosition = 1 << 5,
    ReportDeprecated = 1 << 6,
    SuppressNoImplicitAnyError = 1 << 7,
    Contextual = 1 << 8,
    Persistent = IncludeUndefined,
}

export interface TypeAliasDeclaration extends DeclarationStatement, JSDocContainer, LocalsContainer {
    readonly kind: SyntaxKind.TypeAliasDeclaration;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly name: Identifier;    
    readonly typeParameters?: NodeArray<TypeParameterDeclaration>;
    readonly type: TypeNode;
}

/** @internal */
export interface EvaluationResolver {
    evaluateEntityNameExpression(expr: EntityNameExpression, location: Declaration | undefined): EvaluatorResult;
    evaluateElementAccessExpression(expr: ElementAccessExpression, location: Declaration | undefined): EvaluatorResult;
}

export interface SyntheticExpression extends Expression {
    readonly kind: SyntaxKind.SyntheticExpression;
    readonly isSpread: boolean;
    readonly type: Type;
    readonly tupleNameSource?: ParameterDeclaration | NamedTupleMember;
}

// Indexed access types (TypeFlags.IndexedAccess)
// Possible forms are T[xxx], xxx[T], or xxx[keyof T], where T is a type variable
export interface IndexedAccessType extends InstantiableType {
    objectType: Type;
    indexType: Type;
    /** @internal */
    accessFlags: AccessFlags; // Only includes AccessFlags.Persistent
    constraint?: Type;
    simplifiedForReading?: Type;
    simplifiedForWriting?: Type;
}

export type UnionOrIntersectionTypeNode = UnionTypeNode;// | IntersectionTypeNode;

/** @internal */
// A name that supports late-binding (used in checker)
export interface LateBoundName extends ComputedPropertyName {
    readonly expression: EntityNameExpression;
}

/** @internal */
export interface DynamicNamedDeclaration extends NamedDeclaration {
    readonly name: ComputedPropertyName;
}

/** @internal */
export interface DynamicNamedBinaryExpression extends BinaryExpression {
    readonly left: ElementAccessExpression;
}


/** @internal */
// A declaration that supports late-binding (used in checker)
export interface LateBoundDeclaration extends DynamicNamedDeclaration {
    readonly name: LateBoundName;
}

/** @internal */
export interface LateBoundElementAccessExpression extends ElementAccessExpression {
    readonly argumentExpression: EntityNameExpression;
}

/** @internal */
export interface LateBoundBinaryExpressionDeclaration extends DynamicNamedBinaryExpression {
    readonly left: LateBoundElementAccessExpression;
}

/** @internal */
export interface MappedSymbolLinks extends TransientSymbolLinks {
    mappedType: MappedType;
    keyType: Type;
}

/** @internal */
export interface MappedSymbol extends TransientSymbol {
    links: MappedSymbolLinks;
}

export const enum TypePredicateKind {
    This,
    Identifier,
    AssertsThis,
    AssertsIdentifier,
}

export interface TypePredicateBase {
    kind: TypePredicateKind;
    type: Type | undefined;
}

export interface IdentifierTypePredicate extends TypePredicateBase {
    kind: TypePredicateKind.Identifier;
    parameterName: string;
    parameterIndex: number;
    type: Type;
}

export interface AssertsThisTypePredicate extends TypePredicateBase {
    kind: TypePredicateKind.AssertsThis;
    parameterName: undefined;
    parameterIndex: undefined;
    type: Type | undefined;
}

export interface AssertsIdentifierTypePredicate extends TypePredicateBase {
    kind: TypePredicateKind.AssertsIdentifier;
    parameterName: string;
    parameterIndex: number;
    type: Type | undefined;
}

export type TypePredicate = IdentifierTypePredicate | AssertsThisTypePredicate | AssertsIdentifierTypePredicate;

export interface ExpressionWithTypeArguments extends MemberExpression, NodeWithTypeArguments {
    readonly kind: SyntaxKind.ExpressionWithTypeArguments;
    readonly expression: LeftHandSideExpression;
}

export interface IFileHandler {
    loadInclude(sourceFilename: string, filename: string): LoadImportResult;    
}

export interface LoadImportResult {
    uri: string;
    source: string;
    error?: string;
};

export interface JSDocClassTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocClassTag;
}

export interface JSDocPublicTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocPublicTag;
}

export interface JSDocPrivateTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocPrivateTag;
}

export interface JSDocProtectedTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocProtectedTag;
}

export interface JSDocOverrideTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocOverrideTag;
}

export interface JSDocUnknownTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocTag;
}

export type JSDocNamespaceBody =
    | Identifier;
    // | JSDocNamespaceDeclaration;

/** @internal */
export type HasInferredType =
    | PropertyAssignment
    | PropertyAccessExpression
    | BinaryExpression
    | ElementAccessExpression
    | VariableDeclaration
    | ParameterDeclaration
    | BindingElement
    | PropertyDeclaration
    | PropertySignature;

export interface SyntacticTypeNodeBuilderContext {
    tracker: Required<Pick<SymbolTracker, "reportInferenceFallback">>;
    enclosingDeclaration: Node | undefined;
}

/** @internal */
export interface SyntacticTypeNodeBuilderResolver {
    isUndefinedIdentifierExpression(name: Identifier): boolean;
    isExpandoFunctionDeclaration(name: FunctionDeclaration | VariableDeclaration): boolean;
    // getAllAccessorDeclarations(declaration: AccessorDeclaration): AllAccessorDeclarations;
    isEntityNameVisible(entityName: EntityNameOrEntityNameExpression, enclosingDeclaration: Node, shouldComputeAliasToMakeVisible?: boolean): SymbolVisibilityResult;
    requiresAddingImplicitUndefined(parameter: ParameterDeclaration | JSDocParameterTag): boolean;
    isDefinitelyReferenceToGlobalSymbolObject(node: Node): boolean;
}
    

/** @internal */
export type PrimitiveLiteral =
    | BooleanLiteral
    | IntLiteral
    | FloatLiteral
    | StringLiteral    
    | PrefixUnaryExpression & { operator: SyntaxKind.PlusToken; operand: IntLiteral; }
    | PrefixUnaryExpression & { operator: SyntaxKind.MinusToken; operand: IntLiteral | FloatLiteral; };

export interface LpcConfigSourceFile extends JsonSourceFile {
    extendedSourceFiles?: string[];
    /** @internal */ configFileSpecs?: ConfigFileSpecs;
}

export interface ParsedLpcConfig {
    raw: any;
    options?: CompilerOptions;
    watchOptions?: WatchOptions;
    typeAcquisition?: TypeAcquisition;
    /**
     * Note that the case of the config path has not yet been normalized, as no files have been imported into the project yet
     */
    extendedConfigPath?: string | string[];    
}
    
/**
 * Branded string for keeping track of when we've turned an ambiguous path
 * specified like "./blah" to an absolute path to an actual
 * tsconfig file, e.g. "/root/blah/tsconfig.json"
 */
export type ResolvedConfigFileName = string & { _isResolvedConfigFileName: never; };

export interface ConditionalTypeNode extends TypeNode, LocalsContainer {
    readonly kind: SyntaxKind.ConditionalType;
    readonly checkType: TypeNode;
    readonly extendsType: TypeNode;
    readonly trueType: TypeNode;
    readonly falseType: TypeNode;
}

export interface ThisTypeNode extends TypeNode {
    readonly kind: SyntaxKind.ThisType;
}

export interface JSDocAllType extends JSDocType {
    readonly kind: SyntaxKind.JSDocAllType;
}

export interface JSDocUnknownType extends JSDocType {
    readonly kind: SyntaxKind.JSDocUnknownType;
}

export interface JSDocOptionalType extends JSDocType {
    readonly kind: SyntaxKind.JSDocOptionalType;
    readonly type: TypeNode;
}

export interface JSDocFunctionType extends JSDocType, SignatureDeclarationBase, LocalsContainer {
    readonly kind: SyntaxKind.JSDocFunctionType;
}

export interface TypePredicateNode extends TypeNode {
    readonly kind: SyntaxKind.TypePredicate;
    readonly parent: SignatureDeclaration | JSDocTypeExpression;
    // readonly assertsModifier?: AssertsKeyword;
    readonly parameterName: Identifier | ThisTypeNode;
    readonly type?: TypeNode;
}

/** @internal */
export interface HasCurrentDirectory {
    getCurrentDirectory(): string;
}

/** @internal */
export interface FilePreprocessingLibReferenceDiagnostic {
    kind: FilePreprocessingDiagnosticsKind.FilePreprocessingLibReferenceDiagnostic;
    reason: ReferencedFile & { kind: FileIncludeKind.LibReferenceDirective; };
}

/** @internal */
export type HasChangedAutomaticTypeDirectiveNames = () => boolean;

export interface NamedTupleMember extends TypeNode, Declaration, JSDocContainer {
    readonly kind: SyntaxKind.NamedTupleMember;
    readonly dotDotDotToken?: Token<SyntaxKind.DotDotDotToken>;
    readonly name: Identifier;
    readonly questionToken?: Token<SyntaxKind.QuestionToken>;
    readonly type: TypeNode;
}

export interface TupleType extends GenericType {
    elementFlags: readonly ElementFlags[];
    /** Number of required or variadic elements */
    minLength: number;
    /** Number of initial required or optional elements */
    fixedLength: number;
    /** True if tuple has any rest or variadic elements */
    hasRestElement: boolean;
    combinedFlags: ElementFlags;
    readonly: boolean;
    labeledElementDeclarations?: readonly (NamedTupleMember | ParameterDeclaration | undefined)[];
}

export interface TupleTypeReference extends TypeReference {
    target: TupleType;
}


/** @internal */
export const enum PragmaKindFlags {
    None = 0,
    /**
     * Triple slash comment of the form
     * /// <pragma-name argname="value" />
     */
    TripleSlashXML = 1 << 0,
    /**
     * Single line comment of the form
     * // @pragma-name argval1 argval2
     * or
     * /// @pragma-name argval1 argval2
     */
    SingleLine = 1 << 1,
    /**
     * Multiline non-jsdoc pragma of the form
     * /* @pragma-name argval1 argval2 * /
     */
    MultiLine = 1 << 2,
    All = TripleSlashXML | SingleLine | MultiLine,
    Default = All,
}

/** @internal */
export interface PragmaArgumentSpecification<TName extends string> {
    name: TName; // Determines the name of the key in the resulting parsed type, type parameter to cause literal type inference
    optional?: boolean;
    captureSpan?: boolean;
}

/** @internal */
export interface PragmaDefinition<T1 extends string = string, T2 extends string = string, T3 extends string = string, T4 extends string = string> {
    args?:
        | readonly [PragmaArgumentSpecification<T1>]
        | readonly [PragmaArgumentSpecification<T1>, PragmaArgumentSpecification<T2>]
        | readonly [PragmaArgumentSpecification<T1>, PragmaArgumentSpecification<T2>, PragmaArgumentSpecification<T3>]
        | readonly [PragmaArgumentSpecification<T1>, PragmaArgumentSpecification<T2>, PragmaArgumentSpecification<T3>, PragmaArgumentSpecification<T4>];
    // If not present, defaults to PragmaKindFlags.Default
    kind?: PragmaKindFlags;
}

// While not strictly a type, this is here because `PragmaMap` needs to be here to be used with `SourceFile`, and we don't
//  fancy effectively defining it twice, once in value-space and once in type-space
/** @internal */
export const commentPragmas = {
    "reference": {
        args: [
            { name: "types", optional: true, captureSpan: true },
            { name: "lib", optional: true, captureSpan: true },
            { name: "path", optional: true, captureSpan: true },
            { name: "no-default-lib", optional: true },
            { name: "resolution-mode", optional: true },
            { name: "preserve", optional: true },
        ],
        kind: PragmaKindFlags.TripleSlashXML,
    },
    "amd-dependency": {
        args: [{ name: "path" }, { name: "name", optional: true }],
        kind: PragmaKindFlags.TripleSlashXML,
    },
    "amd-module": {
        args: [{ name: "name" }],
        kind: PragmaKindFlags.TripleSlashXML,
    },
    "this-object": {
        args: [{ name: "name" }],
        kind: PragmaKindFlags.SingleLine,
    },
    "this_object": {
        args: [{ name: "name" }],
        kind: PragmaKindFlags.SingleLine,
    },
    "lpc-check": {
        kind: PragmaKindFlags.SingleLine,
    },
    "lpc-nocheck": {
        kind: PragmaKindFlags.SingleLine,
    },    
} as const;

/**
 * Maps a pragma definition into the desired shape for its arguments object
 *
 * @internal
 */
export type PragmaArgumentType<KPrag extends keyof ConcretePragmaSpecs> = ConcretePragmaSpecs[KPrag] extends { args: readonly PragmaArgumentSpecification<any>[]; } ? UnionToIntersection<ArgumentDefinitionToFieldUnion<ConcretePragmaSpecs[KPrag]["args"]>>
    : never;

/** @internal */
export type ConcretePragmaSpecs = typeof commentPragmas;

/** @internal */
export type PragmaPseudoMap = { [K in keyof ConcretePragmaSpecs]: { arguments: PragmaArgumentType<K>; range: CommentRange; }; };

/** @internal */
export type PragmaPseudoMapEntry = { [K in keyof PragmaPseudoMap]: { name: K; args: PragmaPseudoMap[K]; }; }[keyof PragmaPseudoMap];

/** @internal */
export interface ReadonlyPragmaMap extends ReadonlyMap<string, PragmaPseudoMap[keyof PragmaPseudoMap] | PragmaPseudoMap[keyof PragmaPseudoMap][]> {
    get<TKey extends keyof PragmaPseudoMap>(key: TKey): PragmaPseudoMap[TKey] | PragmaPseudoMap[TKey][];
    forEach(action: <TKey extends keyof PragmaPseudoMap>(value: PragmaPseudoMap[TKey] | PragmaPseudoMap[TKey][], key: TKey, map: ReadonlyPragmaMap) => void): void;
}

/**
 * A strongly-typed es6 map of pragma entries, the values of which are either a single argument
 * value (if only one was found), or an array of multiple argument values if the pragma is present
 * in multiple places
 *
 * @internal
 */
export interface PragmaMap extends Map<string, PragmaPseudoMap[keyof PragmaPseudoMap] | PragmaPseudoMap[keyof PragmaPseudoMap][]>, ReadonlyPragmaMap {
    set<TKey extends keyof PragmaPseudoMap>(key: TKey, value: PragmaPseudoMap[TKey] | PragmaPseudoMap[TKey][]): this;
    get<TKey extends keyof PragmaPseudoMap>(key: TKey): PragmaPseudoMap[TKey] | PragmaPseudoMap[TKey][];
    forEach(action: <TKey extends keyof PragmaPseudoMap>(value: PragmaPseudoMap[TKey] | PragmaPseudoMap[TKey][], key: TKey, map: PragmaMap) => void): void;
}

/** @internal */
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

/** @internal */
export type ArgumentDefinitionToFieldUnion<T extends readonly PragmaArgumentSpecification<any>[]> = {
    [K in keyof T]: PragmaArgTypeOptional<T[K], T[K] extends { name: infer TName; } ? TName extends string ? TName : never : never>;
}[Extract<keyof T, number>]; // The mapped type maps over only the tuple members, but this reindex gets _all_ members - by extracting only `number` keys, we get only the tuple members

/** @internal */
export type PragmaArgTypeOptional<TDesc, TName extends string> = TDesc extends { optional: true; } ? { [K in TName]?: PragmaArgTypeMaybeCapture<TDesc>; }
    : { [K in TName]: PragmaArgTypeMaybeCapture<TDesc>; };

    
/** @internal */
export type PragmaArgTypeMaybeCapture<TDesc> = TDesc extends { captureSpan: true; } ? { value: string; pos: number; end: number; } : string;

export type ThisObjectPragmas = { arguments: { name: string; }; range: CommentRange; };

export type BlockLike =
    | SourceFile
    | Block    
    | CaseOrDefaultClause;

export type DeclarationWithTypeParameters =
    | DeclarationWithTypeParameterChildren
    | JSDocTypedefTag
    | JSDocCallbackTag
    | JSDocSignature;

    
export interface ConditionalRoot {
    node: ConditionalTypeNode;
    checkType: Type;
    extendsType: Type;
    isDistributive: boolean;
    inferTypeParameters?: TypeParameter[];
    outerTypeParameters?: TypeParameter[];
    instantiations?: Map<string, Type>;
    aliasSymbol?: Symbol;
    aliasTypeArguments?: Type[];
}
    
// T extends U ? X : Y (TypeFlags.Conditional)
export interface ConditionalType extends InstantiableType {
    root: ConditionalRoot;
    checkType: Type;
    extendsType: Type;
    resolvedTrueType?: Type;
    resolvedFalseType?: Type;
    /** @internal */
    resolvedInferredTrueType?: Type; // The `trueType` instantiated with the `combinedMapper`, if present
    /** @internal */
    resolvedDefaultConstraint?: Type;
    /** @internal */
    resolvedConstraintOfDistributive?: Type | false;
    /** @internal */
    mapper?: TypeMapper;
    /** @internal */
    combinedMapper?: TypeMapper;
}

export interface TupleTypeNode extends TypeNode {
    readonly kind: SyntaxKind.TupleType;
    readonly elements: NodeArray<TypeNode | NamedTupleMember>;
}

/** @internal */
export interface JSDocSatisfiesExpression extends ParenthesizedExpression {
    readonly _jsDocSatisfiesExpressionBrand: never;
}

export interface InterfaceDeclaration extends DeclarationStatement, JSDocContainer {
    readonly kind: SyntaxKind.InterfaceDeclaration;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly name: Identifier;
    readonly typeParameters?: NodeArray<TypeParameterDeclaration>;
    readonly heritageClauses?: NodeArray<HeritageClause>;
    readonly members: NodeArray<TypeElement>;
}

export interface JSDocNullableType extends JSDocType {
    readonly kind: SyntaxKind.JSDocNullableType;
    readonly type: TypeNode;
    readonly postfix: boolean;
}

export interface JSDocNonNullableType extends JSDocType {
    readonly kind: SyntaxKind.JSDocNonNullableType;
    readonly type: TypeNode;
    readonly postfix: boolean;
}

export type JSDocTypeReferencingNode =
    | JSDocVariadicType
    | JSDocOptionalType
    | JSDocNullableType
    | JSDocNonNullableType;

/** Return code used by getEmitOutput function to indicate status of the function */
export enum ExitStatus {
    // Compiler ran successfully.  Either this was a simple do-nothing compilation (for example,
    // when -version or -help was provided, or this was a normal compilation, no diagnostics
    // were produced, and all outputs were generated successfully.
    Success = 0,

    // Diagnostics were produced and because of them no code was generated.
    DiagnosticsPresent_OutputsSkipped = 1,

    // Diagnostics were produced and outputs were generated in spite of them.
    DiagnosticsPresent_OutputsGenerated = 2,

    // When build skipped because passed in project is invalid
    InvalidProject_OutputsSkipped = 3,

    // When build is skipped because project references form cycle
    ProjectReferenceCycle_OutputsSkipped = 4,
}

/** @internal */
export interface CommentDirectivesMap {
    getUnusedExpectations(): CommentDirective[];
    markUsed(matchedLine: number): boolean;
}
