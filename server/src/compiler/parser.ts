import * as antlr from "antlr4ng";
import * as parserCore from "../parser3/parser-core";
import { BaseNodeFactory, Identifier, Node, NodeFlags, SyntaxKind, SourceFile, createNodeFactory, NodeFactoryFlags, objectAllocator, EndOfFileToken, Debug, Mutable, setTextRangePosEnd, Statement, setTextRangePosWidth, NodeArray, HasJSDoc, VariableStatement, TypeNode, UnionTypeNode, VariableDeclarationList, VariableDeclaration, Expression, BinaryOperatorToken, BinaryExpression, Block, MemberExpression, LiteralExpression, LiteralSyntaxKind, LeftHandSideExpression, InlineClosureExpression, ReturnStatement, BreakOrContinueStatement, InheritDeclaration, StringLiteral, getNestedTerminals, StringConcatExpression, IfStatement, SwitchStatement, CaseClause, DefaultClause, CaseOrDefaultClause, emptyArray, PostfixUnaryOperator, DiagnosticMessage, DiagnosticArguments, DiagnosticWithDetachedLocation, lastOrUndefined, createDetachedDiagnostic, TextRange, Diagnostics, attachFileToDiagnostics, Modifier, ParameterDeclaration, DotDotDotToken, AmpersandToken, ForEachChildNodes, FunctionDeclaration, FunctionExpression, CallExpression, PostfixUnaryExpression, ConditionalExpression, DoWhileStatement, WhileStatement, ForStatement, ForEachStatement, ExpressionStatement, ContinueStatement, BreakStatement, CaseBlock, isArray, ModifierFlags, tracing, performance, forEach, JSDocParsingMode, ScriptTarget, ResolutionMode, getAnyExtensionFromPath, fileExtensionIs, Extension, getBaseFileName, supportedDeclarationExtensions, ScriptKind, TextChangeRange, PrefixUnaryExpression, first, LanguageVariant } from "./_namespaces/lpc";
import { ILpcConfig } from "../config-types";
import { LpcConfig } from "../backend/LpcConfig";




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

    var programTree: parserCore.ProgramContext; // antlr parse tree

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
    var parseDiagnostics: DiagnosticWithDetachedLocation[];

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

        parseDiagnostics = [];
        nodeCount = 0;
        topLevel = true;
        identifiers = new Map<string, string>();
        identifierCount = 0;
        programTree = undefined!;

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

        parseDiagnostics = undefined!;
        sourceText = undefined!;
        topLevel = true;
        programTree = undefined!; // should this be cleared?
    }

    export function parseSourceFile(
        fileName: string,
        sourceText: string,
        config: ILpcConfig,
        setParentNodes = false,
        setExternalModuleIndicator?: (file: SourceFile) => void,
        jsDocParsingMode = JSDocParsingMode.ParseAll
    ) {
        initState(fileName, sourceText, config);
        const result = parseSourceFileWorker();
        clearState();
        return result;
    }

    function parseSourceFileWorker() {
        // execute the antlr parser
        const tree = programTree = parser.program();
        const eofToken = parseTokenNode<EndOfFileToken>(tree.EOF());
        const statements = parseList(tree.declaration(), parseStatementWorker);
        const inherits = parseList(tree.inheritStatement(), parseInheritStatement);
        const sourceFile = createSourceFile(fileName, statements, eofToken);

        sourceFile.nodeCount = nodeCount;
        sourceFile.identifierCount = identifierCount;
        sourceFile.identifiers = identifiers;
        sourceFile.inherits = inherits;        
        sourceFile.parseDiagnostics = attachFileToDiagnostics(parseDiagnostics, sourceFile);        

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
        sourceFile.bindDiagnostics = [];
        sourceFile.bindSuggestionDiagnostics = undefined;
        sourceFile.languageVersion = ScriptTarget.LPC;
        sourceFile.fileName = fileName;
        sourceFile.languageVariant = LanguageVariant.LDMud;
        sourceFile.isDeclarationFile = false;
        sourceFile.scriptKind = ScriptKind.LPC;
        
        return sourceFile;
    }

    function parseErrorAtPosition(start: number, length: number, message: DiagnosticMessage, ...args: DiagnosticArguments): DiagnosticWithDetachedLocation | undefined {
        // Don't report another error if it would just be at the same position as the last error.
        const lastError = lastOrUndefined(parseDiagnostics);
        let result: DiagnosticWithDetachedLocation | undefined;
        if (!lastError || start !== lastError.start) {
            result = createDetachedDiagnostic(fileName, sourceText, start, length, message, ...args);
            parseDiagnostics.push(result);
        }

        // Mark that we've encountered an error.  We'll set an appropriate bit on the next
        // node we finish so that it can't be reused incrementally.
        parseErrorBeforeNextFinishedNode = true;
        return result;
    }
    
    function parseErrorAt(start: number, end: number, message: DiagnosticMessage, ...args: DiagnosticArguments): DiagnosticWithDetachedLocation | undefined {
        return parseErrorAtPosition(start, end - start, message, ...args);
    }

    function parseErrorAtRange(range: TextRange, message: DiagnosticMessage, ...args: DiagnosticArguments): void {
        parseErrorAt(range.pos, range.end, message, ...args);
    }

    function parseErrorAtTermina(terminal: antlr.TerminalNode, message: DiagnosticMessage, ...args: DiagnosticArguments): DiagnosticWithDetachedLocation | undefined {
        return parseErrorAtToken(terminal.symbol, message, ...args);
    }
    function parseErrorAtToken(token: antlr.Token, message: DiagnosticMessage, ...args: DiagnosticArguments): DiagnosticWithDetachedLocation | undefined {
        return parseErrorAt(token.start, token.stop, message, ...args);
    }

    function isPosition(pos: any): pos is Position {
        return (typeof pos==="object") && (typeof pos["pos"]==="number");
    }

    function createMissingNode<T extends Node>(kind: T["kind"], posOrToken: Position, diagnosticMessage?: DiagnosticMessage, ...args: DiagnosticArguments): T;
    function createMissingNode<T extends Node>(kind: T["kind"], posOrToken: antlr.Token, diagnosticMessage: DiagnosticMessage, ...args: DiagnosticArguments): T;
    function createMissingNode<T extends Node>(kind: T["kind"], posOrToken: Position|antlr.Token, diagnosticMessage?: DiagnosticMessage, ...args: DiagnosticArguments): T {
        let pos: Position;
        if (isPosition(posOrToken)) {
            pos = posOrToken;
            parseErrorAtPosition(posOrToken.pos, 0, diagnosticMessage!, ...args);
        }
        else if (diagnosticMessage) {
            parseErrorAtToken(posOrToken, diagnosticMessage, ...args);
            pos = createPosition(posOrToken.start, posOrToken.stop);
        }
        
        const result = kind === SyntaxKind.Identifier ? factory.createIdentifier("") :            
            kind === SyntaxKind.IntLiteral ? factory.createIntLiteral("", /*numericLiteralFlags*/ undefined) :
            kind === SyntaxKind.FloatLiteral ? factory.createFloatLiteral("", /*numericLiteralFlags*/ undefined) :
            kind === SyntaxKind.StringLiteral ? factory.createStringLiteral("", /*isSingleQuote*/ undefined) :
            //kind === SyntaxKind.MissingDeclaration ? factory.createMissingDeclaration() :
            factory.createToken(kind);
        return finishNode(result, pos.pos, pos.end) as T;
    }
    
    function parseTokenNode<T extends Node>(parserNode: antlr.TerminalNode | antlr.Token): T {
        const kind = getSyntaxKindFromLex(parserNode);
        if (parserNode instanceof antlr.TerminalNode) {
            const {pos, end} = getTerminalPos(parserNode);                    
            return finishNode(factory.createToken(kind), pos, end) as T;
        } else {
            return finishNode(factory.createToken(kind), parserNode.start, parserNode.stop) as T;
        }
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
    
    interface Position { pos: number; end: number; __positionBrand:any; };

    function createPosition(pos: number, end: number): Position {
        return { pos, end } as Position;
    }

    function getTerminalPos(t: antlr.TerminalNode): Position {
        return createPosition(t.getSymbol().start, t.getSymbol().stop);
    }    

    function getNodePos(tree: antlr.ParserRuleContext): Position {
        return createPosition(tree?.start?.start, tree?.stop.stop+1);
    }
    
    /** Converts a Lexer terinal node's type to a SyntaxKind */    
    function getSyntaxKindFromLex(t: antlr.TerminalNode | antlr.Token): SyntaxKind {
        const lexType = (t instanceof antlr.TerminalNode) ? t.getSymbol().type : (t).type;
        const kind = LexerToSyntaxKind[lexType];
        Debug.assertIsDefined(kind, `Unknown lexer type ${lexType}`);
        return kind;
    }

    function parseList<T extends Node, R extends antlr.ParserRuleContext>(
        parseTrees: R[],
        parseElement: (parseTree: R) => T
    ): NodeArray<T> {
        if (!parseTrees || parseTrees.length==0) return undefined;
        const list = [];
        let {pos,end} = getNodePos(parseTrees.at(0));        

        for (const parseTree of parseTrees) {
            const node = parseElement(parseTree);
            end = node.end;
            list.push(node);
        }

        return createNodeArray(list, pos, end);
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

    function parseStatement(tree: parserCore.StatementContext): Statement {
        if (tree.children.length > 1 && tree.children[1].getText() != ";") {
            Debug.assertEqual(tree.children.length, 1, "Expected only 1 child statement");
        }
        return parseStatementWorker(tree.children[0] as antlr.ParserRuleContext);
    }

    function parseStatementWorker(tree: antlr.ParserRuleContext): Statement {
        const ruleIndex = tree.ruleIndex;
        switch (ruleIndex) {            
            case parserCore.LPCParser.RULE_declaration:
                return parseDeclaration(tree as parserCore.DeclarationContext);
            case parserCore.LPCParser.RULE_variableDeclarationStatement:
                return parseVariableStatement(tree as parserCore.VariableDeclarationStatementContext);
            case parserCore.LPCParser.RULE_commaableExpression:
                return parseExpressionStatement(tree as parserCore.CommaableExpressionContext);
            case parserCore.LPCParser.RULE_jumpStatement: // return, break, continue
                const jumpTree = tree as parserCore.JumpStatementContext;
                if (jumpTree.returnStatement())
                    return parseReturnStatement(jumpTree.returnStatement());
                else if (jumpTree.BREAK()) {
                    return parseBreakOrContinueStatement(jumpTree.BREAK(), SyntaxKind.BreakStatement);
                } else if (jumpTree.CONTINUE()) {
                    return parseBreakOrContinueStatement(jumpTree.CONTINUE(), SyntaxKind.ContinueStatement);
                }
                break;  // will fail   
            case parserCore.LPCParser.RULE_block:
                return parseBlock(tree as parserCore.BlockContext);
            case parserCore.LPCParser.RULE_selectionStatement: // if or switch            
                const selStmt = tree as parserCore.SelectionStatementContext;
                if (selStmt.ifStatement())
                    return parseIfStatement(selStmt.ifStatement());
                else if (selStmt.switchStatement())
                    return parseSwitchStatement(selStmt.switchStatement());
                break;  
            case parserCore.LPCParser.RULE_iterationStatement: // for, while, do
                const iterStmt = tree as parserCore.IterationStatementContext;                
                if (iterStmt instanceof parserCore.ForStatementContext) {
                    return parseForStatement(iterStmt);
                } else if (iterStmt instanceof parserCore.ForEachStatementContext) {
                    return parseForEachStatement(iterStmt);
                } else if (iterStmt instanceof parserCore.DoWhileStatementContext) {
                    return parseDoWhileStatement(iterStmt);
                } else if (iterStmt instanceof parserCore.WhileStatementContext) {
                    return parseWhileStatement(iterStmt);
                
                }           
        }

        Debug.fail(`parseStatement unknown parser rule [${ruleIndex}]`);
    }

    function parseOptional<N,T extends antlr.ParserRuleContext>(
        tree: T, 
        parser: (tree: T) => N
    ): N {
        if (tree) {
            return parser(tree);
        }
    }

    function parseWhileStatement(tree: parserCore.WhileStatementContext): Statement {
        const {pos,end} = getNodePos(tree);
        const jsDoc = getPrecedingJSDocBlock(tree);
        const body = parseStatement(tree.statement());
        const expr = parseExpression(tree.expression());
        const node = factory.createWhileStatement(body, expr);
        return withJSDoc(finishNode(node, pos, end), jsDoc);
    }

    function parseDoWhileStatement(tree: parserCore.DoWhileStatementContext): Statement {
        const {pos,end} = getNodePos(tree);
        const jsDoc = getPrecedingJSDocBlock(tree);
        const body = parseStatement(tree.statement());
        const expr = parseExpression(tree.expression());
        const node = factory.createDoWhileStatement(body, expr);
        return withJSDoc(finishNode(node, pos, end), jsDoc);
    }

    function parseForEachStatement(tree: parserCore.ForEachStatementContext): Statement {
        const {pos,end} = getNodePos(tree);        
        const jsDoc = getPrecedingJSDocBlock(tree);
        const forEachTree = tree.foreachRangeExpression();
        
        const init = parseList(forEachTree.variableDeclarationList(), parseVariableDeclarationList);
        const expr1 = parseExpression(forEachTree.expression().at(0));
        const expr2 = parseOptional(forEachTree.expression().at(1), parseExpression);
        const body = parseStatement(tree.statement());

        // TODO, check for extra artifacts that shouldn't be there (like variable modifiers)

        let range = expr1;
        if (forEachTree.DOUBLEDOT()) {
            if (!expr2) {
                return createMissingNode(SyntaxKind.ExpressionStatement, forEachTree.DOUBLEDOT().symbol, Diagnostics.Expression_expected);                
            }
            
            // this is a range expression
            range = makeBinaryExpression(expr1, factory.createToken(SyntaxKind.DotDotToken), expr2, expr1.pos, expr2.end);            
        } 

        const node = factory.createForEachStatement(init, range, body);        
        return withJSDoc(finishNode(node, pos, end), jsDoc);
    }

    function parseForStatement(tree: parserCore.ForStatementContext): Statement {
        const {pos,end} = getNodePos(tree);        
        const forExpr = tree.forRangeExpression();
        const jsDoc = getPrecedingJSDocBlock(tree);
                
        const init = parseOptional(forExpr._init,  parseVariableDeclarationList);
        const condition = parseOptional(forExpr._condition, parseExpression);
        const increment = parseOptional(forExpr._incrementor, parseCommaExpression);        
        const body = parseOptional(tree.statement(), parseStatement);

        const node = factory.createForStatement(init, condition, increment, body);
        return withJSDoc(finishNode(node, pos, end), jsDoc);
    }

    function parseCaseStatement(tree: parserCore.CaseStatementContext): CaseClause {
        const caseExpr = tree.caseExpression();
        const expressions = caseExpr.expression();

        const expr1 = parseExpression(expressions[0]);
        const expr2 = parseOptional(expressions.at(1), parseExpression);
        const statements = parseStatementList(tree.statement());

        // TODO range expression with no left hand expression is Fluff-only.. validate and log diagnostics

        let nodeExpr = expr1;
        if (caseExpr.DOUBLEDOT()) {
            // this is a range expression
            nodeExpr = makeBinaryExpression(expr1, factory.createToken(SyntaxKind.DotDotToken), expr2, getNodePos(tree).pos, getNodePos(tree).end);                
        }

        const {pos,end} = getNodePos(tree);
        return finishNode(factory.createCaseClause(nodeExpr, statements), pos, end);
    }

    function parseDefaultStatement(tree: parserCore.DefaultStatementContext): DefaultClause {
        const statements = parseStatementList(tree.statement());
        const {pos,end} = getNodePos(tree);
        return finishNode(factory.createDefaultClause(statements), pos, end);
    }

    function parseSwitchStatement(tree: parserCore.SwitchStatementContext): SwitchStatement {
        const {pos,end} = getNodePos(tree);

        // parse initial expression
        const expression = parseExpression(tree.expression());
        // parse code block before case clauses
        const preBlock = parseList(tree.variableDeclarationStatement(), parseStatementWorker);

        // parse case clauses
        const clauses:CaseOrDefaultClause[] = tree.caseStatement().map(c=>{
            return parseCaseStatement(c);            
        }) ?? [];
        
        // parse default clause
        if (tree.defaultStatement().length > 0) {
            const defaultClause = parseOptional(tree.defaultStatement().at(0), parseDefaultStatement);
            clauses.push(defaultClause);

            const extraDefault = tree.defaultStatement().at(1);
            if (extraDefault) {
                parseErrorAtTermina(extraDefault.DEFAULT(), Diagnostics.A_default_clause_cannot_appear_more_than_once_in_a_switch_statement);
            }
        }
        
        const caseBlock = factory.createCaseBlock(clauses.filter(c=>!!c));        
        const node = factory.createSwitchStatement(expression, preBlock, caseBlock);
        return finishNode(node, pos, end);
    }

    function parseIfStatementWorker(tree: parserCore.IfExpressionContext | parserCore.ElseIfExpressionContext, rest: (parserCore.IfExpressionContext | parserCore.ElseIfExpressionContext | parserCore.ElseExpressionContext)[]): IfStatement {
        const {pos} = getNodePos(tree);

        // get the first test expression
        const e = parseExpression(tree.expression());
        
        // get the "then" statement
        Debug.assertEqual(tree.statement().children.length, 1, "Expected only 1 statement");
        const t = parseStatement(tree.statement());

        // get the next elseif/else in the sequence (there might not be any)
        const next = rest.shift();
        const {end} = getNodePos(next ? next : tree);

        if (next instanceof parserCore.ElseExpressionContext) {            
            const elT = parseStatement(next.statement());
            return finishNode(factory.createIfStatement(e,t,elT), pos, end);
        } else if (next) {            
            const nextNode = parseIfStatementWorker(next, rest);            
            return finishNode(factory.createIfStatement(e,t,nextNode), pos, end);
        } else {
            return finishNode(factory.createIfStatement(e,t), pos, end);
        }
    }

    function parseIfStatement(tree: parserCore.IfStatementContext): IfStatement {                
        const ifExpr = tree.ifExpression();
        const rest = [...tree.elseIfExpression(), tree.elseExpression()].filter(e=>!!e);

        return parseIfStatementWorker(ifExpr, rest);        
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

        const expression = tree.commaableExpression() ? parseCommaExpression(tree.commaableExpression()) : undefined;
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

            return finishNode(
                createTypeNode(createNodeArray(types, pos, end)),
                pos,
                end
            );
        }

        return first(types); // node was already finished
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
        if (tree.STAR()?.length > 0) {
            typeNode = finishNode(factory.createArrayTypeNode(typeNode), pos, end);
        }

        return typeNode;
    }

    function tryParseModifiers(tree: parserCore.VariableModifierContext | parserCore.FunctionModifierContext): Modifier {
        const {pos,end} = getNodePos(tree);
        const terminal = tree.getChild(0) as antlr.TerminalNode;
        const kind = getSyntaxKindFromLex(terminal);

        return finishNode(factory.createToken(kind as Modifier["kind"]), pos, end);
    }        

    function parseModifiers(tree: parserCore.VariableModifierContext[] | parserCore.FunctionModifierContext[]): NodeArray<Modifier> {
        return parseList(tree, tryParseModifiers);
    }

    /** a variable declaration has a Type and Declaration List, but no modifiers */
    function parseVariableDeclarationList(tree: parserCore.VariableDeclarationListContext, inForStatementInitializer=false): VariableDeclarationList {
        const declListTree = tree.variableDeclaratorExpression();

        // TODO: this might not actually be a variable declaration - it might be an assignment opertor
        // figure that out here or in the type checker?

        const {pos,end} = getNodePos(tree); 
        const flags = NodeFlags.Variable;
        const type = parseType(tree.unionableTypeSpecifier());           
        const declarationList = parseList(declListTree, (t) => { return parseVariableDeclaration(type, t, inForStatementInitializer); });
        
        const node = factory.createVariableDeclarationList(declarationList, flags);

        return finishNode(node, pos, end);
    }
    
    /** A Var Decl Statement has Modifiers and a Decl (Type & Declaration List) */
    function parseVariableStatement(tree: parserCore.VariableDeclarationStatementContext): VariableStatement {
        const declListTree = tree.variableDeclarationList();

        const {pos,end} = getNodePos(tree);
        const jsDoc = getPrecedingJSDocBlock(tree);
        const modifiers = parseModifiers(declListTree.variableModifier());
        const decl = parseVariableDeclarationList(declListTree);

        const node = factory.createVariableStatement(modifiers, decl);
        return withJSDoc(finishNode(node, pos, end), jsDoc);
    }

    function parseVariableDeclaration(type: TypeNode, declExp: parserCore.VariableDeclaratorExpressionContext, inForStatementInitializer: boolean): VariableDeclaration {
        const {pos,end} = getNodePos(declExp);
        
        const decl = declExp.variableDeclarator();
        const jsDoc = getPrecedingJSDocBlock(decl);
        const name = parseValidIdentifier(decl._variableName);
        const initializer = !declExp.variableInitializer() ? undefined : parseInitializer(declExp.variableInitializer());
        const node = factory.createVariableDeclaration(name, type, initializer);
    
        return withJSDoc(finishNode(node, pos, end), jsDoc);                
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
        
        if (tree.COMMA().length > 0) {
            // TODO: this is a fluff-style function pointer
        } else if (tree.FUNCTION()) {
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

    function parseCallOtherTarget(tree: parserCore.CallOtherTargetContext): Expression {
        if (tree.Identifier()) return createIdentifier(tree, true);
        else if (tree.StringLiteral()) return parseStringLiteralNode(tree.StringLiteral());
        else return parseExpression(tree.expression());
    }

    function parsePrimaryExpression(
        tree: parserCore.PrimaryExpressionContext
    ): Expression {
        let {pos,end} = getNodePos(tree);

        const startTree = tree.primaryExpressionStart();
        let leftExp: Expression;
        if (startTree instanceof parserCore.StringConcatExpressionContext) {
            leftExp = parseStringLiterals(startTree.StringLiteral());
        } else {
            leftExp = parsePrimaryExpressionStart(startTree);

            if (tree.ARROW().length > 0) {
                // we have a property access expression
                const target = tree.callOtherTarget().at(0);
                if (target) {                
                    const targetExpr = parseCallOtherTarget(target);
                    leftExp = factory.createPropertyAccessExpression(leftExp, targetExpr);
                } else if (tree._structMember) {
                    const member = tree._structMember;                    
                    leftExp = factory.createPropertyAccessExpression(leftExp, asIdentifier(member));
                }
            } else if (tree._op) {
                let opKind:PostfixUnaryOperator;
                switch (tree._op.type) {
                    case parserCore.LPCLexer.DEC:
                        opKind = SyntaxKind.MinusMinusToken;
                        break;
                    case parserCore.LPCLexer.INC:
                        opKind = SyntaxKind.PlusPlusToken;
                        break;
                    default:
                        Debug.fail("Unknown postfix unary operator");
                        // TODO log diagnostic                        
                }
                end = tree._op.stop + 1;
                return finishNode(factory.createPostfixUnaryExpression(leftExp, opKind), pos, end);
            }

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
            const {pos:callPos,end:callEnd} = getNodePos(tree);
            const invocCtx = tree.methodInvocation().at(0);
            const argCtxList = invocCtx.argumentList();
            
            const args = argCtxList?.argument().map(a => {            
                const argExp = parseExpression(a.expression());

                if (a.TRIPPLEDOT) {
                    // TODO: parse spread element
                    // return finishNode(factory.createSpreadElement(argExp), getNodePos(a), getNodeEnd(a));
                }

                return argExp;
            });

            const {pos, end} = getNodePos(argCtxList);
            const argNodes = createNodeArray(args, pos, end);
            expression = finishNode(factory.createCallExpression(expression, argNodes), callPos, callEnd);
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
            case parserCore.LPCLexer.IntegerConstant:
                type = SyntaxKind.IntLiteral;
                break;
            case parserCore.LPCLexer.FloatingConstant:
                type = SyntaxKind.FloatLiteral;
                break;
            case parserCore.LPCLexer.StringLiteral:
                type = SyntaxKind.StringLiteral;
                break;
        }
        const node = factory.createLiteralLikeNode(type, token.getText());
        return finishNode(node, pos, end);
    }

    function parseStringLiteralNode(tree: antlr.TerminalNode): StringLiteral {
        const {pos,end} = getTerminalPos(tree);
        
        Debug.assertEqual(parserCore.LPCLexer.StringLiteral, tree.symbol.type, "Expected StringLiteral token type");
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

    /**
     * creates an identifier from a TerminalNode or Antlr Token 
     */
    function asIdentifier(token: antlr.Token): Identifier;
    function asIdentifier(terminal: antlr.TerminalNode): Identifier;
    function asIdentifier(terminal: antlr.TerminalNode|antlr.Token): Identifier {
        if (terminal instanceof antlr.TerminalNode) {
            const { pos,end} = getTerminalPos(terminal);
            return finishNode(factory.createIdentifier(internIdentifier(terminal.getText())),pos,end);
        } else {
            const pos = terminal.start, end = terminal.stop;
            return finishNode(factory.createIdentifier(internIdentifier(terminal.text)),pos,end);
        }
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
        const statements = parseList(tree,parseStatement);
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

    function parseFunctionParameter(tree: parserCore.ParameterContext): ParameterDeclaration {
        const name = parseValidIdentifier(tree._paramName);
        const type = parseOptional(tree.unionableTypeSpecifier(), parseType);        
        const trippleDot = tree.TRIPPLEDOT() ? parseTokenNode<DotDotDotToken>(tree.TRIPPLEDOT()) : undefined;
        const amp = tree.AND() ? parseTokenNode<AmpersandToken>(tree.AND()) : undefined;
        const varArgs = tree.VARARGS();

        const jsDoc = getPrecedingJSDocBlock(tree);

        // parameters can only have 1 modifier (unless you count the tripple dot and amp)
        let modifiers: Modifier[] = [];
        if (varArgs) {            
            const {pos,end} = getTerminalPos(varArgs);
            const kind = getSyntaxKindFromLex(varArgs);
            modifiers = [finishNode(factory.createToken(kind as Modifier["kind"]), pos, end)];
        }

        let initializer:Expression;        
        if (tree.ASSIGN()) 
            initializer = parseOptional(tree.expression(), parseExpression);
        else if (tree.COLON) 
            initializer = parseOptional(tree.inlineClosureExpression(), parseInlineClosureLikeExpression);

        const node = factory.createParameterDeclaration(modifiers, trippleDot, name, amp, type, initializer);
        return withJSDoc(finishNode(node, getNodePos(tree).pos, getNodePos(tree).end), jsDoc);
    }   

    function parseFunctionDeclaration(
        tree: parserCore.FunctionDeclarationContext,
        pos: number,
        jsDocBlock: string
    ) {
        const header = tree.functionHeader();
        const {end} = getNodePos(tree);

        const name = header._functionName;        
        const modifiers = parseModifiers(header.functionModifier());
        const identifier = parseValidIdentifier(name);

        const returnType = parseType(
            header.typeSpecifier()?.unionableTypeSpecifier()
        );

        const parameters = parseList(header._functionArgs?.parameter(), parseFunctionParameter);

        const body = parseFunctionBlock(tree.block()); // parseFunctionBlockOrSemicolon(isGenerator | isAsync, Diagnostics.or_expected);

        const node = factory.createFunctionDeclaration(
            modifiers,
            identifier,
            parameters,
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
                
        const stringLiterals = getNestedTerminals(tree.inherit(), parserCore.LPCLexer.StringLiteral);
        const stringNode = parseStringLiterals(stringLiterals);       

        const node = factory.createInheritDeclaration(stringNode, undefined);
        return finishNode(node, pos,end);
    }
}

export const LexerToSyntaxKind: { [key: number]: SyntaxKind } = {
    [parserCore.LPCLexer.EOF]: SyntaxKind.EndOfFileToken,
    // TYPES
    [parserCore.LPCLexer.INT]: SyntaxKind.IntKeyword,
    [parserCore.LPCLexer.FLOAT]: SyntaxKind.FloatKeyword,
    [parserCore.LPCLexer.STRING]: SyntaxKind.StringKeyword,
    [parserCore.LPCLexer.CLOSURE]: SyntaxKind.ClosureKeywoord,
    [parserCore.LPCLexer.MIXED]: SyntaxKind.MixedKeyword,
    [parserCore.LPCLexer.MAPPING]: SyntaxKind.MappingKeyword,
    [parserCore.LPCLexer.UNKNOWN]: SyntaxKind.UnknownKeyword,
    [parserCore.LPCLexer.STRUCT]: SyntaxKind.StructKeyword,
    [parserCore.LPCLexer.VOID]: SyntaxKind.VoidKeyword,
    [parserCore.LPCLexer.OBJECT]: SyntaxKind.ObjectKeyword,
    // MODIFIERS
    [parserCore.LPCLexer.PRIVATE]: SyntaxKind.PrivateKeyword,
    [parserCore.LPCLexer.PROTECTED]: SyntaxKind.ProtectedKeyword,
    [parserCore.LPCLexer.PUBLIC]: SyntaxKind.PublicKeyword,
    [parserCore.LPCLexer.STATIC]: SyntaxKind.StaticKeyword,
    [parserCore.LPCLexer.VISIBLE]: SyntaxKind.VisibleKeyword,
    [parserCore.LPCLexer.NOSAVE]: SyntaxKind.NoSaveKeyword,
    [parserCore.LPCLexer.NOSHADOW]: SyntaxKind.NoShadowKeyword,
    [parserCore.LPCLexer.NOMASK]: SyntaxKind.NoMaskKeyword,
    [parserCore.LPCLexer.VARARGS]: SyntaxKind.VarArgsKeyword,
    [parserCore.LPCLexer.DEPRECATED]: SyntaxKind.DeprecatedKeyword,
    // OPERATORS
    [parserCore.LPCLexer.ASSIGN]: SyntaxKind.EqualsToken,
    [parserCore.LPCLexer.ADD_ASSIGN]: SyntaxKind.PlusEqualsToken,
    [parserCore.LPCLexer.SUB_ASSIGN]: SyntaxKind.MinusEqualsToken,
    [parserCore.LPCLexer.MUL_ASSIGN]: SyntaxKind.AsteriskEqualsToken,
    [parserCore.LPCLexer.XOR_ASSIGN]: SyntaxKind.AsteriskAsteriskEqualsToken,
    [parserCore.LPCLexer.DIV_ASSIGN]: SyntaxKind.SlashEqualsToken,
    [parserCore.LPCLexer.MOD_ASSIGN]: SyntaxKind.PercentEqualsToken,
    [parserCore.LPCLexer.SHL_ASSIGN]: SyntaxKind.LessThanLessThanEqualsToken,
    [parserCore.LPCLexer.RSH_ASSIGN]: SyntaxKind.GreaterThanGreaterThanEqualsToken,
    [parserCore.LPCLexer.BITOR_ASSIGN]: SyntaxKind.BarEqualsToken,
    [parserCore.LPCLexer.BITAND_ASSIGN]: SyntaxKind.AmpersandEqualsToken,
    [parserCore.LPCLexer.OR_ASSIGN]: SyntaxKind.BarBarEqualsToken,
    [parserCore.LPCLexer.AND_ASSIGN]: SyntaxKind.AmpersandEqualsToken,
    [parserCore.LPCLexer.PLUS]: SyntaxKind.PlusToken,
    [parserCore.LPCLexer.MINUS]: SyntaxKind.MinusToken,
    [parserCore.LPCLexer.STAR]: SyntaxKind.AsteriskToken,
    [parserCore.LPCLexer.DIV]: SyntaxKind.SlashToken,
    [parserCore.LPCLexer.MOD]: SyntaxKind.PercentToken,
    [parserCore.LPCLexer.INC]: SyntaxKind.PlusPlusToken,
    [parserCore.LPCLexer.DEC]: SyntaxKind.MinusMinusToken,
    [parserCore.LPCLexer.LT]: SyntaxKind.LessThanToken,
    [parserCore.LPCLexer.GT]: SyntaxKind.GreaterThanToken,
    [parserCore.LPCLexer.LE]: SyntaxKind.LessThanEqualsToken,
    [parserCore.LPCLexer.GE]: SyntaxKind.GreaterThanEqualsToken,
    [parserCore.LPCLexer.EQ]: SyntaxKind.EqualsEqualsToken,
    [parserCore.LPCLexer.NE]: SyntaxKind.ExclamationEqualsToken,
    [parserCore.LPCLexer.AND]: SyntaxKind.AmpersandToken,
    [parserCore.LPCLexer.OR]: SyntaxKind.BarToken,
    [parserCore.LPCLexer.XOR]: SyntaxKind.CaretToken,
    [parserCore.LPCLexer.NOT]: SyntaxKind.ExclamationToken,
    [parserCore.LPCLexer.AND_AND]: SyntaxKind.AmpersandAmpersandToken,
    [parserCore.LPCLexer.OR_OR]: SyntaxKind.BarBarToken,
    [parserCore.LPCLexer.QUESTION]: SyntaxKind.QuestionToken,
    [parserCore.LPCLexer.COLON]: SyntaxKind.ColonToken,
    [parserCore.LPCLexer.HASH]: SyntaxKind.HashToken,
    [parserCore.LPCLexer.DOT]: SyntaxKind.DotToken,
    [parserCore.LPCLexer.TRIPPLEDOT]: SyntaxKind.DotDotDotToken,    
    [parserCore.LPCLexer.COMMA]: SyntaxKind.CommaToken,
};

function visitNode<T>(cbNode: (node: Node) => T, node: Node | undefined): T | undefined {
    return node && cbNode(node);
}

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

type ForEachChildFunction<TNode> = <T>(node: TNode, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined) => T | undefined;
type ForEachChildTable = Partial<{ [TNode in ForEachChildNodes as TNode["kind"]]: ForEachChildFunction<TNode>; }>;
// ^ that type really shouldn't be partial, but I've set it that way until this is filled out.
const forEachChildTable: ForEachChildTable = {
    [SyntaxKind.SourceFile]: function forEachChildInSourceFile<T>(node: SourceFile, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.statements) 
            || visitNode(cbNode, node.endOfFileToken);
    },
    [SyntaxKind.Parameter]: function forEachChildInParameter<T>(node: ParameterDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.dotDotDotToken) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.ampToken) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.initializer);
    },    
    [SyntaxKind.FunctionDeclaration]: function forEachChildInFunctionDeclaration<T>(node: FunctionDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.asteriskToken) ||
            visitNode(cbNode, node.name) ||            
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.body);
    },
    [SyntaxKind.FunctionExpression]: function forEachChildInFunctionExpression<T>(node: FunctionExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.asteriskToken) ||
            visitNode(cbNode, node.name) ||            
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.body);
    },
    [SyntaxKind.InlineClosureExpression]: function forEachChildInInlineClosureExpression<T>(node: InlineClosureExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.body);
    },
    [SyntaxKind.UnionType]: function forEachChildInUnionOrIntersectionType<T>(node: UnionTypeNode, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.types);
    },
    [SyntaxKind.CallExpression]: forEachChildInCallOrNewExpression,
    [SyntaxKind.PostfixUnaryExpression]: function forEachChildInPostfixUnaryExpression<T>(node: PostfixUnaryExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.operand);
    },
    [SyntaxKind.PrefixUnaryExpression]: function forEachChildInPrefixUnaryExpression<T>(node: PrefixUnaryExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.operand);
    },
    [SyntaxKind.BinaryExpression]: function forEachChildInBinaryExpression<T>(node: BinaryExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.left) ||
            visitNode(cbNode, node.operatorToken) ||
            visitNode(cbNode, node.right);
    },
    [SyntaxKind.ConditionalExpression]: function forEachChildInConditionalExpression<T>(node: ConditionalExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.condition) ||
            visitNode(cbNode, node.questionToken) ||
            visitNode(cbNode, node.whenTrue) ||
            visitNode(cbNode, node.colonToken) ||
            visitNode(cbNode, node.whenFalse);
    },
    [SyntaxKind.Block]: forEachChildInBlock,
    [SyntaxKind.VariableStatement]: function forEachChildInVariableStatement<T>(node: VariableStatement, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.declarationList);
    },
    [SyntaxKind.VariableDeclarationList]: function forEachChildInVariableDeclarationList<T>(node: VariableDeclarationList, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.declarations);
    },
    [SyntaxKind.VariableDeclaration]: function forEachChildInVariableDeclaration<T>(node: VariableDeclaration, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.name) ||            
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.initializer);
    },
    [SyntaxKind.ExpressionStatement]: function forEachChildInExpressionStatement<T>(node: ExpressionStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [SyntaxKind.IfStatement]: function forEachChildInIfStatement<T>(node: IfStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.thenStatement) ||
            visitNode(cbNode, node.elseStatement);
    },
    [SyntaxKind.DoWhileStatement]: function forEachChildInDoStatement<T>(node: DoWhileStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.statement) ||
            visitNode(cbNode, node.expression);
    },
    [SyntaxKind.WhileStatement]: function forEachChildInWhileStatement<T>(node: WhileStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.statement);
    },
    [SyntaxKind.ForStatement]: function forEachChildInForStatement<T>(node: ForStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.initializer) ||
            visitNode(cbNode, node.condition) ||
            visitNode(cbNode, node.incrementor) ||
            visitNode(cbNode, node.statement);
    },
    [SyntaxKind.ForEachStatement]: function forEachChildInForInStatement<T>(node: ForEachStatement, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.initializer) ||
            visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.statement);
    },    
    [SyntaxKind.ContinueStatement]: forEachChildInContinueOrBreakStatement,
    [SyntaxKind.BreakStatement]: forEachChildInContinueOrBreakStatement,
    [SyntaxKind.ReturnStatement]: function forEachChildInReturnStatement<T>(node: ReturnStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },    
    [SyntaxKind.SwitchStatement]: function forEachChildInSwitchStatement<T>(node: SwitchStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.caseBlock);
    },
    [SyntaxKind.CaseBlock]: function forEachChildInCaseBlock<T>(node: CaseBlock, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.clauses);
    },
    [SyntaxKind.CaseClause]: function forEachChildInCaseClause<T>(node: CaseClause, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNodes(cbNode, cbNodes, node.statements);
    },
    [SyntaxKind.DefaultClause]: function forEachChildInDefaultClause<T>(node: DefaultClause, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.statements);
    },
};

function forEachChildInContinueOrBreakStatement<T>(node: ContinueStatement | BreakStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.label);
}

function forEachChildInBlock<T>(node: Block, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNodes(cbNode, cbNodes, node.statements);
}

function forEachChildInCallOrNewExpression<T>(node: CallExpression /*| NewExpression*/, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.expression) ||        
        visitNodes(cbNode, cbNodes, node.arguments);
}


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
export function forEachChild<T>(node: Node, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    if (node === undefined || node.kind <= SyntaxKind.LastToken) {
        return;
    }
    if (node.kind === SyntaxKind.DoWhileStatement) {
        debugger;
    }
    const fn = (forEachChildTable as Record<SyntaxKind, ForEachChildFunction<any>>)[node.kind];
    return fn === undefined ? undefined : fn(node, cbNode, cbNodes);
}


/**
 * Invokes a callback for each child of the given node. The 'cbNode' callback is invoked for all child nodes
 * stored in properties. If a 'cbNodes' callback is specified, it is invoked for embedded arrays; additionally,
 * unlike `forEachChild`, embedded arrays are flattened and the 'cbNode' callback is invoked for each element.
 *  If a callback returns a truthy value, iteration stops and that value is returned. Otherwise, undefined is returned.
 *
 * @param node a given node to visit its children
 * @param cbNode a callback to be invoked for all child nodes
 * @param cbNodes a callback to be invoked for embedded array
 *
 * @remarks Unlike `forEachChild`, `forEachChildRecursively` handles recursively invoking the traversal on each child node found,
 * and while doing so, handles traversing the structure without relying on the callstack to encode the tree structure.
 *
 * @internal
 */
export function forEachChildRecursively<T>(rootNode: Node, cbNode: (node: Node, parent: Node) => T | "skip" | undefined, cbNodes?: (nodes: NodeArray<Node>, parent: Node) => T | "skip" | undefined): T | undefined {
    const queue: (Node | NodeArray<Node>)[] = gatherPossibleChildren(rootNode);
    const parents: Node[] = []; // tracks parent references for elements in queue
    while (parents.length < queue.length) {
        parents.push(rootNode);
    }
    while (queue.length !== 0) {
        const current = queue.pop()!;
        const parent = parents.pop()!;
        if (isArray(current)) {
            if (cbNodes) {
                const res = cbNodes(current, parent);
                if (res) {
                    if (res === "skip") continue;
                    return res;
                }
            }
            for (let i = current.length - 1; i >= 0; --i) {
                queue.push(current[i]);
                parents.push(parent);
            }
        }
        else {
            const res = cbNode(current, parent);
            if (res) {
                if (res === "skip") continue;
                return res;
            }
            if (current.kind >= SyntaxKind.FirstNode) {
                // add children in reverse order to the queue, so popping gives the first child
                for (const child of gatherPossibleChildren(current)) {
                    queue.push(child);
                    parents.push(current);
                }
            }
        }
    }
}

function gatherPossibleChildren(node: Node) {
    const children: (Node | NodeArray<Node>)[] = [];
    forEachChild(node, addWorkItem, addWorkItem); // By using a stack above and `unshift` here, we emulate a depth-first preorder traversal
    return children;

    function addWorkItem(n: Node | NodeArray<Node>) {
        children.unshift(n);
    }
}


function setExternalModuleIndicator(sourceFile: SourceFile) {
    sourceFile.externalModuleIndicator = true;
}

export function createSourceFile(fileName: string, sourceText: string, config: LpcConfig, languageVersionOrOptions: ScriptTarget | CreateSourceFileOptions, setParentNodes = false, scriptKind?: ScriptKind): SourceFile {
    tracing?.push(tracing.Phase.Parse, "createSourceFile", { path: fileName }, /*separateBeginAndEnd*/ true);
    performance.mark("beforeParse");
    let result: SourceFile;

    
    const setIndicator = (file: SourceFile) => {
        setExternalModuleIndicator(file);
    };
    result = LpcParser.parseSourceFile(fileName, sourceText, config, setParentNodes, setIndicator);


    performance.mark("afterParse");
    performance.measure("Parse", "beforeParse", "afterParse");
    tracing?.pop();
    return result;
}

export interface CreateSourceFileOptions {
    languageVersion: ScriptTarget;
    /**
     * Controls the format the file is detected as - this can be derived from only the path
     * and files on disk, but needs to be done with a module resolution cache in scope to be performant.
     * This is usually `undefined` for compilations that do not have `moduleResolution` values of `node16` or `nodenext`.
     */
    impliedNodeFormat?: ResolutionMode;
    /**
     * Controls how module-y-ness is set for the given file. Usually the result of calling
     * `getSetExternalModuleIndicator` on a valid `CompilerOptions` object. If not present, the default
     * check specified by `isFileProbablyExternalModule` will be used to set the field.
     */
    setExternalModuleIndicator?: (file: SourceFile) => void;
    /** @internal */ packageJsonLocations?: readonly string[];
    ///** @internal */ packageJsonScope?: PackageJsonInfo;
    jsDocParsingMode?: JSDocParsingMode;
}

/** @internal */
export function isDeclarationFileName(fileName: string): boolean {
    return getDeclarationFileExtension(fileName) !== undefined;
}


/** @internal */
export function getDeclarationFileExtension(fileName: string): string | undefined {
    const standardExtension = getAnyExtensionFromPath(fileName, supportedDeclarationExtensions, /*ignoreCase*/ false);
    if (standardExtension) {
        return standardExtension;
    }
    if (fileExtensionIs(fileName, Extension.C)) {
        const index = getBaseFileName(fileName).lastIndexOf(".d.");
        if (index >= 0) {
            return fileName.substring(index);
        }
    }
    return undefined;
}


// Produces a new SourceFile for the 'newText' provided. The 'textChangeRange' parameter
// indicates what changed between the 'text' that this SourceFile has and the 'newText'.
// The SourceFile will be created with the compiler attempting to reuse as many nodes from
// this file as possible.
//
// Note: this function mutates nodes from this SourceFile. That means any existing nodes
// from this SourceFile that are being held onto may change as a result (including
// becoming detached from any SourceFile).  It is recommended that this SourceFile not
// be used once 'update' is called on it.
export function updateSourceFile(sourceFile: SourceFile, newText: string, config: LpcConfig, textChangeRange: TextChangeRange, aggressiveChecks = false): SourceFile {
    console.warn("implement me- updateSourceFile");
    return LpcParser.parseSourceFile(sourceFile.fileName, newText, config, /*setParentNodes*/ false);
    // const newSourceFile = IncrementalParser.updateSourceFile(sourceFile, newText, textChangeRange, aggressiveChecks);
    // // Because new source file node is created, it may not have the flag PossiblyContainDynamicImport. This is the case if there is no new edit to add dynamic import.
    // // We will manually port the flag to the new source file.
    // (newSourceFile as Mutable<SourceFile>).flags |= sourceFile.flags & NodeFlags.PermanentlySetIncrementalFlags;
    // return newSourceFile;    
}