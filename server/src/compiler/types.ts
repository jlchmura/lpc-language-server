import { BaseNodeFactory, MapLike, MultiMap, NodeFactoryFlags } from "./_namespaces/lpc";

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
    // internalFlags: InternalEmitFlags;        // Internal flags that customize emit
    // annotatedNodes?: Node[];                 // Tracks Parse-tree nodes with EmitNodes for eventual cleanup.
    // leadingComments?: SynthesizedComment[];  // Synthesized leading comments
    // trailingComments?: SynthesizedComment[]; // Synthesized trailing comments
    // commentRange?: TextRange;                // The text range to use when emitting leading or trailing comments
    // sourceMapRange?: SourceMapRange;         // The text range to use when emitting leading or trailing source mappings
    // tokenSourceMapRanges?: (SourceMapRange | undefined)[]; // The text range to use when emitting source mappings for tokens
    // constantValue?: string | number;         // The constant value of an expression
    // externalHelpersModuleName?: Identifier;  // The local name for an imported helpers module
    // externalHelpers?: boolean;
    // helpers?: EmitHelper[];                  // Emit helpers for the node
    // startsOnNewLine?: boolean;               // If the node should begin on a new line
    // snippetElement?: SnippetElement;         // Snippet element of the node
    // typeNode?: TypeNode;                     // VariableDeclaration type
    // classThis?: Identifier;                  // Identifier that points to a captured static `this` for a class which may be updated after decorators are applied
    // assignedName?: Expression;               // Expression used as the assigned name of a class or function
    // identifierTypeArguments?: NodeArray<TypeNode | TypeParameterDeclaration>; // Only defined on synthesized identifiers. Though not syntactically valid, used in emitting diagnostics, quickinfo, and signature help.
    // autoGenerate: AutoGenerateInfo | undefined; // Used for auto-generated identifiers and private identifiers.
    // generatedImportReference?: ImportSpecifier; // Reference to the generated import specifier this identifier refers to
}

export interface TypeChecker {
    /** @internal */ getNodeCount(): number;
    /** @internal */ getIdentifierCount(): number;
    /** @internal */ getSymbolCount(): number;
    /** @internal */ getTypeCount(): number;
    /** @internal */ getInstantiationCount(): number;
    
    signatureToString(signature: Signature, enclosingDeclaration?: Node, flags?: TypeFormatFlags, kind?: SignatureKind): string;
    
    // Should not be called directly.  Should only be accessed through the Program instance.
    /** @internal */ getDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken, nodesToCheck?: Node[]): Diagnostic[];
    
    // TODO
}

export type CompilerOptionsValue = string | number | boolean | (string | number)[] | string[] | MapLike<string[]> | ProjectReference[] | null | undefined; // eslint-disable-line no-restricted-syntax

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

/** Either a parsed command line or a parsed tsconfig.json */
export interface ParsedCommandLine {
    options: CompilerOptions;
    typeAcquisition?: TypeAcquisition;
    fileNames: string[];
    projectReferences?: readonly ProjectReference[];
    //watchOptions?: WatchOptions;
    raw?: any;
    errors: Diagnostic[];
    //wildcardDirectories?: MapLike<WatchDirectoryFlags>;
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

type UserPreferences = any;
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
    getModuleSpecifierCache?(): ModuleSpecifierCache;    
    getGlobalTypingsCacheLocation?(): string | undefined;
    getNearestAncestorDirectoryWithPackageJson?(fileName: string, rootDir?: string): string | undefined;

    readonly redirectTargetsMap: RedirectTargetsMap;
    getProjectReferenceRedirect(fileName: string): string | undefined;
    isSourceOfProjectReferenceRedirect(fileName: string): boolean;
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
    packageId?: string;
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
export interface TypeCheckerHost extends ModuleSpecifierResolutionHost {
    getCompilerOptions(): CompilerOptions;

    getSourceFiles(): readonly SourceFile[];
    getSourceFile(fileName: string): SourceFile | undefined;
    getProjectReferenceRedirect(fileName: string): string | undefined;
    isSourceOfProjectReferenceRedirect(fileName: string): boolean;
    getRedirectReferenceForResolutionFromSourceOfProject(filePath: Path): ResolvedProjectReference | undefined;    

    getResolvedModule(f: SourceFile, moduleName: string): ResolvedModuleWithFailedLookupLocations | undefined;

    readonly redirectTargetsMap: RedirectTargetsMap;

    typesPackageExists(packageName: string): boolean;
    packageBundlesTypes(packageName: string): boolean;
}


export const enum SignatureKind {
    Call,
    Construct,
}

// Properties common to all types
export interface Type {
    flags: TypeFlags; // Flags
    /** @internal */ id: TypeId; // Unique ID
    /** @internal */ checker: any; // TypeChecker
    symbol: Symbol; // Symbol associated with type (if any)    
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
    
    // Literals
    IntLiteral,
    FloatLiteral,
    StringLiteral,            

    // Punctuation
    OpenBraceToken, 
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
    GreaterThanToken,
    LessThanEqualsToken,
    GreaterThanEqualsToken,
    EqualsEqualsToken,
    ExclamationEqualsToken,
    EqualsEqualsEqualsToken,
    ExclamationEqualsEqualsToken,
    EqualsGreaterThanToken,
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
    TildeToken,
    AmpersandAmpersandToken,
    BarBarToken,
    QuestionToken,
    ColonToken,
    AtToken,
    HashToken,
    ColonColonToken,
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

    // Keywords
    IntKeyword,
    FloatKeyword,
    StringKeyword,
    ClosureKeywoord,
    StructKeyword,
    ObjectKeyword,
    MixedKeyword,
    UnknownKeyword,    
    InKeyword,
    MappingKeyword,
    VoidKeyword,
    BreakKeyword,
    ContinueKeyword,

    // Modifier Keywords
    PrivateKeyword,
    ProtectedKeyword,    
    PublicKeyword,
    StaticKeyword,
    VisibleKeyword,
    NoSaveKeyword,
    NoShadowKeyword,
    NoMaskKeyword,
    VarArgsKeyword,
    DeprecatedKeyword,  // LastKeyword and LastToken - everything after this will be processed by the binder

    // Parse Tree Nodes

    // Signature Elements
    TypeParameter,
    Parameter,

    // Types
    UnionType,
    ArrayType,

    // Elements
    FunctionDeclaration,

    // Property Assignments
    PropertyAssignment,
    ShorthandPropertyAssignment,

    // Top Level
    SourceFile,
    
    // JSDoc nodes
    JSDocTypeExpression,
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
    JSDocThrowsTag,
    JSDocSatisfiesTag,
    JSDocImportTag,

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
    CaseBlock,

    // Statements
    VariableStatement, // FirstStatement
    ForStatement,
    ForEachStatement,
    DoWhileStatement,
    WhileStatement,
    //ForInStatement,
    ExpressionStatement,
    ReturnStatement,
    BreakStatement,
    ContinueStatement,
    InheritDeclaration,
    IfStatement,
    EmptyStatement,
    SwitchStatement, // LastStatement

    // Expressions
    ConditionalExpression,
    BinaryExpression,
    FunctionExpression,
    CallExpression,
    NewExpression,
    ElementAccessExpression,
    InlineClosureExpression,
    PropertyAccessExpression,
    PostfixUnaryExpression,
    ParenthesizedExpression,
    ArrayLiteralExpression,
    ObjectLiteralExpression,
    SpreadElement,
    PrefixUnaryExpression,

    // Clauses
    CatchClause,
    CaseClause,
    DefaultClause,    

    LastKeyword = DeprecatedKeyword,
    FirstToken = Unknown,
    LastToken = LastKeyword,
    FirstStatement = VariableStatement,
    LastStatement = SwitchStatement ,
    FirstAssignment = EqualsToken,
    LastAssignment = CaretEqualsToken,
    SuperKeyword = ColonColonToken,
}

// dprint-ignore
export const enum TypeFlags {
    Any             = 1 << 0,
    Unknown         = 1 << 1,
    String          = 1 << 2,
    Number          = 1 << 3,
    Boolean         = 1 << 4,
    Enum            = 1 << 5,   // Numeric computed enum member value
    BigInt          = 1 << 6,
    StringLiteral   = 1 << 7,
    NumberLiteral   = 1 << 8,
    BooleanLiteral  = 1 << 9,
    EnumLiteral     = 1 << 10,  // Always combined with StringLiteral, NumberLiteral, or Union
    BigIntLiteral   = 1 << 11,
    ESSymbol        = 1 << 12,  // Type of symbol primitive introduced in ES6
    UniqueESSymbol  = 1 << 13,  // unique symbol
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

    /** @internal */
    AnyOrUnknown = Any | Unknown,
    /** @internal */
    Nullable = Undefined | Null,
    Literal = StringLiteral | NumberLiteral | BigIntLiteral | BooleanLiteral,
    Unit = Enum | Literal | UniqueESSymbol | Nullable,
    Freshable = Enum | Literal,
    StringOrNumberLiteral = StringLiteral | NumberLiteral,
    /** @internal */
    StringOrNumberLiteralOrUnique = StringLiteral | NumberLiteral | UniqueESSymbol,
    /** @internal */
    DefinitelyFalsy = StringLiteral | NumberLiteral | BigIntLiteral | BooleanLiteral | Void | Undefined | Null,
    PossiblyFalsy = DefinitelyFalsy | String | Number | BigInt | Boolean,
    /** @internal */
    Intrinsic = Any | Unknown | String | Number | BigInt | Boolean | BooleanLiteral | ESSymbol | Void | Undefined | Null | Never | NonPrimitive,
    StringLike = String | StringLiteral | TemplateLiteral | StringMapping,
    NumberLike = Number | NumberLiteral | Enum,
    BigIntLike = BigInt | BigIntLiteral,
    BooleanLike = Boolean | BooleanLiteral,
    EnumLike = Enum | EnumLiteral,
    ESSymbolLike = ESSymbol | UniqueESSymbol,
    VoidLike = Void | Undefined,
    /** @internal */
    Primitive = StringLike | NumberLike | BigIntLike | BooleanLike | EnumLike | ESSymbolLike | VoidLike | Null,
    /** @internal */
    DefinitelyNonNullable = StringLike | NumberLike | BigIntLike | BooleanLike | EnumLike | ESSymbolLike | Object | NonPrimitive,
    /** @internal */
    DisjointDomains = NonPrimitive | StringLike | NumberLike | BigIntLike | BooleanLike | ESSymbolLike | VoidLike | Null,
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
    Singleton = Any | Unknown | String | Number | Boolean | BigInt | ESSymbol | Void | Undefined | Null | Never | NonPrimitive,
    // 'Narrowable' types are types where narrowing actually narrows.
    // This *should* be every type other than null, undefined, void, and never
    Narrowable = Any | Unknown | StructuredOrInstantiable | StringLike | NumberLike | BigIntLike | BooleanLike | ESSymbol | UniqueESSymbol | NonPrimitive,
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
    Synthesized        = 1 << 4,  // Node was synthesized during transformation    
    HasImplicitReturn  = 1 << 9,  // If function implicitly returns on one of codepaths (initialized by binding)
    HasExplicitReturn  = 1 << 10,  // If function has explicit reachable return on one of codepaths (initialized by binding)
    HasAsyncFunctions  = 1 << 12, // If the file has async (i.e. LD coroutine) functions (initialized by binding)    
    ThisNodeHasError   = 1 << 18, // If the parser encountered an error when parsing the code that created this node
    HasAggregatedChildData = 1 << 21, // If we've computed data from children and cached it in this node

    JSDoc                                          = 1 << 24, // If node was parsed inside jsdoc
    /** @internal */ Ambient                       = 1 << 25, // If node was inside an ambient context -- a declaration file, or inside something with the `declare` modifier.
    /** @internal */ TypeCached                    = 1 << 28, // If a type was cached for node at any point
    /** @internal */ Deprecated                    = 1 << 29, // If has '@deprecated' JSDoc tag

    ReachabilityCheckFlags = HasImplicitReturn | HasExplicitReturn,
    ReachabilityAndEmitFlags = ReachabilityCheckFlags,

    // parse set flags
    BlockScoped = Variable,

    /** @internal */ IdentifierIsInJSDocNamespace = HasAsyncFunctions, // Indicates whether the identifier is part of a JSDoc namespace
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
}

export type KeywordTypeSyntaxKind =
    | SyntaxKind.IntKeyword
    | SyntaxKind.FloatKeyword
    | SyntaxKind.StringKeyword;

export type TypeNodeSyntaxKind =
    | KeywordTypeSyntaxKind
    | SyntaxKind.UnionType
    | SyntaxKind.ArrayType
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

export type PropertyName = Identifier | StringLiteral | IntLiteral;
export type MemberName = Identifier | Expression;

export type DeclarationName =
    | PropertyName
    | StringLiteral
    | Expression
    // | ElementAccessExpression
    // | BindingPattern
    // | EntityNameExpression;
    ;

export interface Symbol {
    flags: SymbolFlags;                     // Symbol flags
    name: string;                           // Name of symbol
    declarations?: Declaration[];           // Declarations associated with this symbol
    valueDeclaration?: Declaration;         // First value declaration of the symbol
    members?: SymbolTable;                  // Class, interface or object literal instance members
    exports?: SymbolTable;                  // Module exports
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

export interface NodeFactory {
    ///** @internal */ readonly parenthesizer: ParenthesizerRules;
    ///** @internal */ readonly converters: NodeConverters;
    /** @internal */ readonly baseFactory: BaseNodeFactory;
    /** @internal */ readonly flags: NodeFactoryFlags;

    createSourceFile(statements: readonly Statement[], endOfFileToken: EndOfFileToken, flags: NodeFlags): SourceFile;
    createNodeArray<T extends Node>(elements?: readonly T[], hasTrailingComma?: boolean): NodeArray<T>;
    createIntLiteral(value: string|number, numericLiteralFlags?: TokenFlags): IntLiteral;
    createFloatLiteral(value: string|number, numericLiteralFlags?: TokenFlags): FloatLiteral;
    createStringLiteral(text: string, isSingleQuote?: boolean): StringLiteral;
    /** @internal */ createStringLiteral(text: string, isSingleQuote?: boolean, hasExtendedUnicodeEscape?: boolean): StringLiteral; // eslint-disable-line @typescript-eslint/unified-signatures

    createToken(token: SyntaxKind.EndOfFileToken): EndOfFileToken;
    createToken(token: SyntaxKind.Unknown): Token<SyntaxKind.Unknown>;    
    /** @internal */ createToken<TKind extends SyntaxKind>(token: TKind): Token<TKind>;

    createIdentifier(text: string): Identifier;
    createLiteralLikeNode(kind: LiteralToken["kind"], text: string): LiteralToken;
    

    // types
    createUnionTypeNode(types: readonly TypeNode[]): UnionTypeNode;
    createArrayTypeNode(elementType: TypeNode): ArrayTypeNode;

    // Statements
    createBlock(statements: readonly Statement[], multiLine?: boolean): Block;
    createVariableStatement(modifiers: readonly Modifier[] | undefined, declarationList: VariableDeclarationList | readonly VariableDeclaration[]): VariableStatement;
    createVariableDeclarationList(declarations: readonly VariableDeclaration[], flags?: NodeFlags): VariableDeclarationList;
    createVariableDeclaration(name: string | BindingName, type: TypeNode | undefined, initializer: Expression | undefined): VariableDeclaration;    
    createFunctionDeclaration(modifiers: readonly Modifier[] | undefined, name: string | Identifier | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined): FunctionDeclaration;
    createExpressionStatement(expression: Expression): ExpressionStatement;
    createReturnStatement(expression?: Expression): ReturnStatement;
    createBreakStatement(label?: string | Identifier): BreakStatement;
    createContinueStatement(label?: string | Identifier): ContinueStatement;
    createInheritDeclaration(importClause: StringLiteral | BinaryExpression, modifiers: readonly Modifier[] | undefined): InheritDeclaration;
    createIfStatement(expression: Expression, thenStatement: Statement, elseStatement?: Statement): IfStatement;
    createSwitchStatement(expression: Expression, preBlock: NodeArray<Statement>, caseBlock: CaseBlock): SwitchStatement;
    createCaseBlock(clauses: readonly CaseOrDefaultClause[]): CaseBlock;
    createDefaultClause(statements: readonly Statement[]): DefaultClause;
    createCaseClause(expression: Expression, statements: readonly Statement[]): CaseClause;
    createForStatement(initializer: ForInitializer | undefined, condition: Expression | undefined, incrementor: Expression | undefined, statement: Statement): ForStatement
    createForEachStatement(initializer: ForEachInitializer | undefined, range: Expression | undefined, statement: Statement): ForEachStatement;
    createDoWhileStatement(statement: Statement, expression: Expression): DoWhileStatement;
    createWhileStatement(statement: Statement, expression: Expression): WhileStatement;
    createParameterDeclaration(modifiers: readonly Modifier[] | undefined, dotDotDotToken: DotDotDotToken | undefined, name: string | BindingName, ampToken?: AmpersandToken, type?: TypeNode, initializer?: Expression): ParameterDeclaration;

    // Expressions
    createConditionalExpression(condition: Expression, questionToken: QuestionToken | undefined, whenTrue: Expression, colonToken: ColonToken | undefined, whenFalse: Expression): ConditionalExpression;
    createBinaryExpression(left: Expression, operator: BinaryOperator | BinaryOperatorToken, right: Expression): BinaryExpression;
    createCallExpression(expression: Expression, argumentsArray: readonly Expression[] | undefined): CallExpression;
    createInlineClosure(body: ConciseBody): InlineClosureExpression;
    createPropertyAccessExpression(expression: Expression, name: string | Identifier | Expression): PropertyAccessExpression;
    createPostfixUnaryExpression(operand: Expression, operator: PostfixUnaryOperator): PostfixUnaryExpression;
}

export interface CompilerOptions {
    allowUnreachableCode?: boolean;
    noFallthroughCasesInSwitch?: boolean;
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

export interface DiagnosticRelatedInformation {
    category: DiagnosticCategory;
    code: number;
    file: SourceFile | undefined;
    start: number | undefined;
    length: number | undefined;
    messageText: string | DiagnosticMessageChain;
}

export interface DiagnosticWithLocation extends Diagnostic {
    file: SourceFile;
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
    // | ClassExpression
    // | ClassDeclaration
    // | EnumDeclaration
    // | ObjectLiteralExpression
    // | TypeLiteralNode
    | JSDocTypeLiteral
    // | JsxAttributes
    // | InterfaceDeclaration
    // | ModuleDeclaration
    // | TypeAliasDeclaration
    // | MappedTypeNode
    // | IndexSignatureDeclaration
    | SourceFile
    // | GetAccessorDeclaration
    // | SetAccessorDeclaration
    // | MethodDeclaration
    // | ConstructorDeclaration
    | FunctionDeclaration
    // | MethodSignature
    // | CallSignatureDeclaration
    | JSDocSignature
    // | JSDocFunctionType
    // | FunctionTypeNode
    // | ConstructSignatureDeclaration
    // | ConstructorTypeNode
    // | ClassStaticBlockDeclaration
    | FunctionExpression
    // | ArrowFunction;

/**
 * Nodes that introduce a new block scope. Corresponds with `ContainerFlags.IsBlockScopedContainer` in binder.ts.
 *
 * @internal
 */
export type IsBlockScopedContainer =
    | IsContainer
    | CatchClause
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
    //| MethodDeclaration    
    | FunctionExpression
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
    | Block 
    | DoWhileStatement
    | ForStatement
    | ForEachStatement
    | FunctionDeclaration
    | ReturnStatement
    | ParameterDeclaration
    | VariableStatement     
    | VariableDeclaration
    | WhileStatement;


/**
 * Nodes that can have local symbols. Corresponds with `ContainerFlags.HasLocals`. Constituents should extend
 * {@link LocalsContainer}.
 *
 * @internal
 */
export type HasLocals =
    | InlineClosureExpression
    | Block
    //| CallSignatureDeclaration
    | CaseBlock
    | CatchClause
    // | ClassStaticBlockDeclaration
    // | ConditionalTypeNode
    // | ConstructorDeclaration
    // | ConstructorTypeNode
    // | ConstructSignatureDeclaration
    | ForStatement
    | ForEachStatement    
    | FunctionDeclaration
    | FunctionExpression
    // | FunctionTypeNode
    // | GetAccessorDeclaration
    // | IndexSignatureDeclaration
    // | JSDocCallbackTag
    // | JSDocEnumTag
    // | JSDocFunctionType
    | JSDocSignature
    // | JSDocTypedefTag
    // | MappedTypeNode
    // | MethodDeclaration
    // | MethodSignature
    // | ModuleDeclaration
    // | SetAccessorDeclaration
    | SourceFile
    //| TypeAliasDeclaration;
    ;

// NOTE: Changing the following list requires changes to:
// - `canHaveModifiers` in factory/utilitiesPublic.ts
// - `updateModifiers` in factory/nodeFactory.ts
export type HasModifiers =
    | TypeParameterDeclaration
    | ParameterDeclaration
    // | ConstructorTypeNode
    // | PropertySignature
    // | PropertyDeclaration
    // | MethodSignature
    // | MethodDeclaration
    // | ConstructorDeclaration
    // | GetAccessorDeclaration
    // | SetAccessorDeclaration
    // | IndexSignatureDeclaration
    | FunctionExpression
    // | ArrowFunction
    // | ClassExpression
    | VariableStatement
    | FunctionDeclaration
    // | ClassDeclaration
    // | InterfaceDeclaration
    // | TypeAliasDeclaration
    // | EnumDeclaration
    // | ModuleDeclaration
    // | ImportEqualsDeclaration
    // | ImportDeclaration
    // | ExportAssignment
    // | ExportDeclaration
    ;

/** @internal */
export type HasFlowNode =
    | Identifier
    // | ThisExpression
    // | SuperExpression
    // | QualifiedName
    // | MetaProperty
    // | ElementAccessExpression
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
    // | MissingDeclaration
    | JSDocTypeExpression
    // | JSDocNonNullableType
    // | JSDocNullableType
    // | JSDocOptionalType
    // | JSDocVariadicType
    // | JSDocFunctionType
    | JSDoc
    // | JSDocSeeTag
    // | JSDocNameReference
    // | JSDocMemberName
    // | JSDocParameterTag
    // | JSDocPropertyTag
    // | JSDocAuthorTag
    // | JSDocImplementsTag
    // | JSDocAugmentsTag
    // | JSDocTemplateTag
    // | JSDocTypedefTag
    // | JSDocCallbackTag
    // | JSDocReturnTag
    // | JSDocTypeTag
    // | JSDocThisTag
    // | JSDocEnumTag
    | JSDocSignature
    | JSDocTypeLiteral
    // | JSDocLink
    // | JSDocLinkCode
    // | JSDocLinkPlain
    // | JSDocUnknownTag
    // | JSDocClassTag
    // | JSDocPublicTag
    // | JSDocPrivateTag
    // | JSDocProtectedTag
    // | JSDocReadonlyTag
    // | JSDocDeprecatedTag
    // | JSDocThrowsTag
    // | JSDocOverrideTag
    // | JSDocSatisfiesTag
    // | JSDocOverloadTag
    // | JSDocImportTag;
    ;

/** @internal */
export type HasChildren =
    | ParameterDeclaration
    // | QualifiedName
    // | ComputedPropertyName
    | TypeParameterDeclaration
    // | Decorator
    // | PropertySignature
    // | PropertyDeclaration
    // | MethodSignature
    // | MethodDeclaration
    // | ConstructorDeclaration
    // | GetAccessorDeclaration
    // | SetAccessorDeclaration
    // | ClassStaticBlockDeclaration
    // | CallSignatureDeclaration
    // | ConstructSignatureDeclaration
    // | IndexSignatureDeclaration
    // | TypePredicateNode
    // | TypeReferenceNode
    // | FunctionTypeNode
    // | ConstructorTypeNode
    // | TypeQueryNode
    // | TypeLiteralNode
    // | TupleTypeNode
    // | OptionalTypeNode
    // | RestTypeNode
    | ArrayTypeNode
    | UnionTypeNode
    // | IntersectionTypeNode
    // | ConditionalTypeNode
    // | InferTypeNode
    // | ImportTypeNode
    // | ImportTypeAssertionContainer
    // | NamedTupleMember
    // | ParenthesizedTypeNode
    // | TypeOperatorNode
    // | IndexedAccessTypeNode
    // | MappedTypeNode
    // | LiteralTypeNode
    // | TemplateLiteralTypeNode
    // | TemplateLiteralTypeSpan
    // | ObjectBindingPattern
    // | ArrayBindingPattern
    // | BindingElement
    // | ArrayLiteralExpression
    // | ObjectLiteralExpression
    | PropertyAccessExpression
    | CallExpression
    // | ElementAccessExpression
    // | NewExpression
    // | TaggedTemplateExpression
    // | TypeAssertion
    // | ParenthesizedExpression
    | FunctionExpression
    | InlineClosureExpression
    // | DeleteExpression
    // | TypeOfExpression
    // | VoidExpression
    // | AwaitExpression
    // | PrefixUnaryExpression
    | PostfixUnaryExpression
    | BinaryExpression
    | ConditionalExpression
    // | TemplateExpression
    // | YieldExpression
    // | SpreadElement
    // | ClassExpression
    // | ExpressionWithTypeArguments
    // | AsExpression
    // | NonNullExpression
    // | SatisfiesExpression
    // | MetaProperty
    // | TemplateSpan
    | Block
    | VariableStatement
    | ExpressionStatement
    | IfStatement
    | DoWhileStatement
    | WhileStatement
    | ForStatement
    //| ForInStatement
    | ForEachStatement
    // | ForOfStatement
    | ContinueStatement
    | BreakStatement
    | ReturnStatement
    | SwitchStatement
    // | WithStatement
    // | LabeledStatement
    // | ThrowStatement
    // | TryStatement
    | VariableDeclaration
    | VariableDeclarationList
    | FunctionDeclaration
    // | ClassDeclaration
    // | InterfaceDeclaration
    // | TypeAliasDeclaration
    // | EnumDeclaration
    // | ModuleDeclaration
    // | ModuleBlock
    | CaseBlock
    // | NamespaceExportDeclaration
    // | ImportEqualsDeclaration
    // | ImportDeclaration
    // | AssertClause
    // | AssertEntry
    //| ImportAttributes
    // | ImportAttribute
    // | ImportClause
    // | NamespaceImport
    // | NamespaceExport
    // | NamedImports
    // | ImportSpecifier
    // | ExportAssignment
    // | ExportDeclaration
    // | NamedExports
    // | ExportSpecifier
    // | ExternalModuleReference
    // | JsxElement
    // | JsxSelfClosingElement
    // | JsxOpeningElement
    // | JsxClosingElement
    // | JsxFragment
    // | JsxAttribute
    // | JsxAttributes
    // | JsxSpreadAttribute
    // | JsxExpression
    // | JsxNamespacedName
    | CaseClause
    | DefaultClause
    // | HeritageClause
    | CatchClause
    // | PropertyAssignment
    // | ShorthandPropertyAssignment
    // | SpreadAssignment
    // | EnumMember
    | SourceFile
    // | PartiallyEmittedExpression
    // | CommaListExpression;
    ;

export interface NodeArray<T extends Node> extends ReadonlyArray<T>, ReadonlyTextRange {
    readonly hasTrailingComma: boolean;
    /** @internal */ transformFlags: TransformFlags; // Flags for transforms, possibly undefined
}

/** @internal */
export interface MutableNodeArray<T extends Node> extends Array<T>, TextRange {
    hasTrailingComma: boolean;
    /** @internal */ transformFlags: TransformFlags; // Flags for transforms, possibly undefined
}

// TODO(rbuckton): Constraint 'TKind' to 'TokenSyntaxKind'
export interface Token<TKind extends SyntaxKind> extends Node {
    readonly kind: TKind;
}

export type EndOfFileToken = Token<SyntaxKind.EndOfFileToken> & JSDocContainer;

export type KeywordSyntaxKind =
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

export type PunctuationSyntaxKind =
    | SyntaxKind.OpenBraceToken
    | SyntaxKind.CloseBraceToken
    | SyntaxKind.OpenParenToken
    | SyntaxKind.CloseParenToken
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
    | SyntaxKind.TildeToken
    | SyntaxKind.AmpersandAmpersandToken    
    | SyntaxKind.BarBarToken
    | SyntaxKind.BarBarEqualsToken
    | SyntaxKind.QuestionToken
    | SyntaxKind.ColonToken
    | SyntaxKind.AtToken
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
export type BinaryOperator = AssignmentOperatorOrHigher | SyntaxKind.CommaToken | SyntaxKind.DotDotToken;
export type BinaryOperatorToken = Token<BinaryOperator>;

export type LogicalOrCoalescingAssignmentOperator = SyntaxKind.BarBarEqualsToken;

// Punctuation
export interface PunctuationToken<TKind extends PunctuationSyntaxKind> extends Token<TKind> {}
export type DotToken = PunctuationToken<SyntaxKind.DotToken>;
export type AmpersandToken = PunctuationToken<SyntaxKind.AmpersandToken>;
export type DotDotDotToken = PunctuationToken<SyntaxKind.DotDotDotToken>;
export type QuestionToken = PunctuationToken<SyntaxKind.QuestionToken>;
export type ExclamationToken = PunctuationToken<SyntaxKind.ExclamationToken>;
export type ColonToken = PunctuationToken<SyntaxKind.ColonToken>;
export type EqualsToken = PunctuationToken<SyntaxKind.EqualsToken>;
export type BarBarEqualsToken = PunctuationToken<SyntaxKind.BarBarEqualsToken>;
export type AsteriskToken = PunctuationToken<SyntaxKind.AsteriskToken>;
export type EqualsGreaterThanToken = PunctuationToken<SyntaxKind.EqualsGreaterThanToken>;
export type PlusToken = PunctuationToken<SyntaxKind.PlusToken>;
export type MinusToken = PunctuationToken<SyntaxKind.MinusToken>;

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
    node: FunctionExpression | undefined;//| ArrowFunction | MethodDeclaration | GetAccessorDeclaration | SetAccessorDeclaration | undefined;
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
    node: Expression | VariableDeclaration;// | BindingElement;
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

// Source files are declarations when they are external modules.
export interface SourceFile extends Declaration, LocalsContainer {
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
    
    referencedFiles: readonly FileReference[];    
    libReferenceDirectives: readonly FileReference[];
    isDeclarationFile: boolean;

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
    //setExternalModuleIndicator?: (file: SourceFile) => void;
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

    // // File-level JSDoc diagnostics reported by the JSDoc parser
    // /** @internal */ jsDocDiagnostics?: DiagnosticWithLocation[];

    // // Stores additional file-level diagnostics reported by the program
    // /** @internal */ additionalSyntacticDiagnostics?: readonly DiagnosticWithLocation[];

    // Stores a line map for the file.
    // This field should never be used directly to obtain line map, use getLineMap function instead.
    /** @internal */ lineMap: readonly number[];
    /** @internal */ classifiableNames?: ReadonlySet<string>;
    // // Comments containing @ts-* directives, in order.
    // /** @internal */ commentDirectives?: CommentDirective[];
    /** @internal */ inherits: NodeArray<InheritDeclaration>;
    // Identifier only if `declare global`
    ///** @internal */ moduleAugmentations: readonly (StringLiteral | Identifier)[];    
    /** @internal */ ambientModuleNames: readonly string[];    
    /** @internal */ version: string;
    ///** @internal */ pragmas: ReadonlyPragmaMap;    

    /** @internal */ endFlowNode?: FlowNode;

    ///** @internal */ jsDocParsingMode?: JSDocParsingMode;
}

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
    BinaryOrOctalSpecifier = BinarySpecifier | OctalSpecifier,
    /** @internal */
    WithSpecifier = HexSpecifier | BinaryOrOctalSpecifier,
    /** @internal */
    StringLiteralFlags = HexEscape | UnicodeEscape | ExtendedUnicodeEscape | ContainsInvalidEscape,
    /** @internal */
    NumericLiteralFlags = Scientific | Octal | ContainsLeadingZero | WithSpecifier | ContainsSeparator | ContainsInvalidSeparator,
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
    ExportStar              = 1 << 23,  // Export * declaration
    Optional                = 1 << 24,  // Optional property
    Transient               = 1 << 25,  // Transient symbol (created during type check)
    Assignment              = 1 << 26,  // Assignment treated as declaration (eg `this.prop = 1`)
    ModuleExports           = 1 << 27,  // Symbol for CommonJS `module` of `module.exports`
    All = -1,

    Enum = RegularEnum | ConstEnum,
    Variable = FunctionScopedVariable | BlockScopedVariable,
    Value = Variable | Property | EnumMember | ObjectLiteral | Function | Class | Enum | ValueModule | Method | GetAccessor | SetAccessor,
    Type = Class | Interface | Enum | EnumMember | TypeLiteral | TypeParameter | TypeAlias,
    Namespace = ValueModule | NamespaceModule | Enum,
    Module = ValueModule | NamespaceModule,
    Accessor = GetAccessor | SetAccessor,

    // Variables can be redeclared, but can not redeclare a block-scoped declaration with the
    // same name, or any other value that is not a variable, e.g. ValueModule or Class
    FunctionScopedVariableExcludes = Value & ~FunctionScopedVariable,

    // Block-scoped declarations are not allowed to be re-declared
    // they can not merge with anything in the value space
    BlockScopedVariableExcludes = Value,

    ParameterExcludes = Value,
    PropertyExcludes = None,
    EnumMemberExcludes = Value | Type,
    FunctionExcludes = Value & ~(Function | ValueModule | Class),
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

export type PropertyNameLiteral = Identifier | StringLiteral | IntLiteral;

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

export type LiteralToken = IntLiteral | FloatLiteral | StringLiteral;
export type LiteralSyntaxKind =
    | SyntaxKind.IntLiteral
    | SyntaxKind.FloatLiteral
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

export interface ArrayTypeNode extends TypeNode {
    readonly kind: SyntaxKind.ArrayType;
    readonly elementType: TypeNode;
}

export interface JSDocContainer extends Node {
    _jsDocContainerBrand: any;
    /** jsdoc that directly precedes this node */
    jsDoc?: any;
}




export interface JSDocType extends TypeNode {
    _jsDocTypeBrand: any;
}

/** @internal */
export interface JSDocArray extends Array<JSDoc> {
    jsDocCache?: readonly JSDocTag[]; // Cache for getJSDocTags
}

export type EntityName = Identifier; // add QualifiedName is needed

export interface JSDocPropertyLikeTag extends JSDocTag, Declaration {
    readonly parent: JSDoc;
    readonly name: EntityName;
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

export interface JSDocText extends Node {
    readonly kind: SyntaxKind.JSDocText;
    text: string;
}

export type JSDocComment = JSDocText;// | JSDocLink | JSDocLinkCode | JSDocLinkPlain;

export interface Expression extends Node {
    _expressionBrand: any;
}

// Represents an expression that is elided as part of a transformation to emit comments on a
// not-emitted node. The 'expression' property of a PartiallyEmittedExpression should be emitted.
export interface PartiallyEmittedExpression extends LeftHandSideExpression {
    readonly kind: SyntaxKind.PartiallyEmittedExpression;
    readonly expression: Expression;
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

export interface Identifier
    extends PrimaryExpression,
        Declaration,
        JSDocContainer,
        FlowContainer {
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

export interface CatchClause extends Node, LocalsContainer {
    readonly kind: SyntaxKind.CatchClause;
    readonly parent: Expression;
    readonly variableDeclaration?: VariableDeclaration;
    readonly block: Block;
}

export interface NamedDeclaration extends Declaration {
    readonly name?: DeclarationName;
}

export type BindingName = Identifier; // TODO do we need BindingPattern?
export interface VariableDeclaration extends NamedDeclaration, JSDocContainer {
    readonly kind: SyntaxKind.VariableDeclaration;
    readonly parent: VariableDeclarationList | CatchClause;
    readonly name: BindingName;                    // Declared variable name    
    readonly type?: TypeNode;                      // Optional type annotation
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
export type ForEachInitializer = NodeArray<ForInitializer>;

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
}


export interface BinaryExpression extends Expression, Declaration, JSDocContainer {
    readonly kind: SyntaxKind.BinaryExpression;
    readonly left: Expression;
    readonly operatorToken: BinaryOperatorToken;
    readonly right: Expression;
}

export type FunctionBody = Block;
export type ConciseBody = FunctionBody | Expression;

export interface ParameterDeclaration extends NamedDeclaration, JSDocContainer {
    readonly kind: SyntaxKind.Parameter;
    readonly parent: SignatureDeclaration;
    readonly modifiers?: NodeArray<Modifier>;
    readonly dotDotDotToken?: DotDotDotToken;    // Present on rest parameter
    readonly name: BindingName;                  // Declared parameter name.
    readonly ampToken?: AmpersandToken;          // Present on "by ref" parameters
    readonly type?: TypeNode;                    // Optional type annotation
    readonly initializer?: Expression;           // Optional initializer
}

export interface SignatureDeclarationBase extends NamedDeclaration, JSDocContainer {
    readonly kind: SignatureDeclaration["kind"];
    readonly name?: PropertyName;    
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

export interface FunctionExpression
    extends PrimaryExpression,
        FunctionLikeDeclarationBase,
        JSDocContainer,
        LocalsContainer,
        FlowContainer {
    readonly kind: SyntaxKind.FunctionExpression;
    readonly modifiers?: NodeArray<Modifier>;
    readonly name?: Identifier;
    readonly body: FunctionBody; // Required, whereas the member inherited from FunctionDeclaration is optional
}

export type SignatureDeclaration =
    // | CallSignatureDeclaration
    // | ConstructSignatureDeclaration
    // | MethodSignature
    // | IndexSignatureDeclaration
    // | FunctionTypeNode
    // | ConstructorTypeNode
    // | JSDocFunctionType
    | FunctionDeclaration
    // | MethodDeclaration
    // | ConstructorDeclaration
    // | AccessorDeclaration
    | InlineClosureExpression
    | FunctionExpression
    ;

export type DeclarationWithTypeParameterChildren =
    | SignatureDeclaration
    // | ClassLikeDeclaration
    // | InterfaceDeclaration
    // | TypeAliasDeclaration
    // | JSDocTemplateTag;
    ;

    
/** @deprecated not used in LPC? */
export interface TypeParameterDeclaration extends NamedDeclaration, JSDocContainer {
    readonly kind: SyntaxKind.TypeParameter;
    readonly parent: DeclarationWithTypeParameterChildren;
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

export interface FunctionDeclaration extends FunctionLikeDeclarationBase, DeclarationStatement, LocalsContainer {
    readonly kind: SyntaxKind.FunctionDeclaration;
    readonly modifiers?: NodeArray<Modifier>;
    readonly name?: Identifier;
    readonly body?: FunctionBody;
}

export interface CallExpression extends LeftHandSideExpression, Declaration {
    readonly kind: SyntaxKind.CallExpression;
    readonly expression: LeftHandSideExpression;
    ///** @deprecated LPC doesn't use type args on call expressions */
    //readonly typeArguments?: NodeArray<TypeNode>;
    readonly arguments: NodeArray<Expression>;
}

export interface InlineClosureExpression extends Expression, FunctionLikeDeclarationBase, JSDocContainer, LocalsContainer, FlowContainer {
    readonly kind: SyntaxKind.InlineClosureExpression;
    readonly body: ConciseBody;
    readonly name: never;
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
    readonly inheritClause: InheritClauseType;
}

export type InheritClauseType = StringLiteral | BinaryExpression;

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
    readonly name: MemberName;
}

export interface ForStatement extends IterationStatement, LocalsContainer, FlowContainer {
    readonly kind: SyntaxKind.ForStatement;
    readonly initializer?: ForInitializer;
    readonly condition?: Expression;
    readonly incrementor?: Expression;
}

export interface ForEachStatement extends IterationStatement, LocalsContainer, FlowContainer {
    readonly kind: SyntaxKind.ForEachStatement;
    readonly initializer: ForEachInitializer;
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
    JsxAttributes    = 1 << 11, // Jsx attributes type
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

    // Non-propagating flags
    IsInnerCallChain = 1 << 3,          // Indicates signature comes from a CallChain nested in an outer OptionalChain
    IsOuterCallChain = 1 << 4,          // Indicates signature comes from a CallChain that is the outermost chain of an optional expression
    IsUntypedSignatureInJSFile = 1 << 5, // Indicates signature is from a js file and has no types
    IsNonInferrable = 1 << 6,           // Indicates signature comes from a non-inferrable type
    IsSignatureCandidateForOverloadFailure = 1 << 7,

    // We do not propagate `IsInnerCallChain` or `IsOuterCallChain` to instantiated signatures, as that would result in us
    // attempting to add `| undefined` on each recursive call to `getReturnTypeOfSignature` when
    // instantiating the return type.
    PropagatingFlags = HasRestParameter | HasLiteralTypes | Abstract | IsUntypedSignatureInJSFile | IsSignatureCandidateForOverloadFailure,

    CallChainFlags = IsInnerCallChain | IsOuterCallChain,
}

export interface JSDocSignature extends JSDocType, Declaration, JSDocContainer, LocalsContainer {
    readonly kind: SyntaxKind.JSDocSignature;
    // TODO
    // readonly typeParameters?: readonly JSDocTemplateTag[];
    // readonly parameters: readonly JSDocParameterTag[];
    // readonly type: JSDocReturnTag | undefined;
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
    // // Lazily set by `getTypePredicateOfSignature`.
    // // `undefined` indicates a type predicate that has not yet been computed.
    // // Uses a special `noTypePredicate` sentinel value to indicate that there is no type predicate. This looks like a TypePredicate at runtime to avoid polymorphism.
    // resolvedTypePredicate?: TypePredicate;
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
    ///** @internal */ indexInfos?: readonly IndexInfo[];  // Index signatures - doesn't exist in LPC
    /** @internal */ objectTypeWithoutAbstractConstructSignatures?: ObjectType;
}

/** @internal */
export type MatchingKeys<TRecord, TMatch, K extends keyof TRecord = keyof TRecord> = K extends (TRecord[K] extends TMatch ? K : never) ? K : never;

export const enum InternalSymbolName {
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
}

export type PrefixUnaryOperator =
    | SyntaxKind.PlusPlusToken
    | SyntaxKind.MinusMinusToken
    | SyntaxKind.PlusToken
    | SyntaxKind.MinusToken
    | SyntaxKind.TildeToken
    | SyntaxKind.ExclamationToken;

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

export interface ArrayLiteralExpression extends PrimaryExpression {
    readonly kind: SyntaxKind.ArrayLiteralExpression;
    readonly elements: NodeArray<Expression>;
    /** @internal */
    multiLine?: boolean;
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
    // | MethodDeclaration
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

export interface ElementAccessExpression extends MemberExpression, Declaration, JSDocContainer, FlowContainer {
    readonly kind: SyntaxKind.ElementAccessExpression;
    readonly expression: LeftHandSideExpression;    
    readonly argumentExpression: Expression;
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
    //resolvedTypePredicate?: TypePredicate;
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

/** @internal */
export interface SymbolLinks {
    _symbolLinksBrand: any;
    immediateTarget?: Symbol;                   // Immediate target of an alias. May be another alias. Do not access directly, use `checker.getImmediateAliasedSymbol` instead.
    aliasTarget?: Symbol,                       // Resolved (non-alias) target of an alias
    target?: Symbol;                            // Original version of an instantiated symbol
    type?: Type;                                // Type of value symbol
    writeType?: Type;                           // Type of value symbol in write contexts
    nameType?: Type;                            // Type associated with a late-bound symbol
    // TODO
    // uniqueESSymbolType?: Type;                  // UniqueESSymbol type for a symbol
    // declaredType?: Type;                        // Type of class, interface, enum, type alias, or type parameter
    // typeParameters?: TypeParameter[];           // Type parameters of type alias (undefined if non-generic)
    // instantiations?: Map<string, Type>;         // Instantiations of generic type alias (undefined if non-generic)
    // inferredClassSymbol?: Map<SymbolId, TransientSymbol>; // Symbol of an inferred ES5 constructor function
    // mapper?: TypeMapper;                        // Type mapper for instantiation alias
    // referenced?: boolean;                       // True if alias symbol has been referenced as a value that can be emitted
    // containingType?: UnionOrIntersectionType;   // Containing union or intersection type for synthetic property
    // leftSpread?: Symbol;                        // Left source for synthetic spread property
    // rightSpread?: Symbol;                       // Right source for synthetic spread property
    // syntheticOrigin?: Symbol;                   // For a property on a mapped or spread type, points back to the original property
    // isDiscriminantProperty?: boolean;           // True if discriminant synthetic property
    // resolvedExports?: SymbolTable;              // Resolved exports of module or combined early- and late-bound static members of a class.
    // resolvedMembers?: SymbolTable;              // Combined early- and late-bound members of a symbol
    // exportsChecked?: boolean;                   // True if exports of external module have been checked
    // typeParametersChecked?: boolean;            // True if type parameters of merged class and interface declarations have been checked.
    // isDeclarationWithCollidingName?: boolean;   // True if symbol is block scoped redeclaration
    // bindingElement?: BindingElement;            // Binding element associated with property symbol
    // originatingImport?: ImportDeclaration | ImportCall; // Import declaration which produced the symbol, present if the symbol is marked as uncallable but had call signatures in `resolveESModuleSymbol`
    // lateSymbol?: Symbol;                        // Late-bound symbol for a computed property
    // specifierCache?: Map<ModeAwareCacheKey, string>; // For symbols corresponding to external modules, a cache of incoming path -> module specifier name mappings
    // extendedContainers?: Symbol[];              // Containers (other than the parent) which this symbol is aliased in
    // extendedContainersByFile?: Map<NodeId, Symbol[]>; // Containers (other than the parent) which this symbol is aliased in
    // variances?: VarianceFlags[];                // Alias symbol type argument variance cache
    // deferralConstituents?: Type[];              // Calculated list of constituents for a deferred type
    // deferralWriteConstituents?: Type[];         // Constituents of a deferred `writeType`
    // deferralParent?: Type;                      // Source union/intersection of a deferred type
    // cjsExportMerged?: Symbol;                   // Version of the symbol with all non export= exports merged with the export= target
    // typeOnlyDeclaration?: TypeOnlyAliasDeclaration | false; // First resolved alias declaration that makes the symbol only usable in type constructs
    // typeOnlyExportStarMap?: Map<__String, ExportDeclaration & { readonly isTypeOnly: true, readonly moduleSpecifier: Expression }>; // Set on a module symbol when some of its exports were resolved through a 'export type * from "mod"' declaration
    // typeOnlyExportStarName?: __String;          // Set to the name of the symbol re-exported by an 'export type *' declaration, when different from the symbol name
    // isConstructorDeclaredProperty?: boolean;    // Property declared through 'this.x = ...' assignment in constructor
    // tupleLabelDeclaration?: NamedTupleMember | ParameterDeclaration; // Declaration associated with the tuple's label
    // accessibleChainCache?: Map<string, Symbol[] | undefined>;
    // filteredIndexSymbolCache?: Map<string, Symbol> //Symbol with applicable declarations
    // requestedExternalEmitHelpers?: ExternalEmitHelpers; // External emit helpers already checked for this symbol.
}

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
