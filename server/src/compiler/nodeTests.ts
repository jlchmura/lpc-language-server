import { ArrayBindingPattern, ArrayTypeNode, BinaryExpression, BindingElement, Block, CallExpression, ComputedPropertyName, DefaultClause, ElementAccessExpression, ExpressionStatement, FloatLiteral, ForStatement, FunctionDeclaration, FunctionExpression, Identifier, IfStatement, IndexedAccessTypeNode, InlineClosureExpression, IntLiteral, JSDoc, JSDocDeprecatedTag, JSDocSignature, JSDocTemplateTag, JSDocTypedefTag, JSDocTypeExpression, LiteralTypeNode, NewExpression, Node, ParameterDeclaration, ParenthesizedExpression, PrefixUnaryExpression, PropertyAccessExpression, PropertyDeclaration, QualifiedName, ShorthandPropertyAssignment, SourceFile, StringLiteral, StructDeclaration, SwitchStatement, SyntaxKind, TypeParameterDeclaration, UnionTypeNode, VariableDeclaration, VariableDeclarationList, VariableStatement } from "./_namespaces/lpc";

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

export function isInlineClosureExpression(node: Node): node is InlineClosureExpression {
    return node.kind === SyntaxKind.InlineClosureExpression;
}

export function isParenthesizedExpression(node: Node): node is ParenthesizedExpression {
    return node.kind === SyntaxKind.ParenthesizedExpression;
}

export function isPrefixUnaryExpression(node: Node): node is PrefixUnaryExpression {
    return node.kind === SyntaxKind.PrefixUnaryExpression;
}

export function isJSDocTemplateTag(node: Node): node is JSDocTemplateTag {
    return node.kind === SyntaxKind.JSDocTemplateTag;
}

export function isStructDeclaration(node:Node): node is StructDeclaration {
    return node.kind === SyntaxKind.StructDeclaration;
}

export function isShorthandPropertyAssignment(node: Node): node is ShorthandPropertyAssignment {
    return node.kind === SyntaxKind.ShorthandPropertyAssignment;
}

export function isJSDocDeprecatedTag(node: Node): node is JSDocDeprecatedTag {
    return node.kind === SyntaxKind.JSDocDeprecatedTag;
}

export function isBindingElement(node: Node): node is BindingElement {
    return node.kind === SyntaxKind.BindingElement;
}

export function isPropertyDeclaration(node: Node): node is PropertyDeclaration {
    return node.kind === SyntaxKind.PropertyDeclaration;
}

export function isForStatement(node: Node): node is ForStatement {
    return node.kind === SyntaxKind.ForStatement;
}

export function isSpreadAssignment(node: Node) {//: node is SpreadAssignment {
    // TODO
    return false;//return node.kind === SyntaxKind.SpreadAssignment;
}

export function isLiteralTypeNode(node: Node): node is LiteralTypeNode {
    return node.kind === SyntaxKind.LiteralType;
}

export function isElementAccessExpression(node: Node): node is ElementAccessExpression {
    return node.kind === SyntaxKind.ElementAccessExpression;
}

export function isIndexedAccessTypeNode(node: Node): node is IndexedAccessTypeNode {
    return node.kind === SyntaxKind.IndexedAccessType;
}

export function isArrayBindingPattern(node: Node): node is ArrayBindingPattern {
    return node.kind === SyntaxKind.ArrayBindingPattern;
}

export function isSwitchStatement(node: Node): node is SwitchStatement {
    return node.kind === SyntaxKind.SwitchStatement;
}

export function isComputedPropertyName(node: Node): node is ComputedPropertyName {
    return node.kind === SyntaxKind.ComputedPropertyName;
}

export function isQualifiedName(node: Node): node is QualifiedName {
    return node.kind === SyntaxKind.QualifiedName;
}

export function isNewExpression(node: Node): node is NewExpression {
    return node.kind === SyntaxKind.NewExpression;
}

export function isJSDocTypedefTag(node: Node): node is JSDocTypedefTag {
    return node.kind === SyntaxKind.JSDocTypedefTag;
}

export function isPrivateIdentifier(node: Node){//: node is PrivateIdentifier {
    return false;//return node.kind === SyntaxKind.PrivateIdentifier;
}