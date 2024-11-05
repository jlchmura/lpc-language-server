import { isIdentifier as isIdentifierNode, BaseNodeFactory, Identifier, Node, NodeFlags, SyntaxKind, SourceFile, createNodeFactory, NodeFactoryFlags, objectAllocator, EndOfFileToken, Debug, Mutable, setTextRangePosEnd, Statement, setTextRangePosWidth, NodeArray, HasJSDoc, VariableStatement, TypeNode, UnionTypeNode, VariableDeclarationList, VariableDeclaration, Expression, BinaryOperatorToken, BinaryExpression, Block, MemberExpression, LiteralExpression, LiteralSyntaxKind, LeftHandSideExpression, InlineClosureExpression, ReturnStatement, BreakOrContinueStatement, InheritDeclaration, StringLiteral, StringConcatExpression, IfStatement, SwitchStatement, CaseClause, DefaultClause, CaseOrDefaultClause, emptyArray, PostfixUnaryOperator, DiagnosticMessage, DiagnosticArguments, DiagnosticWithDetachedLocation, lastOrUndefined, createDetachedDiagnostic, TextRange, Diagnostics, attachFileToDiagnostics, Modifier, ParameterDeclaration, DotDotDotToken, AmpersandToken, ForEachChildNodes, FunctionDeclaration, FunctionExpression, CallExpression, PostfixUnaryExpression, ConditionalExpression, DoWhileStatement, WhileStatement, ForStatement, ForEachStatement, ExpressionStatement, ContinueStatement, BreakStatement, CaseBlock, isArray, tracing, performance, forEach, JSDocParsingMode, ScriptTarget, ResolutionMode, getAnyExtensionFromPath, fileExtensionIs, Extension, getBaseFileName, supportedDeclarationExtensions, ScriptKind, TextChangeRange, PrefixUnaryExpression, LanguageVariant, PrefixUnaryOperator, Program, LpcFileHandler, ParenthesizedExpression, ArrayLiteralExpression, LambdaExpression, PunctuationSyntaxKind, PunctuationToken, LambdaOperatorToken, CastExpression, PropertyAccessExpression, CloneObjectExpression, NewExpression, trimQuotes, createScanner, isKeyword, PunctuationOrKeywordSyntaxKind, mapDefined, getJSDocCommentRanges, LabeledStatement, PropertyName, Token, tokenToString, addRelatedInfo, tokenIsIdentifierOrKeyword, getBinaryOperatorPrecedence, addRange, append, ArrayTypeNode, canHaveJSDoc, concatenate, containsParseError, Diagnostic, EntityName, getSpellingSuggestion, identity, idText, isIdentifierText, isTypeReferenceNode, JSDoc, JSDocAugmentsTag, JSDocCallbackTag, JSDocComment, JSDocImplementsTag, JSDocMemberName, JSDocNameReference, JSDocOverloadTag, JSDocParameterTag, JSDocPropertyLikeTag, JSDocPropertyTag, JSDocReturnTag, JSDocSatisfiesTag, JSDocSeeTag, JSDocSignature, JSDocSyntaxKind, JSDocTag, JSDocTemplateTag, JSDocText, JSDocThrowsTag, JSDocTypedefTag, JSDocTypeExpression, JSDocTypeLiteral, JSDocTypeTag, nodeIsMissing, noop, PropertyAccessEntityNameExpression, setParent, skipTrivia, some, CharacterCodes, MapLike, KeywordSyntaxKind, startsWith, textToKeywordObj, ModifierLike, isModifierKind, MissingDeclaration, setTextRangePos, BindingPattern, KeywordTypeSyntaxKind, LiteralTypeNode, IntLiteral, FloatLiteral, LiteralLikeNode, isLiteralKind, TypeReferenceNode, getFullWidth, OperatorPrecedence, UnaryExpression, isLeftHandSideExpression, isAssignmentOperator, isKeywordOrPunctuation, UpdateExpression, PrimaryExpression, nodeIsPresent, PropertyAccessToken, IterationStatement, InheritClauseType, ObjectType, StructTypeNode, NamedDeclaration, TypeElement, PropertySignature, MethodSignature, StructDeclaration, TypeLiteralNode, TypeAssertion, NewStructExpression, ObjectLiteralElementLike, PropertyAssignment, getStartPositionOfLine, MappingLiteralExpression, MappingEntryExpression, isStringOrNumericLiteralLike, ElementAccessExpression,  RangeExpression,  LambdaIdentifierExpression, LambdaOperatorExpression, PreprocessorDirective, IncludeDirective, DefineDirective, UndefDirective, Macro, Scanner, last, ReadonlyTextRange, MacroParameter, forEachEntry, Ternary, isIntLiteral, isArrayTypeNode, SuperAccessExpression, isIndexedAccessTypeNode, isStringLiteral, isBinaryExpression, PragmaDirective, SpreadElement, CatchStatement, CatchExpression, getDirectoryPath, EvaluateExpression, setParentRecursive, ExpressionWithTypeArguments, JSDocThisTag, isJSDocTypeTag, isJSDocReturnTag, JSDocAuthorTag, QualifiedName, JSDocClassTag, JSDocDeprecatedTag, JSDocLink, JSDocLinkCode, JSDocLinkPlain, JSDocOverrideTag, JSDocPrivateTag, JSDocProtectedTag, JSDocPublicTag, JSDocUnknownTag, JsonSourceFile, BooleanLiteral, NullLiteral, JsonMinusNumericLiteral, ObjectLiteralExpression, ShorthandPropertyAssignment, NumericLiteral, JsonObjectExpressionStatement, JSDocVariadicType, PositionState, CommaListExpression, PropertyDeclaration } from "./_namespaces/lpc";

const enum SpeculationKind {
    TryParse,
    Lookahead,
    Reparse,
}

const enum SignatureFlags {
    None = 0,
    Yield = 1 << 0,
    Await = 1 << 1,
    Type = 1 << 2,
    IgnoreMissingOpenBrace = 1 << 4,
    JSDoc = 1 << 5,
}


export namespace LpcParser {
    // Share a single scanner across all calls to parse a source file.  This helps speed things
    // up by avoiding the cost of creating/compiling scanners over and over again.
    var scanner = createScanner(ScriptTarget.Latest, /*skipTrivia*/ true, /*shouldSkipNonParsableDirectives*/ false);

    var currentIncludeDirective: IncludeDirective | undefined;    

    var disallowInAndDecoratorContext = NodeFlags.DisallowInContext | NodeFlags.DecoratorContext;
            
    // capture constructors in 'initializeState' to avoid null checks
    var NodeConstructor: new (kind: SyntaxKind, pos: number, end: number) => Node; // prettier-ignore
    var TokenConstructor: new (kind: SyntaxKind, pos: number, end: number) => Node; // prettier-ignore
    var IdentifierConstructor: new (kind: SyntaxKind.Identifier, pos: number, end: number) => Identifier; // prettier-ignore    
    var SourceFileConstructor: new (kind: SyntaxKind.SourceFile, pos: number, end: number) => SourceFile; // prettier-ignore

    var fileName: string;
    var fileHandler: LpcFileHandler;
    var sourceFlags: NodeFlags;
    var sourceText: string;    

    var languageVersion: ScriptTarget;
    var scriptKind: ScriptKind;
    var languageVariant: LanguageVariant;
    
    var includeFileStack: IncludeDirective[] = [];
    var macroTable: MapLike<Macro> | undefined;        
    var currentMacro: Macro;
    var allowMacroProcessing: boolean = true;

    var conditionalStack: Ternary[];
    var isCodeExecutable: Ternary = Ternary.Unknown;

    var topLevel: boolean = true;
    var contextFlags: NodeFlags;
    var parseErrorBeforeNextFinishedNode = false;
    var parseDiagnostics: DiagnosticWithDetachedLocation[];
    var jsDocDiagnostics: DiagnosticWithDetachedLocation[];    
    var syntaxCursor: IncrementalParser.SyntaxCursor | undefined;
    
    /** indicates if we are inside the speculation helper */
    var isSpeculating: boolean = false;
    var currentToken: SyntaxKind;
    var nodeCount: number;
    var identifiers: Map<string, string>;    
    var identifierCount: number;
    var includeFileCache: MapLike<string>;
    var inherits: InheritDeclaration[];    
    var inactiveRanges: TextRange[];

    // TODO(jakebailey): This type is a lie; this value actually contains the result
    // of ORing a bunch of `1 << ParsingContext.XYZ`.
    var parsingContext: ParsingContext;
    var currentParsingContext: ParsingContext;

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

    var {
        createObjectLiteralExpression: factoryCreateObjectLiteralExpression,
        createElementAccessExpression: factoryCreateElementAccessExpression,
        createForStatement: factoryCreateForStatement,
        createIfStatement: factoryCreateIfStatement,
        createCallExpression: factoryCreateCallExpression,
        createArrayLiteralExpression: factoryCreateArrayLiteralExpression,
        createParenthesizedExpression: factoryCreateParenthesizedExpression,
        createPropertyAccessExpression: factoryCreatePropertyAccessExpression,
        createVariableDeclaration: factoryCreateVariableDeclaration,
        createVariableDeclarationList: factoryCreateVariableDeclarationList,
        createVariableStatement: factoryCreateVariableStatement,
        createBlock: factoryCreateBlock,
        createNodeArray: factoryCreateNodeArray,
        createIntLiteral: factoryCreateIntLiteral,
        createFloatLiteral: factoryCreateFloatLiteral,
        createStringLiteral: factoryCreateStringLiteral,
        createBytesLiteral: factoryCreateBytesLiteral,
        createLiteralLikeNode: factoryCreateLiteralLikeNode,
        createIdentifier: factoryCreateIdentifier,
        createToken: factoryCreateToken,
        createExpressionStatement: factoryCreateExpressionStatement,
        createNewExpression: factoryCreateNewExpression,
    } = factory;

    function initState(
        _fileName: string,
        _sourceText: string,
        _globalIncludes: string[],
        _languageVersion: ScriptTarget, 
        _syntaxCursor: IncrementalParser.SyntaxCursor | undefined, 
        _scriptKind: ScriptKind,        
        _fileHandler: LpcFileHandler,
        _jsDocParsingMode: JSDocParsingMode,
        _languageVariant: LanguageVariant
    ) {
        NodeConstructor = objectAllocator.getNodeConstructor();
        TokenConstructor = objectAllocator.getTokenConstructor();
        IdentifierConstructor = objectAllocator.getIdentifierConstructor();        
        SourceFileConstructor = objectAllocator.getSourceFileConstructor();
        
        fileName = _fileName;
        fileHandler = _fileHandler;
        sourceText = _sourceText;
        
        sourceText = _sourceText;
        languageVersion = _languageVersion;
        syntaxCursor = _syntaxCursor;
        scriptKind = _scriptKind;
        languageVariant = _languageVariant;
        
        macroTable = {
            "__DIR__": createBuiltInMacro(`"${getDirectoryPath(fileName)}"`)
        };

        // create a fake include directive for each global include and put them on the include stack
        includeFileStack = [];
        forEach(_globalIncludes, include => {            
            const includeDirective = finishNode(factory.createIncludeDirective([factory.createStringLiteral(include)], false), 0, 0);
            includeFileStack.push(includeDirective);
        });

        conditionalStack = [];
        currentMacro = undefined!;
                
        includeFileCache = {};
        includeFileCache[fileName] = sourceText;
        currentIncludeDirective = undefined!;        

        parseDiagnostics = [];
        nodeCount = 0;
        topLevel = true;
        identifiers = new Map<string, string>();        
        identifierCount = 0;                
        inherits = [];
        inactiveRanges = [];

        // Initialize and prime the scanner before parsing the source elements.        
        scanner.setText(sourceText);
        scanner.setFileName(fileName);
        scanner.setOnError(scanError);
        scanner.setScriptTarget(languageVersion);
        scanner.setLanguageVariant(languageVariant);
        scanner.setScriptKind(scriptKind);
        scanner.setJSDocParsingMode(_jsDocParsingMode);        
    }

    function clearState() {
        // Clear out the text the scanner is pointing at, so it doesn't keep anything alive unnecessarily.
        scanner.clearCommentDirectives();
        scanner.setText("");
        scanner.setOnError(undefined);
        scanner.setScriptKind(ScriptKind.Unknown);
        scanner.setJSDocParsingMode(JSDocParsingMode.ParseAll);        
        scanner.setFileName(undefined);
        scanner.resetSavedStates();        

        // Clear any data.  We don't want to accidentally hold onto it for too long.
        sourceText = undefined!;
        languageVersion = undefined!;
        syntaxCursor = undefined;
        scriptKind = undefined!;
        languageVariant = undefined!;
        sourceFlags = 0;
        parseDiagnostics = undefined!;
        jsDocDiagnostics = undefined!;
        parsingContext = 0;
        identifiers = undefined!;        
        inherits = undefined!;
        topLevel = true;   
        includeFileCache = undefined!;                
        conditionalStack = undefined!;
        isCodeExecutable = Ternary.Unknown;
        inactiveRanges = undefined!;
        
        currentIncludeDirective = undefined!;
        
        // clear macro data
        Object.values(macroTable).forEach(macro => { macro.argsIn = undefined; });
        macroTable = undefined!;    
        currentMacro = undefined!;
        allowMacroProcessing = true;
    }

    function scanError(message: DiagnosticMessage, length: number, arg0?: any): void {
        parseErrorAtPosition(scanner.getTokenEnd(), length, scanner.getFileName(), message, arg0);
    }

    // Use this function to access the current token instead of reading the currentToken
    // variable. Since function results aren't narrowed in control flow analysis, this ensures
    // that the type checker doesn't make wrong assumptions about the type of the current
    // token (e.g. a call to nextToken() changes the current token but the checker doesn't
    // reason about this side effect).  Mainstream VMs inline simple functions like this, so
    // there is no performance penalty.
    function token(): SyntaxKind {
        return currentToken;
    }        
    
    export function parseJsonText(fileName: string, sourceText: string, languageVersion: ScriptTarget = ScriptTarget.LPC, syntaxCursor?: IncrementalParser.SyntaxCursor, setParentNodes = false): JsonSourceFile {
        initState(fileName, sourceText, emptyArray, languageVersion, syntaxCursor, ScriptKind.JSON, undefined, JSDocParsingMode.ParseAll, LanguageVariant.Standard);
        sourceFlags = contextFlags;

        // Prime the scanner.
        nextToken();
        const pos = getPositionState();
        let statements, endOfFileToken;
        if (token() === SyntaxKind.EndOfFileToken) {
            statements = createNodeArray([], pos.pos, pos.pos);
            endOfFileToken = parseTokenNode<EndOfFileToken>();
        }
        else {
            // Loop and synthesize an ArrayLiteralExpression if there are more than
            // one top-level expressions to ensure all input text is consumed.
            let expressions: Expression[] | Expression | undefined;
            while (token() !== SyntaxKind.EndOfFileToken) {
                let expression;
                switch (token()) {
                    case SyntaxKind.OpenBracketToken:
                        expression = parseJsonArrayLiteralExpression();
                        break;
                    case SyntaxKind.TrueKeyword:
                    case SyntaxKind.FalseKeyword:
                    case SyntaxKind.NullKeyword:
                        expression = parseTokenNode<BooleanLiteral | NullLiteral>();
                        break;
                    case SyntaxKind.MinusToken:
                        if (lookAhead(() => nextToken() === SyntaxKind.NumericLiteral && nextToken() !== SyntaxKind.ColonToken)) {
                            expression = parsePrefixUnaryExpression() as JsonMinusNumericLiteral;
                        }
                        else {
                            expression = parseJsonObjectLiteralExpression();
                        }
                        break;
                    case SyntaxKind.NumericLiteral:
                    case SyntaxKind.StringLiteral:
                        if (lookAhead(() => nextToken() !== SyntaxKind.ColonToken)) {
                            expression = parseLiteralNode() as StringLiteral | NumericLiteral;
                            break;
                        }
                        // falls through
                    default:
                        expression = parseJsonObjectLiteralExpression();
                        break;
                }

                // Error recovery: collect multiple top-level expressions
                if (expressions && isArray(expressions)) {
                    expressions.push(expression);
                }
                else if (expressions) {
                    expressions = [expressions, expression];
                }
                else {
                    expressions = expression;
                    if (token() !== SyntaxKind.EndOfFileToken) {
                        parseErrorAtCurrentToken(Diagnostics.Unexpected_token);
                    }
                }
            }

            const expression = isArray(expressions) ? finishNode(factoryCreateArrayLiteralExpression(expressions), pos) : Debug.checkDefined(expressions);
            const statement = factoryCreateExpressionStatement(expression) as JsonObjectExpressionStatement;
            finishNode(statement, pos);
            statements = createNodeArray([statement], pos);
            endOfFileToken = parseExpectedToken(SyntaxKind.EndOfFileToken, Diagnostics.Unexpected_token) as EndOfFileToken;
        }

        // Set source file so that errors will be reported with this file name
        const sourceFile = createSourceFile(fileName, statements, endOfFileToken);

        if (setParentNodes) {
            fixupParentReferences(sourceFile);
        }

        sourceFile.nodeCount = nodeCount;
        sourceFile.identifierCount = identifierCount;
        sourceFile.identifiers = identifiers;
        sourceFile.parseDiagnostics = attachFileToDiagnostics(parseDiagnostics, sourceFile);
        if (jsDocDiagnostics) {
            sourceFile.jsDocDiagnostics = attachFileToDiagnostics(jsDocDiagnostics, sourceFile);
        }

        const result = sourceFile as JsonSourceFile;
        clearState();
        return result;
    }

    function parseJsonObjectLiteralExpression(): ObjectLiteralExpression {
        const pos = getPositionState();
        const openBracePosition = scanner.getTokenStart();
        const openBraceParsed = parseExpected(SyntaxKind.OpenBraceToken);
        const multiLine = scanner.hasPrecedingLineBreak();
        const properties = parseDelimitedList(ParsingContext.ObjectLiteralMembers, parseJsonObjectLiteralElement, /*considerSemicolonAsDelimiter*/ true);
        parseExpectedMatchingBrackets(SyntaxKind.OpenBraceToken, SyntaxKind.CloseBraceToken, openBraceParsed, openBracePosition, pos.fileName);
        return finishNode(factoryCreateObjectLiteralExpression(properties, multiLine), pos);
    }   

    /**
     * This method parses object literal elements for JSON purposes only. 
     * @returns 
     */
    function parseJsonObjectLiteralElement(): ObjectLiteralElementLike {
        const pos = getPositionState();
        const hasJSDoc = hasPrecedingJSDocComment();

        const modifiers = parseModifiers(/*allowDecorators*/ true);        
        const asteriskToken = parseOptionalToken(SyntaxKind.AsteriskToken);
        const tokenIsIdentifier = isIdentifier();
        const name = parsePropertyName();

        // Disallowing of optional property assignments and definite assignment assertion happens in the grammar checker.
        const questionToken = parseOptionalToken(SyntaxKind.QuestionToken);
        const exclamationToken = parseOptionalToken(SyntaxKind.ExclamationToken);

        // check if it is short-hand property assignment or normal property assignment
        // NOTE: if token is EqualsToken it is interpreted as CoverInitializedName production
        // CoverInitializedName[Yield] :
        //     IdentifierReference[?Yield] Initializer[In, ?Yield]
        // this is necessary because ObjectLiteral productions are also used to cover grammar for ObjectAssignmentPattern
        let node: Mutable<ShorthandPropertyAssignment | PropertyAssignment>;
        // const isShorthandPropertyAssignment = tokenIsIdentifier && (token() !== SyntaxKind.ColonToken);
        // if (isShorthandPropertyAssignment) {
        //     const equalsToken = parseOptionalToken(SyntaxKind.EqualsToken);
        //     const objectAssignmentInitializer = equalsToken ? allowInAnd(() => parseAssignmentExpressionOrHigher(/*allowReturnTypeInArrowFunction*/ true)) : undefined;
        //     node = factory.createShorthandPropertyAssignment(name as Identifier, objectAssignmentInitializer);
        //     // Save equals token for error reporting.
        //     // TODO(rbuckton): Consider manufacturing this when we need to report an error as it is otherwise not useful.
        //     node.equalsToken = equalsToken;
        // }
        // else {
            parseExpected(SyntaxKind.ColonToken);
            const initializer = allowInAnd(() => parseAssignmentExpressionOrHigher(/*allowReturnTypeInArrowFunction*/ true));
            node = factory.createPropertyAssignment(name, initializer);
        // }
        // Decorators, Modifiers, questionToken, and exclamationToken are not supported by property assignments and are reported in the grammar checker
        node.modifiers = modifiers;        
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    /**
     * parses a conditional directive and sets the conditional state
     */
    function processConditionalDirective(incomingToken: SyntaxKind) {
        switch (incomingToken) {
            case SyntaxKind.ElseDirective:
                // end the previous range, if it was inactive
                if (isCodeExecutable === Ternary.False) {
                    endInactiveRange();
                }

                if (isCodeExecutable === Ternary.Unknown) {
                    parseErrorAtCurrentToken(Diagnostics.Else_directive_without_if);                    
                } else {
                    isCodeExecutable = isCodeExecutable === Ternary.False ? Ternary.True : Ternary.False;
                }    
                                
                // start a new range if we are now inactive
                if (isCodeExecutable === Ternary.False) {
                    startInactiveRange();
                }                

                return scanner.scan();  
            case SyntaxKind.ElseIfDirective:
            case SyntaxKind.IfDirective:
                const isElseIf = incomingToken === SyntaxKind.ElseIfDirective;

                // end the previous range, if it was inactive
                if (isCodeExecutable === Ternary.False) {
                    endInactiveRange();
                }

                // already in a conditional, so push that one to the stack
                if (!isElseIf && isCodeExecutable !== Ternary.Unknown) conditionalStack.push(isCodeExecutable);
                else if (isElseIf && isCodeExecutable === Ternary.Unknown) {
                    parseErrorAtCurrentToken(Diagnostics.Elseif_directive_without_if);
                }
                                        
                let tokenCount = 0;                
                incomingToken = scanner.scan();
                while (incomingToken != SyntaxKind.NewLineTrivia && incomingToken != SyntaxKind.EndOfFileToken) {
                    tokenCount++;

                    if (incomingToken === SyntaxKind.IntLiteral && scanner.getTokenValue() === "0") {
                        isCodeExecutable = Ternary.False;
                    } else {
                        isCodeExecutable = Ternary.True;
                    }
                    
                    incomingToken = scanner.scan();
                }            

                if (isCodeExecutable === Ternary.False) {
                    startInactiveRange();
                }
                
                if (tokenCount == 0) {
                    parseErrorAt(scanner.getTokenStart(), scanner.getTokenEnd(), scanner.getFileName(), Diagnostics.Expression_expected);
                }

                return incomingToken;
            case SyntaxKind.IfDefDirective:
            case SyntaxKind.IfNDefDirective:
                const isIfDef = incomingToken === SyntaxKind.IfDefDirective;
                
                // already in a conditional, so push that one to the stack
                if (isCodeExecutable !== Ternary.Unknown) conditionalStack.push(isCodeExecutable);

                incomingToken = scanner.scan();
                if (incomingToken !== SyntaxKind.Identifier) {
                    parseErrorAtCurrentToken(Diagnostics.Identifier_expected);                                        
                } else {
                    const tokenValue = scanner.getTokenValue();                    
                    isCodeExecutable = isIfDef ? (macroTable[tokenValue] ? Ternary.True : Ternary.False) : (!macroTable[tokenValue] ? Ternary.True : Ternary.False);
                    
                    incomingToken = scanner.scan();
                }

                if (isCodeExecutable === Ternary.False) {
                    startInactiveRange();
                }

                return incomingToken;
        }
    }

    function nextToken(): SyntaxKind {
        // if the keyword had an escape
        if (isKeyword(currentToken) && (scanner.hasUnicodeEscape() || scanner.hasExtendedUnicodeEscape())) {
            // issue a parse error for the escape
            parseErrorAt(scanner.getTokenStart(), scanner.getTokenEnd(), scanner.getFileName(), Diagnostics.Keywords_cannot_contain_escape_characters);
        }
        return nextTokenWithoutCheck();
    }

    /**
     * scans the token stream for macro arguments. this doesn't create any nodes, but stores
     * the ranges of the arguments in the macro object
     * @returns 
     */
    function parseMacroArguments() {
        const args: MacroParameter[] = [];        
        let parenCount = parseExpected(SyntaxKind.OpenParenToken, undefined, false) ? 1 : 0;
        let paramText = "";
        let pos: number = scanner.getTokenFullStart();

        if (parenCount === 0) {
            // missing open paren.  advance scanner (because open paren didnt) and return
            nextToken();
            return args;
        }

        while (parenCount > 0) {
            const kind = nextToken();
            switch (kind) {
                case SyntaxKind.EndOfFileToken:
                    if (parenCount > 0) {
                        parseErrorAtPosition(pos, scanner.getTokenEnd() - pos, scanner.getFileName(), Diagnostics.Unterminated_macro_arguments_list);
                    }
                    parenCount=0;
                    break;
                case SyntaxKind.OpenParenToken:
                    parenCount++;
                    paramText += scanner.getTokenText();
                    break;
                case SyntaxKind.CloseParenToken:
                    parenCount--;
                    if (parenCount > 0) {
                        paramText += scanner.getTokenText();
                    }
                    break;
                case SyntaxKind.CommaToken:
                    if (parenCount === 1) {
                        args.push({
                            text: paramText,
                            disabled: false,
                            posInOrigin: pos,
                            endInOrigin: scanner.getTokenFullStart(),
                            originFilename: scanner.getFileName(),
                            pos: 0,
                            end: paramText.length
                        });
                        paramText = "";
                        pos = scanner.getTokenEnd()
                        break;
                    }
                    // fall through            
                default:
                    paramText += scanner.getTokenText();
                    break;                    
            }           
        }
        
        if (paramText.length > 0) {
            args.push({
                text: paramText,
                disabled: false,
                posInOrigin: pos,
                endInOrigin: scanner.getTokenFullStart(),
                originFilename: scanner.getFileName(),
                pos: 0,
                end: paramText.length
            });
        }

        parseExpected(SyntaxKind.CloseParenToken);

        return args;
    }

    function startInactiveRange() {
        if (scanner.getFileName() === fileName) {
            inactiveRanges.push({ pos: scanner.getTokenFullStart(), end: 0 });
        }
    }

    function endInactiveRange(end?: number) {
        if (scanner.getFileName() === fileName) {
            Debug.assert(inactiveRanges.length > 0);
            const range = last(inactiveRanges);
            Debug.assert(range.end === 0);
            range.end = end || scanner.getTokenFullStart();
        }
    }
    
    function nextTokenWithoutCheck() {
        let incomingToken = scanner.scan();        

        while (isCodeExecutable === Ternary.False && incomingToken !== SyntaxKind.EndOfFileToken) {
            const tokenStart = scanner.getTokenFullStart();
            // we are in a disabled code block. there are only a few directives that apply here
            // check them and skip the rest
            switch (incomingToken) {
                case SyntaxKind.EndIfDirective:
                    scanner.setReportLineBreak(true);
                    isCodeExecutable = conditionalStack.pop() ?? Ternary.Unknown;                    
                    
                    incomingToken = scanner.scan();
                    if (incomingToken !== SyntaxKind.NewLineTrivia && incomingToken !== SyntaxKind.EndOfFileToken) {
                        parseErrorAtPosition(scanner.getTokenStart(), scanner.getTokenEnd() - scanner.getTokenStart(), scanner.getFileName(), Diagnostics.Expected_newline_after_directive);
                    }

                    scanner.setReportLineBreak(false);    
                    break;   
                case SyntaxKind.ElseIfDirective:
                case SyntaxKind.ElseDirective:
                    scanner.setReportLineBreak(true);
                                   
                    // this conditional is only evaluated if there is nothing on the stack
                    if (conditionalStack.length===0) {
                        isCodeExecutable = isCodeExecutable === Ternary.False ? Ternary.True : Ternary.False;
                    }

                    incomingToken = scanner.scan();
                    if (incomingToken !== SyntaxKind.NewLineTrivia && incomingToken !== SyntaxKind.EndOfFileToken) {
                        parseErrorAtPosition(scanner.getTokenStart(), scanner.getTokenEnd() - scanner.getTokenStart(), scanner.getFileName(), Diagnostics.Expected_newline_after_directive);
                    }

                    scanner.setReportLineBreak(false);    
                    break;                
                case SyntaxKind.IfDirective:
                case SyntaxKind.IfDefDirective:
                case SyntaxKind.IfNDefDirective:
                    scanner.setReportLineBreak(true);                    

                    while (incomingToken != SyntaxKind.NewLineTrivia && incomingToken != SyntaxKind.EndOfFileToken) {
                        incomingToken = scanner.scan();
                    }
                    
                    if (incomingToken !== SyntaxKind.NewLineTrivia) {
                        parseErrorAtPosition(scanner.getTokenStart(), scanner.getTokenEnd() - scanner.getTokenStart(), scanner.getFileName(), Diagnostics.Expected_newline_after_directive);
                    }

                    scanner.setReportLineBreak(false);                    

                    // these are disabled, so we don't need to change active code state
                    // just push to stack                    
                    conditionalStack.push(isCodeExecutable);
                    break;
            }            

            // if code is now executable, then end the last inactive range
            if (isCodeExecutable !== Ternary.False) {
                endInactiveRange(tokenStart);
            }

            // start the scan over
            return nextTokenWithoutCheck();            
        }

        switch (incomingToken) {
            case SyntaxKind.EndIfDirective:
                scanner.setReportLineBreak(true);
                isCodeExecutable = conditionalStack.pop() ?? Ternary.Unknown;                    

                incomingToken = scanner.scan();
                if (incomingToken !== SyntaxKind.NewLineTrivia && incomingToken !== SyntaxKind.EndOfFileToken) {
                    parseErrorAtPosition(scanner.getTokenStart(), scanner.getTokenEnd() - scanner.getTokenStart(), scanner.getFileName(), Diagnostics.Expected_newline_after_directive);
                }

                scanner.setReportLineBreak(false);  
                return nextTokenWithoutCheck();
            case SyntaxKind.IfDefDirective:
            case SyntaxKind.IfNDefDirective:            
            case SyntaxKind.IfDirective:
            case SyntaxKind.ElseIfDirective:
            case SyntaxKind.ElseDirective:
                scanner.setReportLineBreak(true);
                incomingToken = processConditionalDirective(incomingToken);
                
                if (incomingToken !== SyntaxKind.NewLineTrivia) {
                    parseErrorAtPosition(scanner.getTokenStart(), scanner.getTokenEnd() - scanner.getTokenStart(), scanner.getFileName(), Diagnostics.Expected_newline_after_directive);
                }

                scanner.setReportLineBreak(false);
                
                // start the scan over
                return nextTokenWithoutCheck();                
        }

        if (allowMacroProcessing && incomingToken === SyntaxKind.Identifier) {
            const tokenValue = scanner.getTokenValue();
            let macro = macroTable[tokenValue];            

            if (macro && macro.disabled !== true && macro.range) {                                
                // we are in a macro substitution                
                macro.disabled = true;                
                macro.originFilename = scanner.getFileName();
                macro.posInOrigin = scanner.getTokenFullStart();
                macro.endInOrigin = scanner.getTokenFullStart() + tokenValue.length + 1;
                macro.pos = getPositionState();
                macro.end = macro.pos.pos + tokenValue.length + 1;

                const { range, arguments: macroArgsDef } = macro;  

                // check if this macro has argumnets                
                const argValsByName: MapLike<MacroParameter> = {};
                if (macroArgsDef?.length > 0) {                                        
                    // scan the next token, which should be an open paren.. parseArg wil check it.
                    currentToken = nextTokenWithoutCheck();
                    
                    const values = parseMacroArguments();
                    const valuesEndPos = scanner.getTokenFullStart();                    

                    // now organize macro params by name
                    let lastArg = lastOrUndefined(values);                    
                    forEach(macroArgsDef, (arg, i) => {
                        const argName = (arg.name as Identifier).text;                        
                        if (values.length > i) {
                            const argVal = values[i];                            
                            argValsByName[argName] = argVal;            
                        } else {
                            parseErrorAt(lastArg?.end ?? valuesEndPos, valuesEndPos, scanner.getFileName(), Diagnostics.Missing_argument_for_macro_0, argName);
                            argValsByName[argName] = {
                                posInOrigin: lastArg?.end ?? valuesEndPos,
                                endInOrigin: lastArg?.end ?? valuesEndPos,
                                pos: 0,
                                end: 0,
                                text: "",
                                disabled: false,
                            }
                        }
                    });

                    macro.argsIn = argValsByName;
                }
                
                // create a scanner for this macro                                              
                const saveCurrentMacro = currentMacro;                                

                scanner.switchStream(
                    macro.includeFilename ?? macro.originFilename, macro.getText(), range.pos, range.end - range.pos,
                    () => {
                        // re-enable the macro
                        Debug.assertIsDefined(macro);
                        macro.disabled = false;
                        macro.argsIn = undefined;                    
                        macro.originFilename = undefined!;
                        macro.posInOrigin = undefined!;
                        macro.endInOrigin = undefined!;
                        macro.pos = undefined!;
                        currentMacro = saveCurrentMacro!;
                        // parse args will have consumed the next token, so we need to store that and return it
                        // when the previous scanner gets restored
                        return macroArgsDef?.length > 0;
                    }
                );

                currentMacro = macro;
                                              
                // scan again using the new scanner
                return nextTokenWithoutCheck();
            } else if (currentMacro && currentMacro.argsIn?.[tokenValue] && currentMacro.argsIn?.[tokenValue].disabled !== true) {
                // this is a macro parameter
                const arg = currentMacro.argsIn[tokenValue];                
                arg.disabled = true;                

                scanner.switchStream(
                    "", arg.text, arg.pos, arg.end, 
                    () => {
                        arg.disabled = false;
                        return false;
                    }
                );                               

                return nextTokenWithoutCheck();// currentToken = scanner.scan();
            }
        }

        return currentToken = incomingToken;
    }

    function nextTokenAnd<T>(func: () => T): T {
        nextToken();
        return func();
    }

    function nextTokenIsIdentifierOrKeyword() {
        nextToken();
        return tokenIsIdentifierOrKeyword(token());
    }

    function nextTokenIsIdentifierOrKeywordOnSameLine() {
        nextToken();
        return tokenIsIdentifierOrKeyword(token()) && !scanner.hasPrecedingLineBreak();
    }

    /**
     * Returns true if the next token is an identifier, and the token after that is an open paren
     * i.e.  "identifier("
     */
    function nextTokenIsIdentifierFollowedByParen() {
        nextToken();
        return tokenIsIdentifierOrKeyword(token()) && nextToken() === SyntaxKind.OpenParenToken;
    }

    function nextTokenIsOpenParen() {
        return nextToken() === SyntaxKind.OpenParenToken;
    }

    function nextTokenIsOpenBrace() {
        return nextToken() === SyntaxKind.OpenBraceToken;
    }

    function nextTokenIsSlash() {
        return nextToken() === SyntaxKind.SlashToken;
    }

    function nextTokenIsNumericOrBigIntLiteral() {
        nextToken();
        return token() === SyntaxKind.IntLiteral || token() === SyntaxKind.FloatLiteral;
    }


    function reScanGreaterToken(): SyntaxKind {
        return currentToken = scanner.reScanGreaterToken();
    }

    export function parseSourceFile(
        fileName: string,
        sourceText: string,        
        globalIncludes: string[],
        fileHandler: LpcFileHandler,
        languageVersion: ScriptTarget,
        syntaxCursor: IncrementalParser.SyntaxCursor | undefined,
        setParentNodes = false,
        scriptKind?: ScriptKind,
        setExternalModuleIndicator?: (file: SourceFile) => void,
        jsDocParsingMode = JSDocParsingMode.ParseAll,
        languageVariant: LanguageVariant = LanguageVariant.LDMud        
    ) {
        initState(fileName, sourceText, globalIncludes, languageVersion, syntaxCursor, scriptKind, fileHandler, jsDocParsingMode, languageVariant);
        // console.debug("Parsing source file: " + fileName);        
        try {
            const result = parseSourceFileWorker(languageVersion, setParentNodes, scriptKind || ScriptKind.LPC, jsDocParsingMode);
            clearState();            
            return result;
        } catch (e) {
            console.error(e);
            debugger;
            clearState();
            throw e;
        }     
    }

    function parseSourceFileWorker(languageVersion: ScriptTarget, setParentNodes: boolean, scriptKind: ScriptKind, jsDocParsingMode: JSDocParsingMode): SourceFile {                
              
        // if there is a global include, we want to grab the position state before that happens so that the statement list 
        // is tied to the original file
        const pos = getPositionState();

        // remove the first element from the include stack and process it 
        const includeDir = includeFileStack.shift()!;
        if (includeDir) {
            processIncludeDirective(includeDir);
        } else {        
            // prime the scanner
            nextToken();        
        }
        
        const statements = parseList(ParsingContext.SourceElements, parseStatement, pos);
        
        Debug.assert(token() === SyntaxKind.EndOfFileToken);
        Debug.assert(!currentMacro);        
        // Debug.assert(!currentIncludeDirective);

        const endHasJSDoc = hasPrecedingJSDocComment();
        const endOfFileToken = withJSDoc(parseTokenNode<EndOfFileToken>(), endHasJSDoc);
        
        const sourceFile = createSourceFile(fileName, statements, endOfFileToken);//, sourceFlags);
        
        // check for unterminate conditional directives before the diagnostics are stored in the sourcefile
        const lastInactiveRange = lastOrUndefined(inactiveRanges);
        if (lastInactiveRange && lastInactiveRange.end === 0) {
            parseErrorAtPosition(lastInactiveRange.pos, 1, fileName, Diagnostics.Unmatched_conditional_directive);
            lastInactiveRange.end = scanner.getTokenEnd();
        }

        // sourceFile.commentDirectives = scanner.getCommentDirectives();
        sourceFile.nodeCount = nodeCount;
        sourceFile.identifierCount = identifierCount;
        sourceFile.identifiers = identifiers;
        sourceFile.heritageClauses = factory.createNodeArray(inherits);
        sourceFile.parseDiagnostics = attachFileToDiagnostics(parseDiagnostics, sourceFile);
        sourceFile.jsDocParsingMode = jsDocParsingMode;
        sourceFile.inactiveCodeRanges = inactiveRanges;        

        if (jsDocDiagnostics) {
            sourceFile.jsDocDiagnostics = attachFileToDiagnostics(jsDocDiagnostics, sourceFile);
        }

        sourceFile.nodeCount = nodeCount;
        sourceFile.identifierCount = identifierCount;
        sourceFile.identifiers = identifiers;        
        sourceFile.imports = inherits?.map(i=>i.inheritClause).filter((i):i is StringLiteral=> isStringLiteral(i));
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

    function parseErrorAtPosition(start: number, errLength: number, fileName: string, message: DiagnosticMessage, ...args: DiagnosticArguments): DiagnosticWithDetachedLocation | undefined {
        // Don't report another error if it would just be at the same position as the last error.
        const lastError = lastOrUndefined(parseDiagnostics);
        let result: DiagnosticWithDetachedLocation | undefined;
        if (!lastError || start !== lastError.start) {            
            result = createDetachedDiagnostic(fileName, includeFileCache[fileName] ?? scanner.getText(), start, errLength, message, ...args);            
            parseDiagnostics.push(result);
        }

        // Mark that we've encountered an error.  We'll set an appropriate bit on the next
        // node we finish so that it can't be reused incrementally.
        parseErrorBeforeNextFinishedNode = true;
        return result;
    }
    
    function parseErrorAt(start: number, end: number, fileName: string, message: DiagnosticMessage, ...args: DiagnosticArguments): DiagnosticWithDetachedLocation | undefined {
        return parseErrorAtPosition(start, end - start, fileName, message, ...args);
    }

    function parseErrorAtRange(range: TextRange, fileName: string, message: DiagnosticMessage, ...args: DiagnosticArguments): void {
        parseErrorAt(range.pos, range.end, fileName, message, ...args);
    }

    function isPosition(pos: any): pos is Position {
        return (typeof pos==="object") && (typeof pos["pos"]==="number");
    }    

    function createMissingNode<T extends Node>(kind: T["kind"], reportAtCurrentPosition: false, diagnosticMessage?: DiagnosticMessage, ...args: DiagnosticArguments): T;
    function createMissingNode<T extends Node>(kind: T["kind"], reportAtCurrentPosition: boolean, diagnosticMessage: DiagnosticMessage, ...args: DiagnosticArguments): T;
    function createMissingNode<T extends Node>(kind: T["kind"], reportAtCurrentPosition: boolean, diagnosticMessage?: DiagnosticMessage, ...args: DiagnosticArguments): T {
        const pos = getPositionState();
        if (reportAtCurrentPosition) {
            parseErrorAtPosition(scanner.getTokenFullStart(), 0, pos.fileName, diagnosticMessage!, ...args);
        }
        else if (diagnosticMessage) {
            parseErrorAtCurrentToken(diagnosticMessage, ...args);
        }
        
        const result = kind === SyntaxKind.Identifier ? factoryCreateIdentifier("", /*originalKeywordKind*/ undefined) :            
            kind === SyntaxKind.IntLiteral ? factoryCreateIntLiteral("", /*numericLiteralFlags*/ undefined) :
            kind === SyntaxKind.FloatLiteral ? factoryCreateFloatLiteral("", /*numericLiteralFlags*/ undefined) :
            kind === SyntaxKind.StringLiteral ? factoryCreateStringLiteral("", /*isSingleQuote*/ undefined) :
            kind === SyntaxKind.MissingDeclaration ? factory.createMissingDeclaration() :
            factoryCreateToken(kind);
        return finishNode(result, pos) as T;
    }

    interface MissingList<T extends Node> extends NodeArray<T> {
        isMissingList: true;
    }

    function createMissingList<T extends Node>(): MissingList<T> {
        const list = createNodeArray<T>([], getPositionState()) as MissingList<T>;
        list.isMissingList = true;
        return list;
    }

    function isMissingList(arr: NodeArray<Node>): boolean {
        return !!(arr as MissingList<Node>).isMissingList;
    }
                    
    interface Position { pos: number; end: number; __positionBrand:any; };
    
    function getPositionState(): PositionState {        
        return {
            pos: getNodePos(),
            fileName: scanner.getFileName(),
            include: currentIncludeDirective,
            macro: currentMacro ? {...currentMacro} : undefined,
            stateId: scanner.getStateId()            
        }
    }

    function getNodePos(): number {
        return scanner.getTokenFullStart();
    }    
    
    function parseErrorAtCurrentToken(message: DiagnosticMessage, ...args: DiagnosticArguments): DiagnosticWithDetachedLocation | undefined {
        return parseErrorAt(scanner.getTokenStart(), scanner.getTokenEnd(), scanner.getFileName(), message, ...args);
    }

    function parseList<T extends Node>(kind: ParsingContext, parseElement: () => T, start?: PositionState): NodeArray<T> {
        const saveCurrentParsingContext = currentParsingContext;
        const saveParsingContext = parsingContext;
        parsingContext |= 1 << kind;
        currentParsingContext = kind;

        const list = [];        
        start ??= getPositionState();

        while (!isListTerminator(kind)) {
            if (isListElement(kind, /*inErrorRecovery*/ false)) {
                list.push(parseListElement(kind, parseElement));

                continue;
            }

            if (abortParsingListOrMoveToNextToken(kind)) {
                break;
            }
        }

        parsingContext = saveParsingContext;
        currentParsingContext = saveCurrentParsingContext;
        return createNodeArray(list, start);
    }

    // Returns true if we should abort parsing.
    function abortParsingListOrMoveToNextToken(kind: ParsingContext) {
        parsingContextErrors(kind);
        if (isInSomeParsingContext()) {
            return true;
        }

        nextToken();
        return false;
    }

    // True if positioned at element or terminator of the current list or any enclosing list
    function isInSomeParsingContext(): boolean {
        // We should be in at least one parsing context, be it SourceElements while parsing
        // a SourceFile, or JSDocComment when lazily parsing JSDoc.
        Debug.assert(parsingContext, "Missing parsing context");
        for (let kind = 0; kind < ParsingContext.Count; kind++) {
            if (parsingContext & (1 << kind)) {
                if (isListElement(kind, /*inErrorRecovery*/ true) || isListTerminator(kind)) {
                    return true;
                }
            }
        }

        return false;
    }

    function parsingContextErrors(context: ParsingContext) {
        switch (context) {
            case ParsingContext.SourceElements:
                return parseErrorAtCurrentToken(Diagnostics.Declaration_or_statement_expected);
            case ParsingContext.BlockStatements:
                return parseErrorAtCurrentToken(Diagnostics.Declaration_or_statement_expected);
            case ParsingContext.SwitchClauses:
                return parseErrorAtCurrentToken(Diagnostics.case_or_default_expected);
            case ParsingContext.SwitchClauseStatements:
                return parseErrorAtCurrentToken(Diagnostics.Statement_expected);
            case ParsingContext.RestProperties: // fallthrough
            case ParsingContext.TypeMembers:
                return parseErrorAtCurrentToken(Diagnostics.Property_or_signature_expected);
            case ParsingContext.ClassMembers:
                return parseErrorAtCurrentToken(Diagnostics.Unexpected_token_A_constructor_method_accessor_or_property_was_expected);
        //     case ParsingContext.EnumMembers:
        //         return parseErrorAtCurrentToken(Diagnostics.Enum_member_expected);
            case ParsingContext.HeritageClauseElement:
                return parseErrorAtCurrentToken(Diagnostics.Expression_expected);
            case ParsingContext.VariableDeclarations:
                return isKeyword(token())
                    ? parseErrorAtCurrentToken(Diagnostics._0_is_not_allowed_as_a_variable_declaration_name, tokenToString(token())!)
                    : parseErrorAtCurrentToken(Diagnostics.Variable_declaration_expected);
            case ParsingContext.ObjectBindingElements:
                return parseErrorAtCurrentToken(Diagnostics.Property_destructuring_pattern_expected);
            case ParsingContext.ArrayBindingElements:
                return parseErrorAtCurrentToken(Diagnostics.Array_element_destructuring_pattern_expected);
            case ParsingContext.ArgumentExpressions:
                return parseErrorAtCurrentToken(Diagnostics.Argument_expression_expected);
            case ParsingContext.ObjectLiteralMembers:
                return parseErrorAtCurrentToken(Diagnostics.Property_assignment_expected);
            case ParsingContext.JsonArrayLiteralMembers:
            case ParsingContext.ArrayLiteralMembers:
                return parseErrorAtCurrentToken(Diagnostics.Expression_or_comma_expected);
            case ParsingContext.MappingLiteralMembers:
            case ParsingContext.MappingEntryMembers:
                return parseErrorAtCurrentToken(Diagnostics.Expression_or_comma_expected);
            case ParsingContext.JSDocParameters:
                return parseErrorAtCurrentToken(Diagnostics.Parameter_declaration_expected);
            case ParsingContext.Parameters:
                return isKeyword(token())
                    ? parseErrorAtCurrentToken(Diagnostics._0_is_not_allowed_as_a_parameter_name, tokenToString(token())!)
                    : parseErrorAtCurrentToken(Diagnostics.Parameter_declaration_expected);
            case ParsingContext.TypeParameters:
                return parseErrorAtCurrentToken(Diagnostics.Type_parameter_declaration_expected);
            case ParsingContext.TypeArguments:
                return parseErrorAtCurrentToken(Diagnostics.Type_argument_expected);
            case ParsingContext.TupleElementTypes:
                return parseErrorAtCurrentToken(Diagnostics.Type_expected);
            case ParsingContext.HeritageClauses:
                return parseErrorAtCurrentToken(Diagnostics.Unexpected_token_expected);
        //     case ParsingContext.ImportOrExportSpecifiers:
        //         if (token() === SyntaxKind.FromKeyword) {
        //             return parseErrorAtCurrentToken(Diagnostics._0_expected, "}");
        //         }
        //         return parseErrorAtCurrentToken(Diagnostics.Identifier_expected);
        
            case ParsingContext.JSDocComment:
                return parseErrorAtCurrentToken(Diagnostics.Identifier_expected);
            case ParsingContext.Count:
                return Debug.fail("ParsingContext.Count used as a context"); // Not a real context, only a marker.
            default:
                Debug.fail("Unknown ParsingContext");
                console.debug("todo - parsingContextErrors");
        //         Debug.assertNever(context);
        }
    }

    // True if positioned at the start of a list element
    function isListElement(parsingContext: ParsingContext, inErrorRecovery: boolean): boolean {
        const node = currentNode(parsingContext);
        if (node) {
            return true;
        }

        switch (parsingContext) {
            case ParsingContext.SourceElements:
            case ParsingContext.BlockStatements:
            case ParsingContext.SwitchPreBlock:
            case ParsingContext.SwitchClauseStatements:
                // If we're in error recovery, then we don't want to treat ';' as an empty statement.
                // The problem is that ';' can show up in far too many contexts, and if we see one
                // and assume it's a statement, then we may bail out inappropriately from whatever
                // we're parsing.  For example, if we have a semicolon in the middle of a class, then
                // we really don't want to assume the class is over and we're on a statement in the
                // outer module.  We just want to consume and move on.
                return !(token() === SyntaxKind.SemicolonToken && inErrorRecovery) && isStartOfStatement();
            case ParsingContext.SwitchClauses:
                return token() === SyntaxKind.CaseKeyword || token() === SyntaxKind.DefaultKeyword;
            case ParsingContext.TypeMembers:
                return lookAhead(isTypeMemberStart);
            // case ParsingContext.ClassMembers:
            //     // We allow semicolons as class elements (as specified by ES6) as long as we're
            //     // not in error recovery.  If we're in error recovery, we don't want an errant
            //     // semicolon to be treated as a class member (since they're almost always used
            //     // for statements.
            //     return lookAhead(isClassMemberStart) || (token() === SyntaxKind.SemicolonToken && !inErrorRecovery);
            // case ParsingContext.EnumMembers:
            //     // Include open bracket computed properties. This technically also lets in indexers,
            //     // which would be a candidate for improved error reporting.
            //     return token() === SyntaxKind.OpenBracketToken || isLiteralPropertyName();
            case ParsingContext.ObjectLiteralMembers:
                switch (token()) {
                    case SyntaxKind.OpenBracketToken:
                    case SyntaxKind.AsteriskToken:
                    case SyntaxKind.DotDotDotToken:
                    case SyntaxKind.DotToken: // Not an object literal member, but don't want to close the object (see `tests/cases/fourslash/completionsDotInObjectLiteral.ts`)
                        return true;
                    default:
                        return isLiteralPropertyName();
                }
            case ParsingContext.RestProperties:
                return isLiteralPropertyName();
            // case ParsingContext.ObjectBindingElements:
            //     return token() === SyntaxKind.OpenBracketToken || token() === SyntaxKind.DotDotDotToken || isLiteralPropertyName();
            // case ParsingContext.ImportAttributes:
            //     return isImportAttributeName();
            // case ParsingContext.HeritageClauseElement:
            //     // If we see `{ ... }` then only consume it as an expression if it is followed by `,` or `{`
            //     // That way we won't consume the body of a class in its heritage clause.
            //     if (token() === SyntaxKind.OpenBraceToken) {
            //         return lookAhead(isValidHeritageClauseObjectLiteral);
            //     }

            //     if (!inErrorRecovery) {
            //         return isStartOfLeftHandSideExpression() && !isHeritageClauseExtendsOrImplementsKeyword();
            //     }
            //     else {
            //         // If we're in error recovery we tighten up what we're willing to match.
            //         // That way we don't treat something like "this" as a valid heritage clause
            //         // element during recovery.
            //         return isIdentifier() && !isHeritageClauseExtendsOrImplementsKeyword();
            //     }
            case ParsingContext.VariableDeclarations:
                return isBindingIdentifier() || token() === SyntaxKind.AsteriskToken;
            case ParsingContext.ForEachInitialers:
                return isBindingIdentifier() || isTypeMemberStart();
            case ParsingContext.PramgaArguments:
                return isBindingIdentifier();
            case ParsingContext.ArrayBindingElements:
                return token() === SyntaxKind.CommaToken || token() === SyntaxKind.DotDotDotToken || isBindingIdentifier();
            // case ParsingContext.TypeParameters:
            //     return token() === SyntaxKind.InKeyword || token() === SyntaxKind.ConstKeyword || isIdentifier();
            case ParsingContext.MappingLiteralMembers:
            case ParsingContext.JsonArrayLiteralMembers:
            case ParsingContext.ArrayLiteralMembers:
                switch (token()) {
                    case SyntaxKind.CommaToken:
                    case SyntaxKind.DotToken: // Not an array literal member, but don't want to close the array (see `tests/cases/fourslash/completionsDotInArrayLiteralInObjectLiteral.ts`)
                        return true;
                }
                // falls through                        
            case ParsingContext.ArgumentExpressions:
                return token() === SyntaxKind.DotDotDotToken || isStartOfExpression();
            case ParsingContext.MappingEntryMembers:
                return token() === SyntaxKind.SemicolonToken || isStartOfExpression();
            case ParsingContext.Parameters:
                return isStartOfParameter(/*isJSDocParameter*/ false);
            case ParsingContext.JSDocParameters:
                return isStartOfParameter(/*isJSDocParameter*/ true);
            // case ParsingContext.TypeArguments:
            // case ParsingContext.TupleElementTypes:
            //     return token() === SyntaxKind.CommaToken || isStartOfType();
            // case ParsingContext.HeritageClauses:
            //     return isHeritageClause();
            // case ParsingContext.ImportOrExportSpecifiers:
            //     // bail out if the next token is [FromKeyword StringLiteral].
            //     // That means we're in something like `import { from "mod"`. Stop here can give better error message.
            //     if (token() === SyntaxKind.FromKeyword && lookAhead(nextTokenIsStringLiteral)) {
            //         return false;
            //     }
            //     return tokenIsIdentifierOrKeyword(token());
            // case ParsingContext.JsxAttributes:
            //     return tokenIsIdentifierOrKeyword(token()) || token() === SyntaxKind.OpenBraceToken;
            // case ParsingContext.JsxChildren:
            //     return true;
            // case ParsingContext.JSDocComment:
            //     return true;
            case ParsingContext.Count:
                return Debug.fail("ParsingContext.Count used as a context"); // Not a real context, only a marker.
            // default:
            //     Debug.assertNever(parsingContext, "Non-exhaustive case in 'isListElement'.");
        }
    }

    function isStartOfParameter(isJSDocParameter: boolean): boolean {
        return token() === SyntaxKind.DotDotDotToken ||
            isBindingIdentifier() ||
            isModifierKind(token()) ||
            token() === SyntaxKind.AtToken ||
            token() === SyntaxKind.AmpersandToken ||
            isStartOfType(/*inStartOfParameter*/ !isJSDocParameter);
    }

    function isStartOfStatement(): boolean {
        switch (token()) {
            case SyntaxKind.OpenParenAsteriskToken:
            case SyntaxKind.AtToken:
            case SyntaxKind.SemicolonToken:
            case SyntaxKind.OpenBraceToken:
            case SyntaxKind.InheritKeyword:
            case SyntaxKind.StructKeyword:
            case SyntaxKind.ClosureKeyword:
            // case SyntaxKind.VarKeyword:
            // case SyntaxKind.LetKeyword:
            // case SyntaxKind.UsingKeyword:            
            case SyntaxKind.ClassKeyword:            
            case SyntaxKind.IfKeyword:
            case SyntaxKind.DoKeyword:
            case SyntaxKind.WhileKeyword:
            case SyntaxKind.ForKeyword:
            case SyntaxKind.ForEachKeyword:
            case SyntaxKind.ContinueKeyword:
            case SyntaxKind.BreakKeyword:
            case SyntaxKind.ReturnKeyword:
            case SyntaxKind.SwitchKeyword:
            // case SyntaxKind.ThrowKeyword:
            // case SyntaxKind.TryKeyword:
            // case SyntaxKind.DebuggerKeyword:
            // 'catch' and 'finally' do not actually indicate that the code is part of a statement,
            // however, we say they are here so that we may gracefully parse them and error later.
            // falls through
            // case SyntaxKind.CatchKeyword:
            // case SyntaxKind.FinallyKeyword:
                return true;

            // case SyntaxKind.ImportKeyword:
            //     return isStartOfDeclaration() || lookAhead(nextTokenIsOpenParenOrLessThanOrDot);

            // case SyntaxKind.ConstKeyword:
            // case SyntaxKind.ExportKeyword:
            //     return isStartOfDeclaration();

            case SyntaxKind.AsyncKeyword:
            // case SyntaxKind.DeclareKeyword:
            // case SyntaxKind.InterfaceKeyword:
            // case SyntaxKind.ModuleKeyword:
            // case SyntaxKind.NamespaceKeyword:
            // case SyntaxKind.TypeKeyword:
            // case SyntaxKind.GlobalKeyword:
                // When these don't start a declaration, they're an identifier in an expression statement
                return true;

            // case SyntaxKind.AccessorKeyword:
            case SyntaxKind.PublicKeyword:
            case SyntaxKind.PrivateKeyword:
            case SyntaxKind.ProtectedKeyword:
            case SyntaxKind.StaticKeyword:
            case SyntaxKind.NoMaskKeyword:
            case SyntaxKind.NoSaveKeyword:
            case SyntaxKind.NoShadowKeyword:   
            case SyntaxKind.VarArgsKeyword:
            case SyntaxKind.FunctionKeyword:
            case SyntaxKind.IntKeyword:
            case SyntaxKind.FloatKeyword:
            case SyntaxKind.StringKeyword:
            case SyntaxKind.MixedKeyword:
            case SyntaxKind.VoidKeyword:
            case SyntaxKind.ObjectKeyword:
            case SyntaxKind.MappingKeyword:                
            case SyntaxKind.BytesKeyword:  
            case SyntaxKind.StatusKeyword:
            case SyntaxKind.LwObjectKeyword:   
            case SyntaxKind.SymbolKeyword:
            case SyntaxKind.BufferKeyword:            
            case SyntaxKind.ClosureKeyword:
                // When these don't start a declaration, they may be the start of a class member if an identifier
                // immediately follows. Otherwise they're an identifier in an expression statement.
                return isStartOfDeclaration() || !lookAhead(nextTokenIsIdentifierOrKeywordOnSameLine);
            default:
                return isDirective() || isStartOfExpression();
        }
    }

    function isDirective(): boolean {
        switch (token()) {
            case SyntaxKind.IncludeDirective:
            case SyntaxKind.DefineDirective:
            case SyntaxKind.UndefDirective:
            case SyntaxKind.IfDirective:
            case SyntaxKind.ElseDirective:
            case SyntaxKind.ElseIfDirective:
            case SyntaxKind.EndIfDirective:
            case SyntaxKind.PragmaDirective:
                return true;
        }
    }

    function isDeclaration(): boolean {
        while (true) {
            switch (token()) {                
                case SyntaxKind.FunctionKeyword:
                case SyntaxKind.ClassKeyword:
                case SyntaxKind.StructKeyword:
                case SyntaxKind.ClosureKeyword:                
                    return true;
                // case SyntaxKind.UsingKeyword:
                //     return isUsingDeclaration();
                // case SyntaxKind.AwaitKeyword:
                //     return isAwaitUsingDeclaration();                                
                case SyntaxKind.AsyncKeyword:                
                case SyntaxKind.PrivateKeyword:
                case SyntaxKind.ProtectedKeyword:
                case SyntaxKind.PublicKeyword:
                case SyntaxKind.StaticKeyword:
                case SyntaxKind.NoMaskKeyword:
                case SyntaxKind.NoSaveKeyword:
                case SyntaxKind.VarArgsKeyword:
                case SyntaxKind.NoShadowKeyword:
                case SyntaxKind.BytesKeyword:                
                case SyntaxKind.LwObjectKeyword:
                case SyntaxKind.ClosureKeyword:                
                case SyntaxKind.BufferKeyword:
                case SyntaxKind.IntKeyword:
                case SyntaxKind.FloatKeyword:
                case SyntaxKind.StringKeyword:
                case SyntaxKind.MixedKeyword:
                case SyntaxKind.VoidKeyword:                
                case SyntaxKind.MappingKeyword:     
                case SyntaxKind.LessThanToken: // start of array union type                               
                    return true;        
                    // const previousToken = token();
                    // nextToken();
                    // // ASI takes effect for this modifier.
                    // if (scanner.hasPrecedingLineBreak()) {
                    //     return false;
                    // }
                    // // if (previousToken === SyntaxKind.DeclareKeyword && token() === SyntaxKind.TypeKeyword) {
                    // //     // If we see 'declare type', then commit to parsing a type alias. parseTypeAliasDeclaration will
                    // //     // report Line_break_not_permitted_here if needed.
                    // //     return true;
                    // // }
                    // continue;        
                case SyntaxKind.ObjectKeyword:
                    return lookAhead(()=>nextToken() !== SyntaxKind.ColonColonToken);        
                case SyntaxKind.StatusKeyword:
                case SyntaxKind.SymbolKeyword:
                    return languageVariant === LanguageVariant.LDMud;
                case SyntaxKind.Identifier:
                    // probably a function without modifier or type
                    // but that can only happen if we're parsing in the source context
                    return (parsingContext === 1 << ParsingContext.SourceElements) && lookAhead(()=>nextToken() === SyntaxKind.OpenParenToken);
                default:
                    return false;
            }
        }
    }

    function isStartOfDeclaration(): boolean {
        // TODO: this lookahead is very expensive... find a better solution
        return lookAhead(isDeclaration);
    }

    // True if positioned at a list terminator
    function isListTerminator(kind: ParsingContext): boolean {
        
        if (token() === SyntaxKind.EndOfFileToken) {                       
            // Being at the end of the file ends all lists.
            return true;            
        }

        switch (kind) {
            case ParsingContext.BlockStatements:
            case ParsingContext.SwitchClauses:
            case ParsingContext.TypeMembers:
            case ParsingContext.ClassMembers:
            case ParsingContext.EnumMembers:            
            case ParsingContext.ObjectBindingElements:
            case ParsingContext.ImportOrExportSpecifiers:
            case ParsingContext.ImportAttributes:
                return token() === SyntaxKind.CloseBraceToken || token() === SyntaxKind.ColonCloseParenToken || token() === SyntaxKind.NewLineTrivia;
            case ParsingContext.ObjectLiteralMembers:
                return token() === SyntaxKind.CloseBraceToken;
            case ParsingContext.PramgaArguments:
                return token() === SyntaxKind.NewLineTrivia;
            case ParsingContext.SwitchPreBlock:                
            case ParsingContext.SwitchClauseStatements:
                return token() === SyntaxKind.CloseBraceToken || token() === SyntaxKind.CaseKeyword || token() === SyntaxKind.DefaultKeyword;
            // case ParsingContext.HeritageClauseElement:
            //     return token() === SyntaxKind.OpenBraceToken || token() === SyntaxKind.ExtendsKeyword || token() === SyntaxKind.ImplementsKeyword;
            case ParsingContext.ForEachInitialers:
            case ParsingContext.VariableDeclarations:                
                return isVariableDeclaratorListTerminator();
            // case ParsingContext.TypeParameters:
            //     // Tokens other than '>' are here for better error recovery
            //     return token() === SyntaxKind.GreaterThanToken || token() === SyntaxKind.OpenParenToken || token() === SyntaxKind.OpenBraceToken || token() === SyntaxKind.ExtendsKeyword || token() === SyntaxKind.ImplementsKeyword;            
            case ParsingContext.ArgumentExpressions:
                // Tokens other than ')' are here for better error recovery
                return token() === SyntaxKind.CloseParenToken || token() === SyntaxKind.SemicolonToken;                
            case ParsingContext.JsonArrayLiteralMembers:
                return token() === SyntaxKind.CloseBracketToken;
            case ParsingContext.ArrayLiteralMembers:
                return token() === SyntaxKind.CloseBraceToken;
            case ParsingContext.TupleElementTypes:
            case ParsingContext.ArrayBindingElements:
                return token() === SyntaxKind.CloseBracketToken;
            case ParsingContext.MappingLiteralMembers:
                return token() === SyntaxKind.CloseBracketToken;
            case ParsingContext.MappingEntryMembers:
                return token() === SyntaxKind.CloseBracketToken || token() === SyntaxKind.CommaToken;
            case ParsingContext.JSDocParameters:
            case ParsingContext.Parameters:
            case ParsingContext.RestProperties:
                // Tokens other than ')' and ']' (the latter for index signatures) are here for better error recovery
                return token() === SyntaxKind.CloseParenToken || token() === SyntaxKind.CloseBracketToken /*|| token === SyntaxKind.OpenBraceToken*/;
            case ParsingContext.TypeArguments:
                // All other tokens should cause the type-argument to terminate except comma token
                return token() !== SyntaxKind.CommaToken;
            case ParsingContext.HeritageClauses:
                return token() === SyntaxKind.OpenBraceToken || token() === SyntaxKind.CloseBraceToken;            
            default:
                return false;
        }
    }

    function isVariableDeclaratorListTerminator(): boolean {
        // If we can consume a semicolon (either explicitly, or with ASI), then consider us done
        // with parsing the list of variable declarators.
        if (canParseSemicolon()) {
            return true;
        }

        // in the case where we're parsing the variable declarator of a 'for-in' statement, we
        // are done if we see an 'in' keyword in front of us. Same with for-of
        if (isInOrOfKeyword(token())) {
            return true;
        }

        // ERROR RECOVERY TWEAK:
        // For better error recovery, if we see an '=>' then we just stop immediately.  We've got an
        // arrow function here and it's going to be very unlikely that we'll resynchronize and get
        // another variable declaration.
        if (token() === SyntaxKind.EqualsGreaterThanToken) {
            return true;
        }

        // Keep trying to parse out variable declarators.
        return false;
    }


    function parseListElement<T extends Node | undefined>(parsingContext: ParsingContext, parseElement: () => T): T {
        const node = currentNode(parsingContext);
        if (node) {
            return consumeNode(node) as T;
        }

        return parseElement();
    }

    function isReusableParsingContext(parsingContext: ParsingContext): boolean {
        switch (parsingContext) {
            case ParsingContext.ClassMembers:
            case ParsingContext.SwitchClauses:
            case ParsingContext.SourceElements:
            case ParsingContext.BlockStatements:
            case ParsingContext.SwitchClauseStatements:
            case ParsingContext.EnumMembers:
            case ParsingContext.TypeMembers:
            case ParsingContext.VariableDeclarations:
            case ParsingContext.JSDocParameters:
            case ParsingContext.Parameters:
                return true;
        }
        return false;
    }

    function currentNode(parsingContext: ParsingContext, pos?: number): Node | undefined {
        // If we don't have a cursor or the parsing context isn't reusable, there's nothing to reuse.
        //
        // If there is an outstanding parse error that we've encountered, but not attached to
        // some node, then we cannot get a node from the old source tree.  This is because we
        // want to mark the next node we encounter as being unusable.
        //
        // Note: This may be too conservative.  Perhaps we could reuse the node and set the bit
        // on it (or its leftmost child) as having the error.  For now though, being conservative
        // is nice and likely won't ever affect perf.
        if (!syntaxCursor || !isReusableParsingContext(parsingContext) || parseErrorBeforeNextFinishedNode) {
            return undefined;
        }

        const node = syntaxCursor.currentNode(pos ?? scanner.getTokenFullStart());

        // Can't reuse a missing node.
        // Can't reuse a node that intersected the change range.
        // Can't reuse a node that contains a parse error.  This is necessary so that we
        // produce the same set of errors again.
        if (nodeIsMissing(node) || intersectsIncrementalChange(node) || containsParseError(node)) {
            return undefined;
        }

        // We can only reuse a node if it was parsed under the same strict mode that we're
        // currently in.  i.e. if we originally parsed a node in non-strict mode, but then
        // the user added 'using strict' at the top of the file, then we can't use that node
        // again as the presence of strict mode may cause us to parse the tokens in the file
        // differently.
        //
        // Note: we *can* reuse tokens when the strict mode changes.  That's because tokens
        // are unaffected by strict mode.  It's just the parser will decide what to do with it
        // differently depending on what mode it is in.
        //
        // This also applies to all our other context flags as well.
        const nodeContextFlags = node.flags & NodeFlags.ContextFlags;
        if (nodeContextFlags !== contextFlags) {
            return undefined;
        }

        // Ok, we have a node that looks like it could be reused.  Now verify that it is valid
        // in the current list parsing context that we're currently at.
        if (!canReuseNode(node, parsingContext)) {
            return undefined;
        }

        if (canHaveJSDoc(node) && node.jsDoc?.jsDocCache) {
            // jsDocCache may include tags from parent nodes, which might have been modified.
            node.jsDoc.jsDocCache = undefined;
        }

        return node;
    }

    function canReuseNode(node: Node, parsingContext: ParsingContext): boolean {
        switch (parsingContext) {
            // case ParsingContext.ClassMembers:
            //     return isReusableClassMember(node);

            // case ParsingContext.SwitchClauses:
            //     return isReusableSwitchClause(node);

            // case ParsingContext.SourceElements:
            // case ParsingContext.BlockStatements:
            // case ParsingContext.SwitchClauseStatements:
            //     return isReusableStatement(node);

            // case ParsingContext.EnumMembers:
            //     return isReusableEnumMember(node);

            // case ParsingContext.TypeMembers:
            //     return isReusableTypeMember(node);

            // case ParsingContext.VariableDeclarations:
            //     return isReusableVariableDeclaration(node);

            // case ParsingContext.JSDocParameters:
            // case ParsingContext.Parameters:
            //     return isReusableParameter(node);

                // Any other lists we do not care about reusing nodes in.  But feel free to add if
                // you can do so safely.  Danger areas involve nodes that may involve speculative
                // parsing.  If speculative parsing is involved with the node, then the range the
                // parser reached while looking ahead might be in the edited range (see the example
                // in canReuseVariableDeclaratorNode for a good case of this).

                // case ParsingContext.HeritageClauses:
                // This would probably be safe to reuse.  There is no speculative parsing with
                // heritage clauses.

                // case ParsingContext.TypeParameters:
                // This would probably be safe to reuse.  There is no speculative parsing with
                // type parameters.  Note that that's because type *parameters* only occur in
                // unambiguous *type* contexts.  While type *arguments* occur in very ambiguous
                // *expression* contexts.

                // case ParsingContext.TupleElementTypes:
                // This would probably be safe to reuse.  There is no speculative parsing with
                // tuple types.

                // Technically, type argument list types are probably safe to reuse.  While
                // speculative parsing is involved with them (since type argument lists are only
                // produced from speculative parsing a < as a type argument list), we only have
                // the types because speculative parsing succeeded.  Thus, the lookahead never
                // went past the end of the list and rewound.
                // case ParsingContext.TypeArguments:

                // Note: these are almost certainly not safe to ever reuse.  Expressions commonly
                // need a large amount of lookahead, and we should not reuse them as they may
                // have actually intersected the edit.
                // case ParsingContext.ArgumentExpressions:

                // This is not safe to reuse for the same reason as the 'AssignmentExpression'
                // cases.  i.e. a property assignment may end with an expression, and thus might
                // have lookahead far beyond it's old node.
                // case ParsingContext.ObjectLiteralMembers:

                // This is probably not safe to reuse.  There can be speculative parsing with
                // type names in a heritage clause.  There can be generic names in the type
                // name list, and there can be left hand side expressions (which can have type
                // arguments.)
                // case ParsingContext.HeritageClauseElement:

                // Perhaps safe to reuse, but it's unlikely we'd see more than a dozen attributes
                // on any given element. Same for children.
                // case ParsingContext.JsxAttributes:
                // case ParsingContext.JsxChildren:
        }

        return false;
    }

    function consumeNode(node: Node) {
        // Move the scanner so it is after the node we just consumed.
        scanner.resetTokenState(node.end);
        nextToken();
        return node;
    }
    
    function createNodeArray<T extends Node>(elements: T[], pos: number, end: number, hasTrailingComma?: boolean): NodeArray<T> 
    function createNodeArray<T extends Node>(elements: T[], pos: PositionState, end?: number, hasTrailingComma?: boolean): NodeArray<T> 
    function createNodeArray<T extends Node>(elements: T[], pos: PositionState | number, end?: number, hasTrailingComma?: boolean): NodeArray<T> {
        const array = factoryCreateNodeArray(elements, hasTrailingComma);
        let arrayPos: number;
        if (typeof pos == "number") {
            arrayPos = pos;
            end ??= scanner.getTokenFullStart();
        } else {
            arrayPos = pos.pos;
            end ??= scanner.getState(pos.stateId)?.end;                            
        }
        setTextRangePosEnd(array, arrayPos, end);
        return array;
    }

    function parseStatement(): Statement {
        switch (token()) {            
            case SyntaxKind.InheritKeyword:                
                return parseInheritStatement();
            case SyntaxKind.SemicolonToken:
                return parseEmptyStatement();
            case SyntaxKind.OpenBraceToken:
                return parseBlock(/*ignoreMissingOpenBrace*/ false);                        
            case SyntaxKind.IfKeyword:
                return parseIfStatement();
            case SyntaxKind.DoKeyword:
                return parseDoStatement();
            case SyntaxKind.WhileKeyword:
                return parseWhileStatement();
            case SyntaxKind.ForKeyword:
                return parseForStatement();
            case SyntaxKind.ForEachKeyword:
                return parseForEachStatement();
            case SyntaxKind.ContinueKeyword:
                return parseBreakOrContinueStatement(SyntaxKind.ContinueStatement);
            case SyntaxKind.BreakKeyword:
                return parseBreakOrContinueStatement(SyntaxKind.BreakStatement);
            case SyntaxKind.ReturnKeyword:
                return parseReturnStatement();            
            case SyntaxKind.SwitchKeyword:
                return parseSwitchStatement();            
            case SyntaxKind.CatchKeyword:
                return parseCatchStatement();                   
            // case SyntaxKind.AsyncKeyword:                        
            case SyntaxKind.ClassKeyword:
            case SyntaxKind.StructKeyword:           
                if (isStartOfDeclaration()) {
                    return parseDeclaration();
                }
            case SyntaxKind.PrivateKeyword:
            case SyntaxKind.ProtectedKeyword:
            case SyntaxKind.PublicKeyword:            
            case SyntaxKind.StaticKeyword:    
            case SyntaxKind.NoMaskKeyword:
            case SyntaxKind.NoSaveKeyword:
            case SyntaxKind.NoShadowKeyword:                         
            case SyntaxKind.VarArgsKeyword:
            // primitive types               
            case SyntaxKind.FunctionKeyword: 
            case SyntaxKind.BytesKeyword:
            case SyntaxKind.StatusKeyword:
            case SyntaxKind.LwObjectKeyword:
            case SyntaxKind.ClosureKeyword:
            case SyntaxKind.SymbolKeyword:
            case SyntaxKind.BufferKeyword:
            case SyntaxKind.VoidKeyword:
            case SyntaxKind.IntKeyword:
            case SyntaxKind.FloatKeyword:
            case SyntaxKind.StringKeyword:
            case SyntaxKind.MixedKeyword:
            case SyntaxKind.MappingKeyword:
            case SyntaxKind.ObjectKeyword:
            case SyntaxKind.ClosureKeyword:
            case SyntaxKind.Identifier:
            case SyntaxKind.LessThanToken: // start of union type                
                if (isStartOfDeclaration()) {
                    return parseDeclaration();
                }            
        }

        if (isDirective()) {
            return parseDirective();
        }

        return parseExpressionOrLabeledStatement();
    }

    function hasPrecedingJSDocComment() {
        return scanner.hasPrecedingJSDocComment();
    }

    function parseEmptyStatement(): Statement {
        const pos = getPositionState();
        const hasJSDoc = hasPrecedingJSDocComment();
        parseExpected(SyntaxKind.SemicolonToken);
        return withJSDoc(finishNode(factory.createEmptyStatement(), pos), hasJSDoc);
    }

    function parseDirective(): PreprocessorDirective {
        scanner.setReportLineBreak(true);

        let directive: PreprocessorDirective | undefined;
        switch (token()) {
            case SyntaxKind.IncludeDirective:
                directive = parseIncludeDirective();
                break;
            case SyntaxKind.DefineDirective:
                directive = disallowMacroProcessing(parseDefineDirective);
                break;
            case SyntaxKind.UndefDirective:
                directive = disallowMacroProcessing(parseUndefDirective);
                break;
            case SyntaxKind.PragmaDirective:
                directive = parsePragmaDirective();
                break;
            case SyntaxKind.EndIfDirective:                
                directive = createMissingNode(SyntaxKind.EndIfDirective, /*reportAtCurrentPosition*/ true, Diagnostics.Unexpected_endIf_directive);
                // falls through
            default:                
                nextToken();
                const directiveContent = [];
                while (token() !== SyntaxKind.NewLineTrivia) {
                    directiveContent.push(token());
                    nextToken();            
                }
        }

        let scanNextToken = parseExpected(SyntaxKind.NewLineTrivia, Diagnostics.Expected_newline_after_directive, false);
        scanner.setReportLineBreak(false);
        
        if (directive?.kind === SyntaxKind.IncludeDirective) {
            // if include file is resolved, (i.e. process return false)
            // then turn off the scan next token
            scanNextToken &&= !processIncludeDirective(directive as IncludeDirective);
        }

        if (!directive) {
            directive = createMissingNode(SyntaxKind.IncludeDirective, /*reportAtCurrentPosition*/ true, Diagnostics.Unexpected_keyword_or_identifier);
        }
        
        if (scanNextToken) {
            nextToken(); // advance past newline
        }

        return directive;
    }

    function processIncludeDirective(includeDirective: IncludeDirective): boolean {                
        const localFilename = includeDirective.content.map((literal) => literal.text).join("");            
        const includeFile = fileHandler.loadIncludeFile(scanner.getFileName(), localFilename, includeDirective.localFirst);
        const resolvedFilename = internIdentifier(includeFile.filename);        

        // TODO - handle circular includes        
        if (resolvedFilename === fileName) { 
            // skip
            return; 
        }

        (includeDirective as Mutable<IncludeDirective>).resolvedFilename = resolvedFilename;

        if (includeFile?.source?.length > 0) {
            // cache source text
            // as a hack, add an extra newline to any include file - this way we don't have to deal 
            // with includes that end with an eof
            const includeSourceText = includeFileCache[resolvedFilename] = includeFile.source + "\n";

            // create scanner for include            
            const saveDirective = currentIncludeDirective;

            scanner.switchStream(
                resolvedFilename, includeSourceText, 0, includeSourceText.length, 
                ()=>{
                    currentIncludeDirective = saveDirective!;

                    // if there are more include files in the stack, process the next one 
                    const nextIncludeDirective = includeFileStack.shift();
                    if (nextIncludeDirective) {
                        processIncludeDirective(nextIncludeDirective);
                    }

                    currentToken = scanner.getToken();
                    return false;
                }
            );            
            
            currentIncludeDirective ??= includeDirective;                        
            
            // prime the scanner
            nextToken(); 

            return true;
        }

        return false;
    }

    function parsePragmaDirective(): PragmaDirective {
        const pos = getPositionState();

        parseExpected(SyntaxKind.PragmaDirective);
        let pragmaArgs = parseList(ParsingContext.PramgaArguments, parseIdentifier);

        if (pragmaArgs.length === 0) {
            pragmaArgs = createMissingList<Identifier>();
            parseErrorAtCurrentToken(Diagnostics.Pragma_directive_requires_at_least_one_argument);
        }

        // TODO: validate pragma arguments here, similar to modifiers

        return finishNode(factory.createPragmaDirective(pragmaArgs), pos);
    }

    function parseIncludeDirective(): IncludeDirective {
        const pos = getPositionState();
        const hasJSDoc = hasPrecedingJSDocComment();
        
        const directiveContent: StringLiteral[] = [];

        parseExpected(SyntaxKind.IncludeDirective);

        let localFirst = false;
        if (token() === SyntaxKind.LessThanToken) {
            currentToken = scanner.reScanLessThanTokenAsStringLiteral();
            directiveContent.push(parseLiteralNode() as StringLiteral);            
        } else {
            while (token() === SyntaxKind.StringLiteral) {
                directiveContent.push(parseLiteralNode() as StringLiteral);
            }            
            localFirst = true;
        }

        if (directiveContent.length === 0) {
            directiveContent.push(createMissingNode(SyntaxKind.StringLiteral, /*reportAtCurrentPosition*/ true, Diagnostics.Expression_expected));
        }
                
        return withJSDoc(finishNode(factory.createIncludeDirective(directiveContent, localFirst), pos), hasJSDoc);
    }

    function parseDefineDirective(): PreprocessorDirective {
        const pos = getPositionState();
        const hasJSDoc = hasPrecedingJSDocComment();

        parseExpected(SyntaxKind.DefineDirective);
        
        const posIdentifier = getPositionState();
        const identifierStart = scanner.getTokenStart();
        const identifier = parseIdentifier();
        let args: NodeArray<ParameterDeclaration> | undefined;
        
        const identifierEnd = identifierStart + identifier.text.length;
        if (identifierEnd === scanner.getTokenStart() && token() === SyntaxKind.OpenParenToken) {
            args = parseParameters();
        }
        
        let tokenCount = 0;
        const contentStart = scanner.getTokenStart();
        const macroTextFilename = scanner.getFileName().length > 0 ? scanner.getFileName() : fileName;
        let endPos = contentStart;
        while (token() !== SyntaxKind.NewLineTrivia && token() !== SyntaxKind.EndOfFileToken) {
            tokenCount++;
            endPos = scanner.getTokenEnd();
            nextToken();                      
        }        
        const range = tokenCount > 0 ? { pos: contentStart, end: endPos } satisfies TextRange : undefined;

        // Add to macro table here
        const macroNode = withJSDoc(finishNode(factory.createDefineDirective(identifier, args, range), pos), hasJSDoc);

        if (isIdentifierNode(identifier) && identifier.text?.length > 0) {
            if (macroTable[identifier.text]) {                
                parseErrorAt(identifierStart, identifierStart + identifier.text.length, pos.fileName, Diagnostics.Macro_already_defined_0, identifier.text);
            } else {
                macroTable[identifier.text] = createMacro(macroNode, macroTextFilename);
            }
        }

        return macroNode;        
    }

    function createBuiltInMacro(text: string): Macro {
        return { includeFilename: "global", posInOrigin: 0, endInOrigin: 0, getText: () => text, range: {pos: 0, end: text.length} };
    }

    function createMacro(directive: DefineDirective, macroSourceFilename: string): Macro {        
        function getMacroText(): string {            
            Debug.assertIsDefined(directive.range, "Cannot expand macro for a define without content");
            // return (directive.originFilename == fileName) ? sourceText : includeFileCache[directive.originFilename] ?? "";            
            return includeFileCache[macroSourceFilename] ?? "";
        }   

        const macro = { 
            includeFilename: directive.originFilename, 
            includeDirPos: directive.includeDirPos, 
            includeDirEnd: directive.includeDirEnd,
            range: directive.range,
            arguments: directive.arguments,
            getText: getMacroText 
        };           
        
        if (Debug.isDebugging) {
            (macro as any).__macroText = function() {
                return getMacroText().substring(macro.range.pos, macro.range.end);
            }
        }

        return macro;
    }    

    function parseUndefDirective(): UndefDirective {
        const pos = getPositionState();
        const hasJSDoc = hasPrecedingJSDocComment();

        parseExpected(SyntaxKind.UndefDirective);
        
        const identifier = parseIdentifier();
        
        delete macroTable[identifier.text];
        return withJSDoc(finishNode(factory.createUndefDirective(identifier), pos), hasJSDoc);
    }

    function parseIfStatement(): IfStatement {
        const pos = getPositionState();
        const hasJSDoc = hasPrecedingJSDocComment();
        parseExpected(SyntaxKind.IfKeyword);
        const openParenPosition = scanner.getTokenStart();
        const openParenFilename = scanner.getFileName();
        const openParenParsed = parseExpected(SyntaxKind.OpenParenToken);
        const expression = allowInAnd(parseExpression);
        parseExpectedMatchingBrackets(SyntaxKind.OpenParenToken, SyntaxKind.CloseParenToken, openParenParsed, openParenPosition, openParenFilename);
        const thenStatement = parseStatement();
        const elseStatement = parseOptional(SyntaxKind.ElseKeyword) ? parseStatement() : undefined;
        return withJSDoc(finishNode(factoryCreateIfStatement(expression, thenStatement, elseStatement), pos), hasJSDoc);
    }
    
    function parseForEachStatement(): Statement {
        const pos = getPositionState();
        const hasJSDoc = hasPrecedingJSDocComment();
        parseExpected(SyntaxKind.ForEachKeyword);        
        parseExpected(SyntaxKind.OpenParenToken);
        
        let initializer!: VariableDeclarationList | Expression;
        if (
            isTypeName() && lookAhead(nextTokenIsIdentifierOrKeyword)
        ) {
            const type = parseType();
            initializer = parseVariableDeclarationList(/*inForStatementInitializer*/ true, type, ParsingContext.ForEachInitialers);
        }
        else {
            initializer = disallowInAnd(parseExpression);
        }

        // there must be a colon or an in keyword
        let isColon = false;
        if (!parseOptional(SyntaxKind.InKeyword)) {
            isColon=true;
            parseExpected(SyntaxKind.ColonToken);
        }

        const expression = parseMaybeRangeExpression(SyntaxKind.CloseParenToken);
        parseExpected(SyntaxKind.CloseParenToken);
        const body = parseStatement();

        const node = factory.createForEachStatement(initializer, expression, body);
        
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parseForStatement(): Statement {
        const pos = getPositionState();
        const hasJSDoc = hasPrecedingJSDocComment();
        parseExpected(SyntaxKind.ForKeyword);        
        parseExpected(SyntaxKind.OpenParenToken);

        let initializer!: VariableDeclarationList | Expression;
        if (token() !== SyntaxKind.SemicolonToken) {
            if (
                isTypeName() && lookAhead(nextTokenIsIdentifierOrKeyword)
            ) {
                const type = parseType();
                initializer = parseVariableDeclarationList(/*inForStatementInitializer*/ true, type);
            }
            else {
                initializer = disallowInAnd(parseExpression);
            }
        }

        let node: IterationStatement;
      
        parseExpected(SyntaxKind.SemicolonToken);
        const condition = token() !== SyntaxKind.SemicolonToken && token() !== SyntaxKind.CloseParenToken
            ? allowInAnd(parseExpression)
            : undefined;
        parseExpected(SyntaxKind.SemicolonToken);
        const incrementor = token() !== SyntaxKind.CloseParenToken
            ? allowInAnd(parseExpression)
            : undefined;
        parseExpected(SyntaxKind.CloseParenToken);
        node = factoryCreateForStatement(initializer, condition, incrementor, parseStatement());

        return withJSDoc(finishNode(node, pos) as ForStatement | ForEachStatement, hasJSDoc);
    }

    function parseBreakOrContinueStatement(kind: SyntaxKind): BreakOrContinueStatement {
        const pos = getPositionState();
        const hasJSDoc = hasPrecedingJSDocComment();

        parseExpected(kind === SyntaxKind.BreakStatement ? SyntaxKind.BreakKeyword : SyntaxKind.ContinueKeyword);
        const label = canParseSemicolon() ? undefined : parseIdentifier();

        parseSemicolon();
        const node = kind === SyntaxKind.BreakStatement
            ? factory.createBreakStatement(label)
            : factory.createContinueStatement(label);
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parseCatchExpression(): CatchExpression {
        const post = getPositionState();

        let expression: Expression | undefined;
        let modifier: Identifier | undefined;
        let modifierExpression: Expression | undefined;
        let block: Block | undefined;

        parseExpected(SyntaxKind.CatchKeyword);

        if (parseOptional(SyntaxKind.OpenParenToken)) {        
            expression = parseExpression();
            
            if (parseOptional(SyntaxKind.SemicolonToken)) {
                modifier = parseIdentifier(Diagnostics.Catch_expression_modifier_expected);
                if (!nodeIsMissing(modifier) && token() !== SyntaxKind.CloseParenToken) {
                    modifierExpression = parseExpression();
                }
            }

            parseExpected(SyntaxKind.CloseParenToken);
        } else {
            block = parseFunctionBlockOrSemicolon(SignatureFlags.None);
        }

        return finishNode(factory.createCatchExpression(expression, modifier, modifierExpression, block), post);
    }

    function parseCatchStatement(): CatchStatement {
        // fluff-style catch statements can look like an ld expression:
        //      catch(expr);
        // or have a blkock
        //      catch { ... }

        const pos = getPositionState();
        const hasJSDoc = hasPrecedingJSDocComment();
        
        parseExpected(SyntaxKind.CatchKeyword);

        let expression: Expression;
        if (parseOptional(SyntaxKind.OpenParenToken)) {
            expression = parseExpression();
            parseExpected(SyntaxKind.CloseParenToken);
        }        

        const block = parseFunctionBlockOrSemicolon(SignatureFlags.None);

        return withJSDoc(finishNode(factory.createCatchStatement(expression, block), pos), hasJSDoc);
    }
    
    function parseCaseClause(): CaseClause {
        const pos = getPositionState();
        const hasJSDoc = hasPrecedingJSDocComment();
        parseExpected(SyntaxKind.CaseKeyword);
        
        const expression = parseMaybeRangeExpression(SyntaxKind.ColonToken);
        parseExpected(SyntaxKind.ColonToken);

        const statements = parseList(ParsingContext.SwitchClauseStatements, parseStatement);
        return withJSDoc(finishNode(factory.createCaseClause(expression, statements), pos), hasJSDoc);
    }

    function parseDefaultClause(): DefaultClause {
        const pos = getPositionState();
        parseExpected(SyntaxKind.DefaultKeyword);
        parseExpected(SyntaxKind.ColonToken);
        const statements = parseList(ParsingContext.SwitchClauseStatements, parseStatement);
        return finishNode(factory.createDefaultClause(statements), pos);
    }

    function parseCaseOrDefaultClause(): CaseOrDefaultClause {
        return token() === SyntaxKind.CaseKeyword ? parseCaseClause() : parseDefaultClause();
    }

    function parseCaseBlock(): CaseBlock {
        const pos = getPositionState();
        
        const clauses = parseList(ParsingContext.SwitchClauses, parseCaseOrDefaultClause);
        
        return finishNode(factory.createCaseBlock(clauses), pos);
    }    

    function parseSwitchStatement(): SwitchStatement {
        const pos = getPositionState();
        const hasJSDoc = hasPrecedingJSDocComment();        
        
        parseExpected(SyntaxKind.SwitchKeyword);
        parseExpected(SyntaxKind.OpenParenToken);
        const expression = allowInAnd(parseExpression);
        parseExpected(SyntaxKind.CloseParenToken);

        parseExpected(SyntaxKind.OpenBraceToken);
        const preBlock = parseList(ParsingContext.SwitchPreBlock, parseStatement);
        const caseBlock = parseCaseBlock();
        parseExpected(SyntaxKind.CloseBraceToken);

        return withJSDoc(finishNode(factory.createSwitchStatement(expression, preBlock, caseBlock), pos), hasJSDoc);
    }

    function parseDoStatement(): DoWhileStatement {
        const pos = getPositionState();
        const hasJSDoc = hasPrecedingJSDocComment();
        parseExpected(SyntaxKind.DoKeyword);
        const statement = parseStatement();
        parseExpected(SyntaxKind.WhileKeyword);
        const openParenPosition = scanner.getTokenStart();
        const openParenFilename = scanner.getFileName();
        const openParenParsed = parseExpected(SyntaxKind.OpenParenToken);
        const expression = allowInAnd(parseExpression);
        parseExpectedMatchingBrackets(SyntaxKind.OpenParenToken, SyntaxKind.CloseParenToken, openParenParsed, openParenPosition, openParenFilename);

        // From: https://mail.mozilla.org/pipermail/es-discuss/2011-August/016188.html
        // 157 min --- All allen at wirfs-brock.com CONF --- "do{;}while(false)false" prohibited in
        // spec but allowed in consensus reality. Approved -- this is the de-facto standard whereby
        //  do;while(0)x will have a semicolon inserted before x.
        parseOptional(SyntaxKind.SemicolonToken);
        return withJSDoc(finishNode(factory.createDoWhileStatement(statement, expression), pos), hasJSDoc);
    }

    function parseWhileStatement(): WhileStatement {
        const pos = getPositionState();
        const hasJSDoc = hasPrecedingJSDocComment();
        parseExpected(SyntaxKind.WhileKeyword);
        const openParenPosition = scanner.getTokenStart();
        const openParenFilename = scanner.getFileName();
        const openParenParsed = parseExpected(SyntaxKind.OpenParenToken);
        const expression = allowInAnd(parseExpression);
        parseExpectedMatchingBrackets(SyntaxKind.OpenParenToken, SyntaxKind.CloseParenToken, openParenParsed, openParenPosition, openParenFilename);
        const statement = parseStatement();
        return withJSDoc(finishNode(factory.createWhileStatement(statement, expression), pos), hasJSDoc);
    }
    
    function getPosStateFilename(pos: PositionState) {
        return fileName;//pos.fileName?.length > 0 ? pos.fileName : fileName;
    }
  
    function finishNode<T extends Node>(node: T, pos: number, end: number): T
    function finishNode<T extends Node>(node: T, pos: PositionState): T 
    function finishNode<T extends Node>(node: T, pos: number | PositionState, end?: number): T {
        if (typeof pos !== "number") {
            const scannerState = scanner.getState(pos.stateId);
            Debug.assertIsDefined(scannerState, "Scanner state must be defined");
            Debug.assert(scannerState.fileName == pos.fileName, "Scanner state filename does not match position state filename");
            // Debug.assert(!pos.speculating, "Cannot finish node while speculating");

            (node as Mutable<T>).includeDirPos = currentIncludeDirective?.pos;// ?? pos.macro?.posInOrigin;
            (node as Mutable<T>).includeDirEnd = currentIncludeDirective?.end;// ?? pos.macro?.endInOrigin;
            (node as Mutable<T>).originFilename = scannerState.fileName?.length > 0 ? scannerState.fileName : fileName;
            (node as Mutable<T>).originPos = pos.pos;
            (node as Mutable<T>).originEnd = end ?? scannerState.end;
            
            const macroState = pos.macro?.pos;
            if (macroState && macroState.fileName === fileName) {
                // const macroEndState = scanner.getState(macroState.stateId);
                setTextRangePosEnd(node, macroState.pos, pos.macro.end);    
            } else if (currentIncludeDirective) {
                setTextRangePosEnd(node, currentIncludeDirective.pos, currentIncludeDirective.end);
            } else {
                setTextRangePosEnd(node, pos.pos, scannerState.end);
            }            
        } else {
            setTextRangePosEnd(node, pos, end!);
        }
        
        // TODO: remove this once we're confident in the parser positioning
        const incPos = node.includeDirPos;
        !!incPos && typeof pos !== "number" && Debug.assert(incPos < includeFileCache[getPosStateFilename(pos)]?.length, "Include directive position is out of range");
        Debug.assert(node.end >= node.pos, "Node end is out of range");

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

    // Ignore strict mode flag because we will report an error in type checker instead.
    function isIdentifier(): boolean {
        if (token() === SyntaxKind.Identifier) {
            return true;
        }

        // If we have a 'yield' keyword, and we're in the [yield] context, then 'yield' is
        // considered a keyword and is not an identifier.
        // if (token() === SyntaxKind.YieldKeyword && inYieldContext()) {
        //     return false;
        // }

        // If we have a 'await' keyword, and we're in the [Await] context, then 'await' is
        // considered a keyword and is not an identifier.
        // if (token() === SyntaxKind.AwaitKeyword && inAwaitContext()) {
        //     return false;
        // }

        return token() > SyntaxKind.LastReservedWord;
    }

    
    function parseExpected(kind: PunctuationOrKeywordSyntaxKind, diagnosticMessage?: DiagnosticMessage, shouldAdvance = true): boolean {
        if (token() === kind) {
            if (shouldAdvance) {
                nextToken();
            }
            return true;
        }

        // Report specific message if provided with one.  Otherwise, report generic fallback message.
        if (diagnosticMessage) {
            parseErrorAtCurrentToken(diagnosticMessage);
        }
        else {
            parseErrorAtCurrentToken(Diagnostics._0_expected, tokenToString(kind));
        }
        return false;
    }
    
    function parseTokenNode<T extends Node>(): T {
        const pos = getPositionState();
        const kind = token();        
        nextToken();        
        return finishNode(factoryCreateToken(kind), pos) as T;
    }

    function parseExpectedMatchingBrackets(openKind: PunctuationSyntaxKind, closeKind: PunctuationSyntaxKind, openParsed: boolean, openPosition: number, openParenFilename: string) {
        if (token() === closeKind) {
            nextToken();
            return;
        }
        const lastError = parseErrorAtCurrentToken(Diagnostics._0_expected, tokenToString(closeKind));
        if (!openParsed) {
            return;
        }
        if (lastError) {
            const fn = openParenFilename || scanner.getFileName() || fileName;
            const sourceForFn = includeFileCache[fn];

            addRelatedInfo(
                lastError,
                createDetachedDiagnostic(fn, sourceForFn, openPosition, 1, Diagnostics.The_parser_expected_to_find_a_1_to_match_the_0_token_here, tokenToString(openKind), tokenToString(closeKind)),
            );
        }
    }

    function parseExpectedMatchingBracketTokens(openKind: PunctuationSyntaxKind, closeKind: PunctuationSyntaxKind[], openParsed: boolean, openPosition: number, openFilename: string) {
        Debug.assert(closeKind.length > 0, "closeKind should have at least one element");

        let closePos = 0;
        let lastError: DiagnosticWithDetachedLocation;
        let errorKind: PunctuationSyntaxKind | undefined;
        const errorText = closeKind.map(tokenToString).join("");

        while (closePos < closeKind.length) {
            if (token() === closeKind[closePos++]) {
                nextToken();   
                continue;             
            }
            errorKind = closeKind[closePos-1];
            lastError = parseErrorAtCurrentToken(Diagnostics._0_expected, errorText);
            break;
        }
        
        if (!openParsed) {
            return;
        }
        if (lastError) {
            addRelatedInfo(
                lastError,
                createDetachedDiagnostic(openFilename, includeFileCache[openFilename] ?? scanner.getText(), openPosition, 1, Diagnostics.The_parser_expected_to_find_a_1_to_match_the_0_token_here, tokenToString(openKind), errorText),
            );
        }
    }
    
    function parseExpectedToken<TKind extends SyntaxKind>(t: TKind, diagnosticMessage?: DiagnosticMessage, arg0?: string): Token<TKind>;
    function parseExpectedToken(t: SyntaxKind, diagnosticMessage?: DiagnosticMessage, arg0?: string): Node {
        return parseOptionalToken(t) ||
            createMissingNode(t, /*reportAtCurrentPosition*/ false, diagnosticMessage || Diagnostics._0_expected, arg0 || tokenToString(t)!);
    }

    function parseExpectedTokenJSDoc<TKind extends JSDocSyntaxKind>(t: TKind): Token<TKind>;
    function parseExpectedTokenJSDoc(t: JSDocSyntaxKind): Node {
        const optional = parseOptionalTokenJSDoc(t);
        if (optional) return optional;
        Debug.assert(isKeywordOrPunctuation(t));
        return createMissingNode(t, /*reportAtCurrentPosition*/ false, Diagnostics._0_expected, tokenToString(t));
    }
    
    function parseOptionalTokenJSDoc<TKind extends JSDocSyntaxKind>(t: TKind): Token<TKind>;
    function parseOptionalTokenJSDoc(t: JSDocSyntaxKind): Node | undefined {
        if (token() === t) {
            return parseTokenNodeJSDoc();
        }
        return undefined;
    }

    function parseTokenNodeJSDoc<T extends Node>(): T {
        const pos = getPositionState();
        const kind = token();
        nextTokenJSDoc();
        return finishNode(factoryCreateToken(kind), pos) as T;
    }

    function parseOptional(t: SyntaxKind): boolean {
        if (token() === t) {
            nextToken();
            return true;
        }
        return false;
    }

    function parseOptionalToken<TKind extends SyntaxKind>(t: TKind): Token<TKind>;
    function parseOptionalToken(t: SyntaxKind): Node | undefined {
        if (token() === t) {
            return parseTokenNode();
        }
        return undefined;
    }

    function doOutsideOfContext<T>(context: NodeFlags, func: () => T): T {
        // contextFlagsToClear will contain only the context flags that are
        // currently set that we need to temporarily clear
        // We don't just blindly reset to the previous flags to ensure
        // that we do not mutate cached flags for the incremental
        // parser (ThisNodeHasError, ThisNodeOrAnySubNodesHasError, and
        // HasAggregatedChildData).
        const contextFlagsToClear = context & contextFlags;
        if (contextFlagsToClear) {
            // clear the requested context flags
            setContextFlag(/*val*/ false, contextFlagsToClear);
            const result = func();
            // restore the context flags we just cleared
            setContextFlag(/*val*/ true, contextFlagsToClear);
            return result;
        }

        // no need to do anything special as we are not in any of the requested contexts
        return func();
    }

    function doInsideOfContext<T>(context: NodeFlags, func: () => T): T {
        // contextFlagsToSet will contain only the context flags that
        // are not currently set that we need to temporarily enable.
        // We don't just blindly reset to the previous flags to ensure
        // that we do not mutate cached flags for the incremental
        // parser (ThisNodeHasError, ThisNodeOrAnySubNodesHasError, and
        // HasAggregatedChildData).
        const contextFlagsToSet = context & ~contextFlags;
        if (contextFlagsToSet) {
            // set the requested context flags
            setContextFlag(/*val*/ true, contextFlagsToSet);
            const result = func();
            // reset the context flags we just set
            setContextFlag(/*val*/ false, contextFlagsToSet);
            return result;
        }

        // no need to do anything special as we are already in all of the requested contexts
        return func();
    }

    function setContextFlag(val: boolean, flag: NodeFlags) {
        if (val) {
            contextFlags |= flag;
        }
        else {
            contextFlags &= ~flag;
        }
    }

    function setDisallowInContext(val: boolean) {
        setContextFlag(val, NodeFlags.DisallowInContext);
    }

    function allowInAnd<T>(func: () => T): T {
        return doOutsideOfContext(NodeFlags.DisallowInContext, func);
    }

    function disallowInAnd<T>(func: () => T): T {
        return doInsideOfContext(NodeFlags.DisallowInContext, func);
    }

    function disallowMacroProcessing<T>(func: () => T): T {
        const savedProcessingMacro = allowMacroProcessing;
        allowMacroProcessing = false;

        const result = func();

        allowMacroProcessing = savedProcessingMacro;
        return result;
    }

    function inContext(flags: NodeFlags) {
        return (contextFlags & flags) !== 0;
    }
    
    function inDisallowInContext() {
        return inContext(NodeFlags.DisallowInContext);
    }

    function canParseSemicolon() {
        // If there's a real semicolon, then we can always parse it out.
        if (token() === SyntaxKind.SemicolonToken) {
            return true;
        }

        // We can parse out an optional semicolon in ASI cases in the following cases.
        return token() === SyntaxKind.CloseBraceToken || token() === SyntaxKind.EndOfFileToken || scanner.hasPrecedingLineBreak();
    }

    function speculationHelper<T>(callback: () => T, speculationKind: SpeculationKind): T {        
        // Keep track of the state we'll need to rollback to if lookahead fails (or if the
        // caller asked us to always reset our state).
        const saveIsSpeculating = isSpeculating;
        const saveToken = currentToken;
        const saveParseDiagnosticsLength = parseDiagnostics.length;
        const saveParseErrorBeforeNextFinishedNode = parseErrorBeforeNextFinishedNode;        
        const saveCurrentMaco = currentMacro;
        const saveInclude = currentIncludeDirective;        

        // Note: it is not actually necessary to save/restore the context flags here.  That's
        // because the saving/restoring of these flags happens naturally through the recursive
        // descent nature of our parser.  However, we still store this here just so we can
        // assert that invariant holds.
        const saveContextFlags = contextFlags;

        isSpeculating = true;               
        
        // If we're only looking ahead, then tell the scanner to only lookahead as well.
        // Otherwise, if we're actually speculatively parsing, then tell the scanner to do the
        // same.
        const result = speculationKind !== SpeculationKind.TryParse
            ? scanner.lookAhead(callback)
            : scanner.tryScan(callback);

        Debug.assert(saveContextFlags === contextFlags);

        // If our callback returned something 'falsy' or we're just looking ahead,
        // then unconditionally restore us to where we were.
        if (!result || speculationKind !== SpeculationKind.TryParse) {
            currentToken = saveToken;
            if (speculationKind !== SpeculationKind.Reparse) {
                parseDiagnostics.length = saveParseDiagnosticsLength;
            }
            parseErrorBeforeNextFinishedNode = saveParseErrorBeforeNextFinishedNode;            
            currentMacro = saveCurrentMaco;
            currentIncludeDirective = saveInclude;            
        }

        isSpeculating = saveIsSpeculating;
        return result;
    }

    /** Invokes the provided callback then unconditionally restores the parser to the state it
     * was in immediately prior to invoking the callback.  The result of invoking the callback
     * is returned from this function.
     */
    function lookAhead<T>(callback: () => T): T {
        return speculationHelper(callback, SpeculationKind.Lookahead);
    }

    /** Invokes the provided callback.  If the callback returns something falsy, then it restores
     * the parser to the state it was in immediately prior to invoking the callback.  If the
     * callback returns something truthy, then the parser state is not rolled back.  The result
     * of invoking the callback is returned from this function.
     */
    function tryParse<T>(callback: () => T): T {
        return speculationHelper(callback, SpeculationKind.TryParse);
    }

    function tryParseSemicolon() {
        if (!canParseSemicolon()) {
            return false;
        }

        if (token() === SyntaxKind.SemicolonToken) {
            // consume the semicolon if it was explicitly provided.
            nextToken();
        }

        return true;
    }

    function parseSemicolon(): boolean {
        return tryParseSemicolon() || parseExpected(SyntaxKind.SemicolonToken);
    }

    function parseExpressionOrLabeledStatement(): ExpressionStatement | LabeledStatement {
        // Avoiding having to do the lookahead for a labeled statement by just trying to parse
        // out an expression, seeing if it is identifier and then seeing if it is followed by
        // a colon.
        const pos = getPositionState();
        let hasJSDoc = hasPrecedingJSDocComment();
        let node: ExpressionStatement | LabeledStatement;
        const hasParen = token() === SyntaxKind.OpenParenToken;
        const expression = allowInAnd(parseExpression);
        // if (isIdentifierNode(expression) && parseOptional(SyntaxKind.ColonToken)) {
        //     node = factory.createLabeledStatement(expression, parseStatement());
        // }
        // else {
        if (!tryParseSemicolon()) {
            parseErrorForMissingSemicolonAfter(expression);
        }
        node = factoryCreateExpressionStatement(expression);
        if (hasParen) {
            // do not parse the same jsdoc twice
            hasJSDoc = false;
        }
        // }
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function getSpaceSuggestion(expressionText: string) {
        for (const keyword of viableKeywordSuggestions) {
            if (expressionText.length > keyword.length + 2 && startsWith(expressionText, keyword)) {
                return `${keyword} ${expressionText.slice(keyword.length)}`;
            }
        }

        return undefined;
    }
    
    const viableKeywordSuggestions = Object.keys(textToKeywordObj).filter(keyword => keyword.length > 2);
    
    /**
     * Provides a better error message than the generic "';' expected" if possible for
     * known common variants of a missing semicolon, such as from a mispelled names.
     *
     * @param node Node preceding the expected semicolon location.
     */
    function parseErrorForMissingSemicolonAfter(node: Expression | PropertyName): void {        
        // Otherwise, if this isn't a well-known keyword-like identifier, give the generic fallback message.
        const expressionText = isIdentifierNode(node) ? idText(node) : undefined;
        if (!expressionText || !isIdentifierText(expressionText, languageVersion)) {            
            parseErrorAtCurrentToken(Diagnostics._0_expected, tokenToString(SyntaxKind.SemicolonToken));
            return;
        }

        const nodeSourceText = includeFileCache[fileName];//scanner.getFileName()];
        const pos = skipTrivia(nodeSourceText, node.pos);

        // Some known keywords are likely signs of syntax being used improperly.
        switch (expressionText) {
            case "const":
            case "let":
            case "var":
                parseErrorAt(pos, node.end, node.originFilename, Diagnostics.Variable_declaration_not_allowed_at_this_location);
                return;

            case "declare":
                // If a declared node failed to parse, it would have emitted a diagnostic already.
                return;

            // case "interface":
            //     parseErrorForInvalidName(Diagnostics.Interface_name_cannot_be_0, Diagnostics.Interface_must_be_given_a_name, SyntaxKind.OpenBraceToken);
            //     return;

            // case "is":
            //     parseErrorAt(pos, scanner.getTokenStart(), Diagnostics.A_type_predicate_is_only_allowed_in_return_type_position_for_functions_and_methods);
            //     return;

            // case "module":
            // case "namespace":
            //     parseErrorForInvalidName(Diagnostics.Namespace_name_cannot_be_0, Diagnostics.Namespace_must_be_given_a_name, SyntaxKind.OpenBraceToken);
            //     return;

            // case "type":
            //     parseErrorForInvalidName(Diagnostics.Type_alias_name_cannot_be_0, Diagnostics.Type_alias_must_be_given_a_name, SyntaxKind.EqualsToken);
            //     return;
        }

        // The user alternatively might have misspelled or forgotten to add a space after a common keyword.
        const suggestion = getSpellingSuggestion(expressionText, viableKeywordSuggestions, identity) ?? getSpaceSuggestion(expressionText);
        if (suggestion) {
            parseErrorAt(pos, node.end, node.originFilename, Diagnostics.Unknown_keyword_or_identifier_Did_you_mean_0, suggestion);
            return;
        }

        // Unknown tokens are handled with their own errors in the scanner
        if (token() === SyntaxKind.Unknown) {
            return;
        }

        // Otherwise, we know this some kind of unknown word, not just a missing expected semicolon.
        parseErrorAt(pos, Math.max(pos, node.end), fileName, Diagnostics.Unexpected_keyword_or_identifier);
    }

    
    let hasDeprecatedTag = false;
    function withJSDoc<T extends HasJSDoc>(node: T, hasJSDoc: boolean): T {
        if (!hasJSDoc) {
            return node;
        }

        Debug.assert(!node.jsDoc); // Should only be called once per node
        const saveSourceText = sourceText;
        sourceText = includeFileCache[node.originFilename] ?? sourceText;
        const jsDoc = mapDefined(getJSDocCommentRanges(node, sourceText), comment => JSDocParser.parseJSDocComment(node, comment.pos, comment.end - comment.pos));
        if (jsDoc.length) node.jsDoc = jsDoc;
        if (hasDeprecatedTag) {
            hasDeprecatedTag = false;
            (node as Mutable<T>).flags |= NodeFlags.Deprecated;
        }
        sourceText = saveSourceText;
        return node;
    }


    // EXPRESSIONS
    function isStartOfLeftHandSideExpression(): boolean {
        switch (token()) {
            // case SyntaxKind.ThisKeyword:
            case SyntaxKind.SuperKeyword:
            case SyntaxKind.NullKeyword:
            case SyntaxKind.TrueKeyword:
            case SyntaxKind.FalseKeyword:
            case SyntaxKind.NumericLiteral:
            case SyntaxKind.IntLiteral:
            case SyntaxKind.FloatLiteral:
            case SyntaxKind.StringLiteral:
            case SyntaxKind.StringArrayLiteral:
            // case SyntaxKind.NoSubstitutionTemplateLiteral:
            // case SyntaxKind.TemplateHead:
            case SyntaxKind.OpenParenToken:
            case SyntaxKind.OpenBracketToken:
            case SyntaxKind.OpenParenColonToken:
            case SyntaxKind.OpenBraceToken:
            case SyntaxKind.OpenParenBraceToken:
            case SyntaxKind.OpenParenBracketToken:                
            case SyntaxKind.FunctionKeyword:
            case SyntaxKind.ClassKeyword:
            case SyntaxKind.NewKeyword:
            case SyntaxKind.CatchKeyword:
            case SyntaxKind.SlashToken:
            case SyntaxKind.SlashEqualsToken:
            case SyntaxKind.Identifier:
            case SyntaxKind.LambdaToken:
                return true;
            // case SyntaxKind.ImportKeyword:
            //     return lookAhead(nextTokenIsOpenParenOrLessThanOrDot);
            default:
                return isIdentifier();
        }
    }
    
    function isStartOfExpression(): boolean {
        if (isStartOfLeftHandSideExpression()) {
            return true;
        }

        switch (token()) {
            case SyntaxKind.PlusToken:
            case SyntaxKind.MinusToken:
            case SyntaxKind.TildeToken:
            case SyntaxKind.ExclamationToken:
            // case SyntaxKind.DeleteKeyword:
            // case SyntaxKind.TypeOfKeyword:
            case SyntaxKind.VoidKeyword:
            case SyntaxKind.PlusPlusToken:
            case SyntaxKind.MinusMinusToken:
            case SyntaxKind.LessThanToken:
            // case SyntaxKind.AwaitKeyword:
            // case SyntaxKind.YieldKeyword:
            // case SyntaxKind.PrivateIdentifier:
            case SyntaxKind.AtToken:
                // Yield/await always starts an expression.  Either it is an identifier (in which case
                // it is definitely an expression).  Or it's a keyword (either because we're in
                // a generator or async function, or in strict mode (or both)) and it started a yield or await expression.
                return true;
            default:
                // Error tolerance.  If we see the start of some binary operator, we consider
                // that the start of an expression.  That way we'll parse out a missing identifier,
                // give a good message about an identifier being missing, and then consume the
                // rest of the binary expression.
                if (isBinaryOperator()) {
                    return true;
                }

                return isIdentifier();
        }
    }

    function parseType(): TypeNode {
        // if (contextFlags & NodeFlags.TypeExcludesFlags) {
        //     return doOutsideOfContext(NodeFlags.TypeExcludesFlags, parseType);
        // }
        // if (isStartOfFunctionTypeOrConstructorType()) {
        //     return parseFunctionOrConstructorType();
        // }
        const pos = getPositionState();
        const type = parseUnionTypeOrHigher();
        // if (!inDisallowConditionalTypesContext() && !scanner.hasPrecedingLineBreak() && parseOptional(SyntaxKind.ExtendsKeyword)) {
        //     // The type following 'extends' is not permitted to be another conditional type
        //     const extendsType = disallowConditionalTypesAnd(parseType);
        //     parseExpected(SyntaxKind.QuestionToken);
        //     const trueType = allowConditionalTypesAnd(parseType);
        //     parseExpected(SyntaxKind.ColonToken);
        //     const falseType = allowConditionalTypesAnd(parseType);
        //     return finishNode(factory.createConditionalTypeNode(type, extendsType, trueType, falseType), pos);
        // }
        return type;
    }

    function parseUnionOrIntersectionType(
        operator: SyntaxKind.BarToken | SyntaxKind.AmpersandToken,
        parseConstituentType: () => TypeNode,
        createTypeNode: (types: NodeArray<TypeNode>) => UnionTypeNode,
    ): TypeNode {
        const pos = getPositionState();

        if (parseOptional(SyntaxKind.LessThanToken)) {
            const type = parseUnionOrIntersectionType(operator, parseConstituentType, createTypeNode);
            parseExpected(SyntaxKind.GreaterThanToken);
            
            if (parseOptional(SyntaxKind.AsteriskToken)) {
                return finishNode(factory.createArrayTypeNode(type), pos);
            }

            return type;
        }
        
        const hasLeadingOperator = parseOptional(operator);
        let type = parseConstituentType();        
        if (token() === operator || hasLeadingOperator) {
            const types = [type];
            while (parseOptional(operator)) {                
                if (token() === SyntaxKind.LessThanToken)
                    types.push(parseUnionOrIntersectionType(operator, parseConstituentType, createTypeNode));
                else
                    types.push(parseConstituentType());
            }
            type = finishNode(createTypeNode(createNodeArray(types, pos)), pos);
        }
        
        return type;
    }

    function parseUnionTypeOrHigher(): TypeNode {
        return parseUnionOrIntersectionType(SyntaxKind.BarToken, parsePostfixTypeOrHigher, factory.createUnionTypeNode);
    }

    function parsePostfixTypeOrHigher(): TypeNode {
        const pos = getPositionState();
        let type = parseNonArrayType();
        
        if (parseOptional(SyntaxKind.AsteriskToken)) {
            return finishNode(factory.createArrayTypeNode(type), pos);
        } else {
            return type;
        }                        
    }

    function isStartOfType(inStartOfParameter?: boolean): boolean {
        switch (token()) {
            case SyntaxKind.AnyKeyword:
            case SyntaxKind.UnknownKeyword:
            case SyntaxKind.StringKeyword:
            case SyntaxKind.BytesKeyword:
            case SyntaxKind.StatusKeyword:
            case SyntaxKind.LwObjectKeyword:
            case SyntaxKind.ClosureKeyword:
            case SyntaxKind.SymbolKeyword:
            case SyntaxKind.BufferKeyword:
            case SyntaxKind.IntKeyword:
            case SyntaxKind.FloatKeyword:
            case SyntaxKind.MixedKeyword:
            case SyntaxKind.MappingKeyword:
            case SyntaxKind.ObjectKeyword:
            case SyntaxKind.VoidKeyword:
            case SyntaxKind.UndefinedKeyword:
            case SyntaxKind.NullKeyword:            
            case SyntaxKind.OpenBraceToken:
            case SyntaxKind.OpenBracketToken:
            case SyntaxKind.LessThanToken:
            case SyntaxKind.BarToken:
            case SyntaxKind.AmpersandToken:
            case SyntaxKind.NewKeyword:
            case SyntaxKind.StringLiteral:
            case SyntaxKind.StringArrayLiteral:
            case SyntaxKind.NumericLiteral:
            case SyntaxKind.IntLiteral:
            case SyntaxKind.FloatLiteral:
            case SyntaxKind.TrueKeyword:
            case SyntaxKind.FalseKeyword:
            case SyntaxKind.ObjectKeyword:
            case SyntaxKind.AsteriskToken:
            case SyntaxKind.QuestionToken:
            case SyntaxKind.ExclamationToken:
            case SyntaxKind.DotDotDotToken:            
            case SyntaxKind.FunctionKeyword:    
                return true;
            // case SyntaxKind.FunctionKeyword:
            //     return !inStartOfParameter;
            case SyntaxKind.MinusToken:
                return !inStartOfParameter && lookAhead(nextTokenIsNumericOrBigIntLiteral);
            // case SyntaxKind.OpenParenToken:
            //     // Only consider '(' the start of a type if followed by ')', '...', an identifier, a modifier,
            //     // or something that starts a type. We don't want to consider things like '(1)' a type.
            //     return !inStartOfParameter && lookAhead(isStartOfParenthesizedOrFunctionType);            
            default:
                return isIdentifier();
        }
    }

    function parseKeywordAndNoDot(): TypeNode | undefined {
        const node = parseTokenNode<TypeNode>();
        return token() === SyntaxKind.DotToken ? undefined : node;
    }

    function parseNonArrayType(): TypeNode {
        switch (token()) {
            case SyntaxKind.AnyKeyword:
            case SyntaxKind.UnknownKeyword:
            case SyntaxKind.StringKeyword:
            case SyntaxKind.BytesKeyword:            
            case SyntaxKind.LwObjectKeyword:
            case SyntaxKind.ClosureKeyword:
            
            case SyntaxKind.BufferKeyword:
            case SyntaxKind.FunctionKeyword:
            case SyntaxKind.IntKeyword:
            case SyntaxKind.FloatKeyword:
            case SyntaxKind.MixedKeyword:
            case SyntaxKind.MappingKeyword:
            case SyntaxKind.ObjectKeyword:
            case SyntaxKind.UndefinedKeyword:            
            case SyntaxKind.ObjectKeyword:
            case SyntaxKind.ClosureKeyword:
                // If these are followed by a dot, then parse these out as a dotted type reference instead.
                return parseKeywordAndNoDot();
            case SyntaxKind.StatusKeyword:     
            case SyntaxKind.SymbolKeyword:  
                // status is only available in LD           
                return languageVariant === LanguageVariant.LDMud ? parseKeywordAndNoDot() : undefined;
            case SyntaxKind.AsteriskEqualsToken:
                // If there is '*=', treat it as * followed by postfix =
                scanner.reScanAsteriskEqualsToken();
                // falls through
            // case SyntaxKind.AsteriskToken:
            //     console.warn("todo - parse asterisk type");
            //     // return parseJSDocAllType();
            // case SyntaxKind.QuestionQuestionToken:
            //     // If there is '??', treat it as prefix-'?' in JSDoc type.
            //     scanner.reScanQuestionToken();
            //     // falls through
            // case SyntaxKind.QuestionToken:
            //     return parseJSDocUnknownOrNullableType();
            // case SyntaxKind.FunctionKeyword:
            //     return parseJSDocFunctionType();
            // case SyntaxKind.ExclamationToken:
            //     return parseJSDocNonNullableType();            
            case SyntaxKind.StringLiteral:
            case SyntaxKind.StringArrayLiteral:
            case SyntaxKind.IntLiteral:
            case SyntaxKind.FloatLiteral:
            case SyntaxKind.TrueKeyword:
            case SyntaxKind.FalseKeyword:
            case SyntaxKind.NullKeyword:
                return parseLiteralTypeNode();            
            // case SyntaxKind.MinusToken:
            //     return lookAhead(nextTokenIsNumericOrBigIntLiteral) ? parseLiteralTypeNode(/*negative*/ true) : parseTypeReference();
            case SyntaxKind.VoidKeyword:
                return parseTokenNode<TypeNode>();               
            case SyntaxKind.OpenBraceToken:                
                return parseTypeLiteral();//return lookAhead(isStartOfMappedType) ? parseMappedType() : parseTypeLiteral();
            case SyntaxKind.OpenParenToken:
                Debug.fail("todo - parse parenthesized type");
                // return parseParenthesizedType();
            case SyntaxKind.ClassKeyword:
            case SyntaxKind.StructKeyword:
                return parseStructTypeNode(token() as KeywordSyntaxKind);
            // case SyntaxKind.ImportKeyword:
            //     return parseImportType();
            // case SyntaxKind.AssertsKeyword:
            //     return lookAhead(nextTokenIsIdentifierOrKeywordOnSameLine) ? parseAssertsTypePredicate() : parseTypeReference();            
            // default:
            //     return parseTypeReference();
        }
    }

    function parseTypeLiteral(): TypeLiteralNode {
        const pos = getPositionState();
        return finishNode(factory.createTypeLiteralNode(parseObjectTypeMembers()), pos);
    }

    function parseObjectTypeMembers(): NodeArray<TypeElement> {
        let members: NodeArray<TypeElement>;
        if (parseExpected(SyntaxKind.OpenBraceToken)) {
            members = parseList(ParsingContext.TypeMembers, parseTypeMember);
            parseExpected(SyntaxKind.CloseBraceToken);
        }
        else {
            members = createMissingList<TypeElement>();
        }

        return members;
    }
    
    function parseStructTypeNode(structOrClassToken: KeywordSyntaxKind, isStructKeywordExpected=true): StructTypeNode {
        const pos = getPositionState();
        if (isStructKeywordExpected && !parseExpected(structOrClassToken)) {
            createMissingNode(structOrClassToken, /*reportAtCurrentPosition*/ true, Diagnostics._0_expected, "struct");
        }
        
        const name = parseIdentifier();        
        return finishNode(factory.createStructTypeNode(name), pos);
    }

    function parseLiteralTypeNode(negative?: boolean): LiteralTypeNode {
        const pos = getPositionState();
        if (negative) {
            nextToken();
        }
        let expression: LiteralExpression | PrefixUnaryExpression = parseLiteralLikeNode(token()) as LiteralExpression;
        if (negative) {
            expression = finishNode(factory.createPrefixUnaryExpression(SyntaxKind.MinusToken, expression), pos);
        }
        return finishNode(factory.createLiteralTypeNode(expression), pos);
    }

    function parseReturnStatement(): ReturnStatement {
        const pos = getPositionState();
        const hasJSDoc = hasPrecedingJSDocComment();
        parseExpected(SyntaxKind.ReturnKeyword);
        const expression = canParseSemicolon() ? undefined : allowInAnd(parseExpression);
        parseSemicolon();
        return withJSDoc(finishNode(factory.createReturnStatement(expression), pos), hasJSDoc);
    }

    function parseInheritStatement(): InheritDeclaration {        
        Debug.assert(!isSpeculating, "Inherit statements should not be speculatively parsed.");

        const pos = getPositionState();
        const hasJSDoc = hasPrecedingJSDocComment();
        
        const mods = parseModifiers(false, false, false);
        parseExpected(SyntaxKind.InheritKeyword);
        
        let expression: InheritClauseType = allowInAnd(parseExpression);
        // if (token() == SyntaxKind.StringLiteral && lookAhead(() => nextToken() === SyntaxKind.SemicolonToken)) {
        //     expression = parseLiteralLikeNode(SyntaxKind.StringLiteral) as StringLiteral;
        // } else {
        //     expression = allowInAnd(parseExpression);
        // }
        parseSemicolon();
        
        const inheritNode = withJSDoc(finishNode(factory.createInheritDeclaration(expression, mods), pos), hasJSDoc);
        inherits.push(inheritNode);
        
        return inheritNode;
    }

    function parseLiteralLikeNode(kind: SyntaxKind): LiteralLikeNode {        
        const pos = getPositionState();

        if (kind === SyntaxKind.StringArrayLiteral) {
            // special handling for fluffos @@ string literals, which get translated into arrays
            const stringLit = factoryCreateStringLiteral(scanner.getTokenValue(), /*isSingleQuote*/ undefined, scanner.hasExtendedUnicodeEscape());
            if (scanner.isUnterminated()) {
                stringLit.isUnterminated = true;                
            }
            const arrNode = factory.createArrayLiteralExpression([stringLit], scanner.hasPrecedingLineBreak(), false);
            nextToken();
            return finishNode(arrNode, pos);
        }

        const node =
            // Note that theoretically the following condition would hold true literals like 009,
            // which is not octal. But because of how the scanner separates the tokens, we would
            // never get a token like this. Instead, we would get 00 and 9 as two separate tokens.
            // We also do not need to check for negatives because any prefix operator would be part of a
            // parent unary expression.
            (kind === SyntaxKind.IntLiteral || kind === SyntaxKind.NumericLiteral) ? factoryCreateIntLiteral(scanner.getTokenValue(), scanner.getNumericLiteralFlags()) :
            kind === SyntaxKind.FloatLiteral ? factoryCreateFloatLiteral(scanner.getTokenValue(), scanner.getNumericLiteralFlags()) :
            kind === SyntaxKind.StringLiteral ? factoryCreateStringLiteral(scanner.getTokenValue(), /*isSingleQuote*/ undefined, scanner.hasExtendedUnicodeEscape()) :            
            kind === SyntaxKind.BytesLiteral ? factoryCreateBytesLiteral(scanner.getTokenValue(), scanner.hasExtendedUnicodeEscape()) :
            isLiteralKind(kind) ? factoryCreateLiteralLikeNode(kind, scanner.getTokenValue()) :
            Debug.fail();

        if (scanner.hasExtendedUnicodeEscape()) {
            node.hasExtendedUnicodeEscape = true;
        }

        if (scanner.isUnterminated()) {
            node.isUnterminated = true;
        }

        nextToken();
        return finishNode(node, pos);
    }
    
    /*
     * There are situations in which a modifier like 'const' will appear unexpectedly, such as on a class member.
     * In those situations, if we are entirely sure that 'const' is not valid on its own (such as when ASI takes effect
     * and turns it into a standalone declaration), then it is better to parse it and report an error later.
     *
     * In such situations, 'permitConstAsModifier' should be set to true.
     */
    function parseModifiers(allowDecorators: false, permitConstAsModifier?: boolean, stopOnStartOfClassStaticBlock?: boolean): NodeArray<Modifier> | undefined;
    function parseModifiers(allowDecorators: true, permitConstAsModifier?: boolean, stopOnStartOfClassStaticBlock?: boolean): NodeArray<ModifierLike> | undefined;
    function parseModifiers(allowDecorators: boolean, permitConstAsModifier?: boolean, stopOnStartOfClassStaticBlock?: boolean): NodeArray<ModifierLike> | undefined {
        const pos = getPositionState();
        let list: ModifierLike[] | undefined;
        let decorator, modifier, hasSeenStaticModifier = false, hasLeadingModifier = false, hasTrailingDecorator = false;

        // Decorators should be contiguous in a list of modifiers but can potentially appear in two places (i.e., `[...leadingDecorators, ...leadingModifiers, ...trailingDecorators, ...trailingModifiers]`).
        // The leading modifiers *should* only contain `export` and `default` when trailingDecorators are present, but we'll handle errors for any other leading modifiers in the checker.
        // It is illegal to have both leadingDecorators and trailingDecorators, but we will report that as a grammar check in the checker.

        // parse leading modifiers
        while (modifier = tryParseModifier(hasSeenStaticModifier, permitConstAsModifier, stopOnStartOfClassStaticBlock)) {
            if (modifier.kind === SyntaxKind.StaticKeyword) hasSeenStaticModifier = true;
            list = append(list, modifier);
            hasLeadingModifier = true;
        }

        // parse trailing modifiers, but only if we parsed any trailing decorators
        if (hasTrailingDecorator) {
            while (modifier = tryParseModifier(hasSeenStaticModifier, permitConstAsModifier, stopOnStartOfClassStaticBlock)) {
                if (modifier.kind === SyntaxKind.StaticKeyword) hasSeenStaticModifier = true;
                list = append(list, modifier);
            }
        }

        return list && createNodeArray(list, pos);
    }

    

    function tryParseModifier(hasSeenStaticModifier: boolean, permitConstAsModifier?: boolean, stopOnStartOfClassStaticBlock?: boolean): Modifier | undefined {
        const pos = getPositionState();
        const kind = token();

        // if (token() === SyntaxKind.ConstKeyword && permitConstAsModifier) {
        //     // We need to ensure that any subsequent modifiers appear on the same line
        //     // so that when 'const' is a standalone declaration, we don't issue an error.
        //     if (!tryParse(nextTokenIsOnSameLineAndCanFollowModifier)) {
        //         return undefined;
        //     }
        // }
        // if (stopOnStartOfClassStaticBlock && token() === SyntaxKind.StaticKeyword && lookAhead(nextTokenIsOpenBrace)) {
        //     return undefined;
        // }
        // if (hasSeenStaticModifier && token() === SyntaxKind.StaticKeyword) {
        //     return undefined;
        // }
        
        if (!parseAnyContextualModifier()) {
            return undefined;
        }
    

        return finishNode(factoryCreateToken(kind as Modifier["kind"]), pos);
    }

    function parseAnyContextualModifier(): boolean {
        return isModifierKind(token()) && tryParse(nextTokenCanFollowModifier);
    }
    
    function nextTokenCanFollowModifier() {
        switch (token()) {
            // case SyntaxKind.ConstKeyword:
            //     // 'const' is only a modifier if followed by 'enum'.
            //     return nextToken() === SyntaxKind.EnumKeyword;                        
            default:
                return nextTokenIsOnSameLineAndCanFollowModifier();
        }
    }

    function nextTokenIsOnSameLineAndCanFollowModifier() {
        nextToken();
        // LPC allows modifiers to be on separate lines
        // if (scanner.hasPrecedingLineBreak()) {
        //     return false;
        // }
        return canFollowModifier();
    }

    function canFollowModifier(): boolean {
        return token() === SyntaxKind.OpenBracketToken
            || token() === SyntaxKind.OpenBraceToken
            || token() === SyntaxKind.AsteriskToken
            || token() === SyntaxKind.DotDotDotToken            
            || token() === SyntaxKind.LessThanToken // union type
            || isTypeName()
            || isLiteralPropertyName();
    }

    function isTypeName(): boolean {
        switch (token()) {
            case SyntaxKind.BytesKeyword:            
            case SyntaxKind.LwObjectKeyword:
            case SyntaxKind.ClosureKeyword:            
            case SyntaxKind.BufferKeyword:
            case SyntaxKind.NullKeyword:
            case SyntaxKind.TrueKeyword:
            case SyntaxKind.FalseKeyword:
            case SyntaxKind.IntKeyword:
            case SyntaxKind.FloatKeyword:
            case SyntaxKind.StringKeyword:
            case SyntaxKind.MixedKeyword:
            case SyntaxKind.MappingKeyword:
            case SyntaxKind.ObjectKeyword:
            case SyntaxKind.StructKeyword:
            case SyntaxKind.ClassKeyword:
            case SyntaxKind.ClosureKeyword:
            case SyntaxKind.FunctionKeyword:
                return true;
            // handle unionable types
            // case SyntaxKind.LessThanToken:
            //     return lookAhead(()=>{
            //         while(nextToken()==SyntaxKind.LessThanToken) {}
            //         return isTypeName();
            //     });
            case SyntaxKind.StatusKeyword:
            case SyntaxKind.SymbolKeyword:
                return languageVariant === LanguageVariant.LDMud;
        }        

        return false;
    }

    function isLiteralPropertyName(): boolean {
        return tokenIsIdentifierOrKeyword(token()) ||
            token() === SyntaxKind.StringLiteral ||
            token() === SyntaxKind.IntLiteral;
    }

    function isStructOrClassKeyword(): boolean {
        return token() === SyntaxKind.StructKeyword || token() === SyntaxKind.ClassKeyword;
    }

    function isStartOfStructDeclaration() {
        if (isStructOrClassKeyword() && nextToken() == SyntaxKind.Identifier) {            
            switch (nextToken()) {
                case SyntaxKind.OpenBraceToken: // struct decl:    struct <identifier> {
                case SyntaxKind.OpenParenToken: // struct inherit: struct <identifier> (<identifier> {
                    return true;
            }
        }

        return false;
    }

    function parseDeclaration(): Statement {
        // `parseListElement` attempted to get the reused node at this position,
        // but the ambient context flag was not yet set, so the node appeared
        // not reusable in that context.
        const pos = getPositionState();
        const hasJSDoc = hasPrecedingJSDocComment();
        const modifiers = parseModifiers(/*allowDecorators*/ true);
        
        if (isStructOrClassKeyword() && lookAhead(isStartOfStructDeclaration)) {            
            return parseStructDeclaration(pos, hasJSDoc, modifiers);                
            // if we saw "struct <identifier> <identifier>" then we are parsing struct as a type in a var/fun decl
        } 

        const type = parseType();           
        return parseDeclarationWorker(pos, hasJSDoc, modifiers, type);                
    }
    
    function parseDeclarationWorker(pos: PositionState, hasJSDoc: boolean, modifiersIn: NodeArray<ModifierLike> | undefined, typeIn: TypeNode | undefined): Statement {
        
        // if there is a comma, equals, or semi after the first token, it must be a variable declaration
        if (isIdentifier()) {
            if (lookAhead(nextTokenIsOpenParen)) {
                // function
                return parseFunctionDeclaration(pos, hasJSDoc, modifiersIn, typeIn);
            } else {
                return parseVariableStatement(pos, hasJSDoc, modifiersIn, typeIn);                
            }
        } 

        switch (token()) {                                  
            // case SyntaxKind.VarKeyword:
            // case SyntaxKind.LetKeyword:
            // case SyntaxKind.ConstKeyword:
            // case SyntaxKind.UsingKeyword:
            // case SyntaxKind.AwaitKeyword:
            //     return parseVariableStatement(pos, hasJSDoc, modifiersIn);
            // case SyntaxKind.FunctionKeyword:
            //     return parseFunctionDeclaration(pos, hasJSDoc, modifiersIn);
            // case SyntaxKind.ClassKeyword:
            //     return parseClassDeclaration(pos, hasJSDoc, modifiersIn);
            // case SyntaxKind.InterfaceKeyword:
            //     return parseInterfaceDeclaration(pos, hasJSDoc, modifiersIn);                                    
            // case SyntaxKind.ImportKeyword:
            //     return parseImportDeclarationOrImportEqualsDeclaration(pos, hasJSDoc, modifiersIn);
            // case SyntaxKind.ExportKeyword:
            //     nextToken();
            //     switch (token()) {
            //         case SyntaxKind.DefaultKeyword:
            //         case SyntaxKind.EqualsToken:
            //             return parseExportAssignment(pos, hasJSDoc, modifiersIn);
            //         case SyntaxKind.AsKeyword:
            //             return parseNamespaceExportDeclaration(pos, hasJSDoc, modifiersIn);
            //         default:
            //             return parseExportDeclaration(pos, hasJSDoc, modifiersIn);
            //     }
            default:
                if (modifiersIn || typeIn) {
                    // We reached this point because we encountered decorators and/or modifiers and assumed a declaration
                    // would follow. For recovery and error reporting purposes, return an incomplete declaration.
                    const missing = createMissingNode<MissingDeclaration>(SyntaxKind.MissingDeclaration, /*reportAtCurrentPosition*/ true, Diagnostics.Declaration_expected);
                    setTextRangePos(missing, pos.pos);
                    (missing as Mutable<MissingDeclaration>).modifiers = modifiersIn;
                    (missing as Mutable<MissingDeclaration>).type = typeIn;
                    return missing;
                }

                // this shouldn't happen -- something went wrong w/ parse modifier or type
                nextToken();
                return createMissingNode(SyntaxKind.MissingDeclaration, /*reportAtCurrentPosition*/ true, Diagnostics.Declaration_expected);
                // return undefined!; // TODO: GH#18217
        }
    }    

    function parseStructDeclaration(pos: PositionState, hasJSDoc: boolean, modifiers: NodeArray<ModifierLike> | undefined): StructDeclaration {        
        if (token() == SyntaxKind.StructKeyword) 
            parseExpected(SyntaxKind.StructKeyword);        
        else 
            parseExpected(SyntaxKind.ClassKeyword);

        const name = parseIdentifier();
        
        // struct inheritance:
        //     struct Foo (Bar) { ... }
        let heritageName: Identifier | undefined = undefined;
        if (parseOptional(SyntaxKind.OpenParenToken)) {
            heritageName = parseIdentifier();
            parseExpected(SyntaxKind.CloseParenToken);
        }

        // the struct members are parsed as a type
        const type = parseType();        
                    
        parseSemicolon();

        const node = factory.createStructDeclarationNode(modifiers, name, heritageName, type)
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function isTypeMemberStart(): boolean {
        // Return true if we have the start of a union member
        if (
            // token() === SyntaxKind.OpenParenToken ||
            token() === SyntaxKind.LessThanToken            
        ) {
            return true;
        }
        let idToken = false;
        // Eat up all modifiers, but hold on to the last one in case it is actually an identifier
        while (isModifierKind(token())) {
            idToken = true;
            nextToken();
        }
        // Index signatures and computed property names are type members
        if (token() === SyntaxKind.OpenBracketToken) {
            return true;
        }
        if (isTypeName()) {
            return true;
        }
        // Try to get the first property-like token following all modifiers
        if (isLiteralPropertyName()) {
            idToken = true;
            nextToken();
        }
        // If we were able to get any potential identifier, check that it is
        // the start of a member declaration
        if (idToken) {
            return token() == SyntaxKind.SemicolonToken;
        }
        return false;
    }

    function parseTypeMember(): TypeElement {        
        const pos = getPositionState();
        const hasJSDoc = hasPrecedingJSDocComment();
        const modifiers = parseModifiers(/*allowDecorators*/ false);
        // if (isIndexSignature()) {
        //     return parseIndexSignatureDeclaration(pos, hasJSDoc, modifiers);
        // }
        return parsePropertyOrMethodSignature(pos, hasJSDoc, modifiers);
    }

    function parsePropertyOrMethodSignature(pos: PositionState, hasJSDoc: boolean, modifiers: NodeArray<Modifier> | undefined): PropertySignature | MethodSignature {
        const type = parseType();
        const name = parsePropertyName();        
        let node: PropertySignature | MethodSignature;
                
        node = factory.createPropertySignature(modifiers, name, type);
        // Although type literal properties cannot not have initializers, we attempt
        // to parse an initializer so we can report in the checker that an interface
        // property or type literal property cannot have an initializer.
        if (token() === SyntaxKind.EqualsToken) (node as Mutable<PropertySignature>).initializer = parseInitializer();
        
        parseTypeMemberSemicolon();
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parseTypeMemberSemicolon() {
        // We allow type members to be separated by commas or (possibly ASI) semicolons.
        // First check if it was a comma.  If so, we're done with the member.
        if (parseOptional(SyntaxKind.CommaToken)) {
            return;
        }

        // Didn't have a comma.  We must have a (possible ASI) semicolon.
        parseSemicolon();
    }

    function parsePropertyName(): PropertyName {
        return parsePropertyNameWorker(/*allowComputedPropertyNames*/ true);
    }

    function parsePropertyNameWorker(allowComputedPropertyNames: boolean): PropertyName {
        if (token() === SyntaxKind.StringLiteral || token() === SyntaxKind.NumericLiteral) {
            const node = parseLiteralNode() as StringLiteral;// | NumericLiteral;
            node.text = internIdentifier(node.text);
            return node;
        }
        // if (allowComputedPropertyNames && token() === SyntaxKind.OpenBracketToken) {
        //     return parseComputedPropertyName();
        // }
        // if (token() === SyntaxKind.PrivateIdentifier) {
        //     return parsePrivateIdentifier();
        // }
        return parseIdentifierName();
    }

    function parseFunctionDeclaration(pos: PositionState, hasJSDoc: boolean, modifiers: NodeArray<ModifierLike> | undefined, type: TypeNode | undefined): FunctionDeclaration {                
        const name = parseBindingIdentifier();        
        const parameters = parseParameters();
        const body = parseFunctionBlockOrSemicolon(SignatureFlags.None);

        const node = factory.createFunctionDeclaration(modifiers, name, parameters, type, body);
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parseFunctionBlockOrSemicolon(flags: SignatureFlags, diagnosticMessage?: DiagnosticMessage): Block | undefined {
        if (token() !== SyntaxKind.OpenBraceToken) {            
            if (canParseSemicolon()) {
                parseSemicolon();
                return;
            }
        }
        return parseFunctionBlock(flags, diagnosticMessage);
    }

    function parseFunctionBlock(flags: SignatureFlags, diagnosticMessage?: DiagnosticMessage): Block {
        const savedTopLevel = topLevel;
        topLevel = false;

        const block = parseBlock(!!(flags & SignatureFlags.IgnoreMissingOpenBrace), diagnosticMessage);

        topLevel = savedTopLevel;
        
        return block;
    }

    function parseVariableStatement(pos: PositionState, hasJSDoc: boolean, modifiers: NodeArray<ModifierLike> | undefined, type: TypeNode | undefined): VariableStatement {
        const declarationList = parseVariableDeclarationList(/*inForStatementInitializer*/ false, type);
        parseSemicolon();
        const node = factoryCreateVariableStatement(modifiers, type, declarationList);
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parseParameters(): NodeArray<ParameterDeclaration> {        
        if (!parseExpected(SyntaxKind.OpenParenToken)) {
            return createMissingList<ParameterDeclaration>();
        }

        const parameters = parseParametersWorker(SignatureFlags.None, /*allowAmbiguity*/ true);
        parseExpected(SyntaxKind.CloseParenToken);
        return parameters;
    }

    function parseParametersWorker(flags: SignatureFlags, allowAmbiguity: true): NodeArray<ParameterDeclaration>;
    function parseParametersWorker(flags: SignatureFlags, allowAmbiguity: false): NodeArray<ParameterDeclaration> | undefined;
    function parseParametersWorker(flags: SignatureFlags, allowAmbiguity: boolean): NodeArray<ParameterDeclaration> | undefined {
        const parameters = flags & SignatureFlags.JSDoc ?
            parseDelimitedList(ParsingContext.JSDocParameters, parseJSDocParameter) :
            parseDelimitedList(ParsingContext.Parameters, () => allowAmbiguity ? parseParameter() : parseParameterForSpeculation());

        return parameters;
    }

    function parseParameter(): ParameterDeclaration {
        return parseParameterWorker();
    }

    function parseParameterForSpeculation(): ParameterDeclaration | undefined {
        return parseParameterWorker(/*allowAmbiguity*/ false);
    }

    function parseParameterWorker(): ParameterDeclaration;
    function parseParameterWorker(allowAmbiguity: false): ParameterDeclaration | undefined;
    function parseParameterWorker(allowAmbiguity = true): ParameterDeclaration | undefined {
        const pos = getPositionState();
        const hasJSDoc = hasPrecedingJSDocComment();

        const modifiers = parseModifiers(/*allowDecorators*/ false, /*permitConstAsModifier*/ false, /*stopOnStartOfClassStaticBlock*/ false);

        // FormalParameter [Yield,Await]:
        //      BindingElement[?Yield,?Await]

        const savedTopLevel = topLevel;
        topLevel = false;
        
        if (!allowAmbiguity && !isParameterNameStart()) {
            return undefined;
        }

        const paramType = parseType();
        const ampToken = parseOptionalToken(SyntaxKind.AmpersandToken) ;
        const name = parseNameOfParameter(modifiers);
        const dotDotDotToken = parseOptionalToken(SyntaxKind.DotDotDotToken);                
        // LD uses '=' for default values, Fluff uses ':'
        const init = parseInitializer(token() === SyntaxKind.EqualsToken ? SyntaxKind.EqualsToken : SyntaxKind.ColonToken);

        const node = withJSDoc(
            finishNode(
                factory.createParameterDeclaration(
                    modifiers,
                    dotDotDotToken,
                    name,
                    ampToken,
                    paramType,
                    init,
                ),
                pos,
            ),
            hasJSDoc,
        );
        topLevel = savedTopLevel;
        return node;
    }

    function parseNameOfParameter(modifiers: NodeArray<ModifierLike> | undefined) {
        // FormalParameter [Yield,Await]:
        //      BindingElement[?Yield,?Await]
        const name = parseIdentifierOrPattern();
        if (getFullWidth(name) === 0 && !some(modifiers) && isModifierKind(token())) {
            // in cases like
            // 'use strict'
            // function foo(static)
            // isParameter('static') === true, because of isModifier('static')
            // however 'static' is not a legal identifier in a strict mode.
            // so result of this function will be ParameterDeclaration (flags = 0, name = missing, type = undefined, initializer = undefined)
            // and current token will not change => parsing of the enclosing parameter list will last till the end of time (or OOM)
            // to avoid this we'll advance cursor to the next token.
            nextToken();
        }
        return name;
    }


    function isParameterNameStart() {
        // Be permissive about await and yield by calling isBindingIdentifier instead of isIdentifier; disallowing
        // them during a speculative parse leads to many more follow-on errors than allowing the function to parse then later
        // complaining about the use of the keywords.
        return isBindingIdentifier() || token() === SyntaxKind.OpenBracketToken || token() === SyntaxKind.OpenBraceToken;
    }

    function parseJSDocParameter(): ParameterDeclaration {
        const pos = getPositionState();
        let name: Identifier | undefined;
        // if (token() === SyntaxKind.ThisKeyword || token() === SyntaxKind.NewKeyword) {
        //     name = parseIdentifierName();
        //     parseExpected(SyntaxKind.ColonToken);
        // }
        return finishNode(
            factory.createParameterDeclaration(
                /*modifiers*/ undefined,
                /*dotDotDotToken*/ undefined,
                // TODO(rbuckton): JSDoc parameters don't have names (except `this`/`new`), should we manufacture an empty identifier?
                name!,
                /*ampToken*/ undefined,
                parseJSDocType(), 
                /*initializer*/ undefined,
            ),
            pos,
        );
    }

    function parseVariableDeclarationList(inForStatementInitializer: boolean, type: TypeNode | undefined, parsingContext: ParsingContext = 0): VariableDeclarationList {
        const pos = getPositionState();

        let flags: NodeFlags = 0;
                
        // The user may have written the following:
        //
        //    for (let of X) { }
        //
        // In this case, we want to parse an empty declaration list, and then parse 'of'
        // as a keyword. The reason this is not automatic is that 'of' is a valid identifier.
        // So we need to look ahead to determine if 'of' should be treated as a keyword in
        // this context.
        // The checker will then give an error that there is an empty declaration list.
        let declarations: readonly VariableDeclaration[];
        // if (token() === SyntaxKind.OfKeyword && lookAhead(canFollowContextualOfKeyword)) {
        //     declarations = createMissingList<VariableDeclaration>();
        // }
        // else {
            const savedDisallowIn = inDisallowInContext();
            setDisallowInContext(inForStatementInitializer);

            declarations = parseDelimitedList(
                parsingContext || ParsingContext.VariableDeclarations,
                () => parseVariableDeclaration(type),
            );

            setDisallowInContext(savedDisallowIn);
        // }

        return finishNode(factoryCreateVariableDeclarationList(declarations, flags), pos);
    }
    
    function isInOrOfKeyword(t: SyntaxKind) {
        return t === SyntaxKind.InKeyword || t === SyntaxKind.ColonToken;
    }
    
    function parseVariableDeclaration(type: TypeNode | undefined): VariableDeclaration {
        const pos = getPositionState();
        const hasJSDoc = hasPrecedingJSDocComment();      

        // type shouldn't be here, but needs to be for foreach() statement.
        // we'll parse it out and report an error in the checker    
        // this will also grab array indicators inside a decl list, i.e.
        //    string *foo, *bar, *baz;
        let tempType = parseType();
                
        // check tempType for the array indicator
        if (tempType && isArrayTypeNode(tempType) && !tempType.elementType && type) {
            // we can't use the original type node, as it's in the wrong place in our hierarchy.
            // so we'll clone it and reset the position to match this array indicator
            const elementType = finishNode(factory.cloneNode(type), pos);
            (tempType as Mutable<ArrayTypeNode>).elementType = elementType;
        }         

        const name = parseIdentifierOrPattern();                
        const initializer = isInOrOfKeyword(token()) ? undefined : parseInitializer();
        const node = factoryCreateVariableDeclaration(name, tempType, initializer);
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parseInitializer(initToken: SyntaxKind.EqualsToken | SyntaxKind.ColonToken = SyntaxKind.EqualsToken): Expression | undefined {
        return parseOptional(initToken) ? parseAssignmentExpressionOrHigher(/*allowReturnTypeInArrowFunction*/ true) : undefined;
    }

    function parseIdentifierOrPattern(): Identifier | BindingPattern {
        // if (token() === SyntaxKind.OpenBracketToken) {
        //     return parseArrayBindingPattern();
        // }
        // if (token() === SyntaxKind.OpenBraceToken) {
        //     return parseObjectBindingPattern();
        // }
        return parseBindingIdentifier();
    }

    function parseBindingIdentifier() {
        return createIdentifier(isBindingIdentifier(), /*diagnosticMessage*/ undefined);
    }

    function isBindingIdentifier(): boolean {
        if (token() === SyntaxKind.Identifier) {
            return true;
        }

        // `let await`/`let yield` in [Yield] or [Await] are allowed here and disallowed in the binder.
        return token() > SyntaxKind.LastReservedWord;
    }

    // An identifier that starts with two underscores has an extra underscore character prepended to it to avoid issues
    // with magic property names like '__proto__'. The 'identifiers' object is used to share a single string instance for
    // each identifier in order to reduce memory consumption.
    function createIdentifier(isTokenIdentifier: boolean, diagnosticMessage?: DiagnosticMessage, privateIdentifierDiagnosticMessage?: DiagnosticMessage): Identifier {
        if (isTokenIdentifier) {
            identifierCount++;
            const pos = getPositionState();
            pos.pos = scanner.hasLeadingAsterisks() ? scanner.getTokenStart() : getNodePos();
            // Store original token kind if it is not just an Identifier so we can report appropriate error later in type checker
            const originalKeywordKind = token();
            const text = internIdentifier(scanner.getTokenValue());            
            const hasExtendedUnicodeEscape = scanner.hasExtendedUnicodeEscape();
            nextTokenWithoutCheck();
            return finishNode(factoryCreateIdentifier(text, originalKeywordKind, hasExtendedUnicodeEscape), pos);
        }
        
        if (token() === SyntaxKind.Unknown && scanner.tryScan(() => scanner.reScanInvalidIdentifier() === SyntaxKind.Identifier)) {
            // Scanner has already recorded an 'Invalid character' error, so no need to add another from the parser.
            return createIdentifier(/*isIdentifier*/ true);
        }

        identifierCount++;
        // Only for end of file because the error gets reported incorrectly on embedded script tags.
        const reportAtCurrentPosition = token() === SyntaxKind.EndOfFileToken;

        const isReservedWord = scanner.isReservedWord();
        const msgArg = scanner.getTokenText();

        const defaultMessage = isReservedWord ?
            Diagnostics.Identifier_expected_0_is_a_reserved_word_that_cannot_be_used_here :
            Diagnostics.Identifier_expected;

        return createMissingNode<Identifier>(SyntaxKind.Identifier, reportAtCurrentPosition, diagnosticMessage || defaultMessage, msgArg);
    }

    function getExpectedCommaDiagnostic(kind: ParsingContext) {
        return undefined;// kind === ParsingContext.EnumMembers ? Diagnostics.An_enum_member_name_must_be_followed_by_a_or : undefined;
    }

    // Parses a comma-delimited list of elements
    function parseDelimitedList<T extends Node>(kind: ParsingContext, parseElement: () => T, considerSemicolonAsDelimiter?: boolean): NodeArray<T>;
    function parseDelimitedList<T extends Node | undefined>(kind: ParsingContext, parseElement: () => T, considerSemicolonAsDelimiter?: boolean): NodeArray<NonNullable<T>> | undefined;
    function parseDelimitedList<T extends Node | undefined>(kind: ParsingContext, parseElement: () => T, considerSemicolonAsDelimiter?: boolean): NodeArray<NonNullable<T>> | undefined {
        const saveParsingContext = parsingContext;
        parsingContext |= 1 << kind;
        const list: NonNullable<T>[] = [];
        const listPos = getPositionState();

        let commaStart = -1; // Meaning the previous token was not a comma
        while (true) {
            if (isListElement(kind, /*inErrorRecovery*/ false)) {
                const startPos = scanner.getTokenFullStart();
                const result = parseListElement(kind, parseElement);
                if (!result) {
                    parsingContext = saveParsingContext;
                    return undefined;
                }
                list.push(result);
                commaStart = scanner.getTokenStart();

                if (parseOptional(SyntaxKind.CommaToken)) {
                    // No need to check for a zero length node since we know we parsed a comma
                    continue;
                }

                commaStart = -1; // Back to the state where the last token was not a comma
                if (isListTerminator(kind)) {
                    break;
                }

                // We didn't get a comma, and the list wasn't terminated, explicitly parse
                // out a comma so we give a good error message.
                parseExpected(SyntaxKind.CommaToken, getExpectedCommaDiagnostic(kind));

                // If the token was a semicolon, and the caller allows that, then skip it and
                // continue.  This ensures we get back on track and don't result in tons of
                // parse errors.  For example, this can happen when people do things like use
                // a semicolon to delimit object literal members.   Note: we'll have already
                // reported an error when we called parseExpected above.
                if (considerSemicolonAsDelimiter && token() === SyntaxKind.SemicolonToken && !scanner.hasPrecedingLineBreak()) {
                    nextToken();
                }
                if (startPos === scanner.getTokenFullStart()) {
                    // What we're parsing isn't actually remotely recognizable as a element and we've consumed no tokens whatsoever
                    // Consume a token to advance the parser in some way and avoid an infinite loop
                    // This can happen when we're speculatively parsing parenthesized expressions which we think may be arrow functions,
                    // or when a modifier keyword which is disallowed as a parameter name (ie, `static` in strict mode) is supplied
                    nextToken();
                }
                continue;
            }

            if (isListTerminator(kind)) {
                break;
            }

            if (abortParsingListOrMoveToNextToken(kind)) {
                break;
            }
        }

        parsingContext = saveParsingContext;
        // Recording the trailing comma is deliberately done after the previous
        // loop, and not just if we see a list terminator. This is because the list
        // may have ended incorrectly, but it is still important to know if there
        // was a trailing comma.
        // Check if the last token was a comma.
        // Always preserve a trailing comma by marking it on the NodeArray
        return createNodeArray(list, listPos, /*end*/ undefined, commaStart >= 0);
    }

    /**
     * Parses a list of elements delimited by the specified punctuation. Unlike `parseDelimitedList`, this function
     * Can use any punctuation as a delimiter, not just a comma.
     * @param kind 
     * @param parseElement 
     * @param delimiter 
     */
    function parseTokenDelimitedList<T extends Node>(kind: ParsingContext, parseElement: () => T, delimiter: PunctuationSyntaxKind): NodeArray<T>;
    function parseTokenDelimitedList<T extends Node | undefined>(kind: ParsingContext, parseElement: () => T, delimiter: PunctuationSyntaxKind): NodeArray<NonNullable<T>> | undefined;
    function parseTokenDelimitedList<T extends Node | undefined>(kind: ParsingContext, parseElement: () => T, delimiter: PunctuationSyntaxKind): NodeArray<NonNullable<T>> | undefined {
        const saveParsingContext = parsingContext;
        parsingContext |= 1 << kind;
        const list: NonNullable<T>[] = [];
        const listPos = getPositionState();

        let delimStart = -1; // Meaning the previous token was not a comma
        while (true) {
            if (isListElement(kind, /*inErrorRecovery*/ false)) {
                const startPos = scanner.getTokenFullStart();
                const result = parseListElement(kind, parseElement);
                if (!result) {
                    parsingContext = saveParsingContext;
                    return undefined;
                }
                list.push(result);
                delimStart = scanner.getTokenStart();

                if (parseOptional(delimiter)) {
                    // No need to check for a zero length node since we know we parsed a comma
                    continue;
                }

                delimStart = -1; // Back to the state where the last token was not a comma
                if (isListTerminator(kind)) {
                    break;
                }

                // We didn't get a comma, and the list wasn't terminated, explicitly parse
                // out a comma so we give a good error message.
                parseExpected(delimiter);
                
                if (startPos === scanner.getTokenFullStart()) {
                    // What we're parsing isn't actually remotely recognizable as a element and we've consumed no tokens whatsoever
                    // Consume a token to advance the parser in some way and avoid an infinite loop
                    // This can happen when we're speculatively parsing parenthesized expressions which we think may be arrow functions,
                    // or when a modifier keyword which is disallowed as a parameter name (ie, `static` in strict mode) is supplied
                    nextToken();
                }
                continue;
            }

            if (isListTerminator(kind)) {
                break;
            }

            if (abortParsingListOrMoveToNextToken(kind)) {
                break;
            }
        }

        parsingContext = saveParsingContext;
        // Recording the trailing comma is deliberately done after the previous
        // loop, and not just if we see a list terminator. This is because the list
        // may have ended incorrectly, but it is still important to know if there
        // was a trailing comma.
        // Check if the last token was a comma.
        // Always preserve a trailing comma by marking it on the NodeArray
        return createNodeArray(list, listPos, /*end*/ undefined, delimStart >= 0);
    }
    
    function parseExpression(): Expression {
        // Expression[in]:
        //      AssignmentExpression[in]
        //      Expression[in] , AssignmentExpression[in]

        // clear the decorator context when parsing Expression, as it should be unambiguous when parsing a decorator
        
        const pos = getPositionState();
        let expr = parseAssignmentExpressionOrHigher(/*allowReturnTypeInArrowFunction*/ true);
        let operatorToken: BinaryOperatorToken;
        while ((operatorToken = parseOptionalToken(SyntaxKind.CommaToken))) {
            expr = makeBinaryExpression(expr, operatorToken, parseAssignmentExpressionOrHigher(/*allowReturnTypeInArrowFunction*/ true), pos);
        }
       
        return expr;
    }

    // STATEMENTS
    function parseBlock(ignoreMissingOpenBrace: boolean, diagnosticMessage?: DiagnosticMessage): Block {

        const pos = getPositionState();
        const hasJSDoc = hasPrecedingJSDocComment();
        const openBracePosition = scanner.getTokenStart();
        const openBraceFilename = scanner.getFileName();
        const openBraceParsed = (!ignoreMissingOpenBrace && parseExpected(SyntaxKind.OpenBraceToken, diagnosticMessage) || parseOptional(SyntaxKind.OpenBraceToken));
        if (openBraceParsed || ignoreMissingOpenBrace) {
            const multiLine = scanner.hasPrecedingLineBreak();
            const statements = parseList(ParsingContext.BlockStatements, parseStatement);
            if (openBraceParsed) parseExpectedMatchingBrackets(SyntaxKind.OpenBraceToken, SyntaxKind.CloseBraceToken, openBraceParsed, openBracePosition, openBraceFilename);
            const result = withJSDoc(finishNode(factoryCreateBlock(statements, multiLine), pos), hasJSDoc);
            if (token() === SyntaxKind.EqualsToken) {
                parseErrorAtCurrentToken(Diagnostics.Declaration_or_statement_expected_This_follows_a_block_of_statements_so_if_you_intended_to_write_a_destructuring_assignment_you_might_need_to_wrap_the_whole_assignment_in_parentheses);
                nextToken();
            }

            return result;
        }
        else {
            const statements = createMissingList<Statement>();
            return withJSDoc(finishNode(factoryCreateBlock(statements, /*multiLine*/ undefined), pos), hasJSDoc);
        }
    }

    function isBinaryOperator() {
        if (inDisallowInContext() && token() === SyntaxKind.InKeyword) {
            return false;
        }

        return getBinaryOperatorPrecedence(token()) > 0;
    }

    function parseAssignmentExpressionOrHigher(allowReturnTypeInArrowFunction: boolean): Expression {
        //  AssignmentExpression[in,yield]:
        //      1) ConditionalExpression[?in,?yield]
        //      2) LeftHandSideExpression = AssignmentExpression[?in,?yield]
        //      3) LeftHandSideExpression AssignmentOperator AssignmentExpression[?in,?yield]
        //      4) ArrowFunctionExpression[?in,?yield]
        //      5) AsyncArrowFunctionExpression[in,yield,await]
        //      6) [+Yield] YieldExpression[?In]
        //
        // Note: for ease of implementation we treat productions '2' and '3' as the same thing.
        // (i.e. they're both BinaryExpressions with an assignment operator in it).        

        // // Then, check if we have an arrow function (production '4' and '5') that starts with a parenthesized
        // // parameter list or is an async arrow function.
        // // AsyncArrowFunctionExpression:
        // //      1) async[no LineTerminator here]AsyncArrowBindingIdentifier[?Yield][no LineTerminator here]=>AsyncConciseBody[?In]
        // //      2) CoverCallExpressionAndAsyncArrowHead[?Yield, ?Await][no LineTerminator here]=>AsyncConciseBody[?In]
        // // Production (1) of AsyncArrowFunctionExpression is parsed in "tryParseAsyncSimpleArrowFunctionExpression".
        // // And production (2) is parsed in "tryParseParenthesizedArrowFunctionExpression".
        // //
        // // If we do successfully parse arrow-function, we must *not* recurse for productions 1, 2 or 3. An ArrowFunction is
        // // not a LeftHandSideExpression, nor does it start a ConditionalExpression.  So we are done
        // // with AssignmentExpression if we see one.
        // const arrowExpression = tryParseParenthesizedArrowFunctionExpression(allowReturnTypeInArrowFunction) || tryParseAsyncSimpleArrowFunctionExpression(allowReturnTypeInArrowFunction);
        // if (arrowExpression) {
        //     return arrowExpression;
        // }

        // Now try to see if we're in production '1', '2' or '3'.  A conditional expression can
        // start with a LogicalOrExpression, while the assignment productions can only start with
        // LeftHandSideExpressions.
        //
        // So, first, we try to just parse out a BinaryExpression.  If we get something that is a
        // LeftHandSide or higher, then we can try to parse out the assignment expression part.
        // Otherwise, we try to parse out the conditional expression bit.  We want to allow any
        // binary expression here, so we pass in the 'lowest' precedence here so that it matches
        // and consumes anything.
        const pos = getPositionState();
        const hasJSDoc = hasPrecedingJSDocComment();
        const expr = parseBinaryExpressionOrHigher(OperatorPrecedence.Lowest);

        // To avoid a look-ahead, we did not handle the case of an arrow function with a single un-parenthesized
        // parameter ('x => ...') above. We handle it here by checking if the parsed expression was a single
        // identifier and the current token is an arrow.
        // if (expr.kind === SyntaxKind.Identifier && token() === SyntaxKind.EqualsGreaterThanToken) {
        //     return parseSimpleArrowFunctionExpression(pos, expr as Identifier, allowReturnTypeInArrowFunction, hasJSDoc, /*asyncModifier*/ undefined);
        // }

        // Now see if we might be in cases '2' or '3'.
        // If the expression was a LHS expression, and we have an assignment operator, then
        // we're in '2' or '3'. Consume the assignment and return.
        //
        // Note: we call reScanGreaterToken so that we get an appropriately merged token
        // for cases like `> > =` becoming `>>=`
        if (isLeftHandSideExpression(expr) && isAssignmentOperator(reScanGreaterToken())) {
            return makeBinaryExpression(expr, parseTokenNode(), parseAssignmentExpressionOrHigher(allowReturnTypeInArrowFunction), pos);
        }

        // It wasn't an assignment or a lambda.  This is a conditional expression:
        return parseConditionalExpressionRest(expr, pos, allowReturnTypeInArrowFunction);
    }

    function makeBinaryExpression(left: Expression, operatorToken: BinaryOperatorToken, right: Expression, pos: PositionState): BinaryExpression {
        return finishNode(factory.createBinaryExpression(left, operatorToken, right), pos);
    }

    function parseBinaryExpressionOrHigher(precedence: OperatorPrecedence): Expression {
        const pos = getPositionState();
        const leftOperand = parseUnaryExpressionOrHigher();
        return parseBinaryExpressionRest(precedence, leftOperand, pos);
    }

    function parseConditionalExpressionRest(leftOperand: Expression, pos: PositionState, allowReturnTypeInArrowFunction: boolean): Expression {
        // Note: we are passed in an expression which was produced from parseBinaryExpressionOrHigher.
        const questionToken = parseOptionalToken(SyntaxKind.QuestionToken);
        if (!questionToken) {
            return leftOperand;
        }

        // Note: we explicitly 'allowIn' in the whenTrue part of the condition expression, and
        // we do not that for the 'whenFalse' part.
        let colonToken;
        return finishNode(
            factory.createConditionalExpression(
                leftOperand,
                questionToken,
                doOutsideOfContext(disallowInAndDecoratorContext, () => parseAssignmentExpressionOrHigher(/*allowReturnTypeInArrowFunction*/ false)),
                colonToken = parseExpectedToken(SyntaxKind.ColonToken),
                nodeIsPresent(colonToken)
                    ? parseAssignmentExpressionOrHigher(allowReturnTypeInArrowFunction)
                    : createMissingNode(SyntaxKind.Identifier, /*reportAtCurrentPosition*/ false, Diagnostics._0_expected, tokenToString(SyntaxKind.ColonToken)),
            ),
            pos,
        );
    }

    function parseBinaryExpressionRest(precedence: OperatorPrecedence, leftOperand: Expression, pos: PositionState): Expression {
        while (true) {
            // We either have a binary operator here, or we're finished.  We call
            // reScanGreaterToken so that we merge token sequences like > and = into >=

            reScanGreaterToken(); 
            const impliedStringConcat = (isStringLiteral(leftOperand) || isBinaryExpression(leftOperand)) && token() == SyntaxKind.StringLiteral;           
            const newPrecedence = getBinaryOperatorPrecedence(impliedStringConcat ? SyntaxKind.PlusToken : token());

            // Check the precedence to see if we should "take" this operator
            // - For left associative operator (all operator but **), consume the operator,
            //   recursively call the function below, and parse binaryExpression as a rightOperand
            //   of the caller if the new precedence of the operator is greater then or equal to the current precedence.
            //   For example:
            //      a - b - c;
            //            ^token; leftOperand = b. Return b to the caller as a rightOperand
            //      a * b - c
            //            ^token; leftOperand = b. Return b to the caller as a rightOperand
            //      a - b * c;
            //            ^token; leftOperand = b. Return b * c to the caller as a rightOperand
            // - For right associative operator (**), consume the operator, recursively call the function
            //   and parse binaryExpression as a rightOperand of the caller if the new precedence of
            //   the operator is strictly grater than the current precedence
            //   For example:
            //      a ** b ** c;
            //             ^^token; leftOperand = b. Return b ** c to the caller as a rightOperand
            //      a - b ** c;
            //            ^^token; leftOperand = b. Return b ** c to the caller as a rightOperand
            //      a ** b - c
            //             ^token; leftOperand = b. Return b to the caller as a rightOperand
            const consumeCurrentOperator = token() === SyntaxKind.AsteriskAsteriskToken ?
                newPrecedence >= precedence :
                newPrecedence > precedence;

            if (!consumeCurrentOperator) {
                break;
            }

            if (token() === SyntaxKind.InKeyword && inDisallowInContext()) {
                break;
            }
            
            const tokenNode = impliedStringConcat ? finishNode(factoryCreateToken(SyntaxKind.PlusToken), getPositionState()) : parseTokenNode<BinaryOperatorToken>();
            leftOperand = makeBinaryExpression(leftOperand, tokenNode, parseBinaryExpressionOrHigher(newPrecedence), pos);
        }

        return leftOperand;
    }

    /**
     * Parse ES7 exponential expression and await expression
     *
     * ES7 ExponentiationExpression:
     *      1) UnaryExpression[?Yield]
     *      2) UpdateExpression[?Yield] ** ExponentiationExpression[?Yield]
     */
    function parseUnaryExpressionOrHigher(): UnaryExpression | BinaryExpression {
        /**
         * ES7 UpdateExpression:
         *      1) LeftHandSideExpression[?Yield]
         *      2) LeftHandSideExpression[?Yield][no LineTerminator here]++
         *      3) LeftHandSideExpression[?Yield][no LineTerminator here]--
         *      4) ++UnaryExpression[?Yield]
         *      5) --UnaryExpression[?Yield]
         */
        if (isUpdateExpression()) {
            const pos = getPositionState();;
            const updateExpression = parseUpdateExpression();
            return token() === SyntaxKind.AsteriskAsteriskToken || token() === SyntaxKind.EqualsToken ?
                parseBinaryExpressionRest(getBinaryOperatorPrecedence(token()), updateExpression, pos) as BinaryExpression :
                // token() === SyntaxKind.EqualsToken ? parseAssignmentExpressionOrHigher(/*allowReturnTypeInArrowFunction*/ true) :
                updateExpression;
        }

        /**
         * ES7 UnaryExpression:
         *      1) UpdateExpression[?yield]
         *      2) delete UpdateExpression[?yield]
         *      3) void UpdateExpression[?yield]
         *      4) typeof UpdateExpression[?yield]
         *      5) + UpdateExpression[?yield]
         *      6) - UpdateExpression[?yield]
         *      7) ~ UpdateExpression[?yield]
         *      8) ! UpdateExpression[?yield]
         *      9) (cast) UpdateExpression[?yield]
         */
        const unaryOperator = token();
        const simpleUnaryExpression = parseSimpleUnaryExpression();
        if (token() === SyntaxKind.AsteriskAsteriskToken) {
            const pos = skipTrivia(sourceText, simpleUnaryExpression.pos);
            const { end, originFilename } = simpleUnaryExpression;
            
            Debug.assert(isKeywordOrPunctuation(unaryOperator));
            parseErrorAt(pos, end, originFilename, Diagnostics.An_unary_expression_with_the_0_operator_is_not_allowed_in_the_left_hand_side_of_an_exponentiation_expression_Consider_enclosing_the_expression_in_parentheses, tokenToString(unaryOperator));            
        }
        return simpleUnaryExpression;
    }    

    /**
     * Parse ES7 simple-unary expression or higher:
     *
     * ES7 UnaryExpression:
     *      1) UpdateExpression[?yield]
     *      2) delete UnaryExpression[?yield]
     *      3) void UnaryExpression[?yield]
     *      4) typeof UnaryExpression[?yield]
     *      5) + UnaryExpression[?yield]
     *      6) - UnaryExpression[?yield]
     *      7) ~ UnaryExpression[?yield]
     *      8) ! UnaryExpression[?yield]
     *      9) [+Await] await UnaryExpression[?yield]
     */
    function parseSimpleUnaryExpression(): UnaryExpression {
        switch (token()) {
            case SyntaxKind.LessThanToken:
            case SyntaxKind.PlusToken:
            case SyntaxKind.MinusToken:
            case SyntaxKind.TildeToken:
            case SyntaxKind.ExclamationToken:
                return parsePrefixUnaryExpression();   
            // case SyntaxKind.VoidKeyword:
            //     return parseVoidExpression();                                 
            case SyntaxKind.OpenParenToken:
            case SyntaxKind.OpenParenBraceToken:
                // make sure this isn't an array literal
                if (lookAhead(()=>{ 
                    nextToken(); 
                    return isTypeName();// && (nextToken() == SyntaxKind.CloseParenToken || token() == SyntaxKind.CloseBraceToken); 
                })) {
                    return parseTypeAssertion();
                }
                // fall through
            default:
                return parseUpdateExpression();
        }
    }

    function parseNewStructExpression(): NewStructExpression {
        const pos = getPositionState();
        parseExpected(SyntaxKind.OpenParenToken);
        parseExpected(SyntaxKind.LessThanToken);
        
        const type = parseStructTypeNode(SyntaxKind.StructKeyword, false);
        Debug.assert(type.kind === SyntaxKind.StructType, "Expected a struct type node");
        
        parseExpected(SyntaxKind.GreaterThanToken);        

        // structs can be empty, have arguments separated by commas, or have named arguments (but not a combo of both)
        //   (<foo>)
        //   (<foo> 1, 2, 3)
        //   (<foo> bar: 1, baz: 2)
        const hasNamedArgs = lookAhead(() => token() === SyntaxKind.Identifier && nextToken() === SyntaxKind.ColonToken);
        let args: NodeArray<Expression|ObjectLiteralElementLike>;
        if (hasNamedArgs) {
            args = parseDelimitedList(ParsingContext.ArgumentExpressions, parseNamedArgumentExpression);
        } else {
            args = parseDelimitedList(ParsingContext.ArgumentExpressions, parseArgumentExpression);
        }
        
        parseExpected(SyntaxKind.CloseParenToken);

        return finishNode(factory.createNewStructExpression(type, args), pos);
    }

    function parseTypeAssertion(): TypeAssertion {
        const pos = getPositionState();
        const hasBrace = parseOptional(SyntaxKind.OpenParenBraceToken);
        if (!hasBrace) parseExpected(SyntaxKind.OpenParenToken);
        
        const isStruct = parseOptional(SyntaxKind.LessThanToken);

        const type = parseType();
                
        if (isStruct) {            
            parseExpected(SyntaxKind.GreaterThanToken);
        }
        if (hasBrace) {
            parseExpected(SyntaxKind.CloseBraceToken);
        }        
        parseExpected(SyntaxKind.CloseParenToken);

        const expression = parseSimpleUnaryExpression();

        return finishNode(factory.createTypeAssertion(type, expression), pos);
    }
    
    function parsePrefixUnaryExpression() {
        const pos = getPositionState();
        return finishNode(factory.createPrefixUnaryExpression(token() as PrefixUnaryOperator, nextTokenAnd(parseSimpleUnaryExpression)), pos);
    }
    
    /**
     * Check if the current token can possibly be an ES7 increment expression.
     *
     * ES7 UpdateExpression:
     *      LeftHandSideExpression[?Yield]
     *      LeftHandSideExpression[?Yield][no LineTerminator here]++
     *      LeftHandSideExpression[?Yield][no LineTerminator here]--
     *      ++LeftHandSideExpression[?Yield]
     *      --LeftHandSideExpression[?Yield]
     */
    function isUpdateExpression(): boolean {
        // This function is called inside parseUnaryExpression to decide
        // whether to call parseSimpleUnaryExpression or call parseUpdateExpression directly
        switch (token()) {
            case SyntaxKind.PlusToken:
            case SyntaxKind.MinusToken:
            case SyntaxKind.TildeToken:
            case SyntaxKind.ExclamationToken:            
            case SyntaxKind.VoidKeyword:            
            case SyntaxKind.LessThanToken:
            case SyntaxKind.OpenParenBraceToken: // ambiguous, so let simple unary try first
            // case SyntaxKind.AwaitKeyword:
                return false;           
            case SyntaxKind.OpenParenToken:
                return lookAhead(()=>(nextToken() === SyntaxKind.LessThanToken));
            default:
                return true;
        }
    }

    /**
     * Parse ES7 UpdateExpression. UpdateExpression is used instead of ES6's PostFixExpression.
     *
     * ES7 UpdateExpression[yield]:
     *      1) LeftHandSideExpression[?yield]
     *      2) LeftHandSideExpression[?yield] [[no LineTerminator here]]++
     *      3) LeftHandSideExpression[?yield] [[no LineTerminator here]]--
     *      4) ++LeftHandSideExpression[?yield]
     *      5) --LeftHandSideExpression[?yield]
     * In TypeScript (2), (3) are parsed as PostfixUnaryExpression. (4), (5) are parsed as PrefixUnaryExpression
     */
    function parseUpdateExpression(): UpdateExpression {
        if (token() === SyntaxKind.PlusPlusToken || token() === SyntaxKind.MinusMinusToken) {
            const pos = getPositionState();;
            return finishNode(factory.createPrefixUnaryExpression(token() as PrefixUnaryOperator, nextTokenAnd(parseLeftHandSideExpressionOrHigher)), pos);
        }        

        const exprPos = getPositionState();
        const expression = parseLeftHandSideExpressionOrHigher();

        Debug.assert(isLeftHandSideExpression(expression), "expression is not left hand type");
        if ((token() === SyntaxKind.PlusPlusToken || token() === SyntaxKind.MinusMinusToken) && !scanner.hasPrecedingLineBreak()) {
            const operator = token() as PostfixUnaryOperator;
            nextToken();
            // Debug.assert(exprPos.pos == expression.pos, "expression and expression position should be the same");
            return finishNode(factory.createPostfixUnaryExpression(expression, operator), exprPos);
        }

        return expression;
    }

    function parseLeftHandSideExpressionOrHigher(): LeftHandSideExpression {
        // Original Ecma:
        // LeftHandSideExpression: See 11.2
        //      NewExpression
        //      CallExpression
        //
        // Our simplification:
        //
        // LeftHandSideExpression: See 11.2
        //      MemberExpression
        //      CallExpression
        //
        // See comment in parseMemberExpressionOrHigher on how we replaced NewExpression with
        // MemberExpression to make our lives easier.
        //
        // to best understand the below code, it's important to see how CallExpression expands
        // out into its own productions:
        //
        // CallExpression:
        //      MemberExpression Arguments
        //      CallExpression Arguments
        //      CallExpression[Expression]
        //      CallExpression.IdentifierName
        //      import (AssignmentExpression)
        //      super Arguments
        //      super.IdentifierName
        //
        // Because of the recursion in these calls, we need to bottom out first. There are three
        // bottom out states we can run into: 1) We see 'super' which must start either of
        // the last two CallExpression productions. 2) We see 'import' which must start import call.
        // 3)we have a MemberExpression which either completes the LeftHandSideExpression,
        // or starts the beginning of the first four CallExpression productions.        
        const pos = getPositionState();
        let expression: MemberExpression;
        // if (token() === SyntaxKind.ImportKeyword) {
            // if (lookAhead(nextTokenIsOpenParenOrLessThan)) {
            //     // We don't want to eagerly consume all import keyword as import call expression so we look ahead to find "("
            //     // For example:
            //     //      var foo3 = require("subfolder
            //     //      import * as foo1 from "module-from-node
            //     // We want this import to be a statement rather than import call expression
            //     sourceFlags |= NodeFlags.PossiblyContainsDynamicImport;
            //     expression = parseTokenNode<PrimaryExpression>();
            // }
            // else if (lookAhead(nextTokenIsDot)) {
            //     // This is an 'import.*' metaproperty (i.e. 'import.meta')
            //     nextToken(); // advance past the 'import'
            //     nextToken(); // advance past the dot
            //     expression = finishNode(factory.createMetaProperty(SyntaxKind.ImportKeyword, parseIdentifierName()), pos);
            //     sourceFlags |= NodeFlags.PossiblyContainsImportMeta;
            // }
            // else {
                // expression = parseMemberExpressionOrHigher();
            // }
        // }
        // else {
            // }
        
        // potentially parse super w/o a prefix (i.e. ::fn() )
        expression = (token() == SyntaxKind.ColonColonToken)  ? parseSuperExpression(pos) : parseMemberExpressionOrHigher();//token() === SyntaxKind.SuperKeyword ? parseSuperExpression() : parseMemberExpressionOrHigher();
        
        // Now, we *may* be complete.  However, we might have consumed the start of a
        // CallExpression or OptionalExpression.  As such, we need to consume the rest
        // of it here to be complete.
        return parseCallExpressionRest(pos, expression);
    }

    function parseCallExpressionRest(pos: PositionState, expression: LeftHandSideExpression): LeftHandSideExpression {
        while (true) {
            expression = parseMemberExpressionRest(pos, expression, /*allowOptionalChain*/ true);                                    
            if (token() === SyntaxKind.OpenParenToken) {
                // Absorb type arguments into CallExpression when preceding expression is ExpressionWithTypeArguments                
                const argumentList = parseArgumentList();
                const callExpr = factoryCreateCallExpression(expression, argumentList);
                expression = finishNode(callExpr, pos);
                continue;
            }
            break;
        }
        return expression;
    }

    function parseArgumentList() {
        parseExpected(SyntaxKind.OpenParenToken);
        const result = parseDelimitedList(ParsingContext.ArgumentExpressions, parseArgumentExpression);
        parseExpected(SyntaxKind.CloseParenToken);
        return result;
    }

    function parseArgumentExpression(): Expression {
        return doOutsideOfContext(disallowInAndDecoratorContext, parseArgumentOrArrayLiteralElement);
    }

    function parseNamedArgumentExpression(): ObjectLiteralElementLike {
        return doOutsideOfContext(disallowInAndDecoratorContext, parseNamedArgumentElement);
    }

    function parseNamedArgumentElement(): ObjectLiteralElementLike {
        const pos = getPositionState();
        const hasJSDoc = hasPrecedingJSDocComment();

        const name = parsePropertyName();
        parseExpected(SyntaxKind.ColonToken);
        const initializer = allowInAnd(()=>parseAssignmentExpressionOrHigher(/*allowReturnTypeInArrowFunction*/ true));
        const node = factory.createPropertyAssignment(name, initializer);
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parseSuperExpression(pos: PositionState, left?: Expression): MemberExpression {
        const hasJSDoc = hasPrecedingJSDocComment();

        parseExpectedToken(SyntaxKind.ColonColonToken);
        
        const name = isIdentifier() ? parseIdentifier() : createMissingNode<Identifier>(SyntaxKind.Identifier, true, Diagnostics.Identifier_expected);

        if (left) {
            Debug.assert(left.kind === SyntaxKind.Identifier || left.kind === SyntaxKind.StringLiteral, "namespace must be an identifier or string literal");
        }

        const node = factory.createSuperAccessExpression(name, left as Identifier);
        
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parseMemberExpressionOrHigher(): MemberExpression {
        // Note: to make our lives simpler, we decompose the NewExpression productions and
        // place ObjectCreationExpression and FunctionExpression into PrimaryExpression.
        // like so:
        //
        //   PrimaryExpression : See 11.1
        //      this
        //      Identifier
        //      Literal
        //      ArrayLiteral
        //      ObjectLiteral
        //      (Expression)
        //      FunctionExpression
        //      new MemberExpression Arguments?
        //
        //   MemberExpression : See 11.2
        //      PrimaryExpression
        //      MemberExpression[Expression]
        //      MemberExpression.IdentifierName
        //
        //   CallExpression : See 11.2
        //      MemberExpression
        //      CallExpression Arguments
        //      CallExpression[Expression]
        //      CallExpression.IdentifierName
        //
        // Technically this is ambiguous.  i.e. CallExpression defines:
        //
        //   CallExpression:
        //      CallExpression Arguments
        //
        // If you see: "new Foo()"
        //
        // Then that could be treated as a single ObjectCreationExpression, or it could be
        // treated as the invocation of "new Foo".  We disambiguate that in code (to match
        // the original grammar) by making sure that if we see an ObjectCreationExpression
        // we always consume arguments if they are there. So we treat "new Foo()" as an
        // object creation only, and not at all as an invocation.  Another way to think
        // about this is that for every "new" that we see, we will consume an argument list if
        // it is there as part of the *associated* object creation node.  Any additional
        // argument lists we see, will become invocation expressions.
        //
        // Because there are no other places in the grammar now that refer to FunctionExpression
        // or ObjectCreationExpression, it is safe to push down into the PrimaryExpression
        // production.
        //
        // Because CallExpression and MemberExpression are left recursive, we need to bottom out
        // of the recursion immediately.  So we parse out a primary expression to start with.
        const pos = getPositionState();
        const expression = parsePrimaryExpression();
        return parseMemberExpressionRest(pos, expression, /*allowOptionalChain*/ true);
    }

    function isArrowPropertyAccess() {
        return token() === SyntaxKind.MinusGreaterThanToken;
    }

    function parseMemberExpressionRest(pos: PositionState, expression: LeftHandSideExpression, allowOptionalChain: boolean): MemberExpression {
        while (true) {   
            let isPropertyAccess = false;
            let propertyAccessToken: Token<SyntaxKind.DotToken | SyntaxKind.MinusGreaterThanToken> | undefined;            

            if (token() == SyntaxKind.ColonColonToken) {
                expression = parseSuperExpression(pos, expression)
            }

            if (token() == SyntaxKind.DotToken || token() == SyntaxKind.MinusGreaterThanToken) {
                isPropertyAccess = true;
                propertyAccessToken = parseTokenNode();
            }

            if (isPropertyAccess) {
                expression = parsePropertyAccessExpressionRest(pos, expression, propertyAccessToken);
                continue;
            }

            if (parseOptional(SyntaxKind.OpenBracketToken)) {
                expression = parseElementAccessExpressionRest(pos, expression);
                continue;
            }
                        
            return expression as MemberExpression;
        }
    }

    function parseMaybeRangeExpression(rangeTerminatorToken:PunctuationSyntaxKind): RangeExpression | Expression {        
        const pos = getPositionState();
        let left: Expression, right: Expression;        
        if (parseOptional(SyntaxKind.DotDotToken)) {
            right = allowInAnd(parseExpression);
        } else {
            left = allowInAnd(parseExpression);
            if (parseOptional(SyntaxKind.DotDotToken) && token() !== rangeTerminatorToken) {
                right = allowInAnd(parseExpression);
            }
        }
        const expression = right ? finishNode(factory.createRangeExpression(left, right), pos) : left;
        return expression;
    }

    function parseElementAccessExpressionRest(pos: PositionState, expression: LeftHandSideExpression) {
        let argumentExpression: Expression;
        if (token() === SyntaxKind.CloseBracketToken) {
            argumentExpression = createMissingNode(SyntaxKind.Identifier, /*reportAtCurrentPosition*/ true, Diagnostics.An_element_access_expression_should_take_an_argument);
        } else {

            // element access ranges allow < tokens, i.e.
            //  foo[<bar] or foo[<1..<2] or foo[..<2]
            let left: Expression, right: Expression;        
            // let leftOp: Token<SyntaxKind.LessThanToken> | undefined, rightOp: Token<SyntaxKind.LessThanToken> | undefined;                        
            if (parseOptional(SyntaxKind.DotDotToken)) {
                // rightOp = parseOptionalToken(SyntaxKind.LessThanToken);
                right = allowInAnd(parseExpression);
            } else {
                // leftOp = parseOptionalToken(SyntaxKind.LessThanToken);
                left = allowInAnd(parseExpression);
                if (parseOptional(SyntaxKind.DotDotToken) && token() !== SyntaxKind.CloseBracketToken) {
                    // leftOp = parseOptionalToken(SyntaxKind.LessThanToken);
                    right = allowInAnd(parseExpression);
                }
            }
            
            const argument = right ? finishNode(factory.createRangeExpression(left, right), pos) : left;            
            if (isStringOrNumericLiteralLike(argument)) {
                argument.text = internIdentifier(argument.text);
            }

            argumentExpression = argument;
        }

        parseExpected(SyntaxKind.CloseBracketToken);

        const indexedAccess = factoryCreateElementAccessExpression(expression, argumentExpression);
        return finishNode(indexedAccess, pos);
    }

    function parsePropertyAccessExpressionRest(pos: PositionState, expression: LeftHandSideExpression, propertyAccessToken: PropertyAccessToken) {
        const name = parseRightSideOfDot(/*allowIdentifierNames*/ true, /*allowPrivateIdentifiers*/ true, /*allowUnicodeEscapeSequenceInIdentifierName*/ true);
        const isOptionalChain = false;
        const propertyAccess = factoryCreatePropertyAccessExpression(expression, name, propertyAccessToken);
        return finishNode(propertyAccess, pos);
    }

    function parseRightSideOfDot(allowIdentifierNames: boolean, allowPrivateIdentifiers: boolean, allowUnicodeEscapeSequenceInIdentifierName: boolean): Identifier  {
        // Technically a keyword is valid here as all identifiers and keywords are identifier names.
        // However, often we'll encounter this in error situations when the identifier or keyword
        // is actually starting another valid construct.
        //
        // So, we check for the following specific case:
        //
        //      name.
        //      identifierOrKeyword identifierNameOrKeyword
        //
        // Note: the newlines are important here.  For example, if that above code
        // were rewritten into:
        //
        //      name.identifierOrKeyword
        //      identifierNameOrKeyword
        //
        // Then we would consider it valid.  That's because ASI would take effect and
        // the code would be implicitly: "name.identifierOrKeyword; identifierNameOrKeyword".
        // In the first case though, ASI will not take effect because there is not a
        // line terminator after the identifier or keyword.
        if (scanner.hasPrecedingLineBreak() && tokenIsIdentifierOrKeyword(token())) {
            const matchesPattern = lookAhead(nextTokenIsIdentifierOrKeywordOnSameLine);

            if (matchesPattern) {
                // Report that we need an identifier.  However, report it right after the dot,
                // and not on the next token.  This is because the next token might actually
                // be an identifier and the error would be quite confusing.
                return createMissingNode<Identifier>(SyntaxKind.Identifier, /*reportAtCurrentPosition*/ true, Diagnostics.Identifier_expected);
            }
        }
        
        if (allowIdentifierNames) {
            return allowUnicodeEscapeSequenceInIdentifierName ? parseIdentifierName() : parseIdentifierNameErrorOnUnicodeEscapeSequence();
        }

        return parseIdentifier();
    }

    function parseLambdaExpression(): LambdaExpression {
        const pos = getPositionState();
        parseExpected(SyntaxKind.LambdaToken);
        
        let node: LambdaExpression;        
        if (token()==SyntaxKind.Identifier) {
            const idPos = getPositionState();
            let name: Expression = parseIdentifier();
            
            if (token() == SyntaxKind.ColonColonToken) {
                name = parseSuperExpression(idPos, name);
            }

            node = factory.createLambdaIdentifierExpression(name);
        } else {            
            if (token() == SyntaxKind.GreaterThanToken) reScanGreaterToken(); // to get the proper >= token                        
            const opToken = parseTokenNode<LambdaOperatorToken>();
            node = factory.createLambdaOperatorExpression(opToken);

            if (opToken.kind == SyntaxKind.OpenBracketToken) {
                while (token() != SyntaxKind.CommaToken) {
                    // TODO : validate these, don't just eat them
                    // https://github.com/ldmud/ldmud/blob/74503aaa72f874e311040097968d2c4efe6df0fb/doc/LPC/closures#L246
                    const t = nextToken();
                    const ii=0;
                }
            }
        }

        return finishNode(node, pos);
    }

    function parseIdentifier(diagnosticMessage?: DiagnosticMessage, privateIdentifierDiagnosticMessage?: DiagnosticMessage): Identifier {
        return createIdentifier(isIdentifier(), diagnosticMessage, privateIdentifierDiagnosticMessage);
    }

    function parseIdentifierName(diagnosticMessage?: DiagnosticMessage): Identifier {
        return createIdentifier(tokenIsIdentifierOrKeyword(token()), diagnosticMessage);
    }

    function parseIdentifierNameErrorOnUnicodeEscapeSequence(): Identifier {
        if (scanner.hasUnicodeEscape() || scanner.hasExtendedUnicodeEscape()) {
            parseErrorAtCurrentToken(Diagnostics.Unicode_escape_sequence_cannot_appear_here);
        }
        return createIdentifier(tokenIsIdentifierOrKeyword(token()));
    }

    function parseParenthesizedExpression(): ParenthesizedExpression {
        const pos = getPositionState();
        const hasJSDoc = hasPrecedingJSDocComment();
        parseExpected(SyntaxKind.OpenParenToken);
        const expression = allowInAnd(parseExpression);
        parseExpected(SyntaxKind.CloseParenToken);
        return withJSDoc(finishNode(factoryCreateParenthesizedExpression(expression), pos), hasJSDoc);
    }

    function parseMappingLiteralExpression(): MappingLiteralExpression {
        const pos = getPositionState();
        const openBracketPosition = scanner.getTokenStart();
        const openBracketFilename = scanner.getFileName();
        const openBracketParsed = parseExpected(SyntaxKind.OpenParenBracketToken);        
        let initializer: Expression | undefined;
        let elements: NodeArray<Expression> | undefined;

        if (parseOptional(SyntaxKind.ColonToken)) {
            // this is a mapping with a width initializer, "([ :size() ])"
            initializer = parseAssignmentExpressionOrHigher(false);
        } else {
            elements = parseDelimitedList(ParsingContext.MappingLiteralMembers, parseMappingLiteralElement);
        }

        parseExpectedMatchingBracketTokens(SyntaxKind.OpenParenBracketToken, [SyntaxKind.CloseBracketToken,SyntaxKind.CloseParenToken], openBracketParsed, openBracketPosition, openBracketFilename);
        const multiLine = scanner.hasPrecedingLineBreak();
        return finishNode(factory.createMappingLiteralExpression(initializer, elements, multiLine), pos);
    }

    function parseMappingLiteralElement(): MappingEntryExpression {
        const pos = getPositionState();
        const key = parseAssignmentExpressionOrHigher(false);
        let elements: NodeArray<Expression> | undefined;

        if (parseOptional(SyntaxKind.ColonToken)) {
            elements = parseTokenDelimitedList(ParsingContext.MappingEntryMembers, parseMappingEntryElement, SyntaxKind.SemicolonToken);
            // if there is a colon there MUST be at least one element
            if (elements?.length === 0) {
                createMissingNode(SyntaxKind.ExpressionStatement, true, Diagnostics.Expression_expected);
            }
        }

        return finishNode(factory.createMappingEntryExpression(key, elements), pos);
    }

    function parseMappingEntryElement(): Expression {
        return token() === SyntaxKind.SemicolonToken ? finishNode(factory.createOmittedExpression(), getPositionState()) :
            parseAssignmentExpressionOrHigher(/*allowReturnTypeInArrowFunction*/ true);
    }

    function parseInlineClosureExpression(allowReturnTypeInArrowFunction: boolean): InlineClosureExpression {
        const pos = getPositionState();
        const hasJSDoc = hasPrecedingJSDocComment();                

        const savedContext = parsingContext;
        parsingContext |= ParsingContext.InlineClosure;        

        parseExpected(SyntaxKind.OpenParenColonToken);
        const expression = parseInlineClosureExpressionBody(allowReturnTypeInArrowFunction);
        parseExpected(SyntaxKind.ColonCloseParenToken);

        parsingContext = savedContext;

        return withJSDoc(finishNode(factory.createInlineClosure(expression), pos), hasJSDoc);
    }

    function isStartOfExpressionStatement(): boolean {
        // As per the grammar, none of '{' or 'function' or 'class' can start an expression statement.
        return token() !== SyntaxKind.OpenBraceToken &&
            // token() !== SyntaxKind.FunctionKeyword &&
            token() !== SyntaxKind.ClassKeyword &&
            token() !== SyntaxKind.AtToken &&
            isStartOfExpression();
    }

    function parseInlineClosureExpressionBody(allowReturnTypeInArrowFunction: boolean): Block | Expression {
        if (token() === SyntaxKind.OpenBraceToken) {
            return parseFunctionBlock(SignatureFlags.None);
        }

        if (
            token() !== SyntaxKind.SemicolonToken &&
            token() !== SyntaxKind.FunctionKeyword &&
            token() !== SyntaxKind.ClassKeyword &&
            isStartOfStatement() &&
            !isStartOfExpressionStatement()
        ) {
            // Check if we got a plain statement (i.e. no expression-statements, no function/class expressions/declarations)
            //
            // Here we try to recover from a potential error situation in the case where the
            // user meant to supply a block. For example, if the user wrote:
            //
            //  a =>
            //      let v = 0;
            //  }
            //
            // they may be missing an open brace.  Check to see if that's the case so we can
            // try to recover better.  If we don't do this, then the next close curly we see may end
            // up preemptively closing the containing construct.
            //
            // Note: even when 'IgnoreMissingOpenBrace' is passed, parseBody will still error.
            return parseFunctionBlock(SignatureFlags.IgnoreMissingOpenBrace | SignatureFlags.None);
        }

        const savedTopLevel = topLevel;
        topLevel = false;
        // const node = isAsync
        //     ? doInAwaitContext(() => parseAssignmentExpressionOrHigher(allowReturnTypeInArrowFunction))
        //     : doOutsideOfAwaitContext(() => parseAssignmentExpressionOrHigher(allowReturnTypeInArrowFunction));
        const node = parseExpression();
        topLevel = savedTopLevel;
        return node;
    }

    function parseJsonArrayLiteralExpression(): ArrayLiteralExpression {
        const pos = getPositionState();
        const openBracketFilename = scanner.getFileName();
        const openBracketPosition = scanner.getTokenStart();
        const openBracketParsed = parseExpected(SyntaxKind.OpenBracketToken);
        const multiLine = scanner.hasPrecedingLineBreak();
        const elements = parseDelimitedList(ParsingContext.JsonArrayLiteralMembers, parseArgumentOrArrayLiteralElement);
        parseExpectedMatchingBrackets(SyntaxKind.OpenBracketToken, SyntaxKind.CloseBracketToken, openBracketParsed, openBracketPosition, openBracketFilename);
        return finishNode(factoryCreateArrayLiteralExpression(elements, multiLine), pos);
    }

    function parseArrayLiteralExpression(): ArrayLiteralExpression {
        const pos = getPositionState();
        const openBracketPosition = scanner.getTokenStart();
        const openBraceFilename = scanner.getFileName();
        const openBracketParsed = parseExpected(SyntaxKind.OpenParenBraceToken);
        const multiLine = scanner.hasPrecedingLineBreak();
        const elements = parseDelimitedList(ParsingContext.ArrayLiteralMembers, parseArgumentOrArrayLiteralElement);
        parseExpectedMatchingBracketTokens(SyntaxKind.OpenParenBraceToken, [SyntaxKind.CloseBraceToken, SyntaxKind.CloseParenToken], openBracketParsed, openBracketPosition, openBraceFilename);
        return finishNode(factoryCreateArrayLiteralExpression(elements, multiLine), pos);
    }

    function parseSpreadElement(): Expression {
        const pos = getPositionState();
        parseExpected(SyntaxKind.DotDotDotToken);
        const expression = parseAssignmentExpressionOrHigher(/*allowReturnTypeInArrowFunction*/ true);
        
        return finishNode(factory.createSpreadElement(expression), pos);
    }

    function parseByRefElement(): Expression {
        const pos = getPositionState();
        parseExpected(SyntaxKind.AmpersandToken);
        const expression = parseAssignmentExpressionOrHigher(/*allowReturnTypeInArrowFunction*/ true);

        return finishNode(factory.createByRefElement(expression), pos);
    }

    function parseArgumentOrArrayLiteralElement(): Expression {
        const pos = getPositionState();
        
        let expression = token() === SyntaxKind.DotDotDotToken ? parseSpreadElement() :
            token() === SyntaxKind.AmpersandToken ? parseByRefElement() :
            token() === SyntaxKind.CommaToken ? finishNode(factory.createOmittedExpression(), getPositionState()) :
            parseAssignmentExpressionOrHigher(/*allowReturnTypeInArrowFunction*/ true);
        
        if (token() === SyntaxKind.DotDotDotToken) {            
            parseExpected(SyntaxKind.DotDotDotToken);
            expression = finishNode(factory.createSpreadElement(expression), pos);
        }

        return expression;
    }
    
    function parsePrimaryExpression(): PrimaryExpression {
        switch (token()) {
            // case SyntaxKind.NoSubstitutionTemplateLiteral:
            //     if (scanner.getTokenFlags() & TokenFlags.IsInvalid) {
            //         reScanTemplateToken(/*isTaggedTemplate*/ false);
            //     }
            // falls through
            case SyntaxKind.NumericLiteral:
            case SyntaxKind.IntLiteral:
            case SyntaxKind.FloatLiteral:
            case SyntaxKind.StringLiteral:
            case SyntaxKind.StringArrayLiteral:
            case SyntaxKind.BytesLiteral:            
                return parseLiteralNode();            
            case SyntaxKind.SuperKeyword:
            case SyntaxKind.NullKeyword:
            case SyntaxKind.TrueKeyword:
            case SyntaxKind.FalseKeyword:
                return parseTokenNode<PrimaryExpression>();
            case SyntaxKind.OpenParenToken:
                if (lookAhead(()=>(nextToken() == SyntaxKind.LessThanToken))) {
                    return parseNewStructExpression();
                }                
                return parseParenthesizedExpression();
            case SyntaxKind.OpenParenBraceToken:
                return parseArrayLiteralExpression();
            case SyntaxKind.OpenParenColonToken:                              
                return parseInlineClosureExpression(true);
            case SyntaxKind.OpenParenBracketToken:
                return parseMappingLiteralExpression();
            case SyntaxKind.OpenParenAsteriskToken:
                return parseEvaluateExpression();            
            // case SyntaxKind.AsyncKeyword:
            //     // Async arrow functions are parsed earlier in parseAssignmentExpressionOrHigher.
            //     // If we encounter `async [no LineTerminator here] function` then this is an async
            //     // function; otherwise, its an identifier.
            //     if (!lookAhead(nextTokenIsFunctionKeywordOnSameLine)) {
            //         break;
            //     }

            //     return parseFunctionExpression();            
            // case SyntaxKind.ClassKeyword:
            //     return parseClassExpression();
            case SyntaxKind.FunctionKeyword:
                return parseFunctionExpression();
            case SyntaxKind.CatchKeyword:
                return parseCatchExpression();                        
            // case SyntaxKind.TemplateHead:
            //     return parseTemplateExpression(/*isTaggedTemplate*/ false);            
            case SyntaxKind.LambdaToken:
                return parseLambdaExpression();                      
            case SyntaxKind.OpenBracketToken:
                if (scriptKind === ScriptKind.JSON) {
                    return parseJsonArrayLiteralExpression();
                } else {
                    // fall through and report error
                    break;
                }
            case SyntaxKind.OpenBraceToken:
                if (scriptKind === ScriptKind.JSON) {
                    return parseJsonObjectLiteralExpression();
                } else {
                    // fall through and report error
                    break;
                }
        }

        if (token() === SyntaxKind.NewKeyword && languageVariant === LanguageVariant.FluffOS) {            
            return parseNewExpression();
        }

        // parse a variable declaration as an exression
        if (isTypeName() && lookAhead(() => nextToken() !== SyntaxKind.ColonColonToken)) {
            const varType = parseType();
            return parseVariableDeclaration(varType);
        }

        return parseIdentifier(Diagnostics.Expression_expected);
    }

    function parseEvaluateExpression(): EvaluateExpression {
        const pos = getPositionState();
        
        parseExpected(SyntaxKind.OpenParenAsteriskToken);                 
        const expression = parseAssignmentExpressionOrHigher(/*allowReturnTypeInArrowFunction*/ true);        
        parseExpected(SyntaxKind.CloseParenToken);
        
        const argumentList = parseArgumentList();

        return finishNode(factory.createEvaluateExpression(expression, argumentList), pos);
    }

    function parseNewExpression(): NewExpression {
        const pos = getPositionState();
        parseExpected(SyntaxKind.NewKeyword);
                
        let expression: Expression | TypeNode | undefined;
        let argumentList: NodeArray<Expression> | undefined;
        // const expressionPos = getPositionState();
        // let expression: LeftHandSideExpression = parseMemberExpressionRest(expressionPos, parsePrimaryExpression(), /*allowOptionalChain*/ false);
        // // let typeArguments: NodeArray<TypeNode> | undefined;
        // // // Absorb type arguments into NewExpression when preceding expression is ExpressionWithTypeArguments
        // // if (expression.kind === SyntaxKind.ExpressionWithTypeArguments) {
        // //     typeArguments = (expression as ExpressionWithTypeArguments).typeArguments;
        // //     expression = (expression as ExpressionWithTypeArguments).expression;
        // // }        

        parseExpected(SyntaxKind.OpenParenToken);
        
        if (token() == SyntaxKind.ClassKeyword) {
            // fluff-style new class constructor
            // class Foo = new(class Foo);
            // class Foo = new(class Foo, name: "Bob", age: 42);
            expression = parseType();

            if (parseOptional(SyntaxKind.CommaToken)) {
                argumentList = parseDelimitedList(ParsingContext.ArgumentExpressions, parseArgumentExpression);
            }
        } else {
            argumentList = parseDelimitedList(ParsingContext.ArgumentExpressions, parseArgumentExpression);
        }

        parseExpected(SyntaxKind.CloseParenToken);

        return finishNode(factoryCreateNewExpression(expression, undefined, argumentList), pos);
    }

    function parseFunctionExpression(): FunctionExpression {
        // GeneratorExpression:
        //      function* BindingIdentifier [Yield][opt](FormalParameters[Yield]){ GeneratorBody }
        //
        // FunctionExpression:
        //      function BindingIdentifier[opt](FormalParameters){ FunctionBody }
        const pos = getPositionState();
        const hasJSDoc = hasPrecedingJSDocComment();
        const modifiers = parseModifiers(/*allowDecorators*/ false);
        parseExpected(SyntaxKind.FunctionKeyword);        
        const name = isIdentifier() ? parseIdentifier() : undefined;

        // const typeParameters = parseTypeParameters();
        const parameters = parseParameters();
        // const type = parseReturnType(SyntaxKind.ColonToken, /*isType*/ false);
        const body = parseFunctionBlock(SignatureFlags.None);

        
        const node = factory.createFunctionExpression(modifiers, name, parameters, undefined, body);
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parseLiteralNode(): LiteralExpression {
        return parseLiteralLikeNode(token()) as LiteralExpression;
    }

    // dprint-ignore
    const enum ParsingContext {
        SourceElements,            // Elements in source file
        BlockStatements,           // Statements in block
        SwitchPreBlock,            // Statements in switch statement before the first case block
        SwitchClauses,             // Clauses in switch statement
        SwitchClauseStatements,    // Statements in switch clause
        TypeMembers,               // Members in interface or type literal
        ClassMembers,              // Members in class declaration
        EnumMembers,               // Members in enum declaration
        ElementAccess,             // Expressions in an element access
        HeritageClauseElement,     // Elements in a heritage clause
        VariableDeclarations,      // Variable declarations in variable statement
        ObjectBindingElements,     // Binding elements in object binding list
        ArrayBindingElements,      // Binding elements in array binding list
        ArgumentExpressions,       // Expressions in argument list
        ObjectLiteralMembers,      // Members in object literal        
        ArrayLiteralMembers,       // Members in array literal
        JsonArrayLiteralMembers,   // Members in a JSON array literal
        MappingLiteralMembers,     // Members in mapping literal
        MappingEntryMembers,       // Members in mapping literal entry
        Parameters,                // Parameters in parameter list
        JSDocParameters,           // JSDoc parameters in parameter list of JSDoc function type
        RestProperties,            // Property names in a rest type list
        TypeParameters,            // Type parameters in type parameter list
        TypeArguments,             // Type arguments in type argument list
        TupleElementTypes,         // Element types in tuple element type list
        HeritageClauses,           // Heritage clauses for a class or interface declaration.
        ImportOrExportSpecifiers,  // Named import clause's import specifier list,
        ImportAttributes,          // Import attributes
        JSDocComment,              // Parsing via JSDocParser
        Count,                     // Number of parsing contexts
        InlineClosure,             // Closure expression
        StructMembers,             // Members in struct declaration
        ForEachInitialers,         // Variable declarations in for statement
        PramgaArguments            // Arguments in #pragma
    }

    function internIdentifier(text: string): string {
        let identifier = identifiers.get(text);
        if (identifier === undefined) {
            identifiers.set(text, identifier = text);
        }
        return identifier;
    }

    function parseExpectedJSDoc(kind: JSDocSyntaxKind) {
        if (token() === kind) {
            nextTokenJSDoc();
            return true;
        }
        Debug.assert(isKeywordOrPunctuation(kind));
        parseErrorAtCurrentToken(Diagnostics._0_expected, tokenToString(kind));
        return false;
    }

    function nextTokenJSDoc(): JSDocSyntaxKind {
        return currentToken = scanner.scanJsDocToken();
    }

    function nextJSDocCommentTextToken(inBackticks: boolean): JSDocSyntaxKind | SyntaxKind.JSDocCommentTextToken {
        return currentToken = scanner.scanJSDocCommentTextToken(inBackticks);
    }

    function parseTypePredicatePrefix() {
        const id = parseIdentifier();
        if (token() === SyntaxKind.IsKeyword && !scanner.hasPrecedingLineBreak()) {
            nextToken();
            return id;
        }
    }

    function parseTypeOrTypePredicate(): TypeNode {
        const pos = getNodePos();
        const typePredicateVariable = isIdentifier() && tryParse(parseTypePredicatePrefix);
        const type = parseType();
        // if (typePredicateVariable) {
        //     return finishNode(factory.createTypePredicateNode(/*assertsModifier*/ undefined, typePredicateVariable, type), pos);
        // }
        // else {
            return type;
        // }
    }

    function parseJSDocType(): TypeNode {
        scanner.setSkipJsDocLeadingAsterisks(true);
        const pos = getPositionState();
        
        const hasDotDotDot = parseOptional(SyntaxKind.DotDotDotToken);
        let type = parseTypeOrTypePredicate();
        scanner.setSkipJsDocLeadingAsterisks(false);
        if (hasDotDotDot) {            
            type = finishNode(factory.createJSDocVariadicType(type), pos);
        }
        if (token() === SyntaxKind.EqualsToken) {
            Debug.fail("TODO: implement optional type");
            // nextToken();
            // return finishNode(factory.createJSDocOptionalType(type), pos);
        }
        return type;
    }

    export function fixupParentReferences(rootNode: Node) {
        // normally parent references are set during binding. However, for clients that only need
        // a syntax tree, and no semantic features, then the binding process is an unnecessary
        // overhead.  This functions allows us to set all the parents, without all the expense of
        // binding.
        setParentRecursive(rootNode, /*incremental*/ true);
    }

    function parseEntityName(allowReservedWords: boolean, diagnosticMessage?: DiagnosticMessage): EntityName {
        const pos = getPositionState();
        let entity: EntityName = allowReservedWords ? parseIdentifierName(diagnosticMessage) : parseIdentifier(diagnosticMessage);
        while (parseOptional(SyntaxKind.DotToken)) {
            if (token() === SyntaxKind.LessThanToken) {
                // The entity is part of a JSDoc-style generic. We will use the gap between `typeName` and
                // `typeArguments` to report it as a grammar error in the checker.
                break;
            }
            entity = finishNode(
                factory.createQualifiedName(
                    entity,
                    parseRightSideOfDot(allowReservedWords, /*allowPrivateIdentifiers*/ false, /*allowUnicodeEscapeSequenceInIdentifierName*/ true) as Identifier,
                ),
                pos,
            );
        }
        return entity;
    }

    function createQualifiedName(entity: EntityName, name: Identifier, entityPos: PositionState): QualifiedName {
        return finishNode(factory.createQualifiedName(entity, name), entityPos);
    }
    
    export namespace JSDocParser {
        export function parseJSDocComment(parent: HasJSDoc, start: number, length: number): JSDoc | undefined {
            const saveToken = currentToken;
            const saveParseDiagnosticsLength = parseDiagnostics.length;
            const saveParseErrorBeforeNextFinishedNode = parseErrorBeforeNextFinishedNode;

            const comment = doInsideOfContext(NodeFlags.JSDoc, () => parseJSDocCommentWorker(start, length));
            setParent(comment, parent);

            if (contextFlags & NodeFlags.JavaScriptFile) {
                if (!jsDocDiagnostics) {
                    jsDocDiagnostics = [];
                }
                addRange(jsDocDiagnostics, parseDiagnostics, saveParseDiagnosticsLength);
            }
            currentToken = saveToken;
            parseDiagnostics.length = saveParseDiagnosticsLength;
            parseErrorBeforeNextFinishedNode = saveParseErrorBeforeNextFinishedNode;
            return comment;
        }

        const enum JSDocState {
            BeginningOfLine,
            SawAsterisk,
            SavingComments,
            SavingBackticks, // NOTE: Only used when parsing tag comments
        }

        // export function parseJSDocTypeExpressionForTests(content: string, start: number | undefined, length: number | undefined): { jsDocTypeExpression: JSDocTypeExpression; diagnostics: Diagnostic[]; } | undefined {
        //     initializeState("file.js", content, ScriptTarget.Latest, /*syntaxCursor*/ undefined, ScriptKind.JS, JSDocParsingMode.ParseAll);
        //     scanner.setText(content, start, length);
        //     currentToken = scanner.scan();
        //     const jsDocTypeExpression = parseJSDocTypeExpression();

        //     const sourceFile = createSourceFile("file.js", ScriptTarget.Latest, ScriptKind.JS, /*isDeclarationFile*/ false, [], factoryCreateToken(SyntaxKind.EndOfFileToken), NodeFlags.None, noop);
        //     const diagnostics = attachFileToDiagnostics(parseDiagnostics, sourceFile);
        //     if (jsDocDiagnostics) {
        //         sourceFile.jsDocDiagnostics = attachFileToDiagnostics(jsDocDiagnostics, sourceFile);
        //     }

        //     clearState();

        //     return jsDocTypeExpression ? { jsDocTypeExpression, diagnostics } : undefined;
        // }

        // Parses out a JSDoc type expression.
        export function parseJSDocTypeExpression(mayOmitBraces?: boolean): JSDocTypeExpression {
            const pos = getPositionState();;
            const hasBrace = (mayOmitBraces ? parseOptional : parseExpected)(SyntaxKind.OpenBraceToken);
            const type = doInsideOfContext(NodeFlags.JSDoc, parseJSDocType);
            if (!mayOmitBraces || hasBrace) {
                parseExpectedJSDoc(SyntaxKind.CloseBraceToken);
            }

            const result = factory.createJSDocTypeExpression(type);
            fixupParentReferences(result);
            return finishNode(result, pos);
        }

        
        export function parseJSDocNameReference(): JSDocNameReference {
            const pos = getPositionState();;
            const hasBrace = parseOptional(SyntaxKind.OpenBraceToken);
            const p2 = getNodePos();
            let entityName: EntityName | JSDocMemberName = parseEntityName(/*allowReservedWords*/ false);
            // while (token() === SyntaxKind.PrivateIdentifier) {
            //     reScanHashToken(); // rescan #id as # id
            //     nextTokenJSDoc(); // then skip the #
            //     entityName = finishNode(factory.createJSDocMemberName(entityName, parseIdentifier()), p2);
            // }
            if (hasBrace) {
                parseExpectedJSDoc(SyntaxKind.CloseBraceToken);
            }

            const result = factory.createJSDocNameReference(entityName);
            fixupParentReferences(result);
            return finishNode(result, pos);
        }

        export function parseIsolatedJSDocComment(content: string, start: number | undefined, length: number | undefined): { jsDoc: JSDoc; diagnostics: Diagnostic[]; } | undefined {
            initState("", content, emptyArray, ScriptTarget.Latest, /*syntaxCursor*/ undefined, ScriptKind.LPC, undefined, JSDocParsingMode.ParseAll, LanguageVariant.Standard);
            const jsDoc = doInsideOfContext(NodeFlags.JSDoc, () => parseJSDocCommentWorker(start, length));

            const sourceFile = { languageVariant: LanguageVariant.Standard, text: content } as SourceFile;
            const diagnostics = attachFileToDiagnostics(parseDiagnostics, sourceFile);
            clearState();

            return jsDoc ? { jsDoc, diagnostics } : undefined;
        }

        

        const enum PropertyLikeParse {
            Property = 1 << 0,
            Parameter = 1 << 1,
            CallbackParameter = 1 << 2,
        }

        
        
        function parseJSDocCommentWorker(start = 0, length: number | undefined): JSDoc | undefined {
            const content = sourceText;
            const end = length === undefined ? content.length : start + length;
            length = end - start;

            Debug.assert(start >= 0);
            Debug.assert(start <= end);
            Debug.assert(end <= content.length);

            // Check for /** (JSDoc opening part)
            if (!isJSDocLikeText(content, start)) {
                return undefined;
            }

            let tags: JSDocTag[];
            let tagsPos: number;
            let tagsEnd: number;
            let linkEnd: number;
            let commentsPos: number | undefined;
            let comments: string[] = [];
            const parts: JSDocComment[] = [];

            const saveParsingContext = parsingContext;
            parsingContext |= 1 << ParsingContext.JSDocComment;

            // + 3 for leading /**, - 5 in total for /** */
            const result = scanner.scanRange(start + 3, length - 5, doJSDocScan);
            parsingContext = saveParsingContext;
            return result;

            function doJSDocScan() {
                // Initially we can parse out a tag.  We also have seen a starting asterisk.
                // This is so that /** * @type */ doesn't parse.
                let state = JSDocState.SawAsterisk;
                let margin: number | undefined;
                // + 4 for leading '/** '
                // + 1 because the last index of \n is always one index before the first character in the line and coincidentally, if there is no \n before start, it is -1, which is also one index before the first character
                let indent = start - (content.lastIndexOf("\n", start) + 1) + 4;
                function pushComment(text: string) {
                    if (!margin) {
                        margin = indent;
                    }
                    comments.push(text);
                    indent += text.length;
                }

                nextTokenJSDoc();
                while (parseOptionalJsdoc(SyntaxKind.WhitespaceTrivia));
                if (parseOptionalJsdoc(SyntaxKind.NewLineTrivia)) {
                    state = JSDocState.BeginningOfLine;
                    indent = 0;
                }
                loop:
                while (true) {
                    switch (token()) {
                        case SyntaxKind.AtToken:
                            removeTrailingWhitespace(comments);
                            if (!commentsPos) commentsPos = getNodePos();
                            addTag(parseTag(indent));
                            // NOTE: According to usejsdoc.org, a tag goes to end of line, except the last tag.
                            // Real-world comments may break this rule, so "BeginningOfLine" will not be a real line beginning
                            // for malformed examples like `/** @param {string} x @returns {number} the length */`
                            state = JSDocState.BeginningOfLine;
                            margin = undefined;
                            break;
                        case SyntaxKind.NewLineTrivia:
                            comments.push(scanner.getTokenText());
                            state = JSDocState.BeginningOfLine;
                            indent = 0;
                            break;
                        case SyntaxKind.AsteriskToken:
                            const asterisk = scanner.getTokenText();
                            if (state === JSDocState.SawAsterisk) {
                                // If we've already seen an asterisk, then we can no longer parse a tag on this line
                                state = JSDocState.SavingComments;
                                pushComment(asterisk);
                            }
                            else {
                                Debug.assert(state === JSDocState.BeginningOfLine);
                                // Ignore the first asterisk on a line
                                state = JSDocState.SawAsterisk;
                                indent += asterisk.length;
                            }
                            break;
                        case SyntaxKind.WhitespaceTrivia:
                            Debug.assert(state !== JSDocState.SavingComments, "whitespace shouldn't come from the scanner while saving top-level comment text");
                            // only collect whitespace if we're already saving comments or have just crossed the comment indent margin
                            const whitespace = scanner.getTokenText();
                            if (margin !== undefined && indent + whitespace.length > margin) {
                                comments.push(whitespace.slice(margin - indent));
                            }
                            indent += whitespace.length;
                            break;
                        case SyntaxKind.EndOfFileToken:
                            break loop;
                        case SyntaxKind.JSDocCommentTextToken:
                            state = JSDocState.SavingComments;
                            pushComment(scanner.getTokenValue());
                            break;
                        case SyntaxKind.OpenBraceToken:
                            state = JSDocState.SavingComments;
                            const commentEnd = scanner.getTokenFullStart();
                            const linkStart = scanner.getTokenEnd() - 1;
                            const link = parseJSDocLink(linkStart);
                            if (link) {
                                if (!linkEnd) {
                                    removeLeadingNewlines(comments);
                                }
                                parts.push(finishNode(factory.createJSDocText(comments.join("")), linkEnd ?? start, commentEnd));
                                parts.push(link);
                                comments = [];
                                linkEnd = scanner.getTokenEnd();
                                break;
                            }
                            // fallthrough if it's not a {@link sequence
                        default:
                            // Anything else is doc comment text. We just save it. Because it
                            // wasn't a tag, we can no longer parse a tag on this line until we hit the next
                            // line break.
                            state = JSDocState.SavingComments;
                            pushComment(scanner.getTokenText());
                            break;
                    }
                    if (state === JSDocState.SavingComments) {
                        nextJSDocCommentTextToken(/*inBackticks*/ false);
                    }
                    else {
                        nextTokenJSDoc();
                    }
                }
                const trimmedComments = comments.join("").trimEnd();
                if (parts.length && trimmedComments.length) {
                    parts.push(finishNode(factory.createJSDocText(trimmedComments), linkEnd ?? start, commentsPos));
                }
                if (parts.length && tags) Debug.assertIsDefined(commentsPos, "having parsed tags implies that the end of the comment span should be set");
                const tagsArray = tags && createNodeArray(tags, tagsPos, tagsEnd);
                return finishNode(factory.createJSDocComment(parts.length ? createNodeArray(parts, start, commentsPos) : trimmedComments.length ? trimmedComments : undefined, tagsArray), start, end);
            }

            function removeLeadingNewlines(comments: string[]) {
                while (comments.length && (comments[0] === "\n" || comments[0] === "\r")) {
                    comments.shift();
                }
            }

            function removeTrailingWhitespace(comments: string[]) {
                while (comments.length) {
                    const trimmed = comments[comments.length - 1].trimEnd();
                    if (trimmed === "") {
                        comments.pop();
                    }
                    else if (trimmed.length < comments[comments.length - 1].length) {
                        comments[comments.length - 1] = trimmed;
                        break;
                    }
                    else {
                        break;
                    }
                }
            }

            function isNextNonwhitespaceTokenEndOfFile(): boolean {
                // We must use infinite lookahead, as there could be any number of newlines :(
                while (true) {
                    nextTokenJSDoc();
                    if (token() === SyntaxKind.EndOfFileToken) {
                        return true;
                    }
                    if (!(token() === SyntaxKind.WhitespaceTrivia || token() === SyntaxKind.NewLineTrivia)) {
                        return false;
                    }
                }
            }

            function skipWhitespace(): void {
                if (token() === SyntaxKind.WhitespaceTrivia || token() === SyntaxKind.NewLineTrivia) {
                    if (lookAhead(isNextNonwhitespaceTokenEndOfFile)) {
                        return; // Don't skip whitespace prior to EoF (or end of comment) - that shouldn't be included in any node's range
                    }
                }
                while (token() === SyntaxKind.WhitespaceTrivia || token() === SyntaxKind.NewLineTrivia) {
                    nextTokenJSDoc();
                }
            }

            function skipWhitespaceOrAsterisk(): string {
                if (token() === SyntaxKind.WhitespaceTrivia || token() === SyntaxKind.NewLineTrivia) {
                    if (lookAhead(isNextNonwhitespaceTokenEndOfFile)) {
                        return ""; // Don't skip whitespace prior to EoF (or end of comment) - that shouldn't be included in any node's range
                    }
                }

                let precedingLineBreak = scanner.hasPrecedingLineBreak();
                let seenLineBreak = false;
                let indentText = "";
                while ((precedingLineBreak && token() === SyntaxKind.AsteriskToken) || token() === SyntaxKind.WhitespaceTrivia || token() === SyntaxKind.NewLineTrivia) {
                    indentText += scanner.getTokenText();
                    if (token() === SyntaxKind.NewLineTrivia) {
                        precedingLineBreak = true;
                        seenLineBreak = true;
                        indentText = "";
                    }
                    else if (token() === SyntaxKind.AsteriskToken) {
                        precedingLineBreak = false;
                    }
                    nextTokenJSDoc();
                }
                return seenLineBreak ? indentText : "";
            }

            function parseTag(margin: number) {
                Debug.assert(token() === SyntaxKind.AtToken);
                const start = scanner.getTokenStart();
                const startState = getPositionState();
                nextTokenJSDoc();

                const tagName = parseJSDocIdentifierName(/*message*/ undefined);
                const indentText = skipWhitespaceOrAsterisk();

                let tag: JSDocTag | undefined;
                switch (tagName.text) {
                    case "author":
                        tag = parseAuthorTag(startState, tagName, margin, indentText);
                        break;
                    case "implements":
                        tag = parseImplementsTag(startState, tagName, margin, indentText);
                        break;
                    case "augments":
                    case "extends":
                        tag = parseAugmentsTag(startState, tagName, margin, indentText);
                        break;
                    case "class":
                    case "constructor":
                        tag = parseSimpleTag(startState, factory.createJSDocClassTag, tagName, margin, indentText);
                        break;
                    case "public":
                        tag = parseSimpleTag(startState, factory.createJSDocPublicTag, tagName, margin, indentText);
                        break;
                    case "private":
                        tag = parseSimpleTag(startState, factory.createJSDocPrivateTag, tagName, margin, indentText);
                        break;
                    case "protected":
                        tag = parseSimpleTag(startState, factory.createJSDocProtectedTag, tagName, margin, indentText);
                        break;
                    // case "readonly":
                    //     tag = parseSimpleTag(startState, factory.createJSDocReadonlyTag, tagName, margin, indentText);
                    //     break;
                    case "override":
                        tag = parseSimpleTag(startState, factory.createJSDocOverrideTag, tagName, margin, indentText);
                        break;
                    case "deprecated":
                        hasDeprecatedTag = true;
                        tag = parseSimpleTag(startState, factory.createJSDocDeprecatedTag, tagName, margin, indentText);
                        break;
                    case "this":
                        tag = parseThisTag(startState, tagName, margin, indentText);
                        break;
                    case "arg":
                    case "argument":
                    case "param":
                        return parseParameterOrPropertyTag(startState, tagName, PropertyLikeParse.Parameter, margin);
                    case "return":
                    case "returns":
                        tag = parseReturnTag(startState, tagName, margin, indentText);
                        break;
                    case "template":
                        tag = parseTemplateTag(startState, tagName, margin, indentText);
                        break;
                    case "type":
                        tag = parseTypeTag(startState, tagName, margin, indentText);
                        break;
                    case "typedef":
                        tag = parseTypedefTag(startState, tagName, margin, indentText);
                        break;
                    case "callback":
                        tag = parseCallbackTag(startState, tagName, margin, indentText);
                        break;
                    case "overload":
                        tag = parseOverloadTag(startState, tagName, margin, indentText);
                        break;
                    case "satisfies":
                        tag = parseSatisfiesTag(startState, tagName, margin, indentText);
                        break;
                    case "see":
                        tag = parseSeeTag(startState, tagName, margin, indentText);
                        break;
                    case "exception":
                    case "throws":
                        tag = parseThrowsTag(startState, tagName, margin, indentText);
                        break;                    
                    default:
                        tag = parseUnknownTag(startState, tagName, margin, indentText);
                        break;
                }
                return tag;
            }

            function parseTrailingTagComments(pos: PositionState, end: number, margin: number, indentText: string) {
                // some tags, like typedef and callback, have already parsed their comments earlier
                if (!indentText) {
                    margin += end - pos.pos;
                }
                return parseTagComments(margin, indentText.slice(margin));
            }

            function parseTagComments(indent: number, initialMargin?: string): string | NodeArray<JSDocComment> | undefined {
                const commentsPos = getNodePos();
                let comments: string[] = [];
                const parts: JSDocComment[] = [];
                let linkEnd;
                let state = JSDocState.BeginningOfLine;
                let margin: number | undefined;
                function pushComment(text: string) {
                    if (!margin) {
                        margin = indent;
                    }
                    comments.push(text);
                    indent += text.length;
                }
                if (initialMargin !== undefined) {
                    // jump straight to saving comments if there is some initial indentation
                    if (initialMargin !== "") {
                        pushComment(initialMargin);
                    }
                    state = JSDocState.SawAsterisk;
                }
                let tok = token() as JSDocSyntaxKind | SyntaxKind.JSDocCommentTextToken;
                loop:
                while (true) {
                    switch (tok) {
                        case SyntaxKind.NewLineTrivia:
                            state = JSDocState.BeginningOfLine;
                            // don't use pushComment here because we want to keep the margin unchanged
                            comments.push(scanner.getTokenText());
                            indent = 0;
                            break;
                        case SyntaxKind.AtToken:
                            scanner.resetTokenState(scanner.getTokenEnd() - 1);
                            break loop;
                        case SyntaxKind.EndOfFileToken:
                            // Done
                            break loop;
                        case SyntaxKind.WhitespaceTrivia:
                            Debug.assert(state !== JSDocState.SavingComments && state !== JSDocState.SavingBackticks, "whitespace shouldn't come from the scanner while saving comment text");
                            const whitespace = scanner.getTokenText();
                            // if the whitespace crosses the margin, take only the whitespace that passes the margin
                            if (margin !== undefined && indent + whitespace.length > margin) {
                                comments.push(whitespace.slice(margin - indent));
                                state = JSDocState.SavingComments;
                            }
                            indent += whitespace.length;
                            break;
                        case SyntaxKind.OpenBraceToken:
                            state = JSDocState.SavingComments;
                            const commentEnd = scanner.getTokenFullStart();
                            const linkStart = scanner.getTokenEnd() - 1;
                            const link = parseJSDocLink(linkStart);
                            if (link) {
                                parts.push(finishNode(factory.createJSDocText(comments.join("")), linkEnd ?? commentsPos, commentEnd));
                                parts.push(link);
                                comments = [];
                                linkEnd = scanner.getTokenEnd();
                            }
                            else {
                                pushComment(scanner.getTokenText());
                            }
                            break;
                        case SyntaxKind.BacktickToken:
                            if (state === JSDocState.SavingBackticks) {
                                state = JSDocState.SavingComments;
                            }
                            else {
                                state = JSDocState.SavingBackticks;
                            }
                            pushComment(scanner.getTokenText());
                            break;
                        case SyntaxKind.JSDocCommentTextToken:
                            if (state !== JSDocState.SavingBackticks) {
                                state = JSDocState.SavingComments; // leading identifiers start recording as well
                            }
                            pushComment(scanner.getTokenValue());
                            break;
                        case SyntaxKind.AsteriskToken:
                            if (state === JSDocState.BeginningOfLine) {
                                // leading asterisks start recording on the *next* (non-whitespace) token
                                state = JSDocState.SawAsterisk;
                                indent += 1;
                                break;
                            }
                            // record the * as a comment
                            // falls through
                        default:
                            if (state !== JSDocState.SavingBackticks) {
                                state = JSDocState.SavingComments; // leading identifiers start recording as well
                            }
                            pushComment(scanner.getTokenText());
                            break;
                    }
                    if (state === JSDocState.SavingComments || state === JSDocState.SavingBackticks) {
                        tok = nextJSDocCommentTextToken(state === JSDocState.SavingBackticks);
                    }
                    else {
                        tok = nextTokenJSDoc();
                    }
                }

                removeLeadingNewlines(comments);
                const trimmedComments = comments.join("").trimEnd();
                if (parts.length) {
                    if (trimmedComments.length) {
                        parts.push(finishNode(factory.createJSDocText(trimmedComments), linkEnd ?? commentsPos));
                    }
                    return createNodeArray(parts, commentsPos, scanner.getTokenEnd());
                }
                else if (trimmedComments.length) {
                    return trimmedComments;
                }
            }

            function parseJSDocLink(start: number) {
                const linkType = tryParse(parseJSDocLinkPrefix);
                if (!linkType) {
                    return undefined;
                }
                nextTokenJSDoc(); // start at token after link, then skip any whitespace
                skipWhitespace();
                const name = parseJSDocLinkName();
                const text = [];
                while (token() !== SyntaxKind.CloseBraceToken && token() !== SyntaxKind.NewLineTrivia && token() !== SyntaxKind.EndOfFileToken) {
                    text.push(scanner.getTokenText());
                    nextTokenJSDoc();
                }
                const create = linkType === "link" ? factory.createJSDocLink
                    : linkType === "linkcode" ? factory.createJSDocLinkCode
                    : factory.createJSDocLinkPlain;
                return finishNode(create(name, text.join("")), start, scanner.getTokenEnd());
            }

            function parseJSDocLinkName() {
                if (tokenIsIdentifierOrKeyword(token())) {
                    const pos = getPositionState();;

                    let name: EntityName | JSDocMemberName = parseIdentifierName();
                    while (parseOptional(SyntaxKind.DotToken)) {
                        name = finishNode(factory.createQualifiedName(name, parseIdentifierName()), pos);
                    }                    
                    return name;
                }
                return undefined;
            }

            function parseJSDocLinkPrefix() {
                skipWhitespaceOrAsterisk();
                if (
                    token() === SyntaxKind.OpenBraceToken
                    && nextTokenJSDoc() === SyntaxKind.AtToken
                    && tokenIsIdentifierOrKeyword(nextTokenJSDoc())
                ) {
                    const kind = scanner.getTokenValue();
                    if (isJSDocLinkTag(kind)) return kind;
                }
            }

            function isJSDocLinkTag(kind: string) {
                return kind === "link" || kind === "linkcode" || kind === "linkplain";
            }

            function parseUnknownTag(start: PositionState, tagName: Identifier, indent: number, indentText: string) {
                return finishNode(factory.createJSDocUnknownTag(tagName, parseTrailingTagComments(start, getNodePos(), indent, indentText)), start);
            }

            function addTag(tag: JSDocTag | undefined): void {
                if (!tag) {
                    return;
                }
                if (!tags) {
                    tags = [tag];
                    tagsPos = tag.pos;
                }
                else {
                    tags.push(tag);
                }
                tagsEnd = tag.end;
            }

            function tryParseTypeExpression(): JSDocTypeExpression | undefined {
                skipWhitespaceOrAsterisk();
                return token() === SyntaxKind.OpenBraceToken ? parseJSDocTypeExpression() : undefined;
            }

            function parseBracketNameInPropertyAndParamTag(): { name: EntityName; isBracketed: boolean; } {
                // Looking for something like '[foo]', 'foo', '[foo.bar]' or 'foo.bar'
                const isBracketed = parseOptionalJsdoc(SyntaxKind.OpenBracketToken);
                if (isBracketed) {
                    skipWhitespace();
                }
                // a markdown-quoted name: `arg` is not legal jsdoc, but occurs in the wild
                const isBackquoted = parseOptionalJsdoc(SyntaxKind.BacktickToken);
                const name = parseJSDocEntityName();
                if (isBackquoted) {
                    parseExpectedTokenJSDoc(SyntaxKind.BacktickToken);
                }
                if (isBracketed) {
                    skipWhitespace();
                    // May have an optional default, e.g. '[foo = 42]'
                    if (parseOptionalToken(SyntaxKind.EqualsToken)) {
                        parseExpression();
                    }

                    parseExpected(SyntaxKind.CloseBracketToken);
                }

                return { name, isBracketed };
            }

            function isObjectOrObjectArrayTypeReference(node: TypeNode): boolean {
                switch (node.kind) {
                    case SyntaxKind.ObjectKeyword:
                        return true;
                    case SyntaxKind.ArrayType:
                        return isObjectOrObjectArrayTypeReference((node as ArrayTypeNode).elementType);
                    default:
                        return isTypeReferenceNode(node) && isIdentifierNode(node.typeName) && node.typeName.text === "Object" && !node.typeArguments;
                }
            }

            function parseParameterOrPropertyTag(start: PositionState, tagName: Identifier, target: PropertyLikeParse, indent: number): JSDocParameterTag | JSDocPropertyTag {
                let typeExpression = tryParseTypeExpression();
                let isNameFirst = !typeExpression;
                skipWhitespaceOrAsterisk();

                const { name, isBracketed } = parseBracketNameInPropertyAndParamTag();
                const indentText = skipWhitespaceOrAsterisk();

                if (isNameFirst && !lookAhead(parseJSDocLinkPrefix)) {
                    typeExpression = tryParseTypeExpression();
                }

                const comment = parseTrailingTagComments(start, getNodePos(), indent, indentText);

                const nestedTypeLiteral = parseNestedTypeLiteral(typeExpression, name, target, indent);
                if (nestedTypeLiteral) {
                    typeExpression = nestedTypeLiteral;
                    isNameFirst = true;
                }
                const result = target === PropertyLikeParse.Property
                    ? factory.createJSDocPropertyTag(tagName, name, isBracketed, typeExpression, isNameFirst, comment)
                    : factory.createJSDocParameterTag(tagName, name, isBracketed, typeExpression, isNameFirst, comment);
                return finishNode(result, start);
            }

            function parseNestedTypeLiteral(typeExpression: JSDocTypeExpression | undefined, name: EntityName, target: PropertyLikeParse, indent: number) {
                if (typeExpression?.type && isObjectOrObjectArrayTypeReference(typeExpression.type)) {
                    const pos = getPositionState();;
                    let child: JSDocPropertyLikeTag | JSDocTypeTag | JSDocTemplateTag | JSDocThisTag | false;
                    let children: JSDocPropertyLikeTag[] | undefined;
                    while (child = tryParse(() => parseChildParameterOrPropertyTag(target, indent, name))) {
                        if (child.kind === SyntaxKind.JSDocParameterTag || child.kind === SyntaxKind.JSDocPropertyTag) {
                            children = append(children, child);
                        }
                        else if (child.kind === SyntaxKind.JSDocTemplateTag) {
                            parseErrorAtRange(child.tagName, child.originFilename, Diagnostics.A_JSDoc_template_tag_may_not_follow_a_typedef_callback_or_overload_tag);
                        }
                    }
                    if (children) {
                        const literal = finishNode(factory.createJSDocTypeLiteral(children, typeExpression.type.kind === SyntaxKind.ArrayType), pos);
                        return finishNode(factory.createJSDocTypeExpression(literal), pos);
                    }
                }
            }

            function parseReturnTag(start: PositionState, tagName: Identifier, indent: number, indentText: string): JSDocReturnTag {
                if (some(tags, isJSDocReturnTag)) {
                    parseErrorAt(tagName.pos, scanner.getTokenStart(), scanner.getFileName(), Diagnostics._0_tag_already_specified, (tagName.text));
                }

                const typeExpression = tryParseTypeExpression();
                return finishNode(factory.createJSDocReturnTag(tagName, typeExpression, parseTrailingTagComments(start, getNodePos(), indent, indentText)), start);
            }

            function parseTypeTag(start: PositionState, tagName: Identifier, indent?: number, indentText?: string): JSDocTypeTag {
                if (some(tags, isJSDocTypeTag)) {
                    parseErrorAt(tagName.pos, scanner.getTokenStart(), scanner.getFileName(), Diagnostics._0_tag_already_specified, (tagName.text));
                }

                const typeExpression = parseJSDocTypeExpression(/*mayOmitBraces*/ true);
                const comments = indent !== undefined && indentText !== undefined ? parseTrailingTagComments(start, getNodePos(), indent, indentText) : undefined;
                return finishNode(factory.createJSDocTypeTag(tagName, typeExpression, comments), start);
            }

            function parseSeeTag(start: PositionState, tagName: Identifier, indent?: number, indentText?: string): JSDocSeeTag {
                const isMarkdownOrJSDocLink = token() === SyntaxKind.OpenBracketToken
                    || lookAhead(() => nextTokenJSDoc() === SyntaxKind.AtToken && tokenIsIdentifierOrKeyword(nextTokenJSDoc()) && isJSDocLinkTag(scanner.getTokenValue()));
                const nameExpression = isMarkdownOrJSDocLink ? undefined : parseJSDocNameReference();
                const comments = indent !== undefined && indentText !== undefined ? parseTrailingTagComments(start, getNodePos(), indent, indentText) : undefined;
                return finishNode(factory.createJSDocSeeTag(tagName, nameExpression, comments), start);
            }

            function parseThrowsTag(start: PositionState, tagName: Identifier, indent: number, indentText: string): JSDocThrowsTag {
                const typeExpression = tryParseTypeExpression();
                const comment = parseTrailingTagComments(start, getNodePos(), indent, indentText);
                return finishNode(factory.createJSDocThrowsTag(tagName, typeExpression, comment), start);
            }

            function parseAuthorTag(start: PositionState, tagName: Identifier, indent: number, indentText: string): JSDocAuthorTag {
                const commentStart = getPositionState();
                const textOnly = parseAuthorNameAndEmail();
                let commentEnd = scanner.getTokenFullStart();
                const comments = parseTrailingTagComments(start, commentEnd, indent, indentText);
                if (!comments) {
                    commentEnd = scanner.getTokenFullStart();
                }
                const allParts = typeof comments !== "string"
                    ? createNodeArray(concatenate([finishNode(textOnly, commentStart.pos, commentEnd)], comments) as JSDocComment[], commentStart) // cast away readonly
                    : textOnly.text + comments;
                return finishNode(factory.createJSDocAuthorTag(tagName, allParts), start);
            }

            function parseAuthorNameAndEmail(): JSDocText {
                const comments: string[] = [];
                let inEmail = false;
                let token = scanner.getToken();
                while (token !== SyntaxKind.EndOfFileToken && token !== SyntaxKind.NewLineTrivia) {
                    if (token === SyntaxKind.LessThanToken) {
                        inEmail = true;
                    }
                    else if (token === SyntaxKind.AtToken && !inEmail) {
                        break;
                    }
                    else if (token === SyntaxKind.GreaterThanToken && inEmail) {
                        comments.push(scanner.getTokenText());
                        scanner.resetTokenState(scanner.getTokenEnd());
                        break;
                    }
                    comments.push(scanner.getTokenText());
                    token = nextTokenJSDoc();
                }

                return factory.createJSDocText(comments.join(""));
            }

            function parseImplementsTag(start: PositionState, tagName: Identifier, margin: number, indentText: string): JSDocImplementsTag {
                const className = parseExpressionWithTypeArgumentsForAugments();
                return finishNode(factory.createJSDocImplementsTag(tagName, className, parseTrailingTagComments(start, getNodePos(), margin, indentText)), start);
            }

            function parseAugmentsTag(start: PositionState, tagName: Identifier, margin: number, indentText: string): JSDocAugmentsTag {
                const className = parseExpressionWithTypeArgumentsForAugments();
                return finishNode(factory.createJSDocAugmentsTag(tagName, className, parseTrailingTagComments(start, getNodePos(), margin, indentText)), start);
            }

            function parseSatisfiesTag(start: PositionState, tagName: Identifier, margin: number, indentText: string): JSDocSatisfiesTag {
                const typeExpression = parseJSDocTypeExpression(/*mayOmitBraces*/ false);
                const comments = margin !== undefined && indentText !== undefined ? parseTrailingTagComments(start, getNodePos(), margin, indentText) : undefined;
                return finishNode(factory.createJSDocSatisfiesTag(tagName, typeExpression, comments), start);
            }            

            function parseExpressionWithTypeArgumentsForAugments(): ExpressionWithTypeArguments & { expression: Identifier | PropertyAccessEntityNameExpression; } {
                const usedBrace = parseOptional(SyntaxKind.OpenBraceToken);
                const pos = getPositionState();;
                const expression = parsePropertyAccessEntityNameExpression();
                scanner.setSkipJsDocLeadingAsterisks(true);
                const typeArguments = undefined;// tryParseTypeArguments();
                scanner.setSkipJsDocLeadingAsterisks(false);
                const node = factory.createExpressionWithTypeArguments(expression, typeArguments) as ExpressionWithTypeArguments & { expression: Identifier | PropertyAccessEntityNameExpression; };
                const res = finishNode(node, pos);
                if (usedBrace) {
                    parseExpected(SyntaxKind.CloseBraceToken);
                }
                return res;
            }

            function parsePropertyAccessEntityNameExpression() {
                const pos = getPositionState();;
                let node: Identifier | PropertyAccessEntityNameExpression = parseJSDocIdentifierName();
                while (parseOptional(SyntaxKind.DotToken)) {
                    const name = parseJSDocIdentifierName();
                    node = finishNode(factoryCreatePropertyAccessExpression(node, name), pos) as PropertyAccessEntityNameExpression;
                }
                return node;
            }

            function parseSimpleTag(start: PositionState, createTag: (tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>) => JSDocTag, tagName: Identifier, margin: number, indentText: string): JSDocTag {
                return finishNode(createTag(tagName, parseTrailingTagComments(start, getNodePos(), margin, indentText)), start);
            }

            function parseThisTag(start: PositionState, tagName: Identifier, margin: number, indentText: string): JSDocThisTag {
                const typeExpression = parseJSDocTypeExpression(/*mayOmitBraces*/ true);
                skipWhitespace();
                return finishNode(factory.createJSDocThisTag(tagName, typeExpression, parseTrailingTagComments(start, getNodePos(), margin, indentText)), start);
            }
           
            function parseTypedefTag(start: PositionState, tagName: Identifier, indent: number, indentText: string): JSDocTypedefTag {
                let typeExpression: JSDocTypeExpression | JSDocTypeLiteral | undefined = tryParseTypeExpression();
                skipWhitespaceOrAsterisk();

                const fullName = parseJSDocTypeNameWithNamespace();
                skipWhitespace();
                let comment = parseTagComments(indent);

                let end: number | undefined;
                if (!typeExpression || isObjectOrObjectArrayTypeReference(typeExpression.type)) {
                    let child: JSDocTypeTag | JSDocPropertyTag | JSDocTemplateTag | false;
                    let childTypeTag: JSDocTypeTag | undefined;
                    let jsDocPropertyTags: JSDocPropertyTag[] | undefined;
                    let hasChildren = false;
                    while (child = tryParse(() => parseChildPropertyTag(indent))) {
                        if (child.kind === SyntaxKind.JSDocTemplateTag) {
                            break;
                        }
                        hasChildren = true;
                        if (child.kind === SyntaxKind.JSDocTypeTag) {
                            if (childTypeTag) {
                                const lastError = parseErrorAtCurrentToken(Diagnostics.A_JSDoc_typedef_comment_may_not_contain_multiple_type_tags);
                                if (lastError) {
                                    addRelatedInfo(lastError, createDetachedDiagnostic(fileName, sourceText, 0, 0, Diagnostics.The_tag_was_first_specified_here));
                                }
                                break;
                            }
                            else {
                                childTypeTag = child;
                            }
                        }
                        else {
                            jsDocPropertyTags = append(jsDocPropertyTags, child);
                        }
                    }
                    if (hasChildren) {
                        const isArrayType = typeExpression && typeExpression.type.kind === SyntaxKind.ArrayType;
                        const jsdocTypeLiteral = factory.createJSDocTypeLiteral(jsDocPropertyTags, isArrayType);
                        typeExpression = childTypeTag && childTypeTag.typeExpression && !isObjectOrObjectArrayTypeReference(childTypeTag.typeExpression.type) ?
                            childTypeTag.typeExpression :
                            finishNode(jsdocTypeLiteral, start);
                        end = typeExpression.end;
                    }
                }

                // Only include the characters between the name end and the next token if a comment was actually parsed out - otherwise it's just whitespace
                end = end || comment !== undefined ?
                    getNodePos() :
                    (fullName ?? typeExpression ?? tagName).end;

                if (!comment) {
                    comment = parseTrailingTagComments(start, end, indent, indentText);
                }

                const typedefTag = factory.createJSDocTypedefTag(tagName, typeExpression, fullName, comment);
                return finishNode(typedefTag, start.pos, end);
            }           

            function parseCallbackTagParameters(indent: number) {
                const pos = getPositionState();;
                let child: JSDocParameterTag | JSDocTemplateTag | false;
                let parameters: JSDocParameterTag[] | undefined;
                while (child = tryParse(() => parseChildParameterOrPropertyTag(PropertyLikeParse.CallbackParameter, indent) as JSDocParameterTag | JSDocTemplateTag)) {
                    if (child.kind === SyntaxKind.JSDocTemplateTag) {
                        parseErrorAtRange(child.tagName, child.originFilename, Diagnostics.A_JSDoc_template_tag_may_not_follow_a_typedef_callback_or_overload_tag);
                        break;
                    }
                    parameters = append(parameters, child);
                }
                return createNodeArray(parameters || [], pos);
            }

            function parseJSDocSignature(start: PositionState, indent: number): JSDocSignature {
                const parameters = parseCallbackTagParameters(indent);
                const returnTag = tryParse(() => {
                    if (parseOptionalJsdoc(SyntaxKind.AtToken)) {
                        const tag = parseTag(indent);
                        if (tag && tag.kind === SyntaxKind.JSDocReturnTag) {
                            return tag as JSDocReturnTag;
                        }
                    }
                });
                return finishNode(factory.createJSDocSignature(/*typeParameters*/ undefined, parameters, returnTag), start);
            }

            function parseJSDocTypeNameWithNamespace(nested?: boolean) {
                const start = scanner.getTokenStart();
                if (!tokenIsIdentifierOrKeyword(token())) {
                    return undefined;
                }
                const typeNameOrNamespaceName = parseJSDocIdentifierName();
                // if (parseOptional(SyntaxKind.DotToken)) {
                //     const body = parseJSDocTypeNameWithNamespace(/*nested*/ true);
                //     const jsDocNamespaceNode = factory.createModuleDeclaration(
                //         /*modifiers*/ undefined,
                //         typeNameOrNamespaceName,
                //         body,
                //         nested ? NodeFlags.NestedNamespace : undefined,
                //     ) as JSDocNamespaceDeclaration;
                //     return finishNode(jsDocNamespaceNode, start);
                // }

                if (nested) {
                    (typeNameOrNamespaceName as Mutable<Identifier>).flags |= NodeFlags.IdentifierIsInJSDocNamespace;
                }
                return typeNameOrNamespaceName;
            }

            function parseCallbackTag(start: PositionState, tagName: Identifier, indent: number, indentText: string): JSDocCallbackTag {
                const fullName = parseJSDocTypeNameWithNamespace();
                skipWhitespace();
                let comment = parseTagComments(indent);
                const typeExpression = parseJSDocSignature(start, indent);
                if (!comment) {
                    comment = parseTrailingTagComments(start, getNodePos(), indent, indentText);
                }
                const end = comment !== undefined ? getNodePos() : typeExpression.end;
                return finishNode(factory.createJSDocCallbackTag(tagName, typeExpression, fullName, comment), start.pos, end);
            }

            function parseOverloadTag(start: PositionState, tagName: Identifier, indent: number, indentText: string): JSDocOverloadTag {
                skipWhitespace();
                let comment = parseTagComments(indent);
                const typeExpression = parseJSDocSignature(start, indent);
                if (!comment) {
                    comment = parseTrailingTagComments(start, getNodePos(), indent, indentText);
                }
                const end = comment !== undefined ? getNodePos() : typeExpression.end;
                return finishNode(factory.createJSDocOverloadTag(tagName, typeExpression, comment), start.pos, end);
            }

            function escapedTextsEqual(a: EntityName, b: EntityName): boolean {
                while (!isIdentifierNode(a) || !isIdentifierNode(b)) {
                    if (!isIdentifierNode(a) && !isIdentifierNode(b) && a.right.text === b.right.text) {
                        a = a.left;
                        b = b.left;
                    }
                    else {
                        return false;
                    }
                }
                return a.text === b.text;
            }

            function parseChildPropertyTag(indent: number) {
                return parseChildParameterOrPropertyTag(PropertyLikeParse.Property, indent) as JSDocTypeTag | JSDocPropertyTag | JSDocTemplateTag | false;
            }

            function parseChildParameterOrPropertyTag(target: PropertyLikeParse, indent: number, name?: EntityName): JSDocTypeTag | JSDocPropertyTag | JSDocParameterTag | JSDocTemplateTag | JSDocThisTag | false {
                let canParseTag = true;
                let seenAsterisk = false;
                while (true) {
                    switch (nextTokenJSDoc()) {
                        case SyntaxKind.AtToken:
                            if (canParseTag) {
                                const child = tryParseChildTag(target, indent);
                                if (
                                    child && (child.kind === SyntaxKind.JSDocParameterTag || child.kind === SyntaxKind.JSDocPropertyTag) &&
                                    name && (isIdentifierNode(child.name) || !escapedTextsEqual(name, child.name.left))
                                ) {
                                    return false;
                                }
                                return child;
                            }
                            seenAsterisk = false;
                            break;
                        case SyntaxKind.NewLineTrivia:
                            canParseTag = true;
                            seenAsterisk = false;
                            break;
                        case SyntaxKind.AsteriskToken:
                            if (seenAsterisk) {
                                canParseTag = false;
                            }
                            seenAsterisk = true;
                            break;
                        case SyntaxKind.Identifier:
                            canParseTag = false;
                            break;
                        case SyntaxKind.EndOfFileToken:
                            return false;
                    }
                }
            }

            function tryParseChildTag(target: PropertyLikeParse, indent: number): JSDocTypeTag | JSDocPropertyTag | JSDocParameterTag | JSDocTemplateTag | JSDocThisTag | false {
                Debug.assert(token() === SyntaxKind.AtToken);
                const start = getPositionState();
                nextTokenJSDoc();

                const tagName = parseJSDocIdentifierName();
                const indentText = skipWhitespaceOrAsterisk();
                let t: PropertyLikeParse;
                switch (tagName.text) {
                    case "type":
                        return target === PropertyLikeParse.Property && parseTypeTag(start, tagName);
                    case "prop":
                    case "property":
                        t = PropertyLikeParse.Property;
                        break;
                    case "arg":
                    case "argument":
                    case "param":
                        t = PropertyLikeParse.Parameter | PropertyLikeParse.CallbackParameter;
                        break;
                    case "template":
                        return parseTemplateTag(start, tagName, indent, indentText);
                    case "this":
                        return parseThisTag(start, tagName, indent, indentText);
                    default:
                        return false;
                }
                if (!(target & t)) {
                    return false;
                }
                return parseParameterOrPropertyTag(start, tagName, target, indent);
            }

            function parseTemplateTagTypeParameter() {
                const typeParameterPos = getPositionState();
                const isBracketed = parseOptionalJsdoc(SyntaxKind.OpenBracketToken);
                if (isBracketed) {
                    skipWhitespace();
                }

                const modifiers = parseModifiers(/*allowDecorators*/ false, /*permitConstAsModifier*/ true);
                const name = parseJSDocIdentifierName(Diagnostics.Unexpected_token_A_type_parameter_name_was_expected_without_curly_braces);
                let defaultType: TypeNode | undefined;
                if (isBracketed) {
                    skipWhitespace();
                    parseExpected(SyntaxKind.EqualsToken);
                    defaultType = doInsideOfContext(NodeFlags.JSDoc, parseJSDocType);
                    parseExpected(SyntaxKind.CloseBracketToken);
                }

                if (nodeIsMissing(name)) {
                    return undefined;
                }
                return finishNode(factory.createTypeParameterDeclaration(modifiers, name, /*constraint*/ undefined, defaultType), typeParameterPos);
            }

            function parseTemplateTagTypeParameters() {
                const pos = getPositionState();;
                const typeParameters = [];
                do {
                    skipWhitespace();
                    const node = parseTemplateTagTypeParameter();
                    if (node !== undefined) {
                        typeParameters.push(node);
                    }
                    skipWhitespaceOrAsterisk();
                }
                while (parseOptionalJsdoc(SyntaxKind.CommaToken));
                return createNodeArray(typeParameters, pos);
            }

            function parseTemplateTag(start: PositionState, tagName: Identifier, indent: number, indentText: string): JSDocTemplateTag {
                // The template tag looks like one of the following:
                //   @template T,U,V
                //   @template {Constraint} T
                //
                // According to the [closure docs](https://github.com/google/closure-compiler/wiki/Generic-Types#multiple-bounded-template-types):
                //   > Multiple bounded generics cannot be declared on the same line. For the sake of clarity, if multiple templates share the same
                //   > type bound they must be declared on separate lines.
                //
                // TODO: Determine whether we should enforce this in the checker.
                // TODO: Consider moving the `constraint` to the first type parameter as we could then remove `getEffectiveConstraintOfTypeParameter`.
                // TODO: Consider only parsing a single type parameter if there is a constraint.
                const constraint = token() === SyntaxKind.OpenBraceToken ? parseJSDocTypeExpression() : undefined;
                const typeParameters = parseTemplateTagTypeParameters();
                return finishNode(factory.createJSDocTemplateTag(tagName, constraint, typeParameters, parseTrailingTagComments(start, getNodePos(), indent, indentText)), start);
            }

            function parseOptionalJsdoc(t: JSDocSyntaxKind): boolean {
                if (token() === t) {
                    nextTokenJSDoc();
                    return true;
                }
                return false;
            }

            function parseJSDocEntityName(): EntityName {
                const entityPos = getPositionState();
                let entity: EntityName = parseJSDocIdentifierName();
                if (parseOptional(SyntaxKind.OpenBracketToken)) {
                    parseExpected(SyntaxKind.CloseBracketToken);
                    // Note that y[] is accepted as an entity name, but the postfix brackets are not saved for checking.
                    // Technically usejsdoc.org requires them for specifying a property of a type equivalent to Array<{ x: ...}>
                    // but it's not worth it to enforce that restriction.
                }
                while (parseOptional(SyntaxKind.DotToken)) {
                    const name = parseJSDocIdentifierName();
                    if (parseOptional(SyntaxKind.OpenBracketToken)) {
                        parseExpected(SyntaxKind.CloseBracketToken);
                    }
                    entity = createQualifiedName(entity, name, entityPos);
                }
                return entity;
            }

            function parseJSDocIdentifierName(message?: DiagnosticMessage): Identifier {
                if (!tokenIsIdentifierOrKeyword(token())) {
                    return createMissingNode<Identifier>(SyntaxKind.Identifier, /*reportAtCurrentPosition*/ !message, message || Diagnostics.Identifier_expected);
                }

                identifierCount++;
                const start = scanner.getTokenStart();
                const end = scanner.getTokenEnd();
                const originalKeywordKind = token();
                const text = internIdentifier(scanner.getTokenValue());
                const result = finishNode(factoryCreateIdentifier(text, originalKeywordKind), start, end);
                nextTokenJSDoc();
                return result;
            }
        }
    }
}

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
    [SyntaxKind.CatchStatement]: function forEachChildInCatchStatement<T>(node: CatchStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {        
        return visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.block);
    },
    [SyntaxKind.Parameter]: function forEachChildInParameter<T>(node: ParameterDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.ampToken) ||
            visitNode(cbNode, node.dotDotDotToken) ||
            visitNode(cbNode, node.initializer);
    },
    [SyntaxKind.PropertyDeclaration]: function forEachChildInPropertyDeclaration<T>(node: PropertyDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            // visitNode(cbNode, node.questionToken) ||
            // visitNode(cbNode, node.exclamationToken) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.initializer);
    },
    [SyntaxKind.PropertyAssignment]: function forEachChildInPropertyAssignment<T>(node: PropertyAssignment, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||            
            visitNode(cbNode, node.initializer);
    },   
    [SyntaxKind.PropertySignature]: function forEachChildInPropertySignature<T>(node: PropertySignature, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            // visitNode(cbNode, node.questionToken) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.initializer);
    }, 
    [SyntaxKind.MissingDeclaration]: function forEachChildInMissingDeclaration<T>(node: MissingDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers);
    },
    [SyntaxKind.CommaListExpression]: function forEachChildInCommaListExpression<T>(node: CommaListExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.elements);
    },
    [SyntaxKind.EvaluateExpression]: function forEachChildInEvaluateExpression<T>(node: EvaluateExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNodes(cbNode, cbNodes, node.arguments);
    },    
    [SyntaxKind.NewExpression]: forEachChildInCallOrNewExpression,
    [SyntaxKind.NewStructExpression]: function forEachChildInNewStructExpression<T>(node: NewStructExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.type) ||
            visitNodes(cbNode, cbNodes, node.arguments);
    },
    [SyntaxKind.StructDeclaration]: function forEachChildInStructDeclaration<T>(node: StructDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.heritageName) ||
            visitNode(cbNode, node.type);
            //visitNodes(cbNode, cbNodes, node.members);
    },
    [SyntaxKind.TypeLiteral]: function forEachChildInTypeLiteral<T>(node: TypeLiteralNode, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.members);
    },
    [SyntaxKind.FunctionDeclaration]: function forEachChildInFunctionDeclaration<T>(node: FunctionDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.asteriskToken) ||
            visitNode(cbNode, node.name) ||            
            visitNodes(cbNode, cbNodes, node.parameters) ||            
            visitNode(cbNode, node.body);
    },
    [SyntaxKind.FunctionExpression]: function forEachChildInFunctionExpression<T>(node: FunctionExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            // visitNode(cbNode, node.asteriskToken) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.name) ||            
            visitNodes(cbNode, cbNodes, node.parameters) ||            
            visitNode(cbNode, node.body);
    },
    [SyntaxKind.IncludeDirective]: function forEachChildInIncludeDirective<T>(node: IncludeDirective, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.content);
    },
    [SyntaxKind.DefineDirective]: function forEachChildInDefineDirective<T>(node: DefineDirective, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.name) ||
            visitNodes(cbNode, cbNodes, node.arguments);
    },
    [SyntaxKind.InlineClosureExpression]: function forEachChildInInlineClosureExpression<T>(node: InlineClosureExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.body);
    },
    [SyntaxKind.InheritDeclaration]: function forEachChildInInheritDeclaration<T>(node: InheritDeclaration, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.inheritClause);
    },
    [SyntaxKind.UnionType]: function forEachChildInUnionOrIntersectionType<T>(node: UnionTypeNode, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.types);
    },
    [SyntaxKind.StructType]: function forEachChildInStructType<T>(node: StructTypeNode, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.typeName);
    },
    [SyntaxKind.CloneObjectExpression]: forEachChildInCallOrNewExpression,
    [SyntaxKind.ElementAccessExpression]: function forEachChildInElementAccessExpression<T>(node: ElementAccessExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||            
            visitNode(cbNode, node.argumentExpression);
    },
    [SyntaxKind.RangeExpression]: function forEachChildInRangeExpression<T>(node: RangeExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.left) ||            
            visitNode(cbNode, node.right);
    },
    [SyntaxKind.CallExpression]: forEachChildInCallOrNewExpression,
    [SyntaxKind.PropertyAccessExpression]: function forEachChildInPropertyAccessExpression<T>(node: PropertyAccessExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||            
            visitNode(cbNode, node.name);
    },
    [SyntaxKind.SuperAccessExpression]: function forEachChildInSuperAccessExpression<T>(node: SuperAccessExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.namespace) ||
            visitNode(cbNode, node.name);
    },
    [SyntaxKind.PostfixUnaryExpression]: function forEachChildInPostfixUnaryExpression<T>(node: PostfixUnaryExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.operand);
    },
    [SyntaxKind.TypeAssertionExpression]: function forEachChildInTypeAssertionExpression<T>(node: TypeAssertion, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.expression);
    },
    [SyntaxKind.ParenthesizedExpression]: function forEachChildInParenthesizedExpression<T>(node: ParenthesizedExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [SyntaxKind.PrefixUnaryExpression]: function forEachChildInPrefixUnaryExpression<T>(node: PrefixUnaryExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.operand);        
    },
    [SyntaxKind.BinaryExpression]: function forEachChildInBinaryExpression<T>(node: BinaryExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.left) ||
            visitNode(cbNode, node.operatorToken) ||
            visitNode(cbNode, node.right);
    },
    [SyntaxKind.CatchExpression]: function forEachChildInCatchExpression<T>(node: CatchExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.modifier) ||
            visitNode(cbNode, node.modifierExpression) ||
            visitNode(cbNode, node.block);
    },
    [SyntaxKind.SpreadElement]: function forEachChildInSpreadElement<T>(node: SpreadElement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
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
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.declarationList);
    },
    [SyntaxKind.VariableDeclarationList]: function forEachChildInVariableDeclarationList<T>(node: VariableDeclarationList, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.declarations)
            
    },
    [SyntaxKind.VariableDeclaration]: function forEachChildInVariableDeclaration<T>(node: VariableDeclaration, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.name) ||                         
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
    [SyntaxKind.ForEachStatement]: function forEachChildInForInStatement<T>(node: ForEachStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.initializer) ||
            visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.statement);
    },    
    [SyntaxKind.ContinueStatement]: forEachChildInContinueOrBreakStatement,
    [SyntaxKind.BreakStatement]: forEachChildInContinueOrBreakStatement,
    [SyntaxKind.ReturnStatement]: function forEachChildInReturnStatement<T>(node: ReturnStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },    
    [SyntaxKind.SwitchStatement]: function forEachChildInSwitchStatement<T>(node: SwitchStatement, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNodes(cbNode, cbNodes, node.preBlock) ||
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
    [SyntaxKind.CastExpression]: function forEachChildInCastExpression<T>(node: CastExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.expression);
    },
    [SyntaxKind.ArrayLiteralExpression]: function forEachChildInArrayLiteralExpression<T>(node: ArrayLiteralExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.elements);
    },
    [SyntaxKind.LambdaIdentifierExpression]: function forEachChildInLambdaIdentifierExpression<T>(node: LambdaIdentifierExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.name);
    },
    [SyntaxKind.LambdaOperatorExpression]: function forEachChildInLambdaOperatorExpression<T>(node: LambdaOperatorExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.operator);
    },
    [SyntaxKind.ArrayType]: function forEachChildInArrayType<T>(node: ArrayTypeNode, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.elementType);
    },
    [SyntaxKind.MappingLiteralExpression]: function forEachChildInMappingLiteralExpression<T>(node: MappingLiteralExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.initializer) ||
            visitNodes(cbNode, cbNodes, node.elements);
    },
    [SyntaxKind.MappingEntryExpression]: function forEachChildInMappingEntryExpression<T>(node: MappingEntryExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.name) ||
            visitNodes(cbNode, cbNodes, node.elements);
    },
    [SyntaxKind.JSDocTypeExpression]: forEachChildInOptionalRestOrJSDocParameterModifier,                
    [SyntaxKind.JSDoc]: function forEachChildInJSDoc<T>(node: JSDoc, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment))
            || visitNodes(cbNode, cbNodes, node.tags);
    },
    [SyntaxKind.JSDocSeeTag]: function forEachChildInJSDocSeeTag<T>(node: JSDocSeeTag, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName) ||
            visitNode(cbNode, node.name) ||
            (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
    },
    [SyntaxKind.JSDocNameReference]: function forEachChildInJSDocNameReference<T>(node: JSDocNameReference, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.name);
    },
    [SyntaxKind.JSDocMemberName]: function forEachChildInJSDocMemberName<T>(node: JSDocMemberName, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.left) ||
            visitNode(cbNode, node.right);
    },
    [SyntaxKind.JSDocParameterTag]: forEachChildInJSDocParameterOrPropertyTag,
    [SyntaxKind.JSDocPropertyTag]: forEachChildInJSDocParameterOrPropertyTag,
    [SyntaxKind.JSDocAuthorTag]: function forEachChildInJSDocAuthorTag<T>(node: JSDocAuthorTag, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName) ||
            (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
    },
    [SyntaxKind.JSDocImplementsTag]: function forEachChildInJSDocImplementsTag<T>(node: JSDocImplementsTag, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName) ||
            visitNode(cbNode, node.class) ||
            (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
    },
    [SyntaxKind.JSDocAugmentsTag]: function forEachChildInJSDocAugmentsTag<T>(node: JSDocAugmentsTag, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName) ||
            visitNode(cbNode, node.class) ||
            (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
    },
    [SyntaxKind.JSDocTemplateTag]: function forEachChildInJSDocTemplateTag<T>(node: JSDocTemplateTag, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName) ||
            visitNode(cbNode, node.constraint) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
    },
    [SyntaxKind.JSDocTypedefTag]: function forEachChildInJSDocTypedefTag<T>(node: JSDocTypedefTag, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName) ||
            (node.typeExpression &&
                    node.typeExpression.kind === SyntaxKind.JSDocTypeExpression
                ? visitNode(cbNode, node.typeExpression) ||
                    visitNode(cbNode, node.fullName) ||
                    (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment))
                : visitNode(cbNode, node.fullName) ||
                    visitNode(cbNode, node.typeExpression) ||
                    (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment)));
    },
    [SyntaxKind.JSDocCallbackTag]: function forEachChildInJSDocCallbackTag<T>(node: JSDocCallbackTag, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName) ||
            visitNode(cbNode, node.fullName) ||
            visitNode(cbNode, node.typeExpression) ||
            (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
    },
    [SyntaxKind.JSDocReturnTag]: forEachChildInJSDocTypeLikeTag,
    [SyntaxKind.JSDocTypeTag]: forEachChildInJSDocTypeLikeTag,
    [SyntaxKind.JSDocThisTag]: forEachChildInJSDocTypeLikeTag,    
    [SyntaxKind.JSDocSatisfiesTag]: forEachChildInJSDocTypeLikeTag,
    [SyntaxKind.JSDocThrowsTag]: forEachChildInJSDocTypeLikeTag,
    [SyntaxKind.JSDocOverloadTag]: forEachChildInJSDocTypeLikeTag,
    [SyntaxKind.JSDocVariadicType]: forEachChildInOptionalRestOrJSDocParameterModifier,
    [SyntaxKind.JSDocSignature]: function forEachChildInJSDocSignature<T>(node: JSDocSignature, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        // return forEach(node.typeParameters, cbNode) ||
        return forEach(node.parameters, cbNode) ||
            visitNode(cbNode, node.type);
    },
    [SyntaxKind.JSDocLink]: forEachChildInJSDocLinkCodeOrPlain,
    [SyntaxKind.JSDocLinkCode]: forEachChildInJSDocLinkCodeOrPlain,
    [SyntaxKind.JSDocLinkPlain]: forEachChildInJSDocLinkCodeOrPlain,
    [SyntaxKind.JSDocTypeLiteral]: function forEachChildInJSDocTypeLiteral<T>(node: JSDocTypeLiteral, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return forEach(node.jsDocPropertyTags, cbNode);
    },
    [SyntaxKind.JSDocTag]: forEachChildInJSDocTag,
    [SyntaxKind.JSDocClassTag]: forEachChildInJSDocTag,
    [SyntaxKind.JSDocPublicTag]: forEachChildInJSDocTag,
    [SyntaxKind.JSDocPrivateTag]: forEachChildInJSDocTag,
    [SyntaxKind.JSDocProtectedTag]: forEachChildInJSDocTag,    
    [SyntaxKind.JSDocDeprecatedTag]: forEachChildInJSDocTag,
    [SyntaxKind.JSDocOverrideTag]: forEachChildInJSDocTag,    
};

function forEachChildInContinueOrBreakStatement<T>(node: ContinueStatement | BreakStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.label);
}

function forEachChildInBlock<T>(node: Block, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNodes(cbNode, cbNodes, node.statements);
}

function forEachChildInCallOrNewExpression<T>(node: CallExpression | NewExpression | CloneObjectExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
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

export function createSourceFile(fileName: string, sourceText: string, languageVersionOrOptions: ScriptTarget | CreateSourceFileOptions, setParentNodes = false, scriptKind?: ScriptKind, languageVariant?: LanguageVariant): SourceFile {
    tracing?.push(tracing.Phase.Parse, "createSourceFile", { path: fileName }, /*separateBeginAndEnd*/ true);
    performance.mark("beforeParse");
    let result: SourceFile;
    
    const {
        languageVersion,
        setExternalModuleIndicator: overrideSetExternalModuleIndicator,
        impliedNodeFormat: format,
        jsDocParsingMode,
        globalIncludes,
        fileHandler
    } = typeof languageVersionOrOptions === "object" ? languageVersionOrOptions : ({ languageVersion: languageVersionOrOptions } as CreateSourceFileOptions);

    const setIndicator = (file: SourceFile) => {
        setExternalModuleIndicator(file);
    };
    
    result = LpcParser.parseSourceFile(fileName, sourceText, globalIncludes, fileHandler, ScriptTarget.LPC, undefined, false, undefined, setIndicator, jsDocParsingMode, languageVariant);

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

    globalIncludes?: string[];

    fileHandler: LpcFileHandler;
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
export function updateSourceFile(sourceFile: SourceFile, newText: string, globalIncludes: string[], fileHandler: LpcFileHandler, textChangeRange: TextChangeRange, aggressiveChecks = false, languageVariant: LanguageVariant): SourceFile {    
    console.warn("implement me- updateSourceFile");
    return LpcParser.parseSourceFile(sourceFile.fileName, newText, globalIncludes, fileHandler, ScriptTarget.LPC, undefined, false, undefined, undefined, undefined, languageVariant);
    // const newSourceFile = IncrementalParser.updateSourceFile(sourceFile, newText, textChangeRange, aggressiveChecks);
    // // Because new source file node is created, it may not have the flag PossiblyContainDynamicImport. This is the case if there is no new edit to add dynamic import.
    // // We will manually port the flag to the new source file.
    // (newSourceFile as Mutable<SourceFile>).flags |= sourceFile.flags & NodeFlags.PermanentlySetIncrementalFlags;
    // return newSourceFile;    
}

// See also `isExternalOrCommonJsModule` in utilities.ts
export function isExternalModule(file: SourceFile): boolean {
    return file.externalModuleIndicator !== undefined;
}

namespace IncrementalParser {
    // Allows finding nodes in the source file at a certain position in an efficient manner.
    // The implementation takes advantage of the calling pattern it knows the parser will
    // make in order to optimize finding nodes as quickly as possible.
    export interface SyntaxCursor {
        currentNode(position: number): Node;
    }
}

/** @internal */
export function isJSDocLikeText(text: string, start: number) {
    return text.charCodeAt(start + 1) === CharacterCodes.asterisk &&
        text.charCodeAt(start + 2) === CharacterCodes.asterisk &&
        text.charCodeAt(start + 3) !== CharacterCodes.slash;
}

const intersectingChangeSet = new WeakSet<Node | NodeArray<Node>>();

function intersectsIncrementalChange(node: Node | NodeArray<Node>): boolean {
    return intersectingChangeSet.has(node);
}


function forEachChildInOptionalRestOrJSDocParameterModifier<T>(node: JSDocTypeExpression | JSDocVariadicType, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.type);
}

function forEachChildInJSDocParameterOrPropertyTag<T>(node: JSDocParameterTag | JSDocPropertyTag, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.tagName) ||
        (node.isNameFirst
            ? visitNode(cbNode, node.name) || visitNode(cbNode, node.typeExpression)
            : visitNode(cbNode, node.typeExpression) || visitNode(cbNode, node.name)) ||
        (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
}

function forEachChildInJSDocTypeLikeTag<T>(node: JSDocReturnTag | JSDocTypeTag | JSDocThisTag |  JSDocThrowsTag | JSDocOverloadTag | JSDocSatisfiesTag, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.tagName) ||
        visitNode(cbNode, node.typeExpression) ||
        (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
}

function forEachChildInJSDocLinkCodeOrPlain<T>(node: JSDocLink | JSDocLinkCode | JSDocLinkPlain, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.name);
}

function forEachChildInJSDocTag<T>(node: JSDocUnknownTag | JSDocClassTag | JSDocPublicTag | JSDocPrivateTag | JSDocProtectedTag |  JSDocDeprecatedTag | JSDocOverrideTag, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.tagName)
        || (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
}

/**
 * Parse json text into SyntaxTree and return node and parse errors if any
 * @param fileName
 * @param sourceText
 */
export function parseJsonText(fileName: string, sourceText: string): JsonSourceFile {
    return LpcParser.parseJsonText(fileName, sourceText);
}