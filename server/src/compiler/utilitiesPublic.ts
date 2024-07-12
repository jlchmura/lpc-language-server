import { HasModifiers, hasProperty, Identifier, Node, NodeArray, NodeFlags, Symbol, SyntaxKind } from "./_namespaces/lpc";

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