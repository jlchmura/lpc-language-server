import { Debug, EmitFlags, EmitNode, getParseTreeNode, getSourceFileOfNode, Identifier, InternalEmitFlags, isParseTreeNode, Node, NodeArray, SyntaxKind, TypeNode, TypeParameterDeclaration } from "../_namespaces/lpc";

/**
 * Sets flags that control emit behavior of a node.
 */
export function setEmitFlags<T extends Node>(node: T, emitFlags: EmitFlags) {
    getOrCreateEmitNode(node).flags = emitFlags;
    return node;
}


/**
 * Associates a node with the current transformation, initializing
 * various transient transformation properties.
 * @internal
 */
export function getOrCreateEmitNode(node: Node): EmitNode {
    if (!node.emitNode) {
        if (isParseTreeNode(node)) {
            // To avoid holding onto transformation artifacts, we keep track of any
            // parse tree node we are annotating. This allows us to clean them up after
            // all transformations have completed.
            if (node.kind === SyntaxKind.SourceFile) {
                return node.emitNode = { annotatedNodes: [node] } as EmitNode;
            }

            const sourceFile = getSourceFileOfNode(getParseTreeNode(getSourceFileOfNode(node))) ?? Debug.fail("Could not determine parsed source file.");
            getOrCreateEmitNode(sourceFile).annotatedNodes!.push(node);
        }

        node.emitNode = {} as EmitNode;
    }
    else {
        Debug.assert(!(node.emitNode.internalFlags & InternalEmitFlags.Immutable), "Invalid attempt to mutate an immutable node.");
    }
    return node.emitNode;
}


/**
 * Gets a custom text range to use when emitting comments.
 *
 * @internal
 */
export function getStartsOnNewLine(node: Node) {
    return node.emitNode?.startsOnNewLine;
}

/** @internal */
export function getIdentifierTypeArguments(node: Identifier): NodeArray<TypeNode | TypeParameterDeclaration> | undefined {
    return undefined;//node.emitNode?.identifierTypeArguments;
}
