import { isBindingElement } from "./nodeTests";
import {
    BindingElement,
    Block,
    Expression,
    FileReference,
    HasLocals,
    IntegerLiteral,
    JSDocTypeTag,
    LeftHandSideExpression,
    Node,
    NodeFlags,
    OuterExpressionKinds,
    ParameterDeclaration,
    SignatureDeclaration,
    Statement,
    StringLiteral,
    SyntaxKind,
    UnaryExpression,
    VariableDeclaration,
} from "./types";
import { isFunctionBlock, skipOuterExpressions } from "./utilities";

export function isStringLiteralLike(
    node: Node | FileReference
): node is StringLiteral {
    return (node as Node).kind === SyntaxKind.StringLiteral;
}

export function skipPartiallyEmittedExpressions(node: Expression): Expression;
export function skipPartiallyEmittedExpressions(node: Node): Node;
export function skipPartiallyEmittedExpressions(node: Node) {
    return skipOuterExpressions(
        node,
        OuterExpressionKinds.PartiallyEmittedExpressions
    );
}

export function isLeftHandSideExpression(
    node: Node
): node is LeftHandSideExpression {
    return isLeftHandSideExpressionKind(
        skipPartiallyEmittedExpressions(node).kind
    );
}

function isLeftHandSideExpressionKind(kind: SyntaxKind): boolean {
    switch (kind) {
        case SyntaxKind.PropertyAccessExpression:
        case SyntaxKind.ElementAccessExpression:
        case SyntaxKind.NewExpression:
        case SyntaxKind.CallExpression:
        case SyntaxKind.ArrayLiteralExpression:
        case SyntaxKind.ParenthesizedExpression:
        case SyntaxKind.ObjectLiteralExpression:
        //case SyntaxKind.FunctionExpression:
        case SyntaxKind.Identifier:
        case SyntaxKind.PrivateIdentifier: // technically this is only an Expression if it's in a `#field in expr` BinaryExpression
        case SyntaxKind.NumericLiteral:
        case SyntaxKind.StringLiteral:
        case SyntaxKind.ColonColonToken:
        case SyntaxKind.NonNullExpression:
            return true;
        default:
            return false;
    }
}

/** Gets the JSDoc type tag for the node if present and valid */
export function getJSDocTypeTag(node: Node): JSDocTypeTag | undefined {
    // We should have already issued an error if there were multiple type jsdocs, so just use the first one.
    const tag = undefined; // TODO: getFirstJSDocTag(node, isJSDocTypeTag);
    if (tag && tag.typeExpression && tag.typeExpression.type) {
        return tag;
    }
    return undefined;
}

/** @internal */
export function isUnaryExpression(node: Node): node is UnaryExpression {
    return isUnaryExpressionKind(skipPartiallyEmittedExpressions(node).kind);
}

function isUnaryExpressionKind(kind: SyntaxKind): boolean {
    switch (kind) {
        case SyntaxKind.PrefixUnaryExpression:
        case SyntaxKind.PostfixUnaryExpression:
        case SyntaxKind.TypeAssertionExpression:
            return true;
        default:
            return isLeftHandSideExpressionKind(kind);
    }
}

/**
 * Determines whether a node is an expression based only on its kind.
 */
export function isExpression(node: Node): node is Expression {
    return isExpressionKind(skipPartiallyEmittedExpressions(node).kind);
}

function isExpressionKind(kind: SyntaxKind): boolean {
    switch (kind) {
        case SyntaxKind.ConditionalExpression:
        case SyntaxKind.BinaryExpression:
        case SyntaxKind.SpreadElement:
        //case SyntaxKind.CommaListExpression:
        case SyntaxKind.PartiallyEmittedExpression:
            return true;
        default:
            return isUnaryExpressionKind(kind);
    }
}

function isFunctionLikeDeclarationKind(kind: SyntaxKind): boolean {
    switch (kind) {
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.MethodDeclaration:
            //case SyntaxKind.FunctionExpression:
            return true;
        default:
            return false;
    }
}

/** @internal */
export function isFunctionLikeKind(kind: SyntaxKind): boolean {
    switch (kind) {
        case SyntaxKind.MethodSignature:
        // case SyntaxKind.CallSignature:
        // case SyntaxKind.JSDocSignature:

        case SyntaxKind.IndexSignature:
        // case SyntaxKind.FunctionType:
        case SyntaxKind.JSDocFunctionType:
            return true;
        default:
            return isFunctionLikeDeclarationKind(kind);
    }
}

export function isFunctionLike(
    node: Node | undefined
): node is SignatureDeclaration {
    return !!node && isFunctionLikeKind(node.kind);
}

/** @internal */
export function canHaveLocals(node: Node): node is HasLocals {
    switch (node.kind) {
        //case SyntaxKind.ArrowFunction:
        case SyntaxKind.Block:
        case SyntaxKind.CaseBlock:
        case SyntaxKind.CatchClause:
        case SyntaxKind.ForStatement:
        case SyntaxKind.ForInStatement:
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
        //case SyntaxKind.FunctionType:
        case SyntaxKind.IndexSignature:
        // case SyntaxKind.JSDocCallbackTag:
        // case SyntaxKind.JSDocEnumTag:
        case SyntaxKind.JSDocFunctionType:
        // case SyntaxKind.JSDocSignature:
        // case SyntaxKind.JSDocTypedefTag:
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.MethodSignature:
        case SyntaxKind.SourceFile:
            return true;
        default:
            return false;
    }
}

function isDeclarationKind(kind: SyntaxKind) {
    return (
        kind === SyntaxKind.BindingElement ||
        //kind === SyntaxKind.ArrowFunction
        kind === SyntaxKind.FunctionDeclaration ||
        kind === SyntaxKind.FunctionExpression ||
        //|| kind === SyntaxKind.ImportClause
        kind === SyntaxKind.MethodDeclaration ||
        kind === SyntaxKind.MethodSignature ||
        kind === SyntaxKind.Parameter ||
        kind === SyntaxKind.PropertyAssignment ||
        // || kind === SyntaxKind.PropertyDeclaration
        // || kind === SyntaxKind.PropertySignature

        kind === SyntaxKind.ShorthandPropertyAssignment ||
        kind === SyntaxKind.TypeParameter ||
        kind === SyntaxKind.VariableDeclaration
        // || kind === SyntaxKind.JSDocTypedefTag
        // || kind === SyntaxKind.JSDocCallbackTag
        // || kind === SyntaxKind.JSDocPropertyTag
    );
}

function isDeclarationStatementKind(kind: SyntaxKind) {
    return (
        kind === SyntaxKind.FunctionDeclaration
        //|| kind === SyntaxKind.MissingDeclaration

        //|| kind === SyntaxKind.ImportDeclaration
    );
}

function isStatementKindButNotDeclarationKind(kind: SyntaxKind) {
    return (
        kind === SyntaxKind.BreakStatement ||
        kind === SyntaxKind.ContinueStatement ||
        kind === SyntaxKind.DoStatement ||
        //|| kind === SyntaxKind.ExpressionStatement
        kind === SyntaxKind.EmptyStatement ||
        kind === SyntaxKind.ForInStatement ||
        kind === SyntaxKind.ForStatement ||
        kind === SyntaxKind.IfStatement ||
        kind === SyntaxKind.ReturnStatement ||
        kind === SyntaxKind.SwitchStatement ||
        kind === SyntaxKind.VariableStatement ||
        kind === SyntaxKind.WhileStatement
    );
}

/**
 * Determines whether the node is a statement that is not also a declaration
 *
 * @internal
 */
export function isStatementButNotDeclaration(node: Node): node is Statement {
    return isStatementKindButNotDeclarationKind(node.kind);
}

export function walkUpBindingElementsAndPatterns(
    binding: BindingElement
): VariableDeclaration | ParameterDeclaration {
    let node = binding.parent;
    while (isBindingElement(node.parent)) {
        node = node.parent.parent;
    }
    return node.parent;
}

function getCombinedFlags(node: Node, getFlags: (n: Node) => number): number {
    if (isBindingElement(node)) {
        node = walkUpBindingElementsAndPatterns(node);
    }
    let flags = getFlags(node);
    if (node.kind === SyntaxKind.VariableDeclaration) {
        node = node.parent;
    }
    if (node && node.kind === SyntaxKind.VariableDeclarationList) {
        flags |= getFlags(node);
        node = node.parent;
    }
    if (node && node.kind === SyntaxKind.VariableStatement) {
        flags |= getFlags(node);
    }
    return flags;
}

// Returns the node flags for this node and all relevant parent nodes.  This is done so that
// nodes like variable declarations and binding elements can returned a view of their flags
// that includes the modifiers from their container.  i.e. flags like export/declare aren't
// stored on the variable declaration directly, but on the containing variable statement
// (if it has one).  Similarly, flags for let/const are stored on the variable declaration
// list.  By calling this function, all those flags are combined so that the client can treat
// the node as if it actually had those flags.
export function getCombinedNodeFlags(node: Node): NodeFlags {
    return getCombinedFlags(node, getNodeFlags);
}

function getNodeFlags(node: Node) {
    return node.flags;
}

export function isStatement(node: Node): node is Statement {
    const kind = node.kind;
    return (
        isStatementKindButNotDeclarationKind(kind) ||
        isDeclarationStatementKind(kind) ||
        isBlockStatement(node)
    );
}

function isBlockStatement(node: Node): node is Block {
    if (node.kind !== SyntaxKind.Block) return false;
    if (node.parent !== undefined) {
        if (node.parent.kind === SyntaxKind.CatchClause) {
            return false;
        }
    }
    return !isFunctionBlock(node);
}

/** @internal */
export function isBooleanLiteral(node: Node): node is IntegerLiteral {
    return (
        node.kind == SyntaxKind.IntLiteral &&
        ((node as IntegerLiteral).text === "0" ||
            (node as IntegerLiteral).text === "1")
    );
}
