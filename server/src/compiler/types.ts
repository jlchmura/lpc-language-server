import * as antlr from "antlr4ng";
import { LPCLexer } from "../parser3/LPCLexer";
import {
    FunctionModifierContext,
    ParameterContext,    
} from "../parser3/LPCParser";

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
    id: SymbolId; // unique id
    parent?: Symbol; // parent symbol
    isReferenced?: boolean; // true if symbol is referenced in the program
    lastAssignmentPos?: number; // position of last node that assigned a value to this symbol
};


// prettier-ignore
export type MatchingKeys<TRecord, TMatch, K extends keyof TRecord = keyof TRecord> = K extends (TRecord[K] extends TMatch ? K : never) ? K : never;

/** Simple symbol table using a Map */
export type SymbolTable = Map<string, Symbol>;

export interface CompilerOptions {
    allowUnreachableCode?: boolean;
    // TODO
}

export const enum SyntaxKind {
    Unknown,
    EndOfFileToken,
    // Literals
    IntLiteral,
    FloatLiteral,
    StringLiteral,

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
    IndexSignature,
    InferType,
    ArrayType,
    UnionType,

    // Top Level
    SourceFile,

    Block,

    // declarations
    FunctionDeclaration,
    VariableDeclaration,

    // statements
    VariableStatement, // has marker as first statement
    VariableDeclarationList,
    CatchClause,
    ReturnStatement,
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

    // binding patterns
    ObjectBindingPattern,
    ArrayBindingPattern,
    BindingElement,

    // expressions
    CallExpression,
    PropertyAccessExpression,
    ElementAccessExpression,
    InlineClosureExpression,
    BinaryExpression,
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
    TypeAssertionExpression,
    PartiallyEmittedExpression,

    // keywords
    PrivateKeyword,
    ProtectedKeyword,
    PublicKeyword,
    StaticKeyword,
    VisibleKeyword,
    NoSaveKeyword,
    NoShadowKeyword,
    NoMaskKeyword,
    VarArgsKeyword,
    DeprecatedKeyword,
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
    JSDocText,
    JSDocTypeLiteral,
    JSDocTypeTag,
    JSDoc,

    // Markers
    FirstAssignment = EqualsToken,
    LastAssignment = CaretEqualsToken,
    FirstToken = Unknown,
    LastToken = CaretEqualsToken,
    FirstStatement = VariableStatement,
    LastStatement = EmptyStatement,

    // Property Assignments
    ShorthandPropertyAssignment,
    PropertyAssignment,
    NumericLiteral,
}

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
    OptionalChain      = 1 << 6,  // Chained MemberExpression rooted to a pseudo-OptionalExpression
    HasImplicitReturn  = 1 << 9,  // If function implicitly returns on one of codepaths (initialized by binding)
    HasExplicitReturn  = 1 << 10,  // If function has explicit reachable return on one of codepaths (initialized by binding)
    ThisNodeHasError   = 1 << 18, // If the parser encountered an error when parsing the code that created this node

    ReachabilityCheckFlags = HasImplicitReturn | HasExplicitReturn,
    ReachabilityAndEmitFlags = ReachabilityCheckFlags,

    // parse set flags
    BlockScoped = Variable,

    
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
    
    // JSDoc-only modifiers
    Deprecated =         1 << 16, // Deprecated tag.

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
    FunctionScopedVariable      = 1 << 0,   // Variable or parameter
    BlockScopedVariable         = 1 << 1,   // A block-scoped variable
    Property                    = 1 << 2,   // Property
    Funciton                    = 1 << 3,   // Function    
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
    createLiteralLikeNode(kind: LiteralToken["kind"] , text: string): LiteralToken;
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

export type FlowNode =
    | FlowStart
    | FlowStart
    | FlowLabel
    | FlowAssignment
    | FlowArrayMutation; // TODO: add others

export interface FlowNodeBase {
    id: number; // Node is used by flow checker
    node: unknown; // Node or other data
    antecedent: FlowNode | FlowNode[] | undefined;
    flags: FlowFlags;
}

/** Represents the start of a control flow. */
export interface FlowStart extends FlowNodeBase {
    // TODO: add nodes
    //node: FunctionExpression | ArrowFunction |etc
    antecedent: undefined;
}

// FlowLabel represents a junction with multiple possible preceding control flows.
/** @internal */
export interface FlowLabel extends FlowNodeBase {
    node: undefined;
    antecedent: FlowNode[] | undefined;
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

export interface SourceFile extends Declaration, LocalsContainer {
    readonly kind: SyntaxKind.SourceFile;
    readonly statements: NodeArray<Statement>;
    readonly endOfFileToken: Token<SyntaxKind.EndOfFileToken>;
    fileName: string;
    text: string;

    identifiers: ReadonlyMap<string, string>;
    nodeCount: number;
    identifierCount: number;
    symbolCount: number;

    parseDiagnostics: any[]; // TODO
    pragmas: Set<string>; // TODO
    endFlowNode?: FlowNode; // TODO
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

export interface UpdateExpression extends UnaryExpression {
    _updateExpressionBrand: any;
}

export interface LeftHandSideExpression extends UpdateExpression {
    _leftHandSideExpressionBrand: any;
}

export interface MemberExpression extends LeftHandSideExpression {
    _memberExpressionBrand: any;
}

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

export interface Statement extends Node, JSDocContainer {
    _statementBrand: any;
}

export type ModifierLike = antlr.TerminalNode;

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
        | NumericLiteral
        | PrivateIdentifier; // Allows a StringLiteral to get its text from another node (used by transforms).
}

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
    //| BindingPattern
    | EntityNameExpression;

export type EntityNameExpression =
    | Identifier
    | PropertyAccessEntityNameExpression;
export interface PropertyAccessExpression
    extends MemberExpression,
        NamedDeclaration,
        JSDocContainer,
        FlowContainer {
    readonly kind: SyntaxKind.PropertyAccessExpression;
    readonly expression: LeftHandSideExpression;
    readonly name: MemberName;
}

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

export type BindingName = Identifier;

export interface ObjectBindingPattern extends Node {
    readonly kind: SyntaxKind.ObjectBindingPattern;
    readonly parent:
        | VariableDeclaration
        | ParameterDeclaration
        | BindingElement;
    readonly elements: NodeArray<BindingElement>;
}

export interface ObjectLiteralElement extends NamedDeclaration {
    _objectLiteralBrand: any;
    readonly name?: PropertyName;
}

/** Unlike ObjectLiteralElement, excludes JSXAttribute and JSXSpreadAttribute. */
export type ObjectLiteralElementLike =
    | PropertyAssignment
    | ShorthandPropertyAssignment;
//| SpreadAssignment
//| MethodDeclaration

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
    | ReturnStatement;

// prettier-ignore
export interface ParameterDeclaration extends NamedDeclaration, JSDocContainer {
    readonly kind: SyntaxKind.Parameter;
    readonly parent: SignatureDeclaration;
    readonly modifiers?: NodeArray<Modifier>;
    readonly dotDotDotToken?: antlr.Token;    // Present on rest parameter
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
    | FunctionDeclaration
    | InlineClosureExpression;

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

    readonly body?: ConciseBody | Expression | undefined;
    /** @internal */ endFlowNode?: FlowNode;
    /** @internal */ returnFlowNode?: FlowNode;
}

export type FunctionBody = Block;
export type ConciseBody = FunctionBody | Expression;

export type FunctionLikeDeclaration = FunctionDeclaration;
// TODO
// | MethodDeclaration
// | FunctionExpression
// | ArrowFunction

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
    //| ExpressionStatement
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
    // | QualifiedName
    // | ComputedPropertyName
    // | TypeParameterDeclaration
    // | ParameterDeclaration
    // | PropertySignature
    // | PropertyDeclaration
    // | MethodSignature
    // | MethodDeclaration
    // | IndexSignatureDeclaration
    // | FunctionTypeNode
    // | TypeLiteralNode
    // | ArrayTypeNode
    // | UnionTypeNode
    // | InferTypeNode
    // | ObjectBindingPattern
    // | ArrayBindingPattern
    // | BindingElement
    // | ArrayLiteralExpression
    // | ObjectLiteralExpression
    // | PropertyAccessExpression
    // | ElementAccessExpression
    // | CallExpression
    // | NewExpression
    // | TypeAssertion
    // | ParenthesizedExpression
    // | FunctionExpression
    // | ArrowFunction
    // | PrefixUnaryExpression
    // | PostfixUnaryExpression
    // | BinaryExpression
    // | ConditionalExpression
    // | SpreadElement
    // | NonNullExpression
    // | Block
    // | VariableStatement
    // | ExpressionStatement
    // | IfStatement
    // | DoStatement
    // | WhileStatement
    // | ForStatement
    // | ForInStatement
    // | ContinueStatement
    // | BreakStatement
    | ReturnStatement
    // | SwitchStatement
    // | VariableDeclaration
    // | VariableDeclarationList
    | FunctionDeclaration;
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
// | SourceFile
// | PartiallyEmittedExpression
// | CommaListExpression

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
