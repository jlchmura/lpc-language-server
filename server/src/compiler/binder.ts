import { CompilerOptions, Debug, FlowFlags, FlowLabel, FlowNode, HasLocals, IsBlockScopedContainer, IsContainer, Node, objectAllocator, SourceFile, SymbolFlags, Symbol, tracing, setParent, TracingNode, SyntaxKind, isFunctionLike, NodeArray, forEach, forEachChild, Mutable, HasContainerFlags, createSymbolTable, ModifierFlags, FunctionExpression, InlineClosureExpression, NodeFlags, FunctionLikeDeclaration, getImmediatelyInvokedFunctionExpression, nodeIsPresent, contains, isIdentifier, HasFlowNode } from "./_namespaces/lpc";


/** @internal */
export function bindSourceFile(file: SourceFile, options: CompilerOptions) {
    // performance.mark("beforeBind");
    // perfLogger?.logStartBindFile("" + file.fileName);
    //binder(file, options);
    // perfLogger?.logStopBindFile();
    // performance.mark("afterBind");
    // performance.measure("Bind", "beforeBind", "afterBind");
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
    var container: IsContainer;// | EntityNameExpression;
    var parentContainer: IsContainer;// | EntityNameExpression; // Container one level up
    var blockScopeContainer: IsBlockScopedContainer;
    var lastContainer: HasLocals;
    //var delayedTypeAliases: (JSDocTypedefTag | JSDocCallbackTag | JSDocEnumTag)[];
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
        
    return bindSourceFile;

    function bindSourceFile(f: SourceFile, opts: CompilerOptions) {
        file = f;
        options = opts;        
        Symbol = objectAllocator.getSymbolConstructor();
        classifiableNames = new Set<string>();

        // Attach debugging information if necessary
        Debug.attachFlowNodeDebugInfo(unreachableFlow);
        Debug.attachFlowNodeDebugInfo(reportedUnreachableFlow);

        if (!file.locals) {
            tracing?.push(tracing.Phase.Bind, "bindSourceFile", { path: file.path }, /*separateBeginAndEnd*/ true);
            bind(file);
            tracing?.pop();
            // file.symbolCount = symbolCount;
            // file.classifiableNames = classifiableNames;
            // delayedBindJSDocTypedefTag();
            // bindJSDocImports();
        }

        file = undefined!;
        options = undefined!;
        //languageVersion = undefined!;
        parent = undefined!;
        container = undefined!;
        parentContainer = undefined!;
        blockScopeContainer = undefined!;
        lastContainer = undefined!;
        // delayedTypeAliases = undefined!;
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
        //emitFlags = NodeFlags.None;      
    }

    function bind(node:Node|undefined): void {
        if (!node) return;

        setParent(node, parent);
        if (tracing) (node as TracingNode).tracingPath = file.path;

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

    function bindJSDoc(node: Node):void {}

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
            // case SyntaxKind.WhileStatement:
            //     bindWhileStatement(node as WhileStatement);
            //     break;
            // case SyntaxKind.DoStatement:
            //     bindDoStatement(node as DoStatement);
            //     break;
            // case SyntaxKind.ForStatement:
            //     bindForStatement(node as ForStatement);
            //     break;
            // case SyntaxKind.ForInStatement:
            // case SyntaxKind.ForOfStatement:
            //     bindForInOrForOfStatement(node as ForInOrOfStatement);
            //     break;
            // case SyntaxKind.IfStatement:
            //     bindIfStatement(node as IfStatement);
            //     break;
            // case SyntaxKind.ReturnStatement:
            // case SyntaxKind.ThrowStatement:
            //     bindReturnOrThrow(node as ReturnStatement | ThrowStatement);
            //     break;
            // case SyntaxKind.BreakStatement:
            // case SyntaxKind.ContinueStatement:
            //     bindBreakOrContinueStatement(node as BreakOrContinueStatement);
            //     break;
            // case SyntaxKind.TryStatement:
            //     bindTryStatement(node as TryStatement);
            //     break;
            // case SyntaxKind.SwitchStatement:
            //     bindSwitchStatement(node as SwitchStatement);
            //     break;
            // case SyntaxKind.CaseBlock:
            //     bindCaseBlock(node as CaseBlock);
            //     break;
            // case SyntaxKind.CaseClause:
            //     bindCaseClause(node as CaseClause);
            //     break;
            // case SyntaxKind.ExpressionStatement:
            //     bindExpressionStatement(node as ExpressionStatement);
            //     break;
            // case SyntaxKind.LabeledStatement:
            //     bindLabeledStatement(node as LabeledStatement);
            //     break;
            // case SyntaxKind.PrefixUnaryExpression:
            //     bindPrefixUnaryExpressionFlow(node as PrefixUnaryExpression);
            //     break;
            // case SyntaxKind.PostfixUnaryExpression:
            //     bindPostfixUnaryExpressionFlow(node as PostfixUnaryExpression);
            //     break;
            // case SyntaxKind.BinaryExpression:
            //     if (isDestructuringAssignment(node)) {
            //         // Carry over whether we are in an assignment pattern to
            //         // binary expressions that could actually be an initializer
            //         inAssignmentPattern = saveInAssignmentPattern;
            //         bindDestructuringAssignmentFlow(node);
            //         return;
            //     }
            //     bindBinaryExpressionFlow(node as BinaryExpression);
            //     break;
            // case SyntaxKind.DeleteExpression:
            //     bindDeleteExpressionFlow(node as DeleteExpression);
            //     break;
            // case SyntaxKind.ConditionalExpression:
            //     bindConditionalExpressionFlow(node as ConditionalExpression);
            //     break;
            // case SyntaxKind.VariableDeclaration:
            //     bindVariableDeclarationFlow(node as VariableDeclaration);
            //     break;
            // case SyntaxKind.PropertyAccessExpression:
            // case SyntaxKind.ElementAccessExpression:
            //     bindAccessExpressionFlow(node as AccessExpression);
            //     break;
            // case SyntaxKind.CallExpression:
            //     bindCallExpressionFlow(node as CallExpression);
            //     break;
            // case SyntaxKind.NonNullExpression:
            //     bindNonNullExpressionFlow(node as NonNullExpression);
            //     break;
            // case SyntaxKind.JSDocTypedefTag:
            // case SyntaxKind.JSDocCallbackTag:
            // case SyntaxKind.JSDocEnumTag:
            //     bindJSDocTypeAlias(node as JSDocTypedefTag | JSDocCallbackTag | JSDocEnumTag);
            //     break;
            // // In source files and blocks, bind functions first to match hoisting that occurs at runtime
            // case SyntaxKind.JSDocImportTag:
            //     bindJSDocImportTag(node as JSDocImportTag);
            //     break;
            // case SyntaxKind.SourceFile: {
            //     bindEachFunctionsFirst((node as SourceFile).statements);
            //     bind((node as SourceFile).endOfFileToken);
            //     break;
            // }
            // case SyntaxKind.Block:
            // case SyntaxKind.ModuleBlock:
            //     bindEachFunctionsFirst((node as Block).statements);
            //     break;
            // case SyntaxKind.BindingElement:
            //     bindBindingElementFlow(node as BindingElement);
            //     break;
            // case SyntaxKind.Parameter:
            //     bindParameterFlow(node as ParameterDeclaration);
            //     break;
            // case SyntaxKind.ObjectLiteralExpression:
            // case SyntaxKind.ArrayLiteralExpression:
            // case SyntaxKind.PropertyAssignment:
            // case SyntaxKind.SpreadElement:
            //     // Carry over whether we are in an assignment pattern of Object and Array literals
            //     // as well as their children that are valid assignment targets.
            //     inAssignmentPattern = saveInAssignmentPattern;
            //     // falls through
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
                if (containerFlags & (ContainerFlags.IsFunctionExpression | ContainerFlags.IsObjectLiteralOrClassExpressionMethodOrAccessor)) {
                    currentFlow.node = node as FunctionExpression | InlineClosureExpression; //| MethodDeclaration ;
                }
            }
            // We create a return control flow graph for IIFEs and constructors. For constructors
            // we use the return control flow graph in strict property initialization checks.
            currentReturnTarget = isImmediatelyInvoked ? createBranchLabel() : undefined;
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

    function checkUnreachable(node:Node): boolean {
        return false;
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
        // case SyntaxKind.ClassExpression:
        // case SyntaxKind.ClassDeclaration:
        // case SyntaxKind.EnumDeclaration:
        // case SyntaxKind.ObjectLiteralExpression:
        // case SyntaxKind.TypeLiteral:
        case SyntaxKind.JSDocTypeLiteral:
        // case SyntaxKind.JsxAttributes:
            return ContainerFlags.IsContainer;

        // case SyntaxKind.InterfaceDeclaration:
        //     return ContainerFlags.IsContainer | ContainerFlags.IsInterface;

        // case SyntaxKind.ModuleDeclaration:
        // case SyntaxKind.TypeAliasDeclaration:
        // case SyntaxKind.MappedType:
        // case SyntaxKind.IndexSignature:
        //     return ContainerFlags.IsContainer | ContainerFlags.HasLocals;

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
        // case SyntaxKind.MethodSignature:
        // case SyntaxKind.CallSignature:
        case SyntaxKind.JSDocSignature:
        case SyntaxKind.JSDocFunctionType:
        // case SyntaxKind.FunctionType:
        // case SyntaxKind.ConstructSignature:
        // case SyntaxKind.ConstructorType:
        // case SyntaxKind.ClassStaticBlockDeclaration:
            return ContainerFlags.IsContainer | ContainerFlags.IsControlFlowContainer | ContainerFlags.HasLocals | ContainerFlags.IsFunctionLike;

        case SyntaxKind.FunctionExpression:
        //case SyntaxKind.ArrowFunction:
            return ContainerFlags.IsContainer | ContainerFlags.IsControlFlowContainer | ContainerFlags.HasLocals | ContainerFlags.IsFunctionLike | ContainerFlags.IsFunctionExpression;

        // case SyntaxKind.ModuleBlock:
        //     return ContainerFlags.IsControlFlowContainer;
        // case SyntaxKind.PropertyDeclaration:
        //     return (node as PropertyDeclaration).initializer ? ContainerFlags.IsControlFlowContainer : 0;

        case SyntaxKind.CatchClause:
        case SyntaxKind.ForStatement:
        case SyntaxKind.ForInStatement:
        // case SyntaxKind.ForOfStatement:
        case SyntaxKind.CaseBlock:
            return ContainerFlags.IsBlockScopedContainer | ContainerFlags.HasLocals;

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
            return isFunctionLike(node.parent) ? ContainerFlags.None : ContainerFlags.IsBlockScopedContainer | ContainerFlags.HasLocals;
    }

    return ContainerFlags.None;
}