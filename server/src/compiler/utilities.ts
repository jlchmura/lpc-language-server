import * as vm from "node:vm";
import { Signature, Type, Debug, DiagnosticArguments, DiagnosticMessage, DiagnosticRelatedInformation, DiagnosticWithDetachedLocation, DiagnosticWithLocation, Identifier, MapLike, ModifierFlags, Node, NodeFlags, ReadonlyTextRange, some, SourceFile, Symbol, SymbolFlags, SyntaxKind, TextRange, Token, TransformFlags, TypeChecker, TypeFlags, tracing, SignatureFlags, canHaveModifiers, Modifier, skipTrivia, SymbolTable, CallExpression, Declaration, getCombinedNodeFlags, BinaryExpression, AssignmentDeclarationKind, isCallExpression, isBinaryExpression, isIdentifier, Diagnostic, emptyArray, PropertyNameLiteral, DeclarationName, LiteralLikeNode, AssignmentExpression, LogicalOrCoalescingAssignmentOperator, LogicalOperator, Expression, OuterExpressionKinds, OuterExpression, WrappedExpression, PrefixUnaryExpression, PostfixUnaryExpression, ForEachStatement, ShorthandPropertyAssignment, PropertyAssignment, PropertyAccessExpression, ParenthesizedExpression, BinaryOperatorToken, AssertionLevel, SortedArray, binarySearch, identity, Comparison, DiagnosticMessageChain, compareStringsCaseSensitive, compareValues, insertSorted, flatMapToMutable, DiagnosticCollection, isJSDocTemplateTag, HasJSDoc, lastOrUndefined, JSDoc, isJSDoc, find, ParameterDeclaration, FunctionDeclaration, InlineClosureExpression, FunctionExpression, forEachChild, returnUndefined, returnFalse, CompilerOptions, FunctionLikeDeclaration, canHaveLocals, isFunctionLike, isParameter, PropertyDeclaration, BindingElement, isString, InternalSymbolName, isSourceFile, StructDeclaration, isStructDeclaration, JSDocTemplateTag, TypeNodeSyntaxKind, isTypeNode, isFunctionLikeDeclaration, SignatureDeclaration, AccessExpression, isInlineClosureExpression, PropertyAccessEntityNameExpression, isPropertyAccessExpression, EntityNameExpression, isVariableDeclaration, VariableDeclarationInitializedTo, CanonicalDiagnostic, HasInitializer, ExpressionStatement, ForStatement, isShorthandPropertyAssignment, JSDocTag, EqualsToken, AssignmentOperatorToken, isLeftHandSideExpression, isFunctionLikeKind, AdditiveOperator, AdditiveOperatorOrHigher, AssignmentOperatorOrHigher, BinaryOperator, BitwiseOperator, BitwiseOperatorOrHigher, EqualityOperator, EqualityOperatorOrHigher, ExponentiationOperator, LogicalOperatorOrHigher, MultiplicativeOperator, MultiplicativeOperatorOrHigher, RelationalOperator, RelationalOperatorOrHigher, ShiftOperator, ShiftOperatorOrHigher, HasFlowNode, ObjectFlags, ObjectFlagsType, isDeclaration, isBindingPattern, isJSDocSignature, JSDocSignature, TypeNode, findAncestor, Extension, fileExtensionIs, NamedDeclaration, KeywordSyntaxKind, SourceFileLike, firstOrUndefined, getNodeChildren, JSDocContainer, PropertyName, idText, forEach, PrinterOptions, NewLineKind, flatMap, getNormalizedPathComponents, removeTrailingDirectorySeparator, directorySeparator, normalizePath, FileWatcher, PackageId, ScriptKind, TextSpan, CheckFlags, TransientSymbol, getCombinedModifierFlags, isElementAccessExpression, createTextSpan, CaseOrDefaultClause, createTextSpanFromBounds, ReturnStatement, createScanner, isQualifiedName, EntityNameOrEntityNameExpression, isCallOrNewExpression, CallLikeExpression, EmitTextWriter, computeLineStarts, last, isWhiteSpaceLike, ScriptTarget, isIdentifierStart, isFunctionDeclaration, HasType, Block, Statement, NodeArray, ClassElement, TypeElement, ObjectLiteralElement, ObjectTypeDeclaration, ObjectLiteralExpression, noop, NewExpression, CommaListExpression, ConditionalExpression, ElementAccessExpression, PartiallyEmittedExpression, InternalEmitFlags, EmitFlags, getLineStarts, getLinesBetweenPositions, HasExpressionInitializer, isStringLiteral, isIntLiteral, StringLiteral, IntLiteral, VariableLikeDeclaration, isBindingElement, BindingElementOfBareOrAccessedRequire, QualifiedName, TypeParameterDeclaration, JSDocTypedefTag, EqualityComparer, equateValues, TypeReferenceNode, isTypeReferenceNode, LateVisibilityPaintedStatement, IndexInfo, PrintHandlers, StringLiteralType, IntLiteralType, flatten, LanguageVariant, combinePaths, map, isRootedDiskPath, getStringComparer, containsPath, every, indexOfAnyCharCode, hasExtension, getDirectoryPath, createGetCanonicalFileName, sort, fileExtensionIsOneOf, findIndex, ReadonlyCollection, equalOwnProperties, FileExtensionInfo, mapDefined, EmitHost, filter, getNormalizedAbsolutePath, getCommonSourceDirectory, comparePaths, GetCanonicalFileName, SourceFileMayBeEmittedHost, forEachChildRecursively, CommandLineOption, InheritDeclaration, emptyMap, LiteralLikeElementAccessExpression, VariableDeclaration, VariableDeclarationList, isComputedPropertyName, isJSDocParameterTag, BindableStaticNameExpression, getNameOfDeclaration, isVariableStatement, isExpressionStatement, getLeadingCommentRanges, SuperContainer, SuperContainerOrFunctions, CharacterCodes, StringLiteralLike, AnyValidImportOrReExport, tryCast, CloneObjectExpression, TriviaSyntaxKind, concatenate, getTrailingCommentRanges, computeLineOfPosition, AnyImportSyntax, PrologueDirective, startsWith, stringToToken, PunctuationOrKeywordSyntaxKind, PunctuationSyntaxKind, ClassLikeDeclaration, JSDocCallbackTag, TypeAliasDeclaration, isJSDocTypeAlias, isTypeAliasDeclaration, EvaluationResolver, EvaluatorResult, FloatLiteral, isPropertyName, isPrefixUnaryExpression, tokenToString, isJSDocPropertyLikeTag, getJSDocType, ContainerFlags, MethodDeclaration, getContainerFlags, TypePredicate, IdentifierTypePredicate, TypePredicateKind, first, isClassLike, IncludeDirective, hasInitializer, addRange, getJSDocParameterTagsNoCache, getJSDocParameterTags, getJSDocTypeParameterTags, getJSDocTypeParameterTagsNoCache, JSDocArray, isJSDocOverloadTag, isJSDocTypeTag, isJSDocSatisfiesTag, isParenthesizedExpression, HasInferredType, assertType, PropertySignature, JSDocTypeAssertion, getJSDocTypeTag, PrimitiveLiteral, isNumericLiteral, isFunctionExpression, isArrowFunction, ArrowFunction, isJSDocTag, isJSDocTypeLiteral, isTypeElement, TypeLiteralNode, UnionOrIntersectionTypeNode, ArrayLiteralExpression, ObjectLiteralExpressionBase, CaseBlock, isClassElement, MethodSignature, CallSignatureDeclaration, IndexSignatureDeclaration, ComputedPropertyName, getSnippetElement, SnippetKind, VariableStatement, singleElementArray, ExpressionWithTypeArguments, getJSDocImplementsTags, isPropertySignature, isParenthesizedTypeNode, DynamicNamedDeclaration, DynamicNamedBinaryExpression, CommentRange, isWhiteSpaceSingleLine, LineAndCharacter, computeLineAndCharacterOfPosition, TokenFlags, emitNodeAsJsText, createVmHelperContext, HasLocals, ProjectReference, LpcConfigSourceFile, isObjectLiteralExpression, isPropertyAssignment, JSDocParameterTag, getJSDocReturnType, isArray, factory, ThisObjectPragmas, isArrayLiteralExpression, moduleResolutionOptionDeclarations, ResolvedModuleWithFailedLookupLocations, optionsAffectingProgramStructure, ConciseBody, isArrayTypeNode, getSymbolId, ClassDeclaration, DeclarationWithTypeParameters, getJSDocTags, SuperCall, JSDocOverloadTag, getAllJSDocTags, JSDocSatisfiesExpression, getJSDocSatisfiesTag, ParenthesizedTypeNode, isJSDocReturnTag, isSuperAccessExpression, JSDocVariableTag, SourceFileBase, getDefaultLibFolder, getUILocale, getDefaultLibFileName, sys, isJSDocTypeExpression, CommentDirective, CommentDirectivesMap, getLineAndCharacterOfPosition, arrayFrom, CommentDirectiveType, isJSDocLinkLike, isJSDocNameReference, isJSDocMemberName, isIdentifierText, JSDocMemberName, isNewExpression, isStructTypeNode } from "./_namespaces/lpc.js";

/** @internal */
export const resolvingEmptyArray: never[] = [];

/** @internal */
export const defaultMaximumTruncationLength = 160;
/** @internal */
export const noTruncationMaximumTruncationLength = 1_000_000;

/** @internal */
export interface ObjectAllocator {
    getNodeConstructor(): new (kind: SyntaxKind, pos: number, end: number) => Node;
    getTokenConstructor(): new <TKind extends SyntaxKind>(kind: TKind, pos: number, end: number) => Token<TKind>;
    getIdentifierConstructor(): new (kind: SyntaxKind.Identifier, pos: number, end: number) => Identifier;    
    getSourceFileConstructor(): new (kind: SyntaxKind.SourceFile, pos: number, end: number) => SourceFile;
    getSymbolConstructor(): new (flags: SymbolFlags, name: string) => Symbol;
    getTypeConstructor(): new (checker: TypeChecker, flags: TypeFlags) => Type;
    getSignatureConstructor(): new (checker: TypeChecker, flags: SignatureFlags) => Signature;    
}


/** @internal */
export const objectAllocator: ObjectAllocator = {
    getNodeConstructor: () => Node as any,
    getTokenConstructor: () => Token as any,
    getIdentifierConstructor: () => Identifier as any,    
    getSourceFileConstructor: () => Node as any,
    getSymbolConstructor: () => Symbol as any,
    getTypeConstructor: () => Type as any,
    getSignatureConstructor: () => Signature as any,    
};
const objectAllocatorPatchers: ((objectAllocator: ObjectAllocator) => void)[] = [];

function Signature(this: Signature, checker: TypeChecker, flags: SignatureFlags) {
    // Note: if modifying this, be sure to update SignatureObject in src/services/services.ts
    this.flags = flags;
    if (Debug.isDebugging) {
        this.checker = checker;
    }
}

function Type(this: Type, checker: TypeChecker, flags: TypeFlags) {
    // Note: if modifying this, be sure to update TypeObject in src/services/services.ts
    this.flags = flags;
    if (Debug.isDebugging || tracing) {
        this.checker = checker;
    }
}

function Symbol(this: Symbol, flags: SymbolFlags, name: string) {
    // Note: if modifying this, be sure to update SymbolObject in src/services/services.ts
    this.flags = flags;
    this.name = name;
    this.declarations = undefined;
    this.valueDeclaration = undefined;
    this.id = 0;
    this.mergeId = 0;
    this.parent = undefined;
    this.members = undefined;
    this.exports = undefined;    
    this.exportSymbol = undefined;
    this.constEnumOnlyModule = undefined;
    this.isReferenced = undefined;
    this.lastAssignmentPos = undefined;
    (this as any).links = undefined; // used by TransientSymbol
}

function Node(this: Mutable<Node>, kind: SyntaxKind, pos: number, end: number) {
    // Note: if modifying this, be sure to update NodeObject in src/services/services.ts
    this.pos = pos;
    this.end = end;
    this.kind = kind;
    this.id = 0;
    this.flags = NodeFlags.None;
    this.modifierFlagsCache = ModifierFlags.None;
    this.transformFlags = TransformFlags.None;    
    this.parent = undefined!;
    this.original = undefined;
    this.emitNode = undefined;    
}

function Token(this: Mutable<Node>, kind: SyntaxKind, pos: number, end: number) {
    // Note: if modifying this, be sure to update TokenOrIdentifierObject in src/services/services.ts
    this.pos = pos;
    this.end = end;    
    this.kind = kind;
    this.id = 0;
    this.flags = NodeFlags.None;
    this.transformFlags = TransformFlags.None;
    this.parent = undefined!;
    this.emitNode = undefined;
}

function Identifier(this: Mutable<Node>, kind: SyntaxKind, pos: number, end: number) {
    // Note: if modifying this, be sure to update TokenOrIdentifierObject in src/services/services.ts
    this.pos = pos;
    this.end = end;
    this.kind = kind;
    this.id = 0;
    this.flags = NodeFlags.None;
    this.transformFlags = TransformFlags.None;
    this.parent = undefined!;
    this.original = undefined;
    this.emitNode = undefined;
}

/** @internal */
export type Mutable<T extends object> = { -readonly [K in keyof T]: T[K]; };

/**
 * Bypasses immutability and directly sets the `end` property of a `TextRange` or `Node`.
 *
 * @internal
 */
export function setTextRangeEnd<T extends ReadonlyTextRange>(range: T, end: number) {
    (range as TextRange).end = end;
    return range;
}

/**
 * Bypasses immutability and directly sets the `pos` and `end` properties of a `TextRange` or `Node`.
 *
 * @internal
 */
export function setTextRangePosEnd<T extends ReadonlyTextRange>(range: T, pos: number, end: number) {
    return setTextRangeEnd(setTextRangePos(range, pos), end);
}

/**
 * Bypasses immutability and directly sets the `pos` property of a `TextRange` or `Node`.
 *
 * @internal
 */
export function setTextRangePos<T extends ReadonlyTextRange>(range: T, pos: number) {
    (range as TextRange).pos = pos;
    return range;
}


/**
 * Bypasses immutability and directly sets the `pos` and `end` properties of a `TextRange` or `Node` from the
 * provided position and width.
 *
 * @internal
 */
export function setTextRangePosWidth<T extends ReadonlyTextRange>(range: T, pos: number, width: number) {
    return setTextRangePosEnd(range, pos, pos + width);
}

function assertDiagnosticLocation(sourceText: string, start: number, length: number) {
    Debug.assertGreaterThanOrEqual(start, 0);
    Debug.assertGreaterThanOrEqual(length, 0);
    Debug.assertLessThanOrEqual(start, sourceText.length);
    Debug.assertLessThanOrEqual(start + length, sourceText.length);
}

let localizedDiagnosticMessages: MapLike<string> | undefined;

/** @internal */
export function getLocaleSpecificMessage(message: DiagnosticMessage) {
    return localizedDiagnosticMessages && localizedDiagnosticMessages[message.key] || message.message;
}

/** @internal */
export function formatStringFromArgs(text: string, args: DiagnosticArguments): string {
    return text.replace(/{(\d+)}/g, (_match, index: string) => "" + Debug.checkDefined(args[+index]));
}

/** @internal */
export function createDetachedDiagnostic(fileName: string, diagSourceText: string, start: number, errLength: number, message: DiagnosticMessage, ...args: DiagnosticArguments): DiagnosticWithDetachedLocation {
    Debug.assertIsDefined(diagSourceText);

    if ((start + errLength) > diagSourceText.length) {
        errLength = diagSourceText.length - start;
    }

    assertDiagnosticLocation(diagSourceText, start, errLength);
    let text = getLocaleSpecificMessage(message);

    if (some(args)) {
        text = formatStringFromArgs(text, args);
    }

    return {
        file: undefined,
        start,
        length: errLength,

        messageText: text,
        category: message.category,
        code: message.code,
        reportsUnnecessary: message.reportsUnnecessary,
        fileName,
    };
}

/** @internal */
export function attachFileToDiagnostics(diagnostics: DiagnosticWithDetachedLocation[], file: SourceFile): DiagnosticWithLocation[] {
    const diagnosticsWithLocation: DiagnosticWithLocation[] = [];
    for (const diagnostic of diagnostics) {
        // filter out diagnostics from includes
        if (diagnostic.fileName === file.fileName) {            
            diagnosticsWithLocation.push(attachFileToDiagnostic(diagnostic, file));
        }
    }
    return diagnosticsWithLocation;
}

function attachFileToDiagnostic(diagnostic: DiagnosticWithDetachedLocation, file: SourceFile): DiagnosticWithLocation {
    const fileName = file.fileName || "";
    const length = file.text.length;
    Debug.assertEqual(diagnostic.fileName, fileName);
    Debug.assertLessThanOrEqual(diagnostic.start, length);
    Debug.assertLessThanOrEqual(diagnostic.start + diagnostic.length, length);
    const diagnosticWithLocation: DiagnosticWithLocation = {
        file,
        start: diagnostic.start,
        length: diagnostic.length,
        messageText: diagnostic.messageText,
        category: diagnostic.category,
        code: diagnostic.code,
        reportsUnnecessary: diagnostic.reportsUnnecessary,
    };
    if (diagnostic.relatedInformation) {
        diagnosticWithLocation.relatedInformation = [];
        for (const related of diagnostic.relatedInformation) {
            if (isDiagnosticWithDetachedLocation(related) && related.fileName === fileName) {
                Debug.assertLessThanOrEqual(related.start, length);
                Debug.assertLessThanOrEqual(related.start + related.length, length);
                diagnosticWithLocation.relatedInformation.push(attachFileToDiagnostic(related, file));
            }
            else {
                diagnosticWithLocation.relatedInformation.push(related);
            }
        }
    }
    return diagnosticWithLocation;
}

function isDiagnosticWithDetachedLocation(diagnostic: DiagnosticRelatedInformation | DiagnosticWithDetachedLocation): diagnostic is DiagnosticWithDetachedLocation {
    return diagnostic.file === undefined
        && diagnostic.start !== undefined
        && diagnostic.length !== undefined
        && typeof (diagnostic as DiagnosticWithDetachedLocation).fileName === "string";
}


/**
 * Gets the effective ModifierFlags for the provided node, including JSDoc modifiers. The modifier flags cache on the node is ignored.
 *
 * NOTE: This function may use `parent` pointers.
 *
 * @internal
 */
export function getEffectiveModifierFlagsNoCache(node: Node): ModifierFlags {
    return getSyntacticModifierFlagsNoCache(node) | getJSDocModifierFlagsNoCache(node);
}

function getJSDocModifierFlagsNoCache(node: Node): ModifierFlags {
    return 0; // TODO return selectEffectiveModifierFlags(getRawJSDocModifierFlagsNoCache(node));
}

/**
 * Gets the ModifierFlags for syntactic modifiers on the provided node. The modifier flags cache on the node is ignored.
 *
 * NOTE: This function does not use `parent` pointers and will not include modifiers from JSDoc.
 *
 * @internal
 * @knipignore
 */
export function getSyntacticModifierFlagsNoCache(node: Node): ModifierFlags {
    let flags = canHaveModifiers(node) ? modifiersToFlags(node.modifiers) : ModifierFlags.None;
    // if (node.flags & NodeFlags.NestedNamespace || node.kind === SyntaxKind.Identifier && node.flags & NodeFlags.IdentifierIsInJSDocNamespace) {
    //     flags |= ModifierFlags.Export;
    // }
    return flags;
}

/** @internal */
export function modifiersToFlags(modifiers: readonly Modifier[] | undefined) {
    let flags = ModifierFlags.None;
    if (modifiers) {
        for (const modifier of modifiers) {
            flags |= modifierToFlag(modifier.kind);
        }
    }
    return flags;
}

/** @internal */
export function modifierToFlag(token: SyntaxKind): ModifierFlags {
    switch (token) {
        case SyntaxKind.StaticKeyword:
            return ModifierFlags.Static;
        case SyntaxKind.PublicKeyword:
            return ModifierFlags.Public;
        case SyntaxKind.ProtectedKeyword:
            return ModifierFlags.Protected;
        case SyntaxKind.PrivateKeyword:
            return ModifierFlags.Private;        
        case SyntaxKind.NoMaskKeyword:
            return ModifierFlags.NoMask;
        case SyntaxKind.NoShadowKeyword:
            return ModifierFlags.NoShadow;
        case SyntaxKind.NoSaveKeyword:
            return ModifierFlags.NoSave;
        case SyntaxKind.VisibleKeyword:
            return ModifierFlags.Visible;
        case SyntaxKind.VarArgsKeyword:
            return ModifierFlags.VarArgs;
        // case SyntaxKind.AsyncKeyword:
        //     return ModifierFlags.Async;        
        // case SyntaxKind.InKeyword:
        //     return ModifierFlags.In;        
    }
    return ModifierFlags.None;
}

/** @internal */
export function positionIsSynthesized(pos: number): boolean {
    // This is a fast way of testing the following conditions:
    //  pos === undefined || pos === null || isNaN(pos) || pos < 0;
    return !(pos >= 0);
}

/** @internal */
export function nodeIsSynthesized(range: TextRange): boolean {
    return positionIsSynthesized(range.pos)
        || positionIsSynthesized(range.end);
}

/** @internal */
export function getSourceFileOfNode(node: Node): SourceFile;
/** @internal */
export function getSourceFileOfNode(node: Node | undefined): SourceFile | undefined;
/** @internal */
export function getSourceFileOfNode(node: Node | undefined): SourceFile | undefined {
    while (node && node.kind !== SyntaxKind.SourceFile) {
        node = node.parent;
    }    
    return node as SourceFile;
}

/** @internal */
export function getSourceFileOrIncludeOfNode(node: Node, topLevelInclude?: boolean): SourceFileBase;
/** @internal */
export function getSourceFileOrIncludeOfNode(node: Node | undefined, topLevelInclude?: boolean): SourceFileBase | undefined;
/** @internal */
export function getSourceFileOrIncludeOfNode(node: Node | undefined, topLevelInclude = false): SourceFileBase | undefined {
    const origNode = node;
    // find the sourcefile or the top-level include directive
    while (node && node.kind !== SyntaxKind.SourceFile) {
        // IncludeDirective must have text - otherwise bump up to the sourcefile
        if (node.kind === SyntaxKind.IncludeDirective && 
            (!topLevelInclude || (node.parent && node.parent.kind === SyntaxKind.SourceFile)) && 
            (node as IncludeDirective).text && node != origNode) {
            break;
        }
        node = node.parent;
    }    
    return node as unknown as SourceFileBase;
}

/** @internal */
export function getSourceTextOfNodeFromSourceFile(sourceFile: SourceFileBase, node: Node, includeTrivia = false): string {
    return getTextOfNodeFromSourceText(sourceFile.text, node, includeTrivia);
}

/** @internal */
export function getTextOfNodeFromSourceText(sourceText: string, node: Node, includeTrivia = false): string {
    if (nodeIsMissing(node)) {
        return "";
    }

    let text = sourceText.substring(includeTrivia ? node.pos : skipTrivia(sourceText, node.pos), node.end);

    if (isJSDocTypeExpressionOrChild(node)) {
        // strip space + asterisk at line start
        text = text.split(/\r\n|\n|\r/).map(line => line.replace(/^\s*\*/, "").trimStart()).join("\n");
    }

    return text;
}


/** @internal */
export function getSourceTextOfRangeFromSourceFile(sourceFile: SourceFileBase, range: TextRange, includeTrivia = false): string {
    return getTextOfRangeFromSourceText(sourceFile.text, range, includeTrivia);
}

/** @internal */
export function getTextOfRangeFromSourceText(sourceText: string, range: TextRange, includeTrivia = false): string {
    let text = sourceText.substring(includeTrivia ? range.pos : skipTrivia(sourceText, range.pos), range.end);

    return text;
}

function isJSDocTypeExpressionOrChild(node: Node): boolean {
    return !!findAncestor(node, isJSDocTypeExpression);
}


// Returns true if this node is missing from the actual source code. A 'missing' node is different
// from 'undefined/defined'. When a node is undefined (which can happen for optional nodes
// in the tree), it is definitely missing. However, a node may be defined, but still be
// missing.  This happens whenever the parser knows it needs to parse something, but can't
// get anything in the source code that it expects at that location. For example:
//
//          let a: ;
//
// Here, the Type in the Type-Annotation is not-optional (as there is a colon in the source
// code). So the parser will attempt to parse out a type, and will create an actual node.
// However, this node will be 'missing' in the sense that no actual source-code/tokens are
// contained within it.
/** @internal */
export function nodeIsMissing(node: Node | undefined): boolean {
    if (node === undefined) {
        return true;
    }

    return node.pos === node.end && node.pos >= 0 && node.kind !== SyntaxKind.EndOfFileToken;
}

/**
 * Bypasses immutability and directly sets the `parent` property of a `Node`.
 *
 * @internal
 */
export function setParent<T extends Node>(child: T, parent: T["parent"] | undefined): T;
/** @internal */
export function setParent<T extends Node>(child: T | undefined, parent: T["parent"] | undefined): T | undefined;
/** @internal */
export function setParent<T extends Node>(child: T | undefined, parent: T["parent"] | undefined): T | undefined {
    if (child && parent) {
        (child as Mutable<T>).parent = parent;
    }
    return child;
}

/** @internal */
export function createSymbolTable(symbols?: readonly Symbol[]): SymbolTable {
    const result = new Map<string, Symbol>();
    if (symbols) {
        for (const symbol of symbols) {
            result.set(symbol.name, symbol);
        }
    }
    return result;
}

/** @internal */
export function getImmediatelyInvokedFunctionExpression(func: Node): CallExpression | undefined {
    if (func.kind === SyntaxKind.FunctionExpression || func.kind === SyntaxKind.InlineClosureExpression) {
        let prev = func;
        let parent = func.parent;
        while (parent.kind === SyntaxKind.ParenthesizedExpression) {
            prev = parent;
            parent = parent.parent;
        }
        if (parent.kind === SyntaxKind.CallExpression && (parent as CallExpression).expression === prev) {
            return parent as CallExpression;
        }
    }
}

/** @internal */
export function nodeIsPresent(node: Node | undefined): boolean {
    return !nodeIsMissing(node);
}

/** @internal */
export function isBlockOrCatchScoped(declaration: Declaration) {
    return (getCombinedNodeFlags(declaration) & NodeFlags.BlockScoped) !== 0 ||
        isCatchClauseVariableDeclarationOrBindingElement(declaration);
}

/** @internal */
export function isCatchClauseVariableDeclarationOrBindingElement(declaration: Declaration) {
    const node = getRootDeclaration(declaration);
    return node.kind === SyntaxKind.VariableDeclaration && node.parent.kind === SyntaxKind.CatchStatement;
}

/** @internal */
export function getRootDeclaration(node: Node): Node {
    // while (node.kind === SyntaxKind.BindingElement) {
    //     node = node.parent.parent;
    // }
    return node;
}


/**
 * This function returns true if the this node's root declaration is a parameter.
 * For example, passing a `ParameterDeclaration` will return true, as will passing a
 * binding element that is a child of a `ParameterDeclaration`.
 *
 * If you are looking to test that a `Node` is a `ParameterDeclaration`, use `isParameter`.
 *
 * @internal
 */
export function isPartOfParameterDeclaration(node: Declaration): boolean {
    const root = getRootDeclaration(node);
    return root.kind === SyntaxKind.Parameter;
}

/** @internal */
export function hasSyntacticModifier(node: Node, flags: ModifierFlags): boolean {
    return !!getSelectedSyntacticModifierFlags(node, flags);
}

/** @internal @knipignore */
export function getSelectedSyntacticModifierFlags(node: Node, flags: ModifierFlags): ModifierFlags {
    return getSyntacticModifierFlags(node) & flags;
}


/**
 * Gets the ModifierFlags for syntactic modifiers on the provided node. The modifiers will be cached on the node to improve performance.
 *
 * NOTE: This function does not use `parent` pointers and will not include modifiers from JSDoc.
 *
 * @internal
 */
export function getSyntacticModifierFlags(node: Node): ModifierFlags {
    return getModifierFlagsWorker(node, /*includeJSDoc*/ false);
}

function getModifierFlagsWorker(node: Node, includeJSDoc: boolean, alwaysIncludeJSDoc?: boolean): ModifierFlags {
    if (node.kind >= SyntaxKind.FirstToken && node.kind <= SyntaxKind.LastToken) {
        return ModifierFlags.None;
    }

    if (!(node.modifierFlagsCache & ModifierFlags.HasComputedFlags)) {
        node.modifierFlagsCache = getSyntacticModifierFlagsNoCache(node) | ModifierFlags.HasComputedFlags;
    }

    // if (alwaysIncludeJSDoc || includeJSDoc && isInJSFile(node)) {
    //     if (!(node.modifierFlagsCache & ModifierFlags.HasComputedJSDocModifiers) && node.parent) {
    //         node.modifierFlagsCache |= getRawJSDocModifierFlagsNoCache(node) | ModifierFlags.HasComputedJSDocModifiers;
    //     }
    //     return selectEffectiveModifierFlags(node.modifierFlagsCache);
    // }

    return selectSyntacticModifierFlags(node.modifierFlagsCache);
}

function selectSyntacticModifierFlags(flags: ModifierFlags) {
    return flags & ModifierFlags.SyntacticModifiers;
}

function getAssignmentDeclarationKindWorker(expr: BinaryExpression | CallExpression): AssignmentDeclarationKind {
    return AssignmentDeclarationKind.None
    // if (isCallExpression(expr)) {
    //     if (!isBindableObjectDefinePropertyCall(expr)) {
    //         return AssignmentDeclarationKind.None;
    //     }
    //     const entityName = expr.arguments[0];
    //     // if (isExportsIdentifier(entityName) || isModuleExportsAccessExpression(entityName)) {
    //     //     return AssignmentDeclarationKind.ObjectDefinePropertyExports;
    //     // }
    //     // if (isBindableStaticAccessExpression(entityName) && getElementOrPropertyAccessName(entityName) === "prototype") {
    //     //     return AssignmentDeclarationKind.ObjectDefinePrototypeProperty;
    //     // }
    //     return AssignmentDeclarationKind.ObjectDefinePropertyValue;
    // }
    // if (expr.operatorToken.kind !== SyntaxKind.EqualsToken /*|| !isAccessExpression(expr.left) || isVoidZero(getRightMostAssignedExpression(expr))*/) {
    //     return AssignmentDeclarationKind.None;
    // }
    // // if (isBindableStaticNameExpression(expr.left.expression, /*excludeThisKeyword*/ true) && getElementOrPropertyAccessName(expr.left) === "prototype" && isObjectLiteralExpression(getInitializerOfBinaryExpression(expr))) {
    // //     // F.prototype = { ... }
    // //     return AssignmentDeclarationKind.Prototype;
    // // }
    // return getAssignmentDeclarationPropertyAccessKind(expr.left);
}



/// Given a BinaryExpression, returns SpecialPropertyAssignmentKind for the various kinds of property
/// assignments we treat as special in the binder
/** @internal */
export function getAssignmentDeclarationKind(expr: BinaryExpression | CallExpression): AssignmentDeclarationKind {
    const special = getAssignmentDeclarationKindWorker(expr);
    return special === AssignmentDeclarationKind.Property /*|| isInJSFile(expr)*/ ? special : AssignmentDeclarationKind.None;
}

/** @internal */
export function isAssignmentDeclaration(decl: Declaration) {
    return isBinaryExpression(decl) /*|| isAccessExpression(decl)*/ || isIdentifier(decl) || isCallExpression(decl);
}


/** @internal */
export function setValueDeclaration(symbol: Symbol, node: Declaration): void {
    const { valueDeclaration } = symbol;
    if (
        !valueDeclaration ||
        !(node.flags & NodeFlags.Ambient /*&& !isInJSFile(node)*/ && !(valueDeclaration.flags & NodeFlags.Ambient)) &&
            (isAssignmentDeclaration(valueDeclaration) && !isAssignmentDeclaration(node)) ||
        (valueDeclaration.kind !== node.kind /*&& isEffectiveModuleDeclaration(valueDeclaration)*/)
    ) {
        // other kinds of value declarations take precedence over modules and assignment declarations
        symbol.valueDeclaration = node;
    }
}

/** @internal */
export function addRelatedInfo<T extends Diagnostic>(diagnostic: T, ...relatedInformation: DiagnosticRelatedInformation[]): T {
    if (!relatedInformation.length || !isArray(relatedInformation)) {
        return diagnostic;
    }
    if (!diagnostic.relatedInformation) {
        diagnostic.relatedInformation = [];
    }
    Debug.assert(diagnostic.relatedInformation !== emptyArray, "Diagnostic had empty array singleton for related info, but is still being constructed!");
    diagnostic.relatedInformation.push(...relatedInformation.slice(0, 100));
    return diagnostic;
}

/** @internal */
export function isPropertyNameLiteral(node: Node): node is PropertyNameLiteral {
    switch (node.kind) {
        case SyntaxKind.Identifier:
        case SyntaxKind.StringLiteral:
        // case SyntaxKind.NoSubstitutionTemplateLiteral:
        case SyntaxKind.IntLiteral:        
            return true;
        default:
            return false;
    }
}

/** @internal */
export function getFullWidth(node: Node) {
    return node.end - node.pos;
}


// Return display name of an identifier
// Computed property names will just be emitted as "[<expr>]", where <expr> is the source
// text of the expression in the computed property.
/** @internal */
export function declarationNameToString(name: DeclarationName | QualifiedName | undefined) {
    return !name || getFullWidth(name) === 0 ? "(Missing)" : getTextOfNode(name);
}

/** @internal */
export function getTextOfNode(node: Node, includeTrivia = false): string {
    return (isIdentifier(node) || isStringLiteral(node) ? node.text : undefined) ?? getSourceTextOfNodeFromSourceFile(getSourceFileOrIncludeOfNode(node), node, includeTrivia);
}

/** @internal */
export function getErrorSpanForNode(sourceFile: SourceFileBase, node: Node): TextSpan {
    // if the node came from a macro, move up the parent chain until we find a non-macro node
    while (isInMacroContext(node) && node.parent) {
        node = node.parent;
    }
        
    let errorNode: Node | undefined = node;
    switch (node.kind) {
        case SyntaxKind.SourceFile: {
            const pos = skipTrivia(sourceFile.text, 0, /*stopAfterLineBreak*/ false);
            if (pos === sourceFile.text.length) {
                // file is empty - return span for the beginning of the file
                return createTextSpan(0, 0);
            }
            return getSpanOfTokenAtPosition(sourceFile, pos);
        }
        // This list is a work in progress. Add missing node kinds to improve their error
        // spans.
        case SyntaxKind.VariableDeclaration:
        case SyntaxKind.BindingElement:
        // case SyntaxKind.ClassDeclaration:
        case SyntaxKind.ClassExpression:
        // case SyntaxKind.InterfaceDeclaration:
        // case SyntaxKind.ModuleDeclaration:        
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
        // case SyntaxKind.MethodDeclaration:    
        case SyntaxKind.PropertyDeclaration:
        // case SyntaxKind.PropertySignature:        
            errorNode = (node as NamedDeclaration).name;
            break;
        // case SyntaxKind.InlineClosureExpression:
        //     return getErrorSpanForArrowFunction(sourceFile, node as ArrowFunction);
        case SyntaxKind.CaseClause:
        case SyntaxKind.DefaultClause: {
            const start = skipTrivia(sourceFile.text, (node as CaseOrDefaultClause).pos);
            const end = Math.max(node.end, (node as CaseOrDefaultClause).statements.length > 0 ? (node as CaseOrDefaultClause).statements[0].pos : (node as CaseOrDefaultClause).end);
            return createTextSpanFromBounds(start, end);
        }
        case SyntaxKind.ReturnStatement: {
            const pos = skipTrivia(sourceFile.text, (node as ReturnStatement/* | YieldExpression*/).pos);
            return getSpanOfTokenAtPosition(sourceFile, pos);
        }        
    }

    if (errorNode === undefined) {
        // If we don't have a better node, then just set the error on the first token of
        // construct.
        return getSpanOfTokenAtPosition(sourceFile, node.pos);
    }

    //Debug.assert(!isJSDoc(errorNode));

    const isMissing = nodeIsMissing(errorNode);
    Debug.assertIsDefined(sourceFile);
    const pos = isMissing// || isJsxText(node)
        ? errorNode.pos
        : skipTrivia(sourceFile.text, errorNode.pos);    


    // These asserts should all be satisfied for a properly constructed `errorNode`.
    if (isMissing) {
        Debug.assert(pos === errorNode.pos, "This failure could trigger https://github.com/Microsoft/TypeScript/issues/20809");
        Debug.assert(pos === errorNode.end, "This failure could trigger https://github.com/Microsoft/TypeScript/issues/20809");
    }
    else {
        Debug.assert(pos >= errorNode.pos, "This failure could trigger https://github.com/Microsoft/TypeScript/issues/20809");
        Debug.assert(pos <= errorNode.end, "This failure could trigger https://github.com/Microsoft/TypeScript/issues/20809");
    }

    return createTextSpanFromBounds(pos, errorNode.end);
}

/** @internal */
export function getSpanOfTokenAtPosition(sourceFile: SourceFileBase, pos: number): TextSpan {
    const scanner = createScanner(sourceFile.languageVersion, /*skipTrivia*/ true, /*shouldSkipNonParsableDirectives*/ false, sourceFile.languageVariant, sourceFile.text, /*onError*/ undefined, pos);
    scanner.scan();
    const start = scanner.getTokenStart();
    return createTextSpanFromBounds(start, scanner.getTokenEnd());
}

/** @internal */
export function createDiagnosticForNodeInSourceFile(sourceFile: SourceFileBase, node: Node, message: DiagnosticMessage, ...args: DiagnosticArguments): DiagnosticWithLocation {    
    const span = getErrorSpanForNode(sourceFile, node);
    const d = createFileDiagnostic(sourceFile, span.start, span.length, message, ...args);    
    return d;
}

/** @internal */
export function createFileDiagnostic(file: SourceFileBase, start: number, length: number, message: DiagnosticMessage, ...args: DiagnosticArguments): DiagnosticWithLocation {
    if (start > file.text.length) start = 0;
    assertDiagnosticLocation(file.text, start, length);

    let text = getLocaleSpecificMessage(message);

    if (some(args)) {
        text = formatStringFromArgs(text, args);
    }

    return {
        file,
        start,
        length,

        messageText: text,
        category: message.category,
        code: message.code,
        reportsUnnecessary: message.reportsUnnecessary,
        reportsDeprecated: message.reportsDeprecated,
    };
}

export function isLiteralLike(node: Node): node is LiteralLikeNode {
    switch (node.kind) {
        case SyntaxKind.StringLiteral:
        case SyntaxKind.IntLiteral:
        case SyntaxKind.FloatLiteral:
            return true;
        default:
            return false;
    }
}

export function isFalsyLiteral(node: Node): boolean {
    return isLiteralLike(node) && node.text === "0";
}

export function isTruthyLiteral(node: Node): boolean {
    return isLiteralLike(node) && node.text.length > 0 && node.text != "0";
}

/** @internal */
export function isLogicalOrCoalescingAssignmentExpression(expr: Node): expr is AssignmentExpression<Token<LogicalOrCoalescingAssignmentOperator>> {
    return isBinaryExpression(expr) && isLogicalOrCoalescingAssignmentOperator(expr.operatorToken.kind);
}

/** @internal */
export function isLogicalOrCoalescingAssignmentOperator(token: SyntaxKind): token is LogicalOrCoalescingAssignmentOperator {
    return token === SyntaxKind.BarBarEqualsToken
        || token === SyntaxKind.AmpersandAmpersandEqualsToken
        || token === SyntaxKind.QuestionQuestionEqualsToken;
}

export function isBinaryLogicalOperator(token: SyntaxKind): boolean {
    return token === SyntaxKind.BarBarToken || token === SyntaxKind.AmpersandAmpersandToken || token === SyntaxKind.QuestionQuestionToken;
}

/** @internal */
export function isLogicalOrCoalescingBinaryOperator(token: SyntaxKind): token is LogicalOperator {
    return isBinaryLogicalOperator(token);
}

/** @internal */
export function isLogicalOrCoalescingBinaryExpression(expr: Node): expr is BinaryExpression {
    return isBinaryExpression(expr) && isLogicalOrCoalescingBinaryOperator(expr.operatorToken.kind);
}

/** @internal */
export function isAssignmentOperator(token: SyntaxKind): boolean {
    return token >= SyntaxKind.FirstAssignment && token <= SyntaxKind.LastAssignment;
}

/** @internal */
export function isOuterExpression(node: Node, kinds = OuterExpressionKinds.All): node is OuterExpression {
    switch (node.kind) {
        case SyntaxKind.ParenthesizedExpression:
            // if (kinds & OuterExpressionKinds.ExcludeJSDocTypeAssertion && isJSDocTypeAssertion(node)) {
            //     return false;
            // }
            return (kinds & OuterExpressionKinds.Parentheses) !== 0;
        // case SyntaxKind.TypeAssertionExpression:
        // case SyntaxKind.AsExpression:
        // case SyntaxKind.ExpressionWithTypeArguments:
        // case SyntaxKind.SatisfiesExpression:
        //    return (kinds & OuterExpressionKinds.TypeAssertions) !== 0;
        // case SyntaxKind.NonNullExpression:
        //     return (kinds & OuterExpressionKinds.NonNullAssertions) !== 0;
        case SyntaxKind.PartiallyEmittedExpression:
            return (kinds & OuterExpressionKinds.PartiallyEmittedExpressions) !== 0;
    }
    return false;
}

/** @internal */
export function skipOuterExpressions<T extends Expression>(node: WrappedExpression<T>): T;
/** @internal */
export function skipOuterExpressions(node: Expression, kinds?: OuterExpressionKinds): Expression;
/** @internal */
export function skipOuterExpressions(node: Node, kinds?: OuterExpressionKinds): Node;
/** @internal */
export function skipOuterExpressions(node: Node, kinds = OuterExpressionKinds.All) {
    while (isOuterExpression(node, kinds)) {
        node = node.expression;
    }
    return node;
}

export function skipParentParenthesis(node: Node): Node {
    while (node.parent && node.kind === SyntaxKind.ParenthesizedExpression) {
        node = node.parent;
    }
    return node;
}

// A node is an assignment target if it is on the left hand side of an '=' token, if it is parented by a property
// assignment in an object literal that is an assignment target, or if it is parented by an array literal that is
// an assignment target. Examples include 'a = xxx', '{ p: a } = xxx', '[{ a }] = xxx'.
// (Note that `p` is not a target in the above examples, only `a`.)
/** @internal */
export function isAssignmentTarget(node: Node): boolean {
    return !!getAssignmentTarget(node);
}

type AssignmentTarget =
    | BinaryExpression
    | PrefixUnaryExpression
    | PostfixUnaryExpression
    | ForEachStatement;

function getAssignmentTarget(node: Node): AssignmentTarget | undefined {
    let parent = node.parent;
    while (true) {
        switch (parent.kind) {
            case SyntaxKind.BinaryExpression:
                const binaryExpression = parent as BinaryExpression;
                const binaryOperator = binaryExpression.operatorToken.kind;
                return isAssignmentOperator(binaryOperator) && binaryExpression.left === node ? binaryExpression : undefined;
            case SyntaxKind.PrefixUnaryExpression:
            case SyntaxKind.PostfixUnaryExpression:
                const unaryExpression = parent as PrefixUnaryExpression | PostfixUnaryExpression;
                const unaryOperator = unaryExpression.operator;
                return unaryOperator === SyntaxKind.PlusPlusToken || unaryOperator === SyntaxKind.MinusMinusToken ? unaryExpression : undefined;
            case SyntaxKind.ForEachStatement:            
                const forInOrOfStatement = parent as ForEachStatement;
                return forInOrOfStatement.initializer === node ? forInOrOfStatement : undefined;
            case SyntaxKind.ParenthesizedExpression:
            case SyntaxKind.ArrayLiteralExpression:
            case SyntaxKind.SpreadElement:
            //case SyntaxKind.NonNullExpression:
                node = parent;
                break;
            // case SyntaxKind.SpreadAssignment:
            //     node = parent.parent;
            //     break;
            case SyntaxKind.ShorthandPropertyAssignment:
                if ((parent as ShorthandPropertyAssignment).name !== node) {
                    return undefined;
                }
                node = parent.parent;
                break;
            case SyntaxKind.PropertyAssignment:
                if ((parent as PropertyAssignment).name === node) {
                    return undefined;
                }
                node = parent.parent;
                break;
            default:
                return undefined;
        }
        parent = node.parent;
    }
}

/** @internal */
export function isDottedName(node: Expression): boolean {
    return node.kind === SyntaxKind.Identifier        
        || node.kind === SyntaxKind.SuperKeyword    
        || node.kind === SyntaxKind.PropertyAccessExpression && isDottedName((node as PropertyAccessExpression).expression)
        || node.kind === SyntaxKind.ParenthesizedExpression && isDottedName((node as ParenthesizedExpression).expression);
}


/** @internal */
export function skipParentheses(node: Expression, excludeJSDocTypeAssertions?: boolean): Expression;
/** @internal */
export function skipParentheses(node: Node, excludeJSDocTypeAssertions?: boolean): Node;
/** @internal */
export function skipParentheses(node: Node, excludeJSDocTypeAssertions?: boolean): Node {
    const flags = excludeJSDocTypeAssertions ?
        OuterExpressionKinds.Parentheses | OuterExpressionKinds.ExcludeJSDocTypeAssertion :
        OuterExpressionKinds.Parentheses;
    return skipOuterExpressions(node, flags);
}

/** @internal */
export function createDiagnosticCollection(): DiagnosticCollection {
    let nonFileDiagnostics = [] as Diagnostic[] as SortedArray<Diagnostic>; // See GH#19873
    const filesWithDiagnostics = [] as string[] as SortedArray<string>;
    const fileDiagnostics = new Map<string, SortedArray<DiagnosticWithLocation>>();
    let hasReadNonFileDiagnostics = false;

    return {
        add,
        lookup,
        getGlobalDiagnostics,
        getDiagnostics,
    };

    function lookup(diagnostic: Diagnostic): Diagnostic | undefined {
        let diagnostics: SortedArray<Diagnostic> | undefined;
        if (diagnostic.file) {
            diagnostics = fileDiagnostics.get(diagnostic.file.fileName);
        }
        else {
            diagnostics = nonFileDiagnostics;
        }
        if (!diagnostics) {
            return undefined;
        }
        const result = binarySearch(diagnostics, diagnostic, identity, compareDiagnosticsSkipRelatedInformation);
        if (result >= 0) {
            return diagnostics[result];
        }
        if (~result > 0 && diagnosticsEqualityComparer(diagnostic, diagnostics[~result - 1])) {
            return diagnostics[~result - 1];
        }
        return undefined;
    }
   
    function add(diagnostic: Diagnostic): void {
        let diagnostics: SortedArray<Diagnostic> | undefined;
        if (diagnostic.file) {
            diagnostics = fileDiagnostics.get(diagnostic.file.fileName);
            if (!diagnostics) {
                diagnostics = [] as Diagnostic[] as SortedArray<DiagnosticWithLocation>; // See GH#19873
                fileDiagnostics.set(diagnostic.file.fileName, diagnostics as SortedArray<DiagnosticWithLocation>);
                insertSorted(filesWithDiagnostics, diagnostic.file.fileName, compareStringsCaseSensitive);
            }
        }
        else {
            // If we've already read the non-file diagnostics, do not modify the existing array.
            if (hasReadNonFileDiagnostics) {
                hasReadNonFileDiagnostics = false;
                nonFileDiagnostics = nonFileDiagnostics.slice() as SortedArray<Diagnostic>;
            }

            diagnostics = nonFileDiagnostics;
        }

        insertSorted(diagnostics, diagnostic, compareDiagnosticsSkipRelatedInformation, diagnosticsEqualityComparer);
    }

    function getGlobalDiagnostics(): Diagnostic[] {
        hasReadNonFileDiagnostics = true;
        return nonFileDiagnostics;
    }

    function getDiagnostics(fileName: string): DiagnosticWithLocation[];
    function getDiagnostics(): Diagnostic[];
    function getDiagnostics(fileName?: string): Diagnostic[] {
        if (fileName) {
            return fileDiagnostics.get(fileName) || [];
        }

        const fileDiags: Diagnostic[] = flatMapToMutable(filesWithDiagnostics, f => fileDiagnostics.get(f));
        if (!nonFileDiagnostics.length) {
            return fileDiags;
        }
        fileDiags.unshift(...nonFileDiagnostics);
        return fileDiags;
    }
}

function getDiagnosticCode(d: Diagnostic): number {
    return d.canonicalHead?.code || d.code;
}

function getDiagnosticMessage(d: Diagnostic): string | DiagnosticMessageChain {
    return d.canonicalHead?.messageText || d.messageText;
}

function getDiagnosticFilePath(diagnostic: Diagnostic): string | undefined {
    return diagnostic.file ? diagnostic.file.path : undefined;
}

// An diagnostic message with more elaboration should be considered *less than* a diagnostic message
// with less elaboration that is otherwise similar.
function compareMessageText(
    d1: Diagnostic,
    d2: Diagnostic,
): Comparison {
    let headMsg1 = getDiagnosticMessage(d1);
    let headMsg2 = getDiagnosticMessage(d2);
    if (typeof headMsg1 !== "string") {
        headMsg1 = headMsg1.messageText;
    }
    if (typeof headMsg2 !== "string") {
        headMsg2 = headMsg2.messageText;
    }
    const chain1 = typeof d1.messageText !== "string" ? d1.messageText.next : undefined;
    const chain2 = typeof d2.messageText !== "string" ? d2.messageText.next : undefined;

    let res = compareStringsCaseSensitive(headMsg1, headMsg2);
    if (res) {
        return res;
    }

    res = compareMessageChain(chain1, chain2);
    if (res) {
        return res;
    }

    if (d1.canonicalHead && !d2.canonicalHead) {
        return Comparison.LessThan;
    }
    if (d2.canonicalHead && !d1.canonicalHead) {
        return Comparison.GreaterThan;
    }

    return Comparison.EqualTo;
}

function compareDiagnosticsSkipRelatedInformation(d1: Diagnostic, d2: Diagnostic): Comparison {
    const code1 = getDiagnosticCode(d1);
    const code2 = getDiagnosticCode(d2);
    return compareStringsCaseSensitive(getDiagnosticFilePath(d1), getDiagnosticFilePath(d2)) ||
        compareValues(d1.start, d2.start) ||
        compareValues(d1.length, d2.length) ||
        compareValues(code1, code2) ||
        compareMessageText(d1, d2) ||
        Comparison.EqualTo;
}

// First compare by size of the message chain,
// then compare by content of the message chain.
function compareMessageChain(
    c1: DiagnosticMessageChain[] | undefined,
    c2: DiagnosticMessageChain[] | undefined,
): Comparison {
    if (c1 === undefined && c2 === undefined) {
        return Comparison.EqualTo;
    }
    if (c1 === undefined) {
        return Comparison.GreaterThan;
    }
    if (c2 === undefined) {
        return Comparison.LessThan;
    }

    return compareMessageChainSize(c1, c2) || compareMessageChainContent(c1, c2);
}


function compareMessageChainSize(
    c1: DiagnosticMessageChain[] | undefined,
    c2: DiagnosticMessageChain[] | undefined,
): Comparison {
    if (c1 === undefined && c2 === undefined) {
        return Comparison.EqualTo;
    }
    if (c1 === undefined) {
        return Comparison.GreaterThan;
    }
    if (c2 === undefined) {
        return Comparison.LessThan;
    }

    let res = compareValues(c2.length, c1.length);
    if (res) {
        return res;
    }

    for (let i = 0; i < c2.length; i++) {
        res = compareMessageChainSize(c1[i].next, c2[i].next);
        if (res) {
            return res;
        }
    }

    return Comparison.EqualTo;
}

// Assumes the two chains have the same shape.
function compareMessageChainContent(
    c1: DiagnosticMessageChain[],
    c2: DiagnosticMessageChain[],
): Comparison {
    let res;
    for (let i = 0; i < c2.length; i++) {
        res = compareStringsCaseSensitive(c1[i].messageText, c2[i].messageText);
        if (res) {
            return res;
        }
        if (c1[i].next === undefined) {
            continue;
        }
        res = compareMessageChainContent(c1[i].next!, c2[i].next!);
        if (res) {
            return res;
        }
    }
    return Comparison.EqualTo;
}

 /** @internal */
 export function diagnosticsEqualityComparer(d1: Diagnostic, d2: Diagnostic): boolean {
    const code1 = getDiagnosticCode(d1);
    const code2 = getDiagnosticCode(d2);
    const msg1 = getDiagnosticMessage(d1);
    const msg2 = getDiagnosticMessage(d2);
    return compareStringsCaseSensitive(getDiagnosticFilePath(d1), getDiagnosticFilePath(d2)) === Comparison.EqualTo &&
        compareValues(d1.start, d2.start) === Comparison.EqualTo &&
        compareValues(d1.length, d2.length) === Comparison.EqualTo &&
        compareValues(code1, code2) === Comparison.EqualTo &&
        messageTextEqualityComparer(msg1, msg2);
}

function messageTextEqualityComparer(m1: string | DiagnosticMessageChain, m2: string | DiagnosticMessageChain): boolean {
    const t1 = typeof m1 === "string" ? m1 : m1.messageText;
    const t2 = typeof m2 === "string" ? m2 : m2.messageText;
    return compareStringsCaseSensitive(t1, t2) === Comparison.EqualTo;
}

/** @internal */
export function createNameResolver({
    compilerOptions,
    requireSymbol,
    argumentsSymbol,
    error,
    getSymbolOfDeclaration,
    globals,
    lookup,
    setRequiresScopeChangeCache = returnUndefined,
    getRequiresScopeChangeCache = returnUndefined,
    onPropertyWithInvalidInitializer = returnFalse,
    onFailedToResolveSymbol = returnUndefined,
    onSuccessfullyResolvedSymbol = returnUndefined,
}: {
    compilerOptions: CompilerOptions;
    getSymbolOfDeclaration: (node: Declaration) => Symbol;
    error: (location: Node | undefined, message: DiagnosticMessage, ...args: DiagnosticArguments) => void;
    globals: SymbolTable;
    argumentsSymbol: Symbol;
    requireSymbol: Symbol;
    lookup: (symbols: SymbolTable, name: string, meaning: SymbolFlags) => Symbol | undefined;
    setRequiresScopeChangeCache: undefined | ((node: FunctionLikeDeclaration, value: boolean) => void);
    getRequiresScopeChangeCache: undefined | ((node: FunctionLikeDeclaration) => boolean | undefined);
    onPropertyWithInvalidInitializer?: (location: Node | undefined, name: string, declaration: PropertyDeclaration, result: Symbol | undefined) => boolean;
    onFailedToResolveSymbol?: (
        location: Node | undefined,
        name: string | Identifier,
        meaning: SymbolFlags,
        nameNotFoundMessage: DiagnosticMessage,
    ) => Symbol | undefined;
    onSuccessfullyResolvedSymbol?: (
        location: Node | undefined,
        result: Symbol,
        meaning: SymbolFlags,
        lastLocation: Node | undefined,
        associatedDeclarationForContainingInitializerOrBindingName: ParameterDeclaration | BindingElement | undefined,
        withinDeferredContext: boolean,
    ) => void;
}) {
    /* eslint-disable no-var */
    var emptySymbols = createSymbolTable();
    return resolveNameHelper;
    function resolveNameHelper(
        location: Node | undefined,
        nameArg: string | Identifier,
        meaning: SymbolFlags,
        nameNotFoundMessage: DiagnosticMessage | undefined,
        isUse: boolean,
        excludeGlobals?: boolean,
    ): Symbol | undefined {
        const originalLocation = location; // needed for did-you-mean error reporting, which gathers candidates starting from the original location
        let result: Symbol | undefined;
        let lastLocation: Node | undefined;
        let lastSelfReferenceLocation: Declaration | undefined;
        let propertyWithInvalidInitializer: PropertyDeclaration | undefined;
        let associatedDeclarationForContainingInitializerOrBindingName: ParameterDeclaration | BindingElement | undefined;
        let withinDeferredContext = false;
        let grandparent: Node;
        const name = isString(nameArg) ? nameArg : (nameArg as Identifier)?.text;

        const prefixNode = !isString(nameArg) && isSuperAccessExpression(nameArg.parent) ? nameArg.parent.namespace : undefined;
        const prefix = prefixNode ? getTextOfNode(prefixNode) ?? "*" : undefined;
        
        if (prefix === InternalSymbolName.EfunSuperPrefix) {
            // if the prefix is efun, we can bypass all of this
            const efunNamespace = globals.get(InternalSymbolName.EfunNamespace);
            if (efunNamespace && (result = lookup(efunNamespace.members, name, meaning))) {
                return result;
            }
        }
        
        // if this has a super accessor prefix, or is a define lookup, jump right to the sourcefile        
        if (prefix || meaning & SymbolFlags.Define) location = getSourceFileOfNode(location);

        loop:
        while (location) {
            // TODO HANDLE INCLUDE/INHERITS HERE?
            // if (isModuleOrEnumDeclaration(location) && lastLocation && location.name === lastLocation) {
            //     // If lastLocation is the name of a namespace or enum, skip the parent since it will have is own locals that could
            //     // conflict.
            //     lastLocation = location;
            //     location = location.parent;
            // }
            if (!prefix && canHaveLocals(location) && location.locals) {
                if (result = lookup(location.locals, name, meaning)) {
                    let useResult = true;
                    if (isFunctionLike(location) && lastLocation && lastLocation !== (location as FunctionLikeDeclaration).body) {
                        // symbol lookup restrictions for function-like declarations
                        // - Type parameters of a function are in scope in the entire function declaration, including the parameter
                        //   list and return type. However, local types are only in scope in the function body.
                        // - parameters are only in the scope of function body
                        // This restriction does not apply to JSDoc comment types because they are parented
                        // at a higher level than type parameters would normally be
                        if (meaning & result.flags & SymbolFlags.Type && lastLocation.kind !== SyntaxKind.JSDoc) {
                            useResult = result.flags & SymbolFlags.TypeParameter
                                // type parameters are visible in parameter list, return type and type parameter list
                                ? !!(lastLocation.flags & NodeFlags.Synthesized) || // Synthetic fake scopes are added for signatures so type parameters are accessible from them
                                    lastLocation === (location as FunctionLikeDeclaration).type ||
                                    lastLocation.kind === SyntaxKind.Parameter ||
                                    lastLocation.kind === SyntaxKind.JSDocParameterTag ||
                                    lastLocation.kind === SyntaxKind.JSDocReturnTag ||
                                    lastLocation.kind === SyntaxKind.TypeParameter
                                // local types not visible outside the function body
                                : false;
                        }
                        if (meaning & result.flags & SymbolFlags.Variable) {
                            // expression inside parameter will lookup as normal variable scope when targeting es2015+
                            if (useOuterVariableScopeInParameter(result, location, lastLocation)) {
                                useResult = false;
                            }
                            else if (result.flags & SymbolFlags.FunctionScopedVariable) {
                                // parameters are visible only inside function body, parameter list and return type
                                // technically for parameter list case here we might mix parameters and variables declared in function,
                                // however it is detected separately when checking initializers of parameters
                                // to make sure that they reference no variables declared after them.
                                useResult = lastLocation.kind === SyntaxKind.Parameter ||
                                    !!(lastLocation.flags & NodeFlags.Synthesized) || // Synthetic fake scopes are added for signatures so parameters are accessible from them
                                    (
                                        lastLocation === (location as FunctionLikeDeclaration).type &&
                                        !!findAncestor(result.valueDeclaration, isParameter)
                                    );
                            }
                        }
                    }
                    
                    if (useResult) {
                        break loop;
                    }
                    else {
                        result = undefined;
                    }
                }
            }
            withinDeferredContext = withinDeferredContext || getIsDeferredContext(location, lastLocation);
            switch (location.kind) {
                case SyntaxKind.SourceFile:                                        
                    // first check file members                    
                    const sourceFileSymbol = getSymbolOfDeclaration(location as SourceFile);
                    if (!prefix) {
                        if (result = lookup(sourceFileSymbol.members, name, meaning)) {
                            break loop;
                        }    
                        if (result = lookup(sourceFileSymbol.exports, name, meaning)) {
                            break loop;
                        }
                    }
                                         
                    // now check inherited symbols                    
                    const importTypes = sourceFileSymbol.inherits;                                        
                    const importStack = Array.from(importTypes?.entries() ?? emptyArray);
                    const seenImports = new Set<string>();                    
                    // efun prefix will bypass this and go directly to globals
                    while (!result && importStack.length) {                        
                        const [importName, importType] = importStack.shift()!;
                        if (seenImports.has(importName)) {
                            continue;
                        }
                        
                        seenImports.add(importName);                        

                        const importSymbolTable = importType?.symbol?.exports ?? emptySymbols;
                        result = lookup(importSymbolTable, name, meaning);
                        // also check inherited members
                        if (!result) result = lookup(importType?.symbol?.members ?? emptySymbols, name, meaning);
                        if (result) {
                            break loop;
                        }
                        
                        const nestedInherits = importType?.symbol?.inherits;
                        importStack.push(...(nestedInherits?.entries() ?? emptyArray));                                                  
                    }
                                       
                    //const moduleExports = getSymbolOfDeclaration(location as SourceFile /*| ModuleDeclaration*/)?.exports || emptySymbols;                    
                    
                    // It's an external module. First see if the module has an export default and if the local
                    // name of that export default matches.
                    // if (result = moduleExports.get(InternalSymbolName.Default)) {
                    //     const localSymbol = getLocalSymbolForExportDefault(result);
                    //     if (localSymbol && (result.flags & meaning) && localSymbol.name === name) {
                    //         break loop;
                    //     }
                    //     result = undefined;
                    // }

                    // Because of module/namespace merging, a module's exports are in scope,
                    // yet we never want to treat an export specifier as putting a member in scope.
                    // Therefore, if the name we find is purely an export specifier, it is not actually considered in scope.
                    // Two things to note about this:
                    //     1. We have to check this without calling getSymbol. The problem with calling getSymbol
                    //        on an export specifier is that it might find the export specifier itself, and try to
                    //        resolve it as an alias. This will cause the checker to consider the export specifier
                    //        a circular alias reference when it might not be.
                    //     2. We check === SymbolFlags.Alias in order to check that the symbol is *purely*
                    //        an alias. If we used &, we'd be throwing out symbols that have non alias aspects,
                    //        which is not the desired behavior.
                    // const moduleExport = moduleExports.get(name);
                    // if (
                    //     moduleExport &&
                    //     moduleExport.flags === SymbolFlags.Alias 
                    //     // TODO && (getDeclarationOfKind(moduleExport, SyntaxKind.ExportSpecifier) || getDeclarationOfKind(moduleExport, SyntaxKind.NamespaceExport))
                    // ) {
                    //     break;
                    // }                    

                    // ES6 exports are also visible locally (except for 'default'), but commonjs exports are not (except typedefs)
                    // if (name !== InternalSymbolName.Default && (result = lookup(moduleExports, name, meaning & SymbolFlags.ModuleMember))) {
                    //     if (isSourceFile(location) && location.commonJsModuleIndicator && !result.declarations?.some(isJSDocTypeAlias)) {
                    //         result = undefined;
                    //     }
                    //     else {
                    //         break loop;
                    //     }
                    // }
                    break;                
                case SyntaxKind.PropertyDeclaration:
                    // TODO: I don't think this is needed for LPC structs
                    // TypeScript 1.0 spec (April 2014): 8.4.1
                    // Initializer expressions for instance member variables are evaluated in the scope
                    // of the class constructor body but are not permitted to reference parameters or
                    // local variables of the constructor. This effectively means that entities from outer scopes
                    // by the same name as a constructor parameter or local variable are inaccessible
                    // in initializer expressions for instance member variables.                    
                    // const ctor = findConstructorDeclaration(location.parent as ClassLikeDeclaration);
                    // if (ctor && ctor.locals) {
                    //     if (lookup(ctor.locals, name, meaning & SymbolFlags.Value)) {
                    //         // Remember the property node, it will be used later to report appropriate error
                    //         Debug.assertNode(location, isPropertyDeclaration);
                    //         propertyWithInvalidInitializer = location;
                    //     }
                    // }
            
                    break;
                case SyntaxKind.StructDeclaration:
                case SyntaxKind.ClassExpression:
                //case SyntaxKind.InterfaceDeclaration:
                    // The below is used to lookup type parameters within a class or interface, as they are added to the class/interface locals
                    // These can never be latebound, so the symbol's raw members are sufficient. `getMembersOfNode` cannot be used, as it would
                    // trigger resolving late-bound names, which we may already be in the process of doing while we're here!
                    if (result = lookup(getSymbolOfDeclaration(location as StructDeclaration).members || emptySymbols, name, meaning & SymbolFlags.Type)) {
                        if (!isTypeParameterSymbolDeclaredInContainer(result, location)) {
                            // ignore type parameters not declared in this container
                            result = undefined;
                            break;
                        }                        
                        break loop;
                    }
                    // if (isClassExpression(location) && meaning & SymbolFlags.Class) {
                    //     const className = location.name;
                    //     if (className && name === className.text) {
                    //         result = location.symbol;
                    //         break loop;
                    //     }
                    // }
                    break;                               
                case SyntaxKind.InlineClosureExpression:                    
                //case SyntaxKind.MethodDeclaration:                
                case SyntaxKind.FunctionDeclaration:                        
                    // resolve any $n variable to the arguments symbol                
                    // this isn't correct - but is good enough for now
                    if (meaning & SymbolFlags.Variable && /^\$\d+$/.test(name)) {
                        result = argumentsSymbol;
                        break loop;
                    }
                    else if (meaning & SymbolFlags.Function && name==="$") {
                        result = argumentsSymbol;
                        break loop;
                    }
                    break;
                case SyntaxKind.FunctionExpression:
                    if (meaning & SymbolFlags.Variable && name === "arguments") {
                        result = argumentsSymbol;
                        break loop;
                    }

                    if (meaning & SymbolFlags.Function) {
                        const functionName = (location as FunctionExpression).name;
                        if (functionName && name === functionName.text) {
                            result = (location as FunctionExpression).symbol;
                            break loop;
                        }
                    }
                    break;                
                case SyntaxKind.JSDocTypedefTag:
                case SyntaxKind.JSDocCallbackTag:
                case SyntaxKind.JSDocEnumTag:
                case SyntaxKind.JSDocImportTag:
                    // js type aliases do not resolve names from their host, so skip past it
                    const root = getJSDocRoot(location);
                    if (root) {
                        location = root.parent;
                    }
                    break;
                case SyntaxKind.Parameter:
                    if (
                        lastLocation && (
                            lastLocation === (location as ParameterDeclaration).initializer ||
                            lastLocation === (location as ParameterDeclaration).name //&& isBindingPattern(lastLocation)
                        )
                    ) {
                        if (!associatedDeclarationForContainingInitializerOrBindingName) {
                            associatedDeclarationForContainingInitializerOrBindingName = location as ParameterDeclaration;
                        }
                    }
                    break;
                // case SyntaxKind.BindingElement:
                //     if (
                //         lastLocation && (
                //             lastLocation === (location as BindingElement).initializer ||
                //             lastLocation === (location as BindingElement).name && isBindingPattern(lastLocation)
                //         )
                //     ) {
                //         if (isPartOfParameterDeclaration(location as BindingElement) && !associatedDeclarationForContainingInitializerOrBindingName) {
                //             associatedDeclarationForContainingInitializerOrBindingName = location as BindingElement;
                //         }
                //     }
                //     break;                
                // case SyntaxKind.ExportSpecifier:
                //     // External module export bindings shouldn't be resolved to local symbols.
                //     if (
                //         lastLocation &&
                //         lastLocation === (location as ExportSpecifier).propertyName &&
                //         (location as ExportSpecifier).parent.parent.moduleSpecifier
                //     ) {
                //         location = location.parent.parent.parent;
                //     }
                //     break;
            }
            if (isSelfReferenceLocation(location, lastLocation)) {
                lastSelfReferenceLocation = location;
            }
            lastLocation = location;            
            location = isJSDocTemplateTag(location) ? getEffectiveContainerForJSDocTemplateTag(location) || location.parent :
                isJSDocParameterTag(location) || isJSDocReturnTag(location) ? getHostSignatureFromJSDoc(location) || location.parent :
                location.parent;            
        }

        // We just climbed up parents looking for the name, meaning that we started in a descendant node of `lastLocation`.
        // If `result === lastSelfReferenceLocation.symbol`, that means that we are somewhere inside `lastSelfReferenceLocation` looking up a name, and resolving to `lastLocation` itself.
        // That means that this is a self-reference of `lastLocation`, and shouldn't count this when considering whether `lastLocation` is used.
        if (isUse && result && (!lastSelfReferenceLocation || result !== lastSelfReferenceLocation.symbol)) {
            result.isReferenced! |= meaning;
        }

        if (!result) {
            if (lastLocation) {
                Debug.assertNode(lastLocation, isSourceFile);                
            }

            if (!excludeGlobals) {
                result = lookup(globals, name, meaning);
            }
        }
        
        if (!result) {
            // TODO handle include/inherit here?
            // if (originalLocation && isInJSFile(originalLocation) && originalLocation.parent) {
            //     if (isRequireCall(originalLocation.parent, /*requireStringLiteralLikeArgument*/ false)) {
            //         return requireSymbol;
            //     }
            // }
        }

        if (nameNotFoundMessage) {
            if (propertyWithInvalidInitializer && onPropertyWithInvalidInitializer(originalLocation, name, propertyWithInvalidInitializer, result)) {
                return undefined;
            }
            if (!result) {                
                // onFailed can create symbols at the last minute (for example, a variable decl that looks like an assignment expr)
                // if that happens, it will return a symbol instead of undefined
                const lateBoundSymbol = onFailedToResolveSymbol(originalLocation, nameArg, meaning, nameNotFoundMessage);
                if (lateBoundSymbol) {
                    result = lateBoundSymbol;
                }
            }
            else {
                onSuccessfullyResolvedSymbol(originalLocation, result, meaning, lastLocation, associatedDeclarationForContainingInitializerOrBindingName, withinDeferredContext);
            }
        }

        return result;
    }

    function useOuterVariableScopeInParameter(result: Symbol, location: Node, lastLocation: Node) {        
        const functionLocation = location as FunctionLikeDeclaration;
        if (
            isParameter(lastLocation)
            && functionLocation.body
            && result.valueDeclaration
            && result.valueDeclaration.pos >= functionLocation.body.pos
            && result.valueDeclaration.end <= functionLocation.body.end
        ) {
            // check for several cases where we introduce temporaries that require moving the name/initializer of the parameter to the body
            // - static field in a class expression
            // - optional chaining pre-es2020
            // - nullish coalesce pre-es2020
            // - spread assignment in binding pattern pre-es2017
            // if (target >= ScriptTarget.ES2015) {
            //     let declarationRequiresScopeChange = getRequiresScopeChangeCache(functionLocation);
            //     if (declarationRequiresScopeChange === undefined) {
            //         declarationRequiresScopeChange = forEach(functionLocation.parameters, requiresScopeChange) || false;
            //         setRequiresScopeChangeCache(functionLocation, declarationRequiresScopeChange);
            //     }
            //     return !declarationRequiresScopeChange;
            // }
        }
        return false;

        function requiresScopeChange(node: ParameterDeclaration): boolean {
            return requiresScopeChangeWorker(node.name)
                || !!node.initializer && requiresScopeChangeWorker(node.initializer);
        }

        function requiresScopeChangeWorker(node: Node): boolean {
            switch (node.kind) {
                case SyntaxKind.InlineClosureExpression:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.FunctionDeclaration:                
                    // do not descend into these
                    return false;
                //case SyntaxKind.MethodDeclaration:                
                case SyntaxKind.PropertyAssignment:
                    return requiresScopeChangeWorker((node as /*MethodDeclaration | AccessorDeclaration |*/ PropertyAssignment).name);
                case SyntaxKind.PropertyDeclaration:                    
                    return requiresScopeChangeWorker((node as PropertyDeclaration).name);
                default:
                    // null coalesce and optional chain pre-es2020 produce temporary variables                    
                    // if (isBindingElement(node) && node.dotDotDotToken && isObjectBindingPattern(node.parent)) {
                    //     return target < ScriptTarget.ES2017;
                    // }
                    if (isTypeNode(node)) return false;
                    return forEachChild(node, requiresScopeChangeWorker) || false;
            }
        }
    }

    function getIsDeferredContext(location: Node, lastLocation: Node | undefined): boolean {
        if (location.kind !== SyntaxKind.InlineClosureExpression && location.kind !== SyntaxKind.FunctionExpression) {
            // initializers in instance property declaration of class like entities are executed in constructor and thus deferred
            return ((
                isFunctionLikeDeclaration(location) ||
                (location.kind === SyntaxKind.PropertyDeclaration)
            ) && (!lastLocation || lastLocation !== (location as SignatureDeclaration | PropertyDeclaration).name)); // A name is evaluated within the enclosing scope - so it shouldn't count as deferred
        }
        if (lastLocation && lastLocation === (location as FunctionExpression | InlineClosureExpression).name) {
            return false;
        }
        // generator functions and async functions are not inlined in control flow when immediately invoked
        if ((location as FunctionExpression | InlineClosureExpression).asteriskToken){// || hasSyntacticModifier(location, ModifierFlags.Async)) {
            return true;
        }
        return !getImmediatelyInvokedFunctionExpression(location);
    }

    type SelfReferenceLocation =
        | ParameterDeclaration
        | FunctionDeclaration
        | ClassDeclaration
        // | InterfaceDeclaration
        // | EnumDeclaration
        | TypeAliasDeclaration
        // | ModuleDeclaration;
        ;

    function isSelfReferenceLocation(node: Node, lastLocation: Node | undefined): node is SelfReferenceLocation {
        switch (node.kind) {
            case SyntaxKind.Parameter:
                return !!lastLocation && lastLocation === (node as ParameterDeclaration).name;
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.StructDeclaration:
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.InterfaceDeclaration:
            // case SyntaxKind.EnumDeclaration:
            case SyntaxKind.TypeAliasDeclaration:
            // case SyntaxKind.ModuleDeclaration: // For `namespace N { N; }`
                return true;
            default:
                return false;
        }
    }

    function isTypeParameterSymbolDeclaredInContainer(symbol: Symbol, container: Node) {
        if (symbol.declarations) {
            for (const decl of symbol.declarations) {
                if (decl.kind === SyntaxKind.TypeParameter) {
                    const parent = isJSDocTemplateTag(decl.parent) ? getJSDocHost(decl.parent) : decl.parent;
                    if (parent === container) {
                        return true;// no type alises in LPC? !(isJSDocTemplateTag(decl.parent) && find((decl.parent.parent as JSDoc).tags, isJSDocTypeAlias));
                    }
                }
            }
        }

        return false;
    }
}


/**
 * Use getEffectiveJSDocHost if you additionally need to look for jsdoc on parent nodes, like assignments.
 *
 * @internal
 */
export function getJSDocHost(node: Node): HasJSDoc | undefined {
    const jsDoc = getJSDocRoot(node);
    if (!jsDoc) {
        return undefined;
    }

    const host = jsDoc.parent;
    if (host && host.jsDoc && jsDoc === lastOrUndefined(host.jsDoc)) {
        return host;
    }
}

/** @internal */
export function getJSDocRoot(node: Node): JSDoc | undefined {
    return findAncestor(node.parent, isJSDoc);
}

/** @internal */
export function getLocalSymbolForExportDefault(symbol: Symbol) {
    if (!symbol.declarations) return undefined;
    for (const decl of symbol.declarations) {
        if (decl.localSymbol) return decl.localSymbol;
    }
    return undefined;
}

/** @internal */
export function getEffectiveContainerForJSDocTemplateTag(node: JSDocTemplateTag) {    
    if (isJSDoc(node.parent) && node.parent.tags) {
        // A @template tag belongs to any @typedef, @callback, or @enum tags in the same comment block, if they exist.
        const typeAlias = find(node.parent.tags, isJSDocTypeAlias);
        if (typeAlias) {
            return typeAlias;
        }
    }
    // otherwise it belongs to the host it annotates
    return getHostSignatureFromJSDoc(node);
}

/** @internal */
export function isTypeNodeKind(kind: SyntaxKind): kind is TypeNodeSyntaxKind {
    return (kind >= SyntaxKind.FirstTypeNode && kind <= SyntaxKind.LastTypeNode)
        //|| kind === SyntaxKind.AnyKeyword
        || kind === SyntaxKind.UnknownKeyword
        || kind === SyntaxKind.IntKeyword
        || kind === SyntaxKind.FloatKeyword
        || kind === SyntaxKind.ObjectKeyword
        || kind === SyntaxKind.MixedKeyword
        || kind === SyntaxKind.StringKeyword
        || kind === SyntaxKind.MappingKeyword
        || kind === SyntaxKind.VoidKeyword
        || kind === SyntaxKind.ClosureKeyword        
        || kind === SyntaxKind.StructKeyword
        || kind === SyntaxKind.StructType
        || kind === SyntaxKind.ClassKeyword        
        || kind === SyntaxKind.JSDocAllType
        || kind === SyntaxKind.JSDocUnknownType
        || kind === SyntaxKind.JSDocNullableType
        || kind === SyntaxKind.JSDocNonNullableType
        || kind === SyntaxKind.JSDocOptionalType
        || kind === SyntaxKind.JSDocFunctionType
        || kind === SyntaxKind.JSDocVariadicType;
}

/** @internal */
export function createDiagnosticForNode(node: Node, message: DiagnosticMessage, ...args: DiagnosticArguments): DiagnosticWithLocation {    
    const sourceFile = getSourceFileOrIncludeOfNode(node);    
    Debug.assertIsDefined(sourceFile.text);
    return createDiagnosticForNodeInSourceFile(sourceFile, node, message, ...args);
}

/** @internal */
export function createCompilerDiagnostic(message: DiagnosticMessage, ...args: DiagnosticArguments): Diagnostic {
    let text = getLocaleSpecificMessage(message);

    if (some(args)) {
        text = formatStringFromArgs(text, args);
    }

    return {
        file: undefined,
        start: undefined,
        length: undefined,

        messageText: text,
        category: message.category,
        code: message.code,
        reportsUnnecessary: message.reportsUnnecessary,
        reportsDeprecated: message.reportsDeprecated,
    };
}

/** @internal */
export function isAccessExpression(node: Node): node is AccessExpression {
    return node.kind === SyntaxKind.PropertyAccessExpression || node.kind === SyntaxKind.ElementAccessExpression;
}

/** @internal */
export function isEntityNameExpression(node: Node): node is EntityNameExpression {
    return node.kind === SyntaxKind.Identifier || isPropertyAccessEntityNameExpression(node);
}

/** @internal */
export function isPropertyAccessEntityNameExpression(node: Node): node is PropertyAccessEntityNameExpression {
    return isPropertyAccessExpression(node) && isIdentifier(node.name) && isEntityNameExpression(node.expression);
}


/** @internal */
export function isAliasableExpression(e: Expression) {
    return isEntityNameExpression(e) || isInlineClosureExpression(e);
}

/**
 * Like {@link isVariableDeclarationInitializedToRequire} but allows things like `require("...").foo.bar` or `require("...")["baz"]`.
 *
 * @internal
 */
export function isVariableDeclarationInitializedToBareOrAccessedRequire(node: Node): node is VariableDeclarationInitializedTo</*RequireOrImportCall |*/ AccessExpression> {
    return isVariableDeclarationInitializedWithRequireHelper(node, /*allowAccessedRequire*/ true);
}

function isVariableDeclarationInitializedWithRequireHelper(node: Node, allowAccessedRequire: boolean) {
    return false;
    // return isVariableDeclaration(node) &&
    //     !!node.initializer &&
    //     isRequireCall(allowAccessedRequire ? getLeftmostAccessExpression(node.initializer) : node.initializer, /*requireStringLiteralLikeArgument*/ true);
}

/** @internal */
export function getCanonicalDiagnostic(message: DiagnosticMessage, ...args: string[]): CanonicalDiagnostic {
    return {
        code: message.code,
        messageText: formatMessage(message, ...args),
    };
}

/** @internal */
export function formatMessage(message: DiagnosticMessage, ...args: DiagnosticArguments): string {
    let text = getLocaleSpecificMessage(message);

    if (some(args)) {
        text = formatStringFromArgs(text, args);
    }

    return text;
}

/** @internal */
// TODO: rename to `isExternalFile`?
export function isExternalOrCommonJsModule(file: SourceFile): boolean {
    return (file.externalModuleIndicator) !== undefined;
}

/** @internal */
export function isExpressionNode(node: Node): boolean {
    switch (node.kind) {
        case SyntaxKind.SuperKeyword:
        // case SyntaxKind.NullKeyword:
        // case SyntaxKind.TrueKeyword:
        // case SyntaxKind.FalseKeyword:
        // case SyntaxKind.RegularExpressionLiteral:
        case SyntaxKind.ArrayLiteralExpression:
        case SyntaxKind.SuperAccessExpression:
        case SyntaxKind.ObjectLiteralExpression:
        case SyntaxKind.PropertyAccessExpression:
        case SyntaxKind.ElementAccessExpression:
        case SyntaxKind.CallExpression:
        case SyntaxKind.NewExpression:        
        case SyntaxKind.ParenthesizedExpression:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.ClassExpression:
        case SyntaxKind.InlineClosureExpression:        
        case SyntaxKind.PrefixUnaryExpression:
        case SyntaxKind.PostfixUnaryExpression:
        case SyntaxKind.BinaryExpression:
        case SyntaxKind.ConditionalExpression:
        case SyntaxKind.SpreadElement: 
        case SyntaxKind.ByRefElement:       
            return true;        
        case SyntaxKind.QualifiedName:
            while (node.parent.kind === SyntaxKind.QualifiedName) {
                node = node.parent;
            }
            return node.parent.kind === SyntaxKind.TypeQuery || isJSDocLinkLike(node.parent) || isJSDocNameReference(node.parent) || isJSDocMemberName(node.parent);
        case SyntaxKind.JSDocMemberName:
            while (isJSDocMemberName(node.parent)) {
                node = node.parent;
            }
            return node.parent.kind === SyntaxKind.TypeQuery || isJSDocLinkLike(node.parent) || isJSDocNameReference(node.parent) || isJSDocMemberName(node.parent);
        // case SyntaxKind.PrivateIdentifier:
        //     return isBinaryExpression(node.parent) && node.parent.left === node && node.parent.operatorToken.kind === SyntaxKind.InKeyword;
        case SyntaxKind.Identifier:
            if (isJSDocLinkLike(node.parent) || isJSDocNameReference(node.parent) || isJSDocMemberName(node.parent)) {
                return true;
            }
            // falls through

        case SyntaxKind.IntLiteral:
        case SyntaxKind.FloatLiteral:
        case SyntaxKind.StringLiteral:        
        case SyntaxKind.StructType:
            return isInExpressionContext(node);
        default:
            return false;
    }
}


/** @internal */
export function isInExpressionContext(node: Node): boolean {
    const { parent } = node;
    switch (parent.kind) {
        case SyntaxKind.VariableDeclaration:
        case SyntaxKind.Parameter:
        case SyntaxKind.PropertyDeclaration:
        case SyntaxKind.PropertySignature:
        // case SyntaxKind.EnumMember:
        case SyntaxKind.PropertyAssignment:
        // case SyntaxKind.BindingElement:
            return (parent as HasInitializer).initializer === node;
        case SyntaxKind.ExpressionStatement:
        case SyntaxKind.IfStatement:
        case SyntaxKind.DoWhileStatement:
        case SyntaxKind.WhileStatement:
        case SyntaxKind.ReturnStatement:        
        case SyntaxKind.SwitchStatement:
        case SyntaxKind.CaseClause:        
            return (parent as ExpressionStatement).expression === node;
        case SyntaxKind.ForStatement:
            const forStatement = parent as ForStatement;
            return (forStatement.initializer === node && forStatement.initializer.kind !== SyntaxKind.VariableDeclarationList) ||
                forStatement.condition === node ||
                forStatement.incrementor === node;
        case SyntaxKind.ForEachStatement:                    
            const forInOrOfStatement = parent as ForEachStatement;
            return (forInOrOfStatement.initializer === node && forInOrOfStatement.initializer.kind !== SyntaxKind.VariableDeclarationList) ||
                forInOrOfStatement.expression === node;        
        case SyntaxKind.ShorthandPropertyAssignment:
            return (parent as ShorthandPropertyAssignment).objectAssignmentInitializer === node;        
        default:
            return isExpressionNode(parent);
    }
}

/** @internal */
export function isValidTypeOnlyAliasUseSite(useSite: Node): boolean {
    return !!(useSite.flags & NodeFlags.Ambient)                        
        || !(isExpressionNode(useSite) || isShorthandPropertyNameUseSite(useSite));
}

function isShorthandPropertyNameUseSite(useSite: Node) {
    return isIdentifier(useSite) && isShorthandPropertyAssignment(useSite.parent) && useSite.parent.name === useSite;
}

/** @internal */
export function isWriteOnlyAccess(node: Node) {
    return accessKind(node) === AccessKind.Write;
}

/** @internal */
export function isWriteAccess(node: Node) {
    return accessKind(node) !== AccessKind.Read;
}

const enum AccessKind {
    /** Only reads from a variable. */
    Read,
    /** Only writes to a variable without ever reading it. E.g.: `x=1;`. */
    Write,
    /** Reads from and writes to a variable. E.g.: `f(x++);`, `x/=1`. */
    ReadWrite,
}
function accessKind(node: Node): AccessKind {
    const { parent } = node;

    switch (parent?.kind) {
        case SyntaxKind.ParenthesizedExpression:
            return accessKind(parent);
        case SyntaxKind.PostfixUnaryExpression:
        case SyntaxKind.PrefixUnaryExpression:
            const { operator } = parent as PrefixUnaryExpression | PostfixUnaryExpression;
            return operator === SyntaxKind.PlusPlusToken || operator === SyntaxKind.MinusMinusToken ? AccessKind.ReadWrite : AccessKind.Read;
        case SyntaxKind.BinaryExpression:
            const { left, operatorToken } = parent as BinaryExpression;
            return left === node && isAssignmentOperator(operatorToken.kind) ?
                // in LPC, equals are always readwrite
                operatorToken.kind === SyntaxKind.EqualsToken ? AccessKind.ReadWrite : AccessKind.ReadWrite
                : AccessKind.Read;
        case SyntaxKind.PropertyAccessExpression:
            return (parent as PropertyAccessExpression).name !== node ? AccessKind.Read : accessKind(parent);
        case SyntaxKind.PropertyAssignment: {
            const parentAccess = accessKind(parent.parent);
            // In `({ x: varname }) = { x: 1 }`, the left `x` is a read, the right `x` is a write.
            return node === (parent as PropertyAssignment).name ? reverseAccessKind(parentAccess) : parentAccess;
        }
        case SyntaxKind.ShorthandPropertyAssignment:
            // Assume it's the local variable being accessed, since we don't check public properties for --noUnusedLocals.
            return node === (parent as ShorthandPropertyAssignment).objectAssignmentInitializer ? AccessKind.Read : accessKind(parent.parent);
        case SyntaxKind.ArrayLiteralExpression:
            return accessKind(parent);
        default:
            return AccessKind.Read;
    }
}
function reverseAccessKind(a: AccessKind): AccessKind {
    switch (a) {
        case AccessKind.Read:
            return AccessKind.Write;
        case AccessKind.Write:
            return AccessKind.Read;
        case AccessKind.ReadWrite:
            return AccessKind.ReadWrite;
        default:
            return Debug.assertNever(a);
    }
}

/** @internal */
export function canHaveJSDoc(node: Node): node is HasJSDoc {
    switch (node.kind) {        
        case SyntaxKind.BinaryExpression:
        case SyntaxKind.Block:
        case SyntaxKind.BreakStatement:
        case SyntaxKind.CaseClause:        
        case SyntaxKind.CallSignature:
        case SyntaxKind.ClassDeclaration:
        case SyntaxKind.ClassExpression:        
        case SyntaxKind.ContinueStatement:        
        case SyntaxKind.DefineDirective:
        case SyntaxKind.DoWhileStatement:
        case SyntaxKind.ElementAccessExpression:
        case SyntaxKind.EmptyStatement:
        case SyntaxKind.EndOfFileToken:        
        case SyntaxKind.ExpressionStatement:
        case SyntaxKind.ForEachStatement:        
        case SyntaxKind.ForStatement:
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.FunctionType:        
        case SyntaxKind.Identifier:
        case SyntaxKind.IfStatement:   
        case SyntaxKind.IncludeDirective:
        case SyntaxKind.InlineClosureExpression:
        case SyntaxKind.InheritDeclaration:     
        case SyntaxKind.IndexSignature:        
        case SyntaxKind.JSDocFunctionType:
        case SyntaxKind.JSDocSignature:        
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.MethodSignature:        
        case SyntaxKind.ObjectLiteralExpression:
        case SyntaxKind.Parameter:
        case SyntaxKind.ParenthesizedExpression:
        case SyntaxKind.PropertyAccessExpression:
        case SyntaxKind.PropertyAssignment:
        case SyntaxKind.PropertyDeclaration:
        case SyntaxKind.PropertySignature:
        case SyntaxKind.ReturnStatement:
        //case SyntaxKind.SemicolonClassElement:        
        case SyntaxKind.ShorthandPropertyAssignment:
        //case SyntaxKind.SpreadAssignment:
        case SyntaxKind.StructDeclaration:    
        case SyntaxKind.SwitchStatement:        
        case SyntaxKind.TypeParameter:
        case SyntaxKind.VariableDeclaration:
        case SyntaxKind.VariableStatement:
        case SyntaxKind.WhileStatement:            
            return true;
        default:
            return false;
    }
}


/**
 * This function checks multiple locations for JSDoc comments that apply to a host node.
 * At each location, the whole comment may apply to the node, or only a specific tag in
 * the comment. In the first case, location adds the entire {@link JSDoc} object. In the
 * second case, it adds the applicable {@link JSDocTag}.
 *
 * For example, a JSDoc comment before a parameter adds the entire {@link JSDoc}. But a
 * `@param` tag on the parent function only adds the {@link JSDocTag} for the `@param`.
 *
 * ```ts
 * /** JSDoc will be returned for `a` *\/
 * const a = 0
 * /**
 *  * Entire JSDoc will be returned for `b`
 *  * @param c JSDocTag will be returned for `c`
 *  *\/
 * function b(/** JSDoc will be returned for `c` *\/ c) {}
 * ```
 */
export function getJSDocCommentsAndTags(hostNode: Node): readonly (JSDoc | JSDocTag)[];
/** @internal separate signature so that stripInternal can remove noCache from the public API */
// eslint-disable-next-line @typescript-eslint/unified-signatures
export function getJSDocCommentsAndTags(hostNode: Node, noCache?: boolean): readonly (JSDoc | JSDocTag)[];
export function getJSDocCommentsAndTags(hostNode: Node, noCache?: boolean): readonly (JSDoc | JSDocTag)[] {
    let result: (JSDoc | JSDocTag)[] | undefined;
    // Pull parameter comments from declaring function as well
    if (isVariableLike(hostNode) && hasInitializer(hostNode) && hasJSDocNodes(hostNode.initializer!)) {
        result = addRange(result, filterOwnedJSDocTags(hostNode, hostNode.initializer.jsDoc!));
    }

    let node: Node | undefined = hostNode;
    while (node && node.parent) {
        if (hasJSDocNodes(node)) {
            result = addRange(result, filterOwnedJSDocTags(hostNode, node.jsDoc!));
        }

        if (node.kind === SyntaxKind.Parameter) {
            result = addRange(result, (noCache ? getJSDocParameterTagsNoCache : getJSDocParameterTags)(node as ParameterDeclaration));
            break;
        }
        if (node.kind === SyntaxKind.TypeParameter) {
            result = addRange(result, (noCache ? getJSDocTypeParameterTagsNoCache : getJSDocTypeParameterTags)(node as TypeParameterDeclaration));
            break;
        }
        node = getNextJSDocCommentLocation(node);
    }
    return result || emptyArray;
}

function filterOwnedJSDocTags(hostNode: Node, comments: JSDocArray) {
    const lastJsDoc = last(comments);
    return flatMap<JSDoc, JSDoc | JSDocTag>(comments, jsDoc => {
        if (jsDoc === lastJsDoc) {
            const ownedTags = filter(jsDoc.tags, tag => ownsJSDocTag(hostNode, tag));
            return jsDoc.tags === ownedTags ? [jsDoc] : ownedTags;
        }
        else {
            return filter(jsDoc.tags, isJSDocOverloadTag);
        }
    });
}

/**
 * Determines whether a host node owns a jsDoc tag. A `@type`/`@satisfies` tag attached to a
 * a ParenthesizedExpression belongs only to the ParenthesizedExpression.
 */
function ownsJSDocTag(hostNode: Node, tag: JSDocTag) {
    return !(isJSDocTypeTag(tag) || isJSDocSatisfiesTag(tag))
        || !tag.parent
        || !isJSDoc(tag.parent)
        || !isParenthesizedExpression(tag.parent.parent)
        || tag.parent.parent === hostNode;
}

/** @internal */
export function isAssignmentExpression(node: Node, excludeCompoundAssignment: true): node is AssignmentExpression<EqualsToken>;
/** @internal */
export function isAssignmentExpression(node: Node, excludeCompoundAssignment?: false): node is AssignmentExpression<AssignmentOperatorToken>;
/** @internal */
export function isAssignmentExpression(node: Node, excludeCompoundAssignment?: boolean): node is AssignmentExpression<AssignmentOperatorToken> {
    return isBinaryExpression(node)
        && (excludeCompoundAssignment
            ? node.operatorToken.kind === SyntaxKind.EqualsToken
            : isAssignmentOperator(node.operatorToken.kind))
        && isLeftHandSideExpression(node.left);
}


// Gets the nearest enclosing block scope container that has the provided node
// as a descendant, that is not the provided node.
/** @internal */
export function getEnclosingBlockScopeContainer(node: Node): Node {
    return findAncestor(node.parent, current => isBlockScope(current, current.parent))!;
}

/**
 * Getes the nearest enclosing container that can and does have locals that is not
 * the provided node
 * @internal
 * @param node 
 * @returns HasLocals type node
 */
export function getEnclosingLocalsContainer(node: Node): HasLocals {
    return findAncestor(node.parent, current => canHaveLocals(current)) as HasLocals;
}

/** @internal */
export function isFunctionLikeOrClassStaticBlockDeclaration(node: Node | undefined): node is SignatureDeclaration {
    return !!node && (isFunctionLikeKind(node.kind));
}

/** @internal */
export function isBlockScope(node: Node, parentNode: Node | undefined): boolean {
    switch (node.kind) {
        case SyntaxKind.SourceFile:
        case SyntaxKind.CaseBlock:
        case SyntaxKind.CatchStatement:        
        case SyntaxKind.ForStatement:
        case SyntaxKind.ForEachStatement:        
        //case SyntaxKind.MethodDeclaration:        
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.InlineClosureExpression:
        case SyntaxKind.PropertyDeclaration:        
            return true;

        case SyntaxKind.Block:
            // function block is not considered block-scope container
            // see comment in binder.ts: bind(...), case for SyntaxKind.Block
            return !isFunctionLikeOrClassStaticBlockDeclaration(parentNode);
    }

    return false;
}


/** @internal */
export function nodeStartsNewLexicalEnvironment(node: Node): boolean {
    const kind = node.kind;
    return kind === SyntaxKind.FunctionExpression
        || kind === SyntaxKind.FunctionDeclaration
        || kind === SyntaxKind.InlineClosureExpression
        //|| kind === SyntaxKind.MethodDeclaration        
        || kind === SyntaxKind.SourceFile;
}

/** @internal */
export function getAncestor(node: Node | undefined, kind: SyntaxKind): Node | undefined {
    while (node) {
        if (node.kind === kind) {
            return node;
        }
        node = node.parent;
    }
    return undefined;
}

/** @internal */
export const enum AssignmentKind {
    None,
    Definite,
    Compound,
}

/** @internal */
export function getAssignmentTargetKind(node: Node): AssignmentKind {
    const target = getAssignmentTarget(node);
    if (!target) {
        return AssignmentKind.None;
    }
    switch (target.kind) {
        case SyntaxKind.BinaryExpression:
            const binaryOperator = target.operatorToken.kind;
            return binaryOperator === SyntaxKind.EqualsToken || isLogicalOrCoalescingAssignmentOperator(binaryOperator) ?
                AssignmentKind.Definite :
                AssignmentKind.Compound;
        case SyntaxKind.PrefixUnaryExpression:
        case SyntaxKind.PostfixUnaryExpression:
            return AssignmentKind.Compound;
        case SyntaxKind.ForEachStatement:        
            return AssignmentKind.Definite;
    }
}

function isCompoundLikeAssignment(assignment: AssignmentExpression<EqualsToken>): boolean {
    const right = skipParentheses(assignment.right);
    return right.kind === SyntaxKind.BinaryExpression && isShiftOperatorOrHigher((right as BinaryExpression).operatorToken.kind);
}


function isExponentiationOperator(kind: SyntaxKind): kind is ExponentiationOperator {
    return kind === SyntaxKind.AsteriskAsteriskToken;
}

function isMultiplicativeOperator(kind: SyntaxKind): kind is MultiplicativeOperator {
    return kind === SyntaxKind.AsteriskToken
        || kind === SyntaxKind.SlashToken
        || kind === SyntaxKind.PercentToken;
}

function isMultiplicativeOperatorOrHigher(kind: SyntaxKind): kind is MultiplicativeOperatorOrHigher {
    return isExponentiationOperator(kind)
        || isMultiplicativeOperator(kind);
}

function isAdditiveOperator(kind: SyntaxKind): kind is AdditiveOperator {
    return kind === SyntaxKind.PlusToken
        || kind === SyntaxKind.MinusToken;
}

function isAdditiveOperatorOrHigher(kind: SyntaxKind): kind is AdditiveOperatorOrHigher {
    return isAdditiveOperator(kind)
        || isMultiplicativeOperatorOrHigher(kind);
}

function isShiftOperator(kind: SyntaxKind): kind is ShiftOperator {
    return kind === SyntaxKind.LessThanLessThanToken
        || kind === SyntaxKind.GreaterThanGreaterThanToken
        || kind === SyntaxKind.GreaterThanGreaterThanGreaterThanToken;
}

/** @internal */
export function isShiftOperatorOrHigher(kind: SyntaxKind): kind is ShiftOperatorOrHigher {
    return isShiftOperator(kind)
        || isAdditiveOperatorOrHigher(kind);
}

function isRelationalOperator(kind: SyntaxKind): kind is RelationalOperator {
    return kind === SyntaxKind.LessThanToken
        || kind === SyntaxKind.LessThanEqualsToken
        || kind === SyntaxKind.GreaterThanToken
        || kind === SyntaxKind.GreaterThanEqualsToken        
        || kind === SyntaxKind.InKeyword;
}

function isRelationalOperatorOrHigher(kind: SyntaxKind): kind is RelationalOperatorOrHigher {
    return isRelationalOperator(kind)
        || isShiftOperatorOrHigher(kind);
}

function isEqualityOperator(kind: SyntaxKind): kind is EqualityOperator {
    return kind === SyntaxKind.EqualsEqualsToken
        || kind === SyntaxKind.EqualsEqualsEqualsToken
        || kind === SyntaxKind.ExclamationEqualsToken
        || kind === SyntaxKind.ExclamationEqualsEqualsToken;
}

function isEqualityOperatorOrHigher(kind: SyntaxKind): kind is EqualityOperatorOrHigher {
    return isEqualityOperator(kind)
        || isRelationalOperatorOrHigher(kind);
}

function isBitwiseOperator(kind: SyntaxKind): kind is BitwiseOperator {
    return kind === SyntaxKind.AmpersandToken
        || kind === SyntaxKind.BarToken
        || kind === SyntaxKind.CaretToken;
}

function isBitwiseOperatorOrHigher(kind: SyntaxKind): kind is BitwiseOperatorOrHigher {
    return isBitwiseOperator(kind)
        || isEqualityOperatorOrHigher(kind);
}

// NOTE: The version in utilities includes ExclamationToken, which is not a binary operator.
function isLogicalOperator(kind: SyntaxKind): kind is LogicalOperator {
    return kind === SyntaxKind.AmpersandAmpersandToken
        || kind === SyntaxKind.BarBarToken;
}

function isLogicalOperatorOrHigher(kind: SyntaxKind): kind is LogicalOperatorOrHigher {
    return isLogicalOperator(kind)
        || isBitwiseOperatorOrHigher(kind);
}

function isAssignmentOperatorOrHigher(kind: SyntaxKind): kind is AssignmentOperatorOrHigher {
    return isLogicalOperatorOrHigher(kind)
        || isAssignmentOperator(kind);
}

function isBinaryOperator(kind: SyntaxKind): kind is BinaryOperator {
    return isAssignmentOperatorOrHigher(kind)
        || kind === SyntaxKind.CommaToken;
}

export function isBinaryOperatorToken(node: Node): node is BinaryOperatorToken {
    return isBinaryOperator(node.kind);
}


/** @internal */
export function isInCompoundLikeAssignment(node: Node): boolean {
    const target = getAssignmentTarget(node);
    return !!target && isAssignmentExpression(target, /*excludeCompoundAssignment*/ true) && isCompoundLikeAssignment(target);
}

/** @internal */
export function canHaveFlowNode(node: Node): node is HasFlowNode {
    if (node.kind >= SyntaxKind.FirstStatement && node.kind <= SyntaxKind.LastStatement) {
        return true;
    }

    switch (node.kind) {
        case SyntaxKind.Identifier:        
        case SyntaxKind.SuperKeyword:        
        case SyntaxKind.ElementAccessExpression:
        case SyntaxKind.PropertyAccessExpression:
        case SyntaxKind.BindingElement:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.InlineClosureExpression:        
            return true;
        default:
            return false;
    }
}

/** @internal */
export function getObjectFlags(type: Type): ObjectFlags {
    return type.flags & TypeFlags.ObjectFlagsType ? (type as ObjectFlagsType).objectFlags : 0;
}


/**
 * Bypasses immutability and directly sets the `flags` property of a `Node`.
 *
 * @internal
 */
export function setNodeFlags<T extends Node>(node: T, newFlags: NodeFlags): T;
/** @internal */
export function setNodeFlags<T extends Node>(node: T | undefined, newFlags: NodeFlags): T | undefined;
/** @internal */
export function setNodeFlags<T extends Node>(node: T | undefined, newFlags: NodeFlags): T | undefined {
    if (node) {
        (node as Mutable<T>).flags = newFlags;
    }
    return node;
}

/** @internal */
export function canIncludeBindAndCheckDiagnostics(sourceFile: SourceFile, options: CompilerOptions) {
    if (!!sourceFile.checkLpcDirective && sourceFile.checkLpcDirective.enabled === false) return false;
    if (
        sourceFile.scriptKind === ScriptKind.LPC ||        
        sourceFile.scriptKind === ScriptKind.External
    ) return true;

    return sourceFile.scriptKind == ScriptKind.Deferred;

    // const isJs = sourceFile.scriptKind === ScriptKind.JS || sourceFile.scriptKind === ScriptKind.JSX;
    // const isCheckJs = isJs && isCheckJsEnabledForFile(sourceFile, options);
    // const isPlainJs = isPlainJsFile(sourceFile, options.checkJs);

    // // By default, only type-check .ts, .tsx, Deferred, plain JS, checked JS and External
    // // - plain JS: .js files with no // ts-check and checkJs: undefined
    // // - check JS: .js files with either // ts-check or checkJs: true
    // // - external: files that are added by plugins
    // return isPlainJs || isCheckJs || sourceFile.scriptKind === ScriptKind.Deferred;
}

// True if `name` is the name of a declaration node
/** @internal */
export function isDeclarationName(name: Node): boolean {    
    return !isSourceFile(name) && !isBindingPattern(name) && name.parent && isDeclaration(name.parent) && name.parent.name === name;
}

/** @internal */
export function createDiagnosticForFileFromMessageChain(sourceFile: SourceFileBase, messageChain: DiagnosticMessageChain, relatedInformation?: DiagnosticRelatedInformation[]): DiagnosticWithLocation {
    return {
        file: sourceFile,
        start: 0,
        length: 0,
        code: messageChain.code,
        category: messageChain.category,
        messageText: messageChain.next ? messageChain : messageChain.messageText,
        relatedInformation,
    };
}

/** @internal */
export function createDiagnosticForNodeFromMessageChain(sourceFile: SourceFileBase, node: Node, messageChain: DiagnosticMessageChain, relatedInformation?: DiagnosticRelatedInformation[]): DiagnosticWithLocation {
    const span = getErrorSpanForNode(sourceFile, node);
    return createFileDiagnosticFromMessageChain(sourceFile, span.start, span.length, messageChain, relatedInformation);
}


/** @internal */
export function createFileDiagnosticFromMessageChain(file: SourceFileBase, start: number, length: number, messageChain: DiagnosticMessageChain, relatedInformation?: DiagnosticRelatedInformation[]): DiagnosticWithLocation {
    assertDiagnosticLocation(file.text, start, length);
    return {
        file,
        start,
        length,
        code: messageChain.code,
        category: messageChain.category,
        messageText: messageChain.next ? messageChain : messageChain.messageText,
        relatedInformation,
        canonicalHead: messageChain.canonicalHead,
    };
}

// Returns true if this node contains a parse error anywhere underneath it.
/** @internal */
export function containsParseError(node: Node): boolean {
    aggregateChildData(node);
    return (node.flags & NodeFlags.ThisNodeOrAnySubNodesHasError) !== 0;
}

// Returns true if this node is inside an included file branch of the AST
/** @internal */
export function isInIncludeContext(node: Node): boolean {
    return (node.flags & NodeFlags.IncludeContext) !== 0;
}

export function isInMacroContext(node: Node): boolean {
    return (node.flags & NodeFlags.MacroContext) !== 0;
}

export function isInExternalFileContext(node: Node): boolean {
    return (node.flags & NodeFlags.IncludeOrMacro) !== 0;   
}

function aggregateChildData(node: Node): void {
    if (!(node.flags & NodeFlags.HasAggregatedChildData)) {
        // A node is considered to contain a parse error if:
        //  a) the parser explicitly marked that it had an error
        //  b) any of it's children reported that it had an error.
        const thisNodeOrAnySubNodesHasError = ((node.flags & NodeFlags.ThisNodeHasError) !== 0) ||
            forEachChild(node, containsParseError);

        // If so, mark ourselves accordingly.
        if (thisNodeOrAnySubNodesHasError) {
            (node as Mutable<Node>).flags |= NodeFlags.ThisNodeOrAnySubNodesHasError;
        }

        // Also mark that we've propagated the child information to this node.  This way we can
        // always consult the bit directly on this node without needing to check its children
        // again.
        (node as Mutable<Node>).flags |= NodeFlags.HasAggregatedChildData;
    }
}

/** @internal */
export const enum FunctionFlags {
    Normal = 0,             // Function is a normal function
    Generator = 1 << 0,     // Function is a generator function or async generator function
    Async = 1 << 1,         // Function is an async function or an async generator function
    Invalid = 1 << 2,       // Function is a signature or overload and does not have a body.
    AsyncGenerator = Async | Generator, // Function is an async generator function
}


/** @internal */
export function getFunctionFlags(node: SignatureDeclaration | undefined) {
    if (!node) {
        return FunctionFlags.Invalid;
    }

    let flags = FunctionFlags.Normal;
    switch (node.kind) {
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
        //case SyntaxKind.MethodDeclaration:
            
            // falls through

        case SyntaxKind.InlineClosureExpression:
            // TODO: coroutine async here
            // if (hasSyntacticModifier(node, ModifierFlags.Async)) {
            //     flags |= FunctionFlags.Async;
            // }
            break;
    }

    if (!(node as FunctionLikeDeclaration).body) {
        flags |= FunctionFlags.Invalid;
    }

    return flags;
}


/**
 * Gets the effective return type annotation of a signature. If the node was parsed in a
 * JavaScript file, gets the return type annotation from JSDoc.
 *
 * @internal
 */
export function getEffectiveReturnTypeNode(node: SignatureDeclaration | JSDocSignature): TypeNode | undefined {    
    return isJSDocSignature(node) ?
        node.type && node.type.typeExpression && node.type.typeExpression.type :        
        (isInJSFile(node) ? getJSDocReturnType(node) : undefined) ?? node.type;
}

/** @internal */
export function isFunctionBlock(node: Node): boolean {
    return node && node.kind === SyntaxKind.Block && isFunctionLike(node.parent);
}

/** @internal */
export function getContainingFunction(node: Node): SignatureDeclaration | undefined {
    return findAncestor(node.parent, isFunctionLike);
}

const extensionsToRemove = [Extension.C, Extension.H, Extension.Lpc];
/** @internal */
export function removeFileExtension(path: string): string {
    for (const ext of extensionsToRemove) {
        const extensionless = tryRemoveExtension(path, ext);
        if (extensionless !== undefined) {
            return extensionless;
        }
    }
    return path;
}

/** @internal @knipignore */
export function tryRemoveExtension(path: string, extension: string): string | undefined {
    return fileExtensionIs(path, extension) ? removeExtension(path, extension) : undefined;
}


/** @internal */
export function removeExtension(path: string, extension: string): string {
    return path.substring(0, path.length - extension.length);
}

/** @internal */
export function hasEffectiveModifier(node: Node, flags: ModifierFlags): boolean {
    return !!getSelectedEffectiveModifierFlags(node, flags);
}

/** @internal */
export function getSelectedEffectiveModifierFlags(node: Node, flags: ModifierFlags): ModifierFlags {
    return getEffectiveModifierFlags(node) & flags;
}

/**
 * Gets the effective ModifierFlags for the provided node, including JSDoc modifiers. The modifiers will be cached on the node to improve performance.
 *
 * NOTE: This function may use `parent` pointers.
 *
 * @internal
 */
export function getEffectiveModifierFlags(node: Node): ModifierFlags {
    return getModifierFlagsWorker(node, /*includeJSDoc*/ true);
}

// Return true if the given identifier is classified as an IdentifierName
/** @internal */
export function isIdentifierName(node: Identifier): boolean {
    const parent = node.parent;
    switch (parent.kind) {
        case SyntaxKind.PropertyDeclaration:
        //case SyntaxKind.PropertySignature:
        // case SyntaxKind.MethodDeclaration:
        // case SyntaxKind.MethodSignature:
        case SyntaxKind.PropertyAssignment:
        case SyntaxKind.PropertyAccessExpression:
            // Name in member declaration or property name in property access
            return (parent as NamedDeclaration | PropertyAccessExpression).name === node;
        // case SyntaxKind.QualifiedName:
        //     // Name on right hand side of dot in a type query or type reference
        //     return (parent as QualifiedName).right === node;
        case SyntaxKind.BindingElement:
        // case SyntaxKind.ImportSpecifier:
            // Property name in binding element or import specifier
            return (parent as BindingElement /*| ImportSpecifier*/).propertyName === node;
        //case SyntaxKind.ExportSpecifier:        
            // Any name in an export specifier or JSX Attribute or Jsx Element
            // return true;
    }
    return false;
}

/** @internal */
export function isKeyword(token: SyntaxKind): token is KeywordSyntaxKind {
    return SyntaxKind.FirstKeyword <= token && token <= SyntaxKind.LastKeyword;
}

/** @internal */
export function isNonReservedKeyword(token: SyntaxKind): token is KeywordSyntaxKind {
    return token > SyntaxKind.LastReservedWord && token <= SyntaxKind.LastKeyword;
}


/**
 * True if node is of some JSDoc syntax kind.
 *
 * @internal
 */
export function isJSDocNode(node: Node): boolean {
    return node.kind >= SyntaxKind.FirstJSDocNode && node.kind <= SyntaxKind.LastJSDocNode;
}

/** @internal */
export function getTokenPosOfNode(node: Node, sourceFile?: SourceFileLike, includeJsDoc?: boolean): number {
       
    // With nodes that have no width (i.e. 'Missing' nodes), we actually *don't*
    // want to skip trivia because this will launch us forward to the next token.
    if (nodeIsMissing(node)) {
        return node.pos;
    }

    if (isJSDocNode(node)) {
        // JsxText cannot actually contain comments, even though the scanner will think it sees comments
        return skipTrivia((sourceFile ?? getSourceFileOrIncludeOfNode(node)).text, node.pos, /*stopAfterLineBreak*/ false, /*stopAtComments*/ true);
    }
    
    if (includeJsDoc && hasJSDocNodes(node)) {
        return getTokenPosOfNode(node.jsDoc![0], sourceFile);
    }

    // For a syntax list, it is possible that one of its children has JSDocComment nodes, while
    // the syntax list itself considers them as normal trivia. Therefore if we simply skip
    // trivia for the list, we may have skipped the JSDocComment as well. So we should process its
    // first child to determine the actual position of its first token.
    if (node.kind === SyntaxKind.SyntaxList) {
        sourceFile ??= getSourceFileOrIncludeOfNode(node);
        const first = firstOrUndefined(getNodeChildren(node, sourceFile));
        if (first) {
            return getTokenPosOfNode(first, sourceFile, includeJsDoc);
        }
    }

    const text = (sourceFile ?? getSourceFileOrIncludeOfNode(node))?.text;
    return text ? skipTrivia(
        text,
        node.pos,
        /*stopAfterLineBreak*/ false,
        /*stopAtComments*/ false,
        isInJSDoc(node),
    ) : node.pos;
}

/** @internal */
export function isInJSDoc(node: Node | undefined): boolean {
    return !!node && !!(node.flags & NodeFlags.JSDoc);
}

/**
 * True if has jsdoc nodes attached to it.
 *
 * @internal
 */
// TODO: GH#19856 Would like to return `node is Node & { jsDoc: JSDoc[] }` but it causes long compile times
export function hasJSDocNodes(node: Node): node is HasJSDoc {
    if (!canHaveJSDoc(node)) return false;

    const { jsDoc } = node as JSDocContainer;
    return !!jsDoc && jsDoc.length > 0;
}

/** @internal */
export function getTextOfIdentifierOrLiteral(node: PropertyNameLiteral | ParenthesizedExpression): string {
    if (isParenthesizedExpression(node)) {
        return getTextOfIdentifierOrLiteral(skipParentheses(node.expression) as PropertyNameLiteral);
    } 
    return node.text; // TODO
    //return isMemberName(node) ? idText(node) : node.text;
}


/**
 * Used by `deprecatedCompat` to patch the object allocator to apply deprecations.
 * @internal
 * @knipignore
 */
export function addObjectAllocatorPatcher(fn: (objectAllocator: ObjectAllocator) => void) {
    objectAllocatorPatchers.push(fn);
    fn(objectAllocator);
}

/** @internal */
export function setObjectAllocator(alloc: ObjectAllocator) {
    Object.assign(objectAllocator, alloc);
    forEach(objectAllocatorPatchers, fn => fn(objectAllocator));
}


const carriageReturnLineFeed = "\r\n";
const lineFeed = "\n";
/** @internal */
export function getNewLineCharacter(options: CompilerOptions | PrinterOptions): string {
    switch (options.newLine) {
        case NewLineKind.CarriageReturnLineFeed:
            return carriageReturnLineFeed;
        case NewLineKind.LineFeed:
        case undefined:
            return lineFeed;
    }
}

/** @internal */
export interface FileSystemEntries {
    readonly files: readonly string[];
    readonly directories: readonly string[];
}

/** @internal */
export const emptyFileSystemEntries: FileSystemEntries = {
    files: emptyArray,
    directories: emptyArray,
};

/** @internal */
export function closeFileWatcher(watcher: FileWatcher) {
    watcher.close();
}


/** @internal */
export function optionsHaveChanges(oldOptions: CompilerOptions, newOptions: CompilerOptions, optionDeclarations: readonly CommandLineOption[]) {
    return oldOptions !== newOptions && optionDeclarations.some(o => !isJsonEqual(getCompilerOptionValue(oldOptions, o), getCompilerOptionValue(newOptions, o)));
}

/** @internal */
export function packageIdToPackageName({ name, subModuleName }: PackageId): string {
    return subModuleName ? `${name}/${subModuleName}` : name;
}


/** @internal */
export function packageIdToString(packageId: PackageId): string {
    return `${packageIdToPackageName(packageId)}@${packageId.version}${packageId.peerDependencies ?? ""}`;
}

/** @internal */
export function ensureScriptKind(fileName: string, scriptKind: ScriptKind | undefined): ScriptKind {
    // Using scriptKind as a condition handles both:
    // - 'scriptKind' is unspecified and thus it is `undefined`
    // - 'scriptKind' is set and it is `Unknown` (0)
    // If the 'scriptKind' is 'undefined' or 'Unknown' then we attempt
    // to get the ScriptKind from the file name. If it cannot be resolved
    // from the file name then the default 'TS' script kind is returned.
    return scriptKind || ScriptKind.LPC;
}

/** @internal */
export const supportedDeclarationExtensions: readonly Extension[] = [Extension.C, Extension.H, Extension.Lpc];


/**
 * Calls `callback` for each entry in the map, returning the first truthy result.
 * Use `map.forEach` instead for normal iteration.
 *
 * @internal
 */
export function forEachEntry<K, V, U>(map: ReadonlyMap<K, V>, callback: (value: V, key: K) => U | undefined): U | undefined {
    const iterator = map.entries();
    for (const [key, value] of iterator) {
        const result = callback(value, key);
        if (result) {
            return result;
        }
    }
    return undefined;
}

/** @internal */
export function directoryProbablyExists(directoryName: string, host: { directoryExists?: (directoryName: string) => boolean; }): boolean {
    // if host does not support 'directoryExists' assume that directory will exist
    return !host.directoryExists || host.directoryExists(directoryName);
}


/**
 * See comment on `declareModuleMember` in `binder.ts`.
 *
 * @internal
 */
export function getCombinedLocalAndExportSymbolFlags(symbol: Symbol): SymbolFlags {
    return symbol.exportSymbol ? symbol.exportSymbol.flags | symbol.flags : symbol.flags;
}

/** @internal */
export function getDeclarationOfKind<T extends Declaration>(symbol: Symbol, kind: T["kind"]): T | undefined {
    const declarations = symbol.declarations;
    if (declarations) {
        for (const declaration of declarations) {
            if (declaration.kind === kind) {
                return declaration as T;
            }
        }
    }

    return undefined;
}

/** @internal */
export function getCheckFlags(symbol: Symbol): CheckFlags {
    return symbol.flags & SymbolFlags.Transient ? (symbol as TransientSymbol).links.checkFlags : 0;
}

/** @internal */
export function getDeclarationModifierFlagsFromSymbol(s: Symbol, isWrite = false): ModifierFlags {
    if (s.valueDeclaration) {
        const declaration = s.valueDeclaration;
        const flags = getCombinedModifierFlags(declaration);
        return s.parent && s.parent.flags & SymbolFlags.Class ? flags : flags & ~ModifierFlags.AccessibilityModifier;
    }
    if (getCheckFlags(s) & CheckFlags.Synthetic) {
        // NOTE: potentially unchecked cast to TransientSymbol
        const checkFlags = (s as TransientSymbol).links.checkFlags;
        const accessModifier = checkFlags & CheckFlags.ContainsPrivate ? ModifierFlags.Private :
            checkFlags & CheckFlags.ContainsPublic ? ModifierFlags.Public :
            ModifierFlags.Protected;
        const staticModifier = checkFlags & CheckFlags.ContainsStatic ? ModifierFlags.Static : 0;
        return accessModifier | staticModifier;
    }
    if (s.flags & SymbolFlags.Prototype) {
        return ModifierFlags.Public | ModifierFlags.Static;
    }
    return 0;
}

/** @internal */
export function isNumericLiteralName(name: string) {
    // The intent of numeric names is that
    //     - they are names with text in a numeric form, and that
    //     - setting properties/indexing with them is always equivalent to doing so with the numeric literal 'numLit',
    //         acquired by applying the abstract 'ToNumber' operation on the name's text.
    //
    // The subtlety is in the latter portion, as we cannot reliably say that anything that looks like a numeric literal is a numeric name.
    // In fact, it is the case that the text of the name must be equal to 'ToString(numLit)' for this to hold.
    //
    // Consider the property name '"0xF00D"'. When one indexes with '0xF00D', they are actually indexing with the value of 'ToString(0xF00D)'
    // according to the ECMAScript specification, so it is actually as if the user indexed with the string '"61453"'.
    // Thus, the text of all numeric literals equivalent to '61543' such as '0xF00D', '0xf00D', '0170015', etc. are not valid numeric names
    // because their 'ToString' representation is not equal to their original text.
    // This is motivated by ECMA-262 sections 9.3.1, 9.8.1, 11.1.5, and 11.2.1.
    //
    // Here, we test whether 'ToString(ToNumber(name))' is exactly equal to 'name'.
    // The '+' prefix operator is equivalent here to applying the abstract ToNumber operation.
    // Applying the 'toString()' method on a number gives us the abstract ToString operation on a number.
    //
    // Note that this accepts the values 'Infinity', '-Infinity', and 'NaN', and that this is intentional.
    // This is desired behavior, because when indexing with them as numeric entities, you are indexing
    // with the strings '"Infinity"', '"-Infinity"', and '"NaN"' respectively.
    return (+name).toString() === name;
}

/** @internal */
export function isTransientSymbol(symbol: Symbol): symbol is TransientSymbol {
    return (symbol.flags & SymbolFlags.Transient) !== 0;
}

/** @internal */
export function isLeftSideOfPropertyAccess(node: Node) {
    return (node.parent.kind === SyntaxKind.PropertyAccessExpression && (node.parent as PropertyAccessExpression).expression === node);
}

/** @internal */
export function isRightSideOfQualifiedNameOrPropertyAccess(node: Node) {
    // return (node.parent.kind === SyntaxKind.QualifiedName && (node.parent as QualifiedName).right === node) ||
     return   (node.parent.kind === SyntaxKind.PropertyAccessExpression && (node.parent as PropertyAccessExpression).name === node);
   //     (node.parent.kind === SyntaxKind.MetaProperty && (node.parent as MetaProperty).name === node);
}

/** @internal */
export function isRightSideOfAccessExpression(node: Node) {
    return !!node.parent && (isPropertyAccessExpression(node.parent) && node.parent.name === node
        || isElementAccessExpression(node.parent) && node.parent.argumentExpression === node);
}

/** @internal */
export function isRightSideOfQualifiedNameOrPropertyAccessOrJSDocMemberName(node: Node) {
    return isQualifiedName(node.parent) && node.parent.right === node
        || isPropertyAccessExpression(node.parent) && node.parent.name === node
        //|| isJSDocMemberName(node.parent) && node.parent.right === node;
        ;
}

/** @internal */
export function getEffectiveJSDocHost(node: Node): Node | undefined {
    const host = getJSDocHost(node);
    if (host) {
        return getSourceOfDefaultedAssignment(host)
            || getSourceOfAssignment(host)
            || getSingleInitializerOfVariableStatementOrPropertyDeclaration(host)
            || getSingleVariableOfVariableStatement(host)
            // || getNestedModuleDeclaration(host)
            || host;
    }
}

function getSourceOfAssignment(node: Node): Node | undefined {
    return isExpressionStatement(node) &&
            isBinaryExpression(node.expression) &&
            node.expression.operatorToken.kind === SyntaxKind.EqualsToken
        ? getRightMostAssignedExpression(node.expression)
        : undefined;
}

/** @internal */
export function getRightMostAssignedExpression(node: Expression): Expression {
    while (isAssignmentExpression(node, /*excludeCompoundAssignment*/ true)) {
        node = node.right;
    }
    return node;
}

/** @internal */
export function getHostSignatureFromJSDoc(node: Node): SignatureDeclaration | undefined {
    const host = getEffectiveJSDocHost(node);
    if (host) {
        return isPropertySignature(host) && host.type && isFunctionLike(host.type) ? host.type :
            isFunctionLike(host) ? host : undefined;
    }
    return undefined;
}

/** @internal */
export function isInJSFile(node: Node | undefined): boolean {
    return true;
    // return false;
    // return !!node && !!(node.flags & NodeFlags.JavaScriptFile);
}

/** @internal */
export function getFirstIdentifier(node: EntityNameOrEntityNameExpression): Identifier {
    switch (node.kind) {
        case SyntaxKind.Identifier:
            return node;
        case SyntaxKind.QualifiedName:
            do {
                node = node.left;
            }
            while (node.kind !== SyntaxKind.Identifier);
            return node;
        case SyntaxKind.PropertyAccessExpression:
            do {
                node = node.expression;
            }
            while (node.kind !== SyntaxKind.Identifier);
            return node;
    }
}

/** @internal */
export function entityNameToString(name: EntityNameOrEntityNameExpression | JSDocMemberName): string {
    switch (name.kind) {
        // case SyntaxKind.ThisKeyword:
        //     return "this";
        // case SyntaxKind.PrivateIdentifier:
        case SyntaxKind.Identifier:
            return getFullWidth(name) === 0 ? idText(name) : getTextOfNode(name);
        case SyntaxKind.QualifiedName:
            return entityNameToString(name.left) + "." + entityNameToString(name.right);
        case SyntaxKind.PropertyAccessExpression:
            if (isIdentifier(name.name) /*|| isPrivateIdentifier(name.name)*/) {
                return entityNameToString(name.expression) + "." + entityNameToString(name.name);
            }
            else {
                return Debug.assertNever(name.name);
            }
        case SyntaxKind.JSDocMemberName:
            return entityNameToString(name.left) + "#" + entityNameToString(name.right);
        default:
            return Debug.assertNever(name);
    }
}


/** @internal */
export function getInvokedExpression(node: CallLikeExpression): Expression | ConciseBody | undefined {
    switch (node.kind) {        
        // case SyntaxKind.BinaryExpression:
        //     return node.right;        
        case SyntaxKind.InlineClosureExpression:
            return node.body;
        default:
            return !node.expression || isTypeNode(node.expression) ? undefined : node.expression;
    }
}

const indentStrings: string[] = ["", "    "];
/** @internal */
export function getIndentString(level: number) {
    // prepopulate cache
    const singleLevel = indentStrings[1];
    for (let current = indentStrings.length; current <= level; current++) {
        indentStrings.push(indentStrings[current - 1] + singleLevel);
    }
    return indentStrings[level];
}

function getIndentSize() {
    return indentStrings[1].length;
}


/** @internal */
export function createTextWriter(newLine: string): EmitTextWriter {
    // Why var? It avoids TDZ checks in the runtime which can be costly.
    // See: https://github.com/microsoft/TypeScript/issues/52924
    /* eslint-disable no-var */
    var output: string;
    var indent: number;
    var lineStart: boolean;
    var lineCount: number;
    var linePos: number;
    var hasTrailingComment = false;
    /* eslint-enable no-var */

    function updateLineCountAndPosFor(s: string) {
        const lineStartsOfS = computeLineStarts(s);
        if (lineStartsOfS.length > 1) {
            lineCount = lineCount + lineStartsOfS.length - 1;
            linePos = output.length - s.length + last(lineStartsOfS);
            lineStart = (linePos - output.length) === 0;
        }
        else {
            lineStart = false;
        }
    }

    function writeText(s: string) {
        if (s && s.length) {
            if (lineStart) {
                s = getIndentString(indent) + s;
                lineStart = false;
            }
            output += s;
            updateLineCountAndPosFor(s);
        }
    }

    function write(s: string) {
        if (s) hasTrailingComment = false;
        writeText(s);
    }

    function writeComment(s: string) {
        if (s) hasTrailingComment = true;
        writeText(s);
    }

    function reset(): void {
        output = "";
        indent = 0;
        lineStart = true;
        lineCount = 0;
        linePos = 0;
        hasTrailingComment = false;
    }

    function rawWrite(s: string) {
        if (s !== undefined) {
            output += s;
            updateLineCountAndPosFor(s);
            hasTrailingComment = false;
        }
    }

    function writeLiteral(s: string) {
        if (s && s.length) {
            write(s);
        }
    }

    function writeLine(force?: boolean) {
        if (!lineStart || force) {
            output += newLine;
            lineCount++;
            linePos = output.length;
            lineStart = true;
            hasTrailingComment = false;
        }
    }

    reset();

    return {
        write,
        rawWrite,
        writeLiteral,
        writeLine,
        increaseIndent: () => {
            indent++;
        },
        decreaseIndent: () => {
            indent--;
        },
        getIndent: () => indent,
        getTextPos: () => output.length,
        getLine: () => lineCount,
        getColumn: () => lineStart ? indent * getIndentSize() : output.length - linePos,
        getText: () => output,
        isAtStartOfLine: () => lineStart,
        hasTrailingComment: () => hasTrailingComment,
        hasTrailingWhitespace: () => !!output.length && isWhiteSpaceLike(output.charCodeAt(output.length - 1)),
        clear: reset,
        writeKeyword: write,
        writeOperator: write,
        writeParameter: write,
        writeProperty: write,
        writePunctuation: write,
        writeSpace: write,
        writeStringLiteral: write,
        writeSymbol: (s, _) => write(s),
        writeTrailingSemicolon: write,
        writeComment,
    };
}

/** @internal */
export function chainDiagnosticMessages(details: DiagnosticMessageChain | DiagnosticMessageChain[] | undefined, message: DiagnosticMessage, ...args: DiagnosticArguments): DiagnosticMessageChain {
    let text = getLocaleSpecificMessage(message);

    if (some(args)) {
        text = formatStringFromArgs(text, args);
    }
    return {
        messageText: text,
        category: message.category,
        code: message.code,

        next: details === undefined || Array.isArray(details) ? details as [] : [details],
    };
}

export function getEmitScriptTarget(options: CompilerOptions) {
    return ScriptTarget.Latest;
}

// This consists of the first 19 unprintable ASCII characters, canonical escapes, lineSeparator,
// paragraphSeparator, and nextLine. The latter three are just desirable to suppress new lines in
// the language service. These characters should be escaped when printing, and if any characters are added,
// the map below must be updated. Note that this regexp *does not* include the 'delete' character.
// There is no reason for this other than that JSON.stringify does not handle it either.
const doubleQuoteEscapedCharsRegExp = /[\\"\u0000-\u001f\t\v\f\b\r\n\u2028\u2029\u0085]/g;
const singleQuoteEscapedCharsRegExp = /[\\'\u0000-\u001f\t\v\f\b\r\n\u2028\u2029\u0085]/g;
// Template strings preserve simple LF newlines, still encode CRLF (or CR)
const backtickQuoteEscapedCharsRegExp = /\r\n|[\\`\u0000-\u001f\t\v\f\b\r\u2028\u2029\u0085]/g;
const escapedCharsMap = new Map(Object.entries({
    "\t": "\\t",
    "\v": "\\v",
    "\f": "\\f",
    "\b": "\\b",
    "\r": "\\r",
    "\n": "\\n",
    "\\": "\\\\",
    '"': '\\"',
    "'": "\\'",
    "`": "\\`",
    "\u2028": "\\u2028", // lineSeparator
    "\u2029": "\\u2029", // paragraphSeparator
    "\u0085": "\\u0085", // nextLine
    "\r\n": "\\r\\n", // special case for CRLFs in backticks
}));


function encodeUtf16EscapeSequence(charCode: number): string {
    const hexCharCode = charCode.toString(16).toUpperCase();
    const paddedHexCode = ("0000" + hexCharCode).slice(-4);
    return "\\u" + paddedHexCode;
}

function getReplacement(c: string, offset: number, input: string) {
    if (c.charCodeAt(0) === CharacterCodes.nullCharacter) {
        const lookAhead = input.charCodeAt(offset + c.length);
        if (lookAhead >= CharacterCodes._0 && lookAhead <= CharacterCodes._9) {
            // If the null character is followed by digits, print as a hex escape to prevent the result from parsing as an octal (which is forbidden in strict mode)
            return "\\x00";
        }
        // Otherwise, keep printing a literal \0 for the null character
        return "\\0";
    }
    return escapedCharsMap.get(c) || encodeUtf16EscapeSequence(c.charCodeAt(0));
}

/**
 * Based heavily on the abstract 'Quote'/'QuoteJSONString' operation from ECMA-262 (24.3.2.2),
 * but augmented for a few select characters (e.g. lineSeparator, paragraphSeparator, nextLine)
 * Note that this doesn't actually wrap the input in double quotes.
 *
 * @internal
 */
export function escapeString(s: string, quoteChar?: CharacterCodes.doubleQuote | CharacterCodes.singleQuote | CharacterCodes.backtick): string {
    const escapedCharsRegExp = quoteChar === CharacterCodes.backtick ? backtickQuoteEscapedCharsRegExp :
        quoteChar === CharacterCodes.singleQuote ? singleQuoteEscapedCharsRegExp :
        doubleQuoteEscapedCharsRegExp;
    return s.replace(escapedCharsRegExp, getReplacement);
}

/** @internal */
export function isSingleOrDoubleQuote(charCode: number) {
    return charCode === CharacterCodes.singleQuote || charCode === CharacterCodes.doubleQuote;
}

/** @internal */
export function canUsePropertyAccess(name: string, languageVersion: ScriptTarget): boolean {
    if (name.length === 0) {
        return false;
    }
    const firstChar = name.charCodeAt(0);
    return firstChar === CharacterCodes.hash ?
        name.length > 1 && isIdentifierStart(name.charCodeAt(1), languageVersion) :
        isIdentifierStart(firstChar, languageVersion);
}

/**
 * Strip off existed surrounding single quotes, double quotes, or backticks from a given string
 *
 * @return non-quoted string
 *
 * @internal
 */
export function stripQuotes(name: string) {
    const length = name.length;
    if (length >= 2 && name.charCodeAt(0) === name.charCodeAt(length - 1) && isQuoteOrBacktick(name.charCodeAt(0))) {
        return name.substring(1, length - 1);
    }
    return name;
}

function isQuoteOrBacktick(charCode: number) {
    return charCode === CharacterCodes.singleQuote ||
        charCode === CharacterCodes.doubleQuote ||
        charCode === CharacterCodes.backtick;
}

/**
 * Gets the effective type annotation of a variable, parameter, or property. If the node was
 * parsed in a JavaScript file, gets the type annotation from JSDoc.  Also gets the type of
 * functions only the JSDoc case.
 *
 * @internal
 */
export function getEffectiveTypeAnnotationNode(node: Node, originatingFile?: SourceFile): TypeNode | undefined {
    if (!isInJSFile(node) && isFunctionDeclaration(node)) return undefined;
    if (isTypeAliasDeclaration(node)) return undefined; // has a .type, is not a type annotation
    let type = (node as HasType).type;    
    if (!type && isVariableDeclaration(node) && isVariableStatement(node.parent.parent)) {
        type = node.parent.parent.type;
    }

    function tryGetJsDocType() {
        return isJSDocPropertyLikeTag(node) ? node.typeExpression && node.typeExpression.type : getJSDocType(node);
    }

    // If type is object or mixed keyword, try to use JSDoc type annotation first, failing back to the actual type keyword
    if (type && shouldJsDocTypeOverrideTypeNode(type)) {
        const jsDocType = tryGetJsDocType();        
        // return jsDocType ? isArrayTypeNode(jsDocType) ? jsDocType.elementType : jsDocType.kind !== type.kind ? jsDocType : type : type;
        // use the jsdoc kind if its different, otherwise use the real type annotation
        let possibleType = jsDocType && (jsDocType.kind !== type.kind || isArrayTypeNode(jsDocType)) ? jsDocType : type;
        if (isVariableDeclaration(node) && isIdentifier(node.name) && shouldJsDocTypeOverrideTypeNode(possibleType)) {
            // for a variable with a jsdoc overridable type, look to see if there is a @var tag            
            // we can't use the node's file, because that may be different. the @var tag will be in the file
            // that originated the type check
            if (originatingFile) {                            
                const varTagsSymbolTbl = originatingFile.locals.get(InternalSymbolName.VarDocTags)?.members;
                let varTagSymbol: Symbol;

                if (varTagsSymbolTbl && (varTagSymbol = varTagsSymbolTbl.get(node.name.text)) && varTagSymbol.declarations) {
                    const varTag = first(varTagSymbol.declarations) as JSDocVariableTag;
                    const varTagType = varTag.typeExpression?.type;
                    if (varTagType) {
                        possibleType = varTagType;
                    }                
                }
            } else {
                console.warn("originatingFile should be provided for variable declarations");
            }
        }
        return possibleType;
    } else if (type || !isInJSFile(node)) {
        return type;
    }

    return tryGetJsDocType();
}

function shouldJsDocTypeOverrideTypeNode(type: TypeNode): boolean {
    return isObjectOrMixedType(type) || 
        type.kind === SyntaxKind.FunctionKeyword ||
        type.kind === SyntaxKind.ClosureKeyword ||
        (type && isArrayTypeNode(type) && isObjectOrMixedType(type.elementType));        
}

export function isObjectOrMixedType(type: TypeNode | undefined): boolean {
    return type && (type.kind === SyntaxKind.ObjectKeyword || type.kind === SyntaxKind.MixedKeyword);
}

/** @internal */
export function hasContextSensitiveParameters(node: FunctionLikeDeclaration) {
    // Functions with type parameters are not context sensitive.
    
    // Functions with any parameters that lack type annotations are context sensitive.
    if (some(node.parameters, p => !getEffectiveTypeAnnotationNode(p))) {
        return true;
    }
    if (node.kind !== SyntaxKind.InlineClosureExpression) {
        // If the first parameter is not an explicit 'this' parameter, then the function has
        // an implicit 'this' parameter which is subject to contextual typing.
        const parameter = firstOrUndefined(node.parameters);
        // if (!(parameter && parameterIsThisKeyword(parameter))) {
        //     return true;
        // }
    }

    return false;
}

// Warning: This has the same semantics as the forEach family of functions,
//          in that traversal terminates in the event that 'visitor' supplies a truthy value.
/** @internal */
export function forEachReturnStatement<T>(body: Block | Statement, visitor: (stmt: ReturnStatement) => T): T | undefined {
    return traverse(body);

    function traverse(node: Node): T | undefined {
        switch (node.kind) {
            case SyntaxKind.ReturnStatement:
                return visitor(node as ReturnStatement);
            case SyntaxKind.CaseBlock:
            case SyntaxKind.Block:
            case SyntaxKind.IfStatement:
            case SyntaxKind.DoWhileStatement:
            case SyntaxKind.WhileStatement:
            case SyntaxKind.ForStatement:
            case SyntaxKind.ForEachStatement:            
            case SyntaxKind.SwitchStatement:
            case SyntaxKind.CaseClause:
            case SyntaxKind.DefaultClause:
            // case SyntaxKind.LabeledStatement:
            // case SyntaxKind.TryStatement:
            case SyntaxKind.CatchStatement:
                return forEachChild(node, traverse);
        }
    }
}

/** @internal */
export function compareDiagnostics(d1: Diagnostic, d2: Diagnostic): Comparison {
    return compareDiagnosticsSkipRelatedInformation(d1, d2) ||
        compareRelatedInformation(d1, d2) ||
        Comparison.EqualTo;
}

// A diagnostic with more elaboration should be considered *less than* a diagnostic
// with less elaboration that is otherwise similar.
function compareRelatedInformation(d1: Diagnostic, d2: Diagnostic): Comparison {
    if (!d1.relatedInformation && !d2.relatedInformation) {
        return Comparison.EqualTo;
    }
    if (d1.relatedInformation && d2.relatedInformation) {
        return compareValues(d2.relatedInformation.length, d1.relatedInformation.length) || forEach(d1.relatedInformation, (d1i, index) => {
            const d2i = d2.relatedInformation![index];
            return compareDiagnostics(d1i, d2i); // EqualTo is 0, so falsy, and will cause the next item to be compared
        }) || Comparison.EqualTo;
    }
    return d1.relatedInformation ? Comparison.LessThan : Comparison.GreaterThan;
}

/** @internal */
export function getMembersOfDeclaration(node: Declaration): NodeArray<ClassElement | TypeElement | ObjectLiteralElement> | undefined {
    switch (node.kind) {
        // case SyntaxKind.InterfaceDeclaration:
        // case SyntaxKind.ClassDeclaration:
        case SyntaxKind.ClassExpression:
        case SyntaxKind.TypeLiteral:
            return (node as ObjectTypeDeclaration).members;
        case SyntaxKind.ObjectLiteralExpression:
            return (node as ObjectLiteralExpression).properties;        
    }
}

/** @internal */
export function isThisInitializedDeclaration(node: Node | undefined): boolean {
    return false;//return !!node && isVariableDeclaration(node) && node.initializer?.kind === SyntaxKind.ThisKeyword;
}

const stringWriter = createSingleLineStringWriter();

function createSingleLineStringWriter(): EmitTextWriter {
    // Why var? It avoids TDZ checks in the runtime which can be costly.
    // See: https://github.com/microsoft/TypeScript/issues/52924
    /* eslint-disable no-var */
    var str = "";
    /* eslint-enable no-var */
    const writeText: (text: string) => void = text => str += text;
    return {
        getText: () => str,
        write: writeText,
        rawWrite: writeText,
        writeKeyword: writeText,
        writeOperator: writeText,
        writePunctuation: writeText,
        writeSpace: writeText,
        writeStringLiteral: writeText,
        writeLiteral: writeText,
        writeParameter: writeText,
        writeProperty: writeText,
        writeSymbol: (s, _) => writeText(s),
        writeTrailingSemicolon: writeText,
        writeComment: writeText,
        getTextPos: () => str.length,
        getLine: () => 0,
        getColumn: () => 0,
        getIndent: () => 0,
        isAtStartOfLine: () => false,
        hasTrailingComment: () => false,
        hasTrailingWhitespace: () => !!str.length && isWhiteSpaceLike(str.charCodeAt(str.length - 1)),

        // Completely ignore indentation for string writers.  And map newlines to
        // a single space.
        writeLine: () => str += " ",
        increaseIndent: noop,
        decreaseIndent: noop,
        clear: () => str = "",
    };
}

/** @internal */
export const enum OperatorPrecedence {
    // Expression:
    //     AssignmentExpression
    //     Expression `,` AssignmentExpression
    Comma,

    // NOTE: `Spread` is higher than `Comma` due to how it is parsed in |ElementList|
    // SpreadElement:
    //     `...` AssignmentExpression
    Spread,

    // AssignmentExpression:
    //     ConditionalExpression
    //     YieldExpression
    //     ArrowFunction
    //     AsyncArrowFunction
    //     LeftHandSideExpression `=` AssignmentExpression
    //     LeftHandSideExpression AssignmentOperator AssignmentExpression
    //
    // NOTE: AssignmentExpression is broken down into several precedences due to the requirements
    //       of the parenthesizer rules.

    // AssignmentExpression: YieldExpression
    // YieldExpression:
    //     `yield`
    //     `yield` AssignmentExpression
    //     `yield` `*` AssignmentExpression
    Yield,

    // AssignmentExpression: LeftHandSideExpression `=` AssignmentExpression
    // AssignmentExpression: LeftHandSideExpression AssignmentOperator AssignmentExpression
    // AssignmentOperator: one of
    //     `*=` `/=` `%=` `+=` `-=` `<<=` `>>=` `>>>=` `&=` `^=` `|=` `**=`
    Assignment,

    // NOTE: `Conditional` is considered higher than `Assignment` here, but in reality they have
    //       the same precedence.
    // AssignmentExpression: ConditionalExpression
    // ConditionalExpression:
    //     ShortCircuitExpression
    //     ShortCircuitExpression `?` AssignmentExpression `:` AssignmentExpression
    // ShortCircuitExpression:
    //     LogicalORExpression
    //     CoalesceExpression
    Conditional,

    // CoalesceExpression:
    //     CoalesceExpressionHead `??` BitwiseORExpression
    // CoalesceExpressionHead:
    //     CoalesceExpression
    //     BitwiseORExpression
    Coalesce = Conditional, // NOTE: This is wrong

    // LogicalORExpression:
    //     LogicalANDExpression
    //     LogicalORExpression `||` LogicalANDExpression
    LogicalOR,

    // LogicalANDExpression:
    //     BitwiseORExpression
    //     LogicalANDExprerssion `&&` BitwiseORExpression
    LogicalAND,

    // BitwiseORExpression:
    //     BitwiseXORExpression
    //     BitwiseORExpression `^` BitwiseXORExpression
    BitwiseOR,

    // BitwiseXORExpression:
    //     BitwiseANDExpression
    //     BitwiseXORExpression `^` BitwiseANDExpression
    BitwiseXOR,

    // BitwiseANDExpression:
    //     EqualityExpression
    //     BitwiseANDExpression `^` EqualityExpression
    BitwiseAND,

    // EqualityExpression:
    //     RelationalExpression
    //     EqualityExpression `==` RelationalExpression
    //     EqualityExpression `!=` RelationalExpression
    //     EqualityExpression `===` RelationalExpression
    //     EqualityExpression `!==` RelationalExpression
    Equality,

    // RelationalExpression:
    //     ShiftExpression
    //     RelationalExpression `<` ShiftExpression
    //     RelationalExpression `>` ShiftExpression
    //     RelationalExpression `<=` ShiftExpression
    //     RelationalExpression `>=` ShiftExpression
    //     RelationalExpression `instanceof` ShiftExpression
    //     RelationalExpression `in` ShiftExpression
    //     [+TypeScript] RelationalExpression `as` Type
    Relational,

    // ShiftExpression:
    //     AdditiveExpression
    //     ShiftExpression `<<` AdditiveExpression
    //     ShiftExpression `>>` AdditiveExpression
    //     ShiftExpression `>>>` AdditiveExpression
    Shift,

    // AdditiveExpression:
    //     MultiplicativeExpression
    //     AdditiveExpression `+` MultiplicativeExpression
    //     AdditiveExpression `-` MultiplicativeExpression
    Additive,

    // MultiplicativeExpression:
    //     ExponentiationExpression
    //     MultiplicativeExpression MultiplicativeOperator ExponentiationExpression
    // MultiplicativeOperator: one of `*`, `/`, `%`
    Multiplicative,

    // ExponentiationExpression:
    //     UnaryExpression
    //     UpdateExpression `**` ExponentiationExpression
    Exponentiation,

    // UnaryExpression:
    //     UpdateExpression
    //     `delete` UnaryExpression
    //     `void` UnaryExpression
    //     `typeof` UnaryExpression
    //     `+` UnaryExpression
    //     `-` UnaryExpression
    //     `~` UnaryExpression
    //     `!` UnaryExpression
    //     AwaitExpression
    // UpdateExpression:            // TODO: Do we need to investigate the precedence here?
    //     `++` UnaryExpression
    //     `--` UnaryExpression
    Unary,

    // UpdateExpression:
    //     LeftHandSideExpression
    //     LeftHandSideExpression `++`
    //     LeftHandSideExpression `--`
    Update,

    // LeftHandSideExpression:
    //     NewExpression
    //     CallExpression
    // NewExpression:
    //     MemberExpression
    //     `new` NewExpression
    LeftHandSide,

    // CallExpression:
    //     CoverCallExpressionAndAsyncArrowHead
    //     SuperCall
    //     ImportCall
    //     CallExpression Arguments
    //     CallExpression `[` Expression `]`
    //     CallExpression `.` IdentifierName
    //     CallExpression TemplateLiteral
    // MemberExpression:
    //     PrimaryExpression
    //     MemberExpression `[` Expression `]`
    //     MemberExpression `.` IdentifierName
    //     MemberExpression TemplateLiteral
    //     SuperProperty
    //     MetaProperty
    //     `new` MemberExpression Arguments
    Member,

    // TODO: JSXElement?
    // PrimaryExpression:
    //     `this`
    //     IdentifierReference
    //     Literal
    //     ArrayLiteral
    //     ObjectLiteral
    //     FunctionExpression
    //     ClassExpression
    //     GeneratorExpression
    //     AsyncFunctionExpression
    //     AsyncGeneratorExpression
    //     RegularExpressionLiteral
    //     TemplateLiteral
    //     CoverParenthesizedExpressionAndArrowParameterList
    Primary,

    Highest = Primary,
    Lowest = Comma,
    // -1 is lower than all other precedences. Returning it will cause binary expression
    // parsing to stop.
    Invalid = -1,
}


/** @internal */
export function usingSingleLineStringWriter(action: (writer: EmitTextWriter) => void): string {
    const oldString = stringWriter.getText();
    try {
        action(stringWriter);
        return stringWriter.getText();
    }
    finally {
        stringWriter.clear();
        stringWriter.writeKeyword(oldString);
    }
}

/** @internal */
export function getOperatorPrecedence(nodeKind: SyntaxKind, operatorKind: SyntaxKind, hasArguments?: boolean) {
    switch (nodeKind) {
        case SyntaxKind.CommaListExpression:
            return OperatorPrecedence.Comma;

        case SyntaxKind.SpreadElement:
            return OperatorPrecedence.Spread;

        // case SyntaxKind.YieldExpression:
        //     return OperatorPrecedence.Yield;

        case SyntaxKind.ConditionalExpression:
            return OperatorPrecedence.Conditional;

        case SyntaxKind.BinaryExpression:
            switch (operatorKind) {
                case SyntaxKind.CommaToken:
                    return OperatorPrecedence.Comma;

                case SyntaxKind.EqualsToken:
                case SyntaxKind.PlusEqualsToken:
                case SyntaxKind.MinusEqualsToken:
                case SyntaxKind.AsteriskAsteriskEqualsToken:
                case SyntaxKind.AsteriskEqualsToken:
                case SyntaxKind.SlashEqualsToken:
                case SyntaxKind.PercentEqualsToken:
                case SyntaxKind.LessThanLessThanEqualsToken:
                case SyntaxKind.GreaterThanGreaterThanEqualsToken:
                case SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
                case SyntaxKind.AmpersandEqualsToken:
                case SyntaxKind.CaretEqualsToken:
                case SyntaxKind.BarEqualsToken:
                case SyntaxKind.BarBarEqualsToken:
                // case SyntaxKind.AmpersandAmpersandEqualsToken:
                case SyntaxKind.QuestionQuestionEqualsToken:
                    return OperatorPrecedence.Assignment;

                default:
                    return getBinaryOperatorPrecedence(operatorKind);
            }

        // TODO: Should prefix `++` and `--` be moved to the `Update` precedence?
        // case SyntaxKind.TypeAssertionExpression:
        // case SyntaxKind.NonNullExpression:
        case SyntaxKind.PrefixUnaryExpression:
        // case SyntaxKind.TypeOfExpression:
        // case SyntaxKind.VoidExpression:
        // case SyntaxKind.DeleteExpression:
        // case SyntaxKind.AwaitExpression:
            return OperatorPrecedence.Unary;

        case SyntaxKind.PostfixUnaryExpression:
            return OperatorPrecedence.Update;

        case SyntaxKind.CallExpression:
            return OperatorPrecedence.LeftHandSide;

        case SyntaxKind.NewExpression:
            return hasArguments ? OperatorPrecedence.Member : OperatorPrecedence.LeftHandSide;

        // case SyntaxKind.TaggedTemplateExpression:
        case SyntaxKind.PropertyAccessExpression:
        case SyntaxKind.ElementAccessExpression:
        // case SyntaxKind.MetaProperty:
            return OperatorPrecedence.Member;

        // case SyntaxKind.AsExpression:
        // case SyntaxKind.SatisfiesExpression:
        //     return OperatorPrecedence.Relational;

        // case SyntaxKind.ThisKeyword:
        case SyntaxKind.SuperKeyword:
        case SyntaxKind.Identifier:
        // case SyntaxKind.PrivateIdentifier:
        case SyntaxKind.NullKeyword:
        case SyntaxKind.TrueKeyword:
        case SyntaxKind.FalseKeyword:
        case SyntaxKind.IntLiteral:
        case SyntaxKind.FloatLiteral:
        case SyntaxKind.StringLiteral:
        case SyntaxKind.ArrayLiteralExpression:
        case SyntaxKind.ObjectLiteralExpression:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.InlineClosureExpression:
        case SyntaxKind.ClassExpression:
        // case SyntaxKind.RegularExpressionLiteral:
        // case SyntaxKind.NoSubstitutionTemplateLiteral:
        // case SyntaxKind.TemplateExpression:
        case SyntaxKind.ParenthesizedExpression:
        // case SyntaxKind.OmittedExpression:
        // case SyntaxKind.JsxElement:
        // case SyntaxKind.JsxSelfClosingElement:
        // case SyntaxKind.JsxFragment:
            return OperatorPrecedence.Primary;

        default:
            return OperatorPrecedence.Invalid;
    }
}

/** @internal */
export function getBinaryOperatorPrecedence(kind: SyntaxKind): OperatorPrecedence {
    switch (kind) {
        case SyntaxKind.QuestionQuestionToken:
            return OperatorPrecedence.Coalesce;
        case SyntaxKind.BarBarToken:
            return OperatorPrecedence.LogicalOR;
        case SyntaxKind.AmpersandAmpersandToken:
            return OperatorPrecedence.LogicalAND;
        case SyntaxKind.BarToken:
            return OperatorPrecedence.BitwiseOR;
        case SyntaxKind.CaretToken:
            return OperatorPrecedence.BitwiseXOR;
        case SyntaxKind.AmpersandToken:
            return OperatorPrecedence.BitwiseAND;
        case SyntaxKind.EqualsEqualsToken:
        case SyntaxKind.ExclamationEqualsToken:
        case SyntaxKind.EqualsEqualsEqualsToken:
        case SyntaxKind.ExclamationEqualsEqualsToken:
            return OperatorPrecedence.Equality;
        case SyntaxKind.LessThanToken:
        case SyntaxKind.GreaterThanToken:
        case SyntaxKind.LessThanEqualsToken:
        case SyntaxKind.GreaterThanEqualsToken:
        // case SyntaxKind.InstanceOfKeyword:
        case SyntaxKind.InKeyword:
        // case SyntaxKind.AsKeyword:
        // case SyntaxKind.SatisfiesKeyword:
            return OperatorPrecedence.Relational;
        case SyntaxKind.LessThanLessThanToken:
        case SyntaxKind.GreaterThanGreaterThanToken:
        case SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
            return OperatorPrecedence.Shift;
        case SyntaxKind.PlusToken:
        case SyntaxKind.MinusToken:
            return OperatorPrecedence.Additive;
        case SyntaxKind.AsteriskToken:
        case SyntaxKind.SlashToken:
        case SyntaxKind.PercentToken:
            return OperatorPrecedence.Multiplicative;
        case SyntaxKind.AsteriskAsteriskToken:
            return OperatorPrecedence.Exponentiation;        
        case SyntaxKind.EqualsToken:            
            // in LPC, this is valid syntax:  if(!foo || foo = "") { ... }        
            // so even though assignment operators are lower precendence, inside a binary
            // expression, they are higher precedence than logical operators
            return OperatorPrecedence.Relational;
    }

    // -1 is lower than all other precedences.  Returning it will cause binary expression
    // parsing to stop.
    return -1;
}

/** @internal */
export function getExpressionPrecedence(expression: Expression) {
    const operator = getOperator(expression);
    const hasArguments = expression.kind === SyntaxKind.NewExpression && (expression as NewExpression).arguments !== undefined;
    return getOperatorPrecedence(expression.kind, operator, hasArguments);
}


function getOperator(expression: Expression): SyntaxKind {
    if (expression.kind === SyntaxKind.BinaryExpression) {
        return (expression as BinaryExpression).operatorToken.kind;
    }
    else if (expression.kind === SyntaxKind.PrefixUnaryExpression || expression.kind === SyntaxKind.PostfixUnaryExpression) {
        return (expression as PrefixUnaryExpression | PostfixUnaryExpression).operator;
    }
    else {
        return expression.kind;
    }
}

/** @internal */
export const enum Associativity {
    Left,
    Right,
}


/** @internal */
export function getExpressionAssociativity(expression: Expression) {
    const operator = getOperator(expression);
    const hasArguments = expression.kind === SyntaxKind.NewExpression && (expression as NewExpression).arguments !== undefined;
    return getOperatorAssociativity(expression.kind, operator, hasArguments);
}

/** @internal */
export function getOperatorAssociativity(kind: SyntaxKind, operator: SyntaxKind, hasArguments?: boolean) {
    switch (kind) {
        case SyntaxKind.NewExpression:
            return hasArguments ? Associativity.Left : Associativity.Right;

        case SyntaxKind.PrefixUnaryExpression:
        // case SyntaxKind.TypeOfExpression:
        // case SyntaxKind.VoidExpression:
        // case SyntaxKind.DeleteExpression:
        // case SyntaxKind.AwaitExpression:
        case SyntaxKind.ConditionalExpression:
        // case SyntaxKind.YieldExpression:
            return Associativity.Right;

        case SyntaxKind.BinaryExpression:
            switch (operator) {
                case SyntaxKind.AsteriskAsteriskToken:
                case SyntaxKind.EqualsToken:
                case SyntaxKind.PlusEqualsToken:
                case SyntaxKind.MinusEqualsToken:
                case SyntaxKind.AsteriskAsteriskEqualsToken:
                case SyntaxKind.AsteriskEqualsToken:
                case SyntaxKind.SlashEqualsToken:
                case SyntaxKind.PercentEqualsToken:
                case SyntaxKind.LessThanLessThanEqualsToken:
                case SyntaxKind.GreaterThanGreaterThanEqualsToken:
                case SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
                case SyntaxKind.AmpersandEqualsToken:
                case SyntaxKind.CaretEqualsToken:
                case SyntaxKind.BarEqualsToken:
                case SyntaxKind.BarBarEqualsToken:
                // case SyntaxKind.AmpersandAmpersandEqualsToken:
                case SyntaxKind.QuestionQuestionEqualsToken:
                    return Associativity.Right;
            }
    }
    return Associativity.Left;
}

/** @internal */
export function isCommaExpression(node: Expression): node is BinaryExpression & { operatorToken: Token<SyntaxKind.CommaToken>; } {
    return node.kind === SyntaxKind.BinaryExpression && (node as BinaryExpression).operatorToken.kind === SyntaxKind.CommaToken;
}

export function isCommaListExpression(node: Node): node is CommaListExpression {
    return node.kind === SyntaxKind.CommaListExpression;
}

/** @internal */
export function isCommaSequence(node: Expression): node is BinaryExpression & { operatorToken: Token<SyntaxKind.CommaToken>; } | CommaListExpression {
    return isCommaExpression(node) || isCommaListExpression(node);
}

/** @internal */
export function getLeftmostExpression(node: Expression, stopAtCallExpressions: boolean) {
    while (true) {
        switch (node.kind) {
            case SyntaxKind.PostfixUnaryExpression:
                node = (node as PostfixUnaryExpression).operand;
                continue;

            case SyntaxKind.BinaryExpression:
                node = (node as BinaryExpression).left;
                continue;

            case SyntaxKind.ConditionalExpression:
                node = (node as ConditionalExpression).condition;
                continue;

            // case SyntaxKind.TaggedTemplateExpression:
            //     node = (node as TaggedTemplateExpression).tag;
            //     continue;

            case SyntaxKind.CallExpression:
                if (stopAtCallExpressions) {
                    return node;
                }
                // falls through
            // case SyntaxKind.AsExpression:
            case SyntaxKind.ElementAccessExpression:
            case SyntaxKind.PropertyAccessExpression:
            // case SyntaxKind.NonNullExpression:
            case SyntaxKind.PartiallyEmittedExpression:
            // case SyntaxKind.SatisfiesExpression:
                node = (node as CallExpression | PropertyAccessExpression | ElementAccessExpression /*| AsExpression | NonNullExpression | */| PartiallyEmittedExpression).expression;
                continue;
        }

        return node;
    }
}

/**
 * Gets flags that control emit behavior of a node.
 *
 * @internal
 */
export function getInternalEmitFlags(node: Node): InternalEmitFlags {
    const emitNode = node.emitNode;
    return emitNode && emitNode.internalFlags || 0;
}

/**
 * Gets flags that control emit behavior of a node.
 *
 * @internal
 */
export function getEmitFlags(node: Node): EmitFlags {
    const emitNode = node.emitNode;
    return emitNode && emitNode.flags || 0;
}

/** @internal @knipignore */
export function rangeStartIsOnSameLineAsRangeEnd(range1: TextRange, range2: TextRange, sourceFile: SourceFile) {
    return positionsAreOnSameLine(getStartPositionOfRange(range1, sourceFile, /*includeComments*/ false), range2.end, sourceFile);
}

/** @internal */
export function rangeIsOnSingleLine(range: TextRange, sourceFile: SourceFile) {
    return rangeStartIsOnSameLineAsRangeEnd(range, range, sourceFile);
}

/** @internal */
export function rangeStartPositionsAreOnSameLine(range1: TextRange, range2: TextRange, sourceFile: SourceFile) {
    return positionsAreOnSameLine(
        getStartPositionOfRange(range1, sourceFile, /*includeComments*/ false),
        getStartPositionOfRange(range2, sourceFile, /*includeComments*/ false),
        sourceFile,
    );
}

/** @internal */
export function positionsAreOnSameLine(pos1: number, pos2: number, sourceFile: SourceFile) {
    return getLinesBetweenPositions(sourceFile, pos1, pos2) === 0;
}

/** @internal @knipignore */
export function getStartPositionOfRange(range: TextRange, sourceFile: SourceFile, includeComments: boolean) {
    return positionIsSynthesized(range.pos) ? -1 : skipTrivia(sourceFile.text, range.pos, /*stopAfterLineBreak*/ false, includeComments);
}

/** @internal */
export function getLinesBetweenRangeEndAndRangeStart(range1: TextRange, range2: TextRange, sourceFile: SourceFile, includeSecondRangeComments: boolean) {
    const range2Start = getStartPositionOfRange(range2, sourceFile, includeSecondRangeComments);
    return getLinesBetweenPositions(sourceFile, range1.end, range2Start);
}

/** @internal */
export function rangeEndIsOnSameLineAsRangeStart(range1: TextRange, range2: TextRange, sourceFile: SourceFile) {
    return positionsAreOnSameLine(range1.end, getStartPositionOfRange(range2, sourceFile, /*includeComments*/ false), sourceFile);
}

/** @internal */
export function getAssignmentDeclarationPropertyAccessKind(lhs: AccessExpression): AssignmentDeclarationKind {
    // if (isModuleExportsAccessExpression(lhs)) {
    //     // module.exports = expr
    //     return AssignmentDeclarationKind.ModuleExports;
    // }
    

    return AssignmentDeclarationKind.None;
}

/** @internal */
export function isSignedNumericLiteral(node: Node): node is PrefixUnaryExpression & { operand: IntLiteral; } {
    return isPrefixUnaryExpression(node) && (node.operator === SyntaxKind.PlusToken || node.operator === SyntaxKind.MinusToken) && isIntLiteral(node.operand);
}

/** @internal */
export function getPropertyNameForPropertyNameNode(name: PropertyName): string | undefined {
    switch (name.kind) {
        case SyntaxKind.Identifier:
        //case SyntaxKind.PrivateIdentifier:
            return name.text;
        case SyntaxKind.StringLiteral:
        //case SyntaxKind.NoSubstitutionTemplateLiteral:
        case SyntaxKind.IntLiteral:        
            return (name.text);
        case SyntaxKind.ComputedPropertyName:
            const nameExpression = name.expression;
            if (isStringOrNumericLiteralLike(nameExpression)) {
                return (nameExpression.text);
            }
            else if (isSignedNumericLiteral(nameExpression)) {
                if (nameExpression.operator === SyntaxKind.MinusToken) {
                    return tokenToString(nameExpression.operator) + nameExpression.operand.text as string;
                }
                return nameExpression.operand.text as string;
            }
            return undefined; 
        case SyntaxKind.ParenthesizedExpression:
            const parenNameExpression = skipParentParenthesis(name);
            if (isStringOrNumericLiteralLike(parenNameExpression)) {
                return (parenNameExpression.text);
            }
            return undefined;       
        default:
            return Debug.assertNever(name);
    }
}

/**
 * x.y OR x[0]
 */
function isLiteralLikeAccess(node: Node): node is /*LiteralLikeElementAccessExpression |*/ PropertyAccessExpression {
    return isPropertyAccessExpression(node);// || isLiteralLikeElementAccess(node);
}


/**
 * Does not handle signed numeric names like `a[+0]` - handling those would require handling prefix unary expressions
 * throughout late binding handling as well, which is awkward (but ultimately probably doable if there is demand)
 *
 * @internal
 */
export function getElementOrPropertyAccessArgumentExpressionOrName(node: AccessExpression): Identifier | StringLiteral | IntLiteral | ElementAccessExpression | undefined {
    if (isPropertyAccessExpression(node)) {
        const nameExpr = skipParentParenthesis(node.name);
        Debug.assert(isStringOrNumericLiteralLike(nameExpr) || isIdentifier(nameExpr));
        return nameExpr;
    }
    const arg = skipParentheses(node.argumentExpression);
    if (isIntLiteral(arg) || isStringLiteral(arg)) {
        return arg;
    }
    return node;
}

/** @internal */
export function getElementOrPropertyAccessName(node: LiteralLikeElementAccessExpression | PropertyAccessExpression): string;
/** @internal */
export function getElementOrPropertyAccessName(node: AccessExpression): string | undefined;
/** @internal */
export function getElementOrPropertyAccessName(node: AccessExpression): string | undefined {
    const name = getElementOrPropertyAccessArgumentExpressionOrName(node);
    if (name) {
        if (isIdentifier(name)) {
            return name.text;
        }
        if (isStringLiteral(name) || isIntLiteral(name)) {
            return (name.text);
        }
    }
    return undefined;
}


/**
 * Is the 'declared' name the same as the one in the initializer?
 * @return true for identical entity names, as well as ones where the initializer is prefixed with
 * 'window', 'self' or 'global'. For example:
 *
 * var my = my || {}
 * var min = window.min || {}
 * my.app = self.my.app || class { }
 *
 * @internal
 */
export function isSameEntityName(name: Expression, initializer: Expression): boolean {
    if (isPropertyNameLiteral(name) && isPropertyNameLiteral(initializer)) {
        return getTextOfIdentifierOrLiteral(name) === getTextOfIdentifierOrLiteral(initializer);
    }
    // if (
    //     isMemberName(name) && isLiteralLikeAccess(initializer) &&
    //     (
    //         isIdentifier(initializer.expression) &&
    //             (initializer.expression.text === "window" ||
    //                 initializer.expression.text === "self" ||
    //                 initializer.expression.text === "global"))
    // ) {
    //     return isSameEntityName(name, getNameOrArgument(initializer));
    // }
    if (isLiteralLikeAccess(name) && isLiteralLikeAccess(initializer)) {
        return getElementOrPropertyAccessName(name) === getElementOrPropertyAccessName(initializer)
            && isSameEntityName(name.expression, initializer.expression);
    }
    return false;
}

/**
 * Get the initializer, taking into account defaulted Javascript initializers
 *
 * @internal
 */
export function getEffectiveInitializer(node: HasExpressionInitializer) {
    if (
        isInJSFile(node) && node.initializer &&
        isBinaryExpression(node.initializer) &&
        (node.initializer.operatorToken.kind === SyntaxKind.BarBarToken) &&
        node.name && isEntityNameExpression(node.name) && isSameEntityName(node.name, node.initializer.left)
    ) {
        return node.initializer.right;
    }
    return node.initializer;
}

/** @internal */
export function isVariableLike(node: Node): node is VariableLikeDeclaration {
    if (node) {
        switch (node.kind) {
            case SyntaxKind.BindingElement:            
            case SyntaxKind.Parameter:
            case SyntaxKind.PropertyAssignment:
            case SyntaxKind.PropertyDeclaration:
            //case SyntaxKind.PropertySignature:
            case SyntaxKind.ShorthandPropertyAssignment:
            case SyntaxKind.VariableDeclaration:
                return true;
        }
    }
    return false;
}

/** @internal */
export function isBindingElementOfBareOrAccessedRequire(node: Node): node is BindingElementOfBareOrAccessedRequire {
    return isBindingElement(node) && isVariableDeclarationInitializedToBareOrAccessedRequire(node.parent.parent);
}

/** @internal */
export function isFunctionExpressionOrInlineClosure(node: Node): node is FunctionExpression | InlineClosureExpression {
    return node.kind === SyntaxKind.FunctionExpression || node.kind === SyntaxKind.InlineClosureExpression;
}

function getPos(range: Node) {
    return range.pos;
}

/**
 * Note: it is expected that the `nodeArray` and the `node` are within the same file.
 * For example, searching for a `SourceFile` in a `SourceFile[]` wouldn't work.
 *
 * @internal
 */
export function indexOfNode(nodeArray: readonly Node[], node: Node) {
    return binarySearch(nodeArray, node, getPos, compareValues);
}

/** @internal */
export function isNodeDescendantOf(node: Node, ancestor: Node | undefined): boolean {
    while (node) {
        if (node === ancestor) return true;
        node = node.parent;
    }
    return false;
}

export function isPartOfTypeNode(node: Node): boolean {
    if (SyntaxKind.FirstTypeNode <= node.kind && node.kind <= SyntaxKind.LastTypeNode) {
        return true;
    }

    switch (node.kind) {
        // case SyntaxKind.AnyKeyword:
        case SyntaxKind.UnknownKeyword:
        case SyntaxKind.IntKeyword:
        case SyntaxKind.FloatKeyword:
        case SyntaxKind.StringKeyword:
        // case SyntaxKind.BooleanKeyword:
        // case SyntaxKind.SymbolKeyword:
        case SyntaxKind.ObjectKeyword:
        // case SyntaxKind.UndefinedKeyword:
        case SyntaxKind.NullKeyword:
        case SyntaxKind.MappingKeyword:
        case SyntaxKind.MixedKeyword:
        // case SyntaxKind.NeverKeyword:
            return true;
        // case SyntaxKind.VoidKeyword:
        //     return node.parent.kind !== SyntaxKind.VoidExpression;
        // case SyntaxKind.ExpressionWithTypeArguments:
        //     return isPartOfTypeExpressionWithTypeArguments(node);
        case SyntaxKind.TypeParameter:
            return node.parent.kind === SyntaxKind.MappedType;// || node.parent.kind === SyntaxKind.InferType;

        // Identifiers and qualified names may be type nodes, depending on their context. Climb
        // above them to find the lowest container
        case SyntaxKind.Identifier:
            // If the identifier is the RHS of a qualified name, then it's a type iff its parent is.
            if (node.parent.kind === SyntaxKind.QualifiedName && (node.parent as QualifiedName).right === node) {
                node = node.parent;
            }
            else if (node.parent.kind === SyntaxKind.PropertyAccessExpression && (node.parent as PropertyAccessExpression).name === node) {
                node = node.parent;
            }
            // At this point, node is either a qualified name or an identifier
            Debug.assert(node.kind === SyntaxKind.Identifier || node.kind === SyntaxKind.QualifiedName || node.kind === SyntaxKind.PropertyAccessExpression, "'node' was expected to be a qualified name, identifier or property access in 'isPartOfTypeNode'.");
            // falls through

        //case SyntaxKind.ThisKeyword: 
        case SyntaxKind.QualifiedName:
        case SyntaxKind.PropertyAccessExpression: {
            const { parent } = node;
            // if (parent.kind === SyntaxKind.TypeQuery) {
            //     return false;
            // }
            // if (parent.kind === SyntaxKind.ImportType) {
            //     return !(parent as ImportTypeNode).isTypeOf;
            // }
            // Do not recursively call isPartOfTypeNode on the parent. In the example:
            //
            //     let a: A.B.C;
            //
            // Calling isPartOfTypeNode would consider the qualified name A.B a type node.
            // Only C and A.B.C are type nodes.
            if (SyntaxKind.FirstTypeNode <= parent.kind && parent.kind <= SyntaxKind.LastTypeNode) {
                return true;
            }
            switch (parent.kind) {
                // case SyntaxKind.ExpressionWithTypeArguments:
                //     return isPartOfTypeExpressionWithTypeArguments(parent);
                case SyntaxKind.TypeParameter:
                    return node === (parent as TypeParameterDeclaration).constraint;
                case SyntaxKind.JSDocTemplateTag:
                    return node === (parent as JSDocTemplateTag).constraint;
                case SyntaxKind.PropertyDeclaration:
                // case SyntaxKind.PropertySignature:
                case SyntaxKind.Parameter:
                case SyntaxKind.VariableDeclaration:
                    return node === (parent as HasType).type;
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.InlineClosureExpression:
                // case SyntaxKind.Constructor:
                // case SyntaxKind.MethodDeclaration:
                // case SyntaxKind.MethodSignature:
                // case SyntaxKind.GetAccessor:
                // case SyntaxKind.SetAccessor:
                    return node === (parent as FunctionLikeDeclaration).type;
                // case SyntaxKind.CallSignature:
                // case SyntaxKind.ConstructSignature:
                case SyntaxKind.IndexSignature:
                    return node === (parent as SignatureDeclaration).type;
                // case SyntaxKind.TypeAssertionExpression:
                //     return node === (parent as TypeAssertion).type;
                case SyntaxKind.CallExpression:
                case SyntaxKind.NewExpression:
                // case SyntaxKind.TaggedTemplateExpression:
                    return false;// contains((parent as CallExpression).typeArguments, node);
            }
        }
    }

    return false;
}

/** @internal */
export function isTypeAlias(node: Node): node is JSDocTypedefTag | JSDocCallbackTag | TypeAliasDeclaration | StructDeclaration {
    return isJSDocTypeAlias(node) || isTypeAliasDeclaration(node) || isStructDeclaration(node);
}

/** @internal */
export function getContainingFunctionOrClassStaticBlock(node: Node): SignatureDeclaration | undefined {
    return findAncestor(node.parent, isFunctionLikeOrClassStaticBlockDeclaration);
}

/**
 * Copy entries from `source` to `target`.
 *
 * @internal
 */
export function copyEntries<K, V>(source: ReadonlyMap<K, V>, target: Map<K, V>): void {
    source.forEach((value, key) => {
        target.set(key, value);
    });
}

/** @internal */
export function arrayIsHomogeneous<T>(array: readonly T[], comparer: EqualityComparer<T> = equateValues) {
    if (array.length < 2) return true;
    const first = array[0];
    for (let i = 1, length = array.length; i < length; i++) {
        const target = array[i];
        if (!comparer(first, target)) return false;
    }
    return true;
}

/** @internal */
export function isIdentifierTypeReference(node: Node): node is TypeReferenceNode & { typeName: Identifier; } {
    return isTypeReferenceNode(node) && isIdentifier(node.typeName);
}

/** @internal */
export function isLateVisibilityPaintedStatement(node: Node): node is LateVisibilityPaintedStatement {
    switch (node.kind) {
        // case SyntaxKind.ImportDeclaration:
        // case SyntaxKind.ImportEqualsDeclaration:
        case SyntaxKind.VariableStatement:
        // case SyntaxKind.ClassDeclaration:
        case SyntaxKind.FunctionDeclaration:
        // case SyntaxKind.ModuleDeclaration:
        // case SyntaxKind.TypeAliasDeclaration:
        // case SyntaxKind.InterfaceDeclaration:
        // case SyntaxKind.EnumDeclaration:
            return true;
        default:
            return false;
    }
}

function walkUp(node: Node, kind: SyntaxKind) {
    while (node && node.kind === kind) {
        node = node.parent;
    }
    return node;
}

/** @internal */
export function walkUpParenthesizedTypes(node: Node) {
    return walkUp(node, SyntaxKind.ParenthesizedType);
}

/** @internal */
export function getNameFromIndexInfo(info: IndexInfo): string | undefined {
    return info.declaration ? declarationNameToString(info.declaration.parameters[0].name) : undefined;
}

/**
 * Returns a value indicating whether a name is unique globally or within the current file.
 * Note: This does not consider whether a name appears as a free identifier or not, so at the expression `x.y` this includes both `x` and `y`.
 *
 * @internal
 */
export function isFileLevelUniqueName(sourceFile: SourceFile, name: string, hasGlobalName?: PrintHandlers["hasGlobalName"]): boolean {
    return !(hasGlobalName && hasGlobalName(name)) && !sourceFile.identifiers.has(name);
}

/** @internal */
export function isStringOrNumericLiteralLike(node: Node): node is StringLiteral | IntLiteral {
    return isStringLiteral(node) || isIntLiteral(node);
}

/**
 * Gets the symbolic name for a member from its type.
 * @internal
 */
export function getPropertyNameFromType(type: StringLiteralType | IntLiteralType ): string {    
    if (type.flags & (TypeFlags.StringLiteral | TypeFlags.IntLiteral)) {
        return ("" + (type as StringLiteralType | IntLiteralType).value);
    }
    return Debug.fail();
}

/** @internal */
export function isObjectLiteralMethod(node: Node) {//: node is MethodDeclaration {
    // TODO handle lpc object with methods here?
    return false;//return node && node.kind === SyntaxKind.MethodDeclaration && node.parent.kind === SyntaxKind.ObjectLiteralExpression;
}

/** @internal */
export function isNonNullAccess(node: Node): node is AccessExpression {
    const kind = node.kind;
    return (kind === SyntaxKind.PropertyAccessExpression
        || kind === SyntaxKind.ElementAccessExpression) && true;//isNonNullExpression((node as AccessExpression).expression);
}

/** @internal */
export function concatenateDiagnosticMessageChains(headChain: DiagnosticMessageChain, tailChain: DiagnosticMessageChain): void {
    let lastChain = headChain;
    while (lastChain.next) {
        lastChain = lastChain.next[0];
    }

    lastChain.next = [tailChain];
}

/** @internal */
export function getEffectiveModifierFlagsAlwaysIncludeJSDoc(node: Node): ModifierFlags {
    return getModifierFlagsWorker(node, /*includeJSDoc*/ true, /*alwaysIncludeJSDoc*/ true);
}


/** @internal */
export function minAndMax<T>(arr: readonly T[], getValue: (value: T) => number): { readonly min: number; readonly max: number; } {
    Debug.assert(arr.length !== 0);
    let min = getValue(arr[0]);
    let max = min;
    for (let i = 1; i < arr.length; i++) {
        const value = getValue(arr[i]);
        if (value < min) {
            min = value;
        }
        else if (value > max) {
            max = value;
        }
    }
    return { min, max };
}

/** @internal */
export function createDiagnosticMessageChainFromDiagnostic(diagnostic: DiagnosticRelatedInformation): DiagnosticMessageChain {
    return typeof diagnostic.messageText === "string" ? {
        code: diagnostic.code,
        category: diagnostic.category,
        messageText: diagnostic.messageText,
        next: (diagnostic as DiagnosticMessageChain).next,
    } : diagnostic.messageText;
}

/** @internal */
export function createDiagnosticForNodeArrayFromMessageChain(sourceFile: SourceFileBase, nodes: NodeArray<Node>, messageChain: DiagnosticMessageChain, relatedInformation?: DiagnosticRelatedInformation[]): DiagnosticWithLocation {
    const start = skipTrivia(sourceFile.text, nodes.pos);
    return createFileDiagnosticFromMessageChain(sourceFile, start, nodes.end - start, messageChain, relatedInformation);
}

/** @internal */
export function createDiagnosticForNodeArray(sourceFile: SourceFileBase, nodes: NodeArray<Node>, message: DiagnosticMessage, ...args: DiagnosticArguments): DiagnosticWithLocation {
    const start = skipTrivia(sourceFile.text, nodes.pos);
    return createFileDiagnostic(sourceFile, start, nodes.end - start, message, ...args);
}

/**
 *  Groups of supported extensions in order of file resolution precedence. (eg, TS > TSX > DTS and seperately, CTS > DCTS)
 */
const supportedLPCExtensions: readonly Extension[][] = [[Extension.Lpc, Extension.H, Extension.Lpc]];
/** @internal */
export const supportedTSExtensionsFlat: readonly Extension[] = flatten(supportedLPCExtensions);

/** @internal */
export function hasLPCFileExtension(fileName: string): boolean {
    return some(supportedTSExtensionsFlat, extension => fileExtensionIs(fileName, extension));
}

type CompilerOptionKeys = keyof { [K in keyof CompilerOptions as string extends K ? never : K]: any; };
function createComputedCompilerOptions<T extends Record<string, CompilerOptionKeys[]>>(
    options: {
        [K in keyof T & CompilerOptionKeys]: {
            dependencies: T[K];
            computeValue: (compilerOptions: Pick<CompilerOptions, K | T[K][number]>) => Exclude<CompilerOptions[K], undefined>;
        };
    },
) {
    return options;
}

/** @internal */
export const computedOptions = createComputedCompilerOptions({
    driverType: {
        dependencies: [],
        computeValue: compilerOptions => {
            const target = compilerOptions.driverType;
            return target ?? LanguageVariant.LDMud;                
        },
    },
});

/** @internal */
export const getDriverType = computedOptions.driverType.computeValue;


/** @internal */
export interface WildcardMatcher {
    singleAsteriskRegexFragment: string;
    doubleAsteriskRegexFragment: string;
    replaceWildcardCharacter: (match: string) => string;
}

const commonPackageFolders: readonly string[] = ["node_modules", "bower_components", "jspm_packages"];

const implicitExcludePathRegexPattern = `(?!(${commonPackageFolders.join("|")})(/|$))`;

const filesMatcher: WildcardMatcher = {
    /**
     * Matches any single directory segment unless it is the last segment and a .min.js file
     * Breakdown:
     *  [^./]                   # matches everything up to the first . character (excluding directory separators)
     *  (\\.(?!min\\.js$))?     # matches . characters but not if they are part of the .min.js file extension
     */
    singleAsteriskRegexFragment: "([^./]|(\\.(?!min\\.js$))?)*",
    /**
     * Regex for the ** wildcard. Matches any number of subdirectories. When used for including
     * files or directories, does not match subdirectories that start with a . character
     */
    doubleAsteriskRegexFragment: `(/${implicitExcludePathRegexPattern}[^/.][^/]*)*?`,
    replaceWildcardCharacter: match => replaceWildcardCharacter(match, filesMatcher.singleAsteriskRegexFragment),
};

function replaceWildcardCharacter(match: string, singleAsteriskRegexFragment: string) {
    return match === "*" ? singleAsteriskRegexFragment : match === "?" ? "[^/]" : "\\" + match;
}

const directoriesMatcher: WildcardMatcher = {
    singleAsteriskRegexFragment: "[^/]*",
    /**
     * Regex for the ** wildcard. Matches any number of subdirectories. When used for including
     * files or directories, does not match subdirectories that start with a . character
     */
    doubleAsteriskRegexFragment: `(/${implicitExcludePathRegexPattern}[^/.][^/]*)*?`,
    replaceWildcardCharacter: match => replaceWildcardCharacter(match, directoriesMatcher.singleAsteriskRegexFragment),
};

const excludeMatcher: WildcardMatcher = {
    singleAsteriskRegexFragment: "[^/]*",
    doubleAsteriskRegexFragment: "(/.+?)?",
    replaceWildcardCharacter: match => replaceWildcardCharacter(match, excludeMatcher.singleAsteriskRegexFragment),
};

const wildcardMatchers = {
    files: filesMatcher,
    directories: directoriesMatcher,
    exclude: excludeMatcher,
};

// Reserved characters, forces escaping of any non-word (or digit), non-whitespace character.
// It may be inefficient (we could just match (/[-[\]{}()*+?.,\\^$|#\s]/g), but this is future
// proof.
const reservedCharacterPattern = /[^\w\s/]/g;
 
/**
 * An "includes" path "foo" is implicitly a glob "foo/** /*" (without the space) if its last component has no extension,
 * and does not contain any glob characters itself.
 *
 * @internal
 */
export function isImplicitGlob(lastPathComponent: string): boolean {
    return !/[.*?]/.test(lastPathComponent);
}

/** @internal */
export function getSubPatternFromSpec(
    spec: string,
    basePath: string,
    usage: "files" | "directories" | "exclude",
    { singleAsteriskRegexFragment, doubleAsteriskRegexFragment, replaceWildcardCharacter }: WildcardMatcher = wildcardMatchers[usage],
): string | undefined {
    let subpattern = "";
    let hasWrittenComponent = false;
    const components = getNormalizedPathComponents(spec, basePath);
    const lastComponent = last(components);
    if (usage !== "exclude" && lastComponent === "**") {
        return undefined;
    }

    // getNormalizedPathComponents includes the separator for the root component.
    // We need to remove to create our regex correctly.
    components[0] = removeTrailingDirectorySeparator(components[0]);

    if (isImplicitGlob(lastComponent)) {
        components.push("**", "*");
    }

    let optionalCount = 0;
    for (let component of components) {
        if (component === "**") {
            subpattern += doubleAsteriskRegexFragment;
        }
        else {
            if (usage === "directories") {
                subpattern += "(";
                optionalCount++;
            }

            if (hasWrittenComponent) {
                subpattern += directorySeparator;
            }

            if (usage !== "exclude") {
                let componentPattern = "";
                // The * and ? wildcards should not match directories or files that start with . if they
                // appear first in a component. Dotted directories and files can be included explicitly
                // like so: **/.*/.*
                if (component.charCodeAt(0) === CharacterCodes.asterisk) {
                    componentPattern += "([^./]" + singleAsteriskRegexFragment + ")?";
                    component = component.substr(1);
                }
                else if (component.charCodeAt(0) === CharacterCodes.question) {
                    componentPattern += "[^./]";
                    component = component.substr(1);
                }

                componentPattern += component.replace(reservedCharacterPattern, replaceWildcardCharacter);

                // Patterns should not include subfolders like node_modules unless they are
                // explicitly included as part of the path.
                //
                // As an optimization, if the component pattern is the same as the component,
                // then there definitely were no wildcard characters and we do not need to
                // add the exclusion pattern.
                if (componentPattern !== component) {
                    subpattern += implicitExcludePathRegexPattern;
                }

                subpattern += componentPattern;
            }
            else {
                subpattern += component.replace(reservedCharacterPattern, replaceWildcardCharacter);
            }
        }

        hasWrittenComponent = true;
    }

    while (optionalCount > 0) {
        subpattern += ")?";
        optionalCount--;
    }

    return subpattern;
}

/** @internal */
export function getRegularExpressionsForWildcards(specs: readonly string[] | undefined, basePath: string, usage: "files" | "directories" | "exclude"): readonly string[] | undefined {
    if (specs === undefined || specs.length === 0) {
        return undefined;
    }

    return flatMap(specs, spec => spec && getSubPatternFromSpec(spec, basePath, usage, wildcardMatchers[usage]));
}

/** @internal */
export function getRegularExpressionForWildcard(specs: readonly string[] | undefined, basePath: string, usage: "files" | "directories" | "exclude"): string | undefined {
    const patterns = getRegularExpressionsForWildcards(specs, basePath, usage);
    if (!patterns || !patterns.length) {
        return undefined;
    }

    const pattern = patterns.map(pattern => `(${pattern})`).join("|");
    // If excluding, match "foo/bar/baz...", but if including, only allow "foo".
    const terminator = usage === "exclude" ? "($|/)" : "$";
    return `^(${pattern})${terminator}`;
}

/**
 * Computes the unique non-wildcard base paths amongst the provided include patterns.
 */
function getBasePaths(path: string, includes: readonly string[] | undefined, useCaseSensitiveFileNames: boolean): string[] {
    // Storage for our results in the form of literal paths (e.g. the paths as written by the user).
    const basePaths: string[] = [path];

    if (includes) {
        // Storage for literal base paths amongst the include patterns.
        const includeBasePaths: string[] = [];
        for (const include of includes) {
            // We also need to check the relative paths by converting them to absolute and normalizing
            // in case they escape the base path (e.g "..\somedirectory")
            const absolute: string = isRootedDiskPath(include) ? include : normalizePath(combinePaths(path, include));
            // Append the literal and canonical candidate base paths.
            includeBasePaths.push(getIncludeBasePath(absolute));
        }

        // Sort the offsets array using either the literal or canonical path representations.
        includeBasePaths.sort(getStringComparer(!useCaseSensitiveFileNames));

        // Iterate over each include base path and include unique base paths that are not a
        // subpath of an existing base path
        for (const includeBasePath of includeBasePaths) {
            if (every(basePaths, basePath => !containsPath(basePath, includeBasePath, path, !useCaseSensitiveFileNames))) {
                basePaths.push(includeBasePath);
            }
        }
    }

    return basePaths;
}

const wildcardCharCodes = [CharacterCodes.asterisk, CharacterCodes.question];

function getIncludeBasePath(absolute: string): string {
    const wildcardOffset = indexOfAnyCharCode(absolute, wildcardCharCodes);
    if (wildcardOffset < 0) {
        // No "*" or "?" in the path
        return !hasExtension(absolute)
            ? absolute
            : removeTrailingDirectorySeparator(getDirectoryPath(absolute));
    }
    return absolute.substring(0, absolute.lastIndexOf(directorySeparator, wildcardOffset));
}


/**
 * @param path directory of the tsconfig.json
 *
 * @internal
 */
export function getFileMatcherPatterns(path: string, excludes: readonly string[] | undefined, includes: readonly string[] | undefined, useCaseSensitiveFileNames: boolean, currentDirectory: string): FileMatcherPatterns {
    path = normalizePath(path);
    currentDirectory = normalizePath(currentDirectory);
    const absolutePath = combinePaths(currentDirectory, path);

    return {
        includeFilePatterns: map(getRegularExpressionsForWildcards(includes, absolutePath, "files"), pattern => `^${pattern}$`),
        includeFilePattern: getRegularExpressionForWildcard(includes, absolutePath, "files"),
        includeDirectoryPattern: getRegularExpressionForWildcard(includes, absolutePath, "directories"),
        excludePattern: getRegularExpressionForWildcard(excludes, absolutePath, "exclude"),
        basePaths: getBasePaths(path, includes, useCaseSensitiveFileNames),
    };
}

/** @internal */
export function getRegexFromPattern(pattern: string, useCaseSensitiveFileNames: boolean): RegExp {
    return new RegExp(pattern, useCaseSensitiveFileNames ? "" : "i");
}

/**
 * @param path directory of the tsconfig.json
 *
 * @internal
 */
export function matchFiles(path: string, extensions: readonly string[] | undefined, excludes: readonly string[] | undefined, includes: readonly string[] | undefined, useCaseSensitiveFileNames: boolean, currentDirectory: string, depth: number | undefined, getFileSystemEntries: (path: string) => FileSystemEntries, realpath: (path: string) => string): string[] {
    path = normalizePath(path);
    currentDirectory = normalizePath(currentDirectory);

    const patterns = getFileMatcherPatterns(path, excludes, includes, useCaseSensitiveFileNames, currentDirectory);

    const includeFileRegexes = patterns.includeFilePatterns && patterns.includeFilePatterns.map(pattern => getRegexFromPattern(pattern, useCaseSensitiveFileNames));
    const includeDirectoryRegex = patterns.includeDirectoryPattern && getRegexFromPattern(patterns.includeDirectoryPattern, useCaseSensitiveFileNames);
    const excludeRegex = patterns.excludePattern && getRegexFromPattern(patterns.excludePattern, useCaseSensitiveFileNames);

    // Associate an array of results with each include regex. This keeps results in order of the "include" order.
    // If there are no "includes", then just put everything in results[0].
    const results: string[][] = includeFileRegexes ? includeFileRegexes.map(() => []) : [[]];
    const visited = new Map<string, true>();
    const toCanonical = createGetCanonicalFileName(useCaseSensitiveFileNames);
    for (const basePath of patterns.basePaths) {
        visitDirectory(basePath, combinePaths(currentDirectory, basePath), depth);
    }

    return flatten(results);

    function visitDirectory(path: string, absolutePath: string, depth: number | undefined) {
        const canonicalPath = toCanonical(realpath(absolutePath));
        if (visited.has(canonicalPath)) return;
        visited.set(canonicalPath, true);
        const { files, directories } = getFileSystemEntries(path);

        for (const current of sort<string>(files, compareStringsCaseSensitive)) {
            const name = combinePaths(path, current);
            const absoluteName = combinePaths(absolutePath, current);
            if (extensions && !fileExtensionIsOneOf(name, extensions)) continue;
            if (excludeRegex && excludeRegex.test(absoluteName)) continue;
            if (!includeFileRegexes) {
                results[0].push(name);
            }
            else {
                const includeIndex = findIndex(includeFileRegexes, re => re.test(absoluteName));
                if (includeIndex !== -1) {
                    results[includeIndex].push(name);
                }
            }
        }

        if (depth !== undefined) {
            depth--;
            if (depth === 0) {
                return;
            }
        }

        for (const current of sort<string>(directories, compareStringsCaseSensitive)) {
            const name = combinePaths(path, current);
            const absoluteName = combinePaths(absolutePath, current);
            if (
                (!includeDirectoryRegex || includeDirectoryRegex.test(absoluteName)) &&
                (!excludeRegex || !excludeRegex.test(absoluteName))
            ) {
                visitDirectory(name, absoluteName, depth);
            }
        }
    }
}

/** @internal */
export interface FileMatcherPatterns {
    /** One pattern for each "include" spec. */
    includeFilePatterns: readonly string[] | undefined;
    /** One pattern matching one of any of the "include" specs. */
    includeFilePattern: string | undefined;
    includeDirectoryPattern: string | undefined;
    excludePattern: string | undefined;
    basePaths: readonly string[];
}

/** @internal */
export interface MutateMapSkippingNewValuesDelete<K, T> {
    onDeleteValue(existingValue: T, key: K): void;
}

/** @internal */
export interface MutateMapOptionsCreate<K, T, U> {
    createNewValue(key: K, valueInNewMap: U): T;
}

/** @internal */
export interface MutateMapWithNewSetOptions<K, T> extends MutateMapSkippingNewValuesDelete<K, T>, MutateMapOptionsCreate<K, T, K> {
}

/** @internal */
export interface MutateMapSkippingNewValuesOptions<K, T, U> extends MutateMapSkippingNewValuesDelete<K, T> {
    /**
     * If present this is called with the key when there is value for that key both in new map as well as existing map provided
     * Caller can then decide to update or remove this key.
     * If the key is removed, caller will get callback of createNewValue for that key.
     * If this callback is not provided, the value of such keys is not updated.
     */
    onExistingValue?(existingValue: T, valueInNewMap: U, key: K): void;
}


/** @internal */
export interface MutateMapOptions<K, T, U> extends MutateMapSkippingNewValuesOptions<K, T, U>, MutateMapOptionsCreate<K, T, U> {
}


/**
 * Mutates the map with newMap such that keys in map will be same as newMap.
 *
 * @internal
 */
export function mutateMapSkippingNewValues<K, T>(
    map: Map<K, T>,
    newMap: ReadonlySet<K> | undefined,
    options: MutateMapSkippingNewValuesDelete<K, T>,
): void;
/** @internal */
export function mutateMapSkippingNewValues<K, T, U>(
    map: Map<K, T>,
    newMap: ReadonlyMap<K, U> | undefined,
    options: MutateMapSkippingNewValuesOptions<K, T, U>,
): void;
export function mutateMapSkippingNewValues<K, T, U>(
    map: Map<K, T>,
    newMap: ReadonlyMap<K, U> | ReadonlySet<K> | undefined,
    options: MutateMapSkippingNewValuesOptions<K, T, U>,
) {
    const { onDeleteValue, onExistingValue } = options;
    // Needs update
    map.forEach((existingValue, key) => {
        // Not present any more in new map, remove it
        if (!newMap?.has(key)) {
            map.delete(key);
            onDeleteValue(existingValue, key);
        }
        // If present notify about existing values
        else if (onExistingValue) {
            onExistingValue(existingValue, (newMap as Map<K, U>).get?.(key)!, key);
        }
    });
}


/**
 * Mutates the map with newMap such that keys in map will be same as newMap.
 *
 * @internal
 */
export function mutateMap<K, T>(map: Map<K, T>, newMap: ReadonlySet<K> | undefined, options: MutateMapWithNewSetOptions<K, T>): void;
/** @internal */
export function mutateMap<K, T, U>(map: Map<K, T>, newMap: ReadonlyMap<K, U> | undefined, options: MutateMapOptions<K, T, U>): void;
export function mutateMap<K, T, U>(map: Map<K, T>, newMap: ReadonlyMap<K, U> | ReadonlySet<K> | undefined, options: MutateMapOptions<K, T, U>) {
    // Needs update
    mutateMapSkippingNewValues(map, newMap as ReadonlyMap<K, U>, options);

    const { createNewValue } = options;
    // Add new values that are not already present
    newMap?.forEach((valueInNewMap, key) => {
        if (!map.has(key)) {
            // New values
            map.set(key, createNewValue(key, valueInNewMap as U & K));
        }
    });
}


/**
 * `forEachEntry` for just keys.
 *
 * @internal
 */
export function forEachKey<K, T>(map: ReadonlyCollection<K>, callback: (key: K) => T | undefined): T | undefined {
    const iterator = map.keys();
    for (const key of iterator) {
        const result = callback(key);
        if (result) {
            return result;
        }
    }
    return undefined;
}

/**
 * clears already present map by calling onDeleteExistingValue callback before deleting that key/value
 *
 * @internal
 */
export function clearMap<K, T>(map: { forEach: Map<K, T>["forEach"]; clear: Map<K, T>["clear"]; }, onDeleteValue: (valueInMap: T, key: K) => void) {
    // Remove all
    map.forEach(onDeleteValue);
    map.clear();
}

/** @internal */
export function isJsonEqual(a: unknown, b: unknown): boolean {
    // eslint-disable-next-line no-restricted-syntax
    return a === b || typeof a === "object" && a !== null && typeof b === "object" && b !== null && equalOwnProperties(a as MapLike<unknown>, b as MapLike<unknown>, isJsonEqual);
}

/** @internal */
export function getSupportedExtensions(options?: CompilerOptions): readonly Extension[][];
/** @internal */
export function getSupportedExtensions(options?: CompilerOptions, extraFileExtensions?: readonly FileExtensionInfo[]): readonly string[][];
/** @internal */
export function getSupportedExtensions(options?: CompilerOptions, extraFileExtensions?: readonly FileExtensionInfo[]): readonly string[][] {
    // const needJsExtensions = options && getAllowJSCompilerOption(options);

    if (!extraFileExtensions || extraFileExtensions.length === 0) {
        // return needJsExtensions ? allSupportedExtensions : supportedTSExtensions;
        return supportedLPCExtensions;
    }

    const builtins = supportedLPCExtensions;// needJsExtensions ? allSupportedExtensions : supportedTSExtensions;
    const flatBuiltins = flatten(builtins);
    const extensions = [
        ...builtins,
        //...mapDefined(extraFileExtensions, x => x.scriptKind === ScriptKind.Deferred || needJsExtensions && isJSLike(x.scriptKind) && !flatBuiltins.includes(x.extension as Extension) ? [x.extension] : undefined),
    ];

    return extensions;
}

/** @internal */
export function isSupportedSourceFileName(fileName: string, compilerOptions?: CompilerOptions, extraFileExtensions?: readonly FileExtensionInfo[]) {
    if (!fileName) return false;

    const supportedExtensions = getSupportedExtensions(compilerOptions, extraFileExtensions);
    for (const extension of flatten(supportedExtensions)) { //flatten(getSupportedExtensionsWithJsonIfResolveJsonModule(compilerOptions, supportedExtensions))) {
        if (fileExtensionIs(fileName, extension)) {
            return true;
        }
    }
    return false;
}



/**
 * Gets the source files that are expected to have an emit output.
 *
 * Originally part of `forEachExpectedEmitFile`, this functionality was extracted to support
 * transformations.
 *
 * @param host An EmitHost.
 * @param targetSourceFile An optional target source file to emit.
 *
 * @internal
 */
export function getSourceFilesToEmit(host: EmitHost, targetSourceFile?: SourceFile, forceDtsEmit?: boolean): readonly SourceFile[] {
    const options = host.getCompilerOptions();
    // if (options.outFile) {
    //     const moduleKind = getEmitModuleKind(options);
    //     const moduleEmitEnabled = options.emitDeclarationOnly || moduleKind === ModuleKind.AMD || moduleKind === ModuleKind.System;
    //     // Can emit only sources that are not declaration file and are either non module code or module with --module or --target es6 specified
    //     return filter(
    //         host.getSourceFiles(),
    //         sourceFile =>
    //             (moduleEmitEnabled || !isExternalModule(sourceFile)) &&
    //             sourceFileMayBeEmitted(sourceFile, host, forceDtsEmit),
    //     );
    // }
    // else {
        const sourceFiles = targetSourceFile === undefined ? host.getSourceFiles() : [targetSourceFile];
        return filter(
            sourceFiles,
            sourceFile => sourceFileMayBeEmitted(sourceFile, host, forceDtsEmit),
        );
    // }
}

/** @internal */
export function isJsonSourceFile(file: SourceFile)/*: file is JsonSourceFile */ {
    return file.scriptKind === ScriptKind.JSON;
}


/**
 * Don't call this for `--outFile`, just for `--outDir` or plain emit. `--outFile` needs additional checks.
 *
 * @internal
 */
export function sourceFileMayBeEmitted(sourceFile: SourceFile, host: SourceFileMayBeEmittedHost, forceDtsEmit?: boolean) {
    const options = host.getCompilerOptions();
    // Js files are emitted only if option is enabled
    // if (options.noEmitForJsFiles && isSourceFileJS(sourceFile)) return false;
    // Declaration files are not emitted
    if (sourceFile.isDeclarationFile) return false;
    // Source file from node_modules are not emitted
    if (host.isSourceFileFromExternalLibrary(sourceFile)) return false;
    // forcing dts emit => file needs to be emitted
    if (forceDtsEmit) return true;
    // Check other conditions for file emit
    // Source files from referenced projects are not emitted
    // if (host.isSourceOfProjectReferenceRedirect(sourceFile.fileName)) return false;
    // Any non json file should be emitted
    if (!isJsonSourceFile(sourceFile)) return true;
    // if (host.getResolvedProjectReferenceToRedirect(sourceFile.fileName)) return false;
    // Emit json file if outFile is specified
    if (options.outFile) return true;
    // Json file is not emitted if outDir is not specified
    if (!options.outDir) return false;
    // Otherwise if rootDir or composite config file, we know common sourceDir and can check if file would be emitted in same location
    if (options.rootDir /*|| (options.composite && options.configFilePath)*/) {
        const commonDir = getNormalizedAbsolutePath(getCommonSourceDirectory(options, () => [], host.getCurrentDirectory(), host.getCanonicalFileName), host.getCurrentDirectory());
        const outputPath = getSourceFilePathInNewDirWorker(sourceFile.fileName, options.outDir, host.getCurrentDirectory(), commonDir, host.getCanonicalFileName);
        if (comparePaths(sourceFile.fileName, outputPath, host.getCurrentDirectory(), !host.useCaseSensitiveFileNames()) === Comparison.EqualTo) return false;
    }
    return true;
}

/** @internal */
export function getSourceFilePathInNewDirWorker(fileName: string, newDirPath: string, currentDirectory: string, commonSourceDirectory: string, getCanonicalFileName: GetCanonicalFileName): string {
    let sourceFilePath = getNormalizedAbsolutePath(fileName, currentDirectory);
    const isSourceFileInCommonSourceDirectory = getCanonicalFileName(sourceFilePath).indexOf(getCanonicalFileName(commonSourceDirectory)) === 0;
    sourceFilePath = isSourceFileInCommonSourceDirectory ? sourceFilePath.substring(commonSourceDirectory.length) : sourceFilePath;
    return combinePaths(newDirPath, sourceFilePath);
}

/** @internal */
export function isSourceFileNotJson(file: SourceFile) {
    return !isJsonSourceFile(file);
}


/**
 * Bypasses immutability and directly sets the `parent` property of each `Node` recursively.
 * @param rootNode The root node from which to start the recursion.
 * @param incremental When `true`, only recursively descends through nodes whose `parent` pointers are incorrect.
 * This allows us to quickly bail out of setting `parent` for subtrees during incremental parsing.
 *
 * @internal
 */
export function setParentRecursive<T extends Node>(rootNode: T, incremental: boolean): T;
/** @internal */
export function setParentRecursive<T extends Node>(rootNode: T | undefined, incremental: boolean): T | undefined;
/** @internal */
export function setParentRecursive<T extends Node>(rootNode: T | undefined, incremental: boolean): T | undefined {
    if (!rootNode) return rootNode;
    forEachChildRecursively(rootNode, isJSDocNode(rootNode) ? bindParentToChildIgnoringJSDoc : bindParentToChild);
    return rootNode;

    function bindParentToChildIgnoringJSDoc(child: Node, parent: Node): void | "skip" {
        if (incremental && child?.parent === parent) {
            return "skip";
        }
        setParent(child, parent);
    }

    function bindJSDoc(child: Node) {
        if (child && hasJSDocNodes(child)) {
            for (const doc of child.jsDoc!) {
                bindParentToChildIgnoringJSDoc(doc, child);
                forEachChildRecursively(doc, bindParentToChildIgnoringJSDoc);
            }
        }
    }

    function bindParentToChild(child: Node, parent: Node) {
        return bindParentToChildIgnoringJSDoc(child, parent) || bindJSDoc(child);
    }
}

/** @internal */
export function getCompilerOptionValue(options: CompilerOptions, option: CommandLineOption): unknown {
    // return option.strictFlag ? getStrictOptionValue(options, option.name as StrictOptionName) :
    //     option.allowJsFlag ? getAllowJSCompilerOption(options) :
        return options[option.name];
}


/**
 * remove quotes from the start & end of the string
 * @param str
 */
export function trimQuotes(str: string) {
    if (str.startsWith('"') && str.endsWith('"')) {
        return str.slice(1, -1);
    }
    return str;
}

export function trimStart(original: string, toRemove: string): string {
    if (original?.startsWith(toRemove)) {
        return original.slice(toRemove.length);
    }
    return original;
}


const base64Digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

/** @internal */
export function base64decode(host: { base64decode?(input: string): string; } | undefined, input: string): string {
    if (host && host.base64decode) {
        return host.base64decode(input);
    }
    const length = input.length;
    const expandedCharCodes: number[] = [];
    let i = 0;
    while (i < length) {
        // Stop decoding once padding characters are present
        if (input.charCodeAt(i) === base64Digits.charCodeAt(64)) {
            break;
        }
        // convert 4 input digits into three characters, ignoring padding characters at the end
        const ch1 = base64Digits.indexOf(input[i]);
        const ch2 = base64Digits.indexOf(input[i + 1]);
        const ch3 = base64Digits.indexOf(input[i + 2]);
        const ch4 = base64Digits.indexOf(input[i + 3]);

        const code1 = ((ch1 & 0B00111111) << 2) | ((ch2 >> 4) & 0B00000011);
        const code2 = ((ch2 & 0B00001111) << 4) | ((ch3 >> 2) & 0B00001111);
        const code3 = ((ch3 & 0B00000011) << 6) | (ch4 & 0B00111111);

        if (code2 === 0 && ch3 !== 0) { // code2 decoded to zero, but ch3 was padding - elide code2 and code3
            expandedCharCodes.push(code1);
        }
        else if (code3 === 0 && ch4 !== 0) { // code3 decoded to zero, but ch4 was padding, elide code3
            expandedCharCodes.push(code1, code2);
        }
        else {
            expandedCharCodes.push(code1, code2, code3);
        }
        i += 4;
    }
    return getStringFromExpandedCharCodes(expandedCharCodes);
}

function getStringFromExpandedCharCodes(codes: number[]): string {
    let output = "";
    let i = 0;
    const length = codes.length;
    while (i < length) {
        const charCode = codes[i];

        if (charCode < 0x80) {
            output += String.fromCharCode(charCode);
            i++;
        }
        else if ((charCode & 0B11000000) === 0B11000000) {
            let value = charCode & 0B00111111;
            i++;
            let nextCode: number = codes[i];
            while ((nextCode & 0B11000000) === 0B10000000) {
                value = (value << 6) | (nextCode & 0B00111111);
                i++;
                nextCode = codes[i];
            }
            // `value` may be greater than 10FFFF (the maximum unicode codepoint) - JS will just make this into an invalid character for us
            output += String.fromCharCode(value);
        }
        else {
            // We don't want to kill the process when decoding fails (due to a following char byte not
            // following a leading char), so we just print the (bad) value
            output += String.fromCharCode(charCode);
            i++;
        }
    }
    return output;
}

/** @internal */
export function getDeclarationEmitOutputFilePathWorker(fileName: string, options: CompilerOptions, host: Pick<EmitHost, "getCommonSourceDirectory" | "getCurrentDirectory" | "getCanonicalFileName">): string {
    // const outputDir = options.declarationDir || options.outDir; // Prefer declaration folder if specified
    const outputDir = options.outDir; 

    const path = outputDir
        ? getSourceFilePathInNewDirWorker(fileName, outputDir, host.getCurrentDirectory(), host.getCommonSourceDirectory(), f => host.getCanonicalFileName(f))
        : fileName;
    const declarationExtension = getDeclarationEmitExtensionForPath(path);
    return removeFileExtension(path) + declarationExtension;
}

/** @internal */
export function getDeclarationEmitExtensionForPath(path: string) {
    // return fileExtensionIsOneOf(path, [Extension.Mjs, Extension.Mts]) ? Extension.Dmts :
    //     fileExtensionIsOneOf(path, [Extension.Cjs, Extension.Cts]) ? Extension.Dcts :
    return    fileExtensionIsOneOf(path, [Extension.Json]) ? `.d.json.ts` : // Drive-by redefinition of json declaration file output name so if it's ever enabled, it behaves well
        Extension.H;
}

/** @internal */
export function hostUsesCaseSensitiveFileNames(host: { useCaseSensitiveFileNames?(): boolean; }): boolean {
    return host.useCaseSensitiveFileNames ? host.useCaseSensitiveFileNames() : false;
}

/** @internal */
export function hostGetCanonicalFileName(host: { useCaseSensitiveFileNames?(): boolean; }): GetCanonicalFileName {
    return createGetCanonicalFileName(hostUsesCaseSensitiveFileNames(host));
}

/** @internal */
export function getSetExternalModuleIndicator(options: CompilerOptions): (file: SourceFile) => void {
    return (file:SourceFile) => { file.externalModuleIndicator=true; };
    // // TODO: Should this callback be cached?
    // switch (getEmitModuleDetectionKind(options)) {
    //     case ModuleDetectionKind.Force:
    //         // All non-declaration files are modules, declaration files still do the usual isFileProbablyExternalModule
    //         return (file: SourceFile) => {
    //             file.externalModuleIndicator = isFileProbablyExternalModule(file) || !file.isDeclarationFile || undefined;
    //         };
    //     case ModuleDetectionKind.Legacy:
    //         // Files are modules if they have imports, exports, or import.meta
    //         return (file: SourceFile) => {
    //             file.externalModuleIndicator = isFileProbablyExternalModule(file);
    //         };
    //     case ModuleDetectionKind.Auto:
    //         // If module is nodenext or node16, all esm format files are modules
    //         // If jsx is react-jsx or react-jsxdev then jsx tags force module-ness
    //         // otherwise, the presence of import or export statments (or import.meta) implies module-ness
    //         const checks: ((file: SourceFile) => Node | true | undefined)[] = [isFileProbablyExternalModule];
    //         if (options.jsx === JsxEmit.ReactJSX || options.jsx === JsxEmit.ReactJSXDev) {
    //             checks.push(isFileModuleFromUsingJSXTag);
    //         }
    //         checks.push(isFileForcedToBeModuleByFormat);
    //         const combined = or(...checks);
    //         const callback = (file: SourceFile) => void (file.externalModuleIndicator = combined(file));
    //         return callback;
    // }
}

/** @internal */
export function getNameOrArgument(expr: PropertyAccessExpression | LiteralLikeElementAccessExpression) {
    if (isPropertyAccessExpression(expr)) {
        return expr.name;
    }
    return expr.argumentExpression;
}

/**
 * Gets whether a bound `VariableDeclaration` or `VariableDeclarationList` is part of a `const` declaration.
 * @internal
 */
export function isVarConst(node: VariableDeclaration | VariableDeclarationList): boolean {
    return false;//return (getCombinedNodeFlags(node) & NodeFlags.BlockScoped) === NodeFlags.Const;
}

/**
 * Gets whether a bound `VariableDeclaration` or `VariableDeclarationList` is part of a `let` declaration.
 * @internal
 */
export function isLet(node: Node): boolean {
    return true;//return (getCombinedNodeFlags(node) & NodeFlags.BlockScoped) === NodeFlags.Let;
}

// See GH#16030
/** @internal */
export function getDeclarationFromName(name: Node): Declaration | undefined {
    const parent = name.parent;
    switch (name.kind) {
        case SyntaxKind.StringLiteral:
        // case SyntaxKind.NoSubstitutionTemplateLiteral:
        case SyntaxKind.NumericLiteral:
            if (isComputedPropertyName(parent)) return parent.parent;
            // falls through
        case SyntaxKind.Identifier:
            if (isDeclaration(parent)) {
                return parent.name === name ? parent : undefined;
            }
            else if (isQualifiedName(parent)) {
                const tag = parent.parent;
                return isJSDocParameterTag(tag) && tag.name === parent ? tag : undefined;
            }
            else {
                const binExp = parent.parent;
                return isBinaryExpression(binExp) &&
                        getAssignmentDeclarationKind(binExp) !== AssignmentDeclarationKind.None &&
                        ((binExp.left as BindableStaticNameExpression).symbol || binExp.symbol) &&
                        getNameOfDeclaration(binExp) === name
                    ? binExp
                    : undefined;
            }
        // case SyntaxKind.PrivateIdentifier:
        //     return isDeclaration(parent) && parent.name === name ? parent : undefined;
        default:
            return undefined;
    }
}

/** @internal */
export function isLiteralComputedPropertyDeclarationName(node: Node) {
    return isStringOrNumericLiteralLike(node) &&
        node.parent && 
        node.parent.kind === SyntaxKind.ComputedPropertyName &&
        isDeclaration(node.parent.parent);
}

/** @internal */
export function skipAlias(symbol: Symbol, checker: TypeChecker) {
    return symbol.flags & SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;
}

/** @internal */
export function walkUpParenthesizedExpressions(node: Node) {
    return walkUp(node, SyntaxKind.ParenthesizedExpression);
}

/** @internal */
export function isFunctionExpressionOrArrowFunction(node: Node): node is FunctionExpression {//} | ArrowFunction {
    return node.kind === SyntaxKind.FunctionExpression ;//|| node.kind === SyntaxKind.ArrowFunction;
}

/** @internal */
export function getSingleVariableOfVariableStatement(node: Node): VariableDeclaration | undefined {
    return isVariableStatement(node) ? firstOrUndefined(node.declarationList.declarations) : undefined;
}

/** @internal */
export function getSingleInitializerOfVariableStatementOrPropertyDeclaration(node: Node): Expression | undefined {
    switch (node.kind) {
        case SyntaxKind.VariableStatement:
            const v = getSingleVariableOfVariableStatement(node);
            return v && v.initializer;
        case SyntaxKind.PropertyDeclaration:
            return (node as PropertyDeclaration).initializer;
        case SyntaxKind.PropertyAssignment:
            return (node as PropertyAssignment).initializer;
    }
}

function getSourceOfDefaultedAssignment(node: Node): Node | undefined {
    return isExpressionStatement(node) &&
            isBinaryExpression(node.expression) &&
            getAssignmentDeclarationKind(node.expression) !== AssignmentDeclarationKind.None &&
            isBinaryExpression(node.expression.right) &&
            (node.expression.right.operatorToken.kind === SyntaxKind.BarBarToken)// || node.expression.right.operatorToken.kind === SyntaxKind.QuestionQuestionToken)
        ? node.expression.right.right
        : undefined;
}

/** @internal */
export function getNextJSDocCommentLocation(node: Node) {
    const parent = node.parent;
    if (
        parent.kind === SyntaxKind.PropertyAssignment ||
        // parent.kind === SyntaxKind.ExportAssignment ||
        parent.kind === SyntaxKind.PropertyDeclaration ||
        parent.kind === SyntaxKind.ExpressionStatement && node.kind === SyntaxKind.PropertyAccessExpression ||
        parent.kind === SyntaxKind.ReturnStatement ||
        // getNestedModuleDeclaration(parent) ||
        isAssignmentExpression(node)
    ) {
        return parent;
    }
    // Try to recognize this pattern when node is initializer of variable declaration and JSDoc comments are on containing variable statement.
    // /**
    //   * @param {number} name
    //   * @returns {number}
    //   */
    // var x = function(name) { return name.length; }
    else if (
        parent.parent &&
        (getSingleVariableOfVariableStatement(parent.parent) === node || isAssignmentExpression(parent))
    ) {
        return parent.parent;
    }
    else if (
        parent.parent && parent.parent.parent &&
        (getSingleVariableOfVariableStatement(parent.parent.parent) ||
            getSingleInitializerOfVariableStatementOrPropertyDeclaration(parent.parent.parent) === node ||
            getSourceOfDefaultedAssignment(parent.parent.parent))
    ) {
        return parent.parent.parent;
    }
}

/** @internal */
export function getLeadingCommentRangesOfNode(node: Node, sourceFileOfNode: SourceFile) {
    return getLeadingCommentRanges(sourceFileOfNode.text, node.pos);
}

/**
 * Returns the node in an `extends` or `implements` clause of a class or interface.
 *
 * @internal
 */
export function getAllSuperTypeNodes(node: Node): readonly TypeNode[] {    
    if (isSourceFile(node)) {
        return concatenate(singleElementArray(getEffectiveBaseTypeNode(node)), getEffectiveImplementsTypeNodes(node)) || emptyArray
    }

    return emptyArray;    
}

/**
 * Given an super call/property node, returns the closest node where
 * - a super call/property access is legal in the node and not legal in the parent node the node.
 *   i.e. super call is legal in constructor but not legal in the class body.
 * - the container is an arrow function (so caller might need to call getSuperContainer again in case it needs to climb higher)
 * - a super call/property is definitely illegal in the container (but might be legal in some subnode)
 *   i.e. super property access is illegal in function declaration but can be legal in the statement list
 *
 * @internal
 */
export function getSuperContainer(node: Node, stopOnFunctions: false): SuperContainer | undefined;
/** @internal */
export function getSuperContainer(node: Node, stopOnFunctions: boolean): SuperContainerOrFunctions | undefined;
export function getSuperContainer(node: Node, stopOnFunctions: boolean) {
    while (true) {
        node = node.parent;
        if (!node) {
            return undefined;
        }
        switch (node.kind) {
            case SyntaxKind.ComputedPropertyName:
                node = node.parent;
                break;
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
            // case SyntaxKind.ArrowFunction:
                if (!stopOnFunctions) {
                    continue;
                }
                // falls through

            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.PropertySignature:
            // case SyntaxKind.MethodDeclaration:
            // case SyntaxKind.MethodSignature:
            // case SyntaxKind.Constructor:
            // case SyntaxKind.GetAccessor:
            // case SyntaxKind.SetAccessor:
            // case SyntaxKind.ClassStaticBlockDeclaration:
                return node as SuperContainerOrFunctions;
            // case SyntaxKind.Decorator:
            //     // Decorators are always applied outside of the body of a class or method.
            //     if (node.parent.kind === SyntaxKind.Parameter && isClassElement(node.parent.parent)) {
            //         // If the decorator's parent is a Parameter, we resolve the this container from
            //         // the grandparent class declaration.
            //         node = node.parent.parent;
            //     }
            //     else if (isClassElement(node.parent)) {
            //         // If the decorator's parent is a class element, we resolve the 'this' container
            //         // from the parent class declaration.
            //         node = node.parent;
            //     }
            //     break;
        }
    }
}

/** @internal */
export function isStatic(node: Node) {
    // https://tc39.es/ecma262/#sec-static-semantics-isstatic
    return false;//return isClassElement(node) && hasStaticModifier(node) || isClassStaticBlockDeclaration(node);
}

/**
 * Add a value to a set, and return true if it wasn't already present.
 *
 * @internal
 */
export function addToSeen<K>(seen: Map<K, true>, key: K): boolean;
/** @internal */
export function addToSeen<K, T>(seen: Map<K, T>, key: K, value: T): boolean;
/** @internal */
export function addToSeen<K, T>(seen: Map<K, T>, key: K, value: T = true as any): boolean {
    if (seen.has(key)) {
        return false;
    }
    seen.set(key, value);
    return true;
}

/** @internal */
export function getEscapedTextOfIdentifierOrLiteral(node: PropertyNameLiteral): string {
    return node.text;
}

/** @internal */
export function isFullSourceFile(sourceFile: object): sourceFile is SourceFile {
    return (sourceFile as Partial<SourceFile>)?.kind === SyntaxKind.SourceFile;
}

/** @internal */
export function isStringDoubleQuoted(str: StringLiteralLike, sourceFile: SourceFile): boolean {
    return getSourceTextOfNodeFromSourceFile(sourceFile, str).charCodeAt(0) === CharacterCodes.doubleQuote;
}


/** @internal */
export function tryGetImportFromModuleSpecifier(node: StringLiteralLike): AnyValidImportOrReExport | undefined {
    switch (node.parent.kind) {
        // case SyntaxKind.ImportDeclaration:
        case SyntaxKind.ExportDeclaration:
        case SyntaxKind.JSDocImportTag:
            return node.parent as AnyValidImportOrReExport;
        // case SyntaxKind.ExternalModuleReference:
        //     return (node.parent as ExternalModuleReference).parent as AnyValidImportOrReExport;
        // case SyntaxKind.CallExpression:
        //     return isImportCall(node.parent) || isRequireCall(node.parent, /*requireStringLiteralLikeArgument*/ false) ? node.parent as RequireOrImportCall : undefined;
        // case SyntaxKind.LiteralType:
        //     Debug.assert(isStringLiteral(node));
        //     return tryCast(node.parent.parent, isImportTypeNode) as ValidImportTypeNode | undefined;
        case SyntaxKind.InheritDeclaration:
            return node.parent as InheritDeclaration;
        case SyntaxKind.CloneObjectExpression:
            return node.parent as CloneObjectExpression;
        default:
            return undefined;
    }
}

/** @internal */
export function hasDecorators(node: Node): boolean {
    return false;//return hasSyntacticModifier(node, ModifierFlags.Decorator);
}

/** @internal */
export function isTrivia(token: SyntaxKind): token is TriviaSyntaxKind {
    return SyntaxKind.FirstTriviaToken <= token && token <= SyntaxKind.LastTriviaToken;
}

/** @internal */
export function importFromModuleSpecifier(node: StringLiteralLike): AnyValidImportOrReExport {
    return tryGetImportFromModuleSpecifier(node) || Debug.failBadSyntaxKind(node.parent);
}

/**
 * Returns true if the node is a VariableDeclaration initialized to a require call (see `isRequireCall`).
 * This function does not test if the node is in a JavaScript file or not.
 *
 * @internal
 */
export function isVariableDeclarationInitializedToRequire(node: Node): node is VariableDeclarationInitializedTo<CloneObjectExpression> {
    return isVariableDeclarationInitializedWithRequireHelper(node, /*allowAccessedRequire*/ false);
}

/** @internal */
export function isGlobalSourceFile(node: Node) {
    // TODO: check sefun file here?
    return node.kind === SyntaxKind.SourceFile;// && !isExternalOrCommonJsModule(node as SourceFile);
}

/** @internal */
export function introducesArgumentsExoticObject(node: Node) {
    switch (node.kind) {
        // case SyntaxKind.MethodDeclaration:
        // case SyntaxKind.MethodSignature:
        // case SyntaxKind.Constructor:
        // case SyntaxKind.GetAccessor:
        // case SyntaxKind.SetAccessor:
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
            return true;
    }
    return false;
}

/** @internal */
export function forEachAncestor<T>(node: Node, callback: (n: Node) => T | undefined | "quit"): T | undefined {
    while (true) {
        const res = callback(node);
        if (res === "quit") return undefined;
        if (res !== undefined) return res;
        if (!node || isSourceFile(node)) return undefined;
        node = node.parent;
    }
}

/** @internal */
export function tryGetTextOfPropertyName(name: PropertyName /*| NoSubstitutionTemplateLiteral*/): string | undefined {
    switch (name.kind) {
        case SyntaxKind.Identifier:
        // case SyntaxKind.PrivateIdentifier:
            return name.emitNode?.autoGenerate ? undefined : name.text;
        case SyntaxKind.StringLiteral:
        case SyntaxKind.IntLiteral:        
        // case SyntaxKind.NoSubstitutionTemplateLiteral:
            return (name.text);
        case SyntaxKind.ComputedPropertyName:
            if (isStringOrNumericLiteralLike(name.expression)) return (name.expression.text);
            return undefined;        
        case SyntaxKind.ParenthesizedExpression:
            return tryGetTextOfPropertyName(name.expression as PropertyName);
        default:
            return Debug.assertNever(name);
    }
}

/** @internal */
export function escapeSnippetText(text: string): string {
    return text.replace(/\$/gm, () => "\\$");
}

/**
 * Creates a new TextRange from the provided pos and end.
 *
 * @param pos The start position.
 * @param end The end position.
 *
 * @internal
 */
export function createRange(pos: number, end: number = pos): TextRange {
    Debug.assert(end >= pos || end === -1);
    return { pos, end };
}

/** @internal */
export function getJSDocCommentRanges(node: Node, text: string) {
    const commentRanges = (node.kind === SyntaxKind.Parameter ||
            node.kind === SyntaxKind.TypeParameter ||
            node.kind === SyntaxKind.FunctionExpression ||
            node.kind === SyntaxKind.ArrowFunction ||
            node.kind === SyntaxKind.ParenthesizedExpression ||
            node.kind === SyntaxKind.VariableDeclaration ||
            node.kind === SyntaxKind.DefineDirective ||
            node.kind === SyntaxKind.InheritDeclaration ||
            node.kind === SyntaxKind.ExportSpecifier) ?
        concatenate(getTrailingCommentRanges(text, node.pos), getLeadingCommentRanges(text, node.pos)) :
        getLeadingCommentRanges(text, node.pos);
    // True if the comment starts with '/**' but not if it is '/**/'
    return filter(commentRanges, comment =>
        comment.end <= node.end && // Due to parse errors sometime empty parameter may get comments assigned to it that end up not in parameter range
        text.charCodeAt(comment.pos + 1) === CharacterCodes.asterisk &&
        text.charCodeAt(comment.pos + 2) === CharacterCodes.asterisk &&
        text.charCodeAt(comment.pos + 3) !== CharacterCodes.slash);
}

/** @internal */
export function getLineOfLocalPosition(sourceFile: SourceFile, pos: number) {
    const lineStarts = getLineStarts(sourceFile);
    return computeLineOfPosition(lineStarts, pos);
}

/** @internal */
export function getScriptKindFromFileName(fileName: string): ScriptKind {
    const ext = fileName.substr(fileName.lastIndexOf("."));
    switch (ext.toLowerCase()) {
        // case Extension.Js:
        // case Extension.Cjs:
        // case Extension.Mjs:
        //     return ScriptKind.JS;
        // case Extension.Jsx:
        //     return ScriptKind.JSX;
        // case Extension.Ts:
        // case Extension.Cts:
        // case Extension.Mts:
        //     return ScriptKind.TS;
        // case Extension.Tsx:
        //     return ScriptKind.TSX;
        case Extension.C:
        case Extension.H:
        case Extension.Lpc:
            return ScriptKind.LPC;
        case Extension.Json:
            return ScriptKind.JSON;
        default:
            return ScriptKind.Unknown;
    }
}

/** @internal */
export function getStartPositionOfLine(line: number, sourceFile: SourceFileLike): number {
    Debug.assert(line >= 0);
    return getLineStarts(sourceFile)[line];
}

/** @internal */
export function isAnyImportSyntax(node: Node): node is AnyImportSyntax {
    switch (node.kind) {
        case SyntaxKind.InheritDeclaration:
        case SyntaxKind.CloneObjectExpression:
            return true;
        default:
            return false;
    }
}

/** @internal */
export function isPinnedComment(text: string, start: number) {
    return text.charCodeAt(start + 1) === CharacterCodes.asterisk &&
        text.charCodeAt(start + 2) === CharacterCodes.exclamation;
}

/** @internal */
export function isPrologueDirective(node: Node): node is PrologueDirective {
    return node.kind === SyntaxKind.ExpressionStatement
        && (node as ExpressionStatement).expression.kind === SyntaxKind.StringLiteral;
}

/** @internal */
export function rangeOfNode(node: Node): TextRange {
    return { pos: getTokenPosOfNode(node), end: node.end };
}

/** @internal */
export function rangeOfTypeParameters(sourceFile: SourceFileBase, typeParameters: NodeArray<TypeParameterDeclaration>): TextRange {
    // Include the `<>`
    const pos = typeParameters.pos - 1;
    const end = Math.min(sourceFile.text.length, skipTrivia(sourceFile.text, typeParameters.end) + 1);
    return { pos, end };
}

/** @internal */
export function getLeftmostAccessExpression(expr: Expression): Expression {
    while (isAccessExpression(expr)) {
        expr = expr.expression;
    }
    return expr;
}

/** @internal */
export function isNamedImportsOrExports(node: Node) {//: node is NamedImportsOrExports {
    return false;//return node.kind === SyntaxKind.NamedImports || node.kind === SyntaxKind.NamedExports;
}

/** @internal */
export function getLastChild(node: Node): Node | undefined {
    let lastChild: Node | undefined;
    forEachChild(node, child => {
        if (nodeIsPresent(child)) lastChild = child;
    }, children => {
        // As an optimization, jump straight to the end of the list.
        for (let i = children.length - 1; i >= 0; i--) {
            if (nodeIsPresent(children[i])) {
                lastChild = children[i];
                break;
            }
        }
    });
    return lastChild;
}

/** @internal */
export function isKnownSymbol(symbol: Symbol): boolean {
    return startsWith(symbol.name as string, "__@");
}

/**
 * Gets a value indicating whether a class element is either a static or an instance property declaration with an initializer.
 *
 * @param member The class element node.
 * @param isStatic A value indicating whether the member should be a static or instance member.
 *
 * @internal
 */
export function isInitializedProperty(member: ClassElement): member is PropertyDeclaration & { initializer: Expression; } {
    return member.kind === SyntaxKind.PropertyDeclaration
        && (member as PropertyDeclaration).initializer !== undefined;
}

/** @internal */
export function isContextualKeyword(token: SyntaxKind): boolean {
    return SyntaxKind.FirstContextualKeyword <= token && token <= SyntaxKind.LastContextualKeyword;
}

function numberOfDirectorySeparators(str: string) {
    const match = str.match(/\//g);
    return match ? match.length : 0;
}

/** @internal */
export function compareNumberOfDirectorySeparators(path1: string, path2: string) {
    return compareValues(
        numberOfDirectorySeparators(path1),
        numberOfDirectorySeparators(path2),
    );
}

/** @internal */
export function isNonContextualKeyword(token: SyntaxKind): boolean {
    return isKeyword(token) && !isContextualKeyword(token);
}

/** @internal */
export function isStringANonContextualKeyword(name: string) {
    const token = stringToToken(name);
    return token !== undefined && isNonContextualKeyword(token);
}


/** @internal */
export function isPunctuation(token: SyntaxKind): token is PunctuationSyntaxKind {
    return SyntaxKind.FirstPunctuation <= token && token <= SyntaxKind.LastPunctuation;
}

/** @internal */
export function isKeywordOrPunctuation(token: SyntaxKind): token is PunctuationOrKeywordSyntaxKind {
    return isKeyword(token) || isPunctuation(token);
}

/** @internal */
export function getEffectiveBaseTypeNode(node: ClassLikeDeclaration | StructDeclaration | SourceFile) {
    const baseType = getClassExtendsHeritageElement(node);
    if (baseType && isInJSFile(node)) {
        // Prefer an @augments tag because it may have type parameters.
        // const tag = getJSDocAugmentsTag(node);
        // if (tag) {
        //     return tag.class;
        // }
    }
    return baseType;
}

/** @internal */
export function getClassExtendsHeritageElement(node: ClassLikeDeclaration | StructDeclaration | SourceFile) {
    // if (isSourceFile(node) && node.heritageClauses.length) {        
    //     return map(node.heritageClauses, clause => clause.inheritClause);
    // }
    //     const heritageClause = getHeritageClause(node.heritageClauses, SyntaxKind.InheritKeyword);
    //     return heritageClause && heritageClause.types.length > 0 ? heritageClause.types[0] : undefined;    
    // }
    
    // TODO - getClassExtendsHeritageElement    
    return undefined;
    // const heritageClause = getHeritageClause(node.heritageClauses, SyntaxKind.ExtendsKeyword);
    // return heritageClause && heritageClause.types.length > 0 ? heritageClause.types[0] : undefined;
}



/** @internal */
export function isTypeDeclaration(node: Node): node is TypeParameterDeclaration | StructDeclaration | /*InterfaceDeclaration | TypeAliasDeclaration */ JSDocTypedefTag  /* JSDocCallbackTag | JSDocEnumTag | EnumDeclaration | ImportClause | ImportSpecifier | ExportSpecifier*/ {
    switch (node.kind) {
        case SyntaxKind.TypeParameter:
        case SyntaxKind.ClassDeclaration:
        case SyntaxKind.StructDeclaration:
        // case SyntaxKind.TypeAliasDeclaration:
        // case SyntaxKind.EnumDeclaration:
        case SyntaxKind.JSDocTypedefTag:
        case SyntaxKind.JSDocCallbackTag:
        case SyntaxKind.JSDocEnumTag:
            return true;
        // case SyntaxKind.ImportClause:
        //     return (node as ImportClause).isTypeOnly;
        // case SyntaxKind.ImportSpecifier:
        // case SyntaxKind.ExportSpecifier:
            // return (node as ImportSpecifier | ExportSpecifier).parent.parent.isTypeOnly;
        default:
            return false;
    }
}

/** @internal */
export function evaluatorResult<T extends string | number | undefined>(value: T, isSyntacticallyString = false, resolvedOtherFiles = false, hasExternalReferences = false): EvaluatorResult<T> {
    return { value, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences };
}

/** @internal */
export function createEvaluator({ evaluateElementAccessExpression, evaluateEntityNameExpression }: EvaluationResolver) {
    // function evaluate(expr: TemplateExpression, location?: Declaration): EvaluatorResult<string | undefined>;
    function evaluate(expr: Expression, location?: Declaration): EvaluatorResult;
    function evaluate(expr: Expression, location?: Declaration): EvaluatorResult {
        let isSyntacticallyString = false;
        let resolvedOtherFiles = false;
        let hasExternalReferences = false;
        // It's unclear when/whether we should consider skipping other kinds of outer expressions.
        // Type assertions intentionally break evaluation when evaluating literal types, such as:
        //     type T = `one ${"two" as any} three`; // string
        // But it's less clear whether such an assertion should break enum member evaluation:
        //     enum E {
        //       A = "one" as any
        //     }
        // SatisfiesExpressions and non-null assertions seem to have even less reason to break
        // emitting enum members as literals. However, these expressions also break Babel's
        // evaluation (but not esbuild's), and the isolatedModules errors we give depend on
        // our evaluation results, so we're currently being conservative so as to issue errors
        // on code that might break Babel.
        expr = skipParentheses(expr);
        switch (expr.kind) {
            case SyntaxKind.PrefixUnaryExpression:
                const result = evaluate((expr as PrefixUnaryExpression).operand, location);
                resolvedOtherFiles = result.resolvedOtherFiles;
                hasExternalReferences = result.hasExternalReferences;
                if (typeof result.value === "number") {
                    switch ((expr as PrefixUnaryExpression).operator) {
                        case SyntaxKind.PlusToken:
                            return evaluatorResult(result.value, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences);
                        case SyntaxKind.MinusToken:
                            return evaluatorResult(-result.value, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences);
                        case SyntaxKind.TildeToken:
                            return evaluatorResult(~result.value, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences);
                    }
                }
                break;
            case SyntaxKind.BinaryExpression: {
                const left = evaluate((expr as BinaryExpression).left, location);
                const right = evaluate((expr as BinaryExpression).right, location);
                isSyntacticallyString = (left.isSyntacticallyString || right.isSyntacticallyString) && (expr as BinaryExpression).operatorToken.kind === SyntaxKind.PlusToken;
                resolvedOtherFiles = left.resolvedOtherFiles || right.resolvedOtherFiles;
                hasExternalReferences = left.hasExternalReferences || right.hasExternalReferences;
                if (typeof left.value === "number" && typeof right.value === "number") {
                    switch ((expr as BinaryExpression).operatorToken.kind) {
                        case SyntaxKind.BarToken:
                            return evaluatorResult(left.value | right.value, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences);
                        case SyntaxKind.AmpersandToken:
                            return evaluatorResult(left.value & right.value, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences);
                        case SyntaxKind.GreaterThanGreaterThanToken:
                            return evaluatorResult(left.value >> right.value, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences);
                        case SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
                            return evaluatorResult(left.value >>> right.value, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences);
                        case SyntaxKind.LessThanLessThanToken:
                            return evaluatorResult(left.value << right.value, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences);
                        case SyntaxKind.CaretToken:
                            return evaluatorResult(left.value ^ right.value, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences);
                        case SyntaxKind.AsteriskToken:
                            return evaluatorResult(left.value * right.value, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences);
                        case SyntaxKind.SlashToken:
                            return evaluatorResult(left.value / right.value, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences);
                        case SyntaxKind.PlusToken:
                            return evaluatorResult(left.value + right.value, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences);
                        case SyntaxKind.MinusToken:
                            return evaluatorResult(left.value - right.value, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences);
                        case SyntaxKind.PercentToken:
                            return evaluatorResult(left.value % right.value, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences);
                        case SyntaxKind.AsteriskAsteriskToken:
                            return evaluatorResult(left.value ** right.value, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences);
                    }
                }
                else if (
                    (typeof left.value === "string" || typeof left.value === "number") &&
                    (typeof right.value === "string" || typeof right.value === "number") &&
                    (expr as BinaryExpression).operatorToken.kind === SyntaxKind.PlusToken
                ) {
                    return evaluatorResult(
                        "" + left.value + right.value,
                        isSyntacticallyString,
                        resolvedOtherFiles,
                        hasExternalReferences,
                    );
                }

                break;
            }
            case SyntaxKind.StringLiteral:
            // case SyntaxKind.NoSubstitutionTemplateLiteral:
                return evaluatorResult((expr as StringLiteralLike).text, /*isSyntacticallyString*/ true);
            // case SyntaxKind.TemplateExpression:
            //     return evaluateTemplateExpression(expr as TemplateExpression, location);
            case SyntaxKind.IntLiteral:                
                return evaluatorResult(+(expr as IntLiteral).text);
            case SyntaxKind.FloatLiteral:
                return evaluatorResult(+(expr as FloatLiteral).text);
            case SyntaxKind.Identifier:
                return evaluateEntityNameExpression(expr as Identifier, location);            
            case SyntaxKind.PropertyAccessExpression:
                if (isEntityNameExpression(expr)) {
                    return evaluateEntityNameExpression(expr, location);
                }
                break;
            case SyntaxKind.ElementAccessExpression:
                return evaluateElementAccessExpression(expr as ElementAccessExpression, location);
        }
        return evaluatorResult(/*value*/ undefined, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences);
    }
    
    return evaluate;
}

/**
 * Indicates whether a type can be used as a property name.
 * @internal
 */
export function isTypeUsableAsPropertyName(type: Type): type is StringLiteralType | IntLiteralType {
    return !!(type.flags & TypeFlags.StringOrNumberLiteralOrUnique);
}

/** @internal */
export function tryGetPropertyAccessOrIdentifierToString(expr: Expression | ConciseBody): string | undefined {
    if (isPropertyAccessExpression(expr)) {
        const baseStr = tryGetPropertyAccessOrIdentifierToString(expr.expression);
        if (baseStr !== undefined && isIdentifier(expr.name)) {
            return baseStr + "." + entityNameToString(expr.name);
        }
    }
    else if (isElementAccessExpression(expr)) {
        const baseStr = tryGetPropertyAccessOrIdentifierToString(expr.expression);
        if (baseStr !== undefined && isPropertyName(expr.argumentExpression)) {
            return baseStr + "." + getPropertyNameForPropertyNameNode(expr.argumentExpression);
        }
    }
    else if (isIdentifier(expr)) {
        return (expr.text);
    }    
    return undefined;
}

/** @internal */
export function isComputedNonLiteralName(name: PropertyName): boolean {
    return name.kind === SyntaxKind.ComputedPropertyName && !isStringOrNumericLiteralLike(name.expression);
}

/** @internal */
export function hasAccessorModifier(node: Node): boolean {
    return false;//return hasSyntacticModifier(node, ModifierFlags.Accessor);
}

/** @internal */
export function getEnclosingContainer(node: Node): Node | undefined {
    return findAncestor(node.parent, n => !!(getContainerFlags(n) & ContainerFlags.IsContainer));
}

/** @internal */
export function isObjectLiteralOrClassExpressionMethodOrAccessor(node: Node): node is MethodDeclaration  {
    // In LPC we need to match on FunctionDecl & Source File here instead of Method/Class
    return (node.kind === SyntaxKind.MethodDeclaration || node.kind === SyntaxKind.FunctionDeclaration ) &&
        (node.parent.kind === SyntaxKind.ObjectLiteralExpression ||
            node.parent.kind === SyntaxKind.SourceFile);
}

/** @internal */
export function isIdentifierTypePredicate(predicate: TypePredicate): predicate is IdentifierTypePredicate {
    return predicate && predicate.kind === TypePredicateKind.Identifier;
}

export function getNormalizedModuleName(moduleName: string): string {
    return hasLPCFileExtension(moduleName) ? moduleName : moduleName + Extension.C;
}

/** @internal */
export function getClassLikeDeclarationOfSymbol(symbol: Symbol): ClassLikeDeclaration | undefined {
    return symbol.declarations?.find(isClassLike);
}

export function getIncludeDirectiveFilename(node: IncludeDirective): string {
    const localFilename = node.content.map((literal) => literal.text).join("");            
    return localFilename;
}

/** @internal */
export function isInfinityOrNaNString(name: string): boolean {
    return name === "Infinity" || name === "-Infinity" || name === "NaN";
}

/** @internal */
export function hasInferredType(node: Node): node is HasInferredType {
    Debug.type<HasInferredType>(node);
    switch (node.kind) {
        case SyntaxKind.Parameter:
        case SyntaxKind.PropertySignature:
        case SyntaxKind.PropertyDeclaration:
        case SyntaxKind.BindingElement:
        case SyntaxKind.PropertyAccessExpression:
        case SyntaxKind.ElementAccessExpression:
        case SyntaxKind.BinaryExpression:
        case SyntaxKind.VariableDeclaration:        
        case SyntaxKind.PropertyAssignment:
            return true;
        default:
            assertType<never>(node);
            return false;
    }
}

/** @internal */
export function isOptionalJSDocPropertyLikeTag(node: Node): boolean {
    if (!isJSDocPropertyLikeTag(node)) {
        return false;
    }
    const { isBracketed, typeExpression } = node;
    return isBracketed || !!typeExpression && typeExpression.type.kind === SyntaxKind.JSDocOptionalType;
}


/** @internal */
export function isJSDocOptionalParameter(node: ParameterDeclaration) {
    return isInJSFile(node) && (
        // node.type should only be a JSDocOptionalType when node is a parameter of a JSDocFunctionType
        node.type && node.type.kind === SyntaxKind.JSDocOptionalType
        || getJSDocParameterTags(node).some(isOptionalJSDocPropertyLikeTag)
    );
}

/** @internal */
export function isOptionalDeclaration(declaration: Declaration): boolean {
    switch (declaration.kind) {
        // case SyntaxKind.PropertyDeclaration:
        // case SyntaxKind.PropertySignature:
        //     return !!(declaration as PropertyDeclaration | PropertySignature).questionToken;
        case SyntaxKind.Parameter:
            return isJSDocOptionalParameter(declaration as ParameterDeclaration);
        case SyntaxKind.JSDocPropertyTag:
        case SyntaxKind.JSDocParameterTag:
            return isOptionalJSDocPropertyLikeTag(declaration);
        default:
            return false;
    }
}

/** @internal */
export function isJSDocTypeAssertion(node: Node): node is JSDocTypeAssertion {
    return isParenthesizedExpression(node)
        && isInJSFile(node)
        && !!getJSDocTypeTag(node);
}

/** @internal */
export function isPrimitiveLiteralValue(node: Expression, includeBigInt = true): node is PrimitiveLiteral {
    Debug.type<PrimitiveLiteral>(node);
    switch (node.kind) {
        case SyntaxKind.TrueKeyword:
        case SyntaxKind.FalseKeyword:
        case SyntaxKind.IntLiteral:
        case SyntaxKind.FloatLiteral:
        case SyntaxKind.StringLiteral:        
            return true;
        // case SyntaxKind.BigIntLiteral:
        //     return includeBigInt;
        case SyntaxKind.PrefixUnaryExpression:
            if (node.operator === SyntaxKind.MinusToken) {
                return isNumericLiteral(node.operand);// || (includeBigInt && isBigIntLiteral(node.operand));
            }
            if (node.operator === SyntaxKind.PlusToken) {
                return isNumericLiteral(node.operand);
            }
            return false;
        default:
            assertType<never>(node);
            return false;
    }
}

/** @internal */
export type ValueSignatureDeclaration =
    | FunctionDeclaration
    | MethodDeclaration
    // | ConstructorDeclaration
    // | AccessorDeclaration
    | ArrowFunction
    | FunctionExpression
    | InlineClosureExpression;

/** @internal */
export function isValueSignatureDeclaration(node: Node): node is ValueSignatureDeclaration {
    return isFunctionExpression(node) || isArrowFunction(node) || isInlineClosureExpression(node) || isFunctionDeclaration(node);
}

/** @internal */
export function getLinesBetweenPositionAndPrecedingNonWhitespaceCharacter(pos: number, stopPos: number, sourceFile: SourceFile, includeComments?: boolean) {
    const startPos = skipTrivia(sourceFile.text, pos, /*stopAfterLineBreak*/ false, includeComments);
    const prevPos = getPreviousNonWhitespacePosition(startPos, stopPos, sourceFile);
    return getLinesBetweenPositions(sourceFile, prevPos ?? stopPos, startPos);
}

function getPreviousNonWhitespacePosition(pos: number, stopPos = 0, sourceFile: SourceFile) {
    while (pos-- > stopPos) {
        if (!isWhiteSpaceLike(sourceFile.text.charCodeAt(pos))) {
            return pos;
        }
    }
}

/** @internal */
export function getContainingNodeArray(node: Node): NodeArray<Node> | undefined {
    if (!node.parent) return undefined;
    switch (node.kind) {
        case SyntaxKind.TypeParameter:
            const { parent } = node as TypeParameterDeclaration;
            return undefined;//return parent.kind === SyntaxKind.InferType ? undefined : parent.typeParameters;
        case SyntaxKind.Parameter:
            return (node as ParameterDeclaration).parent.parameters;
        // case SyntaxKind.TemplateLiteralTypeSpan:
        //     return (node as TemplateLiteralTypeSpan).parent.templateSpans;
        // case SyntaxKind.TemplateSpan:
        //     return (node as TemplateSpan).parent.templateSpans;        
        case SyntaxKind.InheritDeclaration:
            return (node as InheritDeclaration).parent.statements;
    }

    const { parent } = node;
    if (isJSDocTag(node)) {
        return isJSDocTypeLiteral(node.parent) ? undefined : node.parent.tags;
    }

    switch (parent.kind) {
        case SyntaxKind.TypeLiteral:
        // case SyntaxKind.InterfaceDeclaration:
            return isTypeElement(node) ? (parent as TypeLiteralNode).members : undefined;
        case SyntaxKind.UnionType:
        // case SyntaxKind.IntersectionType:
            return (parent as UnionOrIntersectionTypeNode).types;
        // case SyntaxKind.TupleType:
        case SyntaxKind.ArrayLiteralExpression:
        case SyntaxKind.CommaListExpression:        
            return (parent as  ArrayLiteralExpression | CommaListExpression ).elements;
        case SyntaxKind.ObjectLiteralExpression:        
            return (parent as ObjectLiteralExpressionBase<ObjectLiteralElement>).properties;
        case SyntaxKind.CallExpression:
        case SyntaxKind.NewExpression:
            // return isTypeNode(node) ? (parent as CallExpression | NewExpression).typeArguments :
            return (parent as CallExpression | NewExpression).expression === node ? undefined :
                (parent as CallExpression | NewExpression).arguments;        
        case SyntaxKind.Block:
        case SyntaxKind.CaseClause:
        case SyntaxKind.DefaultClause:        
            return (parent as Block | CaseOrDefaultClause).statements;
        case SyntaxKind.CaseBlock:
            return (parent as CaseBlock).clauses;
        case SyntaxKind.ClassDeclaration:
        case SyntaxKind.ClassExpression:
            return isClassElement(node) ? (parent as ClassLikeDeclaration).members : undefined;        
        case SyntaxKind.SourceFile:
            return (parent as SourceFile).statements;
    }
}

/** @internal */
export function rangeEndPositionsAreOnSameLine(range1: TextRange, range2: TextRange, sourceFile: SourceFile) {
    return positionsAreOnSameLine(range1.end, range2.end, sourceFile);
}

/** @internal */
export function getLinesBetweenPositionAndNextNonWhitespaceCharacter(pos: number, stopPos: number, sourceFile: SourceFile, includeComments?: boolean) {
    const nextPos = skipTrivia(sourceFile.text, pos, /*stopAfterLineBreak*/ false, includeComments);
    return getLinesBetweenPositions(sourceFile, pos, Math.min(stopPos, nextPos));
}

/** @internal */
export function getTrailingSemicolonDeferringWriter(writer: EmitTextWriter): EmitTextWriter {
    let pendingTrailingSemicolon = false;

    function commitPendingTrailingSemicolon() {
        if (pendingTrailingSemicolon) {
            writer.writeTrailingSemicolon(";");
            pendingTrailingSemicolon = false;
        }
    }

    return {
        ...writer,
        writeTrailingSemicolon() {
            pendingTrailingSemicolon = true;
        },
        writeLiteral(s) {
            commitPendingTrailingSemicolon();
            writer.writeLiteral(s);
        },
        writeStringLiteral(s) {
            commitPendingTrailingSemicolon();
            writer.writeStringLiteral(s);
        },
        writeSymbol(s, sym) {
            commitPendingTrailingSemicolon();
            writer.writeSymbol(s, sym);
        },
        writePunctuation(s) {
            commitPendingTrailingSemicolon();
            writer.writePunctuation(s);
        },
        writeKeyword(s) {
            commitPendingTrailingSemicolon();
            writer.writeKeyword(s);
        },
        writeOperator(s) {
            commitPendingTrailingSemicolon();
            writer.writeOperator(s);
        },
        writeParameter(s) {
            commitPendingTrailingSemicolon();
            writer.writeParameter(s);
        },
        writeSpace(s) {
            commitPendingTrailingSemicolon();
            writer.writeSpace(s);
        },
        writeProperty(s) {
            commitPendingTrailingSemicolon();
            writer.writeProperty(s);
        },
        writeComment(s) {
            commitPendingTrailingSemicolon();
            writer.writeComment(s);
        },
        writeLine() {
            commitPendingTrailingSemicolon();
            writer.writeLine();
        },
        increaseIndent() {
            commitPendingTrailingSemicolon();
            writer.increaseIndent();
        },
        decreaseIndent() {
            commitPendingTrailingSemicolon();
            writer.decreaseIndent();
        },
    };
}

/** @internal */
export function getTextOfPropertyName(name: PropertyName): string {
    return Debug.checkDefined(tryGetTextOfPropertyName(name));
}


/** @internal */
export type ThisContainer =
    | FunctionDeclaration
    | FunctionExpression    
    | PropertyDeclaration
    | PropertySignature
    | MethodDeclaration
    | MethodSignature    
    | CallSignatureDeclaration    
    | IndexSignatureDeclaration
    | SourceFile;

/** @internal */
export function getThisContainer(node: Node, includeArrowFunctions: false, includeClassComputedPropertyName: false): ThisContainer;
/** @internal */
export function getThisContainer(node: Node, includeArrowFunctions: false, includeClassComputedPropertyName: boolean): ThisContainer | ComputedPropertyName;
/** @internal */
export function getThisContainer(node: Node, includeArrowFunctions: boolean, includeClassComputedPropertyName: false): ThisContainer | ArrowFunction;
/** @internal */
export function getThisContainer(node: Node, includeArrowFunctions: boolean, includeClassComputedPropertyName: boolean): ThisContainer | ArrowFunction | ComputedPropertyName;
export function getThisContainer(node: Node, includeArrowFunctions: boolean, includeClassComputedPropertyName: boolean) {
    Debug.assert(node.kind !== SyntaxKind.SourceFile);
    while (true) {
        node = node.parent;
        if (!node) {
            return Debug.fail(); // If we never pass in a SourceFile, this should be unreachable, since we'll stop when we reach that.
        }
        switch (node.kind) {
            case SyntaxKind.ComputedPropertyName:
                // If the grandparent node is an object literal (as opposed to a class),
                // then the computed property is not a 'this' container.
                // A computed property name in a class needs to be a this container
                // so that we can error on it.
                if (includeClassComputedPropertyName && isClassLike(node.parent.parent)) {
                    return node as ComputedPropertyName;
                }
                // If this is a computed property, then the parent should not
                // make it a this container. The parent might be a property
                // in an object literal, like a method or accessor. But in order for
                // such a parent to be a this container, the reference must be in
                // the *body* of the container.
                node = node.parent.parent;
                break;           
            case SyntaxKind.ArrowFunction:
            case SyntaxKind.InlineClosureExpression:
                if (!includeArrowFunctions) {
                    continue;
                }
                // falls through

            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:            
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.PropertySignature:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.MethodSignature:           
            case SyntaxKind.CallSignature:            
            case SyntaxKind.IndexSignature:            
            case SyntaxKind.SourceFile:
                return node as ThisContainer | ArrowFunction;
        }
    }
}

/** @internal */
export function hasTabstop(node: Node): boolean {
    return getSnippetElement(node)?.kind === SnippetKind.TabStop;
}

/** @internal */
export function getEffectiveImplementsTypeNodes(node: SourceFile): undefined | readonly Expression[] {//} ExpressionWithTypeArguments[] {
    // TODO - is this correct?
    let clauses: Expression[] | undefined = undefined;
    clauses = getJSDocImplementsTags(node).map(n => n.class);
    
    if (!clauses) {
        clauses = mapDefined(node.heritageClauses, c => c.inheritClause);
    }

    return clauses;
}

/** @internal */
export function skipTypeParentheses(node: TypeNode): TypeNode {
    while (isParenthesizedTypeNode(node)) node = node.type;
    return node;
}

/** @internal */
export function identifierIsThisKeyword(id: Identifier): boolean {
    return id.text === "this_object";
}

/** @internal */
export function isThisIdentifier(node: Node | undefined): boolean {
    return !!node && node.kind === SyntaxKind.Identifier && identifierIsThisKeyword(node as Identifier);
}

/** @internal */
export function isJSDocIndexSignature(node: TypeReferenceNode | ExpressionWithTypeArguments) {
    return isTypeReferenceNode(node) &&
        isIdentifier(node.typeName) &&
        node.typeName.text === "object" &&
        node.typeArguments && node.typeArguments.length === 2 &&
        (node.typeArguments[0].kind === SyntaxKind.StringKeyword || node.typeArguments[0].kind === SyntaxKind.IntKeyword);
}


/**
 * A declaration has a dynamic name if all of the following are true:
 *   1. The declaration has a computed property name.
 *   2. The computed name is *not* expressed as a StringLiteral.
 *   3. The computed name is *not* expressed as a NumericLiteral.
 *   4. The computed name is *not* expressed as a PlusToken or MinusToken
 *      immediately followed by a NumericLiteral.
 *
 * @internal
 */
export function hasDynamicName(declaration: Declaration): declaration is DynamicNamedDeclaration | DynamicNamedBinaryExpression {
    const name = getNameOfDeclaration(declaration);
    return !!name && isDynamicName(name);
}

/** @internal */
export function isDynamicName(name: DeclarationName): boolean {
    if (!(name.kind === SyntaxKind.ComputedPropertyName || name.kind === SyntaxKind.ElementAccessExpression)) {
        return false;
    }
    const expr = isElementAccessExpression(name) ? skipParentheses(name.argumentExpression) : (name as ComputedPropertyName).expression;
    return !isStringOrNumericLiteralLike(expr) &&
        !isSignedNumericLiteral(expr);
}

/**
 * True if an extension is one of the supported LPC extensions.
 *
 * @internal
 */
export function extensionIsLPC(ext: string): boolean {
    return ext === Extension.C || ext === Extension.Lpc || ext === Extension.H;
}

/** @internal */
export function resolutionExtensionIsTSOrJson(ext: string) {
    return extensionIsLPC(ext) || ext === Extension.Json;
}

/**
 * Detached comment is a comment at the top of file or function body that is separated from
 * the next statement by space.
 *
 * @internal
 */
export function emitDetachedComments(text: string, lineMap: readonly number[], writer: EmitTextWriter, writeComment: (text: string, lineMap: readonly number[], writer: EmitTextWriter, commentPos: number, commentEnd: number, newLine: string) => void, node: TextRange, newLine: string, removeComments: boolean) {
    let leadingComments: CommentRange[] | undefined;
    let currentDetachedCommentInfo: { nodePos: number; detachedCommentEndPos: number; } | undefined;
    if (removeComments) {
        // removeComments is true, only reserve pinned comment at the top of file
        // For example:
        //      /*! Pinned Comment */
        //
        //      var x = 10;
        if (node.pos === 0) {
            leadingComments = filter(getLeadingCommentRanges(text, node.pos), isPinnedCommentLocal);
        }
    }
    else {
        // removeComments is false, just get detached as normal and bypass the process to filter comment
        leadingComments = getLeadingCommentRanges(text, node.pos);
    }

    if (leadingComments) {
        const detachedComments: CommentRange[] = [];
        let lastComment: CommentRange | undefined;

        for (const comment of leadingComments) {
            if (lastComment) {
                const lastCommentLine = getLineOfLocalPositionFromLineMap(lineMap, lastComment.end);
                const commentLine = getLineOfLocalPositionFromLineMap(lineMap, comment.pos);

                if (commentLine >= lastCommentLine + 2) {
                    // There was a blank line between the last comment and this comment.  This
                    // comment is not part of the copyright comments.  Return what we have so
                    // far.
                    break;
                }
            }

            detachedComments.push(comment);
            lastComment = comment;
        }

        if (detachedComments.length) {
            // All comments look like they could have been part of the copyright header.  Make
            // sure there is at least one blank line between it and the node.  If not, it's not
            // a copyright header.
            const lastCommentLine = getLineOfLocalPositionFromLineMap(lineMap, last(detachedComments).end);
            const nodeLine = getLineOfLocalPositionFromLineMap(lineMap, skipTrivia(text, node.pos));
            if (nodeLine >= lastCommentLine + 2) {
                // Valid detachedComments
                emitNewLineBeforeLeadingComments(lineMap, writer, node, leadingComments);
                emitComments(text, lineMap, writer, detachedComments, /*leadingSeparator*/ false, /*trailingSeparator*/ true, newLine, writeComment);
                currentDetachedCommentInfo = { nodePos: node.pos, detachedCommentEndPos: last(detachedComments).end };
            }
        }
    }

    return currentDetachedCommentInfo;

    function isPinnedCommentLocal(comment: CommentRange) {
        return isPinnedComment(text, comment.pos);
    }
}

/** @internal */
export function emitNewLineBeforeLeadingComments(lineMap: readonly number[], writer: EmitTextWriter, node: TextRange, leadingComments: readonly CommentRange[] | undefined) {
    emitNewLineBeforeLeadingCommentsOfPosition(lineMap, writer, node.pos, leadingComments);
}

/** @internal */
export function emitNewLineBeforeLeadingCommentsOfPosition(lineMap: readonly number[], writer: EmitTextWriter, pos: number, leadingComments: readonly CommentRange[] | undefined) {
    // If the leading comments start on different line than the start of node, write new line
    if (
        leadingComments && leadingComments.length && pos !== leadingComments[0].pos &&
        getLineOfLocalPositionFromLineMap(lineMap, pos) !== getLineOfLocalPositionFromLineMap(lineMap, leadingComments[0].pos)
    ) {
        writer.writeLine();
    }
}

/** @internal */
export function writeCommentRange(text: string, lineMap: readonly number[], writer: EmitTextWriter, commentPos: number, commentEnd: number, newLine: string) {
    if (text.charCodeAt(commentPos + 1) === CharacterCodes.asterisk) {
        const firstCommentLineAndCharacter = computeLineAndCharacterOfPosition(lineMap, commentPos);
        const lineCount = lineMap.length;
        let firstCommentLineIndent: number | undefined;
        for (let pos = commentPos, currentLine = firstCommentLineAndCharacter.line; pos < commentEnd; currentLine++) {
            const nextLineStart = (currentLine + 1) === lineCount
                ? text.length + 1
                : lineMap[currentLine + 1];

            if (pos !== commentPos) {
                // If we are not emitting first line, we need to write the spaces to adjust the alignment
                if (firstCommentLineIndent === undefined) {
                    firstCommentLineIndent = calculateIndent(text, lineMap[firstCommentLineAndCharacter.line], commentPos);
                }

                // These are number of spaces writer is going to write at current indent
                const currentWriterIndentSpacing = writer.getIndent() * getIndentSize();

                // Number of spaces we want to be writing
                // eg: Assume writer indent
                // module m {
                //         /* starts at character 9 this is line 1
                //    * starts at character pos 4 line                        --1  = 8 - 8 + 3
                //   More left indented comment */                            --2  = 8 - 8 + 2
                //     class c { }
                // }
                // module m {
                //     /* this is line 1 -- Assume current writer indent 8
                //      * line                                                --3 = 8 - 4 + 5
                //            More right indented comment */                  --4 = 8 - 4 + 11
                //     class c { }
                // }
                const spacesToEmit = currentWriterIndentSpacing - firstCommentLineIndent + calculateIndent(text, pos, nextLineStart);
                if (spacesToEmit > 0) {
                    let numberOfSingleSpacesToEmit = spacesToEmit % getIndentSize();
                    const indentSizeSpaceString = getIndentString((spacesToEmit - numberOfSingleSpacesToEmit) / getIndentSize());

                    // Write indent size string ( in eg 1: = "", 2: "" , 3: string with 8 spaces 4: string with 12 spaces
                    writer.rawWrite(indentSizeSpaceString);

                    // Emit the single spaces (in eg: 1: 3 spaces, 2: 2 spaces, 3: 1 space, 4: 3 spaces)
                    while (numberOfSingleSpacesToEmit) {
                        writer.rawWrite(" ");
                        numberOfSingleSpacesToEmit--;
                    }
                }
                else {
                    // No spaces to emit write empty string
                    writer.rawWrite("");
                }
            }

            // Write the comment line text
            writeTrimmedCurrentLine(text, commentEnd, writer, newLine, pos, nextLineStart);

            pos = nextLineStart;
        }
    }
    else {
        // Single line comment of style //....
        writer.writeComment(text.substring(commentPos, commentEnd));
    }
}

/** @internal */
export function emitNewLineBeforeLeadingCommentOfPosition(lineMap: readonly number[], writer: EmitTextWriter, pos: number, commentPos: number) {
    // If the leading comments start on different line than the start of node, write new line
    if (
        pos !== commentPos &&
        getLineOfLocalPositionFromLineMap(lineMap, pos) !== getLineOfLocalPositionFromLineMap(lineMap, commentPos)
    ) {
        writer.writeLine();
    }
}

function writeTrimmedCurrentLine(text: string, commentEnd: number, writer: EmitTextWriter, newLine: string, pos: number, nextLineStart: number) {
    const end = Math.min(commentEnd, nextLineStart - 1);
    const currentLineText = text.substring(pos, end).trim();
    if (currentLineText) {
        // trimmed forward and ending spaces text
        writer.writeComment(currentLineText);
        if (end !== commentEnd) {
            writer.writeLine();
        }
    }
    else {
        // Empty string - make sure we write empty line
        writer.rawWrite(newLine);
    }
}

/** @internal */
export function getLineOfLocalPositionFromLineMap(lineMap: readonly number[], pos: number) {
    return computeLineOfPosition(lineMap, pos);
}

function calculateIndent(text: string, pos: number, end: number) {
    let currentLineIndent = 0;
    for (; pos < end && isWhiteSpaceSingleLine(text.charCodeAt(pos)); pos++) {
        if (text.charCodeAt(pos) === CharacterCodes.tab) {
            // Tabs = TabSize = indent size and go to next tabStop
            currentLineIndent += getIndentSize() - (currentLineIndent % getIndentSize());
        }
        else {
            // Single space
            currentLineIndent++;
        }
    }

    return currentLineIndent;
}

/** @internal */
export function emitComments(
    text: string,
    lineMap: readonly number[],
    writer: EmitTextWriter,
    comments: readonly CommentRange[] | undefined,
    leadingSeparator: boolean,
    trailingSeparator: boolean,
    newLine: string,
    writeComment: (text: string, lineMap: readonly number[], writer: EmitTextWriter, commentPos: number, commentEnd: number, newLine: string) => void,
) {
    if (comments && comments.length > 0) {
        if (leadingSeparator) {
            writer.writeSpace(" ");
        }

        let emitInterveningSeparator = false;
        for (const comment of comments) {
            if (emitInterveningSeparator) {
                writer.writeSpace(" ");
                emitInterveningSeparator = false;
            }

            writeComment(text, lineMap, writer, comment.pos, comment.end, newLine);
            if (comment.hasTrailingNewLine) {
                writer.writeLine();
            }
            else {
                emitInterveningSeparator = true;
            }
        }

        if (emitInterveningSeparator && trailingSeparator) {
            writer.writeSpace(" ");
        }
    }
}

const nonAsciiCharacters = /[^\u0000-\u007F]/g;
/** @internal */
export function escapeNonAsciiString(s: string, quoteChar?: CharacterCodes.doubleQuote | CharacterCodes.singleQuote | CharacterCodes.backtick): string {
    s = escapeString(s, quoteChar);
    // Replace non-ASCII characters with '\uNNNN' escapes if any exist.
    // Otherwise just return the original string.
    return nonAsciiCharacters.test(s) ?
        s.replace(nonAsciiCharacters, c => encodeUtf16EscapeSequence(c.charCodeAt(0))) :
        s;
}

/** @internal */
export const enum GetLiteralTextFlags {
    None = 0,
    NeverAsciiEscape = 1 << 0,
    JsxAttributeEscape = 1 << 1,
    TerminateUnterminatedLiterals = 1 << 2,
    AllowNumericSeparator = 1 << 3,
}

/** @internal */
export function getLiteralText(node: LiteralLikeNode, sourceFile: SourceFile | undefined, flags: GetLiteralTextFlags) {
    // If we don't need to downlevel and we can reach the original source text using
    // the node's parent reference, then simply get the text as it was originally written.
    if (sourceFile && canUseOriginalText(node, flags)) {
        return getSourceTextOfNodeFromSourceFile(sourceFile, node);
    }

    // If we can't reach the original source text, use the canonical form if it's a number,
    // or a (possibly escaped) quoted form of the original text if it's string-like.
    switch (node.kind) {
        case SyntaxKind.StringLiteral: {
            const escapeText = flags & GetLiteralTextFlags.NeverAsciiEscape || (getEmitFlags(node) & EmitFlags.NoAsciiEscaping) ? escapeString :
                escapeNonAsciiString;
            if ((node as StringLiteral).singleQuote) {
                return "'" + escapeText(node.text, CharacterCodes.singleQuote) + "'";
            }
            else {
                return '"' + escapeText(node.text, CharacterCodes.doubleQuote) + '"';
            }
        }        
        case SyntaxKind.NumericLiteral:
        case SyntaxKind.IntLiteral:
        case SyntaxKind.FloatLiteral:
            return node.text;
        // case SyntaxKind.RegularExpressionLiteral:
        //     if (flags & GetLiteralTextFlags.TerminateUnterminatedLiterals && node.isUnterminated) {
        //         return node.text + (node.text.charCodeAt(node.text.length - 1) === CharacterCodes.backslash ? " /" : "/");
        //     }
        //     return node.text;
    }

    return Debug.fail(`Literal kind '${node.kind}' not accounted for.`);
}

function canUseOriginalText(node: LiteralLikeNode, flags: GetLiteralTextFlags): boolean {
    if (nodeIsSynthesized(node) || !node.parent || (flags & GetLiteralTextFlags.TerminateUnterminatedLiterals && node.isUnterminated)) {
        return false;
    }

    if (isNumericLiteral(node)) {
        if (node.numericLiteralFlags & TokenFlags.IsInvalid) {
            return false;
        }
        if (node.numericLiteralFlags & TokenFlags.ContainsSeparator) {
            return !!(flags & GetLiteralTextFlags.AllowNumericSeparator);
        }
    }

    return true;
}

/**
 * Create a VM that can be used to evaluate the FluffOS master apply `get_include_path`
 * @param masterFile SourceFile that stores the master file object
 * @returns 
 */
export function createMasterApplyGetIncludePathVm(masterFile: SourceFile) {
    // check to see if it has a include function
    const getIncludePathFn = find(masterFile?.statements, (stmt) => isFunctionDeclaration(stmt) && stmt.name.text === "get_include_path");    
    if (!getIncludePathFn) {
        return undefined;
    }

    // convert fn to javascript code
    const jsSource = emitNodeAsJsText(getIncludePathFn, masterFile) + "\nreturn get_include_path(ctxInput);";            
    // compile into vm
    const masterCtx = vm.createContext(createVmHelperContext(), { name: "masterApply_GetIncludePath" });        
    const compileOptions = { parsingContext: masterCtx, filename: masterFile.fileName + ".js.vm" };
    return vm.compileFunction(jsSource, ["ctxInput"], compileOptions) as (fileName:string)=>string[]|undefined;
}

/** @internal */
export function createCompilerDiagnosticFromMessageChain(chain: DiagnosticMessageChain, relatedInformation?: DiagnosticRelatedInformation[]): Diagnostic {
    return {
        file: undefined,
        start: undefined,
        length: undefined,

        code: chain.code,
        category: chain.category,
        messageText: chain.next ? chain : chain.messageText,
        relatedInformation,
    };
}

/** @internal */
export function getPatternFromSpec(spec: string, basePath: string, usage: "files" | "directories" | "exclude") {
    const pattern = spec && getSubPatternFromSpec(spec, basePath, usage, wildcardMatchers[usage]);
    return pattern && `^(${pattern})${usage === "exclude" ? "($|/)" : "$"}`;
}

/** @internal */
export function getNameOfScriptTarget(scriptTarget: ScriptTarget): string | undefined {
    console.debug("todo - getNameOfScriptTarget");
    return "LPC";
    // return forEachEntry(targetOptionDeclaration.type, (value, key) => value === scriptTarget ? key : undefined);
}

export function driverTypeToLanguageVariant(driverType: string): LanguageVariant {
    switch (driverType) {
        case "fluffos":
            return LanguageVariant.FluffOS;            
        case "ldmud":
        default:
            return LanguageVariant.LDMud;            
    }
}

/** @internal */
export function isInTypeQuery(node: Node): boolean {
    return false;
}

/** @internal */
export function projectReferenceIsEqualTo(oldRef: ProjectReference, newRef: ProjectReference) {
    return oldRef.path === newRef.path &&
        !oldRef.prepend === !newRef.prepend &&
        !oldRef.circular === !newRef.circular;
}

/** @internal */
export function compareDataObjects(dst: any, src: any): boolean {
    if (!dst || !src || Object.keys(dst).length !== Object.keys(src).length) {
        return false;
    }

    for (const e in dst) {
        if (typeof dst[e] === "object") {
            if (!compareDataObjects(dst[e], src[e])) {
                return false;
            }
        }
        else if (typeof dst[e] !== "function") {
            if (dst[e] !== src[e]) {
                return false;
            }
        }
    }
    return true;
}

/** @internal */
export function forEachLpcConfigPropArray<T>(tsConfigSourceFile: LpcConfigSourceFile | undefined, propKey: string, callback: (property: PropertyAssignment) => T | undefined) {
    return forEachPropertyAssignment(getLpcConfigObjectLiteralExpression(tsConfigSourceFile), propKey, callback);
}

/** @internal */
export function getLpcConfigObjectLiteralExpression(tsConfigSourceFile: LpcConfigSourceFile | undefined): ObjectLiteralExpression | undefined {
    if (tsConfigSourceFile && tsConfigSourceFile.statements.length) {
        const expression = tsConfigSourceFile.statements[0].expression;
        return tryCast(expression, isObjectLiteralExpression);
    }
}

/** @internal */
export function forEachPropertyAssignment<T>(objectLiteral: ObjectLiteralExpression | undefined, key: string, callback: (property: PropertyAssignment) => T | undefined, key2?: string) {
    return forEach(objectLiteral?.properties, property => {
        if (!isPropertyAssignment(property)) return undefined;
        const propName = tryGetTextOfPropertyName(property.name);
        return key === propName || (key2 && key2 === propName) ?
            callback(property) :
            undefined;
    });
}
/** @internal */
export interface HostWithIsSourceOfProjectReferenceRedirect {
    isSourceOfProjectReferenceRedirect(fileName: string): boolean;
}

/** @internal */
export function skipTypeChecking(sourceFile: SourceFile, options: CompilerOptions, host: HostWithIsSourceOfProjectReferenceRedirect) {
    // If skipLibCheck is enabled, skip reporting errors if file is a declaration file.
    // If skipDefaultLibCheck is enabled, skip reporting errors if file contains a
    // '/// <reference no-default-lib="true"/>' directive.
    return (options.skipLibCheck && sourceFile.isDeclarationFile ||
        options.skipDefaultLibCheck && sourceFile.hasNoDefaultLib) ||
        options.noCheck ||
        host.isSourceOfProjectReferenceRedirect(sourceFile.fileName) ||
        !canIncludeBindAndCheckDiagnsotics(sourceFile, options);
}

/** @internal */
export function canIncludeBindAndCheckDiagnsotics(sourceFile: SourceFile, options: CompilerOptions) {
    if (!!sourceFile.checkLpcDirective && sourceFile.checkLpcDirective.enabled === false) return false;
    if (
        sourceFile.scriptKind === ScriptKind.LPC ||        
        sourceFile.scriptKind === ScriptKind.External
    ) return true;

    // const isJs = sourceFile.scriptKind === ScriptKind.JS || sourceFile.scriptKind === ScriptKind.JSX;
    // const isCheckJs = isJs && isCheckJsEnabledForFile(sourceFile, options);
    // const isPlainJs = isPlainJsFile(sourceFile, options.checkJs);

    // By default, only type-check .ts, .tsx, Deferred, plain JS, checked JS and External
    // - plain JS: .js files with no // ts-check and checkJs: undefined
    // - check JS: .js files with either // ts-check or checkJs: true
    // - external: files that are added by plugins
    // return isPlainJs || isCheckJs || sourceFile.scriptKind === ScriptKind.Deferred;
    return sourceFile.scriptKind === ScriptKind.Deferred;
}

/**
 * Does the opposite of `getJSDocParameterTags`: given a JSDoc parameter, finds the parameter corresponding to it.
 *
 * @internal
 */
export function getParameterSymbolFromJSDoc(node: JSDocParameterTag): Symbol | undefined {
    if (node.symbol) {
        return node.symbol;
    }
    if (!isIdentifier(node.name)) {
        return undefined;
    }
    const name = node.name.text;
    const decl = getHostSignatureFromJSDoc(node);
    if (!decl) {
        return undefined;
    }
    const parameter = find(decl.parameters, p => p.name.kind === SyntaxKind.Identifier && p.name.text === name);
    return parameter && parameter.symbol;
}

/** try to resolve a full filename to a lib-rooted filename */
export function getLibRootedFileName(fileName: string, options: CompilerOptions) {
    if (!isRootedDiskPath(fileName)) {
        return fileName;
    }

    const rootDir = options?.rootDir ?? getDirectoryPath(options?.configFilePath ?? "");

    if (rootDir && fileName.startsWith(rootDir)) {
        let pathSuffix = fileName.substring(rootDir.length);
        // replace windows slashes with forward slashes
        pathSuffix = pathSuffix.replace(/\\/g, "/");
        if (!pathSuffix.startsWith("/")) {
            pathSuffix = "/" + pathSuffix;
        }
        return pathSuffix;
    }        

    return undefined;
}

export function thisObjectPragmaToStringLiteral(file: SourceFile, thisObjectPragmas: ThisObjectPragmas | ThisObjectPragmas[]): StringLiteral {
    const chosenPragma = isArray(thisObjectPragmas) ? thisObjectPragmas[0] : thisObjectPragmas;
    // create a synthentic string literal with the pragma value                                        
    // set end=pos so that diags see this as a missing node and don't skip trivia
    return setParent(setTextRangePosEnd(factory.createStringLiteral(chosenPragma.arguments.name), chosenPragma.range.pos, chosenPragma.range.pos), file);
}

/** @internal */
export function getLpcConfigPropArrayElementValue(tsConfigSourceFile: LpcConfigSourceFile | undefined, propKey: string, elementValue: string): StringLiteral | undefined {
    return forEachLpcConfigPropArray(tsConfigSourceFile, propKey, property =>
        isArrayLiteralExpression(property.initializer) ?
            find(property.initializer.elements, (element): element is StringLiteral => isStringLiteral(element) && element.text === elementValue) :
            undefined);
}

/** @internal */
export function getPropertyArrayElementValue(objectLiteral: ObjectLiteralExpression, propKey: string, elementValue: string): StringLiteral | undefined {
    return forEachPropertyAssignment(objectLiteral, propKey, property =>
        isArrayLiteralExpression(property.initializer) ?
            find(property.initializer.elements, (element): element is StringLiteral => isStringLiteral(element) && element.text === elementValue) :
            undefined);
}

/** @internal */
export function changesAffectModuleResolution(oldOptions: CompilerOptions, newOptions: CompilerOptions): boolean {
    return oldOptions.configFilePath !== newOptions.configFilePath ||        
        changesAffectLibCompilation(oldOptions, newOptions) ||
        optionsHaveModuleResolutionChanges(oldOptions, newOptions);
}

export function changesAffectLibCompilation(oldOptions: CompilerOptions, newOptions: CompilerOptions): boolean {
    // master & sefun need to be handled in the program creation
    return oldOptions.masterFile !== newOptions.masterFile || 
        oldOptions.sefunFile !== newOptions.sefunFile;
}

/** @internal */
export function optionsHaveModuleResolutionChanges(oldOptions: CompilerOptions, newOptions: CompilerOptions) {
    return optionsHaveChanges(oldOptions, newOptions, moduleResolutionOptionDeclarations);
}

/** @internal */
export function hasChangesInResolutions<K, V>(
    names: readonly K[],
    newResolutions: readonly V[],
    getOldResolution: (name: K) => V | undefined,
    comparer: (oldResolution: V, newResolution: V) => boolean,
): boolean {
    Debug.assert(names.length === newResolutions.length);

    for (let i = 0; i < names.length; i++) {
        const newResolution = newResolutions[i];
        const entry = names[i];
        const oldResolution = getOldResolution(entry);
        const changed = oldResolution
            ? !newResolution || !comparer(oldResolution, newResolution)
            : newResolution;
        if (changed) {
            return true;
        }
    }
    return false;
}

/** @internal */
export function moduleResolutionIsEqualTo(oldResolution: ResolvedModuleWithFailedLookupLocations, newResolution: ResolvedModuleWithFailedLookupLocations): boolean {
    return oldResolution === newResolution ||
        oldResolution.resolvedModule === newResolution.resolvedModule ||
        !!oldResolution.resolvedModule &&
            !!newResolution.resolvedModule &&
            oldResolution.resolvedModule.isExternalLibraryImport === newResolution.resolvedModule.isExternalLibraryImport &&
            oldResolution.resolvedModule.extension === newResolution.resolvedModule.extension &&
            oldResolution.resolvedModule.resolvedFileName === newResolution.resolvedModule.resolvedFileName &&
            oldResolution.resolvedModule.originalPath === newResolution.resolvedModule.originalPath &&
            // packageIdIsEqual(oldResolution.resolvedModule.packageId, newResolution.resolvedModule.packageId) &&
            oldResolution.alternateResult === newResolution.alternateResult;
}

/** @internal */
export function changesAffectingProgramStructure(oldOptions: CompilerOptions, newOptions: CompilerOptions) {
    return optionsHaveChanges(oldOptions, newOptions, optionsAffectingProgramStructure);
}

/** @internal */
export function getSymbolNameForPrivateIdentifier(containingClassSymbol: Symbol, description: string): string {
    return `__#${getSymbolId(containingClassSymbol)}@${description}` as string;
}

/** @internal */
export function getTypeParameterFromJsDoc(node: TypeParameterDeclaration & { parent: JSDocTemplateTag; }): TypeParameterDeclaration | undefined {    
    const name = node.name.text;    
    const { typeParameters } = node.parent.parent.parent as SignatureDeclaration | ClassDeclaration;// | InterfaceDeclaration;
    return typeParameters && find(typeParameters, p => p.name.text === name);
}

/** @internal */
export function canHaveIllegalTypeParameters(node: Node) { //: node is HasIllegalTypeParameters {
    const kind = node.kind;
    return false;
    // return kind === SyntaxKind.Constructor
    //     || kind === SyntaxKind.GetAccessor
    //     || kind === SyntaxKind.SetAccessor;
}

/** @internal */
export function getJSDocTypeParameterDeclarations(node: DeclarationWithTypeParameters): readonly TypeParameterDeclaration[] {
    return flatMap(getJSDocTags(node), tag => isNonTypeAliasTemplate(tag) ? tag.typeParameters : undefined);
}

/** template tags are only available when a typedef isn't already using them */
function isNonTypeAliasTemplate(tag: JSDocTag): tag is JSDocTemplateTag {
    return isJSDocTemplateTag(tag) && !(tag.parent.kind === SyntaxKind.JSDoc && (tag.parent.tags!.some(isJSDocTypeAlias) || tag.parent.tags!.some(isJSDocOverloadTag)));
}

/** @internal */
export function isSuperCall(n: Node): n is SuperCall {
    return n.kind === SyntaxKind.CallExpression && (n as CallExpression).expression.kind === SyntaxKind.SuperAccessExpression;
}


/** @internal */
export function getJSDocOverloadTags(node: Node): readonly JSDocOverloadTag[] {
    return getAllJSDocTags(node, isJSDocOverloadTag);
}

/** @internal */
export type StrictOptionName =
    | "noImplicitAny"
    | "noImplicitThis"
    | "strictNullChecks"
    | "strictFunctionTypes"
    | "strictBindCallApply"
    | "strictPropertyInitialization"
    | "alwaysStrict"
    | "strictObjectTypes"
    | "useUnknownInCatchVariables";
    
/** @internal */
export function getStrictOptionValue(compilerOptions: CompilerOptions, flag: StrictOptionName): boolean {
    return compilerOptions[flag] === undefined ? !!compilerOptions.strict : !!compilerOptions[flag];
}

/** @internal */
export function isJSDocSatisfiesExpression(node: Node): node is JSDocSatisfiesExpression {
    return isInJSFile(node) && isParenthesizedExpression(node) && hasJSDocNodes(node) && !!getJSDocSatisfiesTag(node);
}

/** @internal */
export function getJSDocSatisfiesExpressionType(node: JSDocSatisfiesExpression) {
    return Debug.checkDefined(tryGetJSDocSatisfiesTypeNode(node));
}

/** @internal */
export function tryGetJSDocSatisfiesTypeNode(node: Node) {
    const tag = getJSDocSatisfiesTag(node);
    return tag && tag.typeExpression && tag.typeExpression.type;
}

/** @internal */
export function unreachableCodeIsError(options: CompilerOptions): boolean {
    return options.allowUnreachableCode === false;
}

/** @internal */
export function sliceAfter<T>(arr: readonly T[], value: T): readonly T[] {
    const index = arr.indexOf(value);
    Debug.assert(index !== -1);
    return arr.slice(index);
}


/**
 * Walks up parenthesized types.
 * It returns both the outermost parenthesized type and its parent.
 * If given node is not a parenthesiezd type, undefined is return as the former.
 *
 * @internal
 */
export function walkUpParenthesizedTypesAndGetParentAndChild(node: Node): [ParenthesizedTypeNode | undefined, Node] {
    let child: ParenthesizedTypeNode | undefined;
    while (node && node.kind === SyntaxKind.ParenthesizedType) {
        child = node as ParenthesizedTypeNode;
        node = node.parent;
    }
    return [child, node];
}

/** @internal */
export function scanTokenAtPosition(sourceFile: SourceFile, pos: number) {
    const scanner = createScanner(sourceFile.languageVersion, /*skipTrivia*/ true, true, sourceFile.languageVariant, sourceFile.text, /*onError*/ undefined, pos);
    scanner.scan();
    return scanner.getToken();
}

export function tryGetLocalizedLibPath(options: CompilerOptions): string {    
    const basePath = getDirectoryPath(normalizePath(sys.getExecutingFilePath()));
    const driverPath = getDefaultLibFolder(options);
    
    const locale = getUILocale()?.toLowerCase() ?? "en";
    const matchResult = /^([a-z]+)([_-]([a-z]+))?$/.exec(locale);;
    const language = matchResult[1];
    const libFilename = getDefaultLibFileName(options);
 
    const pathsToTry = [            
        combinePaths(basePath, driverPath, locale, libFilename),    // locale specific
        combinePaths(basePath, driverPath, language, libFilename),  // language specific
        combinePaths(basePath, driverPath, libFilename),            // fallback to english
    ];
                    
    return find(pathsToTry, p => sys.fileExists(p));
}    

/** @internal */
export function findArgument(argumentName: string, args: readonly string[]): string | undefined {
    const index = args.indexOf(argumentName);
    return index >= 0 && index < args.length - 1
        ? args[index + 1]
        : undefined;
}

/** @internal */
export function createDiagnosticForRange(sourceFile: SourceFile, range: TextRange, message: DiagnosticMessage): DiagnosticWithLocation {
    return {
        file: sourceFile,
        start: range.pos,
        length: range.end - range.pos,
        code: message.code,
        category: message.category,
        messageText: message.message,
    };
}

/** @internal */
export function createCommentDirectivesMap(sourceFile: SourceFile, commentDirectives: CommentDirective[]): CommentDirectivesMap {
    const directivesByLine = new Map(
        commentDirectives.map(commentDirective => [
            `${getLineAndCharacterOfPosition(sourceFile, commentDirective.range.end).line}`,
            commentDirective,
        ]),
    );

    const usedLines = new Map<string, boolean>();

    return { getUnusedExpectations, markUsed };

    function getUnusedExpectations() {
        return arrayFrom(directivesByLine.entries())
            .filter(([line, directive]) => directive.type === CommentDirectiveType.ExpectError && !usedLines.get(line))
            .map(([_, directive]) => directive);
    }

    function markUsed(line: number) {
        if (!directivesByLine.has(`${line}`)) {
            return false;
        }

        usedLines.set(`${line}`, true);
        return true;
    }
}

export function isThisObjectExpression(node: Expression | QualifiedName): node is CallExpression {
    if (isCallExpression(node)) {
        const name = getNameOfDeclaration(node.expression);
        if (name && isIdentifier(name) && name.text === "this_object") {
            return true;
        }
    }

    return false;
}

export function getStringLiteralsTextRecursively(node: Node): string[] {
    // do a quick traversal to join strings together
    const parts: string[] = [];
    
    if (isStringLiteral(node)) parts.push(node.text);
    forEachChildRecursively(node, n => {
        if (isStringLiteral(n)) {
            parts.push(n.text);
        }
    });

    return parts;
}

/** @internal */
export function createPropertyNameNodeForIdentifierOrLiteral(name: string, target: ScriptTarget, singleQuote: boolean, stringNamed: boolean, isMethod: boolean) {
    const isMethodNamedNew = isMethod && name === "new";
    return !isMethodNamedNew && isIdentifierText(name, target) ? factory.createIdentifier(name) :
        !stringNamed && !isMethodNamedNew && isNumericLiteralName(name) && +name >= 0 ? factory.createIntLiteral(+name) :
        factory.createStringLiteral(name, !!singleQuote);
}

/** @internal */
export function isNewClassExpression(node: Node): node is NewExpression {
    return isNewExpression(node) && isStructTypeNode(node.expression);
}
