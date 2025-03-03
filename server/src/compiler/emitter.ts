import * as lpc from "./_namespaces/lpc.js";
import { Symbol, Bundle, createTextWriter, Debug, EmitFlags, EmitHint, EmitTextWriter, Expression, factory, getEmitFlags, getInternalEmitFlags, getLineStarts, getNewLineCharacter, getShebang, Identifier, InternalEmitFlags, isExpression, isIdentifier, isSourceFile, isStringLiteral, ListFormat, memoize, ModuleKind, Node, NodeArray, noEmitNotification, noEmitSubstitution, performance, Printer, PrinterOptions, PrintHandlers, rangeIsOnSingleLine, SourceFile, SourceMapGenerator, SourceMapSource, SyntaxKind, TextRange, TypeNode, tokenToString, ParenthesizedExpression, nodeIsSynthesized, getStartsOnNewLine, getLinesBetweenRangeEndAndRangeStart, rangeEndIsOnSameLineAsRangeStart, guessIndentation, cast, getIdentifierTypeArguments, LiteralExpression, isMemberName, getSourceFileOfNode, idText, getOriginalNode, isLiteralExpression, getSourceTextOfNodeFromSourceFile, TypeLiteralNode, forEach, NamedDeclaration, DeclarationName, isGeneratedIdentifier, isBindingPattern, GeneratedIdentifier, GeneratedIdentifierFlags, getNodeId, GeneratedNamePart, FunctionDeclaration, isFileLevelUniqueName, BindingPattern, Block, CaseBlock, CaseOrDefaultClause, CatchStatement, ForStatement, IfStatement, isPrivateIdentifier, SwitchStatement, VariableDeclarationList, VariableStatement, WhileStatement, ForEachStatement, DoWhileStatement, formatGeneratedNamePart, formatGeneratedName, lastOrUndefined, getNodeForGeneratedName, isKeyword, isTokenKind, getNormalizedAbsolutePath, GetCanonicalFileName, CompilerOptions, getDirectoryPath, directorySeparator, computeCommonSourceDirectoryOfFilenames, CharacterCodes, ArrayTypeNode, every, ModifierLike, isModifier, Modifier, positionIsSynthesized, VariableDeclaration, getParseTreeNode, skipTrivia, positionsAreOnSameLine, FunctionTypeNode, SignatureDeclaration, ArrowFunction, ParameterDeclaration, singleOrUndefined, isArrowFunction, some, getCommentRange, rangeStartPositionsAreOnSameLine, getContainingNodeArray, rangeEndPositionsAreOnSameLine, getLinesBetweenPositionAndNextNonWhitespaceCharacter, CallSignatureDeclaration, getTrailingSemicolonDeferringWriter, ReturnStatement, isPartiallyEmittedExpression, isParenthesizedExpression, getLeadingCommentRanges, CommentRange, getSyntheticLeadingComments, getTrailingCommentRanges, setOriginalNode, setTextRange, fileExtensionIs, Extension, FunctionExpression, FunctionLikeDeclaration, firstOrUndefined, Statement, isPrologueDirective, hasRecordedExternalHelpers, getEmitHelpers, stableSort, compareEmitHelpers, emitDetachedComments, isJSDocLikeText, isPinnedComment, writeCommentRange, getLineAndCharacterOfPosition, emitNewLineBeforeLeadingCommentOfPosition, BinaryExpression, ArrayLiteralExpression, isBinaryExpression, BinaryOperatorToken, createBinaryExpressionTrampoline, LiteralLikeNode, StringLiteral, escapeString, escapeNonAsciiString, GetLiteralTextFlags, ScriptTarget, getLiteralText, CallExpression, ContinueStatement, BreakStatement, CaseClause, DefaultClause, ElementAccessExpression, ExpressionStatement, isJsonSourceFile, isAssignmentOperator, LiteralTypeNode, PropertyAccessExpression, setTextRangePosEnd, DotToken, UnionTypeNode, isBlock, isEmptyStatement, IndexedAccessTypeNode, BlockLike, RangeExpression, PrefixUnaryExpression, TypeReferenceNode, StructTypeNode, NamedObjectTypeNode, getStringLiteralsTextRecursively, QualifiedName, EntityName, PropertySignature } from "./_namespaces/lpc.js";

const brackets = createBracketsMap();

// Flags enum to track count of temp variables and a few dedicated names
const enum TempFlags {
    Auto = 0x00000000, // No preferred name
    CountMask = 0x0FFFFFFF, // Temp variable counter
    _i = 0x10000000, // Use/preference flag for '_i'
}

const enum PipelinePhase {
    Notification,
    Substitution,
    Comments,
    SourceMaps,
    Emit,
}


interface OrdinalParentheizerRuleSelector<T extends Node> {
    select(index: number): ((node: T) => T) | undefined;
}

type ParenthesizerRule<T extends Node> = (node: T) => T;

type ParenthesizerRuleOrSelector<T extends Node> = OrdinalParentheizerRuleSelector<T> | ParenthesizerRule<T>;

type EmitFunction = <T extends Node>(node: T, parenthesizerRule?: ParenthesizerRule<T>) => void;
type EmitListItemFunction<T extends Node> = (node: Node, emit: EmitFunction, parenthesizerRule: ParenthesizerRuleOrSelector<T> | undefined, index: number) => void;


/** @internal */
export const createPrinterWithDefaults = /* @__PURE__ */ memoize(() => createPrinter({}));

/** @internal */
export const createPrinterWithRemoveComments = /* @__PURE__ */ memoize(() => createPrinter({ removeComments: true }));

/** @internal */
export const createPrinterWithRemoveCommentsNeverAsciiEscape = /* @__PURE__ */ memoize(() => createPrinter({ removeComments: true, neverAsciiEscape: true }));

/** @internal */
export const createPrinterWithRemoveCommentsOmitTrailingSemicolon = /* @__PURE__ */ memoize(() => createPrinter({ removeComments: true, omitTrailingSemicolon: true }));

export function createPrinter(printerOptions: PrinterOptions = {}, handlers: PrintHandlers = {}): Printer {
    // Why var? It avoids TDZ checks in the runtime which can be costly.
    // See: https://github.com/microsoft/TypeScript/issues/52924
    /* eslint-disable no-var */
    var {
        hasGlobalName,
        onEmitNode = noEmitNotification,
        isEmitNotificationEnabled,
        substituteNode = noEmitSubstitution,
        onBeforeEmitNode,
        onAfterEmitNode,
        onBeforeEmitNodeArray,
        onAfterEmitNodeArray,
        onBeforeEmitToken,
        onAfterEmitToken,
    } = handlers;

    var extendedDiagnostics = !!printerOptions.extendedDiagnostics;
    var omitBraceSourcePositions = !!printerOptions.omitBraceSourceMapPositions;
    var newLine = getNewLineCharacter(printerOptions);
    var moduleKind = ModuleKind.LPC;
    var bundledHelpers = new Map<string, boolean>();

    var currentSourceFile: SourceFile | undefined;
    var nodeIdToGeneratedName: string[]; // Map of generated names for specific nodes.
    var nodeIdToGeneratedPrivateName: string[]; // Map of generated names for specific nodes.
    var autoGeneratedIdToGeneratedName: string[]; // Map of generated names for temp and loop variables.
    var generatedNames: Set<string>; // Set of names generated by the NameGenerator.
    var formattedNameTempFlagsStack: (Map<string, TempFlags> | undefined)[];
    var formattedNameTempFlags: Map<string, TempFlags> | undefined;
    var privateNameTempFlagsStack: TempFlags[]; // Stack of enclosing name generation scopes.
    var privateNameTempFlags: TempFlags; // TempFlags for the current name generation scope.
    var tempFlagsStack: TempFlags[]; // Stack of enclosing name generation scopes.
    var tempFlags: TempFlags; // TempFlags for the current name generation scope.
    var reservedNamesStack: (Set<string> | undefined)[]; // Stack of reserved names in enclosing name generation scopes.
    var reservedNames: Set<string> | undefined; // Names reserved in nested name generation scopes.
    var reservedPrivateNamesStack: (Set<string> | undefined)[]; // Stack of reserved member names in enclosing name generation scopes.
    var reservedPrivateNames: Set<string> | undefined; // Member names reserved in nested name generation scopes.
    var preserveSourceNewlines = printerOptions.preserveSourceNewlines; // Can be overridden inside nodes with the `IgnoreSourceNewlines` emit flag.
    var nextListElementPos: number | undefined; // See comment in `getLeadingLineTerminatorCount`.

    var writer: EmitTextWriter;
    var ownWriter: EmitTextWriter; // Reusable `EmitTextWriter` for basic printing.
    var write = writeBase;
    var isOwnFileEmit: boolean;

    // Source Maps
    var sourceMapsDisabled = true;
    var sourceMapGenerator: SourceMapGenerator | undefined;
    var sourceMapSource: SourceMapSource;
    var sourceMapSourceIndex = -1;
    var mostRecentlyAddedSourceMapSource: SourceMapSource;
    var mostRecentlyAddedSourceMapSourceIndex = -1;

    // Comments
    var containerPos = -1;
    var containerEnd = -1;
    var declarationListContainerEnd = -1;
    var currentLineMap: readonly number[] | undefined;
    var detachedCommentsInfo: { nodePos: number; detachedCommentEndPos: number; }[] | undefined;
    var hasWrittenComment = false;
    var commentsDisabled = !!printerOptions.removeComments;
    var lastSubstitution: Node | undefined;
    var currentParenthesizerRule: ParenthesizerRule<any> | undefined;
    var { enter: enterComment, exit: exitComment } = performance.createTimerIf(extendedDiagnostics, "commentTime", "beforeComment", "afterComment");
    var parenthesizer = factory.parenthesizer;
    var typeArgumentParenthesizerRuleSelector: OrdinalParentheizerRuleSelector<TypeNode> = {
        select: index => index === 0 ? parenthesizer.parenthesizeLeadingTypeArgument : undefined,
    };
    var emitBinaryExpression = createEmitBinaryExpression();
    /* eslint-enable no-var */

    reset();
    return {
        // public API
        printNode,
        printList,
        printFile,
        printBundle,

        // internal API
        writeNode,
        writeList,
        writeFile,
        writeBundle,
    };

    function printNode(hint: EmitHint, node: Node, sourceFile: SourceFile): string {
        switch (hint) {
            case EmitHint.SourceFile:
                Debug.assert(isSourceFile(node), "Expected a SourceFile node.");
                break;
            case EmitHint.IdentifierName:
                Debug.assert(isIdentifier(node), "Expected an Identifier node.");
                break;
            case EmitHint.Expression:
                Debug.assert(isExpression(node), "Expected an Expression node.");
                break;
        }
        switch (node.kind) {
            case SyntaxKind.SourceFile:
                return printFile(node as SourceFile);
            case SyntaxKind.Bundle:
                return printBundle(node as Bundle);
        }
        writeNode(hint, node, sourceFile, beginPrint());
        return endPrint();
    }

    function printList<T extends Node>(format: ListFormat, nodes: NodeArray<T>, sourceFile: SourceFile) {
        writeList(format, nodes, sourceFile, beginPrint());
        return endPrint();
    }

    function printBundle(bundle: Bundle): string {
        writeBundle(bundle, beginPrint(), /*sourceMapGenerator*/ undefined);
        return endPrint();
    }

    function printFile(sourceFile: SourceFile): string {
        writeFile(sourceFile, beginPrint(), /*sourceMapGenerator*/ undefined);
        return endPrint();
    }

    /**
     * If `sourceFile` is `undefined`, `node` must be a synthesized `TypeNode`.
     */
    function writeNode(hint: EmitHint, node: TypeNode, sourceFile: undefined, output: EmitTextWriter): void;
    function writeNode(hint: EmitHint, node: Node, sourceFile: SourceFile, output: EmitTextWriter): void;
    function writeNode(hint: EmitHint, node: Node, sourceFile: SourceFile | undefined, output: EmitTextWriter) {
        const previousWriter = writer;
        setWriter(output, /*_sourceMapGenerator*/ undefined);
        print(hint, node, sourceFile);
        reset();
        writer = previousWriter;
    }

    function writeList<T extends Node>(format: ListFormat, nodes: NodeArray<T>, sourceFile: SourceFile | undefined, output: EmitTextWriter) {
        const previousWriter = writer;
        setWriter(output, /*_sourceMapGenerator*/ undefined);
        if (sourceFile) {
            setSourceFile(sourceFile);
        }
        emitList(/*parentNode*/ undefined, nodes, format);
        reset();
        writer = previousWriter;
    }

    function writeBundle(bundle: Bundle, output: EmitTextWriter, sourceMapGenerator: SourceMapGenerator | undefined) {
        isOwnFileEmit = false;
        const previousWriter = writer;
        setWriter(output, sourceMapGenerator);
        console.warn("todo - implment me - writeBundle");
        emitShebangIfNeeded(bundle);
        // emitPrologueDirectivesIfNeeded(bundle);
        // emitHelpers(bundle);
        // emitSyntheticTripleSlashReferencesIfNeeded(bundle);
        for (const sourceFile of bundle.sourceFiles) {
            print(EmitHint.SourceFile, sourceFile, sourceFile);
        }
        reset();
        writer = previousWriter;
    }

    function writeFile(sourceFile: SourceFile, output: EmitTextWriter, sourceMapGenerator: SourceMapGenerator | undefined) {
        console.warn("todo - implment me - writeFile");

        isOwnFileEmit = true;
        const previousWriter = writer;
        setWriter(output, sourceMapGenerator);
        emitShebangIfNeeded(sourceFile);
        // emitPrologueDirectivesIfNeeded(sourceFile);
        print(EmitHint.SourceFile, sourceFile, sourceFile);
        reset();
        writer = previousWriter;
    }

    function beginPrint() {
        return ownWriter || (ownWriter = createTextWriter(newLine));
    }

    function endPrint() {
        const text = ownWriter.getText();
        ownWriter.clear();
        return text;
    }

    function print(hint: EmitHint, node: Node, sourceFile: SourceFile | undefined) {
        if (sourceFile) {
            setSourceFile(sourceFile);
        }

        pipelineEmit(hint, node, /*parenthesizerRule*/ undefined);
    }

    function setSourceFile(sourceFile: SourceFile | undefined) {
        currentSourceFile = sourceFile;
        currentLineMap = undefined;
        detachedCommentsInfo = undefined;
        if (sourceFile) {
            setSourceMapSource(sourceFile);
        }
    }

    function setSourceMapSource(source: SourceMapSource) {
        if (sourceMapsDisabled) {
            return;
        }

        sourceMapSource = source;

        if (source === mostRecentlyAddedSourceMapSource) {
            // Fast path for when the new source map is the most recently added, in which case
            // we use its captured index without going through the source map generator.
            sourceMapSourceIndex = mostRecentlyAddedSourceMapSourceIndex;
            return;
        }

        if (isJsonSourceMapSource(source)) {
            return;
        }

        sourceMapSourceIndex = sourceMapGenerator!.addSource(source.fileName);
        if (printerOptions.inlineSources) {
            sourceMapGenerator!.setSourceContent(sourceMapSourceIndex, source.text);
        }

        mostRecentlyAddedSourceMapSource = source;
        mostRecentlyAddedSourceMapSourceIndex = sourceMapSourceIndex;
    }

    function isJsonSourceMapSource(sourceFile: SourceMapSource) {
        return fileExtensionIs(sourceFile.fileName, Extension.Json);
    }

    function setWriter(_writer: EmitTextWriter | undefined, _sourceMapGenerator: SourceMapGenerator | undefined) {
        if (_writer && printerOptions.omitTrailingSemicolon) {            
            _writer = getTrailingSemicolonDeferringWriter(_writer);
        }

        writer = _writer!; // TODO: GH#18217
        sourceMapGenerator = _sourceMapGenerator;
        sourceMapsDisabled = !writer || !sourceMapGenerator;
    }

    function reset() {
        nodeIdToGeneratedName = [];
        nodeIdToGeneratedPrivateName = [];
        autoGeneratedIdToGeneratedName = [];
        generatedNames = new Set();
        formattedNameTempFlagsStack = [];
        formattedNameTempFlags = new Map();
        privateNameTempFlagsStack = [];
        privateNameTempFlags = TempFlags.Auto;
        tempFlagsStack = [];
        tempFlags = TempFlags.Auto;
        reservedNamesStack = [];
        reservedNames = undefined;
        reservedPrivateNamesStack = [];
        reservedPrivateNames = undefined;
        currentSourceFile = undefined;
        currentLineMap = undefined;
        detachedCommentsInfo = undefined;
        setWriter(/*output*/ undefined, /*_sourceMapGenerator*/ undefined);
    }

    function getCurrentLineMap() {
        return currentLineMap || (currentLineMap = getLineStarts(Debug.checkDefined(currentSourceFile)));
    }

    function emit<T extends Node>(node: T, parenthesizerRule?: (node: T) => T): void;
    function emit<T extends Node>(node: T | undefined, parenthesizerRule?: (node: T) => T): void;
    function emit<T extends Node>(node: T | undefined, parenthesizerRule?: (node: T) => T) {
        if (node === undefined) return;
        pipelineEmit(EmitHint.Unspecified, node, parenthesizerRule);
    }

    function emitIdentifierName(node: Identifier): void;
    function emitIdentifierName(node: Identifier | undefined): void;
    function emitIdentifierName(node: Identifier | undefined) {
        if (node === undefined) return;
        pipelineEmit(EmitHint.IdentifierName, node, /*parenthesizerRule*/ undefined);
    }

    function emitExpression<T extends Expression>(node: T, parenthesizerRule?: (node: T) => T): void;
    function emitExpression<T extends Expression>(node: T | undefined, parenthesizerRule?: (node: T) => T): void;
    function emitExpression<T extends Expression>(node: T | undefined, parenthesizerRule?: (node: T) => T) {
        if (node === undefined) return;
        pipelineEmit(EmitHint.Expression, node, parenthesizerRule);
    }

    function beforeEmitNode(node: Node) {
        if (preserveSourceNewlines && (getInternalEmitFlags(node) & InternalEmitFlags.IgnoreSourceNewlines)) {
            preserveSourceNewlines = false;
        }
    }

    function afterEmitNode(savedPreserveSourceNewlines: boolean | undefined) {
        preserveSourceNewlines = savedPreserveSourceNewlines;
    }

    function pipelineEmit<T extends Node>(emitHint: EmitHint, node: T, parenthesizerRule?: (node: T) => T) {
        currentParenthesizerRule = parenthesizerRule;
        const pipelinePhase = getPipelinePhase(PipelinePhase.Notification, emitHint, node);
        pipelinePhase(emitHint, node);
        currentParenthesizerRule = undefined;
    }

    function shouldEmitComments(node: Node) {
        return !commentsDisabled && !isSourceFile(node);
    }

    function shouldEmitSourceMaps(node: Node) {
        return !sourceMapsDisabled &&
            !isSourceFile(node);
            //!isInJsonFile(node);
    }

    function pipelineEmitWithSubstitution(hint: EmitHint, node: Node) {
        const pipelinePhase = getNextPipelinePhase(PipelinePhase.Substitution, hint, node);
        Debug.assertIsDefined(lastSubstitution);
        node = lastSubstitution;
        lastSubstitution = undefined;
        pipelinePhase(hint, node);
    }

    function pipelineEmitWithComments(hint: EmitHint, node: Node) {
        const pipelinePhase = getNextPipelinePhase(PipelinePhase.Comments, hint, node);
        const savedContainerPos = containerPos;
        const savedContainerEnd = containerEnd;
        const savedDeclarationListContainerEnd = declarationListContainerEnd;
        emitCommentsBeforeNode(node);
        pipelinePhase(hint, node);
        emitCommentsAfterNode(node, savedContainerPos, savedContainerEnd, savedDeclarationListContainerEnd);
    }

    function emitCommentsBeforeNode(node: Node) {
        console.warn("todo - implment me - emitCommentsBeforeNode");
        // const emitFlags = getEmitFlags(node);
        // const commentRange = getCommentRange(node);

        // // Emit leading comments
        // emitLeadingCommentsOfNode(node, emitFlags, commentRange.pos, commentRange.end);
        // if (emitFlags & EmitFlags.NoNestedComments) {
        //     commentsDisabled = true;
        // }
    }

    function emitCommentsAfterNode(node: Node, savedContainerPos: number, savedContainerEnd: number, savedDeclarationListContainerEnd: number) {
        console.warn("todo - implment me - emitCommentsAfterNode");
        // const emitFlags = getEmitFlags(node);
        // const commentRange = getCommentRange(node);

        // // Emit trailing comments
        // if (emitFlags & EmitFlags.NoNestedComments) {
        //     commentsDisabled = false;
        // }
        // emitTrailingCommentsOfNode(node, emitFlags, commentRange.pos, commentRange.end, savedContainerPos, savedContainerEnd, savedDeclarationListContainerEnd);
        // const typeNode = getTypeNode(node);
        // if (typeNode) {
        //     emitTrailingCommentsOfNode(node, emitFlags, typeNode.pos, typeNode.end, savedContainerPos, savedContainerEnd, savedDeclarationListContainerEnd);
        // }
    }

    function createEmitBinaryExpression() {
        interface WorkArea {
            stackIndex: number;
            preserveSourceNewlinesStack: (boolean | undefined)[];
            containerPosStack: number[];
            containerEndStack: number[];
            declarationListContainerEndStack: number[];
            shouldEmitCommentsStack: boolean[];
            shouldEmitSourceMapsStack: boolean[];
        }

        return createBinaryExpressionTrampoline(onEnter, onLeft, onOperator, onRight, onExit, /*foldState*/ undefined);

        function onEnter(node: BinaryExpression, state: WorkArea | undefined) {
            if (state) {
                state.stackIndex++;
                state.preserveSourceNewlinesStack[state.stackIndex] = preserveSourceNewlines;
                state.containerPosStack[state.stackIndex] = containerPos;
                state.containerEndStack[state.stackIndex] = containerEnd;
                state.declarationListContainerEndStack[state.stackIndex] = declarationListContainerEnd;
                const emitComments = state.shouldEmitCommentsStack[state.stackIndex] = shouldEmitComments(node);
                const emitSourceMaps = state.shouldEmitSourceMapsStack[state.stackIndex] = shouldEmitSourceMaps(node);
                onBeforeEmitNode?.(node);
                if (emitComments) emitCommentsBeforeNode(node);
                if (emitSourceMaps) emitSourceMapsBeforeNode(node);
                beforeEmitNode(node);
            }
            else {
                state = {
                    stackIndex: 0,
                    preserveSourceNewlinesStack: [undefined],
                    containerPosStack: [-1],
                    containerEndStack: [-1],
                    declarationListContainerEndStack: [-1],
                    shouldEmitCommentsStack: [false],
                    shouldEmitSourceMapsStack: [false],
                };
            }
            return state;
        }

        function onLeft(next: Expression, _workArea: WorkArea, parent: BinaryExpression) {
            return maybeEmitExpression(next, parent, "left");
        }

        function onOperator(operatorToken: BinaryOperatorToken, _state: WorkArea, node: BinaryExpression) {
            const isCommaOperator = operatorToken.kind !== SyntaxKind.CommaToken;
            const linesBeforeOperator = getLinesBetweenNodes(node, node.left, operatorToken);
            const linesAfterOperator = getLinesBetweenNodes(node, operatorToken, node.right);
            writeLinesAndIndent(linesBeforeOperator, isCommaOperator);
            emitLeadingCommentsOfPosition(operatorToken.pos);
            writeTokenNode(operatorToken, operatorToken.kind === SyntaxKind.InKeyword ? writeKeyword : writeOperator);
            emitTrailingCommentsOfPosition(operatorToken.end, /*prefixSpace*/ true); // Binary operators should have a space before the comment starts
            writeLinesAndIndent(linesAfterOperator, /*writeSpaceIfNotIndenting*/ true);
        }

        function onRight(next: Expression, _workArea: WorkArea, parent: BinaryExpression) {
            return maybeEmitExpression(next, parent, "right");
        }

        function onExit(node: BinaryExpression, state: WorkArea) {
            const linesBeforeOperator = getLinesBetweenNodes(node, node.left, node.operatorToken);
            const linesAfterOperator = getLinesBetweenNodes(node, node.operatorToken, node.right);
            decreaseIndentIf(linesBeforeOperator, linesAfterOperator);
            if (state.stackIndex > 0) {
                const savedPreserveSourceNewlines = state.preserveSourceNewlinesStack[state.stackIndex];
                const savedContainerPos = state.containerPosStack[state.stackIndex];
                const savedContainerEnd = state.containerEndStack[state.stackIndex];
                const savedDeclarationListContainerEnd = state.declarationListContainerEndStack[state.stackIndex];
                const shouldEmitComments = state.shouldEmitCommentsStack[state.stackIndex];
                const shouldEmitSourceMaps = state.shouldEmitSourceMapsStack[state.stackIndex];
                afterEmitNode(savedPreserveSourceNewlines);
                if (shouldEmitSourceMaps) emitSourceMapsAfterNode(node);
                if (shouldEmitComments) emitCommentsAfterNode(node, savedContainerPos, savedContainerEnd, savedDeclarationListContainerEnd);
                onAfterEmitNode?.(node);
                state.stackIndex--;
            }
        }

        function maybeEmitExpression(next: Expression, parent: BinaryExpression, side: "left" | "right") {
            const parenthesizerRule = side === "left" ?
                parenthesizer.getParenthesizeLeftSideOfBinaryForOperator(parent.operatorToken.kind) :
                parenthesizer.getParenthesizeRightSideOfBinaryForOperator(parent.operatorToken.kind);

            let pipelinePhase = getPipelinePhase(PipelinePhase.Notification, EmitHint.Expression, next);
            if (pipelinePhase === pipelineEmitWithSubstitution) {
                Debug.assertIsDefined(lastSubstitution);
                next = parenthesizerRule(cast(lastSubstitution, isExpression));
                pipelinePhase = getNextPipelinePhase(PipelinePhase.Substitution, EmitHint.Expression, next);
                lastSubstitution = undefined;
            }

            if (
                pipelinePhase === pipelineEmitWithComments ||
                pipelinePhase === pipelineEmitWithSourceMaps ||
                pipelinePhase === pipelineEmitWithHint
            ) {
                if (isBinaryExpression(next)) {
                    return next;
                }
            }

            currentParenthesizerRule = parenthesizerRule;
            pipelinePhase(EmitHint.Expression, next);
        }
    }
    
    function getPipelinePhase(phase: PipelinePhase, emitHint: EmitHint, node: Node) {
        switch (phase) {
            case PipelinePhase.Notification:
                if (onEmitNode !== noEmitNotification && (!isEmitNotificationEnabled || isEmitNotificationEnabled(node))) {
                    return pipelineEmitWithNotification;
                }
                // falls through
            case PipelinePhase.Substitution:
                if (substituteNode !== noEmitSubstitution && (lastSubstitution = substituteNode(emitHint, node) || node) !== node) {
                    if (currentParenthesizerRule) {
                        lastSubstitution = currentParenthesizerRule(lastSubstitution);
                    }
                    return pipelineEmitWithSubstitution;
                }
                // falls through
            case PipelinePhase.Comments:
                if (shouldEmitComments(node)) {
                    return pipelineEmitWithComments;
                }
                // falls through
            case PipelinePhase.SourceMaps:
                if (shouldEmitSourceMaps(node)) {
                    return pipelineEmitWithSourceMaps;
                }
                // falls through
            case PipelinePhase.Emit:
                return pipelineEmitWithHint;
            default:
                return Debug.assertNever(phase);
        }
    }

    // Source Maps
    function pipelineEmitWithSourceMaps(hint: EmitHint, node: Node) {
        const pipelinePhase = getNextPipelinePhase(PipelinePhase.SourceMaps, hint, node);
        emitSourceMapsBeforeNode(node);
        pipelinePhase(hint, node);
        emitSourceMapsAfterNode(node);
    }

    function emitSourceMapsBeforeNode(node: Node) {
        console.warn("todo - implment me - emitSourceMapsBeforeNode");
        // const emitFlags = getEmitFlags(node);
        // const sourceMapRange = getSourceMapRange(node);

        // // Emit leading sourcemap
        // const source = sourceMapRange.source || sourceMapSource;
        // if (
        //     node.kind !== SyntaxKind.NotEmittedStatement
        //     && (emitFlags & EmitFlags.NoLeadingSourceMap) === 0
        //     && sourceMapRange.pos >= 0
        // ) {
        //     emitSourcePos(sourceMapRange.source || sourceMapSource, skipSourceTrivia(source, sourceMapRange.pos));
        // }
        // if (emitFlags & EmitFlags.NoNestedSourceMaps) {
        //     sourceMapsDisabled = true;
        // }
    }

    function emitSourceMapsAfterNode(node: Node) {
        console.warn
        // const emitFlags = getEmitFlags(node);
        // const sourceMapRange = getSourceMapRange(node);

        // // Emit trailing sourcemap
        // if (emitFlags & EmitFlags.NoNestedSourceMaps) {
        //     sourceMapsDisabled = false;
        // }
        // if (
        //     node.kind !== SyntaxKind.NotEmittedStatement
        //     && (emitFlags & EmitFlags.NoTrailingSourceMap) === 0
        //     && sourceMapRange.end >= 0
        // ) {
        //     emitSourcePos(sourceMapRange.source || sourceMapSource, sourceMapRange.end);
        // }
    }

    
    function getNextPipelinePhase(currentPhase: PipelinePhase, emitHint: EmitHint, node: Node) {
        return getPipelinePhase(currentPhase + 1, emitHint, node);
    }

    function pipelineEmitWithNotification(hint: EmitHint, node: Node) {
        const pipelinePhase = getNextPipelinePhase(PipelinePhase.Notification, hint, node);
        onEmitNode(hint, node, pipelinePhase);
    }

    function pipelineEmitWithHint(hint: EmitHint, node: Node): void {
        onBeforeEmitNode?.(node);
        if (preserveSourceNewlines) {
            const savedPreserveSourceNewlines = preserveSourceNewlines;
            beforeEmitNode(node);
            pipelineEmitWithHintWorker(hint, node);
            afterEmitNode(savedPreserveSourceNewlines);
        }
        else {
            pipelineEmitWithHintWorker(hint, node);
        }
        onAfterEmitNode?.(node);
        // clear the parenthesizer rule as we ascend
        currentParenthesizerRule = undefined;
    }

    function emitList<Child extends Node, Children extends NodeArray<Child>>(parentNode: Node | undefined, children: Children | undefined, format: ListFormat, parenthesizerRule?: ParenthesizerRuleOrSelector<Child>, start?: number, count?: number) {
        emitNodeList(
            emit,
            parentNode,
            children,
            format | (parentNode && getEmitFlags(parentNode) & EmitFlags.MultiLine ? ListFormat.PreferNewLine : 0),
            parenthesizerRule,
            start,
            count,
        );
    }

    function emitExpressionList<Child extends Node, Children extends NodeArray<Child>>(parentNode: Node | undefined, children: Children | undefined, format: ListFormat, parenthesizerRule?: ParenthesizerRuleOrSelector<Child>, start?: number, count?: number) {
        emitNodeList(emitExpression, parentNode, children, format, parenthesizerRule, start, count);
    }

    function emitTrailingCommentsOfPosition(pos: number, prefixSpace?: boolean, forceNoNewline?: boolean) {
        if (commentsDisabled) {
            return;
        }
        enterComment();
        console.warn("todo - implment me - emitTrailingCommentsOfPosition");
        //forEachTrailingCommentToEmit(pos, prefixSpace ? emitTrailingComment : forceNoNewline ? emitTrailingCommentOfPositionNoNewline : emitTrailingCommentOfPosition);
        exitComment();
    }


    function emitNodeList<Child extends Node, Children extends NodeArray<Child>>(emit: EmitFunction, parentNode: Node | undefined, children: Children | undefined, format: ListFormat, parenthesizerRule: ParenthesizerRuleOrSelector<Child> | undefined, start = 0, count = children ? children.length - start : 0) {
        const isUndefined = children === undefined;
        if (isUndefined && format & ListFormat.OptionalIfUndefined) {
            return;
        }

        const isEmpty = children === undefined || start >= children.length || count === 0;
        if (isEmpty && format & ListFormat.OptionalIfEmpty) {
            onBeforeEmitNodeArray?.(children);
            onAfterEmitNodeArray?.(children);
            return;
        }

        if (format & ListFormat.BracketsMask) {
            writePunctuation(getOpeningBracket(format));
            if (isEmpty && children) {
                emitTrailingCommentsOfPosition(children.pos, /*prefixSpace*/ true); // Emit comments within empty bracketed lists
            }
        }

        onBeforeEmitNodeArray?.(children);

        if (isEmpty) {
            // Write a line terminator if the parent node was multi-line
            if (format & ListFormat.MultiLine && !(preserveSourceNewlines && (!parentNode || currentSourceFile && rangeIsOnSingleLine(parentNode, currentSourceFile)))) {
                writeLine();
            }
            else if (format & ListFormat.SpaceBetweenBraces && !(format & ListFormat.NoSpaceIfEmpty)) {
                writeSpace();
            }
        }
        else {
            emitNodeListItems(emit, parentNode, children, format, parenthesizerRule, start, count, children.hasTrailingComma, children);
        }

        onAfterEmitNodeArray?.(children);

        if (format & ListFormat.BracketsMask) {
            if (isEmpty && children) {
                emitLeadingCommentsOfPosition(children.end); // Emit leading comments within empty lists
            }
            writePunctuation(getClosingBracket(format));
        }
    }

    function emitLeadingCommentsOfPosition(pos: number) {
        if (commentsDisabled || pos === -1) {
            return;
        }

        console.warn("todo - implment me - emitLeadingCommentsOfPosition");
        //emitLeadingComments(pos, /*isEmittedNode*/ true);
    }

    function getLeadingLineTerminatorCount(parentNode: Node | undefined, firstChild: Node | undefined, format: ListFormat): number {
        if (format & ListFormat.PreserveLines || preserveSourceNewlines) {
            if (format & ListFormat.PreferNewLine) {
                return 1;
            }

            if (firstChild === undefined) {
                return !parentNode || currentSourceFile && rangeIsOnSingleLine(parentNode, currentSourceFile) ? 0 : 1;
            }
            if (firstChild.pos === nextListElementPos) {
                // If this child starts at the beginning of a list item in a parent list, its leading
                // line terminators have already been written as the separating line terminators of the
                // parent list. Example:
                //
                // class Foo {
                //   constructor() {}
                //   public foo() {}
                // }
                //
                // The outer list is the list of class members, with one line terminator between the
                // constructor and the method. The constructor is written, the separating line terminator
                // is written, and then we start emitting the method. Its modifiers ([public]) constitute an inner
                // list, so we look for its leading line terminators. If we didn't know that we had already
                // written a newline as part of the parent list, it would appear that we need to write a
                // leading newline to start the modifiers.
                return 0;
            }            
            if (
                currentSourceFile && parentNode &&
                !positionIsSynthesized(parentNode.pos) &&
                !nodeIsSynthesized(firstChild) &&
                (!firstChild.parent || getOriginalNode(firstChild.parent) === getOriginalNode(parentNode))
            ) {
                if (preserveSourceNewlines) {
                    return getEffectiveLines(
                        includeComments =>
                            lpc.getLinesBetweenPositionAndPrecedingNonWhitespaceCharacter(
                                firstChild.pos,
                                parentNode.pos,
                                currentSourceFile!,
                                includeComments,
                            ),
                    );
                }
                return rangeStartPositionsAreOnSameLine(parentNode, firstChild, currentSourceFile) ? 0 : 1;
            }
            if (synthesizedNodeStartsOnNewLine(firstChild, format)) {
                return 1;
            }
        }
        return format & ListFormat.MultiLine ? 1 : 0;
    }

    function synthesizedNodeStartsOnNewLine(node: Node, format: ListFormat) {
        if (nodeIsSynthesized(node)) {
            const startsOnNewLine = getStartsOnNewLine(node);
            if (startsOnNewLine === undefined) {
                return (format & ListFormat.PreferNewLine) !== 0;
            }

            return startsOnNewLine;
        }

        return (format & ListFormat.PreferNewLine) !== 0;
    }
    
    /**
     * Emits a list without brackets or raising events.
     *
     * NOTE: You probably don't want to call this directly and should be using `emitList` or `emitExpressionList` instead.
     */
    function emitNodeListItems<Child extends Node>(emit: EmitFunction, parentNode: Node | undefined, children: readonly Child[], format: ListFormat, parenthesizerRule: ParenthesizerRuleOrSelector<Child> | undefined, start: number, count: number, hasTrailingComma: boolean, childrenTextRange: TextRange | undefined) {
        // Write the opening line terminator or leading whitespace.
        const mayEmitInterveningComments = (format & ListFormat.NoInterveningComments) === 0;
        let shouldEmitInterveningComments = mayEmitInterveningComments;

        const leadingLineTerminatorCount = getLeadingLineTerminatorCount(parentNode, children[start], format);
        if (leadingLineTerminatorCount) {
            writeLine(leadingLineTerminatorCount);
            shouldEmitInterveningComments = false;
        }
        else if (format & ListFormat.SpaceBetweenBraces) {
            writeSpace();
        }

        // Increase the indent, if requested.
        if (format & ListFormat.Indented) {
            increaseIndent();
        }

        const emitListItem = getEmitListItem(emit, parenthesizerRule);

        // Emit each child.
        let previousSibling: Node | undefined;
        let shouldDecreaseIndentAfterEmit = false;
        for (let i = 0; i < count; i++) {
            const child = children[start + i];

            // Write the delimiter if this is not the first node.
            if (format & ListFormat.AsteriskDelimited) {
                // always write JSDoc in the format "\n *"
                writeLine();
                writeDelimiter(format);
            }
            else if (previousSibling) {
                // i.e
                //      function commentedParameters(
                //          /* Parameter a */
                //          a
                //          /* End of parameter a */ -> this comment isn't considered to be trailing comment of parameter "a" due to newline
                //          ,
                if (format & ListFormat.DelimitersMask && previousSibling.end !== (parentNode ? parentNode.end : -1)) {
                    const previousSiblingEmitFlags = getEmitFlags(previousSibling);
                    if (!(previousSiblingEmitFlags & EmitFlags.NoTrailingComments)) {
                        emitLeadingCommentsOfPosition(previousSibling.end);
                    }
                }

                writeDelimiter(format);

                // Write either a line terminator or whitespace to separate the elements.
                const separatingLineTerminatorCount = getSeparatingLineTerminatorCount(previousSibling, child, format);
                if (separatingLineTerminatorCount > 0) {
                    // If a synthesized node in a single-line list starts on a new
                    // line, we should increase the indent.
                    if ((format & (ListFormat.LinesMask | ListFormat.Indented)) === ListFormat.SingleLine) {
                        increaseIndent();
                        shouldDecreaseIndentAfterEmit = true;
                    }

                    if (shouldEmitInterveningComments && format & ListFormat.DelimitersMask && !positionIsSynthesized(child.pos)) {
                        const commentRange = getCommentRange(child);
                        emitTrailingCommentsOfPosition(commentRange.pos, /*prefixSpace*/ !!(format & ListFormat.SpaceBetweenSiblings), /*forceNoNewline*/ true);
                    }

                    writeLine(separatingLineTerminatorCount);
                    shouldEmitInterveningComments = false;
                }
                else if (previousSibling && format & ListFormat.SpaceBetweenSiblings) {
                    writeSpace();
                }
            }

            // Emit this child.
            if (shouldEmitInterveningComments) {
                const commentRange = getCommentRange(child);
                emitTrailingCommentsOfPosition(commentRange.pos);
            }
            else {
                shouldEmitInterveningComments = mayEmitInterveningComments;
            }

            nextListElementPos = child.pos;
            emitListItem(child, emit, parenthesizerRule, i);

            if (shouldDecreaseIndentAfterEmit) {
                decreaseIndent();
                shouldDecreaseIndentAfterEmit = false;
            }

            previousSibling = child;
        }

        // Write a trailing comma, if requested.
        const emitFlags = previousSibling ? getEmitFlags(previousSibling) : 0;
        const skipTrailingComments = commentsDisabled || !!(emitFlags & EmitFlags.NoTrailingComments);
        const emitTrailingComma = hasTrailingComma && (format & ListFormat.AllowTrailingComma) && (format & ListFormat.CommaDelimited);
        if (emitTrailingComma) {
            if (previousSibling && !skipTrailingComments) {
                emitTokenWithComment(SyntaxKind.CommaToken, previousSibling.end, writePunctuation, previousSibling);
            }
            else {
                writePunctuation(",");
            }
        }

        // Emit any trailing comment of the last element in the list
        // i.e
        //       var array = [...
        //          2
        //          /* end of element 2 */
        //       ];
        if (previousSibling && (parentNode ? parentNode.end : -1) !== previousSibling.end && (format & ListFormat.DelimitersMask) && !skipTrailingComments) {
            emitLeadingCommentsOfPosition(emitTrailingComma && childrenTextRange?.end ? childrenTextRange.end : previousSibling.end);
        }

        // Decrease the indent, if requested.
        if (format & ListFormat.Indented) {
            decreaseIndent();
        }

        // Write the closing line terminator or closing whitespace.
        const closingLineTerminatorCount = getClosingLineTerminatorCount(parentNode, children[start + count - 1], format, childrenTextRange);
        if (closingLineTerminatorCount) {
            writeLine(closingLineTerminatorCount);
        }
        else if (format & (ListFormat.SpaceAfterList | ListFormat.SpaceBetweenBraces)) {
            writeSpace();
        }
    }

    function siblingNodePositionsAreComparable(previousNode: Node, nextNode: Node) {
        if (nextNode.pos < previousNode.end) {
            return false;
        }

        previousNode = getOriginalNode(previousNode);
        nextNode = getOriginalNode(nextNode);
        const parent = previousNode.parent;
        if (!parent || parent !== nextNode.parent) {
            return false;
        }

        const parentNodeArray = getContainingNodeArray(previousNode);
        const prevNodeIndex = parentNodeArray?.indexOf(previousNode);
        return prevNodeIndex !== undefined && prevNodeIndex > -1 && parentNodeArray!.indexOf(nextNode) === prevNodeIndex + 1;
    }

    
    function getSeparatingLineTerminatorCount(previousNode: Node | undefined, nextNode: Node, format: ListFormat): number {
        if (format & ListFormat.PreserveLines || preserveSourceNewlines) {
            if (previousNode === undefined || nextNode === undefined) {
                return 0;
            }           
            else if (currentSourceFile && !nodeIsSynthesized(previousNode) && !nodeIsSynthesized(nextNode)) {
                if (preserveSourceNewlines && siblingNodePositionsAreComparable(previousNode, nextNode)) {
                    return getEffectiveLines(
                        includeComments =>
                            getLinesBetweenRangeEndAndRangeStart(
                                previousNode,
                                nextNode,
                                currentSourceFile!,
                                includeComments,
                            ),
                    );
                }
                // If `preserveSourceNewlines` is `false` we do not intend to preserve the effective lines between the
                // previous and next node. Instead we naively check whether nodes are on separate lines within the
                // same node parent. If so, we intend to preserve a single line terminator. This is less precise and
                // expensive than checking with `preserveSourceNewlines` as above, but the goal is not to preserve the
                // effective source lines between two sibling nodes.
                else if (!preserveSourceNewlines && originalNodesHaveSameParent(previousNode, nextNode)) {
                    return rangeEndIsOnSameLineAsRangeStart(previousNode, nextNode, currentSourceFile) ? 0 : 1;
                }
                // If the two nodes are not comparable, add a line terminator based on the format that can indicate
                // whether new lines are preferred or not.
                return format & ListFormat.PreferNewLine ? 1 : 0;
            }
            else if (synthesizedNodeStartsOnNewLine(previousNode, format) || synthesizedNodeStartsOnNewLine(nextNode, format)) {
                return 1;
            }
        }
        else if (getStartsOnNewLine(nextNode)) {
            return 1;
        }
        return format & ListFormat.MultiLine ? 1 : 0;
    }

    function originalNodesHaveSameParent(nodeA: Node, nodeB: Node) {
        nodeA = getOriginalNode(nodeA);
        // For performance, do not call `getOriginalNode` for `nodeB` if `nodeA` doesn't even
        // have a parent node.
        return nodeA.parent && nodeA.parent === getOriginalNode(nodeB).parent;
    }

    function getClosingLineTerminatorCount(parentNode: Node | undefined, lastChild: Node | undefined, format: ListFormat, childrenTextRange: TextRange | undefined): number {
        if (format & ListFormat.PreserveLines || preserveSourceNewlines) {
            if (format & ListFormat.PreferNewLine) {
                return 1;
            }

            if (lastChild === undefined) {
                return !parentNode || currentSourceFile && rangeIsOnSingleLine(parentNode, currentSourceFile) ? 0 : 1;
            }
            if (currentSourceFile && parentNode && !positionIsSynthesized(parentNode.pos) && !nodeIsSynthesized(lastChild) && (!lastChild.parent || lastChild.parent === parentNode)) {
                if (preserveSourceNewlines) {
                    const end = childrenTextRange && !positionIsSynthesized(childrenTextRange.end) ? childrenTextRange.end : lastChild.end;
                    return getEffectiveLines(
                        includeComments =>
                            getLinesBetweenPositionAndNextNonWhitespaceCharacter(
                                end,
                                parentNode.end,
                                currentSourceFile!,
                                includeComments,
                            ),
                    );
                }
                return rangeEndPositionsAreOnSameLine(parentNode, lastChild, currentSourceFile) ? 0 : 1;
            }
            if (synthesizedNodeStartsOnNewLine(lastChild, format)) {
                return 1;
            }
        }
        if (format & ListFormat.MultiLine && !(format & ListFormat.NoTrailingNewLine)) {
            return 1;
        }
        return 0;
    }
    
    function writeDelimiter(format: ListFormat) {
        switch (format & ListFormat.DelimitersMask) {
            case ListFormat.None:
                break;
            case ListFormat.CommaDelimited:
                writePunctuation(",");
                break;
            case ListFormat.BarDelimited:
                writeSpace();
                writePunctuation("|");
                break;
            case ListFormat.AsteriskDelimited:
                writeSpace();
                writePunctuation("*");
                writeSpace();
                break;
            case ListFormat.AmpersandDelimited:
                writeSpace();
                writePunctuation("&");
                break;
        }
    }

    function emitShebangIfNeeded(sourceFileOrBundle: Bundle | SourceFile) {
        if (isSourceFile(sourceFileOrBundle)) {
            const shebang = getShebang(sourceFileOrBundle.text);
            if (shebang) {
                writeComment(shebang);
                writeLine();
                return true;
            }
        }
        else {
            for (const sourceFile of sourceFileOrBundle.sourceFiles) {
                // Emit only the first encountered shebang
                if (emitShebangIfNeeded(sourceFile)) {
                    return true;
                }
            }
        }
    }

    function pipelineEmitWithHintWorker(hint: EmitHint, node: Node, allowSnippets = true): void {
        // if (allowSnippets) {
        //     const snippet = getSnippetElement(node);
        //     if (snippet) {
        //         return emitSnippetNode(hint, node, snippet);
        //     }
        // }

        
        if (hint === EmitHint.IdentifierName) return emitIdentifier(cast(node, isIdentifier));
        if (hint === EmitHint.Unspecified) {
            switch (node.kind) {
                
                // Identifiers
                case SyntaxKind.Identifier:
                    return emitIdentifier(node as Identifier);
                case SyntaxKind.TypeLiteral:
                    return emitTypeLiteral(node as TypeLiteralNode);                
                case SyntaxKind.VariableStatement:
                    return emitVariableStatement(node as VariableStatement);
                case SyntaxKind.Parameter:
                    return emitParameter(node as ParameterDeclaration);
                case SyntaxKind.FunctionType:
                    return emitFunctionType(node as lpc.FunctionTypeNode);
                         
                // Parse tree nodes
                // Names
                case SyntaxKind.QualifiedName:
                    return emitQualifiedName(node as QualifiedName);

                // Type members
                case SyntaxKind.PropertySignature:
                    return emitPropertySignature(node as PropertySignature);

                // Declarations
                case SyntaxKind.FunctionDeclaration:
                    return emitFunctionDeclaration(node as FunctionDeclaration);
                case SyntaxKind.VariableDeclaration:
                    return emitVariableDeclaration(node as VariableDeclaration);
                case SyntaxKind.VariableDeclarationList:
                    return emitVariableDeclarationList(node as VariableDeclarationList);
                case SyntaxKind.CallSignature:
                    return emitCallSignature(node as CallSignatureDeclaration);
                case SyntaxKind.ReturnStatement:
                    return emitReturnStatement(node as ReturnStatement);                
                case SyntaxKind.CaseBlock:
                    return emitCaseBlock(node as CaseBlock);
                    
                // Types
                case SyntaxKind.ArrayType:
                    return emitArrayType(node as ArrayTypeNode);
                case SyntaxKind.LiteralType:
                    return emitLiteralType(node as LiteralTypeNode);
                case SyntaxKind.UnionType:
                    return emitUnionType(node as UnionTypeNode);
                case SyntaxKind.TypeReference:
                    return emitTypeReference(node as TypeReferenceNode);
                case SyntaxKind.StructType:
                    return emitStructType(node as StructTypeNode);
                case SyntaxKind.NamedObjectType:
                    return emitNamedObjectType(node as NamedObjectTypeNode);
                
                // Statements
                case SyntaxKind.SwitchStatement:
                    return emitSwitchStatement(node as SwitchStatement);
                case SyntaxKind.ContinueStatement:
                    return emitContinueStatement(node as ContinueStatement);
                case SyntaxKind.BreakStatement:
                    return emitBreakStatement(node as BreakStatement);
                case SyntaxKind.ExpressionStatement:
                    return emitExpressionStatement(node as ExpressionStatement);

                // Clauses
                case SyntaxKind.CaseClause:
                    return emitCaseClause(node as CaseClause);
                case SyntaxKind.DefaultClause:
                    return emitDefaultClause(node as DefaultClause);
            }
            if (isExpression(node)) {
                hint = EmitHint.Expression;
                if (substituteNode !== noEmitSubstitution) {
                    const substitute = substituteNode(hint, node) || node;
                    if (substitute !== node) {
                        node = substitute;
                        if (currentParenthesizerRule) {
                            node = currentParenthesizerRule(node);
                        }
                    }
                }
            }
        }
        if (hint === EmitHint.Expression) {
            switch (node.kind) {
                // Literals
                case SyntaxKind.StringLiteral:                
                    return emitLiteral(node as LiteralExpression);                
                case SyntaxKind.IntLiteral:
                case SyntaxKind.FloatLiteral:
                    return emitNumericLiteral(node as lpc.IntLiteral | lpc.FloatLiteral);

                // Identifiers
                case SyntaxKind.Identifier:
                    return emitIdentifier(node as Identifier);

                // Expressions
                case SyntaxKind.ArrayLiteralExpression:
                    return emitArrayLiteralExpression(node as ArrayLiteralExpression);
                case SyntaxKind.BinaryExpression:
                    return emitBinaryExpression(node as BinaryExpression);       
                case SyntaxKind.CallExpression:
                    return emitCallExpression(node as CallExpression);
                case SyntaxKind.ElementAccessExpression:
                    return emitElementAccessExpression(node as ElementAccessExpression);
                case SyntaxKind.PropertyAccessExpression:
                    return emitPropertyAccessExpression(node as PropertyAccessExpression);
                case SyntaxKind.ParenthesizedExpression:
                    return emitParenthesizedExpression(node as ParenthesizedExpression);
            }
        }
        if (isKeyword(node.kind)) return writeTokenNode(node, writeKeyword);
        if (isTokenKind(node.kind)) return writeTokenNode(node, writePunctuation);

        console.warn("todo - implment me - pipelineEmitWithHintWorker " + Debug.formatSyntaxKind(node.kind));
    }

    // Writers

    function writeLiteral(s: string) {
        writer.writeLiteral(s);
    }

    function writeStringLiteral(s: string) {
        writer.writeStringLiteral(s);
    }

    function writeBase(s: string) {
        writer.write(s);
    }

    function writeSymbol(s: string, sym: Symbol) {
        writer.writeSymbol(s, sym);
    }

    function writePunctuation(s: string) {
        writer.writePunctuation(s);
    }

    function writeTrailingSemicolon() {
        writer.writeTrailingSemicolon(";");
    }

    function writeKeyword(s: string) {
        writer.writeKeyword(s);
    }

    function writeOperator(s: string) {
        writer.writeOperator(s);
    }

    function writeParameter(s: string) {
        writer.writeParameter(s);
    }

    function writeComment(s: string) {
        writer.writeComment(s);
    }

    function writeSpace() {
        writer.writeSpace(" ");
    }

    function writeProperty(s: string) {
        writer.writeProperty(s);
    }

    function nonEscapingWrite(s: string) {
        // This should be defined in a snippet-escaping text writer.
        if (writer.nonEscapingWrite) {
            writer.nonEscapingWrite(s);
        }
        else {
            writer.write(s);
        }
    }

    function writeLine(count = 1) {
        for (let i = 0; i < count; i++) {
            writer.writeLine(i > 0);
        }
    }

    function increaseIndent() {
        writer.increaseIndent();
    }

    function decreaseIndent() {
        writer.decreaseIndent();
    }

    /**
     * Emits a token of a node with possible leading and trailing source maps.
     *
     * @param node The node containing the token.
     * @param token The token to emit.
     * @param tokenStartPos The start pos of the token.
     * @param emitCallback The callback used to emit the token.
     */
    function emitTokenWithSourceMap(node: Node | undefined, token: SyntaxKind, writer: (s: string) => void, tokenPos: number, emitCallback: (token: SyntaxKind, writer: (s: string) => void, tokenStartPos: number) => number) {
        return emitCallback(token, writer, tokenPos);
        // TODO
    }

    function writeToken(token: SyntaxKind, pos: number, writer: (s: string) => void, contextNode?: Node): number {
        return !sourceMapsDisabled
            ? emitTokenWithSourceMap(contextNode, token, writer, pos, writeTokenText)
            : writeTokenText(token, writer, pos);
    }

    function writeTokenNode(node: Node, writer: (s: string) => void) {
        if (onBeforeEmitToken) {
            onBeforeEmitToken(node);
        }
        writer(tokenToString(node.kind)!);
        if (onAfterEmitToken) {
            onAfterEmitToken(node);
        }
    }

    function writeTokenText(token: SyntaxKind, writer: (s: string) => void): void;
    function writeTokenText(token: SyntaxKind, writer: (s: string) => void, pos: number): number;
    function writeTokenText(token: SyntaxKind, writer: (s: string) => void, pos?: number): number {
        const tokenString = tokenToString(token)!;
        writer(tokenString);
        return pos! < 0 ? pos! : pos! + tokenString.length;
    }

    function skipSynthesizedParentheses(node: Node) {
        while (node.kind === SyntaxKind.ParenthesizedExpression && nodeIsSynthesized(node)) {
            node = (node as ParenthesizedExpression).expression;
        }

        return node;
    }
    
    function getEffectiveLines(getLineDifference: (includeComments: boolean) => number) {
        // If 'preserveSourceNewlines' is disabled, we should never call this function
        // because it could be more expensive than alternative approximations.
        Debug.assert(!!preserveSourceNewlines);
        // We start by measuring the line difference from a position to its adjacent comments,
        // so that this is counted as a one-line difference, not two:
        //
        //   node1;
        //   // NODE2 COMMENT
        //   node2;
        const lines = getLineDifference(/*includeComments*/ true);
        if (lines === 0) {
            // However, if the line difference considering comments was 0, we might have this:
            //
            //   node1; // NODE2 COMMENT
            //   node2;
            //
            // in which case we should be ignoring node2's comment, so this too is counted as
            // a one-line difference, not zero.
            return getLineDifference(/*includeComments*/ false);
        }
        return lines;
    }
    
    function getLinesBetweenNodes(parent: Node, node1: Node, node2: Node): number {
        if (getEmitFlags(parent) & EmitFlags.NoIndentation) {
            return 0;
        }

        parent = skipSynthesizedParentheses(parent);
        node1 = skipSynthesizedParentheses(node1);
        node2 = skipSynthesizedParentheses(node2);

        // Always use a newline for synthesized code if the synthesizer desires it.
        if (getStartsOnNewLine(node2)) {
            return 1;
        }

        if (currentSourceFile && !nodeIsSynthesized(parent) && !nodeIsSynthesized(node1) && !nodeIsSynthesized(node2)) {
            if (preserveSourceNewlines) {
                return getEffectiveLines(
                    includeComments =>
                        getLinesBetweenRangeEndAndRangeStart(
                            node1,
                            node2,
                            currentSourceFile!,
                            includeComments,
                        ),
                );
            }
            return rangeEndIsOnSameLineAsRangeStart(node1, node2, currentSourceFile) ? 0 : 1;
        }

        return 0;
    }

    function writeLineOrSpace(parentNode: Node, prevChildNode: Node, nextChildNode: Node) {
        if (getEmitFlags(parentNode) & EmitFlags.SingleLine) {
            writeSpace();
        }
        else if (preserveSourceNewlines) {
            const lines = getLinesBetweenNodes(parentNode, prevChildNode, nextChildNode);
            if (lines) {
                writeLine(lines);
            }
            else {
                writeSpace();
            }
        }
        else {
            writeLine();
        }
    }

    function writeLines(text: string): void {
        const lines = text.split(/\r\n?|\n/g);
        const indentation = guessIndentation(lines);
        for (const lineText of lines) {
            const line = indentation ? lineText.slice(indentation) : lineText;
            if (line.length) {
                writeLine();
                write(line);
            }
        }
    }

    function writeLinesAndIndent(lineCount: number, writeSpaceIfNotIndenting: boolean) {
        if (lineCount) {
            increaseIndent();
            writeLine(lineCount);
        }
        else if (writeSpaceIfNotIndenting) {
            writeSpace();
        }
    }

    // Helper function to decrease the indent if we previously indented.  Allows multiple
    // previous indent values to be considered at a time.  This also allows caller to just
    // call this once, passing in all their appropriate indent values, instead of needing
    // to call this helper function multiple times.
    function decreaseIndentIf(value1: boolean | number | undefined, value2?: boolean | number) {
        if (value1) {
            decreaseIndent();
        }
        if (value2) {
            decreaseIndent();
        }
    }

    function writeLineSeparatorsAndIndentBefore(node: Node, parent: Node): boolean {
        const leadingNewlines = preserveSourceNewlines && getLeadingLineTerminatorCount(parent, node, ListFormat.None);
        if (leadingNewlines) {
            writeLinesAndIndent(leadingNewlines, /*writeSpaceIfNotIndenting*/ false);
        }
        return !!leadingNewlines;
    }

    function writeLineSeparatorsAfter(node: Node, parent: Node) {
        const trailingNewlines = preserveSourceNewlines && getClosingLineTerminatorCount(parent, node, ListFormat.None, /*childrenTextRange*/ undefined);
        if (trailingNewlines) {
            writeLine(trailingNewlines);
        }
    }

    function getTextOfNode(node: Identifier | LiteralExpression, includeTrivia?: boolean): string {
        // if (isGeneratedIdentifier(node)) {
        //     return generateName(node);
        // }
        if (isStringLiteral(node) && node.textSourceNode) {
            return getTextOfNode(node.textSourceNode, includeTrivia);
        }
        const sourceFile = currentSourceFile; // const needed for control flow
        const canUseSourceFile = !!sourceFile && !!node.parent && !nodeIsSynthesized(node);
        if (isMemberName(node)) {
            if (!canUseSourceFile || getSourceFileOfNode(node) !== getOriginalNode(sourceFile)) {
                return idText(node);
            }
        }        
        else {
            Debug.assertNode(node, isLiteralExpression); // not strictly necessary
            if (!canUseSourceFile) {
                return node.text;
            }
        }
        return getSourceTextOfNodeFromSourceFile(sourceFile, node, includeTrivia);
    }

    function emitNumericLiteral(node: lpc.IntLiteral | lpc.FloatLiteral) {
        emitLiteral(node);
    }

    // SyntaxKind.StringLiteral
    // SyntaxKind.RegularExpressionLiteral
    // SyntaxKind.NoSubstitutionTemplateLiteral
    // SyntaxKind.TemplateHead
    // SyntaxKind.TemplateMiddle
    // SyntaxKind.TemplateTail
    function emitLiteral(node: LiteralLikeNode) {
        const text = getLiteralTextOfNode(node, printerOptions.neverAsciiEscape);
        if (
            (printerOptions.sourceMap || printerOptions.inlineSourceMap)
            && (node.kind === SyntaxKind.StringLiteral)
        ) {
            writeLiteral(text);
        }
        else {
            // Quick info expects all literals to be called with writeStringLiteral, as there's no specific type for numberLiterals
            writeStringLiteral(text);
        }
    }

    function emitArrayLiteralExpression(node: ArrayLiteralExpression) {                
        const elements = node.elements;
        const preferNewLine = node.multiLine ? ListFormat.PreferNewLine : ListFormat.None;
        emitExpressionList(node, elements, ListFormat.ArrayLiteralExpressionElements | preferNewLine, parenthesizer.parenthesizeExpressionForDisallowedComma);                
    }

    function getLiteralTextOfNode(node: LiteralLikeNode, neverAsciiEscape: boolean | undefined): string {
        if (node.kind === SyntaxKind.StringLiteral && (node as StringLiteral).textSourceNode) {
            const textSourceNode = (node as StringLiteral).textSourceNode!;
            if (isIdentifier(textSourceNode) || isPrivateIdentifier(textSourceNode) || lpc.isNumericLiteral(textSourceNode)) {
                const text = lpc.isNumericLiteral(textSourceNode) ? textSourceNode.text : getTextOfNode(textSourceNode);
                return neverAsciiEscape || (getEmitFlags(node) & EmitFlags.NoAsciiEscaping) ? `"${escapeString(text)}"` :
                    `"${escapeNonAsciiString(text)}"`;
            }
            else {
                return getLiteralTextOfNode(textSourceNode, neverAsciiEscape);
            }
        }

        const flags = (neverAsciiEscape ? GetLiteralTextFlags.NeverAsciiEscape : 0)
            | (printerOptions.terminateUnterminatedLiterals ? GetLiteralTextFlags.TerminateUnterminatedLiterals : 0)
            | (printerOptions.target && printerOptions.target >= ScriptTarget.LPC ? GetLiteralTextFlags.AllowNumericSeparator : 0);

        return getLiteralText(node, currentSourceFile, flags);
    }

    
    //
    // Identifiers
    //

    function emitIdentifier(node: Identifier) {
        const writeText = node.symbol ? writeSymbol : write;
        writeText(getTextOfNode(node, /*includeTrivia*/ false), node.symbol);
        emitList(node, getIdentifierTypeArguments(node), ListFormat.TypeParameters); // Call emitList directly since it could be an array of TypeParameterDeclarations _or_ type arguments
    }

    /**
     * Push a new name generation scope.
     */
    function pushNameGenerationScope(node: Node | undefined) {
        privateNameTempFlagsStack.push(privateNameTempFlags);
        privateNameTempFlags = TempFlags.Auto;
        reservedPrivateNamesStack.push(reservedPrivateNames);

        if (node && getEmitFlags(node) & EmitFlags.ReuseTempVariableScope) {
            return;
        }

        tempFlagsStack.push(tempFlags);
        tempFlags = TempFlags.Auto;
        formattedNameTempFlagsStack.push(formattedNameTempFlags);
        formattedNameTempFlags = undefined;
        reservedNamesStack.push(reservedNames);
    }

    /**
     * Pop the current name generation scope.
     */
    function popNameGenerationScope(node: Node | undefined) {
        privateNameTempFlags = privateNameTempFlagsStack.pop()!;
        reservedPrivateNames = reservedPrivateNamesStack.pop();

        if (node && getEmitFlags(node) & EmitFlags.ReuseTempVariableScope) {
            return;
        }

        tempFlags = tempFlagsStack.pop()!;
        formattedNameTempFlags = formattedNameTempFlagsStack.pop();
        reservedNames = reservedNamesStack.pop();
    }
    
    function generateMemberNames(node: Node | undefined) {
        if (!node) return;
        switch (node.kind) {
            case SyntaxKind.PropertyAssignment:
            case SyntaxKind.ShorthandPropertyAssignment:
            case SyntaxKind.PropertyDeclaration:
            // case SyntaxKind.PropertySignature:
            // case SyntaxKind.MethodDeclaration:
            // case SyntaxKind.MethodSignature:
            // case SyntaxKind.GetAccessor:
            // case SyntaxKind.SetAccessor:
                generateNameIfNeeded((node as NamedDeclaration).name);
                break;
        }
    }    

    function generateNameIfNeeded(name: DeclarationName | undefined) {
        if (name) {
            if (isGeneratedIdentifier(name) ) {
                generateName(name);
            }
            else if (isBindingPattern(name)) {
                generateNames(name);
            }
        }
    }

    function generateNames(node: Node | undefined) {
        if (!node) return;
        switch (node.kind) {
            case SyntaxKind.Block:
                forEach((node as Block).statements, generateNames);
                break;
            // case SyntaxKind.LabeledStatement:
            // case SyntaxKind.WithStatement:
            case SyntaxKind.DoWhileStatement:
            case SyntaxKind.WhileStatement:
                generateNames((node as DoWhileStatement | WhileStatement).statement);
                break;
            case SyntaxKind.IfStatement:
                generateNames((node as IfStatement).thenStatement);
                generateNames((node as IfStatement).elseStatement);
                break;
            case SyntaxKind.ForStatement:
                generateNames((node as ForStatement).initializer);
                generateNames((node as ForStatement).statement);
            case SyntaxKind.ForEachStatement:            
                generateNames((node as ForEachStatement).expression);
                generateNames((node as ForEachStatement).statement);
                break;
            case SyntaxKind.SwitchStatement:
                generateNames((node as SwitchStatement).caseBlock);
                break;
            case SyntaxKind.CaseBlock:
                forEach((node as CaseBlock).clauses, generateNames);
                break;
            case SyntaxKind.CaseClause:
            case SyntaxKind.DefaultClause:
                forEach((node as CaseOrDefaultClause).statements, generateNames);
                break;
            // case SyntaxKind.TryStatement:
            //     generateNames((node as TryStatement).tryBlock);
            //     generateNames((node as TryStatement).catchClause);
            //     generateNames((node as TryStatement).finallyBlock);
                break;
            case SyntaxKind.CatchStatement:
                // generateNames((node as CatchStatement).variableDeclaration);
                generateNames((node as CatchStatement).block);
                break;
            case SyntaxKind.VariableStatement:
                generateNames((node as VariableStatement).declarationList);
                break;
            case SyntaxKind.VariableDeclarationList:
                forEach((node as VariableDeclarationList).declarations, generateNames);
                break;
            case SyntaxKind.VariableDeclaration:
            case SyntaxKind.Parameter:
            case SyntaxKind.BindingElement:
            // case SyntaxKind.ClassDeclaration:
                generateNameIfNeeded((node as NamedDeclaration).name);
                break;
            case SyntaxKind.FunctionDeclaration:
                generateNameIfNeeded((node as FunctionDeclaration).name);
                if (getEmitFlags(node) & EmitFlags.ReuseTempVariableScope) {
                    forEach((node as FunctionDeclaration).parameters, generateNames);
                    generateNames((node as FunctionDeclaration).body);
                }
                break;
            // case SyntaxKind.ObjectBindingPattern:
            case SyntaxKind.ArrayBindingPattern:
                forEach((node as BindingPattern).elements, generateNames);
                break;
            // case SyntaxKind.ImportDeclaration:
            //     generateNames((node as ImportDeclaration).importClause);
            //     break;
            // case SyntaxKind.ImportClause:
            //     generateNameIfNeeded((node as ImportClause).name);
            //     generateNames((node as ImportClause).namedBindings);
            //     break;
            // case SyntaxKind.NamespaceImport:
            //     generateNameIfNeeded((node as NamespaceImport).name);
            //     break;
            // case SyntaxKind.NamespaceExport:
            //     generateNameIfNeeded((node as NamespaceExport).name);
            //     break;
            // case SyntaxKind.NamedImports:
            //     forEach((node as NamedImports).elements, generateNames);
            //     break;
            // case SyntaxKind.ImportSpecifier:
            //     generateNameIfNeeded((node as ImportSpecifier).propertyName || (node as ImportSpecifier).name);
            //     break;
        }
    }

    function isReservedName(name: string, privateName: boolean): boolean {
        let set: Set<string> | undefined;
        let stack: (Set<string> | undefined)[];
        if (privateName) {
            set = reservedPrivateNames;
            stack = reservedPrivateNamesStack;
        }
        else {
            set = reservedNames;
            stack = reservedNamesStack;
        }

        if (set?.has(name)) {
            return true;
        }
        for (let i = stack.length - 1; i >= 0; i--) {
            if (set === stack[i]) {
                continue;
            }
            set = stack[i];
            if (set?.has(name)) {
                return true;
            }
        }
        return false;
    }

    
    /**
     * Returns a value indicating whether a name is unique globally, within the current file,
     * or within the NameGenerator.
     */
    function isUniqueName(name: string, privateName: boolean): boolean {
        return isFileLevelUniqueNameInCurrentFile(name, privateName)
            && !isReservedName(name, privateName)
            && !generatedNames.has(name);
    }
    
    /**
     * Returns a value indicating whether a name is unique globally or within the current file.
     *
     * @param _isPrivate (unused) this parameter exists to avoid an unnecessary adaptor frame in v8
     * when `isfileLevelUniqueName` is passed as a callback to `makeUniqueName`.
     */
    function isFileLevelUniqueNameInCurrentFile(name: string, _isPrivate: boolean) {
        return currentSourceFile ? isFileLevelUniqueName(currentSourceFile, name, hasGlobalName) : true;
    }


    /**
     * Generate a name that is unique within the current file and doesn't conflict with any names
     * in global scope. The name is formed by adding an '_n' suffix to the specified base name,
     * where n is a positive integer. Note that names generated by makeTempVariableName and
     * makeUniqueName are guaranteed to never conflict.
     * If `optimistic` is set, the first instance will use 'baseName' verbatim instead of 'baseName_1'
     */
    function makeUniqueName(baseName: string, checkFn: (name: string, privateName: boolean) => boolean = isUniqueName, optimistic: boolean, scoped: boolean, privateName: boolean, prefix: string, suffix: string): string {
        if (baseName.length > 0 && baseName.charCodeAt(0) === CharacterCodes.hash) {
            baseName = baseName.slice(1);
        }
        if (prefix.length > 0 && prefix.charCodeAt(0) === CharacterCodes.hash) {
            prefix = prefix.slice(1);
        }
        if (optimistic) {
            const fullName = formatGeneratedName(privateName, prefix, baseName, suffix);
            if (checkFn(fullName, privateName)) {
                // if (privateName) {
                //     reservePrivateNameInNestedScopes(fullName);
                // }
                if (scoped) {
                    reserveNameInNestedScopes(fullName);
                }
                else {
                    generatedNames.add(fullName);
                }
                return fullName;
            }
        }
        // Find the first unique 'name_n', where n is a positive number
        if (baseName.charCodeAt(baseName.length - 1) !== CharacterCodes._) {
            baseName += "_";
        }
        let i = 1;
        while (true) {
            const fullName = formatGeneratedName(privateName, prefix, baseName + i, suffix);
            if (checkFn(fullName, privateName)) {
                // if (privateName) {
                //     reservePrivateNameInNestedScopes(fullName);
                // }
                if (scoped) {
                    reserveNameInNestedScopes(fullName);
                }
                else {
                    generatedNames.add(fullName);
                }
                return fullName;
            }
            i++;
        }
    }

    
    /**
     * Generates a unique name from a node.
     */
    function generateNameForNode(node: Node, privateName: boolean, flags: GeneratedIdentifierFlags, prefix: string, suffix: string): string {
        switch (node.kind) {
            case SyntaxKind.Identifier:            
                return makeUniqueName(
                    getTextOfNode(node as Identifier),
                    isUniqueName,
                    !!(flags & GeneratedIdentifierFlags.Optimistic),
                    !!(flags & GeneratedIdentifierFlags.ReservedInNestedScopes),
                    privateName,
                    prefix,
                    suffix,
                );
            // case SyntaxKind.ModuleDeclaration:
            // case SyntaxKind.EnumDeclaration:
            //     Debug.assert(!prefix && !suffix && !privateName);
            //     return generateNameForModuleOrEnum(node as ModuleDeclaration | EnumDeclaration);
            // case SyntaxKind.ImportDeclaration:
            // case SyntaxKind.ExportDeclaration:
            //     Debug.assert(!prefix && !suffix && !privateName);
            //     return generateNameForImportOrExportDeclaration(node as ImportDeclaration | ExportDeclaration);
            case SyntaxKind.FunctionDeclaration: {
            // case SyntaxKind.ClassDeclaration: {
                Debug.assert(!prefix && !suffix && !privateName);
                const name = (node as FunctionDeclaration).name;
                if (name && !isGeneratedIdentifier(name)) {
                    return generateNameForNode(name, /*privateName*/ false, flags, prefix, suffix);
                }
                Debug.fail("shouldn't be here");
                //return generateNameForExportDefault();
            }
            // case SyntaxKind.ExportAssignment:
            //     Debug.assert(!prefix && !suffix && !privateName);
            //     return generateNameForExportDefault();
            case SyntaxKind.ClassExpression:
                Debug.fail("implement me");
                // Debug.assert(!prefix && !suffix && !privateName);
                // return generateNameForClassExpression();
            // case SyntaxKind.MethodDeclaration:
            // case SyntaxKind.GetAccessor:
            // case SyntaxKind.SetAccessor:
            //     return generateNameForMethodOrAccessor(node as MethodDeclaration | AccessorDeclaration, privateName, prefix, suffix);
            case SyntaxKind.ComputedPropertyName:
                return makeTempVariableName(TempFlags.Auto, /*reservedInNestedScopes*/ true, privateName, prefix, suffix);
            default:
                return makeTempVariableName(TempFlags.Auto, /*reservedInNestedScopes*/ false, privateName, prefix, suffix);
        }
    }

    function generateNameCached(node: Node, privateName: boolean, flags?: GeneratedIdentifierFlags, prefix?: string | GeneratedNamePart, suffix?: string) {
        const nodeId = getNodeId(node);
        const cache = privateName ? nodeIdToGeneratedPrivateName : nodeIdToGeneratedName;
        return cache[nodeId] || (cache[nodeId] = generateNameForNode(node, privateName, flags ?? GeneratedIdentifierFlags.None, formatGeneratedNamePart(prefix, generateName), formatGeneratedNamePart(suffix)));
    }

    function getTempFlags(formattedNameKey: string) {
        switch (formattedNameKey) {
            case "":
                return tempFlags;
            case "#":
                return privateNameTempFlags;
            default:
                return formattedNameTempFlags?.get(formattedNameKey) ?? TempFlags.Auto;
        }
    }

    function setTempFlags(formattedNameKey: string, flags: TempFlags) {
        switch (formattedNameKey) {
            case "":
                tempFlags = flags;
                break;
            case "#":
                privateNameTempFlags = flags;
                break;
            default:
                formattedNameTempFlags ??= new Map();
                formattedNameTempFlags.set(formattedNameKey, flags);
                break;
        }
    }

    function reserveNameInNestedScopes(name: string) {
        if (!reservedNames || reservedNames === lastOrUndefined(reservedNamesStack)) {
            reservedNames = new Set();
        }
        reservedNames.add(name);
    }
    
    /**
     * Return the next available name in the pattern _a ... _z, _0, _1, ...
     * TempFlags._i or TempFlags._n may be used to express a preference for that dedicated name.
     * Note that names generated by makeTempVariableName and makeUniqueName will never conflict.
     */
    function makeTempVariableName(flags: TempFlags, reservedInNestedScopes: boolean, privateName: boolean, prefix: string, suffix: string): string {
        if (prefix.length > 0 && prefix.charCodeAt(0) === CharacterCodes.hash) {
            prefix = prefix.slice(1);
        }

        // Generate a key to use to acquire a TempFlags counter based on the fixed portions of the generated name.
        const key = formatGeneratedName(privateName, prefix, "", suffix);
        let tempFlags = getTempFlags(key);

        if (flags && !(tempFlags & flags)) {
            const name = flags === TempFlags._i ? "_i" : "_n";
            const fullName = formatGeneratedName(privateName, prefix, name, suffix);
            if (isUniqueName(fullName, privateName)) {
                tempFlags |= flags;
                // if (privateName) {
                //     reservePrivateNameInNestedScopes(fullName);
                // }
                if (reservedInNestedScopes) {
                    reserveNameInNestedScopes(fullName);
                }
                setTempFlags(key, tempFlags);
                return fullName;
            }
        }

        while (true) {
            const count = tempFlags & TempFlags.CountMask;
            tempFlags++;
            // Skip over 'i' and 'n'
            if (count !== 8 && count !== 13) {
                const name = count < 26
                    ? "_" + String.fromCharCode(CharacterCodes.a + count)
                    : "_" + (count - 26);
                const fullName = formatGeneratedName(privateName, prefix, name, suffix);
                if (isUniqueName(fullName, privateName)) {
                    // if (privateName) {
                    //     reservePrivateNameInNestedScopes(fullName);
                    // }
                    if (reservedInNestedScopes) {
                        reserveNameInNestedScopes(fullName);
                    }
                    setTempFlags(key, tempFlags);
                    return fullName;
                }
            }
        }
    }

    /**
     * Generates a unique identifier for a node.
     */
    function makeName(name: GeneratedIdentifier ) {
        const autoGenerate = name.emitNode.autoGenerate;
        const prefix = formatGeneratedNamePart(autoGenerate.prefix, generateName);
        const suffix = formatGeneratedNamePart(autoGenerate.suffix);
        switch (autoGenerate.flags & GeneratedIdentifierFlags.KindMask) {
            case GeneratedIdentifierFlags.Auto:
                return makeTempVariableName(TempFlags.Auto, !!(autoGenerate.flags & GeneratedIdentifierFlags.ReservedInNestedScopes), isPrivateIdentifier(name), prefix, suffix);
            case GeneratedIdentifierFlags.Loop:
                Debug.assertNode(name, isIdentifier);
                return makeTempVariableName(TempFlags._i, !!(autoGenerate.flags & GeneratedIdentifierFlags.ReservedInNestedScopes), /*privateName*/ false, prefix, suffix);
            case GeneratedIdentifierFlags.Unique:
                return makeUniqueName(
                    idText(name),
                    (autoGenerate.flags & GeneratedIdentifierFlags.FileLevel) ? isFileLevelUniqueNameInCurrentFile : isUniqueName,
                    !!(autoGenerate.flags & GeneratedIdentifierFlags.Optimistic),
                    !!(autoGenerate.flags & GeneratedIdentifierFlags.ReservedInNestedScopes),
                    isPrivateIdentifier(name),
                    prefix,
                    suffix,
                );
        }

        return Debug.fail(`Unsupported GeneratedIdentifierKind: ${Debug.formatEnum(autoGenerate.flags & GeneratedIdentifierFlags.KindMask, (lpc as any).GeneratedIdentifierFlags, /*isFlags*/ true)}.`);
    }

    
    /**
     * Generate the text for a generated identifier.
     */
    function generateName(name: GeneratedIdentifier) {
        const autoGenerate = name.emitNode.autoGenerate;
        if ((autoGenerate.flags & GeneratedIdentifierFlags.KindMask) === GeneratedIdentifierFlags.Node) {
            // Node names generate unique names based on their original node
            // and are cached based on that node's id.
            return generateNameCached(getNodeForGeneratedName(name), isPrivateIdentifier(name), autoGenerate.flags, autoGenerate.prefix, autoGenerate.suffix);
        }
        else {
            // Auto, Loop, and Unique names are cached based on their unique
            // autoGenerateId.
            const autoGenerateId = autoGenerate.id;
            return autoGeneratedIdToGeneratedName[autoGenerateId] || (autoGeneratedIdToGeneratedName[autoGenerateId] = makeName(name));
        }
    }
    
    function emitTypeLiteral(node: TypeLiteralNode) {
        pushNameGenerationScope(node);
        forEach(node.members, generateMemberNames);

        writePunctuation("{");
        const flags = getEmitFlags(node) & EmitFlags.SingleLine ? ListFormat.SingleLineTypeLiteralMembers : ListFormat.MultiLineTypeLiteralMembers;
        emitList(node, node.members, flags | ListFormat.NoSpaceIfEmpty);
        writePunctuation("}");

        popNameGenerationScope(node);
    }

    function emitModifierList(node: Node, modifiers: NodeArray<Modifier> | undefined): number {
        emitList(node, modifiers, ListFormat.Modifiers);
        const lastModifier = lastOrUndefined(modifiers);
        return lastModifier && !positionIsSynthesized(lastModifier.end) ? lastModifier.end : node.pos;
    }
    
    function emitDecoratorsAndModifiers(node: Node, modifiers: NodeArray<Modifier> | undefined, allowDecorators: boolean) {
        if (modifiers?.length) {
            return emitModifierList(node, modifiers as NodeArray<Modifier>);            
        }

        return node.pos;
    }
        
    function emitSignatureAndBody<T extends SignatureDeclaration>(node: T, emitSignatureHead: (node: T) => void, emitBody: (node: T) => void) {
        const indentedFlag = getEmitFlags(node) & EmitFlags.Indented;
        if (indentedFlag) {
            increaseIndent();
        }

        pushNameGenerationScope(node);
        forEach(node.parameters, generateNames);
        emitSignatureHead(node);
        emitBody(node);
        popNameGenerationScope(node);

        if (indentedFlag) {
            decreaseIndent();
        }
    }
    
    function canEmitSimpleArrowHead(parentNode: FunctionTypeNode |  ArrowFunction, parameters: NodeArray<ParameterDeclaration>) {
        const parameter = singleOrUndefined(parameters);
        return parameter
            && parameter.pos === parentNode.pos // may not have parsed tokens between parent and parameter
            && isArrowFunction(parentNode) // only arrow functions may have simple arrow head
            && !parentNode.type // arrow function may not have return type annotation
            && !some(parentNode.modifiers) // parent may not have decorators or modifiers
            // && !some(parentNode.typeParameters) // parent may not have type parameters
            && !some(parameter.modifiers) // parameter may not have decorators or modifiers
            && !parameter.dotDotDotToken // parameter may not be rest
            // && !parameter.questionToken // parameter may not be optional
            && !parameter.type // parameter may not have a type annotation
            && !parameter.initializer // parameter may not have an initializer
            && isIdentifier(parameter.name); // parameter name must be identifier
    }

    function emitParameters(parentNode: Node, parameters: NodeArray<ParameterDeclaration>) {
        emitList(parentNode, parameters, ListFormat.Parameters);
    }

    function emitParametersForArrow(parentNode: FunctionTypeNode | ArrowFunction, parameters: NodeArray<ParameterDeclaration>) {
        if (canEmitSimpleArrowHead(parentNode, parameters)) {
            emitList(parentNode, parameters, ListFormat.Parameters & ~ListFormat.Parenthesis);
        }
        else {
            emitParameters(parentNode, parameters);
        }
    }

    function emitFunctionTypeHead(node: FunctionTypeNode) {
        // emitTypeParameters(node, node.typeParameters);
        emitParametersForArrow(node, node.parameters);
        writeSpace();
        writePunctuation("=>");
    }

    function emitFunctionTypeBody(node: FunctionTypeNode) {
        writeSpace();
        emit(node.type);
    }

    function emitNodeWithWriter(node: Node | undefined, writer: typeof write) {
        if (!node) return;
        const savedWrite = write;
        write = writer;
        emit(node);
        write = savedWrite;
    }

    function emitParameter(node: ParameterDeclaration) {
        emitDecoratorsAndModifiers(node, node.modifiers, /*allowDecorators*/ true);
        emitTypeAnnotation(node.type);
        if (node.ampToken) {
             emit(node.ampToken);
             if (node.ampToken.kind === SyntaxKind.RefKeyword) writeSpace();
        }
        emitNodeWithWriter(node.name, writeParameter);
        emit(node.dotDotDotToken);
        
        // TODO - optional and default params


        // The comment position has to fallback to any present node within the parameterdeclaration because as it turns out, the parser can make parameter declarations with _just_ an initializer.
        emitInitializer(
            node.initializer, 
            node.type ? node.type.end : node.name ? node.name.end : node.modifiers ? node.modifiers.end : node.pos, 
            node, 
            parenthesizer.parenthesizeExpressionForDisallowedComma
        );
    }

    function emitQualifiedName(node: QualifiedName) {
        emitEntityName(node.left);
        writePunctuation(".");
        emit(node.right);
    }
    
    function emitEntityName(node: EntityName) {
        if (node.kind === SyntaxKind.Identifier) {
            emitExpression(node);
        }
        else {
            emit(node);
        }
    }

    function emitFunctionType(node: FunctionTypeNode) {
        emitSignatureAndBody(node, emitFunctionTypeHead, emitFunctionTypeBody);
    }
    
    function emitVariableStatement(node: VariableStatement) {
        emitDecoratorsAndModifiers(node, node.modifiers, /*allowDecorators*/ false);
        emitTypeAnnotation(node.type);
        emit(node.declarationList);
        writeTrailingSemicolon();
    }


    function emitArrayType(node: ArrayTypeNode) {
        emit(node.elementType, parenthesizer.parenthesizeNonArrayTypeOfPostfixType);
        writePunctuation("*");        
    }

    // 
    // Type members
    //

    function emitPropertySignature(node: PropertySignature) {
        emitModifierList(node, node.modifiers);
        emitTypeAnnotation(node.type);
        emitNodeWithWriter(node.name, writeProperty);
        // emit(node.questionToken);
        
        writeTrailingSemicolon();
    }

    //
    // Declarations
    //

    function emitFunctionDeclaration(node: FunctionDeclaration) {
        emitFunctionDeclarationOrExpression(node);
    }

    function emitFunctionDeclarationOrExpression(node: FunctionDeclaration | FunctionExpression) {
        emitDecoratorsAndModifiers(node, node.modifiers, /*allowDecorators*/ false);
        emitTypeAnnotation(node.type);
        // writeKeyword("function");
        emit(node.asteriskToken);
        writeSpace();
        emitIdentifierName(node.name);
        emitSignatureAndBody(node, emitSignatureHead, emitFunctionBody);
    }

    function emitFunctionBody<T extends Exclude<FunctionLikeDeclaration, ArrowFunction>>(node: T) {
        const body = node.body;
        if (body) {
            emitBlockFunctionBody(body as lpc.FunctionBody);
        }
        else {
            writeTrailingSemicolon();
        }
    }

    function emitBlockFunctionBody(body: Block) {
        generateNames(body);
        onBeforeEmitNode?.(body);
        writeSpace();
        writePunctuation("{");
        increaseIndent();

        const emitBlockFunctionBody = shouldEmitBlockFunctionBodyOnSingleLine(body)
            ? emitBlockFunctionBodyOnSingleLine
            : emitBlockFunctionBodyWorker;

        emitBodyWithDetachedComments(body, body.statements, emitBlockFunctionBody);

        decreaseIndent();
        writeToken(SyntaxKind.CloseBraceToken, body.statements.end, writePunctuation, body);
        onAfterEmitNode?.(body);
    }

    function emitBlockFunctionBodyOnSingleLine(body: Block) {
        emitBlockFunctionBodyWorker(body, /*emitBlockFunctionBodyOnSingleLine*/ true);
    }

    function emitBlockFunctionBodyWorker(body: Block, emitBlockFunctionBodyOnSingleLine?: boolean) {
        // Emit all the prologue directives (like "use strict").
        const statementOffset = emitPrologueDirectives(body.statements);
        const pos = writer.getTextPos();
        emitHelpers(body);
        if (statementOffset === 0 && pos === writer.getTextPos() && emitBlockFunctionBodyOnSingleLine) {
            decreaseIndent();
            emitList(body, body.statements, ListFormat.SingleLineFunctionBodyStatements);
            increaseIndent();
        }
        else {
            emitList(body, body.statements, ListFormat.MultiLineFunctionBodyStatements, /*parenthesizerRule*/ undefined, statementOffset);
        }
    }

    function getSortedEmitHelpers(node: Node) {
        const helpers = getEmitHelpers(node);
        return helpers && stableSort(helpers, compareEmitHelpers);
    }
    
    function emitHelpers(node: Node) {
        let helpersEmitted = false;
        const bundle = node.kind === SyntaxKind.Bundle ? node as Bundle : undefined;
        if (bundle && moduleKind === ModuleKind.None) {
            return;
        }
        const numNodes = bundle ? bundle.sourceFiles.length : 1;
        for (let i = 0; i < numNodes; i++) {
            const currentNode = bundle ? bundle.sourceFiles[i] : node;
            const sourceFile = isSourceFile(currentNode) ? currentNode : currentSourceFile;
            const shouldSkip = printerOptions.noEmitHelpers || (!!sourceFile && hasRecordedExternalHelpers(sourceFile));
            const shouldBundle = isSourceFile(currentNode) && !isOwnFileEmit;
            const helpers = getSortedEmitHelpers(currentNode);
            if (helpers) {
                for (const helper of helpers) {
                    if (!helper.scoped) {
                        // Skip the helper if it can be skipped and the noEmitHelpers compiler
                        // option is set, or if it can be imported and the importHelpers compiler
                        // option is set.
                        if (shouldSkip) continue;

                        // Skip the helper if it can be bundled but hasn't already been emitted and we
                        // are emitting a bundled module.
                        if (shouldBundle) {
                            if (bundledHelpers.get(helper.name)) {
                                continue;
                            }

                            bundledHelpers.set(helper.name, true);
                        }
                    }
                    else if (bundle) {
                        // Skip the helper if it is scoped and we are emitting bundled helpers
                        continue;
                    }
                    if (typeof helper.text === "string") {
                        writeLines(helper.text);
                    }
                    else {
                        writeLines(helper.text(makeFileLevelOptimisticUniqueName));
                    }
                    helpersEmitted = true;
                }
            }
        }

        return helpersEmitted;
    }
    
    function makeFileLevelOptimisticUniqueName(name: string) {
        return makeUniqueName(name, isFileLevelUniqueNameInCurrentFile, /*optimistic*/ true, /*scoped*/ false, /*privateName*/ false, /*prefix*/ "", /*suffix*/ "");
    }

    /**
     * Emits any prologue directives at the start of a Statement list, returning the
     * number of prologue directives written to the output.
     */
    function emitPrologueDirectives(statements: readonly Node[], sourceFile?: SourceFile, seenPrologueDirectives?: Set<string>): number {
        let needsToSetSourceFile = !!sourceFile;
        for (let i = 0; i < statements.length; i++) {
            const statement = statements[i];
            if (isPrologueDirective(statement)) {
                const shouldEmitPrologueDirective = seenPrologueDirectives ? !seenPrologueDirectives.has(statement.expression.text) : true;
                if (shouldEmitPrologueDirective) {
                    if (needsToSetSourceFile) {
                        needsToSetSourceFile = false;
                        setSourceFile(sourceFile);
                    }
                    writeLine();
                    emit(statement);
                    if (seenPrologueDirectives) {
                        seenPrologueDirectives.add(statement.expression.text);
                    }
                }
            }
            else {
                // return index of the first non prologue directive
                return i;
            }
        }

        return statements.length;
    }

    function emitDetachedCommentsAndUpdateCommentsInfo(range: TextRange) {
        const currentDetachedCommentInfo = currentSourceFile && emitDetachedComments(currentSourceFile.text, getCurrentLineMap(), writer, emitComment, range, newLine, commentsDisabled);
        if (currentDetachedCommentInfo) {
            if (detachedCommentsInfo) {
                detachedCommentsInfo.push(currentDetachedCommentInfo);
            }
            else {
                detachedCommentsInfo = [currentDetachedCommentInfo];
            }
        }
    }

    function shouldWriteComment(text: string, pos: number) {
        if (printerOptions.onlyPrintJsDocStyle) {
            return (isJSDocLikeText(text, pos) || isPinnedComment(text, pos));
        }
        return true;
    }

    function emitComment(text: string, lineMap: readonly number[], writer: EmitTextWriter, commentPos: number, commentEnd: number, newLine: string) {
        if (!currentSourceFile || !shouldWriteComment(currentSourceFile.text, commentPos)) return;
        emitPos(commentPos);
        writeCommentRange(text, lineMap, writer, commentPos, commentEnd, newLine);
        emitPos(commentEnd);
    }

    /**
     * Emits a mapping.
     *
     * If the position is synthetic (undefined or a negative value), no mapping will be
     * created.
     *
     * @param pos The position.
     */
    function emitPos(pos: number) {
        if (sourceMapsDisabled || positionIsSynthesized(pos) || isJsonSourceMapSource(sourceMapSource)) {
            return;
        }

        const { line: sourceLine, character: sourceCharacter } = getLineAndCharacterOfPosition(sourceMapSource, pos);
        sourceMapGenerator!.addMapping(
            writer.getLine(),
            writer.getColumn(),
            sourceMapSourceIndex,
            sourceLine,
            sourceCharacter,
            /*nameIndex*/ undefined,
        );
    }
    
    function emitBodyWithDetachedComments<T extends Node>(node: T, detachedRange: TextRange, emitCallback: (node: T) => void) {
        enterComment();
        const { pos, end } = detachedRange;
        const emitFlags = getEmitFlags(node);
        const skipLeadingComments = pos < 0 || (emitFlags & EmitFlags.NoLeadingComments) !== 0;
        const skipTrailingComments = commentsDisabled || end < 0 || (emitFlags & EmitFlags.NoTrailingComments) !== 0;
        if (!skipLeadingComments) {
            emitDetachedCommentsAndUpdateCommentsInfo(detachedRange);
        }

        exitComment();
        if (emitFlags & EmitFlags.NoNestedComments && !commentsDisabled) {
            commentsDisabled = true;
            emitCallback(node);
            commentsDisabled = false;
        }
        else {
            emitCallback(node);
        }

        enterComment();
        if (!skipTrailingComments) {
            emitLeadingComments(detachedRange.end, /*isEmittedNode*/ true);
            if (hasWrittenComment && !writer.isAtStartOfLine()) {
                writer.writeLine();
            }
        }
        exitComment();
    }

    function emitLeadingComments(pos: number, isEmittedNode: boolean) {
        hasWrittenComment = false;

        if (isEmittedNode) {
            // if (pos === 0 && currentSourceFile?.isDeclarationFile) {
            //     forEachLeadingCommentToEmit(pos, emitNonTripleSlashLeadingComment);
            // }
            // else {
                forEachLeadingCommentToEmit(pos, emitLeadingComment);
            // }
        }
        else if (pos === 0) {
            // If the node will not be emitted in JS, remove all the comments(normal, pinned and ///) associated with the node,
            // unless it is a triple slash comment at the top of the file.
            // For Example:
            //      /// <reference-path ...>
            //      declare var x;
            //      /// <reference-path ...>
            //      interface F {}
            //  The first /// will NOT be removed while the second one will be removed even though both node will not be emitted
            // forEachLeadingCommentToEmit(pos, emitTripleSlashLeadingComment);
            console.debug("todo - emitLeadingComments");
        }
    }

    function emitLeadingComment(commentPos: number, commentEnd: number, kind: SyntaxKind, hasTrailingNewLine: boolean, rangePos: number) {
        if (!currentSourceFile || !shouldWriteComment(currentSourceFile.text, commentPos)) return;
        if (!hasWrittenComment) {
            emitNewLineBeforeLeadingCommentOfPosition(getCurrentLineMap(), writer, rangePos, commentPos);
            hasWrittenComment = true;
        }

        // Leading comments are emitted at /*leading comment1 */space/*leading comment*/space
        emitPos(commentPos);
        writeCommentRange(currentSourceFile.text, getCurrentLineMap(), writer, commentPos, commentEnd, newLine);
        emitPos(commentEnd);

        if (hasTrailingNewLine) {
            writer.writeLine();
        }
        else if (kind === SyntaxKind.MultiLineCommentTrivia) {
            writer.writeSpace(" ");
        }
    }

    function forEachLeadingCommentWithoutDetachedComments(cb: (commentPos: number, commentEnd: number, kind: SyntaxKind, hasTrailingNewLine: boolean, rangePos: number) => void) {
        if (!currentSourceFile) return;
        // get the leading comments from detachedPos
        const pos = lpc.last(detachedCommentsInfo!).detachedCommentEndPos;
        if (detachedCommentsInfo!.length - 1) {
            detachedCommentsInfo!.pop();
        }
        else {
            detachedCommentsInfo = undefined;
        }

        lpc.forEachLeadingCommentRange(currentSourceFile.text, pos, cb, /*state*/ pos);
    }

    function forEachLeadingCommentToEmit(pos: number, cb: (commentPos: number, commentEnd: number, kind: SyntaxKind, hasTrailingNewLine: boolean, rangePos: number) => void) {
        // Emit the leading comments only if the container's pos doesn't match because the container should take care of emitting these comments
        if (currentSourceFile && (containerPos === -1 || pos !== containerPos)) {
            if (hasDetachedComments(pos)) {
                forEachLeadingCommentWithoutDetachedComments(cb);
            }
            else {
                lpc.forEachLeadingCommentRange(currentSourceFile.text, pos, cb, /*state*/ pos);
            }
        }
    }

    function hasDetachedComments(pos: number) {
        return detachedCommentsInfo !== undefined && lpc.last(detachedCommentsInfo).nodePos === pos;
    }
    
    function shouldEmitBlockFunctionBodyOnSingleLine(body: Block) {
        // We must emit a function body as a single-line body in the following case:
        // * The body has NodeEmitFlags.SingleLine specified.

        // We must emit a function body as a multi-line body in the following cases:
        // * The body is explicitly marked as multi-line.
        // * A non-synthesized body's start and end position are on different lines.
        // * Any statement in the body starts on a new line.

        if (getEmitFlags(body) & EmitFlags.SingleLine) {
            return true;
        }

        if (body.multiLine) {
            return false;
        }

        if (!nodeIsSynthesized(body) && currentSourceFile && !rangeIsOnSingleLine(body, currentSourceFile)) {
            return false;
        }

        if (
            getLeadingLineTerminatorCount(body, firstOrUndefined(body.statements), ListFormat.PreserveLines)
            || getClosingLineTerminatorCount(body, lastOrUndefined(body.statements), ListFormat.PreserveLines, body.statements)
        ) {
            return false;
        }

        let previousStatement: Statement | undefined;
        for (const statement of body.statements) {
            if (getSeparatingLineTerminatorCount(previousStatement, statement, ListFormat.PreserveLines) > 0) {
                return false;
            }

            previousStatement = statement;
        }

        return true;
    }

    function emitVariableDeclaration(node: VariableDeclaration) {
        // don't emit full type here, just the array indicator
        if (node.type && lpc.isArrayTypeNode(node.type)) {
            writePunctuation("*");
        }
        emit(node.name);        
        emitInitializer(node.initializer, node.type?.end ?? node.name.emitNode?.typeNode?.end ?? node.name.end, node, parenthesizer.parenthesizeExpressionForDisallowedComma);
    }

    function emitCallSignature(node: CallSignatureDeclaration) {
        emitSignatureAndBody(node, emitSignatureHead, emitEmptyFunctionBody);
    }

    function commentWillEmitNewLine(node: CommentRange) {
        return node.kind === SyntaxKind.SingleLineCommentTrivia || !!node.hasTrailingNewLine;
    }
    
    function willEmitLeadingNewLine(node: Expression): boolean {
        if (!currentSourceFile) return false;
        const leadingCommentRanges = getLeadingCommentRanges(currentSourceFile.text, node.pos);
        if (leadingCommentRanges) {
            const parseNode = getParseTreeNode(node);
            if (parseNode && isParenthesizedExpression(parseNode.parent)) {
                return true;
            }
        }
        if (some(leadingCommentRanges, commentWillEmitNewLine)) return true;
        if (some(getSyntheticLeadingComments(node), commentWillEmitNewLine)) return true;
        if (isPartiallyEmittedExpression(node)) {
            if (node.pos !== node.expression.pos) {
                if (some(getTrailingCommentRanges(currentSourceFile.text, node.expression.pos), commentWillEmitNewLine)) return true;
            }
            return willEmitLeadingNewLine(node.expression);
        }
        return false;
    }
    
    /**
     * Wraps an expression in parens if we would emit a leading comment that would introduce a line separator
     * between the node and its parent.
     */
    function parenthesizeExpressionForNoAsi(node: Expression) {
        if (!commentsDisabled && isPartiallyEmittedExpression(node) && willEmitLeadingNewLine(node)) {
            const parseNode = getParseTreeNode(node);
            if (parseNode && isParenthesizedExpression(parseNode)) {
                // If the original node was a parenthesized expression, restore it to preserve comment and source map emit
                const parens = factory.createParenthesizedExpression(node.expression);
                setOriginalNode(parens, node);
                setTextRange(parens, parseNode);
                return parens;
            }
            return factory.createParenthesizedExpression(node);
        }
        return node;
    }

    function emitExpressionWithLeadingSpace(node: Expression | undefined, parenthesizerRule?: (node: Expression) => Expression) {
        if (node) {
            writeSpace();
            emitExpression(node, parenthesizerRule);
        }
    }

    function emitElementAccessExpression(node: ElementAccessExpression) {
        emitExpression(node.expression, parenthesizer.parenthesizeLeftSideOfAccess);
        // emit(node.questionDotToken);
        emitTokenWithComment(SyntaxKind.OpenBracketToken, node.expression.end, writePunctuation, node);
        emitExpression(node.argumentExpression);
        emitTokenWithComment(SyntaxKind.CloseBracketToken, node.argumentExpression.end, writePunctuation, node);
    }
    
    function emitParenthesizedExpression(node: ParenthesizedExpression) {
        const openParenPos = emitTokenWithComment(SyntaxKind.OpenParenToken, node.pos, writePunctuation, node);
        const indented = writeLineSeparatorsAndIndentBefore(node.expression, node);
        emitExpression(node.expression, /*parenthesizerRule*/ undefined);
        writeLineSeparatorsAfter(node.expression, node);
        decreaseIndentIf(indented);
        emitTokenWithComment(SyntaxKind.CloseParenToken, node.expression ? node.expression.end : openParenPos, writePunctuation, node);
    }

    function emitPropertyAccessExpression(node: PropertyAccessExpression) {
        emitExpression(node.expression, parenthesizer.parenthesizeLeftSideOfAccess);
        const token = /*node.questionDotToken ||*/ setTextRangePosEnd(factory.createToken(SyntaxKind.MinusGreaterThanToken) as lpc.MinusGreaterThanToken, node.expression.end, node.name.pos);
        const linesBeforeDot = getLinesBetweenNodes(node, node.expression, token);
        const linesAfterDot = getLinesBetweenNodes(node, token, node.name);

        writeLinesAndIndent(linesBeforeDot, /*writeSpaceIfNotIndenting*/ false);

        // const shouldEmitDotDot = //token.kind !== SyntaxKind.QuestionDotToken &&
        //     mayNeedDotDotForPropertyAccess(node.expression) &&
        //     !writer.hasTrailingComment() &&
        //     !writer.hasTrailingWhitespace();

        // if (shouldEmitDotDot) {
        //     writePunctuation(".");
        // }

        // if (node.questionDotToken) {
        //     emit(token);
        // }
        // else {
            emitTokenWithComment(token.kind, node.expression.end, writePunctuation, node);
        // }
        writeLinesAndIndent(linesAfterDot, /*writeSpaceIfNotIndenting*/ false);
        emit(node.name);
        decreaseIndentIf(linesBeforeDot, linesAfterDot);
    }
    
    function emitCallExpression(node: CallExpression) {
        const indirectCall = getInternalEmitFlags(node) & InternalEmitFlags.IndirectCall;
        if (indirectCall) {
            writePunctuation("(");
            writeLiteral("0");
            writePunctuation(",");
            writeSpace();
        }
        emitExpression(node.expression, parenthesizer.parenthesizeLeftSideOfAccess);
        if (indirectCall) {
            writePunctuation(")");
        }
        // emit(node.questionDotToken);
        // emitTypeArguments(node, node.typeArguments);
        emitExpressionList(node, node.arguments, ListFormat.CallExpressionArguments, parenthesizer.parenthesizeExpressionForDisallowedComma);
    }

    function emitReturnStatement(node: ReturnStatement) {
        emitTokenWithComment(SyntaxKind.ReturnKeyword, node.pos, writeKeyword, /*contextNode*/ node);
        emitExpressionWithLeadingSpace(node.expression && parenthesizeExpressionForNoAsi(node.expression), parenthesizeExpressionForNoAsi);
        writeTrailingSemicolon();
    }

    function emitSwitchStatement(node: SwitchStatement) {
        const openParenPos = emitTokenWithComment(SyntaxKind.SwitchKeyword, node.pos, writeKeyword, node);
        writeSpace();
        emitTokenWithComment(SyntaxKind.OpenParenToken, openParenPos, writePunctuation, node);
        emitExpression(node.expression);
        emitTokenWithComment(SyntaxKind.CloseParenToken, node.expression.end, writePunctuation, node);
        writeSpace();
        emit(node.caseBlock);
    }

    function emitWithLeadingSpace(node: Node | undefined) {
        if (node) {
            writeSpace();
            emit(node);
        }
    }

    function emitTypeArguments(parentNode: Node, typeArguments: NodeArray<TypeNode> | undefined) {
        emitList(parentNode, typeArguments, ListFormat.TypeArguments, typeArgumentParenthesizerRuleSelector);
    }
    
    function emitNamedObjectType(node: NamedObjectTypeNode) {
        writeKeyword("object");
        writeSpace();                
        writeStringLiteral(`"${getStringLiteralsTextRecursively(node.name).join("")}"`);
    }

    function emitTypeReference(node: TypeReferenceNode) {
        emit(node.typeName);
        emitTypeArguments(node, node.typeArguments);
    }
    
    function emitStructType(node: StructTypeNode) {
        emitTokenWithComment(node.keyword, node.pos, writeKeyword, node);
        writeSpace();
        emit(node.typeName);        
    }

    function emitLiteralType(node: LiteralTypeNode) {
        emitExpression(node.literal);
    }

    function emitUnionType(node: UnionTypeNode) {
        emitList(node, node.types, ListFormat.UnionTypeConstituents, parenthesizer.parenthesizeConstituentTypeOfUnionType);
    }
    
    function emitCaseBlock(node: CaseBlock) {
        emitTokenWithComment(SyntaxKind.OpenBraceToken, node.pos, writePunctuation, node);
        emitList(node, node.clauses, ListFormat.CaseBlockClauses);
        emitTokenWithComment(SyntaxKind.CloseBraceToken, node.clauses.end, writePunctuation, node, /*indentLeading*/ true);
    }

    function emitContinueStatement(node: ContinueStatement) {
        emitTokenWithComment(SyntaxKind.ContinueKeyword, node.pos, writeKeyword, node);
        emitWithLeadingSpace(node.label);
        writeTrailingSemicolon();
    }

    function emitBreakStatement(node: BreakStatement) {
        emitTokenWithComment(SyntaxKind.BreakKeyword, node.pos, writeKeyword, node);
        emitWithLeadingSpace(node.label);
        writeTrailingSemicolon();
    }

    function emitExpressionStatement(node: ExpressionStatement) {
        emitExpression(node.expression, parenthesizer.parenthesizeExpressionOfExpressionStatement);
        // Emit semicolon in non json files
        // or if json file that created synthesized expression(eg.define expression statement when --out and amd code generation)
        if (!currentSourceFile || !isJsonSourceFile(currentSourceFile) || nodeIsSynthesized(node.expression)) {
            writeTrailingSemicolon();
        }
    }
    
    function emitSignatureHead(node: SignatureDeclaration) {
        // emitTypeParameters(node, node.typeParameters);
        // return type was moved and handled separately in symboldisplay.ts
        // emitTypeAnnotation(node.type);
        emitParameters(node, node.parameters);
    }

    
    function emitCaseClause(node: CaseClause) {
        emitTokenWithComment(SyntaxKind.CaseKeyword, node.pos, writeKeyword, node);
        writeSpace();
        emitExpression(node.expression, parenthesizer.parenthesizeExpressionForDisallowedComma);

        emitCaseOrDefaultClauseRest(node, node.statements, node.expression.end);
    }

    function emitDefaultClause(node: DefaultClause) {
        const pos = emitTokenWithComment(SyntaxKind.DefaultKeyword, node.pos, writeKeyword, node);
        emitCaseOrDefaultClauseRest(node, node.statements, pos);
    }

    function emitCaseOrDefaultClauseRest(parentNode: Node, statements: NodeArray<Statement>, colonPos: number) {
        const emitAsSingleStatement = statements.length === 1 &&
            (
                // treat synthesized nodes as located on the same line for emit purposes
                !currentSourceFile ||
                nodeIsSynthesized(parentNode) ||
                nodeIsSynthesized(statements[0]) ||
                rangeStartPositionsAreOnSameLine(parentNode, statements[0], currentSourceFile)
            );

        let format = ListFormat.CaseOrDefaultClauseStatements;
        if (emitAsSingleStatement) {
            writeToken(SyntaxKind.ColonToken, colonPos, writePunctuation, parentNode);
            writeSpace();
            format &= ~(ListFormat.MultiLine | ListFormat.Indented);
        }
        else {
            emitTokenWithComment(SyntaxKind.ColonToken, colonPos, writePunctuation, parentNode);
        }
        emitList(parentNode, statements, format);
    }


    function emitEmptyFunctionBody(_node: SignatureDeclaration) {
        writeTrailingSemicolon();
    }

    function emitVariableDeclarationList(node: VariableDeclarationList) {
        emitList(node, node.declarations, ListFormat.VariableDeclarationList);
    }

    function emitTypeAnnotation(node: TypeNode | undefined) {
        if (node) {            
            emit(node);
            writeSpace();
        }
    }

    function emitInitializer(node: Expression | undefined, equalCommentStartPos: number, container: Node, parenthesizerRule?: (node: Expression) => Expression) {
        if (node) {
            writeSpace();
            emitTokenWithComment(SyntaxKind.EqualsToken, equalCommentStartPos, writeOperator, container);
            writeSpace();
            emitExpression(node, parenthesizerRule);
        }
    }

    function emitTokenWithComment(token: SyntaxKind, pos: number, writer: (s: string) => void, contextNode: Node, indentLeading?: boolean) {
        const node = getParseTreeNode(contextNode);
        const isSimilarNode = node && node.kind === contextNode.kind;
        const startPos = pos;
        if (isSimilarNode && currentSourceFile) {
            pos = skipTrivia(currentSourceFile.text, pos);
        }
        if (isSimilarNode && contextNode.pos !== startPos) {
            const needsIndent = indentLeading && currentSourceFile && !positionsAreOnSameLine(startPos, pos, currentSourceFile);
            if (needsIndent) {
                increaseIndent();
            }
            emitLeadingCommentsOfPosition(startPos);
            if (needsIndent) {
                decreaseIndent();
            }
        }

        // We don't emit source positions for most tokens as it tends to be quite noisy, however
        // we need to emit source positions for open and close braces so that tools like istanbul
        // can map branches for code coverage. However, we still omit brace source positions when
        // the output is a declaration file.
        if (!omitBraceSourcePositions && (token === SyntaxKind.OpenBraceToken || token === SyntaxKind.CloseBraceToken)) {
            pos = writeToken(token, pos, writer, contextNode);
        }
        else {
            pos = writeTokenText(token, writer, pos);
        }

        if (isSimilarNode && contextNode.end !== pos) {
            emitTrailingCommentsOfPosition(pos, /*prefixSpace*/ false, /*forceNoNewline*/ false);
        }
        return pos;
    }
}


function createBracketsMap() {
    const brackets: string[][] = [];
    brackets[ListFormat.Braces] = ["{", "}"];
    brackets[ListFormat.Parenthesis] = ["(", ")"];
    brackets[ListFormat.AngleBrackets] = ["<", ">"];
    brackets[ListFormat.SquareBrackets] = ["[", "]"];
    brackets[ListFormat.ArrayBrackets] = ["({", "})"];
    return brackets;
}

function getOpeningBracket(format: ListFormat) {
    return brackets[format & ListFormat.BracketsMask][0];
}

function getClosingBracket(format: ListFormat) {
    return brackets[format & ListFormat.BracketsMask][1];
}

/** @internal */
export function getCommonSourceDirectory(
    options: CompilerOptions,
    emittedFiles: () => readonly string[],
    currentDirectory: string,
    getCanonicalFileName: GetCanonicalFileName,
    checkSourceFilesBelongToPath?: (commonSourceDirectory: string) => void,
): string {
    let commonSourceDirectory;
    if (options.rootDir) {
        // If a rootDir is specified use it as the commonSourceDirectory
        commonSourceDirectory = getNormalizedAbsolutePath(options.rootDir, currentDirectory);
        checkSourceFilesBelongToPath?.(options.rootDir);
    }
    // else if (options.composite && options.configFilePath) {
    //     // Project compilations never infer their root from the input source paths
    //     commonSourceDirectory = getDirectoryPath(normalizeSlashes(options.configFilePath));
    //     checkSourceFilesBelongToPath?.(commonSourceDirectory);
    // }
    else {
        commonSourceDirectory = computeCommonSourceDirectoryOfFilenames(emittedFiles(), currentDirectory, getCanonicalFileName);
    }

    if (commonSourceDirectory && commonSourceDirectory[commonSourceDirectory.length - 1] !== directorySeparator) {
        // Make sure directory path ends with directory separator so this string can directly
        // used to replace with "" to get the relative path of the source file and the relative path doesn't
        // start with / making it rooted path
        commonSourceDirectory += directorySeparator;
    }
    return commonSourceDirectory;
}

function emitListItemNoParenthesizer(node: Node, emit: EmitFunction, _parenthesizerRule: ParenthesizerRuleOrSelector<Node> | undefined, _index: number) {
    emit(node);
}

function emitListItemWithParenthesizerRuleSelector(node: Node, emit: EmitFunction, parenthesizerRuleSelector: OrdinalParentheizerRuleSelector<Node> | undefined, index: number) {
    emit(node, parenthesizerRuleSelector!.select(index));
}

function emitListItemWithParenthesizerRule(node: Node, emit: EmitFunction, parenthesizerRule: ParenthesizerRule<Node> | undefined, _index: number) {
    emit(node, parenthesizerRule);
}

function getEmitListItem<T extends Node>(emit: EmitFunction, parenthesizerRule: ParenthesizerRuleOrSelector<T> | undefined): EmitListItemFunction<T> {
    return emit.length === 1 ? emitListItemNoParenthesizer as EmitListItemFunction<T> :
        typeof parenthesizerRule === "object" ? emitListItemWithParenthesizerRuleSelector as EmitListItemFunction<T> :
        emitListItemWithParenthesizerRule as EmitListItemFunction<T>;
}

export function emitNodeAsJsText(node: Node, sourceFile: SourceFile): string {
    const printerOptions: PrinterOptions = {
        removeComments: true,
        newLine: lpc.NewLineKind.LineFeed,
        // noEmitHelpers: compilerOptions.noEmitHelpers,
        // module: getEmitModuleKind(compilerOptions),
        // target: getEmitScriptTarget(compilerOptions),
        target: lpc.ScriptTarget.JavaScript,
        // sourceMap: compilerOptions.sourceMap,
        // inlineSourceMap: compilerOptions.inlineSourceMap,
        // inlineSources: compilerOptions.inlineSources,
        // extendedDiagnostics: compilerOptions.extendedDiagnostics,
    };

    const printer = createJsPrinter(printerOptions, {
        // resolver hooks
        hasGlobalName: ()=>false,

        // transform hooks
        // onEmitNode: transform.emitNodeWithNotification,
        // isEmitNotificationEnabled: transform.isEmitNotificationEnabled,
        // substituteNode: transform.substituteNode,
    });
    var newLine = getNewLineCharacter(printerOptions);
    var writer = createTextWriter(newLine);
    
    printer.writeNode(EmitHint.Unspecified, node, sourceFile, writer);

    return writer.getText();

    // const writer: EmitTextWriter = {
    //     ...baseWriter,
    //     write: s => escapingWrite(s, () => baseWriter.write(s)),
    //     nonEscapingWrite: baseWriter.write,
    //     writeLiteral: s => escapingWrite(s, () => baseWriter.writeLiteral(s)),
    //     writeStringLiteral: s => escapingWrite(s, () => baseWriter.writeStringLiteral(s)),
    //     writeSymbol: (s, symbol) => escapingWrite(s, () => baseWriter.writeSymbol(s, symbol)),
    //     writeParameter: s => escapingWrite(s, () => baseWriter.writeParameter(s)),
    //     writeComment: s => escapingWrite(s, () => baseWriter.writeComment(s)),
    //     writeProperty: s => escapingWrite(s, () => baseWriter.writeProperty(s)),
    // };
}


/**
 * Creates a printer that will emit code as 
 * @param printerOptions 
 * @param handlers 
 * @returns 
 */
export function createJsPrinter(printerOptions: PrinterOptions = {}, handlers: PrintHandlers = {}): Printer {
    // Why var? It avoids TDZ checks in the runtime which can be costly.
    // See: https://github.com/microsoft/TypeScript/issues/52924
    /* eslint-disable no-var */
    var {
        hasGlobalName,
        onEmitNode = noEmitNotification,
        isEmitNotificationEnabled,
        substituteNode = noEmitSubstitution,
        onBeforeEmitNode,
        onAfterEmitNode,
        onBeforeEmitNodeArray,
        onAfterEmitNodeArray,
        onBeforeEmitToken,
        onAfterEmitToken,
    } = handlers;

    var extendedDiagnostics = !!printerOptions.extendedDiagnostics;
    var omitBraceSourcePositions = !!printerOptions.omitBraceSourceMapPositions;
    var newLine = getNewLineCharacter(printerOptions);
    var moduleKind = ModuleKind.LPC;
    var bundledHelpers = new Map<string, boolean>();

    var currentSourceFile: SourceFile | undefined;
    var nodeIdToGeneratedName: string[]; // Map of generated names for specific nodes.
    var nodeIdToGeneratedPrivateName: string[]; // Map of generated names for specific nodes.
    var autoGeneratedIdToGeneratedName: string[]; // Map of generated names for temp and loop variables.
    var generatedNames: Set<string>; // Set of names generated by the NameGenerator.
    var formattedNameTempFlagsStack: (Map<string, TempFlags> | undefined)[];
    var formattedNameTempFlags: Map<string, TempFlags> | undefined;
    var privateNameTempFlagsStack: TempFlags[]; // Stack of enclosing name generation scopes.
    var privateNameTempFlags: TempFlags; // TempFlags for the current name generation scope.
    var tempFlagsStack: TempFlags[]; // Stack of enclosing name generation scopes.
    var tempFlags: TempFlags; // TempFlags for the current name generation scope.
    var reservedNamesStack: (Set<string> | undefined)[]; // Stack of reserved names in enclosing name generation scopes.
    var reservedNames: Set<string> | undefined; // Names reserved in nested name generation scopes.
    var reservedPrivateNamesStack: (Set<string> | undefined)[]; // Stack of reserved member names in enclosing name generation scopes.
    var reservedPrivateNames: Set<string> | undefined; // Member names reserved in nested name generation scopes.
    var preserveSourceNewlines = printerOptions.preserveSourceNewlines; // Can be overridden inside nodes with the `IgnoreSourceNewlines` emit flag.
    var nextListElementPos: number | undefined; // See comment in `getLeadingLineTerminatorCount`.

    var writer: EmitTextWriter;
    var ownWriter: EmitTextWriter; // Reusable `EmitTextWriter` for basic printing.
    var write = writeBase;
    var isOwnFileEmit: boolean;

    // Source Maps
    var sourceMapsDisabled = true;
    var sourceMapGenerator: SourceMapGenerator | undefined;
    var sourceMapSource: SourceMapSource;
    var sourceMapSourceIndex = -1;
    var mostRecentlyAddedSourceMapSource: SourceMapSource;
    var mostRecentlyAddedSourceMapSourceIndex = -1;

    // Comments
    var containerPos = -1;
    var containerEnd = -1;
    var declarationListContainerEnd = -1;
    var currentLineMap: readonly number[] | undefined;
    var detachedCommentsInfo: { nodePos: number; detachedCommentEndPos: number; }[] | undefined;
    var hasWrittenComment = false;
    var commentsDisabled = !!printerOptions.removeComments;
    var lastSubstitution: Node | undefined;
    var currentParenthesizerRule: ParenthesizerRule<any> | undefined;
    var { enter: enterComment, exit: exitComment } = performance.createTimerIf(extendedDiagnostics, "commentTime", "beforeComment", "afterComment");
    var parenthesizer = factory.parenthesizer;
    var typeArgumentParenthesizerRuleSelector: OrdinalParentheizerRuleSelector<TypeNode> = {
        select: index => index === 0 ? parenthesizer.parenthesizeLeadingTypeArgument : undefined,
    };
    var emitBinaryExpression = createEmitBinaryExpression();
    /* eslint-enable no-var */

    reset();
    return {
        // public API
        printNode,
        printList,
        printFile,
        printBundle,

        // internal API
        writeNode,
        writeList,
        writeFile,
        writeBundle,
    };

    function printNode(hint: EmitHint, node: Node, sourceFile: SourceFile): string {
        switch (hint) {
            case EmitHint.SourceFile:
                Debug.assert(isSourceFile(node), "Expected a SourceFile node.");
                break;
            case EmitHint.IdentifierName:
                Debug.assert(isIdentifier(node), "Expected an Identifier node.");
                break;
            case EmitHint.Expression:
                Debug.assert(isExpression(node), "Expected an Expression node.");
                break;
        }
        switch (node.kind) {
            case SyntaxKind.SourceFile:
                return printFile(node as SourceFile);
            case SyntaxKind.Bundle:
                return printBundle(node as Bundle);
        }
        writeNode(hint, node, sourceFile, beginPrint());
        return endPrint();
    }

    function printList<T extends Node>(format: ListFormat, nodes: NodeArray<T>, sourceFile: SourceFile) {
        writeList(format, nodes, sourceFile, beginPrint());
        return endPrint();
    }

    function printBundle(bundle: Bundle): string {
        writeBundle(bundle, beginPrint(), /*sourceMapGenerator*/ undefined);
        return endPrint();
    }

    function printFile(sourceFile: SourceFile): string {
        writeFile(sourceFile, beginPrint(), /*sourceMapGenerator*/ undefined);
        return endPrint();
    }

    /**
     * If `sourceFile` is `undefined`, `node` must be a synthesized `TypeNode`.
     */
    function writeNode(hint: EmitHint, node: TypeNode, sourceFile: undefined, output: EmitTextWriter): void;
    function writeNode(hint: EmitHint, node: Node, sourceFile: SourceFile, output: EmitTextWriter): void;
    function writeNode(hint: EmitHint, node: Node, sourceFile: SourceFile | undefined, output: EmitTextWriter) {
        const previousWriter = writer;
        setWriter(output, /*_sourceMapGenerator*/ undefined);
        print(hint, node, sourceFile);
        reset();
        writer = previousWriter;
    }

    function writeList<T extends Node>(format: ListFormat, nodes: NodeArray<T>, sourceFile: SourceFile | undefined, output: EmitTextWriter) {
        const previousWriter = writer;
        setWriter(output, /*_sourceMapGenerator*/ undefined);
        if (sourceFile) {
            setSourceFile(sourceFile);
        }
        emitList(/*parentNode*/ undefined, nodes, format);
        reset();
        writer = previousWriter;
    }

    function writeBundle(bundle: Bundle, output: EmitTextWriter, sourceMapGenerator: SourceMapGenerator | undefined) {
        isOwnFileEmit = false;
        const previousWriter = writer;
        setWriter(output, sourceMapGenerator);
        console.warn("todo - implment me - writeBundle");
        emitShebangIfNeeded(bundle);
        // emitPrologueDirectivesIfNeeded(bundle);
        // emitHelpers(bundle);
        // emitSyntheticTripleSlashReferencesIfNeeded(bundle);
        for (const sourceFile of bundle.sourceFiles) {
            print(EmitHint.SourceFile, sourceFile, sourceFile);
        }
        reset();
        writer = previousWriter;
    }

    function writeFile(sourceFile: SourceFile, output: EmitTextWriter, sourceMapGenerator: SourceMapGenerator | undefined) {
        console.warn("todo - implment me - writeFile");

        isOwnFileEmit = true;
        const previousWriter = writer;
        setWriter(output, sourceMapGenerator);
        emitShebangIfNeeded(sourceFile);
        // emitPrologueDirectivesIfNeeded(sourceFile);
        print(EmitHint.SourceFile, sourceFile, sourceFile);
        reset();
        writer = previousWriter;
    }

    function beginPrint() {
        return ownWriter || (ownWriter = createTextWriter(newLine));
    }

    function endPrint() {
        const text = ownWriter.getText();
        ownWriter.clear();
        return text;
    }

    function print(hint: EmitHint, node: Node, sourceFile: SourceFile | undefined) {
        if (sourceFile) {
            setSourceFile(sourceFile);
        }

        pipelineEmit(hint, node, /*parenthesizerRule*/ undefined);
    }

    function setSourceFile(sourceFile: SourceFile | undefined) {
        currentSourceFile = sourceFile;
        currentLineMap = undefined;
        detachedCommentsInfo = undefined;
        if (sourceFile) {
            setSourceMapSource(sourceFile);
        }
    }

    function setSourceMapSource(source: SourceMapSource) {
        if (sourceMapsDisabled) {
            return;
        }

        sourceMapSource = source;

        if (source === mostRecentlyAddedSourceMapSource) {
            // Fast path for when the new source map is the most recently added, in which case
            // we use its captured index without going through the source map generator.
            sourceMapSourceIndex = mostRecentlyAddedSourceMapSourceIndex;
            return;
        }

        if (isJsonSourceMapSource(source)) {
            return;
        }

        sourceMapSourceIndex = sourceMapGenerator!.addSource(source.fileName);
        if (printerOptions.inlineSources) {
            sourceMapGenerator!.setSourceContent(sourceMapSourceIndex, source.text);
        }

        mostRecentlyAddedSourceMapSource = source;
        mostRecentlyAddedSourceMapSourceIndex = sourceMapSourceIndex;
    }

    function isJsonSourceMapSource(sourceFile: SourceMapSource) {
        return fileExtensionIs(sourceFile.fileName, Extension.Json);
    }

    function setWriter(_writer: EmitTextWriter | undefined, _sourceMapGenerator: SourceMapGenerator | undefined) {
        if (_writer && printerOptions.omitTrailingSemicolon) {            
            _writer = getTrailingSemicolonDeferringWriter(_writer);
        }

        writer = _writer!; // TODO: GH#18217
        sourceMapGenerator = _sourceMapGenerator;
        sourceMapsDisabled = !writer || !sourceMapGenerator;
    }

    function reset() {
        nodeIdToGeneratedName = [];
        nodeIdToGeneratedPrivateName = [];
        autoGeneratedIdToGeneratedName = [];
        generatedNames = new Set();
        formattedNameTempFlagsStack = [];
        formattedNameTempFlags = new Map();
        privateNameTempFlagsStack = [];
        privateNameTempFlags = TempFlags.Auto;
        tempFlagsStack = [];
        tempFlags = TempFlags.Auto;
        reservedNamesStack = [];
        reservedNames = undefined;
        reservedPrivateNamesStack = [];
        reservedPrivateNames = undefined;
        currentSourceFile = undefined;
        currentLineMap = undefined;
        detachedCommentsInfo = undefined;
        setWriter(/*output*/ undefined, /*_sourceMapGenerator*/ undefined);
    }

    function getCurrentLineMap() {
        return currentLineMap || (currentLineMap = getLineStarts(Debug.checkDefined(currentSourceFile)));
    }

    function emit<T extends Node>(node: T, parenthesizerRule?: (node: T) => T): void;
    function emit<T extends Node>(node: T | undefined, parenthesizerRule?: (node: T) => T): void;
    function emit<T extends Node>(node: T | undefined, parenthesizerRule?: (node: T) => T) {
        if (node === undefined) return;
        pipelineEmit(EmitHint.Unspecified, node, parenthesizerRule);
    }

    function emitIdentifierName(node: Identifier): void;
    function emitIdentifierName(node: Identifier | undefined): void;
    function emitIdentifierName(node: Identifier | undefined) {
        if (node === undefined) return;
        pipelineEmit(EmitHint.IdentifierName, node, /*parenthesizerRule*/ undefined);
    }

    function emitExpression<T extends Expression>(node: T, parenthesizerRule?: (node: T) => T): void;
    function emitExpression<T extends Expression>(node: T | undefined, parenthesizerRule?: (node: T) => T): void;
    function emitExpression<T extends Expression>(node: T | undefined, parenthesizerRule?: (node: T) => T) {
        if (node === undefined) return;
        pipelineEmit(EmitHint.Expression, node, parenthesizerRule);
    }

    function beforeEmitNode(node: Node) {
        if (preserveSourceNewlines && (getInternalEmitFlags(node) & InternalEmitFlags.IgnoreSourceNewlines)) {
            preserveSourceNewlines = false;
        }
    }

    function afterEmitNode(savedPreserveSourceNewlines: boolean | undefined) {
        preserveSourceNewlines = savedPreserveSourceNewlines;
    }

    function pipelineEmit<T extends Node>(emitHint: EmitHint, node: T, parenthesizerRule?: (node: T) => T) {
        currentParenthesizerRule = parenthesizerRule;
        const pipelinePhase = getPipelinePhase(PipelinePhase.Notification, emitHint, node);
        pipelinePhase(emitHint, node);
        currentParenthesizerRule = undefined;
    }

    function shouldEmitComments(node: Node) {
        return !commentsDisabled && !isSourceFile(node);
    }

    function shouldEmitSourceMaps(node: Node) {
        return !sourceMapsDisabled &&
            !isSourceFile(node);
            //!isInJsonFile(node);
    }

    function pipelineEmitWithSubstitution(hint: EmitHint, node: Node) {
        const pipelinePhase = getNextPipelinePhase(PipelinePhase.Substitution, hint, node);
        Debug.assertIsDefined(lastSubstitution);
        node = lastSubstitution;
        lastSubstitution = undefined;
        pipelinePhase(hint, node);
    }

    function pipelineEmitWithComments(hint: EmitHint, node: Node) {
        const pipelinePhase = getNextPipelinePhase(PipelinePhase.Comments, hint, node);
        const savedContainerPos = containerPos;
        const savedContainerEnd = containerEnd;
        const savedDeclarationListContainerEnd = declarationListContainerEnd;
        emitCommentsBeforeNode(node);
        pipelinePhase(hint, node);
        emitCommentsAfterNode(node, savedContainerPos, savedContainerEnd, savedDeclarationListContainerEnd);
    }

    function emitCommentsBeforeNode(node: Node) {
        console.warn("todo - implment me - emitCommentsBeforeNode");
        // const emitFlags = getEmitFlags(node);
        // const commentRange = getCommentRange(node);

        // // Emit leading comments
        // emitLeadingCommentsOfNode(node, emitFlags, commentRange.pos, commentRange.end);
        // if (emitFlags & EmitFlags.NoNestedComments) {
        //     commentsDisabled = true;
        // }
    }

    function emitCommentsAfterNode(node: Node, savedContainerPos: number, savedContainerEnd: number, savedDeclarationListContainerEnd: number) {
        console.warn("todo - implment me - emitCommentsAfterNode");
        // const emitFlags = getEmitFlags(node);
        // const commentRange = getCommentRange(node);

        // // Emit trailing comments
        // if (emitFlags & EmitFlags.NoNestedComments) {
        //     commentsDisabled = false;
        // }
        // emitTrailingCommentsOfNode(node, emitFlags, commentRange.pos, commentRange.end, savedContainerPos, savedContainerEnd, savedDeclarationListContainerEnd);
        // const typeNode = getTypeNode(node);
        // if (typeNode) {
        //     emitTrailingCommentsOfNode(node, emitFlags, typeNode.pos, typeNode.end, savedContainerPos, savedContainerEnd, savedDeclarationListContainerEnd);
        // }
    }

    function createEmitBinaryExpression() {
        interface WorkArea {
            stackIndex: number;
            preserveSourceNewlinesStack: (boolean | undefined)[];
            containerPosStack: number[];
            containerEndStack: number[];
            declarationListContainerEndStack: number[];
            shouldEmitCommentsStack: boolean[];
            shouldEmitSourceMapsStack: boolean[];
        }

        return createBinaryExpressionTrampoline(onEnter, onLeft, onOperator, onRight, onExit, /*foldState*/ undefined);

        function onEnter(node: BinaryExpression, state: WorkArea | undefined) {
            if (state) {
                state.stackIndex++;
                state.preserveSourceNewlinesStack[state.stackIndex] = preserveSourceNewlines;
                state.containerPosStack[state.stackIndex] = containerPos;
                state.containerEndStack[state.stackIndex] = containerEnd;
                state.declarationListContainerEndStack[state.stackIndex] = declarationListContainerEnd;
                const emitComments = state.shouldEmitCommentsStack[state.stackIndex] = shouldEmitComments(node);
                const emitSourceMaps = state.shouldEmitSourceMapsStack[state.stackIndex] = shouldEmitSourceMaps(node);
                onBeforeEmitNode?.(node);
                if (emitComments) emitCommentsBeforeNode(node);
                if (emitSourceMaps) emitSourceMapsBeforeNode(node);
                beforeEmitNode(node);
            }
            else {
                state = {
                    stackIndex: 0,
                    preserveSourceNewlinesStack: [undefined],
                    containerPosStack: [-1],
                    containerEndStack: [-1],
                    declarationListContainerEndStack: [-1],
                    shouldEmitCommentsStack: [false],
                    shouldEmitSourceMapsStack: [false],
                };
            }
            return state;
        }

        function onLeft(next: Expression, _workArea: WorkArea, parent: BinaryExpression) {
            return maybeEmitExpression(next, parent, "left");
        }

        function onOperator(operatorToken: BinaryOperatorToken, _state: WorkArea, node: BinaryExpression) {
            const isCommaOperator = operatorToken.kind !== SyntaxKind.CommaToken;
            const linesBeforeOperator = getLinesBetweenNodes(node, node.left, operatorToken);
            const linesAfterOperator = getLinesBetweenNodes(node, operatorToken, node.right);
            writeLinesAndIndent(linesBeforeOperator, isCommaOperator);
            emitLeadingCommentsOfPosition(operatorToken.pos);
            writeTokenNode(operatorToken, operatorToken.kind === SyntaxKind.InKeyword ? writeKeyword : writeOperator);
            emitTrailingCommentsOfPosition(operatorToken.end, /*prefixSpace*/ true); // Binary operators should have a space before the comment starts
            writeLinesAndIndent(linesAfterOperator, /*writeSpaceIfNotIndenting*/ true);
        }

        function onRight(next: Expression, _workArea: WorkArea, parent: BinaryExpression) {
            return maybeEmitExpression(next, parent, "right");
        }

        function onExit(node: BinaryExpression, state: WorkArea) {
            const linesBeforeOperator = getLinesBetweenNodes(node, node.left, node.operatorToken);
            const linesAfterOperator = getLinesBetweenNodes(node, node.operatorToken, node.right);
            decreaseIndentIf(linesBeforeOperator, linesAfterOperator);
            if (state.stackIndex > 0) {
                const savedPreserveSourceNewlines = state.preserveSourceNewlinesStack[state.stackIndex];
                const savedContainerPos = state.containerPosStack[state.stackIndex];
                const savedContainerEnd = state.containerEndStack[state.stackIndex];
                const savedDeclarationListContainerEnd = state.declarationListContainerEndStack[state.stackIndex];
                const shouldEmitComments = state.shouldEmitCommentsStack[state.stackIndex];
                const shouldEmitSourceMaps = state.shouldEmitSourceMapsStack[state.stackIndex];
                afterEmitNode(savedPreserveSourceNewlines);
                if (shouldEmitSourceMaps) emitSourceMapsAfterNode(node);
                if (shouldEmitComments) emitCommentsAfterNode(node, savedContainerPos, savedContainerEnd, savedDeclarationListContainerEnd);
                onAfterEmitNode?.(node);
                state.stackIndex--;
            }
        }

        function maybeEmitExpression(next: Expression, parent: BinaryExpression, side: "left" | "right") {
            const parenthesizerRule = side === "left" ?
                parenthesizer.getParenthesizeLeftSideOfBinaryForOperator(parent.operatorToken.kind) :
                parenthesizer.getParenthesizeRightSideOfBinaryForOperator(parent.operatorToken.kind);

            let pipelinePhase = getPipelinePhase(PipelinePhase.Notification, EmitHint.Expression, next);
            if (pipelinePhase === pipelineEmitWithSubstitution) {
                Debug.assertIsDefined(lastSubstitution);
                next = parenthesizerRule(cast(lastSubstitution, isExpression));
                pipelinePhase = getNextPipelinePhase(PipelinePhase.Substitution, EmitHint.Expression, next);
                lastSubstitution = undefined;
            }

            if (
                pipelinePhase === pipelineEmitWithComments ||
                pipelinePhase === pipelineEmitWithSourceMaps ||
                pipelinePhase === pipelineEmitWithHint
            ) {
                if (isBinaryExpression(next)) {
                    return next;
                }
            }

            currentParenthesizerRule = parenthesizerRule;
            pipelinePhase(EmitHint.Expression, next);
        }
    }
    
    function getPipelinePhase(phase: PipelinePhase, emitHint: EmitHint, node: Node) {
        switch (phase) {
            case PipelinePhase.Notification:
                if (onEmitNode !== noEmitNotification && (!isEmitNotificationEnabled || isEmitNotificationEnabled(node))) {
                    return pipelineEmitWithNotification;
                }
                // falls through
            case PipelinePhase.Substitution:
                if (substituteNode !== noEmitSubstitution && (lastSubstitution = substituteNode(emitHint, node) || node) !== node) {
                    if (currentParenthesizerRule) {
                        lastSubstitution = currentParenthesizerRule(lastSubstitution);
                    }
                    return pipelineEmitWithSubstitution;
                }
                // falls through
            case PipelinePhase.Comments:
                if (shouldEmitComments(node)) {
                    return pipelineEmitWithComments;
                }
                // falls through
            case PipelinePhase.SourceMaps:
                if (shouldEmitSourceMaps(node)) {
                    return pipelineEmitWithSourceMaps;
                }
                // falls through
            case PipelinePhase.Emit:
                return pipelineEmitWithHint;
            default:
                return Debug.assertNever(phase);
        }
    }

    // Source Maps
    function pipelineEmitWithSourceMaps(hint: EmitHint, node: Node) {
        const pipelinePhase = getNextPipelinePhase(PipelinePhase.SourceMaps, hint, node);
        emitSourceMapsBeforeNode(node);
        pipelinePhase(hint, node);
        emitSourceMapsAfterNode(node);
    }

    function emitSourceMapsBeforeNode(node: Node) {
        console.warn("todo - implment me - emitSourceMapsBeforeNode");
        // const emitFlags = getEmitFlags(node);
        // const sourceMapRange = getSourceMapRange(node);

        // // Emit leading sourcemap
        // const source = sourceMapRange.source || sourceMapSource;
        // if (
        //     node.kind !== SyntaxKind.NotEmittedStatement
        //     && (emitFlags & EmitFlags.NoLeadingSourceMap) === 0
        //     && sourceMapRange.pos >= 0
        // ) {
        //     emitSourcePos(sourceMapRange.source || sourceMapSource, skipSourceTrivia(source, sourceMapRange.pos));
        // }
        // if (emitFlags & EmitFlags.NoNestedSourceMaps) {
        //     sourceMapsDisabled = true;
        // }
    }

    function emitSourceMapsAfterNode(node: Node) {
        console.warn
        // const emitFlags = getEmitFlags(node);
        // const sourceMapRange = getSourceMapRange(node);

        // // Emit trailing sourcemap
        // if (emitFlags & EmitFlags.NoNestedSourceMaps) {
        //     sourceMapsDisabled = false;
        // }
        // if (
        //     node.kind !== SyntaxKind.NotEmittedStatement
        //     && (emitFlags & EmitFlags.NoTrailingSourceMap) === 0
        //     && sourceMapRange.end >= 0
        // ) {
        //     emitSourcePos(sourceMapRange.source || sourceMapSource, sourceMapRange.end);
        // }
    }

    
    function getNextPipelinePhase(currentPhase: PipelinePhase, emitHint: EmitHint, node: Node) {
        return getPipelinePhase(currentPhase + 1, emitHint, node);
    }

    function pipelineEmitWithNotification(hint: EmitHint, node: Node) {
        const pipelinePhase = getNextPipelinePhase(PipelinePhase.Notification, hint, node);
        onEmitNode(hint, node, pipelinePhase);
    }

    function pipelineEmitWithHint(hint: EmitHint, node: Node): void {
        onBeforeEmitNode?.(node);
        if (preserveSourceNewlines) {
            const savedPreserveSourceNewlines = preserveSourceNewlines;
            beforeEmitNode(node);
            pipelineEmitWithHintWorker(hint, node);
            afterEmitNode(savedPreserveSourceNewlines);
        }
        else {
            pipelineEmitWithHintWorker(hint, node);
        }
        onAfterEmitNode?.(node);
        // clear the parenthesizer rule as we ascend
        currentParenthesizerRule = undefined;
    }

    function emitList<Child extends Node, Children extends NodeArray<Child>>(parentNode: Node | undefined, children: Children | undefined, format: ListFormat, parenthesizerRule?: ParenthesizerRuleOrSelector<Child>, start?: number, count?: number) {
        emitNodeList(
            emit,
            parentNode,
            children,
            format | (parentNode && getEmitFlags(parentNode) & EmitFlags.MultiLine ? ListFormat.PreferNewLine : 0),
            parenthesizerRule,
            start,
            count,
        );
    }

    function emitExpressionList<Child extends Node, Children extends NodeArray<Child>>(parentNode: Node | undefined, children: Children | undefined, format: ListFormat, parenthesizerRule?: ParenthesizerRuleOrSelector<Child>, start?: number, count?: number) {
        emitNodeList(emitExpression, parentNode, children, format, parenthesizerRule, start, count);
    }

    function emitTrailingCommentsOfPosition(pos: number, prefixSpace?: boolean, forceNoNewline?: boolean) {
        if (commentsDisabled) {
            return;
        }
        enterComment();
        console.warn("todo - implment me - emitTrailingCommentsOfPosition");
        //forEachTrailingCommentToEmit(pos, prefixSpace ? emitTrailingComment : forceNoNewline ? emitTrailingCommentOfPositionNoNewline : emitTrailingCommentOfPosition);
        exitComment();
    }


    function emitNodeList<Child extends Node, Children extends NodeArray<Child>>(emit: EmitFunction, parentNode: Node | undefined, children: Children | undefined, format: ListFormat, parenthesizerRule: ParenthesizerRuleOrSelector<Child> | undefined, start = 0, count = children ? children.length - start : 0) {
        const isUndefined = children === undefined;
        if (isUndefined && format & ListFormat.OptionalIfUndefined) {
            return;
        }

        const isEmpty = children === undefined || start >= children.length || count === 0;
        if (isEmpty && format & ListFormat.OptionalIfEmpty) {
            onBeforeEmitNodeArray?.(children);
            onAfterEmitNodeArray?.(children);
            return;
        }

        if (format & ListFormat.BracketsMask) {
            writePunctuation(getOpeningBracket(format));
            if (isEmpty && children) {
                emitTrailingCommentsOfPosition(children.pos, /*prefixSpace*/ true); // Emit comments within empty bracketed lists
            }
        }

        onBeforeEmitNodeArray?.(children);

        if (isEmpty) {
            // Write a line terminator if the parent node was multi-line
            if (format & ListFormat.MultiLine && !(preserveSourceNewlines && (!parentNode || currentSourceFile && rangeIsOnSingleLine(parentNode, currentSourceFile)))) {
                writeLine();
            }
            else if (format & ListFormat.SpaceBetweenBraces && !(format & ListFormat.NoSpaceIfEmpty)) {
                writeSpace();
            }
        }
        else {
            emitNodeListItems(emit, parentNode, children, format, parenthesizerRule, start, count, children.hasTrailingComma, children);
        }

        onAfterEmitNodeArray?.(children);

        if (format & ListFormat.BracketsMask) {
            if (isEmpty && children) {
                emitLeadingCommentsOfPosition(children.end); // Emit leading comments within empty lists
            }
            writePunctuation(getClosingBracket(format));
        }
    }

    function emitLeadingCommentsOfPosition(pos: number) {
        if (commentsDisabled || pos === -1) {
            return;
        }

        console.warn("todo - implment me - emitLeadingCommentsOfPosition");
        //emitLeadingComments(pos, /*isEmittedNode*/ true);
    }

    function getLeadingLineTerminatorCount(parentNode: Node | undefined, firstChild: Node | undefined, format: ListFormat): number {
        if (format & ListFormat.PreserveLines || preserveSourceNewlines) {
            if (format & ListFormat.PreferNewLine) {
                return 1;
            }

            if (firstChild === undefined) {
                return !parentNode || currentSourceFile && rangeIsOnSingleLine(parentNode, currentSourceFile) ? 0 : 1;
            }
            if (firstChild.pos === nextListElementPos) {
                // If this child starts at the beginning of a list item in a parent list, its leading
                // line terminators have already been written as the separating line terminators of the
                // parent list. Example:
                //
                // class Foo {
                //   constructor() {}
                //   public foo() {}
                // }
                //
                // The outer list is the list of class members, with one line terminator between the
                // constructor and the method. The constructor is written, the separating line terminator
                // is written, and then we start emitting the method. Its modifiers ([public]) constitute an inner
                // list, so we look for its leading line terminators. If we didn't know that we had already
                // written a newline as part of the parent list, it would appear that we need to write a
                // leading newline to start the modifiers.
                return 0;
            }            
            if (
                currentSourceFile && parentNode &&
                !positionIsSynthesized(parentNode.pos) &&
                !nodeIsSynthesized(firstChild) &&
                (!firstChild.parent || getOriginalNode(firstChild.parent) === getOriginalNode(parentNode))
            ) {
                if (preserveSourceNewlines) {
                    return getEffectiveLines(
                        includeComments =>
                            lpc.getLinesBetweenPositionAndPrecedingNonWhitespaceCharacter(
                                firstChild.pos,
                                parentNode.pos,
                                currentSourceFile!,
                                includeComments,
                            ),
                    );
                }
                return rangeStartPositionsAreOnSameLine(parentNode, firstChild, currentSourceFile) ? 0 : 1;
            }
            if (synthesizedNodeStartsOnNewLine(firstChild, format)) {
                return 1;
            }
        }
        return format & ListFormat.MultiLine ? 1 : 0;
    }

    function synthesizedNodeStartsOnNewLine(node: Node, format: ListFormat) {
        if (nodeIsSynthesized(node)) {
            const startsOnNewLine = getStartsOnNewLine(node);
            if (startsOnNewLine === undefined) {
                return (format & ListFormat.PreferNewLine) !== 0;
            }

            return startsOnNewLine;
        }

        return (format & ListFormat.PreferNewLine) !== 0;
    }
    
    /**
     * Emits a list without brackets or raising events.
     *
     * NOTE: You probably don't want to call this directly and should be using `emitList` or `emitExpressionList` instead.
     */
    function emitNodeListItems<Child extends Node>(emit: EmitFunction, parentNode: Node | undefined, children: readonly Child[], format: ListFormat, parenthesizerRule: ParenthesizerRuleOrSelector<Child> | undefined, start: number, count: number, hasTrailingComma: boolean, childrenTextRange: TextRange | undefined) {
        // Write the opening line terminator or leading whitespace.
        const mayEmitInterveningComments = (format & ListFormat.NoInterveningComments) === 0;
        let shouldEmitInterveningComments = mayEmitInterveningComments;

        const leadingLineTerminatorCount = getLeadingLineTerminatorCount(parentNode, children[start], format);
        if (leadingLineTerminatorCount) {
            writeLine(leadingLineTerminatorCount);
            shouldEmitInterveningComments = false;
        }
        else if (format & ListFormat.SpaceBetweenBraces) {
            writeSpace();
        }

        // Increase the indent, if requested.
        if (format & ListFormat.Indented) {
            increaseIndent();
        }

        const emitListItem = getEmitListItem(emit, parenthesizerRule);

        // Emit each child.
        let previousSibling: Node | undefined;
        let shouldDecreaseIndentAfterEmit = false;
        for (let i = 0; i < count; i++) {
            const child = children[start + i];

            // Write the delimiter if this is not the first node.
            if (format & ListFormat.AsteriskDelimited) {
                // always write JSDoc in the format "\n *"
                writeLine();
                writeDelimiter(format);
            }
            else if (previousSibling) {
                // i.e
                //      function commentedParameters(
                //          /* Parameter a */
                //          a
                //          /* End of parameter a */ -> this comment isn't considered to be trailing comment of parameter "a" due to newline
                //          ,
                if (format & ListFormat.DelimitersMask && previousSibling.end !== (parentNode ? parentNode.end : -1)) {
                    const previousSiblingEmitFlags = getEmitFlags(previousSibling);
                    if (!(previousSiblingEmitFlags & EmitFlags.NoTrailingComments)) {
                        emitLeadingCommentsOfPosition(previousSibling.end);
                    }
                }

                writeDelimiter(format);

                // Write either a line terminator or whitespace to separate the elements.
                const separatingLineTerminatorCount = getSeparatingLineTerminatorCount(previousSibling, child, format);
                if (separatingLineTerminatorCount > 0) {
                    // If a synthesized node in a single-line list starts on a new
                    // line, we should increase the indent.
                    if ((format & (ListFormat.LinesMask | ListFormat.Indented)) === ListFormat.SingleLine) {
                        increaseIndent();
                        shouldDecreaseIndentAfterEmit = true;
                    }

                    if (shouldEmitInterveningComments && format & ListFormat.DelimitersMask && !positionIsSynthesized(child.pos)) {
                        const commentRange = getCommentRange(child);
                        emitTrailingCommentsOfPosition(commentRange.pos, /*prefixSpace*/ !!(format & ListFormat.SpaceBetweenSiblings), /*forceNoNewline*/ true);
                    }

                    writeLine(separatingLineTerminatorCount);
                    shouldEmitInterveningComments = false;
                }
                else if (previousSibling && format & ListFormat.SpaceBetweenSiblings) {
                    writeSpace();
                }
            }

            // Emit this child.
            if (shouldEmitInterveningComments) {
                const commentRange = getCommentRange(child);
                emitTrailingCommentsOfPosition(commentRange.pos);
            }
            else {
                shouldEmitInterveningComments = mayEmitInterveningComments;
            }

            nextListElementPos = child.pos;
            emitListItem(child, emit, parenthesizerRule, i);

            if (shouldDecreaseIndentAfterEmit) {
                decreaseIndent();
                shouldDecreaseIndentAfterEmit = false;
            }

            previousSibling = child;
        }

        // Write a trailing comma, if requested.
        const emitFlags = previousSibling ? getEmitFlags(previousSibling) : 0;
        const skipTrailingComments = commentsDisabled || !!(emitFlags & EmitFlags.NoTrailingComments);
        const emitTrailingComma = hasTrailingComma && (format & ListFormat.AllowTrailingComma) && (format & ListFormat.CommaDelimited);
        if (emitTrailingComma) {
            if (previousSibling && !skipTrailingComments) {
                emitTokenWithComment(SyntaxKind.CommaToken, previousSibling.end, writePunctuation, previousSibling);
            }
            else {
                writePunctuation(",");
            }
        }

        // Emit any trailing comment of the last element in the list
        // i.e
        //       var array = [...
        //          2
        //          /* end of element 2 */
        //       ];
        if (previousSibling && (parentNode ? parentNode.end : -1) !== previousSibling.end && (format & ListFormat.DelimitersMask) && !skipTrailingComments) {
            emitLeadingCommentsOfPosition(emitTrailingComma && childrenTextRange?.end ? childrenTextRange.end : previousSibling.end);
        }

        // Decrease the indent, if requested.
        if (format & ListFormat.Indented) {
            decreaseIndent();
        }

        // Write the closing line terminator or closing whitespace.
        const closingLineTerminatorCount = getClosingLineTerminatorCount(parentNode, children[start + count - 1], format, childrenTextRange);
        if (closingLineTerminatorCount) {
            writeLine(closingLineTerminatorCount);
        }
        else if (format & (ListFormat.SpaceAfterList | ListFormat.SpaceBetweenBraces)) {
            writeSpace();
        }
    }

    function siblingNodePositionsAreComparable(previousNode: Node, nextNode: Node) {
        if (nextNode.pos < previousNode.end) {
            return false;
        }

        previousNode = getOriginalNode(previousNode);
        nextNode = getOriginalNode(nextNode);
        const parent = previousNode.parent;
        if (!parent || parent !== nextNode.parent) {
            return false;
        }

        const parentNodeArray = getContainingNodeArray(previousNode);
        const prevNodeIndex = parentNodeArray?.indexOf(previousNode);
        return prevNodeIndex !== undefined && prevNodeIndex > -1 && parentNodeArray!.indexOf(nextNode) === prevNodeIndex + 1;
    }

    
    function getSeparatingLineTerminatorCount(previousNode: Node | undefined, nextNode: Node, format: ListFormat): number {
        if (format & ListFormat.PreserveLines || preserveSourceNewlines) {
            if (previousNode === undefined || nextNode === undefined) {
                return 0;
            }           
            else if (currentSourceFile && !nodeIsSynthesized(previousNode) && !nodeIsSynthesized(nextNode)) {
                if (preserveSourceNewlines && siblingNodePositionsAreComparable(previousNode, nextNode)) {
                    return getEffectiveLines(
                        includeComments =>
                            getLinesBetweenRangeEndAndRangeStart(
                                previousNode,
                                nextNode,
                                currentSourceFile!,
                                includeComments,
                            ),
                    );
                }
                // If `preserveSourceNewlines` is `false` we do not intend to preserve the effective lines between the
                // previous and next node. Instead we naively check whether nodes are on separate lines within the
                // same node parent. If so, we intend to preserve a single line terminator. This is less precise and
                // expensive than checking with `preserveSourceNewlines` as above, but the goal is not to preserve the
                // effective source lines between two sibling nodes.
                else if (!preserveSourceNewlines && originalNodesHaveSameParent(previousNode, nextNode)) {
                    return rangeEndIsOnSameLineAsRangeStart(previousNode, nextNode, currentSourceFile) ? 0 : 1;
                }
                // If the two nodes are not comparable, add a line terminator based on the format that can indicate
                // whether new lines are preferred or not.
                return format & ListFormat.PreferNewLine ? 1 : 0;
            }
            else if (synthesizedNodeStartsOnNewLine(previousNode, format) || synthesizedNodeStartsOnNewLine(nextNode, format)) {
                return 1;
            }
        }
        else if (getStartsOnNewLine(nextNode)) {
            return 1;
        }
        return format & ListFormat.MultiLine ? 1 : 0;
    }

    function originalNodesHaveSameParent(nodeA: Node, nodeB: Node) {
        nodeA = getOriginalNode(nodeA);
        // For performance, do not call `getOriginalNode` for `nodeB` if `nodeA` doesn't even
        // have a parent node.
        return nodeA.parent && nodeA.parent === getOriginalNode(nodeB).parent;
    }

    function getClosingLineTerminatorCount(parentNode: Node | undefined, lastChild: Node | undefined, format: ListFormat, childrenTextRange: TextRange | undefined): number {
        if (format & ListFormat.PreserveLines || preserveSourceNewlines) {
            if (format & ListFormat.PreferNewLine) {
                return 1;
            }

            if (lastChild === undefined) {
                return !parentNode || currentSourceFile && rangeIsOnSingleLine(parentNode, currentSourceFile) ? 0 : 1;
            }
            if (currentSourceFile && parentNode && !positionIsSynthesized(parentNode.pos) && !nodeIsSynthesized(lastChild) && (!lastChild.parent || lastChild.parent === parentNode)) {
                if (preserveSourceNewlines) {
                    const end = childrenTextRange && !positionIsSynthesized(childrenTextRange.end) ? childrenTextRange.end : lastChild.end;
                    return getEffectiveLines(
                        includeComments =>
                            getLinesBetweenPositionAndNextNonWhitespaceCharacter(
                                end,
                                parentNode.end,
                                currentSourceFile!,
                                includeComments,
                            ),
                    );
                }
                return rangeEndPositionsAreOnSameLine(parentNode, lastChild, currentSourceFile) ? 0 : 1;
            }
            if (synthesizedNodeStartsOnNewLine(lastChild, format)) {
                return 1;
            }
        }
        if (format & ListFormat.MultiLine && !(format & ListFormat.NoTrailingNewLine)) {
            return 1;
        }
        return 0;
    }
    
    function writeDelimiter(format: ListFormat) {
        switch (format & ListFormat.DelimitersMask) {
            case ListFormat.None:
                break;
            case ListFormat.CommaDelimited:
                writePunctuation(",");
                break;
            case ListFormat.BarDelimited:
                writeSpace();
                writePunctuation("|");
                break;
            case ListFormat.AsteriskDelimited:
                writeSpace();
                writePunctuation("*");
                writeSpace();
                break;
            case ListFormat.AmpersandDelimited:
                writeSpace();
                writePunctuation("&");
                break;
        }
    }

    function emitShebangIfNeeded(sourceFileOrBundle: Bundle | SourceFile) {
        if (isSourceFile(sourceFileOrBundle)) {
            const shebang = getShebang(sourceFileOrBundle.text);
            if (shebang) {
                writeComment(shebang);
                writeLine();
                return true;
            }
        }
        else {
            for (const sourceFile of sourceFileOrBundle.sourceFiles) {
                // Emit only the first encountered shebang
                if (emitShebangIfNeeded(sourceFile)) {
                    return true;
                }
            }
        }
    }

    function pipelineEmitWithHintWorker(hint: EmitHint, node: Node, allowSnippets = true): void {
        // if (allowSnippets) {
        //     const snippet = getSnippetElement(node);
        //     if (snippet) {
        //         return emitSnippetNode(hint, node, snippet);
        //     }
        // }

        
        if (hint === EmitHint.IdentifierName) return emitIdentifier(cast(node, isIdentifier));
        if (hint === EmitHint.Unspecified) {
            switch (node.kind) {
                
                // Identifiers
                case SyntaxKind.Identifier:
                    return emitIdentifier(node as Identifier);
                case SyntaxKind.TypeLiteral:
                    return emitTypeLiteral(node as TypeLiteralNode);
                case SyntaxKind.ArrayType:
                    return emitArrayType(node as ArrayTypeNode);
                case SyntaxKind.VariableStatement:
                    return emitVariableStatement(node as VariableStatement);
                case SyntaxKind.Parameter:
                    return emitParameter(node as ParameterDeclaration);
                case SyntaxKind.FunctionType:
                    return emitFunctionType(node as lpc.FunctionTypeNode);
                                     
                // Declarations
                case SyntaxKind.FunctionDeclaration:
                    return emitFunctionDeclaration(node as FunctionDeclaration);
                case SyntaxKind.VariableDeclaration:
                    return emitVariableDeclaration(node as VariableDeclaration);
                case SyntaxKind.VariableDeclarationList:
                    return emitVariableDeclarationList(node as VariableDeclarationList);
                case SyntaxKind.CallSignature:
                    return emitCallSignature(node as CallSignatureDeclaration);
                case SyntaxKind.ReturnStatement:
                    return emitReturnStatement(node as ReturnStatement);                
                case SyntaxKind.CaseBlock:
                    return emitCaseBlock(node as CaseBlock);
                    
                // Statements
                case SyntaxKind.Block:
                    return emitBlock(node as Block);
                case SyntaxKind.SwitchStatement:
                    return emitSwitchStatement(node as SwitchStatement);
                case SyntaxKind.ContinueStatement:
                    return emitContinueStatement(node as ContinueStatement);
                case SyntaxKind.BreakStatement:
                    return emitBreakStatement(node as BreakStatement);
                case SyntaxKind.ExpressionStatement:
                    return emitExpressionStatement(node as ExpressionStatement);
                case SyntaxKind.IfStatement:
                    return emitIfStatement(node as IfStatement);

                // Clauses
                case SyntaxKind.CaseClause:
                    return emitCaseClause(node as CaseClause);
                case SyntaxKind.DefaultClause:
                    return emitDefaultClause(node as DefaultClause);
                
                // Types
                case SyntaxKind.IndexedAccessType:
                    return emitIndexedAccessType(node as IndexedAccessTypeNode);
            }
        }
        if (hint === EmitHint.Expression) {
            switch (node.kind) {
                // Literals
                case SyntaxKind.StringLiteral:                
                    return emitLiteral(node as LiteralExpression);                
                case SyntaxKind.IntLiteral:
                case SyntaxKind.FloatLiteral:
                    return emitNumericLiteral(node as lpc.IntLiteral | lpc.FloatLiteral);

                // Identifiers
                case SyntaxKind.Identifier:
                    return emitIdentifier(node as Identifier);

                // Expressions
                case SyntaxKind.ArrayLiteralExpression:
                    return emitArrayLiteralExpression(node as ArrayLiteralExpression);
                case SyntaxKind.BinaryExpression:
                    return emitBinaryExpressionHelper(node as BinaryExpression);
                    // return emitBinaryExpression(node as BinaryExpression);       
                case SyntaxKind.CallExpression:
                    return emitCallExpression(node as CallExpression);
                case SyntaxKind.ElementAccessExpression:
                    return emitElementAccessExpression(node as ElementAccessExpression);
                case SyntaxKind.ParenthesizedExpression:
                    return emitParenthesizedExpression(node as ParenthesizedExpression);
                case SyntaxKind.RangeExpression:
                    return emitRangeExpression(node as RangeExpression);
                case SyntaxKind.PrefixUnaryExpression:
                    return emitPrefixUnaryExpression(node as PrefixUnaryExpression);
            }
        }
        if (isKeyword(node.kind)) return writeTokenNode(node, writeKeyword);
        if (isTokenKind(node.kind)) return writeTokenNode(node, writePunctuation);

        console.warn("todo - implment me - pipelineEmitWithHintWorker " + Debug.formatSyntaxKind(node.kind));
    }

    // Writers

    function writeLiteral(s: string) {
        writer.writeLiteral(s);
    }

    function writeStringLiteral(s: string) {
        writer.writeStringLiteral(s);
    }

    function writeBase(s: string) {
        writer.write(s);
    }

    function writeSymbol(s: string, sym: Symbol) {
        writer.writeSymbol(s, sym);
    }

    function writePunctuation(s: string) {
        writer.writePunctuation(s);
    }

    function writeTrailingSemicolon() {
        writer.writeTrailingSemicolon(";");
    }

    function writeKeyword(s: string) {
        writer.writeKeyword(s);
    }

    function writeOperator(s: string) {
        writer.writeOperator(s);
    }

    function writeParameter(s: string) {
        writer.writeParameter(s);
    }

    function writeComment(s: string) {
        writer.writeComment(s);
    }

    function writeSpace() {
        writer.writeSpace(" ");
    }

    function writeProperty(s: string) {
        writer.writeProperty(s);
    }

    function nonEscapingWrite(s: string) {
        // This should be defined in a snippet-escaping text writer.
        if (writer.nonEscapingWrite) {
            writer.nonEscapingWrite(s);
        }
        else {
            writer.write(s);
        }
    }

    function writeLine(count = 1) {
        for (let i = 0; i < count; i++) {
            writer.writeLine(i > 0);
        }
    }

    function increaseIndent() {
        writer.increaseIndent();
    }

    function decreaseIndent() {
        writer.decreaseIndent();
    }

    /**
     * Emits a token of a node with possible leading and trailing source maps.
     *
     * @param node The node containing the token.
     * @param token The token to emit.
     * @param tokenStartPos The start pos of the token.
     * @param emitCallback The callback used to emit the token.
     */
    function emitTokenWithSourceMap(node: Node | undefined, token: SyntaxKind, writer: (s: string) => void, tokenPos: number, emitCallback: (token: SyntaxKind, writer: (s: string) => void, tokenStartPos: number) => number) {
        return emitCallback(token, writer, tokenPos);
        // TODO
    }

    function writeToken(token: SyntaxKind, pos: number, writer: (s: string) => void, contextNode?: Node): number {
        return !sourceMapsDisabled
            ? emitTokenWithSourceMap(contextNode, token, writer, pos, writeTokenText)
            : writeTokenText(token, writer, pos);
    }

    function writeTokenNode(node: Node, writer: (s: string) => void) {
        if (onBeforeEmitToken) {
            onBeforeEmitToken(node);
        }
        writer(tokenToString(node.kind)!);
        if (onAfterEmitToken) {
            onAfterEmitToken(node);
        }
    }

    function writeTokenText(token: SyntaxKind, writer: (s: string) => void): void;
    function writeTokenText(token: SyntaxKind, writer: (s: string) => void, pos: number): number;
    function writeTokenText(token: SyntaxKind, writer: (s: string) => void, pos?: number): number {
        const tokenString = tokenToString(token)!;
        writer(tokenString);
        return pos! < 0 ? pos! : pos! + tokenString.length;
    }

    function skipSynthesizedParentheses(node: Node) {
        while (node.kind === SyntaxKind.ParenthesizedExpression && nodeIsSynthesized(node)) {
            node = (node as ParenthesizedExpression).expression;
        }

        return node;
    }
    
    function getEffectiveLines(getLineDifference: (includeComments: boolean) => number) {
        // If 'preserveSourceNewlines' is disabled, we should never call this function
        // because it could be more expensive than alternative approximations.
        Debug.assert(!!preserveSourceNewlines);
        // We start by measuring the line difference from a position to its adjacent comments,
        // so that this is counted as a one-line difference, not two:
        //
        //   node1;
        //   // NODE2 COMMENT
        //   node2;
        const lines = getLineDifference(/*includeComments*/ true);
        if (lines === 0) {
            // However, if the line difference considering comments was 0, we might have this:
            //
            //   node1; // NODE2 COMMENT
            //   node2;
            //
            // in which case we should be ignoring node2's comment, so this too is counted as
            // a one-line difference, not zero.
            return getLineDifference(/*includeComments*/ false);
        }
        return lines;
    }
    
    function getLinesBetweenNodes(parent: Node, node1: Node, node2: Node): number {
        if (getEmitFlags(parent) & EmitFlags.NoIndentation) {
            return 0;
        }

        parent = skipSynthesizedParentheses(parent);
        node1 = skipSynthesizedParentheses(node1);
        node2 = skipSynthesizedParentheses(node2);

        // Always use a newline for synthesized code if the synthesizer desires it.
        if (getStartsOnNewLine(node2)) {
            return 1;
        }

        if (currentSourceFile && !nodeIsSynthesized(parent) && !nodeIsSynthesized(node1) && !nodeIsSynthesized(node2)) {
            if (preserveSourceNewlines) {
                return getEffectiveLines(
                    includeComments =>
                        getLinesBetweenRangeEndAndRangeStart(
                            node1,
                            node2,
                            currentSourceFile!,
                            includeComments,
                        ),
                );
            }
            return rangeEndIsOnSameLineAsRangeStart(node1, node2, currentSourceFile) ? 0 : 1;
        }

        return 0;
    }

    function writeLineOrSpace(parentNode: Node, prevChildNode: Node, nextChildNode: Node) {
        if (getEmitFlags(parentNode) & EmitFlags.SingleLine) {
            writeSpace();
        }
        else if (preserveSourceNewlines) {
            const lines = getLinesBetweenNodes(parentNode, prevChildNode, nextChildNode);
            if (lines) {
                writeLine(lines);
            }
            else {
                writeSpace();
            }
        }
        else {
            writeLine();
        }
    }

    function writeLines(text: string): void {
        const lines = text.split(/\r\n?|\n/g);
        const indentation = guessIndentation(lines);
        for (const lineText of lines) {
            const line = indentation ? lineText.slice(indentation) : lineText;
            if (line.length) {
                writeLine();
                write(line);
            }
        }
    }

    function writeLinesAndIndent(lineCount: number, writeSpaceIfNotIndenting: boolean) {
        if (lineCount) {
            increaseIndent();
            writeLine(lineCount);
        }
        else if (writeSpaceIfNotIndenting) {
            writeSpace();
        }
    }

    // Helper function to decrease the indent if we previously indented.  Allows multiple
    // previous indent values to be considered at a time.  This also allows caller to just
    // call this once, passing in all their appropriate indent values, instead of needing
    // to call this helper function multiple times.
    function decreaseIndentIf(value1: boolean | number | undefined, value2?: boolean | number) {
        if (value1) {
            decreaseIndent();
        }
        if (value2) {
            decreaseIndent();
        }
    }

    function getTextOfNode(node: Identifier | LiteralExpression, includeTrivia?: boolean): string {
        // if (isGeneratedIdentifier(node)) {
        //     return generateName(node);
        // }
        if (isStringLiteral(node) && node.textSourceNode) {
            return getTextOfNode(node.textSourceNode, includeTrivia);
        }
        const sourceFile = currentSourceFile; // const needed for control flow
        const canUseSourceFile = !!sourceFile && !!node.parent && !nodeIsSynthesized(node);
        if (isMemberName(node)) {
            if (!canUseSourceFile || getSourceFileOfNode(node) !== getOriginalNode(sourceFile)) {
                return idText(node);
            }
        }        
        else {
            Debug.assertNode(node, isLiteralExpression); // not strictly necessary
            if (!canUseSourceFile) {
                return node.text;
            }
        }
        return getSourceTextOfNodeFromSourceFile(sourceFile, node, includeTrivia);
    }

    function emitNumericLiteral(node: lpc.IntLiteral | lpc.FloatLiteral) {
        emitLiteral(node);
    }

    // SyntaxKind.StringLiteral
    // SyntaxKind.RegularExpressionLiteral
    // SyntaxKind.NoSubstitutionTemplateLiteral
    // SyntaxKind.TemplateHead
    // SyntaxKind.TemplateMiddle
    // SyntaxKind.TemplateTail
    function emitLiteral(node: LiteralLikeNode) {
        const text = getLiteralTextOfNode(node, printerOptions.neverAsciiEscape);
        if (
            (printerOptions.sourceMap || printerOptions.inlineSourceMap)
            && (node.kind === SyntaxKind.StringLiteral)
        ) {
            writeLiteral(text);
        }
        else {
            // Quick info expects all literals to be called with writeStringLiteral, as there's no specific type for numberLiterals
            writeStringLiteral(text);
        }
    }

    function emitArrayLiteralExpression(node: ArrayLiteralExpression) {                
        const elements = node.elements;
        const preferNewLine = node.multiLine ? ListFormat.PreferNewLine : ListFormat.None;
        emitExpressionList(node, elements, ListFormat.JsArrayLiteralExpressionElements | preferNewLine, parenthesizer.parenthesizeExpressionForDisallowedComma);
    }

    function getLiteralTextOfNode(node: LiteralLikeNode, neverAsciiEscape: boolean | undefined): string {
        if (node.kind === SyntaxKind.StringLiteral && (node as StringLiteral).textSourceNode) {
            const textSourceNode = (node as StringLiteral).textSourceNode!;
            if (isIdentifier(textSourceNode) || isPrivateIdentifier(textSourceNode) || lpc.isNumericLiteral(textSourceNode)) {
                const text = lpc.isNumericLiteral(textSourceNode) ? textSourceNode.text : getTextOfNode(textSourceNode);
                return neverAsciiEscape || (getEmitFlags(node) & EmitFlags.NoAsciiEscaping) ? `"${escapeString(text)}"` :
                    `"${escapeNonAsciiString(text)}"`;
            }
            else {
                return getLiteralTextOfNode(textSourceNode, neverAsciiEscape);
            }
        }

        const flags = (neverAsciiEscape ? GetLiteralTextFlags.NeverAsciiEscape : 0)
            | (printerOptions.terminateUnterminatedLiterals ? GetLiteralTextFlags.TerminateUnterminatedLiterals : 0)
            | (printerOptions.target && printerOptions.target >= ScriptTarget.LPC ? GetLiteralTextFlags.AllowNumericSeparator : 0);

        return getLiteralText(node, currentSourceFile, flags);
    }

    
    //
    // Identifiers
    //

    function emitIdentifier(node: Identifier) {
        const writeText = node.symbol ? writeSymbol : write;
        writeText(getTextOfNode(node, /*includeTrivia*/ false), node.symbol);
        emitList(node, getIdentifierTypeArguments(node), ListFormat.TypeParameters); // Call emitList directly since it could be an array of TypeParameterDeclarations _or_ type arguments
    }
    
    /**
     * Push a new name generation scope.
     */
    function pushNameGenerationScope(node: Node | undefined) {
        privateNameTempFlagsStack.push(privateNameTempFlags);
        privateNameTempFlags = TempFlags.Auto;
        reservedPrivateNamesStack.push(reservedPrivateNames);

        if (node && getEmitFlags(node) & EmitFlags.ReuseTempVariableScope) {
            return;
        }

        tempFlagsStack.push(tempFlags);
        tempFlags = TempFlags.Auto;
        formattedNameTempFlagsStack.push(formattedNameTempFlags);
        formattedNameTempFlags = undefined;
        reservedNamesStack.push(reservedNames);
    }

    /**
     * Pop the current name generation scope.
     */
    function popNameGenerationScope(node: Node | undefined) {
        privateNameTempFlags = privateNameTempFlagsStack.pop()!;
        reservedPrivateNames = reservedPrivateNamesStack.pop();

        if (node && getEmitFlags(node) & EmitFlags.ReuseTempVariableScope) {
            return;
        }

        tempFlags = tempFlagsStack.pop()!;
        formattedNameTempFlags = formattedNameTempFlagsStack.pop();
        reservedNames = reservedNamesStack.pop();
    }
    
    function generateMemberNames(node: Node | undefined) {
        if (!node) return;
        switch (node.kind) {
            case SyntaxKind.PropertyAssignment:
            case SyntaxKind.ShorthandPropertyAssignment:
            case SyntaxKind.PropertyDeclaration:
            // case SyntaxKind.PropertySignature:
            // case SyntaxKind.MethodDeclaration:
            // case SyntaxKind.MethodSignature:
            // case SyntaxKind.GetAccessor:
            // case SyntaxKind.SetAccessor:
                generateNameIfNeeded((node as NamedDeclaration).name);
                break;
        }
    }    

    function generateNameIfNeeded(name: DeclarationName | undefined) {
        if (name) {
            if (isGeneratedIdentifier(name) ) {
                generateName(name);
            }
            else if (isBindingPattern(name)) {
                generateNames(name);
            }
        }
    }

    function generateNames(node: Node | undefined) {
        if (!node) return;
        switch (node.kind) {
            case SyntaxKind.Block:
                forEach((node as Block).statements, generateNames);
                break;
            // case SyntaxKind.LabeledStatement:
            // case SyntaxKind.WithStatement:
            case SyntaxKind.DoWhileStatement:
            case SyntaxKind.WhileStatement:
                generateNames((node as DoWhileStatement | WhileStatement).statement);
                break;
            case SyntaxKind.IfStatement:
                generateNames((node as IfStatement).thenStatement);
                generateNames((node as IfStatement).elseStatement);
                break;
            case SyntaxKind.ForStatement:
                generateNames((node as ForStatement).initializer);
                generateNames((node as ForStatement).statement);
            case SyntaxKind.ForEachStatement:            
                generateNames((node as ForEachStatement).expression);
                generateNames((node as ForEachStatement).statement);
                break;
            case SyntaxKind.SwitchStatement:
                generateNames((node as SwitchStatement).caseBlock);
                break;
            case SyntaxKind.CaseBlock:
                forEach((node as CaseBlock).clauses, generateNames);
                break;
            case SyntaxKind.CaseClause:
            case SyntaxKind.DefaultClause:
                forEach((node as CaseOrDefaultClause).statements, generateNames);
                break;
            // case SyntaxKind.TryStatement:
            //     generateNames((node as TryStatement).tryBlock);
            //     generateNames((node as TryStatement).catchClause);
            //     generateNames((node as TryStatement).finallyBlock);
                break;
            case SyntaxKind.CatchStatement:
                // generateNames((node as CatchStatement).variableDeclaration);
                generateNames((node as CatchStatement).block);
                break;
            case SyntaxKind.VariableStatement:
                generateNames((node as VariableStatement).declarationList);
                break;
            case SyntaxKind.VariableDeclarationList:
                forEach((node as VariableDeclarationList).declarations, generateNames);
                break;
            case SyntaxKind.VariableDeclaration:
            case SyntaxKind.Parameter:
            case SyntaxKind.BindingElement:
            // case SyntaxKind.ClassDeclaration:
                generateNameIfNeeded((node as NamedDeclaration).name);
                break;
            case SyntaxKind.FunctionDeclaration:
                generateNameIfNeeded((node as FunctionDeclaration).name);
                if (getEmitFlags(node) & EmitFlags.ReuseTempVariableScope) {
                    forEach((node as FunctionDeclaration).parameters, generateNames);
                    generateNames((node as FunctionDeclaration).body);
                }
                break;
            // case SyntaxKind.ObjectBindingPattern:
            case SyntaxKind.ArrayBindingPattern:
                forEach((node as BindingPattern).elements, generateNames);
                break;
            // case SyntaxKind.ImportDeclaration:
            //     generateNames((node as ImportDeclaration).importClause);
            //     break;
            // case SyntaxKind.ImportClause:
            //     generateNameIfNeeded((node as ImportClause).name);
            //     generateNames((node as ImportClause).namedBindings);
            //     break;
            // case SyntaxKind.NamespaceImport:
            //     generateNameIfNeeded((node as NamespaceImport).name);
            //     break;
            // case SyntaxKind.NamespaceExport:
            //     generateNameIfNeeded((node as NamespaceExport).name);
            //     break;
            // case SyntaxKind.NamedImports:
            //     forEach((node as NamedImports).elements, generateNames);
            //     break;
            // case SyntaxKind.ImportSpecifier:
            //     generateNameIfNeeded((node as ImportSpecifier).propertyName || (node as ImportSpecifier).name);
            //     break;
        }
    }

    function isReservedName(name: string, privateName: boolean): boolean {
        let set: Set<string> | undefined;
        let stack: (Set<string> | undefined)[];
        if (privateName) {
            set = reservedPrivateNames;
            stack = reservedPrivateNamesStack;
        }
        else {
            set = reservedNames;
            stack = reservedNamesStack;
        }

        if (set?.has(name)) {
            return true;
        }
        for (let i = stack.length - 1; i >= 0; i--) {
            if (set === stack[i]) {
                continue;
            }
            set = stack[i];
            if (set?.has(name)) {
                return true;
            }
        }
        return false;
    }

    
    /**
     * Returns a value indicating whether a name is unique globally, within the current file,
     * or within the NameGenerator.
     */
    function isUniqueName(name: string, privateName: boolean): boolean {
        return isFileLevelUniqueNameInCurrentFile(name, privateName)
            && !isReservedName(name, privateName)
            && !generatedNames.has(name);
    }
    
    /**
     * Returns a value indicating whether a name is unique globally or within the current file.
     *
     * @param _isPrivate (unused) this parameter exists to avoid an unnecessary adaptor frame in v8
     * when `isfileLevelUniqueName` is passed as a callback to `makeUniqueName`.
     */
    function isFileLevelUniqueNameInCurrentFile(name: string, _isPrivate: boolean) {
        return currentSourceFile ? isFileLevelUniqueName(currentSourceFile, name, hasGlobalName) : true;
    }


    /**
     * Generate a name that is unique within the current file and doesn't conflict with any names
     * in global scope. The name is formed by adding an '_n' suffix to the specified base name,
     * where n is a positive integer. Note that names generated by makeTempVariableName and
     * makeUniqueName are guaranteed to never conflict.
     * If `optimistic` is set, the first instance will use 'baseName' verbatim instead of 'baseName_1'
     */
    function makeUniqueName(baseName: string, checkFn: (name: string, privateName: boolean) => boolean = isUniqueName, optimistic: boolean, scoped: boolean, privateName: boolean, prefix: string, suffix: string): string {
        if (baseName.length > 0 && baseName.charCodeAt(0) === CharacterCodes.hash) {
            baseName = baseName.slice(1);
        }
        if (prefix.length > 0 && prefix.charCodeAt(0) === CharacterCodes.hash) {
            prefix = prefix.slice(1);
        }
        if (optimistic) {
            const fullName = formatGeneratedName(privateName, prefix, baseName, suffix);
            if (checkFn(fullName, privateName)) {
                // if (privateName) {
                //     reservePrivateNameInNestedScopes(fullName);
                // }
                if (scoped) {
                    reserveNameInNestedScopes(fullName);
                }
                else {
                    generatedNames.add(fullName);
                }
                return fullName;
            }
        }
        // Find the first unique 'name_n', where n is a positive number
        if (baseName.charCodeAt(baseName.length - 1) !== CharacterCodes._) {
            baseName += "_";
        }
        let i = 1;
        while (true) {
            const fullName = formatGeneratedName(privateName, prefix, baseName + i, suffix);
            if (checkFn(fullName, privateName)) {
                // if (privateName) {
                //     reservePrivateNameInNestedScopes(fullName);
                // }
                if (scoped) {
                    reserveNameInNestedScopes(fullName);
                }
                else {
                    generatedNames.add(fullName);
                }
                return fullName;
            }
            i++;
        }
    }

    
    /**
     * Generates a unique name from a node.
     */
    function generateNameForNode(node: Node, privateName: boolean, flags: GeneratedIdentifierFlags, prefix: string, suffix: string): string {
        switch (node.kind) {
            case SyntaxKind.Identifier:            
                return makeUniqueName(
                    getTextOfNode(node as Identifier),
                    isUniqueName,
                    !!(flags & GeneratedIdentifierFlags.Optimistic),
                    !!(flags & GeneratedIdentifierFlags.ReservedInNestedScopes),
                    privateName,
                    prefix,
                    suffix,
                );
            // case SyntaxKind.ModuleDeclaration:
            // case SyntaxKind.EnumDeclaration:
            //     Debug.assert(!prefix && !suffix && !privateName);
            //     return generateNameForModuleOrEnum(node as ModuleDeclaration | EnumDeclaration);
            // case SyntaxKind.ImportDeclaration:
            // case SyntaxKind.ExportDeclaration:
            //     Debug.assert(!prefix && !suffix && !privateName);
            //     return generateNameForImportOrExportDeclaration(node as ImportDeclaration | ExportDeclaration);
            case SyntaxKind.FunctionDeclaration: {
            // case SyntaxKind.ClassDeclaration: {
                Debug.assert(!prefix && !suffix && !privateName);
                const name = (node as FunctionDeclaration).name;
                if (name && !isGeneratedIdentifier(name)) {
                    return generateNameForNode(name, /*privateName*/ false, flags, prefix, suffix);
                }
                Debug.fail("shouldn't be here");
                //return generateNameForExportDefault();
            }
            // case SyntaxKind.ExportAssignment:
            //     Debug.assert(!prefix && !suffix && !privateName);
            //     return generateNameForExportDefault();
            case SyntaxKind.ClassExpression:
                Debug.fail("implement me");
                // Debug.assert(!prefix && !suffix && !privateName);
                // return generateNameForClassExpression();
            // case SyntaxKind.MethodDeclaration:
            // case SyntaxKind.GetAccessor:
            // case SyntaxKind.SetAccessor:
            //     return generateNameForMethodOrAccessor(node as MethodDeclaration | AccessorDeclaration, privateName, prefix, suffix);
            case SyntaxKind.ComputedPropertyName:
                return makeTempVariableName(TempFlags.Auto, /*reservedInNestedScopes*/ true, privateName, prefix, suffix);
            default:
                return makeTempVariableName(TempFlags.Auto, /*reservedInNestedScopes*/ false, privateName, prefix, suffix);
        }
    }

    function generateNameCached(node: Node, privateName: boolean, flags?: GeneratedIdentifierFlags, prefix?: string | GeneratedNamePart, suffix?: string) {
        const nodeId = getNodeId(node);
        const cache = privateName ? nodeIdToGeneratedPrivateName : nodeIdToGeneratedName;
        return cache[nodeId] || (cache[nodeId] = generateNameForNode(node, privateName, flags ?? GeneratedIdentifierFlags.None, formatGeneratedNamePart(prefix, generateName), formatGeneratedNamePart(suffix)));
    }

    function getTempFlags(formattedNameKey: string) {
        switch (formattedNameKey) {
            case "":
                return tempFlags;
            case "#":
                return privateNameTempFlags;
            default:
                return formattedNameTempFlags?.get(formattedNameKey) ?? TempFlags.Auto;
        }
    }

    function setTempFlags(formattedNameKey: string, flags: TempFlags) {
        switch (formattedNameKey) {
            case "":
                tempFlags = flags;
                break;
            case "#":
                privateNameTempFlags = flags;
                break;
            default:
                formattedNameTempFlags ??= new Map();
                formattedNameTempFlags.set(formattedNameKey, flags);
                break;
        }
    }

    function reserveNameInNestedScopes(name: string) {
        if (!reservedNames || reservedNames === lastOrUndefined(reservedNamesStack)) {
            reservedNames = new Set();
        }
        reservedNames.add(name);
    }
    
    /**
     * Return the next available name in the pattern _a ... _z, _0, _1, ...
     * TempFlags._i or TempFlags._n may be used to express a preference for that dedicated name.
     * Note that names generated by makeTempVariableName and makeUniqueName will never conflict.
     */
    function makeTempVariableName(flags: TempFlags, reservedInNestedScopes: boolean, privateName: boolean, prefix: string, suffix: string): string {
        if (prefix.length > 0 && prefix.charCodeAt(0) === CharacterCodes.hash) {
            prefix = prefix.slice(1);
        }

        // Generate a key to use to acquire a TempFlags counter based on the fixed portions of the generated name.
        const key = formatGeneratedName(privateName, prefix, "", suffix);
        let tempFlags = getTempFlags(key);

        if (flags && !(tempFlags & flags)) {
            const name = flags === TempFlags._i ? "_i" : "_n";
            const fullName = formatGeneratedName(privateName, prefix, name, suffix);
            if (isUniqueName(fullName, privateName)) {
                tempFlags |= flags;
                // if (privateName) {
                //     reservePrivateNameInNestedScopes(fullName);
                // }
                if (reservedInNestedScopes) {
                    reserveNameInNestedScopes(fullName);
                }
                setTempFlags(key, tempFlags);
                return fullName;
            }
        }

        while (true) {
            const count = tempFlags & TempFlags.CountMask;
            tempFlags++;
            // Skip over 'i' and 'n'
            if (count !== 8 && count !== 13) {
                const name = count < 26
                    ? "_" + String.fromCharCode(CharacterCodes.a + count)
                    : "_" + (count - 26);
                const fullName = formatGeneratedName(privateName, prefix, name, suffix);
                if (isUniqueName(fullName, privateName)) {
                    // if (privateName) {
                    //     reservePrivateNameInNestedScopes(fullName);
                    // }
                    if (reservedInNestedScopes) {
                        reserveNameInNestedScopes(fullName);
                    }
                    setTempFlags(key, tempFlags);
                    return fullName;
                }
            }
        }
    }

    /**
     * Generates a unique identifier for a node.
     */
    function makeName(name: GeneratedIdentifier ) {
        const autoGenerate = name.emitNode.autoGenerate;
        const prefix = formatGeneratedNamePart(autoGenerate.prefix, generateName);
        const suffix = formatGeneratedNamePart(autoGenerate.suffix);
        switch (autoGenerate.flags & GeneratedIdentifierFlags.KindMask) {
            case GeneratedIdentifierFlags.Auto:
                return makeTempVariableName(TempFlags.Auto, !!(autoGenerate.flags & GeneratedIdentifierFlags.ReservedInNestedScopes), isPrivateIdentifier(name), prefix, suffix);
            case GeneratedIdentifierFlags.Loop:
                Debug.assertNode(name, isIdentifier);
                return makeTempVariableName(TempFlags._i, !!(autoGenerate.flags & GeneratedIdentifierFlags.ReservedInNestedScopes), /*privateName*/ false, prefix, suffix);
            case GeneratedIdentifierFlags.Unique:
                return makeUniqueName(
                    idText(name),
                    (autoGenerate.flags & GeneratedIdentifierFlags.FileLevel) ? isFileLevelUniqueNameInCurrentFile : isUniqueName,
                    !!(autoGenerate.flags & GeneratedIdentifierFlags.Optimistic),
                    !!(autoGenerate.flags & GeneratedIdentifierFlags.ReservedInNestedScopes),
                    isPrivateIdentifier(name),
                    prefix,
                    suffix,
                );
        }

        return Debug.fail(`Unsupported GeneratedIdentifierKind: ${Debug.formatEnum(autoGenerate.flags & GeneratedIdentifierFlags.KindMask, (lpc as any).GeneratedIdentifierFlags, /*isFlags*/ true)}.`);
    }

    
    /**
     * Generate the text for a generated identifier.
     */
    function generateName(name: GeneratedIdentifier) {
        const autoGenerate = name.emitNode.autoGenerate;
        if ((autoGenerate.flags & GeneratedIdentifierFlags.KindMask) === GeneratedIdentifierFlags.Node) {
            // Node names generate unique names based on their original node
            // and are cached based on that node's id.
            return generateNameCached(getNodeForGeneratedName(name), isPrivateIdentifier(name), autoGenerate.flags, autoGenerate.prefix, autoGenerate.suffix);
        }
        else {
            // Auto, Loop, and Unique names are cached based on their unique
            // autoGenerateId.
            const autoGenerateId = autoGenerate.id;
            return autoGeneratedIdToGeneratedName[autoGenerateId] || (autoGeneratedIdToGeneratedName[autoGenerateId] = makeName(name));
        }
    }
    
    function emitTypeLiteral(node: TypeLiteralNode) {
        pushNameGenerationScope(node);
        forEach(node.members, generateMemberNames);

        writePunctuation("{");
        const flags = getEmitFlags(node) & EmitFlags.SingleLine ? ListFormat.SingleLineTypeLiteralMembers : ListFormat.MultiLineTypeLiteralMembers;
        emitList(node, node.members, flags | ListFormat.NoSpaceIfEmpty);
        writePunctuation("}");

        popNameGenerationScope(node);
    }

    function emitModifierList(node: Node, modifiers: NodeArray<Modifier> | undefined): number {
        emitList(node, modifiers, ListFormat.Modifiers);
        const lastModifier = lastOrUndefined(modifiers);
        return lastModifier && !positionIsSynthesized(lastModifier.end) ? lastModifier.end : node.pos;
    }
    
    function emitDecoratorsAndModifiers(node: Node, modifiers: NodeArray<Modifier> | undefined, allowDecorators: boolean) {
        if (modifiers?.length) {
            return emitModifierList(node, modifiers as NodeArray<Modifier>);            
        }

        return node.pos;
    }
        
    function emitSignatureAndBody<T extends SignatureDeclaration>(node: T, emitSignatureHead: (node: T) => void, emitBody: (node: T) => void) {
        const indentedFlag = getEmitFlags(node) & EmitFlags.Indented;
        if (indentedFlag) {
            increaseIndent();
        }

        pushNameGenerationScope(node);
        forEach(node.parameters, generateNames);
        emitSignatureHead(node);
        emitBody(node);
        popNameGenerationScope(node);

        if (indentedFlag) {
            decreaseIndent();
        }
    }
    
    function canEmitSimpleArrowHead(parentNode: FunctionTypeNode |  ArrowFunction, parameters: NodeArray<ParameterDeclaration>) {
        const parameter = singleOrUndefined(parameters);
        return parameter
            && parameter.pos === parentNode.pos // may not have parsed tokens between parent and parameter
            && isArrowFunction(parentNode) // only arrow functions may have simple arrow head
            && !parentNode.type // arrow function may not have return type annotation
            && !some(parentNode.modifiers) // parent may not have decorators or modifiers
            // && !some(parentNode.typeParameters) // parent may not have type parameters
            && !some(parameter.modifiers) // parameter may not have decorators or modifiers
            && !parameter.dotDotDotToken // parameter may not be rest
            // && !parameter.questionToken // parameter may not be optional
            && !parameter.type // parameter may not have a type annotation
            && !parameter.initializer // parameter may not have an initializer
            && isIdentifier(parameter.name); // parameter name must be identifier
    }

    function emitParameters(parentNode: Node, parameters: NodeArray<ParameterDeclaration>) {
        emitList(parentNode, parameters, ListFormat.Parameters);
    }

    function emitParametersForArrow(parentNode: FunctionTypeNode | ArrowFunction, parameters: NodeArray<ParameterDeclaration>) {
        if (canEmitSimpleArrowHead(parentNode, parameters)) {
            emitList(parentNode, parameters, ListFormat.Parameters & ~ListFormat.Parenthesis);
        }
        else {
            emitParameters(parentNode, parameters);
        }
    }

    function emitFunctionTypeHead(node: FunctionTypeNode) {
        // emitTypeParameters(node, node.typeParameters);
        emitParametersForArrow(node, node.parameters);
        writeSpace();
        writePunctuation("=>");
    }

    function emitFunctionTypeBody(node: FunctionTypeNode) {
        writeSpace();
        emit(node.type);
    }

    function emitNodeWithWriter(node: Node | undefined, writer: typeof write) {
        if (!node) return;
        const savedWrite = write;
        write = writer;
        emit(node);
        write = savedWrite;
    }

    function emitParameter(node: ParameterDeclaration) {
        emitDecoratorsAndModifiers(node, node.modifiers, /*allowDecorators*/ true);
        // emitTypeAnnotation(node.type);
        emitNodeWithWriter(node.name, writeParameter);
        emit(node.dotDotDotToken);
        
        // The comment position has to fallback to any present node within the parameterdeclaration because as it turns out, the parser can make parameter declarations with _just_ an initializer.
        emitInitializer(
            node.initializer, 
            node.type ? node.type.end : node.name ? node.name.end : node.modifiers ? node.modifiers.end : node.pos, 
            node, 
            parenthesizer.parenthesizeExpressionForDisallowedComma
        );
    }

    function emitFunctionType(node: FunctionTypeNode) {
        emitSignatureAndBody(node, emitFunctionTypeHead, emitFunctionTypeBody);
    }
    
    function isEmptyBlock(block: BlockLike) {
        return block.statements.length === 0
            && (!currentSourceFile || rangeEndIsOnSameLineAsRangeStart(block, block, currentSourceFile));
    }
    
    function emitBlock(node: Block) {
        emitBlockStatements(node, /*forceSingleLine*/ !node.multiLine && isEmptyBlock(node));
    }

    function emitBlockStatements(node: BlockLike, forceSingleLine: boolean) {
        emitTokenWithComment(SyntaxKind.OpenBraceToken, node.pos, writePunctuation, /*contextNode*/ node);
        const format = forceSingleLine || getEmitFlags(node) & EmitFlags.SingleLine ? ListFormat.SingleLineBlockStatements : ListFormat.MultiLineBlockStatements;
        emitList(node, node.statements, format);
        emitTokenWithComment(SyntaxKind.CloseBraceToken, node.statements.end, writePunctuation, /*contextNode*/ node, /*indentLeading*/ !!(format & ListFormat.MultiLine));
    }

    function emitVariableStatement(node: VariableStatement) {
        emitDecoratorsAndModifiers(node, node.modifiers, /*allowDecorators*/ false);
        // emitTypeAnnotation(node.type);
        emit(node.declarationList);
        writeTrailingSemicolon();
    }


    function emitArrayType(node: ArrayTypeNode) {
        emit(node.elementType, parenthesizer.parenthesizeNonArrayTypeOfPostfixType);
        writePunctuation("*");        
    }

    //
    // Declarations
    //

    function emitFunctionDeclaration(node: FunctionDeclaration) {
        emitFunctionDeclarationOrExpression(node);
    }

    function emitFunctionDeclarationOrExpression(node: FunctionDeclaration | FunctionExpression) {
        emitDecoratorsAndModifiers(node, node.modifiers, /*allowDecorators*/ false);        
        writeKeyword("function");
        emit(node.asteriskToken);
        writeSpace();
        emitIdentifierName(node.name);
        emitSignatureAndBody(node, emitSignatureHead, emitFunctionBody);
    }

    function emitFunctionBody<T extends Exclude<FunctionLikeDeclaration, ArrowFunction>>(node: T) {
        const body = node.body;
        if (body) {
            emitBlockFunctionBody(body as lpc.FunctionBody);
        }
        else {
            writeTrailingSemicolon();
        }
    }

    function emitBlockFunctionBody(body: Block) {
        generateNames(body);
        onBeforeEmitNode?.(body);
        writeSpace();
        writePunctuation("{");
        increaseIndent();

        const emitBlockFunctionBody = shouldEmitBlockFunctionBodyOnSingleLine(body)
            ? emitBlockFunctionBodyOnSingleLine
            : emitBlockFunctionBodyWorker;

        emitBodyWithDetachedComments(body, body.statements, emitBlockFunctionBody);

        decreaseIndent();
        writeToken(SyntaxKind.CloseBraceToken, body.statements.end, writePunctuation, body);
        onAfterEmitNode?.(body);
    }

    function emitBlockFunctionBodyOnSingleLine(body: Block) {
        emitBlockFunctionBodyWorker(body, /*emitBlockFunctionBodyOnSingleLine*/ true);
    }

    function emitBlockFunctionBodyWorker(body: Block, emitBlockFunctionBodyOnSingleLine?: boolean) {
        // Emit all the prologue directives (like "use strict").
        const statementOffset = emitPrologueDirectives(body.statements);
        const pos = writer.getTextPos();
        emitHelpers(body);
        if (statementOffset === 0 && pos === writer.getTextPos() && emitBlockFunctionBodyOnSingleLine) {
            decreaseIndent();
            emitList(body, body.statements, ListFormat.SingleLineFunctionBodyStatements);
            increaseIndent();
        }
        else {
            emitList(body, body.statements, ListFormat.MultiLineFunctionBodyStatements, /*parenthesizerRule*/ undefined, statementOffset);
        }
    }

    function getSortedEmitHelpers(node: Node) {
        const helpers = getEmitHelpers(node);
        return helpers && stableSort(helpers, compareEmitHelpers);
    }
    
    function emitHelpers(node: Node) {
        let helpersEmitted = false;
        const bundle = node.kind === SyntaxKind.Bundle ? node as Bundle : undefined;
        if (bundle && moduleKind === ModuleKind.None) {
            return;
        }
        const numNodes = bundle ? bundle.sourceFiles.length : 1;
        for (let i = 0; i < numNodes; i++) {
            const currentNode = bundle ? bundle.sourceFiles[i] : node;
            const sourceFile = isSourceFile(currentNode) ? currentNode : currentSourceFile;
            const shouldSkip = printerOptions.noEmitHelpers || (!!sourceFile && hasRecordedExternalHelpers(sourceFile));
            const shouldBundle = isSourceFile(currentNode) && !isOwnFileEmit;
            const helpers = getSortedEmitHelpers(currentNode);
            if (helpers) {
                for (const helper of helpers) {
                    if (!helper.scoped) {
                        // Skip the helper if it can be skipped and the noEmitHelpers compiler
                        // option is set, or if it can be imported and the importHelpers compiler
                        // option is set.
                        if (shouldSkip) continue;

                        // Skip the helper if it can be bundled but hasn't already been emitted and we
                        // are emitting a bundled module.
                        if (shouldBundle) {
                            if (bundledHelpers.get(helper.name)) {
                                continue;
                            }

                            bundledHelpers.set(helper.name, true);
                        }
                    }
                    else if (bundle) {
                        // Skip the helper if it is scoped and we are emitting bundled helpers
                        continue;
                    }
                    if (typeof helper.text === "string") {
                        writeLines(helper.text);
                    }
                    else {
                        writeLines(helper.text(makeFileLevelOptimisticUniqueName));
                    }
                    helpersEmitted = true;
                }
            }
        }

        return helpersEmitted;
    }
    
    function makeFileLevelOptimisticUniqueName(name: string) {
        return makeUniqueName(name, isFileLevelUniqueNameInCurrentFile, /*optimistic*/ true, /*scoped*/ false, /*privateName*/ false, /*prefix*/ "", /*suffix*/ "");
    }

    /**
     * Emits any prologue directives at the start of a Statement list, returning the
     * number of prologue directives written to the output.
     */
    function emitPrologueDirectives(statements: readonly Node[], sourceFile?: SourceFile, seenPrologueDirectives?: Set<string>): number {
        let needsToSetSourceFile = !!sourceFile;
        for (let i = 0; i < statements.length; i++) {
            const statement = statements[i];
            if (isPrologueDirective(statement)) {
                const shouldEmitPrologueDirective = seenPrologueDirectives ? !seenPrologueDirectives.has(statement.expression.text) : true;
                if (shouldEmitPrologueDirective) {
                    if (needsToSetSourceFile) {
                        needsToSetSourceFile = false;
                        setSourceFile(sourceFile);
                    }
                    writeLine();
                    emit(statement);
                    if (seenPrologueDirectives) {
                        seenPrologueDirectives.add(statement.expression.text);
                    }
                }
            }
            else {
                // return index of the first non prologue directive
                return i;
            }
        }

        return statements.length;
    }

    function emitDetachedCommentsAndUpdateCommentsInfo(range: TextRange) {
        const currentDetachedCommentInfo = currentSourceFile && emitDetachedComments(currentSourceFile.text, getCurrentLineMap(), writer, emitComment, range, newLine, commentsDisabled);
        if (currentDetachedCommentInfo) {
            if (detachedCommentsInfo) {
                detachedCommentsInfo.push(currentDetachedCommentInfo);
            }
            else {
                detachedCommentsInfo = [currentDetachedCommentInfo];
            }
        }
    }

    function shouldWriteComment(text: string, pos: number) {
        if (printerOptions.onlyPrintJsDocStyle) {
            return (isJSDocLikeText(text, pos) || isPinnedComment(text, pos));
        }
        return true;
    }

    function emitComment(text: string, lineMap: readonly number[], writer: EmitTextWriter, commentPos: number, commentEnd: number, newLine: string) {
        if (!currentSourceFile || !shouldWriteComment(currentSourceFile.text, commentPos)) return;
        emitPos(commentPos);
        writeCommentRange(text, lineMap, writer, commentPos, commentEnd, newLine);
        emitPos(commentEnd);
    }

    /**
     * Emits a mapping.
     *
     * If the position is synthetic (undefined or a negative value), no mapping will be
     * created.
     *
     * @param pos The position.
     */
    function emitPos(pos: number) {
        if (sourceMapsDisabled || positionIsSynthesized(pos) || isJsonSourceMapSource(sourceMapSource)) {
            return;
        }

        const { line: sourceLine, character: sourceCharacter } = getLineAndCharacterOfPosition(sourceMapSource, pos);
        sourceMapGenerator!.addMapping(
            writer.getLine(),
            writer.getColumn(),
            sourceMapSourceIndex,
            sourceLine,
            sourceCharacter,
            /*nameIndex*/ undefined,
        );
    }
    
    function emitBodyWithDetachedComments<T extends Node>(node: T, detachedRange: TextRange, emitCallback: (node: T) => void) {
        enterComment();
        const { pos, end } = detachedRange;
        const emitFlags = getEmitFlags(node);
        const skipLeadingComments = pos < 0 || (emitFlags & EmitFlags.NoLeadingComments) !== 0;
        const skipTrailingComments = commentsDisabled || end < 0 || (emitFlags & EmitFlags.NoTrailingComments) !== 0;
        if (!skipLeadingComments) {
            emitDetachedCommentsAndUpdateCommentsInfo(detachedRange);
        }

        exitComment();
        if (emitFlags & EmitFlags.NoNestedComments && !commentsDisabled) {
            commentsDisabled = true;
            emitCallback(node);
            commentsDisabled = false;
        }
        else {
            emitCallback(node);
        }

        enterComment();
        if (!skipTrailingComments) {
            emitLeadingComments(detachedRange.end, /*isEmittedNode*/ true);
            if (hasWrittenComment && !writer.isAtStartOfLine()) {
                writer.writeLine();
            }
        }
        exitComment();
    }

    function emitLeadingComments(pos: number, isEmittedNode: boolean) {
        hasWrittenComment = false;

        if (isEmittedNode) {
            // if (pos === 0 && currentSourceFile?.isDeclarationFile) {
            //     forEachLeadingCommentToEmit(pos, emitNonTripleSlashLeadingComment);
            // }
            // else {
                forEachLeadingCommentToEmit(pos, emitLeadingComment);
            // }
        }
        else if (pos === 0) {
            // If the node will not be emitted in JS, remove all the comments(normal, pinned and ///) associated with the node,
            // unless it is a triple slash comment at the top of the file.
            // For Example:
            //      /// <reference-path ...>
            //      declare var x;
            //      /// <reference-path ...>
            //      interface F {}
            //  The first /// will NOT be removed while the second one will be removed even though both node will not be emitted
            // forEachLeadingCommentToEmit(pos, emitTripleSlashLeadingComment);
            console.debug("todo - emitLeadingComments");
        }
    }

    function emitLeadingComment(commentPos: number, commentEnd: number, kind: SyntaxKind, hasTrailingNewLine: boolean, rangePos: number) {
        if (!currentSourceFile || !shouldWriteComment(currentSourceFile.text, commentPos)) return;
        if (!hasWrittenComment) {
            emitNewLineBeforeLeadingCommentOfPosition(getCurrentLineMap(), writer, rangePos, commentPos);
            hasWrittenComment = true;
        }

        // Leading comments are emitted at /*leading comment1 */space/*leading comment*/space
        emitPos(commentPos);
        writeCommentRange(currentSourceFile.text, getCurrentLineMap(), writer, commentPos, commentEnd, newLine);
        emitPos(commentEnd);

        if (hasTrailingNewLine) {
            writer.writeLine();
        }
        else if (kind === SyntaxKind.MultiLineCommentTrivia) {
            writer.writeSpace(" ");
        }
    }

    function forEachLeadingCommentWithoutDetachedComments(cb: (commentPos: number, commentEnd: number, kind: SyntaxKind, hasTrailingNewLine: boolean, rangePos: number) => void) {
        if (!currentSourceFile) return;
        // get the leading comments from detachedPos
        const pos = lpc.last(detachedCommentsInfo!).detachedCommentEndPos;
        if (detachedCommentsInfo!.length - 1) {
            detachedCommentsInfo!.pop();
        }
        else {
            detachedCommentsInfo = undefined;
        }

        lpc.forEachLeadingCommentRange(currentSourceFile.text, pos, cb, /*state*/ pos);
    }

    function forEachLeadingCommentToEmit(pos: number, cb: (commentPos: number, commentEnd: number, kind: SyntaxKind, hasTrailingNewLine: boolean, rangePos: number) => void) {
        // Emit the leading comments only if the container's pos doesn't match because the container should take care of emitting these comments
        if (currentSourceFile && (containerPos === -1 || pos !== containerPos)) {
            if (hasDetachedComments(pos)) {
                forEachLeadingCommentWithoutDetachedComments(cb);
            }
            else {
                lpc.forEachLeadingCommentRange(currentSourceFile.text, pos, cb, /*state*/ pos);
            }
        }
    }

    function hasDetachedComments(pos: number) {
        return detachedCommentsInfo !== undefined && lpc.last(detachedCommentsInfo).nodePos === pos;
    }
    
    function shouldEmitBlockFunctionBodyOnSingleLine(body: Block) {
        // We must emit a function body as a single-line body in the following case:
        // * The body has NodeEmitFlags.SingleLine specified.

        // We must emit a function body as a multi-line body in the following cases:
        // * The body is explicitly marked as multi-line.
        // * A non-synthesized body's start and end position are on different lines.
        // * Any statement in the body starts on a new line.

        if (getEmitFlags(body) & EmitFlags.SingleLine) {
            return true;
        }

        if (body.multiLine) {
            return false;
        }

        if (!nodeIsSynthesized(body) && currentSourceFile && !rangeIsOnSingleLine(body, currentSourceFile)) {
            return false;
        }

        if (
            getLeadingLineTerminatorCount(body, firstOrUndefined(body.statements), ListFormat.PreserveLines)
            || getClosingLineTerminatorCount(body, lastOrUndefined(body.statements), ListFormat.PreserveLines, body.statements)
        ) {
            return false;
        }

        let previousStatement: Statement | undefined;
        for (const statement of body.statements) {
            if (getSeparatingLineTerminatorCount(previousStatement, statement, ListFormat.PreserveLines) > 0) {
                return false;
            }

            previousStatement = statement;
        }

        return true;
    }

    function emitVariableDeclaration(node: VariableDeclaration) {        
        emit(node.name);        
        emitInitializer(node.initializer, node.type?.end ?? node.name.emitNode?.typeNode?.end ?? node.name.end, node, parenthesizer.parenthesizeExpressionForDisallowedComma);
    }

    function emitCallSignature(node: CallSignatureDeclaration) {
        emitSignatureAndBody(node, emitSignatureHead, emitEmptyFunctionBody);
    }

    function commentWillEmitNewLine(node: CommentRange) {
        return node.kind === SyntaxKind.SingleLineCommentTrivia || !!node.hasTrailingNewLine;
    }
    
    function willEmitLeadingNewLine(node: Expression): boolean {
        if (!currentSourceFile) return false;
        const leadingCommentRanges = getLeadingCommentRanges(currentSourceFile.text, node.pos);
        if (leadingCommentRanges) {
            const parseNode = getParseTreeNode(node);
            if (parseNode && isParenthesizedExpression(parseNode.parent)) {
                return true;
            }
        }
        if (some(leadingCommentRanges, commentWillEmitNewLine)) return true;
        if (some(getSyntheticLeadingComments(node), commentWillEmitNewLine)) return true;
        if (isPartiallyEmittedExpression(node)) {
            if (node.pos !== node.expression.pos) {
                if (some(getTrailingCommentRanges(currentSourceFile.text, node.expression.pos), commentWillEmitNewLine)) return true;
            }
            return willEmitLeadingNewLine(node.expression);
        }
        return false;
    }
    
    /**
     * Wraps an expression in parens if we would emit a leading comment that would introduce a line separator
     * between the node and its parent.
     */
    function parenthesizeExpressionForNoAsi(node: Expression) {
        if (!commentsDisabled && isPartiallyEmittedExpression(node) && willEmitLeadingNewLine(node)) {
            const parseNode = getParseTreeNode(node);
            if (parseNode && isParenthesizedExpression(parseNode)) {
                // If the original node was a parenthesized expression, restore it to preserve comment and source map emit
                const parens = factory.createParenthesizedExpression(node.expression);
                setOriginalNode(parens, node);
                setTextRange(parens, parseNode);
                return parens;
            }
            return factory.createParenthesizedExpression(node);
        }
        return node;
    }

    function emitExpressionWithLeadingSpace(node: Expression | undefined, parenthesizerRule?: (node: Expression) => Expression) {
        if (node) {
            writeSpace();
            emitExpression(node, parenthesizerRule);
        }
    }

    function writeLineSeparatorsAndIndentBefore(node: Node, parent: Node): boolean {
        const leadingNewlines = preserveSourceNewlines && getLeadingLineTerminatorCount(parent, node, ListFormat.None);
        if (leadingNewlines) {
            writeLinesAndIndent(leadingNewlines, /*writeSpaceIfNotIndenting*/ false);
        }
        return !!leadingNewlines;
    }

    function writeLineSeparatorsAfter(node: Node, parent: Node) {
        const trailingNewlines = preserveSourceNewlines && getClosingLineTerminatorCount(parent, node, ListFormat.None, /*childrenTextRange*/ undefined);
        if (trailingNewlines) {
            writeLine(trailingNewlines);
        }
    }

    function emitPrefixUnaryExpression(node: PrefixUnaryExpression) {
        writeTokenText(node.operator, writeOperator);
        if (shouldEmitWhitespaceBeforeOperand(node)) {
            writeSpace();
        }
        emitExpression(node.operand, parenthesizer.parenthesizeOperandOfPrefixUnary);
    }

    function shouldEmitWhitespaceBeforeOperand(node: PrefixUnaryExpression) {
        // In some cases, we need to emit a space between the operator and the operand. One obvious case
        // is when the operator is an identifier, like delete or typeof. We also need to do this for plus
        // and minus expressions in certain cases. Specifically, consider the following two cases (parens
        // are just for clarity of exposition, and not part of the source code):
        //
        //  (+(+1))
        //  (+(++1))
        //
        // We need to emit a space in both cases. In the first case, the absence of a space will make
        // the resulting expression a prefix increment operation. And in the second, it will make the resulting
        // expression a prefix increment whose operand is a plus expression - (++(+x))
        // The same is true of minus of course.
        const operand = node.operand;
        return operand.kind === SyntaxKind.PrefixUnaryExpression
            && ((node.operator === SyntaxKind.PlusToken && ((operand as PrefixUnaryExpression).operator === SyntaxKind.PlusToken || (operand as PrefixUnaryExpression).operator === SyntaxKind.PlusPlusToken))
                || (node.operator === SyntaxKind.MinusToken && ((operand as PrefixUnaryExpression).operator === SyntaxKind.MinusToken || (operand as PrefixUnaryExpression).operator === SyntaxKind.MinusMinusToken)));
    }

    function emitRangeElement(node: Expression) {
        if (lpc.isPrefixUnaryExpression(node) && node.operator === SyntaxKind.LessThanToken) {
            // special case that we want to emit as a string
            writePunctuation("'<");
            emitExpression(node.operand);
            writePunctuation("'");
        } else {
            emitExpression(node);   
        }
    }

    function emitRangeExpression(node: RangeExpression) {
        writePunctuation("{ start: ");
        emitRangeElement(node.left);
        writePunctuation(", end: ");        
        emitRangeElement(node.right);                
        writePunctuation("}");
    }

    function emitParenthesizedExpression(node: ParenthesizedExpression) {
        const openParenPos = emitTokenWithComment(SyntaxKind.OpenParenToken, node.pos, writePunctuation, node);
        const indented = writeLineSeparatorsAndIndentBefore(node.expression, node);
        emitExpression(node.expression, /*parenthesizerRule*/ undefined);
        writeLineSeparatorsAfter(node.expression, node);
        decreaseIndentIf(indented);
        emitTokenWithComment(SyntaxKind.CloseParenToken, node.expression ? node.expression.end : openParenPos, writePunctuation, node);
    }

    function emitElementAccessExpression(node: ElementAccessExpression) {
        writeKeyword("__lpcIndexAccessHelper");
        writePunctuation("(");
        emitExpression(node.expression, parenthesizer.parenthesizeLeftSideOfAccess);
        writePunctuation(",");        
        // emit(node.questionDotToken);
        // emitTokenWithComment(SyntaxKind.OpenBracketToken, node.expression.end, writePunctuation, node);
        emitExpression(node.argumentExpression);
        writePunctuation(")");

        // emitTokenWithComment(SyntaxKind.CloseBracketToken, node.argumentExpression.end, writePunctuation, node);
    }
    
    /** Emit a binary expression as a call expression to a helper function */
    function emitBinaryExpressionHelper(node: BinaryExpression) {                
        let operator = node.operatorToken.kind;

        // rewrite assignment operators to use __lpcBinaryHelper
        if (isAssignmentOperator(operator)) {
            emitExpression(node.left);
            writeOperator(tokenToString(SyntaxKind.EqualsToken)!);
            
            switch (operator) {
                case SyntaxKind.PlusEqualsToken:
                    operator = SyntaxKind.PlusToken;
                    break;
                case SyntaxKind.MinusEqualsToken:
                    operator = SyntaxKind.MinusToken;
                    break;
                case SyntaxKind.AsteriskEqualsToken:
                    operator = SyntaxKind.AsteriskToken;
                    break;
                case SyntaxKind.SlashEqualsToken:
                    operator = SyntaxKind.SlashToken;
                    break;
                case SyntaxKind.EqualsToken:
                    operator = SyntaxKind.EqualsToken;
                    break;
                default:
                    Debug.fail("Unknown compound assignment operator " + Debug.formatSyntaxKind(operator));
            }
        }

        writeKeyword("__lpcBinaryHelper");
        writePunctuation("(");
        emitExpression(node.left);
        writePunctuation(",");
        emitExpression(node.right);
        writePunctuation(",");
        writePunctuation("\"");
        writeOperator(tokenToString(operator)!);        
        writePunctuation("\"");
        writePunctuation(")");
    }

    function emitCallExpression(node: CallExpression) {
        const indirectCall = getInternalEmitFlags(node) & InternalEmitFlags.IndirectCall;
        if (indirectCall) {
            writePunctuation("(");
            writeLiteral("0");
            writePunctuation(",");
            writeSpace();
        }
        emitExpression(node.expression, parenthesizer.parenthesizeLeftSideOfAccess);
        if (indirectCall) {
            writePunctuation(")");
        }
        // emit(node.questionDotToken);
        // emitTypeArguments(node, node.typeArguments);
        emitExpressionList(node, node.arguments, ListFormat.CallExpressionArguments, parenthesizer.parenthesizeExpressionForDisallowedComma);
    }

    function emitReturnStatement(node: ReturnStatement) {
        emitTokenWithComment(SyntaxKind.ReturnKeyword, node.pos, writeKeyword, /*contextNode*/ node);
        emitExpressionWithLeadingSpace(node.expression && parenthesizeExpressionForNoAsi(node.expression), parenthesizeExpressionForNoAsi);
        writeTrailingSemicolon();
    }

    function emitEmbeddedStatement(parent: Node, node: Statement) {
        if (
            isBlock(node) ||
            getEmitFlags(parent) & EmitFlags.SingleLine ||
            preserveSourceNewlines && !getLeadingLineTerminatorCount(parent, node, ListFormat.None)
        ) {
            writeSpace();
            emit(node);
        }
        else {
            writeLine();
            increaseIndent();
            if (isEmptyStatement(node)) {
                pipelineEmit(EmitHint.EmbeddedStatement, node);
            }
            else {
                emit(node);
            }
            decreaseIndent();
        }
    }

    function emitIndexedAccessType(node: IndexedAccessTypeNode) {
        emit(node.objectType, parenthesizer.parenthesizeNonArrayTypeOfPostfixType);
        writePunctuation("[");
        emit(node.indexType);
        writePunctuation("]");
    }
    
    function emitIfStatement(node: IfStatement) {
        const openParenPos = emitTokenWithComment(SyntaxKind.IfKeyword, node.pos, writeKeyword, node);
        writeSpace();
        emitTokenWithComment(SyntaxKind.OpenParenToken, openParenPos, writePunctuation, node);
        emitExpression(node.expression);
        emitTokenWithComment(SyntaxKind.CloseParenToken, node.expression.end, writePunctuation, node);
        emitEmbeddedStatement(node, node.thenStatement);
        if (node.elseStatement) {
            writeLineOrSpace(node, node.thenStatement, node.elseStatement);
            emitTokenWithComment(SyntaxKind.ElseKeyword, node.thenStatement.end, writeKeyword, node);
            if (node.elseStatement.kind === SyntaxKind.IfStatement) {
                writeSpace();
                emit(node.elseStatement);
            }
            else {
                emitEmbeddedStatement(node, node.elseStatement);
            }
        }
    }

    function emitSwitchStatement(node: SwitchStatement) {
        const openParenPos = emitTokenWithComment(SyntaxKind.SwitchKeyword, node.pos, writeKeyword, node);
        writeSpace();
        emitTokenWithComment(SyntaxKind.OpenParenToken, openParenPos, writePunctuation, node);
        emitExpression(node.expression);
        emitTokenWithComment(SyntaxKind.CloseParenToken, node.expression.end, writePunctuation, node);
        writeSpace();
        emit(node.caseBlock);
    }

    function emitWithLeadingSpace(node: Node | undefined) {
        if (node) {
            writeSpace();
            emit(node);
        }
    }

    function emitCaseBlock(node: CaseBlock) {
        emitTokenWithComment(SyntaxKind.OpenBraceToken, node.pos, writePunctuation, node);
        emitList(node, node.clauses, ListFormat.CaseBlockClauses);
        emitTokenWithComment(SyntaxKind.CloseBraceToken, node.clauses.end, writePunctuation, node, /*indentLeading*/ true);
    }

    function emitContinueStatement(node: ContinueStatement) {
        emitTokenWithComment(SyntaxKind.ContinueKeyword, node.pos, writeKeyword, node);
        emitWithLeadingSpace(node.label);
        writeTrailingSemicolon();
    }

    function emitBreakStatement(node: BreakStatement) {
        emitTokenWithComment(SyntaxKind.BreakKeyword, node.pos, writeKeyword, node);
        emitWithLeadingSpace(node.label);
        writeTrailingSemicolon();
    }

    function emitExpressionStatement(node: ExpressionStatement) {
        emitExpression(node.expression, parenthesizer.parenthesizeExpressionOfExpressionStatement);
        // Emit semicolon in non json files
        // or if json file that created synthesized expression(eg.define expression statement when --out and amd code generation)
        if (!currentSourceFile || !isJsonSourceFile(currentSourceFile) || nodeIsSynthesized(node.expression)) {
            writeTrailingSemicolon();
        }
    }
    
    function emitSignatureHead(node: SignatureDeclaration) {
        // emitTypeParameters(node, node.typeParameters);
        // return type was moved and handled separately in symboldisplay.ts
        // emitTypeAnnotation(node.type);
        emitParameters(node, node.parameters);
    }

    
    function emitCaseClause(node: CaseClause) {
        emitTokenWithComment(SyntaxKind.CaseKeyword, node.pos, writeKeyword, node);
        writeSpace();
        emitExpression(node.expression, parenthesizer.parenthesizeExpressionForDisallowedComma);

        emitCaseOrDefaultClauseRest(node, node.statements, node.expression.end);
    }

    function emitDefaultClause(node: DefaultClause) {
        const pos = emitTokenWithComment(SyntaxKind.DefaultKeyword, node.pos, writeKeyword, node);
        emitCaseOrDefaultClauseRest(node, node.statements, pos);
    }

    function emitCaseOrDefaultClauseRest(parentNode: Node, statements: NodeArray<Statement>, colonPos: number) {
        const emitAsSingleStatement = statements.length === 1 &&
            (
                // treat synthesized nodes as located on the same line for emit purposes
                !currentSourceFile ||
                nodeIsSynthesized(parentNode) ||
                nodeIsSynthesized(statements[0]) ||
                rangeStartPositionsAreOnSameLine(parentNode, statements[0], currentSourceFile)
            );

        let format = ListFormat.CaseOrDefaultClauseStatements;
        if (emitAsSingleStatement) {
            writeToken(SyntaxKind.ColonToken, colonPos, writePunctuation, parentNode);
            writeSpace();
            format &= ~(ListFormat.MultiLine | ListFormat.Indented);
        }
        else {
            emitTokenWithComment(SyntaxKind.ColonToken, colonPos, writePunctuation, parentNode);
        }
        emitList(parentNode, statements, format);
    }


    function emitEmptyFunctionBody(_node: SignatureDeclaration) {
        writeTrailingSemicolon();
    }

    function emitVariableDeclarationList(node: VariableDeclarationList) {
        writeKeyword("let");
        writeSpace();
        emitList(node, node.declarations, ListFormat.VariableDeclarationList);
    }

    function emitTypeAnnotation(node: TypeNode | undefined) {
        if (node) {            
            emit(node);
            writeSpace();
        }
    }

    function emitInitializer(node: Expression | undefined, equalCommentStartPos: number, container: Node, parenthesizerRule?: (node: Expression) => Expression) {
        if (node) {
            writeSpace();
            emitTokenWithComment(SyntaxKind.EqualsToken, equalCommentStartPos, writeOperator, container);
            writeSpace();
            emitExpression(node, parenthesizerRule);
        }
    }

    function emitTokenWithComment(token: SyntaxKind, pos: number, writer: (s: string) => void, contextNode: Node, indentLeading?: boolean) {
        const node = getParseTreeNode(contextNode);
        const isSimilarNode = node && node.kind === contextNode.kind;
        const startPos = pos;
        if (isSimilarNode && currentSourceFile) {
            pos = skipTrivia(currentSourceFile.text, pos);
        }
        if (isSimilarNode && contextNode.pos !== startPos) {
            const needsIndent = indentLeading && currentSourceFile && !positionsAreOnSameLine(startPos, pos, currentSourceFile);
            if (needsIndent) {
                increaseIndent();
            }
            emitLeadingCommentsOfPosition(startPos);
            if (needsIndent) {
                decreaseIndent();
            }
        }

        // We don't emit source positions for most tokens as it tends to be quite noisy, however
        // we need to emit source positions for open and close braces so that tools like istanbul
        // can map branches for code coverage. However, we still omit brace source positions when
        // the output is a declaration file.
        if (!omitBraceSourcePositions && (token === SyntaxKind.OpenBraceToken || token === SyntaxKind.CloseBraceToken)) {
            pos = writeToken(token, pos, writer, contextNode);
        }
        else {
            pos = writeTokenText(token, writer, pos);
        }

        if (isSimilarNode && contextNode.end !== pos) {
            emitTrailingCommentsOfPosition(pos, /*prefixSpace*/ false, /*forceNoNewline*/ false);
        }
        return pos;
    }
}