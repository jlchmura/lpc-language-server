import {
    AutoGenerateInfo,
    Identifier,
    NodeArray,
    PrivateIdentifier,
    TypeNode,
    TypeParameterDeclaration,
} from "../types";

/** @internal */
export function setIdentifierAutoGenerate<
    T extends Identifier | PrivateIdentifier
>(node: T, autoGenerate: AutoGenerateInfo | undefined) {
    //getOrCreateEmitNode(node).autoGenerate = autoGenerate;
    return node;
}

/** @internal */
export function getIdentifierTypeArguments(
    node: Identifier
): NodeArray<TypeNode | TypeParameterDeclaration> | undefined {
    //return node.emitNode?.identifierTypeArguments;
    return undefined;
}

/** @internal */
export function setIdentifierTypeArguments<T extends Identifier>(
    node: T,
    typeArguments: NodeArray<TypeNode | TypeParameterDeclaration> | undefined
) {
    //getOrCreateEmitNode(node).identifierTypeArguments = typeArguments;
    return node;
}
