import { LPCLexer } from "../parser3/LPCLexer";
import {
    FunctionModifierContext,
    ParameterContext,
} from "../parser3/LPCParser";
import { MultiMap } from "../types";
import { GetCanonicalFileName } from "./core";
import { ModeAwareCache, ModeAwareCacheKey } from "./moduleNameResolver";

// Note: 'brands' in our syntax nodes serve to give us a small amount of nominal typing.
// Consider 'Expression'.  Without the brand, 'Expression' is actually no different
// (structurally) than 'Node'.  Because of this you can pass any Node to a function that
// takes an Expression without any error.  By using the 'brands' we ensure that the type
// checker actually thinks you have something of the right type.  Note: the brands are
// never actually given values.  At runtime they have zero cost.

export type NodeId = number;
export type SymbolId = number;

export interface Symbol {
    flags: SymbolFlags;
    name: string;
    declarations: Declaration[]; // declarations associated with this symbol
    valueDeclaration?: Declaration; // first value declaration
    members?: SymbolTable; // members of the symbol if it is a module
    exports?: SymbolTable; // Module exports
    id: SymbolId; // unique id
    parent?: Symbol; // parent symbol
    isReferenced?: SymbolFlags; // true if symbol is referenced in the program
    lastAssignmentPos?: number; // position of last node that assigned a value to this symbol
    mergeId: number;
    /** @internal */ assignmentDeclarationMembers?: Map<number, Declaration>; // detected late-bound assignment declarations associated with the symbol
}

// prettier-ignore
export type MatchingKeys<TRecord, TMatch, K extends keyof TRecord = keyof TRecord> = K extends (TRecord[K] extends TMatch ? K : never) ? K : never;

/** Simple symbol table using a Map */
export type SymbolTable = Map<string, Symbol>;

export interface CompilerOptions {
    allowUnreachableCode?: boolean;
    noErrorTruncation?: boolean;
    noUncheckedIndexedAccess?: boolean;
    // TODO
}

export const enum SyntaxKind {
    Unknown,
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

    // Assignments
    EqualsToken,
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
    AmpersandAmpersandEqualsToken,
    QuestionQuestionEqualsToken,
    CaretEqualsToken,

    // Identifiers
    Identifier,
    PrivateIdentifier,

    // Parse tree nodes
    QualifiedName,
    ComputedPropertyName,
    TypeParameter,
    Parameter,
    MethodSignature,
    MethodDeclaration,
    PropertyDeclaration,
    TypeAliasDeclaration,
    ImportDeclaration,
    PropertySignature,
    CallSignature,
    ConstructSignature,
    IndexSignature,

    // Top Level
    SourceFile,

    Block,
    ImportClause,
    HeritageClause,
    ImportSpecifier,
    NamedImports,
    ExportAssignment,
    ExportSpecifier,

    // declarations
    FunctionDeclaration,
    VariableDeclaration,
    InterfaceDeclaration,

    // Type
    TypePredicate,
    TypeReference,
    FunctionType,
    ConstructorType,
    TypeQuery,
    TypeLiteral,
    ArrayType,
    TupleType,
    OptionalType,
    RestType,
    UnionType,
    IntersectionType,
    ConditionalType,
    InferType,
    ParenthesizedType,
    ThisType,
    TypeOperator,
    IndexedAccessType,
    MappedType,
    LiteralType,
    NamedTupleMember,
    TemplateLiteralType,
    TemplateLiteralTypeSpan,
    ImportType,

    // binding patterns
    ObjectBindingPattern,
    ArrayBindingPattern,
    BindingElement,

    // expressions
    CallExpression,
    DeleteExpression,
    PropertyAccessExpression,
    SyntheticExpression,
    TaggedTemplateExpression,
    ExpressionWithTypeArguments,
    ElementAccessExpression,
    InlineClosureExpression,
    BinaryExpression,
    ArrowFunction,
    ConditionalExpression,
    ParenthesizedExpression,
    FunctionExpression,
    PrefixUnaryExpression,
    PostfixUnaryExpression,
    NonNullExpression,
    ArrayLiteralExpression,
    SpreadElement,
    NewExpression,
    ObjectLiteralExpression,
    ClassExpression,
    TypeAssertionExpression,
    PartiallyEmittedExpression,
    VoidExpression,

    // keywords
    PrivateKeyword,
    ProtectedKeyword,
    SuperKeyword = ColonColonToken,
    PublicKeyword,
    StaticKeyword,
    ExtendsKeyword,
    /** @deprecated */
    ThisKeyword,
    /** @deprecated */
    ReadonlyKeyword,
    /** @deprecated */
    UniqueKeyword,
    /** @deprecated */
    KeyOfKeyword,
    /** @deprecated */
    ImplementsKeyword,
    VisibleKeyword,
    NoSaveKeyword,
    NoShadowKeyword,
    NoMaskKeyword,
    VarArgsKeyword,
    DeprecatedKeyword,
    ImportKeyword,
    InKeyword,

    // type keywords
    IntKeyword,
    FloatKeyword,
    StringKeyword,
    MixedKeyword,
    MappingKeyword,
    UnknownKeyword,
    VoidKeyword,
    ObjectKeyword,

    // statements
    VariableStatement, // has marker as first statement
    VariableDeclarationList,
    CatchClause,
    ReturnStatement,
    ExpressionStatement,
    IfStatement,
    WhileStatement,
    DoStatement,
    ForStatement,
    ForInStatement,
    CaseBlock,
    BreakStatement,
    ContinueStatement,
    SwitchStatement,
    EmptyStatement, // has marker as last statement

    // JSDoc nodes
    JSDocTypeExpression,
    JSDocNameReference,
    JSDocPropertyTag,
    JSDocMemberName, // C#p
    JSDocAllType, // The * type
    JSDocUnknownType, // The ? type
    JSDocNullableType,
    JSDocNonNullableType,
    JSDocOptionalType,
    JSDocFunctionType,
    JSDocVariadicType,
    JSDocTemplateTag,
    JSDocParameterTag,
    JSDocReturnTag,
    JSDocSignature,
    JSDocText,
    JSDocTypeLiteral,
    JSDocTypeTag,
    JSDocImportTag,
    JSDocDeprecatedTag,
    JSDoc,

    // Synthesized list
    SyntaxList,

    // Transformation nodes
    CommaListExpression,

    // Markers
    FirstAssignment = EqualsToken,
    LastAssignment = CaretEqualsToken,
    FirstToken = Unknown,
    LastToken = CaretEqualsToken,
    FirstStatement = VariableStatement,
    LastStatement = EmptyStatement,
    FirstTypeNode = IntKeyword,
    LastTypeNode = ObjectKeyword,
    FirstKeyword = PrivateKeyword,
    LastKeyword = ObjectKeyword,
    FirstNode = Identifier,

    // Clauses
    CaseClause,
    DefaultClause,

    // Property Assignments
    ShorthandPropertyAssignment,
    PropertyAssignment,
    SpreadAssignment,

    //NumericLiteral = IntLiteral | FloatLiteral,
}

/** @internal */
export type PunctuationOrKeywordSyntaxKind =
    | PunctuationSyntaxKind
    | KeywordSyntaxKind;

export type LiteralSyntaxKind =
    | SyntaxKind.IntLiteral
    | SyntaxKind.FloatLiteral
    | SyntaxKind.StringLiteral;

export const LexerToSyntaxKind: { [key: number]: SyntaxKind } = {
    // TYPES
    [LPCLexer.INT]: SyntaxKind.IntKeyword,
    [LPCLexer.FLOAT]: SyntaxKind.FloatKeyword,
    [LPCLexer.STRING]: SyntaxKind.StringKeyword,
    [LPCLexer.MIXED]: SyntaxKind.MixedKeyword,
    [LPCLexer.MAPPING]: SyntaxKind.MappingKeyword,
    [LPCLexer.UNKNOWN]: SyntaxKind.UnknownKeyword,
    [LPCLexer.VOID]: SyntaxKind.VoidKeyword,
    [LPCLexer.OBJECT]: SyntaxKind.ObjectKeyword,
    // MODIFIERS
    [LPCLexer.PRIVATE]: SyntaxKind.PrivateKeyword,
    [LPCLexer.PROTECTED]: SyntaxKind.ProtectedKeyword,
    [LPCLexer.PUBLIC]: SyntaxKind.PublicKeyword,
    [LPCLexer.STATIC]: SyntaxKind.StaticKeyword,
    [LPCLexer.VISIBLE]: SyntaxKind.VisibleKeyword,
    [LPCLexer.NOSAVE]: SyntaxKind.NoSaveKeyword,
    [LPCLexer.NOSHADOW]: SyntaxKind.NoShadowKeyword,
    [LPCLexer.NOMASK]: SyntaxKind.NoMaskKeyword,
    [LPCLexer.VARARGS]: SyntaxKind.VarArgsKeyword,
    [LPCLexer.DEPRECATED]: SyntaxKind.DeprecatedKeyword,
    // OPERATORS
    [LPCLexer.ASSIGN]: SyntaxKind.EqualsToken,
    [LPCLexer.ADD_ASSIGN]: SyntaxKind.PlusEqualsToken,
    [LPCLexer.SUB_ASSIGN]: SyntaxKind.MinusEqualsToken,
    [LPCLexer.MUL_ASSIGN]: SyntaxKind.AsteriskEqualsToken,
    [LPCLexer.XOR_ASSIGN]: SyntaxKind.AsteriskAsteriskEqualsToken,
    [LPCLexer.DIV_ASSIGN]: SyntaxKind.SlashEqualsToken,
    [LPCLexer.MOD_ASSIGN]: SyntaxKind.PercentEqualsToken,
    [LPCLexer.SHL_ASSIGN]: SyntaxKind.LessThanLessThanEqualsToken,
    [LPCLexer.RSH_ASSIGN]: SyntaxKind.GreaterThanGreaterThanEqualsToken,
    [LPCLexer.BITOR_ASSIGN]: SyntaxKind.BarEqualsToken,
    [LPCLexer.BITAND_ASSIGN]: SyntaxKind.AmpersandEqualsToken,
    [LPCLexer.OR_ASSIGN]: SyntaxKind.BarBarEqualsToken,
    [LPCLexer.AND_ASSIGN]: SyntaxKind.AmpersandAmpersandEqualsToken,
    [LPCLexer.PLUS]: SyntaxKind.PlusToken,
    [LPCLexer.MINUS]: SyntaxKind.MinusToken,
    [LPCLexer.STAR]: SyntaxKind.AsteriskToken,
    [LPCLexer.DIV]: SyntaxKind.SlashToken,
    [LPCLexer.MOD]: SyntaxKind.PercentToken,
    [LPCLexer.INC]: SyntaxKind.PlusPlusToken,
    [LPCLexer.DEC]: SyntaxKind.MinusMinusToken,
    [LPCLexer.LT]: SyntaxKind.LessThanToken,
    [LPCLexer.GT]: SyntaxKind.GreaterThanToken,
    [LPCLexer.LE]: SyntaxKind.LessThanEqualsToken,
    [LPCLexer.GE]: SyntaxKind.GreaterThanEqualsToken,
    [LPCLexer.EQ]: SyntaxKind.EqualsEqualsToken,
    [LPCLexer.NE]: SyntaxKind.ExclamationEqualsToken,
    [LPCLexer.AND]: SyntaxKind.AmpersandToken,
    [LPCLexer.OR]: SyntaxKind.BarToken,
    [LPCLexer.XOR]: SyntaxKind.CaretToken,
    [LPCLexer.NOT]: SyntaxKind.ExclamationToken,
    [LPCLexer.AND_AND]: SyntaxKind.AmpersandAmpersandToken,
    [LPCLexer.OR_OR]: SyntaxKind.BarBarToken,
    [LPCLexer.QUESTION]: SyntaxKind.QuestionToken,
    [LPCLexer.COLON]: SyntaxKind.ColonToken,
    [LPCLexer.HASH]: SyntaxKind.HashToken,
    [LPCLexer.DOT]: SyntaxKind.DotToken,
    [LPCLexer.TRIPPLEDOT]: SyntaxKind.DotDotDotToken,
    //[LPCLexer.DOUBLEBANG]: SyntaxKind.ExclamationExclamationToken,
    [LPCLexer.COMMA]: SyntaxKind.CommaToken,
};

export type KeywordTypeSyntaxKind =
    | SyntaxKind.IntKeyword
    | SyntaxKind.ObjectKeyword
    | SyntaxKind.StringKeyword
    | SyntaxKind.FloatKeyword
    | SyntaxKind.MixedKeyword
    | SyntaxKind.UnknownKeyword
    | SyntaxKind.VoidKeyword;

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
    | SyntaxKind.VoidKeyword;

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

export type RelationalOperatorOrHigher =
    | ShiftOperatorOrHigher
    | RelationalOperator;

export type EqualityOperator =
    | SyntaxKind.EqualsEqualsToken
    | SyntaxKind.EqualsEqualsEqualsToken
    | SyntaxKind.ExclamationEqualsEqualsToken
    | SyntaxKind.ExclamationEqualsToken;

export type EqualityOperatorOrHigher =
    | RelationalOperatorOrHigher
    | EqualityOperator;

export type BitwiseOperator =
    | SyntaxKind.AmpersandToken
    | SyntaxKind.BarToken
    | SyntaxKind.CaretToken;

export type BitwiseOperatorOrHigher =
    | EqualityOperatorOrHigher
    | BitwiseOperator;

export type LogicalOperator =
    | SyntaxKind.AmpersandAmpersandToken
    | SyntaxKind.BarBarToken;
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
    | SyntaxKind.AmpersandAmpersandEqualsToken;

export type AssignmentOperator =
    | SyntaxKind.EqualsToken
    | CompoundAssignmentOperator;

export type AssignmentOperatorOrHigher =
    | LogicalOperatorOrHigher
    | AssignmentOperator;
export type BinaryOperator = AssignmentOperatorOrHigher | SyntaxKind.CommaToken;
export type BinaryOperatorToken = Token<BinaryOperator>;

export type LogicalOrCoalescingAssignmentOperator =
    | SyntaxKind.AmpersandAmpersandEqualsToken
    | SyntaxKind.BarBarEqualsToken;

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
    | SyntaxKind.AmpersandAmpersandEqualsToken
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

/** Types that can have locals */
export type HasLocals = SourceFile; // | Block  | ForStatement | etc;

// prettier-ignore
export const enum NodeFlags {
    None               = 0,
    Variable           = 1 << 0,  // Variable declaration
    Const              = 1 << 1,  // Variable declaration
    Synthesized        = 1 << 4,  // Node was synthesized during transformation
    OptionalChain      = 1 << 6,  // Chained MemberExpression rooted to a pseudo-OptionalExpression
    HasImplicitReturn  = 1 << 9,  // If function implicitly returns on one of codepaths (initialized by binding)
    HasExplicitReturn  = 1 << 10,  // If function has explicit reachable return on one of codepaths (initialized by binding)
    HasAsyncFunctions  = 1 << 12, // If the file has async functions (initialized by binding)
    ThisNodeHasError   = 1 << 18, // If the parser encountered an error when parsing the code that created this node
    ThisNodeOrAnySubNodesHasError = 1 << 20, // If this node or any of its children had an error
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

// prettier-ignore
export const enum ModifierFlags {
    None =               0,

    // Syntactic/JSDoc modifiers
    Public =             1 << 0,  // Property/Method
    Private =            1 << 1,  // Property/Method
    Protected =          1 << 2,  // Property/Method    
    Static =             1 << 3,  // Property/Method
    Visible =            1 << 4,  // Method

    // Syntactic-only modifiers
    NoSave =             1 << 5,  // Declarations
    NoShadow =           1 << 6,  // Class/Method/ConstructSignature
    NoMask =             1 << 7,  // Method
    VarArgs =            1 << 8,  // Method    
    Async =              1 << 10, // Property/Method/Function
    
    // NOT USED
    Default =            1 << 11, // Function/Class (export default declaration)
    Const =              1 << 12, // Const enum
    In =                 1 << 13, // Contravariance modifier
    Out =                1 << 14, // Covariance modifier
    Decorator =          1 << 15, // Contains a decorator.

    // JSDoc-only modifiers
    Deprecated =         1 << 16, // Deprecated tag.
    
    // Unused tyepscript modifiers

    /** @deprecated not used */
    Readonly =           1 << 98, // not used
    /** @deprecated not used */
    Abstract =           1 << 99, // not used

    // Cache-only JSDoc-modifiers. Should match order of Syntactic/JSDoc modifiers, above.
    /** @internal */ JSDocPublic = 1 << 23, // if this value changes, `selectEffectiveModifierFlags` must change accordingly
    /** @internal */ JSDocPrivate = 1 << 24,
    /** @internal */ JSDocProtected = 1 << 25,
    /** @internal */ JSDocReadonly = 1 << 26,
    /** @internal */ JSDocOverride = 1 << 27,

    /** @internal */ SyntacticOrJSDocModifiers = Public | Private | Protected | Visible,
    /** @internal */ SyntacticOnlyModifiers = NoSave | NoShadow,
    /** @internal */ SyntacticModifiers = SyntacticOrJSDocModifiers | SyntacticOnlyModifiers,
    /** @internal */ JSDocCacheOnlyModifiers = JSDocPublic | JSDocPrivate | JSDocProtected | JSDocReadonly | JSDocOverride,
    /** @internal */ JSDocOnlyModifiers = Deprecated,
    /** @internal */ NonCacheOnlyModifiers = SyntacticOrJSDocModifiers | SyntacticOnlyModifiers | JSDocOnlyModifiers,

    HasComputedJSDocModifiers = 1 << 28, // Indicates the computed modifier flags include modifiers from JSDoc.
    HasComputedFlags =   1 << 29, // Modifier flags have been computed

    AccessibilityModifier = Public | Private | Protected,
    // Accessibility modifiers and 'readonly' can be attached to a parameter in a constructor to make it a property.
    ParameterPropertyModifier = AccessibilityModifier ,
    NonPublicAccessibilityModifier = Private | Protected,

    //TypeScriptModifier = Public | Private | Protected | Readonly | Abstract | Const | Override | In | Out,
    //ExportDefault = Export | Default,
    All = Public | Private | Protected |  Deprecated | Visible,
    Modifier = All,
}

// prettier-ignore
export const enum SymbolFlags {
    None = 0,
    FunctionScopedVariable  = 1 << 0,   // Variable or parameter
    BlockScopedVariable     = 1 << 1,   // A block-scoped variable
    Property                = 1 << 2,   // Property
    Function                = 1 << 4,   // Function    
    Class                   = 1 << 5,   // Class
    Interface               = 1 << 6,   // Interface
    ValueModule             = 1 << 9,   // Instantiated module
    NamespaceModule         = 1 << 10,  // Uninstantiated module
    TypeLiteral             = 1 << 11,  // Type Literal or mapped type
    ObjectLiteral           = 1 << 12,  // Object Literal
    Method                  = 1 << 13,  // Method
    GetAccessor             = 1 << 15,  // Get accessor
    SetAccessor             = 1 << 16,  // Set accessor
    TypeParameter           = 1 << 18,  // Type parameter
    TypeAlias               = 1 << 19,  // Type alias
    ExportValue             = 1 << 20,  // Exported value marker (see comment in declareModuleMember in binder)
    Alias                   = 1 << 21,  // An alias for another symbol (see comment in isAliasSymbolDeclaration in checker)
    Optional                = 1 << 24,  // Optional property
    Transient               = 1 << 25,  // Transient symbol (created during type check)
    Assignment              = 1 << 26,  // Assignment treated as declaration (eg `this.prop = 1`)

    HasComputedFlags        = 1 << 31, // Transform flags have been computed.
    /** @deprecated */
    Enum                    = 1 << 99, // not used
    All = -1,

    Variable = FunctionScopedVariable | BlockScopedVariable,
    Value = Variable | Property | ObjectLiteral | Function | Method | Class,
    FunctionExcludes = Value & ~(Function|Class),
    Type = Class | TypeLiteral | TypeParameter | TypeAlias,
    Namespace = ValueModule | NamespaceModule, // | Enum,

    // Variables can be redeclared, but can not redeclare a block-scoped declaration with the
    // same name, or any other value that is not a variable, e.g. ValueModule or Class
    FunctionScopedVariableExcludes = Value & ~FunctionScopedVariable,

    // Block-scoped declarations are not allowed to be re-declared
    // they can not merge with anything in the value space
    BlockScopedVariableExcludes = Value,
    
    /** @internal */
    // The set of things we consider semantically classifiable.  Used to speed up the LS during
    // classification.
    Classifiable = Class,// | Enum | TypeAlias | Interface | TypeParameter | Module | Alias,

    // Scope exclusions
    PropertyExcludes = None,
    OuterExpressionExcludes = HasComputedFlags,
    PropertyAccessExcludes = OuterExpressionExcludes,
    NodeExcludes = PropertyAccessExcludes,
    ParameterExcludes = NodeExcludes,
    MethodExcludes = Value & ~Method,
    TypeParameterExcludes = Type & ~TypeParameter,

    BlockScoped = BlockScopedVariable | Class,

    /** @internal */
    LateBindingContainer = Class  | TypeLiteral | ObjectLiteral | Function,

    ClassMember = Method | Property,
}

// prettier-ignore
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

export type IsContainer =
    | SourceFile
    | FunctionDeclaration
    | InlineClosureExpression; // TODO: add more;

export type IsBlockScopedContainer = IsContainer | CatchClause | Block; // TODO: add more;

export interface TextRange {
    pos: number;
    end: number;
}

export interface ReadonlyTextRange {
    readonly pos: number;
    readonly end: number;
}

export interface Node extends ReadonlyTextRange {
    readonly kind: SyntaxKind;
    id?: NodeId; // unique id
    flags: NodeFlags; // node flags
    readonly parent: Node; // initialized by binder
    original?: Node; // original node if this is an updated node
    modifierFlagsCache?: ModifierFlags; // cache for modifier flags
}

// prettier-ignore
export interface NodeFactory {    
    createSourceFile(statements: readonly Statement[], endOfFileToken: EndOfFileToken, flags: NodeFlags): SourceFile;
    createNodeArray<T extends Node>(elements?: readonly T[], hasTrailingComma?: boolean): NodeArray<T>;

    //
    // Literals
    //

    createIntegerLiteral(value: string|number, numericLiteralFlags?: TokenFlags): IntegerLiteral;
    createFloatLiteral(value: string|number, numericLiteralFlags?: TokenFlags): FloatLiteral;
    createStringLiteral(text: string, isSingleQuote?: boolean): StringLiteral;
    /** @internal */ createStringLiteral(text: string, isSingleQuote?: boolean, hasExtendedUnicodeEscape?: boolean): StringLiteral; // eslint-disable-line @typescript-eslint/unified-signatures
    createStringLiteralFromNode(sourceNode: PropertyNameLiteral | PrivateIdentifier, isSingleQuote?: boolean): StringLiteral;
    

    createToken(token: SyntaxKind.EndOfFileToken): EndOfFileToken;
    createToken(token: SyntaxKind.Unknown): Token<SyntaxKind.Unknown>;    
    /** @internal */ createToken<TKind extends SyntaxKind>(token: TKind): Token<TKind>;

    createIdentifier(text: string): Identifier;

    createFunctionDeclaration(modifiers: readonly FunctionModifierContext[] | undefined, name: string | Identifier | undefined, parameters: readonly ParameterContext[], type: TypeNode | undefined, body: Block | undefined): FunctionDeclaration;
    createBlock(statements: readonly Statement[], multiLine?: boolean): Block;
    createVariableDeclaration(name: string | BindingName, type: TypeNode | undefined, initializer: Expression | undefined): VariableDeclaration;
    createVariableDeclarationList(declarations: readonly VariableDeclaration[], flags: NodeFlags ): VariableDeclarationList;
    createVariableStatement(modifiers: readonly Modifier[] | undefined, declarationList: VariableDeclarationList | readonly VariableDeclaration[]): VariableStatement;
    createUnionTypeNode(types: readonly TypeNode[]): UnionTypeNode;
    createArrayTypeNode(elementType: TypeNode):ArrayTypeNode;
    createReturnStatement(expression?: Expression): ReturnStatement;
    createInlineClosure(body: ConciseBody):InlineClosureExpression;
    createBinaryExpression(left: Expression, operator: BinaryOperator | BinaryOperatorToken, right: Expression): BinaryExpression;
    createConditionalExpression(condition: Expression, questionToken: QuestionToken | undefined, whenTrue: Expression, colonToken: ColonToken | undefined, whenFalse: Expression): ConditionalExpression;
    createCallExpression(expression: Expression,  argumentsArray: readonly Expression[] | undefined): CallExpression;
    createExpressionStatement(expression: Expression): ExpressionStatement;
    createParenthesizedExpression(expression: Expression): ParenthesizedExpression;
    createElementAccessExpression(expression: Expression, index: number | Expression): ElementAccessExpression;

    createLiteralLikeNode(kind: LiteralToken["kind"] , text: string): LiteralToken;


    getDeclarationName(node: Declaration | undefined, allowComments?: boolean, allowSourceMaps?: boolean):Identifier;

    //
    // Synthetic Nodes
    //
    // /** @internal */ createSyntheticExpression(type: Type, isSpread?: boolean, tupleNameSource?: ParameterDeclaration | NamedTupleMember): SyntheticExpression;
    // /** @internal */ createSyntaxList(children: readonly Node[]): SyntaxList;

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

/** @internal */
export interface MutableNodeArray<T extends Node> extends Array<T>, TextRange {
    hasTrailingComma: boolean;
}

export interface NodeArray<T extends Node>
    extends ReadonlyArray<T>,
        ReadonlyTextRange {
    readonly hasTrailingComma: boolean;
}

export interface Token<TKind extends SyntaxKind> extends Node {
    readonly kind: TKind;
}
export type EndOfFileToken = Token<SyntaxKind.EndOfFileToken> & JSDocContainer;

export const enum TypeFlags {
    Any = 1 << 0,
    Unknown = 1 << 1,
    String = 1 << 2,
    Int = 1 << 3,
    Float = 1 << 4,
    /** @deprecated only used for iterator tests */
    Boolean = 1 << 5,
    /** @deprecated not used */
    Enum = 1 << 6, // Numeric computed enum member value
    // BigInt          = 1 << 6,
    StringLiteral = 1 << 7,
    IntLiteral = 1 << 8,
    FloatLiteral = 1 << 9,
    BooleanLiteral = 1 << 10,
    // EnumLiteral     = 1 << 10,  // Always combined with StringLiteral, NumberLiteral, or Union
    // BigIntLiteral   = 1 << 11,
    // ESSymbol        = 1 << 12,  // Type of symbol primitive introduced in ES6
    // UniqueESSymbol  = 1 << 13,  // unique symbol
    Void = 1 << 14,
    Undefined = 1 << 15,
    Null = 1 << 16,
    Never = 1 << 17, // Never type
    TypeParameter = 1 << 18, // Type parameter
    Object = 1 << 19, // Object type
    Union = 1 << 20, // Union (T | U)
    /** @deprecated not used in LPC */
    Intersection = 1 << 21, // Intersection (T & U)
    Index = 1 << 22, // keyof T
    IndexedAccess = 1 << 23, // T[K]
    Conditional = 1 << 24, // T extends U ? X : Y
    Substitution = 1 << 25, // Type parameter substitution
    NonPrimitive = 1 << 26, // intrinsic object type
    /** @deprecated not used in lpc */
    TemplateLiteral = 1 << 27, // Template literal type
    StringMapping = 1 << 28, // Uppercase/Lowercase type
    /** @internal */
    Reserved1 = 1 << 29, // Used by union/intersection type construction

    /** @internal */
    AnyOrUnknown = Any | Unknown,
    /** @internal */
    Nullable = Undefined | Null,
    Literal = StringLiteral | IntLiteral | FloatLiteral,
    Unit = Literal | Nullable,
    Freshable = Literal,
    StringOrNumberLiteral = StringLiteral | IntLiteral | FloatLiteral,
    /** @internal */
    StringOrNumberLiteralOrUnique = StringLiteral | IntLiteral | FloatLiteral,
    /** @internal */
    DefinitelyFalsy = StringLiteral |
        IntLiteral |
        FloatLiteral |
        Void |
        Undefined |
        Null,
    PossiblyFalsy = DefinitelyFalsy | String | Int | Float,
    /** @internal */
    Intrinsic = Any |
        Unknown |
        String |
        Int |
        Float |
        Void |
        Undefined |
        Null |
        Never |
        NonPrimitive,
    StringLike = String | StringLiteral | StringMapping,
    NumberLike = Int | Float | IntLiteral | FloatLiteral,
    VoidLike = Void | Undefined,
    /** @internal */
    Primitive = StringLike | NumberLike | VoidLike | Null,
    /** @internal */
    DefinitelyNonNullable = StringLike | NumberLike | Object | NonPrimitive,
    /** @internal */
    DisjointDomains = NonPrimitive | StringLike | NumberLike | VoidLike | Null,
    UnionOrIntersection = Union,
    StructuredType = Object | Union,
    TypeVariable = TypeParameter | IndexedAccess,
    InstantiableNonPrimitive = TypeVariable | Conditional | Substitution,
    InstantiablePrimitive = Index | StringMapping,
    Instantiable = InstantiableNonPrimitive | InstantiablePrimitive,
    StructuredOrInstantiable = StructuredType | Instantiable,
    /** @internal */
    ObjectFlagsType = Any | Nullable | Never | Object | Union,
    /** @internal */
    Simplifiable = IndexedAccess | Conditional,
    /** @internal */
    Singleton = Any |
        Unknown |
        String |
        Int |
        Float |
        Void |
        Undefined |
        Null |
        Never |
        NonPrimitive,
    // 'Narrowable' types are types where narrowing actually narrows.
    // This *should* be every type other than null, undefined, void, and never
    Narrowable = Any |
        Unknown |
        StructuredOrInstantiable |
        StringLike |
        NumberLike |
        NonPrimitive,
    // The following flags are aggregated during union and intersection type construction
    /** @internal */
    IncludesMask = Any |
        Unknown |
        Primitive |
        Never |
        Object |
        Union |
        NonPrimitive |
        StringMapping,
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
    NotPrimitiveUnion = Any |
        Unknown |
        Void |
        Never |
        Object |
        IncludesInstantiable,
}

export type DestructuringPattern =
    | BindingPattern
    | ObjectLiteralExpression
    | ArrayLiteralExpression;

/** @internal */
export type TypeId = number;

// Properties common to all types
export interface Type {
    flags: TypeFlags; // Flags
    /** @internal */ id: TypeId; // Unique ID
    /** @internal */ checker: TypeChecker;
    symbol: Symbol; // Symbol associated with type (if any)
    pattern?: DestructuringPattern; // Destructuring pattern represented by type (if any)
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
// Intrinsic types (TypeFlags.Intrinsic)
export interface IntrinsicType extends Type {
    intrinsicName: string; // Name of intrinsic type
    debugIntrinsicName: string | undefined;
    objectFlags: ObjectFlags;
}

/** @internal */
export interface NullableType extends IntrinsicType {
    objectFlags: ObjectFlags;
}

export interface FreshableType extends Type {
    freshType: FreshableType; // Fresh version of type
    regularType: FreshableType; // Regular version of type
}

/** @internal */
export interface FreshableIntrinsicType extends FreshableType, IntrinsicType {}

// String literal types (TypeFlags.StringLiteral)
// Numeric literal types (TypeFlags.NumberLiteral)
export interface LiteralType extends FreshableType {
    value: string | number; // Value of literal
}

export interface StringLiteralType extends LiteralType {
    value: string;
}

export interface NumberLiteralType extends LiteralType {
    value: number;
}

// Types included in TypeFlags.ObjectFlagsType have an objectFlags property. Some ObjectFlags
// are specific to certain types and reuse the same bit position. Those ObjectFlags require a check
// for a certain TypeFlags value to determine their meaning.
export const enum ObjectFlags {
    None = 0,
    Class = 1 << 0, // Class
    Interface = 1 << 1, // Interface
    Reference = 1 << 2, // Generic type reference
    Tuple = 1 << 3, // Synthesized generic tuple type
    Anonymous = 1 << 4, // Anonymous
    Mapped = 1 << 5, // Mapped
    Instantiated = 1 << 6, // Instantiated anonymous or mapped type
    ObjectLiteral = 1 << 7, // Originates in an object literal
    EvolvingArray = 1 << 8, // Evolving array type
    ObjectLiteralPatternWithComputedProperties = 1 << 9, // Object literal pattern with computed properties
    ReverseMapped = 1 << 10, // Object contains a property from a reverse-mapped type
    JsxAttributes = 1 << 11, // Jsx attributes type
    JSLiteral = 1 << 12, // Object type declared in JS - disables errors on read/write of nonexisting members
    FreshLiteral = 1 << 13, // Fresh object literal
    ArrayLiteral = 1 << 14, // Originates in an array literal
    /** @internal */
    PrimitiveUnion = 1 << 15, // Union of only primitive types
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
    PropagatingFlags = ContainsWideningType |
        ContainsObjectOrArrayLiteral |
        NonInferrableType,
    /** @internal */
    InstantiatedMapped = Mapped | Instantiated,
    // Object flags that uniquely identify the kind of ObjectType
    /** @internal */
    ObjectTypeKindMask = ClassOrInterface |
        Reference |
        Tuple |
        Anonymous |
        Mapped |
        ReverseMapped |
        EvolvingArray,

    // Flags that require TypeFlags.Object
    ContainsSpread = 1 << 21, // Object literal contains spread operation
    ObjectRestType = 1 << 22, // Originates in object rest declaration
    InstantiationExpressionType = 1 << 23, // Originates in instantiation expression
    SingleSignatureType = 1 << 27, // A single signature type extracted from a potentially broader type
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

export interface Signature {
    /** @internal */ flags: SignatureFlags;
    /** @internal */ checker?: TypeChecker;
    declaration?: SignatureDeclaration | JSDocSignature; // Originating declaration
    typeParameters?: readonly TypeParameter[]; // Type parameters (undefined if non-generic)
    parameters: readonly Symbol[]; // Parameters
    thisParameter?: Symbol; // symbol of this-type parameter
    /** @internal */
    // See comment in `instantiateSignature` for why these are set lazily.
    resolvedReturnType?: Type; // Lazily set by `getReturnTypeOfSignature`.
    /** @internal */
    // Lazily set by `getTypePredicateOfSignature`.
    // `undefined` indicates a type predicate that has not yet been computed.
    // Uses a special `noTypePredicate` sentinel value to indicate that there is no type predicate. This looks like a TypePredicate at runtime to avoid polymorphism.
    resolvedTypePredicate?: TypePredicate;
    /** @internal */
    minArgumentCount: number; // Number of non-optional parameters
    /** @internal */
    resolvedMinArgumentCount?: number; // Number of non-optional parameters (excluding trailing `void`)
    /** @internal */
    target?: Signature; // Instantiation target
    /** @internal */
    mapper?: TypeMapper; // Instantiation mapper
    /** @internal */
    compositeSignatures?: Signature[]; // Underlying signatures of a union/intersection signature
    /** @internal */
    compositeKind?: TypeFlags; // TypeFlags.Union if the underlying signatures are from union members, otherwise TypeFlags.Intersection
    /** @internal */
    erasedSignatureCache?: Signature; // Erased version of signature (deferred)
    /** @internal */
    canonicalSignatureCache?: Signature; // Canonical version of signature (deferred)
    /** @internal */
    baseSignatureCache?: Signature; // Base version of signature (deferred)
    /** @internal */
    optionalCallSignatureCache?: { inner?: Signature; outer?: Signature }; // Optional chained call version of signature (deferred)
    /** @internal */
    isolatedSignatureType?: ObjectType; // A manufactured type that just contains the signature for purposes of signature comparison
    /** @internal */
    instantiations?: Map<string, Signature>; // Generic signature instantiation cache
    /** @internal */
    implementationSignatureCache?: Signature; // Copy of the signature with fresh type parameters to use in checking the body of a potentially self-referential generic function (deferred)
}

export const enum IndexKind {
    String,
    Number,
}

export interface IndexInfo {
    keyType: Type;
    type: Type;
    isReadonly: boolean;
    declaration?: IndexSignatureDeclaration;
}

// A TypeLiteral is the declaration node for an anonymous symbol.
export interface TypeLiteralNode extends TypeNode, Declaration {
    readonly kind: SyntaxKind.TypeLiteral;
    readonly members: NodeArray<TypeElement>;
}

export type ObjectTypeDeclaration = ClassLikeDeclaration | TypeLiteralNode;

export interface IndexSignatureDeclaration
    extends SignatureDeclarationBase,
        ClassElement,
        TypeElement,
        LocalsContainer {
    readonly kind: SyntaxKind.IndexSignature;
    readonly parent: ObjectTypeDeclaration;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly type: TypeNode;
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

export interface IntersectionType extends UnionOrIntersectionType {
    /** @internal */
    resolvedApparentType: Type;
    /** @internal */
    uniqueLiteralFilledInstantiation?: Type; // Instantiation with type parameters mapped to never type
}

/** @internal */
export type ObjectFlagsType = NullableType | ObjectType | UnionType;

// Object types (TypeFlags.ObjectType)
export interface ObjectType extends Type {
    objectFlags: ObjectFlags;
    /** @internal */ members?: SymbolTable; // Properties by name
    /** @internal */ properties?: Symbol[]; // Properties
    /** @internal */ callSignatures?: readonly Signature[]; // Call signatures of type
    /** @internal */ constructSignatures?: readonly Signature[]; // Construct signatures of type
    /** @internal */ indexInfos?: readonly IndexInfo[]; // Index signatures
    /** @internal */ objectTypeWithoutAbstractConstructSignatures?: ObjectType;
}

// Object type or intersection of object types
export type BaseType = ObjectType | TypeVariable; // Also `any` and `object`

export interface Declaration extends Node {
    _declarationBrand: any;
    symbol: Symbol; // symbol declared by node (init by binding)
}

export interface LocalsContainer extends Node {
    _localsContainerBrand: any;

    /** locals associated with this node */
    locals?: SymbolTable;
    /** next container in declaration order */
    nextContainer?: HasLocals;
}

export interface FlowContainer extends Node {
    _flowContainerBrand: any;
    /** @internal */ flowNode?: FlowNode; // Associated FlowNode (initialized by binding)
}

// FlowCondition represents a condition that is known to be true or false at the
// node's location in the control flow.
/** @internal */
export interface FlowCondition extends FlowNodeBase {
    node: Expression;
    antecedent: FlowNode;
}

/** @internal */
export interface FlowCall extends FlowNodeBase {
    node: CallExpression;
    antecedent: FlowNode;
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

//
// prettier-ignore
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
export type FlowNode =
    | FlowUnreachable
    | FlowStart
    | FlowLabel
    | FlowAssignment
    | FlowCondition
    | FlowSwitchClause
    | FlowArrayMutation
    | FlowCall;

export interface FlowNodeBase {
    id: number; // Node is used by flow checker
    node: unknown; // Node or other data
    antecedent: FlowNode | FlowNode[] | undefined;
    flags: FlowFlags;
}

/** Represents the start of a control flow. */
export interface FlowStart extends FlowNodeBase {
    node: FunctionExpression | ArrowFunction | MethodDeclaration | undefined;
    antecedent: undefined;
}

// FlowLabel represents a junction with multiple possible preceding control flows.
/** @internal */
export interface FlowLabel extends FlowNodeBase {
    node: undefined;
    antecedent: FlowNode[] | undefined;
}

/** @internal */
export interface FlowUnreachable extends FlowNodeBase {
    node: undefined;
    antecedent: undefined;
}

// FlowAssignment represents a node that assigns a value to a narrowable reference,
// i.e. an identifier or a dotted name that starts with an identifier or 'this'.
/** @internal */
export interface FlowAssignment extends FlowNodeBase {
    node: Expression | VariableDeclaration | BindingElement;
    antecedent: FlowNode;
}

// FlowArrayMutation represents a node potentially mutates an array, i.e. an
// operation of the form 'x.push(value)', 'x.unshift(value)' or 'x[n] = value'.
/** @internal */
export interface FlowArrayMutation extends FlowNodeBase {
    node: CallExpression | BinaryExpression;
    antecedent: FlowNode;
}

export interface JSDocContainer extends Node {
    _jsDocContainerBrand: any;
    /** jsdoc that directly precedes this node */
    jsDoc?: any;
}

/** @internal */
export interface RedirectInfo {
    /** Source file this redirects to. */
    readonly redirectTarget: SourceFile;
    /**
     * Source file for the duplicate package. This will not be used by the Program,
     * but we need to keep this around so we can watch for changes in underlying.
     */
    readonly unredirected: SourceFile;
}

export interface SourceFile extends Declaration, LocalsContainer {
    readonly kind: SyntaxKind.SourceFile;
    readonly statements: NodeArray<Statement>;
    readonly endOfFileToken: Token<SyntaxKind.EndOfFileToken>;
    fileName: string;
    path: Path;
    text: string;

    identifiers: ReadonlyMap<string, string>;
    nodeCount: number;
    identifierCount: number;
    symbolCount: number;

    /** @internal */ classifiableNames?: ReadonlySet<string>;

    pragmas: Set<string>; // TODO
    endFlowNode?: FlowNode; // TODO

    /**
     * If two source files are for the same version of the same package, one will redirect to the other.
     * (See `createRedirectSourceFile` in program.ts.)
     * The redirect will have this set. The redirected-to source file will be in `redirectTargetsMap`.
     *
     * @internal
     */
    redirectInfo?: RedirectInfo;

    // File-level diagnostics reported by the parser (includes diagnostics about /// references
    // as well as code diagnostics).
    /** @internal */ parseDiagnostics: DiagnosticWithLocation[];

    /** @internal */ bindDiagnostics: DiagnosticWithLocation[];
    /** @internal */ bindSuggestionDiagnostics?: DiagnosticWithLocation[];

    // From class-like declaration
    readonly heritageClauses?: NodeArray<HeritageClause>;
    readonly members: NodeArray<ClassElement>;
}

/**
 * Subset of properties from SourceFile that are used in multiple utility functions
 */
export interface SourceFileLike {
    readonly text: string;
    /** @internal */
    lineMap?: readonly number[];
    /** @internal */
    getPositionOfLineAndCharacter?(
        line: number,
        character: number,
        allowEdits?: true
    ): number;
}

export interface LineAndCharacter {
    /** 0-based. */
    line: number;
    /*
     * 0-based. This value denotes the character position in line and is different from the 'column' because of tab characters.
     */
    character: number;
}

export interface FileReference extends TextRange {
    fileName: string;
    preserve?: boolean;
}

export interface Statement extends Node, JSDocContainer {
    _statementBrand: any;
}

export interface Expression extends Node {
    _expressionBrand: any;
}

export interface UnaryExpression extends Expression {
    _unaryExpressionBrand: any;
}

export interface VoidExpression extends UnaryExpression {
    readonly kind: SyntaxKind.VoidExpression;
    readonly expression: UnaryExpression;
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

export interface SwitchStatement extends Statement, FlowContainer {
    readonly kind: SyntaxKind.SwitchStatement;
    readonly expression: Expression;
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

export type CaseOrDefaultClause = CaseClause | DefaultClause;

export interface ParenthesizedExpression
    extends PrimaryExpression,
        JSDocContainer {
    readonly kind: SyntaxKind.ParenthesizedExpression;
    readonly expression: Expression;
}

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

export interface TypeElement extends NamedDeclaration {
    _typeElementBrand: any;
    readonly name?: PropertyName;
    readonly questionToken?: QuestionToken | undefined;
}

export interface PropertyDeclaration extends ClassElement, JSDocContainer {
    readonly kind: SyntaxKind.PropertyDeclaration;
    readonly parent: ClassLikeDeclaration;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly name: PropertyName;
    readonly questionToken?: QuestionToken; // Present for use with reporting a grammar error for auto-accessors (see `isGrammarError` in utilities.ts)
    readonly exclamationToken?: ExclamationToken;
    readonly type?: TypeNode;
    readonly initializer?: Expression; // Optional initializer
}

export interface PropertySignature extends TypeElement, JSDocContainer {
    readonly kind: SyntaxKind.PropertySignature;
    readonly parent: TypeLiteralNode;
    readonly modifiers?: NodeArray<Modifier>;
    readonly name: PropertyName; // Declared property name
    readonly questionToken?: QuestionToken; // Present on optional property
    readonly type?: TypeNode; // Optional type annotation

    // The following properties are used only to report grammar errors (see `isGrammarError` in utilities.ts)
    /** @internal */ readonly initializer?: Expression | undefined; // A property signature cannot have an initializer
}

export type VariableLikeDeclaration =
    | VariableDeclaration
    | ParameterDeclaration
    | BindingElement
    | PropertyDeclaration
    | PropertyAssignment
    | PropertySignature
    | ShorthandPropertyAssignment;
// | JSDocPropertyTag
// | JSDocParameterTag;

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

export type PostfixUnaryOperator =
    | SyntaxKind.PlusPlusToken
    | SyntaxKind.MinusMinusToken;

export interface PostfixUnaryExpression extends UpdateExpression {
    readonly kind: SyntaxKind.PostfixUnaryExpression;
    readonly operand: LeftHandSideExpression;
    readonly operator: PostfixUnaryOperator;
}

export interface PrimaryExpression extends MemberExpression {
    _primaryExpressionBrand: any;
}

export interface Identifier
    extends PrimaryExpression,
        Declaration,
        JSDocContainer,
        FlowContainer {
    readonly kind: SyntaxKind.Identifier;
    readonly text: string;
}

// Typed as a PrimaryExpression due to its presence in BinaryExpressions (#field in expr)
/**
 * @deprecated not used in LPC -- remove
 */
export interface PrivateIdentifier extends PrimaryExpression {
    readonly kind: SyntaxKind.PrivateIdentifier;
    readonly text: string;
}

export type ModifierLike = Modifier;

/** @internal */
export type TypeNodeSyntaxKind =
    | KeywordTypeSyntaxKind
    | SyntaxKind.TypePredicate
    | SyntaxKind.TypeReference
    | SyntaxKind.FunctionType
    | SyntaxKind.ConstructorType
    | SyntaxKind.TypeQuery
    | SyntaxKind.TypeLiteral
    | SyntaxKind.ArrayType
    | SyntaxKind.TupleType
    | SyntaxKind.NamedTupleMember
    | SyntaxKind.OptionalType
    | SyntaxKind.RestType
    | SyntaxKind.UnionType
    | SyntaxKind.IntersectionType
    | SyntaxKind.ConditionalType
    | SyntaxKind.InferType
    | SyntaxKind.ParenthesizedType
    | SyntaxKind.ThisType
    | SyntaxKind.TypeOperator
    | SyntaxKind.IndexedAccessType
    | SyntaxKind.MappedType
    | SyntaxKind.LiteralType
    | SyntaxKind.TemplateLiteralType
    | SyntaxKind.TemplateLiteralTypeSpan
    | SyntaxKind.ImportType
    //| SyntaxKind.ExpressionWithTypeArguments
    | SyntaxKind.JSDocTypeExpression
    | SyntaxKind.JSDocAllType
    | SyntaxKind.JSDocUnknownType
    | SyntaxKind.JSDocNonNullableType
    | SyntaxKind.JSDocNullableType
    | SyntaxKind.JSDocOptionalType
    | SyntaxKind.JSDocFunctionType
    | SyntaxKind.JSDocVariadicType
    //| SyntaxKind.JSDocNamepathType
    | SyntaxKind.JSDocSignature
    | SyntaxKind.JSDocTypeLiteral;

export interface TypeNode extends Node {
    _typeNodeBrand: any;
}

export interface ArrayTypeNode extends TypeNode {
    readonly kind: SyntaxKind.ArrayType;
    readonly elementType: TypeNode;
}

export interface UnionTypeNode extends TypeNode {
    readonly kind: SyntaxKind.UnionType;
    readonly types: NodeArray<TypeNode>;
}

export interface Block extends Statement, LocalsContainer {
    readonly kind: SyntaxKind.Block;
    readonly statements: NodeArray<Statement>;
    /** @internal */ multiLine?: boolean;
}

// The text property of a LiteralExpression stores the interpreted value of the literal in text form. For a StringLiteral,
// or any literal of a template, this means quotes have been removed and escapes have been converted to actual characters.
// For a NumericLiteral, the stored value is the toString() representation of the number. For example 1, 1.00, and 1e0 are all stored as just "1".
export interface LiteralLikeNode extends Node {
    text: string;
    isUnterminated?: boolean;
    hasExtendedUnicodeEscape?: boolean;
}

// The text property of a LiteralExpression stores the interpreted value of the literal in text form. For a StringLiteral,
// or any literal of a template, this means quotes have been removed and escapes have been converted to actual characters.
// For a NumericLiteral, the stored value is the toString() representation of the number. For example 1, 1.00, and 1e0 are all stored as just "1".
export interface LiteralExpression extends LiteralLikeNode, PrimaryExpression {
    _literalExpressionBrand: any;
}

export interface NumericLiteral extends LiteralExpression, Declaration {
    readonly kind: SyntaxKind.IntLiteral | SyntaxKind.FloatLiteral;
    /** @internal */
    readonly numericLiteralFlags: TokenFlags;
}

export interface IntegerLiteral extends NumericLiteral {
    readonly kind: SyntaxKind.IntLiteral;
}

export interface FloatLiteral extends NumericLiteral {
    readonly kind: SyntaxKind.FloatLiteral;
}

export interface StringLiteral extends LiteralExpression, Declaration {
    readonly kind: SyntaxKind.StringLiteral;
    /** @internal */ readonly textSourceNode?:
        | Identifier
        | StringLiteral
        | NumericLiteral
        | PrivateIdentifier; // Allows a StringLiteral to get its text from another node (used by transforms).
}
export type PropertyNameLiteral = Identifier | StringLiteral | NumericLiteral;

export type LiteralToken = IntegerLiteral | FloatLiteral | StringLiteral;

export interface ElementAccessExpression
    extends MemberExpression,
        Declaration,
        JSDocContainer,
        FlowContainer {
    readonly kind: SyntaxKind.ElementAccessExpression;
    readonly expression: LeftHandSideExpression;
    readonly argumentExpression: Expression;
}

export interface ElementAccessChain extends ElementAccessExpression {
    _optionalChainBrand: any;
}

export interface QualifiedName extends Node, FlowContainer {
    readonly kind: SyntaxKind.QualifiedName;
    readonly left: EntityName;
    readonly right: Identifier;
}

export interface ComputedPropertyName extends Node {
    readonly kind: SyntaxKind.ComputedPropertyName;
    readonly parent: Declaration;
    readonly expression: Expression;
}

export type EntityName = Identifier | QualifiedName;

export type PropertyName =
    | Identifier
    | StringLiteral
    | NumericLiteral
    | ComputedPropertyName
    | PrivateIdentifier;

export type MemberName = Identifier | PrivateIdentifier;

export type DeclarationName =
    | PropertyName
    | StringLiteral
    | ElementAccessExpression
    | BindingPattern
    | EntityNameExpression;

export type EntityNameExpression =
    | Identifier
    | PropertyAccessEntityNameExpression;
export type EntityNameOrEntityNameExpression =
    | EntityName
    | EntityNameExpression;

export interface PropertyAccessExpression
    extends MemberExpression,
        NamedDeclaration,
        JSDocContainer,
        FlowContainer {
    readonly kind: SyntaxKind.PropertyAccessExpression;
    readonly expression: LeftHandSideExpression;
    readonly name: MemberName;
}

export type AccessExpression =
    | PropertyAccessExpression
    | ElementAccessExpression;

export interface PropertyAccessChain extends PropertyAccessExpression {
    _optionalChainBrand: any;
    readonly name: MemberName;
}

/** Brand for a PropertyAccessExpression which, like a QualifiedName, consists of a sequence of identifiers separated by dots. */
export interface PropertyAccessEntityNameExpression
    extends PropertyAccessExpression {
    _propertyAccessExpressionLikeQualifiedNameBrand?: any;
    readonly expression: EntityNameExpression;
    readonly name: Identifier;
}

export interface Declaration extends Node {
    _declarationBrand: any;
    /** @internal */ symbol: Symbol; // Symbol declared by node (initialized by binding)
    /** @internal */ localSymbol?: Symbol; // Local symbol declared by node (initialized by binding only for exported nodes)
}

export interface NamedDeclaration extends Declaration {
    readonly name?: DeclarationName;
}

/** @internal */
export interface DynamicNamedDeclaration extends NamedDeclaration {
    readonly name: ComputedPropertyName;
}

/** @internal */
// A name that supports late-binding (used in checker)
export interface LateBoundName extends ComputedPropertyName {
    readonly expression: EntityNameExpression;
}

/** @internal */
// A declaration that supports late-binding (used in checker)
export interface LateBoundDeclaration extends DynamicNamedDeclaration {
    readonly name: LateBoundName;
}

/** @internal */
export interface DynamicNamedBinaryExpression extends BinaryExpression {
    readonly left: ElementAccessExpression;
}

/** @internal */
export interface LateBoundBinaryExpressionDeclaration
    extends DynamicNamedBinaryExpression {
    readonly left: LateBoundElementAccessExpression;
}

/** @internal */
export interface LateBoundElementAccessExpression
    extends ElementAccessExpression {
    readonly argumentExpression: EntityNameExpression;
}

export interface DeclarationStatement extends NamedDeclaration, Statement {
    readonly name?: Identifier | StringLiteral | NumericLiteral;
}

export interface InferTypeNode extends TypeNode {
    readonly kind: SyntaxKind.InferType;
    readonly typeParameter: TypeParameterDeclaration;
}

// prettier-ignore
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

export interface CallSignatureDeclaration
    extends SignatureDeclarationBase,
        TypeElement,
        LocalsContainer {
    readonly kind: SyntaxKind.CallSignature;
}

export type BindingName = Identifier | BindingPattern;

export interface ObjectBindingPattern extends Node {
    readonly kind: SyntaxKind.ObjectBindingPattern;
    readonly parent:
        | VariableDeclaration
        | ParameterDeclaration
        | BindingElement;
    readonly elements: NodeArray<BindingElement>;
}

export interface SpreadAssignment extends ObjectLiteralElement, JSDocContainer {
    readonly kind: SyntaxKind.SpreadAssignment;
    readonly parent: ObjectLiteralExpression;
    readonly expression: Expression;
}

export interface ObjectLiteralElement extends NamedDeclaration {
    _objectLiteralBrand: any;
    readonly name?: PropertyName;
}

/** Unlike ObjectLiteralElement, excludes JSXAttribute and JSXSpreadAttribute. */
export type ObjectLiteralElementLike =
    | PropertyAssignment
    | ShorthandPropertyAssignment
    | SpreadAssignment
    | MethodDeclaration;

export interface PropertyAssignment
    extends ObjectLiteralElement,
        JSDocContainer {
    readonly kind: SyntaxKind.PropertyAssignment;
    readonly parent: ObjectLiteralExpression;
    readonly name: PropertyName;
    readonly initializer: Expression;

    // The following properties are used only to report grammar errors (see `isGrammarError` in utilities.ts)
    /** @internal */ readonly modifiers?: NodeArray<Modifier> | undefined; // property assignment cannot have decorators or modifiers
    /** @internal */ readonly questionToken?: QuestionToken | undefined; // property assignment cannot have a question token
    /** @internal */ readonly exclamationToken?: ExclamationToken | undefined; // property assignment cannot have an exclamation token
}

export interface ClassElement extends NamedDeclaration {
    _classElementBrand: any;
    readonly name?: PropertyName;
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
export interface MethodDeclaration
    extends FunctionLikeDeclarationBase,
        ClassElement,
        ObjectLiteralElement,
        JSDocContainer,
        LocalsContainer,
        FlowContainer {
    readonly kind: SyntaxKind.MethodDeclaration;
    readonly parent: ClassLikeDeclaration | ObjectLiteralExpression;
    readonly modifiers?: NodeArray<ModifierLike> | undefined;
    readonly name: PropertyName;
    readonly body?: FunctionBody | undefined;

    // The following properties are used only to report grammar errors (see `isGrammarError` in utilities.ts)
    /** @internal */ readonly exclamationToken?: ExclamationToken | undefined; // A method cannot have an exclamation token
}

/**
 * This interface is a base interface for ObjectLiteralExpression. ObjectLiteralExpression can only have properties of type
 * ObjectLiteralElement (e.g. PropertyAssignment, ShorthandPropertyAssignment etc.)
 */
export interface ObjectLiteralExpressionBase<T extends ObjectLiteralElement>
    extends PrimaryExpression,
        Declaration {
    readonly properties: NodeArray<T>;
}

// An ObjectLiteralExpression is the declaration node for an anonymous symbol.
export interface ObjectLiteralExpression
    extends ObjectLiteralExpressionBase<ObjectLiteralElementLike>,
        JSDocContainer {
    readonly kind: SyntaxKind.ObjectLiteralExpression;
    /** @internal */
    multiLine?: boolean;
}

export interface ShorthandPropertyAssignment
    extends ObjectLiteralElement,
        JSDocContainer {
    readonly kind: SyntaxKind.ShorthandPropertyAssignment;
    readonly parent: ObjectLiteralExpression;
    readonly name: Identifier;
    // used when ObjectLiteralExpression is used in ObjectAssignmentPattern
    // it is a grammar error to appear in actual object initializer (see `isGrammarError` in utilities.ts):
    readonly equalsToken?: EqualsToken;
    readonly objectAssignmentInitializer?: Expression;

    // The following properties are used only to report grammar errors (see `isGrammarError` in utilities.ts)
    /** @internal */ readonly modifiers?: NodeArray<Modifier> | undefined; // shorthand property assignment cannot have decorators or modifiers
    /** @internal */ readonly questionToken?: QuestionToken | undefined; // shorthand property assignment cannot have a question token
    /** @internal */ readonly exclamationToken?: ExclamationToken | undefined; // shorthand property assignment cannot have an exclamation token
}

export interface ArrayBindingPattern extends Node {
    readonly kind: SyntaxKind.ArrayBindingPattern;
    readonly parent:
        | VariableDeclaration
        | ParameterDeclaration
        | BindingElement;
    readonly elements: NodeArray<ArrayBindingElement>;
}

export type BindingPattern = ObjectBindingPattern | ArrayBindingPattern;
export type ArrayBindingElement = BindingElement;

export interface KeywordToken<TKind extends KeywordSyntaxKind>
    extends Token<TKind> {}

export interface KeywordTypeNode<
    TKind extends KeywordTypeSyntaxKind = KeywordTypeSyntaxKind
> extends KeywordToken<TKind>,
        TypeNode {
    readonly kind: TKind;
}

export interface ModifierToken<TKind extends ModifierSyntaxKind>
    extends KeywordToken<TKind> {}
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

export type HasJSDoc =
    | FunctionDeclaration
    | Block
    | InlineClosureExpression
    | VariableDeclaration
    | VariableStatement
    | ExpressionStatement
    | ReturnStatement;

// NOTE: Changing the following list requires changes to:
// - `canHaveModifiers` in factory/utilitiesPublic.ts
// - `updateModifiers` in factory/nodeFactory.ts
export type HasModifiers =
    | TypeParameterDeclaration
    | ParameterDeclaration
    | ConstructorTypeNode
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
    //| ClassExpression
    | VariableStatement
    | FunctionDeclaration
    //| ClassDeclaration
    | InterfaceDeclaration
    | TypeAliasDeclaration;
// | EnumDeclaration
// | ModuleDeclaration
// | ImportEqualsDeclaration
// | ImportDeclaration
// | ExportAssignment
// | ExportDeclaration;

export interface MethodSignature
    extends SignatureDeclarationBase,
        TypeElement,
        LocalsContainer {
    readonly kind: SyntaxKind.MethodSignature;
    readonly parent: TypeLiteralNode | InterfaceDeclaration;
    readonly modifiers?: NodeArray<Modifier>;
    readonly name: PropertyName;
}

/** LPC doesn't have true classes, but each sourcefile can be considered class-like */
export type ClassLikeDeclaration = SourceFile;

// prettier-ignore
export interface ParameterDeclaration extends NamedDeclaration, JSDocContainer {
    readonly kind: SyntaxKind.Parameter;
    readonly parent: SignatureDeclaration;
    readonly modifiers?: NodeArray<Modifier>;
    readonly dotDotDotToken?: DotDotDotToken;    // Present on rest parameter
    readonly name: BindingName;                  // Declared parameter name.    
    readonly type?: TypeNode;                    // Optional type annotation
    readonly initializer?: Expression;           // Optional initializer
}

export interface TypeParameterDeclaration
    extends NamedDeclaration,
        JSDocContainer {
    readonly kind: SyntaxKind.TypeParameter;
    readonly parent: SignatureDeclaration | InferTypeNode;
    readonly modifiers?: NodeArray<Modifier>;
    readonly name: Identifier;
    /** Note: Consider calling `getEffectiveConstraintOfTypeParameter` */
    readonly constraint?: TypeNode;
    readonly default?: TypeNode;

    // For error recovery purposes (see `isGrammarError` in utilities.ts).
    expression?: Expression;
}

export interface SignatureDeclarationBase
    extends NamedDeclaration,
        JSDocContainer {
    readonly kind: SignatureDeclaration["kind"];
    readonly name?: PropertyName;
    readonly parameters: NodeArray<ParameterDeclaration>;
    readonly type?: TypeNode | undefined;
    /** @internal */ typeArguments?: NodeArray<TypeNode>; // Used for quick info, replaces typeParameters for instantiated signatures
}

export type SignatureDeclaration =
    | CallSignatureDeclaration
    | MethodSignature
    | IndexSignatureDeclaration
    | InlineClosureExpression
    | FunctionTypeNode
    | ConstructorTypeNode
    | JSDocFunctionType
    | FunctionDeclaration
    | MethodDeclaration
    | FunctionExpression
    | ArrowFunction;

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

    readonly body?: Block | Expression | undefined;
    /** @internal */ endFlowNode?: FlowNode;
    /** @internal */ returnFlowNode?: FlowNode;
}

export type FunctionBody = Block;
export type ConciseBody = FunctionBody | Expression;

export type FunctionLikeDeclaration =
    | FunctionDeclaration
    | MethodDeclaration
    | FunctionExpression
    | ArrowFunction;

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

export interface ArrowFunction
    extends Expression,
        FunctionLikeDeclarationBase,
        JSDocContainer,
        LocalsContainer,
        FlowContainer {
    readonly kind: SyntaxKind.ArrowFunction;
    readonly modifiers?: NodeArray<Modifier>;
    readonly equalsGreaterThanToken: EqualsGreaterThanToken;
    readonly body: ConciseBody;
    readonly name: never;
}

export interface FunctionDeclaration
    extends FunctionLikeDeclarationBase,
        DeclarationStatement,
        LocalsContainer {
    readonly kind: SyntaxKind.FunctionDeclaration;
    readonly modifiers?: NodeArray<Modifier>;
    readonly name?: Identifier;
    readonly body?: FunctionBody;
}

export interface CatchClause extends Node, LocalsContainer {
    readonly kind: SyntaxKind.CatchClause;
    readonly parent: Expression;
    readonly variableDeclaration?: VariableDeclaration;
    readonly block: Block;
}

// prettier-ignore
export interface VariableDeclaration extends NamedDeclaration, JSDocContainer {
    readonly kind: SyntaxKind.VariableDeclaration;
    readonly parent: VariableDeclarationList | CatchClause;
    readonly name: BindingName;                    // Declared variable name    
    readonly type?: TypeNode;                      // Optional type annotation
    readonly initializer?: Expression;             // Optional initializer
}

export interface VariableDeclarationList extends Node {
    readonly kind: SyntaxKind.VariableDeclarationList;
    readonly parent: VariableStatement | ForStatement | ForInStatement;
    readonly declarations: NodeArray<VariableDeclaration>;
}

export interface VariableStatement extends Statement, FlowContainer {
    readonly kind: SyntaxKind.VariableStatement;
    readonly modifiers?: NodeArray<Modifier>;
    readonly declarationList: VariableDeclarationList;
}

export interface ExpressionStatement extends Statement, FlowContainer {
    readonly kind: SyntaxKind.ExpressionStatement;
    readonly expression: Expression;
}

export interface ReturnStatement extends Statement, FlowContainer {
    readonly kind: SyntaxKind.ReturnStatement;
    readonly expression?: Expression;
}

export interface IfStatement extends Statement, FlowContainer {
    readonly kind: SyntaxKind.IfStatement;
    readonly expression: Expression;
    readonly thenStatement: Statement;
    readonly elseStatement?: Statement;
}

export interface IterationStatement extends Statement {
    readonly statement: Statement;
}

export interface DoStatement extends IterationStatement, FlowContainer {
    readonly kind: SyntaxKind.DoStatement;
    readonly expression: Expression;
}

export interface WhileStatement extends IterationStatement, FlowContainer {
    readonly kind: SyntaxKind.WhileStatement;
    readonly expression: Expression;
}

export type ForInitializer = VariableDeclarationList | Expression;

export interface ForStatement
    extends IterationStatement,
        LocalsContainer,
        FlowContainer {
    readonly kind: SyntaxKind.ForStatement;
    readonly initializer?: ForInitializer;
    readonly condition?: Expression;
    readonly incrementor?: Expression;
}

export interface ForInStatement
    extends IterationStatement,
        LocalsContainer,
        FlowContainer {
    readonly kind: SyntaxKind.ForInStatement;
    readonly initializer: ForInitializer;
    readonly expression: Expression;
}

export interface InlineClosureExpression
    extends Expression,
        FunctionLikeDeclarationBase,
        JSDocContainer,
        LocalsContainer,
        FlowContainer {
    readonly kind: SyntaxKind.InlineClosureExpression;
    readonly body: ConciseBody;
    readonly name: never;
}

export interface BinaryExpression
    extends Expression,
        Declaration,
        JSDocContainer {
    readonly kind: SyntaxKind.BinaryExpression;
    readonly left: Expression;
    readonly operatorToken: BinaryOperatorToken;
    readonly right: Expression;
}

// Punctuation
export interface PunctuationToken<TKind extends PunctuationSyntaxKind>
    extends Token<TKind> {}
export type DotToken = PunctuationToken<SyntaxKind.DotToken>;
export type DotDotDotToken = PunctuationToken<SyntaxKind.DotDotDotToken>;
export type QuestionToken = PunctuationToken<SyntaxKind.QuestionToken>;
export type ExclamationToken = PunctuationToken<SyntaxKind.ExclamationToken>;
export type ColonToken = PunctuationToken<SyntaxKind.ColonToken>;
export type EqualsToken = PunctuationToken<SyntaxKind.EqualsToken>;
export type AmpersandAmpersandEqualsToken =
    PunctuationToken<SyntaxKind.AmpersandAmpersandEqualsToken>;
export type BarBarEqualsToken = PunctuationToken<SyntaxKind.BarBarEqualsToken>;
export type AsteriskToken = PunctuationToken<SyntaxKind.AsteriskToken>;
export type EqualsGreaterThanToken =
    PunctuationToken<SyntaxKind.EqualsGreaterThanToken>;
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

export type AssignmentOperatorToken = Token<AssignmentOperator>;
export interface AssignmentExpression<TOperator extends AssignmentOperatorToken>
    extends BinaryExpression {
    readonly left: LeftHandSideExpression;
    readonly operatorToken: TOperator;
}

export interface NewExpression extends PrimaryExpression, Declaration {
    readonly kind: SyntaxKind.NewExpression;
    readonly expression: LeftHandSideExpression;
    readonly typeArguments?: NodeArray<TypeNode>;
    readonly arguments?: NodeArray<Expression>;
}

export type CallLikeExpression = CallExpression | NewExpression;

export interface SuperExpression extends PrimaryExpression, FlowContainer {
    readonly kind: SyntaxKind.ColonColonToken;
}

export interface SuperElementAccessExpression extends ElementAccessExpression {
    readonly expression: SuperExpression;
}

export type SuperProperty = SuperElementAccessExpression;

export interface CallExpression extends LeftHandSideExpression, Declaration {
    readonly kind: SyntaxKind.CallExpression;
    readonly expression: LeftHandSideExpression;
    /** @deprecated LPC doesn't use type args on call expressions */
    readonly typeArguments?: NodeArray<TypeNode>;
    readonly arguments: NodeArray<Expression>;
}

export interface CallChain extends CallExpression {
    _optionalChainBrand: any;
}
// TODO: I don't think this is needed - remove
export interface NonNullExpression extends LeftHandSideExpression {
    readonly kind: SyntaxKind.NonNullExpression;
    readonly expression: Expression;
}
export interface NonNullChain extends NonNullExpression {
    _optionalChainBrand: any;
}

export interface TypeAssertion extends UnaryExpression {
    readonly kind: SyntaxKind.TypeAssertionExpression;
    readonly type: TypeNode;
    readonly expression: UnaryExpression;
}

export const enum OuterExpressionKinds {
    Parentheses = 1 << 0,
    TypeAssertions = 1 << 1,
    PartiallyEmittedExpressions = 1 << 3,

    Assertions = TypeAssertions,
    All = Parentheses | Assertions | PartiallyEmittedExpressions,

    ExcludeJSDocTypeAssertion = 1 << 4,
}

/** @internal */
export type OuterExpression =
    | ParenthesizedExpression
    | TypeAssertion
    | NonNullExpression;

/** @internal */
export type WrappedExpression<T extends Expression> =
    | (OuterExpression & { readonly expression: WrappedExpression<T> })
    | T;

export type JSDocComment = JSDocText; // TODO: | JSDocLink | JSDocLinkCode | JSDocLinkPlain;

export interface JSDoc extends Node {
    readonly kind: SyntaxKind.JSDoc;
    readonly parent: HasJSDoc;
    readonly tags?: NodeArray<JSDocTag>;
    readonly comment?: string | NodeArray<JSDocComment>;
}

export interface JSDocDeprecatedTag extends JSDocTag {
    kind: SyntaxKind.JSDocDeprecatedTag;
}

export interface JSDocText extends Node {
    readonly kind: SyntaxKind.JSDocText;
    text: string;
}

export interface JSDocType extends TypeNode {
    _jsDocTypeBrand: any;
}

// represents a top level: { type } expression in a JSDoc comment.
export interface JSDocTypeExpression extends TypeNode {
    readonly kind: SyntaxKind.JSDocTypeExpression;
    readonly type: TypeNode;
}

export interface JSDocTemplateTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocTemplateTag;
    readonly constraint: JSDocTypeExpression | undefined;
    readonly typeParameters: NodeArray<TypeParameterDeclaration>;
}

export interface JSDocParameterTag extends JSDocPropertyLikeTag {
    readonly kind: SyntaxKind.JSDocParameterTag;
}

export interface JSDocReturnTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocReturnTag;
    readonly typeExpression?: JSDocTypeExpression;
}

export interface JSDocSignature
    extends JSDocType,
        Declaration,
        JSDocContainer,
        LocalsContainer {
    readonly kind: SyntaxKind.JSDocSignature;
    readonly typeParameters?: readonly JSDocTemplateTag[];
    readonly parameters: readonly JSDocParameterTag[];
    readonly type: JSDocReturnTag | undefined;
}

export interface JSDocPropertyLikeTag extends JSDocTag, Declaration {
    readonly parent: JSDoc;
    readonly name: EntityName;
    readonly typeExpression?: JSDocTypeExpression;
    /** Whether the property name came before the type -- non-standard for JSDoc, but Typescript-like */
    readonly isNameFirst: boolean;
    readonly isBracketed: boolean;
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

export interface JSDocTypeTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocTypeTag;
    readonly typeExpression: JSDocTypeExpression;
}

export interface JSDocFunctionType
    extends JSDocType,
        SignatureDeclarationBase,
        LocalsContainer {
    readonly kind: SyntaxKind.JSDocFunctionType;
}

/** @internal */
export interface JSDocTypeAssertion extends ParenthesizedExpression {
    readonly _jsDocTypeAssertionBrand: never;
}

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
    | HasLocals;

/** @internal */
export type HasFlowNode =
    | Identifier
    | SuperExpression
    | QualifiedName
    | ElementAccessExpression
    | PropertyAccessExpression
    | BindingElement
    //| FunctionExpression
    //| ArrowFunction
    //| MethodDeclaration
    | VariableStatement
    | ExpressionStatement
    | IfStatement
    | DoStatement
    | WhileStatement
    | ForStatement
    | ForInStatement
    // | ContinueStatement
    //| BreakStatement
    | ReturnStatement;
//| SwitchStatement

/** @internal */
export type HasChildren =
    | QualifiedName
    | ComputedPropertyName
    // | TypeParameterDeclaration
    | ParameterDeclaration
    // | PropertySignature
    // | PropertyDeclaration
    // | MethodSignature
    // | MethodDeclaration
    // | IndexSignatureDeclaration
    // | FunctionTypeNode
    | TypeLiteralNode
    | ArrayTypeNode
    // | UnionTypeNode
    // | InferTypeNode
    // | ObjectBindingPattern
    // | ArrayBindingPattern
    | BindingElement
    | ArrayLiteralExpression
    // | ObjectLiteralExpression
    // | PropertyAccessExpression
    // | ElementAccessExpression
    | CallExpression
    // | NewExpression
    // | TypeAssertion
    | ParenthesizedExpression
    | FunctionExpression
    // | ArrowFunction
    | PrefixUnaryExpression
    | PostfixUnaryExpression
    | BinaryExpression
    | ConditionalExpression
    // | SpreadElement
    // | NonNullExpression
    | Block
    | VariableStatement
    | ExpressionStatement
    // | IfStatement
    // | DoStatement
    // | WhileStatement
    // | ForStatement
    // | ForInStatement
    // | ContinueStatement
    // | BreakStatement
    | ReturnStatement
    // | SwitchStatement
    | VariableDeclaration
    | VariableDeclarationList
    | FunctionDeclaration
    // | CaseBlock
    // | ImportDeclaration
    // | ImportAttributes
    // | ImportClause
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
    // | CaseClause
    // | DefaultClause
    // | CatchClause
    // | PropertyAssignment
    // | ShorthandPropertyAssignment
    // | SpreadAssignment
    | SourceFile
    // | PartiallyEmittedExpression
    | CommaListExpression;
/** @internal */
export type ForEachChildNodes =
    | HasChildren
    // | MissingDeclaration
    // | JSDocTypeExpression
    // | JSDocNonNullableType
    // | JSDocNullableType
    // | JSDocOptionalType
    // | JSDocVariadicType
    // | JSDocFunctionType
    | JSDoc;
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
// | JSDocSignature
// | JSDocLink
// | JSDocLinkCode
// | JSDocLinkPlain
// | JSDocTypeLiteral
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
// | JSDocImportTag

/** @internal */
export const enum AssignmentDeclarationKind {
    None,
    // F.name = expr
    Property,
}

/** @internal */
export type BindableStaticNameExpression =
    | EntityNameExpression
    | BindableStaticElementAccessExpression;

/** @internal */
export type LiteralLikeElementAccessExpression = ElementAccessExpression &
    Declaration & {
        readonly argumentExpression: StringLiteral | NumericLiteral;
    };

/** @internal */
export type BindableStaticElementAccessExpression =
    LiteralLikeElementAccessExpression & {
        readonly expression: BindableStaticNameExpression;
    };

export const enum InternalSymbolName {
    Call = "__call", // Call signatures
    New = "__new", // Constructor signatures
    Index = "__index", // Index signatures
    Missing = "__missing", // Indicates missing symbol
    Type = "__type", // Anonymous type literal symbol
    Object = "__object", // Anonymous object literal declaration
    Class = "__class", // Unnamed class expression
    Function = "__function", // Unnamed function expression
    Computed = "__computed", // Computed property name declaration with dynamic name
    Resolving = "__resolving__", // Indicator symbol used to mark partially resolved type aliases
    Constructor = "__constructor", // Constructor implementation
    Default = "default", // Default export symbol (technically not wholly internal, but included here for usability)
    InstantiationExpression = "__instantiationExpression", // Instantiation expressions
    ImportAttributes = "__importAttributes",
}

/** @internal */
export interface RepopulateModuleNotFoundDiagnosticChain {
    moduleReference: string;
    packageName: string | undefined;
}

/** @internal */
export type RepopulateDiagnosticChainInfo =
    RepopulateModuleNotFoundDiagnosticChain;

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

/** @internal */
export type DiagnosticArguments = (string | number)[];

/** @internal */
export type DiagnosticAndArguments = [
    message: DiagnosticMessage,
    ...args: DiagnosticArguments
];

// branded string type used to store absolute, normalized and canonicalized paths
// arbitrary file name can be converted to Path via toPath function
export type Path = string & { __pathBrand: any };

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
export interface DiagnosticWithDetachedLocation extends Diagnostic {
    file: undefined;
    fileName: string;
    start: number;
    length: number;
}

export enum DiagnosticCategory {
    Warning,
    Error,
    Suggestion,
    Message,
}
/** @internal */
export function diagnosticCategoryName(
    d: { category: DiagnosticCategory },
    lowerCase = true
): string {
    const name = DiagnosticCategory[d.category];
    return lowerCase ? name.toLowerCase() : name;
}

export interface TextSpan {
    start: number;
    length: number;
}

export interface CancellationToken {
    isCancellationRequested(): boolean;

    /** @throws OperationCanceledException if isCancellationRequested is true */
    throwIfCancellationRequested(): void;
}

export const enum SignatureKind {
    Call,
    Construct,
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

export type TypeVariable = TypeParameter | IndexedAccessType;

/** @internal */
export const enum IndexFlags {
    None = 0,
    StringsOnly = 1 << 0,
    NoIndexSignatures = 1 << 1,
    NoReducibleCheck = 1 << 2,
}

// keyof T types (TypeFlags.Index)
export interface IndexType extends InstantiableType {
    type: InstantiableType | UnionOrIntersectionType;
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
export type TypeMapper =
    | { kind: TypeMapKind.Simple; source: Type; target: Type }
    | {
          kind: TypeMapKind.Array;
          sources: readonly Type[];
          targets: readonly Type[] | undefined;
      }
    | {
          kind: TypeMapKind.Deferred;
          sources: readonly Type[];
          targets: (() => Type)[];
      }
    | {
          kind: TypeMapKind.Function;
          func: (t: Type) => Type;
          debugInfo?: () => string;
      }
    | {
          kind: TypeMapKind.Composite | TypeMapKind.Merged;
          mapper1: TypeMapper;
          mapper2: TypeMapper;
      };

// Type parameters (TypeFlags.TypeParameter)
export interface TypeParameter extends InstantiableType {
    /**
     * Retrieve using getConstraintFromTypeParameter
     *
     * @internal
     */
    constraint?: Type; // Constraint
    /** @internal */
    default?: Type;
    /** @internal */
    target?: TypeParameter; // Instantiation target
    /** @internal */
    mapper?: TypeMapper; // Instantiation mapper
    /** @internal */
    isThisType?: boolean;
    /** @internal */
    resolvedDefaultType?: Type;
}

/** Class and interface types (ObjectFlags.Class and ObjectFlags.Interface). */
export interface InterfaceType extends ObjectType {
    typeParameters: TypeParameter[] | undefined; // Type parameters (undefined if non-generic)
    outerTypeParameters: TypeParameter[] | undefined; // Outer type parameters (undefined if none)
    localTypeParameters: TypeParameter[] | undefined; // Local type parameters (undefined if none)
    thisType: TypeParameter | undefined; // The "this" type (undefined if none)
    /** @internal */
    resolvedBaseConstructorType?: Type; // Resolved base constructor type of class
    /** @internal */
    resolvedBaseTypes: BaseType[]; // Resolved base types
    /** @internal */
    baseTypesResolved?: boolean;
}

// NOTE: If modifying this enum, must modify `TypeFormatFlags` too!
export const enum NodeBuilderFlags {
    None = 0,
    // Options
    NoTruncation = 1 << 0, // Don't truncate result
    WriteArrayAsGenericType = 1 << 1, // Write Array<T> instead T[]
    GenerateNamesForShadowedTypeParams = 1 << 2, // When a type parameter T is shadowing another T, generate a name for it so it can still be referenced
    UseStructuralFallback = 1 << 3, // When an alias cannot be named by its symbol, rather than report an error, fallback to a structural printout if possible
    ForbidIndexedAccessSymbolReferences = 1 << 4, // Forbid references like `I["a"]["b"]` - print `typeof I.a<x>.b<y>` instead
    WriteTypeArgumentsOfSignature = 1 << 5, // Write the type arguments instead of type parameters of the signature
    UseFullyQualifiedType = 1 << 6, // Write out the fully qualified type name (eg. Module.Type, instead of Type)
    UseOnlyExternalAliasing = 1 << 7, // Only use external aliases for a symbol
    SuppressAnyReturnType = 1 << 8, // If the return type is any-like and can be elided, don't offer a return type.
    WriteTypeParametersInQualifiedName = 1 << 9,
    MultilineObjectLiterals = 1 << 10, // Always write object literals across multiple lines
    WriteClassExpressionAsTypeLiteral = 1 << 11, // Write class {} as { new(): {} } - used for mixin declaration emit
    UseTypeOfFunction = 1 << 12, // Build using typeof instead of function type literal
    OmitParameterModifiers = 1 << 13, // Omit modifiers on parameters
    UseAliasDefinedOutsideCurrentScope = 1 << 14, // Allow non-visible aliases
    UseSingleQuotesForStringLiteralType = 1 << 28, // Use single quotes for string literal type
    NoTypeReduction = 1 << 29, // Don't call getReducedType
    OmitThisParameter = 1 << 25,

    // Error handling
    AllowThisInObjectLiteral = 1 << 15,
    AllowQualifiedNameInPlaceOfIdentifier = 1 << 16,
    AllowAnonymousIdentifier = 1 << 17,
    AllowEmptyUnionOrIntersection = 1 << 18,
    AllowEmptyTuple = 1 << 19,
    AllowUniqueESSymbolType = 1 << 20,
    AllowEmptyIndexInfoType = 1 << 21,
    /** @internal */ WriteComputedProps = 1 << 30, // { [E.A]: 1 }
    /** @internal */ NoSyntacticPrinter = 1 << 31,
    // Errors (cont.)
    AllowNodeModulesRelativePaths = 1 << 26,
    /** @internal */ DoNotIncludeSymbolChain = 1 << 27, // Skip looking up and printing an accessible symbol chain
    /** @internal */ AllowUnresolvedNames = 1 << 32,

    IgnoreErrors = AllowThisInObjectLiteral |
        AllowQualifiedNameInPlaceOfIdentifier |
        AllowAnonymousIdentifier |
        AllowEmptyUnionOrIntersection |
        AllowEmptyTuple |
        AllowEmptyIndexInfoType |
        AllowNodeModulesRelativePaths,

    // State
    InObjectTypeLiteral = 1 << 22,
    InTypeAlias = 1 << 23, // Writing type in type alias declaration
    InInitialEntityName = 1 << 24, // Set when writing the LHS of an entity name or entity name expression
}

export const enum TypePredicateKind {
    Identifier,
    AssertsIdentifier,
    AssertsThis,
    This,
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

export interface AssertsIdentifierTypePredicate extends TypePredicateBase {
    kind: TypePredicateKind.AssertsIdentifier;
    parameterName: string;
    parameterIndex: number;
    type: Type | undefined;
}

export type AssignmentPattern =
    | ObjectLiteralExpression
    | ArrayLiteralExpression;
export type TypePredicate =
    | IdentifierTypePredicate
    | AssertsIdentifierTypePredicate;

// Ensure the shared flags between this and `NodeBuilderFlags` stay in alignment
export const enum TypeFormatFlags {
    None = 0,
    NoTruncation = 1 << 0, // Don't truncate typeToString result
    WriteArrayAsGenericType = 1 << 1, // Write Array<T> instead T[]
    GenerateNamesForShadowedTypeParams = 1 << 2, // When a type parameter T is shadowing another T, generate a name for it so it can still be referenced
    UseStructuralFallback = 1 << 3, // When an alias cannot be named by its symbol, rather than report an error, fallback to a structural printout if possible
    // hole because there's a hole in node builder flags
    WriteTypeArgumentsOfSignature = 1 << 5, // Write the type arguments instead of type parameters of the signature
    UseFullyQualifiedType = 1 << 6, // Write out the fully qualified type name (eg. Module.Type, instead of Type)
    // hole because `UseOnlyExternalAliasing` is here in node builder flags, but functions which take old flags use `SymbolFormatFlags` instead
    SuppressAnyReturnType = 1 << 8, // If the return type is any-like, don't offer a return type.
    // hole because `WriteTypeParametersInQualifiedName` is here in node builder flags, but functions which take old flags use `SymbolFormatFlags` for this instead
    MultilineObjectLiterals = 1 << 10, // Always print object literals across multiple lines (only used to map into node builder flags)
    WriteClassExpressionAsTypeLiteral = 1 << 11, // Write a type literal instead of (Anonymous class)
    UseTypeOfFunction = 1 << 12, // Write typeof instead of function type literal
    OmitParameterModifiers = 1 << 13, // Omit modifiers on parameters

    UseAliasDefinedOutsideCurrentScope = 1 << 14, // For a `type T = ... ` defined in a different file, write `T` instead of its value, even though `T` can't be accessed in the current scope.
    UseSingleQuotesForStringLiteralType = 1 << 28, // Use single quotes for string literal type
    NoTypeReduction = 1 << 29, // Don't call getReducedType
    OmitThisParameter = 1 << 25,

    // Error Handling
    AllowUniqueESSymbolType = 1 << 20, // This is bit 20 to align with the same bit in `NodeBuilderFlags`

    // TypeFormatFlags exclusive
    AddUndefined = 1 << 17, // Add undefined to types of initialized, non-optional parameters
    WriteArrowStyleSignature = 1 << 18, // Write arrow style signature

    // State
    InArrayType = 1 << 19, // Writing an array element type
    InElementType = 1 << 21, // Writing an array or union element type
    InFirstTypeArgument = 1 << 22, // Writing first type argument of the instantiated type
    InTypeAlias = 1 << 23, // Writing type in type alias declaration

    NodeBuilderFlagsMask = NoTruncation |
        WriteArrayAsGenericType |
        GenerateNamesForShadowedTypeParams |
        UseStructuralFallback |
        WriteTypeArgumentsOfSignature |
        UseFullyQualifiedType |
        SuppressAnyReturnType |
        MultilineObjectLiterals |
        WriteClassExpressionAsTypeLiteral |
        UseTypeOfFunction |
        OmitParameterModifiers |
        UseAliasDefinedOutsideCurrentScope |
        AllowUniqueESSymbolType |
        InTypeAlias |
        UseSingleQuotesForStringLiteralType |
        NoTypeReduction |
        OmitThisParameter,
}

export interface NodeWithTypeArguments extends TypeNode {
    readonly typeArguments?: NodeArray<TypeNode>;
}

export interface ImportTypeNode extends NodeWithTypeArguments {
    readonly kind: SyntaxKind.ImportType;
    readonly isTypeOf: boolean;
    readonly argument: TypeNode;
    readonly attributes?: ImportAttributes;
    readonly qualifier?: EntityName;
}

export const enum SymbolFormatFlags {
    None = 0,

    // Write symbols's type argument if it is instantiated symbol
    // eg. class C<T> { p: T }   <-- Show p as C<T>.p here
    //     var a: C<number>;
    //     var p = a.p; <--- Here p is property of C<number> so show it as C<number>.p instead of just C.p
    WriteTypeParametersOrArguments = 1 << 0,

    // Use only external alias information to get the symbol name in the given context
    // eg.  module m { export class c { } } import x = m.c;
    // When this flag is specified m.c will be used to refer to the class instead of alias symbol x
    UseOnlyExternalAliasing = 1 << 1,

    // Build symbol name using any nodes needed, instead of just components of an entity name
    AllowAnyNodeKind = 1 << 2,

    // Prefer aliases which are not directly visible
    UseAliasDefinedOutsideCurrentScope = 1 << 3,

    // { [E.A]: 1 }
    /** @internal */ WriteComputedProps = 1 << 4,

    // Skip building an accessible symbol chain
    /** @internal */ DoNotIncludeSymbolChain = 1 << 5,
}

/** @internal */
export const enum ContextFlags {
    None = 0,
    Signature = 1 << 0, // Obtaining contextual signature
    NoConstraints = 1 << 1, // Don't obtain type variable constraints
    Completions = 1 << 2, // Ignore inference to current node and parent nodes out to the containing call for completions
    SkipBindingPatterns = 1 << 3, // Ignore contextual types applied by binding patterns
}

export interface JSDocImportTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocImportTag;
    readonly parent: JSDoc;
    readonly importClause?: ImportClause;
    readonly moduleSpecifier: Expression;
    readonly attributes?: ImportAttributes;
}

// In case of:
// import d from "mod" => name = d, namedBinding = undefined
// import * as ns from "mod" => name = undefined, namedBinding: NamespaceImport = { name: ns }
// import d, * as ns from "mod" => name = d, namedBinding: NamespaceImport = { name: ns }
// import { a, b as x } from "mod" => name = undefined, namedBinding: NamedImports = { elements: [{ name: a }, { name: x, propertyName: b}]}
// import d, { a, b as x } from "mod" => name = d, namedBinding: NamedImports = { elements: [{ name: a }, { name: x, propertyName: b}]}
export interface ImportClause extends NamedDeclaration {
    readonly kind: SyntaxKind.ImportClause;
    readonly parent: ImportDeclaration | JSDocImportTag;
    readonly isTypeOnly: boolean;
    readonly name?: Identifier; // Default binding
    //readonly namedBindings?: NamedImportBindings;
}

// In case of:
// import "mod"  => importClause = undefined, moduleSpecifier = "mod"
// In rest of the cases, module specifier is string literal corresponding to module
// ImportClause information is shown at its declaration below.
export interface ImportDeclaration extends Statement {
    readonly kind: SyntaxKind.ImportDeclaration;
    readonly parent: SourceFile;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly importClause?: ImportClause;
    /** If this is not a StringLiteral it will be a grammar error. */
    readonly moduleSpecifier: Expression;
    readonly attributes?: ImportAttributes;
}

export interface ImportExpression extends PrimaryExpression {
    readonly kind: SyntaxKind.ImportKeyword;
}

export interface ImportCall extends CallExpression {
    readonly expression: ImportExpression;
}

/** @internal */
export const enum VarianceFlags {
    Invariant = 0, // Neither covariant nor contravariant
    Covariant = 1 << 0, // Covariant
    Contravariant = 1 << 1, // Contravariant
    Bivariant = Covariant | Contravariant, // Both covariant and contravariant
    Independent = 1 << 2, // Unwitnessed type parameter
    VarianceMask = Invariant | Covariant | Contravariant | Independent, // Mask containing all measured variances without the unmeasurable flag
    Unmeasurable = 1 << 3, // Variance result is unusable - relationship relies on structural comparisons which are not reflected in generic relationships
    Unreliable = 1 << 4, // Variance result is unreliable - checking may produce false negatives, but not false positives
    AllowsStructuralFallback = Unmeasurable | Unreliable,
}

/** @internal */
export interface SymbolLinks {
    _symbolLinksBrand: any;
    immediateTarget?: Symbol; // Immediate target of an alias. May be another alias. Do not access directly, use `checker.getImmediateAliasedSymbol` instead.
    aliasTarget?: Symbol; // Resolved (non-alias) target of an alias
    target?: Symbol; // Original version of an instantiated symbol
    type?: Type; // Type of value symbol
    writeType?: Type; // Type of value symbol in write contexts
    nameType?: Type; // Type associated with a late-bound symbol
    uniqueESSymbolType?: Type; // UniqueESSymbol type for a symbol
    declaredType?: Type; // Type of class, interface, enum, type alias, or type parameter
    typeParameters?: TypeParameter[]; // Type parameters of type alias (undefined if non-generic)
    instantiations?: Map<string, Type>; // Instantiations of generic type alias (undefined if non-generic)
    inferredClassSymbol?: Map<SymbolId, TransientSymbol>; // Symbol of an inferred ES5 constructor function
    mapper?: TypeMapper; // Type mapper for instantiation alias
    referenced?: boolean; // True if alias symbol has been referenced as a value that can be emitted
    containingType?: UnionOrIntersectionType; // Containing union or intersection type for synthetic property
    leftSpread?: Symbol; // Left source for synthetic spread property
    rightSpread?: Symbol; // Right source for synthetic spread property
    syntheticOrigin?: Symbol; // For a property on a mapped or spread type, points back to the original property
    isDiscriminantProperty?: boolean; // True if discriminant synthetic property
    resolvedExports?: SymbolTable; // Resolved exports of module or combined early- and late-bound static members of a class.
    resolvedMembers?: SymbolTable; // Combined early- and late-bound members of a symbol
    exportsChecked?: boolean; // True if exports of external module have been checked
    typeParametersChecked?: boolean; // True if type parameters of merged class and interface declarations have been checked.
    isDeclarationWithCollidingName?: boolean; // True if symbol is block scoped redeclaration
    bindingElement?: BindingElement; // Binding element associated with property symbol
    originatingImport?: ImportDeclaration | ImportCall; // Import declaration which produced the symbol, present if the symbol is marked as uncallable but had call signatures in `resolveESModuleSymbol`
    lateSymbol?: Symbol; // Late-bound symbol for a computed property
    specifierCache?: Map<ModeAwareCacheKey, string>; // For symbols corresponding to external modules, a cache of incoming path -> module specifier name mappings
    extendedContainers?: Symbol[]; // Containers (other than the parent) which this symbol is aliased in
    extendedContainersByFile?: Map<NodeId, Symbol[]>; // Containers (other than the parent) which this symbol is aliased in
    variances?: VarianceFlags[]; // Alias symbol type argument variance cache
    deferralConstituents?: Type[]; // Calculated list of constituents for a deferred type
    deferralWriteConstituents?: Type[]; // Constituents of a deferred `writeType`
    deferralParent?: Type; // Source union/intersection of a deferred type
    cjsExportMerged?: Symbol; // Version of the symbol with all non export= exports merged with the export= target
    typeOnlyDeclaration?: TypeOnlyAliasDeclaration | false; // First resolved alias declaration that makes the symbol only usable in type constructs
    isConstructorDeclaredProperty?: boolean; // Property declared through 'this.x = ...' assignment in constructor
    tupleLabelDeclaration?: ParameterDeclaration; // Declaration associated with the tuple's label
    accessibleChainCache?: Map<string, Symbol[] | undefined>;
    filteredIndexSymbolCache?: Map<string, Symbol>; //Symbol with applicable declarations
}

/** @internal */
export interface SymbolLinks {
    _symbolLinksBrand: any;
    immediateTarget?: Symbol; // Immediate target of an alias. May be another alias. Do not access directly, use `checker.getImmediateAliasedSymbol` instead.
    aliasTarget?: Symbol; // Resolved (non-alias) target of an alias
    target?: Symbol; // Original version of an instantiated symbol
    type?: Type; // Type of value symbol
    writeType?: Type; // Type of value symbol in write contexts
    nameType?: Type; // Type associated with a late-bound symbol
    uniqueESSymbolType?: Type; // UniqueESSymbol type for a symbol
    declaredType?: Type; // Type of class, interface, enum, type alias, or type parameter
    typeParameters?: TypeParameter[]; // Type parameters of type alias (undefined if non-generic)
    instantiations?: Map<string, Type>; // Instantiations of generic type alias (undefined if non-generic)
    inferredClassSymbol?: Map<SymbolId, TransientSymbol>; // Symbol of an inferred ES5 constructor function
    mapper?: TypeMapper; // Type mapper for instantiation alias
    referenced?: boolean; // True if alias symbol has been referenced as a value that can be emitted
    containingType?: UnionOrIntersectionType; // Containing union or intersection type for synthetic property
    leftSpread?: Symbol; // Left source for synthetic spread property
    rightSpread?: Symbol; // Right source for synthetic spread property
    syntheticOrigin?: Symbol; // For a property on a mapped or spread type, points back to the original property
    isDiscriminantProperty?: boolean; // True if discriminant synthetic property
    resolvedExports?: SymbolTable; // Resolved exports of module or combined early- and late-bound static members of a class.
    resolvedMembers?: SymbolTable; // Combined early- and late-bound members of a symbol
    exportsChecked?: boolean; // True if exports of external module have been checked
    typeParametersChecked?: boolean; // True if type parameters of merged class and interface declarations have been checked.
    isDeclarationWithCollidingName?: boolean; // True if symbol is block scoped redeclaration
    bindingElement?: BindingElement; // Binding element associated with property symbol
    originatingImport?: ImportDeclaration | ImportCall; // Import declaration which produced the symbol, present if the symbol is marked as uncallable but had call signatures in `resolveESModuleSymbol`
    lateSymbol?: Symbol; // Late-bound symbol for a computed property
    specifierCache?: Map<ModeAwareCacheKey, string>; // For symbols corresponding to external modules, a cache of incoming path -> module specifier name mappings
    extendedContainers?: Symbol[]; // Containers (other than the parent) which this symbol is aliased in
    extendedContainersByFile?: Map<NodeId, Symbol[]>; // Containers (other than the parent) which this symbol is aliased in
    variances?: VarianceFlags[]; // Alias symbol type argument variance cache
    deferralConstituents?: Type[]; // Calculated list of constituents for a deferred type
    deferralWriteConstituents?: Type[]; // Constituents of a deferred `writeType`
    deferralParent?: Type; // Source union/intersection of a deferred type
    cjsExportMerged?: Symbol; // Version of the symbol with all non export= exports merged with the export= target
    typeOnlyDeclaration?: TypeOnlyAliasDeclaration | false; // First resolved alias declaration that makes the symbol only usable in type constructs
    /** @deprecated */
    typeOnlyExportStarMap?: Map<string, any>; //ExportDeclaration & { readonly isTypeOnly: true, readonly moduleSpecifier: Expression }>; // Set on a module symbol when some of its exports were resolved through a 'export type * from "mod"' declaration
    typeOnlyExportStarName?: string; // Set to the name of the symbol re-exported by an 'export type *' declaration, when different from the symbol name
    isConstructorDeclaredProperty?: boolean; // Property declared through 'this.x = ...' assignment in constructor
    //tupleLabelDeclaration?: NamedTupleMember | ParameterDeclaration; // Declaration associated with the tuple's label
    accessibleChainCache?: Map<string, Symbol[] | undefined>;
    filteredIndexSymbolCache?: Map<string, Symbol>; //Symbol with applicable declarations
}

/** @internal */
export const enum CheckFlags {
    None = 0,
    Instantiated = 1 << 0, // Instantiated symbol
    SyntheticProperty = 1 << 1, // Property in union or intersection type
    SyntheticMethod = 1 << 2, // Method in union or intersection type
    Readonly = 1 << 3, // Readonly transient symbol
    ReadPartial = 1 << 4, // Synthetic property present in some but not all constituents
    WritePartial = 1 << 5, // Synthetic property present in some but only satisfied by an index signature in others
    HasNonUniformType = 1 << 6, // Synthetic property with non-uniform type in constituents
    HasLiteralType = 1 << 7, // Synthetic property with at least one literal type in constituents
    ContainsPublic = 1 << 8, // Synthetic property with public constituent(s)
    ContainsProtected = 1 << 9, // Synthetic property with protected constituent(s)
    ContainsPrivate = 1 << 10, // Synthetic property with private constituent(s)
    ContainsStatic = 1 << 11, // Synthetic property with static constituent(s)
    Late = 1 << 12, // Late-bound symbol for a computed property with a dynamic name
    ReverseMapped = 1 << 13, // Property of reverse-inferred homomorphic mapped type
    OptionalParameter = 1 << 14, // Optional parameter
    RestParameter = 1 << 15, // Rest parameter
    DeferredType = 1 << 16, // Calculation of the type of this symbol is deferred due to processing costs, should be fetched with `getTypeOfSymbolWithDeferredType`
    HasNeverType = 1 << 17, // Synthetic property with at least one never type in constituents
    Mapped = 1 << 18, // Property of mapped type
    StripOptional = 1 << 19, // Strip optionality in mapped property
    Unresolved = 1 << 20, // Unresolved type alias symbol
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

// Generic class and interface types
export interface GenericType extends InterfaceType, TypeReference {
    /** @internal */
    instantiations: Map<string, TypeReference>; // Generic instantiation cache
    /** @internal */
    variances?: VarianceFlags[]; // Variance of each type parameter
}

export interface TypeReferenceNode extends NodeWithTypeArguments {
    readonly kind: SyntaxKind.TypeReference;
    readonly typeName: EntityName;
}

export interface TupleTypeNode extends TypeNode {
    readonly kind: SyntaxKind.TupleType;
    readonly elements: NodeArray<TypeNode | NamedTupleMember>;
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

/** @internal */
export interface ModuleSpecifierResolutionHost {
    useCaseSensitiveFileNames?(): boolean;
    fileExists(path: string): boolean;
    getCurrentDirectory(): string;
    directoryExists?(path: string): boolean;
    readFile?(path: string): string | undefined;
    realpath?(path: string): string;
    getSymlinkCache?(): any; //SymlinkCache;
    // getModuleSpecifierCache?(): ModuleSpecifierCache;
    // getPackageJsonInfoCache?(): PackageJsonInfoCache | undefined;
    getGlobalTypingsCacheLocation?(): string | undefined;
    getNearestAncestorDirectoryWithPackageJson?(
        fileName: string,
        rootDir?: string
    ): string | undefined;

    //readonly redirectTargetsMap: RedirectTargetsMap;
    getProjectReferenceRedirect(fileName: string): string | undefined;
    isSourceOfProjectReferenceRedirect(fileName: string): boolean;
    //getFileIncludeReasons(): MultiMap<Path, FileIncludeReason>;
    getCommonSourceDirectory(): string;
    getDefaultResolutionModeForFile(sourceFile: SourceFile): ResolutionMode;
    getModeForResolutionAtIndex(
        file: SourceFile,
        index: number
    ): ResolutionMode;

    //getModuleResolutionCache?(): ModuleResolutionCache | undefined;
    trace?(s: string): void;
}

/** @internal */
export interface SymbolTracker {
    // Called when the symbol writer encounters a symbol to write.  Currently only used by the
    // declaration emitter to help determine if it should patch up the final declaration file
    // with import statements it previously saw (but chose not to emit).
    trackSymbol?(
        symbol: Symbol,
        enclosingDeclaration: Node | undefined,
        meaning: SymbolFlags
    ): boolean;
    reportInaccessibleThisError?(): void;
    reportPrivateInBaseOfClassExpression?(propertyName: string): void;
    reportInaccessibleUniqueSymbolError?(): void;
    reportCyclicStructureError?(): void;
    reportLikelyUnsafeImportRequiredError?(specifier: string): void;
    reportTruncationError?(): void;
    moduleResolverHost?: ModuleSpecifierResolutionHost & {
        getCommonSourceDirectory(): string;
    };
    reportNonlocalAugmentation?(
        containingFile: SourceFile,
        parentSymbol: Symbol,
        augmentingSymbol: Symbol
    ): void;
    reportNonSerializableProperty?(propertyName: string): void;
    reportInferenceFallback?(node: Node): void;
}

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

/** @internal */
export const enum SignatureFlags {
    None = 0,

    // Propagating flags
    HasRestParameter = 1 << 0, // Indicates last parameter is rest parameter
    HasLiteralTypes = 1 << 1, // Indicates signature is specialized
    Abstract = 1 << 2, // Indicates signature comes from an abstract class, abstract construct signature, or abstract constructor type

    // Non-propagating flags
    IsInnerCallChain = 1 << 3, // Indicates signature comes from a CallChain nested in an outer OptionalChain
    IsOuterCallChain = 1 << 4, // Indicates signature comes from a CallChain that is the outermost chain of an optional expression
    IsUntypedSignatureInJSFile = 1 << 5, // Indicates signature is from a js file and has no types
    IsNonInferrable = 1 << 6, // Indicates signature comes from a non-inferrable type
    IsSignatureCandidateForOverloadFailure = 1 << 7,

    // We do not propagate `IsInnerCallChain` or `IsOuterCallChain` to instantiated signatures, as that would result in us
    // attempting to add `| undefined` on each recursive call to `getReturnTypeOfSignature` when
    // instantiating the return type.
    PropagatingFlags = HasRestParameter |
        HasLiteralTypes |
        Abstract |
        IsUntypedSignatureInJSFile |
        IsSignatureCandidateForOverloadFailure,

    CallChainFlags = IsInnerCallChain | IsOuterCallChain,
}

/** @internal */
export interface SymbolWalker {
    /** Note: Return values are not ordered. */
    walkType(root: Type): {
        visitedTypes: readonly Type[];
        visitedSymbols: readonly Symbol[];
    };
    /** Note: Return values are not ordered. */
    walkSymbol(root: Symbol): {
        visitedTypes: readonly Type[];
        visitedSymbols: readonly Symbol[];
    };
}

/** @internal */
export const enum NodeCheckFlags {
    None = 0,
    TypeChecked = 1 << 0, // Node has been type checked
    LexicalThis = 1 << 1, // Lexical 'this' reference
    CaptureThis = 1 << 2, // Lexical 'this' used in body
    CaptureNewTarget = 1 << 3, // Lexical 'new.target' used in body
    SuperInstance = 1 << 4, // Instance 'super' reference
    SuperStatic = 1 << 5, // Static 'super' reference
    ContextChecked = 1 << 6, // Contextual types have been assigned
    MethodWithSuperPropertyAccessInAsync = 1 << 7, // A method that contains a SuperProperty access in an async context.
    MethodWithSuperPropertyAssignmentInAsync = 1 << 8, // A method that contains a SuperProperty assignment in an async context.
    CaptureArguments = 1 << 9, // Lexical 'arguments' used in body
    EnumValuesComputed = 1 << 10, // Values for enum members have been computed, and any errors have been reported for them.
    LexicalModuleMergesWithClass = 1 << 11, // Instantiated lexical module declaration is merged with a previous class declaration.
    LoopWithCapturedBlockScopedBinding = 1 << 12, // Loop that contains block scoped variable captured in closure
    ContainsCapturedBlockScopeBinding = 1 << 13, // Part of a loop that contains block scoped variable captured in closure
    CapturedBlockScopedBinding = 1 << 14, // Block-scoped binding that is captured in some function
    BlockScopedBindingInLoop = 1 << 15, // Block-scoped binding with declaration nested inside iteration statement
    NeedsLoopOutParameter = 1 << 16, // Block scoped binding whose value should be explicitly copied outside of the converted loop
    AssignmentsMarked = 1 << 17, // Parameter assignments have been marked
    ContainsConstructorReference = 1 << 18, // Class or class element that contains a binding that references the class constructor.
    ConstructorReference = 1 << 29, // Binding to a class constructor inside of the class's body.
    ContainsClassWithPrivateIdentifiers = 1 << 20, // Marked on all block-scoped containers containing a class with private identifiers.
    ContainsSuperPropertyInStaticInitializer = 1 << 21, // Marked on all block-scoped containers containing a static initializer with 'super.x' or 'super[x]'.
    InCheckIdentifier = 1 << 22,
}

/** @internal */
export const enum SymbolAccessibility {
    Accessible,
    NotAccessible,
    CannotBeNamed,
    NotResolved,
}

/** @internal */
export type AnyImportOrJsDocImport = AnyImportSyntax | JSDocImportTag;

/** @internal */
export type LateVisibilityPaintedStatement =
    | AnyImportOrJsDocImport
    | VariableStatement
    //| ClassDeclaration
    | FunctionDeclaration;
//| ModuleDeclaration
//| TypeAliasDeclaration
//| InterfaceDeclaration
//| EnumDeclaration;

/**
 * Indicates how to serialize the name for a TypeReferenceNode when emitting decorator metadata
 *
 * @internal
 */
export enum TypeReferenceSerializationKind {
    // The TypeReferenceNode could not be resolved.
    // The type name should be emitted using a safe fallback.
    Unknown,

    // The TypeReferenceNode resolves to a type with a constructor
    // function that can be reached at runtime (e.g. a `class`
    // declaration or a `var` declaration for the static side
    // of a type, such as the global `Promise` type in lib.d.ts).
    TypeWithConstructSignatureAndValue,

    // The TypeReferenceNode resolves to a Void-like, Nullable, or Never type.
    VoidNullableOrNeverType,

    // The TypeReferenceNode resolves to a Number-like type.
    NumberLikeType,

    // The TypeReferenceNode resolves to a BigInt-like type.
    BigIntLikeType,

    // The TypeReferenceNode resolves to a String-like type.
    StringLikeType,

    // The TypeReferenceNode resolves to a Boolean-like type.
    BooleanType,

    // The TypeReferenceNode resolves to an Array-like type.
    ArrayLikeType,

    // The TypeReferenceNode resolves to the ESSymbol type.
    ESSymbolType,

    // The TypeReferenceNode resolved to the global Promise constructor symbol.
    Promise,

    // The TypeReferenceNode resolves to a Function type or a type with call signatures.
    TypeWithCallSignature,

    // The TypeReferenceNode resolves to any other type.
    ObjectType,
}

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

/** @internal */
export interface EmitResolver {
    isNonNarrowedBindableName(node: ComputedPropertyName): boolean;
    hasGlobalName(name: string): boolean;
    getReferencedExportContainer(
        node: Identifier,
        prefixLocals?: boolean
    ): SourceFile | undefined;
    getReferencedImportDeclaration(node: Identifier): Declaration | undefined;
    getReferencedDeclarationWithCollidingName(
        node: Identifier
    ): Declaration | undefined;
    isDeclarationWithCollidingName(node: Declaration): boolean;
    isValueAliasDeclaration(node: Node): boolean;
    isReferencedAliasDeclaration(node: Node, checkChildren?: boolean): boolean;
    //isTopLevelValueImportEqualsWithEntityName(node: ImportEqualsDeclaration): boolean;
    getNodeCheckFlags(node: Node): NodeCheckFlags;
    isDeclarationVisible(node: Declaration | AnyImportSyntax): boolean;
    isLateBound(node: Declaration): node is LateBoundDeclaration;
    collectLinkedAliases(
        node: Identifier,
        setVisibility?: boolean
    ): Node[] | undefined;
    isImplementationOfOverload(node: SignatureDeclaration): boolean | undefined;
    requiresAddingImplicitUndefined(node: ParameterDeclaration): boolean;
    isExpandoFunctionDeclaration(
        node: FunctionDeclaration | VariableDeclaration
    ): boolean;
    getPropertiesOfContainerFunction(node: Declaration): Symbol[];
    createTypeOfDeclaration(
        declaration:
            | VariableLikeDeclaration
            | PropertyAccessExpression
            | ElementAccessExpression
            | BinaryExpression,
        enclosingDeclaration: Node,
        flags: NodeBuilderFlags,
        tracker: SymbolTracker
    ): TypeNode | undefined;
    createReturnTypeOfSignatureDeclaration(
        signatureDeclaration: SignatureDeclaration,
        enclosingDeclaration: Node,
        flags: NodeBuilderFlags,
        tracker: SymbolTracker
    ): TypeNode | undefined;
    createTypeOfExpression(
        expr: Expression,
        enclosingDeclaration: Node,
        flags: NodeBuilderFlags,
        tracker: SymbolTracker
    ): TypeNode | undefined;
    createLiteralConstValue(
        node:
            | VariableDeclaration
            | PropertyDeclaration
            | PropertySignature
            | ParameterDeclaration,
        tracker: SymbolTracker
    ): Expression;
    isSymbolAccessible(
        symbol: Symbol,
        enclosingDeclaration: Node | undefined,
        meaning: SymbolFlags | undefined,
        shouldComputeAliasToMarkVisible: boolean
    ): SymbolAccessibilityResult;
    isEntityNameVisible(
        entityName: EntityNameOrEntityNameExpression,
        enclosingDeclaration: Node
    ): SymbolVisibilityResult;
    // Returns the constant value this property access resolves to, or 'undefined' for a non-constant
    getConstantValue(
        node: PropertyAccessExpression | ElementAccessExpression
    ): string | number | undefined;
    getReferencedValueDeclaration(
        reference: Identifier
    ): Declaration | undefined;
    getReferencedValueDeclarations(
        reference: Identifier
    ): Declaration[] | undefined;
    getTypeReferenceSerializationKind(
        typeName: EntityName,
        location?: Node
    ): TypeReferenceSerializationKind;
    isOptionalParameter(node: ParameterDeclaration): boolean;
    isArgumentsLocalBinding(node: Identifier): boolean;
    getExternalModuleFileFromDeclaration(
        declaration: ImportDeclaration | ImportTypeNode | ImportCall
    ): SourceFile | undefined;
    isLiteralConstDeclaration(
        node:
            | VariableDeclaration
            | PropertyDeclaration
            | PropertySignature
            | ParameterDeclaration
    ): boolean;
    getJsxFactoryEntity(location?: Node): EntityName | undefined;
    getJsxFragmentFactoryEntity(location?: Node): EntityName | undefined;
    isBindingCapturedByNode(
        node: Node,
        decl: VariableDeclaration | BindingElement
    ): boolean;
    getDeclarationStatementsForSourceFile(
        node: SourceFile,
        flags: NodeBuilderFlags,
        tracker: SymbolTracker
    ): Statement[] | undefined;
    isImportRequiredByAugmentation(decl: ImportDeclaration): boolean;
}

/** @internal */
export const enum UnionReduction {
    None = 0,
    Literal,
    Subtype,
}

/** @internal */
export interface TypeCheckerHost extends ModuleSpecifierResolutionHost {
    getCompilerOptions(): CompilerOptions;

    getSourceFiles(): readonly SourceFile[];
    getSourceFile(fileName: string): SourceFile | undefined;
    getProjectReferenceRedirect(fileName: string): string | undefined;
    isSourceOfProjectReferenceRedirect(fileName: string): boolean;
    getEmitSyntaxForUsageLocation(
        file: SourceFile,
        usage: StringLiteral
    ): ResolutionMode;
    //getRedirectReferenceForResolutionFromSourceOfProject(filePath: Path): ResolvedProjectReference | undefined;
    getModeForUsageLocation(
        file: SourceFile,
        usage: StringLiteral
    ): ResolutionMode;
    getDefaultResolutionModeForFile(sourceFile: SourceFile): ResolutionMode;
    getImpliedNodeFormatForEmit(sourceFile: SourceFile): ResolutionMode;
    //getEmitModuleFormatOfFile(sourceFile: SourceFile): ModuleKind;

    //getResolvedModule(f: SourceFile, moduleName: string, mode: ResolutionMode): ResolvedModuleWithFailedLookupLocations | undefined;

    //readonly redirectTargetsMap: RedirectTargetsMap;

    typesPackageExists(packageName: string): boolean;
    packageBundlesTypes(packageName: string): boolean;
}

export interface TypeChecker {
    getTypeOfSymbolAtLocation(symbol: Symbol, node: Node): Type;
    getTypeOfSymbol(symbol: Symbol): Type;
    getDeclaredTypeOfSymbol(symbol: Symbol): Type;
    getPropertiesOfType(type: Type): Symbol[];
    getPropertyOfType(type: Type, propertyName: string): Symbol | undefined;
    getPrivateIdentifierPropertyOfType(
        leftType: Type,
        name: string,
        location: Node
    ): Symbol | undefined;
    /** @internal */ getTypeOfPropertyOfType(
        type: Type,
        propertyName: string
    ): Type | undefined;
    getIndexInfoOfType(type: Type, kind: IndexKind): IndexInfo | undefined;
    getIndexInfosOfType(type: Type): readonly IndexInfo[];
    getIndexInfosOfIndexSymbol: (indexSymbol: Symbol) => IndexInfo[];
    getSignaturesOfType(type: Type, kind: SignatureKind): readonly Signature[];
    getIndexTypeOfType(type: Type, kind: IndexKind): Type | undefined;
    /** @internal */ getIndexType(type: Type): Type;
    getBaseTypes(type: InterfaceType): BaseType[];
    getBaseTypeOfLiteralType(type: Type): Type;
    getWidenedType(type: Type): Type;
    /** @internal */
    getWidenedLiteralType(type: Type): Type;
    /** @internal */
    getPromisedTypeOfPromise(promise: Type, errorNode?: Node): Type | undefined;
    /** @internal */
    getAwaitedType(type: Type): Type | undefined;
    /** @internal */
    isEmptyAnonymousObjectType(type: Type): boolean;
    getReturnTypeOfSignature(signature: Signature): Type;
    /**
     * Gets the type of a parameter at a given position in a signature.
     * Returns `any` if the index is not valid.
     *
     * @internal
     */
    getParameterType(signature: Signature, parameterIndex: number): Type;
    /** @internal */ getParameterIdentifierInfoAtPosition(
        signature: Signature,
        parameterIndex: number
    ):
        | {
              parameter: Identifier;
              parameterName: string;
              isRestParameter: boolean;
          }
        | undefined;
    getNullableType(type: Type, flags: TypeFlags): Type;
    getNonNullableType(type: Type): Type;
    /** @internal */ getNonOptionalType(type: Type): Type;
    /** @internal */ isNullableType(type: Type): boolean;
    getTypeArguments(type: TypeReference): readonly Type[];

    // TODO: GH#18217 `xToDeclaration` calls are frequently asserted as defined.
    /** Note that the resulting nodes cannot be checked. */
    typeToTypeNode(
        type: Type,
        enclosingDeclaration: Node | undefined,
        flags: NodeBuilderFlags | undefined
    ): TypeNode | undefined;
    /** @internal */ typeToTypeNode(
        type: Type,
        enclosingDeclaration: Node | undefined,
        flags: NodeBuilderFlags | undefined,
        tracker?: SymbolTracker
    ): TypeNode | undefined; // eslint-disable-line @typescript-eslint/unified-signatures
    /** Note that the resulting nodes cannot be checked. */
    signatureToSignatureDeclaration(
        signature: Signature,
        kind: SyntaxKind,
        enclosingDeclaration: Node | undefined,
        flags: NodeBuilderFlags | undefined
    ):
        | (SignatureDeclaration & { typeArguments?: NodeArray<TypeNode> })
        | undefined;
    /** @internal */ signatureToSignatureDeclaration(
        signature: Signature,
        kind: SyntaxKind,
        enclosingDeclaration: Node | undefined,
        flags: NodeBuilderFlags | undefined,
        tracker?: SymbolTracker
    ):
        | (SignatureDeclaration & { typeArguments?: NodeArray<TypeNode> })
        | undefined; // eslint-disable-line @typescript-eslint/unified-signatures
    /** Note that the resulting nodes cannot be checked. */
    indexInfoToIndexSignatureDeclaration(
        indexInfo: IndexInfo,
        enclosingDeclaration: Node | undefined,
        flags: NodeBuilderFlags | undefined
    ): IndexSignatureDeclaration | undefined;
    /** @internal */ indexInfoToIndexSignatureDeclaration(
        indexInfo: IndexInfo,
        enclosingDeclaration: Node | undefined,
        flags: NodeBuilderFlags | undefined,
        tracker?: SymbolTracker
    ): IndexSignatureDeclaration | undefined; // eslint-disable-line @typescript-eslint/unified-signatures
    /** Note that the resulting nodes cannot be checked. */
    symbolToEntityName(
        symbol: Symbol,
        meaning: SymbolFlags,
        enclosingDeclaration: Node | undefined,
        flags: NodeBuilderFlags | undefined
    ): EntityName | undefined;
    /** Note that the resulting nodes cannot be checked. */
    symbolToExpression(
        symbol: Symbol,
        meaning: SymbolFlags,
        enclosingDeclaration: Node | undefined,
        flags: NodeBuilderFlags | undefined
    ): Expression | undefined;
    /**
     * Note that the resulting nodes cannot be checked.
     *
     * @internal
     */
    symbolToNode(
        symbol: Symbol,
        meaning: SymbolFlags,
        enclosingDeclaration: Node | undefined,
        flags: NodeBuilderFlags | undefined
    ): Node | undefined;
    /** Note that the resulting nodes cannot be checked. */
    symbolToTypeParameterDeclarations(
        symbol: Symbol,
        enclosingDeclaration: Node | undefined,
        flags: NodeBuilderFlags | undefined
    ): NodeArray<TypeParameterDeclaration> | undefined;
    /** Note that the resulting nodes cannot be checked. */
    symbolToParameterDeclaration(
        symbol: Symbol,
        enclosingDeclaration: Node | undefined,
        flags: NodeBuilderFlags | undefined
    ): ParameterDeclaration | undefined;
    /** Note that the resulting nodes cannot be checked. */
    typeParameterToDeclaration(
        parameter: TypeParameter,
        enclosingDeclaration: Node | undefined,
        flags: NodeBuilderFlags | undefined
    ): TypeParameterDeclaration | undefined;

    getSymbolsInScope(location: Node, meaning: SymbolFlags): Symbol[];
    getSymbolAtLocation(node: Node): Symbol | undefined;
    /** @internal */ getIndexInfosAtLocation(
        node: Node
    ): readonly IndexInfo[] | undefined;
    getSymbolsOfParameterPropertyDeclaration(
        parameter: ParameterDeclaration,
        parameterName: string
    ): Symbol[];
    /**
     * The function returns the value (local variable) symbol of an identifier in the short-hand property assignment.
     * This is necessary as an identifier in short-hand property assignment can contains two meaning: property name and property value.
     */
    getShorthandAssignmentValueSymbol(
        location: Node | undefined
    ): Symbol | undefined;

    /**
     * If a symbol is a local symbol with an associated exported symbol, returns the exported symbol.
     * Otherwise returns its input.
     * For example, at `export type T = number;`:
     *     - `getSymbolAtLocation` at the location `T` will return the exported symbol for `T`.
     *     - But the result of `getSymbolsInScope` will contain the *local* symbol for `T`, not the exported symbol.
     *     - Calling `getExportSymbolOfSymbol` on that local symbol will return the exported symbol.
     */
    getExportSymbolOfSymbol(symbol: Symbol): Symbol;
    getPropertySymbolOfDestructuringAssignment(
        location: Identifier
    ): Symbol | undefined;
    getTypeOfAssignmentPattern(pattern: AssignmentPattern): Type;
    getTypeAtLocation(node: Node): Type;
    getTypeFromTypeNode(node: TypeNode): Type;

    signatureToString(
        signature: Signature,
        enclosingDeclaration?: Node,
        flags?: TypeFormatFlags,
        kind?: SignatureKind
    ): string;
    typeToString(
        type: Type,
        enclosingDeclaration?: Node,
        flags?: TypeFormatFlags
    ): string;
    symbolToString(
        symbol: Symbol,
        enclosingDeclaration?: Node,
        meaning?: SymbolFlags,
        flags?: SymbolFormatFlags
    ): string;
    typePredicateToString(
        predicate: TypePredicate,
        enclosingDeclaration?: Node,
        flags?: TypeFormatFlags
    ): string;

    /** @internal */ writeSignature(
        signature: Signature,
        enclosingDeclaration?: Node,
        flags?: TypeFormatFlags,
        kind?: SignatureKind,
        writer?: EmitTextWriter
    ): string;
    /** @internal */ writeType(
        type: Type,
        enclosingDeclaration?: Node,
        flags?: TypeFormatFlags,
        writer?: EmitTextWriter
    ): string;
    /** @internal */ writeSymbol(
        symbol: Symbol,
        enclosingDeclaration?: Node,
        meaning?: SymbolFlags,
        flags?: SymbolFormatFlags,
        writer?: EmitTextWriter
    ): string;
    /** @internal */ writeTypePredicate(
        predicate: TypePredicate,
        enclosingDeclaration?: Node,
        flags?: TypeFormatFlags,
        writer?: EmitTextWriter
    ): string;

    getFullyQualifiedName(symbol: Symbol): string;
    getAugmentedPropertiesOfType(type: Type): Symbol[];

    getRootSymbols(symbol: Symbol): readonly Symbol[];
    getSymbolOfExpando(
        node: Node,
        allowDeclaration: boolean
    ): Symbol | undefined;
    getContextualType(node: Expression): Type | undefined;
    /** @internal */ getContextualType(
        node: Expression,
        contextFlags?: ContextFlags
    ): Type | undefined; // eslint-disable-line @typescript-eslint/unified-signatures
    /** @internal */ getContextualTypeForObjectLiteralElement(
        element: ObjectLiteralElementLike
    ): Type | undefined;
    /** @internal */ getContextualTypeForArgumentAtIndex(
        call: CallLikeExpression,
        argIndex: number
    ): Type | undefined;
    /** @internal */ isContextSensitive(
        node: Expression | MethodDeclaration | ObjectLiteralElementLike
    ): boolean;
    /** @internal */ getTypeOfPropertyOfContextualType(
        type: Type,
        name: string
    ): Type | undefined;

    /**
     * returns unknownSignature in the case of an error.
     * returns undefined if the node is not valid.
     * @param argumentCount Apparent number of arguments, passed in case of a possibly incomplete call. This should come from an ArgumentListInfo. See `signatureHelp.ts`.
     */
    getResolvedSignature(
        node: CallLikeExpression,
        candidatesOutArray?: Signature[],
        argumentCount?: number
    ): Signature | undefined;
    /** @internal */ getResolvedSignatureForSignatureHelp(
        node: CallLikeExpression,
        candidatesOutArray?: Signature[],
        argumentCount?: number
    ): Signature | undefined;
    /** @internal */ getCandidateSignaturesForStringLiteralCompletions(
        call: CallLikeExpression,
        editingArgument: Node
    ): Signature[];
    /** @internal */ getExpandedParameters(
        sig: Signature
    ): readonly (readonly Symbol[])[];
    /** @internal */ hasEffectiveRestParameter(sig: Signature): boolean;
    /** @internal */ containsArgumentsReference(
        declaration: SignatureDeclaration
    ): boolean;

    getSignatureFromDeclaration(
        declaration: SignatureDeclaration
    ): Signature | undefined;
    isImplementationOfOverload(node: SignatureDeclaration): boolean | undefined;
    isUndefinedSymbol(symbol: Symbol): boolean;
    isArgumentsSymbol(symbol: Symbol): boolean;
    isUnknownSymbol(symbol: Symbol): boolean;
    getMergedSymbol(symbol: Symbol): Symbol;
    /** @internal */ symbolIsValue(
        symbol: Symbol,
        includeTypeOnlyMembers?: boolean
    ): boolean;

    getConstantValue(
        node: PropertyAccessExpression | ElementAccessExpression
    ): string | number | undefined;
    isValidPropertyAccess(
        node: PropertyAccessExpression | QualifiedName | ImportTypeNode,
        propertyName: string
    ): boolean;
    /**
     * Exclude accesses to private properties.
     *
     * @internal
     */
    isValidPropertyAccessForCompletions(
        node: PropertyAccessExpression | ImportTypeNode | QualifiedName,
        type: Type,
        property: Symbol
    ): boolean;
    /** Follow all aliases to get the original symbol. */
    getAliasedSymbol(symbol: Symbol): Symbol;
    /** Follow a *single* alias to get the immediately aliased symbol. */
    getImmediateAliasedSymbol(symbol: Symbol): Symbol | undefined;
    getExportsOfModule(moduleSymbol: Symbol): Symbol[];
    /**
     * Unlike `getExportsOfModule`, this includes properties of an `export =` value.
     *
     * @internal
     */
    getExportsAndPropertiesOfModule(moduleSymbol: Symbol): Symbol[];
    /** @internal */ forEachExportAndPropertyOfModule(
        moduleSymbol: Symbol,
        cb: (symbol: Symbol, key: string) => void
    ): void;
    getJsxIntrinsicTagNamesAt(location: Node): Symbol[];
    isOptionalParameter(node: ParameterDeclaration): boolean;
    getAmbientModules(): Symbol[];

    tryGetMemberInModuleExports(
        memberName: string,
        moduleSymbol: Symbol
    ): Symbol | undefined;
    /**
     * Unlike `tryGetMemberInModuleExports`, this includes properties of an `export =` value.
     * Does *not* return properties of primitive types.
     *
     * @internal
     */
    tryGetMemberInModuleExportsAndProperties(
        memberName: string,
        moduleSymbol: Symbol
    ): Symbol | undefined;
    getApparentType(type: Type): Type;
    /** @internal */ getSuggestedSymbolForNonexistentProperty(
        name: MemberName | string,
        containingType: Type
    ): Symbol | undefined;
    /** @internal */ getSuggestedSymbolForNonexistentJSXAttribute(
        name: Identifier | string,
        containingType: Type
    ): Symbol | undefined;
    /** @internal */ getSuggestedSymbolForNonexistentSymbol(
        location: Node,
        name: string,
        meaning: SymbolFlags
    ): Symbol | undefined;
    /** @internal */ getSuggestedSymbolForNonexistentModule(
        node: Identifier,
        target: Symbol
    ): Symbol | undefined;
    /** @internal */ getSuggestedSymbolForNonexistentClassMember(
        name: string,
        baseType: Type
    ): Symbol | undefined;
    getBaseConstraintOfType(type: Type): Type | undefined;
    getDefaultFromTypeParameter(type: Type): Type | undefined;

    /**
     * Gets the intrinsic `any` type. There are multiple types that act as `any` used internally in the compiler,
     * so the type returned by this function should not be used in equality checks to determine if another type
     * is `any`. Instead, use `type.flags & TypeFlags.Any`.
     */
    getAnyType(): Type;
    getStringType(): Type;
    getStringLiteralType(value: string): StringLiteralType;
    getNumberType(): Type;
    getNumberLiteralType(value: number): NumberLiteralType;
    getBigIntType(): Type;
    getBooleanType(): Type;
    /* eslint-disable @typescript-eslint/unified-signatures */
    /** @internal */
    getFalseType(fresh?: boolean): Type;
    getFalseType(): Type;
    /** @internal */
    getTrueType(fresh?: boolean): Type;
    getTrueType(): Type;
    /* eslint-enable @typescript-eslint/unified-signatures */
    getVoidType(): Type;
    /**
     * Gets the intrinsic `undefined` type. There are multiple types that act as `undefined` used internally in the compiler
     * depending on compiler options, so the type returned by this function should not be used in equality checks to determine
     * if another type is `undefined`. Instead, use `type.flags & TypeFlags.Undefined`.
     */
    getUndefinedType(): Type;
    /**
     * Gets the intrinsic `null` type. There are multiple types that act as `null` used internally in the compiler,
     * so the type returned by this function should not be used in equality checks to determine if another type
     * is `null`. Instead, use `type.flags & TypeFlags.Null`.
     */
    getNullType(): Type;
    getESSymbolType(): Type;
    /**
     * Gets the intrinsic `never` type. There are multiple types that act as `never` used internally in the compiler,
     * so the type returned by this function should not be used in equality checks to determine if another type
     * is `never`. Instead, use `type.flags & TypeFlags.Never`.
     */
    getNeverType(): Type;
    /** @internal */ getOptionalType(): Type;
    /** @internal */ getUnionType(
        types: Type[],
        subtypeReduction?: UnionReduction
    ): Type;
    /** @internal */ createArrayType(elementType: Type): Type;
    /** @internal */ getElementTypeOfArrayType(
        arrayType: Type
    ): Type | undefined;
    /** @internal */ createPromiseType(type: Type): Type;
    /** @internal */ getPromiseType(): Type;
    /** @internal */ getPromiseLikeType(): Type;
    /** @internal */ getAsyncIterableType(): Type | undefined;

    /**
     * Returns true if the "source" type is assignable to the "target" type.
     *
     * ```ts
     * declare const abcLiteral: ts.Type; // Type of "abc"
     * declare const stringType: ts.Type; // Type of string
     *
     * isTypeAssignableTo(abcLiteral, abcLiteral); // true; "abc" is assignable to "abc"
     * isTypeAssignableTo(abcLiteral, stringType); // true; "abc" is assignable to string
     * isTypeAssignableTo(stringType, abcLiteral); // false; string is not assignable to "abc"
     * isTypeAssignableTo(stringType, stringType); // true; string is assignable to string
     * ```
     */
    isTypeAssignableTo(source: Type, target: Type): boolean;
    /** @internal */ createAnonymousType(
        symbol: Symbol | undefined,
        members: SymbolTable,
        callSignatures: Signature[],
        constructSignatures: Signature[],
        indexInfos: IndexInfo[]
    ): Type;
    /** @internal */ createSignature(
        declaration: SignatureDeclaration | undefined,
        typeParameters: readonly TypeParameter[] | undefined,
        thisParameter: Symbol | undefined,
        parameters: readonly Symbol[],
        resolvedReturnType: Type,
        typePredicate: TypePredicate | undefined,
        minArgumentCount: number,
        flags: SignatureFlags
    ): Signature;
    /** @internal */ createSymbol(
        flags: SymbolFlags,
        name: string
    ): TransientSymbol;
    /** @internal */ createIndexInfo(
        keyType: Type,
        type: Type,
        isReadonly: boolean,
        declaration?: SignatureDeclaration
    ): IndexInfo;
    /** @internal */ isSymbolAccessible(
        symbol: Symbol,
        enclosingDeclaration: Node | undefined,
        meaning: SymbolFlags,
        shouldComputeAliasToMarkVisible: boolean
    ): SymbolAccessibilityResult;
    /** @internal */ tryFindAmbientModule(
        moduleName: string
    ): Symbol | undefined;
    /** @internal */ tryFindAmbientModuleWithoutAugmentations(
        moduleName: string
    ): Symbol | undefined;

    /** @internal */ getSymbolWalker(
        accept?: (symbol: Symbol) => boolean
    ): SymbolWalker;

    // Should not be called directly.  Should only be accessed through the Program instance.
    /** @internal */ getDiagnostics(
        sourceFile?: SourceFile,
        cancellationToken?: CancellationToken
    ): Diagnostic[];
    /** @internal */ getGlobalDiagnostics(): Diagnostic[];
    /** @internal */ getEmitResolver(
        sourceFile?: SourceFile,
        cancellationToken?: CancellationToken
    ): EmitResolver;

    /** @internal */ getNodeCount(): number;
    /** @internal */ getIdentifierCount(): number;
    /** @internal */ getSymbolCount(): number;
    /** @internal */ getTypeCount(): number;
    /** @internal */ getInstantiationCount(): number;
    /** @internal */ getRelationCacheSizes(): {
        assignable: number;
        identity: number;
        subtype: number;
        strictSubtype: number;
    };
    /** @internal */ getRecursionIdentity(type: Type): object | undefined;
    /** @internal */ getUnmatchedProperties(
        source: Type,
        target: Type,
        requireOptionalProperties: boolean,
        matchDiscriminantProperties: boolean
    ): IterableIterator<Symbol>;

    /**
     * True if this type is the `Array` or `ReadonlyArray` type from lib.d.ts.
     * This function will _not_ return true if passed a type which
     * extends `Array` (for example, the TypeScript AST's `NodeArray` type).
     */
    isArrayType(type: Type): boolean;
    /**
     * True if this type is a tuple type. This function will _not_ return true if
     * passed a type which extends from a tuple.
     */
    isTupleType(type: Type): boolean;
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
    isTypeInvalidDueToUnionDiscriminant(
        contextualType: Type,
        obj: ObjectLiteralExpression
    ): boolean;
    /** @internal */ getExactOptionalProperties(type: Type): Symbol[];
    /**
     * For a union, will include a property if it's defined in *any* of the member types.
     * So for `{ a } | { b }`, this will include both `a` and `b`.
     * Does not include properties of primitive types.
     *
     * @internal
     */
    getAllPossiblePropertiesOfTypes(type: readonly Type[]): Symbol[];
    resolveName(
        name: string,
        location: Node | undefined,
        meaning: SymbolFlags,
        excludeGlobals: boolean
    ): Symbol | undefined;
    /** @internal */ getJsxNamespace(location?: Node): string;
    /** @internal */ getJsxFragmentFactory(location: Node): string | undefined;

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
    getAccessibleSymbolChain(
        symbol: Symbol,
        enclosingDeclaration: Node | undefined,
        meaning: SymbolFlags,
        useOnlyExternalAliasing: boolean
    ): Symbol[] | undefined;
    getTypePredicateOfSignature(
        signature: Signature
    ): TypePredicate | undefined;
    /** @internal */ resolveExternalModuleName(
        moduleSpecifier: Expression
    ): Symbol | undefined;
    /**
     * An external module with an 'export =' declaration resolves to the target of the 'export =' declaration,
     * and an external module with no 'export =' declaration resolves to the module itself.
     *
     * @internal
     */
    resolveExternalModuleSymbol(symbol: Symbol): Symbol;

    /** @internal */ getTypeArgumentConstraint(
        node: TypeNode
    ): Type | undefined;

    /**
     * Does *not* get *all* suggestion diagnostics, just the ones that were convenient to report in the checker.
     * Others are added in computeSuggestionDiagnostics.
     *
     * @internal
     */
    getSuggestionDiagnostics(
        file: SourceFile,
        cancellationToken?: CancellationToken
    ): readonly DiagnosticWithLocation[];

    /**
     * Depending on the operation performed, it may be appropriate to throw away the checker
     * if the cancellation token is triggered. Typically, if it is used for error checking
     * and the operation is cancelled, then it should be discarded, otherwise it is safe to keep.
     */
    runWithCancellationToken<T>(
        token: CancellationToken,
        cb: (checker: TypeChecker) => T
    ): T;

    /** @internal */ getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(
        symbol: Symbol
    ): readonly TypeParameter[] | undefined;
    /** @internal */ isDeclarationVisible(
        node: Declaration | AnyImportSyntax
    ): boolean;
    /** @internal */ isPropertyAccessible(
        node: Node,
        isSuper: boolean,
        isWrite: boolean,
        containingType: Type,
        property: Symbol
    ): boolean;
    /** @internal */ getTypeOnlyAliasDeclaration(
        symbol: Symbol
    ): TypeOnlyAliasDeclaration | undefined;
    /** @internal */ getMemberOverrideModifierStatus(
        node: ClassLikeDeclaration,
        member: ClassElement,
        memberSymbol: Symbol
    ): MemberOverrideStatus;
    /** @internal */ isTypeParameterPossiblyReferenced(
        tp: TypeParameter,
        node: Node
    ): boolean;
    /** @internal */ typeHasCallOrConstructSignatures(type: Type): boolean;
    /** @internal */ getSymbolFlags(symbol: Symbol): SymbolFlags;
}

export interface NamedImports extends Node {
    readonly kind: SyntaxKind.NamedImports;
    readonly parent: ImportClause;
    readonly elements: NodeArray<ImportSpecifier>;
}

/** @internal */
export const enum MemberOverrideStatus {
    Ok,
    NeedsOverride,
    HasInvalidOverride,
}

export interface ImportSpecifier extends NamedDeclaration {
    readonly kind: SyntaxKind.ImportSpecifier;
    readonly parent: NamedImports;
    readonly propertyName?: Identifier; // Name preceding "as" keyword (or undefined when "as" is absent)
    readonly name: Identifier; // Declared name
    readonly isTypeOnly: boolean;
}

export type TypeOnlyImportDeclaration =
    | (ImportClause & { readonly isTypeOnly: true; readonly name: Identifier })
    | (ImportSpecifier &
          (
              | { readonly isTypeOnly: true }
              | {
                    readonly parent: NamedImports & {
                        readonly parent: ImportClause & {
                            readonly isTypeOnly: true;
                        };
                    };
                }
          ));

export type TypeOnlyAliasDeclaration = TypeOnlyImportDeclaration;

/** @internal */
export type AnyImportSyntax = ImportDeclaration;

export type ResolutionMode = undefined; //ModuleKind.ESNext | ModuleKind.CommonJS | undefined;

export interface IndexedAccessTypeNode extends TypeNode {
    readonly kind: SyntaxKind.IndexedAccessType;
    readonly objectType: TypeNode;
    readonly indexType: TypeNode;
}

export interface LiteralTypeNode extends TypeNode {
    readonly kind: SyntaxKind.LiteralType;
    readonly literal: LiteralExpression | PrefixUnaryExpression; //NullLiteral | BooleanLiteral;
}

/**
 * A list of comma-separated expressions. This node is only created by transformations.
 */
export interface CommaListExpression extends Expression {
    readonly kind: SyntaxKind.CommaListExpression;
    readonly elements: NodeArray<Expression>;
}

/** @internal */
export interface NodeLinks {
    flags: NodeCheckFlags; // Set of flags specific to Node
    resolvedType?: Type; // Cached type of type node
    resolvedSignature?: Signature; // Cached signature of signature node or call expression
    resolvedSymbol?: Symbol; // Cached name resolution result
    resolvedIndexInfo?: IndexInfo; // Cached indexing info resolution result
    effectsSignature?: Signature; // Signature with possible control flow effects
    isVisible?: boolean; // Is this node visible
    containsArgumentsReference?: boolean; // Whether a function-like declaration contains an 'arguments' reference
    hasReportedStatementInAmbientContext?: boolean; // Cache boolean if we report statements in ambient context
    resolvedJsxElementAttributesType?: Type; // resolved element attributes type of a JSX openinglike element
    resolvedJsxElementAllAttributesType?: Type; // resolved all element attributes type of a JSX openinglike element
    resolvedJSDocType?: Type; // Resolved type of a JSDoc type reference
    switchTypes?: Type[]; // Cached array of switch case expression types
    jsxNamespace?: Symbol | false; // Resolved jsx namespace symbol for this node
    jsxImplicitImportContainer?: Symbol | false; // Resolved module symbol the implicit jsx import of this file should refer to
    contextFreeType?: Type; // Cached context-free type used by the first pass of inference; used when a function's return is partially contextually sensitive
    deferredNodes?: Set<Node>; // Set of nodes whose checking has been deferred
    capturedBlockScopeBindings?: Symbol[]; // Block-scoped bindings captured beneath this part of an IterationStatement
    outerTypeParameters?: TypeParameter[]; // Outer type parameters of anonymous object type
    isExhaustive?: boolean | 0; // Is node an exhaustive switch statement (0 indicates in-process resolution)
    skipDirectInference?: true; // Flag set by the API `getContextualType` call on a node when `Completions` is passed to force the checker to skip making inferences to a node's type
    declarationRequiresScopeChange?: boolean; // Set by `useOuterVariableScopeInParameter` in checker when downlevel emit would change the name resolution scope inside of a parameter.
    serializedTypes?: Map<string, SerializedTypeEntry>; // Collection of types serialized at this location
    decoratorSignature?: Signature; // Signature for decorator as if invoked by the runtime.
    spreadIndices?: { first: number | undefined; last: number | undefined }; // Indices of first and last spread elements in array literal
    parameterInitializerContainsUndefined?: boolean; // True if this is a parameter declaration whose type annotation contains "undefined".
    fakeScopeForSignatureDeclaration?: "params" | "typeParams"; // If present, this is a fake scope injected into an enclosing declaration chain.
    assertionExpressionType?: Type; // Cached type of the expression of a type assertion
}

/** @internal */
export type TrackedSymbol = [
    symbol: Symbol,
    enclosingDeclaration: Node | undefined,
    meaning: SymbolFlags
];
/** @internal */
export interface SerializedTypeEntry {
    node: TypeNode;
    truncating?: boolean;
    addedLength: number;
    trackedSymbols: readonly TrackedSymbol[] | undefined;
}

export type FlowType = Type | IncompleteType;

// Incomplete types occur during control flow analysis of loops. An IncompleteType
// is distinguished from a regular type by a flags value of zero. Incomplete type
// objects are internal to the getFlowTypeOfReference function and never escape it.
export interface IncompleteType {
    flags: TypeFlags | 0; // No flags set
    type: Type; // The type marked incomplete
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

export type StructuredType = ObjectType | UnionType;

/** @internal */
// Resolved object, union, or intersection type
export interface ResolvedType extends ObjectType, UnionOrIntersectionType {
    members: SymbolTable; // Properties by name
    properties: Symbol[]; // Properties
    callSignatures: readonly Signature[]; // Call signatures of type
    constructSignatures: readonly Signature[]; // Construct signatures of type
    indexInfos: readonly IndexInfo[]; // Index signatures
}

/** @internal */
export interface ReverseMappedType extends ObjectType {
    source: Type;
    mappedType: MappedType;
    constraintType: IndexType;
}

/** @internal */
// An instantiated anonymous type has a target and a mapper
export interface AnonymousType extends ObjectType {
    target?: AnonymousType; // Instantiation target
    mapper?: TypeMapper; // Instantiation mapper
    instantiations?: Map<string, Type>; // Instantiations of generic type alias (undefined if non-generic)
}

export interface TypeOperatorNode extends TypeNode {
    readonly kind: SyntaxKind.TypeOperator;
    readonly operator:
        | SyntaxKind.KeyOfKeyword
        | SyntaxKind.UniqueKeyword
        | SyntaxKind.ReadonlyKeyword;
    readonly type: TypeNode;
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

export interface MappedTypeNode extends TypeNode, Declaration, LocalsContainer {
    readonly kind: SyntaxKind.MappedType;
    readonly readonlyToken?: PlusToken | MinusToken;
    readonly typeParameter: TypeParameterDeclaration;
    readonly nameType?: TypeNode;
    readonly questionToken?: QuestionToken | PlusToken | MinusToken;
    readonly type?: TypeNode;
    /** Used only to produce grammar errors */
    readonly members?: NodeArray<TypeElement>;
}

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

/** @internal */
export interface SyntacticTypeNodeBuilderResolver {
    isUndefinedIdentifierExpression(name: Identifier): boolean;
    isNonNarrowedBindableName(name: ComputedPropertyName): boolean;
    isExpandoFunctionDeclaration(
        name: FunctionDeclaration | VariableDeclaration
    ): boolean;
    isEntityNameVisible(
        entityName: EntityNameOrEntityNameExpression,
        enclosingDeclaration: Node,
        shouldComputeAliasToMakeVisible?: boolean
    ): SymbolVisibilityResult;
    requiresAddingImplicitUndefined(
        parameter: ParameterDeclaration | JSDocParameterTag
    ): boolean;
}

/** @internal */
export interface SyntacticTypeNodeBuilderContext {
    tracker: Required<Pick<SymbolTracker, "reportInferenceFallback">>;
    enclosingDeclaration: Node | undefined;
}

export type HasType =
    | SignatureDeclaration
    | VariableDeclaration
    | ParameterDeclaration
    | PropertySignature
    | PropertyDeclaration
    // | TypePredicateNode
    // | ParenthesizedTypeNode
    // | TypeOperatorNode
    | MappedTypeNode
    // | AssertionExpression
    // | TypeAliasDeclaration
    | JSDocTypeExpression;
// | JSDocNonNullableType
// | JSDocNullableType
// | JSDocOptionalType
// | JSDocVariadicType;

/** @internal */
export type PrimitiveLiteral =
    | NumericLiteral
    | StringLiteral
    | (PrefixUnaryExpression & {
          operator: SyntaxKind.PlusToken;
          operand: NumericLiteral;
      })
    | (PrefixUnaryExpression & {
          operator: SyntaxKind.MinusToken;
          operand: NumericLiteral;
      });

export interface ParenthesizedTypeNode extends TypeNode {
    readonly kind: SyntaxKind.ParenthesizedType;
    readonly type: TypeNode;
}

/**
 * Used by the checker, this enum keeps track of external emit helpers that should be type
 * checked.
 *
 * @internal
 * TODO: do we need this?
 */
export const enum ExternalEmitHelpers {
    Extends = 1 << 0, // __extends (used by the ES2015 class transformation)
    Assign = 1 << 1, // __assign (used by Jsx and ESNext object spread transformations)
    Rest = 1 << 2, // __rest (used by ESNext object rest transformation)
    Decorate = 1 << 3, // __decorate (used by TypeScript decorators transformation)
    ESDecorateAndRunInitializers = Decorate, // __esDecorate and __runInitializers (used by ECMAScript decorators transformation)
    Metadata = 1 << 4, // __metadata (used by TypeScript decorators transformation)
    Param = 1 << 5, // __param (used by TypeScript decorators transformation)
    Awaiter = 1 << 6, // __awaiter (used by ES2017 async functions transformation)
    Generator = 1 << 7, // __generator (used by ES2015 generator transformation)
    Values = 1 << 8, // __values (used by ES2015 for..of and yield* transformations)
    Read = 1 << 9, // __read (used by ES2015 iterator destructuring transformation)
    SpreadArray = 1 << 10, // __spreadArray (used by ES2015 array spread and argument list spread transformations)
    Await = 1 << 11, // __await (used by ES2017 async generator transformation)
    AsyncGenerator = 1 << 12, // __asyncGenerator (used by ES2017 async generator transformation)
    AsyncDelegator = 1 << 13, // __asyncDelegator (used by ES2017 async generator yield* transformation)
    AsyncValues = 1 << 14, // __asyncValues (used by ES2017 for..await..of transformation)
    ExportStar = 1 << 15, // __exportStar (used by CommonJS/AMD/UMD module transformation)
    ImportStar = 1 << 16, // __importStar (used by CommonJS/AMD/UMD module transformation)
    ImportDefault = 1 << 17, // __importStar (used by CommonJS/AMD/UMD module transformation)
    MakeTemplateObject = 1 << 18, // __makeTemplateObject (used for constructing template string array objects)
    ClassPrivateFieldGet = 1 << 19, // __classPrivateFieldGet (used by the class private field transformation)
    ClassPrivateFieldSet = 1 << 20, // __classPrivateFieldSet (used by the class private field transformation)
    ClassPrivateFieldIn = 1 << 21, // __classPrivateFieldIn (used by the class private field transformation)
    SetFunctionName = 1 << 22, // __setFunctionName (used by class fields and ECMAScript decorators)
    PropKey = 1 << 23, // __propKey (used by class fields and ECMAScript decorators)
    AddDisposableResourceAndDisposeResources = 1 << 24, // __addDisposableResource and __disposeResources (used by ESNext transformations)

    FirstEmitHelper = Extends,
    LastEmitHelper = AddDisposableResourceAndDisposeResources,

    // Helpers included by ES2015 for..of
    ForOfIncludes = Values,

    // Helpers included by ES2017 for..await..of
    ForAwaitOfIncludes = AsyncValues,

    // Helpers included by ES2017 async generators
    AsyncGeneratorIncludes = Await | AsyncGenerator,

    // Helpers included by yield* in ES2017 async generators
    AsyncDelegatorIncludes = Await | AsyncDelegator | AsyncValues,

    // Helpers included by ES2015 spread
    SpreadIncludes = Read | SpreadArray,
}

export type HasInitializer =
    | HasExpressionInitializer
    | ForStatement
    | ForInStatement;

export type HasExpressionInitializer =
    | VariableDeclaration
    | ParameterDeclaration
    | BindingElement
    | PropertyDeclaration
    | PropertyAssignment;

/** @internal */
export interface EvaluatorResult<
    T extends string | number | undefined = string | number | undefined
> {
    value: T;
    isSyntacticallyString: boolean;
    resolvedOtherFiles: boolean;
    hasExternalReferences: boolean;
}

/** @internal */
export interface EvaluationResolver {
    evaluateEntityNameExpression(
        expr: EntityNameExpression,
        location: Declaration | undefined
    ): EvaluatorResult;
    evaluateElementAccessExpression(
        expr: ElementAccessExpression,
        location: Declaration | undefined
    ): EvaluatorResult;
}

export interface EvolvingArrayType extends ObjectType {
    elementType: Type; // Element expressions of evolving array type
    finalArrayType?: Type; // Final array type of evolving array type
}

/** @internal */
export interface IterationTypes {
    readonly yieldType: Type;
    readonly returnType: Type;
    readonly nextType: Type;
}

/**
 * Used to track a `declare module "foo*"`-like declaration.
 *
 * @internal
 */
export interface PatternAmbientModule {
    pattern: Pattern;
    symbol: Symbol;
}

/**
 * Represents a "prefix*suffix" pattern.
 *
 * @internal
 */
export interface Pattern {
    prefix: string;
    suffix: string;
}

export const enum InferencePriority {
    None = 0,
    NakedTypeVariable = 1 << 0, // Naked type variable in union or intersection type
    SpeculativeTuple = 1 << 1, // Speculative tuple inference
    SubstituteSource = 1 << 2, // Source of inference originated within a substitution type's substitute
    HomomorphicMappedType = 1 << 3, // Reverse inference for homomorphic mapped type
    PartialHomomorphicMappedType = 1 << 4, // Partial reverse inference for homomorphic mapped type
    MappedTypeConstraint = 1 << 5, // Reverse inference for mapped type
    ContravariantConditional = 1 << 6, // Conditional type in contravariant position
    ReturnType = 1 << 7, // Inference made from return type of generic function
    LiteralKeyof = 1 << 8, // Inference made from a string literal to a keyof T
    NoConstraints = 1 << 9, // Don't infer from constraints of instantiable types
    AlwaysStrict = 1 << 10, // Always use strict rules for contravariant inferences
    MaxValue = 1 << 11, // Seed for inference priority tracking

    PriorityImpliesCombination = ReturnType |
        MappedTypeConstraint |
        LiteralKeyof, // These priorities imply that the resulting type should be a combination of all candidates
    Circularity = -1, // Inference circularity (value less than all other priorities)
}

/** @internal */
export interface InferenceInfo {
    typeParameter: TypeParameter; // Type parameter for which inferences are being made
    candidates: Type[] | undefined; // Candidates in covariant positions (or undefined)
    contraCandidates: Type[] | undefined; // Candidates in contravariant positions (or undefined)
    inferredType?: Type; // Cache for resolved inferred type
    priority?: InferencePriority; // Priority of current inference set
    topLevel: boolean; // True if all inferences are to top level occurrences
    isFixed: boolean; // True if inferences are fixed
    impliedArity?: number;
}

/** @internal */
export const enum InferenceFlags {
    None = 0, // No special inference behaviors
    NoDefault = 1 << 0, // Infer silentNeverType for no inferences (otherwise anyType or unknownType)
    AnyDefault = 1 << 1, // Infer anyType (in JS files) for no inferences (otherwise unknownType)
    SkippedGenericFunction = 1 << 2, // A generic function was skipped during inference
}

/** @internal */
export interface IntraExpressionInferenceSite {
    node: Expression | MethodDeclaration;
    type: Type;
}

/** @internal */
export interface InferenceContext {
    inferences: InferenceInfo[]; // Inferences made for each type parameter
    signature?: Signature; // Generic signature for which inferences are made (if any)
    flags: InferenceFlags; // Inference flags
    compareTypes: TypeComparer; // Type comparer function
    mapper: TypeMapper; // Mapper that fixes inferences
    nonFixingMapper: TypeMapper; // Mapper that doesn't fix inferences
    returnMapper?: TypeMapper; // Type mapper for inferences from return types (if any)
    inferredTypeParameters?: readonly TypeParameter[]; // Inferred type parameters for function result
    intraExpressionInferenceSites?: IntraExpressionInferenceSite[];
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

/** @internal */
export type TypeComparer = (
    s: Type,
    t: Type,
    reportErrors?: boolean
) => Ternary;

/** @internal */
export const enum RelationComparisonResult {
    None = 0,
    Succeeded = 1 << 0, // Should be truthy
    Failed = 1 << 1,
    Reported = 1 << 2,

    ReportsUnmeasurable = 1 << 3,
    ReportsUnreliable = 1 << 4,
    ReportsMask = ReportsUnmeasurable | ReportsUnreliable,
}

export type VisitResult<T extends Node | undefined> = T | readonly Node[];

/**
 * A function that accepts and possibly transforms a node.
 */
export type Visitor<
    TIn extends Node = Node,
    TOut extends Node | undefined = TIn | undefined
> = (node: TIn) => VisitResult<TOut>;

// TODO: add this?
export type TransformationContext = any;

/** @internal */
export const enum LexicalEnvironmentFlags {
    None = 0,
    InParameters = 1 << 0, // currently visiting a parameter list
    VariablesHoistedInParameters = 1 << 1, // a temp variable was hoisted while visiting a parameter list
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
    <
        TIn extends Node,
        TInArray extends NodeArray<TIn> | undefined,
        TOut extends Node
    >(
        nodes: TInArray,
        visitor: Visitor<TIn, Node | undefined>,
        test: (node: Node) => node is TOut,
        start?: number,
        count?: number
    ): NodeArray<TOut> | (TInArray & undefined);
    <TIn extends Node, TInArray extends NodeArray<TIn> | undefined>(
        nodes: TInArray,
        visitor: Visitor<TIn, Node | undefined>,
        test?: (node: Node) => boolean,
        start?: number,
        count?: number
    ): NodeArray<Node> | (TInArray & undefined);
}

/** @internal */
export interface JSDocArray extends Array<JSDoc> {
    jsDocCache?: readonly JSDocTag[]; // Cache for getJSDocTags
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
     * Get a list of file names that were passed to 'createProgram' or referenced in a
     * program source file but could not be located.
     *
     * @internal
     */
    getMissingFilePaths(): Map<Path, string>;
    /** @internal */
    //getModuleResolutionCache(): ModuleResolutionCache | undefined;
    /** @internal */
    getFilesByNameMap(): Map<Path, SourceFile | false | undefined>;

    /** @internal */
    resolvedModules:
        | Map<Path, ModeAwareCache<ResolvedModuleWithFailedLookupLocations>>
        | undefined;
    /** @internal */
    resolvedTypeReferenceDirectiveNames:
        | Map<
              Path,
              ModeAwareCache<ResolvedTypeReferenceDirectiveWithFailedLookupLocations>
          >
        | undefined;
    /** @internal */
    getResolvedModule(
        f: SourceFile,
        moduleName: string,
        mode: ResolutionMode
    ): ResolvedModuleWithFailedLookupLocations | undefined;
    /** @internal */
    getResolvedModuleFromModuleSpecifier(
        moduleSpecifier: StringLiteral,
        sourceFile?: SourceFile
    ): ResolvedModuleWithFailedLookupLocations | undefined;
    /** @internal */
    getResolvedTypeReferenceDirective(
        f: SourceFile,
        typeDirectiveName: string,
        mode: ResolutionMode
    ): ResolvedTypeReferenceDirectiveWithFailedLookupLocations | undefined;
    /** @internal */
    getResolvedTypeReferenceDirectiveFromTypeReferenceDirective(
        typedRef: FileReference,
        sourceFile: SourceFile
    ): ResolvedTypeReferenceDirectiveWithFailedLookupLocations | undefined;
    /** @internal */
    forEachResolvedModule(
        callback: (
            resolution: ResolvedModuleWithFailedLookupLocations,
            moduleName: string,
            mode: ResolutionMode,
            filePath: Path
        ) => void,
        file?: SourceFile
    ): void;
    /** @internal */
    forEachResolvedTypeReferenceDirective(
        callback: (
            resolution: ResolvedTypeReferenceDirectiveWithFailedLookupLocations,
            moduleName: string,
            mode: ResolutionMode,
            filePath: Path
        ) => void,
        file?: SourceFile
    ): void;

    /**
     * Emits the JavaScript and declaration files.  If targetSourceFile is not specified, then
     * the JavaScript and declaration files will be produced for all the files in this program.
     * If targetSourceFile is specified, then only the JavaScript and declaration for that
     * specific file will be generated.
     *
     * If writeFile is not specified then the writeFile callback from the compiler host will be
     * used for writing the JavaScript and declaration files.  Otherwise, the writeFile parameter
     * will be invoked when writing the JavaScript and declaration files.
     */
    emit(
        targetSourceFile?: SourceFile,
        writeFile?: WriteFileCallback,
        cancellationToken?: CancellationToken,
        emitOnlyDtsFiles?: boolean,
        customTransformers?: CustomTransformers
    ): EmitResult;
    /** @internal */
    emit(
        targetSourceFile?: SourceFile,
        writeFile?: WriteFileCallback,
        cancellationToken?: CancellationToken,
        emitOnly?: boolean | EmitOnly,
        customTransformers?: CustomTransformers,
        forceDtsEmit?: boolean
    ): EmitResult;

    getOptionsDiagnostics(
        cancellationToken?: CancellationToken
    ): readonly Diagnostic[];
    getGlobalDiagnostics(
        cancellationToken?: CancellationToken
    ): readonly Diagnostic[];
    getSyntacticDiagnostics(
        sourceFile?: SourceFile,
        cancellationToken?: CancellationToken
    ): readonly DiagnosticWithLocation[];
    /** The first time this is called, it will return global diagnostics (no location). */
    getSemanticDiagnostics(
        sourceFile?: SourceFile,
        cancellationToken?: CancellationToken
    ): readonly Diagnostic[];
    getDeclarationDiagnostics(
        sourceFile?: SourceFile,
        cancellationToken?: CancellationToken
    ): readonly DiagnosticWithLocation[];
    getConfigFileParsingDiagnostics(): readonly Diagnostic[];
    /** @internal */ getSuggestionDiagnostics(
        sourceFile: SourceFile,
        cancellationToken?: CancellationToken
    ): readonly DiagnosticWithLocation[];

    /** @internal */ getBindAndCheckDiagnostics(
        sourceFile: SourceFile,
        cancellationToken?: CancellationToken
    ): readonly Diagnostic[];
    /** @internal */ getProgramDiagnostics(
        sourceFile: SourceFile,
        cancellationToken?: CancellationToken
    ): readonly Diagnostic[];

    /**
     * Gets a type checker that can be used to semantically analyze source files in the program.
     */
    getTypeChecker(): TypeChecker;

    /** @internal */ getCommonSourceDirectory(): string;

    /** @internal */ getCachedSemanticDiagnostics(
        sourceFile?: SourceFile
    ): readonly Diagnostic[] | undefined;

    /** @internal */ getClassifiableNames(): Set<string>;

    getNodeCount(): number;
    getIdentifierCount(): number;
    getSymbolCount(): number;
    getTypeCount(): number;
    getInstantiationCount(): number;
    getRelationCacheSizes(): {
        assignable: number;
        identity: number;
        subtype: number;
        strictSubtype: number;
    };

    /** @internal */ getFileProcessingDiagnostics():
        | FilePreprocessingDiagnostics[]
        | undefined;
    /** @internal */ getAutomaticTypeDirectiveNames(): string[];
    /** @internal */ getAutomaticTypeDirectiveResolutions(): ModeAwareCache<ResolvedTypeReferenceDirectiveWithFailedLookupLocations>;
    isSourceFileFromExternalLibrary(file: SourceFile): boolean;
    isSourceFileDefaultLibrary(file: SourceFile): boolean;
    /**
     * Calculates the final resolution mode for a given module reference node. This function only returns a result when module resolution
     * settings allow differing resolution between ESM imports and CJS requires, or when a mode is explicitly provided via import attributes,
     * which cause an `import` or `require` condition to be used during resolution regardless of module resolution settings. In absence of
     * overriding attributes, and in modes that support differing resolution, the result indicates the syntax the usage would emit to JavaScript.
     * Some examples:
     *
     * ```ts
     * // tsc foo.mts --module nodenext
     * import {} from "mod";
     * // Result: ESNext - the import emits as ESM due to `impliedNodeFormat` set by .mts file extension
     *
     * // tsc foo.cts --module nodenext
     * import {} from "mod";
     * // Result: CommonJS - the import emits as CJS due to `impliedNodeFormat` set by .cts file extension
     *
     * // tsc foo.ts --module preserve --moduleResolution bundler
     * import {} from "mod";
     * // Result: ESNext - the import emits as ESM due to `--module preserve` and `--moduleResolution bundler`
     * // supports conditional imports/exports
     *
     * // tsc foo.ts --module preserve --moduleResolution node10
     * import {} from "mod";
     * // Result: undefined - the import emits as ESM due to `--module preserve`, but `--moduleResolution node10`
     * // does not support conditional imports/exports
     *
     * // tsc foo.ts --module commonjs --moduleResolution node10
     * import type {} from "mod" with { "resolution-mode": "import" };
     * // Result: ESNext - conditional imports/exports always supported with "resolution-mode" attribute
     * ```
     */
    getModeForUsageLocation(
        file: SourceFile,
        usage: StringLiteral
    ): ResolutionMode;
    /**
     * Calculates the final resolution mode for an import at some index within a file's `imports` list. This function only returns a result
     * when module resolution settings allow differing resolution between ESM imports and CJS requires, or when a mode is explicitly provided
     * via import attributes, which cause an `import` or `require` condition to be used during resolution regardless of module resolution
     * settings. In absence of overriding attributes, and in modes that support differing resolution, the result indicates the syntax the
     * usage would emit to JavaScript. Some examples:
     *
     * ```ts
     * // tsc foo.mts --module nodenext
     * import {} from "mod";
     * // Result: ESNext - the import emits as ESM due to `impliedNodeFormat` set by .mts file extension
     *
     * // tsc foo.cts --module nodenext
     * import {} from "mod";
     * // Result: CommonJS - the import emits as CJS due to `impliedNodeFormat` set by .cts file extension
     *
     * // tsc foo.ts --module preserve --moduleResolution bundler
     * import {} from "mod";
     * // Result: ESNext - the import emits as ESM due to `--module preserve` and `--moduleResolution bundler`
     * // supports conditional imports/exports
     *
     * // tsc foo.ts --module preserve --moduleResolution node10
     * import {} from "mod";
     * // Result: undefined - the import emits as ESM due to `--module preserve`, but `--moduleResolution node10`
     * // does not support conditional imports/exports
     *
     * // tsc foo.ts --module commonjs --moduleResolution node10
     * import type {} from "mod" with { "resolution-mode": "import" };
     * // Result: ESNext - conditional imports/exports always supported with "resolution-mode" attribute
     * ```
     */
    getModeForResolutionAtIndex(
        file: SourceFile,
        index: number
    ): ResolutionMode;
    /**
     * @internal
     * The resolution mode to use for module resolution or module specifier resolution
     * outside the context of an existing module reference, where
     * `program.getModeForUsageLocation` should be used instead.
     */
    getDefaultResolutionModeForFile(sourceFile: SourceFile): ResolutionMode;
    /** @internal */ getImpliedNodeFormatForEmit(
        sourceFile: SourceFile
    ): ResolutionMode;
    ///** @internal */ getEmitModuleFormatOfFile(sourceFile: SourceFile): ModuleKind;
    /** @internal */ shouldTransformImportCall(sourceFile: SourceFile): boolean;

    // For testing purposes only.
    // This is set on created program to let us know how the program was created using old program
    /** @internal */ readonly structureIsReused: StructureIsReused;

    /** @internal */ getSourceFileFromReference(
        referencingFile: SourceFile,
        ref: FileReference
    ): SourceFile | undefined;
    /** @internal */ getLibFileFromReference(
        ref: FileReference
    ): SourceFile | undefined;

    /**
     * Given a source file, get the name of the package it was imported from.
     *
     * @internal
     */
    sourceFileToPackageName: Map<Path, string>;
    /**
     * Set of all source files that some other source file redirects to.
     *
     * @internal
     */
    redirectTargetsMap: MultiMap<Path, string>;
    /**
     * Whether any (non-external, non-declaration) source files use `node:`-prefixed module specifiers.
     *
     * @internal
     */
    readonly usesUriStyleNodeCoreModules: boolean;
    /**
     * Map from libFileName to actual resolved location of the lib
     * @internal
     */
    resolvedLibReferences: Map<string, LibResolution> | undefined;
    /** @internal */ getCurrentPackagesMap(): Map<string, boolean> | undefined;
    /**
     * Is the file emitted file
     *
     * @internal
     */
    isEmittedFile(file: string): boolean;
    /** @internal */ getFileIncludeReasons(): MultiMap<Path, FileIncludeReason>;
    /** @internal */ useCaseSensitiveFileNames(): boolean;
    /** @internal */ getCanonicalFileName: GetCanonicalFileName;

    getProjectReferences(): readonly ProjectReference[] | undefined;
    getResolvedProjectReferences():
        | readonly (ResolvedProjectReference | undefined)[]
        | undefined;
    /** @internal */ getProjectReferenceRedirect(
        fileName: string
    ): string | undefined;
    /**
     * @internal
     * Get the referenced project if the file is input file from that reference project
     */
    getResolvedProjectReferenceToRedirect(
        fileName: string
    ): ResolvedProjectReference | undefined;
    /** @internal */ forEachResolvedProjectReference<T>(
        cb: (
            resolvedProjectReference: ResolvedProjectReference
        ) => T | undefined
    ): T | undefined;
    /** @internal */ getResolvedProjectReferenceByPath(
        projectReferencePath: Path
    ): ResolvedProjectReference | undefined;
    /** @internal */ getRedirectReferenceForResolutionFromSourceOfProject(
        filePath: Path
    ): ResolvedProjectReference | undefined;
    /** @internal */ isSourceOfProjectReferenceRedirect(
        fileName: string
    ): boolean;
    /** @internal */ getCompilerOptionsForFile(
        file: SourceFile
    ): CompilerOptions;
    /** @internal */ getBuildInfo?(): BuildInfo;
    /** @internal */ emitBuildInfo(
        writeFile?: WriteFileCallback,
        cancellationToken?: CancellationToken
    ): any; //
    EmitResult;
    /**
     * This implementation handles file exists to be true if file is source of project reference redirect when program is created using useSourceOfProjectReferenceRedirect
     *
     * @internal
     */
    fileExists(fileName: string): boolean;
    /**
     * Call compilerHost.writeFile on host program was created with
     *
     * @internal
     */
    writeFile: WriteFileCallback;
}

/** @internal */
export interface BuildInfo {
    program?: any; //ProgramBuildInfo;
    version: string;
}

export interface WriteFileCallbackData {
    /** @internal */ sourceMapUrlPos?: number;
    /** @internal */ buildInfo?: BuildInfo;
    /** @internal */ diagnostics?: readonly DiagnosticWithLocation[];
    /** @internal */ differsOnlyInMap?: true;
}
export type WriteFileCallback = (
    fileName: string,
    text: string,
    writeByteOrderMark: boolean,
    onError?: (message: string) => void,
    sourceFiles?: readonly SourceFile[],
    data?: WriteFileCallbackData
) => void;

/** @internal */
export interface Program
    extends TypeCheckerHost,
        ModuleSpecifierResolutionHost {}

type LibResolution = undefined;

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
    packageId: any; // PackageId | undefined;
}

/** @internal */
export type FileIncludeReason =
    | RootFile
    | LibFile
    | ProjectReferenceFile
    | ReferencedFile
    | AutomaticTypeDirectiveFile;

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

export interface ResolvedProjectReference {
    commandLine: any;
    sourceFile: SourceFile;
    references?: readonly (ResolvedProjectReference | undefined)[];
}

/** @internal */
export const enum StructureIsReused {
    Not,
    SafeModules,
    Completely,
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
    reason: ReferencedFile & { kind: FileIncludeKind.LibReferenceDirective };
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
export type FilePreprocessingDiagnostics =
    | FilePreprocessingLibReferenceDiagnostic
    | FilePreprocessingFileExplainingDiagnostic
    | ResolutionDiagnostics;

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
    packageId?: any;
    /** True if `resolvedFileName` comes from `node_modules`. */
    isExternalLibraryImport?: boolean;
}

export interface ResolvedTypeReferenceDirectiveWithFailedLookupLocations {
    readonly resolvedTypeReferenceDirective:
        | ResolvedTypeReferenceDirective
        | undefined;
    /** @internal */ failedLookupLocations?: string[];
    /** @internal */ affectingLocations?: string[];
    /** @internal */ resolutionDiagnostics?: Diagnostic[];
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
    packageId?: any; // PackageId;
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

export interface ScriptReferenceHost {
    getCompilerOptions(): CompilerOptions;
    getSourceFile(fileName: string): SourceFile | undefined;
    getSourceFileByPath(path: Path): SourceFile | undefined;
    getCurrentDirectory(): string;
}

type CustomTransformers = any;

/** @internal */
export const enum EmitOnly {
    Js,
    Dts,
}

export interface EmitResult {
    emitSkipped: boolean;
    /** Contains declaration emit diagnostics */
    diagnostics: readonly Diagnostic[];
    emittedFiles?: string[]; // Array of files the compiler wrote to disk
    /** @internal */ sourceMaps?: any[]; //SourceMapEmitResult[]; // Array of sourceMapData if compiler emitted sourcemaps
}

/** @internal */
export interface ReverseMappedSymbol extends TransientSymbol {
    links: ReverseMappedSymbolLinks;
}

/** @internal */
export interface ReverseMappedSymbolLinks extends TransientSymbolLinks {
    propertyType: Type;
    mappedType: MappedType;
    constraintType: IndexType;
}

/** @internal */
export type ThisContainer =
    | FunctionDeclaration
    | FunctionExpression
    // | ModuleDeclaration
    // | ClassStaticBlockDeclaration
    | PropertyDeclaration
    | PropertySignature
    | MethodDeclaration
    // | MethodSignature
    // | ConstructorDeclaration
    // | GetAccessorDeclaration
    // | SetAccessorDeclaration
    | CallSignatureDeclaration
    //| ConstructSignatureDeclaration
    | IndexSignatureDeclaration
    //| EnumDeclaration
    | SourceFile;

/** @internal */
export interface MappedSymbolLinks extends TransientSymbolLinks {
    mappedType: MappedType;
    keyType: Type;
}

/** @internal */
export interface MappedSymbol extends TransientSymbol {
    links: MappedSymbolLinks;
}

/** @internal */
export type BindableObjectDefinePropertyCall = CallExpression & {
    readonly arguments: readonly [
        BindableStaticNameExpression,
        StringLiteral | NumericLiteral,
        ObjectLiteralExpression
    ] &
        Readonly<TextRange>;
};

/** @internal */
export interface WideningContext {
    parent?: WideningContext; // Parent context
    propertyName?: string; // Name of property in parent
    siblings?: Type[]; // Types of siblings
    resolvedProperties?: Symbol[]; // Properties occurring in sibling object literals
}

// dprint-ignore
export const enum ElementFlags {
    Required = 1 << 0, // T
    Optional = 1 << 1, // T?
    Rest = 1 << 2, // ...T[]
    Variadic = 1 << 3, // ...T
    Fixed = Required | Optional,
    Variable = Rest | Variadic,
    NonRequired = Optional | Rest | Variadic,
    NonRest = Required | Optional | Variadic,
}

export interface NamedTupleMember
    extends TypeNode,
        Declaration,
        JSDocContainer {
    readonly kind: SyntaxKind.NamedTupleMember;
    readonly dotDotDotToken?: Token<SyntaxKind.DotDotDotToken>;
    readonly name: Identifier;
    readonly questionToken?: Token<SyntaxKind.QuestionToken>;
    readonly type: TypeNode;
}

// dprint-ignore
export interface InterfaceTypeWithDeclaredMembers extends InterfaceType {
    declaredProperties: Symbol[]; // Declared members
    declaredCallSignatures: Signature[]; // Declared call signatures
    declaredConstructSignatures: Signature[]; // Declared construct signatures
    declaredIndexInfos: IndexInfo[]; // Declared index signatures
}

export interface ExpressionWithTypeArguments
    extends MemberExpression,
        NodeWithTypeArguments {
    readonly kind: SyntaxKind.ExpressionWithTypeArguments;
    readonly expression: LeftHandSideExpression;
}

export interface HeritageClause extends Node {
    readonly kind: SyntaxKind.HeritageClause;
    readonly parent: InterfaceDeclaration | ClassLikeDeclaration;
    readonly token: SyntaxKind.ExtendsKeyword | SyntaxKind.ImplementsKeyword;
    readonly types: NodeArray<ExpressionWithTypeArguments>;
}

export interface InterfaceDeclaration
    extends DeclarationStatement,
        JSDocContainer {
    readonly kind: SyntaxKind.InterfaceDeclaration;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly name: Identifier;
    readonly typeParameters?: NodeArray<TypeParameterDeclaration>;
    readonly heritageClauses?: NodeArray<HeritageClause>;
    readonly members: NodeArray<TypeElement>;
}

export interface ConditionalTypeNode extends TypeNode, LocalsContainer {
    readonly kind: SyntaxKind.ConditionalType;
    readonly checkType: TypeNode;
    readonly extendsType: TypeNode;
    readonly trueType: TypeNode;
    readonly falseType: TypeNode;
}

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
/** @deprecated not used in lpc */
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

export interface JsxAttributes extends PrimaryExpression, Declaration {
    readonly properties: NodeArray<any>;
    readonly kind: SyntaxKind.Unknown;
    readonly parent: any;
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

export interface TemplateLiteralType extends InstantiableType {
    texts: readonly string[]; // Always one element longer than types
    types: readonly Type[]; // Always at least one element
}

export interface StringMappingType extends InstantiableType {
    symbol: Symbol;
    type: Type;
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
    labeledElementDeclarations?: readonly (
        | NamedTupleMember
        | ParameterDeclaration
        | undefined
    )[];
}

export interface TupleTypeReference extends TypeReference {
    target: TupleType;
}

export interface TypeAliasDeclaration
    extends DeclarationStatement,
        JSDocContainer,
        LocalsContainer {
    readonly kind: SyntaxKind.TypeAliasDeclaration;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly name: Identifier;
    readonly typeParameters?: NodeArray<TypeParameterDeclaration>;
    readonly type: TypeNode;
}

export type DeclarationWithTypeParameters =
    | DeclarationWithTypeParameterChildren
    // | JSDocTypedefTag
    // | JSDocCallbackTag
    | JSDocSignature;

export type DeclarationWithTypeParameterChildren =
    | SignatureDeclaration
    | ClassLikeDeclaration
    | InterfaceDeclaration
    | TypeAliasDeclaration
    | JSDocTemplateTag;

/** @internal */
// A SingleSignatureType may have bespoke outer type parameters to handle free type variable inferences
export interface SingleSignatureType extends AnonymousType {
    outerTypeParameters?: TypeParameter[];
}

export interface DeferredTypeReference extends TypeReference {
    /** @internal */
    node: TypeReferenceNode | ArrayTypeNode | TupleTypeNode;
    /** @internal */
    mapper?: TypeMapper;
    /** @internal */
    instantiations?: Map<string, Type>; // Instantiations of generic type alias (undefined if non-generic)
}

export interface OptionalTypeNode extends TypeNode {
    readonly kind: SyntaxKind.OptionalType;
    readonly type: TypeNode;
}

export interface ParenthesizedTypeNode extends TypeNode {
    readonly kind: SyntaxKind.ParenthesizedType;
    readonly type: TypeNode;
}

export interface TaggedTemplateExpression extends MemberExpression {
    readonly kind: SyntaxKind.TaggedTemplateExpression;
    readonly tag: LeftHandSideExpression;
    readonly typeArguments?: NodeArray<TypeNode>;
    readonly template: any;
    /** @internal */ questionDotToken?: any; // NOTE: Invalid syntax, only used to report a grammar error.
}

/** @internal */
export const enum IntersectionFlags {
    None = 0,
    NoSupertypeReduction = 1 << 0,
    NoConstraintReduction = 1 << 1,
}

export interface SyntheticExpression extends Expression {
    readonly kind: SyntaxKind.SyntheticExpression;
    readonly isSpread: boolean;
    readonly type: Type;
    readonly tupleNameSource?: ParameterDeclaration | NamedTupleMember;
}

export type TypeReferenceType = TypeReferenceNode | ExpressionWithTypeArguments;

export interface FunctionOrConstructorTypeNodeBase
    extends TypeNode,
        SignatureDeclarationBase {
    readonly kind: SyntaxKind.FunctionType | SyntaxKind.ConstructorType;
    readonly type: TypeNode;
}

export interface FunctionTypeNode
    extends FunctionOrConstructorTypeNodeBase,
        LocalsContainer {
    readonly kind: SyntaxKind.FunctionType;

    // A function type cannot have modifiers
    /** @internal */ readonly modifiers?: undefined;
}

export interface ConstructorTypeNode
    extends FunctionOrConstructorTypeNodeBase,
        LocalsContainer {
    readonly kind: SyntaxKind.ConstructorType;
    readonly modifiers?: NodeArray<Modifier>;
}

export type FunctionOrConstructorTypeNode =
    | FunctionTypeNode
    | ConstructorTypeNode;

/** @internal */
export interface InstantiationExpressionType extends AnonymousType {
    node: NodeWithTypeArguments;
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

/** @internal */
export type RequireOrImportCall = CallExpression & {
    expression: Identifier;
    arguments: [StringLiteral];
};

/** @internal */
// Object literals are initially marked fresh. Freshness disappears following an assignment,
// before a type assertion, or when an object literal's type is widened. The regular
// version of a fresh type is identical except for the TypeFlags.FreshObjectLiteral flag.
export interface FreshObjectLiteralType extends ResolvedType {
    regularType: ResolvedType; // Regular version of fresh type
}

// Just a place to cache element types of iterables and iterators
/** @internal */
export interface IterableOrIteratorType extends ObjectType, UnionType {
    iterationTypesOfGeneratorReturnType?: IterationTypes;
    iterationTypesOfAsyncGeneratorReturnType?: IterationTypes;
    iterationTypesOfIterable?: IterationTypes;
    iterationTypesOfIterator?: IterationTypes;
    iterationTypesOfAsyncIterable?: IterationTypes;
    iterationTypesOfAsyncIterator?: IterationTypes;
    iterationTypesOfIteratorResult?: IterationTypes;
}

/** @internal */
export interface GeneratedIdentifier extends Identifier {
    //readonly emitNode: EmitNode & { autoGenerate: AutoGenerateInfo; };
}

// dprint-ignore
export const enum EmitFlags {
    None = 0,
    SingleLine = 1 << 0, // The contents of this node should be emitted on a single line.
    MultiLine = 1 << 1,
    AdviseOnEmitNode = 1 << 2, // The printer should invoke the onEmitNode callback when printing this node.
    NoSubstitution = 1 << 3, // Disables further substitution of an expression.
    CapturesThis = 1 << 4, // The function captures a lexical `this`
    NoLeadingSourceMap = 1 << 5, // Do not emit a leading source map location for this node.
    NoTrailingSourceMap = 1 << 6, // Do not emit a trailing source map location for this node.
    NoSourceMap = NoLeadingSourceMap | NoTrailingSourceMap, // Do not emit a source map location for this node.
    NoNestedSourceMaps = 1 << 7, // Do not emit source map locations for children of this node.
    NoTokenLeadingSourceMaps = 1 << 8, // Do not emit leading source map location for token nodes.
    NoTokenTrailingSourceMaps = 1 << 9, // Do not emit trailing source map location for token nodes.
    NoTokenSourceMaps = NoTokenLeadingSourceMaps | NoTokenTrailingSourceMaps, // Do not emit source map locations for tokens of this node.
    NoLeadingComments = 1 << 10, // Do not emit leading comments for this node.
    NoTrailingComments = 1 << 11, // Do not emit trailing comments for this node.
    NoComments = NoLeadingComments | NoTrailingComments, // Do not emit comments for this node.
    NoNestedComments = 1 << 12,
    HelperName = 1 << 13, // The Identifier refers to an *unscoped* emit helper (one that is emitted at the top of the file)
    ExportName = 1 << 14, // Ensure an export prefix is added for an identifier that points to an exported declaration with a local name (see SymbolFlags.ExportHasLocal).
    LocalName = 1 << 15, // Ensure an export prefix is not added for an identifier that points to an exported declaration.
    InternalName = 1 << 16, // The name is internal to an ES5 class body function.
    Indented = 1 << 17, // Adds an explicit extra indentation level for class and function bodies when printing (used to match old emitter).
    NoIndentation = 1 << 18, // Do not indent the node.
    AsyncFunctionBody = 1 << 19,
    ReuseTempVariableScope = 1 << 20, // Reuse the existing temp variable scope during emit.
    CustomPrologue = 1 << 21, // Treat the statement as if it were a prologue directive (NOTE: Prologue directives are *not* transformed).
    NoHoisting = 1 << 22, // Do not hoist this declaration in --module system
    Iterator = 1 << 23, // The expression to a `yield*` should be treated as an Iterator when down-leveling, not an Iterable.
    NoAsciiEscaping = 1 << 24, // When synthesizing nodes that lack an original node or textSourceNode, we want to write the text on the node with ASCII escaping substitutions.
}

// dprint-ignore
export const enum GeneratedIdentifierFlags {
    // Kinds
    None = 0, // Not automatically generated.
    /** @internal */ Auto = 1, // Automatically generated identifier.
    /** @internal */ Loop = 2, // Automatically generated identifier with a preference for '_i'.
    /** @internal */ Unique = 3, // Unique name based on the 'text' property.
    /** @internal */ Node = 4, // Unique name based on the node in the 'original' property.
    /** @internal */ KindMask = 7, // Mask to extract the kind of identifier from its flags.

    // Flags
    ReservedInNestedScopes = 1 << 3, // Reserve the generated name in nested scopes
    Optimistic = 1 << 4, // First instance won't use '_#' if there's no conflict
    FileLevel = 1 << 5, // Use only the file identifiers list and not generated names to search for conflicts
    AllowNameSubstitution = 1 << 6, // Used by `module.ts` to indicate generated nodes which can have substitutions performed upon them (as they were generated by an earlier transform phase)
}

/** @internal */
export interface GeneratedNamePart {
    /** an additional prefix to insert before the text sourced from `node` */
    prefix?: string;
    node: Identifier | PrivateIdentifier;
    /** an additional suffix to insert after the text sourced from `node` */
    suffix?: string;
}

// dprint-ignore
/** @internal */
export interface AutoGenerateInfo {
    flags: GeneratedIdentifierFlags; // Specifies whether to auto-generate the text for an identifier.
    readonly id: number; // Ensures unique generated identifiers get unique names, but clones get the same name.
    readonly prefix?: string | GeneratedNamePart;
    readonly suffix?: string;
}

/** @internal */
export interface GeneratedPrivateIdentifier extends PrivateIdentifier {
    //readonly emitNode: EmitNode & { autoGenerate: AutoGenerateInfo; };
}

// dprint-ignore
export const enum EmitHint {
    SourceFile, // Emitting a SourceFile
    Expression, // Emitting an Expression
    IdentifierName, // Emitting an IdentifierName
    MappedTypeParameter, // Emitting a TypeParameterDeclaration inside of a MappedTypeNode
    Unspecified, // Emitting an otherwise unspecified node
    EmbeddedStatement, // Emitting an embedded statement
    JsxAttributeValue, // Emitting a JSX attribute value
    ImportTypeNodeAttributes, // Emitting attributes as part of an ImportTypeNode
}

export type OptionalChain =
    | PropertyAccessChain
    | ElementAccessChain
    | CallChain
    | NonNullChain;

/** @internal */
export interface PropertyAccessChainRoot extends PropertyAccessChain {
    //readonly questionDotToken: QuestionDotToken;
}
/** @internal */
export interface ElementAccessChainRoot extends ElementAccessChain {
    //readonly questionDotToken: QuestionDotToken;
}
/** @internal */
export interface CallChainRoot extends CallChain {
    //readonly questionDotToken: QuestionDotToken;
}

/** @internal */
export type OptionalChainRoot =
    | PropertyAccessChainRoot
    | ElementAccessChainRoot
    | CallChainRoot;

/**
 * This is either an `export =` or an `export default` declaration.
 * Unless `isExportEquals` is set, this node was parsed as an `export default`.
 */
export interface ExportAssignment extends DeclarationStatement, JSDocContainer {
    readonly kind: SyntaxKind.ExportAssignment;
    readonly parent: SourceFile;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly isExportEquals?: boolean;
    readonly expression: Expression;
}

export interface BreakStatement extends Statement, FlowContainer {
    readonly kind: SyntaxKind.BreakStatement;
    readonly label?: Identifier;
}

export interface ContinueStatement extends Statement, FlowContainer {
    readonly kind: SyntaxKind.ContinueStatement;
    readonly label?: Identifier;
}

export type BreakOrContinueStatement = BreakStatement | ContinueStatement;
