import { CompilerOptions, Debug, FlowFlags, FlowLabel, FlowNode, HasLocals, IsBlockScopedContainer, IsContainer, Node, objectAllocator, SourceFile, SymbolFlags, Symbol, tracing, setParent, TracingNode, SyntaxKind, isFunctionLike, NodeArray, forEach, forEachChild, Mutable, HasContainerFlags, createSymbolTable, ModifierFlags, FunctionExpression, InlineClosureExpression, NodeFlags, FunctionLikeDeclaration, getImmediatelyInvokedFunctionExpression, nodeIsPresent, contains, isIdentifier, HasFlowNode, performance, VariableDeclaration, isBlockOrCatchScoped, Declaration, canHaveLocals, isPartOfParameterDeclaration, SymbolTable, hasSyntacticModifier, Diagnostics, isNamedDeclaration, length, DiagnosticRelatedInformation, getNameOfDeclaration, appendIfUnique, setValueDeclaration, addRelatedInfo, Identifier, StringLiteral, isPropertyNameLiteral, InternalSymbolName, getAssignmentDeclarationKind, BinaryExpression, AssignmentDeclarationKind, declarationNameToString, createDiagnosticForNodeInSourceFile, DiagnosticMessage, DiagnosticArguments, DiagnosticWithLocation, ReturnStatement, IfStatement, Expression, isTruthyLiteral, isFalsyLiteral, FlowCondition, PrefixUnaryExpression, isLogicalOrCoalescingAssignmentExpression, isLogicalOrCoalescingBinaryExpression, isForEachStatement, FlowAssignment, FlowArrayMutation, Block, ConditionalExpression, WhileStatement, Statement, DoWhileStatement, ForStatement, ForEachStatement, BreakOrContinueStatement, SwitchStatement, FlowSwitchClause, CaseBlock, CallExpression, isAssignmentOperator, PropertyAccessExpression, ParenthesizedExpression, isLeftHandSideExpression, PostfixUnaryExpression, ArrayLiteralExpression, ObjectLiteralExpression, isBinaryLogicalOperator, isLogicalOrCoalescingAssignmentOperator, isParenthesizedExpression, isPrefixUnaryExpression, BinaryOperatorToken, isAssignmentTarget, ElementAccessExpression, isBinaryExpression, isDottedName, FlowCall, createBinaryExpressionTrampoline, CaseClause, CallChain, LeftHandSideExpression, skipParentheses, ParameterDeclaration, ExpressionStatement, FunctionDeclaration, removeFileExtension, hasEffectiveModifier, getCombinedModifierFlags, isExpression, isIdentifierName, identifierToKeywordKind, AccessExpression, BindingElement, TypeLiteralNode, JSDocTypeLiteral, EntityNameExpression, isVariableDeclaration, factory, isVariableDeclarationList, isVariableStatement, isBindingPattern, ArrayBindingElement, InheritDeclaration, ClassLikeDeclaration, symbolName, StructDeclaration, BindableStaticNameExpression, BindableStaticAccessExpression, tryCast, isSourceFile, canHaveSymbol, getElementOrPropertyAccessName, MappingLiteralExpression, isStringOrNumericLiteralLike, isEntityNameExpression, isOmittedExpression, PropertyDeclaration, PropertySignature, PropertyAccessChain, ElementAccessChain, JSDocCallbackTag, JSDocTypedefTag, setParentRecursive, hasJSDocNodes, isInJSFile, DefineDirective, isAssignmentExpression, isObjectLiteralOrClassExpressionMethodOrAccessor, hasDynamicName, getLibRootedFileName, emptyArray, JSDocFunctionType, isFunctionDeclaration, isCallExpression, TypeParameterDeclaration, isJSDocTemplateTag, getEffectiveContainerForJSDocTemplateTag, ConditionalTypeNode, findAncestor, isConditionalTypeNode, MappedTypeNode, SignatureDeclaration, JSDocSignature, JSDocParameterTag, JSDocPropertyLikeTag, JSDocOverloadTag, getEnclosingContainer, getEnclosingBlockScopeContainer, isPropertyAccessEntityNameExpression, JSDocClassTag, getHostSignatureFromJSDoc, isTypeAliasDeclaration, nodeIsMissing, isStatementButNotDeclaration, unreachableCodeIsError, getCombinedNodeFlags, isBlock, isStatement, sliceAfter, getRangesWhere, isEnumDeclaration, getTokenPosOfNode, TextRange, createFileDiagnostic, append, DiagnosticCategory, JSDocVariableTag, isJSDocTypeAssertion, isInIncludeContext, getSourceFileOrIncludeOfNode, SourceFileBase, isDefineDirective, MethodDeclaration, isCatchStatement, ByRefElement, LanguageVariant, isNewClassExpression, NewExpression, isCatchExpression } from "./_namespaces/lpc";

const binder = /* @__PURE__ */ createBinder();

/** @internal */
export function bindSourceFile(file: SourceFile, options: CompilerOptions) {
    performance.mark("beforeBind");    
    // console.debug("Binding file " + file.fileName);
    binder(file, options);    
    performance.mark("afterBind");
    performance.measure("Bind", "beforeBind", "afterBind");
    // console.debug("DONE binding file " + file.fileName);
}

interface ActiveLabel {
    next: ActiveLabel | undefined;
    name: string;
    breakTarget: FlowLabel;
    continueTarget: FlowLabel | undefined;
    referenced: boolean;
}

/** @internal */
export function createFlowNode(flags: FlowFlags, node: unknown, antecedent: FlowNode | FlowNode[] | undefined): FlowNode {
    return Debug.attachFlowNodeDebugInfo({ flags, id: 0, node, antecedent } as FlowNode);
}

function createBinder(): (file: SourceFile, options: CompilerOptions) => void {
    // Why var? It avoids TDZ checks in the runtime which can be costly.
    // See: https://github.com/microsoft/TypeScript/issues/52924
    /* eslint-disable no-var */
    var file: SourceFile;
    var options: CompilerOptions;
    var parent: Node;
    var container: IsContainer | EntityNameExpression;
    var parentContainer: IsContainer | EntityNameExpression; // Container one level up
    var blockScopeContainer: IsBlockScopedContainer;
    var lastContainer: HasLocals;
    var delayedTypeAliases: (JSDocTypedefTag | JSDocCallbackTag)[];
    var delayedVarTags: JSDocVariableTag[];
    var seenThisKeyword: boolean;
    //var jsDocImports: JSDocImportTag[];
    
    // state used by control flow analysis
    var currentFlow: FlowNode;
    var currentBreakTarget: FlowLabel | undefined;
    var currentContinueTarget: FlowLabel | undefined;
    var currentReturnTarget: FlowLabel | undefined;
    var currentTrueTarget: FlowLabel | undefined;
    var currentFalseTarget: FlowLabel | undefined;
    var currentExceptionTarget: FlowLabel | undefined;
    var preSwitchCaseFlow: FlowNode | undefined;
    var activeLabelList: ActiveLabel | undefined;
    var hasExplicitReturn: boolean;
    var hasFlowEffects: boolean;

    // state used for emit helpers
    var emitFlags: NodeFlags;

    var inStrictMode: boolean;

    // If we are binding an assignment pattern, we will bind certain expressions differently.
    var inAssignmentPattern = false;

    var symbolCount = 0;

    var Symbol: new (flags: SymbolFlags, name: string) => Symbol;
    var classifiableNames: Set<string>;

    var unreachableFlow = createFlowNode(
        FlowFlags.Unreachable,
        /*node*/ undefined,
        /*antecedent*/ undefined
    );
    var reportedUnreachableFlow = createFlowNode(
        FlowFlags.Unreachable,
        /*node*/ undefined,
        /*antecedent*/ undefined
    );
    var bindBinaryExpressionFlow = createBindBinaryExpressionFlow();
        
    return bindSourceFile;

    function bindSourceFile(f: SourceFile, opts: CompilerOptions) {        
        file = f;
        options = opts;        
        classifiableNames = new Set<string>();
        symbolCount = 0;

        Symbol = objectAllocator.getSymbolConstructor();

        // Attach debugging information if necessary
        Debug.attachFlowNodeDebugInfo(unreachableFlow);
        Debug.attachFlowNodeDebugInfo(reportedUnreachableFlow);

        if (!file.locals) {
            tracing?.push(tracing.Phase.Bind, "bindSourceFile", { path: file.path }, /*separateBeginAndEnd*/ true);
            bind(file);
            tracing?.pop();
            file.symbolCount = symbolCount;
            file.classifiableNames = classifiableNames;
            delayedBindJSDocTypedefTag();
            delayedBindJSDocVariableTag();
            // bindJSDocImports();
        }

        file = undefined!;
        options = undefined!;
        // languageVersion = undefined!;
        parent = undefined!;
        container = undefined!;
        parentContainer = undefined!;
        blockScopeContainer = undefined!;
        lastContainer = undefined!;
        delayedTypeAliases = undefined!;
        delayedVarTags = undefined!;
        // jsDocImports = undefined!;
        seenThisKeyword = false;
        currentFlow = undefined!;
        currentBreakTarget = undefined;
        currentContinueTarget = undefined;
        currentReturnTarget = undefined;
        currentTrueTarget = undefined;
        currentFalseTarget = undefined;
        currentExceptionTarget = undefined;
        activeLabelList = undefined;
        hasExplicitReturn = false;
        hasFlowEffects = false;
        inAssignmentPattern = false;
        emitFlags = NodeFlags.None;      
    }

    function bind(node:Node|undefined): void {
        if (!node) return;

        setParent(node, parent);
        if (tracing) (node as TracingNode).tracingPath = file.path;

        // Even though in the AST the jsdoc @typedef node belongs to the current node,
        // its symbol might be in the same scope with the current node's symbol. Consider:
        //
        //     /** @typedef {string | number} MyType */
        //     function foo();
        //
        // Here the current node is "foo", which is a container, but the scope of "MyType" should
        // not be inside "foo". Therefore we always bind @typedef before bind the parent node,
        // and skip binding this tag later when binding all the other jsdoc tags.

        // First we bind declaration nodes to a symbol if possible. We'll both create a symbol
        // and then potentially add the symbol to an appropriate symbol table. Possible
        // destination symbol tables are:
        //
        //  1) The 'exports' table of the current container's symbol.
        //  2) The 'members' table of the current container's symbol.
        //  3) The 'locals' table of the current container.
        //
        // However, not all symbols will end up in any of these tables. 'Anonymous' symbols
        // (like TypeLiterals for example) will not be put in any table.
        bindWorker(node);
        // Then we recurse into the children of the node to bind them as well. For certain
        // symbols we do specialized work when we recurse. For example, we'll keep track of
        // the current 'container' node when it changes. This helps us know which symbol table
        // a local should go into for example. Since terminal nodes are known not to have
        // children, as an optimization we don't process those.
        if (node.kind > SyntaxKind.LastToken) {
            const saveParent = parent;
            parent = node;
            const containerFlags = getContainerFlags(node);
            if (containerFlags === ContainerFlags.None) {
                bindChildren(node);
            }
            else {
                bindContainer(node as HasContainerFlags, containerFlags);
            }
            parent = saveParent;
        } else {
            const saveParent = parent;
            if (node.kind === SyntaxKind.EndOfFileToken) parent = node;
            bindJSDoc(node);
            parent = saveParent;
        }
    }

    function bindJSDoc(node: Node) {
        if (hasJSDocNodes(node)) {
            if (isInJSFile(node)) {
                for (const j of node.jsDoc!) {
                    bind(j);
                }
            }
            else {
                for (const j of node.jsDoc!) {
                    setParent(j, node);
                    setParentRecursive(j, /*incremental*/ false);
                }
            }
        }
    }

    function bindExpressionStatement(node: ExpressionStatement): void {
        bind(node.expression);
        maybeBindExpressionFlowIfCall(node.expression);
    }
    
    function bindChildren(node: Node): void {
        const saveInAssignmentPattern = inAssignmentPattern;
        // Most nodes aren't valid in an assignment pattern, so we clear the value here
        // and set it before we descend into nodes that could actually be part of an assignment pattern.
        inAssignmentPattern = false;
        if (checkUnreachable(node)) {
            bindEachChild(node);
            bindJSDoc(node);
            inAssignmentPattern = saveInAssignmentPattern;
            return;
        }
        if (node.kind >= SyntaxKind.FirstStatement && node.kind <= SyntaxKind.LastStatement && (!options.allowUnreachableCode || node.kind === SyntaxKind.ReturnStatement)) {
            (node as HasFlowNode).flowNode = currentFlow;
        }
        switch (node.kind) {
            case SyntaxKind.DefineDirective:
                // bind the name & arguments only    
                // do not bind the contents
                bind((node as DefineDirective).name);
                bindEach((node as DefineDirective).arguments, bind);
                break;
            case SyntaxKind.WhileStatement:
                bindWhileStatement(node as WhileStatement);
                break;
            case SyntaxKind.DoWhileStatement:
                bindDoWhileStatement(node as DoWhileStatement);
                break;
            case SyntaxKind.ForStatement:
                bindForStatement(node as ForStatement);
                break;
            case SyntaxKind.ForEachStatement:            
                bindForInOrForOfStatement(node as ForEachStatement);
                break;
            case SyntaxKind.IfStatement:
                bindIfStatement(node as IfStatement);
                break;
            case SyntaxKind.ReturnStatement:
            // case SyntaxKind.ThrowStatement:
                bindReturnOrThrow(node as ReturnStatement);// | ThrowStatement);
                break;
            case SyntaxKind.BreakStatement:
            case SyntaxKind.ContinueStatement:
                bindBreakOrContinueStatement(node as BreakOrContinueStatement);
                break;
            // case SyntaxKind.TryStatement:
            //     bindTryStatement(node as TryStatement);
            //     break;
            case SyntaxKind.SwitchStatement:
                bindSwitchStatement(node as SwitchStatement);
                break;
            case SyntaxKind.CaseBlock:
                bindCaseBlock(node as CaseBlock);
                break;
            case SyntaxKind.CaseClause:
                bindCaseClause(node as CaseClause);
                break;
            case SyntaxKind.ExpressionStatement:                
                bindExpressionStatement(node as ExpressionStatement);
                break;
            // case SyntaxKind.LabeledStatement:
            //     bindLabeledStatement(node as LabeledStatement);
            //     break;
            case SyntaxKind.PrefixUnaryExpression:
                bindPrefixUnaryExpressionFlow(node as PrefixUnaryExpression);
                break;
            case SyntaxKind.PostfixUnaryExpression:
                bindPostfixUnaryExpressionFlow(node as PostfixUnaryExpression);
                break;
            case SyntaxKind.BinaryExpression:
                // if (isDestructuringAssignment(node)) {
                //     // Carry over whether we are in an assignment pattern to
                //     // binary expressions that could actually be an initializer
                //     inAssignmentPattern = saveInAssignmentPattern;
                //     bindDestructuringAssignmentFlow(node);
                //     return;
                // }
                bindBinaryExpressionFlow(node as BinaryExpression);
                break;            
            case SyntaxKind.ConditionalExpression:
                bindConditionalExpressionFlow(node as ConditionalExpression);
                break;
            case SyntaxKind.VariableDeclaration:
                bindVariableDeclarationFlow(node as VariableDeclaration);
                break;
            case SyntaxKind.PropertyAccessExpression:
            case SyntaxKind.ElementAccessExpression:
                bindAccessExpressionFlow(node as AccessExpression);
                break;            
            case SyntaxKind.CallExpression:
            case SyntaxKind.NewExpression:
                bindCallExpressionFlow(node as CallExpression);
                break;            
            // case SyntaxKind.NonNullExpression:
            //     bindNonNullExpressionFlow(node as NonNullExpression);
            //     break;            
            case SyntaxKind.JSDocTypedefTag:
            case SyntaxKind.JSDocCallbackTag:
            case SyntaxKind.JSDocEnumTag:
                bindJSDocTypeAlias(node as JSDocTypedefTag | JSDocCallbackTag);
                break;
            case SyntaxKind.JSDocVariableTag:
                bindJSDocVariableTag(node as JSDocVariableTag);
            // // In source files and blocks, bind functions first to match hoisting that occurs at runtime
            // case SyntaxKind.JSDocImportTag:
            //     bindJSDocImportTag(node as JSDocImportTag);
            //     break;
            case SyntaxKind.SourceFile: {
                // TS used `bindEachFunctionsFirst` here
                // but in LPC, we need the variables to be bound in order
                // so that their flow nodes are set correctly
                bindEach((node as SourceFile).statements);                
                bind((node as SourceFile).endOfFileToken);
                break;
            }                    
            case SyntaxKind.InheritDeclaration:
                bindInheritDeclaration(node as InheritDeclaration);                
                break;
            case SyntaxKind.Block:
            //case SyntaxKind.ModuleBlock:
                // bindEachFunctionsFirst((node as Block).statements);
                bindEach((node as Block).statements);                
                break;
            case SyntaxKind.BindingElement:
                bindBindingElementFlow(node as BindingElement);
                break;            
            case SyntaxKind.Parameter:
                bindParameterFlow(node as ParameterDeclaration);
                break;            
            case SyntaxKind.ObjectLiteralExpression:
            case SyntaxKind.ArrayLiteralExpression:
            case SyntaxKind.PropertyAssignment:
            case SyntaxKind.SpreadElement:            
            case SyntaxKind.MappingLiteralExpression:
            case SyntaxKind.NewStructExpression:
            case SyntaxKind.InlineClosureExpression:
            case SyntaxKind.ByRefElement:
                // Carry over whether we are in an assignment pattern of Object and Array literals
                // as well as their children that are valid assignment targets.
                inAssignmentPattern = saveInAssignmentPattern;
                // falls through
            default:
                bindEachChild(node);
                break;
        }
        bindJSDoc(node);
        inAssignmentPattern = saveInAssignmentPattern;
    }

    // All container nodes are kept on a linked list in declaration order. This list is used by
    // the getLocalNameOfContainer function in the type checker to validate that the local name
    // used for a container is unique.
    function bindContainer(node: Mutable<HasContainerFlags>, containerFlags: ContainerFlags) {
        // Before we recurse into a node's children, we first save the existing parent, container
        // and block-container.  Then after we pop out of processing the children, we restore
        // these saved values.
        const saveContainer = container;
        const saveThisParentContainer = parentContainer;
        const savedBlockScopeContainer = blockScopeContainer;

        // Depending on what kind of node this is, we may have to adjust the current container
        // and block-container.   If the current node is a container, then it is automatically
        // considered the current block-container as well.  Also, for containers that we know
        // may contain locals, we eagerly initialize the .locals field. We do this because
        // it's highly likely that the .locals will be needed to place some child in (for example,
        // a parameter, or variable declaration).
        //
        // However, we do not proactively create the .locals for block-containers because it's
        // totally normal and common for block-containers to never actually have a block-scoped
        // variable in them.  We don't want to end up allocating an object for every 'block' we
        // run into when most of them won't be necessary.
        //
        // Finally, if this is a block-container, then we clear out any existing .locals object
        // it may contain within it.  This happens in incremental scenarios.  Because we can be
        // reusing a node from a previous compilation, that node may have had 'locals' created
        // for it.  We must clear this so we don't accidentally move any stale data forward from
        // a previous compilation.
        if (containerFlags & ContainerFlags.IsContainer) {
            if (node.kind !== SyntaxKind.InlineClosureExpression) {                
                parentContainer = container;
            }
            container = blockScopeContainer = node as IsContainer;
            if (containerFlags & ContainerFlags.HasLocals) {
                (container as HasLocals).locals = createSymbolTable();
                addToContainerChain(container as HasLocals);
            }
        }
        else if (containerFlags & ContainerFlags.IsBlockScopedContainer) {
            blockScopeContainer = node as IsBlockScopedContainer;
            if (containerFlags & ContainerFlags.HasLocals) {
                (blockScopeContainer as HasLocals).locals = undefined;
            }
        }  
        if (containerFlags & ContainerFlags.IsControlFlowContainer) {
            const saveCurrentFlow = currentFlow;
            const saveBreakTarget = currentBreakTarget;
            const saveContinueTarget = currentContinueTarget;
            const saveReturnTarget = currentReturnTarget;
            const saveExceptionTarget = currentExceptionTarget;
            const saveActiveLabelList = activeLabelList;
            const saveHasExplicitReturn = hasExplicitReturn;
            const isImmediatelyInvoked = (
                containerFlags & ContainerFlags.IsFunctionExpression &&
                //!hasSyntacticModifier(node, ModifierFlags.Async) &&
                !(node as FunctionLikeDeclaration).asteriskToken &&
                !!getImmediatelyInvokedFunctionExpression(node)
            );
            // A non-async, non-generator IIFE is considered part of the containing control flow. Return statements behave
            // similarly to break statements that exit to a label just past the statement body.
            if (!isImmediatelyInvoked) {
                currentFlow = createFlowNode(FlowFlags.Start, /*node*/ undefined, /*antecedent*/ undefined);
                if (containerFlags & (ContainerFlags.IsFunctionExpression | ContainerFlags.IsFunctionLike | ContainerFlags.IsObjectLiteralOrClassExpressionMethodOrAccessor)) {
                    currentFlow.node = node as FunctionExpression | InlineClosureExpression | FunctionDeclaration | MethodDeclaration;
                }
            }
            // We create a return control flow graph for IIFEs and constructors. For constructors
            // we use the return control flow graph in strict property initialization checks.
            currentReturnTarget = isImmediatelyInvoked || (node.kind === SyntaxKind.FunctionDeclaration || node.kind === SyntaxKind.FunctionExpression) ? createBranchLabel() : undefined;
            currentExceptionTarget = undefined;
            currentBreakTarget = undefined;
            currentContinueTarget = undefined;
            activeLabelList = undefined;
            hasExplicitReturn = false;
            bindChildren(node);
            // Reset all reachability check related flags on node (for incremental scenarios)
            node.flags &= ~NodeFlags.ReachabilityAndEmitFlags;
            if (!(currentFlow.flags & FlowFlags.Unreachable) && containerFlags & ContainerFlags.IsFunctionLike && nodeIsPresent((node as FunctionLikeDeclaration).body)) {
                node.flags |= NodeFlags.HasImplicitReturn;
                if (hasExplicitReturn) node.flags |= NodeFlags.HasExplicitReturn;
                (node as FunctionLikeDeclaration).endFlowNode = currentFlow;
            }
            if (node.kind === SyntaxKind.SourceFile) {
                node.flags |= emitFlags;
                (node as SourceFile).endFlowNode = currentFlow;
            }

            if (currentReturnTarget) {
                addAntecedent(currentReturnTarget, currentFlow);
                currentFlow = finishFlowLabel(currentReturnTarget);                
                if (node.kind === SyntaxKind.FunctionDeclaration || node.kind === SyntaxKind.FunctionExpression) {
                    (node as FunctionLikeDeclaration).returnFlowNode = currentFlow;
                }
            }
            if (!isImmediatelyInvoked) {
                currentFlow = saveCurrentFlow;
            }
            currentBreakTarget = saveBreakTarget;
            currentContinueTarget = saveContinueTarget;
            currentReturnTarget = saveReturnTarget;
            currentExceptionTarget = saveExceptionTarget;
            activeLabelList = saveActiveLabelList;
            hasExplicitReturn = saveHasExplicitReturn;
        } else {
            bindChildren(node);
        }

        container = saveContainer;
        parentContainer = saveThisParentContainer;
        blockScopeContainer = savedBlockScopeContainer;              
    }

    function bindEach(nodes: NodeArray<Node> | undefined, bindFunction: (node: Node) => void = bind): void {
        if (nodes === undefined) {
            return;
        }

        forEach(nodes, bindFunction);
    }
    
    function bindEachChild(node: Node) {
        forEachChild(node, bind, bindEach);
    }

    function setFlowNodeReferenced(flow: FlowNode) {
        // On first reference we set the Referenced flag, thereafter we set the Shared flag
        flow.flags |= flow.flags & FlowFlags.Referenced ? FlowFlags.Shared : FlowFlags.Referenced;
    }

    function finishFlowLabel(flow: FlowLabel): FlowNode {
        const antecedents = flow.antecedent;
        if (!antecedents) {
            return unreachableFlow;
        }
        if (antecedents.length === 1) {
            return antecedents[0];
        }
        return flow;
    }
    
    function addAntecedent(label: FlowLabel, antecedent: FlowNode): void {
        if (!(antecedent.flags & FlowFlags.Unreachable) && !contains(label.antecedent, antecedent)) {
            (label.antecedent || (label.antecedent = [])).push(antecedent);
            setFlowNodeReferenced(antecedent);
        }
    }

    function createFlowCondition(flags: FlowFlags.TrueCondition | FlowFlags.FalseCondition, antecedent: FlowNode, expression: Expression | undefined) {
        if (antecedent.flags & FlowFlags.Unreachable) {
            return antecedent;
        }
        if (!expression) {
            return flags & FlowFlags.TrueCondition ? antecedent : unreachableFlow;
        }
        if (
            (isTruthyLiteral(expression) && flags & FlowFlags.FalseCondition ||
                isFalsyLiteral(expression) && flags & FlowFlags.TrueCondition) 
            /*&& !isExpressionOfOptionalChainRoot(expression) && !isNullishCoalesce(expression.parent)*/
        ) {
            return unreachableFlow;
        }
        if (!isNarrowingExpression(expression)) {
            return antecedent;
        }
        setFlowNodeReferenced(antecedent);
        return createFlowNode(flags, expression, antecedent) as FlowCondition;
    }

    function checkUnreachable(node:Node): boolean {
        if (!(currentFlow.flags & FlowFlags.Unreachable)) {
            return false;
        }
        if (currentFlow === unreachableFlow) {
            const reportError =
                // report error on all statements except empty ones
                (isStatementButNotDeclaration(node) && node.kind !== SyntaxKind.EmptyStatement) ||
                // report error on class declarations
                node.kind === SyntaxKind.ClassDeclaration;// ||
                // report error on instantiated modules or const-enums only modules if preserveConstEnums is set
                // (node.kind === SyntaxKind.ModuleDeclaration && shouldReportErrorOnModuleDeclaration(node as ModuleDeclaration));

            if (reportError) {
                currentFlow = reportedUnreachableFlow;

                if (!options.allowUnreachableCode) {
                    // unreachable code is reported if
                    // - user has explicitly asked about it AND
                    // - statement is in not ambient context (statements in ambient context is already an error
                    //   so we should not report extras) AND
                    //   - node is not variable statement OR
                    //   - node is block scoped variable statement OR
                    //   - node is not block scoped variable statement and at least one variable declaration has initializer
                    //   Rationale: we don't want to report errors on non-initialized var's since they are hoisted
                    //   On the other side we do want to report errors on non-initialized 'lets' because of TDZ
                    const isError = unreachableCodeIsError(options) &&
                        !(node.flags & NodeFlags.Ambient) &&
                        (
                            !isVariableStatement(node) ||
                            !!(getCombinedNodeFlags(node.declarationList) & NodeFlags.BlockScoped) ||
                            node.declarationList.declarations.some(d => !!d.initializer)
                        );

                    eachUnreachableRange(node, (start, end) => errorOrSuggestionOnRange(isError, start, end, Diagnostics.Unreachable_code_detected));
                }
            }
        }
        return true;
    }

    function errorOrSuggestionOnRange(isError: boolean, startNode: Node, endNode: Node, message: DiagnosticMessage): void {        
        // suggestions don't need to be logged for include context
        if (!isError && isInIncludeContext(startNode)) return;

        const nodeFile = isInIncludeContext(startNode) ? getSourceFileOrIncludeOfNode(startNode) : file;
        addErrorOrSuggestionDiagnostic(isError, { pos: getTokenPosOfNode(startNode, nodeFile), end: endNode.end }, message, nodeFile);
    }

    function addErrorOrSuggestionDiagnostic(isError: boolean, range: TextRange, message: DiagnosticMessage, nodeFile: SourceFileBase = file): void {
        const diag = createFileDiagnostic(nodeFile, range.pos, range.end - range.pos, message);
        if (isError) {
            file.bindDiagnostics.push(diag);
        }
        else {
            file.bindSuggestionDiagnostics = append(file.bindSuggestionDiagnostics, { ...diag, category: DiagnosticCategory.Suggestion });
        }
    }
    
    function addToContainerChain(next: HasLocals) {
        if (lastContainer) {
            lastContainer.nextContainer = next;
        }

        lastContainer = next;
    }
    
    function createBranchLabel() {
        return createFlowNode(FlowFlags.BranchLabel, /*node*/ undefined, /*antecedent*/ undefined) as FlowLabel;
    }
    
    function bindWorker(node: Node) {
        // do speciallized binding work here        
        switch (node.kind) {
             /* Strict mode checks */
             case SyntaxKind.Identifier:
                // for typedef type names with namespaces, bind the new jsdoc type symbol here
                // because it requires all containing namespaces to be in effect, namely the
                // current "blockScopeContainer" needs to be set to its immediate namespace parent.
                if (node.flags & NodeFlags.IdentifierIsInJSDocNamespace) {
                    let parentNode = node.parent;
                    while (parentNode /*&& !isJSDocTypeAlias(parentNode)*/) {
                        parentNode = parentNode.parent;
                    }                    
                    bindBlockScopedDeclaration(parentNode as Declaration, SymbolFlags.TypeAlias, SymbolFlags.TypeAliasExcludes);
                    break;
                }
                if (currentFlow && (isExpression(node) || parent.kind === SyntaxKind.ShorthandPropertyAssignment)) {
                    (node as Identifier).flowNode = currentFlow;
                }                
                return checkContextualIdentifier(node as Identifier);
            case SyntaxKind.SourceFile:
                //updateStrictModeStatementList((node as SourceFile).statements);
                return bindSourceFileIfExternalModule();
            case SyntaxKind.DefineDirective:
                return bindDefineDirective(node as DefineDirective);   
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.StructDeclaration:
                return bindBlockScopedDeclaration(node as Declaration, SymbolFlags.TypeAlias, SymbolFlags.TypeAliasExcludes);
            case SyntaxKind.VariableDeclaration:
                return bindVariableDeclarationOrBindingElement(node as VariableDeclaration);
            case SyntaxKind.Parameter:
                return bindParameter(node as ParameterDeclaration);            
            case SyntaxKind.FunctionDeclaration:
                return bindFunctionDeclaration(node as FunctionDeclaration);                        
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.InlineClosureExpression:
                return bindFunctionExpression(node as InlineClosureExpression | FunctionExpression);
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.PropertySignature:
                return bindPropertyWorker(node as PropertyDeclaration | PropertySignature);
            case SyntaxKind.PropertyAssignment:
            case SyntaxKind.ShorthandPropertyAssignment:
                return bindPropertyOrMethodOrAccessor(node as Declaration, SymbolFlags.Property, SymbolFlags.PropertyExcludes);
            // case SyntaxKind.CallSignature:
            // case SyntaxKind.ConstructSignature:
            case SyntaxKind.IndexSignature:
                return declareSymbolAndAddToSymbolTable(node as Declaration, SymbolFlags.Signature, SymbolFlags.None);            
            case SyntaxKind.JSDocClassTag:
                return bindJSDocClassTag(node as JSDocClassTag);
            case SyntaxKind.FunctionType:
            case SyntaxKind.JSDocFunctionType:
            case SyntaxKind.JSDocSignature:            
                return bindFunctionOrConstructorType(node as SignatureDeclaration | JSDocSignature);
            case SyntaxKind.TypePredicate:
                break; // Binding the children will handle everything
            case SyntaxKind.TypeParameter:
                return bindTypeParameter(node as TypeParameterDeclaration);                
            case SyntaxKind.CallExpression:
                const assignmentKind = getAssignmentDeclarationKind(node as CallExpression);
                switch (assignmentKind) {
                    // case AssignmentDeclarationKind.ObjectDefinePropertyValue:
                    //     return bindObjectDefinePropertyAssignment(node as BindableObjectDefinePropertyCall);
                    // case AssignmentDeclarationKind.ObjectDefinePropertyExports:
                    //     return bindObjectDefinePropertyExport(node as BindableObjectDefinePropertyCall);
                    // case AssignmentDeclarationKind.ObjectDefinePrototypeProperty:
                    //     return bindObjectDefinePrototypeProperty(node as BindableObjectDefinePropertyCall);
                    case AssignmentDeclarationKind.None:
                        break; // Nothing to do
                    default:
                        return Debug.fail("Unknown call expression assignment declaration kind");
                }
                //if (isInJSFile(node)) {
                //    bindCallExpression(node as CallExpression);
                //}
                return;            
            case SyntaxKind.BindingElement:
                (node as BindingElement).flowNode = currentFlow;
                bindVariableDeclarationOrBindingElement(node as BindingElement);
                // if node type changed to binary expression, then fall through. otherwise return
                if ((node as Node).kind !== SyntaxKind.BinaryExpression) return;            
            case SyntaxKind.PropertyAccessExpression:
            case SyntaxKind.ElementAccessExpression:
                const expr = node as PropertyAccessExpression | ElementAccessExpression;
                if (currentFlow && isNarrowableReference(expr)) {
                    expr.flowNode = currentFlow;
                }                                
                break;
            case SyntaxKind.TypeLiteral:
            case SyntaxKind.JSDocTypeLiteral:
            case SyntaxKind.MappedType:
                return bindAnonymousTypeWorker(node as TypeLiteralNode | MappedTypeNode | JSDocTypeLiteral);            
                case SyntaxKind.TypeAliasDeclaration:
                return bindBlockScopedDeclaration(node as Declaration, SymbolFlags.TypeAlias, SymbolFlags.TypeAliasExcludes);
            case SyntaxKind.JSDocParameterTag:
                if (node.parent.kind === SyntaxKind.JSDocSignature) {
                    return bindParameter(node as JSDocParameterTag);
                }
                if (node.parent.kind !== SyntaxKind.JSDocTypeLiteral) {
                    break;
                }
                // falls through
            case SyntaxKind.JSDocPropertyTag:
                const propTag = node as JSDocPropertyLikeTag;
                const flags = propTag.isBracketed || propTag.typeExpression && propTag.typeExpression.type.kind === SyntaxKind.JSDocOptionalType ?
                    SymbolFlags.Property | SymbolFlags.Optional :
                    SymbolFlags.Property;
                return declareSymbolAndAddToSymbolTable(propTag, flags, SymbolFlags.PropertyExcludes);
            case SyntaxKind.JSDocTypedefTag:
            case SyntaxKind.JSDocCallbackTag:
            case SyntaxKind.JSDocEnumTag:
                return (delayedTypeAliases || (delayedTypeAliases = [])).push(node as JSDocTypedefTag | JSDocCallbackTag);
            case SyntaxKind.JSDocVariableTag:
                return (delayedVarTags || (delayedVarTags = [])).push(node as JSDocVariableTag);
            case SyntaxKind.JSDocOverloadTag:
                return bind((node as JSDocOverloadTag).typeExpression);
            // case SyntaxKind.JSDocImportTag:
            //     return (jsDocImports || (jsDocImports = [])).push(node as JSDocImportTag);
            case SyntaxKind.BinaryExpression:
                const specialKind = getAssignmentDeclarationKind(node as BinaryExpression);
                switch (specialKind) {
                    case AssignmentDeclarationKind.Property:
                        const expression = ((node as BinaryExpression).left as AccessExpression).expression;
                        Debug.fail("implement me - specialkind binary expression");
                        // if (isInJSFile(node) && isIdentifier(expression)) {
                        //     const symbol = lookupSymbolForName(blockScopeContainer, expression.text);
                        //     if (isThisInitializedDeclaration(symbol?.valueDeclaration)) {
                        //         bindThisPropertyAssignment(node as BindablePropertyAssignmentExpression);
                        //         break;
                        //     }
                        // }
                        // bindSpecialPropertyAssignment(node as BindablePropertyAssignmentExpression);
                        break;
                    case AssignmentDeclarationKind.None:
                        // Nothing to do
                        break;
                    default:
                        Debug.fail("Unknown binary expression special property assignment kind");
                }
                return;            
        }

        //console.warn("implement me - bindWorker " + Debug.formatSyntaxKind(node.kind));
    }

    function bindFunctionExpression(node: FunctionExpression | InlineClosureExpression) {
        // if (!file.isDeclarationFile && !(node.flags & NodeFlags.Ambient)) {
        //     if (isAsyncFunction(node)) {
        //         emitFlags |= NodeFlags.HasAsyncFunctions;
        //     }
        // }
        if (currentFlow) {
            node.flowNode = currentFlow;
        }
        // checkStrictModeFunctionName(node);
        const bindingName = node.name ? node.name.text : InternalSymbolName.Function;
        return bindAnonymousDeclaration(node, SymbolFlags.Function, bindingName);
    }
    
    function bindJSDocClassTag(node: JSDocClassTag) {
        bindEachChild(node);
        const host = getHostSignatureFromJSDoc(node);
        if (host && host.kind !== SyntaxKind.MethodDeclaration) {
            addDeclarationToSymbol(host.symbol, host, SymbolFlags.Class);
        }
    }
    
    function bindFunctionOrConstructorType(node: SignatureDeclaration | JSDocSignature): void {
        // For a given function symbol "<...>(...) => T" we want to generate a symbol identical
        // to the one we would get for: { <...>(...): T }
        //
        // We do that by making an anonymous type literal symbol, and then setting the function
        // symbol as its sole member. To the rest of the system, this symbol will be indistinguishable
        // from an actual type literal symbol you would have gotten had you used the long form.
        const symbol = createSymbol(SymbolFlags.Signature, getDeclarationName(node)!); // TODO: GH#18217
        addDeclarationToSymbol(symbol, node, SymbolFlags.Signature);

        const typeLiteralSymbol = createSymbol(SymbolFlags.TypeLiteral, InternalSymbolName.Type);
        addDeclarationToSymbol(typeLiteralSymbol, node, SymbolFlags.TypeLiteral);
        typeLiteralSymbol.members = createSymbolTable();
        typeLiteralSymbol.members.set(symbol.name, symbol);
    }

    function bindAnonymousTypeWorker(node: TypeLiteralNode | MappedTypeNode | JSDocTypeLiteral) {
        return bindAnonymousDeclaration(node as Declaration, SymbolFlags.TypeLiteral, InternalSymbolName.Type);
    }    

    function lookupSymbolForPropertyAccess(node: BindableStaticNameExpression, lookupContainer: IsContainer | IsBlockScopedContainer | EntityNameExpression = container): Symbol | undefined {
        if (isIdentifier(node)) {
            return lookupSymbolForName(lookupContainer, node.text);
        }
        else {
            const symbol = lookupSymbolForPropertyAccess(node.expression);
            return symbol && symbol.exports && symbol.exports.get(getElementOrPropertyAccessName(node));
        }
    }
    
    function bindPropertyAssignment(name: BindableStaticNameExpression, propertyAccess: BindableStaticAccessExpression, isPrototypeProperty: boolean, containerIsClass: boolean) {                
        bindPotentiallyNewExpandoMemberToNamespace(propertyAccess, undefined, isPrototypeProperty);
    }

    function bindPotentiallyNewExpandoMemberToNamespace(declaration: BindableStaticAccessExpression | CallExpression, namespaceSymbol: Symbol | undefined, isPrototypeProperty: boolean) {
        return false;
        // if (!namespaceSymbol || !isExpandoSymbol(namespaceSymbol)) {
        //     return;
        // }

        // // Set up the members collection if it doesn't exist already
        // const symbolTable = isPrototypeProperty ?
        //     (namespaceSymbol.members || (namespaceSymbol.members = createSymbolTable())) :
        //     (namespaceSymbol.exports || (namespaceSymbol.exports = createSymbolTable()));

        // let includes = SymbolFlags.None;
        // let excludes = SymbolFlags.None;
        // // Method-like
        // if (isFunctionLikeDeclaration(getAssignedExpandoInitializer(declaration)!)) {
        //     includes = SymbolFlags.Method;
        //     excludes = SymbolFlags.MethodExcludes;
        // }
        // // Maybe accessor-like
        // else if (isCallExpression(declaration) && isBindableObjectDefinePropertyCall(declaration)) {
        //     if (
        //         some(declaration.arguments[2].properties, p => {
        //             const id = getNameOfDeclaration(p);
        //             return !!id && isIdentifier(id) && idText(id) === "set";
        //         })
        //     ) {
        //         // We mix in `SymbolFLags.Property` so in the checker `getTypeOfVariableParameterOrProperty` is used for this
        //         // symbol, instead of `getTypeOfAccessor` (which will assert as there is no real accessor declaration)
        //         includes |= SymbolFlags.SetAccessor | SymbolFlags.Property;
        //         excludes |= SymbolFlags.SetAccessorExcludes;
        //     }
        //     if (
        //         some(declaration.arguments[2].properties, p => {
        //             const id = getNameOfDeclaration(p);
        //             return !!id && isIdentifier(id) && idText(id) === "get";
        //         })
        //     ) {
        //         includes |= SymbolFlags.GetAccessor | SymbolFlags.Property;
        //         excludes |= SymbolFlags.GetAccessorExcludes;
        //     }
        // }

        // if (includes === SymbolFlags.None) {
        //     includes = SymbolFlags.Property;
        //     excludes = SymbolFlags.PropertyExcludes;
        // }

        // declareSymbol(symbolTable, namespaceSymbol, declaration, includes | SymbolFlags.Assignment, excludes & ~SymbolFlags.Assignment);
    }

    function bindPropertyWorker(node: PropertyDeclaration | PropertySignature) {
        // const isAutoAccessor = isAutoAccessorPropertyDeclaration(node);
        const includes = SymbolFlags.Property;// isAutoAccessor ? SymbolFlags.Accessor : SymbolFlags.Property;
        const excludes = SymbolFlags.PropertyExcludes;// isAutoAccessor ? SymbolFlags.AccessorExcludes : SymbolFlags.PropertyExcludes;
        return bindPropertyOrMethodOrAccessor(node, includes | SymbolFlags.None, excludes);
    }
    
    function bindPropertyOrMethodOrAccessor(node: Declaration, symbolFlags: SymbolFlags, symbolExcludes: SymbolFlags) {
        // if (!file.isDeclarationFile && !(node.flags & NodeFlags.Ambient) && isAsyncFunction(node)) {
        //     emitFlags |= NodeFlags.HasAsyncFunctions;
        // }
        
        if (currentFlow && isObjectLiteralOrClassExpressionMethodOrAccessor(node)) {
            node.flowNode = currentFlow;
        }

        return hasDynamicName(node)
            ? bindAnonymousDeclaration(node, symbolFlags, InternalSymbolName.Computed) :
            declareSymbolAndAddToSymbolTable(node, symbolFlags, symbolExcludes);
    }
    
    // The binder visits every node in the syntax tree so it is a convenient place to perform a single localized
    // check for reserved words used as identifiers in strict mode code, as well as `yield` or `await` in
    // [Yield] or [Await] contexts, respectively.
    function checkContextualIdentifier(node: Identifier) {
        // Report error only if there are no parse errors in file
        if (
            !file.parseDiagnostics.length &&
            !(node.flags & NodeFlags.Ambient) &&
            !(node.flags & NodeFlags.JSDoc) &&
            !isIdentifierName(node)
        ) {
            // strict mode identifiers
            const originalKeywordKind = identifierToKeywordKind(node);
            if (originalKeywordKind === undefined) {
                return;
            }

            if (
                inStrictMode &&
                originalKeywordKind >= SyntaxKind.FirstFutureReservedWord &&
                originalKeywordKind <= SyntaxKind.LastFutureReservedWord
            ) {
                console.warn("implement me - checkContextualIdentifier");
                //file.bindDiagnostics.push(createDiagnosticForNode(node, getStrictModeIdentifierMessage(node), declarationNameToString(node)));
            }
            // else if (originalKeywordKind === SyntaxKind.AwaitKeyword) {
            //     if (isExternalModule(file) && isInTopLevelContext(node)) {
            //         file.bindDiagnostics.push(createDiagnosticForNode(node, Diagnostics.Identifier_expected_0_is_a_reserved_word_at_the_top_level_of_a_module, declarationNameToString(node)));
            //     }
            //     else if (node.flags & NodeFlags.AwaitContext) {
            //         file.bindDiagnostics.push(createDiagnosticForNode(node, Diagnostics.Identifier_expected_0_is_a_reserved_word_that_cannot_be_used_here, declarationNameToString(node)));
            //     }
            // }
            // else if (originalKeywordKind === SyntaxKind.YieldKeyword && node.flags & NodeFlags.YieldContext) {
            //     file.bindDiagnostics.push(createDiagnosticForNode(node, Diagnostics.Identifier_expected_0_is_a_reserved_word_that_cannot_be_used_here, declarationNameToString(node)));
            // }
        }
    }
    
    function bindDefineDirective(node: DefineDirective) {
        // define directives are always bound to the file
        
        const saveContainer = container;
        container = file;
        declareSymbolAndAddToSymbolTable(node, SymbolFlags.Define, SymbolFlags.DefineExcludes);
        container = saveContainer;
    }

    function bindFunctionDeclaration(node: FunctionDeclaration) {
        if (!file.isDeclarationFile && !(node.flags & NodeFlags.Ambient)) {
            // TODO: async
            // if (isAsyncFunction(node)) {
            //     emitFlags |= NodeFlags.HasAsyncFunctions;
            // }
        }

        if (currentFlow) {
            node.flowNode = currentFlow;
        }
        
        // only exclude functions from declaration if there is no body (meaning it is a function header decl).
        const excludes = !node.body ? SymbolFlags.FunctionExcludes : SymbolFlags.None;
        declareSymbolAndAddToSymbolTable(node, SymbolFlags.Function, SymbolFlags.FunctionExcludes);
    }
    
    // Should not be called on a declaration with a computed property name,
    // unless it is a well known Symbol.
    function getDeclarationName(node: Declaration): string | undefined {
        // if (node.kind === SyntaxKind.ExportAssignment) {
        //     return (node as ExportAssignment).isExportEquals ? InternalSymbolName.ExportEquals : InternalSymbolName.Default;
        // }

        const name = getNameOfDeclaration(node);
        if (name) {
            // if (isAmbientModule(node)) {
            //     const moduleName = getTextOfIdentifierOrLiteral(name as Identifier | StringLiteral);
            //     return (isGlobalScopeAugmentation(node as ModuleDeclaration) ? "__global" : `"${moduleName}"`) as string;
            // }
            // if (name.kind === SyntaxKind.ComputedPropertyName) {
            //     const nameExpression = name.expression;
            //     // treat computed property names where expression is string/numeric literal as just string/numeric literal
            //     if (isStringOrNumericLiteralLike(nameExpression)) {
            //         return escapeLeadingUnderscores(nameExpression.text);
            //     }
            //     if (isSignedNumericLiteral(nameExpression)) {
            //         return tokenToString(nameExpression.operator) + nameExpression.operand.text as string;
            //     }
            //     else {
            //         Debug.fail("Only computed properties with literal names have declaration names");
            //     }
            // }
            // if (isPrivateIdentifier(name)) {
            //     // containingClass exists because private names only allowed inside classes
            //     const containingClass = getContainingClass(node);
            //     if (!containingClass) {
            //         // we can get here in cases where there is already a parse error.
            //         return undefined;
            //     }
            //     const containingClassSymbol = containingClass.symbol;
            //     return getSymbolNameForPrivateIdentifier(containingClassSymbol, name.text);
            // }
            // if (isJsxNamespacedName(name)) {
            //     return getEscapedTextOfJsxNamespacedName(name);
            // }
            return isPropertyNameLiteral(name) ? name.text : undefined;
        }
        switch (node.kind) {
            // case SyntaxKind.Constructor:
            //     return InternalSymbolName.Constructor;
            case SyntaxKind.FunctionType:
            case SyntaxKind.CallSignature:
            case SyntaxKind.JSDocSignature:
                return InternalSymbolName.Call;
            // case SyntaxKind.ConstructorType:
            // case SyntaxKind.ConstructSignature:
            //     return InternalSymbolName.New;
            case SyntaxKind.IndexSignature:
                return InternalSymbolName.Index;
            // case SyntaxKind.ExportDeclaration:
            //     return InternalSymbolName.ExportStar;
            case SyntaxKind.SourceFile:
                // json file should behave as
                // module.exports = ...
                return InternalSymbolName.ExportEquals;
            case SyntaxKind.BinaryExpression:
                if (getAssignmentDeclarationKind(node as BinaryExpression) === AssignmentDeclarationKind.ModuleExports) {
                    // module.exports = ...
                    return InternalSymbolName.ExportEquals;
                }
                Debug.fail("Unknown binary declaration kind");
                break;
            case SyntaxKind.JSDocFunctionType:
                return InternalSymbolName.Call;
                // return (isJSDocConstructSignature(node) ? InternalSymbolName.New : InternalSymbolName.Call);
            case SyntaxKind.Parameter:
                // Parameters with names are handled at the top of this function.  Parameters
                // without names can only come from JSDocFunctionTypes.                
                if (isFunctionDeclaration(node.parent)) {
                    if (node.parent.body) createDiagnosticForNode(node, Diagnostics.Parameter_declaration_expected);    
                    
                    break;
                }

                Debug.assert(node.parent.kind === SyntaxKind.JSDocFunctionType, "Impossible parameter parent kind", () => `parent is: ${Debug.formatSyntaxKind(node.parent.kind)}, expected JSDocFunctionType`);
                // const functionType = node.parent as JSDocFunctionType;
                // const index = functionType.parameters.indexOf(node as ParameterDeclaration);
                // return "arg" + index as string;            
        }
    }    

    function createSymbol(flags: SymbolFlags, name: string): Symbol {
        symbolCount++;
        return new Symbol(flags, name);
    }

    /**
     * Declares a Symbol for the node and adds it to symbols. Reports errors for conflicting identifier names.
     * @param symbolTable - The symbol table which node will be added to.
     * @param parent - node's parent declaration.
     * @param node - The declaration to be added to the symbol table
     * @param includes - The SymbolFlags that node has in addition to its declaration type (eg: export, ambient, etc.)
     * @param excludes - The flags which node cannot be declared alongside in a symbol table. Used to report forbidden declarations.
     */
    function declareSymbol(symbolTable: SymbolTable, parent: Symbol | undefined, node: Declaration, includes: SymbolFlags, excludes: SymbolFlags, isReplaceableByMethod?: boolean, isComputedName?: boolean): Symbol {
        Debug.assert(isComputedName || !hasDynamicName(node));

        // The exported symbol for an export default function/class node is always named "default"
        const name = isComputedName ? InternalSymbolName.Computed : getDeclarationName(node);
       
        let symbol: Symbol | undefined;
        if (name === undefined) {
            symbol = createSymbol(SymbolFlags.None, InternalSymbolName.Missing);
        }
        else {
            // Check and see if the symbol table already has a symbol with this name.  If not,
            // create a new symbol with this name and add it to the table.  Note that we don't
            // give the new symbol any flags *yet*.  This ensures that it will not conflict
            // with the 'excludes' flags we pass in.
            //
            // If we do get an existing symbol, see if it conflicts with the new symbol we're
            // creating.  For example, a 'var' symbol and a 'class' symbol will conflict within
            // the same symbol table.  If we have a conflict, report the issue on each
            // declaration we have for this symbol, and then create a new symbol for this
            // declaration.
            //
            // Note that when properties declared in Javascript constructors
            // (marked by isReplaceableByMethod) conflict with another symbol, the property loses.
            // Always. This allows the common Javascript pattern of overwriting a prototype method
            // with an bound instance method of the same type: `this.method = this.method.bind(this)`
            //
            // If we created a new symbol, either because we didn't have a symbol with this name
            // in the symbol table, or we conflicted with an existing symbol, then just add this
            // node as the sole declaration of the new symbol.
            //
            // Otherwise, we'll be merging into a compatible existing symbol (for example when
            // you have multiple 'vars' with the same name in the same container).  In this case
            // just add this node into the declarations list of the symbol.
            symbol = symbolTable.get(name);            

            if (includes & SymbolFlags.Classifiable) {
                classifiableNames.add(name);
            }

            if (!symbol) {
                symbolTable.set(name, symbol = createSymbol(SymbolFlags.None, name));
                if (isReplaceableByMethod) symbol.isReplaceableByMethod = true;
            }
            else if (isReplaceableByMethod && !symbol.isReplaceableByMethod) {
                // A symbol already exists, so don't add this as a declaration.
                return symbol;
            }
            else if (symbol.flags & excludes) {
                if (symbol.isReplaceableByMethod) {
                    // Javascript constructor-declared symbols can be discarded in favor of
                    // prototype symbols like methods.
                    symbolTable.set(name, symbol = createSymbol(SymbolFlags.None, name));
                }
                else if (!(includes & SymbolFlags.Variable && symbol.flags & SymbolFlags.Assignment)) {
                    // Assignment declarations are allowed to merge with variables, no matter what other flags they have.
                    if (isNamedDeclaration(node)) {
                        setParent(node.name, node);
                    }
                    // Report errors every position with duplicate declaration
                    // Report errors on previous encountered declarations
                    let message = symbol.flags & SymbolFlags.BlockScopedVariable
                        ? Diagnostics.Cannot_redeclare_block_scoped_variable_0
                        : Diagnostics.Duplicate_identifier_0;
                    let messageNeedsName = true;
                    
                    let multipleDefaultExports = false;
                    if (length(symbol.declarations)) {
                        // // If the current node is a default export of some sort, then check if
                        // // there are any other default exports that we need to error on.
                        // // We'll know whether we have other default exports depending on if `symbol` already has a declaration list set.
                        // if (isDefaultExport) {
                        //     message = Diagnostics.A_module_cannot_have_multiple_default_exports;
                        //     messageNeedsName = false;
                        //     multipleDefaultExports = true;
                        // }
                        // else {
                        //     // This is to properly report an error in the case "export default { }" is after export default of class declaration or function declaration.
                        //     // Error on multiple export default in the following case:
                        //     // 1. multiple export default of class declaration or function declaration by checking NodeFlags.Default
                        //     // 2. multiple export default of export assignment. This one doesn't have NodeFlags.Default on (as export default doesn't considered as modifiers)
                        //     if (
                        //         symbol.declarations && symbol.declarations.length &&
                        //         (node.kind === SyntaxKind.ExportAssignment && !(node as ExportAssignment).isExportEquals)
                        //     ) {
                        //         message = Diagnostics.A_module_cannot_have_multiple_default_exports;
                        //         messageNeedsName = false;
                        //         multipleDefaultExports = true;
                        //     }
                        // }
                    }

                    const relatedInformation: DiagnosticRelatedInformation[] = [];
                    // if (isTypeAliasDeclaration(node) && nodeIsMissing(node.type) && hasSyntacticModifier(node, ModifierFlags.Export) && symbol.flags & (SymbolFlags.Alias | SymbolFlags.Type | SymbolFlags.Namespace)) {
                    //     // export type T; - may have meant export type { T }?
                    //     relatedInformation.push(createDiagnosticForNode(node, Diagnostics.Did_you_mean_0, `export type { ${(node.name.text)} }`));
                    // }
                    
                    const declarationName = getNameOfDeclaration(node) || node;
                    forEach(symbol.declarations, (declaration, index) => {
                        const decl =  getNameOfDeclaration(declaration) || declaration;
                        const diag = messageNeedsName ? createDiagnosticForNode(decl, message, getDisplayName(declaration)) : createDiagnosticForNode(decl, message);
                        // file.bindDiagnostics.push(
                        //     multipleDefaultExports ? addRelatedInfo(diag, createDiagnosticForNode(declarationName, index === 0 ? Diagnostics.Another_export_default_is_here : Diagnostics.and_here)) : diag,
                        // );
                        // if (multipleDefaultExports) {
                        //     relatedInformation.push(createDiagnosticForNode(decl, Diagnostics.The_first_export_default_is_here));
                        // }
                    });

                    const diag = messageNeedsName ? createDiagnosticForNode(declarationName, message, getDisplayName(node)) : createDiagnosticForNode(declarationName, message);
                    file.bindDiagnostics.push(addRelatedInfo(diag, ...relatedInformation));

                    symbol = createSymbol(SymbolFlags.None, name);
                }
            }
        }

        addDeclarationToSymbol(symbol, node, includes);
        if (!isDefineDirective(node)) {
            if (symbol.parent) {
                Debug.assert(symbol.parent === parent, "Existing symbol parent should match new one");
            }
            else {
                symbol.parent = parent;
            }
        }

        return symbol;
    }

    function getDisplayName(node: Declaration): string {
        return isNamedDeclaration(node) ? declarationNameToString(node.name) : (Debug.checkDefined(getDeclarationName(node)));
    }

    
    function addDeclarationToSymbol(symbol: Symbol, node: Declaration, symbolFlags: SymbolFlags) {
        symbol.flags |= symbolFlags;

        node.symbol = symbol;
        symbol.declarations = appendIfUnique(symbol.declarations, node);

        if (symbolFlags & (SymbolFlags.Class | SymbolFlags.Enum | SymbolFlags.Module | SymbolFlags.Variable) && !symbol.exports) {
            symbol.exports = createSymbolTable();
        }

        if (symbolFlags & (SymbolFlags.Class | SymbolFlags.Interface | SymbolFlags.TypeLiteral | SymbolFlags.ObjectLiteral) && !symbol.members) {
            symbol.members = createSymbolTable();
        }

        // On merge of const enum module with class or function, reset const enum only flag (namespaces will already recalculate)
        if (symbol.constEnumOnlyModule && (symbol.flags & (SymbolFlags.Function | SymbolFlags.Class | SymbolFlags.RegularEnum))) {
            symbol.constEnumOnlyModule = false;
        }

        if (symbolFlags & SymbolFlags.Value) {
            setValueDeclaration(symbol, node);
        }
    }
    
    /**
     * Inside the binder, we may create a diagnostic for an as-yet unbound node (with potentially no parent pointers, implying no accessible source file)
     * If so, the node _must_ be in the current file (as that's the only way anything could have traversed to it to yield it as the error node)
     * This version of `createDiagnosticForNode` uses the binder's context to account for this, and always yields correct diagnostics even in these situations.
     */
    function createDiagnosticForNode(node: Node, message: DiagnosticMessage, ...args: DiagnosticArguments): DiagnosticWithLocation {        
        return createDiagnosticForNodeInSourceFile(getSourceFileOrIncludeOfNode(node) || file, node, message, ...args);
    }

    function bindReturnOrThrow(node: ReturnStatement /*| ThrowStatement*/): void {
        bind(node.expression);
        if (node.kind === SyntaxKind.ReturnStatement) {
            hasExplicitReturn = true;
            if (currentReturnTarget) {
                addAntecedent(currentReturnTarget, currentFlow);
            }
        }

        // if we are in a catch context, don't mark the flow as unreachable
        if ((node.flags & NodeFlags.CatchContext)==0) {
            currentFlow = unreachableFlow;
        }
        hasFlowEffects = true;
    }

    function doWithConditionalBranches<T>(action: (value: T) => void, value: T, trueTarget: FlowLabel, falseTarget: FlowLabel) {
        const savedTrueTarget = currentTrueTarget;
        const savedFalseTarget = currentFalseTarget;
        currentTrueTarget = trueTarget;
        currentFalseTarget = falseTarget;
        action(value);
        currentTrueTarget = savedTrueTarget;
        currentFalseTarget = savedFalseTarget;
    }
    
    function bindCondition(node: Expression | undefined, trueTarget: FlowLabel, falseTarget: FlowLabel) {
        doWithConditionalBranches(bind, node, trueTarget, falseTarget);
        if (!node || !isLogicalAssignmentExpression(node) && !isLogicalExpression(node)) {// && !(isOptionalChain(node) && isOutermostOptionalChain(node))) {
            addAntecedent(trueTarget, createFlowCondition(FlowFlags.TrueCondition, currentFlow, node));
            addAntecedent(falseTarget, createFlowCondition(FlowFlags.FalseCondition, currentFlow, node));
        }
    }

    function isLogicalAssignmentExpression(node: Node) {
        return isLogicalOrCoalescingAssignmentExpression(node);//skipParentheses(node));
    }

    function isLogicalExpression(node: Node) {
        while (true) {
            if (node.kind === SyntaxKind.ParenthesizedExpression) {
                node = (node as ParenthesizedExpression).expression;
            } else if (node.kind === SyntaxKind.PrefixUnaryExpression && (node as PrefixUnaryExpression).operator === SyntaxKind.ExclamationToken) {
                node = (node as PrefixUnaryExpression).operand;
            }
            else {
                return isLogicalOrCoalescingBinaryExpression(node);
            }
        }
    }

    function bindInheritDeclaration(node: InheritDeclaration): void {
        bind(node.inheritClause);
    }

    function bindIfStatement(node: IfStatement): void {
        const thenLabel = createBranchLabel();
        const elseLabel = createBranchLabel();
        const postIfLabel = createBranchLabel();
        bindCondition(node.expression, thenLabel, elseLabel);
        currentFlow = finishFlowLabel(thenLabel);
        bind(node.thenStatement);
        addAntecedent(postIfLabel, currentFlow);
        currentFlow = finishFlowLabel(elseLabel);
        bind(node.elseStatement);
        addAntecedent(postIfLabel, currentFlow);
        currentFlow = finishFlowLabel(postIfLabel);
    }
    
    function bindBlockScopedDeclaration(node: Declaration, symbolFlags: SymbolFlags, symbolExcludes: SymbolFlags) {
        switch (blockScopeContainer.kind) {            
            case SyntaxKind.SourceFile:
                // put variables in the members table, so that it can be accessed by inheriting objects
                const local = declareSymbol(file.locals, /*parent*/ undefined, node, symbolFlags, symbolExcludes);
                local.exportSymbol = declareSymbol(file.symbol.members!, container.symbol, node, symbolFlags, symbolExcludes);
                node.localSymbol = local;                                
                break;                
            default:
                Debug.assertNode(blockScopeContainer, canHaveLocals);
                if (!blockScopeContainer.locals) {
                    blockScopeContainer.locals = createSymbolTable();
                    addToContainerChain(blockScopeContainer);
                }

                declareSymbol(blockScopeContainer.locals, /*parent*/ undefined, node, symbolFlags, symbolExcludes);
        }
    }

    function declareSymbolAndAddToSymbolTable(node: Declaration, symbolFlags: SymbolFlags, symbolExcludes: SymbolFlags): Symbol | undefined {
        switch (container.kind) {
            // Modules, source files, and classes need specialized handling for how their
            // members are declared (for example, a member of a class will go into a specific
            // symbol table depending on if it is static or not). We defer to specialized
            // handlers to take care of declaring these child members.
            // case SyntaxKind.ModuleDeclaration:
            //     return declareModuleMember(node, symbolFlags, symbolExcludes);

            case SyntaxKind.SourceFile:
                return declareSourceFileMember(node, symbolFlags, symbolExcludes);

            // case SyntaxKind.ClassExpression:
            // case SyntaxKind.ClassDeclaration:
            //     return declareClassMember(node, symbolFlags, symbolExcludes);

            // case SyntaxKind.EnumDeclaration:
            //     return declareSymbol(container.symbol.exports!, container.symbol, node, symbolFlags, symbolExcludes);

            case SyntaxKind.TypeLiteral:
            case SyntaxKind.JSDocTypeLiteral:
            case SyntaxKind.ObjectLiteralExpression:                
            // case SyntaxKind.InterfaceDeclaration:            
                // Interface/Object-types always have their children added to the 'members' of
                // their container. They are only accessible through an instance of their
                // container, and are never in scope otherwise (even inside the body of the
                // object / type / interface declaring them). An exception is type parameters,
                // which are in scope without qualification (similar to 'locals').
                return declareSymbol(container.symbol.members!, container.symbol, node, symbolFlags, symbolExcludes);           
            case SyntaxKind.FunctionType:
            // case SyntaxKind.ConstructorType:
            case SyntaxKind.CallSignature:
            // case SyntaxKind.ConstructSignature:
            case SyntaxKind.JSDocSignature:
            case SyntaxKind.IndexSignature:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.MethodSignature:
            // case SyntaxKind.Constructor:
            // case SyntaxKind.GetAccessor:
            // case SyntaxKind.SetAccessor:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:            
            case SyntaxKind.InlineClosureExpression:            
            case SyntaxKind.StructDeclaration:
            case SyntaxKind.JSDocFunctionType:
            // case SyntaxKind.ClassStaticBlockDeclaration:
            case SyntaxKind.TypeAliasDeclaration:
            case SyntaxKind.MappedType:
            case SyntaxKind.NewExpression:
                // All the children of these container types are never visible through another
                // symbol (i.e. through another symbol's 'exports' or 'members').  Instead,
                // they're only accessed 'lexically' (i.e. from code that exists underneath
                // their container in the tree). To accomplish this, we simply add their declared
                // symbol to the 'locals' of the container.  These symbols can then be found as
                // the type checker walks up the containers, checking them for matching names.
                if (container.locals) Debug.assertNode(container, canHaveLocals);
                return declareSymbol(container.locals!, /*parent*/ undefined, node, symbolFlags, symbolExcludes);
        }
    }

    function setExportContextFlag(node: Mutable<SourceFile>) {
        // A declaration source file or ambient module declaration that contains no export declarations (but possibly regular
        // declarations with export modifiers) is an export context in which declarations are implicitly exported.
        if (node.flags & NodeFlags.Ambient) {
            node.flags |= NodeFlags.ExportContext;
        }
        else {
            node.flags &= ~NodeFlags.ExportContext;
        }
    }

    function bindSourceFileIfExternalModule() {
        setExportContextFlag(file);
        
        bindSourceFileAsExternalModule();
    
        // Create symbol equivalent for the module.exports = {}
        const originalSymbol = file.symbol;
        declareSymbol(file.symbol.exports!, file.symbol, file, SymbolFlags.Property, SymbolFlags.All);
        file.symbol = originalSymbol;    
    }

    function bindSourceFileAsExternalModule() {
        // in LPC, each source file is an object, which we'll represent as a class                
        const fileName = removeFileExtension(getLibRootedFileName(file.fileName, options) ?? file.fileName);
        bindAnonymousDeclaration(file, SymbolFlags.ValueModule | SymbolFlags.Class, `"${fileName}"` as string);
    }

    function bindAnonymousDeclaration(node: Declaration, symbolFlags: SymbolFlags, name: string) {
        const symbol = createSymbol(symbolFlags, name);
        if (symbolFlags & (SymbolFlags.EnumMember | SymbolFlags.ClassMember)) {
            symbol.parent = container.symbol;
        }
        addDeclarationToSymbol(symbol, node, symbolFlags);
        return symbol;
    }

    function bindClassLikeDeclaration(node: ClassLikeDeclaration) {
        if (node.kind === SyntaxKind.ClassDeclaration) {
            bindBlockScopedDeclaration(node, SymbolFlags.Class, SymbolFlags.ClassExcludes);
        }
        else {
            const bindingName = node.name ? node.name.text : InternalSymbolName.Class;
            bindAnonymousDeclaration(node, SymbolFlags.Class, bindingName);
            // Add name of class expression into the map for semantic classifier
            if (node.name) {
                classifiableNames.add(node.name.text);
            }
        }

        const { symbol } = node;

        // TypeScript 1.0 spec (April 2014): 8.4
        // Every class automatically contains a static property member named 'prototype', the
        // type of which is an instantiation of the class type with type Any supplied as a type
        // argument for each type parameter. It is an error to explicitly declare a static
        // property member with the name 'prototype'.
        //
        // Note: we check for this here because this class may be merging into a module.  The
        // module might have an exported variable called 'prototype'.  We can't allow that as
        // that would clash with the built-in 'prototype' for the class.
        // const prototypeSymbol = createSymbol(SymbolFlags.Property | SymbolFlags.Prototype, "prototype" as string);
        // const symbolExport = symbol.exports!.get(prototypeSymbol.name);
        // if (symbolExport) {
        //     if (node.name) {
        //         setParent(node.name, node);
        //     }
        //     file.bindDiagnostics.push(createDiagnosticForNode(symbolExport.declarations![0], Diagnostics.Duplicate_identifier_0, symbolName(prototypeSymbol)));
        // }
        // symbol.exports!.set(prototypeSymbol.name, prototypeSymbol);
        // prototypeSymbol.parent = symbol;
    }

    function bindVariableDeclarationOrBindingElement(node: VariableDeclaration | BindingElement) {    
        const possibleVariableDecl = node.kind === SyntaxKind.VariableDeclaration ? node : node.parent.parent;
        
        if (isBlockOrCatchScoped(node)) {
            // it must be a variable decl without a type
            // it must be in a catch or a var decl list with only 1 declaration
            if (isVariableDeclaration(node) && !node.type && (
                !isVariableDeclarationList(node.parent) || 
                (                        
                    node.parent.declarations.length == 1 && (!isVariableStatement(node.parent.parent) || (node.parent.parent.modifiers?.length ?? 0) == 0)
                )
            )) {
                // LPC does not require type or modifiers when declaring a variable, therefore we 
                // need to check whether this is a true variable declaration, or an assignment.
                // we'll do a symbol lookup in the same way that it is done later, in declarSymbol.
                const name = getDeclarationName(node);
                Debug.assertIsDefined(name, "Expected variable declaration to have a name");
                const symbol = blockScopeContainer && canHaveLocals(blockScopeContainer) ? blockScopeContainer.locals?.get(name) : undefined;

                if (symbol && isAssignmentExpression(node)) {
                    // change to an assignment expression, bind it, and exit.    
                    const binExp = factory.convertToAssignmentExpression(node);
                    // (binExp as Mutable<BinaryExpression>).flags |= NodeFlags.Synthesized;
                    // setParent(binExp, blockScopeContainer);                    
                    //bindBinaryExpressionFlow(binExp);                    
                    return;
                }

                // if a symbol wasn't found, then fall through and declare this is a new variable.
            }

            bindBlockScopedDeclaration(node, SymbolFlags.BlockScopedVariable, SymbolFlags.BlockScopedVariableExcludes);
        }
        else if (isPartOfParameterDeclaration(node)) {
            // It is safe to walk up parent chain to find whether the node is a destructuring parameter declaration
            // because its parent chain has already been set up, since parents are set before descending into children.
            //
            // If node is a binding element in parameter declaration, we need to use ParameterExcludes.
            // Using ParameterExcludes flag allows the compiler to report an error on duplicate identifiers in Parameter Declaration
            // For example:
            //      function foo([a,a]) {} // Duplicate Identifier error
            //      function bar(a,a) {}   // Duplicate Identifier error, parameter declaration in this case is handled in bindParameter
            //                             // which correctly set excluded symbols
            declareSymbolAndAddToSymbolTable(node, SymbolFlags.FunctionScopedVariable, SymbolFlags.ParameterExcludes);
        }
        else {            
            declareSymbolAndAddToSymbolTable(node, SymbolFlags.FunctionScopedVariable, SymbolFlags.FunctionScopedVariableExcludes);
        }
    
    }

    function declareSourceFileMember(node: Declaration, symbolFlags: SymbolFlags, symbolExcludes: SymbolFlags) {        
        if (file.isDefaultLib) {
            // lib/sefun symbols also get declared as non-exports (Because they go on global)
            return declareSymbol(file.locals!, /*parent*/ undefined, node, symbolFlags, symbolExcludes)
        } 
        else if (isDefineDirective(node) || isVariableDeclaration(node) || getCombinedModifierFlags(node) & (ModifierFlags.Private | ModifierFlags.Protected)) {        
            // private sourcefile members do not get exported
            // lib/sefun symbols also get declared as non-exports (Because they go on global)
            return declareSymbol(file.symbol.members!, /*parent*/ undefined, node, symbolFlags, symbolExcludes)
        } 
        
        return declareModuleMember(node, symbolFlags, symbolExcludes);        
    }

    function declareModuleMember(node: Declaration, symbolFlags: SymbolFlags, symbolExcludes: SymbolFlags): Symbol {
        const hasExportModifier = true; // we export everything in LPC !!(getCombinedModifierFlags(node) & ModifierFlags.Export);// || jsdocTreatAsExported(node);
        if (symbolFlags & SymbolFlags.Alias) {
            // if (node.kind === SyntaxKind.ExportSpecifier || (node.kind === SyntaxKind.ImportEqualsDeclaration && hasExportModifier)) {
            //     return declareSymbol(container.symbol.exports!, container.symbol, node, symbolFlags, symbolExcludes);
            // }
            // else {
                Debug.assertNode(container, canHaveLocals);
                return declareSymbol(container.locals!, /*parent*/ undefined, node, symbolFlags, symbolExcludes);
            //}
        }
        else {
            // Exported module members are given 2 symbols: A local symbol that is classified with an ExportValue flag,
            // and an associated export symbol with all the correct flags set on it. There are 2 main reasons:
            //
            //   1. We treat locals and exports of the same name as mutually exclusive within a container.
            //      That means the binder will issue a Duplicate Identifier error if you mix locals and exports
            //      with the same name in the same container.
            //      TODO: Make this a more specific error and decouple it from the exclusion logic.
            //   2. When we checkIdentifier in the checker, we set its resolved symbol to the local symbol,
            //      but return the export symbol (by calling getExportSymbolOfValueSymbolIfExported). That way
            //      when the emitter comes back to it, it knows not to qualify the name if it was found in a containing scope.

            // NOTE: Nested ambient modules always should go to to 'locals' table to prevent their automatic merge
            //       during global merging in the checker. Why? The only case when ambient module is permitted inside another module is module augmentation
            //       and this case is specially handled. Module augmentations should only be merged with original module definition
            //       and should never be merged directly with other augmentation, and the latter case would be possible if automatic merge is allowed.
            //if (isJSDocTypeAlias(node)) Debug.assert(isInJSFile(node)); // We shouldn't add symbols for JSDoc nodes if not in a JS file.
            if (/*!isAmbientModule(node) &&*/ (hasExportModifier || container.flags & NodeFlags.ExportContext)) {
                if (!canHaveLocals(container) || !container.locals) {
                    return declareSymbol(container.symbol.exports!, container.symbol, node, symbolFlags, symbolExcludes); // No local symbol for an unnamed default!
                }
                const exportKind = (symbolFlags & SymbolFlags.Value ? SymbolFlags.ExportValue : 0);
                const local = declareSymbol(container.locals, /*parent*/ undefined, node, exportKind, symbolExcludes);
                local.exportSymbol = declareSymbol(container.symbol.exports!, container.symbol, node, symbolFlags, symbolExcludes);
                node.localSymbol = local;
                return local;
            }
            else {
                Debug.assertNode(container, canHaveLocals);
                return declareSymbol(container.locals!, /*parent*/ undefined, node, symbolFlags, symbolExcludes);
            }
        }
    }


    function bindParameter(node: ParameterDeclaration | JSDocParameterTag) {
        if (node.kind === SyntaxKind.JSDocParameterTag && container.kind !== SyntaxKind.JSDocSignature) {
            return;
        }
        // if (inStrictMode && !(node.flags & NodeFlags.Ambient)) {
        //     // It is a SyntaxError if the identifier eval or arguments appears within a FormalParameterList of a
        //     // strict mode FunctionLikeDeclaration or FunctionExpression(13.1)
        //     checkStrictModeEvalOrArguments(node, node.name);
        // }

        if (isBindingPattern(node.name)) {
            bindAnonymousDeclaration(node, SymbolFlags.FunctionScopedVariable, "__" + (node as ParameterDeclaration).parent.parameters.indexOf(node as ParameterDeclaration) as string);
        }
        else {
            declareSymbolAndAddToSymbolTable(node, SymbolFlags.FunctionScopedVariable, SymbolFlags.ParameterExcludes);
        }    
    }

    function bindEachFunctionsFirst(nodes: NodeArray<Node> | undefined): void {        
        bindEach(nodes, n => n.kind === SyntaxKind.FunctionDeclaration ? bind(n) : undefined);
        bindEach(nodes, n => n.kind !== SyntaxKind.FunctionDeclaration ? bind(n) : undefined);
    }

    function bindBindingElementFlow(node: BindingElement) {
        // When evaluating a binding pattern, the initializer is evaluated before the binding pattern, per:
        // - https://tc39.es/ecma262/#sec-destructuring-binding-patterns-runtime-semantics-iteratorbindinginitialization
        //   - `BindingElement: BindingPattern Initializer?`
        // - https://tc39.es/ecma262/#sec-runtime-semantics-keyedbindinginitialization
        //   - `BindingElement: BindingPattern Initializer?`
        bind(node.dotDotDotToken);
        bind(node.propertyName);
        bindInitializer(node.initializer);
        bind(node.name);
    }
        
    function bindParameterFlow(node: ParameterDeclaration) {
        bindEach(node.modifiers);
        bind(node.dotDotDotToken);        
        bind(node.type);
        bindInitializer(node.initializer);
        bind(node.name);
    }

    // a BindingElement/Parameter does not have side effects if initializers are not evaluated and used. (see GH#49759)
    function bindInitializer(node: Expression | undefined) {
        if (!node) {
            return;
        }
        const entryFlow = currentFlow;
        bind(node);
        if (entryFlow === unreachableFlow || entryFlow === currentFlow) {
            return;
        }
        const exitFlow = createBranchLabel();
        addAntecedent(exitFlow, entryFlow);
        addAntecedent(exitFlow, currentFlow);
        currentFlow = finishFlowLabel(exitFlow);
    }

    function bindVariableDeclarationFlow(node: VariableDeclaration) {
        bindEachChild(node);
        if (node.initializer || isForEachStatement(node.parent.parent)) {
            bindInitializedVariableFlow(node);
        }
    }

    function bindInitializedVariableFlow(node: VariableDeclaration | ArrayBindingElement) {
        const name = !isOmittedExpression(node) ? node.name : undefined;
        if (isBindingPattern(name)) {
            for (const child of name.elements) {
                bindInitializedVariableFlow(child);
            }
        }
        else {
            currentFlow = createFlowMutation(FlowFlags.Assignment, currentFlow, node);
        }
    }

    function createFlowCall(antecedent: FlowNode, node: CallExpression) {
        setFlowNodeReferenced(antecedent);
        hasFlowEffects = true;
        return createFlowNode(FlowFlags.Call, node, antecedent) as FlowCall;
    }
    
    function createFlowMutation(flags: FlowFlags.Assignment | FlowFlags.ArrayMutation, antecedent: FlowNode, node: Expression | VariableDeclaration | ArrayBindingElement) {
        setFlowNodeReferenced(antecedent);
        hasFlowEffects = true;
        const result = createFlowNode(flags, node, antecedent) as FlowAssignment | FlowArrayMutation;
        if (currentExceptionTarget) {
            addAntecedent(currentExceptionTarget, result);
        }
        return result;
    }

    function bindConditionalExpressionFlow(node: ConditionalExpression) {
        const trueLabel = createBranchLabel();
        const falseLabel = createBranchLabel();
        const postExpressionLabel = createBranchLabel();
        const saveCurrentFlow = currentFlow;
        const saveHasFlowEffects = hasFlowEffects;
        hasFlowEffects = false;
        bindCondition(node.condition, trueLabel, falseLabel);
        currentFlow = finishFlowLabel(trueLabel);
        bind(node.questionToken);
        bind(node.whenTrue);
        addAntecedent(postExpressionLabel, currentFlow);
        currentFlow = finishFlowLabel(falseLabel);
        bind(node.colonToken);
        bind(node.whenFalse);
        addAntecedent(postExpressionLabel, currentFlow);
        currentFlow = hasFlowEffects ? finishFlowLabel(postExpressionLabel) : saveCurrentFlow;
        hasFlowEffects ||= saveHasFlowEffects;
    }

    function setContinueTarget(node: Node, target: FlowLabel) {        
        let label = activeLabelList;
        while (label && node.parent.kind === SyntaxKind.LabeledStatement) {
            label.continueTarget = target;
            label = label.next;
            node = node.parent;
        }
        return target;
    }

    function createLoopLabel() {
        return createFlowNode(FlowFlags.LoopLabel, /*node*/ undefined, /*antecedent*/ undefined) as FlowLabel;
    }

    function bindIterativeStatement(node: Statement, breakTarget: FlowLabel, continueTarget: FlowLabel): void {
        const saveBreakTarget = currentBreakTarget;
        const saveContinueTarget = currentContinueTarget;
        currentBreakTarget = breakTarget;
        currentContinueTarget = continueTarget;
        bind(node);
        currentBreakTarget = saveBreakTarget;
        currentContinueTarget = saveContinueTarget;
    }

    function bindWhileStatement(node: WhileStatement): void {
        const preWhileLabel = setContinueTarget(node, createLoopLabel());
        const preBodyLabel = createBranchLabel();
        const postWhileLabel = createBranchLabel();
        addAntecedent(preWhileLabel, currentFlow);
        currentFlow = preWhileLabel;
        bindCondition(node.expression, preBodyLabel, postWhileLabel);
        currentFlow = finishFlowLabel(preBodyLabel);
        bindIterativeStatement(node.statement, postWhileLabel, preWhileLabel);
        addAntecedent(preWhileLabel, currentFlow);
        currentFlow = finishFlowLabel(postWhileLabel);
    }

    function bindDoWhileStatement(node: DoWhileStatement): void {
        const preDoLabel = createLoopLabel();
        const preConditionLabel = setContinueTarget(node, createBranchLabel());
        const postDoLabel = createBranchLabel();
        addAntecedent(preDoLabel, currentFlow);
        currentFlow = preDoLabel;
        bindIterativeStatement(node.statement, postDoLabel, preConditionLabel);
        addAntecedent(preConditionLabel, currentFlow);
        currentFlow = finishFlowLabel(preConditionLabel);
        bindCondition(node.expression, preDoLabel, postDoLabel);
        currentFlow = finishFlowLabel(postDoLabel);
    }

    function bindForStatement(node: ForStatement): void {
        const preLoopLabel = setContinueTarget(node, createLoopLabel());
        const preBodyLabel = createBranchLabel();
        const postLoopLabel = createBranchLabel();
        bind(node.initializer);
        addAntecedent(preLoopLabel, currentFlow);
        currentFlow = preLoopLabel;
        bindCondition(node.condition, preBodyLabel, postLoopLabel);
        currentFlow = finishFlowLabel(preBodyLabel);
        bindIterativeStatement(node.statement, postLoopLabel, preLoopLabel);
        bind(node.incrementor);
        addAntecedent(preLoopLabel, currentFlow);
        currentFlow = finishFlowLabel(postLoopLabel);
    }

    function bindForInOrForOfStatement(node: ForEachStatement): void {
        const preLoopLabel = setContinueTarget(node, createLoopLabel());
        const postLoopLabel = createBranchLabel();
        bind(node.expression);
        addAntecedent(preLoopLabel, currentFlow);
        currentFlow = preLoopLabel;
        
        addAntecedent(postLoopLabel, currentFlow);
        bind(node.initializer);
        if (node.initializer.kind !== SyntaxKind.VariableDeclarationList) {
            bindAssignmentTargetFlow(node.initializer);
        }
        bindIterativeStatement(node.statement, postLoopLabel, preLoopLabel);
        addAntecedent(preLoopLabel, currentFlow);
        currentFlow = finishFlowLabel(postLoopLabel);
    }

    function findActiveLabel(name: string) {
        for (let label = activeLabelList; label; label = label.next) {
            if (label.name === name) {
                return label;
            }
        }
        return undefined;
    }

    function bindBreakOrContinueFlow(node: BreakOrContinueStatement, breakTarget: FlowLabel | undefined, continueTarget: FlowLabel | undefined) {
        const flowLabel = node.kind === SyntaxKind.BreakStatement ? breakTarget : continueTarget;
        if (flowLabel) {
            addAntecedent(flowLabel, currentFlow);
            currentFlow = unreachableFlow;
            hasFlowEffects = true;
        }
    }

    function bindBreakOrContinueStatement(node: BreakOrContinueStatement): void {
        bind(node.label);
        if (node.label) {
            const activeLabel = findActiveLabel(node.label.text);
            if (activeLabel) {
                activeLabel.referenced = true;
                bindBreakOrContinueFlow(node, activeLabel.breakTarget, activeLabel.continueTarget);
            }
        }
        else {
            bindBreakOrContinueFlow(node, currentBreakTarget, currentContinueTarget);
        }
    }
    
    function bindSwitchStatement(node: SwitchStatement): void {
        const postSwitchLabel = createBranchLabel();
        bind(node.expression);
        const saveBreakTarget = currentBreakTarget;
        const savePreSwitchCaseFlow = preSwitchCaseFlow;
        currentBreakTarget = postSwitchLabel;
        preSwitchCaseFlow = currentFlow;
        bindEach(node.preBlock);
        bind(node.caseBlock);
        addAntecedent(postSwitchLabel, currentFlow);
        const hasDefault = forEach(node.caseBlock.clauses, c => c.kind === SyntaxKind.DefaultClause);
        // We mark a switch statement as possibly exhaustive if it has no default clause and if all
        // case clauses have unreachable end points (e.g. they all return). Note, we no longer need
        // this property in control flow analysis, it's there only for backwards compatibility.
        node.possiblyExhaustive = !hasDefault && !postSwitchLabel.antecedent;
        if (!hasDefault) {
            addAntecedent(postSwitchLabel, createFlowSwitchClause(preSwitchCaseFlow, node, 0, 0));
        }
        currentBreakTarget = saveBreakTarget;
        preSwitchCaseFlow = savePreSwitchCaseFlow;
        currentFlow = finishFlowLabel(postSwitchLabel);
    }
    
    function createFlowSwitchClause(antecedent: FlowNode, switchStatement: SwitchStatement, clauseStart: number, clauseEnd: number) {
        setFlowNodeReferenced(antecedent);
        return createFlowNode(FlowFlags.SwitchClause, { switchStatement, clauseStart, clauseEnd }, antecedent) as FlowSwitchClause;
    }

    function isNarrowableReference(expr: Expression): boolean {
        switch (expr.kind) {
            case SyntaxKind.Identifier:
            case SyntaxKind.LambdaIdentifierExpression:
            case SyntaxKind.SuperKeyword:
                return true;
            case SyntaxKind.PropertyAccessExpression:
            case SyntaxKind.ParenthesizedExpression:
            // case SyntaxKind.NonNullExpression:
                return isNarrowableReference((expr as PropertyAccessExpression | ParenthesizedExpression /*| NonNullExpression*/).expression);
            case SyntaxKind.ElementAccessExpression:
                return (isStringOrNumericLiteralLike((expr as ElementAccessExpression).argumentExpression) || isEntityNameExpression((expr as ElementAccessExpression).argumentExpression)) &&
                    isNarrowableReference((expr as ElementAccessExpression).expression);
            case SyntaxKind.BinaryExpression:
                return (expr as BinaryExpression).operatorToken.kind === SyntaxKind.CommaToken && isNarrowableReference((expr as BinaryExpression).right) ||
                    isAssignmentOperator((expr as BinaryExpression).operatorToken.kind) && isLeftHandSideExpression((expr as BinaryExpression).left);
        }
        return false;
    }

    function containsNarrowableReference(expr: Expression): boolean {
        return isNarrowableReference(expr);
    }

    function hasNarrowableArgument(expr: CallExpression) {
        if (expr.arguments) {
            for (const argument of expr.arguments) {
                if (containsNarrowableReference(argument)) {
                    return true;
                }
            }
        }
        if (
            expr.expression.kind === SyntaxKind.PropertyAccessExpression &&
            containsNarrowableReference((expr.expression as PropertyAccessExpression).expression)
        ) {
            return true;
        }
        return false;
    }
    
    function isNarrowingExpression(expr: Expression): boolean {
        switch (expr.kind) {
            case SyntaxKind.Identifier:
                return true;
            case SyntaxKind.PropertyAccessExpression:
            case SyntaxKind.ElementAccessExpression:
                return containsNarrowableReference(expr);
            case SyntaxKind.CallExpression:
                return hasNarrowableArgument(expr as CallExpression);            
            case SyntaxKind.ParenthesizedExpression:
                if (isJSDocTypeAssertion(expr)) {
                    return false;
                }
                //fallthrough
            // case SyntaxKind.NonNullExpression:
                 return isNarrowingExpression((expr as ParenthesizedExpression/* | NonNullExpression*/).expression);
            case SyntaxKind.BinaryExpression:
                return isNarrowingBinaryExpression(expr as BinaryExpression);
            case SyntaxKind.PrefixUnaryExpression:
                return (expr as PrefixUnaryExpression).operator === SyntaxKind.ExclamationToken && isNarrowingExpression((expr as PrefixUnaryExpression).operand);            
        }
        return false;
    }

    function isNarrowingBinaryExpression(expr: BinaryExpression) {
        switch (expr.operatorToken.kind) {
            case SyntaxKind.EqualsToken:
            case SyntaxKind.BarBarEqualsToken:
            case SyntaxKind.AmpersandAmpersandEqualsToken:
            case SyntaxKind.QuestionQuestionEqualsToken:
                return containsNarrowableReference(expr.left);
            case SyntaxKind.EqualsEqualsToken:
            case SyntaxKind.ExclamationEqualsToken:
            case SyntaxKind.EqualsEqualsEqualsToken:
            case SyntaxKind.ExclamationEqualsEqualsToken:
                return isNarrowableOperand(expr.left) || isNarrowableOperand(expr.right) ||
                    isNarrowingTypeofOperands(expr.right, expr.left) || isNarrowingTypeofOperands(expr.left, expr.right);
                    //|| (isBooleanLiteral(expr.right) && isNarrowingExpression(expr.left) || isBooleanLiteral(expr.left) && isNarrowingExpression(expr.right));
            case SyntaxKind.InKeyword:
                return isNarrowingExpression(expr.right);
            case SyntaxKind.CommaToken:
                return isNarrowingExpression(expr.right);
        }
        return false;
    }

    function isNarrowingTypeofOperands(expr1: Expression, expr2: Expression) {
        // lpc does not have typeof
        return false;//isTypeOfExpression(expr1) && isNarrowableOperand(expr1.expression) && isStringLiteralLike(expr2);
    }

    function isNarrowableOperand(expr: Expression): boolean {
        switch (expr.kind) {
            case SyntaxKind.ParenthesizedExpression:
                return isNarrowableOperand((expr as ParenthesizedExpression).expression);
            case SyntaxKind.BinaryExpression:
                switch ((expr as BinaryExpression).operatorToken.kind) {
                    case SyntaxKind.EqualsToken:
                        return isNarrowableOperand((expr as BinaryExpression).left);
                    case SyntaxKind.CommaToken:
                        return isNarrowableOperand((expr as BinaryExpression).right);
                }
        }
        return containsNarrowableReference(expr);
    }


    function bindCaseBlock(node: CaseBlock): void {
        const clauses = node.clauses;
        const isNarrowingSwitch = isTruthyLiteral(node.parent.expression) || isNarrowingExpression(node.parent.expression);
        let fallthroughFlow: FlowNode = unreachableFlow;

        for (let i = 0; i < clauses.length; i++) {
            const clauseStart = i;
            while (!clauses[i].statements.length && i + 1 < clauses.length) {
                if (fallthroughFlow === unreachableFlow) {
                    currentFlow = preSwitchCaseFlow!;
                }
                bind(clauses[i]);
                i++;
            }
            const preCaseLabel = createBranchLabel();
            addAntecedent(preCaseLabel, isNarrowingSwitch ? createFlowSwitchClause(preSwitchCaseFlow!, node.parent, clauseStart, i + 1) : preSwitchCaseFlow!);
            addAntecedent(preCaseLabel, fallthroughFlow);
            currentFlow = finishFlowLabel(preCaseLabel);
            const clause = clauses[i];
            bind(clause);
            fallthroughFlow = currentFlow;
            if (!(currentFlow.flags & FlowFlags.Unreachable) && i !== clauses.length - 1 && options.noFallthroughCasesInSwitch) {
                clause.fallthroughFlowNode = currentFlow;
            }
        }
    }
    
    function bindCaseClause(node: CaseClause): void {
        const saveCurrentFlow = currentFlow;
        currentFlow = preSwitchCaseFlow!;
        bind(node.expression);
        currentFlow = saveCurrentFlow;
        bindEach(node.statements);
    }

    function bindPrefixUnaryExpressionFlow(node: PrefixUnaryExpression) {
        if (node.operator === SyntaxKind.ExclamationToken) {
            const saveTrueTarget = currentTrueTarget;
            currentTrueTarget = currentFalseTarget;
            currentFalseTarget = saveTrueTarget;
            bindEachChild(node);
            currentFalseTarget = currentTrueTarget;
            currentTrueTarget = saveTrueTarget;
        }
        else {
            bindEachChild(node);
            if (node.operator === SyntaxKind.PlusPlusToken || node.operator === SyntaxKind.MinusMinusToken) {
                bindAssignmentTargetFlow(node.operand);
            }
        }
    }

    function bindPostfixUnaryExpressionFlow(node: PostfixUnaryExpression) {
        bindEachChild(node);
        if (node.operator === SyntaxKind.PlusPlusToken || node.operator === SyntaxKind.MinusMinusToken) {
            bindAssignmentTargetFlow(node.operand);
        }
    }

    function bindAssignmentTargetFlow(node: Expression) {
        if (isNarrowableReference(node)) {
            currentFlow = createFlowMutation(FlowFlags.Assignment, currentFlow, node);
        }
        else if (node.kind === SyntaxKind.ArrayLiteralExpression) {
            // LPC doesn't have spread for arrays or destructuring
            for (const e of (node as ArrayLiteralExpression).elements) {
                // if (e.kind === SyntaxKind.SpreadElement) {
                //     bindAssignmentTargetFlow((e as SpreadElement).expression);
                // }
                // else {
                    bindDestructuringTargetFlow(e);
                // }
            }
        }
        else if (node.kind === SyntaxKind.MappingLiteralExpression) {
            for (const p of (node as MappingLiteralExpression).elements) {
                // no destructuring in LPC                
                if (!isOmittedExpression(p) && p.elements) {                    
                    for (const e of p.elements) {
                        bindDestructuringTargetFlow(p);
                    }
                }                
            }
        }
        else if (node.kind === SyntaxKind.ObjectLiteralExpression) {
            for (const p of (node as ObjectLiteralExpression).properties) {
                // no destructuring in LPC
                if (p.kind === SyntaxKind.PropertyAssignment) {
                    bindDestructuringTargetFlow(p.initializer);
                } else 
                if (p.kind === SyntaxKind.ShorthandPropertyAssignment) {
                    bindAssignmentTargetFlow(p.name);
                }
                // else if (p.kind === SyntaxKind.SpreadAssignment) {
                //     bindAssignmentTargetFlow(p.expression);
                // }
            }
        }
    }

    function bindDestructuringTargetFlow(node: Expression) {
        if (node.kind === SyntaxKind.BinaryExpression && (node as BinaryExpression).operatorToken.kind === SyntaxKind.EqualsToken) {
            bindAssignmentTargetFlow((node as BinaryExpression).left);
        }
        else {
            bindAssignmentTargetFlow(node);
        }
    }

    function isStatementCondition(node: Node) {
        const parent = node.parent;
        switch (parent.kind) {
            case SyntaxKind.IfStatement:
            case SyntaxKind.WhileStatement:
            case SyntaxKind.DoWhileStatement:
                return (parent as IfStatement | WhileStatement | DoWhileStatement).expression === node;
            case SyntaxKind.ForStatement:
            case SyntaxKind.ConditionalExpression:
                return (parent as ForStatement | ConditionalExpression).condition === node;
        }
        return false;
    }

    function isTopLevelLogicalExpression(node: Node): boolean {
        while (
            isParenthesizedExpression(node.parent) ||
            isPrefixUnaryExpression(node.parent) && node.parent.operator === SyntaxKind.ExclamationToken
        ) {
            node = node.parent;
        }
        return !isStatementCondition(node) &&
            !isLogicalExpression(node.parent);
            //&& !(isOptionalChain(node.parent) && node.parent.expression === node);
    }

    function createBindBinaryExpressionFlow() {
        interface WorkArea {
            stackIndex: number;
            skip: boolean;
            inStrictModeStack: (boolean | undefined)[];
            parentStack: (Node | undefined)[];
        }

        return createBinaryExpressionTrampoline(onEnter, onLeft, onOperator, onRight, onExit, /*foldState*/ undefined);

        function onEnter(node: BinaryExpression, state: WorkArea | undefined) {
            if (state) {
                state.stackIndex++;
                // Emulate the work that `bind` does before reaching `bindChildren`. A normal call to
                // `bindBinaryExpressionFlow` will already have done this work.
                setParent(node, parent);
                const saveInStrictMode = inStrictMode;
                bindWorker(node);
                const saveParent = parent;
                parent = node;
                state.skip = false;
                state.inStrictModeStack[state.stackIndex] = saveInStrictMode;
                state.parentStack[state.stackIndex] = saveParent;
            }
            else {
                state = {
                    stackIndex: 0,
                    skip: false,
                    inStrictModeStack: [undefined],
                    parentStack: [undefined],
                };
            }
            // TODO: bindLogicalExpression is recursive - if we want to handle deeply nested `&&` expressions
            // we'll need to handle the `bindLogicalExpression` scenarios in this state machine, too
            // For now, though, since the common cases are chained `+`, leaving it recursive is fine
            const operator = node.operatorToken.kind;
            if (isBinaryLogicalOperator(operator) || isLogicalOrCoalescingAssignmentOperator(operator)) {
                if (isTopLevelLogicalExpression(node)) {
                    const postExpressionLabel = createBranchLabel();
                    const saveCurrentFlow = currentFlow;
                    const saveHasFlowEffects = hasFlowEffects;
                    hasFlowEffects = false;
                    bindLogicalLikeExpression(node, postExpressionLabel, postExpressionLabel);
                    currentFlow = hasFlowEffects ? finishFlowLabel(postExpressionLabel) : saveCurrentFlow;
                    hasFlowEffects ||= saveHasFlowEffects;
                }
                else {
                    bindLogicalLikeExpression(node, currentTrueTarget!, currentFalseTarget!);
                }
                state.skip = true;
            }
            return state;
        }

        function onLeft(left: Expression, state: WorkArea, node: BinaryExpression) {
            if (!state.skip) {
                const maybeBound = maybeBind(left);
                if (node.operatorToken.kind === SyntaxKind.CommaToken) {
                    maybeBindExpressionFlowIfCall(left);
                }
                return maybeBound;
            }
        }

        function onOperator(operatorToken: BinaryOperatorToken, state: WorkArea, _node: BinaryExpression) {
            if (!state.skip) {
                bind(operatorToken);
            }
        }

        function onRight(right: Expression, state: WorkArea, node: BinaryExpression) {
            if (!state.skip) {
                const maybeBound = maybeBind(right);
                if (node.operatorToken.kind === SyntaxKind.CommaToken) {
                    maybeBindExpressionFlowIfCall(right);
                }
                return maybeBound;
            }
        }

        function onExit(node: BinaryExpression, state: WorkArea) {
            if (!state.skip) {
                const operator = node.operatorToken.kind;
                if (isAssignmentOperator(operator) && !isAssignmentTarget(node)) {
                    bindAssignmentTargetFlow(node.left);
                    if (operator === SyntaxKind.EqualsToken && node.left.kind === SyntaxKind.ElementAccessExpression) {
                        const elementAccess = node.left as ElementAccessExpression;
                        if (isNarrowableOperand(elementAccess.expression)) {
                            currentFlow = createFlowMutation(FlowFlags.ArrayMutation, currentFlow, node);
                        }
                    }
                }
            }
            const savedInStrictMode = state.inStrictModeStack[state.stackIndex];
            const savedParent = state.parentStack[state.stackIndex];
            if (savedInStrictMode !== undefined) {
                inStrictMode = savedInStrictMode;
            }
            if (savedParent !== undefined) {
                parent = savedParent;
            }
            state.skip = false;
            state.stackIndex--;
        }

        function maybeBind(node: Node) {
            if (node && isBinaryExpression(node)){// && !isDestructuringAssignment(node)) {
                return node;
            }
            bind(node);
        }
    }

    function maybeBindExpressionFlowIfCall(node: Expression) {
        // A top level or comma expression call expression with a dotted function name and at least one argument
        // is potentially an assertion and is therefore included in the control flow.
        if (node.kind === SyntaxKind.CallExpression) {
            const call = node as CallExpression;
            if (call.expression.kind !== SyntaxKind.SuperKeyword && isDottedName(call.expression) && !isErrorCallExpression(call)) {
                currentFlow = createFlowCall(currentFlow, call);
            }
        }
    }

    function isErrorCallExpression(node: CallExpression) {        
        // error() for Fluff
        // raise_error() for LD
        // Fluff has throw too, but it doesn't terminate execution.                
        return isIdentifier(node.expression) && node.expression.text === (file.languageVariant === LanguageVariant.FluffOS ? "error" : "raise_error");
    }

    function bindLogicalLikeExpression(node: BinaryExpression, trueTarget: FlowLabel, falseTarget: FlowLabel) {
        const preRightLabel = createBranchLabel();
        if (node.operatorToken.kind === SyntaxKind.AmpersandAmpersandToken) {
            bindCondition(node.left, preRightLabel, falseTarget);
        }
        else {
            bindCondition(node.left, trueTarget, preRightLabel);
        }
        currentFlow = finishFlowLabel(preRightLabel);
        bind(node.operatorToken);

        if (isLogicalOrCoalescingAssignmentOperator(node.operatorToken.kind)) {
            doWithConditionalBranches(bind, node.right, trueTarget, falseTarget);
            bindAssignmentTargetFlow(node.left);

            addAntecedent(trueTarget, createFlowCondition(FlowFlags.TrueCondition, currentFlow, node));
            addAntecedent(falseTarget, createFlowCondition(FlowFlags.FalseCondition, currentFlow, node));
        }
        else {
            bindCondition(node.right, trueTarget, falseTarget);
        }
    }

    function bindAccessExpressionFlow(node: AccessExpression | PropertyAccessChain | ElementAccessChain) {
        // if (isOptionalChain(node)) {
        //     bindOptionalChainFlow(node);
        // }
        // else {
            bindEachChild(node);
        // }
    }

    function getInferTypeContainer(node: Node): ConditionalTypeNode | undefined {
        const extendsType = findAncestor(node, n => n.parent && isConditionalTypeNode(n.parent) && n.parent.extendsType === n);
        return extendsType && extendsType.parent as ConditionalTypeNode;
    }
    
    function delayedBindJSDocVariableTag() {
        if (!delayedVarTags) {
            return;
        }

        const saveContainer = container;
        const saveLastContainer = lastContainer;
        const saveBlockScopeContainer = blockScopeContainer;
        const saveParent = parent;
        const saveCurrentFlow = currentFlow;
        for (const varTag of delayedVarTags) {
            const host = varTag.parent.parent;
            container = (getEnclosingContainer(host) as IsContainer | undefined) || file;
            blockScopeContainer = (getEnclosingBlockScopeContainer(host) as IsBlockScopedContainer | undefined) || file;
            currentFlow = createFlowNode(FlowFlags.Start, /*node*/ undefined, /*antecedent*/ undefined);
            parent = varTag;
            
            const declName = getNameOfDeclaration(varTag);
            if (declName) {
                parent = varTag.parent;
                const symbolContainer = file; // var tags are always stored at the file level
                Debug.assertNode(symbolContainer, canHaveLocals);
                if (!symbolContainer.locals) {
                    symbolContainer.locals = createSymbolTable();
                    addToContainerChain(symbolContainer);
                }
                
                // get the container for var tags                
                const varTagsSymbol = symbolContainer.locals.get(InternalSymbolName.VarDocTags) ?? createSymbol(SymbolFlags.Variable, InternalSymbolName.VarDocTags);
                varTagsSymbol.members ??= createSymbolTable();
                if (!symbolContainer.locals.has(InternalSymbolName.VarDocTags)) {
                    symbolContainer.locals.set(InternalSymbolName.VarDocTags, varTagsSymbol);
                }

                // add the tag to the container
                declareSymbol(varTagsSymbol.members, file.symbol, varTag, SymbolFlags.BlockScopedVariable, SymbolFlags.BlockScopedVariableExcludes);
            }

            container = saveContainer;
            lastContainer = saveLastContainer;
            blockScopeContainer = saveBlockScopeContainer;
            parent = saveParent;
            currentFlow = saveCurrentFlow;
        }
    }

    function delayedBindJSDocTypedefTag() {
        if (!delayedTypeAliases) {
            return;
        }
        const saveContainer = container;
        const saveLastContainer = lastContainer;
        const saveBlockScopeContainer = blockScopeContainer;
        const saveParent = parent;
        const saveCurrentFlow = currentFlow;
        for (const typeAlias of delayedTypeAliases) {
            const host = typeAlias.parent.parent;
            container = (getEnclosingContainer(host) as IsContainer | undefined) || file;
            blockScopeContainer = (getEnclosingBlockScopeContainer(host) as IsBlockScopedContainer | undefined) || file;
            currentFlow = createFlowNode(FlowFlags.Start, /*node*/ undefined, /*antecedent*/ undefined);
            parent = typeAlias;
            bind(typeAlias.typeExpression);
            const declName = getNameOfDeclaration(typeAlias);
            if ((!typeAlias.fullName) && declName && isPropertyAccessEntityNameExpression(declName.parent)) {
                // typedef anchored to an A.B.C assignment - we need to bind into B's namespace under name C
                const isTopLevel = false;// isTopLevelNamespaceAssignment(declName.parent);
                if (isTopLevel) {
                    // bindPotentiallyMissingNamespaces(file.symbol, declName.parent, isTopLevel, !!findAncestor(declName, d => isPropertyAccessExpression(d) && d.name.escapedText === "prototype"), /*containerIsClass*/ false);
                    // const oldContainer = container;
                    // switch (getAssignmentDeclarationPropertyAccessKind(declName.parent)) {
                    //     case AssignmentDeclarationKind.ExportsProperty:
                    //     case AssignmentDeclarationKind.ModuleExports:
                    //         if (!isExternalOrCommonJsModule(file)) {
                    //             container = undefined!;
                    //         }
                    //         else {
                    //             container = file;
                    //         }
                    //         break;
                    //     case AssignmentDeclarationKind.ThisProperty:
                    //         container = declName.parent.expression;
                    //         break;
                    //     case AssignmentDeclarationKind.PrototypeProperty:
                    //         container = (declName.parent.expression as PropertyAccessEntityNameExpression).name;
                    //         break;
                    //     case AssignmentDeclarationKind.Property:
                    //         container = isExportsOrModuleExportsOrAlias(file, declName.parent.expression) ? file
                    //             : isPropertyAccessExpression(declName.parent.expression) ? declName.parent.expression.name
                    //             : declName.parent.expression;
                    //         break;
                    //     case AssignmentDeclarationKind.None:
                    //         return Debug.fail("Shouldn't have detected typedef or enum on non-assignment declaration");
                    // }
                    // if (container) {
                    //     declareModuleMember(typeAlias, SymbolFlags.TypeAlias, SymbolFlags.TypeAliasExcludes);
                    // }
                    // container = oldContainer;
                }
            }
            else if (!typeAlias.fullName || typeAlias.fullName.kind === SyntaxKind.Identifier) {
                parent = typeAlias.parent;
                bindBlockScopedDeclaration(typeAlias, SymbolFlags.TypeAlias, SymbolFlags.TypeAliasExcludes);
            }
            else {
                bind(typeAlias.fullName);
            }
        }
        container = saveContainer;
        lastContainer = saveLastContainer;
        blockScopeContainer = saveBlockScopeContainer;
        parent = saveParent;
        currentFlow = saveCurrentFlow;
    }


    function bindTypeParameter(node: TypeParameterDeclaration) {
        if (isJSDocTemplateTag(node.parent)) {
            const container: HasLocals | undefined = getEffectiveContainerForJSDocTemplateTag(node.parent);
            if (container) {
                Debug.assertNode(container, canHaveLocals);
                container.locals ??= createSymbolTable();
                declareSymbol(container.locals, /*parent*/ undefined, node, SymbolFlags.TypeParameter, SymbolFlags.TypeParameterExcludes);
            }
            else {
                declareSymbolAndAddToSymbolTable(node, SymbolFlags.TypeParameter, SymbolFlags.TypeParameterExcludes);
            }
        }
        else if (node.parent.kind === SyntaxKind.InferType) {
            const container: HasLocals | undefined = getInferTypeContainer(node.parent);
            if (container) {
                Debug.assertNode(container, canHaveLocals);
                container.locals ??= createSymbolTable();
                declareSymbol(container.locals, /*parent*/ undefined, node, SymbolFlags.TypeParameter, SymbolFlags.TypeParameterExcludes);
            }
            else {
                bindAnonymousDeclaration(node, SymbolFlags.TypeParameter, getDeclarationName(node)!); // TODO: GH#18217
            }
        }
        else {
            declareSymbolAndAddToSymbolTable(node, SymbolFlags.TypeParameter, SymbolFlags.TypeParameterExcludes);
        }
    }
    
    function bindJSDocTypeAlias(node: JSDocTypedefTag | JSDocCallbackTag) {
        bind(node.tagName);
        if (node.fullName) {
            // don't bind the type name yet; that's delayed until delayedBindJSDocTypedefTag
            setParent(node.fullName, node);
            setParentRecursive(node.fullName, /*incremental*/ false);
        }
        if (typeof node.comment !== "string") {
            bindEach(node.comment);
        }
    }

    function bindJSDocVariableTag(node: JSDocVariableTag) {
        bind(node.tagName);
        bind(node.typeExpression);        
        
        if (node.name) {
            // don't bind the type name yet; that's delayed until delayedBindJSDocTypedefTag
            setParent(node.name, node);
            setParentRecursive(node.name, /*incremental*/ false);
        }

        if (typeof node.comment !== "string") {
            bindEach(node.comment);
        }                
    }

    function bindCallExpressionFlow(node: CallExpression | CallChain) {
        if (!node.expression) {
            bindEach(node.arguments);
            return;
        };

        // if (isOptionalChain(node)) {
        //     bindOptionalChainFlow(node);
        // }
        // else {
            // If the target of the call expression is a function expression or arrow function we have
            // an immediately invoked function expression (IIFE). Initialize the flowNode property to
            // the current control flow (which includes evaluation of the IIFE arguments).
            const expr = skipParentheses(node.expression);            
            if (expr.kind === SyntaxKind.FunctionExpression || expr.kind === SyntaxKind.InlineClosureExpression) {                                
                //bindEach(node.typeArguments);
                bindEach(node.arguments);
                bind(node.expression);
            } 
            else if (expr.kind === SyntaxKind.StructType) {
                bindEach(node.arguments);
                bind(node.expression);
            }
            else {
                bindEachChild(node);
                if (node.expression.kind === SyntaxKind.SuperKeyword) {
                    currentFlow = createFlowCall(currentFlow, node);
                } else if (isErrorCallExpression(node)) {
                    currentFlow = unreachableFlow;
                    hasFlowEffects = true;
                }
            }
        //}
        if (node.expression.kind === SyntaxKind.PropertyAccessExpression) {
            const propertyAccess = node.expression as PropertyAccessExpression;
            // push/unshift ops don't exist in LPC
            // if (isIdentifier(propertyAccess.name) && isNarrowableOperand(propertyAccess.expression) && isPushOrUnshiftIdentifier(propertyAccess.name)) {
            //     currentFlow = createFlowMutation(FlowFlags.ArrayMutation, currentFlow, node);
            // }
        }
    }
}

/** @internal */
export const enum ContainerFlags {
    // The current node is not a container, and no container manipulation should happen before
    // recursing into it.
    None = 0,

    // The current node is a container.  It should be set as the current container (and block-
    // container) before recursing into it.  The current node does not have locals.  Examples:
    //
    //      Classes, ObjectLiterals, TypeLiterals, Interfaces...
    IsContainer = 1 << 0,

    // The current node is a block-scoped-container.  It should be set as the current block-
    // container before recursing into it.  Examples:
    //
    //      Blocks (when not parented by functions), Catch clauses, For/For-in/For-of statements...
    IsBlockScopedContainer = 1 << 1,

    // The current node is the container of a control flow path. The current control flow should
    // be saved and restored, and a new control flow initialized within the container.
    IsControlFlowContainer = 1 << 2,

    IsFunctionLike = 1 << 3,
    IsFunctionExpression = 1 << 4,
    HasLocals = 1 << 5,
    IsInterface = 1 << 6,
    IsObjectLiteralOrClassExpressionMethodOrAccessor = 1 << 7,
}

/** @internal */
export function getContainerFlags(node: Node): ContainerFlags {
    switch (node.kind) {
        case SyntaxKind.ClassExpression:
        case SyntaxKind.ClassDeclaration:        
        case SyntaxKind.ObjectLiteralExpression:
        case SyntaxKind.TypeLiteral:
        case SyntaxKind.JSDocTypeLiteral:                
            return ContainerFlags.IsContainer;

        // case SyntaxKind.InterfaceDeclaration:
        //     return ContainerFlags.IsContainer | ContainerFlags.IsInterface;

        // case SyntaxKind.ModuleDeclaration:
        case SyntaxKind.TypeAliasDeclaration:  
        case SyntaxKind.StructDeclaration:      
        case SyntaxKind.MappedType:
        case SyntaxKind.IndexSignature:
            return ContainerFlags.IsContainer | ContainerFlags.HasLocals;

        case SyntaxKind.SourceFile:
            return ContainerFlags.IsContainer | ContainerFlags.IsControlFlowContainer | ContainerFlags.HasLocals;

        // case SyntaxKind.GetAccessor:
        // case SyntaxKind.SetAccessor:
        // case SyntaxKind.MethodDeclaration:
        //     if (isObjectLiteralOrClassExpressionMethodOrAccessor(node)) {
        //         return ContainerFlags.IsContainer | ContainerFlags.IsControlFlowContainer | ContainerFlags.HasLocals | ContainerFlags.IsFunctionLike | ContainerFlags.IsObjectLiteralOrClassExpressionMethodOrAccessor;
        //     }
            // falls through
        // case SyntaxKind.Constructor:
        case SyntaxKind.FunctionDeclaration:        
            return ContainerFlags.IsContainer | ContainerFlags.IsControlFlowContainer | ContainerFlags.HasLocals | ContainerFlags.IsFunctionLike;
        // case SyntaxKind.MethodSignature:
        case SyntaxKind.CallSignature:
        case SyntaxKind.JSDocSignature:
        case SyntaxKind.JSDocFunctionType:
        case SyntaxKind.FunctionType:
        // case SyntaxKind.ConstructSignature:
        // case SyntaxKind.ConstructorType:
        // case SyntaxKind.ClassStaticBlockDeclaration:
            return ContainerFlags.IsContainer | ContainerFlags.IsControlFlowContainer | ContainerFlags.HasLocals | ContainerFlags.IsFunctionLike;

        case SyntaxKind.FunctionExpression:
        case SyntaxKind.InlineClosureExpression:
        case SyntaxKind.DefineDirective:
            return ContainerFlags.IsContainer | ContainerFlags.IsControlFlowContainer | ContainerFlags.HasLocals | ContainerFlags.IsFunctionLike | ContainerFlags.IsFunctionExpression;

        // case SyntaxKind.ModuleBlock:
        //     return ContainerFlags.IsControlFlowContainer;
        case SyntaxKind.PropertyDeclaration:
            return (node as PropertyDeclaration).initializer ? ContainerFlags.IsControlFlowContainer : 0;

        case SyntaxKind.ForStatement:
        case SyntaxKind.ForEachStatement:        
        case SyntaxKind.CaseBlock:
            return ContainerFlags.IsBlockScopedContainer | ContainerFlags.HasLocals;
        case SyntaxKind.NewExpression:
            return ContainerFlags.IsContainer | ContainerFlags.HasLocals;
        case SyntaxKind.Block:
            // do not treat blocks directly inside a function as a block-scoped-container.
            // Locals that reside in this block should go to the function locals. Otherwise 'x'
            // would not appear to be a redeclaration of a block scoped local in the following
            // example:
            //
            //      function foo() {
            //          var x;
            //          let x;
            //      }
            //
            // If we placed 'var x' into the function locals and 'let x' into the locals of
            // the block, then there would be no collision.
            //
            // By not creating a new block-scoped-container here, we ensure that both 'var x'
            // and 'let x' go into the Function-container's locals, and we do get a collision
            // conflict.
            return isFunctionLike(node.parent) || isCatchStatement(node.parent) ? ContainerFlags.None : ContainerFlags.IsBlockScopedContainer | ContainerFlags.HasLocals;
    }

    return ContainerFlags.None;
}

function lookupSymbolForName(container: Node, name: string): Symbol | undefined {
    const local = tryCast(container, canHaveLocals)?.locals?.get(name);
    if (local) {
        return local.exportSymbol ?? local;
    }
    // if (isSourceFile(container) && container.jsGlobalAugmentations && container.jsGlobalAugmentations.has(name)) {
    //     return container.jsGlobalAugmentations.get(name);
    // }
    if (canHaveSymbol(container)) {
        return container.symbol?.exports?.get(name);
    }
}

function eachUnreachableRange(node: Node, cb: (start: Node, last: Node) => void): void {
    if (isStatement(node) && isExecutableStatement(node) && isBlock(node.parent)) {
        const { statements } = node.parent;
        const slice = sliceAfter(statements, node);
        getRangesWhere(slice, isExecutableStatement, (start, afterEnd) => cb(slice[start], slice[afterEnd - 1]));
    }
    else {
        cb(node, node);
    }
}
// As opposed to a pure declaration like an `interface`
function isExecutableStatement(s: Statement): boolean {
    // Don't remove statements that can validly be used before they appear.
    return !isFunctionDeclaration(s) && !isPurelyTypeDeclaration(s) && !isEnumDeclaration(s) &&
        // `var x;` may declare a variable used above
        !(isVariableStatement(s) && !(getCombinedNodeFlags(s) & (NodeFlags.BlockScoped)) && s.declarationList.declarations.some(d => !d.initializer));
}


function isPurelyTypeDeclaration(s: Statement): boolean {
    switch (s.kind) {
        case SyntaxKind.InterfaceDeclaration:
        case SyntaxKind.TypeAliasDeclaration:
            return true;
        // case SyntaxKind.ModuleDeclaration:
        //     return getModuleInstanceState(s as ModuleDeclaration) !== ModuleInstanceState.Instantiated;
        // case SyntaxKind.EnumDeclaration:
        //     return hasSyntacticModifier(s, ModifierFlags.Const);
        default:
            return false;
    }
}
