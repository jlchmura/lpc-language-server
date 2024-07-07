import { appendIfUnique, contains, forEach, getRangesWhere, length } from "./core";
import { Debug } from "./debug";
import {
    isBinaryExpression,
    isBlock,
    isFunctionDeclaration,
    isParenthesizedExpression,
    isPrefixUnaryExpression,
    isPrivateIdentifier,
    isVariableStatement,
} from "./nodeTests";
import { forEachChild } from "./parser";
import { tokenToString } from "./scanner";
import {
    ArrayBindingElement,
    ArrayLiteralExpression,
    BinaryExpression,
    BinaryOperatorToken,
    CallExpression,
    CompilerOptions,
    ConditionalExpression,
    DoStatement,
    ElementAccessExpression,
    EntityNameExpression,
    Expression,
    FlowArrayMutation,
    FlowAssignment,
    FlowCall,
    FlowCondition,
    FlowFlags,
    FlowLabel,
    FlowNode,
    ForStatement,
    FunctionLikeDeclaration,
    HasContainerFlags,
    HasFlowNode,
    HasLocals,
    Identifier,
    IfStatement,
    IsBlockScopedContainer,
    IsContainer,
    Node,
    NodeArray,
    NodeFlags,
    NonNullExpression,
    ObjectLiteralExpression,
    ParenthesizedExpression,
    PrefixUnaryExpression,
    PrivateIdentifier,
    PropertyAccessExpression,
    SourceFile,
    SpreadElement,
    Statement,
    SuperExpression,
    SymbolFlags,
    SyntaxKind,
    VariableDeclaration,
    WhileStatement,
    LpcSymbol as Symbol,
    FunctionDeclaration,
    Declaration,
    SymbolTable,
    ModifierFlags,
    InternalSymbolName,
    AssignmentDeclarationKind,
    JSDocFunctionType,
    ParameterDeclaration,
    DiagnosticRelatedInformation,
    DiagnosticMessage,
    DiagnosticWithLocation,
    DiagnosticArguments
} from "./types";
import {
    Mutable,
    addRelatedInfo,
    createBinaryExpressionTrampoline,
    createDiagnosticForNodeInSourceFile,
    createSymbolTable,
    declarationNameToString,
    getAssignmentDeclarationKind,
    getContainingClass,
    getEscapedTextOfIdentifierOrLiteral,
    getImmediatelyInvokedFunctionExpression,
    getSourceFileOfNode,
    getSymbolNameForPrivateIdentifier,
    hasDynamicName,
    hasSyntacticModifier,
    isAssignmentOperator,
    isAssignmentTarget,
    isDottedName,
    isEntityNameExpression,
    isLogicalOrCoalescingAssignmentExpression,
    isLogicalOrCoalescingAssignmentOperator,
    isLogicalOrCoalescingBinaryExpression,
    isLogicalOrCoalescingBinaryOperator,
    isOptionalChain,
    isPropertyNameLiteral,
    isSignedNumericLiteral,
    isStringOrNumericLiteralLike,
    nodeIsPresent,
    objectAllocator,
    setParent,
    setValueDeclaration,
    skipParentheses,
    sliceAfter,
    unreachableCodeIsError,
} from "./utilities";
import {
    canHaveLocals,
    getCombinedNodeFlags,
    getNameOfDeclaration,
    isBooleanLiteral,
    isExpression,
    isFunctionLike,
    isLeftHandSideExpression,
    isNamedDeclaration,
    isStatement,
    isStatementButNotDeclaration,
} from "./utilitiesPublic";

interface ActiveLabel {
    next: ActiveLabel | undefined;
    name: string;
    breakTarget: FlowLabel;
    continueTarget: FlowLabel | undefined;
    referenced: boolean;
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
export function createFlowNode(
    flags: FlowFlags,
    node: unknown,
    antecedent: FlowNode | FlowNode[] | undefined
): FlowNode {
    return { flags, id: 0, node, antecedent } as FlowNode;
    //return Debug.attachFlowNodeDebugInfo({ flags, id: 0, node, antecedent } as FlowNode);
}

const binder = createBinder();

/** @internal */
export function bindSourceFile(file: SourceFile, options: CompilerOptions) {
    // performance.mark("beforeBind");
    // perfLogger?.logStartBindFile("" + file.fileName);
    binder(file, options);
    // perfLogger?.logStopBindFile();
    // performance.mark("afterBind");
    // performance.measure("Bind", "beforeBind", "afterBind");
}

export function isIdentifier(node: Node): node is Identifier {
    return node.kind === SyntaxKind.Identifier;
}

function createBinder(): (file: SourceFile, options: CompilerOptions) => void {
    // Why var? It avoids TDZ checks in the runtime which can be costly.
    // See: https://github.com/microsoft/TypeScript/issues/52924
    /* eslint-disable no-var */
    var file: SourceFile;
    var options: CompilerOptions;
    var parent: Node;
    var container: IsContainer | EntityNameExpression;
    var thisParentContainer: IsContainer | EntityNameExpression; // Container one level up
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
    /* eslint-enable no-var */

    return bindSourceFile;

    function bindSourceFile(f: SourceFile, opts: CompilerOptions) {
        file = f;
        options = opts;
        //inStrictMode = bindInStrictMode(file, opts);
        classifiableNames = new Set();
        symbolCount = 0;

        Symbol = objectAllocator.getSymbolConstructor();

        // Attach debugging information if necessary
        //Debug.attachFlowNodeDebugInfo(unreachableFlow);
        //Debug.attachFlowNodeDebugInfo(reportedUnreachableFlow);

        if (!file.locals) {
            //tracing?.push(tracing.Phase.Bind, "bindSourceFile", { path: file.path }, /*separateBeginAndEnd*/ true);
            bind(file);
            //tracing?.pop();
            file.symbolCount = symbolCount;
            file.classifiableNames = classifiableNames;
            // TODO: delayedBindJSDocTypedefTag();
            // TODO: bindJSDocImports();
        }

        file = undefined!;
        options = undefined!;        
        parent = undefined!;
        container = undefined!;
        thisParentContainer = undefined!;
        blockScopeContainer = undefined!;
        lastContainer = undefined!;
        //delayedTypeAliases = undefined!;
        //jsDocImports = undefined!;
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
    }

    function createBindBinaryExpressionFlow() {
        interface WorkArea {
            stackIndex: number;
            skip: boolean;
            inStrictModeStack: (boolean | undefined)[];
            parentStack: (Node | undefined)[];
        }

        return createBinaryExpressionTrampoline(
            onEnter,
            onLeft,
            onOperator,
            onRight,
            onExit,
            /*foldState*/ undefined
        );

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
            } else {
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
            if (
                isLogicalOrCoalescingBinaryOperator(operator) ||
                isLogicalOrCoalescingAssignmentOperator(operator)
            ) {
                if (isTopLevelLogicalExpression(node)) {
                    const postExpressionLabel = createBranchLabel();
                    const saveCurrentFlow = currentFlow;
                    const saveHasFlowEffects = hasFlowEffects;
                    hasFlowEffects = false;
                    bindLogicalLikeExpression(
                        node,
                        postExpressionLabel,
                        postExpressionLabel
                    );
                    currentFlow = hasFlowEffects
                        ? finishFlowLabel(postExpressionLabel)
                        : saveCurrentFlow;
                    hasFlowEffects ||= saveHasFlowEffects;
                } else {
                    bindLogicalLikeExpression(
                        node,
                        currentTrueTarget!,
                        currentFalseTarget!
                    );
                }
                state.skip = true;
            }
            return state;
        }

        function onLeft(
            left: Expression,
            state: WorkArea,
            node: BinaryExpression
        ) {
            if (!state.skip) {
                const maybeBound = maybeBind(left);
                if (node.operatorToken.kind === SyntaxKind.CommaToken) {
                    maybeBindExpressionFlowIfCall(left);
                }
                return maybeBound;
            }
        }

        function onOperator(
            operatorToken: BinaryOperatorToken,
            state: WorkArea,
            _node: BinaryExpression
        ) {
            if (!state.skip) {
                bind(operatorToken);
            }
        }

        function onRight(
            right: Expression,
            state: WorkArea,
            node: BinaryExpression
        ) {
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
                if (
                    isAssignmentOperator(operator) &&
                    !isAssignmentTarget(node)
                ) {
                    bindAssignmentTargetFlow(node.left);
                    if (
                        operator === SyntaxKind.EqualsToken &&
                        node.left.kind === SyntaxKind.ElementAccessExpression
                    ) {
                        const elementAccess =
                            node.left as ElementAccessExpression;
                        if (isNarrowableOperand(elementAccess.expression)) {
                            currentFlow = createFlowMutation(
                                FlowFlags.ArrayMutation,
                                currentFlow,
                                node
                            );
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
            if (node && isBinaryExpression(node)) {
                return node;
            }
            bind(node);
        }
    }

    function bindLogicalLikeExpression(
        node: BinaryExpression,
        trueTarget: FlowLabel,
        falseTarget: FlowLabel
    ) {
        const preRightLabel = createBranchLabel();
        if (
            node.operatorToken.kind === SyntaxKind.AmpersandAmpersandToken ||
            node.operatorToken.kind === SyntaxKind.AmpersandAmpersandEqualsToken
        ) {
            bindCondition(node.left, preRightLabel, falseTarget);
        } else {
            bindCondition(node.left, trueTarget, preRightLabel);
        }
        currentFlow = finishFlowLabel(preRightLabel);
        bind(node.operatorToken);

        if (isLogicalOrCoalescingAssignmentOperator(node.operatorToken.kind)) {
            doWithConditionalBranches(
                bind,
                node.right,
                trueTarget,
                falseTarget
            );
            bindAssignmentTargetFlow(node.left);

            addAntecedent(
                trueTarget,
                createFlowCondition(FlowFlags.TrueCondition, currentFlow, node)
            );
            addAntecedent(
                falseTarget,
                createFlowCondition(FlowFlags.FalseCondition, currentFlow, node)
            );
        } else {
            bindCondition(node.right, trueTarget, falseTarget);
        }
    }
    
    function bindCondition(node: Expression | undefined, trueTarget: FlowLabel, falseTarget: FlowLabel) {
        doWithConditionalBranches(bind, node, trueTarget, falseTarget);
        if (!node || !isLogicalAssignmentExpression(node) && !isLogicalExpression(node)) {
            addAntecedent(trueTarget, createFlowCondition(FlowFlags.TrueCondition, currentFlow, node));
            addAntecedent(falseTarget, createFlowCondition(FlowFlags.FalseCondition, currentFlow, node));
        }
    }

    function isLogicalAssignmentExpression(node: Node) {
        return isLogicalOrCoalescingAssignmentExpression(skipParentheses(node));
    }

    function createFlowCondition(
        flags: FlowFlags.TrueCondition | FlowFlags.FalseCondition,
        antecedent: FlowNode,
        expression: Expression | undefined
    ) {
        if (antecedent.flags & FlowFlags.Unreachable) {
            return antecedent;
        }
        if (!expression) {
            return flags & FlowFlags.TrueCondition
                ? antecedent
                : unreachableFlow;
        }
        // if (
        //     (expression.kind === SyntaxKind.TrueKeyword && flags & FlowFlags.FalseCondition ||
        //         expression.kind === SyntaxKind.FalseKeyword && flags & FlowFlags.TrueCondition) &&
        //     !isExpressionOfOptionalChainRoot(expression) && !isNullishCoalesce(expression.parent)
        // ) {
        //     return unreachableFlow;
        // }
        if (!isNarrowingExpression(expression)) {
            return antecedent;
        }
        setFlowNodeReferenced(antecedent);
        return createFlowNode(flags, expression, antecedent) as FlowCondition;
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
            containsNarrowableReference(
                (expr.expression as PropertyAccessExpression).expression
            )
        ) {
            return true;
        }
        return false;
    }

    function isNarrowingBinaryExpression(expr: BinaryExpression) {
        switch (expr.operatorToken.kind) {
            case SyntaxKind.EqualsToken:
            case SyntaxKind.BarBarEqualsToken:
            case SyntaxKind.AmpersandAmpersandEqualsToken:
                return containsNarrowableReference(expr.left);
            case SyntaxKind.EqualsEqualsToken:
            case SyntaxKind.ExclamationEqualsToken:
            case SyntaxKind.EqualsEqualsEqualsToken:
            case SyntaxKind.ExclamationEqualsEqualsToken:
                return (
                    isNarrowableOperand(expr.left) ||
                    isNarrowableOperand(expr.right) ||
                    (isBooleanLiteral(expr.right) &&
                        isNarrowingExpression(expr.left)) ||
                    (isBooleanLiteral(expr.left) &&
                        isNarrowingExpression(expr.right))
                );
            case SyntaxKind.InKeyword:
                return isNarrowingExpression(expr.right);
            case SyntaxKind.CommaToken:
                return isNarrowingExpression(expr.right);
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
            // TODO
            // if (isJSDocTypeAssertion(expr)) {
            //     return false;
            // }
            // fallthrough
            case SyntaxKind.NonNullExpression:
                return isNarrowingExpression(
                    (expr as ParenthesizedExpression | NonNullExpression)
                        .expression
                );
            case SyntaxKind.BinaryExpression:
                return isNarrowingBinaryExpression(expr as BinaryExpression);
            case SyntaxKind.PrefixUnaryExpression:
                return (
                    (expr as PrefixUnaryExpression).operator ===
                        SyntaxKind.ExclamationToken &&
                    isNarrowingExpression(
                        (expr as PrefixUnaryExpression).operand
                    )
                );
        }
        return false;
    }

    function doWithConditionalBranches<T>(
        action: (value: T) => void,
        value: T,
        trueTarget: FlowLabel,
        falseTarget: FlowLabel
    ) {
        const savedTrueTarget = currentTrueTarget;
        const savedFalseTarget = currentFalseTarget;
        currentTrueTarget = trueTarget;
        currentFalseTarget = falseTarget;
        action(value);
        currentTrueTarget = savedTrueTarget;
        currentFalseTarget = savedFalseTarget;
    }

    function containsNarrowableReference(expr: Expression): boolean {
        return (
            isNarrowableReference(expr) ||
            (isOptionalChain(expr) &&
                containsNarrowableReference(expr.expression))
        );
    }

    function isNarrowableOperand(expr: Expression): boolean {
        switch (expr.kind) {
            case SyntaxKind.ParenthesizedExpression:
                return isNarrowableOperand(
                    (expr as ParenthesizedExpression).expression
                );
            case SyntaxKind.BinaryExpression:
                switch ((expr as BinaryExpression).operatorToken.kind) {
                    case SyntaxKind.EqualsToken:
                        return isNarrowableOperand(
                            (expr as BinaryExpression).left
                        );
                    case SyntaxKind.CommaToken:
                        return isNarrowableOperand(
                            (expr as BinaryExpression).right
                        );
                }
        }
        return containsNarrowableReference(expr);
    }

    function isTopLevelLogicalExpression(node: Node): boolean {
        while (
            isParenthesizedExpression(node.parent) ||
            (isPrefixUnaryExpression(node.parent) &&
                node.parent.operator === SyntaxKind.ExclamationToken)
        ) {
            node = node.parent;
        }
        return (
            !isStatementCondition(node) &&
            !isLogicalExpression(node.parent) &&
            !(isOptionalChain(node.parent) && node.parent.expression === node)
        );
    }

    function isStatementCondition(node: Node) {
        const parent = node.parent;
        switch (parent.kind) {
            case SyntaxKind.IfStatement:
            case SyntaxKind.WhileStatement:
            case SyntaxKind.DoStatement:
                return (
                    (parent as IfStatement | WhileStatement | DoStatement)
                        .expression === node
                );
            case SyntaxKind.ForStatement:
            case SyntaxKind.ConditionalExpression:
                return (
                    (parent as ForStatement | ConditionalExpression)
                        .condition === node
                );
        }
        return false;
    }

    function isLogicalExpression(node: Node) {
        while (true) {
            if (node.kind === SyntaxKind.ParenthesizedExpression) {
                node = (node as ParenthesizedExpression).expression;
            } else if (
                node.kind === SyntaxKind.PrefixUnaryExpression &&
                (node as PrefixUnaryExpression).operator ===
                    SyntaxKind.ExclamationToken
            ) {
                node = (node as PrefixUnaryExpression).operand;
            } else {
                return isLogicalOrCoalescingBinaryExpression(node);
            }
        }
    }

    function createFlowCall(antecedent: FlowNode, node: CallExpression) {
        setFlowNodeReferenced(antecedent);
        hasFlowEffects = true;
        return createFlowNode(FlowFlags.Call, node, antecedent) as FlowCall;
    }

    function createFlowMutation(
        flags: FlowFlags.Assignment | FlowFlags.ArrayMutation,
        antecedent: FlowNode,
        node: Expression | VariableDeclaration | ArrayBindingElement
    ) {
        setFlowNodeReferenced(antecedent);
        hasFlowEffects = true;
        const result = createFlowNode(flags, node, antecedent) as
            | FlowAssignment
            | FlowArrayMutation;
        if (currentExceptionTarget) {
            addAntecedent(currentExceptionTarget, result);
        }
        return result;
    }

    function setFlowNodeReferenced(flow: FlowNode) {
        // On first reference we set the Referenced flag, thereafter we set the Shared flag
        flow.flags |=
            flow.flags & FlowFlags.Referenced
                ? FlowFlags.Shared
                : FlowFlags.Referenced;
    }

    function addAntecedent(label: FlowLabel, antecedent: FlowNode): void {
        if (
            !(antecedent.flags & FlowFlags.Unreachable) &&
            !contains(label.antecedent, antecedent)
        ) {
            (label.antecedent || (label.antecedent = [])).push(antecedent);
            setFlowNodeReferenced(antecedent);
        }
    }

    function bindAssignmentTargetFlow(node: Expression) {
        if (isNarrowableReference(node)) {
            currentFlow = createFlowMutation(
                FlowFlags.Assignment,
                currentFlow,
                node
            );
        } else if (node.kind === SyntaxKind.ArrayLiteralExpression) {
            for (const e of (node as ArrayLiteralExpression).elements) {
                if (e.kind === SyntaxKind.SpreadElement) {
                    bindAssignmentTargetFlow((e as SpreadElement).expression);
                }
            }
        } else if (node.kind === SyntaxKind.ObjectLiteralExpression) {
            for (const p of (node as ObjectLiteralExpression).properties) {
                if (p.kind === SyntaxKind.ShorthandPropertyAssignment) {
                    bindAssignmentTargetFlow(p.name);
                }
            }
        }
    }

    function isNarrowableReference(expr: Expression): boolean {
        switch (expr.kind) {
            case SyntaxKind.Identifier:
            case SyntaxKind.ColonColonToken:
                return true;
            case SyntaxKind.PropertyAccessExpression:
            case SyntaxKind.ParenthesizedExpression:
            case SyntaxKind.NonNullExpression:
                return isNarrowableReference(
                    (
                        expr as
                            | PropertyAccessExpression
                            | ParenthesizedExpression
                            | NonNullExpression
                    ).expression
                );
            case SyntaxKind.ElementAccessExpression:
                return (
                    (isStringOrNumericLiteralLike(
                        (expr as ElementAccessExpression).argumentExpression
                    ) ||
                        isEntityNameExpression(
                            (expr as ElementAccessExpression).argumentExpression
                        )) &&
                    isNarrowableReference(
                        (expr as ElementAccessExpression).expression
                    )
                );
            case SyntaxKind.BinaryExpression:
                return (
                    ((expr as BinaryExpression).operatorToken.kind ===
                        SyntaxKind.CommaToken &&
                        isNarrowableReference(
                            (expr as BinaryExpression).right
                        )) ||
                    (isAssignmentOperator(
                        (expr as BinaryExpression).operatorToken.kind
                    ) &&
                        isLeftHandSideExpression(
                            (expr as BinaryExpression).left
                        ))
                );
        }
        return false;
    }

    function bind(node: Node | undefined): void {
        if (!node) {
            return;
        }
        setParent(node, parent);
        //if (tracing) (node as TracingNode).tracingPath = file.path;
        const saveInStrictMode = inStrictMode;

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
            } else {
                bindContainer(node as HasContainerFlags, containerFlags);
            }
            parent = saveParent;
        } else {
            const saveParent = parent;
            if (node.kind === SyntaxKind.EndOfFileToken) parent = node;
            bindJSDoc(node);
            parent = saveParent;
        }
        inStrictMode = saveInStrictMode;
    }

    function createBranchLabel() {
        return createFlowNode(
            FlowFlags.BranchLabel,
            /*node*/ undefined,
            /*antecedent*/ undefined
        ) as FlowLabel;
    }

    function addToContainerChain(next: HasLocals) {
        if (lastContainer) {
            lastContainer.nextContainer = next;
        }

        lastContainer = next;
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

    // All container nodes are kept on a linked list in declaration order. This list is used by
    // the getLocalNameOfContainer function in the type checker to validate that the local name
    // used for a container is unique.
    function bindContainer(
        node: Mutable<HasContainerFlags>,
        containerFlags: ContainerFlags
    ) {
        // Before we recurse into a node's children, we first save the existing parent, container
        // and block-container.  Then after we pop out of processing the children, we restore
        // these saved values.
        const saveContainer = container;
        const saveThisParentContainer = thisParentContainer;
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
            // if (node.kind !== SyntaxKind.ArrowFunction) {
            //     thisParentContainer = container;
            // }
            container = blockScopeContainer = node as IsContainer;
            if (containerFlags & ContainerFlags.HasLocals) {
                (container as HasLocals).locals = createSymbolTable();
                addToContainerChain(container as HasLocals);
            }
        } else if (containerFlags & ContainerFlags.IsBlockScopedContainer) {
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
            const isImmediatelyInvoked =
                containerFlags & ContainerFlags.IsFunctionExpression &&
                !!getImmediatelyInvokedFunctionExpression(node);
            // A non-async, non-generator IIFE is considered part of the containing control flow. Return statements behave
            // similarly to break statements that exit to a label just past the statement body.
            if (!isImmediatelyInvoked) {
                currentFlow = createFlowNode(
                    FlowFlags.Start,
                    /*node*/ undefined,
                    /*antecedent*/ undefined
                );
                if (
                    containerFlags &
                    (ContainerFlags.IsFunctionExpression |
                        ContainerFlags.IsObjectLiteralOrClassExpressionMethodOrAccessor)
                ) {
                    currentFlow.node = node; // TODO as FunctionExpression | ArrowFunction | MethodDeclaration;
                }
            }
            // We create a return control flow graph for IIFEs and constructors. For constructors
            // we use the return control flow graph in strict property initialization checks.
            currentReturnTarget = isImmediatelyInvoked
                ? createBranchLabel()
                : undefined;
            currentExceptionTarget = undefined;
            currentBreakTarget = undefined;
            currentContinueTarget = undefined;
            activeLabelList = undefined;
            hasExplicitReturn = false;
            bindChildren(node);
            // Reset all reachability check related flags on node (for incremental scenarios)
            node.flags &= ~NodeFlags.ReachabilityAndEmitFlags;
            if (
                !(currentFlow.flags & FlowFlags.Unreachable) &&
                containerFlags & ContainerFlags.IsFunctionLike &&
                nodeIsPresent((node as FunctionLikeDeclaration).body)
            ) {
                node.flags |= NodeFlags.HasImplicitReturn;
                if (hasExplicitReturn)
                    node.flags |= NodeFlags.HasExplicitReturn;
                (node as FunctionLikeDeclaration).endFlowNode = currentFlow;
            }
            if (node.kind === SyntaxKind.SourceFile) {
                (node as SourceFile).endFlowNode = currentFlow;
            }

            if (currentReturnTarget) {
                addAntecedent(currentReturnTarget, currentFlow);
                currentFlow = finishFlowLabel(currentReturnTarget);
                if (node.kind === SyntaxKind.FunctionDeclaration) {
                    // TODO: || node.kind === SyntaxKind.FunctionExpression)) {
                    (node as FunctionLikeDeclaration).returnFlowNode =
                        currentFlow;
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
        thisParentContainer = saveThisParentContainer;
        blockScopeContainer = savedBlockScopeContainer;
    }

    function checkUnreachable(node: Node): boolean {
        if (!(currentFlow.flags & FlowFlags.Unreachable)) {
            return false;
        }
        if (currentFlow === unreachableFlow) {
            const reportError =
                // report error on all statements except empty ones
                isStatementButNotDeclaration(node) &&
                node.kind !== SyntaxKind.EmptyStatement;
            // // report error on class declarations
            // || node.kind === SyntaxKind.ClassDeclaration
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
                    const isError =
                        unreachableCodeIsError(options) &&
                        (!isVariableStatement(node) ||
                            !!(
                                getCombinedNodeFlags(node.declarationList) &
                                NodeFlags.BlockScoped
                            ) ||
                            node.declarationList.declarations.some(
                                (d) => !!d.initializer
                            ));

                    eachUnreachableRange(
                        node,
                        (start, end) => {}
                        // TODO
                        // errorOrSuggestionOnRange(
                        //     isError,
                        //     start,
                        //     end,
                        //     Diagnostics.Unreachable_code_detected
                        // )
                    );
                }
            }
        }
        return true;
    }

    function bindEachFunctionsFirst(nodes: NodeArray<Node> | undefined): void {
        bindEach(nodes, n => n.kind === SyntaxKind.FunctionDeclaration ? bind(n) : undefined);
        bindEach(nodes, n => n.kind !== SyntaxKind.FunctionDeclaration ? bind(n) : undefined);
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
        if (
            node.kind >= SyntaxKind.FirstStatement &&
            node.kind <= SyntaxKind.LastStatement &&
            (!options.allowUnreachableCode ||
                node.kind === SyntaxKind.ReturnStatement)
        ) {
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
            case SyntaxKind.SourceFile: {
                bindEachFunctionsFirst((node as SourceFile).statements);
                bind((node as SourceFile).endOfFileToken);
                break;
            }
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
            case SyntaxKind.ObjectLiteralExpression:
            case SyntaxKind.ArrayLiteralExpression:
            case SyntaxKind.PropertyAssignment:
            case SyntaxKind.SpreadElement:
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

    function bindFunctionDeclaration(node: FunctionDeclaration) {
        
        // if (isAsyncFunction(node)) {
        //     emitFlags |= NodeFlags.HasAsyncFunctions;
        // }
        
        //checkStrictModeFunctionName(node);
        // if (inStrictMode) {
        //     checkStrictModeFunctionDeclaration(node);
        //     bindBlockScopedDeclaration(node, SymbolFlags.Function, SymbolFlags.FunctionExcludes);
        // }
        // else {
            declareSymbolAndAddToSymbolTable(node, SymbolFlags.Function, SymbolFlags.FunctionExcludes);
        //}
    }
    
    function bindJSDoc(node: Node) {
        // TODO
        // if (hasJSDocNodes(node)) {
        //     if (isInJSFile(node)) {
        //         for (const j of node.jsDoc!) {
        //             bind(j);
        //         }
        //     }
        //     else {
        //         for (const j of node.jsDoc!) {
        //             setParent(j, node);
        //             setParentRecursive(j, /*incremental*/ false);
        //         }
        //     }
        // }
    }

    function bindEach(
        nodes: NodeArray<Node> | undefined,
        bindFunction: (node: Node) => void = bind
    ): void {
        if (nodes === undefined) {
            return;
        }

        forEach(nodes, bindFunction);
    }

    function bindEachChild(node: Node) {
        forEachChild(node, bind, bindEach);
    }

    function bindWorker(node: Node) {
        switch (node.kind) {
            /* Strict mode checks */
            case SyntaxKind.Identifier:
                // for typedef type names with namespaces, bind the new jsdoc type symbol here
                // because it requires all containing namespaces to be in effect, namely the
                // current "blockScopeContainer" needs to be set to its immediate namespace parent.
                // if (node.flags & NodeFlags.IdentifierIsInJSDocNamespace) {
                //     let parentNode = node.parent;
                //     while (parentNode && !isJSDocTypeAlias(parentNode)) {
                //         parentNode = parentNode.parent;
                //     }
                //     bindBlockScopedDeclaration(parentNode as Declaration, SymbolFlags.TypeAlias, SymbolFlags.TypeAliasExcludes);
                //     break;
                // }
                // falls through

                // TODO: Why use `isExpression` here? both Identifier and ThisKeyword are expressions.
                if (
                    currentFlow &&
                    (isExpression(node) ||
                        parent.kind === SyntaxKind.ShorthandPropertyAssignment)
                ) {
                    (node as Identifier).flowNode = currentFlow;
                }
                // TODO: a `ThisExpression` is not an Identifier, this cast is unsound
                return; //return checkContextualIdentifier(node as Identifier);
            // case SyntaxKind.QualifiedName:
            //     if (currentFlow && isPartOfTypeQuery(node)) {
            //         (node as QualifiedName).flowNode = currentFlow;
            //     }
            //     break;
            case SyntaxKind.ColonColonToken:
                (node as SuperExpression).flowNode = currentFlow;
                break;
            case SyntaxKind.PropertyAccessExpression:
            case SyntaxKind.ElementAccessExpression:
                const expr = node as
                    | PropertyAccessExpression
                    | ElementAccessExpression;
                if (currentFlow && isNarrowableReference(expr)) {
                    expr.flowNode = currentFlow;
                }
                break;
            case SyntaxKind.BinaryExpression:
                // const specialKind = getAssignmentDeclarationKind(
                //     node as BinaryExpression
                // );
                // switch (specialKind) {
                //     case AssignmentDeclarationKind.Property:
                //         const expression = (
                //             (node as BinaryExpression).left as AccessExpression
                //         ).expression;
                //         if (isInJSFile(node) && isIdentifier(expression)) {
                //             const symbol = lookupSymbolForName(
                //                 blockScopeContainer,
                //                 expression.escapedText
                //             );
                //             if (
                //                 isThisInitializedDeclaration(
                //                     symbol?.valueDeclaration
                //                 )
                //             ) {
                //                 bindThisPropertyAssignment(
                //                     node as BindablePropertyAssignmentExpression
                //                 );
                //                 break;
                //             }
                //         }
                //         bindSpecialPropertyAssignment(
                //             node as BindablePropertyAssignmentExpression
                //         );
                //         break;
                //     case AssignmentDeclarationKind.None:
                //         // Nothing to do
                //         break;
                //     default:
                //         Debug.fail(
                //             "Unknown binary expression special property assignment kind"
                //         );
                // }
                // return checkStrictModeBinaryExpression(
                //     node as BinaryExpression
                // );
                return;
            // case SyntaxKind.CatchClause:
            //     return checkStrictModeCatchClause(node as CatchClause);
            // case SyntaxKind.PostfixUnaryExpression:
            //     return checkStrictModePostfixUnaryExpression(
            //         node as PostfixUnaryExpression
            //     );
            // case SyntaxKind.PrefixUnaryExpression:
            //     return checkStrictModePrefixUnaryExpression(
            //         node as PrefixUnaryExpression
            //     );
            // case SyntaxKind.TypeParameter:
            //     return bindTypeParameter(node as TypeParameterDeclaration);
            // case SyntaxKind.Parameter:
            //     return bindParameter(node as ParameterDeclaration);
            // case SyntaxKind.VariableDeclaration:
            //     return bindVariableDeclarationOrBindingElement(
            //         node as VariableDeclaration
            //     );
            // case SyntaxKind.BindingElement:
            //     (node as BindingElement).flowNode = currentFlow;
            //     return bindVariableDeclarationOrBindingElement(
            //         node as BindingElement
            //     );
            // case SyntaxKind.PropertyDeclaration:
            // case SyntaxKind.PropertySignature:
            //     return bindPropertyWorker(
            //         node as PropertyDeclaration | PropertySignature
            //     );
            // case SyntaxKind.PropertyAssignment:
            // case SyntaxKind.ShorthandPropertyAssignment:
            //     return bindPropertyOrMethodOrAccessor(
            //         node as Declaration,
            //         SymbolFlags.Property,
            //         SymbolFlags.PropertyExcludes
            //     );
            // case SyntaxKind.EnumMember:
            //     return bindPropertyOrMethodOrAccessor(
            //         node as Declaration,
            //         SymbolFlags.EnumMember,
            //         SymbolFlags.EnumMemberExcludes
            //     );

            // case SyntaxKind.CallSignature:
            // case SyntaxKind.ConstructSignature:
            // case SyntaxKind.IndexSignature:
            //     return declareSymbolAndAddToSymbolTable(
            //         node as Declaration,
            //         SymbolFlags.Signature,
            //         SymbolFlags.None
            //     );
            // case SyntaxKind.MethodDeclaration:
            // case SyntaxKind.MethodSignature:
            //     // If this is an ObjectLiteralExpression method, then it sits in the same space
            //     // as other properties in the object literal.  So we use SymbolFlags.PropertyExcludes
            //     // so that it will conflict with any other object literal members with the same
            //     // name.
            //     return bindPropertyOrMethodOrAccessor(
            //         node as Declaration,
            //         SymbolFlags.Method |
            //             ((node as MethodDeclaration).questionToken
            //                 ? SymbolFlags.Optional
            //                 : SymbolFlags.None),
            //         isObjectLiteralMethod(node)
            //             ? SymbolFlags.PropertyExcludes
            //             : SymbolFlags.MethodExcludes
            //     );
            case SyntaxKind.FunctionDeclaration:
                return bindFunctionDeclaration(node as FunctionDeclaration);
            // case SyntaxKind.Constructor:
            //     return declareSymbolAndAddToSymbolTable(
            //         node as Declaration,
            //         SymbolFlags.Constructor,
            //         /*symbolExcludes:*/ SymbolFlags.None
            //     );
            // case SyntaxKind.GetAccessor:
            //     return bindPropertyOrMethodOrAccessor(
            //         node as Declaration,
            //         SymbolFlags.GetAccessor,
            //         SymbolFlags.GetAccessorExcludes
            //     );
            // case SyntaxKind.SetAccessor:
            //     return bindPropertyOrMethodOrAccessor(
            //         node as Declaration,
            //         SymbolFlags.SetAccessor,
            //         SymbolFlags.SetAccessorExcludes
            //     );
            // case SyntaxKind.FunctionType:
            // case SyntaxKind.JSDocFunctionType:
            // case SyntaxKind.JSDocSignature:
            // case SyntaxKind.ConstructorType:
            //     return bindFunctionOrConstructorType(
            //         node as SignatureDeclaration | JSDocSignature
            //     );
            // case SyntaxKind.TypeLiteral:
            // case SyntaxKind.JSDocTypeLiteral:
            // case SyntaxKind.MappedType:
            //     return bindAnonymousTypeWorker(
            //         node as TypeLiteralNode | MappedTypeNode | JSDocTypeLiteral
            //     );
            // case SyntaxKind.JSDocClassTag:
            //     return bindJSDocClassTag(node as JSDocClassTag);
            // case SyntaxKind.ObjectLiteralExpression:
            //     return bindObjectLiteralExpression(
            //         node as ObjectLiteralExpression
            //     );
            // case SyntaxKind.FunctionExpression:
            // case SyntaxKind.ArrowFunction:
            //     return bindFunctionExpression(
            //         node as FunctionExpression | ArrowFunction
            //     );

            // case SyntaxKind.CallExpression:
            //     const assignmentKind = getAssignmentDeclarationKind(
            //         node as CallExpression
            //     );
            //     switch (assignmentKind) {
            //         case AssignmentDeclarationKind.ObjectDefinePropertyValue:
            //             return bindObjectDefinePropertyAssignment(
            //                 node as BindableObjectDefinePropertyCall
            //             );
            //         case AssignmentDeclarationKind.ObjectDefinePropertyExports:
            //             return bindObjectDefinePropertyExport(
            //                 node as BindableObjectDefinePropertyCall
            //             );
            //         case AssignmentDeclarationKind.ObjectDefinePrototypeProperty:
            //             return bindObjectDefinePrototypeProperty(
            //                 node as BindableObjectDefinePropertyCall
            //             );
            //         case AssignmentDeclarationKind.None:
            //             break; // Nothing to do
            //         default:
            //             return Debug.fail(
            //                 "Unknown call expression assignment declaration kind"
            //             );
            //     }
            //     if (isInJSFile(node)) {
            //         bindCallExpression(node as CallExpression);
            //     }
            //     break;

            // // Members of classes, interfaces, and modules
            // case SyntaxKind.ClassExpression:
            // case SyntaxKind.ClassDeclaration:
            //     // All classes are automatically in strict mode in ES6.
            //     inStrictMode = true;
            //     return bindClassLikeDeclaration(node as ClassLikeDeclaration);
            // case SyntaxKind.InterfaceDeclaration:
            //     return bindBlockScopedDeclaration(
            //         node as Declaration,
            //         SymbolFlags.Interface,
            //         SymbolFlags.InterfaceExcludes
            //     );
            // case SyntaxKind.TypeAliasDeclaration:
            //     return bindBlockScopedDeclaration(
            //         node as Declaration,
            //         SymbolFlags.TypeAlias,
            //         SymbolFlags.TypeAliasExcludes
            //     );
            // case SyntaxKind.EnumDeclaration:
            //     return bindEnumDeclaration(node as EnumDeclaration);
            // case SyntaxKind.ModuleDeclaration:
            //     return bindModuleDeclaration(node as ModuleDeclaration);
            // // Jsx-attributes
            // case SyntaxKind.JsxAttributes:
            //     return bindJsxAttributes(node as JsxAttributes);
            // case SyntaxKind.JsxAttribute:
            //     return bindJsxAttribute(
            //         node as JsxAttribute,
            //         SymbolFlags.Property,
            //         SymbolFlags.PropertyExcludes
            //     );

            // // Imports and exports
            // case SyntaxKind.ImportEqualsDeclaration:
            // case SyntaxKind.NamespaceImport:
            // case SyntaxKind.ImportSpecifier:
            // case SyntaxKind.ExportSpecifier:
            //     return declareSymbolAndAddToSymbolTable(
            //         node as Declaration,
            //         SymbolFlags.Alias,
            //         SymbolFlags.AliasExcludes
            //     );
            // case SyntaxKind.NamespaceExportDeclaration:
            //     return bindNamespaceExportDeclaration(
            //         node as NamespaceExportDeclaration
            //     );
            // case SyntaxKind.ImportClause:
            //     return bindImportClause(node as ImportClause);
            // case SyntaxKind.ExportDeclaration:
            //     return bindExportDeclaration(node as ExportDeclaration);
            // case SyntaxKind.ExportAssignment:
            //     return bindExportAssignment(node as ExportAssignment);
            case SyntaxKind.SourceFile:
                // updateStrictModeStatementList((node as SourceFile).statements);
                // return bindSourceFileIfExternalModule();
                return;
            // case SyntaxKind.Block:
            //     if (!isFunctionLikeOrClassStaticBlockDeclaration(node.parent)) {
            //         return;
            //     }
            // // falls through
            // case SyntaxKind.ModuleBlock:
            //     return updateStrictModeStatementList(
            //         (node as Block | ModuleBlock).statements
            //     );

            // case SyntaxKind.JSDocParameterTag:
            //     if (node.parent.kind === SyntaxKind.JSDocSignature) {
            //         return bindParameter(node as JSDocParameterTag);
            //     }
            //     if (node.parent.kind !== SyntaxKind.JSDocTypeLiteral) {
            //         break;
            //     }
            // // falls through
            // case SyntaxKind.JSDocPropertyTag:
            //     const propTag = node as JSDocPropertyLikeTag;
            //     const flags =
            //         propTag.isBracketed ||
            //         (propTag.typeExpression &&
            //             propTag.typeExpression.type.kind ===
            //                 SyntaxKind.JSDocOptionalType)
            //             ? SymbolFlags.Property | SymbolFlags.Optional
            //             : SymbolFlags.Property;
            //     return declareSymbolAndAddToSymbolTable(
            //         propTag,
            //         flags,
            //         SymbolFlags.PropertyExcludes
            //     );
            // case SyntaxKind.JSDocTypedefTag:
            // case SyntaxKind.JSDocCallbackTag:
            // case SyntaxKind.JSDocEnumTag:
            //     return (delayedTypeAliases || (delayedTypeAliases = [])).push(
            //         node as JSDocTypedefTag | JSDocCallbackTag | JSDocEnumTag
            //     );
            // case SyntaxKind.JSDocOverloadTag:
            //     return bind((node as JSDocOverloadTag).typeExpression);
            // case SyntaxKind.JSDocImportTag:
            //     return (jsDocImports || (jsDocImports = [])).push(
            //         node as JSDocImportTag
            //     );
        }

        Debug.fail("Unhandled node in bindWorker: " + Debug.formatSyntaxKind(node.kind));
    }

    function maybeBindExpressionFlowIfCall(node: Expression) {
        // A top level or comma expression call expression with a dotted function name and at least one argument
        // is potentially an assertion and is therefore included in the control flow.
        if (node.kind === SyntaxKind.CallExpression) {
            const call = node as CallExpression;
            if (
                call.expression.kind !== SyntaxKind.ColonColonToken &&
                isDottedName(call.expression)
            ) {
                currentFlow = createFlowCall(currentFlow, call);
            }
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
            //     return (isGlobalScopeAugmentation(node as ModuleDeclaration) ? "__global" : `"${moduleName}"`) as __String;
            // }
            if (name.kind === SyntaxKind.ComputedPropertyName) {
                const nameExpression = name.expression;
                // treat computed property names where expression is string/numeric literal as just string/numeric literal
                if (isStringOrNumericLiteralLike(nameExpression)) {
                    return nameExpression.text;// escapeLeadingUnderscores(nameExpression.text);
                }
                if (isSignedNumericLiteral(nameExpression)) {
                    return tokenToString(nameExpression.operator) + nameExpression.operand.text as string;
                }
                else {
                    Debug.fail("Only computed properties with literal names have declaration names");
                }
            }
            if (isPrivateIdentifier(name)) {
                // containingClass exists because private names only allowed inside classes
                const containingClass = getContainingClass(node);
                if (!containingClass) {
                    // we can get here in cases where there is already a parse error.
                    return undefined;
                }
                const containingClassSymbol = containingClass.symbol;
                return getSymbolNameForPrivateIdentifier(containingClassSymbol, name.text);
            }            
            return isPropertyNameLiteral(name) ? getEscapedTextOfIdentifierOrLiteral(name) : undefined;
        }
        switch (node.kind) {            
            // case SyntaxKind.FunctionType:
            // case SyntaxKind.CallSignature:
            // case SyntaxKind.JSDocSignature:
            //     return InternalSymbolName.Call;            
            case SyntaxKind.IndexSignature:
                return InternalSymbolName.Index;                        
            case SyntaxKind.BinaryExpression:
                // if (getAssignmentDeclarationKind(node as BinaryExpression) === AssignmentDeclarationKind.ModuleExports) {
                //     // module.exports = ...
                //     return InternalSymbolName.ExportEquals;
                // }
                Debug.fail("Unknown binary declaration kind");
                break;
            // case SyntaxKind.JSDocFunctionType:
            //     return (isJSDocConstructSignature(node) ? InternalSymbolName.New : InternalSymbolName.Call);
            case SyntaxKind.Parameter:
                // Parameters with names are handled at the top of this function.  Parameters
                // without names can only come from JSDocFunctionTypes.
                Debug.assert(node.parent.kind === SyntaxKind.JSDocFunctionType, "Impossible parameter parent kind", () => `parent is: ${Debug.formatSyntaxKind(node.parent.kind)}, expected JSDocFunctionType`);
                const functionType = node.parent as JSDocFunctionType;
                const index = functionType.parameters.indexOf(node as ParameterDeclaration);
                return "arg" + index as string;
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
                //if (isReplaceableByMethod) symbol.isReplaceableByMethod = true;
            }
            // else if (isReplaceableByMethod && !symbol.isReplaceableByMethod) {
            //     // A symbol already exists, so don't add this as a declaration.
            //     return symbol;
            // }
            else if (symbol.flags & excludes) {
                // if (symbol.isReplaceableByMethod) {
                //     // Javascript constructor-declared symbols can be discarded in favor of
                //     // prototype symbols like methods.
                //     symbolTable.set(name, symbol = createSymbol(SymbolFlags.None, name));
                // } else 
                if (!(includes & SymbolFlags.Variable && symbol.flags & SymbolFlags.Assignment)) {
                    // Assignment declarations are allowed to merge with variables, no matter what other flags they have.
                    if (isNamedDeclaration(node)) {
                        setParent(node.name, node);
                    }
                    // Report errors every position with duplicate declaration
                    // Report errors on previous encountered declarations
                    
                    // TODO:
                    let message:DiagnosticMessage ;
                    // message = symbol.flags & SymbolFlags.BlockScopedVariable
                    //     ? Diagnostics.Cannot_redeclare_block_scoped_variable_0
                    //     : Diagnostics.Duplicate_identifier_0;
                    let messageNeedsName = true;

                    let multipleDefaultExports = false;
                    if (length(symbol.declarations)) {
                        // If the current node is a default export of some sort, then check if                        // there are any other default exports that we need to error on.
                        // We'll know whether we have other default exports depending on if `symbol` already has a declaration list set.
                        // if (isDefaultExport) {
                        //     message = Diagnostics.A_module_cannot_have_multiple_default_exports;
                        //     messageNeedsName = false;
                        //     multipleDefaultExports = true;
                        // }
                        // else {
                            // This is to properly report an error in the case "export default { }" is after export default of class declaration or function declaration.
                            // Error on multiple export default in the following case:
                            // 1. multiple export default of class declaration or function declaration by checking NodeFlags.Default
                            // 2. multiple export default of export assignment. This one doesn't have NodeFlags.Default on (as export default doesn't considered as modifiers)
                            // if (
                            //     symbol.declarations && symbol.declarations.length &&
                            //     (node.kind === SyntaxKind.ExportAssignment && !(node as ExportAssignment).isExportEquals)
                            // ) {
                            //     message = Diagnostics.A_module_cannot_have_multiple_default_exports;
                            //     messageNeedsName = false;
                            //     multipleDefaultExports = true;
                            // }
                       // }
                    }

                    const relatedInformation: DiagnosticRelatedInformation[] = [];
                    // if (isTypeAliasDeclaration(node) && nodeIsMissing(node.type) && hasSyntacticModifier(node, ModifierFlags.Export) && symbol.flags & (SymbolFlags.Alias | SymbolFlags.Type | SymbolFlags.Namespace)) {
                    //     // export type T; - may have meant export type { T }?
                    //     relatedInformation.push(createDiagnosticForNode(node, Diagnostics.Did_you_mean_0, `export type { ${unescapeLeadingUnderscores(node.name.escapedText)} }`));
                    // }

                    const declarationName = getNameOfDeclaration(node) || node;
                    // TODO: remove this whole forEach?  
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

    function addDeclarationToSymbol(symbol: Symbol, node: Declaration, symbolFlags: SymbolFlags) {
        symbol.flags |= symbolFlags;

        node.symbol = symbol;
        symbol.declarations = appendIfUnique(symbol.declarations, node);

        // TODO: if we need to export, add thsi back in
        // if (symbolFlags & (SymbolFlags.Class | SymbolFlags.Enum | SymbolFlags.Module | SymbolFlags.Variable) && !symbol.exports) {
        //     symbol.exports = createSymbolTable();
        // }

        if (symbolFlags & (SymbolFlags.Class | SymbolFlags.ObjectLiteral) && !symbol.members) {
            symbol.members = createSymbolTable();
        }

        // On merge of const enum module with class or function, reset const enum only flag (namespaces will already recalculate)
        // if (symbol.constEnumOnlyModule && (symbol.flags & (SymbolFlags.Function | SymbolFlags.Class | SymbolFlags.RegularEnum))) {
        //     symbol.constEnumOnlyModule = false;
        // }

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

    function getDisplayName(node: Declaration): string {
        return isNamedDeclaration(node) ? declarationNameToString(node.name) : (Debug.checkDefined(getDeclarationName(node)));
    }

    
    function declareSourceFileMember(node: Declaration, symbolFlags: SymbolFlags, symbolExcludes: SymbolFlags) {
        // return isExternalModule(file)
        //     ? declareModuleMember(node, symbolFlags, symbolExcludes)
        //     : declareSymbol(file.locals!, /*parent*/ undefined, node, symbolFlags, symbolExcludes);
        return declareSymbol(file.locals!, /*parent*/ undefined, node, symbolFlags, symbolExcludes)
    }

    function declareSymbolAndAddToSymbolTable(node: Declaration, symbolFlags: SymbolFlags, symbolExcludes: SymbolFlags): Symbol | undefined {
        switch (container.kind) {
            // Modules, source files, and classes need specialized handling for how their
            // members are declared (for example, a member of a class will go into a specific
            // symbol table depending on if it is static or not). We defer to specialized
            // handlers to take care of declaring these child members.
            
            case SyntaxKind.SourceFile:
                return declareSourceFileMember(node, symbolFlags, symbolExcludes);

            
            // case SyntaxKind.TypeLiteral:
            // case SyntaxKind.JSDocTypeLiteral:
            // case SyntaxKind.ObjectLiteralExpression:
            // case SyntaxKind.InterfaceDeclaration:
            // case SyntaxKind.JsxAttributes:
            //     // Interface/Object-types always have their children added to the 'members' of
            //     // their container. They are only accessible through an instance of their
            //     // container, and are never in scope otherwise (even inside the body of the
            //     // object / type / interface declaring them). An exception is type parameters,
            //     // which are in scope without qualification (similar to 'locals').
            //     return declareSymbol(container.symbol.members!, container.symbol, node, symbolFlags, symbolExcludes);

            // case SyntaxKind.FunctionType:            
            // case SyntaxKind.JSDocSignature:
            // case SyntaxKind.IndexSignature:
            // case SyntaxKind.MethodDeclaration:
            // case SyntaxKind.MethodSignature:            
            case SyntaxKind.FunctionDeclaration:
            // case SyntaxKind.FunctionExpression:
            // case SyntaxKind.ArrowFunction:
            // case SyntaxKind.JSDocFunctionType:            
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
}

/** @internal */
export function getContainerFlags(node: Node): ContainerFlags {
    switch (node.kind) {
        case SyntaxKind.ObjectLiteralExpression:
        case SyntaxKind.JSDocTypeLiteral:
        case SyntaxKind.IndexSignature:
            return ContainerFlags.IsContainer | ContainerFlags.HasLocals;

        case SyntaxKind.SourceFile:
            return (
                ContainerFlags.IsContainer |
                ContainerFlags.IsControlFlowContainer |
                ContainerFlags.HasLocals
            );

        case SyntaxKind.MethodDeclaration:
        // if (isObjectLiteralOrClassExpressionMethodOrAccessor(node)) {
        //     return (
        //         ContainerFlags.IsContainer |
        //         ContainerFlags.IsControlFlowContainer |
        //         ContainerFlags.HasLocals |
        //         ContainerFlags.IsFunctionLike |
        //         ContainerFlags.IsObjectLiteralOrClassExpressionMethodOrAccessor
        //     );
        // }
        // falls through
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.MethodSignature:
        //case SyntaxKind.CallSignature:
        //case SyntaxKind.JSDocSignature:
        case SyntaxKind.JSDocFunctionType:
            //case SyntaxKind.FunctionType:
            return (
                ContainerFlags.IsContainer |
                ContainerFlags.IsControlFlowContainer |
                ContainerFlags.HasLocals |
                ContainerFlags.IsFunctionLike
            );

        //case SyntaxKind.FunctionExpression:
        //    return ContainerFlags.IsContainer | ContainerFlags.IsControlFlowContainer | ContainerFlags.HasLocals | ContainerFlags.IsFunctionLike | ContainerFlags.IsFunctionExpression;

        // case SyntaxKind.PropertyDeclaration:
        //     return (node as PropertyDeclaration).initializer ? ContainerFlags.IsControlFlowContainer : 0;

        case SyntaxKind.CatchClause:
        case SyntaxKind.ForStatement:
        case SyntaxKind.ForInStatement:
        case SyntaxKind.CaseBlock:
            return (
                ContainerFlags.IsBlockScopedContainer | ContainerFlags.HasLocals
            );

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
            return isFunctionLike(node.parent)
                ? ContainerFlags.None
                : ContainerFlags.IsBlockScopedContainer |
                      ContainerFlags.HasLocals;
    }

    return ContainerFlags.None;
}

function eachUnreachableRange(
    node: Node,
    cb: (start: Node, last: Node) => void
): void {
    if (
        isStatement(node) &&
        isExecutableStatement(node) &&
        isBlock(node.parent)
    ) {
        const { statements } = node.parent;
        const slice = sliceAfter(statements, node);
        getRangesWhere(slice, isExecutableStatement, (start, afterEnd) =>
            cb(slice[start], slice[afterEnd - 1])
        );
    } else {
        cb(node, node);
    }
}

// As opposed to a pure declaration like an `interface`
function isExecutableStatement(s: Statement): boolean {
    // Don't remove statements that can validly be used before they appear.
    return (
        !isFunctionDeclaration(s) &&
        // `var x;` may declare a variable used above
        !(
            isVariableStatement(s) &&
            !(getCombinedNodeFlags(s) & NodeFlags.BlockScoped) &&
            s.declarationList.declarations.some((d) => !d.initializer)
        )
    );
}
