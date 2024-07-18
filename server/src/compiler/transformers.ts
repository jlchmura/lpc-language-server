import { EmitHint, Node } from "./_namespaces/lpc";

/** @internal */
export function noEmitSubstitution(_hint: EmitHint, node: Node) {
    return node;
}

/** @internal */
export function noEmitNotification(hint: EmitHint, node: Node, callback: (hint: EmitHint, node: Node) => void) {
    callback(hint, node);
}