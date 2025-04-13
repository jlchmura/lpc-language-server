import {
    AmpersandToken,
    ArrayLiteralExpression,
    ArrayTypeNode,
    BaseNodeFactory,
    BinaryExpression,
    BinaryOperator,
    BinaryOperatorToken,
    BindingElement,
    BindingName,
    BindingPattern,
    Block,
    BreakStatement,
    ByRefElement,
    BytesLiteral,
    CallExpression,
    CallSignatureDeclaration,
    CaseBlock,
    CaseClause,
    CaseOrDefaultClause,
    cast,
    CastExpression,
    CatchExpression,
    CatchStatement,
    CloneObjectExpression,
    ColonToken,
    ComputedPropertyName,
    ConciseBody,
    ConditionalExpression,
    ContinueStatement,
    createBaseNodeFactory,
    createParenthesizerRules,
    Debug,
    Declaration,
    DeclarationName,
    DefaultClause,
    DefineDirective,
    DotDotDotToken,
    DoWhileStatement,
    ElementAccessExpression,
    EmitFlags,
    EmitNode,
    emptyArray,
    EmptyStatement,
    EndOfFileToken,
    EntityName,
    EqualsToken,
    EvaluateExpression,
    Expression,
    ExpressionStatement,
    ExpressionWithTypeArguments,
    FalseLiteral,
    firstOrUndefined,
    FloatLiteral,    
    ForEachStatement,
    ForInitializer,
    formatGeneratedName,
    ForStatement,
    FunctionDeclaration,
    FunctionExpression,
    FunctionTypeNode,
    GeneratedIdentifier,
    GeneratedIdentifierFlags,
    GeneratedNamePart,
    getEmitFlags,
    getIdentifierTypeArguments,
    getJSDocTypeAliasName,
    getNameOfDeclaration,
    getNodeId,
    getNonAssignedNameOfDeclaration,
    getTextOfIdentifierOrLiteral,
    hasProperty,
    HeritageClause,
    Identifier,
    identity,
    idText,
    IfStatement,
    IncludeDirective,
    IndexSignatureDeclaration,
    InheritClauseNodeType,
    InheritDeclaration,
    InlineClosureExpression,
    IntersectionTypeNode,
    IntLiteral,
    isGeneratedIdentifier,
    isIdentifier,    
    isLocalName,    
    isMemberName,    
    isNamedDeclaration,
    isNodeArray,
    isNodeKind,
    isPropertyName,
    isSourceFile,
    isTypeNode,
    isUnaryExpression,
    JSDoc,
    JSDocAugmentsTag,
    JSDocAuthorTag,
    JSDocCallbackTag,
    JSDocClassTag,
    JSDocComment,
    JSDocDeprecatedTag,
    JSDocImplementsTag,
    JSDocLink,
    JSDocLinkCode,
    JSDocLinkPlain,
    JSDocMemberName,
    JSDocNameReference,
    JSDocOptionalType,
    JSDocOverloadTag,
    JSDocOverrideTag,
    JSDocParameterTag,
    JSDocPrivateTag,
    JSDocPropertyLikeTag,
    JSDocPropertyTag,
    JSDocProtectedTag,
    JSDocPublicTag,
    JSDocReturnTag,
    JSDocSatisfiesTag,
    JSDocSeeTag,
    JSDocSignature,
    JSDocTag,
    JSDocTemplateTag,
    JSDocText,
    JSDocThisTag,
    JSDocThrowsTag,
    JSDocType,
    JSDocTypedefTag,
    JSDocTypeExpression,
    JSDocTypeLiteral,
    JSDocTypeTag,
    JSDocUnknownTag,
    JSDocVariableTag,
    JSDocVariadicType,
    KeywordSyntaxKind,
    KeywordToken,
    KeywordTypeNode,
    KeywordTypeSyntaxKind,
    LambdaIdentifierExpression,
    LambdaOperatorExpression,
    LambdaOperatorToken,
    lastOrUndefined,
    LeftHandSideExpression,
    LiteralToken,
    LiteralTypeNode,
    MappingEntryExpression,
    MappingLiteralExpression,
    MappingTypeNode,
    MemberName,
    memoize,
    memoizeOne,
    MethodSignature,
    MissingDeclaration,
    Modifier,
    ModifierFlags,
    ModifierSyntaxKind,
    ModifierToken,
    Mutable,
    MutableNodeArray,
    NamedObjectTypeNode,
    NamedTupleMember,
    NewExpression,
    NewStructExpression,
    Node,
    NodeArray,
    NodeFactory,
    NodeFlags,
    nullParenthesizerRules,
    ObjectLiteralElement,
    ObjectLiteralElementLike,
    ObjectLiteralExpression,
    OmittedExpression,
    ParameterDeclaration,
    ParenthesizedExpression,
    ParenthesizedTypeNode,
    Path,
    PostfixUnaryExpression,
    PostfixUnaryOperator,
    PragmaDirective,
    PrefixUnaryExpression,
    PrefixUnaryOperator,
    PreprocessorDirective,
    PropertyAccessExpression,
    PropertyAccessToken,
    PropertyAssignment,
    PropertyName,
    PropertyNameLiteral,
    PropertySignature,
    PunctuationSyntaxKind,
    PunctuationToken,
    QualifiedName,
    QuestionToken,
    RangeExpression,
    RefToken,
    ReturnStatement,
    ScriptTarget,
    setEmitFlags,
    setIdentifierAutoGenerate,
    setIdentifierTypeArguments,    
    setParent,    
    setTextRange,    
    SourceFile,
    SpreadElement,
    Statement,
    StringLiteral,
    stringToToken,
    StructDeclaration,
    StructKeywordSyntaxKind,
    StructTypeNode,
    SuperAccessExpression,
    SwitchStatement,
    SyntaxKind,
    SyntaxList,
    SyntheticExpression,
    TextRange,
    ThisTypeNode,
    Token,
    TokenFlags,
    TransformFlags,
    TrueLiteral,
    Type,
    TypeAssertion,
    TypeElement,
    TypeLiteralNode,
    TypeNode,
    TypeParameterDeclaration,
    TypePredicateNode,
    TypeReferenceNode,
    UnaryExpression,
    UndefDirective,
    UnionTypeNode,
    VariableDeclaration,
    VariableDeclarationList,
    VariableStatement,
    WhileStatement,
} from "../_namespaces/lpc.js";
import { nullNodeConverters } from "./nodeConverters.js";

let nextAutoGenerateId = 0;

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
export function createNodeFactory(flags: NodeFactoryFlags, baseFactory: BaseNodeFactory): NodeFactory {
    const setOriginal = flags & NodeFactoryFlags.NoOriginalNode ? identity : setOriginalNode;

    // Lazily load the parenthesizer, node converters, and some factory methods until they are used.
    const parenthesizerRules = memoize(() => flags & NodeFactoryFlags.NoParenthesizerRules ? nullParenthesizerRules : createParenthesizerRules(factory));
    const converters = memoize(() => nullNodeConverters);//flags & NodeFactoryFlags.NoNodeConverters ? nullNodeConverters : createNodeConverters(factory));
    const getJSDocTypeLikeTagCreateFunction = memoizeOne(<T extends JSDocTag & { typeExpression?: JSDocTypeExpression; }>(kind: T["kind"]) => (tagName: Identifier | undefined, typeExpression?: JSDocTypeExpression, comment?: NodeArray<JSDocComment>) => createJSDocTypeLikeTagWorker(kind, tagName, typeExpression, comment));
    const getJSDocSimpleTagCreateFunction = memoizeOne(<T extends JSDocTag>(kind: T["kind"]) => (tagName: Identifier | undefined, comment?: NodeArray<JSDocComment>) => createJSDocSimpleTagWorker(kind, tagName, comment));
    const getJSDocUnaryTypeCreateFunction = memoizeOne(<T extends JSDocType & { readonly type: TypeNode | undefined; }>(kind: T["kind"]) => (type: T["type"]) => createJSDocUnaryTypeWorker<T>(kind, type));

    const factory: NodeFactory = {
        get parenthesizer() {
            return parenthesizerRules();
        },
        baseFactory,
        flags,
        get converters() {
            return converters();
        },

        getDeclarationName,
        
        createToken,
        createSourceFile,
        createNodeArray,
        createIdentifier,

        // literals
        createIntLiteral,
        createFloatLiteral,
        createStringLiteral,
        createBytesLiteral,
        createLiteralLikeNode,
        createTrue,
        createFalse,
        createStringLiteralFromNode,

        // directives
        createIncludeDirective,
        createPragmaDirective,
        createDefineDirective,
        createUndefDirective,

        // type elements,
        createIndexSignature,
        createTypeParameterDeclaration,
        updateTypeParameterDeclaration,
        createFunctionTypeNode,
        createCallSignature,

        // modifiers
        createModifier,
        createModifiersFromModifierFlags,

        // types
        createTypePredicateNode,
        updateTypePredicateNode,
        createArrayTypeNode,
        createMappingTypeNode,
        createNamedObjectTypeNode,
        createUnionTypeNode,
        createIntersectionTypeNode,
        createParenthesizedType,
        createKeywordTypeNode,
        createTypeReferenceNode,
        updateTypeReferenceNode,
        createLiteralTypeNode,
        createTypeLiteralNode,
        createStructTypeNode,
        createPropertySignature,
        createMethodSignature,

        // Names
        createQualifiedName,
        createComputedPropertyName,
        updateComputedPropertyName,

        // binding patterns
        createBindingElement,
        updateBindingElement,

        // statements
        createEmptyStatement,
        createBlock,
        createVariableDeclarationList,
        createVariableStatement,
        createVariableDeclaration,
        createFunctionDeclaration,
        createExpressionStatement,
        createReturnStatement,
        createBreakStatement,
        createContinueStatement,
        createInheritDeclaration,        
        createIfStatement,
        createCaseBlock,
        createSwitchStatement,
        createCaseClause,
        createDefaultClause,
        createForStatement,
        createForEachStatement,
        createDoWhileStatement,
        createWhileStatement,
        createParameterDeclaration,
        createMissingDeclaration,
        createStructDeclarationNode,
        createCatchStatement,

        // Expressions
        createCatchExpression,
        createEvaluateExpression,
        createNewExpression,
        createSpreadElement,
        createByRefElement,
        createFunctionExpression,
        createOmittedExpression,
        createParenthesizedExpression,
        createConditionalExpression,
        createBinaryExpression,
        createCallExpression,
        createInlineClosure,
        createSuperAccessExpression,
        createPropertyAccessExpression,
        createPrefixUnaryExpression,
        createPostfixUnaryExpression,
        createElementAccessExpression,
        createRangeExpression,
        createArrayLiteralExpression,
        createObjectLiteralExpression,
        createMappingLiteralExpression,
        createMappingEntryExpression,
        convertToAssignmentExpression,
        createLambdaIdentifierExpression,
        createLambdaOperatorExpression,
        createCastExpression,
        createCloneObjectExpression,
        createTypeAssertion,
        createNewStructExpression,
        createExpressionWithTypeArguments,

        cloneNode,

        createPropertyAssignment,

        // JSDoc

        createJSDocText,
        createJSDocComment,
        createJSDocParameterTag,
        createJSDocTypeExpression,
        createJSDocNameReference,
        createJSDocLink,
        createJSDocLinkCode,
        createJSDocLinkPlain,
        createJSDocUnknownTag,
        createJSDocPropertyTag,
        createJSDocVariableTag,
        createJSDocTypeLiteral,
        createJSDocSeeTag,
        createJSDocImplementsTag,
        createJSDocTypedefTag,
        createJSDocAugmentsTag,
        createJSDocSignature,
        createJSDocCallbackTag,
        createJSDocOverloadTag,
        createJSDocTemplateTag,

        // lazily load factory members for JSDoc tags with similar structure
        get createJSDocOptionalType() {
            return getJSDocUnaryTypeCreateFunction<JSDocOptionalType>(SyntaxKind.JSDocOptionalType);
        },
        get createJSDocTypeTag() {
            return getJSDocTypeLikeTagCreateFunction<JSDocTypeTag>(SyntaxKind.JSDocTypeTag);
        },
        get createJSDocReturnTag() {
            return getJSDocTypeLikeTagCreateFunction<JSDocReturnTag>(SyntaxKind.JSDocReturnTag);
        },
        get createJSDocClassTag() {
            return getJSDocSimpleTagCreateFunction<JSDocClassTag>(SyntaxKind.JSDocClassTag);
        },
        get createJSDocPublicTag() {
            return getJSDocSimpleTagCreateFunction<JSDocPublicTag>(SyntaxKind.JSDocPublicTag);
        },
        get createJSDocPrivateTag() {
            return getJSDocSimpleTagCreateFunction<JSDocPrivateTag>(SyntaxKind.JSDocPrivateTag);
        },
        get createJSDocProtectedTag() {
            return getJSDocSimpleTagCreateFunction<JSDocProtectedTag>(SyntaxKind.JSDocProtectedTag);
        },
        get createJSDocOverrideTag() {
            return getJSDocSimpleTagCreateFunction<JSDocOverrideTag>(SyntaxKind.JSDocOverrideTag);
        },
        get createJSDocDeprecatedTag() {
            return getJSDocSimpleTagCreateFunction<JSDocDeprecatedTag>(SyntaxKind.JSDocDeprecatedTag);
        },
        get createJSDocAuthorTag() {
            return getJSDocSimpleTagCreateFunction<JSDocAuthorTag>(SyntaxKind.JSDocAuthorTag);
        },
        get createJSDocThrowsTag() {
            return getJSDocTypeLikeTagCreateFunction<JSDocThrowsTag>(SyntaxKind.JSDocThrowsTag);
        },
        get createJSDocSatisfiesTag() {
            return getJSDocTypeLikeTagCreateFunction<JSDocSatisfiesTag>(SyntaxKind.JSDocSatisfiesTag);
        },
        get createJSDocThisTag() {
            return getJSDocTypeLikeTagCreateFunction<JSDocThisTag>(SyntaxKind.JSDocThisTag);
        },
        get createJSDocVariadicType() {
            return getJSDocUnaryTypeCreateFunction<JSDocVariadicType>(SyntaxKind.JSDocVariadicType);
        },

        // Sythetic
        createSyntheticExpression,
        createSyntaxList
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
        node.path = "" as Path;
        node.resolvedPath = "" as Path;
        node.originalFileName = "";
        node.languageVersion = ScriptTarget.LPC;
        node.languageVariant = 0;
        node.scriptKind = 0;
        node.isDeclarationFile = false;
        node.hasNoDefaultLib = false;

        node.transformFlags |= propagateChildrenFlags(node.statements) |
            propagateChildFlags(node.endOfFileToken);

        node.heritageClauses = undefined;
        node.inactiveCodeRanges = undefined;
        node.importCandidates = undefined;
        node.jsDocParsingMode = undefined;
        node.parsedMacros = undefined;

        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        node.endFlowNode = undefined;

        node.bindSuggestionDiagnostics = undefined;        

        node.nodeCount = 0;
        node.identifierCount = 0;
        node.symbolCount = 0;
        node.parseDiagnostics = undefined!;
        node.bindDiagnostics = undefined!;
        node.lineMap = undefined!;
        node.externalModuleIndicator = undefined;
        node.setExternalModuleIndicator = undefined;
        node.pragmas = undefined!;
        // node.checkJsDirective = undefined;
        node.checkLpcDirective = undefined!;
        node.referencedFiles = undefined!;
        node.typeReferenceDirectives = undefined!;
        node.libReferenceDirectives = undefined!;
        node.commentDirectives = undefined;
        node.identifiers = undefined!;
        node.imports = undefined!;
        node.ambientModuleNames = undefined!;
        node.classifiableNames = undefined;
        node.impliedNodeFormat = undefined;

        node.nodeMacroMap = undefined;

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
            array.isComplete = undefined;
            Debug.attachNodeArrayDebugInfo(array);
            return array;
        }

        // Since the element list of a node array is typically created by starting with an empty array and
        // repeatedly calling push(), the list may not have the optimal memory layout. We invoke slice() for
        // small arrays (1 to 4 elements) to give the VM a chance to allocate an optimal representation.
        const length = elements.length;
        const array = (length >= 1 && length <= 4 ? elements.slice() : elements) as MutableNodeArray<T>;
        array.pos = firstOrUndefined(array)?.pos ?? -1;
        array.end = lastOrUndefined(array)?.end ?? -1;
        array.hasTrailingComma = !!hasTrailingComma;
        array.isComplete = undefined;
        aggregateChildrenFlags(array);
        Debug.attachNodeArrayDebugInfo(array);
        return array;
    }

    function createBaseToken<T extends Node>(kind: T["kind"]) {
        return baseFactory.createBaseTokenNode(kind) as Mutable<T>;
    }

    function createToken(token: SyntaxKind.EndOfFileToken): EndOfFileToken;
    function createToken(token: SyntaxKind.TrueKeyword): TrueLiteral;
    function createToken(token: SyntaxKind.FalseKeyword): FalseLiteral;
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

    function createBaseNode<T extends Node>(kind: T["kind"]) {
        return baseFactory.createBaseNode(kind) as Mutable<T>;
    }

    function createBaseDeclaration<T extends Declaration>(kind: T["kind"]) {
        const node = createBaseNode(kind);
        node.symbol = undefined!;       // initialized by binder
        node.localSymbol = undefined;   // initialized by binder
        return node;
    }

    function getName(node: Declaration | undefined, allowComments?: boolean, allowSourceMaps?: boolean, emitFlags: EmitFlags = 0, ignoreAssignedName?: boolean) {
        const nodeName = ignoreAssignedName ? node && getNonAssignedNameOfDeclaration(node) : getNameOfDeclaration(node);
        if (nodeName && isIdentifier(nodeName) && !isGeneratedIdentifier(nodeName)) {
            // TODO(rbuckton): Does this need to be parented?
            const name = setParent(setTextRange(cloneNode(nodeName), nodeName), nodeName.parent);
            emitFlags |= getEmitFlags(nodeName);
            if (!allowSourceMaps) emitFlags |= EmitFlags.NoSourceMap;
            if (!allowComments) emitFlags |= EmitFlags.NoComments;
            if (emitFlags) setEmitFlags(name, emitFlags);
            return name;
        }
        return getGeneratedNameForNode(node);
    }
    
    /** Create a unique name generated for a node. */
    // @api
    function getGeneratedNameForNode(node: Node | undefined, flags: GeneratedIdentifierFlags = 0, prefix?: string | GeneratedNamePart, suffix?: string): Identifier {
        Debug.assert(!(flags & GeneratedIdentifierFlags.KindMask), "Argument out of range: flags");
        const text = !node ? "" :
            isMemberName(node) ? formatGeneratedName(/*privateName*/ false, prefix, node, suffix, idText) :
            `generated@${getNodeId(node)}`;
        if (prefix || suffix) flags |= GeneratedIdentifierFlags.Optimistic;
        const name = createBaseGeneratedIdentifier(text, GeneratedIdentifierFlags.Node | flags, prefix, suffix);
        name.original = node;
        return name;
    }

    function createBaseGeneratedIdentifier(text: string, autoGenerateFlags: GeneratedIdentifierFlags, prefix: string | GeneratedNamePart | undefined, suffix: string | undefined) {
        const node = createBaseIdentifier((text)) as Mutable<GeneratedIdentifier>;
        setIdentifierAutoGenerate(node, {
            flags: autoGenerateFlags,
            id: nextAutoGenerateId,
            prefix,
            suffix,
        });
        nextAutoGenerateId++;
        return node;
    }
    
    /**
     * Gets the name of a declaration for use in declarations.
     *
     * @param node The declaration.
     * @param allowComments A value indicating whether comments may be emitted for the name.
     * @param allowSourceMaps A value indicating whether source maps may be emitted for the name.
     */
    function getDeclarationName(node: Declaration | undefined, allowComments?: boolean, allowSourceMaps?: boolean) {
        return getName(node, allowComments, allowSourceMaps);
    }

    // @api
    function createBaseJSDocTag<T extends JSDocTag>(kind: T["kind"], tagName: Identifier, comment: string | NodeArray<JSDocComment> | undefined) {
        const node = createBaseNode<T>(kind);
        node.tagName = tagName;
        node.comment = comment;
        return node;
    }

    // @api
    // createJSDocTypeTag
    // createJSDocReturnTag
    // createJSDocThisTag
    // createJSDocEnumTag
    // createJSDocSatisfiesTag
    function createJSDocTypeLikeTagWorker<T extends JSDocTag & { typeExpression?: JSDocTypeExpression; }>(kind: T["kind"], tagName: Identifier | undefined, typeExpression?: JSDocTypeExpression, comment?: string | NodeArray<JSDocComment>) {
        const node = createBaseJSDocTag<T>(kind, tagName ?? createIdentifier(getDefaultTagNameForKind(kind)), comment);
        node.typeExpression = typeExpression;
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

    function cloneSourceFileWorker(source: SourceFile) {
        // TODO: This mechanism for cloning results in megamorphic property reads and writes. In future perf-related
        //       work, we should consider switching explicit property assignments instead of using `for..in`.
        const node = baseFactory.createBaseSourceFileNode(SyntaxKind.SourceFile) as Mutable<SourceFile>;
        node.flags |= source.flags & ~NodeFlags.Synthesized;
        for (const p in source) {
            if (hasProperty(node, p) || !hasProperty(source, p)) {
                continue;
            }
            if (p === "emitNode") {
                node.emitNode = undefined;
                continue;
            }
            (node as any)[p] = (source as any)[p];
        }
        return node;
    }

    // @api
    function createTrue() {
        return createToken(SyntaxKind.TrueKeyword);
    }

    // @api
    function createFalse() {
        return createToken(SyntaxKind.FalseKeyword);
    }

    function cloneSourceFile(source: SourceFile) {
        const node =  /*source.redirectInfo ? cloneRedirectedSourceFile(source) : */cloneSourceFileWorker(source);
        setOriginal(node, source);
        return node;
    }

    
    function cloneIdentifier(node: Identifier): Identifier {
        const clone = createBaseIdentifier(node.text);
        clone.flags |= node.flags & ~NodeFlags.Synthesized;
        clone.jsDoc = node.jsDoc;
        clone.flowNode = node.flowNode;
        clone.symbol = node.symbol;
        clone.transformFlags = node.transformFlags;
        setOriginal(clone, node);

        // clone type arguments for emitter/typeWriter
        const typeArguments = getIdentifierTypeArguments(node);
        if (typeArguments) setIdentifierTypeArguments(clone, typeArguments);
        return clone;
    }

    // @api
    function createCallSignature(
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        parameters: readonly ParameterDeclaration[],
        type: TypeNode | undefined,
    ): CallSignatureDeclaration {
        const node = createBaseDeclaration<CallSignatureDeclaration>(SyntaxKind.CallSignature);
        // node.typeParameters = asNodeArray(typeParameters);
        node.parameters = asNodeArray(parameters);
        node.type = type;
        node.transformFlags = TransformFlags.None;

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        node.typeArguments = undefined; // used in quick info
        return node;
    }

    // @api
    function createIndexSignature(
        modifiers: readonly Modifier[] | undefined,
        parameters: readonly ParameterDeclaration[],
        type: TypeNode | undefined,
    ): IndexSignatureDeclaration {
        const node = createBaseDeclaration<IndexSignatureDeclaration>(SyntaxKind.IndexSignature);
        node.modifiers = asNodeArray(modifiers);
        node.parameters = asNodeArray(parameters);
        node.type = type!; // TODO(rbuckton): We mark this as required in IndexSignatureDeclaration, but it looks like the parser allows it to be elided.
        node.transformFlags = TransformFlags.None;

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        node.typeArguments = undefined; // used in quick info
        return node;
    }


    // @api
    function cloneNode<T extends Node | undefined>(node: T): T;
    function cloneNode<T extends Node>(node: T) {
        // We don't use "clone" from core.ts here, as we need to preserve the prototype chain of
        // the original node. We also need to exclude specific properties and only include own-
        // properties (to skip members already defined on the shared prototype).
        if (node === undefined) {
            return node;
        }
        if (isSourceFile(node)) {
            return cloneSourceFile(node) as T & SourceFile;
        }
        // if (isGeneratedIdentifier(node)) {
        //     return cloneGeneratedIdentifier(node) as T & GeneratedIdentifier;
        // }
        if (isIdentifier(node)) {
            return cloneIdentifier(node) as T & Identifier;
        }
        // if (isGeneratedPrivateIdentifier(node)) {
        //     return cloneGeneratedPrivateIdentifier(node) as T & GeneratedPrivateIdentifier;
        // }
        // if (isPrivateIdentifier(node)) {
        //     return clonePrivateIdentifier(node) as T & PrivateIdentifier;
        // }

        const clone = !isNodeKind(node.kind) ? baseFactory.createBaseTokenNode(node.kind) as T :
            baseFactory.createBaseNode(node.kind) as T;

        (clone as Mutable<T>).flags |= node.flags & ~NodeFlags.Synthesized;
        (clone as Mutable<T>).transformFlags = node.transformFlags;
        setOriginal(clone, node);

        for (const key in node) {
            if (hasProperty(clone, key) || !hasProperty(node, key)) {
                continue;
            }

            clone[key] = node[key];
        }

        return clone;
    }

    // @api
    function createMissingDeclaration(): MissingDeclaration {
        const node = createBaseDeclaration<MissingDeclaration>(SyntaxKind.MissingDeclaration);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }
    
    // @api
    function createIdentifier(text: string, originalKeywordKind?: SyntaxKind, hasExtendedUnicodeEscape?: boolean): Identifier {
        if (originalKeywordKind === undefined && text) {
            originalKeywordKind = stringToToken(text);
        }
        if (originalKeywordKind === SyntaxKind.Identifier) {
            originalKeywordKind = undefined;
        }

        const node = createBaseIdentifier((text));
        if (hasExtendedUnicodeEscape) node.flags |= NodeFlags.IdentifierHasExtendedUnicodeEscape;

        // NOTE: we do not include transform flags of typeArguments in an identifier as they do not contribute to transformations
        // if (node.escapedText === "await") {
        //     node.transformFlags |= TransformFlags.ContainsPossibleTopLevelAwait;
        // }
        // if (node.flags & NodeFlags.IdentifierHasExtendedUnicodeEscape) {
        //     node.transformFlags |= TransformFlags.ContainsES2015;
        // }
        node.transformFlags = TransformFlags.None;

        return node;
    }

    // @api 
    function createCatchExpression(expression: Expression, modifier?: Identifier, modifierExpression?: Expression, block?: Block): CatchExpression {
        const node = createBaseNode<CatchExpression>(SyntaxKind.CatchExpression);
        node.expression = expression;
        node.modifier = modifier;
        node.modifierExpression = modifierExpression;
        node.block = block;
        return node;
    }

    // @api
    function createCatchStatement(expression: Expression | undefined, block: Block, modifier?: Identifier, modifierExpression?: Expression): CatchStatement {
        const node = createBaseNode<CatchStatement>(SyntaxKind.CatchStatement);
        node.expression = expression;
        node.block = block;
        node.modifier = modifier;
        node.modifierExpression = modifierExpression;
                
        node.transformFlags |= propagateChildFlags(node.expression) |
            propagateChildFlags(node.block);

        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)

        return node;
    }

    // @api 
    function createEvaluateExpression(expression: Expression, argumentsArray: readonly Expression[] | undefined): EvaluateExpression {
        const node = createBaseNode<EvaluateExpression>(SyntaxKind.EvaluateExpression);
        node.expression = expression;
        node.arguments = argumentsArray ? parenthesizerRules().parenthesizeExpressionsOfCommaDelimitedList(argumentsArray) : undefined;

        node.transformFlags |= propagateChildFlags(node.expression) |
            propagateChildrenFlags(node.arguments) |
            TransformFlags.ContainsFluffOS;                    

        return node;
    }

    // @api
    function createNewExpression(expression: Expression|TypeNode|undefined, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[] | undefined): NewExpression {
        const node = createBaseDeclaration<NewExpression>(SyntaxKind.NewExpression);
        node.expression = expression && (isTypeNode(expression) ? expression : parenthesizerRules().parenthesizeExpressionOfNew(expression));
        node.typeArguments = asNodeArray(typeArguments);
        node.arguments = argumentsArray ? parenthesizerRules().parenthesizeExpressionsOfCommaDelimitedList(argumentsArray) : undefined;
        node.transformFlags |= propagateChildFlags(node.expression) |
            // propagateChildrenFlags(node.typeArguments) |
            propagateChildrenFlags(node.arguments) |
            TransformFlags.ContainsFluffOS;
                        
        // if (node.typeArguments) {
        //     node.transformFlags |= TransformFlags.None;
        // }
        return node;
    }
    
    // @api
    function createSpreadElement(expression: Expression): SpreadElement {
        const node = createBaseNode<SpreadElement>(SyntaxKind.SpreadElement);
        node.expression = parenthesizerRules().parenthesizeExpressionForDisallowedComma(expression);
        node.transformFlags |= propagateChildFlags(node.expression) |            
            TransformFlags.ContainsRestOrSpread;
        return node;
    }
    
    // @api
    function createFunctionTypeNode(
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        parameters: readonly ParameterDeclaration[],
        type: TypeNode,
    ): FunctionTypeNode {
        const node = createBaseDeclaration<FunctionTypeNode>(SyntaxKind.FunctionType);
        // node.typeParameters = asNodeArray(typeParameters);
        node.parameters = asNodeArray(parameters);
        node.type = type;
        node.transformFlags = TransformFlags.None;

        node.modifiers = undefined; // initialized by parser for grammar errors
        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        node.typeArguments = undefined; // used in quick info
        return node;
    }
    
    // @api
    function createFunctionExpression(
        modifiers: readonly Modifier[] | undefined,
        name: string | Identifier | undefined,
        parameters: readonly ParameterDeclaration[] | undefined,
        type: TypeNode | undefined,
        body: Block,
    ): FunctionExpression {
        const node = createBaseDeclaration<FunctionExpression>(SyntaxKind.FunctionExpression);
        node.modifiers = asNodeArray(modifiers);        
        node.name = asName(name);        
        node.parameters = createNodeArray(parameters);
        node.type = type;
        node.body = body;
                
        node.transformFlags |= propagateNameFlags(node.name) |
            propagateChildFlags(node.type) |
            propagateChildrenFlags(node.parameters) |
            propagateChildFlags(node.body);

        node.typeArguments = undefined; // used in quick info
        node.jsDoc = undefined;         // initialized by parser (JsDocContainer)
        node.locals = undefined;        // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        node.flowNode = undefined;      // initialized by binder (FlowContainer)
        node.endFlowNode = undefined;
        node.returnFlowNode = undefined;
        return node;
    }

    // @api
    function createPropertyAssignment(name: string | PropertyName, initializer: Expression) {
        const node = createBaseDeclaration<PropertyAssignment>(SyntaxKind.PropertyAssignment);
        node.name = asName(name);
        node.initializer = parenthesizerRules().parenthesizeExpressionForDisallowedComma(initializer);
        node.transformFlags |= propagateNameFlags(node.name) | propagateChildFlags(node.initializer);

        node.modifiers = undefined; // initialized by parser to report grammar errors        
        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }

    // @api
    function createTypeAssertion(type: TypeNode, expression: Expression) {
        const node = createBaseNode<TypeAssertion>(SyntaxKind.TypeAssertionExpression);
        node.expression = parenthesizerRules().parenthesizeOperandOfPrefixUnary(expression);
        node.type = type;
        node.transformFlags |= propagateChildFlags(node.expression) |
            propagateChildFlags(node.type);
        return node;
    }

    // @api 
    function createStructTypeNode(name: Identifier, keyword: StructKeywordSyntaxKind): StructTypeNode {
        const node = createBaseNode<StructTypeNode>(SyntaxKind.StructType);
        node.keyword = keyword;
        node.typeName = name;
        return node;
    }  

    // @api
    function createNewStructExpression(type: StructTypeNode, argumentsArray: readonly Expression[] | ObjectLiteralElementLike[] | undefined): NewStructExpression {
        const node = createBaseDeclaration<NewStructExpression>(SyntaxKind.NewStructExpression);
        node.type = type;
        node.arguments = argumentsArray ? asNodeArray<Expression|ObjectLiteralElementLike>(argumentsArray) : undefined;
        return node;
    }

    // @api 
    function createStructDeclarationNode(
        modifiers: readonly Modifier[] | undefined,
        name: Identifier, 
        heritageName: Identifier | undefined,        
        type: TypeNode
    ): StructDeclaration {
        const node = createBaseDeclaration<StructDeclaration>(SyntaxKind.StructDeclaration);
        node.name = name;
        node.modifiers = asNodeArray(modifiers);
        node.heritageName = heritageName;        
        node.type = type;
 
        node.transformFlags = (node.heritageName) ? TransformFlags.ContainsLDMud : TransformFlags.None;
        
        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        
        return node;
    }  

    // @api
    function createLiteralTypeNode(literal: LiteralTypeNode["literal"]) {
        const node = createBaseNode<LiteralTypeNode>(SyntaxKind.LiteralType);
        node.literal = literal;
        node.transformFlags = TransformFlags.None;
        return node;
    }

    // @api
    function createTypeReferenceNode(typeName: string | EntityName, typeArguments: readonly TypeNode[] | undefined) {
        const node = createBaseNode<TypeReferenceNode>(SyntaxKind.TypeReference);
        node.typeName = asName(typeName);
        node.typeArguments = typeArguments && parenthesizerRules().parenthesizeTypeArguments(createNodeArray(typeArguments));
        node.transformFlags = TransformFlags.None;
        return node;
    }

    // @api
    function updateTypeReferenceNode(node: TypeReferenceNode, typeName: EntityName, typeArguments: NodeArray<TypeNode> | undefined) {
        return node.typeName !== typeName
                || node.typeArguments !== typeArguments
            ? update(createTypeReferenceNode(typeName, typeArguments), node)
            : node;
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
        node.transformFlags = TransformFlags.None;
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
        node.transformFlags = TransformFlags.None;
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
    function createBytesLiteral(text: string, hasExtendedUnicodeEscape?: boolean): BytesLiteral {
        const node = createBaseDeclaration<BytesLiteral>(SyntaxKind.BytesLiteral);
        node.text = text;
        node.hasExtendedUnicodeEscape = hasExtendedUnicodeEscape;
        return node;
    }

    // @api
    function createStringLiteralFromNode(sourceNode: PropertyNameLiteral): StringLiteral {
        const node = createBaseStringLiteral(getTextOfIdentifierOrLiteral(sourceNode));
        node.textSourceNode = sourceNode;
        return node;
    }

    
    // @api
    function createTypePredicateNode(assertsModifier: undefined, parameterName: Identifier | ThisTypeNode | string, type: TypeNode | undefined) {
        const node = createBaseNode<TypePredicateNode>(SyntaxKind.TypePredicate);
        // node.assertsModifier = assertsModifier;
        node.parameterName = asName(parameterName);
        node.type = type;
        node.transformFlags = TransformFlags.None;
        return node;
    }

    // @api
    function updateTypePredicateNode(node: TypePredicateNode, assertsModifier: undefined, parameterName: Identifier | ThisTypeNode, type: TypeNode | undefined) {
        return node.parameterName !== parameterName
                || node.type !== type
            ? update(createTypePredicateNode(assertsModifier, parameterName, type), node)
            : node;
    }

    // @api
    function createArrayTypeNode(elementType: TypeNode): ArrayTypeNode {
        const node = createBaseNode<ArrayTypeNode>(SyntaxKind.ArrayType);
        node.elementType = elementType; // parenthesizerRules().parenthesizeNonArrayTypeOfPostfixType(elementType);
        return node;
    }

    // @api
    function createMappingTypeNode(keyType: TypeNode, valueTypes: NodeArray<TypeNode>): MappingTypeNode {
        const node = createBaseNode<MappingTypeNode>(SyntaxKind.MappingType);
        node.keyType = keyType;
        node.elements = asNodeArray(valueTypes);
        return node;
    }


    // @api
    function createNamedObjectTypeNode(name: StringLiteral | BinaryExpression | ParenthesizedExpression, objectKeyword: TypeNode): NamedObjectTypeNode {
        const node = createBaseNode<NamedObjectTypeNode>(SyntaxKind.NamedObjectType);
        node.objectKeyword = objectKeyword;
        node.name = name;
        return node;
    }

    function createUnionOrIntersectionTypeNode(kind: SyntaxKind.UnionType | SyntaxKind.IntersectionType, types: readonly TypeNode[], parenthesize: (nodes: readonly TypeNode[]) => readonly TypeNode[]) {
        const node = createBaseNode<UnionTypeNode | IntersectionTypeNode>(kind);
        node.types = factory.createNodeArray(parenthesize(types));
        node.transformFlags = TransformFlags.None;
        return node;
    }

    // @api
    function createUnionTypeNode(types: readonly TypeNode[]): UnionTypeNode {
        const node = createBaseNode<UnionTypeNode>(SyntaxKind.UnionType);
        node.types = factory.createNodeArray(types); //parenthesize(types));
        return node;
    }

    // @api
    function createIntersectionTypeNode(types: readonly TypeNode[]): IntersectionTypeNode {
        return createUnionOrIntersectionTypeNode(SyntaxKind.IntersectionType, types, parenthesizerRules().parenthesizeConstituentTypesOfIntersectionType) as IntersectionTypeNode;
    }

    function asNodeArray<T extends Node>(array: readonly T[]): NodeArray<T>;
    function asNodeArray<T extends Node>(
        array: readonly T[] | undefined
    ): NodeArray<T> | undefined;
    function asNodeArray<T extends Node>(
        array: readonly T[] | undefined
    ): NodeArray<T> | undefined {
        return array?.length > 0 ? createNodeArray(array) : undefined;
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
        type: TypeNode | undefined,        
        declarationList:
            | VariableDeclarationList
            | readonly VariableDeclaration[]
    ): VariableStatement {
        const node = createBaseNode<VariableStatement>(
            SyntaxKind.VariableStatement
        );
        node.modifiers = asNodeArray(modifiers);
        node.type = type;
        node.declarationList = Array.isArray(declarationList)
            ? createVariableDeclarationList(declarationList)
            : (declarationList as VariableDeclarationList);

        node.transformFlags |= propagateChildrenFlags(node.modifiers) | propagateChildFlags(node.declarationList);        
        
        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function createVariableDeclaration(
        name: string | BindingName,
        refToken: RefToken,
        type: TypeNode | undefined,        
        initializer?: Expression | undefined
    ): VariableDeclaration {
        const node = createBaseDeclaration<VariableDeclaration>(
            SyntaxKind.VariableDeclaration
        );
        node.name = asName(name);
        node.type = type;        
        node.initializer = asInitializer(initializer);
        node.refToken = refToken;

        node.transformFlags |= propagateNameFlags(node.name) |
            propagateChildFlags(node.initializer);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }

    function asInitializer(node: Expression | undefined) {
        return node; // && parenthesizerRules().parenthesizeExpressionForDisallowedComma(node);
    }

    function asName<T extends DeclarationName | Identifier | BindingName | PropertyName | EntityName | ThisTypeNode | undefined>(name: string | T): T | Identifier {
        return typeof name === "string" ? createIdentifier(name) :
            name;
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

    function createCastExpression(expression: Expression, type: TypeNode): Expression {
        const node = createBaseNode<CastExpression>(SyntaxKind.CastExpression);
        node.expression = expression;
        node.type = type;
        return node;
    }

    // @api
    function convertToAssignmentExpression(node: Mutable<VariableDeclaration>): BinaryExpression {
        Debug.assertNode(node.name, isIdentifier);
        Debug.assertIsDefined(node.equalsToken);
        Debug.assertIsDefined(node.initializer);
                
        const name = node.name;
        const initializer = node.initializer;
        const eq = node.equalsToken;

        // now clear our original properties
        node.name = undefined!;
        node.initializer = undefined!;
        node.equalsToken = undefined!;
        
        // convert to binary expression
        const newNode = node as unknown as Mutable<BinaryExpression>;
        newNode.kind = SyntaxKind.BinaryExpression;
        newNode.left = name;    
        newNode.operatorToken = eq;
        newNode.right = initializer!;
        return newNode;        
    }

    function asToken<TKind extends SyntaxKind>(value: TKind | Token<TKind>): Token<TKind> {
        return typeof value === "number" ? createToken(value) : value;
    }

    // @api
    function createEmptyStatement() {
        const node = createBaseNode<EmptyStatement>(SyntaxKind.EmptyStatement);
        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }

    // @api
    function createBlock(statements: readonly Statement[], multiLine?: boolean): Block {
        const node = createBaseNode<Block>(SyntaxKind.Block);
        node.statements = createNodeArray(statements);
        node.multiLine = multiLine;
        node.transformFlags |= propagateChildrenFlags(node.statements);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        return node;
    }

    // @api
    function createLambdaIdentifierExpression(name: Expression): LambdaIdentifierExpression {
        const node = createBaseNode<LambdaIdentifierExpression>(SyntaxKind.LambdaIdentifierExpression);
        node.name = (name);
        return node;
    }

    // @api
    function createLambdaOperatorExpression(op: LambdaOperatorToken): LambdaOperatorExpression {
        const node = createBaseNode<LambdaOperatorExpression>(SyntaxKind.LambdaOperatorExpression);
        node.operator = op;
        return node;
    }
        
    // @api
    function createMethodSignature(
        modifiers: readonly Modifier[] | undefined,
        name: string | PropertyName,
        questionToken: QuestionToken | undefined,
        typeParameters: readonly TypeParameterDeclaration[] | undefined,
        parameters: readonly ParameterDeclaration[],
        type: TypeNode | undefined,
    ) {
        const node = createBaseDeclaration<MethodSignature>(SyntaxKind.MethodSignature);
        node.modifiers = asNodeArray(modifiers);
        node.name = asName(name);
        // node.questionToken = questionToken;
        // node.typeParameters = asNodeArray(typeParameters);
        node.parameters = asNodeArray(parameters);
        node.type = type;
        node.transformFlags = TransformFlags.None;

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        node.typeArguments = undefined; // used in quick info
        return node;
    }
    
    // @api
    function createBindingElement(dotDotDotToken: DotDotDotToken | undefined, propertyName: string | PropertyName | undefined, name: string | BindingName, initializer?: Expression) {
        const node = createBaseDeclaration<BindingElement>(SyntaxKind.BindingElement);
        node.dotDotDotToken = dotDotDotToken;
        node.propertyName = asName(propertyName);
        node.name = asName(name);
        node.initializer = asInitializer(initializer);
        node.transformFlags |= propagateChildFlags(node.dotDotDotToken) |
            propagateNameFlags(node.propertyName) |
            propagateNameFlags(node.name) |
            propagateChildFlags(node.initializer) |
            (node.dotDotDotToken ? TransformFlags.ContainsRestOrSpread : TransformFlags.None);/* | TransformFlags.ContainsES2015;*/

        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function updateBindingElement(node: BindingElement, dotDotDotToken: DotDotDotToken | undefined, propertyName: PropertyName | undefined, name: BindingName, initializer: Expression | undefined) {
        return node.propertyName !== propertyName
                || node.dotDotDotToken !== dotDotDotToken
                || node.name !== name
                || node.initializer !== initializer
            ? update(createBindingElement(dotDotDotToken, propertyName, name, initializer), node)
            : node;
    }
    
    function update<T extends Node>(updated: Mutable<T>, original: T): T {
        if (updated !== original) {
            setOriginal(updated, original);
            setTextRange(updated, original);
        }
        return updated;
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
        
        if (!node.body) {
            node.transformFlags = TransformFlags.None;
        } else {
            node.transformFlags = propagateChildrenFlags(node.modifiers) |
                propagateChildFlags(node.asteriskToken) |
                propagateNameFlags(node.name) |
                propagateChildrenFlags(node.typeParameters) |
                propagateChildrenFlags(node.parameters) |
                propagateChildFlags(node.type) |
                (propagateChildFlags(node.body)) | // & ~TransformFlags.ContainsPossibleTopLevelAwait) |                
                // (node.typeParameters || node.type ? TransformFlags.ContainsTypeScript : TransformFlags.None) |
                TransformFlags.ContainsHoistedDeclarationOrCompletion;
        }

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

    // @api
    function createCloneObjectExpression(expression: LeftHandSideExpression, argumentsArray: readonly Expression[] | undefined): CloneObjectExpression {
        const node = createBaseDeclaration<CloneObjectExpression>(SyntaxKind.CloneObjectExpression);
        node.expression = expression;                
        node.arguments = asNodeArray(argumentsArray);

        return node;
    }
    
    function createBaseCallExpression(expression: LeftHandSideExpression,  argumentsArray: NodeArray<Expression>) {
        const node = createBaseDeclaration<CallExpression>(SyntaxKind.CallExpression);
        node.expression = expression;                
        node.arguments = argumentsArray;

        node.transformFlags |= propagateChildFlags(node.expression) |
            // propagateChildFlags(node.questionDotToken) |
            propagateChildrenFlags(node.typeArguments) |
            propagateChildrenFlags(node.arguments);
        if (node.typeArguments) {
            node.transformFlags |= TransformFlags.None;
        }
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
        
        node.transformFlags |= propagateChildFlags(node.body);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        node.endFlowNode = undefined;
        node.returnFlowNode = undefined;
        node.typeArguments = undefined; // used in quick info
        return node;
    }

    // @api
    function createExpressionStatement(expression: Expression): ExpressionStatement {
        const node = createBaseNode<ExpressionStatement>(SyntaxKind.ExpressionStatement);
        node.expression = expression;//parenthesizerRules().parenthesizeExpressionOfExpressionStatement(expression);
        node.transformFlags |= propagateChildFlags(node.expression);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function createReturnStatement(expression?: Expression): ReturnStatement {
        const node = createBaseNode<ReturnStatement>(SyntaxKind.ReturnStatement);
        node.expression = expression;

        node.transformFlags |= propagateChildFlags(node.expression);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function createBreakStatement(label?: string | Identifier): BreakStatement {
        const node = createBaseNode<BreakStatement>(SyntaxKind.BreakStatement);
        node.label = asName(label);
        node.transformFlags |= propagateChildFlags(node.label) |
            TransformFlags.ContainsHoistedDeclarationOrCompletion;

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function createContinueStatement(label?: string | Identifier): ContinueStatement {
        const node = createBaseNode<ContinueStatement>(SyntaxKind.ContinueStatement);
        node.label = asName(label);
        node.transformFlags |= propagateChildFlags(node.label) |
            TransformFlags.ContainsHoistedDeclarationOrCompletion;

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }


    // @api 
    function createByRefElement(ampToken: AmpersandToken | RefToken, expr: Expression): ByRefElement {
        const node = createBaseNode<ByRefElement>(SyntaxKind.ByRefElement);
        node.expression = expr;
        return node;
    }

    // @api
    function createDefineDirective(name: string | Identifier, args: NodeArray<ParameterDeclaration>, range: TextRange): DefineDirective {
        const node = createBaseDeclaration<DefineDirective>(SyntaxKind.DefineDirective);
        node.name = asName(name);
        node.arguments = asNodeArray(args);
        node.range = range;
        node.transformFlags |= propagateChildFlags(node.name);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }

    // @api 
    function createUndefDirective(name: string | Identifier): UndefDirective {
        const node = createBaseNode<UndefDirective>(SyntaxKind.UndefDirective);
        node.name = asName(name);
        node.transformFlags = TransformFlags.None;
        return node;
    }

    // @api 
    function createInheritDeclaration(inheritClause: InheritClauseNodeType, modifiers: readonly Modifier[] | undefined): InheritDeclaration {
        const node = createBaseNode<InheritDeclaration>(SyntaxKind.InheritDeclaration);
        node.modifiers = asNodeArray(modifiers);
        node.inheritClause = inheritClause;
        
        node.transformFlags |= propagateChildrenFlags(node.modifiers) |
            propagateChildFlags(node.inheritClause);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)

        return node;
    }

    function asEmbeddedStatement<T extends Node>(statement: T): T | EmptyStatement;
    function asEmbeddedStatement<T extends Node>(statement: T | undefined): T | EmptyStatement | undefined;
    function asEmbeddedStatement<T extends Node>(statement: T | undefined): T | EmptyStatement | undefined {
        return statement;
        //return statement && isNotEmittedStatement(statement) ? setTextRange(setOriginal(createEmptyStatement(), statement), statement) : statement;
    }
    
    // @api
    function createIfStatement(expression: Expression, thenStatement: Statement, elseStatement?: Statement): IfStatement {
        const node = createBaseNode<IfStatement>(SyntaxKind.IfStatement);
        node.expression = expression;
        node.thenStatement = asEmbeddedStatement(thenStatement);
        node.elseStatement = asEmbeddedStatement(elseStatement);
        node.transformFlags |= propagateChildFlags(node.expression) |
            propagateChildFlags(node.thenStatement) |
            propagateChildFlags(node.elseStatement);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api 
    function createCaseBlock(clauses: readonly CaseOrDefaultClause[]): CaseBlock {
        const node = createBaseNode<CaseBlock>(SyntaxKind.CaseBlock);
        node.clauses = createNodeArray(clauses);
        node.transformFlags |= propagateChildrenFlags(node.clauses);
        
        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        return node;
    }

    // @api
    function createSwitchStatement(expression: Expression, preBlock: NodeArray<Statement>, caseBlock: CaseBlock): SwitchStatement {
        const node = createBaseNode<SwitchStatement>(SyntaxKind.SwitchStatement);
        node.expression = expression;
        node.caseBlock = caseBlock;
        node.preBlock = preBlock;
        node.transformFlags |= propagateChildFlags(node.expression) |
            propagateChildFlags(node.caseBlock);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        node.possiblyExhaustive = false; // initialized by binder
        return node;
    }

    // @api
    function createDefaultClause(statements: readonly Statement[]): DefaultClause {
        const node = createBaseNode<DefaultClause>(SyntaxKind.DefaultClause);
        node.statements = createNodeArray(statements);
        node.transformFlags = propagateChildrenFlags(node.statements);
        return node;
    }

    // @api
    function createCaseClause(expression: Expression, statements: readonly Statement[]): CaseClause {
        const node = createBaseNode<CaseClause>(SyntaxKind.CaseClause);
        node.expression = expression;//parenthesizerRules().parenthesizeExpressionForDisallowedComma(expression);
        node.statements = createNodeArray(statements);
        node.transformFlags |= propagateChildFlags(node.expression) |
            propagateChildrenFlags(node.statements);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }

    function createSuperAccessExpression(name: MemberName, namespace?: string | StringLiteral | Identifier): SuperAccessExpression {
        const node = createBaseNode<SuperAccessExpression>(
            SyntaxKind.SuperAccessExpression
        );
        
        node.namespace = asName(namespace)
        node.name = name;

        return node;
    }

    function createBasePropertyAccessExpression(expression: LeftHandSideExpression, name: MemberName, propertyAccessToken?: PropertyAccessToken) {
        const node = createBaseDeclaration<PropertyAccessExpression>(SyntaxKind.PropertyAccessExpression);
        node.expression = expression;        
        node.name = name;
        node.propertyAccessToken = propertyAccessToken;
        node.transformFlags = propagateChildFlags(node.expression) |
            // propagateChildFlags(node.questionDotToken) |
            (isIdentifier(node.name) ?
                propagateIdentifierNameFlags(node.name) :
                propagateChildFlags(node.name));

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function createPropertyAccessExpression(expression: Expression, name: string | Identifier, propertyAccessToken?: PropertyAccessToken): PropertyAccessExpression {
        const node = createBasePropertyAccessExpression(
            parenthesizerRules().parenthesizeLeftSideOfAccess(expression, /*optionalChain*/ false),
            asName(name),
            propertyAccessToken
        );                       
        
        return node;
    }

    // @api
    function createForStatement(initializer: ForInitializer | undefined, condition: Expression | undefined, incrementor: Expression | undefined, statement: Statement): ForStatement {
        const node = createBaseNode<ForStatement>(SyntaxKind.ForStatement);
        node.initializer = initializer;
        node.statement = asEmbeddedStatement(statement);
        node.condition = condition;
        node.incrementor = incrementor;
        node.transformFlags |= propagateChildFlags(node.initializer) |
            propagateChildFlags(node.condition) |
            propagateChildFlags(node.incrementor) |
            propagateChildFlags(node.statement);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function createForEachStatement(initializer: ForInitializer | undefined, range: Expression | undefined, statement: Statement): ForEachStatement {
        const node = createBaseNode<ForEachStatement>(SyntaxKind.ForEachStatement);
        node.initializer = initializer;
        node.statement = asEmbeddedStatement(statement);
        node.expression = range;  
              
        node.transformFlags |= propagateChildFlags(node.initializer) |
            propagateChildFlags(node.expression) |
            // propagateChildFlags(node.incrementor) |
            propagateChildFlags(node.statement);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function createDoWhileStatement(statement: Statement, expression: Expression): DoWhileStatement {
        const node = createBaseNode<DoWhileStatement>(SyntaxKind.DoWhileStatement);
        node.statement = asEmbeddedStatement(statement);
        node.expression = expression;
        node.transformFlags |= propagateChildFlags(node.statement) |
            propagateChildFlags(node.expression) |
            TransformFlags.ContainsHoistedDeclarationOrCompletion;

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function createWhileStatement(statement: Statement, expression: Expression): WhileStatement {
        const node = createBaseNode<WhileStatement>(SyntaxKind.WhileStatement);
        node.statement = asEmbeddedStatement(statement);
        node.expression = expression;
        node.transformFlags |= propagateChildFlags(node.statement) |
            propagateChildFlags(node.expression) |
            TransformFlags.ContainsHoistedDeclarationOrCompletion;

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    // @api
    function createPostfixUnaryExpression(operand: Expression, operator: PostfixUnaryOperator): PostfixUnaryExpression {
        const node = createBaseNode<PostfixUnaryExpression>(SyntaxKind.PostfixUnaryExpression);
        node.operator = operator;
        node.operand = operand as LeftHandSideExpression;//TODO parenthesizerRules().parenthesizeOperandOfPostfixUnary(operand);
        node.transformFlags |= propagateChildFlags(node.operand);
        // Only set this flag for non-generated identifiers and non-"local" names. See the
        // comment in `visitPreOrPostfixUnaryExpression` in module.ts
        // if (
        //     isIdentifier(node.operand) &&
        //     !isGeneratedIdentifier(node.operand) &&
        //     !isLocalName(node.operand)
        // ) {
        //     node.transformFlags |= TransformFlags.ContainsUpdateExpressionForIdentifier;
        // }
        return node;
    }

     // @api
     function createParameterDeclaration(
        modifiers: readonly Modifier[] | undefined,
        dotDotDotToken: DotDotDotToken | undefined,
        name: string | BindingName,
        ampToken?: AmpersandToken | RefToken,
        type?: TypeNode,
        initializer?: Expression,
    ): ParameterDeclaration {
        const node = createBaseDeclaration<ParameterDeclaration>(SyntaxKind.Parameter);
        node.modifiers = asNodeArray(modifiers);
        node.name = asName(name);        
        node.dotDotDotToken = dotDotDotToken;
        node.ampToken = ampToken;
        node.type = type;
        node.initializer = asInitializer(initializer);        

        node.transformFlags = propagateChildrenFlags(node.modifiers) |
            propagateChildFlags(node.dotDotDotToken) |
            propagateNameFlags(node.name) |
            // propagateChildFlags(node.questionToken) |
            propagateChildFlags(node.initializer);            
            
        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }

    function createBaseElementAccessExpression(expression: LeftHandSideExpression, argumentExpression: Expression) {
        const node = createBaseDeclaration<ElementAccessExpression>(SyntaxKind.ElementAccessExpression);
        node.expression = expression;        
        node.argumentExpression = argumentExpression;
        node.transformFlags |= propagateChildFlags(node.expression) |
            // propagateChildFlags(node.questionDotToken) |
            propagateChildFlags(node.argumentExpression);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }

    function asExpression<T extends Expression | undefined>(value: string | number | T): T | StringLiteral | IntLiteral {
        return typeof value === "string" ? createStringLiteral(value) :
            typeof value === "number" ? createIntLiteral(value) :
            //typeof value === "boolean" ? value ? createTrue() : createFalse() :
            value;
    }

    // @api 
    function createPragmaDirective(expression: NodeArray<Identifier>): PragmaDirective {
        const node = createBaseNode<PragmaDirective>(SyntaxKind.PragmaDirective);
        node.expression = asNodeArray(expression);

        node.transformFlags = TransformFlags.None;        
        node.jsDoc = undefined; // initialized by parser (JsDocContainer)

        return node;
    }

    // @api 
    function createIncludeDirective(content: StringLiteral[], localFirst: boolean): IncludeDirective {
        const node = createBaseNode<IncludeDirective>(SyntaxKind.IncludeDirective);
        node.content = createNodeArray(content);        
        node.localFirst = localFirst;

        node.transformFlags = TransformFlags.None;
        
        node.jsDoc = undefined; // initialized by parser (JsDocContainer)        

        return node;
    }

    // @api 
    function createRangeExpression(left: Expression, right: Expression): RangeExpression {
        const node = createBaseDeclaration<RangeExpression>(SyntaxKind.RangeExpression);
        node.left = left;
        node.right = right;

        node.transformFlags |= propagateChildFlags(node.left) | 
            propagateChildFlags(node.right);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)

        return node;
    }

    // @api
    function createElementAccessExpression(expression: Expression, index: number | Expression) {
        const node = createBaseElementAccessExpression(
            parenthesizerRules().parenthesizeLeftSideOfAccess(expression, /*optionalChain*/ false),            
            asExpression(index),
        );
        // if (isSuperKeyword(expression)) {
        //     // super method calls require a lexical 'this'
        //     // super method calls require 'super' hoisting in ES2017 and ES2018 async functions and async generators
        //     node.transformFlags |= TransformFlags.ContainsES2017 |
        //         TransformFlags.ContainsES2018;
        // }
        return node;
    }


    // @api
    function createQualifiedName(left: EntityName, right: string | Identifier) {
        const node = createBaseNode<QualifiedName>(SyntaxKind.QualifiedName);
        node.left = left;
        node.right = asName(right);
        node.transformFlags |= propagateChildFlags(node.left) |
            propagateIdentifierNameFlags(node.right);

        node.flowNode = undefined; // initialized by binder (FlowContainer)
        return node;
    }
    
    // @api
    function createComputedPropertyName(expression: Expression) {
        const node = createBaseNode<ComputedPropertyName>(SyntaxKind.ComputedPropertyName);
        node.expression = expression;// TODO  parenthesizerRules().parenthesizeExpressionOfComputedPropertyName(expression);
        node.transformFlags |= propagateChildFlags(node.expression);
        //     TransformFlags.ContainsES2015 |
        //     TransformFlags.ContainsComputedPropertyName;
        return node;
    }

    // @api
    function updateComputedPropertyName(node: ComputedPropertyName, expression: Expression) {
        return node.expression !== expression
            ? update(createComputedPropertyName(expression), node)
            : node;
    }

    // @api
    function createOmittedExpression(): OmittedExpression {
        return createBaseNode<OmittedExpression>(SyntaxKind.OmittedExpression);
    }

    // @api
    function createParenthesizedExpression(expression: Expression) {
        const node = createBaseNode<ParenthesizedExpression>(SyntaxKind.ParenthesizedExpression);
        node.expression = expression;
        node.transformFlags = propagateChildFlags(node.expression);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }

    // @api
    function createParenthesizedType(type: TypeNode) {
        const node = createBaseNode<ParenthesizedTypeNode>(SyntaxKind.ParenthesizedType);
        node.type = type;
        node.transformFlags = TransformFlags.None;
        return node;
    }

    // @api
    function createKeywordTypeNode<TKind extends KeywordTypeSyntaxKind>(kind: TKind) {
        return createToken(kind);
    }


    // @api
    function createPrefixUnaryExpression(operator: PrefixUnaryOperator, operand: Expression) {
        const node = createBaseNode<PrefixUnaryExpression>(SyntaxKind.PrefixUnaryExpression);
        node.operator = operator;

        // force parenthesization of non-unary expressssion operands
        if (!isUnaryExpression(operand)) {
            operand = setTextRange(factory.createParenthesizedExpression(operand), operand)
        }

        node.operand = cast(operand, isUnaryExpression);//parenthesizerRules().parenthesizeOperandOfPrefixUnary(operand);
        node.transformFlags |= propagateChildFlags(node.operand);
        // Only set this flag for non-generated identifiers and non-"local" names. See the
        // comment in `visitPreOrPostfixUnaryExpression` in module.ts
        if (
            (operator === SyntaxKind.PlusPlusToken || operator === SyntaxKind.MinusMinusToken) &&
            isIdentifier(node.operand) &&
            !isGeneratedIdentifier(node.operand) &&
            !isLocalName(node.operand)
        ) {
            node.transformFlags |= TransformFlags.ContainsUpdateExpressionForIdentifier;
        }
        return node;
    }

    // @api
    function createObjectLiteralExpression(properties?: readonly ObjectLiteralElementLike[], multiLine?: boolean) {
        const node = createBaseDeclaration<ObjectLiteralExpression>(SyntaxKind.ObjectLiteralExpression);
        node.properties = createNodeArray(properties);
        node.multiLine = multiLine;
        node.transformFlags |= propagateChildrenFlags(node.properties);

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }
    
    // @api
    function createArrayLiteralExpression(elements?: readonly Expression[], multiLine?: boolean, trailingComma?: boolean) {
        const node = createBaseNode<ArrayLiteralExpression>(SyntaxKind.ArrayLiteralExpression);
        // Ensure we add a trailing comma for something like `[NumericLiteral(1), NumericLiteral(2), OmittedExpresion]` so that
        // we end up with `[1, 2, ,]` instead of `[1, 2, ]` otherwise the `OmittedExpression` will just end up being treated like
        // a trailing comma.
        const lastElement = elements && lastOrUndefined(elements);
        const elementsArray = elements ? createNodeArray(elements, trailingComma) : undefined;
        node.elements = parenthesizerRules().parenthesizeExpressionsOfCommaDelimitedList(elementsArray);
        node.multiLine = multiLine;
        node.transformFlags |= propagateChildrenFlags(node.elements);        
        return node;
    }

    // @api
    function createMappingLiteralExpression(initializer?: Expression, elements?: readonly MappingEntryExpression[], multiLine?: boolean, trailingComma?: boolean): MappingLiteralExpression {
        const node = createBaseNode<MappingLiteralExpression>(SyntaxKind.MappingLiteralExpression);
        // Ensure we add a trailing comma for something like `[NumericLiteral(1), NumericLiteral(2), OmittedExpresion]` so that
        // we end up with `[1, 2, ,]` instead of `[1, 2, ]` otherwise the `OmittedExpression` will just end up being treated like
        // a trailing comma.
        const lastElement = elements && lastOrUndefined(elements);
        const elementsArray = elements ? createNodeArray(elements, trailingComma) : undefined;
        node.initializer = initializer;
        node.elements = elementsArray;// parenthesizerRules().parenthesizeExpressionsOfCommaDelimitedList(elementsArray);
        node.multiLine = multiLine;
        node.transformFlags |= propagateChildrenFlags(node.elements);
        return node;
    }

    function createMappingEntryExpression(name: Expression, elements: readonly Expression[]): MappingEntryExpression {
        const node = createBaseNode<MappingEntryExpression>(SyntaxKind.MappingEntryExpression);
        node.name = name;
        node.elements = asNodeArray(elements);
        node.transformFlags |= propagateChildFlags(node.name) |
            propagateChildrenFlags(node.elements);
        return node;
    }

    // @api
    function createPropertySignature(
        modifiers: readonly Modifier[] | undefined,
        name: PropertyName | string,        
        type: TypeNode | undefined,
    ): PropertySignature {
        const node = createBaseDeclaration<PropertySignature>(SyntaxKind.PropertySignature);
        node.modifiers = asNodeArray(modifiers);
        node.name = asName(name);
        node.type = type;        
        node.transformFlags = TransformFlags.None;

        node.initializer = undefined; // initialized by parser to report grammar errors
        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }
    
    // @api
    function createTypeLiteralNode(members: readonly TypeElement[] | undefined) {
        const node = createBaseDeclaration<TypeLiteralNode>(SyntaxKind.TypeLiteral);
        node.members = createNodeArray(members);
        node.transformFlags = TransformFlags.None;
        return node;
    }

    // @api
    function createJSDocText(text: string): JSDocText {
        const node = createBaseNode<JSDocText>(SyntaxKind.JSDocText);
        node.text = text;
        return node;
    }

    // @api
    function createJSDocComment(comment?: string | NodeArray<JSDocComment> | undefined, tags?: readonly JSDocTag[] | undefined) {
        const node = createBaseNode<JSDoc>(SyntaxKind.JSDoc);
        node.comment = comment;
        node.tags = asNodeArray(tags);
        return node;
    }

    // @api
    function createJSDocTypeExpression(type: TypeNode): JSDocTypeExpression {
        const node = createBaseNode<JSDocTypeExpression>(SyntaxKind.JSDocTypeExpression);
        node.type = type;
        return node;
    }

    // @api
    function createJSDocNameReference(name: EntityName | JSDocMemberName): JSDocNameReference {
        const node = createBaseNode<JSDocNameReference>(SyntaxKind.JSDocNameReference);
        node.name = name;
        return node;
    }
    
    // @api
    // createJSDocNullableType
    // createJSDocNonNullableType
    function createJSDocPrePostfixUnaryTypeWorker<T extends JSDocType & { readonly type: TypeNode | undefined; readonly postfix: boolean; }>(kind: T["kind"], type: T["type"], postfix = false): T {
        const node = createJSDocUnaryTypeWorker(
            kind,
            postfix ? type && parenthesizerRules().parenthesizeNonArrayTypeOfPostfixType(type) : type,
        ) as Mutable<T>;
        node.postfix = postfix;
        return node;
    }

    // @api
    // createJSDocOptionalType
    // createJSDocVariadicType
    // createJSDocNamepathType
    function createJSDocUnaryTypeWorker<T extends JSDocType & { readonly type: TypeNode | undefined; }>(kind: T["kind"], type: T["type"]): T {
        const node = createBaseNode<T>(kind);
        node.type = type;
        return node;
    }

    function createBaseJSDocTagDeclaration<T extends JSDocTag & Declaration>(kind: T["kind"], tagName: Identifier, comment: string | NodeArray<JSDocComment> | undefined) {
        const node = createBaseDeclaration<T>(kind);
        node.comment = comment;
        node.tagName = tagName;
        return node;
    }

    // @api
    function createJSDocParameterTag(tagName: Identifier | undefined, name: EntityName, defaultExpression: Expression | undefined, isBracketed: boolean, typeExpression?: JSDocTypeExpression, isNameFirst?: boolean, comment?: string | NodeArray<JSDocComment>): JSDocParameterTag {
        const node = createBaseJSDocTagDeclaration<JSDocParameterTag>(SyntaxKind.JSDocParameterTag, tagName ?? createIdentifier("param"), comment);
        node.typeExpression = typeExpression;
        node.name = name;
        node.defaultExpression = defaultExpression;
        node.isNameFirst = !!isNameFirst;
        node.isBracketed = isBracketed;
        return node;
    }

    // @api
    // createJSDocAuthorTag
    // createJSDocClassTag
    // createJSDocPublicTag
    // createJSDocPrivateTag
    // createJSDocProtectedTag
    // createJSDocReadonlyTag
    // createJSDocDeprecatedTag
    function createJSDocSimpleTagWorker<T extends JSDocTag>(kind: T["kind"], tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>) {
        const node = createBaseJSDocTag<T>(kind, tagName ?? createIdentifier(getDefaultTagNameForKind(kind)), comment);
        return node;
    }

    // @api
    function createJSDocLink(name: EntityName | JSDocMemberName | undefined, text: string): JSDocLink {
        const node = createBaseNode<JSDocLink>(SyntaxKind.JSDocLink);
        node.name = name;
        node.text = text;
        return node;
    }

    // @api
    function createJSDocLinkCode(name: EntityName | JSDocMemberName | undefined, text: string): JSDocLinkCode {
        const node = createBaseNode<JSDocLinkCode>(SyntaxKind.JSDocLinkCode);
        node.name = name;
        node.text = text;
        return node;
    }

    // @api
    function createJSDocLinkPlain(name: EntityName | JSDocMemberName | undefined, text: string): JSDocLinkPlain {
        const node = createBaseNode<JSDocLinkPlain>(SyntaxKind.JSDocLinkPlain);
        node.name = name;
        node.text = text;
        return node;
    }

    // @api
    function createJSDocUnknownTag(tagName: Identifier, comment?: string | NodeArray<JSDocComment>): JSDocUnknownTag {
        const node = createBaseJSDocTag<JSDocUnknownTag>(SyntaxKind.JSDocTag, tagName, comment);
        return node;
    }

    // @api
    function createJSDocPropertyTag(tagName: Identifier | undefined, name: EntityName, isBracketed: boolean, typeExpression?: JSDocTypeExpression, isNameFirst?: boolean, comment?: string | NodeArray<JSDocComment>): JSDocPropertyTag {
        const node = createBaseJSDocTagDeclaration<JSDocPropertyTag>(SyntaxKind.JSDocPropertyTag, tagName ?? createIdentifier("prop"), comment);
        node.typeExpression = typeExpression;
        node.name = name;
        node.isNameFirst = !!isNameFirst;
        node.isBracketed = isBracketed;
        return node;
    }

    // @api
    function createJSDocVariableTag(tagName: Identifier | undefined, name: EntityName, isBracketed: boolean, typeExpression?: JSDocTypeExpression, isNameFirst?: boolean, comment?: string | NodeArray<JSDocComment>): JSDocVariableTag {
        const node = createBaseJSDocTagDeclaration<JSDocVariableTag>(SyntaxKind.JSDocVariableTag, tagName ?? createIdentifier("var"), comment);
        node.typeExpression = typeExpression;
        node.name = name;
        node.isNameFirst = !!isNameFirst;
        node.isBracketed = isBracketed;
        return node;
    }

    // @api
    function createJSDocTypeLiteral(propertyTags?: readonly JSDocPropertyLikeTag[], isArrayType = false): JSDocTypeLiteral {
        const node = createBaseDeclaration<JSDocTypeLiteral>(SyntaxKind.JSDocTypeLiteral);
        node.jsDocPropertyTags = asNodeArray(propertyTags);
        node.isArrayType = isArrayType;
        return node;
    }

    // @api
    function createJSDocSeeTag(tagName: Identifier | undefined, name: JSDocNameReference | undefined, comment?: string | NodeArray<JSDocComment>): JSDocSeeTag {
        const node = createBaseJSDocTag<JSDocSeeTag>(SyntaxKind.JSDocSeeTag, tagName ?? createIdentifier("see"), comment);
        node.name = name;
        return node;
    }

    // @api
    function createJSDocImplementsTag(tagName: Identifier | undefined, className: JSDocImplementsTag["class"], comment?: string | NodeArray<JSDocComment>): JSDocImplementsTag {
        const node = createBaseJSDocTag<JSDocImplementsTag>(SyntaxKind.JSDocImplementsTag, tagName ?? createIdentifier("implements"), comment);
        node.class = className;
        return node;
    }

    // @api
    function createJSDocTypedefTag(tagName: Identifier | undefined, typeExpression?: JSDocTypeExpression, fullName?: Identifier, comment?: string | NodeArray<JSDocComment>): JSDocTypedefTag {
        const node = createBaseJSDocTagDeclaration<JSDocTypedefTag>(SyntaxKind.JSDocTypedefTag, tagName ?? createIdentifier("typedef"), comment);
        node.typeExpression = typeExpression;
        node.fullName = fullName;
        node.name = getJSDocTypeAliasName(fullName);

        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        return node;
    }

    // @api
    function createJSDocAugmentsTag(tagName: Identifier | undefined, className: JSDocAugmentsTag["class"], comment?: string | NodeArray<JSDocComment>): JSDocAugmentsTag {
        const node = createBaseJSDocTag<JSDocAugmentsTag>(SyntaxKind.JSDocAugmentsTag, tagName ?? createIdentifier("augments"), comment);
        node.class = className;
        return node;
    }

    // @api
    function createExpressionWithTypeArguments(expression: Expression, typeArguments: readonly TypeNode[] | undefined) {
        const node = createBaseNode<ExpressionWithTypeArguments>(SyntaxKind.ExpressionWithTypeArguments);
        node.expression = parenthesizerRules().parenthesizeLeftSideOfAccess(expression, /*optionalChain*/ false);
        node.typeArguments = typeArguments && parenthesizerRules().parenthesizeTypeArguments(typeArguments);
        node.transformFlags |= propagateChildFlags(node.expression) |
            propagateChildrenFlags(node.typeArguments) ;
        return node;
    }

    //
    // Synthetic Nodes (used by checker)
    //

    // @api
    function createSyntheticExpression(type: Type, isSpread = false, tupleNameSource?: ParameterDeclaration | NamedTupleMember) {
        const node = createBaseNode<SyntheticExpression>(SyntaxKind.SyntheticExpression);
        node.type = type;
        node.isSpread = isSpread;
        node.tupleNameSource = tupleNameSource;
        return node;
    }

    // @api
    function createSyntaxList(children: readonly Node[]) {
        const node = createBaseNode<SyntaxList>(SyntaxKind.SyntaxList);
        node._children = children;
        return node;
    }

    // @api
    function createJSDocSignature(typeParameters: readonly JSDocTemplateTag[] | undefined, parameters: readonly JSDocParameterTag[], type?: JSDocReturnTag): JSDocSignature {
        const node = createBaseDeclaration<JSDocSignature>(SyntaxKind.JSDocSignature);
        // node.typeParameters = asNodeArray(typeParameters);
        node.parameters = createNodeArray(parameters);
        node.type = type;

        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        return node;
    }

    // @api
    function createJSDocCallbackTag(tagName: Identifier | undefined, typeExpression: JSDocSignature, fullName?: Identifier, comment?: string | NodeArray<JSDocComment>): JSDocCallbackTag {
        const node = createBaseJSDocTagDeclaration<JSDocCallbackTag>(SyntaxKind.JSDocCallbackTag, tagName ?? createIdentifier("callback"), comment);
        node.typeExpression = typeExpression;
        node.fullName = fullName;
        node.name = getJSDocTypeAliasName(fullName);

        node.locals = undefined; // initialized by binder (LocalsContainer)
        node.nextContainer = undefined; // initialized by binder (LocalsContainer)
        return node;
    }

    // @api
    function createJSDocOverloadTag(tagName: Identifier | undefined, typeExpression: JSDocSignature, comment?: string | NodeArray<JSDocComment>): JSDocOverloadTag {
        const node = createBaseJSDocTag<JSDocOverloadTag>(SyntaxKind.JSDocOverloadTag, tagName ?? createIdentifier("overload"), comment);
        node.typeExpression = typeExpression;
        return node;
    }

    // @api
    function createJSDocTemplateTag(tagName: Identifier | undefined, constraint: JSDocTypeExpression | undefined, typeParameters: readonly TypeParameterDeclaration[], comment?: string | NodeArray<JSDocComment>): JSDocTemplateTag {
        const node = createBaseJSDocTag<JSDocTemplateTag>(SyntaxKind.JSDocTemplateTag, tagName ?? createIdentifier("template"), comment);
        node.constraint = constraint;
        node.typeParameters = createNodeArray(typeParameters);
        return node;
    }

    // @api
    function createTypeParameterDeclaration(modifiers: readonly Modifier[] | undefined, name: string | Identifier, constraint?: TypeNode, defaultType?: TypeNode): TypeParameterDeclaration {
        const node = createBaseDeclaration<TypeParameterDeclaration>(SyntaxKind.TypeParameter);
        node.modifiers = asNodeArray(modifiers);
        node.name = asName(name);
        node.constraint = constraint;
        node.default = defaultType;
        node.transformFlags = TransformFlags.None;

        node.expression = undefined; // initialized by parser to report grammar errors
        node.jsDoc = undefined; // initialized by parser (JsDocContainer)
        return node;
    }

    // @api
    function updateTypeParameterDeclaration(node: TypeParameterDeclaration, modifiers: readonly Modifier[] | undefined, name: Identifier, constraint: TypeNode | undefined, defaultType: TypeNode | undefined): TypeParameterDeclaration {
        return node.modifiers !== modifiers
                || node.name !== name
                || node.constraint !== constraint
                || node.default !== defaultType
            ? update(createTypeParameterDeclaration(modifiers, name, constraint, defaultType), node)
            : node;
    }

    // @api
    function createModifier<T extends ModifierSyntaxKind>(kind: T) {
        return createToken(kind);
    }

    // @api
    function createModifiersFromModifierFlags(flags: ModifierFlags) {
        const result: Modifier[] = [];
        // if (flags & ModifierFlags.Export) result.push(createModifier(SyntaxKind.ExportKeyword));
        // if (flags & ModifierFlags.Ambient) result.push(createModifier(SyntaxKind.DeclareKeyword));
        // if (flags & ModifierFlags.Default) result.push(createModifier(SyntaxKind.DefaultKeyword));
        // if (flags & ModifierFlags.Const) result.push(createModifier(SyntaxKind.ConstKeyword));
        if (flags & ModifierFlags.Public) result.push(createModifier(SyntaxKind.PublicKeyword));
        if (flags & ModifierFlags.Private) result.push(createModifier(SyntaxKind.PrivateKeyword));
        if (flags & ModifierFlags.Protected) result.push(createModifier(SyntaxKind.ProtectedKeyword));
        // if (flags & ModifierFlags.Abstract) result.push(createModifier(SyntaxKind.AbstractKeyword));
        if (flags & ModifierFlags.Static) result.push(createModifier(SyntaxKind.StaticKeyword));
        if (flags & ModifierFlags.NoMask) result.push(createModifier(SyntaxKind.NoMaskKeyword));
        if (flags & ModifierFlags.NoSave) result.push(createModifier(SyntaxKind.NoSaveKeyword));
        if (flags & ModifierFlags.NoShadow) result.push(createModifier(SyntaxKind.NoShadowKeyword));
        if (flags & ModifierFlags.VarArgs) result.push(createModifier(SyntaxKind.VarArgsKeyword));
        // if (flags & ModifierFlags.Override) result.push(createModifier(SyntaxKind.OverrideKeyword));
        // if (flags & ModifierFlags.Readonly) result.push(createModifier(SyntaxKind.ReadonlyKeyword));
        // if (flags & ModifierFlags.Accessor) result.push(createModifier(SyntaxKind.AccessorKeyword));
        // if (flags & ModifierFlags.Async) result.push(createModifier(SyntaxKind.AsyncKeyword));
        // if (flags & ModifierFlags.In) result.push(createModifier(SyntaxKind.InKeyword));
        // if (flags & ModifierFlags.Out) result.push(createModifier(SyntaxKind.OutKeyword));
        return result.length ? result : undefined;
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


const baseFactory = createBaseNodeFactory();

function makeSynthetic(node: Node) {
    (node as Mutable<Node>).flags |= NodeFlags.Synthesized;
    return node;
}

const syntheticFactory: BaseNodeFactory = {
    createBaseSourceFileNode: kind => makeSynthetic(baseFactory.createBaseSourceFileNode(kind)),
    createBaseIdentifierNode: kind => makeSynthetic(baseFactory.createBaseIdentifierNode(kind)),    
    createBaseTokenNode: kind => makeSynthetic(baseFactory.createBaseTokenNode(kind)),
    createBaseNode: kind => makeSynthetic(baseFactory.createBaseNode(kind)),
};
export const factory = createNodeFactory(NodeFactoryFlags.NoIndentationOnFreshPropertyAccess, syntheticFactory);

function propagatePropertyNameFlagsOfChild(node: PropertyName, transformFlags: TransformFlags) {
    return transformFlags;// | (node.transformFlags & TransformFlags.PropertyNamePropagatingFlags);
}

function propagateChildFlags(child: Node | undefined): TransformFlags {
    if (!child) return TransformFlags.None;
    const childFlags = child.transformFlags;// & ~getTransformFlagsSubtreeExclusions(child.kind);
    return isNamedDeclaration(child) && isPropertyName(child.name) ? propagatePropertyNameFlagsOfChild(child.name, childFlags) : childFlags;
}

function aggregateChildrenFlags(children: MutableNodeArray<Node>) {
    let subtreeFlags = TransformFlags.None;
    for (const child of children) {
        subtreeFlags |= propagateChildFlags(child);
    }
    children.transformFlags = subtreeFlags;
}

function getDefaultTagNameForKind(kind: JSDocTag["kind"]): string {
    switch (kind) {
        case SyntaxKind.JSDocTypeTag:
            return "type";
        case SyntaxKind.JSDocReturnTag:
            return "returns";
        case SyntaxKind.JSDocThisTag:
            return "this";
        case SyntaxKind.JSDocEnumTag:
            return "enum";
        case SyntaxKind.JSDocAuthorTag:
            return "author";
        case SyntaxKind.JSDocClassTag:
            return "class";
        case SyntaxKind.JSDocPublicTag:
            return "public";
        case SyntaxKind.JSDocPrivateTag:
            return "private";
        case SyntaxKind.JSDocProtectedTag:
            return "protected";
        case SyntaxKind.JSDocReadonlyTag:
            return "readonly";
        case SyntaxKind.JSDocOverrideTag:
            return "override";
        case SyntaxKind.JSDocTemplateTag:
            return "template";
        case SyntaxKind.JSDocTypedefTag:
            return "typedef";
        case SyntaxKind.JSDocParameterTag:
            return "param";
        case SyntaxKind.JSDocPropertyTag:
            return "prop";
        case SyntaxKind.JSDocCallbackTag:
            return "callback";
        case SyntaxKind.JSDocOverloadTag:
            return "overload";
        case SyntaxKind.JSDocAugmentsTag:
            return "augments";
        case SyntaxKind.JSDocImplementsTag:
            return "implements";
        case SyntaxKind.JSDocImportTag:
            return "import";
        default:
            return Debug.fail(`Unsupported kind: ${Debug.formatSyntaxKind(kind)}`);
    }
}

function propagateChildrenFlags(children: NodeArray<Node> | undefined): TransformFlags {
    return children ? children.transformFlags : TransformFlags.None;
}

function propagateNameFlags(node: PropertyName | BindingPattern | undefined) {
    return node && isIdentifier(node) ? propagateIdentifierNameFlags(node) : propagateChildFlags(node);
}

function propagateIdentifierNameFlags(node: Identifier) {
    // An IdentifierName is allowed to be `await`
    return propagateChildFlags(node);// & ~TransformFlags.ContainsPossibleTopLevelAwait;
}
