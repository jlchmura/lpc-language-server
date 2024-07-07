import * as __types from "./types";
import { AssertionLevel, MapLike, emptyArray, hasProperty, some } from "./core";
import {
    AssignmentExpression,
    BinaryExpression,
    BinaryOperatorToken,
    CallChain,
    ElementAccessChain,
    EntityNameExpression,
    Expression,
    ForInStatement,
    Identifier,
    JSDocTypeAssertion,
    LogicalOperator,
    LogicalOrCoalescingAssignmentOperator,
    ModifierFlags,
    ModifierLike,
    Node,
    NodeArray,
    NodeFlags,
    NonNullChain,
    NumericLiteral,
    OuterExpression,
    OuterExpressionKinds,
    PostfixUnaryExpression,
    PrefixUnaryExpression,
    PrivateIdentifier,
    PropertyAccessChain,
    PropertyAccessEntityNameExpression,
    PropertyAssignment,
    ReadonlyTextRange,
    ShorthandPropertyAssignment,
    SourceFile,
    StringLiteral,    
    SymbolFlags,
    SymbolTable,
    SyntaxKind,
    TextRange,
    Symbol,
    Token,
    WrappedExpression,
    CallExpression,
    CompilerOptions,
    PropertyAccessExpression,
    Declaration,
    AssignmentDeclarationKind,
    AccessExpression,
    EqualsToken,
    AssignmentOperatorToken,
    ElementAccessExpression,
    BindableStaticElementAccessExpression,
    ClassLikeDeclaration,
    PropertyNameLiteral,
    DiagnosticMessage,
    DiagnosticArguments,
    DiagnosticWithLocation,
    TextSpan,
    NamedDeclaration,
    ReturnStatement,
    DeclarationName,
    QualifiedName,
    Diagnostic,
    DiagnosticRelatedInformation,
    MethodDeclaration,
} from "./types";
import { LPCLexer } from "../parser3/LPCLexer";
import { Debug } from "./debug";
import {
    isBinaryExpression,
    isCallExpression,
    isIdentifier,
    isJSDocTypeExpression,
    isNumericLiteral,
    isParenthesizedExpression,
    isPrefixUnaryExpression,
    isPropertyAccessExpression,
    isVoidExpression,
} from "./nodeTests";
import {
    canHaveModifiers,
    createTextSpan,
    createTextSpanFromBounds,
    escapeLeadingUnderscores,
    findAncestor,
    getCombinedNodeFlags,
    getJSDocTypeTag,
    isClassLike,
    isFunctionLike,
    isLeftHandSideExpression,
    isMemberName,
    isStringLiteralLike,
} from "./utilitiesPublic";
import { getSymbolId } from "./checker";
import { skipTrivia } from "./scanner";

let localizedDiagnosticMessages: MapLike<string> | undefined;

/** @internal */
export type Mutable<T extends object> = { -readonly [K in keyof T]: T[K] };


/**
 * @internal
 */
// prettier-ignore
export interface ObjectAllocator {
    getNodeConstructor(): new (kind: SyntaxKind, pos: number, end: number) => Node;
    getTokenConstructor(): new <TKind extends SyntaxKind>(kind: TKind, pos: number, end: number) => Token<TKind>;
    getIdentifierConstructor(): new (kind: SyntaxKind.Identifier, pos: number, end: number) => Identifier;
    getPrivateIdentifierConstructor(): new (kind: SyntaxKind.PrivateIdentifier, pos: number, end: number) => PrivateIdentifier;
    getSourceFileConstructor(): new (kind: SyntaxKind.SourceFile, pos: number, end: number) => SourceFile;
    getSymbolConstructor(): new (flags: SymbolFlags, name: string) => Symbol;
    //getTypeConstructor(): new (checker: TypeChecker, flags: TypeFlags) => Type;
    //getSignatureConstructor(): new (checker: TypeChecker, flags: SignatureFlags) => Signature;
}

/** @internal */
export const objectAllocator: ObjectAllocator = {
    getNodeConstructor: () => Node as any,
    getTokenConstructor: () => Token as any,
    getIdentifierConstructor: () => Identifier as any,
    getPrivateIdentifierConstructor: () => Node as any,
    getSourceFileConstructor: () => Node as any,
    getSymbolConstructor: () => Symbol as any,
    //getTypeConstructor: () => Type as any,
    //getSignatureConstructor: () => Signature as any,
};

function Node(this: Mutable<Node>, kind: SyntaxKind, pos: number, end: number) {
    this.pos = pos;
    this.end = end;
    this.kind = kind;
    this.id = 0;
    this.flags = NodeFlags.None;
    this.modifierFlagsCache = ModifierFlags.None;
    this.parent = undefined!;
    this.original = undefined;
}

function Symbol(this: Symbol, flags: SymbolFlags, name: string) {
    // Note: if modifying this, be sure to update SymbolObject in src/services/services.ts
    this.flags = flags;
    //this.escapedName = name;
    this.declarations = undefined;
    this.valueDeclaration = undefined;
    this.id = 0;
    this.mergeId = 0;
    this.parent = undefined;
    this.members = undefined;
    // this.exports = undefined;
    // this.exportSymbol = undefined;    
    this.isReferenced = undefined;
    this.lastAssignmentPos = undefined;
    (this as any).links = undefined; // used by TransientSymbol
}

function Identifier(
    this: Mutable<Node>,
    kind: SyntaxKind,
    pos: number,
    end: number
) {
    this.pos = pos;
    this.end = end;
    this.kind = kind;
    this.id = 0;
    this.flags = NodeFlags.None;
    this.parent = undefined!;
    this.original = undefined;
}

function Token(
    this: Mutable<Node>,
    kind: SyntaxKind,
    pos: number,
    end: number
) {
    // Note: if modifying this, be sure to update TokenOrIdentifierObject in src/services/services.ts
    this.pos = pos;
    this.end = end;
    this.kind = kind;
    this.id = 0;
    this.flags = NodeFlags.None;
    this.parent = undefined!;
}

/** @internal */
export function isNodeArray<T extends Node>(
    array: readonly T[]
): array is NodeArray<T> {
    return hasProperty(array, "pos") && hasProperty(array, "end");
}

/**
 * Bypasses immutability and directly sets the `pos` property of a `TextRange` or `Node`.
 *
 * @internal
 */
export function setTextRangePos<T extends ReadonlyTextRange>(
    range: T,
    pos: number
) {
    (range as TextRange).pos = pos;
    return range;
}

/**
 * Bypasses immutability and directly sets the `end` property of a `TextRange` or `Node`.
 *
 * @internal
 */
export function setTextRangeEnd<T extends ReadonlyTextRange>(
    range: T,
    end: number
) {
    (range as TextRange).end = end;
    return range;
}

/**
 * Bypasses immutability and directly sets the `pos` and `end` properties of a `TextRange` or `Node`.
 *
 * @internal
 */
export function setTextRangePosEnd<T extends ReadonlyTextRange>(
    range: T,
    pos: number,
    end: number
) {
    return setTextRangeEnd(setTextRangePos(range, pos), end);
}

/**
 * Bypasses immutability and directly sets the `pos` and `end` properties of a `TextRange` or `Node` from the
 * provided position and width.
 *
 * @internal
 */
export function setTextRangePosWidth<T extends ReadonlyTextRange>(
    range: T,
    pos: number,
    width: number
) {
    return setTextRangePosEnd(range, pos, pos + width);
}

/** @internal */
export function modifiersToFlags(modifiers: readonly ModifierLike[] | undefined) {
    let flags = ModifierFlags.None;
    if (modifiers) {
        for (const modifier of modifiers) {
            flags |= modifierToFlag(modifier.kind);
        }
    }
    return flags;
}

export function modifierToFlag(tokenType: number): ModifierFlags {
    switch (tokenType) {
        case LPCLexer.PUBLIC:
            return ModifierFlags.Public;
        case LPCLexer.PROTECTED:
            return ModifierFlags.Protected;
        case LPCLexer.PRIVATE:
            return ModifierFlags.Private;
        case LPCLexer.STATIC:
            return ModifierFlags.Static;
        case LPCLexer.NOMASK:
            return ModifierFlags.NoMask;
        case LPCLexer.NOSAVE:
            return ModifierFlags.NoSave;
        case LPCLexer.NOSHADOW:
            return ModifierFlags.NoShadow;
        case LPCLexer.VISIBLE:
            return ModifierFlags.Visible;
        case LPCLexer.DEPRECATED:
            return ModifierFlags.Deprecated;
    }
    return ModifierFlags.None;
}

type BinaryExpressionState = <TOuterState, TState, TResult>(
    machine: BinaryExpressionStateMachine<TOuterState, TState, TResult>,
    stackIndex: number,
    stateStack: BinaryExpressionState[],
    nodeStack: BinaryExpression[],
    userStateStack: TState[],
    resultHolder: { value: TResult },
    outerState: TOuterState
) => number;

// prettier-ignore
namespace BinaryExpressionState {
    /**
     * Handles walking into a `BinaryExpression`.
     * @param machine State machine handler functions
     * @param frame The current frame
     * @returns The new frame
     */
    export function enter<TOuterState, TState, TResult>(machine: BinaryExpressionStateMachine<TOuterState, TState, TResult>, stackIndex: number, stateStack: BinaryExpressionState[], nodeStack: BinaryExpression[], userStateStack: TState[], _resultHolder: { value: TResult; }, outerState: TOuterState): number {
        const prevUserState = stackIndex > 0 ? userStateStack[stackIndex - 1] : undefined;
        Debug.assertEqual(stateStack[stackIndex], enter);
        userStateStack[stackIndex] = machine.onEnter(nodeStack[stackIndex], prevUserState, outerState);
        stateStack[stackIndex] = nextState(machine, enter);
        return stackIndex;
    }

    /**
     * Handles walking the `left` side of a `BinaryExpression`.
     * @param machine State machine handler functions
     * @param frame The current frame
     * @returns The new frame
     */
    export function left<TOuterState, TState, TResult>(machine: BinaryExpressionStateMachine<TOuterState, TState, TResult>, stackIndex: number, stateStack: BinaryExpressionState[], nodeStack: BinaryExpression[], userStateStack: TState[], _resultHolder: { value: TResult; }, _outerState: TOuterState): number {
        Debug.assertEqual(stateStack[stackIndex], left);
        Debug.assertIsDefined(machine.onLeft);
        stateStack[stackIndex] = nextState(machine, left);
        const nextNode = machine.onLeft(nodeStack[stackIndex].left, userStateStack[stackIndex], nodeStack[stackIndex]);
        if (nextNode) {
            checkCircularity(stackIndex, nodeStack, nextNode);
            return pushStack(stackIndex, stateStack, nodeStack, userStateStack, nextNode);
        }
        return stackIndex;
    }

    /**
     * Handles walking the `operatorToken` of a `BinaryExpression`.
     * @param machine State machine handler functions
     * @param frame The current frame
     * @returns The new frame
     */
    export function operator<TOuterState, TState, TResult>(machine: BinaryExpressionStateMachine<TOuterState, TState, TResult>, stackIndex: number, stateStack: BinaryExpressionState[], nodeStack: BinaryExpression[], userStateStack: TState[], _resultHolder: { value: TResult; }, _outerState: TOuterState): number {
        Debug.assertEqual(stateStack[stackIndex], operator);
        Debug.assertIsDefined(machine.onOperator);
        stateStack[stackIndex] = nextState(machine, operator);
        machine.onOperator(nodeStack[stackIndex].operatorToken, userStateStack[stackIndex], nodeStack[stackIndex]);
        return stackIndex;
    }

    /**
     * Handles walking the `right` side of a `BinaryExpression`.
     * @param machine State machine handler functions
     * @param frame The current frame
     * @returns The new frame
     */
    export function right<TOuterState, TState, TResult>(machine: BinaryExpressionStateMachine<TOuterState, TState, TResult>, stackIndex: number, stateStack: BinaryExpressionState[], nodeStack: BinaryExpression[], userStateStack: TState[], _resultHolder: { value: TResult; }, _outerState: TOuterState): number {
        Debug.assertEqual(stateStack[stackIndex], right);
        Debug.assertIsDefined(machine.onRight);
        stateStack[stackIndex] = nextState(machine, right);
        const nextNode = machine.onRight(nodeStack[stackIndex].right, userStateStack[stackIndex], nodeStack[stackIndex]);
        if (nextNode) {
            checkCircularity(stackIndex, nodeStack, nextNode);
            return pushStack(stackIndex, stateStack, nodeStack, userStateStack, nextNode);
        }
        return stackIndex;
    }

    /**
     * Handles walking out of a `BinaryExpression`.
     * @param machine State machine handler functions
     * @param frame The current frame
     * @returns The new frame
     */
    export function exit<TOuterState, TState, TResult>(machine: BinaryExpressionStateMachine<TOuterState, TState, TResult>, stackIndex: number, stateStack: BinaryExpressionState[], nodeStack: BinaryExpression[], userStateStack: TState[], resultHolder: { value: TResult; }, _outerState: TOuterState): number {
        Debug.assertEqual(stateStack[stackIndex], exit);
        stateStack[stackIndex] = nextState(machine, exit);
        const result = machine.onExit(nodeStack[stackIndex], userStateStack[stackIndex]);
        if (stackIndex > 0) {
            stackIndex--;
            if (machine.foldState) {
                const side = stateStack[stackIndex] === exit ? "right" : "left";
                userStateStack[stackIndex] = machine.foldState(userStateStack[stackIndex], result, side);
            }
        }
        else {
            resultHolder.value = result;
        }
        return stackIndex;
    }

    /**
     * Handles a frame that is already done.
     * @returns The `done` state.
     */
    export function done<TOuterState, TState, TResult>(_machine: BinaryExpressionStateMachine<TOuterState, TState, TResult>, stackIndex: number, stateStack: BinaryExpressionState[], _nodeStack: BinaryExpression[], _userStateStack: TState[], _resultHolder: { value: TResult; }, _outerState: TOuterState): number {
        Debug.assertEqual(stateStack[stackIndex], done);
        return stackIndex;
    }

    export function nextState<TOuterState, TState, TResult>(machine: BinaryExpressionStateMachine<TOuterState, TState, TResult>, currentState: BinaryExpressionState) {
        switch (currentState) {
            case enter:
                if (machine.onLeft) return left;
                // falls through
            case left:
                if (machine.onOperator) return operator;
                // falls through
            case operator:
                if (machine.onRight) return right;
                // falls through
            case right:
                return exit;
            case exit:
                return done;
            case done:
                return done;
            default:
                Debug.fail("Invalid state");
        }
    }

    function pushStack<TState>(stackIndex: number, stateStack: BinaryExpressionState[], nodeStack: BinaryExpression[], userStateStack: TState[], node: BinaryExpression) {
        stackIndex++;
        stateStack[stackIndex] = enter;
        nodeStack[stackIndex] = node;
        userStateStack[stackIndex] = undefined!;
        return stackIndex;
    }

    function checkCircularity(stackIndex: number, nodeStack: BinaryExpression[], node: BinaryExpression) {
        if (Debug.shouldAssert(AssertionLevel.Aggressive)) {
            while (stackIndex >= 0) {
                Debug.assert(nodeStack[stackIndex] !== node, "Circular traversal detected.");
                stackIndex--;
            }
        }
    }
}

// prettier-ignore
/**
 * Holds state machine handler functions
 */
class BinaryExpressionStateMachine<TOuterState, TState, TResult> {
    constructor(
        readonly onEnter: (node: BinaryExpression, prev: TState | undefined, outerState: TOuterState) => TState,
        readonly onLeft: ((left: Expression, userState: TState, node: BinaryExpression) => BinaryExpression | void) | undefined,
        readonly onOperator: ((operatorToken: BinaryOperatorToken, userState: TState, node: BinaryExpression) => void) | undefined,
        readonly onRight: ((right: Expression, userState: TState, node: BinaryExpression) => BinaryExpression | void) | undefined,
        readonly onExit: (node: BinaryExpression, userState: TState) => TResult,
        readonly foldState: ((userState: TState, result: TResult, side: "left" | "right") => TState) | undefined,
    ) {
    }
}

// prettier-ignore
/**
 * Creates a state machine that walks a `BinaryExpression` using the heap to reduce call-stack depth on a large tree.
 * @param onEnter Callback evaluated when entering a `BinaryExpression`. Returns new user-defined state to associate with the node while walking.
 * @param onLeft Callback evaluated when walking the left side of a `BinaryExpression`. Return a `BinaryExpression` to continue walking, or `void` to advance to the right side.
 * @param onRight Callback evaluated when walking the right side of a `BinaryExpression`. Return a `BinaryExpression` to continue walking, or `void` to advance to the end of the node.
 * @param onExit Callback evaluated when exiting a `BinaryExpression`. The result returned will either be folded into the parent's state, or returned from the walker if at the top frame.
 * @param foldState Callback evaluated when the result from a nested `onExit` should be folded into the state of that node's parent.
 * @returns A function that walks a `BinaryExpression` node using the above callbacks, returning the result of the call to `onExit` from the outermost `BinaryExpression` node.
 *
 * @internal
 */
export function createBinaryExpressionTrampoline<TState, TResult>(
    onEnter: (node: BinaryExpression, prev: TState | undefined) => TState,
    onLeft: ((left: Expression, userState: TState, node: BinaryExpression) => BinaryExpression | void) | undefined,
    onOperator: ((operatorToken: BinaryOperatorToken, userState: TState, node: BinaryExpression) => void) | undefined,
    onRight: ((right: Expression, userState: TState, node: BinaryExpression) => BinaryExpression | void) | undefined,
    onExit: (node: BinaryExpression, userState: TState) => TResult,
    foldState: ((userState: TState, result: TResult, side: "left" | "right") => TState) | undefined,
): (node: BinaryExpression) => TResult;
// prettier-ignore
/**
 * Creates a state machine that walks a `BinaryExpression` using the heap to reduce call-stack depth on a large tree.
 * @param onEnter Callback evaluated when entering a `BinaryExpression`. Returns new user-defined state to associate with the node while walking.
 * @param onLeft Callback evaluated when walking the left side of a `BinaryExpression`. Return a `BinaryExpression` to continue walking, or `void` to advance to the right side.
 * @param onRight Callback evaluated when walking the right side of a `BinaryExpression`. Return a `BinaryExpression` to continue walking, or `void` to advance to the end of the node.
 * @param onExit Callback evaluated when exiting a `BinaryExpression`. The result returned will either be folded into the parent's state, or returned from the walker if at the top frame.
 * @param foldState Callback evaluated when the result from a nested `onExit` should be folded into the state of that node's parent.
 * @returns A function that walks a `BinaryExpression` node using the above callbacks, returning the result of the call to `onExit` from the outermost `BinaryExpression` node.
 *
 * @internal
 */
export function createBinaryExpressionTrampoline<TOuterState, TState, TResult>(
    onEnter: (node: BinaryExpression, prev: TState | undefined, outerState: TOuterState) => TState,
    onLeft: ((left: Expression, userState: TState, node: BinaryExpression) => BinaryExpression | void) | undefined,
    onOperator: ((operatorToken: BinaryOperatorToken, userState: TState, node: BinaryExpression) => void) | undefined,
    onRight: ((right: Expression, userState: TState, node: BinaryExpression) => BinaryExpression | void) | undefined,
    onExit: (node: BinaryExpression, userState: TState) => TResult,
    foldState: ((userState: TState, result: TResult, side: "left" | "right") => TState) | undefined,
): (node: BinaryExpression, outerState: TOuterState) => TResult;
// prettier-ignore
/** @internal */
export function createBinaryExpressionTrampoline<TOuterState, TState, TResult>(
    onEnter: (node: BinaryExpression, prev: TState | undefined, outerState: TOuterState) => TState,
    onLeft: ((left: Expression, userState: TState, node: BinaryExpression) => BinaryExpression | void) | undefined,
    onOperator: ((operatorToken: BinaryOperatorToken, userState: TState, node: BinaryExpression) => void) | undefined,
    onRight: ((right: Expression, userState: TState, node: BinaryExpression) => BinaryExpression | void) | undefined,
    onExit: (node: BinaryExpression, userState: TState) => TResult,
    foldState: ((userState: TState, result: TResult, side: "left" | "right") => TState) | undefined,
) {
    const machine = new BinaryExpressionStateMachine(onEnter, onLeft, onOperator, onRight, onExit, foldState);
    return trampoline;

    function trampoline(node: BinaryExpression, outerState: TOuterState) {
        const resultHolder: { value: TResult; } = { value: undefined! };
        const stateStack: BinaryExpressionState[] = [BinaryExpressionState.enter];
        const nodeStack: BinaryExpression[] = [node];
        const userStateStack: TState[] = [undefined!];
        let stackIndex = 0;
        while (stateStack[stackIndex] !== BinaryExpressionState.done) {
            stackIndex = stateStack[stackIndex](machine, stackIndex, stateStack, nodeStack, userStateStack, resultHolder, outerState);
        }
        Debug.assertEqual(stackIndex, 0);
        return resultHolder.value;
    }
}

function isBinaryLogicalOperator(token: SyntaxKind): boolean {
    return (
        token === SyntaxKind.BarBarToken ||
        token === SyntaxKind.AmpersandAmpersandToken
    );
}

/** @internal */
export function isLogicalOperator(token: SyntaxKind): boolean {
    return (
        isBinaryLogicalOperator(token) || token === SyntaxKind.ExclamationToken
    );
}

/** @internal */
export function isLogicalOrCoalescingAssignmentOperator(
    token: SyntaxKind
): token is LogicalOrCoalescingAssignmentOperator {
    return (
        token === SyntaxKind.BarBarEqualsToken ||
        token === SyntaxKind.AmpersandAmpersandEqualsToken ||
        token === SyntaxKind.QuestionQuestionEqualsToken
    );
}

/** @internal */
export function isLogicalOrCoalescingAssignmentExpression(
    expr: Node
): expr is AssignmentExpression<Token<LogicalOrCoalescingAssignmentOperator>> {
    return (
        isBinaryExpression(expr) &&
        isLogicalOrCoalescingAssignmentOperator(expr.operatorToken.kind)
    );
}

/** @internal */
export function isLogicalOrCoalescingBinaryOperator(
    token: SyntaxKind
): token is LogicalOperator {
    //| SyntaxKind.QuestionQuestionToken {
    return isBinaryLogicalOperator(token); //|| token === SyntaxKind.QuestionQuestionToken;
}

/** @internal */
export function isLogicalOrCoalescingBinaryExpression(
    expr: Node
): expr is BinaryExpression {
    return (
        isBinaryExpression(expr) &&
        isLogicalOrCoalescingBinaryOperator(expr.operatorToken.kind)
    );
}

/** @internal */
export function isAssignmentOperator(token: SyntaxKind): boolean {
    return (
        token >= SyntaxKind.FirstAssignment &&
        token <= SyntaxKind.LastAssignment
    );
}

export function isOptionalChain(
    node: Node
): node is PropertyAccessChain | ElementAccessChain | CallChain | NonNullChain {
    const kind = node.kind;
    return (
        !!(node.flags & NodeFlags.OptionalChain) &&
        (kind === SyntaxKind.PropertyAccessExpression ||
            kind === SyntaxKind.ElementAccessExpression ||
            kind === SyntaxKind.CallExpression)
    );
}

type AssignmentTarget =
    | BinaryExpression
    | PrefixUnaryExpression
    | PostfixUnaryExpression
    | ForInStatement;

function getAssignmentTarget(node: Node): AssignmentTarget | undefined {
    let parent = node.parent;
    while (true) {
        switch (parent.kind) {
            case SyntaxKind.BinaryExpression:
                const binaryExpression = parent as BinaryExpression;
                const binaryOperator = binaryExpression.operatorToken.kind;
                return isAssignmentOperator(binaryOperator) &&
                    binaryExpression.left === node
                    ? binaryExpression
                    : undefined;
            case SyntaxKind.PrefixUnaryExpression:
            case SyntaxKind.PostfixUnaryExpression:
                const unaryExpression = parent as
                    | PrefixUnaryExpression
                    | PostfixUnaryExpression;
                const unaryOperator = unaryExpression.operator;
                return unaryOperator === SyntaxKind.PlusPlusToken ||
                    unaryOperator === SyntaxKind.MinusMinusToken
                    ? unaryExpression
                    : undefined;
            case SyntaxKind.ForInStatement:
                const forInOrOfStatement = parent as ForInStatement;
                return forInOrOfStatement.initializer === node
                    ? forInOrOfStatement
                    : undefined;
            case SyntaxKind.ParenthesizedExpression:
            case SyntaxKind.ArrayLiteralExpression:
            case SyntaxKind.SpreadElement:
            case SyntaxKind.NonNullExpression:
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

// A node is an assignment target if it is on the left hand side of an '=' token, if it is parented by a property
// assignment in an object literal that is an assignment target, or if it is parented by an array literal that is
// an assignment target. Examples include 'a = xxx', '{ p: a } = xxx', '[{ a }] = xxx'.
// (Note that `p` is not a target in the above examples, only `a`.)
/** @internal */
export function isAssignmentTarget(node: Node): boolean {
    return !!getAssignmentTarget(node);
}

/** @internal */
export function isStringOrNumericLiteralLike(
    node: Node
): node is StringLiteral | NumericLiteral {
    return isStringLiteralLike(node) || isNumericLiteral(node);
}

/** @internal */
export function isPropertyAccessEntityNameExpression(
    node: Node
): node is PropertyAccessEntityNameExpression {
    return (
        isPropertyAccessExpression(node) &&
        isIdentifier(node.name) &&
        isEntityNameExpression(node.expression)
    );
}

/** @internal */
export function isEntityNameExpression(
    node: Node
): node is EntityNameExpression {
    return (
        node.kind === SyntaxKind.Identifier ||
        isPropertyAccessEntityNameExpression(node)
    );
}

/** @internal */
export function isJSDocTypeAssertion(node: Node): node is JSDocTypeAssertion {
    return isParenthesizedExpression(node) && !!getJSDocTypeTag(node);
}

/** @internal */
export function isOuterExpression(
    node: Node,
    kinds = OuterExpressionKinds.All
): node is OuterExpression {
    switch (node.kind) {
        case SyntaxKind.ParenthesizedExpression:
            if (
                kinds & OuterExpressionKinds.ExcludeJSDocTypeAssertion &&
                isJSDocTypeAssertion(node)
            ) {
                return false;
            }
            return (kinds & OuterExpressionKinds.Parentheses) !== 0;
        case SyntaxKind.TypeAssertionExpression:
            return (kinds & OuterExpressionKinds.TypeAssertions) !== 0;
        // case SyntaxKind.NonNullExpression:
        //     return (kinds & OuterExpressionKinds.NonNullAssertions) !== 0;
        case SyntaxKind.PartiallyEmittedExpression:
            return (
                (kinds & OuterExpressionKinds.PartiallyEmittedExpressions) !== 0
            );
    }
    return false;
}

/** @internal */
export function skipOuterExpressions<T extends Expression>(
    node: WrappedExpression<T>
): T;
/** @internal */
export function skipOuterExpressions(
    node: Expression,
    kinds?: OuterExpressionKinds
): Expression;
/** @internal */
export function skipOuterExpressions(
    node: Node,
    kinds?: OuterExpressionKinds
): Node;
/** @internal */
export function skipOuterExpressions(
    node: Node,
    kinds = OuterExpressionKinds.All
) {
    while (isOuterExpression(node, kinds)) {
        node = node.expression;
    }
    return node;
}

/**
 * Bypasses immutability and directly sets the `parent` property of a `Node`.
 *
 * @internal
 */
export function setParent<T extends Node>(
    child: T,
    parent: T["parent"] | undefined
): T;
/** @internal */
export function setParent<T extends Node>(
    child: T | undefined,
    parent: T["parent"] | undefined
): T | undefined;
/** @internal */
export function setParent<T extends Node>(
    child: T | undefined,
    parent: T["parent"] | undefined
): T | undefined {
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
export function getImmediatelyInvokedFunctionExpression(
    func: Node
): CallExpression | undefined {
    if (func.kind === SyntaxKind.FunctionExpression) {
        //|| func.kind === SyntaxKind.ArrowFunction) {
        let prev = func;
        let parent = func.parent;
        while (parent.kind === SyntaxKind.ParenthesizedExpression) {
            prev = parent;
            parent = parent.parent;
        }
        if (
            parent.kind === SyntaxKind.CallExpression &&
            (parent as CallExpression).expression === prev
        ) {
            return parent as CallExpression;
        }
    }
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

    return (
        node.pos === node.end &&
        node.pos >= 0 &&
        node.kind !== SyntaxKind.EndOfFileToken
    );
}

/** @internal */
export function nodeIsPresent(node: Node | undefined): boolean {
    return !nodeIsMissing(node);
}

/** @internal */
export function unreachableCodeIsError(options: CompilerOptions): boolean {
    return options.allowUnreachableCode === false;
}

/** @internal */
export function isFunctionBlock(node: Node): boolean {
    return (
        node && node.kind === SyntaxKind.Block && isFunctionLike(node.parent)
    );
}

/** @internal */
export function sliceAfter<T>(arr: readonly T[], value: T): readonly T[] {
    const index = arr.indexOf(value);
    Debug.assert(index !== -1);
    return arr.slice(index);
}

/** @internal */
export function isDottedName(node: Expression): boolean {
    return (
        node.kind === SyntaxKind.Identifier ||
        node.kind === SyntaxKind.ColonColonToken ||
        (node.kind === SyntaxKind.PropertyAccessExpression &&
            isDottedName((node as PropertyAccessExpression).expression))
        //|| node.kind === SyntaxKind.ParenthesizedExpression && isDottedName((node as ParenthesizedExpression).expression);
    );
}

/** @internal */
export function skipParentheses(node: Expression, excludeJSDocTypeAssertions?: boolean): Expression; // prettier-ignore
/** @internal */
export function skipParentheses(node: Node, excludeJSDocTypeAssertions?: boolean): Node; // prettier-ignore
/** @internal */
export function skipParentheses(node: Node, excludeJSDocTypeAssertions?: boolean): Node { 
    const flags = excludeJSDocTypeAssertions ?
        OuterExpressionKinds.Parentheses | OuterExpressionKinds.ExcludeJSDocTypeAssertion :
        OuterExpressionKinds.Parentheses;
    return skipOuterExpressions(node, flags);
} // prettier-ignore


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
export function hasDynamicName(declaration: Declaration) { //: declaration is DynamicNamedDeclaration | DynamicNamedBinaryExpression {
    // const name = getNameOfDeclaration(declaration);
    // return !!name && isDynamicName(name);
    return false;
    // TODO
}


/**
 * Gets the ModifierFlags for syntactic modifiers on the provided node. The modifier flags cache on the node is ignored.
 *
 * NOTE: This function does not use `parent` pointers and will not include modifiers from JSDoc.
 *
 * @internal
 */
export function getSyntacticModifierFlagsNoCache(node: Node): ModifierFlags {
    let flags = canHaveModifiers(node) ? modifiersToFlags(node.modifiers) : ModifierFlags.None;
    if (node.kind === SyntaxKind.Identifier && node.flags & NodeFlags.IdentifierIsInJSDocNamespace) {
        //TODO flags |= ModifierFlags.Export;
    }
    return flags;
}


function selectSyntacticModifierFlags(flags: ModifierFlags) {
    return flags & ModifierFlags.SyntacticModifiers;
}

function getModifierFlagsWorker(node: Node, includeJSDoc: boolean, alwaysIncludeJSDoc?: boolean): ModifierFlags {
    if (node.kind >= SyntaxKind.FirstToken && node.kind <= SyntaxKind.LastToken) {
        return ModifierFlags.None;
    }

    if (!(node.modifierFlagsCache & ModifierFlags.HasComputedFlags)) {
        node.modifierFlagsCache = getSyntacticModifierFlagsNoCache(node) | ModifierFlags.HasComputedFlags;
    }
  
    return selectSyntacticModifierFlags(node.modifierFlagsCache);
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


/** @internal */
export function hasSyntacticModifiers(node: Node) {
    return getSyntacticModifierFlags(node) !== ModifierFlags.None;
}

/** @internal */
export function getSelectedSyntacticModifierFlags(node: Node, flags: ModifierFlags): ModifierFlags {
    return getSyntacticModifierFlags(node) & flags;
}

/** @internal */
export function hasSyntacticModifier(node: Node, flags: ModifierFlags): boolean {
    return !!getSelectedSyntacticModifierFlags(node, flags);
}

/// Given a BinaryExpression, returns SpecialPropertyAssignmentKind for the various kinds of property
/// assignments we treat as special in the binder
/** @internal */
export function getAssignmentDeclarationKind(expr: BinaryExpression | CallExpression): AssignmentDeclarationKind {
    const special = getAssignmentDeclarationKindWorker(expr);
    return special === AssignmentDeclarationKind.Property  ? special : AssignmentDeclarationKind.None;
}

/** @internal */
export function isAccessExpression(node: Node): node is AccessExpression {
    return node.kind === SyntaxKind.PropertyAccessExpression || node.kind === SyntaxKind.ElementAccessExpression;
}

function isVoidZero(node: Node) {
    return isVoidExpression(node) && isNumericLiteral(node.expression) && node.expression.text === "0";
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

/** @internal */
export function getRightMostAssignedExpression(node: Expression): Expression {
    while (isAssignmentExpression(node, /*excludeCompoundAssignment*/ true)) {
        node = node.right;
    }
    return node;
}

/** @internal */
export function getAssignmentDeclarationPropertyAccessKind(lhs: AccessExpression): AssignmentDeclarationKind {
    // if (lhs.expression.kind === SyntaxKind.ThisKeyword) {
    //     return AssignmentDeclarationKind.ThisProperty;
    // }
    // else if (isModuleExportsAccessExpression(lhs)) {
    //     // module.exports = expr
    //     return AssignmentDeclarationKind.ModuleExports;
    // }
    // else if (isBindableStaticNameExpression(lhs.expression, /*excludeThisKeyword*/ true)) {
    //     if (isPrototypeAccess(lhs.expression)) {
    //         // F.G....prototype.x = expr
    //         return AssignmentDeclarationKind.PrototypeProperty;
    //     }

    //     let nextToLast = lhs;
    //     while (!isIdentifier(nextToLast.expression)) {
    //         nextToLast = nextToLast.expression as Exclude<BindableStaticNameExpression, Identifier>;
    //     }
    //     const id = nextToLast.expression;
    //     if (
    //         (id.escapedText === "exports" ||
    //             id.escapedText === "module" && getElementOrPropertyAccessName(nextToLast) === "exports") &&
    //         // ExportsProperty does not support binding with computed names
    //         isBindableStaticAccessExpression(lhs)
    //     ) {
    //         // exports.name = expr OR module.exports.name = expr OR exports["name"] = expr ...
    //         return AssignmentDeclarationKind.ExportsProperty;
    //     }

    // TODO: do we need this one?

    //     if (isBindableStaticNameExpression(lhs, /*excludeThisKeyword*/ true) || (isElementAccessExpression(lhs) && isDynamicName(lhs))) {
    //         // F.G...x = expr
    //         return AssignmentDeclarationKind.Property;
    //     }
    // }

    return AssignmentDeclarationKind.None;
}


function getAssignmentDeclarationKindWorker(expr: BinaryExpression | CallExpression): AssignmentDeclarationKind {
    if (isCallExpression(expr)) {
             return AssignmentDeclarationKind.None;
        // if (!isBindableObjectDefinePropertyCall(expr)) {
        //     return AssignmentDeclarationKind.None;
        // }
        //const entityName = expr.arguments[0];
        // if (isExportsIdentifier(entityName) || isModuleExportsAccessExpression(entityName)) {
        //     return AssignmentDeclarationKind.ObjectDefinePropertyExports;
        // }
        // if (isBindableStaticAccessExpression(entityName) && getElementOrPropertyAccessName(entityName) === "prototype") {
        //     return AssignmentDeclarationKind.ObjectDefinePrototypeProperty;
        // }
        //return AssignmentDeclarationKind.ObjectDefinePropertyValue;
    }
    if (expr.operatorToken.kind !== SyntaxKind.EqualsToken || !isAccessExpression(expr.left) || isVoidZero(getRightMostAssignedExpression(expr))) {
        return AssignmentDeclarationKind.None;
    }
    
    return getAssignmentDeclarationPropertyAccessKind(expr.left);
}


/**
 * Does not handle signed numeric names like `a[+0]` - handling those would require handling prefix unary expressions
 * throughout late binding handling as well, which is awkward (but ultimately probably doable if there is demand)
 *
 * @internal
 */
export function getElementOrPropertyAccessArgumentExpressionOrName(node: AccessExpression): Identifier | PrivateIdentifier | StringLiteral | NumericLiteral | ElementAccessExpression | undefined {
    if (isPropertyAccessExpression(node)) {
        return node.name;
    }
    const arg = skipParentheses(node.argumentExpression);
    if (isNumericLiteral(arg) || isStringLiteralLike(arg)) {
        return arg;
    }
    return node;
}


/**
 * Any series of property and element accesses, ending in a literal element access
 *
 * @internal
 */
export function isBindableStaticElementAccessExpression(node: Node, excludeThisKeyword?: boolean): node is BindableStaticElementAccessExpression {
    return false;
    // return isLiteralLikeElementAccess(node)
    //     && ((!excludeThisKeyword && node.expression.kind === SyntaxKind.ThisKeyword) ||
    //         isEntityNameExpression(node.expression) ||
    //         isBindableStaticAccessExpression(node.expression, /*excludeThisKeyword*/ true));
}

/** @internal */
export function isSignedNumericLiteral(node: Node): node is PrefixUnaryExpression & { operand: NumericLiteral; } {
    return isPrefixUnaryExpression(node) && (node.operator === SyntaxKind.PlusToken || node.operator === SyntaxKind.MinusToken) && isNumericLiteral(node.operand);
}


/** @internal */
export function getContainingClass(node: Node): ClassLikeDeclaration | undefined {
    return findAncestor(node.parent, isClassLike);
}


/** @internal */
export function getSymbolNameForPrivateIdentifier(containingClassSymbol: Symbol, description: string): string {
    return `__#${getSymbolId(containingClassSymbol)}@${description}` as string;
}


/** @internal */
export function isPropertyNameLiteral(node: Node): node is PropertyNameLiteral {
    switch (node.kind) {
        case SyntaxKind.Identifier:
        case SyntaxKind.StringLiteral:
        //case SyntaxKind.NoSubstitutionTemplateLiteral:
        case SyntaxKind.NumericLiteral:
            return true;
        default:
            return false;
    }
}


/** @internal */
export function getEscapedTextOfIdentifierOrLiteral(node: PropertyNameLiteral): string {
    return isMemberName(node) ? node.text : escapeLeadingUnderscores(node.text);
}

function getSpanOfNode(node: Node): TextSpan {
    return createTextSpan(node.pos, node.end - node.pos);    
}

/** @internal */
export function getErrorSpanForNode(sourceFile: SourceFile, node: Node): TextSpan {
    let errorNode: Node | undefined = node;
    switch (node.kind) {
        case SyntaxKind.SourceFile: {
            const pos = skipTrivia(sourceFile.text, 0, /*stopAfterLineBreak*/ false);
            if (pos === sourceFile.text.length) {
                // file is empty - return span for the beginning of the file
                return createTextSpan(0, 0);
            }
            return createTextSpan(node.pos, node.end-node.pos) // TODO: getSpanOfTokenAtPosition(sourceFile, pos);
        }
        // This list is a work in progress. Add missing node kinds to improve their error
        // spans.
        case SyntaxKind.VariableDeclaration:
        case SyntaxKind.BindingElement:        
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.MethodDeclaration:        
            errorNode = (node as NamedDeclaration).name;
            break;
        // case SyntaxKind.ArrowFunction:
        //     return getErrorSpanForArrowFunction(sourceFile, node as ArrowFunction);
        // case SyntaxKind.CaseClause:
        // case SyntaxKind.DefaultClause: {
        //     const start = skipTrivia(sourceFile.text, (node as CaseOrDefaultClause).pos);
        //     const end = (node as CaseOrDefaultClause).statements.length > 0 ? (node as CaseOrDefaultClause).statements[0].pos : (node as CaseOrDefaultClause).end;
        //     return createTextSpanFromBounds(start, end);
        // }
        case SyntaxKind.ReturnStatement: {
            const pos = skipTrivia(sourceFile.text, (node as ReturnStatement).pos);
            return getSpanOfNode(node);
            //TODO return getSpanOfTokenAtPosition(sourceFile, pos);
        }        
        // case SyntaxKind.JSDocSatisfiesTag: {
        //     const pos = skipTrivia(sourceFile.text, (node as JSDocSatisfiesTag).tagName.pos);
        //     return getSpanOfTokenAtPosition(sourceFile, pos);
        // }
    }

    if (errorNode === undefined) {
        // If we don't have a better node, then just set the error on the first token of
        // construct.
        return getSpanOfNode(node);
        //TODO return getSpanOfTokenAtPosition(sourceFile, node.pos);
    }
    
    const isMissing = nodeIsMissing(errorNode);
    const pos = isMissing
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
export function createDiagnosticForNodeInSourceFile(sourceFile: SourceFile, node: Node, message: DiagnosticMessage, ...args: DiagnosticArguments): DiagnosticWithLocation {
    const span = getErrorSpanForNode(sourceFile, node);
    return createFileDiagnostic(sourceFile, span.start, span.length, message, ...args);
}

function assertDiagnosticLocation(sourceText: string, start: number, length: number) {
    Debug.assertGreaterThanOrEqual(start, 0);
    Debug.assertGreaterThanOrEqual(length, 0);
    Debug.assertLessThanOrEqual(start, sourceText.length);
    Debug.assertLessThanOrEqual(start + length, sourceText.length);
}

/** @internal */
export function getLocaleSpecificMessage(message: DiagnosticMessage) {
    return localizedDiagnosticMessages && localizedDiagnosticMessages[message.key] || message.message;
}

/** @internal */
export function formatStringFromArgs(text: string, args: DiagnosticArguments): string {
    return text.replace(/{(\d+)}/g, (_match, index: string) => "" + Debug.checkDefined(args[+index]));
}

/** @internal */
export function createFileDiagnostic(file: SourceFile, start: number, length: number, message: DiagnosticMessage, ...args: DiagnosticArguments): DiagnosticWithLocation {
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


/** @internal */
export function positionIsSynthesized(pos: number): boolean {
    // This is a fast way of testing the following conditions:
    //  pos === undefined || pos === null || isNaN(pos) || pos < 0;
    return !(pos >= 0);
}


/** @internal */
export function setValueDeclaration(symbol: Symbol, node: Declaration): void {
    const { valueDeclaration } = symbol;
    if (
        !valueDeclaration 
        //||
        // !(node.flags & NodeFlags.Ambient && !isInJSFile(node) && !(valueDeclaration.flags & NodeFlags.Ambient)) && (isAssignmentDeclaration(valueDeclaration) && !isAssignmentDeclaration(node)) ||
        // (valueDeclaration.kind !== node.kind && isEffectiveModuleDeclaration(valueDeclaration))
    ) {
        // other kinds of value declarations take precedence over modules and assignment declarations
        symbol.valueDeclaration = node;
    }
}

/** @internal */
export function getFullWidth(node: Node) {
    return node.end - node.pos;
}

function isJSDocTypeExpressionOrChild(node: Node): boolean {
    return !!findAncestor(node, isJSDocTypeExpression);
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
export function getSourceTextOfNodeFromSourceFile(sourceFile: SourceFile, node: Node, includeTrivia = false): string {
    return getTextOfNodeFromSourceText(sourceFile.text, node, includeTrivia);
}

/** @internal */
export function getTextOfNode(node: Node, includeTrivia = false): string {
    return getSourceTextOfNodeFromSourceFile(getSourceFileOfNode(node), node, includeTrivia);
}

// Return display name of an identifier
// Computed property names will just be emitted as "[<expr>]", where <expr> is the source
// text of the expression in the computed property.
/** @internal */
export function declarationNameToString(name: DeclarationName | QualifiedName | undefined) {
    return !name || getFullWidth(name) === 0 ? "(Missing)" : getTextOfNode(name);
}

/** @internal */
export function addRelatedInfo<T extends Diagnostic>(diagnostic: T, ...relatedInformation: DiagnosticRelatedInformation[]): T {
    if (!relatedInformation.length) {
        return diagnostic;
    }
    if (!diagnostic.relatedInformation) {
        diagnostic.relatedInformation = [];
    }
    Debug.assert(diagnostic.relatedInformation !== emptyArray, "Diagnostic had empty array singleton for related info, but is still being constructed!");
    diagnostic.relatedInformation.push(...relatedInformation);
    return diagnostic;
}

/** @internal */
export function isBlockOrCatchScoped(declaration: Declaration) {
    return (getCombinedNodeFlags(declaration) & NodeFlags.BlockScoped) !== 0 ||
        isCatchClauseVariableDeclarationOrBindingElement(declaration);
}


/** @internal */
export function isCatchClauseVariableDeclarationOrBindingElement(declaration: Declaration) {
    const node = getRootDeclaration(declaration);
    return node.kind === SyntaxKind.VariableDeclaration && node.parent.kind === SyntaxKind.CatchClause;
}

/** @internal */
export function getRootDeclaration(node: Node): Node {
    while (node.kind === SyntaxKind.BindingElement) {
        node = node.parent.parent;
    }
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
export function isObjectLiteralOrClassExpressionMethodOrAccessor(node: Node): node is MethodDeclaration  {
    return (node.kind === SyntaxKind.MethodDeclaration ) &&
        (node.parent.kind === SyntaxKind.ObjectLiteralExpression ||
            node.parent.kind === SyntaxKind.ClassExpression);
}

/** @internal */
export function isObjectLiteralMethod(node: Node): node is MethodDeclaration {
    return node && node.kind === SyntaxKind.MethodDeclaration && node.parent.kind === SyntaxKind.ObjectLiteralExpression;
}