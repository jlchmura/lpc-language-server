import {
    BinaryExpression,
    BindingElement,
    Block,
    CallExpression,
    FunctionDeclaration,
    Identifier,
    JSDocTypeExpression,
    Node,
    NumericLiteral,
    ParenthesizedExpression,
    PrefixUnaryExpression,
    PrivateIdentifier,
    PropertyAccessExpression,
    PropertyAssignment,
    ShorthandPropertyAssignment,
    SyntaxKind,
    VariableDeclaration,
    VariableDeclarationList,
    VariableStatement,
    VoidExpression,
} from "./types";

export function isBinaryExpression(node: Node): node is BinaryExpression {
    return node.kind === SyntaxKind.BinaryExpression;
}

export function isParenthesizedExpression(
    node: Node
): node is ParenthesizedExpression {
    return node.kind === SyntaxKind.ParenthesizedExpression;
}

export function isPrefixUnaryExpression(
    node: Node
): node is PrefixUnaryExpression {
    return node.kind === SyntaxKind.PrefixUnaryExpression;
}

export function isNumericLiteral(node: Node): node is NumericLiteral {
    return node.kind === SyntaxKind.NumericLiteral;
}

export function isPropertyAccessExpression(
    node: Node
): node is PropertyAccessExpression {
    return node.kind === SyntaxKind.PropertyAccessExpression;
}

export function isIdentifier(node: Node): node is Identifier {
    return node.kind === SyntaxKind.Identifier;
}

export function isVariableStatement(node: Node): node is VariableStatement {
    return node.kind === SyntaxKind.VariableStatement;
}

export function isBindingElement(node: Node): node is BindingElement {
    return node.kind === SyntaxKind.BindingElement;
}

export function isFunctionDeclaration(node: Node): node is FunctionDeclaration {
    return node.kind === SyntaxKind.FunctionDeclaration;
}

export function isBlock(node: Node): node is Block {
    return node.kind === SyntaxKind.Block;
}

export function isCallExpression(node: Node): node is CallExpression {
    return node.kind === SyntaxKind.CallExpression;
}

export function isVoidExpression(node: Node): node is VoidExpression {
    return node.kind === SyntaxKind.VoidExpression;
}


// Property assignments

export function isPropertyAssignment(node: Node): node is PropertyAssignment {
    return node.kind === SyntaxKind.PropertyAssignment;
}

export function isShorthandPropertyAssignment(node: Node): node is ShorthandPropertyAssignment {
    return node.kind === SyntaxKind.ShorthandPropertyAssignment;
}

// export function isSpreadAssignment(node: Node): node is SpreadAssignment {
//     return node.kind === SyntaxKind.SpreadAssignment;
// }

export function isVariableDeclaration(node: Node): node is VariableDeclaration {
    return node.kind === SyntaxKind.VariableDeclaration;
}

export function isVariableDeclarationList(node: Node): node is VariableDeclarationList {
    return node.kind === SyntaxKind.VariableDeclarationList;
}


export function isPrivateIdentifier(node: Node): node is PrivateIdentifier {
    return node.kind === SyntaxKind.PrivateIdentifier;
}


// JSDoc Elements

export function isJSDocTypeExpression(node: Node): node is JSDocTypeExpression {
    return node.kind === SyntaxKind.JSDocTypeExpression;
}


