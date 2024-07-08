import * as antlr from "antlr4ng";
import {
    FunctionModifierContext,
    ParameterContext,
} from "../parser3/LPCParser";
import { BaseNodeFactory } from "./baseNodeFactory";
import { emptyArray } from "./core";
import {
    ArrayTypeNode,
    BinaryExpression,
    BinaryOperator,
    BinaryOperatorToken,
    BindingName,
    Block,
    ColonToken,
    ConciseBody,
    ConditionalExpression,
    Declaration,
    DeclarationName,
    EndOfFileToken,
    EntityName,
    Expression,
    FloatLiteral,
    FunctionDeclaration,
    Identifier,
    InlineClosureExpression,
    IntegerLiteral,
    KeywordSyntaxKind,
    KeywordToken,
    KeywordTypeNode,
    KeywordTypeSyntaxKind,
    LiteralToken,
    Modifier,
    ModifierSyntaxKind,
    ModifierToken,
    MutableNodeArray,
    Node,
    NodeArray,
    NodeFactory,
    NodeFlags,
    PropertyName,
    PunctuationSyntaxKind,
    PunctuationToken,
    QuestionToken,
    ReturnStatement,
    SourceFile,
    Statement,
    StringLiteral,
    SyntaxKind,
    Token,
    TokenFlags,
    TypeNode,
    UnionTypeNode,
    VariableDeclaration,
    VariableDeclarationList,
    VariableStatement,
} from "./types";
import { Mutable, isNodeArray } from "./utilities";
import { Debug } from "./debug";

export function createNodeFactory(baseFactory: BaseNodeFactory): NodeFactory {
    const factory: NodeFactory = {
        createSourceFile,
        createNodeArray,
        createToken,
        createIdentifier,
        createFunctionDeclaration,
        createBlock,
        createVariableDeclaration,
        createVariableDeclarationList,
        createVariableStatement,
        createUnionTypeNode,
        createArrayTypeNode,
        createReturnStatement,
        createInlineClosure,
        createBinaryExpression,
        createConditionalExpression,
        createLiteralLikeNode,
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
        node.pragmas = undefined!;
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

    function createBaseNode<T extends Node>(kind: T["kind"]) {
        return baseFactory.createBaseNode(kind) as Mutable<T>;
    }

    function createBaseDeclaration<T extends Declaration>(kind: T["kind"]) {
        const node = createBaseNode(kind);
        node.symbol = undefined!; // initialized by binder
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

    function asToken<TKind extends SyntaxKind>(
        value: TKind | Token<TKind>
    ): Token<TKind> {
        return typeof value === "number" ? createToken(value) : value;
    }

    function asInitializer(node: Expression | undefined) {
        return node; // && parenthesizerRules().parenthesizeExpressionForDisallowedComma(node);
    }

    // @api
    function createFunctionDeclaration(
        modifiers: readonly FunctionModifierContext[] | undefined,
        name: string | Identifier | undefined,
        parameters: readonly ParameterContext[],
        type: TypeNode | undefined,
        body: Block | undefined
    ) {
        const node = createBaseDeclaration<FunctionDeclaration>(
            SyntaxKind.FunctionDeclaration
        );
        //node.modifiers = asNodeArray(modifiers);
        node.name = asName(name);
        //node.typeParameters = asNodeArray(typeParameters);
        //node.parameters = createNodeArray(parameters);
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
    function createBlock(
        statements: readonly Statement[],
        multiLine?: boolean
    ): Block {
        const node = createBaseNode<Block>(SyntaxKind.Block);
        node.statements = createNodeArray(statements);
        node.multiLine = multiLine;

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
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

    function createUnionTypeNode(
        types: readonly TypeNode[]
        //parenthesize: (nodes: readonly TypeNode[]) => readonly TypeNode[]
    ): UnionTypeNode {
        const node = createBaseNode<UnionTypeNode>(SyntaxKind.UnionType);
        node.types = factory.createNodeArray(types); //parenthesize(types));
        return node;
    }

    // @api
    function createArrayTypeNode(elementType: TypeNode): ArrayTypeNode {
        const node = createBaseNode<ArrayTypeNode>(SyntaxKind.ArrayType);
        node.elementType = elementType; // parenthesizerRules().parenthesizeNonArrayTypeOfPostfixType(elementType);
        return node;
    }

    // @api
    function createReturnStatement(expression?: Expression): ReturnStatement {
        const node = createBaseNode<ReturnStatement>(
            SyntaxKind.ReturnStatement
        );
        node.expression = expression;
        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function createInlineClosure(body: ConciseBody): InlineClosureExpression {
        const node = createBaseDeclaration<InlineClosureExpression>(
            SyntaxKind.InlineClosureExpression
        );
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
    function createBinaryExpression(
        left: Expression,
        operator: BinaryOperator | BinaryOperatorToken,
        right: Expression
    ): BinaryExpression {
        const node = createBaseDeclaration<BinaryExpression>(
            SyntaxKind.BinaryExpression
        );
        const operatorToken = asToken(operator);
        node.left = left;
        node.operatorToken = operatorToken;
        node.right = right;
        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
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
    function createIntegerLiteral(
        value: string | number,
        numericLiteralFlags: TokenFlags = TokenFlags.None
    ): IntegerLiteral {
        const text = typeof value === "number" ? value + "" : value;
        //Debug.assert(text.charCodeAt(0) !== CharacterCodes.minus, "Negative numbers should be created in combination with createPrefixUnaryExpression");
        const node = createBaseDeclaration<IntegerLiteral>(
            SyntaxKind.IntLiteral
        );
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
    function createLiteralLikeNode(
        kind: LiteralToken["kind"],
        text: string
    ): LiteralToken {
        switch (kind) {
            case SyntaxKind.IntLiteral:
                return createIntegerLiteral(text, /*numericLiteralFlags*/ 0);
            case SyntaxKind.FloatLiteral:
                return createFloatLiteral(text);
            case SyntaxKind.StringLiteral:
                return createStringLiteral(text, /*isSingleQuote*/ undefined);
        }
    }
}
