import {Type,Symbol, SymbolLinks, CancellationToken, createSymbolTable, Declaration, EmitTextWriter, ModifierFlags, Node, NodeFlags, objectAllocator, Scanner, Signature, SignatureKind, SymbolFlags, TypeChecker, TypeCheckerHost, TypeFormatFlags, TypeParameter, CheckFlags, TransientSymbol, TransientSymbolLinks, reduceLeft, bindSourceFile, SourceFile, Diagnostic, createDiagnosticCollection, concatenate, forEach, tracing, performance, NodeLinks, NodeCheckFlags, FlowNode, FlowType, clear, SyntaxKind, TracingNode, CallLikeExpression, CallExpression, isCallOrNewExpression, isBinaryExpression, Expression, SignatureDeclaration, SignatureFlags, emptyArray, TypeFlags, IntrinsicType, ObjectFlags, Debug, BinaryExpression, ObjectType, StructuredType, ResolvedType, SymbolTable, IndexInfo } from "./_namespaces/lpc";

let nextSymbolId = 1;
let nextNodeId = 1;
let nextMergeId = 1;
let nextFlowId = 1;

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
    
    var seenIntrinsicNames = new Set<string>();

    var anyType = createIntrinsicType(TypeFlags.Any, "any");
    var errorType = createIntrinsicType(TypeFlags.Any, "error");
    var silentNeverType = createIntrinsicType(TypeFlags.Never, "never", ObjectFlags.NonInferrableType, "silent");
    
    var anySignature = createSignature(/*declaration*/ undefined, /*typeParameters*/ undefined, /*thisParameter*/ undefined, emptyArray, anyType, /*resolvedTypePredicate*/ undefined, 0, SignatureFlags.None);
    var unknownSignature = createSignature(/*declaration*/ undefined, /*typeParameters*/ undefined, /*thisParameter*/ undefined, emptyArray, errorType, /*resolvedTypePredicate*/ undefined, 0, SignatureFlags.None);
    var resolvingSignature = createSignature(/*declaration*/ undefined, /*typeParameters*/ undefined, /*thisParameter*/ undefined, emptyArray, anyType, /*resolvedTypePredicate*/ undefined, 0, SignatureFlags.None);
    var silentNeverSignature = createSignature(/*declaration*/ undefined, /*typeParameters*/ undefined, /*thisParameter*/ undefined, emptyArray, silentNeverType, /*resolvedTypePredicate*/ undefined, 0, SignatureFlags.None);
    
    var unknownSymbol = createSymbol(SymbolFlags.Property, "unknown" as string);
    var anyFunctionType = createAnonymousType(/*symbol*/ undefined, emptySymbols, emptyArray, emptyArray, emptyArray);

    const checker:TypeChecker = {
        getNodeCount: () => reduceLeft(host.getSourceFiles(), (n, s) => n + s.nodeCount, 0),
        getIdentifierCount: () => reduceLeft(host.getSourceFiles(), (n, s) => n + s.identifierCount, 0),
        getSymbolCount: () => reduceLeft(host.getSourceFiles(), (n, s) => n + s.symbolCount, symbolCount),
        getTypeCount: () => typeCount,
        getInstantiationCount: () => totalInstantiationCount,
        signatureToString,
        getDiagnostics
    };

    initializeTypeChecker();

    return checker;

    function initializeTypeChecker() {
        // Bind all source files and propagate errors
        for (const file of host.getSourceFiles()) {
            bindSourceFile(file, compilerOptions);
        }

        // TODO
    }

    function createIntrinsicType(kind: TypeFlags, intrinsicName: string, objectFlags = ObjectFlags.None, debugIntrinsicName?: string): IntrinsicType {
        checkIntrinsicName(intrinsicName, debugIntrinsicName);
        const type = createType(kind) as IntrinsicType;
        type.intrinsicName = intrinsicName;
        type.debugIntrinsicName = debugIntrinsicName;
        type.objectFlags = objectFlags | ObjectFlags.CouldContainTypeVariablesComputed | ObjectFlags.IsGenericTypeComputed | ObjectFlags.IsUnknownLikeUnionComputed | ObjectFlags.IsNeverIntersectionComputed;
        return type;
    }

    function checkIntrinsicName(name: string, debug: string | undefined) {
        const key = `${name},${debug ?? ""}`;
        if (seenIntrinsicNames.has(key)) {
            Debug.fail(`Duplicate intrinsic type name ${name}${debug ? ` (${debug})` : ""}; you may need to pass a name to createIntrinsicType.`);
        }
        seenIntrinsicNames.add(key);
    }

    function createType(flags: TypeFlags): Type {
        const result = new Type(checker, flags);
        typeCount++;
        result.id = typeCount;
        tracing?.recordType(result);
        return result;
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
        // TODO
        console.warn("Implement me - checkSourceElementWorker");
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

            // TODO: 
            console.warn("Implement rest of me - checkSourceFileWorker");
            checkDeferredNodes(node);

            // if (isExternalOrCommonJsModule(node)) {
            //     registerForUnusedIdentifiersCheck(node);
            // }

            // addLazyDiagnostic(() => {
            //     // This relies on the results of other lazy diagnostics, so must be computed after them
            //     if (!node.isDeclarationFile && (compilerOptions.noUnusedLocals || compilerOptions.noUnusedParameters)) {
            //         checkUnusedIdentifiers(getPotentiallyUnusedIdentifiers(node), (containingNode, kind, diag) => {
            //             if (!containsParseError(containingNode) && unusedIsError(kind, !!(containingNode.flags & NodeFlags.Ambient))) {
            //                 diagnostics.add(diag);
            //             }
            //         });
            //     }
            //     if (!node.isDeclarationFile) {
            //         checkPotentialUncheckedRenamedBindingElementsInTypes();
            //     }
            // });

            // if (isExternalOrCommonJsModule(node)) {
            //     checkExternalModuleExports(node);
            // }

            // if (potentialThisCollisions.length) {
            //     forEach(potentialThisCollisions, checkIfThisIsCapturedInEnclosingScope);
            //     clear(potentialThisCollisions);
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
    
    function checkSourceFileNodesWorker(file: SourceFile, nodes: readonly Node[]) {
        // TODO
        console.warn("Implement me");
    }

    function checkDeferredNodes(context: SourceFile) {
        const links = getNodeLinks(context);
        if (links.deferredNodes) {
            links.deferredNodes.forEach(checkDeferredNode);
        }
        links.deferredNodes = undefined;
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
        //         typeOnlyExportStarTargets?.get(target.escapedName) === target
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
