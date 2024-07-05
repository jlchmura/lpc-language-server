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
    TypeParameter,
    Parameter,
    MethodSignature,
    MethodDeclaration,
    IndexSignature,

    // Top Level
    SourceFile,
}

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
    Override =           1 << 4,  // Override method.

    // Syntactic-only modifiers
    NoSave =             1 << 5,  // Declarations
    NoShadow =           1 << 6,  // Class/Method/ConstructSignature
    
    // JSDoc-only modifiers
    Deprecated =         1 << 16, // Deprecated tag.

    // Cache-only JSDoc-modifiers. Should match order of Syntactic/JSDoc modifiers, above.
    /** @internal */ JSDocPublic = 1 << 23, // if this value changes, `selectEffectiveModifierFlags` must change accordingly
    /** @internal */ JSDocPrivate = 1 << 24,
    /** @internal */ JSDocProtected = 1 << 25,
    /** @internal */ JSDocReadonly = 1 << 26,
    /** @internal */ JSDocOverride = 1 << 27,

    /** @internal */ SyntacticOrJSDocModifiers = Public | Private | Protected | Override,
    /** @internal */ SyntacticOnlyModifiers = NoSave | NoShadow,
    /** @internal */ SyntacticModifiers = SyntacticOrJSDocModifiers | SyntacticOnlyModifiers,
    /** @internal */ JSDocCacheOnlyModifiers = JSDocPublic | JSDocPrivate | JSDocProtected | JSDocReadonly | JSDocOverride,
    /** @internal */ JSDocOnlyModifiers = Deprecated,
    /** @internal */ NonCacheOnlyModifiers = SyntacticOrJSDocModifiers | SyntacticOnlyModifiers | JSDocOnlyModifiers,

    HasComputedJSDocModifiers = 1 << 28, // Indicates the computed modifier flags include modifiers from JSDoc.
    HasComputedFlags =   1 << 29, // Modifier flags have been computed

    AccessibilityModifier = Public | Private | Protected,
    // Accessibility modifiers and 'readonly' can be attached to a parameter in a constructor to make it a property.
    ParameterPropertyModifier = AccessibilityModifier |  Override,
    NonPublicAccessibilityModifier = Private | Protected,

    //TypeScriptModifier = Public | Private | Protected | Readonly | Abstract | Const | Override | In | Out,
    //ExportDefault = Export | Default,
    All = Public | Private | Protected |  Deprecated | Override,
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
}

// Typed as a PrimaryExpression due to its presence in BinaryExpressions (#field in expr)
export interface PrivateIdentifier extends PrimaryExpression {
    readonly kind: SyntaxKind.PrivateIdentifier;
}

// prettier-ignore
export interface NodeFactory {    
    createSourceFile(statements: readonly Statement[], endOfFileToken: EndOfFileToken, flags: NodeFlags): SourceFile;
    createNodeArray<T extends Node>(elements?: readonly T[], hasTrailingComma?: boolean): NodeArray<T>;

    createToken(token: SyntaxKind.EndOfFileToken): EndOfFileToken;
    createToken(token: SyntaxKind.Unknown): Token<SyntaxKind.Unknown>;    
    /** @internal */ createToken<TKind extends SyntaxKind>(token: TKind): Token<TKind>;
}
