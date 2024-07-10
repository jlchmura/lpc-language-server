import { addRange, emptyArray, find, flatMap, tryCast } from "./core";
import { Debug } from "./debug";
import { isBinaryExpression, isBindingElement, isBlock, isFunctionExpression, isIdentifier, isJSDoc, isJSDocDeprecatedTag, isJSDocParameterTag, isJSDocTemplateTag, isJSDocTypeTag, isModuleBlock, isParameter, isPropertyAssignment, isPropertyDeclaration, isSourceFile, isTypeReferenceNode, isVariableDeclaration } from "./nodeTests";
import { stringToToken } from "./scanner";
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
    ForInStatement,
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
    Symbol,
    TextSpan,
    UnaryExpression,
    VariableDeclaration,
    MethodDeclaration,
    TypeNode,
    FunctionLikeDeclaration,
    AssignmentPattern,
    ObjectLiteralElementLike,
    CallLikeExpression,
    PropertyAccessExpression,
    QualifiedName,
    ImportTypeNode,
    FunctionExpression,
    ArrowFunction,
    JSDocDeprecatedTag,
    JSDocTag,
    HasJSDoc,
    JSDoc,
    JSDocContainer,
    HasInitializer,
    JSDocParameterTag,
    TypeParameterDeclaration,
    JSDocTemplateTag,
    TextRange,
    EntityName,
    ModifierFlags,
    HasExpressionInitializer,
    JSDocPropertyLikeTag,
    PropertyName,
    NewExpression,
    TypeReferenceType,
    KeywordSyntaxKind,
} from "./types";
import { getAssignmentDeclarationKind, getEffectiveModifierFlags, getElementOrPropertyAccessArgumentExpressionOrName, getJSDocCommentsAndTags, isAccessExpression, isBindableStaticElementAccessExpression, isFunctionBlock, isKeyword, isTypeNodeKind, isVariableLike, setTextRangePosEnd, skipOuterExpressions } from "./utilities";

export function setTextRange<T extends TextRange>(range: T, location: TextRange | undefined): T {
    return location ? setTextRangePosEnd(range, location.pos, location.end) : range;
}

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
        case SyntaxKind.IntLiteral:
        case SyntaxKind.FloatLiteral:
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
        || kind === SyntaxKind.PropertySignature
        || kind === SyntaxKind.PropertyDeclaration
        || kind === SyntaxKind.MethodSignature
        || kind === SyntaxKind.MethodDeclaration
        // || kind === SyntaxKind.Constructor
        // || kind === SyntaxKind.GetAccessor
        // || kind === SyntaxKind.SetAccessor
        || kind === SyntaxKind.IndexSignature
        || kind === SyntaxKind.ConstructorType
        || kind === SyntaxKind.FunctionExpression
        || kind === SyntaxKind.ArrowFunction
        || kind === SyntaxKind.ClassExpression
        // @ts-ignore
        || kind === SyntaxKind.VariableStatement
        || kind === SyntaxKind.FunctionDeclaration
        //|| kind === SyntaxKind.ClassDeclaration
        || kind === SyntaxKind.InterfaceDeclaration
        || kind === SyntaxKind.TypeAliasDeclaration
        // || kind === SyntaxKind.EnumDeclaration
        // || kind === SyntaxKind.ModuleDeclaration
        // || kind === SyntaxKind.ImportEqualsDeclaration
        || kind === SyntaxKind.ImportDeclaration
        // || kind === SyntaxKind.ExportAssignment
        // || kind === SyntaxKind.ExportDeclaration;
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

/** @internal */
export function isForInOrOfStatement(node: Node): node is ForInStatement {
    return node.kind === SyntaxKind.ForInStatement;
}

/** @internal */
export function isMethodOrAccessor(node: Node): node is MethodDeclaration  {
    switch (node.kind) {
        case SyntaxKind.MethodDeclaration:        
            return true;
        default:
            return false;
    }
}


export function symbolName(symbol: Symbol): string {
    // TODO
    // if (symbol.valueDeclaration && isPrivateIdentifierClassElementDeclaration(symbol.valueDeclaration)) {
    //     return idText(symbol.valueDeclaration.name);
    // }
    return symbol.name;// unescapeLeadingUnderscores(symbol.escapedName);
}


export function idText(identifierOrPrivateName: Identifier): string { // | PrivateIdentifier): string {
    return identifierOrPrivateName.text;// unescapeLeadingUnderscores(identifierOrPrivateName.escapedText);
}

/**
 * Gets a value indicating whether a node originated in the parse tree.
 *
 * @param node The node to test.
 */
export function isParseTreeNode(node: Node): boolean {
    return (node.flags & NodeFlags.Synthesized) === 0;
}


/**
 * Gets the original parse tree node for a node.
 *
 * @param node The original node.
 * @returns The original parse tree node if found; otherwise, undefined.
 */
export function getParseTreeNode(node: Node | undefined): Node | undefined;

/**
 * Gets the original parse tree node for a node.
 *
 * @param node The original node.
 * @param nodeTest A callback used to ensure the correct type of parse tree node is returned.
 * @returns The original parse tree node if found; otherwise, undefined.
 */
export function getParseTreeNode<T extends Node>(node: T | undefined, nodeTest?: (node: Node) => node is T): T | undefined;
export function getParseTreeNode(node: Node | undefined, nodeTest?: (node: Node) => boolean): Node | undefined {
    if (node === undefined || isParseTreeNode(node)) {
        return node;
    }

    node = node.original;
    while (node) {
        if (isParseTreeNode(node)) {
            return !nodeTest || nodeTest(node) ? node : undefined;
        }
        node = node.original;
    }
}

/** @internal */
export function canHaveSymbol(node: Node): node is Declaration {
    // NOTE: This should cover all possible declarations except MissingDeclaration and SemicolonClassElement
    //       since they aren't actually declarations and can't have a symbol.
    switch (node.kind) {
        case SyntaxKind.ArrowFunction:
        case SyntaxKind.BinaryExpression:
        case SyntaxKind.BindingElement:
        case SyntaxKind.CallExpression:
        case SyntaxKind.CallSignature:
        // case SyntaxKind.ClassDeclaration:
        case SyntaxKind.ClassExpression:
        // case SyntaxKind.ClassStaticBlockDeclaration:
        // case SyntaxKind.Constructor:
        case SyntaxKind.ConstructorType:
        // case SyntaxKind.ConstructSignature:
        case SyntaxKind.ElementAccessExpression:
        // case SyntaxKind.EnumDeclaration:
        // case SyntaxKind.EnumMember:
        // case SyntaxKind.ExportAssignment:
        // case SyntaxKind.ExportDeclaration:
        case SyntaxKind.ExportSpecifier:
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.FunctionType:
        // case SyntaxKind.GetAccessor:
        case SyntaxKind.Identifier:
        case SyntaxKind.ImportClause:
        // case SyntaxKind.ImportEqualsDeclaration:
        case SyntaxKind.ImportSpecifier:
        case SyntaxKind.IndexSignature:
        // case SyntaxKind.InterfaceDeclaration:
        // case SyntaxKind.JSDocCallbackTag:
        // case SyntaxKind.JSDocEnumTag:
        // case SyntaxKind.JSDocPropertyTag:
        // case SyntaxKind.JSDocTypedefTag:
        case SyntaxKind.JSDocFunctionType:
        case SyntaxKind.JSDocParameterTag:
        case SyntaxKind.JSDocSignature:
        case SyntaxKind.JSDocTypeLiteral:        
        case SyntaxKind.MappedType:
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.MethodSignature:
        // case SyntaxKind.ModuleDeclaration:
        case SyntaxKind.NamedTupleMember:
        // case SyntaxKind.NamespaceExport:
        // case SyntaxKind.NamespaceExportDeclaration:
        // case SyntaxKind.NamespaceImport:
        case SyntaxKind.NewExpression:
        // case SyntaxKind.NoSubstitutionTemplateLiteral:
        case SyntaxKind.IntLiteral:
        case SyntaxKind.FloatLiteral:
        case SyntaxKind.ObjectLiteralExpression:
        case SyntaxKind.Parameter:
        case SyntaxKind.PropertyAccessExpression:
        case SyntaxKind.PropertyAssignment:
        case SyntaxKind.PropertyDeclaration:
        case SyntaxKind.PropertySignature:
        // case SyntaxKind.SetAccessor:
        case SyntaxKind.ShorthandPropertyAssignment:
        case SyntaxKind.SourceFile:
        case SyntaxKind.SpreadAssignment:
        case SyntaxKind.StringLiteral:
        //case SyntaxKind.TypeAliasDeclaration:
        case SyntaxKind.TypeLiteral:
        case SyntaxKind.TypeParameter:
        case SyntaxKind.VariableDeclaration:
            return true;
        default:
            return false;
    }
}

/** @internal */
export function canHaveLocals(node: Node): node is HasLocals {
    switch (node.kind) {
        case SyntaxKind.ArrowFunction:
        case SyntaxKind.Block:
        case SyntaxKind.CallSignature:
        case SyntaxKind.CaseBlock:
        case SyntaxKind.CatchClause:        
        case SyntaxKind.ConditionalType:        
        case SyntaxKind.ConstructorType:        
        case SyntaxKind.ForStatement:
        case SyntaxKind.ForInStatement:        
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.FunctionType:        
        case SyntaxKind.IndexSignature:
        case SyntaxKind.InlineClosureExpression:
        // case SyntaxKind.JSDocCallbackTag:
        // case SyntaxKind.JSDocEnumTag:
        case SyntaxKind.JSDocFunctionType:
        case SyntaxKind.JSDocSignature:
        //case SyntaxKind.JSDocTypedefTag:
        case SyntaxKind.MappedType:
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.MethodSignature:        
        case SyntaxKind.SourceFile:        
            return true;
        default:
            return false;
    }
}


/**
 * Node test that determines whether a node is a valid type node.
 * This differs from the `isPartOfTypeNode` function which determines whether a node is *part*
 * of a TypeNode.
 */
export function isTypeNode(node: Node): node is TypeNode {
    return isTypeNodeKind(node.kind);
}

/** @internal */
export function isFunctionLikeDeclaration(node: Node): node is FunctionLikeDeclaration {
    return node && isFunctionLikeDeclarationKind(node.kind);
}

/**
 * @deprecated LPC doesn't have costs
 * @param node 
 * @returns 
 */
export function isConstTypeReference(node: Node) {
    // TODO remove this
    return isTypeReferenceNode(node) && isIdentifier(node.typeName) &&
        node.typeName.text === "const" && !node.typeArguments;
}

/** @internal */
export function isAssignmentPattern(node: Node): node is AssignmentPattern {
    const kind = node.kind;
    return kind === SyntaxKind.ArrayLiteralExpression
        || kind === SyntaxKind.ObjectLiteralExpression;
}

export function isObjectLiteralElementLike(node: Node): node is ObjectLiteralElementLike {
    const kind = node.kind;
    return kind === SyntaxKind.PropertyAssignment
        || kind === SyntaxKind.ShorthandPropertyAssignment
        || kind === SyntaxKind.SpreadAssignment
        || kind === SyntaxKind.MethodDeclaration
        ;
}

export function isCallLikeExpression(node: Node): node is CallLikeExpression {
    switch (node.kind) {        
        case SyntaxKind.CallExpression:
        case SyntaxKind.NewExpression:        
            return true;
        default:
            return false;
    }
}

/** @internal */
export function isPropertyAccessOrQualifiedNameOrImportTypeNode(node: Node): node is PropertyAccessExpression | QualifiedName | ImportTypeNode {
    const kind = node.kind;
    return kind === SyntaxKind.PropertyAccessExpression
        || kind === SyntaxKind.QualifiedName
        || kind === SyntaxKind.ImportType;
}

/**
 * Remove extra underscore from escaped identifier text content.
 *
 * @param identifier The escaped identifier text.
 * @returns The unescaped identifier text.
 * @deprecated LPC doesn't need this, but imported for convenience
 */
export function unescapeLeadingUnderscores(identifier: string): string {
    return identifier;
    // const id = identifier as string;
    // return id.length >= 3 && id.charCodeAt(0) === CharacterCodes._ && id.charCodeAt(1) === CharacterCodes._ && id.charCodeAt(2) === CharacterCodes._ ? id.substr(1) : id;
}

/** @internal */
export function isFunctionExpressionOrArrowFunction(node: Node): node is FunctionExpression | ArrowFunction {
    return node.kind === SyntaxKind.FunctionExpression || node.kind === SyntaxKind.ArrowFunction;
}


/** @internal */
export function isCallLikeOrFunctionLikeExpression(node: Node): node is CallLikeExpression | FunctionExpression | ArrowFunction {
    return isCallLikeExpression(node) || isFunctionExpressionOrArrowFunction(node);
}

/** @internal */
export function canHaveJSDoc(node: Node): node is HasJSDoc {
    switch (node.kind) {
        case SyntaxKind.ArrowFunction:
        case SyntaxKind.BinaryExpression:
        case SyntaxKind.Block:
        case SyntaxKind.BreakStatement:
        case SyntaxKind.CallSignature:
        case SyntaxKind.CaseClause:
        //case SyntaxKind.ClassDeclaration:
        case SyntaxKind.ClassExpression:        
        case SyntaxKind.ConstructorType:        
        case SyntaxKind.ContinueStatement:        
        case SyntaxKind.DoStatement:
        case SyntaxKind.ElementAccessExpression:
        case SyntaxKind.EmptyStatement:
        case SyntaxKind.EndOfFileToken:        
        // case SyntaxKind.ExportAssignment:
        // case SyntaxKind.ExportDeclaration:
        // case SyntaxKind.ExportSpecifier:
        case SyntaxKind.ExpressionStatement:
        case SyntaxKind.ForInStatement:        
        case SyntaxKind.ForStatement:
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.FunctionType:        
        case SyntaxKind.Identifier:
        case SyntaxKind.IfStatement:
        case SyntaxKind.ImportDeclaration:        
        case SyntaxKind.IndexSignature:        
        case SyntaxKind.JSDocFunctionType:
        case SyntaxKind.JSDocSignature:        
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.MethodSignature:        
        case SyntaxKind.NamedTupleMember:        
        case SyntaxKind.ObjectLiteralExpression:
        case SyntaxKind.Parameter:
        case SyntaxKind.ParenthesizedExpression:
        case SyntaxKind.PropertyAccessExpression:
        case SyntaxKind.PropertyAssignment:
        case SyntaxKind.PropertyDeclaration:
        case SyntaxKind.PropertySignature:
        case SyntaxKind.ReturnStatement:
        //case SyntaxKind.SemicolonClassElement:        
        case SyntaxKind.ShorthandPropertyAssignment:
        case SyntaxKind.SpreadAssignment:
        case SyntaxKind.SwitchStatement:
        //case SyntaxKind.ThrowStatement:
        //case SyntaxKind.TryStatement:
        //case SyntaxKind.TypeAliasDeclaration:
        case SyntaxKind.TypeParameter:
        case SyntaxKind.VariableDeclaration:
        case SyntaxKind.VariableStatement:
        case SyntaxKind.WhileStatement:        
            return true;
        default:
            return false;
    }
}

function getJSDocTagsWorker(node: Node, noCache?: boolean): readonly JSDocTag[] {
    if (!canHaveJSDoc(node)) return emptyArray;
    let tags = node.jsDoc?.jsDocCache;
    // If cache is 'null', that means we did the work of searching for JSDoc tags and came up with nothing.
    if (tags === undefined || noCache) {
        const comments = getJSDocCommentsAndTags(node, noCache);
        Debug.assert(comments.length < 2 || comments[0] !== comments[1]);
        tags = flatMap(comments, j => isJSDoc(j) ? j.tags : j);
        if (!noCache) {
            node.jsDoc ??= [];
            node.jsDoc.jsDocCache = tags;
        }
    }
    return tags;
}


/** Get the first JSDoc tag of a specified kind, or undefined if not present. */
function getFirstJSDocTag<T extends JSDocTag>(node: Node, predicate: (tag: JSDocTag) => tag is T, noCache?: boolean): T | undefined {
    return find(getJSDocTagsWorker(node, noCache), predicate);
}


/** Gets the JSDoc deprecated tag for the node if present */
export function getJSDocDeprecatedTag(node: Node): JSDocDeprecatedTag | undefined {
    return getFirstJSDocTag(node, isJSDocDeprecatedTag);
}


/**
 * True if has jsdoc nodes attached to it.
 *
 * @internal
 */
// TODO: GH#19856 Would like to return `node is Node & { jsDoc: JSDoc[] }` but it causes long compile times
export function hasJSDocNodes(node: Node): node is HasJSDoc {
    if (!canHaveJSDoc(node)) return false;

    const { jsDoc } = node as JSDocContainer;
    return !!jsDoc && jsDoc.length > 0;
}

/**
 * True if has initializer node attached to it.
 *
 * @internal
 */
export function hasInitializer(node: Node): node is HasInitializer {
    return !!(node as HasInitializer).initializer;
}

function getJSDocParameterTagsWorker(param: ParameterDeclaration, noCache?: boolean): readonly JSDocParameterTag[] {
    if (param.name) {
        if (isIdentifier(param.name)) {
            const name = param.name.text;
            return getJSDocTagsWorker(param.parent, noCache).filter((tag): tag is JSDocParameterTag => isJSDocParameterTag(tag) && isIdentifier(tag.name) && tag.name.text === name);
        }
        else {
            const i = param.parent.parameters.indexOf(param);
            Debug.assert(i > -1, "Parameters should always be in their parents' parameter list");
            const paramTags = getJSDocTagsWorker(param.parent, noCache).filter(isJSDocParameterTag);
            if (i < paramTags.length) {
                return [paramTags[i]];
            }
        }
    }
    // return empty array for: out-of-order binding patterns and JSDoc function syntax, which has un-named parameters
    return emptyArray;
}

/** @internal */
export function getJSDocParameterTagsNoCache(param: ParameterDeclaration): readonly JSDocParameterTag[] {
    return getJSDocParameterTagsWorker(param, /*noCache*/ true);
}

function getJSDocTypeParameterTagsWorker(param: TypeParameterDeclaration, noCache?: boolean): readonly JSDocTemplateTag[] {
    const name = param.name.text;
    return getJSDocTagsWorker(param.parent, noCache).filter((tag): tag is JSDocTemplateTag => isJSDocTemplateTag(tag) && tag.typeParameters.some(tp => tp.name.text === name));
}


/**
 * Gets the JSDoc parameter tags for the node if present.
 *
 * @remarks Returns any JSDoc param tag whose name matches the provided
 * parameter, whether a param tag on a containing function
 * expression, or a param tag on a variable declaration whose
 * initializer is the containing function. The tags closest to the
 * node are returned first, so in the previous example, the param
 * tag on the containing function expression would be first.
 *
 * For binding patterns, parameter tags are matched by position.
 */
export function getJSDocParameterTags(param: ParameterDeclaration): readonly JSDocParameterTag[] {
    return getJSDocParameterTagsWorker(param, /*noCache*/ false);
}

/** @internal */
export function getJSDocTypeParameterTagsNoCache(param: TypeParameterDeclaration): readonly JSDocTemplateTag[] {
    return getJSDocTypeParameterTagsWorker(param, /*noCache*/ true);
}


/**
 * Gets the JSDoc type parameter tags for the node if present.
 *
 * @remarks Returns any JSDoc template tag whose names match the provided
 * parameter, whether a template tag on a containing function
 * expression, or a template tag on a variable declaration whose
 * initializer is the containing function. The tags closest to the
 * node are returned first, so in the previous example, the template
 * tag on the containing function expression would be first.
 */
export function getJSDocTypeParameterTags(param: TypeParameterDeclaration): readonly JSDocTemplateTag[] {
    return getJSDocTypeParameterTagsWorker(param, /*noCache*/ false);
}

/** @internal */
export function textRangeContainsPositionInclusive(span: TextRange, position: number): boolean {
    return position >= span.pos && position <= span.end;
}

/** @internal */
export function isDeclaration(node: Node): node is NamedDeclaration {
    if (node.kind === SyntaxKind.TypeParameter) {
        return (node.parent && node.parent.kind !== SyntaxKind.JSDocTemplateTag);// || isInJSFile(node);
    }

    return isDeclarationKind(node.kind);
}

/** @internal */
export function isGetOrSetAccessorDeclaration(node: Node) {
    return false;// return node.kind === SyntaxKind.SetAccessor || node.kind === SyntaxKind.GetAccessor;
}

export function isEntityName(node: Node): node is EntityName {
    const kind = node.kind;
    return kind === SyntaxKind.QualifiedName
        || kind === SyntaxKind.Identifier;
}

export function getCombinedModifierFlags(node: Declaration): ModifierFlags {
    return getCombinedFlags(node, getEffectiveModifierFlags);
}

/** @internal */
export function isPrivateIdentifierClassElementDeclaration(node: Node) {//: node is PrivateClassElementDeclaration {
    return false;
    //return (isPropertyDeclaration(node) || isMethodOrAccessor(node)) && isPrivateIdentifier(node.name);
}


/**
 * Gets the type node for the node if provided via JSDoc.
 *
 * @remarks The search includes any JSDoc param tag that relates
 * to the provided parameter, for example a type tag on the
 * parameter itself, or a param tag on a containing function
 * expression, or a param tag on a variable declaration whose
 * initializer is the containing function. The tags closest to the
 * node are examined first, so in the previous example, the type
 * tag directly on the node would be returned.
 */
export function getJSDocType(node: Node): TypeNode | undefined {
    let tag: JSDocTypeTag | JSDocParameterTag | undefined = getFirstJSDocTag(node, isJSDocTypeTag);
    if (!tag && isParameter(node)) {
        tag = find(getJSDocParameterTags(node), tag => !!tag.typeExpression);
    }

    return tag && tag.typeExpression && tag.typeExpression.type;
}

/** True if has initializer node attached to it. */
export function hasOnlyExpressionInitializer(node: Node): node is HasExpressionInitializer {
    switch (node.kind) {
        case SyntaxKind.VariableDeclaration:
        case SyntaxKind.Parameter:
        case SyntaxKind.BindingElement:
        case SyntaxKind.PropertyDeclaration:
        case SyntaxKind.PropertyAssignment:
        //case SyntaxKind.EnumMember:
            return true;
        default:
            return false;
    }
}

export function isJSDocPropertyLikeTag(node: Node): node is JSDocPropertyLikeTag {
    return node.kind === SyntaxKind.JSDocPropertyTag || node.kind === SyntaxKind.JSDocParameterTag;
}


/**
 * Gets the effective type parameters. If the node was parsed in a
 * JavaScript file, gets the type parameters from the `@template` tag from JSDoc.
 *
 * This does *not* return type parameters from a jsdoc reference to a generic type, eg
 *
 * type Id = <T>(x: T) => T
 * /** @type {Id} /
 * function id(x) { return x }
 */
export function getEffectiveTypeParameterDeclarations(node: any): readonly TypeParameterDeclaration[] { // TODO DeclarationWithTypeParameters): readonly TypeParameterDeclaration[] {
    return emptyArray;
    // if (isJSDocSignature(node)) {
    //     if (isJSDocOverloadTag(node.parent)) {
    //         const jsDoc = getJSDocRoot(node.parent);
    //         if (jsDoc && length(jsDoc.tags)) {
    //             return flatMap(jsDoc.tags, tag => isJSDocTemplateTag(tag) ? tag.typeParameters : undefined);
    //         }
    //     }
    //     return emptyArray;
    // }
    // if (isJSDocTypeAlias(node)) {
    //     Debug.assert(node.parent.kind === SyntaxKind.JSDoc);
    //     return flatMap(node.parent.tags, tag => isJSDocTemplateTag(tag) ? tag.typeParameters : undefined);
    // }
    // if (node.typeParameters) {
    //     return node.typeParameters;
    // }
    // if (canHaveIllegalTypeParameters(node) && node.typeParameters) {
    //     return node.typeParameters;
    // }
    // if (isInJSFile(node)) {
    //     const decls = getJSDocTypeParameterDeclarations(node);
    //     if (decls.length) {
    //         return decls;
    //     }
    //     const typeTag = getJSDocType(node);
    //     if (typeTag && isFunctionTypeNode(typeTag) && typeTag.typeParameters) {
    //         return typeTag.typeParameters;
    //     }
    // }
    // return emptyArray;
}

/** Gets the JSDoc augments tag for the node if present */
export function getJSDocAugmentsTag(node: Node) {//: JSDocAugmentsTag | undefined {
    return undefined;
    //return getFirstJSDocTag(node, isJSDocAugmentsTag);
}


export function getEffectiveConstraintOfTypeParameter(node: TypeParameterDeclaration): TypeNode | undefined {
    return node.constraint ? node.constraint :
        isJSDocTemplateTag(node.parent) && node === (node.parent as JSDocTemplateTag).typeParameters[0] ? (node.parent as JSDocTemplateTag).constraint :
        undefined;
}

export function isPropertyName(node: Node): node is PropertyName {
    const kind = node.kind;
    return kind === SyntaxKind.Identifier
        || kind === SyntaxKind.PrivateIdentifier
        || kind === SyntaxKind.StringLiteral
        || kind === SyntaxKind.IntLiteral        
        || kind === SyntaxKind.ComputedPropertyName;
}

export function isCallOrNewExpression(node: Node): node is CallExpression | NewExpression {
    return node.kind === SyntaxKind.CallExpression || node.kind === SyntaxKind.NewExpression;
}

export function isAssertionExpression(node: Node) {//: node is ssertionExpression {
    return false;
    // const kind = node.kind;
    // return kind === SyntaxKind.TypeAssertionExpression
    //     || kind === SyntaxKind.AsExpression;
}

/** @internal */
export function isTypeReferenceType(node: Node): node is TypeReferenceType {
    return node.kind === SyntaxKind.TypeReference || node.kind === SyntaxKind.ExpressionWithTypeArguments;
}

/** @internal */
export function isFunctionOrModuleBlock(node: Node): boolean {
    return isSourceFile(node) || isModuleBlock(node) || isBlock(node) && isFunctionLike(node.parent);
}

export function getJSDocSatisfiesTag(node: Node) {//: JSDocSatisfiesTag | undefined {
    return false;//return getFirstJSDocTag(node, isJSDocSatisfiesTag);
}

export function isAccessor(node: Node) {//: node is AccessorDeclaration {
    return false;//return node && (node.kind === SyntaxKind.GetAccessor || node.kind === SyntaxKind.SetAccessor);
}

/**
 * If the text of an Identifier matches a keyword (including contextual and TypeScript-specific keywords), returns the
 * SyntaxKind for the matching keyword.
 */
export function identifierToKeywordKind(node: Identifier): KeywordSyntaxKind | undefined {
    const token = stringToToken(node.text as string);
    return token ? tryCast(token, isKeyword) : undefined;
}
