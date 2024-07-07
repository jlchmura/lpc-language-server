import * as antlr from "antlr4ng";
import {
    COMMENT_CHANNEL,
    LPCPreprocessingLexer,
} from "../parser3/LPCPreprocessingLexer";
import { BaseNodeFactory } from "./baseNodeFactory";
import { createNodeFactory } from "./nodeFactory";
import {
    BinaryExpression,
    BinaryOperatorToken,
    Block,
    EndOfFileToken,
    Expression,
    ForEachChildNodes,
    FunctionDeclaration,
    HasJSDoc,
    Identifier,
    InlineClosureExpression,
    JSDoc,
    LexerToSyntaxKind,
    LiteralSyntaxKind,
    Node,
    NodeArray,
    NodeFlags,
    PrivateIdentifier,
    ReturnStatement,
    SourceFile,
    Statement,
    SyntaxKind,
    TypeNode,
    UnionTypeNode,
    VariableDeclaration,
    VariableDeclarationList,
    VariableStatement,
} from "./types";
import {
    Mutable,
    modifiersToFlags,
    objectAllocator,
    setTextRangePosEnd,
    setTextRangePosWidth,
} from "./utilities";
import {
    BlockContext,
    CommaableExpressionContext,
    ConditionalExpressionContext,
    DeclarationContext,
    ExpressionContext,
    FunctionDeclarationContext,
    InlineClosureExpressionContext,
    JumpStatementContext,
    LPCParser,
    LiteralContext,
    LiteralExpressionContext,
    PrimaryExpressionContext,
    PrimitiveTypeSpecifierContext,
    ProgramContext,
    ReturnStatementContext,
    StatementContext,
    UnionableTypeSpecifierContext,
    ValidIdentifiersContext,
    VariableDeclarationStatementContext,
    VariableDeclaratorExpressionContext,
} from "../parser3/LPCParser";
import { ILpcConfig } from "../config-types";
import { parseTree } from "jsonc-parser";
import { LPCLexer } from "../parser3/LPCLexer";

export namespace LpcParser {
    // Init some ANTLR stuff
    const lexer = new LPCPreprocessingLexer(
        antlr.CharStream.fromString(""),
        ""
    );
    const tokenStream = new antlr.CommonTokenStream(lexer);
    const parser = new LPCParser(tokenStream);
    parser.errorHandler = new antlr.DefaultErrorStrategy();
    parser.interpreter.predictionMode = antlr.PredictionMode.SLL;
    parser.buildParseTrees = true;

    var tree: ProgramContext; // antlr parse tree

    // capture constructors in 'initializeState' to avoid null checks
    var NodeConstructor: new (kind: SyntaxKind, pos: number, end: number) => Node; // prettier-ignore
    var TokenConstructor: new (kind: SyntaxKind, pos: number, end: number) => Node; // prettier-ignore
    var IdentifierConstructor: new (kind: SyntaxKind.Identifier, pos: number, end: number) => Identifier; // prettier-ignore
    var PrivateIdentifierConstructor: new (kind: SyntaxKind.PrivateIdentifier, pos: number, end: number) => PrivateIdentifier; // prettier-ignore
    var SourceFileConstructor: new (kind: SyntaxKind.SourceFile, pos: number, end: number) => SourceFile; // prettier-ignore

    function countNode(node: Node) {
        nodeCount++;
        return node;
    }

    // Rather than using `createBaseNodeFactory` here, we establish a `BaseNodeFactory` that closes over the
    // constructors above, which are reset each time `initializeState` is called.
    // prettier-ignore
    var baseNodeFactory: BaseNodeFactory = {
        createBaseSourceFileNode: kind => countNode(new SourceFileConstructor(kind, /*pos*/ 0, /*end*/ 0)),
        createBaseIdentifierNode: kind => countNode(new IdentifierConstructor(kind, /*pos*/ 0, /*end*/ 0)),
        createBasePrivateIdentifierNode: kind => countNode(new PrivateIdentifierConstructor(kind, /*pos*/ 0, /*end*/ 0)),
        createBaseTokenNode: kind => countNode(new TokenConstructor(kind, /*pos*/ 0, /*end*/ 0)),
        createBaseNode: kind => countNode(new NodeConstructor(kind, /*pos*/ 0, /*end*/ 0)),
    };

    var factory = createNodeFactory(baseNodeFactory);
    // pull out some factories here
    var {
        createToken: factoryCreateToken,
        createNodeArray: factoryCreateNodeArray,
        createIdentifier: factoryCreateIdentifier,
        createBlock: factoryCreateBlock,
    } = factory;

    let fileName: string;
    let sourceText: string;
    let config: ILpcConfig;
    /** indicates whether we are parsing top-level statements */
    let topLevel = true;

    var contextFlags: NodeFlags;
    var parseErrorBeforeNextFinishedNode = false;

    var nodeCount: number;
    var identifiers: Map<string, string>;
    var identifierCount: number;

    export function parseSourceFile(
        fileName: string,
        sourceText: string,
        config: ILpcConfig
    ) {
        initState(fileName, sourceText, config);
        const result = parseSourceFileWorker();
        clearState();
        return result;
    }

    function initState(
        _fileName: string,
        _sourceText: string,
        _config: ILpcConfig
    ) {
        NodeConstructor = objectAllocator.getNodeConstructor();
        TokenConstructor = objectAllocator.getTokenConstructor();
        IdentifierConstructor = objectAllocator.getIdentifierConstructor();
        PrivateIdentifierConstructor =
            objectAllocator.getPrivateIdentifierConstructor();
        SourceFileConstructor = objectAllocator.getSourceFileConstructor();

        fileName = _fileName;
        sourceText = _sourceText;
        config = _config;

        nodeCount = 0;
        topLevel = true;
        identifiers = new Map<string, string>();
        identifierCount = 0;
        tree = undefined!;

        // initialize antlr stuff here
        lexer.inputStream = antlr.CharStream.fromString(sourceText);
        lexer.driverType = config.driver.type;
        lexer.reset();
        // TODO: add macros

        tokenStream.setTokenSource(lexer);

        parser.reset();
        parser.driverType = config.driver.type;

        tokenStream.reset();
        tokenStream.fill();
    }

    function clearState() {
        // reset antlr stuff
        lexer.inputStream = antlr.CharStream.fromString("");
        tokenStream.setTokenSource(undefined); // this will clear the buffered tokens

        sourceText = undefined!;
        topLevel = true;
        tree = undefined!; // should this be cleared?
    }

    function parseSourceFileWorker() {
        // execute the antlr parser
        tree = parser.program();
        const eofToken = parseTokenNode<EndOfFileToken>(tree.EOF());
        const statements = parseList(tree.declaration(), parseStatement);
        const sourceFile = createSourceFile(fileName, statements, eofToken);

        sourceFile.nodeCount = nodeCount;
        sourceFile.identifierCount = identifierCount;
        sourceFile.identifiers = identifiers;

        return sourceFile;
    }

    function createSourceFile(
        fileName: string,
        statements: readonly Statement[],
        endOfFileToken: EndOfFileToken
    ): SourceFile {
        let sourceFile = factory.createSourceFile(
            statements,
            endOfFileToken,
            0
        );
        setTextRangePosWidth(sourceFile, 0, sourceText.length);

        sourceFile.fileName = fileName;
        sourceFile.text = sourceText;

        return sourceFile;
    }

    function createNodeArray<T extends Node>(
        elements: T[],
        pos: number,
        end?: number,
        hasTrailingComma?: boolean
    ): NodeArray<T> {
        const array = factoryCreateNodeArray(elements, hasTrailingComma);
        setTextRangePosEnd(array, pos, end ?? pos);
        return array;
    }

    function finishNode<T extends Node>(node: T, pos: number, end: number): T {
        setTextRangePosEnd(node, pos, end);
        if (contextFlags) {
            (node as Mutable<T>).flags |= contextFlags;
        }

        // Keep track on the node if we encountered an error while parsing it.  If we did, then
        // we cannot reuse the node incrementally.  Once we've marked this node, clear out the
        // flag so that we don't mark any subsequent nodes.
        if (parseErrorBeforeNextFinishedNode) {
            parseErrorBeforeNextFinishedNode = false;
            (node as Mutable<T>).flags |= NodeFlags.ThisNodeHasError;
        }

        return node;
    }

    function asToken<T extends Node>(token: antlr.Token): T {
        const pos = token.start,
            end = token.stop;
        const kind = LexerToSyntaxKind[token.type];
        return finishNode(factoryCreateToken(kind), pos, end) as T;
    }

    function parseTokenNode<T extends Node>(parserNode: antlr.TerminalNode): T {
        const pos = getTerminalPos(parserNode),
            end = getTerminalEnd(parserNode);
        const kind = getTerminalKind(parserNode);
        return finishNode(factoryCreateToken(kind), pos, end) as T;
    }

    function getTerminalPos(t: antlr.TerminalNode): number {
        return t.getSymbol().start;
    }
    function getTerminalEnd(t: antlr.TerminalNode): number {
        return t.getSymbol().stop;
    }

    function getTerminalKind(t: antlr.TerminalNode): SyntaxKind {
        return LexerToSyntaxKind[t.getSymbol().type];
    }

    function getNodePos(tree: antlr.ParserRuleContext): number {
        return tree?.start?.start;
    }
    function getNodeEnd(tree: antlr.ParserRuleContext): number {
        return tree?.stop.stop;
    }

    function parseList<T extends Node>(
        parseTrees: antlr.ParserRuleContext[],
        parseElement: (parseTree: antlr.ParserRuleContext) => T
    ): NodeArray<T> {
        const list = [];
        const listPos = getNodePos(parseTrees.at(0));
        const endPos = getNodePos(parseTrees.at(-1));

        for (const parseTree of parseTrees) {
            const node = parseElement(parseTree);
            list.push(node);
        }

        return createNodeArray(list, listPos, endPos);
    }

    function parseStatement(tree: antlr.ParserRuleContext): Statement {
        const ruleIndex = tree.ruleIndex;
        switch (ruleIndex) {
            case LPCParser.RULE_declaration:
                return parseDeclaration(tree as DeclarationContext);
            case LPCParser.RULE_variableDeclarationStatement:
                return parseVariableStatement(
                    tree as VariableDeclarationStatementContext
                );
            case LPCParser.RULE_jumpStatement:
                const jumpTree = tree as JumpStatementContext;
                if (jumpTree.returnStatement())
                    return parseReturnStatement(jumpTree.returnStatement());
                else if (jumpTree.BREAK()) {
                    // TODO: parse
                } else if (jumpTree.CONTINUE()) {
                    // TODO; parse
                }
                return undefined;
        }
    }

    /** gets a potential jsdoc comment block */
    function getPrecedingJSDocBlock(
        tree: antlr.ParserRuleContext
    ): string | undefined {
        const tokens = tokenStream.getHiddenTokensToLeft(
            tree.start.tokenIndex,
            COMMENT_CHANNEL
        );
        if (tokens?.length > 0) {
            const commentText = tokens.find((t) =>
                t?.text?.trim()?.startsWith("/**")
            )?.text;
            return commentText;
        }
        return undefined;
    }

    function parseDeclaration(tree: DeclarationContext) {
        const treeNode = tree.getChild(0) as antlr.ParserRuleContext;
        const pos = getNodePos(tree);

        switch (treeNode.ruleIndex) {
            case LPCParser.RULE_functionDeclaration:
                return parseFunctionDeclaration(
                    treeNode as FunctionDeclarationContext,
                    pos,
                    getPrecedingJSDocBlock(tree)
                );
            case LPCParser.RULE_variableDeclarationStatement:
                return parseVariableStatement(
                    treeNode as VariableDeclarationStatementContext
                );
        }
    }

    let hasDeprecatedTag = false;
    function withJSDoc<T extends HasJSDoc>(node: T, potentialJSDoc: string): T {
        if (!potentialJSDoc) {
            return node;
        }

        //Debug.assert(!node.jsDoc); // Should only be called once per node
        // const jsDoc = mapDefined(getJSDocCommentRanges(node, sourceText), comment => JSDocParser.parseJSDocComment(node, comment.pos, comment.end - comment.pos));
        // if (jsDoc.length) node.jsDoc = jsDoc;
        // if (hasDeprecatedTag) {
        //     hasDeprecatedTag = false;
        //     (node as Mutable<T>).flags |= NodeFlags.Deprecated;
        // }
        return node;
    }

    function parseFunctionDeclaration(
        tree: FunctionDeclarationContext,
        pos: number,
        jsDocBlock: string
    ) {
        const header = tree.functionHeader();
        const end = getNodeEnd(tree);

        const name = header._functionName;
        const mod = header.functionModifier()[0];
        //const modifiers = modifiersToFlags(header.functionModifier().map(m=>m.getChild(0)));
        const identifier = parseValidIdentifier(name);

        const returnType = parseType(
            header.typeSpecifier()?.unionableTypeSpecifier()
        );

        const body = parseFunctionBlock(tree.block()); // parseFunctionBlockOrSemicolon(isGenerator | isAsync, Diagnostics.or_expected);

        const node = factory.createFunctionDeclaration(
            header.functionModifier(),
            identifier,
            header.parameterList()?.parameter(),
            returnType,
            body
        );

        return withJSDoc(finishNode(node, pos, end), jsDocBlock);
    }

    function internIdentifier(text: string): string {
        let identifier = identifiers.get(text);
        if (identifier === undefined) {
            identifiers.set(text, (identifier = text));
        }
        return identifier;
    }

    function parseValidIdentifier(tree: ValidIdentifiersContext): Identifier {
        return createIdentifier(tree, true);
    }

    // The 'identifiers' object is used to share a single string instance for
    // each identifier in order to reduce memory consumption.
    function createIdentifier(
        tree: antlr.ParserRuleContext,
        isIdentifier: boolean
        //diagnosticMessage?: DiagnosticMessage, privateIdentifierDiagnosticMessage?: DiagnosticMessage
    ): Identifier {
        if (isIdentifier) {
            identifierCount++;
            const pos = getNodePos(tree),
                end = getNodeEnd(tree);
            // Store original token kind if it is not just an Identifier so we can report appropriate error later in type checker

            const text = internIdentifier(tree.getText());

            return finishNode(factoryCreateIdentifier(text), pos, end);
        }

        // TODO: handle error nodes here
    }

    function parseStatementList(
        tree: StatementContext[]
    ): NodeArray<Statement> {
        const statements = parseList(
            tree.map((s) => s.getChild(0) as antlr.ParserRuleContext),
            parseStatement
        );
        return statements;
    }

    function parseBlock(tree: BlockContext): Block {
        const pos = getNodePos(tree),
            end = getNodeEnd(tree);
        const hasJSDoc = getPrecedingJSDocBlock(tree);
        const multiLine =
            tree.CURLY_OPEN().symbol.line !== tree.CURLY_CLOSE().symbol.line;
        const statements = parseStatementList(tree.statement());
        const result = withJSDoc(
            finishNode(factory.createBlock(statements, multiLine), pos, end),
            hasJSDoc
        );

        return result;
    }

    function parseFunctionBlock(tree: BlockContext): Block | undefined {
        const savedTopLevel = topLevel;
        topLevel = false;

        const blockContent = parseBlock(tree);

        topLevel = savedTopLevel;
        return blockContent;
    }

    function parsePrimitiveTypeSpecifier(tree: PrimitiveTypeSpecifierContext) {
        return parseTokenNode<TypeNode>(tree.getChild(0) as antlr.TerminalNode);
    }

    function parsePossibleArrayType(
        tree: UnionableTypeSpecifierContext
    ): TypeNode {
        const pos = getNodePos(tree),
            end = getNodeEnd(tree);

        let typeNode: TypeNode | undefined;
        if (tree.primitiveTypeSpecifier()) {
            typeNode = parsePrimitiveTypeSpecifier(
                tree.primitiveTypeSpecifier()
            );
        }
        if (tree.STAR()) {
            typeNode = finishNode(
                factory.createArrayTypeNode(typeNode),
                pos,
                end
            );
        }

        return typeNode;
    }

    function parseUnionTypeOrHigher(
        tree: UnionableTypeSpecifierContext,
        parseConsituaentType: (tree: UnionableTypeSpecifierContext) => TypeNode,
        createTypeNode: (types: NodeArray<TypeNode>) => UnionTypeNode
    ): TypeNode {
        const pos = getNodePos(tree),
            end = getNodeEnd(tree);

        const types = [parseConsituaentType(tree)];

        if (tree.OR()?.length > 0) {
            for (const nextType of tree.unionableTypeSpecifier()) {
                types.push(parseConsituaentType(nextType));
            }
        }

        return finishNode(
            createTypeNode(createNodeArray(types, pos, end)),
            pos,
            end
        );
    }

    function parseType(tree: UnionableTypeSpecifierContext): TypeNode {
        if (!tree) return undefined;

        const type = parseUnionTypeOrHigher(
            tree,
            parsePossibleArrayType,
            factory.createUnionTypeNode
        );
        return type;
    }

    function parseVariableStatement(
        tree: VariableDeclarationStatementContext
    ): VariableStatement {
        const declTree = tree.variableDeclaration();
        const declListTree = declTree.variableDeclaratorExpression();

        // TODO: this might not actually be a variable declaration - it might be an assignment opertor
        // figure that out here or in the type checker?

        const pos = getNodePos(tree),
            end = getNodeEnd(tree);
        const type = parseType(declTree._type_);
        const declarationList = parseVariableDeclarationList(
            type,
            declListTree,
            /*inForStatementInitializer*/ false
        );
        const modifiers = undefined; // TODO modifiersToFlags(header.functionModifier().map(m=>m.getChild(0)));
        const jsDoc = getPrecedingJSDocBlock(tree);
        const node = factory.createVariableStatement(
            modifiers,
            declarationList
        );

        return withJSDoc(finishNode(node, pos, end), jsDoc);
    }

    function parseVariableDeclarationList(
        type: TypeNode,
        declListTree: VariableDeclaratorExpressionContext[],
        inForStatementInitializer: boolean
    ): VariableDeclarationList {
        const pos = getNodePos(declListTree.at(0)),
            end = getNodeEnd(declListTree.at(-1));
        const declarations: VariableDeclaration[] = [];

        for (const declExp of declListTree) {
            const decl = declExp.variableDeclarator();
            const jsDoc = getPrecedingJSDocBlock(decl);
            const name = parseValidIdentifier(decl._variableName);
            const initializer = undefined; // TODO !declExp.variableInitializer() ? undefined : parseInitializer(declExp.variableInitializer());
            const node = factory.createVariableDeclaration(
                name,
                type,
                initializer
            );
            const nodePos = getNodePos(declExp),
                nodeEnd = getNodeEnd(declExp);

            declarations.push(
                withJSDoc(finishNode(node, nodePos, nodeEnd), jsDoc)
            );
        }

        const listNode = factory.createVariableDeclarationList(
            declarations,
            NodeFlags.None
        );
        return finishNode(listNode, pos, end);
    }

    function parsePrimaryExpression(
        tree: PrimaryExpressionContext
    ): Expression {
        const pos = getNodePos(tree),
            end = getNodeEnd(tree);

        const startTree = tree.primaryExpressionStart();
        const startNode = parsePrimaryExpressionStart(startTree);

        if (tree.methodInvocation()) {
        }

        return startNode;
    }

    function parseLiteralNode(tree: LiteralContext): Expression {
        const pos = getNodePos(tree),
            end = getNodeEnd(tree);
        const token = tree.getChild(0) as antlr.TerminalNode;
        let type: LiteralSyntaxKind;
        switch (token.symbol.type) {
            case LPCLexer.IntegerConstant:
                type = SyntaxKind.IntLiteral;
                break;
            case LPCLexer.FloatingConstant:
                type = SyntaxKind.FloatLiteral;
                break;
            case LPCLexer.StringLiteral:
                type = SyntaxKind.StringLiteral;
                break;
        }
        const node = factory.createLiteralLikeNode(type, token.getText());
        return finishNode(node, pos, end);
    }

    function parsePrimaryExpressionStart(
        tree: antlr.ParserRuleContext
    ): Expression {
        const pos = getNodePos(tree),
            end = getNodeEnd(tree);

        const firstChild = tree.children[0] as antlr.ParserRuleContext;
        if (firstChild instanceof ValidIdentifiersContext) {
            return parseValidIdentifier(firstChild);
        } else if (firstChild instanceof LiteralContext) {
            return parseLiteralNode(firstChild);
        }

        return undefined;
    }

    function parseAssignmentExpressionOrHigher(
        tree: ConditionalExpressionContext
    ): Expression {
        const pos = getNodePos(tree),
            end = getNodeEnd(tree);

        // parse lhs
        let lhs: Expression;
        if (tree.castExpression()) {
            // TODO : parse this
        } else if (tree.primaryExpression()) {
            lhs = parsePrimaryExpression(tree.primaryExpression());
        } else if (tree.lambdaExpression()) {
            // TODO: parse
        } else if (tree.inlineClosureExpression()) {
            lhs = parseInlineClosureLikeExpression(
                tree.inlineClosureExpression()
            );
        }

        // because of how our grammar is structured, we don't have to worry about precendence
        // find the next operator symbol
        let lastExp: Expression = lhs;

        if (tree._ternOp) {
            // ternary operator
            const trueExpr = parseAssignmentExpressionOrHigher(
                tree.children[2] as ConditionalExpressionContext
            );
            const falseExpr = parseAssignmentExpressionOrHigher(
                tree.children[4] as ConditionalExpressionContext
            );

            return finishNode(
                factory.createConditionalExpression(
                    lastExp,
                    asToken(tree._ternOp),
                    trueExpr,
                    asToken(tree._ternOp2),
                    falseExpr
                ),
                pos,
                end
            );
        }

        // everythign else is a binary expression
        for (let i = 1; i < tree.children.length; i += 2) {
            const childExprTree = tree.children.at(
                    i + 1
                ) as ConditionalExpressionContext,
                opToken = tree.children.at(i);
            const childExpr = childExprTree
                ? parseAssignmentExpressionOrHigher(childExprTree)
                : undefined;

            if (opToken) {
                const operator = parseTokenNode<BinaryOperatorToken>(
                    opToken.getChild(0) as antlr.TerminalNode
                );
                if (!childExpr) {
                    const ii = 0;
                }
                lastExp = makeBinaryExpression(
                    lastExp,
                    operator,
                    childExpr,
                    pos,
                    getNodeEnd(childExprTree)
                );
            }
        }

        return lastExp;
    }

    function parseCommaExpression(
        tree: CommaableExpressionContext
    ): Expression {
        // Expression[in]:
        //      InlineClosureExpression
        //      AssignmentExpression[in]
        //      AssignmentExpression[in] , AssignmentExpression[in]

        if (tree.inlineClosureExpression()) {
            return parseInlineClosureLikeExpression(
                tree.inlineClosureExpression()
            );
        }

        const pos = getNodePos(tree),
            end = getNodeEnd(tree);
        const children = tree.children;

        // grab the first expression
        let expr = parseAssignmentExpressionOrHigher(
            children[0] as ConditionalExpressionContext
        );

        for (let i = 1; i < children.length; i += 2) {
            const operator = parseTokenNode<BinaryOperatorToken>(
                children[i] as antlr.TerminalNode
            );
            const rightExpr = parseAssignmentExpressionOrHigher(
                children[i + 1] as ConditionalExpressionContext
            );

            expr = makeBinaryExpression(expr, operator, rightExpr, pos, end);
        }

        return expr;
    }

    function parseExpression(tree: ExpressionContext): Expression {
        return parseAssignmentExpressionOrHigher(tree.conditionalExpression());
    }

    function parseInlineClosureLikeExpression(
        tree: InlineClosureExpressionContext
    ): InlineClosureExpression | undefined {
        const pos = getNodePos(tree),
            end = getNodeEnd(tree);
        const jsDoc = getPrecedingJSDocBlock(tree);

        if (tree.COMMA) {
            // TODO: this is a fluff-style function pointer
        } else if (tree.FUNCTION) {
            // TODO: this is an inline function with params and body
        } else {
            let body: Block | Expression | undefined;
            const isMultiLine = tree.start.line !== tree.stop.line;
            if (tree.expression()) {
                body = parseExpression(tree.expression().at(0)); // in this case there will only be 1 expression
            } else if (tree.statement()) {
                // there can be multiple statements
                // parse it as a block, even though theres no curly braces
                const statements = parseStatementList(tree.statement());
                body = factory.createBlock(statements, isMultiLine);
            }

            const node = factory.createInlineClosure(body);
            return withJSDoc(finishNode(node, pos, end), jsDoc);
        }
    }

    function parseReturnStatement(
        tree: ReturnStatementContext
    ): ReturnStatement {
        const pos = getNodePos(tree),
            end = getNodeEnd(tree);
        const jsDoc = getPrecedingJSDocBlock(tree);

        const expression = parseCommaExpression(tree.commaableExpression());

        return withJSDoc(
            finishNode(factory.createReturnStatement(expression), pos, end),
            jsDoc
        );
    }

    function makeBinaryExpression(
        left: Expression,
        operatorToken: BinaryOperatorToken,
        right: Expression,
        pos: number,
        end: number
    ): BinaryExpression {
        return finishNode(
            factory.createBinaryExpression(left, operatorToken, right),
            pos,
            end
        );
    }
}

type ForEachChildFunction<TNode> = <T>(
    node: TNode,
    cbNode: (node: Node) => T | undefined,
    cbNodes?: (nodes: NodeArray<Node>) => T | undefined
) => T | undefined;
type ForEachChildTable = {
    [TNode in ForEachChildNodes as TNode["kind"]]: ForEachChildFunction<TNode>;
};

/**
 * Invokes a callback for each child of the given node. The 'cbNode' callback is invoked for all child nodes
 * stored in properties. If a 'cbNodes' callback is specified, it is invoked for embedded arrays; otherwise,
 * embedded arrays are flattened and the 'cbNode' callback is invoked for each element. If a callback returns
 * a truthy value, iteration stops and that value is returned. Otherwise, undefined is returned.
 *
 * @param node a given node to visit its children
 * @param cbNode a callback to be invoked for all child nodes
 * @param cbNodes a callback to be invoked for embedded array
 *
 * @remarks `forEachChild` must visit the children of a node in the order
 * that they appear in the source code. The language service depends on this property to locate nodes by position.
 */
export function forEachChild<T>(
    node: Node,
    cbNode: (node: Node) => T | undefined,
    cbNodes?: (nodes: NodeArray<Node>) => T | undefined
): T | undefined {
    if (node === undefined || node.kind <= SyntaxKind.LastToken) {
        return;
    }
    const fn = (
        forEachChildTable as Record<SyntaxKind, ForEachChildFunction<any>>
    )[node.kind];
    return fn === undefined ? undefined : fn(node, cbNode, cbNodes);
}

// prettier-ignore
const forEachChildTable: ForEachChildTable = {
    // [SyntaxKind.QualifiedName]: function forEachChildInQualifiedName<T>(node: QualifiedName, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.left) ||
    //         visitNode(cbNode, node.right);
    // },
    // [SyntaxKind.TypeParameter]: function forEachChildInTypeParameter<T>(node: TypeParameterDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNodes(cbNode, cbNodes, node.modifiers) ||
    //         visitNode(cbNode, node.name) ||
    //         visitNode(cbNode, node.constraint) ||
    //         visitNode(cbNode, node.default) ||
    //         visitNode(cbNode, node.expression);
    // },
    // [SyntaxKind.ShorthandPropertyAssignment]: function forEachChildInShorthandPropertyAssignment<T>(node: ShorthandPropertyAssignment, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNodes(cbNode, cbNodes, node.modifiers) ||
    //         visitNode(cbNode, node.name) ||
    //         visitNode(cbNode, node.questionToken) ||
    //         visitNode(cbNode, node.exclamationToken) ||
    //         visitNode(cbNode, node.equalsToken) ||
    //         visitNode(cbNode, node.objectAssignmentInitializer);
    // },
    // [SyntaxKind.SpreadAssignment]: function forEachChildInSpreadAssignment<T>(node: SpreadAssignment, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.expression);
    // },
    // [SyntaxKind.Parameter]: function forEachChildInParameter<T>(node: ParameterDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNodes(cbNode, cbNodes, node.modifiers) ||
    //         visitNode(cbNode, node.dotDotDotToken) ||
    //         visitNode(cbNode, node.name) ||
    //         visitNode(cbNode, node.questionToken) ||
    //         visitNode(cbNode, node.type) ||
    //         visitNode(cbNode, node.initializer);
    // },
    // [SyntaxKind.PropertyDeclaration]: function forEachChildInPropertyDeclaration<T>(node: PropertyDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNodes(cbNode, cbNodes, node.modifiers) ||
    //         visitNode(cbNode, node.name) ||
    //         visitNode(cbNode, node.questionToken) ||
    //         visitNode(cbNode, node.exclamationToken) ||
    //         visitNode(cbNode, node.type) ||
    //         visitNode(cbNode, node.initializer);
    // },
    // [SyntaxKind.PropertySignature]: function forEachChildInPropertySignature<T>(node: PropertySignature, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNodes(cbNode, cbNodes, node.modifiers) ||
    //         visitNode(cbNode, node.name) ||
    //         visitNode(cbNode, node.questionToken) ||
    //         visitNode(cbNode, node.type) ||
    //         visitNode(cbNode, node.initializer);
    // },
    // [SyntaxKind.PropertyAssignment]: function forEachChildInPropertyAssignment<T>(node: PropertyAssignment, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNodes(cbNode, cbNodes, node.modifiers) ||
    //         visitNode(cbNode, node.name) ||
    //         visitNode(cbNode, node.questionToken) ||
    //         visitNode(cbNode, node.exclamationToken) ||
    //         visitNode(cbNode, node.initializer);
    // },
    // [SyntaxKind.VariableDeclaration]: function forEachChildInVariableDeclaration<T>(node: VariableDeclaration, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.name) ||
    //         visitNode(cbNode, node.exclamationToken) ||
    //         visitNode(cbNode, node.type) ||
    //         visitNode(cbNode, node.initializer);
    // },
    // [SyntaxKind.BindingElement]: function forEachChildInBindingElement<T>(node: BindingElement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.dotDotDotToken) ||
    //         visitNode(cbNode, node.propertyName) ||
    //         visitNode(cbNode, node.name) ||
    //         visitNode(cbNode, node.initializer);
    // },
    // [SyntaxKind.IndexSignature]: function forEachChildInIndexSignature<T>(node: IndexSignatureDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNodes(cbNode, cbNodes, node.modifiers) ||
    //         visitNodes(cbNode, cbNodes, node.typeParameters) ||
    //         visitNodes(cbNode, cbNodes, node.parameters) ||
    //         visitNode(cbNode, node.type);
    // },
    // [SyntaxKind.ConstructorType]: function forEachChildInConstructorType<T>(node: ConstructorTypeNode, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNodes(cbNode, cbNodes, node.modifiers) ||
    //         visitNodes(cbNode, cbNodes, node.typeParameters) ||
    //         visitNodes(cbNode, cbNodes, node.parameters) ||
    //         visitNode(cbNode, node.type);
    // },
    // [SyntaxKind.FunctionType]: function forEachChildInFunctionType<T>(node: FunctionTypeNode, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNodes(cbNode, cbNodes, node.modifiers) ||
    //         visitNodes(cbNode, cbNodes, node.typeParameters) ||
    //         visitNodes(cbNode, cbNodes, node.parameters) ||
    //         visitNode(cbNode, node.type);
    // },
    // [SyntaxKind.CallSignature]: forEachChildInCallOrConstructSignature,
    // [SyntaxKind.ConstructSignature]: forEachChildInCallOrConstructSignature,
    // [SyntaxKind.MethodDeclaration]: function forEachChildInMethodDeclaration<T>(node: MethodDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNodes(cbNode, cbNodes, node.modifiers) ||
    //         visitNode(cbNode, node.asteriskToken) ||
    //         visitNode(cbNode, node.name) ||
    //         visitNode(cbNode, node.questionToken) ||
    //         visitNode(cbNode, node.exclamationToken) ||
    //         visitNodes(cbNode, cbNodes, node.typeParameters) ||
    //         visitNodes(cbNode, cbNodes, node.parameters) ||
    //         visitNode(cbNode, node.type) ||
    //         visitNode(cbNode, node.body);
    // },
    // [SyntaxKind.MethodSignature]: function forEachChildInMethodSignature<T>(node: MethodSignature, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNodes(cbNode, cbNodes, node.modifiers) ||
    //         visitNode(cbNode, node.name) ||
    //         visitNode(cbNode, node.questionToken) ||
    //         visitNodes(cbNode, cbNodes, node.typeParameters) ||
    //         visitNodes(cbNode, cbNodes, node.parameters) ||
    //         visitNode(cbNode, node.type);
    // },
    // [SyntaxKind.Constructor]: function forEachChildInConstructor<T>(node: ConstructorDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNodes(cbNode, cbNodes, node.modifiers) ||
    //         visitNode(cbNode, node.name) ||
    //         visitNodes(cbNode, cbNodes, node.typeParameters) ||
    //         visitNodes(cbNode, cbNodes, node.parameters) ||
    //         visitNode(cbNode, node.type) ||
    //         visitNode(cbNode, node.body);
    // },
    // [SyntaxKind.GetAccessor]: function forEachChildInGetAccessor<T>(node: GetAccessorDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNodes(cbNode, cbNodes, node.modifiers) ||
    //         visitNode(cbNode, node.name) ||
    //         visitNodes(cbNode, cbNodes, node.typeParameters) ||
    //         visitNodes(cbNode, cbNodes, node.parameters) ||
    //         visitNode(cbNode, node.type) ||
    //         visitNode(cbNode, node.body);
    // },
    // [SyntaxKind.SetAccessor]: function forEachChildInSetAccessor<T>(node: SetAccessorDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNodes(cbNode, cbNodes, node.modifiers) ||
    //         visitNode(cbNode, node.name) ||
    //         visitNodes(cbNode, cbNodes, node.typeParameters) ||
    //         visitNodes(cbNode, cbNodes, node.parameters) ||
    //         visitNode(cbNode, node.type) ||
    //         visitNode(cbNode, node.body);
    // },
    [SyntaxKind.FunctionDeclaration]: function forEachChildInFunctionDeclaration<T>(node: FunctionDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||            
            visitNode(cbNode, node.name) ||            
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.body);
    },
    // [SyntaxKind.FunctionExpression]: function forEachChildInFunctionExpression<T>(node: FunctionExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNodes(cbNode, cbNodes, node.modifiers) ||
    //         visitNode(cbNode, node.asteriskToken) ||
    //         visitNode(cbNode, node.name) ||
    //         visitNodes(cbNode, cbNodes, node.typeParameters) ||
    //         visitNodes(cbNode, cbNodes, node.parameters) ||
    //         visitNode(cbNode, node.type) ||
    //         visitNode(cbNode, node.body);
    // },
    // [SyntaxKind.ArrowFunction]: function forEachChildInArrowFunction<T>(node: ArrowFunction, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNodes(cbNode, cbNodes, node.modifiers) ||
    //         visitNodes(cbNode, cbNodes, node.typeParameters) ||
    //         visitNodes(cbNode, cbNodes, node.parameters) ||
    //         visitNode(cbNode, node.type) ||
    //         visitNode(cbNode, node.equalsGreaterThanToken) ||
    //         visitNode(cbNode, node.body);
    // },
    // [SyntaxKind.ClassStaticBlockDeclaration]: function forEachChildInClassStaticBlockDeclaration<T>(node: ClassStaticBlockDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNodes(cbNode, cbNodes, node.modifiers) ||
    //         visitNode(cbNode, node.body);
    // },
    // [SyntaxKind.TypeReference]: function forEachChildInTypeReference<T>(node: TypeReferenceNode, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.typeName) ||
    //         visitNodes(cbNode, cbNodes, node.typeArguments);
    // },
    // [SyntaxKind.TypePredicate]: function forEachChildInTypePredicate<T>(node: TypePredicateNode, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.assertsModifier) ||
    //         visitNode(cbNode, node.parameterName) ||
    //         visitNode(cbNode, node.type);
    // },
    // [SyntaxKind.TypeQuery]: function forEachChildInTypeQuery<T>(node: TypeQueryNode, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.exprName) ||
    //         visitNodes(cbNode, cbNodes, node.typeArguments);
    // },
    // [SyntaxKind.TypeLiteral]: function forEachChildInTypeLiteral<T>(node: TypeLiteralNode, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNodes(cbNode, cbNodes, node.members);
    // },
    // [SyntaxKind.ArrayType]: function forEachChildInArrayType<T>(node: ArrayTypeNode, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.elementType);
    // },
    // [SyntaxKind.TupleType]: function forEachChildInTupleType<T>(node: TupleTypeNode, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNodes(cbNode, cbNodes, node.elements);
    // },
    // [SyntaxKind.UnionType]: forEachChildInUnionOrIntersectionType,
    // [SyntaxKind.IntersectionType]: forEachChildInUnionOrIntersectionType,
    // [SyntaxKind.ConditionalType]: function forEachChildInConditionalType<T>(node: ConditionalTypeNode, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.checkType) ||
    //         visitNode(cbNode, node.extendsType) ||
    //         visitNode(cbNode, node.trueType) ||
    //         visitNode(cbNode, node.falseType);
    // },
    // [SyntaxKind.InferType]: function forEachChildInInferType<T>(node: InferTypeNode, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.typeParameter);
    // },
    // [SyntaxKind.ImportType]: function forEachChildInImportType<T>(node: ImportTypeNode, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.argument) ||
    //         visitNode(cbNode, node.attributes) ||
    //         visitNode(cbNode, node.qualifier) ||
    //         visitNodes(cbNode, cbNodes, node.typeArguments);
    // },
    // [SyntaxKind.ImportTypeAssertionContainer]: function forEachChildInImportTypeAssertionContainer<T>(node: ImportTypeAssertionContainer, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.assertClause);
    // },
    // [SyntaxKind.ParenthesizedType]: forEachChildInParenthesizedTypeOrTypeOperator,
    // [SyntaxKind.TypeOperator]: forEachChildInParenthesizedTypeOrTypeOperator,
    // [SyntaxKind.IndexedAccessType]: function forEachChildInIndexedAccessType<T>(node: IndexedAccessTypeNode, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.objectType) ||
    //         visitNode(cbNode, node.indexType);
    // },
    // [SyntaxKind.MappedType]: function forEachChildInMappedType<T>(node: MappedTypeNode, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.readonlyToken) ||
    //         visitNode(cbNode, node.typeParameter) ||
    //         visitNode(cbNode, node.nameType) ||
    //         visitNode(cbNode, node.questionToken) ||
    //         visitNode(cbNode, node.type) ||
    //         visitNodes(cbNode, cbNodes, node.members);
    // },
    // [SyntaxKind.LiteralType]: function forEachChildInLiteralType<T>(node: LiteralTypeNode, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.literal);
    // },
    // [SyntaxKind.NamedTupleMember]: function forEachChildInNamedTupleMember<T>(node: NamedTupleMember, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.dotDotDotToken) ||
    //         visitNode(cbNode, node.name) ||
    //         visitNode(cbNode, node.questionToken) ||
    //         visitNode(cbNode, node.type);
    // },
    // [SyntaxKind.ObjectBindingPattern]: forEachChildInObjectOrArrayBindingPattern,
    // [SyntaxKind.ArrayBindingPattern]: forEachChildInObjectOrArrayBindingPattern,
    // [SyntaxKind.ArrayLiteralExpression]: function forEachChildInArrayLiteralExpression<T>(node: ArrayLiteralExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNodes(cbNode, cbNodes, node.elements);
    // },
    // [SyntaxKind.ObjectLiteralExpression]: function forEachChildInObjectLiteralExpression<T>(node: ObjectLiteralExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNodes(cbNode, cbNodes, node.properties);
    // },
    // [SyntaxKind.PropertyAccessExpression]: function forEachChildInPropertyAccessExpression<T>(node: PropertyAccessExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.expression) ||
    //         visitNode(cbNode, node.questionDotToken) ||
    //         visitNode(cbNode, node.name);
    // },
    // [SyntaxKind.ElementAccessExpression]: function forEachChildInElementAccessExpression<T>(node: ElementAccessExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.expression) ||
    //         visitNode(cbNode, node.questionDotToken) ||
    //         visitNode(cbNode, node.argumentExpression);
    // },
    // [SyntaxKind.CallExpression]: forEachChildInCallOrNewExpression,
    // [SyntaxKind.NewExpression]: forEachChildInCallOrNewExpression,
    // [SyntaxKind.TaggedTemplateExpression]: function forEachChildInTaggedTemplateExpression<T>(node: TaggedTemplateExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.tag) ||
    //         visitNode(cbNode, node.questionDotToken) ||
    //         visitNodes(cbNode, cbNodes, node.typeArguments) ||
    //         visitNode(cbNode, node.template);
    // },
    // [SyntaxKind.TypeAssertionExpression]: function forEachChildInTypeAssertionExpression<T>(node: TypeAssertion, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.type) ||
    //         visitNode(cbNode, node.expression);
    // },
    // [SyntaxKind.ParenthesizedExpression]: function forEachChildInParenthesizedExpression<T>(node: ParenthesizedExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.expression);
    // },
    // [SyntaxKind.DeleteExpression]: function forEachChildInDeleteExpression<T>(node: DeleteExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.expression);
    // },
    // [SyntaxKind.TypeOfExpression]: function forEachChildInTypeOfExpression<T>(node: TypeOfExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.expression);
    // },
    // [SyntaxKind.VoidExpression]: function forEachChildInVoidExpression<T>(node: VoidExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.expression);
    // },
    // [SyntaxKind.PrefixUnaryExpression]: function forEachChildInPrefixUnaryExpression<T>(node: PrefixUnaryExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.operand);
    // },
    // [SyntaxKind.YieldExpression]: function forEachChildInYieldExpression<T>(node: YieldExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.asteriskToken) ||
    //         visitNode(cbNode, node.expression);
    // },
    // [SyntaxKind.AwaitExpression]: function forEachChildInAwaitExpression<T>(node: AwaitExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.expression);
    // },
    // [SyntaxKind.PostfixUnaryExpression]: function forEachChildInPostfixUnaryExpression<T>(node: PostfixUnaryExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.operand);
    // },
    // [SyntaxKind.BinaryExpression]: function forEachChildInBinaryExpression<T>(node: BinaryExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.left) ||
    //         visitNode(cbNode, node.operatorToken) ||
    //         visitNode(cbNode, node.right);
    // },
    // [SyntaxKind.AsExpression]: function forEachChildInAsExpression<T>(node: AsExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.expression) ||
    //         visitNode(cbNode, node.type);
    // },
    // [SyntaxKind.NonNullExpression]: function forEachChildInNonNullExpression<T>(node: NonNullExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.expression);
    // },
    // [SyntaxKind.SatisfiesExpression]: function forEachChildInSatisfiesExpression<T>(node: SatisfiesExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.expression) || visitNode(cbNode, node.type);
    // },
    // [SyntaxKind.MetaProperty]: function forEachChildInMetaProperty<T>(node: MetaProperty, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.name);
    // },
    // [SyntaxKind.ConditionalExpression]: function forEachChildInConditionalExpression<T>(node: ConditionalExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.condition) ||
    //         visitNode(cbNode, node.questionToken) ||
    //         visitNode(cbNode, node.whenTrue) ||
    //         visitNode(cbNode, node.colonToken) ||
    //         visitNode(cbNode, node.whenFalse);
    // },
    // [SyntaxKind.SpreadElement]: function forEachChildInSpreadElement<T>(node: SpreadElement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.expression);
    // },
    // [SyntaxKind.Block]: forEachChildInBlock,
    // [SyntaxKind.ModuleBlock]: forEachChildInBlock,
    // [SyntaxKind.SourceFile]: function forEachChildInSourceFile<T>(node: SourceFile, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNodes(cbNode, cbNodes, node.statements) ||
    //         visitNode(cbNode, node.endOfFileToken);
    // },
    // [SyntaxKind.VariableStatement]: function forEachChildInVariableStatement<T>(node: VariableStatement, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNodes(cbNode, cbNodes, node.modifiers) ||
    //         visitNode(cbNode, node.declarationList);
    // },
    // [SyntaxKind.VariableDeclarationList]: function forEachChildInVariableDeclarationList<T>(node: VariableDeclarationList, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNodes(cbNode, cbNodes, node.declarations);
    // },
    // [SyntaxKind.ExpressionStatement]: function forEachChildInExpressionStatement<T>(node: ExpressionStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.expression);
    // },
    // [SyntaxKind.IfStatement]: function forEachChildInIfStatement<T>(node: IfStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.expression) ||
    //         visitNode(cbNode, node.thenStatement) ||
    //         visitNode(cbNode, node.elseStatement);
    // },
    // [SyntaxKind.DoStatement]: function forEachChildInDoStatement<T>(node: DoStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.statement) ||
    //         visitNode(cbNode, node.expression);
    // },
    // [SyntaxKind.WhileStatement]: function forEachChildInWhileStatement<T>(node: WhileStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.expression) ||
    //         visitNode(cbNode, node.statement);
    // },
    // [SyntaxKind.ForStatement]: function forEachChildInForStatement<T>(node: ForStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.initializer) ||
    //         visitNode(cbNode, node.condition) ||
    //         visitNode(cbNode, node.incrementor) ||
    //         visitNode(cbNode, node.statement);
    // },
    // [SyntaxKind.ForInStatement]: function forEachChildInForInStatement<T>(node: ForInStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.initializer) ||
    //         visitNode(cbNode, node.expression) ||
    //         visitNode(cbNode, node.statement);
    // },
    // [SyntaxKind.ForOfStatement]: function forEachChildInForOfStatement<T>(node: ForOfStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.awaitModifier) ||
    //         visitNode(cbNode, node.initializer) ||
    //         visitNode(cbNode, node.expression) ||
    //         visitNode(cbNode, node.statement);
    // },
    // [SyntaxKind.ContinueStatement]: forEachChildInContinueOrBreakStatement,
    // [SyntaxKind.BreakStatement]: forEachChildInContinueOrBreakStatement,
    [SyntaxKind.ReturnStatement]: function forEachChildInReturnStatement<T>(node: ReturnStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    // [SyntaxKind.WithStatement]: function forEachChildInWithStatement<T>(node: WithStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.expression) ||
    //         visitNode(cbNode, node.statement);
    // },
    // [SyntaxKind.SwitchStatement]: function forEachChildInSwitchStatement<T>(node: SwitchStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.expression) ||
    //         visitNode(cbNode, node.caseBlock);
    // },
    // [SyntaxKind.CaseBlock]: function forEachChildInCaseBlock<T>(node: CaseBlock, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNodes(cbNode, cbNodes, node.clauses);
    // },
    // [SyntaxKind.CaseClause]: function forEachChildInCaseClause<T>(node: CaseClause, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.expression) ||
    //         visitNodes(cbNode, cbNodes, node.statements);
    // },
    // [SyntaxKind.DefaultClause]: function forEachChildInDefaultClause<T>(node: DefaultClause, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNodes(cbNode, cbNodes, node.statements);
    // },
    // [SyntaxKind.LabeledStatement]: function forEachChildInLabeledStatement<T>(node: LabeledStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.label) ||
    //         visitNode(cbNode, node.statement);
    // },
    // [SyntaxKind.ThrowStatement]: function forEachChildInThrowStatement<T>(node: ThrowStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.expression);
    // },
    // [SyntaxKind.TryStatement]: function forEachChildInTryStatement<T>(node: TryStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.tryBlock) ||
    //         visitNode(cbNode, node.catchClause) ||
    //         visitNode(cbNode, node.finallyBlock);
    // },
    // [SyntaxKind.CatchClause]: function forEachChildInCatchClause<T>(node: CatchClause, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.variableDeclaration) ||
    //         visitNode(cbNode, node.block);
    // },
    // [SyntaxKind.Decorator]: function forEachChildInDecorator<T>(node: Decorator, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.expression);
    // },
    // [SyntaxKind.ClassDeclaration]: forEachChildInClassDeclarationOrExpression,
    // [SyntaxKind.ClassExpression]: forEachChildInClassDeclarationOrExpression,
    // [SyntaxKind.InterfaceDeclaration]: function forEachChildInInterfaceDeclaration<T>(node: InterfaceDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNodes(cbNode, cbNodes, node.modifiers) ||
    //         visitNode(cbNode, node.name) ||
    //         visitNodes(cbNode, cbNodes, node.typeParameters) ||
    //         visitNodes(cbNode, cbNodes, node.heritageClauses) ||
    //         visitNodes(cbNode, cbNodes, node.members);
    // },
    // [SyntaxKind.TypeAliasDeclaration]: function forEachChildInTypeAliasDeclaration<T>(node: TypeAliasDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNodes(cbNode, cbNodes, node.modifiers) ||
    //         visitNode(cbNode, node.name) ||
    //         visitNodes(cbNode, cbNodes, node.typeParameters) ||
    //         visitNode(cbNode, node.type);
    // },
    // [SyntaxKind.EnumDeclaration]: function forEachChildInEnumDeclaration<T>(node: EnumDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNodes(cbNode, cbNodes, node.modifiers) ||
    //         visitNode(cbNode, node.name) ||
    //         visitNodes(cbNode, cbNodes, node.members);
    // },
    // [SyntaxKind.EnumMember]: function forEachChildInEnumMember<T>(node: EnumMember, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.name) ||
    //         visitNode(cbNode, node.initializer);
    // },
    // [SyntaxKind.ModuleDeclaration]: function forEachChildInModuleDeclaration<T>(node: ModuleDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNodes(cbNode, cbNodes, node.modifiers) ||
    //         visitNode(cbNode, node.name) ||
    //         visitNode(cbNode, node.body);
    // },
    // [SyntaxKind.ImportEqualsDeclaration]: function forEachChildInImportEqualsDeclaration<T>(node: ImportEqualsDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNodes(cbNode, cbNodes, node.modifiers) ||
    //         visitNode(cbNode, node.name) ||
    //         visitNode(cbNode, node.moduleReference);
    // },
    // [SyntaxKind.ImportDeclaration]: function forEachChildInImportDeclaration<T>(node: ImportDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNodes(cbNode, cbNodes, node.modifiers) ||
    //         visitNode(cbNode, node.importClause) ||
    //         visitNode(cbNode, node.moduleSpecifier) ||
    //         visitNode(cbNode, node.attributes);
    // },
    // [SyntaxKind.ImportClause]: function forEachChildInImportClause<T>(node: ImportClause, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.name) ||
    //         visitNode(cbNode, node.namedBindings);
    // },
    // [SyntaxKind.ImportAttributes]: function forEachChildInImportAttributes<T>(node: ImportAttributes, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNodes(cbNode, cbNodes, node.elements);
    // },
    // [SyntaxKind.ImportAttribute]: function forEachChildInImportAttribute<T>(node: ImportAttribute, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.name) ||
    //         visitNode(cbNode, node.value);
    // },
    // [SyntaxKind.NamespaceExportDeclaration]: function forEachChildInNamespaceExportDeclaration<T>(node: NamespaceExportDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNodes(cbNode, cbNodes, node.modifiers) ||
    //         visitNode(cbNode, node.name);
    // },
    // [SyntaxKind.NamespaceImport]: function forEachChildInNamespaceImport<T>(node: NamespaceImport, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.name);
    // },
    // [SyntaxKind.NamespaceExport]: function forEachChildInNamespaceExport<T>(node: NamespaceExport, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.name);
    // },
    // [SyntaxKind.NamedImports]: forEachChildInNamedImportsOrExports,
    // [SyntaxKind.NamedExports]: forEachChildInNamedImportsOrExports,
    // [SyntaxKind.ExportDeclaration]: function forEachChildInExportDeclaration<T>(node: ExportDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNodes(cbNode, cbNodes, node.modifiers) ||
    //         visitNode(cbNode, node.exportClause) ||
    //         visitNode(cbNode, node.moduleSpecifier) ||
    //         visitNode(cbNode, node.attributes);
    // },
    // [SyntaxKind.ImportSpecifier]: forEachChildInImportOrExportSpecifier,
    // [SyntaxKind.ExportSpecifier]: forEachChildInImportOrExportSpecifier,
    // [SyntaxKind.ExportAssignment]: function forEachChildInExportAssignment<T>(node: ExportAssignment, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNodes(cbNode, cbNodes, node.modifiers) ||
    //         visitNode(cbNode, node.expression);
    // },
    // [SyntaxKind.TemplateExpression]: function forEachChildInTemplateExpression<T>(node: TemplateExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.head) ||
    //         visitNodes(cbNode, cbNodes, node.templateSpans);
    // },
    // [SyntaxKind.TemplateSpan]: function forEachChildInTemplateSpan<T>(node: TemplateSpan, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.expression) ||
    //         visitNode(cbNode, node.literal);
    // },
    // [SyntaxKind.TemplateLiteralType]: function forEachChildInTemplateLiteralType<T>(node: TemplateLiteralTypeNode, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.head) ||
    //         visitNodes(cbNode, cbNodes, node.templateSpans);
    // },
    // [SyntaxKind.TemplateLiteralTypeSpan]: function forEachChildInTemplateLiteralTypeSpan<T>(node: TemplateLiteralTypeSpan, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.type) ||
    //         visitNode(cbNode, node.literal);
    // },
    // [SyntaxKind.ComputedPropertyName]: function forEachChildInComputedPropertyName<T>(node: ComputedPropertyName, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.expression);
    // },
    // [SyntaxKind.HeritageClause]: function forEachChildInHeritageClause<T>(node: HeritageClause, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNodes(cbNode, cbNodes, node.types);
    // },
    // [SyntaxKind.ExpressionWithTypeArguments]: function forEachChildInExpressionWithTypeArguments<T>(node: ExpressionWithTypeArguments, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.expression) ||
    //         visitNodes(cbNode, cbNodes, node.typeArguments);
    // },
    // [SyntaxKind.ExternalModuleReference]: function forEachChildInExternalModuleReference<T>(node: ExternalModuleReference, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.expression);
    // },
    // [SyntaxKind.MissingDeclaration]: function forEachChildInMissingDeclaration<T>(node: MissingDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNodes(cbNode, cbNodes, node.modifiers);
    // },
    // [SyntaxKind.CommaListExpression]: function forEachChildInCommaListExpression<T>(node: CommaListExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNodes(cbNode, cbNodes, node.elements);
    // },
    // [SyntaxKind.JSDocTypeExpression]: forEachChildInOptionalRestOrJSDocParameterModifier,
    // [SyntaxKind.JSDocNonNullableType]: forEachChildInOptionalRestOrJSDocParameterModifier,
    // [SyntaxKind.JSDocNullableType]: forEachChildInOptionalRestOrJSDocParameterModifier,
    // [SyntaxKind.JSDocOptionalType]: forEachChildInOptionalRestOrJSDocParameterModifier,
    // [SyntaxKind.JSDocVariadicType]: forEachChildInOptionalRestOrJSDocParameterModifier,
    // [SyntaxKind.JSDocFunctionType]: function forEachChildInJSDocFunctionType<T>(node: JSDocFunctionType, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNodes(cbNode, cbNodes, node.parameters) ||
    //         visitNode(cbNode, node.type);
    // },
    [SyntaxKind.JSDoc]: function forEachChildInJSDoc<T>(
        node: JSDoc,
        cbNode: (node: Node) => T | undefined,
        cbNodes?: (nodes: NodeArray<Node>) => T | undefined
    ): T | undefined {
        return (
            (typeof node.comment === "string"
                ? undefined
                : visitNodes(cbNode, cbNodes, node.comment)) ||
            visitNodes(cbNode, cbNodes, node.tags)
        );
    },
    // [SyntaxKind.JSDocSeeTag]: function forEachChildInJSDocSeeTag<T>(node: JSDocSeeTag, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.tagName) ||
    //         visitNode(cbNode, node.name) ||
    //         (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
    // },
    // [SyntaxKind.JSDocNameReference]: function forEachChildInJSDocNameReference<T>(node: JSDocNameReference, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.name);
    // },
    // [SyntaxKind.JSDocMemberName]: function forEachChildInJSDocMemberName<T>(node: JSDocMemberName, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.left) ||
    //         visitNode(cbNode, node.right);
    // },
    // [SyntaxKind.JSDocParameterTag]: forEachChildInJSDocParameterOrPropertyTag,
    // [SyntaxKind.JSDocPropertyTag]: forEachChildInJSDocParameterOrPropertyTag,
    // [SyntaxKind.JSDocAuthorTag]: function forEachChildInJSDocAuthorTag<T>(node: JSDocAuthorTag, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.tagName) ||
    //         (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
    // },
    // [SyntaxKind.JSDocImplementsTag]: function forEachChildInJSDocImplementsTag<T>(node: JSDocImplementsTag, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.tagName) ||
    //         visitNode(cbNode, node.class) ||
    //         (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
    // },
    // [SyntaxKind.JSDocAugmentsTag]: function forEachChildInJSDocAugmentsTag<T>(node: JSDocAugmentsTag, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.tagName) ||
    //         visitNode(cbNode, node.class) ||
    //         (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
    // },
    // [SyntaxKind.JSDocTemplateTag]: function forEachChildInJSDocTemplateTag<T>(node: JSDocTemplateTag, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.tagName) ||
    //         visitNode(cbNode, node.constraint) ||
    //         visitNodes(cbNode, cbNodes, node.typeParameters) ||
    //         (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
    // },
    // [SyntaxKind.JSDocTypedefTag]: function forEachChildInJSDocTypedefTag<T>(node: JSDocTypedefTag, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.tagName) ||
    //         (node.typeExpression &&
    //                 node.typeExpression.kind === SyntaxKind.JSDocTypeExpression
    //             ? visitNode(cbNode, node.typeExpression) ||
    //                 visitNode(cbNode, node.fullName) ||
    //                 (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment))
    //             : visitNode(cbNode, node.fullName) ||
    //                 visitNode(cbNode, node.typeExpression) ||
    //                 (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment)));
    // },
    // [SyntaxKind.JSDocCallbackTag]: function forEachChildInJSDocCallbackTag<T>(node: JSDocCallbackTag, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return visitNode(cbNode, node.tagName) ||
    //         visitNode(cbNode, node.fullName) ||
    //         visitNode(cbNode, node.typeExpression) ||
    //         (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
    // },
    // [SyntaxKind.JSDocReturnTag]: forEachChildInJSDocTypeLikeTag,
    // [SyntaxKind.JSDocTypeTag]: forEachChildInJSDocTypeLikeTag,
    // [SyntaxKind.JSDocThisTag]: forEachChildInJSDocTypeLikeTag,
    // [SyntaxKind.JSDocEnumTag]: forEachChildInJSDocTypeLikeTag,
    // [SyntaxKind.JSDocSatisfiesTag]: forEachChildInJSDocTypeLikeTag,
    // [SyntaxKind.JSDocThrowsTag]: forEachChildInJSDocTypeLikeTag,
    // [SyntaxKind.JSDocOverloadTag]: forEachChildInJSDocTypeLikeTag,
    // [SyntaxKind.JSDocSignature]: function forEachChildInJSDocSignature<T>(node: JSDocSignature, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return forEach(node.typeParameters, cbNode) ||
    //         forEach(node.parameters, cbNode) ||
    //         visitNode(cbNode, node.type);
    // },
    // [SyntaxKind.JSDocLink]: forEachChildInJSDocLinkCodeOrPlain,
    // [SyntaxKind.JSDocLinkCode]: forEachChildInJSDocLinkCodeOrPlain,
    // [SyntaxKind.JSDocLinkPlain]: forEachChildInJSDocLinkCodeOrPlain,
    // [SyntaxKind.JSDocTypeLiteral]: function forEachChildInJSDocTypeLiteral<T>(node: JSDocTypeLiteral, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    //     return forEach(node.jsDocPropertyTags, cbNode);
    // },
    // [SyntaxKind.JSDocTag]: forEachChildInJSDocTag,
    // [SyntaxKind.JSDocClassTag]: forEachChildInJSDocTag,
    // [SyntaxKind.JSDocPublicTag]: forEachChildInJSDocTag,
    // [SyntaxKind.JSDocPrivateTag]: forEachChildInJSDocTag,
    // [SyntaxKind.JSDocProtectedTag]: forEachChildInJSDocTag,
    // [SyntaxKind.JSDocReadonlyTag]: forEachChildInJSDocTag,
    // [SyntaxKind.JSDocDeprecatedTag]: forEachChildInJSDocTag,
    // [SyntaxKind.JSDocOverrideTag]: forEachChildInJSDocTag,
    // [SyntaxKind.JSDocImportTag]: forEachChildInJSDocImportTag,
    // [SyntaxKind.PartiallyEmittedExpression]: forEachChildInPartiallyEmittedExpression,
};

// prettier-ignore
function visitNodes<T>(cbNode: (node: Node) => T, cbNodes: ((node: NodeArray<Node>) => T | undefined) | undefined, nodes: NodeArray<Node> | undefined): T | undefined {
    if (nodes) {
        if (cbNodes) {
            return cbNodes(nodes);
        }
        for (const node of nodes) {
            const result = cbNode(node);
            if (result) {
                return result;
            }
        }
    }
}

function visitNode<T>(
    cbNode: (node: Node) => T,
    node: Node | undefined
): T | undefined {
    return node && cbNode(node);
}
