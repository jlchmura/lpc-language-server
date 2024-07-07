import { isBinaryExpression, isBindingElement, isFunctionExpression, isIdentifier, isPropertyAssignment, isVariableDeclaration } from "./nodeTests";
import {
    AccessExpression,
    AssignmentDeclarationKind,
    BinaryExpression,
    BindingElement,
    BindingPattern,
    Block,
    CallExpression,
    ClassLikeDeclaration,
    Declaration,
    DeclarationName,
    ElementAccessExpression,
    Expression,
    FileReference,
    HasLocals,
    HasModifiers,
    Identifier,
    IntegerLiteral,
    JSDocTypeTag,
    LeftHandSideExpression,
    MemberName,
    NamedDeclaration,
    Node,
    NodeFlags,
    OuterExpressionKinds,
    ParameterDeclaration,
    SignatureDeclaration,
    Statement,
    StringLiteral,
    SyntaxKind,
    TextSpan,
    UnaryExpression,
    VariableDeclaration,
} from "./types";
import { getAssignmentDeclarationKind, getElementOrPropertyAccessArgumentExpressionOrName, isAccessExpression, isBindableStaticElementAccessExpression, isFunctionBlock, skipOuterExpressions } from "./utilities";

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


export function canHaveModifiers(node: Node): node is HasModifiers {
    const kind = node.kind;
    return kind === SyntaxKind.TypeParameter
        || kind === SyntaxKind.Parameter        
        || kind === SyntaxKind.MethodSignature
        || kind === SyntaxKind.MethodDeclaration
        
        || kind === SyntaxKind.IndexSignature
        
        || kind === SyntaxKind.FunctionExpression
        // || kind === SyntaxKind.ArrowFunction
        // || kind === SyntaxKind.ClassExpression
        || kind === SyntaxKind.VariableStatement
        || kind === SyntaxKind.FunctionDeclaration
        //|| kind === SyntaxKind.ClassDeclaration
        ;
}



/** @internal */
export function getNonAssignedNameOfDeclaration(declaration: Declaration | Expression): DeclarationName | undefined {
    switch (declaration.kind) {
        case SyntaxKind.Identifier:
            return declaration as Identifier;
        // case SyntaxKind.JSDocPropertyTag:
        // case SyntaxKind.JSDocParameterTag: {
        //     const { name } = declaration as JSDocPropertyLikeTag;
        //     if (name.kind === SyntaxKind.QualifiedName) {
        //         return name.right;
        //     }
        //     break;
        // }
        case SyntaxKind.CallExpression:
        case SyntaxKind.BinaryExpression: {
            const expr = declaration as BinaryExpression | CallExpression;
            switch (getAssignmentDeclarationKind(expr)) {                
                case AssignmentDeclarationKind.Property:                
                    return getElementOrPropertyAccessArgumentExpressionOrName((expr as BinaryExpression).left as AccessExpression);
                default:
                    return undefined;
            }
        }
        // case SyntaxKind.JSDocTypedefTag:
        //     return getNameOfJSDocTypedef(declaration as JSDocTypedefTag);
        // case SyntaxKind.JSDocEnumTag:
        //     return nameForNamelessJSDocTypedef(declaration as JSDocEnumTag);        
        case SyntaxKind.ElementAccessExpression:
            const expr = declaration as ElementAccessExpression;
            if (isBindableStaticElementAccessExpression(expr)) {
                return expr.argumentExpression;
            }
    }
    return (declaration as NamedDeclaration).name;
}

export function getNameOfDeclaration(declaration: Declaration | Expression | undefined): DeclarationName | undefined {
    if (declaration === undefined) return undefined;
    // || isArrowFunction(declaration) || isClassExpression(declaration) 
    return getNonAssignedNameOfDeclaration(declaration) || (isFunctionExpression(declaration) ? getAssignedName(declaration) : undefined);
}


/** @internal */
export function getAssignedName(node: Node): DeclarationName | undefined {
    if (!node.parent) {
        return undefined;
    }
    else if (isPropertyAssignment(node.parent) || isBindingElement(node.parent)) {
        return node.parent.name;
    }
    else if (isBinaryExpression(node.parent) && node === node.parent.right) {
        if (isIdentifier(node.parent.left)) {
            return node.parent.left;
        }
        else if (isAccessExpression(node.parent.left)) {
            return getElementOrPropertyAccessArgumentExpressionOrName(node.parent.left);
        }
    }
    else if (isVariableDeclaration(node.parent) && isIdentifier(node.parent.name)) {
        return node.parent.name;
    }
}

/**
 * Iterates through the parent chain of a node and performs the callback on each parent until the callback
 * returns a truthy value, then returns that value.
 * If no such value is found, it applies the callback until the parent pointer is undefined or the callback returns "quit"
 * At that point findAncestor returns undefined.
 */
export function findAncestor<T extends Node>(node: Node | undefined, callback: (element: Node) => element is T): T | undefined;
export function findAncestor(node: Node | undefined, callback: (element: Node) => boolean | "quit"): Node | undefined;
export function findAncestor(node: Node | undefined, callback: (element: Node) => boolean | "quit"): Node | undefined {
    while (node) {
        const result = callback(node);
        if (result === "quit") {
            return undefined;
        }
        else if (result) {
            return node;
        }
        node = node.parent;
    }
    return undefined;
}

export function isClassLike(node: Node): node is ClassLikeDeclaration {
    return node && (node.kind === SyntaxKind.SourceFile);// TODO || node.kind === SyntaxKind.ClassExpression);
}


export function isMemberName(node: Node): node is MemberName {
    return node.kind === SyntaxKind.Identifier || node.kind === SyntaxKind.PrivateIdentifier;
}



/** Add an extra underscore to identifiers that start with two underscores to avoid issues with magic names like '__proto__' */
export function escapeLeadingUnderscores(identifier: string): string {
    return identifier;
    // TODO: return (identifier.length >= 2 && identifier.charCodeAt(0) === CharacterCodes._ && identifier.charCodeAt(1) === CharacterCodes._ ? "_" + identifier : identifier) as __String;
}


/** @internal */
export function isNamedDeclaration(node: Node): node is NamedDeclaration & { name: DeclarationName; } {
    return !!(node as NamedDeclaration).name; // A 'name' property should always be a DeclarationName.
}

export function createTextSpan(start: number, length: number): TextSpan {
    if (start < 0) {
        throw new Error("start < 0");
    }
    if (length < 0) {
        throw new Error("length < 0");
    }

    return { start, length };
}


export function createTextSpanFromBounds(start: number, end: number) {
    return createTextSpan(start, end - start);
}

/** @internal */
export function isFunctionLikeOrClassStaticBlockDeclaration(node: Node | undefined): node is SignatureDeclaration  {
    return !!node && (isFunctionLikeKind(node.kind));
}

/** @internal */
export function isBindingPattern(node: Node | undefined): node is BindingPattern {
    if (node) {
        const kind = node.kind;
        return kind === SyntaxKind.ArrayBindingPattern
            || kind === SyntaxKind.ObjectBindingPattern;
    }

    return false;
}