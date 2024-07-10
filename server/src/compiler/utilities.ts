import * as __types from "./types";
import { AssertionLevel, MapLike, addRange, assertType, binarySearch, compareStringsCaseSensitive, compareValues, contains, emptyArray, filter, find, firstOrUndefined, flatMap, flatMapToMutable, forEach, hasProperty, identity, insertSorted, isString, last, lastOrUndefined, length, returnFalse, returnUndefined, some, startsWith } from "./core";
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
    TypeChecker,
    TypeFlags,
    Type,
    SignatureFlags,
    Signature,
    FunctionLikeDeclaration,
    PropertyDeclaration,
    ParameterDeclaration,
    BindingElement,
    FunctionExpression,
    InferTypeNode,
    FunctionDeclaration,
    SignatureDeclaration,
    TypeNodeSyntaxKind,
    ArrowFunction,
    DiagnosticCollection,
    DiagnosticMessageChain,
    NumberLiteralType,
    StringLiteralType,
    TypeNode,
    HasType,
    VariableDeclaration,
    VariableDeclarationList,
    PrimitiveLiteral,
    KeywordSyntaxKind,
    JSDocSignature,
    Block,
    Statement,
    ExpressionStatement,
    ForStatement,
    ComputedPropertyName,
    HasInitializer,
    EvaluationResolver,
    EvaluatorResult,
    EntityNameOrEntityNameExpression,
    VariableLikeDeclaration,
    JSDoc,
    JSDocTag,
    JSDocArray,
    TypeParameterDeclaration,
    ImportClause,
    ImportSpecifier,
    CanonicalDiagnostic,
    CheckFlags,
    TransientSymbol,
    ObjectFlags,
    ObjectFlagsType,
    ThisContainer,
    BindableObjectDefinePropertyCall,
    ObjectLiteralExpression,
    LiteralLikeElementAccessExpression,
    EmitTextWriter,
    HasFlowNode,
    PropertySignature,
    HasExpressionInitializer,
    JSDocParameterTag,
    HasJSDoc,
    ClassElement,
    TypeElement,
    ObjectLiteralElement,
    ObjectTypeDeclaration,
    InterfaceDeclaration,
    HeritageClause,
    ParenthesizedTypeNode,
    ExpressionWithTypeArguments,
    JSDocTemplateTag,
    TypeAssertion,
    ImportTypeNode,
    PropertyName,
    TypeAliasDeclaration,
    RequireOrImportCall,
    ShiftOperator,
    ShiftOperatorOrHigher,
    AdditiveOperatorOrHigher,
    ExponentiationOperator,
    MultiplicativeOperator,
    MultiplicativeOperatorOrHigher,
    AdditiveOperator,
} from "./types";
import { LPCLexer } from "../parser3/LPCLexer";
import { Debug } from "./debug";
import {
    isBinaryExpression,
    isBindingElement,
    isCallExpression,
    isClassStaticBlockDeclaration,
    isDecorator,
    isElementAccessExpression,
    isExpressionStatement,
    isExpressionWithTypeArguments,
    isFunctionDeclaration,
    isFunctionExpression,
    isGetAccessorDeclaration,
    isHeritageClause,
    isIdentifier,
    isJSDoc,
    isJSDocAugmentsTag,
    isJSDocImplementsTag,
    isJSDocSignature,
    isJSDocTypeExpression,
    isJSDocTypeTag,
    isNumericLiteral,
    isObjectBindingPattern,
    isObjectLiteralExpression,
    isParameter,
    isParenthesizedExpression,
    isParenthesizedTypeNode,
    isPrefixUnaryExpression,
    isPrivateIdentifier,
    isPropertyAccessExpression,
    isPropertySignature,
    isQualifiedName,
    isSetAccessorDeclaration,
    isSourceFile,
    isTypeAliasDeclaration,
    isVariableDeclaration,
    isVariableStatement,
    isVoidExpression,
} from "./nodeTests";
import {
    canHaveLocals,
    canHaveModifiers,
    createTextSpan,
    createTextSpanFromBounds,
    escapeLeadingUnderscores,
    findAncestor,
    getCombinedModifierFlags,
    getCombinedNodeFlags,
    getJSDocAugmentsTag,
    getJSDocParameterTags,
    getJSDocParameterTagsNoCache,
    getJSDocSatisfiesTag,
    getJSDocTypeParameterTags,
    getJSDocTypeParameterTagsNoCache,
    getJSDocTypeTag,
    hasInitializer,
    hasJSDocNodes,
    idText,
    isBindingPattern,
    isClassLike,
    isFunctionLike,
    isFunctionLikeDeclaration,
    isFunctionLikeOrClassStaticBlockDeclaration,
    isLeftHandSideExpression,
    isMemberName,
    isMethodOrAccessor,
    isPropertyName,
    isStringLiteralLike,
    isTypeNode,
    unescapeLeadingUnderscores,
} from "./utilitiesPublic";
import { getSymbolId } from "./checker";
import { skipTrivia, tokenToString } from "./scanner";
import { forEachChild } from "./parser";
import { Comparison, SortedArray } from "./corePublic";
import { CharacterCodes } from "../backend/types";

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
    getTypeConstructor(): new (checker: Partial<TypeChecker>, flags: TypeFlags) => Type;
    getSignatureConstructor(): new (checker: Partial<TypeChecker>, flags: SignatureFlags) => Signature;
}

/** @internal */
export const objectAllocator: ObjectAllocator = {
    getNodeConstructor: () => Node as any,
    getTokenConstructor: () => Token as any,
    getIdentifierConstructor: () => Identifier as any,
    getPrivateIdentifierConstructor: () => Node as any,
    getSourceFileConstructor: () => Node as any,
    getSymbolConstructor: () => Symbol as any,
    getTypeConstructor: () => Type as any,
    getSignatureConstructor: () => Signature as any,
};

function Type(this: Type, checker: TypeChecker, flags: TypeFlags) {
    // Note: if modifying this, be sure to update TypeObject in src/services/services.ts
    this.flags = flags;
    if (Debug.isDebugging) {// || tracing) {
        this.checker = checker;
    }
}

function Signature(this: Signature, checker: TypeChecker, flags: SignatureFlags) {
    // Note: if modifying this, be sure to update SignatureObject in src/services/services.ts
    this.flags = flags;
    if (Debug.isDebugging) {
        this.checker = checker;
    }
}

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
        isBinaryLogicalOperator(token) || token === SyntaxKind.ExclamationToken || token === SyntaxKind.CommaToken
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
        case SyntaxKind.IntLiteral:
        case SyntaxKind.FloatLiteral:
        //case SyntaxKind.NoSubstitutionTemplateLiteral:
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

/** @internal */
export function nodeIsSynthesized(range: TextRange): boolean {
    return positionIsSynthesized(range.pos)
        || positionIsSynthesized(range.end);
}

/**
 * Gets the effective ModifierFlags for the provided node, including JSDoc modifiers. The modifier flags cache on the node is ignored.
 *
 * NOTE: This function may use `parent` pointers.
 *
 * @internal
 */
export function getEffectiveModifierFlagsNoCache(node: Node): ModifierFlags {
    return getSyntacticModifierFlagsNoCache(node);// TODO:  | getJSDocModifierFlagsNoCache(node);
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
    ) => void;
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
    //var isolatedModulesLikeFlagName = compilerOptions.verbatimModuleSyntax ? "verbatimModuleSyntax" : "isolatedModules";
    /* eslint-disable no-var */
    var emitStandardClassFields = true;// getEmitStandardClassFields(compilerOptions);
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
        const name = isString(nameArg) ? nameArg : (nameArg as Identifier).text;
        loop:
        while (location) {
            if (name === "const" && isConstAssertion(location)) {
                // `const` in an `as const` has no symbol, but issues no error because there is no *actual* lookup of the type
                // (it refers to the constant type of the expression instead)
                return undefined;
            }
            
            // WAS: Locals of a source file are not in scope (because they get merged into the global symbol table)
            // LPC locals ARE in scope
            if (canHaveLocals(location) && location.locals) { // && !isGlobalSourceFile(location)) {
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
                    // else if (location.kind === SyntaxKind.ConditionalType) {
                    //     // A type parameter declared using 'infer T' in a conditional type is visible only in
                    //     // the true branch of the conditional type.
                    //     useResult = lastLocation === location.trueType;
                    // }

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
                    //if (!isExternalOrCommonJsModule(location as SourceFile)) break;
                    // falls through
                // case SyntaxKind.ModuleDeclaration:
                //     const moduleExports = getSymbolOfDeclaration(location as SourceFile | ModuleDeclaration)?.exports || emptySymbols;
                //     if (location.kind === SyntaxKind.SourceFile || (isModuleDeclaration(location) && location.flags & NodeFlags.Ambient && !isGlobalScopeAugmentation(location))) {
                //         // It's an external module. First see if the module has an export default and if the local
                //         // name of that export default matches.
                //         if (result = moduleExports.get(InternalSymbolName.Default)) {
                //             const localSymbol = getLocalSymbolForExportDefault(result);
                //             if (localSymbol && (result.flags & meaning) && localSymbol.escapedName === name) {
                //                 break loop;
                //             }
                //             result = undefined;
                //         }

                //         // Because of module/namespace merging, a module's exports are in scope,
                //         // yet we never want to treat an export specifier as putting a member in scope.
                //         // Therefore, if the name we find is purely an export specifier, it is not actually considered in scope.
                //         // Two things to note about this:
                //         //     1. We have to check this without calling getSymbol. The problem with calling getSymbol
                //         //        on an export specifier is that it might find the export specifier itself, and try to
                //         //        resolve it as an alias. This will cause the checker to consider the export specifier
                //         //        a circular alias reference when it might not be.
                //         //     2. We check === SymbolFlags.Alias in order to check that the symbol is *purely*
                //         //        an alias. If we used &, we'd be throwing out symbols that have non alias aspects,
                //         //        which is not the desired behavior.
                //         const moduleExport = moduleExports.get(name);
                //         if (
                //             moduleExport &&
                //             moduleExport.flags === SymbolFlags.Alias &&
                //             (getDeclarationOfKind(moduleExport, SyntaxKind.ExportSpecifier) || getDeclarationOfKind(moduleExport, SyntaxKind.NamespaceExport))
                //         ) {
                //             break;
                //         }
                //     }

                //     // ES6 exports are also visible locally (except for 'default'), but commonjs exports are not (except typedefs)
                //     if (name !== InternalSymbolName.Default && (result = lookup(moduleExports, name, meaning & SymbolFlags.ModuleMember))) {
                //         if (isSourceFile(location) && location.commonJsModuleIndicator && !result.declarations?.some(isJSDocTypeAlias)) {
                //             result = undefined;
                //         }
                //         else {
                //             break loop;
                //         }
                //     }
                //     break;
                // case SyntaxKind.EnumDeclaration:
                //     if (result = lookup(getSymbolOfDeclaration(location as EnumDeclaration)?.exports || emptySymbols, name, meaning & SymbolFlags.EnumMember)) {
                //         if (nameNotFoundMessage && getIsolatedModules(compilerOptions) && !(location.flags & NodeFlags.Ambient) && getSourceFileOfNode(location) !== getSourceFileOfNode(result.valueDeclaration)) {
                //             error(
                //                 originalLocation,
                //                 Diagnostics.Cannot_access_0_from_another_file_without_qualification_when_1_is_enabled_Use_2_instead,
                //                 unescapeLeadingUnderscores(name),
                //                 isolatedModulesLikeFlagName,
                //                 `${unescapeLeadingUnderscores(getSymbolOfDeclaration(location as EnumDeclaration).escapedName)}.${unescapeLeadingUnderscores(name)}`,
                //             );
                //         }
                //         break loop;
                //     }
                //     break;
                // case SyntaxKind.PropertyDeclaration:
                //     // TypeScript 1.0 spec (April 2014): 8.4.1
                //     // Initializer expressions for instance member variables are evaluated in the scope
                //     // of the class constructor body but are not permitted to reference parameters or
                //     // local variables of the constructor. This effectively means that entities from outer scopes
                //     // by the same name as a constructor parameter or local variable are inaccessible
                //     // in initializer expressions for instance member variables.
                //     if (!isStatic(location)) {
                //         const ctor = findConstructorDeclaration(location.parent as ClassLikeDeclaration);
                //         if (ctor && ctor.locals) {
                //             if (lookup(ctor.locals, name, meaning & SymbolFlags.Value)) {
                //                 // Remember the property node, it will be used later to report appropriate error
                //                 Debug.assertNode(location, isPropertyDeclaration);
                //                 propertyWithInvalidInitializer = location;
                //             }
                //         }
                //     }
                //     break;
                // case SyntaxKind.ClassDeclaration:
                // case SyntaxKind.ClassExpression:
                // case SyntaxKind.InterfaceDeclaration:
                //     // The below is used to lookup type parameters within a class or interface, as they are added to the class/interface locals
                //     // These can never be latebound, so the symbol's raw members are sufficient. `getMembersOfNode` cannot be used, as it would
                //     // trigger resolving late-bound names, which we may already be in the process of doing while we're here!
                //     if (result = lookup(getSymbolOfDeclaration(location as ClassLikeDeclaration | InterfaceDeclaration).members || emptySymbols, name, meaning & SymbolFlags.Type)) {
                //         if (!isTypeParameterSymbolDeclaredInContainer(result, location)) {
                //             // ignore type parameters not declared in this container
                //             result = undefined;
                //             break;
                //         }
                //         if (lastLocation && isStatic(lastLocation)) {
                //             // TypeScript 1.0 spec (April 2014): 3.4.1
                //             // The scope of a type parameter extends over the entire declaration with which the type
                //             // parameter list is associated, with the exception of static member declarations in classes.
                //             if (nameNotFoundMessage) {
                //                 error(originalLocation, Diagnostics.Static_members_cannot_reference_class_type_parameters);
                //             }
                //             return undefined;
                //         }
                //         break loop;
                //     }
                //     if (isClassExpression(location) && meaning & SymbolFlags.Class) {
                //         const className = location.name;
                //         if (className && name === className.escapedText) {
                //             result = location.symbol;
                //             break loop;
                //         }
                //     }
                //     break;
                // case SyntaxKind.ExpressionWithTypeArguments:
                //     // The type parameters of a class are not in scope in the base class expression.
                //     if (lastLocation === (location as ExpressionWithTypeArguments).expression && (location.parent as HeritageClause).token === SyntaxKind.ExtendsKeyword) {
                //         const container = location.parent.parent;
                //         if (isClassLike(container) && (result = lookup(getSymbolOfDeclaration(container).members!, name, meaning & SymbolFlags.Type))) {
                //             if (nameNotFoundMessage) {
                //                 error(originalLocation, Diagnostics.Base_class_expressions_cannot_reference_class_type_parameters);
                //             }
                //             return undefined;
                //         }
                //     }
                //     break;
                // It is not legal to reference a class's own type parameters from a computed property name that
                // belongs to the class. For example:
                //
                //   function foo<T>() { return '' }
                //   class C<T> { // <-- Class's own type parameter T
                //       [foo<T>()]() { } // <-- Reference to T from class's own computed property
                //   }
                //
                // case SyntaxKind.ComputedPropertyName:
                //     grandparent = location.parent.parent;
                //     if (isClassLike(grandparent) || grandparent.kind === SyntaxKind.InterfaceDeclaration) {
                //         // A reference to this grandparent's type parameters would be an error
                //         if (result = lookup(getSymbolOfDeclaration(grandparent as ClassLikeDeclaration | InterfaceDeclaration).members!, name, meaning & SymbolFlags.Type)) {
                //             if (nameNotFoundMessage) {
                //                 error(originalLocation, Diagnostics.A_computed_property_name_cannot_reference_a_type_parameter_from_its_containing_type);
                //             }
                //             return undefined;
                //         }
                //     }
                //     break;
                // case SyntaxKind.ArrowFunction:
                //     // when targeting ES6 or higher there is no 'arguments' in an arrow function
                //     // for lower compile targets the resolved symbol is used to emit an error
                //     if (getEmitScriptTarget(compilerOptions) >= ScriptTarget.ES2015) {
                //         break;
                //     }
                //     // falls through
                case SyntaxKind.MethodDeclaration:                
                case SyntaxKind.FunctionDeclaration:
                    if (meaning & SymbolFlags.Variable && name === "arguments") {
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
                // case SyntaxKind.JSDocTypedefTag:
                // case SyntaxKind.JSDocCallbackTag:
                // case SyntaxKind.JSDocEnumTag:
                // case SyntaxKind.JSDocImportTag:
                //     // js type aliases do not resolve names from their host, so skip past it
                //     const root = getJSDocRoot(location);
                //     if (root) {
                //         location = root.parent;
                //     }
                //     break;
                case SyntaxKind.Parameter:
                    if (
                        lastLocation && (
                            lastLocation === (location as ParameterDeclaration).initializer ||
                            lastLocation === (location as ParameterDeclaration).name && isBindingPattern(lastLocation)
                        )
                    ) {
                        if (!associatedDeclarationForContainingInitializerOrBindingName) {
                            associatedDeclarationForContainingInitializerOrBindingName = location as ParameterDeclaration;
                        }
                    }
                    break;
                case SyntaxKind.BindingElement:
                    if (
                        lastLocation && (
                            lastLocation === (location as BindingElement).initializer ||
                            lastLocation === (location as BindingElement).name && isBindingPattern(lastLocation)
                        )
                    ) {
                        if (isPartOfParameterDeclaration(location as BindingElement) && !associatedDeclarationForContainingInitializerOrBindingName) {
                            associatedDeclarationForContainingInitializerOrBindingName = location as BindingElement;
                        }
                    }
                    break;
                case SyntaxKind.InferType:
                    if (meaning & SymbolFlags.TypeParameter) {
                        const parameterName = (location as InferTypeNode).typeParameter.name;
                        if (parameterName && name === parameterName.text) {
                            result = (location as InferTypeNode).typeParameter.symbol;
                            break loop;
                        }
                    }
                    break;               
            }
            if (isSelfReferenceLocation(location)) {
                lastSelfReferenceLocation = location;
            }
            lastLocation = location;
            location = location.parent;
            // location = isJSDocTemplateTag(location) ? getEffectiveContainerForJSDocTemplateTag(location) || location.parent :
            //     isJSDocParameterTag(location) || isJSDocReturnTag(location) ? getHostSignatureFromJSDoc(location) || location.parent :
            //     location.parent;
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
                // if (lastLocation.commonJsModuleIndicator && name === "exports" && meaning & lastLocation.symbol.flags) {
                //     return lastLocation.symbol;
                // }
            }

            if (!excludeGlobals) {
                result = lookup(globals, name, meaning);
            }
        }
        if (!result) {
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
                onFailedToResolveSymbol(originalLocation, nameArg, meaning, nameNotFoundMessage);
            }
            else {
                onSuccessfullyResolvedSymbol(originalLocation, result, meaning, lastLocation, associatedDeclarationForContainingInitializerOrBindingName, withinDeferredContext);
            }
        }

        return result;
    }

    function useOuterVariableScopeInParameter(result: Symbol, location: Node, lastLocation: Node) {
        //const target = getEmitScriptTarget(compilerOptions);
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
                case SyntaxKind.ArrowFunction:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.FunctionDeclaration:                
                    // do not descend into these
                    return false;
                case SyntaxKind.MethodDeclaration:                
                case SyntaxKind.PropertyAssignment:
                    return requiresScopeChangeWorker((node as MethodDeclaration | PropertyAssignment).name);
                case SyntaxKind.PropertyDeclaration:
                    // static properties in classes introduce temporary variables
                    // if (hasStaticModifier(node)) {
                    //     return !emitStandardClassFields;
                    // }
                    return requiresScopeChangeWorker((node as PropertyDeclaration).name);
                default:
                    // null coalesce and optional chain pre-es2020 produce temporary variables
                    // if (isNullishCoalesce(node) || isOptionalChain(node)) {
                    //     return target < ScriptTarget.ES2020;
                    // }
                    if (isBindingElement(node) && node.dotDotDotToken && isObjectBindingPattern(node.parent)) {
                        return true;
                        //return target < ScriptTarget.ES2017;
                    }
                    if (isTypeNode(node)) return false;
                    return forEachChild(node, requiresScopeChangeWorker) || false;
            }
        }
    }

    function getIsDeferredContext(location: Node, lastLocation: Node | undefined): boolean {
        if (location.kind !== SyntaxKind.ArrowFunction && location.kind !== SyntaxKind.FunctionExpression) {
            // initializers in instance property declaration of class like entities are executed in constructor and thus deferred
            return ((
                isFunctionLikeDeclaration(location) ||
                (location.kind === SyntaxKind.PropertyDeclaration)
            ) && (!lastLocation || lastLocation !== (location as SignatureDeclaration | PropertyDeclaration).name)); // A name is evaluated within the enclosing scope - so it shouldn't count as deferred
        }
        if (lastLocation && lastLocation === (location as FunctionExpression | ArrowFunction).name) {
            return false;
        }
        // generator functions and async functions are not inlined in control flow when immediately invoked
        if (hasSyntacticModifier(location, ModifierFlags.Async)) {
            return true;
        }
        return !getImmediatelyInvokedFunctionExpression(location);
    }

    type SelfReferenceLocation =
        | FunctionDeclaration;
        //| ClassDeclaration
        // | InterfaceDeclaration
        // | EnumDeclaration
        // | TypeAliasDeclaration
        // | ModuleDeclaration;

    function isSelfReferenceLocation(node: Node): node is SelfReferenceLocation {
        switch (node.kind) {
            case SyntaxKind.FunctionDeclaration:
            // case SyntaxKind.ClassDeclaration:
            // case SyntaxKind.InterfaceDeclaration:
            // case SyntaxKind.EnumDeclaration:
            // case SyntaxKind.TypeAliasDeclaration:
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
                    decl.parent;
                    // TODO:
                    // const parent = isJSDocTemplateTag(decl.parent) ? getJSDocHost(decl.parent) : decl.parent;
                    // if (parent === container) {
                    //     return !(isJSDocTemplateTag(decl.parent) && find((decl.parent.parent as JSDoc).tags, isJSDocTypeAlias));
                    // }
                }
            }
        }

        return false;
    }
}

/** @internal */
export function isConstAssertion(location: Node) {
    return false;
    // return (isAssertionExpression(location) && isConstTypeReference(location.type))
    //     || (isJSDocTypeTag(location) && isConstTypeReference(location.typeExpression));
}

/** @internal */
export function isTypeNodeKind(kind: SyntaxKind): kind is TypeNodeSyntaxKind {
    return (kind >= SyntaxKind.FirstTypeNode && kind <= SyntaxKind.LastTypeNode)
        //|| kind === SyntaxKind.AnyKeyword
        || kind === SyntaxKind.UnknownKeyword
        //|| kind === SyntaxKind.NumberKeyword
        //|| kind === SyntaxKind.BigIntKeyword
        || kind === SyntaxKind.IntKeyword
        || kind === SyntaxKind.FloatKeyword
        || kind === SyntaxKind.MappingKeyword
        || kind === SyntaxKind.MixedKeyword
        || kind === SyntaxKind.ObjectKeyword
        //|| kind === SyntaxKind.BooleanKeyword
        || kind === SyntaxKind.StringKeyword
        //|| kind === SyntaxKind.SymbolKeyword
        || kind === SyntaxKind.VoidKeyword
        // || kind === SyntaxKind.UndefinedKeyword
        // || kind === SyntaxKind.NeverKeyword
        // || kind === SyntaxKind.IntrinsicKeyword
        // || kind === SyntaxKind.ExpressionWithTypeArguments
        || kind === SyntaxKind.JSDocAllType
        || kind === SyntaxKind.JSDocUnknownType
        || kind === SyntaxKind.JSDocNullableType
        || kind === SyntaxKind.JSDocNonNullableType
        || kind === SyntaxKind.JSDocOptionalType
        || kind === SyntaxKind.JSDocFunctionType
        || kind === SyntaxKind.JSDocVariadicType;
}

function getDiagnosticFilePath(diagnostic: Diagnostic): string | undefined {
    return diagnostic.file ? diagnostic.file.path : undefined;
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

function getDiagnosticCode(d: Diagnostic): number {
    return d.canonicalHead?.code || d.code;
}

function getDiagnosticMessage(d: Diagnostic): string | DiagnosticMessageChain {
    return d.canonicalHead?.messageText || d.messageText;
}

function messageTextEqualityComparer(m1: string | DiagnosticMessageChain, m2: string | DiagnosticMessageChain): boolean {
    const t1 = typeof m1 === "string" ? m1 : m1.messageText;
    const t2 = typeof m2 === "string" ? m2 : m2.messageText;
    return compareStringsCaseSensitive(t1, t2) === Comparison.EqualTo;
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
export function compareDiagnosticsSkipRelatedInformation(d1: Diagnostic, d2: Diagnostic): Comparison {
    const code1 = getDiagnosticCode(d1);
    const code2 = getDiagnosticCode(d2);
    return compareStringsCaseSensitive(getDiagnosticFilePath(d1), getDiagnosticFilePath(d2)) ||
        compareValues(d1.start, d2.start) ||
        compareValues(d1.length, d2.length) ||
        compareValues(code1, code2) ||
        compareMessageText(d1, d2) ||
        Comparison.EqualTo;
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

/**
 * Indicates whether a type can be used as a property name.
 * @internal
 */
export function isTypeUsableAsPropertyName(type: Type): type is StringLiteralType | NumberLiteralType {
    return !!(type.flags & TypeFlags.StringOrNumberLiteralOrUnique);
}

/**
 * Gets the effective type annotation of a variable, parameter, or property. If the node was
 * parsed in a JavaScript file, gets the type annotation from JSDoc.  Also gets the type of
 * functions only the JSDoc case.
 *
 * @internal
 */
export function getEffectiveTypeAnnotationNode(node: Node): TypeNode | undefined {
    if (isFunctionDeclaration(node)) return undefined;
    //if (isTypeAliasDeclaration(node)) return undefined; // has a .type, is not a type annotation
    const type = (node as HasType).type;
    if (type) return type;    
    //TODO: return isJSDocPropertyLikeTag(node) ? node.typeExpression && node.typeExpression.type : getJSDocType(node);
    return undefined;
}

/**
 * Gets whether a bound `VariableDeclaration` or `VariableDeclarationList` is part of a `const`, `using` or `await using` declaration.
 * @internal
 */
export function isVarConstLike(node: VariableDeclaration | VariableDeclarationList) {
    const blockScopeKind = getCombinedNodeFlags(node) & NodeFlags.BlockScoped;
    return blockScopeKind === NodeFlags.Const;
    //  ||
    //     blockScopeKind === NodeFlags.Using ||
    //     blockScopeKind === NodeFlags.AwaitUsing;
}

/** @internal */
export function isDeclarationReadonly(declaration: Declaration): boolean {
    // LPC doens't have readonly, but left this hear for easy of code importing
    return false;
}

/** @internal */
export function isPrimitiveLiteralValue(node: Expression, includeBigInt = true): node is PrimitiveLiteral {
    Debug.type<PrimitiveLiteral>(node);
    switch (node.kind) {
        // case SyntaxKind.TrueKeyword:
        // case SyntaxKind.FalseKeyword:        
        case SyntaxKind.IntLiteral:
        case SyntaxKind.FloatLiteral:
        case SyntaxKind.StringLiteral:        
            return true;        
        case SyntaxKind.PrefixUnaryExpression:
            if (node.operator === SyntaxKind.MinusToken) {
                return isNumericLiteral(node.operand);
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
export function isKeyword(token: SyntaxKind): token is KeywordSyntaxKind {
    return SyntaxKind.FirstKeyword <= token && token <= SyntaxKind.LastKeyword;
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
        node.type || undefined;// TODO (isInJSFile(node) ? getJSDocReturnType(node) : undefined);
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
            case SyntaxKind.DoStatement:
            case SyntaxKind.WhileStatement:
            case SyntaxKind.ForStatement:
            case SyntaxKind.ForInStatement:            
            case SyntaxKind.SwitchStatement:
            case SyntaxKind.CaseClause:
            case SyntaxKind.DefaultClause:            
            case SyntaxKind.CatchClause:
                return forEachChild(node, traverse);
        }
    }
}


/** @internal */
export function isExpressionNode(node: Node): boolean {
    switch (node.kind) {
        // case SyntaxKind.SuperKeyword:
        // case SyntaxKind.NullKeyword:
        // case SyntaxKind.TrueKeyword:
        // case SyntaxKind.FalseKeyword:
        // case SyntaxKind.RegularExpressionLiteral:
        case SyntaxKind.ArrayLiteralExpression:
        case SyntaxKind.ObjectLiteralExpression:
        case SyntaxKind.PropertyAccessExpression:
        case SyntaxKind.ElementAccessExpression:
        case SyntaxKind.CallExpression:
        case SyntaxKind.NewExpression:
        // case SyntaxKind.TaggedTemplateExpression:
        // case SyntaxKind.AsExpression:
        case SyntaxKind.TypeAssertionExpression:
        //case SyntaxKind.SatisfiesExpression:
        case SyntaxKind.NonNullExpression:
        case SyntaxKind.ParenthesizedExpression:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.ClassExpression:
        case SyntaxKind.ArrowFunction:
        case SyntaxKind.VoidExpression:
        // case SyntaxKind.DeleteExpression:
        // case SyntaxKind.TypeOfExpression:
        case SyntaxKind.PrefixUnaryExpression:
        case SyntaxKind.PostfixUnaryExpression:
        case SyntaxKind.BinaryExpression:
        case SyntaxKind.ConditionalExpression:
        case SyntaxKind.SpreadElement:
        // case SyntaxKind.TemplateExpression:
        // case SyntaxKind.OmittedExpression:        
        // case SyntaxKind.YieldExpression:
        // case SyntaxKind.AwaitExpression:
        // case SyntaxKind.MetaProperty:
            return true;
        // case SyntaxKind.ExpressionWithTypeArguments:
        //     return !isHeritageClause(node.parent) && !isJSDocAugmentsTag(node.parent);
        case SyntaxKind.QualifiedName:
            while (node.parent.kind === SyntaxKind.QualifiedName) {
                node = node.parent;
            }
            return node.parent.kind === SyntaxKind.TypeQuery; // TODO || isJSDocLinkLike(node.parent) || isJSDocNameReference(node.parent) || isJSDocMemberName(node.parent) || isJSXTagName(node);
        case SyntaxKind.JSDocMemberName:
            // TODO    
            // while (isJSDocMemberName(node.parent)) {
            //     node = node.parent;
            // }
            return node.parent.kind === SyntaxKind.TypeQuery;// TODO || isJSDocLinkLike(node.parent) || isJSDocNameReference(node.parent) || isJSDocMemberName(node.parent) || isJSXTagName(node);
        case SyntaxKind.PrivateIdentifier:
            return isBinaryExpression(node.parent) && node.parent.left === node && node.parent.operatorToken.kind === SyntaxKind.InKeyword;
        case SyntaxKind.Identifier:
            if (node.parent.kind === SyntaxKind.TypeQuery) { // TODO || isJSDocLinkLike(node.parent) || isJSDocNameReference(node.parent) || isJSDocMemberName(node.parent) || isJSXTagName(node)) {
                return true;
            }
            // falls through

        case SyntaxKind.IntLiteral:
        case SyntaxKind.FloatLiteral:
        case SyntaxKind.StringLiteral:
        // case SyntaxKind.NoSubstitutionTemplateLiteral:
        // case SyntaxKind.ThisKeyword:
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
        case SyntaxKind.PropertyAssignment:
        case SyntaxKind.BindingElement:
            return (parent as HasInitializer).initializer === node;
        case SyntaxKind.ExpressionStatement:
        case SyntaxKind.IfStatement:
        case SyntaxKind.DoStatement:
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
        case SyntaxKind.ForInStatement:        
            const forInOrOfStatement = parent as ForInStatement;
            return (forInOrOfStatement.initializer === node && forInOrOfStatement.initializer.kind !== SyntaxKind.VariableDeclarationList) ||
                forInOrOfStatement.expression === node;
        // case SyntaxKind.TypeAssertionExpression:
        // case SyntaxKind.AsExpression:
        //     return node === (parent as AssertionExpression).expression;
        // case SyntaxKind.TemplateSpan:
        //     return node === (parent as TemplateSpan).expression;
        case SyntaxKind.ComputedPropertyName:
            return node === (parent as ComputedPropertyName).expression;        
        case SyntaxKind.SpreadAssignment:
            return true;
        // case SyntaxKind.ExpressionWithTypeArguments:
        //     return (parent as ExpressionWithTypeArguments).expression === node && !isPartOfTypeNode(parent);
        case SyntaxKind.ShorthandPropertyAssignment:
            return (parent as ShorthandPropertyAssignment).objectAssignmentInitializer === node;
        // case SyntaxKind.SatisfiesExpression:
        //     return node === (parent as SatisfiesExpression).expression;
        default:
            return isExpressionNode(parent);
    }
}

/** @internal */
export function createEvaluator({ evaluateElementAccessExpression, evaluateEntityNameExpression }: EvaluationResolver) {    
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
                return evaluatorResult((expr as StringLiteral).text, /*isSyntacticallyString*/ true);
            // case SyntaxKind.TemplateExpression:
            //     return evaluateTemplateExpression(expr as TemplateExpression, location);
            case SyntaxKind.IntLiteral:
            case SyntaxKind.FloatLiteral:
                return evaluatorResult(+(expr as NumericLiteral).text);
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

/** @internal */
export function evaluatorResult<T extends string | number | undefined>(value: T, isSyntacticallyString = false, resolvedOtherFiles = false, hasExternalReferences = false): EvaluatorResult<T> {
    return { value, isSyntacticallyString, resolvedOtherFiles, hasExternalReferences };
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
export function skipTypeChecking(sourceFile: SourceFile, options: CompilerOptions, host: any) {
    return false;
    // // If skipLibCheck is enabled, skip reporting errors if file is a declaration file.
    // // If skipDefaultLibCheck is enabled, skip reporting errors if file contains a
    // // '/// <reference no-default-lib="true"/>' directive.
    // return (options.skipLibCheck && sourceFile.isDeclarationFile ||
    //     options.skipDefaultLibCheck && sourceFile.hasNoDefaultLib) ||
    //     options.noCheck ||
    //     host.isSourceOfProjectReferenceRedirect(sourceFile.fileName);
}

// Returns true if this node contains a parse error anywhere underneath it.
/** @internal */
export function containsParseError(node: Node): boolean {
    aggregateChildData(node);
    return (node.flags & NodeFlags.ThisNodeOrAnySubNodesHasError) !== 0;
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
export function createDiagnosticForNode(node: Node, message: DiagnosticMessage, ...args: DiagnosticArguments): DiagnosticWithLocation {
    const sourceFile = getSourceFileOfNode(node);
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
export function createDiagnosticForFileFromMessageChain(sourceFile: SourceFile, messageChain: DiagnosticMessageChain, relatedInformation?: DiagnosticRelatedInformation[]): DiagnosticWithLocation {
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
export function createDiagnosticForNodeFromMessageChain(sourceFile: SourceFile, node: Node, messageChain: DiagnosticMessageChain, relatedInformation?: DiagnosticRelatedInformation[]): DiagnosticWithLocation {
    const span = getErrorSpanForNode(sourceFile, node);
    return createFileDiagnosticFromMessageChain(sourceFile, span.start, span.length, messageChain, relatedInformation);
}

/** @internal */
export function createFileDiagnosticFromMessageChain(file: SourceFile, start: number, length: number, messageChain: DiagnosticMessageChain, relatedInformation?: DiagnosticRelatedInformation[]): DiagnosticWithLocation {
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

/** @internal */
export function isVariableLike(node: Node): node is VariableLikeDeclaration {
    if (node) {
        switch (node.kind) {
            case SyntaxKind.BindingElement:            
            case SyntaxKind.Parameter:
            case SyntaxKind.PropertyAssignment:
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.PropertySignature:
            case SyntaxKind.ShorthandPropertyAssignment:
            case SyntaxKind.VariableDeclaration:
                return true;
        }
    }
    return false;
}

function filterOwnedJSDocTags(hostNode: Node, comments: JSDocArray) {
    const lastJsDoc = last(comments);
    return flatMap<JSDoc, JSDoc | JSDocTag>(comments, jsDoc => {
        if (jsDoc === lastJsDoc) {
            const ownedTags = filter(jsDoc.tags, tag => ownsJSDocTag(hostNode, tag));
            return jsDoc.tags === ownedTags ? [jsDoc] : ownedTags;
        }
        // else {
        //     return filter(jsDoc.tags, isJSDocOverloadTag);
        // }
    });
}


/**
 * Determines whether a host node owns a jsDoc tag. A `@type`/`@satisfies` tag attached to a
 * a ParenthesizedExpression belongs only to the ParenthesizedExpression.
 */
function ownsJSDocTag(hostNode: Node, tag: JSDocTag) {
    return !(isJSDocTypeTag(tag) )
        || !tag.parent
        || !isJSDoc(tag.parent)
        || !isParenthesizedExpression(tag.parent.parent)
        || tag.parent.parent === hostNode;
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

/** @internal */
export function getNextJSDocCommentLocation(node: Node) {
    const parent = node.parent;
    if (
        parent.kind === SyntaxKind.PropertyAssignment ||        
        parent.kind === SyntaxKind.PropertyDeclaration ||
        parent.kind === SyntaxKind.ExpressionStatement && node.kind === SyntaxKind.PropertyAccessExpression ||
        // @ts-ignore:  WHY?
        parent.kind === SyntaxKind.ReturnStatement ||        
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

function getSourceOfDefaultedAssignment(node: Node): Node | undefined {
    return isExpressionStatement(node) &&
            isBinaryExpression(node.expression) &&
            getAssignmentDeclarationKind(node.expression) !== AssignmentDeclarationKind.None &&
            isBinaryExpression(node.expression.right) &&
            (node.expression.right.operatorToken.kind === SyntaxKind.BarBarToken) // || node.expression.right.operatorToken.kind === SyntaxKind.QuestionQuestionToken)
        ? node.expression.right.right
        : undefined;
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

/** @internal */
export function getSingleVariableOfVariableStatement(node: Node): VariableDeclaration | undefined {
    return isVariableStatement(node) ? firstOrUndefined(node.declarationList.declarations) : undefined;
}


/**
 * Recognized expando initializers are:
 * 1. (function() {})() -- IIFEs
 * 2. function() { } -- Function expressions
 * 3. class { } -- Class expressions
 * 4. {} -- Empty object literals
 * 5. { ... } -- Non-empty object literals, when used to initialize a prototype, like `C.prototype = { m() { } }`
 *
 * This function returns the provided initializer, or undefined if it is not valid.
 *
 * @internal
 */
export function getExpandoInitializer(initializer: Node, isPrototypeAssignment: boolean): Expression | undefined {
    if (isCallExpression(initializer)) {
        const e = skipParentheses(initializer.expression);
        return e.kind === SyntaxKind.FunctionExpression || e.kind === SyntaxKind.ArrowFunction ? initializer : undefined;
    }
    if (
        initializer.kind === SyntaxKind.FunctionExpression ||
        initializer.kind === SyntaxKind.ClassExpression ||
        initializer.kind === SyntaxKind.ArrowFunction
    ) {
        return initializer as Expression;
    }
    if (isObjectLiteralExpression(initializer) && (initializer.properties.length === 0 || isPrototypeAssignment)) {
        return initializer;
    }
}


/**
 * Given an expando initializer, return its declaration name, or the left-hand side of the assignment if it's part of an assignment declaration.
 *
 * @internal
 */
export function getNameOfExpando(node: Declaration): DeclarationName | undefined {
    if (isBinaryExpression(node.parent)) {
        const parent = ((node.parent.operatorToken.kind === SyntaxKind.BarBarToken) && isBinaryExpression(node.parent.parent)) ? node.parent.parent : node.parent;
        if (parent.operatorToken.kind === SyntaxKind.EqualsToken && isIdentifier(parent.left)) {
            return parent.left;
        }
    }
    else if (isVariableDeclaration(node.parent)) {
        return node.parent.name;
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
export function isTypeDeclaration(node: Node): node is TypeParameterDeclaration 
    //| ClassDeclaration | InterfaceDeclaration | TypeAliasDeclaration | JSDocTypedefTag | JSDocCallbackTag | JSDocEnumTag | EnumDeclaration | 
    | ImportClause | ImportSpecifier 
    //| ExportSpecifier 
    {
    switch (node.kind) {
        case SyntaxKind.TypeParameter:
        // case SyntaxKind.ClassDeclaration:
        // case SyntaxKind.InterfaceDeclaration:
        // case SyntaxKind.TypeAliasDeclaration:
        // case SyntaxKind.EnumDeclaration:
        // case SyntaxKind.JSDocTypedefTag:
        // case SyntaxKind.JSDocCallbackTag:
        // case SyntaxKind.JSDocEnumTag:
            return true;
        case SyntaxKind.ImportClause:
            return (node as ImportClause).isTypeOnly;
        case SyntaxKind.ImportSpecifier:
        //case SyntaxKind.ExportSpecifier:
            return (node as ImportSpecifier ).parent.parent.isTypeOnly;
        default:
            return false;
    }
}

// Gets the nearest enclosing block scope container that has the provided node
// as a descendant, that is not the provided node.
/** @internal */
export function getEnclosingBlockScopeContainer(node: Node): Node {
    return findAncestor(node.parent, current => isBlockScope(current, current.parent))!;
}

/** @internal */
export function isBlockScope(node: Node, parentNode: Node | undefined): boolean {
    switch (node.kind) {
        case SyntaxKind.SourceFile:
        case SyntaxKind.CaseBlock:
        case SyntaxKind.CatchClause:
        //case SyntaxKind.ModuleDeclaration:
        case SyntaxKind.ForStatement:
        case SyntaxKind.ForInStatement:        
        case SyntaxKind.MethodDeclaration:        
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.ArrowFunction:
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
export function formatMessage(message: DiagnosticMessage, ...args: DiagnosticArguments): string {
    let text = getLocaleSpecificMessage(message);

    if (some(args)) {
        text = formatStringFromArgs(text, args);
    }

    return text;
}

/** @internal */
export function getCanonicalDiagnostic(message: DiagnosticMessage, ...args: string[]): CanonicalDiagnostic {
    return {
        code: message.code,
        messageText: formatMessage(message, ...args),
    };
}


/** @internal */
export function isValidTypeOnlyAliasUseSite(useSite: Node): boolean {
    return false;
    // TODO: 
    // return !!(useSite.flags & NodeFlags.Ambient)
    //     || isPartOfTypeQuery(useSite)
    //     || isIdentifierInNonEmittingHeritageClause(useSite)
    //     || isPartOfPossiblyValidTypeOrAbstractComputedPropertyName(useSite)
    //     || !(isExpressionNode(useSite) || isShorthandPropertyNameUseSite(useSite));
}

/** @internal */
export function isInTypeQuery(node: Node): boolean {
    // TypeScript 1.0 spec (April 2014): 3.6.3
    // A type query consists of the keyword typeof followed by an expression.
    // The expression is restricted to a single identifier or a sequence of identifiers separated by periods
    return !!findAncestor(
        node,
        n => n.kind === SyntaxKind.TypeQuery ? true : n.kind === SyntaxKind.Identifier || n.kind === SyntaxKind.QualifiedName ? false : "quit",
    );
}

/** @internal */
export function getContainingClassExcludingClassDecorators(node: Node): ClassLikeDeclaration | undefined {
    const decorator = findAncestor(node.parent, n => isClassLike(n) ? "quit" : isDecorator(n));
    return decorator && isClassLike(decorator.parent) ? getContainingClass(decorator.parent) : getContainingClass(decorator ?? node);
}


/** @internal */
export function getCheckFlags(symbol: Symbol): CheckFlags {
    return symbol.flags & SymbolFlags.Transient ? (symbol as TransientSymbol).links.checkFlags : 0;
}

/** @internal */
export function getObjectFlags(type: Type): ObjectFlags {
    return type.flags & TypeFlags.ObjectFlagsType ? (type as ObjectFlagsType).objectFlags : 0;
}

/** @internal */
export function getSpanOfTokenAtPosition(sourceFile: SourceFile, pos: number): TextSpan {
    throw "Not implemented yet";
    // const scanner = createScanner(sourceFile.languageVersion, /*skipTrivia*/ true, sourceFile.languageVariant, sourceFile.text, /*onError*/ undefined, pos);
    // scanner.scan();
    // const start = scanner.getTokenStart();
    // return createTextSpanFromBounds(start, scanner.getTokenEnd());
}



// dprint-ignore
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
        case SyntaxKind.MethodDeclaration:
            // if (node.asteriskToken) {
            //     flags |= FunctionFlags.Generator;
            // }
            // falls through

        case SyntaxKind.ArrowFunction:
            if (hasSyntacticModifier(node, ModifierFlags.Async)) {
                flags |= FunctionFlags.Async;
            }
            break;
    }

    if (!(node as FunctionLikeDeclaration).body) {
        flags |= FunctionFlags.Invalid;
    }

    return flags;
}

/** @internal */
export function isStatic(node: Node) {
    return false;
    // https://tc39.es/ecma262/#sec-static-semantics-isstatic
    //return isClassElement(node) && hasStaticModifier(node) || isClassStaticBlockDeclaration(node);
}

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
            case SyntaxKind.ArrowFunction:
                if (!includeArrowFunctions) {
                    continue;
                }
                // falls through

            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
            // case SyntaxKind.ModuleDeclaration:
            // case SyntaxKind.ClassStaticBlockDeclaration:
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.PropertySignature:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.MethodSignature:
            // case SyntaxKind.Constructor:
            // case SyntaxKind.GetAccessor:
            // case SyntaxKind.SetAccessor:
            case SyntaxKind.CallSignature:
            //case SyntaxKind.ConstructSignature:
            case SyntaxKind.IndexSignature:
            //case SyntaxKind.EnumDeclaration:
            case SyntaxKind.SourceFile:
                return node as ThisContainer | ArrowFunction;
        }
    }
}

/** @internal */
export function isInJSFile(node: Node | undefined): boolean {
    return false;// !!node && !!(node.flags & NodeFlags.JavaScriptFile);
}


/** @internal */
export function entityNameToString(name: EntityNameOrEntityNameExpression):string {// | JSDocMemberName  | PrivateIdentifier): string {
    switch (name.kind) {
        // case SyntaxKind.ThisKeyword:
        //     return "this";
        // case SyntaxKind.PrivateIdentifier:
        case SyntaxKind.Identifier:
            return getFullWidth(name) === 0 ? idText(name) : getTextOfNode(name);
        case SyntaxKind.QualifiedName:
            return entityNameToString(name.left) + "." + entityNameToString(name.right);
        case SyntaxKind.PropertyAccessExpression:
            if (isIdentifier(name.name) || isPrivateIdentifier(name.name)) {
                return entityNameToString(name.expression) + "." + entityNameToString(name.name);
            }
            else {
                return Debug.assertNever(name.name);
            }
        // case SyntaxKind.JSDocMemberName:
        //     return entityNameToString(name.left) + "#" + entityNameToString(name.right);
        
        default:
            return Debug.assertNever(name);
    }
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

/** @internal
 * @deprecated
 */
export function isAmbientModule(node: Node) {
    return false;// return isModuleDeclaration(node) && (node.name.kind === SyntaxKind.StringLiteral || isGlobalScopeAugmentation(node));
}

/** @internal */
export function getSelectedEffectiveModifierFlags(node: Node, flags: ModifierFlags): ModifierFlags {
    return getEffectiveModifierFlags(node) & flags;
}

/** @internal */
export function hasEffectiveModifier(node: Node, flags: ModifierFlags): boolean {
    return !!getSelectedEffectiveModifierFlags(node, flags);
}

/** @internal */
export function isBindableObjectDefinePropertyCall(expr: CallExpression): expr is BindableObjectDefinePropertyCall {
    return false;
    // return length(expr.arguments) === 3 &&
    //     isPropertyAccessExpression(expr.expression) &&
    //     isIdentifier(expr.expression.expression) &&
    //     idText(expr.expression.expression) === "Object" &&
    //     idText(expr.expression.name) === "defineProperty" &&
    //     isStringOrNumericLiteralLike(expr.arguments[1]) &&
    //     isBindableStaticNameExpression(expr.arguments[0], /*excludeThisKeyword*/ true);
}

function hasExpandoValueProperty(node: ObjectLiteralExpression, isPrototypeAssignment: boolean) {
    return undefined;
    // return forEach(node.properties, p =>
    //     isPropertyAssignment(p) &&
    //     isIdentifier(p.name) &&
    //     p.name.escapedText === "value" &&
    //     p.initializer &&
    //     getExpandoInitializer(p.initializer, isPrototypeAssignment));
}


/**
 * Get the assignment 'initializer' -- the righthand side-- when the initializer is container-like (See getExpandoInitializer).
 * We treat the right hand side of assignments with container-like initializers as declarations.
 *
 * @internal
 */
export function getAssignedExpandoInitializer(node: Node | undefined): Expression | undefined {
    if (node && node.parent && isBinaryExpression(node.parent) && node.parent.operatorToken.kind === SyntaxKind.EqualsToken) {
        const isPrototypeAssignment = false;// isPrototypeAccess(node.parent.left);
        return getExpandoInitializer(node.parent.right, isPrototypeAssignment) ||
            getDefaultedExpandoInitializer(node.parent.left, node.parent.right, isPrototypeAssignment);
    }
    if (node && isCallExpression(node) && isBindableObjectDefinePropertyCall(node)) {
        const result = hasExpandoValueProperty(node.arguments[2], node.arguments[1].text === "prototype");
        if (result) {
            return result;
        }
    }
}

/** @internal */
export function getTextOfIdentifierOrLiteral(node: PropertyNameLiteral | PrivateIdentifier): string {
    return isMemberName(node) ? idText(node as Identifier) : node.text;
}


/**
 * x.y OR x[0]
 *
 * @internal
 */
export function isLiteralLikeAccess(node: Node): node is LiteralLikeElementAccessExpression | PropertyAccessExpression {
    return isPropertyAccessExpression(node) || isLiteralLikeElementAccess(node);
}

/**
 * x[0] OR x['a'] OR x[Symbol.y]
 *
 * @internal
 */
export function isLiteralLikeElementAccess(node: Node): node is LiteralLikeElementAccessExpression {
    return isElementAccessExpression(node) && isStringOrNumericLiteralLike(node.argumentExpression);
}

/** @internal */
export function getNameOrArgument(expr: PropertyAccessExpression | LiteralLikeElementAccessExpression) {
    if (isPropertyAccessExpression(expr)) {
        return expr.name;
    }
    return expr.argumentExpression;
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
        if (isStringLiteralLike(name) || isNumericLiteral(name)) {
            return escapeLeadingUnderscores(name.text);
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
    if (
        isMemberName(name) && isLiteralLikeAccess(initializer) &&
        false
        // (initializer.expression.kind === SyntaxKind.ThisKeyword ||
        //     isIdentifier(initializer.expression) &&
        //         (initializer.expression.escapedText === "window" ||
        //             initializer.expression.escapedText === "self" ||
        //             initializer.expression.escapedText === "global"))
    ) {
        //return isSameEntityName(name, getNameOrArgument(initializer));
    }
    if (isLiteralLikeAccess(name) && isLiteralLikeAccess(initializer)) {
        return getElementOrPropertyAccessName(name) === getElementOrPropertyAccessName(initializer)
            && isSameEntityName(name.expression, initializer.expression);
    }
    return false;
}


/**
 * A defaulted expando initializer matches the pattern
 * `Lhs = Lhs || ExpandoInitializer`
 * or `var Lhs = Lhs || ExpandoInitializer`
 *
 * The second Lhs is required to be the same as the first except that it may be prefixed with
 * 'window.', 'global.' or 'self.' The second Lhs is otherwise ignored by the binder and checker.
 */
function getDefaultedExpandoInitializer(name: Expression, initializer: Expression, isPrototypeAssignment: boolean) {
    const e = isBinaryExpression(initializer)
        && (initializer.operatorToken.kind === SyntaxKind.BarBarToken )//|| initializer.operatorToken.kind === SyntaxKind.QuestionQuestionToken)
        && getExpandoInitializer(initializer.right, isPrototypeAssignment);
    if (e && isSameEntityName(name, initializer.left)) {
        return e;
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

/** @internal */
export function getIndentSize() {
    return indentStrings[1].length;
}

export function isWhiteSpaceLike(ch: number): boolean {
    return isWhiteSpaceSingleLine(ch) || isLineBreak(ch);
}

export function isLineBreak(ch: number): boolean {
    // ES5 7.3:
    // The ECMAScript line terminator characters are listed in Table 3.
    //     Table 3: Line Terminator Characters
    //     Code Unit Value     Name                    Formal Name
    //     \u000A              Line Feed               <LF>
    //     \u000D              Carriage Return         <CR>
    //     \u2028              Line separator          <LS>
    //     \u2029              Paragraph separator     <PS>
    // Only the characters in Table 3 are treated as line terminators. Other new line or line
    // breaking characters are treated as white space but not as line terminators.

    return ch === CharacterCodes.lineFeed ||
        ch === CharacterCodes.carriageReturn ||
        ch === CharacterCodes.lineSeparator ||
        ch === CharacterCodes.paragraphSeparator;
}

/** Does not include line breaks. For that, see isWhiteSpaceLike. */
export function isWhiteSpaceSingleLine(ch: number): boolean {
    // Note: nextLine is in the Zs space, and should be considered to be a whitespace.
    // It is explicitly not a line-break as it isn't in the exact set specified by EcmaScript.
    return ch === CharacterCodes.space ||
        ch === CharacterCodes.tab ||
        ch === CharacterCodes.verticalTab ||
        ch === CharacterCodes.formFeed ||
        ch === CharacterCodes.nonBreakingSpace ||
        ch === CharacterCodes.nextLine ||
        ch === CharacterCodes.ogham ||
        ch >= CharacterCodes.enQuad && ch <= CharacterCodes.zeroWidthSpace ||
        ch === CharacterCodes.narrowNoBreakSpace ||
        ch === CharacterCodes.mathematicalSpace ||
        ch === CharacterCodes.ideographicSpace ||
        ch === CharacterCodes.byteOrderMark;
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
        // const lineStartsOfS = computeLineStarts(s);
        // if (lineStartsOfS.length > 1) {
        //     lineCount = lineCount + lineStartsOfS.length - 1;
        //     linePos = output.length - s.length + last(lineStartsOfS);
        //     lineStart = (linePos - output.length) === 0;
        // }
        // else {
        //     lineStart = false;
        // }
    }

    function writeText(s: string) {
        // if (s && s.length) {
        //     if (lineStart) {
        //         s = getIndentString(indent) + s;
        //         lineStart = false;
        //     }
        //     output += s;
        //     updateLineCountAndPosFor(s);
        // }
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
export function getDeclarationModifierFlagsFromSymbol(s: Symbol, isWrite = false): ModifierFlags {
    if (s.valueDeclaration) {
        const declaration = s.valueDeclaration;
        // const declaration =  (isWrite && s.declarations && find(s.declarations, isSetAccessorDeclaration))
        //     || (s.flags & SymbolFlags.GetAccessor && find(s.declarations, isGetAccessorDeclaration)) || s.valueDeclaration;
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
    // if (s.flags & SymbolFlags.Prototype) {
    //     return ModifierFlags.Public | ModifierFlags.Static;
    // }
    return 0;
}

/** @internal */
export function canHaveFlowNode(node: Node): node is HasFlowNode {
    if (node.kind >= SyntaxKind.FirstStatement && node.kind <= SyntaxKind.LastStatement) {
        return true;
    }

    switch (node.kind) {
        case SyntaxKind.Identifier:
        // case SyntaxKind.ThisKeyword:
        // case SyntaxKind.SuperKeyword:
        // case SyntaxKind.MetaProperty:
        case SyntaxKind.QualifiedName:
        case SyntaxKind.ElementAccessExpression:
        case SyntaxKind.PropertyAccessExpression:
        case SyntaxKind.BindingElement:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.ArrowFunction:
        case SyntaxKind.MethodDeclaration:
        // case SyntaxKind.GetAccessor:
        // case SyntaxKind.SetAccessor:
            return true;
        default:
            return false;
    }
}

/** @internal */
export function hasAccessorModifier(node: Node): boolean {
    return false;//return hasSyntacticModifier(node, ModifierFlags.Accessor);
}

/** @internal */
export function isOptionalDeclaration(declaration: Declaration): boolean {
    switch (declaration.kind) {
        case SyntaxKind.PropertyDeclaration:
        case SyntaxKind.PropertySignature:
            return !!(declaration as PropertyDeclaration | PropertySignature).questionToken;
        case SyntaxKind.Parameter:
            return false;//return !!(declaration as ParameterDeclaration).questionToken || isJSDocOptionalParameter(declaration as ParameterDeclaration);
        //case SyntaxKind.JSDocPropertyTag:
        case SyntaxKind.JSDocParameterTag:
            return false;// return isOptionalJSDocPropertyLikeTag(declaration);
        default:
            return false;
    }
}

/** @internal */
export function hasStaticModifier(node: Node): boolean {
    return hasSyntacticModifier(node, ModifierFlags.Static);
}


/**
 * Get the declaration initializer when it is container-like (See getExpandoInitializer).
 *
 * @internal
 */
export function getDeclaredExpandoInitializer(node: HasExpressionInitializer) {
    const init = getEffectiveInitializer(node);
    return init && getExpandoInitializer(init, isPrototypeAccess(node.name));
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
        (node.initializer.operatorToken.kind === SyntaxKind.BarBarToken) && // || node.initializer.operatorToken.kind === SyntaxKind.QuestionQuestionToken) &&
        node.name && isEntityNameExpression(node.name) && isSameEntityName(node.name, node.initializer.left)
    ) {
        return node.initializer.right;
    }
    return node.initializer;
}

/** @internal */
export function isPrototypeAccess(node: Node) { //: node is BindableStaticAccessExpression {
    return false;
    //return isBindableStaticAccessExpression(node) && getElementOrPropertyAccessName(node) === "prototype";
}

/** @internal */
export function findConstructorDeclaration(node: ClassLikeDeclaration) { //: ConstructorDeclaration | undefined {
    return undefined;
    // TODO
    // const members = node.members;
    // for (const member of members) {
    //     if (member.kind === SyntaxKind.Constructor && nodeIsPresent((member as ConstructorDeclaration).body)) {
    //         return member as ConstructorDeclaration;
    //     }
    // }
}


/**
 * Gets the symbolic name for a member from its type.
 * @internal
 */
export function getPropertyNameFromType(type: StringLiteralType | NumberLiteralType ): string {
    // if (type.flags & TypeFlags.UniqueESSymbol) {
    //     return (type as UniqueESSymbolType).escapedName;
    // }
    if (type.flags & (TypeFlags.StringLiteral | TypeFlags.IntLiteral | TypeFlags.FloatLiteral)) {
        return escapeLeadingUnderscores("" + (type as StringLiteralType | NumberLiteralType).value);
    }
    return Debug.fail();
}

/** @internal */
export function isTransientSymbol(symbol: Symbol): symbol is TransientSymbol {
    return (symbol.flags & SymbolFlags.Transient) !== 0;
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

function getSourceOfAssignment(node: Node): Node | undefined {
    return isExpressionStatement(node) &&
            isBinaryExpression(node.expression) &&
            node.expression.operatorToken.kind === SyntaxKind.EqualsToken
        ? getRightMostAssignedExpression(node.expression)
        : undefined;
}

function getNestedModuleDeclaration(node: Node): Node | undefined {
    return undefined;
    // return isModuleDeclaration(node) &&
    //         node.body &&
    //         node.body.kind === SyntaxKind.ModuleDeclaration
    //     ? node.body
    //     : undefined;
}


/** @internal */
export function getEffectiveJSDocHost(node: Node): Node | undefined {
    const host = getJSDocHost(node);
    if (host) {
        return getSourceOfDefaultedAssignment(host)
            || getSourceOfAssignment(host)
            || getSingleInitializerOfVariableStatementOrPropertyDeclaration(host)
            || getSingleVariableOfVariableStatement(host)
            || getNestedModuleDeclaration(host)
            || host;
    }
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
export function isDynamicName(name: DeclarationName): boolean {
    if (!(name.kind === SyntaxKind.ComputedPropertyName || name.kind === SyntaxKind.ElementAccessExpression)) {
        return false;
    }
    const expr = isElementAccessExpression(name) ? skipParentheses(name.argumentExpression) : name.expression;
    return !isStringOrNumericLiteralLike(expr) &&
        !isSignedNumericLiteral(expr);
}

/** @internal */
export const resolvingEmptyArray: never[] = [];

/** @internal */
export function getClassLikeDeclarationOfSymbol(symbol: Symbol): ClassLikeDeclaration | undefined {
    return symbol.declarations?.find(isClassLike);
}

/** @internal */
export function getEffectiveBaseTypeNode(node: ClassLikeDeclaration | InterfaceDeclaration) {
    const baseType = getClassExtendsHeritageElement(node);
    if (baseType && isInJSFile(node)) {
        // Prefer an @augments tag because it may have type parameters.
        const tag = getJSDocAugmentsTag(node);
        if (tag) {
            return tag.class;
        }
    }
    return baseType;
}

/** @internal */
export function getHeritageClause(clauses: NodeArray<HeritageClause> | undefined, kind: SyntaxKind) {
    if (clauses) {
        for (const clause of clauses) {
            if (clause.token === kind) {
                return clause;
            }
        }
    }

    return undefined;
}

/** @internal */
export function getClassExtendsHeritageElement(node: ClassLikeDeclaration | InterfaceDeclaration) {
    const heritageClause = getHeritageClause(node.heritageClauses, SyntaxKind.ExtendsKeyword);
    return heritageClause && heritageClause.types.length > 0 ? heritageClause.types[0] : undefined;
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

        next: details === undefined || Array.isArray(details) ? details as DiagnosticMessageChain[] : [details],
    };
}

/** @internal */
export function getContainingClassStaticBlock(node: Node): Node | undefined {
    return findAncestor(node.parent, n => {
        if (isClassLike(n) || isFunctionLike(n)) {
            return "quit";
        }
        return isClassStaticBlockDeclaration(n);
    });
}

/** @internal */
export function isNodeDescendantOf(node: Node, ancestor: Node | undefined): boolean {
    while (node) {
        if (node === ancestor) return true;
        node = node.parent;
    }
    return false;
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
export type ValueSignatureDeclaration =
    | FunctionDeclaration
    | MethodDeclaration
    // | ConstructorDeclaration
    // | AccessorDeclaration
    | FunctionExpression
    | ArrowFunction;


/** @internal */
export function isValueSignatureDeclaration(node: Node): node is ValueSignatureDeclaration {
    return isFunctionExpression(node) ||  isMethodOrAccessor(node) || isFunctionDeclaration(node);// || isArrowFunction(node) ||isConstructorDeclaration(node);
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

export function isPartOfTypeNode(node: Node): boolean {
    if (SyntaxKind.FirstTypeNode <= node.kind && node.kind <= SyntaxKind.LastTypeNode) {
        return true;
    }

    switch (node.kind) {
        //case SyntaxKind.AnyKeyword:
        case SyntaxKind.UnknownKeyword:
        case SyntaxKind.IntKeyword:
        case SyntaxKind.FloatKeyword:
        case SyntaxKind.StringKeyword:
        // case SyntaxKind.BooleanKeyword:
        // case SyntaxKind.SymbolKeyword:
        case SyntaxKind.ObjectKeyword:
        // case SyntaxKind.UndefinedKeyword:
        // case SyntaxKind.NullKeyword:
        // case SyntaxKind.NeverKeyword:
            return true;
        case SyntaxKind.VoidKeyword:
            return node.parent.kind !== SyntaxKind.VoidExpression;
        case SyntaxKind.ExpressionWithTypeArguments:
            return isPartOfTypeExpressionWithTypeArguments(node);
        case SyntaxKind.TypeParameter:
            return node.parent.kind === SyntaxKind.MappedType || node.parent.kind === SyntaxKind.InferType;

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

        case SyntaxKind.QualifiedName:
        //case SyntaxKind.ThisKeyword: 
        case SyntaxKind.PropertyAccessExpression: {
            const { parent } = node;
            if (parent.kind === SyntaxKind.TypeQuery) {
                return false;
            }
            if (parent.kind === SyntaxKind.ImportType) {
                return !(parent as ImportTypeNode).isTypeOf;
            }
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
                case SyntaxKind.ExpressionWithTypeArguments:
                    return isPartOfTypeExpressionWithTypeArguments(parent);
                case SyntaxKind.TypeParameter:
                    return node === (parent as TypeParameterDeclaration).constraint;
                case SyntaxKind.JSDocTemplateTag:
                    return node === (parent as JSDocTemplateTag).constraint;
                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.PropertySignature:
                case SyntaxKind.Parameter:
                case SyntaxKind.VariableDeclaration:
                    return node === (parent as HasType).type;
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.ArrowFunction:
                //case SyntaxKind.Constructor:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                // case SyntaxKind.GetAccessor:
                // case SyntaxKind.SetAccessor:
                    return node === (parent as FunctionLikeDeclaration).type;
                case SyntaxKind.CallSignature:
                //case SyntaxKind.ConstructSignature:
                case SyntaxKind.IndexSignature:
                    return node === (parent as SignatureDeclaration).type;
                case SyntaxKind.TypeAssertionExpression:
                    return node === (parent as TypeAssertion).type;
                case SyntaxKind.CallExpression:
                case SyntaxKind.NewExpression:
                //case SyntaxKind.TaggedTemplateExpression:
                    return contains((parent as CallExpression | __types.TaggedTemplateExpression).typeArguments, node);
            }
        }
    }

    return false;
}


function isPartOfTypeExpressionWithTypeArguments(node: Node) {
    return isJSDocImplementsTag(node.parent)
        || isJSDocAugmentsTag(node.parent)
        || isHeritageClause(node.parent) && !isExpressionWithTypeArgumentsInClassExtendsClause(node);
}

/** @internal */
export function isExpressionWithTypeArgumentsInClassExtendsClause(node: Node): node is ExpressionWithTypeArguments {
    return tryGetClassExtendingExpressionWithTypeArguments(node) !== undefined;
}



/**
 * Get `C` given `N` if `N` is in the position `class C extends N` where `N` is an ExpressionWithTypeArguments.
 *
 * @internal
 */
export function tryGetClassExtendingExpressionWithTypeArguments(node: Node): ClassLikeDeclaration | undefined {
    const cls = tryGetClassImplementingOrExtendingExpressionWithTypeArguments(node);
    return cls && !cls.isImplements ? cls.class : undefined;
}

/** @internal */
export interface ClassImplementingOrExtendingExpressionWithTypeArguments {
    readonly class: ClassLikeDeclaration;
    readonly isImplements: boolean;
}


/** @internal */
export function tryGetClassImplementingOrExtendingExpressionWithTypeArguments(node: Node): ClassImplementingOrExtendingExpressionWithTypeArguments | undefined {
    if (isExpressionWithTypeArguments(node)) {
        if (isHeritageClause(node.parent) && isClassLike(node.parent.parent)) {
            return { class: node.parent.parent, isImplements: (node.parent as HeritageClause).token === SyntaxKind.ImplementsKeyword };
        }
        if (isJSDocAugmentsTag(node.parent)) {
            const host = getEffectiveJSDocHost(node.parent);
            if (host && isClassLike(host)) {
                return { class: host, isImplements: false };
            }
        }
    }
    return undefined;
}

/** @internal */
export function getPropertyNameForPropertyNameNode(name: PropertyName ): string | undefined {
    switch (name.kind) {
        case SyntaxKind.Identifier:
        case SyntaxKind.PrivateIdentifier:
            return name.text;
        case SyntaxKind.StringLiteral:
        //case SyntaxKind.NoSubstitutionTemplateLiteral:
        case SyntaxKind.IntLiteral:
            return escapeLeadingUnderscores(name.text);
        case SyntaxKind.ComputedPropertyName:
            const nameExpression = name.expression;
            if (isStringOrNumericLiteralLike(nameExpression)) {
                return escapeLeadingUnderscores(nameExpression.text);
            }
            else if (isSignedNumericLiteral(nameExpression)) {
                if (nameExpression.operator === SyntaxKind.MinusToken) {
                    return tokenToString(nameExpression.operator) + nameExpression.operand.text as string;
                }
                return nameExpression.operand.text as string;
            }
            return undefined;
        // case SyntaxKind.JsxNamespacedName:
        //     return getEscapedTextOfJsxNamespacedName(name);
        default:
            return Debug.assertNever(name as never);
    }
}

/** @internal */
export function isKnownSymbol(symbol: Symbol): boolean {
    return startsWith(symbol.name as string, "__@");
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
        case SyntaxKind.ForInStatement:
        //case SyntaxKind.ForOfStatement:
            return AssignmentKind.Definite;
    }
}

/** @internal */
export function tryGetPropertyAccessOrIdentifierToString(expr: Expression ): string | undefined {
    if (isPropertyAccessExpression(expr)) {
        const baseStr = tryGetPropertyAccessOrIdentifierToString(expr.expression);
        if (baseStr !== undefined) {
            return baseStr + "." + entityNameToString(expr.name as EntityNameOrEntityNameExpression);
        }
    }
    else if (isElementAccessExpression(expr)) {
        const baseStr = tryGetPropertyAccessOrIdentifierToString(expr.expression);
        if (baseStr !== undefined && isPropertyName(expr.argumentExpression)) {
            return baseStr + "." + getPropertyNameForPropertyNameNode(expr.argumentExpression);
        }
    }
    else if (isIdentifier(expr)) {
        return unescapeLeadingUnderscores(expr.text);
    }
    // else if (isJsxNamespacedName(expr)) {
    //     return getTextOfJsxNamespacedName(expr);
    // }
    return undefined;
}

// a node is delete target iff. it is PropertyAccessExpression/ElementAccessExpression with parentheses skipped
/** @internal */
export function isDeleteTarget(node: Node): boolean {
    if (node.kind !== SyntaxKind.PropertyAccessExpression && node.kind !== SyntaxKind.ElementAccessExpression) {
        return false;
    }
    node = walkUpParenthesizedExpressions(node.parent);
    return node && node.kind === SyntaxKind.DeleteExpression;
}

/** @internal */
export function walkUpParenthesizedExpressions(node: Node) {
    return walkUp(node, SyntaxKind.ParenthesizedExpression);
}

function walkUp(node: Node, kind: SyntaxKind) {
    while (node && node.kind === kind) {
        node = node.parent;
    }
    return node;
}

/** @internal */
export function skipTypeParentheses(node: TypeNode): TypeNode {
    while (isParenthesizedTypeNode(node)) node = node.type;
    return node;
}

/** @internal */
export function isTypeAlias(node: Node): node is  TypeAliasDeclaration {//|JSDocTypedefTag | JSDocCallbackTag | JSDocEnumTag {
    return isTypeAliasDeclaration(node); // || isJSDocTypeAlias(node)
}

/** @internal */
export function getContainingFunction(node: Node): SignatureDeclaration | undefined {
    return findAncestor(node.parent, isFunctionLike);
}


/**
 * Returns true if the node is a CallExpression to the identifier 'require' with
 * exactly one argument (of the form 'require("name")').
 * This function does not test if the node is in a JavaScript file or not.
 *
 * @internal
 */
export function isRequireCall(callExpression: Node, requireStringLiteralLikeArgument: true): callExpression is RequireOrImportCall & { expression: Identifier; arguments: [StringLiteral]; };
/** @internal */
export function isRequireCall(callExpression: Node, requireStringLiteralLikeArgument: boolean): callExpression is CallExpression;
/** @internal */
export function isRequireCall(callExpression: Node, requireStringLiteralLikeArgument: boolean): callExpression is CallExpression {
    if (callExpression.kind !== SyntaxKind.CallExpression) {
        return false;
    }
    const { expression, arguments: args } = callExpression as CallExpression;

    if (expression.kind !== SyntaxKind.Identifier || (expression as Identifier).text !== "require") {
        return false;
    }

    if (args.length !== 1) {
        return false;
    }
    const arg = args[0];
    return !requireStringLiteralLikeArgument || isStringLiteralLike(arg);
}

/** @internal */
export function isPushOrUnshiftIdentifier(node: Identifier) {
    return node.text === "push" || node.text === "unshift";
}

function isCompoundLikeAssignment(assignment: AssignmentExpression<EqualsToken>): boolean {
    const right = skipParentheses(assignment.right);
    return right.kind === SyntaxKind.BinaryExpression && isShiftOperatorOrHigher((right as BinaryExpression).operatorToken.kind);
}

/** @internal */
export function isInCompoundLikeAssignment(node: Node): boolean {
    const target = getAssignmentTarget(node);
    return !!target && isAssignmentExpression(target, /*excludeCompoundAssignment*/ true) && isCompoundLikeAssignment(target);
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

function isAdditiveOperatorOrHigher(kind: SyntaxKind): kind is AdditiveOperatorOrHigher {
    return isAdditiveOperator(kind)
        || isMultiplicativeOperatorOrHigher(kind);
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

/** @internal */
export function tryGetJSDocSatisfiesTypeNode(node: Node) {
    return undefined;
    // const tag = getJSDocSatisfiesTag(node);
    // return tag && tag.typeExpression && tag.typeExpression.type;
}

/** @internal */
export function isComputedNonLiteralName(name: PropertyName): boolean {
    return name.kind === SyntaxKind.ComputedPropertyName && !isStringOrNumericLiteralLike(name.expression);
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
export function identifierIsThisKeyword(id: Identifier): boolean {
    return id.text === "this";
}

/** @internal */
export function isThisIdentifier(node: Node | undefined): boolean {
    return !!node && node.kind === SyntaxKind.Identifier && identifierIsThisKeyword(node as Identifier);
}

/** @internal */
export function isThisInTypeQuery(node: Node): boolean {
    if (!isThisIdentifier(node)) {
        return false;
    }

    while (isQualifiedName(node.parent) && node.parent.left === node) {
        node = node.parent;
    }

    return node.parent.kind === SyntaxKind.TypeQuery;
}

/** @internal */
export function isInfinityOrNaNString(name: string ): boolean {
    return name === "Infinity" || name === "-Infinity" || name === "NaN";
}

