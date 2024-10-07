import { ArrayBindingElement, AssertionExpression, AssignmentDeclarationKind, BinaryExpression, BindingElement, BindingPattern, Block, BreakOrContinueStatement, CallChain, CallExpression, CallLikeExpression, canHaveJSDoc, ClassElement, compareDiagnostics, CompilerOptions, ConciseBody, Debug, Declaration, DeclarationName, Diagnostic, diagnosticsEqualityComparer, emptyArray, EntityName, Expression, FileReference, find, flatMap, ForEachStatement, FunctionExpression, FunctionLikeDeclaration, GeneratedIdentifier, getAssignmentDeclarationKind, getDriverType, getEffectiveModifierFlags, getEffectiveModifierFlagsAlwaysIncludeJSDoc, getJSDocCommentsAndTags, HasExpressionInitializer, HasInitializer, HasLocals, HasModifiers, hasProperty, HasType, Identifier, isBinaryExpression, isBindingElement, isBlock, isCallExpression, isFunctionBlock, isFunctionExpression, isFunctionExpressionOrArrowFunction, isIdentifier, isInlineClosureExpression, isJSDoc, isJSDocDeprecatedTag, isJSDocParameterTag, isJSDocSignature, isJSDocTemplateTag, isJSDocTypeTag, isKeyword, isParameter, isRootedDiskPath, isSourceFile, isTypeNodeKind, isVariableDeclaration, isWhiteSpaceLike, IterationStatement, JSDocDeprecatedTag, JSDocParameterTag, JSDocPropertyLikeTag, JSDocSignature, JSDocTag, JSDocTemplateTag, JSDocTypeTag, KeywordSyntaxKind, LanguageVariant, lastOrUndefined, LeftHandSideExpression, LiteralExpression, LiteralToken, MemberName, Modifier, ModifierFlags, modifierToFlag, NamedDeclaration, Node, NodeArray, NodeFlags, OuterExpressionKinds, ParameterDeclaration, pathIsRelative, PropertyAccessExpression, PropertyName, QualifiedName, SignatureDeclaration, skipOuterExpressions, sortAndDeduplicate, SortedReadonlyArray, Statement, StringLiteral, StringLiteralLike, stringToToken, Symbol, SyntaxKind, TextChangeRange, TextRange, TextSpan, tryCast, TypeElement, TypeNode, TypeParameterDeclaration, UnaryExpression, VariableDeclaration } from "./_namespaces/lpc.js";

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
        case SyntaxKind.CloneObjectExpression:             
        // case SyntaxKind.TaggedTemplateExpression:
        case SyntaxKind.ArrayLiteralExpression:
        case SyntaxKind.ParenthesizedExpression:
        case SyntaxKind.InlineClosureExpression:
        case SyntaxKind.ObjectLiteralExpression:
        case SyntaxKind.NewStructExpression:
        case SyntaxKind.ClassExpression:
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
        case SyntaxKind.MissingDeclaration:
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
        case SyntaxKind.CloneObjectExpression:
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

export function getCombinedModifierFlags(node: Declaration): ModifierFlags {
    return getCombinedFlags(node, getEffectiveModifierFlags);
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
        //case SyntaxKind.YieldExpression:
        case SyntaxKind.InlineClosureExpression:
        case SyntaxKind.BinaryExpression:
        case SyntaxKind.SpreadElement:        
        case SyntaxKind.CommaListExpression:
        case SyntaxKind.PartiallyEmittedExpression:        
            return true;
        default:
            return isUnaryExpressionKind(kind);
    }
}


/** @internal */
export function isUnaryExpression(node: Node): node is UnaryExpression {
    return isUnaryExpressionKind(skipPartiallyEmittedExpressions(node).kind);
}

function isUnaryExpressionKind(kind: SyntaxKind): boolean {
    switch (kind) {
        case SyntaxKind.PrefixUnaryExpression:
        case SyntaxKind.PostfixUnaryExpression:        
        //case SyntaxKind.AwaitExpression:    
            return true;
        default:
            return isLeftHandSideExpressionKind(kind);
    }
}

/**
 * If the text of an Identifier matches a keyword (including contextual and TypeScript-specific keywords), returns the
 * SyntaxKind for the matching keyword.
 */
export function identifierToKeywordKind(node: Identifier): KeywordSyntaxKind | undefined {
    const token = stringToToken(node.text as string);
    return token ? tryCast(token, isKeyword) : undefined;
}

/**
 * True if node is of some token syntax kind.
 * For example, this is true for an IfKeyword but not for an IfStatement.
 * Literals are considered tokens, except TemplateLiteral, but does include TemplateHead/Middle/Tail.
 */
export function isToken(n: Node): boolean {
    return isTokenKind(n.kind);
}


/**
 * True if kind is of some token syntax kind.
 * For example, this is true for an IfKeyword but not for an IfStatement.
 * Literals are considered tokens, except TemplateLiteral, but does include TemplateHead/Middle/Tail.
 */
export function isTokenKind(kind: SyntaxKind): boolean {
    return kind >= SyntaxKind.FirstToken && kind <= SyntaxKind.LastToken;
}

/** True if node is of a kind that may contain comment text. */
export function isJSDocCommentContainingNode(node: Node): boolean {
    return node.kind === SyntaxKind.JSDoc
        || node.kind === SyntaxKind.JSDocNamepathType
        || node.kind === SyntaxKind.JSDocText
        // TODO
        // || isJSDocLinkLike(node)
        // || isJSDocTag(node)
        // || isJSDocTypeLiteral(node)
        || isJSDocSignature(node);
}


/** @internal */
export function isNodeKind(kind: SyntaxKind) {
    return kind >= SyntaxKind.FirstNode;
}

export function isMemberName(node: Node): node is MemberName {
    return node.kind === SyntaxKind.Identifier;// || node.kind === SyntaxKind.PrivateIdentifier;
}

export function textSpanEnd(span: TextSpan) {
    return span.start + span.length;
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

/**
 * True if has initializer node attached to it.
 *
 * @internal
 */
export function hasInitializer(node: Node): node is HasInitializer {
    return !!(node as HasInitializer).initializer;
}

export function isBreakOrContinueStatement(node: Node): node is BreakOrContinueStatement {
    return node.kind === SyntaxKind.BreakStatement || node.kind === SyntaxKind.ContinueStatement;
}

export function isEntityName(node: Node): node is EntityName {
    const kind = node.kind;
    return kind === SyntaxKind.Identifier;
}

export function isCallChain(node: Node): node is CallChain {
    return false;// no optional chains return isCallExpression(node) && !!(node.flags & NodeFlags.OptionalChain);
}

export function isPropertyName(node: Node): node is PropertyName {
    const kind = node.kind;
    return kind === SyntaxKind.Identifier
        // || kind === SyntaxKind.PrivateIdentifier
        || kind === SyntaxKind.StringLiteral
        || kind === SyntaxKind.IntLiteral
        || kind === SyntaxKind.ComputedPropertyName;
}


/** @internal */
export function isLiteralExpressionOfObject(node: Node) {
    switch (node.kind) {
        case SyntaxKind.ObjectLiteralExpression:
        case SyntaxKind.ArrayLiteralExpression:
        //case SyntaxKind.RegularExpressionLiteral:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.ClassExpression:
            return true;
    }
    return false;
}

export function isPropertyAccessOrQualifiedName(node: Node): node is PropertyAccessExpression | QualifiedName {
    const kind = node.kind;
    return kind === SyntaxKind.PropertyAccessExpression
        || kind === SyntaxKind.QualifiedName;
}

/** @internal */
export function textRangeContainsPositionInclusive(range: TextRange, position: number): boolean {
    return position >= range.pos && position <= range.end;
}


/** @internal */
export function isLiteralKind(kind: SyntaxKind): kind is LiteralToken["kind"] {
    return SyntaxKind.FirstLiteralToken <= kind && kind <= SyntaxKind.LastLiteralToken;
}

const MAX_SMI_X86 = 0x3fff_ffff;
/** @internal */
export function guessIndentation(lines: string[]) {
    let indentation = MAX_SMI_X86;
    for (const line of lines) {
        if (!line.length) {
            continue;
        }
        let i = 0;
        for (; i < line.length && i < indentation; i++) {
            if (!isWhiteSpaceLike(line.charCodeAt(i))) {
                break;
            }
        }
        if (i < indentation) {
            indentation = i;
        }
        if (indentation === 0) {
            return 0;
        }
    }
    return indentation === MAX_SMI_X86 ? undefined : indentation;
}

export function getOriginalNode(node: Node): Node;
export function getOriginalNode<T extends Node>(node: Node, nodeTest: (node: Node) => node is T): T;
export function getOriginalNode(node: Node | undefined): Node | undefined;
export function getOriginalNode<T extends Node>(node: Node | undefined, nodeTest: (node: Node) => node is T): T | undefined;
export function getOriginalNode<T extends Node>(node: Node | undefined, nodeTest?: (node: Node) => node is T): T | undefined {
    if (node) {
        while (node.original !== undefined) {
            node = node.original;
        }
    }

    if (!node || !nodeTest) {
        return node as T | undefined;
    }

    return nodeTest(node) ? node : undefined;
}

export function isLiteralExpression(node: Node): node is LiteralExpression {
    return isLiteralKind(node.kind);
}

/** True if has initializer node attached to it. */
export function hasOnlyExpressionInitializer(node: Node): node is HasExpressionInitializer {
    switch (node.kind) {
        case SyntaxKind.VariableDeclaration:
        case SyntaxKind.Parameter:
        case SyntaxKind.BindingElement:
        case SyntaxKind.PropertyDeclaration:
        case SyntaxKind.PropertyAssignment:        
            return true;
        default:
            return false;
    }
}

export function hasRestParameter(s: SignatureDeclaration | JSDocSignature): boolean {
    const last = lastOrUndefined<ParameterDeclaration | JSDocParameterTag>(s.parameters);
    return !!last && isRestParameter(last);
}

export function isRestParameter(node: ParameterDeclaration | JSDocParameterTag): boolean {
    const type = isJSDocParameterTag(node) ? (node.typeExpression && node.typeExpression.type) : node.type;
    return (node as ParameterDeclaration).dotDotDotToken !== undefined || 
        (!!type && type.kind === SyntaxKind.JSDocVariadicType) ||
        !!(getEffectiveModifierFlags((node as ParameterDeclaration)) & ModifierFlags.VarArgs);
}

export function walkUpBindingElementsAndPatterns(binding: BindingElement): VariableDeclaration | ParameterDeclaration {
    let node = binding.parent;
    while (isBindingElement(node.parent)) {
        node = node.parent.parent;
    }
    return node.parent;
}

export function isClassLike(node: Node) {//}: node is ClassLikeDeclaration {
    return false;//return node && (node.kind === SyntaxKind.ClassDeclaration || node.kind === SyntaxKind.ClassExpression);
}

export function isConciseBody(node: Node): node is ConciseBody {
    return isBlock(node)
        || isExpression(node);
}

/** @internal */
export function isGeneratedIdentifier(node: Node): node is GeneratedIdentifier {
    return isIdentifier(node) && node.emitNode?.autoGenerate !== undefined;
}

export function createTextChangeRange(span: TextSpan, newLength: number): TextChangeRange {
    if (newLength < 0) {
        throw new Error("newLength < 0");
    }

    return { span, newLength };
}

export const unchangedTextChangeRange = createTextChangeRange(createTextSpan(0, 0), 0);

/**
 * Called to merge all the changes that occurred across several versions of a script snapshot
 * into a single change.  i.e. if a user keeps making successive edits to a script we will
 * have a text change from V1 to V2, V2 to V3, ..., Vn.
 *
 * This function will then merge those changes into a single change range valid between V1 and
 * Vn.
 */
export function collapseTextChangeRangesAcrossMultipleVersions(changes: readonly TextChangeRange[]): TextChangeRange {
    if (changes.length === 0) {
        return unchangedTextChangeRange;
    }

    if (changes.length === 1) {
        return changes[0];
    }

    // We change from talking about { { oldStart, oldLength }, newLength } to { oldStart, oldEnd, newEnd }
    // as it makes things much easier to reason about.
    const change0 = changes[0];

    let oldStartN = change0.span.start;
    let oldEndN = textSpanEnd(change0.span);
    let newEndN = oldStartN + change0.newLength;

    for (let i = 1; i < changes.length; i++) {
        const nextChange = changes[i];

        // Consider the following case:
        // i.e. two edits.  The first represents the text change range { { 10, 50 }, 30 }.  i.e. The span starting
        // at 10, with length 50 is reduced to length 30.  The second represents the text change range { { 30, 30 }, 40 }.
        // i.e. the span starting at 30 with length 30 is increased to length 40.
        //
        //      0         10        20        30        40        50        60        70        80        90        100
        //      -------------------------------------------------------------------------------------------------------
        //                |                                                 /
        //                |                                            /----
        //  T1            |                                       /----
        //                |                                  /----
        //                |                             /----
        //      -------------------------------------------------------------------------------------------------------
        //                                     |                            \
        //                                     |                               \
        //   T2                                |                                 \
        //                                     |                                   \
        //                                     |                                      \
        //      -------------------------------------------------------------------------------------------------------
        //
        // Merging these turns out to not be too difficult.  First, determining the new start of the change is trivial
        // it's just the min of the old and new starts.  i.e.:
        //
        //      0         10        20        30        40        50        60        70        80        90        100
        //      ------------------------------------------------------------*------------------------------------------
        //                |                                                 /
        //                |                                            /----
        //  T1            |                                       /----
        //                |                                  /----
        //                |                             /----
        //      ----------------------------------------$-------------------$------------------------------------------
        //                .                    |                            \
        //                .                    |                               \
        //   T2           .                    |                                 \
        //                .                    |                                   \
        //                .                    |                                      \
        //      ----------------------------------------------------------------------*--------------------------------
        //
        // (Note the dots represent the newly inferred start.
        // Determining the new and old end is also pretty simple.  Basically it boils down to paying attention to the
        // absolute positions at the asterisks, and the relative change between the dollar signs. Basically, we see
        // which if the two $'s precedes the other, and we move that one forward until they line up.  in this case that
        // means:
        //
        //      0         10        20        30        40        50        60        70        80        90        100
        //      --------------------------------------------------------------------------------*----------------------
        //                |                                                                     /
        //                |                                                                /----
        //  T1            |                                                           /----
        //                |                                                      /----
        //                |                                                 /----
        //      ------------------------------------------------------------$------------------------------------------
        //                .                    |                            \
        //                .                    |                               \
        //   T2           .                    |                                 \
        //                .                    |                                   \
        //                .                    |                                      \
        //      ----------------------------------------------------------------------*--------------------------------
        //
        // In other words (in this case), we're recognizing that the second edit happened after where the first edit
        // ended with a delta of 20 characters (60 - 40).  Thus, if we go back in time to where the first edit started
        // that's the same as if we started at char 80 instead of 60.
        //
        // As it so happens, the same logic applies if the second edit precedes the first edit.  In that case rather
        // than pushing the first edit forward to match the second, we'll push the second edit forward to match the
        // first.
        //
        // In this case that means we have { oldStart: 10, oldEnd: 80, newEnd: 70 } or, in TextChangeRange
        // semantics: { { start: 10, length: 70 }, newLength: 60 }
        //
        // The math then works out as follows.
        // If we have { oldStart1, oldEnd1, newEnd1 } and { oldStart2, oldEnd2, newEnd2 } then we can compute the
        // final result like so:
        //
        // {
        //      oldStart3: Min(oldStart1, oldStart2),
        //      oldEnd3: Max(oldEnd1, oldEnd1 + (oldEnd2 - newEnd1)),
        //      newEnd3: Max(newEnd2, newEnd2 + (newEnd1 - oldEnd2))
        // }

        const oldStart1 = oldStartN;
        const oldEnd1 = oldEndN;
        const newEnd1 = newEndN;

        const oldStart2 = nextChange.span.start;
        const oldEnd2 = textSpanEnd(nextChange.span);
        const newEnd2 = oldStart2 + nextChange.newLength;

        oldStartN = Math.min(oldStart1, oldStart2);
        oldEndN = Math.max(oldEnd1, oldEnd1 + (oldEnd2 - newEnd1));
        newEndN = Math.max(newEnd2, newEnd2 + (newEnd1 - oldEnd2));
    }

    return createTextChangeRange(createTextSpanFromBounds(oldStartN, oldEndN), /*newLength*/ newEndN - oldStartN);
}

/** @internal */
export function getCombinedNodeFlagsAlwaysIncludeJSDoc(node: Declaration): ModifierFlags {
    return getCombinedFlags(node, getEffectiveModifierFlagsAlwaysIncludeJSDoc);
}

export function sortAndDeduplicateDiagnostics<T extends Diagnostic>(diagnostics: readonly T[]): SortedReadonlyArray<T> {
    return sortAndDeduplicate<T>(diagnostics, compareDiagnostics, diagnosticsEqualityComparer);
}

export function getDefaultLibFileName(options: CompilerOptions): string {
    switch (options?.driverType) {
        case LanguageVariant.LDMud:
            return "efuns/ldmud/efuns.ldmud.h";
        case LanguageVariant.FluffOS:
            return "efuns/fluffos/efuns.fluffos.h";
        default:
            return "efuns/ldmud/efuns.ldmud.h";
    }
}

export function isExternalModuleNameRelative(moduleName: string): boolean {
    // TypeScript 1.0 spec (April 2014): 11.2.1
    // An external module name is "relative" if the first term is "." or "..".
    // Update: We also consider a path like `C:\foo.ts` "relative" because we do not search for it in `node_modules` or treat it as an ambient module.
    return pathIsRelative(moduleName) || isRootedDiskPath(moduleName);
}

export function isStringTextContainingNode(node: Node): node is StringLiteral {
    return node.kind === SyntaxKind.StringLiteral;// || isTemplateLiteralKind(node.kind);
}

/** @internal */
export function isJSDocTag(node: Node): node is JSDocTag {
    return node.kind >= SyntaxKind.FirstJSDocTagNode && node.kind <= SyntaxKind.LastJSDocTagNode;
}

export function isTypeElement(node: Node): node is TypeElement {
    const kind = node.kind;
    return kind === SyntaxKind.IndexSignature;
    // return kind === SyntaxKind.ConstructSignature
    //     || kind === SyntaxKind.CallSignature
    //     || kind === SyntaxKind.PropertySignature
    //     || kind === SyntaxKind.MethodSignature
    //     || kind === SyntaxKind.IndexSignature
    //     || kind === SyntaxKind.GetAccessor
    //     || kind === SyntaxKind.SetAccessor;
}

/** @internal */
export function isCallLikeOrFunctionLikeExpression(node: Node): node is CallLikeExpression | FunctionExpression { //| ArrowFunction {
    return isCallLikeExpression(node) || isFunctionExpressionOrArrowFunction(node);
}

/**
 * True if has type node attached to it.
 *
 * @internal
 */
export function hasType(node: Node): node is HasType {
    return !!(node as HasType).type;
}

export function isStringLiteralLike(node: Node | FileReference): node is StringLiteralLike {
    return (node as Node).kind === SyntaxKind.StringLiteral ;//|| (node as Node).kind === SyntaxKind.NoSubstitutionTemplateLiteral;
}


/** @internal */
export function isParameterPropertyModifier(kind: SyntaxKind): boolean {
    return !!(modifierToFlag(kind) & ModifierFlags.ParameterPropertyModifier);
}


/** @internal */
export function isClassMemberModifier(idToken: SyntaxKind): boolean {
    return isParameterPropertyModifier(idToken) ||
        idToken === SyntaxKind.StaticKeyword;
        // idToken === SyntaxKind.OverrideKeyword ||
        // idToken === SyntaxKind.AccessorKeyword;        
}

export function isModifier(node: Node): node is Modifier {
    return isModifierKind(node.kind);
}

/** @internal */
export function isModifierKind(token: SyntaxKind): token is Modifier["kind"] {
    switch (token) {
        // case SyntaxKind.AbstractKeyword:
        // case SyntaxKind.AccessorKeyword:
        case SyntaxKind.AsyncKeyword:
        // case SyntaxKind.ConstKeyword:
        // case SyntaxKind.DeclareKeyword:
        case SyntaxKind.DefaultKeyword:
        // case SyntaxKind.ExportKeyword:
        case SyntaxKind.InKeyword:
        case SyntaxKind.PublicKeyword:
        case SyntaxKind.PrivateKeyword:
        case SyntaxKind.ProtectedKeyword:
        // case SyntaxKind.ReadonlyKeyword:
        case SyntaxKind.StaticKeyword:
        // case SyntaxKind.OutKeyword:
        // case SyntaxKind.OverrideKeyword:
            return true;
    }
    return false;
}

/** Get all JSDoc tags related to a node, including those on parent nodes. */
export function getJSDocTags(node: Node): readonly JSDocTag[] {
    return getJSDocTagsWorker(node, /*noCache*/ false);
}

export function isJSDocPropertyLikeTag(node: Node): node is JSDocPropertyLikeTag {
    return node.kind === SyntaxKind.JSDocPropertyTag || node.kind === SyntaxKind.JSDocParameterTag;
}

/**
 * Determines whether the node is a statement that is not also a declaration
 *
 * @internal
 */
export function isStatementButNotDeclaration(node: Node): node is Statement {
    return isStatementKindButNotDeclarationKind(node.kind);
}

// Classes
export function isClassElement(node: Node): node is ClassElement {
    const kind = node.kind;
    return kind === SyntaxKind.PropertyDeclaration    
        || kind === SyntaxKind.MethodDeclaration        
        || kind === SyntaxKind.IndexSignature
        // || kind === SyntaxKind.ClassStaticBlockDeclaration
        // || kind === SyntaxKind.SemicolonClassElement;
        ;
}

export function isClassOrTypeElement(node: Node): node is ClassElement | TypeElement {
    return isTypeElement(node) || isClassElement(node);
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
export function getJSDocParameterTagsNoCache(param: ParameterDeclaration): readonly JSDocParameterTag[] {
    return getJSDocParameterTagsWorker(param, /*noCache*/ true);
}

function getJSDocTypeParameterTagsWorker(param: TypeParameterDeclaration, noCache?: boolean): readonly JSDocTemplateTag[] {
    const name = param.name.text;
    return getJSDocTagsWorker(param.parent, noCache).filter((tag): tag is JSDocTemplateTag => isJSDocTemplateTag(tag) && tag.typeParameters.some(tp => tp.name.text === name));
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

export function isAssertionExpression(node: Node): node is AssertionExpression {
    const kind = node.kind;
    return kind === SyntaxKind.TypeAssertionExpression
        || kind === SyntaxKind.CastExpression;
}
