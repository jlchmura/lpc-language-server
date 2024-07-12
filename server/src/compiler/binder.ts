import { CompilerOptions, Debug, FlowFlags, FlowLabel, FlowNode, HasLocals, IsBlockScopedContainer, IsContainer, Node, objectAllocator, SourceFile, SymbolFlags, Symbol, tracing, setParent, TracingNode, SyntaxKind, isFunctionLike, NodeArray, forEach, forEachChild, Mutable, HasContainerFlags, createSymbolTable, ModifierFlags, FunctionExpression, InlineClosureExpression, NodeFlags, FunctionLikeDeclaration, getImmediatelyInvokedFunctionExpression, nodeIsPresent, contains, isIdentifier, HasFlowNode, performance, VariableDeclaration, isBlockOrCatchScoped, Declaration, canHaveLocals, isPartOfParameterDeclaration, SymbolTable, hasSyntacticModifier, Diagnostics, isNamedDeclaration, length, DiagnosticRelatedInformation, getNameOfDeclaration, appendIfUnique, setValueDeclaration, addRelatedInfo, Identifier, StringLiteral, isPropertyNameLiteral, InternalSymbolName, getAssignmentDeclarationKind, BinaryExpression, AssignmentDeclarationKind, declarationNameToString, createDiagnosticForNodeInSourceFile, getSourceFileOfNode, DiagnosticMessage, DiagnosticArguments, DiagnosticWithLocation } from "./_namespaces/lpc";

const binder = /* @__PURE__ */ createBinder();

/** @internal */
export function bindSourceFile(file: SourceFile, options: CompilerOptions) {
    performance.mark("beforeBind");    
    binder(file, options);    
    performance.mark("afterBind");
    performance.measure("Bind", "beforeBind", "afterBind");
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
            case SyntaxKind.VariableDeclaration:
                return bindVariableDeclarationOrBindingElement(node as VariableDeclaration);
        }
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
            //     return getSymbolNameForPrivateIdentifier(containingClassSymbol, name.escapedText);
            // }
            // if (isJsxNamespacedName(name)) {
            //     return getEscapedTextOfJsxNamespacedName(name);
            // }
            return isPropertyNameLiteral(name) ? name.text : undefined;
        }
        switch (node.kind) {
            // case SyntaxKind.Constructor:
            //     return InternalSymbolName.Constructor;
            // case SyntaxKind.FunctionType:
            // case SyntaxKind.CallSignature:
            // case SyntaxKind.JSDocSignature:
            //     return InternalSymbolName.Call;
            // case SyntaxKind.ConstructorType:
            // case SyntaxKind.ConstructSignature:
            //     return InternalSymbolName.New;
            // case SyntaxKind.IndexSignature:
            //     return InternalSymbolName.Index;
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
            // case SyntaxKind.JSDocFunctionType:
            //     return (isJSDocConstructSignature(node) ? InternalSymbolName.New : InternalSymbolName.Call);
            case SyntaxKind.Parameter:
                // Parameters with names are handled at the top of this function.  Parameters
                // without names can only come from JSDocFunctionTypes.
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
        //Debug.assert(isComputedName || !hasDynamicName(node));

        // The exported symbol for an export default function/class node is always named "default"
        const name = getDeclarationName(node);

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
                   
                    const declarationName = getNameOfDeclaration(node) || node;
                    forEach(symbol.declarations, (declaration, index) => {
                        const decl = getNameOfDeclaration(declaration) || declaration;
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
        if (symbol.parent) {
            Debug.assert(symbol.parent === parent, "Existing symbol parent should match new one");
        }
        else {
            symbol.parent = parent;
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
        return createDiagnosticForNodeInSourceFile(getSourceFileOfNode(node) || file, node, message, ...args);
    }

    function bindBlockScopedDeclaration(node: Declaration, symbolFlags: SymbolFlags, symbolExcludes: SymbolFlags) {
        switch (blockScopeContainer.kind) {            
            case SyntaxKind.SourceFile:
                // if (isExternalOrCommonJsModule(container as SourceFile)) {
                //     declareModuleMember(node, symbolFlags, symbolExcludes);
                //     break;
                // }
                // falls through
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

            // case SyntaxKind.TypeLiteral:
            case SyntaxKind.JSDocTypeLiteral:
            // case SyntaxKind.ObjectLiteralExpression:
            // case SyntaxKind.InterfaceDeclaration:
            // case SyntaxKind.JsxAttributes:
                // Interface/Object-types always have their children added to the 'members' of
                // their container. They are only accessible through an instance of their
                // container, and are never in scope otherwise (even inside the body of the
                // object / type / interface declaring them). An exception is type parameters,
                // which are in scope without qualification (similar to 'locals').
                return declareSymbol(container.symbol.members!, container.symbol, node, symbolFlags, symbolExcludes);

            // case SyntaxKind.FunctionType:
            // case SyntaxKind.ConstructorType:
            // case SyntaxKind.CallSignature:
            // case SyntaxKind.ConstructSignature:
            case SyntaxKind.JSDocSignature:
            // case SyntaxKind.IndexSignature:
            // case SyntaxKind.MethodDeclaration:
            // case SyntaxKind.MethodSignature:
            // case SyntaxKind.Constructor:
            // case SyntaxKind.GetAccessor:
            // case SyntaxKind.SetAccessor:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:            
            case SyntaxKind.InlineClosureExpression:
            // case SyntaxKind.JSDocFunctionType:
            // case SyntaxKind.ClassStaticBlockDeclaration:
            // case SyntaxKind.TypeAliasDeclaration:
            // case SyntaxKind.MappedType:
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

    function bindVariableDeclarationOrBindingElement(node: VariableDeclaration /*| BindingElement*/) {    
        const possibleVariableDecl = node.kind === SyntaxKind.VariableDeclaration ? node : node.parent.parent;
        if (isBlockOrCatchScoped(node)) {
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
        // return isExternalModule(file)
        //     ? declareModuleMember(node, symbolFlags, symbolExcludes) :
        return declareSymbol(file.locals!, /*parent*/ undefined, node, symbolFlags, symbolExcludes);
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