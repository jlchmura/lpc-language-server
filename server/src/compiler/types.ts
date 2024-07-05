import * as antlr from "antlr4ng";
import { LPCLexer } from "../parser3/LPCLexer";
import {
    FunctionModifierContext,
    ParameterContext,
    UnionableTypeSpecifierContext,
} from "../parser3/LPCParser";

// Note: 'brands' in our syntax nodes serve to give us a small amount of nominal typing.
// Consider 'Expression'.  Without the brand, 'Expression' is actually no different
// (structurally) than 'Node'.  Because of this you can pass any Node to a function that
// takes an Expression without any error.  By using the 'brands' we ensure that the type
// checker actually thinks you have something of the right type.  Note: the brands are
// never actually given values.  At runtime they have zero cost.

export type NodeId = number;
export type SymbolId = number;

/** Simple symbol table using a Map */
export type SymbolTable = Map<string, Symbol>;

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
    VariableStatement,
    VariableDeclarationList,
    CatchClause,

    // expressions
    PropertyAccessExpression,
    ElementAccessExpression,

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

    // type keywords
    IntKeyword,
    FloatKeyword,
    StringKeyword,
    MixedKeyword,
    MappingKeyword,
    UnknownKeyword,
    VoidKeyword,
    ObjectKeyword,
}

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
};

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
    | SyntaxKind.DeprecatedKeyword;

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

/** Types that can have locals */
export type HasLocals = SourceFile; // | Block  | ForStatement | etc;

// prettier-ignore
export const enum NodeFlags {
    None               = 0,
    Variable           = 1 << 0,  // Variable declaration
    ThisNodeHasError   = 1 << 18, // If the parser encountered an error when parsing the code that created this node

    // parse set flags
    BlockScoped = Variable
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

export interface TextRange {
    pos: number;
    end: number;
}

export interface ReadonlyTextRange {
    readonly pos: number;
    readonly end: number;
}

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

    createFunctionDeclaration(
        modifiers: readonly FunctionModifierContext[] | undefined,
        name: string | Identifier | undefined,    
        parameters: readonly ParameterContext[],
        type: TypeNode | undefined,
        body: Block | undefined
    ): FunctionDeclaration;
    createBlock(statements: readonly Statement[], multiLine?: boolean): Block    ;
    createVariableDeclaration(name: string | BindingName, type: TypeNode | undefined, initializer: Expression | undefined): VariableDeclaration;
    createVariableDeclarationList(declarations: readonly VariableDeclaration[], flags: NodeFlags ): VariableDeclarationList;
    createVariableStatement(modifiers: readonly Modifier[] | undefined, declarationList: VariableDeclarationList | readonly VariableDeclaration[]): VariableStatement;
    createUnionTypeNode(types: readonly TypeNode[]): UnionTypeNode;
    createArrayTypeNode(elementType: TypeNode):ArrayTypeNode;
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

export type FlowNode = FlowStart; // TODO: add others

export interface FlowNodeBase {
    id: number; // Node is used by flow checker
    node: unknown; // Node or other data
    antecedent: FlowNode | FlowNode[] | undefined;
}

/** Represents the start of a control flow. */
export interface FlowStart extends FlowNodeBase {
    // TODO: add nodes
    //node: FunctionExpression | ArrowFunction |etc
    antecedent: undefined;
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
export interface PrivateIdentifier extends PrimaryExpression {
    readonly kind: SyntaxKind.PrivateIdentifier;
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

export interface ElementAccessExpression
    extends MemberExpression,
        Declaration,
        JSDocContainer,
        FlowContainer {
    readonly kind: SyntaxKind.ElementAccessExpression;
    readonly expression: LeftHandSideExpression;
    readonly argumentExpression: Expression;
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

export type BindingName = Identifier;

export interface KeywordToken<TKind extends KeywordSyntaxKind>
    extends Token<TKind> {}

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
    | VariableDeclaration
    | VariableStatement;

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

export type SignatureDeclaration = FunctionDeclaration;
//| MethodDeclaration
//| AccessorDeclaration
//| FunctionExpression
//| ArrowFunction;

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
    readonly parent: VariableStatement; // TODO: | ForStatement | ForOfStatement | ForInStatement;
    readonly declarations: NodeArray<VariableDeclaration>;
}

export interface VariableStatement extends Statement, FlowContainer {
    readonly kind: SyntaxKind.VariableStatement;
    readonly modifiers?: NodeArray<Modifier>;
    readonly declarationList: VariableDeclarationList;
}
