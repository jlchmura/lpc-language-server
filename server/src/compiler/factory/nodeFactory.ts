import {
    addRange,
    AmpersandToken,
    ArrayTypeNode,
    BaseNodeFactory,
    BinaryExpression,
    BinaryOperator,
    BinaryOperatorToken,
    BindingName,
    Block,
    BreakStatement,
    CallExpression,
    CaseBlock,
    CaseClause,
    CaseOrDefaultClause,
    ColonToken,
    ComputedPropertyName,
    ConciseBody,
    ConditionalExpression,
    ContinueStatement,
    createBaseNodeFactory,
    createParenthesizerRules,
    Debug,
    Declaration,
    DeclarationName,
    DefaultClause,
    DotDotDotToken,
    DoWhileStatement,
    ElementAccessExpression,
    EmitNode,
    emptyArray,
    EmptyStatement,
    EndOfFileToken,
    EntityName,
    Expression,
    ExpressionStatement,
    FloatLiteral,
    ForEachInitializer,
    ForEachStatement,
    ForInitializer,
    ForStatement,
    FunctionDeclaration,
    getIdentifierTypeArguments,
    hasProperty,
    Identifier,
    identity,
    IfStatement,
    IndexSignatureDeclaration,
    InheritDeclaration,
    InlineClosureExpression,
    IntLiteral,
    isIdentifier,
    isLocalName,
    isNodeArray,
    isNodeKind,
    isSourceFile,
    KeywordSyntaxKind,
    KeywordToken,
    KeywordTypeNode,
    KeywordTypeSyntaxKind,
    LeftHandSideExpression,
    LiteralToken,
    LiteralTypeNode,
    MemberName,
    memoize,
    Modifier,
    ModifierSyntaxKind,
    ModifierToken,
    Mutable,
    MutableNodeArray,
    Node,
    NodeArray,
    NodeFactory,
    NodeFlags,
    nullParenthesizerRules,
    ParameterDeclaration,
    ParenthesizedExpression,
    ParenthesizedTypeNode,
    PostfixUnaryExpression,
    PostfixUnaryOperator,
    PrefixUnaryExpression,
    PrefixUnaryOperator,
    PropertyAccessExpression,
    PropertyName,
    PunctuationSyntaxKind,
    PunctuationToken,
    QualifiedName,
    QuestionToken,
    ReturnStatement,
    setIdentifierTypeArguments,
    SourceFile,
    Statement,
    StringLiteral,
    SwitchStatement,
    SyntaxKind,
    Token,
    TokenFlags,
    TypeElement,
    TypeLiteralNode,
    TypeNode,
    TypeParameterDeclaration,
    TypeReferenceNode,
    UnionTypeNode,
    VariableDeclaration,
    VariableDeclarationList,
    VariableStatement,
    WhileStatement,
} from "../_namespaces/lpc.js";
import { nullNodeConverters } from "./nodeConverters.js";

/** @internal */
export const enum NodeFactoryFlags {
    None = 0,
    // Disables the parenthesizer rules for the factory.
    NoParenthesizerRules = 1 << 0,
    // Disables the node converters for the factory.
    NoNodeConverters = 1 << 1,
    // Ensures new `PropertyAccessExpression` nodes are created with the `NoIndentation` emit flag set.
    NoIndentationOnFreshPropertyAccess = 1 << 2,
    // Do not set an `original` pointer when updating a node.
    NoOriginalNode = 1 << 3,
}

const nodeFactoryPatchers: ((factory: NodeFactory) => void)[] = [];

/** @internal */
export function addNodeFactoryPatcher(fn: (factory: NodeFactory) => void) {
    nodeFactoryPatchers.push(fn);
}

/**
 * Creates a `NodeFactory` that can be used to create and update a syntax tree.
 * @param flags Flags that control factory behavior.
 * @param baseFactory A `BaseNodeFactory` used to create the base `Node` objects.
 *
 * @internal
 */
export function createNodeFactory(flags: NodeFactoryFlags, baseFactory: BaseNodeFactory): NodeFactory {
    const setOriginal = flags & NodeFactoryFlags.NoOriginalNode ? identity : setOriginalNode;

    // Lazily load the parenthesizer, node converters, and some factory methods until they are used.
    const parenthesizerRules = memoize(() => flags & NodeFactoryFlags.NoParenthesizerRules ? nullParenthesizerRules : createParenthesizerRules(factory));
    const converters = memoize(() => nullNodeConverters);//flags & NodeFactoryFlags.NoNodeConverters ? nullNodeConverters : createNodeConverters(factory));

    const factory: NodeFactory = {
        get parenthesizer() {
            return parenthesizerRules();
        },
        baseFactory,
        flags,
        get converters() {
            return converters();
        },
        
        createToken,
        createSourceFile,
        createNodeArray,
        createIdentifier,

        // literals
        createIntLiteral,
        createFloatLiteral,
        createStringLiteral,
        createLiteralLikeNode,

        // type elements,
        createIndexSignature,

        // types
        createArrayTypeNode,
        createUnionTypeNode,
        createParenthesizedType,
        createKeywordTypeNode,
        createTypeReferenceNode,
        createLiteralTypeNode,
        createTypeLiteralNode,

        // Names
        createQualifiedName,
        createComputedPropertyName,

        // statements
        createBlock,
        createVariableDeclarationList,
        createVariableStatement,
        createVariableDeclaration,
        createFunctionDeclaration,
        createExpressionStatement,
        createReturnStatement,
        createBreakStatement,
        createContinueStatement,
        createInheritDeclaration,
        createIfStatement,
        createCaseBlock,
        createSwitchStatement,
        createCaseClause,
        createDefaultClause,
        createForStatement,
        createForEachStatement,
        createDoWhileStatement,
        createWhileStatement,
        createParameterDeclaration,

        // Expressions
        createParenthesizedExpression,
        createConditionalExpression,
        createBinaryExpression,
        createCallExpression,
        createInlineClosure,
        createPropertyAccessExpression,
        createPrefixUnaryExpression,
        createPostfixUnaryExpression,
        createElementAccessExpression,


        cloneNode,
    };

    return factory;

    /**** TOP-LEVEL *****/
    function createSourceFile(
        statements: readonly Statement[],
        endOfFileToken: EndOfFileToken,
        flags: NodeFlags
    ) {
        const node = baseFactory.createBaseSourceFileNode(
            SyntaxKind.SourceFile
        ) as Mutable<SourceFile>;
        node.statements = createNodeArray(statements);
        node.endOfFileToken = endOfFileToken;
        node.flags |= flags;
        node.text = "";
        node.fileName = "";

        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        node.endFlowNode = undefined;

        node.nodeCount = 0;
        node.identifierCount = 0;
        node.symbolCount = 0;
        node.parseDiagnostics = undefined!;
        node.bindDiagnostics = undefined!;
        //node.pragmas = undefined!;
        node.identifiers = undefined!;
        return node;
    }

    function createNodeArray<T extends Node>(
        elements?: readonly T[],
        hasTrailingComma?: boolean
    ): NodeArray<T> {
        if (elements === undefined || elements === emptyArray) {
            elements = [];
        } else if (isNodeArray(elements)) {
            if (
                hasTrailingComma === undefined ||
                elements.hasTrailingComma === hasTrailingComma
            ) {
                // Ensure the transform flags have been aggregated for this NodeArray
                Debug.attachNodeArrayDebugInfo(elements);
                return elements;
            }

            // This *was* a `NodeArray`, but the `hasTrailingComma` option differs. Recreate the
            // array with the same elements, text range, and transform flags but with the updated
            // value for `hasTrailingComma`
            const array = elements.slice() as MutableNodeArray<T>;
            array.pos = elements.pos;
            array.end = elements.end;
            array.hasTrailingComma = hasTrailingComma;
            Debug.attachNodeArrayDebugInfo(array);
            return array;
        }

        // Since the element list of a node array is typically created by starting with an empty array and
        // repeatedly calling push(), the list may not have the optimal memory layout. We invoke slice() for
        // small arrays (1 to 4 elements) to give the VM a chance to allocate an optimal representation.
        const length = elements.length;
        const array = (
            length >= 1 && length <= 4 ? elements.slice() : elements
        ) as MutableNodeArray<T>;
        array.pos = -1;
        array.end = -1;
        array.hasTrailingComma = !!hasTrailingComma;
        Debug.attachNodeArrayDebugInfo(array);
        return array;
    }

    function createBaseToken<T extends Node>(kind: T["kind"]) {
        return baseFactory.createBaseTokenNode(kind) as Mutable<T>;
    }

    function createToken(token: SyntaxKind.EndOfFileToken): EndOfFileToken;
    function createToken<TKind extends PunctuationSyntaxKind>(token: TKind): PunctuationToken<TKind>; // prettier-ignore
    function createToken(token: SyntaxKind.Unknown): Token<SyntaxKind.Unknown>;
    function createToken<TKind extends KeywordTypeSyntaxKind>(token: TKind): KeywordTypeNode<TKind>; // prettier-ignore
    function createToken<TKind extends ModifierSyntaxKind>(token: TKind): ModifierToken<TKind>; // prettier-ignore
    function createToken<TKind extends KeywordSyntaxKind>(token: TKind): KeywordToken<TKind>; // prettier-ignore
    function createToken<TKind extends SyntaxKind>(token: TKind): Token<TKind>;
    function createToken<TKind extends SyntaxKind>(token: TKind) {
        const node = createBaseToken<Token<TKind>>(token);
        return node;
    }

    function createBaseNode<T extends Node>(kind: T["kind"]) {
        return baseFactory.createBaseNode(kind) as Mutable<T>;
    }

    function createBaseDeclaration<T extends Declaration>(kind: T["kind"]) {
        const node = createBaseNode(kind);
        node.symbol = undefined!; // initialized by binder
        return node;
    }

    //
    // Identifiers
    //

    function createBaseIdentifier(text: string) {
        const node = baseFactory.createBaseIdentifierNode(
            SyntaxKind.Identifier
        ) as Mutable<Identifier>;
        node.text = text;
        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        node.symbol = undefined!; // initialized by checker
        return node;
    }

    function cloneSourceFileWorker(source: SourceFile) {
        // TODO: This mechanism for cloning results in megamorphic property reads and writes. In future perf-related
        //       work, we should consider switching explicit property assignments instead of using `for..in`.
        const node = baseFactory.createBaseSourceFileNode(SyntaxKind.SourceFile) as Mutable<SourceFile>;
        node.flags |= source.flags & ~NodeFlags.Synthesized;
        for (const p in source) {
            if (hasProperty(node, p) || !hasProperty(source, p)) {
                continue;
            }
            if (p === "emitNode") {
                node.emitNode = undefined;
                continue;
            }
            (node as any)[p] = (source as any)[p];
        }
        return node;
    }

    function cloneSourceFile(source: SourceFile) {
        const node =  /*source.redirectInfo ? cloneRedirectedSourceFile(source) : */cloneSourceFileWorker(source);
        setOriginal(node, source);
        return node;
    }

    
    function cloneIdentifier(node: Identifier): Identifier {
        const clone = createBaseIdentifier(node.text);
        clone.flags |= node.flags & ~NodeFlags.Synthesized;
        clone.jsDoc = node.jsDoc;
        clone.flowNode = node.flowNode;
        clone.symbol = node.symbol;
        clone.transformFlags = node.transformFlags;
        setOriginal(clone, node);

        // clone type arguments for emitter/typeWriter
        const typeArguments = getIdentifierTypeArguments(node);
        if (typeArguments) setIdentifierTypeArguments(clone, typeArguments);
        return clone;
    }

    // @api
    function createIndexSignature(
        modifiers: readonly Modifier[] | undefined,
        parameters: readonly ParameterDeclaration[],
        type: TypeNode | undefined,
    ): IndexSignatureDeclaration {
        const node = createBaseDeclaration<IndexSignatureDeclaration>(SyntaxKind.IndexSignature);
        node.modifiers = asNodeArray(modifiers);
        node.parameters = asNodeArray(parameters);
        node.type = type!; // TODO(rbuckton): We mark this as required in IndexSignatureDeclaration, but it looks like the parser allows it to be elided.
        //node.transformFlags = TransformFlags.ContainsTypeScript;

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        node.typeArguments = undefined; // used in quick info
        return node;
    }


    // @api
    function cloneNode<T extends Node | undefined>(node: T): T;
    function cloneNode<T extends Node>(node: T) {
        // We don't use "clone" from core.ts here, as we need to preserve the prototype chain of
        // the original node. We also need to exclude specific properties and only include own-
        // properties (to skip members already defined on the shared prototype).
        if (node === undefined) {
            return node;
        }
        if (isSourceFile(node)) {
            return cloneSourceFile(node) as T & SourceFile;
        }
        // if (isGeneratedIdentifier(node)) {
        //     return cloneGeneratedIdentifier(node) as T & GeneratedIdentifier;
        // }
        if (isIdentifier(node)) {
            return cloneIdentifier(node) as T & Identifier;
        }
        // if (isGeneratedPrivateIdentifier(node)) {
        //     return cloneGeneratedPrivateIdentifier(node) as T & GeneratedPrivateIdentifier;
        // }
        // if (isPrivateIdentifier(node)) {
        //     return clonePrivateIdentifier(node) as T & PrivateIdentifier;
        // }

        const clone = !isNodeKind(node.kind) ? baseFactory.createBaseTokenNode(node.kind) as T :
            baseFactory.createBaseNode(node.kind) as T;

        (clone as Mutable<T>).flags |= node.flags & ~NodeFlags.Synthesized;
        (clone as Mutable<T>).transformFlags = node.transformFlags;
        setOriginal(clone, node);

        for (const key in node) {
            if (hasProperty(clone, key) || !hasProperty(node, key)) {
                continue;
            }

            clone[key] = node[key];
        }

        return clone;
    }

    // @api
    function createIdentifier(text: string): Identifier {
        const node = createBaseIdentifier(text);
        return node;
    }

    // @api
    function createLiteralTypeNode(literal: LiteralTypeNode["literal"]) {
        const node = createBaseNode<LiteralTypeNode>(SyntaxKind.LiteralType);
        node.literal = literal;
        //node.transformFlags = TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function createTypeReferenceNode(typeName: string | EntityName, typeArguments: readonly TypeNode[] | undefined) {
        const node = createBaseNode<TypeReferenceNode>(SyntaxKind.TypeReference);
        node.typeName = asName(typeName);
        node.typeArguments = typeArguments && parenthesizerRules().parenthesizeTypeArguments(createNodeArray(typeArguments));
        //node.transformFlags = TransformFlags.ContainsTypeScript;
        return node;
    }
    
    // @api
    function createIntLiteral(
        value: string | number,
        numericLiteralFlags: TokenFlags = TokenFlags.None
    ): IntLiteral {
        const text = typeof value === "number" ? value + "" : value;
        //Debug.assert(text.charCodeAt(0) !== CharacterCodes.minus, "Negative numbers should be created in combination with createPrefixUnaryExpression");
        const node = createBaseDeclaration<IntLiteral>(SyntaxKind.IntLiteral);
        node.text = text;
        node.numericLiteralFlags = numericLiteralFlags;
        return node;
    }

    // @api
    function createFloatLiteral(
        value: string | number,
        numericLiteralFlags: TokenFlags = TokenFlags.None
    ): FloatLiteral {
        const text = typeof value === "number" ? value + "" : value;
        //Debug.assert(text.charCodeAt(0) !== CharacterCodes.minus, "Negative numbers should be created in combination with createPrefixUnaryExpression");
        const node = createBaseDeclaration<FloatLiteral>(
            SyntaxKind.FloatLiteral
        );
        node.text = text;
        node.numericLiteralFlags = numericLiteralFlags;
        return node;
    }

    function createBaseStringLiteral(text: string) {
        const node = createBaseDeclaration<StringLiteral>(
            SyntaxKind.StringLiteral
        );
        node.text = text;
        return node;
    }

    // @api
    function createStringLiteral(
        text: string,
        hasExtendedUnicodeEscape?: boolean
    ): StringLiteral {
        const node = createBaseStringLiteral(text);
        node.hasExtendedUnicodeEscape = hasExtendedUnicodeEscape;
        return node;
    }

    // @api
    function createArrayTypeNode(elementType: TypeNode): ArrayTypeNode {
        const node = createBaseNode<ArrayTypeNode>(SyntaxKind.ArrayType);
        node.elementType = elementType; // parenthesizerRules().parenthesizeNonArrayTypeOfPostfixType(elementType);
        return node;
    }

    function createUnionTypeNode(types: readonly TypeNode[]): UnionTypeNode {
        const node = createBaseNode<UnionTypeNode>(SyntaxKind.UnionType);
        node.types = factory.createNodeArray(types); //parenthesize(types));
        return node;
    }

    function asNodeArray<T extends Node>(array: readonly T[]): NodeArray<T>;
    function asNodeArray<T extends Node>(
        array: readonly T[] | undefined
    ): NodeArray<T> | undefined;
    function asNodeArray<T extends Node>(
        array: readonly T[] | undefined
    ): NodeArray<T> | undefined {
        return array?.length > 0 ? createNodeArray(array) : undefined;
    }

    // @api
    function createVariableDeclarationList(
        declarations: readonly VariableDeclaration[],
        flags = NodeFlags.None
    ): VariableDeclarationList {
        const node = createBaseNode<VariableDeclarationList>(
            SyntaxKind.VariableDeclarationList
        );
        node.flags |= flags & NodeFlags.BlockScoped;
        node.declarations = createNodeArray(declarations);
        return node;
    }

    // @api
    function createVariableStatement(
        modifiers: readonly Modifier[] | undefined,
        declarationList:
            | VariableDeclarationList
            | readonly VariableDeclaration[]
    ): VariableStatement {
        const node = createBaseNode<VariableStatement>(
            SyntaxKind.VariableStatement
        );
        node.modifiers = asNodeArray(modifiers);
        node.declarationList = Array.isArray(declarationList)
            ? createVariableDeclarationList(declarationList)
            : (declarationList as VariableDeclarationList);
        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function createVariableDeclaration(
        name: string | BindingName,
        type: TypeNode | undefined,
        initializer: Expression | undefined
    ): VariableDeclaration {
        const node = createBaseDeclaration<VariableDeclaration>(
            SyntaxKind.VariableDeclaration
        );
        node.name = asName(name);
        node.type = type;
        node.initializer = asInitializer(initializer);
        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }

    function asInitializer(node: Expression | undefined) {
        return node; // && parenthesizerRules().parenthesizeExpressionForDisallowedComma(node);
    }

    function asName<
        T extends
            | DeclarationName
            | Identifier
            | BindingName
            | PropertyName
            | EntityName
            | undefined
    >(name: string | T): T | Identifier {
        return typeof name === "string" ? createIdentifier(name) : name;
    }

    // @api
    function createConditionalExpression(
        condition: Expression,
        questionToken: QuestionToken | undefined,
        whenTrue: Expression,
        colonToken: ColonToken | undefined,
        whenFalse: Expression
    ): ConditionalExpression {
        const node = createBaseNode<ConditionalExpression>(
            SyntaxKind.ConditionalExpression
        );
        node.condition = condition;
        node.questionToken =
            questionToken ?? createToken(SyntaxKind.QuestionToken);
        node.whenTrue = whenTrue;
        node.colonToken = colonToken ?? createToken(SyntaxKind.ColonToken);
        node.whenFalse = whenFalse;
        return node;
    }

    // @api
    function createBinaryExpression(left: Expression, operator: BinaryOperator | BinaryOperatorToken, right: Expression): BinaryExpression {
        const node = createBaseDeclaration<BinaryExpression>(SyntaxKind.BinaryExpression);
        const operatorToken = asToken(operator);
        node.left = left;
        node.operatorToken = operatorToken;
        node.right = right;
        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }

    function asToken<TKind extends SyntaxKind>(value: TKind | Token<TKind>): Token<TKind> {
        return typeof value === "number" ? createToken(value) : value;
    }

    // @api
    function createBlock(statements: readonly Statement[], multiLine?: boolean): Block {
        const node = createBaseNode<Block>(SyntaxKind.Block);
        node.statements = createNodeArray(statements);
        node.multiLine = multiLine;

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        return node;
    }

    // @api
    function createFunctionDeclaration(
        modifiers: readonly Modifier[] | undefined,
        name: string | Identifier | undefined,
        parameters: readonly ParameterDeclaration[],
        type: TypeNode | undefined,
        body: Block | undefined
    ): FunctionDeclaration {
        const node = createBaseDeclaration<FunctionDeclaration>(
            SyntaxKind.FunctionDeclaration
        );
        node.modifiers = asNodeArray(modifiers);
        node.name = asName(name);        
        node.parameters = createNodeArray(parameters);
        node.type = type;
        node.body = body;

        node.typeArguments = undefined; // used in quick info
        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        node.endFlowNode = undefined;
        node.returnFlowNode = undefined;
        return node;
    }

    // @api
    function createLiteralLikeNode(kind: LiteralToken["kind"], text: string): LiteralToken {
        switch (kind) {
            case SyntaxKind.IntLiteral:
                return createIntLiteral(text, /*numericLiteralFlags*/ 0);
            case SyntaxKind.FloatLiteral:
                return createFloatLiteral(text);
            case SyntaxKind.StringLiteral:
                return createStringLiteral(text, /*isSingleQuote*/ undefined);
        }
    }

    function createBaseCallExpression(expression: LeftHandSideExpression,  argumentsArray: NodeArray<Expression>) {
        const node = createBaseDeclaration<CallExpression>(SyntaxKind.CallExpression);
        node.expression = expression;                
        node.arguments = argumentsArray;
        
        // node.transformFlags |= propagateChildFlags(node.expression) |
        //     propagateChildFlags(node.questionDotToken) |
        //     propagateChildrenFlags(node.typeArguments) |
        //     propagateChildrenFlags(node.arguments);
        // if (node.typeArguments) {
        //     node.transformFlags |= TransformFlags.ContainsTypeScript;
        // }
        // if (isSuperProperty(node.expression)) {
        //     node.transformFlags |= TransformFlags.ContainsLexicalThis;
        // }
        return node;
    }

    // @api
    function createCallExpression(expression: Expression, argumentsArray: readonly Expression[] | undefined): CallExpression {
        const node = createBaseCallExpression(
            expression as LeftHandSideExpression,                        
            argumentsArray as NodeArray<Expression>,
        );
        // if (isImportKeyword(node.expression)) {
        //     node.transformFlags |= TransformFlags.ContainsDynamicImport;
        // }
        return node;
    }

    // @api
    function createInlineClosure(body: ConciseBody): InlineClosureExpression {
        const node = createBaseDeclaration<InlineClosureExpression>(SyntaxKind.InlineClosureExpression);
        node.body = body;

        node.typeArguments = undefined; // used in quick info
        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        node.endFlowNode = undefined;
        node.returnFlowNode = undefined;
        return node;
    }

    // @api
    function createExpressionStatement(expression: Expression): ExpressionStatement {
        const node = createBaseNode<ExpressionStatement>(SyntaxKind.ExpressionStatement);
        node.expression = expression;//parenthesizerRules().parenthesizeExpressionOfExpressionStatement(expression);
        //node.transformFlags |= propagateChildFlags(node.expression);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function createReturnStatement(expression?: Expression): ReturnStatement {
        const node = createBaseNode<ReturnStatement>(SyntaxKind.ReturnStatement);
        node.expression = expression;
        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function createBreakStatement(label?: string | Identifier): BreakStatement {
        const node = createBaseNode<BreakStatement>(SyntaxKind.BreakStatement);
        node.label = asName(label);
        // node.transformFlags |= propagateChildFlags(node.label) |
        //     TransformFlags.ContainsHoistedDeclarationOrCompletion;

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function createContinueStatement(label?: string | Identifier): ContinueStatement {
        const node = createBaseNode<ContinueStatement>(SyntaxKind.ContinueStatement);
        node.label = asName(label);
        // node.transformFlags |= propagateChildFlags(node.label) |
        //     TransformFlags.ContainsHoistedDeclarationOrCompletion;

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api 
    function createInheritDeclaration(inheritClause: StringLiteral | BinaryExpression, modifiers: readonly Modifier[] | undefined): InheritDeclaration {
        const node = createBaseNode<InheritDeclaration>(SyntaxKind.InheritDeclaration);
        node.modifiers = asNodeArray(modifiers);
        node.inheritClause = inheritClause;
        
        return node;
    }

    function asEmbeddedStatement<T extends Node>(statement: T): T | EmptyStatement;
    function asEmbeddedStatement<T extends Node>(statement: T | undefined): T | EmptyStatement | undefined;
    function asEmbeddedStatement<T extends Node>(statement: T | undefined): T | EmptyStatement | undefined {
        return statement;
        //return statement && isNotEmittedStatement(statement) ? setTextRange(setOriginal(createEmptyStatement(), statement), statement) : statement;
    }
    
    // @api
    function createIfStatement(expression: Expression, thenStatement: Statement, elseStatement?: Statement): IfStatement {
        const node = createBaseNode<IfStatement>(SyntaxKind.IfStatement);
        node.expression = expression;
        node.thenStatement = asEmbeddedStatement(thenStatement);
        node.elseStatement = asEmbeddedStatement(elseStatement);
        // node.transformFlags |= propagateChildFlags(node.expression) |
        //     propagateChildFlags(node.thenStatement) |
        //     propagateChildFlags(node.elseStatement);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api 
    function createCaseBlock(clauses: readonly CaseOrDefaultClause[]): CaseBlock {
        const node = createBaseNode<CaseBlock>(SyntaxKind.CaseBlock);
        node.clauses = createNodeArray(clauses);
        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        return node;
    }

    // @api
    function createSwitchStatement(expression: Expression, preBlock: NodeArray<Statement>, caseBlock: CaseBlock): SwitchStatement {
        const node = createBaseNode<SwitchStatement>(SyntaxKind.SwitchStatement);
        node.expression = expression;
        node.caseBlock = caseBlock;
        node.preBlock = preBlock;
        // node.transformFlags |= propagateChildFlags(node.expression) |
        //     propagateChildFlags(node.caseBlock);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function createDefaultClause(statements: readonly Statement[]): DefaultClause {
        const node = createBaseNode<DefaultClause>(SyntaxKind.DefaultClause);
        node.statements = createNodeArray(statements);
        //node.transformFlags = propagateChildrenFlags(node.statements);
        return node;
    }

    // @api
    function createCaseClause(expression: Expression, statements: readonly Statement[]): CaseClause {
        const node = createBaseNode<CaseClause>(SyntaxKind.CaseClause);
        node.expression = expression;//parenthesizerRules().parenthesizeExpressionForDisallowedComma(expression);
        node.statements = createNodeArray(statements);
        // node.transformFlags |= propagateChildFlags(node.expression) |
        //     propagateChildrenFlags(node.statements);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }

    function createBasePropertyAccessExpression(expression: LeftHandSideExpression, name: MemberName) {
        const node = createBaseDeclaration<PropertyAccessExpression>(SyntaxKind.PropertyAccessExpression);
        node.expression = expression;        
        node.name = name;
        // node.transformFlags = propagateChildFlags(node.expression) |
        //     propagateChildFlags(node.questionDotToken) |
        //     (isIdentifier(node.name) ?
        //         propagateIdentifierNameFlags(node.name) :
        //         propagateChildFlags(node.name) | TransformFlags.ContainsPrivateIdentifierInExpression);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function createPropertyAccessExpression(expression: Expression, name: string | Identifier): PropertyAccessExpression {
        const node = createBasePropertyAccessExpression(
            parenthesizerRules().parenthesizeLeftSideOfAccess(expression, /*optionalChain*/ false),            
            asName(name),
        );
               
        // TODO handle super here?
        
        return node;
    }

    // @api
    function createForStatement(initializer: ForInitializer | undefined, condition: Expression | undefined, incrementor: Expression | undefined, statement: Statement): ForStatement {
        const node = createBaseNode<ForStatement>(SyntaxKind.ForStatement);
        node.initializer = initializer;
        node.condition = condition;
        node.incrementor = incrementor;
        node.statement = asEmbeddedStatement(statement);
        // node.transformFlags |= propagateChildFlags(node.initializer) |
        //     propagateChildFlags(node.condition) |
        //     propagateChildFlags(node.incrementor) |
        //     propagateChildFlags(node.statement);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function createForEachStatement(initializer: ForEachInitializer | undefined, range: Expression | undefined, statement: Statement): ForEachStatement {
        const node = createBaseNode<ForEachStatement>(SyntaxKind.ForEachStatement);
        node.initializer = initializer;
        node.expression = range;        
        node.statement = asEmbeddedStatement(statement);
        // node.transformFlags |= propagateChildFlags(node.initializer) |
        //     propagateChildFlags(node.condition) |
        //     propagateChildFlags(node.incrementor) |
        //     propagateChildFlags(node.statement);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function createDoWhileStatement(statement: Statement, expression: Expression): DoWhileStatement {
        const node = createBaseNode<DoWhileStatement>(SyntaxKind.DoWhileStatement);
        node.statement = asEmbeddedStatement(statement);
        node.expression = expression;
        // node.transformFlags |= propagateChildFlags(node.statement) |
        //     propagateChildFlags(node.expression) |
        //     TransformFlags.ContainsHoistedDeclarationOrCompletion;

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function createWhileStatement(statement: Statement, expression: Expression): WhileStatement {
        const node = createBaseNode<WhileStatement>(SyntaxKind.WhileStatement);
        node.statement = asEmbeddedStatement(statement);
        node.expression = expression;
        // node.transformFlags |= propagateChildFlags(node.statement) |
        //     propagateChildFlags(node.expression) |
        //     TransformFlags.ContainsHoistedDeclarationOrCompletion;

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function createPostfixUnaryExpression(operand: Expression, operator: PostfixUnaryOperator): PostfixUnaryExpression {
        const node = createBaseNode<PostfixUnaryExpression>(SyntaxKind.PostfixUnaryExpression);
        node.operator = operator;
        node.operand = operand as LeftHandSideExpression;//TODO parenthesizerRules().parenthesizeOperandOfPostfixUnary(operand);
        //node.transformFlags |= propagateChildFlags(node.operand);
        // Only set this flag for non-generated identifiers and non-"local" names. See the
        // comment in `visitPreOrPostfixUnaryExpression` in module.ts
        // if (
        //     isIdentifier(node.operand) &&
        //     !isGeneratedIdentifier(node.operand) &&
        //     !isLocalName(node.operand)
        // ) {
        //     node.transformFlags |= TransformFlags.ContainsUpdateExpressionForIdentifier;
        // }
        return node;
    }

     // @api
     function createParameterDeclaration(
        modifiers: readonly Modifier[] | undefined,
        dotDotDotToken: DotDotDotToken | undefined,
        name: string | BindingName,
        ampToken?: AmpersandToken,
        type?: TypeNode,
        initializer?: Expression,
    ): ParameterDeclaration {
        const node = createBaseDeclaration<ParameterDeclaration>(SyntaxKind.Parameter);
        node.modifiers = asNodeArray(modifiers);
        node.dotDotDotToken = dotDotDotToken;
        node.name = asName(name);        
        node.ampToken = ampToken;
        node.type = type;
        node.initializer = asInitializer(initializer);        
        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }

    function createBaseElementAccessExpression(expression: LeftHandSideExpression, argumentExpression: Expression) {
        const node = createBaseDeclaration<ElementAccessExpression>(SyntaxKind.ElementAccessExpression);
        node.expression = expression;        
        node.argumentExpression = argumentExpression;
        // node.transformFlags |= propagateChildFlags(node.expression) |
        //     propagateChildFlags(node.questionDotToken) |
        //     propagateChildFlags(node.argumentExpression);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    function asExpression<T extends Expression | undefined>(value: string | number | T): T | StringLiteral | IntLiteral {
        return typeof value === "string" ? createStringLiteral(value) :
            typeof value === "number" ? createIntLiteral(value) :
            //typeof value === "boolean" ? value ? createTrue() : createFalse() :
            value;
    }

    // @api
    function createElementAccessExpression(expression: Expression, index: number | Expression) {
        const node = createBaseElementAccessExpression(
            expression as LeftHandSideExpression, // TODO parenthesizerRules().parenthesizeLeftSideOfAccess(expression, /*optionalChain*/ false),            
            asExpression(index),
        );
        // if (isSuperKeyword(expression)) {
        //     // super method calls require a lexical 'this'
        //     // super method calls require 'super' hoisting in ES2017 and ES2018 async functions and async generators
        //     node.transformFlags |= TransformFlags.ContainsES2017 |
        //         TransformFlags.ContainsES2018;
        // }
        return node;
    }


    // @api
    function createQualifiedName(left: EntityName, right: string | Identifier) {
        const node = createBaseNode<QualifiedName>(SyntaxKind.QualifiedName);
        node.left = left;
        node.right = asName(right);
        // node.transformFlags |= propagateChildFlags(node.left) |
        //     propagateIdentifierNameFlags(node.right);

        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }
    
    // @api
    function createComputedPropertyName(expression: Expression) {
        const node = createBaseNode<ComputedPropertyName>(SyntaxKind.ComputedPropertyName);
        node.expression = expression;// TODO  parenthesizerRules().parenthesizeExpressionOfComputedPropertyName(expression);
        // node.transformFlags |= propagateChildFlags(node.expression) |
        //     TransformFlags.ContainsES2015 |
        //     TransformFlags.ContainsComputedPropertyName;
        return node;
    }

    // @api
    function createParenthesizedExpression(expression: Expression) {
        const node = createBaseNode<ParenthesizedExpression>(SyntaxKind.ParenthesizedExpression);
        node.expression = expression;
        //node.transformFlags = propagateChildFlags(node.expression);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }

    // @api
    function createParenthesizedType(type: TypeNode) {
        const node = createBaseNode<ParenthesizedTypeNode>(SyntaxKind.ParenthesizedType);
        node.type = type;
        //node.transformFlags = TransformFlags.ContainsTypeScript;
        return node;
    }

    // @api
    function createKeywordTypeNode<TKind extends KeywordTypeSyntaxKind>(kind: TKind) {
        return createToken(kind);
    }

    // @api
    function createPrefixUnaryExpression(operator: PrefixUnaryOperator, operand: Expression) {
        const node = createBaseNode<PrefixUnaryExpression>(SyntaxKind.PrefixUnaryExpression);
        node.operator = operator;
        node.operand = parenthesizerRules().parenthesizeOperandOfPrefixUnary(operand);
        //node.transformFlags |= propagateChildFlags(node.operand);
        // Only set this flag for non-generated identifiers and non-"local" names. See the
        // comment in `visitPreOrPostfixUnaryExpression` in module.ts
        // if (
        //     (operator === SyntaxKind.PlusPlusToken || operator === SyntaxKind.MinusMinusToken) &&
        //     isIdentifier(node.operand) &&
        //     //!isGeneratedIdentifier(node.operand) &&
        //     !isLocalName(node.operand)
        // ) {
        //     node.transformFlags |= TransformFlags.ContainsUpdateExpressionForIdentifier;
        // }
        return node;
    }

    // @api
    function createTypeLiteralNode(members: readonly TypeElement[] | undefined) {
        const node = createBaseDeclaration<TypeLiteralNode>(SyntaxKind.TypeLiteral);
        node.members = createNodeArray(members);
        // node.transformFlags = TransformFlags.ContainsTypeScript;
        return node;
    }
}

// Utilities

export function setOriginalNode<T extends Node>(
    node: T,
    original: Node | undefined
): T {
    if (node.original !== original) {
        node.original = original;
        if (original) {
            const emitNode = original.emitNode;
            if (emitNode)
                node.emitNode = mergeEmitNode(emitNode, node.emitNode);
        }
    }
    return node;
}

function mergeEmitNode(
    sourceEmitNode: EmitNode,
    destEmitNode: EmitNode | undefined
) {
    const {
        flags,
        // internalFlags,
        // leadingComments,
        // trailingComments,
        // commentRange,
        // sourceMapRange,
        // tokenSourceMapRanges,
        // constantValue,
        // helpers,
        // startsOnNewLine,
        // snippetElement,
        // classThis,
        // assignedName,
    } = sourceEmitNode;
    if (!destEmitNode) destEmitNode = {} as EmitNode;

    // NOTE: We should have one or more lines here for each property in EmitNode, even if the line
    // consists only of a comment indicating the property does not merge

    // // `flags` overwrites the destination
    // if (flags) {
    //     destEmitNode.flags = flags;
    // }

    // // `internalFlags` overwrites the destination. We do not copy over the immutability of the source.
    // // if (internalFlags) {
    // //     destEmitNode.internalFlags = internalFlags & ~InternalEmitFlags.Immutable;
    // // }

    // // `annotatedNodes` are not merged as they should only present on the parse tree node of a `SourceFile`.

    // // `leadingComments` are concatenated with any existing leading comments on the destination
    // if (leadingComments) {
    //     // We use `.slice()` in case `destEmitNode.leadingComments` is pushed to later
    //     destEmitNode.leadingComments = addRange(leadingComments.slice(), destEmitNode.leadingComments);
    // }

    // // `trailingComments` are concatenated with any existing trailing comments on the destination
    // if (trailingComments) {
    //     // We use `.slice()` in case `destEmitNode.trailingComments` is pushed to later
    //     destEmitNode.trailingComments = addRange(trailingComments.slice(), destEmitNode.trailingComments);
    // }

    // // `commentRange` overwrites the destination
    // if (commentRange) {
    //     destEmitNode.commentRange = commentRange;
    // }

    // // `sourceMapRange` overwrites the destination
    // if (sourceMapRange) {
    //     destEmitNode.sourceMapRange = sourceMapRange;
    // }

    // // `constantValue` overwrites the destination
    // if (constantValue !== undefined) {
    //     destEmitNode.constantValue = constantValue;
    // }

    // // `externalHelpersModuleName` is not merged
    // // `externalHelpers` is not merged

    // // `helpers` are merged into the destination
    // if (helpers) {
    //     for (const helper of helpers) {
    //         destEmitNode.helpers = appendIfUnique(destEmitNode.helpers, helper);
    //     }
    // }

    // // `startsOnNewLine` overwrites the destination
    // if (startsOnNewLine !== undefined) {
    //     destEmitNode.startsOnNewLine = startsOnNewLine;
    // }

    // // `snippetElement` overwrites the destination
    // if (snippetElement !== undefined) {
    //     destEmitNode.snippetElement = snippetElement;
    // }

    // // `typeNode` is not merged as it only applies to comment emit for a variable declaration.
    // // TODO: `typeNode` should overwrite the destination

    // // `classThis` overwrites the destination
    // if (classThis) {
    //     destEmitNode.classThis = classThis;
    // }

    // // `assignedName` overwrites the destination
    // if (assignedName) {
    //     destEmitNode.assignedName = assignedName;
    // }

    // // `identifierTypeArguments` are not merged as they only apply to an Identifier in quick info
    // // `autoGenerate` is not merged as it only applies to a specific generated Identifier/PrivateIdentifier
    // // `generatedImportReference` is not merged as it only applies to an Identifier

    return destEmitNode;
}


const baseFactory = createBaseNodeFactory();

function makeSynthetic(node: Node) {
    (node as Mutable<Node>).flags |= NodeFlags.Synthesized;
    return node;
}

const syntheticFactory: BaseNodeFactory = {
    createBaseSourceFileNode: kind => makeSynthetic(baseFactory.createBaseSourceFileNode(kind)),
    createBaseIdentifierNode: kind => makeSynthetic(baseFactory.createBaseIdentifierNode(kind)),    
    createBaseTokenNode: kind => makeSynthetic(baseFactory.createBaseTokenNode(kind)),
    createBaseNode: kind => makeSynthetic(baseFactory.createBaseNode(kind)),
};
export const factory = createNodeFactory(NodeFactoryFlags.NoIndentationOnFreshPropertyAccess, syntheticFactory);
