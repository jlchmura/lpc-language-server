import { AssertionLevel, hasProperty } from "./core";
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
} from "./lpc";
import { LPCLexer } from "../parser3/LPCLexer";
import { Debug } from "./debug";
import {
    isBinaryExpression,
    isIdentifier,
    isNumericLiteral,
    isParenthesizedExpression,
    isPropertyAccessExpression,
} from "./nodeTests";
import {
    getJSDocTypeTag,
    isFunctionLike,
    isStringLiteralLike,
} from "./utilitiesPublic";

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
export function modifiersToFlags(
    modifiers: readonly ModifierLike[] | undefined
) {
    let flags = ModifierFlags.None;
    if (modifiers) {
        for (const modifier of modifiers) {
            flags |= modifierToFlag(modifier.getSymbol().type);
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
