import { ArrayBindingElement, AssignmentDeclarationKind, BinaryExpression, BindingPattern, Block, CallExpression, CallLikeExpression, canHaveJSDoc, Debug, Declaration, DeclarationName, emptyArray, Expression, find, flatMap, ForEachStatement, FunctionLikeDeclaration, getAssignmentDeclarationKind, getJSDocCommentsAndTags, HasLocals, HasModifiers, hasProperty, Identifier, isBinaryExpression, isBlock, isFunctionBlock, isFunctionExpression, isIdentifier, isInlineClosureExpression, isJSDoc, isJSDocDeprecatedTag, isSourceFile, isTypeNodeKind, isVariableDeclaration, IterationStatement, JSDocDeprecatedTag, JSDocTag, LeftHandSideExpression, NamedDeclaration, Node, NodeArray, NodeFlags, OuterExpressionKinds, ParameterDeclaration, SignatureDeclaration, skipOuterExpressions, Statement, Symbol, SyntaxKind, TypeNode } from "./_namespaces/lpc";

/** @internal */
export function isNodeArray<T extends Node>(array: readonly T[]): array is NodeArray<T> {
    return hasProperty(array, "pos") && hasProperty(array, "end");
}

export function symbolName(symbol: Symbol): string {    
    return symbol.name;
}

export function idText(identifierOrPrivateName: Identifier): string {
    return (identifierOrPrivateName.text);
}

/**
 * Gets a value indicating whether a node originated in the parse tree.
 *
 * @param node The node to test.
 */
export function isParseTreeNode(node: Node): boolean {
    return (node.flags & NodeFlags.Synthesized) === 0;
}

export function canHaveModifiers(node: Node): node is HasModifiers {
    const kind = node.kind;
    return kind === SyntaxKind.TypeParameter
        || kind === SyntaxKind.Parameter
        // || kind === SyntaxKind.PropertySignature
        // || kind === SyntaxKind.PropertyDeclaration
        // || kind === SyntaxKind.MethodSignature
        // || kind === SyntaxKind.MethodDeclaration
        // || kind === SyntaxKind.Constructor
        // || kind === SyntaxKind.GetAccessor
        // || kind === SyntaxKind.SetAccessor
        // || kind === SyntaxKind.IndexSignature
        // || kind === SyntaxKind.ConstructorType
        || kind === SyntaxKind.FunctionExpression
        || kind === SyntaxKind.VariableStatement
        || kind === SyntaxKind.FunctionDeclaration
        // || kind === SyntaxKind.ArrowFunction
        // || kind === SyntaxKind.ClassExpression
        // || kind === SyntaxKind.ClassDeclaration
        // || kind === SyntaxKind.InterfaceDeclaration
        // || kind === SyntaxKind.TypeAliasDeclaration
        // || kind === SyntaxKind.EnumDeclaration
        // || kind === SyntaxKind.ModuleDeclaration
        // || kind === SyntaxKind.ImportEqualsDeclaration
        // || kind === SyntaxKind.ImportDeclaration
        // || kind === SyntaxKind.ExportAssignment
        // || kind === SyntaxKind.ExportDeclaration;
        ;
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

export function isFunctionLike(node: Node | undefined): node is SignatureDeclaration {
    return !!node && isFunctionLikeKind(node.kind);
}

function isFunctionLikeDeclarationKind(kind: SyntaxKind): boolean {
    switch (kind) {
        case SyntaxKind.FunctionDeclaration:
        // case SyntaxKind.MethodDeclaration:
        // case SyntaxKind.Constructor:
        // case SyntaxKind.GetAccessor:
        // case SyntaxKind.SetAccessor:
        case SyntaxKind.FunctionExpression:
        // case SyntaxKind.ArrowFunction:
            return true;
        default:
            return false;
    }
}

/** @internal */
export function isFunctionLikeKind(kind: SyntaxKind): boolean {
    switch (kind) {
        // case SyntaxKind.MethodSignature:
        // case SyntaxKind.CallSignature:
        case SyntaxKind.JSDocSignature:
        // case SyntaxKind.ConstructSignature:
        // case SyntaxKind.IndexSignature:
        // case SyntaxKind.FunctionType:
        case SyntaxKind.JSDocFunctionType:
        // case SyntaxKind.ConstructorType:
            return true;
        default:
            return isFunctionLikeDeclarationKind(kind);
    }
}

function getCombinedFlags(node: Node, getFlags: (n: Node) => number): number {
    // if (isBindingElement(node)) {
    //     node = walkUpBindingElementsAndPatterns(node);
    // }
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

/** @internal */
export function canHaveLocals(node: Node): node is HasLocals {
    switch (node.kind) {
        case SyntaxKind.Block:
        case SyntaxKind.InlineClosureExpression: 
        // case SyntaxKind.CallSignature:
        case SyntaxKind.CaseBlock:
        case SyntaxKind.CatchClause:
        // case SyntaxKind.ClassStaticBlockDeclaration:
        // case SyntaxKind.ConditionalType:
        // case SyntaxKind.Constructor:
        // case SyntaxKind.ConstructorType:
        // case SyntaxKind.ConstructSignature:
        case SyntaxKind.ForStatement:        
        case SyntaxKind.ForEachStatement:
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
        // case SyntaxKind.FunctionType:
        // case SyntaxKind.GetAccessor:
        // case SyntaxKind.IndexSignature:
        case SyntaxKind.JSDocCallbackTag:
        case SyntaxKind.JSDocEnumTag:
        case SyntaxKind.JSDocFunctionType:
        case SyntaxKind.JSDocSignature:
        case SyntaxKind.JSDocTypedefTag:
        // case SyntaxKind.MappedType:
        // case SyntaxKind.MethodDeclaration:
        // case SyntaxKind.MethodSignature:
        // case SyntaxKind.ModuleDeclaration:
        // case SyntaxKind.SetAccessor:
        case SyntaxKind.SourceFile:
        // case SyntaxKind.TypeAliasDeclaration:
            return true;
        default:
            return false;
    }
}

/** @internal */
export function isNamedDeclaration(node: Node): node is NamedDeclaration & { name: DeclarationName; } {
    return !!(node as NamedDeclaration).name; // A 'name' property should always be a DeclarationName.
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
                // case AssignmentDeclarationKind.ExportsProperty:
                // case AssignmentDeclarationKind.ThisProperty:
                // case AssignmentDeclarationKind.Property:
                // case AssignmentDeclarationKind.PrototypeProperty:
                //     return getElementOrPropertyAccessArgumentExpressionOrName((expr as BinaryExpression).left as AccessExpression);
                // case AssignmentDeclarationKind.ObjectDefinePropertyValue:
                // case AssignmentDeclarationKind.ObjectDefinePropertyExports:
                // case AssignmentDeclarationKind.ObjectDefinePrototypeProperty:
                //     return (expr as BindableObjectDefinePropertyCall).arguments[1];
                default:
                    return undefined;
            }
        }
        // case SyntaxKind.JSDocTypedefTag:
        //     return getNameOfJSDocTypedef(declaration as JSDocTypedefTag);
        // case SyntaxKind.JSDocEnumTag:
        //     return nameForNamelessJSDocTypedef(declaration as JSDocEnumTag);
        // case SyntaxKind.ExportAssignment: {
        //     const { expression } = declaration as ExportAssignment;
        //     return isIdentifier(expression) ? expression : undefined;
        // }
        // case SyntaxKind.ElementAccessExpression:
        //     const expr = declaration as ElementAccessExpression;
        //     if (isBindableStaticElementAccessExpression(expr)) {
        //         return expr.argumentExpression;
        //     }
    }
    return (declaration as NamedDeclaration).name;
}

/** @internal */
export function getAssignedName(node: Node): DeclarationName | undefined {
    if (!node.parent) {
        return undefined;
    }
    // else if (isPropertyAssignment(node.parent) || isBindingElement(node.parent)) {
    //     return node.parent.name;
    // }
    else if (isBinaryExpression(node.parent) && node === node.parent.right) {
        if (isIdentifier(node.parent.left)) {
            return node.parent.left;
        }
        // else if (isAccessExpression(node.parent.left)) {
        //     return getElementOrPropertyAccessArgumentExpressionOrName(node.parent.left);
        // }
    }
    else if (isVariableDeclaration(node.parent) && isIdentifier(node.parent.name)) {
        return node.parent.name;
    }
}


export function getNameOfDeclaration(declaration: Declaration | Expression | undefined): DeclarationName | undefined {
    if (declaration === undefined) return undefined;
    return getNonAssignedNameOfDeclaration(declaration) ||
        (isFunctionExpression(declaration) || isInlineClosureExpression(declaration) /*|| isClassExpression(declaration)*/ ? getAssignedName(declaration) : undefined);
}

/** @internal */
export function isForEachStatement(node: Node): node is ForEachStatement {
    return node.kind === SyntaxKind.ForEachStatement;
}

export function skipPartiallyEmittedExpressions(node: Expression): Expression;
export function skipPartiallyEmittedExpressions(node: Node): Node;
export function skipPartiallyEmittedExpressions(node: Node) {
    return skipOuterExpressions(node, OuterExpressionKinds.PartiallyEmittedExpressions);
}


export function isLeftHandSideExpression(node: Node): node is LeftHandSideExpression {
    return isLeftHandSideExpressionKind(skipPartiallyEmittedExpressions(node).kind);
}

function isLeftHandSideExpressionKind(kind: SyntaxKind): boolean {
    switch (kind) {
        case SyntaxKind.PropertyAccessExpression:
        // case SyntaxKind.ElementAccessExpression:
        case SyntaxKind.NewExpression:
        case SyntaxKind.CallExpression:        
        // case SyntaxKind.TaggedTemplateExpression:
        case SyntaxKind.ArrayLiteralExpression:
        case SyntaxKind.ParenthesizedExpression:
        // case SyntaxKind.ObjectLiteralExpression:
        // case SyntaxKind.ClassExpression:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.Identifier:
        //case SyntaxKind.PrivateIdentifier: // technically this is only an Expression if it's in a `#field in expr` BinaryExpression
        //case SyntaxKind.RegularExpressionLiteral:
        case SyntaxKind.IntLiteral:
        case SyntaxKind.FloatLiteral:
        case SyntaxKind.StringLiteral:
        // case SyntaxKind.NoSubstitutionTemplateLiteral:
        // case SyntaxKind.TemplateExpression:
        // case SyntaxKind.FalseKeyword:
        // case SyntaxKind.NullKeyword:
        // case SyntaxKind.ThisKeyword:
        // case SyntaxKind.TrueKeyword:
        case SyntaxKind.SuperKeyword:
        // case SyntaxKind.NonNullExpression:
        // case SyntaxKind.ExpressionWithTypeArguments:
        // case SyntaxKind.MetaProperty:
        // case SyntaxKind.ImportKeyword: // technically this is only an Expression if it's in a CallExpression
        // case SyntaxKind.MissingDeclaration:
            return true;
        default:
            return false;
    }
}

export function isCallOrNewExpression(node: Node): node is CallExpression /*| NewExpression*/ {
    return node.kind === SyntaxKind.CallExpression || node.kind === SyntaxKind.NewExpression;
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

export function isCallLikeExpression(node: Node): node is CallLikeExpression {
    switch (node.kind) {        
        case SyntaxKind.CallExpression:
        case SyntaxKind.NewExpression:        
            return true;
        default:
            return false;
    }
}

export function isIterationStatement(node: Node, lookInLabeledStatements: false): node is IterationStatement;
export function isIterationStatement(node: Node, lookInLabeledStatements: boolean): node is IterationStatement ;//| LabeledStatement;
export function isIterationStatement(node: Node, lookInLabeledStatements: boolean): node is IterationStatement {
    switch (node.kind) {
        case SyntaxKind.ForStatement:
        case SyntaxKind.ForEachStatement:        
        case SyntaxKind.DoWhileStatement:
        case SyntaxKind.WhileStatement:
            return true;
        // case SyntaxKind.LabeledStatement:
        //     return lookInLabeledStatements && isIterationStatement((node as LabeledStatement).statement, lookInLabeledStatements);
    }

    return false;
}

function isDeclarationKind(kind: SyntaxKind) {
    return kind === SyntaxKind.InlineClosureExpression
        || kind === SyntaxKind.BindingElement
        //|| kind === SyntaxKind.ClassDeclaration
        || kind === SyntaxKind.ClassExpression        
        // || kind === SyntaxKind.ExportSpecifier
        || kind === SyntaxKind.FunctionDeclaration
        || kind === SyntaxKind.FunctionExpression        
        // || kind === SyntaxKind.ImportClause        
        // || kind === SyntaxKind.MethodDeclaration
        // || kind === SyntaxKind.MethodSignature        
        || kind === SyntaxKind.Parameter
        || kind === SyntaxKind.PropertyAssignment
        || kind === SyntaxKind.PropertyDeclaration
        // || kind === SyntaxKind.PropertySignature        
        || kind === SyntaxKind.ShorthandPropertyAssignment        
        || kind === SyntaxKind.TypeParameter
        || kind === SyntaxKind.VariableDeclaration
        || kind === SyntaxKind.JSDocTypedefTag
        || kind === SyntaxKind.JSDocCallbackTag
        || kind === SyntaxKind.JSDocPropertyTag;
}

/** @internal */
export function isDeclaration(node: Node): node is NamedDeclaration {
    if (node.kind === SyntaxKind.TypeParameter) {
        return (node.parent && node.parent.kind !== SyntaxKind.JSDocTemplateTag);
    }

    return isDeclarationKind(node.kind);
}

/** @internal */
export function isBindingPattern(node: Node | undefined): node is BindingPattern {
    if (node) {
        const kind = node.kind;
        return kind === SyntaxKind.ArrayBindingPattern;
            //|| kind === SyntaxKind.ObjectBindingPattern;
    }

    return false;
}

export function isArrayBindingElement(node: Node): node is ArrayBindingElement {
    const kind = node.kind;
    return kind === SyntaxKind.BindingElement;
}

/** @internal */
export function canHaveSymbol(node: Node): node is Declaration {
    // NOTE: This should cover all possible declarations except MissingDeclaration and SemicolonClassElement
    //       since they aren't actually declarations and can't have a symbol.
    switch (node.kind) {
        case SyntaxKind.InlineClosureExpression:
        case SyntaxKind.BinaryExpression:
        case SyntaxKind.BindingElement:
        case SyntaxKind.CallExpression:
        // case SyntaxKind.CallSignature:
        // case SyntaxKind.ClassDeclaration:
        case SyntaxKind.ClassExpression:        
        case SyntaxKind.ElementAccessExpression:                
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
        //case SyntaxKind.FunctionType:        
        case SyntaxKind.Identifier:
        //case SyntaxKind.ImportClause:        
        case SyntaxKind.IndexSignature:        
        case SyntaxKind.JSDocCallbackTag:
        case SyntaxKind.JSDocEnumTag:
        case SyntaxKind.JSDocFunctionType:
        case SyntaxKind.JSDocParameterTag:
        case SyntaxKind.JSDocPropertyTag:
        case SyntaxKind.JSDocSignature:
        case SyntaxKind.JSDocTypedefTag:
        case SyntaxKind.JSDocTypeLiteral:    
        //case SyntaxKind.MappedType:
        // case SyntaxKind.MethodDeclaration:
        // case SyntaxKind.MethodSignature:        
        case SyntaxKind.NewExpression:        
        case SyntaxKind.IntLiteral:
        case SyntaxKind.FloatLiteral:
        case SyntaxKind.ObjectLiteralExpression:
        case SyntaxKind.Parameter:
        case SyntaxKind.PropertyAccessExpression:
        case SyntaxKind.PropertyAssignment:
        case SyntaxKind.PropertyDeclaration:
        // case SyntaxKind.PropertySignature:        
        case SyntaxKind.ShorthandPropertyAssignment:
        case SyntaxKind.SourceFile:
        // case SyntaxKind.SpreadAssignment:
        case SyntaxKind.StringLiteral:        
        case SyntaxKind.TypeLiteral:
        case SyntaxKind.TypeParameter:
        case SyntaxKind.VariableDeclaration:
            return true;
        default:
            return false;
    }
}

/** @internal */
export function isFunctionOrModuleBlock(node: Node): boolean {
    return isSourceFile(node) /*|| isModuleBlock(node)*/ || isBlock(node) && isFunctionLike(node.parent);
}

function isDeclarationStatementKind(kind: SyntaxKind) {
    return kind === SyntaxKind.FunctionDeclaration
        // || kind === SyntaxKind.MissingDeclaration
        // || kind === SyntaxKind.ClassDeclaration
        // || kind === SyntaxKind.InterfaceDeclaration
        // || kind === SyntaxKind.TypeAliasDeclaration
        // || kind === SyntaxKind.EnumDeclaration
        // || kind === SyntaxKind.ModuleDeclaration
        // || kind === SyntaxKind.ImportDeclaration
        // || kind === SyntaxKind.ImportEqualsDeclaration
        // || kind === SyntaxKind.ExportDeclaration
        // || kind === SyntaxKind.ExportAssignment
        // || kind === SyntaxKind.NamespaceExportDeclaration;
        ;
}

function isBlockStatement(node: Node): node is Block {
    if (node.kind !== SyntaxKind.Block) return false;
    if (node.parent !== undefined) {
        if (/*node.parent.kind === SyntaxKind.TryStatement ||*/ node.parent.kind === SyntaxKind.CatchClause) {
            return false;
        }
    }
    return !isFunctionBlock(node);
}

function isStatementKindButNotDeclarationKind(kind: SyntaxKind) {
    return kind === SyntaxKind.BreakStatement
        || kind === SyntaxKind.ContinueStatement
        //|| kind === SyntaxKind.DebuggerStatement
        || kind === SyntaxKind.DoWhileStatement
        || kind === SyntaxKind.ExpressionStatement
        || kind === SyntaxKind.EmptyStatement
        || kind === SyntaxKind.ForEachStatement        
        || kind === SyntaxKind.ForStatement
        || kind === SyntaxKind.IfStatement
        //|| kind === SyntaxKind.LabeledStatement
        || kind === SyntaxKind.ReturnStatement
        || kind === SyntaxKind.SwitchStatement        
        || kind === SyntaxKind.VariableStatement
        || kind === SyntaxKind.WhileStatement        
        || kind === SyntaxKind.NotEmittedStatement;
}

export function isStatement(node: Node): node is Statement {
    const kind = node.kind;
    return isStatementKindButNotDeclarationKind(kind)
        || isDeclarationStatementKind(kind)
        || isBlockStatement(node);
}

