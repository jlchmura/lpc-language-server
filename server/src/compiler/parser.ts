import * as antlr from "antlr4ng";
import {
    COMMENT_CHANNEL,
    LPCPreprocessingLexer,
} from "../parser3/LPCPreprocessingLexer";
import { BaseNodeFactory } from "./baseNodeFactory";
import { createNodeFactory } from "./nodeFactory";
import {
    Block,
    EndOfFileToken,
    HasJSDoc,
    Identifier,
    LexerToSyntaxKind,
    Node,
    NodeArray,
    NodeFlags,
    PrivateIdentifier,
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
    DeclarationContext,
    FunctionDeclarationContext,
    LPCParser,
    PrimitiveTypeSpecifierContext,
    ProgramContext,
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

    function parseBlock(tree: BlockContext): Block {
        const pos = getNodePos(tree),
            end = getNodeEnd(tree);
        const hasJSDoc = getPrecedingJSDocBlock(tree);
        const multiLine =
            tree.CURLY_OPEN().symbol.line !== tree.CURLY_CLOSE().symbol.line;
        const statements = parseList(
            tree
                .statement()
                .map((s) => s.getChild(0) as antlr.ParserRuleContext),
            parseStatement
        );
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
}
