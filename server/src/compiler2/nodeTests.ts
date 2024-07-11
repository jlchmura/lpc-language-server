import {
    ArrayBindingPattern,
    ArrayTypeNode,
    ArrowFunction,
    BinaryExpression,
    BindingElement,
    Block,
    CallExpression,
    CallSignatureDeclaration,
    ComputedPropertyName,
    ElementAccessExpression,
    ExpressionStatement,
    ExpressionWithTypeArguments,
    FunctionDeclaration,
    FunctionExpression,
    FunctionTypeNode,
    HeritageClause,
    Identifier,
    IfStatement,
    ImportTypeNode,
    IndexedAccessTypeNode,
    IndexSignatureDeclaration,
    JSDoc,
    JSDocDeprecatedTag,
    JSDocParameterTag,
    JSDocSignature,
    JSDocTemplateTag,
    JSDocTypeExpression,
    JSDocTypeTag,
    LiteralTypeNode,
    MethodDeclaration,
    Node,
    NonNullExpression,
    NumericLiteral,
    ObjectBindingPattern,
    ObjectLiteralExpression,
    ParameterDeclaration,
    ParenthesizedExpression,
    ParenthesizedTypeNode,
    PrefixUnaryExpression,
    PrivateIdentifier,
    PropertyAccessExpression,
    PropertyAssignment,
    PropertyDeclaration,
    PropertySignature,
    QualifiedName,
    ShorthandPropertyAssignment,
    SourceFile,
    SpreadAssignment,
    SpreadElement,
    StringLiteral,
    SyntaxKind,
    TypeAliasDeclaration,
    TypeLiteralNode,
    TypeOperatorNode,
    TypeParameterDeclaration,
    TypeReferenceNode,
    UnionTypeNode,
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
    return node.kind === SyntaxKind.IntLiteral || node.kind === SyntaxKind.FloatLiteral;
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

// Binding patterns
export function isObjectBindingPattern(node: Node): node is ObjectBindingPattern {
    return node.kind === SyntaxKind.ObjectBindingPattern;
}

export function isArrayBindingPattern(node: Node): node is ArrayBindingPattern {
    return node.kind === SyntaxKind.ArrayBindingPattern;
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



export function isFunctionExpression(node: Node): node is FunctionExpression {
    return node.kind === SyntaxKind.FunctionExpression;
}

export function isPropertyDeclaration(node: Node): node is PropertyDeclaration {
    return node.kind === SyntaxKind.PropertyDeclaration;
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

export function isCallSignatureDeclaration(node: Node): node is CallSignatureDeclaration {
    return node.kind === SyntaxKind.CallSignature;
}

export function isIndexSignatureDeclaration(node: Node): node is IndexSignatureDeclaration {
    return node.kind === SyntaxKind.IndexSignature;
}

export function isTypeLiteralNode(node: Node): node is TypeLiteralNode {
    return node.kind === SyntaxKind.TypeLiteral;
}

export function isArrayTypeNode(node: Node): node is ArrayTypeNode {
    return node.kind === SyntaxKind.ArrayType;
}

export function isUnionTypeNode(node: Node): node is UnionTypeNode {
    return node.kind === SyntaxKind.UnionType;
}

export function isIndexedAccessTypeNode(node: Node): node is IndexedAccessTypeNode {
    return node.kind === SyntaxKind.IndexedAccessType;
}

export function isLiteralTypeNode(node: Node): node is LiteralTypeNode {
    return node.kind === SyntaxKind.LiteralType;
}

export function isImportTypeNode(node: Node): node is ImportTypeNode {
    return node.kind === SyntaxKind.ImportType;
}

// Top-level nodes
export function isSourceFile(node: Node): node is SourceFile {
    return node.kind === SyntaxKind.SourceFile;
}

export function isComputedPropertyName(node: Node): node is ComputedPropertyName {
    return node.kind === SyntaxKind.ComputedPropertyName;
}

export function isElementAccessExpression(node: Node): node is ElementAccessExpression {
    return node.kind === SyntaxKind.ElementAccessExpression;
}

export function isTypeReferenceNode(node: Node): node is TypeReferenceNode {
    return node.kind === SyntaxKind.TypeReference;
}

export function isSpreadAssignment(node: Node): node is SpreadAssignment {
    return node.kind === SyntaxKind.SpreadAssignment;
}

export function isJSDocSignature(node: Node): node is JSDocSignature {
    return node.kind === SyntaxKind.JSDocSignature;
}

export function isJSDoc(node: Node): node is JSDoc {
    return node.kind === SyntaxKind.JSDoc;
}

export function isJSDocDeprecatedTag(node: Node): node is JSDocDeprecatedTag {
    return node.kind === SyntaxKind.JSDocDeprecatedTag;
}

export function isExpressionStatement(node: Node): node is ExpressionStatement {
    return node.kind === SyntaxKind.ExpressionStatement;
}

export function isJSDocTemplateTag(node: Node): node is JSDocTemplateTag {
    return node.kind === SyntaxKind.JSDocTemplateTag;
}

export function isJSDocParameterTag(node: Node): node is JSDocParameterTag {
    return node.kind === SyntaxKind.JSDocParameterTag;
}

export function isJSDocTypeTag(node: Node): node is JSDocTypeTag {
    return node.kind === SyntaxKind.JSDocTypeTag;
}

export function isObjectLiteralExpression(node: Node): node is ObjectLiteralExpression {
    return node.kind === SyntaxKind.ObjectLiteralExpression;
}

export function isDecorator(node: Node) {
    return false;
}

export function isMethodDeclaration(node: Node): node is MethodDeclaration {
    return node.kind === SyntaxKind.MethodDeclaration;
}

export function isHeritageClause(node: Node): node is HeritageClause {
    return node.kind === SyntaxKind.HeritageClause;
}

export function isQualifiedName(node: Node): node is QualifiedName {
    return node.kind === SyntaxKind.QualifiedName;
}

/** @deprecated */
export function isModuleBlock(node: Node) {
    return false;//return node.kind === SyntaxKind.ModuleBlock;
}

/** @deprecated */
export function isClassExpression(node: Node) {
    return false;// return node.kind === SyntaxKind.ClassExpression;
}

export function isGetAccessorDeclaration(node: Node) {
    return false;//return node.kind === SyntaxKind.GetAccessor;
}

export function isSetAccessorDeclaration(node: Node) {
    return false;//return node.kind === SyntaxKind.SetAccessor;
}

export function isPropertySignature(node: Node): node is PropertySignature {
    return node.kind === SyntaxKind.PropertySignature;
}

export function isJSDocPropertyTag(node: Node) {
    return false;
    // TODO
    //return node.kind === SyntaxKind.JSDocPropertyTag;
}

export function isOmittedExpression(node: Node) {//: node is OmittedExpression {
    return false;//return node.kind === SyntaxKind.OmittedExpression;
}

export function isClassDeclaration(node: Node){//: node is ClassDeclaration {
    return false;//return node.kind === SyntaxKind.ClassDeclaration;
}

export function isMethodSignature(node: Node) {//: node is MethodSignature {
    return false;//return node.kind === SyntaxKind.MethodSignature;
}

export function isClassStaticBlockDeclaration(node: Node) {//: node is ClassStaticBlockDeclaration {
    return false;//return node.kind === SyntaxKind.ClassStaticBlockDeclaration;
}

export function isExpressionWithTypeArguments(node: Node): node is ExpressionWithTypeArguments {
    return node.kind === SyntaxKind.ExpressionWithTypeArguments;
}

export function isTypeAliasDeclaration(node: Node): node is TypeAliasDeclaration {
    return node.kind === SyntaxKind.TypeAliasDeclaration;
}

export function isJSDocAugmentsTag(node: Node) {
    return false; // TODO
}
export function isJSDocImplementsTag(node:Node) { 
    return false; // TODO
}

export function isParenthesizedTypeNode(node: Node): node is ParenthesizedTypeNode {
    return node.kind === SyntaxKind.ParenthesizedType;
}

export function isTypeOperatorNode(node: Node): node is TypeOperatorNode {
    return node.kind === SyntaxKind.TypeOperator;
}

export function isTypePredicateNode(node: Node) {//: node is TypePredicateNode {
    return false;//return node.kind === SyntaxKind.TypePredicate;
}

export function isArrowFunction(node: Node): node is ArrowFunction {
    return node.kind === SyntaxKind.ArrowFunction;
}

export function isSpreadElement(node: Node): node is SpreadElement {
    return node.kind === SyntaxKind.SpreadElement;
}

export function isFunctionTypeNode(node: Node): node is FunctionTypeNode {
    return node.kind === SyntaxKind.FunctionType;
}

export function isJsxAttributes(node: Node) {//: node is JsxAttributes {
    return false;//return node.kind === SyntaxKind.JsxAttributes;
}

export function isNonNullExpression(node: Node): node is NonNullExpression {
    return node.kind === SyntaxKind.NonNullExpression;
}

export function isIfStatement(node: Node): node is IfStatement {
    return node.kind === SyntaxKind.IfStatement;
}
