import { Node, Declaration, getEffectiveModifierFlagsAlwaysIncludeJSDoc, isBindingElement, ModifierFlags, SyntaxKind, walkUpBindingElementsAndPatterns } from "./_namespaces/lpc";

/** @internal */
export function getCombinedNodeFlagsAlwaysIncludeJSDoc(node: Declaration): ModifierFlags {
    return getCombinedFlags(node, getEffectiveModifierFlagsAlwaysIncludeJSDoc);
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