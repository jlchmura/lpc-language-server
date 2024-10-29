import * as lpc from "./_namespaces/lpc.js";
import { Symbol, Bundle, createTextWriter, Debug, EmitFlags, EmitHint, EmitTextWriter, Expression, factory, getEmitFlags, getInternalEmitFlags, getLineStarts, getNewLineCharacter, getShebang, Identifier, InternalEmitFlags, isExpression, isIdentifier, isSourceFile, isStringLiteral, ListFormat, memoize, ModuleKind, Node, NodeArray, noEmitNotification, noEmitSubstitution, performance, Printer, PrinterOptions, PrintHandlers, rangeIsOnSingleLine, SourceFile, SourceMapGenerator, SourceMapSource, SyntaxKind, TextRange, TypeNode, tokenToString, ParenthesizedExpression, nodeIsSynthesized, getStartsOnNewLine, getLinesBetweenRangeEndAndRangeStart, rangeEndIsOnSameLineAsRangeStart, guessIndentation, cast, getIdentifierTypeArguments, LiteralExpression, isMemberName, getSourceFileOfNode, idText, getOriginalNode, isLiteralExpression, getSourceTextOfNodeFromSourceFile, TypeLiteralNode, forEach, NamedDeclaration, DeclarationName, isGeneratedIdentifier, isBindingPattern, GeneratedIdentifier, GeneratedIdentifierFlags, getNodeId, GeneratedNamePart, FunctionDeclaration, isFileLevelUniqueName, BindingPattern, Block, CaseBlock, CaseOrDefaultClause, CatchStatement, ForStatement, IfStatement, isPrivateIdentifier, SwitchStatement, VariableDeclarationList, VariableStatement, WhileStatement, ForEachStatement, DoWhileStatement, formatGeneratedNamePart, formatGeneratedName, lastOrUndefined, getNodeForGeneratedName, isKeyword, isTokenKind, getNormalizedAbsolutePath, GetCanonicalFileName, CompilerOptions, getDirectoryPath, directorySeparator, computeCommonSourceDirectoryOfFilenames, CharacterCodes, ArrayTypeNode, every, ModifierLike, isModifier, Modifier, positionIsSynthesized, VariableDeclaration, getParseTreeNode, skipTrivia, positionsAreOnSameLine, FunctionTypeNode, SignatureDeclaration, ArrowFunction, ParameterDeclaration, singleOrUndefined, isArrowFunction, some, getCommentRange, rangeStartPositionsAreOnSameLine, getContainingNodeArray, rangeEndPositionsAreOnSameLine, getLinesBetweenPositionAndNextNonWhitespaceCharacter, CallSignatureDeclaration, getTrailingSemicolonDeferringWriter, ReturnStatement, isPartiallyEmittedExpression, isParenthesizedExpression, getLeadingCommentRanges, CommentRange, getSyntheticLeadingComments, getTrailingCommentRanges, setOriginalNode, setTextRange } from "./_namespaces/lpc.js";

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
    //var emitBinaryExpression = createEmitBinaryExpression();
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
            console.warn("todo - implment me - setSourceMapSource");
            //setSourceMapSource(sourceFile);
        }
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
                case SyntaxKind.VariableDeclaration:
                    return emitVariableDeclaration(node as VariableDeclaration);
                case SyntaxKind.VariableDeclarationList:
                    return emitVariableDeclarationList(node as VariableDeclarationList);
                case SyntaxKind.CallSignature:
                    return emitCallSignature(node as CallSignatureDeclaration);
                case SyntaxKind.ReturnStatement:
                    return emitReturnStatement(node as ReturnStatement);                
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
    
    function emitVariableStatement(node: VariableStatement) {
        emitDecoratorsAndModifiers(node, node.modifiers, /*allowDecorators*/ false);
        emit(node.declarationList);
        writeTrailingSemicolon();
    }


    function emitArrayType(node: ArrayTypeNode) {
        emit(node.elementType, parenthesizer.parenthesizeNonArrayTypeOfPostfixType);
        writePunctuation("({");
        writePunctuation("})");
    }

    //
    // Declarations
    //

    function emitVariableDeclaration(node: VariableDeclaration) {
        emitTypeAnnotation(node.type);
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

    function emitReturnStatement(node: ReturnStatement) {
        emitTokenWithComment(SyntaxKind.ReturnKeyword, node.pos, writeKeyword, /*contextNode*/ node);
        emitExpressionWithLeadingSpace(node.expression && parenthesizeExpressionForNoAsi(node.expression), parenthesizeExpressionForNoAsi);
        writeTrailingSemicolon();
    }

    function emitSignatureHead(node: SignatureDeclaration) {
        // emitTypeParameters(node, node.typeParameters);
        // return type was moved and handled separately in symboldisplay.ts
        // emitTypeAnnotation(node.type);
        emitParameters(node, node.parameters);
    }

    function emitEmptyFunctionBody(_node: SignatureDeclaration) {
        writeTrailingSemicolon();
    }

    function emitVariableDeclarationList(node: VariableDeclarationList) {                    
        writeKeyword("");        
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


function createBracketsMap() {
    const brackets: string[][] = [];
    brackets[ListFormat.Braces] = ["{", "}"];
    brackets[ListFormat.Parenthesis] = ["(", ")"];
    brackets[ListFormat.AngleBrackets] = ["<", ">"];
    brackets[ListFormat.SquareBrackets] = ["[", "]"];
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
