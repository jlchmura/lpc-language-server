import { Symbol, Type, AssignmentDeclarationKind, findAncestor, getAssignmentDeclarationKind, hasSyntacticModifier, Identifier, isAccessExpression, isBinaryExpression, isBindingElement, isDeclaration, isStatement, ModifierFlags, NamedDeclaration, Node, StringLiteral, SyntaxKind, TextSpan, BinaryExpression, find, isExpressionStatement, isVariableDeclarationList, isVariableStatement, SwitchStatement, isForEachStatement, ForEachStatement, isArrayLiteralOrObjectLiteralDestructuringPattern, first, isBreakOrContinueStatement, isStringLiteral, isComputedPropertyName, SourceFile, Debug, createTextSpanFromBounds } from "./_namespaces/lpc";


/** @internal */
export interface SymbolAndEntries {
    readonly definition: Definition | undefined;
    readonly references: readonly Entry[];
}

/** @internal */
export const enum DefinitionKind {
    Symbol,
    Label,
    Keyword,
    This,
    String,
    TripleSlashReference,
}
/** @internal */
export type Definition =
    | { readonly type: DefinitionKind.Symbol; readonly symbol: Symbol; }
    | { readonly type: DefinitionKind.Label; readonly node: Identifier; }
    | { readonly type: DefinitionKind.Keyword; readonly node: Node; }
    | { readonly type: DefinitionKind.This; readonly node: Node; }
    | { readonly type: DefinitionKind.String; readonly node: StringLiteral; }
    //| { readonly type: DefinitionKind.TripleSlashReference; readonly reference: FileReference; readonly file: SourceFile; };

/** @internal */
export const enum EntryKind {
    Span,
    Node,
    StringLiteral,
    SearchedLocalFoundProperty,
    SearchedPropertyFoundLocal,
}
/** @internal */
export type NodeEntryKind = EntryKind.Node | EntryKind.StringLiteral | EntryKind.SearchedLocalFoundProperty | EntryKind.SearchedPropertyFoundLocal;
/** @internal */
export type Entry = NodeEntry | SpanEntry;

/** @internal */
export interface ContextWithStartAndEndNode {
    start: Node;
    end: Node;
}
/** @internal */
export type ContextNode = Node | ContextWithStartAndEndNode;

/** @internal */
export interface NodeEntry {
    readonly kind: NodeEntryKind;
    readonly node: Node;
    readonly context?: ContextNode;
}
/** @internal */
export interface SpanEntry {
    readonly kind: EntryKind.Span;
    readonly fileName: string;
    readonly textSpan: TextSpan;
}
function nodeEntry(node: Node, kind: NodeEntryKind = EntryKind.Node): NodeEntry {
    return {
        kind,
        node: (node as NamedDeclaration).name || node,
        context: getContextNodeForNodeEntry(node),
    };
}

/** @internal */
export function isContextWithStartAndEndNode(node: ContextNode): node is ContextWithStartAndEndNode {
    return node && (node as Node).kind === undefined;
}


/** @internal */
export function getContextNode(node: NamedDeclaration | BinaryExpression | ForEachStatement | SwitchStatement | undefined): ContextNode | undefined {
    if (!node) return undefined;
    switch (node.kind) {
        case SyntaxKind.VariableDeclaration:
            return !isVariableDeclarationList(node.parent) || node.parent.declarations.length !== 1 ?
                node :
                isVariableStatement(node.parent.parent) ?
                node.parent.parent :
                isForEachStatement(node.parent.parent) ?
                getContextNode(node.parent.parent) :
                node.parent;

        case SyntaxKind.BindingElement:
            return getContextNode(node.parent.parent as NamedDeclaration);

        // case SyntaxKind.ImportSpecifier:
        //     return node.parent.parent.parent;

        // case SyntaxKind.ExportSpecifier:
        // case SyntaxKind.NamespaceImport:
        //     return node.parent.parent;

        // case SyntaxKind.ImportClause:
        // case SyntaxKind.NamespaceExport:
        //     return node.parent;

        case SyntaxKind.BinaryExpression:
            return isExpressionStatement(node.parent) ?
                node.parent :
                node;

        case SyntaxKind.ForEachStatement:        
            return {
                start: first((node as ForEachStatement).initializer),
                end: (node as ForEachStatement).expression,
            };

        case SyntaxKind.PropertyAssignment:
        case SyntaxKind.ShorthandPropertyAssignment:
            return isArrayLiteralOrObjectLiteralDestructuringPattern(node.parent) ?
                getContextNode(
                    findAncestor(node.parent, node => isBinaryExpression(node) || isForEachStatement(node)) as BinaryExpression | ForEachStatement,
                ) :
                node;
        case SyntaxKind.SwitchStatement:
            return {
                start: find(node.getChildren(node.getSourceFile()), node => node.kind === SyntaxKind.SwitchKeyword)!,
                end: (node as SwitchStatement).caseBlock,
            };
        default:
            return node;
    }
}


function getContextNodeForNodeEntry(node: Node): ContextNode | undefined {
    if (isDeclaration(node)) {
        return getContextNode(node);
    }

    if (!node.parent) return undefined;

    if (!isDeclaration(node.parent)/* && !isExportAssignment(node.parent)*/) {
        // Special property assignment in javascript
        // if (isInJSFile(node)) {
        //     const binaryExpression = isBinaryExpression(node.parent) ?
        //         node.parent :
        //         isAccessExpression(node.parent) &&
        //             isBinaryExpression(node.parent.parent) &&
        //             node.parent.parent.left === node.parent ?
        //         node.parent.parent :
        //         undefined;
        //     if (binaryExpression && getAssignmentDeclarationKind(binaryExpression) !== AssignmentDeclarationKind.None) {
        //         return getContextNode(binaryExpression);
        //     }
        // }

        if (            
            //isLabeledStatement(node.parent) ||
            isBreakOrContinueStatement(node.parent)
        ) {
            return node.parent;
        }
        else if (isStringLiteral(node)) {
            console.warn("TODO implement me - isStringLiteral import lookup");
            return node;
            // const validImport = tryGetImportFromModuleSpecifier(node);
            // if (validImport) {
            //     const declOrStatement = findAncestor(validImport, node =>
            //         isDeclaration(node) ||
            //         isStatement(node) ||
            //         isJSDocTag(node))!;
            //     return isDeclaration(declOrStatement) ?
            //         getContextNode(declOrStatement) :
            //         declOrStatement;
            // }
        }

        // Handle computed property name
        const propertyName = findAncestor(node, isComputedPropertyName);
        return propertyName ?
            getContextNode(propertyName.parent) :
            undefined;
    }

    if (
        node.parent.name === node // node is name of declaration, use parent
        // isConstructorDeclaration(node.parent) ||
        // isExportAssignment(node.parent) ||
        // Property name of the import export specifier or binding pattern, use parent
        // ((isImportOrExportSpecifier(node.parent) || isBindingElement(node.parent))
        //     && node.parent.propertyName === node) ||
        // Is default export
        // (node.kind === SyntaxKind.DefaultKeyword && hasSyntacticModifier(node.parent, ModifierFlags.ExportDefault))
    ) {
        return getContextNode(node.parent);
    }

    return undefined;
}

function getTextSpan(node: Node, sourceFile: SourceFile, endNode?: Node): TextSpan {
    let start = node.getStart(sourceFile);
    let end = (endNode || node).getEnd();
    if (isStringLiteral(node) && (end - start) > 2) {
        Debug.assert(endNode === undefined);
        start += 1;
        end -= 1;
    }
    if (endNode?.kind === SyntaxKind.CaseBlock) {
        end = endNode.getFullStart();
    }
    return createTextSpanFromBounds(start, end);
}

/** @internal */
export function toContextSpan(textSpan: TextSpan, sourceFile: SourceFile, context: ContextNode | undefined): { contextSpan: TextSpan; } | undefined {
    if (!context) return undefined;
    const contextSpan = isContextWithStartAndEndNode(context) ?
        getTextSpan(context.start, sourceFile, context.end) :
        getTextSpan(context, sourceFile);
    return contextSpan.start !== textSpan.start || contextSpan.length !== textSpan.length ?
        { contextSpan } :
        undefined;
}