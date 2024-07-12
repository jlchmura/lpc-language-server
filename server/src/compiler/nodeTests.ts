import { ArrayTypeNode, BinaryExpression, Block, CallExpression, DefaultClause, ExpressionStatement, FloatLiteral, FunctionDeclaration, FunctionExpression, Identifier, IfStatement, IntLiteral, JSDoc, JSDocSignature, JSDocTypeExpression, Node, ParameterDeclaration, PropertyAccessExpression, SourceFile, StringLiteral, SyntaxKind, TypeParameterDeclaration, UnionTypeNode, VariableDeclaration, VariableDeclarationList, VariableStatement } from "./_namespaces/lpc";

export function isBinaryExpression(node: Node): node is BinaryExpression {
    return node.kind === SyntaxKind.BinaryExpression;
}

// export function isParenthesizedExpression(
//     node: Node
// ): node is ParenthesizedExpression {
//     return node.kind === SyntaxKind.ParenthesizedExpression;
// }

// export function isPrefixUnaryExpression(
//     node: Node
// ): node is PrefixUnaryExpression {
//     return node.kind === SyntaxKind.PrefixUnaryExpression;
// }

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

export function isFunctionDeclaration(node: Node): node is FunctionDeclaration {
    return node.kind === SyntaxKind.FunctionDeclaration;
}

export function isBlock(node: Node): node is Block {
    return node.kind === SyntaxKind.Block;
}

export function isCallExpression(node: Node): node is CallExpression {
    return node.kind === SyntaxKind.CallExpression;
}

export function isVariableDeclaration(node: Node): node is VariableDeclaration {
    return node.kind === SyntaxKind.VariableDeclaration;
}

export function isVariableDeclarationList(node: Node): node is VariableDeclarationList {
    return node.kind === SyntaxKind.VariableDeclarationList;
}

// JSDoc Elements

export function isJSDocTypeExpression(node: Node): node is JSDocTypeExpression {
    return node.kind === SyntaxKind.JSDocTypeExpression;
}



export function isFunctionExpression(node: Node): node is FunctionExpression {
    return node.kind === SyntaxKind.FunctionExpression;
}

export function isIntLiteral(node: Node): node is IntLiteral {
    return node.kind === SyntaxKind.IntLiteral;
}

export function isFloatLiteral(node:Node): node is FloatLiteral {
    return node.kind === SyntaxKind.FloatLiteral;
}

export function isStringLiteral(node: Node): node is StringLiteral {
    return node.kind === SyntaxKind.StringLiteral;
}

export function isTypeParameterDeclaration(node: Node): node is TypeParameterDeclaration {
    return node.kind === SyntaxKind.TypeParameter;
}

// TODO(rbuckton): Rename to 'isParameterDeclaration'
export function isParameter(node: Node): node is ParameterDeclaration {
    return node.kind === SyntaxKind.Parameter;
}

export function isArrayTypeNode(node: Node): node is ArrayTypeNode {
    return node.kind === SyntaxKind.ArrayType;
}

export function isUnionTypeNode(node: Node): node is UnionTypeNode {
    return node.kind === SyntaxKind.UnionType;
}

// Top-level nodes
export function isSourceFile(node: Node): node is SourceFile {
    return node.kind === SyntaxKind.SourceFile;
}

export function isJSDocSignature(node: Node): node is JSDocSignature {
    return node.kind === SyntaxKind.JSDocSignature;
}

export function isJSDoc(node: Node): node is JSDoc {
    return node.kind === SyntaxKind.JSDoc;
}

export function isExpressionStatement(node: Node): node is ExpressionStatement {
    return node.kind === SyntaxKind.ExpressionStatement;
}

export function isDecorator(node: Node) {
    return false;
}

export function isIfStatement(node: Node): node is IfStatement {
    return node.kind === SyntaxKind.IfStatement;
}

export function isDefaultClause(node: Node): node is DefaultClause {
    return node.kind === SyntaxKind.DefaultClause;
}
