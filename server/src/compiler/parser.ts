import * as antlr from "antlr4ng";
import * as parserCore from "../parser3/parser-core";
import { BaseNodeFactory, Identifier, Node, NodeFlags, SyntaxKind, SourceFile, createNodeFactory, NodeFactoryFlags, objectAllocator, EndOfFileToken, Debug, Mutable, setTextRangePosEnd, Statement, setTextRangePosWidth, NodeArray, HasJSDoc, VariableStatement, TypeNode, UnionTypeNode, VariableDeclarationList, VariableDeclaration, Expression, BinaryOperatorToken, BinaryExpression, Block, MemberExpression, LiteralExpression, LiteralSyntaxKind, LeftHandSideExpression, InlineClosureExpression, ReturnStatement, BreakOrContinueStatement, InheritDeclaration, StringLiteral, getNestedTerminals, StringConcatExpression } from "./_namespaces/lpc";
import { ILpcConfig } from "../config-types";
import { LPCLexer } from "../parser3/LPCLexer";

export namespace LpcParser {
    // Init some ANTLR stuff
    const lexer = new parserCore.LPCPreprocessingLexer(
        antlr.CharStream.fromString(""),
        ""
    );
    const tokenStream = new antlr.CommonTokenStream(lexer);
    const parser = new parserCore.LPCParser(tokenStream);
    parser.errorHandler = new antlr.DefaultErrorStrategy();
    parser.interpreter.predictionMode = antlr.PredictionMode.SLL;
    parser.buildParseTrees = true;

    var tree: parserCore.ProgramContext; // antlr parse tree

    // capture constructors in 'initializeState' to avoid null checks
    var NodeConstructor: new (kind: SyntaxKind, pos: number, end: number) => Node; // prettier-ignore
    var TokenConstructor: new (kind: SyntaxKind, pos: number, end: number) => Node; // prettier-ignore
    var IdentifierConstructor: new (kind: SyntaxKind.Identifier, pos: number, end: number) => Identifier; // prettier-ignore    
    var SourceFileConstructor: new (kind: SyntaxKind.SourceFile, pos: number, end: number) => SourceFile; // prettier-ignore

    var fileName: string;
    var sourceFlags: NodeFlags;
    var sourceText: string;
    var config: ILpcConfig;
    
    var topLevel: boolean = true;
    var contextFlags: NodeFlags;
    var parseErrorBeforeNextFinishedNode = false;

    var nodeCount: number;
    var identifiers: Map<string, string>;
    var identifierCount: number;

    function countNode(node: Node) {
        nodeCount++;
        return node;
    }

    // Rather than using `createBaseNodeFactory` here, we establish a `BaseNodeFactory` that closes over the
    // constructors above, which are reset each time `initializeState` is called.    
    var baseNodeFactory: BaseNodeFactory = {
        createBaseSourceFileNode: kind => countNode(new SourceFileConstructor(kind, /*pos*/ 0, /*end*/ 0)),
        createBaseIdentifierNode: kind => countNode(new IdentifierConstructor(kind, /*pos*/ 0, /*end*/ 0)),        
        createBaseTokenNode: kind => countNode(new TokenConstructor(kind, /*pos*/ 0, /*end*/ 0)),
        createBaseNode: kind => countNode(new NodeConstructor(kind, /*pos*/ 0, /*end*/ 0)),
    };

    var factory = createNodeFactory(NodeFactoryFlags.NoParenthesizerRules | NodeFactoryFlags.NoNodeConverters | NodeFactoryFlags.NoOriginalNode, baseNodeFactory);

    function initState(
        _fileName: string,
        _sourceText: string,
        _config: ILpcConfig
    ) {
        NodeConstructor = objectAllocator.getNodeConstructor();
        TokenConstructor = objectAllocator.getTokenConstructor();
        IdentifierConstructor = objectAllocator.getIdentifierConstructor();        
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

    function parseSourceFileWorker() {
        // execute the antlr parser
        tree = parser.program();
        const eofToken = parseTokenNode<EndOfFileToken>(tree.EOF());
        const statements = parseList(tree.declaration(), parseStatement);
        const inherits = parseList(tree.inheritStatement(), parseInheritStatement);
        const sourceFile = createSourceFile(fileName, statements, eofToken);

        sourceFile.nodeCount = nodeCount;
        sourceFile.identifierCount = identifierCount;
        sourceFile.identifiers = identifiers;
        sourceFile.inherits = inherits;

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

    function parseTokenNode<T extends Node>(parserNode: antlr.TerminalNode): T {
        const {pos, end} = getTerminalPos(parserNode);            
        const kind = getSyntaxKindFromLex(parserNode);
        return finishNode(factory.createToken(kind), pos, end) as T;
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
    
    type Position = { pos: number, end: number };

    function getTerminalPos(t: antlr.TerminalNode): Position {
        return { pos: t.getSymbol().start, end: t.getSymbol().stop };
    }    

    function getNodePos(tree: antlr.ParserRuleContext): Position {
        return { pos: tree?.start?.start, end: tree?.stop.stop };        
    }
    
    /** Converts a Lexer terinal node's type to a SyntaxKind */
    function getSyntaxKindFromLex(t: antlr.Token): SyntaxKind;
    function getSyntaxKindFromLex(t: antlr.TerminalNode): SyntaxKind;
    function getSyntaxKindFromLex(t: antlr.TerminalNode | antlr.Token): SyntaxKind {
        const lexType = (t instanceof antlr.TerminalNode) ? t.getSymbol().type : (t).type;
        const kind = LexerToSyntaxKind[lexType];
        Debug.assertIsDefined(kind, `Unknown lexer type ${lexType}`);
        return kind;
    }

    function parseList<T extends Node>(
        parseTrees: antlr.ParserRuleContext[],
        parseElement: (parseTree: antlr.ParserRuleContext) => T
    ): NodeArray<T> {
        const list = [];
        const {pos,end} = getNodePos(parseTrees.at(0));        

        for (const parseTree of parseTrees) {
            const node = parseElement(parseTree);
            list.push(node);
        }

        return createNodeArray(list, pos,end);
    }

    function createNodeArray<T extends Node>(
        elements: T[],
        pos: number,
        end: number,
        hasTrailingComma?: boolean
    ): NodeArray<T> {
        const array = factory.createNodeArray(elements, hasTrailingComma);
        setTextRangePosEnd(array, pos, end);
        return array;
    }

    function parseStatement(tree: antlr.ParserRuleContext): Statement {
        const ruleIndex = tree.ruleIndex;
        switch (ruleIndex) {
            case parserCore.LPCParser.RULE_declaration:
                return parseDeclaration(tree as parserCore.DeclarationContext);
            case parserCore.LPCParser.RULE_variableDeclarationStatement:
                return parseVariableStatement(tree as parserCore.VariableDeclarationStatementContext);
            case parserCore.LPCParser.RULE_commaableExpression:
                return parseExpressionStatement(tree as parserCore.CommaableExpressionContext);
            case parserCore.LPCParser.RULE_jumpStatement:
                const jumpTree = tree as parserCore.JumpStatementContext;
                if (jumpTree.returnStatement())
                    return parseReturnStatement(jumpTree.returnStatement());
                else if (jumpTree.BREAK()) {
                    parseBreakOrContinueStatement(jumpTree.BREAK(), SyntaxKind.BreakStatement);
                } else if (jumpTree.CONTINUE()) {
                    parseBreakOrContinueStatement(jumpTree.CONTINUE(), SyntaxKind.ContinueStatement);
                }
                break;                
        }

        Debug.fail(`parseStatement unknown parser rule [${ruleIndex}]`);
    }

    function parseBreakOrContinueStatement(terminal: antlr.TerminalNode, kind: SyntaxKind): BreakOrContinueStatement {
        const {pos,end} = getTerminalPos(terminal);
                        
        const node = kind === SyntaxKind.BreakStatement
            ? factory.createBreakStatement()
            : factory.createContinueStatement();
        return finishNode(node, pos, end);
    }

    function parseReturnStatement(tree: parserCore.ReturnStatementContext): ReturnStatement {
        const {pos,end} = getNodePos(tree);
        const jsDoc = getPrecedingJSDocBlock(tree);

        const expression = parseCommaExpression(tree.commaableExpression());
        return withJSDoc(finishNode(factory.createReturnStatement(expression), pos, end), jsDoc);
    }

    function parseExpressionStatement(tree: parserCore.CommaableExpressionContext) {
        const {pos,end} = getNodePos(tree);
        //let jsDoc = getPrecedingJSDocBlock(tree);
        const expression = parseCommaExpression(tree);
        const statement = factory.createExpressionStatement(expression);
        return finishNode(statement, pos,end);
    }

    function parseCommaExpression(tree: parserCore.CommaableExpressionContext): Expression {
        // Expression[in]:
        //      InlineClosureExpression
        //      AssignmentExpression[in]
        //      AssignmentExpression[in] , AssignmentExpression[in]

        if (tree.inlineClosureExpression()) {
            return parseInlineClosureLikeExpression(
                tree.inlineClosureExpression()
            );
        }

        let {pos,end} = getNodePos(tree);
        const children = tree.children;

        // grab the first expression
        let expr = parseAssignmentExpressionOrHigher(children[0] as parserCore.ConditionalExpressionContext);

        for (let i = 1; i < children.length; i += 2) {
            pos = getNodePos(children[i-1] as antlr.ParserRuleContext).pos;
            const operator = parseTokenNode<BinaryOperatorToken>(children[i] as antlr.TerminalNode);
            const rightExpr = parseAssignmentExpressionOrHigher(children[i + 1] as parserCore.ConditionalExpressionContext);
            end = getNodePos(children[i + 1] as antlr.ParserRuleContext).end;
            
            expr = makeBinaryExpression(expr, operator, rightExpr, pos, end);
        }

        return expr;
    }

    function parseDeclaration(tree: parserCore.DeclarationContext) {
        const treeNode = tree.getChild(0) as antlr.ParserRuleContext;
        const {pos} = getNodePos(tree);

        switch (treeNode.ruleIndex) {
            case parserCore.LPCParser.RULE_functionDeclaration:
                return parseFunctionDeclaration(treeNode as parserCore.FunctionDeclarationContext, pos, getPrecedingJSDocBlock(tree));
            case parserCore.LPCParser.RULE_variableDeclarationStatement:
                return parseVariableStatement(treeNode as parserCore.VariableDeclarationStatementContext);
        }
    }

    function parseUnionTypeOrHigher(
        tree: parserCore.UnionableTypeSpecifierContext,
        parseConsituaentType: (tree: parserCore.UnionableTypeSpecifierContext) => TypeNode,
        createTypeNode: (types: NodeArray<TypeNode>) => UnionTypeNode
    ): TypeNode {
        const {pos,end} = getNodePos(tree);

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

    function parsePrimitiveTypeSpecifier(tree: parserCore.PrimitiveTypeSpecifierContext) {
        return parseTokenNode<TypeNode>(tree.getChild(0) as antlr.TerminalNode);
    }
    
    function parseType(tree: parserCore.UnionableTypeSpecifierContext): TypeNode {
        if (!tree) return undefined;

        const type = parseUnionTypeOrHigher(
            tree,
            parsePossibleArrayType,
            factory.createUnionTypeNode
        );
        return type;
    }

    function parsePossibleArrayType(tree: parserCore.UnionableTypeSpecifierContext): TypeNode {
        const {pos,end} = getNodePos(tree);

        let typeNode: TypeNode | undefined;
        if (tree.primitiveTypeSpecifier()) {
            typeNode = parsePrimitiveTypeSpecifier(tree.primitiveTypeSpecifier());
        }
        if (tree.STAR()) {
            typeNode = finishNode(factory.createArrayTypeNode(typeNode), pos, end);
        }

        return typeNode;
    }
    
    function parseVariableStatement(tree: parserCore.VariableDeclarationStatementContext): VariableStatement {
        const declTree = tree.variableDeclaration();
        const declListTree = declTree.variableDeclaratorExpression();

        // TODO: this might not actually be a variable declaration - it might be an assignment opertor
        // figure that out here or in the type checker?

        const {pos,end} = getNodePos(tree);
        const type = parseType(declTree._type_);
        const declarationList = parseVariableDeclarationList(
            type,
            declListTree,
            /*inForStatementInitializer*/ false
        );
        const modifiers = undefined; // TODO modifiersToFlags(header.functionModifier().map(m=>m.getChild(0)));
        const jsDoc = getPrecedingJSDocBlock(tree);
        const node = factory.createVariableStatement(modifiers, declarationList);

        return withJSDoc(finishNode(node, pos, end), jsDoc);
    }

    function parseVariableDeclarationList(type: TypeNode, declListTree: parserCore.VariableDeclaratorExpressionContext[], inForStatementInitializer: boolean): VariableDeclarationList {
        const {pos} = getNodePos(declListTree.at(0)),
            {end} = getNodePos(declListTree.at(-1));
        const declarations: VariableDeclaration[] = [];

        for (const declExp of declListTree) {
            const decl = declExp.variableDeclarator();
            const jsDoc = getPrecedingJSDocBlock(decl);
            const name = parseValidIdentifier(decl._variableName);
            const initializer = !declExp.variableInitializer() ? undefined : parseInitializer(declExp.variableInitializer());
            const node = factory.createVariableDeclaration(name, type, initializer);
            const {pos:nodePos,end:nodeEnd} = getNodePos(declExp);

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

    function parseInitializer(tree: parserCore.VariableInitializerContext): Expression | undefined {        
        return tree ? parseAssignmentExpressionOrHigher(tree.expression().conditionalExpression()) : undefined;
    }

    function asToken<T extends Node>(token: antlr.Token): T {
        const pos = token.start, end = token.stop;
        const kind = getSyntaxKindFromLex(token);        
        return finishNode(factory.createToken(kind), pos, end) as T;
    }
    
    function parseAssignmentExpressionOrHigher(tree: parserCore.ConditionalExpressionContext): Expression {
        const {pos,end} = getNodePos(tree);

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
            const trueExpr = parseAssignmentExpressionOrHigher(tree.children[2] as parserCore.ConditionalExpressionContext);
            const falseExpr = parseAssignmentExpressionOrHigher(tree.children[4] as parserCore.ConditionalExpressionContext);

            return finishNode(
                factory.createConditionalExpression(lastExp, asToken(tree._ternOp), trueExpr, asToken(tree._ternOp2), falseExpr),
                pos, end
            );
        }

        // everythign else is a binary expression
        for (let i = 1; i < tree.children.length; i += 2) {
            const childExprTree = tree.children.at(i + 1) as parserCore.ConditionalExpressionContext,
                opToken = tree.children.at(i);
            const childExpr = childExprTree ? parseAssignmentExpressionOrHigher(childExprTree) : undefined;

            if (opToken) {
                const operator = parseTokenNode<BinaryOperatorToken>(
                    opToken instanceof antlr.TerminalNode ? opToken : opToken.getChild(0) as antlr.TerminalNode
                );
                if (!childExpr) {
                    const ii = 0;
                }
                lastExp = makeBinaryExpression(
                    lastExp,
                    operator,
                    childExpr,
                    pos,
                    getNodePos(childExprTree).end
                );
            }
        }

        return lastExp;
    }

    function parseInlineClosureLikeExpression(tree: parserCore.InlineClosureExpressionContext): InlineClosureExpression | undefined {
        const {pos,end} = getNodePos(tree);
        
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
            return finishNode(node, pos, end);
        }
    }

    function parsePrimaryExpression(
        tree: parserCore.PrimaryExpressionContext
    ): Expression {
        const {pos,end} = getNodePos(tree);

        const startTree = tree.primaryExpressionStart();
        let leftExp: Expression;
        if (startTree instanceof parserCore.StringConcatExpressionContext) {
            leftExp = parseStringLiterals(startTree.StringLiteral());
        } else {
            leftExp = parsePrimaryExpressionStart(startTree);

            if (tree.methodInvocation()) {            
                return parseCallExpressionRest(tree, pos, leftExp as MemberExpression);
            }
        }

        return leftExp;
    }

    function parseExpression(tree: parserCore.ExpressionContext): Expression {
        return parseAssignmentExpressionOrHigher(tree.conditionalExpression());
    }

    function parseCallExpressionRest(tree: parserCore.PrimaryExpressionContext, pos: number, expression: LeftHandSideExpression): LeftHandSideExpression {
        if (tree.methodInvocation()?.length > 0) {
            const invocCtx = tree.methodInvocation().at(0);
            const argCtxList = invocCtx.argumentList();
            
            const args = argCtxList.argument().map(a => {            
                const argExp = parseExpression(a.expression());

                if (a.TRIPPLEDOT) {
                    // TODO: parse spread element
                    // return finishNode(factory.createSpreadElement(argExp), getNodePos(a), getNodeEnd(a));
                }

                return argExp;
            });

            const {pos, end} = getNodePos(argCtxList);
            const argNodes =createNodeArray(args, pos, end);
            expression = factory.createCallExpression(expression, argNodes);
        }

        return expression;
    }

    function parsePrimaryExpressionStart(tree: antlr.ParserRuleContext): MemberExpression {        
        const firstChild = tree.children[0] as antlr.ParserRuleContext;
        if (firstChild instanceof parserCore.ValidIdentifiersContext) {
            return parseValidIdentifier(firstChild);
        } else if (firstChild instanceof parserCore.LiteralContext) {
            return parseLiteralNode(firstChild);
        } 

        return undefined;
    }

    function parseLiteralNode(tree: parserCore.LiteralContext): LiteralExpression {
        const {pos,end} = getNodePos(tree);
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

    function parseStringLiteralNode(tree: antlr.TerminalNode): StringLiteral {
        const {pos,end} = getTerminalPos(tree);
        
        Debug.assertEqual(LPCLexer.StringLiteral, tree.symbol.type, "Expected StringLiteral token type");
        const node = factory.createLiteralLikeNode(SyntaxKind.StringLiteral, tree.getText()) as StringLiteral;
        
        return finishNode(node, pos, end);
    }
    
    function parseStringLiterals(tree: antlr.TerminalNode[]) {
        const literals = tree;

        const nodes = literals.map((l) => parseStringLiteralNode(l));
        if (nodes.length==1) {
            return nodes[0];
        } else {
            let left = nodes[0] as Expression;
            for (let i = 1; i < nodes.length; i++) {
                left = factory.createBinaryExpression(left, factory.createToken(SyntaxKind.PlusToken), nodes[i]);
            }

            return left as StringConcatExpression;
        }        
    }

    function makeBinaryExpression(left: Expression, operatorToken: BinaryOperatorToken, right: Expression, pos: number, end: number): BinaryExpression {
        return finishNode(factory.createBinaryExpression(left, operatorToken, right), pos, end);
    }

    /** gets a potential jsdoc comment block */
    function getPrecedingJSDocBlock(
        tree: antlr.ParserRuleContext
    ): string | undefined {
        const tokens = tokenStream.getHiddenTokensToLeft(
            tree.start.tokenIndex,
            parserCore.COMMENT_CHANNEL
        );
        if (tokens?.length > 0) {
            const commentText = tokens.find((t) =>
                t?.text?.trim()?.startsWith("/**")
            )?.text;
            return commentText;
        }
        return undefined;
    }

    function parseValidIdentifier(tree: parserCore.ValidIdentifiersContext): Identifier {
        return createIdentifier(tree, true);
    }

    function internIdentifier(text: string): string {
        let identifier = identifiers.get(text);
        if (identifier === undefined) {
            identifiers.set(text, (identifier = text));
        }
        return identifier;
    }

    // The 'identifiers' object is used to share a single string instance for
    // each identifier in order to reduce memory consumption.
    function createIdentifier(
        tree: antlr.ParserRuleContext, isIdentifier: boolean
        //diagnosticMessage?: DiagnosticMessage, privateIdentifierDiagnosticMessage?: DiagnosticMessage
    ): Identifier {
        if (isIdentifier) {
            identifierCount++;
            const {pos,end} = getNodePos(tree);
            
            // Store original token kind if it is not just an Identifier so we can report appropriate error later in type checker
            const text = internIdentifier(tree.getText());

            return finishNode(factory.createIdentifier(text), pos, end);
        }

        // TODO: handle error nodes here
    }

    function parseStatementList(tree: parserCore.StatementContext[]): NodeArray<Statement> {
        const statements = parseList(
            tree.map((s) => s.getChild(0) as antlr.ParserRuleContext),
            parseStatement
        );
        return statements;
    }

    function parseBlock(tree: parserCore.BlockContext): Block {
        const {pos,end} = getNodePos(tree);
        const hasJSDoc = getPrecedingJSDocBlock(tree);
        const multiLine =
            tree.CURLY_OPEN().symbol.line !== tree.CURLY_CLOSE().symbol.line;
        const statements = parseStatementList(tree.statement());
        const result = withJSDoc(finishNode(factory.createBlock(statements, multiLine), pos, end), hasJSDoc);

        return result;
    }

    function parseFunctionBlock(tree: parserCore.BlockContext): Block | undefined {
        const savedTopLevel = topLevel;
        topLevel = false;

        const blockContent = parseBlock(tree);

        topLevel = savedTopLevel;
        return blockContent;
    }
    
    function parseFunctionDeclaration(
        tree: parserCore.FunctionDeclarationContext,
        pos: number,
        jsDocBlock: string
    ) {
        const header = tree.functionHeader();
        const {end} = getNodePos(tree);

        const name = header._functionName;
        const mod = header.functionModifier()[0];
        //TODO const modifiers = modifiersToFlags(header.functionModifier().map(m=>m.getChild(0)));
        const identifier = parseValidIdentifier(name);

        const returnType = parseType(
            header.typeSpecifier()?.unionableTypeSpecifier()
        );

        const body = parseFunctionBlock(tree.block()); // parseFunctionBlockOrSemicolon(isGenerator | isAsync, Diagnostics.or_expected);

        const node = factory.createFunctionDeclaration(
            undefined, // TODO
            identifier,
            [], // TODO
            returnType,
            body
        );

        return withJSDoc(finishNode(node, pos, end), jsDocBlock);
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

    function parseInheritStatement(tree: parserCore.InheritStatementContext): InheritDeclaration {
        const {pos,end} = getNodePos(tree);

        // TODO: get modifiers
        
        
        const stringLiterals = getNestedTerminals(tree.inherit(), LPCLexer.StringLiteral);
        const stringNode = parseStringLiterals(stringLiterals);       

        const node = factory.createInheritDeclaration(stringNode, undefined);
        return finishNode(node, pos,end);
    }
}

export const LexerToSyntaxKind: { [key: number]: SyntaxKind } = {
    [LPCLexer.EOF]: SyntaxKind.EndOfFileToken,
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
    [LPCLexer.AND_ASSIGN]: SyntaxKind.AmpersandEqualsToken,
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
    [LPCLexer.COMMA]: SyntaxKind.CommaToken,
};