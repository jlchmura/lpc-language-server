import { CharacterCodes } from "../backend/types";
import {Type,Symbol, SymbolLinks, CancellationToken, createSymbolTable, Declaration, EmitTextWriter, ModifierFlags, Node, NodeFlags, objectAllocator, Scanner, Signature, SignatureKind, SymbolFlags, TypeChecker, TypeCheckerHost, TypeFormatFlags, TypeParameter, CheckFlags, TransientSymbol, TransientSymbolLinks, reduceLeft, bindSourceFile, SourceFile, Diagnostic, createDiagnosticCollection, concatenate, forEach, tracing, performance, NodeLinks, NodeCheckFlags, FlowNode, FlowType, clear, SyntaxKind, TracingNode, CallLikeExpression, CallExpression, isCallOrNewExpression, isBinaryExpression, Expression, SignatureDeclaration, SignatureFlags, emptyArray, TypeFlags, IntrinsicType, ObjectFlags, Debug, BinaryExpression, ObjectType, StructuredType, ResolvedType, SymbolTable, IndexInfo, Identifier, nodeIsMissing, createNameResolver, InternalSymbolName, SymbolId, some, DiagnosticMessage, DiagnosticArguments, createDiagnosticForNode, createCompilerDiagnostic, FunctionLikeDeclaration, PropertyDeclaration, isString, isIdentifier, Diagnostics, findLast, SymbolFormatFlags, isAccessExpression, isFunctionExpression, isAliasableExpression, PropertyAssignment, isVariableDeclarationInitializedToBareOrAccessedRequire, mapDefined, arrayFrom, getSpellingSuggestion, symbolName, startsWith, nodeIsSynthesized, declarationNameToString, getCanonicalDiagnostic, DiagnosticCategory, addRelatedInfo, ParameterDeclaration, BindingElement, isSourceFile, isExternalOrCommonJsModule, isBlockOrCatchScoped, length, every, isValidTypeOnlyAliasUseSite, isWriteOnlyAccess, getCombinedNodeFlags, DiagnosticWithLocation, getJSDocDeprecatedTag, findAncestor, isCallLikeExpression, isFunctionLike, ParenthesizedExpression, isAssignmentExpression, isVariableDeclaration, isBindingElement, PropertyAccessExpression, getEnclosingBlockScopeContainer, isPropertyDeclaration, nodeStartsNewLexicalEnvironment, isIterationStatement, isForStatement, getAncestor, ForStatement, pushIfUnique, isAssignmentTarget, PrefixUnaryExpression, PostfixUnaryExpression, isBlock, isExpressionNode, isPropertyAccessExpression, getAssignmentTargetKind, AssignmentKind, isInCompoundLikeAssignment, UnionType, TypeId, UnionReduction, getRootDeclaration, getImmediatelyInvokedFunctionExpression, isSpreadAssignment, isParameter, VariableDeclaration, isFunctionLikeDeclaration, isTypeNode, forEachChild, tryCast, canHaveFlowNode, ElementAccessExpression, RelationComparisonResult, LiteralType, FreshableType, getObjectFlags, DiagnosticMessageChain, setNodeFlags, isCallExpression, LazyNodeCheckFlags, getSourceFileOfNode, canIncludeBindAndCheckDiagnostics, forEachChildRecursively, isDeclarationName, EntityName, JSDocMemberName, canHaveSymbol, isLiteralTypeNode, isElementAccessExpression, isIndexedAccessTypeNode, TypeNode, canHaveJSDoc, FlowFlags, FlowArrayMutation, FlowAssignment, FlowCall, FlowCondition, FlowLabel, FlowReduceLabel, FlowSwitchClause, SwitchStatement, createFileDiagnostic, createDiagnosticForFileFromMessageChain, createDiagnosticForNodeFromMessageChain, VariableStatement, HasModifiers, VariableDeclarationList, Block, isFunctionOrModuleBlock, CaseBlock, ForEachStatement, IndexSignatureDeclaration, Path, HasLocals, BindingPattern, idText, isForEachStatement, getNameOfDeclaration, isArrayBindingPattern, first, BindingName, cast, containsParseError } from "./_namespaces/lpc";

let nextSymbolId = 1;
let nextNodeId = 1;
let nextMergeId = 1;
let nextFlowId = 1;

const enum ReferenceHint {
    Unspecified,
    Identifier,
    Property,
    ExportAssignment,
    Jsx,
    AsyncFunction,
    ExportImportEquals,
    ExportSpecifier,
    Decorator,
}


const enum IterationUse {
    AllowsSyncIterablesFlag = 1 << 0,
    AllowsAsyncIterablesFlag = 1 << 1,
    AllowsStringInputFlag = 1 << 2,
    ForOfFlag = 1 << 3,
    YieldStarFlag = 1 << 4,
    SpreadFlag = 1 << 5,
    DestructuringFlag = 1 << 6,
    PossiblyOutOfBounds = 1 << 7,

    // Spread, Destructuring, Array element assignment
    Element = AllowsSyncIterablesFlag,
    Spread = AllowsSyncIterablesFlag | SpreadFlag,
    Destructuring = AllowsSyncIterablesFlag | DestructuringFlag,

    ForOf = AllowsSyncIterablesFlag | AllowsStringInputFlag | ForOfFlag,
    ForAwaitOf = AllowsSyncIterablesFlag | AllowsAsyncIterablesFlag | AllowsStringInputFlag | ForOfFlag,

    YieldStar = AllowsSyncIterablesFlag | YieldStarFlag,
    AsyncYieldStar = AllowsSyncIterablesFlag | AllowsAsyncIterablesFlag | YieldStarFlag,

    GeneratorReturnType = AllowsSyncIterablesFlag,
    AsyncGeneratorReturnType = AllowsAsyncIterablesFlag,
}

/** @internal */
export function createTypeChecker(host: TypeCheckerHost): TypeChecker {
    // Why var? It avoids TDZ checks in the runtime which can be costly.
    // See: https://github.com/microsoft/TypeScript/issues/52924
    /* eslint-disable no-var */
    var deferredDiagnosticsCallbacks: (() => void)[] = [];

    var addLazyDiagnostic = (arg: () => void) => {
        deferredDiagnosticsCallbacks.push(arg);
    };

    // Cancellation that controls whether or not we can cancel in the middle of type checking.
    // In general cancelling is *not* safe for the type checker.  We might be in the middle of
    // computing something, and we will leave our internals in an inconsistent state.  Callers
    // who set the cancellation token should catch if a cancellation exception occurs, and
    // should throw away and create a new TypeChecker.
    //
    // Currently we only support setting the cancellation token when getting diagnostics.  This
    // is because diagnostics can be quite expensive, and we want to allow hosts to bail out if
    // they no longer need the information (for example, if the user started editing again).
    var cancellationToken: CancellationToken | undefined;

    var scanner: Scanner | undefined;

    var Symbol = objectAllocator.getSymbolConstructor();
    var Type = objectAllocator.getTypeConstructor();
    var Signature = objectAllocator.getSignatureConstructor();

    var typeCount = 0;
    var symbolCount = 0;
    var totalInstantiationCount = 0;
    var instantiationCount = 0;
    var instantiationDepth = 0;
    var inlineLevel = 0;
    var currentNode: Node | undefined;
    var varianceTypeParameter: TypeParameter | undefined;
    var isInferencePartiallyBlocked = false;
    var strictNullChecks = false; 

    var emptySymbols = createSymbolTable();

    var compilerOptions = host.getCompilerOptions();
    
    var globals = createSymbolTable();
    var undefinedSymbol = createSymbol(SymbolFlags.Property, "undefined" as string);
    undefinedSymbol.declarations = [];

    var globalThisSymbol = createSymbol(SymbolFlags.Module, "globalThis" as string, CheckFlags.Readonly);
    globalThisSymbol.exports = globals;
    globalThisSymbol.declarations = [];
    globals.set(globalThisSymbol.name, globalThisSymbol);

    var argumentsSymbol = createSymbol(SymbolFlags.Property, "arguments" as string);
    var requireSymbol = createSymbol(SymbolFlags.Property, "require" as string);    

    /** This will be set during calls to `getResolvedSignature` where services determines an apparent number of arguments greater than what is actually provided. */
    var apparentArgumentCount: number | undefined;

    var lastGetCombinedNodeFlagsNode: Node | undefined;
    var lastGetCombinedNodeFlagsResult = NodeFlags.None;
    var lastGetCombinedModifierFlagsNode: Declaration | undefined;
    var lastGetCombinedModifierFlagsResult = ModifierFlags.None;

    var diagnostics = createDiagnosticCollection();
    var suggestionDiagnostics = createDiagnosticCollection();

    var allPotentiallyUnusedIdentifiers = new Map<Path, PotentiallyUnusedIdentifier[]>(); // key is file name
    
    var suggestionCount = 0;
    var maximumSuggestionCount = 10;
    var mergedSymbols: Symbol[] = [];
    var symbolLinks: SymbolLinks[] = [];
    var nodeLinks: NodeLinks[] = [];
    var flowLoopCaches: Map<string, Type>[] = [];
    var flowLoopNodes: FlowNode[] = [];
    var flowLoopKeys: string[] = [];
    var flowLoopTypes: Type[][] = [];
    var sharedFlowNodes: FlowNode[] = [];
    var sharedFlowTypes: FlowType[] = [];
    var flowNodeReachable: (boolean | undefined)[] = [];
    var flowNodePostSuper: (boolean | undefined)[] = [];
    var potentialThisCollisions: Node[] = [];
    var potentialNewTargetCollisions: Node[] = [];
    var potentialWeakMapSetCollisions: Node[] = [];
    var potentialReflectCollisions: Node[] = [];
    //var potentialUnusedRenamedBindingElementsInTypes: BindingElement[] = [];
    var awaitedTypeStack: number[] = [];
    var reverseMappedSourceStack: Type[] = [];
    var reverseMappedTargetStack: Type[] = [];
    //var reverseExpandingFlags = ExpandingFlags.None;
    var cachedTypes = new Map<string, Type>();
    
    var flowLoopStart = 0;
    var flowLoopCount = 0;
    var sharedFlowCount = 0;
    var flowAnalysisDisabled = false;
    var flowInvocationCount = 0;
    var lastFlowNode: FlowNode | undefined;
    var lastFlowNodeReachable: boolean;
    var flowTypeCache: Type[] | undefined;
    
    var seenIntrinsicNames = new Set<string>();

   
    var unionOfUnionTypes = new Map<string, Type>();

    var resolveName = createNameResolver({
        compilerOptions,
        requireSymbol,
        argumentsSymbol,
        globals,
        getSymbolOfDeclaration,
        error,
        getRequiresScopeChangeCache,
        setRequiresScopeChangeCache,
        lookup: getSymbol,
        onPropertyWithInvalidInitializer: checkAndReportErrorForInvalidInitializer,
        onFailedToResolveSymbol,
        onSuccessfullyResolvedSymbol,
    });

    var resolveNameForSymbolSuggestion = createNameResolver({
        compilerOptions,
        requireSymbol,
        argumentsSymbol,
        globals,
        getSymbolOfDeclaration,
        error,
        getRequiresScopeChangeCache,
        setRequiresScopeChangeCache,
        lookup: getSuggestionForSymbolNameLookup,
    });
    
    const checker:TypeChecker = {
        getNodeCount: () => reduceLeft(host.getSourceFiles(), (n, s) => n + s.nodeCount, 0),
        getIdentifierCount: () => reduceLeft(host.getSourceFiles(), (n, s) => n + s.identifierCount, 0),
        getSymbolCount: () => reduceLeft(host.getSourceFiles(), (n, s) => n + s.symbolCount, symbolCount),
        getTypeCount: () => typeCount,
        getInstantiationCount: () => totalInstantiationCount,
        signatureToString,
        getDiagnostics
    };

    var anyType = createIntrinsicType(TypeFlags.Any, "any");
    var autoType = createIntrinsicType(TypeFlags.Any, "any", ObjectFlags.NonInferrableType, "auto");
    var errorType = createIntrinsicType(TypeFlags.Any, "error");
    var silentNeverType = createIntrinsicType(TypeFlags.Never, "never", ObjectFlags.NonInferrableType, "silent");
    var stringType = createIntrinsicType(TypeFlags.String, "string");
    var intType = createIntrinsicType(TypeFlags.Number, "int");
    var floatType = createIntrinsicType(TypeFlags.Number, "float");
    var neverType = createIntrinsicType(TypeFlags.Never, "never");
    var undefinedType = createIntrinsicType(TypeFlags.Undefined, "undefined");
    var nonPrimitiveType = createIntrinsicType(TypeFlags.NonPrimitive, "object");
    var autoArrayType: Type;
    var anyArrayType: Type;

    var anySignature = createSignature(/*declaration*/ undefined, /*typeParameters*/ undefined, /*thisParameter*/ undefined, emptyArray, anyType, /*resolvedTypePredicate*/ undefined, 0, SignatureFlags.None);
    var unknownSignature = createSignature(/*declaration*/ undefined, /*typeParameters*/ undefined, /*thisParameter*/ undefined, emptyArray, errorType, /*resolvedTypePredicate*/ undefined, 0, SignatureFlags.None);
    var resolvingSignature = createSignature(/*declaration*/ undefined, /*typeParameters*/ undefined, /*thisParameter*/ undefined, emptyArray, anyType, /*resolvedTypePredicate*/ undefined, 0, SignatureFlags.None);
    var silentNeverSignature = createSignature(/*declaration*/ undefined, /*typeParameters*/ undefined, /*thisParameter*/ undefined, emptyArray, silentNeverType, /*resolvedTypePredicate*/ undefined, 0, SignatureFlags.None);
    
    var unknownSymbol = createSymbol(SymbolFlags.Property, "unknown" as string);
    var resolvingSymbol = createSymbol(0, InternalSymbolName.Resolving);
    var anyFunctionType = createAnonymousType(/*symbol*/ undefined, emptySymbols, emptyArray, emptyArray, emptyArray);


    var subtypeRelation = new Map<string, RelationComparisonResult>();
    var strictSubtypeRelation = new Map<string, RelationComparisonResult>();
    var assignableRelation = new Map<string, RelationComparisonResult>();
    var comparableRelation = new Map<string, RelationComparisonResult>();
    var identityRelation = new Map<string, RelationComparisonResult>();

    initializeTypeChecker();

    return checker;

    function initializeTypeChecker() {
        // Bind all source files and propagate errors
        for (const file of host.getSourceFiles()) {
            bindSourceFile(file, compilerOptions);
        }

        // TODO

        // autoArrayType = createArrayType(autoType);
        // if (autoArrayType === emptyObjectType) {
        //     // autoArrayType is used as a marker, so even if global Array type is not defined, it needs to be a unique type
        //     autoArrayType = createAnonymousType(/*symbol*/ undefined, emptySymbols, emptyArray, emptyArray, emptyArray);
        // }
    }

    function createIntrinsicType(kind: TypeFlags, intrinsicName: string, objectFlags = ObjectFlags.None, debugIntrinsicName?: string): IntrinsicType {
        checkIntrinsicName(intrinsicName, debugIntrinsicName);
        const type = createType(kind) as IntrinsicType;
        type.intrinsicName = intrinsicName;
        type.debugIntrinsicName = debugIntrinsicName;
        type.objectFlags = objectFlags | ObjectFlags.CouldContainTypeVariablesComputed | ObjectFlags.IsGenericTypeComputed | ObjectFlags.IsUnknownLikeUnionComputed | ObjectFlags.IsNeverIntersectionComputed;
        return type;
    }

    function createType(flags: TypeFlags): Type {
        const result = new Type(checker, flags);
        typeCount++;
        result.id = typeCount;
        tracing?.recordType(result);
        return result;
    }
       

    function checkIntrinsicName(name: string, debug: string | undefined) {
        const key = `${name},${debug ?? ""}`;
        if (seenIntrinsicNames.has(key)) {
            Debug.fail(`Duplicate intrinsic type name ${name}${debug ? ` (${debug})` : ""}; you may need to pass a name to createIntrinsicType.`);
        }
        seenIntrinsicNames.add(key);
    }

     
    function getMergedSymbol(symbol: Symbol): Symbol;
    function getMergedSymbol(symbol: Symbol | undefined): Symbol | undefined;
    function getMergedSymbol(symbol: Symbol | undefined): Symbol | undefined {
        let merged: Symbol;
        return symbol && symbol.mergeId && (merged = mergedSymbols[symbol.mergeId]) ? merged : symbol;
    }

    function getSymbolOfDeclaration(node: Declaration): Symbol {
        return getMergedSymbol(node.symbol && getLateBoundSymbol(node.symbol));
    }

    /**
     * If a symbol is the dynamic name of the member of an object type, get the late-bound
     * symbol of the member.
     *
     * For a description of late-binding, see `lateBindMember`.
     */
    function getLateBoundSymbol(symbol: Symbol): Symbol {
        // TODO: no late binding in LPC
        // if (symbol.flags & SymbolFlags.ClassMember && symbol.name === InternalSymbolName.Computed) {
        //     const links = getSymbolLinks(symbol);
        //     if (!links.lateSymbol && some(symbol.declarations, hasLateBindableName)) {
        //         // force late binding of members/exports. This will set the late-bound symbol
        //         const parent = getMergedSymbol(symbol.parent)!;
        //         if (some(symbol.declarations, hasStaticModifier)) {
        //             getExportsOfSymbol(parent);
        //         }
        //         else {
        //             getMembersOfSymbol(parent);
        //         }
        //     }
        //     return links.lateSymbol || (links.lateSymbol = symbol);
        // }
        return symbol;
    }

    function getSymbolLinks(symbol: Symbol): SymbolLinks {
        if (symbol.flags & SymbolFlags.Transient) return (symbol as TransientSymbol).links;
        const id = getSymbolId(symbol);
        return symbolLinks[id] ??= new SymbolLinks();
    }
    
    function createError(location: Node | undefined, message: DiagnosticMessage, ...args: DiagnosticArguments): Diagnostic {
        return location
            ? createDiagnosticForNode(location, message, ...args)
            : createCompilerDiagnostic(message, ...args);
    }
    
    function error(location: Node | undefined, message: DiagnosticMessage, ...args: DiagnosticArguments): Diagnostic {
        const diagnostic = createError(location, message, ...args);
        diagnostics.add(diagnostic);
        return diagnostic;
    }
    
    function getDiagnostics(sourceFile: SourceFile, ct: CancellationToken, nodesToCheck?: Node[]): Diagnostic[] {
        try {
            // Record the cancellation token so it can be checked later on during checkSourceElement.
            // Do this in a finally block so we can ensure that it gets reset back to nothing after
            // this call is done.
            cancellationToken = ct;
            return getDiagnosticsWorker(sourceFile, nodesToCheck);
        }
        finally {
            cancellationToken = undefined;
        }
    }

    function getDiagnosticsWorker(sourceFile: SourceFile, nodesToCheck: Node[] | undefined): Diagnostic[] {
        if (sourceFile) {
            ensurePendingDiagnosticWorkComplete();
            // Some global diagnostics are deferred until they are needed and
            // may not be reported in the first call to getGlobalDiagnostics.
            // We should catch these changes and report them.
            const previousGlobalDiagnostics = diagnostics.getGlobalDiagnostics();
            const previousGlobalDiagnosticsSize = previousGlobalDiagnostics.length;

            checkSourceFileWithEagerDiagnostics(sourceFile, nodesToCheck);
            const semanticDiagnostics = diagnostics.getDiagnostics(sourceFile.fileName);
            if (nodesToCheck) {
                // No need to get global diagnostics.
                return semanticDiagnostics;
            }
            const currentGlobalDiagnostics = diagnostics.getGlobalDiagnostics();
            if (currentGlobalDiagnostics !== previousGlobalDiagnostics) {
                // If the arrays are not the same reference, new diagnostics were added.
                // TODO:
                // const deferredGlobalDiagnostics = relativeComplement(previousGlobalDiagnostics, currentGlobalDiagnostics, compareDiagnostics);
                // return concatenate(deferredGlobalDiagnostics, semanticDiagnostics);
            }
            else if (previousGlobalDiagnosticsSize === 0 && currentGlobalDiagnostics.length > 0) {
                // If the arrays are the same reference, but the length has changed, a single
                // new diagnostic was added as DiagnosticCollection attempts to reuse the
                // same array.
                return concatenate(currentGlobalDiagnostics, semanticDiagnostics);
            }

            return semanticDiagnostics;
        }

        // Global diagnostics are always added when a file is not provided to
        // getDiagnostics
        forEach(host.getSourceFiles(), file => checkSourceFileWithEagerDiagnostics(file));
        return diagnostics.getDiagnostics();
    }

    function checkSourceFile(node: SourceFile, nodesToCheck: Node[] | undefined) {
        tracing?.push(tracing.Phase.Check, nodesToCheck ? "checkSourceFileNodes" : "checkSourceFile", { path: node.path }, /*separateBeginAndEnd*/ true);
        const beforeMark = nodesToCheck ? "beforeCheckNodes" : "beforeCheck";
        const afterMark = nodesToCheck ? "afterCheckNodes" : "afterCheck";
        performance.mark(beforeMark);
        nodesToCheck ? checkSourceFileNodesWorker(node, nodesToCheck) : checkSourceFileWorker(node);
        performance.mark(afterMark);
        performance.measure("Check", beforeMark, afterMark);
        tracing?.pop();
    }

    function getNodeLinks(node: Node): NodeLinks {
        const nodeId = getNodeId(node);
        return nodeLinks[nodeId] || (nodeLinks[nodeId] = new (NodeLinks as any)());
    }

    function getSymbol(symbols: SymbolTable, name: string, meaning: SymbolFlags): Symbol | undefined {
        if (meaning) {
            const symbol = getMergedSymbol(symbols.get(name));
            if (symbol) {
                if (symbol.flags & meaning) {
                    return symbol;
                }
                if (symbol.flags & SymbolFlags.Alias) {
                    const targetFlags = getSymbolFlags(symbol);
                    // `targetFlags` will be `SymbolFlags.All` if an error occurred in alias resolution; this avoids cascading errors
                    if (targetFlags & meaning) {
                        return symbol;
                    }
                }
            }
        }
        // return undefined if we can't find a symbol.
    }

    function getRequiresScopeChangeCache(node: FunctionLikeDeclaration) {
        return getNodeLinks(node).declarationRequiresScopeChange;
    }

    function setRequiresScopeChangeCache(node: FunctionLikeDeclaration, value: boolean) {
        getNodeLinks(node).declarationRequiresScopeChange = value;
    }
    
    function checkGrammarSourceFile(node: SourceFile): boolean {
        return !!(node.flags & NodeFlags.Ambient) && checkGrammarTopLevelElementsForRequiredDeclareModifier(node);
    }

    function checkGrammarTopLevelElementsForRequiredDeclareModifier(file: SourceFile): boolean {
        for (const decl of file.statements) {
            // TODO
            console.warn("Implement me - grammar check");
            // if (isDeclaration(decl) || decl.kind === SyntaxKind.VariableStatement) {
            //     if (checkGrammarTopLevelElementForRequiredDeclareModifier(decl)) {
            //         return true;
            //     }
            // }
        }
        return false;
    }

    function checkSourceElement(node: Node | undefined): void {
        if (node) {
            const saveCurrentNode = currentNode;
            currentNode = node;
            instantiationCount = 0;
            checkSourceElementWorker(node);
            currentNode = saveCurrentNode;
        }
    }

    function checkSourceElementWorker(node: Node): void {
        if (getNodeCheckFlags(node) & NodeCheckFlags.PartiallyTypeChecked) {
            return;
        }

        if (canHaveJSDoc(node)) {
            // TODO
            console.warn("Implement me - checkJSDocElement");
            // forEach(node.jsDoc, ({ comment, tags }) => {
            //     checkJSDocCommentWorker(comment);
            //     forEach(tags, tag => {
            //         checkJSDocCommentWorker(tag.comment);
            //         if (isInJSFile(node)) {
            //             checkSourceElement(tag);
            //         }
            //     });
            // });
        }
        
        const kind = node.kind;
        if (cancellationToken) {
            // Only bother checking on a few construct kinds.  We don't want to be excessively
            // hitting the cancellation token on every node we check.
            switch (kind) {
                // case SyntaxKind.ModuleDeclaration:
                // case SyntaxKind.ClassDeclaration:
                // case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.FunctionDeclaration:
                    cancellationToken.throwIfCancellationRequested();
            }
        }
        if (kind >= SyntaxKind.FirstStatement && kind <= SyntaxKind.LastStatement && canHaveFlowNode(node) && node.flowNode && !isReachableFlowNode(node.flowNode)) {
            errorOrSuggestion(compilerOptions.allowUnreachableCode === false, node, Diagnostics.Unreachable_code_detected);
        }

        // If editing this, keep `isSourceElement` in utilities up to date.
        switch (kind) {
            // case SyntaxKind.TypeParameter:
            //     return checkTypeParameter(node as TypeParameterDeclaration);
            // case SyntaxKind.Parameter:
            //     return checkParameter(node as ParameterDeclaration);
            // case SyntaxKind.PropertyDeclaration:
            //     return checkPropertyDeclaration(node as PropertyDeclaration);
            // case SyntaxKind.PropertySignature:
            //     return checkPropertySignature(node as PropertySignature);
            // case SyntaxKind.ConstructorType:
            // case SyntaxKind.FunctionType:
            // case SyntaxKind.CallSignature:
            // case SyntaxKind.ConstructSignature:
            // case SyntaxKind.IndexSignature:
            //     return checkSignatureDeclaration(node as SignatureDeclaration);
            // case SyntaxKind.MethodDeclaration:
            // case SyntaxKind.MethodSignature:
            //     return checkMethodDeclaration(node as MethodDeclaration | MethodSignature);
            // case SyntaxKind.ClassStaticBlockDeclaration:
            //     return checkClassStaticBlockDeclaration(node as ClassStaticBlockDeclaration);                        
            // case SyntaxKind.TypeLiteral:
            //     return checkTypeLiteral(node as TypeLiteralNode);
            // case SyntaxKind.ArrayType:
            //     return checkArrayType(node as ArrayTypeNode);            
            // case SyntaxKind.UnionType:            
            //     return checkUnionOrIntersectionType(node as UnionOrIntersectionTypeNode);
            // case SyntaxKind.ParenthesizedType:
            // case SyntaxKind.OptionalType:
            // case SyntaxKind.RestType:
            //     return checkSourceElement((node as ParenthesizedTypeNode | OptionalTypeNode | RestTypeNode).type);
            // case SyntaxKind.ThisType:
            //     return checkThisType(node as ThisTypeNode);
            // case SyntaxKind.TypeOperator:
            //     return checkTypeOperator(node as TypeOperatorNode);            
            // case SyntaxKind.ImportType:
            //     return checkImportType(node as ImportTypeNode);
            // case SyntaxKind.NamedTupleMember:
            //     return checkNamedTupleMember(node as NamedTupleMember);
            // case SyntaxKind.JSDocAugmentsTag:
            //     return checkJSDocAugmentsTag(node as JSDocAugmentsTag);
            // case SyntaxKind.JSDocImplementsTag:
            //     return checkJSDocImplementsTag(node as JSDocImplementsTag);
            // case SyntaxKind.JSDocTypedefTag:
            // case SyntaxKind.JSDocCallbackTag:
            // case SyntaxKind.JSDocEnumTag:
            //     return checkJSDocTypeAliasTag(node as JSDocTypedefTag);
            // case SyntaxKind.JSDocTemplateTag:
            //     return checkJSDocTemplateTag(node as JSDocTemplateTag);
            // case SyntaxKind.JSDocTypeTag:
            //     return checkJSDocTypeTag(node as JSDocTypeTag);
            // case SyntaxKind.JSDocLink:
            // case SyntaxKind.JSDocLinkCode:
            // case SyntaxKind.JSDocLinkPlain:
            //     return checkJSDocLinkLikeTag(node as JSDocLink | JSDocLinkCode | JSDocLinkPlain);
            // case SyntaxKind.JSDocParameterTag:
            //     return checkJSDocParameterTag(node as JSDocParameterTag);
            // case SyntaxKind.JSDocPropertyTag:
            //     return checkJSDocPropertyTag(node as JSDocPropertyTag);
            // case SyntaxKind.JSDocFunctionType:
            //     checkJSDocFunctionType(node as JSDocFunctionType);
            //     // falls through
            // case SyntaxKind.JSDocNonNullableType:
            // case SyntaxKind.JSDocNullableType:
            // case SyntaxKind.JSDocAllType:
            // case SyntaxKind.JSDocUnknownType:
            // case SyntaxKind.JSDocTypeLiteral:
            //     checkJSDocTypeIsInJsFile(node);
            //     forEachChild(node, checkSourceElement);
            //     return;
            // case SyntaxKind.JSDocVariadicType:
            //     checkJSDocVariadicType(node as JSDocVariadicType);
            //     return;
            // case SyntaxKind.JSDocTypeExpression:
            //     return checkSourceElement((node as JSDocTypeExpression).type);
            // case SyntaxKind.JSDocPublicTag:
            // case SyntaxKind.JSDocProtectedTag:
            // case SyntaxKind.JSDocPrivateTag:
            //     return checkJSDocAccessibilityModifiers(node as JSDocPublicTag | JSDocProtectedTag | JSDocPrivateTag);
            // case SyntaxKind.JSDocSatisfiesTag:
            //     return checkJSDocSatisfiesTag(node as JSDocSatisfiesTag);
            // case SyntaxKind.JSDocThisTag:
            //     return checkJSDocThisTag(node as JSDocThisTag);
            // case SyntaxKind.JSDocImportTag:
            //     return checkJSDocImportTag(node as JSDocImportTag);
            // case SyntaxKind.IndexedAccessType:
            //     return checkIndexedAccessType(node as IndexedAccessTypeNode);
            // case SyntaxKind.MappedType:
            //     return checkMappedType(node as MappedTypeNode);
            // case SyntaxKind.FunctionDeclaration:
            //     return checkFunctionDeclaration(node as FunctionDeclaration);
            case SyntaxKind.Block:
            // case SyntaxKind.ModuleBlock:
                return checkBlock(node as Block);
            case SyntaxKind.VariableStatement:
                return checkVariableStatement(node as VariableStatement);
            // case SyntaxKind.ExpressionStatement:
            //     return checkExpressionStatement(node as ExpressionStatement);
            // case SyntaxKind.IfStatement:
            //     return checkIfStatement(node as IfStatement);
            // case SyntaxKind.DoStatement:
            //     return checkDoStatement(node as DoStatement);
            // case SyntaxKind.WhileStatement:
            //     return checkWhileStatement(node as WhileStatement);
            // case SyntaxKind.ForStatement:
            //     return checkForStatement(node as ForStatement);
            // case SyntaxKind.ForInStatement:
            //     return checkForInStatement(node as ForInStatement);
            // case SyntaxKind.ForOfStatement:
            //     return checkForOfStatement(node as ForOfStatement);
            // case SyntaxKind.ContinueStatement:
            // case SyntaxKind.BreakStatement:
            //     return checkBreakOrContinueStatement(node as BreakOrContinueStatement);
            // case SyntaxKind.ReturnStatement:
            //     return checkReturnStatement(node as ReturnStatement);
            // case SyntaxKind.WithStatement:
            //     return checkWithStatement(node as WithStatement);
            // case SyntaxKind.SwitchStatement:
            //     return checkSwitchStatement(node as SwitchStatement);
            // case SyntaxKind.LabeledStatement:
            //     return checkLabeledStatement(node as LabeledStatement);
            // case SyntaxKind.ThrowStatement:
            //     return checkThrowStatement(node as ThrowStatement);
            // case SyntaxKind.TryStatement:
            //     return checkTryStatement(node as TryStatement);
            // case SyntaxKind.VariableDeclaration:
            //     return checkVariableDeclaration(node as VariableDeclaration);
            // case SyntaxKind.BindingElement:
            //     return checkBindingElement(node as BindingElement);
            // case SyntaxKind.ClassDeclaration:
            //     return checkClassDeclaration(node as ClassDeclaration);
            // case SyntaxKind.InterfaceDeclaration:
            //     return checkInterfaceDeclaration(node as InterfaceDeclaration);
            // case SyntaxKind.TypeAliasDeclaration:
            //     return checkTypeAliasDeclaration(node as TypeAliasDeclaration);
            // case SyntaxKind.EnumDeclaration:
            //     return checkEnumDeclaration(node as EnumDeclaration);
            // case SyntaxKind.ModuleDeclaration:
            //     return checkModuleDeclaration(node as ModuleDeclaration);
            // case SyntaxKind.ImportDeclaration:
            //     return checkImportDeclaration(node as ImportDeclaration);
            // case SyntaxKind.ImportEqualsDeclaration:
            //     return checkImportEqualsDeclaration(node as ImportEqualsDeclaration);
            // case SyntaxKind.ExportDeclaration:
            //     return checkExportDeclaration(node as ExportDeclaration);
            // case SyntaxKind.ExportAssignment:
            //     return checkExportAssignment(node as ExportAssignment);
            // case SyntaxKind.EmptyStatement:
            // case SyntaxKind.DebuggerStatement:
            //     checkGrammarStatementInAmbientContext(node);
            //     return;
            // case SyntaxKind.MissingDeclaration:
            //     return checkMissingDeclaration(node);
        }

        // TODO
        console.warn("Implement me - checkSourceElementWorker");
    }

    function checkVariableDeclarationList(node: VariableDeclarationList) {
        const blockScopeKind = getCombinedNodeFlags(node) & NodeFlags.BlockScoped;
        
        forEach(node.declarations, checkSourceElement);
    }


    function checkVariableStatement(node: VariableStatement) {
        // Grammar checking
        if (!checkGrammarModifiers(node) && !checkGrammarVariableDeclarationList(node.declarationList)) checkGrammarForDisallowedBlockScopedVariableStatement(node);
        checkVariableDeclarationList(node.declarationList);
    }

    function checkBlock(node: Block) {
        // Grammar checking for SyntaxKind.Block
        if (node.kind === SyntaxKind.Block) {
            //checkGrammarStatementInAmbientContext(node);
        }
        if (isFunctionOrModuleBlock(node)) {
            const saveFlowAnalysisDisabled = flowAnalysisDisabled;
            forEach(node.statements, checkSourceElement);
            flowAnalysisDisabled = saveFlowAnalysisDisabled;
        }
        else {
            forEach(node.statements, checkSourceElement);
        }
        if (node.locals) {
            registerForUnusedIdentifiersCheck(node);
        }
    }

    type PotentiallyUnusedIdentifier = SourceFile | /*ClassLikeDeclaration |*/ Block | CaseBlock | ForStatement | ForEachStatement | Exclude<SignatureDeclaration, IndexSignatureDeclaration /*| JSDocFunctionType*/>;

    function registerForUnusedIdentifiersCheck(node: PotentiallyUnusedIdentifier): void {
        addLazyDiagnostic(registerForUnusedIdentifiersCheckDiagnostics);

        function registerForUnusedIdentifiersCheckDiagnostics() {
            // May be in a call such as getTypeOfNode that happened to call this. But potentiallyUnusedIdentifiers is only defined in the scope of `checkSourceFile`.
            const sourceFile = getSourceFileOfNode(node);
            let potentiallyUnusedIdentifiers = allPotentiallyUnusedIdentifiers.get(sourceFile.path);
            if (!potentiallyUnusedIdentifiers) {
                potentiallyUnusedIdentifiers = [];
                allPotentiallyUnusedIdentifiers.set(sourceFile.path, potentiallyUnusedIdentifiers);
            }
            // TODO: GH#22580
            // Debug.assert(addToSeen(seenPotentiallyUnusedIdentifiers, getNodeId(node)), "Adding potentially-unused identifier twice");
            potentiallyUnusedIdentifiers.push(node);
        }
    }

    function errorOrSuggestion(isError: boolean, location: Node, message: DiagnosticMessage | DiagnosticMessageChain, ...args: DiagnosticArguments): void {
        // Pseudo-synthesized input node
        if (location.pos < 0 || location.end < 0) {
            if (!isError) {
                return; // Drop suggestions (we have no span to suggest on)
            }
            // Issue errors globally
            const file = getSourceFileOfNode(location);
            addErrorOrSuggestion(isError, "message" in message ? createFileDiagnostic(file, 0, 0, message, ...args) : createDiagnosticForFileFromMessageChain(file, message)); // eslint-disable-line local/no-in-operator
            return;
        }
        addErrorOrSuggestion(isError, "message" in message ? createDiagnosticForNode(location, message, ...args) : createDiagnosticForNodeFromMessageChain(getSourceFileOfNode(location), location, message)); // eslint-disable-line local/no-in-operator
    }

    function isReachableFlowNode(flow: FlowNode) {
        const result = isReachableFlowNodeWorker(flow, /*noCacheCheck*/ false);
        lastFlowNode = flow;
        lastFlowNodeReachable = result;
        return result;
    }

    function getFlowNodeId(flow: FlowNode): number {
        if (flow.id <= 0) {
            flow.id = nextFlowId;
            nextFlowId++;
        }
        return flow.id;
    }

    function checkGrammarModifiers(node: HasModifiers): boolean {         
        console.warn("Implement me - checkGrammarModifiers");
        return false;
    }
    
    
    function checkGrammarForDisallowedBlockScopedVariableStatement(node: VariableStatement) {
        return false;
        // if (!allowLetAndConstDeclarations(node.parent)) {
        //     const blockScopeKind = getCombinedNodeFlagsCached(node.declarationList) & NodeFlags.BlockScoped;
        //     if (blockScopeKind) {
        //         const keyword = blockScopeKind === NodeFlags.Let ? "let" :
        //             blockScopeKind === NodeFlags.Const ? "const" :
        //             blockScopeKind === NodeFlags.Using ? "using" :
        //             blockScopeKind === NodeFlags.AwaitUsing ? "await using" :
        //             Debug.fail("Unknown BlockScope flag");
        //         return grammarErrorOnNode(node, Diagnostics._0_declarations_can_only_be_declared_inside_a_block, keyword);
        //     }
        // }
    }

    function checkGrammarVariableDeclarationList(declarationList: VariableDeclarationList): boolean {
        const declarations = declarationList.declarations;
       
        // TODO


        // if (!declarationList.declarations.length) {
        //     return grammarErrorAtPos(declarationList, declarations.pos, declarations.end - declarations.pos, Diagnostics.Variable_declaration_list_cannot_be_empty);
        // }

        // const blockScopeFlags = declarationList.flags & NodeFlags.BlockScoped;
        // if ((blockScopeFlags === NodeFlags.Using || blockScopeFlags === NodeFlags.AwaitUsing) && isForInStatement(declarationList.parent)) {
        //     return grammarErrorOnNode(
        //         declarationList,
        //         blockScopeFlags === NodeFlags.Using ?
        //             Diagnostics.The_left_hand_side_of_a_for_in_statement_cannot_be_a_using_declaration :
        //             Diagnostics.The_left_hand_side_of_a_for_in_statement_cannot_be_an_await_using_declaration,
        //     );
        // }

        // if (blockScopeFlags === NodeFlags.AwaitUsing) {
        //     return checkAwaitGrammar(declarationList);
        // }

        return false;
    }

    function getEffectsSignature(node: CallExpression) {
        const links = getNodeLinks(node);
        let signature = links.effectsSignature;
        console.warn("todo - implement me - getEffectsSignature");
        // if (signature === undefined) {
        //     // A call expression parented by an expression statement is a potential assertion. Other call
        //     // expressions are potential type predicate function calls. In order to avoid triggering
        //     // circularities in control flow analysis, we use getTypeOfDottedName when resolving the call
        //     // target expression of an assertion.
        //     let funcType: Type | undefined;
        //     if (isBinaryExpression(node)) {
        //         const rightType = checkNonNullExpression(node.right);
        //         funcType = getSymbolHasInstanceMethodOfObjectType(rightType);
        //     }
        //     else if (node.parent.kind === SyntaxKind.ExpressionStatement) {
        //         funcType = getTypeOfDottedName(node.expression, /*diagnostic*/ undefined);
        //     }
        //     else if (node.expression.kind !== SyntaxKind.SuperKeyword) {
        //         if (isOptionalChain(node)) {
        //             funcType = checkNonNullType(
        //                 getOptionalExpressionType(checkExpression(node.expression), node.expression),
        //                 node.expression,
        //             );
        //         }
        //         else {
        //             funcType = checkNonNullExpression(node.expression);
        //         }
        //     }
        //     const signatures = getSignaturesOfType(funcType && getApparentType(funcType) || unknownType, SignatureKind.Call);
        //     const candidate = signatures.length === 1 && !signatures[0].typeParameters ? signatures[0] :
        //         some(signatures, hasTypePredicateOrNeverReturnType) ? getResolvedSignature(node) :
        //         undefined;
        //     signature = links.effectsSignature = candidate && hasTypePredicateOrNeverReturnType(candidate) ? candidate : unknownSignature;
        // }
        return signature === unknownSignature ? undefined : signature;
    }

    function getReturnTypeOfSignature(signature: Signature): Type {
        console.warn("todo implement me - getReturnTypeOfSignature");
        // if (!signature.resolvedReturnType) {
        //     if (!pushTypeResolution(signature, TypeSystemPropertyName.ResolvedReturnType)) {
        //         return errorType;
        //     }
        //     let type = signature.target ? instantiateType(getReturnTypeOfSignature(signature.target), signature.mapper) :
        //         signature.compositeSignatures ? instantiateType(getUnionOrIntersectionType(map(signature.compositeSignatures, getReturnTypeOfSignature), signature.compositeKind, UnionReduction.Subtype), signature.mapper) :
        //         getReturnTypeFromAnnotation(signature.declaration!) ||
        //         (nodeIsMissing((signature.declaration as FunctionLikeDeclaration).body) ? anyType : getReturnTypeFromBody(signature.declaration as FunctionLikeDeclaration));
        //     if (signature.flags & SignatureFlags.IsInnerCallChain) {
        //         type = addOptionalTypeMarker(type);
        //     }
        //     else if (signature.flags & SignatureFlags.IsOuterCallChain) {
        //         type = getOptionalType(type);
        //     }
        //     if (!popTypeResolution()) {
        //         if (signature.declaration) {
        //             const typeNode = getEffectiveReturnTypeNode(signature.declaration);
        //             if (typeNode) {
        //                 error(typeNode, Diagnostics.Return_type_annotation_circularly_references_itself);
        //             }
        //             else if (noImplicitAny) {
        //                 const declaration = signature.declaration as Declaration;
        //                 const name = getNameOfDeclaration(declaration);
        //                 if (name) {
        //                     error(name, Diagnostics._0_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_referenced_directly_or_indirectly_in_one_of_its_return_expressions, declarationNameToString(name));
        //                 }
        //                 else {
        //                     error(declaration, Diagnostics.Function_implicitly_has_return_type_any_because_it_does_not_have_a_return_type_annotation_and_is_referenced_directly_or_indirectly_in_one_of_its_return_expressions);
        //                 }
        //             }
        //         }
        //         type = anyType;
        //     }
        //     signature.resolvedReturnType ??= type;
        // }
        return signature.resolvedReturnType;
    }

    function isExhaustiveSwitchStatement(node: SwitchStatement): boolean {
        const links = getNodeLinks(node);
        if (links.isExhaustive === undefined) {
            links.isExhaustive = 0; // Indicate resolution is in process
            const exhaustive = computeExhaustiveSwitchStatement(node);
            if (links.isExhaustive === 0) {
                links.isExhaustive = exhaustive;
            }
        }
        else if (links.isExhaustive === 0) {
            links.isExhaustive = false; // Resolve circularity to false
        }
        return links.isExhaustive;
    }

    function computeExhaustiveSwitchStatement(node: SwitchStatement): boolean {        
        console.warn("todo implement me - computeExhaustiveSwitchStatement");
        return false;
        // const type = checkExpressionCached(node.expression);
        // if (!isLiteralType(type)) {
        //     return false;
        // }
        // const switchTypes = getSwitchClauseTypes(node);
        // if (!switchTypes.length || some(switchTypes, isNeitherUnitTypeNorNever)) {
        //     return false;
        // }
        // return eachTypeContainedIn(mapType(type, getRegularTypeOfLiteralType), switchTypes);
    }

    
    function isReachableFlowNodeWorker(flow: FlowNode, noCacheCheck: boolean): boolean {
        while (true) {
            if (flow === lastFlowNode) {
                return lastFlowNodeReachable;
            }
            const flags = flow.flags;
            if (flags & FlowFlags.Shared) {
                if (!noCacheCheck) {
                    const id = getFlowNodeId(flow);
                    const reachable = flowNodeReachable[id];
                    return reachable !== undefined ? reachable : (flowNodeReachable[id] = isReachableFlowNodeWorker(flow, /*noCacheCheck*/ true));
                }
                noCacheCheck = false;
            }
            if (flags & (FlowFlags.Assignment | FlowFlags.Condition | FlowFlags.ArrayMutation)) {
                flow = (flow as FlowAssignment | FlowCondition | FlowArrayMutation).antecedent;
            }
            else if (flags & FlowFlags.Call) {
                const signature = getEffectsSignature((flow as FlowCall).node);
                if (signature) {                    
                    if (getReturnTypeOfSignature(signature).flags & TypeFlags.Never) {
                        return false;
                    }
                }
                flow = (flow as FlowCall).antecedent;
            }
            else if (flags & FlowFlags.BranchLabel) {
                // A branching point is reachable if any branch is reachable.
                return some((flow as FlowLabel).antecedent, f => isReachableFlowNodeWorker(f, /*noCacheCheck*/ false));
            }
            else if (flags & FlowFlags.LoopLabel) {
                const antecedents = (flow as FlowLabel).antecedent;
                if (antecedents === undefined || antecedents.length === 0) {
                    return false;
                }
                // A loop is reachable if the control flow path that leads to the top is reachable.
                flow = antecedents[0];
            }
            else if (flags & FlowFlags.SwitchClause) {
                // The control flow path representing an unmatched value in a switch statement with
                // no default clause is unreachable if the switch statement is exhaustive.
                const data = (flow as FlowSwitchClause).node;
                if (data.clauseStart === data.clauseEnd && isExhaustiveSwitchStatement(data.switchStatement)) {
                    return false;
                }
                flow = (flow as FlowSwitchClause).antecedent;
            }
            else if (flags & FlowFlags.ReduceLabel) {
                // Cache is unreliable once we start adjusting labels
                lastFlowNode = undefined;
                const target = (flow as FlowReduceLabel).node.target;
                const saveAntecedents = target.antecedent;
                target.antecedent = (flow as FlowReduceLabel).node.antecedents;
                const result = isReachableFlowNodeWorker((flow as FlowReduceLabel).antecedent, /*noCacheCheck*/ false);
                target.antecedent = saveAntecedents;
                return result;
            }
            else {
                return !(flags & FlowFlags.Unreachable);
            }
        }
    }

    function getNodeCheckFlags(node: Node): NodeCheckFlags {
        const nodeId = node.id || 0;
        if (nodeId < 0 || nodeId >= nodeLinks.length) return 0;
        return nodeLinks[nodeId]?.flags || 0;
    }

    function hasNodeCheckFlag(node: Node, flag: LazyNodeCheckFlags) {
        calculateNodeCheckFlagWorker(node, flag);
        return !!(getNodeCheckFlags(node) & flag);
    }

    function calculateNodeCheckFlagWorker(node: Node, flag: LazyNodeCheckFlags) {
        if (!compilerOptions.noCheck && canIncludeBindAndCheckDiagnostics(getSourceFileOfNode(node), compilerOptions)) {
            // Unless noCheck is passed, assume calculation of node check flags has been done eagerly.
            // This saves needing to mark up where in the eager traversal certain results are "done",
            // just to reconcile the eager and lazy results. This wouldn't be hard if an eager typecheck
            // was actually an in-order traversal, but it isn't - some nodes are deferred, and so don't
            // have these node check flags calculated until that deferral is completed. As an example,
            // in concept, we could consider a class that we've called `checkSourceElement` on as having had
            // these flags calculated, but since the method bodies are deferred, we actually can't set the
            // flags as having been calculated until that deferral is completed.
            // The downside to this either/or approach to eager or lazy calculation is that we can't combine
            // a partial eager traversal and lazy calculation for the missing bits, and there's a bit of
            // overlap in functionality. This isn't a huge loss for any usecases today, but would be nice
            // alongside language service partial file checking and editor-triggered emit.
            return;
        }
        const links = getNodeLinks(node);
        if (links.calculatedFlags & flag) {
            return;
        }
        // This is only the set of `NodeCheckFlags` our emitter actually looks for, not all of them
        switch (flag) {
            case NodeCheckFlags.SuperInstance:
            case NodeCheckFlags.SuperStatic:
                return checkSingleSuperExpression(node);
            case NodeCheckFlags.MethodWithSuperPropertyAccessInAsync:
            case NodeCheckFlags.MethodWithSuperPropertyAssignmentInAsync:
            case NodeCheckFlags.ContainsSuperPropertyInStaticInitializer:
                return checkChildSuperExpressions(node);
            case NodeCheckFlags.CaptureArguments:
            case NodeCheckFlags.ContainsCapturedBlockScopeBinding:
            case NodeCheckFlags.NeedsLoopOutParameter:
            case NodeCheckFlags.ContainsConstructorReference:
                return checkChildIdentifiers(node);
            case NodeCheckFlags.ConstructorReference:
                return checkSingleIdentifier(node);
            case NodeCheckFlags.LoopWithCapturedBlockScopedBinding:
            case NodeCheckFlags.BlockScopedBindingInLoop:
            case NodeCheckFlags.CapturedBlockScopedBinding:
                return checkContainingBlockScopeBindingUses(node);
            default:
                return Debug.assertNever(flag, `Unhandled node check flag calculation: ${Debug.formatNodeCheckFlags(flag)}`);
        }

        function forEachNodeRecursively<T>(root: Node, cb: (node: Node, parent: Node) => T | "skip" | undefined): T | undefined {
            const rootResult = cb(root, root.parent);
            if (rootResult === "skip") return undefined;
            if (rootResult) return rootResult;
            return forEachChildRecursively(root, cb);
        }

        function checkSuperExpressions(node: Node) {
            const links = getNodeLinks(node);
            if (links.calculatedFlags & flag) return "skip";
            links.calculatedFlags |= NodeCheckFlags.MethodWithSuperPropertyAccessInAsync | NodeCheckFlags.MethodWithSuperPropertyAssignmentInAsync | NodeCheckFlags.ContainsSuperPropertyInStaticInitializer;
            checkSingleSuperExpression(node);
            return undefined;
        }

        function checkChildSuperExpressions(node: Node) {
            forEachNodeRecursively(node, checkSuperExpressions);
        }

        function checkSingleSuperExpression(node: Node) {
            const nodeLinks = getNodeLinks(node); // This is called on sub-nodes of the original input, make sure we set `calculatedFlags` on the correct node
            nodeLinks.calculatedFlags |= NodeCheckFlags.SuperInstance | NodeCheckFlags.SuperStatic; // Yes, we set this on non-applicable nodes, so we can entirely skip the traversal on future calls
            if (node.kind === SyntaxKind.SuperKeyword) {
                checkSuperExpression(node);
            }
        }

        function checkIdentifiers(node: Node) {
            const links = getNodeLinks(node);
            if (links.calculatedFlags & flag) return "skip";
            links.calculatedFlags |= NodeCheckFlags.CaptureArguments | NodeCheckFlags.ContainsCapturedBlockScopeBinding | NodeCheckFlags.NeedsLoopOutParameter | NodeCheckFlags.ContainsConstructorReference;
            checkSingleIdentifier(node);
            return undefined;
        }

        function checkChildIdentifiers(node: Node) {
            forEachNodeRecursively(node, checkIdentifiers);
        }

        function checkSingleIdentifier(node: Node) {
            const nodeLinks = getNodeLinks(node);
            nodeLinks.calculatedFlags |= NodeCheckFlags.ConstructorReference | NodeCheckFlags.CapturedBlockScopedBinding | NodeCheckFlags.BlockScopedBindingInLoop;
            if (isIdentifier(node) && isExpressionNode(node) && !(isPropertyAccessExpression(node.parent) && node.parent.name === node)) {
                const s = getSymbolAtLocation(node, /*ignoreErrors*/ true);
                if (s && s !== unknownSymbol) {
                    checkIdentifierCalculateNodeCheckFlags(node, s);
                }
            }
        }

        function checkBlockScopeBindings(node: Node) {
            const links = getNodeLinks(node);
            if (links.calculatedFlags & flag) return "skip";
            links.calculatedFlags |= NodeCheckFlags.LoopWithCapturedBlockScopedBinding | NodeCheckFlags.BlockScopedBindingInLoop | NodeCheckFlags.CapturedBlockScopedBinding;
            checkSingleBlockScopeBinding(node);
            return undefined;
        }

        function checkContainingBlockScopeBindingUses(node: Node) {
            const scope = getEnclosingBlockScopeContainer(isDeclarationName(node) ? node.parent : node);
            forEachNodeRecursively(scope, checkBlockScopeBindings);
        }

        function checkSingleBlockScopeBinding(node: Node) {
            checkSingleIdentifier(node);
            // if (isComputedPropertyName(node)) {
            //     checkComputedPropertyName(node);
            // }
            // if (isPrivateIdentifier(node) && isClassElement(node.parent)) {
            //     setNodeLinksForPrivateIdentifierScope(node.parent as PropertyDeclaration | PropertySignature | MethodDeclaration | MethodSignature | AccessorDeclaration);
            // }
        }
    }
    
    // The invalid initializer error is needed in two situation:
    // 1. When result is undefined, after checking for a missing "this."
    // 2. When result is defined
    function checkAndReportErrorForInvalidInitializer(errorLocation: Node | undefined, name: string, propertyWithInvalidInitializer: PropertyDeclaration, result: Symbol | undefined) {
        // TODO
        // if (!emitStandardClassFields) {
        //     if (errorLocation && !result && checkAndReportErrorForMissingPrefix(errorLocation, name, name)) {
        //         return true;
        //     }
        //     // We have a match, but the reference occurred within a property initializer and the identifier also binds
        //     // to a local variable in the constructor where the code will be emitted. Note that this is actually allowed
        //     // with emitStandardClassFields because the scope semantics are different.
        //     error(
        //         errorLocation,
        //         errorLocation && propertyWithInvalidInitializer.type && textRangeContainsPositionInclusive(propertyWithInvalidInitializer.type, errorLocation.pos)
        //             ? Diagnostics.Type_of_instance_member_variable_0_cannot_reference_identifier_1_declared_in_the_constructor
        //             : Diagnostics.Initializer_of_instance_member_variable_0_cannot_reference_identifier_1_declared_in_the_constructor,
        //         declarationNameToString(propertyWithInvalidInitializer.name),
        //         diagnosticName(name),
        //     );
        //     return true;
        // }
        return false;
    }

    // Fully type check a source file and collect the relevant diagnostics.
    function checkSourceFileWorker(node: SourceFile) {
        const links = getNodeLinks(node);
        if (!(links.flags & NodeCheckFlags.TypeChecked)) {
            // if (skipTypeChecking(node, compilerOptions, host)) {
            //     return;
            // }

            // Grammar checking
            checkGrammarSourceFile(node);

            clear(potentialThisCollisions);
            clear(potentialNewTargetCollisions);
            clear(potentialWeakMapSetCollisions);
            clear(potentialReflectCollisions);
            //clear(potentialUnusedRenamedBindingElementsInTypes);

            if (links.flags & NodeCheckFlags.PartiallyTypeChecked) {
                potentialThisCollisions = links.potentialThisCollisions!;
                potentialNewTargetCollisions = links.potentialNewTargetCollisions!;
                potentialWeakMapSetCollisions = links.potentialWeakMapSetCollisions!;
                potentialReflectCollisions = links.potentialReflectCollisions!;
                //potentialUnusedRenamedBindingElementsInTypes = links.potentialUnusedRenamedBindingElementsInTypes!;
            }

            forEach(node.statements, checkSourceElement);
            checkSourceElement(node.endOfFileToken);

            checkDeferredNodes(node);
            
            registerForUnusedIdentifiersCheck(node);

            addLazyDiagnostic(() => {
                // This relies on the results of other lazy diagnostics, so must be computed after them
                if (!node.isDeclarationFile && (compilerOptions.noUnusedLocals || compilerOptions.noUnusedParameters)) {
                    checkUnusedIdentifiers(getPotentiallyUnusedIdentifiers(node), (containingNode, kind, diag) => {
                        if (!containsParseError(containingNode) && unusedIsError(kind, !!(containingNode.flags & NodeFlags.Ambient))) {
                            diagnostics.add(diag);
                        }
                    });
                }
                // if (!node.isDeclarationFile) {
                //     checkPotentialUncheckedRenamedBindingElementsInTypes();
                // }
            });

            // TODO: do we need this?
            // if (isExternalOrCommonJsModule(node)) {
            //     checkExternalModuleExports(node);
            // }
            
            // if (potentialNewTargetCollisions.length) {
            //     forEach(potentialNewTargetCollisions, checkIfNewTargetIsCapturedInEnclosingScope);
            //     clear(potentialNewTargetCollisions);
            // }

            // if (potentialWeakMapSetCollisions.length) {
            //     forEach(potentialWeakMapSetCollisions, checkWeakMapSetCollision);
            //     clear(potentialWeakMapSetCollisions);
            // }

            // if (potentialReflectCollisions.length) {
            //     forEach(potentialReflectCollisions, checkReflectCollision);
            //     clear(potentialReflectCollisions);
            // }

            links.flags |= NodeCheckFlags.TypeChecked;            
        }
    }
    
    function unusedIsError(kind: UnusedKind, isAmbient: boolean): boolean {
        if (isAmbient) {
            return false;
        }
        switch (kind) {
            case UnusedKind.Local:
                return !!compilerOptions.noUnusedLocals;
            case UnusedKind.Parameter:
                return !!compilerOptions.noUnusedParameters;
            default:
                return Debug.assertNever(kind);
        }
    }

    function getPotentiallyUnusedIdentifiers(sourceFile: SourceFile): readonly PotentiallyUnusedIdentifier[] {
        return allPotentiallyUnusedIdentifiers.get(sourceFile.path) || emptyArray;
    }

    function checkSourceFileNodesWorker(file: SourceFile, nodes: readonly Node[]) {
        // TODO
        console.warn("Implement me - checkSourceFileNodesWorker");
    }

    function checkDeferredNodes(context: SourceFile) {
        const links = getNodeLinks(context);
        if (links.deferredNodes) {
            links.deferredNodes.forEach(checkDeferredNode);
        }
        links.deferredNodes = undefined;
    }

    function getSymbolAtLocation(node: Node, ignoreErrors?: boolean): Symbol | undefined {
        if (isSourceFile(node)) {
            return getMergedSymbol(node.symbol);
        }
        const { parent } = node;
        const grandParent = parent.parent;

        if (isDeclarationNameOrImportPropertyName(node)) {
            // This is a declaration, call getSymbolOfNode
            const parentSymbol = getSymbolOfDeclaration(parent as Declaration);
            return parentSymbol; // TODO:
            // return isImportOrExportSpecifier(node.parent) && node.parent.propertyName === node
            //     ? getImmediateAliasedSymbol(parentSymbol)
            //     : parentSymbol;
        }
        // else if (isLiteralComputedPropertyDeclarationName(node)) {
        //     return getSymbolOfDeclaration(parent.parent as Declaration);
        // }

        if (node.kind === SyntaxKind.Identifier) {
            // if (isInRightSideOfImportOrExportAssignment(node as Identifier)) {
            //     return getSymbolOfNameOrPropertyAccessExpression(node as Identifier);
            // } else if (
            //     parent.kind === SyntaxKind.BindingElement &&
            //     grandParent.kind === SyntaxKind.ObjectBindingPattern &&
            //     node === (parent as BindingElement).propertyName
            // ) {
            //     const typeOfPattern = getTypeOfNode(grandParent);
            //     const propertyDeclaration = getPropertyOfType(typeOfPattern, (node as Identifier).escapedText);

            //     if (propertyDeclaration) {
            //         return propertyDeclaration;
            //     }
            // }
            // else if (isMetaProperty(parent) && parent.name === node) {
            //     if (parent.keywordToken === SyntaxKind.NewKeyword && idText(node as Identifier) === "target") {
            //         // `target` in `new.target`
            //         return checkNewTargetMetaProperty(parent).symbol;
            //     }
            //     // The `meta` in `import.meta` could be given `getTypeOfNode(parent).symbol` (the `ImportMeta` interface symbol), but
            //     // we have a fake expression type made for other reasons already, whose transient `meta`
            //     // member should more exactly be the kind of (declarationless) symbol we want.
            //     // (See #44364 and #45031 for relevant implementation PRs)
            //     if (parent.keywordToken === SyntaxKind.ImportKeyword && idText(node as Identifier) === "meta") {
            //         return getGlobalImportMetaExpressionType().members!.get("meta" as __String);
            //     }
            //     // no other meta properties are valid syntax, thus no others should have symbols
            //     return undefined;
            // }
        }

        switch (node.kind) {
            case SyntaxKind.Identifier:
            //case SyntaxKind.PrivateIdentifier:
            case SyntaxKind.PropertyAccessExpression:
            //case SyntaxKind.QualifiedName:              
                return getSymbolOfNameOrPropertyAccessExpression(node as EntityName | PropertyAccessExpression);              
                // falls through            
            case SyntaxKind.SuperKeyword:
                return checkExpression(node as Expression).symbol;

            case SyntaxKind.StringLiteral:
            //case SyntaxKind.NoSubstitutionTemplateLiteral:
                // 1). import x = require("./mo/*gotToDefinitionHere*/d")
                // 2). External module name in an import declaration
                // 3). Dynamic import call or require in javascript
                // 4). type A = import("./f/*gotToDefinitionHere*/oo")
                // if (
                //     //(isExternalModuleImportEqualsDeclaration(node.parent.parent) && getExternalModuleImportEqualsDeclarationExpression(node.parent.parent) === node) ||
                //     //((node.parent.kind === SyntaxKind.ImportDeclaration || node.parent.kind === SyntaxKind.ExportDeclaration) && (node.parent as ImportDeclaration).moduleSpecifier === node) ||
                //     //(isInJSFile(node) && isJSDocImportTag(node.parent) && node.parent.moduleSpecifier === node) ||
                //     //((isInJSFile(node) && isRequireCall(node.parent, /*requireStringLiteralLikeArgument*/ false)) || isImportCall(node.parent)) ||
                //     (isLiteralTypeNode(node.parent) && isLiteralImportTypeNode(node.parent.parent) && node.parent.parent.argument === node.parent)
                // ) {
                //     return resolveExternalModuleName(node, node as LiteralExpression, ignoreErrors);
                // }
                // if (isCallExpression(parent) && isBindableObjectDefinePropertyCall(parent) && parent.arguments[1] === node) {
                //     return getSymbolOfDeclaration(parent);
                // }
                // falls through

            // case SyntaxKind.IntLiteral:            
            //     // index access
            //     const objectType = isElementAccessExpression(parent)
            //         ? parent.argumentExpression === node ? getTypeOfExpression(parent.expression) : undefined
            //         : isLiteralTypeNode(parent) && isIndexedAccessTypeNode(grandParent)
            //         ? getTypeFromTypeNode(grandParent.objectType)
            //         : undefined;
            //     return objectType && getPropertyOfType(objectType, escapeLeadingUnderscores((node as StringLiteral | NumericLiteral).text));
            
            //case SyntaxKind.FunctionKeyword:
            case SyntaxKind.EqualsGreaterThanToken:
            //case SyntaxKind.ClassKeyword:
                return getSymbolOfNode(node.parent);
            // case SyntaxKind.ImportType:
            //     return isLiteralImportTypeNode(node) ? getSymbolAtLocation(node.argument.literal, ignoreErrors) : undefined;

            // case SyntaxKind.ImportKeyword:
            // case SyntaxKind.NewKeyword:
            //     return isMetaProperty(node.parent) ? checkMetaPropertyKeyword(node.parent).symbol : undefined;            
            default:
                return undefined;
        }
    }
        
    function checkDeferredNode(node: Node) {
        tracing?.push(tracing.Phase.Check, "checkDeferredNode", { kind: node.kind, pos: node.pos, end: node.end, path: (node as TracingNode).tracingPath });
        const saveCurrentNode = currentNode;
        currentNode = node;
        instantiationCount = 0;
        switch (node.kind) {
            // TODO - lots to implement here
            case SyntaxKind.CallExpression:
            case SyntaxKind.NewExpression:
            // case SyntaxKind.TaggedTemplateExpression:            
                // These node kinds are deferred checked when overload resolution fails
                // To save on work, we ensure the arguments are checked just once, in
                // a deferred way
                resolveUntypedCall(node as CallLikeExpression);
                break;
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.InlineClosureExpression:
            // case SyntaxKind.MethodDeclaration:
            // case SyntaxKind.MethodSignature:
                //checkFunctionExpressionOrObjectLiteralMethodDeferred(node as FunctionExpression);
                break;            
            case SyntaxKind.ClassExpression:
                //checkClassExpressionDeferred(node as ClassExpression);
                break;
            case SyntaxKind.TypeParameter:
                //checkTypeParameterDeferred(node as TypeParameterDeclaration);
                break;            
            // case SyntaxKind.TypeAssertionExpression:
            // case SyntaxKind.AsExpression:
            case SyntaxKind.ParenthesizedExpression:
                //checkAssertionDeferred(node as AssertionExpression | JSDocTypeAssertion);
                break;            
            case SyntaxKind.BinaryExpression:
                // if (isInstanceOfExpression(node)) {
                //     resolveUntypedCall(node);
                // }
                break;
        }
        currentNode = saveCurrentNode;
        tracing?.pop();
    }    

    function resolveUntypedCall(node: CallLikeExpression): Signature {                
        if (isBinaryExpression(node)) {
            checkExpression((node as BinaryExpression).left);
        }
        else if (isCallOrNewExpression(node)) {
            forEach(node.arguments, argument => {
                checkExpression(argument);
            });
        }
        return anySignature;
    }

    function callLikeExpressionMayHaveTypeArguments(node: CallLikeExpression): node is CallExpression /*| NewExpression*/ {
        return isCallOrNewExpression(node);
    }
    
    function checkExpression(node: Expression, checkMode?: CheckMode, forceTuple?: boolean): Type {
        tracing?.push(tracing.Phase.Check, "checkExpression", { kind: node.kind, pos: node.pos, end: node.end, path: (node as TracingNode).tracingPath });
        const saveCurrentNode = currentNode;
        currentNode = node;
        instantiationCount = 0;
        const uninstantiatedType = checkExpressionWorker(node, checkMode, forceTuple);
        const type = instantiateTypeWithSingleGenericCallSignature(node, uninstantiatedType, checkMode);        
        currentNode = saveCurrentNode;
        tracing?.pop();
        return type;
    }

    function resolveStructuredTypeMembers(type: StructuredType): ResolvedType {
        // TODO 
        console.warn("Implement me - resolveStructuredTypeMembers");
        // if (!(type as ResolvedType).members) {
        //     if (type.flags & TypeFlags.Object) {
        //         if ((type as ObjectType).objectFlags & ObjectFlags.Reference) {
        //             resolveTypeReferenceMembers(type as TypeReference);
        //         }
        //         else if ((type as ObjectType).objectFlags & ObjectFlags.ClassOrInterface) {
        //             resolveClassOrInterfaceMembers(type as InterfaceType);
        //         }
        //         else if ((type as ReverseMappedType).objectFlags & ObjectFlags.ReverseMapped) {
        //             resolveReverseMappedTypeMembers(type as ReverseMappedType);
        //         }
        //         else if ((type as ObjectType).objectFlags & ObjectFlags.Anonymous) {
        //             resolveAnonymousTypeMembers(type as AnonymousType);
        //         }
        //         else if ((type as MappedType).objectFlags & ObjectFlags.Mapped) {
        //             resolveMappedTypeMembers(type as MappedType);
        //         }
        //         else {
        //             Debug.fail("Unhandled object type " + Debug.formatObjectFlags(type.objectFlags));
        //         }
        //     }
        //     else if (type.flags & TypeFlags.Union) {
        //         resolveUnionTypeMembers(type as UnionType);
        //     }
        //     else if (type.flags & TypeFlags.Intersection) {
        //         resolveIntersectionTypeMembers(type as IntersectionType);
        //     }
        //     else {
        //         Debug.fail("Unhandled type " + Debug.formatTypeFlags(type.flags));
        //     }
        // }
        return type as ResolvedType;
    }
    
    function getSingleSignature(type: Type, kind: SignatureKind, allowMembers: boolean): Signature | undefined {
        if (type.flags & TypeFlags.Object) {
            const resolved = resolveStructuredTypeMembers(type as ObjectType);
            if (allowMembers || resolved.properties.length === 0 && resolved.indexInfos.length === 0) {
                if (kind === SignatureKind.Call && resolved.callSignatures.length === 1 && resolved.constructSignatures.length === 0) {
                    return resolved.callSignatures[0];
                }
                if (kind === SignatureKind.Construct && resolved.constructSignatures.length === 1 && resolved.callSignatures.length === 0) {
                    return resolved.constructSignatures[0];
                }
            }
        }
        return undefined;
    }

    function checkSuperExpression(node: Node): Type {
        console.debug("TODO Implement me    checkSuperExpression");
        return anyType;
    }

    function instantiateTypeWithSingleGenericCallSignature(node: Expression, type: Type, checkMode?: CheckMode) {
        return anyFunctionType;
        // not needed for LPC?
        // if (checkMode && checkMode & (CheckMode.Inferential | CheckMode.SkipGenericFunctions)) {
        //     const callSignature = getSingleSignature(type, SignatureKind.Call, /*allowMembers*/ true);
        //     const constructSignature = getSingleSignature(type, SignatureKind.Construct, /*allowMembers*/ true);
        //     const signature = callSignature || constructSignature;
        //     if (signature && signature.typeParameters) {
        //         const contextualType = getApparentTypeOfContextualType(node as Expression, ContextFlags.NoConstraints);
        //         if (contextualType) {
        //             const contextualSignature = getSingleSignature(getNonNullableType(contextualType), callSignature ? SignatureKind.Call : SignatureKind.Construct, /*allowMembers*/ false);
        //             if (contextualSignature && !contextualSignature.typeParameters) {
        //                 if (checkMode & CheckMode.SkipGenericFunctions) {
        //                     skippedGenericFunction(node, checkMode);
        //                     return anyFunctionType;
        //                 }
        //                 const context = getInferenceContext(node)!;
        //                 // We have an expression that is an argument of a generic function for which we are performing
        //                 // type argument inference. The expression is of a function type with a single generic call
        //                 // signature and a contextual function type with a single non-generic call signature. Now check
        //                 // if the outer function returns a function type with a single non-generic call signature and
        //                 // if some of the outer function type parameters have no inferences so far. If so, we can
        //                 // potentially add inferred type parameters to the outer function return type.
        //                 const returnType = context.signature && getReturnTypeOfSignature(context.signature);
        //                 const returnSignature = returnType && getSingleCallOrConstructSignature(returnType);
        //                 if (returnSignature && !returnSignature.typeParameters && !every(context.inferences, hasInferenceCandidates)) {
        //                     // Instantiate the signature with its own type parameters as type arguments, possibly
        //                     // renaming the type parameters to ensure they have unique names.
        //                     const uniqueTypeParameters = getUniqueTypeParameters(context, signature.typeParameters);
        //                     const instantiatedSignature = getSignatureInstantiationWithoutFillingInTypeArguments(signature, uniqueTypeParameters);
        //                     // Infer from the parameters of the instantiated signature to the parameters of the
        //                     // contextual signature starting with an empty set of inference candidates.
        //                     const inferences = map(context.inferences, info => createInferenceInfo(info.typeParameter));
        //                     applyToParameterTypes(instantiatedSignature, contextualSignature, (source, target) => {
        //                         inferTypes(inferences, source, target, /*priority*/ 0, /*contravariant*/ true);
        //                     });
        //                     if (some(inferences, hasInferenceCandidates)) {
        //                         // We have inference candidates, indicating that one or more type parameters are referenced
        //                         // in the parameter types of the contextual signature. Now also infer from the return type.
        //                         applyToReturnTypes(instantiatedSignature, contextualSignature, (source, target) => {
        //                             inferTypes(inferences, source, target);
        //                         });
        //                         // If the type parameters for which we produced candidates do not have any inferences yet,
        //                         // we adopt the new inference candidates and add the type parameters of the expression type
        //                         // to the set of inferred type parameters for the outer function return type.
        //                         if (!hasOverlappingInferences(context.inferences, inferences)) {
        //                             mergeInferences(context.inferences, inferences);
        //                             context.inferredTypeParameters = concatenate(context.inferredTypeParameters, uniqueTypeParameters);
        //                             return getOrCreateTypeFromSignature(instantiatedSignature);
        //                         }
        //                     }
        //                 }
        //                 // TODO: The signature may reference any outer inference contexts, but we map pop off and then apply new inference contexts, and thus get different inferred types.
        //                 // That this is cached on the *first* such attempt is not currently an issue, since expression types *also* get cached on the first pass. If we ever properly speculate, though,
        //                 // the cached "isolatedSignatureType" signature field absolutely needs to be included in the list of speculative caches.
        //                 return getOrCreateTypeFromSignature(instantiateSignatureInContextOf(signature, contextualSignature, context), flatMap(inferenceContexts, c => c && map(c.inferences, i => i.typeParameter)).slice());
        //             }
        //         }
        //     }
        // }
        // return type;
    }

    function checkExpressionWorker(node: Expression /*| QualifiedName*/, checkMode: CheckMode | undefined, forceTuple?: boolean): Type {
        const kind = node.kind;
        if (cancellationToken) {
            // Only bother checking on a few construct kinds.  We don't want to be excessively
            // hitting the cancellation token on every node we check.
            switch (kind) {
                case SyntaxKind.ClassExpression:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.InlineClosureExpression:
                    cancellationToken.throwIfCancellationRequested();
            }
        }
        switch (kind) {
            // case SyntaxKind.Identifier:
            //     return checkIdentifier(node as Identifier, checkMode);
            // case SyntaxKind.PrivateIdentifier:
            //     return checkPrivateIdentifierExpression(node as PrivateIdentifier);
            // case SyntaxKind.ThisKeyword:
            //     return checkThisExpression(node);
            // case SyntaxKind.SuperKeyword:
            //     return checkSuperExpression(node);
            // case SyntaxKind.NullKeyword:
            //     return nullWideningType;
            // case SyntaxKind.NoSubstitutionTemplateLiteral:
            // case SyntaxKind.StringLiteral:
            //     return hasSkipDirectInferenceFlag(node) ?
            //         blockedStringType :
            //         getFreshTypeOfLiteralType(getStringLiteralType((node as StringLiteralLike).text));
            // case SyntaxKind.NumericLiteral:
            //     checkGrammarNumericLiteral(node as NumericLiteral);
            //     return getFreshTypeOfLiteralType(getNumberLiteralType(+(node as NumericLiteral).text));
            // case SyntaxKind.BigIntLiteral:
            //     checkGrammarBigIntLiteral(node as BigIntLiteral);
            //     return getFreshTypeOfLiteralType(getBigIntLiteralType({
            //         negative: false,
            //         base10Value: parsePseudoBigInt((node as BigIntLiteral).text),
            //     }));
            // case SyntaxKind.TrueKeyword:
            //     return trueType;
            // case SyntaxKind.FalseKeyword:
            //     return falseType;
            // case SyntaxKind.TemplateExpression:
            //     return checkTemplateExpression(node as TemplateExpression);
            // case SyntaxKind.RegularExpressionLiteral:
            //     return checkRegularExpressionLiteral(node as RegularExpressionLiteral);
            // case SyntaxKind.ArrayLiteralExpression:
            //     return checkArrayLiteral(node as ArrayLiteralExpression, checkMode, forceTuple);
            // case SyntaxKind.ObjectLiteralExpression:
            //     return checkObjectLiteral(node as ObjectLiteralExpression, checkMode);
            // case SyntaxKind.PropertyAccessExpression:
            //     return checkPropertyAccessExpression(node as PropertyAccessExpression, checkMode);
            // case SyntaxKind.QualifiedName:
            //     return checkQualifiedName(node as QualifiedName, checkMode);
            // case SyntaxKind.ElementAccessExpression:
            //     return checkIndexedAccess(node as ElementAccessExpression, checkMode);
            // case SyntaxKind.CallExpression:
            //     if ((node as CallExpression).expression.kind === SyntaxKind.ImportKeyword) {
            //         return checkImportCallExpression(node as ImportCall);
            //     }
            //     // falls through
            // case SyntaxKind.NewExpression:
            //     return checkCallExpression(node as CallExpression, checkMode);
            // case SyntaxKind.TaggedTemplateExpression:
            //     return checkTaggedTemplateExpression(node as TaggedTemplateExpression);
            // case SyntaxKind.ParenthesizedExpression:
            //     return checkParenthesizedExpression(node as ParenthesizedExpression, checkMode);
            // case SyntaxKind.ClassExpression:
            //     return checkClassExpression(node as ClassExpression);
            // case SyntaxKind.FunctionExpression:
            // case SyntaxKind.ArrowFunction:
            //     return checkFunctionExpressionOrObjectLiteralMethod(node as FunctionExpression | ArrowFunction, checkMode);
            // case SyntaxKind.TypeOfExpression:
            //     return checkTypeOfExpression(node as TypeOfExpression);
            // case SyntaxKind.TypeAssertionExpression:
            // case SyntaxKind.AsExpression:
            //     return checkAssertion(node as AssertionExpression, checkMode);
            // case SyntaxKind.NonNullExpression:
            //     return checkNonNullAssertion(node as NonNullExpression);
            // case SyntaxKind.ExpressionWithTypeArguments:
            //     return checkExpressionWithTypeArguments(node as ExpressionWithTypeArguments);
            // case SyntaxKind.SatisfiesExpression:
            //     return checkSatisfiesExpression(node as SatisfiesExpression);
            // case SyntaxKind.MetaProperty:
            //     return checkMetaProperty(node as MetaProperty);
            // case SyntaxKind.DeleteExpression:
            //     return checkDeleteExpression(node as DeleteExpression);
            // case SyntaxKind.VoidExpression:
            //     return checkVoidExpression(node as VoidExpression);
            // case SyntaxKind.AwaitExpression:
            //     return checkAwaitExpression(node as AwaitExpression);
            // case SyntaxKind.PrefixUnaryExpression:
            //     return checkPrefixUnaryExpression(node as PrefixUnaryExpression);
            // case SyntaxKind.PostfixUnaryExpression:
            //     return checkPostfixUnaryExpression(node as PostfixUnaryExpression);
            // case SyntaxKind.BinaryExpression:
            //     return checkBinaryExpression(node as BinaryExpression, checkMode);
            // case SyntaxKind.ConditionalExpression:
            //     return checkConditionalExpression(node as ConditionalExpression, checkMode);
            // case SyntaxKind.SpreadElement:
            //     return checkSpreadExpression(node as SpreadElement, checkMode);            
            // case SyntaxKind.SyntheticExpression:
            //     return checkSyntheticExpression(node as SyntheticExpression);
        }
        return errorType;
    }
        
    function checkSourceFileWithEagerDiagnostics(sourceFile: SourceFile, nodesToCheck?: Node[]) {
        ensurePendingDiagnosticWorkComplete();
        // then setup diagnostics for immediate invocation (as we are about to collect them, and
        // this avoids the overhead of longer-lived callbacks we don't need to allocate)
        // This also serves to make the shift to possibly lazy diagnostics transparent to serial command-line scenarios
        // (as in those cases, all the diagnostics will still be computed as the appropriate place in the tree,
        // thus much more likely retaining the same union ordering as before we had lazy diagnostics)
        const oldAddLazyDiagnostics = addLazyDiagnostic;
        addLazyDiagnostic = cb => cb();
        checkSourceFile(sourceFile, nodesToCheck);
        addLazyDiagnostic = oldAddLazyDiagnostics;
    }
    
    function ensurePendingDiagnosticWorkComplete() {
        // Invoke any existing lazy diagnostics to add them, clear the backlog of diagnostics
        for (const cb of deferredDiagnosticsCallbacks) {
            cb();
        }
        deferredDiagnosticsCallbacks = [];
    }

    function createSymbol(flags: SymbolFlags, name: string, checkFlags?: CheckFlags) {
        symbolCount++;
        const symbol = new Symbol(flags | SymbolFlags.Transient, name) as TransientSymbol;
        symbol.links = new SymbolLinks() as TransientSymbolLinks;
        symbol.links.checkFlags = checkFlags || CheckFlags.None;
        return symbol;
    }

    function signatureToString(signature: Signature, enclosingDeclaration?: Node, flags = TypeFormatFlags.None, kind?: SignatureKind, writer?: EmitTextWriter): string {
        return "n/a"; // TODO
    }

    function createSignature(
        declaration: SignatureDeclaration /*| JSDocSignature*/ | undefined,
        typeParameters: readonly TypeParameter[] | undefined,
        thisParameter: Symbol | undefined,
        parameters: readonly Symbol[],
        resolvedReturnType: Type | undefined,
        /** @deprecated not used in LPC */
        resolvedTypePredicate: undefined,//TypePredicate | undefined,
        minArgumentCount: number,
        flags: SignatureFlags,
    ): Signature {
        const sig = new Signature(checker, flags);
        sig.declaration = declaration;
        sig.typeParameters = typeParameters;
        sig.parameters = parameters;
        sig.thisParameter = thisParameter;
        sig.resolvedReturnType = resolvedReturnType;
        //sig.resolvedTypePredicate = resolvedTypePredicate;
        sig.minArgumentCount = minArgumentCount;
        sig.resolvedMinArgumentCount = undefined;
        sig.target = undefined;
        sig.mapper = undefined;
        sig.compositeSignatures = undefined;
        sig.compositeKind = undefined;
        return sig;
    }

    function createAnonymousType(symbol: Symbol | undefined, members: SymbolTable, callSignatures: readonly Signature[], constructSignatures: readonly Signature[], indexInfos: readonly IndexInfo[]): ResolvedType {
        return setStructuredTypeMembers(createObjectType(ObjectFlags.Anonymous, symbol), members, callSignatures, constructSignatures, indexInfos);
    }

    function setStructuredTypeMembers(type: StructuredType, members: SymbolTable, callSignatures: readonly Signature[], constructSignatures: readonly Signature[], indexInfos: readonly IndexInfo[]): ResolvedType {
        const resolved = type as ResolvedType;
        resolved.members = members;
        resolved.properties = emptyArray;
        resolved.callSignatures = callSignatures;
        resolved.constructSignatures = constructSignatures;
        resolved.indexInfos = indexInfos;
        // This can loop back to getPropertyOfType() which would crash if `callSignatures` & `constructSignatures` are not initialized.
        if (members !== emptySymbols) resolved.properties = getNamedMembers(members);
        return resolved;
    }

    function createObjectType(objectFlags: ObjectFlags, symbol?: Symbol): ObjectType {
        const type = createTypeWithSymbol(TypeFlags.Object, symbol!) as ObjectType;
        type.objectFlags = objectFlags;
        type.members = undefined;
        type.properties = undefined;
        type.callSignatures = undefined;
        type.constructSignatures = undefined;
        type.indexInfos = undefined;
        return type;
    }

    function getNamedMembers(members: SymbolTable): Symbol[] {
        let result: Symbol[] | undefined;
        members.forEach((symbol, id) => {
            if (isNamedMember(symbol, id)) {
                (result || (result = [])).push(symbol);
            }
        });
        return result || emptyArray;
    }

    function createTypeWithSymbol(flags: TypeFlags, symbol: Symbol): Type {
        const result = createType(flags);
        result.symbol = symbol;
        return result;
    }

    function isNamedMember(member: Symbol, escapedName: string) {
        return symbolIsValue(member);
    }

    function symbolIsValue(symbol: Symbol, includeTypeOnlyMembers?: boolean): boolean {
        return !!(
            symbol.flags & SymbolFlags.Value ||
            symbol.flags & SymbolFlags.Alias && getSymbolFlags(symbol, !includeTypeOnlyMembers) & SymbolFlags.Value
        );
    }

    /**
     * Gets combined flags of a `symbol` and all alias targets it resolves to. `resolveAlias`
     * is typically recursive over chains of aliases, but stops mid-chain if an alias is merged
     * with another exported symbol, e.g.
     * ```ts
     * // a.ts
     * export const a = 0;
     * // b.ts
     * export { a } from "./a";
     * export type a = number;
     * // c.ts
     * import { a } from "./b";
     * ```
     * Calling `resolveAlias` on the `a` in c.ts would stop at the merged symbol exported
     * from b.ts, even though there is still more alias to resolve. Consequently, if we were
     * trying to determine if the `a` in c.ts has a value meaning, looking at the flags on
     * the local symbol and on the symbol returned by `resolveAlias` is not enough.
     * @returns SymbolFlags.All if `symbol` is an alias that ultimately resolves to `unknown`;
     * combined flags of all alias targets otherwise.
     */
    function getSymbolFlags(symbol: Symbol, excludeTypeOnlyMeanings?: boolean, excludeLocalMeanings?: boolean): SymbolFlags {
        // LPC does not have aliases
        return symbol.flags;
        // const typeOnlyDeclaration = excludeTypeOnlyMeanings && getTypeOnlyAliasDeclaration(symbol);
        // const typeOnlyDeclarationIsExportStar = typeOnlyDeclaration && isExportDeclaration(typeOnlyDeclaration);
        // const typeOnlyResolution = typeOnlyDeclaration && (
        //     typeOnlyDeclarationIsExportStar
        //         ? resolveExternalModuleName(typeOnlyDeclaration.moduleSpecifier, typeOnlyDeclaration.moduleSpecifier, /*ignoreErrors*/ true)
        //         : resolveAlias(typeOnlyDeclaration.symbol)
        // );
        // const typeOnlyExportStarTargets = typeOnlyDeclarationIsExportStar && typeOnlyResolution ? getExportsOfModule(typeOnlyResolution) : undefined;
        // let flags = excludeLocalMeanings ? SymbolFlags.None : symbol.flags;
        // let seenSymbols;
        // while (symbol.flags & SymbolFlags.Alias) {
        //     const target = getExportSymbolOfValueSymbolIfExported(resolveAlias(symbol));
        //     if (
        //         !typeOnlyDeclarationIsExportStar && target === typeOnlyResolution ||
        //         typeOnlyExportStarTargets?.get(target.name) === target
        //     ) {
        //         break;
        //     }
        //     if (target === unknownSymbol) {
        //         return SymbolFlags.All;
        //     }

        //     // Optimizations - try to avoid creating or adding to
        //     // `seenSymbols` if possible
        //     if (target === symbol || seenSymbols?.has(target)) {
        //         break;
        //     }
        //     if (target.flags & SymbolFlags.Alias) {
        //         if (seenSymbols) {
        //             seenSymbols.add(target);
        //         }
        //         else {
        //             seenSymbols = new Set([symbol, target]);
        //         }
        //     }
        //     flags |= target.flags;
        //     symbol = target;
        // }
        // return flags;
    }

    function checkAndReportErrorForMissingPrefix(errorLocation: Node, name: string, nameArg: string | Identifier): boolean {
        if (!isIdentifier(errorLocation) || errorLocation.text !== name /*|| isTypeReferenceIdentifier(errorLocation) || isInTypeQuery(errorLocation)*/) {
            return false;
        }

        // TODO: no this in LPC, not needed?
        // const container = getThisContainer(errorLocation, /*includeArrowFunctions*/ false, /*includeClassComputedPropertyName*/ false);
        // let location: Node = container;
        // while (location) {
        //     if (isClassLike(location.parent)) {
        //         const classSymbol = getSymbolOfDeclaration(location.parent);
        //         if (!classSymbol) {
        //             break;
        //         }

        //         // Check to see if a static member exists.
        //         const constructorType = getTypeOfSymbol(classSymbol);
        //         if (getPropertyOfType(constructorType, name)) {
        //             error(errorLocation, Diagnostics.Cannot_find_name_0_Did_you_mean_the_static_member_1_0, diagnosticName(nameArg), symbolToString(classSymbol));
        //             return true;
        //         }

        //         // No static member is present.
        //         // Check if we're in an instance method and look for a relevant instance member.
        //         if (location === container && !isStatic(location)) {
        //             const instanceType = (getDeclaredTypeOfSymbol(classSymbol) as InterfaceType).thisType!; // TODO: GH#18217
        //             if (getPropertyOfType(instanceType, name)) {
        //                 error(errorLocation, Diagnostics.Cannot_find_name_0_Did_you_mean_the_instance_member_this_0, diagnosticName(nameArg));
        //                 return true;
        //             }
        //         }
        //     }

        //     location = location.parent;
        // }
        return false;
    }
    
    function isPrimitiveTypeName(name: string) {
        return name === "string" || name === "int" || name === "object" || name === "float" || name === "mixed" || name === "mapping" || name === "unknown";
    }

    /**
     * Indicates that a symbol is an alias that does not merge with a local declaration.
     * OR Is a JSContainer which may merge an alias with a local declaration
     */
    function isNonLocalAlias(symbol: Symbol | undefined, excludes = SymbolFlags.Value | SymbolFlags.Type | SymbolFlags.Namespace): symbol is Symbol {
        if (!symbol) return false;
        return (symbol.flags & (SymbolFlags.Alias | excludes)) === SymbolFlags.Alias || !!(symbol.flags & SymbolFlags.Alias && symbol.flags & SymbolFlags.Assignment);
    }

    function resolveSymbol(symbol: Symbol, dontResolveAlias?: boolean): Symbol;
    function resolveSymbol(symbol: Symbol | undefined, dontResolveAlias?: boolean): Symbol | undefined;
    function resolveSymbol(symbol: Symbol | undefined, dontResolveAlias?: boolean): Symbol | undefined {
        return !dontResolveAlias && isNonLocalAlias(symbol) ? resolveAlias(symbol) : symbol;
    }

    function resolveAlias(symbol: Symbol): Symbol {
        Debug.assert((symbol.flags & SymbolFlags.Alias) !== 0, "Should only get Alias here.");
        const links = getSymbolLinks(symbol);
        if (!links.aliasTarget) {
            links.aliasTarget = resolvingSymbol;
            const node = getDeclarationOfAliasSymbol(symbol);
            if (!node) return Debug.fail();
            const target = getTargetOfAliasDeclaration(node);
            if (links.aliasTarget === resolvingSymbol) {
                links.aliasTarget = target || unknownSymbol;
            }
            else {
                error(node, Diagnostics.Circular_definition_of_import_alias_0, symbolToString(symbol));
            }
        }
        else if (links.aliasTarget === resolvingSymbol) {
            links.aliasTarget = unknownSymbol;
        }
        return links.aliasTarget;
    }

    function tryResolveAlias(symbol: Symbol): Symbol | undefined {
        const links = getSymbolLinks(symbol);
        if (links.aliasTarget !== resolvingSymbol) {
            return resolveAlias(symbol);
        }

        return undefined;
    }

    function symbolToString(symbol: Symbol, enclosingDeclaration?: Node, meaning?: SymbolFlags, flags: SymbolFormatFlags = SymbolFormatFlags.AllowAnyNodeKind, writer?: EmitTextWriter): string {
        Debug.fail("Implement me - symbolToString");
        // let nodeFlags = NodeBuilderFlags.IgnoreErrors;
        // if (flags & SymbolFormatFlags.UseOnlyExternalAliasing) {
        //     nodeFlags |= NodeBuilderFlags.UseOnlyExternalAliasing;
        // }
        // if (flags & SymbolFormatFlags.WriteTypeParametersOrArguments) {
        //     nodeFlags |= NodeBuilderFlags.WriteTypeParametersInQualifiedName;
        // }
        // if (flags & SymbolFormatFlags.UseAliasDefinedOutsideCurrentScope) {
        //     nodeFlags |= NodeBuilderFlags.UseAliasDefinedOutsideCurrentScope;
        // }
        // if (flags & SymbolFormatFlags.DoNotIncludeSymbolChain) {
        //     nodeFlags |= NodeBuilderFlags.DoNotIncludeSymbolChain;
        // }
        // if (flags & SymbolFormatFlags.WriteComputedProps) {
        //     nodeFlags |= NodeBuilderFlags.WriteComputedProps;
        // }
        // const builder = flags & SymbolFormatFlags.AllowAnyNodeKind ? nodeBuilder.symbolToNode : nodeBuilder.symbolToEntityName;
        // return writer ? symbolToStringWorker(writer).getText() : usingSingleLineStringWriter(symbolToStringWorker);

        // function symbolToStringWorker(writer: EmitTextWriter) {
        //     const entity = builder(symbol, meaning!, enclosingDeclaration, nodeFlags)!; // TODO: GH#18217
        //     // add neverAsciiEscape for GH#39027
        //     const printer = enclosingDeclaration?.kind === SyntaxKind.SourceFile
        //         ? createPrinterWithRemoveCommentsNeverAsciiEscape()
        //         : createPrinterWithRemoveComments();
        //     const sourceFile = enclosingDeclaration && getSourceFileOfNode(enclosingDeclaration);
        //     printer.writeNode(EmitHint.Unspecified, entity, /*sourceFile*/ sourceFile, writer);
        //     return writer;
        // }
    }
    
    function getTargetOfAliasDeclaration(node: Declaration, dontRecursivelyResolve = false): Symbol | undefined {
        // TODO
        Debug.fail("Implement me - getTargetOfAliasDeclaration");
        // switch (node.kind) {
        //     //case SyntaxKind.ImportEqualsDeclaration:
        //     case SyntaxKind.VariableDeclaration:
        //         return getTargetOfImportEqualsDeclaration(node as ImportEqualsDeclaration | VariableDeclaration, dontRecursivelyResolve);
        //     case SyntaxKind.ImportClause:
        //         return getTargetOfImportClause(node as ImportClause, dontRecursivelyResolve);
        //     case SyntaxKind.NamespaceImport:
        //         return getTargetOfNamespaceImport(node as NamespaceImport, dontRecursivelyResolve);
        //     case SyntaxKind.NamespaceExport:
        //         return getTargetOfNamespaceExport(node as NamespaceExport, dontRecursivelyResolve);
        //     case SyntaxKind.ImportSpecifier:
        //     case SyntaxKind.BindingElement:
        //         return getTargetOfImportSpecifier(node as ImportSpecifier | BindingElement, dontRecursivelyResolve);
        //     case SyntaxKind.ExportSpecifier:
        //         return getTargetOfExportSpecifier(node as ExportSpecifier, SymbolFlags.Value | SymbolFlags.Type | SymbolFlags.Namespace, dontRecursivelyResolve);
        //     case SyntaxKind.ExportAssignment:
        //     case SyntaxKind.BinaryExpression:
        //         return getTargetOfExportAssignment(node as ExportAssignment | BinaryExpression, dontRecursivelyResolve);
        //     case SyntaxKind.NamespaceExportDeclaration:
        //         return getTargetOfNamespaceExportDeclaration(node as NamespaceExportDeclaration, dontRecursivelyResolve);
        //     case SyntaxKind.ShorthandPropertyAssignment:
        //         return resolveEntityName((node as ShorthandPropertyAssignment).name, SymbolFlags.Value | SymbolFlags.Type | SymbolFlags.Namespace, /*ignoreErrors*/ true, dontRecursivelyResolve);
        //     case SyntaxKind.PropertyAssignment:
        //         return getTargetOfAliasLikeExpression((node as PropertyAssignment).initializer, dontRecursivelyResolve);
        //     case SyntaxKind.ElementAccessExpression:
        //     case SyntaxKind.PropertyAccessExpression:
        //         return getTargetOfAccessExpression(node as AccessExpression, dontRecursivelyResolve);
        //     default:
        //         return Debug.fail();
        // }
    }

    function getDeclarationOfAliasSymbol(symbol: Symbol): Declaration | undefined {
        return symbol.declarations && findLast<Declaration>(symbol.declarations, isAliasSymbolDeclaration);
    }

    /**
     * An alias symbol is created by one of the following declarations:
     * import <symbol> = ...
     * import <symbol> from ...
     * import * as <symbol> from ...
     * import { x as <symbol> } from ...
     * export { x as <symbol> } from ...
     * export * as ns <symbol> from ...
     * export = <EntityNameExpression>
     * export default <EntityNameExpression>
     * module.exports = <EntityNameExpression>
     * {<Identifier>}
     * {name: <EntityNameExpression>}
     * const { x } = require ...
     */
    function isAliasSymbolDeclaration(node: Node): boolean {
        // return node.kind === SyntaxKind.ImportEqualsDeclaration
        //     || node.kind === SyntaxKind.NamespaceExportDeclaration
        //     || node.kind === SyntaxKind.ImportClause && !!(node as ImportClause).name
        //     || node.kind === SyntaxKind.NamespaceImport
        //     || node.kind === SyntaxKind.NamespaceExport
        //     || node.kind === SyntaxKind.ImportSpecifier
        //     || node.kind === SyntaxKind.ExportSpecifier
        //     || node.kind === SyntaxKind.ExportAssignment && exportAssignmentIsAlias(node as ExportAssignment)
        //     || isBinaryExpression(node) && getAssignmentDeclarationKind(node) === AssignmentDeclarationKind.ModuleExports && exportAssignmentIsAlias(node)
        return isAccessExpression(node)
                && isBinaryExpression(node.parent)
                && node.parent.left === node
                && node.parent.operatorToken.kind === SyntaxKind.EqualsToken
                && isAliasableOrJsExpression(node.parent.right)
            || node.kind === SyntaxKind.ShorthandPropertyAssignment
            || node.kind === SyntaxKind.PropertyAssignment && isAliasableOrJsExpression((node as PropertyAssignment).initializer)
            || node.kind === SyntaxKind.VariableDeclaration && isVariableDeclarationInitializedToBareOrAccessedRequire(node)
            //|| node.kind === SyntaxKind.BindingElement && isVariableDeclarationInitializedToBareOrAccessedRequire(node.parent.parent);
            ;
    }

    function isAliasableOrJsExpression(e: Expression) {
        return isAliasableExpression(e);// || isFunctionExpression(e) && isJSConstructor(e);
    }

    function checkAndReportErrorForUsingTypeAsValue(errorLocation: Node, name: string, meaning: SymbolFlags): boolean {
        if (meaning & SymbolFlags.Value) {
            if (isPrimitiveTypeName(name)) {
                const grandparent = errorLocation.parent.parent;
                // if (grandparent && grandparent.parent && isHeritageClause(grandparent)) {
                //     const heritageKind = grandparent.token;
                //     const containerKind = grandparent.parent.kind;
                //     if (containerKind === SyntaxKind.InterfaceDeclaration && heritageKind === SyntaxKind.ExtendsKeyword) {
                //         error(errorLocation, Diagnostics.An_interface_cannot_extend_a_primitive_type_like_0_It_can_only_extend_other_named_object_types, unescapeLeadingUnderscores(name));
                //     }
                //     else if (containerKind === SyntaxKind.ClassDeclaration && heritageKind === SyntaxKind.ExtendsKeyword) {
                //         error(errorLocation, Diagnostics.A_class_cannot_extend_a_primitive_type_like_0_Classes_can_only_extend_constructable_values, unescapeLeadingUnderscores(name));
                //     }
                //     else if (containerKind === SyntaxKind.ClassDeclaration && heritageKind === SyntaxKind.ImplementsKeyword) {
                //         error(errorLocation, Diagnostics.A_class_cannot_implement_a_primitive_type_like_0_It_can_only_implement_other_named_object_types, unescapeLeadingUnderscores(name));
                //     }
                // }
                // else {
                    error(errorLocation, Diagnostics._0_only_refers_to_a_type_but_is_being_used_as_a_value_here, (name));
                //}
                return true;
            }
            const symbol = resolveSymbol(resolveName(errorLocation, name, SymbolFlags.Type & ~SymbolFlags.Value, /*nameNotFoundMessage*/ undefined, /*isUse*/ false));
            const allFlags = symbol && getSymbolFlags(symbol);
            if (symbol && allFlags !== undefined && !(allFlags & SymbolFlags.Value)) {
                const rawName = (name);
                // if (maybeMappedType(errorLocation, symbol)) {
                //     error(errorLocation, Diagnostics._0_only_refers_to_a_type_but_is_being_used_as_a_value_here_Did_you_mean_to_use_1_in_0, rawName, rawName === "K" ? "P" : "K");
                // }
                // else {
                    error(errorLocation, Diagnostics._0_only_refers_to_a_type_but_is_being_used_as_a_value_here, rawName);
                //}
                return true;
            }
        }
        return false;
    }

    function checkAndReportErrorForUsingValueAsType(errorLocation: Node, name: string, meaning: SymbolFlags): boolean {
        if (meaning & (SymbolFlags.Type & ~SymbolFlags.Namespace)) {
            const symbol = resolveSymbol(resolveName(errorLocation, name, ~SymbolFlags.Type & SymbolFlags.Value, /*nameNotFoundMessage*/ undefined, /*isUse*/ false));
            if (symbol && !(symbol.flags & SymbolFlags.Namespace)) {
                error(errorLocation, Diagnostics._0_refers_to_a_value_but_is_being_used_as_a_type_here_Did_you_mean_typeof_0, (name));
                return true;
            }
        }
        return false;
    }

    function getSuggestedSymbolForNonexistentSymbol(location: Node | undefined, outerName: string, meaning: SymbolFlags): Symbol | undefined {
        Debug.assert(outerName !== undefined, "outername should always be defined");
        const result = resolveNameForSymbolSuggestion(location, outerName, meaning, /*nameNotFoundMessage*/ undefined, /*isUse*/ false, /*excludeGlobals*/ false);
        return result;
    }

    function getSuggestionForSymbolNameLookup(symbols: SymbolTable, name: string, meaning: SymbolFlags) {
        const symbol = getSymbol(symbols, name, meaning);
        // Sometimes the symbol is found when location is a return type of a function: `typeof x` and `x` is declared in the body of the function
        // So the table *contains* `x` but `x` isn't actually in scope.
        // However, resolveNameHelper will continue and call this callback again, so we'll eventually get a correct suggestion.
        if (symbol) return symbol;
        let candidates: Symbol[];
        if (symbols === globals) {
            const primitives = mapDefined(
                ["string", "number", "boolean", "object", "bigint", "symbol"],
                s => symbols.has((s.charAt(0).toUpperCase() + s.slice(1)) as string)
                    ? createSymbol(SymbolFlags.TypeAlias, s as string) as Symbol
                    : undefined,
            );
            candidates = primitives.concat(arrayFrom(symbols.values()));
        }
        else {
            candidates = arrayFrom(symbols.values());
        }
        return getSpellingSuggestionForName((name), candidates, meaning);
    }

    /**
     * Given a name and a list of symbols whose names are *not* equal to the name, return a spelling suggestion if there is one that is close enough.
     * Names less than length 3 only check for case-insensitive equality, not levenshtein distance.
     *
     * If there is a candidate that's the same except for case, return that.
     * If there is a candidate that's within one edit of the name, return that.
     * Otherwise, return the candidate with the smallest Levenshtein distance,
     *    except for candidates:
     *      * With no name
     *      * Whose meaning doesn't match the `meaning` parameter.
     *      * Whose length differs from the target name by more than 0.34 of the length of the name.
     *      * Whose levenshtein distance is more than 0.4 of the length of the name
     *        (0.4 allows 1 substitution/transposition for every 5 characters,
     *         and 1 insertion/deletion at 3 characters)
     */
    function getSpellingSuggestionForName(name: string, symbols: Symbol[], meaning: SymbolFlags): Symbol | undefined {
        return getSpellingSuggestion(name, symbols, getCandidateName);

        function getCandidateName(candidate: Symbol) {
            const candidateName = symbolName(candidate);
            if (startsWith(candidateName, '"')) {
                return undefined;
            }

            if (candidate.flags & meaning) {
                return candidateName;
            }

            if (candidate.flags & SymbolFlags.Alias) {
                const alias = tryResolveAlias(candidate);
                if (alias && alias.flags & meaning) {
                    return candidateName;
                }
            }

            return undefined;
        }
    }

    function onFailedToResolveSymbol(
        errorLocation: Node | undefined,
        nameArg: string | Identifier,
        meaning: SymbolFlags,
        nameNotFoundMessage: DiagnosticMessage,
    ) {
        const name = isString(nameArg) ? nameArg : (nameArg as Identifier).text;
        addLazyDiagnostic(() => {
            if (
                !errorLocation ||
                errorLocation.parent.kind !== SyntaxKind.JSDocLink &&
                    !checkAndReportErrorForMissingPrefix(errorLocation, name, nameArg) &&
                    !checkAndReportErrorForUsingTypeAsValue(errorLocation, name, meaning) &&
                    !checkAndReportErrorForUsingValueAsType(errorLocation, name, meaning)
            ) {
                let suggestion: Symbol | undefined;
                let suggestedLib: string | undefined;
                // Report missing lib first
                if (nameArg) {
                    // TODO
                    // suggestedLib = getSuggestedLibForNonExistentName(nameArg);
                    // if (suggestedLib) {
                    //     error(errorLocation, nameNotFoundMessage, diagnosticName(nameArg), suggestedLib);
                    // }
                }
                // then spelling suggestions
                if (!suggestedLib && suggestionCount < maximumSuggestionCount) {
                    suggestion = getSuggestedSymbolForNonexistentSymbol(errorLocation, name, meaning);
                    // const isGlobalScopeAugmentationDeclaration = suggestion?.valueDeclaration && isAmbientModule(suggestion.valueDeclaration) && isGlobalScopeAugmentation(suggestion.valueDeclaration);
                    // if (isGlobalScopeAugmentationDeclaration) {
                    //     suggestion = undefined;
                    // }
                    if (suggestion) {
                        const suggestionName = symbolToString(suggestion);
                        //const isUncheckedJS = isUncheckedJSSuggestion(errorLocation, suggestion, /*excludeClasses*/ false);
                        const message = Diagnostics.Cannot_find_name_0_Did_you_mean_1;
                        const diagnostic = createError(errorLocation, message, diagnosticName(nameArg), suggestionName);
                        diagnostic.canonicalHead = getCanonicalDiagnostic(nameNotFoundMessage, diagnosticName(nameArg));
                        addErrorOrSuggestion(true, diagnostic);
                        if (suggestion.valueDeclaration) {
                            addRelatedInfo(
                                diagnostic,
                                createDiagnosticForNode(suggestion.valueDeclaration, Diagnostics._0_is_declared_here, suggestionName),
                            );
                        }
                    }
                }
                // And then fall back to unspecified "not found"
                if (!suggestion && !suggestedLib && nameArg) {
                    error(errorLocation, nameNotFoundMessage, diagnosticName(nameArg));
                }
                suggestionCount++;
            }
        });
    }

    function addErrorOrSuggestion(isError: boolean, diagnostic: Diagnostic) {
        if (isError) {
            diagnostics.add(diagnostic);
        }
        else {
            suggestionDiagnostics.add({ ...diagnostic, category: DiagnosticCategory.Suggestion });
        }
    }
    
    function diagnosticName(nameArg: string | Identifier /*| PrivateIdentifier*/) {
        return isString(nameArg) ? (nameArg as string) : declarationNameToString(nameArg as Identifier);
    }

    function getExportSymbolOfValueSymbolIfExported(symbol: Symbol): Symbol;
    function getExportSymbolOfValueSymbolIfExported(symbol: Symbol | undefined): Symbol | undefined;
    function getExportSymbolOfValueSymbolIfExported(symbol: Symbol | undefined): Symbol | undefined {
        return getMergedSymbol(symbol && (symbol.flags & SymbolFlags.ExportValue) !== 0 && symbol.exportSymbol || symbol);
    }

    function checkResolvedBlockScopedVariable(result: Symbol, errorLocation: Node): void {
        Debug.assert(!!(result.flags & SymbolFlags.BlockScopedVariable || result.flags & SymbolFlags.Class || result.flags & SymbolFlags.Enum));
        if (result.flags & (SymbolFlags.Function | SymbolFlags.FunctionScopedVariable | SymbolFlags.Assignment) && result.flags & SymbolFlags.Class) {
            // constructor functions aren't block scoped
            return;
        }
        // Block-scoped variables cannot be used before their definition
        const declaration = result.declarations?.find(
            d => isBlockOrCatchScoped(d),//TODO || isClassLike(d),
        );

        if (declaration === undefined) return Debug.fail("checkResolvedBlockScopedVariable could not find block-scoped declaration");

        console.warn("Implement me - checkResolvedBlockScopedVariable");
        // if (!(declaration.flags & NodeFlags.Ambient) && !isBlockScopedNameDeclaredBeforeUse(declaration, errorLocation)) {
        //     let diagnosticMessage;
        //     const declarationName = declarationNameToString(getNameOfDeclaration(declaration));
        //     if (result.flags & SymbolFlags.BlockScopedVariable) {
        //         diagnosticMessage = error(errorLocation, Diagnostics.Block_scoped_variable_0_used_before_its_declaration, declarationName);
        //     }
        //     else if (result.flags & SymbolFlags.Class) {
        //         diagnosticMessage = error(errorLocation, Diagnostics.Class_0_used_before_its_declaration, declarationName);
        //     }
        //     else if (result.flags & SymbolFlags.RegularEnum) {
        //         diagnosticMessage = error(errorLocation, Diagnostics.Enum_0_used_before_its_declaration, declarationName);
        //     }
        //     else {
        //         Debug.assert(!!(result.flags & SymbolFlags.ConstEnum));
        //         if (getIsolatedModules(compilerOptions)) {
        //             diagnosticMessage = error(errorLocation, Diagnostics.Enum_0_used_before_its_declaration, declarationName);
        //         }
        //     }

        //     if (diagnosticMessage) {
        //         addRelatedInfo(diagnosticMessage, createDiagnosticForNode(declaration, Diagnostics._0_is_declared_here, declarationName));
        //     }
        // }
    }
    
    function onSuccessfullyResolvedSymbol(
        errorLocation: Node | undefined,
        result: Symbol,
        meaning: SymbolFlags,
        lastLocation: Node | undefined,
        associatedDeclarationForContainingInitializerOrBindingName: ParameterDeclaration | BindingElement | undefined,
        withinDeferredContext: boolean,
    ) {
        addLazyDiagnostic(() => {
            const name = result.name;
            const isInExternalModule = lastLocation && isSourceFile(lastLocation) && isExternalOrCommonJsModule(lastLocation);
            // Only check for block-scoped variable if we have an error location and are looking for the
            // name with variable meaning
            //      For example,
            //          declare module foo {
            //              interface bar {}
            //          }
            //      const foo/*1*/: foo/*2*/.bar;
            // The foo at /*1*/ and /*2*/ will share same symbol with two meanings:
            // block-scoped variable and namespace module. However, only when we
            // try to resolve name in /*1*/ which is used in variable position,
            // we want to check for block-scoped
            if (
                errorLocation &&
                (meaning & SymbolFlags.BlockScopedVariable ||
                    ((meaning & SymbolFlags.Class || meaning & SymbolFlags.Enum) && (meaning & SymbolFlags.Value) === SymbolFlags.Value))
            ) {
                const exportOrLocalSymbol = getExportSymbolOfValueSymbolIfExported(result);
                if (exportOrLocalSymbol.flags & SymbolFlags.BlockScopedVariable || exportOrLocalSymbol.flags & SymbolFlags.Class || exportOrLocalSymbol.flags & SymbolFlags.Enum) {
                    checkResolvedBlockScopedVariable(exportOrLocalSymbol, errorLocation);
                }
            }

            // // If we're in a parameter initializer or binding name, we can't reference the values of the parameter whose initializer we're within or parameters to the right
            // if (associatedDeclarationForContainingInitializerOrBindingName && !withinDeferredContext && (meaning & SymbolFlags.Value) === SymbolFlags.Value) {
            //     const candidate = getMergedSymbol(getLateBoundSymbol(result));
            //     const root = getRootDeclaration(associatedDeclarationForContainingInitializerOrBindingName) as ParameterDeclaration;
            //     // A parameter initializer or binding pattern initializer within a parameter cannot refer to itself
            //     if (candidate === getSymbolOfDeclaration(associatedDeclarationForContainingInitializerOrBindingName)) {
            //         error(errorLocation, Diagnostics.Parameter_0_cannot_reference_itself, declarationNameToString(associatedDeclarationForContainingInitializerOrBindingName.name));
            //     }
            //     // And it cannot refer to any declarations which come after it
            //     else if (candidate.valueDeclaration && candidate.valueDeclaration.pos > associatedDeclarationForContainingInitializerOrBindingName.pos && root.parent.locals && getSymbol(root.parent.locals, candidate.name, meaning) === candidate) {
            //         error(errorLocation, Diagnostics.Parameter_0_cannot_reference_identifier_1_declared_after_it, declarationNameToString(associatedDeclarationForContainingInitializerOrBindingName.name), declarationNameToString(errorLocation as Identifier));
            //     }
            // }
            
            // No type-only imports in LPC
            // if (errorLocation && meaning & SymbolFlags.Value && result.flags & SymbolFlags.Alias && !(result.flags & SymbolFlags.Value) && !isValidTypeOnlyAliasUseSite(errorLocation)) {
            //     const typeOnlyDeclaration = getTypeOnlyAliasDeclaration(result, SymbolFlags.Value);
            //     if (typeOnlyDeclaration) {
            //         const message = typeOnlyDeclaration.kind === SyntaxKind.ExportSpecifier || typeOnlyDeclaration.kind === SyntaxKind.ExportDeclaration || typeOnlyDeclaration.kind === SyntaxKind.NamespaceExport
            //             ? Diagnostics._0_cannot_be_used_as_a_value_because_it_was_exported_using_export_type
            //             : Diagnostics._0_cannot_be_used_as_a_value_because_it_was_imported_using_import_type;
            //         const unescapedName = unescapeLeadingUnderscores(name);
            //         addTypeOnlyDeclarationRelatedInfo(
            //             error(errorLocation, message, unescapedName),
            //             typeOnlyDeclaration,
            //             unescapedName,
            //         );
            //     }
            // }

            // Not used in LPC
            // // Look at 'compilerOptions.isolatedModules' and not 'getIsolatedModules(...)' (which considers 'verbatimModuleSyntax')
            // // here because 'verbatimModuleSyntax' will already have an error for importing a type without 'import type'.
            // if (compilerOptions.isolatedModules && result && isInExternalModule && (meaning & SymbolFlags.Value) === SymbolFlags.Value) {
            //     const isGlobal = getSymbol(globals, name, meaning) === result;
            //     const nonValueSymbol = isGlobal && isSourceFile(lastLocation) && lastLocation.locals && getSymbol(lastLocation.locals, name, ~SymbolFlags.Value);
            //     if (nonValueSymbol) {
            //         // TODO : do we need this?
            //         // const importDecl = nonValueSymbol.declarations?.find(d => d.kind === SyntaxKind.ImportSpecifier || d.kind === SyntaxKind.ImportClause || d.kind === SyntaxKind.NamespaceImport || d.kind === SyntaxKind.ImportEqualsDeclaration);
            //         // if (importDecl && !isTypeOnlyImportDeclaration(importDecl)) {
            //         //     error(importDecl, Diagnostics.Import_0_conflicts_with_global_value_used_in_this_file_so_must_be_declared_with_a_type_only_import_when_isolatedModules_is_enabled, unescapeLeadingUnderscores(name));
            //         // }
            //     }
            // }
        });
    }

    function getCannotFindNameDiagnosticForName(node: Identifier): DiagnosticMessage {
        // TODO
        switch (node.text) {
            // case "document":
            // case "console":
            //     return Diagnostics.Cannot_find_name_0_Do_you_need_to_change_your_target_library_Try_changing_the_lib_compiler_option_to_include_dom;
            // case "$":
            //     return compilerOptions.types
            //         ? Diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_jQuery_Try_npm_i_save_dev_types_Slashjquery_and_then_add_jquery_to_the_types_field_in_your_tsconfig
            //         : Diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_jQuery_Try_npm_i_save_dev_types_Slashjquery;
            // case "describe":
            // case "suite":
            // case "it":
            // case "test":
            //     return compilerOptions.types
            //         ? Diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_a_test_runner_Try_npm_i_save_dev_types_Slashjest_or_npm_i_save_dev_types_Slashmocha_and_then_add_jest_or_mocha_to_the_types_field_in_your_tsconfig
            //         : Diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_a_test_runner_Try_npm_i_save_dev_types_Slashjest_or_npm_i_save_dev_types_Slashmocha;
            // case "process":
            // case "require":
            // case "Buffer":
            // case "module":
            //     return compilerOptions.types
            //         ? Diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_node_Try_npm_i_save_dev_types_Slashnode_and_then_add_node_to_the_types_field_in_your_tsconfig
            //         : Diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_node_Try_npm_i_save_dev_types_Slashnode;
            // case "Bun":
            //     return compilerOptions.types
            //         ? Diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_Bun_Try_npm_i_save_dev_types_Slashbun_and_then_add_bun_to_the_types_field_in_your_tsconfig
            //         : Diagnostics.Cannot_find_name_0_Do_you_need_to_install_type_definitions_for_Bun_Try_npm_i_save_dev_types_Slashbun;
            // case "Map":
            // case "Set":
            // case "Promise":
            // case "Symbol":
            // case "WeakMap":
            // case "WeakSet":
            // case "Iterator":
            // case "AsyncIterator":
            // case "SharedArrayBuffer":
            // case "Atomics":
            // case "AsyncIterable":
            // case "AsyncIterableIterator":
            // case "AsyncGenerator":
            // case "AsyncGeneratorFunction":
            // case "BigInt":
            // case "Reflect":
            // case "BigInt64Array":
            // case "BigUint64Array":
            //     return Diagnostics.Cannot_find_name_0_Do_you_need_to_change_your_target_library_Try_changing_the_lib_compiler_option_to_1_or_later;
            // case "await":
            //     if (isCallExpression(node.parent)) {
            //         return Diagnostics.Cannot_find_name_0_Did_you_mean_to_write_this_in_an_async_function;
            //     }
            //     // falls through
            default:
                if (node.parent.kind === SyntaxKind.ShorthandPropertyAssignment) {
                    return Diagnostics.No_value_exists_in_scope_for_the_shorthand_property_0_Either_declare_one_or_provide_an_initializer;
                }
                else {
                    return Diagnostics.Cannot_find_name_0;
                }
        }
    }
    
    function getResolvedSymbol(node: Identifier): Symbol {
        const links = getNodeLinks(node);
        if (!links.resolvedSymbol) {
            links.resolvedSymbol = !nodeIsMissing(node) &&
                    resolveName(
                        node,
                        node,
                        SymbolFlags.Value | SymbolFlags.ExportValue,
                        getCannotFindNameDiagnosticForName(node),
                        !isWriteOnlyAccess(node),
                        /*excludeGlobals*/ false,
                    ) || unknownSymbol;
        }
        return links.resolvedSymbol;
    }
    
    function getParentOfSymbol(symbol: Symbol): Symbol | undefined {
        return getMergedSymbol(symbol.parent && getLateBoundSymbol(symbol.parent));
    }

    function getCombinedNodeFlagsCached(node: Node) {
        // we hold onto the last node and result to speed up repeated lookups against the same node.
        if (lastGetCombinedNodeFlagsNode === node) {
            return lastGetCombinedNodeFlagsResult;
        }
        lastGetCombinedNodeFlagsNode = node;
        lastGetCombinedNodeFlagsResult = getCombinedNodeFlags(node);
        return lastGetCombinedNodeFlagsResult;
    }
    
    function isDeprecatedDeclaration(declaration: Declaration) {
        return !!(getCombinedNodeFlagsCached(declaration) & NodeFlags.Deprecated);
    }

    function isDeprecatedSymbol(symbol: Symbol) {
        const parentSymbol = getParentOfSymbol(symbol);
        if (parentSymbol && length(symbol.declarations) > 1) {
            return parentSymbol.flags & SymbolFlags.Interface ? some(symbol.declarations, isDeprecatedDeclaration) : every(symbol.declarations, isDeprecatedDeclaration);
        }
        return !!symbol.valueDeclaration && isDeprecatedDeclaration(symbol.valueDeclaration)
            || length(symbol.declarations) && every(symbol.declarations, isDeprecatedDeclaration);
    }

    function getImmediateAliasedSymbol(symbol: Symbol): Symbol | undefined {
        Debug.assert((symbol.flags & SymbolFlags.Alias) !== 0, "Should only get Alias here.");
        const links = getSymbolLinks(symbol);
        if (!links.immediateTarget) {
            const node = getDeclarationOfAliasSymbol(symbol);
            if (!node) return Debug.fail();
            links.immediateTarget = getTargetOfAliasDeclaration(node, /*dontRecursivelyResolve*/ true);
        }

        return links.immediateTarget;
    }

    function addDeprecatedSuggestion(location: Node, declarations: Node[], deprecatedEntity: string) {
        const diagnostic = createDiagnosticForNode(location, Diagnostics._0_is_deprecated, deprecatedEntity);
        return addDeprecatedSuggestionWorker(declarations, diagnostic);
    }

    function addDeprecatedSuggestionWorker(declarations: Node | Node[], diagnostic: DiagnosticWithLocation) {
        const deprecatedTag = Array.isArray(declarations) ? forEach(declarations, getJSDocDeprecatedTag) : getJSDocDeprecatedTag(declarations);
        if (deprecatedTag) {
            addRelatedInfo(
                diagnostic,
                createDiagnosticForNode(deprecatedTag, Diagnostics.The_declaration_was_marked_as_deprecated_here),
            );
        }
        // We call `addRelatedInfo()` before adding the diagnostic to prevent duplicates.
        suggestionDiagnostics.add(diagnostic);
        return diagnostic;
    }

    function resolveAliasWithDeprecationCheck(symbol: Symbol, location: Node) {
        if (!(symbol.flags & SymbolFlags.Alias) || isDeprecatedSymbol(symbol) || !getDeclarationOfAliasSymbol(symbol)) {
            return symbol;
        }

        const targetSymbol = resolveAlias(symbol);
        if (targetSymbol === unknownSymbol) return targetSymbol;

        while (symbol.flags & SymbolFlags.Alias) {
            const target = getImmediateAliasedSymbol(symbol);
            if (target) {
                if (target === targetSymbol) break;
                if (target.declarations && length(target.declarations)) {
                    if (isDeprecatedSymbol(target)) {
                        addDeprecatedSuggestion(location, target.declarations, target.name as string);
                        break;
                    }
                    else {
                        if (symbol === targetSymbol) break;
                        symbol = target;
                    }
                }
            }
            else {
                break;
            }
        }
        return targetSymbol;
    }

    function isMatchingReference(source: Node, target: Node): boolean {
        switch (target.kind) {
            case SyntaxKind.ParenthesizedExpression:            
                return isMatchingReference(source, (target as ParenthesizedExpression).expression);
            case SyntaxKind.BinaryExpression:
                return (isAssignmentExpression(target) && isMatchingReference(source, target.left)) ||
                    (isBinaryExpression(target) && target.operatorToken.kind === SyntaxKind.CommaToken && isMatchingReference(source, target.right));
        }
        switch (source.kind) {            
            case SyntaxKind.Identifier:
            //case SyntaxKind.PrivateIdentifier:
                return target.kind === SyntaxKind.Identifier && getResolvedSymbol(source as Identifier) === getResolvedSymbol(target as Identifier) ||
                    (isVariableDeclaration(target) || isBindingElement(target)) &&
                        getExportSymbolOfValueSymbolIfExported(getResolvedSymbol(source as Identifier)) === getSymbolOfDeclaration(target as Declaration);
            // case SyntaxKind.ThisKeyword:
            //     return target.kind === SyntaxKind.ThisKeyword;
            case SyntaxKind.SuperKeyword:
                return target.kind === SyntaxKind.SuperKeyword;            
            case SyntaxKind.ParenthesizedExpression:
                return isMatchingReference((source as ParenthesizedExpression).expression, target);
            case SyntaxKind.PropertyAccessExpression:
            case SyntaxKind.ElementAccessExpression:
                Debug.fail("TODO - isMatchingReference");
                // const sourcePropertyName = getAccessedPropertyName(source as AccessExpression);
                // if (sourcePropertyName !== undefined) {
                //     const targetPropertyName = isAccessExpression(target) ? getAccessedPropertyName(target) : undefined;
                //     if (targetPropertyName !== undefined) {
                //         return targetPropertyName === sourcePropertyName && isMatchingReference((source as AccessExpression).expression, (target as AccessExpression).expression);
                //     }
                // }
                // if (isElementAccessExpression(source) && isElementAccessExpression(target) && isIdentifier(source.argumentExpression) && isIdentifier(target.argumentExpression)) {
                //     const symbol = getResolvedSymbol(source.argumentExpression);
                //     if (symbol === getResolvedSymbol(target.argumentExpression) && (isConstantVariable(symbol) || isParameterOrMutableLocalVariable(symbol) && !isSymbolAssigned(symbol))) {
                //         return isMatchingReference(source.expression, target.expression);
                //     }
                // }
                break;
            // case SyntaxKind.QualifiedName:
            //     return isAccessExpression(target) &&
            //         (source as QualifiedName).right.escapedText === getAccessedPropertyName(target) &&
            //         isMatchingReference((source as QualifiedName).left, target.expression);
            case SyntaxKind.BinaryExpression:
                return (isBinaryExpression(source) && source.operatorToken.kind === SyntaxKind.CommaToken && isMatchingReference(source.right, target));
        }
        return false;
    }

    function containsMatchingReference(source: Node, target: Node) {
        while (isAccessExpression(source)) {
            source = source.expression;
            if (isMatchingReference(source, target)) {
                return true;
            }
        }
        return false;
    }
    
    function isOrContainsMatchingReference(source: Node, target: Node) {
        return isMatchingReference(source, target) || containsMatchingReference(source, target);
    }

    function hasMatchingArgument(expression: CallExpression /*| NewExpression*/, reference: Node) {
        if (expression.arguments) {
            for (const argument of expression.arguments) {
                if (isOrContainsMatchingReference(reference, argument)) {
                    return true;
                }
            }
        }
        if (
            expression.expression.kind === SyntaxKind.PropertyAccessExpression &&
            isOrContainsMatchingReference(reference, (expression.expression as PropertyAccessExpression).expression)
        ) {
            return true;
        }
        return false;
    }

    function isUncalledFunctionReference(node: Node, symbol: Symbol) {
        if (symbol.flags & (SymbolFlags.Function | SymbolFlags.Method)) {
            const parent = findAncestor(node.parent, n => !isAccessExpression(n)) || node.parent;
            if (isCallLikeExpression(parent)) {
                return isCallOrNewExpression(parent) && isIdentifier(node) && hasMatchingArgument(parent, node);
            }
            return every(symbol.declarations, d => !isFunctionLike(d) || isDeprecatedDeclaration(d));
        }
        return true;
    }
    
    /**
     * This part of `checkIdentifier` is kept seperate from the rest, so `NodeCheckFlags` (and related diagnostics) can be lazily calculated
     * without calculating the flow type of the identifier.
     */
    function checkIdentifierCalculateNodeCheckFlags(node: Identifier, symbol: Symbol) {       
        const localOrExportSymbol = getExportSymbolOfValueSymbolIfExported(symbol);
        const targetSymbol = resolveAliasWithDeprecationCheck(localOrExportSymbol, node);
        if (isDeprecatedSymbol(targetSymbol) && isUncalledFunctionReference(node, targetSymbol) && targetSymbol.declarations) {
            addDeprecatedSuggestion(node, targetSymbol.declarations, node.text as string);
        }

        const declaration = localOrExportSymbol.valueDeclaration;
        if (declaration && localOrExportSymbol.flags & SymbolFlags.Class) {
            // When we downlevel classes we may emit some code outside of the class body. Due to the fact the
            // class name is double-bound, we must ensure we mark references to the class name so that we can
            // emit an alias to the class later.
            Debug.fail("TODO - checkIdentifierCalculateNodeCheckFlags");
            // if (isClassLike(declaration) && declaration.name !== node) {
            //     let container = getThisContainer(node, /*includeArrowFunctions*/ false, /*includeClassComputedPropertyName*/ false);
            //     while (container.kind !== SyntaxKind.SourceFile && container.parent !== declaration) {
            //         container = getThisContainer(container, /*includeArrowFunctions*/ false, /*includeClassComputedPropertyName*/ false);
            //     }

            //     if (container.kind !== SyntaxKind.SourceFile) {
            //         getNodeLinks(declaration).flags |= NodeCheckFlags.ContainsConstructorReference;
            //         getNodeLinks(container).flags |= NodeCheckFlags.ContainsConstructorReference;
            //         getNodeLinks(node).flags |= NodeCheckFlags.ConstructorReference;
            //     }
            // }
        }

        checkNestedBlockScopedBinding(node, symbol);
    }

    function isInsideFunctionOrInstancePropertyInitializer(node: Node, threshold: Node): boolean {
        return !!findAncestor(node, n =>
            n === threshold ? "quit" : isFunctionLike(n) || (
                n.parent && isPropertyDeclaration(n.parent) && n.parent.initializer === n
            ));
    }
    
    function getEnclosingIterationStatement(node: Node): Node | undefined {
        return findAncestor(node, n => (!n || nodeStartsNewLexicalEnvironment(n)) ? "quit" : isIterationStatement(n, /*lookInLabeledStatements*/ false));
    }
    
    function getPartOfForStatementContainingNode(node: Node, container: ForStatement) {
        return findAncestor(node, n => n === container ? "quit" : n === container.initializer || n === container.condition || n === container.incrementor || n === container.statement);
    }
    
    function checkNestedBlockScopedBinding(node: Identifier, symbol: Symbol): void {
        if (            
            (symbol.flags & (SymbolFlags.BlockScopedVariable | SymbolFlags.Class)) === 0 ||
            !symbol.valueDeclaration ||
            isSourceFile(symbol.valueDeclaration) ||
            symbol.valueDeclaration.parent.kind === SyntaxKind.CatchClause
        ) {
            return;
        }

        // 1. walk from the use site up to the declaration and check
        // if there is anything function like between declaration and use-site (is binding/class is captured in function).
        // 2. walk from the declaration up to the boundary of lexical environment and check
        // if there is an iteration statement in between declaration and boundary (is binding/class declared inside iteration statement)

        const container = getEnclosingBlockScopeContainer(symbol.valueDeclaration);
        const isCaptured = isInsideFunctionOrInstancePropertyInitializer(node, container);

        const enclosingIterationStatement = getEnclosingIterationStatement(container);
        if (enclosingIterationStatement) {
            if (isCaptured) {
                // mark iteration statement as containing block-scoped binding captured in some function
                let capturesBlockScopeBindingInLoopBody = true;
                if (isForStatement(container)) {
                    const varDeclList = getAncestor(symbol.valueDeclaration, SyntaxKind.VariableDeclarationList);
                    if (varDeclList && varDeclList.parent === container) {
                        const part = getPartOfForStatementContainingNode(node.parent, container);
                        if (part) {
                            const links = getNodeLinks(part);
                            links.flags |= NodeCheckFlags.ContainsCapturedBlockScopeBinding;

                            const capturedBindings = links.capturedBlockScopeBindings || (links.capturedBlockScopeBindings = []);
                            pushIfUnique(capturedBindings, symbol);

                            if (part === container.initializer) {
                                capturesBlockScopeBindingInLoopBody = false; // Initializer is outside of loop body
                            }
                        }
                    }
                }
                if (capturesBlockScopeBindingInLoopBody) {
                    getNodeLinks(enclosingIterationStatement).flags |= NodeCheckFlags.LoopWithCapturedBlockScopedBinding;
                }
            }

            // mark variables that are declared in loop initializer and reassigned inside the body of ForStatement.
            // if body of ForStatement will be converted to function then we'll need a extra machinery to propagate reassigned values back.
            if (isForStatement(container)) {
                const varDeclList = getAncestor(symbol.valueDeclaration, SyntaxKind.VariableDeclarationList);
                if (varDeclList && varDeclList.parent === container && isAssignedInBodyOfForStatement(node, container)) {
                    getNodeLinks(symbol.valueDeclaration).flags |= NodeCheckFlags.NeedsLoopOutParameter;
                }
            }

            // set 'declared inside loop' bit on the block-scoped binding
            getNodeLinks(symbol.valueDeclaration).flags |= NodeCheckFlags.BlockScopedBindingInLoop;
        }

        if (isCaptured) {
            getNodeLinks(symbol.valueDeclaration).flags |= NodeCheckFlags.CapturedBlockScopedBinding;
        }
    }

    function isAssignedInBodyOfForStatement(node: Identifier, container: ForStatement): boolean {
        // skip parenthesized nodes
        let current: Node = node;
        while (current.parent.kind === SyntaxKind.ParenthesizedExpression) {
            current = current.parent;
        }

        // check if node is used as LHS in some assignment expression
        let isAssigned = false;
        if (isAssignmentTarget(current)) {
            isAssigned = true;
        }
        else if ((current.parent.kind === SyntaxKind.PrefixUnaryExpression || current.parent.kind === SyntaxKind.PostfixUnaryExpression)) {
            const expr = current.parent as PrefixUnaryExpression | PostfixUnaryExpression;
            isAssigned = expr.operator === SyntaxKind.PlusPlusToken || expr.operator === SyntaxKind.MinusMinusToken;
        }

        if (!isAssigned) {
            return false;
        }

        // at this point we know that node is the target of assignment
        // now check that modification happens inside the statement part of the ForStatement
        return !!findAncestor(current, n => n === container ? "quit" : n === container.statement);
    }
    
    
    function isInPropertyInitializerOrClassStaticBlock(node: Node): boolean {
        return !!findAncestor(node, node => {
            switch (node.kind) {
                case SyntaxKind.PropertyDeclaration:
                    return true;
                case SyntaxKind.PropertyAssignment:
                //case SyntaxKind.MethodDeclaration:                
                //case SyntaxKind.SpreadAssignment:                
                    return false;
                case SyntaxKind.InlineClosureExpression:
                case SyntaxKind.ExpressionStatement:
                    return "quit";
                default:
                    return isExpressionNode(node) ? false : "quit";
            }
        });
    }

    function getTypeOfSymbol(symbol: Symbol, checkMode?: CheckMode): Type {
        console.warn("TODO - Implement me - getTypeOfSymbol");
        return errorType;
        // const checkFlags = getCheckFlags(symbol);
        // if (checkFlags & CheckFlags.DeferredType) {
        //     return getTypeOfSymbolWithDeferredType(symbol);
        // }
        // if (checkFlags & CheckFlags.Instantiated) {
        //     return getTypeOfInstantiatedSymbol(symbol);
        // }
        // if (checkFlags & CheckFlags.Mapped) {
        //     return getTypeOfMappedSymbol(symbol as MappedSymbol);
        // }
        // if (checkFlags & CheckFlags.ReverseMapped) {
        //     return getTypeOfReverseMappedSymbol(symbol as ReverseMappedSymbol);
        // }
        // if (symbol.flags & (SymbolFlags.Variable | SymbolFlags.Property)) {
        //     return getTypeOfVariableOrParameterOrProperty(symbol, checkMode);
        // }
        // if (symbol.flags & (SymbolFlags.Function | SymbolFlags.Method | SymbolFlags.Class | SymbolFlags.Enum | SymbolFlags.ValueModule)) {
        //     return getTypeOfFuncClassEnumModule(symbol);
        // }
        // if (symbol.flags & SymbolFlags.EnumMember) {
        //     return getTypeOfEnumMember(symbol);
        // }
        // if (symbol.flags & SymbolFlags.Accessor) {
        //     return getTypeOfAccessors(symbol);
        // }
        // if (symbol.flags & SymbolFlags.Alias) {
        //     return getTypeOfAlias(symbol);
        // }
        // return errorType;
    }

    function shouldMarkIdentifierAliasReferenced(node: Identifier): boolean {
        const parent = node.parent;
        if (parent) {
            // A property access expression LHS? checkPropertyAccessExpression will handle that.
            if (isPropertyAccessExpression(parent) && parent.expression === node) {
                return false;
            }
            // Next two check for an identifier inside a type only export.
            // if (isExportSpecifier(parent) && parent.isTypeOnly) {
            //     return false;
            // }
            const greatGrandparent = parent.parent?.parent;
            // if (greatGrandparent && isExportDeclaration(greatGrandparent) && greatGrandparent.isTypeOnly) {
            //     return false;
            // }
        }
        return true;
    }

    /**
     * This function marks all the imports the given location refers to as `.referenced` in `NodeLinks` (transitively through local import aliases).
     * (This corresponds to not getting elided in JS emit.)
     * It can be called on *most* nodes in the AST with `ReferenceHint.Unspecified` and will filter its inputs, but care should be taken to avoid calling it on the RHS of an `import =` or specifiers in a `import {} from "..."`,
     * unless you *really* want to *definitely* mark those as referenced.
     * These shouldn't be directly marked, and should only get marked transitively by the internals of this function.
     *
     * @param location The location to mark js import refernces for
     * @param hint The kind of reference `location` has already been checked to be
     * @param propSymbol The optional symbol of the property we're looking up - this is used for property accesses when `const enum`s do not count as references (no `isolatedModules`, no `preserveConstEnums` + export). It will be calculated if not provided.
     * @param parentType The optional type of the parent of the LHS of the property access - this will be recalculated if not provided (but is costly).
     */
    function markLinkedReferences(location: PropertyAccessExpression, hint: ReferenceHint.Property, propSymbol: Symbol | undefined, parentType: Type): void;
    function markLinkedReferences(location: Identifier, hint: ReferenceHint.Identifier): void;
    //function markLinkedReferences(location: ExportAssignment, hint: ReferenceHint.ExportAssignment): void;    
    function markLinkedReferences(location: FunctionLikeDeclaration /*| MethodSignature*/, hint: ReferenceHint.AsyncFunction): void;
    // function markLinkedReferences(location: ImportEqualsDeclaration, hint: ReferenceHint.ExportImportEquals): void;        
    function markLinkedReferences(location: Node, hint: ReferenceHint.Unspecified, propSymbol?: Symbol, parentType?: Type): void;
    function markLinkedReferences(location: Node, hint: ReferenceHint, propSymbol?: Symbol, parentType?: Type) {        
        if (location.flags & NodeFlags.Ambient) {
            return; // References within types and declaration files are never going to contribute to retaining a JS import
        }
        Debug.fail("Implement me - markLinkedReferences");
        // switch (hint) {
        //     case ReferenceHint.Identifier:
        //         return markIdentifierAliasReferenced(location as Identifier);
        //     case ReferenceHint.Property:
        //         return markPropertyAliasReferenced(location as PropertyAccessExpression | QualifiedName, propSymbol, parentType);
        //     case ReferenceHint.ExportAssignment:
        //         return markExportAssignmentAliasReferenced(location as ExportAssignment);
        //     case ReferenceHint.Jsx:
        //         return markJsxAliasReferenced(location as JsxOpeningLikeElement | JsxOpeningFragment);
        //     case ReferenceHint.AsyncFunction:
        //         return markAsyncFunctionAliasReferenced(location as FunctionLikeDeclaration | MethodSignature);
        //     case ReferenceHint.ExportImportEquals:
        //         return markImportEqualsAliasReferenced(location as ImportEqualsDeclaration);
        //     case ReferenceHint.ExportSpecifier:
        //         return markExportSpecifierAliasReferenced(location as ExportSpecifier);
        //     case ReferenceHint.Decorator:
        //         return markDecoratorAliasReferenced(location as HasDecorators);
        //     case ReferenceHint.Unspecified: {
        //         // Identifiers in expression contexts are emitted, so we need to follow their referenced aliases and mark them as used
        //         // Some non-expression identifiers are also treated as expression identifiers for this purpose, eg, `a` in `b = {a}` or `q` in `import r = q`
        //         // This is the exception, rather than the rule - most non-expression identifiers are declaration names.
        //         if (isIdentifier(location) && (isExpressionNode(location) || isShorthandPropertyAssignment(location.parent) || (isImportEqualsDeclaration(location.parent) && location.parent.moduleReference === location)) && shouldMarkIdentifierAliasReferenced(location)) {
        //             if (isPropertyAccessOrQualifiedName(location.parent)) {
        //                 const left = isPropertyAccessExpression(location.parent) ? location.parent.expression : location.parent.left;
        //                 if (left !== location) return; // Only mark the LHS (the RHS is a property lookup)
        //             }
        //             markIdentifierAliasReferenced(location);
        //             return;
        //         }
        //         if (isPropertyAccessOrQualifiedName(location)) {
        //             let topProp: Node | undefined = location;
        //             while (isPropertyAccessOrQualifiedName(topProp)) {
        //                 if (isPartOfTypeNode(topProp)) return;
        //                 topProp = topProp.parent;
        //             }
        //             return markPropertyAliasReferenced(location);
        //         }
        //         if (isExportAssignment(location)) {
        //             return markExportAssignmentAliasReferenced(location);
        //         }
        //         if (isJsxOpeningLikeElement(location) || isJsxOpeningFragment(location)) {
        //             return markJsxAliasReferenced(location);
        //         }
        //         if (isImportEqualsDeclaration(location)) {
        //             if (isInternalModuleImportEqualsDeclaration(location) || checkExternalImportOrExportDeclaration(location)) {
        //                 return markImportEqualsAliasReferenced(location);
        //             }
        //             return;
        //         }
        //         if (isExportSpecifier(location)) {
        //             return markExportSpecifierAliasReferenced(location);
        //         }
        //         if (isFunctionLikeDeclaration(location) || isMethodSignature(location)) {
        //             markAsyncFunctionAliasReferenced(location);
        //             // Might be decorated, fall through to decorator final case
        //         }
        //         if (!compilerOptions.emitDecoratorMetadata) {
        //             return;
        //         }
        //         if (!canHaveDecorators(location) || !hasDecorators(location) || !location.modifiers || !nodeCanBeDecorated(legacyDecorators, location, location.parent, location.parent.parent)) {
        //             return;
        //         }

        //         return markDecoratorAliasReferenced(location);
        //     }
        //     default:
        //         Debug.assertNever(hint, `Unhandled reference hint: ${hint}`);
        // }
    }
    
    function getNarrowedTypeOfSymbol(symbol: Symbol, location: Identifier, checkMode?: CheckMode) {
        const type = getTypeOfSymbol(symbol, checkMode);
        const declaration = symbol.valueDeclaration;
        console.warn("TODO - Implement me - getNarrowedTypeOfSymbol");
        // if (declaration) {
        //     // If we have a non-rest binding element with no initializer declared as a const variable or a const-like
        //     // parameter (a parameter for which there are no assignments in the function body), and if the parent type
        //     // for the destructuring is a union type, one or more of the binding elements may represent discriminant
        //     // properties, and we want the effects of conditional checks on such discriminants to affect the types of
        //     // other binding elements from the same destructuring. Consider:
        //     //
        //     //   type Action =
        //     //       | { kind: 'A', payload: number }
        //     //       | { kind: 'B', payload: string };
        //     //
        //     //   function f({ kind, payload }: Action) {
        //     //       if (kind === 'A') {
        //     //           payload.toFixed();
        //     //       }
        //     //       if (kind === 'B') {
        //     //           payload.toUpperCase();
        //     //       }
        //     //   }
        //     //
        //     // Above, we want the conditional checks on 'kind' to affect the type of 'payload'. To facilitate this, we use
        //     // the binding pattern AST instance for '{ kind, payload }' as a pseudo-reference and narrow this reference
        //     // as if it occurred in the specified location. We then recompute the narrowed binding element type by
        //     // destructuring from the narrowed parent type.
        //     if (isBindingElement(declaration) && !declaration.initializer && !declaration.dotDotDotToken && declaration.parent.elements.length >= 2) {
        //         const parent = declaration.parent.parent;
        //         const rootDeclaration = getRootDeclaration(parent);
        //         if (rootDeclaration.kind === SyntaxKind.VariableDeclaration && getCombinedNodeFlagsCached(rootDeclaration) & NodeFlags.Constant || rootDeclaration.kind === SyntaxKind.Parameter) {
        //             const links = getNodeLinks(parent);
        //             if (!(links.flags & NodeCheckFlags.InCheckIdentifier)) {
        //                 links.flags |= NodeCheckFlags.InCheckIdentifier;
        //                 const parentType = getTypeForBindingElementParent(parent, CheckMode.Normal);
        //                 const parentTypeConstraint = parentType && mapType(parentType, getBaseConstraintOrType);
        //                 links.flags &= ~NodeCheckFlags.InCheckIdentifier;
        //                 if (parentTypeConstraint && parentTypeConstraint.flags & TypeFlags.Union && !(rootDeclaration.kind === SyntaxKind.Parameter && isSomeSymbolAssigned(rootDeclaration))) {
        //                     const pattern = declaration.parent;
        //                     const narrowedType = getFlowTypeOfReference(pattern, parentTypeConstraint, parentTypeConstraint, /*flowContainer*/ undefined, location.flowNode);
        //                     if (narrowedType.flags & TypeFlags.Never) {
        //                         return neverType;
        //                     }
        //                     // Destructurings are validated against the parent type elsewhere. Here we disable tuple bounds
        //                     // checks because the narrowed type may have lower arity than the full parent type. For example,
        //                     // for the declaration [x, y]: [1, 2] | [3], we may have narrowed the parent type to just [3].
        //                     return getBindingElementTypeFromParentType(declaration, narrowedType, /*noTupleBoundsCheck*/ true);
        //                 }
        //             }
        //         }
        //     }
        //     // If we have a const-like parameter with no type annotation or initializer, and if the parameter is contextually
        //     // typed by a signature with a single rest parameter of a union of tuple types, one or more of the parameters may
        //     // represent discriminant tuple elements, and we want the effects of conditional checks on such discriminants to
        //     // affect the types of other parameters in the same parameter list. Consider:
        //     //
        //     //   type Action = [kind: 'A', payload: number] | [kind: 'B', payload: string];
        //     //
        //     //   const f: (...args: Action) => void = (kind, payload) => {
        //     //       if (kind === 'A') {
        //     //           payload.toFixed();
        //     //       }
        //     //       if (kind === 'B') {
        //     //           payload.toUpperCase();
        //     //       }
        //     //   }
        //     //
        //     // Above, we want the conditional checks on 'kind' to affect the type of 'payload'. To facilitate this, we use
        //     // the arrow function AST node for '(kind, payload) => ...' as a pseudo-reference and narrow this reference as
        //     // if it occurred in the specified location. We then recompute the narrowed parameter type by indexing into the
        //     // narrowed tuple type.
        //     if (isParameter(declaration) && !declaration.type && !declaration.initializer && !declaration.dotDotDotToken) {
        //         const func = declaration.parent;
        //         if (func.parameters.length >= 2 && isContextSensitiveFunctionOrObjectLiteralMethod(func)) {
        //             const contextualSignature = getContextualSignature(func);
        //             if (contextualSignature && contextualSignature.parameters.length === 1 && signatureHasRestParameter(contextualSignature)) {
        //                 const restType = getReducedApparentType(instantiateType(getTypeOfSymbol(contextualSignature.parameters[0]), getInferenceContext(func)?.nonFixingMapper));
        //                 if (restType.flags & TypeFlags.Union && everyType(restType, isTupleType) && !some(func.parameters, isSomeSymbolAssigned)) {
        //                     const narrowedType = getFlowTypeOfReference(func, restType, restType, /*flowContainer*/ undefined, location.flowNode);
        //                     const index = func.parameters.indexOf(declaration) - (getThisParameter(func) ? 1 : 0);
        //                     return getIndexedAccessType(narrowedType, getNumberLiteralType(index));
        //                 }
        //             }
        //         }
        //     }
        // }
        return type;
    }

    function getBaseTypeOfLiteralType(type: Type): Type {
        return type.flags & (TypeFlags.StringLiteral) ? stringType :
            type.flags & TypeFlags.IntLiteral ? intType :
            type.flags & TypeFlags.FloatLiteral ? floatType :
            //type.flags & TypeFlags.BooleanLiteral ? booleanType :
            type.flags & TypeFlags.Union ? getBaseTypeOfLiteralTypeUnion(type as UnionType) :
            type;
    }

    function getTypeId(type: Type): TypeId {
        return type.id;
    }

    function getCachedType(key: string | undefined) {
        return key ? cachedTypes.get(key) : undefined;
    }

    function setCachedType(key: string | undefined, type: Type) {
        if (key) cachedTypes.set(key, type);
        return type;
    }
    
    function getTypeListId(types: readonly Type[] | undefined) {
        let result = "";
        if (types) {
            const length = types.length;
            let i = 0;
            while (i < length) {
                const startId = types[i].id;
                let count = 1;
                while (i + count < length && types[i + count].id === startId + count) {
                    count++;
                }
                if (result.length) {
                    result += ",";
                }
                result += startId;
                if (count > 1) {
                    result += ":" + count;
                }
                i += count;
            }
        }
        return result;
    }

    function getAliasId(aliasSymbol: Symbol | undefined, aliasTypeArguments: readonly Type[] | undefined) {
        return aliasSymbol ? `@${getSymbolId(aliasSymbol)}` + (aliasTypeArguments ? `:${getTypeListId(aliasTypeArguments)}` : "") : "";
    }

    // We sort and deduplicate the constituent types based on object identity. If the subtypeReduction
    // flag is specified we also reduce the constituent type set to only include types that aren't subtypes
    // of other types. Subtype reduction is expensive for large union types and is possible only when union
    // types are known not to circularly reference themselves (as is the case with union types created by
    // expression constructs such as array literals and the || and ?: operators). Named types can
    // circularly reference themselves and therefore cannot be subtype reduced during their declaration.
    // For example, "type Item = string | (() => Item" is a named type that circularly references itself.
    function getUnionType(types: readonly Type[], unionReduction: UnionReduction = UnionReduction.Literal, aliasSymbol?: Symbol, aliasTypeArguments?: readonly Type[], origin?: Type): Type {
        if (types.length === 0) {
            return neverType;
        }
        if (types.length === 1) {
            return types[0];
        }
        // We optimize for the common case of unioning a union type with some other type (such as `undefined`).
        if (types.length === 2 && !origin && (types[0].flags & TypeFlags.Union || types[1].flags & TypeFlags.Union)) {
            const infix = unionReduction === UnionReduction.None ? "N" : unionReduction === UnionReduction.Subtype ? "S" : "L";
            const index = types[0].id < types[1].id ? 0 : 1;
            const id = types[index].id + infix + types[1 - index].id + getAliasId(aliasSymbol, aliasTypeArguments);
            let type = unionOfUnionTypes.get(id);
            if (!type) {
                type = getUnionTypeWorker(types, unionReduction, aliasSymbol, aliasTypeArguments, /*origin*/ undefined);
                unionOfUnionTypes.set(id, type);
            }
            return type;
        }
        return getUnionTypeWorker(types, unionReduction, aliasSymbol, aliasTypeArguments, origin);
    }
    
    function getUnionTypeWorker(types: readonly Type[], unionReduction: UnionReduction, aliasSymbol: Symbol | undefined, aliasTypeArguments: readonly Type[] | undefined, origin: Type | undefined): Type {
        console.warn("Implement me - getUnionTypeWorker");
        return errorType;
        // let typeSet: Type[] | undefined = [];
        // const includes = addTypesToUnion(typeSet, 0 as TypeFlags, types);
        // if (unionReduction !== UnionReduction.None) {
        //     if (includes & TypeFlags.AnyOrUnknown) {
        //         return includes & TypeFlags.Any ?
        //             includes & TypeFlags.IncludesWildcard ? wildcardType :
        //                 includes & TypeFlags.IncludesError ? errorType : anyType :
        //             unknownType;
        //     }
        //     if (includes & TypeFlags.Undefined) {
        //         // If type set contains both undefinedType and missingType, remove missingType
        //         if (typeSet.length >= 2 && typeSet[0] === undefinedType && typeSet[1] === missingType) {
        //             orderedRemoveItemAt(typeSet, 1);
        //         }
        //     }
        //     if (includes & (TypeFlags.Enum | TypeFlags.Literal | TypeFlags.UniqueESSymbol | TypeFlags.TemplateLiteral | TypeFlags.StringMapping) || includes & TypeFlags.Void && includes & TypeFlags.Undefined) {
        //         removeRedundantLiteralTypes(typeSet, includes, !!(unionReduction & UnionReduction.Subtype));
        //     }
        //     if (includes & TypeFlags.StringLiteral && includes & (TypeFlags.TemplateLiteral | TypeFlags.StringMapping)) {
        //         removeStringLiteralsMatchedByTemplateLiterals(typeSet);
        //     }
        //     if (includes & TypeFlags.IncludesConstrainedTypeVariable) {
        //         removeConstrainedTypeVariables(typeSet);
        //     }
        //     if (unionReduction === UnionReduction.Subtype) {
        //         typeSet = removeSubtypes(typeSet, !!(includes & TypeFlags.Object));
        //         if (!typeSet) {
        //             return errorType;
        //         }
        //     }
        //     if (typeSet.length === 0) {
        //         return includes & TypeFlags.Null ? includes & TypeFlags.IncludesNonWideningType ? nullType : nullWideningType :
        //             includes & TypeFlags.Undefined ? includes & TypeFlags.IncludesNonWideningType ? undefinedType : undefinedWideningType :
        //             neverType;
        //     }
        // }
        // if (!origin && includes & TypeFlags.Union) {
        //     const namedUnions: Type[] = [];
        //     addNamedUnions(namedUnions, types);
        //     const reducedTypes: Type[] = [];
        //     for (const t of typeSet) {
        //         if (!some(namedUnions, union => containsType((union as UnionType).types, t))) {
        //             reducedTypes.push(t);
        //         }
        //     }
        //     if (!aliasSymbol && namedUnions.length === 1 && reducedTypes.length === 0) {
        //         return namedUnions[0];
        //     }
        //     // We create a denormalized origin type only when the union was created from one or more named unions
        //     // (unions with alias symbols or origins) and when there is no overlap between those named unions.
        //     const namedTypesCount = reduceLeft(namedUnions, (sum, union) => sum + (union as UnionType).types.length, 0);
        //     if (namedTypesCount + reducedTypes.length === typeSet.length) {
        //         for (const t of namedUnions) {
        //             insertType(reducedTypes, t);
        //         }
        //         origin = createOriginUnionOrIntersectionType(TypeFlags.Union, reducedTypes);
        //     }
        // }
        // const objectFlags = (includes & TypeFlags.NotPrimitiveUnion ? 0 : ObjectFlags.PrimitiveUnion) |
        //     (includes & TypeFlags.Intersection ? ObjectFlags.ContainsIntersections : 0);
        // return getUnionTypeFromSortedList(typeSet, objectFlags, aliasSymbol, aliasTypeArguments, origin);
    }

    // Apply a mapping function to a type and return the resulting type. If the source type
    // is a union type, the mapping function is applied to each constituent type and a union
    // of the resulting types is returned.
    function mapType(type: Type, mapper: (t: Type) => Type, noReductions?: boolean): Type;
    function mapType(type: Type, mapper: (t: Type) => Type | undefined, noReductions?: boolean): Type | undefined;
    function mapType(type: Type, mapper: (t: Type) => Type | undefined, noReductions?: boolean): Type | undefined {
        if (type.flags & TypeFlags.Never) {
            return type;
        }
        if (!(type.flags & TypeFlags.Union)) {
            return mapper(type);
        }
        const origin = (type as UnionType).origin;
        const types = origin && origin.flags & TypeFlags.Union ? (origin as UnionType).types : (type as UnionType).types;
        let mappedTypes: Type[] | undefined;
        let changed = false;
        for (const t of types) {
            const mapped = t.flags & TypeFlags.Union ? mapType(t, mapper, noReductions) : mapper(t);
            changed ||= t !== mapped;
            if (mapped) {
                if (!mappedTypes) {
                    mappedTypes = [mapped];
                }
                else {
                    mappedTypes.push(mapped);
                }
            }
        }
        return changed ? mappedTypes && getUnionType(mappedTypes, noReductions ? UnionReduction.None : UnionReduction.Literal) : type;
    }

    function getBaseTypeOfLiteralTypeUnion(type: UnionType) {
        const key = `B${getTypeId(type)}`;
        return getCachedType(key) ?? setCachedType(key, mapType(type, getBaseTypeOfLiteralType));
    }

    function getNarrowableTypeForReference(type: Type, reference: Node, checkMode?: CheckMode) {        
        // not used in lpc
        return type;
    }

    function getControlFlowContainer(node: Node): Node {
        return findAncestor(node.parent, node =>
            isFunctionLike(node) && !getImmediatelyInvokedFunctionExpression(node) ||            
            node.kind === SyntaxKind.SourceFile ||
            node.kind === SyntaxKind.PropertyDeclaration)!;
    }

    function checkIdentifier(node: Identifier, checkMode: CheckMode | undefined): Type {
        // if (isThisInTypeQuery(node)) {
        //     return checkThisExpression(node);
        // }

        const symbol = getResolvedSymbol(node);
        if (symbol === unknownSymbol) {
            return errorType;
        }

        checkIdentifierCalculateNodeCheckFlags(node, symbol);

        if (symbol === argumentsSymbol) {
            if (isInPropertyInitializerOrClassStaticBlock(node)) {
                return errorType;
            }
            return getTypeOfSymbol(symbol);
        }

        if (shouldMarkIdentifierAliasReferenced(node)) {
            markLinkedReferences(node, ReferenceHint.Identifier);
        }

        const localOrExportSymbol = getExportSymbolOfValueSymbolIfExported(symbol);
        let declaration = localOrExportSymbol.valueDeclaration;

        let type = getNarrowedTypeOfSymbol(localOrExportSymbol, node, checkMode);
        const assignmentKind = getAssignmentTargetKind(node);

        if (assignmentKind) {
            if (
                !(localOrExportSymbol.flags & SymbolFlags.Variable)                
            ) {
                const assignmentError = localOrExportSymbol.flags & SymbolFlags.Function ? Diagnostics.Cannot_assign_to_0_because_it_is_a_function
                    //: localOrExportSymbol.flags & SymbolFlags.Alias ? Diagnostics.Cannot_assign_to_0_because_it_is_an_import
                    : Diagnostics.Cannot_assign_to_0_because_it_is_not_a_variable;

                error(node, assignmentError, symbolToString(symbol));
                return errorType;
            }
            // no readonly symbols in LPC
            // if (isReadonlySymbol(localOrExportSymbol)) {
            //     if (localOrExportSymbol.flags & SymbolFlags.Variable) {
            //         error(node, Diagnostics.Cannot_assign_to_0_because_it_is_a_constant, symbolToString(symbol));
            //     }
            //     else {
            //         error(node, Diagnostics.Cannot_assign_to_0_because_it_is_a_read_only_property, symbolToString(symbol));
            //     }
            //     return errorType;
            // }
        }

        const isAlias = localOrExportSymbol.flags & SymbolFlags.Alias;

        // We only narrow variables and parameters occurring in a non-assignment position. For all other
        // entities we simply return the declared type.
        if (localOrExportSymbol.flags & SymbolFlags.Variable) {
            if (assignmentKind === AssignmentKind.Definite) {
                return isInCompoundLikeAssignment(node) ? getBaseTypeOfLiteralType(type) : type;
            }
        }
        else if (isAlias) {
            declaration = getDeclarationOfAliasSymbol(symbol);
        }
        else {
            return type;
        }

        if (!declaration) {
            return type;
        }

        type = getNarrowableTypeForReference(type, node, checkMode);

        // The declaration container is the innermost function that encloses the declaration of the variable
        // or parameter. The flow container is the innermost function starting with which we analyze the control
        // flow graph to determine the control flow based type.
        const isParameter = getRootDeclaration(declaration).kind === SyntaxKind.Parameter;
        const declarationContainer = getControlFlowContainer(declaration);
        let flowContainer = getControlFlowContainer(node);
        const isOuterVariable = flowContainer !== declarationContainer;        
        const isModuleExports = symbol.flags & SymbolFlags.ModuleExports;
        const typeIsAutomatic = type === autoType || type === autoArrayType;        
        // When the control flow originates in a function expression, arrow function, method, or accessor, and
        // we are referencing a closed-over const variable or parameter or mutable local variable past its last
        // assignment, we extend the origin of the control flow analysis to include the immediately enclosing
        // control flow container.
        while (
            flowContainer !== declarationContainer && (
                flowContainer.kind === SyntaxKind.FunctionExpression ||
                flowContainer.kind === SyntaxKind.InlineClosureExpression 
                //|| isObjectLiteralOrClassExpressionMethodOrAccessor(flowContainer)
            ) && (                
                isParameterOrMutableLocalVariable(localOrExportSymbol) && isPastLastAssignment(localOrExportSymbol, node)
            )
        ) {
            flowContainer = getControlFlowContainer(flowContainer);
        }
        // We only look for uninitialized variables in strict null checking mode, and only when we can analyze
        // the entire control flow graph from the variable's declaration (i.e. when the flow container and
        // declaration container are the same).
        const assumeInitialized = isParameter || isAlias || isOuterVariable || isModuleExports || isSameScopedBindingElement(node, declaration) ||
            type !== autoType && type !== autoArrayType && (!strictNullChecks || (type.flags & (TypeFlags.AnyOrUnknown | TypeFlags.Void)) !== 0) ||                        
            declaration.flags & NodeFlags.Ambient;
        const initialType = undefinedType;
            // isAutomaticTypeInNonNull ? undefinedType :
            // assumeInitialized ? (isParameter ? removeOptionalityFromDeclaredType(type, declaration as VariableLikeDeclaration) : type) :
            // typeIsAutomatic ? undefinedType : getOptionalType(type);
        const flowType = getFlowTypeOfReference(node, type, initialType, flowContainer);
        // A variable is considered uninitialized when it is possible to analyze the entire control flow graph
        // from declaration to use, and when the variable's declared type doesn't include undefined but the
        // control flow based type does include undefined.
        if (!isEvolvingArrayOperationTarget(node) && (type === autoType || type === autoArrayType)) {
            if (flowType === autoType || flowType === autoArrayType) {                
                return convertAutoToAny(flowType);
            }
        }
        else if (!assumeInitialized && !containsUndefinedType(type) && containsUndefinedType(flowType)) {
            error(node, Diagnostics.Variable_0_is_used_before_being_assigned, symbolToString(symbol));
            // Return the declared type to reduce follow-on errors
            return type;
        }
        return assignmentKind ? getBaseTypeOfLiteralType(flowType) : flowType;
    }

    function containsUndefinedType(type: Type) {
        return !!((type.flags & TypeFlags.Union ? (type as UnionType).types[0] : type).flags & TypeFlags.Undefined);
    }

    function convertAutoToAny(type: Type) {
        return type === autoType ? anyType : type === autoArrayType ? anyArrayType : type;
    }

    function isSameScopedBindingElement(node: Identifier, declaration: Declaration) {
        if (isBindingElement(declaration)) {
            const bindingElement = findAncestor(node, isBindingElement);
            return bindingElement && getRootDeclaration(bindingElement) === getRootDeclaration(declaration);
        }
    }

    function getReferenceRoot(node: Node): Node {
        const { parent } = node;
        return parent.kind === SyntaxKind.ParenthesizedExpression ||
                parent.kind === SyntaxKind.BinaryExpression && (parent as BinaryExpression).operatorToken.kind === SyntaxKind.EqualsToken && (parent as BinaryExpression).left === node ||
                parent.kind === SyntaxKind.BinaryExpression && (parent as BinaryExpression).operatorToken.kind === SyntaxKind.CommaToken && (parent as BinaryExpression).right === node ?
            getReferenceRoot(parent) : node;
    }

    function isFreshLiteralType(type: Type) {
        return !!(type.flags & TypeFlags.Freshable) && (type as LiteralType).freshType === type;
    }
    
    type ErrorReporter = (message: DiagnosticMessage, ...args: DiagnosticArguments) => void;

    function isSimpleTypeRelatedTo(source: Type, target: Type, relation: Map<string, RelationComparisonResult>, errorReporter?: ErrorReporter) {
        const s = source.flags;
        const t = target.flags;
        if (t & TypeFlags.Any || s & TypeFlags.Never) return true;
        if (t & TypeFlags.Unknown && !(relation === strictSubtypeRelation && s & TypeFlags.Any)) return true;
        if (t & TypeFlags.Never) return false;
        if (s & TypeFlags.StringLike && t & TypeFlags.String) return true;
        // if (
        //     s & TypeFlags.StringLiteral && s & TypeFlags.EnumLiteral &&
        //     t & TypeFlags.StringLiteral && !(t & TypeFlags.EnumLiteral) &&
        //     (source as StringLiteralType).value === (target as StringLiteralType).value
        // ) return true;
        if (s & TypeFlags.NumberLike && t & TypeFlags.Number) return true;                
        if (s & TypeFlags.BooleanLike && t & TypeFlags.Boolean) return true;
        if (s & TypeFlags.ESSymbolLike && t & TypeFlags.ESSymbol) return true;                
        // In non-strictNullChecks mode, `undefined` and `null` are assignable to anything except `never`.
        // Since unions and intersections may reduce to `never`, we exclude them here.
        if (s & TypeFlags.Undefined && (!strictNullChecks && !(t & TypeFlags.UnionOrIntersection) || t & (TypeFlags.Undefined | TypeFlags.Void))) return true;
        if (s & TypeFlags.Null && (!strictNullChecks && !(t & TypeFlags.UnionOrIntersection) || t & TypeFlags.Null)) return true;
        if (s & TypeFlags.Object && t & TypeFlags.NonPrimitive && !(relation === strictSubtypeRelation && isEmptyAnonymousObjectType(source) && !(getObjectFlags(source) & ObjectFlags.FreshLiteral))) return true;
        if (relation === assignableRelation || relation === comparableRelation) {
            if (s & TypeFlags.Any) return true;
            // Type number is assignable to any computed numeric enum type or any numeric enum literal type, and
            // a numeric literal type is assignable any computed numeric enum type or any numeric enum literal type
            // with a matching value. These rules exist such that enums can be used for bit-flag purposes.            
            // Anything is assignable to a union containing undefined, null, and {}
            if (isUnknownLikeUnionType(target)) return true;
        }
        return false;
    }

    /**
     * Gets a SymbolTable containing both the early- and late-bound members of a symbol.
     *
     * For a description of late-binding, see `lateBindMember`.
     */
    function getMembersOfSymbol(symbol: Symbol) {
        return symbol.flags & SymbolFlags.LateBindingContainer
            ? getResolvedMembersOrExportsOfSymbol(symbol)
            : symbol.members || emptySymbols;
    }

    
    function getResolvedMembersOrExportsOfSymbol(symbol: Symbol): Map<string, Symbol> {
        const links = getSymbolLinks(symbol);
        console.warn("TODO - Implement me - getResolvedMembersOrExportsOfSymbol");
        return links.resolvedMembers;

        // if (!links[resolutionKind]) {
        //     const isStatic = resolutionKind === MembersOrExportsResolutionKind.resolvedExports;
        //     const earlySymbols = !isStatic ? symbol.members :
        //         symbol.flags & SymbolFlags.Module ? getExportsOfModuleWorker(symbol).exports :
        //         symbol.exports;

        //     // In the event we recursively resolve the members/exports of the symbol, we
        //     // set the initial value of resolvedMembers/resolvedExports to the early-bound
        //     // members/exports of the symbol.
        //     links[resolutionKind] = earlySymbols || emptySymbols;

        //     // fill in any as-yet-unresolved late-bound members.
        //     const lateSymbols = createSymbolTable() as Map<__String, TransientSymbol>;
        //     for (const decl of symbol.declarations || emptyArray) {
        //         const members = getMembersOfDeclaration(decl);
        //         if (members) {
        //             for (const member of members) {
        //                 if (isStatic === hasStaticModifier(member)) {
        //                     if (hasLateBindableName(member)) {
        //                         lateBindMember(symbol, earlySymbols, lateSymbols, member);
        //                     }
        //                 }
        //             }
        //         }
        //     }
        //     const assignments = getFunctionExpressionParentSymbolOrSymbol(symbol).assignmentDeclarationMembers;

        //     if (assignments) {
        //         const decls = arrayFrom(assignments.values());
        //         for (const member of decls) {
        //             const assignmentKind = getAssignmentDeclarationKind(member as BinaryExpression | CallExpression);
        //             const isInstanceMember = assignmentKind === AssignmentDeclarationKind.PrototypeProperty
        //                 || isBinaryExpression(member) && isPossiblyAliasedThisProperty(member, assignmentKind)
        //                 || assignmentKind === AssignmentDeclarationKind.ObjectDefinePrototypeProperty
        //                 || assignmentKind === AssignmentDeclarationKind.Prototype; // A straight `Prototype` assignment probably can never have a computed name
        //             if (isStatic === !isInstanceMember) {
        //                 if (hasLateBindableName(member)) {
        //                     lateBindMember(symbol, earlySymbols, lateSymbols, member);
        //                 }
        //             }
        //         }
        //     }

        //     let resolved = combineSymbolTables(earlySymbols, lateSymbols);
        //     if (symbol.flags & SymbolFlags.Transient && links.cjsExportMerged && symbol.declarations) {
        //         for (const decl of symbol.declarations) {
        //             const original = getSymbolLinks(decl.symbol)[resolutionKind];
        //             if (!resolved) {
        //                 resolved = original;
        //                 continue;
        //             }
        //             if (!original) continue;
        //             original.forEach((s, name) => {
        //                 const existing = resolved!.get(name);
        //                 if (!existing) resolved!.set(name, s);
        //                 else if (existing === s) return;
        //                 else resolved!.set(name, mergeSymbol(existing, s));
        //             });
        //         }
        //     }
        //     links[resolutionKind] = resolved || emptySymbols;
        // }

        // return links[resolutionKind];
    }

    function isEmptyAnonymousObjectType(type: Type) {
        return !!(getObjectFlags(type) & ObjectFlags.Anonymous && (
            (type as ResolvedType).members && isEmptyResolvedType(type as ResolvedType) ||
            type.symbol && type.symbol.flags & SymbolFlags.TypeLiteral && getMembersOfSymbol(type.symbol).size === 0
        ));
    }
    
    function isEmptyResolvedType(t: ResolvedType) {
        return t !== anyFunctionType &&
            t.properties.length === 0 &&
            t.callSignatures.length === 0 &&
            t.constructSignatures.length === 0 &&
            t.indexInfos.length === 0;
    }

    function isUnknownLikeUnionType(type: Type) {
        if (strictNullChecks && type.flags & TypeFlags.Union) {
            if (!((type as UnionType).objectFlags & ObjectFlags.IsUnknownLikeUnionComputed)) {
                const types = (type as UnionType).types;
                (type as UnionType).objectFlags |= ObjectFlags.IsUnknownLikeUnionComputed | (types.length >= 3 && types[0].flags & TypeFlags.Undefined &&
                        types[1].flags & TypeFlags.Null && some(types, isEmptyAnonymousObjectType) ? ObjectFlags.IsUnknownLikeUnion : 0);
            }
            return !!((type as UnionType).objectFlags & ObjectFlags.IsUnknownLikeUnion);
        }
        return false;
    }

    function isTypeRelatedTo(source: Type, target: Type, relation: Map<string, RelationComparisonResult>) {
        if (isFreshLiteralType(source)) {
            source = (source as FreshableType).regularType;
        }
        if (isFreshLiteralType(target)) {
            target = (target as FreshableType).regularType;
        }
        if (source === target) {
            return true;
        }
        if (relation !== identityRelation) {
            if (relation === comparableRelation && !(target.flags & TypeFlags.Never) && isSimpleTypeRelatedTo(target, source, relation) || isSimpleTypeRelatedTo(source, target, relation)) {
                return true;
            }
        }
        else if (!((source.flags | target.flags) & (TypeFlags.UnionOrIntersection | TypeFlags.IndexedAccess | TypeFlags.Conditional | TypeFlags.Substitution))) {
            // We have excluded types that may simplify to other forms, so types must have identical flags
            if (source.flags !== target.flags) return false;
            if (source.flags & TypeFlags.Singleton) return true;
        }
        if (source.flags & TypeFlags.Object && target.flags & TypeFlags.Object) {
            const related = relation.get(getRelationKey(source, target, IntersectionState.None, relation, /*ignoreConstraints*/ false));
            if (related !== undefined) {
                return !!(related & RelationComparisonResult.Succeeded);
            }
        }
        if (source.flags & TypeFlags.StructuredOrInstantiable || target.flags & TypeFlags.StructuredOrInstantiable) {
            return checkTypeRelatedTo(source, target, relation, /*errorNode*/ undefined);
        }
        return false;
    }

    /**
     * Checks if 'source' is related to 'target' (e.g.: is a assignable to).
     * @param source The left-hand-side of the relation.
     * @param target The right-hand-side of the relation.
     * @param relation The relation considered. One of 'identityRelation', 'subtypeRelation', 'assignableRelation', or 'comparableRelation'.
     * Used as both to determine which checks are performed and as a cache of previously computed results.
     * @param errorNode The suggested node upon which all errors will be reported, if defined. This may or may not be the actual node used.
     * @param headMessage If the error chain should be prepended by a head message, then headMessage will be used.
     * @param containingMessageChain A chain of errors to prepend any new errors found.
     * @param errorOutputContainer Return the diagnostic. Do not log if 'skipLogging' is truthy.
     */
    function checkTypeRelatedTo(
        source: Type,
        target: Type,
        relation: Map<string, RelationComparisonResult>,
        errorNode: Node | undefined,
        headMessage?: DiagnosticMessage,
        containingMessageChain?: () => DiagnosticMessageChain | undefined,
        errorOutputContainer?: { errors?: Diagnostic[]; skipLogging?: boolean; },
    ): boolean {
        console.warn("TODO - Implement me - checkTypeRelatedTo");
        return true;
    }
    
    /**
     * To improve caching, the relation key for two generic types uses the target's id plus ids of the type parameters.
     * For other cases, the types ids are used.
     */
    function getRelationKey(source: Type, target: Type, intersectionState: IntersectionState, relation: Map<string, RelationComparisonResult>, ignoreConstraints: boolean) {
        if (relation === identityRelation && source.id > target.id) {
            const temp = source;
            source = target;
            target = temp;
        }
        const postFix = intersectionState ? ":" + intersectionState : "";
        return `${source.id},${target.id}${postFix}`;
    }

    function isTypeAssignableTo(source: Type, target: Type): boolean {
        return isTypeRelatedTo(source, target, assignableRelation);
    }

    function isTypeAssignableToKind(source: Type, kind: TypeFlags, strict?: boolean): boolean {
        if (source.flags & kind) {
            return true;
        }
        if (strict && source.flags & (TypeFlags.AnyOrUnknown | TypeFlags.Void | TypeFlags.Undefined | TypeFlags.Null)) {
            return false;
        }
        return !!(kind & TypeFlags.NumberLike) && isTypeAssignableTo(source, intType) ||            
            !!(kind & TypeFlags.NumberLike) && isTypeAssignableTo(source, floatType) ||
            !!(kind & TypeFlags.StringLike) && isTypeAssignableTo(source, stringType) ||
            //!!(kind & TypeFlags.BooleanLike) && isTypeAssignableTo(source, booleanType) ||
            //!!(kind & TypeFlags.Void) && isTypeAssignableTo(source, voidType) ||
            !!(kind & TypeFlags.Never) && isTypeAssignableTo(source, neverType) ||            
            !!(kind & TypeFlags.Undefined) && isTypeAssignableTo(source, undefinedType) ||
            //!!(kind & TypeFlags.ESSymbol) && isTypeAssignableTo(source, esSymbolType) ||
            !!(kind & TypeFlags.NonPrimitive) && isTypeAssignableTo(source, nonPrimitiveType);
    }


    // Return true if the given node is 'x' in an 'x.length', x.push(value)', 'x.unshift(value)' or
    // 'x[n] = value' operation, where 'n' is an expression of type any, undefined, or a number-like type.
    function isEvolvingArrayOperationTarget(node: Node) {
        const root = getReferenceRoot(node);
        const parent = root.parent;        
        const isElementAssignment = parent.kind === SyntaxKind.ElementAccessExpression &&
            (parent as ElementAccessExpression).expression === root &&
            parent.parent.kind === SyntaxKind.BinaryExpression &&
            (parent.parent as BinaryExpression).operatorToken.kind === SyntaxKind.EqualsToken &&
            (parent.parent as BinaryExpression).left === parent &&
            !isAssignmentTarget(parent.parent) &&
            isTypeAssignableToKind(getTypeOfExpression((parent as ElementAccessExpression).argumentExpression), TypeFlags.NumberLike);
        return isElementAssignment;
    }

    /**
     * Returns the type of an expression. Unlike checkExpression, this function is simply concerned
     * with computing the type and may not fully check all contained sub-expressions for errors.
     */
    function getTypeOfExpression(node: Expression) {
        // Don't bother caching types that require no flow analysis and are quick to compute.
        const quickType = getQuickTypeOfExpression(node);
        if (quickType) {
            return quickType;
        }
        // If a type has been cached for the node, return it.
        if (node.flags & NodeFlags.TypeCached && flowTypeCache) {
            const cachedType = flowTypeCache[getNodeId(node)];
            if (cachedType) {
                return cachedType;
            }
        }
        const startInvocationCount = flowInvocationCount;
        const type = checkExpression(node, CheckMode.TypeOnly);
        // If control flow analysis was required to determine the type, it is worth caching.
        if (flowInvocationCount !== startInvocationCount) {
            const cache = flowTypeCache || (flowTypeCache = []);
            cache[getNodeId(node)] = type;
            setNodeFlags(node, node.flags | NodeFlags.TypeCached);
        }
        return type;
    }

    function getQuickTypeOfExpression(node: Expression): Type | undefined {
        console.warn("TODO - Implement me - getQuickTypeOfExpression");
        // let expr = skipParentheses(node, /*excludeJSDocTypeAssertions*/ true);
        // if (isJSDocTypeAssertion(expr)) {
        //     const type = getJSDocTypeAssertionType(expr);
        //     if (!isConstTypeReference(type)) {
        //         return getTypeFromTypeNode(type);
        //     }
        // }
        // expr = skipParentheses(node);
        // // if (isAwaitExpression(expr)) {
        // //     const type = getQuickTypeOfExpression(expr.expression);
        // //     return type ? getAwaitedType(type) : undefined;
        // // }
        // // Optimize for the common case of a call to a function with a single non-generic call
        // // signature where we can just fetch the return type without checking the arguments.
        // if (isCallExpression(expr) && expr.expression.kind !== SyntaxKind.SuperKeyword && !isRequireCall(expr, /*requireStringLiteralLikeArgument*/ true) && !isSymbolOrSymbolForCall(expr)) {
        //     return isCallChain(expr) ? getReturnTypeOfSingleNonGenericSignatureOfCallChain(expr) :
        //         getReturnTypeOfSingleNonGenericCallSignature(checkNonNullExpression(expr.expression));
        // }
        // else if (isAssertionExpression(expr) && !isConstTypeReference(expr.type)) {
        //     return getTypeFromTypeNode((expr as TypeAssertion).type);
        // }
        // else if (isLiteralExpression(node) || isBooleanLiteral(node)) {
        //     return checkExpression(node);
        // }
        return undefined;
    }

    function getFlowTypeOfReference(reference: Node, declaredType: Type, initialType = declaredType, flowContainer?: Node, flowNode = tryCast(reference, canHaveFlowNode)?.flowNode) {
        console.warn("TODO - Implement me - getFlowTypeOfReference");
        return anyType;
    }

    function isFunctionOrSourceFile(node: Node) {
        return isFunctionLikeDeclaration(node) || isSourceFile(node);
    }

    function hasParentWithAssignmentsMarked(node: Node) {
        return !!findAncestor(node.parent, node => isFunctionOrSourceFile(node) && !!(getNodeLinks(node).flags & NodeCheckFlags.AssignmentsMarked));
    }
    
    // For all assignments within the given root node, record the last assignment source position for all
    // referenced parameters and mutable local variables. When assignments occur in nested functions  or
    // references occur in export specifiers, record Number.MAX_VALUE as the assignment position. When
    // assignments occur in compound statements, record the ending source position of the compound statement
    // as the assignment position (this is more conservative than full control flow analysis, but requires
    // only a single walk over the AST).
    function markNodeAssignments(node: Node) {
        switch (node.kind) {
            case SyntaxKind.Identifier:
                if (isAssignmentTarget(node)) {
                    const symbol = getResolvedSymbol(node as Identifier);
                    if (isParameterOrMutableLocalVariable(symbol) && symbol.lastAssignmentPos !== Number.MAX_VALUE) {
                        const referencingFunction = findAncestor(node, isFunctionOrSourceFile);
                        const declaringFunction = findAncestor(symbol.valueDeclaration, isFunctionOrSourceFile);
                        symbol.lastAssignmentPos = referencingFunction === declaringFunction ? extendAssignmentPosition(node, symbol.valueDeclaration!) : Number.MAX_VALUE;
                    }
                }
                return;
            // case SyntaxKind.ExportSpecifier:
            //     const exportDeclaration = (node as ExportSpecifier).parent.parent;
            //     const name = (node as ExportSpecifier).propertyName || (node as ExportSpecifier).name;
            //     if (!(node as ExportSpecifier).isTypeOnly && !exportDeclaration.isTypeOnly && !exportDeclaration.moduleSpecifier && name.kind !== SyntaxKind.StringLiteral) {
            //         const symbol = resolveEntityName(name, SymbolFlags.Value, /*ignoreErrors*/ true, /*dontResolveAlias*/ true);
            //         if (symbol && isParameterOrMutableLocalVariable(symbol)) {
            //             symbol.lastAssignmentPos = Number.MAX_VALUE;
            //         }
            //     }
            //     return;            
        }
        if (isTypeNode(node)) {
            return;
        }
        forEachChild(node, markNodeAssignments);
    }

    // Extend the position of the given assignment target node to the end of any intervening variable statement,
    // expression statement, compound statement, or class declaration occurring between the node and the given
    // declaration node.
    function extendAssignmentPosition(node: Node, declaration: Declaration) {
        let pos = node.pos;
        while (node && node.pos > declaration.pos) {
            switch (node.kind) {
                case SyntaxKind.VariableStatement:
                case SyntaxKind.ExpressionStatement:
                case SyntaxKind.IfStatement:
                case SyntaxKind.DoWhileStatement:
                case SyntaxKind.WhileStatement:
                case SyntaxKind.ForStatement:
                case SyntaxKind.ForEachStatement:                
                case SyntaxKind.SwitchStatement:                
                    pos = node.end;
            }
            node = node.parent;
        }
        return pos;
    }
    
    // Return true if there are no assignments to the given symbol or if the given location
    // is past the last assignment to the symbol.
    function isPastLastAssignment(symbol: Symbol, location: Node | undefined) {
        const parent = findAncestor(symbol.valueDeclaration, isFunctionOrSourceFile);
        if (!parent) {
            return false;
        }
        const links = getNodeLinks(parent);
        if (!(links.flags & NodeCheckFlags.AssignmentsMarked)) {
            links.flags |= NodeCheckFlags.AssignmentsMarked;
            if (!hasParentWithAssignmentsMarked(parent)) {
                markNodeAssignments(parent);
            }
        }
        return !symbol.lastAssignmentPos || location && symbol.lastAssignmentPos < location.pos;
    }

    function isMutableLocalVariableDeclaration(declaration: VariableDeclaration) {
        // Return true if symbol is a non-exported and non-global `let` variable
        return !(
            //getCombinedModifierFlags(declaration) & ModifierFlags.Export ||
            declaration.parent.parent.kind === SyntaxKind.VariableStatement
        );
    }

    function isParameterOrMutableLocalVariable(symbol: Symbol) {
        // Return true if symbol is a parameter, a catch clause variable, or a mutable local variable
        const declaration = symbol.valueDeclaration && getRootDeclaration(symbol.valueDeclaration);
        return !!declaration && (
            isParameter(declaration) ||
            isVariableDeclaration(declaration) && (/*isCatchClause(declaration.parent) || */isMutableLocalVariableDeclaration(declaration))
        );
    }

    /**
     * Get the merged symbol for a node. If you know the node is a `Declaration`, it is faster and more type safe to
     * use use `getSymbolOfDeclaration` instead.
     */
    function getSymbolOfNode(node: Node): Symbol | undefined {
        return canHaveSymbol(node) ? getSymbolOfDeclaration(node) : undefined;
    }

    function getSymbolOfNameOrPropertyAccessExpression(name: EntityName | PropertyAccessExpression | JSDocMemberName): Symbol | undefined {
        if (isDeclarationName(name)) {
            return getSymbolOfNode(name.parent);
        }
        
        console.warn("TODO - Implement me - getSymbolOfNameOrPropertyAccessExpression");

        // if (name.parent.kind === SyntaxKind.ExportAssignment && isEntityNameExpression(name)) {
        //     // Even an entity name expression that doesn't resolve as an entityname may still typecheck as a property access expression
        //     const success = resolveEntityName(name, /*all meanings*/ SymbolFlags.Value | SymbolFlags.Type | SymbolFlags.Namespace | SymbolFlags.Alias, /*ignoreErrors*/ true);
        //     if (success && success !== unknownSymbol) {
        //         return success;
        //     }
        // }
        // else if (isEntityName(name) && isInRightSideOfImportOrExportAssignment(name)) {
        //     // Since we already checked for ExportAssignment, this really could only be an Import
        //     const importEqualsDeclaration = getAncestor(name, SyntaxKind.ImportEqualsDeclaration);
        //     Debug.assert(importEqualsDeclaration !== undefined);
        //     return getSymbolOfPartOfRightHandSideOfImportEquals(name, /*dontResolveAlias*/ true);
        // }

        // if (isEntityName(name)) {
        //     const possibleImportNode = isImportTypeQualifierPart(name);
        //     if (possibleImportNode) {
        //         getTypeFromTypeNode(possibleImportNode);
        //         const sym = getNodeLinks(name).resolvedSymbol;
        //         return sym === unknownSymbol ? undefined : sym;
        //     }
        // }

        // while (isRightSideOfQualifiedNameOrPropertyAccessOrJSDocMemberName(name)) {
        //     name = name.parent as QualifiedName | PropertyAccessEntityNameExpression | JSDocMemberName;
        // }

        // if (isInNameOfExpressionWithTypeArguments(name)) {
        //     let meaning = SymbolFlags.None;
        //     if (name.parent.kind === SyntaxKind.ExpressionWithTypeArguments) {
        //         // An 'ExpressionWithTypeArguments' may appear in type space (interface Foo extends Bar<T>),
        //         // value space (return foo<T>), or both(class Foo extends Bar<T>); ensure the meaning matches.
        //         meaning = isPartOfTypeNode(name) ? SymbolFlags.Type : SymbolFlags.Value;

        //         // In a class 'extends' clause we are also looking for a value.
        //         if (isExpressionWithTypeArgumentsInClassExtendsClause(name.parent)) {
        //             meaning |= SymbolFlags.Value;
        //         }
        //     }
        //     else {
        //         meaning = SymbolFlags.Namespace;
        //     }

        //     meaning |= SymbolFlags.Alias;
        //     const entityNameSymbol = isEntityNameExpression(name) ? resolveEntityName(name, meaning, /*ignoreErrors*/ true) : undefined;
        //     if (entityNameSymbol) {
        //         return entityNameSymbol;
        //     }
        // }

        // if (name.parent.kind === SyntaxKind.JSDocParameterTag) {
        //     return getParameterSymbolFromJSDoc(name.parent as JSDocParameterTag);
        // }

        // if (name.parent.kind === SyntaxKind.TypeParameter && name.parent.parent.kind === SyntaxKind.JSDocTemplateTag) {
        //     Debug.assert(!isInJSFile(name)); // Otherwise `isDeclarationName` would have been true.
        //     const typeParameter = getTypeParameterFromJsDoc(name.parent as TypeParameterDeclaration & { parent: JSDocTemplateTag; });
        //     return typeParameter && typeParameter.symbol;
        // }

        // if (isExpressionNode(name)) {
        //     if (nodeIsMissing(name)) {
        //         // Missing entity name.
        //         return undefined;
        //     }

        //     const isJSDoc = findAncestor(name, or(isJSDocLinkLike, isJSDocNameReference, isJSDocMemberName));
        //     const meaning = isJSDoc ? SymbolFlags.Type | SymbolFlags.Namespace | SymbolFlags.Value : SymbolFlags.Value;
        //     if (name.kind === SyntaxKind.Identifier) {
        //         if (isJSXTagName(name) && isJsxIntrinsicTagName(name)) {
        //             const symbol = getIntrinsicTagSymbol(name.parent as JsxOpeningLikeElement);
        //             return symbol === unknownSymbol ? undefined : symbol;
        //         }
        //         const result = resolveEntityName(name, meaning, /*ignoreErrors*/ true, /*dontResolveAlias*/ true, getHostSignatureFromJSDoc(name));
        //         if (!result && isJSDoc) {
        //             const container = findAncestor(name, or(isClassLike, isInterfaceDeclaration));
        //             if (container) {
        //                 return resolveJSDocMemberName(name, /*ignoreErrors*/ true, getSymbolOfDeclaration(container));
        //             }
        //         }
        //         if (result && isJSDoc) {
        //             const container = getJSDocHost(name);
        //             if (container && isEnumMember(container) && container === result.valueDeclaration) {
        //                 return resolveEntityName(name, meaning, /*ignoreErrors*/ true, /*dontResolveAlias*/ true, getSourceFileOfNode(container)) || result;
        //             }
        //         }
        //         return result;
        //     }
        //     else if (isPrivateIdentifier(name)) {
        //         return getSymbolForPrivateIdentifierExpression(name);
        //     }
        //     else if (name.kind === SyntaxKind.PropertyAccessExpression || name.kind === SyntaxKind.QualifiedName) {
        //         const links = getNodeLinks(name);
        //         if (links.resolvedSymbol) {
        //             return links.resolvedSymbol;
        //         }

        //         if (name.kind === SyntaxKind.PropertyAccessExpression) {
        //             checkPropertyAccessExpression(name, CheckMode.Normal);
        //             if (!links.resolvedSymbol) {
        //                 links.resolvedSymbol = getApplicableIndexSymbol(checkExpressionCached(name.expression), getLiteralTypeFromPropertyName(name.name));
        //             }
        //         }
        //         else {
        //             checkQualifiedName(name, CheckMode.Normal);
        //         }
        //         if (!links.resolvedSymbol && isJSDoc && isQualifiedName(name)) {
        //             return resolveJSDocMemberName(name);
        //         }
        //         return links.resolvedSymbol;
        //     }
        //     else if (isJSDocMemberName(name)) {
        //         return resolveJSDocMemberName(name);
        //     }
        // }
        // else if (isTypeReferenceIdentifier(name as EntityName)) {
        //     const meaning = name.parent.kind === SyntaxKind.TypeReference ? SymbolFlags.Type : SymbolFlags.Namespace;
        //     const symbol = resolveEntityName(name as EntityName, meaning, /*ignoreErrors*/ false, /*dontResolveAlias*/ true);
        //     return symbol && symbol !== unknownSymbol ? symbol : getUnresolvedSymbolForEntityName(name as EntityName);
        // }
        // if (name.parent.kind === SyntaxKind.TypePredicate) {
        //     return resolveEntityName(name as Identifier, /*meaning*/ SymbolFlags.FunctionScopedVariable);
        // }

        // return undefined;
    }

    function checkUnusedIdentifiers(potentiallyUnusedIdentifiers: readonly PotentiallyUnusedIdentifier[], addDiagnostic: AddUnusedDiagnostic) {
        for (const node of potentiallyUnusedIdentifiers) {
            switch (node.kind) {
                // case SyntaxKind.ClassDeclaration:
                // case SyntaxKind.ClassExpression:
                //     checkUnusedClassMembers(node, addDiagnostic);
                //     checkUnusedTypeParameters(node, addDiagnostic);
                //     break;
                case SyntaxKind.SourceFile:                
                case SyntaxKind.Block:
                case SyntaxKind.CaseBlock:
                case SyntaxKind.ForStatement:
                case SyntaxKind.ForEachStatement:                
                    checkUnusedLocalsAndParameters(node, addDiagnostic);
                    break;                
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.InlineClosureExpression:
                // case SyntaxKind.MethodDeclaration:                
                    if (node.body) { // Don't report unused parameters in overloads
                        checkUnusedLocalsAndParameters(node, addDiagnostic);
                    }                    
                    break;
                // case SyntaxKind.MethodSignature:
                // case SyntaxKind.CallSignature:                
                // case SyntaxKind.FunctionType:                
                //     checkUnusedTypeParameters(node, addDiagnostic);
                //     break;                
                default:
                    Debug.assertNever(node, "Node should not have been registered for unused identifiers check");
            }
        }
    }

    function isIdentifierThatStartsWithUnderscore(node: Node) {
        return isIdentifier(node) && idText(node).charCodeAt(0) === CharacterCodes._;
    }
    
    function isValidUnusedLocalDeclaration(declaration: Declaration): boolean {
        if (isBindingElement(declaration)) {
            // if (isObjectBindingPattern(declaration.parent)) {
            //     /**
            //      * ignore starts with underscore names _
            //      * const { a: _a } = { a: 1 }
            //      */
            //     return !!(declaration.propertyName && isIdentifierThatStartsWithUnderscore(declaration.name));
            // }
            return isIdentifierThatStartsWithUnderscore(declaration.name);
        }
        return (isVariableDeclaration(declaration) && isForEachStatement(declaration.parent.parent)) && isIdentifierThatStartsWithUnderscore(declaration.name!);
    }

    function addToGroup<K, V>(map: Map<string, [K, V[]]>, key: K, value: V, getKey: (key: K) => number | string): void {
        const keyString = String(getKey(key));
        const group = map.get(keyString);
        if (group) {
            group[1].push(value);
        }
        else {
            map.set(keyString, [key, [value]]);
        }
    }

    function tryGetRootParameterDeclaration(node: Node): ParameterDeclaration | undefined {
        return tryCast(getRootDeclaration(node), isParameter);
    }

    function errorUnusedLocal(declaration: Declaration, name: string, addDiagnostic: AddUnusedDiagnostic) {
        const node = getNameOfDeclaration(declaration) || declaration;
        const message = Diagnostics._0_is_declared_but_its_value_is_never_read;
        addDiagnostic(declaration, UnusedKind.Local, createDiagnosticForNode(node, message, name));
    }

    function checkUnusedLocalsAndParameters(nodeWithLocals: HasLocals, addDiagnostic: AddUnusedDiagnostic): void {
        // Ideally we could use the ImportClause directly as a key, but must wait until we have full ES6 maps. So must store key along with value.
        //const unusedImports = new Map<string, [ImportClause, ImportedDeclaration[]]>();
        const unusedDestructures = new Map<string, [BindingPattern, BindingElement[]]>();
        const unusedVariables = new Map<string, [VariableDeclarationList, VariableDeclaration[]]>();
        nodeWithLocals.locals!.forEach(local => {
            // If it's purely a type parameter, ignore, will be checked in `checkUnusedTypeParameters`.
            // If it's a type parameter merged with a parameter, check if the parameter-side is used.
            if (local.flags & SymbolFlags.TypeParameter ? !(local.flags & SymbolFlags.Variable && !(local.isReferenced! & SymbolFlags.Variable)) : local.isReferenced || local.exportSymbol) {
                return;
            }

            if (local.declarations) {
                for (const declaration of local.declarations) {
                    if (isValidUnusedLocalDeclaration(declaration)) {
                        continue;
                    }

                    // if (isImportedDeclaration(declaration)) {
                    //     addToGroup(unusedImports, importClauseFromImported(declaration), declaration, getNodeId);
                    // }
                    // else if (isBindingElement(declaration) && isObjectBindingPattern(declaration.parent)) {
                    //     // In `{ a, ...b }, `a` is considered used since it removes a property from `b`. `b` may still be unused though.
                    //     const lastElement = last(declaration.parent.elements);
                    //     if (declaration === lastElement || !last(declaration.parent.elements).dotDotDotToken) {
                    //         addToGroup(unusedDestructures, declaration.parent, declaration, getNodeId);
                    //     }
                    // }
                    else if (isVariableDeclaration(declaration)) {
                        const blockScopeKind = getCombinedNodeFlagsCached(declaration) & NodeFlags.BlockScoped;
                        const name = getNameOfDeclaration(declaration);
                        if (!name || !isIdentifierThatStartsWithUnderscore(name)) {
                            addToGroup(unusedVariables, declaration.parent, declaration, getNodeId);
                        }
                    }
                    else {
                        const parameter = local.valueDeclaration && tryGetRootParameterDeclaration(local.valueDeclaration);
                        const name = local.valueDeclaration && getNameOfDeclaration(local.valueDeclaration);
                        if (parameter && name) {
                            if (!isIdentifierThatStartsWithUnderscore(name)) {
                                if (isBindingElement(declaration) && isArrayBindingPattern(declaration.parent)) {
                                    addToGroup(unusedDestructures, declaration.parent, declaration, getNodeId);
                                }
                                else {
                                    addDiagnostic(parameter, UnusedKind.Parameter, createDiagnosticForNode(name, Diagnostics._0_is_declared_but_its_value_is_never_read, symbolName(local)));
                                }
                            }
                        }
                        else {
                            errorUnusedLocal(declaration, symbolName(local), addDiagnostic);
                        }
                    }
                }
            }
        });

        // unusedImports.forEach(([importClause, unuseds]) => {
        //     const importDecl = importClause.parent;
        //     const nDeclarations = (importClause.name ? 1 : 0) +
        //         (importClause.namedBindings ?
        //             (importClause.namedBindings.kind === SyntaxKind.NamespaceImport ? 1 : importClause.namedBindings.elements.length)
        //             : 0);
        //     if (nDeclarations === unuseds.length) {
        //         addDiagnostic(
        //             importDecl,
        //             UnusedKind.Local,
        //             unuseds.length === 1
        //                 ? createDiagnosticForNode(importDecl, Diagnostics._0_is_declared_but_its_value_is_never_read, idText(first(unuseds).name!))
        //                 : createDiagnosticForNode(importDecl, Diagnostics.All_imports_in_import_declaration_are_unused),
        //         );
        //     }
        //     else {
        //         for (const unused of unuseds) errorUnusedLocal(unused, idText(unused.name!), addDiagnostic);
        //     }
        // });
       
        unusedVariables.forEach(([declarationList, declarations]) => {
            if (declarationList.declarations.length === declarations.length) {
                addDiagnostic(
                    declarationList,
                    UnusedKind.Local,
                    declarations.length === 1
                        ? createDiagnosticForNode(first(declarations).name, Diagnostics._0_is_declared_but_its_value_is_never_read, bindingNameText(first(declarations).name))
                        : createDiagnosticForNode(declarationList.parent.kind === SyntaxKind.VariableStatement ? declarationList.parent : declarationList, Diagnostics.All_variables_are_unused),
                );
            }
            else {
                for (const decl of declarations) {
                    addDiagnostic(decl, UnusedKind.Local, createDiagnosticForNode(decl, Diagnostics._0_is_declared_but_its_value_is_never_read, bindingNameText(decl.name)));
                }
            }
        });
    }

    function bindingNameText(name: BindingName): string {
        switch (name.kind) {
            case SyntaxKind.Identifier:
                return idText(name);
            case SyntaxKind.ArrayBindingPattern:
            //case SyntaxKind.ObjectBindingPattern:
                return bindingNameText(cast(first(name.elements), isBindingElement).name);
            default:
                return Debug.assertNever(name);
        }
    }    
}

const SymbolLinks = class implements SymbolLinks {
    declare _symbolLinksBrand: any;
};

/** @internal */
export function getNodeId(node: Node): number {
    if (!node.id) {
        node.id = nextNodeId;
        nextNodeId++;
    }
    return node.id;
}

function NodeLinks(this: NodeLinks) {
    this.flags = NodeCheckFlags.None;
}

/** @internal */
export const enum CheckMode {
    Normal = 0,                                     // Normal type checking
    Contextual = 1 << 0,                            // Explicitly assigned contextual type, therefore not cacheable
    Inferential = 1 << 1,                           // Inferential typing
    SkipContextSensitive = 1 << 2,                  // Skip context sensitive function expressions
    SkipGenericFunctions = 1 << 3,                  // Skip single signature generic functions
    IsForSignatureHelp = 1 << 4,                    // Call resolution for purposes of signature help
    RestBindingElement = 1 << 5,                    // Checking a type that is going to be used to determine the type of a rest binding element
                                                    //   e.g. in `const { a, ...rest } = foo`, when checking the type of `foo` to determine the type of `rest`,
                                                    //   we need to preserve generic types instead of substituting them for constraints
    TypeOnly = 1 << 6,                              // Called from getTypeOfExpression, diagnostics may be omitted
}

/** @internal */
export function getSymbolId(symbol: Symbol): SymbolId {
    if (!symbol.id) {
        symbol.id = nextSymbolId;
        nextSymbolId++;
    }

    return symbol.id;
}

const enum IntersectionState {
    None = 0,
    Source = 1 << 0, // Source type is a constituent of an outer intersection
    Target = 1 << 1, // Target type is a constituent of an outer intersection
}

/** Like 'isDeclarationName', but returns true for LHS of `import { x as y }` or `export { x as y }`. */
function isDeclarationNameOrImportPropertyName(name: Node): boolean {
    switch (name.parent.kind) {
        // case SyntaxKind.ImportSpecifier:
        // case SyntaxKind.ExportSpecifier:
        //     return isIdentifier(name) || name.kind === SyntaxKind.StringLiteral;
        default:
            return isDeclarationName(name);
    }
}

/** @param containingNode Node to check for parse error */
type AddUnusedDiagnostic = (containingNode: Node, type: UnusedKind, diagnostic: DiagnosticWithLocation) => void;

const enum UnusedKind {
    Local,
    Parameter,
}
