import {
    addRange,
    ArrayTypeNode,
    BaseNodeFactory,
    BinaryExpression,
    BinaryOperator,
    BinaryOperatorToken,
    BindingName,
    Block,
    BreakStatement,
    CallExpression,
    ColonToken,
    ConciseBody,
    ConditionalExpression,
    ContinueStatement,
    Debug,
    Declaration,
    DeclarationName,
    EmitNode,
    emptyArray,
    EndOfFileToken,
    EntityName,
    Expression,
    ExpressionStatement,
    FloatLiteral,
    FunctionDeclaration,
    Identifier,
    identity,
    InlineClosureExpression,
    IntLiteral,
    isNodeArray,
    LeftHandSideExpression,
    LiteralToken,
    memoize,
    Modifier,
    Mutable,
    MutableNodeArray,
    Node,
    NodeArray,
    NodeFactory,
    NodeFlags,
    ParameterDeclaration,
    PropertyName,
    QuestionToken,
    ReturnStatement,
    SourceFile,
    Statement,
    StringLiteral,
    SyntaxKind,
    Token,
    TokenFlags,
    TypeNode,
    TypeParameterDeclaration,
    UnionTypeNode,
    VariableDeclaration,
    VariableDeclarationList,
    VariableStatement,
} from "../_namespaces/lpc";

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
export function createNodeFactory(
    flags: NodeFactoryFlags,
    baseFactory: BaseNodeFactory
): NodeFactory {
    const setOriginal =
        flags & NodeFactoryFlags.NoOriginalNode ? identity : setOriginalNode;

    // Lazily load the parenthesizer, node converters, and some factory methods until they are used.
    // const parenthesizerRules = memoize(() =>
    //     flags & NodeFactoryFlags.NoParenthesizerRules
    //         ? nullParenthesizerRules
    //         : createParenthesizerRules(factory)
    // );
    // const converters = memoize(() =>
    //     flags & NodeFactoryFlags.NoNodeConverters
    //         ? nullNodeConverters
    //         : createNodeConverters(factory)
    // );

    const factory: NodeFactory = {
        baseFactory,
        flags,
        createToken,
        createSourceFile,
        createNodeArray,
        createIdentifier,

        // literals
        createIntLiteral,
        createFloatLiteral,
        createStringLiteral,
        createLiteralLikeNode,

        // types
        createArrayTypeNode,
        createUnionTypeNode,

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

        // Expressions
        createConditionalExpression,
        createBinaryExpression,
        createCallExpression,
        createInlineClosure
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
        //node.parseDiagnostics = undefined!;
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
    // function createToken<TKind extends PunctuationSyntaxKind>(token: TKind): PunctuationToken<TKind>; // prettier-ignore
    // function createToken(token: SyntaxKind.Unknown): Token<SyntaxKind.Unknown>;
    // function createToken<TKind extends KeywordTypeSyntaxKind>(token: TKind): KeywordTypeNode<TKind>; // prettier-ignore
    // function createToken<TKind extends ModifierSyntaxKind>(token: TKind): ModifierToken<TKind>; // prettier-ignore
    // function createToken<TKind extends KeywordSyntaxKind>(token: TKind): KeywordToken<TKind>; // prettier-ignore
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
    // @api
    function createIdentifier(text: string): Identifier {
        const node = createBaseIdentifier(text);
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
        return array ? createNodeArray(array) : undefined;
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
